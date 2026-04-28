'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

interface ToastProps {
  msg: string;
  type: 'ok' | 'err';
  onClose: () => void;
}

export function Toast({ msg, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'ok' ? 'bg-emerald-700' : 'bg-red-600';

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="toast"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-sm font-medium ${bg}`}
      >
        <span>{msg}</span>
        <button
          type="button"
          data-ocid="toast.close_button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
