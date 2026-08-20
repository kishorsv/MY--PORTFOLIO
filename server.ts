import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini initialization with user agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Contact Form submission API
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  // Log contact message safely on server
  console.log(`[Contact Message Received] From: ${name} (${email}) | Subject: ${subject || 'General Inquiry'}`);
  console.log(`Message: ${message}`);

  res.json({
    success: true,
    message: "Thank you! Your message has been received. Kishor will get back to you shortly.",
  });
});

// AI Recruiter & Visitor Assistant API
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message prompt is required." });
      return;
    }

    const systemInstruction = `You are Kishor S V's official AI Portfolio Assistant. 
Your goal is to represent Kishor S V professionally, accurately, and enthusiastically to recruiters, engineering managers, clients, and developers.

Key Information about Kishor S V:
- **Identity & Role**: Kishor S V is an aspiring AI/ML Engineer & Full-Stack Developer passionate about building intelligent, scalable digital experiences.
- **Core Skills**:
  - Programming Languages: Python (Advanced - primary language for AI/ML, backend, algorithms), Java (Core OOP fundamentals), JavaScript (Web scripting).
  - AI/ML: Python, PyTorch, Generative AI (Gemini API, LLMs, RAG, Prompt Engineering, Vector Search), Machine Learning, Computer Vision.
  - Frontend: HTML5, CSS3, Bootstrap Grid System, Responsive Web Design, Java/JS Web Integration.
  - Backend: Python FastAPI, Node.js, Express, RESTful APIs, JWT Auth.
  - Databases: SQL (PostgreSQL, MySQL, SQLite, Cloud SQL) — relational database design, complex joins, indexing, and ACID transactions. (No MongoDB).
  - Cloud Platforms & Tools: AWS (EC2, S3, Lambda), Cloud Hosting & Deployment, Git & GitHub.
- **Featured Projects**:
  1. AI Health Assistant: AI-powered symptom information triage & wellness guide (educational/informational only).
  2. AI Fitness Platform: Adaptive workout planner, progressive overload tracker & nutrition coach.
  3. AI Government Assistant: Civic portal simplifying public schemes, eligibility criteria & paperwork.
  4. AI Chat Application: Real-time streaming conversational workspace with syntax highlighting & prompt personas.
  5. BMW Interactive Car Showroom: Luxury 360-degree automotive showcase with custom configurators and audio simulation.
  6. Multimodal AI Vision Analyzer: Document OCR and visual entity segmentation.
- **Education**: Bachelor of Engineering / Technology in Artificial Intelligence & Machine Learning (2022 - 2026).
- **Socials & Contact**:
  - GitHub: https://github.com/kishorsv
  - LinkedIn: https://www.linkedin.com/in/kishor-s-v
  - X/Twitter: https://x.com/__kishuuu__10
  - Email: kishukishorsv123@gmail.com
  - Portfolio: https://kishorsv.lovable.app

Tone: Professional, articulate, polite, confident, and developer-friendly. Always format replies with clear Markdown bullet points when appropriate.`;

    if (!process.env.GEMINI_API_KEY) {
      // Graceful response if API key is not configured in local environment
      res.json({
        reply: `Hello! I am Kishor S V's portfolio assistant. Kishor is an AI/ML and Web Developer with advanced expertise in Python, Generative AI (Gemini API), HTML5, CSS3, Bootstrap grid layouts, Java, and SQL databases. Feel free to explore his featured projects like the AI Health Assistant, BMW Showroom, and AI Fitness Platform, or reach out directly at kishukishorsv123@gmail.com!`,
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "I'd be glad to share more details about Kishor's engineering background and projects!",
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      error: "Unable to generate AI response currently.",
      fallback: "Kishor S V is an AI/ML Engineer & Full-Stack Developer specializing in Generative AI, React, Node.js, and Python. Contact him directly at kishukishorsv123@gmail.com.",
    });
  }
});

// GitHub proxy endpoint
app.get("/api/github-profile", async (_req, res) => {
  try {
    const [userRes, reposRes, contribRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/kishorsv", {
        headers: { "User-Agent": "Portfolio-App" },
      }),
      fetch("https://api.github.com/users/kishorsv/repos?per_page=100&sort=updated", {
        headers: { "User-Agent": "Portfolio-App" },
      }),
      fetch("https://github-contributions-api.jogruber.de/v4/kishorsv", {
        headers: { "User-Agent": "Portfolio-App" },
      }),
    ]);

    let userData: any = null;
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      userData = await userRes.value.json();
    }

    let reposData: any[] = [];
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      reposData = await reposRes.value.json();
    }

    let totalStars = 0;
    if (Array.isArray(reposData)) {
      totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    }

    let totalContributions = 15;
    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      try {
        const contribJson: any = await contribRes.value.json();
        if (contribJson && contribJson.total) {
          const totalVals: (string | number)[] = Object.values(contribJson.total);
          let sum = 0;
          for (const val of totalVals) {
            sum += Number(val) || 0;
          }
          totalContributions = sum;
        }
      } catch (e) {
        console.error("Error parsing contribution json", e);
      }
    }

    const realRepos = Array.isArray(reposData)
      ? reposData.map((r: any) => ({
          name: r.name,
          description: r.description || "Public repository for engineering and project experimentation.",
          language: r.language || "Python",
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          url: r.html_url || `https://github.com/kishorsv/${r.name}`,
          topics: r.topics && r.topics.length ? r.topics : ["open-source", "web", "python"],
        }))
      : [];

    res.json({
      success: true,
      data: {
        username: userData?.login || "kishorsv",
        publicRepos: userData?.public_repos ?? reposData.length ?? 3,
        followers: userData?.followers ?? 3,
        following: userData?.following ?? 5,
        totalStars: totalStars > 0 ? totalStars : 1,
        totalContributions: totalContributions || 15,
        repos: realRepos,
      },
    });
  } catch (error) {
    console.error("GitHub fetch error:", error);
    res.json({
      success: false,
      data: {
        username: "kishorsv",
        publicRepos: 3,
        followers: 3,
        following: 5,
        totalStars: 1,
        totalContributions: 15,
      },
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
