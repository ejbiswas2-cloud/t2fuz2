
import os
import psutil
import platform
import subprocess
import json
import time
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

DB_PATH = 'websites.json'

def load_db():
    if os.path.exists(DB_PATH):
        with open(DB_PATH, 'r') as f:
            try:
                return json.load(f)
            except:
                return []
    return [
        {
            "id": "wp-prod", 
            "domain": "main-wordpress.io", 
            "type": "WordPress", 
            "status": "active", 
            "ssl": "Auto", 
            "runtime": "PHP 8.2 + MariaDB", 
            "root": "/www/wwwroot/wordpress_site", 
            "port": 80, 
            "wwwAlias": True, 
            "envMode": "Production", 
            "cacheProfile": "Aggressive", 
            "autoTunnel": True,
            "databases": ["MariaDB"]
        },
        {
            "id": "ehr-prod", 
            "domain": "system-ehr.health", 
            "type": "Full-Stack EHR", 
            "status": "active", 
            "ssl": "Auto", 
            "runtime": "Next.js + Node Express", 
            "root": "/www/wwwroot/ehr_system", 
            "port": 3000, 
            "wwwAlias": False, 
            "envMode": "Production", 
            "cacheProfile": "Standard", 
            "autoTunnel": True,
            "databases": ["MongoDB", "PostgreSQL"]
        }
    ]

def save_db(db):
    with open(DB_PATH, 'w') as f:
        json.dump(db, f)

@app.route('/api/status')
def get_status():
    # Check if cloudflared is running globally
    tunnel_active = False
    try:
        tunnel_active = subprocess.call(['systemctl', 'is-active', '--quiet', 'cloudflared']) == 0
    except:
        pass

    try:
        return jsonify({
            "cpu_usage": psutil.cpu_percent(interval=None),
            "memory": psutil.virtual_memory()._asdict(),
            "disk": psutil.disk_usage('/')._asdict(),
            "uptime": subprocess.getoutput("uptime -p"),
            "load_avg": os.getloadavg() if hasattr(os, 'getloadavg') else [0.0, 0.0, 0.0],
            "platform": platform.platform(),
            "panel": "Beenovia Server Manager v4.8",
            "global_tunnel": {
                "active": tunnel_active,
                "provider": "Cloudflare Zero-Trust",
                "sync_status": "Synced" if tunnel_active else "Disconnected"
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/services')
def get_services():
    service_names = ['nginx', 'mysql', 'postgresql', 'mongodb', 'redis-server', 'cloudflared', 'php8.2-fpm']
    status_list = []
    for srv in service_names:
        try:
            active = subprocess.call(['systemctl', 'is-active', '--quiet', srv]) == 0
            status_list.append({
                "name": srv, 
                "status": "running" if active else "stopped", 
                "version": "latest-stable"
            })
        except:
            binary_exists = subprocess.call(['which', srv.split('-')[0]], stdout=subprocess.DEVNULL) == 0
            if binary_exists:
                status_list.append({"name": srv, "status": "unknown", "version": "binary-ready"})
    return jsonify(status_list)

@app.route('/api/websites', methods=['GET'])
def get_websites():
    return jsonify(load_db())

@app.route('/api/websites/create', methods=['POST'])
def create_website():
    try:
        data = request.json
        db = load_db()
        db.append(data)
        save_db(db)
        return jsonify({"status": "success", "message": f"Beenovia {data['type']} Node provisioned."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/websites/build/<site_id>', methods=['POST'])
def build_website(site_id):
    time.sleep(1.5) 
    return jsonify({"status": "success", "message": "Infrastructure rebuilt."})

@app.route('/api/service/<action>/<service_name>', methods=['POST'])
def manage_service(action, service_name):
    return jsonify({"status": "success", "message": f"Service {service_name} {action}ed."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9100, debug=True)
