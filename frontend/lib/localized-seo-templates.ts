/**
 * Shared localized SEO templates for product page samples
 * Used by: SampleGallery, schema-generator, sitemap-images, sitemap-pdfs
 *
 * All 11 locales: en, de, fr, es, pt, it, nl, sv, da, no, fi
 * Placeholders: {appName}, {num}
 */

// ── Alt text templates (for <img alt=""> and ImageObject description) ──
export const LOCALIZED_ALT_TEMPLATES: Record<string, string> = {
  en: 'Free printable {appName} worksheet {num} \u2013 educational activity for elementary students',
  de: 'Kostenloses druckbares {appName} Arbeitsblatt {num} \u2013 Lernaktivit\u00e4t f\u00fcr Grundsch\u00fcler',
  fr: 'Fiche imprimable gratuite {appName} {num} \u2013 activit\u00e9 \u00e9ducative pour \u00e9l\u00e8ves du primaire',
  es: 'Ficha imprimible gratuita {appName} {num} \u2013 actividad educativa para estudiantes de primaria',
  pt: 'Ficha imprim\u00edvel gratuita {appName} {num} \u2013 atividade educativa para alunos do prim\u00e1rio',
  it: 'Scheda stampabile gratuita {appName} {num} \u2013 attivit\u00e0 educativa per studenti delle elementari',
  nl: 'Gratis afdrukbaar {appName} werkblad {num} \u2013 educatieve activiteit voor basisschoolleerlingen',
  sv: 'Gratis utskrivbart {appName} arbetsblad {num} \u2013 pedagogisk aktivitet f\u00f6r grundskoleelever',
  da: 'Gratis udskrivbart {appName} arbejdsark {num} \u2013 p\u00e6dagogisk aktivitet for grundskoleelever',
  no: 'Gratis utskrivbart {appName} arbeidsark {num} \u2013 pedagogisk aktivitet for barneskoleelever',
  fi: 'Ilmainen tulostettava {appName} teht\u00e4v\u00e4 {num} \u2013 opetusaktiviteetti peruskoululaisille',
};

// ── Title templates (for ImageObject name / sitemap <image:title>) ──
export const LOCALIZED_TITLE_TEMPLATES: Record<string, string> = {
  en: '{appName} Worksheet {num}',
  de: '{appName} Arbeitsblatt {num}',
  fr: '{appName} Fiche {num}',
  es: '{appName} Ficha {num}',
  pt: '{appName} Ficha {num}',
  it: '{appName} Scheda {num}',
  nl: '{appName} Werkblad {num}',
  sv: '{appName} Arbetsblad {num}',
  da: '{appName} Arbejdsark {num}',
  no: '{appName} Arbeidsark {num}',
  fi: '{appName} Teht\u00e4v\u00e4 {num}',
};

// ── Caption templates (for ImageObject caption / sitemap <image:caption>) ──
export const LOCALIZED_CAPTION_TEMPLATES: Record<string, string> = {
  en: 'Free printable {appName} worksheet {num} for elementary students \u2013 educational resource',
  de: 'Kostenloses druckbares {appName} Arbeitsblatt {num} f\u00fcr Grundsch\u00fcler \u2013 Lehrmaterial',
  fr: 'Fiche imprimable gratuite {appName} {num} pour \u00e9l\u00e8ves du primaire \u2013 ressource p\u00e9dagogique',
  es: 'Ficha imprimible gratuita {appName} {num} para estudiantes de primaria \u2013 recurso educativo',
  pt: 'Ficha imprim\u00edvel gratuita {appName} {num} para alunos do prim\u00e1rio \u2013 recurso educativo',
  it: 'Scheda stampabile gratuita {appName} {num} per studenti delle elementari \u2013 risorsa educativa',
  nl: 'Gratis afdrukbaar {appName} werkblad {num} voor basisschoolleerlingen \u2013 educatief materiaal',
  sv: 'Gratis utskrivbart {appName} arbetsblad {num} f\u00f6r grundskoleelever \u2013 pedagogiskt material',
  da: 'Gratis udskrivbart {appName} arbejdsark {num} for grundskoleelever \u2013 p\u00e6dagogisk materiale',
  no: 'Gratis utskrivbart {appName} arbeidsark {num} for barneskoleelever \u2013 pedagogisk materiale',
  fi: 'Ilmainen tulostettava {appName} teht\u00e4v\u00e4 {num} peruskoululaisille \u2013 opetusmateriaali',
};

// ── Answer key title templates ──
export const LOCALIZED_ANSWER_KEY_TEMPLATES: Record<string, string> = {
  en: '{appName} Answer Key {num}',
  de: '{appName} L\u00f6sungsschl\u00fcssel {num}',
  fr: '{appName} Corrig\u00e9 {num}',
  es: '{appName} Clave de respuestas {num}',
  pt: '{appName} Gabarito {num}',
  it: '{appName} Chiave di risposta {num}',
  nl: '{appName} Antwoordsleutel {num}',
  sv: '{appName} Facit {num}',
  da: '{appName} Svarark {num}',
  no: '{appName} Fasit {num}',
  fi: '{appName} Vastausavain {num}',
};

// ── Answer key caption templates ──
export const LOCALIZED_ANSWER_KEY_CAPTION_TEMPLATES: Record<string, string> = {
  en: 'Answer key for {appName} worksheet {num}',
  de: 'L\u00f6sungsschl\u00fcssel f\u00fcr {appName} Arbeitsblatt {num}',
  fr: 'Corrig\u00e9 pour la fiche {appName} {num}',
  es: 'Clave de respuestas para la ficha {appName} {num}',
  pt: 'Gabarito para a ficha {appName} {num}',
  it: 'Chiave di risposta per la scheda {appName} {num}',
  nl: 'Antwoordsleutel voor {appName} werkblad {num}',
  sv: 'Facit f\u00f6r {appName} arbetsblad {num}',
  da: 'Svarark for {appName} arbejdsark {num}',
  no: 'Fasit for {appName} arbeidsark {num}',
  fi: 'Vastausavain {appName} teht\u00e4v\u00e4\u00e4n {num}',
};

// ── Helper functions ──

function applyTemplate(templates: Record<string, string>, locale: string, appName: string, num: number): string {
  const template = templates[locale] || templates.en;
  return template.replace('{appName}', appName).replace('{num}', String(num));
}

export function generateLocalizedAltText(appName: string, locale: string, num: number): string {
  return applyTemplate(LOCALIZED_ALT_TEMPLATES, locale, appName, num);
}

export function generateLocalizedTitle(appName: string, locale: string, num: number): string {
  return applyTemplate(LOCALIZED_TITLE_TEMPLATES, locale, appName, num);
}

export function generateLocalizedCaption(appName: string, locale: string, num: number): string {
  return applyTemplate(LOCALIZED_CAPTION_TEMPLATES, locale, appName, num);
}

export function generateLocalizedAnswerKeyTitle(appName: string, locale: string, num: number): string {
  return applyTemplate(LOCALIZED_ANSWER_KEY_TEMPLATES, locale, appName, num);
}

export function generateLocalizedAnswerKeyCaption(appName: string, locale: string, num: number): string {
  return applyTemplate(LOCALIZED_ANSWER_KEY_CAPTION_TEMPLATES, locale, appName, num);
}
