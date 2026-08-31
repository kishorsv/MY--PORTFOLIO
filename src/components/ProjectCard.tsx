import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Sparkles,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { isValidExternalUrl } from '../utils/url';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const hasValidGithubUrl = isValidExternalUrl(project.githubUrl);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      id={`project-card-${project.id}`}
      className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
      onClick={() => onSelect(project)}
    >
      {/* Image container */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md text-indigo-300 border border-white/10">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Featured
            </span>
          )}
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium text-xs backdrop-blur-md border border-white/20 transition-transform active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold font-display text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              {project.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-400" />
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {(project.tags || []).slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {(project.tags || []).length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5">
                +{(project.tags || []).length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer font-mono"
          >
            Explore Blueprint <span>→</span>
          </button>

          <div className="flex items-center gap-2">
            {hasValidGithubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10"
                title="View GitHub Repository"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


