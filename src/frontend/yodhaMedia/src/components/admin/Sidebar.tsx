'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  PenSquare,
  FileText,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
    ocid: 'admin.sidebar.dashboard.link',
  },
  {
    href: '/admin/create',
    label: 'Create Post',
    icon: PenSquare,
    exact: false,
    ocid: 'admin.sidebar.create_post.link',
  },
  {
    href: '/admin/manage',
    label: 'Manage Posts',
    icon: FileText,
    exact: false,
    ocid: 'admin.sidebar.manage_posts.link',
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-[#0d0a1e] border-r border-[#2d1b69]/50 min-h-screen transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
      data-ocid="admin.sidebar"
    >
      {/* Logo */}
      <div
        className={cn(
          'border-b border-[#2d1b69]/40 flex items-center',
          collapsed ? 'p-3 justify-center' : 'p-5 justify-between'
        )}
      >
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5 group" data-ocid="admin.sidebar.logo.link">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center shrink-0 shadow-md">
              <span className="text-[#d4a017] font-bold font-mono text-sm">Y</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#d4a017] font-display leading-tight">YODHA</p>
              <span className="text-[10px] font-semibold text-[#2d1b69] bg-[#2d1b69]/20 border border-[#2d1b69]/40 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                Admin
              </span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="flex items-center justify-center" data-ocid="admin.sidebar.logo_collapsed.link">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center shadow-md">
              <span className="text-[#d4a017] font-bold font-mono text-sm">Y</span>
            </div>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            'p-1 rounded-lg text-gray-500 hover:text-white hover:bg-[#2d1b69]/30 transition-colors',
            collapsed && 'hidden'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          data-ocid="admin.sidebar.collapse_toggle"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Collapsed expand button */}
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-3 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#2d1b69]/30 transition-colors"
          aria-label="Expand sidebar"
          data-ocid="admin.sidebar.expand_toggle"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 mt-2">
        {!collapsed && (
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl text-sm font-semibold transition-all duration-200',
                collapsed ? 'px-2 py-2.5 justify-center' : 'px-3 py-2.5',
                active
                  ? 'bg-[#2d1b69] text-white shadow-md shadow-[#2d1b69]/30'
                  : 'text-gray-400 hover:bg-[#2d1b69]/20 hover:text-white'
              )}
              data-ocid={item.ocid}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && item.label}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4a017]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className={cn('border-t border-[#2d1b69]/40', collapsed ? 'p-2' : 'p-4')}>
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-[#d4a017]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@yodhamedia.com</p>
            </div>
          </div>
        )}
        <Link
          href="/"
          className={cn(
            'flex items-center gap-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-[#2d1b69]/30 transition-colors',
            collapsed ? 'px-2 py-2.5 justify-center' : 'px-3 py-2.5'
          )}
          title={collapsed ? 'Back to Site' : undefined}
          data-ocid="admin.sidebar.back_to_site.link"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {!collapsed && 'Back to Site'}
        </Link>
      </div>
    </aside>
  )
}
