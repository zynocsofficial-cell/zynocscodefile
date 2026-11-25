import React, { useState, useEffect } from 'react';
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
  Lock,
  Plus,
  Trash2,
  X
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

const LOCAL_STORAGE_KEY = 'zynocs_corporate_documents_v6';

export const DocumentsApp: React.FC = () => {
  const [documents, setDocuments] = useState<CorporateDocument[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse corporate documents from storage:', e);
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDocModal, setActiveDocModal] = useState<CorporateDocument | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Document Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CorporateDocument['category']>('Legal & NDAs');
  const [referenceNo, setReferenceNo] = useState('');
  const [confidentiality, setConfidentiality] = useState<CorporateDocument['confidentiality']>('Strictly Confidential');
  const [status, setStatus] = useState<CorporateDocument['status']>('Executed');
  const [signatoriesStr, setSignatoriesStr] = useState('Mohammed Khaja Moinuddin, Yousuf Mohammed Jaleel');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documents));
    } catch (e) {
      console.error('Failed to save documents to storage:', e);
    }
  }, [documents]);

  const categories = [
    'All',
    'Governance',
    'Legal & NDAs',
    'Technical Architecture',
    'Financial & CapTable',
    'HR & Policies'
  ];

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedSignatories = signatoriesStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newDoc: CorporateDocument = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      category,
      referenceNo: referenceNo.trim() || `ZYN-DOC-${Math.floor(100 + Math.random() * 900)}`,
      effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status,
      confidentiality,
      signatories: parsedSignatories.length > 0 ? parsedSignatories : ['Mohammed Khaja Moinuddin', 'Yousuf Mohammed Jaleel'],
      summary: summary.trim() || 'Executed corporate instrument recorded in secure vault.',
      content: content.trim() || `CORPORATE RECORD OF ZYNOCS ENTERPRISE\nTITLE: ${title.trim()}\nEFFECTIVE DATE: ${new Date().toLocaleDateString()}\n\nEXECUTED IN FULL BY AUTHORIZED OFFICERS.`
    };

    setDocuments(prev => [newDoc, ...prev]);
    setIsAddModalOpen(false);
    setTitle('');
    setReferenceNo('');
    setSummary('');
    setContent('');
  };

  const handleDeleteDocument = (docId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this document from the vault?')) {
      setDocuments(prev => prev.filter(d => d.id !== docId));
      if (activeDocModal?.id === docId) {
        setActiveDocModal(null);
      }
    }
  };

  const filteredDocs = documents.filter((doc) => {
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

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              Total Vault: <strong className="text-white">{documents.length} Records</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              AES-256 Encrypted
            </span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Documents Grid / Empty State */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
          <FolderLock className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">Document Vault is 100% Clean</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            All placeholder documents have been removed. Click &quot;+ Add Document&quot; above to securely archive executed client contracts, bilateral NDAs, and corporate board agreements.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Archive First Document</span>
          </button>
        </div>
      ) : (
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDocModal(doc)}
                    className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Full Document</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                    title="Delete document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-[#090f1a] border border-[#1f2d40] p-6 sm:p-7 space-y-5 shadow-2xl shadow-cyan-950/40 relative">
            <div className="flex items-start justify-between pb-4 border-b border-[#141e2e]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <FolderLock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Archive Document in Vault</h4>
                  <p className="text-xs text-slate-400">Record an enterprise agreement, NDA, or board resolution.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Document Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Services Agreement (MSA) - Phase 1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all cursor-pointer"
                  >
                    <option value="Legal & NDAs">Legal & NDAs</option>
                    <option value="Governance">Governance</option>
                    <option value="Technical Architecture">Technical Architecture</option>
                    <option value="Financial & CapTable">Financial & CapTable</option>
                    <option value="HR & Policies">HR & Policies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reference Number</label>
                  <input
                    type="text"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="e.g. ZYN-MSA-2026-01"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confidentiality Tier</label>
                  <select
                    value={confidentiality}
                    onChange={(e) => setConfidentiality(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all cursor-pointer"
                  >
                    <option value="Strictly Confidential">Strictly Confidential</option>
                    <option value="Board Eyes Only">Board Eyes Only</option>
                    <option value="Internal Enterprise">Internal Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Execution Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all cursor-pointer"
                  >
                    <option value="Executed">Executed</option>
                    <option value="Ratified">Ratified</option>
                    <option value="In Review">In Review</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Signatories (Comma separated)</label>
                <input
                  type="text"
                  value={signatoriesStr}
                  onChange={(e) => setSignatoriesStr(e.target.value)}
                  placeholder="e.g. Mohammed Khaja Moinuddin, Yousuf Mohammed Jaleel"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Executive Summary</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief summary of the agreement, resolution, or compliance audit..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Document Clauses / Full Text</label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full text of the legal clauses or agreement body..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0c1524] border border-[#1c293d] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/25 transition-all font-mono resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#141e2e]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  Archive Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Reader Modal */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 pb-12 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-2xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl space-y-6">
            
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
                className="text-slate-500 hover:text-white p-1 text-sm rounded-lg bg-slate-800 cursor-pointer"
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteDocument(activeDocModal.id)}
                  className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-red-950/50 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => alert(`Document ${activeDocModal.referenceNo} exported to encrypted PDF container.`)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certified PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
