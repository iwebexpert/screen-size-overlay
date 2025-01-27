import type { CustomTheme, ThemeResult, ThemeStyles } from '../types'

export const sizeStyles = {
  sm: { fontSize: '10px', padding: '4px 8px' },
  md: { fontSize: '12px', padding: '8px 14px' },
  lg: { fontSize: '14px', padding: '10px 16px' },
  xl: { fontSize: '16px', padding: '12px 18px' },
  '2xl': { fontSize: '18px', padding: '12px 20px' },
}

// Предустановленные стили для light и dark тем
export const lightTheme: ThemeStyles = {
  backgroundColor: '#f0f0f0',
  borderColor: '#ccc',
  textColor: '#333',
  separatorColor: '#bbb',
  closeButtonColor: '#666',
  fontFamily: 'monospace',
}

export const darkTheme: ThemeStyles = {
  backgroundColor: '#2e2e2e',
  borderColor: '#555',
  textColor: '#fff',
  separatorColor: '#444',
  closeButtonColor: '#aaa',
  fontFamily: 'monospace',
}

/**
 * Generates a custom theme by merging user-provided styles with defaults.
 * Defaults are taken from the light theme.
 *
 * @param theme - Custom theme provided by the user.
 * @returns A fully resolved custom theme.
 */
export function generateCustomTheme(theme: CustomTheme): ThemeResult {
  return {
    themeName: 'custom',
    styles: {
      backgroundColor: theme.backgroundColor ?? lightTheme.backgroundColor,
      borderColor: theme.borderColor ?? lightTheme.borderColor,
      textColor: theme.textColor ?? lightTheme.textColor,
      separatorColor: theme.separatorColor ?? lightTheme.separatorColor,
      closeButtonColor: theme.closeButtonColor ?? lightTheme.closeButtonColor,
      fontFamily: theme.fontFamily ?? lightTheme.fontFamily,
    },
  }
}
