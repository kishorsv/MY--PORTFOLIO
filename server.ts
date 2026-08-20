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
  - AI/ML: Python, PyTorch, Generative AI (Gemini API, LLMs, RAG, Prompt Engineering, Vector Search), Machine Learning, Computer Vision.
  - Frontend: React 19, TypeScript, Tailwind CSS, modern responsive UI, Framer Motion.
  - Backend: Node.js, Express, RESTful APIs, JWT Auth, FastAPI.
  - Databases: MongoDB, SQL (PostgreSQL, MySQL).
  - Cloud/DevOps: AWS (EC2, S3, Lambda), Docker, Git, GitHub Actions CI/CD.
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
        reply: `Hello! I am Kishor S V's portfolio assistant. Kishor is an AI/ML Engineer & Full-Stack Developer specializing in Python, React, Generative AI (Gemini API), Node.js, and cloud systems. Feel free to explore his featured projects like the AI Health Assistant, BMW Showroom, and AI Fitness Platform, or reach out directly at kishukishorsv123@gmail.com!`,
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
    const userRes = await fetch("https://api.github.com/users/kishorsv", {
      headers: { "User-Agent": "Portfolio-App" },
    });
    if (userRes.ok) {
      const data = await userRes.json();
      res.json({ success: true, data });
      return;
    }
    res.json({ success: false, message: "GitHub rate limit or user not found" });
  } catch {
    res.json({ success: false, message: "Network error fetching GitHub data" });
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
