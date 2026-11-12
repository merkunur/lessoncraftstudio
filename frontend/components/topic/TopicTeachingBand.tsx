/**
 * The teaching band of a two-topic page and of a subject-by-grade page (Daily Teaching System, Part 11.6). The page
 * names its axes; the band follows the most telling one: a grade (the units of the grade), else a worksheet type
 * (the lessons that use it), else the way into the lesson plans. Fetches its own data; renders nothing in a language
 * without live units, and nothing when anything fails (the page is what it was).
 */
import TeachingBand from '@/components/topic/TeachingBand';
import { teachingForTopic } from '@/lib/topic-teaching';

export default async function TopicTeachingBand({ locale, axes }: { locale: string; axes: { axis: string; axisKey: string }[] }) {
  const pick = axes.find((a) => a.axis === 'educational-level') || axes.find((a) => a.axis === 'exercise-type') || axes[0];
  if (!pick) return null;
  const data = await teachingForTopic(locale, pick.axis, pick.axisKey).catch(() => null);
  return data ? <TeachingBand locale={locale} data={data} /> : null;
}
