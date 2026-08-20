export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  portfolio: string;
  email: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface ProfileData {
  name: string;
  titles: string[];
  headline: string;
  bio: string;
  location: string;
  socials: SocialLinks;
  resumeUrl: string;
  stats: StatItem[];
  aboutAreas: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: {
    name: string;
    icon: string;
    description: string;
    level?: string;
  }[];
}

export type ProjectCategory = 'All' | 'AI' | 'ML' | 'Web' | 'Full Stack' | 'Other';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI' | 'ML' | 'Web' | 'Full Stack' | 'Other';
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  screenshots?: string[];
  challenges?: string;
  futureImprovements?: string[];
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  roleOrContext: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  college: string;
  specialization: string;
  startYear: string;
  graduationYear: string;
  location?: string;
  gradeOrGpa?: string;
  coursework: string[];
  highlights?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  image: string;
  category: 'AI' | 'Machine Learning' | 'Development' | 'Cloud' | 'Git/GitHub' | 'Data' | 'Other';
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Coding' | 'Project' | 'Award' | 'Community' | 'Sports';
  date: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface GithubRepoItem {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export interface GithubStatsData {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalContributions: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  featuredRepos: GithubRepoItem[];
}
