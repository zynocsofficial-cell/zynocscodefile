import React from 'react';
import { ArrowUpRight, Lock, ExternalLink, Globe, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { ProjectItem } from '@/types';

interface PortfolioProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="text-xs sm:text-sm text-brand-400 font-bold tracking-widest uppercase mb-2 sm:mb-3">
              Selected Works
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">The Future</span>
            </h3>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Explore live public products and confidential enterprise platforms developed and engineered by Zynocs.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              onClick={() => onSelectProject && onSelectProject(project)}
              className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all duration-500 flex flex-col p-5 sm:p-7 cursor-pointer hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden mb-6 bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                {/* Floating Badges over Image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-brand-300 border border-slate-700/60">
                    {project.category}
                  </span>

                  {project.badge && (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border backdrop-blur-md ${
                      project.isPrivate
                        ? 'bg-slate-950/85 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {project.isPrivate ? (
                        <Lock className="w-3 h-3 mr-1.5 text-amber-400" />
                      ) : (
                        <Globe className="w-3 h-3 mr-1.5 text-emerald-400" />
                      )}
                      {project.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-300 transition-colors">
                      {project.title}
                    </h4>
                    <div className="h-9 w-9 rounded-full bg-slate-800 text-slate-300 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80 mb-4">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/60 text-[11px] text-slate-300 border border-slate-700/60 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-brand-400 group-hover:text-brand-300 flex items-center">
                      View Case Study <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center transition-colors bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20"
                      >
                        Live Site <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
