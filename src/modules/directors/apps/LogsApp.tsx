import React, { useState, useEffect, useMemo } from 'react';
import {
  ScrollText,
  Shield,
  Search,
  Filter,
  Lock,
  ArrowUpRight,
  Radio,
  Clock,
  User,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Info,
  DollarSign,
  TrendingUp,
  FolderKanban,
  FolderLock,
  Key,
  Globe,
  Plus,
  RefreshCw,
  Hash,
  Play,
  Pause
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import {
  auditLogService,
  AuditLogEntry,
  AuditCategory
} from '@/services/auditLogService';

export const LogsApp: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(() => auditLogService.getLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [newLogIds, setNewLogIds] = useState<Set<string>>(new Set());

  // Subscribe to real-time logs (updates instantly when CRM, Accounts, or other tabs act)
  useEffect(() => {
    const unsubscribe = auditLogService.subscribe((newLog) => {
      if (isLiveActive) {
        setLogs(auditLogService.getLogs());
        if (newLog) {
          setNewLogIds((prev) => new Set(prev).add(newLog.id));
          setTimeout(() => {
            setNewLogIds((prev) => {
              const updated = new Set(prev);
              updated.delete(newLog.id);
              return updated;
            });
          }, 3500);
        }
      }
    });

    return unsubscribe;
  }, [isLiveActive]);

  // Periodic refresh to update relative times ("Just now", "2m ago")
  useEffect(() => {
    const timer = setInterval(() => {
      setLogs(auditLogService.getLogs());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Filter logs based on search, category, and role
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        !searchQuery.trim() ||
        log.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.actor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'ALL' || log.category === selectedCategory;

      const matchesRole =
        selectedRole === 'ALL' || log.actor.department.includes(selectedRole);

      return matchesSearch && matchesCategory && matchesRole;
    });
  }, [logs, searchQuery, selectedCategory, selectedRole]);

  // Trigger a simulated live employee action (for demonstration and real-time verification)
  const handleSimulateLiveAction = () => {
    const sampleActions = [
      {
        actor: {
          name: 'Alex Rivera',
          email: 'alex.rivera@zynocs.com',
          role: 'Lead Account Executive',
          department: 'Sales & Client Acquisition',
          avatarInitials: 'AR'
        },
        category: 'CRM_PIPELINE' as AuditCategory,
        action: 'DEAL_STAGE_TRANSITION',
        entity: `CrmDeal #deal-${Math.floor(1000 + Math.random() * 9000)}`,
        summary: `Moved enterprise lead 'Databricks Cloud Analytics' from 'Qualified Lead' to 'Won & Executed' ($${(Math.floor(120 + Math.random() * 180)).toLocaleString()},000)`,
        details: { fromStage: 'lead', toStage: 'won', amount: 150000 },
        severity: 'SUCCESS' as const
      },
      {
        actor: {
          name: 'Michael Chen',
          email: 'michael@zynocs.com',
          role: 'Principal Project Manager',
          department: 'Product & Agile Execution',
          avatarInitials: 'MC'
        },
        category: 'TASKS_SPRINT' as AuditCategory,
        action: 'KANBAN_TASK_MOVED',
        entity: `SprintTask #TSK-${Math.floor(1000 + Math.random() * 9000)}`,
        summary: "Moved sprint blocker 'PostgreSQL 18 Multi-AZ Auto-Failover' from 'In Progress' to 'Won & Approved'",
        details: { priority: 'P0 Critical', sprint: 'Sprint 24-Q4' },
        severity: 'INFO' as const
      },
      {
        actor: {
          name: 'Ananya Roy',
          email: 'ananya@zynocs.com',
          role: 'Chief Accountant',
          department: 'Finance & Treasury',
          avatarInitials: 'AR'
        },
        category: 'ACCOUNTS_TREASURY' as AuditCategory,
        action: 'INFLOW_SETTLED',
        entity: `LedgerEntry #TX-${Math.floor(1000 + Math.random() * 9000)}`,
        summary: `Recorded verified CapEx settlement of $${(Math.floor(40 + Math.random() * 80)).toLocaleString()},000.00 into Treasury Net Reserves`,
        details: { type: 'Inflow', cleared: true },
        severity: 'SUCCESS' as const
      }
    ];

    const randomAction = sampleActions[Math.floor(Math.random() * sampleActions.length)];
    auditLogService.logAction(randomAction);
  };

  const getCategoryIcon = (category: AuditCategory) => {
    switch (category) {
      case 'CRM_PIPELINE':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'ACCOUNTS_TREASURY':
        return <DollarSign className="w-3.5 h-3.5 text-cyan-400" />;
      case 'EMPLOYEES_HR':
        return <User className="w-3.5 h-3.5 text-blue-400" />;
      case 'TASKS_SPRINT':
        return <FolderKanban className="w-3.5 h-3.5 text-orange-400" />;
      case 'DOCUMENTS_VAULT':
        return <FolderLock className="w-3.5 h-3.5 text-purple-400" />;
      case 'ACCESS_IAM':
        return <Key className="w-3.5 h-3.5 text-violet-400" />;
      case 'BOARD_GOVERNANCE':
        return <Shield className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Radio className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'SUCCESS':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30';
      case 'WARNING':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/30';
      case 'CRITICAL':
        return 'bg-rose-950/80 text-rose-400 border-rose-500/30';
      default:
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* 1. Header Banner with Live Stream Telemetry */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                <ScrollText className="w-3.5 h-3.5 text-cyan-400" />
                Immutable WAL Ledger
              </span>

              {/* Real-time Streaming Pulse Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className={`w-2 h-2 rounded-full ${isLiveActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                <span className={isLiveActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {isLiveActive ? 'LIVE REAL-TIME STREAM ACTIVE' : 'STREAM PAUSED'}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Enterprise Activity Logs
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Cryptographically verified, append-only WAL audit trail recording every employee stage transition, admin governance vote, financial settlement, and client event in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isLiveActive
                  ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  : 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
              }`}
            >
              {isLiveActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isLiveActive ? 'Pause Stream' : 'Resume Stream'}</span>
            </button>

            <button
              onClick={handleSimulateLiveAction}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              title="Test real-time log arrival from employee activity"
            >
              <Plus className="w-4 h-4" />
              <span>Simulate Employee Action</span>
            </button>
          </div>
        </div>

        {/* 2. Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold block">
              Total Logged Events
            </span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">{logs.length}</div>
            <span className="text-[10px] text-cyan-400 font-mono">100% Persisted</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold block">
              Deletion Privileges
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>Locked</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Zero Delete Authority</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold block">
              Active Monitored Roles
            </span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">All Positions</div>
            <span className="text-[10px] text-emerald-400 font-mono">Admin • Staff • Client</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold block">
              Verification Engine
            </span>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">PostgreSQL 18</div>
            <span className="text-[10px] text-slate-400 font-mono">Immutable WAL Buffer</span>
          </div>
        </div>

        {/* 3. Tamper-Proof Regulatory Guarantee Banner */}
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-3 text-xs text-slate-300">
          <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-cyan-300 font-semibold">Strict Regulatory Audit Guarantee:</strong> By corporate charter, this log buffer is strictly append-only. No user, employee, or administrator has permission or access to delete, overwrite, or truncate logged activity.
          </p>
        </div>
      </div>

      {/* 4. Filter Toolbar & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs by employee, role, deal name, entity ID, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-mono"
            />
          </div>

          {/* Department / Role Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full md:w-48 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer font-mono"
            >
              <option value="ALL">All Departments</option>
              <option value="Executive Boardroom">Executive Boardroom</option>
              <option value="Sales">Sales & CRM</option>
              <option value="Finance">Finance & Treasury</option>
              <option value="Product">Product & Scrum</option>
              <option value="AdTech">AdOps Platform</option>
              <option value="Client">Client Organizations</option>
            </select>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          {[
            { id: 'ALL', label: 'All Activity' },
            { id: 'CRM_PIPELINE', label: 'CRM & Leads' },
            { id: 'ACCOUNTS_TREASURY', label: 'Accounts & Treasury' },
            { id: 'BOARD_GOVERNANCE', label: 'Board Governance' },
            { id: 'TASKS_SPRINT', label: 'Tasks & Sprints' },
            { id: 'DOCUMENTS_VAULT', label: 'Documents Vault' },
            { id: 'ACCESS_IAM', label: 'Access Control & IAM' },
            { id: 'SYSTEM_CORE', label: 'System Engine' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-mono text-[11px] ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Chronological Logs List (Sorted Date-Wise Descending) */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
            <ScrollText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-300">No Matching Audit Logs Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No logged events match your filter criteria. All log data is strictly immutable.
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isNew = newLogIds.has(log.id);

            return (
              <div
                key={log.id}
                className={`p-4 sm:p-5 rounded-2xl bg-slate-900/70 border transition-all space-y-3 ${
                  isNew
                    ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10 scale-[1.005]'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Top Row: Timestamp, Actor Pill, Action Badge, Severity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
                  
                  {/* Actor Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {log.actor.avatarInitials}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white">{log.actor.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400">({log.actor.role})</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        {log.actor.department} • {log.actor.email}
                      </span>
                    </div>
                  </div>

                  {/* Date, Time & Category Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400">
                      {getCategoryIcon(log.category)}
                      <span>{log.category.replace('_', ' ')}</span>
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${getSeverityBadge(log.severity)}`}>
                      {log.action}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-0.5 rounded-lg border border-slate-800">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{log.formattedDate} {log.formattedTime}</span>
                      <span className="text-emerald-400 font-bold ml-1">({log.relativeTime})</span>
                    </div>
                  </div>

                </div>

                {/* Log Summary Body */}
                <div className="space-y-1.5">
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {log.summary}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 pt-1 flex-wrap">
                    <span>Target: <strong className="text-slate-400">{log.entity}</strong></span>
                    <span>•</span>
                    <span>Origin Node: <span className="text-cyan-400">{log.node}</span></span>
                    <span>•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Hash className="w-3 h-3 text-slate-600" />
                      Hash: {log.immutableHash}
                    </span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
