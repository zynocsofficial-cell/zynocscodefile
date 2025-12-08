
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "FinTech Nova",
      category: "Banking Infrastructure",
      description: "A complete overhaul of a legacy banking core to a microservices architecture handling 50k tps.",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      title: "HealthGuard AI",
      category: "Healthcare Analytics",
      description: "Predictive machine learning models for early patient diagnosis integrated into EMR systems.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Nexus Stream",
      category: "Media Platform",
      description: "Ultra-low latency video streaming platform for e-sports tournaments worldwide.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Cyber Shield",
      category: "Enterprise Security",
      description: "Zero-trust security implementation for a Fortune 500 logistics company.",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm text-brand-400 font-bold tracking-widest uppercase mb-3">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">The Future</span>
            </h3>
          </div>
          <button className="hidden md:flex items-center text-white border-b border-brand-500 pb-1 hover:text-brand-400 transition-colors mt-8 md:mt-0">
            View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Abstract Background acting as Image */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-100 transition-all duration-700 ease-in-out`}></div>
              
              {/* Overlay Pattern */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white mb-3 border border-white/10">
                    {project.category}
                  </span>
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
             <button className="inline-flex items-center text-white border-b border-brand-500 pb-1">
                View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
        </div>
      </div>
    </div>
  );
};
