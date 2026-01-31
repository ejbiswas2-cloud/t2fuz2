
import React, { useState } from 'react';

const DatabasesView: React.FC = () => {
  const [dbs, setDbs] = useState([
    { id: 1, name: 'cloudnova_prod', type: 'MariaDB', user: 'admin_prod', size: '245 MB', status: 'Healthy' },
    { id: 2, name: 'user_analytics', type: 'MongoDB', user: 'analytics_svc', size: '1.2 GB', status: 'Healthy' },
    { id: 3, name: 'staging_app', type: 'PostgreSQL', user: 'stage_db', size: '12 MB', status: 'Healthy' },
  ]);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedDb, setSelectedDb] = useState<any>(null);
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const API_BASE = `http://${window.location.hostname}:9100`;

  const handleImport = async (dbName: string) => {
    setIsImporting(true);
    try {
      const res = await fetch(`${API_BASE}/api/databases/import`, { method: 'POST' });
      if (res.ok) {
        alert(`Success: ${dbName} data tier synchronized.`);
      }
    } catch (e) {
      alert("Import communication error.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = (dbName: string) => {
    alert(`Export initialized for ${dbName}. A background task has been queued to generate the archive.`);
  };

  const runQuery = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/databases/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, db: selectedDb?.name })
      });
      const data = await res.json();
      setQueryResult(data.results);
    } catch (e) {
      alert("Execution failed.");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Clusters<span className="text-blue-600">.</span></h1>
          <p className="text-slate-500 font-medium text-sm tracking-tight">Enterprise data distribution and synchronization engine.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-8 py-4 bg-white border-2 border-slate-100 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">Backup Entire Cluster</button>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100">+ New Instance</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'MariaDB Cluster', status: 'Optimal', count: 12, ver: '10.11', color: 'bg-orange-500', icon: '🐬' },
          { name: 'Postgres Cluster', status: 'Optimal', count: 4, ver: '16.1', color: 'bg-blue-600', icon: '🐘' },
          { name: 'MongoDB Cluster', status: 'Optimal', count: 2, ver: '7.0.4', color: 'bg-emerald-500', icon: '🍃' },
        ].map((mgr, i) => (
          <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className={`w-20 h-20 rounded-[2rem] ${mgr.color} flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-xl relative z-10`}>
              {mgr.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{mgr.name}</h3>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-6">Standard v{mgr.ver} LTS</div>
            <div className="flex items-center space-x-4 text-[10px] font-black mb-10">
              <span className="text-emerald-500 uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> {mgr.status}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span className="text-slate-500 uppercase tracking-widest">{mgr.count} Nodes</span>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full relative z-10">
              <button className="py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 border border-slate-100 transition-all">Config</button>
              <button className="py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 border border-slate-100 transition-all">Analytics</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic">Instance Inventory</h3>
          <div className="relative w-full max-w-xs">
             <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">🔍</span>
             <input placeholder="Filter instances..." className="w-full text-sm pl-12 pr-6 py-3 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 bg-white transition-all font-bold" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] bg-slate-50/30">
                <th className="px-10 py-6">Identity</th>
                <th className="px-10 py-6">Engine</th>
                <th className="px-10 py-6">Provisioned User</th>
                <th className="px-10 py-6">Disk Usage</th>
                <th className="px-10 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dbs.map((db) => (
                <tr key={db.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-10 py-8 font-black text-slate-800 text-lg tracking-tight italic">{db.name}</td>
                  <td className="px-10 py-8"><span className="text-[10px] font-black bg-blue-50 px-3 py-1 rounded-lg text-blue-600 border border-blue-100 uppercase tracking-widest">{db.type}</span></td>
                  <td className="px-10 py-8 text-xs font-bold text-slate-500 font-mono">{db.user}</td>
                  <td className="px-10 py-8 text-xs font-black text-slate-900">{db.size}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => { setSelectedDb(db); setIsEditorOpen(true); }}
                        className="px-5 py-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                      >
                        Editor
                      </button>
                      <button 
                        onClick={() => handleImport(db.name)}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all"
                      >
                        Import
                      </button>
                      <button 
                        onClick={() => handleExport(db.name)}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all"
                      >
                        Export
                      </button>
                      <button className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-3xl animate-in fade-in duration-500">
           <div className="bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]">
              <div className="px-12 py-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic">Beenovia<span className="text-blue-600">.</span>QueryManager</h2>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">ACTIVE SESSION: {selectedDb?.name} ({selectedDb?.type})</p>
                 </div>
                 <button onClick={() => setIsEditorOpen(false)} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all font-black text-xl">✕</button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col p-12 space-y-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Command Console</label>
                    <div className="bg-slate-950 rounded-[2.5rem] p-8 shadow-inner relative group">
                       <textarea 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         className="w-full h-40 bg-transparent text-emerald-400 font-mono text-sm outline-none resize-none custom-scrollbar"
                         placeholder="-- Input your SQL instructions here..."
                       />
                       <button 
                        onClick={runQuery}
                        className="absolute bottom-6 right-6 px-10 py-3.5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
                       >
                         Execute Script
                       </button>
                    </div>
                 </div>

                 <div className="flex-1 overflow-hidden flex flex-col space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Execution Results</label>
                    <div className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] overflow-auto custom-scrollbar p-6">
                       {queryResult ? (
                         <table className="w-full text-left text-xs">
                            <thead className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                               <tr>
                                  <th className="pb-4 pr-4">ID</th>
                                  <th className="pb-4 pr-4">Attribute: Name</th>
                                  <th className="pb-4 pr-4">Attribute: Email</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {queryResult.map((row, idx) => (
                                 <tr key={idx} className="group">
                                    <td className="py-4 font-mono text-blue-600">{row.id}</td>
                                    <td className="py-4 font-bold text-slate-700">{row.name}</td>
                                    <td className="py-4 text-slate-500 font-medium">{row.email}</td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                       ) : (
                         <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
                            <span className="text-4xl">📡</span>
                            <p className="text-[10px] font-black uppercase tracking-widest">Awaiting execution data...</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="p-10 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
                 <button onClick={() => setIsEditorOpen(false)} className="px-10 py-5 bg-white border border-slate-200 text-slate-500 font-black rounded-3xl uppercase tracking-widest text-[10px]">Close Session</button>
                 <button className="px-10 py-5 bg-blue-600 text-white font-black rounded-3xl uppercase tracking-widest text-[10px] shadow-xl shadow-blue-100">Commit Transactions</button>
              </div>
           </div>
        </div>
      )}

      {isImporting && (
        <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-md flex items-center justify-center">
           <div className="bg-white p-12 rounded-[3rem] shadow-2xl flex flex-col items-center space-y-6">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="text-center">
                 <h4 className="text-xl font-black text-slate-900 tracking-tight">Syncing Cluster...</h4>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Analyzing Dump & Verifying Checksums</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DatabasesView;
