import { useEffect, useState, useRef, useCallback } from 'react'

interface UseOverlayVisibilityProps {
  mode: 'visible' | 'auto-hide' | 'auto-compact'
  displayDuration: number
  triggerDependency: string // Ensures effect re-runs when screen size changes
}

/**
 * Hook to manage overlay visibility based on mode.
 * Prevents hiding while hovered, and starts a countdown when the mouse leaves.
 */
export function useOverlayVisibility({
  mode,
  displayDuration,
  triggerDependency,
}: UseOverlayVisibilityProps) {
  const [visible, setVisible] = useState<boolean>(mode === 'visible')
  const [showFullOverlay, setShowFullOverlay] = useState<boolean>(
    mode !== 'auto-hide'
  )
  const [opacity, setOpacity] = useState<number>(1)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const hideTimer = useRef<NodeJS.Timeout | null>(null) // Store the timeout reference

  useEffect(() => {
    if (mode === 'auto-hide' || mode === 'auto-compact') {
      setVisible(true)
      setShowFullOverlay(true)
      setOpacity(1)

      const timer = setTimeout(() => {
        if (!isHovered) {
          setOpacity(0)
          hideTimer.current = setTimeout(() => {
            if (mode === 'auto-hide') {
              setVisible(false)
            }
            if (mode === 'auto-compact') {
              setShowFullOverlay(false)
            }
          }, 500)
        }
      }, displayDuration)

      return () => {
        clearTimeout(timer)
        if (hideTimer.current) clearTimeout(hideTimer.current)
      }
    }
  }, [mode, displayDuration, triggerDependency, isHovered])

  /**
   * Handles mouse entering the overlay - cancels hide timers.
   */
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  /**
   * Handles mouse leaving the overlay - starts a countdown (using displayDuration).
   */
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    hideTimer.current = setTimeout(() => {
      if (!isHovered) {
        setOpacity(0)
        setTimeout(() => {
          if (mode === 'auto-hide') {
            setVisible(false)
          }
          if (mode === 'auto-compact') {
            setShowFullOverlay(false)
          }
        }, 500)
      }
    }, displayDuration)
  }, [isHovered, displayDuration, mode])

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
