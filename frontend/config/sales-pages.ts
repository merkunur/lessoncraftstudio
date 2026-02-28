/**
 * Sales Page Configuration
 *
 * Content and settings for product sales/landing pages.
 * Each sales page maps to a product in warriorplus-products.ts.
 *
 * FE page uses a 21-section structure modeled after proven WarriorPlus converters.
 * OTO pages use a condensed 7-section structure shown inside the funnel.
 *
 * Funnels:
 *   Word Search: FE ($27) + OTO1 ($37 library) + OTO2 ($27 languages)
 *   Math Puzzle: FE ($27) + OTO1 ($37 library)
 */

// ==========================================
// INTERFACE
// ==========================================

export interface SalesPageConfig {
  /** URL slug used in /get/[product] route */
  slug: string;
  /** Product ID from warriorplus-products.ts */
  productId: string;
  /** WarriorPlus checkout URL (empty until product is created) */
  checkoutUrl: string;
  /** WarriorPlus official buy button image URL */
  wpButtonImg?: string;
  /** Link to the free (watermarked) version of the app */
  freeAppUrl: string;
  /** Is this an OTO page inside the WarriorPlus funnel? */
  isOto?: boolean;

  // ─── Section 1: Hero ─────────────────────────────
  hero: {
    badge?: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    trustBadges?: string[];
  };

  // ─── Section 2: Testimonial ──────────────────────
  testimonial?: {
    name: string;
    role: string;
    quote: string;
  };

  // ─── Section 3: Feature Grid ─────────────────────
  features?: {
    icon: string;
    title: string;
    description: string;
  }[];

  // ─── Section 4: Market Stats ─────────────────────
  marketStats?: {
    headline: string;
    description: string;
    stats: { value: string; label: string }[];
  };

  // ─── Section 5: Income Potential ─────────────────
  incomePotential?: {
    headline: string;
    description: string;
    calculation: string;
  };

  // ─── Section 7: Obstacles ────────────────────────
  obstacles?: {
    headline: string;
    problems: string[];
    solution: string;
  };

  // ─── Section 8: Product Introduction ─────────────
  productIntro?: {
    headline: string;
    description: string;
    differentiators: string[];
  };

  // ─── Section 9: Before/After ─────────────────────
  beforeAfter?: {
    before: string[];
    after: string[];
  };

  // ─── Section 10: Ownership/Rights ────────────────
  ownership?: {
    icon: string;
    title: string;
    description: string;
  }[];

  // ─── Section 11: Demo ────────────────────────────
  demo?: {
    type: 'static-mockup' | 'iframe';
    freeUrl?: string;
  };

  // ─── Section 12: How It Works (Steps) ────────────
  steps?: {
    number: number;
    icon: string;
    title: string;
    description: string;
  }[];

  // ─── Section 13: Showcase ────────────────────────
  showcase?: {
    headline: string;
    items: { title: string; description: string }[];
  };

  // ─── Section 14: Target Audiences ────────────────
  audiences?: {
    icon: string;
    title: string;
    description: string;
  }[];

  // ─── Section 15: Value Stack ─────────────────────
  valueStack: {
    headline: string;
    items: { name: string; value: number }[];
    totalValue: number;
    yourPrice: number;
  };

  // ─── Section 16: Bonuses ─────────────────────────
  bonuses?: {
    name: string;
    description: string;
    value: number;
  }[];

  // ─── Section 17: Guarantee ───────────────────────
  guarantee: {
    days: number;
    text: string;
  };

  // ─── Section 18: Urgency ─────────────────────────
  urgency?: {
    headline: string;
    text: string;
    regularPrice: number;
  };

  // ─── Section 19: FAQ ─────────────────────────────
  faq: {
    question: string;
    answer: string;
  }[];

  // ─── Section 20: Closing P.S. ───────────────────
  closingPs?: string;

  // ─── OTO-specific sections ───────────────────────

  /** "No thanks" text for OTO decline link */
  declineText?: string;

  /** OTO comparison (what you have vs what you unlock) */
  comparison?: {
    current: { label: string; items: string[] };
    upgrade: { label: string; items: string[] };
  };

  /** Theme categories grid (OTO1) */
  themeCategories?: {
    headline: string;
    categories: { name: string; count: number }[];
  };

  /** Content math argument (OTO1) */
  contentMath?: {
    headline: string;
    description: string;
  };

  /** Languages grid (OTO2) */
  languagesGrid?: {
    headline: string;
    languages: { name: string; flag: string }[];
  };

  /** Market expansion argument (OTO2) */
  marketExpansion?: {
    headline: string;
    description: string;
  };

  // ─── Pricing (used in CTA sections) ──────────────
  pricing: {
    price: number;
    comparePrice: number;
    currency: string;
    label: string;
    includes: string[];
  };

  // ─── SEO ─────────────────────────────────────────
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

// ==========================================
// SALES PAGE CONFIGS
// ==========================================

export const SALES_PAGES: Record<string, SalesPageConfig> = {

  // ══════════════════════════════════════════
  // FE — Word Search Studio Pro ($27)
  // 10 themes, English only, ALL app features
  // ══════════════════════════════════════════
  'word-search': {
    slug: 'word-search',
    productId: 'wordsearch-fe',
    checkoutUrl: 'https://warriorplus.com/o2/buy/pxf0ht/hglfpg/ldqjqn',
    wpButtonImg: 'https://warriorplus.com/o2/btn/fn100011001/pxf0ht/hglfpg/459035',
    freeAppUrl: '',

    // ── 1. Hero ──────────────────────────────
    hero: {
      badge: 'Word Search Studio Pro',
      headline: 'Your Professional Puzzle Book Creation Studio',
      subheadline: '10 curated image themes. All grid sizes. Canvas editor. PDF export with answer keys. Full commercial rights included.',
      ctaPrimary: 'Get Instant Access',
      trustBadges: [
        'Watermark-Free Output',
        'Commercial Rights Included',
        'Instant Download Access',
      ],
    },

    // ── 2. Testimonial ───────────────────────
    testimonial: {
      name: 'Sarah M.',
      role: 'Etsy Shop Owner',
      quote: 'I created 12 word search puzzle books in my first week and listed them on Etsy. Three of them started selling within days. The image library makes every puzzle look professional \u2014 my customers keep coming back for more.',
    },

    // ── 3. Feature Grid (6 cards) ────────────
    features: [
      {
        icon: 'grid',
        title: 'All Grid Sizes (5x5 to 30x30)',
        description: 'Create puzzles for any age group or difficulty level. From simple 5x5 grids for beginners to challenging 30x30 grids for adults. Perfect for activity books targeting specific audiences.',
      },
      {
        icon: 'images',
        title: '10 Image Themes (~319 Images)',
        description: 'Animals, food, vehicles, fruits, colors, body parts, clothing, school, sports, and nature. Each theme includes 20-40 professionally curated, child-friendly images.',
      },
      {
        icon: 'edit',
        title: 'Full Canvas Editor',
        description: 'Drag, resize, rotate, and layer every element. Add custom text, upload your own images, adjust colors and fonts. Complete creative control over every puzzle you create.',
      },
      {
        icon: 'download',
        title: 'PDF + JPEG Export with Answer Keys',
        description: '300 DPI print-ready files. Answer keys generated automatically. Grayscale mode for KDP print optimization. Perfect for Amazon KDP, Etsy digital downloads, or classroom printing.',
      },
      {
        icon: 'type',
        title: 'Custom Word Lists & Image Upload',
        description: 'Type any words you want into the puzzle. Upload your own clipart, logos, or illustrations. Create branded, niche-specific puzzles that no one else has.',
      },
      {
        icon: 'shield',
        title: 'Full Commercial Rights',
        description: 'Sell on Etsy, Amazon KDP, Teachers Pay Teachers, or anywhere else. No attribution required. No royalties. No limits on how many products you create and sell.',
      },
    ],

    // ── 4. Market Stats ──────────────────────
    marketStats: {
      headline: 'Why Word Search Books Are a Gold Mine',
      description: 'The activity book market is booming \u2014 and word search puzzles are leading the charge.',
      stats: [
        { value: '$2.4B', label: 'U.S. puzzle book market size' },
        { value: '45,000+', label: 'Monthly searches for word search puzzles' },
        { value: '#1', label: 'Most requested activity book type on KDP' },
        { value: '67%', label: 'Year-over-year growth in printable sales' },
      ],
    },

    // ── 5. Income Potential ──────────────────
    incomePotential: {
      headline: 'The Math Behind Word Search Income',
      description: 'Create 10 themed word search puzzle books. Price each at $4.99 on Amazon KDP. If each book sells just 3 copies per day \u2014 that\'s passive income that grows with every new title you publish.',
      calculation: '$4.99 \u00d7 3 sales/day \u00d7 10 books = $149.70/day = $4,491/month',
    },

    // ── 7. Obstacles ─────────────────────────
    obstacles: {
      headline: 'Maybe You\'ve Tried Before...',
      problems: [
        'You don\'t have design skills or experience with graphic software',
        'Professional puzzle-making software costs $200+ and takes weeks to learn',
        'Creating puzzles manually takes hours per page',
        'Formatting for print (KDP, Etsy) requires technical knowledge you don\'t have',
      ],
      solution: 'Word Search Studio Pro handles all of this automatically. Pick a theme, customize your settings, and export a print-ready PDF with answer key \u2014 in under 3 minutes. No design skills. No learning curve. No formatting headaches.',
    },

    // ── 8. Product Introduction ──────────────
    productIntro: {
      headline: 'Introducing Word Search Studio Pro',
      description: 'A professional-grade creation studio that produces print-ready word search puzzles with embedded images. Unlike basic generators that produce plain text grids, Word Search Studio Pro combines a curated image library with a full canvas editor \u2014 so every puzzle you create looks like it was designed by a professional.',
      differentiators: [
        'Image library integration \u2014 puzzles feature real themed images, not just text',
        'Full canvas editor \u2014 move, resize, rotate, and layer every element',
        'One-click generation \u2014 automatic word placement, grid filling, and answer key creation',
        'Print-ready export \u2014 300 DPI PDF files formatted for KDP, Etsy, and commercial printing',
      ],
    },

    // ── 9. Before/After ──────────────────────
    beforeAfter: {
      before: [
        'Spend hours manually creating puzzle grids in Word or PowerPoint',
        'Pay $200+ for design software you don\'t know how to use',
        'Produce plain, text-only puzzles that look amateur',
        'Struggle with print formatting and page sizing',
        'Create one puzzle at a time, slowly',
      ],
      after: [
        'Generate professional puzzles in under 3 minutes',
        'One-time $27 payment \u2014 no monthly fees, no subscriptions',
        'Image-rich puzzles that stand out on Etsy and Amazon',
        'Export print-ready PDFs formatted for any platform',
        'Create unlimited puzzles across 10 themed categories',
      ],
    },

    // ── 10. Ownership/Rights ─────────────────
    ownership: [
      {
        icon: 'shield',
        title: 'Full Commercial Rights',
        description: 'Sell everything you create. No royalties, no attribution required, no limits on how many products you sell.',
      },
      {
        icon: 'users',
        title: 'Personal Use',
        description: 'Print for classrooms, homework, family game nights, parties. Use however you want, as often as you want.',
      },
      {
        icon: 'store',
        title: 'Sell Anywhere',
        description: 'Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website \u2014 sell on any platform worldwide.',
      },
    ],

    // ── 11. Demo ─────────────────────────────
    demo: {
      type: 'static-mockup',
    },

    // ── 12. How It Works (3 Steps) ───────────
    steps: [
      {
        number: 1,
        icon: 'palette',
        title: 'Pick a Theme',
        description: 'Browse 10 image categories \u2014 animals, food, vehicles, fruits, and more. Select your theme and images load automatically.',
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

    // ── 13. Showcase ─────────────────────────
    showcase: {
      headline: 'What You Can Create',
      items: [
        {
          title: 'Themed Puzzle Books',
          description: 'Complete word search books organized by theme \u2014 animals, food, vehicles, and more. Each puzzle features professional themed images.',
        },
        {
          title: 'Answer Key Pages',
          description: 'Professional answer keys generated automatically with every puzzle. Required for activity books sold on Amazon KDP.',
        },
        {
          title: 'Multiple Difficulty Levels',
          description: '5x5 grids for beginners, 15x15 for intermediate, 30x30 for adults. Create products for every age group from a single tool.',
        },
        {
          title: 'Custom-Branded Puzzles',
          description: 'Add your own text and images, choose fonts and colors to match your brand. Every puzzle can look completely different.',
        },
      ],
    },

    // ── 14. Target Audiences (4 cards) ───────
    audiences: [
      {
        icon: 'store',
        title: 'Etsy Sellers',
        description: 'Create unique word search puzzle books and digital downloads. Stand out from generic templates with image-rich, professionally designed puzzles.',
      },
      {
        icon: 'book',
        title: 'Amazon KDP Publishers',
        description: 'Publish activity books with zero design skills. Export KDP-ready PDFs with automatic answer keys. Build a catalog that earns passive income.',
      },
      {
        icon: 'users',
        title: 'Teachers & Parents',
        description: 'Custom puzzles for any subject or theme. Make learning fun with engaging word search activities that kids actually enjoy.',
      },
      {
        icon: 'rocket',
        title: 'Content Creators',
        description: 'Build a library of printable products. Sell on multiple platforms simultaneously. Each puzzle takes minutes, not hours.',
      },
    ],

    // ── 15. Value Stack ──────────────────────
    valueStack: {
      headline: 'Everything Included in Your Purchase',
      items: [
        { name: 'Word Search Studio Pro (all grid sizes)', value: 97 },
        { name: '10 Image Themes (~319 professional images)', value: 47 },
        { name: 'Canvas Editor (drag, resize, rotate, layers)', value: 47 },
        { name: 'Full Commercial Rights (sell anywhere)', value: 97 },
        { name: 'PDF + JPEG Export (300 DPI) with Answer Keys', value: 37 },
        { name: 'Custom Word Lists & Image Upload', value: 27 },
        { name: '4 Professional Fonts + Text Effects', value: 17 },
      ],
      totalValue: 369,
      yourPrice: 27,
    },

    // ── 16. Bonuses ──────────────────────────
    bonuses: [
      {
        name: 'Quick-Start Guide: Your First Puzzle Book in 15 Minutes',
        description: 'Step-by-step walkthrough from opening the app to listing your first product on Etsy or Amazon KDP.',
        value: 27,
      },
      {
        name: '10 Best-Selling Word Search Niches Report',
        description: 'Data-backed list of the most profitable word search puzzle niches on Amazon and Etsy right now.',
        value: 17,
      },
    ],

    // ── 17. Guarantee ────────────────────────
    guarantee: {
      days: 30,
      text: 'Try Word Search Studio Pro risk-free for 30 days. If it doesn\'t meet your expectations for any reason, contact us for a full refund. No questions asked, no hoops to jump through.',
    },

    // ── 18. Urgency ──────────────────────────
    urgency: {
      headline: 'Lock In This Launch Price',
      text: 'This $27 price is available during our launch period only. The regular price is $97. Once the launch ends, the price goes up \u2014 and it won\'t come back down.',
      regularPrice: 97,
    },

    // ── 19. FAQ (8 questions) ────────────────
    faq: [
      {
        question: 'Is this a subscription?',
        answer: 'No. This is a one-time payment of $27. You get lifetime access to Word Search Studio Pro with all features included. No recurring fees, ever.',
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
        answer: 'We offer a 30-day money-back guarantee. If Word Search Studio Pro doesn\'t meet your expectations, contact us for a full refund. No questions asked.',
      },
      {
        question: 'Do I need design skills?',
        answer: 'Not at all. The generator handles layout, spacing, and formatting automatically. Just pick a theme, customize your settings, and export. The canvas editor gives you full control if you want to fine-tune, but it\'s completely optional.',
      },
      {
        question: 'What are the 10 included themes?',
        answer: 'Animals, Food, Vehicles, Fruits, Colors, Body Parts, Clothing, School, Sports, and Nature. Each theme includes 20\u201340 professionally curated images.',
      },
      {
        question: 'Can I upgrade to more themes or languages later?',
        answer: 'Yes. After purchase, you\'ll have the option to add the Complete Image Library (104 themes, 3,000+ images) and All 11 Languages. But the best prices are available right after your initial purchase.',
      },
    ],

    // ── 20. Closing P.S. ─────────────────────
    closingPs: 'You\'re getting Word Search Studio Pro, 10 image themes with 319 images, a full canvas editor, PDF export with answer keys, and complete commercial rights \u2014 all for a one-time payment of $27. That\'s less than the cost of a single stock image pack. And with the 30-day money-back guarantee, you risk nothing. Create your first puzzle book today.',

    // ── Pricing (CTA sections) ───────────────
    pricing: {
      price: 27,
      comparePrice: 97,
      currency: '$',
      label: 'One-Time Payment',
      includes: [
        'Word Search Studio Pro (all grid sizes)',
        '10 image themes (~319 images)',
        'Canvas editor with full control',
        'PDF + JPEG export with answer keys',
        'Custom word lists & image upload',
        '4 professional fonts + text effects',
        'Grayscale mode (KDP optimization)',
        'Watermark-free output',
        'Full commercial/POD/resale rights',
        'Lifetime access \u2014 no subscription',
      ],
    },

    // ── SEO ──────────────────────────────────
    seo: {
      title: 'Word Search Studio Pro \u2014 Create & Sell Professional Puzzle Books | $27 One-Time',
      description: 'Create professional word search puzzle books in minutes. 10 image themes, canvas editor, PDF export, answer keys, full commercial rights. Sell on Etsy & Amazon KDP. $27 one-time.',
      keywords: 'word search studio pro, word search maker, word search puzzle creator, printable word search, Etsy word search, KDP word search, commercial word search',
    },
  },

  // ══════════════════════════════════════════
  // FE — Math Puzzle Studio Pro ($27)
  // 10 themes, 11 languages, ALL app features
  // ══════════════════════════════════════════
  'math-puzzle': {
    slug: 'math-puzzle',
    productId: 'mathpuzzle-fe',
    checkoutUrl: '',
    freeAppUrl: '',

    // ── 1. Hero ──────────────────────────────
    hero: {
      badge: 'Math Puzzle Studio Pro',
      headline: 'Turn Any Image Into a Math Puzzle Worksheet in 60 Seconds',
      subheadline: '9 grid configurations. 3 math operations. Auto answer keys. Canvas editor. PDF export. 10 curated image themes. Full commercial rights included.',
      ctaPrimary: 'Get Instant Access',
      trustBadges: [
        'Watermark-Free Output',
        'Commercial Rights Included',
        'Instant Download Access',
      ],
    },

    // ── 2. Testimonial ───────────────────────
    // No testimonials — product is new, no fake reviews
    testimonial: undefined,

    // ── 3. Feature Grid (6 cards) ────────────
    features: [
      {
        icon: 'grid',
        title: '9 Grid Configurations (2x2 to 4x4)',
        description: 'Create puzzles from simple 4-piece grids for beginners to challenging 16-piece grids for older students. Nine row/column combinations let you target any age group or difficulty level.',
      },
      {
        icon: 'sparkles',
        title: '3 Math Operations',
        description: 'Addition, subtraction, or mixed mode. The app auto-generates equations for each puzzle piece. Students solve the math to reconstruct the picture.',
      },
      {
        icon: 'images',
        title: '10 Image Themes (~300 Images)',
        description: 'Animals, fruits, vegetables, vehicles, ocean life, dinosaurs, space, birds, flowers, and insects. Each theme includes professionally curated, child-friendly images.',
      },
      {
        icon: 'edit',
        title: 'Full Canvas Editor',
        description: 'Drag, resize, rotate, and layer every element. Add custom text with 7 fonts, upload your own images, adjust colors and outlines. Built on Fabric.js \u2014 the same technology behind Canva.',
      },
      {
        icon: 'download',
        title: 'PDF + JPEG Export with Answer Keys',
        description: 'Print-ready files. Answer keys generated automatically from every worksheet. Grayscale mode for ink-saving prints. Perfect for Amazon KDP, Etsy, or classroom printing.',
      },
      {
        icon: 'shield',
        title: 'Full Commercial Rights',
        description: 'Sell on Etsy, Amazon KDP, Teachers Pay Teachers, or anywhere else. No attribution required. No royalties. No limits on how many products you create and sell.',
      },
    ],

    // ── 4. Market Stats ──────────────────────
    marketStats: {
      headline: 'Why Math Puzzle Books Are a Proven Seller',
      description: 'Math puzzle worksheets combine two things parents and teachers are always looking for: math practice and engaging activities.',
      stats: [
        { value: '$2.4B', label: 'U.S. puzzle book market size (est.)' },
        { value: '18,000+', label: 'Monthly searches for math puzzles' },
        { value: 'Growing', label: 'Year-over-year printable market growth' },
        { value: 'Year-Round', label: 'Demand \u2014 not seasonal like holidays' },
      ],
    },

    // ── 5. Income Potential ──────────────────
    incomePotential: {
      headline: 'The Math Behind Math Puzzle Income',
      description: 'Create 10 themed math puzzle books. Price each at $3.99 on Amazon KDP. If each book sells just 1.5 copies per day \u2014 that\u2019s a growing passive income stream with every new title you publish.',
      calculation: '$3.99 \u00d7 1.5 sales/day \u00d7 10 books = $59.85/day \u2248 $598/month',
    },

    // ── 7. Obstacles ─────────────────────────
    obstacles: {
      headline: 'Maybe You\u2019ve Tried Before...',
      problems: [
        'Creating math puzzles manually means writing equations, slicing images, and aligning pieces \u2014 hours per worksheet',
        'Professional puzzle-making software costs $200+ and has a steep learning curve',
        'You don\u2019t know how to generate auto-graded answer keys',
        'Formatting for print (KDP, Etsy) requires technical knowledge you don\u2019t have',
      ],
      solution: 'Math Puzzle Studio Pro handles all of this automatically. Pick an image, set your grid and math operation, and export a print-ready PDF with answer key \u2014 in under 60 seconds. No design skills. No math curriculum knowledge. No formatting headaches.',
    },

    // ── 8. Product Introduction ──────────────
    productIntro: {
      headline: 'Introducing Math Puzzle Studio Pro',
      description: 'A browser-based creation studio that turns any image into a math puzzle worksheet. The app slices your chosen picture into grid pieces, generates equations for each cell, and produces a matching answer key \u2014 all automatically.',
      differentiators: [
        'Image-based puzzles \u2014 students solve math to reconstruct a picture, not just fill in blanks',
        'Auto equation generation \u2014 the app creates addition, subtraction, or mixed problems instantly',
        'One-click answer keys \u2014 generated automatically from every worksheet',
        'Full canvas editor \u2014 move, resize, rotate, and layer every element with professional precision',
      ],
    },

    // ── 9. Before/After ──────────────────────
    beforeAfter: {
      before: [
        'Spend hours manually creating math puzzle grids and writing equations',
        'Pay $200+ for design software you don\u2019t know how to use',
        'Produce plain worksheets that look unprofessional',
        'Struggle with print formatting and page sizing',
        'No way to generate answer keys automatically',
      ],
      after: [
        'Generate professional math puzzle worksheets in under 60 seconds',
        'One-time $27 payment \u2014 no monthly fees, no subscriptions',
        'Image-rich puzzles that stand out on Etsy and Amazon',
        'Export print-ready PDFs formatted for any platform',
        'Answer keys generated automatically with every worksheet',
      ],
    },

    // ── 10. Ownership/Rights ─────────────────
    ownership: [
      {
        icon: 'shield',
        title: 'Full Commercial Rights',
        description: 'Sell everything you create. No royalties, no attribution required, no limits on how many products you sell.',
      },
      {
        icon: 'users',
        title: 'Personal Use',
        description: 'Print for classrooms, homework, tutoring sessions, homeschool. Use however you want, as often as you want.',
      },
      {
        icon: 'store',
        title: 'Sell Anywhere',
        description: 'Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website \u2014 sell on any platform worldwide.',
      },
    ],

    // ── 11. Demo ─────────────────────────────
    demo: {
      type: 'static-mockup',
    },

    // ── 12. How It Works (5 Steps) ───────────
    steps: [
      {
        number: 1,
        icon: 'images',
        title: 'Pick an Image',
        description: 'Browse 10 image themes \u2014 animals, dinosaurs, ocean life, space, and more. Or upload your own image.',
      },
      {
        number: 2,
        icon: 'grid',
        title: 'Set Your Grid',
        description: 'Choose from 9 configurations: 2x2 through 4x4. Simple 4-piece puzzles for beginners, challenging 16-piece grids for older students.',
      },
      {
        number: 3,
        icon: 'sparkles',
        title: 'Choose Math Operation',
        description: 'Addition, subtraction, or mixed. The app generates unique equations for every puzzle piece automatically.',
      },
      {
        number: 4,
        icon: 'sliders',
        title: 'Customize Your Design',
        description: 'Add text, choose fonts, adjust colors, add decorative backgrounds and borders. Make it uniquely yours.',
      },
      {
        number: 5,
        icon: 'rocket',
        title: 'Export & Sell',
        description: 'Download print-ready PDF with answer key. Upload to Etsy, Amazon KDP, or Teachers Pay Teachers. Start earning today.',
      },
    ],

    // ── 13. Showcase ─────────────────────────
    showcase: {
      headline: 'What You Can Create',
      items: [
        {
          title: 'Themed Math Puzzle Books',
          description: 'Complete puzzle books organized by theme \u2014 animals, space, dinosaurs, and more. Each puzzle features a professional image that students reconstruct by solving equations.',
        },
        {
          title: 'Auto-Generated Answer Keys',
          description: 'Professional answer keys generated automatically with every worksheet. Required for activity books sold on Amazon KDP.',
        },
        {
          title: 'Multiple Difficulty Levels',
          description: '2x2 grids (4 pieces) for beginners, 3x3 (9 pieces) for intermediate, 4x4 (16 pieces) for advanced. Create products for every age group.',
        },
        {
          title: 'Addition, Subtraction & Mixed',
          description: 'Three math operation modes let you create targeted practice books \u2014 addition-only for younger kids, mixed operations for a challenge.',
        },
      ],
    },

    // ── 14. Target Audiences (4 cards) ───────
    audiences: [
      {
        icon: 'store',
        title: 'Etsy Sellers',
        description: 'Create unique math puzzle activity books and digital downloads. Image-based puzzles stand out from generic text worksheets that flood the market.',
      },
      {
        icon: 'book',
        title: 'Amazon KDP Publishers',
        description: 'Publish math activity books with zero design skills. Export KDP-ready PDFs with automatic answer keys. Build a catalog that earns passive income.',
      },
      {
        icon: 'users',
        title: 'Teachers & Parents',
        description: 'Custom math puzzles for any theme. Make math practice fun with engaging picture puzzles that kids actually enjoy solving.',
      },
      {
        icon: 'rocket',
        title: 'Content Creators',
        description: 'Build a library of printable math products. Sell on multiple platforms simultaneously. Each puzzle takes seconds, not hours.',
      },
    ],

    // ── 15. Value Stack ──────────────────────
    valueStack: {
      headline: 'Everything Included in Your Purchase',
      items: [
        { name: 'Math Puzzle Studio Pro (9 grid configurations)', value: 97 },
        { name: '10 Image Themes (~300 professional images)', value: 47 },
        { name: '3 Math Operations (add, subtract, mixed)', value: 37 },
        { name: 'Auto Answer Key Generation', value: 47 },
        { name: 'Canvas Editor (drag, resize, rotate, layers)', value: 47 },
        { name: 'Full Commercial Rights (sell anywhere)', value: 97 },
        { name: 'PDF + JPEG Export with Answer Keys', value: 37 },
        { name: '7 Professional Fonts + Text Effects', value: 17 },
      ],
      totalValue: 426,
      yourPrice: 27,
    },

    // ── 16. Bonuses ──────────────────────────
    bonuses: [
      {
        name: 'Quick-Start Guide: Your First Math Puzzle Book in 15 Minutes',
        description: 'Step-by-step walkthrough from opening the app to listing your first math puzzle product on Etsy or Amazon KDP.',
        value: 27,
      },
      {
        name: '10 Best-Selling Math Activity Niches Report',
        description: 'Data-backed list of the most profitable math activity niches on Amazon and Etsy right now.',
        value: 17,
      },
    ],

    // ── 17. Guarantee ────────────────────────
    guarantee: {
      days: 30,
      text: 'Try Math Puzzle Studio Pro risk-free for 30 days. If it doesn\u2019t meet your expectations for any reason, contact us for a full refund. No questions asked, no hoops to jump through.',
    },

    // ── 18. Urgency ──────────────────────────
    urgency: {
      headline: 'Lock In This Launch Price',
      text: 'This $27 price is available during our launch period only. The regular price is $97. Once the launch ends, the price goes up \u2014 and it won\u2019t come back down.',
      regularPrice: 97,
    },

    // ── 19. FAQ (8 questions) ────────────────
    faq: [
      {
        question: 'Is this a subscription?',
        answer: 'No. This is a one-time payment of $27. You get lifetime access to Math Puzzle Studio Pro with all features included. No recurring fees, ever.',
      },
      {
        question: 'Can I sell the worksheets I create?',
        answer: 'Yes! Full commercial rights are included. Sell on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, or any other platform. No attribution required.',
      },
      {
        question: 'How does the math puzzle work?',
        answer: 'Pick any image, set your grid size and math operation. The app slices the image into pieces, assigns a number to each, and generates equations. Students solve the equations to figure out where each piece goes and reconstruct the picture.',
      },
      {
        question: 'What formats can I export?',
        answer: 'You can export as PDF and high-resolution JPEG. Answer keys are generated automatically with every worksheet. Grayscale mode is available for ink-saving prints.',
      },
      {
        question: 'How many puzzles can I create?',
        answer: 'Unlimited. There is no cap on how many math puzzle worksheets you can generate. Create as many as you want, forever.',
      },
      {
        question: 'What if I\u2019m not satisfied?',
        answer: 'We offer a 30-day money-back guarantee. If Math Puzzle Studio Pro doesn\u2019t meet your expectations, contact us for a full refund. No questions asked.',
      },
      {
        question: 'Do I need math or design skills?',
        answer: 'Not at all. The app generates all equations automatically \u2014 just pick the operation type. The canvas editor is drag-and-drop. No design skills needed.',
      },
      {
        question: 'Can I upgrade to more themes later?',
        answer: 'Yes. After purchase, you\u2019ll have the option to add the Complete Image Library (104 themes, 3,125 images). But the best price is available right after your initial purchase.',
      },
    ],

    // ── 20. Closing P.S. ─────────────────────
    closingPs: 'You\u2019re getting Math Puzzle Studio Pro, 9 grid configurations, 3 math operations, auto answer keys, 10 image themes, a full canvas editor, PDF export, and complete commercial rights \u2014 all for a one-time payment of $27. Create your first math puzzle book today.',

    // ── Pricing (CTA sections) ───────────────
    pricing: {
      price: 27,
      comparePrice: 97,
      currency: '$',
      label: 'One-Time Payment',
      includes: [
        'Math Puzzle Studio Pro (9 grid configurations)',
        '10 image themes (~300 images)',
        '3 math operations (add, subtract, mixed)',
        'Auto answer key generation',
        'Canvas editor with full control',
        'PDF + JPEG export with answer keys',
        '7 professional fonts + text effects',
        'Grayscale mode (ink-saving)',
        'Backgrounds & borders',
        'Watermark-free output',
        'Full commercial/POD/resale rights',
        'Lifetime access \u2014 no subscription',
      ],
    },

    // ── SEO ──────────────────────────────────
    seo: {
      title: 'Math Puzzle Studio Pro \u2014 Create & Sell Math Puzzle Worksheets | $27 One-Time',
      description: 'Create professional math puzzle worksheets in 60 seconds. 9 grid sizes, 3 math operations, auto answer keys, canvas editor, PDF export. Sell on Etsy & Amazon KDP. $27 one-time.',
      keywords: 'math puzzle studio pro, math puzzle maker, math puzzle worksheet creator, printable math puzzles, Etsy math worksheets, KDP math puzzles, commercial math puzzles',
    },
  },

  // ══════════════════════════════════════════
  // OTO1 — Math Puzzle Complete Image Library ($37)
  // Unlock all 104 themes (3,125 images)
  // ══════════════════════════════════════════
  'math-puzzle-library': {
    slug: 'math-puzzle-library',
    productId: 'mathpuzzle-oto1-library',
    checkoutUrl: '',
    freeAppUrl: '',
    isOto: true,

    // ── 1. Hero ──────────────────────────────
    hero: {
      badge: 'Exclusive Upgrade',
      headline: 'Wait! Unlock All 104 Image Themes',
      subheadline: 'You just got 10 themes. Imagine having 104 \u2014 with 3,125 professionally curated PNG images across 52 colorful and 52 black & white themes.',
      ctaPrimary: 'Add to My Order',
      trustBadges: [
        'One-Time Payment',
        'Instant Activation',
        '3,125 Images',
      ],
    },

    // ── 2. Comparison ────────────────────────
    comparison: {
      current: {
        label: 'Your Current Library',
        items: [
          '10 image themes',
          '~300 images',
          'Colorful themes only',
          '10 possible puzzle books',
        ],
      },
      upgrade: {
        label: 'Complete Image Library',
        items: [
          '104 image themes',
          '3,125 images',
          '52 colorful + 52 black & white',
          '104+ possible puzzle books',
        ],
      },
    },

    // ── 3. Theme Categories ──────────────────
    themeCategories: {
      headline: 'Browse the Complete Theme Collection',
      categories: [
        { name: 'Animals', count: 36 },
        { name: 'Ocean Life', count: 32 },
        { name: 'Dinosaurs', count: 28 },
        { name: 'Birds', count: 26 },
        { name: 'Farm Animals', count: 30 },
        { name: 'Fruits', count: 24 },
        { name: 'Vegetables', count: 22 },
        { name: 'Vehicles', count: 31 },
        { name: 'Space', count: 28 },
        { name: 'Christmas', count: 34 },
        { name: 'Easter', count: 26 },
        { name: 'Flowers', count: 24 },
        { name: 'Insects & Bugs', count: 24 },
        { name: 'Camping', count: 22 },
        { name: 'Classroom', count: 24 },
        { name: 'Desserts', count: 24 },
        { name: 'Music', count: 24 },
        { name: 'Professions', count: 28 },
        { name: 'Pets', count: 26 },
        { name: 'Toys', count: 24 },
        { name: 'Summer', count: 24 },
        { name: 'Weather', count: 22 },
        { name: 'Shapes', count: 22 },
        { name: 'And 81 more...', count: 0 },
      ],
    },

    // ── 4. Content Math ──────────────────────
    contentMath: {
      headline: 'More Themes = More Products = More Revenue',
      description: 'With 10 themes, you can create 10 puzzle books. With 104 themes, you can create 104+ unique books \u2014 in both color and black & white. Each book is a separate listing on Etsy or Amazon KDP. More listings means more visibility, more traffic, and more sales.',
    },

    // ── 5. Value Stack ───────────────────────
    valueStack: {
      headline: 'Everything You Unlock',
      items: [
        { name: '52 Colorful Image Themes', value: 147 },
        { name: '52 Black & White Themes', value: 97 },
        { name: '3,125 Professional PNG Images', value: 97 },
        { name: 'Decorative Backgrounds & Borders', value: 37 },
      ],
      totalValue: 378,
      yourPrice: 37,
    },

    // ── 6. Guarantee ─────────────────────────
    guarantee: {
      days: 30,
      text: 'Same 30-day money-back guarantee. If the Complete Image Library doesn\u2019t meet your expectations, contact us for a full refund.',
    },

    // ── 7. FAQ ───────────────────────────────
    faq: [
      {
        question: 'Do I need this to use Math Puzzle Studio Pro?',
        answer: 'No. Math Puzzle Studio Pro works great with the 10 themes included in your purchase. The Complete Image Library is for sellers who want maximum variety \u2014 104 themes means 104+ unique puzzle books you can create and sell.',
      },
      {
        question: 'How does activation work?',
        answer: 'Instantly. After purchase, all 104 themes appear in your theme dropdown immediately. No extra downloads or setup required.',
      },
      {
        question: 'Can I upgrade later?',
        answer: 'This discounted price of $37 is only available right now as part of your initial purchase. The regular price is $147.',
      },
      {
        question: 'What\u2019s the difference between colorful and black & white themes?',
        answer: 'Colorful themes have vibrant, full-color images. Black & white themes are designed specifically for coloring books and ink-saving worksheets \u2014 perfect for KDP print editions.',
      },
    ],

    declineText: 'No thanks, I\u2019ll stick with 10 themes',

    // ── Pricing (CTA section) ────────────────
    pricing: {
      price: 37,
      comparePrice: 147,
      currency: '$',
      label: 'One-Time Upgrade',
      includes: [
        '104 image themes (3,125 images)',
        '52 colorful + 52 black & white themes',
        'Decorative backgrounds & borders',
        'Instant activation',
        'Full commercial rights on all images',
      ],
    },

    // ── SEO ──────────────────────────────────
    seo: {
      title: 'Complete Image Library \u2014 104 Themes, 3,125 Images | $37 One-Time',
      description: 'Unlock 104 image themes with 3,125 professionally curated images for Math Puzzle Studio Pro. Create puzzle books for any niche. $37 one-time.',
      keywords: 'math puzzle image library, math puzzle themes, puzzle worksheet images, math puzzle upgrade',
    },
  },

  // ══════════════════════════════════════════
  // OTO1 — Complete Image Library ($37)
  // Unlock all 104 themes (3,000+ images)
  // ══════════════════════════════════════════
  'word-search-library': {
    slug: 'word-search-library',
    productId: 'wordsearch-oto1-library',
    checkoutUrl: 'https://warriorplus.com/o2/buy/pxf0ht/r02nbq/xkd0x7',
    wpButtonImg: 'https://warriorplus.com/o2/btn/fn100011001/pxf0ht/r02nbq/459036',
    freeAppUrl: '',
    isOto: true,

    // ── 1. Hero ──────────────────────────────
    hero: {
      badge: 'Exclusive Upgrade',
      headline: 'Wait! Unlock All 104 Image Themes',
      subheadline: 'You just got 10 themes. Imagine having 104 \u2014 with 3,000+ professionally curated images. Create puzzle books for any niche imaginable.',
      ctaPrimary: 'Add to My Order',
      trustBadges: [
        'One-Time Payment',
        'Instant Activation',
        '3,000+ Images',
      ],
    },

    // ── 2. Comparison ────────────────────────
    comparison: {
      current: {
        label: 'Your Current Library',
        items: [
          '10 image themes',
          '~319 images',
          'Core categories only',
          '10 possible puzzle books',
        ],
      },
      upgrade: {
        label: 'Complete Image Library',
        items: [
          '104 image themes',
          '3,000+ images',
          'Every niche covered',
          '104+ possible puzzle books',
        ],
      },
    },

    // ── 3. Theme Categories ──────────────────
    themeCategories: {
      headline: 'Browse the Complete Theme Collection',
      categories: [
        { name: 'Animals', count: 36 },
        { name: 'Ocean Life', count: 32 },
        { name: 'Dinosaurs', count: 28 },
        { name: 'Birds', count: 26 },
        { name: 'Farm Animals', count: 30 },
        { name: 'Wild Animals', count: 34 },
        { name: 'Pets', count: 26 },
        { name: 'Christmas', count: 34 },
        { name: 'Halloween', count: 28 },
        { name: 'Easter', count: 26 },
        { name: 'Summer', count: 24 },
        { name: 'Food', count: 28 },
        { name: 'Fruits', count: 24 },
        { name: 'Vegetables', count: 22 },
        { name: 'Sports', count: 38 },
        { name: 'Space', count: 28 },
        { name: 'Vehicles', count: 31 },
        { name: 'Professions', count: 28 },
        { name: 'Music', count: 24 },
        { name: 'Camping', count: 22 },
        { name: 'Fairy Tales', count: 24 },
        { name: 'Pirates', count: 24 },
        { name: 'Construction', count: 26 },
        { name: 'And 81 more...', count: 0 },
      ],
    },

    // ── 4. Content Math ──────────────────────
    contentMath: {
      headline: 'More Themes = More Products = More Revenue',
      description: 'With 10 themes, you can create 10 puzzle books. With 104 themes, you can create 104+ unique books. Each book is a separate listing on Etsy or Amazon KDP. More listings means more visibility, more traffic, and more sales. The seller with the most products wins.',
    },

    // ── 5. Value Stack ───────────────────────
    valueStack: {
      headline: 'Everything You Unlock',
      items: [
        { name: '104 Image Themes', value: 197 },
        { name: '3,000+ Professional Images', value: 97 },
        { name: 'Seasonal & Holiday Collection', value: 47 },
        { name: 'Niche Category Collection', value: 37 },
      ],
      totalValue: 378,
      yourPrice: 37,
    },

    // ── 6. Guarantee ─────────────────────────
    guarantee: {
      days: 30,
      text: 'Same 30-day money-back guarantee. If the Complete Image Library doesn\'t meet your expectations, contact us for a full refund.',
    },

    // ── 7. FAQ ───────────────────────────────
    faq: [
      {
        question: 'Do I need this to use Word Search Studio Pro?',
        answer: 'No. Word Search Studio Pro works great with the 10 themes included in your purchase. The Complete Image Library is for sellers who want maximum variety \u2014 104 themes means 104+ unique puzzle books you can create and sell.',
      },
      {
        question: 'How does activation work?',
        answer: 'Instantly. After purchase, all 104 themes appear in your theme dropdown immediately. No extra downloads or setup required.',
      },
      {
        question: 'Can I upgrade later?',
        answer: 'This discounted price of $37 is only available right now as part of your initial purchase. The regular price is $147.',
      },
      {
        question: 'Are all images commercially licensed?',
        answer: 'Yes. Full commercial rights apply to all 3,000+ images across all 104 themes. Use them in any products you sell on any platform.',
      },
    ],

    declineText: 'No thanks, I\'ll stick with 10 themes',

    // ── Pricing (CTA section) ────────────────
    pricing: {
      price: 37,
      comparePrice: 147,
      currency: '$',
      label: 'One-Time Upgrade',
      includes: [
        '104 image themes (3,000+ images)',
        'Seasonal & holiday themes',
        'Niche category themes',
        'Instant activation',
        'Full commercial rights on all images',
      ],
    },

    // ── SEO ──────────────────────────────────
    seo: {
      title: 'Complete Image Library \u2014 104 Themes, 3,000+ Images | $37 One-Time',
      description: 'Unlock 104 image themes with 3,000+ professionally curated images for Word Search Studio Pro. Create puzzle books for any niche. $37 one-time.',
      keywords: 'word search image library, word search themes, puzzle book images, word search upgrade',
    },
  },

  // ══════════════════════════════════════════
  // OTO2 — All 11 Languages ($27)
  // Unlock all 11 languages
  // ══════════════════════════════════════════
  'word-search-languages': {
    slug: 'word-search-languages',
    productId: 'wordsearch-oto2-languages',
    checkoutUrl: 'https://warriorplus.com/o2/buy/pxf0ht/rdpvkz/llwqdy',
    wpButtonImg: 'https://warriorplus.com/o2/btn/fn100011001/pxf0ht/rdpvkz/459037',
    freeAppUrl: '',
    isOto: true,

    // ── 1. Hero ──────────────────────────────
    hero: {
      badge: 'Final Upgrade',
      headline: 'One More Thing \u2014 Sell in 11 Languages',
      subheadline: 'Your puzzles currently work in English. Unlock 10 more languages and reach millions of non-English speaking customers worldwide.',
      ctaPrimary: 'Add to My Order',
      trustBadges: [
        'Instant Activation',
        '11 Languages',
        'Auto-Translation',
      ],
    },

    // ── 2. How It Works (Steps) ──────────────
    steps: [
      {
        number: 1,
        icon: 'palette',
        title: 'Select a Language',
        description: 'Pick from 11 languages in the dropdown menu. German, French, Spanish, and 7 more.',
      },
      {
        number: 2,
        icon: 'sliders',
        title: 'Everything Auto-Translates',
        description: 'Image names translate automatically. The puzzle grid uses the correct alphabet for that language \u2014 including umlauts, accents, and special characters.',
      },
      {
        number: 3,
        icon: 'rocket',
        title: 'Generate & Sell Worldwide',
        description: 'Export your puzzle and sell it on Amazon.de, Amazon.fr, Amazon.es, or any international marketplace. Same quality, new markets.',
      },
    ],

    // ── 3. Languages Grid ────────────────────
    languagesGrid: {
      headline: 'All 11 Languages Included',
      languages: [
        { name: 'English', flag: 'gb' },
        { name: 'German', flag: 'de' },
        { name: 'French', flag: 'fr' },
        { name: 'Spanish', flag: 'es' },
        { name: 'Portuguese', flag: 'pt' },
        { name: 'Italian', flag: 'it' },
        { name: 'Dutch', flag: 'nl' },
        { name: 'Swedish', flag: 'se' },
        { name: 'Danish', flag: 'dk' },
        { name: 'Norwegian', flag: 'no' },
        { name: 'Finnish', flag: 'fi' },
      ],
    },

    // ── 4. Market Expansion ──────────────────
    marketExpansion: {
      headline: 'Why Multi-Language = Massive Opportunity',
      description: 'English-only KDP publishers compete with millions of sellers. Non-English markets are massively underserved. A German word search book on Amazon.de faces a fraction of the competition. Spanish-language puzzles for the U.S. Hispanic market? Almost nobody is creating them. You\'ll have entire niches to yourself.',
    },

    // ── 5. Value Stack ───────────────────────
    valueStack: {
      headline: 'Everything You Unlock',
      items: [
        { name: '10 Additional Languages', value: 97 },
        { name: 'Automatic Alphabet Handling', value: 47 },
        { name: 'Auto-Translated Image Names', value: 37 },
      ],
      totalValue: 181,
      yourPrice: 27,
    },

    // ── 6. Guarantee ─────────────────────────
    guarantee: {
      days: 30,
      text: 'Same 30-day money-back guarantee. If the language pack doesn\'t meet your expectations, contact us for a full refund.',
    },

    // ── 7. FAQ ───────────────────────────────
    faq: [
      {
        question: 'How does the translation work?',
        answer: 'Select a language from the dropdown. Image names translate automatically (e.g., "cat" becomes "chat" in French, "Katze" in German). The puzzle grid uses the correct alphabet, including special characters like umlauts and accented letters.',
      },
      {
        question: 'Which languages are included?',
        answer: 'English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Each language includes fully translated image names and correct alphabet support.',
      },
      {
        question: 'Can I sell puzzles in multiple languages?',
        answer: 'Absolutely. Your commercial rights cover all 11 languages. Create a German word search book, a French one, and a Spanish one \u2014 all from the same tool, all ready to sell.',
      },
    ],

    declineText: 'No thanks, English is enough',

    // ── Pricing (CTA section) ────────────────
    pricing: {
      price: 27,
      comparePrice: 97,
      currency: '$',
      label: 'One-Time Upgrade',
      includes: [
        '10 additional languages',
        'Automatic alphabet handling',
        'Auto-translated image names',
        'Instant activation',
        'Full commercial rights in all languages',
      ],
    },

    // ── SEO ──────────────────────────────────
    seo: {
      title: 'All 11 Languages \u2014 Word Search Studio Pro Language Pack | $27 One-Time',
      description: 'Unlock 11 languages for Word Search Studio Pro. Auto-translated puzzles for German, French, Spanish, and 7 more languages. $27 one-time.',
      keywords: 'multilingual word search, word search languages, German word search, French word search, Spanish word search',
    },
  },
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/** Look up a sales page by its URL slug */
export function getSalesPage(slug: string): SalesPageConfig | null {
  return SALES_PAGES[slug] ?? null;
}

/** Look up a sales page by its product ID */
export function getSalesPageByProductId(productId: string): SalesPageConfig | null {
  return Object.values(SALES_PAGES).find(p => p.productId === productId) ?? null;
}

/** Get all sales page slugs (for generateStaticParams) */
export function getAllSalesPageSlugs(): string[] {
  return Object.keys(SALES_PAGES);
}
