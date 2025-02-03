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
  | CustomTheme
  | {
      light: CustomTheme
      dark: CustomTheme
      switchMode?: 'manual' | 'scheme' | 'class' // Default: 'manual'
      switchModeClassName?: string // Default: 'dark'
    }

export type XPosition = 'left' | 'right'
export type YPosition = 'top' | 'bottom'
export type OverlayPosition = `${YPosition}-${XPosition}` | 'relative'
export type SupportedLocale = 'en-US' | 'ru-RU' | 'es-ES'
