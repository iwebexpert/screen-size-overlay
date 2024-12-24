'use client'

import { useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
import type { Breakpoints, OverlayPosition, Theme } from '../types'
import { getCurrentBreakpoint, tailwindBreakpoints } from '../utils/breakpoints'
import styles from './ScreenSizeOverlay.module.css'

interface ScreenSizeOverlayProps {
  breakpoints?: Breakpoints
  position?: OverlayPosition
  theme?: Theme
  enable?: boolean
}

export default function ScreenSizeOverlay({
  breakpoints = tailwindBreakpoints,
  position = 'bottom-right',
  theme = 'scheme',
  enable = true,
}: ScreenSizeOverlayProps) {
  const displaySize = useWindowSize()
  const currentTheme = useTheme(theme)
  const [visible, setVisible] = useState(true)

  if (!visible || !enable) return null

  const currentBreakpoint = getCurrentBreakpoint(displaySize.width, breakpoints)
  const positionClass =
    position === 'relative'
      ? styles['position-relative']
      : styles[`position-fixed-${position}`]

  return (
    <div className={`${positionClass}`}>
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
