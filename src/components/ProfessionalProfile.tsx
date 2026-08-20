import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Sparkles,
  Zap,
  CheckCircle,
  Code2,
  Cpu,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { useProfilePhoto } from '../utils/photoManager';

interface ProfessionalProfileProps {
  className?: string;
  showBadges?: boolean;
  isDarkMode?: boolean;
}

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({
  className = '',
  showBadges = true,
  isDarkMode = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { photoUrl } = useProfilePhoto();
  const activePhoto = photoUrl || profileData.photoUrl || '/kishor-portrait.svg';

  // Framer Motion 3D Tilt & Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, premium mouse tracking
  const springConfig = { stiffness: 260, damping: 24, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Card Tilting angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-10deg', '10deg']);

  // Parallax layers (image moves slightly for optical depth)
  const imgParallaxX = useTransform(smoothX, [-0.5, 0.5], ['-12px', '12px']);
  const imgParallaxY = useTransform(smoothY, [-0.5, 0.5], ['-12px', '12px']);

  // Floating badges parallax
  const badge1X = useTransform(smoothX, [-0.5, 0.5], ['16px', '-16px']);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], ['14px', '-14px']);

  const badge2X = useTransform(smoothX, [-0.5, 0.5], ['-18px', '18px']);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], ['-16px', '16px']);

  // Multi-layered mouse tracking for dynamic backlighting
  const auraTranslateX = useTransform(smoothX, [-0.5, 0.5], ['-35px', '35px']);
  const auraTranslateY = useTransform(smoothY, [-0.5, 0.5], ['-35px', '35px']);
  const auraRotate = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const auraScale = useTransform(smoothY, [-0.5, 0.5], [1.15, 0.95]);

  // Specular lighting reflection follows cursor
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['15%', '85%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Cursor-Interactive Volumetric Backlight & Ambient Glow */}
      <motion.div
        style={{
          x: auraTranslateX,
          y: auraTranslateY,
          rotate: auraRotate,
          scale: auraScale,
        }}
        className="absolute -inset-12 pointer-events-none transition-all duration-300 transform-gpu"
      >
        {/* Deep Indigo Core Backlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/50 via-purple-600/35 to-cyan-400/40 rounded-[56px] blur-3xl" />
        
        {/* Intense Focused Spotlight behind card center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-gradient-to-b from-indigo-500/60 via-cyan-400/30 to-purple-600/40 rounded-full blur-2xl opacity-80" />
      </motion.div>

      {/* Pulsing Ambient Rim Glow */}
      <motion.div
        animate={{
          scale: [0.98, 1.05, 0.98],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -inset-6 bg-gradient-to-r from-indigo-500/30 via-cyan-500/25 to-purple-500/30 rounded-3xl blur-2xl pointer-events-none transform-gpu"
      />

      {/* Orbiting Futuristic Accent Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-10 rounded-full border border-indigo-500/15 pointer-events-none hidden sm:block transform-gpu"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
      </motion.div>

      {/* 3D Interactive Parallax Card Frame */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 rounded-3xl p-1.5 bg-gradient-to-br from-indigo-500/35 via-white/10 to-cyan-500/25 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden group w-[290px] sm:w-[350px] md:w-[380px]"
      >
        {/* Inner Photo Container */}
        <div className="relative w-full aspect-[3/4] rounded-[22px] overflow-hidden bg-neutral-950">
          {/* Parallax Image Layer */}
          <motion.div
            style={{
              x: imgParallaxX,
              y: imgParallaxY,
              scale: 1.08,
            }}
            className="absolute inset-0 w-full h-full transform-gpu"
          >
            <img
              src={activePhoto}
              alt={profileData.name}
              className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] transition-all duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Dynamic Slow-Moving Radial Gradient Overlay */}
          <motion.div
            animate={{
              x: ['-6%', '6%', '-4%', '5%', '-6%'],
              y: ['-5%', '5%', '6%', '-4%', '-5%'],
              scale: [1, 1.15, 1.08, 1.12, 1],
              opacity: isDarkMode ? [0.65, 0.85, 0.7, 0.9, 0.65] : [0.35, 0.5, 0.4, 0.55, 0.35],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-10 pointer-events-none mix-blend-overlay transition-opacity duration-700 transform-gpu"
            style={{
              background: isDarkMode
                ? 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(99, 102, 241, 0.42) 0%, rgba(168, 85, 247, 0.28) 35%, rgba(6, 182, 212, 0.2) 65%, transparent 100%)'
                : 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(79, 70, 229, 0.28) 0%, rgba(147, 51, 234, 0.18) 38%, rgba(14, 165, 233, 0.14) 65%, transparent 100%)',
            }}
          />

          {/* Counter-Moving Secondary Chromatic Glow */}
          <motion.div
            animate={{
              x: ['5%', '-7%', '4%', '-5%', '5%'],
              y: ['7%', '-5%', '-3%', '6%', '7%'],
              scale: [1.12, 0.96, 1.16, 1.02, 1.12],
              opacity: isDarkMode ? [0.45, 0.7, 0.55, 0.65, 0.45] : [0.25, 0.4, 0.3, 0.45, 0.25],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="absolute -inset-8 pointer-events-none mix-blend-soft-light transition-opacity duration-700 transform-gpu"
            style={{
              background: isDarkMode
                ? 'radial-gradient(circle 55% at 52% 58%, rgba(6, 182, 212, 0.35) 0%, rgba(139, 92, 246, 0.22) 42%, rgba(99, 102, 241, 0.12) 70%, transparent 90%)'
                : 'radial-gradient(circle 55% at 52% 58%, rgba(14, 165, 233, 0.22) 0%, rgba(129, 140, 248, 0.16) 42%, rgba(99, 102, 241, 0.1) 70%, transparent 90%)',
            }}
          />

          {/* Glowing Futuristic Holographic Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-45 group-hover:opacity-65 transition-opacity duration-500"
            style={{
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.15) 35%, rgba(6,182,212,0.2) 70%, rgba(99,102,241,0.25) 100%)'
                : 'linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(147,51,234,0.12) 35%, rgba(14,165,233,0.15) 70%, rgba(79,70,229,0.18) 100%)',
              backgroundSize: '250% 250%',
              animation: 'gradientMove 10s ease infinite',
            }}
          />

          {/* Depth Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent opacity-90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-transparent pointer-events-none" />

          {/* Cursor-Reactive Specular Flare */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-300 transform-gpu"
            style={{
              background: `radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), rgba(99,102,241,0.2) 40%, transparent 70%)`,
            }}
          />

          {/* Cyberpunk HUD Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />

          {/* Top HUD Status Badges */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-gray-300 shadow-sm">
              <Cpu className="w-3 h-3 text-indigo-400" />
              <span>AI Core v2.4</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Verified Active</span>
            </div>
          </div>

          {/* Bottom Identity Card Banner */}
          <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/15 pointer-events-none flex items-center justify-between shadow-lg">
            <div>
              <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                <span>{profileData.name}</span>
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400 inline" />
              </h4>
              <p className="text-[11px] font-mono text-indigo-300 flex items-center gap-1 mt-0.5">
                <Code2 className="w-3 h-3 text-cyan-400" />
                <span>AI/ML &amp; Full-Stack</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Engineer
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Parallax Badges */}
      {showBadges && (
        <>
          {/* Top-Right Floating Badge */}
          <motion.div
            style={{
              x: badge1X,
              y: badge1Y,
            }}
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-5 -right-4 sm:-right-8 z-20 pointer-events-none transform-gpu"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-indigo-500/40 text-white shadow-2xl shadow-indigo-500/20">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Specialization</p>
                <p className="text-xs font-extrabold text-white">Generative AI &amp; ML</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom-Left Floating Badge */}
          <motion.div
            style={{
              x: badge2X,
              y: badge2Y,
            }}
            animate={{
              y: [6, -6, 6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            className="absolute -bottom-5 -left-4 sm:-left-8 z-20 pointer-events-none transform-gpu"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-cyan-500/40 text-white shadow-2xl shadow-cyan-500/20">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Status</p>
                <p className="text-xs font-extrabold text-white">15+ Live Deployments</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
