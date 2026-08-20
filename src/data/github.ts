import { GithubStatsData } from '../types';

export const githubData: GithubStatsData = {
  username: "kishorsv",
  publicRepos: 18,
  followers: 45,
  following: 38,
  totalStars: 56,
  totalContributions: 340,
  topLanguages: [
    { name: "Python", percentage: 55, color: "#3572A5" },
    { name: "HTML & CSS", percentage: 20, color: "#e34c26" },
    { name: "SQL & Cloud", percentage: 15, color: "#336791" },
    { name: "Java", percentage: 10, color: "#b07219" }
  ],
  featuredRepos: [
    {
      name: "ai-health-assistant",
      description: "AI-powered health information triage and wellness assistance platform with safe conversational guidance.",
      language: "Python",
      stars: 24,
      forks: 7,
      url: "https://github.com/kishorsv",
      topics: ["gemini-ai", "fastapi", "python", "health-ai", "sql"]
    },
    {
      name: "ai-fitness-platform",
      description: "Smart workout routine generator, progressive overload analytics, and nutritional macro tracker.",
      language: "Python / Web",
      stars: 18,
      forks: 5,
      url: "https://github.com/kishorsv",
      topics: ["python", "bootstrap", "fitness-app", "sql", "html-css"]
    },
    {
      name: "bmw-car-showroom-interactive",
      description: "Luxury automotive digital dealership with interactive 360-degree color configurator and audio simulator.",
      language: "TypeScript",
      stars: 15,
      forks: 4,
      url: "https://github.com/kishorsv",
      topics: ["react", "tailwind-css", "interactive-ui", "framer-motion"]
    },
    {
      name: "civic-ai-gov-assistant",
      description: "Civic intelligence portal simplifying public welfare schemes, citizen eligibility, and documentation steps.",
      language: "TypeScript",
      stars: 12,
      forks: 3,
      url: "https://github.com/kishorsv",
      topics: ["civic-tech", "gemini-api", "full-stack", "react"]
    }
  ]
};
