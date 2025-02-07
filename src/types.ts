export type BreakpointDefinition =
  | number
  | {
      value: number
      label?: string
    }

export type Breakpoints = {
  [key: string]: BreakpointDefinition
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

export type ThemePreset = 'light' | 'dark' | 'lightIndigo' | 'darkIndigo'
export interface CustomTheme {
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  separatorColor?: string
  closeButtonColor?: string
  fontFamily?: string
}

export type ThemeStyles = Required<CustomTheme>
export type SingleTheme = ThemePreset | CustomTheme
//Dual-theme configuration (supports switching between two themes)
export type DualTheme = {
  light: SingleTheme
  dark: SingleTheme
  defaultTheme?: 'light' | 'dark' // Default: 'light'
  switchMode?: 'manual' | 'scheme' | 'class' // Default: 'manual'
  switchModeClassName?: string // Default: 'dark'
}

// The final Theme type (supports single themes, dual themes, and presets)
export type Theme = SingleTheme | DualTheme

export type XPosition = 'left' | 'right'
export type YPosition = 'top' | 'bottom'
export type OverlayPosition = `${YPosition}-${XPosition}` | 'relative'
export type Language = 'en' | 'ru' | 'es'
