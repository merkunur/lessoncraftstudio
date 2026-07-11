/* Share with your class — professional rebuild (2026-07-11). A real worksheet
   thumbnail + a REAL QR code (generated to a live worksheet). Clean light
   ground. Copy reads homepageV4.share. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getTypedThumbs } from '@/lib/showcase-decks';

interface Props {
  locale: string;
}

const CDN = 'https://www.lessoncraftstudio.com/en/decks';

export default async function EmbedShareV4({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.share' });
  // Show a worksheet thumbnail in the visitor's language (EN keeps the hand-picked deck).
  const savedThumb = locale === 'en'
    ? `${CDN}/sudoku-ocean-life/thumbnail.png`
    : (await getTypedThumbs(locale, ['sudoku']))[0] ?? `${CDN}/sudoku-ocean-life/thumbnail.png`;

  return (
    <section className="bg-[#FBF3E4] py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="hv5-eyebrow">{t('eyebrow')}</p>
            <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
              {t('h2Line1')} {t('h2Line2')}
            </h2>
            <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed max-w-xl">{t('body')}</p>

            <ul className="mt-6 space-y-3 font-lcsBody text-base text-[#3d574f]">
              {['t1', 't2', 't3'].map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <svg className="text-lcs-coral mt-1 shrink-0" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l3.5 3.5L16 5.5" /></svg>
                  {t(k)}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-lcsBody text-sm text-[#3d574f]/70 italic">{t('embedNote')}</p>

            <div className="mt-8">
              <Link href={`/${locale}/pricing`} className="hv5-cta hv5-cta-primary text-base px-7 py-3.5">
                {t('cta')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
              </Link>
            </div>
          </div>

          {/* Share card: the real worksheet is the hero; QR + link secondary */}
          <div className="rounded-2xl border border-[#14322D]/8 bg-white p-5 md:p-6 shadow-[var(--e2)]">
            <div className="flex gap-5">
              <div className="shrink-0 w-[150px] rounded-xl overflow-hidden border border-[#14322D]/8 bg-white shadow-[0_10px_22px_-12px_rgba(20,50,45,0.35)]">
                <img src={savedThumb} alt={t('savedAlt')} loading="lazy" width={300} height={386} className="block w-full h-auto" />
              </div>
              <div className="min-w-0 flex flex-col">
                <p className="font-lcsDisplay font-bold text-[#14322D] text-base">{t('mockTitle')}</p>
                <p className="font-lcsBody text-xs text-[#3d574f]/70 mt-0.5">{t('mockStatus')}</p>
                <div className="mt-auto rounded-xl bg-[#FDFBF6] p-3 border border-[#14322D]/8">
                  <div className="flex items-center gap-3">
                    <img src="/homepage/qr.png" alt={t('qrAlt')} width={72} height={72} className="shrink-0" style={{ width: 72, height: 72 }} />
                    <div className="min-w-0">
                      <p className="font-lcsDisplay font-bold text-[#14322D] text-sm">{t('scanLabel')}</p>
                      <span className="mt-1 block font-mono text-[10px] text-[#3d574f]/70 truncate">lessoncraftstudio.com/play/w/…</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
