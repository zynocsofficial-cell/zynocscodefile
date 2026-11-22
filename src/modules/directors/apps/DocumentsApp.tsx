import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Tag, 
  FolderLock, 
  Filter, 
  Building2, 
  FileSignature, 
  Scale, 
  Cpu, 
  DollarSign, 
  Users,
  ExternalLink,
  Lock
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface CorporateDocument {
  id: string;
  title: string;
  category: 'Governance' | 'Legal & NDAs' | 'Technical Architecture' | 'Financial & CapTable' | 'HR & Policies';
  referenceNo: string;
  effectiveDate: string;
  status: 'Executed' | 'Ratified' | 'Archived' | 'In Review';
  confidentiality: 'Board Eyes Only' | 'Strictly Confidential' | 'Internal Enterprise';
  signatories: string[];
  summary: string;
  content: string;
}

const DOCUMENTS_CATALOG: CorporateDocument[] = [
  {
    id: 'doc-1',
    title: 'Resolution #2026-04: EMEA Infrastructure Expansion Authorization',
    category: 'Governance',
    referenceNo: 'ZYN-RES-2026-04',
    effectiveDate: 'November 20, 2026',
    status: 'Ratified',
    confidentiality: 'Board Eyes Only',
    signatories: ['Mohammed Khaja Moinuddin (Chairperson)', 'Yousuf Mohammed Jaleel (CEO)'],
    summary: 'Formal board approval to deploy redundant high-frequency Kubernetes clusters in Frankfurt and London with CapEx allocation of $450,000.',
    content: `BOARD RESOLUTION OF ZYNOCS ENTERPRISE INC.
REFERENCE NUMBER: ZYN-RES-2026-04
DATE: NOVEMBER 20, 2026

WHEREAS, Zynocs Enterprise has expanded its client engagements across the European economic zone;
WHEREAS, ultra-low latency guarantees and GDPR data residency compliance necessitate European high-frequency Kubernetes nodes;

NOW, THEREFORE, BE IT RESOLVED:
1. The Board of Directors hereby authorizes the Chief Executive Officer to execute contracts with Equinix and AWS Frankfurt (eu-central-1) up to the sum of USD $450,000.
2. Systems Architecture Lead shall ensure all persistent volumes operate full AES-256 encryption at rest.

CERTIFIED AND UNANIMOUSLY EXECUTED BY THE BOARD OF DIRECTORS.`
  },
  {
    id: 'doc-2',
    title: 'Mutual Master Non-Disclosure & Intellectual Property Protection Agreement',
    category: 'Legal & NDAs',
    referenceNo: 'ZYN-NDA-STANDARD-v3',
    effectiveDate: 'October 15, 2026',
    status: 'Executed',
    confidentiality: 'Strictly Confidential',
    signatories: ['Legal Counsel', 'Authorized Corporate Representative'],
    summary: 'Standard bilateral enterprise non-disclosure contract executed with enterprise clients prior to technical API integration.',
    content: `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)
VERSION: 3.2 - ENTERPRISE CORE

1. CONFIDENTIAL INFORMATION
"Confidential Information" includes all proprietary software code, system architecture diagrams, database schemas, and client engagement lists disclosed by Zynocs.

2. NON-DISCLOSURE OBLIGATIONS
Receiving party agrees to maintain strict confidentiality for a minimum period of five (5) years from disclosure.

3. GOVERNING LAW & JURISDICTION
This Agreement shall be governed by international commercial arbitration and relevant technology jurisdiction laws.`
  },
  {
    id: 'doc-3',
    title: 'Zynocs Zero-Trust Protocol & PostgreSQL 18 Security Architecture Spec',
    category: 'Technical Architecture',
    referenceNo: 'TECH-SPEC-ZT-2026',
    effectiveDate: 'November 18, 2026',
    status: 'Executed',
    confidentiality: 'Internal Enterprise',
    signatories: ['Principal Systems Architect', 'Security Operations Lead'],
    summary: 'Detailed technical specification outlining PostgreSQL 18 connection pooling, multi-subdomain isolation, and cryptographic FIDO2 token validation.',
    content: `TECHNICAL ARCHITECTURE BLUEPRINT
SYSTEM: ZYNOCS CENTRAL RBAC & ISOLATION

1. IDENTITY LAYER
- Centralized PostgreSQL 18 cluster deployed on dedicated isolated VPC.
- User passwords digested with bcrypt (minimum cost factor 10).
- FIDO2 / WebAuthn cryptographic hardware keys for Board Director access.

2. REPETITIVE REVOCATION ENFORCEMENT
- Every state-mutating request validates user_roles.status in under 5ms.
- Any revocation by HR instantly halts active bearer credentials globally across all subdomains.`
  },
  {
    id: 'doc-4',
    title: 'Resolution #2026-03: Ratification of 2026 Technical Equity Incentive Pool',
    category: 'Governance',
    referenceNo: 'ZYN-RES-2026-03',
    effectiveDate: 'November 05, 2026',
    status: 'Ratified',
    confidentiality: 'Board Eyes Only',
    signatories: ['Mohammed Khaja Moinuddin (Chairperson)', 'Yousuf Mohammed Jaleel (CEO)'],
    summary: 'Creation of a 4.5% non-dilutive stock option pool reserved exclusively for Principal Architects and Senior Engineering Leads.',
    content: `BOARD RESOLUTION CONCERNING EQUITY INCENTIVE POOL
REFERENCE: ZYN-RES-2026-03

IT IS RESOLVED THAT:
1. The Corporation approves the allocation of 4.5% of fully-diluted common shares to the 2026 Technical Equity Incentive Pool.
2. Grant vesting schedules shall follow a 4-year schedule with a 1-year cliff.
3. Allocations must be unanimously consented to by the Chairperson.`
  },
  {
    id: 'doc-5',
    title: 'Annual Enterprise SOC2 Type II Security Compliance & Audit Report',
    category: 'Legal & NDAs',
    referenceNo: 'AUDIT-SOC2-2026-Q3',
    effectiveDate: 'September 30, 2026',
    status: 'Executed',
    confidentiality: 'Strictly Confidential',
    signatories: ['Independent Security Auditor', 'Chief Information Security Officer'],
    summary: 'Third-party attestation of Zynocs cloud data security, encryption protocols, and disaster recovery readiness.',
    content: `SOC 2 TYPE II INDEPENDENT AUDITOR'S REPORT
AUDIT REPORT PERIOD: OCTOBER 2025 - SEPTEMBER 2026

OPINION:
In our professional opinion, Zynocs Enterprise has maintained effective controls over security, availability, and confidentiality across all managed services, cloud Kubernetes environments, and database clusters. Zero non-conformities reported.`
  },
  {
    id: 'doc-6',
    title: 'Q3 Corporate Financial Statements & Deloitte Audit Preparation',
    category: 'Financial & CapTable',
    referenceNo: 'FIN-Q3-2026-DEL',
    effectiveDate: 'October 31, 2026',
    status: 'Executed',
    confidentiality: 'Board Eyes Only',
    signatories: ['Finance Controller', 'Certified Public Accountant'],
    summary: 'Audited statements showing $3.8M Annual Recurring Revenue (ARR), 28-month cash runway, and zero long-term debt.',
    content: `ZYNOCS ENTERPRISE INC. - Q3 FINANCIAL STATEMENTS
FISCAL PERIOD ENDED SEPTEMBER 30, 2026

- Annualized Revenue Run Rate (ARR): $3,800,000 USD
- Net Gross Margin: 82.4%
- Operating Cash Runway: 28 Months
- Long-Term Debt: $0.00 (Zero Debt Load)
- Accounts Receivable Health: 98% Current (Within 30 Days)`
  }
];

export const DocumentsApp: React.FC = () => {
  const [documents, setDocuments] = useState<CorporateDocument[]>(DOCUMENTS_CATALOG);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDocModal, setActiveDocModal] = useState<CorporateDocument | null>(null);

  const categories = ['All', 'Governance', 'Legal & NDAs', 'Technical Architecture', 'Financial & CapTable'];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getConfidentialityBadge = (level: string) => {
    switch (level) {
      case 'Board Eyes Only':
        return 'bg-red-950/60 text-red-400 border-red-500/30';
      case 'Strictly Confidential':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/30';
      default:
        return 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* App Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <FolderLock className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Corporate Documents & Legal Vault
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Central repository of all executed Board resolutions, NDAs, technical specifications, and audited financials.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Total Vault: <strong className="text-white">{documents.length} Records</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            AES-256 Encrypted
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by title, reference #, or clause..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white bg-slate-950/60 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <SpotlightCard
            key={doc.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${getConfidentialityBadge(doc.confidentiality)}`}>
                  {doc.confidentiality}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {doc.referenceNo}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  {doc.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5 leading-snug">
                  {doc.title}
                </h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {doc.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Effective: {doc.effectiveDate}</span>
                <span className="text-emerald-400 font-bold">{doc.status}</span>
              </div>

              <button
                onClick={() => setActiveDocModal(doc)}
                className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Full Document</span>
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Document Reader Modal */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getConfidentialityBadge(activeDocModal.confidentiality)}`}>
                    {activeDocModal.confidentiality}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{activeDocModal.referenceNo}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {activeDocModal.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveDocModal(null)}
                className="text-slate-500 hover:text-white p-1 text-sm rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Category:</span>
                <span className="text-white font-semibold">{activeDocModal.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status:</span>
                <span className="text-emerald-400 font-semibold">{activeDocModal.status}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Effective Date:</span>
                <span className="text-white">{activeDocModal.effectiveDate}</span>
              </div>
            </div>

            {/* Document Full Text Body */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Executed Clauses & Document Body:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {activeDocModal.content}
              </pre>
            </div>

            {/* Signatories */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-1">
              <span className="font-bold text-cyan-300 block">Verified Signatories:</span>
              <p className="text-slate-300">{activeDocModal.signatories.join(' • ')}</p>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-500">
                Cryptographic Signature: SHA-256 Verified
              </span>
              <button
                onClick={() => alert(`Document ${activeDocModal.referenceNo} exported to encrypted PDF container.`)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
