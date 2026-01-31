
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
echo -e "${BLUE}🔍 Analyzing Network environment...${NC}"

NET_STRICT_FAIL=false

# 1. Check basic IP connectivity (Fastest)
if ping -c 1 1.1.1.1 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Basic IP Connectivity Detected (Ping 1.1.1.1 OK).${NC}"
else
    echo -e "${RED}❌ ERROR: No basic IP connectivity.${NC}"
    echo "   Check your network interface and gateway."
    exit 1
fi

# 2. Check DNS resolution
if ! nslookup pypi.org > /dev/null 2>&1 && ! host pypi.org > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️ WARNING: DNS Resolution Failed for pypi.org.${NC}"
    echo "   Attempting to set temporary DNS (8.8.8.8)..."
    echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null
fi

# 3. Check HTTP/HTTPS connectivity with 5-second timeout
# We use -k to ignore SSL issues during the check and try both pypi and google
if ! curl -Is -k --connect-timeout 5 https://pypi.org > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️ WARNING: HTTPS Check Failed (Port 443 might be blocked).${NC}"
    echo -e "${YELLOW}💡 TROUBLESHOOTING:${NC}"
    echo "   - Your firewall might be blocking outbound Port 443."
    echo "   - Proceeding with installation anyway as Ping is active..."
    NET_STRICT_FAIL=false
else
    echo -e "${GREEN}✅ HTTPS Connectivity Verified.${NC}"
fi

# 1. Update System
echo -e "${BLUE}🔄 Updating system packages (this may take a while)...${NC}"
# Use a timeout for apt update too
sudo apt-get update || echo -e "${YELLOW}⚠️ Apt update encountered issues, continuing...${NC}"

# 2. Install Dependencies
echo -e "${BLUE}📦 Installing Python, Node.js, and essential tools...${NC}"
sudo apt-get install -y python3 python3-pip python3-venv curl wget git nginx certbot python3-certbot-nginx mariadb-server redis-server ufw dnsutils || {
    echo -e "${RED}❌ ERROR: Package installation failed. Check your apt sources.${NC}"
    exit 1
}

# 3. Install Cloudflare Tunnel (cloudflared)
echo -e "${BLUE}☁️ Installing Cloudflare Tunnel...${NC}"
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb || true
    if [ -f cloudflared.deb ]; then
        sudo dpkg -i cloudflared.deb || sudo apt-get install -f -y
        rm cloudflared.deb
    else
        echo -e "${YELLOW}⚠️ Could not download cloudflared. Skipping for now.${NC}"
    fi
fi

# 4. Setup Project Directory
echo -e "${BLUE}📂 Setting up project directory...${NC}"
sudo mkdir -p /opt/beenovia
# If we are running from a git clone, copy files. If via curl, this might need adjustment.
sudo cp -r . /opt/beenovia || true
cd /opt/beenovia

# 5. Setup Python Environment
echo -e "${BLUE}🐍 Setting up Python backend...${NC}"
sudo python3 -m venv venv

# Set pip global timeouts to prevent hanging during package installs
export PIP_DEFAULT_TIMEOUT=120
export PIP_RETRIES=20

echo -e "${BLUE}📥 Installing Python requirements...${NC}"
sudo ./venv/bin/pip install --upgrade pip
sudo ./venv/bin/pip install flask flask-cors psutil || {
    echo -e "${RED}❌ ERROR: Pip failed to install requirements.${NC}"
    echo "   Try running manually: /opt/beenovia/venv/bin/pip install flask flask-cors psutil"
    exit 1
}

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
