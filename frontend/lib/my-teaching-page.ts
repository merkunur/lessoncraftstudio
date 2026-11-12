/* Everything the "My teaching" view needs for a language, built on the server (Daily Teaching System, Part 11.3):
 * the data, the Teacher-plan lines, the plan's name, and the words for grades and subjects. Used by the workspace
 * page (an account without the plan) and by the preview page. null where the language has no units or no strings. */
import { getTranslations } from 'next-intl/server';
import { getMyTeaching, MyTeachingData } from '@/lib/my-teaching';
import { getTeacherGate, TeacherGateProps } from '@/lib/teacher-gate';
import { getUnitUi } from '@/lib/units';
import taxonomy from '@/config/topics-taxonomy.json';

export interface MyTeachingProps { data: MyTeachingData; gate: TeacherGateProps | null; plan: string; gradeLabels: Record<string, string>; subjectLabels: Record<string, string>; topicHrefs: Record<string, string>; teachHrefs: Record<string, string>; hubTitle: string }

/** the address of the grade page for everyone: the level's own slug in the language, as the topic pages use it */
export function teachSlugToGrade(locale: string, slug: string): string | null {
  const axis = (taxonomy as unknown as { axes: Record<string, Record<string, { slug: Record<string, string> }>> }).axes['educational-level'];
  for (const [grade, key] of Object.entries(LEVEL_AXIS)) if (axis[key]?.slug?.[locale] === slug) return grade;
  return null;
}

/** the grade of a unit as a key of the translations and as an axis key of the taxonomy */
const LEVEL_KEY: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3', '4': 'grade_4', '5': 'grade_5' };
const LEVEL_AXIS: Record<string, string> = { P: 'preschool', K: 'kindergarten', '1': 'grade-1', '2': 'grade-2', '3': 'grade-3' };

export async function myTeachingProps(locale: string): Promise<MyTeachingProps | null> {
  const data = await getMyTeaching(locale);
  if (!data) return null;
  const [gate, unitUi, tLevel, tTier] = await Promise.all([
    getTeacherGate(locale), getUnitUi(locale),
    getTranslations({ locale, namespace: 'seo.educational_level' }), getTranslations({ locale, namespace: 'pricingPage.tier' }),
  ]);
  const axis = (taxonomy as unknown as { axes: Record<string, Record<string, { slug: Record<string, string> }>> }).axes['educational-level'];
  const gradeLabels: Record<string, string> = {}, topicHrefs: Record<string, string> = {}, subjectLabels: Record<string, string> = {}, teachHrefs: Record<string, string> = {};
  for (const g of data.grades) {
    gradeLabels[g.grade] = LEVEL_KEY[g.grade] ? tLevel(LEVEL_KEY[g.grade]) : g.grade;
    const slug = axis[LEVEL_AXIS[g.grade]]?.slug?.[locale];
    if (slug) { topicHrefs[g.grade] = `/${locale}/topic/${slug}`; teachHrefs[g.grade] = `/${locale}/teach/${slug}`; }
    for (const s of g.subjects) subjectLabels[s.subject] = unitUi?.[`subject_${s.subject}`] || s.subject;
  }
  return { data, gate, plan: tTier('name'), gradeLabels, subjectLabels, topicHrefs, teachHrefs, hubTitle: unitUi?.hubTitle || '' };
}
