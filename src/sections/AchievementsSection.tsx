import React from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  CodeXml,
  Award,
  GitPullRequest,
  Medal,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { achievementsData } from '../data/achievements';

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  CodeXml,
  Award,
  GitPullRequest,
  Medal,
};

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950/80 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Honors & Recognition"
          title="Achievements & Leadership"
          subtitle="Milestones attained in hackathons, competitive problem solving, open-source development, and team initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, idx) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    {item.highlight && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 shadow-sm">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1 mb-1.5">
                    <Calendar className="w-3 h-3 text-gray-400" /> {item.date}
                  </span>

                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
