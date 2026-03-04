import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'writing',
  locale: 'en',
  category: 'literacy',

  seo: {
    titleTag: 'Writing Worksheet Generator | Handwriting Practice Free',
    metaDescription: 'Create handwriting and writing worksheets with dynamic rows, multiple modes, and image prompts. Per-row font and stroke control, 104 themes. Free generator with PDF export.',
    primaryKeyword: 'writing worksheet generator',
    secondaryKeywords: [
      'handwriting worksheets generator',
      'printable writing practice',
      'letter tracing worksheets',
      'handwriting practice sheets',
      'writing worksheets printable free',
    ],
    lsiKeywords: [
      'penmanship worksheets',
      'letter formation practice',
      'tracing worksheets preschool',
      'writing lines worksheets',
      'manuscript handwriting',
      'copywork worksheets',
      'handwriting practice kindergarten',
      'fine motor writing activities',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/writing/writing beginning letter.jpeg',
      primaryAlt: 'Writing worksheet with letter tracing rows, image prompts, and multiple handwriting styles',
      secondary: '/samples/english/writing/writing beginning letter.jpeg',
      secondaryAlt: 'Handwriting practice worksheet showing different font styles and stroke types per row',
    },
    sampleGallery: [
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Letter tracing worksheet with dotted guide lines and image prompt', caption: 'Letter tracing with image prompt' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Handwriting practice with multiple font styles per row', caption: 'Multiple font styles' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Writing worksheet with custom text and themed border', caption: 'Custom content with border' },
    ],
    youtubeId: '0b4WglqyXu0',
    videoTitle: 'How to Create Writing Practice Worksheets',
  },

  hero: {
    title: 'Writing Worksheet Generator',
    tagline: 'Row-by-row control over handwriting practice \u2014 every line customized to each student\u2019s level',
    description: `Teaching handwriting means managing many skill levels at once. One student needs tracing guides. Another is ready for independent copying. A third needs image prompts to inspire creative writing. The Writing Worksheet Generator handles all of these on a single page with its dynamic row system, where every row can have a different mode, font style, and content type.

The row-based architecture is what makes this generator unique. Add as many rows as you need and configure each one independently. Set one row to letter tracing with dashed guides and the next to free writing with solid lines. Change the font style per row to practice different letterforms. Choose uppercase, lowercase, or mixed case for each line. This level of control lets you build differentiated worksheets where the top half scaffolds and the bottom half challenges.

Image prompts from the 104-theme library add a visual component. Choose an image from the exercise image library or upload your own custom image. The image appears on the worksheet as a writing stimulus, prompting students to write the word, describe the picture, or copy a related sentence. This bridges the gap between isolated handwriting practice and meaningful writing.

The canvas editor lets you add text overlays, change backgrounds, and apply borders. Export as PDF for sharp printing or JPEG for digital distribution. Every page is classroom-ready in minutes. Try it free right now with no signup.`,
  },

  howItWorks: {
    title: 'Create a Writing Worksheet in 5 Steps',
    steps: [
      {
        title: 'Add Rows to Your Worksheet',
        description: 'Click "Add Row" to build your worksheet line by line. Each row operates independently, so you can mix different writing modes, font styles, and content types on a single page.',
      },
      {
        title: 'Configure Each Row',
        description: 'For each row, set the mode (tracing, copying, free writing), font style, content, and case (uppercase, lowercase, mixed). Optionally set the stroke type (solid, dashed, dotted) for tracing guides.',
      },
      {
        title: 'Add an Image Prompt',
        description: 'Select an image from the 104-theme library or upload your own. The image appears on the worksheet as a visual writing stimulus. Choose between the exercise image library and custom uploads.',
      },
      {
        title: 'Customize the Page',
        description: 'Pick page size and orientation. Apply themed backgrounds and decorative borders. Add custom text overlays with the canvas editor for titles, name fields, or instructions.',
      },
      {
        title: 'Export and Print',
        description: 'Download as PDF for crisp printing or JPEG for digital use. Toggle grayscale for ink-efficient black-and-white output. Each worksheet is ready for immediate classroom distribution.',
      },
    ],
  },

  features: [
    {
      title: 'Dynamic Row-Based Layout',
      description: 'Add and remove rows freely. Each row is configured independently with its own mode, font style, content, and case settings. Build worksheets that mix tracing, copying, and free writing on a single page for differentiated instruction.',
    },
    {
      title: 'Per-Row Mode Selection',
      description: 'Each row can have a different writing mode: letter tracing with guides, word copying from a model, or free writing on blank lines. This lets you scaffold within a single worksheet \u2014 guided practice at the top, independent writing at the bottom.',
    },
    {
      title: 'Per-Row Font Style and Case Control',
      description: 'Set a different font for each row from 7 professional options. Choose uppercase, lowercase, or mixed case per row. Optionally set stroke type (solid, dashed, dotted) for tracing guides. This granularity supports diverse handwriting curricula.',
    },
    {
      title: 'Image Prompt Integration',
      description: 'Add images from the 104-theme library as writing prompts. Images appear on the worksheet to inspire writing: trace the word for the picture, write a sentence about it, or use it as a creative writing starter. Upload custom images for classroom-specific prompts.',
    },
    {
      title: 'Editable Text Blocks',
      description: 'Each row contains editable content blocks where you type the text students will trace or copy. Click directly on a block to modify it, making it easy to create custom sentences, vocabulary words, or writing prompts.',
    },
    {
      title: '104 Image Themes',
      description: 'The exercise image library provides illustrated prompts organized by theme \u2014 animals, food, vehicles, nature, and more. Each image comes with a localized name for vocabulary connection across all 11 languages.',
    },
    {
      title: 'Canvas Editor with Layer Controls',
      description: 'Add text overlays for titles and instructions. Apply background themes and borders. Alignment tools, forward/backward layer ordering, zoom, and lock controls give precise layout control.',
    },
    {
      title: 'PDF and JPEG Export',
      description: 'Download as print-ready PDF for sharp classroom printing or JPEG for digital distribution. Grayscale toggle available for ink-efficient output. Single-page worksheet format ready for immediate use.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Handwriting Practice Packs for Etsy',
      description: 'Bundle themed writing worksheets: "Animal Handwriting Practice \u2014 26 Letters," "Food Vocabulary Tracing Sheets." Offer different difficulty levels for different ages. "Handwriting worksheets" and "tracing worksheets" are high-volume Etsy search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Publish Handwriting Workbooks on Amazon KDP',
      description: 'Compile tracing and writing worksheets into progressive workbooks: "My First Handwriting Book: Trace and Write," "Kindergarten Writing Practice." Use the per-row difficulty system to advance from tracing to copying to independent writing across pages.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Writing Resources for TPT',
      description: 'Create differentiated writing packs for Teachers Pay Teachers. One pack for tracing (PreK\u2013K), another for copying (K\u20131st), a third for prompted writing (1st\u20132nd). Include image prompts for vocabulary integration. TPT teachers search for "writing worksheets" by grade.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Name Writing Practice Sheets',
      description: 'Create personalized name tracing worksheets. Parents love products where they can see their child\u2019s name. Use the editable text blocks to set up common names with tracing guides. Package as custom-order products on Etsy.',
      platform: 'Etsy',
    },
    {
      title: 'Develop a Progressive Writing Curriculum',
      description: 'Structure worksheets into a 36-week handwriting program: Weeks 1\u201312 (tracing with dashed guides), Weeks 13\u201324 (copying with solid lines), Weeks 25\u201336 (prompted free writing). Package for homeschool families and small schools.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What makes the row system unique?',
      answer: 'Each row on the worksheet is configured independently with its own mode, font, content, case, and stroke type. You can mix tracing, copying, and free writing on a single page, creating differentiated worksheets without generating multiple files.',
    },
    {
      question: 'What writing modes are available?',
      answer: 'Each row can be set to letter/word tracing (with dashed or dotted guides), copying from a model, or free writing on blank lines. The specific modes available depend on the row configuration options.',
    },
    {
      question: 'Can I use different fonts on the same worksheet?',
      answer: 'Yes. Each row has its own font style setting chosen from 7 professional fonts. This lets you practice different letterforms on the same page or use specific fonts for specific grade levels.',
    },
    {
      question: 'How do image prompts work?',
      answer: 'Select an image from the 104-theme library or upload your own. The image appears on the worksheet as a visual stimulus. Students can trace the word, write a sentence about the image, or use it as a creative writing starter.',
    },
    {
      question: 'Can I customize the text students trace or copy?',
      answer: 'Yes. Editable text blocks let you type any content directly. Write letters, words, sentences, or vocabulary terms. Click a block to modify it.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface and image library support 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Writing is language-sensitive \u2014 text content adapts to each language.',
    },
    {
      question: 'Can I sell the worksheets commercially?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for all platforms. Unlimited generation included.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all languages. The Full Access Pack ($47) adds all 104 themes, priority content, and future updates. Both one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All modes, fonts, and settings work free with only a watermark on exports. No signup required.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'alphabet-train', pageType: 'app', anchorText: 'Alphabet Train Generator' },
    { slug: 'drawing-lines', pageType: 'app', anchorText: 'Drawing Lines Generator' },
    { slug: 'draw-and-color', pageType: 'app', anchorText: 'Draw & Color Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Word Guess Generator' },
    { slug: 'prepositions', pageType: 'app', anchorText: 'Prepositions Generator' },
    { slug: 'writing', pageType: 'tool', anchorText: 'Try Writing Generator Free' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Generators' },
    { slug: 'create-first-grade-worksheets', pageType: 'guide', anchorText: 'How to Create First Grade Worksheets' },
    { slug: 'preschool-printable-ideas', pageType: 'idea', anchorText: 'Preschool Printable Niche Ideas' },
  ],
};
