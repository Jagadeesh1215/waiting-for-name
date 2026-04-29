'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

interface DarkModeContextType {
  isDark: boolean
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggle: () => {},
})

const STORAGE_KEY = 'yodhaMedia-dark-mode'

function getInitialDark(): boolean {
  // SSR guard — no window during server render
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'true'
  // Fall back to OS preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  // Start with false to avoid hydration mismatch — real value set in effect
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = getInitialDark()
    setIsDark(initial)
    setMounted(true)
    if (initial) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem(STORAGE_KEY, 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem(STORAGE_KEY, 'false')
      }
      return next
    })
  }

  return (
    <DarkModeContext.Provider value={{ isDark: mounted ? isDark : false, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => useContext(DarkModeContext)
