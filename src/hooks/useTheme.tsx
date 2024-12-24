import { useEffect, useState } from 'react'
import type { Theme } from '../types'

export function useTheme(theme: Theme): 'light' | 'dark' {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (theme === 'scheme') {
      // Use prefers-color-scheme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setCurrentTheme(mediaQuery.matches ? 'dark' : 'light')

      // Subscribe to changes in prefers-color-scheme
      const handleChange = (event: MediaQueryListEvent) => {
        setCurrentTheme(event.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    } else if (theme === 'class') {
      // Check for the presence of the "dark" class on the <html> element
      const isDarkClass = document.documentElement.classList.contains('dark')
      setCurrentTheme(isDarkClass ? 'dark' : 'light')
    } else {
      setCurrentTheme(theme)
    }
  }, [theme])

  return currentTheme
}
