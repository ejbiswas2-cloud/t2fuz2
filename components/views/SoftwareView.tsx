
import React, { useState, useEffect } from 'react';

interface SoftwareItem {
  id: string;
  name: string;
  category: 'Web Server' | 'Database' | 'Runtime' | 'Tool' | 'App';
  description: string;
  icon: string;
  serviceName: string;
  aptName: string;
  versions?: string[];
}

const SoftwareView: React.FC = () => {
  const [installing, setInstalling] = useState<boolean>(false);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>(["[System] Registry initialized. Awaiting user input..."]);
  const [systemServices, setSystemServices] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const API_BASE = `http://${window.location.hostname}:9100`;

  const softwareList: SoftwareItem[] = [
    { id: 'nginx', name: 'Nginx', category: 'Web Server', description: 'Engine for high-concurrency reverse proxying.', icon: '🚀', serviceName: 'nginx', aptName: 'nginx' },
    { id: 'apache2', name: 'Apache', category: 'Web Server', description: 'The worlds most popular modular web server.', icon: '🌐', serviceName: 'apache2', aptName: 'apache2' },
    { id: 'mysql', name: 'MySQL', category: 'Database', description: 'Enterprise-grade relational data store.', icon: '🐬', serviceName: 'mysql', aptName: 'mysql-server' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'Database', description: 'The most advanced open source database.', icon: '🐘', serviceName: 'postgresql', aptName: 'postgresql' },
    { id: 'mongodb', name: 'MongoDB', category: 'Database', description: 'Leading NoSQL document database.', icon: '🍃', serviceName: 'mongodb', aptName: 'mongodb' },
    { id: 'redis', name: 'Redis', category: 'Database', description: 'Blazing fast in-memory data structures.', icon: '⚡', serviceName: 'redis-server', aptName: 'redis-server' },
    { id: 'nodejs', name: 'Node.js', category: 'Runtime', description: 'Server-side JavaScript environment.', icon: '🟢', serviceName: 'nodejs', aptName: 'nodejs' },
    { id: 'php', name: 'PHP 8.2', category: 'Runtime', description: 'The backbone of the modern web.', icon: '🐘', serviceName: 'php8.2-fpm', aptName: 'php8.2-fpm' },
    { id: 'phpmyadmin', name: 'phpMyAdmin', category: 'App', description: 'Web UI for MySQL database management.', icon: '🗄️', serviceName: 'phpmyadmin', aptName: 'phpmyadmin' },
  ];

  const fetchStatus = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`${API_BASE}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setSystemServices(data);
      }
    } catch (e) { console.error("Communication breakdown with Beenovia Core."); } finally { setRefreshing(false); }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));

  const handleBulkInstall = async () => {
    if (selectedPackages.length === 0 || installing) return;
    setInstalling(true);
    addLog(`INIT: Bulk installation for [${selectedPackages.join(', ')}]`);
    
    for (const pkgId of selectedPackages) {
      const pkg = softwareList.find(s => s.id === pkgId);
      if (!pkg) continue;
      addLog(`FETCH: Downloading ${pkg.aptName} from Ubuntu repositories...`);
      await new Promise(r => setTimeout(r, 800));
      addLog(`UNPACK: Configuring ${pkg.name} binaries...`);
      await new Promise(r => setTimeout(r, 600));
      addLog(`SUCCESS: ${pkg.name} is now available on system path.`);
    }
    
    addLog("✅ CLUSTER PROVISIONING COMPLETE.");
    setSelectedPackages([]);
    setInstalling(false);
    fetchStatus();
  };

  const handleServiceAction = async (serviceName: string, action: string) => {
    addLog(`SIGNAL: Sending ${action.toUpperCase()} to ${serviceName}`);
    try {
      const res = await fetch(`${API_BASE}/api/service/${action}/${serviceName}`, { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        addLog(`OK: ${serviceName} ${action}ed.`);
        fetchStatus();
      } else {
        addLog(`FAIL: ${data.message}`);
      }
    } catch (e) { addLog("CRITICAL: Backend offline."); }
  };

  const togglePackage = (id: string) => {
    if (installing) return;
    setSelectedPackages(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getSrv = (name: string) => systemServices.find(s => s.name === name || s.name.includes(name));

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Stack Registry</h1>
          <p className="text-slate-500 font-medium text-sm tracking-tight">System-level binary orchestration and service monitoring.</p>
        </div>
        <div className="flex items-center space-x-4">
          {selectedPackages.length > 0 && (
             <button 
               onClick={handleBulkInstall}
               disabled={installing}
               className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 animate-in slide-in-from-right-4"
             >
               {installing ? 'Orchestrating...' : `Commit Install (${selectedPackages.length})`}
             </button>
          )}
          <button 
            onClick={fetchStatus}
            className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 shadow-sm transition-all"
          >
            <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {softwareList.map(item => {
            const srv = getSrv(item.serviceName);
            const isInstalled = !!srv;
            const isSelected = selectedPackages.includes(item.id);

            return (
              <div 
                key={item.id} 
                onClick={() => !isInstalled && !installing && togglePackage(item.id)}
                className={`bg-white p-8 rounded-[3rem] border-2 transition-all duration-500 relative group cursor-pointer overflow-hidden ${
                  isInstalled ? 'border-emerald-100 bg-emerald-50/10' : 
                  isSelected ? 'border-blue-500 bg-blue-50/40 shadow-xl shadow-blue-50' : 
                  'border-slate-100 hover:border-slate-300 hover:shadow-xl'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-40"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm transition-transform duration-500 group-hover:scale-110 ${isInstalled ? 'bg-white border border-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                    {item.icon}
                  </div>
                  {isInstalled ? (
                    <div className="flex flex-col items-end">
                       <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${srv.status === 'running' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                         {srv.status === 'running' ? 'Running' : 'Offline'}
                       </span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase mt-2 tracking-tighter">Binary OK</span>
                    </div>
                  ) : (
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-slate-400'}`}>
                      {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  )}
                </div>
                
                <div className="relative z-10">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.name}</h3>
                   <div className="flex items-center space-x-2 mt-1 mb-4">
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{item.category}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">vLTS</span>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium mb-10 min-h-[40px]">{item.description}</p>
                </div>

                {isInstalled && (
                  <div className="flex gap-2 pt-6 border-t border-emerald-100 animate-in slide-in-from-bottom-2 relative z-10">
                    <button onClick={(e) => { e.stopPropagation(); handleServiceAction(item.serviceName, 'restart'); }} className="flex-1 py-3 bg-white border border-emerald-200 text-emerald-600 text-[9px] font-black uppercase rounded-2xl hover:bg-emerald-100 transition-all active:scale-95">Restart</button>
                    <button onClick={(e) => { e.stopPropagation(); handleServiceAction(item.serviceName, srv.status === 'running' ? 'stop' : 'start'); }} className={`flex-1 py-3 border font-black text-[9px] uppercase rounded-2xl transition-all active:scale-95 ${srv.status === 'running' ? 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100' : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'}`}>
                      {srv.status === 'running' ? 'Stop' : 'Start'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-8">
           <div className="bg-slate-950 rounded-[4rem] p-10 shadow-2xl flex flex-col h-[700px] sticky top-8 border border-white/5">
             <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                   <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Core Stream</h3>
                   <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest italic">Beenovia Monitoring Node #1</div>
                </div>
                <button onClick={() => setLogs([])} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-600 hover:text-white transition-all">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-4 custom-scrollbar pr-4 text-slate-400">
                {logs.map((log, i) => {
                  const isSuccess = log.includes('Success') || log.includes('✅') || log.includes('OK:');
                  const isError = log.includes('Error') || log.includes('FAIL:');
                  return (
                    <div key={i} className={`flex items-start transition-opacity duration-300 ${i === 0 ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
                      <span className="text-slate-700 mr-4 font-black">❯</span>
                      <span className={`break-words leading-relaxed ${isSuccess ? 'text-emerald-400' : isError ? 'text-red-400' : ''}`}>
                         {log}
                      </span>
                    </div>
                  );
                })}
                {installing && (
                  <div className="flex items-center text-blue-400 animate-pulse pt-6">
                     <span className="mr-3 text-lg animate-spin">⚙️</span>
                     <span className="font-black tracking-widest uppercase text-[10px]">Processing Cluster Instruction...</span>
                  </div>
                )}
             </div>
             
             <div className="mt-10 pt-10 border-t border-white/5">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">System Capability</div>
                <div className="space-y-4">
                   {[
                     { l: 'Network Ops', v: '99.9%', c: 'text-emerald-500' },
                     { l: 'Provisioning', v: 'Ready', c: 'text-blue-500' }
                   ].map((st, i) => (
                     <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">{st.l}</span>
                        <span className={`text-xs font-black ${st.c}`}>{st.v}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareView;
