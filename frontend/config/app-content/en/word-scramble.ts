import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'word-scramble',
  locale: 'en',
  category: 'literacy',

  seo: {
    titleTag: 'Word Scramble Generator | Unscramble Worksheets Free',
    metaDescription: 'Create word scramble worksheets with 5 difficulty levels. Color-coded vowels, 104 image themes, custom word lists. Free online generator with answer keys and PDF export.',
    primaryKeyword: 'word scramble generator',
    secondaryKeywords: [
      'word scramble worksheets',
      'unscramble words worksheets',
      'printable word scramble maker',
      'word jumble generator',
      'scrambled words worksheets',
    ],
    lsiKeywords: [
      'spelling practice worksheets',
      'vocabulary activities',
      'word unscramble puzzles',
      'letter arrangement worksheets',
      'spelling games printable',
      'anagram worksheets',
      'word puzzles for kids',
      'spelling challenge activities',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/word scramble/Word Scramble 1.jpeg',
      primaryAlt: 'Word scramble worksheet with animal images and color-coded vowels and consonants',
      secondary: '/samples/english/word scramble/Word Scramble 2.jpeg',
      secondaryAlt: 'Word scramble answer key showing unscrambled words next to images',
    },
    sampleGallery: [
      { src: '/samples/english/word scramble/Word Scramble 3.jpeg', alt: 'Easy word scramble with 2 letters scrambled per word', caption: 'Easy level (2 letters moved)' },
      { src: '/samples/english/word scramble/Word Scramble 4.jpeg', alt: 'Hard word scramble with most letters rearranged', caption: 'Hard level challenge' },
      { src: '/samples/english/word scramble/Word Scramble 5.jpeg', alt: 'Word scramble with food theme and uppercase letters', caption: 'Uppercase with food theme' },
      { src: '/samples/english/word scramble/Word Scramble 6.jpeg', alt: 'Word scramble with custom word list and no images', caption: 'Custom word list mode' },
      { src: '/samples/english/word scramble/Word Scramble 7.jpeg', alt: 'Word scramble with border decoration and nature theme', caption: 'Decorated with border' },
      { src: '/samples/english/word scramble/Word Scramble 8.jpeg', alt: 'Word scramble answer key with all words solved', caption: 'Auto-generated answer key' },
    ],
    youtubeId: 'Hc3g5VsSHEU',
    videoTitle: 'How to Create Word Scramble Worksheets',
  },

  hero: {
    title: 'Word Scramble Generator',
    tagline: 'Five difficulty levels that make spelling practice feel like code-breaking',
    description: `Spelling tests measure recall. Word scrambles build reasoning. When students see jumbled letters next to an image clue, they must analyze letter patterns, apply phonics rules, and mentally rearrange characters until the word clicks. The Word Scramble Generator creates this experience across five difficulty levels, from gentle two-letter swaps to full word jumbles that challenge even strong spellers.

Five difficulty settings control exactly how scrambled the letters get. Easy moves just 1\u20132 letters out of place, giving students obvious starting points. Medium scrambles a third of the letters. Normal rearranges a quarter. Hard shuffles nearly every letter. Tough scrambles all but one-sixth of the letters. This granularity lets you differentiate within a single classroom or build progressive difficulty across a worksheet pack.

Color-coded letters add a visual layer. Toggle between vowel/consonant color coding (vowels in one color, consonants in another) and all-black text. Color coding helps younger students identify vowel patterns and build phonemic awareness while they unscramble. Switch letter case between uppercase and lowercase to match curriculum standards.

Three input modes provide flexibility: select images from 104 themes (their names become scramble words), enable Manual Edit to rename images before generation, or type a Custom Word List for any vocabulary. The canvas editor adds titles, backgrounds, and borders. Every worksheet exports with a matching answer key. Try everything free with no signup.`,
  },

  howItWorks: {
    title: 'Create a Word Scramble Worksheet in 5 Steps',
    steps: [
      {
        title: 'Choose Your Word Source',
        description: 'Select images from themed libraries (their names become scramble words), enable Manual Edit to customize word names, or type a Custom Word List for complete vocabulary control. Upload your own images for classroom-specific content.',
      },
      {
        title: 'Set the Difficulty Level',
        description: 'Pick from 5 levels: Easy (1/2 letters scrambled), Medium (1/3), Normal (1/4), Hard (1/4 with harder patterns), or Tough (1/6). Each level controls how many letters are rearranged in each word.',
      },
      {
        title: 'Configure Letter Display',
        description: 'Choose uppercase or lowercase letters. Toggle vowel/consonant color coding on or off. Set the puzzle count and whether to include exercise numbers and name/date fields.',
      },
      {
        title: 'Customize the Layout',
        description: 'Pick page size, font, and orientation. Apply themed backgrounds and borders. Add custom text with the canvas editor. Drag, align, and layer elements for a polished design.',
      },
      {
        title: 'Export and Distribute',
        description: 'Download the worksheet and answer key as JPEG or PDF. The answer key shows the correct unscrambled words. Toggle grayscale for ink-efficient printing.',
      },
    ],
  },

  features: [
    {
      title: 'Five Difficulty Levels',
      description: 'Easy scrambles just 1\u20132 letters per word. Medium moves a third. Normal rearranges a quarter. Hard shuffles more aggressively. Tough scrambles all but one-sixth. This granularity supports differentiation within a single classroom and progressive difficulty across worksheet packs.',
    },
    {
      title: 'Vowel and Consonant Color Coding',
      description: 'Toggle between color-coded letters (vowels in one color, consonants in another) and all-black text. Color coding helps students identify vowel patterns and build phonemic awareness while they unscramble. Particularly effective for early readers and ESL learners.',
    },
    {
      title: 'Uppercase and Lowercase Options',
      description: 'Switch between uppercase and lowercase letter display to match curriculum expectations. Uppercase suits preschool and kindergarten letter recognition. Lowercase aligns with first grade and beyond where standard text conventions apply.',
    },
    {
      title: 'Three Word Input Modes',
      description: 'Select themed images as word sources, enable Manual Edit to rename words before scrambling, or use Custom Word List mode to type any vocabulary. Each mode serves different needs: visual vocabulary, teacher-controlled content, or spelling list practice.',
    },
    {
      title: '104 Image Themes',
      description: 'Each theme provides illustrated vocabulary whose names become scramble words. Animals, food, vehicles, nature, and seasonal themes keep worksheets visually engaging and connected to classroom topics.',
    },
    {
      title: 'Manual Image Name Editing',
      description: 'Enable Manual Edit mode to customize image names before generation. Change "dog" to "puppy," adjust for dialect differences, or use the image with a completely different word. This gives full control without needing custom word lists.',
    },
    {
      title: 'Full Canvas Editor',
      description: 'Add titles, name fields, and instructions as text overlays. Change colors, apply backgrounds and borders. Drag, align, lock, and layer elements. Zoom and undo controls ensure precise, non-destructive editing.',
    },
    {
      title: 'Dual Export with Answer Key',
      description: 'Every worksheet generates a matching answer key showing the correct unscrambled words. Export both as JPEG or PDF. Grayscale toggle available for ink-saving printing.',
    },
  ],

  businessUseCases: [
    {
      title: 'Create Themed Scramble Packs for Etsy',
      description: 'Bundle word scramble worksheets by theme: "Animal Word Scrambles \u2014 20 Puzzles," "Food Vocabulary Scrambles \u2014 15 Worksheets." Offer difficulty-leveled packs targeting different age groups. "Word scramble printable" is a consistent Etsy search term.',
      platform: 'Etsy',
    },
    {
      title: 'Publish Word Puzzle Books on Amazon KDP',
      description: 'Compile 50\u2013100 word scrambles into themed puzzle books. Create series by difficulty level: "Easy Word Scrambles for Kindergarten," "Challenging Word Jumbles for Second Grade." Include answer keys at the back. Image-enhanced scrambles create stronger previews.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Build Spelling Practice Resources for TPT',
      description: 'Use Custom Word List mode to create spelling-list-specific scrambles aligned to curriculum. Create weekly scramble sheets matching sight word lists, vocabulary units, or phonics patterns. TPT teachers search for "spelling word scramble" regularly.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Design Multi-Language Vocabulary Sets',
      description: 'Create word scramble packs in different languages using the 11-language image library. French vocabulary scrambles, German word puzzles, Spanish letter jumbles \u2014 these multilingual products target language learners and bilingual classrooms.',
      platform: 'Multi-platform',
    },
    {
      title: 'Offer Progressive Difficulty Programs',
      description: 'Create a 20-week spelling enrichment program that starts at Easy and advances to Tough. Each week features a new theme with increasing scramble difficulty. Package for tutoring centers, homeschool families, and after-school programs.',
      platform: 'Gumroad',
    },
  ],

  faq: [
    {
      question: 'What difficulty levels are available?',
      answer: 'Five levels: Easy (1/2 letters moved), Medium (1/3), Normal (1/4), Hard (1/4 with harder patterns), and Tough (1/6 letters remain in place). Each level controls how many letters are rearranged in each word.',
    },
    {
      question: 'What is vowel/consonant color coding?',
      answer: 'When enabled, vowels display in one color and consonants in another. This visual distinction helps students identify vowel patterns and develop phonemic awareness while working on scrambled words.',
    },
    {
      question: 'Can I use my own word list?',
      answer: 'Yes. Custom Word List mode lets you type any words, one per line. The generator scrambles your words without using images. Perfect for spelling lists, vocabulary tests, or subject-specific content.',
    },
    {
      question: 'Can I edit image names before scrambling?',
      answer: 'Yes. Manual Edit mode lets you change image names before generation. Rename "dog" to "puppy," adjust for regional vocabulary, or assign completely different words to images.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every worksheet generates a matching answer key showing the correct unscrambled words. Both files export as JPEG and PDF.',
    },
    {
      question: 'Can I choose uppercase or lowercase letters?',
      answer: 'Yes. Toggle between uppercase and lowercase display. Uppercase suits younger learners focused on letter recognition. Lowercase matches standard text conventions for older students.',
    },
    {
      question: 'Can I sell these worksheets?',
      answer: 'Yes. Both the Commercial Pack ($27) and Full Access Pack ($47) include a commercial license for all platforms. Unlimited generation included.',
    },
    {
      question: 'What is the difference between the Commercial Pack and Full Access Pack?',
      answer: 'The Commercial Pack ($27) includes the generator, commercial license, popular themes, and all 11 languages. The Full Access Pack ($47) adds all 104 themes, priority access to new content, and future updates. Both are one-time purchases.',
    },
    {
      question: 'Can I try it free?',
      answer: 'Yes. All difficulty levels, color coding, and input modes work in the free version. Only a watermark on exports separates free from paid.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The interface and image library support 11 languages. Word Scramble is language-sensitive, meaning scrambled words use the localized image names in each language. Custom Word List mode works with any language.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'All sales are final due to the digital nature of the product. Once a license key is delivered and activated, it cannot be returned. Use the free version to test everything before purchasing.',
    },
  ],

  internalLinks: [
    { slug: 'wordsearch', pageType: 'app', anchorText: 'Word Search Generator' },
    { slug: 'word-guess', pageType: 'app', anchorText: 'Word Guess Generator' },
    { slug: 'cryptogram', pageType: 'app', anchorText: 'Cryptogram Generator' },
    { slug: 'crossword', pageType: 'app', anchorText: 'Crossword Generator' },
    { slug: 'alphabet-train', pageType: 'app', anchorText: 'Alphabet Train Generator' },
    { slug: 'writing', pageType: 'app', anchorText: 'Writing Generator' },
    { slug: 'word-scramble', pageType: 'tool', anchorText: 'Try Word Scramble Generator Free' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Generators' },
    { slug: 'create-word-search-books', pageType: 'guide', anchorText: 'How to Create Word Puzzle Books' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
  ],
};
