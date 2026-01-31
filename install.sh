
#!/bin/bash

# Beenovia Server Manager - Installation Script
# Target OS: Ubuntu 22.04 / 24.04 LTS

set -e

# Setup high-visibility colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Beenovia Installation...${NC}"

# --- Pre-flight Network Check ---
echo -e "${BLUE}🔍 Checking internet connectivity & DNS...${NC}"

# 1. Check DNS resolution first (Fast fail)
if ! nslookup pypi.org > /dev/null 2>&1 && ! host pypi.org > /dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: DNS Resolution Failed.${NC}"
    echo -e "${YELLOW}💡 FIX: Your server cannot resolve domain names.${NC}"
    echo "   Run: echo 'nameserver 8.8.8.8' | sudo tee /etc/resolv.conf"
    echo "   Then try the installer again."
    exit 1
fi

# 2. Check HTTP connectivity with 5-second timeout to prevent hanging
if ! curl -s --connect-timeout 5 --max-time 10 --head https://pypi.org > /dev/null; then
    echo -e "${RED}❌ ERROR: Network Unreachable (Timeout).${NC}"
    echo -e "${YELLOW}💡 TROUBLESHOOTING:${NC}"
    echo "   1. Ensure your server has outbound internet access (Port 443)."
    echo "   2. Check your VPC/Security Group rules."
    echo "   3. Try pinging a global IP: ping -c 3 1.1.1.1"
    exit 1
fi

echo -e "${GREEN}✅ Network and DNS Verified.${NC}"

# 1. Update System
echo -e "${BLUE}🔄 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# 2. Install Dependencies
echo -e "${BLUE}📦 Installing Python, Node.js, and essential tools...${NC}"
sudo apt install -y python3 python3-pip python3-venv curl wget git nginx certbot python3-certbot-nginx mariadb-server redis-server ufw dnsutils

# 3. Install Cloudflare Tunnel (cloudflared)
echo -e "${BLUE}☁️ Installing Cloudflare Tunnel...${NC}"
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    sudo dpkg -i cloudflared.deb
    rm cloudflared.deb
fi

# 4. Setup Project Directory
echo -e "${BLUE}📂 Setting up project directory...${NC}"
sudo mkdir -p /opt/beenovia
sudo cp -r . /opt/beenovia || true
cd /opt/beenovia

# 5. Setup Python Environment
echo -e "${BLUE}🐍 Setting up Python backend...${NC}"
sudo python3 -m venv venv

# Set pip global timeouts to prevent hanging during package installs
export PIP_DEFAULT_TIMEOUT=100
export PIP_RETRIES=10

echo -e "${BLUE}📥 Installing Python requirements...${NC}"
sudo ./venv/bin/pip install --upgrade pip
sudo ./venv/bin/pip install flask flask-cors psutil

# 6. Create Systemd Service for Dashboard
echo -e "${BLUE}⚙️ Creating systemd service...${NC}"
sudo bash -c 'cat <<EOF > /etc/systemd/system/beenovia.service
[Unit]
Description=Beenovia Server Manager Dashboard
After=network.target

[Service]
User=root
WorkingDirectory=/opt/beenovia
ExecStart=/opt/beenovia/venv/bin/python3 /opt/beenovia/dashboard.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF'

# 7. Start Services
echo -e "${BLUE}🚀 Starting Beenovia Services...${NC}"
sudo systemctl daemon-reload
sudo systemctl enable beenovia
sudo systemctl start beenovia

echo -e "${GREEN}------------------------------------------------${NC}"
echo -e "${GREEN}✅ Beenovia Installation Complete!${NC}"
echo -e "Dashboard: ${BLUE}http://$(hostname -I | awk '{print $1}'):9100${NC}"
echo -e "${GREEN}------------------------------------------------${NC}"
echo -e "Username: ${BLUE}admin${NC}"
echo -e "Password: ${BLUE}beenovia_secret${NC}"
echo -e "${GREEN}------------------------------------------------${NC}"
