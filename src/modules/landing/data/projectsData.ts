import { ProjectItem } from '@/types';

export const projectsData: ProjectItem[] = [
  {
    id: "easypdfwork",
    title: "EasyPDFWork",
    subtitle: "Expert PDF Tools for Modern Teams — 100% Free, Zero Upload, No Daily Limits",
    category: "Document Productivity Suite",
    badge: "Live Product • Built by Zynocs",
    link: "https://easypdfwork.com",
    image: "/images/projects/easypdfwork.jpg",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    description: "Process documents at lightning speed. Merge, compress, and organize securely — entirely within your browser with zero file uploads.",
    longDescription: "EasyPDFWork is an innovative browser-based document productivity platform engineered by Zynocs. Unlike traditional online PDF tools that upload sensitive personal or corporate documents to remote servers, EasyPDFWork executes all heavy PDF manipulation entirely within the client's web browser using modern WebAssembly and Web Workers.",
    tags: ["Client-Side Processing", "Zero File Uploads", "WebAssembly", "PDF Tooling"],
    metrics: [
      { label: "Server Uploads", value: "0 B (Pure Local)" },
      { label: "Processing Speed", value: "< 1.2s per 100 pgs" },
      { label: "Privacy Rating", value: "100% Client-Only" },
      { label: "Active Tools", value: "12+ Utilities" }
    ],
    challenge: "Most online PDF converters and editors require users to upload confidential contracts, financial statements, and personal records to third-party servers. This creates major compliance vulnerabilities (GDPR, HIPAA) and data breach risks, along with slow upload/download bottlenecks on large files.",
    solution: "Zynocs engineered a zero-server upload pipeline utilizing WebAssembly compiled modules and HTML5 File APIs. Document rendering, page reordering, file merging, cryptographic password locking, and compression execute inside dedicated multi-threaded Web Workers on the user's device, ensuring absolute privacy and instant performance.",
    keyFeatures: [
      { title: "Merge & Split PDFs", desc: "Instantly combine multi-source PDF documents or extract custom page intervals with real-time drag-and-drop preview." },
      { title: "Military-Grade Encryption", desc: "Password protect sensitive documents or unlock permissions client-side without transmitting credentials over the network." },
      { title: "Page Organizer & Rotator", desc: "Visual thumbnail grid allowing users to rotate, reorder, or delete individual pages seamlessly." },
      { title: "Lossless Compression", desc: "Smart vector and raster compression reducing document sizes for email dispatch while preserving document sharpness." }
    ],
    techStack: ["React", "TypeScript", "WebAssembly", "PDF-Lib", "Web Workers", "Tailwind CSS", "Vite"]
  },
  {
    id: "estateflow",
    title: "EstateFlow",
    subtitle: "Property Discovery, 3D Showcase & Direct Company-to-Customer Connection Platform",
    category: "Real Estate Discovery & Client Acquisition",
    badge: "Agency Platform • Built by Zynocs",
    isPrivate: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&h=800",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    description: "Empowers real estate companies to showcase premium properties with immersive 3D digital walkthroughs and connect directly with high-intent buyers and tenants with zero middlemen.",
    longDescription: "EstateFlow is a specialized real estate showcase and client acquisition platform engineered by Zynocs. Built specifically to connect real estate companies, property developers, and agencies directly with customers, EstateFlow replaces static image galleries with interactive 3D property digital twins and direct client inquiry pipelines. Agencies can publish their property inventory with immersive spatial fidelity and convert interested seekers into direct appointments and sales consultations with zero third-party lead brokers.",
    tags: ["Property Listings", "Company-to-Customer", "3D Virtual Tours", "Lead Generation", "Direct Booking"],
    metrics: [
      { label: "Customer Inquiries", value: "+280% Qualified Leads" },
      { label: "Listing Engagement", value: "5.4x Longer than 2D" },
      { label: "Direct Consultations", value: "64% Booking Rate" },
      { label: "Connected Agencies", value: "85+ Property Firms" }
    ],
    challenge: "Real estate agencies and builders face two major obstacles: (1) Mainstream property portal aggregators charge exorbitant monthly listing fees, bury independent agencies under corporate monopolies, and resell buyer inquiries to competing brokers; (2) Flat 2D photos fail to give prospective buyers and tenants an accurate feel of dimensions, natural lighting, and layout, resulting in high bounce rates and wasted physical site visits with uncommitted clients.",
    solution: "Zynocs built EstateFlow as an agency-first property showcase and customer connection engine: (1) Interactive WebGL 3D virtual walkthroughs let customers explore residential and commercial spaces room-by-room in full 3D detail from any phone or laptop; (2) Instant direct-connect channels (1-click WhatsApp, phone, and automated calendar viewings) link customers straight to the listing company's sales reps; and (3) Smart qualification intake forms capture customer timelines, preferences, and budgets so companies only spend time on serious, ready-to-act buyers.",
    keyFeatures: [
      { title: "Immersive 3D Property Showcase & Virtual Tours", desc: "Ultra-responsive Three.js 4K WebGL digital twins enabling customers to explore layout floor plans, check room dimensions, and toggle daylight modes directly in browser without installing any apps." },
      { title: "Direct Company-to-Customer Connection Pipeline", desc: "Customers inquire directly with the property company or assigned agent via 1-click verified channels with zero intermediary lead brokers or hidden referral fees." },
      { title: "Smart Buyer & Tenant Qualification Engine", desc: "Structured inquiry filters that capture target budget, moving timelines, and space specifications to deliver pre-screened, high-intent client leads directly to the agency's sales team." },
      { title: "Real-Time Agency Portfolio Management", desc: "Intuitive management dashboard allowing real estate companies to effortlessly publish new properties, update availability statuses, manage photos and 3D floor plans, and track customer inquiry volumes." }
    ],
    techStack: ["React", "TypeScript", "Three.js / WebGL", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS S3 / CloudFront"]
  },
  {
    id: "frigzone",
    title: "FrigZone",
    subtitle: "Commercial & Residential Cooling Equipment Ecosystem — Refurbished, Tested & Warranty-Backed",
    category: "Industrial ReCommerce & Logistics",
    badge: "Built by Zynocs",
    image: "/images/projects/frigzone.jpg",
    gradient: "from-blue-600 via-indigo-600 to-cyan-600",
    description: "Premium refurbished refrigerators and commercial cooling equipment, professionally restored for reliable performance and backed by warranty.",
    longDescription: "FrigZone (frigzone.com) is a high-performance commercial and residential refrigeration re-commerce marketplace architected and engineered by Zynocs. Built to power reliable industrial cooling trade, FrigZone unites enterprise equipment tracking, multi-point diagnostic verification, certified warranty enforcement, and real-time inventory management into an ultra-responsive modern digital storefront.",
    tags: ["Refrigeration ReCommerce", "Inventory Telemetry", "Warranty Management", "Industrial Trade"],
    metrics: [
      { label: "Refurbished Units", value: "1,400+ Units" },
      { label: "Diagnostic Checkpoints", value: "48-Point Tested" },
      { label: "Warranty Backing", value: "100% Certified" },
      { label: "Commercial Reliability", value: "99.8% Uptime" }
    ],
    challenge: "Commercial cooling equipment procurement traditionally relies on fragmented secondary dealers with zero standardized quality benchmarks, unverifiable repair histories, and lack of warranty coverage for heavy-duty restaurant, grocery, and medical cooling units.",
    solution: "Zynocs engineered a comprehensive digital re-commerce and diagnostics tracking ecosystem. Every refrigerator unit is serialized, cataloged with high-resolution visual condition grades, thermodynamic testing logs, and issued a verified digital warranty certificate with automated service claim workflows.",
    keyFeatures: [
      { title: "Dynamic Unit Inventory & Availability", desc: "Real-time stock reservation and regional logistics tracking for commercial reach-in coolers, display freezers, and industrial chillers." },
      { title: "48-Point Diagnostic Certification", desc: "Digital verification pipeline logging compressor health, refrigerant pressure testing, and energy efficiency benchmarks before release." },
      { title: "Automated Warranty Vault", desc: "Self-serve customer portal for instant warranty activation, claim dispatch, and scheduled preventive maintenance." },
      { title: "Instant Unit Reservation", desc: "Streamlined checkout and B2B quotation generator with instant shipping calculation and delivery scheduling." }
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "AWS CloudFront"]
  },
  {
    id: "jobbuddy",
    title: "JobBuddy",
    subtitle: "Intelligent Talent Discovery & Hiring Ecosystem",
    category: "Talent & Career Marketplace",
    badge: "Private Project",
    isPrivate: true,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200&h=800",
    gradient: "from-amber-500 via-orange-600 to-rose-700",
    description: "An intelligent employment marketplace connecting candidates with hiring companies, featuring 1-click applications, automated resume parsing, and employer pipeline tracking.",
    longDescription: "JobBuddy is a state-of-the-art dual-sided hiring ecosystem designed and developed by Zynocs for a leading private talent syndicate. The platform re-engineers modern recruitment: candidates enjoy seamless profile matching, 1-click verified applications, and instant salary benchmarking, while enterprise employers gain an AI-assisted Applicant Tracking System (ATS).",
    tags: ["Job Seeker Portal", "Multi-Company Jobs", "Resume Parsing", "ATS Engine"],
    metrics: [
      { label: "Applications Processed", value: "250,000+" },
      { label: "Time-to-Hire", value: "14 Days Avg" },
      { label: "Resume Parsing Accuracy", value: "98.4%" },
      { label: "Partner Companies", value: "1,200+ Orgs" }
    ],
    challenge: "Traditional job portals are plagued by outdated listings, spam applications, and slow recruiter response times. Candidates spend hours re-typing their resumes across countless external career sites, leading to an 80% application drop-off rate.",
    solution: "Zynocs developed a streamlined marketplace with structured JSON-LD job ingestion, automated resume extraction, and semantic skill matching. Employers receive pre-ranked, scored applicants and can conduct asynchronous video screening and interview scheduling directly in-app.",
    keyFeatures: [
      { title: "1-Click Unified Application", desc: "Candidates apply to hundreds of top corporate openings with a single verified master profile, eliminating repetitive form entries." },
      { title: "AI Resume Parsing & Scoring", desc: "Deep natural language parsing extracts skills, certifications, and career trajectories, auto-matching candidates to ideal roles." },
      { title: "Employer Pipeline Kanban", desc: "Full-featured recruitment Kanban board supporting stage management, team candidate evaluation, and automated email sequences." },
      { title: "Real-Time Application Telemetry", desc: "Candidates receive instant notifications when their resume is reviewed, shortlisted, or scheduled for an interview." }
    ],
    techStack: ["Next.js", "TypeScript", "Python / FastAPI", "ElasticSearch", "PostgreSQL", "Redis", "Tailwind CSS"]
  },
  {
    id: "fintech-nova",
    title: "FinTech Nova",
    subtitle: "High-Throughput Distributed Banking Infrastructure",
    category: "Banking Infrastructure",
    badge: "Enterprise Core",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200&h=800",
    gradient: "from-blue-600 to-indigo-700",
    description: "A complete overhaul of a legacy banking core into a distributed microservices mesh handling 50k transactions per second with sub-millisecond settlement latency.",
    longDescription: "FinTech Nova represents a mission-critical infrastructure transformation executed by Zynocs for an international financial institution. Migrating from an aging monolithic mainframe to an event-driven distributed architecture, Zynocs established real-time ledger settlement, zero-downtime rolling updates, and bank-grade ISO 20022 compliance.",
    tags: ["Core Banking", "Microservices", "50k TPS", "Distributed Ledger"],
    metrics: [
      { label: "Transaction Throughput", value: "50,000 TPS" },
      { label: "Settlement Latency", value: "< 24ms" },
      { label: "Availability Uptime", value: "99.999%" },
      { label: "Infrastructure Cost", value: "-45% Reduction" }
    ],
    challenge: "The client's legacy mainframe struggled with batch processing bottlenecks during peak market open and payroll cycles, resulting in delayed wire settlements and severe scalability ceilings.",
    solution: "Zynocs engineered an event-driven architecture using Apache Kafka, Rust microservices, and Kubernetes clusters across distributed multi-region availability zones with active-active data replication.",
    keyFeatures: [
      { title: "Real-Time Ledger Settlement", desc: "Double-entry cryptographic ledger processing transactions concurrently with immutable audit logs." },
      { title: "Zero-Downtime Migration", desc: "Dual-write synchronization strategy transitioning millions of accounts without a single second of service disruption." },
      { title: "Automated Fraud Detection", desc: "Sub-millisecond inference engine scoring transactions against behavioral fraud models before authorization." },
      { title: "ISO 20022 Compliance", desc: "Full native support for global financial messaging and cross-border instant payment standards." }
    ],
    techStack: ["Rust", "Go", "Apache Kafka", "PostgreSQL", "Kubernetes", "Redis", "AWS US-East & EU-West"]
  },
  {
    id: "healthguard-ai",
    title: "HealthGuard AI",
    subtitle: "Predictive Healthcare & Clinical Decision Support",
    category: "Healthcare Analytics",
    badge: "Predictive Health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=800",
    gradient: "from-emerald-600 to-teal-700",
    description: "Predictive machine learning models for early clinical diagnosis and risk stratification integrated securely into HIPAA-compliant electronic medical record systems.",
    longDescription: "HealthGuard AI is an advanced clinical intelligence system engineered by Zynocs to aid hospital networks in identifying patient deterioration hours before acute crises occur. The platform analyzes continuous vitals, lab results, and patient history to generate actionable bedside alerts.",
    tags: ["Predictive ML", "HIPAA Compliant", "EMR Integration", "Clinical Telemetry"],
    metrics: [
      { label: "Early Sepsis Detection", value: "4.8 Hrs Earlier" },
      { label: "False Positive Rate", value: "-42% Reduction" },
      { label: "Compliance", value: "HIPAA & HITECH" },
      { label: "Beds Monitored", value: "15,000+ ICU Beds" }
    ],
    challenge: "Hospital intensive care units faced alarm fatigue: thousands of generic alerts created desensitization while subtle multi-factor physiological deterioration went unnoticed until critical moments.",
    solution: "Zynocs created an ensemble deep learning pipeline that continuously aggregates streaming HL7 and FHIR telemetry, synthesizing multi-organ trends and providing clinicians with explainable risk factors.",
    keyFeatures: [
      { title: "Predictive ICU Sepsis Alerting", desc: "Early biomarker and hemodynamic trend analysis warning care teams up to 5 hours ahead of septic shock." },
      { title: "FHIR & HL7 Interoperability", desc: "Plug-and-play middleware integrating seamlessly with Epic, Cerner, and legacy hospital EMR databases." },
      { title: "Explainable AI Diagnostics", desc: "Transparent SHAP-based feature importance dashboards explaining exactly why an alert was triggered." },
      { title: "Air-Gapped Privacy Controls", desc: "On-premise edge appliance deployments ensuring patient Protected Health Information (PHI) never leaves hospital firewalls." }
    ],
    techStack: ["Python", "TensorFlow", "React", "FastAPI", "FHIR / HL7", "Docker", "TimescaleDB"]
  },
  {
    id: "nexus-stream",
    title: "Nexus Stream",
    subtitle: "Global Ultra-Low Latency Video Streaming Mesh",
    category: "Media & Broadcast",
    badge: "High Throughput",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=800",
    gradient: "from-orange-500 to-red-600",
    description: "Ultra-low latency global video mesh platform delivering 4K 60FPS broadcasts for international esports championships with instant geo-failover.",
    longDescription: "Nexus Stream is a next-generation video delivery architecture engineered by Zynocs for broadcast media networks and interactive esports platforms. Combining WebRTC edge relay with proprietary adaptive bitrate algorithms, it delivers synchronized video to millions of concurrent viewers with under 500ms latency.",
    tags: ["WebRTC / CDN", "4K 60FPS", "Live Broadcast", "Edge Mesh"],
    metrics: [
      { label: "Glass-to-Glass Latency", value: "< 420 ms" },
      { label: "Concurrent Viewers", value: "2.4M Peak" },
      { label: "Global Edge Nodes", value: "140+ Points of Presence" },
      { label: "Video Quality", value: "4K 60FPS HDR" }
    ],
    challenge: "Traditional HLS/DASH streaming protocols introduce 15 to 30 seconds of lag. In competitive sports and live interactive betting, this delay ruins the live user experience and allows off-screen spoilers.",
    solution: "Zynocs engineered an edge-native WebRTC broadcast mesh. Video ingest transcodes on high-performance GPU instances and fans out across distributed edge PoPs, delivering ultra-low sub-second latency.",
    keyFeatures: [
      { title: "Sub-Second Edge Delivery", desc: "Proprietary WebRTC delivery engine achieving sub-500ms broadcast latency worldwide without sacrificing 4K clarity." },
      { title: "Dynamic Adaptive Bitrate (ABR)", desc: "Per-frame bandwidth estimation switching resolution smoothly without buffering stalls or frame dropping." },
      { title: "Interactive Real-Time Overlays", desc: "Frame-synchronized data streams for live statistics, interactive viewer voting, and real-time betting odds." },
      { title: "Automated Multi-Region Failover", desc: "Zero-loss redundant video ingest pipelines with instantaneous BGP route switching if an edge node degrades." }
    ],
    techStack: ["WebRTC", "Go", "C++ / FFmpeg", "WebSockets", "Edge Compute / Cloudflare Workers", "React"]
  },
  {
    id: "cyber-shield",
    title: "Cyber Shield",
    subtitle: "Autonomous Cloud Defense & Zero-Trust Governance",
    category: "Enterprise Security",
    badge: "Zero-Trust Defense",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200&h=800",
    gradient: "from-purple-600 to-pink-600",
    description: "Zero-trust identity mesh architecture and automated vulnerability detection pipeline safeguarding distributed infrastructure for a global enterprise.",
    longDescription: "Cyber Shield is a comprehensive enterprise cybersecurity control plane engineered by Zynocs. Built for Fortune 500 organizations with multi-cloud environments, it implements continuous identity verification, automated threat hunting, and sovereign compliance auditing.",
    tags: ["Zero Trust", "Automated Defense", "Compliance", "Identity Mesh"],
    metrics: [
      { label: "Mean Time to Detect (MTTD)", value: "< 45 Seconds" },
      { label: "Automated Incident Containment", value: "94% Autonomous" },
      { label: "Protected Endpoints", value: "85,000+ Assets" },
      { label: "Compliance Adherence", value: "100% FedRAMP / SOC2" }
    ],
    challenge: "Modern enterprises operate across hybrid clouds, distributed remote workforces, and thousands of API microservices. Perimeter-based VPN security failed to prevent lateral movement once a single credential was compromised.",
    solution: "Zynocs deployed an identity-aware micro-segmentation mesh. Every service-to-service communication requires mutual TLS, ephemeral cryptographic certificates, and contextual risk analysis.",
    keyFeatures: [
      { title: "Micro-Segmentation Mesh", desc: "Software-defined network policies isolating workloads to prevent lateral movement and unauthorized cross-service queries." },
      { title: "Autonomous SIEM & SOAR", desc: "Automated threat response playbooks isolating infected containers and revoking compromised tokens in seconds." },
      { title: "Ephemeral Credential Vault", desc: "Just-In-Time (JIT) access broker issuing single-use, 15-minute certificates for infrastructure maintenance." },
      { title: "Continuous Compliance Telemetry", desc: "Automated audit log generation proving compliance with SOC 2, ISO 27001, and HIPAA benchmarks." }
    ],
    techStack: ["eBPF", "Kubernetes", "Go", "HashiCorp Vault", "Elasticsearch", "Prometheus", "Terraform"]
  }
];
