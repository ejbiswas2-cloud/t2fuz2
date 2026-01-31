
import React from 'react';
import { ViewType } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  currentView: ViewType;
  isOpen: boolean;
  onNavigate: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, isOpen, onNavigate }) => {
  const navItems: { id: ViewType; label: string; icon: React.FC<any> }[] = [
    { id: 'dashboard', label: 'Pulse Dashboard', icon: ICONS.Dashboard },
    { id: 'domains', label: 'Web & Infrastructure', icon: ICONS.Domains },
    { id: 'files', label: 'Global Assets', icon: ICONS.Files },
    { id: 'databases', label: 'Data Clusters', icon: ICONS.Databases },
    { id: 'software', label: 'App Registry', icon: ICONS.Software },
    { id: 'security', label: 'Zero Trust Security', icon: ICONS.Security },
    { id: 'metrics', label: 'Realtime Analytics', icon: ICONS.Metrics },
    { id: 'cloudflare', label: 'Cloudflare Tunnels', icon: ICONS.Cloudflare },
    { id: 'advanced', label: 'Dev Systems', icon: ICONS.Advanced },
    { id: 'settings', label: 'Global Config', icon: ICONS.Settings },
    { id: 'docs', label: 'Documentation', icon: ICONS.Docs },
  ];

  return (
    <aside 
      className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 md:w-20 overflow-hidden'}`}
    >
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800 shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-900/50">BV</div>
        {isOpen && <span className="font-black text-xl text-white tracking-tighter">Beenovia</span>}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center p-3.5 rounded-xl transition-all group relative ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
              {isOpen && <span className="text-[13px] font-bold tracking-tight">{item.label}</span>}
              {!isOpen && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className={`bg-slate-800/50 rounded-2xl p-4 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-[10px] text-slate-500 mb-2 uppercase font-black tracking-widest">Compute Resource</div>
          <div className="text-xs text-white font-black mb-2 flex justify-between items-center">
             <span>PRO NODE #01</span>
             <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">Optimized</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[42%] transition-all duration-1000"></div>
          </div>
          <div className="text-[10px] mt-2 text-slate-400 flex justify-between font-bold">
            <span>42% Used</span>
            <span>8.0 GB Total</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
