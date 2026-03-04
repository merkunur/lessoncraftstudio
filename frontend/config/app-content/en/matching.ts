import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'matching',
  locale: 'en',
  category: 'matching',

  seo: {
    titleTag: 'Matching Worksheet Generator | Create Match-Up Sheets',
    metaDescription: 'Create printable matching worksheets with line-drawing pairs. 4 match modes, 104 themes, customizable pair counts. Free online generator with instant PDF export.',
    primaryKeyword: 'matching worksheet generator',
    secondaryKeywords: [
      'printable matching worksheets',
      'match-up worksheet maker',
      'line matching activities',
      'draw a line matching worksheets',
      'matching worksheets for kids',
    ],
    lsiKeywords: [
      'draw a line between',
      'beginning letter matching',
      'image word matching',
      'kindergarten matching',
      'preschool matching activities',
      'fine motor skills worksheets',
      'visual discrimination worksheets',
      'connect the pairs',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/matching/Match Up 1.jpeg',
      primaryAlt: 'Matching worksheet with colorful images and lines connecting pairs for young learners',
    },
    sampleGallery: [
      { src: '/samples/english/matching/Match Up 1.jpeg', alt: 'Matching worksheet showing image-to-beginning-letter pairs with draw-a-line format', caption: 'Image to beginning letter mode' },
    ],
    youtubeId: 'y3ghkjt_67s',
    videoTitle: 'How to Create Matching Worksheets with Images',
  },

  hero: {
    title: 'Matching Worksheet Generator',
    tagline: 'Build line-drawing match-up activities that sharpen visual discrimination and early literacy skills',
    description: `Matching worksheets are one of the most versatile tools in early childhood education, and this generator lets you create them in seconds instead of hours. The Matching Worksheet Generator produces professional draw-a-line activities where students connect items in the left column to their correct partners in the right column. Whether you need image-to-beginning-letter pairs, image-and-word combinations, or fully custom word matching, every layout is built automatically from your settings.

Four distinct matching modes cover a wide range of learning objectives. Image \u2014 Beginning Letter mode shows a picture on the left and a letter on the right, reinforcing phonics and letter recognition. Image + Word \u2014 Image + Word mode displays both a picture and its label on each side, ideal for vocabulary building. Image/Word \u2014 Image/Word mode alternates between images and words across sides for more challenging discrimination. Image \u2014 Custom Word mode lets you type your own right-column labels, perfect for spelling lists, vocabulary quizzes, or foreign language practice.

You control the number of pairs per worksheet \u2014 choose 4, 5, or 6 \u2014 and toggle individual options like bullet points, name and date fields, and per-pair right-column visibility. The built-in canvas editor lets you fine-tune colors, fonts, borders, and positioning before exporting as a high-resolution JPEG or print-ready PDF. Every worksheet includes an automatically generated answer key with the same layout.

Choose from 104 professionally illustrated image themes spanning animals, vehicles, food, nature, and dozens more categories. Each theme provides crisp, recognizable images that work beautifully in the line-drawing format. The free version includes full functionality with a watermark \u2014 try every feature right now without creating an account or entering payment information.`,
  },

  howItWorks: {
    title: 'Create Your Matching Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose Your Matching Mode',
        description: 'Select from four modes: Image \u2014 Beginning Letter for phonics practice, Image + Word \u2014 Image + Word for vocabulary reinforcement, Image/Word \u2014 Image/Word for mixed discrimination, or Image \u2014 Custom Word for spelling lists and custom quizzes. Each mode generates a different right-column format.',
      },
      {
        title: 'Set Pair Count and Options',
        description: 'Pick 4, 5, or 6 matching pairs per worksheet. Toggle bullet points on or off, add name and date header fields, and control whether each right-column item is visible or hidden for extra challenge. These options let you differentiate worksheets for different skill levels.',
      },
      {
        title: 'Select a Theme and Layout',
        description: 'Browse 104 image themes organized by category \u2014 animals, food, vehicles, seasons, and more. Choose your page size, orientation, and font. The generator selects images from your chosen theme and arranges them into a clean two-column matching layout.',
      },
      {
        title: 'Customize in the Canvas Editor',
        description: 'Fine-tune your worksheet using the built-in editor. Add custom instructions or titles, change page and background colors, apply borders, reposition elements, and adjust font sizes. Zoom, undo, and layer controls give you precise layout control.',
      },
      {
        title: 'Export and Print',
        description: 'Download your completed matching worksheet as a high-resolution JPEG or print-ready PDF. An answer key with connecting lines is generated automatically as a separate file. Both are ready for immediate printing or digital distribution.',
      },
    ],
  },

  features: [
    {
      title: 'Four Matching Modes for Different Skills',
      description: 'Image \u2014 Beginning Letter mode pairs pictures with their starting letter for phonics. Image + Word \u2014 Image + Word shows labeled images on both sides for vocabulary building. Image/Word \u2014 Image/Word alternates randomly for harder discrimination. Image \u2014 Custom Word lets you type any right-column text for spelling tests, vocabulary quizzes, or foreign language practice.',
    },
    {
      title: 'Flexible Pair Count: 4, 5, or 6',
      description: 'Choose how many matching pairs appear on each worksheet. Four pairs suit younger children or students who need less visual clutter. Five pairs provide a standard activity length. Six pairs challenge older students or serve as timed assessments. Every pair count produces a balanced, readable layout.',
    },
    {
      title: 'Per-Pair Right-Column Visibility Toggle',
      description: 'Control whether each right-column answer is visible or hidden on a per-pair basis. Show all answers for standard matching, hide some for mixed difficulty, or hide all for an advanced recall challenge. This granular control lets you create differentiated worksheets from a single set of pairs.',
    },
    {
      title: '104 Illustrated Image Themes',
      description: 'Every theme contains professionally drawn images that appear in the matching columns. Choose from categories like farm animals, ocean creatures, vehicles, fruit, sports equipment, musical instruments, and seasonal items. Themes make worksheets visually engaging and allow you to connect matching practice to science, social studies, or holiday units.',
    },
    {
      title: 'Name, Date, and Bullet Toggles',
      description: 'Add student name and date fields at the top of each worksheet with a single click. Toggle bullet points on or off to guide students along matching rows. These small layout options make worksheets classroom-ready without any manual editing after export.',
    },
    {
      title: 'Full Canvas Editor with Layer Controls',
      description: 'The built-in editor lets you add custom text with adjustable font, size, color, and outline. Change page backgrounds, apply decorative borders, drag elements to reposition, and use alignment tools. Layer ordering, lock controls, zoom, and undo ensure professional-quality output every time.',
    },
    {
      title: 'Auto-Generated Answer Keys',
      description: 'Every matching worksheet comes with a corresponding answer key that shows the correct connecting lines between pairs. The answer key uses the same layout, theme, and font as the worksheet, making verification quick for teachers and parents.',
    },
    {
      title: 'Dual Export: JPEG and PDF',
      description: 'Export worksheets as high-resolution JPEG images or print-ready PDF documents. JPEG works well for digital use, social media previews, and Etsy listing thumbnails. PDF provides sharp output for classroom printing, KDP interiors, and multi-page activity books.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Matching Worksheet Packs on Etsy',
      description: 'Create themed matching bundles \u2014 10 animal matching sheets, 10 food matching sheets, 10 seasonal matching sheets \u2014 and list them as instant-download digital products. Matching worksheets are popular with preschool and kindergarten teachers searching for ready-to-print activities.',
      platform: 'Etsy',
    },
    {
      title: 'Publish KDP Matching Activity Books',
      description: 'Compile 50\u2013100 matching worksheets into themed activity books for Amazon KDP. A "Preschool Matching Fun" book or "Kindergarten Draw-a-Line Activities" collection targets high-volume keywords. Include answer keys at the back for a complete, parent-friendly product.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Phonics Packs for Teachers Pay Teachers',
      description: 'Use Image \u2014 Beginning Letter mode to create differentiated phonics matching packs. One set for consonants, another for vowels, a third for blends. Bundle them with answer keys and cover pages. TPT buyers actively search for matching and phonics resources.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Create Seasonal Matching Activity Sets',
      description: 'Build holiday-specific matching collections using themed images: pumpkins for Halloween, snowflakes for winter, hearts for Valentine\u2019s Day, flowers for spring. Seasonal products attract concentrated demand during their window and sell year-round to early planners.',
      platform: 'Multi-platform',
    },
    {
      title: 'Launch a Vocabulary Matching Curriculum',
      description: 'Use Image \u2014 Custom Word mode to build weekly vocabulary matching worksheets aligned to common word lists. Package 36 weeks of matching activities as a progressive curriculum product for homeschool families or tutoring centers.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What matching modes does the Matching Worksheet Generator offer?',
      answer: 'The generator includes four modes: Image \u2014 Beginning Letter pairs pictures with their starting letter for phonics practice. Image + Word \u2014 Image + Word shows labeled images on both sides for vocabulary. Image/Word \u2014 Image/Word alternates for harder discrimination. Image \u2014 Custom Word lets you type any right-column text for spelling or vocabulary quizzes.',
    },
    {
      question: 'How many pairs can I put on each worksheet?',
      answer: 'You can choose 4, 5, or 6 matching pairs per worksheet. Four pairs work best for younger children, five provide a standard activity length, and six challenge older students or work well as timed assessments.',
    },
    {
      question: 'Can I hide some answers for extra challenge?',
      answer: 'Yes. The per-pair right-column visibility toggle lets you show or hide each answer individually. You can show all for standard matching, hide some for mixed difficulty, or hide all for an advanced recall exercise.',
    },
    {
      question: 'How many image themes are available?',
      answer: 'The Full Access Pack includes all 104 illustrated themes covering animals, vehicles, food, nature, sports, music, seasons, and more. The Commercial Pack includes a curated selection of popular themes. Both packs also support custom image uploads.',
    },
    {
      question: 'Does it generate answer keys automatically?',
      answer: 'Yes. Every matching worksheet comes with a matching answer key that shows the correct connecting lines between pairs. The answer key uses the same layout, font, and theme, and exports as a separate file.',
    },
    {
      question: 'Can I use these worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack and the Full Access Pack include a commercial license. You can sell the worksheets you create on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, and any other platform. Each license covers one person with unlimited worksheet generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the matching generator with commercial license, popular image themes, and all 11 languages. The Full Access Pack ($47) adds the complete library of 104 image themes, priority access to new themes, and all future updates. Both packs are one-time purchases with no subscription.',
    },
    {
      question: 'Can I try the generator before buying?',
      answer: 'Absolutely. The generator is free to use right now with no signup required. The free version includes all features, modes, and settings \u2014 the only difference is a small watermark on exported files. Try every mode, theme, and customization option before purchasing.',
    },
    {
      question: 'What page sizes and formats does it support?',
      answer: 'Choose from US Letter (8.5 \u00d7 11 inches), A4, or custom dimensions. Both portrait and landscape orientations are available. Worksheets export as high-resolution JPEG images and print-ready PDF documents at professional printing quality.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface and generated worksheets support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. The Image \u2014 Custom Word mode lets you type text in any language for maximum flexibility.',
    },
    {
      question: 'Can I add student name and date fields?',
      answer: 'Yes. Toggle name and date header fields on or off with a single click. You can also toggle bullet points to guide students along the matching rows. These options make worksheets classroom-ready without post-export editing.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'grid-match', pageType: 'app', anchorText: 'Grid Match Puzzle Generator' },
    { slug: 'shadow-match', pageType: 'app', anchorText: 'Shadow Match Worksheet Generator' },
    { slug: 'bingo', pageType: 'app', anchorText: 'Bingo Card Generator' },
    { slug: 'picture-sort', pageType: 'app', anchorText: 'Picture Sort Worksheet Generator' },
    { slug: 'matching', pageType: 'tool', anchorText: 'Try Matching Generator Free' },
    { slug: 'matching-bundle', pageType: 'bundle', anchorText: 'Matching & Sorting Bundle \u2014 Save on All 5 Generators' },
    { slug: 'create-matching-worksheets', pageType: 'guide', anchorText: 'How to Create Matching Worksheets That Sell' },
    { slug: 'sell-educational-printables-etsy', pageType: 'guide', anchorText: 'Sell Educational Printables on Etsy' },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Preschool Printable Niche Ideas' },
    { slug: 'etsy-printable-business', pageType: 'start', anchorText: 'Start Your Etsy Printable Business' },
  ],
};
