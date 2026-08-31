import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  FileText,
  Sparkles,
  Search,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { useProfilePhoto } from '../utils/photoManager';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAiChat: () => void;
  onOpenCommandPalette: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenAiChat,
  onOpenCommandPalette,
  isDarkMode,
  onToggleTheme,
}) => {
  const { avatarUrl } = useProfilePhoto();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#020204]/75 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <button
          onClick={() => handleScrollTo('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          aria-label="Kishor S V Home"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0c10] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-base text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-300">
                  K
                </span>
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#020204] rounded-full shadow-[0_0_8px_#10b981]" />
          </div>
          <div>
            <span className="font-display font-semibold text-lg text-white tracking-tight group-hover:text-indigo-300 transition-colors">
              {profileData.name}
            </span>
            <span className="hidden sm:block text-[11px] font-mono text-gray-400 -mt-0.5 tracking-wider uppercase">
              AI/ML &amp; Full-Stack
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Command Palette trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
            title="Search commands (Ctrl + K)"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-gray-300">
              ⌘K
            </span>
          </button>

          {/* Ask AI Trigger */}
          <button
            onClick={onOpenAiChat}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
            title="Chat with Kishor's AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Ask AI</span>
          </button>

          {/* Resume CTA */}
          <button
            onClick={onOpenResume}
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white backdrop-blur-sm transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-neutral-950/95 border-b border-white/10 backdrop-blur-2xl px-4 py-5 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                    activeSection === link.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiChat();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-medium"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Ask AI About Kishor</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-neutral-900 text-neutral-300 border border-white/10 text-xs font-medium"
              >
                <Search className="w-4 h-4 text-neutral-400" />
                <span>Open Command Search (Ctrl + K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
