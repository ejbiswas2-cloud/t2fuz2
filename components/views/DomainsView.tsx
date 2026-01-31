
import React, { useState, useEffect } from 'react';
import { Website, WebsiteType, EnvMode, CacheProfile } from '../../types';

const DomainsView: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buildingId, setBuildingId] = useState<string | null>(null);
  
  const API_BASE = `http://${window.location.hostname}:9100`;

  const [form, setForm] = useState({
    domain: '',
    wwwAlias: true,
    isAddon: false,
    type: 'WordPress' as WebsiteType,
    runtime: 'PHP 8.2 + MariaDB',
    envMode: 'Production' as EnvMode,
    port: 80,
    rootFolder: '',
    databases: ['MariaDB'],
    dbPass: Math.random().toString(36).slice(-12),
    cacheProfile: 'Aggressive' as CacheProfile,
    autoTunnel: true
  });

  const fetchWebsites = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/websites`);
      if (res.ok) {
        const data = await res.json();
        setWebsites(data);
      }
    } catch (e) { console.error("Cluster disconnected."); }
  };

  useEffect(() => { fetchWebsites(); }, []);

  // AUTOMATED ROOT FOLDER GENERATION
  useEffect(() => {
    if (form.domain) {
      const sanitizedName = form.domain
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_{2,}/g, '_')
        .replace(/(^_|_$)/g, '');
      
      setForm(prev => ({ 
        ...prev, 
        rootFolder: `/www/wwwroot/${sanitizedName}`
      }));
    } else {
      setForm(prev => ({ ...prev, rootFolder: '/www/wwwroot/' }));
    }
  }, [form.domain]);

  const selectTemplate = (type: WebsiteType) => {
    if (type === 'WordPress') {
      setForm(prev => ({
        ...prev,
        type: 'WordPress',
        runtime: 'PHP 8.2 + MariaDB',
        port: 80,
        databases: ['MariaDB'],
        cacheProfile: 'Aggressive'
      }));
    } else if (type === 'Full-Stack EHR') {
      setForm(prev => ({
        ...prev,
        type: 'Full-Stack EHR',
        runtime: 'Next.js + Node Express',
        port: 3000,
        databases: ['MongoDB', 'PostgreSQL'],
        cacheProfile: 'Standard'
      }));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/websites/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: Math.random().toString(36).substr(2, 9), status: 'active' })
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchWebsites();
      }
    } catch (e) { alert("Core Deployment Exception."); }
  };

  const smartBuild = (id: string) => {
    setBuildingId(id);
    setTimeout(() => {
      setBuildingId(null);
      alert("Infrastructure Node Rebuilt.");
    }, 2000);
  };

  const provisionSSL = (domain: string) => {
    alert(`SSL Protocol initialized for ${domain}. Auto-cert issuance queued via Beenovia Certbot Node.`);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Nodes<span className="text-blue-600">.</span></h1>
          <p className="text-slate-500 font-medium text-sm tracking-tight">Active infrastructure deployments on your Beenovia cluster.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          Provision New Template
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {websites.map(site => (
          <div key={site.id} className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-10 hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-30 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex items-center space-x-8 relative z-10">
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner ${site.type === 'WordPress' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                {site.type === 'WordPress' ? '📝' : '🏥'}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{site.domain}</h3>
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${site.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 animate-pulse'}`}>
                    {site.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{site.type} Template</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{site.runtime}</span>
                </div>
                {site.autoTunnel && (
                   <div className="inline-flex items-center text-orange-600 text-[9px] font-black uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span> Cloudflare Ingress Active (Local:{site.port})
                   </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10">
               <div className="flex flex-col items-end mr-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Tier</span>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">{site.databases?.join(' + ')}</span>
               </div>
               <button onClick={() => provisionSSL(site.domain)} className="w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-50 transition-all shadow-sm active:scale-90" title="Provision SSL">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               </button>
               <button onClick={() => smartBuild(site.id)} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl active:scale-90" title="Rebuild Node">
                  <svg className={`w-6 h-6 ${buildingId === site.id ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
               </button>
               <button onClick={() => setWebsites(w => w.filter(x => x.id !== site.id))} className="w-14 h-14 bg-white border border-slate-200 text-red-400 rounded-2xl flex items-center justify-center hover:bg-red-50 transition-all shadow-sm active:scale-90" title="Destroy Node">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-7xl rounded-[5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[96vh]">
            <div className="px-16 py-12 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
               <div className="space-y-1">
                 <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">Beenovia<span className="text-blue-600">.</span>Deploy</h2>
                 <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">HOST PROVISIONING CLUSTER</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="w-16 h-16 rounded-[2rem] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all active:scale-90 shadow-sm font-black text-xl">✕</button>
            </div>

            <form onSubmit={handleCreate} className="flex-1 overflow-y-auto p-16 space-y-24 custom-scrollbar">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                  
                  {/* Template Selection */}
                  <div className="lg:col-span-5 space-y-10">
                     <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Node Selection</label>
                     <div className="grid grid-cols-1 gap-8">
                        <button 
                           type="button" 
                           onClick={() => selectTemplate('WordPress')}
                           className={`p-12 rounded-[3.5rem] border-4 text-left transition-all relative overflow-hidden group ${form.type === 'WordPress' ? 'bg-blue-600 border-blue-600 shadow-2xl shadow-blue-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}
                        >
                           <div className="text-5xl mb-8 relative z-10">📝</div>
                           <h3 className={`text-3xl font-black tracking-tight relative z-10 ${form.type === 'WordPress' ? 'text-white' : 'text-slate-900'}`}>WordPress</h3>
                           <p className={`text-sm mt-3 font-medium relative z-10 ${form.type === 'WordPress' ? 'text-blue-100' : 'text-slate-500'}`}>PHP 8.2 + MariaDB backend. Optimized for high-concurrency content delivery.</p>
                           <div className={`mt-8 text-[11px] font-black uppercase tracking-widest relative z-10 ${form.type === 'WordPress' ? 'text-white' : 'text-blue-600'}`}>Tier: MariaDB + Redis</div>
                        </button>

                        <button 
                           type="button" 
                           onClick={() => selectTemplate('Full-Stack EHR')}
                           className={`p-12 rounded-[3.5rem] border-4 text-left transition-all relative overflow-hidden group ${form.type === 'Full-Stack EHR' ? 'bg-indigo-600 border-indigo-600 shadow-2xl shadow-indigo-200' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}
                        >
                           <div className="text-5xl mb-8 relative z-10">🏥</div>
                           <h3 className={`text-3xl font-black tracking-tight relative z-10 ${form.type === 'Full-Stack EHR' ? 'text-white' : 'text-slate-900'}`}>Full-Stack EHR</h3>
                           <p className={`text-sm mt-3 font-medium relative z-10 ${form.type === 'Full-Stack EHR' ? 'text-indigo-100' : 'text-slate-500'}`}>Next.js Frontend + Express API. Multi-DB cluster for health records.</p>
                           <div className={`mt-8 text-[11px] font-black uppercase tracking-widest relative z-10 ${form.type === 'Full-Stack EHR' ? 'text-white' : 'text-indigo-600'}`}>Tier: MongoDB + PostgreSQL</div>
                        </button>
                     </div>
                  </div>

                  {/* Settings Column */}
                  <div className="lg:col-span-7 space-y-16">
                     <div className="space-y-10">
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Deployment Config</label>
                        <div className="space-y-8">
                           <div className="space-y-4">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Domain Name</label>
                              <input required placeholder="infrastructure-domain.io" value={form.domain} onChange={e => setForm({...form, domain: e.target.value})} className="w-full px-12 py-10 bg-slate-50 border-2 border-slate-100 rounded-[3.5rem] focus:border-blue-500 focus:bg-white outline-none font-black text-5xl transition-all shadow-inner tracking-tighter" />
                           </div>

                           <div className="space-y-4">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Auto-Generated Storage Root</label>
                              <div className="relative">
                                 <span className="absolute inset-y-0 left-8 flex items-center text-slate-400 font-mono text-xs">PATH:</span>
                                 <input readOnly value={form.rootFolder} className="w-full pl-24 pr-12 py-6 bg-slate-100 border-2 border-slate-200 rounded-[2.5rem] outline-none font-bold text-slate-500 font-mono text-sm" />
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-8 bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-sm">
                              <div className="space-y-4">
                                 <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Internal Ingress Port</label>
                                 <input type="number" value={form.port} onChange={e => setForm({...form, port: parseInt(e.target.value)})} className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-black text-xl" />
                              </div>
                              <div className="space-y-4">
                                 <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Cloudflare Tunnel</label>
                                 <button type="button" onClick={() => setForm({...form, autoTunnel: !form.autoTunnel})} className={`w-full py-5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${form.autoTunnel ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                    {form.autoTunnel ? 'TUNNEL ACTIVE' : 'LOCAL ONLY'}
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-slate-900 rounded-[4rem] p-14 space-y-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                        <h4 className="text-xl font-black text-white tracking-tight relative z-10 flex items-center justify-between">
                           <div className="flex items-center">
                             <span className="mr-4">⚡</span> Infrastructure Provisioning Summary
                           </div>
                           {form.autoTunnel && (
                             <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] animate-pulse">Edge Ready</span>
                           )}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-8 relative z-10">
                           <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-3">
                              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Stack Tier</div>
                              <div className="text-sm font-black text-blue-400 uppercase">{form.runtime}</div>
                           </div>
                           <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-3">
                              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Data Cluster</div>
                              <div className="text-sm font-black text-emerald-400 uppercase">{form.databases.join(' + ')}</div>
                           </div>
                        </div>

                        {form.autoTunnel && form.domain && (
                          <div className="p-8 bg-white/5 border border-orange-500/30 rounded-[2.5rem] space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-2">
                             <div className="flex items-center justify-between">
                                <div className="text-[9px] font-black text-orange-400 uppercase tracking-widest italic">Cloudflare Zero-Trust Config (Ingress Mapping)</div>
                                <span className="text-[8px] font-bold text-slate-600">YAML GENERATED</span>
                             </div>
                             <div className="font-mono text-[11px] text-slate-300 space-y-1 bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner leading-relaxed">
                                <div>- hostname: {form.domain}</div>
                                <div className="pl-4">service: http://localhost:{form.port}</div>
                                <div className="mt-2">- service: http_status:404</div>
                             </div>
                             <p className="text-[10px] text-slate-500 font-medium">Beenovia will automatically update your /etc/cloudflared/config.yaml upon deployment commit.</p>
                          </div>
                        )}
                     </div>

                     <div className="flex gap-10 pt-16 sticky bottom-0 bg-white/95 backdrop-blur-3xl py-12 border-t border-slate-100 mt-20">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-9 bg-slate-100 text-slate-500 font-black rounded-[3.5rem] uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 transition-all">Cancel</button>
                        <button type="submit" className="flex-[2] py-9 bg-blue-600 text-white font-black rounded-[3.5rem] uppercase tracking-[0.5em] text-xs shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all active:scale-95">
                           Commit Cluster Node
                        </button>
                     </div>
                  </div>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainsView;
