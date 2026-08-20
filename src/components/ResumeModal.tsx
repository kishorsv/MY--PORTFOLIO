import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Linkedin,
  Github,
  Award,
  GraduationCap,
  Briefcase,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { educationData } from '../data/education';
import { skillCategories } from '../data/skills';
import { projectsData } from '../data/projects';
import { certificationsData } from '../data/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div id="resume-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#020204]/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-100 backdrop-blur-xl"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Curriculum Vitae — {profileData.name}</h3>
                <p className="text-xs text-gray-400">{profileData.headline}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintOrDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close resume modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable / Clean Resume Body */}
          <div id="printable-resume" className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-transparent text-gray-200">
            {/* Header / Contact summary */}
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-3xl font-bold font-display text-white">{profileData.name}</h1>
              <p className="text-indigo-400 font-medium text-base mt-1">{profileData.headline}</p>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed max-w-3xl">{profileData.bio}</p>

              <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  {profileData.socials.email}
                </span>
                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                  LinkedIn
                </a>
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-indigo-400" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                <Cpu className="w-4 h-4 text-indigo-400" /> Technical Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="font-semibold text-gray-200 mb-1.5">{cat.name}</p>
                    <p className="text-gray-400 leading-relaxed">
                      {cat.skills.map((s) => s.name).join(' • ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                <Briefcase className="w-4 h-4 text-indigo-400" /> Key Engineering Projects
              </h2>
              <div className="space-y-4">
                {projectsData.slice(0, 4).map((project) => (
                  <div key={project.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-semibold text-sm text-white">{project.title}</h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-gray-400 rounded-full border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" /> Education
              </h2>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-sm text-white">{educationData.degree}</h3>
                    <p className="text-xs text-indigo-400">{educationData.specialization}</p>
                    <p className="text-xs text-gray-400">{educationData.college}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{educationData.startYear} – {educationData.graduationYear}</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-300 mb-1">Key Coursework:</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {educationData.coursework.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                <Award className="w-4 h-4 text-indigo-400" /> Verified Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {certificationsData.slice(0, 4).map((cert) => (
                  <div key={cert.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5 backdrop-blur-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-200">{cert.title}</p>
                      <p className="text-gray-400 text-[11px]">{cert.issuer} • {cert.issueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
