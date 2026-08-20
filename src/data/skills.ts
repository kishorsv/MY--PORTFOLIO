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
        description: "Primary advanced programming language for AI/ML engineering, PyTorch, data science pipelines, FastAPI, algorithms, and backend scripting.",
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
        name: "HTML & HTML5",
        icon: "Globe",
        description: "Semantic web markup, accessible structure, forms, SEO-friendly layout hierarchy, and modern web standards.",
        level: "Advanced"
      },
      {
        name: "CSS & CSS3",
        icon: "Flame",
        description: "Responsive layouts, Flexbox, CSS variables, transitions, animations, media queries, and dark mode themes.",
        level: "Advanced"
      },
      {
        name: "Bootstrap & Grid System",
        icon: "Layers",
        description: "12-column responsive grid layout system, breakpoint management, responsive containers, flex utilities, and UI components.",
        level: "Advanced"
      },
      {
        name: "Responsive Web UI",
        icon: "Layout",
        description: "Mobile-first layouts, cross-browser compatibility, modern UI components, and accessible user interfaces.",
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
        name: "Python FastAPI & Backend Services",
        icon: "ServerCog",
        description: "High-throughput asynchronous APIs, endpoint routing, middleware pipelines, and controller architectures.",
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
        description: "JWT, OAuth 2.0 flows, session cookies, password hashing, CORS policies, and secure API keys.",
        level: "Proficient"
      },
      {
        name: "SQL Database Integration",
        icon: "Database",
        description: "Relational ORM/SQL modeling, connection pooling, query optimization, data validation, and migrations.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "databases",
    name: "Databases & SQL",
    icon: "DatabaseZap",
    skills: [
      {
        name: "SQL (PostgreSQL / MySQL)",
        icon: "Table2",
        description: "Relational database schema normalization, complex multi-table joins, indexing, ACID transactions, and query optimization.",
        level: "Advanced"
      },
      {
        name: "Cloud SQL & Database Design",
        icon: "Database",
        description: "Managed cloud relational databases, connection pooling, migrations, data integrity constraints, and query analysis.",
        level: "Advanced"
      },
      {
        name: "SQLite & Relational Storage",
        icon: "FileCode",
        description: "Embedded SQL database engines, relational table queries, transactional persistence, and data modeling.",
        level: "Advanced"
      }
    ]
  },
  {
    id: "cloud-platforms",
    name: "Cloud Platforms & Tools",
    icon: "CloudLightning",
    skills: [
      {
        name: "AWS (Amazon Web Services)",
        icon: "Cloud",
        description: "EC2 compute instances, S3 object storage buckets, Lambda serverless functions, and CloudWatch monitoring.",
        level: "Proficient"
      },
      {
        name: "Cloud Hosting & Deployment",
        icon: "Globe",
        description: "Deploying scalable web applications on modern cloud infrastructure, serverless runtimes, and Cloud Run.",
        level: "Proficient"
      },
      {
        name: "Git & GitHub",
        icon: "GitBranch",
        description: "Version control, branching strategies, collaborative code reviews, rebase workflows, and repository management.",
        level: "Advanced"
      }
    ]
  }
];
