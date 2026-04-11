import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import KdpRoyaltyCalculator from './KdpRoyaltyCalculator';
import FAQAccordion from '@/components/FAQAccordion';

const baseUrl = 'https://www.lessoncraftstudio.com';
const pageUrl = `${baseUrl}/en/tools/kdp-royalty-calculator`;

export const revalidate = 86400; // 24h — pricing data is static

export async function generateStaticParams() {
  // English-only for v1.
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Free KDP Royalty Calculator (2026 Rates) | LessonCraftStudio';
  const description =
    'Free Amazon KDP royalty calculator for paperback self-publishers. Calculate printing cost, minimum list price and royalty across all 8 marketplaces using official 2026 rates. No signup.';
  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: pageUrl,
        'x-default': pageUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'What is the minimum page count for a KDP paperback?',
    answer:
      '24 pages for black & white and premium color, and 72 pages for standard color. Below those minimums, KDP will reject your manuscript at upload.',
  },
  {
    question: 'Does bleed affect KDP printing cost?',
    answer:
      'No. KDP charges per finished page, regardless of whether your interior uses bleed. Bleed only affects how you set up the trim size in your PDF — the printing cost itself depends only on page count, ink type, and trim category.',
  },
  {
    question: 'What is the difference between standard color and premium color?',
    answer:
      'Premium color uses higher-quality paper and inks for richer reproduction (great for illustrated books, art books, photo books). Standard color is cheaper per page and is intended for books where color is a nice-to-have rather than the main draw — like worksheets, journals, or activity books with light color accents.',
  },
  {
    question: 'How do I calculate royalties for expanded distribution?',
    answer:
      'Expanded distribution always pays a flat 40% royalty rate, regardless of list price. The formula is the same: (0.40 × list price) − printing cost. Note that you must price your book higher under expanded distribution to make the same per-sale profit you would on Amazon.',
  },
  {
    question: 'When did the 50% / 60% royalty tiers start?',
    answer:
      'KDP introduced the two-tier paperback royalty structure in June 2025. Books priced at or above the 60% threshold for their marketplace earn 60% — below that threshold, you earn 50%. This calculator uses the current April 2026 thresholds.',
  },
  {
    question: 'Does cover finish (matte vs. glossy) affect cost?',
    answer:
      'No. KDP charges the same printing cost regardless of whether you choose matte or glossy cover finish. Pick whichever fits your book\u2019s aesthetic — matte tends to feel more premium for journals and adult colouring books, glossy pops more on children\u2019s books.',
  },
  {
    question: 'Why does my B&W book under 110 pages have no per-page charge?',
    answer:
      'KDP uses a two-tier cost structure for black & white paperbacks. From 24 to 108 pages you pay only a flat fixed cost — the per-page charge only kicks in from 110 pages and up. This calculator handles both tiers automatically.',
  },
  {
    question: 'Are these rates accurate for hardcover?',
    answer:
      'No — these rates are for paperback only. Hardcover has its own (significantly higher) cost structure. We may add hardcover support to this calculator in a future update.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',  item: `${baseUrl}/en` },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: `${baseUrl}/en/tools` },
    { '@type': 'ListItem', position: 3, name: 'KDP Royalty Calculator', item: pageUrl },
  ],
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'KDP Royalty Calculator',
  url: pageUrl,
  description:
    'Free Amazon KDP royalty calculator. Calculate printing cost, minimum list price, and royalty per sale for paperback books across all 8 KDP marketplaces using official 2026 rates.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any (web)',
  inLanguage: 'en',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: {
    '@type': 'Organization',
    name: 'LessonCraftStudio',
    url: baseUrl,
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function KdpRoyaltyCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex items-center gap-1.5 text-slate-500">
            <li>
              <Link href="/en" className="hover:text-primary">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/en/tools" className="hover:text-primary">Tools</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-medium" aria-current="page">
              KDP Royalty Calculator
            </li>
          </ol>
        </nav>

        {/* Calculator */}
        <KdpRoyaltyCalculator />

        {/* CTA banner */}
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary-700 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Publishing on KDP?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl">
                Create professional printable interiors for activity books, worksheet collections,
                puzzle books, and journals in minutes with our 33 worksheet generator apps.
                Free trial with watermark — no signup required.
              </p>
            </div>
            <Link
              href="/en/apps"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-primary font-semibold px-5 py-3 shadow-sm hover:bg-primary-50 transition whitespace-nowrap"
            >
              Browse worksheet generators →
            </Link>
          </div>
        </section>

        {/* SEO content */}
        <article className="prose prose-slate max-w-none mt-12 prose-headings:font-display prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-10 prose-h2:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed">
          <h2>How KDP printing costs are calculated</h2>
          <p>
            Amazon KDP charges paperback printing costs using a simple formula:{' '}
            <strong>fixed cost + (page count × per-page rate)</strong>. The fixed cost and per-page
            rate depend on your ink type (black &amp; white, standard color, premium color), trim
            size category (regular ≤ 6.12&quot; × 9&quot; or large), and marketplace currency.
          </p>
          <p>
            Black &amp; white paperbacks have a special two-tier structure. Books from 24 to 108
            pages pay a flat fixed cost only — there is no per-page charge in that range. From 110
            to 828 pages, B&amp;W switches to fixed + per-page pricing. Premium color uses a similar
            two-tier system (24–40 flat, 42–828 per-page), while standard color is per-page only
            from 72 to 600 pages.
          </p>

          <h2>Understanding KDP royalty rates</h2>
          <p>
            Since June 2025, Amazon KDP pays paperback royalties on a two-tier system. Books priced
            at or above each marketplace&apos;s threshold (for example, $9.99 on Amazon.com or
            £7.99 on Amazon.co.uk) earn a <strong>60% royalty</strong>. Books priced below the
            threshold earn <strong>50%</strong>. Books distributed through Expanded Distribution
            (libraries, bookstores, other online retailers) always earn a flat <strong>40%</strong>{' '}
            regardless of price.
          </p>
          <p>
            Your royalty per sale is calculated as{' '}
            <code className="text-sm bg-slate-100 px-1 py-0.5 rounded">
              (royalty rate × list price) − printing cost
            </code>
            . If the result is negative, KDP will not let you publish at that price — you must
            raise your list price to cover the printing cost first.
          </p>

          <h2>How to price your KDP book for maximum profit</h2>
          <p>
            A healthy paperback should target a <strong>30–40% royalty margin</strong> — that is,
            you keep 30–40 cents of every dollar of cover price. As a rule of thumb, list your book
            at <strong>2.5× to 3× your printing cost</strong>, then nudge upward until the price
            still feels reasonable for your category and competition.
          </p>
          <p>
            The single biggest lever is the 60% royalty threshold. If your minimum list price is
            close to (but just below) the threshold for your marketplace, push it up — the jump
            from 50% to 60% on the same printing cost can mean an extra dollar or more per sale.
            Use the &ldquo;Optimal price finder&rdquo; table above to see exactly where the
            threshold lands for your book.
          </p>

          <h2>Tips for reducing KDP printing costs</h2>
          <ul>
            <li>
              <strong>Use black &amp; white whenever possible.</strong> Even a 200-page B&amp;W
              paperback prints for under $4 in the US — switching to premium color can triple that.
            </li>
            <li>
              <strong>Keep your page count lean.</strong> Trim filler pages, use efficient
              typography, and avoid unnecessary blank pages between chapters. Every two pages
              shaved is a measurable saving on B&amp;W books over 110 pages.
            </li>
            <li>
              <strong>Choose a regular trim size.</strong> Anything wider than 6.12&quot; or taller
              than 9&quot; bumps you into the &ldquo;large&rdquo; trim category, which carries a
              meaningfully higher per-page rate (especially in color).
            </li>
            <li>
              <strong>Stay above the 60% royalty threshold.</strong> Even a small price increase
              that crosses the threshold can yield 20% more royalty per sale.
            </li>
          </ul>

          <h2>Frequently asked questions</h2>
        </article>

        <div className="mt-6">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </main>
  );
}
