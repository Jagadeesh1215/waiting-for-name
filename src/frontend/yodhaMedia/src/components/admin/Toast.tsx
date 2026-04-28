'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  isVisible: boolean
  onClose: () => void
  duration?: number
}

const iconMap = {
  success: { icon: CheckCircle2, color: 'text-green-400' },
  error: { icon: XCircle, color: 'text-red-400' },
  warning: { icon: AlertCircle, color: 'text-yellow-400' },
  info: { icon: Info, color: 'text-blue-400' },
}

export function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const { icon: Icon, color } = iconMap[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-[#0d0a1e] border border-[#2d1b69]/50 rounded-xl px-4 py-3 shadow-xl max-w-sm"
          data-ocid="admin.toast"
          role="alert"
        >
          <Icon className={`h-5 w-5 shrink-0 ${color}`} />
          <p className="text-sm text-white flex-1">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors shrink-0"
            aria-label="Dismiss"
            data-ocid="admin.toast.close_button"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
