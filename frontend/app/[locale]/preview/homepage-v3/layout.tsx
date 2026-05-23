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
        /* BOLD OVERHAUL: body bg is now deep teal #0E544A — the hero
           ground extends across the whole page outside section spreads.
           Cream-tone discontinuity is no longer an issue; cream
           appears only where cards or warm pillars explicitly use it.
           Chalk-on-teal endpaper pattern: cream + coral marks at higher
           opacity for a "chalk on dark paper" feel. */
        body {
          background: #0E544A !important;
          color: #FBF3E4;
          background-image:
            url("data:image/svg+xml;utf8,%3Csvg width='280' height='280' viewBox='0 0 280 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FBF3E4' stroke-width='1.6' stroke-linecap='round' opacity='0.12'%3E%3Cpath d='M 28 36 q 5 -7 10 0 t 10 0' /%3E%3Cpath d='M 210 70 q 4 -6 8 0 t 8 0' /%3E%3Cpath d='M 76 220 q 6 -8 12 0 t 12 0' /%3E%3Cpath d='M 130 140 q 5 -6 10 0' /%3E%3C/g%3E%3Cg fill='%23F2784B' opacity='0.14'%3E%3Cpath d='M 110 52 l 1.8 4.6 l 4.6 0.6 l -3.4 2.8 l 1.2 4.6 l -4 -2.4 l -4 2.4 l 1.2 -4.6 l -3.4 -2.8 l 4.6 -0.6 z' /%3E%3Cpath d='M 232 190 l 1.4 3.4 l 3.4 0.4 l -2.4 2 l 0.8 3.4 l -3 -1.8 l -3 1.8 l 0.8 -3.4 l -2.4 -2 l 3.4 -0.4 z' /%3E%3Cpath d='M 50 168 l 1.2 3 l 3 0.4 l -2 1.8 l 0.6 3 l -2.6 -1.6 l -2.6 1.6 l 0.6 -3 l -2 -1.8 l 3 -0.4 z' /%3E%3C/g%3E%3Cg fill='%23FBF3E4' opacity='0.10'%3E%3Ccircle cx='170' cy='28' r='2.4'/%3E%3Ccircle cx='44' cy='124' r='2.8'/%3E%3Ccircle cx='250' cy='240' r='2'/%3E%3Ccircle cx='132' cy='210' r='1.8'/%3E%3Ccircle cx='14' cy='210' r='1.8'/%3E%3Ccircle cx='200' cy='115' r='2.2'/%3E%3C/g%3E%3Cg fill='none' stroke='%23F2784B' stroke-width='1.5' stroke-linecap='round' opacity='0.13'%3E%3Cpath d='M 58 80 q 10 -5 20 0' /%3E%3Cpath d='M 190 150 q 8 -5 16 0' /%3E%3C/g%3E%3C/svg%3E");
          background-size: 280px 280px;
          background-repeat: repeat;
        }
        /* Suppress the legacy body::before grain on this route. */
        body::before { display: none; }
      `}</style>
      <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody text-lcs-cream min-h-screen`}>
        {children}
      </div>
    </>
  );
}
