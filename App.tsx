
import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/views/DashboardView';
import DomainsView from './components/views/DomainsView';
import FilesView from './components/views/FilesView';
import DatabasesView from './components/views/DatabasesView';
import SoftwareView from './components/views/SoftwareView';
import SecurityView from './components/views/SecurityView';
import MetricsView from './components/views/MetricsView';
import AdvancedView from './components/views/AdvancedView';
import SettingsView from './components/views/SettingsView';
import CloudflareView from './components/views/CloudflareView';
import DocsView from './components/views/DocsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync with Hash for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ViewType;
      const validViews: ViewType[] = [
        'dashboard', 'domains', 'files', 'databases', 'software', 
        'security', 'metrics', 'advanced', 'settings', 'cloudflare', 'docs'
      ];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'domains': return <DomainsView />;
      case 'files': return <FilesView />;
      case 'databases': return <DatabasesView />;
      case 'software': return <SoftwareView />;
      case 'security': return <SecurityView />;
      case 'metrics': return <MetricsView />;
      case 'advanced': return <AdvancedView />;
      case 'settings': return <SettingsView />;
      case 'cloudflare': return <CloudflareView />;
      case 'docs': return <DocsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        isOpen={sidebarOpen} 
        onNavigate={(v) => { setCurrentView(v); window.location.hash = v; }} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
