import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_NAMES, type SupportedLocale } from '@/config/locales';

// Re-export for backward compatibility
export const locales = SUPPORTED_LOCALES;
export type Locale = SupportedLocale;
export const defaultLocale = DEFAULT_LOCALE;
export const localeNames = LOCALE_NAMES;

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