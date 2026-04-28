'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  BarChart2,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/create', label: 'Create Post', icon: PlusCircle },
  { href: '/blog', label: 'View Blog', icon: FileText },
  { href: '#analytics', label: 'Analytics', icon: BarChart2 },
  { href: '#settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex w-64 flex-col bg-[#0d0a1e] border-r border-[#2d1b69]/50 min-h-screen"
      data-ocid="admin.sidebar"
    >
      {/* Logo */}
      <div className="p-6 border-b border-[#2d1b69]/40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
            <span className="text-[#d4a017] font-bold font-mono">Y</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#d4a017] font-display">yodhaMedia</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-[#2d1b69] text-white'
                  : 'text-gray-400 hover:bg-[#2d1b69]/30 hover:text-white'
              )}
              data-ocid={`admin.sidebar.${item.label.toLowerCase().replace(/\s/g, '_')}.link`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2d1b69]/40">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
          data-ocid="admin.sidebar.logout.link"
        >
          <LogOut className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </aside>
  )
}
