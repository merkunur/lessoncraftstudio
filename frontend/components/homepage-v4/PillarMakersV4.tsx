/* The Makers — interactive-generation featured (2026-07-11). The headline:
   teachers BUILD their own interactive, self-grading worksheets. Shows the
   real payoff — "one build -> two outputs": a real interactive worksheet
   PLAYING + its self-graded "You did it!" result, and the printable PDF — then
   the real maker UI for control depth. All real assets, no mockups. Copy reads
   homepageV4.makers. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getTypedThumbs } from '@/lib/showcase-decks';
import { MAKER_COUNT } from '@/lib/seo/maker-content';

interface PillarMakersProps {
  locale: string;
}

const CDN = 'https://www.lessoncraftstudio.com/en/decks';

function Chrome({ url }: { url: string }) {
  return (
    <div className="hv5-chrome" aria-hidden="true">
      <i style={{ background: '#F2784B' }} />
      <i style={{ background: '#DCE3D3' }} />
      <i style={{ background: '#146B5E' }} />
      <span className="url">{url}</span>
    </div>
  );
}

export default async function PillarMakersV4({ locale }: PillarMakersProps) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.makers' });
  // Per-locale product screenshots (success card, background worksheet, maker UI).
  // EN keeps the unprefixed /homepage/*.webp; non-EN use /homepage/<locale>/*.webp.
  const imgBase = locale === 'en' ? '/homepage' : `/homepage/${locale}`;
  // Printable-PDF thumbnail in the visitor's language (EN keeps the hand-picked deck).
  const printableThumb = locale === 'en'
    ? `${CDN}/addition-find-addend-animals/thumbnail.png`
    : (await getTypedThumbs(locale, ['addition']))[0] ?? `${CDN}/addition-find-addend-animals/thumbnail.png`;

  const controlFeatures = [
    { title: t('f1Title'), body: t('f1Body') },
    { title: t('f2Title'), body: t('f2Body') },
    { title: t('f3Title'), body: t('f3Body') },
    { title: t('f4Title'), body: t('f4Body') },
  ];

  return (
    <section id="worksheet-makers" className="bg-[#FBF3E4] py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl">
          <p className="hv5-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
            {t('h2a')} <span className="text-lcs-coral">{t('h2coral')}</span> {t('h2b')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed max-w-2xl">{t('body')}</p>
        </div>

        {/* One build -> two outputs (the interactive story, up front) */}
        <p className="mt-10 md:mt-12 hv5-eyebrow text-[#F2784B]">{t('oneBuild')}</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Output 1 — plays online, self-grading */}
          <div>
            <div className="relative">
              <div className="hv5-card">
                <Chrome url="lessoncraftstudio.com/play/…" />
                <div className="max-h-[360px] overflow-hidden bg-white">
                  <img src={`${imgBase}/interactive-play.webp`} alt={t('playAlt')} width={760} height={1120} loading="lazy" className="block w-full" />
                </div>
              </div>
              {/* self-graded result, overlapping — proves it grades itself */}
              <div className="absolute -bottom-5 -right-3 w-[58%] rounded-xl bg-white border border-[#14322D]/8 shadow-[0_16px_34px_-14px_rgba(20,50,45,0.4)] overflow-hidden rotate-[3deg]">
                <img src={`${imgBase}/interactive-celebrate.webp`} alt={t('celebrateAlt')} width={900} height={556} loading="lazy" className="block w-full" />
              </div>
            </div>
            <h3 className="mt-8 font-lcsDisplay font-bold text-[#14322D] text-lg">{t('outPlayTitle')}</h3>
            <p className="mt-1 font-lcsBody text-[15px] text-[#3d574f] leading-relaxed">{t('outPlayBody')}</p>
          </div>

          {/* Output 2 — prints as PDF */}
          <div>
            <div className="hv5-card">
              <Chrome url="addition-fun.pdf" />
              <div className="max-h-[360px] overflow-hidden bg-[#FBF3E4]">
                <img src={printableThumb} alt={t('printableAlt')} width={760} height={980} loading="lazy" className="block w-full" />
              </div>
            </div>
            <h3 className="mt-8 font-lcsDisplay font-bold text-[#14322D] text-lg">{t('outPrintTitle')}</h3>
            <p className="mt-1 font-lcsBody text-[15px] text-[#3d574f] leading-relaxed">{t('outPrintBody')}</p>
          </div>
        </div>

        {/* Control depth — the real maker UI */}
        <p className="mt-16 md:mt-20 hv5-eyebrow">{t('controlEyebrow')}</p>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="rounded-2xl overflow-hidden border border-[#14322D]/8 shadow-[var(--e3)]">
            <Chrome url="lessoncraftstudio.com/worksheet-makers" />
            <div className="bg-[#F4F2EC]">
              <img src={`${imgBase}/maker.webp`} alt={t('makerAlt')} width={1400} height={1349} loading="lazy" className="block w-full h-auto" />
            </div>
          </div>
          <ul className="space-y-6">
            {controlFeatures.map((f) => (
              <li key={f.title}>
                <p className="font-lcsDisplay font-bold text-[#14322D] text-base md:text-lg">{f.title}</p>
                <p className="font-lcsBody text-sm md:text-[15px] text-[#3d574f] leading-relaxed mt-0.5">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[#14322D]/8 bg-white p-5 shadow-[var(--e1)]">
            <p className="font-lcsDisplay font-bold text-[#14322D] text-base md:text-lg">{t('f5Title')}</p>
            <p className="font-lcsBody text-sm text-[#3d574f] leading-relaxed mt-1">{t('f5Body')}</p>
          </div>
          <div className="rounded-2xl border border-[#14322D]/8 bg-white p-5 shadow-[var(--e1)]">
            <p className="font-lcsDisplay font-bold text-[#14322D] text-base md:text-lg">{t('shipTitle')}</p>
            <p className="font-lcsBody text-sm text-[#3d574f] leading-relaxed mt-1">{t('shipBody')}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link href={`/${locale}/worksheet-makers/`} className="hv5-cta hv5-cta-primary text-base px-7 py-3.5">
            {t('cta', { count: MAKER_COUNT })}
            <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
          </Link>
          <Link href={`/${locale}/worksheets/`} className="font-lcsBody text-sm font-semibold text-[#146B5E] underline underline-offset-4 hover:text-lcs-coral">
            {t('embedLink')}
          </Link>
        </div>
      </div>
    </section>
  );
}
