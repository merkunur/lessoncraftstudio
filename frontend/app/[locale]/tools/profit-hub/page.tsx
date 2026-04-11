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
    'Free Printable Profit Calculator 2026 | Compare Etsy, Gumroad, TPT, KDP & More';
  const description =
    'Calculate your real profit per sale across 7 platforms: Etsy, Gumroad, TPT, Payhip, Amazon KDP, Shopify & Creative Market. See all fees side-by-side, find the optimal price, project monthly revenue. Free tool for printable sellers.';

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
      title: 'Printable Profit Hub — Compare Fees on Etsy, Gumroad, TPT, KDP & More',
      description:
        'See your real profit across 7 platforms for digital products and printables. Reverse pricing, bundle comparisons, revenue projections. Free, no signup.',
      url: pageUrl,
      siteName: 'LessonCraftStudio',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Printable Profit Hub showing profit comparison across Etsy, Gumroad, TPT, Payhip, KDP, Shopify, and Creative Market',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Printable Profit Hub 2026 | Compare Fees Across 7 Platforms',
      description:
        'Real profit per sale on Etsy vs Gumroad vs TPT vs KDP vs Payhip vs Shopify vs Creative Market. Free, instant, no signup.',
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
    question: 'How much does Etsy take from a digital product sale?',
    answer:
      "For US sellers, Etsy charges a $0.20 listing fee (per sale for digital products), a 6.5% transaction fee on the item price, and a payment processing fee of 3% plus $0.25. On a $6.99 digital download, total fees are approximately $1.11, leaving you with $5.88. If the sale comes through Etsy's Offsite Ads program, an additional 15% fee ($1.05) applies, reducing your profit to $4.83.",
  },
  {
    question: 'Which platform has the lowest fees for selling printables?',
    answer:
      "Selling on your own website (via Stripe or PayPal) has the lowest per-sale fees: approximately 2.9% plus $0.30 per transaction. Among marketplaces, Payhip's free plan (5% plus payment processing) typically beats Etsy and Gumroad. However, marketplaces like Etsy provide built-in traffic that your own website doesn't. The best choice depends on whether you already have an audience or need marketplace discovery.",
  },
  {
    question: 'Is it better to sell printables on Etsy or Gumroad?',
    answer:
      'Etsy charges approximately 12-15% in total fees but provides built-in traffic from 95+ million active buyers. Gumroad charges 10% plus $0.50 per transaction but has no marketplace — you must drive your own traffic. For sellers without an existing audience, Etsy is usually better despite higher fees. For sellers with a social media following or email list, Gumroad or Payhip lets you keep more profit per sale.',
  },
  {
    question: "What is Etsy's offsite ads fee and can I opt out?",
    answer:
      'Etsy advertises your listings on Google, Facebook, and Instagram. If a buyer clicks these ads and purchases within 30 days, Etsy charges 15% of the sale price (12% for shops earning over $10,000/year). Shops earning under $10,000/year can opt out of this program. Shops earning over $10,000/year cannot opt out — the fee is mandatory. This can significantly reduce profit on affected sales.',
  },
  {
    question: 'Should I upgrade to TPT Premium seller account?',
    answer:
      'TPT Basic sellers keep 55% of each sale with a $0.30 transaction fee. Premium sellers keep 80% for $59.95/year with reduced transaction fees. The upgrade pays for itself quickly: selling just $240 worth of products per year (about $20/month) makes Premium more profitable. If you sell more than 2-3 products per month on TPT, the Premium upgrade is almost always worth it.',
  },
  {
    question: 'How do I price my printables to make a profit after fees?',
    answer:
      'Start with your target profit per sale and work backward. On Etsy, you need to price about 15-20% higher than your desired profit to cover all fees. On Gumroad, add about 12-15%. On TPT Premium, add about 25%. On your own website, add about 5%. Use our reverse pricing calculator above to find the exact price for your target profit on each platform.',
  },
  {
    question: 'Is it more profitable to sell printables individually or as bundles?',
    answer:
      "Bundles almost always generate more profit per customer than individual sales. A bundle of 10 worksheets at $6.99 earns you more than selling one worksheet at $1.99, and most customers won't buy all 10 individually. Bundles also have lower per-unit fee impact since listing fees and fixed processing charges apply once per transaction. For Amazon KDP, compiling worksheets into a printed book at $9.99+ unlocks the 60% royalty tier.",
  },
  {
    question: 'Can I sell the same printable on multiple platforms?',
    answer:
      'Yes, you can sell the same digital product on Etsy, Gumroad, TPT, Payhip, and your own website simultaneously. There are no exclusivity requirements for digital downloads on these platforms. For Amazon KDP, you can sell a compiled book version alongside individual downloads on other platforms. Many successful sellers use a multi-platform strategy to maximize reach and revenue.',
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
    'Free multi-platform profit calculator for printable and digital product sellers. Compare real profit per sale across Etsy, Gumroad, TPT, Payhip, Amazon KDP, Shopify, and Creative Market. Includes reverse pricing, bundle comparison, revenue projections, and Etsy Ads ROI calculator.',
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
            Printable Profit Hub — Compare Your Profit Across Etsy, Gumroad, TPT, KDP &amp; More
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            The only free <strong>Etsy profit calculator</strong> that also compares Gumroad,
            Teachers Pay Teachers, Payhip, your own Stripe-powered site, Amazon KDP, and Creative
            Market — side by side, updated instantly as you type. Stop guessing how much Etsy
            takes per sale. See every fee on every platform, find the optimal price, and project
            your monthly revenue in one view.
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

        {/* CTA banner — monetization bridge: Profit Hub → KDP book creation → generators */}
        <section className="mt-14 rounded-2xl bg-gradient-to-r from-primary to-primary-700 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Thinking about creating a KDP book?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl">
                Compile your worksheets into a professional activity book and sell it on Amazon
                for passive income alongside your Etsy shop. Create math worksheets, word
                searches, coloring pages, and 30+ activity types in minutes with our{' '}
                <Link href="/en/apps" className="underline font-semibold hover:text-white">
                  free worksheet generators
                </Link>{' '}
                — try every tool free with a watermark, license to remove it for commercial KDP
                use.
              </p>
            </div>
            <Link
              href="/en/apps"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-primary font-semibold px-5 py-3 shadow-sm hover:bg-primary-50 transition whitespace-nowrap"
            >
              Create book pages →
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
            your printable shop is a time-sucking side project or a real income stream. Our
            reverse pricing calculator above makes it trivial to{' '}
            <Link href="/en/guides/price-etsy-printables">
              price your Etsy printable worksheets
            </Link>{' '}
            for any target profit.
          </p>

          <h3>Understanding Fee Types (Listing, Transaction, Processing, Commission)</h3>
          <p>
            Every platform combines four fee types in a different ratio, and once you can spot
            them in the wild you&apos;ll never be surprised by a payout again. A <strong>listing
            fee</strong> is a fixed charge per product (Etsy charges $0.20 and renews it on every
            digital sale). A <strong>transaction fee</strong> is a percentage of the sale price
            that the platform keeps as revenue (Etsy is 6.5%, Gumroad is 10%). A{' '}
            <strong>payment processing fee</strong> is what the card network charges to move
            money from the buyer to you — almost universally 2.9% + $0.30 from Stripe, PayPal, or
            Etsy Payments. A <strong>commission</strong> is a flat percentage cut that a
            marketplace keeps instead of separating out individual fees (TPT Basic keeps 45%,
            Creative Market keeps 50%). The trap is that fees in isolation look small — Etsy&apos;s
            6.5% transaction fee sounds fine until you add the listing, processing, and Offsite
            Ads on top and the combined rate hits ~31%. For a deeper breakdown of how this plays
            out across the biggest printable marketplaces, read our guide on{' '}
            <Link href="/en/guides/pricing-educational-printables">
              pricing strategies for educational printables
            </Link>
            .
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
            Payments for US sellers (rates differ by country). Put those together and you can see
            that on a $10 sale, Etsy takes roughly $1.60 — and that&apos;s before Offsite Ads. If
            you&apos;re just getting started on the platform, read our guides on how to{' '}
            <Link href="/en/guides/sell-math-worksheets-etsy">
              sell math worksheets on Etsy
            </Link>{' '}
            and how to{' '}
            <Link href="/en/guides/sell-word-search-etsy">
              sell word search puzzles on Etsy
            </Link>{' '}
            — both cover the fee math in the context of the specific niches.
          </p>

          <h3>The Offsite Ads Fee Most Sellers Forget</h3>
          <p>
            Then there&apos;s the Offsite Ads bombshell. Etsy runs ads for your shop on Google,
            Facebook, and Instagram automatically. When a buyer clicks one of those ads and
            purchases your product within 30 days, Etsy charges you <strong>15% of the sale</strong>{' '}
            — or <strong>12% if your shop has earned over $10,000 in the past 365 days</strong>.
            At the $10K threshold, Offsite Ads becomes mandatory: you cannot opt out. Below it,
            you can toggle it off from your shop dashboard. Most sellers forget this fee exists
            until a payout comes in far smaller than expected. The Profit Hub toggle above lets
            you preview the worst-case Offsite Ads impact with one click, so you can price with
            the fee baked in rather than be surprised by it. For the authoritative details, see{' '}
            <a
              href="https://help.etsy.com/hc/en-us/articles/115014483627"
              target="_blank"
              rel="nofollow noopener"
            >
              Etsy&apos;s seller fee documentation
            </a>
            .
          </p>

          <h2>Where Should You Sell Your Printables?</h2>
          <p>
            There is no single best platform — only the platform that&apos;s best for a specific
            goal. Each of the five options below attracts a completely different buyer and
            rewards a completely different seller profile. Most successful printable sellers pick
            two or three that complement each other rather than betting on one.
          </p>

          <h3>Etsy — Built-in Traffic, Higher Fees</h3>
          <p>
            Etsy is the default first platform for most printable sellers because it has 95
            million+ active buyers already searching for printables, planners, and worksheets.
            You&apos;ll pay roughly 12–16% in combined fees (more with Offsite Ads), but you get
            organic traffic you don&apos;t have to acquire yourself. The platform is saturated,
            so tight niching and strong SEO matter — read our guide on{' '}
            <Link href="/en/guides/sell-math-worksheets-etsy">
              how to sell math worksheets on Etsy
            </Link>{' '}
            for niche-specific tactics, and use our{' '}
            <Link href="/en/tools/niche-finder">Printable Niche Research Tool</Link> to find
            under-served subcategories with proven demand.
          </p>

          <h3>Gumroad — Simple but Expensive at Scale</h3>
          <p>
            Gumroad charges a flat 10% + $0.50 per sale and requires zero setup — you can list a
            product in under five minutes. The catch is there&apos;s no marketplace: you must
            drive every buyer yourself via email list, Twitter, Pinterest, or a newsletter. For
            sellers who already have an audience, Gumroad lets you keep more than Etsy does. For
            sellers who don&apos;t, the &ldquo;cheaper fees&rdquo; are meaningless because there&apos;s
            no traffic to capture. See our full walkthrough on{' '}
            <Link href="/en/guides/sell-printables-gumroad">
              how to sell printables on Gumroad
            </Link>{' '}
            to decide if it fits your audience stage.
          </p>

          <h3>TPT — Premium Pricing for Educators</h3>
          <p>
            Teachers Pay Teachers is hands-down the best platform for classroom-focused
            educational content — lesson plans, student worksheets, assessments. TPT Basic pays
            55% of each sale with a $0.30 transaction fee. TPT Premium at $59.95/year pays 80%
            and waives the transaction fee on orders above $3 — a massive jump that pays for
            itself after about 240 dollars in annual sales. The built-in audience of millions of
            teachers is hard to beat if your content is genuinely classroom-ready. Our guide on{' '}
            <Link href="/en/guides/create-sell-tpt-resources">
              how to create and sell TPT resources
            </Link>{' '}
            covers everything from product formatting to the Premium upgrade math.
          </p>

          <h3>Amazon KDP — Passive Income from Compiled Books</h3>
          <p>
            If your printables can be compiled into a paperback or workbook, Amazon KDP unlocks a
            completely different buyer pool — people who never visit Etsy but buy Amazon books by
            the thousands every day. The royalty rate is 60% on books priced at $9.99+ (50%
            below that threshold), minus the printing cost. That works out to roughly 30–35% net
            royalty on a 100-page B&amp;W activity book, but the revenue is pure passive income:
            Amazon handles printing, shipping, customer service, and returns. Read our deep dive
            on{' '}
            <Link href="/en/guides/make-money-kdp-activity-books">
              how to make money with KDP activity books
            </Link>{' '}
            and our comparison of{' '}
            <Link href="/en/guides/kdp-vs-etsy-printables">
              Amazon KDP vs Etsy for printable sellers
            </Link>{' '}
            — both explain why most sellers should run KDP <em>alongside</em> Etsy, not instead
            of it. Then use our{' '}
            <Link href="/en/tools/kdp-royalty-calculator">KDP Royalty Calculator</Link> for the
            per-marketplace math and the{' '}
            <Link href="/en/tools/kdp-size-calculator">KDP Cover &amp; Interior Size Calculator</Link>{' '}
            for exact cover dimensions.
          </p>

          <h3>Your Own Website — Maximum Profit, You Drive Traffic</h3>
          <p>
            A Stripe-powered Shopify store (or any own-site setup) has the absolute lowest fees:
            2.9% + $0.30 per transaction. On a $6.99 digital download you keep $6.49 — over $0.60
            more than Etsy. The tradeoff is that no one will find your site by accident. You
            drive every single visitor yourself through SEO, social, email, or paid ads. Most
            sellers should launch on Etsy first to build an audience, then migrate repeat buyers
            to their own site once they have enough volume to justify the hosting fee and the
            marketing effort. For the complete strategy on running multi-platform operations,
            read our guide on how to{' '}
            <Link href="/en/guides/create-etsy-worksheet-bundles">
              create Etsy worksheet bundles
            </Link>{' '}
            — the same bundling logic applies to your own store.
          </p>

          <p className="text-xs text-slate-500 mt-8">
            Fee structures on this page are sourced from each platform&apos;s official
            documentation as of April 2026:{' '}
            <a
              href="https://help.etsy.com/hc/en-us/articles/115014483627"
              target="_blank"
              rel="nofollow noopener"
            >
              Etsy seller fees
            </a>
            ,{' '}
            <a href="https://gumroad.com/pricing" target="_blank" rel="nofollow noopener">
              Gumroad pricing
            </a>
            ,{' '}
            <a
              href="https://help.teacherspayteachers.com/hc/en-us/articles/360044219891"
              target="_blank"
              rel="nofollow noopener"
            >
              TPT seller fees
            </a>
            , and{' '}
            <a href="https://payhip.com/pricing" target="_blank" rel="nofollow noopener">
              Payhip pricing
            </a>
            . Rates change — always cross-check before making pricing decisions. This tool does
            not calculate sales tax, VAT, or income tax; always consult a tax professional for
            business advice.
          </p>

          <h2>Frequently Asked Questions About Selling Printables</h2>
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
