import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProfitHub from './ProfitHub';
import FAQAccordion from '@/components/FAQAccordion';

const baseUrl = 'https://www.lessoncraftstudio.com';
const pageUrl = `${baseUrl}/en/tools/profit-hub`;
const ogImage = `${baseUrl}/og/profit-hub.png`;

export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const title =
    'Printable Profit Hub 2026 — Compare Etsy, Gumroad, TPT, Payhip & KDP Fees Side-by-Side';
  const description =
    'Free multi-platform profit calculator for printable sellers. Enter one price and see your real profit on Etsy, Gumroad, TPT, Payhip, KDP, Creative Market & your own site — all at once. Reverse pricing, bundle compare, Etsy Ads ROI.';

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
      title: 'Printable Profit Hub — Compare Etsy, Gumroad, TPT, Payhip & KDP Fees',
      description:
        'Enter one selling price, see your real profit across 7 platforms side-by-side. Reverse pricing, singles-vs-bundle-vs-KDP comparison, monthly projections, Etsy Ads ROI. Free, no signup.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Printable Profit Hub showing profit comparison bars across Etsy, Gumroad, TPT, Payhip, own website, KDP, and Creative Market — Free Tool by LessonCraftStudio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Printable Profit Hub 2026 | LessonCraftStudio',
      description:
        'Compare your real profit on Etsy, Gumroad, TPT, Payhip, KDP & more — side by side, instantly. Free tool for printable and digital product sellers.',
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/* ----------------------------------------------------------------------------
 * FAQ items — long-tail seller-intent questions.
 * -------------------------------------------------------------------------- */

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'Which platform pays the most for selling printables?',
    answer:
      'Your own website is mathematically the highest — you only pay ~2.9% + $0.30 Stripe processing, netting ~93% of a $6.99 sale. Payhip Free is second (~88%), Etsy third at ~84% without offsite ads. TPT Basic and Creative Market pay the least (~50%). But raw profit isn\'t the only factor — Etsy and TPT bring you buyers you never had to acquire yourself, while your own site requires you to drive every visitor.',
  },
  {
    question: 'Is Etsy Offsite Ads mandatory?',
    answer:
      'Only if your shop earns more than $10,000 in the last 365 days. At that threshold, Etsy automatically enrolls you at the lower 12% rate, and you cannot opt out. Shops earning under $10K can opt out at any time in your shop dashboard — if you do, you\'ll never pay the 15% fee. This tool lets you toggle Offsite Ads on or off so you can see the worst-case impact either way.',
  },
  {
    question: 'Is TPT Premium worth the $59.95/year upgrade?',
    answer:
      'Yes, for most active sellers. The upgrade jumps you from 55% payout to 80% payout — that\'s 25% more profit on every sale, plus the $0.30 transaction fee gets waived on orders above $3. At even just 30 sales per month of a $6.99 product, the extra profit covers the $59.95 annual fee in the first month and nets you hundreds of dollars extra per year. Use the Subscription Breakeven insight in the projections section to see the math for your exact volume.',
  },
  {
    question: 'Why is Creative Market so much lower than the others?',
    answer:
      'Creative Market takes a flat 50% commission on non-exclusive products. It\'s positioned as a premium curated marketplace for design assets — fonts, graphics, mockups, and templates — where the audience is professional designers willing to pay higher prices. For general printables (worksheets, planners, colouring pages), the 50% cut is painful and the audience fit is weaker than Etsy or Gumroad.',
  },
  {
    question: 'Does this calculator handle international currencies?',
    answer:
      'Not in this version — all calculations are in US dollars and use US seller fee structures (US Etsy Payments, US Stripe rates, amazon.com KDP royalty thresholds, etc.). For KDP printing and royalty across 8 international marketplaces, use our dedicated KDP Royalty Calculator linked below. A multi-currency version of this tool is on the roadmap.',
  },
  {
    question: 'What isn\'t included in the per-sale calculations?',
    answer:
      'Monthly subscription costs (TPT Premium $59.95/yr, Payhip Plus $29/mo, Payhip Pro $99/mo, Shopify $39/mo) are not subtracted from the per-sale profit figures — they\'re shown separately in the Monthly Projections breakeven insights. We also don\'t model sales tax, VAT, income tax, chargebacks, refunds, or the time you spend on customer service. Always consult a tax professional before making pricing decisions for your business.',
  },
  {
    question: 'Can I sell the same product on multiple platforms at once?',
    answer:
      'Yes, and most successful printable sellers do exactly that. Selling on Etsy plus KDP plus your own website simultaneously is a common strategy — each platform reaches a different audience, and the only overhead is uploading the file and managing prices. The one caveat is Creative Market, which offers a higher commission if you go exclusive (70% instead of 50%). This calculator shows you the per-platform economics so you can decide which ones are worth your listing time.',
  },
  {
    question: 'How does the reverse pricing calculator work?',
    answer:
      'You enter the profit you want to keep per sale (e.g., $5.00), and we compute the minimum selling price needed on each platform to hit that target after all fees. The formulas are closed-form — they solve for price by dividing your target profit (plus any fixed fees) by the proportional fee multiplier. This is the fastest way to set prices when you know your costs: decide what you need to earn, and the tool tells you what to charge.',
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
    { '@type': 'ListItem', position: 3, name: 'Printable Profit Hub', item: pageUrl },
  ],
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Printable Profit Hub',
  description:
    'Free multi-platform pricing and profit calculator for printable and digital product sellers. Compares Etsy, Gumroad, Teachers Pay Teachers, Payhip, own website (Stripe), Amazon KDP, and Creative Market side by side.',
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
    'Side-by-side profit comparison across 7 platforms',
    'Itemized fee breakdown per platform',
    'Reverse pricing: target profit → required selling price',
    'Singles vs bundle vs KDP book revenue comparison',
    'Monthly and annual profit projections',
    'Etsy Offsite Ads toggle with 15% / 12% rates',
    'TPT Basic vs Premium plan comparison',
    'Payhip Free / Plus / Pro plan comparison',
    'Etsy Ads ROI calculator with breakeven budget',
    'Copy comparison summary to clipboard',
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

/* ----------------------------------------------------------------------------
 * Page
 * -------------------------------------------------------------------------- */

export default function ProfitHubPage({ params }: { params: { locale: string } }) {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
              Printable Profit Hub
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-6 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Printable Profit Hub — See Your Real Profit on 7 Platforms at Once
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            The only free calculator that shows your <em>actual take-home profit</em> on Etsy,
            Gumroad, Teachers Pay Teachers, Payhip, your own Stripe-powered site, Amazon KDP, and
            Creative Market — side by side, updated instantly as you type. Built for printable
            and digital product sellers who are tired of guessing.
          </p>
        </header>

        {/* Freshness badges */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 font-semibold">
            <span aria-hidden="true">●</span>
            Updated <time dateTime="2026-04-11">April 2026</time>
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200 px-2.5 py-1 font-medium">
            7 platforms · Official fee structures
          </span>
          <span className="inline-flex items-center rounded-full bg-primary-50 text-primary ring-1 ring-primary/20 px-2.5 py-1 font-semibold">
            No signup · No API · Instant results
          </span>
        </div>

        {/* The tool */}
        <ProfitHub />

        {/* CTA banner */}
        <section className="mt-14 rounded-2xl bg-gradient-to-r from-primary to-primary-700 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span aria-hidden="true">🚀</span>
                Ready to create the products you&apos;re pricing?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl">
                Use our{' '}
                <Link href="/en/apps" className="underline font-semibold hover:text-white">
                  33 free worksheet generators
                </Link>{' '}
                to build professional printables for your Etsy shop, KDP book, or Gumroad store.
                Try every tool free with a watermark — license to remove it for commercial use.
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

        {/* SEO long-form content */}
        <article className="prose prose-slate max-w-none mt-12 prose-headings:font-display prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-slate-900 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-primary prose-a:font-medium hover:prose-a:underline">
          <h2>How Platform Fees Eat Into Your Printable Profits</h2>
          <p>
            Most printable sellers obsess over revenue and completely ignore net profit. That&apos;s
            how a $6.99 worksheet bundle that &ldquo;sells well&rdquo; on Etsy quietly pays you{' '}
            <strong>$5.88</strong> — while the exact same product on your own Stripe-powered site
            pays you <strong>$6.49</strong>. A $0.61 gap doesn&apos;t sound like much until you
            realize it compounds: at just one sale per day, that&apos;s <strong>$219.60/year</strong>{' '}
            left on the table. Multiply by five products, or ten, or fifty, and the difference
            between a hobby and a business becomes obvious. Understanding what each platform
            actually costs you is not optional — it&apos;s the single lever that decides whether
            your printable shop is a time-sucking side project or a real income stream.
          </p>
          <p>
            The trap is that fees on every platform look deceptively small in isolation. Etsy
            says 6.5% transaction fee. Sure, manageable. But then there&apos;s the $0.20 listing
            fee that auto-renews on every sale. And the 3% + $0.25 payment processing. And if
            Offsite Ads is on, another 15% on top. By the time you add up the line items, Etsy is
            eating ~16% of a $6.99 sale with ads off, or <strong>~31% with ads on</strong>. The
            Profit Hub above exists to make that total visible on every platform at once, so you
            can see exactly where your money is going before you list anything.
          </p>

          <h2>Etsy Fees Explained for Digital Product Sellers</h2>
          <p>
            Etsy charges digital sellers four distinct fees on every sale. The <strong>listing
            fee</strong> is $0.20 per listing — and for digital products, Etsy treats each sale
            as a listing renewal, so this fee is charged on every single transaction, not just
            when you first publish. The <strong>transaction fee</strong> is 6.5% of the item
            price. Because digital products have no shipping cost, the transaction fee is
            calculated on just the item price, unlike physical products. The <strong>payment
            processing fee</strong> is 3% of the item price plus $0.25 fixed, handled by Etsy
            Payments for US sellers (rates differ by country).
          </p>
          <p>
            Then there&apos;s the Offsite Ads bombshell. Etsy runs ads for your shop on Google,
            Facebook, and Instagram automatically. When a buyer clicks one of those ads and
            purchases your product, Etsy charges you <strong>15% of the sale</strong> — or{' '}
            <strong>12% if your shop has earned over $10,000 in the past 365 days</strong>. At
            the $10K threshold, Offsite Ads becomes mandatory — you can&apos;t opt out. Below it,
            you can toggle it off from your shop dashboard. This tool lets you preview the
            worst-case Offsite Ads impact with one click, so you can price with the fee baked in
            rather than be surprised by it. For a deeper dive into Etsy pricing strategy, see{' '}
            <Link href="/en/tools/kdp-royalty-calculator">our KDP Royalty Calculator</Link>{' '}
            (which handles the non-Etsy side of hybrid shops) and{' '}
            <a
              href="https://www.etsy.com/seller-handbook/article/how-our-fees-work/1015196521"
              target="_blank"
              rel="nofollow noopener"
            >
              Etsy&apos;s official fee documentation
            </a>
            .
          </p>

          <h2>Where Should You Sell Your Printables?</h2>
          <p>
            There is no single best platform — only the platform that&apos;s best for a specific
            goal. Use these rules of thumb when you&apos;re deciding where to list a new product:
          </p>
          <ul>
            <li>
              <strong>Etsy</strong> — Best for discoverability. Etsy has 90 million+ active
              buyers who are already looking for printables. You&apos;ll pay ~16% in fees without
              Offsite Ads, but you get organic traffic you don&apos;t have to acquire yourself.
              This is the default first platform for most printable sellers.
            </li>
            <li>
              <strong>Gumroad</strong> — Best when you already have an audience. At 10% + $0.50
              per sale, Gumroad is cheaper than Etsy and lets you sell directly to an email list,
              Twitter following, or newsletter audience. No built-in discovery though — you have
              to drive every visitor.
            </li>
            <li>
              <strong>Teachers Pay Teachers</strong> — Best for classroom-focused educational
              content. TPT Basic pays just 55%, but Premium ($59.95/year) pays 80% and waives the
              transaction fee above $3. If you sell lesson plans and student worksheets, the
              built-in teacher audience is hard to beat.
            </li>
            <li>
              <strong>Payhip</strong> — Best value on the per-sale math. Free plan is 5% + Stripe
              processing. Plus ($29/mo) drops to 2%. Pro ($99/mo) drops to 0%. Use the breakeven
              insights in the projections section to figure out which plan fits your volume.
            </li>
            <li>
              <strong>Own website (Shopify / Stripe / Gumroad-linked)</strong> — Best profit
              margin at scale. Only 2.9% + $0.30 in Stripe fees means you keep ~93% of every
              dollar. The tradeoff is hosting costs (~$10-39/month) and the fact that you have to
              drive 100% of your own traffic.
            </li>
            <li>
              <strong>Amazon KDP</strong> — Best for passive income via compiled books. If your
              printables can be combined into a paperback or workbook, KDP gives you access to
              Amazon&apos;s buyer traffic with zero customer service (Amazon handles everything).
              The royalty is only ~31% after printing costs, but the book sells itself. Use our{' '}
              <Link href="/en/tools/kdp-royalty-calculator">KDP Royalty Calculator</Link> and{' '}
              <Link href="/en/tools/kdp-size-calculator">KDP Size Calculator</Link> to plan your
              first book, and the{' '}
              <Link href="/en/tools/activity-book-planner">Activity Book Planner</Link> to
              structure the interior.
            </li>
            <li>
              <strong>Creative Market</strong> — Best for design assets, not general printables.
              Their 50% commission is painful for worksheets or planners, but their audience of
              professional designers pays premium prices for fonts, mockups, and templates.
            </li>
          </ul>
          <p>
            The smartest printable sellers don&apos;t pick one platform — they pick two or three
            that complement each other. Etsy for discovery + KDP for passive income is a
            particularly strong combination: Etsy sells your high-margin digital downloads to
            people actively searching for printables, while KDP sells a compiled book version to
            Amazon shoppers who would never find your Etsy shop. Looking for ideas?{' '}
            <Link href="/en/tools/niche-finder">Browse our Niche Finder</Link> for 50+ profitable
            printable niches scored by demand and competition.
          </p>

          <p className="text-xs text-slate-500 mt-8">
            Fee structures on this page are sourced from each platform&apos;s official
            documentation as of April 2026. Rates change — always cross-check at each
            platform&apos;s current fee page before making pricing decisions. This tool does not
            calculate sales tax, VAT, or income tax; always consult a tax professional for
            business advice.
          </p>

          <h2>Frequently Asked Questions</h2>
        </article>

        <div className="mt-6">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>

        {/* Related Tools */}
        <section aria-labelledby="related-tools-heading" className="mt-14">
          <h2
            id="related-tools-heading"
            className="text-2xl font-bold font-display text-slate-900 mb-1"
          >
            Related Tools for Printable Sellers
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            More free calculators and planners for KDP publishers and Etsy shop owners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                Printing cost, royalty, and profit across all 8 Amazon marketplaces.
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
                KDP Cover &amp; Interior Size Calculator
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Spine width, full cover dimensions, bleed and margin specs.
              </p>
            </Link>
            <Link
              href="/en/tools/activity-book-planner"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                📚
              </div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">
                Activity Book Planner
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Drag-and-drop KDP book structure with live page count and royalty.
              </p>
            </Link>
            <Link
              href="/en/tools/niche-finder"
              className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-primary p-5 transition"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                🔍
              </div>
              <div className="font-semibold text-slate-900 group-hover:text-primary">
                Printable Niche Research Tool
              </div>
              <p className="text-sm text-slate-500 mt-1">
                50+ profitable niches for KDP, Etsy, and Gumroad — scored on demand.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
