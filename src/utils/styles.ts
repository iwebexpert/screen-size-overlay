import type { OverlayPosition } from '../types'

export const sizeStyles = {
  sm: { fontSize: '10px', padding: '4px 8px' },
  md: { fontSize: '12px', padding: '8px 14px' },
  lg: { fontSize: '14px', padding: '10px 16px' },
  xl: { fontSize: '16px', padding: '12px 18px' },
  '2xl': { fontSize: '18px', padding: '12px 20px' },
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
