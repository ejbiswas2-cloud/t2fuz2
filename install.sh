
#!/bin/bash

# Beenovia Server Manager - Installation Script
# Target OS: Ubuntu 22.04 LTS

set -e

echo "🚀 Starting Beenovia Installation..."

# 1. Update System
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Dependencies
echo "Installing Python, Node.js, and essential tools..."
sudo apt install -y python3 python3-pip python3-venv curl wget git nginx certbot python3-certbot-nginx mariadb-server redis-server

# 3. Install Cloudflare Tunnel (cloudflared)
echo "Installing Cloudflare Tunnel..."
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
rm cloudflared.deb

# 4. Setup Project Directory
echo "Setting up project directory..."
sudo mkdir -p /opt/beenovia
sudo cp -r . /opt/beenovia
cd /opt/beenovia

# 5. Setup Python Environment
echo "Setting up Python backend..."
sudo python3 -m venv venv
sudo ./venv/bin/pip install flask flask-cors psutil

# 6. Create Systemd Service for Dashboard
echo "Creating systemd service..."
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
sudo systemctl daemon-reload
sudo systemctl enable beenovia
sudo systemctl start beenovia

echo "------------------------------------------------"
echo "✅ Beenovia Installation Complete!"
echo "Dashboard is running on: http://$(hostname -I | awk '{print $1}'):9100"
echo "------------------------------------------------"
echo "Documentation: View the 'Documentation' tab in the panel."
echo "Default Database User: root (passwordless locally)"
echo "------------------------------------------------"
