/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import type { Theme, ThemeStyles, DualTheme } from '../types'
import { resolveThemeStyles } from '../themes/utils'

export function useTheme(theme: Theme) {
  // Initially resolve the theme styles.
  const initialThemeStyles = useMemo(() => resolveThemeStyles(theme), [])

  const [currentTheme, setCurrentTheme] =
    useState<ThemeStyles>(initialThemeStyles)

  // Determine if we have a dual theme: one that contains both 'light' and 'dark' keys.
  const isDualTheme = useMemo(() => {
    return (
      theme &&
      typeof theme === 'object' &&
      theme !== null &&
      'light' in theme &&
      'dark' in theme
    )
  }, [])

  // Determine default mode for dual themes. For single themes, default is always 'light'.
  const defaultThemeMode: 'light' | 'dark' = useMemo(() => {
    if (!isDualTheme) return 'light'
    const dualTheme = theme as DualTheme
    return dualTheme.defaultTheme === 'dark' ? 'dark' : 'light'
  }, [isDualTheme])

  // A ref to track manual theme mode for dual themes.
  const manualModeRef = useRef<'light' | 'dark'>(defaultThemeMode)

  // Apply the theme based on the current mode.
  const applyTheme = useCallback(() => {
    // For a single theme (or if theme is not dual), simply resolve it.
    if (!isDualTheme) {
      setCurrentTheme(resolveThemeStyles(theme))
      return
    }

    // For dual themes, cast theme to DualTheme and extract necessary properties.
    const dualTheme = theme as DualTheme
    const {
      light,
      dark,
      switchMode = 'manual',
      switchModeClassName = 'dark',
    } = dualTheme

    let newTheme: ThemeStyles
    if (switchMode === 'scheme') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      newTheme = resolveThemeStyles(prefersDark ? dark : light)
    } else if (switchMode === 'class') {
      const isDark =
        document.documentElement.classList.contains(switchModeClassName) ||
        document.body.classList.contains(switchModeClassName)
      newTheme = resolveThemeStyles(isDark ? dark : light)
    } else {
      // Manual switching.
      newTheme = resolveThemeStyles(
        manualModeRef.current === 'light' ? light : dark
      )
    }
    setCurrentTheme(newTheme)
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
    ? ((theme as DualTheme).switchMode ?? 'manual')
    : undefined

  return {
    themeStyles: currentTheme,
    toggleTheme: isDualTheme ? toggleTheme : undefined,
    currentMode: isDualTheme ? manualModeRef.current : undefined,
    switchMode: currentSwitchMode,
    isDualTheme,
  }
}
