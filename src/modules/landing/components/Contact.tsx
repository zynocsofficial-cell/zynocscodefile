import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Copy, 
  Check, 
  Globe, 
  Building2, 
  Lock, 
  MessageSquare, 
  ChevronDown, 
  ExternalLink,
  Code2,
  Server,
  Layers,
  Cpu,
  Shield,
  Database
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Section, SubdomainId } from '@/types';

interface ContactProps {
  onNavigate?: (section: Section, subdomain?: SubdomainId) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedService, setSelectedService] = useState('Web Architecture');
  const [selectedBudget, setSelectedBudget] = useState('$50K – $150K');
  const [selectedTimeline, setSelectedTimeline] = useState('1 – 3 Months');
  const [message, setMessage] = useState('');
  const [ndaRequested, setNdaRequested] = useState(true);
  
  // Copy feedback states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const services = [
    { label: 'Web Architecture', icon: Code2 },
    { label: 'Mobile Ecosystems', icon: Layers },
    { label: 'Cloud Infrastructure', icon: Server },
    { label: 'AI & Machine Learning', icon: Cpu },
    { label: 'Cybersecurity', icon: Shield },
    { label: 'Data Engineering', icon: Database },
  ];

  const budgetTiers = [
    '< $25K',
    '$25K – $50K',
    '$50K – $150K',
    '$150K+',
    'Audit & Advisory'
  ];

  const timelines = [
    'Immediate (< 1 mo)',
    '1 – 3 Months',
    '3 – 6 Months',
    'Planning / Flexible'
  ];

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate high-speed enterprise ingestion
    setTimeout(() => {
      setFormState('success');
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setFormState('idle');
  };

  const faqs = [
    {
      q: 'How fast can our team speak directly with a Principal Architect?',
      a: 'All enterprise inquiries are triaged by senior software architects, not commission-based salespeople. You will receive an initial technical assessment and direct calendar invite within 4 business hours.'
    },
    {
      q: 'Will you execute a Mutual Non-Disclosure Agreement (NDA) before discovery?',
      a: 'Yes, 100%. If you select the NDA option or request one, our legal team will provide our standard mutual NDA or review your corporate NDA within 24 hours prior to technical architecture sessions.'
    },
    {
      q: 'What engagement models does Zynocs support?',
      a: 'We support dedicated Sprint Pods (embedded squads of senior engineers & tech leads), Fixed-Price Milestone Deliveries (for defined architectures), and Technical Advisory & Security Audits.'
    },
    {
      q: 'Who owns the intellectual property and source code produced?',
      a: 'You retain 100% intellectual property ownership from Day 1. All repositories, cloud accounts, architectural blueprints, and pipelines are committed directly to your enterprise tenant.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none -mr-40" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[140px] pointer-events-none -ml-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-medium tracking-wide mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Direct Principal Architect Access • Accepting Q2/Q3 2026 Enterprise Projects</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Let's Architect Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-purple-400 bg-clip-text text-transparent">
              Next Breakthrough
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Connect directly with senior systems architects and engineering leads. 
            Zero sales gatekeepers, guaranteed response within 4 hours, and complete technical confidentiality.
          </p>
        </div>

        {/* Main Grid: Info Hub & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24 items-start">
          
          {/* Left Column (5 cols): Direct Hub, SLA & Subdomains */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Contact Channels Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-brand-400" />
                Direct Communication Hub
              </h3>
              
              {/* Email */}
              <div className="group p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 hover:border-brand-500/40 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Executive Enquiries</span>
                      <a href="mailto:contact@zynocs.com" className="text-sm sm:text-base font-bold text-white hover:text-brand-300 transition-colors font-mono">
                        contact@zynocs.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('contact@zynocs.com', 'email')}
                    title="Copy Email"
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="group p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 hover:border-accent-500/40 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Global Hotline</span>
                      <a href="tel:+18889966273" className="text-sm sm:text-base font-bold text-white hover:text-accent-300 transition-colors font-mono">
                        +1 (888) 996-6273
                      </a>
                      <span className="text-[11px] text-slate-500 block">Toll-Free USA & International</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('+18889966273', 'phone')}
                    title="Copy Phone Number"
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Global HQ */}
              <div className="group p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 hover:border-purple-500/40 transition-all">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Engineering Headquarters</span>
                    <p className="text-sm font-semibold text-white">101 Innovation Blvd, Suite 400</p>
                    <p className="text-xs text-slate-400">Palo Alto, Silicon Valley, CA 94301</p>
                  </div>
                </div>
              </div>

              {/* Response SLA Guarantees */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>&lt; 4hr Response SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mutual NDA Protected</span>
                </div>
              </div>
            </div>

            {/* Subdomain Navigation Routing Card */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/70 backdrop-blur-xl">
              <span className="text-xs font-bold text-brand-400 tracking-wider uppercase font-mono block mb-3">
                Dedicated Ecosystem Portals
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Looking for specific departments? Access our dedicated infrastructure hubs:
              </p>
              
              <div className="grid grid-cols-2 gap-2.5">
                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate(Section.Auth, 'client') : window.open('https://client.zynocs.com', '_blank')}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-brand-500/40 hover:bg-slate-800/40 transition-all group text-left"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-brand-300">
                    <span>Client Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">client.zynocs.com</span>
                </button>

                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate(Section.Auth, 'work') : window.open('https://work.zynocs.com', '_blank')}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/40 transition-all group text-left"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                    <span>Work & Staff</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">work.zynocs.com</span>
                </button>

                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate(Section.Auth, 'ads') : window.open('https://ads.zynocs.com', '_blank')}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/40 transition-all group text-left"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-purple-300">
                    <span>AdTech Media</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">ads.zynocs.com</span>
                </button>

                <button 
                  type="button"
                  onClick={() => onNavigate ? onNavigate(Section.Auth, 'sponsors') : window.open('https://sponsors.zynocs.com', '_blank')}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/40 transition-all group text-left"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-amber-300">
                    <span>Sponsors</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">sponsors.zynocs.com</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): The Interactive Project Scoping Form */}
          <div className="lg:col-span-7">
            <SpotlightCard 
              spotlightColor="rgba(56, 189, 248, 0.12)"
              className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl shadow-2xl relative"
            >
              
              {formState === 'success' ? (
                /* Success State Screen */
                <div className="py-12 px-4 text-center space-y-6 animate-fade-in-up">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10 animate-scale-up" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      Transmission Confirmed • Reference #ZYN-2026-ENG
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Inquiry Received by Architecture Lead
                    </h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-semibold">{name || 'Partner'}</span>. Our technical director has queued your project specifications.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Service Area:</span>
                      <span className="text-brand-300 font-semibold">{selectedService}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Budget Tier:</span>
                      <span className="text-slate-200 font-semibold">{selectedBudget}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Estimated Architect Reply:</span>
                      <span className="text-emerald-400 font-semibold">&lt; 4 Hours</span>
                    </div>
                    {ndaRequested && (
                      <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800/80">
                        <span>Mutual NDA Execution:</span>
                        <span className="text-amber-400 font-semibold">Priority Dispatch</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
                    >
                      Submit Another Project Inquiry
                    </button>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate(Section.Home)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-xs hover:shadow-lg hover:shadow-brand-500/25 transition-all"
                      >
                        Explore Services
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Interactive Form Screen */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Project Scoping & Feasibility Intake
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Fill out your technical objectives below for an architect-reviewed roadmap.
                    </p>
                  </div>

                  {/* 1. What are you building? (Service Selector) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                      1. Select Core Engineering Domain
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {services.map((srv) => {
                        const Icon = srv.icon;
                        const isSelected = selectedService === srv.label;
                        return (
                          <button
                            type="button"
                            key={srv.label}
                            onClick={() => setSelectedService(srv.label)}
                            className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all flex items-center gap-2 ${
                              isSelected
                                ? 'bg-brand-500/15 border-brand-500 text-white shadow-lg shadow-brand-500/15'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-brand-400' : 'text-slate-500'}`} />
                            <span className="truncate">{srv.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Budget Tier & Target Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Budget */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                        2. Target Budget Scope
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {budgetTiers.map((tier) => (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setSelectedBudget(tier)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              selectedBudget === tier
                                ? 'bg-accent-500/20 border-accent-400 text-accent-300'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                        3. Target Launch Timeline
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {timelines.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setSelectedTimeline(time)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              selectedTimeline === time
                                ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. Client Credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@enterprise.com"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Apex Global Technologies"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* 4. Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Technical Scope & Architecture Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your current tech stack, primary challenges (e.g. latency, migration, throughput, security audit), and desired outcomes..."
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all leading-relaxed"
                    />
                  </div>

                  {/* NDA Checkbox */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                    <input
                      type="checkbox"
                      id="nda"
                      checked={ndaRequested}
                      onChange={(e) => setNdaRequested(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-500 bg-slate-900 border-slate-700 focus:ring-brand-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="nda" className="text-xs text-slate-300 cursor-pointer select-none">
                      Execute a <strong className="text-white">Mutual NDA</strong> before sharing detailed system architecture docs
                    </label>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-accent-600 to-purple-600 hover:from-brand-500 hover:via-accent-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting to Architecture Lead...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Specifications</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    By submitting, your data is protected under our strict enterprise security standard. Never shared or sold.
                  </p>
                </form>
              )}
            </SpotlightCard>
          </div>

        </div>

        {/* Section 2: "What Happens Next?" 3-Step Milestone Pathway */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 block mb-2">
              Transparent Engineering Process
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              What Happens After You Inquire
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From first contact to live code delivery in days, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative">
              <span className="text-4xl font-mono font-black text-slate-800 absolute top-6 right-6">01</span>
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Architect Triage (&lt; 4 Hours)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A Principal Engineer reviews your tech stack and requirements. We execute an NDA if requested and prepare a targeted technical agenda.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative">
              <span className="text-4xl font-mono font-black text-slate-800 absolute top-6 right-6">02</span>
              <div className="w-12 h-12 rounded-2xl bg-accent-500/10 text-accent-400 border border-accent-500/20 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">30-Min Scoping Session</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A deep technical session covering throughput, latency bottlenecks, microservices topology, and compliance requirements with zero sales fluff.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative">
              <span className="text-4xl font-mono font-black text-slate-800 absolute top-6 right-6">03</span>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Blueprint & Kickoff Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You receive a detailed technical proposal with fixed milestones, security checklists, and an embedded squad ready for immediate deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Interactive FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-400 block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Enterprise Engagement FAQ
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-brand-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-400' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
