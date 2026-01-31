
import React from 'react';

const DocsView: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const installScript = `#!/bin/bash
# BEENOVIA AUTOMATED INSTALLER v4.8 LTS
# --------------------------------------
# Target: Ubuntu 22.04 / 24.04
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv curl wget git nginx \\
  mariadb-server redis-server ufw cloudflared

# Setup Environment
sudo mkdir -p /opt/beenovia
sudo chown -R $USER:$USER /opt/beenovia
cd /opt/beenovia

# Initialize Virtual Env
python3 -m venv venv
./venv/bin/pip install flask flask-cors psutil

# Start Manager
./venv/bin/python3 dashboard.py`;

  return (
    <div className="space-y-16 pb-32 max-w-6xl mx-auto">
      <div className="text-center space-y-6 pt-10">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter italic">Beenovia<span className="text-blue-600">.</span></h1>
        <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto tracking-tight">Enterprise Server Management & Deployment Orchestrator</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Credentials Section */}
          <section className="bg-slate-900 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl transition-all duration-1000 group-hover:bg-blue-500/20"></div>
            <div className="relative z-10 space-y-8">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl">🔑</div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Default Access</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all">
                     <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Panel Username</div>
                     <div className="text-xl font-black text-white">admin</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all">
                     <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Panel Password</div>
                     <div className="text-xl font-black text-white">beenovia_secret</div>
                  </div>
               </div>
               <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                  <p className="text-xs text-emerald-400 font-bold leading-relaxed">
                     <span className="font-black uppercase mr-2">[Security Tip]</span> 
                     Change these credentials immediately in the Settings view after your first login to prevent unauthorized cluster access.
                  </p>
               </div>
            </div>
          </section>

          {/* Installation Section */}
          <section className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm p-14 space-y-10">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-blue-200">🚀</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Server Install</h2>
            </div>
            
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Initialize the full Beenovia stack on **Ubuntu 22.04 LTS**.
            </p>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
              <pre className="relative bg-slate-950 text-blue-400 p-10 rounded-[2.5rem] font-mono text-sm overflow-x-auto border border-white/5 shadow-2xl custom-scrollbar">
                <code>{installScript}</code>
              </pre>
              <button 
                onClick={() => copyToClipboard('curl -sSL https://raw.githubusercontent.com/beenovia/manager/main/install.sh | sudo bash')}
                className="absolute right-8 top-8 px-6 py-3 bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl"
              >
                Copy Install Hook
              </button>
            </div>
          </section>

          {/* Database Section */}
          <section className="bg-white rounded-[3.5rem] border border-slate-200 p-14 space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-3xl">🗄️</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Database Clusters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
               <div className="space-y-4">
                  <h4 className="font-black text-slate-800 uppercase tracking-tight">MySQL / MariaDB</h4>
                  <p className="text-slate-500 leading-relaxed">System root user is configured for socket-auth. Use <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">sudo mysql</code> to access without password.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="font-black text-slate-800 uppercase tracking-tight">MongoDB</h4>
                  <p className="text-slate-500 leading-relaxed">Standard installation on port 27017. Authentication is disabled for localhost; enable via <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">mongosh</code> for production.</p>
               </div>
            </div>
          </section>
        </div>

        {/* Quick Reference Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
             <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">System Paths</h3>
             <div className="space-y-6">
                {[
                  { label: 'Binaries', val: '/usr/local/bin/bv' },
                  { label: 'Website Root', val: '/www/wwwroot/' },
                  { label: 'Backup Dir', val: '/www/backup/' },
                  { label: 'Logs Path', val: '/var/log/beenovia/' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                     <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</div>
                     <div className="text-xs font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100 truncate">{item.val}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 space-y-8">
             <h3 className="font-black text-xl tracking-tight uppercase">Support</h3>
             <p className="text-sm font-medium text-indigo-100 leading-relaxed italic">"Beenovia is designed to be the invisible spine of your infrastructure. Everything just works."</p>
             <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                Open Community Docs
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsView;
