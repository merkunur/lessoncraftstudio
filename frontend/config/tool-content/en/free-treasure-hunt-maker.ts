import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'treasure-hunt',
  locale: 'en',

  seo: {
    titleTag: 'Free Treasure Hunt Worksheet Maker | No Signup',
    metaDescription: 'Create free treasure hunt worksheets with number grids, direction-based paths, and math operations. Answer keys and PDF export included. No signup required.',
    primaryKeyword: 'free treasure hunt worksheet',
    secondaryKeywords: [
      'treasure hunt maker free printable',
      'number grid board game worksheet',
      'free path finding math worksheet',
      'treasure hunt activity PDF generator',
      'direction worksheet generator free',
    ],
    lsiKeywords: [
      'directional skills worksheets',
      'math path worksheets kids',
      'grid navigation activities',
      'number board game printable',
      'following directions worksheets',
      'math operations practice games',
      'spatial navigation printable',
      'coordinate grid activities kids',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/treasure hunt/Treasure Hunt (1).jpeg',
      primaryAlt: 'Free treasure hunt worksheet with numbered grid and directional path to the treasure',
      secondary: '/samples/english/treasure hunt/Treasure Hunt (2).jpeg',
      secondaryAlt: 'Treasure hunt answer key showing the correct path through the number grid',
    },
    sampleGallery: [
      { src: '/samples/english/treasure hunt/Treasure Hunt (3).jpeg', alt: 'Treasure hunt with animal-themed grid and arrow direction clues', caption: 'Animal theme grid' },
      { src: '/samples/english/treasure hunt/Treasure Hunt (4).jpeg', alt: 'Treasure hunt worksheet with addition operations along the path', caption: 'Addition path mode' },
      { src: '/samples/english/treasure hunt/Treasure Hunt (5).jpeg', alt: 'Treasure hunt grid with subtraction challenges at each step', caption: 'Subtraction path mode' },
      { src: '/samples/english/treasure hunt/Treasure Hunt (6).jpeg', alt: 'Simple treasure hunt with basic directional arrows for beginners', caption: 'Easy directional mode' },
      { src: '/samples/english/treasure hunt/Treasure Hunt (7).jpeg', alt: 'Complex treasure hunt with mixed math operations and large grid', caption: 'Advanced mixed operations' },
      { src: '/samples/english/treasure hunt/Treasure Hunt (8).jpeg', alt: 'Treasure hunt answer key with correct path highlighted', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'How to Create Free Treasure Hunt Worksheets',
  },

  hero: {
    title: 'Free Treasure Hunt Worksheet Maker',
    tagline: 'Navigate number grids with directions and math operations to find the treasure \u2014 free, no account needed',
    description: `Need a free treasure hunt worksheet maker that combines direction-following with math practice? This generator creates number-grid board game worksheets where students navigate from start to treasure using directional clues and solving math operations along the path. Every feature works in your browser without signup or payment.

The Treasure Hunt generator creates worksheets built around a numbered grid where students follow a path from a starting position to hidden treasure. Along the way, they encounter direction-based clues (up, down, left, right) and math operations (addition, subtraction, or mixed) that determine the next move. This format develops three skills simultaneously: directional/spatial understanding, mathematical operations, and sequential reasoning.

What makes this generator uniquely valuable is the combination of navigation and math in a single activity. In direction mode, students follow arrow clues to trace a path through the grid. In math mode, they solve operations at each cell to determine which direction to move next. In combined mode, both elements work together for a multi-layered challenge. The grid size adjusts from small (4x4) for beginners to large (8x8) for advanced students.

Themed images from 104 categories decorate the grid and mark the start, treasure, and landmarks along the path. This transforms abstract grid navigation into an adventure story \u2014 help the pirate find the gold, guide the astronaut to the space station, lead the explorer to the hidden temple. Every worksheet generates a matching answer key showing the correct path. The canvas editor adds titles, instructions, and themed borders. Export as JPEG or PDF with optional grayscale. Everything is free with only a small watermark on paid exports.`,
  },

  whatYouCanCreate: [
    {
      title: 'Directional Navigation Worksheets',
      description: 'Grid paths guided by arrow clues (up, down, left, right). Students trace the route by following directions, building spatial orientation and direction-following skills.',
    },
    {
      title: 'Math Operation Path Challenges',
      description: 'Grid cells contain math problems. The answer determines the next move. Addition, subtraction, or mixed operations turn path-finding into computational practice.',
    },
    {
      title: 'Combined Direction-and-Math Puzzles',
      description: 'Paths require both following directional clues and solving math operations at key intersections. This multi-layered format challenges students to switch between spatial and numerical thinking.',
    },
    {
      title: 'Themed Adventure Board Games',
      description: 'Use themed images to create story-based treasure hunts: pirate adventures, space exploration, jungle expeditions. The narrative context makes abstract math feel like play.',
    },
    {
      title: 'Progressive Grid Challenges',
      description: 'Start with small 4x4 grids using simple directions and advance to large 8x8 grids with mixed operations. Each level builds on skills practiced in the previous one.',
    },
    {
      title: 'Classroom Relay Activities',
      description: 'Print multiple treasure hunts with different paths. Teams race to solve their grid first, adding a competitive element that motivates careful but quick math work.',
    },
  ],

  tutorial: {
    title: 'How to Make a Treasure Hunt Worksheet in 10 Steps',
    steps: [
      {
        title: 'Open the Generator',
        description: 'Click "Try It Free" on this page. The treasure hunt maker loads instantly in your browser. No account, no download, no delay.',
      },
      {
        title: 'Choose the Grid Size',
        description: 'Select a grid from 4x4 (simple, few steps) to 8x8 (complex, many steps). Smaller grids suit younger students. Larger grids create longer adventures with more challenges.',
      },
      {
        title: 'Select the Path Mode',
        description: 'Choose Direction mode (follow arrow clues), Math mode (solve operations to determine moves), or Combined mode (both elements together).',
      },
      {
        title: 'Set Math Operations (if applicable)',
        description: 'If using math mode, choose addition, subtraction, or mixed operations. Set the number range to match your students\u2019 skill level. Smaller numbers for beginners, larger for advanced.',
      },
      {
        title: 'Choose an Image Theme',
        description: 'Browse 104 themed categories and select images for the start point, treasure, and grid decorations. Themed images transform the grid into a visual adventure.',
      },
      {
        title: 'Generate the Treasure Hunt',
        description: 'Click generate and the algorithm creates a solvable path from start to treasure. The path is guaranteed to have exactly one correct solution.',
      },
      {
        title: 'Preview the Grid',
        description: 'Review the number grid, directional clues, and math operations. Try solving it yourself to verify the difficulty is appropriate for your students.',
      },
      {
        title: 'Customize with Canvas Editor',
        description: 'Add a title like "Find the Hidden Treasure!", a student name field, and adventure-themed instructions. Apply borders and backgrounds for an engaging design.',
      },
      {
        title: 'Generate the Answer Key',
        description: 'Toggle the answer key to see the correct path highlighted through the grid with all math solutions shown. The key exports separately for easy grading.',
      },
      {
        title: 'Export as JPEG or PDF',
        description: 'Download the treasure hunt and answer key in your preferred format. Toggle grayscale for black-and-white printing. Both files export at full resolution.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Math Adventure Books for Amazon KDP',
      description: 'Compile 50\u2013100 treasure hunt grids into themed books: "Math Treasure Hunts for Kids," "Number Grid Adventures." Include progressive difficulty from simple directions to complex mixed operations. Math activity books with a game format stand out in KDP search results.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Math Practice Game Packs on Etsy',
      description: 'Bundle 15\u201320 treasure hunt worksheets as instant-download packs. Offer operation-specific sets (addition adventures, subtraction quests) or grade-leveled difficulty packs. "Math games printable" and "math worksheets fun" are high-volume search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Math Center Resources for TPT',
      description: 'Create math station packs with treasure hunts covering specific standards: addition within 20, subtraction with regrouping, mixed operations. Include recording sheets and self-check answer keys. TPT teachers search for engaging math center activities by standard.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Directional Skills Activity Sets',
      description: 'Focus on direction-only mode to create spatial navigation packs for occupational therapy and special education. Following directions on a grid builds spatial orientation skills used in reading, writing, and daily navigation.',
      platform: 'Multi-platform',
    },
    {
      title: 'Seasonal Math Adventures',
      description: 'Use themed images for seasonal treasure hunts: pirate treasure for summer, haunted house hunts for Halloween, North Pole adventures for winter. Seasonal math games attract concentrated demand around holidays.',
      platform: 'Gumroad',
    },
    {
      title: 'Homework and Review Game Packs',
      description: 'Create take-home treasure hunt sheets as an alternative to traditional math homework. Parents appreciate activities that feel like games. Students practice more willingly when math is embedded in an adventure format.',
      platform: 'Etsy',
    },
  ],

  proTips: [
    {
      title: 'Start with Direction Mode for Young Learners',
      tip: 'Before adding math, make sure students can follow directional arrows on a grid. Direction-only mode builds the spatial foundation needed for math mode. Add operations only after navigation is solid.',
    },
    {
      title: 'Match Math Difficulty to Curriculum',
      tip: 'Set the number range to match what students are currently learning. Addition within 10 for kindergarten, within 20 for first grade, mixed operations for second grade and up.',
    },
    {
      title: 'Use Small Grids for First Attempts',
      tip: 'A 4x4 grid with 8\u201310 steps lets students experience the full treasure hunt format quickly. Success on small grids builds confidence for larger, more complex adventures.',
    },
    {
      title: 'Add Story Context',
      tip: 'Before distributing the worksheet, set the scene: "Captain Coral needs to find the sunken treasure! Solve each math problem to discover the next direction." Story framing increases engagement significantly.',
    },
    {
      title: 'Use Combined Mode for Differentiation',
      tip: 'In combined mode, some cells use directional clues (easier) and some use math operations (harder). This natural differentiation means struggling students can still progress while advanced students are challenged.',
    },
    {
      title: 'Print Answer Keys on Cards',
      tip: 'For self-directed math stations, print answer keys on separate cards. Students complete the treasure hunt, then check the card to see if they found the correct path.',
    },
    {
      title: 'Create Team Competitions',
      tip: 'Print different treasure hunts for different teams. The first team to find the correct path wins. Competition motivates careful math work because wrong answers lead to wrong paths.',
    },
  ],

  faq: [
    {
      question: 'Is this treasure hunt maker completely free?',
      answer: 'Yes. Every feature works without signup or payment. All grid sizes, all path modes, all math operation settings, and the full canvas editor are available. Exports include a small watermark that paid plans remove.',
    },
    {
      question: 'What are the three path modes?',
      answer: 'Direction mode uses arrow clues to guide the path. Math mode requires solving operations to determine the next move. Combined mode uses both directional clues and math operations together for a multi-layered challenge.',
    },
    {
      question: 'What math operations are supported?',
      answer: 'Addition, subtraction, and mixed (both). You set the number range to match your students\u2019 level. The generator creates operations that always have a valid answer pointing to the next grid cell.',
    },
    {
      question: 'Does every puzzle have exactly one solution?',
      answer: 'Yes. The generation algorithm guarantees each treasure hunt has exactly one correct path from start to treasure. Wrong answers at math cells lead to dead ends, providing natural feedback.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every treasure hunt generates an answer key showing the correct path highlighted with all math solutions displayed. The answer key exports as a separate file.',
    },
    {
      question: 'What grid sizes are available?',
      answer: 'Grids range from 4x4 (simple, quick) to 8x8 (complex, extended). Smaller grids suit kindergarten and first grade. Larger grids challenge older elementary students with longer multi-step paths.',
    },
    {
      question: 'Can I upload my own images?',
      answer: 'Yes. Upload custom images for the start marker, treasure icon, and grid decorations. This is useful for classroom themes, seasonal activities, or branded materials.',
    },
    {
      question: 'What export formats are available?',
      answer: 'Download as high-resolution JPEG or print-ready PDF. A grayscale toggle produces black-and-white output for ink-efficient printing. The treasure hunt and answer key export as separate files.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the treasure hunt generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, all grid sizes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'tool', anchorText: 'Free I Spy Worksheet Generator' },
    { slug: 'find-objects', pageType: 'tool', anchorText: 'Free Hidden Object Maker' },
    { slug: 'crossword', pageType: 'tool', anchorText: 'Free Picture Crossword Generator' },
    { slug: 'picture-path', pageType: 'tool', anchorText: 'Free Maze Worksheet Generator' },
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Math Puzzle Generator' },
    { slug: 'addition', pageType: 'app', anchorText: 'Addition Worksheet Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator \u2014 Full Details' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Search & Find Bundle \u2014 Save on All Search Generators' },
    { slug: 'create-math-games', pageType: 'guide', anchorText: 'How to Create Math Game Books for KDP' },
    { slug: 'math-game-ideas', pageType: 'idea', anchorText: 'Math Game Printable Ideas' },
  ],
};
