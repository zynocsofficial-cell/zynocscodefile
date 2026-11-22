import React, { useState } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  ArrowLeft,
  Server,
  CheckCircle2,
  Sparkles,
  KeyRound,
  Key,
  Building2,
  Clock,
  Award,
  Database,
  Cpu,
  TrendingUp,
  DollarSign,
  Users,
  Check,
  Copy,
  Plus,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  Vote,
  ExternalLink,
  LayoutDashboard,
  AppWindow,
  Link2,
  FolderLock,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Workflow,
  Contact2,
  LifeBuoy,
  FolderKanban,
  Receipt,
  FolderGit2,
  Eye,
  ChevronDown,
  Code2,
  Briefcase,
  Megaphone,
  CalendarDays,
  Settings,
  User
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Section, SubdomainId } from '@/types';
import { Logo } from '@/components/common/Logo';
import { ArchitectureDesignsApp } from './apps/ArchitectureDesignsApp';
import { CrmApp } from './apps/CrmApp';
import { DocumentsApp } from './apps/DocumentsApp';
import { ImportantLinksApp } from './apps/ImportantLinksApp';
import { ContactsApp } from './apps/ContactsApp';
import { HelpDeskApp } from './apps/HelpDeskApp';
import { AccessControlApp } from './apps/AccessControlApp';
import { TasksApp } from './apps/TasksApp';
import { AccountsApp } from './apps/AccountsApp';
import { CodeReposApp } from './apps/CodeReposApp';
import { MeetingsCalendarApp } from './apps/MeetingsCalendarApp';
import { DirectorProfileSettings } from './profile/DirectorProfileSettings';
import { RolesPreviewApp, SimulatedRoleConfig } from './apps/RolesPreviewApp';
import { RoleDashboard } from '../auth/RoleDashboard';

interface DirectorUser {
  id: string;
  name: string;
  email: string;
  role: string;
  subdomain: string;
  department?: string;
}

interface DirectorsProps {
  user: DirectorUser;
  onSignOut: () => void;
  onNavigate: (section: Section, subdomain?: SubdomainId) => void;
}

export type AppId = 
  | 'roles_preview'
  | 'architecture' 
  | 'crm' 
  | 'documents' 
  | 'meetings'
  | 'links' 
  | 'contacts' 
  | 'helpdesk' 
  | 'access_control' 
  | 'tasks' 
  | 'accounts' 
  | 'code_repos';

interface AppMeta {
  id: AppId;
  name: string;
  category: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

export const Directors: React.FC<DirectorsProps> = ({
  user,
  onSignOut,
  onNavigate
}) => {
  // Navigation States: Sidebar Tab + Selected App + Sidebar Collapsed
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apps' | 'profile'>('dashboard');
  const [selectedApp, setSelectedApp] = useState<AppId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Temporary Key Generator State
  const [inviteEmail, setInviteEmail] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Voting state for resolutions
  const [votedResolutions, setVotedResolutions] = useState<Record<string, string>>({});

  // Perspective / Role Simulation State
  const [simulatedRole, setSimulatedRole] = useState<SimulatedRoleConfig | null>(null);
  const [perspectiveDropdownOpen, setPerspectiveDropdownOpen] = useState(false);

  const PERSPECTIVES: { id: string; label: string; role: SimulatedRoleConfig; icon: any; color: string; desc: string }[] = [
    {
      id: 'client',
      label: 'Enterprise Client',
      desc: 'Active Contract, Deliverables, SOC2, Dedicated 6-Eng Team',
      icon: Building2,
      color: 'text-blue-400',
      role: {
        subdomain: 'client',
        roleName: 'CLIENT_ENTERPRISE_EXECUTIVE',
        userName: 'Sarah Jenkins (CTO, Apex Capital)',
        userEmail: 's.jenkins@apexcapital.io',
        badge: 'CLIENT ENGAGEMENT',
        badgeColor: 'border-blue-500/40 bg-blue-950/40 text-blue-400'
      }
    },
    {
      id: 'engineer',
      label: 'Software Engineer',
      desc: 'Sprint Tickets, CI/CD Health 99.8%, Latency, Git PRs',
      icon: Code2,
      color: 'text-emerald-400',
      role: {
        subdomain: 'work',
        workRole: 'engineer',
        roleName: 'STAFF_SYSTEMS_ENGINEER',
        userName: 'Aarav Sharma (Staff Engineer)',
        userEmail: 'aarav@zynocs.com',
        department: 'Engineering & Cloud Architecture',
        badge: 'ENGINEERING TIER',
        badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
      }
    },
    {
      id: 'hr',
      label: 'HR & Personnel Lead',
      desc: 'Headcount 48 Active, Onboarding, 1-Click Credential Revocation',
      icon: Users,
      color: 'text-purple-400',
      role: {
        subdomain: 'work',
        workRole: 'hr',
        roleName: 'VP_PEOPLE_OPS',
        userName: 'Sara Khan (VP HR)',
        userEmail: 'sara@zynocs.com',
        department: 'Human Resources & Talent',
        badge: 'PEOPLE OPS',
        badgeColor: 'border-purple-500/40 bg-purple-950/40 text-purple-400'
      }
    },
    {
      id: 'accountant',
      label: 'Chief Accountant / Finance',
      desc: 'Payroll $248.5k, AR $84.2k, CapEx Telemetry, Vendor Invoices',
      icon: DollarSign,
      color: 'text-amber-400',
      role: {
        subdomain: 'work',
        workRole: 'accountant',
        roleName: 'CHIEF_ACCOUNTANT',
        userName: 'Ananya Roy (Head of Finance)',
        userEmail: 'ananya@zynocs.com',
        department: 'Finance & Treasury',
        badge: 'FINANCIAL CONTROL',
        badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-400'
      }
    },
    {
      id: 'pm',
      label: 'Project Manager / Scrum',
      desc: '8 Client Projects, 94 Pts Velocity, Zero Critical Blockers',
      icon: Briefcase,
      color: 'text-cyan-400',
      role: {
        subdomain: 'work',
        workRole: 'pm',
        roleName: 'PRINCIPAL_PROJECT_MANAGER',
        userName: 'Michael Chen (Agile Delivery Lead)',
        userEmail: 'michael@zynocs.com',
        department: 'Product & Agile Execution',
        badge: 'AGILE VELOCITY',
        badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400'
      }
    },
    {
      id: 'ads',
      label: 'AdOps Campaign Manager',
      desc: '4.82M Ad Impressions, 3.42% CTR, $18.40 High-Yield eCPM',
      icon: Megaphone,
      color: 'text-pink-400',
      role: {
        subdomain: 'ads',
        roleName: 'ADOPS_OPERATOR',
        userName: 'Elena Rostova (AdOps Lead)',
        userEmail: 'operator@zynocs.com',
        badge: 'ADOPS TELEMETRY',
        badgeColor: 'border-pink-500/40 bg-pink-950/40 text-pink-400'
      }
    },
    {
      id: 'sponsors',
      label: 'Strategic Brand Partner',
      desc: 'Tier-1 Platinum Status, 820,000+ Audience Reach, Keynotes',
      icon: Award,
      color: 'text-yellow-400',
      role: {
        subdomain: 'sponsors',
        roleName: 'SPONSOR_DIRECTOR',
        userName: 'David Miller (TechCloud Global)',
        userEmail: 'sponsor@techcloud.io',
        badge: 'BRAND PARTNERSHIP',
        badgeColor: 'border-yellow-500/40 bg-yellow-950/40 text-yellow-400'
      }
    }
  ];

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const newKey = `ZYN-DIR-KEY-${randomCode}`;
      setGeneratedKey(newKey);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleVote = (resId: string, choice: string) => {
    setVotedResolutions(prev => ({ ...prev, [resId]: choice }));
  };

  const kpis = [
    { label: 'Enterprise Valuation', value: '$18.5M', change: '+24% YoY', icon: TrendingUp, color: 'text-cyan-400' },
    { label: 'Annual Revenue Run Rate', value: '$3.8M', change: '115% of Target', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Operating Cash Runway', value: '28 Months', change: 'Zero Debt Load', icon: Clock, color: 'text-brand-400' },
    { label: 'Active Enterprise Contracts', value: '14 Accounts', change: '98% Retention', icon: Building2, color: 'text-purple-400' },
  ];

  const boardResolutions = [
    {
      id: 'BR-2026-04',
      title: 'Resolution #2026-04: Authorize EMEA Infrastructure Expansion',
      summary: 'Approval to deploy redundant high-frequency Kubernetes clusters in Frankfurt and London with a CapEx allocation of $450,000.',
      status: 'Voting In Progress',
      sponsor: 'Yousuf Mohammed Jaleel (CEO)'
    },
    {
      id: 'BR-2026-03',
      title: 'Resolution #2026-03: Ratification of 2026 Technical Equity Incentive Pool',
      summary: 'Adoption of 4.5% non-dilutive option pool reserved exclusively for Principal Architects and Senior Systems Engineers.',
      status: 'Passed (Unanimous)',
      sponsor: 'Mohammed Khaja Moinuddin (Chairperson)'
    }
  ];

  // Applications Catalog Configuration (Arranged as requested)
  const APPS_LIST: AppMeta[] = [
    {
      id: 'crm',
      name: 'Enterprise CRM & Pipeline',
      category: 'Sales & Client Acquisition',
      description: 'Manage high-ticket enterprise client accounts, interactive drag-and-drop pipeline stages, win probabilities, and revenue forecasting.',
      badge: '$1.45M Pipeline',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
      icon: Users,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/50 border-emerald-500/30 shadow-emerald-500/10'
    },
    {
      id: 'documents',
      name: 'Corporate Documents Vault',
      category: 'Legal & Board Governance',
      description: 'Encrypted document vault containing executed Board resolutions, bilateral NDAs, SOC2 compliance reports, and audited financials.',
      badge: 'AES-256 Vault',
      badgeColor: 'bg-purple-950/60 text-purple-400 border-purple-500/30',
      icon: FolderLock,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-950/50 border-purple-500/30 shadow-purple-500/10'
    },
    {
      id: 'meetings',
      name: 'Executive Meetings & Calendar',
      category: 'Executive Governance & Scheduling',
      description: 'Schedule Board of Directors assemblies, verify quorum authorization, sync Google/Outlook calendars, and launch encrypted video bridges.',
      badge: 'Encrypted WebRTC',
      badgeColor: 'bg-indigo-950/60 text-indigo-400 border-indigo-500/30',
      icon: CalendarDays,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-950/50 border-indigo-500/30 shadow-indigo-500/10'
    },
    {
      id: 'contacts',
      name: 'Corporate Contacts Directory',
      category: 'Organization & Stakeholders',
      description: 'Central address book for enterprise client executives, board members, key vendors, and technology partners.',
      badge: 'Address Book',
      badgeColor: 'bg-blue-950/60 text-blue-400 border-blue-500/30',
      icon: Contact2,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-950/50 border-blue-500/30 shadow-blue-500/10'
    },
    {
      id: 'access_control',
      name: 'Access Control & IAM Security',
      category: 'Security & User Clearance',
      description: 'Centralized RBAC permissions, active session token monitoring, 2FA compliance audit, and instant session revocation.',
      badge: 'Zero-Trust IAM',
      badgeColor: 'bg-violet-950/60 text-violet-400 border-violet-500/30',
      icon: Key,
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-950/50 border-violet-500/30 shadow-violet-500/10'
    },
    {
      id: 'helpdesk',
      name: 'Help Desk & Support Escalations',
      category: 'Client Support & Incidents',
      description: 'Incident dispatch, SLA response monitoring, client escalation tickets, and infrastructure resolution tracking.',
      badge: '99.8% SLA',
      badgeColor: 'bg-rose-950/60 text-rose-400 border-rose-500/30',
      icon: LifeBuoy,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-950/50 border-rose-500/30 shadow-rose-500/10'
    },
    {
      id: 'tasks',
      name: 'Tasks & Sprint Delivery Kanban',
      category: 'Product & Agile Execution',
      description: 'Sprint planning board, engineering blocker tracking, story point velocity, and executive delivery roadmaps.',
      badge: 'Agile Kanban',
      badgeColor: 'bg-orange-950/60 text-orange-400 border-orange-500/30',
      icon: FolderKanban,
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-950/50 border-orange-500/30 shadow-orange-500/10'
    },
    {
      id: 'code_repos',
      name: 'Code Repositories & CI/CD',
      category: 'Engineering & Source Code',
      description: 'Git monorepo tracking, latest commits, branch release status, CI/CD pipelines, and container deployment registry.',
      badge: 'Git Repos (4)',
      badgeColor: 'bg-sky-950/60 text-sky-400 border-sky-500/30',
      icon: FolderGit2,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-950/50 border-sky-500/30 shadow-sky-500/10'
    },
    {
      id: 'accounts',
      name: 'Corporate Accounts & Treasury',
      category: 'Finance & Ledger',
      description: 'Cash flow telemetry, accounts receivable, client ACH billing, vendor CapEx payments, and tax audit readiness.',
      badge: '$8.42M Cash',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
      icon: Receipt,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/50 border-emerald-500/30 shadow-emerald-500/10'
    },
    {
      id: 'architecture',
      name: 'System Architecture & Designs',
      category: 'Infrastructure & Security',
      description: 'Complete interactive system security hierarchy, PostgreSQL 18 data schema, DNS topology, and UI design tokens.',
      badge: 'Interactive Spec',
      badgeColor: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
      icon: Layers,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/50 border-cyan-500/30 shadow-cyan-500/10'
    },
    {
      id: 'links',
      name: 'Important Links Launchpad',
      category: 'Operations & Cloud Tools',
      description: 'Manually add, name, categorize, and launch internal console URLs like AWS, GitHub, Figma, and database portals.',
      badge: 'Launchpad',
      badgeColor: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
      icon: Link2,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-950/50 border-amber-500/30 shadow-amber-500/10'
    },
    {
      id: 'roles_preview',
      name: 'Role & Position Previewer',
      category: 'RBAC & Personnel Simulator',
      description: 'Audit and preview live user dashboards for Clients, Engineers, HR, Finance, Project Managers, and Partners.',
      badge: 'Live Simulator (8 Roles)',
      badgeColor: 'bg-fuchsia-950/60 text-fuchsia-400 border-fuchsia-500/30',
      icon: Eye,
      iconColor: 'text-fuchsia-400',
      iconBg: 'bg-fuchsia-950/50 border-fuchsia-500/30 shadow-fuchsia-500/10'
    }
  ];

  // If Executive Simulator is active, render that role's real live dashboard
  if (simulatedRole) {
    return (
      <RoleDashboard
        user={{
          name: simulatedRole.userName,
          email: simulatedRole.userEmail,
          role: simulatedRole.roleName,
          subdomain: simulatedRole.subdomain,
          department: simulatedRole.department
        }}
        subdomain={simulatedRole.subdomain}
        initialWorkRole={simulatedRole.workRole}
        onSignOut={onSignOut}
        onNavigate={onNavigate}
        onReturnToDirectors={() => setSimulatedRole(null)}
        onSwitchPerspective={(sub, workR) => {
          const match = PERSPECTIVES.find(p => {
            if (sub === 'work') return p.role.workRole === workR;
            return p.role.subdomain === sub;
          });
          if (match) {
            setSimulatedRole(match.role);
          }
        }}
      />
    );
  }

  return (
    <div className="h-screen w-full bg-[#020617] text-slate-200 flex overflow-hidden font-sans relative">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR NAVIGATION (Desktop: Persistent & Stagnant | Mobile: Drawer) */}
      {/* ========================================================================= */}
      
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 h-screen bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 select-none overflow-hidden ${
        sidebarCollapsed
          ? 'w-0 -translate-x-full md:w-0 md:translate-x-0 opacity-0 pointer-events-none border-r-0'
          : mobileMenuOpen
          ? 'w-64 translate-x-0 opacity-100'
          : 'w-64 -translate-x-full md:translate-x-0 opacity-100'
      }`}>
        
        {/* Fixed Width Inner Wrapper to maintain clean layout during width transitions */}
        <div className="w-64 h-full flex flex-col justify-between shrink-0">
          
          {/* Sidebar Header: Logo & Boardroom Clearance */}
          <div className="p-5 border-b border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <Logo className="h-8 w-auto" />
              
              <div className="flex items-center gap-1.5">
                {/* Arrow in small circle: Click to hide sidebar */}
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  title="Hide sidebar (Full-screen apps view)"
                  className="w-7 h-7 rounded-full bg-slate-900 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all shadow-md cursor-pointer group shrink-0"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Directors Console</span>
              </span>
            </div>
          </div>

        {/* Sidebar Main Navigation Links */}
        <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
          
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">
              Main Menu
            </span>

            {/* Link: Dashboard */}
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {/* Link: Apps */}
            <button
              onClick={() => {
                setActiveTab('apps');
                setSelectedApp(null);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'apps' && selectedApp === null
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : activeTab === 'apps'
                  ? 'bg-slate-900 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <AppWindow className="w-4 h-4" />
                <span>Apps</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'apps' && selectedApp === null ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {APPS_LIST.length}
              </span>
            </button>

            {/* Link: Director Profile & Settings */}
            <button
              onClick={() => {
                setActiveTab('profile');
                setSelectedApp(null);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Profile & Settings</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          {/* Sub-menu: Direct App Jump Links */}
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            <span className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">
              Apps Suite
            </span>

            {APPS_LIST.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setActiveTab('apps');
                  setSelectedApp(app.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs transition-all ${
                  activeTab === 'apps' && selectedApp === app.id
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <app.icon className={`w-3.5 h-3.5 ${activeTab === 'apps' && selectedApp === app.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{app.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Sidebar Footer: User Profile & Session Controls */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950">
          <div 
            onClick={() => {
              setActiveTab('profile');
              setSelectedApp(null);
              setMobileMenuOpen(false);
            }}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 space-y-1 cursor-pointer transition-all group"
            title="Open Director Profile & Settings"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate block">{user.name}</span>
              <Settings className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:rotate-45 transition-all" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono truncate block">{user.email}</span>
            <span className="text-[10px] text-emerald-400 font-mono block pt-0.5">
              ● PostgreSQL 18 (Port 8800)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate(Section.Home)}
              className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-[11px] font-semibold border border-slate-800 transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Website</span>
            </button>

            <button
              onClick={onSignOut}
              className="py-2 px-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-[11px] font-bold border border-red-500/30 transition-all flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 2. RIGHT MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="flex-1 h-screen overflow-y-auto min-w-0 flex flex-col transition-all duration-300">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Arrow in small circle: Click to show/restore sidebar when hidden */}
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                title="Show sidebar"
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all shadow-md cursor-pointer group shrink-0 animate-fade-in"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 md:hidden"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">Directors</span>
              <span className="text-slate-600">/</span>
              <button 
                onClick={() => { setActiveTab('dashboard'); setSelectedApp(null); }}
                className={`${activeTab === 'dashboard' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Dashboard
              </button>
              {activeTab === 'apps' && (
                <>
                  <span className="text-slate-600">/</span>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className={`${selectedApp === null ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Apps
                  </button>
                </>
              )}
              {activeTab === 'apps' && selectedApp && (
                <>
                  <span className="text-slate-600">/</span>
                  <span className="text-cyan-300 font-bold">
                    {APPS_LIST.find(a => a.id === selectedApp)?.name}
                  </span>
                </>
              )}
              {activeTab === 'profile' && (
                <>
                  <span className="text-slate-600">/</span>
                  <span className="text-cyan-300 font-bold">Director Profile & Settings</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Profile & Settings Button */}
            <button
              onClick={() => {
                setActiveTab('profile');
                setSelectedApp(null);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-md cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border-slate-700/80 hover:border-slate-600'
              }`}
              title="Open Director Profile & Settings"
            >
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                KM
              </div>
              <span className="hidden sm:inline font-bold">Profile & Settings</span>
              <Settings className={`w-3.5 h-3.5 ${activeTab === 'profile' ? 'text-cyan-400 rotate-45' : 'text-slate-400'} transition-transform`} />
            </button>

            {/* Perspective Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPerspectiveDropdownOpen(!perspectiveDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all shadow-md group cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-slate-400">Perspective:</span>
                <span className="font-bold text-cyan-300">Board Director</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {perspectiveDropdownOpen && (
                <>
                  <div
                    onClick={() => setPerspectiveDropdownOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-950/95 border border-slate-800 p-2 shadow-2xl z-50 backdrop-blur-2xl space-y-1 animate-fade-in-up">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800/80 flex items-center justify-between">
                      <span>Switch Position View</span>
                      <span className="text-cyan-400">8 Personas</span>
                    </div>

                    <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold">Board Director (Current)</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">Active</span>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-1 pt-1">
                      {PERSPECTIVES.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setPerspectiveDropdownOpen(false);
                            setSimulatedRole(p.role);
                          }}
                          className="w-full p-2.5 rounded-xl hover:bg-slate-900 text-left transition-all flex items-start gap-2.5 group cursor-pointer"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 shrink-0">
                            <p.icon className={`w-3.5 h-3.5 ${p.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {p.label}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {p.role.subdomain}.zynocs.com
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                              {p.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 hidden md:inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live: PostgreSQL 18
            </span>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 flex-1">
          
          {/* ========================================================================= */}
          {/* VIEW A: COMPLETE DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in-up">
              
              {/* Dashboard Title & Demo Notice */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Executive Boardroom Governance Panel
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Logged in as <strong className="text-white">{user.name}</strong> ({user.email}) • Subdomain: <span className="font-mono text-cyan-300">directors.zynocs.com</span>
                </p>
              </div>

              {/* Demo Notice Banner */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    <strong className="text-white">Director Boardroom (Demo Mode):</strong> You are authenticated via live PostgreSQL database. Governance voting and invite key creation are functional below.
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                  Node: zynocs_enterprise
                </span>
              </div>

              {/* Executive KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {kpis.map((kpi, idx) => (
                  <SpotlightCard
                    key={idx}
                    spotlightColor="rgba(6, 182, 212, 0.15)"
                    className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold">{kpi.label}</span>
                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white font-mono">{kpi.value}</h3>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">{kpi.change}</span>
                    </div>
                  </SpotlightCard>
                ))}
              </div>

              {/* Two-Column Governance Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column (7 cols): Active Board Resolutions & Voting */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Vote className="w-5 h-5 text-cyan-400" />
                          Board Resolutions & Governance Votes
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Formal matters submitted for executive board approval.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-500">2 Active</span>
                    </div>

                    <div className="space-y-4">
                      {boardResolutions.map((res) => {
                        const currentVote = votedResolutions[res.id];
                        return (
                          <div 
                            key={res.id}
                            className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <span className="text-xs font-mono text-slate-500 block mb-0.5">Sponsor: {res.sponsor}</span>
                                <h4 className="text-sm font-bold text-white">{res.title}</h4>
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 self-start sm:self-auto shrink-0">
                                {res.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed">
                              {res.summary}
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-slate-800/80 gap-3">
                              <span className="text-xs font-mono text-slate-400">
                                Your Vote: {currentVote ? (
                                  <strong className={currentVote === 'Approved' ? 'text-emerald-400' : 'text-red-400'}>
                                    {currentVote} (Cast)
                                  </strong>
                                ) : (
                                  <span className="text-slate-500">Pending Cast</span>
                                )}
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleVote(res.id, 'Approved')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                    currentVote === 'Approved'
                                      ? 'bg-emerald-500 text-slate-950 font-bold'
                                      : 'bg-slate-900 hover:bg-emerald-950/50 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40'
                                  }`}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleVote(res.id, 'Dissented')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                    currentVote === 'Dissented'
                                      ? 'bg-red-500 text-white font-bold'
                                      : 'bg-slate-900 hover:bg-red-950/50 text-slate-300 hover:text-red-300 border border-slate-800 hover:border-red-500/40'
                                  }`}
                                >
                                  Dissent
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>

                {/* Right Column (5 cols): Temporary Invite Key & Board Roster */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Temporary Director Key Generator Card */}
                  <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl space-y-5">
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5" />
                        Invite New Board Director
                      </span>
                      <h4 className="text-base font-bold text-white">
                        Generate Temporary Invite Key
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Directors create time-limited invite keys to appoint trusted partners. Zero HR intervention.
                      </p>
                    </div>

                    <form onSubmit={handleGenerateKey} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Invited Director Corporate Email
                        </label>
                        <input
                          type="email"
                          required
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="newdirector@zynocs.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isGenerating ? 'Generating Key...' : 'Generate 24h Temporary Key'}</span>
                      </button>
                    </form>

                    {/* Generated Key Card */}
                    {generatedKey && (
                      <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-2 animate-fade-in-up">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-cyan-300 font-bold">Temporary Invite Key:</span>
                          <span className="text-[10px] text-slate-400 font-mono">Expires in 24 hrs</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="font-mono text-xs text-white font-bold tracking-wider">{generatedKey}</span>
                          <button
                            onClick={handleCopyKey}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                          >
                            {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          Provide this key to the invited director. They can redeem it on the <strong>Appointment</strong> tab of <code>directors.zynocs.com</code>.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Board Roster Card */}
                  <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Active Board Roster
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-white">Mohammed Khaja Moinuddin</div>
                          <div className="text-[11px] text-cyan-400 font-mono">Founder & Chairperson</div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Online" />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-white">Yousuf Mohammed Jaleel</div>
                          <div className="text-[11px] text-brand-400 font-mono">Founder & Chief Executive Officer</div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Online" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW B1: APPS CATALOG GRID (When "Apps" is clicked in sidebar) */}
          {/* ========================================================================= */}
          {activeTab === 'apps' && selectedApp === null && (
            <div className="space-y-8 animate-fade-in-up">
              
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Enterprise Management Applications
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select an enterprise application below to open its dedicated cockpit and operational tools.
                </p>
              </div>

              {/* Apps Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {APPS_LIST.map((app) => (
                  <SpotlightCard
                    key={app.id}
                    onClick={() => setSelectedApp(app.id)}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      {/* App Header: Big Logo + Name + Category */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* App Logo / Big Icon Box */}
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${app.iconBg} group-hover:scale-105 transition-transform shadow-lg`}>
                            <app.icon className={`w-7 h-7 ${app.iconColor}`} />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                              {app.category}
                            </span>
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {app.name}
                            </h3>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border shrink-0 ${app.badgeColor}`}>
                          {app.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    {/* App Card Action Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">
                        Zynocs Enterprise App
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                        <span>Open Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW B2: APP DETAIL VIEW (When an App Card is clicked) */}
          {/* ========================================================================= */}
          {activeTab === 'apps' && selectedApp !== null && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Back to Apps Breadcrumb Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-all group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to All Apps</span>
                </button>

                {/* Direct switcher between the other apps */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-500 mr-1">Switch:</span>
                  {APPS_LIST.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedApp(a.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedApp === a.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {a.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render the Selected App */}
              {selectedApp === 'roles_preview' && <RolesPreviewApp onLaunchRole={(config) => setSimulatedRole(config)} />}
              {selectedApp === 'architecture' && <ArchitectureDesignsApp />}
              {selectedApp === 'crm' && <CrmApp />}
              {selectedApp === 'documents' && <DocumentsApp />}
              {selectedApp === 'meetings' && <MeetingsCalendarApp />}
              {selectedApp === 'links' && <ImportantLinksApp />}
              {selectedApp === 'contacts' && <ContactsApp />}
              {selectedApp === 'helpdesk' && <HelpDeskApp />}
              {selectedApp === 'access_control' && <AccessControlApp />}
              {selectedApp === 'tasks' && <TasksApp />}
              {selectedApp === 'accounts' && <AccountsApp />}
              {selectedApp === 'code_repos' && <CodeReposApp />}

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW C: DIRECTOR PROFILE & EXECUTIVE SETTINGS */}
          {/* ========================================================================= */}
          {activeTab === 'profile' && (
            <DirectorProfileSettings user={user} onSignOut={onSignOut} />
          )}

        </div>
      </main>

    </div>
  );
};
