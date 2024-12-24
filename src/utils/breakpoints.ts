import type { Breakpoints } from '../types'

/**
 * Determines the current breakpoint based on the screen width.
 * @param width - Current screen width.
 * @param breakpoints - Set of defined breakpoints.
 * @returns The name of the current breakpoint.
 */
export const getCurrentBreakpoint = (
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

export const tailwindBreakpoints: Breakpoints = {
  XS: [0, 639],
  SM: [640, 767],
  MD: [768, 1023],
  LG: [1024, 1279],
  XL: [1280, 1535],
  '2XL': [1536, Infinity],
}
