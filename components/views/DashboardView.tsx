
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardView: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const API_BASE = `http://${window.location.hostname}:9100`;

  const [historyData] = useState(() => [...Array(24)].map((_, i) => ({ 
    time: `${i}:00`, 
    val: 20 + Math.random() * 40 
  })));

  const fetchData = async () => {
    try {
      const [statusRes, servicesRes] = await Promise.all([
        fetch(`${API_BASE}/api/status`),
        fetch(`${API_BASE}/api/services`)
      ]);
      
      if (!statusRes.ok || !servicesRes.ok) throw new Error("Backend Offline");
      
      const statusData = await statusRes.json();
      const servicesData = await servicesRes.json();
      setMetrics(statusData);
      setServices(servicesData);
      setError(null);
      setLoading(false);
    } catch (e) {
      setError("Sync lost with Beenovia Core.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !metrics) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-black text-[10px] tracking-widest uppercase animate-pulse">Synchronizing Infrastructure...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Sync Status Banner */}
      {metrics?.global_tunnel?.active ? (
        <div className="bg-orange-600 text-white px-8 py-4 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-orange-200 animate-in slide-in-from-top-4 duration-500">
           <div className="flex items-center space-x-4">
              <span className="text-2xl">☁️</span>
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Zero-Trust Sync Active</div>
                 <div className="text-sm font-black tracking-tight">Cloudflare Tunnel detected on local system. All traffic is being routed via global edge nodes.</div>
              </div>
           </div>
           <div className="flex items-center space-x-2 bg-white/20 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">Connected</span>
           </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-slate-400 px-8 py-4 rounded-[2rem] flex items-center justify-between border border-white/5">
           <div className="flex items-center space-x-4">
              <span className="text-2xl grayscale">☁️</span>
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em]">Global Tunnel Offline</div>
                 <div className="text-sm font-bold">Cloudflared service is not active on this node. Traffic restricted to local ingress.</div>
              </div>
           </div>
           <button className="text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-5 py-2 rounded-xl">Initialize</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">System Pulse</h1>
          <div className="flex items-center space-x-4 text-xs font-bold text-slate-400">
             <span>Uptime: <span className="text-slate-900">{metrics?.uptime}</span></span>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
             <span>Node: <span className="text-slate-900 font-mono uppercase tracking-tighter">{metrics?.platform?.split('-')[0]}</span></span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <div className="bg-white px-6 py-4 rounded-3xl border border-slate-200 flex flex-col items-center">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Inbound</span>
              <span className="text-lg font-black text-blue-600">4.2 Gbps</span>
           </div>
           <div className="bg-white px-6 py-4 rounded-3xl border border-slate-200 flex flex-col items-center">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Outbound</span>
              <span className="text-lg font-black text-emerald-600">1.8 Gbps</span>
           </div>
        </div>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'CPU LOAD', val: `${metrics?.cpu_usage}%`, icon: '⚡', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'MEM LOAD', val: `${Math.round(metrics?.memory?.percent)}%`, icon: '🧠', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'DISK I/O', val: `${Math.round(metrics?.disk?.percent)}%`, icon: '💾', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'LOAD AVG', val: metrics?.load_avg?.[0].toFixed(2), icon: '📈', color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</span>
              <div className={`w-12 h-12 ${s.bg} rounded-[1.5rem] flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>{s.icon}</div>
            </div>
            <div className={`text-5xl font-black tracking-tighter ${s.color}`}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm h-[450px]">
             <div className="flex items-center justify-between mb-12">
                <h3 className="font-black text-slate-900 tracking-tight text-2xl">Cluster Velocity</h3>
                <div className="flex space-x-2">
                   <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Realtime</button>
                   <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">History</button>
                </div>
             </div>
             <ResponsiveContainer width="100%" height="75%">
                <AreaChart data={historyData}>
                   <defs>
                      <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                         <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <Tooltip 
                     contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '15px' }} 
                     itemStyle={{ fontWeight: '900', color: '#1e293b' }}
                   />
                   <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMain)" strokeWidth={5} />
                </AreaChart>
             </ResponsiveContainer>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 tracking-tight text-2xl mb-12">Binary Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div key={srv.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all group">
                  <div className="flex items-center space-x-5">
                    <div className={`w-3 h-3 rounded-full ${srv.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{srv.name}</div>
                      <div className="text-[9px] text-slate-400 font-black tracking-widest uppercase mt-1">v Stable • 100% Ingress</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-950 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
             <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-12 flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse"></span> Operation Stream
             </h3>
             <div className="space-y-8 relative z-10">
                {[
                  { msg: 'Global Tunnel Sync OK', type: 'System', time: '1s' },
                  { msg: 'Nginx Workers Balanced', type: 'Network', time: '14m' },
                  { msg: 'Postgres VACUUM Done', type: 'Database', time: '1h' },
                  { msg: 'SSL Auto-Renewal Push', type: 'Cert', time: '4h' }
                ].map((log, i) => (
                  <div key={i} className="flex items-start justify-between border-b border-white/5 pb-4">
                     <div className="space-y-1">
                        <div className="text-sm font-black tracking-tight">{log.msg}</div>
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{log.type} Orchestrator</div>
                     </div>
                     <span className="text-[9px] font-black text-slate-700">{log.time}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-12 py-5 bg-white/5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">Export System Log</button>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm text-center">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Realtime Cluster Traffic</div>
             <div className="text-7xl font-black text-slate-900 tracking-tighter mb-4">421</div>
             <div className="flex justify-center items-center space-x-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Edge Sessions</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
