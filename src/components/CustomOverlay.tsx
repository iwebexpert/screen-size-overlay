import { useWindowSize } from '../hooks/useWindowSize'
import { useBreakpointInfo } from '../hooks/useBreakpointInfo'

export default function CustomOverlay() {
  const displaySize = useWindowSize(125) // Throttled window size updates at 125ms
  const {
    currentBreakpoint,
    distanceToPrev,
    distanceToNext,
    breakpointKeys,
    prevBreakpointKeyOrLabel,
    nextBreakpointKeyOrLabel,
  } = useBreakpointInfo(displaySize.width, 'tailwind')

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        padding: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        borderRadius: '5px',
      }}>
      <p>Width: {displaySize.width}px</p>
      <p>Height: {displaySize.height}px</p>
      <p>All Breakpoints: {breakpointKeys.join(', ')}</p>
      <p>Current Breakpoint: {currentBreakpoint}</p>
      <p>
        Prev Breakpoint: {prevBreakpointKeyOrLabel ?? 'N/A'}
        {distanceToPrev !== null ? ` (${distanceToPrev}px)` : ''}
      </p>
      <p>
        Next Breakpoint: {nextBreakpointKeyOrLabel ?? 'N/A'}
        {distanceToNext !== null ? ` (${distanceToNext}px)` : ''}
      </p>
    </div>
  )
}
