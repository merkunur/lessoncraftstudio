/**
 * The teaching band of a hub page (worksheets, makers, tools, activities; Daily Teaching System, Part 11.6): the way
 * into the lesson plans by grade, and the Teacher plan. A server component that fetches its own data, so a hub page
 * adds one line. A language without live units renders nothing; a failure renders nothing (the hub is what it was).
 */
import TeachingBand from '@/components/topic/TeachingBand';
import { teachingForHub } from '@/lib/topic-teaching';

export default async function HubTeachingBand({ locale }: { locale: string }) {
  const data = await teachingForHub(locale).catch(() => null);
  return data ? <TeachingBand locale={locale} data={data} /> : null;
}
