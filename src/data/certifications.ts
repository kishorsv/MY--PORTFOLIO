import { CertificateItem } from '../types';

export const initialCertificationsData: CertificateItem[] = [
  {
    id: "github-professional",
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "LinkedIn Learning + GitHub",
    issueDate: "February 4, 2026",
    completedDate: "February 4, 2026",
    credentialId: "Not provided",
    category: "GitHub & Development",
    type: "Professional Certificate",
    skills: ["GitHub", "Version Control", "Collaboration", "Development Workflows", "Git Workflows", "Branch Management"],
    description: "Comprehensive professional credential covering collaborative version control, automated development workflows, branch lifecycle management, and repository governance using GitHub.",
    verified: true,
    featured: true,
    accentColor: "#2ea44f",
    image: "/certificates/github-professional.svg",
    createdAt: "2026-02-04"
  },
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    issueDate: "April 2026",
    completedDate: "April 2026",
    credentialId: "Not provided",
    category: "AI & Generative AI",
    type: "Training Certificate",
    skills: ["Generative AI", "Claude", "AI Fundamentals", "Prompt Engineering", "LLM Capabilities"],
    description: "Foundational training in Anthropic's Claude model family, foundational LLM architecture, prompt engineering techniques, and state-of-the-art generative AI systems.",
    verified: true,
    featured: true,
    accentColor: "#d97706",
    image: "/certificates/claude-101.svg",
    createdAt: "2026-04-01"
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic",
    issueDate: "April 2026",
    completedDate: "April 2026",
    credentialId: "Not provided",
    category: "AI & Generative AI",
    type: "Training Certificate",
    skills: ["AI-Powered Coding", "Claude Code", "Developer Productivity", "Automated Refactoring", "Agentic Workflows"],
    description: "Advanced training in leveraging Claude Code CLI and agentic programming tools for automated codebase refactoring, terminal scripting, and developer productivity acceleration.",
    verified: true,
    featured: true,
    accentColor: "#f59e0b",
    image: "/certificates/claude-code-101.svg",
    createdAt: "2026-04-10"
  },
  {
    id: "claude-cowork",
    title: "Introduction to Claude Cowork",
    issuer: "Anthropic",
    issueDate: "April 22, 2026",
    completedDate: "April 22, 2026",
    credentialId: "Not provided",
    category: "AI & Generative AI",
    type: "Training Certificate",
    skills: ["Claude Cowork", "AI Productivity", "Generative AI", "Real-time Collaboration", "Workflow Automation"],
    description: "Applied coursework in collaborative AI frameworks, interactive workspace co-working, and automated enterprise productivity using Claude AI systems.",
    verified: true,
    featured: true,
    accentColor: "#b45309",
    image: "/certificates/claude-cowork.svg",
    createdAt: "2026-04-22"
  },
  {
    id: "kaggle-community",
    title: "Kaggle Community Member",
    issuer: "Kaggle",
    issueDate: "May 15, 2020",
    completedDate: "May 15, 2020",
    credentialId: "Not provided",
    category: "Data Science",
    type: "Community Achievement / Badge",
    recognition: "Kaggle Community Member",
    skills: ["Data Science & ML Community", "Kaggle Competitions", "Python Pipelines", "Open Data Exploration"],
    description: "Official community recognition and badge for active participation in machine learning competitions, open data analysis, notebook development, and community data science sharing.",
    verified: true,
    featured: false,
    accentColor: "#20beff",
    image: "/certificates/kaggle-community.svg",
    createdAt: "2020-05-15"
  },
  {
    id: "nxtwave-static-website",
    title: "Build Your Own Static Website",
    issuer: "NxtWave / CCBP 4.0 Academy",
    issueDate: "August 4, 2026",
    completedDate: "August 4, 2026",
    credentialId: "Not provided",
    category: "Web Development",
    type: "Course Completion Certificate",
    skills: ["HTML", "CSS", "Bootstrap", "Responsive Layouts"],
    description: "Hands-on certification verifying end-to-end building and deployment of static websites utilizing semantic HTML5, CSS3, and Bootstrap UI component systems.",
    verified: true,
    featured: true,
    accentColor: "#0284c7",
    image: "/certificates/nxtwave-static-website.svg",
    createdAt: "2026-08-04"
  },
  {
    id: "nxtwave-responsive-website",
    title: "Build Your Own Responsive Website",
    issuer: "NxtWave / CCBP 4.0 Academy",
    issueDate: "August 5, 2026",
    completedDate: "August 5, 2026",
    credentialId: "Not provided",
    category: "Web Development",
    type: "Course Completion Certificate",
    skills: ["Bootstrap", "Flexbox", "Responsive Web Design", "Media Queries"],
    description: "Specialized certification in engineering responsive, multi-breakpoint web interfaces using Bootstrap 12-column grid system, CSS Flexbox, and mobile-first architectural principles.",
    verified: true,
    featured: true,
    accentColor: "#2563eb",
    image: "/certificates/nxtwave-responsive-website.svg",
    createdAt: "2026-08-05"
  },
  {
    id: "microsoft-data-analysis",
    title: "Career Essentials in Data Analysis by Microsoft and LinkedIn",
    issuer: "Microsoft + LinkedIn",
    issueDate: "February 2026",
    completedDate: "February 2026",
    credentialId: "Not provided",
    category: "Data Analysis",
    type: "Professional Certificate",
    skills: ["Data Analysis", "Microsoft Tools", "Data Literacy", "Statistical Reasoning", "Data Visualizations"],
    description: "Industry-standard career essentials professional certificate validating data literacy, analytical data modeling, business intelligence interpretation, and spreadsheet analytics.",
    verified: true,
    featured: true,
    accentColor: "#00a4ef",
    image: "/certificates/microsoft-data-analysis.svg",
    createdAt: "2026-02-01"
  }
];

export const CERTIFICATIONS_STORAGE_KEY = 'kishor_portfolio_certifications_v1';

export const loadStoredCertifications = (): CertificateItem[] => {
  try {
    const saved = localStorage.getItem(CERTIFICATIONS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored certifications:', e);
  }
  return initialCertificationsData;
};

export const saveStoredCertifications = (certs: CertificateItem[]): void => {
  try {
    localStorage.setItem(CERTIFICATIONS_STORAGE_KEY, JSON.stringify(certs));
  } catch (e) {
    console.error('Error saving certifications:', e);
  }
};

export const certificationsData = initialCertificationsData;


