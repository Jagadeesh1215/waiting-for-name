import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | YodhaMedia',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0a1e]">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-[#2d1b69] mb-4">404</div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center mx-auto mb-6">
          <span className="text-[#d4a017] font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>Y</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#d4a017] hover:bg-[#f0c040] text-white font-medium px-6 py-3 rounded-full transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
