import type { ThemePreset, ThemeStyles } from '../types'
import { lightTheme } from './light'
import { darkTheme } from './dark'
import { darkIndigoTheme, lightIndigoTheme } from './indigo'

export const THEME_PRESETS: Record<ThemePreset, ThemeStyles> = {
  light: lightTheme,
  dark: darkTheme,
  lightIndigo: lightIndigoTheme,
  darkIndigo: darkIndigoTheme,
}
