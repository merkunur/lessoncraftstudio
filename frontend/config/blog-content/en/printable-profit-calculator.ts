import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'printable profit calculator',
    secondaryKeywords: [
      'etsy vs gumroad vs tpt fees',
      'printable business platform comparison',
      'etsy fee calculator 2026',
      'gumroad fee calculator',
      'tpt revenue share calculator',
    ],
    lsiKeywords: [
      'reverse pricing printable',
      'bundle vs single profit',
      'etsy offsite ads fee',
      'payhip fees',
      'creative market commission',
    ],
    titleTag: 'Compare Your Profit on Etsy vs Gumroad vs TPT vs KDP \u2014 Free Tool',
    metaDescription: 'See your real profit per sale across 7 platforms side-by-side. Reverse pricing, bundle comparison, revenue projections, Etsy Ads ROI. Free, no signup.',
  },
  hero: {
    title: 'Compare Your Profit on Etsy vs Gumroad vs TPT vs KDP \u2014 Free Tool',
    tagline: 'Real take-home per sale on 7 platforms, side by side',
    description: 'You just sold a $6.99 worksheet bundle on Etsy. How much did you actually keep? If you said $6.99, or even "about $6," you are wrong. After Etsy\'s listing fee, transaction fee and payment processing, you kept $5.88. And if that sale came through Etsy offsite ads, only $4.83. We got tired of sellers pricing by gut feel, so we built a calculator that shows your real profit on 7 platforms in one screen.',
  },
  category: 'how-to',
  introduction: 'Every platform has different, confusing fee structures. Sellers price by gut feeling, nobody calculates their actual per-sale profit across platforms, and the result is that printable shops leave money on the table two ways at once: they underprice because they do not account for the real fee load, and they sell on the wrong platform for each product. Existing Etsy fee calculators only show Etsy \u2014 they never answer the question you actually care about, which is "would I make more on Gumroad or TPT instead?" Our [free printable profit hub](/tools/profit-hub) answers that in 10 seconds.',
  sections: [
    {
      heading: 'The Problem: Etsy Fees Are Real Fees',
      content: 'On a $6.99 digital download, Etsy charges you: $0.20 listing fee, 6.5% transaction fee, 3% + $0.25 payment processing. For a US seller, that is roughly $0.20 + $0.45 + $0.46 = $1.11 in fees, leaving $5.88 take-home. If that sale came through Etsy offsite ads, Etsy takes an additional 15% on top, dropping your take-home to $4.83. That is a 31% cut on a sale you thought was almost pure profit.\n\nCompare that to Gumroad, where you would keep $6.27 on the same sale, or to your own website using Payhip or Shopify, where you would keep around $6.49 after payment processing. The difference between best-case and worst-case on that same $6.99 product is $1.66, which adds up to over $600 a year if you sell one per day. For context, read our [Etsy pricing guide](/guides/price-etsy-printables) and the wider [pricing educational printables](/guides/pricing-educational-printables) walkthrough.\n\nThe second problem is bundling. Sellers instinctively know that a 50-sheet bundle priced at $14.99 should earn more than ten separate $1.99 listings, but they do not have a quick way to check. The profit hub has a bundle-vs-singles comparison built in, so you can see whether your planned bundle actually outperforms the single-listing math after fees.',
    },
    {
      heading: 'What We Built',
      content: 'The [printable profit hub](/tools/profit-hub) enters one product once and compares it across 7 platforms in parallel:\n\n**7 platforms side-by-side.** Etsy (standard and offsite ads), Gumroad, TPT (Basic and Premium), Payhip, KDP, your own website (Stripe/Payhip), and Creative Market. Each uses the current 2026 fee schedule.\n\n**Reverse pricing.** Type the profit you want to keep and the tool tells you exactly what to list at on each platform. This is the fastest way to set prices that survive fees instead of ones that sound nice and leave you broke.\n\n**Singles vs bundle vs KDP comparison.** Enter a base single product price and a bundle multiplier, and see whether your compiled bundle earns more per sale than stacking individual listings. Then see whether turning the bundle into a KDP paperback earns even more after printing costs \u2014 with the same [KDP royalty logic](/tools/kdp-royalty-calculator) built in.\n\n**Visual bar chart.** Seeing the take-home amounts as a bar chart is honestly the most useful part. Your eye immediately picks out the winner and the loser, and you stop second-guessing platform choices.\n\n**Monthly revenue projections.** Enter a realistic units-per-day number and the tool shows you projected monthly and annual revenue at each platform\'s take-home rate. This is how you decide whether it is worth the effort to expand to a new platform.\n\n**Etsy Ads ROI calculator.** Built in so you can see exactly how much of your margin Etsy offsite ads eats and decide whether the extra traffic is worth it. Most sellers discover it is not, for low-priced digital products.',
    },
    {
      heading: 'How to Use It',
      content: 'The usual flow:\n\n1. Open the [printable profit hub](/tools/profit-hub).\n2. Enter the list price of a product you are already selling (or planning to sell).\n3. Read the bar chart \u2014 the winning platform is usually obvious.\n4. Try the reverse-pricing mode: enter a target profit (for example, "I want to keep $5 per sale") and see the exact list price you need on each platform to hit it.\n5. If you sell bundles, enter your bundle multiplier and compare single-listing profit to bundle profit side-by-side.\n6. If you are considering KDP, enter a page count and see whether compiling into a paperback changes the answer.\n\nOnce you know the winner per product type, adjust your listings accordingly. Sellers who do this for their top 10 best-sellers usually find at least 2 or 3 products that should be on a different platform than they are currently on.',
    },
    {
      heading: 'Why We Made This Free',
      content: 'We build generators that the same sellers use to make products for these platforms. When sellers can see their real margins, they make better pricing decisions, their shops become sustainable, and they keep creating. Paywalling a profit calculator would contradict everything we do. Try one of our 33 worksheet generators like the [math puzzle maker](/tools/math-puzzle-maker) \u2014 free trial with watermark \u2014 and when you list your first product, use the profit hub to price it for real.',
    },
  ],
  keyTakeaways: [
    'A $6.99 Etsy sale nets $5.88 after fees \u2014 or $4.83 if it came through offsite ads',
    'Reverse pricing: enter target profit, get the exact list price per platform',
    'Bundles usually beat single listings after fees \u2014 but only above certain price points',
    'Etsy offsite ads can silently eat 31% of your margin on low-priced digital products',
    'Free to use, 7 platforms compared side-by-side, no signup',
  ],
  faq: [
    {
      question: 'Which 7 platforms are supported?',
      answer: 'Etsy (standard and offsite ads), Gumroad, TPT (Basic and Premium), Payhip, KDP, your own website (Stripe/Payhip), and Creative Market. Each uses the current 2026 fee schedule. We add new platforms when fee structures change or when sellers request them.',
    },
    {
      question: 'Does it factor in VAT for European sellers?',
      answer: 'Yes, for digital products sold to EU buyers. You can toggle VAT handling on or off depending on whether the platform collects it on your behalf (Gumroad and Etsy do, most self-hosted options do not).',
    },
    {
      question: 'What is reverse pricing?',
      answer: 'You enter the profit you want to keep per sale (for example, $5 net), and the tool tells you exactly what to list the product at on each platform to hit that target. This flips the usual calculator direction and is much more useful when you know your desired margin but are fuzzy on list prices.',
    },
    {
      question: 'Does it integrate with the KDP royalty calculator?',
      answer: 'The KDP column uses the same royalty logic as our standalone [KDP royalty calculator](/tools/kdp-royalty-calculator), so results are consistent between the two tools. Use the royalty calculator when you need a detailed marketplace-by-marketplace KDP view, and use the profit hub when you want to compare KDP to Etsy, Gumroad and TPT in one screen.',
    },
  ],
  internalLinks: [
    { pageType: 'tool', slug: 'profit-hub', anchorText: 'Printable Profit Hub' },
    { pageType: 'tool', slug: 'kdp-royalty-calculator', anchorText: 'KDP Royalty Calculator' },
    { pageType: 'tool', slug: 'kdp-size-calculator', anchorText: 'KDP Cover Size Calculator' },
    { pageType: 'tool', slug: 'niche-finder', anchorText: 'Printable Niche Finder' },
    { pageType: 'guide', slug: 'price-etsy-printables', anchorText: 'How to price Etsy printables' },
    { pageType: 'guide', slug: 'pricing-educational-printables', anchorText: 'Pricing educational printables' },
    { pageType: 'guide', slug: 'kdp-vs-etsy-printables', anchorText: 'KDP vs Etsy comparison' },
    { pageType: 'guide', slug: 'sell-printables-gumroad', anchorText: 'Sell printables on Gumroad' },
  ],
  relatedPosts: [
    { slug: 'free-kdp-royalty-calculator', title: 'We Built a Free KDP Royalty Calculator \u2014 Here is Why' },
    { slug: 'free-kdp-cover-size-calculator', title: 'Free KDP Cover Size Calculator with Interactive Diagram' },
    { slug: 'printable-niche-research-tool', title: '50+ Profitable Printable Niches \u2014 Our Free Research Tool' },
  ],
  cta: {
    heading: 'See Your Real Profit Across 7 Platforms',
    description: 'Enter one product, compare take-home on Etsy, Gumroad, TPT, Payhip, KDP, Creative Market and your own site. Reverse pricing and bundle comparison built in. Free to use.',
    buttonText: 'Open the Printable Profit Hub',
    buttonUrl: '/tools/profit-hub',
  },
};

export default content;
