import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Linkedin, 
  ExternalLink, 
  Star, 
  Trash2, 
  Edit3, 
  X, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  MapPin, 
  Code2, 
  Sparkles, 
  Briefcase, 
  Filter, 
  ArrowUpDown, 
  UserCheck, 
  Check, 
  Copy, 
  Globe,
  Award,
  Zap,
  RefreshCw
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export type FreelancerAvailability = 
  | 'Available Now'
  | 'Part-Time (10-20 hrs/wk)'
  | 'In Contract (Waitlist)';

export interface FreelancerProfile {
  id: string;
  name: string;
  role: string;
  domain: string; // Dynamic user-defined category
  linkedinUrl: string;
  avatarUrl: string;
  hourlyRate: number; // USD per hour
  experienceYears: number; // e.g. 8
  availability: FreelancerAvailability;
  location: string;
  timezone: string;
  skills: string[];
  bio: string;
  highlights: string[];
  starred?: boolean;
}

const LOCAL_STORAGE_KEY = 'zynocs_freelancers_v2';

const DEFAULT_FREELANCERS: FreelancerProfile[] = [];

export const FreelancersApp: React.FC = () => {
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load freelancers:', e);
    }
    return DEFAULT_FREELANCERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rate-desc' | 'rate-asc' | 'experience' | 'name'>('featured');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFreelancer, setEditingFreelancer] = useState<FreelancerProfile | null>(null);
  const [inspectingFreelancer, setInspectingFreelancer] = useState<FreelancerProfile | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Form State - domain is now free-form user category
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    domain: '',
    linkedinUrl: '',
    avatarUrl: '',
    hourlyRate: 150,
    experienceYears: 5,
    availability: 'Available Now' as FreelancerAvailability,
    location: '',
    timezone: 'UTC',
    skills: '',
    bio: '',
    highlights: ''
  });

  // Extract distinct categories created by the user
  const userCategories = Array.from(
    new Set(freelancers.map(f => f.domain?.trim()).filter(Boolean))
  );

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freelancers));
    } catch (e) {
      console.error('Failed to persist freelancers:', e);
    }
  }, [freelancers]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingFreelancer(null);
    setFormData({
      name: '',
      role: '',
      domain: '',
      linkedinUrl: '',
      avatarUrl: '',
      hourlyRate: 150,
      experienceYears: 5,
      availability: 'Available Now',
      location: '',
      timezone: 'UTC',
      skills: '',
      bio: '',
      highlights: ''
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (fl: FreelancerProfile) => {
    setEditingFreelancer(fl);
    setFormData({
      name: fl.name,
      role: fl.role,
      domain: fl.domain,
      linkedinUrl: fl.linkedinUrl,
      avatarUrl: fl.avatarUrl,
      hourlyRate: fl.hourlyRate,
      experienceYears: fl.experienceYears,
      availability: fl.availability,
      location: fl.location,
      timezone: fl.timezone,
      skills: fl.skills.join(', '),
      bio: fl.bio,
      highlights: fl.highlights.join('\n')
    });
    setIsAddModalOpen(true);
    setInspectingFreelancer(null);
  };

  // Auto-generate avatar helper based on Name or LinkedIn
  const handleAutoGenerateAvatar = () => {
    const seed = formData.name.trim() || formData.linkedinUrl.split('/').filter(Boolean).pop() || 'Engineer';
    const cleanSeed = encodeURIComponent(seed.replace(/[^a-zA-Z0-9]/g, ''));
    // High-resolution professional avatar via UI-Avatars or Dicebear
    const generated = `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanSeed}&backgroundColor=06b6d4,0891b2,0e7490`;
    setFormData(prev => ({ ...prev, avatarUrl: generated }));
  };

  // Save / Submit Form
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) return;

    let finalAvatar = formData.avatarUrl.trim();
    if (!finalAvatar) {
      const cleanSeed = encodeURIComponent(formData.name.trim().replace(/[^a-zA-Z0-9]/g, ''));
      finalAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanSeed}&backgroundColor=06b6d4,0891b2`;
    }

    const skillsArray = formData.skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const highlightsArray = formData.highlights
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    let cleanLinkedin = formData.linkedinUrl.trim();
    if (cleanLinkedin && !cleanLinkedin.startsWith('http://') && !cleanLinkedin.startsWith('https://')) {
      cleanLinkedin = `https://${cleanLinkedin}`;
    }

    if (editingFreelancer) {
      setFreelancers(prev => prev.map(f => f.id === editingFreelancer.id ? {
        ...f,
        name: formData.name.trim(),
        role: formData.role.trim(),
        domain: formData.domain,
        linkedinUrl: cleanLinkedin,
        avatarUrl: finalAvatar,
        hourlyRate: Number(formData.hourlyRate) || 100,
        experienceYears: Number(formData.experienceYears) || 5,
        availability: formData.availability,
        location: formData.location.trim() || 'Remote',
        timezone: formData.timezone.trim() || 'UTC',
        skills: skillsArray.length > 0 ? skillsArray : ['General Engineering'],
        bio: formData.bio.trim(),
        highlights: highlightsArray
      } : f));
    } else {
      const newFreelancer: FreelancerProfile = {
        id: `fl-${Date.now()}`,
        name: formData.name.trim(),
        role: formData.role.trim(),
        domain: formData.domain,
        linkedinUrl: cleanLinkedin,
        avatarUrl: finalAvatar,
        hourlyRate: Number(formData.hourlyRate) || 120,
        experienceYears: Number(formData.experienceYears) || 5,
        availability: formData.availability,
        location: formData.location.trim() || 'Remote',
        timezone: formData.timezone.trim() || 'UTC',
        skills: skillsArray.length > 0 ? skillsArray : ['Fullstack Engineering', 'System Architecture'],
        bio: formData.bio.trim() || 'Specialized freelance engineer with proven enterprise consulting track record.',
        highlights: highlightsArray.length > 0 ? highlightsArray : ['Ready for instant corporate deployment and contract execution.'],
        starred: false
      };
      setFreelancers(prev => [newFreelancer, ...prev]);
    }

    setIsAddModalOpen(false);
    setEditingFreelancer(null);
  };

  // Delete Freelancer
  const handleDeleteFreelancer = (id: string) => {
    if (window.confirm('Are you sure you want to remove this freelancer profile from the talent network?')) {
      setFreelancers(prev => prev.filter(f => f.id !== id));
      if (inspectingFreelancer?.id === id) {
        setInspectingFreelancer(null);
      }
    }
  };

  // Toggle Star / Shortlist
  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFreelancers(prev => prev.map(f => f.id === id ? { ...f, starred: !f.starred } : f));
    if (inspectingFreelancer?.id === id) {
      setInspectingFreelancer(prev => prev ? { ...prev, starred: !prev.starred } : null);
    }
  };

  // Connect on LinkedIn Handler
  const handleConnectLinkedIn = (linkedinUrl: string, name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let targetUrl = linkedinUrl?.trim();
    if (targetUrl) {
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = `https://${targetUrl}`;
      }
    } else {
      // Fallback search on LinkedIn
      targetUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(name)}`;
    }
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy Profile Link
  const handleCopyProfile = (fl: FreelancerProfile, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = fl.linkedinUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(fl.id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Filtering & Sorting Logic
  const filteredFreelancers = freelancers.filter(fl => {
    // Search query
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      fl.name.toLowerCase().includes(query) ||
      fl.role.toLowerCase().includes(query) ||
      fl.domain.toLowerCase().includes(query) ||
      fl.location.toLowerCase().includes(query) ||
      fl.skills.some(s => s.toLowerCase().includes(query));

    // Domain filter
    const matchesDomain = selectedDomain === 'All' || fl.domain === selectedDomain;

    // Availability filter
    const matchesAvailability = selectedAvailability === 'All' || fl.availability === selectedAvailability;

    // Starred filter
    const matchesStarred = !showStarredOnly || fl.starred;

    return matchesSearch && matchesDomain && matchesAvailability && matchesStarred;
  }).sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      return b.experienceYears - a.experienceYears;
    }
    if (sortBy === 'rate-desc') return b.hourlyRate - a.hourlyRate;
    if (sortBy === 'rate-asc') return a.hourlyRate - b.hourlyRate;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & TELEMETRY STRIP                                          */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold tracking-tight text-white">Freelancers & Talent Network</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                {freelancers.length} Vetted Engineers
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Curated freelance engineering network with verified LinkedIn credentials, domain specializations, and direct booking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold tracking-wide shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Freelancer</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COMPACT SEARCH, DOMAIN FILTERS, SORT & AVAILABILITY TOOLBAR            */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
        
        {/* Row A: Search Input + Availability Filter + Sort By Dropdown */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Live Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search engineers by name, role, tech stack (PyTorch, Go, React, Rust), or location..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Availability Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">Status:</span>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Availability</option>
              <option value="Available Now">Available Now</option>
              <option value="Part-Time (10-20 hrs/wk)">Part-Time</option>
              <option value="In Contract (Waitlist)">In Contract</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="rate-desc">Hourly Rate: High to Low</option>
              <option value="rate-asc">Hourly Rate: Low to High</option>
              <option value="experience">Experience: Most Senior</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Shortlisted Only Toggle */}
          <button
            onClick={() => setShowStarredOnly(!showStarredOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
              showStarredOnly 
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showStarredOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Shortlisted</span>
          </button>
        </div>

        {/* Row B: Dynamic User-Created Category Filter Pills */}
        {userCategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs pt-2 border-t border-slate-800/60">
            <button
              onClick={() => setSelectedDomain('All')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium cursor-pointer ${
                selectedDomain === 'All'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-850'
              }`}
            >
              All Categories ({freelancers.length})
            </button>
            {userCategories.map((domain) => {
              const count = freelancers.filter(f => f.domain?.trim().toLowerCase() === domain.toLowerCase()).length;
              const isSelected = selectedDomain.toLowerCase() === domain.toLowerCase();
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-850'
                  }`}
                >
                  <span>{domain}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-slate-950/30 text-slate-900 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. FREELANCER CARDS GRID                                                 */}
      {/* ========================================================================= */}
      {freelancers.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No Freelance Profiles Added Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Add your vetted freelance consultants and contractors to track their LinkedIn profiles, hourly rates, and availability.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold tracking-wide shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add First Freelancer</span>
          </button>
        </div>
      ) : filteredFreelancers.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">No Freelance Engineers Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            No engineering profiles match your selected filters. Try broadening your search or add a new consultant.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('All');
              setSelectedAvailability('All');
              setShowStarredOnly(false);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredFreelancers.map((fl) => {
            const initials = fl.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            const isAvailable = fl.availability === 'Available Now';
            const isPartTime = fl.availability.includes('Part-Time');

            return (
              <SpotlightCard
                key={fl.id}
                onClick={() => setInspectingFreelancer(fl)}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer shadow-md hover:shadow-cyan-500/5 relative"
              >
                <div>
                  {/* Card Header: Avatar, Name, Title, Star */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      {/* Avatar with fallback */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
                          {fl.avatarUrl ? (
                            <img
                              src={fl.avatarUrl}
                              alt={fl.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to styled initials badge
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-sm font-black text-cyan-400 font-mono">${initials}</span>`;
                                }
                              }}
                            />
                          ) : (
                            <span className="text-sm font-black text-cyan-400 font-mono">{initials}</span>
                          )}
                        </div>
                        {/* Live Availability dot */}
                        <span 
                          className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                            isAvailable ? 'bg-emerald-500' : isPartTime ? 'bg-amber-500' : 'bg-slate-500'
                          }`}
                          title={fl.availability}
                        />
                      </div>

                      {/* Name & Title */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {fl.name}
                          </h4>
                          {fl.starred && (
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                          {fl.role}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Star toggle */}
                    <button
                      onClick={(e) => handleToggleStar(fl.id, e)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        fl.starred 
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' 
                          : 'bg-slate-950/60 text-slate-500 border-slate-800 hover:text-white'
                      }`}
                      title={fl.starred ? 'Remove shortlist' : 'Shortlist engineer'}
                    >
                      <Star className={`w-3.5 h-3.5 ${fl.starred ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Domain & Rate Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                      {fl.domain}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-950 text-emerald-400 border border-emerald-500/30">
                      ${fl.hourlyRate}/hr
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-950 text-slate-400 border border-slate-800">
                      {fl.experienceYears}+ yrs exp
                    </span>
                  </div>

                  {/* Bio summary */}
                  <p className="text-xs text-slate-300/90 line-clamp-2 mb-3.5 leading-relaxed">
                    {fl.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {fl.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {fl.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                        +{fl.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls: Connect Button + Location + Detail Action */}
                <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{fl.location.split(',')[0]}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Connect Button */}
                    <button
                      onClick={(e) => handleConnectLinkedIn(fl.linkedinUrl, fl.name, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                      title="Open LinkedIn Profile in new tab"
                    >
                      <Linkedin className="w-3.5 h-3.5 fill-current" />
                      <span>Connect</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                    </button>

                    {/* View Profile */}
                    <button
                      onClick={() => setInspectingFreelancer(fl)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: ADD / EDIT FREELANCER (CENTERED IN VIEWPORT)                    */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl shadow-cyan-950/40 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[#141e2e] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {editingFreelancer ? 'Edit Freelancer Dossier' : 'Add Freelance Engineer to Network'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Register freelance engineering consultant with LinkedIn credentials, rates, and skills.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="flex flex-col flex-1 overflow-hidden min-h-0">
              
              {/* Scrollable Form Body */}
              <div className="p-6 py-4 space-y-4 text-xs overflow-y-auto flex-1">
                
                {/* Row 1: Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Full Name <span className="text-cyan-400">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Alex Rivera"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Professional Role / Title <span className="text-cyan-400">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Senior Software Architect"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Custom Category & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="h-5 flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Category / Domain <span className="text-cyan-400">*</span></span>
                      {userCategories.length > 0 && (
                        <span className="text-[10px] text-slate-500 font-normal">Custom Category</span>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.domain}
                      onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                      placeholder="e.g. AI / Cloud / Full Stack / Mobile"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Contract Availability <span className="text-cyan-400">*</span></span>
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value as FreelancerAvailability }))}
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <option value="Available Now">Available Now</option>
                      <option value="Part-Time (10-20 hrs/wk)">Part-Time (10-20 hrs/wk)</option>
                      <option value="In Contract (Waitlist)">In Contract (Waitlist)</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: LinkedIn Profile URL & Profile Picture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="h-5 flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                      <span>LinkedIn Profile Link <span className="text-cyan-400">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      placeholder="https://www.linkedin.com/in/username"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="h-5 flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Profile Picture URL</span>
                      <button
                        type="button"
                        onClick={handleAutoGenerateAvatar}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                        title="Auto-create avatar from name or profile"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Auto Avatar</span>
                      </button>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.avatarUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                        placeholder="https://... or click Auto Avatar"
                        className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      {formData.avatarUrl && (
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                          <img src={formData.avatarUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 4: Hourly Rate & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Hourly Rate ($ USD / hr) <span className="text-cyan-400">*</span></span>
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="2000"
                      required
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                      placeholder="150"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                    />
                  </div>
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Experience (Years) <span className="text-cyan-400">*</span></span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      required
                      value={formData.experienceYears}
                      onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: Number(e.target.value) }))}
                      placeholder="5"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Row 5: Location & Timezone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Location (City, Country)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. San Francisco, CA / Remote"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                      <span>Primary Timezone</span>
                    </label>
                    <input
                      type="text"
                      value={formData.timezone}
                      onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                      placeholder="e.g. PST (UTC-8) or IST (UTC+5:30)"
                      className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 6: Skills */}
                <div>
                  <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Core Technical Skills (comma separated) <span className="text-cyan-400">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    placeholder="e.g. Python, Kubernetes, React, Golang, System Architecture"
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                  />
                </div>

                {/* Row 7: Bio */}
                <div>
                  <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Executive Bio & Mandate</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Brief background, architectural expertise, past enterprise milestones..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none transition-colors"
                  />
                </div>

                {/* Row 8: Key Highlights */}
                <div>
                  <label className="h-5 flex items-center text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Key Highlights / Milestones (1 per line)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.highlights}
                    onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                    placeholder="Delivered high-throughput microservices architecture&#10;Led zero-downtime database migration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none font-mono transition-colors"
                  />
                </div>

              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 p-6 pt-4 border-t border-[#141e2e] shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {editingFreelancer ? 'Save Changes' : 'Add to Network'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: VIEW FREELANCER DOSSIER & PROFILE                              */}
      {/* ========================================================================= */}
      {inspectingFreelancer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#090f1a] border border-[#1f2d40] shadow-2xl shadow-cyan-950/40 relative">
            
            {/* Dossier Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-[#141e2e] gap-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
                  {inspectingFreelancer.avatarUrl ? (
                    <img
                      src={inspectingFreelancer.avatarUrl}
                      alt={inspectingFreelancer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-black text-cyan-400 font-mono">
                      {inspectingFreelancer.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {inspectingFreelancer.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      Verified Consultant
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {inspectingFreelancer.role}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{inspectingFreelancer.location}</span>
                    <span className="text-slate-600">•</span>
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{inspectingFreelancer.timezone}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectingFreelancer(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dossier Scrollable Body */}
            <div className="p-6 py-4 space-y-5 overflow-y-auto flex-1">
              
              {/* Direct Connect & Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rate</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      ${inspectingFreelancer.hourlyRate} <span className="text-xs text-slate-400 font-normal">/ hour</span>
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status</span>
                    <span className="text-xs font-semibold text-cyan-300">
                      {inspectingFreelancer.availability}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</span>
                    <span className="text-xs font-semibold text-slate-200">
                      {inspectingFreelancer.experienceYears}+ Years
                    </span>
                  </div>
                </div>

                {/* Main Connect Button */}
                <button
                  onClick={() => handleConnectLinkedIn(inspectingFreelancer.linkedinUrl, inspectingFreelancer.name)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 fill-current" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>

              {/* Dossier Body: Bio */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Executive Profile & Background
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                  {inspectingFreelancer.bio}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Verified Technical Proficiencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {inspectingFreelancer.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Project Highlights */}
              {inspectingFreelancer.highlights && inspectingFreelancer.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Proven Enterprise Milestones
                  </h4>
                  <div className="space-y-2">
                    {inspectingFreelancer.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Dossier Footer Actions: Edit / Delete */}
            <div className="flex items-center justify-between p-6 pt-4 border-t border-[#141e2e] shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(inspectingFreelancer)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => handleDeleteFreelancer(inspectingFreelancer.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-xs font-semibold border border-rose-800/40 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <button
                onClick={(e) => handleCopyProfile(inspectingFreelancer, e)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-medium border border-slate-800 transition-all cursor-pointer"
              >
                {copiedLink === inspectingFreelancer.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
