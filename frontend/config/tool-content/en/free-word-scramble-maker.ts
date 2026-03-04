import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'word-scramble',
  locale: 'en',

  seo: {
    titleTag: 'Free Word Scramble Generator | Printable Puzzle Maker',
    metaDescription: 'Create free word scramble worksheets with 5 difficulty levels. Vowel color coding, image clues, 3 word modes, answer keys, PDF export. No signup. Try it now.',
    primaryKeyword: 'free word scramble generator',
    secondaryKeywords: [
      'word scramble worksheet maker free',
      'printable word scramble creator',
      'anagram puzzle generator tool',
      'free spelling puzzle worksheets',
      'scrambled words activity maker',
    ],
    lsiKeywords: [
      'unscramble words worksheets',
      'spelling practice puzzle maker',
      'vocabulary scramble printable',
      'anagram worksheets for kids',
      'word jumble puzzle creator',
      'letter rearranging activities',
      'spelling game worksheets',
      'vocabulary puzzle printables',
    ],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/word scramble/Word Scramble 1.jpeg',
      primaryAlt: 'Word scramble worksheet showing scrambled words with image clues and blank answer spaces',
      secondary: '/samples/english/word scramble/Word Scramble 2.jpeg',
      secondaryAlt: 'Word scramble answer key with all unscrambled solutions revealed',
    },
    sampleGallery: [
      { src: '/samples/english/word scramble/Word Scramble 3.jpeg', alt: 'Easy difficulty word scramble with minimal letter rearrangement', caption: 'Easy difficulty level' },
      { src: '/samples/english/word scramble/Word Scramble 4.jpeg', alt: 'Word scramble with vowel and consonant color coding', caption: 'Color-coded vowels' },
      { src: '/samples/english/word scramble/Word Scramble 5.jpeg', alt: 'Hard difficulty word scramble with fully shuffled letters', caption: 'Hard difficulty level' },
      { src: '/samples/english/word scramble/Word Scramble 6.jpeg', alt: 'Word scramble worksheet with uppercase letters and themed images', caption: 'Uppercase letter format' },
      { src: '/samples/english/word scramble/Word Scramble 7.jpeg', alt: 'Word scramble using manual word entry with custom vocabulary', caption: 'Custom vocabulary words' },
      { src: '/samples/english/word scramble/Word Scramble 8.jpeg', alt: 'Word scramble answer key with color-coded letter solutions', caption: 'Color-coded answer key' },
    ],
    youtubeId: 'Hc3g5VsSHEU',
    videoTitle: 'How to Create Word Scramble Worksheets \u2014 Free Generator Tutorial',
  },

  hero: {
    title: 'Free Word Scramble Worksheet Generator',
    tagline: 'Scrambled letters plus image clues create spelling puzzles that students actually enjoy solving',
    description: `This free word scramble generator creates worksheets where students unscramble jumbled letters to spell words, using image clues as hints. The combination of visual prompts and letter rearrangement exercises both spelling recall and pattern recognition \u2014 two skills that reinforce each other during every puzzle solved.

Five difficulty levels control how aggressively letters get shuffled. Level 1 swaps just one or two adjacent letters, keeping the word nearly recognizable. Level 5 fully randomizes all letter positions, creating a genuine anagram challenge. This range means the same tool serves kindergarteners learning basic words and older students tackling complex vocabulary.

Vowel and consonant color coding adds a visual scaffolding layer. When enabled, vowels display in one color and consonants in another, helping students identify letter types and spot patterns in scrambled words. This feature is especially useful for early readers who struggle to distinguish vowels from consonants in mixed-up sequences.

Three word input modes give you control over vocabulary. Auto mode selects words from the image library based on your chosen theme. Manual entry lets you type custom word lists for specific units. The image library browser lets you handpick individual word-image pairs. All modes support uppercase or lowercase letters and generate automatic answer keys. Export as JPEG or PDF with grayscale toggle. Everything works free with a watermark \u2014 no signup needed.`,
  },

  whatYouCanCreate: [
    {
      title: 'Graded Difficulty Spelling Puzzles',
      description: 'Use the 5 difficulty levels to create progressive challenge sets. Start students at level 1 with minimal letter swaps and advance them through to level 5 full scrambles as their skills grow.',
    },
    {
      title: 'Color-Coded Phonics Activities',
      description: 'Enable vowel/consonant color coding so students see letter patterns while unscrambling. This visual aid reinforces phonics rules and helps struggling readers identify vowel positions in words.',
    },
    {
      title: 'Themed Vocabulary Scrambles',
      description: 'Use the 104 image themes to create topic-specific puzzle sets. Animal vocabulary scrambles, food word jumbles, or vehicle spelling challenges \u2014 each theme produces engaging, relevant exercises.',
    },
    {
      title: 'Curriculum-Aligned Word Lists',
      description: 'Type your exact spelling words into manual entry mode. Create scramble worksheets that practice the specific vocabulary from any subject \u2014 science terms, social studies words, or weekly spelling lists.',
    },
    {
      title: 'Uppercase and Lowercase Practice',
      description: 'Toggle between uppercase and lowercase letter displays. Use uppercase for early learners who recognize capital letters first, then switch to lowercase as they progress to standard reading formats.',
    },
    {
      title: 'Self-Checking Puzzle Stations',
      description: 'Generate worksheets with matching answer keys. Set up as independent learning centers where students solve scrambles, then verify their own answers without teacher intervention.',
    },
  ],

  tutorial: {
    title: 'Create Word Scramble Worksheets in 9 Steps',
    steps: [
      {
        title: 'Open the Generator',
        description: 'Click "Try It Free" to launch the Word Scramble Generator in your browser. No account or download required. Works on desktop, tablet, and mobile.',
      },
      {
        title: 'Choose a Word Input Mode',
        description: 'Auto mode selects words from the image library automatically. Manual entry lets you type custom word lists. Image library mode lets you browse and select individual word-image pairs.',
      },
      {
        title: 'Select a Theme',
        description: 'Browse 104 image themes to find vocabulary that matches your lesson goals. Each theme provides illustrated words covering common objects, animals, food, vehicles, and more.',
      },
      {
        title: 'Set the Difficulty Level',
        description: 'Choose from 5 difficulty levels. Level 1 swaps just 1\u20132 adjacent letters. Level 5 fully randomizes all positions. The difficulty level controls how hard each puzzle is to solve.',
      },
      {
        title: 'Enable Color Coding (Optional)',
        description: 'Turn on vowel/consonant color coding to display vowels in one color and consonants in another. This visual scaffold helps students identify letter types and find patterns in scrambled words.',
      },
      {
        title: 'Choose Letter Case',
        description: 'Select uppercase or lowercase letter display. Uppercase works well for early learners. Lowercase suits students who are reading fluently. The choice applies to all exercises on the worksheet.',
      },
      {
        title: 'Set Exercise Count',
        description: 'Choose how many word scramble exercises to include per worksheet. The generator creates image clues and scrambled letter spaces for each word in your set.',
      },
      {
        title: 'Customize the Design',
        description: 'Add titles, student name fields, and instructions using the canvas editor. Apply borders, backgrounds, and choose your preferred font style. Adjust page size and orientation.',
      },
      {
        title: 'Export Worksheet and Answer Key',
        description: 'Download both files as JPEG or PDF. The answer key shows the correct unscrambled word for each exercise. Toggle grayscale for ink-efficient printing.',
      },
    ],
  },

  businessIdeas: [
    {
      title: 'Spelling Puzzle Packs on Etsy',
      description: 'Bundle 15\u201320 word scramble worksheets per theme or difficulty level. "Easy Animal Word Scrambles" for young learners and "Hard Vocabulary Challenges" for older students. Parents search for printable spelling activities regularly.',
      platform: 'Etsy',
    },
    {
      title: 'Word Puzzle Books on Amazon KDP',
      description: 'Compile word scramble worksheets into themed puzzle books with progressive difficulty. Start at level 1 and advance through level 5 across chapters. Include answer keys at the back for self-checking.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Spelling Center Kits for TPT',
      description: 'Create self-checking spelling stations with word scramble worksheets, laminated answer keys, and teacher instructions. TPT teachers value resources that work as independent centers requiring no supervision.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Seasonal Vocabulary Scramble Collections',
      description: 'Use seasonal image themes to create holiday word scramble sets: autumn harvest words, winter holiday vocabulary, spring nature terms. Seasonal products generate concentrated demand during key periods.',
      platform: 'Multi-platform',
    },
    {
      title: 'Weekly Spelling Challenge Subscription',
      description: 'Generate new themed word scramble sets each week aligned to grade-level vocabulary. Deliver as a digital subscription covering 36 weeks of progressive spelling practice.',
      platform: 'Gumroad',
    },
    {
      title: 'Bilingual Word Scramble Workbooks',
      description: 'Leverage the 11-language support to create dual-language scramble books. English-Spanish, English-French, or English-German pairs help language learners practice vocabulary in both languages side by side.',
      platform: 'Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Match Difficulty to Grade Level',
      tip: 'Use level 1\u20132 for kindergarten and first grade, level 3 for second and third grade, and level 4\u20135 for fourth grade and above. Matching difficulty prevents frustration and maintains engagement.',
    },
    {
      title: 'Enable Color Coding for Struggling Readers',
      tip: 'The vowel/consonant color coding helps students who struggle with letter identification. They can focus on placing vowels first, then fill in consonants \u2014 breaking the puzzle into manageable steps.',
    },
    {
      title: 'Create Paired Activities with Word Search',
      tip: 'Use the same vocabulary in both word scramble and word search worksheets. Students encounter identical words in two different puzzle formats, strengthening spelling through varied repetition.',
    },
    {
      title: 'Use Manual Entry for Test Prep',
      tip: 'Type your exact test vocabulary into manual entry mode. Word scramble practice before a spelling test helps students memorize letter sequences through active manipulation rather than passive study.',
    },
    {
      title: 'Sell Difficulty-Tiered Bundles',
      tip: 'Create the same word list at all 5 difficulty levels and sell as a differentiation bundle. Teachers love resources that serve multiple ability levels with a single purchase.',
    },
    {
      title: 'Use Uppercase for Early Learners',
      tip: 'Kindergarteners often recognize uppercase letters before lowercase. Start with uppercase scrambles and transition to lowercase as students become confident with both letter forms.',
    },
    {
      title: 'Generate Multiple Versions for Assessment',
      tip: 'Auto mode creates a unique scramble arrangement each time. Generate 4\u20135 different versions of the same word list so nearby students have different puzzles during assessments.',
    },
  ],

  faq: [
    {
      question: 'How does the Word Scramble Generator work?',
      answer: 'Each exercise shows a scrambled word alongside an image clue. Students rearrange the jumbled letters to spell the correct word. Five difficulty levels control how aggressively letters are shuffled, from simple swaps to full randomization.',
    },
    {
      question: 'What are the 5 difficulty levels?',
      answer: 'Level 1 swaps just 1\u20132 adjacent letters, keeping words nearly recognizable. Level 2\u20133 increases the shuffle moderately. Level 4\u20135 fully randomizes all letter positions for a genuine anagram challenge. Choose the level that matches your students\u2019 ability.',
    },
    {
      question: 'What is vowel/consonant color coding?',
      answer: 'When enabled, vowels display in one color and consonants in another. This visual scaffold helps students identify letter types and spot patterns in scrambled words, making the unscrambling process more strategic.',
    },
    {
      question: 'What are the three word input modes?',
      answer: 'Auto mode selects words from the image library based on your theme. Manual entry lets you type custom word lists. Image library mode lets you browse and select specific word-image pairs. All modes support uppercase and lowercase.',
    },
    {
      question: 'How many exercises can I put on one worksheet?',
      answer: 'The number of exercises per worksheet depends on word length and page layout. The generator optimizes spacing automatically. Each exercise includes the scrambled word, image clue, and blank answer space.',
    },
    {
      question: 'What languages are supported?',
      answer: 'The generator supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. Each language includes localized vocabulary and interface translations.',
    },
    {
      question: 'Does it generate answer keys?',
      answer: 'Yes. Every worksheet generates a matching answer key showing the correctly unscrambled word for each exercise. Both files export separately as JPEG or PDF.',
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
    { slug: 'wordsearch', pageType: 'tool', anchorText: 'Free Word Search Generator' },
    { slug: 'word-guess', pageType: 'tool', anchorText: 'Free Hangman Worksheet Maker' },
    { slug: 'cryptogram', pageType: 'tool', anchorText: 'Free Cryptogram Puzzle Generator' },
    { slug: 'alphabet-train', pageType: 'tool', anchorText: 'Free Alphabet Train Worksheet Maker' },
    { slug: 'writing', pageType: 'tool', anchorText: 'Free Handwriting Practice Generator' },
    { slug: 'prepositions', pageType: 'tool', anchorText: 'Free Prepositions Worksheet Maker' },
    { slug: 'word-scramble', pageType: 'app', anchorText: 'Word Scramble Generator \u2014 Full Details' },
    { slug: 'literacy-bundle', pageType: 'bundle', anchorText: 'Letters & Words Bundle \u2014 Save on All Literacy Tools' },
    { slug: 'reading-printable-ideas', pageType: 'idea', anchorText: 'Reading Printable Niche Ideas' },
    { slug: 'create-educational-bundles', pageType: 'guide', anchorText: 'How to Create Educational Bundles That Sell' },
  ],
};
