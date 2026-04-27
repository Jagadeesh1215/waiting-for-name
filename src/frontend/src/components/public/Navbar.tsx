import { useConsultationModal } from "@/components/public/ConsultationModal";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SERVICE_LINKS = [
  { label: "Social Media Partner", slug: "social-media-partner", icon: "📱" },
  { label: "ORM", slug: "orm", icon: "⭐" },
  { label: "Branding Partner", slug: "branding-partner", icon: "🎨" },
  { label: "Web Designing", slug: "web-designing", icon: "💻" },
  { label: "Digital Marketing", slug: "digital-marketing", icon: "📊" },
  { label: "Influencer Marketing", slug: "influencer-marketing", icon: "🤝" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Business Hub", href: "/business-hub" },
  { label: "Our Work", href: "/our-work" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { openModal } = useConsultationModal();
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  if (prevPath.current !== location.pathname) {
    prevPath.current = location.pathname;
    setMobileOpen(false);
    setServicesOpen(false);
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/92 dark:bg-[#0d0a1a]/92 backdrop-blur-xl shadow-md border-b border-[#e8e3ff] dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            data-ocid="navbar.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center shadow-brand-purple-glow transition-spring group-hover:shadow-purple-glow-deep group-hover:scale-105">
              <span className="text-brand-gold font-display font-bold text-base leading-none">
                V
              </span>
            </div>
            <span className="font-display font-bold text-lg text-brand-text-primary dark:text-white">
              VenIQ <span className="text-brand-gold">Media</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} ref={servicesRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((p) => !p)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-heading font-medium transition-smooth relative ${
                      isActive(link.href)
                        ? "text-brand-gold"
                        : "text-brand-text-primary dark:text-white/80 hover:text-brand-purple dark:hover:text-white hover:bg-brand-bg-light dark:hover:bg-white/5"
                    }`}
                    data-ocid="navbar.services_dropdown"
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold rounded-full"
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        onMouseLeave={() => setServicesOpen(false)}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-brand-card-dark/95 backdrop-blur-xl rounded-xl shadow-card-hover border border-brand-border-light dark:border-white/10 overflow-hidden"
                        data-ocid="navbar.services_popover"
                      >
                        <div className="p-1">
                          {SERVICE_LINKS.map((s, i) => (
                            <motion.div
                              key={s.slug}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.15 }}
                            >
                              <Link
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-heading text-brand-text-primary dark:text-white/80 hover:bg-brand-bg-light dark:hover:bg-white/5 hover:text-brand-purple dark:hover:text-white transition-smooth rounded-lg group"
                                data-ocid={`navbar.service_link.${s.slug}`}
                              >
                                <span className="text-base transition-transform duration-200 group-hover:scale-110">
                                  {s.icon}
                                </span>
                                <span className="flex-1">{s.label}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-brand-gold transition-smooth text-xs">
                                  →
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-heading font-medium transition-smooth relative ${
                    isActive(link.href)
                      ? "text-brand-gold"
                      : "text-brand-text-primary dark:text-white/80 hover:text-brand-purple dark:hover:text-white hover:bg-brand-bg-light dark:hover:bg-white/5"
                  }`}
                  data-ocid={`navbar.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold rounded-full shadow-[0_0_6px_rgba(212,160,23,0.6)]"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.4,
                      }}
                    />
                  )}
                </Link>
              ),
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-brand-text-secondary dark:text-white/60 hover:text-brand-purple dark:hover:text-white hover:bg-brand-bg-light dark:hover:bg-white/10 transition-smooth"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              data-ocid="navbar.dark_mode_toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDarkMode ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* CTA */}
            <button
              type="button"
              onClick={openModal}
              className="hidden sm:flex cta-primary !py-2 !px-5 !text-sm"
              data-ocid="navbar.book_consultation_button"
            >
              Book Consultation
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.8,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              >
                →
              </motion.span>
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-brand-text-primary dark:text-white hover:bg-brand-bg-light dark:hover:bg-white/10 transition-smooth"
              aria-label="Open menu"
              data-ocid="navbar.mobile_menu_toggle"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-[101] w-72 bg-white dark:bg-[#0d0a1a] shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              data-ocid="navbar.mobile_drawer"
            >
              {/* Drawer header — subtle gold tint edge */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border-light dark:border-white/10 bg-gradient-to-r from-transparent to-[#d4a017]/5">
                <span className="font-display font-bold text-brand-text-primary dark:text-white">
                  VenIQ <span className="text-brand-gold">Media</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-brand-bg-light dark:hover:bg-white/10 text-brand-text-secondary dark:text-white/60 transition-smooth"
                  aria-label="Close menu"
                  data-ocid="navbar.mobile_close_button"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                      duration: 0.3,
                    }}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center px-3 py-2.5 rounded-xl font-heading font-medium text-sm mb-0.5 transition-smooth ${
                        isActive(link.href)
                          ? "bg-[#d4a017]/10 text-brand-gold border border-[#d4a017]/20"
                          : "text-brand-text-primary dark:text-white/80 hover:bg-brand-bg-light dark:hover:bg-white/5"
                      }`}
                      data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    >
                      <span className="flex-1">{link.label}</span>
                      {isActive(link.href) && (
                        <span className="text-brand-gold text-xs">●</span>
                      )}
                    </Link>

                    {link.hasDropdown && (
                      <div className="ml-3 pl-3 border-l-2 border-[#d4a017]/30 mb-2 mt-0.5">
                        {SERVICE_LINKS.map((s, si) => (
                          <motion.div
                            key={s.slug}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: i * 0.06 + si * 0.04,
                              duration: 0.25,
                            }}
                          >
                            <Link
                              to={`/services/${s.slug}`}
                              className="flex items-center gap-2 py-2 px-2 text-xs text-brand-text-secondary dark:text-white/60 hover:text-brand-purple dark:hover:text-white transition-smooth rounded-lg hover:bg-brand-bg-light dark:hover:bg-white/5"
                            >
                              <span className="text-sm">{s.icon}</span>
                              {s.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 border-t border-brand-border-light dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    openModal();
                    setMobileOpen(false);
                  }}
                  className="w-full cta-primary justify-center !text-sm !py-3"
                  data-ocid="navbar.mobile_book_consultation_button"
                >
                  Book Consultation →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
