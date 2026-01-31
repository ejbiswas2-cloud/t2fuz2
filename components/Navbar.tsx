
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [activity, setActivity] = useState('System Initialized');
  
  useEffect(() => {
    const activities = [
      "New visitor from 192.168.1.1",
      "Cron Job: Database backup completed",
      "SSL Renewal successful for cloudnova.io",
      "High CPU load detected on Node #4",
      "Firewall blocked suspicious IP: 45.33.22.1",
      "PHP 8.2 updated on production domain"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setActivity(activities[i]);
      i = (i + 1) % activities.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center flex-1 max-w-xl">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg mr-4 text-slate-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="relative w-full hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
            placeholder="Search domains, files, or settings..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden lg:flex flex-col items-end mr-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>LIVE: {activity}</span>
          </div>
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-600 relative">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
          <img className="h-8 w-8 rounded-full bg-slate-200" src="https://picsum.photos/32/32?seed=admin" alt="User avatar" />
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-slate-700">Admin User</div>
            <div className="text-xs text-slate-400">Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
