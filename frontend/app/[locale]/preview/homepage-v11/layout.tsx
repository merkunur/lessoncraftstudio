import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import '@/components/homepage-v6/homepage-v6.css';
import '@/components/homepage-v10/homepage-v10.css';
import '@/components/homepage-v11/homepage-v11.css';

/* Homepage v11 "THE GALLERY OF LESSONS, WALKED THROUGH" — PREVIEW layout.
   noindex/nofollow; promotion = the edits listed in components/homepage-v11
   applied to app/[locale]/page.tsx, after which this route stays as the
   visual-diff safety net and the gate target (same pattern as v3/v4/v6/v10).

   THREE stylesheets and the root keeps `hv6 hv10`: `.hv6` is the design-token
   scope + focus ring, `.hv10` the gallery building, `.hv11` the walk.

   Direction A typography pairing — locked at CLAUDE.md §A.13.47. */

const baloo2 = Baloo_2({
  weight: ['600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  weight: ['400', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Homepage v11 preview — The Gallery of Lessons, walked through',
  robots: { index: false, follow: false },
};

export default function HomepageV11Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ⚠ The body stays LIGHT (CategoryNav is a 4%-opacity tint with dark
          text and relies on what sits behind it). NEW in v11: `overflow-x:
          clip`. globals.css sets `overflow-x: hidden` on body, which makes
          the body a SCROLL CONTAINER — measured on the live page: a sticky
          probe rendered at −400px and a view() timeline never advanced.
          `clip` contains horizontally without creating a scroller, so the
          easel can stick and the door can open. This inline style is
          unlayered and beats the @layer base rule without !important. */}
      <style>{`
        body { background: #FDFBF6 !important; color: #14322D; overflow-x: clip; }
        body::before { display: none; }
      `}</style>
      <div className={`hv6 hv10 hv11 ${baloo2.variable} ${nunito.variable} font-lcsBody min-h-screen`}>
        {children}
      </div>
    </>
  );
}
