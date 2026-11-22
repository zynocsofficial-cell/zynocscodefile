import React, { useState } from 'react';
import { 
  Contact2, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Building2, 
  Tag, 
  ExternalLink, 
  MoreVertical,
  UserCheck,
  Star,
  Globe
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export interface ContactRecord {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  category: 'Client' | 'Vendor' | 'Investor / Board' | 'Partner';
  starred?: boolean;
}

const DEFAULT_CONTACTS: ContactRecord[] = [
  {
    id: 'c-1',
    name: 'Marcus Vance',
    title: 'Managing Director',
    company: 'Apex Capital Partners',
    email: 'm.vance@apexcapital.io',
    phone: '+1 (415) 890-4122',
    category: 'Client',
    starred: true
  },
  {
    id: 'c-2',
    name: 'Dr. Elena Rostova',
    title: 'Chief Medical Information Officer',
    company: 'MediCorp Health Systems',
    email: 'e.rostova@medicorp-health.com',
    phone: '+44 20 7946 0912',
    category: 'Client',
    starred: true
  },
  {
    id: 'c-3',
    name: 'Yousuf Mohammed Jaleel',
    title: 'Chief Executive Officer',
    company: 'Zynocs Enterprise',
    email: 'yousuf@zynocs.com',
    phone: '+91 98765 43210',
    category: 'Investor / Board',
    starred: true
  },
  {
    id: 'c-4',
    name: 'Liam Gallagher',
    title: 'Principal Infrastructure Partner',
    company: 'Equinix Frankfurt Data Hub',
    email: 'lgallagher@equinix-emea.com',
    phone: '+49 69 9055 330',
    category: 'Vendor'
  },
  {
    id: 'c-5',
    name: 'Sophia Chang',
    title: 'Enterprise Partner Manager',
    company: 'Amazon Web Services (AWS)',
    email: 'changsoph@amazon.com',
    phone: '+1 (206) 555-0199',
    category: 'Partner'
  },
  {
    id: 'c-6',
    name: 'Kenji Takahashi',
    title: 'VP of Global Logistics',
    company: 'LogiGlobal Ltd',
    email: 'k.takahashi@logiglobal.jp',
    phone: '+81 3 5555 0143',
    category: 'Client'
  }
];

export const ContactsApp: React.FC = () => {
  const [contacts, setContacts] = useState<ContactRecord[]>(DEFAULT_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState<ContactRecord['category']>('Client');

  const categories = ['All', 'Client', 'Investor / Board', 'Vendor', 'Partner'];

  const filtered = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newContact: ContactRecord = {
      id: `c-${Date.now()}`,
      name: newName.trim(),
      title: newTitle.trim() || 'Executive',
      company: newCompany.trim() || 'Enterprise',
      email: newEmail.trim(),
      phone: newPhone.trim() || '+1 (555) 000-0000',
      category: newCategory
    };

    setContacts(prev => [newContact, ...prev]);
    setNewName('');
    setNewTitle('');
    setNewCompany('');
    setNewEmail('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };

  const toggleStar = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Contact2 className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Corporate Contacts & Stakeholder Directory
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Central enterprise directory for client executives, board members, key vendors, and technology partners.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts by name, organization, or email..."
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

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <SpotlightCard
            key={c.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center">
                    {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {c.name}
                      {c.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    </h4>
                    <span className="text-xs text-slate-400 block font-mono">{c.title}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {c.category}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{c.company}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <a href={`mailto:${c.email}`} className="text-cyan-400 hover:underline truncate">{c.email}</a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{c.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => toggleStar(c.id)}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <Star className={`w-3.5 h-3.5 ${c.starred ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                <span>{c.starred ? 'Starred' : 'Star'}</span>
              </button>

              <a
                href={`mailto:${c.email}`}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add New Contact
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. David Vance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chief Technology Officer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Acme Cloud Corp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="dvance@acme.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Client">Client</option>
                  <option value="Investor / Board">Investor / Board</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Partner">Partner</option>
                </select>
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
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
