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

  'word-search-pro': {
    slug: 'word-search-pro',
    productId: 'wordsearch-oto1-pro',
    checkoutUrl: '',
    freeAppUrl: '/en/apps/word-search-worksheets',
    hero: {
      headline: 'Unlock Pro Features for Your Word Search Generator',
      subheadline: 'Premium fonts. Themed backgrounds. Grayscale KDP mode. Custom word lists. Take your puzzle output from good to professional.',
      ctaPrimary: 'Upgrade to Pro',
      ctaSecondary: 'See What Pro Unlocks',
      trustBadges: [
        'Works with Your Existing Purchase',
        'Instant Activation',
        'Lifetime Access',
      ],
    },
    features: [
      {
        icon: 'type',
        title: '3 Premium Fonts',
        description: 'Baloo 2, Quicksand, and Fredoka. Playful, modern typefaces that make your puzzles stand out from every other seller on Etsy and KDP.',
      },
      {
        icon: 'images',
        title: 'Themed Backgrounds & Decorative Borders',
        description: 'Professional background themes and decorative border sets. Turn a plain puzzle into a polished product page in one click.',
      },
      {
        icon: 'grid',
        title: 'Grayscale Mode (KDP Print)',
        description: 'One-click grayscale conversion optimized for Amazon KDP interior printing. Saves ink costs and meets KDP print specifications.',
      },
      {
        icon: 'edit',
        title: 'Custom Word Lists',
        description: 'Type any words you want into the puzzle. Create themed puzzles around specific topics, holidays, or brand names. No limits.',
      },
      {
        icon: 'download',
        title: 'Custom Image Upload',
        description: 'Upload your own clipart, logos, or illustrations. Use them alongside the built-in image library for truly unique puzzle designs.',
      },
      {
        icon: 'shield',
        title: 'Reverse Word Placement + Text Effects',
        description: 'Place words backwards and diagonally for harder puzzles. Add text outline/stroke effects for bold, print-friendly typography.',
      },
    ],
    steps: [
      {
        number: 1,
        icon: 'rocket',
        title: 'Instant Activation',
        description: 'Pro features unlock immediately in your Word Search Generator. No separate download, no new software to learn.',
      },
      {
        number: 2,
        icon: 'sliders',
        title: 'New Options Appear',
        description: 'Premium fonts, backgrounds, borders, grayscale mode, and custom word lists all show up in your existing controls.',
      },
      {
        number: 3,
        icon: 'palette',
        title: 'Create Premium Output',
        description: 'Generate puzzles that look like they were designed by a professional graphic designer. More variety, more styles, more sales.',
      },
    ],
    audiences: [
      {
        icon: 'store',
        title: 'Etsy Sellers Who Want to Stand Out',
        description: 'Premium fonts and themed backgrounds make your listings look different from everyone else using generic templates.',
      },
      {
        icon: 'book',
        title: 'KDP Publishers Who Need Print-Ready Files',
        description: 'Grayscale mode produces KDP-compliant interior pages. Custom page sizes match any trim size Amazon offers.',
      },
      {
        icon: 'users',
        title: 'Power Users Who Want Full Control',
        description: 'Custom word lists, image uploads, and text effects give you complete creative freedom over every puzzle.',
      },
    ],
    pricing: {
      price: 37,
      comparePrice: 97,
      currency: '$',
      label: 'One-Time Upgrade',
      includes: [
        '3 premium fonts (Baloo 2, Quicksand, Fredoka)',
        'Themed backgrounds collection',
        'Decorative border sets',
        'Grayscale mode for KDP print',
        'Custom word lists (type any words)',
        'Custom image upload (your own clipart/logos)',
        'Reverse word placement (harder puzzles)',
        'Text outline/stroke effects',
        'Custom page sizes (any dimension)',
        'Manual image name editing',
      ],
      guarantee: '30-Day Money-Back Guarantee',
    },
    faq: [
      {
        question: 'Do I need the Word Search Generator to use this?',
        answer: 'Yes. The Pro Features Pack is an upgrade that unlocks additional capabilities in your Word Search Generator. It requires the base product.',
      },
      {
        question: 'How do the premium fonts help?',
        answer: 'The 3 premium fonts (Baloo 2, Quicksand, Fredoka) are playful, modern typefaces designed for children\'s content. They make your puzzles look professionally designed rather than generic.',
      },
      {
        question: 'What is grayscale mode for?',
        answer: 'Amazon KDP prints interior pages in black and white. Grayscale mode converts your puzzle to print-optimized grayscale with one click, so images look sharp when printed in B&W instead of muddy.',
      },
      {
        question: 'Can I upload my own images?',
        answer: 'Yes. Upload any PNG, JPEG, or SVG file. Use your own clipart, logos, brand images, or illustrations alongside the built-in image library.',
      },
      {
        question: 'What are custom word lists?',
        answer: 'Instead of using auto-generated words from image names, you can type any words you want. Create themed puzzles around specific topics like "Halloween Words" or "Space Vocabulary" with complete control.',
      },
    ],
    seo: {
      title: 'Word Search Pro Features — Premium Fonts, KDP Mode, Custom Content | $37',
      description: 'Upgrade your Word Search Generator with premium fonts, themed backgrounds, grayscale KDP mode, custom word lists, and image upload. $37 one-time.',
      keywords: 'word search pro, premium word search, KDP word search, custom word search, word search upgrade',
    },
  },

  'word-search-library': {
    slug: 'word-search-library',
    productId: 'wordsearch-oto2-library',
    checkoutUrl: '',
    freeAppUrl: '/en/apps/word-search-worksheets',
    hero: {
      headline: 'Unlock the Complete Image Library + All 11 Languages',
      subheadline: '104 image themes. 3,000+ images. 11 languages with automatic puzzle generation. Create puzzles for any market on Earth.',
      ctaPrimary: 'Unlock Everything',
      ctaSecondary: 'See All 104 Themes',
      trustBadges: [
        '3,000+ Professional Images',
        '11 Languages Built-In',
        'Instant Activation',
      ],
    },
    features: [
      {
        icon: 'images',
        title: '104 Image Themes (3,000+ Images)',
        description: 'Animals, vehicles, food, holidays, seasons, sports, space, ocean life, dinosaurs, nature, and 94 more categories. Every theme has 15-40 curated, child-friendly images.',
      },
      {
        icon: 'grid',
        title: '11 Languages with Auto-Generation',
        description: 'English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish. Select a language and the app generates puzzles with correct alphabet and translated image names.',
      },
      {
        icon: 'shield',
        title: 'Sell in Any Market Worldwide',
        description: 'Create German word search books for Amazon.de. French puzzles for Etsy France. Spanish activity books for the US Hispanic market. One tool, global reach.',
      },
      {
        icon: 'edit',
        title: 'Automatic Alphabet Handling',
        description: 'Each language uses its correct alphabet for the puzzle grid. German grids include umlauts. Scandinavian grids include special characters. All automatic.',
      },
      {
        icon: 'download',
        title: 'Translated Image Names',
        description: 'Select "Animals" in French and images display as chat, chien, oiseau. The words placed in the grid match the selected language. Zero translation work.',
      },
      {
        icon: 'type',
        title: '10x More Content Variety',
        description: 'Go from 10 themes to 104. Create hundreds of unique puzzle books across seasons, holidays, educational topics, and niche interests. Never repeat a theme.',
      },
    ],
    steps: [
      {
        number: 1,
        icon: 'rocket',
        title: 'Instant Library Unlock',
        description: 'All 104 themes and 11 languages activate immediately. The theme dropdown expands from 10 categories to 104.',
      },
      {
        number: 2,
        icon: 'palette',
        title: 'Pick Any Theme, Any Language',
        description: 'Select "Dinosaurs" in German, "Ocean Life" in French, or "Christmas" in Spanish. The app handles everything automatically.',
      },
      {
        number: 3,
        icon: 'sliders',
        title: 'Dominate Multiple Markets',
        description: 'Publish word search books in 11 languages on Amazon KDP. Create Etsy listings for international customers. 10x your addressable market.',
      },
    ],
    audiences: [
      {
        icon: 'book',
        title: 'KDP Publishers Going International',
        description: 'Amazon has 16 marketplaces worldwide. Publish activity books in German, French, Spanish, Italian, and more. Same tool, new revenue streams.',
      },
      {
        icon: 'store',
        title: 'Etsy Sellers Who Want More Variety',
        description: '104 themes means you never run out of ideas. Create niche puzzle books for specific interests: dinosaurs, ocean life, space, camping, cooking, and 99 more.',
      },
      {
        icon: 'users',
        title: 'Content Creators at Scale',
        description: 'With 3,000+ images across 104 themes and 11 languages, you can create thousands of unique puzzle products. Build a catalog that generates passive income.',
      },
    ],
    pricing: {
      price: 47,
      comparePrice: 197,
      currency: '$',
      label: 'One-Time Upgrade',
      includes: [
        'Complete image library (104 themes, 3,000+ images)',
        'All 11 languages with auto-generation',
        'Automatic alphabet handling per language',
        'Translated image names in all languages',
        'Seasonal themes (Christmas, Easter, Halloween, etc.)',
        'Educational themes (classroom, body parts, shapes, etc.)',
        'Niche themes (space, dinosaurs, camping, music, etc.)',
        'Lifetime access to all future theme additions',
      ],
      guarantee: '30-Day Money-Back Guarantee',
    },
    faq: [
      {
        question: 'How does the multi-language feature work?',
        answer: 'Select a language from the dropdown. The app loads image names in that language (e.g., "cat" becomes "chat" in French, "Katze" in German). The puzzle grid uses the correct alphabet for that language, including special characters like umlauts and accented letters.',
      },
      {
        question: 'How many themes are included?',
        answer: '104 themes with 3,000+ total images. This includes animals, vehicles, food, fruits, vegetables, flowers, ocean life, dinosaurs, space, weather, sports, holidays (Christmas, Easter, Valentine\'s), seasons, educational topics, and dozens more.',
      },
      {
        question: 'Do I need the base Word Search Generator?',
        answer: 'Yes. The Complete Library + Languages upgrade expands the content available in your Word Search Generator. It requires the base product.',
      },
      {
        question: 'Which languages are supported?',
        answer: 'English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Each language includes translated image names and correct alphabet support.',
      },
      {
        question: 'Can I really sell in multiple languages?',
        answer: 'Absolutely. Your commercial license covers all languages. Create a German word search book, a French one, and a Spanish one — all from the same tool, all ready to sell on their respective Amazon marketplaces or Etsy.',
      },
    ],
    seo: {
      title: 'Complete Image Library + 11 Languages | Word Search Generator Upgrade | $47',
      description: 'Unlock 104 image themes (3,000+ images) and all 11 languages for your Word Search Generator. Auto-generate puzzles in any language. $47 one-time.',
      keywords: 'word search image library, multilingual word search, word search languages, word search themes, complete word search',
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
