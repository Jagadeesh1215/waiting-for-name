'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Bell, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const mobileNavItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/create', label: 'Create Post' },
  { href: '/blog', label: 'View Blog' },
]

interface TopBarProps {
  title?: string
  onSearch?: (query: string) => void
  searchPlaceholder?: string
}

export function TopBar({ title = 'Admin', onSearch, searchPlaceholder = 'Search...' }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header
        className="h-16 bg-[#0d0a1e] border-b border-[#2d1b69]/50 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"
        data-ocid="admin.topbar"
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
            data-ocid="admin.topbar.hamburger.button"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-white font-display">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {onSearch && (
            <div className="hidden sm:block w-64">
              <Input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-[#160d2e] border-[#2d1b69] text-white placeholder:text-gray-500 h-9"
                data-ocid="admin.topbar.search.input"
              />
            </div>
          )}
          <button
            type="button"
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
            aria-label="Notifications"
            data-ocid="admin.topbar.notifications.button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#d4a017]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
            <span className="text-xs font-bold text-[#d4a017]">A</span>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 lg:hidden w-full cursor-default"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div
            className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-[#0d0a1e] border-r border-[#2d1b69]/50 p-4 lg:hidden"
            data-ocid="admin.mobile_nav"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#d4a017] font-bold font-display">yodhaMedia</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
                aria-label="Close"
                data-ocid="admin.mobile_nav.close_button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {onSearch && (
              <div className="mb-4">
                <Input
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-[#160d2e] border-[#2d1b69] text-white placeholder:text-gray-500"
                  data-ocid="admin.mobile_nav.search.input"
                >
                  <Search className="h-4 w-4" />
                </Input>
              </div>
            )}
            <nav className="space-y-1">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-[#2d1b69] text-white'
                      : 'text-gray-400 hover:bg-[#2d1b69]/30 hover:text-white'
                  )}
                  data-ocid={`admin.mobile_nav.${item.label.toLowerCase().replace(/\s/g, '_')}.link`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
