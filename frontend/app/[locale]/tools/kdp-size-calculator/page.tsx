import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import KdpSizeCalculator from './KdpSizeCalculator';
import FAQAccordion from '@/components/FAQAccordion';

const baseUrl = 'https://www.lessoncraftstudio.com';
const pageUrl = `${baseUrl}/en/tools/kdp-size-calculator`;
const ogImage = `${baseUrl}/og/kdp-size-calculator.png`;

export const revalidate = 86400; // 24h — KDP specifications are static

export async function generateStaticParams() {
  // English-only for v1.
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Free KDP Cover Size Calculator 2026 | Spine Width, Trim Size & Bleed Tool';
  const description =
    'Calculate exact Amazon KDP cover dimensions, spine width, interior page size, margins, and bleed settings. All 16 paperback + 5 hardcover trim sizes. Free tool with official formulas — no signup required.';
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
      title: 'Free KDP Cover Size Calculator — Spine Width, Dimensions & Bleed',
      description:
        'Instantly calculate your Amazon KDP cover dimensions, spine width, interior margins, and bleed. Interactive diagram included. All trim sizes, all paper types. Free, no signup.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'KDP Cover Size Calculator showing spine width, bleed zones, and full cover dimensions — Free Tool by LessonCraftStudio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free KDP Cover Size Calculator 2026 | LessonCraftStudio',
      description:
        'Calculate KDP spine width, full cover dimensions, interior page size & margins. Interactive visual diagram. All trim sizes. Free, instant.',
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/* ----------------------------------------------------------------------------
 * FAQ items — each question is a long-tail keyword phrased as a question.
 * Source: docs/seo-addendum-2-kdp-size-calculator.md §6
 * -------------------------------------------------------------------------- */

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'How do I calculate spine width for my KDP book?',
    answer:
      'Multiply your page count by the paper thickness multiplier. For white paper: pages × 0.002252 inches. For cream paper: pages × 0.0025 inches. For premium color: pages × 0.002347 inches. For standard color: pages × 0.002252 inches. For example, a 200-page book on white paper has a spine width of 200 × 0.002252 = 0.450 inches.',
  },
  {
    question: 'What is the minimum page count for spine text on KDP?',
    answer:
      'Your book must have at least 79 pages to include text on the spine. If your manuscript is under 79 pages and your cover includes spine text, KDP will reject the cover. Keep spine text at least 0.0625 inches (1.6 mm) from each edge of the spine to prevent it from wrapping onto the front or back cover.',
  },
  {
    question: 'What are the full cover dimensions for a KDP 6x9 paperback?',
    answer:
      'For a 6" × 9" paperback, the full cover height is always 9.25 inches (trim height + 0.25 inches bleed). The full cover width depends on your spine width: 0.125 (bleed) + 6 (back cover) + spine width + 6 (front cover) + 0.125 (bleed). For a 200-page book on white paper with a 0.450-inch spine, the full cover is 12.700 × 9.250 inches.',
  },
  {
    question: 'Does bleed affect KDP printing cost?',
    answer:
      'No. Bleed settings do not affect printing cost. Printing cost depends only on page count, ink type (B&W, standard color, or premium color), trim size category (regular vs large), and the Amazon marketplace. Cover finish (matte or glossy) also does not affect cost.',
  },
  {
    question: 'What is the difference between white and cream paper spine width?',
    answer:
      'Cream paper is thicker than white paper, producing a wider spine. White paper uses 0.002252 inches per page while cream uses 0.0025 inches per page. For a 200-page book, white paper gives a 0.450-inch spine while cream gives a 0.500-inch spine — a difference of 0.050 inches. This matters for cover design: your cover file dimensions change with paper type.',
  },
  {
    question: 'What resolution should my KDP cover be?',
    answer:
      'KDP requires a minimum resolution of 300 DPI (dots per inch) for print covers. To calculate your cover size in pixels, multiply the inch dimensions by 300. For example, a full cover that is 12.700 × 9.250 inches should be 3810 × 2775 pixels. Our calculator shows pixel dimensions automatically.',
  },
  {
    question: 'What are KDP interior margin requirements?',
    answer:
      'KDP requires minimum inside (gutter) margins that increase with page count: 0.375 inches for 24–150 pages, 0.500 inches for 151–300 pages, 0.625 inches for 301–500 pages, 0.750 inches for 501–700 pages, and 0.875 inches for 701–828 pages. Outside margins must be at least 0.25 inches without bleed or 0.375 inches with bleed.',
  },
  {
    question: 'Do I need to include a barcode on my KDP cover?',
    answer:
      "No. If you don't include a barcode, KDP automatically places one on the lower-right area of your back cover. If you prefer to place your own, leave a clear area of at least 2 × 1.2 inches in the lower-right corner of the back cover with a white or light solid background so scanners can read it.",
  },
  {
    question: 'What is the best trim size for activity books and workbooks on KDP?',
    answer:
      'The most popular trim size for activity books, workbooks, and coloring books on Amazon KDP is 8.5" × 11" (US Letter). For international markets, 8.27" × 11.69" (A4) is the equivalent. Both are classified as large trim sizes, which have slightly higher per-page printing costs than regular sizes like 6" × 9".',
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
    { '@type': 'ListItem', position: 3, name: 'KDP Cover Size Calculator', item: pageUrl },
  ],
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'KDP Cover & Interior Size Calculator',
  description:
    'Free Amazon KDP cover size calculator. Calculate spine width, full cover dimensions, interior page size, bleed, and margins for all paperback and hardcover trim sizes. Interactive visual diagram with official 2026 formulas.',
  url: pageUrl,
  applicationCategory: 'DesignApplication',
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

export default function KdpSizeCalculatorPage({
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
              KDP Cover Size Calculator
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
            Official Amazon KDP specifications (2026)
          </span>
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary ring-1 ring-primary/20 px-2.5 py-1 font-semibold">
            No signup · Paperback + Hardcover
          </span>
        </div>

        {/* Calculator */}
        <KdpSizeCalculator />

        {/* CTA banner */}
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary-700 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Publishing an activity book on KDP?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl">
                Create professional activity book interiors in minutes with our{' '}
                <Link href="/en/apps" className="underline font-semibold hover:text-white">
                  printable generators
                </Link>
                . Math worksheets, word searches, coloring pages, puzzles — free trial with
                watermark, no signup required.
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
          <h2>How to Calculate KDP Spine Width</h2>
          <p>
            Every KDP spine width follows a single formula:{' '}
            <strong>spine width = page count × paper multiplier</strong>. The multiplier depends
            on your ink type and, for black &amp; white interiors, your paper color. A 200-page
            paperback on white paper has a spine width of 200 × 0.002252 = 0.450 inches; the same
            book on cream paper has a spine of 200 × 0.0025 = 0.500 inches. Cream paper is thicker
            per sheet, which is why it produces a noticeably wider spine for identical page counts.
          </p>

          <h3>Spine Width Formulas by Paper Type</h3>
          <p>
            KDP publishes four official multipliers for paperback spines: black &amp; white on
            white paper uses <strong>0.002252 inches</strong> per page, black &amp; white on cream
            paper uses <strong>0.0025 inches</strong> per page, premium color uses{' '}
            <strong>0.002347 inches</strong> per page (always white paper), and standard color
            uses <strong>0.002252 inches</strong> per page (also always white paper). Hardcover
            interiors use the same per-page multipliers, but the full hardcover wrap adds extra
            flap allowances — use KDP&apos;s official cover template generator for the final
            hardcover file.
          </p>

          <h3>Minimum Pages for Spine Text</h3>
          <p>
            You can only include text on the spine if your book has{' '}
            <strong>79 pages or more</strong>. Under that threshold the spine is too narrow for
            readable type and KDP will reject covers with spine text. When you do include spine
            text, keep it at least 0.0625 inches (1.6 mm) from each edge of the spine to prevent
            it from wrapping onto the front or back cover during binding.
          </p>

          <h2>KDP Cover Dimensions Explained</h2>
          <p>
            Your full KDP cover file is a single flat image that wraps from back, across the
            spine, to the front. The formula is:{' '}
            <code>
              full cover width = bleed + back cover + spine + front cover + bleed
            </code>{' '}
            and{' '}
            <code>full cover height = bleed + trim height + bleed</code>. Cover bleed is always
            0.125 inches (3.2 mm) on every outside edge — this is mandatory for covers regardless
            of whether you use interior bleed. That means the full cover is always 0.25 inches
            taller than the trim height, plus an extra 0.25 inches wide beyond the two trim widths
            and the spine combined.
          </p>

          <h3>Full Cover Width Formula</h3>
          <p>
            For a 6" × 9" paperback with 120 pages on white paper, the spine is
            120 × 0.002252 = 0.270 inches, so the full cover is 0.125 + 6 + 0.270 + 6 + 0.125 =
            <strong> 12.520 inches wide</strong> and 9.25 inches tall. Change any of those inputs —
            trim size, page count, or paper — and the full cover width shifts accordingly. The
            calculator above updates the proportional diagram in real time so you can see exactly
            how the spine grows or shrinks.
          </p>

          <h3>Understanding Cover Bleed</h3>
          <p>
            Cover bleed is the small buffer that gets trimmed away when the book is cut down to
            its final size. KDP requires 0.125 inches of bleed on all four outside edges of the
            cover so there are no white slivers if the cut is slightly off. Bleed on the inside
            (spine-facing) edge is <em>not</em> required — the spine boundary is a design line, not
            a cut line. The front cover and back cover remain 6" × 9" (or whatever your trim is);
            only the outer edges expand into the bleed zone.
          </p>

          <h2>KDP Bleed Settings for Interior Pages</h2>
          <p>
            Interior bleed is optional. If any page in your manuscript has images, background
            color, or illustrations that touch the edge of the page, you must enable bleed for the
            entire interior file — you cannot use bleed on just a few pages. When bleed is enabled,
            the page size grows by 0.125 inches on the outside edge (width) and 0.125 inches on
            both the top and bottom (+0.25 inches to height total). The inside / gutter edge has no
            bleed because it disappears into the binding.
          </p>

          <h3>When to Use Bleed</h3>
          <p>
            Use bleed for coloring books, photo books, workbooks with colored page frames, and any
            book where artwork runs to the edge. Skip bleed for standard novels, text-only
            non-fiction, and most workbooks where content sits inside a safe margin. Enabling
            bleed does not affect printing cost — only page count, ink type, and trim size do.
          </p>

          <h3>Page Size with and without Bleed</h3>
          <p>
            For a 6" × 9" book without bleed, your interior PDF pages should be exactly 6" × 9".
            With bleed, the same book needs pages of 6.125" × 9.250" — an extra 0.125 inches on
            the outside edge and 0.125 inches each on the top and bottom. The trim box (the final
            printed page) still sits at 6" × 9"; the bleed is the safety margin that gets cropped
            away.
          </p>

          <h2>KDP Interior Margin Requirements</h2>
          <p>
            KDP enforces minimum interior margins to keep text and images away from the binding
            and the trim edge. Margins are split into two categories: the <strong>gutter</strong>{' '}
            (the inside edge that gets bound) and the <strong>outside margins</strong> (top,
            bottom, and outer edge). Gutter requirements scale with page count because thicker
            books need more room for the binding curve.
          </p>

          <h3>Gutter Margins by Page Count</h3>
          <p>
            For 24–150 pages, the minimum gutter is <strong>0.375 inches</strong>. For 151–300
            pages it&apos;s <strong>0.500 inches</strong>. For 301–500 pages it&apos;s{' '}
            <strong>0.625 inches</strong>. For 501–700 pages it&apos;s <strong>0.750 inches</strong>.
            For 701–828 pages it&apos;s <strong>0.875 inches</strong>. Content that crosses these
            minimums risks being swallowed by the binding when the book is opened.
          </p>

          <h3>Outside Margin Minimums</h3>
          <p>
            Outside margins must be at least 0.25 inches without bleed or 0.375 inches with bleed.
            The extra 0.125 inches when bleed is enabled accounts for the cut tolerance — content
            that is too close to the trim edge can end up on the wrong side of the blade. These
            are minimums; larger margins are fine and are often more readable for dense text.
          </p>

          <h2>Choosing the Right KDP Trim Size</h2>
          <p>
            Your trim size is one of the first decisions you make when publishing on KDP and it
            shapes everything downstream: cover dimensions, interior layout, printing cost, and
            the category shelves Amazon slots your book onto. For most novels, trade paperbacks,
            and general non-fiction, <strong>6" × 9"</strong> is the default and the most common
            size on Amazon. For smaller fiction and digest-format non-fiction,{' '}
            <strong>5.5" × 8.5"</strong> is the standard. For activity books, workbooks, and
            coloring books, <strong>8.5" × 11"</strong> (US Letter) is the dominant choice in the
            US, with <strong>8.27" × 11.69"</strong> (A4) as its international counterpart.
          </p>

          <h3>Regular vs Large Trim Sizes</h3>
          <p>
            KDP classifies a trim as <strong>large</strong> when the width is greater than 6.12
            inches <em>or</em> the height is greater than 9 inches; everything else is{' '}
            <strong>regular</strong>. Large trims pay slightly higher per-page printing rates —
            you can model the exact cost in our{' '}
            <Link href="/en/tools/kdp-royalty-calculator">KDP Royalty Calculator</Link> — but they
            have no effect on spine width or margin requirements.
          </p>

          <h3>Best Trim Sizes for Activity Books and Workbooks</h3>
          <p>
            For activity book sellers on Amazon KDP, 8.5" × 11" is nearly always the right answer
            for the US market and 8.27" × 11.69" (A4) for international. Both give you enough
            canvas for worksheets, puzzles, and illustrations without forcing solvers to squint or
            flip the book sideways. Once you&apos;ve locked in your trim size, you can create the
            interior pages in minutes with our{' '}
            <Link href="/en/apps">printable worksheet generators</Link> — 33 apps covering math,
            puzzles, coloring, and more.
          </p>

          <p className="text-xs text-slate-500 mt-8">
            All specifications on this page are sourced from the{' '}
            <a
              href="https://kdp.amazon.com/en_US/help/topic/G201953020"
              target="_blank"
              rel="nofollow noopener"
              className="text-slate-600 underline"
            >
              official KDP cover creation guide
            </a>{' '}
            and{' '}
            <a
              href="https://kdp.amazon.com/en_US/help/topic/GVBQ3CMEQW3W2VL6"
              target="_blank"
              rel="nofollow noopener"
              className="text-slate-600 underline"
            >
              KDP&apos;s trim size and bleed specifications
            </a>
            . For hardcover wrap templates specifically, use{' '}
            <a
              href="https://kdp.amazon.com/cover-calculator"
              target="_blank"
              rel="nofollow noopener"
              className="text-slate-600 underline"
            >
              KDP&apos;s official Cover Calculator
            </a>{' '}
            inside your KDP account.
          </p>

          <h2>Frequently Asked Questions About KDP Cover Dimensions</h2>
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
              href="/en/tools/kdp-royalty-calculator"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🧮</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">KDP Royalty Calculator</div>
              <p className="text-sm text-slate-500 mt-1">
                Calculate printing costs, royalties, and find the optimal price for your book.
              </p>
            </Link>
            <Link
              href="/en/tools"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🔧</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">All Free Tools</div>
              <p className="text-sm text-slate-500 mt-1">
                Browse all free worksheet generators and calculators for printable sellers.
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
