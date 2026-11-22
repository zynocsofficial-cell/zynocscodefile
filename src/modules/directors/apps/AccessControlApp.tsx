import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  UserCheck, 
  UserX, 
  Lock, 
  Fingerprint, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface UserRoleRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  subdomain: string;
  department: string;
  is2fa: boolean;
  status: 'ACTIVE' | 'REVOKED';
  lastLogin: string;
}

const DEFAULT_USERS: UserRoleRecord[] = [
  {
    id: 'u-1',
    name: 'Mohammed Khaja Moinuddin',
    email: 'mohammed@zynocs.com',
    role: 'CHAIRPERSON_FOUNDER',
    subdomain: 'directors.zynocs.com',
    department: 'Executive Board',
    is2fa: true,
    status: 'ACTIVE',
    lastLogin: 'Active Now'
  },
  {
    id: 'u-2',
    name: 'Yousuf Mohammed Jaleel',
    email: 'yousuf@zynocs.com',
    role: 'CEO_DIRECTOR',
    subdomain: 'directors.zynocs.com',
    department: 'Executive Board',
    is2fa: true,
    status: 'ACTIVE',
    lastLogin: '10 mins ago'
  },
  {
    id: 'u-3',
    name: 'Aarav Sharma',
    email: 'aarav@zynocs.com',
    role: 'STAFF_ENGINEER',
    subdomain: 'work.zynocs.com',
    department: 'Engineering',
    is2fa: true,
    status: 'ACTIVE',
    lastLogin: '1 hour ago'
  },
  {
    id: 'u-4',
    name: 'Sara Khan',
    email: 'sara@zynocs.com',
    role: 'HR_MANAGER',
    subdomain: 'work.zynocs.com',
    department: 'Personnel & HR',
    is2fa: true,
    status: 'ACTIVE',
    lastLogin: '3 hours ago'
  },
  {
    id: 'u-5',
    name: 'Vikram Joshi',
    email: 'vikram@zynocs.com',
    role: 'SECURITY_ARCHITECT',
    subdomain: 'work.zynocs.com',
    department: 'SecOps',
    is2fa: true,
    status: 'ACTIVE',
    lastLogin: 'Yesterday'
  },
  {
    id: 'u-6',
    name: 'Ananya Roy',
    email: 'ananya@zynocs.com',
    role: 'LEAD_ACCOUNTANT',
    subdomain: 'work.zynocs.com',
    department: 'Finance',
    is2fa: false,
    status: 'ACTIVE',
    lastLogin: 'Nov 20, 2026'
  }
];

export const AccessControlApp: React.FC = () => {
  const [userRoles, setUserRoles] = useState<UserRoleRecord[]>(DEFAULT_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleToggleRevoke = (id: string) => {
    setUserRoles(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'ACTIVE' ? 'REVOKED' : 'ACTIVE';
        showToast(nextStatus === 'REVOKED' ? `Access revoked for ${u.name}` : `Access restored for ${u.name}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const filtered = userRoles.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono">
          <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Key className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Access Control & Identity Governance (IAM)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise RBAC matrix, active PostgreSQL session state, 2FA compliance, and instant credential revocation.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
            Zero-Trust Enforcement: ACTIVE
          </span>
        </div>
      </div>

      {/* IAM Security Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Active Identities</span>
          <span className="text-2xl font-bold text-white font-mono mt-1 block">{userRoles.filter(u => u.status === 'ACTIVE').length} Active</span>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">Zero Unauthorized Logins</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">2FA / Passkey Enrollment</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">83.3%</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Target: 100% Mandatory</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Revoked Sessions</span>
          <span className="text-2xl font-bold text-red-400 font-mono mt-1 block">{userRoles.filter(u => u.status === 'REVOKED').length} Terminated</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Global Bearer Block</span>
        </SpotlightCard>
        <SpotlightCard className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <span className="text-xs text-slate-400 block font-mono">Subdomain Isolation</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">Enforced</span>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">PostgreSQL 18 user_roles</span>
        </SpotlightCard>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter credentials by name, role, department..."
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
        />
      </div>

      {/* User Roster Table */}
      <div className="space-y-3">
        {filtered.map((user) => {
          const isRevoked = user.status === 'REVOKED';
          return (
            <div
              key={user.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isRevoked ? 'bg-red-950/20 border-red-500/30' : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-bold ${isRevoked ? 'line-through text-red-300' : 'text-white'}`}>
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">• {user.email}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    {user.department}
                  </span>
                  {user.is2fa ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center gap-1">
                      <Fingerprint className="w-3 h-3" />
                      FIDO2 / 2FA
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/60 border border-amber-500/30 text-amber-400">
                      Password Only
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Role: <strong className="text-white">{user.role}</strong> • Node: <span className="text-cyan-300">{user.subdomain}</span> • Last Activity: {user.lastLogin}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                  isRevoked ? 'bg-red-950/60 text-red-400 border-red-500/40' : 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                }`}>
                  {user.status}
                </span>

                <button
                  onClick={() => handleToggleRevoke(user.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isRevoked
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {isRevoked ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                  <span>{isRevoked ? 'Restore Access' : 'Revoke Session'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
