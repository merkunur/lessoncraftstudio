// Subject×grade hub pages — content + resolution helpers.
//
// These hubs (e.g. /de/topic/mathe/1-klasse) aggregate every deck in a subject
// bucket (math/letters/science/logic/spatial-reasoning) at a grade level, to
// match how teachers actually search — "Mathe Klasse 1", "Deutsch Vorschule"
// (Fach×Klasse). They live INSIDE the /topic/[slug]/[secondary] route via an
// early-return branch (subject slugs are disjoint from all axis slugs, so a real
// intersection URL never triggers this). Content is native-authored per locale
// (§A.13.48); de+en shipped at MVP, other locales added with the per-locale roll.

import { getAxisName, getSubjectName, getSubjectSlug, getSubjectSlugStrict, resolveSubjectSlug, resolveTopicSlug } from './taxonomy';

// A hub needs at least this many decks to be worth indexing (thinner hubs still
// render for graceful UX but are noindex,follow and excluded from sitemap/links).
export const MIN_INDEXABLE_SUBJECT_HUB_DECKS = 12;

// Per-(locale, subject) copy. `worksheets` = the natural "<subject> worksheets"
// noun phrase (native compounding baked in); `angle` = the skills this subject
// builds (for a non-duplicate intro that varies meaningfully by subject).
// `worksheets`/`angle` are the default (formal-grade) forms; the optional
// *Kleuter variants override at the kindergarten level, where a formal vak name
// reads wrong (nl: "lezen" isn't taught yet → "Letters"; "voorbereidend" framing).
interface SubjectCopy {
  worksheets: string; // e.g. de "Mathe-Arbeitsblätter", en "Math worksheets"
  angle: string;
  worksheetsKleuter?: string;
  angleKleuter?: string;
}
const SUBJECT_COPY: Record<string, Record<string, SubjectCopy>> = {
  de: {
    math: { worksheets: 'Mathe-Arbeitsblätter', angle: 'Zählen, Rechnen und ein erstes Zahlenverständnis' },
    letters: { worksheets: 'Deutsch-Arbeitsblätter', angle: 'Buchstaben, Silben, erstes Lesen und Schreiben' },
    science: { worksheets: 'Sachunterricht-Arbeitsblätter', angle: 'das Entdecken von Tieren, Natur und Alltag' },
    logic: { worksheets: 'Logik-Arbeitsblätter', angle: 'logisches Denken, Zuordnen und das Erkennen von Mustern' },
    'spatial-reasoning': { worksheets: 'Wahrnehmungsübungen', angle: 'genaues Hinsehen, Konzentration und die visuelle Wahrnehmung' },
  },
  en: {
    math: { worksheets: 'Math worksheets', angle: 'counting, arithmetic, and early number sense' },
    letters: { worksheets: 'Reading & Writing worksheets', angle: 'letters, sounds, reading, and writing' },
    science: { worksheets: 'Science worksheets', angle: 'exploring animals, nature, and everyday life' },
    logic: { worksheets: 'Logic worksheets', angle: 'logical thinking, sorting, and spotting patterns' },
    'spatial-reasoning': { worksheets: 'Visual & Spatial worksheets', angle: 'close looking, focus, and visual perception' },
  },
  // Native Dutch (§A.13.48 ensemble + operator sign-off). Formal-grade titles use
  // the searched form ("{Vak} werkbladen"); the kleuter overrides give "Letters"
  // (formal reading starts groep 3) + voorbereidend framing.
  nl: {
    math: { worksheets: 'Rekenen werkbladen', angle: 'tellen, rekenen en getalbegrip', angleKleuter: 'tellen, getalbegrip en voorbereidend rekenen' },
    letters: { worksheets: 'Taal werkbladen', worksheetsKleuter: 'Letters werkbladen', angle: 'lezen, spelling en woordenschat', angleKleuter: 'letters, klanken en voorbereidend lezen' },
    science: { worksheets: 'Natuur werkbladen', angle: 'dieren, natuur en de wereld om je heen ontdekken' },
    logic: { worksheets: 'Puzzelwerkbladen', angle: 'redeneren, patronen herkennen en logisch nadenken' },
    'spatial-reasoning': { worksheets: 'Werkbladen waarnemen', angle: 'goed kijken, verschillen zien en ruimtelijk inzicht' },
  },
};

// Per-(locale, level): a clean label (for titles/H1) + a phrase with the correct
// article/preposition form (for prose) — German article agreement is a trap
// (§A.13.56), so the grammatical form is authored, not templated.
interface GradeCopy { label: string; phrase: string }
const GRADE_COPY: Record<string, Record<string, GradeCopy>> = {
  de: {
    preschool: { label: 'Vorschule', phrase: 'die Vorschule' },
    kindergarten: { label: 'Kindergarten', phrase: 'den Kindergarten' },
    'grade-1': { label: '1. Klasse', phrase: 'die 1. Klasse' },
    'grade-2': { label: '2. Klasse', phrase: 'die 2. Klasse' },
    'grade-3': { label: '3. Klasse', phrase: 'die 3. Klasse' },
  },
  en: {
    preschool: { label: 'Preschool', phrase: 'preschool' },
    kindergarten: { label: 'Kindergarten', phrase: 'kindergarten' },
    'grade-1': { label: 'Grade 1', phrase: 'Grade 1' },
    'grade-2': { label: 'Grade 2', phrase: 'Grade 2' },
    'grade-3': { label: 'Grade 3', phrase: 'Grade 3' },
  },
  // nl: the kindergarten level is titled "kleuters" (higher search demand than
  // "groep 1/2"). "groep N" never takes an article ("voor groep 3"); peuters/
  // kleuters are de-words ("voor de …") but the warmer child-noun "voor kleuters"
  // is the searched form. peuters tier is dropped (isSubjectHubAllowed) but kept
  // here for completeness.
  nl: {
    preschool: { label: 'peuters', phrase: 'voor peuters' },
    kindergarten: { label: 'kleuters', phrase: 'voor kleuters' },
    'grade-1': { label: 'groep 3', phrase: 'voor groep 3' },
    'grade-2': { label: 'groep 4', phrase: 'voor groep 4' },
    'grade-3': { label: 'groep 5', phrase: 'voor groep 5' },
  },
};

// Per-locale authenticity rules beyond the deck-count gate. Default (de/en) =
// allow all. nl (§A.13.48 Dutch educator + operator sign-off): peuters aren't
// basisschool → drop the preschool tier; logic+spatial aren't standalone Dutch
// vakken above the kleuter level → restrict them to kindergarten.
const HUB_RULES: Record<string, { dropLevels?: string[]; kleuterOnlySubjects?: string[] }> = {
  nl: { dropLevels: ['preschool'], kleuterOnlySubjects: ['logic', 'spatial-reasoning'] },
};

/** Whether a subject×grade hub should exist at all for this locale (authenticity gate). */
export function isSubjectHubAllowed(locale: string, subjectKey: string, levelKey: string): boolean {
  const r = HUB_RULES[locale];
  if (!r) return true;
  if (r.dropLevels?.includes(levelKey)) return false;
  if (r.kleuterOnlySubjects?.includes(subjectKey) && levelKey !== 'kindergarten') return false;
  return true;
}

/** The set of level (grade) axis-keys a subject hub can pair with, in display order. */
export const HUB_GRADE_KEYS = ['preschool', 'kindergarten', 'grade-1', 'grade-2', 'grade-3'] as const;

export type SubjectGradeResolution =
  | { kind: 'ok'; subjectKey: string; levelKey: string }
  | { kind: 'redirect'; subjectSlug: string; gradeSlug: string }
  | null;

/**
 * Decide whether (slug, secondary) name a subject×grade hub in this locale.
 * - subject-first + grade-second → the hub.
 * - grade-first + subject-second → a 308 redirect to the canonical subject-first URL.
 * - anything else → null (fall through to the normal intersection route).
 * Strict subject resolution (no en fallback) so only locales that actually
 * define the subject produce hubs.
 */
export function resolveSubjectGrade(slug: string, secondary: string, locale: string): SubjectGradeResolution {
  const s1 = resolveSubjectSlug(slug, locale);
  const g2 = resolveTopicSlug(secondary, locale);
  if (s1 && g2?.axis === 'educational-level') {
    if (!isSubjectHubAllowed(locale, s1.subjectKey, g2.axisKey)) return null;
    return { kind: 'ok', subjectKey: s1.subjectKey, levelKey: g2.axisKey };
  }
  const g1 = resolveTopicSlug(slug, locale);
  const s2 = resolveSubjectSlug(secondary, locale);
  if (g1?.axis === 'educational-level' && s2) {
    if (!isSubjectHubAllowed(locale, s2.subjectKey, g1.axisKey)) return null;
    const subjectSlug = getSubjectSlugStrict(s2.subjectKey, locale);
    if (subjectSlug) return { kind: 'redirect', subjectSlug, gradeSlug: slug };
  }
  return null;
}

function gradeLabel(locale: string, levelKey: string): string {
  return GRADE_COPY[locale]?.[levelKey]?.label
    ?? (getAxisName('educational-level', levelKey, locale) ?? levelKey).replace(/\s*\([^)]*\)\s*$/, '');
}
function gradePhrase(locale: string, levelKey: string): string {
  return GRADE_COPY[locale]?.[levelKey]?.phrase ?? gradeLabel(locale, levelKey);
}
// Grade-aware: at the kindergarten (kleuter) level, use the *Kleuter overrides
// when present (nl "Letters" instead of "Taal"; voorbereidend angle).
function subjectCopy(locale: string, subjectKey: string, levelKey: string): { worksheets: string; angle: string } {
  const base: SubjectCopy =
    SUBJECT_COPY[locale]?.[subjectKey] ??
    SUBJECT_COPY.en[subjectKey] ?? {
      worksheets: `${getSubjectName(subjectKey, locale) ?? subjectKey} worksheets`,
      angle: 'core early-learning skills',
    };
  const isKleuter = levelKey === 'kindergarten';
  return {
    worksheets: isKleuter && base.worksheetsKleuter ? base.worksheetsKleuter : base.worksheets,
    angle: isKleuter && base.angleKleuter ? base.angleKleuter : base.angle,
  };
}

/** SEO <title> (brand suffix appended by the root layout template). */
export function subjectHubTitle(locale: string, subjectKey: string, levelKey: string): string {
  const { worksheets } = subjectCopy(locale, subjectKey, levelKey);
  const g = gradeLabel(locale, levelKey);
  if (locale === 'de') return `${worksheets} ${g} – kostenlos zum Ausdrucken`;
  if (locale === 'nl') return `${worksheets} ${g} – gratis om uit te printen (PDF)`;
  return `Free ${worksheets} for ${g} – Printable PDF`;
}

/** Visible H1. */
export function subjectHubH1(locale: string, subjectKey: string, levelKey: string): string {
  const { worksheets } = subjectCopy(locale, subjectKey, levelKey);
  const g = gradeLabel(locale, levelKey);
  if (locale === 'nl') return `${worksheets} ${g}`;
  return `${worksheets} – ${g}`;
}

/** Unique meta description (varies by subject angle + grade + count → non-duplicate). */
export function subjectHubDescription(locale: string, subjectKey: string, levelKey: string, count: number): string {
  const { worksheets, angle } = subjectCopy(locale, subjectKey, levelKey);
  const gp = gradePhrase(locale, levelKey);
  if (locale === 'de') {
    return `${count} kostenlose ${worksheets} für ${gp} zum Ausdrucken – jedes als PDF mit Lösungen und direkt online spielbar, ganz ohne Anmeldung. Übungen zu ${angle}.`;
  }
  if (locale === 'nl') {
    return `${count} gratis ${worksheets.toLowerCase()} ${gp}: printen als PDF met antwoorden of direct online oefenen, zonder account. Oefen ${angle}.`;
  }
  return `${count} free ${worksheets.toLowerCase()} for ${gp}, printable as PDF with answer keys and playable online — no sign-up. Practice ${angle}.`;
}

/** Longer intro prose for the page body (2 sentences; subject-specific → non-duplicate). */
export function subjectHubIntro(locale: string, subjectKey: string, levelKey: string, count: number): string {
  const { worksheets, angle } = subjectCopy(locale, subjectKey, levelKey);
  const gp = gradePhrase(locale, levelKey);
  if (locale === 'de') {
    return `Hier findest du ${count} kostenlose ${worksheets} für ${gp}, sorgfältig für diese Altersstufe zusammengestellt. Die Übungen fördern ${angle}; jedes Arbeitsblatt gibt es als PDF mit Lösungen zum Ausdrucken – oder direkt online zum Ausprobieren, ganz ohne Anmeldung.`;
  }
  if (locale === 'nl') {
    return `Hier vind je ${count} gratis ${worksheets.toLowerCase()} (oefenbladen) ${gp}, zorgvuldig samengesteld voor deze leeftijd. De oefeningen versterken ${angle}. Elk werkblad kun je gratis printen als PDF met antwoorden — of meteen online spelen, zonder account.`;
  }
  return `Here are ${count} free ${worksheets.toLowerCase()} for ${gp}, curated for this age group. The exercises build ${angle}; every worksheet is available as a printable PDF with an answer key — or playable online right away, no sign-up required.`;
}
