import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Lock, Globe, CheckCircle2, ShieldAlert, Cpu, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { ProjectItem, Section } from '@/types';

interface ProjectCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
  onNavigate: (section: Section) => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, onBack, onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  return (
    <div className="pt-24 pb-20 min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar / Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 backdrop-blur-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-sm font-semibold"
            >
              <Globe className="mr-2 h-4 w-4 text-emerald-400" />
              Visit Live Site
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Hero Banner with Featured Image */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-12 group">
          {/* Background Image */}
          <div className="relative h-72 sm:h-96 md:h-[450px] w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20"></div>
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-brand-300 border border-slate-700/60">
                {project.category}
              </span>

              {project.badge && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                  project.isPrivate
                    ? 'bg-slate-900/80 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}>
                  {project.isPrivate ? (
                    <Lock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  ) : (
                    <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  )}
                  {project.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-mono">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Overview & Challenge / Solution Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 mb-16">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-brand-400" />
                Project Overview
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-red-500/20 bg-red-950/10">
                <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center">
                  <ShieldAlert className="h-5 w-5 mr-2 text-red-400" />
                  The Challenge
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-brand-500/20 bg-brand-950/10">
                <h3 className="text-lg font-bold text-brand-300 mb-3 flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-brand-400" />
                  The Zynocs Solution
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar / Tech Stack */}
          <div className="space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-brand-400" />
                Engineering Stack
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Architecture Type</div>
                  <div className="text-sm font-semibold text-white">Cloud-Native / Enterprise</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Project Classification</div>
                  <div className="text-sm font-semibold text-white">
                    {project.isPrivate ? 'Confidential Private Client' : 'Public Commercial SaaS'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Delivery Lead</div>
                  <div className="text-sm font-semibold text-brand-400">Zynocs Engineering Core</div>
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center transition-all shadow-lg shadow-brand-500/25"
                >
                  Open Live Platform <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Key Features Breakdown */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 tracking-tight">
            Key Architectural <span className="text-brand-400">Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                  <h4 className="text-lg font-bold text-white">{feat.title}</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed pl-8">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-900/60 via-slate-900 to-accent-900/60 border border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Build Your Next Breakthrough?
            </h3>
            <p className="text-slate-400 mb-8 text-base sm:text-lg">
              Let Zynocs architect your product with the same engineering rigor and security standards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate(Section.Contact)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-brand-50 transition-all shadow-xl hover:scale-105 transform duration-200"
              >
                Schedule Consultation
              </button>
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-colors"
              >
                Back to All Projects
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
