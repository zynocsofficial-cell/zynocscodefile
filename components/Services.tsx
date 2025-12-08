
import React from 'react';
import { Smartphone, Cloud, Database, Brain, Layout, Lock, Search, PenTool, Code, Rocket, Check, Briefcase, Clock, Users } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const Services: React.FC = () => {
  const services = [
    {
      icon: Layout,
      title: 'Web Architecture',
      description: 'High-performance React & Next.js applications engineered for speed, SEO, and massive scalability.',
      color: 'text-blue-400',
    },
    {
      icon: Smartphone,
      title: 'Mobile Ecosystems',
      description: 'Native-feel cross-platform applications using React Native and Flutter for iOS and Android.',
      color: 'text-purple-400',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Custom LLM integration, chatbots, and predictive analytics powered by Gemini and TensorFlow.',
      color: 'text-pink-400',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Serverless architectures and DevOps pipelines on AWS, Google Cloud, and Azure.',
      color: 'text-cyan-400',
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Robust data warehousing, ETL pipelines, and real-time visualization dashboards.',
      color: 'text-emerald-400',
    },
    {
      icon: Lock,
      title: 'Cybersecurity',
      description: 'Comprehensive security audits, penetration testing, and compliance implementation.',
      color: 'text-red-400',
    }
  ];

  const processSteps = [
    { icon: Search, title: 'Discovery', desc: 'Requirements & Strategy' },
    { icon: PenTool, title: 'Design', desc: 'UX/UI & Prototyping' },
    { icon: Code, title: 'Development', desc: 'Agile Engineering' },
    { icon: Rocket, title: 'Launch', desc: 'Deployment & Scale' },
  ];

  const models = [
    {
      icon: Users,
      title: 'Dedicated Team',
      desc: 'An extension of your company. Best for long-term product development.',
      features: ['Full-time engineers', 'Direct management', 'Agile workflow', 'Scalable resources'],
      recommended: true
    },
    {
      icon: Briefcase,
      title: 'Fixed Scope',
      desc: 'Defined deliverables and timeline. Best for MVPs and specific modules.',
      features: ['Guaranteed budget', 'Clear deadlines', 'Defined milestones', 'Minimal management'],
      recommended: false
    },
    {
      icon: Clock,
      title: 'Time & Material',
      desc: 'Flexible consulting and support. Best for maintenance and audits.',
      features: ['Pay as you go', 'Flexible scope', 'Hourly billing', 'On-demand expertise'],
      recommended: false
    }
  ];

  return (
    <div className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-sm text-brand-400 font-bold tracking-widest uppercase mb-3">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Engineering Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">Excellence</span>
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
            We don't just build software; we craft resilient digital assets that drive business growth.
          </p>
        </div>

        {/* Services Grid with Spotlight Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {services.map((service, index) => (
            <SpotlightCard 
              key={index} 
              className="p-8 group h-full"
              spotlightColor="rgba(56, 189, 248, 0.15)"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-lg bg-slate-900 border border-slate-800 ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-6 w-6" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                {service.description}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Process Section */}
        <div className="relative mb-32 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-800 hidden md:block"></div>
            </div>
            <div className="relative flex flex-col md:flex-row justify-between items-center gap-8">
                {processSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-slate-950 px-4 relative z-10 group">
                        <div className="h-16 w-16 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center mb-4 group-hover:border-brand-500 group-hover:bg-brand-500/10 transition-all duration-300 shadow-xl group-hover:shadow-brand-500/20">
                            <step.icon className="h-7 w-7 text-slate-400 group-hover:text-brand-400 transition-colors" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Engagement Models */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white">Engagement Models</h3>
                <p className="text-slate-400 mt-2">Flexible working arrangements tailored to your business needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {models.map((model, idx) => (
                    <div key={idx} className={`relative p-8 rounded-2xl border ${model.recommended ? 'bg-slate-900/50 border-brand-500/50 shadow-[0_0_30px_rgba(56,189,248,0.1)]' : 'bg-slate-950/50 border-slate-800'} transition-all hover:-translate-y-2`}>
                        {model.recommended && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-full shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-white mb-6">
                            <model.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{model.title}</h4>
                        <p className="text-slate-400 text-sm mb-6 h-10">{model.desc}</p>
                        <ul className="space-y-3">
                            {model.features.map((feat, i) => (
                                <li key={i} className="flex items-center text-sm text-slate-300">
                                    <Check className="h-4 w-4 text-brand-400 mr-3 flex-shrink-0" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
