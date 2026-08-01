import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import '@/components/homepage-v6/homepage-v6.css';

/* Homepage v6 "Lesson Line" PREVIEW layout — same pattern as the v3/v4
   preview layouts: robots noindex/nofollow (never indexed; promotion =
   import-swap in app/[locale]/page.tsx, after which this route stays as
   the visual-diff safety net). The v6 CSS lives with the components at
   frontend/components/homepage-v6/ (NOT inside a preview folder — fixes
   the live-page-depends-on-preview-CSS wart at promotion time).
   Direction A typography pairing — locked at CLAUDE.md §A.13.47. */

const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepageV6.metadata' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function HomepageV6Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Preview-scoped body override — the clean light ground the live page
          will also use (same technique as the live page's inline style). */}
      <style>{`
        body { background: #FDFBF6 !important; color: #14322D; }
        body::before { display: none; }
      `}</style>
      <div className={`hv6 ${baloo2.variable} ${nunito.variable} font-lcsBody min-h-screen`}>
        {children}
      </div>
    </>
  );
}
