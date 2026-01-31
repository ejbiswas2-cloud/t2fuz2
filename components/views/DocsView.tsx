
import React from 'react';

const DocsView: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const installCommand = `curl -sSL https://raw.githubusercontent.com/ejbiswas2-c/beenovia/main/install.sh | sudo bash`;

  const installScriptSource = `#!/bin/bash
# BEENOVIA AUTOMATED INSTALLER v4.8 LTS
# --------------------------------------
# Target: Ubuntu 22.04 / 24.04
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv curl wget git nginx \\
  mariadb-server redis-server ufw cloudflared postgresql mongodb

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
    <div className="space-y-12 pb-32 max-w-6xl mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter italic">Beenovia<span className="text-blue-600">.</span></h1>
        <p className="text-slate-500 text-xl font-medium tracking-tight">Deployment Orchestration & Infrastructure Management</p>
      </div>

      {/* QUICK START SECTION - Requested Info */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-blue-600 rounded-[3.5rem] p-10 shadow-2xl shadow-blue-200 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-80">Security Protocol: Default Access</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/10 border border-white/20 p-6 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all" onClick={() => copyToClipboard('admin')}>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Username</div>
                  <div className="text-2xl font-black">admin</div>
                </div>
                <div className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Copy</div>
              </div>
              <div className="bg-white/10 border border-white/20 p-6 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all" onClick={() => copyToClipboard('beenovia_secret')}>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Password</div>
                  <div className="text-2xl font-black">beenovia_secret</div>
                </div>
                <div className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Copy</div>
              </div>
              <div className="bg-white/10 border border-white/20 p-6 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white/20 transition-all" onClick={() => copyToClipboard('9100')}>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Access URL</div>
                  <div className="text-lg font-black italic">http://your-server-ip:9100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3.5rem] p-10 shadow-2xl text-white space-y-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-emerald-400">Terminal Installation Hook</h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">
              Run this one-liner on any fresh Ubuntu instance to provision the entire Beenovia stack automatically.
            </p>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl font-mono text-xs text-blue-400 break-all relative group">
              <code>{installCommand}</code>
              <button 
                onClick={() => copyToClipboard(installCommand)}
                className="absolute right-4 top-4 bg-white/10 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-3 text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Verified for Ubuntu 22.04 / 24.04 LTS
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Detailed Installation */}
          <section className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm p-14 space-y-10">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-blue-200">🚀</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Full Script Source</h2>
            </div>
            
            <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
              "The install.sh script handles everything from Python environments to Nginx gateway configuration."
            </p>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
              <pre className="relative bg-slate-950 text-blue-400 p-10 rounded-[2.5rem] font-mono text-sm overflow-x-auto border border-white/5 shadow-2xl custom-scrollbar max-h-[400px]">
                <code>{installScriptSource}</code>
              </pre>
            </div>
          </section>

          {/* Infrastructure Templates */}
          <section className="bg-white rounded-[3.5rem] border border-slate-200 p-14 space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-3xl">🧱</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Stack Logic</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
               <div className="space-y-4">
                  <h4 className="font-black text-slate-800 uppercase tracking-tight">WordPress Node</h4>
                  <p className="text-slate-500 leading-relaxed">PHP 8.2-FPM + MariaDB 10.6 + Redis Object Cache. Configured with standard Nginx fastcgi templates.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="font-black text-slate-800 uppercase tracking-tight">Full-Stack EHR</h4>
                  <p className="text-slate-500 leading-relaxed">Next.js 14 + Express.js API. Provisioned with MongoDB for records and PostgreSQL for relational data mapping.</p>
               </div>
            </div>
          </section>
        </div>

        {/* Quick Reference Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
             <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">System Map</h3>
             <div className="space-y-6">
                {[
                  { label: 'Binaries', val: '/usr/local/bin/bv' },
                  { label: 'Website Root', val: '/www/wwwroot/' },
                  { label: 'Backup Path', val: '/www/backup/' },
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
             <h3 className="font-black text-xl tracking-tight uppercase">Support Cluster</h3>
             <p className="text-sm font-medium text-indigo-100 leading-relaxed italic">"Infrastructure is not just code; it's the invisible skeleton of the modern web."</p>
             <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                Open GitHub Repository
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsView;
