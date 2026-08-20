import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Brain,
  Code2,
  Database,
  Layers,
  Terminal,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { ProfessionalProfile } from '../components/ProfessionalProfile';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenAiChat: () => void;
  isDarkMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenAiChat,
  isDarkMode = true,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitAnchorRef = useRef<HTMLDivElement>(null);
  const radialGlowRef = useRef<HTMLDivElement>(null);

  // Motion values for hardware-accelerated spring-based cursor tracking without React re-renders
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Optimized spring physics (critically damped for silky response and low CPU overhead)
  const springConfig = { stiffness: 120, damping: 24, mass: 0.5 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Direct GPU transforms for backlight shift behind portrait
  const backlightX = useTransform(smoothMouseX, [-600, 600], [-70, 70]);
  const backlightY = useTransform(smoothMouseY, [-600, 600], [-60, 60]);
  const backlightScale = useTransform(smoothMouseX, [-600, 0, 600], [1.12, 1.0, 1.15]);
  const backlightRotate = useTransform(smoothMouseX, [-600, 600], [-20, 20]);

  // Directional specular rim flare
  const rimGlowX = useTransform(smoothMouseX, [-600, 600], [-95, 95]);
  const rimGlowY = useTransform(smoothMouseY, [-600, 600], [-80, 80]);

  useEffect(() => {
    let rafId: number | null = null;
    let isHeroVisible = true;
    let lastX = 0;
    let lastY = 0;
    let isDirty = false;

    // IntersectionObserver to completely halt mouse updates when Hero is scrolled out of view (saves battery)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const updateGlowPosition = () => {
      if (radialGlowRef.current) {
        radialGlowRef.current.style.setProperty('--mouse-x', `${lastX}px`);
        radialGlowRef.current.style.setProperty('--mouse-y', `${lastY}px`);
      }
      isDirty = false;
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHeroVisible) return;

      lastX = e.clientX;
      lastY = e.clientY;

      if (!isDirty) {
        isDirty = true;
        rafId = requestAnimationFrame(updateGlowPosition);
      }

      if (portraitAnchorRef.current) {
        const rect = portraitAnchorRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        rawMouseX.set(e.clientX - centerX);
        rawMouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [rawMouseX, rawMouseY]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent transform-gpu"
    >
      {/* Hardware-accelerated dynamic radial ambient glow (Zero React re-renders) */}
      <div
        ref={radialGlowRef}
        className="pointer-events-none absolute -inset-px opacity-35 transition-opacity duration-300 hidden md:block will-change-[background] transform-gpu"
        style={{
          background: `radial-gradient(750px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.14), rgba(168, 85, 247, 0.04) 45%, transparent 75%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Main Frosted Glass Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-14 backdrop-blur-md relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Decorative Geometric Grid overlay */}
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-500/5 to-transparent flex items-center justify-center pointer-events-none opacity-20 hidden lg:flex">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full mb-5 uppercase tracking-widest backdrop-blur-sm shadow-sm"
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 font-display"
              >
                Building Intelligence <br className="hidden sm:inline" /> into Digital Reality
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-gray-300 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-normal"
              >
                Developing intelligent, scalable digital experiences with Generative AI and modern web architectures.
              </motion.p>

              {/* Frosted Tech Capsules */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-xl mb-8 text-xs font-mono"
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
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-8"
              >
                <button
                  id="hero-cta-view-work"
                  onClick={scrollToProjects}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 cursor-pointer group"
                >
                  <span>View Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-cta-download-resume"
                  onClick={onOpenResume}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm shadow-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Download Resume</span>
                </button>

                <button
                  id="hero-cta-contact-me"
                  onClick={scrollToContact}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm shadow-sm cursor-pointer"
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
                className="flex items-center justify-center lg:justify-start gap-3 text-gray-400"
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
            </div>

            {/* Right Column: 3D Motion Professional Profile with Mouse-Reactive Backlight */}
            <div
              ref={portraitAnchorRef}
              className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0 relative"
            >
              {/* ======================================================== */}
              {/* 🌟 MOUSE-REACTIVE AMBIENT GLOW BACKLIGHT ENGINE 🌟 */}
              {/* ======================================================== */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible transform-gpu">
                {/* 1. Primary Dynamic Volumetric Light Source (Follows cursor behind the portrait) */}
                <motion.div
                  style={{
                    x: backlightX,
                    y: backlightY,
                    scale: backlightScale,
                    rotate: backlightRotate,
                  }}
                  className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-[70px] opacity-75 sm:opacity-85 mix-blend-screen will-change-transform transform-gpu"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-cyan-400 opacity-90 animate-pulse transform-gpu" />
                </motion.div>

                {/* 2. Secondary High-Intensity Directional Rim Light Source */}
                <motion.div
                  style={{
                    x: rimGlowX,
                    y: rimGlowY,
                  }}
                  className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-[50px] opacity-60 sm:opacity-70 mix-blend-color-dodge pointer-events-none will-change-transform transform-gpu"
                >
                  <div className="w-full h-full rounded-full bg-radial from-cyan-300 via-indigo-500/40 to-transparent transform-gpu" />
                </motion.div>

                {/* 3. Deep Atmospheric Ambient Base Glow (Cybernetic aura anchor) */}
                <div className="absolute -inset-12 bg-gradient-to-tr from-indigo-900/40 via-purple-900/30 to-cyan-900/30 rounded-full blur-3xl opacity-80 pointer-events-none transform-gpu" />

                {/* 4. Subtle Shimmering Outer Ring Beam */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [0.98, 1.04, 0.98],
                  }}
                  transition={{
                    rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-indigo-500/20 blur-xl pointer-events-none opacity-40 will-change-transform transform-gpu"
                />
              </div>

              {/* Portrait Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full flex justify-center relative z-10"
              >
                <ProfessionalProfile isDarkMode={isDarkMode} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


