import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Cpu } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SkillCard } from '../components/SkillCard';
import { skillCategories } from '../data/skills';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoriesList = useMemo(() => [
    { id: 'all', name: 'All Categories' },
    ...skillCategories.map((c) => ({ id: c.id, name: c.name })),
  ], []);

  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => (selectedCategory === 'all' ? true : cat.id === selectedCategory))
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const query = searchQuery.toLowerCase();
        const filteredSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.level?.toLowerCase().includes(query)
        );
        return {
          ...cat,
          skills: filteredSkills,
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Technical Skills"
          title="Full-Stack & AI Toolkit"
          subtitle="A comprehensive overview of programming languages, machine learning frameworks, SQL databases, and cloud platforms."
        />

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-2 rounded-2xl md:rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. Python, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 backdrop-blur-sm transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-gray-400 text-sm bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md"
          >
            No matching skills found for "{searchQuery}".
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, idx) => (
              <SkillCard key={category.id} category={category} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
