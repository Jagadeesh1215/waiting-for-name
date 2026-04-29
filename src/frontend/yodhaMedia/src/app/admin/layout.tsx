'use client'

import { ToastProvider } from '@/components/admin/Toast'
import { Sidebar } from '@/components/admin/Sidebar'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#0a0618] flex">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-auto">{children}</main>
      </div>
    </ToastProvider>
  )
}
