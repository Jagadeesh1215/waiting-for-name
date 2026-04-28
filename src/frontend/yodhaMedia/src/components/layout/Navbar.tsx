'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { href: '/services/seo-search', label: 'SEO & Search' },
      { href: '/services/social-media', label: 'Social Media' },
      { href: '/services/content-marketing', label: 'Content Marketing' },
      { href: '/services/brand-strategy', label: 'Brand Strategy' },
      { href: '/services/analytics', label: 'Analytics' },
      { href: '/services/healthcare-marketing', label: 'Healthcare Marketing' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/business-hub', label: 'Business Hub' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { isDark, toggle } = useDarkMode()
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-lg'
            : 'bg-transparent'
        )}
        data-ocid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" data-ocid="navbar.logo.link">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-[#d4a017] font-bold text-lg font-mono">Y</span>
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-[#2d1b69] to-[#d4a017] bg-clip-text text-transparent dark:from-[#d4a017] dark:to-[#f0c040]">
                yodhaMedia
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-[#d4a017] hover:bg-[#2d1b69]/5',
                        pathname.startsWith('/services') ? 'text-[#d4a017]' : 'text-[var(--foreground)]'
                      )}
                      data-ocid="navbar.services.dropdown"
                    >
                      {link.label}
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', servicesOpen && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl p-1"
                          data-ocid="navbar.services.dropdown_menu"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2 text-sm rounded-lg hover:bg-[#2d1b69]/10 hover:text-[#d4a017] transition-colors"
                              data-ocid={`navbar.services.${child.label.toLowerCase().replace(/\s/g, '_')}.link`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-[#d4a017] hover:bg-[#2d1b69]/5',
                      pathname === link.href ? 'text-[#d4a017]' : 'text-[var(--foreground)]'
                    )}
                    data-ocid={`navbar.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="p-2 rounded-lg hover:bg-[#2d1b69]/10 transition-colors"
                data-ocid="navbar.darkmode.toggle"
              >
                {isDark ? <Sun className="h-5 w-5 text-[#d4a017]" /> : <Moon className="h-5 w-5 text-[#2d1b69]" />}
              </button>
              <Button
                variant="default"
                size="sm"
                className="hidden sm:inline-flex"
                asChild
                data-ocid="navbar.cta.button"
              >
                <Link href="/services">Get Started</Link>
              </Button>
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-[#2d1b69]/10 transition-colors"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                data-ocid="navbar.hamburger.button"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[var(--card)] border-l border-[var(--border)] p-6 flex flex-col lg:hidden"
              data-ocid="navbar.mobile.sheet"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold font-display text-[#2d1b69] dark:text-[#d4a017]">
                  yodhaMedia
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#2d1b69]/10 transition-colors"
                  aria-label="Close menu"
                  data-ocid="navbar.mobile.close_button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mt-2">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block pl-6 pr-3 py-2 rounded-lg text-sm hover:bg-[#2d1b69]/10 hover:text-[#d4a017] transition-colors"
                          data-ocid={`navbar.mobile.${child.label.toLowerCase().replace(/\s/g, '_')}.link`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#2d1b69]/10 hover:text-[#d4a017]',
                        pathname === link.href ? 'text-[#d4a017] bg-[#2d1b69]/10' : ''
                      )}
                      data-ocid={`navbar.mobile.${link.label.toLowerCase()}.link`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <Button variant="default" className="mt-4 w-full" asChild>
                <Link href="/services" onClick={() => setIsMobileOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
