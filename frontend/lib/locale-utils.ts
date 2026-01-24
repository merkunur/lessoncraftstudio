/**
 * Locale utilities for mapping website locales to external service locales
 */

import { SUPPORTED_LOCALES } from '@/config/locales';

/**
 * Map website locale to Stripe supported locale
 *
 * Stripe supports 40+ locales. We map our 11 supported languages to Stripe's format.
 *
 * Stripe locales: https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-locale
 */
export function mapToStripeLocale(locale: string): string {
  const stripeLocaleMap: Record<string, string> = {
    'en': 'en',      // English
    'de': 'de',      // German
    'fr': 'fr',      // French
    'es': 'es',      // Spanish
    'it': 'it',      // Italian
    'pt': 'pt',      // Portuguese
    'nl': 'nl',      // Dutch
    'sv': 'sv',      // Swedish
    'da': 'da',      // Danish
    'no': 'nb',      // Norwegian → Norwegian Bokmål
    'fi': 'fi',      // Finnish
  };

  return stripeLocaleMap[locale.toLowerCase()] || 'en';
}

/**
 * Get supported locales for the website
 */
export function getSupportedLocales(): string[] {
  return [...SUPPORTED_LOCALES];
}

/**
 * Validate if a locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  return getSupportedLocales().includes(locale.toLowerCase());
}

/**
 * Get user's locale from various sources with fallback
 */
export function getUserLocale(
  userLocale?: string,
  browserLocale?: string,
  defaultLocale: string = 'en'
): string {
  // Priority: user preference > browser > default
  const locale = userLocale || browserLocale || defaultLocale;

  // Extract language code if full locale provided (e.g., 'en-US' → 'en')
  const languageCode = locale.split('-')[0].toLowerCase();

  return isLocaleSupported(languageCode) ? languageCode : defaultLocale;
}
