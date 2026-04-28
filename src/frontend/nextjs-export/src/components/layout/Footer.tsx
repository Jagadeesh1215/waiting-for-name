import Link from "next/link";

// Social icon SVGs (inline — avoids react-icons dependency)
function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconLinkedin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconYoutube({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Business Hub", href: "/business-hub" },
  { label: "Our Work", href: "/our-work" },
  { label: "Blog", href: "/blog" },
];

const SERVICE_LINKS = [
  { label: "Social Media", slug: "social-media-partner" },
  { label: "ORM", slug: "orm" },
  { label: "Branding", slug: "branding-partner" },
  { label: "Web Designing", slug: "web-designing" },
  { label: "Digital Marketing", slug: "digital-marketing" },
  { label: "Influencer Marketing", slug: "influencer-marketing" },
];

const SOCIAL_LINKS = [
  { icon: IconFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: IconInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: IconLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: IconYoutube, label: "YouTube", href: "https://youtube.com" },
];

export function Footer() {
  return (
    <footer className="relative bg-brand-purple dark:bg-brand-bg-dark text-white overflow-hidden">
      {/* Subtle gradient edge tints */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(74,44,158,0.35) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(212,160,23,0.08) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center shadow-brand-gold-glow">
                <span className="text-white font-display font-bold text-lg leading-none">
                  V
                </span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                VenIQ <span className="text-brand-gold">Media</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Building Digital Growth Systems for Hospitals, Doctors, and Modern
              Businesses.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-spring hover:shadow-brand-gold-glow hover:scale-110 hover:-translate-y-0.5"
                  data-ocid={`footer.social_${label.toLowerCase()}_link`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-brand-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-white text-sm font-body transition-smooth inline-flex items-center gap-1.5 group"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-brand-gold transition-smooth text-xs">
                      ›
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-brand-gold mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/65 hover:text-white text-sm font-body transition-smooth inline-flex items-center gap-1.5 group"
                    data-ocid={`footer.service_${s.slug}_link`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-brand-gold transition-smooth text-xs">
                      ›
                    </span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-brand-gold mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <span className="text-base leading-5">📍</span>
                <span>Your City, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base">📞</span>
                <a
                  href="tel:+919876543210"
                  className="hover:text-white hover:text-brand-gold transition-smooth"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base">✉️</span>
                <a
                  href="mailto:info@veniqmedia.com"
                  className="hover:text-white transition-smooth"
                >
                  info@veniqmedia.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base">🌐</span>
                <a
                  href="https://www.veniqmedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-smooth"
                >
                  www.veniqmedia.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>
            © {new Date().getFullYear()} VenIQ Media LLP. All Rights Reserved.
          </span>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="hover:text-white hover:text-brand-gold transition-smooth"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white hover:text-brand-gold transition-smooth"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
