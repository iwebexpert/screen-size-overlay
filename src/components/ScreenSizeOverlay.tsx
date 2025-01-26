'use client'

import { useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
import Separator from './Separator'
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
  transparency?: number
  customTheme?: {
    backgroundColor?: string
    borderColor?: string
    color?: string
    separatorColor?: string
    closeButtonColor?: string
  }
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
  transparency = 1,
  customTheme = {},
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

  // Настройки темы
  const appliedTheme = {
    backgroundColor:
      customTheme.backgroundColor ??
      (currentTheme === 'dark' ? '#2e2e2e' : '#f0f0f0'),
    borderColor:
      customTheme.borderColor ?? (currentTheme === 'dark' ? '#555' : '#ccc'),
    color: customTheme.color ?? (currentTheme === 'dark' ? '#fff' : '#333'),
    separatorColor:
      customTheme?.separatorColor ??
      (currentTheme === 'dark' ? '#444' : '#bbb'),
    closeButtonColor:
      customTheme?.closeButtonColor ??
      (currentTheme === 'dark' ? '#aaa' : '#666'),
    opacity: transparency,
  }

  return (
    <div className={`${styles.overlayWrapper} ${positionClass}`}>
      <div
        className={`${styles.overlay} ${
          currentTheme === 'dark' ? styles.dark : styles.light
        }`}
        style={{
          ...sizeStyles[size],
          backgroundColor: appliedTheme.backgroundColor,
          borderColor: appliedTheme.borderColor,
          color: appliedTheme.color,
          opacity: appliedTheme.opacity,
        }}>
        <span>
          {displaySize.width.toLocaleString()} x{' '}
          {displaySize.height.toLocaleString()}
        </span>
        <Separator color={appliedTheme.separatorColor} />
        <span>{currentBreakpoint}</span>
        <Separator color={appliedTheme.separatorColor} />

        {showPrevBreakpoint && distanceToPrev !== null && currentIndex > 0 && (
          <>
            <span
              className={
                styles.mutedText
              }>{`-${distanceToPrev}px to ${breakpointKeys[currentIndex - 1]}`}</span>
            <Separator color={appliedTheme.separatorColor} />
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
              <Separator color={appliedTheme.separatorColor} />
            </>
          )}

        <button
          className={styles.closeButton}
          style={{
            color: appliedTheme.closeButtonColor,
          }}
          onClick={() => setVisible(false)}
          aria-label="Close">
          ×
        </button>
      </div>
    </div>
  )
}
