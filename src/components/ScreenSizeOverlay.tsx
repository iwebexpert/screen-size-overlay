'use client'

import { useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
import type { BreakpointsPreset, OverlayPosition, Theme } from '../types'
import {
  resolveBreakpoints,
  calculateBreakpointDistances,
} from '../utils/breakpoints'
import { sizeStyles } from '../utils/styles'
import styles from './ScreenSizeOverlay.module.css'

interface ScreenSizeOverlayProps {
  breakpoints?: BreakpointsPreset
  position?: OverlayPosition
  showPrevBreakpoint?: boolean
  showNextBreakpoint?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  theme?: Theme
  enable?: boolean
}

export default function ScreenSizeOverlay({
  breakpoints = 'tailwind',
  position = 'bottom-right',
  showPrevBreakpoint = true,
  showNextBreakpoint = true,
  theme = 'scheme',
  enable = true,
  size = 'md',
}: ScreenSizeOverlayProps) {
  const displaySize = useWindowSize()
  const currentTheme = useTheme(theme)
  const [visible, setVisible] = useState(true)

  if (!visible || !enable) return null

  // Resolve breakpoints (string preset or custom object)
  const resolvedBreakpoints = resolveBreakpoints(breakpoints)

  // Calculate distances and breakpoints
  const {
    currentBreakpoint,
    distanceToPrev,
    distanceToNext,
    breakpointKeys,
    currentIndex,
  } = calculateBreakpointDistances(displaySize.width, resolvedBreakpoints)

  const positionClass =
    position === 'relative'
      ? styles['position-relative']
      : styles[`position-fixed-${position}`]

  return (
    <div className={`${styles.overlayWrapper} ${positionClass}`}>
      <div
        className={`${styles.overlay} ${
          currentTheme === 'dark' ? styles.dark : styles.light
        }`}
        style={sizeStyles[size]}>
        <span>
          {displaySize.width.toLocaleString()} x{' '}
          {displaySize.height.toLocaleString()}
        </span>
        <div className={styles.separator} />
        <span>{currentBreakpoint}</span>
        <div className={styles.separator} />

        {showPrevBreakpoint && distanceToPrev !== null && currentIndex > 0 && (
          <>
            <span
              className={
                styles.mutedText
              }>{`-${distanceToPrev}px to ${breakpointKeys[currentIndex - 1]}`}</span>
            <div className={styles.separator} />
          </>
        )}

        {showNextBreakpoint &&
          distanceToNext !== null &&
          currentIndex < breakpointKeys.length - 1 && (
            <>
              <span
                className={
                  styles.mutedText
                }>{`+${distanceToNext}px to ${breakpointKeys[currentIndex + 1]}`}</span>
              <div className={styles.separator} />
            </>
          )}

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
