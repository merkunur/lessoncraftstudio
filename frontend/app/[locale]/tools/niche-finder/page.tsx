import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NicheFinder from './NicheFinder';
import FAQAccordion from '@/components/FAQAccordion';
import {
  NICHES,
  NICHES_LAST_UPDATED,
  NICHES_LAST_UPDATED_LABEL,
  getStats,
  getTopOpportunities,
} from './niches-database';

const baseUrl = 'https://www.lessoncraftstudio.com';
const pageUrl = `${baseUrl}/en/tools/niche-finder`;
const ogImage = `${baseUrl}/og/niche-finder.png`;

export const revalidate = 86400; // 24h — niche data is hand-curated, rarely changes

export async function generateStaticParams() {
  // English-only for v1.
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Printable Niche Finder 2026 | 50+ Profitable Niches for Etsy, KDP & TPT';
  const description =
    'Discover 50+ hand-curated printable niches with demand & competition ratings for Etsy, Amazon KDP, and TPT sellers. Filter by platform, category, language, and opportunity score. Free tool, updated monthly.';
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
      title: 'Printable Niche Finder — 50+ Profitable Niches for Etsy, KDP & TPT',
      description:
        'Browse 50+ curated printable niches with demand, competition, and opportunity ratings. Filter by platform, category, audience, and 11 languages. Free, no signup.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Printable Niche Finder — 50+ Curated Niches for Etsy, KDP & TPT Sellers by LessonCraftStudio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Printable Niche Finder 2026 | LessonCraftStudio',
      description:
        '50+ hand-curated printable niches with demand & competition analysis. Etsy, KDP, TPT. Filter by category, language, opportunity. Free.',
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/* ----------------------------------------------------------------------------
 * FAQ items — source: docs/seo-addendum-3-niche-finder.md §6
 * -------------------------------------------------------------------------- */

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'How often is this niche database updated?',
    answer:
      'The database is updated monthly with new niche entries, adjusted competition and demand ratings, and seasonal opportunities. Major updates happen before key selling seasons: back-to-school (July), holiday season (September), and New Year (December). The "Last Updated" date is shown at the top of the tool.',
  },
  {
    question: 'How do you determine demand and competition levels?',
    answer:
      'We manually research each niche using a combination of Etsy search results count, Amazon KDP Best Seller Rank data, Google Trends interest over time, and marketplace analysis. Demand is rated 1-5 based on search volume and sales indicators. Competition is rated 1-5 based on the number of existing listings and their quality. The opportunity score combines both: high demand plus low competition equals a high score.',
  },
  {
    question: 'What printables sell best on Etsy?',
    answer:
      'The best-selling printable categories on Etsy include educational worksheets, planners, coloring pages, activity bundles, and party printables. Within educational printables specifically, math worksheets, word search puzzles, and handwriting practice sheets consistently perform well. The key to success is targeting specific sub-niches rather than broad categories — for example, "sight words word search for grade 1" rather than just "word search puzzles".',
  },
  {
    question: 'How much can you earn selling printables on Etsy and KDP?',
    answer:
      'Earnings vary widely depending on niche selection, product quantity, and marketing effort. New sellers typically earn $100-$500 per month in their first year while building reviews and listings. Established sellers with 50+ listings in strong niches commonly earn $1,000-$5,000 per month. Top sellers with large catalogs and effective SEO can earn $10,000+ monthly. The key factors are choosing the right niche, creating quality products, and publishing consistently.',
  },
  {
    question: 'What is the best niche for printable beginners?',
    answer:
      'For beginners, the best niches combine low competition with straightforward product creation. Math worksheets for specific grade levels, word search puzzles in non-English languages, and themed coloring pages are excellent starting points. These products can be created quickly using generator tools, require no design skills, and have proven demand. Start with a specific sub-niche rather than a broad category to stand out from competitors.',
  },
  {
    question: 'Can I sell printables in multiple languages?',
    answer:
      'Yes, and this is one of the biggest untapped opportunities for printable sellers. Most sellers only create products in English, leaving markets like German, French, Spanish, and Scandinavian languages severely underserved. LessonCraftStudio supports 11 languages, allowing you to create the same worksheet in multiple languages and multiply your potential audience with minimal extra effort.',
  },
  {
    question: 'Should I sell printables on Etsy or Amazon KDP?',
    answer:
      'Both platforms work well but serve different use cases. Etsy is ideal for individual digital download printables and bundles priced at $3-$8, with instant delivery and a large buyer base. Amazon KDP is better for compiled books like activity books, puzzle books, and coloring books priced at $8-$15, with print-on-demand fulfillment and passive income potential. Many successful sellers use both platforms — selling individual worksheets on Etsy and compiled books on KDP — to maximize revenue.',
  },
  {
    question: 'Do I need design skills to create printables?',
    answer:
      'No. Tools like LessonCraftStudio\'s 33 printable generators create professional, 300 DPI print-ready PDFs with themed images and automatic answer keys. You choose a theme, customize settings, and download a finished worksheet in under 3 minutes. No graphic design experience or special software is required. The generators handle formatting, layout, and image placement automatically.',
  },
];

/* ----------------------------------------------------------------------------
 * Page component
 * -------------------------------------------------------------------------- */

export default function NicheFinderPage({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  const stats = getStats();
  const topOpportunities = getTopOpportunities(NICHES, 12);

  /* -------- JSON-LD -------- */

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/en` },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${baseUrl}/en/tools` },
      { '@type': 'ListItem', position: 3, name: 'Printable Niche Finder', item: pageUrl },
    ],
  };

  const webApplicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Printable Niche Finder',
    description:
      'Free niche research tool for printable sellers. Browse 50+ curated niches for Etsy, Amazon KDP, and TPT with demand ratings, competition analysis, opportunity scores, and direct links to product generators. Updated monthly.',
    url: pageUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
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

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Profitable Printable Niches for Etsy, KDP & TPT',
    description: '50+ hand-curated printable niches with demand and competition analysis',
    numberOfItems: NICHES.length,
    itemListElement: topOpportunities.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: n.name,
      description: n.description,
    })),
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex items-center gap-1.5 text-slate-500">
            <li>
              <Link href="/en" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/en/tools" className="hover:text-primary">
                Free Tools
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-medium" aria-current="page">
              Printable Niche Finder
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-3">
            Printable Niche Finder — Discover Profitable Niches for Etsy, KDP &amp; TPT
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            {stats.total} hand-curated printable niches with demand and competition analysis for
            Etsy, Amazon KDP, and TPT sellers. Filter by platform, category, language, and
            opportunity score to find profitable niches you haven&apos;t considered yet.
          </p>
        </header>

        {/* Freshness signals row */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 font-semibold">
            <span aria-hidden="true">●</span>
            Updated <time dateTime={NICHES_LAST_UPDATED}>{NICHES_LAST_UPDATED_LABEL}</time>
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200 px-2.5 py-1 font-medium">
            {stats.total} curated niches · {stats.languageCount} languages
          </span>
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary ring-1 ring-primary/20 px-2.5 py-1 font-semibold">
            Free · No signup · No ads
          </span>
        </div>

        {/* Interactive niche finder */}
        <NicheFinder />

        {/* CTA banner */}
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary-700 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Ready to start creating?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl">
                Try all 33{' '}
                <Link href="/en/apps" className="underline font-semibold hover:text-white">
                  printable generators
                </Link>{' '}
                free with watermark. Create math worksheets, word searches, coloring pages, sudoku,
                crosswords and 28 more activity types in minutes. No signup required.
              </p>
            </div>
            <Link
              href="/en/apps"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-primary font-semibold px-5 py-3 shadow-sm hover:bg-primary-50 transition whitespace-nowrap"
            >
              Try free with watermark →
            </Link>
          </div>
        </section>

        {/* SEO content */}
        <article className="prose prose-slate max-w-none mt-12 prose-headings:font-display prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-slate-900 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-primary prose-a:font-medium hover:prose-a:underline">
          <h2>How to Find Profitable Printable Niches</h2>
          <p>
            A profitable printable niche is a single, specific sub-category where active buyers
            outnumber quality sellers. Generic niches like &ldquo;coloring books&rdquo; or
            &ldquo;math worksheets&rdquo; are saturated — Etsy and Amazon KDP already have tens of
            thousands of listings, and new sellers rarely break through without a significant
            marketing budget. Specific sub-niches like{' '}
            <em>&ldquo;German word search puzzles for kids&rdquo;</em>,{' '}
            <em>&ldquo;bold and easy cottagecore coloring books for seniors&rdquo;</em>, or{' '}
            <em>&ldquo;sight words word search for grade 1&rdquo;</em> have far less competition
            and much higher buyer intent because searchers who type those queries already know
            what they want. This tool curates 50 of those specific sub-niches so you can skip the
            research phase and move straight to creating products.
          </p>

          <h3>The Demand vs Competition Framework</h3>
          <p>
            Every niche can be plotted on two axes: demand (how many people want it) and
            competition (how many sellers already serve it). A profitable niche has{' '}
            <strong>high demand and low competition</strong>. To estimate both, we count Etsy
            search results for the exact phrase, check Amazon KDP Best Seller Rank for the top 10
            books in the category, pull Google Trends data for the main keyword, and scan TPT for
            teacher-targeted versions. The tool above does all that research for you — our demand
            and competition scores are manually assigned based on that combined data, not
            auto-generated.
          </p>

          <h3>Using Opportunity Score to Prioritize</h3>
          <p>
            Demand and competition combine into a single <strong>opportunity score</strong>{' '}
            between 1 and 5. A score of 5 means high demand and very low competition — a rare
            goldmine. A score of 4 is a strong niche with some competition but clear headroom.
            Scores of 3 or below are either crowded or niche-small, and while they can still
            work, you need a distinct edge (brand, audience, format) to break through. Filter the
            tool above by the &ldquo;🔥 Hot Opportunities&rdquo; quick filter to see every niche
            scoring 4 or 5. For bundle-building strategy and per-niche pricing guidance, our{' '}
            <Link href="/en/guides/niche-selection-printables">
              Niche Selection Guide for Printable Businesses
            </Link>{' '}
            walks through the full framework.
          </p>

          <h2>Best Platforms for Selling Printables</h2>
          <p>
            The four platforms printable sellers rely on each serve different use cases. Your
            chosen niche should inform where you list — the same product priced correctly on the
            right platform can earn 5x what it would on the wrong one. Below is a quick
            comparison; for deeper analysis see{' '}
            <Link href="/en/guides/kdp-vs-etsy-printables">
              Amazon KDP vs Etsy: Where to Sell Printables
            </Link>
            .
          </p>

          <h3>Etsy — Digital Downloads &amp; Instant Sales</h3>
          <p>
            Etsy is ideal for individual digital downloads and small bundles priced at $3-$8.
            Buyers get instant access, the buyer base is enormous, and teachers, parents, and
            hobbyists are all represented. Fees are roughly 6.5% + $0.20 per sale. The trade-off:
            listings expire every four months and you have to renew them, and search visibility
            depends heavily on keyword-rich titles and tags. For Etsy-specific optimization, see{' '}
            <Link href="/en/guides/etsy-seo-educational-printables">
              Etsy SEO for Educational Printables
            </Link>
            .
          </p>

          <h3>Amazon KDP — Printed Books &amp; Passive Income</h3>
          <p>
            KDP is the home for compiled activity books, puzzle books, and coloring books priced
            at $8-$15 for a 100+ page paperback. Print-on-demand fulfillment means zero inventory
            and zero shipping work on your end — Amazon handles all of that. You earn a 60%
            royalty on books priced at $9.99 or above (50% below that threshold), minus the per-
            book printing cost. Before publishing, plug your page count and price into our{' '}
            <Link href="/en/tools/kdp-royalty-calculator">KDP Royalty Calculator</Link> to verify
            margins, and use the{' '}
            <Link href="/en/tools/kdp-size-calculator">KDP Cover Size Calculator</Link> for exact
            spine width and cover dimensions.
          </p>

          <h3>Teachers Pay Teachers — Premium Pricing for Educators</h3>
          <p>
            TPT caters specifically to classroom teachers, who pay premium prices ($4-$12 for a
            single worksheet pack) because their buyer mindset is &ldquo;this saves me hours of
            lesson planning&rdquo;, not &ldquo;this is a cute printable for my kid&rdquo;. Back-
            to-school (August-September) and January (new semester) are the strongest buying
            windows. For guidance on platform pricing strategy, see{' '}
            <Link href="/en/guides/pricing-educational-printables">
              Pricing Strategies for Educational Printables
            </Link>
            . Gumroad and Creative Fabrica are strong alternatives for direct-to-customer sales
            and subscription-based marketplaces respectively.
          </p>

          <h2>Why Non-English Printables Are a Huge Opportunity</h2>
          <p>
            The single biggest untapped opportunity for printable sellers is multilingual
            content. Over 90% of printable sellers only create in English, even though German,
            French, Spanish, Portuguese, Italian, Dutch, and the Nordic languages (Swedish,
            Danish, Norwegian, Finnish) all have active buyer markets with almost no native-
            language sellers serving them. A word search puzzle in Finnish on Etsy faces a
            fraction of the competition an English word search faces on the same marketplace —
            and the Finnish parent searching for it is much more likely to buy because there is
            so little alternative content available.{' '}
            <Link href="/en/apps">LessonCraftStudio</Link> natively supports 11 languages across
            every generator, which means you can create the same worksheet in German, French,
            Spanish, and Swedish by changing a single dropdown and re-exporting. No translation
            budget, no re-designing, no extra tools. For a full playbook on multilingual
            expansion, see{' '}
            <Link href="/en/guides/multilingual-printable-business">
              Building a Multilingual Printable Business
            </Link>
            .
          </p>

          <h2>How to Create Printable Bundles That Sell</h2>
          <p>
            Bundling is the fastest way to increase average order value on Etsy and the cleanest
            way to hit KDP page counts that clear the 60% royalty threshold. The strategy is
            simple: take 5-10 related worksheets (all math-themed, all Halloween-themed, all one
            animal family), package them into a single download or compiled book, and price the
            bundle at 2-3x the single-worksheet price. Parents, teachers, and KDP book buyers all
            perceive &ldquo;more is more&rdquo; as long as the bundle has a clear unifying theme —
            a random grab-bag does not convert. Seasonal bundles (back-to-school, Christmas,
            summer, Valentine&apos;s) concentrate demand into 4-week spikes, while evergreen
            bundles earn steadily year-round. With LessonCraftStudio&apos;s 33 generators, creating
            a themed 10-worksheet bundle takes minutes rather than hours. For bundle assembly
            tactics and pricing walkthroughs, see{' '}
            <Link href="/en/guides/create-etsy-worksheet-bundles">
              How to Create Etsy Worksheet Bundles
            </Link>
            .
          </p>

          <h2>Frequently Asked Questions About Printable Niches</h2>
        </article>

        <div className="mt-6">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>

        {/* Related Tools section */}
        <section aria-labelledby="related-tools-heading" className="mt-14">
          <h2
            id="related-tools-heading"
            className="text-2xl font-bold font-display text-slate-900 mb-1"
          >
            Related Tools
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            More free resources for printable sellers and KDP self-publishers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/en/tools/kdp-royalty-calculator"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                🧮
              </div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">
                KDP Royalty Calculator
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Calculate printing costs, royalties, and the minimum list price for your KDP
                paperback.
              </p>
            </Link>
            <Link
              href="/en/tools/kdp-size-calculator"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                📐
              </div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">
                KDP Cover Size Calculator
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Get exact cover dimensions, spine width, bleed and margins for any trim size and
                page count.
              </p>
            </Link>
            <Link
              href="/en/tools"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                🔧
              </div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">
                All Free Tools
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Browse every free tool and worksheet generator for printable sellers.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
