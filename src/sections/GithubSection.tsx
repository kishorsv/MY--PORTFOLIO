import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  GitFork,
  Star,
  BookMarked,
  Activity,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { githubData } from '../data/github';

export const GithubSection: React.FC = () => {
  const [stats, setStats] = useState(githubData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Graceful client check to live API proxy
    const fetchGithub = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/github-profile');
        const json = await res.json();
        if (json.success && json.data) {
          setStats((prev) => ({
            ...prev,
            publicRepos: json.data.public_repos || prev.publicRepos,
            followers: json.data.followers || prev.followers,
            following: json.data.following || prev.following,
          }));
        }
      } catch {
        // graceful fallback to curated data
      } finally {
        setLoading(false);
      }
    };

    fetchGithub();
  }, []);

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Open Source & Code Activity"
          title="GitHub Activity & Repositories"
          subtitle="Explore open-source projects, machine learning experiments, full-stack templates, and continuous code contributions."
        />

        {/* GitHub Top Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-xl backdrop-blur-sm">
                <Github className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">@{stats.username}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">AI/ML & Full-Stack Engineer on GitHub</p>
              </div>
            </div>

            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all shadow-sm backdrop-blur-sm"
            >
              <span>Follow on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Numerical metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-indigo-400" /> Public Repos
              </p>
              <p className="text-2xl font-bold font-display text-white mt-1">{stats.publicRepos}+</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Total Contributions
              </p>
              <p className="text-2xl font-bold font-display text-emerald-400 mt-1">{stats.totalContributions}+</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" /> Total Stars Earned
              </p>
              <p className="text-2xl font-bold font-display text-amber-400 mt-1">{stats.totalStars}+</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-purple-400" /> Followers
              </p>
              <p className="text-2xl font-bold font-display text-purple-300 mt-1">{stats.followers}</p>
            </div>
          </div>

          {/* Top Languages Distribution Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs font-mono text-gray-300 mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Repository Language Composition
            </p>

            <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden flex mb-3 border border-white/5">
              {(stats?.topLanguages || []).map((lang, idx) => (
                <div
                  key={idx}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  className="h-full transition-all"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              {(stats?.topLanguages || []).map((lang, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-gray-300 font-medium">{lang.name}</span>
                  <span className="text-gray-500 font-mono">({lang.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured GitHub Repositories Grid */}
        <h4 className="text-lg font-bold font-display text-white mb-6 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-indigo-400" /> Popular Repositories
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(stats?.featuredRepos || []).map((repo, idx) => (
            <motion.a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-lg group block"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h5 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors font-mono flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                    Public
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-normal mb-4">
                  {repo.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(repo?.topics || []).map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    {repo.language}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-gray-400" /> {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
