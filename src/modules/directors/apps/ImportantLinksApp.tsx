import React, { useState, useEffect } from 'react';
import { 
  Link2, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  Tag, 
  Globe, 
  FolderPlus, 
  Sparkles,
  Server,
  Code2,
  Database,
  Figma,
  CreditCard,
  Cloud
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface SavedLink {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  createdAt: string;
}

const DEFAULT_LINKS: SavedLink[] = [
  {
    id: 'link-1',
    title: 'AWS Cloud Console (Frankfurt)',
    url: 'https://eu-central-1.console.aws.amazon.com',
    category: 'Cloud Infra',
    description: 'Production Kubernetes EKS clusters and S3 backups.',
    createdAt: '2026-11-20'
  },
  {
    id: 'link-2',
    title: 'GitHub Enterprise Repository',
    url: 'https://github.com/zynocs',
    category: 'Source Code',
    description: 'Zynocs core monorepo and API service repositories.',
    createdAt: '2026-11-20'
  },
  {
    id: 'link-3',
    title: 'PostgreSQL 18 Local Admin',
    url: 'http://localhost:8800',
    category: 'Database',
    description: 'Local development database instance (zynocs_enterprise).',
    createdAt: '2026-11-21'
  },
  {
    id: 'link-4',
    title: 'Figma Design System (Zynocs Dark)',
    url: 'https://figma.com/@zynocs',
    category: 'Design',
    description: 'Master component library, color tokens, and layout guidelines.',
    createdAt: '2026-11-21'
  },
  {
    id: 'link-5',
    title: 'Stripe Corporate Billing',
    url: 'https://dashboard.stripe.com',
    category: 'Operations',
    description: 'Enterprise subscriptions, ACH wire payouts, and client invoices.',
    createdAt: '2026-11-22'
  },
  {
    id: 'link-6',
    title: 'Cloudflare DNS & Edge Network',
    url: 'https://dash.cloudflare.com',
    category: 'Cloud Infra',
    description: 'Global SSL certificates, DDoS mitigation, and edge workers.',
    createdAt: '2026-11-22'
  }
];

export const ImportantLinksApp: React.FC = () => {
  const [links, setLinks] = useState<SavedLink[]>(() => {
    try {
      const saved = localStorage.getItem('zynocs_admin_important_links');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return DEFAULT_LINKS;
  });

  // Modal / Form state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Cloud Infra');
  const [newDescription, setNewDescription] = useState('');

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('zynocs_admin_important_links', JSON.stringify(links));
    } catch (e) {
      // ignore
    }
  }, [links]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const newLink: SavedLink = {
      id: `link-${Date.now()}`,
      title: newTitle.trim(),
      url: formattedUrl,
      category: newCategory,
      description: newDescription.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLinks(prev => [newLink, ...prev]);
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const handleDeleteLink = (id: string) => {
    if (confirm('Are you sure you want to remove this link?')) {
      setLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['All', 'Cloud Infra', 'Source Code', 'Database', 'Design', 'Operations', 'General'];

  const filteredLinks = links.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (l.description && l.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || l.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Cloud Infra':
        return 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30';
      case 'Source Code':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30';
      case 'Database':
        return 'bg-purple-950/60 text-purple-400 border-purple-500/30';
      case 'Design':
        return 'bg-pink-950/60 text-pink-400 border-pink-500/30';
      case 'Operations':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* App Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Link2 className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Important Links & Enterprise Launchpad
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manually save, organize, and open critical internal & external service links with one click.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Link</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links by name, URL, or notes..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
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

      {/* Links Grid */}
      {filteredLinks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <Globe className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-white">No links found</h4>
          <p className="text-xs text-slate-400">
            {searchQuery ? 'Try matching another search query.' : 'Click "Add New Link" above to save your first link.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link) => (
            <SpotlightCard
              key={link.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${getCategoryBadge(link.category)}`}>
                    {link.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {link.createdAt}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {link.title}
                  </h4>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-cyan-400 font-mono truncate block mt-0.5"
                    title={link.url}
                  >
                    {link.url}
                  </a>
                </div>

                {link.description && (
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyLink(link.url, link.id)}
                    className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                    title="Copy URL"
                  >
                    {copiedId === link.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-2 rounded-lg bg-slate-950 hover:bg-red-950/40 text-slate-500 hover:text-red-400 transition-all text-xs"
                    title="Delete link"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add Link Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add Important Link
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Link Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Production AWS Dashboard"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Destination URL *
                </label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="e.g. https://console.aws.amazon.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category Tag
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Cloud Infra">Cloud Infra</option>
                  <option value="Source Code">Source Code</option>
                  <option value="Database">Database</option>
                  <option value="Design">Design</option>
                  <option value="Operations">Operations</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Optional Notes / Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief note on what this link is for..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
