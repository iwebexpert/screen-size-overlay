import { useEffect, useState } from 'react'
import { throttle } from '../utils/throttle'

/**
 * Hook to get the current window size.
 * @param throttleDelay - Optional throttle delay in milliseconds (default: 100ms)
 */
export function useWindowSize(throttleDelay: number = 100) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Use throttle to limit the frequency of updateSize calls.
    const throttledUpdateSize = throttle(updateSize, throttleDelay)

    // Call once to initialize state.
    updateSize()

    window.addEventListener('resize', throttledUpdateSize)
    return () => window.removeEventListener('resize', throttledUpdateSize)
  }, [throttleDelay])

  return size
}
