import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Layout, 
  Smartphone, 
  Lock, 
  Brain, 
  Cloud, 
  Database, 
  Search, 
  PenTool, 
  Code, 
  Rocket, 
  Check, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Section } from '@/types';

interface ServiceDetail {
  id: string;
  icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  inDepth: string;
  color: string;
  borderColor: string;
  bgGlow: string;
  capabilities: string[];
  techStack: string[];
  timeline: string;
}

interface ProcessStepDetail {
  number: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  tagline: string;
  inDepth: string;
  deliverables: string[];
  tools: string[];
  duration: string;
  color: string;
}

interface ServicesProps {
  onNavigate?: (section: Section) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedProcessStep, setSelectedProcessStep] = useState<ProcessStepDetail | null>(null);

  // Lock background scroll when any modal is open and handle ESC key
  useEffect(() => {
    if (selectedService || selectedProcessStep) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedService(null);
          setSelectedProcessStep(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedService, selectedProcessStep]);

  // Exact 6 services in the requested order:
  // 1 Web Architecture
  // 2 Mobile Ecosystems
  // 3 Cybersecurity
  // 4 AI & Machine Learning
  // 5 Cloud Infrastructure
  // 6 Data Engineering
  const services: ServiceDetail[] = [
    {
      id: 'web-architecture',
      icon: Layout,
      title: 'Web Architecture',
      category: 'Frontend & Full-Stack',
      description: 'High-performance React & Next.js applications engineered for speed, SEO, and massive scalability.',
      inDepth: 'We architect enterprise web platforms with sub-second page loads, modular component libraries, and strict Core Web Vitals optimization. Our frontends are built to handle millions of daily users with zero degradation.',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgGlow: 'from-blue-600/20 to-indigo-600/20',
      capabilities: [
        'Next.js & React 19 Enterprise Architecture',
        'Full Core Web Vitals & Lighthouse 95+ SEO Optimization',
        'Global Edge CDN Caching & Incremental Static Regeneration (ISR)',
        'Modular Design Systems & Accessible Component Libraries',
        'Micro-Frontends & High-Throughput REST / GraphQL APIs'
      ],
      techStack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Vite', 'Turborepo'],
      timeline: '4 – 10 Weeks'
    },
    {
      id: 'mobile-ecosystems',
      icon: Smartphone,
      title: 'Mobile Ecosystems',
      category: 'iOS & Android Native Experience',
      description: 'Native-feel cross-platform applications using React Native and Flutter for iOS and Android.',
      inDepth: 'From consumer mobile applications to complex offline-first enterprise field tools, we craft pixel-perfect mobile experiences with 60FPS animations, native device hardware integration, and streamlined app store releases.',
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgGlow: 'from-purple-600/20 to-pink-600/20',
      capabilities: [
        'Cross-Platform React Native & Flutter Engineering',
        'Offline-First Sync & SQLite / WatermelonDB Local Storage',
        'Native Hardware Integration (Biometrics, Camera, NFC, Bluetooth)',
        'Push Notification Engine & Universal Deep Linking Pipelines',
        'Automated CI/CD App Store & Google Play Deployment Pipelines'
      ],
      techStack: ['React Native', 'Flutter', 'TypeScript', 'Expo', 'Swift', 'Kotlin', 'Fastlane'],
      timeline: '6 – 12 Weeks'
    },
    {
      id: 'cybersecurity',
      icon: Lock,
      title: 'Cybersecurity',
      category: 'Zero-Trust & Compliance',
      description: 'Comprehensive security audits, penetration testing, and compliance implementation.',
      inDepth: 'Protecting your digital assets with defense-in-depth security strategies. We perform rigorous gray-box penetration tests, implement zero-trust access controls, and automate regulatory compliance audits.',
      color: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgGlow: 'from-red-600/20 to-rose-600/20',
      capabilities: [
        'Zero-Trust Network Architecture & Identity-Aware Microsegmentation',
        'Full-Scope Web, Mobile & Cloud API Penetration Testing',
        'SOC 2 Type II, HIPAA, ISO 27001 & GDPR Compliance Roadmaps',
        'Automated Vulnerability Scanning & DevSecOps CI/CD Integration',
        '24/7 Threat Hunting, DDoS Mitigation & Incident Response Playbooks'
      ],
      techStack: ['eBPF', 'HashiCorp Vault', 'WAF / Cloudflare', 'Trivy', 'OWASP ZAP', 'Terraform', 'Snyk'],
      timeline: '2 – 6 Weeks'
    },
    {
      id: 'ai-machine-learning',
      icon: Brain,
      title: 'AI & Machine Learning',
      category: 'Intelligent Workflows & LLMs',
      description: 'Custom LLM integration, chatbots, and predictive analytics powered by Gemini and TensorFlow.',
      inDepth: 'We bridge the gap between experimental AI models and mission-critical production systems. We build autonomous agent workflows, enterprise RAG search engines, and custom predictive models tuned to your private business data.',
      color: 'text-pink-400',
      borderColor: 'border-pink-500/30',
      bgGlow: 'from-pink-600/20 to-accent-600/20',
      capabilities: [
        'Custom LLM Fine-Tuning & Multi-Agent Workflow Orchestration',
        'Enterprise Retrieval-Augmented Generation (RAG) with Vector DBs',
        'Predictive Analytics & Real-Time Time-Series Forecasting',
        'Private On-Premise Air-Gapped Model Deployments',
        'Computer Vision, OCR & Document Intelligence Automation'
      ],
      techStack: ['Gemini API', 'PyTorch', 'TensorFlow', 'LangChain', 'pgvector', 'Pinecone', 'FastAPI'],
      timeline: '4 – 10 Weeks'
    },
    {
      id: 'cloud-infrastructure',
      icon: Cloud,
      title: 'Cloud Infrastructure',
      category: 'DevOps & Scalability',
      description: 'Serverless architectures and DevOps pipelines on AWS, Google Cloud, and Azure.',
      inDepth: 'We design resilient, highly-available cloud platforms that automatically scale with traffic demand. We eliminate manual operations with Infrastructure as Code, automated blue-green deployments, and cost-optimized compute workloads.',
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgGlow: 'from-cyan-600/20 to-blue-600/20',
      capabilities: [
        'Multi-Region Multi-Cloud Architecture (AWS, GCP, Azure)',
        'Kubernetes Cluster Orchestration & Serverless Microservices',
        'Infrastructure as Code (Terraform, OpenTofu, Ansible)',
        'Zero-Downtime Blue/Green & Canary Deployment Pipelines',
        'Cloud FinOps Optimization reducing cloud spend by 30-50%'
      ],
      techStack: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus'],
      timeline: '3 – 8 Weeks'
    },
    {
      id: 'data-engineering',
      icon: Database,
      title: 'Data Engineering',
      category: 'Pipelines & Analytics',
      description: 'Robust data warehousing, ETL pipelines, and real-time visualization dashboards.',
      inDepth: 'Transform chaotic raw data into high-value strategic intelligence. We construct high-throughput streaming pipelines, modern lakehouses, and sub-second analytical reporting systems.',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgGlow: 'from-emerald-600/20 to-teal-600/20',
      capabilities: [
        'High-Throughput Real-Time Streaming (Kafka, Flink, RabbitMQ)',
        'Modern Cloud Data Warehouses (Snowflake, BigQuery, ClickHouse)',
        'Automated ETL / ELT Ingestion Pipelines & Data Cleansing',
        'Interactive Executive BI Dashboards & Granular Telemetry',
        'Data Governance, RBAC Permissions & Lineage Tracking'
      ],
      techStack: ['Apache Kafka', 'ClickHouse', 'Snowflake', 'BigQuery', 'PostgreSQL', 'dbt', 'Airflow'],
      timeline: '4 – 10 Weeks'
    }
  ];

  const processSteps: ProcessStepDetail[] = [
    { 
      number: '01',
      icon: Search, 
      title: 'Discovery', 
      desc: 'REQUIREMENTS & STRATEGY',
      tagline: 'Technical Audit & Architecture Roadmap',
      inDepth: 'Before writing any code, we conduct thorough stakeholder discovery sessions, evaluate infrastructure requirements, identify potential security/scalability bottlenecks, and map out a precise engineering blueprint with measurable KPI milestones.',
      deliverables: [
        'Comprehensive Tech Feasibility & Stack Analysis',
        'System Architecture & Data Flow Diagrams',
        'Security Compliance & Threat Model Mapping',
        'Granular Milestone Budget & Sprint Roadmap',
        'Clear Acceptance Criteria for Every Feature'
      ],
      tools: ['Miro', 'Notion Enterprise', 'Jira Software', 'Lucidchart', 'OWASP Threat Dragon'],
      duration: '1 – 2 Weeks',
      color: 'text-blue-400'
    },
    { 
      number: '02',
      icon: PenTool, 
      title: 'Design', 
      desc: 'UX/UI & PROTOTYPING',
      tagline: 'Design Systems & High-Fidelity UX',
      inDepth: 'We turn conceptual requirements into pixel-perfect, accessible user experiences. Our team builds comprehensive Figma design systems, component tokens, interactive prototypes, and conducts real-world usability stress tests.',
      deliverables: [
        'Enterprise Figma Design System & UI Token Library',
        'Click-Through Interactive Prototypes for Web & Mobile',
        'Full WCAG 2.1 AA Accessibility Conformance',
        'Dark / Light Mode Responsive Theme Specifications',
        'Developer Handover Specs with Zero Ambiguity'
      ],
      tools: ['Figma', 'Storybook', 'Framer', 'Zeroheight', 'Lottie'],
      duration: '2 – 3 Weeks',
      color: 'text-purple-400'
    },
    { 
      number: '03',
      icon: Code, 
      title: 'Development', 
      desc: 'AGILE ENGINEERING',
      tagline: 'Clean Code & Continuous Integration',
      inDepth: 'Engineering happens in focused two-week agile sprint cadences. We enforce strict TypeScript typing, modular domain-driven patterns, 80%+ automated test coverage, and transparent weekly working demos in live staging environments.',
      deliverables: [
        'Bi-Weekly Sprint Cadences with Staging Deployments',
        'End-to-End Automated Testing (Jest, Playwright, Cypress)',
        'Peer-Reviewed Pull Requests & Static Code Analysis',
        'High-Throughput Microservices & Scalable Database Schemas',
        'Comprehensive Technical Documentation & API Schemas'
      ],
      tools: ['TypeScript', 'GitHub Enterprise', 'Docker', 'Turborepo', 'Postman', 'SonarQube'],
      duration: '4 – 10 Weeks',
      color: 'text-brand-400'
    },
    { 
      number: '04',
      icon: Rocket, 
      title: 'Launch', 
      desc: 'DEPLOYMENT & SCALE',
      tagline: 'Zero-Downtime Rollout & 24/7 Telemetry',
      inDepth: 'We engineer seamless production releases utilizing blue-green deployments, canary rollouts, and load-tested edge caching. Once live, continuous APM telemetry and SLA support ensure flawless uptime and peak performance.',
      deliverables: [
        'Zero-Downtime Blue/Green & Canary Rollouts',
        'Multi-Cloud Global CDN Caching & Edge Optimization',
        '24/7 Observability Dashboards & Real-Time Alerting',
        'Post-Launch Performance Audits (Core Web Vitals)',
        'Complete IP Ownership, Code Handover & SLA Support'
      ],
      tools: ['Kubernetes', 'AWS / Google Cloud', 'Datadog', 'Prometheus', 'Cloudflare', 'Grafana'],
      duration: 'Continuous / SLA',
      color: 'text-emerald-400'
    },
  ];

  const handleConsultService = (serviceTitle: string) => {
    setSelectedService(null);
    if (onNavigate) {
      onNavigate(Section.Contact);
    }
  };

  return (
    <div className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <h2 className="text-xs sm:text-sm text-brand-400 font-bold tracking-widest uppercase mb-3">Our Expertise</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Engineering Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">Excellence</span>
          </h3>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-400 mx-auto leading-relaxed">
            We don't just build software; we craft resilient digital assets that drive enterprise growth. Click any service to view architectural details.
          </p>
        </div>

        {/* 6 Services Grid in Requested Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-28 sm:mb-32 animate-fade-in-up">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="cursor-pointer h-full"
            >
              <SpotlightCard 
                className="p-7 sm:p-8 group h-full flex flex-col justify-between hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                spotlightColor="rgba(56, 189, 248, 0.15)"
              >
                <div>
                  <div className="mb-6">
                    <div className={`w-fit p-3.5 rounded-xl bg-slate-900 border border-slate-800 ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        {/* Process Section - How We Deliver */}
        <div className="relative animate-fade-in-up">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">How We Deliver</h3>
            <p className="text-slate-400 text-sm sm:text-base">A disciplined engineering process from inception to global deployment.</p>
          </div>
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedProcessStep(step)}
                className="flex flex-col items-center bg-transparent px-4 relative z-10 group w-full md:w-auto cursor-pointer focus:outline-none transition-transform hover:scale-105"
              >
                <div className="h-16 w-16 rounded-2xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center mb-4 group-hover:border-brand-500 group-hover:bg-brand-500/10 transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                  <step.icon className={`h-7 w-7 ${step.color} transition-transform group-hover:scale-110`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{step.desc}</p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Service Details Interactive Modal */}
      {selectedService && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Full Screen Backdrop Blur Scrim (covers entire screen, navbar, everything) */}
          <div 
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-fade-in"
          ></div>

          {/* Modal Card */}
          <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-8 z-10 max-h-[85vh] sm:max-h-[88vh] overflow-y-auto animate-fade-in-up my-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-4">
                <div className={`p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 ${selectedService.color} shadow-lg shrink-0`}>
                  <selectedService.icon className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand-400 font-mono font-semibold">
                    {selectedService.category}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors shrink-0 ml-2"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* In-Depth Overview */}
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-1.5 text-brand-400 shrink-0" /> Architectural Overview
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedService.inDepth}
              </p>
            </div>

            {/* Core Capabilities */}
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-brand-400 shrink-0" /> Key Deliverables & Capabilities
              </h4>
              <div className="space-y-2.5">
                {selectedService.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start text-xs sm:text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                    <Check className="h-4 w-4 text-emerald-400 mr-2.5 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                  Technologies & Frameworks
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                  Typical Engagement Cycle
                </div>
                <div className="text-base font-bold text-brand-300 font-mono">
                  {selectedService.timeline}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => handleConsultService(selectedService.title)}
                className="flex-1 py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-900/50 transition-all flex items-center justify-center group ring-2 ring-transparent hover:ring-brand-400/50"
              >
                Consult on {selectedService.title}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Process Step Details Interactive Modal */}
      {selectedProcessStep && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Full Screen Backdrop Blur Scrim */}
          <div 
            onClick={() => setSelectedProcessStep(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-fade-in"
          ></div>

          {/* Modal Card */}
          <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-8 z-10 max-h-[85vh] sm:max-h-[88vh] overflow-y-auto animate-fade-in-up my-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-4">
                <div className={`p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 ${selectedProcessStep.color} shadow-lg shrink-0`}>
                  <selectedProcessStep.icon className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand-400 font-mono font-semibold">
                    Stage {selectedProcessStep.number} • Delivery Lifecycle
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                    {selectedProcessStep.title} Phase
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedProcessStep(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors shrink-0 ml-2"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* In-Depth Overview */}
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-1.5 text-brand-400 shrink-0" /> Phase Objective
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedProcessStep.inDepth}
              </p>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-brand-400 shrink-0" /> Deliverables & Activities
              </h4>
              <div className="space-y-2.5">
                {selectedProcessStep.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start text-xs sm:text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                    <Check className="h-4 w-4 text-emerald-400 mr-2.5 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                  Engineering Stack & Tools
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProcessStep.tools.map((tool, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                  Typical Phase Duration
                </div>
                <div className="text-base font-bold text-brand-300 font-mono">
                  {selectedProcessStep.duration}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedProcessStep(null);
                  if (onNavigate) onNavigate(Section.Contact);
                }}
                className="flex-1 py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-900/50 transition-all flex items-center justify-center group ring-2 ring-transparent hover:ring-brand-400/50"
              >
                Start Project with {selectedProcessStep.title}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setSelectedProcessStep(null)}
                className="py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
