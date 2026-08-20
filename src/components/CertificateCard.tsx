import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ShieldCheck,
  Eye,
  Award,
  Sparkles,
  ExternalLink,
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
  const isCommunityBadge =
    cert.type === 'Community Achievement / Badge' ||
    cert.id === 'kaggle-community' ||
    cert.issuer.includes('Kaggle');

  const linkedinPostUrl = cert.linkedinPostUrl || cert.linkedinUrl;
  const certificateImage = cert.certificateImage || cert.image;
  const formattedDate = cert.date || cert.completedDate || cert.issueDate;
  const officialVerifyUrl = cert.credentialUrl || cert.verificationUrl;

  const handleOpenLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (linkedinPostUrl) {
      window.open(linkedinPostUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenVerify = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (officialVerifyUrl) {
      window.open(officialVerifyUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
    if (isCommunityBadge) {
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    }
    switch (cert.type) {
      case 'Professional Certificate':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Training Certificate':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Course Completion Certificate':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      default:
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(cert)}
      className="group relative rounded-3xl bg-neutral-900/80 border border-white/10 hover:border-indigo-500/50 hover:bg-neutral-900/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Dynamic Specular Background Glow */}
      <div
        className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
        style={{ backgroundColor: cert.accentColor || '#6366f1' }}
      />

      <div>
        {/* Real Certificate Photo Preview */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-neutral-950 border border-white/10 group-hover:border-indigo-500/50 transition-colors shadow-inner">
          <img
            src={certificateImage}
            alt={`${cert.title} Certificate`}
            loading="lazy"
            className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Quick Preview Badge Overlay */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-950/85 backdrop-blur-md text-gray-300 border border-white/10 flex items-center gap-1">
              <Eye className="w-3 h-3 text-indigo-400" /> Click to Inspect
            </span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-950/85 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Real Certificate Photo
            </span>
          </div>
        </div>

        {/* Certificate Type & Status Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${getTypeStyle()}`}
          >
            {isCommunityBadge ? <Sparkles className="w-3 h-3" /> : <FileBadge className="w-3 h-3" />}
            <span>{isCommunityBadge ? 'Community Achievement / Badge' : cert.type}</span>
          </span>

          <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>Issued {formattedDate}</span>
          </span>
        </div>

        {/* Certificate Title */}
        <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
          {cert.title}
        </h3>

        {/* Issuing Authority with Icon */}
        <div className="flex items-center gap-2.5 mt-2.5">
          <div className={`p-1.5 rounded-xl border ${badgeInfo.bg} shrink-0`}>
            <BadgeIcon className="w-4 h-4" />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-gray-200 truncate">{cert.issuer}</p>
            <p className="text-[10px] font-mono text-gray-400 truncate">Category: {cert.category}</p>
          </div>
        </div>

        {/* Skills Tagged */}
        <div className="mt-3.5 pt-3 border-t border-white/5">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">Skills Covered</p>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 4).map((s, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white/5 text-gray-300 border border-white/5 group-hover:border-white/15 transition-colors"
              >
                {s}
              </span>
            ))}
            {cert.skills.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                +{cert.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer: [ View Certificate ] + [ View on LinkedIn ↗ ] */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* View Certificate Modal Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(cert);
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-indigo-600 text-white text-xs font-semibold border border-white/10 hover:border-indigo-500 transition-all duration-200 cursor-pointer shadow-sm group-hover:bg-indigo-600/90"
        >
          <Eye className="w-4 h-4" />
          <span>View Certificate</span>
        </button>

        {/* View on LinkedIn (Exact Post URL) */}
        {linkedinPostUrl ? (
          <button
            type="button"
            onClick={handleOpenLinkedIn}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0a66c2]/20 hover:bg-[#0a66c2] text-sky-300 hover:text-white border border-[#0a66c2]/40 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            title="Open exact LinkedIn post in new tab"
          >
            <span>View on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-white/[0.03] text-gray-500 text-[11px] font-mono border border-white/5 select-none">
            LinkedIn post unavailable
          </span>
        )}
      </div>
    </motion.div>
  );
};


