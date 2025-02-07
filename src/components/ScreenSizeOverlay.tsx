'use client'

import { type CSSProperties } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'
import Separator from './Separator'
import BreakpointDistance from './BreakpointDistance'
import type {
  BreakpointsPreset,
  Language,
  OverlayPosition,
  Theme,
} from '../types'
import {
  resolveBreakpoints,
  calculateBreakpointDistances,
} from '../utils/breakpoints'
import { useOverlayVisibility } from '../hooks/useOverlayVisibility'
import { getPositionStyles, sizeStyles } from '../utils/styles'
import { t } from '../utils/translations'
import styles from './ScreenSizeOverlay.module.css'

interface ScreenSizeOverlayProps {
  enable?: boolean
  breakpoints?: BreakpointsPreset
  position?: OverlayPosition
  locale?: Intl.LocalesArgument
  language?: Language
  showPrevBreakpoint?: boolean
  showNextBreakpoint?: boolean
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  transparency?: number
  containerStyles?: CSSProperties
  overlayStyles?: CSSProperties
  theme?: Theme
  mode?: 'visible' | 'auto-hide' | 'auto-compact'
  displayDuration?: number
  throttleDelay?: number
}

export default function ScreenSizeOverlay({
  enable = true,
  breakpoints = 'tailwind',
  position = 'bottom-right',
  locale = 'en-US',
  language = 'en',
  showPrevBreakpoint = true,
  showNextBreakpoint = true,
  showCloseButton = true,
  theme = 'darkIndigo',
  size = 'lg',
  transparency = 1,
  containerStyles,
  overlayStyles,
  throttleDelay = 100,
  mode = 'visible',
  displayDuration = 2000,
}: ScreenSizeOverlayProps) {
  const displaySize = useWindowSize(throttleDelay)
  const { themeStyles, toggleTheme, currentMode, isDualTheme, switchMode } =
    useTheme(theme)

  const {
    visible,
    setVisible,
    showFullOverlay,
    opacity,
    handleMouseEnter,
    handleMouseLeave,
  } = useOverlayVisibility({
    mode,
    displayDuration,
    triggerDependency: `${displaySize.width}-${displaySize.height}`,
  })

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
      : t('custom', language)

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
        language={language}
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
        language={language}
      />
    ) : null

  const commonOverlayStyles: CSSProperties = {
    ...sizeStyles[size],
    backgroundColor: themeStyles.backgroundColor,
    borderColor: themeStyles.borderColor,
    color: themeStyles.textColor,
    fontFamily: themeStyles.fontFamily,
    transition: 'opacity 500ms ease',
    ...overlayStyles,
  }

  const defaultContainerStyles: CSSProperties = {
    zIndex: 1000,
    ...getPositionStyles(position),
  }

  const containerEventHandlers =
    mode === 'auto-hide' || mode === 'auto-compact'
      ? {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }
      : {}

  return (
    <div
      style={{ ...defaultContainerStyles, ...containerStyles }}
      {...containerEventHandlers}>
      {mode === 'auto-compact' && !showFullOverlay ? (
        <div
          className={`${styles.overlay}`}
          style={{
            ...commonOverlayStyles,
            opacity: transparency,
          }}>
          <span title={`${formattedFrameworkTitle}: ${highlightedBreakpoints}`}>
            {currentBreakpoint === 'Unknown'
              ? t('unknown', language)
              : currentBreakpoint}
          </span>
        </div>
      ) : (
        <div
          className={`${styles.overlay}`}
          style={{
            ...commonOverlayStyles,
            opacity: opacity * transparency,
          }}>
          <span>
            {displaySize.width.toLocaleString(locale)} x{' '}
            {displaySize.height.toLocaleString(locale)}
          </span>
          <Separator color={themeStyles.separatorColor} />
          <span title={`${formattedFrameworkTitle}: ${highlightedBreakpoints}`}>
            {currentBreakpoint === 'Unknown'
              ? t('unknown', language)
              : currentBreakpoint}
          </span>

          {prevBreakpointUI}
          {nextBreakpointUI}

          {isDualTheme && toggleTheme && switchMode === 'manual' && (
            <>
              <Separator color={themeStyles.separatorColor} />
              <button
                className={styles.closeButton}
                style={{
                  fontSize: sizeStyles[size].fontSize,
                  color: themeStyles.closeButtonColor,
                }}
                onClick={toggleTheme}
                aria-label={t('toggleTheme', language)}>
                {currentMode === 'light'
                  ? t('light', language)
                  : t('dark', language)}
              </button>
            </>
          )}

          {showCloseButton && mode === 'visible' && (
            <>
              <Separator color={themeStyles.separatorColor} />
              <button
                className={styles.closeButton}
                style={{
                  fontSize: sizeStyles[size].fontSize,
                  color: themeStyles.closeButtonColor,
                }}
                onClick={() => setVisible(false)}
                aria-label={t('close', language)}>
                ×
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
