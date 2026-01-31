
import React, { useState } from 'react';

interface Tunnel {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'authorizing';
  connectedAt: string;
  mappingCount?: number;
}

const CloudflareView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tunnels' | 'config'>('tunnels');
  const [tunnels, setTunnels] = useState<Tunnel[]>([
    { id: 'bv-tunnel-01', name: 'Main-Gateway', status: 'online', connectedAt: '15d 2h', mappingCount: 3 }
  ]);

  const [newTunnelName, setNewTunnelName] = useState('');

  const handleStartAuth = () => {
    if (!newTunnelName) return;
    window.open('https://dash.cloudflare.com/', '_blank');
    const tempId = 'pending-' + Math.random().toString(36).substr(2, 5);
    setTunnels(prev => [...prev, { 
      id: tempId, 
      name: newTunnelName, 
      status: 'authorizing', 
      connectedAt: 'Pending...',
      mappingCount: 0
    }]);
    setIsModalOpen(false);
    setTimeout(() => {
      setTunnels(prev => prev.map(t => 
        t.id === tempId ? { ...t, status: 'online', id: 'bv-' + Math.random().toString(36).substr(2, 9), connectedAt: 'Just now' } : t
      ));
    }, 5000);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Edge Ingress</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Zero-Trust infrastructure mapping via Cloudflare Edge.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-orange-600 text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-orange-700 shadow-2xl shadow-orange-100 transition-all active:scale-95 flex items-center"
        >
          <span className="mr-3 text-lg">⚡</span> Provision New Tunnel
        </button>
      </div>

      <div className="flex space-x-2 bg-slate-200/50 p-2 rounded-[2rem] w-fit">
        <button onClick={() => setActiveTab('tunnels')} className={`px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'tunnels' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}>Active Tunnels</button>
        <button onClick={() => setActiveTab('config')} className={`px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}>Config Generator</button>
      </div>

      {activeTab === 'tunnels' ? (
        <div className="grid grid-cols-1 gap-8">
          {tunnels.map(tunnel => (
            <div key={tunnel.id} className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-10 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-50 rounded-full -mr-24 -mt-24 opacity-30 group-hover:scale-110 transition-transform"></div>
              
              <div className="flex items-center space-x-8 relative z-10">
                <div className={`w-24 h-24 rounded-[3rem] flex items-center justify-center text-4xl ${tunnel.status === 'online' ? 'bg-orange-50 text-orange-600 shadow-inner border border-orange-100' : 'bg-slate-100 text-slate-400'}`}>
                  ☁️
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">{tunnel.name}</div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`flex items-center text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border ${tunnel.status === 'online' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'}`}>
                      <span className={`w-2 h-2 rounded-full mr-2.5 ${tunnel.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {tunnel.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-bold tracking-tight">UUID: {tunnel.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                 <div className="flex flex-col items-end mr-8 bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Mappings</span>
                    <span className="text-lg font-black text-slate-800">{tunnel.mappingCount || 0} Domains</span>
                 </div>
                 <button className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl active:scale-90">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>
                 </button>
                 <button className="w-16 h-16 bg-white border border-slate-200 text-red-500 rounded-[2rem] flex items-center justify-center hover:bg-red-50 transition-all shadow-sm active:scale-90">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-950 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
          <div className="relative z-10 space-y-12">
             <div className="flex items-center justify-between">
                <div className="space-y-1">
                   <h3 className="text-3xl font-black text-white tracking-tighter italic">config.yaml Generator</h3>
                   <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">System Logic Output</p>
                </div>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download YAML</button>
             </div>

             <div className="bg-black/60 rounded-[3rem] p-12 font-mono text-sm text-emerald-400 border border-white/5 shadow-inner leading-loose">
                <div>tunnel: bv-tunnel-01</div>
                <div>credentials-file: /root/.cloudflared/bv-tunnel-01.json</div>
                <div className="mt-4 text-slate-500"># Auto-Syncing Ingress Rules:</div>
                <div className="mt-2">ingress:</div>
                <div className="pl-6">- hostname: main-wordpress.io</div>
                <div className="pl-12">service: http://localhost:80</div>
                <div className="pl-6">- hostname: system-ehr.health</div>
                <div className="pl-12">service: http://localhost:3000</div>
                <div className="pl-6">- service: http_status:404</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-4">
                   <h4 className="text-white font-black text-sm uppercase tracking-tight">Synchronization Logic</h4>
                   <p className="text-slate-500 text-xs leading-relaxed font-medium">When you toggle "Cloudflare Tunnel" on any website node, Beenovia orchestrator automatically appends the hostname and localhost mapping to the system-wide tunnel config and restarts the cloudflared service.</p>
                </div>
                <div className="flex items-center justify-center p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                   <div className="flex items-center space-x-4">
                      <div className="text-3xl">🔄</div>
                      <div className="text-[10px] font-black text-white uppercase tracking-widest">Real-time Sync Active</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[4rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-12 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <div className="space-y-1">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic leading-none">Tunnel Auth</h2>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Provisioning Layer 4</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all font-black text-xl shadow-sm">✕</button>
            </div>
            <div className="p-12 space-y-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Unique Identifier</label>
                  <input 
                    placeholder="e.g. Cluster-Edge-East" 
                    value={newTunnelName}
                    onChange={e => setNewTunnelName(e.target.value)}
                    className="w-full px-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:border-orange-500 outline-none font-black text-xl transition-all shadow-inner"
                  />
               </div>

               <div className="bg-orange-50 border border-orange-100 rounded-[3rem] p-10 space-y-6">
                  <div className="flex items-center space-x-4 text-orange-800">
                    <span className="text-3xl">🌍</span>
                    <span className="font-black text-sm uppercase tracking-tight">Cloudflare Browser Hook</span>
                  </div>
                  <p className="text-xs text-orange-700 leading-relaxed font-medium">
                    This will open the Cloudflare Zero-Trust Dashboard. You must authorize Beenovia to generate the .pem certificate for the edge instance.
                  </p>
               </div>

               <button 
                onClick={handleStartAuth}
                className="w-full py-8 bg-orange-600 text-white font-black rounded-[2.5rem] uppercase tracking-[0.4em] text-xs shadow-2xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95"
               >
                Authorize Edge Node
               </button>
               <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Sync state will update after browser return</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudflareView;
