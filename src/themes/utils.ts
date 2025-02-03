import type { CustomTheme, ThemeStyles } from '../types'
import { darkTheme } from './dark'

/**
 * Generates a custom theme by merging user-provided styles with defaults.
 * Defaults are taken from the light theme.
 *
 * @param theme - Custom theme provided by the user.
 * @returns A fully resolved custom theme.
 */
export function generateCustomTheme(theme: CustomTheme): ThemeStyles {
  return mergeTheme(darkTheme, theme)
}

/**
 * Merges two themes together, overriding any properties in the base theme with
 * those from the overrides object.
 *
 * @param baseTheme - The base theme to merge into.
 * @param overrides - An object containing properties to override in the base theme.
 * @returns A new theme with the overrides applied.
 */
export function mergeTheme(
  baseTheme: ThemeStyles,
  overrides: Partial<ThemeStyles>
): ThemeStyles {
  return {
    ...baseTheme,
    ...overrides,
  }
}
