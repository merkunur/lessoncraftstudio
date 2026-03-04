import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'chart-count',
  locale: 'en',
  category: 'visual',

  seo: {
    titleTag: 'Chart Count & Color Generator | Graphing Worksheets Free',
    metaDescription: 'Create graphing and counting worksheets with image-based exercises. Manual or theme-based image selection, 6 images per exercise. Free generator with instant PDF export.',
    primaryKeyword: 'graphing worksheets generator',
    secondaryKeywords: [
      'chart count worksheets',
      'picture graph worksheets printable',
      'counting worksheets with images',
      'graphing activities preschool',
      'tally chart worksheets',
    ],
    lsiKeywords: [
      'data handling worksheets',
      'pictograph worksheets kindergarten',
      'counting and graphing activities',
      'visual math worksheets',
      'bar graph worksheets',
      'math data collection',
      'picture counting exercises',
      'early statistics worksheets',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/chart count/Picture Graph 1.jpeg',
      primaryAlt: 'Chart count worksheet with colorful images showing graphing and counting exercises for young learners',
      secondary: '/samples/english/chart count/Picture Graph 2.jpeg',
      secondaryAlt: 'Pictograph worksheet with theme-based images and counting indicators',
    },
    sampleGallery: [
      { src: '/samples/english/chart count/Picture Graph 1.jpeg', alt: 'Picture graph worksheet with animal images and count-based selection', caption: 'Animal theme picture graph' },
      { src: '/samples/english/chart count/Picture Graph 2.jpeg', alt: 'Chart count exercise with food images and graphing area', caption: 'Food theme counting exercise' },
      { src: '/samples/english/chart count/Picture Graph 3.jpeg', alt: 'Graphing worksheet with 6 vehicle images per exercise row', caption: '6 images per exercise' },
      { src: '/samples/english/chart count/Picture Graph 4.jpeg', alt: 'Theme-based preset chart count worksheet with nature images', caption: 'Theme-based preset selection' },
      { src: '/samples/english/chart count/Picture Graph 5.jpeg', alt: 'Manual image selection chart count worksheet with mixed subjects', caption: 'Manual image selection' },
      { src: '/samples/english/chart count/Picture Graph 6.jpeg', alt: 'Chart count answer key with correct counts indicated', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'How to Create Chart Count & Graphing Worksheets',
  },

  hero: {
    title: 'Chart Count & Color Generator',
    tagline: 'Build picture graph and counting exercises with image-based data that young learners can see and touch',
    description: `Data handling and graphing are among the most practical math skills a child can learn, but traditional bar graphs and tally charts mean nothing to a four-year-old who has never seen a spreadsheet. The Chart Count & Color Generator bridges this gap by using pictures \u2014 real, colorful images from 104 themes \u2014 as the data that students count, sort, and graph.

Each exercise presents a collection of images and asks students to count how many of each type appear. A worksheet might show six animals and ask: "How many cats? How many dogs? How many birds?" Students count the images, record the totals, and use the data to complete a simple picture graph or chart. This concrete, visual approach makes abstract concepts like "data collection" and "graphing" tangible for young minds.

The generator offers two image selection approaches. Theme-based presets automatically select images from your chosen category, ensuring consistent visual style. Manual selection lets you hand-pick specific images for targeted exercises \u2014 perfect when you want to tie counting practice to a science unit on farm animals or a social studies lesson on community helpers. Each exercise uses 6 images, a count optimized for kindergarten and first-grade cognitive load.

A visual count indicator helps students track their progress as they work through each exercise. The built-in canvas editor lets you add custom titles, adjust colors, apply borders, and reposition elements before exporting. Every worksheet comes with a high-resolution JPEG, a print-ready PDF, and an auto-generated answer key.

Whether you teach early math in a classroom, create data handling resources for a homeschool group, or sell educational printables on Etsy and Amazon KDP, this generator produces professional graphing worksheets in seconds. The free version includes all features with a watermark \u2014 try it now without signing up.`,
  },

  howItWorks: {
    title: 'Create Your Chart Count Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose Image Selection Mode',
        description: 'Select theme-based presets to automatically pull images from one of 104 categories, or use manual selection to hand-pick specific images for each exercise. Theme presets ensure visual consistency while manual mode gives you full control.',
      },
      {
        title: 'Configure the Exercise',
        description: 'Each exercise uses 6 images that students count and categorize. The generator creates a balanced mix of image types so every category has countable quantities. Set the number of exercises per page and the overall layout.',
      },
      {
        title: 'Pick Layout and Font',
        description: 'Choose your page size (Letter, A4, or custom), orientation, and font from 7 professional options. The layout adjusts automatically to fit your chosen exercise count, keeping images clear and the graphing area appropriately sized.',
      },
      {
        title: 'Customize in the Canvas Editor',
        description: 'Add custom titles, student name fields, or counting instructions. Change background colors, apply decorative borders, drag elements to reposition, and use zoom and layer controls for precise adjustments.',
      },
      {
        title: 'Export and Print',
        description: 'Download your finished worksheet as a high-resolution JPEG or print-ready PDF. A matching answer key with correct counts is generated automatically. Both files are ready for classroom printing or digital product distribution.',
      },
    ],
  },

  features: [
    {
      title: 'Theme-Based Presets or Manual Image Selection',
      description: 'Theme presets pull images automatically from one of 104 categories, creating consistent visual exercises in seconds. Manual selection lets you hand-pick specific images for targeted exercises tied to curriculum themes. Both modes produce clean, professional worksheets.',
    },
    {
      title: 'Count-Based Selection with 6 Images Per Exercise',
      description: 'Each exercise presents exactly 6 images for students to count and categorize. This count is optimized for kindergarten and first-grade cognitive load \u2014 enough variety to make the exercise meaningful without overwhelming young learners.',
    },
    {
      title: 'Visual Count Indicator',
      description: 'A built-in visual indicator helps students track their counting progress as they work through each exercise. This scaffolding reduces errors and builds confidence, especially for students who are just learning to organize data.',
    },
    {
      title: '104 Illustrated Image Themes',
      description: 'Every theme contains professionally drawn images that appear directly in the counting exercises. Choose from farm animals, ocean creatures, vehicles, fruit, sports equipment, and seasonal items. Themes let you connect graphing practice to science, social studies, or seasonal units.',
    },
    {
      title: 'Full Canvas Editor with Layer Controls',
      description: 'Add custom text with adjustable font, size, color, and outline. Change background colors, apply decorative borders, use alignment tools, adjust layer ordering, and zoom for precision. Undo and redo are always available for non-destructive editing.',
    },
    {
      title: 'Auto-Generated Answer Keys',
      description: 'Every worksheet comes with a matching answer key showing the correct count for each image category. The key uses the same layout and theme for instant verification by teachers, parents, or students working independently.',
    },
    {
      title: 'Dual Export: JPEG and PDF',
      description: 'Export worksheets as high-resolution JPEG images or print-ready PDF documents. JPEG works well for digital distribution and Etsy listing previews. PDF provides sharp output for printing, KDP interiors, and compiled activity books.',
    },
    {
      title: '7 Professional Fonts',
      description: 'Choose from seven fonts designed for readability at different ages. Options range from large, rounded letterforms for kindergarteners to cleaner styles for first and second graders. Every font renders crisply in both export formats.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Graphing Activity Packs on Etsy',
      description: 'Create themed chart count bundles: 10 animal graphing worksheets, 10 food graphing worksheets, 10 vehicle graphing worksheets. List each as an instant-download digital product. Etsy buyers search for "graphing worksheets kindergarten" and "counting worksheets with pictures" thousands of times monthly.',
      platform: 'Etsy',
    },
    {
      title: 'Publish Data Handling Activity Books on Amazon KDP',
      description: 'Export PDF worksheets and compile them into 50\u2013100 page books. "My First Graphing Book" or "Picture Graphs for Kindergarten" targets high-volume Amazon keywords. Include progressive exercises from simple counts to multi-category graphs.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Math Data Resources for TPT',
      description: 'Teachers Pay Teachers buyers want graphing resources aligned to early math standards. Create packs organized by skill: counting, picture graphs, simple bar charts. Include answer keys, extension questions, and differentiation notes for a complete resource.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Create Seasonal Counting and Graphing Sets',
      description: 'Use themed images to build holiday-specific graphing worksheets: "Count the pumpkins" for Halloween, "Graph the snowflakes" for winter, "Count the flowers" for spring. Seasonal data handling products stand out in a crowded market.',
      platform: 'Multi-platform',
    },
    {
      title: 'Launch an Early Data Skills Curriculum',
      description: 'Structure worksheets progressively: start with simple count-the-pictures exercises, advance to picture graphs with 3 categories, then build to multi-category charts with comparison questions. Package 20\u201336 weeks as a complete graphing curriculum.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What is a chart count worksheet?',
      answer: 'A chart count worksheet presents a collection of images and asks students to count how many of each type appear. Students organize the data into a simple picture graph or chart. This visual approach makes abstract data handling concepts concrete for young learners.',
    },
    {
      question: 'How does image selection work?',
      answer: 'Choose theme-based presets to automatically pull images from one of 104 categories, or use manual selection to hand-pick specific images. Theme presets create visually consistent exercises quickly. Manual mode gives you precise control over which images appear.',
    },
    {
      question: 'Why 6 images per exercise?',
      answer: 'Six images per exercise is optimized for kindergarten and first-grade cognitive load. It provides enough variety for meaningful counting and graphing without overwhelming young students. The count balances educational value with developmental appropriateness.',
    },
    {
      question: 'What is the visual count indicator?',
      answer: 'The visual count indicator is a built-in tracking element that helps students monitor their counting progress within each exercise. It reduces errors and builds confidence, especially for students who are just beginning to organize data.',
    },
    {
      question: 'How many image themes are available?',
      answer: 'The Full Access tier includes all 104 illustrated themes covering animals, vehicles, food, nature, sports, music, seasons, and more. The Commercial tier includes popular themes. Both tiers support custom image uploads.',
    },
    {
      question: 'Does it generate answer keys automatically?',
      answer: 'Yes. Every worksheet comes with a matching answer key showing the correct count for each image category. The key uses the same layout and theme for instant verification.',
    },
    {
      question: 'Can I use these worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack and Full Access Pack include a commercial license. Sell your worksheets on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, and any other platform. Each license covers one person with unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the chart count generator with commercial license, popular image themes, and all 11 languages. The Full Access Pack ($47) adds the complete library of 104 image themes, priority access to new themes, and all future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try the generator before buying?',
      answer: 'Absolutely. The generator is free to use right now with no signup required. All image selection modes, themes, and customization options are available \u2014 the only difference is a small watermark on exported files.',
    },
    {
      question: 'What age group is this designed for?',
      answer: 'Chart count worksheets are primarily designed for ages 4\u20137 (pre-K through first grade). The visual, image-based approach makes data handling accessible to children who are just learning to count and organize information.',
    },
    {
      question: 'Is there a limit on how many worksheets I can create?',
      answer: 'No. Both paid tiers include unlimited worksheet generation. Create as many graphing and counting worksheets as you need for your classroom, curriculum, or product line. No monthly limits, credit systems, or usage caps.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. We encourage you to use the free version with watermark to test every feature before purchasing. This ensures you know exactly what you are buying.',
    },
  ],

  internalLinks: [
    { slug: 'big-small', pageType: 'app', anchorText: 'Big & Small Worksheet Generator' },
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Pattern Train Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Pattern Worksheet Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Draw & Color Generator' },
    { slug: 'addition', pageType: 'app', anchorText: 'Addition Worksheet Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Coloring Page Generator' },
    { slug: 'chart-count', pageType: 'tool', anchorText: 'Try Chart Count Generator Free' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Drawing & Art Bundle \u2014 Save on All Visual Generators' },
    { slug: 'create-counting-worksheets', pageType: 'guide', anchorText: 'How to Create Counting Worksheets That Sell' },
    { slug: 'kindergarten-printable-ideas', pageType: 'idea', anchorText: 'Kindergarten Printable Niche Ideas' },
  ],
};
