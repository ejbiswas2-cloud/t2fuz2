
import React, { useState } from 'react';

const SecurityView: React.FC = () => {
  const [showManualSSL, setShowManualSSL] = useState(false);
  const [manualCert, setManualCert] = useState({ cert: '', key: '', domain: '' });

  const handleSaveManualSSL = () => {
    if(!manualCert.cert || !manualCert.key || !manualCert.domain) {
      alert("Please fill all fields for manual SSL authorization.");
      return;
    }
    alert(`Manual SSL Certificate saved for ${manualCert.domain}. Service reload required.`);
    setShowManualSSL(false);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Zero Trust</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Enterprise-grade firewall and certificate automation.</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2.5 rounded-2xl text-emerald-600 text-[10px] font-black border border-emerald-100 tracking-widest">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          WAF PROTECTION ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SSL Automation */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="font-black text-slate-800 text-xl uppercase tracking-tighter flex items-center">
            <span className="mr-3">🔒</span> SSL Management Cluster
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 transition-all hover:border-blue-100">
              <div>
                <div className="text-sm font-black text-slate-800 uppercase tracking-tight">Auto-Renew Let's Encrypt</div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Automated 90-day cycle</div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 transition-all hover:border-blue-100">
              <div>
                <div className="text-sm font-black text-slate-800 uppercase tracking-tight">Force HTTPS Routing</div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Strict HSTS redirect</div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className="flex-1 py-4.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95">
               Issue Wildcard Cert
             </button>
             <button onClick={() => setShowManualSSL(true)} className="flex-1 py-4.5 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
               Manual SSL Entry
             </button>
          </div>
        </div>

        {/* Firewall Rules */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-800 text-xl uppercase tracking-tighter flex items-center">
              <span className="mr-3">🧱</span> Global Firewall Core
            </h3>
            <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Provision Rule</button>
          </div>
          <div className="space-y-3">
            {[
              { port: '80', proto: 'TCP', action: 'ALLOW', comment: 'Web Edge' },
              { port: '443', proto: 'TCP', action: 'ALLOW', comment: 'Secure Ingress' },
              { port: '22', proto: 'TCP', action: 'LIMIT', comment: 'Admin SSH' },
              { port: '3306', proto: 'TCP', action: 'BLOCK', comment: 'MySQL External' },
            ].map((rule, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/30 rounded-2xl border border-slate-100 group">
                <div className="flex items-center space-x-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${rule.action === 'ALLOW' || rule.action === 'LIMIT' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  <div>
                    <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Port {rule.port}</span>
                    <span className="text-[10px] text-slate-400 font-bold ml-2">/ {rule.proto}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{rule.comment}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${rule.action === 'ALLOW' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{rule.action}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-slate-50 text-slate-400 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
            Access Security Audit Logs
          </button>
        </div>
      </div>

      {/* Manual SSL Modal */}
      {showManualSSL && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
              <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Manual Cert Injection</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Security Vault v1.4</p>
                 </div>
                 <button onClick={() => setShowManualSSL(false)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">✕</button>
              </div>
              <div className="p-10 space-y-8">
                 <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase mb-3 tracking-widest">Target Domain</label>
                    <input value={manualCert.domain} onChange={e => setManualCert({...manualCert, domain: e.target.value})} placeholder="example.com" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-sm" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="block text-[11px] font-black text-slate-400 uppercase mb-3 tracking-widest">CRT / Certificate</label>
                       <textarea value={manualCert.cert} onChange={e => setManualCert({...manualCert, cert: e.target.value})} placeholder="-----BEGIN CERTIFICATE-----" className="w-full h-40 px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-mono text-[10px] custom-scrollbar" />
                    </div>
                    <div>
                       <label className="block text-[11px] font-black text-slate-400 uppercase mb-3 tracking-widest">Private Key</label>
                       <textarea value={manualCert.key} onChange={e => setManualCert({...manualCert, key: e.target.value})} placeholder="-----BEGIN PRIVATE KEY-----" className="w-full h-40 px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-mono text-[10px] custom-scrollbar" />
                    </div>
                 </div>
              </div>
              <div className="p-8 bg-slate-50 flex gap-4">
                 <button onClick={() => setShowManualSSL(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl uppercase text-[10px] tracking-widest">Cancel</button>
                 <button onClick={handleSaveManualSSL} className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl shadow-blue-100 active:scale-95">
                    Save Certificate to Vault
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SecurityView;
