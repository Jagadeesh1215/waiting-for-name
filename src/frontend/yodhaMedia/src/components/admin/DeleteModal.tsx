'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Trash2, X } from 'lucide-react'

interface DeleteModalProps {
  isOpen: boolean
  title?: string
  onConfirm: () => void
  onCancel: () => void
  isDeleting?: boolean
}

export function DeleteModal({
  isOpen,
  title = 'this post',
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
            data-ocid="delete_modal.overlay"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-[#0d0a1e] border border-[#2d1b69]/50 rounded-2xl p-8 shadow-2xl shadow-black/50 text-center"
            data-ocid="delete_modal.dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onCancel}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
              aria-label="Close"
              data-ocid="delete_modal.close_button"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 bg-red-900/30 border border-red-700/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2 font-display">
              Delete Blog Post?
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-7">
              You&apos;re about to permanently delete{' '}
              <strong className="text-white">&ldquo;{title}&rdquo;</strong>.
              This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                data-ocid="delete_modal.cancel_button"
                onClick={onCancel}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl border border-[#2d1b69]/60 text-gray-300 text-sm font-medium hover:bg-[#2d1b69]/20 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                data-ocid="delete_modal.confirm_button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Post
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
