import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'cryptogram',
  locale: 'en',
  category: 'literacy',

  seo: {
    titleTag: 'Cryptogram Generator | Image Code Puzzles Free Online',
    metaDescription: 'Create image cryptogram puzzles where pictures replace letters. Custom phrases, reveal hints, 104 themes, auto answer keys. Free online generator with PDF export for teachers.',
    primaryKeyword: 'cryptogram generator',
    secondaryKeywords: [
      'cryptogram worksheets printable',
      'picture cryptogram puzzles',
      'image code worksheets',
      'decode the message worksheets',
      'secret message puzzles',
    ],
    lsiKeywords: [
      'cipher worksheets for kids',
      'decoding activities',
      'visual code puzzles',
      'letter substitution worksheets',
      'secret code activities',
      'critical thinking puzzles',
      'literacy puzzles printable',
      'decode worksheets',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/cryptogram/cryptogram_worksheet (1).jpeg',
      primaryAlt: 'Image cryptogram puzzle with animal pictures replacing letters in a secret phrase',
      secondary: '/samples/english/cryptogram/cryptogram_worksheet (2).jpeg',
      secondaryAlt: 'Cryptogram answer key showing image-to-letter mapping and decoded message',
    },
    sampleGallery: [
      { src: '/samples/english/cryptogram/cryptogram_worksheet (3).jpeg', alt: 'Cryptogram with food theme images replacing alphabet letters', caption: 'Food theme cipher' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (4).jpeg', alt: 'Cryptogram with 3 reveal hints showing some letters', caption: '3 letter reveals as hints' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (5).jpeg', alt: 'Multi-line cryptogram with vehicle images', caption: 'Multi-line phrase support' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (6).jpeg', alt: 'Cryptogram with border and background decoration', caption: 'Custom background and border' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (7).jpeg', alt: 'Cryptogram with manually assigned images per letter', caption: 'Manual image assignment' },
      { src: '/samples/english/cryptogram/cryptogram_worksheet (8).jpeg', alt: 'Cryptogram answer key with decoded phrase', caption: 'Auto-generated answer key' },
    ],
    youtubeId: '9U0BIIjCnco',
    videoTitle: 'How to Create Image Cryptogram Puzzles',
  },

  hero: {
    title: 'Cryptogram Generator',
    tagline: 'Secret messages hidden in pictures \u2014 where every image is a letter waiting to be decoded',
    description: `Cryptograms transform reading into detective work. Each letter of a secret phrase is replaced by a picture, and students must crack the code by figuring out which image represents which letter. The Cryptogram Generator creates these image-based cipher puzzles using your custom phrases and images from a 104-theme library.

Type any phrase or sentence and the generator maps each unique letter to a different image. Students see a grid of pictures and must deduce the letter each one represents by analyzing letter frequency, word patterns, and context clues. A configurable reveal system lets you show some letters as hints \u2014 reveal 0 letters for a pure challenge or up to half the alphabet for a guided introduction.

Manual image assignment gives you creative control. Click individual letter buttons and assign specific images to each one \u2014 make "A" a cat, "B" a dog, "C" a car. Or use auto-assign to let the generator choose randomly from your selected theme. Control the maximum number of display lines to fit phrases onto your chosen page size.

The phrase input accepts any text, making this generator useful for vocabulary messages, motivational quotes, spelling sentences, or holiday-themed secret messages. The canvas editor adds professional polish, and every puzzle exports with a matching answer key showing the complete image-to-letter mapping. Try it free right now.`,
  },

  howItWorks: {
    title: 'Create an Image Cryptogram in 5 Steps',
    steps: [
      {
        title: 'Type Your Secret Phrase',
        description: 'Enter any phrase, sentence, or message in the phrase input. The generator identifies every unique letter and creates an image-to-letter mapping. Supports multi-line phrases for longer messages.',
      },
      {
        title: 'Assign Images to Letters',
        description: 'Use auto-assign to randomly map images from your chosen theme to letters. Or manually click each letter button and select a specific image from the library. This lets you create themed or controlled image assignments.',
      },
      {
        title: 'Set Reveal Hints',
        description: 'Choose how many letters to reveal as hints (0 for no hints up to half the alphabet). Revealed letters appear as text alongside the images, giving students starting points for decoding the rest.',
      },
      {
        title: 'Configure Layout',
        description: 'Set maximum lines per phrase to control text flow. Pick page size, font, and orientation. Add titles and instructions with the canvas editor. Apply backgrounds and borders.',
      },
      {
        title: 'Export Puzzle and Key',
        description: 'Download the cryptogram puzzle and answer key as JPEG or PDF. The answer key shows the complete image-to-letter mapping and the decoded phrase. Toggle grayscale for printing.',
      },
    ],
  },

  features: [
    {
      title: 'Custom Phrase Input',
      description: 'Type any phrase, sentence, or message as the cryptogram source. The generator maps each unique letter to a different image. Use vocabulary sentences, quotes, riddles, holiday messages, or spelling phrases \u2014 any text works.',
    },
    {
      title: 'Manual and Auto Image-to-Letter Assignment',
      description: 'Auto-assign randomly maps theme images to letters. Manual assignment lets you click each letter button (A through Z) and choose a specific image. Mix both approaches: auto-assign most letters and manually override a few for thematic control.',
    },
    {
      title: 'Configurable Reveal Hints',
      description: 'Set how many letters appear decoded as hints. Zero reveals create pure puzzles. More reveals scaffold the challenge for younger or less experienced solvers. Adjust difficulty by changing one setting without modifying the phrase.',
    },
    {
      title: 'Multi-Line Phrase Support',
      description: 'Set the maximum number of display lines to control how phrases wrap on the page. Shorter phrases fit a single line. Longer sentences, quotes, or paragraphs flow across multiple lines while maintaining the image cipher.',
    },
    {
      title: '104 Image Themes',
      description: 'Each theme provides images used as letter substitutes. Animals, food, vehicles, nature, and seasonal themes make every cryptogram visually distinct. Match themes to classroom topics or student interests.',
    },
    {
      title: 'Custom Image Upload',
      description: 'Upload your own images to use as cipher symbols. Use classroom photos, custom illustrations, or branded images. Uploaded images are stored in your browser session for experimentation.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add custom text, titles, and instructions. Change colors, apply themed backgrounds and borders. Layer controls, alignment tools, zoom, and undo/redo for precise layout editing.',
    },
    {
      title: 'Complete Answer Key',
      description: 'Every cryptogram generates an answer key showing the full image-to-letter mapping table and the decoded phrase. Export as JPEG or PDF with optional grayscale.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Secret Message Puzzle Books on Amazon KDP',
      description: 'Compile 50\u2013100 cryptogram puzzles into themed books: "Animal Code Puzzles," "Decode the Holiday Message," "Secret Messages for Kids." Include answer keys at the back. Cryptogram books fill a unique niche separate from word searches and crosswords.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Sell Themed Cryptogram Packs on Etsy',
      description: 'Bundle 10\u201320 image cryptograms by theme or occasion. Holiday message packs, motivational quote decoders, and vocabulary cipher sheets offer unique products. "Secret code worksheets" and "decode puzzles" are growing search terms.',
      platform: 'Etsy',
    },
    {
      title: 'Build Critical Thinking Resources for TPT',
      description: 'Create vocabulary-focused cryptograms where the decoded phrases are science definitions, historical facts, or grammar rules. Teachers search for "critical thinking activities" and "decoding worksheets" that combine literacy with reasoning.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Holiday Party Activities',
      description: 'Create seasonal cryptogram sheets for classroom parties: decode "TRICK OR TREAT" for Halloween, "HAPPY NEW YEAR" for January, "BE MY VALENTINE" for February. These single-sheet activities are easy to distribute and engaging for groups.',
      platform: 'Multi-platform',
    },
    {
      title: 'Develop Escape Room Puzzle Sets',
      description: 'Create cryptogram puzzles as components of printable escape room kits. Each solved cryptogram reveals a clue for the next puzzle. Package as classroom or family activity kits.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'How do image cryptograms work?',
      answer: 'Each letter of a phrase is replaced by a picture. Students must figure out which image represents which letter by analyzing word patterns, letter frequency, and context. The result is a decoded secret message.',
    },
    {
      question: 'Can I type any phrase or sentence?',
      answer: 'Yes. Enter any text in the phrase input. The generator maps each unique letter to a different image automatically. Use vocabulary sentences, quotes, riddles, holiday messages, or any text.',
    },
    {
      question: 'Can I choose which image represents each letter?',
      answer: 'Yes. Manual assignment lets you click each letter button and select a specific image. Or use auto-assign for random mapping. You can mix both: auto-assign most letters and manually choose a few.',
    },
    {
      question: 'How do reveal hints work?',
      answer: 'Set how many letters appear decoded as starting hints. More reveals make the puzzle easier by showing some letter-image mappings upfront. Zero reveals create a pure puzzle with no hints.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every cryptogram generates an answer key showing the complete image-to-letter mapping and the decoded phrase. Both export as JPEG and PDF.',
    },
    {
      question: 'How many themes are available?',
      answer: 'The Full Access Pack includes all 104 themes. The Commercial Pack includes popular themes. Both support custom image uploads.',
    },
    {
      question: 'Can I sell the puzzles commercially?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license. Sell on Etsy, Amazon KDP, TPT, and any platform. Unlimited generation.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all languages. The Full Access Pack ($47) adds all 104 themes, priority content, and future updates. One-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All features work free with only a watermark on exports. No signup required.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface supports 11 languages. Cryptogram is language-sensitive \u2014 the image library provides localized names in each language, and phrases can be entered in any language.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything first.',
    },
  ],

  internalLinks: [
    { slug: 'code-addition', pageType: 'app', anchorText: 'Code Addition Generator' },
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Word Scramble Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Word Guess Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'treasure-hunt', pageType: 'app', anchorText: 'Treasure Hunt Generator' },
    { slug: 'cryptogram', pageType: 'tool', anchorText: 'Try Cryptogram Generator Free' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Generators' },
    { slug: 'create-puzzle-books', pageType: 'guide', anchorText: 'How to Create Puzzle Books' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
  ],
};
