'use client'

import { useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
import type { BreakpointsPreset, OverlayPosition, Theme } from '../types'
import { getCurrentBreakpoint, resolveBreakpoints } from '../utils/breakpoints'
import styles from './ScreenSizeOverlay.module.css'

interface ScreenSizeOverlayProps {
  breakpoints?: BreakpointsPreset
  position?: OverlayPosition
  theme?: Theme
  enable?: boolean
}

export default function ScreenSizeOverlay({
  breakpoints = 'tailwind',
  position = 'bottom-right',
  theme = 'scheme',
  enable = true,
}: ScreenSizeOverlayProps) {
  const displaySize = useWindowSize()
  const currentTheme = useTheme(theme)
  const [visible, setVisible] = useState(true)

  if (!visible || !enable) return null

  // Resolve breakpoints (string preset or custom object)
  const resolvedBreakpoints = resolveBreakpoints(breakpoints)

  // Determine the current breakpoint
  const currentBreakpoint = getCurrentBreakpoint(
    displaySize.width,
    resolvedBreakpoints
  )

  const positionClass =
    position === 'relative'
      ? styles['position-relative']
      : styles[`position-fixed-${position}`]

  return (
    <div className={`${styles.overlayWrapper} ${positionClass}`}>
      <div
        className={`${styles.overlay} ${
          currentTheme === 'dark' ? styles.dark : styles.light
        }`}>
        <span>
          {displaySize.width.toLocaleString()} x{' '}
          {displaySize.height.toLocaleString()}
        </span>
        <div className={styles.separator} />
        <span>{currentBreakpoint}</span>
        <div className={styles.separator} />
        <button
          className={styles.closeButton}
          onClick={() => setVisible(false)}
          aria-label="Close">
          ×
        </button>
      </div>
    </div>
  )
}
