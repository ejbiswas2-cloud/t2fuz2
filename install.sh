
#!/bin/bash

# Beenovia Server Manager - Installation Script
# Target OS: Ubuntu 22.04 / 24.04 LTS

set -e

echo "🚀 Starting Beenovia Installation..."

# --- Pre-flight Network Check ---
echo "🔍 Checking internet connectivity..."
if ! curl -s --head  --request GET https://pypi.org | grep "200 OK" > /dev/null; then
    echo "❌ ERROR: Cannot reach pypi.org. Your network is unreachable."
    echo "💡 TROUBLESHOOTING:"
    echo "   1. Check if your server has a public internet connection."
    echo "   2. Run: 'ping 8.8.8.8' to check basic routing."
    echo "   3. Check DNS: 'cat /etc/resolv.conf'. Ensure it has 'nameserver 8.8.8.8'."
    echo "   4. If you are behind a proxy, export HTTPS_PROXY before running this script."
    exit 1
fi

# 1. Update System
echo "🔄 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Dependencies
echo "📦 Installing Python, Node.js, and essential tools..."
sudo apt install -y python3 python3-pip python3-venv curl wget git nginx certbot python3-certbot-nginx mariadb-server redis-server ufw

# 3. Install Cloudflare Tunnel (cloudflared)
echo "☁️ Installing Cloudflare Tunnel..."
if ! command -v cloudflared &> /dev/null; then
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    sudo dpkg -i cloudflared.deb
    rm cloudflared.deb
fi

# 4. Setup Project Directory
echo "📂 Setting up project directory..."
sudo mkdir -p /opt/beenovia
sudo cp -r . /opt/beenovia || true
cd /opt/beenovia

# 5. Setup Python Environment
echo "🐍 Setting up Python backend..."
sudo python3 -m venv venv
# Using --timeout and --retries to handle flaky connections
sudo ./venv/bin/pip install --upgrade pip
sudo ./venv/bin/pip install --timeout 60 --retries 10 flask flask-cors psutil

# 6. Create Systemd Service for Dashboard
echo "⚙️ Creating systemd service..."
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
echo "🚀 Starting Beenovia Services..."
sudo systemctl daemon-reload
sudo systemctl enable beenovia
sudo systemctl start beenovia

echo "------------------------------------------------"
echo "✅ Beenovia Installation Complete!"
echo "Dashboard: http://$(hostname -I | awk '{print $1}'):9100"
echo "------------------------------------------------"
echo "Username: admin"
echo "Password: beenovia_secret"
echo "------------------------------------------------"
