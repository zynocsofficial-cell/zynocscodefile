import React from 'react';
import { 
  Shield, 
  Users, 
  Code2, 
  DollarSign, 
  Briefcase, 
  Megaphone, 
  Award, 
  Eye, 
  ArrowRight, 
  Layers, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Lock,
  Zap,
  Globe
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SubdomainId } from '@/types';

export interface SimulatedRoleConfig {
  subdomain: SubdomainId;
  roleName: string;
  userName: string;
  userEmail: string;
  workRole?: 'engineer' | 'hr' | 'accountant' | 'pm';
  badge: string;
  badgeColor: string;
  department?: string;
}

interface RolesPreviewAppProps {
  onLaunchRole: (config: SimulatedRoleConfig) => void;
}

export const RolesPreviewApp: React.FC<RolesPreviewAppProps> = ({ onLaunchRole }) => {
  const ROLES: (SimulatedRoleConfig & {
    id: string;
    title: string;
    portalName: string;
    subdomainUrl: string;
    description: string;
    icon: any;
    features: string[];
    isCurrent?: boolean;
  })[] = [
    {
      id: 'director',
      title: 'Board Director & Chairperson',
      subdomain: 'directors',
      roleName: 'CHAIRPERSON_FOUNDER',
      userName: 'Mohammed Khaja Moinuddin',
      userEmail: 'director@zynocs.com',
      badge: 'EXECUTIVE CLEARANCE',
      badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400',
      portalName: 'Executive Boardroom & 10 Enterprise Apps',
      subdomainUrl: 'directors.zynocs.com',
      description: 'Fiduciary corporate governance, peer invite keys, architecture blueprints, corporate accounts, documents vault, and systemic controls.',
      icon: Shield,
      features: ['Boardroom Voting & Resolutions', '24h Invite Key Generation', 'All 10 Enterprise Management Apps', 'System Architecture & PostgreSQL Schema'],
      isCurrent: true
    },
    {
      id: 'client',
      title: 'Enterprise Client Executive',
      subdomain: 'client',
      roleName: 'CLIENT_ENTERPRISE_EXECUTIVE',
      userName: 'Sarah Jenkins (CTO, Apex Capital)',
      userEmail: 's.jenkins@apexcapital.io',
      badge: 'CLIENT ENGAGEMENT',
      badgeColor: 'border-blue-500/40 bg-blue-950/40 text-blue-400',
      portalName: 'Enterprise Client Engagement Portal',
      subdomainUrl: 'client.zynocs.com',
      description: 'Dedicated client interface for active contracts, deliverables, sprint progress, security audits, dedicated engineering teams, and invoices.',
      icon: Building2,
      features: ['Phase 3 Sprint Deliverables', '6 Dedicated Engineers Assigned', 'SOC2 Type II & ISO 27001 Audits', 'Invoices & Billing Statement']
    },
    {
      id: 'engineer',
      title: 'Staff Software Engineer',
      subdomain: 'work',
      workRole: 'engineer',
      roleName: 'STAFF_SYSTEMS_ENGINEER',
      userName: 'Aarav Sharma (Staff Engineer)',
      userEmail: 'aarav@zynocs.com',
      department: 'Engineering & Cloud Architecture',
      badge: 'ENGINEERING TIER',
      badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400',
      portalName: 'Engineering & CI/CD Workstation',
      subdomainUrl: 'work.zynocs.com',
      description: 'Software development cockpit with assigned Jira tickets, CI/CD pipeline health telemetry, production API latency, and Git pull requests.',
      icon: Code2,
      features: ['Assigned Sprint Tickets (5 In Progress)', 'CI/CD Pipeline Health (99.8% Passing)', 'Production API Latency (42ms)', 'GitHub Pull Requests & Monorepos']
    },
    {
      id: 'hr',
      title: 'VP of Human Resources & Personnel',
      subdomain: 'work',
      workRole: 'hr',
      roleName: 'VP_PEOPLE_OPS',
      userName: 'Sara Khan (VP HR)',
      userEmail: 'sara@zynocs.com',
      department: 'Human Resources & Talent',
      badge: 'PEOPLE OPS',
      badgeColor: 'border-purple-500/40 bg-purple-950/40 text-purple-400',
      portalName: 'HR & Personnel Operations Console',
      subdomainUrl: 'work.zynocs.com',
      description: 'Headcount monitoring, candidate pipeline, offer letter signatures, leave approvals, and instant 1-click SSO credential revocation.',
      icon: Users,
      features: ['Total Headcount (48 Active)', 'Pending Onboardings (3 Candidates)', 'Leave Request Management', 'Instant Credential Revocation Console']
    },
    {
      id: 'accountant',
      title: 'Chief Financial Officer / Accountant',
      subdomain: 'work',
      workRole: 'accountant',
      roleName: 'CHIEF_ACCOUNTANT',
      userName: 'Ananya Roy (Head of Finance)',
      userEmail: 'ananya@zynocs.com',
      department: 'Finance & Treasury',
      badge: 'FINANCIAL CONTROL',
      badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-400',
      portalName: 'Corporate Finance & Ledger Workstation',
      subdomainUrl: 'work.zynocs.com',
      description: 'Corporate payroll disbursement tracking, accounts receivable, client ACH billing, operating expense (CapEx), and tax audit readiness.',
      icon: DollarSign,
      features: ['Monthly Payroll ($248,500 Disbursed)', 'Accounts Receivable ($84,200 Due)', 'CapEx Tracking vs Q3 Budget', 'Vendor Reconciliation (AWS, Equinix)']
    },
    {
      id: 'pm',
      title: 'Enterprise Project Manager & Scrum Lead',
      subdomain: 'work',
      workRole: 'pm',
      roleName: 'PRINCIPAL_PROJECT_MANAGER',
      userName: 'Michael Chen (Agile Delivery Lead)',
      userEmail: 'michael@zynocs.com',
      department: 'Product & Agile Execution',
      badge: 'AGILE VELOCITY',
      badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400',
      portalName: 'Agile Delivery & Milestone Board',
      subdomainUrl: 'work.zynocs.com',
      description: 'Enterprise client project tracking, sprint point velocity, team capacity, blocker identification, and deliverable milestone deadlines.',
      icon: Briefcase,
      features: ['8 Active Client Projects', 'Sprint Velocity (94 Pts Capacity)', '0 Critical Engineering Blockers', 'Upcoming Milestone Deadlines']
    },
    {
      id: 'ads',
      title: 'Ad Operations Specialist',
      subdomain: 'ads',
      roleName: 'ADOPS_OPERATOR',
      userName: 'Elena Rostova (AdOps Lead)',
      userEmail: 'operator@zynocs.com',
      badge: 'ADOPS TELEMETRY',
      badgeColor: 'border-pink-500/40 bg-pink-950/40 text-pink-400',
      portalName: 'Campaign & Yield Intelligence',
      subdomainUrl: 'ads.zynocs.com',
      description: 'Programmatic ad slot floor engine, real-time impression telemetry, click-through rate (CTR), and effective CPM optimization.',
      icon: Megaphone,
      features: ['4.82M Total Ad Impressions', '3.42% Click-Through Rate (CTR)', '$18.40 High-Yield Effective CPM', '6 Live Active Campaigns']
    },
    {
      id: 'sponsors',
      title: 'Strategic Brand Partner',
      subdomain: 'sponsors',
      roleName: 'SPONSOR_DIRECTOR',
      userName: 'David Miller (TechCloud Global)',
      userEmail: 'sponsor@techcloud.io',
      badge: 'BRAND PARTNERSHIP',
      badgeColor: 'border-yellow-500/40 bg-yellow-950/40 text-yellow-400',
      portalName: 'Strategic Sponsor Brand Hub',
      subdomainUrl: 'sponsors.zynocs.com',
      description: 'Tier-1 corporate partner console for monitoring tech summit brand exposure, keynote stage presence, and partner SLA deliverables.',
      icon: Award,
      features: ['Tier-1 Platinum Status', '820,000+ Audience Brand Reach', '3 Tech Summit Keynote Exposures', '12 of 12 Deliverables Fulfilled']
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* App Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-fuchsia-950/60 text-fuchsia-400 border border-fuchsia-500/30 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Role & Portal Simulator
            </span>
            <span className="text-xs text-slate-400 font-mono">
              8 Enterprise Personas
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Enterprise Positions & Perspectives Inspector
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            As a Director, you have executive clearance to preview the personalized dashboard of any company position. Click <strong className="text-cyan-400">Preview Position Portal</strong> below to instantly view what Clients, Engineers, HR, Finance, Project Managers, and Partners see in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Active Architecture</span>
            <span className="text-sm font-bold text-emerald-400 font-mono block">Zero-Trust RBAC</span>
            <span className="text-[10px] text-slate-400 font-mono">PostgreSQL 18 Mesh</span>
          </div>
        </div>
      </div>

      {/* Grid of Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ROLES.map((role) => (
          <SpotlightCard
            key={role.id}
            className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-all group"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/5">
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-500" />
                        {role.subdomainUrl}
                      </span>
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border uppercase shrink-0 ${role.badgeColor}`}>
                  {role.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {role.description}
              </p>

              {/* Target Persona Info */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Simulated User:</span>
                  <span className="text-white font-semibold">{role.userName}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Corporate Email:</span>
                  <span className="text-cyan-400">{role.userEmail}</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  What This Position Sees:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {role.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-slate-500">
                {role.portalName}
              </span>

              {role.isCurrent ? (
                <span className="px-4 py-2 rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono">
                  Current Session
                </span>
              ) : (
                <button
                  onClick={() => onLaunchRole(role)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview This Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
