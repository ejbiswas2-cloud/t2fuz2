
import React from 'react';

const AdvancedView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Advanced Tools</h1>
          <p className="text-slate-500">Shell access, task scheduling, and system configuration.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 ml-4">admin@cloudnova: /www/wwwroot</span>
          </div>
          <button className="text-xs text-slate-400 hover:text-white flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reset
          </button>
        </div>
        <div className="p-6 font-mono text-sm h-64 overflow-y-auto">
          <div className="text-slate-400 mb-2">CloudNova Terminal v2.4.0 (stable)</div>
          <div className="flex space-x-2">
            <span className="text-emerald-500">admin@cloudnova:~$</span>
            <span className="text-white animate-pulse">|</span>
          </div>
          <div className="text-slate-500 mt-4 italic">// Type 'help' for available commands</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">⏰</span> Scheduled Tasks (Cron)
          </h3>
          <div className="space-y-3 mb-6">
            {[
              { schedule: '0 0 * * *', task: 'Daily DB Backup', last: 'Success' },
              { schedule: '*/30 * * * *', task: 'Log Cleanup', last: 'Success' },
            ].map((cron, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-blue-600">{cron.schedule}</div>
                  <div className="text-sm font-semibold text-slate-700">{cron.task}</div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded font-bold uppercase">{cron.last}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-semibold hover:border-blue-300 hover:text-blue-500 transition-all">
            + Add Cron Job
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">🔑</span> SSH Key Manager
          </h3>
          <p className="text-sm text-slate-500 mb-4">Manage public keys for passwordless authentication.</p>
          <div className="space-y-2 mb-6">
            <div className="text-xs p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-100">
              <div className="truncate flex-1 mr-4">
                <span className="font-bold">MacBook-Pro-M2</span>
                <div className="text-slate-400 truncate">ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAB...</div>
              </div>
              <button className="text-red-500 hover:text-red-600 font-bold">Remove</button>
            </div>
          </div>
          <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all">
            Import Public Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedView;
