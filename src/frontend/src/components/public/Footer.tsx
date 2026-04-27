import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
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
                    to={link.href}
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
                    to={`/services/${s.slug}`}
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
              to="/privacy"
              className="hover:text-white hover:text-brand-gold transition-smooth"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
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
