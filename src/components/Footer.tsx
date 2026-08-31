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
  Share2,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface FooterProps {
  onOpenAiChat: () => void;
  onNotify?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAiChat, onNotify }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSharePortfolio = async () => {
    const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kishor-portfolio.dev';
    const shareData = {
      title: `${profileData.name} - AI/ML Engineer & Full-Stack Developer`,
      text: `Check out ${profileData.name}'s portfolio showcasing AI/ML and Full-Stack Engineering projects!`,
      url: portfolioUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onNotify?.(
          'Portfolio Shared Successfully!',
          'Thank you for sharing my portfolio with your network.',
          'success'
        );
      } catch (err: any) {
        // Only ignore user cancellation (AbortError); otherwise attempt clipboard fallback
        if (err.name !== 'AbortError') {
          await fallbackClipboardCopy(portfolioUrl);
        }
      }
    } else {
      await fallbackClipboardCopy(portfolioUrl);
    }
  };

  const fallbackClipboardCopy = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        onNotify?.(
          'Portfolio Link Copied!',
          'The link has been copied to your clipboard.',
          'success'
        );
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        onNotify?.(
          'Portfolio Link Copied!',
          'The link has been copied to your clipboard.',
          'success'
        );
      }
    } catch {
      onNotify?.(
        'Portfolio Link',
        url,
        'info'
      );
    }
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
            {/* Share Portfolio Button */}
            <motion.button
              id="footer-share-portfolio-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSharePortfolio}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold backdrop-blur-sm transition-all shadow-md shadow-cyan-500/5 hover:border-cyan-400/60 cursor-pointer"
              aria-label="Share Portfolio"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share Portfolio</span>
            </motion.button>

            {/* Ask AI Assistant Button */}
            <motion.button
              id="footer-ask-ai-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenAiChat}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold backdrop-blur-sm transition-all shadow-md shadow-indigo-600/10 hover:border-indigo-400/60 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Ask AI About Kishor</span>
            </motion.button>

            <div className="flex items-center gap-2.5">
              <a
                id="footer-github-link"
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                id="footer-linkedin-link"
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                id="footer-twitter-link"
                href={profileData.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="X / Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                id="footer-email-link"
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
