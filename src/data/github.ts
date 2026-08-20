import { GithubStatsData } from '../types';

export const githubData: GithubStatsData = {
  username: "kishorsv",
  publicRepos: 3,
  followers: 3,
  following: 5,
  totalStars: 1,
  totalContributions: 15,
  topLanguages: [
    { name: "Python", percentage: 55, color: "#3572A5" },
    { name: "HTML & CSS", percentage: 20, color: "#e34c26" },
    { name: "SQL & Cloud", percentage: 15, color: "#336791" },
    { name: "Java", percentage: 10, color: "#b07219" }
  ],
  featuredRepos: [
    {
      name: "MY--PORTFOLIO",
      description: "Personal AI & Full-Stack developer portfolio showcasing interactive 3D motion, live GitHub sync, and projects.",
      language: "TypeScript",
      stars: 1,
      forks: 0,
      url: "https://github.com/kishorsv/MY--PORTFOLIO",
      topics: ["portfolio", "react", "python", "full-stack", "sql"]
    },
    {
      name: "next-platform-starter",
      description: "Starter architecture for scalable web platform development with modern responsive layouts and cloud endpoints.",
      language: "JavaScript",
      stars: 1,
      forks: 0,
      url: "https://github.com/kishorsv/next-platform-starter",
      topics: ["web", "bootstrap", "javascript", "full-stack"]
    },
    {
      name: "ai-health-assistant",
      description: "AI-powered health information triage and wellness assistance platform with safe conversational guidance.",
      language: "Python",
      stars: 1,
      forks: 0,
      url: "https://github.com/kishorsv",
      topics: ["gemini-ai", "fastapi", "python", "health-ai", "sql"]
    },
    {
      name: "ai-fitness-platform",
      description: "Smart workout routine generator, progressive overload analytics, and nutritional macro tracker.",
      language: "Python",
      stars: 1,
      forks: 0,
      url: "https://github.com/kishorsv",
      topics: ["python", "bootstrap", "fitness-app", "sql", "html-css"]
    }
  ]
};
