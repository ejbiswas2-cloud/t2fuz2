
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', reqs: 4000, latency: 240 },
  { name: 'Tue', reqs: 3000, latency: 198 },
  { name: 'Wed', reqs: 2000, latency: 320 },
  { name: 'Thu', reqs: 2780, latency: 150 },
  { name: 'Fri', reqs: 1890, latency: 210 },
  { name: 'Sat', reqs: 2390, latency: 450 },
  { name: 'Sun', reqs: 3490, latency: 210 },
];

const MetricsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Performance & Analytics</h1>
          <p className="text-slate-500">Traffic analysis and resource bottlenecks.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
          <button className="px-4 py-1.5 text-xs font-bold bg-slate-100 rounded-md">Realtime</button>
          <button className="px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Request Volume (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="reqs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Avg Latency (ms)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Process Manager</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-bold">
              <tr>
                <th className="px-4 py-3">PID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">CPU</th>
                <th className="px-4 py-3">MEM</th>
                <th className="px-4 py-3">Command</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[
                { pid: '1240', user: 'www', cpu: '2.4%', mem: '1.2%', cmd: 'nginx: worker process' },
                { pid: '4501', user: 'root', cpu: '1.2%', mem: '0.8%', cmd: '/usr/bin/python3 dashboard.py' },
                { pid: '8922', user: 'mysql', cpu: '0.5%', mem: '14.2%', cmd: 'mysqld' },
                { pid: '1021', user: 'node', cpu: '4.8%', mem: '3.1%', cmd: 'node app.js' },
              ].map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 font-mono text-xs">
                  <td className="px-4 py-3">{p.pid}</td>
                  <td className="px-4 py-3">{p.user}</td>
                  <td className="px-4 py-3 text-emerald-600 font-bold">{p.cpu}</td>
                  <td className="px-4 py-3">{p.mem}</td>
                  <td className="px-4 py-3 text-slate-600 truncate max-w-xs">{p.cmd}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-red-500 hover:underline font-bold">Kill</button>
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

export default MetricsView;
