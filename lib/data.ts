export type ProjectMockup =
  | "orbit-mart"
  | "procalyx"
  | "pcmc"
  | "mla"
  | "surplus";

export type ProjectLink = {
  live?: string;
  repo?: string;
};

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  outcomes: string[];
  links: ProjectLink;
  mockup: ProjectMockup;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "orbit-mart",
    index: "01",
    name: "Orbit Mart",
    tagline: "A commerce ecosystem, not just a storefront.",
    description:
      "An e-commerce ecosystem spanning merchant, admin, and customer-facing applications. Built around reusable UI architecture, complex data workflows, and interfaces that stay fast under heavy datasets.",
    role: "Full-Stack Development · Frontend Architecture",
    stack: [
      "React",
      "Redux Toolkit",
      "Material UI",
      "Tailwind CSS",
      "Syncfusion DataGrid",
    ],
    highlights: [
      "Multi-application architecture for merchants, admins, and shoppers",
      "Data-dense operational screens built on Syncfusion DataGrid",
      "Reusable component system shared across application panels",
      "Merchant workflows from catalogue management to order pipelines",
    ],
    outcomes: [
      "Delivered three distinct application panels — merchant, admin, and customer — as a unified product from a shared component foundation",
      "Designed the reusable UI library that is shared across all three application surfaces, reducing duplication and ensuring visual consistency",
      "Implemented high-performance data-dense tables for order and inventory management using Syncfusion DataGrid",
      "Architected state management with Redux Toolkit to support complex multi-step merchant workflows",
    ],
    links: {},
    mockup: "orbit-mart",
    accent: "#8f7cff",
  },
  {
    id: "procalyx",
    index: "02",
    name: "Procalyx",
    tagline: "Engineering faster with AI as a collaborator.",
    description:
      "An AI-assisted development environment focused on real shipping workflows: turning an idea into an implemented, reviewed, and iterated feature. Built to keep engineers in control of architecture while accelerating the loop.",
    role: "AI-Assisted Development · Product Engineering",
    stack: ["Next.js", "TypeScript", "Node.js", "AI Workflows", "REST APIs"],
    highlights: [
      "AI-assisted feature implementation and rapid iteration",
      "Structured ship-feature workflows from prompt to review",
      "Context-aware assistance across the codebase",
      "Measurable lift in day-to-day development productivity",
    ],
    outcomes: [
      "Engineered AI-assisted workflows that integrate directly into the feature development cycle — from specification through implementation and review",
      "Built structured prompt-to-code pipelines that maintain engineering rigor while compressing iteration time",
      "Implemented context-aware tooling that understands codebase conventions and generates consistent, reviewable output",
      "Contributed to measurable productivity improvements in day-to-day feature delivery",
    ],
    links: {},
    mockup: "procalyx",
    accent: "#64e3ff",
  },
  {
    id: "pcmc",
    index: "03",
    name: "Pimpri Chinchwad Municipal Corporation",
    tagline: "Public infrastructure, built for everyone.",
    description:
      "An enterprise, public-sector web platform developed with Next.js. The focus was a maintainable frontend architecture and responsive, accessible interfaces for citizens accessing essential municipal services.",
    role: "Frontend Architecture · Next.js Development",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    highlights: [
      "Scalable frontend architecture for a large public-sector platform",
      "Responsive service discovery across mobile and desktop",
      "Maintainable, component-driven implementation",
      "Clear information hierarchy for high-volume civic content",
    ],
    outcomes: [
      "Delivered a scalable Next.js frontend architecture for a public-sector platform serving a high volume of citizen users",
      "Implemented responsive, accessible interfaces that work across mobile and desktop for service discovery and navigation",
      "Built a component-driven codebase structured for long-term maintainability by a broader engineering team",
      "Established clear information hierarchy and navigation patterns for complex civic content and service categories",
    ],
    links: {},
    mockup: "pcmc",
    accent: "#5c8dff",
  },
  {
    id: "mla",
    index: "04",
    name: "MLA Management Application",
    tagline: "Operational clarity for constituency work.",
    description:
      "A management-focused application that brings data-driven interfaces and structured workflows to constituency operations. Designed for teams that need to move quickly through large volumes of requests and records.",
    role: "Full-Stack Development · Data Interfaces",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Data-driven dashboards for constituency operations",
      "Structured application workflows for request tracking",
      "Readable, high-density records and status interfaces",
      "Role-aware access to operational data",
    ],
    outcomes: [
      "Built the full-stack system — React frontend, Node.js/Express API, and MongoDB data layer — as an end-to-end delivery",
      "Designed data-driven dashboards that surface actionable constituency information for operational teams",
      "Implemented structured workflows for request intake, tracking, and status updates across the team",
      "Engineered role-aware access controls to ensure appropriate data visibility for different user types",
    ],
    links: {},
    mockup: "mla",
    accent: "#f0b46a",
  },
  {
    id: "surplus-finance",
    index: "05",
    name: "Surplus Finance",
    tagline: "The backend layer that money depends on.",
    description:
      "A backend engineering project centered on Node.js services, API design, and database integration for financial workflows. The emphasis was on predictable contracts, data integrity, and maintainable service boundaries.",
    role: "Backend Engineering · API Architecture",
    stack: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Redis"],
    highlights: [
      "API design with predictable, versioned contracts",
      "Database modeling and integration for financial records",
      "Service boundaries structured for maintainability",
      "Performance-minded data access and caching strategy",
    ],
    outcomes: [
      "Designed and implemented REST APIs with predictable, versioned contracts for financial workflow operations",
      "Built the MongoDB data model and integration layer with a focus on integrity and consistency for financial records",
      "Structured service boundaries to enforce clear separation of concerns and support future scalability",
      "Implemented Redis caching strategy to reduce database load on high-frequency read paths",
    ],
    links: {},
    mockup: "surplus",
    accent: "#6ee7b7",
  },
];

export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that feel fast, clear, and considered.",
    icon: "code",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
      "Material UI",
      "Shadcn UI",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services with clean, predictable contracts.",
    icon: "server",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL"],
  },
  {
    id: "data-cloud",
    title: "Database & Cloud",
    description: "Storage and infrastructure that scale with the product.",
    icon: "database",
    items: [
      "MongoDB",
      "Redis",
      "AWS S3",
      "AWS EC2",
      "AWS Lambda",
      "CloudFront",
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    description: "The daily toolchain behind consistent delivery.",
    icon: "wrench",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "CI/CD",
      "Vercel",
      "AI-Assisted Development",
    ],
  },
] as const;

export const principles = [
  {
    index: "01",
    title: "Scalable application development",
    description:
      "Architectures that hold up when the product, the team, and the traffic grow.",
  },
  {
    index: "02",
    title: "Clean and maintainable code",
    description:
      "Readable modules, clear boundaries, and conventions that make the next change easier.",
  },
  {
    index: "03",
    title: "Intuitive user experiences",
    description:
      "Interfaces that explain themselves and respect the attention of the person using them.",
  },
  {
    index: "04",
    title: "Full-stack architecture",
    description:
      "From component composition to API design and data modeling — designed as one system.",
  },
  {
    index: "05",
    title: "Performance optimization",
    description:
      "Fewer bottlenecks, smaller payloads, and perceived speed treated as a feature.",
  },
  {
    index: "06",
    title: "AI-assisted development",
    description:
      "Using AI to shorten the loop between idea and implementation, without giving up engineering rigor.",
  },
] as const;

export const philosophy = [
  {
    index: "01",
    title: "Architecture before decoration",
    description:
      "I start with the shape of the system: data flow, boundaries, and failure modes. Visual polish matters, but it should sit on top of a structure that can survive change.",
    icon: "layers",
  },
  {
    index: "02",
    title: "Design for the second year",
    description:
      "The first release is the easy part. I optimize for the engineer who inherits the codebase twelve months later — clear names, consistent patterns, and documentation where it counts.",
    icon: "blocks",
  },
  {
    index: "03",
    title: "Performance is a product decision",
    description:
      "Latency changes behavior. I profile before guessing, reduce the critical path, and treat every kilobyte and every render as something with a cost.",
    icon: "gauge",
  },
  {
    index: "04",
    title: "Components are contracts",
    description:
      "A reusable component is an interface. I invest in boundaries, variants, and accessibility so product teams can move quickly without accumulating visual debt.",
    icon: "component",
  },
  {
    index: "05",
    title: "AI as leverage, not autopilot",
    description:
      "AI-assisted development accelerates implementation, exploration, and iteration. The judgment about architecture, trade-offs, and quality stays with the engineer.",
    icon: "sparkles",
  },
] as const;

export const experience = {
  company: "Qloron Technology Pvt. Ltd.",
  role: "Senior MERN Stack Developer",
  focus: "MERN Stack Engineering",
  period: "Dec 2022 — Present",
  location: "Delhi NCR, India",
  summary:
    "Designing and delivering production web applications across React.js, Next.js, Node.js, and NestJS frontends and backend services, with a focus on frontend architecture, reusable component systems, and enterprise delivery.",
  highlights: [
    "Full-stack MERN development across React.js, Next.js, Node.js, Express.js and NestJS",
    "Owned implementation of enterprise workflows, reusable component systems, custom hooks, and Redux Toolkit state management",
    "Improved application loading time by ~20% through Brotli compression with Gzip fallback for application assets",
    "Engineered backend REST APIs, Redis caching, MongoDB aggregation pipelines, and SQL operations",
    "Designed an AI-orchestrated feature-delivery workflow across 30+ Jira tickets with automated Playwright acceptance testing",
    "Conducted pull-request reviews, maintained engineering standards, and formally mentored junior developers",
    "Supported containerized deployment and operations using Docker, AWS, and Nginx",
  ],
  scope: [
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "TypeScript",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
  ],
};

export const education = {
  degree: "Bachelor of Technology",
  field: "Mechanical and Automation Engineering",
  institution: "Dr. Akhilesh Das Gupta Institute of Technology and Management",
  location: "New Delhi, India",
  year: "2017 — 2021",
  hasData: true,
} as const;

export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "MongoDB",
  "GraphQL",
  "AWS",
  "Redis",
  "Tailwind CSS",
  "Docker",
  "TanStack Query",
];
