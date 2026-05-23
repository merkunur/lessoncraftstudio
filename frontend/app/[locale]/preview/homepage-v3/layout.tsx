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
    <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream text-lcs-teal min-h-screen`}>
      {children}
    </div>
  );
}
