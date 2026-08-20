import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Layers,
  Sparkles,
  Cloud,
  Code,
  Palette,
  CheckCircle2,
  Cpu,
  UserCheck,
  TrendingUp,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Layers,
  Sparkles,
  Cloud,
  Code,
  Palette,
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950/80 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="About Me"
          title="Engineering Intelligence & Scalability"
          subtitle="A passionate synthesis of Machine Learning, modern web engineering, and product design."
        />

        {/* Bio & Intro Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-stretch">
          {/* Main Story Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 backdrop-blur-sm shadow-sm">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Who I Am</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 leading-snug">
                Turning complex algorithmic ideas into intuitive, high-impact digital experiences.
              </h3>

              <p className="text-gray-300 text-base leading-relaxed mb-6 font-normal">
                {profileData.bio}
              </p>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>Dedicated to building reliable, high-throughput AI systems with clean TypeScript and Python architectures.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>Passionate about seamless user experience, responsive layout ergonomics, and accessible developer tooling.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>Constantly exploring next-gen foundation models, RAG vector retrieval, and automated cloud workflows.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Status: Open for Hiring</span>
              <span>•</span>
              <span>Focus: AI/ML & Full-Stack Systems</span>
            </div>
          </motion.div>

          {/* Key Stats Counter Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {(profileData?.stats || []).map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                    {stat.value}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">{stat.label}</h4>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-normal leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 6 Key Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(profileData?.aboutAreas || []).map((area, idx) => {
            const Icon = iconMap[area.icon] || Cpu;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-2">{area.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                    {area.description}
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
