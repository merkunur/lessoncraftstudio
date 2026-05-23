import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_NAMES, type SupportedLocale } from '@/config/locales';

// Re-export for backward compatibility
export const locales = SUPPORTED_LOCALES;
export type Locale = SupportedLocale;
export const defaultLocale = DEFAULT_LOCALE;
export const localeNames = LOCALE_NAMES;

// Deep-merge two message trees. Keys present in `override` win; keys
// only present in `base` survive. Used so a locale's messages file can
// omit namespaces still being recreated per-language — the EN baseline
// fills the gap rather than rendering raw `t('foo.bar')` keys to the
// user. (Initial use: homepageV3 namespace ships EN-first; other
// locales' commissions add their namespace later — until then they
// render EN, NOT raw keys.)
function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof result[key] === 'object' &&
      result[key] !== null &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || defaultLocale;

  const baseMessages = (await import(`../messages/${defaultLocale}.json`)).default as Record<string, unknown>;

  if (!locales.includes(currentLocale as SupportedLocale)) {
    return { locale: defaultLocale, messages: baseMessages };
  }

  if (currentLocale === defaultLocale) {
    return { locale: defaultLocale, messages: baseMessages };
  }

  try {
    const localeMessages = (await import(`../messages/${currentLocale}.json`)).default as Record<string, unknown>;
    return {
      locale: currentLocale,
      messages: deepMerge(baseMessages, localeMessages),
    };
  } catch {
    return { locale: defaultLocale, messages: baseMessages };
  }
});