import React from 'react';
import { TrendingUp, Users, Server, DollarSign, Activity, AlertTriangle, CheckCircle, Clock, Search, Filter, MoreVertical, Shield } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const AdminDashboard: React.FC = () => {
  const revenueStats = [
    { label: 'Total Revenue (YTD)', value: '$2.4M', trend: '+12%', color: 'text-green-400', bg: 'bg-green-500/10', icon: DollarSign },
    { label: 'Active Projects', value: '14', trend: '+2', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Server },
    { label: 'Pending Invoices', value: '$145k', trend: '3 Inv', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Clock },
    { label: 'System Load', value: '42%', trend: 'Optimal', color: 'text-brand-400', bg: 'bg-brand-500/10', icon: Activity },
  ];

  const recentSales = [
    { client: 'FinTech Nova', project: 'Core Migration', amount: '$45,000', date: '2 mins ago', status: 'Paid' },
    { client: 'HealthGuard', project: 'AI Module', amount: '$12,500', date: '4 hours ago', status: 'Pending' },
    { client: 'Nexus Stream', project: 'Video CDN', amount: '$28,000', date: '1 day ago', status: 'Paid' },
    { client: 'RetailX', project: 'Security Audit', amount: '$8,000', date: '1 day ago', status: 'Paid' },
    { client: 'LogisticsCo', project: 'ERP Integration', amount: '$55,000', date: '2 days ago', status: 'Overdue' },
  ];

  const activeProjects = [
    { name: 'FinTech Core', client: 'FinTech Nova', progress: 85, status: 'On Track', team: 6 },
    { name: 'Medi-AI Beta', client: 'HealthGuard', progress: 32, status: 'At Risk', team: 4 },
    { name: 'Stream V2', client: 'Nexus', progress: 60, status: 'On Track', team: 8 },
    { name: 'CyberShield', client: 'Global Logistics', progress: 95, status: 'Deploying', team: 3 },
  ];

  const systemLogs = [
    { type: 'deploy', msg: 'Deployed v2.4.1 to Production (US-East)', time: '10:42:05' },
    { type: 'alert', msg: 'High Latency detected in EU-West-2 DB Cluster', time: '10:40:12' },
    { type: 'user', msg: 'Client Login: Sarah (FinTech Nova)', time: '10:38:00' },
    { type: 'sale', msg: 'Invoice #INV-2099 Paid by Nexus Stream', time: '10:15:22' },
    { type: 'system', msg: 'Automated Backup Completed (42GB)', time: '09:00:00' },
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in-up">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider">Owner Access</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Global Overview
            </h1>
            <p className="text-slate-400 text-sm">Monitoring operations across 3 regions and 14 active projects.</p>
          </div>
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 w-full md:w-auto">
            <Search className="h-4 w-4 text-slate-500 mr-2" />
            <input type="text" placeholder="Search clients, logs..." className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-slate-500 w-full md:w-64" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {revenueStats.map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-xl border border-slate-800 hover:border-brand-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center space-x-1">
                    {stat.trend.includes('+') ? <TrendingUp className="h-3 w-3 text-green-400" /> : null}
                    <span className={`text-xs font-medium ${stat.trend.includes('+') ? 'text-green-400' : 'text-slate-400'}`}>
                    {stat.trend}
                    </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sales & Projects Column */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Active Projects Monitor */}
                <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center">
                            <Server className="h-5 w-5 mr-2 text-brand-400" /> Project Health Monitor
                        </h3>
                        <button className="text-slate-500 hover:text-white"><Filter className="h-4 w-4" /></button>
                    </div>
                    <div className="p-6 grid gap-6">
                        {activeProjects.map((proj, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-white font-bold truncate">{proj.name}</h4>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                            proj.status === 'On Track' ? 'bg-green-500/10 text-green-400' :
                                            proj.status === 'At Risk' ? 'bg-red-500/10 text-red-400' :
                                            'bg-blue-500/10 text-blue-400'
                                        }`}>
                                            {proj.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500 mb-2">
                                        <span className="mr-3">{proj.client}</span>
                                        <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> {proj.team} Members</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${
                                                proj.status === 'At Risk' ? 'bg-red-500' : 'bg-brand-500'
                                            }`} 
                                            style={{ width: `${proj.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-white transition-opacity">
                                    <MoreVertical className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Sales Table */}
                <SpotlightCard className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/40" spotlightColor="rgba(34, 197, 94, 0.1)">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center">
                            <DollarSign className="h-5 w-5 mr-2 text-green-400" /> Recent Transactions
                        </h3>
                        <button className="text-xs text-brand-400 font-medium">View All</button>
                    </div>
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 text-xs uppercase font-medium text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Client</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {recentSales.map((sale, i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{sale.client}</div>
                                        <div className="text-xs text-slate-500">{sale.project}</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-white">{sale.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center text-xs font-bold ${
                                            sale.status === 'Paid' ? 'text-green-400' :
                                            sale.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                            {sale.status === 'Paid' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                            {sale.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-xs">{sale.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </SpotlightCard>
            </div>

            {/* System Live Feed Column */}
            <div className="lg:col-span-1">
                <div className="glass-card h-full rounded-xl border border-slate-800 flex flex-col">
                    <div className="p-5 border-b border-slate-800">
                        <h3 className="font-bold text-white flex items-center">
                            <Activity className="h-5 w-5 mr-2 text-brand-400 animate-pulse" /> Live System Feed
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Real-time infrastructure updates</p>
                    </div>
                    
                    {/* Simulated Console Feed */}
                    <div className="flex-1 p-4 space-y-4 overflow-hidden font-mono text-xs relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90 pointer-events-none z-10"></div>
                        
                        {/* Repeat logs to simulate density */}
                        {[...systemLogs, ...systemLogs, ...systemLogs].map((log, i) => (
                            <div key={i} className="flex gap-3 opacity-80 hover:opacity-100 transition-opacity">
                                <span className="text-slate-600 shrink-0">[{log.time}]</span>
                                <div>
                                    <span className={`uppercase font-bold mr-2 ${
                                        log.type === 'deploy' ? 'text-blue-400' :
                                        log.type === 'alert' ? 'text-red-400' :
                                        log.type === 'sale' ? 'text-green-400' :
                                        'text-slate-400'
                                    }`}>
                                        {log.type}
                                    </span>
                                    <span className="text-slate-300">{log.msg}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-800 bg-slate-900/30">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                            <span>CPU Usage</span>
                            <span className="text-brand-400 font-bold">42%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mb-3">
                            <div className="bg-brand-500 h-1 rounded-full w-[42%]"></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                            <span>Memory</span>
                            <span className="text-purple-400 font-bold">68%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full">
                            <div className="bg-purple-500 h-1 rounded-full w-[68%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};