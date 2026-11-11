import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { baloo2, nunito } from '@/lib/fonts/direction-a-wide';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { TEACHER_STRINGS } from '@/lib/class-results/teacher-strings';
import ClassesClient from './ClassesClient';

/**
 * /[locale]/workspace/classes — class links and results, the teacher's screen (Daily Teaching System, Part 9.3).
 *
 * A server shell (noindex metadata, the workspace desk, the fonts) around ONE client component that mounts the
 * framework-free screen lib/class-results/teacher-app.ts. The screen has its own gates — signed out, no plan (the
 * example dashboard), a plan that is no longer active (read and delete only) — so this page does NOT sit behind the
 * workspace's subscriber gate: a teacher whose plan has ended must always be able to read and remove what is stored.
 *
 * With the switch off (CLASS_RESULTS_ENABLED ≠ 1) the page does not exist. `force-dynamic`: the switch is read per
 * request, and an on-demand static page under this root layout fails in production (CLAUDE.md §32 trap 1).
 *
 * The plan's name comes from pricingPage.tier.name, as everywhere a plan is named.
 */
export const dynamic = 'force-dynamic';

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const enabled = () => process.env.CLASS_RESULTS_ENABLED === '1';
const stringsFor = (locale: string) => TEACHER_STRINGS[LOCALES.includes(locale) ? locale : 'en'];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return { title: stringsFor(params.locale).title, robots: { index: false, follow: false } };
}

export default async function ClassesPage({ params }: { params: { locale: string } }) {
  if (!enabled()) notFound();
  const locale = LOCALES.includes(params.locale) ? params.locale : 'en';
  const tier = await getTranslations({ locale, namespace: 'pricingPage.tier' });
  return (
    <div
      data-workspace-root=""
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#DDD4C2] min-h-[calc(100vh-200px)] px-4 py-8 md:px-8 md:py-12`}
    >
      <div className="mx-auto max-w-6xl">
        <ClassesClient locale={locale} strings={stringsFor(locale)} plan={tier('name')} pricingPublic={PRICING_PUBLIC} />
      </div>
    </div>
  );
}
