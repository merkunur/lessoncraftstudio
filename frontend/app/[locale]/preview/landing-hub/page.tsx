/* /[locale]/preview/landing-hub — PREVIEW-ONLY, noindex.
 *
 * Phase-5 demo of the hub→landing edge WITHOUT mutating any live /topic/ query
 * or link (per the Phase-2 §2.I sequencing ruling). Lists the pilot landings and
 * links to /<locale>/worksheets/<slug>. robots: noindex,nofollow. Not in sitemap.
 */
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { wwwImg } from '@/lib/img-host';
import { localePath } from '@/lib/seo/url';
import { getAllLandings, deckAssets } from '@/lib/seo/landing-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Landing-tier preview (pilot)',
  robots: { index: false, follow: false },
};

export default function LandingHubPreview({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const landings = getAllLandings(locale);
  if (landings.length === 0) notFound();

  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="mb-2 inline-block rounded-full bg-[#F2784B] text-white text-xs font-bold tracking-wide px-3 py-1">
          PREVIEW · noindex · pilot hub→landing demo (does not touch live /topic/)
        </div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink-900 mb-2">Math · Kindergarten — pilot landings</h1>
        <p className="text-ink-600 mb-8 max-w-3xl">{landings.length} deck landing pages. Each card links to its <code>/{locale}/worksheets/&lt;slug&gt;</code> page — the hub→landing edge the catalog hubs will carry at fan-out.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {landings.map((l) => {
            const a = deckAssets(locale, l.canonicalDeckSlug);
            return (
              <Link key={l.slug} href={localePath(locale, 'worksheets', l.slug)}
                className="block bg-white rounded-2xl overflow-hidden border border-cream-300 hover:-translate-y-0.5 transition-transform shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_16px_36px_-12px_rgba(20,30,28,0.14)]">
                <div className="relative aspect-[4/5] bg-[#FBF6EE] border-b border-cream-300">
                  <Image src={wwwImg(a.thumbnail)} alt={l.h1} fill sizes="(max-width:767px) 45vw, 240px" className="object-cover" />
                </div>
                <div className="p-3.5">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#D9633A]">{l.eyebrow}{l.variantShape === 'collapsed' ? ' · collapsed' : ''}</p>
                  <p className="font-display font-semibold text-[15px] text-ink-900 leading-snug mt-1">{l.h1}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
