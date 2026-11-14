/**
 * /<locale>/class-terms/parent-note: the note a teacher prints or sends to parents (Daily Teaching System, Part 9;
 * legal decision of 2026-11-14, condition E7). One page; the grey block for the teacher is not printed.
 * The page exists only while the feature is switched on (CLASS_RESULTS_ENABLED=1); not for search engines.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalText, legalText, legalTitle } from '@/lib/class-results/legal';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return { title: legalTitle(params.locale, 'parentNote'), robots: { index: false, follow: false } };
}

export default function ClassParentNotePage({ params }: { params: { locale: string } }) {
  if (process.env.CLASS_RESULTS_ENABLED !== '1') notFound();
  const locale = params.locale;
  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 print:bg-none print:py-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 print:shadow-none print:p-0">
            <div data-class-parent-note="">
              <LegalText md={legalText(locale, 'parentNote')} locale={locale} />
            </div>
          </div>
        </div>
      </div>
  );
}
