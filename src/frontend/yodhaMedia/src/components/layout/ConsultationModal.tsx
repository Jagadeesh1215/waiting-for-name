'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
  message: z.string().min(10, 'Please describe your needs (min 10 chars)'),
})

type FormData = z.infer<typeof schema>

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    setTimeout(() => {
      setSubmitted(false)
      reset()
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            data-ocid="consultation_modal.overlay"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl"
            data-ocid="consultation_modal.dialog"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-lg hover:bg-[#2d1b69]/10 transition-colors"
              aria-label="Close modal"
              data-ocid="consultation_modal.close_button"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#2d1b69] dark:text-[#d4a017] mb-2">
                  Thank you!
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold font-display text-[#2d1b69] dark:text-[#d4a017]">
                    Free Consultation
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">
                    Tell us about your business and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      placeholder="Dr. Sharma / Rahul Kumar"
                      {...register('name')}
                      className="mt-1"
                      data-ocid="consultation_modal.name.input"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1" data-ocid="consultation_modal.name.field_error">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className="mt-1"
                      data-ocid="consultation_modal.email.input"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1" data-ocid="consultation_modal.email.field_error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Organization / Clinic</Label>
                    <Input
                      id="company"
                      placeholder="Apollo Hospitals / Sunrise Clinic"
                      {...register('company')}
                      className="mt-1"
                      data-ocid="consultation_modal.company.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">What do you need? *</Label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="I want to increase patient appointments through digital marketing..."
                      {...register('message')}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[#2d1b69] resize-none"
                      data-ocid="consultation_modal.message.textarea"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1" data-ocid="consultation_modal.message.field_error">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full"
                    disabled={isSubmitting}
                    data-ocid="consultation_modal.submit_button"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Consultation'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
