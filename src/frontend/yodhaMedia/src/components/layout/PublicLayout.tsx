'use client'

import { useState, type ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingComponents } from './FloatingComponents'
import { ConsultationModal } from './ConsultationModal'
import { ScrollProgressBar } from '@/lib/animations'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [isConsultationOpen, setConsultationOpen] = useState(false)

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--background)]">
      {/* Scroll progress indicator — gold gradient line at top */}
      <ScrollProgressBar />

      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
      <FloatingComponents onOpenConsultation={() => setConsultationOpen(true)} />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  )
}
