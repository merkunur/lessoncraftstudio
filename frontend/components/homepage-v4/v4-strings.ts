/* Shared constants for the homepage-v4 preview components.
 *
 * NATIVE_LOCALE_NAMES: each locale's own native name (accented forms — the
 * `LOCALE_NAMES` map at @/config/locales ships unaccented ASCII forms for
 * legacy reasons and MUST NOT be edited per §10.3, so v4 carries its own
 * presentation map). Consumed by HeroV4's real locale-chip links and by
 * BrowseByTopicSSR's optional language group (v4 preview only — the group
 * is off by default, so this import is inert on the live homepage).
 *
 * i18n note: the homepageV4 message namespace ships EN-first in
 * frontend/messages/en.json ONLY. frontend/i18n/request.ts deep-merges the
 * EN baseline into every locale's messages, so the 10 non-EN locales render
 * the EN strings (never raw keys) until the per-locale native-ensemble
 * fan-out commission (§A.13.48) lands.
 */

import type { SupportedLocale } from '@/config/locales';

export const NATIVE_LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  fi: 'Suomi',
};
