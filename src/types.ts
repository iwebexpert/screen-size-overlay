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

export interface CustomTheme {
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  separatorColor?: string
  closeButtonColor?: string
  fontFamily?: string
}

export type ThemeStyles = Required<CustomTheme>
export type Theme =
  | 'light'
  | 'dark'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'scheme'
  | 'class'
  | CustomTheme

export interface ThemeResult {
  themeName: 'light' | 'dark' | 'custom'
  styles: ThemeStyles
}

export type XPosition = 'left' | 'right'
export type YPosition = 'top' | 'bottom'
export type OverlayPosition = `${YPosition}-${XPosition}` | 'relative'
