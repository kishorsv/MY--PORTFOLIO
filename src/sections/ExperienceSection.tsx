import React from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  Layout,
  Brain,
  Sparkles,
  Award,
  Rocket,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { experienceTimeline } from '../data/experience';

const iconMap: Record<string, React.ElementType> = {
  Terminal,
  Layout,
  Brain,
  Sparkles,
  Award,
  Rocket,
};

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Experience & Journey"
          title="Engineering Milestones & Growth"
          subtitle="A timeline documenting continuous learning, software architecture mastery, and AI exploration."
        />

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-indigo-500/20 space-y-12 sm:space-y-14 ml-2 sm:ml-6">
          {experienceTimeline.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-950 border-2 border-indigo-500/50 flex items-center justify-center text-indigo-400 group-hover:border-indigo-400 group-hover:scale-110 transition-all shadow-lg shadow-indigo-500/20">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 backdrop-blur-md transition-all duration-300 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm">
                      {item.year}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {item.roleOrContext}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed font-normal mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    {(item.skills || []).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
