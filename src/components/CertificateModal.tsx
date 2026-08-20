import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Maximize2,
  Minimize2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Award,
  Sparkles,
  Printer,
  Copy,
  Check,
  FileBadge,
  Terminal,
  Globe,
  Database,
  BarChart3,
  Bot
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!cert) return null;

  const isCommunity = cert.type === 'Community Achievement / Badge';

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${cert.title} issued to Kishor S V by ${cert.issuer} (${cert.completedDate || cert.issueDate})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getIssuerIcon = () => {
    if (cert.issuer.includes('Anthropic')) return Bot;
    if (cert.issuer.includes('GitHub')) return Terminal;
    if (cert.issuer.includes('NxtWave')) return Globe;
    if (cert.issuer.includes('Microsoft')) return BarChart3;
    if (cert.issuer.includes('Kaggle')) return Database;
    return Award;
  };

  const IssuerIcon = getIssuerIcon();

  return (
    <AnimatePresence>
      <div
        id="cert-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full bg-neutral-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-gray-100 flex flex-col backdrop-blur-2xl transition-all duration-300 ${
            isFullscreen ? 'max-w-6xl my-2 max-h-[96vh]' : 'max-w-3xl my-4 max-h-[90vh]'
          }`}
        >
          {/* Modal Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/90 sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileBadge className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                  Verified Credential Document
                </h4>
                <p className="text-[11px] font-mono text-gray-400">{cert.issuer}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10 text-xs flex items-center gap-1 cursor-pointer"
                title="Copy Credential Details"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline font-mono text-[11px]">{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10 text-xs hidden sm:flex items-center gap-1 cursor-pointer"
                title="Print or Save Certificate"
              >
                <Printer className="w-4 h-4" />
                <span className="font-mono text-[11px]">Print</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 cursor-pointer ml-1"
                aria-label="Close certificate modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Container */}
          <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
            {/* High-Resolution Certificate Document Canvas */}
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-2 border-amber-500/20 bg-gradient-to-b from-neutral-900/90 via-neutral-900/95 to-neutral-950 shadow-2xl text-center overflow-hidden">
              {/* Ornamental Certificate Watermark & Border Accents */}
              <div className="absolute inset-2 sm:inset-4 border border-dashed border-amber-500/20 rounded-xl sm:rounded-2xl pointer-events-none" />
              <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

              {/* Certificate Header Stamp */}
              <div className="flex flex-col items-center justify-center gap-2 mb-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-inner">
                  <IssuerIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-400/90 font-bold">
                  {cert.issuer}
                </p>
                <p className="text-[11px] font-mono text-gray-400">
                  {isCommunity ? 'Community Recognition' : 'Official Certificate of Completion'}
                </p>
              </div>

              {/* Certificate Salutation */}
              <p className="text-xs sm:text-sm text-gray-400 italic font-serif my-2">
                This credential is presented to
              </p>

              {/* Recipient Name */}
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-amber-200 tracking-tight my-2">
                Kishor S V
              </h2>

              <p className="text-xs text-gray-400 max-w-lg mx-auto mb-4">
                for successful completion and mastery of
              </p>

              {/* Certificate Title Banner */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 max-w-2xl mx-auto shadow-inner">
                <h3 className="text-lg sm:text-2xl font-bold text-white font-display">
                  {cert.title}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {cert.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {cert.type}
                  </span>
                </div>
              </div>

              {/* Certificate Bottom Badges / Date / Seal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 text-left">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Completion / Issue Date</span>
                  <span className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {cert.completedDate || cert.issueDate}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Credential ID</span>
                  <span className="text-xs font-mono text-gray-300 mt-1 block truncate">
                    {cert.credentialId}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase">Status</span>
                  <span className="text-xs font-bold text-emerald-300 mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Confirmed Record
                  </span>
                </div>
              </div>
            </div>

            {/* Validated Skills & Modules */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                Skills Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white/5 text-gray-200 border border-white/10 flex items-center gap-1.5 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

