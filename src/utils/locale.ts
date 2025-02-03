import type { SupportedLocale } from '../types'

const translations: Record<SupportedLocale, Record<string, string>> = {
  'en-US': {
    close: 'Close',
    custom: 'Custom',
    toggleTheme: 'Toggle Theme',
    light: 'Light',
    dark: 'Dark',
    unknown: 'Unknown',
    breakpointDistance: 'to',
  },
  'ru-RU': {
    close: 'Закрыть',
    custom: 'Пользовательский',
    toggleTheme: 'Смена темы',
    light: 'Светлая',
    dark: 'Темная',
    unknown: 'Отсутствует',
    breakpointDistance: 'до',
  },
  'es-ES': {
    close: 'Cerrar',
    custom: 'Personalizado',
    toggleTheme: 'Cambiar tema',
    light: 'Claro',
    dark: 'Oscuro',
    unknown: 'Desconocido',
    breakpointDistance: 'hasta',
  },
}

export function t(
  key: keyof (typeof translations)['en-US'],
  locale: SupportedLocale = 'en-US'
) {
  return translations[locale]?.[key] ?? translations['en-US'][key] ?? key
}
