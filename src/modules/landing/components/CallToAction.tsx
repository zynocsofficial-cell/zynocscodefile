import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Section } from '@/types';

interface CallToActionProps {
  onNavigate: (section: Section) => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onNavigate }) => {
  return (
    <div className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden border-t border-slate-800/80">
      {/* Ambient Radial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-600/20 via-accent-600/15 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-[0_0_25px_rgba(56,189,248,0.2)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Next-Gen Enterprise Engineering</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.12]">
          Ready to <span className="text-brand-400">Digitalize</span> Your Business?
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Join forward-thinking enterprises that trust Zynocs for mission-critical infrastructure, custom AI systems, and high-velocity digital ecosystems.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onNavigate(Section.Contact)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all transform hover:scale-105 shadow-lg shadow-brand-900/50 flex items-center justify-center ring-2 ring-transparent hover:ring-brand-400/50 group"
          >
            Schedule a Consultation
            <ArrowRight className="ml-2.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate(Section.Services)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 hover:border-slate-600 backdrop-blur-md transition-all duration-300 flex items-center justify-center"
          >
            Explore Services
          </button>
        </div>

        {/* Value Highlights Pill Row */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 font-medium">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Zero-Downtime Deployments</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-400 shrink-0" />
            <span>Sub-Second Response Latency</span>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-brand-400 shrink-0" />
            <span>Multi-Cloud Architecture</span>
          </div>
        </div>

      </div>
    </div>
  );
};
