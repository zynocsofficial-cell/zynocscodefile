import React, { useState, useEffect } from 'react';
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
  User,
  UserCheck,
  Edit3,
  Trash2,
  ScrollText
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
import { EmployeesApp } from './apps/EmployeesApp';
import { FreelancersApp } from './apps/FreelancersApp';
import { LogsApp } from './apps/LogsApp';
import { getRootDomainUrl } from '@/services/authService';
import { MeetingsCalendarApp } from './apps/MeetingsCalendarApp';
import { DirectorProfileSettings } from './profile/DirectorProfileSettings';
import { RolesPreviewApp, SimulatedRoleConfig } from './apps/RolesPreviewApp';
import { RoleDashboard } from '../auth/RoleDashboard';
import { ExecutiveRevenueCockpit } from './dashboard/ExecutiveRevenueCockpit';

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
  | 'dashboard'
  | 'profile'
  | 'logs'
  | 'roles_preview'
  | 'architecture' 
  | 'crm' 
  | 'documents' 
  | 'meetings'
  | 'links' 
  | 'contacts' 
  | 'freelancers'
  | 'helpdesk' 
  | 'access_control' 
  | 'tasks' 
  | 'accounts' 
  | 'code_repos'
  | 'employees';

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
  // Navigation States: Selected App (defaults to dashboard app) + Sidebar Collapsed (closed by default)
  const [selectedApp, setSelectedApp] = useState<AppId | null>('dashboard');
  const [selectedAppsCategory, setSelectedAppsCategory] = useState<'all' | 'enterprise' | 'others'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

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

  // Live Boardroom Telemetry dynamically calculated from CRM & Accounts Ledger
  const [crmDeals, setCrmDeals] = useState<Array<{ amount: number; stage: string }>>(() => {
    try {
      const saved = localStorage.getItem('zynocs_crm_pipeline_v6');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [ledgerEntries, setLedgerEntries] = useState<Array<{ amount: number; type: 'Inflow' | 'Outflow' }>>(() => {
    try {
      const saved = localStorage.getItem('zynocs_accounts_ledger_v6');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const refreshData = () => {
      try {
        const savedCrm = localStorage.getItem('zynocs_crm_pipeline_v6');
        if (savedCrm) setCrmDeals(JSON.parse(savedCrm));
        const savedLedger = localStorage.getItem('zynocs_accounts_ledger_v6');
        if (savedLedger) setLedgerEntries(JSON.parse(savedLedger));
      } catch {}
    };
    window.addEventListener('storage', refreshData);
    refreshData();
    return () => window.removeEventListener('storage', refreshData);
  }, [selectedApp]);

  const totalPipeline = crmDeals
    .filter(d => d.stage !== 'Lost')
    .reduce((acc, d) => acc + (Number(d.amount) * 1000 || 0), 0);

  const totalInflow = ledgerEntries
    .filter(l => l.type === 'Inflow')
    .reduce((acc, l) => acc + (Number(l.amount) || 0), 0);

  const totalOutflow = ledgerEntries
    .filter(l => l.type === 'Outflow')
    .reduce((acc, l) => acc + (Number(l.amount) || 0), 0);

  const netReserves = totalInflow - totalOutflow;
  const wonContracts = crmDeals.filter(d => d.stage === 'Won').length;

  const boardKpis = [
    {
      label: 'Client Deal Pipeline',
      value: totalPipeline > 0 ? `$${totalPipeline.toLocaleString()}` : '$0.00',
      change: `${crmDeals.filter(d => d.stage !== 'Lost').length} Active Opportunities`,
      icon: TrendingUp,
      color: 'text-cyan-400'
    },
    {
      label: 'Realized Revenue',
      value: totalInflow > 0 ? `$${totalInflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00',
      change: `${ledgerEntries.filter(l => l.type === 'Inflow').length} Settled Inflows`,
      icon: DollarSign,
      color: 'text-emerald-400'
    },
    {
      label: 'Treasury Net Reserves',
      value: `$${netReserves.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      change: totalOutflow > 0 ? `-$${totalOutflow.toLocaleString()} OpEx` : 'Live Self-Funded',
      icon: Clock,
      color: 'text-brand-400'
    },
    {
      label: 'Active Client Contracts',
      value: `${wonContracts} Accounts`,
      change: wonContracts > 0 ? 'Won & Executed' : 'Clean Roster',
      icon: Building2,
      color: 'text-purple-400'
    },
  ];

  // Executive Board Resolutions (Persisted)
  const [boardResolutions, setBoardResolutions] = useState<Array<{
    id: string;
    title: string;
    summary: string;
    status: string;
    sponsor: string;
  }>>(() => {
    const saved = localStorage.getItem('zynocs_board_resolutions_v6');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [isAddResolutionOpen, setIsAddResolutionOpen] = useState(false);
  const [newResTitle, setNewResTitle] = useState('');
  const [newResSponsor, setNewResSponsor] = useState('Mohammed Khaja Moinuddin (Chairperson)');
  const [newResSummary, setNewResSummary] = useState('');

  const handleProposeResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle.trim()) return;

    const newRes = {
      id: `BR-2026-${Math.floor(10 + Math.random() * 90)}`,
      title: newResTitle.trim(),
      summary: newResSummary.trim() || 'Submitted for formal executive board approval.',
      status: 'Voting In Progress',
      sponsor: newResSponsor
    };

    const updated = [newRes, ...boardResolutions];
    setBoardResolutions(updated);
    localStorage.setItem('zynocs_board_resolutions_v6', JSON.stringify(updated));
    setNewResTitle('');
    setNewResSummary('');
    setIsAddResolutionOpen(false);
  };

  const handleDeleteResolution = (resId: string) => {
    const updated = boardResolutions.filter(r => r.id !== resId);
    setBoardResolutions(updated);
    localStorage.setItem('zynocs_board_resolutions_v6', JSON.stringify(updated));
  };

  // Applications Catalog Configuration (Arranged as requested)
  const APPS_LIST: AppMeta[] = [
    {
      id: 'dashboard',
      name: 'Executive Dashboard & Telemetry',
      category: 'Enterprise Management',
      description: 'Real-time executive performance metrics, deal pipeline, treasury reserves, active contracts, and board voting resolutions.',
      badge: 'Executive Cockpit',
      badgeColor: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
      icon: LayoutDashboard,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/50 border-cyan-500/30 shadow-cyan-500/10'
    },
    {
      id: 'profile',
      name: 'Director Profile & Settings',
      category: 'Enterprise Management',
      description: 'Manage executive boardroom dossier, public legal identity, active session security, and corporate credentials.',
      badge: 'Profile & Settings',
      badgeColor: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
      icon: Settings,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/50 border-cyan-500/30 shadow-cyan-500/10'
    },
    {
      id: 'logs',
      name: 'Enterprise Activity Logs',
      category: 'Enterprise Management',
      description: 'Immutable, tamper-evident real-time audit ledger tracking every action, lead stage change, financial settlement, and employee event across all corporate roles.',
      badge: 'Live WAL Audit (Immutable)',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
      icon: ScrollText,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/50 border-emerald-500/30 shadow-emerald-500/10'
    },
    {
      id: 'crm',
      name: 'Enterprise CRM & Pipeline',
      category: 'Sales & Client Acquisition',
      description: 'Manage high-ticket enterprise client accounts, interactive drag-and-drop pipeline stages, win probabilities, and revenue forecasting.',
      badge: 'Active CRM',
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
      id: 'employees',
      name: 'Employees & Workforce Directory',
      category: 'Human Resources & Personnel',
      description: 'Manage staff profiles, department assignments, compensation tiers, and workforce employment status.',
      badge: 'Workforce Roster',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
      icon: Users,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/50 border-emerald-500/30 shadow-emerald-500/10'
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
      badge: 'Support Desk',
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
      badge: 'Treasury Ledger',
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
    },
    {
      id: 'freelancers',
      name: 'Freelancers & Talent Network',
      category: 'Others',
      description: 'Vetted freelance engineering talent pool, specialized domain filters, LinkedIn direct connect, rate telemetry, and contract availability.',
      badge: 'Others',
      badgeColor: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
      icon: UserCheck,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/50 border-cyan-500/30 shadow-cyan-500/10'
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
          
          {/* Sidebar Header: Logo, Name & Board Member Designation */}
          <div className="p-5 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo className="h-8 w-auto shrink-0" />
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-white tracking-tight leading-none">Zynocs</span>
                  <span className="text-[11px] text-slate-400 font-medium tracking-wide lowercase mt-1">board member</span>
                </div>
              </div>
              
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
          </div>

        {/* Sidebar Main Navigation Links */}
        <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
          
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">
              Main Menu
            </span>

            {/* Link: Apps */}
            <button
              onClick={() => {
                setSelectedApp(null);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedApp === null
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <AppWindow className="w-4 h-4" />
                <span>Apps</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedApp === null ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {APPS_LIST.length}
              </span>
            </button>
          </div>

        </div>

        {/* Sidebar Footer: Single Logout Action */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950">
          <button
            onClick={onSignOut}
            className="w-full py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/30 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
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

            {/* Top Bar "Back to Apps" Button */}
            {selectedApp !== null && (
              <button
                onClick={() => setSelectedApp(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer shadow-sm"
                title="Back to All Apps"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Apps</span>
              </button>
            )}

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">Directors</span>
              <span className="text-slate-600">/</span>
              <button 
                onClick={() => setSelectedApp(null)}
                className={`${selectedApp === null ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Apps
              </button>
              {selectedApp !== null && (
                <>
                  <span className="text-slate-600">/</span>
                  <span className="text-cyan-300 font-bold">
                    {APPS_LIST.find(a => a.id === selectedApp)?.name}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Telemetry Status Pill for Dashboard */}
            {selectedApp === 'dashboard' && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Live Executive Telemetry</span>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              </div>
            )}

            {/* Enhanced Executive Profile & Settings Button */}
            <button
              onClick={() => setSelectedApp('profile')}
              className={`group flex items-center gap-3 px-3.5 py-2 rounded-2xl border transition-all duration-200 shadow-sm cursor-pointer ${
                selectedApp === 'profile'
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-cyan-500/10 shadow-lg ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
              title="Open Director Profile & Settings"
            >
              <div className="relative shrink-0">
                <div className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-mono font-black text-xs flex items-center justify-center shadow-md">
                  {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Profile & Settings
                  </span>
                  <Settings className={`w-3.5 h-3.5 transition-all duration-300 ${selectedApp === 'profile' ? 'text-cyan-400 rotate-90' : 'text-slate-400 group-hover:rotate-45 group-hover:text-cyan-400'}`} />
                </div>
                <span className="text-[10px] text-slate-400 font-mono leading-none truncate max-w-[140px] mt-0.5">
                  {user.name}
                </span>
              </div>
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 flex-1">
          
          {/* ========================================================================= */}
          {/* VIEW A: EXECUTIVE REVENUE & PIPELINE COCKPIT (Primary Dashboard App) */}
          {/* ========================================================================= */}
          {selectedApp === 'dashboard' && (
            <div className="animate-fade-in-up">
              {/* High-Performance Executive Dashboard Cockpit */}
              <ExecutiveRevenueCockpit
                user={user}
                onNavigateApp={(appId) => setSelectedApp(appId as AppId)}
                onBackToApps={() => setSelectedApp(null)}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW B1: APPS CATALOG GRID (When "Apps" is clicked or selectedApp === null) */}
          {/* ========================================================================= */}
          {selectedApp === null && (() => {
            const enterpriseApps = APPS_LIST.filter(a => a.category !== 'Others');
            const otherApps = APPS_LIST.filter(a => a.category === 'Others');

            return (
              <div className="space-y-8 animate-fade-in-up">
                
                {/* Header & Category Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Enterprise Management Applications
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Select an enterprise application below to open its dedicated cockpit and operational tools.
                    </p>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 self-start sm:self-auto">
                    <button
                      onClick={() => setSelectedAppsCategory('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedAppsCategory === 'all'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All ({APPS_LIST.length})
                    </button>
                    <button
                      onClick={() => setSelectedAppsCategory('enterprise')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedAppsCategory === 'enterprise'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Enterprise Management ({enterpriseApps.length})
                    </button>
                    <button
                      onClick={() => setSelectedAppsCategory('others')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedAppsCategory === 'others'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Others ({otherApps.length})
                    </button>
                  </div>
                </div>

                {/* Section 1: Enterprise Management Applications */}
                {(selectedAppsCategory === 'all' || selectedAppsCategory === 'enterprise') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Enterprise Management ({enterpriseApps.length})
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                      {enterpriseApps.map((app) => (
                        <SpotlightCard
                          key={app.id}
                          onClick={() => setSelectedApp(app.id)}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850/90 transition-all cursor-pointer group flex flex-col items-center text-center justify-between min-h-[140px] space-y-3 shadow-sm hover:shadow-cyan-500/10 hover:shadow-lg"
                        >
                          <div className="flex flex-col items-center space-y-2.5 w-full">
                            {/* Small Icon Box */}
                            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${app.iconBg} group-hover:scale-110 transition-transform shadow-md`}>
                              <app.icon className={`w-5 h-5 ${app.iconColor}`} />
                            </div>

                            {/* App Name */}
                            <div className="w-full">
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-tight">
                                {app.name}
                              </h4>
                            </div>
                          </div>

                          {/* Small Badge / Category Tag */}
                          <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-400/90 block truncate max-w-full">
                            {app.badge}
                          </span>
                        </SpotlightCard>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 2: Others Category (Freelancers) */}
                {(selectedAppsCategory === 'all' || selectedAppsCategory === 'others') && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Others ({otherApps.length})
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                      {otherApps.map((app) => (
                        <SpotlightCard
                          key={app.id}
                          onClick={() => setSelectedApp(app.id)}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850/90 transition-all cursor-pointer group flex flex-col items-center text-center justify-between min-h-[140px] space-y-3 shadow-sm hover:shadow-cyan-500/10 hover:shadow-lg"
                        >
                          <div className="flex flex-col items-center space-y-2.5 w-full">
                            {/* Small Icon Box */}
                            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${app.iconBg} group-hover:scale-110 transition-transform shadow-md`}>
                              <app.icon className={`w-5 h-5 ${app.iconColor}`} />
                            </div>

                            {/* App Name */}
                            <div className="w-full">
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-tight">
                                {app.name}
                              </h4>
                            </div>
                          </div>

                          {/* Small Badge / Category Tag */}
                          <span className="text-[10px] font-mono text-cyan-400 font-bold block truncate max-w-full">
                            {app.badge}
                          </span>
                        </SpotlightCard>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* VIEW B2: APP DETAIL VIEW (When an App Card is clicked) */}
          {/* ========================================================================= */}
          {selectedApp !== null && selectedApp !== 'dashboard' && selectedApp !== 'profile' && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Render the Selected App */}
              {selectedApp === 'logs' && <LogsApp />}
              {selectedApp === 'roles_preview' && <RolesPreviewApp onLaunchRole={(config) => setSimulatedRole(config)} />}
              {selectedApp === 'architecture' && <ArchitectureDesignsApp />}
              {selectedApp === 'crm' && <CrmApp />}
              {selectedApp === 'documents' && <DocumentsApp />}
              {selectedApp === 'meetings' && <MeetingsCalendarApp />}
              {selectedApp === 'links' && <ImportantLinksApp />}
              {selectedApp === 'contacts' && <ContactsApp />}
              {selectedApp === 'employees' && <EmployeesApp />}
              {selectedApp === 'freelancers' && <FreelancersApp />}
              {selectedApp === 'helpdesk' && <HelpDeskApp />}
              {selectedApp === 'access_control' && <AccessControlApp />}
              {selectedApp === 'tasks' && <TasksApp />}
              {selectedApp === 'accounts' && <AccountsApp />}
              {selectedApp === 'code_repos' && <CodeReposApp />}

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW C: DIRECTOR PROFILE & EXECUTIVE SETTINGS (Dedicated App) */}
          {/* ========================================================================= */}
          {selectedApp === 'profile' && (
            <div className="space-y-6 animate-fade-in-up">
              <DirectorProfileSettings user={user} onSignOut={onSignOut} />
            </div>
          )}

          {/* Modal: Propose Resolution */}
          {isAddResolutionOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Vote className="w-4 h-4 text-cyan-400" />
                    Propose Board Resolution
                  </h4>
                  <button
                    onClick={() => setIsAddResolutionOpen(false)}
                    className="text-slate-400 hover:text-white p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleProposeResolution} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Resolution Title *</label>
                    <input
                      type="text"
                      required
                      value={newResTitle}
                      onChange={(e) => setNewResTitle(e.target.value)}
                      placeholder="e.g. Resolution #2026-01: Authorize Production Cloud Cluster"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Sponsoring Director *</label>
                    <select
                      value={newResSponsor}
                      onChange={(e) => setNewResSponsor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Mohammed Khaja Moinuddin (Chairperson)">Mohammed Khaja Moinuddin (Chairperson)</option>
                      <option value="Yousuf Mohammed Jaleel (CEO)">Yousuf Mohammed Jaleel (CEO)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Summary / Matter for Approval</label>
                    <textarea
                      rows={3}
                      value={newResSummary}
                      onChange={(e) => setNewResSummary(e.target.value)}
                      placeholder="Formal text of the matter submitted for unanimous or majority board vote..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddResolutionOpen(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      Submit Resolution
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};
