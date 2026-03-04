import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'math-worksheet',
  locale: 'en',
  category: 'math',

  seo: {
    titleTag: 'Math Worksheet Generator | Symbol Equation Puzzles Free',
    metaDescription: 'Create symbol-based math worksheets with 4 difficulty levels. Addition and subtraction with image variables. 104 themes, auto answer keys. Free online generator with PDF export.',
    primaryKeyword: 'math worksheet generator',
    secondaryKeywords: [
      'symbol math worksheets',
      'math puzzle worksheets printable',
      'equation worksheets with pictures',
      'printable math worksheets free',
      'math variable worksheets for kids',
    ],
    lsiKeywords: [
      'algebraic thinking activities',
      'symbol substitution math',
      'math enrichment worksheets',
      'critical thinking math problems',
      'image equation worksheets',
      'pre-algebra activities',
      'math problem solving worksheets',
      'symbol value worksheets',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/math worksheet/Math Worksheet 1.jpeg',
      primaryAlt: 'Math worksheet with image symbols representing variables in addition and subtraction equations',
      secondary: '/samples/english/math worksheet/Math Worksheet 10.jpeg',
      secondaryAlt: 'Math worksheet answer key showing symbol-to-number assignments and solutions',
    },
    sampleGallery: [
      { src: '/samples/english/math worksheet/Math Worksheet 11.jpeg', alt: 'Very Easy math worksheet with 2 symbols and food images', caption: 'Very Easy level (2 symbols)' },
      { src: '/samples/english/math worksheet/Math Worksheet 12.jpeg', alt: 'Medium difficulty math worksheet with 3 symbols and animal images', caption: 'Medium level (3 symbols)' },
      { src: '/samples/english/math worksheet/Math Worksheet 13.jpeg', alt: 'Hard math worksheet with 4 symbols and vehicle images', caption: 'Hard level (4 symbols)' },
      { src: '/samples/english/math worksheet/Math Worksheet 14.jpeg', alt: 'Math worksheet with addition and subtraction combined', caption: 'Mixed operations mode' },
      { src: '/samples/english/math worksheet/Math Worksheet 15.jpeg', alt: 'Math worksheet with decorative border and nature background', caption: 'Custom background and border' },
      { src: '/samples/english/math worksheet/Math Worksheet 16.jpeg', alt: 'Math worksheet answer key showing all solutions', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '-JIawojGNr0',
    videoTitle: 'How to Create Symbol Math Worksheets',
  },

  hero: {
    title: 'Math Worksheet Generator',
    tagline: 'Symbol-based equations that make children think like mathematicians',
    description: `Most math worksheets ask students to compute. This one asks them to reason. The Math Worksheet Generator creates puzzles where image symbols represent unknown values \u2014 students analyze multiple equations to deduce what each symbol equals, then solve the remaining problems. It is pre-algebraic thinking disguised as a fun picture puzzle.

Four difficulty levels scale from first introduction to genuine challenge. Very Easy uses 2 symbols with straightforward equations. Easy stays at 2 symbols but increases the number range. Medium introduces 3 symbols, requiring students to hold more values in working memory. Hard pushes to 4 symbols with complex multi-step reasoning. Each level generates 1\u20136 puzzles per worksheet, giving you precise control over session length and difficulty.

Choose addition only or addition and subtraction combined. Set the minimum and maximum values for symbol assignments \u2014 the default range of 0\u201320 fits most elementary math curricula, but you can widen or narrow it for any audience. An optional toggle allows negative results for students learning integer operations. Show or hide answers in the worksheet itself for self-checking practice.

Pick from 104 image themes for visually engaging symbols that tie math practice to topics students care about. The canvas editor adds text, backgrounds, and borders for a polished look. Every worksheet exports with a matching answer key showing all symbol assignments. Try everything free \u2014 no signup needed, just a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create a Symbol Math Worksheet in 5 Steps',
    steps: [
      {
        title: 'Set the Difficulty Level',
        description: 'Choose from Very Easy (2 symbols), Easy (2 symbols, wider range), Medium (3 symbols), or Hard (4 symbols). Then set how many puzzles to generate (1\u20136) and whether to include addition only or both addition and subtraction.',
      },
      {
        title: 'Configure the Number Range',
        description: 'Set minimum and maximum values for symbol assignments. The default is 0\u201320. Narrow the range for younger students or widen it for advanced learners. Optionally allow negative results for integer practice.',
      },
      {
        title: 'Select Images as Symbols',
        description: 'Choose individual images from the 104-theme library, use an entire theme for automatic selection, or upload your own images. Each image becomes a variable with a hidden number value.',
      },
      {
        title: 'Customize the Layout',
        description: 'Pick page size, orientation, and font. Use the canvas editor to add titles, name fields, and instructions. Apply themed backgrounds and borders. Adjust puzzle labels and numbering.',
      },
      {
        title: 'Export and Distribute',
        description: 'Download the worksheet and answer key as JPEG or PDF. The answer key shows all symbol values and complete solutions. Toggle grayscale for efficient black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Four Progressive Difficulty Levels',
      description: 'Very Easy and Easy use 2 image symbols for introductory algebraic thinking. Medium adds a third symbol, requiring students to track more values. Hard uses 4 symbols for genuinely challenging multi-equation reasoning. Each level is designed to scaffold logically from the previous one.',
    },
    {
      title: 'Addition and Subtraction Operations',
      description: 'Generate worksheets with addition only or both addition and subtraction. Addition-only mode suits younger students focused on basic operations. Combined mode challenges students to apply both operations in a single puzzle, building operational flexibility.',
    },
    {
      title: 'Configurable Number Range with Negative Support',
      description: 'Set minimum and maximum values for symbol assignments from 0 to any practical limit. The default range of 0\u201320 covers most elementary curricula. Enable the "Allow Negative Results" toggle for students learning integers, expanding the puzzles into signed number territory.',
    },
    {
      title: 'Individual or Theme-Based Image Selection',
      description: 'Select specific images individually from the library to control exactly which symbols appear. Or choose a full theme to automatically fill the symbol slots from that category. Both methods draw from 104 illustrated themes covering animals, food, vehicles, nature, and more.',
    },
    {
      title: 'Customizable Puzzle Labels and Numbering',
      description: 'Set a custom puzzle label (default: "Puzzle") and choose the starting number (0\u201399). This lets you create numbered series across multiple worksheets \u2014 useful for activity books, progressive assignments, or multi-sheet assessment packages.',
    },
    {
      title: 'Optional Name/Date Fields and Exercise Numbers',
      description: 'Toggle checkboxes to include a student name and date field at the top of the worksheet. Toggle exercise numbers on or off. These small features make worksheets classroom-ready without extra formatting.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom text, change page and background colors, apply themed borders, and arrange elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo give you complete layout control for a polished, professional result.',
    },
    {
      title: 'Dual Export with Answer Key',
      description: 'Export worksheets as high-resolution JPEG or print-ready PDF with a matching answer key. The answer key shows every symbol\u2019s assigned value and the solution to each equation. Grayscale toggle available for ink-efficient printing.',
    },
  ],

  businessUseCases: [
    {
      title: 'Publish Symbol Math Puzzle Books on Amazon KDP',
      description: 'Compile 50\u2013100 symbol math puzzles into themed books at each difficulty level: "Easy Symbol Math for First Graders," "Hard Math Challenges for Third Graders." The visual puzzle format differentiates your book from standard arithmetic workbooks and appeals to parents looking for critical thinking resources.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Create Differentiated Math Packs for Etsy',
      description: 'Bundle worksheets by difficulty level into instant-download packs. A "Symbol Math Starter Pack" (Very Easy + Easy) and a "Symbol Math Challenge Pack" (Medium + Hard) target different buyer segments. Parents and teachers search for "math puzzles" and "algebraic thinking worksheets" on Etsy.',
      platform: 'Etsy',
    },
    {
      title: 'Build Pre-Algebra Resources for TPT',
      description: 'Position symbol math worksheets as algebraic thinking resources for elementary teachers. Create grade-leveled packs aligned to standards that introduce variables as pictures. TPT teachers actively search for resources that build higher-order math skills.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Math Enrichment Challenge Series',
      description: 'Create a 12-week enrichment series that progresses from Very Easy 2-symbol puzzles to Hard 4-symbol challenges with mixed operations. Package for gifted programs, math clubs, and after-school enrichment centers that need structured challenge materials.',
      platform: 'Gumroad',
    },
    {
      title: 'Offer Assessment and Practice Sets',
      description: 'Create paired assessment and practice sets: a practice worksheet with answers shown, followed by an assessment worksheet with answers hidden. Teachers and homeschool parents value this teach-then-test format for progress monitoring.',
      platform: 'Multi-platform',
    },
  ],

  faq: [
    {
      question: 'How does the symbol math puzzle work?',
      answer: 'Each image symbol is assigned a hidden number. Students see equations using these symbols and must figure out each symbol\u2019s value by analyzing the relationships between equations. It develops the same reasoning as algebra, presented in a visual, age-appropriate format.',
    },
    {
      question: 'What difficulty levels are available?',
      answer: 'Four levels: Very Easy (2 symbols, basic equations), Easy (2 symbols, wider range), Medium (3 symbols), and Hard (4 symbols). Each level increases the reasoning complexity. You can generate 1\u20136 puzzles per worksheet at any level.',
    },
    {
      question: 'Does it support both addition and subtraction?',
      answer: 'Yes. Choose addition only or combined addition and subtraction. Addition-only mode suits beginners. Combined mode challenges students to apply both operations in a single puzzle.',
    },
    {
      question: 'Can students work with negative numbers?',
      answer: 'Yes. The "Allow Negative Results" toggle enables puzzles where subtraction can produce negative answers. This is ideal for students learning integer operations, typically third grade and above.',
    },
    {
      question: 'How do I choose images for the symbols?',
      answer: 'Select individual images from the library to control which symbols appear, or choose a full theme for automatic selection. Both methods use the 104-theme library. You can also upload your own images.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every worksheet generates a matching answer key showing all symbol-to-number assignments and complete equation solutions. The answer key exports as a separate file.',
    },
    {
      question: 'Can I show answers on the worksheet itself?',
      answer: 'Yes. A checkbox lets you show answers directly on the worksheet for self-checking practice. Turn it off for assessments and tests.',
    },
    {
      question: 'Can I sell these worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, TPT, and any platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it before purchasing?',
      answer: 'Yes. All difficulty levels, operations, and themes work in the free version with only a watermark on exports. Test everything to make sure it fits your needs.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since the puzzles use images and numbers, the math content works universally.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test all features before purchasing.',
    },
  ],

  internalLinks: [
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Math Puzzle Generator' },
    { slug: 'code-addition', pageType: 'app', anchorText: 'Code Addition Generator' },
    { slug: 'addition', pageType: 'app', anchorText: 'Addition Worksheet Generator' },
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraction Worksheet Generator' },
    { slug: 'more-less', pageType: 'app', anchorText: 'More or Less Generator' },
    { slug: 'missing-number', pageType: 'app', anchorText: 'Missing Number Generator' },
    { slug: 'math-worksheet', pageType: 'tool', anchorText: 'Try Math Worksheet Generator Free' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Math & Number Bundle \u2014 Save on All Math Generators' },
    { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'How to Create Puzzle Books' },
    { slug: 'math-printable-ideas', pageType: 'idea', anchorText: 'Math Printable Niche Ideas' },
  ],
};
