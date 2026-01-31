
import React from 'react';

const DatabasesView: React.FC = () => {
  const dbs = [
    { id: 1, name: 'cloudnova_prod', type: 'MySQL', user: 'admin_prod', size: '245 MB', status: 'Healthy' },
    { id: 2, name: 'user_analytics', type: 'MongoDB', user: 'analytics_svc', size: '1.2 GB', status: 'Healthy' },
    { id: 3, name: 'staging_app', type: 'PostgreSQL', user: 'stage_db', size: '12 MB', status: 'Healthy' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Databases</h1>
          <p className="text-slate-500">Manage database instances, users, and remote access.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Backup All</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">+ Create Database</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'MySQL / MariaDB', status: 'Running', count: 12, ver: '8.0.35', color: 'bg-orange-500' },
          { name: 'PostgreSQL', status: 'Running', count: 4, ver: '15.4', color: 'bg-blue-500' },
          { name: 'MongoDB', status: 'Running', count: 2, ver: '7.0.1', color: 'bg-emerald-500' },
        ].map((mgr, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full ${mgr.color} flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg`}>
              {mgr.name[0]}
            </div>
            <h3 className="font-bold text-slate-800">{mgr.name}</h3>
            <div className="text-xs text-slate-400 mb-4">Version: {mgr.ver}</div>
            <div className="flex items-center space-x-2 text-sm font-medium mb-6">
              <span className="text-emerald-500 font-bold">● {mgr.status}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{mgr.count} Databases</span>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <button className="py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 transition-colors">Manager</button>
              <button className="py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 transition-colors">Logs</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Database List</h3>
          <input placeholder="Filter databases..." className="text-sm px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-slate-400 uppercase font-semibold">
                <th className="px-6 py-4">Database Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dbs.map((db) => (
                <tr key={db.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">{db.name}</td>
                  <td className="px-6 py-4"><span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{db.type}</span></td>
                  <td className="px-6 py-4 text-sm text-slate-500">{db.user}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{db.size}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Backup</button>
                    <button className="text-slate-400 hover:text-slate-600 text-sm font-medium">Admin</button>
                    <button className="text-red-500 hover:text-red-600 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatabasesView;
