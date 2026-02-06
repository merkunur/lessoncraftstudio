/**
 * Shared Blog Schema Utilities
 *
 * Extracted from BlogSampleGallery.tsx so page.tsx and other consumers
 * can generate consistent schema descriptions for blog sample images.
 */

export const SCHEMA_DESCRIPTION: Record<string, { withKeyword: string; withoutKeyword: string }> = {
  en: { withKeyword: '{keyword} - {appName} worksheet sample', withoutKeyword: '{appName} - free printable worksheet sample' },
  de: { withKeyword: '{keyword} - {appName} Arbeitsblatt-Beispiel', withoutKeyword: '{appName} - kostenloses druckbares Arbeitsblatt' },
  fr: { withKeyword: '{keyword} - {appName} exemple de fiche', withoutKeyword: '{appName} - fiche imprimable gratuite' },
  es: { withKeyword: '{keyword} - {appName} ejemplo de ficha', withoutKeyword: '{appName} - ficha imprimible gratuita' },
  pt: { withKeyword: '{keyword} - {appName} exemplo de ficha', withoutKeyword: '{appName} - ficha imprim\u00edvel gratuita' },
  it: { withKeyword: '{keyword} - {appName} esempio di scheda', withoutKeyword: '{appName} - scheda stampabile gratuita' },
  nl: { withKeyword: '{keyword} - {appName} werkblad-voorbeeld', withoutKeyword: '{appName} - gratis afdrukbaar werkblad' },
  sv: { withKeyword: '{keyword} - {appName} arbetsbladsexempel', withoutKeyword: '{appName} - gratis utskrivbart arbetsblad' },
  da: { withKeyword: '{keyword} - {appName} arbejdsark-eksempel', withoutKeyword: '{appName} - gratis udskrivbart arbejdsark' },
  no: { withKeyword: '{keyword} - {appName} arbeidsark-eksempel', withoutKeyword: '{appName} - gratis utskrivbart arbeidsark' },
  fi: { withKeyword: '{keyword} - {appName} teht\u00e4v\u00e4esimerkki', withoutKeyword: '{appName} - ilmainen tulostettava teht\u00e4v\u00e4' },
};

export function generateSchemaDescription(appName: string, locale: string, focusKeyword?: string): string {
  const templates = SCHEMA_DESCRIPTION[locale] || SCHEMA_DESCRIPTION.en;
  if (focusKeyword) {
    return templates.withKeyword.replace('{keyword}', focusKeyword).replace('{appName}', appName);
  }
  return templates.withoutKeyword.replace('{appName}', appName);
}
