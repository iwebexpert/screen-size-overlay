import { useEffect, useState } from 'react'
import type { Theme, ThemeResult } from '../types'
import { lightTheme, darkTheme, generateCustomTheme } from '../utils/styles'

export function useTheme(theme: Theme): ThemeResult {
  const [currentTheme, setCurrentTheme] = useState<ThemeResult>({
    themeName: 'light',
    styles: lightTheme,
  })

  useEffect(() => {
    if (typeof theme !== 'string') {
      setCurrentTheme(generateCustomTheme(theme))
      return
    }

    switch (theme) {
      case 'scheme': {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const isDark = mediaQuery.matches

        setCurrentTheme({
          themeName: isDark ? 'dark' : 'light',
          styles: isDark ? darkTheme : lightTheme,
        })
        break
      }

      case 'class': {
        const isDarkClass = document.documentElement.classList.contains('dark')
        setCurrentTheme({
          themeName: isDarkClass ? 'dark' : 'light',
          styles: isDarkClass ? darkTheme : lightTheme,
        })
        break
      }

      case 'dark':
        setCurrentTheme({
          themeName: 'dark',
          styles: darkTheme,
        })
        break

      case 'light':
      default:
        setCurrentTheme({
          themeName: 'light',
          styles: lightTheme,
        })
        break
    }
  }, [theme])

  return currentTheme
}
