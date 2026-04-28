"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 fill-current"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingComponents() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cookieDismissed, setCookieDismissed] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  // Read localStorage only on client (avoids SSR hydration mismatch)
  useEffect(() => {
    try {
      setCookieDismissed(localStorage.getItem("veniq-cookies") !== null);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function dismissCookie(accepted: boolean) {
    try {
      localStorage.setItem("veniq-cookies", accepted ? "accepted" : "declined");
    } catch {
      // ignore
    }
    setCookieDismissed(true);
  }

  return (
    <>
      {/* WhatsApp Float Button — bounce on hover */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +91 98765 43210"
        className="fixed right-5 bottom-6 z-50 group"
        onMouseEnter={() => setWaHovered(true)}
        onMouseLeave={() => setWaHovered(false)}
        data-ocid="floating.whatsapp_button"
      >
        <div className="relative">
          <motion.div
            animate={waHovered ? { y: [0, -6, -3, -6, 0] } : { y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-12 h-12 bg-[#25d366] hover:bg-[#22c55e] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] transition-smooth"
          >
            <WhatsAppIcon />
          </motion.div>
          {/* Tooltip */}
          <motion.div
            initial={false}
            animate={{ opacity: waHovered ? 1 : 0, x: waHovered ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="absolute right-14 bottom-1 whitespace-nowrap bg-[#1a1035] text-white text-xs font-mono px-3 py-1.5 rounded-lg pointer-events-none shadow-lg"
          >
            +91 98765 43210
          </motion.div>
          {/* Ping ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25d366]/30 animate-ping"
            aria-hidden="true"
          />
        </div>
      </a>

      {/* Scroll to top — 360° rotate on appear + glow pulse */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={handleScrollTop}
            className="fixed right-5 bottom-[4.5rem] z-50 w-10 h-10 bg-brand-gold text-white rounded-full flex items-center justify-center shadow-brand-gold-glow transition-smooth hover:bg-brand-gold-light hover:shadow-gold-glow-deep hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              boxShadow: [
                "0 0 16px rgba(212,160,23,0.5)",
                "0 0 32px rgba(212,160,23,0.8)",
                "0 0 16px rgba(212,160,23,0.5)",
              ],
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { type: "spring", damping: 12, stiffness: 180 },
              rotate: { type: "spring", damping: 15, stiffness: 150 },
              boxShadow: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            aria-label="Scroll to top"
            data-ocid="floating.scroll_top_button"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Banner */}
      <AnimatePresence>
        {!cookieDismissed && (
          <motion.div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl mx-auto px-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            data-ocid="floating.cookie_banner"
          >
            <div className="glass-card rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 dark:glass-card-dark">
              <p className="text-sm text-brand-text-secondary dark:text-white/70 flex-1">
                We use cookies to improve your experience. By using our site,
                you consent to our{" "}
                <a
                  href="/privacy"
                  className="text-brand-purple dark:text-brand-gold underline underline-offset-2"
                >
                  privacy policy
                </a>
                .
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => dismissCookie(true)}
                  className="cta-primary !py-1.5 !px-4 !text-xs"
                  data-ocid="floating.cookie_accept_button"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => dismissCookie(false)}
                  className="cta-secondary !py-1.5 !px-4 !text-xs"
                  data-ocid="floating.cookie_decline_button"
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
