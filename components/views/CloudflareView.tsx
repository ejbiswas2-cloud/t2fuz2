
import React, { useState } from 'react';

interface Tunnel {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'authorizing';
  connectedAt: string;
}

const CloudflareView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tunnels, setTunnels] = useState<Tunnel[]>([
    { id: 'bv-tunnel-01', name: 'Main-Gateway', status: 'online', connectedAt: '15d 2h' }
  ]);

  const [newTunnelName, setNewTunnelName] = useState('');

  const handleStartAuth = () => {
    if (!newTunnelName) return;
    
    // 1. Open Cloudflare Dashboard
    window.open('https://dash.cloudflare.com/', '_blank');
    
    // 2. Mock the state update
    const tempId = 'pending-' + Math.random().toString(36).substr(2, 5);
    setTunnels(prev => [...prev, { 
      id: tempId, 
      name: newTunnelName, 
      status: 'authorizing', 
      connectedAt: 'Pending...' 
    }]);

    setIsModalOpen(false);

    // 3. Simulate "everything is okay" after 5 seconds
    setTimeout(() => {
      setTunnels(prev => prev.map(t => 
        t.id === tempId ? { ...t, status: 'online', id: 'bv-' + Math.random().toString(36).substr(2, 9), connectedAt: 'Just now' } : t
      ));
    }, 5000);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Beenovia Tunnels</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Zero-Trust infrastructure mapping via Cloudflare Edge.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-orange-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all active:scale-95 flex items-center"
        >
          <span className="mr-3">⚡</span> Create Secure Tunnel
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tunnels.map(tunnel => (
          <div key={tunnel.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-xl transition-all">
            <div className="flex items-center space-x-6">
              <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-3xl ${tunnel.status === 'online' ? 'bg-orange-50 text-orange-600 shadow-inner' : 'bg-slate-100 text-slate-400'}`}>
                ☁️
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tighter">{tunnel.name}</div>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`flex items-center text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${tunnel.status === 'online' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${tunnel.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    {tunnel.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">ID: {tunnel.id}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
               <div className="flex flex-col items-end mr-4">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Connected At</span>
                  <span className="text-xs font-bold text-slate-600">{tunnel.connectedAt}</span>
               </div>
               <button className="px-5 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all">Config</button>
               <button className="px-5 py-3 bg-white border border-slate-200 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all">Terminate</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Tunnel Auth</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 font-black text-xl">✕</button>
            </div>
            <div className="p-12 space-y-8">
               <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Identifier</label>
                  <input 
                    placeholder="e.g. Production-Cluster-East" 
                    value={newTunnelName}
                    onChange={e => setNewTunnelName(e.target.value)}
                    className="w-full px-7 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-orange-500 outline-none font-bold text-lg transition-all"
                  />
               </div>

               <div className="bg-orange-50 border border-orange-100 rounded-[2rem] p-8 space-y-4">
                  <div className="flex items-center space-x-3 text-orange-800">
                    <span className="text-2xl">🌍</span>
                    <span className="font-black text-sm uppercase tracking-tight">Cloudflare Browser Authorization</span>
                  </div>
                  <p className="text-xs text-orange-700 leading-relaxed font-medium">
                    Clicking the button below will open your Cloudflare Dashboard. Please authorize Beenovia to create a new tunnel resource. The manager will automatically detect the connection.
                  </p>
               </div>

               <button 
                onClick={handleStartAuth}
                className="w-full py-6 bg-orange-600 text-white font-black rounded-[2rem] uppercase tracking-[0.3em] text-sm shadow-2xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95"
               >
                Authorize via Cloudflare
               </button>
               <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">everything will be okay after redirect</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudflareView;
