import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import KdpRoyaltyCalculator from './KdpRoyaltyCalculator';
import FAQAccordion from '@/components/FAQAccordion';

const baseUrl = 'https://www.lessoncraftstudio.com';
const pageUrl = `${baseUrl}/en/tools/kdp-royalty-calculator`;
const ogImage = `${baseUrl}/og/kdp-royalty-calculator.png`;

export const revalidate = 86400; // 24h — pricing data is static

export async function generateStaticParams() {
  // English-only for v1.
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Free KDP Royalty Calculator 2026 | Amazon Printing Cost & Profit Tool';
  const description =
    'Calculate your Amazon KDP printing costs, royalties, and profit per sale instantly. Supports all 8 marketplaces, B&W and color ink, 50%/60% royalty tiers. Free tool with official 2026 rates — no signup required.';
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
      title: 'Free KDP Royalty Calculator — Amazon Printing Cost & Profit Tool',
      description:
        'Instantly calculate your Amazon KDP paperback printing costs, royalties, and minimum list price. All 8 marketplaces, B&W & color, 2026 rates. No signup.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'KDP Royalty Calculator — Free Tool by LessonCraftStudio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free KDP Royalty Calculator 2026 | LessonCraftStudio',
      description:
        'Calculate Amazon KDP printing costs & royalties for paperbacks across all marketplaces. Free, instant, no signup.',
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/* ----------------------------------------------------------------------------
 * FAQ items — each question is a long-tail keyword phrased as a question.
 * Source: docs/seo-addendum-1-kdp-royalty-calculator.md §6
 * -------------------------------------------------------------------------- */

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'How much does it cost to print a book on Amazon KDP?',
    answer:
      'Amazon KDP printing costs depend on page count, ink type, and marketplace. For a black & white paperback in the US, the cost is $2.30 flat for 24-108 pages, or $1.00 fixed plus $0.012 per page for 110+ pages. A 200-page B&W book costs $3.40 to print. Premium color costs $1.00 fixed plus $0.065 per page. Costs are deducted from your royalty — you never pay upfront.',
  },
  {
    question: 'What is the KDP royalty rate for paperbacks?',
    answer:
      'Since June 2025, Amazon KDP uses tiered paperback royalty rates: 60% for books priced at $9.99 USD or above (or equivalent in other currencies), and 50% for books priced below that threshold. Expanded distribution always pays 40%. Your royalty is calculated as (royalty rate × list price) minus printing cost.',
  },
  {
    question: 'What is the difference between 50% and 60% KDP royalty?',
    answer:
      'The 60% royalty rate applies to paperbacks priced at $9.99 USD or above on Amazon.com (thresholds vary by marketplace: £7.99 GBP, €9.99 EUR, ¥1000 JPY, etc.). Books priced below these thresholds earn a 50% royalty. This means pricing your book just above the threshold can significantly increase your per-sale earnings.',
  },
  {
    question: 'How do I calculate the minimum list price for my KDP book?',
    answer:
      'The minimum list price ensures your royalty covers the printing cost. It is calculated as: printing cost \u00f7 royalty rate. For example, if your printing cost is $4.60 and you want the 60% rate, your minimum is $4.60 \u00f7 0.60 = $7.67. KDP will not allow you to set a price below this minimum.',
  },
  {
    question: 'Does bleed affect KDP printing cost?',
    answer:
      'No. Bleed settings and cover finish (matte or glossy) do not affect printing cost. Printing cost depends only on page count, ink type (B&W, standard color, or premium color), trim size category (regular vs large), and the Amazon marketplace where the book is sold.',
  },
  {
    question: 'What is the difference between standard and premium color on KDP?',
    answer:
      'Standard color uses lighter-weight white paper and costs $0.0255 per page (US), while premium color uses heavier paper with better color reproduction and costs $0.065 per page. Premium color is available in all marketplaces; standard color is not available on Amazon.co.jp or Amazon.com.au. Standard color also requires a minimum of 72 pages.',
  },
  {
    question: 'Are KDP printing costs different in other countries?',
    answer:
      'Yes, printing costs vary by Amazon marketplace. For example, a B&W book with 110+ pages costs $1.00 + $0.012/page in the US, £0.85 + £0.010/page in the UK, and €0.75 + €0.012/page in the EU. Our calculator supports all 8 marketplace regions including USD, GBP, EUR, CAD, AUD, JPY, PLN, and SEK.',
  },
  {
    question: 'What is break-even ACOS for KDP books?',
    answer:
      'Break-even ACOS (Advertising Cost of Sale) is the maximum percentage of your list price you can spend on Amazon Ads while still making a profit. It equals your royalty divided by your list price, expressed as a percentage. For example, if your royalty is $4.40 on a $15.00 book, your break-even ACOS is 29.3%. Keep your ad ACOS below this number to remain profitable.',
  },
];

/* ----------------------------------------------------------------------------
 * Structured data
 * -------------------------------------------------------------------------- */

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/en` },
    { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${baseUrl}/en/tools` },
    { '@type': 'ListItem', position: 3, name: 'KDP Royalty Calculator', item: pageUrl },
  ],
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'KDP Royalty Calculator',
  description:
    'Free Amazon KDP printing cost and royalty calculator. Calculate paperback profits across all 8 Amazon marketplaces with official 2026 rates.',
  url: pageUrl,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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

/* ----------------------------------------------------------------------------
 * Page
 * -------------------------------------------------------------------------- */

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
              <Link href="/en/tools" className="hover:text-primary">Free Tools</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-700 font-medium" aria-current="page">
              KDP Royalty Calculator
            </li>
          </ol>
        </nav>

        {/* Freshness signals row */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 font-semibold">
            <span aria-hidden="true">●</span>
            Updated <time dateTime="2026-04-11">April 2026</time>
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200 px-2.5 py-1 font-medium">
            Official Amazon KDP rates (June 2025 tier system)
          </span>
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary ring-1 ring-primary/20 px-2.5 py-1 font-semibold">
            No signup · All 8 marketplaces
          </span>
        </div>

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
                Create professional activity book interiors in minutes with our{' '}
                <Link href="/en/apps" className="underline font-semibold hover:text-white">
                  printable generators
                </Link>
                . Worksheet collections, puzzle books, journals, coloring pages — free trial with watermark, no signup required.
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
        <article className="prose prose-slate max-w-none mt-12 prose-headings:font-display prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-slate-900 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-primary prose-a:font-medium hover:prose-a:underline">
          <h2>How KDP Printing Costs Are Calculated</h2>
          <p>
            Every Amazon KDP printing cost follows the same simple formula:{' '}
            <strong>fixed cost + (page count × per-page rate) = printing cost</strong>. The fixed
            cost and per-page rate depend on three things: ink type (black &amp; white, standard
            color, or premium color), trim size category (regular ≤ 6.12&quot; × 9&quot; or large),
            and the Amazon marketplace where your book is sold. Bleed settings and cover finish
            (matte or glossy) do <em>not</em> affect printing cost — only the variables above.
          </p>

          <h3>Black &amp; White Printing Costs</h3>
          <p>
            Black &amp; white paperbacks use a two-tier cost structure. Books from{' '}
            <strong>24 to 108 pages</strong> pay only a flat fixed cost ($2.30 in the US for
            regular trim) — there is no per-page charge in that range. Once you cross{' '}
            <strong>110 pages</strong>, B&amp;W switches to fixed + per-page pricing ($1.00 fixed
            plus $0.012 per page in the US). This means a 108-page B&amp;W book costs the same
            $2.30 to print as a 24-page book, but a 110-page book jumps to $2.32 — and from there,
            the kdp printing cost per page accumulates linearly.
          </p>

          <h3>Color Printing Costs (Standard vs Premium)</h3>
          <p>
            Premium color paperbacks ($1.00 + $0.065/page in the US) use heavier paper with
            better color reproduction and are available in all 8 marketplaces. Standard color
            paperbacks ($1.00 + $0.0255/page in the US) use lighter paper at roughly 40% the
            per-page rate of premium — but standard color is <strong>not</strong> offered on
            Amazon.co.jp or Amazon.com.au, and requires a minimum of 72 pages.
          </p>

          <h3>The Two-Tier Page Count System</h3>
          <p>
            The amazon kdp printing cost varies by tier: B&amp;W flat tier covers 24–108 pages,
            B&amp;W per-page tier covers 110–828 pages, premium color flat tier covers 24–40
            pages, and premium color per-page tier covers 42–828 pages. Standard color is
            per-page only, from 72–600 pages. The calculator above handles all of these
            automatically — you just enter your page count and it picks the right tier.
          </p>

          <h2>Understanding KDP Royalty Rates in 2026</h2>
          <p>
            Amazon KDP introduced the tiered paperback royalty system in <strong>June 2025</strong>,
            replacing the old flat 60% rate for all paperback books. Today there are three
            possible rates: 60% (the new default for most viable price points), 50% (for books
            priced below the threshold), and 40% (for expanded distribution outside Amazon).
            Your royalty is calculated as{' '}
            <code>(royalty rate × list price) − printing cost</code>. If the result is negative,
            KDP will reject your price.
          </p>

          <h3>The 50% vs 60% Royalty Threshold</h3>
          <p>
            The 60% kdp royalty rate kicks in at $9.99 USD on Amazon.com, with equivalent
            thresholds for other marketplaces (£7.99 GBP, €9.99 EUR, C$13.99 CAD, A$13.99 AUD,
            ¥1000 JPY, 40 PLN, 99 SEK). Below the threshold you earn 50%. The kdp 50 vs 60 percent
            decision is the single biggest pricing lever for paperback authors: nudging your list
            price from $9.98 to $9.99 instantly raises your royalty rate by 10 percentage points
            on the same printing cost.
          </p>

          <h3>Expanded Distribution Royalties (40%)</h3>
          <p>
            If you opt into KDP&apos;s expanded distribution program — which lists your book in
            libraries, bookstores, and other online retailers beyond Amazon — you earn a flat 40%
            kdp expanded distribution royalty regardless of price. Because the rate is lower,
            you usually need to price expanded-distribution books significantly higher than
            Amazon-only books to make the same per-sale profit. The calculator above lets you
            toggle between Amazon and Expanded to see the royalty difference instantly.
          </p>

          <h2>How to Price Your KDP Book for Maximum Profit</h2>
          <p>
            A healthy paperback should target a <strong>30–40% royalty margin</strong> — meaning
            you keep 30–40 cents of every dollar of cover price after Amazon&apos;s cut and
            printing costs. The kdp profit calculator above shows your margin in real time as
            you adjust the list price. Start by checking the suggested minimum, then experiment
            with prices that feel reasonable for your category and competition.
          </p>

          <h3>The 2.5× to 3× Printing Cost Rule</h3>
          <p>
            As a starting heuristic, list your book at <strong>2.5× to 3× your printing cost</strong>.
            For a $4.60 printing cost, that translates to roughly $11.50 to $13.80. From there,
            adjust upward toward what comparable books in your niche charge — readers rarely
            balk at a 50¢ difference, and a small increase often produces a measurable royalty
            jump. Once you&apos;ve set your interior price, plan your cover layout following our{' '}
            <Link href="/en/guides/kdp-formatting-worksheets">KDP Formatting Guide for Worksheet Books</Link>.
          </p>

          <h3>Why You Should Price Above the 60% Threshold</h3>
          <p>
            The single biggest lever is the 60% royalty threshold. If your minimum list price is
            close to (but just below) the threshold for your marketplace, push it up — the jump
            from 50% to 60% on the same printing cost is typically worth more than the lost
            sales from a slightly higher sticker. Use the &ldquo;Find Your Optimal Book Price&rdquo;
            table above to see exactly where the threshold lands. For category-specific pricing
            advice, see{' '}
            <Link href="/en/guides/math-activity-books-kdp">How to Create Math Activity Books for Amazon KDP</Link>{' '}
            and{' '}
            <Link href="/en/guides/best-kdp-activity-book-niches">Best KDP Activity Book Niches</Link>.
          </p>

          <h2>Tips for Reducing Amazon KDP Printing Costs</h2>
          <p>
            The fastest way to reduce kdp printing cost is to use B&amp;W interior unless color
            is essential to your book&apos;s value (coloring books, picture books, photo books).
            Even a 200-page B&amp;W paperback prints for under $4 in the US — switching to
            premium color can triple that. Beyond ink type, keep your page count lean (tighter
            typography, no filler pages), choose a regular trim size (anything wider than 6.12&quot;
            or taller than 9&quot; bumps you into the costlier large trim category), and consider
            standard color over premium when your book sells in marketplaces that support it.
            For more puzzle-book-specific cost optimization, see{' '}
            <Link href="/en/guides/publish-puzzle-books-kdp">How to Publish Puzzle Books on Amazon KDP</Link>.
          </p>

          <h2>KDP vs Other Print-on-Demand Platforms</h2>
          <p>
            KDP isn&apos;t the only way to monetize printable content. Many sellers run a hybrid
            strategy — selling editable PDFs on Etsy and printed editions on KDP — to maximize
            both passive royalties and one-time sales. For a head-to-head comparison, read{' '}
            <Link href="/en/guides/kdp-vs-etsy-printables">Amazon KDP vs Etsy: Where to Sell Printables</Link>.
          </p>

          <p className="text-xs text-slate-500 mt-8">
            All printing cost data on this page is sourced from the{' '}
            <a
              href="https://kdp.amazon.com/en_US/help/topic/G201834340"
              target="_blank"
              rel="nofollow noopener"
              className="text-slate-600 underline"
            >
              official KDP printing cost page
            </a>
            . You can also cross-check using{' '}
            <a
              href="https://kdp.amazon.com/en_US/help/topic/GSQF43YAMUPFTMSP"
              target="_blank"
              rel="nofollow noopener"
              className="text-slate-600 underline"
            >
              KDP&apos;s Printing Cost &amp; Royalty Calculator
            </a>{' '}
            inside your KDP account.
          </p>

          <h2>Frequently Asked Questions About KDP Royalties</h2>
        </article>

        <div className="mt-6">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>

        {/* Related Tools section */}
        <section aria-labelledby="related-tools-heading" className="mt-14">
          <h2 id="related-tools-heading" className="text-2xl font-bold font-display text-slate-900 mb-1">
            Related Tools
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            More free resources for printable sellers and KDP self-publishers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/en/tools"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🔧</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">All Free Tools</div>
              <p className="text-sm text-slate-500 mt-1">
                Browse all 33 free worksheet generators and calculators for printable sellers.
              </p>
            </Link>
            <Link
              href="/en/guides"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">📖</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">How-To Guides</div>
              <p className="text-sm text-slate-500 mt-1">
                Step-by-step guides for KDP publishing, Etsy printables, and worksheet creation.
              </p>
            </Link>
            <Link
              href="/en/apps"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🧩</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">Worksheet Generators</div>
              <p className="text-sm text-slate-500 mt-1">
                Create printable interiors for KDP activity books in minutes — free to try.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
