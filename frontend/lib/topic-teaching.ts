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
const LEVEL_MSG: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };

export interface TeachingLessonRef { unitSlug: string; unitTitle: string; grade: string; gradeLabel: string; lesson: number; lessonTitle: string }
export interface TopicTeaching {
  /** grade: the units of the grade · type: the lessons that use this worksheet type · hub: the way into the lesson plans (a theme page, or a type no lesson hands out yet) */
  kind: 'grade' | 'type' | 'hub';
  unitUi: UnitUi;
  myUi: Record<string, string>;
  gate: TeacherGateProps | null;
  plan: string;
  downloadsPerMonth: number;
  /** grade page */
  subjects: (MyTeachingSubject & { label: string })[];
  subPlans: number;
  checks: number;
  hasStandards: boolean;
  /** exercise-type page */
  lessons: TeachingLessonRef[];
  lessonsTotal: number;
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
  const base = { unitUi, myUi: mine.ui, gate, plan: tTier('name'), downloadsPerMonth: mine.downloadsPerMonth };

  if (axis === 'educational-level') {
    const g = mine.grades.find((x) => x.grade === GRADE_OF_LEVEL[axisKey]);
    if (g && g.subjects.length) return { ...base, kind: 'grade', subjects: g.subjects.map((s) => ({ ...s, label: unitUi[`subject_${s.subject}`] || s.subject })), subPlans: g.subPlans, checks: g.checks, hasStandards: mine.hasStandards, lessons: [], lessonsTotal: 0 };
  }
  // the numbers of the whole language for the two short forms
  const all = { subjects: [], subPlans: gate?.facts.subPlans ?? 0, checks: gate?.facts.checks ?? 0, hasStandards: mine.hasStandards };
  const hub: TopicTeaching = { ...base, ...all, kind: 'hub', lessons: [], lessonsTotal: 0 };
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
  return { ...base, ...all, kind: 'type', lessons: lessons.slice(0, 3), lessonsTotal: lessons.length };
}
