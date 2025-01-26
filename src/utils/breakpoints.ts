import type { Breakpoints, BreakpointsPreset } from '../types'

/**
 * Determines the current breakpoint based on the screen width.
 * @param width - Current screen width.
 * @param breakpoints - Set of defined breakpoints.
 * @returns The name of the current breakpoint.
 */
const getCurrentBreakpoint = (
  width: number,
  breakpoints: Breakpoints
): string => {
  for (const [key, [min, max]] of Object.entries(breakpoints)) {
    if (width >= min && width <= max) {
      return key
    }
  }
  return 'Unknown'
}

/**
 * Calculates the current breakpoint, previous breakpoint, next breakpoint,
 * distance to the previous breakpoint, distance to the next breakpoint, and
 * the index of the current breakpoint given the current screen width.
 * @param width - Current screen width.
 * @param resolvedBreakpoints - Set of defined breakpoints.
 * @returns An object containing the following information:
 *   - currentBreakpoint: The name of the current breakpoint.
 *   - prevBreakpoint: The name of the previous breakpoint.
 *   - nextBreakpoint: The name of the next breakpoint.
 *   - distanceToPrev: The distance in pixels from the current screen width to the
 *     previous breakpoint.
 *   - distanceToNext: The distance in pixels from the current screen width to the next
 *     breakpoint.
 *   - breakpointKeys: Array of all the breakpoint keys.
 *   - currentIndex: The index of the current breakpoint in the breakpointKeys array.
 */
export function calculateBreakpointDistances(
  width: number,
  resolvedBreakpoints: { [key: string]: [number, number] }
) {
  const breakpointKeys = Object.keys(resolvedBreakpoints)
  const currentBreakpoint = getCurrentBreakpoint(width, resolvedBreakpoints)

  const currentIndex = breakpointKeys.findIndex(
    (key) => key === currentBreakpoint
  )
  const prevBreakpoint =
    currentIndex > 0
      ? resolvedBreakpoints[breakpointKeys[currentIndex - 1]][1]
      : null
  const nextBreakpoint =
    currentIndex < breakpointKeys.length - 1
      ? resolvedBreakpoints[breakpointKeys[currentIndex + 1]][0]
      : null

  const distanceToPrev = prevBreakpoint !== null ? width - prevBreakpoint : null
  const distanceToNext = nextBreakpoint !== null ? nextBreakpoint - width : null

  return {
    currentBreakpoint,
    prevBreakpoint,
    nextBreakpoint,
    distanceToPrev,
    distanceToNext,
    breakpointKeys,
    currentIndex,
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
  XS: [0, 639],
  SM: [640, 767],
  MD: [768, 1023],
  LG: [1024, 1279],
  XL: [1280, 1535],
  '2XL': [1536, Infinity],
}

export const bootstrap4Breakpoints: Breakpoints = {
  XS: [0, 575],
  SM: [576, 767],
  MD: [768, 991],
  LG: [992, 1199],
  XL: [1200, Infinity],
}

export const bootstrap5Breakpoints: Breakpoints = {
  XS: [0, 575],
  SM: [576, 767],
  MD: [768, 991],
  LG: [992, 1199],
  XL: [1200, 1399],
  XXL: [1400, Infinity],
}

export const foundationBreakpoints: Breakpoints = {
  Small: [0, 639],
  Medium: [640, 1023],
  Large: [1024, 1199],
  XLarge: [1200, 1439],
  XXLarge: [1440, Infinity],
}

export const bulmaBreakpoints: Breakpoints = {
  Mobile: [0, 768],
  Tablet: [769, 1023],
  Desktop: [1024, 1215],
  Widescreen: [1216, 1407],
  FullHD: [1408, Infinity],
}

export const muiBreakpoints: Breakpoints = {
  XS: [0, 599],
  SM: [600, 899],
  MD: [900, 1199],
  LG: [1200, 1535],
  XL: [1536, Infinity],
}
