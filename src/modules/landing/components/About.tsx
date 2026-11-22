import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Code2, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Globe2,
  Lock,
  Cpu
} from 'lucide-react';
import { Stats } from './Stats';
import { Leadership } from './Leadership';
import { Section } from '@/types';

interface AboutProps {
  onNavigate: (section: Section) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const coreValues = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We embrace bleeding-edge technologies—from LLMs and autonomous agents to edge computing—to deliver competitive enterprise moats.',
      color: 'text-brand-400',
      borderColor: 'group-hover:border-brand-500/40'
    },
    {
      icon: ShieldCheck,
      title: 'Security by Default',
      description: 'Zero-trust architecture, automated vulnerability scanning, and SOC 2 / HIPAA compliance roadmaps are baked into day one of every sprint.',
      color: 'text-emerald-400',
      borderColor: 'group-hover:border-emerald-500/40'
    },
    {
      icon: Layers,
      title: 'Architectural Resilience',
      description: 'We build for massive horizontal scale: sub-second latency, multi-region failover, and self-healing cloud microservices.',
      color: 'text-purple-400',
      borderColor: 'group-hover:border-purple-500/40'
    },
    {
      icon: Code2,
      title: 'Transparent Velocity',
      description: 'Bi-weekly demo cadences, direct engineer communication, clean modular codebases, and complete client IP ownership.',
      color: 'text-cyan-400',
      borderColor: 'group-hover:border-cyan-500/40'
    }
  ];

  const deliveryGuarantees = [
    {
      title: '100% IP & Code Ownership',
      desc: 'All source code, Docker configs, CI/CD scripts, and architecture docs belong strictly to you from day one.'
    },
    {
      title: 'Dedicated Agile Squads',
      desc: 'Senior full-stack architects and engineers dedicated to your domain without context-switching.'
    },
    {
      title: 'Sub-Second Global Performance',
      desc: 'Applications engineered with strict Core Web Vitals optimization and global edge CDN caching.'
    },
    {
      title: '24/7 Telemetry & SLA Support',
      desc: 'Proactive observability, real-time alert triage, and enterprise-grade reliability SLAs.'
    }
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Who We Are • Enterprise Technology Leaders</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-indigo-400">Zynocs</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            We are a collective of elite systems architects, AI engineers, and product strategists obsessed with the future of enterprise software.
          </p>
        </div>

        {/* Dynamic Animated Stats Section */}
        <Stats />

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center mb-28 animate-fade-in-up">
          
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Bridging Traditional Engineering Discipline with Modern Agility
            </h2>
            
            <p>
              Zynocs was founded with a singular purpose: to solve the enterprise modernization paradox. Businesses were trapped between rigid legacy mainframes that were reliable but impossible to evolve, and modern frameworks that were fast but prone to architectural fragility.
            </p>
            
            <p>
              We bring the rigorous discipline of enterprise engineering—zero-trust security, distributed consensus, and deterministic memory safety—and combine it with the lightning velocity of modern cloud-native frameworks.
            </p>

            <div className="p-6 rounded-2xl bg-slate-900/80 border-l-4 border-brand-500 border border-slate-800/80 shadow-xl">
              <p className="text-white font-medium italic text-base sm:text-lg leading-relaxed">
                &ldquo;We don&apos;t just build software; we architect resilient digital assets that drive sustainable, generational enterprise growth.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-600 rounded-3xl transform rotate-2 opacity-20 blur-xl"></div>
            
            <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-7 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center">
                <Globe2 className="h-5 w-5 text-brand-400 mr-2.5" />
                Engineering Guarantees
              </h3>
              
              <div className="space-y-4">
                {deliveryGuarantees.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Core Values 4-Card Grid */}
        <div className="mb-28 animate-fade-in-up">
          <div className="text-center mb-14">
            <h2 className="text-xs sm:text-sm text-brand-400 font-bold tracking-widest uppercase mb-2">Our Operating Pillars</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Principles That Guide Every Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div 
                key={idx}
                className="group relative p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 ${val.color} shadow-lg w-fit mb-5 group-hover:scale-110 transition-transform`}>
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visionary Leadership Section */}
        <Leadership />

        {/* Bottom Consultation Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-900/30 via-slate-900 to-accent-900/30 border border-brand-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Partner with Zynocs on Your Next Big Breakthrough
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed font-light">
              Whether you need to modernize a legacy backend, integrate proprietary LLMs, or scale to millions of users, our architects are ready to assist.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate(Section.Contact)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all hover:scale-105 flex items-center justify-center"
              >
                Schedule Engineering Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate(Section.Careers)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700/80 transition-colors flex items-center justify-center"
              >
                Explore Open Careers
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
