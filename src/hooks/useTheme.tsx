import { useEffect, useState } from 'react'
import type { Theme, ThemeResult } from '../types'
import {
  lightTheme,
  darkTheme,
  greenTheme,
  indigoTheme,
  orangeTheme,
  generateCustomTheme,
} from '../utils/styles'

export function useTheme(theme: Theme): ThemeResult {
  const [currentTheme, setCurrentTheme] = useState<ThemeResult>({
    themeName: 'light',
    styles: lightTheme,
  })

  useEffect(() => {
    // If the theme is not a string, assume it's a custom theme object
    if (typeof theme !== 'string') {
      setCurrentTheme(generateCustomTheme(theme))
      return
    }

    switch (theme) {
      case 'scheme': {
        // Determine the user's preferred color scheme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const isDark = mediaQuery.matches

        setCurrentTheme({
          themeName: isDark ? 'dark' : 'light',
          styles: isDark ? darkTheme : lightTheme,
        })
        break
      }

      case 'class': {
        // Use the presence of the 'dark' class on the document element
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

      case 'green':
        setCurrentTheme({
          themeName: 'custom',
          styles: greenTheme,
        })
        break

      case 'indigo':
        setCurrentTheme({
          themeName: 'custom',
          styles: indigoTheme,
        })
        break

      case 'orange':
        setCurrentTheme({
          themeName: 'custom',
          styles: orangeTheme,
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
