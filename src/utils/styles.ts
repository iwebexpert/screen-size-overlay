import type {
  CustomTheme,
  OverlayPosition,
  ThemeResult,
  ThemeStyles,
} from '../types'

export const sizeStyles = {
  sm: { fontSize: '10px', padding: '4px 8px' },
  md: { fontSize: '12px', padding: '8px 14px' },
  lg: { fontSize: '14px', padding: '10px 16px' },
  xl: { fontSize: '16px', padding: '12px 18px' },
  '2xl': { fontSize: '18px', padding: '12px 20px' },
}

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

export const greenTheme: ThemeStyles = {
  backgroundColor: '#e8f5e9',
  borderColor: '#a5d6a7',
  textColor: '#1b5e20',
  separatorColor: '#c8e6c9',
  closeButtonColor: '#388e3c',
  fontFamily: 'monospace',
}

export const indigoTheme: ThemeStyles = {
  backgroundColor: '#e8eaf6',
  borderColor: '#9fa8da',
  textColor: '#1a237e',
  separatorColor: '#c5cae9',
  closeButtonColor: '#3949ab',
  fontFamily: 'monospace',
}

export const orangeTheme: ThemeStyles = {
  backgroundColor: '#fff3e0',
  borderColor: '#ffb74d',
  textColor: '#e65100',
  separatorColor: '#ffe0b2',
  closeButtonColor: '#fb8c00',
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

/**
 * Returns a style object for container positioning.
 * For fixed positioning, a margin of 16 pixels is applied from the edge.
 */
export function getPositionStyles(
  position: OverlayPosition
): React.CSSProperties {
  if (position === 'relative') {
    return { position: 'relative' }
  }

  // For fixed positions
  const style: React.CSSProperties = { position: 'fixed' }

  switch (position) {
    case 'bottom-right':
      style.bottom = 16
      style.right = 16
      break
    case 'bottom-left':
      style.bottom = 16
      style.left = 16
      break
    case 'top-right':
      style.top = 16
      style.right = 16
      break
    case 'top-left':
      style.top = 16
      style.left = 16
      break
    default:
      break
  }

  return style
}
