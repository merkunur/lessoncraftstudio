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
// `worksheets`/`angle` are the default forms; `worksheetsByLevel`/`angleByLevel`
// override for specific grade levels where a formal subject label reads wrong
// (nl: "Taal"→"Letters" at kindergarten; es: "Español"→"lectoescritura" at
// preescolar/kínder, "Ciencias"→"Exploración del Mundo"/"Conocimiento del Medio").
interface SubjectCopy {
  worksheets: string; // e.g. de "Mathe-Arbeitsblätter", en "Math worksheets"
  angle: string;
  worksheetsByLevel?: Record<string, string>;
  angleByLevel?: Record<string, string>;
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
  // the searched form ("{Vak} werkbladen"); the kindergarten override gives
  // "Letters" (formal reading starts groep 3) + voorbereidend framing.
  nl: {
    math: { worksheets: 'Rekenen werkbladen', angle: 'tellen, rekenen en getalbegrip', angleByLevel: { kindergarten: 'tellen, getalbegrip en voorbereidend rekenen' } },
    letters: { worksheets: 'Taal werkbladen', worksheetsByLevel: { kindergarten: 'Letters werkbladen' }, angle: 'lezen, spelling en woordenschat', angleByLevel: { kindergarten: 'letters, klanken en voorbereidend lezen' } },
    science: { worksheets: 'Natuur werkbladen', angle: 'dieren, natuur en de wereld om je heen ontdekken' },
    logic: { worksheets: 'Puzzelwerkbladen', angle: 'redeneren, patronen herkennen en logisch nadenken' },
    'spatial-reasoning': { worksheets: 'Werkbladen waarnemen', angle: 'goed kijken, verschillen zien en ruimtelijk inzicht' },
  },
  // Native Mexican Spanish (§A.13.48 ensemble + operator sign-off). Head noun by
  // intent (Ejercicios/Fichas); labels vary by grade-band: literacy Español→
  // lectoescritura at preescolar/kínder; science Exploración del Mundo (kínder)→
  // Conocimiento del Medio (1°). NEM/campos-formativos cited in body, not as hub names.
  es: {
    math: {
      worksheets: 'Ejercicios de matemáticas',
      angle: 'el conteo, la suma y la resta y el reconocimiento de números y figuras',
      angleByLevel: { preschool: 'el conteo, la clasificación y el reconocimiento de números y formas', kindergarten: 'el conteo, la clasificación y el reconocimiento de números y formas' },
    },
    letters: {
      worksheets: 'Fichas de español',
      worksheetsByLevel: { preschool: 'Actividades de lectoescritura', kindergarten: 'Actividades de lectoescritura' },
      angle: 'la lectoescritura: las letras, las sílabas y la formación de palabras',
      angleByLevel: { preschool: 'la iniciación a la lectoescritura: los sonidos, los trazos y las primeras letras', kindergarten: 'la iniciación a la lectoescritura: los sonidos, los trazos y las primeras letras' },
    },
    science: {
      worksheets: 'Fichas de ciencias',
      worksheetsByLevel: { kindergarten: 'Fichas de exploración del mundo', 'grade-1': 'Fichas de conocimiento del medio' },
      angle: 'el conocimiento del medio natural y social',
      angleByLevel: { kindergarten: 'la exploración del mundo natural: los seres vivos y la naturaleza' },
    },
    logic: { worksheets: 'Ejercicios de razonamiento lógico', angle: 'el razonamiento lógico, la atención y la clasificación' },
    'spatial-reasoning': { worksheets: 'Fichas de percepción visual', angle: 'la percepción visual y la orientación espacial' },
  },
  // Native French / France (§A.13.48 ensemble + operator sign-off). Head noun by
  // band: "Fiches de …" at maternelle → "Exercices de …" at élémentaire (CP+); CP
  // boundary flips literacy (lecture→Français) + science (Explorer→Questionner le
  // monde). Search-register "maths"/"lecture". Adjective agreement dodged via the
  // adverb "gratuitement" in the templates.
  fr: {
    math: {
      worksheets: 'Exercices de maths',
      worksheetsByLevel: { preschool: 'Fiches de maths', kindergarten: 'Fiches de maths' },
      angle: 'développer le sens des nombres, le calcul et le raisonnement',
      angleByLevel: { preschool: 'découvrir les nombres, les formes et les quantités', kindergarten: 'construire le nombre et préparer l’entrée au CP' },
    },
    letters: {
      worksheets: 'Exercices de français',
      worksheetsByLevel: { preschool: 'Fiches de lecture', kindergarten: 'Fiches de lecture', 'grade-1': 'Fiches de lecture' },
      angle: 'renforcer la lecture, l’écriture et la maîtrise du français',
      angleByLevel: { preschool: 'préparer la lecture et l’écriture : les sons, les lettres et les premiers mots', kindergarten: 'renforcer la phonologie et préparer la lecture', 'grade-1': 'accompagner l’apprentissage de la lecture, le grand objectif du CP' },
    },
    science: {
      worksheets: 'Fiches de sciences',
      worksheetsByLevel: { kindergarten: 'Fiches Explorer le monde', 'grade-1': 'Fiches Questionner le monde' },
      angle: 'observer et comprendre le monde qui nous entoure',
      angleByLevel: { kindergarten: 'explorer le monde : le vivant, les objets, le temps et l’espace', 'grade-1': 'questionner le monde : le vivant, la matière, le temps et l’espace' },
    },
    logic: { worksheets: 'Fiches de logique', angle: 'développer le raisonnement, l’observation et la logique' },
    'spatial-reasoning': { worksheets: 'Fiches de repérage dans l’espace', angle: 'travailler le repérage dans l’espace et l’attention visuelle' },
  },
};

// Per-(locale, level): a clean label (for titles/H1) + a phrase with the correct
// article/preposition form (for prose) — German article agreement is a trap
// (§A.13.56), so the grammatical form is authored, not templated.
// `label` = compact title form; `phrase` = prose form; `display` = clean breadcrumb/
// sibling label when it differs from capFirst(label) (fr: "GS"→"Grande section (GS)").
interface GradeCopy { label: string; phrase: string; display?: string }
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
  // es (Mexican). `label` = compact title form (used as "para {label}"); `phrase`
  // = fuller prose form. Kínder fixes the non-Mexican "jardín infantil" es axis
  // name (display only; the URL slug jardin-infantil is unchanged, shared es data).
  es: {
    preschool: { label: 'preescolar', phrase: 'preescolar' },
    kindergarten: { label: 'kínder', phrase: 'kínder' },
    'grade-1': { label: 'primer grado', phrase: 'primer grado de primaria' },
    'grade-2': { label: 'segundo grado', phrase: 'segundo grado de primaria' },
    'grade-3': { label: 'tercer grado', phrase: 'tercer grado de primaria' },
  },
  // fr (France). label = title grade code ("GS", "CP"); phrase = prose ("la grande
  // section (GS)", "le CP"); display = breadcrumb clean label. preschool→"maternelle"
  // (the huge umbrella term) vs kindergarten→"GS" resolves the two-maternelle collision.
  fr: {
    preschool: { label: 'maternelle', phrase: 'la maternelle', display: 'Maternelle' },
    kindergarten: { label: 'GS', phrase: 'la grande section (GS)', display: 'Grande section (GS)' },
    'grade-1': { label: 'CP', phrase: 'le CP', display: 'CP' },
    'grade-2': { label: 'CE1', phrase: 'le CE1', display: 'CE1' },
    'grade-3': { label: 'CE2', phrase: 'le CE2', display: 'CE2' },
  },
};

// Per-locale authenticity rules beyond the deck-count gate. Default (de/en) =
// allow all. `dropLevels` = levels removed for ALL subjects; `subjectAllowedLevels`
// = a subject may ONLY appear at the listed levels. nl: drop peuters + logic/spatial
// kleuter-only. es (Mexican educator): KEEP preescolar (fichas culture) but logic/
// spatial aren't standalone asignaturas above preescolar/kínder (folded into math).
const HUB_RULES: Record<string, { dropLevels?: string[]; subjectAllowedLevels?: Record<string, string[]> }> = {
  nl: { dropLevels: ['preschool'], subjectAllowedLevels: { logic: ['kindergarten'], 'spatial-reasoning': ['kindergarten'] } },
  es: { subjectAllowedLevels: { logic: ['preschool', 'kindergarten'], 'spatial-reasoning': ['preschool', 'kindergarten'] } },
  // fr (France educator): KEEP maternelle (fiches-maternelle flagship market); logic +
  // spatial are activity families, standalone only at maternelle, folded into maths at CP+.
  fr: { subjectAllowedLevels: { logic: ['preschool', 'kindergarten'], 'spatial-reasoning': ['preschool', 'kindergarten'] } },
};

/** Whether a subject×grade hub should exist at all for this locale (authenticity gate). */
export function isSubjectHubAllowed(locale: string, subjectKey: string, levelKey: string): boolean {
  const r = HUB_RULES[locale];
  if (!r) return true;
  if (r.dropLevels?.includes(levelKey)) return false;
  const allowed = r.subjectAllowedLevels?.[subjectKey];
  if (allowed && !allowed.includes(levelKey)) return false;
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

// Unicode-aware capitalize-first (for grade labels in breadcrumb/sibling links).
function capFirst(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function gradeLabel(locale: string, levelKey: string): string {
  return GRADE_COPY[locale]?.[levelKey]?.label
    ?? (getAxisName('educational-level', levelKey, locale) ?? levelKey).replace(/\s*\([^)]*\)\s*$/, '');
}
function gradePhrase(locale: string, levelKey: string): string {
  return GRADE_COPY[locale]?.[levelKey]?.phrase ?? gradeLabel(locale, levelKey);
}

/**
 * Clean grade label for breadcrumbs + sibling-grade links. es returns the Mexican
 * label ("Kínder", "Primer grado"); every other locale keeps the axis name so
 * live de/nl output is byte-unchanged.
 */
export function subjectHubGradeLabel(locale: string, levelKey: string): string {
  if (locale === 'es') {
    const l = GRADE_COPY.es?.[levelKey]?.label;
    if (l) return capFirst(l);
  }
  if (locale === 'fr') {
    const gc = GRADE_COPY.fr?.[levelKey];
    if (gc) return gc.display ?? capFirst(gc.label);
  }
  return getAxisName('educational-level', levelKey, locale) ?? levelKey;
}

// Grade-aware: resolve per-level overrides (nl "Letters" at kindergarten; es
// lectoescritura at preescolar/kínder; es science labels per grade).
function subjectCopy(locale: string, subjectKey: string, levelKey: string): { worksheets: string; angle: string } {
  const base: SubjectCopy =
    SUBJECT_COPY[locale]?.[subjectKey] ??
    SUBJECT_COPY.en[subjectKey] ?? {
      worksheets: `${getSubjectName(subjectKey, locale) ?? subjectKey} worksheets`,
      angle: 'core early-learning skills',
    };
  return {
    worksheets: base.worksheetsByLevel?.[levelKey] ?? base.worksheets,
    angle: base.angleByLevel?.[levelKey] ?? base.angle,
  };
}

// Per-locale copy templates. `w`=worksheets phrase, `g`=grade label, `wl`=lowercased
// worksheets, `gp`=grade prose phrase, `a`=angle. Adding a locale = one entry here +
// its SUBJECT_COPY/GRADE_COPY rows (no if-else fan-out).
interface LocaleTemplate {
  title: (w: string, g: string) => string;
  h1: (w: string, g: string) => string;
  desc: (c: number, w: string, wl: string, gp: string, a: string) => string;
  intro: (c: number, w: string, wl: string, gp: string, a: string) => string;
  heading: string;
}
const LOCALE_TEMPLATES: Record<string, LocaleTemplate> = {
  de: {
    title: (w, g) => `${w} ${g} – kostenlos zum Ausdrucken`,
    h1: (w, g) => `${w} – ${g}`,
    desc: (c, w, wl, gp, a) => `${c} kostenlose ${w} für ${gp} zum Ausdrucken – jedes als PDF mit Lösungen und direkt online spielbar, ganz ohne Anmeldung. Übungen zu ${a}.`,
    intro: (c, w, wl, gp, a) => `Hier findest du ${c} kostenlose ${w} für ${gp}, sorgfältig für diese Altersstufe zusammengestellt. Die Übungen fördern ${a}; jedes Arbeitsblatt gibt es als PDF mit Lösungen zum Ausdrucken – oder direkt online zum Ausprobieren, ganz ohne Anmeldung.`,
    heading: 'Nach Fach & Klassenstufe',
  },
  nl: {
    title: (w, g) => `${w} ${g} – gratis om uit te printen (PDF)`,
    h1: (w, g) => `${w} ${g}`,
    desc: (c, w, wl, gp, a) => `${c} gratis ${wl} ${gp}: printen als PDF met antwoorden of direct online oefenen, zonder account. Oefen ${a}.`,
    intro: (c, w, wl, gp, a) => `Hier vind je ${c} gratis ${wl} (oefenbladen) ${gp}, zorgvuldig samengesteld voor deze leeftijd. De oefeningen versterken ${a}. Elk werkblad kun je gratis printen als PDF met antwoorden — of meteen online spelen, zonder account.`,
    heading: 'Op vak & groep',
  },
  es: {
    title: (w, g) => `${w} para ${g} – para imprimir gratis (PDF)`,
    h1: (w, g) => `${w} para ${g}`,
    desc: (c, w, wl, gp, a) => `${c} ${wl} gratis para ${gp}, para imprimir en PDF (con respuestas) o para resolver en línea, sin registro. Refuerza ${a}.`,
    intro: (c, w, wl, gp, a) => `Aquí encontrarás ${c} ${wl} gratis para ${gp}, cuidadosamente seleccionadas para esta edad. Los ejercicios refuerzan ${a}. Cada ficha se puede imprimir en PDF con respuestas — o resolver en línea al instante, sin necesidad de registrarse.`,
    heading: 'Por materia y grado',
  },
  fr: {
    title: (w, g) => `${w} ${g} à imprimer – gratuit (PDF)`,
    h1: (w, g) => `${w} ${g}`,
    desc: (c, w, wl, gp, a) => `${c} ${wl} pour ${gp}, à imprimer gratuitement au format PDF (avec corrigés) ou à faire en ligne, sans inscription. De quoi ${a}.`,
    intro: (c, w, wl, gp, a) => `Retrouvez ${c} ${wl} pour ${gp}. Tout est à imprimer gratuitement au format PDF (avec corrigé) ou à faire directement en ligne, sans inscription — de quoi ${a}.`,
    heading: 'Par matière et niveau',
  },
  en: {
    title: (w, g) => `Free ${w} for ${g} – Printable PDF`,
    h1: (w, g) => `${w} – ${g}`,
    desc: (c, w, wl, gp, a) => `${c} free ${wl} for ${gp}, printable as PDF with answer keys and playable online — no sign-up. Practice ${a}.`,
    intro: (c, w, wl, gp, a) => `Here are ${c} free ${wl} for ${gp}, curated for this age group. The exercises build ${a}; every worksheet is available as a printable PDF with an answer key — or playable online right away, no sign-up required.`,
    heading: 'By subject & grade',
  },
};
function tpl(locale: string): LocaleTemplate {
  return LOCALE_TEMPLATES[locale] ?? LOCALE_TEMPLATES.en;
}

/** SEO <title> (brand suffix appended by the root layout template). */
export function subjectHubTitle(locale: string, subjectKey: string, levelKey: string): string {
  const { worksheets } = subjectCopy(locale, subjectKey, levelKey);
  return tpl(locale).title(worksheets, gradeLabel(locale, levelKey));
}

/** Visible H1. */
export function subjectHubH1(locale: string, subjectKey: string, levelKey: string): string {
  const { worksheets } = subjectCopy(locale, subjectKey, levelKey);
  return tpl(locale).h1(worksheets, gradeLabel(locale, levelKey));
}

/** Unique meta description (varies by subject angle + grade + count → non-duplicate). */
export function subjectHubDescription(locale: string, subjectKey: string, levelKey: string, count: number): string {
  const { worksheets, angle } = subjectCopy(locale, subjectKey, levelKey);
  return tpl(locale).desc(count, worksheets, worksheets.toLowerCase(), gradePhrase(locale, levelKey), angle);
}

/** Longer intro prose for the page body (2 sentences; subject-specific → non-duplicate). */
export function subjectHubIntro(locale: string, subjectKey: string, levelKey: string, count: number): string {
  const { worksheets, angle } = subjectCopy(locale, subjectKey, levelKey);
  return tpl(locale).intro(count, worksheets, worksheets.toLowerCase(), gradePhrase(locale, levelKey), angle);
}

/** Homepage "by subject & grade" grid heading. */
export function subjectHubHeading(locale: string): string {
  return tpl(locale).heading;
}
