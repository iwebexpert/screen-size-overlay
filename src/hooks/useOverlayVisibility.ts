import { useEffect, useState, useRef, useCallback } from 'react'

interface UseOverlayVisibilityProps {
  mode: 'visible' | 'auto-hide' | 'auto-compact'
  displayDuration: number
  triggerDependency: string // Ensures effect re-runs when screen size changes
}

/**
 * Hook to manage overlay visibility based on mode.
 * - For 'auto-hide' and 'auto-compact', it:
 *   1. Shows the overlay at first,
 *   2. After displayDuration (if not hovered), fades out,
 *   3. Then hides fully (auto-hide) or collapses to compact (auto-compact).
 * - On hover, it cancels the collapse/hide timers and can re-expand (auto-compact).
 */
export function useOverlayVisibility({
  mode,
  displayDuration,
  triggerDependency,
}: UseOverlayVisibilityProps) {
  const [visible, setVisible] = useState<boolean>(mode === 'visible')
  const [showFullOverlay, setShowFullOverlay] = useState<boolean>(
    mode !== 'auto-hide' // auto-compact starts "fully visible"
  )
  const [opacity, setOpacity] = useState<number>(1)

  // Track if user is hovered (no need for state if we want to reduce re-renders).
  const isHoveredRef = useRef(false)

  // Timer reference to manage delayed hiding/collapsing
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Runs on mount / whenever `triggerDependency` changes:
   * - Shows the overlay if mode is auto-hide or auto-compact.
   * - After `displayDuration`, if not hovered, fade out and hide/collapse.
   */
  useEffect(() => {
    if (mode !== 'auto-hide' && mode !== 'auto-compact') return

    // Show fully at first
    setVisible(true)
    setShowFullOverlay(true)
    setOpacity(1)

    const timer = setTimeout(() => {
      // If still not hovered at that time, start fade out
      if (!isHoveredRef.current) {
        setOpacity(0)
        // After fade-out (500ms), hide or collapse
        hideTimerRef.current = setTimeout(() => {
          if (mode === 'auto-hide') {
            setVisible(false)
          } else {
            // auto-compact => show the widget in compact mode
            setShowFullOverlay(false)
          }
        }, 500)
      }
    }, displayDuration)

    return () => {
      clearTimeout(timer)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [mode, displayDuration, triggerDependency])

  /**
   * Mouse enters the overlay:
   * - Mark hoveredRef as true
   * - Cancel pending timers
   * - If in auto-compact, we can re-expand to show full overlay
   */
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }

    // If the widget is in auto-compact mode, re-expand:
    // (Because we might be in the "compact" or "faded out" state)
    if (mode === 'auto-compact') {
      setVisible(true)
      setShowFullOverlay(true)
      setOpacity(1)
    }

    // If auto-hide, you could also show the widget again, e.g.:
    if (mode === 'auto-hide') {
      setVisible(true)
      setOpacity(1)
    }
  }, [mode])

  /**
   * Mouse leaves the overlay:
   * - Mark hoveredRef as false
   * - Start the fade-out timer again
   */
  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    hideTimerRef.current = setTimeout(() => {
      // If still not hovered, fade out
      if (!isHoveredRef.current) {
        setOpacity(0)
        setTimeout(() => {
          if (mode === 'auto-hide') {
            setVisible(false)
          } else if (mode === 'auto-compact') {
            setShowFullOverlay(false)
          }
        }, 500)
      }
    }, displayDuration)
  }, [mode, displayDuration])

  return {
    visible,
    setVisible,
    showFullOverlay,
    setShowFullOverlay,
    opacity,
    setOpacity,
    handleMouseEnter,
    handleMouseLeave,
  }
}
