import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  nl: 'Nederlands',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi'
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const currentLocale = locale || defaultLocale;
  
  if (!locales.includes(currentLocale as any)) {
    // Return default locale instead of throwing notFound
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    };
  }

  try {
    return {
      locale: currentLocale,
      messages: (await import(`../messages/${currentLocale}.json`)).default
    };
  } catch (error) {
    // Fallback to English if translation file not found
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/en.json`)).default
    };
  }
});