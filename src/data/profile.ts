import { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: "Kishor S V",
  photoUrl: "/kishor-portrait.svg",
  avatarUrl: "/kishor-avatar.svg",
  titles: [
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Generative AI Specialist",
    "Problem Solver"
  ],
  headline: "AI/ML Engineer & Full-Stack Developer",
  bio: "I am an aspiring AI/ML and full-stack developer passionate about building intelligent applications, modern websites, and useful digital products. Driven by curiosity and engineering excellence, I turn complex algorithmic concepts into intuitive, high-performance web applications that create real-world impact.",
  location: "India",
  resumeUrl: "/resume.pdf", // Configurable link to PDF or Google Drive resume
  socials: {
    github: "https://github.com/kishorsv",
    linkedin: "https://www.linkedin.com/in/kishor-s-v",
    twitter: "https://x.com/__kishuuu__10",
    portfolio: "https://kishorsv.lovable.app",
    email: "kishukishorsv123@gmail.com"
  },
  stats: [
    {
      label: "Projects Built",
      value: "15+",
      description: "Full-stack & AI/ML production applications"
    },
    {
      label: "Technologies Mastered",
      value: "20+",
      description: "Frameworks, databases, AI models & cloud tools"
    },
    {
      label: "Certifications",
      value: "8+",
      description: "Verified technical & AI domain credentials"
    },
    {
      label: "GitHub Repos & Contributions",
      value: "120+",
      description: "Active commits, open-source code & repositories"
    }
  ],
  aboutAreas: [
    {
      title: "AI / Machine Learning",
      description: "Architecting custom neural architectures, model fine-tuning, retrieval-augmented generation (RAG), and integrating state-of-the-art vision and language models.",
      icon: "Brain"
    },
    {
      title: "Full-Stack Web Engineering",
      description: "Building responsive, accessible, and reactive frontend experiences with React & Tailwind, paired with robust backend APIs, secure auth, and databases.",
      icon: "Layers"
    },
    {
      title: "Generative AI Solutions",
      description: "Developing production-grade AI agents, workflow automation systems, prompt-engineered pipelines, and multimodal comprehension systems.",
      icon: "Sparkles"
    },
    {
      title: "Cloud & Database Architecture",
      description: "Deploying and managing scalable cloud services on AWS and modern cloud platforms, combined with optimized SQL schema designs and secure cloud endpoints.",
      icon: "Cloud"
    },
    {
      title: "Algorithmic Problem Solving",
      description: "Solid foundation in Data Structures & Algorithms, database indexing, latency optimization, and writing clean, maintainable, self-documenting code.",
      icon: "Code"
    },
    {
      title: "Product & UI Craftsmanship",
      description: "Designing futuristic, accessible developer aesthetics with high-contrast typography, mathematical spacing, smooth 2D animations, and intuitive UX.",
      icon: "Palette"
    }
  ]
};
