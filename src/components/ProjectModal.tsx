import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  Code,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div id="project-details-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#020204]/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-100 backdrop-blur-xl"
        >
          {/* Header Image banner */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black/60 shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10 cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 backdrop-blur-sm">
                      <Sparkles className="w-3 h-3" /> Featured Project
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">{project.title}</h2>
                <p className="text-sm text-gray-300 mt-1 max-w-2xl">{project.tagline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 backdrop-blur-md transition-all shadow-md cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-transparent">
            {/* Overview */}
            <div>
              <h3 className="text-base font-semibold text-white font-display uppercase tracking-wider mb-2 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" /> Project Overview
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">{project.overview}</p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/20 backdrop-blur-sm">
                <h4 className="text-xs font-mono font-semibold uppercase text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Problem Statement
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{project.problem}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 backdrop-blur-sm">
                <h4 className="text-xs font-mono font-semibold uppercase text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Engineered Solution
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-base font-semibold text-white font-display uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Key Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(project.features || []).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-200 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Breakdown */}
            <div>
              <h3 className="text-base font-semibold text-white font-display uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Technology Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(project.techStack || []).map((stack, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-xs font-semibold text-indigo-300 font-mono mb-2">{stack.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(stack.items || []).map((tech, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            {project.challenges && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h4 className="text-xs font-mono font-semibold uppercase text-amber-400 mb-1.5">
                  Engineering Challenges & Learnings
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{project.challenges}</p>
              </div>
            )}

            {/* Future Roadmap */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-white font-display uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-indigo-400" /> Roadmap & Future Enhancements
                </h3>
                <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                  {(project.futureImprovements || []).map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
