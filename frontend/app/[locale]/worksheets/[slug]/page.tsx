/* /[locale]/worksheets/[slug] — Tier-3 deck LANDING route (Phase-5 pilot).
 *
 * Phase-2 spec: NEW Next.js SSR route (no trailing slash); the deck.html asset
 * stays nginx-served at /<locale>/decks/<slug>/ and repoints its canonical here.
 * Phase-3 design: Hybrid — editorial spine (cream-50 / Fraunces / ink) + Direction-A
 * card signature (white cards, dual shadow, teal structure, coral accent), teal
 * primary CTA (AA-safe), teal-outline secondaries. Phase-4 copy: gated, ledger-true.
 *
 * PILOT: Math × Kindergarten × EN only (16 coordinates). generateStaticParams emits
 * only the pilot slugs; any other slug/locale → notFound(). Does NOT touch live /topic/.
 */
import { Metadata } from 'next';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { wwwImg } from '@/lib/img-host';
import { canonicalUrl, localePath, CANONICAL_HOST } from '@/lib/seo/url';
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema';
import { buildEmbedSnippet } from '@/lib/seo/embed-snippet';
import { EmbedWorksheet } from '@/components/worksheets/EmbedWorksheet';
import { ogLocaleMap } from '@/lib/schema-generator';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';
import { getAxisSlug } from '@/lib/taxonomy';
import { getTranslations } from 'next-intl/server';
import { targetLangName, targetLangSlug } from '@/lib/target-language';
import {
  getLandingLocales, getLandingSlugs, getLandingBySlug, deckAssets, getSiblingLandingsByCoordinate,
  getRelatedLandings, Landing,
} from '@/lib/seo/landing-content';
import { getMakerContent, MAKER_KEYS, MakerKey } from '@/lib/seo/maker-content';

// Per-locale framework: human-facing chip + JSON-LD name. Readiness/no-standard de landings carry NO
// framework chip; standard-bearing coded landings (future de slices) cite Lehrplan / KMK Bildungsstandards.
// Never literal "Common Core" in de (STEP-0 Ruling B).
const FRAMEWORK_BY_LOCALE: Record<string, { jsonld: string; chip: string }> = {
  en: { jsonld: 'Common Core State Standards', chip: 'Common Core' },
  de: { jsonld: 'Bildungsstandards der Kultusministerkonferenz (KMK)', chip: 'Lehrplan' },
  es: { jsonld: 'Nueva Escuela Mexicana (SEP)', chip: 'Nueva Escuela Mexicana' },
  sv: { jsonld: 'Läroplan för grundskolan (Lgr22)', chip: 'Lgr22' },
  nl: { jsonld: 'Kerndoelen primair onderwijs', chip: 'SLO-kerndoelen' },
  da: { jsonld: 'Fælles Mål', chip: 'Fælles Mål' },
  it: { jsonld: 'Indicazioni nazionali per il curricolo', chip: 'Indicazioni Nazionali' },
  no: { jsonld: 'Læreplanverket for Kunnskapsløftet (LK20)', chip: 'LK20' },
  fr: { jsonld: "Programmes de l'Éducation Nationale", chip: 'Éducation Nationale' },
  pt: { jsonld: 'Base Nacional Comum Curricular (BNCC)', chip: 'BNCC' },
  fi: { jsonld: 'OPS 2014', chip: 'OPS 2014' },
};

// Per-locale UI chrome (the route was EN-hardcoded). de pages render German chrome.
const UI_STRINGS: Record<string, {
  worksheets: string; playInteractive: string; downloadPdf: string; answerKey: string;
  moreToTry: string; tryInteractive: string; makerSoon: string; comingSoon: string;
  sameThemeHeading: string; sameLevelHeading: string;
  madeWith: (t: string) => string; typeCrumb: (eyebrow: string) => string;
  playAria: (h1: string) => string; previewAlt: (h1: string) => string;
  embedButton: string; embedCopy: string; embedCopied: string; embedPrefix: string; embedKeyword: string;
}> = {
  en: {
    worksheets: 'Worksheets', playInteractive: 'Play interactive', downloadPdf: 'Download PDF', answerKey: 'Answer key',
    moreToTry: 'More worksheets to try', tryInteractive: 'Try it — interactive', makerSoon: 'Worksheet-maker page coming soon.',
    comingSoon: 'Aligned standard — coming soon',
    sameThemeHeading: 'More with this theme', sameLevelHeading: 'More for this level',
    madeWith: (t) => `Made with the ${t} maker`, typeCrumb: (e) => e + 's',
    playAria: (h1) => `Play ${h1}`, previewAlt: (h1) => `Preview of ${h1}`,
    embedButton: 'Embed this worksheet', embedCopy: 'Copy code', embedCopied: 'Copied!',
    embedPrefix: 'Worksheet from', embedKeyword: 'free printable worksheets',
  },
  de: {
    worksheets: 'Arbeitsblätter', playInteractive: 'Interaktiv spielen', downloadPdf: 'PDF herunterladen', answerKey: 'Lösungen',
    moreToTry: 'Weitere Arbeitsblätter zum Ausprobieren', tryInteractive: 'Jetzt ausprobieren', makerSoon: 'Generator-Seite folgt in Kürze.',
    comingSoon: '', // de: no dashed framework chip on strand-only landings
    sameThemeHeading: 'Mehr mit diesem Thema', sameLevelHeading: 'Mehr für diese Stufe',
    madeWith: (t) => `Erstellt mit dem ${t}-Generator`, typeCrumb: (e) => e.replace(/^Arbeitsblatt:\s*/, ''),
    playAria: (h1) => `${h1} spielen`, previewAlt: (h1) => `Vorschau: ${h1}`,
    embedButton: 'Dieses Arbeitsblatt einbetten', embedCopy: 'Code kopieren', embedCopied: 'Kopiert!',
    embedPrefix: 'Arbeitsblatt von', embedKeyword: 'kostenlose druckbare Arbeitsblätter',
  },
  es: {
    worksheets: 'Hojas de trabajo', playInteractive: 'Jugar', downloadPdf: 'Descargar PDF', answerKey: 'Solución',
    moreToTry: 'Más hojas de trabajo', tryInteractive: 'Pruébalo — interactivo', makerSoon: 'Generador próximamente.',
    comingSoon: '', // es (MX): no dashed framework chip on strand-only landings (decided per coordinate at the es ledger)
    sameThemeHeading: 'Más con este tema', sameLevelHeading: 'Más para este nivel',
    madeWith: (t) => `Hecho con el generador de ${t}`, typeCrumb: (e) => e,
    playAria: (h1) => `Jugar ${h1}`, previewAlt: (h1) => `Vista previa de ${h1}`,
    embedButton: 'Insertar esta hoja', embedCopy: 'Copiar código', embedCopied: '¡Copiado!',
    embedPrefix: 'Hoja de trabajo de', embedKeyword: 'hojas de trabajo imprimibles gratis',
  },
  sv: {
    worksheets: 'Arbetsblad', playInteractive: 'Spela', downloadPdf: 'Ladda ner PDF', answerKey: 'Facit',
    moreToTry: 'Fler arbetsblad att prova', tryInteractive: 'Prova interaktivt', makerSoon: 'Generatorsida kommer snart.',
    comingSoon: '', // sv: no dashed framework chip on strand-only readiness landings (per the sv ledger ⑥)
    sameThemeHeading: 'Mer med samma tema', sameLevelHeading: 'Mer för samma nivå',
    madeWith: (t) => `Skapat med ${t}-generatorn`, typeCrumb: (e) => e.replace(/^Arbetsblad:\s*/, ''),
    playAria: (h1) => `Spela ${h1}`, previewAlt: (h1) => `Förhandsvisning av ${h1}`,
    // [NSR-FLAG] sv embed labels — native review pending (§17.5.1)
    embedButton: 'Bädda in detta arbetsblad', embedCopy: 'Kopiera kod', embedCopied: 'Kopierat!',
    embedPrefix: 'Arbetsblad från', embedKeyword: 'gratis utskrivbara arbetsblad',
  },
  nl: {
    worksheets: 'Werkbladen', playInteractive: 'Spelen', downloadPdf: 'PDF downloaden', answerKey: 'Antwoorden',
    moreToTry: 'Meer werkbladen om te proberen', tryInteractive: 'Probeer het interactief', makerSoon: 'Generatorpagina komt binnenkort.',
    comingSoon: '', // nl: no dashed framework chip on strand-only readiness landings (per the nl ledger ⑥)
    sameThemeHeading: 'Meer met dit thema', sameLevelHeading: 'Meer voor dit niveau',
    madeWith: (t) => `Gemaakt met de ${t}-generator`, typeCrumb: (e) => e.replace(/^Werkblad:\s*/, ''),
    playAria: (h1) => `${h1} spelen`, previewAlt: (h1) => `Voorbeeld van ${h1}`,
    embedButton: 'Dit werkblad insluiten', embedCopy: 'Code kopiëren', embedCopied: 'Gekopieerd!',
    embedPrefix: 'Werkblad van', embedKeyword: 'gratis printbare werkbladen',
  },
  da: {
    worksheets: 'Opgaver', playInteractive: 'Spil interaktivt', downloadPdf: 'Hent PDF', answerKey: 'Facitliste',
    moreToTry: 'Flere opgaver at prøve', tryInteractive: 'Prøv den interaktivt', makerSoon: 'Generatorsiden kommer snart.',
    comingSoon: '', // da: no dashed framework chip on strand-only readiness landings (da ledger)
    sameThemeHeading: 'Mere med dette tema', sameLevelHeading: 'Mere til samme klassetrin',
    madeWith: (t) => `Lavet med ${t}-generatoren`, typeCrumb: (e) => e.replace(/^Opgave:\s*/, ''),
    playAria: (h1) => `Spil ${h1}`, previewAlt: (h1) => `Forhåndsvisning af ${h1}`,
    // [NSR-FLAG] da embed labels — native review pending (§17.5.1)
    embedButton: 'Indlejr dette opgaveark', embedCopy: 'Kopiér kode', embedCopied: 'Kopieret!',
    embedPrefix: 'Arbejdsark fra', embedKeyword: 'gratis printbare arbejdsark',
  },
  it: {
    worksheets: 'Schede didattiche', playInteractive: 'Gioca', downloadPdf: 'Scarica PDF', answerKey: 'Soluzioni',
    moreToTry: 'Altre schede da provare', tryInteractive: 'Provala — interattiva', makerSoon: 'Pagina del generatore in arrivo.',
    comingSoon: '', // it: no dashed framework chip on strand-only readiness landings (it ledger)
    sameThemeHeading: 'Altro con questo tema', sameLevelHeading: 'Altro per questo livello',
    madeWith: (t) => `Creato con il generatore di ${t}`, typeCrumb: (e) => e.replace(/^Scheda:\s*/, ''),
    playAria: (h1) => `Gioca ${h1}`, previewAlt: (h1) => `Anteprima di ${h1}`,
    embedButton: 'Incorpora questa scheda', embedCopy: 'Copia codice', embedCopied: 'Copiato!',
    embedPrefix: 'Scheda di', embedKeyword: 'schede stampabili gratuite',
  },
  no: {
    worksheets: 'Arbeidsark', playInteractive: 'Spill', downloadPdf: 'Last ned PDF', answerKey: 'Fasit',
    moreToTry: 'Flere arbeidsark å prøve', tryInteractive: 'Prøv interaktivt', makerSoon: 'Generatorside kommer snart.',
    comingSoon: '', // no: no dashed framework chip on strand-only readiness landings (Nordic family precedent da/sv/nl)
    sameThemeHeading: 'Mer med samme tema', sameLevelHeading: 'Mer for samme trinn',
    madeWith: (t) => `Laget med ${t}-generatoren`, typeCrumb: (e) => e.replace(/^Oppgave:\s*/, ''),
    playAria: (h1) => `Spill ${h1}`, previewAlt: (h1) => `Forhåndsvisning av ${h1}`,
    // [NSR-FLAG] no embed labels — native review pending (§17.5.1)
    embedButton: 'Bygg inn dette arbeidsarket', embedCopy: 'Kopier kode', embedCopied: 'Kopiert!',
    embedPrefix: 'Arbeidsark fra', embedKeyword: 'gratis utskrivbare arbeidsark',
  },
  fr: {
    worksheets: 'Fiches', playInteractive: 'Jouer', downloadPdf: 'Télécharger le PDF', answerKey: 'Corrigé',
    moreToTry: "D'autres fiches à essayer", tryInteractive: 'Jouer en ligne', makerSoon: 'Le générateur arrive bientôt.',
    comingSoon: '', // fr: no dashed framework chip on strand-only readiness landings (family precedent de/it/no)
    sameThemeHeading: 'Plus avec le même thème', sameLevelHeading: 'Plus pour le même niveau',
    madeWith: (t) => `Créé avec le générateur ${t}`, typeCrumb: (e) => e.replace(/^(Fiche|Activité|Exercice)\s*:\s*/, ''),
    playAria: (h1) => `Jouer à ${h1}`, previewAlt: (h1) => `Aperçu : ${h1}`,
    embedButton: 'Intégrer cette fiche', embedCopy: 'Copier le code', embedCopied: 'Copié !',
    embedPrefix: 'Fiche de', embedKeyword: 'fiches gratuites à imprimer',
  },
  pt: {
    worksheets: 'Atividades', playInteractive: 'Jogar', downloadPdf: 'Baixar PDF', answerKey: 'Gabarito',
    moreToTry: 'Mais atividades para experimentar', tryInteractive: 'Jogar online', makerSoon: 'O gerador chega em breve.',
    comingSoon: '', // pt: no dashed framework chip on strand-only readiness landings (family precedent de/it/no/fr)
    sameThemeHeading: 'Mais com o mesmo tema', sameLevelHeading: 'Mais para o mesmo nível',
    madeWith: (t) => `Criado com o gerador de ${t}`, typeCrumb: (e) => e.replace(/^(Atividade|Ficha|Exercício)\s*:\s*/, ''),
    playAria: (h1) => `Jogar ${h1}`, previewAlt: (h1) => `Prévia: ${h1}`,
    embedButton: 'Incorporar esta atividade', embedCopy: 'Copiar código', embedCopied: 'Copiado!',
    embedPrefix: 'Atividade de', embedKeyword: 'atividades grátis para imprimir',
  },
  fi: {
    worksheets: 'Tehtävät', playInteractive: 'Pelaa', downloadPdf: 'Lataa PDF', answerKey: 'Vastaukset',
    moreToTry: 'Lisää tehtäviä kokeiltavaksi', tryInteractive: 'Kokeile — vuorovaikutteinen', makerSoon: 'Tehtävägeneraattori tulossa pian.',
    comingSoon: '', // fi: no dashed framework chip on strand-only readiness landings (family precedent de/it/no/fr/pt)
    sameThemeHeading: 'Lisää samasta aiheesta', sameLevelHeading: 'Lisää samalle tasolle',
    madeWith: (t) => `Tehty ${t}-generaattorilla`, typeCrumb: (e) => e.replace(/^Tehtävä:\s*/, ''),
    playAria: (h1) => `Pelaa: ${h1}`, previewAlt: (h1) => `Esikatselu: ${h1}`,
    embedButton: 'Upota tämä tehtävä', embedCopy: 'Kopioi koodi', embedCopied: 'Kopioitu!',
    embedPrefix: 'Tehtävä:', embedKeyword: 'ilmaiset tulostettavat tehtävät',
  },
};

export const revalidate = 3600;

// SSG: pre-render every landing at build time. (An on-demand-ISR variant — returning []
// here — was tried 2026-07-05 to shrink the build, but the landing render calls headers()
// [via next-intl], which under on-demand render throws "Page changed from static to dynamic
// … reason: headers" → 500 on every landing. SSG tolerates headers() at build time, so this
// is the correct, proven-working shape. The build-memory problem was NOT the page count — it
// was vm.max_map_count=65530 (raised to 1048576) + a deleted webpack cache; both fixed.)
export function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of getLandingLocales()) {
    for (const slug of getLandingSlugs(locale)) out.push({ locale, slug });
  }
  return out;
}

function metaDescription(l: Landing): string {
  // First sentence(s) of P1, trimmed to ~155 chars on a word boundary.
  const s = l.p1.replace(/\s+/g, ' ').trim();
  if (s.length <= 158) return s;
  return s.slice(0, 155).replace(/\s+\S*$/, '') + '…';
}

function typeHubSlug(l: Landing, locale: string): string {
  return getAxisSlug('exercise-type', l.coordinate.type, locale) || l.coordinate.type;
}
function themeHubSlug(l: Landing, locale: string): string {
  return getAxisSlug('theme', l.coordinate.theme, locale) || l.coordinate.theme;
}

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } },
): Promise<Metadata> {
  const l = getLandingBySlug(params.locale, params.slug);
  if (!l) return {};
  const canonical = canonicalUrl(localePath(params.locale, 'worksheets', l.slug));
  // Gold per-deck meta when authored (demand-aware, not a p1 truncation), else truncated p1.
  const description = l.metaDescription || metaDescription(l);
  // Root layout's title template appends " · LessonCraftStudio" — don't double-brand.
  // Gold per-deck <title> when present (e.g. MX "hojas de trabajo"-anchored), else the h1.
  const title = l.title || l.h1;

  // Cross-locale hreflang: this coordinate + its siblings in other locales (matched on type+mode+theme,
  // NOT level — level is re-derived per locale). buildHreflangAlternates owns the code map (pt→pt-BR) + x-default→en.
  const slugByLocale: Record<string, string> = { [params.locale]: l.slug };
  for (const s of getSiblingLandingsByCoordinate(l.coordinate, params.locale)) slugByLocale[s.locale] = s.slug;
  const languages = buildHreflangAlternates(
    getLandingLocales(),
    (loc) => (slugByLocale[loc] ? canonicalUrl(localePath(loc, 'worksheets', slugByLocale[loc])) : null),
    CANONICAL_HOST,
  );

  const og = deckAssets(params.locale, l.canonicalDeckSlug).thumbnail;
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: l.h1, description, type: 'article', url: canonical, siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[params.locale] || params.locale,
      images: [{ url: og, alt: l.h1 }],
    },
    twitter: { card: 'summary_large_image', title: l.h1, description, images: [{ url: og, alt: l.h1 }] },
    robots: INDEXABLE_ROBOTS,
  };
}

// The deck's coordinate.type maps 1:1 to a worksheet-generator MAKER_KEY for all
// shipped landing types EXCEPT picture-trail (the EN deck-landing name for the
// picture-path mechanic, §15.10), which aliases to the picture-path maker.
const MAKER_TYPE_ALIAS: Record<string, string> = { 'picture-trail': 'picture-path' };

export default async function WorksheetLandingPage(
  { params }: { params: { locale: string; slug: string } },
) {
  const { locale } = params;
  const l = getLandingBySlug(locale, params.slug);
  if (!l) notFound();
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;
  const fw = FRAMEWORK_BY_LOCALE[locale] || FRAMEWORK_BY_LOCALE.en;

  // Resolve the worksheet-generator (maker) landing this deck was made with, in
  // the page's language, so the bottom "Made with the … maker" block links out.
  const _makerKey = (MAKER_TYPE_ALIAS[l.coordinate.type] ?? l.coordinate.type) as MakerKey;
  const maker = (MAKER_KEYS as readonly string[]).includes(_makerKey)
    ? await getMakerContent(locale, _makerKey)
    : null;

  const a = deckAssets(locale, l.canonicalDeckSlug);
  const canonical = canonicalUrl(localePath(locale, 'worksheets', l.slug));
  // W6 embed-backlink flywheel: copy-paste snippet (2 crawlable <a> outside the
  // iframe — brand-anchor→this canonical, keyword-anchor→homepage). §1 / §14.3a.
  const embedSnippet = buildEmbedSnippet({
    iframeUrl: a.deckDir,
    brandHref: canonical,
    homeHref: CANONICAL_HOST,
    prefix: ui.embedPrefix,
    keyword: ui.embedKeyword,
    title: l.h1,
    id: `lcs-embed-${l.slug}`,
  });
  const typeHub = localePath(locale, 'topic', typeHubSlug(l, locale));
  const themeHub = localePath(locale, 'topic', themeHubSlug(l, locale));
  const intersection = localePath(locale, 'topic', themeHubSlug(l, locale), typeHubSlug(l, locale));

  // Cross-language ("Learn <X>") variant: a target language ISO on the coordinate.
  // These landings live under the Languages (/learn) category, carry NO CCSS standard,
  // and breadcrumb "Languages › Learn <Target> › <H1>" (reusing the learnPage i18n
  // namespace I authored in 11 locales) instead of the monolingual "Worksheets › Type".
  const xlang = l.coordinate.target;
  const tLearn = xlang ? await getTranslations({ locale, namespace: 'learnPage' }) : null;
  const targetName = xlang ? targetLangName(xlang, locale) : '';
  const learnCat = tLearn ? tLearn('category') : '';
  const learnCrumb = tLearn ? tLearn('learnH1', { lang: targetName }) : '';
  const learnHub = xlang ? localePath(locale, 'learn', targetLangSlug(xlang, locale)) : '';

  const breadcrumbSchema = buildBreadcrumbSchema(
    xlang
      ? [
          { name: learnCat, path: localePath(locale, 'learn') },
          { name: learnCrumb, path: learnHub },
          { name: l.h1, path: localePath(locale, 'worksheets', l.slug) },
        ]
      : [
          { name: ui.worksheets, path: localePath(locale, 'worksheets') },
          { name: ui.typeCrumb(l.eyebrow), path: typeHub },
          { name: l.h1, path: localePath(locale, 'worksheets', l.slug) },
        ],
  );

  // Per-entry educational level. SINGLE band via coordinate.level, OR an honest grade
  // SPAN via l.levels (ordered low→high band keys) when a worksheet genuinely suits >1
  // grade. Span → range chip ("Kindergarten–Grade 1") + array educationalLevel + range
  // typicalAgeRange. Absent l.levels → single-band path is byte-equivalent to before
  // (zero regression to shipped single-band landings). Defaults to kindergarten.
  const LEVELS: Record<string, { chip: string; schema: string; age: string }> = {
    'preschool': { chip: 'Preschool', schema: 'Preschool', age: '3-4' },
    'kindergarten': { chip: 'Kindergarten', schema: 'Kindergarten', age: '5-6' },
    'grade-1': { chip: 'Grade 1', schema: 'Grade 1', age: '6-7' },
    'grade-2': { chip: 'Grade 2', schema: 'Grade 2', age: '7-8' },
    // grade-3: K-3 ceiling band for the printable math-skill types (telling-time to the
    // minute, multi-step measurement, etc.) whose content is legitimately Grade 3. Additive
    // — no shipped landing references 'grade-3', so K/Gr1/Gr2-stays regression holds trivially.
    'grade-3': { chip: 'Grade 3', schema: 'Grade 3', age: '8-9' },
    // de axis: Vorschule / 1. Klasse / 2. Klasse (+ 3. Klasse for the printable math-skill landings,
    // whose grade-3 content sits in the German Grundschule's 3. Klasse). coordinate.level re-derived per locale.
    'vorschule': { chip: 'Vorschule', schema: 'Vorschule', age: '5-6' },
    '1-klasse': { chip: '1. Klasse', schema: '1. Klasse', age: '6-7' },
    '2-klasse': { chip: '2. Klasse', schema: '2. Klasse', age: '7-8' },
    '3-klasse': { chip: '3. Klasse', schema: '3. Klasse', age: '8-9' },
    // es MX bands (Mexican Spanish): Educación Preescolar (por años) + primer/segundo grado de primaria.
    'preescolar': { chip: 'Preescolar (5 años)', schema: 'Educación Preescolar', age: '5-6' },
    'primer-grado': { chip: 'Primer grado', schema: 'Primer grado de primaria', age: '6-7' },
    'segundo-grado': { chip: 'Segundo grado', schema: 'Segundo grado de primaria', age: '7-8' },
    'tercer-grado': { chip: 'Tercer grado', schema: 'Tercer grado de primaria', age: '8-9' },
    // sv 3-band axis (Lgr22, +1-year Nordic shift): förskola (readiness, EN Preschool+Kindergarten) / åk 1 / åk 2.
    'forskola': { chip: 'Förskola', schema: 'Förskola', age: '4-6' },
    'ak-1': { chip: 'Åk 1', schema: 'Årskurs 1', age: '7-8' },
    'ak-2': { chip: 'Åk 2', schema: 'Årskurs 2', age: '8-9' },
    'ak-3': { chip: 'Åk 3', schema: 'Årskurs 3', age: '9-10' },
    // nl 3-band axis (SLO-kerndoelen): kleuters (readiness, EN Preschool+Kindergarten, groep 1-2) /
    // groep 3 (first formal, ≤20 CARRIES) / groep 4 (21-100 CARRIES). split-at-20; groep 5 OUT.
    'kleuters': { chip: 'Kleuters', schema: 'Kleuters (groep 1-2)', age: '4-6' },
    'groep-3': { chip: 'Groep 3', schema: 'Groep 3', age: '6-7' },
    'groep-4': { chip: 'Groep 4', schema: 'Groep 4', age: '7-8' },
    'groep-5': { chip: 'Groep 5', schema: 'Groep 5', age: '8-9' },
    // da 3-band axis (Fælles Mål, da ledger-lock 2026-06-12): børnehaveklassen (readiness floor =
    // børnehave + 0. klasse merged, ages 3-6) / 1. klasse (≤20 CARRIES, 7) / 2. klasse (21-100, 8);
    // da SHARES the '1-klasse'/'2-klasse' KEYS with de — Danish writes lowercase
    // "1. klasse", so the locale-prefixed 'da:' entries win via the prefixed lookup below.
    // (+ 3. klasse for the Part 2 printable math-skill landings, whose grade-3 content sits in the
    // Danish folkeskole's 3. klasse; additive — no shipped da landing referenced it, regression-safe.)
    'boernehaveklasse': { chip: 'Børnehaveklassen (0. klasse)', schema: 'Børnehaveklassen', age: '3-6' },
    'da:1-klasse': { chip: '1. klasse', schema: '1. klasse', age: '7-8' },
    'da:2-klasse': { chip: '2. klasse', schema: '2. klasse', age: '8-9' },
    'da:3-klasse': { chip: '3. klasse', schema: '3. klasse', age: '9-10' },
    // it — 3-band spine (terza = OUT, >ceiling); infanzia folds EN preschool+K (no separate K year).
    'infanzia': { chip: "Scuola dell'infanzia", schema: "Scuola dell'infanzia", age: '3-6' },
    'classe-prima': { chip: 'Classe prima – scuola primaria', schema: 'Scuola primaria - classe prima', age: '6-7' },
    'classe-seconda': { chip: 'Classe seconda – scuola primaria', schema: 'Scuola primaria - classe seconda', age: '7-8' },
    'classe-terza': { chip: 'Classe terza – scuola primaria', schema: 'Scuola primaria - classe terza', age: '8-9' },
    // no — 3-band spine (LK20, +1-year offset: Norway starts 1. trinn at age 6, NO pre-school year inside
    // school). 1. trinn = readiness floor (EN Kindergarten + ALL readiness + concrete ≤10); 2. trinn =
    // symbolic arithmetic ≤20 CARRIES + chart-count + formal decoding; 3. trinn = within-100 (2.NBT).
    // (+ 4. trinn for the Part 2 printable math-skill landings: with the +1 offset, EN grade-3 content
    // maps to the Norwegian 4. trinn; additive — no shipped no landing referenced it, regression-safe.)
    // Keys are collision-free (no other locale uses 'N-trinn'), so unprefixed — the route's locale-prefixed
    // lookup falls through to these.
    '1-trinn': { chip: '1. trinn', schema: '1. trinn', age: '6-7' },
    '2-trinn': { chip: '2. trinn', schema: '2. trinn', age: '7-8' },
    '3-trinn': { chip: '3. trinn', schema: '3. trinn', age: '8-9' },
    '4-trinn': { chip: '4. trinn', schema: '4. trinn', age: '9-10' },
    // fr — 3-band spine (Éducation Nationale: maternelle / CP / CE1; CE2 OUT; no offset, CP=age 6)
    'maternelle': { chip: 'Maternelle', schema: 'École maternelle', age: '3-6' },
    'cp': { chip: 'CP', schema: 'Cours préparatoire (CP)', age: '6-7' },
    'ce1': { chip: 'CE1', schema: 'Cours élémentaire 1 (CE1)', age: '7-8' },
    'ce2': { chip: 'CE2', schema: 'Cours élémentaire 2 (CE2)', age: '8-9' },
    'educacao-infantil': { chip: 'Educação infantil', schema: 'Educação infantil', age: '3-6' },
    '1o-ano': { chip: '1º ano', schema: 'Ensino fundamental — 1º ano', age: '6-7' },
    '2o-ano': { chip: '2º ano', schema: 'Ensino fundamental — 2º ano', age: '7-8' },
    '3o-ano': { chip: '3º ano', schema: 'Ensino fundamental — 3º ano', age: '8-9' },
    // fi — 3-band spine (OPS 2014): esikoulu (esiopetus, readiness) / 1. luokka / 2. luokka. Keys collision-free.
    // (+ 3. luokka for the Part 2 printable math-skill landings, whose grade-3 content sits in the Finnish
    // perusopetus 3. luokka; additive — no shipped fi landing referenced it, regression-safe.)
    'esikoulu': { chip: 'Esikoulu', schema: 'Esiopetus', age: '5-6' },
    '1-luokka': { chip: '1. luokka', schema: 'Perusopetus — 1. luokka', age: '7' },
    '2-luokka': { chip: '2. luokka', schema: 'Perusopetus — 2. luokka', age: '8' },
    '3-luokka': { chip: '3. luokka', schema: 'Perusopetus — 3. luokka', age: '9' },
    // Cross-language ("Learn <X>") vocabulary decks are NOT national-grade-banded — they're
    // early-language beginner practice for K-3 kids. One neutral "Beginner" band per locale
    // (wide 5-9 age) keeps educationalLevel honest (no fake grade/standard). Locale-prefixed
    // chips so a de Learn-English page reads "Anfänger", not "Beginner".
    'language-beginner': { chip: 'Beginner', schema: 'Beginner', age: '5-9' },
    'de:language-beginner': { chip: 'Anfänger', schema: 'Anfänger', age: '5-9' },
    'es:language-beginner': { chip: 'Principiante', schema: 'Principiante', age: '5-9' },
    'fr:language-beginner': { chip: 'Débutant', schema: 'Débutant', age: '5-9' },
    'it:language-beginner': { chip: 'Principiante', schema: 'Principiante', age: '5-9' },
    'nl:language-beginner': { chip: 'Beginner', schema: 'Beginner', age: '5-9' },
    'pt:language-beginner': { chip: 'Iniciante', schema: 'Iniciante', age: '5-9' },
    'sv:language-beginner': { chip: 'Nybörjare', schema: 'Nybörjare', age: '5-9' },
    'da:language-beginner': { chip: 'Begynder', schema: 'Begynder', age: '5-9' },
    'no:language-beginner': { chip: 'Nybegynner', schema: 'Nybegynner', age: '5-9' },
    'fi:language-beginner': { chip: 'Aloittelija', schema: 'Aloittelija', age: '5-9' },
  };
  const _bandKeys = l.levels && l.levels.length ? l.levels : [l.coordinate.level];
  const _bands = _bandKeys.map((k) => LEVELS[`${locale}:${k}`] || LEVELS[k]).filter(Boolean);
  const _safe = _bands.length ? _bands : [LEVELS['kindergarten']];
  const _isSpan = _safe.length > 1;
  const _lo = _safe[0];
  const _hi = _safe[_safe.length - 1];
  const lvl = {
    chip: _isSpan ? `${_lo.chip}–${_hi.chip}` : _lo.chip,
    age: _isSpan ? `${_lo.age.split('-')[0]}-${_hi.age.split('-')[1]}` : _lo.age,
  };
  // schema.org educationalLevel: single string (single band) or array (span).
  const educationalLevelValue: string | string[] = _isSpan ? _safe.map((b) => b.schema) : _lo.schema;

  const learningResource = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: l.h1,
    description: metaDescription(l),
    url: canonical,
    inLanguage: locale,
    isAccessibleForFree: true,
    learningResourceType: 'Worksheet',
    educationalLevel: educationalLevelValue,
    typicalAgeRange: lvl.age,
    teaches: l.strand,
    image: a.thumbnail,
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
  } as Record<string, unknown>;
  // Standard-bearing landings carry an explicit CCSS educationalAlignment; strand-only landings (no l.standard)
  // are unchanged (Phase-4 flag-5 deferral). Shape matches the established activity-page pattern
  // (alignmentType 'educationalSubject' + targetName + educationalFramework, NO targetUrl — corestandards.org
  // standard pages 404, and the code in targetName is the durable machine anchor).
  if (l.standard) {
    learningResource.educationalAlignment = {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      educationalFramework: fw.jsonld,
      targetName: l.standard,
    };
  }

  // Quiz rich-result (Google "Practice problems"): a SEPARATE third JSON-LD node,
  // emitted ONLY when the landing carries ≥2 practiceProblems (qualifying families
  // per fancy-orbit §348; honest-fit — each q mirrors what the child sees). Distinct
  // @type from LearningResource/BreadcrumbList; the CCSS code may legitimately repeat.
  const quizSchema = (l.practiceProblems && l.practiceProblems.length >= 2) ? {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: l.h1,
    about: { '@type': 'Thing', name: l.strand },
    educationalLevel: educationalLevelValue,
    ...(l.standard ? { educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      educationalFramework: fw.jsonld,
      targetName: l.standard,
    } } : {}),
    hasPart: l.practiceProblems.map((p) => ({
      '@type': 'Question',
      eduQuestionType: 'Flashcard',
      text: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  } : null;

  const SHADOW = 'shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_24px_56px_rgba(20,30,28,0.12)]';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {quizSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />}

      <main className="bg-cream-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12">

          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 flex flex-wrap items-center gap-x-2 gap-y-1 mb-6">
            {xlang ? (
              <>
                <Link href={localePath(locale, 'learn')} className="hover:text-ink-900">{learnCat}</Link>
                <span aria-hidden="true" className="text-cream-300">›</span>
                <Link href={learnHub} className="hover:text-ink-900">{learnCrumb}</Link>
                <span aria-hidden="true" className="text-cream-300 hidden sm:inline">›</span>
                <span className="text-ink-900 font-medium" aria-current="page">{l.h1}</span>
              </>
            ) : (
              <>
                <Link href={localePath(locale, 'worksheets')} className="hover:text-ink-900">{ui.worksheets}</Link>
                <span aria-hidden="true" className="text-cream-300">›</span>
                <Link href={typeHub} className="hover:text-ink-900">{ui.typeCrumb(l.eyebrow)}</Link>
                {locale === 'en' && l.coordinate.theme && (
                  <>
                    <span aria-hidden="true" className="text-cream-300">›</span>
                    <Link href={intersection} className="hover:text-ink-900 hidden sm:inline">{cap(l.coordinate.theme)} · {l.eyebrow.replace(' Worksheet', '')}</Link>
                  </>
                )}
                <span aria-hidden="true" className="text-cream-300 hidden sm:inline">›</span>
                <span className="text-ink-900 font-medium" aria-current="page">{l.h1}</span>
              </>
            )}
          </nav>

          {/* hero */}
          <section className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-8 md:gap-10 items-start mb-12">
            <div className={`bg-white rounded-2xl overflow-hidden ${SHADOW} relative`}>
              <a href={a.deckDir} aria-label={ui.playAria(l.h1)} className="block relative aspect-[480/620]">
                <Image src={wwwImg(a.thumbnail)} alt={ui.previewAlt(l.h1)} fill sizes="(max-width:767px) 90vw, 340px" className="object-cover" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#146B5E] text-white grid place-items-center shadow-lg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D9633A] mb-3 flex items-center gap-2.5">
                <span className="inline-block w-9 h-[3px] rounded bg-[#F2784B]" />{l.eyebrow}
              </p>
              <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight text-ink-900 mb-4">{l.h1}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-[#E3EEEB] text-[#0E544A] font-semibold text-sm rounded-full px-3 py-1.5">{lvl.chip}</span>
                <span className="inline-flex items-center gap-1.5 bg-[#E3EEEB] text-[#0E544A] font-semibold text-sm rounded-full px-3 py-1.5">{l.strand}</span>
                {l.standard ? (
                  <span className="inline-flex items-center gap-1.5 bg-[#FBEDE6] text-[#9A4521] font-semibold text-sm rounded-full px-3 py-1.5">{fw.chip}</span>
                ) : (ui.comingSoon && !xlang) ? (
                  <span className="inline-flex items-center gap-1.5 border border-dashed border-cream-300 text-ink-500 italic text-sm rounded-full px-3 py-1.5">{ui.comingSoon}</span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={a.deckDir} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-[#146B5E] text-white hover:bg-[#0E544A] transition-colors shadow-[0_4px_0_rgba(15,60,53,0.38),_0_10px_20px_-6px_rgba(20,107,94,0.4)]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M8 5v14l11-7z" /></svg>{ui.playInteractive}
                </a>
                <a href={a.pdf} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors">
                  {ui.downloadPdf}
                </a>
                <a href={a.answerKey} className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors">
                  {ui.answerKey}
                </a>
              </div>
            </div>
          </section>

          {/* body */}
          <section className="max-w-3xl mb-12">
            <div className="prose-none text-ink-700 leading-relaxed text-base md:text-[17px] space-y-4">
              <p>{l.p1}</p>
              <p>{l.p2}</p>
              <p>{l.p3}</p>
            </div>
          </section>

          {/* embedded playable deck */}
          <section className="mb-12">
            <div className={`bg-white rounded-3xl p-4 md:p-5 ${SHADOW} max-w-3xl`}>
              <h2 className="font-display font-bold text-lg text-[#146B5E] flex items-center gap-2 mb-3 px-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2FA56A]" />{ui.tryInteractive}
              </h2>
              <iframe
                src={a.deckDir}
                title={ui.playAria(l.h1)}
                loading="lazy"
                className="w-full rounded-2xl border border-cream-300 bg-[#FBF6EE]"
                style={{ aspectRatio: '800 / 1000', minHeight: 480 }}
              />
            </div>
          </section>

          {/* embed-this-worksheet — W6 backlink flywheel (snippet carries 2 crawlable <a>) */}
          <section className="mb-12">
            <EmbedWorksheet
              snippet={embedSnippet}
              labels={{ button: ui.embedButton, copy: ui.embedCopy, copied: ui.embedCopied }}
            />
          </section>

          {/* related carousel — gated: omit the section entirely when there are no honest same-(type,mode) siblings (e.g. the first landing of a new mode), never render a bare heading over an empty grid */}
          {l.carousel.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">{ui.moreToTry}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {l.carousel.map((c) => {
                const cl = getLandingBySlug(locale, c.href);
                const cthumb = cl ? deckAssets(locale, cl.canonicalDeckSlug).thumbnail : null;
                return (
                <Link key={c.href} href={localePath(locale, 'worksheets', c.href)}
                  className={`block bg-white rounded-2xl overflow-hidden border border-cream-300 hover:-translate-y-0.5 transition-transform ${SHADOW}`}>
                  <div className="relative aspect-[4/3] bg-[#FBF6EE] border-b border-cream-300">
                    {cthumb && <Image src={wwwImg(cthumb)} alt={c.label} fill sizes="(max-width:1023px) 45vw, 240px" className="object-cover" />}
                  </div>
                  <div className="p-3.5">
                    <p className="font-display font-semibold text-[15px] text-ink-900 leading-snug">{c.label}</p>
                  </div>
                </Link>
                );
              })}
            </div>
          </section>
          )}

          {/* landing↔landing link mesh (Gate-1 browse-layer ruling 2026-06-12) — the carousel above
              carries same-(type,mode) edges; this module adds the CROSS edges (same-theme other-type +
              same-level) so every landing receives ~8-10 sibling inlinks and the landing tier is
              de-orphaned independently of the topic hubs. Selection is deterministic (slug-sorted
              neighbor-window in landing-content.ts) so links never churn across ISR revalidations.
              Each group self-skips when empty — never a bare heading. */}
          {(() => {
            const mesh = getRelatedLandings(locale, l);
            if (mesh.sameTheme.length === 0 && mesh.sameLevel.length === 0) return null;
            const linkCls = 'block text-[15px] text-teal-800 hover:text-ink-900 hover:underline leading-snug py-1';
            return (
              <section className="mb-12">
                <div className="grid md:grid-cols-2 gap-8">
                  {mesh.sameTheme.length > 0 && (
                    <div>
                      <h2 className="font-display font-bold text-lg text-ink-900 mb-3">{ui.sameThemeHeading}</h2>
                      <ul>
                        {mesh.sameTheme.map((m) => (
                          <li key={m.slug}>
                            <Link href={localePath(locale, 'worksheets', m.slug)} className={linkCls}>{m.h1}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {mesh.sameLevel.length > 0 && (
                    <div>
                      <h2 className="font-display font-bold text-lg text-ink-900 mb-3">{ui.sameLevelHeading}</h2>
                      <ul>
                        {mesh.sameLevel.map((m) => (
                          <li key={m.slug}>
                            <Link href={localePath(locale, 'worksheets', m.slug)} className={linkCls}>{m.h1}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            );
          })()}

          {/* "Made with the … maker" — links to the worksheet-generator (maker)
              landing for this deck's type, in the page's language. Suppressed for
              cross-language landings (the maker tools are a monolingual-catalog
              concept; "make your own English wordsearch" isn't the Learn-<X> value). */}
          {xlang ? null : maker ? (
            <section className="mb-4">
              <Link
                href={localePath(locale, 'tools', maker.slug)}
                className="group block rounded-2xl border-2 border-cream-300 bg-white p-7 text-center transition hover:border-teal-400 hover:shadow-md"
              >
                <p className="font-display font-semibold text-ink-700 text-[17px]">{ui.madeWith(ui.typeCrumb(l.eyebrow))}</p>
                <p className="text-teal-700 text-sm mt-1 font-medium group-hover:underline">
                  {maker.labels.launchCta.replace('{name}', maker.name)} &rarr;
                </p>
              </Link>
            </section>
          ) : (
            <section className="mb-4">
              <div className="rounded-2xl border-2 border-dashed border-cream-300 bg-[repeating-linear-gradient(45deg,rgba(20,107,94,0.02),rgba(20,107,94,0.02)_10px,transparent_10px,transparent_20px)] p-7 text-center">
                <p className="font-display font-semibold text-ink-700 text-[17px]">{ui.madeWith(ui.typeCrumb(l.eyebrow))}</p>
                <p className="text-ink-500 text-sm mt-1">{ui.makerSoon}</p>
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}

function cap(s: string): string {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}
