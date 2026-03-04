import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'big-small',
  locale: 'en',
  category: 'visual',

  seo: {
    titleTag: 'Big & Small Worksheet Generator | Size Comparison Free',
    metaDescription: 'Create size comparison worksheets with 104 image themes. Circle the big, small, or medium object. Identical or different images. Free generator with instant PDF export.',
    primaryKeyword: 'size comparison worksheets',
    secondaryKeywords: [
      'big and small worksheets',
      'big or small printable',
      'size sorting worksheets preschool',
      'comparing sizes worksheet',
      'big medium small activities',
    ],
    lsiKeywords: [
      'visual discrimination worksheets',
      'preschool math concepts',
      'size ordering activities',
      'early math skills',
      'kindergarten size worksheets',
      'measurement concepts preschool',
      'compare objects worksheet',
      'pre-math visual skills',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/big small/big-small identical images.jpeg',
      primaryAlt: 'Big and small worksheet with identical animal images showing size comparison exercises for preschool learners',
      secondary: '/samples/english/big small/big-small different images.jpeg',
      secondaryAlt: 'Size comparison worksheet using different themed images for visual discrimination practice',
    },
    sampleGallery: [
      { src: '/samples/english/big small/big-small identical images.jpeg', alt: 'Size comparison worksheet with identical images in three sizes', caption: 'Identical images mode' },
      { src: '/samples/english/big small/big-small different images.jpeg', alt: 'Big and small worksheet using different images within same theme', caption: 'Different images mode' },
      { src: '/samples/english/big small/big-small medium.jpeg', alt: 'Circle the medium object worksheet with number labels', caption: 'Circle the medium one' },
      { src: '/samples/english/big small/big-small labels.jpeg', alt: 'Size comparison worksheet with optional number labels beneath objects', caption: 'Number labels enabled' },
      { src: '/samples/english/big small/big-small animals.jpeg', alt: 'Animal-themed big and small worksheet with farm creatures', caption: 'Farm animals theme' },
      { src: '/samples/english/big small/big-small answer-key.jpeg', alt: 'Auto-generated answer key for big and small worksheet', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'S2s2U6Nb7FI',
    videoTitle: 'How to Create Big & Small Worksheets with Images',
  },

  hero: {
    title: 'Big & Small Worksheet Generator',
    tagline: 'Teach size comparison with colorful image-based exercises that children love to solve',
    description: `Understanding size \u2014 which object is bigger, which is smaller, which falls in the middle \u2014 is one of the earliest mathematical concepts a child encounters. The Big & Small Worksheet Generator transforms this foundational skill into a hands-on visual exercise that keeps young learners engaged from the first circle they draw.

Choose from three exercise modes to target different skills. "Circle the Big One" asks students to identify the largest object in a row. "Circle the Small One" reverses the task, requiring careful comparison. "Circle the Medium One" introduces a third level of reasoning, demanding that children consider relative size rather than just extremes. Each mode builds spatial awareness and lays the groundwork for measurement, ordering, and estimation later on.

Two image styles let you control the visual complexity. Identical Images mode shows the same picture at different scales \u2014 perfect for isolating the concept of size without introducing other variables. Different Images mode uses distinct objects from the same theme, pushing students to compare sizes across varied shapes and proportions. This progression mirrors how size comparison works in the real world.

With 104 illustrated themes \u2014 animals, food, vehicles, nature, musical instruments, and dozens more \u2014 every worksheet feels fresh. Optional number labels beneath each image add a counting dimension, bridging size comparison and numeracy in a single exercise. The built-in canvas editor lets you add titles, adjust colors, apply borders, and reposition elements before exporting.

Every worksheet exports as a high-resolution JPEG and a print-ready PDF, with a matching answer key generated automatically. Whether you teach preschool in a classroom, create resources for a homeschool co-op, or sell printable activity packs on Etsy and Amazon KDP, this generator produces professional-quality worksheets in seconds. The free version includes all features with a watermark \u2014 try it now without signing up.`,
  },

  howItWorks: {
    title: 'Create Your Size Comparison Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose Your Exercise Mode',
        description: 'Select from three size comparison modes: Circle the Big One for identifying the largest object, Circle the Small One for finding the smallest, or Circle the Medium One for intermediate comparison. Each mode targets a different level of visual reasoning.',
      },
      {
        title: 'Select Image Style',
        description: 'Pick Identical Images to show the same picture at different sizes, ideal for isolating the size concept. Or choose Different Images to use distinct objects from the same theme, adding visual variety and real-world complexity to the exercise.',
      },
      {
        title: 'Pick a Theme and Layout',
        description: 'Browse 104 image themes organized by category \u2014 animals, vehicles, food, nature, and more. Set your page size (Letter, A4, or custom), orientation, and number of exercises per page. Enable optional number labels for an added counting dimension.',
      },
      {
        title: 'Customize in the Canvas Editor',
        description: 'Fine-tune your worksheet with the built-in editor. Add custom titles or student name fields, change background colors, apply decorative borders, drag elements to reposition, and use zoom and layer controls for precise placement.',
      },
      {
        title: 'Export and Print',
        description: 'Download your finished worksheet as a high-resolution JPEG or print-ready PDF. A matching answer key is generated automatically as a separate file. Both are ready for immediate printing, classroom distribution, or digital product listings.',
      },
    ],
  },

  features: [
    {
      title: 'Three Size Comparison Modes',
      description: 'Circle the Big One targets basic identification of the largest object. Circle the Small One reverses the task. Circle the Medium One introduces relative comparison, requiring children to evaluate three sizes and select the middle value. Switch modes between worksheets to build progressive skill sets.',
    },
    {
      title: 'Identical or Different Image Styles',
      description: 'Identical Images mode presents the same picture scaled to different sizes, isolating the size concept for beginning learners. Different Images mode uses distinct objects from the same theme, adding visual complexity that mirrors real-world comparisons. Both styles generate automatically from your chosen theme.',
    },
    {
      title: '104 Illustrated Image Themes',
      description: 'Every theme contains professionally drawn images that appear directly in the comparison exercises. Choose from categories like farm animals, ocean creatures, vehicles, fruit, sports equipment, musical instruments, and seasonal items. Themes keep worksheets visually engaging across repeated practice sessions.',
    },
    {
      title: 'Optional Number Labels',
      description: 'Enable number labels beneath each image to add a counting dimension to size comparison exercises. This bridges visual discrimination and numeracy, letting students practice two skills simultaneously. Labels can be toggled on or off per worksheet to match your teaching objectives.',
    },
    {
      title: 'Full Canvas Editor with Layer Controls',
      description: 'The built-in canvas editor goes beyond basic generation. Add custom text with adjustable font size, color, and outline. Change the page background, apply themed borders, use alignment tools, adjust layer ordering, and zoom in for precise placement. Undo and redo are always available.',
    },
    {
      title: 'Auto-Generated Answer Keys',
      description: 'Every worksheet comes with a matching answer key that uses the same layout, theme, and font. The correct answer is clearly marked so teachers, parents, and students can self-check work. Both files export separately for easy distribution.',
    },
    {
      title: 'Dual Export: JPEG and PDF',
      description: 'Export worksheets as high-resolution JPEG images or print-ready PDF documents. JPEG works well for digital use, social media previews, and Etsy listing thumbnails. PDF provides crisp output for professional printing, KDP interiors, and multi-page activity packs.',
    },
    {
      title: '7 Professional Fonts',
      description: 'Choose from seven fonts designed for readability at different ages. Options range from large, rounded letterforms ideal for preschoolers to cleaner styles for kindergarten and first grade. Every font renders crisply in both JPEG and PDF exports.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Preschool Activity Packs on Etsy',
      description: 'Create themed size comparison bundles \u2014 10 animal worksheets, 10 vehicle worksheets, 10 food worksheets \u2014 and list them as instant-download digital products. Combine identical and different image modes within each pack for variety. Etsy buyers search for "preschool worksheets" and "size comparison activities" thousands of times monthly.',
      platform: 'Etsy',
    },
    {
      title: 'Publish Early Learning Activity Books on Amazon KDP',
      description: 'Export PDF worksheets at progressive difficulty levels and compile them into 50\u2013100 page books. A "Big and Small: Preschool Visual Skills" book targets high-volume Amazon keywords. Include answer keys at the back and use all three modes for comprehensive coverage.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Pre-K Resource Packs for TPT',
      description: 'Teachers Pay Teachers buyers want ready-to-print resources organized by skill level. Create differentiated packs: one set for 3-year-olds with identical images only, another for 4-year-olds mixing both styles, and a third adding medium comparison. Bundle with answer keys and cover pages for a complete listing.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Create Seasonal Visual Skills Sets',
      description: 'Use themed images to build holiday-specific worksheet collections: pumpkins for Halloween, snowflakes for winter, hearts for Valentine\u2019s Day, flowers for spring. Seasonal products see concentrated demand during their window and can be listed year-round to capture early planners.',
      platform: 'Multi-platform',
    },
    {
      title: 'Launch a Pre-Math Curriculum for Homeschoolers',
      description: 'Structure worksheets by week and difficulty to create a progressive size comparison curriculum. Start with Circle the Big One using identical images, advance to Circle the Small One with different images, then introduce medium comparison with number labels. Package 20\u201336 weeks of worksheets as a complete early math product.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What exercise modes does the Big & Small Generator offer?',
      answer: 'The generator includes three modes: Circle the Big One (identify the largest), Circle the Small One (identify the smallest), and Circle the Medium One (identify the middle-sized object). Each mode targets a different level of visual reasoning and can be combined across worksheet sets for progressive learning.',
    },
    {
      question: 'What is the difference between Identical and Different Images?',
      answer: 'Identical Images mode shows the same picture at different scales, isolating the size concept for beginning learners. Different Images mode uses distinct objects from the same theme, adding visual complexity. Start with identical images for younger children and progress to different images as their comparison skills develop.',
    },
    {
      question: 'How many image themes are available?',
      answer: 'The Full Access tier includes all 104 illustrated themes covering animals, vehicles, food, nature, sports, music, seasons, and more. The Commercial tier includes a curated selection of popular themes. Both tiers support custom image uploads as well.',
    },
    {
      question: 'What are optional number labels?',
      answer: 'When enabled, number labels appear beneath each image in the exercise. This adds a counting element to the size comparison task, bridging visual discrimination and early numeracy. Labels can be toggled on or off per worksheet depending on your teaching goals.',
    },
    {
      question: 'What age group is this designed for?',
      answer: 'Size comparison worksheets are primarily designed for ages 3\u20136 (preschool through kindergarten). The three difficulty modes allow differentiation: Circle the Big One for youngest learners, Circle the Medium One for more advanced students. Different Images mode adds complexity for kindergarteners ready for a challenge.',
    },
    {
      question: 'Does it generate answer keys automatically?',
      answer: 'Yes. Every worksheet comes with a matching answer key that uses the same layout, theme, and font. The correct answer is clearly indicated so teachers, parents, and students can verify work independently.',
    },
    {
      question: 'Can I use these worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack and the Full Access Pack include a commercial license. You can sell the worksheets you create on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, and any other platform. Each license covers one person with unlimited worksheet generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the big & small generator with commercial license, popular image themes, and all 11 languages. The Full Access Pack ($47) adds the complete library of 104 image themes, priority access to new themes, and all future updates. Both packs are one-time purchases with no subscription.',
    },
    {
      question: 'Can I try the generator before buying?',
      answer: 'Absolutely. The generator is free to use right now with no signup required. The free version includes all features, modes, and settings \u2014 the only difference is a small watermark on exported files. Try every mode, theme, and customization option to see exactly what you get before purchasing.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface and generated worksheets support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Since the exercises are image-based, the visual content works universally regardless of language.',
    },
    {
      question: 'Is there a limit on how many worksheets I can create?',
      answer: 'No. Both paid tiers include unlimited worksheet generation. Create as many worksheets as you need for your classroom, curriculum, or product line. There are no monthly limits, credit systems, or usage caps.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. We encourage you to use the free version with watermark to test every feature before purchasing. This ensures you know exactly what you are buying.',
    },
  ],

  internalLinks: [
    { slug: 'pattern-train', pageType: 'app', anchorText: 'Pattern Train Generator' },
    { slug: 'pattern-worksheet', pageType: 'app', anchorText: 'Pattern Worksheet Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Draw & Color Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Drawing Lines Generator' },
    { slug: 'coloring', pageType: 'app', anchorText: 'Coloring Page Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Chart Count & Color Generator' },
    { slug: 'big-small', pageType: 'tool', anchorText: 'Try Big & Small Generator Free' },
    { slug: 'visual-bundle', pageType: 'bundle', anchorText: 'Drawing & Art Bundle \u2014 Save on All Visual Generators' },
    { slug: 'create-size-comparison-worksheets', pageType: 'guide', anchorText: 'How to Create Size Comparison Worksheets' },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Preschool Printable Niche Ideas' },
  ],
};
