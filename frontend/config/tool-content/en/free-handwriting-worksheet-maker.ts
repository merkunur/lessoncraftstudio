import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'writing',
  locale: 'en',

  seo: {
    titleTag: 'Free Handwriting Practice Generator | Worksheet Maker',
    metaDescription: 'Create free handwriting practice worksheets with trace, copy, and free-write modes. 7 fonts, per-row controls, image prompts, PDF export. No signup. Try it now.',
    primaryKeyword: 'free handwriting practice generator',
    secondaryKeywords: [
      'handwriting worksheet maker free',
      'tracing worksheet generator tool',
      'printable handwriting creator',
      'letter tracing worksheet maker',
      'free writing practice printable',
    ],
    lsiKeywords: [
      'penmanship worksheets printable',
      'letter formation practice',
      'cursive handwriting worksheets',
      'name tracing worksheets',
      'handwriting practice sheets',
      'fine motor skills worksheets',
      'letter writing practice tool',
      'kindergarten handwriting printable',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/writing/writing beginning letter.jpeg',
      primaryAlt: 'Handwriting practice worksheet with traced letters and dotted guide lines',
      secondary: '/samples/english/writing/writing beginning letter.jpeg',
      secondaryAlt: 'Handwriting worksheet showing multiple fonts and practice modes on one page',
    },
    sampleGallery: [
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Letter tracing worksheet with dotted guidelines for beginning writers', caption: 'Letter tracing mode' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Copy practice worksheet with model text and blank writing lines', caption: 'Copy practice mode' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Free-write worksheet with image prompts and open lines', caption: 'Free-write with prompts' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Handwriting worksheet using cursive font with guided practice', caption: 'Cursive font practice' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Multi-row handwriting sheet with different modes per row', caption: 'Mixed modes per row' },
      { src: '/samples/english/writing/writing beginning letter.jpeg', alt: 'Name tracing worksheet with custom text and decorative border', caption: 'Custom name tracing' },
    ],
    youtubeId: '0b4WglqyXu0',
    videoTitle: 'How to Create Handwriting Worksheets \u2014 Free Practice Generator Tutorial',
  },

  hero: {
    title: 'Free Handwriting Practice Generator',
    tagline: 'Dynamic rows with per-row font, mode, and case control create truly customized writing practice',
    description: `This free handwriting practice generator creates worksheets with a dynamic row system where every row can have its own font, practice mode, letter case, and content. Unlike static templates that force one format per page, this tool lets you mix tracing, copying, and free-writing on the same worksheet \u2014 creating progressive practice that adapts to each student\u2019s needs.

Three practice modes serve different skill levels. Trace mode displays dotted letters that students follow with their pencil, building muscle memory for letter formation. Copy mode shows a model word or sentence at the left of the row, with blank guided lines where students reproduce it independently. Free-write mode provides empty lines with optional image prompts, encouraging creative writing practice.

Seven font choices cover the major handwriting styles taught worldwide. Select print, manuscript, cursive, D\u2019Nealian, or specialty fonts. Each font renders with proper letter formation including entry strokes, exit strokes, and connecting ligatures where applicable. Per-row font control means you can compare styles side by side or focus an entire worksheet on one font.

The image prompt system adds visual motivation. Assign images from the 104-theme library to individual rows. A picture of a cat beside a free-write line inspires students to write about cats. Image prompts work across all modes \u2014 trace the word "cat" beside its picture, copy a sentence about it, or free-write a description. Export as JPEG or PDF with grayscale toggle. Everything works free with a watermark \u2014 no signup, no restrictions.`,
  },

  whatYouCanCreate: [
    {
      title: 'Letter Tracing Worksheets',
      description: 'Trace mode creates dotted letters that students follow with a pencil. Set uppercase, lowercase, or both. Perfect for preschool and kindergarten students building initial letter formation skills.',
    },
    {
      title: 'Copy Practice Sheets',
      description: 'Copy mode displays a model word or sentence with blank guided lines beside it. Students reproduce the text independently, transitioning from tracing to self-directed writing.',
    },
    {
      title: 'Free-Writing Prompt Pages',
      description: 'Free-write mode provides empty lined rows with optional image prompts. Students write their own words, sentences, or stories. The image prompts inspire creative writing without dictating content.',
    },
    {
      title: 'Multi-Mode Progressive Worksheets',
      description: 'Mix all three modes on one page. Start with tracing at the top, transition to copying in the middle, and end with free-writing at the bottom. This progressive format builds skills within a single worksheet.',
    },
    {
      title: 'Custom Name Tracing Sheets',
      description: 'Type any name or word into a trace row. The generator creates dotted versions for students to trace repeatedly. Popular for personalized practice and name-writing activities.',
    },
    {
      title: 'Font Comparison Pages',
      description: 'Use per-row font control to display the same text in multiple handwriting styles. Students see how the same letters look in print, manuscript, cursive, and other fonts side by side.',
    },
  ],

  tutorial: {
    title: 'Create Handwriting Worksheets in 10 Steps',
    steps: [
      {
        title: 'Open the Generator',
        description: 'Click "Try It Free" to launch the Handwriting Generator. No account needed. The tool runs in your browser on desktop, tablet, or mobile.',
      },
      {
        title: 'Add Your First Row',
        description: 'Each worksheet is built row by row. Click "Add Row" to create a new practice line. Each row can have its own independent settings for font, mode, case, and content.',
      },
      {
        title: 'Choose the Practice Mode',
        description: 'Select trace (dotted letters to follow), copy (model text with blank lines), or free-write (empty lines with optional prompts). Each mode serves a different skill level.',
      },
      {
        title: 'Select a Font',
        description: 'Choose from 7 handwriting fonts including print, manuscript, cursive, and D\u2019Nealian. Each font renders with proper letter formation. Different rows can use different fonts.',
      },
      {
        title: 'Set Letter Case',
        description: 'Choose uppercase, lowercase, or mixed case for each row. Uppercase works well for early learners. Lowercase suits students progressing toward standard reading and writing formats.',
      },
      {
        title: 'Enter Row Content',
        description: 'Type the letters, words, or sentences you want students to practice. For trace and copy modes, this is the text they will follow. For free-write mode, add optional writing prompts.',
      },
      {
        title: 'Add Image Prompts (Optional)',
        description: 'Browse 104 image themes and assign pictures to individual rows. Image prompts appear beside the practice line, inspiring students to write about what they see.',
      },
      {
        title: 'Add More Rows',
        description: 'Repeat the process to add as many rows as fit on the page. Mix modes, fonts, and content across rows for differentiated or progressive practice on a single worksheet.',
      },
      {
        title: 'Customize the Layout',
        description: 'Add a title, student name field, and instructions. Apply borders and backgrounds using the canvas editor. Choose page size, orientation, and line spacing.',
      },
      {
        title: 'Export as JPEG or PDF',
        description: 'Download the finished worksheet as a high-resolution JPEG or print-ready PDF. Toggle grayscale for ink-saving black-and-white prints. Ready for immediate classroom use.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Handwriting Practice Packs on Etsy',
      description: 'Bundle 20\u201330 handwriting worksheets by skill level: "Beginning Letter Tracing," "First Words Copy Practice," "Creative Writing Prompts." Parents of preschoolers and kindergarteners search for handwriting practice daily.',
      platform: 'Etsy',
    },
    {
      title: 'Handwriting Workbooks on Amazon KDP',
      description: 'Compile trace-to-write progressive worksheets into books. Start with single letter tracing, advance to words, then sentences. Include all 7 fonts as separate chapters. The visual formatting creates strong book previews.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Font-Specific Practice Resources for TPT',
      description: 'Create resources organized by handwriting style: D\u2019Nealian practice, cursive introduction, manuscript formation. TPT teachers value font-specific materials that align to their school\u2019s handwriting curriculum.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Personalized Name Tracing Products',
      description: 'Offer custom name tracing worksheets as a made-to-order product. Parents love personalized learning materials, and name tracing is one of the most searched handwriting activities online.',
      platform: 'Etsy',
    },
    {
      title: 'Seasonal Writing Prompt Collections',
      description: 'Use seasonal image themes as writing prompts for free-write pages. Fall, winter, spring, and summer collections provide year-round content with concentrated demand during each season.',
      platform: 'Multi-platform',
    },
    {
      title: 'Daily Handwriting Practice Subscription',
      description: 'Generate a new handwriting worksheet for each school day, progressing from tracing to copying to free-writing over the year. Deliver as a weekly digital subscription for home or classroom use.',
      platform: 'Gumroad',
    },
  ],

  proTips: [
    {
      title: 'Progress from Trace to Copy to Free-Write',
      tip: 'Put all three modes on one worksheet: trace at the top, copy in the middle, free-write at the bottom. Students experience the full skill progression within a single practice session.',
    },
    {
      title: 'Match Fonts to Your School\u2019s Curriculum',
      tip: 'Check which handwriting style your school teaches (D\u2019Nealian, Zaner-Bloser, cursive) and select the matching font. Consistent font exposure reinforces the specific letter formations students are learning.',
    },
    {
      title: 'Use Image Prompts for Reluctant Writers',
      tip: 'Assign engaging images to free-write rows. A picture of a dinosaur or a space rocket inspires more writing than a blank line. Image prompts lower the barrier to creative writing for hesitant students.',
    },
    {
      title: 'Create Name Tracing as Warm-Ups',
      tip: 'Make personalized name tracing sheets for each student. Use them as daily warm-up activities. Students practice their most important word while developing fine motor control.',
    },
    {
      title: 'Sell Multi-Font Comparison Packs',
      tip: 'Create the same content in all 7 fonts and sell as a comparison bundle. Schools that are choosing a handwriting curriculum appreciate seeing the same text in different styles for evaluation.',
    },
    {
      title: 'Use Grayscale for High-Volume Printing',
      tip: 'Handwriting worksheets are printed frequently in classrooms. The grayscale toggle produces clean black-and-white output that reduces ink costs for teachers printing 25+ copies daily.',
    },
    {
      title: 'Mix Uppercase and Lowercase Rows',
      tip: 'Create worksheets with uppercase tracing in the first few rows and lowercase in the remaining rows. Students practice both letter forms on the same page, building recognition of both cases.',
    },
  ],

  faq: [
    {
      question: 'What practice modes does the Handwriting Generator offer?',
      answer: 'Three modes: trace (dotted letters to follow with a pencil), copy (model text with blank guided lines for reproduction), and free-write (empty lines with optional image prompts for creative writing). Each row can use a different mode.',
    },
    {
      question: 'What fonts are available?',
      answer: 'Seven handwriting fonts including print, manuscript, cursive, D\u2019Nealian, and specialty styles. Each font renders with proper letter formation, entry strokes, and connecting ligatures. Different rows can use different fonts on the same worksheet.',
    },
    {
      question: 'What is the dynamic row system?',
      answer: 'Each worksheet is built row by row. Every row can have its own font, practice mode, letter case, and content. This lets you create mixed-mode worksheets with progressive difficulty on a single page.',
    },
    {
      question: 'How do image prompts work?',
      answer: 'Assign images from the 104-theme library to individual rows. The picture appears beside the practice line, inspiring students to trace, copy, or write about what they see. Prompts work across all three modes.',
    },
    {
      question: 'Can I create name tracing worksheets?',
      answer: 'Yes. Type any name or word into a trace-mode row. The generator creates dotted versions for students to follow with their pencil. Create personalized sheets for each student in your class.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The generator supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Each language includes localized interface text and image vocabulary.',
    },
    {
      question: 'Can I mix different fonts on one worksheet?',
      answer: 'Yes. The per-row font control lets you assign a different font to each row. Create font comparison pages or worksheets that focus on one style per section.',
    },
    {
      question: 'Can I sell the worksheets I create?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for selling on Etsy, Amazon KDP, TPT, and any other platform. Unlimited generation included.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new content, and future updates. Both are one-time purchases with no recurring fees.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'alphabet-train', pageType: 'tool', anchorText: 'Free Alphabet Train Worksheet Maker' },
    { slug: 'wordsearch', pageType: 'tool', anchorText: 'Free Word Search Generator' },
    { slug: 'word-scramble', pageType: 'tool', anchorText: 'Free Word Scramble Generator' },
    { slug: 'word-guess', pageType: 'tool', anchorText: 'Free Hangman Worksheet Maker' },
    { slug: 'cryptogram', pageType: 'tool', anchorText: 'Free Cryptogram Puzzle Generator' },
    { slug: 'prepositions', pageType: 'tool', anchorText: 'Free Prepositions Worksheet Maker' },
    { slug: 'writing', pageType: 'app', anchorText: 'Handwriting Generator \u2014 Full Details' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Tools' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
    { slug: 'create-educational-bundles', pageType: 'guide', anchorText: 'How to Create Educational Bundles That Sell' },
  ],
};
