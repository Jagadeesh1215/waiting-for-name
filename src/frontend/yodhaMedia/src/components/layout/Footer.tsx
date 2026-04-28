import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'

const footerServices = [
  { label: 'SEO & Search', href: '/services/seo-search' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'Content Marketing', href: '/services/content-marketing' },
  { label: 'Brand Strategy', href: '/services/brand-strategy' },
  { label: 'Analytics', href: '/services/analytics' },
  { label: 'Healthcare Marketing', href: '/services/healthcare-marketing' },
]

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Business Hub', href: '/business-hub' },
  { label: 'Contact', href: '/about#contact' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'yodhamedia.com'
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`

  return (
    <footer className="bg-[#0d0a1e] text-white border-t border-[#2d1b69]/50" data-ocid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
                <span className="text-[#d4a017] font-bold text-lg font-mono">Y</span>
              </div>
              <span className="text-xl font-bold font-display text-[#d4a017]">yodhaMedia</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Digital growth for the modern age. Specialized marketing solutions for healthcare
              professionals and businesses that want to grow.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-[#2d1b69]/50 flex items-center justify-center hover:bg-[#d4a017] transition-colors"
                data-ocid="footer.linkedin.link"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-[#2d1b69]/50 flex items-center justify-center hover:bg-[#d4a017] transition-colors"
                data-ocid="footer.twitter.link"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-[#2d1b69]/50 flex items-center justify-center hover:bg-[#d4a017] transition-colors"
                data-ocid="footer.instagram.link"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-display">Services</h4>
            <ul className="space-y-2">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-[#d4a017] transition-colors"
                    data-ocid={`footer.services.${s.label.toLowerCase().replace(/[\s&]/g, '_')}.link`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-[#d4a017] transition-colors"
                    data-ocid={`footer.quicklinks.${l.label.toLowerCase().replace(/\s/g, '_')}.link`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-display">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail className="h-4 w-4 mt-0.5 text-[#d4a017] shrink-0" />
                <a href="mailto:hello@yodhamedia.com" className="hover:text-[#d4a017] transition-colors">
                  hello@yodhamedia.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 mt-0.5 text-[#d4a017] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#d4a017] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 text-[#d4a017] shrink-0" />
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2d1b69]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {year} yodhaMedia. All rights reserved.</p>
          <p>
            Built with love using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4a017] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
