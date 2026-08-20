import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming Languages",
    icon: "Code2",
    skills: [
      {
        name: "Python",
        icon: "Terminal",
        description: "Primary language for AI/ML, data pipelines, PyTorch, NumPy, Pandas, FastAPI, and scripting.",
        level: "Advanced"
      },
      {
        name: "Java",
        icon: "Coffee",
        description: "Object-oriented software architecture, core DSA, backend systems, and enterprise design patterns.",
        level: "Proficient"
      },
      {
        name: "JavaScript / TypeScript",
        icon: "FileCode",
        description: "Modern ES6+, type-safe application logic, asynchronous runtime, and full-stack integration.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: "Brain",
    skills: [
      {
        name: "Artificial Intelligence",
        icon: "Cpu",
        description: "Intelligent search, heuristics, state machines, automated decision-making engines.",
        level: "Specialist"
      },
      {
        name: "Machine Learning",
        icon: "Network",
        description: "Supervised/unsupervised learning, scikit-learn, regression, clustering, neural networks.",
        level: "Specialist"
      },
      {
        name: "Generative AI & LLMs",
        icon: "Sparkles",
        description: "Gemini API, OpenAI SDK, multimodal reasoning, vision and speech pipelines, agent orchestration.",
        level: "Advanced"
      },
      {
        name: "AI APIs & Tool Integration",
        icon: "Workflow",
        description: "Function calling, embeddings, semantic search, RAG, vector retrieval, and structured JSON output.",
        level: "Advanced"
      },
      {
        name: "Prompt Engineering",
        icon: "MessageSquareCode",
        description: "Few-shot prompting, system steering, reasoning trace design, chain-of-thought, hallucination reduction.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "Layout",
    skills: [
      {
        name: "React",
        icon: "Atom",
        description: "Modern component architecture, custom hooks, state management, memoization, and SSR/CSR.",
        level: "Advanced"
      },
      {
        name: "Tailwind CSS",
        icon: "Palette",
        description: "Utility-first responsive layouts, dynamic theme variables, dark mode styling, and design systems.",
        level: "Advanced"
      },
      {
        name: "HTML5 & Semantic Markup",
        icon: "Globe",
        description: "Accessible WCAG AA standards, structured SEO data, SEO-friendly layout hierarchy, and canvas API.",
        level: "Advanced"
      },
      {
        name: "CSS3 & Animations",
        icon: "Flame",
        description: "Hardware-accelerated transforms, Framer Motion integration, glassmorphism, responsive grid & flexbox.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "Server",
    skills: [
      {
        name: "Node.js & Express",
        icon: "ServerCog",
        description: "High-throughput asynchronous servers, middleware pipelines, error handlers, and RESTful routing.",
        level: "Advanced"
      },
      {
        name: "RESTful APIs",
        icon: "Network",
        description: "Clean endpoint contracts, status codes, query filtering, rate limiting, and webhook dispatch.",
        level: "Advanced"
      },
      {
        name: "Authentication & Security",
        icon: "ShieldCheck",
        description: "JWT, OAuth 2.0 flows, session cookies, bcrypt password hashing, CORS policies, and CSRF protection.",
        level: "Proficient"
      },
      {
        name: "Database Integration",
        icon: "Database",
        description: "ORM/ODM modeling (Mongoose, Prisma, Drizzle), connection pooling, data sanitation, and indexing.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "databases",
    name: "Databases & Storage",
    icon: "DatabaseZap",
    skills: [
      {
        name: "MongoDB",
        icon: "Leaf",
        description: "Document schema modeling, aggregation pipelines, replica indexing, and Atlas cloud deployment.",
        level: "Advanced"
      },
      {
        name: "SQL (PostgreSQL / MySQL)",
        icon: "Table2",
        description: "Relational database schema normalization, complex joins, indexing, query optimization, and transactions.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    icon: "CloudLightning",
    skills: [
      {
        name: "AWS",
        icon: "Cloud",
        description: "EC2 instances, S3 storage buckets, Lambda serverless functions, and CloudWatch logging.",
        level: "Proficient"
      },
      {
        name: "Docker",
        icon: "Box",
        description: "Containerization, multi-stage Dockerfiles, microservice isolation, and container runtime orchestration.",
        level: "Proficient"
      },
      {
        name: "Git & GitHub",
        icon: "GitBranch",
        description: "Branching strategies, pull request reviews, rebase workflows, semantic versioning, and open-source hygiene.",
        level: "Advanced"
      },
      {
        name: "CI/CD & GitHub Actions",
        icon: "Cog",
        description: "Automated test suites, continuous deployment triggers, linting matrix, and Docker build workflows.",
        level: "Proficient"
      }
    ]
  }
];
