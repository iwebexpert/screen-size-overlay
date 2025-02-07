import type { Breakpoints, BreakpointsPreset } from '../types'

/**
 * Calculates the current breakpoint and the distances (in pixels) to the previous and next breakpoints.
 * The breakpoints are defined by a single number representing the minimum value of the breakpoint.
 * The maximum value for each breakpoint is computed as the next breakpoint's minimum minus one, or Infinity for the last one.
 * If the provided width falls within a breakpoint interval, that breakpoint is returned.
 * Otherwise, currentBreakpoint is set to "Unknown", and the function returns the nearest previous and/or next breakpoints.
 *
 * @param width - The current width to evaluate.
 * @param breakpoints - An object mapping breakpoint keys to a number (or an object with {value, label?}).
 * @returns An object containing:
 *   - currentBreakpoint: the matching breakpoint label or "Unknown" if none match,
 *   - currentIndex: the index of the matching breakpoint (or -1 if not found),
 *   - distanceToPrev: distance in pixels from width to the previous breakpoint (if available),
 *   - distanceToNext: distance in pixels from width to the next breakpoint (if available),
 *   - prevBreakpointKey: the label of the previous breakpoint (if available),
 *   - nextBreakpointKey: the label of the next breakpoint (if available),
 *   - breakpointKeys: an array of breakpoint labels sorted by their minimum value.
 */
export function calculateBreakpointDistances(
  width: number,
  breakpoints: Breakpoints
) {
  // Convert the breakpoints object into an array with structure: { key, min, label }.
  const entries = Object.entries(breakpoints).map(([key, bp]) => {
    if (typeof bp === 'number') {
      return { key, min: bp, label: key }
    } else {
      return { key, min: bp.value, label: bp.label ?? key }
    }
  })

  // Sort the entries by the min value.
  const sortedEntries = entries.sort((a, b) => a.min - b.min)

  // Compute intervals: for each entry, max is the next entry's min minus 1, or Infinity for the last entry.
  const intervals = sortedEntries.map((entry, index, arr) => {
    const max = index < arr.length - 1 ? arr[index + 1].min - 1 : Infinity
    return { ...entry, max }
  })

  let currentBreakpoint = 'Unknown'
  let currentIndex = -1
  let distanceToPrev: number | null = null
  let distanceToNext: number | null = null
  let prevBreakpointKey: string | null = null
  let nextBreakpointKey: string | null = null

  // Attempt to find an interval that includes the given width.
  const matchIndex = intervals.findIndex(
    ({ min, max }) => width >= min && width <= max
  )

  if (matchIndex !== -1) {
    // Width falls within an interval.
    currentBreakpoint = intervals[matchIndex].label
    currentIndex = matchIndex

    // Calculate the distance to the previous breakpoint, if available.
    if (matchIndex > 0) {
      distanceToPrev = width - intervals[matchIndex - 1].max
      prevBreakpointKey = intervals[matchIndex - 1].label
    }

    // Calculate the distance to the next breakpoint, if available.
    if (matchIndex < intervals.length - 1) {
      distanceToNext = intervals[matchIndex + 1].min - width
      nextBreakpointKey = intervals[matchIndex + 1].label
    }
  } else {
    // Width does not fall within any interval.
    // Find the previous candidate: the last interval whose max is less than width.
    let prevCandidate: { index: number; distance: number } | null = null
    for (let i = intervals.length - 1; i >= 0; i--) {
      if (width > intervals[i].max) {
        prevCandidate = { index: i, distance: width - intervals[i].max }
        break // First found in reverse order is the closest below.
      }
    }

    // Find the next candidate: the first interval whose min is greater than width.
    let nextCandidate: { index: number; distance: number } | null = null
    for (let i = 0; i < intervals.length; i++) {
      if (width < intervals[i].min) {
        nextCandidate = { index: i, distance: intervals[i].min - width }
        break // First found is the closest above.
      }
    }

    if (prevCandidate) {
      distanceToPrev = prevCandidate.distance
      prevBreakpointKey = intervals[prevCandidate.index].label
    }
    if (nextCandidate) {
      distanceToNext = nextCandidate.distance
      nextBreakpointKey = intervals[nextCandidate.index].label
    }
    // currentBreakpoint remains "Unknown" and currentIndex stays -1.
  }

  // Prepare an array of breakpoint labels.
  const breakpointKeys = intervals.map((i) => i.label)

  return {
    currentBreakpoint,
    currentIndex,
    distanceToPrev,
    distanceToNext,
    prevBreakpointKey,
    nextBreakpointKey,
    breakpointKeys,
  }
}

/**
 * Resolves the given breakpoints configuration to a set of named breakpoints.
 * If `breakpoints` is a string, it is interpreted as a preset name.
 * If `breakpoints` is an object, it is used directly.
 * @param breakpoints - Breakpoints configuration.
 * @returns A set of named breakpoints.
 */
export const resolveBreakpoints = (
  breakpoints: BreakpointsPreset
): Breakpoints => {
  const presetBreakpoints: Record<string, Breakpoints> = {
    tailwind: tailwindBreakpoints,
    bootstrap4: bootstrap4Breakpoints,
    bootstrap5: bootstrap5Breakpoints, // Alias for Bootstrap 5
    bootstrap: bootstrap5Breakpoints, // Default to Bootstrap 5
    foundation: foundationBreakpoints,
    bulma: bulmaBreakpoints,
    mui: muiBreakpoints,
  }

  if (typeof breakpoints === 'string') {
    return presetBreakpoints[breakpoints] || tailwindBreakpoints
  }
  return breakpoints
}

export const tailwindBreakpoints: Breakpoints = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}

export const bootstrap4Breakpoints: Breakpoints = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
}

export const bootstrap5Breakpoints: Breakpoints = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
}

export const foundationBreakpoints: Breakpoints = {
  Small: 0,
  Medium: 640,
  Large: 1024,
  XLarge: 1200,
  XXLarge: 1440,
}

export const bulmaBreakpoints: Breakpoints = {
  Mobile: 0,
  Tablet: 769,
  Desktop: 1024,
  Widescreen: 1216,
  FullHD: 1408,
}

export const muiBreakpoints: Breakpoints = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
}
