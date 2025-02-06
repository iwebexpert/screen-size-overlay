import type { Language } from '../types'

const translations: Record<Language, Record<string, string>> = {
  en: {
    close: 'Close',
    custom: 'Custom',
    toggleTheme: 'Toggle Theme',
    light: 'Light',
    dark: 'Dark',
    unknown: 'Unknown',
    breakpointDistance: 'to',
  },
  ru: {
    close: 'Закрыть',
    custom: 'Пользовательский',
    toggleTheme: 'Смена темы',
    light: 'Светлая',
    dark: 'Темная',
    unknown: 'Отсутствует',
    breakpointDistance: 'до',
  },
  es: {
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
  key: keyof (typeof translations)['en'],
  locale: Language = 'en'
) {
  return translations[locale]?.[key] ?? translations['en'][key] ?? key
}
