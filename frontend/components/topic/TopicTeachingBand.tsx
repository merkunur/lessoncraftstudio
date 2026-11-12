/**
 * The teaching band of a two-topic page and of a subject-by-grade page (Daily Teaching System, Part 11.6). The page
 * names its axes; the band follows the most telling one: a grade (the units of the grade), else a worksheet type
 * (the lessons that use it), else the way into the lesson plans. Fetches its own data; renders nothing in a language
 * without live units, and nothing when anything fails (the page is what it was).
 */
import TeachingBand from '@/components/topic/TeachingBand';
import TeachingLook from '@/components/topic/TeachingLook';
import { teachingForTopic } from '@/lib/topic-teaching';

/** part 'look': the pictures of real pages of the plan's files, which stand below the worksheets (TeachingLook) */
export default async function TopicTeachingBand({ locale, axes, part = 'band' }: { locale: string; axes: { axis: string; axisKey: string }[]; part?: 'band' | 'look' }) {
  const pick = axes.find((a) => a.axis === 'educational-level') || axes.find((a) => a.axis === 'exercise-type') || axes[0];
  if (!pick) return null;
  const data = await teachingForTopic(locale, pick.axis, pick.axisKey).catch(() => null);
  if (!data) return null;
  return part === 'look' ? <TeachingLook locale={locale} data={data} /> : <TeachingBand locale={locale} data={data} />;
}
