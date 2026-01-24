/**
 * Centralized Locale Configuration
 * SINGLE SOURCE OF TRUTH - Do NOT define locale arrays anywhere else!
 */

export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Mapping from locale code to full language name
 */
export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Francais',
  es: 'Espanol',
  it: 'Italiano',
  pt: 'Portugues',
  nl: 'Nederlands',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
};

/**
 * Mapping from locale code to folder name used in /samples/ directory
 */
export const LOCALE_TO_FOLDER: Record<SupportedLocale, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  pt: 'portuguese',
  it: 'italian',
  nl: 'dutch',
  sv: 'swedish',
  da: 'danish',
  no: 'norwegian',
  fi: 'finnish',
};
