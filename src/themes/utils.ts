import type {
  CustomTheme,
  DualTheme,
  SingleTheme,
  Theme,
  ThemeStyles,
} from '../types'
import { THEME_PRESETS } from './presets'

/**
 * Generates a custom theme by merging user-provided styles with defaults.
 * Defaults are taken from the light theme.
 *
 * @param theme - Custom theme provided by the user.
 * @returns A fully resolved custom theme.
 */
export function generateCustomTheme(theme: CustomTheme): ThemeStyles {
  return mergeTheme(THEME_PRESETS.darkIndigo, theme)
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

/**
 * Resolves a single theme.
 * If the provided theme is a preset keyword, it looks up the corresponding theme object;
 * otherwise, it assumes the theme is already a CustomTheme.
 *
 * @param singleTheme - A SingleTheme, which can be a preset keyword or a custom theme object.
 * @returns A fully generated ThemeStyles object.
 */
function resolveSingleTheme(singleTheme: SingleTheme): ThemeStyles {
  if (typeof singleTheme === 'string') {
    // Look up the preset and generate theme styles.
    const customTheme = THEME_PRESETS[singleTheme]
    return generateCustomTheme(customTheme)
  }
  return generateCustomTheme(singleTheme)
}

/**
 * Resolves a Theme into a fully generated ThemeStyles object.
 * If a preset keyword is provided (or inside a dual-theme object), it resolves the preset to its corresponding theme object.
 * In case of a dual-theme, the default mode (light/dark) is used (defaulting to 'light').
 *
 * @param theme - The theme to resolve. It can be a single theme (preset or custom) or a dual-theme configuration.
 * @returns A fully generated ThemeStyles object with all ThemePreset references resolved.
 */
export function resolveThemeStyles(theme: Theme): ThemeStyles {
  // Check if theme is a dual-theme configuration by verifying that it is an object and has both "light" and "dark" properties.
  if (
    typeof theme === 'object' &&
    theme !== null &&
    'light' in theme &&
    'dark' in theme
  ) {
    // It's a dual-theme object.
    const dualTheme: DualTheme = theme
    // Use the defaultTheme if provided; otherwise, default to 'light'
    const mode = dualTheme.defaultTheme ?? 'light'
    return resolveSingleTheme(dualTheme[mode])
  } else {
    // Otherwise, it's a single theme (preset or custom)
    return resolveSingleTheme(theme as SingleTheme)
  }
}
