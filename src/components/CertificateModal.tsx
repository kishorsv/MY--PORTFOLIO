import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Award,
  ExternalLink,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <div id="cert-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#020204]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-gray-100 flex flex-col backdrop-blur-xl"
        >
          {/* Header image preview */}
          <div className="relative h-48 w-full bg-black/50 overflow-hidden">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors cursor-pointer border border-white/10"
              aria-label="Close certificate modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
                {cert.category}
              </span>
              <h3 className="text-xl font-bold font-display text-white mt-2">{cert.title}</h3>
              <p className="text-xs text-gray-300 font-medium">{cert.issuer}</p>
            </div>
          </div>

          {/* Details body */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-gray-400 font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Issue Date
                </p>
                <p className="text-white font-semibold mt-1">{cert.issueDate}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-gray-400 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Credential ID
                </p>
                <p className="text-white font-mono font-semibold mt-1 truncate">{cert.credentialId}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase font-display tracking-wider mb-2.5">
                Validated Competencies & Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 flex items-center gap-1.5 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors border border-white/10 cursor-pointer"
              >
                Close
              </button>
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verify Credential</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
