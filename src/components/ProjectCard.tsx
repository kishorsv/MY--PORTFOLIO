import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Play,
  Eye,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      id={`project-card-${project.id}`}
      className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer"
      onClick={() => onSelect(project)}
    >
      {/* Image container */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-neutral-950/50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#020204]/70 backdrop-blur-md text-indigo-300 border border-white/10 shadow-sm">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 z-20">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/40 hover:scale-105 transition-all cursor-pointer"
              title="Open Live Interactive Demo"
              aria-label={`Open live demo for ${project.title}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-xs backdrop-blur-md border border-white/20 hover:scale-105 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold font-display text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              {project.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-400" />
            </h3>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {(project.tags || []).slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {(project.tags || []).length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                +{(project.tags || []).length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10 gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            Case Study <span>→</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
                title="View GitHub Repository"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all hover:scale-105 cursor-pointer border border-indigo-400/30"
                title={`Launch live demo for ${project.title}`}
                aria-label={`Launch live demo for ${project.title}`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
