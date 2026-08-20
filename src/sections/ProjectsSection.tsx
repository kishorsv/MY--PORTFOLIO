import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projectsData } from '../data/projects';
import { ProjectCategory, ProjectItem } from '../types';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = ['All', 'AI', 'ML', 'Web', 'Full Stack', 'Other'];

  const filteredProjects = useMemo(() => {
    return (projectsData || []).filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.tags || []).some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950/90 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Featured Projects"
          title="Innovative Engineering in Action"
          subtitle="Explore production-ready AI applications, conversational platforms, and interactive full-stack web experiences."
        />

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 p-2.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 backdrop-blur-sm transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <p>No projects matched your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-indigo-400 hover:underline cursor-pointer font-semibold"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Detailed Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
