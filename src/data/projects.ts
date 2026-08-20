import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: "ai-health-assistant",
    title: "AI Health Assistant",
    tagline: "Intelligent health information, symptom navigation, and personalized wellness guidance platform.",
    description: "An AI-powered health informational portal providing structured symptom triage insights, lifestyle recommendations, and medication reminder alerts. Built with strict medical safety disclaimers for educational and wellness assistance.",
    category: "AI",
    tags: ["React", "Python", "FastAPI", "Gemini API", "Tailwind CSS", "Vector Search"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/kishorsv",
    liveUrl: "https://kishorsv.lovable.app",
    featured: true,
    overview: "AI Health Assistant was engineered to democratize access to easy-to-understand health information. By processing user symptoms through controlled clinical knowledge bases and LLM reasoning, it offers clear, empathetic overviews and guidance on when to seek professional care.",
    problem: "Patients often struggle with anxious, unstructured internet searches that lead to catastrophic misinterpretations. Finding trustworthy, structured, and easy-to-read wellness guidance is time-consuming and stressful.",
    solution: "A responsive web application with a safe conversational engine that breaks down symptom queries into categorized risk assessments, lifestyle suggestions, and recommended questions for doctor consultations.",
    features: [
      "Conversational health query assistant with contextual memory",
      "Categorized triage level recommendations (Mild, Moderate, Seek Urgent Care)",
      "Daily wellness habits and medication scheduling reminders",
      "Interactive body region symptom selector",
      "Exportable doctor appointment discussion checklist"
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "Framer Motion"] },
      { category: "Backend & AI", items: ["FastAPI", "Python", "Google Gemini API", "LangChain", "Pydantic"] },
      { category: "Storage & Infra", items: ["PostgreSQL", "Redis Cache", "Cloud SQL", "AWS EC2"] }
    ],
    challenges: "Enforcing strict guardrails to prevent diagnostic claims or unsafe medical prescriptions while maintaining a natural, helpful, and reassuring conversational tone.",
    futureImprovements: [
      "Voice input/output support for accessibility",
      "Multi-lingual translation for regional healthcare accessibility",
      "Apple Health & Google Fit wearable data sync"
    ]
  },
  {
    id: "ai-fitness-platform",
    title: "AI Fitness Platform",
    tagline: "Dynamic AI-driven workout planner, form analysis insights, and nutritional coaching platform.",
    description: "A comprehensive fitness companion that crafts personalized workout routines, adapts volume based on recovery scores, and tracks caloric goals using intelligent nutritional estimation.",
    category: "AI",
    tags: ["React", "Node.js", "Express", "Computer Vision", "Tailwind CSS", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/kishorsv",
    liveUrl: "https://kishorsv.lovable.app",
    featured: true,
    overview: "An adaptive web application providing real-time workout recommendations, exercise technique explanations, and progressive overload tracking powered by machine learning algorithms.",
    problem: "Generic gym programs fail to adapt to varying user schedules, muscle fatigue, available equipment, and individual physical limitations, leading to stalled progress and workout burnout.",
    solution: "An intelligent fitness engine that recalibrates weekly workout splits on-the-fly based on equipment availability, time constraints, and user exertion feedback.",
    features: [
      "Personalized split generator based on goals (Hypertrophy, Strength, Endurance)",
      "Interactive exercise encyclopedia with muscle group anatomy highlights",
      "Smart meal macro planner and barcode nutritional lookup",
      "Progressive overload dashboard with chart analytics",
      "Recovery tracker calculating estimated muscle readiness"
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"] },
      { category: "Backend", items: ["Node.js", "Express", "JWT Authentication", "REST APIs"] },
      { category: "Database & AI", items: ["PostgreSQL", "Cloud SQL", "Gemini 3.7 Flash API"] }
    ],
    challenges: "Designing an intuitive multi-step workout builder that seamlessly translates complex muscle recovery algorithms into simple, actionable daily routine cards.",
    futureImprovements: [
      "Pose estimation via WebAssembly for real-time rep counting",
      "Community workout challenges and leaderboards"
    ]
  },
  {
    id: "ai-government-assistant",
    title: "AI Government Assistant",
    tagline: "Civic intelligence portal simplifying public schemes, citizen eligibility, and documentation procedures.",
    description: "An intuitive civic portal designed to help citizens easily navigate complex government welfare programs, subsidies, licensing guidelines, and official paperwork requirements with plain-language answers.",
    category: "Full Stack",
    tags: ["Full-Stack", "React", "Node.js", "Gemini AI", "Semantic Search", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/kishorsv",
    liveUrl: "https://kishorsv.lovable.app",
    featured: true,
    overview: "Built to bridge the digital divide between complex bureaucratic documentation and everyday citizens looking to discover applicable benefits and required application steps.",
    problem: "Government portals and official documentation are notoriously difficult to navigate, full of legal jargon, and spread across disparate state and national websites.",
    solution: "A unified AI search and eligibility advisor that ingests public policy guides and returns step-by-step required documents, office locations, and downloadable application templates.",
    features: [
      "Natural language scheme search (e.g., 'subsidies for solar installation' or 'student scholarship criteria')",
      "Instant eligibility questionnaire checker",
      "Document preparation checklist generator",
      "Multi-lingual plain-text summarization of lengthy government gazettes",
      "Offline bookmarking and PDF guidance export"
    ],
    techStack: [
      { category: "Frontend", items: ["React 19", "Tailwind CSS", "Lucide React", "Motion"] },
      { category: "Backend", items: ["Node.js", "Express", "TypeScript", "Gemini AI SDK"] },
      { category: "Database", items: ["PostgreSQL", "Prisma ORM", "pgvector"] }
    ],
    challenges: "Ensuring zero hallucinations on critical legal and policy requirements by cross-referencing user queries with strict source-grounded policy vectors.",
    futureImprovements: [
      "Direct integration with regional DigiLocker verification APIs",
      "Automated SMS/WhatsApp notification delivery for application status"
    ]
  },
  {
    id: "ai-chat-application",
    title: "AI Chat Application",
    tagline: "High-performance multimodal conversational workspace with streaming responses and workspace tools.",
    description: "A modern, developer-centric conversational interface supporting real-time streaming, multimodal image analysis, markdown rendering, syntax highlighting, and custom prompt templates.",
    category: "AI",
    tags: ["React", "TypeScript", "Server-Sent Events", "Tailwind CSS", "Gemini API", "Express"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/kishorsv",
    liveUrl: "https://kishorsv.lovable.app",
    featured: true,
    overview: "An AI conversational playground tailored for software engineers, content creators, and researchers, featuring instant response streaming, workspace organization, and code export.",
    problem: "Many existing chat UIs lack tailored developer ergonomics like instant code copying, side-by-side branch comparison, and custom system prompt switching.",
    solution: "A minimalist, dark-themed reactive client built with React and Express, leveraging Server-Sent Events (SSE) for low-latency streaming and rich syntax formatting.",
    features: [
      "Token-by-token streaming with low latency",
      "Multi-turn conversation history with local persistence",
      "Image and document upload comprehension",
      "Interactive code block execution and one-click copy",
      "Custom system persona library (Code Reviewer, Tutor, Architect)"
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Lucide React", "Framer Motion"] },
      { category: "Backend", items: ["Express", "Node.js", "@google/genai", "SSE Streaming"] },
      { category: "Storage", items: ["IndexedDB", "LocalStorage", "JSON Schemas"] }
    ],
    challenges: "Handling smooth token rendering and layout stability without causing browser re-render bottlenecks during high-speed token output.",
    futureImprovements: [
      "End-to-end voice conversation via Gemini Live API",
      "Web browsing search grounding and auto-citation cards"
    ]
  },
  {
    id: "bmw-car-showroom",
    title: "BMW Interactive Car Showroom",
    tagline: "Luxury interactive automotive showroom web experience with dynamic model visualization.",
    description: "A showcase automotive digital dealership featuring high-fidelity interactive vehicle views, custom color & trim configurators, performance telemetries, and test drive booking flows.",
    category: "Web",
    tags: ["React", "TypeScript", "Tailwind CSS", "Interactive UI", "Framer Motion", "Automotive Design"],
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/kishorsv",
    liveUrl: "https://kishorsv.lovable.app",
    featured: true,
    overview: "Designed to reflect the precision and luxury engineering of BMW vehicles through high-contrast typography, interactive vehicle specs, dynamic paint/wheel customizers, and buttery-smooth micro-interactions.",
    problem: "Automotive websites often suffer from heavy, sluggish loaders or clunky navigation that disconnects prospective buyers from the luxury brand feel.",
    solution: "A lightweight, GPU-accelerated web experience with instant interactive feedback, audio feedback cues, and realistic 360-degree angle view simulation.",
    features: [
      "Interactive paint color & rim selector with instant lighting preview",
      "Engine sound simulator with RPM gauge audio visualization",
      "Performance comparison matrix (Horsepower, 0-60 mph, Range, Top Speed)",
      "Seamless online test-drive scheduling module with instant confirmation",
      "Dark luxury minimalist aesthetic with responsive fluid layouts"
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"] },
      { category: "State & Audio", items: ["Web Audio API", "Custom React Hooks", "Zustand"] },
      { category: "Deployment", items: ["Vite", "Cloud Run", "AWS S3"] }
    ],
    challenges: "Delivering a 60 FPS silky smooth experience with high-resolution visual assets on both mobile touch devices and ultra-wide desktop monitors.",
    futureImprovements: [
      "Three.js 3D WebGL vehicle model viewer with raytraced reflections",
      "Augmented Reality (AR) mobile vehicle projection in real environments"
    ]
  },
  {
    id: "ai-vision-analyzer",
    title: "Multimodal AI Vision Analyzer",
    tagline: "Automated document OCR, object segmentation, and visual data extraction engine.",
    description: "An advanced machine learning pipeline that extracts structured JSON data from receipts, architectural schematics, handwritten notes, and photographic evidence with high precision.",
    category: "ML",
    tags: ["Python", "FastAPI", "React", "OpenCV", "Gemini Vision", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    githubUrl: "https://github.com/kishorsv",
    liveUrl: "https://kishorsv.lovable.app",
    featured: false,
    overview: "A computer vision and OCR tool designed for researchers and analysts to ingest complex unformatted image documents and immediately query them with natural language questions.",
    problem: "Extracting structured tabular data from photographed receipts, contracts, and certificates requires manual data entry prone to human error.",
    solution: "Combines OpenCV image preprocessing (deskewing, binarization) with multimodal AI vision to convert raw visuals into formatted tables, JSON payloads, and searchable metadata.",
    features: [
      "Drag-and-drop image and PDF document upload",
      "Automatic receipt and invoice line-item extraction into CSV/JSON",
      "Bounding box visualization over detected visual entities",
      "Natural language image question-answering with visual citations"
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Tailwind CSS", "Canvas API", "Lucide React"] },
      { category: "Backend", items: ["Python", "FastAPI", "OpenCV", "Pillow"] },
      { category: "AI Models", items: ["Gemini 3.7 Flash Vision", "PyTorch OCR"] }
    ],
    challenges: "Handling distorted camera angles, reflections, and degraded scan resolutions with robust pre-filtering pipelines.",
    futureImprovements: [
      "Real-time webcam video stream document scanning",
      "Batch folder processing with automated cloud S3 export"
    ]
  }
];
