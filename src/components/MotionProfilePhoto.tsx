import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  CheckCircle,
  Eye,
  Camera,
  RotateCw,
  X,
  Upload,
  Link as LinkIcon,
  ShieldCheck,
  Code2,
  Terminal,
  Cpu,
  Download,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface MotionProfilePhotoProps {
  variant?: 'hero' | 'about' | 'compact';
  className?: string;
  showBadges?: boolean;
}

export const MotionProfilePhoto: React.FC<MotionProfilePhotoProps> = ({
  variant = 'hero',
  className = '',
  showBadges = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Load custom photo if saved in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_custom_photo');
      if (saved) {
        setCustomPhotoUrl(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const activePhoto = customPhotoUrl || profileData.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85';

  // 3D Tilt & Multi-layer Parallax Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  // 3D rotation transforms
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['9deg', '-9deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-9deg', '9deg']);

  // Parallax layers
  const photoParallaxX = useTransform(mouseXSpring, [-0.5, 0.5], ['-8px', '8px']);
  const photoParallaxY = useTransform(mouseYSpring, [-0.5, 0.5], ['-8px', '8px']);
  
  const badge1ParallaxX = useTransform(mouseXSpring, [-0.5, 0.5], ['14px', '-14px']);
  const badge1ParallaxY = useTransform(mouseYSpring, [-0.5, 0.5], ['14px', '-14px']);
  
  const badge2ParallaxX = useTransform(mouseXSpring, [-0.5, 0.5], ['-16px', '16px']);
  const badge2ParallaxY = useTransform(mouseYSpring, [-0.5, 0.5], ['-16px', '16px']);

  // Dynamic specular lighting position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['10%', '90%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleSavePhotoUrl = (url: string) => {
    if (!url.trim()) return;
    setCustomPhotoUrl(url.trim());
    try {
      localStorage.setItem('portfolio_custom_photo', url.trim());
    } catch {
      // ignore
    }
    setShowUrlInput(false);
    setInputUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setCustomPhotoUrl(result);
          try {
            localStorage.setItem('portfolio_custom_photo', result);
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomPhotoUrl('');
    try {
      localStorage.removeItem('portfolio_custom_photo');
    } catch {
      // ignore
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`relative inline-block ${className}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-12 h-12 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-md cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            src={activePhoto}
            alt={profileData.name}
            className="w-full h-full object-cover rounded-[14px]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#020204] rounded-full" />
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <>
      <div
        className={`relative select-none flex items-center justify-center ${className}`}
        style={{ perspective: 1200 }}
      >
        {/* Ambient Pulsing Glow Underneath */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-6 bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/30 rounded-[44px] blur-3xl pointer-events-none"
        />

        {/* Orbiting Tech Ring with Particles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-8 rounded-full border border-indigo-500/15 pointer-events-none hidden sm:block"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
        </motion.div>

        {/* Outer Motion Card Frame */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setShowModal(true)}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.025 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className={`relative z-10 cursor-pointer rounded-3xl p-1.5 bg-gradient-to-br from-indigo-500/30 via-white/10 to-cyan-500/20 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden group ${
            isHero ? 'w-[290px] sm:w-[350px] md:w-[380px]' : 'w-[260px] sm:w-[320px]'
          }`}
        >
          {/* Inner Photo Frame with Parallax Inner Canvas */}
          <div className="relative w-full aspect-[3/4] rounded-[22px] overflow-hidden bg-neutral-950">
            {/* Parallax Photo Layer */}
            <motion.div
              style={{
                x: photoParallaxX,
                y: photoParallaxY,
                scale: 1.08,
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activePhoto}
                alt={profileData.name}
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] transition-all duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Continuous Slow-Moving Holographic Gradient Shimmer Overlay */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 group-hover:opacity-85 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(120deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.15) 30%, rgba(6,182,212,0.25) 60%, rgba(99,102,241,0.3) 100%)',
                backgroundSize: '250% 250%',
                animation: 'gradientMove 8s ease infinite',
              }}
            />

            {/* Subtle Vignette & Contrast Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Dynamic Interactive Glare / Specular Highlight */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-300"
              style={{
                background: `radial-gradient(450px circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), rgba(99,102,241,0.15) 40%, transparent 70%)`,
              }}
            />

            {/* Cyberpunk HUD Corner Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none transition-transform duration-300 group-hover:scale-110" />

            {/* Top Status Header Tag */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-gray-300 shadow-sm">
                <Cpu className="w-3 h-3 text-indigo-400" />
                <span>AI Core v2.4</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Verified Active</span>
              </div>
            </div>

            {/* Interactive Hover Prompt Overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 p-4 text-white">
              <div className="p-3.5 rounded-2xl bg-indigo-600/40 backdrop-blur-md border border-indigo-400/50 shadow-xl transform group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase font-mono text-indigo-200">
                View Full Portrait
              </span>
              <span className="text-[11px] text-gray-300 font-mono bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Click to inspect &amp; customize
              </span>
            </div>

            {/* Bottom Identity Card Banner */}
            <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-white/15 pointer-events-none flex items-center justify-between shadow-lg">
              <div>
                <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                  <span>{profileData.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400 inline" />
                </h4>
                <p className="text-[11px] font-mono text-indigo-300 flex items-center gap-1 mt-0.5">
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  <span>AI/ML &amp; Full-Stack</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Engineer
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Parallax Floating Badges */}
        {showBadges && (
          <>
            {/* Top-Right Floating Badge: AI & LLM Specialist */}
            <motion.div
              style={{
                x: badge1ParallaxX,
                y: badge1ParallaxY,
              }}
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-5 -right-4 sm:-right-8 z-20 pointer-events-none"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-indigo-500/40 text-white shadow-2xl shadow-indigo-500/20">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Focus</p>
                  <p className="text-xs font-extrabold text-white">Generative AI &amp; ML</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom-Left Floating Badge: 15+ Live Projects */}
            <motion.div
              style={{
                x: badge2ParallaxX,
                y: badge2ParallaxY,
              }}
              animate={{
                y: [6, -6, 6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              className="absolute -bottom-5 -left-4 sm:-left-8 z-20 pointer-events-none"
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-cyan-500/40 text-white shadow-2xl shadow-cyan-500/20">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">Delivered</p>
                  <p className="text-xs font-extrabold text-white">15+ Live Deployments</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* High-Resolution Interactive Lightbox & Customizer Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/90">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-sm sm:text-base font-bold font-display">
                    {profileData.name} — Verified Profile Portrait
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-500/80 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                {/* Large Preview */}
                <div className="relative w-full sm:w-1/2 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-xl">
                  <img
                    src={activePhoto}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                    <p className="text-xs font-mono text-indigo-300 font-medium">
                      {profileData.headline}
                    </p>
                  </div>
                </div>

                {/* Details & Custom Photo Actions */}
                <div className="w-full sm:w-1/2 space-y-4 text-left">
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-1.5">
                      <span>{profileData.name}</span>
                      <CheckCircle className="w-4 h-4 text-indigo-400" />
                    </h4>
                    <p className="text-xs font-mono text-indigo-400 mt-0.5">
                      {profileData.titles.join(' • ')}
                    </p>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed font-normal">
                      {profileData.bio}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                    <p className="text-xs font-semibold text-gray-200 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                      <Camera className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Customize Portrait</span>
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Upload your own photo file or paste an image link to personalize the hero portrait.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {/* Upload File Button */}
                      <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {/* Enter URL Button */}
                      <button
                        onClick={() => setShowUrlInput((prev) => !prev)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>Image URL</span>
                      </button>

                      {/* Reset to Default */}
                      {customPhotoUrl && (
                        <button
                          onClick={handleResetPhoto}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold cursor-pointer transition-colors"
                          title="Reset to default portrait"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    {showUrlInput && (
                      <div className="mt-2 flex gap-1.5">
                        <input
                          type="url"
                          placeholder="Paste image link (https://...)"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/20 text-xs text-white focus:outline-none focus:border-indigo-400 font-mono"
                        />
                        <button
                          onClick={() => handleSavePhotoUrl(inputUrl)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
