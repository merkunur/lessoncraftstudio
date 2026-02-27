/**
 * Sales Page Configuration
 *
 * Content and settings for product sales/landing pages.
 * Each sales page maps to a product in warriorplus-products.ts.
 */

export interface SalesPageConfig {
  /** URL slug used in /get/[product] route */
  slug: string;
  /** Product ID from warriorplus-products.ts */
  productId: string;
  /** WarriorPlus checkout URL (empty until product is created) */
  checkoutUrl: string;
  /** Link to the free (watermarked) version of the app */
  freeAppUrl: string;
  /** Hero section */
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustBadges: string[];
  };
  /** Feature grid items */
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  /** How it works steps */
  steps: {
    number: number;
    icon: string;
    title: string;
    description: string;
  }[];
  /** Target audience cards */
  audiences: {
    icon: string;
    title: string;
    description: string;
  }[];
  /** Pricing section */
  pricing: {
    price: number;
    comparePrice: number;
    currency: string;
    label: string;
    includes: string[];
    guarantee: string;
  };
  /** FAQ items */
  faq: {
    question: string;
    answer: string;
  }[];
  /** SEO metadata */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const SALES_PAGES: Record<string, SalesPageConfig> = {
  'word-search': {
    slug: 'word-search',
    productId: 'wordsearch-fe',
    checkoutUrl: '', // Set after WarriorPlus product is created
    freeAppUrl: '/en/apps/word-search-worksheets',
    hero: {
      headline: 'Create Professional Word Search Puzzles in Minutes',
      subheadline: '3,000+ images. Instant PDF export. Full commercial rights.',
      ctaPrimary: 'Get Instant Access',
      ctaSecondary: 'Try Free with Watermark',
      trustBadges: [
        'Watermark-Free Output',
        'Commercial Rights Included',
        'Instant Download Access',
      ],
    },
    features: [
      {
        icon: 'grid',
        title: 'All Grid Sizes (5x5 to 30x30)',
        description: 'Create puzzles for any age group or difficulty level. From simple 5x5 grids for beginners to challenging 30x30 grids for adults.',
      },
      {
        icon: 'images',
        title: '3,000+ Theme Images',
        description: '104 professionally curated image themes: animals, food, vehicles, seasons, holidays, and more. Every puzzle looks unique.',
      },
      {
        icon: 'edit',
        title: 'Full Canvas Editor',
        description: 'Drag, resize, rotate, and layer every element. Add custom text, upload your own images. Complete creative control.',
      },
      {
        icon: 'download',
        title: 'PDF + JPEG Export with Answer Keys',
        description: '300 DPI print-ready files. Answer keys generated automatically. Perfect for Amazon KDP, Etsy digital downloads, or classroom printing.',
      },
      {
        icon: 'type',
        title: '4 Professional Fonts',
        description: 'Choose from 4 carefully selected fonts that look great in print. Clean, readable typography for professional results.',
      },
      {
        icon: 'shield',
        title: 'Full Commercial Rights',
        description: 'Sell on Etsy, Amazon KDP, Teachers Pay Teachers, or anywhere else. No attribution required. No royalties. Yours to sell.',
      },
    ],
    steps: [
      {
        number: 1,
        icon: 'palette',
        title: 'Pick a Theme',
        description: 'Browse 104 image categories. Animals, food, vehicles, nature, holidays — find the perfect theme for your puzzle book.',
      },
      {
        number: 2,
        icon: 'sliders',
        title: 'Customize Your Puzzle',
        description: 'Set grid size, choose fonts, adjust colors, arrange images on the canvas. Make it uniquely yours in under 3 minutes.',
      },
      {
        number: 3,
        icon: 'rocket',
        title: 'Export & Sell',
        description: 'Download print-ready PDF with answer key. Upload to Etsy, Amazon KDP, or Teachers Pay Teachers. Start earning today.',
      },
    ],
    audiences: [
      {
        icon: 'store',
        title: 'Etsy Sellers',
        description: 'Create unique word search puzzle books and digital downloads. Stand out from generic templates with custom-designed puzzles.',
      },
      {
        icon: 'book',
        title: 'Amazon KDP Publishers',
        description: 'Publish activity books with zero design skills. Export KDP-ready PDFs with automatic answer keys included.',
      },
      {
        icon: 'users',
        title: 'Teachers & Parents',
        description: 'Custom puzzles for any subject or theme. Make learning fun with engaging word search activities.',
      },
    ],
    pricing: {
      price: 27,
      comparePrice: 97,
      currency: '$',
      label: 'One-Time Payment',
      includes: [
        'Word Search Generator (all grid sizes)',
        '3,000+ theme images (104 themes)',
        'Canvas editor with full control',
        'PDF + JPEG export with answer keys',
        '4 professional fonts',
        'Watermark-free output',
        'Full commercial/POD/resale rights',
        'Lifetime access — no subscription',
      ],
      guarantee: '30-Day Money-Back Guarantee',
    },
    faq: [
      {
        question: 'Is this a subscription?',
        answer: 'No. This is a one-time payment of $27. You get lifetime access to the Word Search Generator with all features included. No recurring fees, ever.',
      },
      {
        question: 'Can I sell the worksheets I create?',
        answer: 'Yes! Full commercial rights are included. Sell on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, or any other platform. No attribution required.',
      },
      {
        question: 'What formats can I export?',
        answer: 'You can export as high-resolution 300 DPI PDF (perfect for printing and KDP) and JPEG. Answer keys are generated automatically with every puzzle.',
      },
      {
        question: 'How many puzzles can I create?',
        answer: 'Unlimited. There is no cap on how many word search puzzles you can generate. Create as many as you want, forever.',
      },
      {
        question: 'What if I\'m not satisfied?',
        answer: 'We offer a 30-day money-back guarantee. If the Word Search Generator doesn\'t meet your expectations, contact us for a full refund. No questions asked.',
      },
      {
        question: 'Do I need design skills?',
        answer: 'Not at all. The generator handles layout, spacing, and formatting automatically. Just pick a theme, customize your settings, and export. The canvas editor gives you full control if you want to fine-tune, but it\'s completely optional.',
      },
    ],
    seo: {
      title: 'Word Search Generator — Create & Sell Professional Puzzles | $27 One-Time',
      description: 'Create professional word search puzzles in minutes. 3,000+ images, PDF export, answer keys, full commercial rights. Sell on Etsy & Amazon KDP. $27 one-time payment.',
      keywords: 'word search generator, word search maker, word search puzzle creator, printable word search, Etsy word search, KDP word search, commercial word search',
    },
  },
};

/** Look up a sales page by its URL slug */
export function getSalesPage(slug: string): SalesPageConfig | null {
  return SALES_PAGES[slug] ?? null;
}

/** Get all sales page slugs (for generateStaticParams) */
export function getAllSalesPageSlugs(): string[] {
  return Object.keys(SALES_PAGES);
}
