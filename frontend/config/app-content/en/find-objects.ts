import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'find-objects',
  locale: 'en',
  category: 'search',

  seo: {
    titleTag: 'Find Objects Generator | I Spy & Odd One Out Free',
    metaDescription: 'Create I Spy and Odd One Out search worksheets. I Spy: 8-12 distractors, 1-5 hidden. Odd One Out: 8-12 pairs, 1-3 odd. Free generator with answer keys and PDF export.',
    primaryKeyword: 'find objects worksheet generator',
    secondaryKeywords: [
      'I Spy hidden object maker',
      'spot the object worksheets',
      'hidden object puzzle generator',
      'search and find worksheets',
      'visual search puzzle creator',
    ],
    lsiKeywords: [
      'hidden object activities',
      'visual perception worksheets',
      'observation games for kids',
      'seek and find printable',
      'attention training activities',
      'visual scanning exercises',
      'search worksheets printable',
      'find the hidden picture',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/find objects/spotworks_worksheet (1).jpeg',
      primaryAlt: 'I Spy worksheet with hidden objects scattered among distractors in a themed scene',
      secondary: '/samples/english/find objects/spotworks_worksheet (2).jpeg',
      secondaryAlt: 'Find objects answer key with hidden items circled and labeled',
    },
    sampleGallery: [
      { src: '/samples/english/find objects/spotworks_worksheet (3).jpeg', alt: 'I Spy mode with animal distractors and hidden food items', caption: 'I Spy mode \u2014 find hidden objects' },
      { src: '/samples/english/find objects/spotworks_worksheet (4).jpeg', alt: 'Odd One Out mode with paired images and unpaired odd items', caption: 'Odd One Out mode \u2014 find unpaired' },
      { src: '/samples/english/find objects/spotworks_worksheet (5).jpeg', alt: 'I Spy worksheet with 12 distractors and 5 hidden objects', caption: 'Dense layout with 5 hidden items' },
      { src: '/samples/english/find objects/spotworks_worksheet (6).jpeg', alt: 'Find objects worksheet with themed border and nature images', caption: 'Nature theme with border' },
      { src: '/samples/english/find objects/spotworks_worksheet (7).jpeg', alt: 'Odd One Out worksheet with 12 paired items and 3 odd items', caption: '12 pairs with 3 odd items' },
      { src: '/samples/english/find objects/spotworks_worksheet (8).jpeg', alt: 'Find objects answer key with all targets highlighted', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'How to Create Find Objects Search Worksheets',
  },

  hero: {
    title: 'Find Objects Generator',
    tagline: 'Two search modes that challenge visual perception \u2014 find hidden items or spot the unpaired odd one',
    description: `Visual search activities are some of the most effective tools for developing attention, observation, and visual perception skills. The Find Objects Generator creates two fundamentally different search puzzle types in one tool: I Spy mode hides target objects among a field of distractors, while Odd One Out mode scatters unpaired items among pairs that students must identify.

In I Spy mode, you set between 8 and 12 distractor images that fill the scene. Then 1 to 5 hidden target objects are placed among the distractors. Students scan the entire field to locate each hidden item. The targets come from a different theme than the distractors, creating a category-based search challenge. You can select themes manually or let the generator choose automatically for quick creation.

Odd One Out mode works differently. It places 8 to 12 paired images \u2014 every image appears exactly twice \u2014 plus 1 to 3 odd items that have no pair. Students must find which items appear only once. This requires a different cognitive strategy: instead of looking for a specific target, students must track which items they have already seen and identify the ones without matches.

Both modes use the 104-theme image library for visually rich scenes. Each worksheet generates an answer key that circles all target items (I Spy) or marks all unpaired items (Odd One Out). The full canvas editor adds titles, instructions, and themed decorations. Export as JPEG or PDF with a grayscale option for ink-efficient printing. Try every feature free right now \u2014 the generator works without signup, with only a small watermark on exports.`,
  },

  howItWorks: {
    title: 'Create a Find Objects Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose a Search Mode',
        description: 'Select I Spy mode to hide target objects among distractors, or Odd One Out mode to scatter unpaired items among pairs. Each mode develops different visual search strategies.',
      },
      {
        title: 'Select Image Themes',
        description: 'Choose themes for the main scene and the target/odd items. In I Spy mode, distractors come from one theme and hidden objects from another. In Odd One Out mode, paired items and odd items can use the same or different themes.',
      },
      {
        title: 'Configure Object Counts',
        description: 'In I Spy mode, set 8\u201312 distractors and 1\u20135 hidden objects. In Odd One Out mode, set 8\u201312 paired images and 1\u20133 odd items. More objects create denser, more challenging scenes.',
      },
      {
        title: 'Customize the Layout',
        description: 'Use the canvas editor to add a title, student name field, and instructions. Apply themed backgrounds and borders. Position elements with drag-and-drop for a polished design.',
      },
      {
        title: 'Export Worksheet and Answer Key',
        description: 'Download the search worksheet and its answer key as JPEG or PDF. The answer key circles all targets or marks all odd items. Toggle grayscale for black-and-white printing.',
      },
    ],
  },

  features: [
    {
      title: 'Two Search Modes: I Spy and Odd One Out',
      description: 'I Spy mode hides 1\u20135 target objects among 8\u201312 distractors \u2014 students find specific items in a crowded scene. Odd One Out mode places 1\u20133 unpaired items among 8\u201312 pairs \u2014 students identify which items appear only once. Two fundamentally different visual search challenges.',
    },
    {
      title: 'I Spy: Distractor and Hidden Object Control',
      description: 'Set the exact number of distractor images (8\u201312) and hidden target objects (1\u20135). More distractors create denser scenes. More hidden objects extend the search task. Distractors and targets use different themes for category-based search.',
    },
    {
      title: 'Odd One Out: Pair and Odd Item Control',
      description: 'Set the number of paired images (8\u201312, each appearing twice) and unpaired odd items (1\u20133). Students must track which items they have seen to identify the ones without matches. This builds working memory and systematic scanning skills.',
    },
    {
      title: 'Theme-Based or Manual Selection',
      description: 'Select themes for automatic image population or manually choose each image for precise control. Theme-based selection provides quick creation, while manual selection lets you craft specific difficulty levels and learning objectives.',
    },
    {
      title: '104 Image Themes',
      description: 'Every theme provides illustrated items for building search scenes. Animals, food, vehicles, nature, sports, and seasonal themes create visually rich worksheets that align with classroom units and student interests.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom titles, student name fields, and instructions. Change background colors, apply themed borders, and arrange elements with drag-and-drop. Layer controls, alignment tools, zoom, and undo/redo for professional results.',
    },
    {
      title: 'Auto-Generated Answer Key',
      description: 'Every worksheet produces an answer key. In I Spy mode, target objects are circled. In Odd One Out mode, unpaired items are marked. The answer key matches the worksheet layout for easy visual comparison.',
    },
    {
      title: 'Dual Export with Grayscale Option',
      description: 'Download as high-resolution JPEG or print-ready PDF. The grayscale toggle converts output to black-and-white for ink-efficient printing. Both the worksheet and answer key export at full quality as separate files.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Hidden Object Books for Amazon KDP',
      description: 'Compile 50\u2013100 find-objects worksheets into themed search-and-find books: "I Spy Animals," "Find the Hidden Objects \u2014 Food Edition." Hidden object books are a proven KDP category. Mix I Spy and Odd One Out modes for variety within a single book.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Visual Search Packs on Etsy',
      description: 'Bundle 15\u201320 find-objects worksheets as instant-download packs. Create mode-specific packs or mixed variety packs. "Hidden object printable," "I Spy worksheets," and "find and seek activities" are high-converting Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Visual Perception Resources for TPT',
      description: 'Create assessment-ready visual search packs targeting observation and visual perception skills. Include scoring guides, progress tracking, and differentiated worksheets by object count. TPT buyers in special education and occupational therapy search for visual perception resources.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Themed Search-and-Find Collections',
      description: 'Use themed images for targeted search packs: ocean search scenes, jungle hidden objects, space station seek-and-find. Themed collections create coherent products that appeal to specific interests and align with classroom units.',
      platform: 'Multi-platform',
    },
    {
      title: 'Create a Visual Attention Training Program',
      description: 'Structure worksheets into a progressive program: start with I Spy (few distractors, 1 target), advance to dense scenes with 5 targets, then introduce Odd One Out mode. Package as a 12-week visual attention and perception curriculum.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What is the difference between I Spy and Odd One Out mode?',
      answer: 'In I Spy mode, students find specific hidden objects among distractors. In Odd One Out mode, students identify which items appear only once among pairs. Each mode develops different visual search and cognitive strategies.',
    },
    {
      question: 'How many objects can I place in I Spy mode?',
      answer: 'Set between 8 and 12 distractor images and 1 to 5 hidden target objects. More distractors create denser scenes. More targets extend the search challenge. Targets come from a different theme than distractors.',
    },
    {
      question: 'How does Odd One Out mode work?',
      answer: 'The generator places 8 to 12 images in pairs (each appears twice) plus 1 to 3 odd items with no pair. Students must find the items that appear only once. This requires tracking seen items and identifying unmatched ones.',
    },
    {
      question: 'Can I choose which images appear?',
      answer: 'Yes. Use theme-based selection for automatic population or manual selection for precise control over every image. Manual selection lets you craft specific difficulty levels and target specific learning objectives.',
    },
    {
      question: 'Does it create answer keys?',
      answer: 'Yes. I Spy answer keys circle all hidden target objects. Odd One Out answer keys mark all unpaired items. The answer key matches the worksheet layout and exports as a separate file.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 image themes. The Commercial Pack includes popular themes. Both tiers allow custom image uploads for personalized search scenes.',
    },
    {
      question: 'Can I sell the worksheets I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and the Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, Teachers Pay Teachers, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the find objects generator with commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. Both search modes, all object counts, and all themes work in the free version. The only difference is a watermark on exported files. Try everything before buying.',
    },
    {
      question: 'What languages does it support?',
      answer: 'The interface supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since find-objects worksheets are image-based, the content works universally.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'find-and-count', pageType: 'app', anchorText: 'Find & Count Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator' },
    { slug: 'odd-one-out', pageType: 'app', anchorText: 'Odd One Out Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Shadow Match Generator' },
    { slug: 'matching', pageType: 'app', anchorText: 'Matching Generator' },
    { slug: 'find-objects', pageType: 'tool', anchorText: 'Try Find Objects Generator Free' },
    { slug: 'search-bundle', pageType: 'bundle', anchorText: 'Search & Find Bundle \u2014 Save on All Search Generators' },
    { slug: 'create-hidden-object-books', pageType: 'guide', anchorText: 'How to Create Hidden Object Books' },
    { slug: 'search-printable-ideas', pageType: 'idea', anchorText: 'Search & Find Printable Niche Ideas' },
  ],
};
