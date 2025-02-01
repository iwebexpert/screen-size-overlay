'use client'

import { useState, type CSSProperties } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
import Separator from './Separator'
import BreakpointDistance from './BreakpointDistance'
import type { BreakpointsPreset, OverlayPosition, Theme } from '../types'
import {
  resolveBreakpoints,
  calculateBreakpointDistances,
} from '../utils/breakpoints'
import { getPositionStyles, sizeStyles } from '../utils/styles'
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
  containerStyles?: CSSProperties
  overlayStyles?: CSSProperties
  theme?: Theme
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
  containerStyles,
  overlayStyles,
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

  // Determine the framework title: if breakpoints is a preset string, use it;
  // otherwise, mark it as 'Custom'
  const formattedFrameworkTitle =
    typeof breakpoints === 'string'
      ? breakpoints.charAt(0).toUpperCase() + breakpoints.slice(1)
      : 'Custom'

  // Create a string that highlights the current breakpoint by surrounding it with square brackets
  const highlightedBreakpoints = breakpointKeys
    .map((bp) => (bp === currentBreakpoint ? `[${bp}]` : bp))
    .join(', ')

  const prevBreakpointUI =
    showPrevBreakpoint && distanceToPrev !== null && currentIndex > 0 ? (
      <BreakpointDistance
        distance={distanceToPrev}
        prefix="-"
        breakpointKey={breakpointKeys[currentIndex - 1]}
        separatorColor={themeStyles.separatorColor}
        textClass={styles.mutedText}
      />
    ) : null

  const nextBreakpointUI =
    showNextBreakpoint &&
    distanceToNext !== null &&
    currentIndex < breakpointKeys.length - 1 ? (
      <BreakpointDistance
        distance={distanceToNext}
        prefix="+"
        breakpointKey={breakpointKeys[currentIndex + 1]}
        separatorColor={themeStyles.separatorColor}
        textClass={styles.mutedText}
      />
    ) : null

  const defaultContainerStyles: CSSProperties = {
    zIndex: 1000,
    ...getPositionStyles(position),
  }

  return (
    <div style={{ ...defaultContainerStyles, ...containerStyles }}>
      <div
        className={`${styles.overlay}`}
        style={{
          ...sizeStyles[size],
          backgroundColor: themeStyles.backgroundColor,
          borderColor: themeStyles.borderColor,
          color: themeStyles.textColor,
          fontFamily: themeStyles.fontFamily,
          opacity: transparency,
          ...overlayStyles,
        }}>
        <span>
          {displaySize.width.toLocaleString()} x{' '}
          {displaySize.height.toLocaleString()}
        </span>
        <Separator color={themeStyles.separatorColor} />
        <span title={`${formattedFrameworkTitle}: ${highlightedBreakpoints}`}>
          {currentBreakpoint}
        </span>

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
