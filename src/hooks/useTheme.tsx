import { useEffect, useState, useRef, useCallback } from 'react'
import type { Theme, ThemeStyles } from '../types'
import { generateCustomTheme } from '../themes'

export function useTheme(theme: Theme) {
  const isValidTheme = theme && typeof theme === 'object' && theme !== null
  const isDualTheme = isValidTheme && 'light' in theme && 'dark' in theme

  const defaultThemeMode =
    isValidTheme && 'defaultTheme' in theme && theme.defaultTheme === 'dark'
      ? 'dark'
      : 'light'

  const [currentTheme, setCurrentTheme] = useState<ThemeStyles>(() =>
    generateCustomTheme(isDualTheme ? theme[defaultThemeMode] : theme)
  )
  const manualModeRef = useRef<'light' | 'dark'>(defaultThemeMode)

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
      generateCustomTheme(manualModeRef.current === 'light' ? light : dark)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDualTheme])

  const toggleTheme = useCallback(() => {
    if (!isDualTheme) return

    manualModeRef.current = manualModeRef.current === 'light' ? 'dark' : 'light'
    applyTheme()
  }, [applyTheme, isDualTheme])

  useEffect(() => {
    applyTheme()
  }, [applyTheme])

  const currentSwitchMode = isDualTheme
    ? (theme.switchMode ?? 'manual')
    : undefined

  return {
    themeStyles: currentTheme,
    toggleTheme: isDualTheme ? toggleTheme : undefined,
    currentMode: isDualTheme ? manualModeRef.current : undefined,
    switchMode: currentSwitchMode,
    isDualTheme,
  }
}
