import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import './homepage-v3.css';

/* Direction A typography pairing — locked at CLAUDE.md §A.13.47.
   Baloo 2 (display) is a rounded humanist that reads warm but confident.
   Nunito (body) is a humanist sans with subtle rounding that pairs with
   Baloo 2 without competing.
   Latin-ext subset covers all 11 site locales (German ä, Finnish ö,
   Swedish å, Portuguese ã, etc.). */
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

export const metadata: Metadata = {
  title: 'Homepage v3 Preview · LessonCraftStudio',
  description: 'Internal prototype of the redesigned homepage. Not indexed.',
  robots: { index: false, follow: false },
};

export default function HomepageV3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preview-route-scoped body override: eliminate the visible
          cream-tone band where the parent body (#FBF7EE) met the
          prototype container (#FBF3E4). This <style> only renders when
          this layout is active (preview route), so live /, activities,
          etc. all keep their normal body bg. The endpaper marks pattern
          + paper grain make the cream feel like handmade paper instead
          of a flat canvas. */}
      <style>{`
        body {
          background: #FBF3E4 !important;
          background-image:
            url("data:image/svg+xml;utf8,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23146B5E' stroke-width='1.4' stroke-linecap='round' opacity='0.07'%3E%3Cpath d='M 22 30 q 4 -6 8 0 t 8 0' /%3E%3Cpath d='M 180 60 q 3 -5 6 0 t 6 0' /%3E%3Cpath d='M 65 200 q 5 -7 10 0 t 10 0' /%3E%3C/g%3E%3Cg fill='%23F2784B' opacity='0.07'%3E%3Cpath d='M 95 45 l 1.5 4 l 4 0.5 l -3 2.5 l 1 4 l -3.5 -2 l -3.5 2 l 1 -4 l -3 -2.5 l 4 -0.5 z' /%3E%3Cpath d='M 200 165 l 1 3 l 3 0.4 l -2 1.8 l 0.6 3 l -2.6 -1.5 l -2.6 1.5 l 0.6 -3 l -2 -1.8 l 3 -0.4 z' /%3E%3C/g%3E%3Cg fill='%23146B5E' opacity='0.06'%3E%3Ccircle cx='150' cy='25' r='2'/%3E%3Ccircle cx='40' cy='110' r='2.4'/%3E%3Ccircle cx='215' cy='210' r='1.8'/%3E%3Ccircle cx='115' cy='180' r='1.6'/%3E%3Ccircle cx='12' cy='180' r='1.6'/%3E%3C/g%3E%3Cg fill='none' stroke='%23F2784B' stroke-width='1.3' stroke-linecap='round' opacity='0.07'%3E%3Cpath d='M 50 70 q 8 -4 16 0' /%3E%3Cpath d='M 165 130 q 6 -4 12 0' /%3E%3C/g%3E%3C/svg%3E"),
            url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.10 0 0 0 0 0.42 0 0 0 0 0.37 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 240px 240px, 200px 200px;
          background-repeat: repeat, repeat;
        }
        /* Suppress the legacy body::before grain on this route — the
           background-image stack above already provides texture + the
           endpaper pattern, so the duplicate grain layer would over-tint. */
        body::before {
          display: none;
        }
      `}</style>
      <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody text-lcs-teal min-h-screen`}>
        {children}
      </div>
    </>
  );
}
