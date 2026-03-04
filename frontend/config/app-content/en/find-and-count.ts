import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'find-and-count',
  locale: 'en',
  category: 'search',

  seo: {
    titleTag: 'I Spy & Find and Count Generator | Free Online',
    metaDescription: 'Create I Spy counting worksheets with three modes: Manual, Auto, Letter Spotting. Grid 5-10, 1-4 hidden objects, answer key circles targets. Free generator with PDF.',
    primaryKeyword: 'I Spy worksheet generator',
    secondaryKeywords: [
      'find and count worksheets',
      'I Spy printable maker',
      'counting worksheet generator',
      'hidden object worksheets',
      'search and count activities',
    ],
    lsiKeywords: [
      'counting activities for kids',
      'visual scanning worksheets',
      'observation skills activities',
      'number recognition practice',
      'I Spy books printable',
      'counting games for preschool',
      'seek and find worksheets',
      'visual attention activities',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/find and count/I Spy 1.jpeg',
      primaryAlt: 'I Spy counting worksheet with a grid of images and counting tasks below',
      secondary: '/samples/english/find and count/I Spy 2.jpeg',
      secondaryAlt: 'I Spy answer key with target objects circled in the grid',
    },
    sampleGallery: [
      { src: '/samples/english/find and count/I Spy 3.jpeg', alt: 'I Spy worksheet in Auto mode with animal theme and counting boxes', caption: 'Auto mode with counting tasks' },
      { src: '/samples/english/find and count/I Spy 4.jpeg', alt: 'I Spy worksheet in Manual mode with custom image placement', caption: 'Manual mode \u2014 custom layout' },
      { src: '/samples/english/find and count/I Spy 5.jpeg', alt: 'Letter Spotting mode with alphabet letters hidden in image grid', caption: 'Letter Spotting mode' },
      { src: '/samples/english/find and count/I Spy 6.jpeg', alt: 'I Spy worksheet with 10x10 grid and multiple hidden objects', caption: '10\u00d710 grid with 4 targets' },
      { src: '/samples/english/find and count/I Spy 7.jpeg', alt: 'I Spy worksheet with themed border and food images', caption: 'Themed border design' },
      { src: '/samples/english/find and count/I Spy 8.jpeg', alt: 'I Spy answer key with all hidden objects circled and counted', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '0cOPi7eajLs',
    videoTitle: 'How to Create I Spy Counting Worksheets',
  },

  hero: {
    title: 'Find & Count Generator',
    tagline: 'I Spy counting worksheets that blend visual scanning with number skills',
    description: `I Spy worksheets are among the most popular printable products for young children because they combine the thrill of a search game with genuine counting practice. The Find & Count Generator creates professional I Spy worksheets where students scan a grid of images to find and count specific target objects. The grid fills with themed images, and counting tasks appear below asking students to find and tally each target.

Three generation modes provide different levels of control. Auto mode generates the entire grid automatically from a selected theme \u2014 choose animal images and the generator fills a grid with mixed animals, then creates counting tasks for specific ones. Manual mode lets you place each image individually on the grid for precise control over placement and difficulty. Letter Spotting mode hides alphabet letters within the image grid, combining letter recognition with the visual scanning challenge.

The grid size ranges from 5 to 10 rows and 5 to 10 columns, creating worksheets from 25 to 100 cells. You set between 1 and 4 hidden target objects to find and count. Task type variations for each image keep the format fresh \u2014 some tasks ask "How many cats?" while others use different phrasing. The answer key circles all target objects in the grid and shows the correct counts.

The full canvas editor lets you add titles, instructions, and themed decorations. Export as JPEG for digital assignments or PDF for print-ready handouts. A grayscale toggle produces ink-friendly versions for schools printing in bulk. Try every feature free right now \u2014 the generator works without signup, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create an I Spy Counting Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose a Generation Mode',
        description: 'Select Auto mode for quick generation from a theme, Manual mode for precise image placement, or Letter Spotting mode to hide alphabet letters in the grid. Each mode creates a different type of search-and-count experience.',
      },
      {
        title: 'Select an Image Theme',
        description: 'Browse 104 image themes \u2014 animals, food, vehicles, nature, and more. In Auto mode, the theme fills the grid automatically. In Manual mode, pick individual images for each cell.',
      },
      {
        title: 'Configure the Grid Size',
        description: 'Set rows from 5 to 10 and columns from 5 to 10. Smaller grids (5\u00d75) suit preschoolers. Larger grids (10\u00d710) challenge older students with 100 images to scan through.',
      },
      {
        title: 'Set Target Objects',
        description: 'Choose 1 to 4 target objects that students must find and count in the grid. More targets create longer worksheets with multiple counting tasks. The generator varies task phrasing for each target.',
      },
      {
        title: 'Export Worksheet and Answer Key',
        description: 'Download the I Spy worksheet and its answer key as JPEG or PDF. The answer key circles all target objects and shows correct counts. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Three Generation Modes',
      description: 'Auto mode fills the grid from a theme automatically for quick creation. Manual mode gives you precise control over every cell for custom difficulty. Letter Spotting mode hides alphabet letters in the image grid for combined letter recognition and visual scanning practice.',
    },
    {
      title: 'Adjustable Grid (5\u00d75 to 10\u00d710)',
      description: 'Set rows and columns independently from 5 to 10, creating grids from 25 to 100 cells. Small grids work for preschool counting practice. Large grids challenge older students with dense visual scanning tasks that build sustained attention.',
    },
    {
      title: 'Multiple Target Objects (1\u20134)',
      description: 'Set between 1 and 4 hidden objects for students to find and count. A single target creates a focused search task. Multiple targets extend the worksheet with varied counting challenges and reward thorough scanning.',
    },
    {
      title: 'Task Type Variations',
      description: 'The generator creates varied phrasing for each counting task, keeping the format fresh across exercises. Different question styles maintain student engagement throughout the worksheet and prevent mechanical completion.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides illustrated items that populate the grid. Animals, food, vehicles, nature, sports, and seasonal themes align worksheets with classroom units. The theme library ensures endless variety across worksheet sets.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and position elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo for complete design control.',
    },
    {
      title: 'Answer Key with Circled Targets',
      description: 'Every worksheet generates an answer key that circles all target objects in the grid and displays the correct count for each. The visual circling makes grading instant and supports self-checking by students.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the worksheet and answer key export at full quality as separate files.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create I Spy Activity Books for Amazon KDP',
      description: 'Compile 50\u2013100 I Spy counting worksheets into themed books: "I Spy Animals," "Find and Count \u2014 Food Edition," "Seek and Count for Preschoolers." I Spy books are a proven KDP category with consistent demand. The image-rich format creates compelling preview images.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Counting Worksheet Packs on Etsy',
      description: 'Bundle 15\u201320 I Spy worksheets as instant-download packs. Offer difficulty tiers by grid size: Easy (5\u00d75), Medium (7\u00d77), Hard (10\u00d710). "I Spy printable" and "counting worksheets" are high-volume Etsy search terms that convert well.',
      platform: 'Etsy',
    },
    {
      title: 'Build Counting Resources for TPT',
      description: 'Create curriculum-aligned I Spy packs for counting standards. Include recording sheets, progress trackers, and differentiated worksheets by grid size and target count. TPT preschool and kindergarten teachers search for "I Spy math centers" and "counting activities."',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Seasonal I Spy Collections',
      description: 'Use themed images for seasonal I Spy packs: spring garden I Spy, summer beach counting, autumn harvest find-and-count, winter holiday seek-and-find. Seasonal products attract concentrated demand and work as engaging classroom holiday activities.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Counting Skills Program',
      description: 'Structure worksheets into a progressive program: start with 5\u00d75 grids and 1 target, advance to 10\u00d710 grids with 4 targets. Include Letter Spotting worksheets for letter recognition integration. Package as a 12-week counting and observation curriculum.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What are the three generation modes?',
      answer: 'Auto mode fills the grid automatically from a selected theme. Manual mode lets you place each image individually for precise control. Letter Spotting mode hides alphabet letters in the image grid for combined letter recognition and counting practice.',
    },
    {
      question: 'How big can the grid be?',
      answer: 'Set rows and columns independently from 5 to 10, creating grids from 5\u00d75 (25 cells) to 10\u00d710 (100 cells). Smaller grids suit preschoolers. Larger grids challenge older students with more images to scan.',
    },
    {
      question: 'How many target objects can I set?',
      answer: 'You can set between 1 and 4 target objects per worksheet. Each target gets its own counting task. More targets create longer worksheets with multiple search-and-count exercises.',
    },
    {
      question: 'How does the answer key work?',
      answer: 'The answer key circles all instances of each target object in the grid and displays the correct count below. This makes grading instant and helps students self-check their answers.',
    },
    {
      question: 'What is Letter Spotting mode?',
      answer: 'Letter Spotting mode hides alphabet letters within the image grid. Students scan for specific letters and count how many times each appears. It combines letter recognition practice with the visual scanning challenge of I Spy.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes popular themes. Both tiers allow custom image uploads for personalized worksheets.',
    },
    {
      question: 'Can I sell the worksheets I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the find and count generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All modes, grid sizes, and themes work in the free version. The only difference is a watermark on exported files. Try everything to make sure it fits your needs before buying.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Image-based I Spy content works universally across languages.',
    },
    {
      question: 'What export formats are available?',
      answer: 'Download worksheets as high-resolution JPEG or print-ready PDF. A grayscale toggle produces black-and-white output for efficient printing. Both the worksheet and answer key export as separate files.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'find-objects', pageType: 'app', anchorText: 'Find Objects Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator' },
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Odd One Out Generator' },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Chart Count Generator' },
    { slug: 'find-and-count', pageType: 'tool', anchorText: 'Try Find & Count Generator Free' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Search & Find Bundle \u2014 Save on All Search Generators' },
    { slug: 'create-i-spy-books', pageType: 'guide', anchorText: 'How to Create I Spy Books' },
    { slug: 'counting-printable-ideas', pageType: 'idea', anchorText: 'Counting Printable Niche Ideas' },
  ],
};
