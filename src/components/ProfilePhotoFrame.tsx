import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Sparkles,
  Zap,
  CheckCircle,
  Code2,
  Upload,
  Camera,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { useProfilePhoto } from '../utils/photoManager';

interface ProfilePhotoFrameProps {
  variant?: 'hero' | 'about' | 'compact' | 'card';
  className?: string;
  showBadges?: boolean;
}

export const ProfilePhotoFrame: React.FC<ProfilePhotoFrameProps> = ({
  variant = 'hero',
  className = '',
  showBadges = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imgHasError, setImgHasError] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(false);

  const { photoUrl, setPermanentPhoto } = useProfilePhoto();

  // Determine fallback: if photoUrl failed to load, fallback to crisp portrait svg
  const displaySrc = imgHasError || !photoUrl ? '/kishor-portrait.svg' : photoUrl;

  // Gentle 3D container tilt physics (container only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG/PNG).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      if (base64) {
        setImgHasError(false);
        await setPermanentPhoto(base64);
        setUploadSuccessMessage(true);
        setTimeout(() => setUploadSuccessMessage(false), 4000);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Compact circular monogram/avatar for header/drawers
  if (variant === 'compact') {
    return (
      <div className={`relative inline-block ${className}`}>
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-md">
          <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#090b12] flex items-center justify-center">
            <img
              src={displaySrc}
              alt={profileData.name}
              className="w-full h-full object-cover object-top"
              onError={() => setImgHasError(true)}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#020204] rounded-full shadow-[0_0_8px_#10b981]" />
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Hidden File Input for photo upload and permanent replacement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload original profile photo"
      />

      {/* Ambient Pulsing Glow behind Container */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-indigo-500/35 via-purple-500/30 to-cyan-400/35 rounded-[36px] blur-2xl pointer-events-none transform-gpu"
      />

      {/* Main Card Frame with Aspect Ratio 768:1376 Preservation */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`relative z-10 rounded-[28px] sm:rounded-[32px] p-2 bg-gradient-to-b from-white/15 via-white/5 to-white/10 border ${
          isDragging ? 'border-cyan-400 ring-4 ring-cyan-500/30' : 'border-white/15'
        } backdrop-blur-xl shadow-2xl overflow-hidden group transition-all duration-300 ${
          isHero
            ? 'w-[260px] xs:w-[290px] sm:w-[330px] md:w-[350px] lg:w-[360px]'
            : 'w-[240px] xs:w-[270px] sm:w-[300px]'
        }`}
      >
        {/* Inner Image Container Preserving 768 x 1376 Aspect Ratio and Complete Full Portrait */}
        <div
          className="relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#07090e] border border-white/10 flex items-center justify-center"
          style={{
            aspectRatio: '768 / 1376',
          }}
        >
          {/* Exact Portrait Image - object-contain preserves 100% full uncropped portrait */}
          <img
            src={displaySrc}
            alt={`${profileData.name} - Official Portrait`}
            className="w-full h-full object-contain object-center select-none transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="eager"
            onError={() => setImgHasError(true)}
            onLoad={() => setImgHasError(false)}
          />

          {/* Drag and Drop Active Overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-40 bg-indigo-950/90 backdrop-blur-sm border-2 border-dashed border-cyan-400 rounded-[20px] sm:rounded-[24px] flex flex-col items-center justify-center p-6 text-center">
              <Upload className="w-10 h-10 text-cyan-400 animate-bounce mb-2" />
              <p className="text-sm font-bold text-white font-display">Drop Photo Here</p>
              <p className="text-xs text-indigo-300 font-mono mt-1">To permanently set as profile photo</p>
            </div>
          )}

          {/* Success Notification Pill */}
          {uploadSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-4 right-4 z-40 p-2 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-mono text-center shadow-2xl backdrop-blur-md"
            >
              ✓ Profile Photo Permanently Updated!
            </motion.div>
          )}

          {/* Subtle Studio Lighting Vignette Border Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-[20px] sm:rounded-[24px] border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]" />

          {/* Sleek Corner Tech Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-400/80 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-400/80 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none" />

          {/* Permanent One-Click Photo Replace Button (Visible & Interactive) */}
          <div className="absolute top-3 right-3 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              disabled={isUploading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-indigo-600 border border-white/25 text-white text-[11px] font-mono shadow-xl backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Click to select or change original photo file"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-300" />
              <span>{isUploading ? 'Saving...' : 'Replace Photo'}</span>
            </button>
          </div>

          {/* Verified Name and Identity Badge at Bottom */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-white/10 pointer-events-none flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white font-display flex items-center gap-1.5">
                <span>{profileData.name}</span>
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400 inline" />
              </h4>
              <p className="text-[10px] sm:text-xs font-mono text-indigo-300 flex items-center gap-1 mt-0.5">
                <Code2 className="w-3 h-3 text-cyan-400" />
                <span>AI/ML &amp; Full-Stack</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                Verified
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Info Badges for Hero Presentation */}
      {showBadges && isHero && (
        <>
          {/* Top-Right Specialization Badge */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-4 -right-2 sm:-right-6 z-20 pointer-events-none transform-gpu hidden xs:block"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-neutral-950/90 backdrop-blur-md border border-indigo-500/30 text-white shadow-xl">
              <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-mono">Specialization</p>
                <p className="text-xs font-bold text-white">Generative AI &amp; ML</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom-Left Experience Badge */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            className="absolute -bottom-4 -left-2 sm:-left-6 z-20 pointer-events-none transform-gpu hidden xs:block"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-neutral-950/90 backdrop-blur-md border border-cyan-500/30 text-white shadow-xl">
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-mono">Experience</p>
                <p className="text-xs font-bold text-white">15+ Projects</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
