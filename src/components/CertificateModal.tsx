import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
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
  Bot,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  FileText
} from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  cert: CertificateItem | null;
  certificatesList?: CertificateItem[];
  onClose: () => void;
  onNavigate?: (cert: CertificateItem) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  cert,
  certificatesList = [],
  onClose,
  onNavigate
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'image' | 'pdf' | 'details'>('image');
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Reset zoom & loading states when cert changes
  useEffect(() => {
    if (cert) {
      setZoomLevel(1);
      setImageLoading(true);
      setImageError(false);
      setActiveTab(cert.pdfUrl ? 'pdf' : 'image');
    }
  }, [cert?.id]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!cert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleZoomReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cert, certificatesList]);

  if (!cert) return null;

  const currentIndex = certificatesList.findIndex((c) => c.id === cert.id);
  const hasPrev = certificatesList.length > 1;
  const hasNext = certificatesList.length > 1;

  const handlePrev = () => {
    if (!onNavigate || certificatesList.length <= 1) return;
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : certificatesList.length - 1;
    onNavigate(certificatesList[prevIdx]);
  };

  const handleNext = () => {
    if (!onNavigate || certificatesList.length <= 1) return;
    const nextIdx = currentIndex < certificatesList.length - 1 ? currentIndex + 1 : 0;
    onNavigate(certificatesList[nextIdx]);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.6));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleCopy = () => {
    const text = `${cert.title} issued to Kishor S V by ${cert.issuer} (${cert.completedDate || cert.issueDate})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  const isCommunity = cert.type === 'Community Achievement / Badge';
  const verifyLink = cert.verificationUrl || cert.credentialUrl;

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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full bg-neutral-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-gray-100 flex flex-col backdrop-blur-2xl transition-all duration-300 ${
            isFullscreen ? 'max-w-[98vw] h-[96vh] my-1' : 'max-w-5xl my-4 max-h-[92vh]'
          }`}
        >
          {/* Top Header & Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-neutral-900/90 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <IssuerIcon className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h3 className="text-sm sm:text-base font-bold text-white font-display truncate">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.completedDate || cert.issueDate}</span>
                  {certificatesList.length > 1 && (
                    <>
                      <span>•</span>
                      <span className="text-indigo-400 font-semibold">
                        {currentIndex + 1} of {certificatesList.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Viewer Navigation & Utility Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Previous / Next Buttons */}
              {certificatesList.length > 1 && (
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-1.5 sm:p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    title="Previous Certificate (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-1.5 sm:p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    title="Next Certificate (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-2 py-1 text-[11px] font-mono text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  title="Reset Zoom (0)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Copy Details */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10 text-xs flex items-center gap-1"
                title="Copy Credential Summary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden md:inline font-mono text-[11px]">{copied ? 'Copied' : 'Share'}</span>
              </button>

              {/* Print Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="hidden md:flex p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
                title="Print Certificate"
              >
                <Printer className="w-4 h-4" />
              </button>

              {/* Fullscreen Modal Toggle */}
              <button
                type="button"
                onClick={handleToggleFullscreen}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Modal Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white transition-colors border border-white/15"
                title="Close Viewer (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* View Selector (if PDF or image both available) */}
            {cert.pdfUrl && (
              <div className="flex items-center justify-center gap-2">
                <div className="inline-flex p-1 rounded-xl bg-neutral-900 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('image')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'image'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Image View
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pdf')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'pdf'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    PDF Document
                  </button>
                </div>
              </div>
            )}

            {/* Certificate Visual Display Stage */}
            <div className="relative w-full rounded-2xl bg-neutral-900/60 border border-white/10 overflow-hidden flex items-center justify-center min-h-[340px] sm:min-h-[460px] p-2 sm:p-4">
              {/* Image Loading Spinner */}
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/80 backdrop-blur-sm z-10">
                  <div className="w-10 h-10 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                  <p className="text-xs font-mono text-gray-400">Loading verified certificate...</p>
                </div>
              )}

              {/* Broken Image Error Fallback */}
              {imageError ? (
                <div className="p-8 text-center max-w-md mx-auto space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Certificate unavailable</h4>
                  <p className="text-xs text-gray-400">
                    Certificate unavailable — please check the certificate file at <code className="text-indigo-300 font-mono">{cert.image}</code>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setImageError(false);
                      setImageLoading(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Loading</span>
                  </button>
                </div>
              ) : activeTab === 'pdf' && cert.pdfUrl ? (
                <iframe
                  src={cert.pdfUrl}
                  title={cert.title}
                  className="w-full h-[520px] rounded-xl border border-white/10 bg-white"
                />
              ) : (
                <div className="overflow-auto max-w-full max-h-full flex items-center justify-center">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                    animate={{ scale: zoomLevel }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-full max-w-4xl h-auto rounded-xl shadow-2xl border border-white/10 object-contain origin-center select-none"
                    style={{ transformOrigin: 'center center' }}
                  />
                </div>
              )}

              {/* Mobile Quick Zoom Bar */}
              <div className="sm:hidden absolute bottom-3 right-3 flex items-center bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-xl p-1 z-20">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 text-gray-300 hover:text-white"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[10px] font-mono text-gray-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 text-gray-300 hover:text-white"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Certificate Details & LinkedIn Experience Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left Column: Core Info & Verification Status */}
              <div className="md:col-span-2 space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                      Credential Details
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-gray-400 block">Recipient</span>
                      <span className="text-xs font-bold text-white mt-0.5 block">Kishor S V</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-gray-400 block">Issue Date</span>
                      <span className="text-xs font-bold text-white mt-0.5 block">
                        {cert.completedDate || cert.issueDate}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-gray-400 block">Credential ID</span>
                      <span className={`text-xs font-bold mt-0.5 block ${cert.credentialId === 'Not provided' ? 'text-gray-400 italic' : 'text-white'}`}>
                        {cert.credentialId}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-gray-400 block">Program Type</span>
                      <span className="text-xs font-bold text-white mt-0.5 block">{cert.type}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    Skills Covered
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions & Verified Links */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                    Verification &amp; Links
                  </h4>

                  {verifyLink ? (
                    <a
                      href={verifyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Credential ↗</span>
                    </a>
                  ) : (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[11px] font-mono text-gray-400">
                        Official Issuer Certificate Document
                      </p>
                    </div>
                  )}

                  {cert.linkedinUrl && (
                    <a
                      href={cert.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-sky-300 border border-[#0077b5]/40 text-xs font-semibold transition-colors"
                    >
                      <span>View on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={cert.image}
                    download={`${cert.id}.svg`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Certificate Asset</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 text-center">
                  <p className="text-[11px] font-mono text-gray-400">
                    Need verification or reference details for recruitment?
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-block mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Contact Kishor directly →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
