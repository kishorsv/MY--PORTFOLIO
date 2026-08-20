import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  Github,
  Mail,
  FileText,
  Sparkles,
  ExternalLink,
  Copy,
  X,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenAiChat: () => void;
  onCopyEmail?: () => void;
  onNotify?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenAiChat,
  onCopyEmail,
  onNotify,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCopyEmail = () => {
    if (onCopyEmail) {
      onCopyEmail();
    } else {
      navigator.clipboard.writeText(profileData.socials.email);
      if (onNotify) {
        onNotify('Email Copied to Clipboard', profileData.socials.email, 'success');
      }
    }
  };

  const commands = useMemo(() => [
    {
      category: 'Navigation',
      items: [
        { id: 'nav-home', label: 'Go to Home / Hero', icon: Home, action: () => scrollToSection('hero') },
        { id: 'nav-about', label: 'Go to About Me', icon: User, action: () => scrollToSection('about') },
        { id: 'nav-skills', label: 'Go to Technical Skills', icon: Cpu, action: () => scrollToSection('skills') },
        { id: 'nav-projects', label: 'Go to Featured Projects', icon: FolderGit2, action: () => scrollToSection('projects') },
        { id: 'nav-experience', label: 'Go to Experience & Journey', icon: Briefcase, action: () => scrollToSection('experience') },
        { id: 'nav-education', label: 'Go to Education', icon: GraduationCap, action: () => scrollToSection('education') },
        { id: 'nav-certifications', label: 'Go to Certifications', icon: Award, action: () => scrollToSection('certifications') },
        { id: 'nav-github', label: 'Go to GitHub Activity', icon: Github, action: () => scrollToSection('github') },
        { id: 'nav-contact', label: 'Go to Contact', icon: Mail, action: () => scrollToSection('contact') },
      ],
    },
    {
      category: 'Interactive & AI',
      items: [
        { id: 'ai-assistant', label: 'Ask AI Assistant about Kishor S V', icon: Sparkles, action: onOpenAiChat },
        { id: 'view-resume', label: 'View / Download Resume (PDF)', icon: FileText, action: onOpenResume },
        { id: 'copy-email', label: `Copy Email (${profileData.socials.email})`, icon: Copy, action: handleCopyEmail },
      ],
    },
    {
      category: 'Socials & External Links',
      items: [
        { id: 'ext-github', label: 'Open GitHub Profile', icon: Github, action: () => window.open(profileData.socials.github, '_blank') },
        { id: 'ext-linkedin', label: 'Open LinkedIn Profile', icon: Linkedin, action: () => window.open(profileData.socials.linkedin, '_blank') },
        { id: 'ext-twitter', label: 'Open X / Twitter Profile', icon: Twitter, action: () => window.open(profileData.socials.twitter, '_blank') },
      ],
    },
  ], [onOpenResume, onOpenAiChat, onCopyEmail, onNotify]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) {
      return commands.flatMap((c) => c.items);
    }
    return commands
      .flatMap((c) => c.items)
      .filter((item) => item.label.toLowerCase().includes(query));
  }, [commands, search]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="command-palette-backdrop" className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden glass-panel"
        >
          {/* Header & Search */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              id="command-palette-input"
              type="text"
              placeholder="Type a command or search sections, projects, resume..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close command palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-neutral-400">
                No matching commands found for "{search}"
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                        : 'text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected ? 'bg-indigo-500 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-mono text-indigo-400">Select ↵</span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-neutral-950/70 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-3">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>ESC to close</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                Ctrl + K
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
