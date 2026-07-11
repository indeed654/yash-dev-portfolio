import {
  Bot,
  BrainCircuit,
  CloudCog,
  Code2,
  DatabaseZap,
  FileCheck2,
  GitBranch,
  GraduationCap,
  LockKeyhole,
  Rocket,
  ServerCog,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'

export interface ContactLink {
  label: string
  value: string
  href: string
}

export interface Education {
  degree: string
  institution: string
  years: string
  detail: string
}

export interface Owner {
  name: string
  roles: string[]
  headline: string
  location: string
  education: Education
  email: string
  phone: string
  githubUsername: string
  github: ContactLink
  linkedIn: ContactLink
  resume: {
    ats: string
    recruiter: string
    preview: string
  }
}

export interface SkillCategory {
  title: string
  icon: typeof Code2
  description: string
  skills: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  type: string
  highlights: string[]
}

export interface ProjectCaseStudy {
  title: string
  slug: string
  summary: string
  problem: string
  solution: string
  architecture: string[]
  techStack: string[]
  decisions: string[]
  challenges: string[]
  performance: string[]
  results: string[]
  demo: string
  github: string
}

export const owner: Owner = {
  name: 'Yash Kumar Sharma',
  roles: ['Full-Stack AI Engineer', 'Cybersecurity Developer', 'IoT Systems Builder'],
  headline: 'I build production-ready AI, security, and IoT systems with clean architecture, measurable outcomes, and deployable engineering discipline.',
  location: 'Bulandshahr, Uttar Pradesh, India',
  education: {
    degree: 'B.Tech Computer Science (IoT)',
    institution: 'AKTU',
    years: '2023-2027',
    detail: 'Focused on distributed systems, IoT, cloud engineering, AI workflows, and security fundamentals.',
  },
  email: 'yash1047sharma@gmail.com',
  phone: '+91-7078479889',
  githubUsername: 'indeed654',
  github: {
    label: 'GitHub',
    value: 'github.com/indeed654',
    href: 'https://github.com/indeed654',
  },
  linkedIn: {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yash-sharma-914641326',
    href: 'https://linkedin.com/in/yash-sharma-914641326',
  },
  resume: {
    ats: '/Yash-Kumar-Sharma-ATS-Resume.pdf',
    recruiter: '/Yash-Kumar-Sharma-Recruiter-Resume.pdf',
    preview: '/Yash-Kumar-Sharma-ATS-Resume.pdf',
  },
}

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Resume', href: '#resume' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const engineeringMetrics = [
  { label: 'Production-style projects', value: '12+', detail: 'AI, security, IoT, web' },
  { label: 'Technologies', value: '35+', detail: 'Across frontend, backend, cloud, AI' },
  { label: 'GitHub commits', value: '500+', detail: 'Tracked through live GitHub dashboard' },
  { label: 'DSA problems', value: '250+', detail: 'Arrays, DP, graphs, trees, systems' },
  { label: 'Certifications', value: '6+', detail: 'GenAI, cyber, analytics, productivity' },
  { label: 'Deployments', value: '10+', detail: 'Vercel, Docker, cloud-ready services' },
]

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    title: 'Autonomous Multi-Agent Cyber Defense System',
    slug: 'multi-agent-cyber-defense',
    summary:
      'An AI-assisted cyber defense workflow that combines anomaly detection, CVE intelligence, retrieval, and automated response planning.',
    problem:
      'Security teams need faster triage when alerts, CVE data, and network telemetry arrive faster than a human can correlate them.',
    solution:
      'Built a multi-agent pipeline that classifies signals, retrieves vulnerability context, scores risk, and recommends containment steps for operators.',
    architecture: [
      'Telemetry ingestion layer normalizes events before anomaly scoring.',
      'Isolation Forest flags unusual patterns and routes high-risk events to an LLM agent.',
      'FAISS-backed retrieval grounds recommendations in CVE and internal knowledge sources.',
      'Response planner produces auditable containment actions instead of opaque automation.',
    ],
    techStack: ['Python', 'TensorFlow', 'LangChain', 'FAISS', 'FastAPI', 'Docker'],
    decisions: [
      'Kept human approval in the loop for response execution to reduce false-positive blast radius.',
      'Separated detection, retrieval, and response agents so each module can be tested independently.',
      'Used vector retrieval for threat context because exact keyword search misses CVE phrasing variants.',
    ],
    challenges: [
      'Balancing alert sensitivity with operator trust.',
      'Preventing LLM responses from drifting away from verified CVE context.',
      'Designing explainable outputs for security review.',
    ],
    performance: [
      'Cached embeddings for repeated CVE queries.',
      'Batched telemetry scoring to reduce Python runtime overhead.',
      'Structured agent prompts to keep response tokens compact and consistent.',
    ],
    results: ['Reached 85% detection accuracy in prototype evaluation.', 'Reduced manual triage steps from raw alert review to explainable risk summaries.', 'Created a deployable security workflow recruiters can inspect end to end.'],
    demo: '#contact',
    github: 'https://github.com/indeed654',
  },
  {
    title: 'Smart Home Automation',
    slug: 'smart-home-automation',
    summary:
      'A mobile-controlled IoT automation system with MQTT messaging, Firebase sync, device rules, and voice command support.',
    problem:
      'Home automation projects often work as demos but fail under unreliable networks, device latency, and unclear state synchronization.',
    solution:
      'Designed a device-to-cloud control plane that keeps mobile, Firebase, and ESP32 devices synchronized while supporting automation rules.',
    architecture: [
      'ESP32 devices publish and subscribe through MQTT topics for low-latency commands.',
      'Firebase stores user preferences, automation states, and device metadata.',
      'React Native mobile UI controls devices, reads state, and sends voice-triggered actions.',
      'Rule engine translates schedules and energy preferences into device commands.',
    ],
    techStack: ['ESP32', 'Firebase', 'React Native', 'MQTT', 'Node.js'],
    decisions: [
      'Used MQTT for lightweight device communication instead of polling REST APIs.',
      'Stored desired state separately from reported state to handle offline devices.',
      'Designed automation rules around user intent instead of one-off device toggles.',
    ],
    challenges: [
      'Handling intermittent connectivity without confusing the user.',
      'Keeping command latency low on constrained hardware.',
      'Designing topic naming that can scale beyond one room.',
    ],
    performance: [
      'Reduced chatter by publishing only state diffs.',
      'Debounced repeated mobile commands.',
      'Used Firebase listeners selectively to avoid unnecessary client work.',
    ],
    results: ['Delivered mobile control, voice commands, and energy optimization flows.', 'Built an architecture that can scale from prototype room setup to multi-device deployments.', 'Demonstrated embedded, cloud, and mobile engineering in one system.'],
    demo: '#contact',
    github: 'https://github.com/indeed654',
  },
  {
    title: 'Decentralized IP Registry',
    slug: 'decentralized-ip-registry',
    summary:
      'A blockchain-backed intellectual property registry that stores ownership metadata, smart contract records, and decentralized assets.',
    problem:
      'Creators need tamper-resistant proof of ownership without relying entirely on a centralized database that can be modified or lost.',
    solution:
      'Implemented a Web3 registry that records ownership events on-chain while storing heavier files through IPFS-compatible decentralized storage.',
    architecture: [
      'React frontend guides creators through registration and verification.',
      'Smart contracts store ownership events and immutable metadata references.',
      'IPFS holds asset payloads and returns content-addressed hashes.',
      'Wallet-based authentication keeps ownership actions cryptographically attributable.',
    ],
    techStack: ['Solidity', 'React', 'Web3', 'IPFS', 'Hardhat'],
    decisions: [
      'Stored hashes on-chain instead of files to control gas costs.',
      'Kept contract methods minimal and auditable.',
      'Designed frontend states around wallet connection, transaction pending, and finality.',
    ],
    challenges: [
      'Explaining transaction state clearly to non-Web3 users.',
      'Reducing unnecessary contract writes.',
      'Preserving provenance while keeping the UX practical.',
    ],
    performance: [
      'Moved large payloads off-chain to IPFS.',
      'Used optimistic UI states for transaction submission.',
      'Reduced contract surface area for lower gas and easier auditability.',
    ],
    results: ['Created immutable ownership records and decentralized storage flow.', 'Demonstrated smart contract, frontend, and distributed storage fundamentals.', 'Built a recruiter-readable case study around cost, UX, and trust tradeoffs.'],
    demo: '#contact',
    github: 'https://github.com/indeed654',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI Engineering',
    icon: BrainCircuit,
    description: 'RAG workflows, multi-agent systems, model evaluation, and applied ML pipelines.',
    skills: ['TensorFlow', 'PyTorch', 'LangChain', 'Transformers', 'RAG', 'Vector Search', 'scikit-learn'],
  },
  {
    title: 'Full-Stack Product',
    icon: Code2,
    description: 'Accessible, responsive applications with clean frontend and backend boundaries.',
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Spring Boot', 'REST APIs', 'Tailwind CSS'],
  },
  {
    title: 'Cloud & DevOps',
    icon: CloudCog,
    description: 'Containerized services, deployable environments, and production-minded delivery.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Vercel', 'CI/CD'],
  },
  {
    title: 'Security & Systems',
    icon: ShieldCheck,
    description: 'Threat-aware engineering, secure APIs, anomaly detection, and IoT constraints.',
    skills: ['OWASP', 'IDS/IPS', 'Threat Intelligence', 'Pen Testing', 'MQTT', 'ESP32'],
  },
]

export const experiences: ExperienceItem[] = [
  {
    role: 'Software Developer Intern',
    company: 'AtDrive',
    period: 'Jun 2025 - Aug 2025',
    type: 'Backend + Deployment',
    highlights: [
      'Built backend services using Java and Spring Boot for enterprise application workflows.',
      'Developed REST APIs with validation, clear contracts, and maintainable service boundaries.',
      'Worked with Docker and Kubernetes deployment practices.',
      'Optimized MySQL queries and data access patterns for smoother application performance.',
      'Contributed to applications designed for 10k+ users.',
    ],
  },
  {
    role: 'AI Intern',
    company: 'Exponentia.ai',
    period: 'Jan 2025 - Mar 2025',
    type: 'Applied ML',
    highlights: [
      'Improved AI pipeline reliability through preprocessing, feature engineering, and evaluation loops.',
      'Worked on predictive modeling workflows using Python and scikit-learn.',
      'Prepared structured datasets and documented decisions for reproducible experiments.',
      'Collaborated around model quality, data quality, and practical deployment constraints.',
    ],
  },
]

export const certifications = [
  { title: 'BCG GenAI Job Simulation', issuer: 'Forage', focus: 'GenAI product thinking', icon: Bot },
  { title: 'Deloitte Cyber Simulation', issuer: 'Forage', focus: 'Threat analysis and response', icon: LockKeyhole },
  { title: 'Accenture Data Analytics', issuer: 'Forage', focus: 'Analytics and business storytelling', icon: DatabaseZap },
  { title: 'Data Science Job Simulation', issuer: 'Forage', focus: 'Data preparation and modeling', icon: BrainCircuit },
  { title: 'Data Analytics & Visualization', issuer: 'Industry credential', focus: 'Dashboards and decision support', icon: FileCheck2 },
  { title: 'Microsoft Generative AI Productivity Skills', issuer: 'Microsoft', focus: 'Applied GenAI productivity', icon: Rocket },
]

export const educationTimeline = [
  {
    title: owner.education.degree,
    org: owner.education.institution,
    period: owner.education.years,
    detail: owner.education.detail,
    icon: GraduationCap,
  },
  {
    title: 'Production Engineering Portfolio',
    org: 'Independent build',
    period: '2026',
    detail: 'Next.js App Router, typed content model, GitHub API dashboard, SEO, accessibility, and performance-minded UI.',
    icon: ServerCog,
  },
]

export const achievements = [
  'Built AI, cybersecurity, IoT, blockchain, and full-stack systems that can be explained through architecture and tradeoffs.',
  'Comfortable across backend APIs, frontend UX, cloud deployment, and applied AI workflows.',
  'Targeting 10-25 LPA roles where production ownership, speed of learning, and engineering communication matter.',
]

export const blogPosts = [
  {
    title: 'How I design AI projects so recruiters can evaluate real engineering depth',
    tag: 'AI Engineering',
    readTime: '5 min',
  },
  {
    title: 'What makes an IoT prototype production-minded: state, latency, and failure modes',
    tag: 'IoT',
    readTime: '6 min',
  },
  {
    title: 'Building secure APIs: validation, rate limits, and observability from day one',
    tag: 'Backend',
    readTime: '4 min',
  },
]

export const faqs = [
  {
    question: 'What roles is Yash targeting?',
    answer: 'Full-stack, AI engineering, backend, cybersecurity, and IoT-oriented software roles in the 10-25 LPA range.',
  },
  {
    question: 'What makes these projects different from academic demos?',
    answer: 'Each project is framed around a problem, architecture, engineering decisions, performance constraints, and measurable outcomes.',
  },
  {
    question: 'Is Yash available for internships or full-time opportunities?',
    answer: 'Yes. Use the contact section for recruiter conversations, interviews, referrals, and collaboration requests.',
  },
]

export const stackRibbon = ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Three Fiber', 'Lenis', 'Node.js', 'Python', 'Spring Boot', 'Docker', 'LangChain', 'MQTT']

export const systemHighlights = [
  { label: 'Frontend', value: 'Next.js App Router, accessible components, motion-safe interactions', icon: Smartphone },
  { label: 'Backend', value: 'REST APIs, validation, service boundaries, database optimization', icon: ServerCog },
  { label: 'AI', value: 'RAG, agents, feature pipelines, evaluation-aware delivery', icon: Bot },
  { label: 'Delivery', value: 'Docker, cloud deployment, SEO, observability mindset', icon: GitBranch },
]

export const aboutFocus = ['Artificial Intelligence', 'Cybersecurity', 'Multi-Agent Systems', 'RAG Applications', 'IoT', 'Cloud Computing', 'Blockchain']

export const projects = projectCaseStudies.map((project) => ({
  title: project.title,
  tech: project.techStack,
  features: project.results,
}))
