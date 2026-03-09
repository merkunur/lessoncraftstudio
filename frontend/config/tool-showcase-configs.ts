import type { HeroShowcaseConfig, TieredShowcaseConfig, SpotlightConfig, GalleryConfig } from '@/components/showcase';

export interface ToolShowcaseConfig {
  hero: HeroShowcaseConfig;
  tiered: TieredShowcaseConfig;
  spotlight: SpotlightConfig;
  gallery: GalleryConfig;
}

/** Build a sample image URL from app folder name and filename */
function img(appFolder: string, filename: string) {
  const encodedFolder = encodeURIComponent(appFolder);
  const encodedFile = encodeURIComponent(filename);
  return `/samples/english/${encodedFolder}/${encodedFile}`;
}

// ═══════════════════════════════════════════════════════════════════
// TOOL SHOWCASE CONFIGS — one per tool
// Each has UNIQUE copy distinct from the /apps/ page configs
// ═══════════════════════════════════════════════════════════════════

export const toolShowcaseConfigs: Record<string, ToolShowcaseConfig> = {

  // ─── Addition (toolId: image-addition) ───
  'image-addition': {
    hero: {
      gradient: 'linear-gradient(140deg, #FFF8E1 0%, #FFECB3 35%, #FFD54F 70%, #FFA726 100%)',
      accentColor: 'amber',
      badge: 'Early Math Skills',
      heading: 'Picture-Based Addition Practice',
      subheading: 'Colorful themed worksheets that make addition click for young learners',
      images: [
        { src: img('addition', 'Addition Fun 2.webp'), alt: 'Themed addition worksheet with picture counting' },
        { src: img('addition', 'Addition Fun 4.webp'), alt: 'Intermediate addition practice with colorful images' },
        { src: img('addition', 'Addition Fun 6.webp'), alt: 'Advanced addition worksheet with mixed visuals' },
      ],
      pills: [
        { label: 'Themed Pictures', icon: '🎨' },
        { label: 'Instant Download', icon: '📥' },
        { label: 'Answer Key Included', icon: '✓' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '+',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #E1F5FE 40%, #F3E5F5 100%)',
      badge: 'Progression Path',
      heading: 'Structured Difficulty for Every Learner',
      subheading: 'Worksheets that adapt to each student\'s level',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('addition', 'Addition Fun 1.webp'), alt: 'Beginner addition — count and add pictures 1-5' },
          desc: 'Count themed pictures and add totals to 5',
        },
        {
          name: 'Explorer', gradientClass: 'from-amber-400 to-yellow-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('addition', 'addition_worksheet portrait.webp'), alt: 'Explorer addition — mixed picture sums to 10' },
          desc: 'Mixed picture groups with sums reaching 10',
        },
        {
          name: 'Expert', gradientClass: 'from-orange-400 to-red-500', textColorClass: 'text-orange-700', borderColorClass: 'border-orange-300', stars: 3,
          image: { src: img('addition', 'image and number.webp'), alt: 'Expert addition — two-digit sums with images' },
          desc: 'Combine images and numbers for sums to 20',
        },
      ],
      trophyText: 'Progress at your own pace with visual math',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)',
      heading: 'Counting Made Colorful!',
      tagline: 'Visual Addition Mastery',
      image: { src: img('addition', 'Addition Fun 3.webp'), alt: 'Spotlight addition worksheet — vibrant themed counting activity' },
      pills: ['Download & Print', 'Themed Images', 'Solutions Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFFDE7 0%, #FFF9C4 50%, #FFF176 100%)',
      heading: 'Printable Addition Collection',
      subheading: 'Ready-to-use worksheets for home and classroom',
      items: [
        { image: { src: img('addition', 'Addition Fun 5.webp'), alt: 'Addition practice sheet — themed layout' }, label: 'Practice Sheet' },
        { image: { src: img('addition', 'Addition Fun 6.webp'), alt: 'Addition activity — mixed image problems' }, label: 'Activity Page' },
        { image: { src: img('addition', 'Addition Fun 5 answer_key.webp'), alt: 'Addition answer key — full solutions' }, label: 'Solutions' },
      ],
      pills: ['Print-Ready PDFs', 'Zero Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#E65100',
    },
  },

  // ─── Subtraction (toolId: image-subtraction) ───
  'image-subtraction': {
    hero: {
      gradient: 'linear-gradient(145deg, #FCE4EC 0%, #F8BBD0 40%, #F48FB1 70%, #EC407A 100%)',
      accentColor: 'rose',
      badge: 'Early Math Foundations',
      heading: 'Cross-Out Subtraction with Pictures',
      subheading: 'Visual subtraction worksheets that teach take-away concepts step by step',
      images: [
        { src: img('subtraction', 'Subtraction Fun 2.webp'), alt: 'Cross-out subtraction worksheet with themed pictures' },
        { src: img('subtraction', 'Subtraction Fun 3.webp'), alt: 'Image subtraction activity — find the difference' },
        { src: img('subtraction', 'Subtraction Fun 4.webp'), alt: 'Subtraction practice with visual counting' },
      ],
      pills: [
        { label: 'Cross-Out Method', icon: '✕' },
        { label: 'Instant Print', icon: '🖨' },
        { label: 'Complete Solutions', icon: '✓' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '−',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FCE4EC 0%, #E8EAF6 40%, #FFF8E1 100%)',
      badge: 'Learning Stages',
      heading: 'Subtraction Skills from Simple to Challenging',
      subheading: 'Worksheets that guide learners through take-away concepts',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('subtraction', 'cross out.webp'), alt: 'Beginner subtraction — cross out pictures to subtract' },
          desc: 'Cross out pictures to find differences up to 5',
        },
        {
          name: 'Explorer', gradientClass: 'from-pink-400 to-rose-500', textColorClass: 'text-pink-700', borderColorClass: 'border-pink-300', stars: 2,
          image: { src: img('subtraction', 'image number.webp'), alt: 'Explorer subtraction — images paired with numbers' },
          desc: 'Pair images with number subtraction to 10',
        },
        {
          name: 'Expert', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 3,
          image: { src: img('subtraction', 'mixed.webp'), alt: 'Expert subtraction — multiple problem formats' },
          desc: 'Mixed formats with differences up to 20',
        },
      ],
      trophyText: 'Master take-away concepts through pictures',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF0F5 0%, #FCE4EC 50%, #F8BBD0 100%)',
      heading: 'Take-Away Practice!',
      tagline: 'Visual Subtraction Made Simple',
      image: { src: img('subtraction', 'Subtraction Fun 1.webp'), alt: 'Spotlight subtraction worksheet — colorful cross-out activity' },
      pills: ['Print & Practice', 'Picture Method', 'Full Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'rose',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0E8 50%, #FFE4D6 100%)',
      heading: 'Subtraction Worksheet Gallery',
      subheading: 'Polished worksheets for hands-on subtraction practice',
      items: [
        { image: { src: img('subtraction', 'Subtraction Fun 2.webp'), alt: 'Subtraction practice sheet — themed visuals' }, label: 'Practice Sheet' },
        { image: { src: img('subtraction', 'find subtrahend.webp'), alt: 'Find the subtrahend — reverse subtraction challenge' }, label: 'Challenge Mode' },
        { image: { src: img('subtraction', 'Subtraction Fun 1 answer_key.webp'), alt: 'Subtraction answer key — all solutions' }, label: 'Solutions' },
      ],
      pills: ['Print-Ready PDFs', 'No Preparation', 'Solutions Included', 'Multiple Formats'],
      frameColor: '#AD1457',
    },
  },

  // ─── Code Addition (toolId: code-addition) ───
  'code-addition': {
    hero: {
      gradient: 'linear-gradient(150deg, #311B92 0%, #4A148C 50%, #6A1B9A 100%)',
      accentColor: 'purple',
      badge: 'Math & Puzzles',
      heading: 'Decode Secret Messages with Addition',
      subheading: 'Code-breaking worksheets where math skills unlock hidden words',
      images: [
        { src: img('code addition', 'Code Breaker Addition 1.webp'), alt: 'Code breaker worksheet — addition unlocks letters' },
        { src: img('code addition', 'Code Breaker Addition 3.webp'), alt: 'Secret message puzzle — solve sums to decode' },
        { src: img('code addition', 'Code Breaker Addition 4.webp'), alt: 'Advanced code cracker — multi-digit addition challenge' },
      ],
      pills: [
        { label: 'Secret Messages', icon: '🔐' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Solutions Provided', icon: '✓' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '?',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #EDE7F6 0%, #E8EAF6 40%, #FFFDE7 100%)',
      badge: 'Difficulty Tiers',
      heading: 'Code-Breaking for All Levels',
      subheading: 'From simple letter codes to full secret phrases',
      tiers: [
        {
          name: 'Rookie', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('code addition', 'Code Breaker Addition 1.webp'), alt: 'Rookie code breaker — basic addition codes' },
          desc: 'Basic sums decode short 3-4 letter words',
        },
        {
          name: 'Agent', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('code addition', 'Code Breaker Addition 2.webp'), alt: 'Agent code breaker — medium sums to decode' },
          desc: 'Longer messages with sums up to 15',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('code addition', 'Code Breaker Addition 4.webp'), alt: 'Master code breaker — challenging decode puzzles' },
          desc: 'Multi-step codes with sums reaching 20',
        },
      ],
      trophyText: 'Crack every code and sharpen math skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 50%, #CE93D8 100%)',
      heading: 'Crack the Code!',
      tagline: 'Where Math Meets Mystery',
      image: { src: img('code addition', 'Code Breaker Addition 3.webp'), alt: 'Spotlight code addition — secret message math puzzle' },
      pills: ['Print & Decode', 'Hidden Words', 'Answer Keys Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5F0FF 0%, #EDE7F6 50%, #D1C4E9 100%)',
      heading: 'Code Addition Worksheet Gallery',
      subheading: 'Professional code-breaking activities ready to print',
      items: [
        { image: { src: img('code addition', 'image_addition_worksheet.webp'), alt: 'Image addition format — professional layout' }, label: 'Image Mode' },
        { image: { src: img('code addition', 'Code Breaker Addition 4.webp'), alt: 'Code breaker format — decode challenge' }, label: 'Code Mode' },
        { image: { src: img('code addition', 'Code Breaker Addition 1 answer_key.webp'), alt: 'Code breaker solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Two Game Modes', 'Full Solutions', 'Classroom Ready'],
      frameColor: '#4A148C',
    },
  },

  // ─── More Less (toolId: more-less) ───
  'more-less': {
    hero: {
      gradient: 'linear-gradient(140deg, #E8EAF6 0%, #C5CAE9 35%, #9FA8DA 70%, #7986CB 100%)',
      accentColor: 'indigo',
      badge: 'Number Sense',
      heading: 'Compare Quantities with Pictures',
      subheading: 'Engaging worksheets that teach greater than, less than, and equal concepts',
      images: [
        { src: img('more less', 'More Less.webp'), alt: 'More or less comparison activity with themed pictures' },
        { src: img('more less', 'More Less (9).webp'), alt: 'Quantity comparison worksheet — visual groups' },
        { src: img('more less', 'More Less (10).webp'), alt: 'More-less-equal practice with colorful images' },
      ],
      pills: [
        { label: 'Visual Comparisons', icon: '⚖' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⟨',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E8EAF6 0%, #F3E5F5 40%, #FFF8E1 100%)',
      badge: 'Skill Progression',
      heading: 'Build Comparison Skills Step by Step',
      subheading: 'From simple more/less to three-way comparisons',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('more less', 'More Less worksheet (1).webp'), alt: 'Easy comparison — identify which group has more' },
          desc: 'Identify which picture group has more (1-5)',
        },
        {
          name: 'Comparer', gradientClass: 'from-indigo-400 to-blue-500', textColorClass: 'text-indigo-700', borderColorClass: 'border-indigo-300', stars: 2,
          image: { src: img('more less', 'More Less worksheet (3).webp'), alt: 'Medium comparison — themed group comparisons' },
          desc: 'Compare themed groups with quantities to 10',
        },
        {
          name: 'Champion', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('more less', 'More Less worksheet (5).webp'), alt: 'Advanced comparison — greater, less, and equal' },
          desc: 'Three-way comparison: more, less, or equal',
        },
      ],
      trophyText: 'Strong comparison skills fuel math success',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E8EAF6 0%, #C5CAE9 50%, #9FA8DA 100%)',
      heading: 'Compare & Learn!',
      tagline: 'Building Number Sense Visually',
      image: { src: img('more less', 'More Less (8).webp'), alt: 'Spotlight more-less worksheet — compare themed picture groups' },
      pills: ['Print & Compare', 'Picture Groups', 'Complete Solutions'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'indigo',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5F5FF 0%, #E8EAF6 50%, #C5CAE9 100%)',
      heading: 'Comparison Worksheet Collection',
      subheading: 'Polished layouts that make quantity comparison intuitive',
      items: [
        { image: { src: img('more less', 'More Less (11).webp'), alt: 'Comparison practice sheet — themed pictures' }, label: 'Practice Sheet' },
        { image: { src: img('more less', 'More Less (12).webp'), alt: 'More-less activity — another themed variation' }, label: 'Activity Page' },
        { image: { src: img('more less', 'More Less answer_key (8).webp'), alt: 'More-less solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Needed', 'Full Solutions', 'Three Comparison Types'],
      frameColor: '#283593',
    },
  },

  // ─── Math Puzzle (toolId: math-puzzle) ───
  'math-puzzle': {
    hero: {
      gradient: 'linear-gradient(145deg, #E0F2F1 0%, #80CBC4 40%, #4DB6AC 70%, #00897B 100%)',
      accentColor: 'teal',
      badge: 'Math & Discovery',
      heading: 'Solve Math Problems, Reveal Hidden Pictures',
      subheading: 'Grid-based puzzles where correct answers unlock animal images',
      images: [
        { src: img('math puzzle', 'Math Puzzles.webp'), alt: 'Math puzzle grid — solve to reveal hidden animal' },
        { src: img('math puzzle', 'Math Puzzles (2).webp'), alt: 'Picture reveal puzzle — themed math grid' },
        { src: img('math puzzle', 'Math Puzzles (5).webp'), alt: 'Advanced math puzzle — complex grid challenge' },
      ],
      pills: [
        { label: 'Hidden Pictures', icon: '🔍' },
        { label: 'Printable Grids', icon: '📄' },
        { label: 'Solution Keys', icon: '✓' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🧩',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F2F1 0%, #E1F5FE 40%, #FFF8E1 100%)',
      badge: 'Puzzle Difficulty',
      heading: 'Grid Puzzles for All Abilities',
      subheading: 'Simple grids to complex challenges in three levels',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('math puzzle', 'Math Puzzles (3).webp'), alt: 'Easy grid puzzle — 3x3 with basic sums' },
          desc: 'Small 3×3 grids with basic addition facts',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('math puzzle', 'Math Puzzles (8).webp'), alt: 'Medium grid puzzle — themed picture reveal' },
          desc: 'Themed grids with mixed math operations',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('math puzzle', 'Math Puzzles (10).webp'), alt: 'Hard grid puzzle — larger numbers and grids' },
          desc: 'Large grids with numbers reaching 20+',
        },
      ],
      trophyText: 'Every solved puzzle reveals something special',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'Reveal the Picture!',
      tagline: 'Math Puzzles That Surprise',
      image: { src: img('math puzzle', 'Math Puzzles (1).webp'), alt: 'Spotlight math puzzle — solve the grid to discover the hidden image' },
      pills: ['Print & Solve', 'Animal Reveals', 'Answer Keys Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFF4 0%, #E0F2F1 50%, #B2DFDB 100%)',
      heading: 'Math Puzzle Showcase',
      subheading: 'Engaging grid puzzles crafted for discovery and practice',
      items: [
        { image: { src: img('math puzzle', 'Math Puzzles (12).webp'), alt: 'Math puzzle practice — themed grid layout' }, label: 'Grid Puzzle' },
        { image: { src: img('math puzzle', 'Math Puzzles (15).webp'), alt: 'Math puzzle variation — different animal theme' }, label: 'Themed Puzzle' },
        { image: { src: img('math puzzle', 'Math Puzzles answer_key (1).webp'), alt: 'Math puzzle solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Zero Prep', 'Full Solutions', 'Animal Themes'],
      frameColor: '#00695C',
    },
  },

  // ─── Math Worksheet (toolId: math-worksheet) ───
  'math-worksheet': {
    hero: {
      gradient: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 35%, #B39DDB 70%, #9575CD 100%)',
      accentColor: 'violet',
      badge: 'Early Algebra',
      heading: 'Animal Picture Equations for Young Minds',
      subheading: 'Visual algebra worksheets where cute animals represent unknown values',
      images: [
        { src: img('math worksheet', 'Math Worksheet 2.webp'), alt: 'Picture algebra — animals as variables in equations' },
        { src: img('math worksheet', 'Math Worksheet 3.webp'), alt: 'Visual equation worksheet — solve for the animal value' },
        { src: img('math worksheet', 'Math Worksheet 8.webp'), alt: 'Advanced picture algebra — multi-step equations' },
      ],
      pills: [
        { label: 'Animal Equations', icon: '🐾' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Full Solutions', icon: '✓' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '=',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #EDE7F6 0%, #E3F2FD 40%, #FFF8E1 100%)',
      badge: 'Algebra Stages',
      heading: 'Visual Algebra from Simple to Advanced',
      subheading: 'Picture equations that grow with each student',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('math worksheet', 'Math Worksheet 4.webp'), alt: 'Simple picture equations — animal values to 5' },
          desc: 'One-step picture equations with values to 5',
        },
        {
          name: 'Explorer', gradientClass: 'from-violet-400 to-purple-500', textColorClass: 'text-violet-700', borderColorClass: 'border-violet-300', stars: 2,
          image: { src: img('math worksheet', 'math worksheet portrait.webp'), alt: 'Medium picture algebra — mixed animal themes' },
          desc: 'Two-variable equations with themed animals',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('math worksheet', 'Math Worksheet 1.webp'), alt: 'Advanced picture algebra — multi-step equations' },
          desc: 'Multi-variable equations with values to 20',
        },
      ],
      trophyText: 'Algebraic thinking starts with pictures',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 50%, #CE93D8 100%)',
      heading: 'Picture Equations!',
      tagline: 'Algebra Through Animal Art',
      image: { src: img('math worksheet', 'Math Worksheet 10.webp'), alt: 'Spotlight math worksheet — adorable animal equations activity' },
      pills: ['Print & Solve', 'Animal Variables', 'Complete Solutions'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'violet',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F8F0FF 0%, #EDE7F6 50%, #D1C4E9 100%)',
      heading: 'Picture Algebra Collection',
      subheading: 'Professional visual equation worksheets ready to print',
      items: [
        { image: { src: img('math worksheet', 'Math Worksheet 12.webp'), alt: 'Picture algebra practice — clean professional layout' }, label: 'Equation Sheet' },
        { image: { src: img('math worksheet', 'Math Worksheet 15.webp'), alt: 'Picture algebra variation — different animal theme' }, label: 'Themed Sheet' },
        { image: { src: img('math worksheet', 'Math Worksheet 1 answer_key.webp'), alt: 'Picture algebra answer key — all solutions' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Needed', 'Full Solutions', 'Multiple Animal Themes'],
      frameColor: '#6A1B9A',
    },
  },

  // ─── Alphabet Train (toolId: alphabet-train) ───
  'alphabet-train': {
    hero: {
      gradient: 'linear-gradient(140deg, #FFFDE7 0%, #FFF9C4 35%, #FFF176 70%, #FFEE58 100%)',
      accentColor: 'yellow',
      badge: 'Letter Recognition',
      heading: 'Cut & Paste Letter Train Activity',
      subheading: 'Hands-on alphabet worksheets where kids build letter trains from A to Z',
      images: [
        { src: img('alphabet train', 'Alphabet Train 2.webp'), alt: 'Alphabet train cut-and-paste activity — letter matching' },
        { src: img('alphabet train', 'Alphabet Train 3.webp'), alt: 'Train-themed letter recognition worksheet' },
        { src: img('alphabet train', 'Alphabet Train 5.webp'), alt: 'Colorful alphabet train — full letter sequence' },
      ],
      pills: [
        { label: 'Cut & Paste', icon: '✂' },
        { label: 'A to Z Coverage', icon: '🔤' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: 'A',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FFFDE7 0%, #FFF8E1 40%, #FFE0B2 100%)',
      badge: 'Letter Stages',
      heading: 'Letter Learning for All Readiness Levels',
      subheading: 'Progressive alphabet activities from first letters to full words',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('alphabet train', 'Alphabet Train 4.webp'), alt: 'Starter alphabet train — uppercase A-M matching' },
          desc: 'Uppercase letter matching for half the alphabet',
        },
        {
          name: 'Builder', gradientClass: 'from-yellow-400 to-amber-500', textColorClass: 'text-yellow-700', borderColorClass: 'border-yellow-300', stars: 2,
          image: { src: img('alphabet train', 'alphabet train portrait.webp'), alt: 'Builder alphabet train — complete A-Z with images' },
          desc: 'Full A-Z train with themed picture clues',
        },
        {
          name: 'Champion', gradientClass: 'from-orange-400 to-red-500', textColorClass: 'text-orange-700', borderColorClass: 'border-orange-300', stars: 3,
          image: { src: img('alphabet train', 'Alphabet Train 8.webp'), alt: 'Champion alphabet train — upper and lowercase pairs' },
          desc: 'Match uppercase and lowercase letter pairs',
        },
      ],
      trophyText: 'Letter by letter, the train rolls to reading',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
      heading: 'All Aboard!',
      tagline: 'The Letter Express',
      image: { src: img('alphabet train', 'Alphabet Train 1.webp'), alt: 'Spotlight alphabet train — hands-on letter recognition activity' },
      pills: ['Print & Cut', 'Train Theme', 'Answer Keys Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFFEF5 0%, #FFFDE7 50%, #FFF9C4 100%)',
      heading: 'Alphabet Train Collection',
      subheading: 'Charming train-themed letter activities for early learners',
      items: [
        { image: { src: img('alphabet train', 'Alphabet Train 10.webp'), alt: 'Alphabet train practice — themed worksheet' }, label: 'Train Activity' },
        { image: { src: img('alphabet train', 'Alphabet Train 12.webp'), alt: 'Alphabet train variation — different letter set' }, label: 'Letter Set' },
        { image: { src: img('alphabet train', 'Alphabet Train 1 answer_key.webp'), alt: 'Alphabet train solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Scissor Practice', 'Full Solutions', 'A-Z Letters'],
      frameColor: '#F57F17',
    },
  },

  // ─── Prepositions (toolId: prepositions) ───
  prepositions: {
    hero: {
      gradient: 'linear-gradient(145deg, #EDE7F6 0%, #D1C4E9 40%, #B39DDB 70%, #9575CD 100%)',
      accentColor: 'violet',
      badge: 'Spatial Vocabulary',
      heading: 'Teach Spatial Words with Picture Scenes',
      subheading: 'Where is the cat? On, under, beside — preposition practice with themed images',
      images: [
        { src: img('prepositions', 'prepositions_worksheet.webp'), alt: 'Prepositions practice — spatial word matching with scenes' },
        { src: img('prepositions', 'prepositions_worksheet (2).webp'), alt: 'Cut-and-paste preposition activity' },
        { src: img('prepositions', 'prepositions_worksheet (5).webp'), alt: 'Themed spatial vocabulary worksheet' },
      ],
      pills: [
        { label: 'Position Words', icon: '📍' },
        { label: 'Themed Scenes', icon: '🖼' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⬆',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #EDE7F6 0%, #E8EAF6 40%, #FFF8E1 100%)',
      badge: 'Language Stages',
      heading: 'Spatial Words for Every Learner',
      subheading: 'Build location vocabulary from basic to complex',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('prepositions', 'prepositions_worksheet (3).webp'), alt: 'Basic prepositions — on, in, under' },
          desc: 'Core position words: on, in, under',
        },
        {
          name: 'Builder', gradientClass: 'from-violet-400 to-purple-500', textColorClass: 'text-violet-700', borderColorClass: 'border-violet-300', stars: 2,
          image: { src: img('prepositions', 'prepositions_worksheet (6).webp'), alt: 'Expanded prepositions — beside, between, behind' },
          desc: 'Expanded vocabulary with themed picture scenes',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('prepositions', 'prepositions_worksheet (10).webp'), alt: 'Complex prepositions — sentences and descriptions' },
          desc: 'Complete sentences describing spatial relationships',
        },
      ],
      trophyText: 'Position words strengthen language and math',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 50%, #CE93D8 100%)',
      heading: 'Where Is It?',
      tagline: 'Location Words Made Visual',
      image: { src: img('prepositions', 'prepositions_worksheet (1).webp'), alt: 'Spotlight prepositions — colorful scene-based spatial word activity' },
      pills: ['Print & Learn', 'Scene-Based', 'Complete Solutions'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'violet',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F8F0FF 0%, #EDE7F6 50%, #D1C4E9 100%)',
      heading: 'Preposition Worksheet Gallery',
      subheading: 'Polished spatial vocabulary activities with themed scenes',
      items: [
        { image: { src: img('prepositions', 'prepositions_worksheet (8).webp'), alt: 'Preposition practice sheet — themed layout' }, label: 'Practice Sheet' },
        { image: { src: img('prepositions', 'prepositions_worksheet (12).webp'), alt: 'Preposition activity — different scene theme' }, label: 'Scene Activity' },
        { image: { src: img('prepositions', 'prepositions_answer_key (1).webp'), alt: 'Preposition answer key — all solutions' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Cut & Paste Ready', 'Full Solutions', 'Themed Scenes'],
      frameColor: '#512DA8',
    },
  },

  // ─── Word Guess (toolId: word-guess) ───
  'word-guess': {
    hero: {
      gradient: 'linear-gradient(150deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%)',
      accentColor: 'purple',
      badge: 'Vocabulary Builder',
      heading: 'Fill in Missing Letters with Picture Clues',
      subheading: 'Word guess puzzles where images reveal the answer before letters do',
      images: [
        { src: img('word guess', 'clue-grid_worksheet.webp'), alt: 'Word guess puzzle — fill in missing letters from picture clues' },
        { src: img('word guess', 'clue-grid_worksheet (2).webp'), alt: 'Picture clue word activity — themed vocabulary' },
        { src: img('word guess', 'custom word list.webp'), alt: 'Custom word guess — personalized vocabulary lists' },
      ],
      pills: [
        { label: 'Picture Hints', icon: '🖼' },
        { label: 'Custom Word Lists', icon: '📝' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '?',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 40%, #FFF8E1 100%)',
      badge: 'Vocabulary Levels',
      heading: 'Word Challenges for Growing Readers',
      subheading: 'From short words to custom vocabulary lists',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('word guess', 'clue-grid_worksheet (3).webp'), alt: 'Easy word guess — 3-letter words with picture hints' },
          desc: 'Short 3-4 letter words with clear picture hints',
        },
        {
          name: 'Detective', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('word guess', 'clue-grid_worksheet (4).webp'), alt: 'Medium word guess — themed vocabulary with multiple blanks' },
          desc: 'Themed words with two or more missing letters',
        },
        {
          name: 'Genius', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('word guess', 'clue-grid_worksheet (1).webp'), alt: 'Hard word guess — longer words and custom lists' },
          desc: 'Longer words with custom vocabulary lists',
        },
      ],
      trophyText: 'Every word guessed strengthens reading skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #CE93D8 50%, #BA68C8 100%)',
      heading: 'Guess the Word!',
      tagline: 'Pictures Tell the Story',
      image: { src: img('word guess', 'landscape.webp'), alt: 'Spotlight word guess — vibrant picture-clue vocabulary challenge' },
      pills: ['Print & Guess', 'Visual Clues', 'Solutions Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FBF5FF 0%, #F3E5F5 50%, #E1BEE7 100%)',
      heading: 'Word Guess Puzzle Gallery',
      subheading: 'Professional vocabulary worksheets with picture-clue grids',
      items: [
        { image: { src: img('word guess', 'clue-grid_worksheet.webp'), alt: 'Word guess practice — clue grid format' }, label: 'Clue Grid' },
        { image: { src: img('word guess', 'clue-grid_worksheet (2).webp'), alt: 'Word guess variation — different theme' }, label: 'Themed Puzzle' },
        { image: { src: img('word guess', 'clue-grid_answer-key (1).webp'), alt: 'Word guess solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Custom Lists', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#7B1FA2',
    },
  },

  // ─── Word Scramble (toolId: word-scramble) ───
  'word-scramble': {
    hero: {
      gradient: 'linear-gradient(140deg, #E0F2F1 0%, #B2DFDB 35%, #80CBC4 70%, #4DB6AC 100%)',
      accentColor: 'teal',
      badge: 'Spelling Practice',
      heading: 'Unscramble Letters to Spell the Picture',
      subheading: 'Themed word scramble worksheets that reinforce spelling through visual clues',
      images: [
        { src: img('word scramble', 'Word Scramble 1.webp'), alt: 'Word scramble activity — rearrange letters with picture clues' },
        { src: img('word scramble', 'Word Scramble 3.webp'), alt: 'Themed word unscramble — spelling practice' },
        { src: img('word scramble', 'Word Scramble 8.webp'), alt: 'Advanced word scramble — longer words challenge' },
      ],
      pills: [
        { label: 'Letter Rearranging', icon: '🔤' },
        { label: 'Picture Clues', icon: '🖼' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🔤',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F2F1 0%, #E0F7FA 40%, #FFF8E1 100%)',
      badge: 'Spelling Stages',
      heading: 'Scramble Challenges for Every Speller',
      subheading: 'Short words to long phrases in three levels',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('word scramble', 'Word Scramble 4.webp'), alt: 'Easy word scramble — 3-4 letter words' },
          desc: 'Short 3-4 letter words with picture hints',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('word scramble', 'word scramble portrait.webp'), alt: 'Medium word scramble — themed 5-6 letter words' },
          desc: 'Themed 5-6 letter words with visual cues',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('word scramble', 'Word Scramble 2.webp'), alt: 'Hard word scramble — long words and custom lists' },
          desc: 'Longer words and custom vocabulary lists',
        },
      ],
      trophyText: 'Unscrambling words builds spelling mastery',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'Unscramble & Spell!',
      tagline: 'Spelling Through Puzzles',
      image: { src: img('word scramble', 'Word Scramble 10.webp'), alt: 'Spotlight word scramble — colorful themed spelling activity' },
      pills: ['Print & Unscramble', 'Visual Clues', 'Answer Keys Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFFE 0%, #E0F2F1 50%, #B2DFDB 100%)',
      heading: 'Word Scramble Collection',
      subheading: 'Professional spelling activities with themed picture clues',
      items: [
        { image: { src: img('word scramble', 'Word Scramble 12.webp'), alt: 'Word scramble practice — themed layout' }, label: 'Scramble Sheet' },
        { image: { src: img('word scramble', 'Word Scramble 15.webp'), alt: 'Word scramble variation — different theme' }, label: 'Themed Activity' },
        { image: { src: img('word scramble', 'Word Scramble 1 answer-key.webp'), alt: 'Word scramble answer key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Custom Lists', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#00796B',
    },
  },

  // ─── Word Search (toolId: word-search) ───
  'word-search': {
    hero: {
      gradient: 'linear-gradient(145deg, #3F51B5 0%, #303F9F 50%, #283593 100%)',
      accentColor: 'indigo',
      badge: 'Word Puzzles',
      heading: 'Picture-Clue Word Search Grids',
      subheading: 'Find hidden words in themed grids using image hints instead of word lists',
      images: [
        { src: img('wordsearch', 'Word Search 2.webp'), alt: 'Word search grid with picture clues — themed vocabulary' },
        { src: img('wordsearch', 'Word Search 3.webp'), alt: 'Picture-based word search — hidden word puzzle' },
        { src: img('wordsearch', 'Word Search 6.webp'), alt: 'Advanced word search — large grid challenge' },
      ],
      pills: [
        { label: 'Image Hints', icon: '🔍' },
        { label: 'Themed Grids', icon: '🧩' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⬡',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E8EAF6 0%, #C5CAE9 40%, #FFF8E1 100%)',
      badge: 'Grid Levels',
      heading: 'Word Search for Every Reader',
      subheading: 'Small grids to large puzzles across three levels',
      tiers: [
        {
          name: 'Seeker', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('wordsearch', 'Word Search 4.webp'), alt: 'Easy word search — small grid with simple words' },
          desc: 'Small grids with short themed words',
        },
        {
          name: 'Hunter', gradientClass: 'from-indigo-400 to-blue-500', textColorClass: 'text-indigo-700', borderColorClass: 'border-indigo-300', stars: 2,
          image: { src: img('wordsearch', 'wordsearch portrait.webp'), alt: 'Medium word search — diagonal and themed' },
          desc: 'Themed puzzles with diagonal hidden words',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('wordsearch', 'Word Search 8.webp'), alt: 'Hard word search — large grid all directions' },
          desc: 'Large grids with words hidden in all directions',
        },
      ],
      trophyText: 'Word searching builds focus and vocabulary',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E8EAF6 0%, #C5CAE9 50%, #9FA8DA 100%)',
      heading: 'Find Every Word!',
      tagline: 'Hidden Words Await',
      image: { src: img('wordsearch', 'Word Search 1.webp'), alt: 'Spotlight word search — vibrant themed grid puzzle' },
      pills: ['Print & Search', 'Picture Hints', 'Solutions Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'indigo',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5F5FF 0%, #E8EAF6 50%, #C5CAE9 100%)',
      heading: 'Word Search Puzzle Gallery',
      subheading: 'Professional grid puzzles with themed image vocabulary',
      items: [
        { image: { src: img('wordsearch', 'Word Search 10.webp'), alt: 'Word search practice — themed grid layout' }, label: 'Grid Puzzle' },
        { image: { src: img('wordsearch', 'Word Search 12.webp'), alt: 'Word search variation — different theme' }, label: 'Themed Grid' },
        { image: { src: img('wordsearch', 'Word Search 1 answer_key.webp'), alt: 'Word search solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#1A237E',
    },
  },

  // ─── Cryptogram (toolId: cryptogram) ───
  cryptogram: {
    hero: {
      gradient: 'linear-gradient(150deg, #4A148C 0%, #6A1B9A 40%, #8E24AA 100%)',
      accentColor: 'purple',
      badge: 'Code Puzzles',
      heading: 'Picture-to-Letter Cipher Worksheets',
      subheading: 'Decode secret messages where each picture represents a letter of the alphabet',
      images: [
        { src: img('cryptogram', 'cryptogram_worksheet.webp'), alt: 'Cryptogram cipher puzzle — decode pictures to letters' },
        { src: img('cryptogram', 'cryptogram_worksheet (1).webp'), alt: 'Themed cipher activity — picture code worksheet' },
        { src: img('cryptogram', 'cryptogram_worksheet (8).webp'), alt: 'Advanced cryptogram — complex picture cipher' },
      ],
      pills: [
        { label: 'Picture Ciphers', icon: '🔐' },
        { label: 'Secret Messages', icon: '🔑' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🔑',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 40%, #FFF8E1 100%)',
      badge: 'Cipher Levels',
      heading: 'Code Puzzles for All Ages',
      subheading: 'From simple substitutions to full sentence decoding',
      tiers: [
        {
          name: 'Novice', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('cryptogram', 'cryptogram_worksheet (3).webp'), alt: 'Easy cryptogram — simple picture substitution codes' },
          desc: 'Short words with straightforward picture codes',
        },
        {
          name: 'Decoder', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('cryptogram', 'cryptogram_worksheet (6).webp'), alt: 'Medium cryptogram — themed phrase decoding' },
          desc: 'Themed phrases with mixed cipher symbols',
        },
        {
          name: 'Cipher Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('cryptogram', 'cryptogram_worksheet (10).webp'), alt: 'Hard cryptogram — full sentence cipher challenges' },
          desc: 'Full sentences with complex picture codes',
        },
      ],
      trophyText: 'Decoding builds critical thinking and focus',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #EDE7F6 0%, #D1C4E9 50%, #B39DDB 100%)',
      heading: 'Decode the Message!',
      tagline: 'Picture Cipher Challenge',
      image: { src: img('cryptogram', 'cryptogram_worksheet (2).webp'), alt: 'Spotlight cryptogram — engaging picture cipher puzzle' },
      pills: ['Print & Decode', 'Themed Ciphers', 'Complete Solutions'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FBF5FF 0%, #F3E5F5 50%, #E1BEE7 100%)',
      heading: 'Cryptogram Puzzle Gallery',
      subheading: 'Professional cipher activities designed for young code breakers',
      items: [
        { image: { src: img('cryptogram', 'cryptogram_worksheet (12).webp'), alt: 'Cryptogram practice — professional layout' }, label: 'Cipher Sheet' },
        { image: { src: img('cryptogram', 'cryptogram_worksheet (15).webp'), alt: 'Cryptogram variation — different theme' }, label: 'Themed Cipher' },
        { image: { src: img('cryptogram', 'cryptogram_answer_key (1).webp'), alt: 'Cryptogram solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#4A148C',
    },
  },

  // ─── Writing (toolId: writing) ───
  writing: {
    hero: {
      gradient: 'linear-gradient(170deg, #E8F5E9 0%, #C8E6C9 40%, #A5D6A7 70%, #81C784 100%)',
      accentColor: 'green',
      badge: 'Handwriting Practice',
      heading: 'Guided Letter Tracing Worksheets',
      subheading: 'Dotted-line letter practice that builds proper letter formation from the start',
      images: [
        { src: img('writing', 'writing.webp'), alt: 'Letter tracing worksheet — guided handwriting practice' },
        { src: img('writing', 'writing beginning letter.webp'), alt: 'Beginning letter writing — first letter practice' },
        { src: img('writing', 'writing custom.webp'), alt: 'Custom writing worksheet — personalized words and letters' },
      ],
      pills: [
        { label: 'Guided Tracing', icon: '✏' },
        { label: 'Custom Content', icon: '📝' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '✏',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E8F5E9 0%, #F1F8E9 40%, #FFF8E1 100%)',
      badge: 'Writing Stages',
      heading: 'Handwriting for Every Level',
      subheading: 'From first traces to independent writing',
      tiers: [
        {
          name: 'Tracer', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('writing', 'writing.webp'), alt: 'Tracer level — dotted letter guides for beginners' },
          desc: 'Dotted-line tracing with large letter guides',
        },
        {
          name: 'Writer', gradientClass: 'from-lime-400 to-green-500', textColorClass: 'text-lime-700', borderColorClass: 'border-lime-300', stars: 2,
          image: { src: img('writing', 'writing beginning letter.webp'), alt: 'Writer level — beginning letter with guidelines' },
          desc: 'Beginning letter practice on ruled guidelines',
        },
        {
          name: 'Author', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('writing', 'writing custom.webp'), alt: 'Author level — independent writing with custom words' },
          desc: 'Independent writing with custom words and sentences',
        },
      ],
      trophyText: 'Practice builds confident handwriting',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
      heading: 'Trace & Write!',
      tagline: 'Handwriting Made Easy',
      image: { src: img('writing', 'writing beginning letter.webp'), alt: 'Spotlight writing — guided letter formation activity' },
      pills: ['Print & Trace', 'Guided Letters', 'No Prep Needed'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'green',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5FFF5 0%, #E8F5E9 50%, #C8E6C9 100%)',
      heading: 'Handwriting Worksheet Gallery',
      subheading: 'Clean, professional letter practice sheets for young writers',
      items: [
        { image: { src: img('writing', 'writing.webp'), alt: 'Letter tracing sheet — full alphabet practice' }, label: 'Tracing Sheet' },
        { image: { src: img('writing', 'writing beginning letter.webp'), alt: 'Beginning letter sheet — first letter practice' }, label: 'First Letters' },
        { image: { src: img('writing', 'writing custom.webp'), alt: 'Custom writing sheet — personalized content' }, label: 'Custom Words' },
      ],
      pills: ['Instant Download', 'Multiple Formats', 'A-Z Coverage', 'Custom Content'],
      frameColor: '#2E7D32',
    },
  },

  // ─── Big Small (toolId: big-small) ───
  'big-small': {
    hero: {
      gradient: 'linear-gradient(140deg, #E3F2FD 0%, #BBDEFB 35%, #90CAF9 70%, #64B5F6 100%)',
      accentColor: 'sky',
      badge: 'Size Concepts',
      heading: 'Sort Pictures by Size — Big vs. Small',
      subheading: 'Visual size comparison worksheets with adorable themed images',
      images: [
        { src: img('big small', 'big-small identical images.webp'), alt: 'Size comparison worksheet — same images in different sizes' },
        { src: img('big small', 'big-small-different images.webp'), alt: 'Size sorting activity — compare different themed images' },
        { src: img('big small', 'big-small number 1-2-3.webp'), alt: 'Size ordering worksheet — rank from smallest to biggest' },
      ],
      pills: [
        { label: 'Size Sorting', icon: '📏' },
        { label: 'Three Modes', icon: '🔢' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '◯',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E3F2FD 0%, #E8F5E9 40%, #FFF8E1 100%)',
      badge: 'Activity Modes',
      heading: 'Three Ways to Practice Size',
      subheading: 'Identical pictures, different images, and numbered ordering',
      tiers: [
        {
          name: 'Identical', gradientClass: 'from-sky-400 to-blue-500', textColorClass: 'text-sky-700', borderColorClass: 'border-sky-300', stars: 1,
          image: { src: img('big small', 'big-small-worksheet_worksheet.webp'), alt: 'Identical images mode — spot the bigger picture' },
          desc: 'Same picture in two sizes — circle the big one',
        },
        {
          name: 'Different', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 2,
          image: { src: img('big small', 'big-small-worksheet_worksheet (5).webp'), alt: 'Different images mode — compare different pictures' },
          desc: 'Two different images — identify which is larger',
        },
        {
          name: 'Numbered', gradientClass: 'from-rose-400 to-pink-500', textColorClass: 'text-rose-700', borderColorClass: 'border-rose-300', stars: 3,
          image: { src: img('big small', 'big-small-worksheet_worksheet (10).webp'), alt: 'Numbered ordering — rank three items by size' },
          desc: 'Order three images: 1 (smallest) to 3 (biggest)',
        },
      ],
      trophyText: 'Size comparison lays the groundwork for measurement',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
      heading: 'Big or Small?',
      tagline: 'Size Sorting Fun',
      image: { src: img('big small', 'big-small-worksheet_worksheet (15).webp'), alt: 'Spotlight big-small — adorable themed size comparison activity' },
      pills: ['Print & Sort', 'Cute Pictures', 'Answer Keys Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'sky',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5FAFF 0%, #E3F2FD 50%, #BBDEFB 100%)',
      heading: 'Size Comparison Collection',
      subheading: 'Professional worksheets for early measurement concepts',
      items: [
        { image: { src: img('big small', 'big-small-worksheet_worksheet (20).webp'), alt: 'Size comparison practice — themed layout' }, label: 'Size Sort' },
        { image: { src: img('big small', 'big-small-worksheet_worksheet (25).webp'), alt: 'Size comparison variation — different theme' }, label: 'Compare' },
        { image: { src: img('big small', 'big-small-worksheet_answer_key (1).webp'), alt: 'Big-small answer key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Three Activity Types'],
      frameColor: '#0277BD',
    },
  },

  // ─── Pattern Train (toolId: pattern-train) ───
  'pattern-train': {
    hero: {
      gradient: 'linear-gradient(140deg, #FFF8E1 0%, #FFE082 35%, #FFD54F 70%, #FFCA28 100%)',
      accentColor: 'amber',
      badge: 'Pattern Skills',
      heading: 'Complete Pattern Sequences on a Train',
      subheading: 'Cut-and-paste pattern activities with a charming train theme',
      images: [
        { src: img('pattern train', 'pattern_train_worksheet.webp'), alt: 'Pattern train worksheet — complete the sequence in train cars' },
        { src: img('pattern train', 'pattern_train_worksheet (2).webp'), alt: 'Train-themed pattern activity — cut and paste' },
        { src: img('pattern train', 'pattern_train_worksheet (5).webp'), alt: 'Pattern train — multi-element sequence challenge' },
      ],
      pills: [
        { label: 'Cut & Paste', icon: '✂' },
        { label: 'Train Theme', icon: '🚂' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🚂',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 40%, #FFE0B2 100%)',
      badge: 'Sequence Levels',
      heading: 'Pattern Trains for Every Level',
      subheading: 'From simple AB patterns to complex sequences',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('pattern train', 'pattern_train_worksheet (3).webp'), alt: 'Easy pattern train — simple AB repeating patterns' },
          desc: 'Simple AB repeating pattern sequences',
        },
        {
          name: 'Builder', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('pattern train', 'pattern_train_worksheet (8).webp'), alt: 'Medium pattern train — ABC and ABB patterns' },
          desc: 'ABC and ABB patterns with themed images',
        },
        {
          name: 'Master', gradientClass: 'from-red-400 to-rose-500', textColorClass: 'text-red-700', borderColorClass: 'border-red-300', stars: 3,
          image: { src: img('pattern train', 'pattern_train_worksheet (15).webp'), alt: 'Hard pattern train — complex multi-element patterns' },
          desc: 'Complex multi-element pattern sequences',
        },
      ],
      trophyText: 'Recognizing patterns powers logical thinking',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFFDE7 0%, #FFF9C4 50%, #FFF176 100%)',
      heading: 'Pattern Express!',
      tagline: 'Sequence Skills on Track',
      image: { src: img('pattern train', 'pattern_train_worksheet (1).webp'), alt: 'Spotlight pattern train — colorful cut-and-paste sequence activity' },
      pills: ['Print & Paste', 'Train Cars', 'Solutions Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E1 50%, #FFECB3 100%)',
      heading: 'Pattern Train Collection',
      subheading: 'Charming train-themed worksheets for sequence practice',
      items: [
        { image: { src: img('pattern train', 'pattern_train_worksheet (10).webp'), alt: 'Pattern train practice — themed layout' }, label: 'Train Activity' },
        { image: { src: img('pattern train', 'pattern_train_worksheet (18).webp'), alt: 'Pattern train variation — different pattern type' }, label: 'Sequence Sheet' },
        { image: { src: img('pattern train', 'pattern_train_answer_key (1).webp'), alt: 'Pattern train solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Scissor Practice', 'Full Solutions', 'Multiple Patterns'],
      frameColor: '#E65100',
    },
  },

  // ─── Pattern Worksheet (toolId: pattern-worksheet) ───
  'pattern-worksheet': {
    hero: {
      gradient: 'linear-gradient(150deg, #7B1FA2 0%, #6A1B9A 50%, #4A148C 100%)',
      accentColor: 'purple',
      badge: 'Logical Thinking',
      heading: 'Visual Pattern Sequence Worksheets',
      subheading: 'Identify and complete shape and image patterns with printable activities',
      images: [
        { src: img('pattern worksheet', 'pattern_worksheet.webp'), alt: 'Pattern sequence worksheet — identify the next shape' },
        { src: img('pattern worksheet', 'pattern_worksheet (1).webp'), alt: 'Visual pattern activity — complete the sequence' },
        { src: img('pattern worksheet', 'pattern_worksheet (5).webp'), alt: 'Pattern challenge — multi-element sequences' },
      ],
      pills: [
        { label: 'Shape Patterns', icon: '◆' },
        { label: 'Color Sequences', icon: '🎨' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '◆',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #F3E5F5 0%, #E1BEE7 40%, #FFF8E1 100%)',
      badge: 'Pattern Complexity',
      heading: 'Sequence Challenges for All Levels',
      subheading: 'Simple repeats to complex multi-element patterns',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('pattern worksheet', 'pattern_worksheet (3).webp'), alt: 'Easy patterns — simple shape repetitions' },
          desc: 'Simple repeating shape patterns (AB, AABB)',
        },
        {
          name: 'Builder', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('pattern worksheet', 'pattern_worksheet (8).webp'), alt: 'Medium patterns — color and shape combos' },
          desc: 'Color-shape combinations with growing complexity',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('pattern worksheet', 'pattern_worksheet (15).webp'), alt: 'Hard patterns — multi-attribute sequences' },
          desc: 'Multi-attribute patterns with rotation and size',
        },
      ],
      trophyText: 'Pattern mastery fuels mathematical reasoning',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #EDE7F6 0%, #D1C4E9 50%, #B39DDB 100%)',
      heading: 'Spot the Pattern!',
      tagline: 'Sequences Made Visual',
      image: { src: img('pattern worksheet', 'pattern_worksheet (2).webp'), alt: 'Spotlight pattern worksheet — vibrant sequence completion activity' },
      pills: ['Print & Complete', 'Visual Sequences', 'Solutions Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FBF5FF 0%, #F3E5F5 50%, #E1BEE7 100%)',
      heading: 'Pattern Worksheet Gallery',
      subheading: 'Professional sequence activities for focused practice',
      items: [
        { image: { src: img('pattern worksheet', 'pattern_worksheet (10).webp'), alt: 'Pattern practice — professional layout' }, label: 'Sequence Sheet' },
        { image: { src: img('pattern worksheet', 'pattern_worksheet (12).webp'), alt: 'Pattern variation — different element types' }, label: 'Pattern Activity' },
        { image: { src: img('pattern worksheet', 'pattern_answer_key (1).webp'), alt: 'Pattern worksheet solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Levels'],
      frameColor: '#6A1B9A',
    },
  },

  // ─── Draw and Color (toolId: draw-and-color) ───
  'draw-and-color': {
    hero: {
      gradient: 'linear-gradient(160deg, #E0F2F1 0%, #B2DFDB 40%, #80CBC4 70%, #4DB6AC 100%)',
      accentColor: 'emerald',
      badge: 'Art & Motor Skills',
      heading: 'Grid Drawing Worksheets for All Ages',
      subheading: 'Copy pictures square by square with the guided grid method',
      images: [
        { src: img('draw and color', 'grid-drawing_worksheet.webp'), alt: 'Grid drawing activity — copy animal art square by square' },
        { src: img('draw and color', 'grid-drawing_worksheet (1).webp'), alt: 'Grid art worksheet — themed picture to copy' },
        { src: img('draw and color', 'grid-drawing_worksheet (8).webp'), alt: 'Grid drawing challenge — detailed animal art' },
      ],
      pills: [
        { label: 'Grid Method', icon: '📐' },
        { label: 'Animal Art', icon: '🐾' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🎨',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F2F1 0%, #E8F5E9 40%, #FFF8E1 100%)',
      badge: 'Drawing Levels',
      heading: 'Grid Art for Every Skill',
      subheading: 'Large squares for beginners, fine grids for advanced artists',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('draw and color', 'grid-drawing_worksheet (5).webp'), alt: 'Easy grid drawing — large squares, simple shapes' },
          desc: 'Large grid squares with simple shapes to copy',
        },
        {
          name: 'Artist', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('draw and color', 'grid-drawing_worksheet (10).webp'), alt: 'Medium grid drawing — animal pictures with detail' },
          desc: 'Animal pictures with medium grid detail',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('draw and color', 'grid-drawing_worksheet (20).webp'), alt: 'Advanced grid drawing — fine detail artwork' },
          desc: 'Fine grid work with detailed artwork',
        },
      ],
      trophyText: 'Grid drawing sharpens observation and motor skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'Copy & Create!',
      tagline: 'Grid Art Adventures',
      image: { src: img('draw and color', 'grid-drawing_worksheet (2).webp'), alt: 'Spotlight grid drawing — adorable animal to copy square by square' },
      pills: ['Print & Draw', 'Cute Animals', 'No Prep Needed'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'emerald',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFFE 0%, #E0F2F1 50%, #B2DFDB 100%)',
      heading: 'Grid Drawing Gallery',
      subheading: 'Professional art worksheets with the grid copy method',
      items: [
        { image: { src: img('draw and color', 'grid-drawing_worksheet (15).webp'), alt: 'Grid drawing practice — professional layout' }, label: 'Grid Art' },
        { image: { src: img('draw and color', 'grid-drawing_worksheet (25).webp'), alt: 'Grid drawing variation — different animal' }, label: 'Animal Art' },
        { image: { src: img('draw and color', 'grid-drawing_worksheet (30).webp'), alt: 'Grid drawing — detailed challenge' }, label: 'Challenge' },
      ],
      pills: ['Instant Download', 'Grid Method', 'Multiple Animals', 'All Skill Levels'],
      frameColor: '#00695C',
    },
  },

  // ─── Drawing Lines (toolId: drawing-lines) ───
  'drawing-lines': {
    hero: {
      gradient: 'linear-gradient(145deg, #FFF0F5 0%, #FCE4EC 40%, #F8BBD0 70%, #F48FB1 100%)',
      accentColor: 'rose',
      badge: 'Pre-Writing Skills',
      heading: 'Guided Line Tracing for Pre-Writers',
      subheading: 'Build fine motor control with straight, diagonal, and curved line practice',
      images: [
        { src: img('drawing lines', 'drawing_lines_horizontal.webp'), alt: 'Horizontal line tracing — guided fine motor practice' },
        { src: img('drawing lines', 'drawing_lines_vertical.webp'), alt: 'Vertical line drawing — pre-writing preparation' },
        { src: img('drawing lines', 'drawing_lines_curve 1.webp'), alt: 'Curved line tracing — build pencil control' },
      ],
      pills: [
        { label: 'Fine Motor Control', icon: '✏' },
        { label: 'Multiple Line Types', icon: '〰' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '〰',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FCE4EC 0%, #FFF0F5 40%, #FFF8E1 100%)',
      badge: 'Motor Skill Stages',
      heading: 'Line Practice from Simple to Complex',
      subheading: 'Straight paths, diagonals, and smooth curves',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('drawing lines', 'drawing_lines_worksheet (1).webp'), alt: 'Easy line tracing — horizontal and vertical guides' },
          desc: 'Guided straight lines: horizontal and vertical',
        },
        {
          name: 'Tracer', gradientClass: 'from-rose-400 to-pink-500', textColorClass: 'text-rose-700', borderColorClass: 'border-rose-300', stars: 2,
          image: { src: img('drawing lines', 'drawing_lines_diagonal 1.webp'), alt: 'Medium line practice — diagonal and zigzag paths' },
          desc: 'Diagonal lines and simple zigzag paths',
        },
        {
          name: 'Artist', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('drawing lines', 'drawing_lines_curve 2.webp'), alt: 'Advanced line drawing — curves, waves, and spirals' },
          desc: 'Smooth curves, wavy lines, and spiral paths',
        },
      ],
      trophyText: 'Line skills pave the way to confident writing',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF0F5 0%, #FCE4EC 50%, #F8BBD0 100%)',
      heading: 'Follow the Path!',
      tagline: 'Pre-Writing Line Practice',
      image: { src: img('drawing lines', 'drawing_lines_curve 3.webp'), alt: 'Spotlight line drawing — guided curve tracing with cute pictures' },
      pills: ['Print & Trace', 'Guided Paths', 'Cute Characters'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'rose',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFF8FA 0%, #FCE4EC 50%, #F8BBD0 100%)',
      heading: 'Line Tracing Worksheet Gallery',
      subheading: 'Professional pre-writing activities with guided paths',
      items: [
        { image: { src: img('drawing lines', 'drawing_lines_worksheet (5).webp'), alt: 'Line drawing practice — professional layout' }, label: 'Line Practice' },
        { image: { src: img('drawing lines', 'drawing_lines_worksheet (15).webp'), alt: 'Line tracing variation — different path types' }, label: 'Path Tracing' },
        { image: { src: img('drawing lines', 'Line Drawing Practic.webp'), alt: 'Line drawing practice sheet overview' }, label: 'Practice Sheet' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Multiple Line Types', 'Animal Characters'],
      frameColor: '#C2185B',
    },
  },

  // ─── Coloring (toolId: coloring) ───
  coloring: {
    hero: {
      gradient: 'linear-gradient(150deg, #FF7043 0%, #FF5722 40%, #F4511E 70%, #E64A19 100%)',
      accentColor: 'red',
      badge: 'Creative Activities',
      heading: 'Printable Coloring Pages for All Ages',
      subheading: 'Beautiful illustrations from simple outlines to intricate scenes — ready to print and color',
      images: [
        { src: img('coloring', 'coloring portrait 1.webp'), alt: 'Coloring page — detailed themed illustration ready to color' },
        { src: img('coloring', 'coloring portrait 2.webp'), alt: 'Printable coloring sheet — creative art activity' },
        { src: img('coloring', 'coloring portrait 3.webp'), alt: 'Coloring activity — fun scene for all ages' },
      ],
      pills: [
        { label: 'Themed Scenes', icon: '🎨' },
        { label: 'All Ages', icon: '👨‍👩‍👧' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🖍',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FBE9E7 0%, #FFF3E0 40%, #F3E5F5 100%)',
      badge: 'Detail Levels',
      heading: 'Coloring Complexity for Every Age',
      subheading: 'Bold outlines for little hands, fine detail for older artists',
      tiers: [
        {
          name: 'Simple', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('coloring', 'coloring portrait 4.webp'), alt: 'Simple coloring — bold outlines for young artists' },
          desc: 'Bold outlines ideal for young artists',
        },
        {
          name: 'Detailed', gradientClass: 'from-orange-400 to-red-500', textColorClass: 'text-orange-700', borderColorClass: 'border-orange-300', stars: 2,
          image: { src: img('coloring', 'coloring portrait 5.webp'), alt: 'Detailed coloring — moderate complexity scenes' },
          desc: 'Themed scenes with moderate detail',
        },
        {
          name: 'Intricate', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 3,
          image: { src: img('coloring', 'coloring landscape 1.webp'), alt: 'Intricate coloring — complex landscape scenes' },
          desc: 'Complex landscapes for experienced colorists',
        },
      ],
      trophyText: 'Coloring develops focus, creativity, and motor skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)',
      heading: 'Color It In!',
      tagline: 'Art Without Limits',
      image: { src: img('coloring', 'coloring portrait 6.webp'), alt: 'Spotlight coloring page — beautiful themed illustration to color' },
      pills: ['Print & Color', 'Multiple Themes', 'No Prep Needed'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'orange',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFF8F0 0%, #FFF3E0 50%, #FFE0B2 100%)',
      heading: 'Coloring Page Gallery',
      subheading: 'Beautiful print-ready illustrations for creative sessions',
      items: [
        { image: { src: img('coloring', 'coloring landscape 2.webp'), alt: 'Coloring landscape — scenic outdoor illustration' }, label: 'Landscape' },
        { image: { src: img('coloring', 'coloring landscape 3.webp'), alt: 'Coloring scene — themed nature artwork' }, label: 'Nature Scene' },
        { image: { src: img('coloring', 'coloring portrait 1.webp'), alt: 'Coloring portrait — character illustration' }, label: 'Portrait' },
      ],
      pills: ['Instant Download', 'Multiple Styles', 'All Skill Levels', 'Themed Variety'],
      frameColor: '#BF360C',
    },
  },

  // ─── Chart Count (toolId: chart-count) ───
  'chart-count': {
    hero: {
      gradient: 'linear-gradient(140deg, #FFF8E1 0%, #FFE082 35%, #FFD54F 70%, #FFC107 100%)',
      accentColor: 'amber',
      badge: 'Data & Graphing',
      heading: 'Picture Graph Worksheets for Young Data Scientists',
      subheading: 'Count themed images, build bar graphs, and answer data questions',
      images: [
        { src: img('chart count', 'Picture Graph 1.webp'), alt: 'Picture graph worksheet — count images and build a chart' },
        { src: img('chart count', 'Picture Graph 3.webp'), alt: 'Themed data graphing — visual counting activity' },
        { src: img('chart count', 'Picture Graph 8.webp'), alt: 'Picture graph challenge — data analysis questions' },
      ],
      pills: [
        { label: 'Picture Graphs', icon: '📊' },
        { label: 'Data Questions', icon: '❓' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '📊',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #E3F2FD 40%, #FFF3E0 100%)',
      badge: 'Data Stages',
      heading: 'Graphing Skills for Every Level',
      subheading: 'From counting pictures to analyzing data trends',
      tiers: [
        {
          name: 'Counter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('chart count', 'chart count.webp'), alt: 'Easy graphing — count pictures and fill the chart' },
          desc: 'Count themed pictures and fill in the chart',
        },
        {
          name: 'Grapher', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('chart count', 'Picture Graph 5.webp'), alt: 'Medium graphing — build themed picture graphs' },
          desc: 'Build themed picture graphs from data sets',
        },
        {
          name: 'Analyst', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 3,
          image: { src: img('chart count', 'Picture Graph 10.webp'), alt: 'Advanced graphing — answer data analysis questions' },
          desc: 'Analyze graphs and answer data questions',
        },
      ],
      trophyText: 'Data literacy starts with picture graphs',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
      heading: 'Graph It!',
      tagline: 'Data Skills Made Visual',
      image: { src: img('chart count', 'Picture Graph 2.webp'), alt: 'Spotlight picture graph — colorful themed counting and graphing activity' },
      pills: ['Print & Graph', 'Themed Data', 'Solutions Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E1 50%, #FFECB3 100%)',
      heading: 'Picture Graph Collection',
      subheading: 'Professional data worksheets for early graphing practice',
      items: [
        { image: { src: img('chart count', 'Picture Graph 12.webp'), alt: 'Picture graph practice — themed layout' }, label: 'Graph Sheet' },
        { image: { src: img('chart count', 'Picture Graph 15.webp'), alt: 'Picture graph variation — different data theme' }, label: 'Data Activity' },
        { image: { src: img('chart count', 'Picture Graph 1 answer_key.webp'), alt: 'Picture graph answer key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#E65100',
    },
  },

  // ─── Matching (toolId: matching) ───
  matching: {
    hero: {
      gradient: 'linear-gradient(140deg, #FFF3E0 0%, #FFCCBC 35%, #FF8A65 70%, #FF7043 100%)',
      accentColor: 'orange',
      badge: 'Vocabulary & Matching',
      heading: 'Connect Pictures to Words with Lines',
      subheading: 'Draw-the-line matching worksheets that build visual vocabulary',
      images: [
        { src: img('matching', 'Match Up 1.webp'), alt: 'Matching worksheet — draw lines from pictures to words' },
        { src: img('matching', 'Match Up 3.webp'), alt: 'Image-word matching — themed vocabulary activity' },
        { src: img('matching', 'Match Up 5.webp'), alt: 'Matching challenge — connect themed images to labels' },
      ],
      pills: [
        { label: 'Draw-the-Line', icon: '↗' },
        { label: 'Themed Images', icon: '🖼' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '↔',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 40%, #FFF8E1 100%)',
      badge: 'Matching Modes',
      heading: 'Three Matching Formats',
      subheading: 'Picture-to-picture, picture-to-word, and custom vocabulary',
      tiers: [
        {
          name: 'Matcher', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('matching', 'matching portrait.webp'), alt: 'Image matching — connect identical pictures' },
          desc: 'Match identical pictures to each other',
        },
        {
          name: 'Connector', gradientClass: 'from-orange-400 to-red-500', textColorClass: 'text-orange-700', borderColorClass: 'border-orange-300', stars: 2,
          image: { src: img('matching', 'image and word.webp'), alt: 'Image-to-word matching — vocabulary building' },
          desc: 'Connect pictures to their word labels',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('matching', 'image and custom word.webp'), alt: 'Custom vocabulary matching — personalized word lists' },
          desc: 'Custom vocabulary with themed image sets',
        },
      ],
      trophyText: 'Matching strengthens vocabulary and visual memory',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFCCBC 50%, #FFAB91 100%)',
      heading: 'Connect the Pairs!',
      tagline: 'Visual Vocabulary Building',
      image: { src: img('matching', 'Match Up 2.webp'), alt: 'Spotlight matching — colorful picture-to-word connection activity' },
      pills: ['Print & Match', 'Themed Sets', 'Solutions Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'orange',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFF8F0 0%, #FFF3E0 50%, #FFE0B2 100%)',
      heading: 'Matching Activity Collection',
      subheading: 'Professional vocabulary worksheets with draw-the-line format',
      items: [
        { image: { src: img('matching', 'Match Up 8.webp'), alt: 'Matching practice — themed layout' }, label: 'Match Up' },
        { image: { src: img('matching', 'Match Up 12.webp'), alt: 'Matching variation — different theme' }, label: 'Themed Set' },
        { image: { src: img('matching', 'Match Up 1 answer_key.webp'), alt: 'Matching answer key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Custom Word Lists'],
      frameColor: '#E64A19',
    },
  },

  // ─── Grid Match (toolId: grid-match) ───
  'grid-match': {
    hero: {
      gradient: 'linear-gradient(150deg, #E0F2F1 0%, #80CBC4 40%, #26A69A 70%, #00897B 100%)',
      accentColor: 'teal',
      badge: 'Spatial Reasoning',
      heading: 'Match Pictures to Grid Positions',
      subheading: 'Spatial puzzles where kids match images to numbered grid squares',
      images: [
        { src: img('grid match', 'Grid Match.webp'), alt: 'Grid match puzzle — place pictures in the correct grid position' },
        { src: img('grid match', 'Grid Match (1).webp'), alt: 'Grid matching activity — themed spatial puzzle' },
        { src: img('grid match', 'Grid Match (6).webp'), alt: 'Grid match challenge — animal-themed position matching' },
      ],
      pills: [
        { label: 'Grid Positions', icon: '⊞' },
        { label: 'Animal Themes', icon: '🐾' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '#',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F2F1 0%, #E0F7FA 40%, #FFF8E1 100%)',
      badge: 'Grid Complexity',
      heading: 'Grid Puzzles for All Levels',
      subheading: 'Simple position matching to complex spatial reasoning',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('grid match', 'Grid Match (3).webp'), alt: 'Easy grid match — simple 3x3 positions' },
          desc: 'Match pictures to simple 3×3 grid positions',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('grid match', 'Grid Match (8).webp'), alt: 'Medium grid match — themed animal puzzles' },
          desc: 'Themed grids with animal picture matching',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('grid match', 'Grid Match (10).webp'), alt: 'Hard grid match — complex spatial positions' },
          desc: 'Complex grids requiring spatial reasoning',
        },
      ],
      trophyText: 'Grid matching develops spatial intelligence',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'Find the Position!',
      tagline: 'Spatial Puzzle Challenge',
      image: { src: img('grid match', 'Grid Match (2).webp'), alt: 'Spotlight grid match — engaging position-matching puzzle' },
      pills: ['Print & Match', 'Cute Animals', 'Answer Keys Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFFE 0%, #E0F2F1 50%, #B2DFDB 100%)',
      heading: 'Grid Match Puzzle Gallery',
      subheading: 'Professional spatial reasoning worksheets with themed images',
      items: [
        { image: { src: img('grid match', 'Grid Match (12).webp'), alt: 'Grid match practice — professional layout' }, label: 'Grid Puzzle' },
        { image: { src: img('grid match', 'Grid Match (15).webp'), alt: 'Grid match variation — different animal theme' }, label: 'Themed Grid' },
        { image: { src: img('grid match', 'Grid Match answer_key (1).webp'), alt: 'Grid match solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Animal Themes'],
      frameColor: '#00695C',
    },
  },

  // ─── Shadow Match (toolId: shadow-match) ───
  'shadow-match': {
    hero: {
      gradient: 'linear-gradient(170deg, #1A237E 0%, #0D1B2A 50%, #0B1628 100%)',
      accentColor: 'yellow',
      badge: 'Visual Perception',
      heading: 'Match Pictures to Their Silhouettes',
      subheading: 'Shadow matching worksheets that sharpen observation and visual discrimination',
      images: [
        { src: img('shadow match', 'shadow-match-horizontal.webp'), alt: 'Shadow matching — connect pictures to their silhouettes' },
        { src: img('shadow match', 'shadow-match-vertical.webp'), alt: 'Shadow match vertical — silhouette identification' },
        { src: img('shadow match', 'shadow-match-worksheet.webp'), alt: 'Shadow match worksheet — themed visual perception puzzle' },
      ],
      pills: [
        { label: 'Silhouettes', icon: '◐' },
        { label: 'Visual Skills', icon: '👁' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '◐',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #1e293b 0%, #1e3a5f 40%, #0f172a 100%)',
      badge: 'Observation Levels',
      heading: 'Shadow Puzzles for Sharp Eyes',
      subheading: 'Clear shapes for beginners, subtle differences for experts',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-300', borderColorClass: 'border-emerald-500', stars: 1,
          image: { src: img('shadow match', 'shadow-match-worksheet (1).webp'), alt: 'Easy shadow match — clear distinct silhouettes' },
          desc: 'Distinct silhouettes with clear shape differences',
        },
        {
          name: 'Detective', gradientClass: 'from-yellow-400 to-amber-500', textColorClass: 'text-yellow-300', borderColorClass: 'border-yellow-500', stars: 2,
          image: { src: img('shadow match', 'shadow-match-worksheet (2).webp'), alt: 'Medium shadow match — similar shapes to compare' },
          desc: 'Similar shapes that need careful comparison',
        },
        {
          name: 'Eagle Eye', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-300', borderColorClass: 'border-blue-500', stars: 3,
          image: { src: img('shadow match', 'shadow-match-worksheet (3).webp'), alt: 'Hard shadow match — tricky near-identical silhouettes' },
          desc: 'Tricky silhouettes with subtle differences',
        },
      ],
      trophyText: 'Shadow matching trains visual discrimination',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #1e293b 0%, #334155 50%, #475569 100%)',
      heading: 'Find the Shadow!',
      tagline: 'Visual Perception Training',
      image: { src: img('shadow match', 'shadow-match-horizontal.webp'), alt: 'Spotlight shadow match — engaging silhouette identification puzzle' },
      pills: ['Print & Observe', 'Silhouette Puzzles', 'Solutions Included'],
      hasBunting: false,
      hasConfetti: false,
      accentColor: 'yellow',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E1 50%, #FFECB3 100%)',
      heading: 'Shadow Match Collection',
      subheading: 'Professional visual perception worksheets with themed silhouettes',
      items: [
        { image: { src: img('shadow match', 'shadow-match-horizontal.webp'), alt: 'Shadow match horizontal — professional layout' }, label: 'Horizontal' },
        { image: { src: img('shadow match', 'shadow-match-vertical.webp'), alt: 'Shadow match vertical — alternate layout' }, label: 'Vertical' },
        { image: { src: img('shadow match', 'shadow-match-answer-key (1).webp'), alt: 'Shadow match solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Visual Skills'],
      frameColor: '#F9A825',
    },
  },

  // ─── Bingo (toolId: bingo) ───
  bingo: {
    hero: {
      gradient: 'linear-gradient(140deg, #1565C0 0%, #5E35B1 40%, #C62828 70%, #E53935 100%)',
      accentColor: 'blue',
      badge: 'Game-Based Learning',
      heading: 'Custom Picture Bingo Card Generator',
      subheading: 'Create unique bingo cards with themed images and words for any group size',
      images: [
        { src: img('bingo', 'bingo_card.webp'), alt: 'Custom bingo card — themed picture bingo for classrooms' },
        { src: img('bingo', 'bingo_card_1.webp'), alt: 'Picture bingo card — image-based game activity' },
        { src: img('bingo', 'bingo_card_2.webp'), alt: 'Bingo card set — multiple unique cards per theme' },
      ],
      pills: [
        { label: 'Custom Cards', icon: '🎯' },
        { label: 'Callout Sheets', icon: '📋' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: 'B',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E3F2FD 0%, #E8EAF6 40%, #FFF8E1 100%)',
      badge: 'Grid Sizes',
      heading: 'Bingo Cards for Every Group',
      subheading: 'Quick 3×3 games to classic 5×5 bingo boards',
      tiers: [
        {
          name: '3×3', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('bingo', 'bingo_card_3.webp'), alt: '3x3 bingo — quick 9-square game cards' },
          desc: 'Quick 9-square games for small groups',
        },
        {
          name: '4×4', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('bingo', 'bingo_card word.webp'), alt: '4x4 bingo — 16-square word mode cards' },
          desc: 'Standard 16-square cards with word mode',
        },
        {
          name: '5×5', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 3,
          image: { src: img('bingo', 'bingo_card_4.webp'), alt: '5x5 bingo — classic 25-square board' },
          desc: 'Classic 25-square boards with free center',
        },
      ],
      trophyText: 'Bingo turns vocabulary practice into a party',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E8EAF6 0%, #C5CAE9 50%, #9FA8DA 100%)',
      heading: 'BINGO Time!',
      tagline: 'Learning Meets Fun',
      image: { src: img('bingo', 'callout.webp'), alt: 'Spotlight bingo — themed picture callout sheet for game play' },
      pills: ['Print & Play', 'Callout Sheets', 'Image & Word Modes'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'indigo',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5F5FF 0%, #E8EAF6 50%, #C5CAE9 100%)',
      heading: 'Bingo Materials Gallery',
      subheading: 'Complete game sets with cards and callout sheets',
      items: [
        { image: { src: img('bingo', 'bingo_card_1 word.webp'), alt: 'Bingo word card — professional game material' }, label: 'Word Card' },
        { image: { src: img('bingo', 'callout (1).webp'), alt: 'Bingo callout sheet — picture calling cards' }, label: 'Callout Sheet' },
        { image: { src: img('bingo', 'callout word (1).webp'), alt: 'Bingo word callout — text-based calling cards' }, label: 'Word Callout' },
      ],
      pills: ['Instant Download', 'Multiple Grid Sizes', 'Complete Game Sets', 'Themed Variety'],
      frameColor: '#4A148C',
    },
  },

  // ─── Picture Sort (toolId: picture-sort) ───
  'picture-sort': {
    hero: {
      gradient: 'linear-gradient(140deg, #FCE4EC 0%, #F8BBD0 35%, #F48FB1 70%, #EC407A 100%)',
      accentColor: 'pink',
      badge: 'Classification Skills',
      heading: 'Cut & Sort Pictures into Categories',
      subheading: 'Hands-on categorization worksheets where kids sort themed images into groups',
      images: [
        { src: img('picture sort', 'Picture Sort.webp'), alt: 'Picture sorting — cut and categorize themed images' },
        { src: img('picture sort', 'Picture Sort (1).webp'), alt: 'Category sorting activity — group themed pictures' },
        { src: img('picture sort', 'Picture Sort (5).webp'), alt: 'Picture sort challenge — multi-category classification' },
      ],
      pills: [
        { label: 'Cut & Sort', icon: '✂' },
        { label: 'Category Groups', icon: '📂' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⬡',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FCE4EC 0%, #F3E5F5 40%, #FFF8E1 100%)',
      badge: 'Sorting Complexity',
      heading: 'Categorization for Every Level',
      subheading: 'Two-group sorts to multi-category classification',
      tiers: [
        {
          name: 'Sorter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('picture sort', 'Picture Sort (3).webp'), alt: 'Easy sorting — two clear categories' },
          desc: 'Sort pictures into 2 clear groups',
        },
        {
          name: 'Classifier', gradientClass: 'from-pink-400 to-rose-500', textColorClass: 'text-pink-700', borderColorClass: 'border-pink-300', stars: 2,
          image: { src: img('picture sort', 'Picture Sort (6).webp'), alt: 'Medium sorting — themed three-group classification' },
          desc: 'Themed sorting into 3 category groups',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('picture sort', 'Picture Sort (10).webp'), alt: 'Hard sorting — multi-category with reasoning' },
          desc: 'Multi-category sorting with reasoning skills',
        },
      ],
      trophyText: 'Sorting builds the foundations of logical thinking',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FCE4EC 0%, #F8BBD0 50%, #F48FB1 100%)',
      heading: 'Sort It Out!',
      tagline: 'Hands-On Category Fun',
      image: { src: img('picture sort', 'Picture Sort (2).webp'), alt: 'Spotlight picture sort — colorful cut-and-paste categorization activity' },
      pills: ['Print & Sort', 'Scissor Practice', 'Complete Solutions'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'pink',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFF8FA 0%, #FCE4EC 50%, #F8BBD0 100%)',
      heading: 'Picture Sort Collection',
      subheading: 'Professional categorization activities for hands-on learning',
      items: [
        { image: { src: img('picture sort', 'Picture Sort (8).webp'), alt: 'Picture sort practice — themed layout' }, label: 'Sort Activity' },
        { image: { src: img('picture sort', 'Picture Sort (12).webp'), alt: 'Picture sort variation — different category theme' }, label: 'Category Sheet' },
        { image: { src: img('picture sort', 'Picture Sort answer_key (1).webp'), alt: 'Picture sort solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'Cut & Paste Ready', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#AD1457',
    },
  },

  // ─── Missing Pieces (toolId: missing-pieces) ───
  'missing-pieces': {
    hero: {
      gradient: 'linear-gradient(160deg, #E8F5E9 0%, #C8E6C9 40%, #A5D6A7 70%, #81C784 100%)',
      accentColor: 'emerald',
      badge: 'Visual Puzzles',
      heading: 'Find the Missing Puzzle Piece',
      subheading: 'Visual completion worksheets where kids identify which cutout fits the picture',
      images: [
        { src: img('missing pieces', 'Missing Pieces.webp'), alt: 'Missing piece puzzle — identify the correct cutout' },
        { src: img('missing pieces', 'Missing Pieces (1).webp'), alt: 'Picture completion activity — themed visual puzzle' },
        { src: img('missing pieces', 'Missing Pieces (6).webp'), alt: 'Missing pieces challenge — multiple cutout options' },
      ],
      pills: [
        { label: 'Visual Completion', icon: '🧩' },
        { label: 'Observation Skills', icon: '👁' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🧩',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E8F5E9 0%, #E0F7FA 40%, #FFF8E1 100%)',
      badge: 'Puzzle Difficulty',
      heading: 'Completion Puzzles for All Ages',
      subheading: 'Clear cutouts for beginners, tricky options for experts',
      tiers: [
        {
          name: 'Finder', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('missing pieces', 'Missing Pieces (3).webp'), alt: 'Easy missing pieces — one clear square cutout' },
          desc: 'One obvious cutout with clear shape match',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('missing pieces', 'Missing Pieces (8).webp'), alt: 'Medium missing pieces — circle cutouts with themed images' },
          desc: 'Circle cutouts with similar-looking options',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('missing pieces', 'Missing Pieces (10).webp'), alt: 'Hard missing pieces — multiple tricky cutouts' },
          desc: 'Multiple cutouts with subtle differences',
        },
      ],
      trophyText: 'Puzzle solving sharpens visual attention',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
      heading: 'Complete the Picture!',
      tagline: 'Visual Puzzle Challenge',
      image: { src: img('missing pieces', 'Missing Pieces (2).webp'), alt: 'Spotlight missing pieces — engaging visual completion puzzle' },
      pills: ['Print & Solve', 'Observation Skills', 'Solutions Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'emerald',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5FFF5 0%, #E8F5E9 50%, #C8E6C9 100%)',
      heading: 'Missing Pieces Gallery',
      subheading: 'Professional visual completion puzzles for focused practice',
      items: [
        { image: { src: img('missing pieces', 'Missing Pieces (12).webp'), alt: 'Missing pieces practice — professional layout' }, label: 'Puzzle Sheet' },
        { image: { src: img('missing pieces', 'Missing Pieces (15).webp'), alt: 'Missing pieces variation — different theme' }, label: 'Themed Puzzle' },
        { image: { src: img('missing pieces', 'Missing Pieces answer_key (1).webp'), alt: 'Missing pieces solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#2E7D32',
    },
  },

  // ─── Odd One Out (toolId: odd-one-out) ───
  'odd-one-out': {
    hero: {
      gradient: 'linear-gradient(140deg, #E3F2FD 0%, #FFF8E1 40%, #FFF176 70%, #FFD54F 100%)',
      accentColor: 'amber',
      badge: 'Critical Thinking',
      heading: 'Spot Which Picture Does Not Belong',
      subheading: 'Classification worksheets that challenge kids to find the odd one out in every group',
      images: [
        { src: img('odd one out', 'Find the Odd One Out.webp'), alt: 'Odd one out worksheet — identify the picture that doesn\'t belong' },
        { src: img('odd one out', 'Find the Odd One Out (1).webp'), alt: 'Category reasoning — themed odd-one-out activity' },
        { src: img('odd one out', 'Find the Odd One Out (5).webp'), alt: 'Odd one out challenge — subtle difference puzzles' },
      ],
      pills: [
        { label: 'Reasoning Skills', icon: '🤔' },
        { label: 'Category Logic', icon: '📂' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '✕',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E3F2FD 0%, #FFF8E1 40%, #FFE082 100%)',
      badge: 'Thinking Levels',
      heading: 'Classification for Every Thinker',
      subheading: 'Obvious outliers to subtle category differences',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('odd one out', 'Find the Odd One Out (3).webp'), alt: 'Easy odd one out — one item clearly different' },
          desc: 'One picture clearly different from the group',
        },
        {
          name: 'Thinker', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('odd one out', 'Find the Odd One Out (6).webp'), alt: 'Medium odd one out — category-based reasoning' },
          desc: 'Category-based reasoning with themed groups',
        },
        {
          name: 'Genius', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 3,
          image: { src: img('odd one out', 'Find the Odd One Out (10).webp'), alt: 'Hard odd one out — subtle attribute differences' },
          desc: 'Subtle attribute differences requiring deep analysis',
        },
      ],
      trophyText: 'Finding outliers strengthens analytical thinking',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
      heading: 'Which One Is Different?',
      tagline: 'Train Your Brain',
      image: { src: img('odd one out', 'Find the Odd One Out (2).webp'), alt: 'Spotlight odd one out — colorful critical thinking puzzle' },
      pills: ['Print & Think', 'Category Puzzles', 'Solutions Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E1 50%, #FFECB3 100%)',
      heading: 'Odd One Out Collection',
      subheading: 'Professional classification worksheets for logical thinkers',
      items: [
        { image: { src: img('odd one out', 'Find the Odd One Out (12).webp'), alt: 'Odd one out practice — themed layout' }, label: 'Challenge' },
        { image: { src: img('odd one out', 'Find the Odd One Out (15).webp'), alt: 'Odd one out variation — different category' }, label: 'Puzzle' },
        { image: { src: img('odd one out', 'Find the Odd One Out answer-key (1).webp'), alt: 'Odd one out solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Categories'],
      frameColor: '#F57F17',
    },
  },

  // ─── Sudoku (toolId: sudoku) ───
  sudoku: {
    hero: {
      gradient: 'linear-gradient(145deg, #E0F2F1 0%, #4DB6AC 40%, #26A69A 70%, #00897B 100%)',
      accentColor: 'teal',
      badge: 'Logic Puzzles',
      heading: 'Picture Sudoku Grids for Young Thinkers',
      subheading: '4×4 sudoku puzzles with cute animal pictures — cut, paste, and solve',
      images: [
        { src: img('sudoku', 'sudoku_easy.webp'), alt: 'Picture sudoku — easy 4x4 grid with animal images' },
        { src: img('sudoku', 'sudoku medium.webp'), alt: 'Picture sudoku — medium difficulty grid' },
        { src: img('sudoku', 'sudoku hard.webp'), alt: 'Picture sudoku — hard logic challenge' },
      ],
      pills: [
        { label: '4×4 Grids', icon: '⊞' },
        { label: 'Cut & Paste', icon: '✂' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⊞',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F2F1 0%, #E0F7FA 40%, #FFF8E1 100%)',
      badge: 'Logic Levels',
      heading: 'Sudoku Difficulty for Every Solver',
      subheading: 'Few blanks for beginners, mostly empty for experts',
      tiers: [
        {
          name: 'Easy', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('sudoku', 'sudoku_worksheet.webp'), alt: 'Easy sudoku — few missing animal pictures' },
          desc: 'Few missing pictures with clear placement',
        },
        {
          name: 'Medium', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('sudoku', 'sudoku_worksheet (5).webp'), alt: 'Medium sudoku — more blanks with themed animals' },
          desc: 'More blanks requiring deduction skills',
        },
        {
          name: 'Hard', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('sudoku', 'sudoku_worksheet (10).webp'), alt: 'Hard sudoku — mostly empty grid logic challenge' },
          desc: 'Mostly empty grids for true logic practice',
        },
      ],
      trophyText: 'Sudoku builds systematic reasoning skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'Solve the Grid!',
      tagline: 'Picture Logic Puzzles',
      image: { src: img('sudoku', 'sudoku_worksheet (3).webp'), alt: 'Spotlight sudoku — adorable animal picture grid puzzle' },
      pills: ['Print & Solve', 'Cut & Paste', 'Three Levels'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFFE 0%, #E0F2F1 50%, #B2DFDB 100%)',
      heading: 'Picture Sudoku Gallery',
      subheading: 'Professional logic puzzles with adorable animal themes',
      items: [
        { image: { src: img('sudoku', 'sudoku_worksheet (15).webp'), alt: 'Sudoku practice — professional layout' }, label: 'Logic Puzzle' },
        { image: { src: img('sudoku', 'sudoku_worksheet (20).webp'), alt: 'Sudoku variation — different animal set' }, label: 'Themed Grid' },
        { image: { src: img('sudoku', 'sudoku_answer_key (1).webp'), alt: 'Sudoku solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Animal Themes'],
      frameColor: '#00695C',
    },
  },

  // ─── Picture Path (toolId: picture-path) ───
  'picture-path': {
    hero: {
      gradient: 'linear-gradient(145deg, #E8F5E9 0%, #66BB6A 40%, #43A047 70%, #2E7D32 100%)',
      accentColor: 'green',
      badge: 'Navigation & Logic',
      heading: 'Follow Picture Clues Through the Grid',
      subheading: 'Pathway puzzles where kids navigate grids by following the correct image trail',
      images: [
        { src: img('picture path', 'Picture Pathway.webp'), alt: 'Picture pathway — navigate the grid following image clues' },
        { src: img('picture path', 'Picture Pathway (1).webp'), alt: 'Grid navigation activity — themed picture trail' },
        { src: img('picture path', 'Picture Pathway (5).webp'), alt: 'Picture path challenge — complex grid with turns' },
      ],
      pills: [
        { label: 'Grid Navigation', icon: '🧭' },
        { label: 'Picture Trails', icon: '🐾' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '→',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E8F5E9 0%, #F1F8E9 40%, #FFF8E1 100%)',
      badge: 'Path Levels',
      heading: 'Navigation Challenges for All Explorers',
      subheading: 'Simple trails to complex multi-path grids',
      tiers: [
        {
          name: 'Hiker', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('picture path', 'Picture Pathway (3).webp'), alt: 'Easy pathway — simple straight picture trail' },
          desc: 'Simple straight trails with clear picture clues',
        },
        {
          name: 'Navigator', gradientClass: 'from-green-500 to-teal-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 2,
          image: { src: img('picture path', 'Picture Pathway (6).webp'), alt: 'Medium pathway — themed grid with turns' },
          desc: 'Themed grids with turns and direction changes',
        },
        {
          name: 'Explorer', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('picture path', 'Picture Pathway (10).webp'), alt: 'Hard pathway — complex multi-path grid' },
          desc: 'Complex grids with decoy paths and dead ends',
        },
      ],
      trophyText: 'Pathfinding develops planning and logic',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
      heading: 'Find Your Way!',
      tagline: 'Grid Path Adventure',
      image: { src: img('picture path', 'Picture Pathway (2).webp'), alt: 'Spotlight picture pathway — colorful grid navigation adventure' },
      pills: ['Print & Navigate', 'Picture Trails', 'Solutions Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'green',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5FFF5 0%, #E8F5E9 50%, #C8E6C9 100%)',
      heading: 'Picture Pathway Gallery',
      subheading: 'Professional grid navigation puzzles with themed picture trails',
      items: [
        { image: { src: img('picture path', 'Picture Pathway (12).webp'), alt: 'Picture pathway practice — professional layout' }, label: 'Pathway' },
        { image: { src: img('picture path', 'Picture Pathway (15).webp'), alt: 'Picture pathway variation — different theme' }, label: 'Trail Puzzle' },
        { image: { src: img('picture path', 'Picture Pathway answer_key (1).webp'), alt: 'Picture pathway solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#1B5E20',
    },
  },

  // ─── Find and Count (toolId: find-and-count) ───
  'find-and-count': {
    hero: {
      gradient: 'linear-gradient(145deg, #E0F7FA 0%, #80DEEA 40%, #26C6DA 70%, #00ACC1 100%)',
      accentColor: 'cyan',
      badge: 'Search & Count',
      heading: 'I Spy — Search Scenes and Count Objects',
      subheading: 'Hidden picture worksheets where kids find themed items and tally how many appear',
      images: [
        { src: img('find and count', 'I Spy 1.webp'), alt: 'I Spy search scene — find and count themed hidden objects' },
        { src: img('find and count', 'I Spy 3.webp'), alt: 'I Spy counting activity — themed search challenge' },
        { src: img('find and count', 'I Spy 8.webp'), alt: 'I Spy advanced — crowded scene with hidden items' },
      ],
      pills: [
        { label: 'Hidden Objects', icon: '🔍' },
        { label: 'Counting Practice', icon: '🔢' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🔍',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #E3F2FD 40%, #FFF8E1 100%)',
      badge: 'Search Levels',
      heading: 'I Spy Challenges for Every Detective',
      subheading: 'Clear scenes for beginners, crowded puzzles for experts',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('find and count', 'I Spy 4.webp'), alt: 'Easy I Spy — large clear objects to find and count' },
          desc: 'Large, clear objects easy to spot and count',
        },
        {
          name: 'Searcher', gradientClass: 'from-cyan-400 to-blue-500', textColorClass: 'text-cyan-700', borderColorClass: 'border-cyan-300', stars: 2,
          image: { src: img('find and count', 'find and count portrait.webp'), alt: 'Medium I Spy — themed scenes with more hidden items' },
          desc: 'Themed scenes with more items to discover',
        },
        {
          name: 'Detective', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('find and count', 'I Spy 10.webp'), alt: 'Hard I Spy — crowded scenes with tricky hidden objects' },
          desc: 'Crowded scenes with camouflaged objects',
        },
      ],
      trophyText: 'Search and count builds attention to detail',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'I Spy & Count!',
      tagline: 'Hidden Object Adventures',
      image: { src: img('find and count', 'I Spy 2.webp'), alt: 'Spotlight I Spy — colorful search-and-count scene' },
      pills: ['Print & Search', 'Themed Scenes', 'Solutions Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'cyan',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFFF 0%, #E0F7FA 50%, #B2EBF2 100%)',
      heading: 'I Spy Activity Gallery',
      subheading: 'Professional hidden-object worksheets with themed counting',
      items: [
        { image: { src: img('find and count', 'I Spy 12.webp'), alt: 'I Spy practice — professional themed layout' }, label: 'Search Scene' },
        { image: { src: img('find and count', 'I Spy 15.webp'), alt: 'I Spy variation — different theme' }, label: 'Counting Sheet' },
        { image: { src: img('find and count', 'I Spy 1 answer_key.webp'), alt: 'I Spy solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#00838F',
    },
  },

  // ─── Find Objects (toolId: find-objects) ───
  'find-objects': {
    hero: {
      gradient: 'linear-gradient(140deg, #FFEBEE 0%, #EF9A9A 35%, #EF5350 70%, #E53935 100%)',
      accentColor: 'red',
      badge: 'Visual Perception',
      heading: 'Eagle Eye Spot-the-Object Worksheets',
      subheading: 'Visual search activities that test observation skills with themed picture scenes',
      images: [
        { src: img('find objects', 'spotworks_worksheet.webp'), alt: 'Spot the objects — eagle eye visual search challenge' },
        { src: img('find objects', 'spotworks_worksheet (1).webp'), alt: 'Object finding activity — themed scene search' },
        { src: img('find objects', 'spotworks_worksheet (8).webp'), alt: 'Visual perception challenge — find hidden details' },
      ],
      pills: [
        { label: 'Eagle Eye Vision', icon: '👁' },
        { label: 'Themed Scenes', icon: '🖼' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '👁',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #FFEBEE 0%, #FFF3E0 40%, #FFF8E1 100%)',
      badge: 'Observation Levels',
      heading: 'Spotting Challenges for All Ages',
      subheading: 'Clear objects for beginners, hidden details for experts',
      tiers: [
        {
          name: 'Rookie', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('find objects', 'spotworks_worksheet (5).webp'), alt: 'Easy object finding — clear visible items' },
          desc: 'Clear, visible objects easy to identify',
        },
        {
          name: 'Sharp Eye', gradientClass: 'from-red-400 to-rose-500', textColorClass: 'text-red-700', borderColorClass: 'border-red-300', stars: 2,
          image: { src: img('find objects', 'spotworks_worksheet (10).webp'), alt: 'Medium object finding — camouflaged items in scenes' },
          desc: 'Themed scenes with partially hidden items',
        },
        {
          name: 'Eagle Eye', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('find objects', 'spotworks_worksheet (20).webp'), alt: 'Hard object finding — tiny hidden details' },
          desc: 'Tiny details hidden among distracting elements',
        },
      ],
      trophyText: 'Sharp observation powers every skill',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #FFEBEE 0%, #FFCDD2 50%, #EF9A9A 100%)',
      heading: 'Spot Everything!',
      tagline: 'Test Your Eagle Vision',
      image: { src: img('find objects', 'spotworks_worksheet (2).webp'), alt: 'Spotlight object finder — exciting visual search activity' },
      pills: ['Print & Search', 'Visual Training', 'Complete Solutions'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'red',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #FFF8F8 0%, #FFEBEE 50%, #FFCDD2 100%)',
      heading: 'Object Finding Gallery',
      subheading: 'Professional visual perception worksheets for keen observers',
      items: [
        { image: { src: img('find objects', 'spotworks_worksheet (15).webp'), alt: 'Object finding practice — professional layout' }, label: 'Search Sheet' },
        { image: { src: img('find objects', 'spotworks_worksheet (25).webp'), alt: 'Object finding variation — different theme' }, label: 'Challenge' },
        { image: { src: img('find objects', 'spotworks_answer_key (1).webp'), alt: 'Object finding solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Themes'],
      frameColor: '#C62828',
    },
  },

  // ─── Crossword (toolId: crossword) ───
  crossword: {
    hero: {
      gradient: 'linear-gradient(140deg, #E3F2FD 0%, #90CAF9 35%, #42A5F5 70%, #1E88E5 100%)',
      accentColor: 'blue',
      badge: 'Word Puzzles',
      heading: 'Picture-Clue Crossword Puzzles',
      subheading: 'Fill crossword grids using image hints — no text clues needed for young solvers',
      images: [
        { src: img('crossword', 'crossword_worksheet.webp'), alt: 'Picture crossword — solve using image clues instead of text' },
        { src: img('crossword', 'crossword_worksheet (1).webp'), alt: 'Themed crossword activity — picture-based vocabulary' },
        { src: img('crossword', 'crossword_worksheet (5).webp'), alt: 'Crossword challenge — larger grid with more picture clues' },
      ],
      pills: [
        { label: 'Picture Clues', icon: '📸' },
        { label: 'Vocabulary Building', icon: '📝' },
        { label: 'Printable PDFs', icon: '📄' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⊞',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E3F2FD 0%, #E8EAF6 40%, #FFF8E1 100%)',
      badge: 'Grid Levels',
      heading: 'Crosswords for Every Vocabulary Level',
      subheading: 'Small grids with few clues to large puzzles with many',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('crossword', 'crossword_worksheet (3).webp'), alt: 'Easy crossword — small grid with 4-6 picture clues' },
          desc: 'Small grids with 4-6 simple picture clues',
        },
        {
          name: 'Puzzler', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('crossword', 'crossword_worksheet (6).webp'), alt: 'Medium crossword — themed grid with vocabulary' },
          desc: 'Themed grids with crossing word intersections',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('crossword', 'crossword_worksheet (10).webp'), alt: 'Hard crossword — large grid with 10+ clues' },
          desc: 'Large grids with 10+ interlocking picture clues',
        },
      ],
      trophyText: 'Crosswords strengthen spelling and vocabulary',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
      heading: 'Solve the Crossword!',
      tagline: 'Pictures Guide the Way',
      image: { src: img('crossword', 'crossword_worksheet (2).webp'), alt: 'Spotlight crossword — engaging picture-clue vocabulary puzzle' },
      pills: ['Print & Solve', 'Image Clues', 'Answer Keys Ready'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'blue',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F5F9FF 0%, #E3F2FD 50%, #BBDEFB 100%)',
      heading: 'Crossword Puzzle Gallery',
      subheading: 'Professional picture-based crossword activities ready to print',
      items: [
        { image: { src: img('crossword', 'crossword_worksheet (8).webp'), alt: 'Crossword practice — professional layout' }, label: 'Puzzle Grid' },
        { image: { src: img('crossword', 'crossword_worksheet (12).webp'), alt: 'Crossword variation — different theme' }, label: 'Themed Puzzle' },
        { image: { src: img('crossword', 'crossword_answer_key (1).webp'), alt: 'Crossword solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Multiple Grid Sizes'],
      frameColor: '#1565C0',
    },
  },

  // ─── Treasure Hunt (toolId: treasure-hunt) ───
  'treasure-hunt': {
    hero: {
      gradient: 'linear-gradient(150deg, #E0F2F1 0%, #4DB6AC 40%, #00897B 70%, #00695C 100%)',
      accentColor: 'teal',
      badge: 'Direction & Navigation',
      heading: 'Follow Compass Directions to Find Treasure',
      subheading: 'Grid-based treasure hunts where kids follow directional clues to reach the prize',
      images: [
        { src: img('treasure hunt', 'Treasure Hunt 1.webp'), alt: 'Treasure hunt grid — follow directions to find the treasure' },
        { src: img('treasure hunt', 'Treasure Hunt 2.webp'), alt: 'Directional navigation — themed grid adventure' },
        { src: img('treasure hunt', 'Treasure Hunt 5.webp'), alt: 'Treasure hunt challenge — complex compass routes' },
      ],
      pills: [
        { label: 'Compass Directions', icon: '🧭' },
        { label: 'Grid Adventures', icon: '🗺' },
        { label: 'Ready to Print', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '💎',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #E0F2F1 0%, #E0F7FA 40%, #FFF8E1 100%)',
      badge: 'Adventure Levels',
      heading: 'Treasure Hunts for Every Explorer',
      subheading: 'Simple arrow paths to multi-step compass routes',
      tiers: [
        {
          name: 'Scout', gradientClass: 'from-green-400 to-emerald-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 1,
          image: { src: img('treasure hunt', 'north south.webp'), alt: 'Easy treasure hunt — simple up/down/left/right navigation' },
          desc: 'Simple up-down-left-right arrow navigation',
        },
        {
          name: 'Adventurer', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('treasure hunt', 'Treasure Hunt 4.webp'), alt: 'Medium treasure hunt — multi-step themed grid' },
          desc: 'Multi-step routes on themed adventure grids',
        },
        {
          name: 'Captain', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('treasure hunt', 'Treasure Hunt 3.webp'), alt: 'Hard treasure hunt — compass directions with complex routes' },
          desc: 'Compass directions with complex branching routes',
        },
      ],
      trophyText: 'Navigation skills build spatial intelligence',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
      heading: 'X Marks the Spot!',
      tagline: 'Navigate to Treasure',
      image: { src: img('treasure hunt', 'up down.webp'), alt: 'Spotlight treasure hunt — exciting directional grid adventure' },
      pills: ['Print & Explore', 'Grid Adventures', 'Solutions Included'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #F0FFFE 0%, #E0F2F1 50%, #B2DFDB 100%)',
      heading: 'Treasure Hunt Gallery',
      subheading: 'Professional directional navigation puzzles for young explorers',
      items: [
        { image: { src: img('treasure hunt', 'Treasure Hunt 1.webp'), alt: 'Treasure hunt practice — professional layout' }, label: 'Adventure' },
        { image: { src: img('treasure hunt', 'Treasure Hunt 3.webp'), alt: 'Treasure hunt variation — different map theme' }, label: 'Map Quest' },
        { image: { src: img('treasure hunt', 'Treasure Hunt 1 answer_key.webp'), alt: 'Treasure hunt solution key' }, label: 'Solutions' },
      ],
      pills: ['Instant Download', 'No Prep Time', 'Full Solutions', 'Compass Themes'],
      frameColor: '#004D40',
    },
  },

};

// ─── Helpers ───

export function getToolShowcaseConfig(toolId: string): ToolShowcaseConfig | null {
  return toolShowcaseConfigs[toolId] ?? null;
}

export function hasToolShowcase(toolId: string): boolean {
  return toolId in toolShowcaseConfigs;
}
