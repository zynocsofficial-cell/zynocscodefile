import React from 'react';
import { Logo } from './Logo';
import { Section, SubdomainId } from '@/types';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity,
  Heart,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: Section, subdomain?: SubdomainId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#01040f] border-t border-slate-900 pt-16 pb-12 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-16">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="cursor-pointer inline-block" onClick={() => onNavigate(Section.Home)}>
              <Logo className="h-9 w-9" withText={true} />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Architecting mission-critical digital infrastructure, custom AI systems, and scalable cloud platforms for forward-thinking enterprises worldwide.
            </p>

            {/* Live Infrastructure Status */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">All Systems Operational • 99.99% SLA</span>
            </div>

            {/* Social Connect Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-400 hover:text-white transition-all bg-slate-900/80 hover:bg-brand-600/20 p-2.5 rounded-xl border border-slate-800 hover:border-brand-500/40 hover:shadow-lg"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-white transition-all bg-slate-900/80 hover:bg-brand-600/20 p-2.5 rounded-xl border border-slate-800 hover:border-brand-500/40 hover:shadow-lg"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-slate-400 hover:text-white transition-all bg-slate-900/80 hover:bg-brand-600/20 p-2.5 rounded-xl border border-slate-800 hover:border-brand-500/40 hover:shadow-lg"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <button 
                onClick={() => onNavigate(Section.Contact)}
                aria-label="Email"
                className="text-slate-400 hover:text-white transition-all bg-slate-900/80 hover:bg-brand-600/20 p-2.5 rounded-xl border border-slate-800 hover:border-brand-500/40 hover:shadow-lg"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 font-mono text-brand-400">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate(Section.Services)} className="hover:text-brand-300 transition-colors text-left">
                  Web Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Services)} className="hover:text-brand-300 transition-colors text-left">
                  Mobile Ecosystems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Services)} className="hover:text-brand-300 transition-colors text-left">
                  Cybersecurity
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Services)} className="hover:text-brand-300 transition-colors text-left">
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Services)} className="hover:text-brand-300 transition-colors text-left">
                  Cloud Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Services)} className="hover:text-brand-300 transition-colors text-left">
                  Data Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 font-mono text-brand-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate(Section.About)} className="hover:text-brand-300 transition-colors text-left">
                  About Zynocs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Home)} className="hover:text-brand-300 transition-colors text-left">
                  Selected Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Blogs)} className="hover:text-brand-300 transition-colors text-left">
                  Blogs & Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.AdPlacements)} className="hover:text-brand-300 transition-colors inline-flex items-center">
                  <span>Ad Placements</span>
                  <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Sponsor
                  </span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Careers)} className="hover:text-brand-300 transition-colors inline-flex items-center">
                  <span>Careers</span>
                  <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-brand-500/20 text-brand-400 border border-brand-500/30">
                    Hiring
                  </span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(Section.Contact)} className="hover:text-brand-300 transition-colors text-left">
                  Contact Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Column (Active Subdomain Portals) */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 font-mono text-brand-400">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="hover:text-brand-300 transition-colors flex items-center group cursor-pointer" onClick={() => onNavigate(Section.Home)}>
                  <span>zynocs.com</span>
                  <span className="text-[10px] text-slate-500 ml-1.5 font-mono">(Main)</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center group cursor-pointer" onClick={() => onNavigate(Section.Auth, 'work')}>
                  <span>work.zynocs.com</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-emerald-400/80 ml-1.5 font-mono">(Work)</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-brand-400 transition-colors flex items-center group cursor-pointer" onClick={() => onNavigate(Section.Auth, 'client')}>
                  <span>client.zynocs.com</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-brand-400/80 ml-1.5 font-mono">(Portal)</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-purple-400 transition-colors flex items-center group cursor-pointer" onClick={() => onNavigate(Section.Auth, 'ads')}>
                  <span>ads.zynocs.com</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-purple-400/80 ml-1.5 font-mono">(AdTech)</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-amber-400 transition-colors flex items-center group cursor-pointer" onClick={() => onNavigate(Section.Auth, 'sponsors')}>
                  <span>sponsors.zynocs.com</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-amber-400/80 ml-1.5 font-mono">(Sponsors)</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-slate-900/90 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Zynocs Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-slate-500">
            <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate(Section.About)}>
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate(Section.About)}>
              Terms of Service
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigate(Section.About)}>
              Security Disclosures
            </span>
          </div>

          <div className="flex items-center text-slate-500 flex-wrap justify-center sm:justify-start">
            <span>Engineered with precision and</span>
            <Heart 
              className="w-3.5 h-3.5 mx-1.5 text-red-500 fill-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.85)] inline-block transition-transform duration-300 hover:scale-125" 
              aria-label="love"
            />
            <span>by</span>
            <span className="text-slate-400 font-semibold ml-1.5">Zynocs Architecture Team</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
