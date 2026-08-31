import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  isVisible: boolean;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  title,
  description,
  type = 'info',
  onClose,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, title, description]);

  if (!isVisible) return null;

  return (
    <div id="toast-notification-region" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-[#020204]/90 text-white backdrop-blur-xl shadow-2xl"
        >
          {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{title}</p>
            {description && (
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer rounded-lg hover:bg-white/10"
            aria-label="Dismiss toast notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

