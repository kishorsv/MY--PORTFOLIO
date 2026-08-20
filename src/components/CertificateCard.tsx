import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ExternalLink,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateCardProps {
  cert: CertificateItem;
  onSelect: (cert: CertificateItem) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ cert, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(cert)}
      className="group rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md p-6 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm">
            {cert.category}
          </span>
          <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {cert.issueDate}
          </span>
        </div>

        <h3 className="text-base font-bold font-display text-white group-hover:text-indigo-300 transition-colors flex items-start justify-between gap-2">
          <span>{cert.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-400 shrink-0 mt-1" />
        </h3>

        <p className="text-xs text-gray-400 mt-1 font-medium">{cert.issuer}</p>

        <div className="mt-3.5 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">ID: {cert.credentialId}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-white/10">
        {cert.skills.slice(0, 3).map((s, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/5"
          >
            {s}
          </span>
        ))}
        {cert.skills.length > 3 && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
            +{cert.skills.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
};
