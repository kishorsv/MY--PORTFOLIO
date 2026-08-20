import React, { useState } from 'react';
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
  Play,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  BookOpen,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { isValidExternalUrl } from '../utils/url';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'case-study' | 'live-demo'>('case-study');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);

  if (!project) return null;

  const hasLiveUrl = isValidExternalUrl(project.liveUrl);
  const hasGithubUrl = isValidExternalUrl(project.githubUrl);

  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[380px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  };

  return (
    <AnimatePresence>
      <div id="project-details-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#020204]/95 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-100 backdrop-blur-xl"
        >
          {/* Header Image banner */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-black/60 shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10 cursor-pointer z-10"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 backdrop-blur-sm">
                      <Sparkles className="w-3 h-3" /> Featured Project
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">{project.title}</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl line-clamp-1 sm:line-clamp-none">{project.tagline}</p>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-2">
                {hasGithubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">Source Code</span>
                  </a>
                )}
                {hasLiveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Sub-Header Tabs */}
          {hasLiveUrl && (
            <div className="flex items-center justify-between px-6 py-2.5 bg-white/5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('case-study')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'case-study'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Case Study & Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab('live-demo')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'live-demo'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Interactive Live Demo</span>
                </button>
              </div>

              {activeTab === 'live-demo' && (
                <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${deviceView === 'desktop' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('tablet')}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${deviceView === 'tablet' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    title="Tablet Preview"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${deviceView === 'mobile' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Modal Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-transparent">
            {activeTab === 'live-demo' && hasLiveUrl ? (
              <div className="flex flex-col items-center gap-4">
                {/* Browser Mockup Toolbar */}
                <div className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <button
                      onClick={() => setIframeKey((k) => k + 1)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-2 cursor-pointer"
                      title="Reload preview"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 max-w-lg px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-gray-300 truncate text-center select-all">
                    {project.liveUrl}
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Embedded Live Frame */}
                <div className={`w-full flex justify-center transition-all duration-300`}>
                  <div className={`w-full ${getDeviceWidth()} h-[500px] sm:h-[580px] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl relative`}>
                    <iframe
                      key={iframeKey}
                      src={project.liveUrl}
                      title={`Live Demo for ${project.title}`}
                      className="w-full h-full border-0 bg-white"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
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
            )}
          </div>

          {/* Sticky Footer Bar */}
          <div className="p-4 sm:p-5 bg-[#020204]/90 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Close
            </button>

            <div className="flex items-center gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {hasLiveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
