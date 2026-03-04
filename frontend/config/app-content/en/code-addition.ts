import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'code-addition',
  locale: 'en',
  category: 'math',

  seo: {
    titleTag: 'Code Addition Generator | Code Breaker Math Worksheets Free',
    metaDescription: 'Create code breaker addition worksheets where symbols represent numbers. Word Reveal mode, 2-5 symbols, 104 themes. Free online generator with auto answer keys and PDF export.',
    primaryKeyword: 'code addition worksheet generator',
    secondaryKeywords: [
      'code breaker math worksheets',
      'symbol addition worksheets',
      'crack the code math',
      'mystery number worksheets',
      'code breaking math activities',
    ],
    lsiKeywords: [
      'algebraic thinking worksheets',
      'variable math for kids',
      'symbol math problems',
      'pre-algebra worksheets',
      'math code puzzles',
      'secret code math',
      'decode math worksheets',
      'number symbol activities',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/code addition/Code Breaker Addition 1.jpeg',
      primaryAlt: 'Code breaker addition worksheet with animal symbols representing hidden numbers in equations',
      secondary: '/samples/english/code addition/Code Breaker Addition 2.jpeg',
      secondaryAlt: 'Code addition answer key showing symbol-to-number assignments',
    },
    sampleGallery: [
      { src: '/samples/english/code addition/Code Breaker Addition 3.jpeg', alt: 'Code addition worksheet with 3 symbols and food images', caption: '3 symbols, addition only' },
      { src: '/samples/english/code addition/Code Breaker Addition 4.jpeg', alt: 'Code addition with 5 symbols and vehicle images for advanced practice', caption: '5 symbols, advanced level' },
      { src: '/samples/english/code addition/image_addition_worksheet (1).jpeg', alt: 'Code addition worksheet in landscape format with nature theme', caption: 'Landscape format option' },
      { src: '/samples/english/code addition/image_addition_worksheet (10).jpeg', alt: 'Code addition worksheet with decorative border and custom background', caption: 'Custom background and border' },
      { src: '/samples/english/code addition/image_addition_worksheet (11).jpeg', alt: 'Code addition with 2-addend equations and ocean theme', caption: '2 addends per equation' },
      { src: '/samples/english/code addition/image_addition_worksheet (12).jpeg', alt: 'Code addition answer key with all symbol values revealed', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'vVd11Kjk9iA',
    videoTitle: 'How to Create Code Breaker Addition Worksheets',
  },

  hero: {
    title: 'Code Addition Generator',
    tagline: 'Crack the code \u2014 where every image hides a secret number waiting to be discovered',
    description: `Standard addition drills test recall. Code addition builds reasoning. Instead of solving 3 + 5 directly, students face equations where images represent unknown values: if a cat equals 3 and a dog equals 5, what does cat + dog equal? This simple twist turns basic addition into a logic puzzle that develops pre-algebraic thinking from an early age.

The Code Addition Generator assigns random number values to 2\u20135 image symbols, then builds equations using those symbols. Students analyze the equations, deduce each symbol\u2019s value, and solve the problems. Choose from 104 illustrated themes so every worksheet looks fresh, and set addends from 2 to 4 per equation to control complexity. The generator supports 3\u201310 exercises per worksheet, with smart auto-adjustment that prevents impossible problems.

The Word Reveal mode takes the concept further. Enter a secret word, and the generator creates equations whose solutions map to specific letters. Students solve each equation to reveal one letter of the hidden word. This mode supports full Unicode with locale-specific diacritics across all 11 languages, automatically generating distractor letters with different sums to make the puzzle challenging.

Built-in intelligence prevents duplicate equations and adjusts settings when your configuration would produce fewer unique problems than requested. The canvas editor lets you add custom text, backgrounds, and borders. Every worksheet exports with a matching answer key as JPEG or PDF. Try the full generator free \u2014 no signup needed, just a small watermark.`,
  },

  howItWorks: {
    title: 'Create a Code Breaker Worksheet in 5 Steps',
    steps: [
      {
        title: 'Select Images as Code Symbols',
        description: 'Choose 2\u20135 images from the 104-theme library or upload your own. Each image becomes a symbol that represents a hidden number. The generator assigns unique random values within your specified range to each symbol.',
      },
      {
        title: 'Configure Equation Settings',
        description: 'Set the number of exercises (3\u201310), addends per equation (2, 3, 4, or mixed), and the value range for symbol assignments (1\u201320). The generator creates unique equations using permutation logic so no two problems repeat.',
      },
      {
        title: 'Optional: Enable Word Reveal',
        description: 'Turn on Word Reveal mode and enter a secret word up to 10 characters. The generator maps each letter to an equation answer and adds distractor letters with different sums. Students solve equations to spell out the hidden word.',
      },
      {
        title: 'Customize the Design',
        description: 'Choose page size, orientation, and font. Use the canvas editor to add titles, name fields, and instructions. Apply background themes and decorative borders. Adjust colors, alignment, and layers for a polished result.',
      },
      {
        title: 'Export and Distribute',
        description: 'Download the worksheet and answer key as JPEG or PDF. The answer key shows all symbol-to-number assignments and equation solutions. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Symbol-Based Equation System',
      description: 'Each selected image receives a unique random number value. Equations use these image symbols instead of plain numbers, requiring students to track symbol values and perform addition mentally. This builds the same reasoning skills as early algebra \u2014 understanding that a symbol can represent any value.',
    },
    {
      title: 'Word Reveal Mode',
      description: 'Enter a secret word of up to 10 characters, and the generator creates equations whose answers map to individual letters. Distractor letters with different sum values add challenge. Supports full Unicode including locale-specific diacritics across all 11 languages, so you can create word reveals in German, French, Spanish, and more.',
    },
    {
      title: 'Smart Auto-Adjustment',
      description: 'If your settings would produce fewer unique equations than requested, the generator automatically increases the symbol count or addend count and shows an informational message. No blank worksheets, no manual troubleshooting. The system finds valid configurations transparently.',
    },
    {
      title: 'Configurable Addends per Equation',
      description: 'Set each equation to use 2, 3, or 4 addends, or choose Mix for random variation. Two-addend equations suit beginners learning symbol substitution. Three and four addends challenge students who are ready for more complex multi-step reasoning.',
    },
    {
      title: '2\u20135 Image Symbols per Worksheet',
      description: 'Control complexity by choosing how many different symbols appear. Two symbols create simple substitution puzzles. Five symbols require students to track multiple values simultaneously, developing working memory alongside math skills.',
    },
    {
      title: '104 Illustrated Image Themes',
      description: 'Select symbols from animal, vehicle, food, nature, sports, and seasonal image sets. Themed code breakers tie math practice to other topics and keep students engaged with fresh visuals across multiple worksheets.',
    },
    {
      title: 'Duplicate Prevention with Permutation Logic',
      description: 'The generator uses mathematical permutation logic (without repetition for original mode, with repetition for word reveal) to ensure every equation on a worksheet is unique. No repeated problems, no wasted student effort.',
    },
    {
      title: 'Full Canvas Editor and Dual Export',
      description: 'Add text overlays, change colors, apply backgrounds and borders, and arrange elements with drag-and-drop. Export as JPEG or PDF with a matching answer key that shows all symbol assignments. Grayscale toggle available for ink-efficient printing.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Code Breaker Activity Books on Amazon KDP',
      description: 'Compile 50\u2013100 code addition puzzles into themed books: "Crack the Code: Animal Math for First Graders," "Secret Code Addition Adventures." The unique symbol-based format differentiates your book from standard addition workbooks in Amazon\u2019s competitive category.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Create Decode-the-Word Math Packs for Etsy',
      description: 'Use Word Reveal mode to create packs where every worksheet reveals a themed word: animal names, holiday words, or vocabulary terms. Parents searching for "code breaker worksheets" and "crack the code math" find a product format they cannot easily replicate at home.',
      platform: 'Etsy',
    },
    {
      title: 'Build Pre-Algebra Readiness Resources for TPT',
      description: 'Position code addition as an algebraic thinking resource for first through third grade. Create leveled packs: Level 1 (2 symbols, 2 addends), Level 2 (3 symbols, 3 addends), Level 3 (4\u20135 symbols, mixed addends). TPT teachers value resources that build higher-order thinking.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Holiday Word Reveal Collections',
      description: 'Create seasonal packs where students solve equations to spell holiday words: "GHOST" for Halloween, "SANTA" for Christmas, "HEART" for Valentine\u2019s Day. The word reveal mechanic adds excitement that pure math worksheets lack.',
      platform: 'Multi-platform',
    },
    {
      title: 'Offer Math Enrichment Subscriptions',
      description: 'Create a weekly code-breaker challenge series for homeschool co-ops or after-school programs. Each week features a new theme and secret word with increasing difficulty. Package as a semester-long math enrichment program.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How does code addition work?',
      answer: 'Each image symbol is assigned a hidden number value. Students see equations using these symbols (for example, cat + dog = ?) and must figure out each symbol\u2019s value to solve the problems. It\u2019s like early algebra with pictures instead of variables.',
    },
    {
      question: 'What is Word Reveal mode?',
      answer: 'Word Reveal mode lets you enter a secret word up to 10 characters. The generator creates equations whose answers map to specific letters, plus distractor letters with different values. Students solve each equation and use the answer to reveal one letter of the hidden word.',
    },
    {
      question: 'How many symbols can I use per worksheet?',
      answer: 'Choose from 2 to 5 image symbols per worksheet. Two symbols create simple puzzles for beginners. Five symbols require tracking multiple values simultaneously, suitable for more advanced students.',
    },
    {
      question: 'What happens if my settings create too few unique equations?',
      answer: 'The generator automatically adjusts. If there aren\u2019t enough unique permutations for your requested exercise count, it increases the symbol count or addend count and shows a message explaining the adjustment. You never get blank or repeated problems.',
    },
    {
      question: 'Can I set how many addends each equation has?',
      answer: 'Yes. Choose 2, 3, or 4 addends per equation, or select Mix for random variation. Two-addend equations suit younger students, while three and four addends challenge older students with multi-step reasoning.',
    },
    {
      question: 'Does Word Reveal support accented characters?',
      answer: 'Yes. Word Reveal supports full Unicode across all 11 languages, including German umlauts, French accents, Spanish tildes, and Scandinavian characters. You can create secret words in any supported language.',
    },
    {
      question: 'Can I sell the worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license. Sell on Etsy, Amazon KDP, TPT, Gumroad, or any platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator with commercial license, popular themes, and all languages. The Full Access Pack ($47) adds all 104 themes, Word Reveal mode, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it before buying?',
      answer: 'Yes. The free version includes all modes, settings, and themes with only a watermark on exports. Try everything \u2014 including Word Reveal \u2014 to see the full capability before purchasing.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every worksheet generates a matching answer key showing all symbol-to-number assignments and complete equation solutions. The answer key exports as a separate file.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Word Reveal mode supports locale-specific alphabets and diacritics in all languages.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test all features and modes before purchasing.',
    },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app', anchorText: 'Addition Worksheet Generator' },
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Math Puzzle Generator' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraction Worksheet Generator' },
    { slug: 'math-worksheet', pageType: 'app', anchorText: 'Math Worksheet Generator' },
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Cryptogram Generator' },
    { slug: 'missing-number', pageType: 'app', anchorText: 'Missing Number Generator' },
    { slug: 'code-addition', pageType: 'tool', anchorText: 'Try Code Addition Generator Free' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Math & Number Bundle \u2014 Save on All Math Generators' },
    { slug: 'create-math-workbooks', pageType: 'guide', anchorText: 'How to Create Math Workbooks' },
    { slug: 'math-printable-ideas', pageType: 'idea', anchorText: 'Math Printable Niche Ideas' },
  ],
};
