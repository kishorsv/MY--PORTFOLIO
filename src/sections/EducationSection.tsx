import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { educationData } from '../data/education';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950/80 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Academic Background"
          title="Education & Foundations"
          subtitle="Formal university education specializing in Artificial Intelligence, Machine Learning, and Computer Science."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md shadow-2xl overflow-hidden relative"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Degree & Institution */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-2 backdrop-blur-sm">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm">
                  {educationData.startYear} – {educationData.graduationYear}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-3">
                  {educationData.degree}
                </h3>
                <p className="text-base font-semibold text-indigo-400 mt-1">
                  Specialization: {educationData.specialization}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {educationData.college}
                </p>
                {educationData.location && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {educationData.location}
                  </p>
                )}
              </div>

              {educationData.gradeOrGpa && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 inline-block backdrop-blur-sm">
                  <span className="text-xs font-mono text-gray-400">Academic Standing: </span>
                  <span className="text-xs font-bold text-emerald-400">{educationData.gradeOrGpa}</span>
                </div>
              )}

              {educationData.highlights && educationData.highlights.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-gray-300">
                  {(educationData.highlights || []).map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Core Coursework */}
            <div className="lg:col-span-7 bg-white/5 rounded-2xl p-6 sm:p-7 border border-white/10 backdrop-blur-sm">
              <h4 className="text-base font-bold font-display text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Key University Coursework
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(educationData.coursework || []).map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300 flex items-center gap-2 hover:border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
