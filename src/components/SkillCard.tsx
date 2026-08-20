import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Brain,
  Layout,
  Server,
  DatabaseZap,
  CloudLightning,
  Terminal,
  Coffee,
  FileCode,
  Cpu,
  Network,
  Sparkles,
  Workflow,
  MessageSquareCode,
  Atom,
  Palette,
  Globe,
  Flame,
  ServerCog,
  ShieldCheck,
  Database,
  Leaf,
  Table2,
  Cloud,
  Box,
  GitBranch,
  Cog,
  CheckCircle2,
} from 'lucide-react';
import { SkillCategory } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Layout,
  Server,
  DatabaseZap,
  CloudLightning,
  Terminal,
  Coffee,
  FileCode,
  Cpu,
  Network,
  Sparkles,
  Workflow,
  MessageSquareCode,
  Atom,
  Palette,
  Globe,
  Flame,
  ServerCog,
  ShieldCheck,
  Database,
  Leaf,
  Table2,
  Cloud,
  Box,
  GitBranch,
  Cog,
};

interface SkillCardProps {
  category: SkillCategory;
}

export const SkillCard: React.FC<SkillCardProps> = ({ category }) => {
  const CategoryIcon = iconMap[category.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md p-6 sm:p-7 shadow-xl flex flex-col justify-between transition-all duration-300"
    >
      <div>
        {/* Category Header */}
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/10">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-sm">
            <CategoryIcon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">{category.name}</h3>
        </div>

        {/* Skills list */}
        <div className="space-y-3">
          {(category?.skills || []).map((skill, idx) => {
            const SkillIcon = iconMap[skill.icon] || CheckCircle2;
            return (
              <div
                key={idx}
                className="group/item p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <SkillIcon className="w-4 h-4 text-indigo-400 group-hover/item:text-cyan-400 transition-colors" />
                    <span className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {skill.level && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {skill.level}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
