'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration?: number
}

// ── Icon + style map ───────────────────────────────────────────
const TOAST_STYLES: Record<ToastType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  success: {
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-950/80',
    border: 'border-green-700/40',
  },
  error: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-950/80',
    border: 'border-red-700/40',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-950/80',
    border: 'border-yellow-700/40',
  },
  info: {
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-950/80',
    border: 'border-blue-700/40',
  },
}

// ── Single Toast ───────────────────────────────────────────────
interface SingleToastProps {
  toast: ToastItem
  onClose: (id: string) => void
}

function SingleToast({ toast, onClose }: SingleToastProps) {
  const { icon: Icon, color, bg, border } = TOAST_STYLES[toast.type]
  const duration = toast.duration ?? 4000
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => onClose(toast.id), duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [toast.id, duration, onClose])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 64, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 64, scale: 0.95 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      role="alert"
      aria-live="polite"
      data-ocid="admin.toast"
      className={[
        'flex items-start gap-3 w-80 max-w-full rounded-xl px-4 py-3.5 shadow-2xl border backdrop-blur-md',
        bg,
        border,
      ].join(' ')}
    >
      <Icon className={['h-5 w-5 shrink-0 mt-0.5', color].join(' ')} />
      <p className="text-sm text-white flex-1 leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="p-1 rounded-lg text-gray-500 hover:text-white transition-colors shrink-0 mt-0.5"
        aria-label="Dismiss"
        data-ocid="admin.toast.close_button"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

// ── Toast Container ────────────────────────────────────────────
interface ToastContainerProps {
  toasts: ToastItem[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div
      className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <SingleToast toast={t} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── useToast hook (standalone) ─────────────────────────────────
export function useToastState() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

// ── Toast Context (optional provider pattern) ──────────────────
interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, addToast, removeToast } = useToastState()

  const ctx: ToastContextValue = {
    toast: addToast,
    success: (m, d) => addToast(m, 'success', d),
    error: (m, d) => addToast(m, 'error', d),
    warning: (m, d) => addToast(m, 'warning', d),
    info: (m, d) => addToast(m, 'info', d),
  }

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

// ── Legacy single-toast component (backwards compat) ──────────
interface ToastProps {
  message: string
  type?: ToastType
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }: ToastProps) {
  const { icon: Icon, color, bg, border } = TOAST_STYLES[type]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isVisible) {
      timerRef.current = setTimeout(onClose, duration)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={[
            'fixed top-20 right-4 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl max-w-sm border backdrop-blur-md',
            bg,
            border,
          ].join(' ')}
          data-ocid="admin.toast"
          role="alert"
        >
          <Icon className={['h-5 w-5 shrink-0', color].join(' ')} />
          <p className="text-sm text-white flex-1">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:text-white transition-colors shrink-0"
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
