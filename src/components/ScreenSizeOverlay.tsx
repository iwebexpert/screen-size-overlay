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
  enable?: boolean
  breakpoints?: BreakpointsPreset
  position?: OverlayPosition
  showPrevBreakpoint?: boolean
  showNextBreakpoint?: boolean
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  transparency?: number
  theme?: Theme
}

function renderBreakpointDistance(
  distance: number,
  prefixSign: '+' | '-',
  breakpointKey: string,
  separatorColor: string,
  textClass: string
) {
  return (
    <>
      <Separator color={separatorColor} />
      <span className={textClass}>
        {`${prefixSign}${distance}px to ${breakpointKey}`}
      </span>
    </>
  )
}

export default function ScreenSizeOverlay({
  enable = true,
  breakpoints = 'tailwind',
  position = 'bottom-right',
  showPrevBreakpoint = true,
  showNextBreakpoint = true,
  showCloseButton = true,
  theme = 'scheme',
  size = 'lg',
  transparency = 1,
}: ScreenSizeOverlayProps) {
  const displaySize = useWindowSize()
  const { styles: themeStyles } = useTheme(theme)

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

  const prevBreakpointUI =
    showPrevBreakpoint && distanceToPrev !== null && currentIndex > 0
      ? renderBreakpointDistance(
          distanceToPrev,
          '-',
          breakpointKeys[currentIndex - 1],
          themeStyles.separatorColor,
          styles.mutedText
        )
      : null

  const nextBreakpointUI =
    showNextBreakpoint &&
    distanceToNext !== null &&
    currentIndex < breakpointKeys.length - 1
      ? renderBreakpointDistance(
          distanceToNext,
          '+',
          breakpointKeys[currentIndex + 1],
          themeStyles.separatorColor,
          styles.mutedText
        )
      : null

  return (
    <div className={`${styles.overlayWrapper} ${positionClass}`}>
      <div
        className={`${styles.overlay}`}
        style={{
          ...sizeStyles[size],
          backgroundColor: themeStyles.backgroundColor,
          borderColor: themeStyles.borderColor,
          color: themeStyles.textColor,
          fontFamily: themeStyles.fontFamily,
          opacity: transparency,
        }}>
        <span>
          {displaySize.width.toLocaleString()} x{' '}
          {displaySize.height.toLocaleString()}
        </span>
        <Separator color={themeStyles.separatorColor} />
        <span>{currentBreakpoint}</span>

        {prevBreakpointUI}
        {nextBreakpointUI}

        {showCloseButton && (
          <>
            <Separator color={themeStyles.separatorColor} />
            <button
              className={styles.closeButton}
              style={{
                fontSize: sizeStyles[size].fontSize,
                color: themeStyles.closeButtonColor,
              }}
              onClick={() => setVisible(false)}
              aria-label="Close">
              ×
            </button>
          </>
        )}
      </div>
    </div>
  )
}
