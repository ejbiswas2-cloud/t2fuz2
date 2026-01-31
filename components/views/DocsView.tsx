
import React from 'react';

const DocsView: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const installCommand = `curl -sSL https://raw.githubusercontent.com/ejbiswas2-c/beenovia/main/install.sh | sudo bash`;

  const networkTroubleshooting = `
# If you see 'Network is unreachable' during install:
1. Check DNS: sudo nano /etc/resolv.conf
   Add: nameserver 8.8.8.8
2. Check Gateway: ip route show
3. Test Ping: ping -c 4 pypi.org
`;

  return (
    <div className="space-y-12 pb-32 max-w-6xl mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter italic">Beenovia<span className="text-blue-600">.</span></h1>
        <p className="text-slate-500 text-xl font-medium tracking-tight">Deployment Orchestration & Infrastructure Management</p>
      </div>

      {/* QUICK START SECTION */}
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

        <div className="bg-slate-900 rounded-[3.5rem] p-10 shadow-2xl text-white space-y-8 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-emerald-400">Terminal Installation Hook</h2>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl font-mono text-xs text-blue-400 break-all relative group mb-6">
              <code>{installCommand}</code>
              <button 
                onClick={() => copyToClipboard(installCommand)}
                className="absolute right-4 top-4 bg-white/10 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </button>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl relative z-10">
             <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 italic">Network Error Fix?</h4>
             <pre className="text-[9px] text-slate-400 font-mono leading-tight whitespace-pre-wrap italic">
               {networkTroubleshooting}
             </pre>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Detailed Installation */}
          <section className="bg-white rounded-[3.5rem] border border-slate-200 shadow-sm p-14 space-y-10">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-blue-200">🚀</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Installation Logic</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
              "The install.sh performs a pre-flight connectivity check to ensure pypi.org is reachable before provisioning Python environments."
            </p>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
               <ul className="space-y-4">
                  {[
                    "Verifies internet routing via curl",
                    "Updates apt repositories and system binaries",
                    "Provisions Cloudflare Tunnel (cloudflared)",
                    "Creates isolated Python venv and installs dependencies",
                    "Registers 'beenovia.service' in systemd"
                  ].map((step, i) => (
                    <li key={i} className="flex items-center space-x-4 text-sm font-bold text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">{i+1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </section>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
             <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase italic">Support</h3>
             <div className="space-y-4 text-xs font-medium text-slate-500 leading-relaxed">
                <p>Ensure port <span className="text-blue-600 font-black">9100</span> is open in your cloud provider's firewall (AWS/GCP/DigitalOcean).</p>
                <p>If you use Cloudflare Tunnel, local ports are managed automatically by the dashboard.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsView;
