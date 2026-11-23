import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  ArrowLeft, 
  CheckCircle2, 
  Users, 
  Code2, 
  DollarSign, 
  Briefcase, 
  Megaphone, 
  Award, 
  Sparkles, 
  Clock, 
  Activity, 
  FileText, 
  Layers, 
  Building2, 
  TrendingUp, 
  UserCheck, 
  UserX,
  Database,
  Cpu,
  Check,
  AlertCircle,
  Download,
  Send,
  Eye,
  Globe
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Section, SubdomainId } from '@/types';
import { Logo } from '@/components/common/Logo';
import { getRootDomainUrl } from '@/services/authService';

interface RoleDashboardProps {
  user: {
    id?: string;
    name: string;
    email: string;
    role: string;
    subdomain: string;
    department?: string;
  };
  subdomain: SubdomainId;
  initialWorkRole?: 'engineer' | 'hr' | 'accountant' | 'pm';
  onSignOut: () => void;
  onNavigate: (section: Section, subdomain?: SubdomainId) => void;
  onReturnToDirectors?: () => void;
  onSwitchPerspective?: (subdomain: SubdomainId, workRole?: 'engineer' | 'hr' | 'accountant' | 'pm') => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  user,
  subdomain,
  initialWorkRole,
  onSignOut,
  onNavigate,
  onReturnToDirectors,
  onSwitchPerspective
}) => {
  // Role switcher for work employees to test different roles (HR, Software Engineer, Accountant, Project Manager)
  const [activeWorkRole, setActiveWorkRole] = useState<'engineer' | 'hr' | 'accountant' | 'pm'>(initialWorkRole || 'engineer');
  const [revokedStaff, setRevokedStaff] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialWorkRole) {
      setActiveWorkRole(initialWorkRole);
    }
  }, [initialWorkRole]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRevokeAccess = (employeeName: string) => {
    if (revokedStaff.includes(employeeName)) {
      setRevokedStaff(prev => prev.filter(s => s !== employeeName));
      showToast(`Credentials and OAuth tokens restored for ${employeeName}`);
    } else {
      setRevokedStaff(prev => [...prev, employeeName]);
      showToast(`Immediate access revoked: Portal session terminated for ${employeeName}`);
    }
  };

  // Subdomain Meta configuration
  const subdomainTitles: Record<SubdomainId, { title: string; badge: string; color: string; desc: string }> = {
    main: {
      title: 'Zynocs Enterprise Hub',
      badge: 'ENTERPRISE ACCESS',
      color: 'border-brand-500/30 text-brand-400 bg-brand-950/50',
      desc: 'Central single sign-on administration and multi-tenant portal management.'
    },
    work: {
      title: 'Zynocs Workplace & Staff Operations',
      badge: 'INTERNAL WORKSPACE ACTIVE',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/50',
      desc: 'Role-based workstation for Software Engineers, HR, Project Managers, and Finance.'
    },
    client: {
      title: 'Client Enterprise Project Portal',
      badge: 'CLIENT ENGAGEMENT ACTIVE',
      color: 'border-blue-500/30 text-blue-400 bg-blue-950/50',
      desc: 'Dedicated enterprise deliverables, sprint progress, security audits, and billing.'
    },
    ads: {
      title: 'Ad Manager & Campaign Intelligence',
      badge: 'AD OPERATIONS VERIFIED',
      color: 'border-purple-500/30 text-purple-400 bg-purple-950/50',
      desc: 'Real-time telemetry on programmatic ad slots, placements, CPM, and impressions.'
    },
    sponsors: {
      title: 'Strategic Sponsor Brand Hub',
      badge: 'PARTNERSHIP VERIFIED',
      color: 'border-amber-500/30 text-amber-400 bg-amber-950/50',
      desc: 'Corporate sponsorship allocations, event brand exposures, and partner deliverables.'
    },
    directors: {
      title: 'Board of Directors Panel',
      badge: 'EXECUTIVE CLEARANCE',
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/50',
      desc: 'Board governance and fiduciary resolutions.'
    }
  };

  const meta = subdomainTitles[subdomain] || subdomainTitles.work;

  return (
    <div className="pb-16 min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden">
      
      {/* Executive Simulation Mode Top Banner */}
      {onReturnToDirectors && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-cyan-950/90 to-slate-950 border-b border-cyan-500/40 px-4 sm:px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider text-[11px] bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              Executive Simulator Active
            </span>
            <span className="text-slate-300 text-xs hidden sm:inline">
              Viewing as <strong className="text-white">{user.name}</strong> • Node: <span className="font-mono text-cyan-400">{subdomain}.zynocs.com</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {onSwitchPerspective && (
              <div className="flex items-center gap-1 bg-slate-950/90 border border-slate-800 rounded-xl p-1">
                <span className="text-[10px] font-mono text-slate-400 px-1.5 uppercase font-bold hidden md:inline">
                  Switch:
                </span>
                <button
                  onClick={() => onSwitchPerspective('client')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'client' ? 'bg-blue-500 text-slate-950' : 'text-blue-400 hover:bg-slate-900'
                  }`}
                >
                  Client
                </button>
                <button
                  onClick={() => onSwitchPerspective('work', 'engineer')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'work' && activeWorkRole === 'engineer' ? 'bg-emerald-500 text-slate-950' : 'text-emerald-400 hover:bg-slate-900'
                  }`}
                >
                  Engineer
                </button>
                <button
                  onClick={() => onSwitchPerspective('work', 'hr')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'work' && activeWorkRole === 'hr' ? 'bg-purple-500 text-slate-950' : 'text-purple-400 hover:bg-slate-900'
                  }`}
                >
                  HR
                </button>
                <button
                  onClick={() => onSwitchPerspective('work', 'accountant')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'work' && activeWorkRole === 'accountant' ? 'bg-amber-500 text-slate-950' : 'text-amber-400 hover:bg-slate-900'
                  }`}
                >
                  Finance
                </button>
                <button
                  onClick={() => onSwitchPerspective('work', 'pm')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'work' && activeWorkRole === 'pm' ? 'bg-cyan-500 text-slate-950' : 'text-cyan-400 hover:bg-slate-900'
                  }`}
                >
                  PM
                </button>
                <button
                  onClick={() => onSwitchPerspective('ads')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'ads' ? 'bg-pink-500 text-slate-950' : 'text-pink-400 hover:bg-slate-900'
                  }`}
                >
                  AdOps
                </button>
                <button
                  onClick={() => onSwitchPerspective('sponsors')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    subdomain === 'sponsors' ? 'bg-yellow-500 text-slate-950' : 'text-yellow-400 hover:bg-slate-900'
                  }`}
                >
                  Sponsor
                </button>
              </div>
            )}

            <button
              onClick={onReturnToDirectors}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Boardroom</span>
            </button>
          </div>
        </div>
      )}

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-accent-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-brand-500/40 text-brand-300 text-xs px-4 py-3 rounded-xl shadow-2xl shadow-brand-500/20 flex items-center gap-2.5 animate-fade-in-up font-mono">
          <Activity className="w-4 h-4 text-brand-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 pt-6">
        
        {/* Top Header Bar (Personalized Dashboard Bar) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
          <div className="flex items-center gap-4">
            <Logo className="h-9 w-auto" />
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${meta.color}`}>
                  <Shield className="w-3.5 h-3.5" />
                  {meta.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live: PostgreSQL 18 (Port 8800)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {meta.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Logged in as <strong className="text-white">{user.name}</strong> ({user.email}) • Node: <span className="font-mono text-brand-300">{subdomain}.zynocs.com</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const isLocal = typeof window !== 'undefined' && window.location.hostname.includes('localhost');
                const isRoot = isLocal ? window.location.hostname === 'localhost' : window.location.hostname.startsWith('zynocs.com');
                if (!isRoot) {
                  window.location.href = getRootDomainUrl();
                } else {
                  onNavigate(Section.Home);
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>

            <button
              onClick={onSignOut}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/30 transition-all flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* WORK SUBDOMAIN: ROLE-BASED DASHBOARD (Engineers, HR, Accounting, PMs) */}
        {subdomain === 'work' && (
          <div className="space-y-6">
            {/* Role Tab Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Employee Role Perspective:
                </span>
                <p className="text-xs text-slate-400">
                  Switch roles to preview the customized workstation for each employee hierarchy tier:
                </p>
              </div>

              <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 flex-wrap gap-1">
                {[
                  { id: 'engineer', label: 'Software Engineer', icon: Code2 },
                  { id: 'hr', label: 'HR & Personnel', icon: Users },
                  { id: 'accountant', label: 'Accountant', icon: DollarSign },
                  { id: 'pm', label: 'Project Manager', icon: Briefcase }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setActiveWorkRole(r.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeWorkRole === r.id
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <r.icon className="w-3.5 h-3.5" />
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Software Engineer View */}
            {activeWorkRole === 'engineer' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Assigned Sprint Tickets</span>
                    <span className="text-2xl font-bold text-white mt-1 block">5 In Progress</span>
                    <span className="text-xs text-emerald-400 mt-2 block font-mono">Sprint 24B • On Track</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">CI/CD Build Health</span>
                    <span className="text-2xl font-bold text-emerald-400 mt-1 block">Passing (99.8%)</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Pipeline #8941 Cleared</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Production API Latency</span>
                    <span className="text-2xl font-bold text-cyan-400 mt-1 block">42 ms</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">p99: 110ms • Normal</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Git Repositories</span>
                    <span className="text-2xl font-bold text-purple-400 mt-1 block">12 Active</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Read/Write Scope</span>
                  </SpotlightCard>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    Engineering Tasks & Pull Requests
                  </h3>
                  <div className="space-y-3">
                    {[
                      { pr: 'PR #142', title: 'Implement PostgreSQL 18 connection pool optimization', repo: 'zynocs-core-api', status: 'Ready for Review' },
                      { pr: 'PR #139', title: 'Zero-downtime database migration schema v2.4', repo: 'zynocs-infra', status: 'Approved' },
                      { pr: 'PR #136', title: 'Hardened JWT revocation list with Redis cluster', repo: 'zynocs-auth', status: 'Merged to Staging' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-emerald-400">{item.pr}</span>
                            <span className="text-xs text-slate-500 font-mono">• {item.repo}</span>
                          </div>
                          <p className="text-sm text-slate-200 mt-0.5">{item.title}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 shrink-0 self-start sm:self-auto">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. HR & Personnel View (Includes Resignation & Access Revocation) */}
            {activeWorkRole === 'hr' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Total Headcount</span>
                    <span className="text-2xl font-bold text-white mt-1 block">48 Active</span>
                    <span className="text-xs text-emerald-400 mt-2 block font-mono">+4 This Quarter</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Pending Onboardings</span>
                    <span className="text-2xl font-bold text-cyan-400 mt-1 block">3 Candidates</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Offer Letters Signed</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Leave Requests</span>
                    <span className="text-2xl font-bold text-amber-400 mt-1 block">2 Pending</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Awaiting Approval</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Access Security State</span>
                    <span className="text-2xl font-bold text-emerald-400 mt-1 block">100% Compliant</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Zero Revocation Leaks</span>
                  </SpotlightCard>
                </div>

                {/* Staff Roster & Access Revocation Console */}
                <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        Staff Directory & Instant Credential Revocation Console
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        When an employee resigns or departs, HR terminates their SSO token and PostgreSQL credentials with one click:
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Aarav Sharma', role: 'Senior Backend Engineer', dept: 'Engineering', email: 'aarav@zynocs.com' },
                      { name: 'Sara Khan', role: 'Product Marketing Manager', dept: 'Growth', email: 'sara@zynocs.com' },
                      { name: 'Vikram Joshi', role: 'Staff Security Architect', dept: 'SecOps', email: 'vikram@zynocs.com' },
                      { name: 'Ananya Roy', role: 'Financial Analyst', dept: 'Finance', email: 'ananya@zynocs.com' }
                    ].map((member, idx) => {
                      const isRevoked = revokedStaff.includes(member.name);
                      return (
                        <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all gap-3 ${
                          isRevoked 
                            ? 'bg-red-950/20 border-red-500/30 text-slate-400' 
                            : 'bg-slate-950/60 border-slate-800/80'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                              isRevoked ? 'bg-red-900/50 text-red-300' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${isRevoked ? 'line-through text-red-300' : 'text-white'}`}>
                                  {member.name}
                                </span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                  {member.dept}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400 block font-mono">{member.role} • {member.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                              isRevoked ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {isRevoked ? 'ACCESS TERMINATED' : 'ACTIVE SESSION'}
                            </span>
                            <button
                              onClick={() => handleRevokeAccess(member.name)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                isRevoked
                                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                  : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}
                            >
                              <UserX className="w-3.5 h-3.5" />
                              <span>{isRevoked ? 'Restore Access' : 'Revoke Access (Resigned)'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Accountant / Finance View */}
            {activeWorkRole === 'accountant' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Monthly Payroll Disbursed</span>
                    <span className="text-2xl font-bold text-emerald-400 mt-1 block">$248,500</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">100% Cleared via ACH</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Outstanding Invoices</span>
                    <span className="text-2xl font-bold text-amber-400 mt-1 block">$84,200</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">3 Client Accounts Due</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Operating Expenses (CapEx)</span>
                    <span className="text-2xl font-bold text-white mt-1 block">$62,100</span>
                    <span className="text-xs text-emerald-400 mt-2 block font-mono">-12% vs Q3 Budget</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Tax & Audit Readiness</span>
                    <span className="text-2xl font-bold text-cyan-400 mt-1 block">Compliant</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Deloitte Audit Prep</span>
                  </SpotlightCard>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Accounts Receivable & Vendor Reconciliation
                  </h3>
                  <div className="space-y-3">
                    {[
                      { ref: 'INV-2026-88', vendor: 'Amazon Web Services (AWS)', amount: '$14,250.00', status: 'Paid', date: 'Nov 18, 2026' },
                      { ref: 'INV-2026-89', vendor: 'Equinix Datacenter Frankfurt', amount: '$8,900.00', status: 'Scheduled (Nov 25)', date: 'Nov 20, 2026' },
                      { ref: 'INV-2026-90', vendor: 'GitHub Enterprise Suite', amount: '$4,800.00', status: 'Paid', date: 'Nov 15, 2026' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 gap-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-slate-400">{item.ref}</span>
                          <p className="text-sm text-white font-semibold">{item.vendor}</p>
                          <span className="text-xs text-slate-500 font-mono">Invoiced: {item.date}</span>
                        </div>
                        <div className="flex items-center gap-3 self-start sm:self-auto">
                          <span className="text-sm font-bold text-emerald-400 font-mono">{item.amount}</span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-800 border border-slate-700 text-slate-300">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Project Manager View */}
            {activeWorkRole === 'pm' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Active Client Projects</span>
                    <span className="text-2xl font-bold text-white mt-1 block">8 Active</span>
                    <span className="text-xs text-emerald-400 mt-2 block font-mono">100% On-Milestone</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Sprint Velocity</span>
                    <span className="text-2xl font-bold text-cyan-400 mt-1 block">94 Pts</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Capacity: 100 Pts</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Active Blockers</span>
                    <span className="text-2xl font-bold text-emerald-400 mt-1 block">0 Critical</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Burndown Health: Green</span>
                  </SpotlightCard>
                  <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-mono">Upcoming Milestone</span>
                    <span className="text-2xl font-bold text-purple-400 mt-1 block">In 4 Days</span>
                    <span className="text-xs text-slate-400 mt-2 block font-mono">Client Sign-off Expected</span>
                  </SpotlightCard>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    Delivery Milestones & Team Capacity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { project: 'FinTech High-Frequency Ledger', client: 'Apex Capital', lead: 'Mohammed K.', progress: 85, dueDate: 'Dec 05, 2026' },
                      { project: 'Healthcare HIPAA Portal Redesign', client: 'MediCorp Systems', lead: 'Sara K.', progress: 60, dueDate: 'Dec 18, 2026' },
                      { project: 'Autonomous Supply Chain Tracking', client: 'LogiGlobal Ltd', lead: 'Aarav S.', progress: 95, dueDate: 'Nov 30, 2026' }
                    ].map((p, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-sm font-bold text-white">{p.project}</span>
                            <span className="text-xs text-slate-400 block font-mono">Client: {p.client} • Lead: {p.lead}</span>
                          </div>
                          <span className="text-xs font-mono text-emerald-400 font-bold self-start sm:self-auto">
                            Due: {p.dueDate} ({p.progress}% Done)
                          </span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CLIENT SUBDOMAIN DASHBOARD */}
        {subdomain === 'client' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Contract Engagement</span>
                <span className="text-2xl font-bold text-white mt-1 block">Enterprise Tier</span>
                <span className="text-xs text-emerald-400 mt-2 block font-mono">SLA: 99.99% Uptime</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Active Project Progress</span>
                <span className="text-2xl font-bold text-blue-400 mt-1 block">Phase 3 of 4</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">78% Milestones Completed</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Dedicated Engineering Team</span>
                <span className="text-2xl font-bold text-white mt-1 block">6 Engineers</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">Assigned Exclusively</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Security Audits</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">SOC2 Type II</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">Audit Cleared (Nov 2026)</span>
              </SpotlightCard>
            </div>

            {/* Deliverables & Milestones */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Active Deliverables & Sprint Roadmaps
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  SLA Health: 100% On-Track
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Core Distributed Architecture Delivery', date: 'Nov 28, 2026', status: 'In Quality Assurance', badge: 'bg-blue-950 text-blue-400 border-blue-500/30' },
                  { title: 'ISO 27001 Cryptographic Key Rotation Audit', date: 'Dec 10, 2026', status: 'Scheduled', badge: 'bg-slate-800 text-slate-300 border-slate-700' },
                  { title: 'Load Stress Testing (150k Req/Sec)', date: 'Completed Nov 14', status: 'Verified Passed', badge: 'bg-emerald-950 text-emerald-400 border-emerald-500/30' }
                ].map((d, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 gap-3">
                    <div>
                      <span className="text-sm font-semibold text-white">{d.title}</span>
                      <span className="text-xs text-slate-400 block font-mono">Target: {d.date}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono border self-start sm:self-auto ${d.badge}`}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dedicated 6-Engineer Team Grid */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Assigned Dedicated Engineering Squad (6 Engineers)
                </h3>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Exclusive Allocation (100% Capacity)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'Dr. Michael Sterling', role: 'Principal Systems Architect', focus: 'Distributed Core & Failover' },
                  { name: 'Sarah Lin', role: 'Staff Frontend Lead', focus: 'High-Frequency UI & WebGL' },
                  { name: 'David Okafor', role: 'Senior Backend Engineer', focus: 'PostgreSQL 18 & GraphQL' },
                  { name: 'Elena Rostova', role: 'Principal SecOps Engineer', focus: 'Zero-Trust IAM & Vault' },
                  { name: 'Kavita Reddy', role: 'Lead DevOps / SRE', focus: 'Kubernetes & AWS EKS' },
                  { name: 'Lucas Bennett', role: 'Senior QA Automation', focus: 'End-to-End Cypress & Load Tests' }
                ].map((eng, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center font-bold text-xs text-blue-300 shrink-0">
                      {eng.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">{eng.name}</span>
                      <span className="text-[11px] text-cyan-400 font-mono block truncate">{eng.role}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{eng.focus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices, Billing & Support Ticket dispatch */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Billing Summary */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Contract Financials & Billing
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Net-30 AutoPay
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Annual Contract:</span>
                    <span className="text-white font-bold text-sm">$450,000.00</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Disbursed & Settled:</span>
                    <span className="font-bold">$375,000.00</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-400">
                    <span>Current Statement (Q4 Milestones):</span>
                    <span className="font-bold">$75,000.00 (Due Dec 15)</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Statement receipt #INV-APEX-2026-Q4 dispatched to corporate email')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Executed Statement & Receipt (PDF)</span>
                </button>
              </div>

              {/* Priority SLA Support Channel */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      Priority SLA Escalation Desk
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-500/30">
                      15-Min SLA Response
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Direct hotline to the Zynocs Executive Engineering Command. Submit priority incident triage requests or scope adjustments directly to your dedicated Lead Architect.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showToast('Priority Dispatch: Dedicated Lead Architect & Account Director notified')}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Priority Engineering Request</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADS SUBDOMAIN DASHBOARD */}
        {subdomain === 'ads' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Total Ad Impressions</span>
                <span className="text-2xl font-bold text-purple-400 mt-1 block">4.82M</span>
                <span className="text-xs text-emerald-400 mt-2 block font-mono">+18% This Month</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Average Click-Through (CTR)</span>
                <span className="text-2xl font-bold text-white mt-1 block">3.42%</span>
                <span className="text-xs text-emerald-400 mt-2 block font-mono">Industry Avg: 1.8%</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Effective CPM</span>
                <span className="text-2xl font-bold text-cyan-400 mt-1 block">$18.40</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">High-Yield Tech Cohort</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Active Campaigns</span>
                <span className="text-2xl font-bold text-white mt-1 block">6 Running</span>
                <span className="text-xs text-emerald-400 mt-2 block font-mono">Zero Fraud Detected</span>
              </SpotlightCard>
            </div>
          </div>
        )}

        {/* SPONSORS SUBDOMAIN DASHBOARD */}
        {subdomain === 'sponsors' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Partnership Status</span>
                <span className="text-2xl font-bold text-amber-400 mt-1 block">Tier-1 Platinum</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">Annual Corporate Partner</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Audience Brand Reach</span>
                <span className="text-2xl font-bold text-white mt-1 block">820,000+</span>
                <span className="text-xs text-emerald-400 mt-2 block font-mono">CTOs & Architects</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Keynote Exposure</span>
                <span className="text-2xl font-bold text-cyan-400 mt-1 block">3 Summits</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">Mainstage Branding</span>
              </SpotlightCard>
              <SpotlightCard className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Deliverables Cleared</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">12 of 12</span>
                <span className="text-xs text-slate-400 mt-2 block font-mono">100% SLA Fulfillment</span>
              </SpotlightCard>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
