
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings & Configuration</h1>
          <p className="text-slate-500">Global panel settings and notification preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Panel Name</label>
                <input defaultValue="CloudNova Production" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Administrator Email</label>
                <input defaultValue="admin@cloudnova.io" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Timezone</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>CET (Central European Time)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Default Document Root</label>
                <input defaultValue="/www/wwwroot" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Notification Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">📧</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Email Notifications</div>
                    <div className="text-xs text-slate-500">Send alerts to admin email</div>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg">Configured</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">💬</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Discord Webhook</div>
                    <div className="text-xs text-slate-500">Push status alerts to channel</div>
                  </div>
                </div>
                <button className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg">Enable</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">📱</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">SMS Alerts</div>
                    <div className="text-xs text-slate-500">Requires Twilio Integration</div>
                  </div>
                </div>
                <button className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg disabled cursor-not-allowed">Pro Only</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">🚀</span> Optimization Engine
            </h3>
            <p className="text-slate-400 text-sm mb-6">Optimize system kernel, network throughput and I/O scheduler with one click.</p>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              Run System Optimization
            </button>
            <div className="mt-4 text-[10px] text-center text-slate-500 font-mono">
              LAST RUN: 2023-11-15 (Recommended Weekly)
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Security Hardening</h3>
            <div className="space-y-3">
              {[
                'Disable SSH root login',
                'Enable 2FA for Panel',
                'Change Default SSH Port',
                'Install Fail2Ban',
                'Kernel Hardening'
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm text-slate-600">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
              Apply Hardening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
