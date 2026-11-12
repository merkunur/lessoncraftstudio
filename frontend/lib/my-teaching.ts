/* "My teaching": the first page of an account without the plan (Daily Teaching System, Part 11.3; PLAN.md Part 11).
 *
 * Before, a new account landed on the workspace and read one sentence: "This area is part of the subscription".
 * 68 accounts a day arrive there. Now the page shows the teacher her own grade: its units in teaching order, the
 * sub plans and unit checks for it, what her account can do, and what the plan adds.
 *
 *   content/my-teaching/ui.<loc>.json   the strings; a language has the page when the file exists AND it has live units
 *
 * Everything listed is the live content of the language, read here on the server. The grade a teacher picks is
 * kept on her device (components/my-teaching/MyTeaching.tsx); nothing about it is sent anywhere. */
import { DOWNLOADS_PER_MONTH } from '@/lib/quota';
import { listedUnits, GRADE_ORDER, SUBJECT_ORDER } from '@/lib/units';
import { listedSubPacks } from '@/lib/sub-plans';
import { listedChecks } from '@/lib/assessments';
import { listedCurriculumPages } from '@/lib/curriculum-pages';

export type MyTeachingUi = Record<string, string>;
export interface MyTeachingUnit { title: string; slug: string; lessons: number; weeks: number }
export interface MyTeachingSubject { subject: string; plan: { slug: string; weeks: number } | null; units: MyTeachingUnit[] }
export interface MyTeachingGrade { grade: string; subjects: MyTeachingSubject[]; subPlans: number; checks: number }
export interface MyTeachingData { ui: MyTeachingUi; grades: MyTeachingGrade[]; hasSubPlans: boolean; hasChecks: boolean; hasStandards: boolean; downloadsPerMonth: number }

const cache = new Map<string, MyTeachingUi | null>();
async function ui(locale: string): Promise<MyTeachingUi | null> {
  if (cache.has(locale)) return cache.get(locale) ?? null;
  try { cache.set(locale, (await import(`@/content/my-teaching/ui.${locale}.json`)).default as MyTeachingUi); } catch { cache.set(locale, null); }
  return cache.get(locale) ?? null;
}

const rank = (order: readonly string[], x: string) => { const i = order.indexOf(x); return i < 0 ? order.length : i; };

export async function getMyTeaching(locale: string): Promise<MyTeachingData | null> {
  const strings = await ui(locale);
  if (!strings) return null;
  const [u, s, checks, cur] = await Promise.all([listedUnits(locale), listedSubPacks(locale), listedChecks(locale), listedCurriculumPages(locale)]);
  if (!u.live || u.units.length < 2) return null;
  const packs = s.live ? s.packs : [];
  const checked = new Set(checks.map((c) => c.unit));
  const gradeIds = [...new Set(u.units.map((x) => x.grade))].sort((a, b) => rank(GRADE_ORDER, a) - rank(GRADE_ORDER, b));
  const grades: MyTeachingGrade[] = gradeIds.map((grade) => {
    const mine = u.units.filter((x) => x.grade === grade);
    const subjects = [...new Set(mine.map((x) => x.subject))].sort((a, b) => rank(SUBJECT_ORDER, a) - rank(SUBJECT_ORDER, b)).map((subject) => {
      const plan = u.plans.find((p) => p.grade === grade && p.subject === subject) || null;
      // the order of the plan where one exists (the teaching order of the year), else the order of the units file
      const inPlan = plan ? plan.units.map((r) => mine.find((x) => x.id === r.id)).filter((x): x is typeof mine[number] => !!x) : [];
      const rest = mine.filter((x) => x.subject === subject && !inPlan.includes(x));
      const units = inPlan.concat(rest).map((x) => ({ title: x.title, slug: x.slug, lessons: x.lessons.length, weeks: x.weeks }));
      return { subject, plan: plan ? { slug: plan.slug, weeks: plan.weeks } : null, units };
    });
    return { grade, subjects, subPlans: packs.filter((p) => p.grade === grade).length, checks: mine.filter((x) => checked.has(x.id)).length };
  });
  return { ui: strings, grades, hasSubPlans: packs.length > 0, hasChecks: checks.length > 0, hasStandards: cur.live && cur.pages.length > 0, downloadsPerMonth: DOWNLOADS_PER_MONTH };
}
