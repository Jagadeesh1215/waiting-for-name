'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp, MessageCircle, X, Cookie } from 'lucide-react'

export function FloatingComponents() {
  const [showScroll, setShowScroll] = useState(false)
  const [showCookie, setShowCookie] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)

    const accepted = localStorage.getItem('yodhaMedia-cookies')
    if (!accepted) {
      const timer = setTimeout(() => setShowCookie(true), 2000)
      return () => {
        window.removeEventListener('scroll', onScroll)
        clearTimeout(timer)
      }
    }

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const acceptCookies = () => {
    localStorage.setItem('yodhaMedia-cookies', 'accepted')
    setShowCookie(false)
  }

  return (
    <>
      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20yodhaMedia,%20I%20need%20help%20with%20digital%20marketing"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="fixed bottom-24 right-6 z-40 w-13 h-13 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-all hover:scale-110"
        data-ocid="floating.whatsapp.button"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-6 z-40 w-11 h-11 rounded-full bg-[#2d1b69] hover:bg-[#4a2d9e] flex items-center justify-center shadow-lg transition-colors"
            data-ocid="floating.scroll_top.button"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0a1e] border-t border-[#2d1b69] px-4 sm:px-6 py-4"
            data-ocid="floating.cookie_banner"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <Cookie className="h-5 w-5 text-[#d4a017] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  We use cookies to improve your experience. By using yodhaMedia, you agree to our{' '}
                  <a href="/privacy" className="text-[#d4a017] hover:underline">
                    cookie policy
                  </a>
                  .
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={acceptCookies}
                  className="px-4 py-2 text-sm font-medium bg-[#d4a017] text-[#1a0f3d] rounded-lg hover:bg-[#f0c040] transition-colors"
                  data-ocid="floating.cookie_banner.accept_button"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setShowCookie(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                  aria-label="Dismiss"
                  data-ocid="floating.cookie_banner.close_button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
