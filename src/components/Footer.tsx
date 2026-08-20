import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface FooterProps {
  onOpenAiChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAiChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[#020204]/80 border-t border-white/10 pt-16 pb-12 overflow-hidden text-gray-400 backdrop-blur-md">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#020204] rounded-[11px] flex items-center justify-center text-white">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                {profileData.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              Building intelligent, modern, and scalable digital experiences with AI, machine learning, and full-stack engineering.
            </p>
          </div>

          {/* Quick interactive links & social cluster */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenAiChat}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold backdrop-blur-sm transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Ask AI About Kishor</span>
            </button>

            <div className="flex items-center gap-2.5">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="X / Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.socials.email}`}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-gray-400">
          <p>© 2026 {profileData.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-400">
              Crafted with precision & modern web standards
            </span>

            <motion.button
              whileHover={{ y: -2 }}
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
