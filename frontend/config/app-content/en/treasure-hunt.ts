import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'treasure-hunt',
  locale: 'en',
  category: 'search',

  seo: {
    titleTag: 'Treasure Hunt Generator | Directional Path Puzzles Free',
    metaDescription: 'Create treasure hunt directional puzzles on a 5\u00d75 grid. Basic or cardinal directions, no-adjacent-duplicate constraint. Free generator with answer keys and PDF export.',
    primaryKeyword: 'treasure hunt worksheet generator',
    secondaryKeywords: [
      'directional path puzzles',
      'direction worksheets for kids',
      'treasure hunt printable maker',
      'compass direction worksheets',
      'path following activities',
    ],
    lsiKeywords: [
      'following directions worksheets',
      'spatial orientation activities',
      'compass rose worksheets',
      'map skills activities',
      'directional vocabulary practice',
      'navigation puzzles for kids',
      'left right up down worksheets',
      'cardinal direction activities',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/treasure hunt/Treasure Hunt 1.jpeg',
      primaryAlt: 'Treasure hunt directional puzzle on a 5\u00d75 grid with arrow directions leading to a treasure image',
      secondary: '/samples/english/treasure hunt/Treasure Hunt 2.jpeg',
      secondaryAlt: 'Treasure hunt answer key showing the correct path traced through the grid',
    },
    sampleGallery: [
      { src: '/samples/english/treasure hunt/Treasure Hunt 3.jpeg', alt: 'Treasure hunt with basic directions Up Down Left Right for young learners', caption: 'Basic directions mode' },
      { src: '/samples/english/treasure hunt/Treasure Hunt 4.jpeg', alt: 'Treasure hunt with cardinal directions North South East West', caption: 'Cardinal directions mode' },
      { src: '/samples/english/treasure hunt/Treasure Hunt 5.jpeg', alt: 'Treasure hunt puzzle with animal theme images on the grid', caption: 'Animal theme grid' },
      { src: '/samples/english/treasure hunt/Treasure Hunt 6.jpeg', alt: 'Treasure hunt with themed border and nature images at start and end', caption: 'Nature theme with border' },
      { src: '/samples/english/treasure hunt/Treasure Hunt 7.jpeg', alt: 'Treasure hunt puzzle showing start position marked with an arrow', caption: 'Clear start and end positions' },
      { src: '/samples/english/treasure hunt/Treasure Hunt 8.jpeg', alt: 'Treasure hunt answer key with correct path highlighted', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'How to Create Treasure Hunt Directional Puzzles',
  },

  hero: {
    title: 'Treasure Hunt Generator',
    tagline: 'Follow the directions through a 5\u00d75 grid to find the hidden treasure \u2014 basic or cardinal directions',
    description: `Learning to follow directional instructions is a foundational skill that children need for reading maps, understanding spatial relationships, and navigating their world. The Treasure Hunt Generator creates directional path puzzles on a 5\u00d75 grid where students follow a sequence of direction commands to trace a path from start to finish, ultimately reaching the hidden treasure at the end.

Two direction types adapt the puzzle to different age groups and skill levels. Basic directions use Up, Down, Left, and Right \u2014 simple vocabulary ideal for Pre-K through 1st grade students who are learning spatial orientation. Cardinal directions use North, South, East, and West \u2014 map-reading vocabulary for 2nd grade and beyond. Both modes teach the same path-following logic but with age-appropriate directional language.

The 5\u00d75 grid provides 25 cells with themed images from the 104-theme library. A no-adjacent-duplicate constraint ensures that the same image never appears in two neighboring cells, keeping the grid visually clear and preventing confusion. Students read each direction command, move to the next cell, and continue until they reach the treasure at the designated end position. The start and end positions are clearly marked.

Every puzzle generates a matching answer key that traces the correct path through the grid. The full canvas editor adds titles, instructions, and themed decorations. Export as JPEG for digital assignments or PDF for print-ready worksheets. A grayscale toggle produces ink-friendly versions. Try every feature free right now \u2014 the generator works without signup, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create a Treasure Hunt Puzzle in 5 Steps',
    steps: [
      {
        title: 'Choose a Direction Type',
        description: 'Select Basic directions (Up/Down/Left/Right) for Pre-K through 1st grade or Cardinal directions (North/South/East/West) for 2nd grade and beyond. Both modes teach directional following with age-appropriate vocabulary.',
      },
      {
        title: 'Select an Image Theme',
        description: 'Browse 104 image themes to fill the 5\u00d75 grid. Animals, food, vehicles, and nature themes make the grid visually engaging. The no-adjacent-duplicate constraint keeps images well-distributed.',
      },
      {
        title: 'Configure Start and End Positions',
        description: 'Set where the path begins and where the treasure is located on the grid. The generator creates a valid sequence of direction commands connecting start to end through the grid cells.',
      },
      {
        title: 'Customize the Layout',
        description: 'Use the canvas editor to add a title, student name field, and instructions. Apply themed backgrounds and borders. Position the direction list clearly alongside the grid.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the treasure hunt puzzle and its answer key as JPEG or PDF. The answer key traces the correct path through the grid. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Two Direction Types: Basic and Cardinal',
      description: 'Basic mode uses Up, Down, Left, and Right for young learners developing spatial orientation. Cardinal mode uses North, South, East, and West for older students learning map-reading vocabulary. Both modes produce valid directional paths through the 5\u00d75 grid.',
    },
    {
      title: '5\u00d75 Grid with Themed Images',
      description: 'The 25-cell grid fills with themed images from the 104-theme library. Each cell displays an image that students pass through as they follow directions. The grid size is ideal for directional puzzles \u2014 large enough for meaningful paths but small enough for young learners to track.',
    },
    {
      title: 'No-Adjacent-Duplicate Constraint',
      description: 'The generator ensures that the same image never appears in two neighboring cells (horizontally, vertically, or diagonally). This keeps the grid visually clear and prevents students from confusing adjacent cells during path-following.',
    },
    {
      title: 'Configurable Start and End Positions',
      description: 'Set the starting cell and treasure location anywhere on the grid. The generator creates a valid sequence of directions connecting the two positions. Different start/end combinations create unique paths every time.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides images that fill the grid cells. Animals, food, vehicles, nature, sports, and seasonal themes create visually rich grids that engage students and align with classroom units.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and arrange elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo for professional design.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every puzzle generates an answer key that traces the correct path through the grid from start to treasure. The path is clearly highlighted for easy grading and self-checking.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the puzzle and answer key export at full quality as separate files.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Direction-Following Books for Amazon KDP',
      description: 'Compile 50\u2013100 treasure hunt puzzles into directional skills books: "Treasure Hunt Puzzles for Preschoolers," "Follow the Directions \u2014 Cardinal Edition." Direction-following activity books fill a specific niche in KDP with less competition than general puzzle books.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Directional Skills Packs on Etsy',
      description: 'Bundle 15\u201320 treasure hunt worksheets as instant-download packs. Create Basic and Cardinal direction sets separately for age-targeted marketing. "Direction worksheets for kids" and "following directions activities" are consistent Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Map Skills Resources for TPT',
      description: 'Create curriculum-aligned treasure hunt packs for spatial orientation and map skills standards. Cardinal direction puzzles directly support social studies map-reading objectives. Include recording sheets, vocabulary cards, and differentiated difficulty levels.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Themed Adventure Collections',
      description: 'Use themed images to create adventure-themed treasure hunts: pirate treasure, jungle expedition, space exploration, underwater discovery. Themed adventure packs appeal to specific interests and make engaging party activities.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Directional Skills Progression',
      description: 'Structure puzzles into a progressive program: start with Basic directions (short paths, 3\u20134 steps), advance to longer paths, then transition to Cardinal directions. Package as an 8-week spatial orientation curriculum for Pre-K through 2nd grade.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What are the two direction types?',
      answer: 'Basic directions use Up, Down, Left, and Right \u2014 ideal for Pre-K through 1st grade. Cardinal directions use North, South, East, and West \u2014 ideal for 2nd grade and beyond. Both create valid paths through the 5\u00d75 grid.',
    },
    {
      question: 'How big is the grid?',
      answer: 'The grid is 5\u00d75 (25 cells). This size is ideal for directional puzzles: large enough for meaningful multi-step paths but compact enough for young learners to track their position through each step.',
    },
    {
      question: 'What is the no-adjacent-duplicate constraint?',
      answer: 'The generator ensures that the same image never appears in two neighboring cells. This prevents visual confusion when students trace their path and makes each cell clearly distinguishable from its neighbors.',
    },
    {
      question: 'Can I set where the path starts and ends?',
      answer: 'Yes. Configure the starting cell and the treasure (end) position anywhere on the grid. The generator creates a valid direction sequence connecting the two. Different positions produce unique paths every time.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. Every puzzle generates an answer key that traces the correct path from start to treasure through the grid. The path is clearly highlighted for easy grading or self-checking.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes popular themes. Both tiers allow custom image uploads for personalized treasure hunt grids.',
    },
    {
      question: 'Can I sell the puzzles I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the treasure hunt generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. Both direction types, all themes, and all features work in the free version. The only difference is a watermark on exported files. Try everything before buying.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface and direction labels support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Direction words are translated in each language.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Find & Count Generator' },
    { slug: 'find-objects', pageType: 'app', anchorText: 'Find Objects Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'picture-path', pageType: 'app', anchorText: 'Picture Path Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Drawing Lines Generator' },
    { slug: 'grid-match', pageType: 'app', anchorText: 'Grid Match Generator' },
    { slug: 'treasure-hunt', pageType: 'tool', anchorText: 'Try Treasure Hunt Generator Free' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Search & Find Bundle \u2014 Save on All Search Generators' },
    { slug: 'create-treasure-hunt-books', pageType: 'guide', anchorText: 'How to Create Treasure Hunt Books' },
    { slug: 'direction-printable-ideas', pageType: 'idea', anchorText: 'Direction Activity Printable Ideas' },
  ],
};
