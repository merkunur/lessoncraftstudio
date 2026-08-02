import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import '@/components/homepage-v6/homepage-v6.css';
import '@/components/homepage-v10/homepage-v10.css';

/* Homepage v10 "THE GALLERY OF LESSONS" — PREVIEW layout.
   noindex/nofollow; promotion = import-swap in app/[locale]/page.tsx, after
   which this route stays as the visual-diff safety net (same pattern as the
   v3/v4/v6 previews).

   BOTH stylesheets are imported and the root keeps the `hv6` class on
   purpose: `.hv6 { --hv6-* }` is the design-token scope and
   `.hv6 :where(a,button):focus-visible` is the focus ring. v10 reuses the
   twelve instrument machines from homepage-v6/ rather than copying them —
   the same house doctrine that lets v6 consume BrowseByTopicSSR from v3.

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

export const metadata: Metadata = {
  title: 'Homepage v10 preview — The Gallery of Lessons',
  robots: { index: false, follow: false },
};

export default function HomepageV10Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ⚠ The body stays LIGHT. Setting it to the gallery wall colour made
          the category nav unreadable: CategoryNav.tsx:97 is
          `bg-[#146B5E]/[0.04]` — a 4%-opacity tint with dark text, so it
          relies entirely on what sits behind it. On cream it reads; on the
          wall colour it became dark-on-dark and the whole menu vanished.
          The hero paints its own wall via .hv10-field, so nothing here needs
          to. Never restyle the body to suit one section — the site-wide
          chrome is sitting on it. */}
      <style>{`
        body { background: #FDFBF6 !important; color: #14322D; }
        body::before { display: none; }
      `}</style>
      <div className={`hv6 hv10 ${baloo2.variable} ${nunito.variable} font-lcsBody min-h-screen`}>
        {children}
      </div>
    </>
  );
}
