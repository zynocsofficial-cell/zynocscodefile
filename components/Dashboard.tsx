import React from 'react';
import { Activity, Server, GitBranch, Clock, AlertCircle, CheckCircle, BarChart3, Database, Shield, Zap, Download } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { Section } from '../types';

interface DashboardProps {
  onNavigate?: (section: Section) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const metrics = [
    { label: 'System Uptime', value: '99.99%', trend: '+0.01%', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'API Latency', value: '24ms', trend: '-12ms', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Database Load', value: '34%', trend: 'Stable', icon: Database, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Security Threats', value: '0', trend: 'Protected', icon: Shield, color: 'text-brand-400', bg: 'bg-brand-500/10' },
  ];

  const activities = [
    { time: '10:42 AM', title: 'Deployment Successful', desc: 'v2.4.0 deployed to production', type: 'success' },
    { time: '09:15 AM', title: 'Automated Backup', desc: 'Database snapshot #8821 created', type: 'info' },
    { time: 'Yesterday', title: 'Security Scan', desc: 'Vulnerability audit completed (Clean)', type: 'neutral' },
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in-up">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Command Center
            </h1>
            <p className="text-slate-400 text-sm">Welcome back, <span className="text-brand-400">Admin</span>. System operating normally.</p>
          </div>
          <div className="flex space-x-3">
             <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" /> Export Logs
             </button>
             <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-brand-500/25 transition-colors flex items-center">
                <Activity className="h-4 w-4 mr-2" /> Live Monitor
             </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((m, idx) => (
            <div key={idx} className="glass-card p-5 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-slate-900 border border-slate-700 ${m.trend.includes('+') ? 'text-green-400' : 'text-slate-400'}`}>
                  {m.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{m.value}</h3>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart / Project Status */}
          <div className="lg:col-span-2 space-y-8">
            <div 
                onClick={() => onNavigate && onNavigate(Section.ProjectDetails)}
                className="cursor-pointer"
            >
                <SpotlightCard className="p-6 h-full group" spotlightColor="rgba(56, 189, 248, 0.15)">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                    <Server className="h-5 w-5 mr-2 text-brand-400" /> Active Project: FinTech Core
                    </h3>
                    <div className="flex items-center">
                        <span className="text-xs text-slate-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to view workspace</span>
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                </div>

                {/* Fake Graph Visual */}
                <div className="h-64 w-full bg-slate-900/50 rounded-xl border border-slate-800 mb-6 relative overflow-hidden flex items-end px-2 pt-10 gap-1 group-hover:border-brand-500/30 transition-colors">
                    {/* Simulated Bar Graph */}
                    {Array.from({ length: 40 }).map((_, i) => {
                        const height = Math.random() * 80 + 20;
                        return (
                            <div 
                                key={i} 
                                style={{ height: `${height}%` }} 
                                className="flex-1 bg-gradient-to-t from-brand-600/20 to-brand-400/80 rounded-t-sm transition-all duration-1000 hover:bg-brand-400"
                            ></div>
                        )
                    })}
                    <div className="absolute top-4 left-4 text-xs text-slate-500 font-mono">REQUESTS PER SECOND (RPS)</div>
                </div>

                <div className="space-y-4">
                    <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Milestone: API Integration</span>
                        <span className="text-brand-400 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-brand-500 to-accent-500 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                    </div>
                    </div>
                    <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Milestone: UI Dashboard</span>
                        <span className="text-brand-400 font-bold">60%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-brand-500 to-accent-500 h-2 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                    </div>
                    </div>
                </div>
                </SpotlightCard>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl border border-slate-800 h-full">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-slate-400" /> Recent Activity
              </h3>
              <div className="relative border-l border-slate-800 ml-3 space-y-8">
                {activities.map((act, idx) => (
                  <div key={idx} className="ml-6 relative">
                    <div className={`absolute -left-[31px] h-4 w-4 rounded-full border-2 border-slate-900 ${
                        act.type === 'success' ? 'bg-green-500' : 
                        act.type === 'info' ? 'bg-blue-500' : 'bg-slate-500'
                    }`}></div>
                    <time className="block mb-1 text-xs font-normal leading-none text-slate-500">{act.time}</time>
                    <h3 className="text-sm font-semibold text-white">{act.title}</h3>
                    <p className="mb-4 text-xs font-normal text-slate-400">{act.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/50 transition-all group">
                        <GitBranch className="h-5 w-5 text-slate-400 group-hover:text-brand-400 mb-2" />
                        <span className="text-xs text-slate-300">View Repo</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/50 transition-all group">
                        <AlertCircle className="h-5 w-5 text-slate-400 group-hover:text-red-400 mb-2" />
                        <span className="text-xs text-slate-300">Report Issue</span>
                    </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};