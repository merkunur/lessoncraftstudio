import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ActivityBookPlanner from './ActivityBookPlanner';
import FAQAccordion from '@/components/FAQAccordion';
import { ACTIVITY_CATALOG } from './activity-catalog';

const baseUrl = 'https://www.lessoncraftstudio.com';
const pageUrl = `${baseUrl}/en/tools/activity-book-planner`;
const ogImage = `${baseUrl}/og/activity-book-planner.png`;

export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Free KDP Activity Book Planner 2026 | Plan Your Book Interior Structure';
  const description =
    'Plan your Amazon KDP activity book, puzzle book, or workbook structure with our free interactive planner. Drag-and-drop sections, auto-calculate page count, printing cost, spine width & royalty. Pre-built templates included.';

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
      title: 'Free KDP Activity Book Planner — Structure Your Book Before You Create',
      description:
        'Drag-and-drop book structure builder for KDP activity books. Auto-calculates page count, spine width, printing cost & royalty. 6 templates, 33 activity types. Free, no signup.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'KDP Activity Book Planner showing drag-and-drop book structure with live page count and printing cost — Free Tool by LessonCraftStudio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free KDP Activity Book Planner 2026 | LessonCraftStudio',
      description:
        'Plan your KDP activity book structure visually. Drag-and-drop sections, live page count, printing cost & royalty. 6 pre-built templates. Free.',
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/* ----------------------------------------------------------------------------
 * FAQ items — long-tail keyword questions, seller voice.
 * -------------------------------------------------------------------------- */

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'What is the best page count for a KDP activity book?',
    answer:
      'The most popular page count for KDP activity books is 80–120 pages. For black & white books, pages 24–108 have a flat printing cost (no per-page charge), making 100 pages the sweet spot — you maximize content without increasing printing costs. Price at $9.99 or above to earn the 60% royalty rate.',
  },
  {
    question: 'How should I structure an activity book for Amazon KDP?',
    answer:
      'Start with front matter: title page, copyright page, table of contents, and a "How to Use This Book" introduction. Then organize content sections by activity type, mixing different activities for variety. End with an answer key section for any puzzles or math activities, and optionally a completion certificate. Total page count must be an even number.',
  },
  {
    question: 'Do I need to include an answer key in my KDP activity book?',
    answer:
      'Yes, for any book containing puzzles (word search, crossword, sudoku) or math worksheets. Buyers and parents expect answer keys, and books without them receive negative reviews. Place answer keys at the back of the book. Estimate roughly 1 answer key page per 2 activity pages.',
  },
  {
    question: 'What trim size should I use for a KDP activity book?',
    answer:
      '8.5 × 11 inches (US Letter) is the most popular trim size for activity books, workbooks, and coloring books on Amazon KDP. For international markets, 8.27 × 11.69 inches (A4) is the equivalent. Both are large trim sizes. For smaller puzzle books aimed at adults, 6 × 9 inches works well.',
  },
  {
    question: 'Should I use color or black and white for my activity book?',
    answer:
      'Black and white is recommended for most activity books. B&W printing costs $2.84 flat for up to 108 pages on large trim, while premium color costs $1.00 + $0.065 per page — a 100-page color book costs $7.50 vs $2.84 for B&W. The cost difference directly impacts your royalty. Use color only for coloring books or picture books where it\'s essential.',
  },
  {
    question: 'Can I mix different types of activities in one KDP book?',
    answer:
      'Yes, and mixed activity books often sell better than single-type books. Combining math worksheets, word puzzles, coloring pages, and visual activities creates a more engaging experience. Adding coloring or drawing pages between challenging sections provides "brain breaks" that buyers appreciate. Use the planner above to build a balanced mix.',
  },
  {
    question: 'How do I create the actual pages for my activity book?',
    answer:
      'After planning your book structure with this tool, use LessonCraftStudio\'s 33 printable generators to create each section. Each generator produces professional, 300 DPI print-ready PDFs with themed images and automatic answer keys. You can try all generators free with a watermark before purchasing.',
  },
  {
    question: 'What is the printing cost for a 100-page activity book on KDP?',
    answer:
      'For a 100-page black & white activity book on 8.5×11 inch (large trim) paper in the US marketplace, the printing cost is a flat $2.84. At a list price of $9.99, your royalty would be ($9.99 × 0.60) − $2.84 = $3.15 per sale. At $14.99, you\'d earn $6.15 per sale. The flat rate applies to all B&W large-trim books with 24–108 pages.',
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
    { '@type': 'ListItem', position: 3, name: 'KDP Activity Book Planner', item: pageUrl },
  ],
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'KDP Activity Book Planner',
  description:
    'Free visual planner for Amazon KDP activity book interiors. Drag-and-drop sections, auto-calculate page count, spine width, printing cost, and royalty.',
  url: pageUrl,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: {
    '@type': 'Organization',
    name: 'LessonCraftStudio',
    url: baseUrl,
  },
  featureList: [
    'Drag-and-drop book outline builder',
    'Live page count and spine width calculator',
    'KDP printing cost and royalty estimator',
    'Answer key auto-estimation',
    'Content balance analyzer',
    '6 pre-built book templates',
    '33 activity types linked to free generators',
    'One-click book plan export',
  ],
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
  name: 'Activity Types Available in the KDP Activity Book Planner',
  itemListElement: ACTIVITY_CATALOG.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${baseUrl}/en/apps/${a.appSlug}`,
    name: a.name,
  })),
};

/* ----------------------------------------------------------------------------
 * Page
 * -------------------------------------------------------------------------- */

export default function ActivityBookPlannerPage({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
              KDP Activity Book Planner
            </li>
          </ol>
        </nav>

        {/* Hero headline */}
        <header className="mb-6 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight">
            KDP Activity Book Planner — Plan Your Book Structure Before You Create
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            The only tool that helps you architect your Amazon KDP activity book <em>before</em> you create a single page. Drag-and-drop sections, auto-calculate page count, spine width, printing cost, and royalty — then launch the generators you need to build every section.
          </p>
        </header>

        {/* Freshness badges */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 font-semibold">
            <span aria-hidden="true">●</span>
            Updated <time dateTime="2026-04-11">April 2026</time>
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200 px-2.5 py-1 font-medium">
            Official Amazon KDP pricing (June 2025 tier system)
          </span>
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary ring-1 ring-primary/20 px-2.5 py-1 font-semibold">
            No signup · 33 activity types · 6 templates
          </span>
        </div>

        {/* The tool */}
        <ActivityBookPlanner />

        {/* CTA banner */}
        <section className="mt-14 rounded-2xl bg-gradient-to-r from-primary to-primary-700 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Ready to build your book interior?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl">
                Use your creation checklist above to launch the exact generators you need. All 33{' '}
                <Link href="/en/apps" className="underline font-semibold hover:text-white">
                  printable worksheet generators
                </Link>{' '}
                are free to try with a watermark — activate a license to remove it for commercial KDP use.
              </p>
            </div>
            <Link
              href="/en/apps"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-primary font-semibold px-5 py-3 shadow-sm hover:bg-primary-50 transition whitespace-nowrap"
            >
              Browse all generators →
            </Link>
          </div>
        </section>

        {/* SEO content */}
        <article className="prose prose-slate max-w-none mt-12 prose-headings:font-display prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-slate-900 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-primary prose-a:font-medium hover:prose-a:underline">
          <h2>How to Structure a KDP Activity Book</h2>
          <p>
            Learning <strong>how to structure an activity book</strong> is the single most important step before you start creating pages. A clear activity book structure keeps buyers engaged, protects your reviews, and prevents the common trap of publishing a 100-page book that feels like one repetitive exercise. The planner above pre-fills the structural pages for you; your job is to decide which activity types fill the middle and in what order.
          </p>

          <h3>Front Matter, Content Sections & Back Matter</h3>
          <p>
            Every successful KDP activity book follows a three-part skeleton. <strong>Front matter</strong> comes first (1–4 pages): a title page, a copyright page with your ISBN placeholder and publisher info, an optional table of contents, and an optional "How to use this book" intro. <strong>Content sections</strong> fill the middle of the book, grouped by activity type and separated by section divider pages when you want clean chapter breaks. <strong>Back matter</strong> closes the book: an answer key section covering any puzzle or math content, and an optional completion certificate — a small detail that buyers repeatedly call out in 5-star reviews. For detailed interior specs, read our{' '}
            <Link href="/en/guides/kdp-formatting-worksheets">KDP Formatting Guide for Worksheet Books</Link> alongside{' '}
            <a
              href="https://kdp.amazon.com/en_US/help/topic/G201834190"
              target="_blank"
              rel="nofollow noopener"
            >
              KDP&apos;s official formatting guidelines
            </a>
            .
          </p>

          <h3>Why Variety Matters in Activity Books</h3>
          <p>
            The single biggest mistake new KDP publishers make is dumping 100 pages of the <em>same</em> activity type into one book. Readers get bored, returns spike, and the 1-star reviews start rolling in. Mix your content: pair math worksheets with coloring breaks, alternate word puzzles with visual logic activities, and always cap the book with an answer key plus reward page. A well-balanced mixed activity book typically splits into roughly 25–35% math, 20–25% word puzzles, 15–20% visual activities, 10–15% creative breaks, and 5–15% logic challenges. The planner&apos;s live content-balance bar surfaces imbalances before you create a single page. For niche-specific guidance, see{' '}
            <Link href="/en/guides/math-activity-books-kdp">How to Create Math Activity Books for Amazon KDP</Link>{' '}
            and{' '}
            <Link href="/en/guides/publish-puzzle-books-kdp">How to Publish Puzzle Books on Amazon KDP</Link>.
          </p>

          <h2>How Many Pages Should Your Activity Book Have?</h2>
          <p>
            The <strong>best page count for a KDP activity book</strong> sits between 80 and 120 pages for the vast majority of niches. Anything under 60 pages feels thin to buyers; anything over 150 starts eroding your royalty through per-page printing costs. Within the 80–120 window, 100 pages is the sweet spot — it hits the maximum perceived value on KDP&apos;s flat-rate printing tier while staying well inside the 60% royalty band at $9.99 and above.
          </p>

          <h3>The 24–108 Page Sweet Spot for B&amp;W Books</h3>
          <p>
            Amazon KDP uses a two-tier printing cost system for black &amp; white paperbacks: books from <strong>24 to 108 pages</strong> pay a flat cost ($2.84 for large-trim sizes like 8.5×11 in the US), and books of 110+ pages switch to a fixed + per-page formula. That means a 108-page B&amp;W activity book costs exactly the same to print as a 24-page book — so filling your book up to 108 pages gives you the maximum perceived value <em>without any extra printing cost</em>. This is why 100 pages is the industry-standard activity book page count: you get full shelf presence, a solid spine, and zero incremental printing cost. Use the{' '}
            <Link href="/en/tools/kdp-royalty-calculator">KDP Royalty Calculator</Link> to run the numbers across all 8 Amazon marketplaces and{' '}
            <a
              href="https://kdp.amazon.com/en_US/help/topic/GVBQ3CMEQW3W2VL6"
              target="_blank"
              rel="nofollow noopener"
            >
              KDP trim size specifications
            </a>{' '}
            to confirm your dimensions.
          </p>

          <h3>Optimal Page Count by Book Type</h3>
          <p>
            Different activity book types have different sweet spots. <strong>Kids&apos; mixed activity books</strong> (ages 5–10): 80–100 pages. <strong>Adult puzzle books</strong> (sudoku, crosswords, word search): 100–120 pages so buyers feel they&apos;re getting serious content value. <strong>Preschool workbooks</strong> (ages 3–5): 60–80 pages to keep the book light and non-overwhelming. <strong>Coloring books</strong>: 40–60 pages, since each page takes longer to complete. <strong>Educational workbook bundles</strong>: 120 pages, giving 10–15 pages to each of 8–10 activity types. For niche inspiration before you settle on a count, browse{' '}
            <Link href="/en/guides/best-kdp-activity-book-niches">Best KDP Activity Book Niches</Link> and our{' '}
            <Link href="/en/tools/niche-finder">Printable Niche Research Tool</Link>.
          </p>

          <h2>Tips for Creating a Best-Selling Activity Book on KDP</h2>
          <p>
            Planning a book is only half the battle — these are the five habits that separate the KDP activity books that earn $3K/month from the ones that sit forgotten at rank #2,000,000.
          </p>

          <h3>Include Answer Keys for Every Puzzle</h3>
          <p>
            Missing answer keys are the single largest driver of 1-star reviews on puzzle and math activity books. Any book with word search, crossword, cryptogram, sudoku, math worksheet, or logic puzzle content <strong>must</strong> include a dedicated answer key section at the back of the book. The planner above auto-estimates your answer key length at roughly one answer-key page per two activity pages that need solutions. Don&apos;t override this to zero unless your solutions are genuinely compact enough to fit inline. Coloring, drawing, and handwriting pages don&apos;t need answer keys — everything else does.
          </p>

          <h3>Add Brain Breaks Between Challenging Sections</h3>
          <p>
            Sprinkle 2–4 coloring or drawing pages throughout your book as "brain breaks" between the hardest sections. Even in a math-heavy workbook, a coloring page every 10–15 pages dramatically raises perceived value and gives the end user a mental reset. This single technique is one of the highest-leverage moves in the category — it adds almost no cost, takes 30 seconds to plan in the outline above, and consistently shows up in positive reviews. Pair this with a themed niche and you have a book that reads like a premium product.
          </p>
          <p>
            Beyond those two habits, three more quick wins round out a best-seller playbook: <strong>theme your book around a tight niche</strong> like "Ocean Animals Math Workbook for Ages 5–8"; <strong>target one age range, not "all ages"</strong>; and <strong>always include a completion certificate or reward page</strong>. If you&apos;re planning a bundle strategy for your catalog, read{' '}
            <Link href="/en/guides/create-etsy-worksheet-bundles">How to Create Etsy Worksheet Bundles</Link>{' '}
            next — the same structure thinking applies to multi-book bundles.
          </p>

          <h2>From Plan to Finished Book</h2>
          <p>
            Once your outline is complete, the planner&apos;s <strong>Creation Checklist</strong> panel shows you exactly which LessonCraftStudio generators to open — each activity section links directly to the matching tool. Create your pages, export them as PDFs, and combine them in the order shown in your outline. Then use the{' '}
            <Link href="/en/tools/kdp-size-calculator">KDP Cover &amp; Interior Size Calculator</Link> to build the wraparound cover from the exact spine width shown in your dashboard. That&apos;s it — you&apos;re ready to upload.
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
            . Cross-check your numbers inside your KDP account before uploading.
          </p>

          <h2>Frequently Asked Questions About KDP Activity Books</h2>
        </article>

        <div className="mt-6">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>

        {/* Related Tools */}
        <section aria-labelledby="related-tools-heading" className="mt-14">
          <h2 id="related-tools-heading" className="text-2xl font-bold font-display text-slate-900 mb-1">
            Related KDP Tools
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            More free resources for KDP self-publishers and printable sellers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/en/tools/kdp-royalty-calculator"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🧮</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">KDP Royalty Calculator</div>
              <p className="text-sm text-slate-500 mt-1">
                Calculate printing cost, royalty, and profit across all 8 Amazon marketplaces.
              </p>
            </Link>
            <Link
              href="/en/tools/kdp-size-calculator"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">📐</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">KDP Cover &amp; Interior Size Calculator</div>
              <p className="text-sm text-slate-500 mt-1">
                Spine width, full cover dimensions, bleed and margin specs for your trim size.
              </p>
            </Link>
            <Link
              href="/en/tools/niche-finder"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🔍</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">Printable Niche Research Tool</div>
              <p className="text-sm text-slate-500 mt-1">
                50+ profitable niches for KDP, Etsy, and Gumroad — scored on demand and competition.
              </p>
            </Link>
            <Link
              href="/en/tools"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🔧</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">All Free Tools</div>
              <p className="text-sm text-slate-500 mt-1">
                Browse every free calculator, planner, and 33 worksheet generators in one place.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
