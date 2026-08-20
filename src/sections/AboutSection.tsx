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
  MapPin,
  Briefcase,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';
import { ProfilePhotoFrame } from '../components/ProfilePhotoFrame';

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

        {/* Bio, Motion Photo & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-stretch">
          {/* Developer Original Photo Asset in About Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
          >
            <ProfilePhotoFrame variant="about" showBadges={false} />
          </motion.div>

          {/* Main Story Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 backdrop-blur-sm shadow-sm">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Who I Am</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 leading-snug">
                Turning complex algorithmic ideas into intuitive, high-impact digital experiences.
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {profileData.bio}
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated to building reliable, high-throughput AI systems with clean TypeScript and Python architectures.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Passionate about seamless user experience, responsive layout ergonomics, and accessible developer tooling.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Constantly exploring next-gen foundation models, RAG vector retrieval, and automated cloud workflows.</span>
                </div>
              </div>
            </div>

            {/* Key Stats Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10">
              {(profileData?.stats || []).map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                >
                  <span className="text-xl sm:text-2xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                    {stat.value}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 leading-tight">{stat.label}</h4>
                </div>
              ))}
            </div>
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
