import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'addition',
  locale: 'en',
  category: 'math',

  seo: {
    titleTag: 'Addition Worksheet Generator | Create Math Worksheets Free',
    metaDescription: 'Create professional addition worksheets with images in seconds. 4 exercise modes, 104 themes, 7 fonts. Free online generator with instant PDF export for teachers and sellers.',
    primaryKeyword: 'addition worksheet generator',
    secondaryKeywords: [
      'addition worksheets with pictures',
      'printable addition worksheets',
      'image addition worksheets',
      'math worksheet maker',
      'addition practice sheets',
    ],
    lsiKeywords: [
      'visual math worksheets',
      'kindergarten addition',
      'first grade math',
      'picture math problems',
      'number bonds',
      'counting worksheets',
      'math facts practice',
      'addition with manipulatives',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/Addition Fun 1.jpeg',
      primaryAlt: 'Addition worksheet with colorful animal images showing image-based math problems for young learners',
      secondary: '/samples/english/addition/Addition Fun 2.jpeg',
      secondaryAlt: 'Addition worksheet featuring food theme with visual counting exercises',
    },
    sampleGallery: [
      { src: '/samples/english/addition/Addition Fun 3.jpeg', alt: 'Addition worksheet using vehicle images with sums to 10', caption: 'Vehicle theme, sums to 10' },
      { src: '/samples/english/addition/Addition Fun 4.jpeg', alt: 'Mixed mode addition worksheet combining images and numbers', caption: 'Mixed mode exercise' },
      { src: '/samples/english/addition/Addition Fun 5.jpeg', alt: 'Find the addend worksheet with fruit images', caption: 'Find the missing addend' },
      { src: '/samples/english/addition/Addition Fun 6.jpeg', alt: 'Addition worksheet with space theme and star border', caption: 'Space theme with decorative border' },
      { src: '/samples/english/addition/Addition Fun 7.jpeg', alt: 'Landscape format addition worksheet with ocean animals', caption: 'Landscape layout option' },
      { src: '/samples/english/addition/Addition Fun 8.jpeg', alt: 'Addition worksheet answer key with solutions circled', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'How to Create Addition Worksheets with Images',
  },

  hero: {
    title: 'Addition Worksheet Generator',
    tagline: 'Turn simple addition into a visual adventure with picture-based math worksheets',
    description: `Every child who struggles with addition shares the same problem: abstract numbers on a page that mean nothing to them. The Addition Worksheet Generator replaces bare equations with colorful image-based problems that children actually want to solve. Choose from 104 illustrated themes \u2014 animals, vehicles, food, space, and dozens more \u2014 then watch as the generator builds complete worksheets with auto-graded answer keys in seconds.

Four distinct exercise modes keep practice fresh. Image + Image mode shows pictures on both sides of the plus sign, perfect for children just learning to count. Image + Number mode bridges the gap between visual and abstract thinking. Find the Addend mode challenges students to work backwards from a total. Mixed mode combines all three for comprehensive assessment.

You control every detail: set minimum and maximum operands from 1 to 99, choose how many problems appear per page, pick your page size and orientation, and select from 7 professional fonts. The built-in canvas editor lets you add custom text, adjust colors, drag elements into position, and fine-tune layouts before exporting. Every worksheet exports as both a high-resolution JPEG and a print-ready PDF, with a matching answer key generated automatically.

Whether you teach kindergarten math in a classroom, run a homeschool co-op, or sell educational printables on Etsy and Amazon KDP, this generator produces worksheets that look hand-designed in a fraction of the time. The free version includes full functionality with a watermark \u2014 try every feature right now without signing up.`,
  },

  howItWorks: {
    title: 'Create Your Addition Worksheet in 5 Steps',
    steps: [
      {
        title: 'Pick Your Exercise Mode',
        description: 'Select from four addition modes: Image + Image for pure visual counting, Image + Number to bridge concrete and abstract, Find the Addend for reverse thinking, or Mixed for varied practice. Each mode generates problems differently to target specific skills.',
      },
      {
        title: 'Set the Number Range',
        description: 'Use the min and max operand sliders to control difficulty. Set operands from 1\u201310 for kindergarten, 1\u201320 for first grade, or up to 1\u201399 for advanced students. The generator ensures every problem stays within your chosen range.',
      },
      {
        title: 'Choose a Theme and Layout',
        description: 'Browse 104 image themes organized by category \u2014 animals, vehicles, food, nature, and more. Pick your page size (Letter, A4, or custom), orientation (portrait or landscape), and how many problems appear per page. Select from 7 fonts to match your style.',
      },
      {
        title: 'Customize in the Canvas Editor',
        description: 'Fine-tune your worksheet with the built-in editor. Add custom titles or instructions as text overlays, change page and background colors, apply decorative borders, drag elements to reposition, and use zoom, undo, and layer controls for precise layout.',
      },
      {
        title: 'Export and Print',
        description: 'Download your finished worksheet as a high-resolution JPEG or print-ready PDF. The generator automatically creates a matching answer key with the same layout. Both files are ready for immediate printing or digital distribution.',
      },
    ],
  },

  features: [
    {
      title: 'Four Exercise Modes for Progressive Learning',
      description: 'Image + Image mode uses pictures on both sides of the equation, ideal for pre-readers who count objects. Image + Number introduces numerals alongside visuals. Find the Addend reverses the problem, asking students to figure out the missing piece. Mixed mode combines all three randomly, perfect for assessments that test multiple skills at once.',
    },
    {
      title: 'Adjustable Number Range with Smart Generation',
      description: 'Set separate minimum and maximum values for each operand using intuitive sliders. The generator randomizes problems within your bounds while ensuring no duplicates on a single worksheet. Create sheets targeting sums to 5 for preschoolers, sums to 20 for first graders, or multi-digit problems up to 99 + 99 for older students.',
    },
    {
      title: '104 Illustrated Image Themes',
      description: 'Every theme contains professionally drawn images that appear directly in the math problems. Choose from categories like farm animals, ocean creatures, vehicles, fruit, sports equipment, musical instruments, and seasonal items. Themes make worksheets visually engaging and let you tie math practice to science, social studies, or holiday units.',
    },
    {
      title: 'Full Canvas Editor with Layer Controls',
      description: 'The built-in canvas goes beyond basic generation. Add custom text with adjustable font size, color, and outline. Change the page background color or apply themed backgrounds. Use alignment tools, layer ordering, lock and unlock elements, and zoom controls. Undo and redo are always available for non-destructive editing.',
    },
    {
      title: '7 Professional Fonts',
      description: 'Choose from seven fonts designed for readability at different ages. Options range from clean, large letterforms ideal for young children to more compact styles for older students. Every font renders crisply in both JPEG and PDF exports.',
    },
    {
      title: 'Auto-Generated Answer Keys',
      description: 'Every worksheet comes with a matching answer key using the same layout, font, and theme. Answers are clearly displayed so teachers, parents, and students can self-check work. Both the worksheet and answer key export as separate files for easy distribution.',
    },
    {
      title: 'Dual Export: JPEG and PDF',
      description: 'Export your worksheets as high-resolution JPEG images or print-ready PDF documents. JPEG works well for digital use, social media previews, and Etsy listing images. PDF provides sharp output for professional printing, KDP interiors, and multi-page activity books.',
    },
    {
      title: 'Custom Image Upload',
      description: 'Upload your own images to use in worksheet problems alongside or instead of built-in themes. Uploaded images are stored in your browser session so you can experiment with branding, custom illustrations, or classroom-specific visuals without creating an account.',
    },
  ],

  businessUseCases: [
    {
      title: 'Sell Addition Worksheet Packs on Etsy',
      description: 'Create themed worksheet bundles \u2014 10 animal addition sheets, 10 food addition sheets, 10 vehicle addition sheets \u2014 and list them as instant-download digital products. Use the Mixed mode to create variety within each pack. Etsy buyers search for "addition worksheets with pictures" over 12,000 times per month.',
      platform: 'Etsy',
    },
    {
      title: 'Publish KDP Activity Books on Amazon',
      description: 'Export PDF worksheets at different difficulty levels and compile them into 50\u2013100 page activity books. A "Kindergarten Addition with Animals" book or a "First Grade Math Practice" collection targets high-volume Amazon keywords. Include answer keys at the back for a complete, sellable product.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Classroom Resource Packs for TPT',
      description: 'Teachers Pay Teachers buyers want ready-to-print resources organized by skill. Create differentiated packs: one set with sums to 5, another with sums to 10, a third with sums to 20. Bundle them with answer keys and a cover page. TPT\u2019s built-in search drives organic traffic to well-titled listings.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Create Seasonal and Holiday Math Sets',
      description: 'Use themed images to build holiday-specific worksheet collections: pumpkins for Halloween, snowflakes for winter, hearts for Valentine\u2019s Day, flowers for spring. Seasonal products see concentrated demand during their window and can be listed year-round to capture early planners.',
      platform: 'Multi-platform',
    },
    {
      title: 'Launch a Homeschool Math Curriculum',
      description: 'Structure worksheets by week and difficulty to create a progressive addition curriculum. Start with Image + Image sums to 5, advance through Image + Number sums to 10, then introduce Find the Addend problems. Package 36 weeks of worksheets as a complete curriculum product for homeschool families.',
      platform: 'Gumroad',
    },
    {
      title: 'Offer Free Lead Magnets for Email Lists',
      description: 'Give away a free 5-page sampler of themed addition worksheets in exchange for email signups. The sampler demonstrates quality and drives buyers to your full paid packs. Use different themes in the sampler than in your paid products to avoid cannibalizing sales.',
      platform: 'Email Marketing',
    },
  ],

  faq: [
    {
      question: 'What exercise modes does the Addition Worksheet Generator offer?',
      answer: 'The generator includes four modes: Image + Image (pictures on both sides), Image + Number (picture plus numeral), Find the Addend (identify the missing number), and Mixed (random combination of all three). Each mode targets different cognitive skills and can be combined for comprehensive assessment.',
    },
    {
      question: 'Can I control the difficulty level of the addition problems?',
      answer: 'Yes. Set minimum and maximum operand values from 1 to 99 using the range sliders. For kindergarten, try 1\u201310. For first grade, set 1\u201320. For older students, go up to 50 or 99. The generator ensures all problems stay within your chosen range while avoiding duplicates.',
    },
    {
      question: 'How many image themes are available?',
      answer: 'The Full Access tier includes all 104 illustrated themes covering animals, vehicles, food, nature, sports, music, seasons, and more. The Commercial tier includes a curated selection of popular themes. Both tiers let you upload your own custom images as well.',
    },
    {
      question: 'What page sizes and formats does it support?',
      answer: 'Choose from US Letter (8.5 x 11 inches), A4, or custom dimensions. Both portrait and landscape orientations are available. Worksheets export as high-resolution JPEG images and print-ready PDF documents, each at a quality suitable for professional printing.',
    },
    {
      question: 'Does it generate answer keys automatically?',
      answer: 'Yes. Every worksheet comes with a matching answer key that uses the same layout, theme, and font. The answer key is generated as a separate file so you can distribute worksheets and answers independently.',
    },
    {
      question: 'Can I use these worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack and the Full Access Pack include a commercial license. You can sell the worksheets you create on Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad, your own website, and any other platform. Each license covers one person with unlimited worksheet generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the addition generator with commercial license, popular image themes, and all 11 languages. The Full Access Pack ($47) adds the complete library of 104 image themes, priority access to new themes, and all future updates. Both packs are one-time purchases with no subscription.',
    },
    {
      question: 'Can I try the generator before buying?',
      answer: 'Absolutely. The generator is free to use right now with no signup required. The free version includes all features, modes, and settings \u2014 the only difference is a small watermark on exported files. Try every mode, theme, and customization option to see exactly what you get before purchasing.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface and generated worksheets support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Addition is a visual-based app, so the math content itself works universally regardless of language.',
    },
    {
      question: 'How do I customize the worksheet layout?',
      answer: 'The built-in canvas editor gives you full control. Add custom text with adjustable font, size, color, and outline. Change background colors, apply decorative borders, drag elements to new positions, use alignment tools, and adjust layer ordering. Zoom in for precise placement, and undo any change instantly.',
    },
    {
      question: 'Is there a limit on how many worksheets I can create?',
      answer: 'No. Both paid tiers include unlimited worksheet generation. Create as many worksheets as you need for your classroom, curriculum, or product line. There are no monthly limits, credit systems, or usage caps.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'Due to the digital nature of the product, all sales are final. Once a license key is delivered and activated, it cannot be returned. We encourage you to use the free version with watermark to test every feature before purchasing. This ensures you know exactly what you are buying.',
    },
  ],

  internalLinks: [
    { slug: 'subtraction', pageType: 'app', anchorText: 'Subtraction Worksheet Generator' },
    { slug: 'math-puzzle', pageType: 'app', anchorText: 'Math Puzzle Generator' },
    { slug: 'chart-count', pageType: 'app', anchorText: 'Chart Count & Color Generator' },
    { slug: 'number-tracing', pageType: 'app', anchorText: 'Number Tracing Generator' },
    { slug: 'number-coloring', pageType: 'app', anchorText: 'Number Coloring Generator' },
    { slug: 'missing-number', pageType: 'app', anchorText: 'Missing Number Generator' },
    { slug: 'addition', pageType: 'tool', anchorText: 'Try Addition Generator Free' },
    { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Math & Number Bundle \u2014 Save on All Math Generators' },
    { slug: 'sell-printables-etsy', pageType: 'start', anchorText: 'How to Sell Printables on Etsy' },
    { slug: 'math-printable-ideas', pageType: 'idea', anchorText: 'Math Printable Niche Ideas' },
  ],
};
