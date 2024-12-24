export interface Breakpoints {
  [key: string]: [number, number]
}

export type Theme = 'light' | 'dark' | 'scheme' | 'class'

export type XPosition = 'left' | 'right'
export type YPosition = 'top' | 'bottom'
export type OverlayPosition = `${YPosition}-${XPosition}` | 'relative'
