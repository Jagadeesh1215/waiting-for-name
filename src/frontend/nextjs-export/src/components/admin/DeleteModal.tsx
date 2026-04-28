'use client';

import { Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ title, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        data-ocid="delete.dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#12344d]/50 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
          className="bg-white rounded-2xl p-10 w-full max-w-sm text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-600">
            <Trash2 size={22} />
          </div>
          <h3 className="text-xl font-extrabold text-[#12344d] mb-2">
            Delete Post?
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-7">
            You&apos;re about to permanently delete{' '}
            <strong className="text-[#12344d]">&ldquo;{title}&rdquo;</strong>.
            This cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              data-ocid="delete.cancel_button"
              onClick={onCancel}
              className="px-5 py-2 rounded-xl border border-slate-200 text-[#12344d] text-sm font-medium hover:bg-slate-50 transition-smooth"
            >
              Cancel
            </button>
            <button
              type="button"
              data-ocid="delete.confirm_button"
              onClick={onConfirm}
              className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-smooth"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
