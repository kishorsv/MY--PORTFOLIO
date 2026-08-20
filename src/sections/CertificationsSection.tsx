import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Award,
  Sparkles,
  Bot,
  Globe,
  Terminal,
  BarChart3,
  Database,
  Filter,
  CheckCircle2,
  FileBadge
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { CertificateCard } from '../components/CertificateCard';
import { CertificateModal } from '../components/CertificateModal';
import { certificationsData, certificationSummaryStats } from '../data/certifications';
import { CertificateItem } from '../types';

export const CertificationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const categories = [
    'All',
    'AI & Generative AI',
    'Web Development',
    'Data Science',
    'Data Analysis',
    'GitHub & Development',
    'Achievements'
  ];

  const filteredCerts = useMemo(() => {
    return certificationsData.filter((cert) => {
      let matchesCategory = false;
      if (activeCategory === 'All') {
        matchesCategory = true;
      } else if (activeCategory === 'Achievements') {
        matchesCategory = cert.type === 'Community Achievement / Badge' || cert.category === 'Achievements';
      } else {
        matchesCategory = cert.category === activeCategory;
      }

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.category.toLowerCase().includes(query) ||
        cert.type.toLowerCase().includes(query) ||
        cert.skills.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Certifications & Achievements"
          title="Certifications & Achievements"
          subtitle="Professional certificates, course completions, and community recognitions across Generative AI, Full-Stack Web Development, Version Control, and Data Analytics."
        />

        {/* Top Summary Dashboard Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
                <FileBadge className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {certificationSummaryStats.totalCount} Total Credentials & Achievements
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  Confirmed profile credentials & milestones
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                Portfolio Credentials
              </span>
            </div>
          </div>

          {/* Breakdown stat pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-all group">
              <div className="flex items-center gap-2 text-amber-400">
                <Bot className="w-4 h-4" />
                <span className="text-lg font-bold font-display text-white">{certificationSummaryStats.anthropicCount}</span>
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-1">Anthropic AI Certificates</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 transition-all group">
              <div className="flex items-center gap-2 text-sky-400">
                <Globe className="w-4 h-4" />
                <span className="text-lg font-bold font-display text-white">{certificationSummaryStats.nxtwaveCount}</span>
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-1">NxtWave Web Certificates</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span className="text-lg font-bold font-display text-white">{certificationSummaryStats.githubCount}</span>
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-1">GitHub Professional Cert</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="flex items-center gap-2 text-blue-400">
                <BarChart3 className="w-4 h-4" />
                <span className="text-lg font-bold font-display text-white">{certificationSummaryStats.microsoftCount}</span>
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-1">Microsoft + LinkedIn Cert</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all group col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <Database className="w-4 h-4" />
                <span className="text-lg font-bold font-display text-white">{certificationSummaryStats.kaggleCount}</span>
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-1">Kaggle Community Badge</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 p-2.5 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, issuer, skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCerts.length === 0 ? (
          <div className="text-center py-20 px-4 text-gray-400 text-sm bg-neutral-900/50 rounded-3xl border border-white/10 backdrop-blur-md">
            <Filter className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <p className="font-semibold text-white">No matching credentials found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                onSelect={setSelectedCert}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Interactive Document Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

