
import React, { useState } from 'react';
import { Globe, Zap, Mail, Copy, Check, Sparkles, Send, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export const Careers: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const perks = [
    { 
      icon: Globe, 
      title: 'Remote-First', 
      desc: 'Work from anywhere in the world. We focus on output, not hours.' 
    },
    { 
      icon: Zap, 
      title: 'Merit-Based Equipment', 
      desc: 'Prove your technical value and delivery milestones first. Workstation upgrades and hardware support are unlocked based on proven performance.' 
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('hr.zynocs@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-brand-300 text-sm font-medium tracking-wide uppercase">We are hiring</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">Impossible</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join a team of visionaries, hackers, and creators. At Zynocs, we don't just follow trends—we write the code that defines them.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32">
          {perks.map((perk, idx) => (
            <SpotlightCard key={idx} className="p-8 h-full" spotlightColor="rgba(168, 85, 247, 0.15)">
              <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <perk.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{perk.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{perk.desc}</p>
            </SpotlightCard>
          ))}
        </div>

        {/* We Always Hire Talent Section */}
        <div className="max-w-4xl mx-auto">
          <SpotlightCard 
            spotlightColor="rgba(56, 189, 248, 0.15)"
            className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl text-center relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono font-medium tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>We Always Hire Talent</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Great Minds Don't Wait for Job Postings
            </h2>

            <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              At Zynocs, we don't believe in rigid hiring cycles. If you are an exceptional engineer, 
              systems architect, AI researcher, or designer who builds high-caliber systems, 
              there is always a place for you on our engineering squad.
            </p>

            {/* Email Dispatch Card */}
            <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-brand-500/40 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Direct Talent Inbox
                  </span>
                  <a 
                    href="mailto:hr.zynocs@gmail.com?subject=Talent%20Application%20-%20Engineering%20at%20Zynocs" 
                    className="text-base sm:text-lg font-bold text-white hover:text-brand-300 transition-colors font-mono"
                  >
                    hr.zynocs@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy HR Email"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href="mailto:hr.zynocs@gmail.com?subject=Talent%20Application%20-%20Engineering%20at%20Zynocs"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-900/40 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Email Us</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Send your CV, GitHub, or portfolio. Every application is reviewed directly by our engineering leadership.
            </p>
          </SpotlightCard>
        </div>

      </div>
    </div>
  );
};
