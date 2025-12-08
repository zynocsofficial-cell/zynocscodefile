
import React from 'react';
import { Rocket, Heart, Globe, Zap, Coffee, ArrowRight, Briefcase } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const Careers: React.FC = () => {
  const perks = [
    { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere in the world. We focus on output, not hours.' },
    { icon: Zap, title: 'Top Equipment', desc: 'Latest MacBook Pro, 4K monitors, and budget for your home office.' },
    { icon: Heart, title: 'Comprehensive Health', desc: 'Premium medical, dental, and vision coverage for you and your family.' },
    { icon: Rocket, title: 'Growth Budget', desc: '$2,000 annual stipend for conferences, courses, and books.' },
    { icon: Coffee, title: 'Wellness', desc: 'Monthly gym/wellness allowance and unlimited PTO policy.' },
    { icon: Briefcase, title: 'Equity', desc: 'Significant stock options. We want you to own what you build.' },
  ];

  const jobs = [
    { title: 'Senior Full Stack Engineer', dept: 'Engineering', type: 'Remote', location: 'Global' },
    { title: 'AI Research Scientist', dept: 'R&D', type: 'Remote', location: 'San Francisco / Remote' },
    { title: 'Product Designer (UI/UX)', dept: 'Design', type: 'Remote', location: 'London / Remote' },
    { title: 'DevOps Architect', dept: 'Infrastructure', type: 'Remote', location: 'New York / Remote' },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
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

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-slate-800 hover:border-brand-500/50 transition-all duration-300 group cursor-pointer flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">{job.title}</h3>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-slate-500 mt-1">
                    <span>{job.dept}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                    <span>{job.type}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <button className="px-6 py-2 rounded-full border border-slate-700 text-white font-medium text-sm hover:bg-brand-600 hover:border-brand-500 transition-all flex items-center">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
             <p className="text-slate-500">Don't see your role? <a href="#" className="text-brand-400 hover:underline">Email us</a> your resume.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
