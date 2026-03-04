import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'crossword',
  locale: 'en',
  category: 'search',

  seo: {
    titleTag: 'Crossword Generator | Image Clue Crosswords Free',
    metaDescription: 'Create crossword puzzles with image clues or custom word lists. Auto-generated layout, drag-drop editing, portrait and landscape modes. Free generator with PDF export.',
    primaryKeyword: 'crossword puzzle generator',
    secondaryKeywords: [
      'crossword maker with images',
      'printable crossword generator',
      'custom crossword creator',
      'crossword worksheet maker',
      'picture crossword generator',
    ],
    lsiKeywords: [
      'crossword puzzles for kids',
      'vocabulary crossword worksheets',
      'spelling practice crossword',
      'word puzzle generator',
      'educational crossword maker',
      'classroom crossword activities',
      'crossword puzzle printable',
      'crossword books for kids',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/crossword/crossword_worksheet (1).jpeg',
      primaryAlt: 'Crossword puzzle with image clues positioned around the grid showing animal vocabulary',
      secondary: '/samples/english/crossword/crossword_worksheet (2).jpeg',
      secondaryAlt: 'Crossword puzzle answer key with all words filled in the grid',
    },
    sampleGallery: [
      { src: '/samples/english/crossword/crossword_worksheet (3).jpeg', alt: 'Crossword with food theme and 4 image clues around the grid', caption: 'Image clue crossword' },
      { src: '/samples/english/crossword/crossword_worksheet (4).jpeg', alt: 'Crossword in Custom Word List mode with text clues', caption: 'Custom Word List mode' },
      { src: '/samples/english/crossword/crossword_worksheet (5).jpeg', alt: 'Crossword puzzle in landscape layout with themed border', caption: 'Landscape layout' },
      { src: '/samples/english/crossword/crossword_worksheet (6).jpeg', alt: 'Crossword with manual drag-drop editing of word positions', caption: 'Drag-drop manual editing' },
      { src: '/samples/english/crossword/crossword_worksheet (7).jpeg', alt: 'Crossword puzzle with vehicle theme and decorative border', caption: 'Vehicle theme with border' },
      { src: '/samples/english/crossword/crossword_worksheet (8).jpeg', alt: 'Crossword answer key with completed grid', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'b3WKDrzif-w',
    videoTitle: 'How to Create Crossword Puzzles with Image Clues',
  },

  hero: {
    title: 'Crossword Generator',
    tagline: 'Image-clue crosswords that turn vocabulary practice into an interlocking word puzzle',
    description: `Crossword puzzles have been a cornerstone of vocabulary practice for over a century, and they remain one of the most effective formats for spelling reinforcement and word recognition. The Crossword Generator takes the classic format and enhances it with image clues from the 104-theme library, creating visually rich puzzles where students identify pictures and spell their names into the interlocking grid.

The auto-layout engine places words in an interlocking crossword pattern automatically. Select images from a theme and the generator uses their names as crossword words, arranging them with shared letters to create a proper interlocking grid. Four image clues are positioned around the grid with numbered references to their across or down positions. The result looks like a professional crossword that would take hours to design manually.

Custom Word List mode lets you type any words you want, with text-based clues instead of images. This opens the generator to any subject vocabulary: science terms, social studies keywords, foreign language words, or custom spelling lists. The manual edit feature uses drag-and-drop to adjust word positions after auto-generation, giving you precise control over the final layout.

Both portrait and landscape orientations are supported with automatic layout adjustment. The full canvas editor adds titles, instructions, and themed decorations. Every puzzle generates a matching answer key with all words filled in. Export as JPEG for digital use or PDF for print. A grayscale toggle produces ink-friendly versions. Try every feature free right now \u2014 no signup required, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create a Crossword Puzzle in 5 Steps',
    steps: [
      {
        title: 'Choose Your Word Source',
        description: 'Select images from the 104-theme library (their names become crossword words) or type a Custom Word List with text-based clues. Image clues make the crossword visual. Custom words make it subject-specific.',
      },
      {
        title: 'Auto-Generate the Layout',
        description: 'The engine arranges words in an interlocking crossword pattern, maximizing letter intersections. Four image clues are positioned around the grid with numbered across/down references. The layout works automatically.',
      },
      {
        title: 'Edit with Drag-and-Drop',
        description: 'Optionally adjust word positions using the manual drag-and-drop editor. Move words to improve the layout, change intersections, or reposition image clues. The editor maintains valid crossword structure.',
      },
      {
        title: 'Choose Orientation and Style',
        description: 'Select portrait or landscape layout. Use the canvas editor to add a title, student name field, and instructions. Apply themed backgrounds and borders for a polished design.',
      },
      {
        title: 'Export Puzzle and Answer Key',
        description: 'Download the crossword puzzle and its answer key as JPEG or PDF. The answer key shows all words filled in the grid. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Auto-Generated Crossword Layout',
      description: 'The layout engine arranges words in an interlocking pattern, maximizing shared letters between across and down entries. The algorithm produces proper crossword structures automatically from any word list or theme selection.',
    },
    {
      title: 'Image Clues from 104 Themes',
      description: 'Four image clues are positioned around the crossword grid, each numbered to match its across or down entry. Students identify the picture and spell its name into the grid. This combines visual recognition with spelling practice.',
    },
    {
      title: 'Custom Word List with Text Clues',
      description: 'Type any words with text-based clue descriptions for subject-specific crosswords. Create science vocabulary puzzles, social studies term reviews, foreign language exercises, or custom spelling lists. The auto-layout engine handles word placement.',
    },
    {
      title: 'Drag-and-Drop Manual Editing',
      description: 'After auto-generation, adjust word positions using intuitive drag-and-drop controls. Move words to improve intersections, reposition clues, or refine the layout. The editor maintains valid crossword structure throughout edits.',
    },
    {
      title: 'Portrait and Landscape Layouts',
      description: 'Choose portrait or landscape orientation with automatic layout adjustment. Portrait suits standard classroom printing. Landscape provides a wider grid workspace for puzzles with longer words.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and position elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo for professional design.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every crossword generates an answer key showing all words filled in the grid. The answer key matches the puzzle layout exactly, making grading straightforward and enabling student self-checking.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the puzzle and answer key export at full quality as separate files.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Crossword Books for Amazon KDP',
      description: 'Compile 50\u2013100 themed crossword puzzles into vocabulary-building books: "Animal Crosswords for Kids," "Picture Crossword Puzzles \u2014 Food Edition." Image-clue crosswords create visually compelling KDP previews that stand out from text-only crossword books.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Vocabulary Crossword Packs on Etsy',
      description: 'Bundle 10\u201320 themed crosswords as instant-download packs. Create subject-specific sets using Custom Word List mode: science vocabulary, math terms, social studies keywords. "Crossword puzzle printable" and "vocabulary worksheets" are high-volume Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Subject-Area Resources for TPT',
      description: 'Use Custom Word List mode to create curriculum-aligned crossword packs for every subject. Include answer keys, vocabulary lists, and differentiated difficulty levels. TPT teachers search for "vocabulary crossword" by subject and grade level.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Seasonal Crossword Collections',
      description: 'Use themed images for seasonal crossword packs: spring garden vocabulary, summer beach words, autumn harvest terms, winter holiday crosswords. Seasonal vocabulary puzzles attract concentrated demand during their season.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create Multi-Language Crossword Sets',
      description: 'Use the 11-language support and image clues to create crossword packs for language learners. Image clues eliminate the need for translated text clues \u2014 students see the picture and spell the word in their target language.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How does the auto-layout work?',
      answer: 'The engine takes your words (from theme images or a custom list) and arranges them in an interlocking crossword pattern. It maximizes shared letters between across and down entries to create a proper crossword structure automatically.',
    },
    {
      question: 'What are image clues?',
      answer: 'Four themed images are positioned around the crossword grid. Each image is numbered to match an across or down entry. Students identify the picture and spell its name into the grid, combining visual recognition with spelling practice.',
    },
    {
      question: 'Can I use my own words instead of images?',
      answer: 'Yes. Custom Word List mode lets you type any words with text-based clue descriptions. The auto-layout engine arranges your words into an interlocking crossword. Perfect for subject-specific vocabulary, spelling lists, or any language.',
    },
    {
      question: 'Can I edit the layout after generation?',
      answer: 'Yes. The drag-and-drop editor lets you adjust word positions, change intersections, and reposition clues after auto-generation. The editor maintains valid crossword structure throughout your edits.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. Every crossword generates an answer key showing all words filled in the grid. The answer key uses the same layout as the puzzle and exports as a separate file.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes popular themes. Both tiers support Custom Word List mode and allow custom image uploads.',
    },
    {
      question: 'Can I sell the crosswords I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the crossword generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new content, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. Both image clue and custom word list modes work in the free version. The only difference is a watermark on exported files. No signup required.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Custom Word List mode works with any language since you provide the words.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Find & Count Generator' },
    { slug: 'find-objects', pageType: 'app', anchorText: 'Find Objects Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Word Scramble Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Word Guess Generator' },
    { slug: 'crossword', pageType: 'tool', anchorText: 'Try Crossword Generator Free' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Search & Find Bundle \u2014 Save on All Search Generators' },
    { slug: 'create-crossword-books', pageType: 'guide', anchorText: 'How to Create Crossword Books' },
    { slug: 'word-puzzle-ideas', pageType: 'idea', anchorText: 'Word Puzzle Printable Ideas' },
  ],
};
