'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Bell, ChevronDown, LogOut, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOBILE_NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/create', label: 'Create Post' },
  { href: '/admin/manage', label: 'Manage Posts' },
  { href: '/blog', label: 'View Blog' },
]

const BREADCRUMB_MAP: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/create': 'Create Post',
  '/admin/manage': 'Manage Posts',
}

interface TopBarProps {
  title?: string
  onSearch?: (query: string) => void
  searchPlaceholder?: string
}

export function TopBar({ title, onSearch, searchPlaceholder = 'Search...' }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()

  const pageTitle = title ?? BREADCRUMB_MAP[pathname] ?? 'Admin'

  // Build breadcrumbs
  const crumbs = [{ label: 'Admin', href: '/admin' }]
  if (pathname !== '/admin') {
    const segment = BREADCRUMB_MAP[pathname]
    if (segment) crumbs.push({ label: segment, href: pathname })
  }

  return (
    <>
      <header
        className="h-16 bg-[#0d0a1e] border-b border-[#2d1b69]/50 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"
        data-ocid="admin.topbar"
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            data-ocid="admin.topbar.hamburger.button"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-base font-bold text-white font-display leading-tight">{pageTitle}</h1>
            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1.5" aria-label="Breadcrumbs">
              {crumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-[#2d1b69] text-xs">/</span>}
                  <Link
                    href={crumb.href}
                    className={cn(
                      'text-xs transition-colors',
                      i === crumbs.length - 1
                        ? 'text-[#d4a017] font-medium'
                        : 'text-gray-500 hover:text-gray-300'
                    )}
                    data-ocid={`admin.topbar.breadcrumb_${crumb.label.toLowerCase().replace(/\s/g, '_')}.link`}
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {onSearch && (
            <div className="hidden sm:block">
              <input
                type="search"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="w-56 h-9 rounded-lg border border-[#2d1b69]/60 bg-[#160d2e] px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2d1b69] transition"
                data-ocid="admin.topbar.search.input"
              />
            </div>
          )}

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
            aria-label="Notifications"
            data-ocid="admin.topbar.notifications.button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#d4a017] ring-2 ring-[#0d0a1e]" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen((o) => !o)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 rounded-xl hover:bg-[#2d1b69]/30 transition-colors"
              aria-expanded={userMenuOpen}
              aria-label="User menu"
              data-ocid="admin.topbar.user_menu.button"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
                <span className="text-xs font-bold text-[#d4a017]">A</span>
              </div>
              <span className="hidden sm:block text-sm text-gray-300 font-medium">Admin</span>
              <ChevronDown className={cn('h-3.5 w-3.5 text-gray-500 transition-transform', userMenuOpen && 'rotate-180')} />
            </button>

            {userMenuOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setUserMenuOpen(false)}
                  aria-label="Close menu"
                />
                <div
                  className="absolute right-0 top-full mt-2 w-48 bg-[#0d0a1e] border border-[#2d1b69]/50 rounded-xl shadow-2xl z-50 overflow-hidden"
                  data-ocid="admin.topbar.user_dropdown_menu"
                >
                  <div className="px-4 py-3 border-b border-[#2d1b69]/30">
                    <p className="text-sm font-semibold text-white">Admin User</p>
                    <p className="text-xs text-gray-500">admin@yodhamedia.com</p>
                  </div>
                  <div className="py-1.5">
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
                      data-ocid="admin.topbar.profile.button"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
                      data-ocid="admin.topbar.logout.link"
                    >
                      <LogOut className="h-4 w-4" />
                      Back to Site
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0d0a1e] border-r border-[#2d1b69]/50 p-5 lg:hidden flex flex-col"
            data-ocid="admin.mobile_nav"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
                  <span className="text-[#d4a017] font-bold font-mono text-sm">Y</span>
                </div>
                <span className="text-[#d4a017] font-bold font-display">YODHA Admin</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#2d1b69]/30 transition-colors"
                aria-label="Close"
                data-ocid="admin.mobile_nav.close_button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {onSearch && (
              <input
                type="search"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full h-9 rounded-lg border border-[#2d1b69]/60 bg-[#160d2e] px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2d1b69] mb-4"
                data-ocid="admin.mobile_nav.search.input"
              />
            )}

            <nav className="flex-1 space-y-1">
              {MOBILE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
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

            <div className="pt-4 border-t border-[#2d1b69]/30 mt-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#d4a017]">A</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-xs text-gray-500">admin@yodhamedia.com</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
