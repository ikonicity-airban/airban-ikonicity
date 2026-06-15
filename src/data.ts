import { Project, TimelineItem, SkillCategory, PhilosophyPillar } from './types';

export const portfolioData = {
  name: "Eban Godwin Ikoni",
  brandName: "Airban Ikonicity",
  tagline: "Problem Solver · Systems Builder · AI Engineer",
  email: "ikonicityairban@gmail.com",
  phone: "08169862852",
  github: "https://github.com/ikonicity-airban",
  address: "Nsukka Enugu State",
  
  pullQuote: "A lot of developers don't like to do the muddy stuff — the debugging, the renovation, the extensive research. I do. I only feel comfortable when we're building something.",
  
  aboutNarrative: [
    "I'm a Full-Stack Software Engineer with a foundation in Electronics and Computer Engineering.",
    "I don't specialize in frameworks. I specialize in problems.",
    "My work spans web platforms, mobile applications, cloud infrastructure, AI-powered systems, and automation — whatever the problem demands. I've built products used by 70,000+ people, led engineering teams, and shipped solutions across education, e-commerce, blockchain, and enterprise automation.",
    "I'm drawn to the work most engineers avoid — the deep debugging sessions, the architectural overhauls, the systems that don't have a Stack Overflow answer. That's where the interesting problems live.",
    "Currently building CodeOven Technologies Inc. and Geek Creations, consulting across multiple engineering teams, and taking on select freelance and contract work."
  ],

  philosophyPillars: [
    {
      title: "Depth Over Shortcuts",
      tagline: "─────────────────────",
      description: "Every system has a right foundation. Find it before you build."
    },
    {
      title: "Complexity Is the Job",
      tagline: "─────────────────────",
      description: "If it were easy, it wouldn't need an engineer. Lean in."
    },
    {
      title: "Build to Teach",
      tagline: "─────────────────────",
      description: "The best proof of mastery is being able to transfer it."
    }
  ] as PhilosophyPillar[],

  timelineData: [
    {
      period: "2018 – 2023",
      role: "Electronics & Computer Engineering",
      company: "University of Nigeria, Nsukka"
    },
    {
      period: "2019 – 2022",
      role: "Computer Analyst & Operator",
      company: "Wisdom Internet Services"
    },
    {
      period: "2021",
      role: "First code written",
      company: "C → JavaScript"
    },
    {
      period: "2022",
      role: "Frontend Engineer",
      company: "Automated Cafe (Heartzibah Shop)"
    },
    {
      period: "Early–Late 2023",
      role: "Frontend Engineer",
      company: "Blaitware (RabbAi)"
    },
    {
      period: "2023 – 2024",
      role: "Dev Lead & Software Engineer",
      company: "SOFE Group"
    },
    {
      period: "2024 – now",
      role: "Freelance Software Consultant",
      company: "PWorld Concepts (iCatholic Igbo)"
    },
    {
      period: "2025 – now",
      role: "Freelance Software Engineer",
      company: "The Seventh Legion (Oyadrop, EB Pathway)"
    },
    {
      period: "Ongoing",
      role: "Founder & Lead Engineer",
      company: "Airban Ikonicity (Geek Creations, WhatsApp CRM)"
    }
  ] as TimelineItem[],

  skillsGrouped: [
    {
      category: "LANGUAGES",
      skills: ["TypeScript", "JavaScript", "Python", "Rust", "C#", "Java", "Solidity", "C"]
    },
    {
      category: "FRONTEND",
      skills: ["React", "Next.js", "React Native (Expo)", "Tailwind CSS", "Framer Motion", "Three.js", "Svelte", "HTML", "CSS"]
    },
    {
      category: "BACKEND",
      skills: ["Node.js", "Bun", "Hono", "Express.js", "FastAPI", "NestJS", ".NET"]
    },
    {
      category: "DATABASES",
      skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Supabase"]
    },
    {
      category: "CLOUD & DEVOPS",
      skills: ["Docker", "DigitalOcean", "AWS", "CI/CD Pipelines", "Linux", "Nginx"]
    },
    {
      category: "BLOCKCHAIN & WEB3",
      skills: ["Solidity", "Ethers.js", "ICP (Internet Computer)", "Foundry", "Smart Contracts"]
    },
    {
      category: "AI & AUTOMATION",
      skills: ["AI Agent Systems", "LLM Integration", "Workflow Automation", "WhatsApp Automation (Baileys + Meta API)", "Telegram Bots"]
    },
    {
      category: "TOOLS & PLATFORMS",
      skills: ["Git", "GitHub", "Shopify Storefront API", "Paystack", "Google Maps API", "Figma", "Postman", "VS Code"]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "geek-creations",
      title: "Geek Creations",
      subtitle: "Nigerian Print-on-Demand platform with global reach.",
      tag: "Founder · Full-Stack · E-Commerce",
      description: "A Shopify-powered customization platform that lets users design and order branded merchandise — apparel, cups, caps, and more — through an online editor. Accepts fiat, card, and cryptocurrency payments, enabling both local delivery across Nigeria and international orders.",
      status: "🟡 Active Development (Phase 2)",
      logoText: "GC",
      tech: ["React", "Shopify Storefront API", "Crypto Payments"],
      links: [
        { label: "Live Site", url: "#" },
        { label: "Case Study", url: "#" }
      ],
      meta: "TX_RATE: 1.8s // GLOBAL_DELIVERY: ENABLED"
    },
    {
      id: "icatholic-igbo",
      title: "iCatholic Igbo",
      subtitle: "Catholic missal and media platform. App Store + Play Store.",
      tag: "Contributor · React Native · 70,000+ Users",
      description: "Catholic missal and Igbo liturgy media platform serving global users. Responsible for extensive database optimizations, offline audio playback components, and refactoring a large untyped codebase.",
      status: "🟢 Live",
      logoText: "IC",
      tech: ["React Native (Expo)"],
      links: [
        { label: "App Store", url: "#" },
        { label: "Play Store", url: "#" }
      ],
      meta: "DL_COUNT: 70K+ // UPTIME: 99.99%"
    },
    {
      id: "biddo",
      title: "Biddo",
      subtitle: "Live property auction with heatmaps and real-time buyer-seller communication.",
      tag: "Full-Stack · Real-Time · Auction Platform",
      description: "A real-time property auction platform with live tracking, heatmaps, and bidder communication, optimized to solve severe memory leaks in Dockerized Express & Next.js instances.",
      status: "🟢 Live",
      logoText: "BD",
      tech: ["Next.js", "Express.js", "Docker", "DigitalOcean"],
      links: [
        { label: "Web App", url: "#" },
        { label: "App Platform", url: "#" }
      ],
      meta: "REAL_TIME: active // DB_LATENCY: 12ms"
    },
    {
      id: "rabbai",
      title: "RabbAi",
      subtitle: "AI-powered exam preparation suite.",
      tag: "Frontend Engineer · AI & Cognitive Design",
      description: "AI exam prep platform targeting WAEC, NECO, and JAMB students, designed around highly performant custom retrieval context pipelines.",
      status: "🟢 Live",
      logoText: "RA",
      tech: ["React", "FastAPI", "Docker"],
      links: [
        { label: "Project Brief", url: "#" }
      ],
      meta: "AI_LATENCY: 145ms"
    },
    {
      id: "whatsapp-crm",
      title: "WhatsApp CRM",
      subtitle: "Automation and workflow optimization SaaS.",
      tag: "Founder · Lead Engineer · Automation",
      description: "Automation workflow engine linking headless WhatsApp container nodes with local CRM dispatch routines using Baileys and Meta API.",
      status: "🟡 Active Development (Phase 2)",
      logoText: "WA",
      tech: ["Baileys", "Meta API", "Node.js"],
      links: [
        { label: "Demo Video", url: "#" }
      ],
      meta: "DISPATCHES: 15K/day"
    },
    {
      id: "sofe-platform",
      title: "SOFE Platform",
      subtitle: "Blockchain organization and core platform site.",
      tag: "Dev Lead & Software Engineer · Web3",
      description: "Decentralized ecosystem home and Telegram bot integrations powering blockchain automated transactions.",
      status: "🟢 Live",
      logoText: "SF",
      tech: ["Next.js", "sofegroup.com"],
      links: [
        { label: "Live Site", url: "https://sofegroup.com" }
      ],
      meta: "DOMAIN: sofegroup.com"
    },
    {
      id: "oyadrop",
      title: "Oyadrop",
      subtitle: "Autonomous shipping and routing pipeline.",
      tag: "Freelance Software Engineer · Logistics",
      description: "Optimized shipping platform integrating local maps routing with secure Paystack billing flows.",
      status: "🟢 Live",
      logoText: "OY",
      tech: ["React", "Google Maps", "Paystack"],
      links: [
        { label: "Deployment", url: "#" }
      ],
      meta: "LATENCY: 54ms // GPS: LOCKED"
    },
    {
      id: "eb-pathway",
      title: "EB Pathway",
      subtitle: "Immigration automation and role-based workflows.",
      tag: "Freelance Software Engineer · SaaS",
      description: "Strict role-based file-processing engine with document compiler microservices.",
      status: "🟢 Live",
      logoText: "EB",
      tech: ["Full-Stack", "Role-based workflows"],
      links: [
        { label: "Internal Deck", url: "#" }
      ],
      meta: "WORKFLOWS: STRICT"
    }
  ] as Project[],

  certifications: [
    {
      title: "Google Professional Data Architect & AI Engineering Specialty",
      issuer: "Google Coursera",
      year: "2024",
      iconType: "google"
    },
    {
      title: "Google Advanced Systems & Security Protocols",
      issuer: "Google Coursera",
      year: "2023",
      iconType: "google"
    },
    {
      title: "Full-Stack Applied Software Engineering Career Path",
      issuer: "FreeCodeCamp",
      year: "2022",
      iconType: "free"
    },
    {
      title: "Advanced Systems Automation & Microservices API Design",
      issuer: "Codecademy",
      year: "2022",
      iconType: "code"
    },
    {
      title: "Blockchain Architecture & Smart Contract Engineering",
      issuer: "Sololearn Developer Academy",
      year: "2021",
      iconType: "solo"
    }
  ]
};
