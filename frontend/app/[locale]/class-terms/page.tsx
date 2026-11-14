/**
 * /<locale>/class-terms: the data processing terms for classes (Daily Teaching System, Part 9; legal decision of
 * 2026-11-14, condition E7). The confirmation a teacher ticks before her first class links here.
 * The page exists only while the feature is switched on (CLASS_RESULTS_ENABLED=1); not for search engines.
 * (force-dynamic: a page under this root layout cannot be built on demand as a static one.)
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalText, legalText, legalTitle } from '@/lib/class-results/legal';
import { TEACHER_STRINGS } from '@/lib/class-results/teacher-strings';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return { title: legalTitle(params.locale, 'terms'), robots: { index: false, follow: false } };
}

export default function ClassTermsPage({ params }: { params: { locale: string } }) {
  if (process.env.CLASS_RESULTS_ENABLED !== '1') notFound();
  const locale = params.locale;
  const s = TEACHER_STRINGS[locale] || TEACHER_STRINGS.en;
  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 print:bg-none print:py-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 print:shadow-none print:p-0">
            <div data-class-terms="">
              <LegalText md={legalText(locale, 'terms')} locale={locale} />
            </div>
            <p className="mt-8 text-gray-600 dark:text-gray-300 print:hidden">
              <a className="underline" href={`/${locale}/class-terms/parent-note`}>{s.docsParentNote}</a>
              {' · '}
              <a className="underline" href={`/${locale}/privacy#classes`}>{s.confirmPrivacy}</a>
            </p>
          </div>
        </div>
      </div>
  );
}
