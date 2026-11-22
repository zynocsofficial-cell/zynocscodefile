import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Database, 
  Server, 
  Users, 
  Code2, 
  DollarSign, 
  Briefcase, 
  Globe, 
  Layers, 
  ArrowDown, 
  Info, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  Activity,
  Cpu,
  KeyRound,
  UserX
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface NodeDetail {
  id: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  businessBenefit: string;
  techDetails: string;
}

export const SystemArchitectureMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('gatekeeper');
  const [activeTab, setActiveTab] = useState<'visual' | 'breakdown'>('visual');

  const nodeDetails: Record<string, NodeDetail> = {
    login: {
      id: 'login',
      title: '1. Central Identity Gateway',
      category: 'Authentication',
      badge: 'FIDO2 & Bcrypt 10-Round Salt',
      summary: 'Single front door where all directors, employees, and clients present their credentials.',
      businessBenefit: 'Zero credential fragmentation. Users have one unified login identity across the entire company.',
      techDetails: 'Passwords hashed with bcrypt. Supports FIDO2 biometric cryptographic passkeys for Board Directors.'
    },
    postgres: {
      id: 'postgres',
      title: '2. PostgreSQL 18 Master Node (Port 8800)',
      category: 'Database Infrastructure',
      badge: 'zynocs_enterprise (Port 8800)',
      summary: 'Central relational database executing role validation, data persistence, and audit logging.',
      businessBenefit: 'All organizational data is securely centralized in high-performance PostgreSQL 18 with zero vendor lock-in.',
      techDetails: 'Uses PostgreSQL 18 native UUIDs (gen_random_uuid()), foreign keys, and strict relational integrity constraints.'
    },
    gatekeeper: {
      id: 'gatekeeper',
      title: '3. Zero-Trust Revocation Gatekeeper',
      category: 'Corporate Security',
      badge: 'Real-time Enforcement (status == ACTIVE)',
      summary: 'Real-time security check that runs on every request. If an employee resigns, this gate stops them instantly.',
      businessBenefit: 'Immediate risk mitigation. Eliminates the danger of ex-employees leaking confidential company data or intellectual property.',
      techDetails: 'Evaluates user_roles.status in real-time. If status = "REVOKED", returns 403 Forbidden and terminates session.'
    },
    directors: {
      id: 'directors',
      title: '4A. Board of Directors Governance (directors.zynocs.com)',
      category: 'Executive Clearance',
      badge: 'Strictly Peer-Invited (Zero HR)',
      summary: 'Restricted boardroom panel for the Chairperson, CEO, and appointed Directors.',
      businessBenefit: 'Absolute fiduciary confidentiality. Cap table decisions, valuations, and equity pools remain strictly within the Board.',
      techDetails: 'Subdomain firewall. Accessible solely via 24-hour cryptographic temporary invite keys or unanimous board resolution.'
    },
    work: {
      id: 'work',
      title: '4B. Workplace Operations (work.zynocs.com)',
      category: 'Internal Operations',
      badge: 'Department-Segmented Workstations',
      summary: 'Operational environment divided into 4 department-specific role perspectives.',
      businessBenefit: 'Prevents internal data cross-contamination. Engineers cannot view company bank accounts, and accountants cannot push code.',
      techDetails: 'Segments views into Software Engineering (Git/CI), HR (Personnel/Revocation), Finance (Payroll/Invoicing), and PM (Sprints).'
    },
    client: {
      id: 'client',
      title: '4C. Client Project Portal (client.zynocs.com)',
      category: 'External Client Engagement',
      badge: 'Client Tenant Isolation',
      summary: 'Dedicated customer portal for tracking milestone deliveries, project roadmaps, and SOC2 compliance audits.',
      businessBenefit: 'Builds enterprise trust. Enterprise clients receive real-time visibility into project health without seeing internal codebases.',
      techDetails: 'Scoped strictly to contracts mapped to client_user_id in client_projects table.'
    },
    adssponsors: {
      id: 'adssponsors',
      title: '4D. Ad Operations & Sponsors (ads / sponsors.zynocs.com)',
      category: 'Revenue & Partnerships',
      badge: 'Partner Analytics',
      summary: 'Self-serve telemetry hub for corporate sponsors and programmatic ad partners.',
      businessBenefit: 'Maximizes sponsorship ROI by providing transparent event reach and keynote exposure data to corporate partners.',
      techDetails: 'Direct telemetry ingestion tracking impressions, click-through rates (CTR), and budget burn rates.'
    }
  };

  const selected = nodeDetails[selectedNode] || nodeDetails.gatekeeper;

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Enterprise System Architecture & Security Hierarchy
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual reference designed for Board Directors to understand how identity, portals, and data access flow securely across Zynocs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Architecture Status: 100% Operational
          </span>
        </div>
      </div>

      {/* Main Interactive Diagram & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Visual System Flowchart (8 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* STEP 1: Login Gate */}
          <div 
            onClick={() => setSelectedNode('login')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-center relative ${
              selectedNode === 'login' 
                ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-500/10' 
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <KeyRound className="w-4 h-4" />
              <span>Step 1: Central Identity Gateway</span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              User Signs In (Email + Password / FIDO2 Passkey)
            </p>
            <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
              Single entry point • Bcrypt 10-round hash verification
            </span>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-1 text-slate-600">
            <ArrowDown className="w-5 h-5 animate-pulse text-cyan-500" />
          </div>

          {/* STEP 2: Database Check */}
          <div 
            onClick={() => setSelectedNode('postgres')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-center relative ${
              selectedNode === 'postgres' 
                ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Step 2: PostgreSQL 18 Master Node</span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              Queries <code>user_roles</code> table on Port 8800
            </p>
            <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
              Live Database: <code>zynocs_enterprise</code> • UUID Verification
            </span>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-1 text-slate-600">
            <ArrowDown className="w-5 h-5 animate-pulse text-emerald-500" />
          </div>

          {/* STEP 3: Zero-Trust Decision Diamond */}
          <div 
            onClick={() => setSelectedNode('gatekeeper')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-center relative ${
              selectedNode === 'gatekeeper' 
                ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10' 
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Step 3: Zero-Trust Status Gatekeeper</span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              Is Account Status == <code>'ACTIVE'</code>?
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-2.5 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Yes: Authorized to Portal
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 font-mono font-bold flex items-center gap-1">
                <UserX className="w-3.5 h-3.5" />
                No: Access Revoked (403 Block)
              </span>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-1 text-slate-600">
            <ArrowDown className="w-5 h-5 animate-pulse text-purple-500" />
          </div>

          {/* STEP 4: Subdomain Tier Split */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Step 4: Subdomain Gateway & Role Clearance
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* 4A: Directors Portal */}
              <div 
                onClick={() => setSelectedNode('directors')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === 'directors' 
                    ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/20' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 font-mono">directors.zynocs.com</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">Tier 1</span>
                </div>
                <p className="text-xs font-semibold text-white mt-1">Boardroom Governance</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Chairperson, CEO, Board Resolutions & Equity</p>
              </div>

              {/* 4B: Work Portal */}
              <div 
                onClick={() => setSelectedNode('work')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === 'work' 
                    ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">work.zynocs.com</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">Tier 2</span>
                </div>
                <p className="text-xs font-semibold text-white mt-1">Staff Workspaces (4 Depts)</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Engineering, HR Revocation, Accounting, PMs</p>
              </div>

              {/* 4C: Client Portal */}
              <div 
                onClick={() => setSelectedNode('client')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === 'client' 
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 font-mono">client.zynocs.com</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">Tier 3</span>
                </div>
                <p className="text-xs font-semibold text-white mt-1">Enterprise Client Projects</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Deliverable Sign-offs, Invoices, SOC2 Audits</p>
              </div>

              {/* 4D: Ads & Sponsors */}
              <div 
                onClick={() => setSelectedNode('adssponsors')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedNode === 'adssponsors' 
                    ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/20' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 font-mono">ads / sponsors.zynocs.com</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">Tier 3</span>
                </div>
                <p className="text-xs font-semibold text-white mt-1">Growth & Sponsorships</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Ad Telemetry, CTR, Summits & Keynote Reach</p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Executive Inspector Panel (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl space-y-5 sticky top-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Director Architectural Inspector
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Click any node on the left
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-cyan-400 block uppercase font-bold tracking-wider">
                {selected.category}
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {selected.title}
              </h4>
              <span className="inline-block mt-1 text-[11px] font-mono px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                {selected.badge}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-bold text-white block">What happens here?</span>
                <p className="text-slate-300">{selected.summary}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <span className="font-bold text-emerald-400 block">Why this matters for Directors:</span>
                <p className="text-slate-300">{selected.businessBenefit}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <span className="font-mono text-slate-400 block font-bold">Technical Implementation:</span>
                <p className="text-slate-400 font-mono text-[11px]">{selected.techDetails}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Security Model: Zero-Trust RBAC</span>
              <span className="text-emerald-400 font-bold">100% Compliant</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
