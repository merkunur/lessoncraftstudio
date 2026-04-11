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
  const title = 'Free KDP Activity Book Planner 2026 | Interior Layout & Page Count Tool';
  const description =
    'Plan your Amazon KDP activity book interior visually — drag-and-drop sections, auto-calculate page count, spine width, printing cost & royalty. Free tool for puzzle, workbook & coloring book publishers.';

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
      title: 'Free KDP Activity Book Planner — Structure Your Interior in Minutes',
      description:
        'Drag-and-drop KDP interior planner. Map out your activity book, puzzle book, or workbook section-by-section with live page count, spine width, and royalty estimates.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'KDP Activity Book Planner — Free Tool by LessonCraftStudio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free KDP Activity Book Planner 2026 | LessonCraftStudio',
      description:
        'Plan every page of your KDP activity book interior — drag, drop, reorder. Live page count, printing cost, and royalty estimates. Free, no signup.',
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
      'For most activity books, 80–120 pages is the sweet spot. Amazon KDP charges a flat printing cost for black & white books from 24 to 108 pages, so filling a B&W book up to 108 pages costs the same as printing 24 pages. That makes 100 pages a natural target — buyers perceive strong value, you stay inside the flat-rate band, and you earn the 60% royalty tier at any price ≥ $9.99.',
  },
  {
    question: 'Do I need to include an answer key in my activity book?',
    answer:
      'Yes — buyers expect answer keys for any math, word search, crossword, cryptogram, sudoku, or logic content. Books with missing answer keys routinely get 1-star reviews. The planner automatically estimates your answer key length at roughly one page per two activity pages that need solutions; you can override this if your solutions are compact. Coloring, drawing, and handwriting pages don\'t need answer keys.',
  },
  {
    question: 'What trim size should I use for a KDP activity book?',
    answer:
      '8.5" × 11" (US Letter) is by far the most popular trim size for activity books, puzzle books, and kids\' workbooks sold in the US. It gives you the most working area for large grids, coloring pages, and math worksheets. A4 (8.27" × 11.69") is the equivalent for European marketplaces. Smaller trims like 6" × 9" work for adult puzzle books but feel cramped for kids\' activity layouts.',
  },
  {
    question: 'Should my activity book be black & white or color?',
    answer:
      'For most activity books, black & white is the smart choice. A 100-page B&W activity book on 8.5×11 costs just $2.84 to print — roughly one-fifth the cost of premium color. That cost gap lets you price at $9.99 and still clear $3.15+ per sale. Color only makes sense if color is essential to the book\'s value proposition, such as a photo-based coloring book or a visual-learning early reader.',
  },
  {
    question: 'How do I actually create the pages in my book plan?',
    answer:
      'Once your outline is complete, use the "Creation Checklist" panel at the bottom of the planner. Every activity section in your book links directly to the matching LessonCraftStudio generator — addition worksheets, word searches, crosswords, mazes, coloring pages, and more. All 33 generators are free to try with a watermark; activating a license removes the watermark for commercial use on KDP.',
  },
  {
    question: 'Can I mix different types of activities in one KDP book?',
    answer:
      'Yes — and you should. Mixed activity books consistently earn better reviews than single-type books because readers enjoy variety and parents see more perceived value per dollar. A typical best-seller balances math (25–35%), word puzzles (20–25%), visual activities (15–20%), creative breaks like coloring (10–15%), and logic challenges (5–15%). The planner\'s content-balance bar shows your mix in real time.',
  },
  {
    question: 'Does the KDP Activity Book Planner save my work?',
    answer:
      'Not yet — this tool runs entirely in your browser with no accounts or storage, so your outline resets on page refresh. When your plan is ready, click "Copy Book Plan" to paste the full table of contents, dimensions, cost, and generator links into a document, spreadsheet, or task manager. We\'re exploring optional save functionality for a future release.',
  },
  {
    question: 'Is the KDP Activity Book Planner really free?',
    answer:
      'Yes, 100% free with no signup, no email capture, and no usage limits. The planner is a lead-in to LessonCraftStudio\'s worksheet generators — we want KDP publishers to discover that they can create their entire book interior with our tools. The generators themselves are free to try with a watermark; a one-time license removes the watermark for commercial use.',
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
            KDP Activity Book Planner
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Plan your Amazon KDP activity book interior in minutes. Drag-and-drop sections, auto-calculate page count, spine width, printing cost, and royalty — then launch the generators you need to create every page.
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
            Every successful KDP activity book follows the same three-part skeleton: <strong>front matter</strong> (title page, copyright, table of contents, "How to use this book"), <strong>content sections</strong> organized into themed chapters, and <strong>back matter</strong> (answer keys, certificate, optional notes pages). The planner above pre-populates the structural pages for you — your job is to fill in the middle with the activity types that match your niche and audience.
          </p>
          <p>
            The single biggest mistake new KDP publishers make is dumping 100 pages of the <em>same</em> activity type into one book. Readers get bored, reviews suffer, and returns spike. Mix your content: pair math worksheets with coloring breaks, alternate word puzzles with visual logic activities, and always include a certificate or reward page at the end. Books with mixed activity types consistently outsell single-type books by a wide margin, and the content-balance bar in the planner\'s dashboard helps you spot imbalances before you start creating pages.
          </p>
          <p>
            Finally, don\'t skip the answer key. Any book with math, crosswords, word searches, cryptograms, sudoku, or logic puzzles <strong>must</strong> include solutions at the back — buyers will 1-star you if they\'re missing. The planner auto-estimates the answer key length based on the activity types in your outline, so you never have to guess.
          </p>

          <h2>How Many Pages Should Your Activity Book Have?</h2>
          <p>
            For most activity books, the sweet spot is <strong>80–120 pages</strong>. Amazon KDP uses a two-tier printing cost system for black & white paperbacks: books from <strong>24 to 108 pages</strong> pay a flat cost ($2.84 for large-trim sizes like 8.5×11 in the US), and books of 110+ pages switch to a fixed + per-page formula. That means a 108-page B&W activity book costs exactly the same to print as a 24-page book — so filling your book up to 108 pages gives you the maximum perceived value without any extra printing cost.
          </p>
          <p>
            At a $9.99 price point on Amazon.com, a 100-page B&W large-trim activity book earns $3.15 per sale (60% royalty tier × $9.99 = $5.99 minus $2.84 printing cost). Push the price to $12.99 and your royalty climbs to $4.95. Push to $14.99 and you earn $6.15 per sale — without changing your printing cost at all. Use the{' '}
            <Link href="/en/tools/kdp-royalty-calculator">KDP Royalty Calculator</Link> to run the full numbers across all 8 Amazon marketplaces.
          </p>
          <p>
            Going above 108 pages is fine — it just means you start paying per-page printing costs. A 200-page B&W book on 8.5×11 in the US costs roughly $4.40 to print ($1.00 fixed + 200 × $0.017). At $14.99, your royalty is still a healthy $4.60 per sale. The tipping point is roughly 300 pages, where the per-page cost starts eroding margin significantly.
          </p>

          <h2>Tips for Creating a Best-Selling Activity Book on KDP</h2>
          <p>
            <strong>Include answer keys for every puzzle and math activity.</strong> This is the number-one complaint in negative reviews of activity books. The planner above auto-estimates your answer key length — don\'t override it to zero unless you have a specific reason.
          </p>
          <p>
            <strong>Add coloring or drawing pages as "brain breaks"</strong> between challenging sections. Even in a hardcore math workbook, two or three coloring pages interspersed throughout the book dramatically raise perceived value and give buyers\' kids a mental reset between worksheet sets.
          </p>
          <p>
            <strong>Theme your book around a specific niche.</strong> "Ocean Animals Math Workbook for Ages 5-8" will outsell "Math Workbook" every time. Use{' '}
            <Link href="/en/tools/niche-finder">Printable Niche Finder</Link> to pick a theme before you start planning. Theme your activity content, your coloring pages, and your cover around the same niche for compounding SEO and review benefits.
          </p>
          <p>
            <strong>Target a specific age group, not "all ages."</strong> A book that claims to work for everyone ends up appealing to no one. Pick one tight age range (Ages 3-5, Ages 5-8, Ages 7-10, Tweens, Adults) and design every section around that audience. The planner\'s "Suggested for this age group" highlights help you stay focused.
          </p>
          <p>
            <strong>Include a certificate or reward page at the back.</strong> Parents love these. Kids love these. They take 30 seconds to create, and they\'re the cheapest possible way to add value and get a positive review. Most templates above include one by default.
          </p>

          <h2>From Plan to Finished Book</h2>
          <p>
            Once your outline is complete, the planner\'s <strong>Creation Checklist</strong> panel shows you exactly which LessonCraftStudio generators to open — each activity section links directly to the matching tool. Create your pages, export them as PDFs, and combine them in the order shown in your outline. Then use the{' '}
            <Link href="/en/tools/kdp-size-calculator">KDP Cover Size Calculator</Link> to build the wraparound cover from the spine width shown in your dashboard. That\'s it — you\'re ready to upload.
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

          <h2>Frequently Asked Questions</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <div className="font-semibold text-slate-900 group-hover:text-primary">KDP Cover Size Calculator</div>
              <p className="text-sm text-slate-500 mt-1">
                Spine width, full cover dimensions, bleed and margin specs for your trim size.
              </p>
            </Link>
            <Link
              href="/en/tools/niche-finder"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">🔍</div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">Printable Niche Finder</div>
              <p className="text-sm text-slate-500 mt-1">
                50+ profitable niches for KDP, Etsy, and Gumroad — scored on demand and competition.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
