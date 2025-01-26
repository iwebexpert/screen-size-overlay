export interface Breakpoints {
  [key: string]: [number, number]
}

export type BreakpointsPreset =
  | 'tailwind'
  | 'bootstrap'
  | 'bootstrap4'
  | 'bootstrap5'
  | 'foundation'
  | 'bulma'
  | 'mui'
  | Breakpoints

export type Theme = 'light' | 'dark' | 'scheme' | 'class'

export type XPosition = 'left' | 'right'
export type YPosition = 'top' | 'bottom'
export type OverlayPosition = `${YPosition}-${XPosition}` | 'relative'
