'use client'

import { motion, AnimatePresence } from 'motion/react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
            data-ocid="delete_modal.overlay"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-[#0d0a1e] border border-[#2d1b69]/50 rounded-2xl p-6 shadow-2xl"
            data-ocid="delete_modal.dialog"
          >
            <button
              type="button"
              onClick={onCancel}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
              aria-label="Close"
              data-ocid="delete_modal.close_button"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Delete Post</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Are you sure you want to delete <span className="text-white font-medium">&ldquo;{title}&rdquo;</span>?
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="text-gray-400 hover:text-white hover:bg-[#2d1b69]/30"
                data-ocid="delete_modal.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={onConfirm}
                disabled={isDeleting}
                data-ocid="delete_modal.confirm_button"
              >
                {isDeleting ? 'Deleting...' : 'Delete Post'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
