import fs from 'fs';
import path from 'path';
import { subjectHubGradeLabel } from '@/lib/subject-hub';

/**
 * Seasonal SEO hubs (2026-07-06, seasonal-hubs commission) — demand-keyed
 * upgrades of the EXISTING seasonal theme topic pages (`/[locale]/topic/
 * <theme-slug>/`) plus their season×grade children (`/topic/<theme>/<grade>`).
 *
 * Mirrors the subject-hub.ts pattern (SEASON_COPY + LOCALE_TEMPLATES + fs
 * deep-copy loader), but rides EXISTING page types end-to-end:
 *  - head hubs = the single-axis theme pages (already indexed, already in
 *    sitemap shard 3, already hreflang-meshed) — this module only swaps in
 *    a demand-true <title>/H1 and adds body paragraphs + updated-date +
 *    grade-children links;
 *  - season×grade children = the 2-axis intersection pages, whose index/
 *    sitemap/hreflang state is flipped DATA-ONLY by authoring
 *    `topicProse.<sortedKeys>` message keys (intersection-authored.ts SoT);
 *    this module only supplies the demand-true <title> override.
 *
 * A locale/season upgrades ONLY when its copy exists here (fails closed —
 * un-authored locales keep today's generic rendering byte-for-byte).
 */

export const SEASONAL_KEYS = [
  'christmas',
  'easter',
  'winter',
  'spring',
  'summer',
  '4th_of_july',
  // NOTE: literal taxonomy key (historic triple-n typo). Slugs are correct
  // ("thanksgiving"). NEVER rename taxonomy keys.
  'thanksgivinng',
] as const;
export type SeasonalKey = (typeof SEASONAL_KEYS)[number];

/** Cultural-relevance gate: which locales a season may upgrade in at all.
 * The 5 universal seasons ship to all 11 locales; the US-specific holidays
 * ship en-only (decks exist in every locale, but there is no native search
 * demand for e.g. "4. Juli Arbeitsblätter" — an upgraded page would be
 * demand-false). Deck-count gating happens separately per §16.6 honesty
 * (the theme pages already require ≥1 deck; grade children require the
 * authored prose which is only written for count-≥12 cells). */
const UNIVERSAL_SEASON_LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'sv', 'da', 'no', 'fi'];
const SEASON_LOCALES: Record<SeasonalKey, string[]> = {
  christmas: UNIVERSAL_SEASON_LOCALES,
  easter: UNIVERSAL_SEASON_LOCALES,
  winter: UNIVERSAL_SEASON_LOCALES,
  spring: UNIVERSAL_SEASON_LOCALES,
  summer: UNIVERSAL_SEASON_LOCALES,
  '4th_of_july': ['en'],
  thanksgivinng: ['en'],
};

export function isSeasonalKey(axisKey: string): axisKey is SeasonalKey {
  return (SEASONAL_KEYS as readonly string[]).includes(axisKey);
}

/** Per-(locale, season) demand noun. `noun` feeds the title/H1 templates in
 * the locale's natural seasonal-query form (de "Weihnachten", sv "jul(en)" —
 * whatever the native ensemble ruled matches real queries). The optional
 * full-form overrides win over the locale template wherever per-season
 * grammar (gender/definiteness/preposition) breaks the shared template:
 * `title`/`h1` are final-form strings; `gradeTitle` is a template with a
 * literal `{g}` placeholder for the grade label. */
interface SeasonCopy {
  noun: string;
  title?: string;
  h1?: string;
  gradeTitle?: string;
}

const SEASON_COPY: Record<string, Partial<Record<SeasonalKey, SeasonCopy>>> = {
  en: {
    christmas: { noun: 'Christmas' },
    easter: { noun: 'Easter' },
    winter: { noun: 'Winter' },
    spring: { noun: 'Spring' },
    summer: { noun: 'Summer' },
    '4th_of_july': { noun: '4th of July' },
    thanksgivinng: { noun: 'Thanksgiving' },
  },
  // Non-en locales below are authored by the per-locale native ensembles
  // (§A.13.48, 2026-07-06; [NSR-FLAG] sv/da/no/fi). Absent (locale, season)
  // entry = the page does not upgrade (fails closed).
  de: {
    christmas: { noun: 'Weihnachten', h1: 'Arbeitsblätter zu Weihnachten' },
    easter: { noun: 'Ostern', h1: 'Arbeitsblätter zu Ostern' },
    winter: { noun: 'Winter', h1: 'Arbeitsblätter für den Winter' },
    spring: { noun: 'Frühling', h1: 'Arbeitsblätter für den Frühling' },
    summer: { noun: 'Sommer', h1: 'Arbeitsblätter für den Sommer' },
  },
  es: {
    christmas: { noun: 'Navidad' },
    easter: { noun: 'Pascua' },
    winter: { noun: 'invierno' },
    spring: { noun: 'primavera' },
    summer: { noun: 'verano' },
  },
  fr: {
    christmas: { noun: 'Noël', title: 'Fiches de Noël à imprimer – gratuit (PDF)', h1: 'Fiches et activités de Noël', gradeTitle: 'Fiches de Noël {g} – à imprimer, gratuit (PDF)' },
    easter: { noun: 'Pâques', title: 'Fiches de Pâques à imprimer – gratuit (PDF)', h1: 'Fiches et activités de Pâques', gradeTitle: 'Fiches de Pâques {g} – à imprimer, gratuit (PDF)' },
    winter: { noun: 'hiver', title: "Fiches d'hiver à imprimer – gratuit (PDF)", h1: "Fiches et activités d'hiver", gradeTitle: "Fiches d'hiver {g} – à imprimer, gratuit (PDF)" },
    spring: { noun: 'printemps', title: 'Fiches de printemps à imprimer – gratuit (PDF)', h1: 'Fiches et activités de printemps', gradeTitle: 'Fiches de printemps {g} – à imprimer, gratuit (PDF)' },
    summer: { noun: 'été', title: "Fiches d'été à imprimer – gratuit (PDF)", h1: "Fiches et activités d'été", gradeTitle: "Fiches d'été {g} – à imprimer, gratuit (PDF)" },
  },
  it: {
    christmas: { noun: 'Natale' },
    easter: { noun: 'Pasqua' },
    winter: { noun: 'inverno', title: "Schede didattiche d'inverno – da stampare gratis (PDF)", h1: "Schede didattiche d'inverno", gradeTitle: "Schede d'inverno – {g} – da stampare gratis (PDF)" },
    spring: { noun: 'primavera' },
    summer: { noun: 'estate', title: "Schede didattiche d'estate – da stampare gratis (PDF)", h1: "Schede didattiche d'estate", gradeTitle: "Schede d'estate – {g} – da stampare gratis (PDF)" },
  },
  nl: {
    christmas: { noun: 'kerst' },
    easter: { noun: 'Pasen' },
    winter: { noun: 'winter' },
    spring: { noun: 'lente' },
    summer: { noun: 'zomer' },
  },
  pt: {
    christmas: { noun: 'Natal' },
    easter: { noun: 'Páscoa' },
    winter: { noun: 'inverno' },
    spring: { noun: 'primavera' },
    summer: { noun: 'verão' },
  },
  sv: {
    christmas: { noun: 'jul', h1: 'Arbetsblad för julen' },
    easter: { noun: 'påsk', h1: 'Arbetsblad för påsken' },
    winter: { noun: 'vinter', h1: 'Arbetsblad för vintern' },
    spring: { noun: 'vår', title: 'Arbetsblad våren – gratis att skriva ut (PDF)', h1: 'Arbetsblad för våren', gradeTitle: 'Arbetsblad våren för {g} – gratis att skriva ut (PDF)' },
    summer: { noun: 'sommar', h1: 'Arbetsblad för sommaren' },
  },
  da: {
    christmas: { noun: 'jul', title: 'Juleopgaver til print – gratis opgaveark til julen (PDF)', h1: 'Opgaveark til julen', gradeTitle: 'Juleopgaver til {g} – gratis til print (PDF)' },
    easter: { noun: 'påske', title: 'Påskeopgaver til print – gratis opgaveark til påsken (PDF)', h1: 'Opgaveark til påsken', gradeTitle: 'Påskeopgaver til {g} – gratis til print (PDF)' },
    winter: { noun: 'vinter', title: 'Vinteropgaver til print – gratis opgaveark til vinteren (PDF)', h1: 'Opgaveark til vinteren', gradeTitle: 'Vinteropgaver til {g} – gratis til print (PDF)' },
    spring: { noun: 'forår', title: 'Forårsopgaver til print – gratis opgaveark til foråret (PDF)', h1: 'Opgaveark til foråret', gradeTitle: 'Forårsopgaver til {g} – gratis til print (PDF)' },
    summer: { noun: 'sommer', title: 'Sommeropgaver til print – gratis opgaveark til sommeren (PDF)', h1: 'Opgaveark til sommeren', gradeTitle: 'Sommeropgaver til {g} – gratis til print (PDF)' },
  },
  no: {
    christmas: { noun: 'jul', title: 'Juleoppgaver for barn – gratis arbeidsark å skrive ut (PDF)', h1: 'Arbeidsark til jul', gradeTitle: 'Juleoppgaver for {g} – gratis å skrive ut (PDF)' },
    easter: { noun: 'påske', title: 'Påskeoppgaver for barn – gratis arbeidsark å skrive ut (PDF)', h1: 'Arbeidsark til påske', gradeTitle: 'Påskeoppgaver for {g} – gratis å skrive ut (PDF)' },
    winter: { noun: 'vinter', title: 'Vinteroppgaver for barn – gratis arbeidsark å skrive ut (PDF)', h1: 'Arbeidsark til vinteren', gradeTitle: 'Vinteroppgaver for {g} – gratis å skrive ut (PDF)' },
    spring: { noun: 'vår', title: 'Våroppgaver for barn – gratis arbeidsark å skrive ut (PDF)', h1: 'Arbeidsark til våren', gradeTitle: 'Våroppgaver for {g} – gratis å skrive ut (PDF)' },
    summer: { noun: 'sommer', title: 'Sommeroppgaver for barn – gratis arbeidsark å skrive ut (PDF)', h1: 'Arbeidsark til sommeren', gradeTitle: 'Sommeroppgaver for {g} – gratis å skrive ut (PDF)' },
  },
  fi: {
    // fi grade label already carries "(eskari)" via GRADE_COPY display —
    // gradeTitle uses dash apposition (§A.13.56 case-language rule).
    christmas: { noun: 'joulu', title: 'Joulutehtävät lapsille – tulosta ilmaiseksi (PDF)', h1: 'Joulutehtävät lapsille', gradeTitle: 'Joulutehtävät – {g} – tulosta ilmaiseksi (PDF)' },
    easter: { noun: 'pääsiäinen', title: 'Pääsiäistehtävät lapsille – tulosta ilmaiseksi (PDF)', h1: 'Pääsiäistehtävät lapsille', gradeTitle: 'Pääsiäistehtävät – {g} – tulosta ilmaiseksi (PDF)' },
    winter: { noun: 'talvi', title: 'Talvitehtävät lapsille – tulosta ilmaiseksi (PDF)', h1: 'Talvitehtävät lapsille', gradeTitle: 'Talvitehtävät – {g} – tulosta ilmaiseksi (PDF)' },
    spring: { noun: 'kevät', title: 'Kevättehtävät lapsille – tulosta ilmaiseksi (PDF)', h1: 'Kevättehtävät lapsille', gradeTitle: 'Kevättehtävät – {g} – tulosta ilmaiseksi (PDF)' },
    summer: { noun: 'kesä', title: 'Kesätehtävät lapsille – tulosta ilmaiseksi (PDF)', h1: 'Kesätehtävät lapsille', gradeTitle: 'Kesätehtävät – {g} – tulosta ilmaiseksi (PDF)' },
  },
};

/** Per-locale title/H1 templates. `n` = the season noun. Grade titles reuse
 * the subject-hub grade labels (subjectHubGradeLabel) so "Kindergarten" /
 * "1. Klasse" / "kínder" render identically across hub families. */
interface SeasonalTemplate {
  /** SEO <title> for the head hub (brand suffix appended by root layout). */
  title: (n: string) => string;
  /** Visible H1 for the head hub. */
  h1: (n: string) => string;
  /** SEO <title> for the season×grade child. `g` = grade label. */
  gradeTitle: (n: string, g: string) => string;
  /** Homepage seasonal group heading. */
  heading: string;
}

const capFirst = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const LOCALE_TEMPLATES: Record<string, SeasonalTemplate> = {
  en: {
    title: (n) => `Free ${n} Worksheets – Printable PDF`,
    h1: (n) => `${n} Worksheets`,
    // en grade labels come from the axis name in lowercase ("kindergarten",
    // "grade 1") — title-case them for the <title>.
    gradeTitle: (n, g) => `Free ${n} Worksheets for ${capFirst(g)} – Printable PDF`,
    heading: 'Seasonal & holidays',
  },
  de: {
    title: (n) => `Arbeitsblätter ${n} – kostenlos zum Ausdrucken`,
    h1: (n) => `Arbeitsblätter ${n}`,
    gradeTitle: (n, g) => `Arbeitsblätter ${n} ${g} – kostenlos zum Ausdrucken`,
    heading: 'Jahreszeiten & Feste',
  },
  es: {
    title: (n) => `Fichas de ${n} – para imprimir gratis (PDF)`,
    h1: (n) => `Fichas de ${n} para imprimir`,
    gradeTitle: (n, g) => `Fichas de ${n} para ${g} – para imprimir gratis (PDF)`,
    heading: 'Temporadas y fiestas',
  },
  fr: {
    title: (n) => `Fiches ${n} à imprimer – gratuit (PDF)`,
    h1: (n) => `Fiches et activités ${n}`,
    gradeTitle: (n, g) => `Fiches ${n} ${g} à imprimer – gratuit (PDF)`,
    heading: 'Saisons et fêtes',
  },
  it: {
    title: (n) => `Schede didattiche di ${n} – da stampare gratis (PDF)`,
    h1: (n) => `Schede didattiche di ${n}`,
    // Dash apposition — the it grade display carries no article ("Ultimo anno
    // dell'infanzia"), so "per {g}" would be ungrammatical.
    gradeTitle: (n, g) => `Schede di ${n} – ${g} – da stampare gratis (PDF)`,
    heading: 'Stagioni e feste',
  },
  nl: {
    title: (n) => `Werkbladen ${n} – gratis om uit te printen (PDF)`,
    h1: (n) => `Werkbladen ${n}`,
    // Dash apposition — the nl axis label ("kleuterklas", "groep 3") needs a
    // level-dependent article after "voor"; the dash form is safe for all.
    gradeTitle: (n, g) => `Werkbladen ${n} – ${g} – gratis printen (PDF)`,
    heading: 'Seizoenen & feestdagen',
  },
  pt: {
    title: (n) => `Atividades de ${n} – para imprimir grátis (PDF)`,
    h1: (n) => `Atividades de ${n}`,
    gradeTitle: (n, g) => `Atividades de ${n} para educação infantil (${g}) – para imprimir grátis (PDF)`,
    heading: 'Estações e datas comemorativas',
  },
  sv: {
    title: (n) => `Arbetsblad ${n} – gratis att skriva ut (PDF)`,
    h1: (n) => `Arbetsblad ${n}`,
    gradeTitle: (n, g) => `Arbetsblad ${n} för ${g} – gratis att skriva ut (PDF)`,
    heading: 'Årstider och högtider',
  },
  da: {
    title: (n) => `Opgaveark til ${n} – gratis til print (PDF)`,
    h1: (n) => `Opgaveark til ${n}`,
    gradeTitle: (n, g) => `Opgaveark til ${n} i ${g} – gratis til print (PDF)`,
    heading: 'Årstider og højtider',
  },
  no: {
    title: (n) => `Arbeidsark til ${n} – gratis å skrive ut (PDF)`,
    h1: (n) => `Arbeidsark til ${n}`,
    gradeTitle: (n, g) => `Arbeidsark til ${n} for ${g} – gratis å skrive ut (PDF)`,
    heading: 'Årstider og høytider',
  },
  fi: {
    title: (n) => `${n} – tehtäviä lapsille, tulosta ilmaiseksi (PDF)`,
    h1: (n) => `${n} – tehtäviä lapsille`,
    // Dash apposition (§A.13.56) — every case form stays a literal.
    gradeTitle: (n, g) => `${n} – tehtävät – ${g}, tulosta ilmaiseksi (PDF)`,
    heading: 'Vuodenajat ja juhlat',
  },
};

function tpl(locale: string): SeasonalTemplate {
  return LOCALE_TEMPLATES[locale] ?? LOCALE_TEMPLATES.en;
}

/** Whether this (locale, seasonal theme) renders the upgraded demand surface.
 * Requires the cultural gate AND authored copy — fails closed both ways. */
export function isSeasonalHubUpgraded(locale: string, axisKey: string): boolean {
  if (!isSeasonalKey(axisKey)) return false;
  if (!SEASON_LOCALES[axisKey].includes(locale)) return false;
  return Boolean(SEASON_COPY[locale]?.[axisKey] && LOCALE_TEMPLATES[locale]);
}

/** Demand-keyed <title> for the head hub (full-string; bypasses renderTopicTitle
 * so per-locale casing/elision machinery never rewrites it — authored titles
 * are final-form). Call only when isSeasonalHubUpgraded() is true. */
export function seasonalHubTitle(locale: string, axisKey: SeasonalKey): string {
  const copy = SEASON_COPY[locale]![axisKey]!;
  return copy.title ?? tpl(locale).title(copy.noun);
}

/** Visible H1 for the head hub. */
export function seasonalHubH1(locale: string, axisKey: SeasonalKey): string {
  const copy = SEASON_COPY[locale]![axisKey]!;
  return copy.h1 ?? tpl(locale).h1(copy.noun);
}

/** Demand-keyed <title> for a season×grade intersection child. */
export function seasonalGradeTitle(locale: string, axisKey: SeasonalKey, levelKey: string): string {
  const copy = SEASON_COPY[locale]![axisKey]!;
  const g = subjectHubGradeLabel(locale, levelKey);
  return copy.gradeTitle ? copy.gradeTitle.replace('{g}', g) : tpl(locale).gradeTitle(copy.noun, g);
}

/** Homepage seasonal group heading. */
export function seasonalHeading(locale: string): string {
  return tpl(locale).heading;
}

/* ---------------- seasonal deep copy ----------------
 * Hand-authored per-season body paragraphs, native per locale (§A.13.48
 * ensembles). Data file: frontend/content/seasonal-hub-copy/<locale>.json
 * keyed by seasonal axis-key, `{ "<key>": { paragraphs: [...] } }`.
 * PARAGRAPHS ONLY — seasonal FAQ lives in the existing `topicFaq.overrides.
 * <key>` message namespace (TopicFaq already emits FAQPage JSON-LD; a second
 * FAQ source here would double the schema). fs-loaded, kept out of the
 * webpack graph per the landing-content precedent; absent file → the page
 * renders exactly as before. */

export interface SeasonalDeepCopy {
  paragraphs: string[];
}
const _deepCopyCache: Record<string, Record<string, SeasonalDeepCopy> | null> = {};
export function getSeasonalDeepCopy(locale: string, axisKey: string): SeasonalDeepCopy | null {
  if (!(locale in _deepCopyCache)) {
    let data: Record<string, SeasonalDeepCopy> | null = null;
    // NOTE: cwd is NOT the checkout under the next-start release model (pm2 runs
    // from frontend/releases/current, which has no content/); the absolute checkout
    // path is the guaranteed fallback — same convention as subject-hub.ts.
    for (const dir of [
      path.join(process.cwd(), 'content', 'seasonal-hub-copy'),
      path.join(process.cwd(), 'frontend', 'content', 'seasonal-hub-copy'),
      '/opt/lessoncraftstudio/frontend/content/seasonal-hub-copy',
    ]) {
      try {
        const p = path.join(dir, `${locale}.json`);
        if (fs.existsSync(p)) { data = JSON.parse(fs.readFileSync(p, 'utf8')); break; }
      } catch { /* tolerate malformed file — page renders without deep copy */ }
    }
    _deepCopyCache[locale] = data;
  }
  return _deepCopyCache[locale]?.[axisKey] ?? null;
}

/* ---------------- proximity ordering ----------------
 * Deterministic month-based ordering for the homepage seasonal group: the
 * season currently in (or next entering) its demand window sorts first.
 * Month-granular + UTC → within-day/month stable, ISR-cache-safe (no
 * Math.random / per-request divergence). */

/** [startMonth, endMonth] (0-indexed, inclusive, may wrap the year end) of
 * each season's SEARCH-demand window (queries ramp ahead of the date itself —
 * christmas demand is Nov-Dec, not just Dec 25). */
const SEASON_WINDOW: Record<SeasonalKey, [number, number]> = {
  christmas: [10, 11],   // Nov-Dec
  easter: [1, 3],        // Feb-Apr
  winter: [10, 1],       // Nov-Feb (wraps)
  spring: [1, 4],        // Feb-May
  summer: [4, 7],        // May-Aug
  '4th_of_july': [4, 6], // May-Jul
  thanksgivinng: [8, 10],// Sep-Nov
};

function inWindow(month: number, [start, end]: [number, number]): boolean {
  return start <= end ? month >= start && month <= end : month >= start || month <= end;
}

/** Seasonal keys ordered by demand proximity: in-window first (distance 0),
 * then by months until the window opens; ties break on SEASONAL_KEYS order. */
export function seasonsByProximity(monthUTC: number): SeasonalKey[] {
  const m = ((monthUTC % 12) + 12) % 12;
  return [...SEASONAL_KEYS].sort((a, b) => {
    const dist = (k: SeasonalKey) =>
      inWindow(m, SEASON_WINDOW[k]) ? 0 : (SEASON_WINDOW[k][0] - m + 12) % 12;
    const d = dist(a) - dist(b);
    return d !== 0 ? d : SEASONAL_KEYS.indexOf(a) - SEASONAL_KEYS.indexOf(b);
  });
}
