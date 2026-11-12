/* What a topic page says about the teaching system (Daily Teaching System, Part 11.6; operator 2026-11-12: every
 * entry page reflects the teaching system and leads to the Teacher plan).
 *
 *   a GRADE page ("1st Grade Worksheets")      the units of that grade in teaching order, per subject, with the plan,
 *                                              the sub plans and the unit checks of the grade
 *   an EXERCISE-TYPE page ("Addition …")       the lessons that hand out worksheets of this type, with their units
 *
 * Both carry what the Teacher plan adds, with its price. Everything is the LIVE content of the language, read on the
 * server; a language without live units gets no band (null). Every string is one a native reader has already seen:
 * content/units/ui.<loc>.json, content/my-teaching/ui.<loc>.json, content/teacher-gate/ui.<loc>.json. */
import { getTranslations } from 'next-intl/server';
import taxonomy from '@/config/topics-taxonomy.json';
import { getMyTeaching, type MyTeachingSubject } from '@/lib/my-teaching';
import { getTeacherGate, type TeacherGateProps } from '@/lib/teacher-gate';
import { getUnits, getUnitUi, type UnitUi } from '@/lib/units';

/** the taxonomy's level key → the grade code of the units */
const GRADE_OF_LEVEL: Record<string, string> = { preschool: 'P', kindergarten: 'K', 'grade-1': '1', 'grade-2': '2', 'grade-3': '3' };
const LEVEL_AXIS: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade-1', '2': 'grade-2', '3': 'grade-3' };
const LEVEL_MSG: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

export interface TeachingLessonRef { unitSlug: string; unitTitle: string; grade: string; gradeLabel: string; lesson: number; lessonTitle: string }
/** one picture of a real page of a Teacher-plan file (content/units/looks.<language>.json, scripts/units/build-looks.js) */
export interface TeachingLookItem { slug: string; title: string; src: string; width: number; height: number }
export interface TeachingLookSet { unit?: TeachingLookItem; pack?: TeachingLookItem; check?: TeachingLookItem; plan?: TeachingLookItem; standards?: TeachingLookItem }

const looksCache = new Map<string, Record<string, TeachingLookSet> | null>();
/** the pictures of a language by grade, or null where the language has none */
async function getLooks(locale: string): Promise<Record<string, TeachingLookSet> | null> {
  if (!looksCache.has(locale)) {
    try { looksCache.set(locale, ((await import(`@/content/units/looks.${locale}.json`)).default as { looks: Record<string, TeachingLookSet> }).looks); } catch { looksCache.set(locale, null); }
  }
  return looksCache.get(locale) ?? null;
}

export interface TopicTeaching {
  /** grade: the units of the grade · type: the lessons that use this worksheet type · hub: the way into the lesson plans (a theme page, or a type no lesson hands out yet) */
  kind: 'grade' | 'type' | 'hub';
  unitUi: UnitUi;
  myUi: Record<string, string>;
  gate: TeacherGateProps | null;
  plan: string;
  downloadsPerMonth: number;
  /** the grades that have units, each with its grade page: the chooser of the short forms */
  grades: { label: string; href: string }[];
  /** grade page: the grade page for everyone (/<language>/teach/<grade>), where the whole year of the grade is listed */
  teachHref: string | null;
  /** grade page */
  subjects: (MyTeachingSubject & { label: string })[];
  subPlans: number;
  checks: number;
  hasStandards: boolean;
  /** exercise-type page */
  lessons: TeachingLessonRef[];
  lessonsTotal: number;
  /** the look inside the plan for this page's grade (the grade of the page, of its first lesson, or the first grade that has units) */
  look: TeachingLookSet | null;
}

type Axes = Record<string, Record<string, { slug: Record<string, string> }>>;

/** the family (exercise-type key) a published page belongs to: the longest family slug of the language its slug starts with */
function familyOfSlug(locale: string, pageSlug: string): string | null {
  const types = (taxonomy as unknown as { axes: Axes }).axes['exercise-type'];
  let best: string | null = null, bestLen = 0;
  for (const [key, v] of Object.entries(types)) {
    const s = v.slug?.[locale];
    if (s && s.length > bestLen && (pageSlug === s || pageSlug.startsWith(s + '-'))) { best = key; bestLen = s.length; }
  }
  return best;
}

export async function teachingForTopic(locale: string, axis: string, axisKey: string): Promise<TopicTeaching | null> {
  const mine = await getMyTeaching(locale);
  if (!mine) return null; // no live units or no strings in this language
  const [gate, unitUi, tLevel, tTier] = await Promise.all([
    getTeacherGate(locale), getUnitUi(locale),
    getTranslations({ locale, namespace: 'seo.educational_level' }), getTranslations({ locale, namespace: 'pricingPage.tier' }),
  ]);
  if (!unitUi) return null;
  const looks = await getLooks(locale);
  const lookFor = (grade: string | undefined) => (looks && ((grade && looks[grade]) || looks[mine.grades.find((g) => looks[g.grade])?.grade ?? ''])) || null;
  const levels = (taxonomy as unknown as { axes: Axes }).axes['educational-level'];
  const levelSlug = axis === 'educational-level' ? levels[axisKey]?.slug?.[locale] : null;
  const base = { unitUi, myUi: mine.ui, gate, plan: tTier('name'), downloadsPerMonth: mine.downloadsPerMonth, teachHref: null as string | null,
    grades: mine.grades.map((g) => { const sl = levels[LEVEL_AXIS[g.grade]]?.slug?.[locale]; return sl && LEVEL_MSG[g.grade] ? { label: tLevel(LEVEL_MSG[g.grade]), href: `/${locale}/teach/${sl}` } : null; }).filter((x): x is { label: string; href: string } => !!x) };

  if (axis === 'educational-level') {
    const g = mine.grades.find((x) => x.grade === GRADE_OF_LEVEL[axisKey]);
    if (g && g.subjects.length) return { ...base, teachHref: levelSlug ? `/${locale}/teach/${levelSlug}` : null, kind: 'grade', look: lookFor(g.grade), subjects: g.subjects.map((s) => ({ ...s, label: unitUi[`subject_${s.subject}`] || s.subject })), subPlans: g.subPlans, checks: g.checks, hasStandards: mine.hasStandards, lessons: [], lessonsTotal: 0 };
  }
  // the numbers of the whole language for the two short forms
  const all = { subjects: [], subPlans: gate?.facts.subPlans ?? 0, checks: gate?.facts.checks ?? 0, hasStandards: mine.hasStandards };
  const hub: TopicTeaching = { ...base, ...all, kind: 'hub', lessons: [], lessonsTotal: 0, look: lookFor(undefined) };
  if (axis !== 'exercise-type') return hub;

  const lessons: TeachingLessonRef[] = [];
  for (const u of await getUnits(locale)) {
    if (u.status !== 'live') continue;
    for (const l of u.lessons) {
      if (!l.paper.some((p) => familyOfSlug(locale, p.core) === axisKey)) continue;
      lessons.push({ unitSlug: u.slug, unitTitle: u.title, grade: u.grade, gradeLabel: LEVEL_MSG[u.grade] ? tLevel(LEVEL_MSG[u.grade]) : u.grade, lesson: l.n, lessonTitle: l.title });
    }
  }
  if (!lessons.length) return hub;
  return { ...base, ...all, kind: 'type', lessons: lessons.slice(0, 3), lessonsTotal: lessons.length, look: lookFor(lessons[0].grade) };
}

/** the short form for a hub page (worksheets, makers, tools, activities): the way into the lesson plans by grade, and the plan */
export const teachingForHub = (locale: string) => teachingForTopic(locale, 'hub', '');
