import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  CheckCircle,
  Sparkles,
  Terminal,
  Cpu,
  Code2,
} from 'lucide-react';
import { profileData } from '../data/profile';

export const AboutTechProfileCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center text-center select-none">
      {/* Central Cyber Monogram Badge */}
      <div className="relative mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-60 blur-md pointer-events-none"
        />
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-2xl">
          <div className="w-full h-full rounded-[22px] bg-[#090c15] flex flex-col items-center justify-center p-3 border border-white/10 relative overflow-hidden group">
            {/* Ambient inner grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
            
            <span className="font-mono font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-indigo-300 relative z-10">
              KSV
            </span>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mt-1 relative z-10 font-semibold">
              AI / ML
            </span>
            
            <div className="absolute -bottom-1 w-12 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#090c15] rounded-full shadow-[0_0_10px_#10b981]" />
      </div>

      {/* Identity & Headline */}
      <div className="w-full text-center">
        <h4 className="text-lg font-bold text-white font-display flex items-center justify-center gap-1.5">
          <span>{profileData.name}</span>
          <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
        </h4>
        <p className="text-xs font-mono text-indigo-300 mt-0.5">
          {profileData.headline}
        </p>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-mono">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>AI Specialist</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-mono">
            <Code2 className="w-3 h-3 text-indigo-400" />
            <span>Full-Stack</span>
          </span>
        </div>

        {/* Location & Availability Status */}
        <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-white/10 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>{profileData.location}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open for Roles</span>
          </span>
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/10">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profileData.socials.email}`}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
