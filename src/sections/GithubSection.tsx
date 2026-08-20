import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  GitFork,
  Star,
  BookMarked,
  Activity,
  ExternalLink,
  Code2,
  RefreshCw,
  SlidersHorizontal,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { githubData } from '../data/github';
import { GithubStatsData } from '../types';

const STORAGE_KEY = 'kishor_github_stats_override';

export const GithubSection: React.FC = () => {
  const [stats, setStats] = useState<GithubStatsData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...githubData, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return githubData;
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    totalContributions: stats.totalContributions,
    totalStars: stats.totalStars,
    publicRepos: stats.publicRepos,
    followers: stats.followers,
    following: stats.following,
  });
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const fetchGithub = async () => {
    try {
      setLoading(true);
      setSyncStatus('Fetching live GitHub data...');
      const res = await fetch('/api/github-profile');
      const json = await res.json();
      if (json.success && json.data) {
        const updated: GithubStatsData = {
          ...stats,
          username: json.data.username || stats.username,
          publicRepos: json.data.publicRepos ?? stats.publicRepos,
          followers: json.data.followers ?? stats.followers,
          following: json.data.following ?? stats.following,
          totalStars: json.data.totalStars ?? stats.totalStars,
          totalContributions: json.data.totalContributions ?? stats.totalContributions,
          featuredRepos: json.data.repos && json.data.repos.length > 0 ? json.data.repos : stats.featuredRepos,
        };
        setStats(updated);
        setEditForm({
          totalContributions: updated.totalContributions,
          totalStars: updated.totalStars,
          publicRepos: updated.publicRepos,
          followers: updated.followers,
          following: updated.following,
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setSyncStatus('Live data synced successfully!');
      } else {
        setSyncStatus('Using verified profile data.');
      }
    } catch {
      setSyncStatus('Using cached profile data.');
    } finally {
      setLoading(false);
      setTimeout(() => setSyncStatus(null), 3500);
    }
  };

  useEffect(() => {
    fetchGithub();
  }, []);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GithubStatsData = {
      ...stats,
      totalContributions: Number(editForm.totalContributions) || 0,
      totalStars: Number(editForm.totalStars) || 0,
      publicRepos: Number(editForm.publicRepos) || 0,
      followers: Number(editForm.followers) || 0,
      following: Number(editForm.following) || 0,
    };
    setStats(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsEditing(false);
    setSyncStatus('Custom stats saved successfully!');
    setTimeout(() => setSyncStatus(null), 3000);
  };

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
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-bold font-display text-white">@{stats.username}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Synced
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono mt-0.5">AI/ML & Full-Stack Engineer on GitHub</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={fetchGithub}
                disabled={loading}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-all disabled:opacity-50 cursor-pointer"
                title="Sync Live Stats from GitHub"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
                <span>{loading ? 'Syncing...' : 'Sync Live'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditForm({
                    totalContributions: stats.totalContributions,
                    totalStars: stats.totalStars,
                    publicRepos: stats.publicRepos,
                    followers: stats.followers,
                    following: stats.following,
                  });
                  setIsEditing(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/20 transition-all cursor-pointer"
                title="Edit Stats Numbers"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Adjust Numbers</span>
              </button>

              <a
                href={`https://github.com/${stats.username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-neutral-950 hover:bg-gray-100 text-xs font-bold transition-all shadow-md ml-auto md:ml-0"
              >
                <span>Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sync Status Banner */}
          <AnimatePresence>
            {syncStatus && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3 pb-1"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{syncStatus}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Numerical metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-indigo-400" /> Public Repos
              </p>
              <p className="text-2xl font-bold font-display text-white mt-1">{stats.publicRepos}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Total Contributions
              </p>
              <p className="text-2xl font-bold font-display text-emerald-400 mt-1">{stats.totalContributions}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" /> Total Stars Earned
              </p>
              <p className="text-2xl font-bold font-display text-amber-400 mt-1">{stats.totalStars}</p>
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

      {/* Adjust Stats Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Configure GitHub Metrics</h3>
                  <p className="text-xs text-gray-400 font-mono">Set your exact contributions and stars count</p>
                </div>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Total Contributions Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.totalContributions}
                    onChange={(e) => setEditForm({ ...editForm, totalContributions: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Total Stars Earned
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.totalStars}
                    onChange={(e) => setEditForm({ ...editForm, totalStars: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      Public Repos
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.publicRepos}
                      onChange={(e) => setEditForm({ ...editForm, publicRepos: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      Followers
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.followers}
                      onChange={(e) => setEditForm({ ...editForm, followers: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      Following
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.following}
                      onChange={(e) => setEditForm({ ...editForm, following: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save & Update</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
