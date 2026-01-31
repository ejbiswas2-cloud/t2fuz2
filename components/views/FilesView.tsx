
import React from 'react';

const FilesView: React.FC = () => {
  const files = [
    { name: 'wwwroot', type: 'folder', size: '-', modified: '2023-11-20 14:20', perms: '755' },
    { name: 'logs', type: 'folder', size: '-', modified: '2023-11-21 09:12', perms: '755' },
    { name: 'backup', type: 'folder', size: '-', modified: '2023-11-15 11:45', perms: '700' },
    { name: 'index.php', type: 'file', size: '2.4 KB', modified: '2023-10-05 16:30', perms: '644' },
    { name: '.htaccess', type: 'file', size: '412 B', modified: '2023-11-02 10:15', perms: '644' },
    { name: 'config.json', type: 'file', size: '1.2 KB', modified: '2023-11-19 22:10', perms: '600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">File Manager</h1>
          <p className="text-slate-500">Root: /www/wwwroot/</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"><svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">New Backup</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center space-x-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto whitespace-nowrap">
          <button className="text-sm font-medium text-blue-600 hover:underline">root</button>
          <span className="text-slate-400">/</span>
          <button className="text-sm font-medium text-blue-600 hover:underline">www</button>
          <span className="text-slate-400">/</span>
          <button className="text-sm font-medium text-slate-800">wwwroot</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /></th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Size</th>
                <th className="px-6 py-3">Modified</th>
                <th className="px-6 py-3">Perms</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3"><input type="checkbox" className="rounded text-blue-600" /></td>
                  <td className="px-6 py-3 flex items-center space-x-3">
                    <span className="text-xl">{f.type === 'folder' ? '📁' : '📄'}</span>
                    <span className="text-sm font-medium text-slate-700">{f.name}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-500">{f.size}</td>
                  <td className="px-6 py-3 text-sm text-slate-500">{f.modified}</td>
                  <td className="px-6 py-3 text-sm text-slate-400 font-mono">{f.perms}</td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-slate-400 hover:text-slate-600 px-2 py-1">Edit</button>
                    <button className="text-slate-400 hover:text-red-500 px-2 py-1">Delete</button>
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

export default FilesView;
