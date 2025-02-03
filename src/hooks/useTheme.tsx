import { useEffect, useState, useRef, useCallback } from 'react'
import type { Theme, ThemeStyles } from '../types'
import { darkTheme, generateCustomTheme } from '../themes'

export function useTheme(theme: Theme) {
  const [currentTheme, setCurrentTheme] = useState<ThemeStyles>(darkTheme)
  const manualModeRef = useRef<'light' | 'dark'>('dark')
  const isDualTheme = 'light' in theme && 'dark' in theme

  const applyTheme = useCallback(() => {
    if (!isDualTheme) {
      setCurrentTheme(generateCustomTheme(theme))
      return
    }

    const {
      light,
      dark,
      switchMode = 'manual',
      switchModeClassName = 'dark',
    } = theme

    if (switchMode === 'scheme') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setCurrentTheme(
        prefersDark ? generateCustomTheme(dark) : generateCustomTheme(light)
      )
      return
    }

    if (switchMode === 'class') {
      const isDark =
        document.documentElement.classList.contains(switchModeClassName) ||
        document.body.classList.contains(switchModeClassName)

      setCurrentTheme(
        isDark ? generateCustomTheme(dark) : generateCustomTheme(light)
      )
      return
    }

    setCurrentTheme(
      manualModeRef.current === 'light'
        ? generateCustomTheme(light)
        : generateCustomTheme(dark)
    )
  }, [theme, isDualTheme])

  const toggleTheme = useCallback(() => {
    if (!isDualTheme) return

    manualModeRef.current = manualModeRef.current === 'light' ? 'dark' : 'light'
    applyTheme()
  }, [applyTheme, isDualTheme])

  useEffect(() => {
    applyTheme()
  }, [applyTheme])

  return {
    themeStyles: currentTheme,
    toggleTheme: isDualTheme ? toggleTheme : undefined,
    currentMode: isDualTheme ? manualModeRef.current : undefined,
    isDualTheme,
  }
}
