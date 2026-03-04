import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'odd-one-out',
  locale: 'en',
  category: 'puzzle',

  seo: {
    titleTag: 'Odd One Out Generator | Create Puzzles Free Online',
    metaDescription: 'Create odd one out puzzles with two modes: identical and similar. 5-10 exercises per sheet, two-theme system, per-exercise overrides. Free generator with PDF export.',
    primaryKeyword: 'odd one out generator',
    secondaryKeywords: [
      'odd one out worksheets',
      'find the odd one out maker',
      'printable odd one out puzzles',
      'spot the difference worksheets',
      'odd one out puzzle creator',
    ],
    lsiKeywords: [
      'visual discrimination activities',
      'critical thinking worksheets',
      'observation puzzles for kids',
      'classification activities',
      'sorting and categorizing',
      'logic puzzles printable',
      'cognitive skills worksheets',
      'preschool brain teasers',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/odd one out/Find the Odd One Out (1).jpeg',
      primaryAlt: 'Odd one out puzzle worksheet with rows of images where one item differs from the rest',
      secondary: '/samples/english/odd one out/Find the Odd One Out (2).jpeg',
      secondaryAlt: 'Odd one out answer key with the different item circled in each row',
    },
    sampleGallery: [
      { src: '/samples/english/odd one out/Find the Odd One Out (3).jpeg', alt: 'Odd one out puzzle in identical mode with animal theme', caption: 'Identical mode \u2014 spot the variant' },
      { src: '/samples/english/odd one out/Find the Odd One Out (4).jpeg', alt: 'Odd one out puzzle in similar mode with mixed themes', caption: 'Similar mode \u2014 different category' },
      { src: '/samples/english/odd one out/Find the Odd One Out (5).jpeg', alt: 'Odd one out worksheet with 10 exercises per page', caption: '10 exercises per page' },
      { src: '/samples/english/odd one out/Find the Odd One Out (6).jpeg', alt: 'Odd one out puzzle with food and vehicle themes combined', caption: 'Two-theme system' },
      { src: '/samples/english/odd one out/Find the Odd One Out (7).jpeg', alt: 'Odd one out puzzle with per-exercise mode overrides', caption: 'Mixed modes per exercise' },
      { src: '/samples/english/odd one out/Find the Odd One Out (8).jpeg', alt: 'Odd one out answer key with all odd items highlighted', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'How to Create Odd One Out Puzzles',
  },

  hero: {
    title: 'Odd One Out Generator',
    tagline: 'Find the item that doesn\u2019t belong \u2014 two modes, endless visual reasoning challenges',
    description: `Odd one out puzzles are a staple of early childhood education because they develop classification, observation, and logical reasoning skills simultaneously. The Odd One Out Generator creates worksheets where students examine a row of images and identify the one that does not belong. What makes this generator unique is the two-mode system that creates fundamentally different cognitive challenges.

In Identical mode, every image in a row comes from the same theme, but one is a visual variant \u2014 a slightly different image from the same category. Students must observe fine visual details to spot the difference. This mode builds visual discrimination skills and attention to detail. In Similar mode, most images come from one theme and the odd item comes from a completely different theme. Students must categorize and classify to identify which item belongs to a different group. This mode develops classification and conceptual thinking.

The two-theme system lets you select a primary theme and a secondary theme. The primary theme provides the majority images in each row, while the secondary theme provides the odd items in Similar mode. A per-exercise mode override lets you mix Identical and Similar challenges within the same worksheet, creating varied difficulty across 5 to 10 exercises per page.

The full canvas editor adds titles, instructions, and decorative elements. Every puzzle generates a matching answer key with the odd items clearly marked. Export as JPEG for digital assignments or PDF for print-ready classroom handouts. A grayscale toggle produces ink-friendly versions. Try every feature free right now \u2014 the generator works without signup, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create an Odd One Out Puzzle in 5 Steps',
    steps: [
      {
        title: 'Select Two Themes',
        description: 'Choose a primary theme and a secondary theme from the 104-theme library. The primary theme provides the majority images. The secondary theme provides odd items in Similar mode. Both themes work together to create meaningful contrast.',
      },
      {
        title: 'Choose the Default Mode',
        description: 'Set the default mode to Identical (visual variant from same theme) or Similar (item from different theme). Identical mode tests visual discrimination. Similar mode tests categorization. You can override the mode per exercise.',
      },
      {
        title: 'Set the Number of Exercises',
        description: 'Choose between 5 and 10 exercises per worksheet. Five exercises suit younger learners who need more space per row. Ten exercises create a denser challenge for older students.',
      },
      {
        title: 'Override Modes Per Exercise',
        description: 'Optionally switch individual exercises between Identical and Similar modes. This creates varied difficulty within a single worksheet and tests both visual discrimination and categorization skills.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the puzzle worksheet and its answer key as JPEG or PDF. The answer key circles the odd item in each row. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Two Puzzle Modes: Identical and Similar',
      description: 'Identical mode places a visual variant from the same theme \u2014 students spot the image that looks slightly different. Similar mode places an item from a completely different theme \u2014 students identify which item doesn\u2019t belong to the group. Two fundamentally different cognitive challenges from one generator.',
    },
    {
      title: 'Two-Theme System',
      description: 'Select a primary theme that provides most images in each row and a secondary theme that provides the odd items. The dual-theme approach ensures meaningful contrast in Similar mode and provides visual variety across exercises.',
    },
    {
      title: 'Per-Exercise Mode Override',
      description: 'Override the default mode for individual exercises within the same worksheet. Mix Identical and Similar challenges to test both visual discrimination and categorization on a single page. This creates varied difficulty without needing multiple worksheets.',
    },
    {
      title: '5\u201310 Exercises Per Worksheet',
      description: 'Set between 5 and 10 exercise rows per page. Fewer exercises provide more space for each row, suiting younger learners. More exercises create denser worksheets for older students who work faster.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides illustrated items for puzzle rows. Animals, food, vehicles, nature, sports, and seasonal themes align puzzles with classroom topics. The search feature finds specific images across all themes.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and position elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo for complete design control.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every puzzle produces an answer key that clearly marks the odd item in each row. The answer key matches the puzzle layout for easy visual comparison. Saves grading time and supports self-checking.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the puzzle and answer key export at full quality as separate files.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Odd One Out Activity Books for Amazon KDP',
      description: 'Compile 50\u2013100 odd one out puzzles into themed books: "Find the Odd One Out \u2014 Animals," "Spot What\u2019s Different \u2014 Food Edition." The visual format creates eye-catching KDP previews. Include progressive difficulty from 5-exercise easy pages to 10-exercise mixed-mode challenges.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Visual Reasoning Packs on Etsy',
      description: 'Bundle 15\u201320 odd one out worksheets as instant-download packs. Create difficulty tiers: Easy (5 exercises, Similar mode only), Medium (8 exercises, Identical mode), Hard (10 exercises, mixed modes). "Odd one out worksheets" and "spot the difference printable" are popular Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Classification Skill Resources for TPT',
      description: 'Create assessment-ready packs where odd one out puzzles test classification and visual discrimination. Include scoring rubrics, progress trackers, and differentiated levels. TPT buyers in preschool and special education search for these specific skill-building resources.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Themed Puzzle Collections',
      description: 'Use themed image pairs for targeted odd one out packs: farm animals vs. ocean animals, fruits vs. vegetables, land vehicles vs. air vehicles. Theme-based contrast makes the categorization task educationally meaningful.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Cognitive Skills Training Program',
      description: 'Structure puzzles into a 10-week program advancing from simple Similar-mode exercises to complex mixed-mode challenges with 10 exercises per page. Package as a visual reasoning curriculum for early childhood programs and occupational therapy practices.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What is the difference between Identical and Similar mode?',
      answer: 'In Identical mode, all images come from the same theme but one is a visual variant \u2014 students spot the image that looks different. In Similar mode, the odd item comes from a completely different theme \u2014 students identify which item doesn\u2019t belong to the category.',
    },
    {
      question: 'How many exercises fit on one page?',
      answer: 'You can set between 5 and 10 exercise rows per worksheet. Five exercises provide more space per row for younger learners. Ten exercises create a denser challenge for older students.',
    },
    {
      question: 'Can I mix both modes on one worksheet?',
      answer: 'Yes. Set a default mode for the worksheet, then override individual exercises to use the other mode. This creates varied difficulty within a single page and tests both visual discrimination and categorization skills.',
    },
    {
      question: 'How does the two-theme system work?',
      answer: 'Select a primary theme (provides most images per row) and a secondary theme (provides odd items in Similar mode). In Identical mode, the primary theme provides all images including the variant. The two themes work together to create meaningful visual contrast.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. Every puzzle generates an answer key that clearly circles the odd item in each row. The answer key matches the puzzle layout and exports as a separate file.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes a curated selection of popular themes. Both tiers allow custom image uploads.',
    },
    {
      question: 'Can I sell the puzzles I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the odd one out generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All features, modes, exercise counts, and themes work in the free version. The only difference is a watermark on exported files. Try everything before buying.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since odd one out puzzles are image-based, the content works universally.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'missing-pieces', pageType: 'app', anchorText: 'Missing Piece Puzzle Generator' },
    { slug: 'sudoku', pageType: 'app', anchorText: 'Sudoku Generator' },
    { slug: 'picture-path', pageType: 'app', anchorText: 'Picture Path Generator' },
    { slug: 'find-objects', pageType: 'app', anchorText: 'Find Objects Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Shadow Match Generator' },
    { slug: 'matching', pageType: 'app', anchorText: 'Matching Generator' },
    { slug: 'odd-one-out', pageType: 'tool', anchorText: 'Try Odd One Out Generator Free' },
    { slug: 'puzzle-bundle', pageType: 'bundle', anchorText: 'Puzzles & Games Bundle \u2014 Save on All Puzzle Generators' },
    { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'How to Create Puzzle Books' },
    { slug: 'puzzle-printable-ideas', pageType: 'idea', anchorText: 'Puzzle Printable Niche Ideas' },
  ],
};
