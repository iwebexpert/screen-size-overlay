import { useMemo } from 'react'
import {
  resolveBreakpoints,
  calculateBreakpointDistances,
} from '../utils/breakpoints'
import type { BreakpointsPreset } from '../types'

export function useBreakpointInfo(
  width: number,
  breakpoints: BreakpointsPreset = 'tailwind'
) {
  const resolvedBreakpoints = useMemo(
    () => resolveBreakpoints(breakpoints),
    [breakpoints]
  )

  const {
    currentBreakpoint,
    distanceToPrev,
    distanceToNext,
    breakpointKeys,
    currentIndex,
  } = useMemo(
    () => calculateBreakpointDistances(width, resolvedBreakpoints),
    [width, resolvedBreakpoints]
  )

  return {
    currentBreakpoint,
    distanceToPrev,
    distanceToNext,
    breakpointKeys,
    currentIndex,
    prevBreakpointKeyOrLabel:
      currentIndex > 0 ? breakpointKeys[currentIndex - 1] : null,
    nextBreakpointKeyOrLabel:
      currentIndex < breakpointKeys.length - 1
        ? breakpointKeys[currentIndex + 1]
        : null,
  }
}
