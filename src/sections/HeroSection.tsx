import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Bot,
  Brain,
  Code2,
  Database,
  Layers,
  Terminal,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenAiChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenAiChat }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Dynamic Mouse Following Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full z-10">
        {/* Main Frosted Glass Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 backdrop-blur-md relative overflow-hidden shadow-2xl flex flex-col items-center text-center"
        >
          {/* Subtle Decorative Geometric Grid overlay on right side */}
          <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-l from-indigo-500/5 to-transparent flex items-center justify-center pointer-events-none opacity-30 hidden lg:flex">
            <div className="grid grid-cols-4 gap-2">
              <div className="w-10 h-10 border border-white/20 rounded-lg"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg bg-white/10"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg bg-white/10"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg bg-white/10"></div>
              <div className="w-10 h-10 border border-white/20 rounded-lg"></div>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>AI/ML Engineer & Full-Stack</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 font-display"
          >
            Building Intelligence <br className="hidden sm:inline" /> into Digital Reality
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-gray-400 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed mb-8 font-normal"
          >
            Developing intelligent, scalable digital experiences with Generative AI and modern web architectures.
          </motion.p>

          {/* Frosted Tech Capsules */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-10 text-xs font-mono"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm shadow-sm">
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              <span>Generative AI & LLMs</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>React & TypeScript</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Python & PyTorch</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm shadow-sm">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Node.js & FastAPI</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm shadow-sm">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vector DB & Cloud</span>
            </div>
          </motion.div>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-8"
          >
            <button
              id="hero-cta-view-work"
              onClick={scrollToProjects}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 cursor-pointer group"
            >
              <span>View Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-cta-download-resume"
              onClick={onOpenResume}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Download Resume</span>
            </button>

            <button
              id="hero-cta-contact-me"
              onClick={scrollToContact}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-gray-400" />
              <span>Let's Connect</span>
            </button>
          </motion.div>

          {/* Social Icons & AI Assistant Affordance */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 text-gray-400"
          >
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              aria-label="Kishor S V GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              aria-label="Kishor S V LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              aria-label="Kishor S V X Twitter Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenAiChat}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
              title="Chat with Kishor's AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Ask AI Assistant</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
