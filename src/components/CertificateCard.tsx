import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ShieldCheck,
  Eye,
  Award,
  Sparkles,
  ExternalLink,
  CheckCircle,
  FileBadge,
  Terminal,
  Globe,
  Database,
  BarChart3,
  Bot
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateCardProps {
  cert: CertificateItem;
  onSelect: (cert: CertificateItem) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ cert, onSelect }) => {
  const isCommunityBadge = cert.type === 'Community Achievement / Badge';

  const getIssuerBadge = () => {
    if (cert.issuer.includes('Anthropic')) {
      return { icon: Bot, bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30' };
    }
    if (cert.issuer.includes('GitHub')) {
      return { icon: Terminal, bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' };
    }
    if (cert.issuer.includes('NxtWave')) {
      return { icon: Globe, bg: 'bg-sky-500/10 text-sky-300 border-sky-500/30' };
    }
    if (cert.issuer.includes('Microsoft')) {
      return { icon: BarChart3, bg: 'bg-blue-500/10 text-blue-300 border-blue-500/30' };
    }
    if (cert.issuer.includes('Kaggle')) {
      return { icon: Database, bg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' };
    }
    return { icon: Award, bg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' };
  };

  const badgeInfo = getIssuerBadge();
  const BadgeIcon = badgeInfo.icon;

  const getTypeStyle = () => {
    switch (cert.type) {
      case 'Professional Certificate':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Training Certificate':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Course Completion Certificate':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'Community Achievement / Badge':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-3xl bg-neutral-900/80 border border-white/10 hover:border-indigo-500/40 hover:bg-neutral-900/95 backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Glow Backdrop */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none"
        style={{ backgroundColor: cert.accentColor || '#6366f1' }}
      />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${getTypeStyle()}`}>
            {isCommunityBadge ? <Sparkles className="w-3 h-3" /> : <FileBadge className="w-3 h-3" />}
            <span>{cert.type}</span>
          </span>

          <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>{cert.completedDate || cert.issueDate}</span>
          </span>
        </div>

        {/* Certificate Title */}
        <h3 className="text-lg font-bold font-display text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
          {cert.title}
        </h3>

        {/* Issuing Organization with Logo/Badge */}
        <div className="flex items-center gap-2 mt-2">
          <div className={`p-1.5 rounded-lg border ${badgeInfo.bg}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-200">{cert.issuer}</p>
            <p className="text-[10px] font-mono text-gray-400">Category: {cert.category}</p>
          </div>
        </div>

        {/* Credential Status Box */}
        <div className="mt-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-gray-400">Credential ID</span>
            <span className={`font-semibold ${cert.credentialId === 'Not provided' ? 'text-gray-400 italic' : 'text-white'}`}>
              {cert.credentialId}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-gray-400">Status</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
            </span>
          </div>
        </div>

        {/* Skills Tagged */}
        <div className="mt-4">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">Skills Covered</p>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((s, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/5 text-gray-300 border border-white/5 hover:border-white/15 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(cert)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-indigo-600 text-white text-xs font-semibold border border-white/10 hover:border-indigo-500 transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-indigo-600/90"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Certificate</span>
        </button>

        {cert.verificationUrl && (
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors"
            title="Verify Credential"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

