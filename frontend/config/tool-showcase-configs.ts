import type { HeroShowcaseConfig, TieredShowcaseConfig, SpotlightConfig, GalleryConfig } from '@/components/showcase';
import { imgUrl, t, tPills, tStringPills } from '@/config/showcase-i18n';
import { germanImages } from '@/config/german-showcase-images';
import { frenchImages } from '@/config/french-showcase-images';
import { spanishImages } from '@/config/spanish-showcase-images';
import { portugueseImages } from '@/config/portuguese-showcase-images';
import { italianImages } from '@/config/italian-showcase-images';
import { dutchImages } from '@/config/dutch-showcase-images';

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

// ═══════════════════════════════════════════════════════════════════
// GERMAN LOCALIZATION — tool-specific text overrides
// Format: [heroH, heroSub, tieredH, tieredSub, t1, t2, t3, trophy, spotH, spotTag, galH, galSub]
// ═══════════════════════════════════════════════════════════════════

type DeTextTuple = [string, string, string, string, string, string, string, string, string, string, string, string];

/** Map toolId → german-showcase-images key */
const toolToAppKey: Record<string, string> = {
  'image-addition': 'addition',
  'image-subtraction': 'subtraction',
  'word-search': 'wordsearch',
};

function resolveAppKey(toolId: string): string {
  return toolToAppKey[toolId] || toolId;
}

const deToolText: Record<string, DeTextTuple> = {
  'image-addition': [
    'Bildbasierte Additionsübung', 'Bunte Themenarbeitsblätter, die Addition für junge Lerner erlebbar machen',
    'Strukturierter Schwierigkeitsaufbau', 'Arbeitsblätter, die sich an jedes Lernniveau anpassen',
    'Themenbilder zählen und bis 5 addieren', 'Gemischte Bildergruppen mit Summen bis 10', 'Bilder und Zahlen kombinieren bis 20',
    'Im eigenen Tempo mit visueller Mathematik lernen',
    'Rechnen wird bunt!', 'Visuelles Addieren meistern',
    'Druckbare Additions-Sammlung', 'Fertige Arbeitsblätter für Zuhause und Klassenzimmer',
  ],
  'image-subtraction': [
    'Durchstreich-Subtraktion mit Bildern', 'Visuelle Subtraktionsarbeitsblätter für schrittweises Lernen',
    'Aufbauende Subtraktionsübungen', 'Arbeitsblätter, die mit dem Lernfortschritt wachsen',
    'Bilder durchstreichen für Ergebnisse (1-5)', 'Bild-Zahl-Subtraktion bis 10', 'Gemischte Subtraktionsarten bis 20',
    'Mit jeder Aufgabe wächst das Verständnis',
    'Subtrahieren lernen!', 'Abziehen mit Bildern',
    'Subtraktions-Arbeitsblattsammlung', 'Fertige Übungen für alle Schwierigkeitsstufen',
  ],
  'code-addition': [
    'Codeknacker mit Addition', 'Matheaufgaben lösen und geheime Wörter entschlüsseln',
    'Aufbauende Codeknacker-Aufgaben', 'Rechenaufgaben, die sich der Lernstufe anpassen',
    'Einfache Additionscodes (1-5)', 'Mittlere Codes mit Summen bis 10', 'Mehrstufige Codes bis 20',
    'Codeknacken stärkt Mathekompetenz',
    'Codes entschlüsseln!', 'Mathe + Geheimnis',
    'Codeknacker-Arbeitsblattsammlung', 'Fertige Rätsel für Zuhause und Schule',
  ],
  'more-less': [
    'Visuelles Mengenvergleichen', 'Bunte Arbeitsblätter zum Erkennen von mehr, weniger und gleich',
    'Vergleichsübungen nach Schwierigkeitsgrad', 'Aufbauende Übungen für sicheres Mengenverständnis',
    'Einfaches Erkennen der größeren Gruppe (1-5)', 'Thematische Gruppen bis 10 vergleichen', 'Größer, kleiner und gleich meistern',
    'Vergleichen schafft mathematische Grundlagen',
    'Mengen vergleichen!', 'Visuelles Zahlenverständnis',
    'Vergleichs-Arbeitsblattsammlung', 'Klare Layouts für alle Vergleichsarten',
  ],
  'math-puzzle': [
    'Bilder-Rätsel durch Rechnen', 'Rechenaufgaben lösen und versteckte Tierbilder enthüllen',
    'Rätsel in drei Schwierigkeitsstufen', 'Vom einfachen Raster zum kniffligen Puzzle',
    'Einfache 3×3-Raster mit Addition', 'Thematische Rätsel mit gemischten Rechenarten', 'Komplexe Raster mit größeren Zahlen',
    'Jedes Rätsel enthüllt eine Überraschung',
    'Rätsel lösen!', 'Mathe-Bilder-Spaß',
    'Mathe-Rätsel-Sammlung', 'Spannende Raster zum Rechnen und Entdecken',
  ],
  'math-worksheet': [
    'Visuelle Gleichungen mit Bildern', 'Algebraische Konzepte durch niedliche Tierbilder erlernen',
    'Gleichungen für jede Lernstufe', 'Vom einfachen Bild zur komplexen Gleichung',
    'Einfache Bildgleichungen (1-5)', 'Thematische Gleichungen bis 10', 'Mehrstufige Bildgleichungen bis 20',
    'Algebra-Denken von Anfang an aufbauen',
    'Bildergleichungen!', 'Visuelles Algebra-Lernen',
    'Gleichungs-Arbeitsblattsammlung', 'Fertige Übungen für visuelles Algebralernen',
  ],
  'alphabet-train': [
    'Alphabet-Zug Aktivität', 'Buchstaben erkennen und zuordnen mit Zug-Ausschneideübungen',
    'Buchstabenlernen in drei Stufen', 'Vom Erkennen zum selbstständigen Zuordnen',
    'Großbuchstaben A-M zuordnen', 'Volles Alphabet mit Themenbildern', 'Groß- und Kleinbuchstaben zuordnen',
    'Auf dem Alphabet-Zug wird Lernen zum Abenteuer',
    'ABC-Zug!', 'Buchstaben-Abenteuer',
    'Alphabet-Zug-Sammlung', 'Fertige Ausschneidebogen für das Buchstabenlernen',
  ],
  prepositions: [
    'Räumliche Wörter mit Bildern', 'Auf, unter, neben — Präpositionen visuell erlernen',
    'Präpositionsübungen in drei Stufen', 'Vom Grundwortschatz zur komplexen Beschreibung',
    'Grundlegende Raumwörter: auf, in, unter', 'Erweiterter Wortschatz mit Szenen', 'Komplexe räumliche Beziehungen',
    'Räumliche Wörter erweitern die Ausdrucksfähigkeit',
    'Wo ist es?', 'Raumwörter lernen',
    'Präpositions-Arbeitsblattsammlung', 'Fertige Übungen für räumlichen Wortschatz',
  ],
  'word-guess': [
    'Worträtsel mit Bilderhinweisen', 'Fehlende Buchstaben ergänzen dank visueller Hinweise',
    'Worträtsel in drei Schwierigkeitsstufen', 'Vom einfachen Wort zum kreativen Rätsel',
    'Einfache 3-4 Buchstabenwörter', 'Themenwortschatz mit 2+ fehlenden Buchstaben', 'Längere Wörter mit eigenen Listen',
    'Jedes Worträtsel stärkt den Wortschatz',
    'Wörter erraten!', 'Bilder-Worträtsel',
    'Worträtsel-Sammlung', 'Motivierende Übungen für den Wortschatz',
  ],
  'word-scramble': [
    'Buchstabensalat-Rätsel', 'Verdrehte Buchstaben mithilfe von Bildern entwirren',
    'Buchstabensalat in drei Stufen', 'Vom einfachen zum anspruchsvollen Buchstabenrätsel',
    'Einfache 3-4 Buchstabenwörter', '5-6 Buchstaben Themenwörter', 'Längere Wörter und eigene Listen',
    'Buchstabensalat stärkt die Rechtschreibung',
    'Buchstaben ordnen!', 'Wörter-Durcheinander',
    'Buchstabensalat-Sammlung', 'Fertige Rechtschreibübungen zum Ausdrucken',
  ],
  'word-search': [
    'Wortsuche im Buchstabengitter', 'Versteckte Wörter in thematischen Rastern finden',
    'Wortsuchrätsel in drei Schwierigkeitsstufen', 'Vom kleinen Raster zur großen Herausforderung',
    'Einfache 6×6-Raster', 'Mittlere 10×10-Rätsel', 'Anspruchsvolle 15×15-Raster',
    'Jedes gefundene Wort erweitert den Wortschatz',
    'Wörter suchen!', 'Wortsuche-Abenteuer',
    'Wortsuche-Sammlung', 'Fertige Wortsuchrätsel für jedes Thema',
  ],
  cryptogram: [
    'Bilder-Kryptogramm-Rätsel', 'Geheime Buchstabenersetzungen mit thematischen Bildern lösen',
    'Kryptogramme in drei Stufen', 'Vom einfachen Code zum komplexen Rätsel',
    'Einfache Buchstabencodes', 'Mittelschwere Verschlüsselungen', 'Fortgeschrittene Kryptogramme',
    'Codeknacken schärft den Verstand',
    'Codes knacken!', 'Geheimschrift-Spaß',
    'Kryptogramm-Sammlung', 'Fertige Logik-Rätsel zum Ausdrucken',
  ],
  writing: [
    'Handschrift-Übungsblätter', 'Buchstaben und Wörter mit Führungslinien sauber schreiben',
    'Schreibübungen in drei Stufen', 'Vom Nachzeichnen zum selbstständigen Schreiben',
    'Nachzeichnen üben', 'Geführtes Buchstabenschreiben', 'Selbstständiges Schreiben',
    'Saubere Handschrift beginnt mit Übung',
    'Schreiben üben!', 'Buchstaben-Meisterschaft',
    'Handschrift-Übungssammlung', 'Fertige Schreibübungen mit Führungslinien',
  ],
  'big-small': [
    'Visueller Größenvergleich', 'Groß und Klein mit bunten Bildern erkennen und vergleichen',
    'Größenübungen in drei Stufen', 'Vom einfachen Vergleich zur Größenreihenfolge',
    'Einfach groß vs. klein', 'Nach Größe ordnen', 'Komplexe Größenvergleiche',
    'Größenverständnis stärkt mathematisches Denken',
    'Groß oder Klein?', 'Größen vergleichen',
    'Größenvergleich-Sammlung', 'Klare Arbeitsblätter für das Größenverständnis',
  ],
  'pattern-train': [
    'Muster auf dem Zug fortsetzen', 'Erkenne Bildmuster und vervollständige die Zugwaggons',
    'Musterübungen in drei Stufen', 'Vom einfachen AB zum komplexen ABCD-Muster',
    'Einfache AB-Muster', 'ABC-Musterketten', 'Komplexe ABCD-Muster',
    'Mustererkennung ist Grundlage für Logik',
    'Muster fortsetzen!', 'Zug-Muster-Spaß',
    'Musterzug-Sammlung', 'Thematische Musterübungen zum Ausdrucken',
  ],
  'pattern-worksheet': [
    'Muster erkennen und fortsetzen', 'Logisches Denken mit visuellen Bildmustern trainieren',
    'Muster-Rätsel in drei Stufen', 'Vom Wiederholungsmuster zur komplexen Sequenz',
    'Einfache Wiederholungsmuster', 'Wachsende Muster', 'Komplexe gemischte Muster',
    'Mustererkennung öffnet Türen zum logischen Denken',
    'Muster entdecken!', 'Logisches Muster-Training',
    'Muster-Arbeitsblattsammlung', 'Durchdachte Übungen für visuelles Denken',
  ],
  'draw-and-color': [
    'Rasterzeichnen Schritt für Schritt', 'Vorlagen abzeichnen und kreativ ausmalen',
    'Zeichenübungen in drei Stufen', 'Vom einfachen Raster zur freien Zeichnung',
    'Einfache Rasterkopien', 'Detaillierte Rasterzeichnungen', 'Freie Zeichenherausforderungen',
    'Zeichnen fördert Kreativität und Feinmotorik',
    'Zeichne es ab!', 'Kreatives Rasterzeichnen',
    'Rasterzeichnen-Sammlung', 'Schritt-für-Schritt Übungen für jedes Thema',
  ],
  'drawing-lines': [
    'Linien nachzeichnen und üben', 'Feinmotorik trainieren mit verschiedenen Linienformen',
    'Linienübungen in drei Stufen', 'Von geraden Strichen zu komplexen Mustern',
    'Gerade Linien nachzeichnen', 'Geschwungene Pfade folgen', 'Komplexe Linienformen meistern',
    'Linienübung bereitet auf das Schreiben vor',
    'Linien meistern!', 'Motorik-Training',
    'Linienübungs-Sammlung', 'Aufbauende Arbeitsblätter für die Feinmotorik',
  ],
  coloring: [
    'Ausmalbilder in vielen Themen', 'Professionelle Ausmalvorlagen für Kreativität und Entspannung',
    'Ausmalbilder in drei Detailstufen', 'Von einfachen Umrissen bis zu komplexen Szenen',
    'Einfache Umrisse zum Ausmalen', 'Detaillierte thematische Szenen', 'Komplexe Muster und Designs',
    'Ausmalen fördert Kreativität und Feinmotorik',
    'Ausmalspaß!', 'Farben entdecken',
    'Ausmalbilder-Sammlung', 'Professionelle Vorlagen für jedes Thema',
  ],
  'chart-count': [
    'Bilddiagramme erstellen und auswerten', 'Daten visuell darstellen und verstehen lernen',
    'Diagramm-Übungen in drei Stufen', 'Vom einfachen Zählen zur Dateninterpretation',
    'Zählen und grafisch darstellen (1-5)', 'Diagramme lesen und interpretieren', 'Mehrere Kategorien vergleichen',
    'Datenverständnis beginnt mit Bildern',
    'Diagramm-Spaß!', 'Visuelles Datenlernen',
    'Bilddiagramm-Sammlung', 'Fertige Daten-Arbeitsblätter für Zuhause und Schule',
  ],
  matching: [
    'Bilder-Zuordnungsübungen', 'Zusammengehörendes visuell erkennen und zuordnen',
    'Zuordnung in drei Schwierigkeitsstufen', 'Vom einfachen Paar zur komplexen Zuordnung',
    'Einfache 3-Paar-Zuordnung', 'Mittlere 5-Paar-Zuordnung', 'Fortgeschrittene 8+ Paare',
    'Zuordnung fördert Konzentration und Logik',
    'Paare finden!', 'Visuelles Zuordnen',
    'Zuordnungs-Arbeitsblattsammlung', 'Klare Layouts für kognitive Übungen',
  ],
  'grid-match': [
    'Raster-Zuordnungsrätsel', 'Bilder im Gitter logisch richtig positionieren',
    'Raster-Rätsel in drei Stufen', 'Von einfachen bis zu komplexen Gittern',
    'Einfache 2×2-Raster', 'Mittlere 3×3-Raster', 'Fortgeschrittene 4×4-Raster',
    'Raster-Rätsel schulen räumliches Denken',
    'Raster lösen!', 'Gitter-Puzzle-Spaß',
    'Raster-Rätsel-Sammlung', 'Fertige Logik-Rätsel für räumliches Denken',
  ],
  'shadow-match': [
    'Schatten-Zuordnungsrätsel', 'Den richtigen Schatten zu jedem Bild finden',
    'Schattenrätsel in drei Stufen', 'Von einfachen bis zu gedrehten Schatten',
    'Einfache Schatten zuordnen', 'Gedrehte Schattenbilder', 'Komplexe Schattenrätsel',
    'Schattenrätsel schärfen die Beobachtungsgabe',
    'Schatten finden!', 'Schatten-Rätsel',
    'Schatten-Zuordnungssammlung', 'Herausfordernde Arbeitsblätter für scharfe Augen',
  ],
  bingo: [
    'Bilder-Bingo-Karten gestalten', 'Thematische Bingokarten zum Ausdrucken und Spielen',
    'Bingo in drei Kartengrößen', 'Von einfachen bis vollständigen Bingokarten',
    'Einfaches 3×3-Bingo', '4×4 Bilder-Bingo', '5×5 Vollständiges Bingo',
    'Bingo macht gemeinsames Lernen zum Spaß',
    'BINGO!', 'Bilder-Bingo-Spaß',
    'Bingo-Kartensammlung', 'Fertige Bingokarten für Gruppen und Klassen',
  ],
  'picture-sort': [
    'Bilder nach Kategorien sortieren', 'Einteilen und klassifizieren mit bunten Bildern',
    'Sortierübungen in drei Stufen', 'Von 2 Kategorien bis zur komplexen Einteilung',
    '2-Kategorien-Sortierung', '3-Kategorien-Sortierung', '4+ Kategorien-Herausforderungen',
    'Sortieren lehrt logische Strukturierung',
    'Sortieren!', 'Ordnung-Rätsel',
    'Sortier-Arbeitsblattsammlung', 'Fertige Klassifizierungsübungen für Zuhause und Schule',
  ],
  'missing-pieces': [
    'Fehlende Puzzleteile entdecken', 'Das richtige fehlende Teil zu jedem Bild finden',
    'Puzzles in drei Schwierigkeitsstufen', 'Von einfachen bis zu komplexen visuellen Rätseln',
    'Einfache fehlende Teile', 'Mehrteilige Puzzles', 'Komplexe visuelle Rätsel',
    'Puzzles stärken visuelles Denken',
    'Was fehlt?', 'Puzzle-Detektiv',
    'Puzzle-Arbeitsblattsammlung', 'Spannende Suchaufgaben für aufmerksame Köpfe',
  ],
  'odd-one-out': [
    'Das Andere finden', 'Welches Bild gehört nicht in die Gruppe?',
    'Unterschiede finden in drei Stufen', 'Von einfachen bis zu kniffligen Reihen',
    'Einfache 3er-Gruppen', 'Mittlere 4er-Gruppen', 'Fortgeschrittene 6+ Bilder',
    'Unterschiede erkennen stärkt das logische Denken',
    'Was passt nicht?', 'Adlerauge-Rätsel',
    'Logik-Rätsel-Sammlung', 'Fertige Übungen für aufmerksames Beobachten',
  ],
  sudoku: [
    'Bilder-Sudoku-Rätsel', 'Logik-Rätsel mit Bildern statt Zahlen lösen',
    'Sudoku in drei Schwierigkeitsstufen', 'Vom kleinen Raster zur großen Herausforderung',
    'Einfaches 4×4 Bilder-Sudoku', 'Mittlere 6×6-Raster', 'Schwere 9×9-Raster',
    'Sudoku trainiert logisches Denken spielerisch',
    'Sudoku lösen!', 'Bilder-Logik-Spaß',
    'Bilder-Sudoku-Sammlung', 'Fertige Logik-Rätsel zum Gehirntraining',
  ],
  'picture-path': [
    'Bilderpfade verfolgen', 'Den richtigen Weg durch das Bilder-Labyrinth finden',
    'Pfadsuche in drei Stufen', 'Von geraden Wegen bis zum komplexen Labyrinth',
    'Einfache gerade Pfade', 'Verzweigte Wege', 'Komplexe Labyrinth-Pfade',
    'Wegfindung fördert räumliches Denken',
    'Weg finden!', 'Labyrinth-Spaß',
    'Bilderpfad-Sammlung', 'Spannende Labyrinthe für kleine Entdecker',
  ],
  'find-and-count': [
    'Suchen und Zählen Aktivitäten', 'Versteckte Bilder in bunten Szenen finden und zählen',
    'Suchbilder in drei Stufen', 'Vom einfachen Finden zur komplexen Szene',
    '3-5 Objekte finden', 'Bis zu 10 Dinge zählen', 'Fortgeschrittene Mehrfach-Zählszenen',
    'Suchen und Zählen macht aufmerksam',
    'Ich sehe was!', 'Such- und Zähl-Spaß',
    'Such-und-Zähl-Sammlung', 'Liebevoll gestaltete Szenen zum Suchen',
  ],
  'find-objects': [
    'Versteckte Objekte aufspüren', 'Detaillierte Suchbilder für scharfe Augen',
    'Suchbilder in drei Schwierigkeitsstufen', 'Von offensichtlich bis raffiniert versteckt',
    'Einfache versteckte Objekte', 'Mittelschwere Szenensuche', 'Komplexe Suchherausforderungen',
    'Aufmerksames Suchen wird belohnt',
    'Alle finden!', 'Suchbild-Abenteuer',
    'Suchbilder-Sammlung', 'Professionelle Szenen zum aufmerksamen Betrachten',
  ],
  crossword: [
    'Bilderkreuzworträtsel', 'Bilderhinweise lösen und Wörter ins Gitter eintragen',
    'Kreuzworträtsel in drei Stufen', 'Vom kleinen Rätsel zum großen Wort-Gitter',
    'Einfache 5-Wort-Rätsel', 'Mittlere 10-Wort-Rätsel', 'Fortgeschrittene 15+ Wort-Gitter',
    'Kreuzworträtsel erweitern spielerisch den Wortschatz',
    'Kreuzwort-Spaß!', 'Wörter-Gitter-Rätsel',
    'Kreuzworträtsel-Sammlung', 'Fertige Worträtsel für Wortschatztraining',
  ],
  'treasure-hunt': [
    'Schatzsuche mit Karten', 'Hinweise lesen, Richtungen folgen und den Schatz finden',
    'Schatzsuchaktivitäten in drei Stufen', 'Vom einfachen Gitter zur mehrstufigen Jagd',
    'Einfache Gitterkarten', 'Richtungsbasierte Schatzkarten', 'Komplexe mehrstufige Jagden',
    'Jede Schatzsuche ist ein Abenteuer',
    'Schatz suchen!', 'Karten-Abenteuer',
    'Schatzsuche-Sammlung', 'Fertige Kartenabenteuer für kleine Entdecker',
  ],
};

// ─── French tool text (33 apps × 12-element tuples) ───
// [heroH, heroSub, tieredH, tieredSub, t1Desc, t2Desc, t3Desc, trophy, spotH, spotTag, galH, galSub]

type FrTextTuple = [string, string, string, string, string, string, string, string, string, string, string, string];

const frToolText: Record<string, FrTextTuple> = {
  'image-addition': [
    'Addition en images pour jeunes apprenants', 'Fiches thématiques colorées qui rendent l\'addition intuitive',
    'Progression structurée par niveaux', 'Des fiches adaptées à chaque rythme d\'apprentissage',
    'Compter des images thématiques et additionner jusqu\'à 5', 'Groupes d\'images mélangées avec sommes jusqu\'à 10', 'Combiner images et nombres jusqu\'à 20',
    'Progressez à votre rythme avec les maths visuelles',
    'Le calcul en couleurs !', 'Maîtriser l\'addition visuelle',
    'Collection de fiches d\'addition', 'Exercices prêts à imprimer pour la maison et la classe',
  ],
  'image-subtraction': [
    'Soustraction visuelle avec images', 'Fiches de soustraction pour un apprentissage progressif',
    'Exercices de soustraction progressifs', 'Des fiches qui évoluent avec les progrès de l\'enfant',
    'Barrer des images pour trouver le résultat (1-5)', 'Soustraction image-nombre jusqu\'à 10', 'Modes de soustraction mixtes jusqu\'à 20',
    'Gagnez en confiance avec chaque problème résolu',
    'Apprendre à soustraire !', 'Soustraire avec des images',
    'Collection de fiches de soustraction', 'Exercices pour tous les niveaux de difficulté',
  ],
  'code-addition': [
    'Déchiffrage de codes par addition', 'Résoudre des calculs pour découvrir des mots secrets',
    'Exercices de déchiffrage progressifs', 'Des calculs adaptés au niveau de chaque élève',
    'Codes d\'addition simples (1-5)', 'Codes intermédiaires avec sommes jusqu\'à 10', 'Codes à plusieurs étapes jusqu\'à 20',
    'Déchiffrer des codes renforce les compétences en maths',
    'Déchiffrer les codes !', 'Maths + Mystère',
    'Collection de fiches de déchiffrage', 'Puzzles prêts à imprimer pour la maison et l\'école',
  ],
  'more-less': [
    'Comparaison visuelle de quantités', 'Fiches colorées pour reconnaître plus, moins et égal',
    'Exercices de comparaison par niveaux', 'Activités progressives pour une compréhension solide des quantités',
    'Identifier simplement le plus grand groupe (1-5)', 'Comparer des groupes thématiques jusqu\'à 10', 'Maîtriser plus grand, plus petit et égal',
    'Les compétences de comparaison construisent les bases mathématiques',
    'Comparer les quantités !', 'Compréhension visuelle des nombres',
    'Collection de fiches de comparaison', 'Mises en page claires pour tous types de comparaisons',
  ],
  'math-puzzle': [
    'Puzzles d\'images par le calcul', 'Résoudre des calculs pour révéler des images d\'animaux cachées',
    'Puzzles en trois niveaux de difficulté', 'De la grille simple au puzzle complexe',
    'Grilles simples 3×3 avec addition', 'Puzzles thématiques avec opérations mixtes', 'Grilles complexes avec de plus grands nombres',
    'Chaque puzzle résolu révèle une surprise',
    'Résoudre le puzzle !', 'Maths et images amusantes',
    'Collection de puzzles mathématiques', 'Grilles stimulantes pour calculer et découvrir',
  ],
  'math-worksheet': [
    'Équations visuelles avec des images', 'Apprendre les concepts algébriques avec de mignonnes images d\'animaux',
    'Des équations pour chaque niveau', 'De l\'image simple à l\'équation complexe',
    'Équations d\'images simples (1-5)', 'Équations thématiques jusqu\'à 10', 'Équations d\'images à plusieurs étapes jusqu\'à 20',
    'Construire la pensée algébrique dès le début',
    'Équations en images !', 'Apprentissage visuel de l\'algèbre',
    'Collection de fiches d\'équations', 'Exercices prêts pour l\'apprentissage visuel de l\'algèbre',
  ],
  'alphabet-train': [
    'Activité du train de l\'alphabet', 'Reconnaître et associer les lettres avec des exercices de découpage de train',
    'Apprentissage des lettres en trois niveaux', 'De la reconnaissance à l\'association autonome',
    'Associer les majuscules A-M', 'Alphabet complet avec images thématiques', 'Associer majuscules et minuscules',
    'Sur le train de l\'alphabet, apprendre devient une aventure',
    'Train ABC !', 'Aventure des lettres',
    'Collection du train de l\'alphabet', 'Fiches de découpage prêtes pour l\'apprentissage des lettres',
  ],
  prepositions: [
    'Mots de position avec des images', 'Sur, sous, à côté — les prépositions visuelles et amusantes',
    'Exercices de prépositions en trois niveaux', 'Du vocabulaire de base à la description complexe',
    'Mots spatiaux de base : sur, dans, sous', 'Vocabulaire élargi avec scènes thématiques', 'Relations spatiales complexes et phrases',
    'Les mots de position enrichissent l\'expression',
    'Où est-ce ?', 'Apprendre les mots de position',
    'Collection de fiches de prépositions', 'Exercices prêts pour le vocabulaire spatial',
  ],
  'word-guess': [
    'Devinettes de mots avec indices en images', 'Compléter les lettres manquantes grâce aux indices visuels',
    'Devinettes en trois niveaux de difficulté', 'Du mot simple au puzzle créatif',
    'Mots simples de 3-4 lettres', 'Vocabulaire thématique avec 2+ lettres manquantes', 'Mots plus longs avec listes personnalisées',
    'Chaque devinette résolue renforce le vocabulaire',
    'Deviner les mots !', 'Devinettes en images',
    'Collection de devinettes de mots', 'Exercices motivants pour le vocabulaire',
  ],
  'word-scramble': [
    'Puzzles de lettres mélangées', 'Remettre en ordre les lettres mélangées à l\'aide d\'images',
    'Lettres mélangées en trois niveaux', 'Du puzzle simple au défi orthographique',
    'Mots simples de 3-4 lettres', 'Mots thématiques de 5-6 lettres', 'Mots plus longs et listes personnalisées',
    'Les lettres mélangées améliorent l\'orthographe',
    'Ordonner les lettres !', 'Mots en désordre',
    'Collection de lettres mélangées', 'Exercices d\'orthographe prêts à imprimer',
  ],
  'word-search': [
    'Mots cachés dans la grille', 'Trouver des mots cachés dans des grilles thématiques',
    'Mots cachés en trois niveaux de difficulté', 'De la petite grille au grand défi',
    'Grilles simples 6×6', 'Grilles moyennes 10×10', 'Grilles avancées 15×15',
    'Chaque mot trouvé enrichit le vocabulaire',
    'Chercher des mots !', 'Aventure de mots cachés',
    'Collection de mots cachés', 'Grilles de mots cachés prêtes pour chaque thème',
  ],
  cryptogram: [
    'Puzzles de cryptogrammes en images', 'Substitution de lettres avec des images thématiques',
    'Cryptogrammes en trois niveaux', 'Du code simple au puzzle complexe',
    'Codes de lettres simples', 'Chiffrements intermédiaires', 'Cryptogrammes avancés',
    'Déchiffrer des codes aiguise l\'esprit',
    'Déchiffrer les codes !', 'Écriture secrète amusante',
    'Collection de cryptogrammes', 'Puzzles logiques prêts à imprimer',
  ],
  writing: [
    'Fiches d\'exercices d\'écriture', 'Apprendre à écrire lettres et mots avec des lignes de guidage',
    'Exercices d\'écriture en trois niveaux', 'Du traçage à l\'écriture autonome',
    'Pratique de traçage', 'Écriture guidée des lettres', 'Écriture autonome',
    'Une belle écriture commence par la pratique',
    'Pratiquer l\'écriture !', 'Maîtrise des lettres',
    'Collection d\'exercices d\'écriture', 'Fiches d\'écriture avec lignes de guidage',
  ],
  'big-small': [
    'Comparaison visuelle des tailles', 'Reconnaître grand et petit avec des images colorées',
    'Exercices de tailles en trois niveaux', 'De la comparaison simple à l\'ordre de grandeur',
    'Simple : grand vs. petit', 'Ordonner par taille', 'Comparaisons complexes de tailles',
    'La compréhension des tailles renforce la pensée mathématique',
    'Grand ou petit ?', 'Comparer les tailles',
    'Collection de comparaisons de tailles', 'Fiches claires pour la compréhension des tailles',
  ],
  'pattern-train': [
    'Compléter les motifs sur le train', 'Reconnaître les motifs d\'images et compléter les wagons',
    'Exercices de motifs en trois niveaux', 'Du motif AB simple au motif ABCD complexe',
    'Motifs AB simples', 'Chaînes de motifs ABC', 'Motifs ABCD complexes',
    'La reconnaissance de motifs est la base de la logique',
    'Continuer le motif !', 'Amusement avec les motifs du train',
    'Collection de motifs de train', 'Exercices thématiques de motifs à imprimer',
  ],
  'pattern-worksheet': [
    'Reconnaître et continuer les motifs', 'Entraîner la pensée logique avec des motifs visuels',
    'Puzzles de motifs en trois niveaux', 'Du motif répétitif à la séquence complexe',
    'Motifs de répétition simples', 'Motifs croissants', 'Motifs mixtes complexes',
    'La reconnaissance de motifs ouvre les portes de la pensée logique',
    'Découvrir les motifs !', 'Entraînement logique aux motifs',
    'Collection de fiches de motifs', 'Exercices bien conçus pour la pensée visuelle',
  ],
  'draw-and-color': [
    'Dessin sur grille étape par étape', 'Reproduire des modèles et colorier de manière créative',
    'Exercices de dessin en trois niveaux', 'De la grille simple au dessin libre',
    'Copies de grille simples', 'Dessins de grille détaillés', 'Défis de dessin libre',
    'Le dessin développe la créativité et la motricité fine',
    'Reproduis-le !', 'Dessin créatif sur grille',
    'Collection de dessins sur grille', 'Exercices étape par étape pour chaque thème',
  ],
  'drawing-lines': [
    'Tracer et pratiquer les lignes', 'Entraîner la motricité fine avec différentes formes de lignes',
    'Exercices de lignes en trois niveaux', 'Des traits droits aux motifs complexes',
    'Tracer des lignes droites', 'Suivre des chemins courbes', 'Maîtriser des formes de lignes complexes',
    'La pratique des lignes prépare à l\'écriture',
    'Maîtriser les lignes !', 'Entraînement moteur',
    'Collection d\'exercices de lignes', 'Fiches progressives pour la motricité fine',
  ],
  coloring: [
    'Coloriages sur de nombreux thèmes', 'Modèles de coloriage professionnels pour la créativité et la détente',
    'Coloriages en trois niveaux de détail', 'Des contours simples aux scènes complexes',
    'Contours simples à colorier', 'Scènes thématiques détaillées', 'Motifs et designs complexes',
    'Le coloriage développe la créativité et la motricité fine',
    'Amusement colorié !', 'Découvrir les couleurs',
    'Collection de coloriages', 'Modèles professionnels pour chaque thème',
  ],
  'chart-count': [
    'Créer et interpréter des graphiques en images', 'Apprendre à représenter et comprendre les données visuellement',
    'Exercices de graphiques en trois niveaux', 'Du comptage simple à l\'interprétation des données',
    'Compter et représenter graphiquement (1-5)', 'Lire et interpréter des graphiques', 'Comparer plusieurs catégories',
    'La compréhension des données commence avec les images',
    'Amusement graphique !', 'Apprentissage visuel des données',
    'Collection de graphiques en images', 'Fiches de données prêtes pour la maison et l\'école',
  ],
  matching: [
    'Exercices d\'association d\'images', 'Reconnaître visuellement et associer ce qui va ensemble',
    'Association en trois niveaux de difficulté', 'De la paire simple à l\'association complexe',
    'Association simple de 3 paires', 'Association moyenne de 5 paires', 'Association avancée de 8+ paires',
    'L\'association développe la concentration et la logique',
    'Trouver les paires !', 'Association visuelle',
    'Collection de fiches d\'association', 'Mises en page claires pour les exercices cognitifs',
  ],
  'grid-match': [
    'Puzzles d\'association en grille', 'Positionner logiquement les images dans la grille',
    'Puzzles en grille en trois niveaux', 'Des grilles simples aux grilles complexes',
    'Grilles simples 2×2', 'Grilles moyennes 3×3', 'Grilles avancées 4×4',
    'Les puzzles en grille développent le raisonnement spatial',
    'Résoudre la grille !', 'Amusement puzzle en grille',
    'Collection de puzzles en grille', 'Puzzles logiques prêts pour le raisonnement spatial',
  ],
  'shadow-match': [
    'Puzzles d\'association d\'ombres', 'Quelle ombre correspond à quelle image ?',
    'Association d\'ombres en trois niveaux', 'Des ombres simples aux ombres tournées',
    'Paires d\'ombres simples', 'Images d\'ombres tournées', 'Puzzles d\'ombres complexes',
    'Les puzzles d\'ombres aiguisent l\'observation',
    'Trouver l\'ombre !', 'Puzzles d\'ombres',
    'Collection d\'association d\'ombres', 'Fiches stimulantes pour le sens de l\'observation',
  ],
  bingo: [
    'Créer des cartes de loto d\'images', 'Cartes de loto thématiques à imprimer et jouer',
    'Loto en trois tailles de cartes', 'Des cartes simples aux cartes complètes pour différents âges',
    'Loto simple 3×3', 'Loto d\'images 4×4', 'Cartes de loto complètes 5×5',
    'Le loto rend l\'apprentissage en groupe amusant',
    'LOTO !', 'Amusement loto en images',
    'Collection de cartes de loto', 'Cartes thématiques prêtes pour les activités de groupe et de classe',
  ],
  'picture-sort': [
    'Trier les images par catégories', 'Classer et catégoriser avec des images colorées',
    'Exercices de tri en trois niveaux', 'De 2 catégories à la classification complexe',
    'Tri en 2 catégories', 'Tri en 3 catégories', 'Défis de 4+ catégories',
    'Trier enseigne la structuration logique',
    'Trier !', 'Puzzle d\'ordre',
    'Collection de fiches de tri', 'Exercices de classification prêts pour la maison et l\'école',
  ],
  'missing-pieces': [
    'Découvrir les pièces manquantes', 'Trouver la bonne pièce manquante de chaque image',
    'Puzzles en trois niveaux de difficulté', 'Des puzzles visuels simples aux complexes',
    'Pièces manquantes simples', 'Puzzles à plusieurs pièces', 'Puzzles visuels complexes',
    'Les puzzles renforcent la pensée visuelle',
    'Qu\'est-ce qui manque ?', 'Détective de puzzles',
    'Collection de fiches de puzzles', 'Exercices de recherche stimulants pour les esprits attentifs',
  ],
  'odd-one-out': [
    'Trouver l\'intrus', 'Quelle image n\'appartient pas au groupe ?',
    'Trouver les différences en trois niveaux', 'Des séries simples aux séries complexes',
    'Groupes simples de 3', 'Groupes moyens de 4', 'Avancé : 6+ images',
    'Reconnaître les différences renforce la pensée logique',
    'Lequel ne va pas ?', 'Puzzle œil de lynx',
    'Collection de puzzles logiques', 'Exercices prêts pour une observation attentive',
  ],
  sudoku: [
    'Puzzles de sudoku en images', 'Puzzles logiques avec des images au lieu de chiffres',
    'Sudoku en trois niveaux de difficulté', 'De la petite grille au grand défi',
    'Sudoku en images simple 4×4', 'Grilles moyennes 6×6', 'Grilles difficiles 9×9',
    'Le sudoku entraîne la pensée logique en s\'amusant',
    'Résoudre le sudoku !', 'Logique en images amusante',
    'Collection de sudoku en images', 'Puzzles logiques prêts pour l\'entraînement cérébral',
  ],
  'picture-path': [
    'Suivre les chemins en images', 'Trouver le bon chemin à travers le labyrinthe d\'images',
    'Recherche de chemins en trois niveaux', 'Des chemins droits aux labyrinthes complexes',
    'Chemins droits simples', 'Chemins ramifiés', 'Chemins de labyrinthe complexes',
    'La recherche de chemins développe le sens de l\'orientation',
    'Trouver le chemin !', 'Amusement labyrinthe',
    'Collection de chemins en images', 'Labyrinthes passionnants pour les petits explorateurs',
  ],
  'find-and-count': [
    'Activités de recherche et de comptage', 'Trouver et compter les images cachées dans des scènes colorées',
    'Images de recherche en trois niveaux', 'De la recherche simple à la scène complexe',
    'Trouver 3-5 objets', 'Compter jusqu\'à 10 objets', 'Scènes avancées à comptage multiple',
    'Chercher et compter rend attentif',
    'Je vois !', 'Amusement de recherche et de comptage',
    'Collection de recherche et de comptage', 'Scènes joliment conçues pour chercher',
  ],
  'find-objects': [
    'Trouver les objets cachés', 'Images de recherche détaillées pour les yeux de lynx',
    'Images de recherche en trois niveaux de difficulté', 'Du visible à l\'astucieusement caché',
    'Objets cachés simples', 'Recherche de scènes intermédiaires', 'Défis de recherche complexes',
    'La recherche attentive est récompensée',
    'Tous les trouver !', 'Aventure d\'images de recherche',
    'Collection d\'images de recherche', 'Scènes professionnelles pour une observation attentive',
  ],
  crossword: [
    'Mots croisés en images', 'Résoudre les indices en images et remplir la grille',
    'Mots croisés en trois niveaux', 'Du petit puzzle à la grande grille de mots',
    'Mots croisés simples de 5 mots', 'Puzzles moyens de 10 mots', 'Grilles avancées de 15+ mots',
    'Les mots croisés enrichissent le vocabulaire en s\'amusant',
    'Amusement mots croisés !', 'Puzzle de grille de mots',
    'Collection de mots croisés', 'Grilles de mots prêtes pour l\'entraînement du vocabulaire',
  ],
  'treasure-hunt': [
    'Chasse au trésor avec des cartes', 'Lire les indices, suivre les directions et trouver le trésor',
    'Activités de chasse au trésor en trois niveaux', 'De la grille simple à la chasse à plusieurs étapes',
    'Cartes en grille simples', 'Cartes au trésor directionnelles', 'Chasses complexes à plusieurs étapes',
    'Chaque chasse au trésor est une aventure',
    'Chercher le trésor !', 'Aventure sur la carte',
    'Collection de chasses au trésor', 'Aventures de cartes prêtes pour les petits explorateurs',
  ],
};

// ─── Spanish tool text (33 apps × 12-element tuples) ───
// [heroH, heroSub, tieredH, tieredSub, t1Desc, t2Desc, t3Desc, trophy, spotH, spotTag, galH, galSub]

type EsTextTuple = [string, string, string, string, string, string, string, string, string, string, string, string];

const esToolText: Record<string, EsTextTuple> = {
  'image-addition': [
    'Suma con imágenes para jóvenes aprendices', 'Hojas temáticas coloridas que hacen la suma intuitiva',
    'Progresión estructurada por niveles', 'Hojas adaptadas a cada ritmo de aprendizaje',
    'Contar imágenes temáticas y sumar hasta 5', 'Grupos de imágenes mixtas con sumas hasta 10', 'Combinar imágenes y números hasta 20',
    'Avanza a tu ritmo con matemáticas visuales',
    '¡El cálculo a todo color!', 'Domina la suma visual',
    'Colección de hojas de suma', 'Ejercicios listos para imprimir para casa y clase',
  ],
  'image-subtraction': [
    'Resta visual con imágenes', 'Hojas de resta para un aprendizaje progresivo',
    'Ejercicios de resta progresivos', 'Hojas que evolucionan con el progreso del niño',
    'Tachar imágenes para encontrar el resultado (1-5)', 'Resta imagen-número hasta 10', 'Modos de resta mixtos hasta 20',
    'Gana confianza con cada problema resuelto',
    '¡Aprende a restar!', 'Restar con imágenes',
    'Colección de hojas de resta', 'Ejercicios para todos los niveles de dificultad',
  ],
  'code-addition': [
    'Descifrado de códigos con suma', 'Resuelve operaciones para descubrir palabras secretas',
    'Ejercicios de descifrado progresivos', 'Operaciones adaptadas al nivel de cada alumno',
    'Códigos de suma simples (1-5)', 'Códigos intermedios con sumas hasta 10', 'Códigos de varios pasos hasta 20',
    'Descifrar códigos refuerza las habilidades matemáticas',
    '¡Descifrar códigos!', 'Matemáticas + Misterio',
    'Colección de hojas de descifrado', 'Puzzles listos para imprimir para casa y escuela',
  ],
  'more-less': [
    'Comparación visual de cantidades', 'Hojas coloridas para reconocer más, menos e igual',
    'Ejercicios de comparación por niveles', 'Actividades progresivas para una comprensión sólida de cantidades',
    'Identificar simplemente el grupo mayor (1-5)', 'Comparar grupos temáticos hasta 10', 'Dominar mayor que, menor que e igual',
    'Las habilidades de comparación construyen las bases matemáticas',
    '¡Compara cantidades!', 'Comprensión numérica visual',
    'Colección de hojas de comparación', 'Diseños claros para todo tipo de comparaciones',
  ],
  'math-puzzle': [
    'Puzzles de imágenes con cálculo', 'Resuelve operaciones para revelar imágenes de animales ocultas',
    'Puzzles en tres niveles de dificultad', 'De la cuadrícula simple al puzzle complejo',
    'Cuadrículas simples 3×3 con suma', 'Puzzles temáticos con operaciones mixtas', 'Cuadrículas complejas con números mayores',
    'Cada puzzle resuelto revela una sorpresa',
    '¡Resuelve el puzzle!', 'Matemáticas e imágenes divertidas',
    'Colección de puzzles matemáticos', 'Cuadrículas estimulantes para calcular y descubrir',
  ],
  'math-worksheet': [
    'Ecuaciones visuales con imágenes', 'Aprender conceptos algebraicos con lindas imágenes de animales',
    'Ecuaciones para cada nivel', 'De la imagen simple a la ecuación compleja',
    'Ecuaciones de imágenes simples (1-5)', 'Ecuaciones temáticas hasta 10', 'Ecuaciones de imágenes de varios pasos hasta 20',
    'El pensamiento algebraico comienza con imágenes',
    '¡Ecuaciones con imágenes!', 'Aprendizaje visual del álgebra',
    'Colección de hojas de ecuaciones', 'Ejercicios listos para el aprendizaje visual del álgebra',
  ],
  'alphabet-train': [
    'Actividad del tren del alfabeto', 'Reconocer y asociar letras con ejercicios de recorte del tren',
    'Aprendizaje de letras en tres niveles', 'Del reconocimiento a la asociación autónoma',
    'Asociar mayúsculas A-M', 'Alfabeto completo con imágenes temáticas', 'Asociar mayúsculas y minúsculas',
    'En el tren del alfabeto, aprender es una aventura',
    '¡Tren ABC!', 'Aventura de letras',
    'Colección del tren del alfabeto', 'Hojas de recorte listas para el aprendizaje de letras',
  ],
  prepositions: [
    'Palabras de posición con imágenes', 'Sobre, debajo, al lado — preposiciones visuales y divertidas',
    'Ejercicios de preposiciones en tres niveles', 'Del vocabulario básico a la descripción compleja',
    'Palabras espaciales básicas: sobre, en, debajo', 'Vocabulario ampliado con escenas temáticas', 'Relaciones espaciales complejas y oraciones',
    'Las palabras de posición enriquecen la expresión',
    '¿Dónde está?', 'Aprende palabras de posición',
    'Colección de hojas de preposiciones', 'Ejercicios listos para el vocabulario espacial',
  ],
  'word-guess': [
    'Adivinanzas de palabras con pistas de imágenes', 'Completar las letras que faltan gracias a pistas visuales',
    'Adivinanzas en tres niveles de dificultad', 'De la palabra simple al puzzle creativo',
    'Palabras simples de 3-4 letras', 'Vocabulario temático con 2+ letras faltantes', 'Palabras más largas con listas personalizadas',
    'Cada adivinanza resuelta fortalece el vocabulario',
    '¡Adivina las palabras!', 'Adivinanzas con imágenes',
    'Colección de adivinanzas de palabras', 'Ejercicios motivadores para el vocabulario',
  ],
  'word-scramble': [
    'Puzzles de letras revueltas', 'Reordenar las letras revueltas con la ayuda de imágenes',
    'Letras revueltas en tres niveles', 'Del puzzle simple al desafío ortográfico',
    'Palabras simples de 3-4 letras', 'Palabras temáticas de 5-6 letras', 'Palabras más largas y listas personalizadas',
    'Las letras revueltas mejoran la ortografía',
    '¡Ordena las letras!', 'Palabras desordenadas',
    'Colección de letras revueltas', 'Ejercicios de ortografía listos para imprimir',
  ],
  'word-search': [
    'Sopa de letras en la cuadrícula', 'Encontrar palabras ocultas en cuadrículas temáticas',
    'Sopa de letras en tres niveles de dificultad', 'De la cuadrícula pequeña al gran desafío',
    'Cuadrículas simples 6×6', 'Cuadrículas medianas 10×10', 'Cuadrículas avanzadas 15×15',
    'Cada palabra encontrada enriquece el vocabulario',
    '¡Busca las palabras!', 'Aventura de sopa de letras',
    'Colección de sopas de letras', 'Sopas de letras listas para cada tema',
  ],
  cryptogram: [
    'Puzzles de criptogramas con imágenes', 'Sustitución de letras con imágenes temáticas',
    'Criptogramas en tres niveles', 'Del código simple al puzzle complejo',
    'Códigos de letras simples', 'Cifrados intermedios', 'Criptogramas avanzados',
    'Descifrar códigos agudiza la mente',
    '¡Descifra los códigos!', 'Escritura secreta divertida',
    'Colección de criptogramas', 'Puzzles lógicos listos para imprimir',
  ],
  writing: [
    'Hojas de ejercicios de escritura', 'Aprender a escribir letras y palabras con líneas de guía',
    'Ejercicios de escritura en tres niveles', 'Del trazado a la escritura autónoma',
    'Práctica de trazado', 'Escritura guiada de letras', 'Escritura autónoma',
    'Una buena escritura comienza con la práctica',
    '¡Practica la escritura!', 'Dominio de las letras',
    'Colección de ejercicios de escritura', 'Hojas de escritura con líneas de guía',
  ],
  'big-small': [
    'Comparación visual de tamaños', 'Reconocer grande y pequeño con imágenes coloridas',
    'Ejercicios de tamaños en tres niveles', 'De la comparación simple al orden de tamaño',
    'Simple: grande vs. pequeño', 'Ordenar por tamaño', 'Comparaciones de tamaños complejas',
    'La comparación de tamaños construye las bases matemáticas',
    '¿Grande o pequeño?', 'Compara los tamaños',
    'Colección de comparaciones de tamaños', 'Hojas claras para la comprensión de tamaños',
  ],
  'pattern-train': [
    'Completar los patrones en el tren', 'Reconocer patrones de imágenes y completar los vagones',
    'Ejercicios de patrones en tres niveles', 'Del patrón AB simple al patrón ABCD complejo',
    'Patrones AB simples', 'Cadenas de patrones ABC', 'Patrones ABCD complejos',
    'El reconocimiento de patrones es la base de la lógica',
    '¡Continúa el patrón!', 'Diversión con patrones del tren',
    'Colección de patrones del tren', 'Ejercicios temáticos de patrones para imprimir',
  ],
  'pattern-worksheet': [
    'Reconocer y continuar patrones', 'Entrenar el pensamiento lógico con patrones visuales',
    'Puzzles de patrones en tres niveles', 'Del patrón repetitivo a la secuencia compleja',
    'Patrones de repetición simples', 'Patrones crecientes', 'Patrones mixtos complejos',
    'El reconocimiento de patrones abre las puertas al pensamiento lógico',
    '¡Descubre los patrones!', 'Entrenamiento lógico de patrones',
    'Colección de hojas de patrones', 'Ejercicios bien diseñados para el pensamiento visual',
  ],
  'draw-and-color': [
    'Dibujo en cuadrícula paso a paso', 'Reproducir modelos y colorear de forma creativa',
    'Ejercicios de dibujo en tres niveles', 'De la cuadrícula simple al dibujo libre',
    'Copias de cuadrícula simples', 'Dibujos de cuadrícula detallados', 'Desafíos de dibujo libre',
    'El dibujo desarrolla la creatividad y la motricidad fina',
    '¡Reprodúcelo!', 'Dibujo creativo en cuadrícula',
    'Colección de dibujos en cuadrícula', 'Ejercicios paso a paso para cada tema',
  ],
  'drawing-lines': [
    'Trazar y practicar líneas', 'Entrenar la motricidad fina con diferentes formas de líneas',
    'Ejercicios de líneas en tres niveles', 'De trazos rectos a patrones complejos',
    'Trazar líneas rectas', 'Seguir caminos curvos', 'Dominar formas de líneas complejas',
    'La práctica de líneas prepara a los niños para la escritura',
    '¡Domina las líneas!', 'Entrenamiento motor',
    'Colección de ejercicios de líneas', 'Hojas progresivas para la motricidad fina',
  ],
  coloring: [
    'Páginas para colorear de muchos temas', 'Plantillas de colorear profesionales para la creatividad y la relajación',
    'Colorear en tres niveles de detalle', 'De contornos simples a escenas complejas',
    'Contornos simples para colorear', 'Escenas temáticas detalladas', 'Patrones y diseños complejos',
    'Colorear desarrolla la concentración, la creatividad y la motricidad',
    '¡Diversión coloreando!', 'Descubre los colores',
    'Colección de páginas para colorear', 'Plantillas profesionales para cada tema',
  ],
  'chart-count': [
    'Crear e interpretar gráficos con imágenes', 'Aprender a representar y comprender datos visualmente',
    'Ejercicios de gráficos en tres niveles', 'Del conteo simple a la interpretación de datos',
    'Contar y representar gráficamente (1-5)', 'Leer e interpretar gráficos', 'Comparar múltiples categorías',
    'La comprensión de datos comienza con las imágenes',
    '¡Gráficos divertidos!', 'Aprendizaje visual de datos',
    'Colección de gráficos con imágenes', 'Hojas de datos listas para casa y escuela',
  ],
  matching: [
    'Ejercicios de asociación de imágenes', 'Reconocer visualmente y asociar lo que va junto',
    'Asociación en tres niveles de dificultad', 'De la pareja simple a la asociación compleja',
    'Asociación simple de 3 parejas', 'Asociación media de 5 parejas', 'Asociación avanzada de 8+ parejas',
    'La asociación desarrolla la concentración y la lógica',
    '¡Encuentra las parejas!', 'Asociación visual',
    'Colección de hojas de asociación', 'Diseños claros para ejercicios cognitivos',
  ],
  'grid-match': [
    'Puzzles de asociación en cuadrícula', 'Posicionar lógicamente las imágenes en la cuadrícula',
    'Puzzles de cuadrícula en tres niveles', 'De cuadrículas simples a cuadrículas complejas',
    'Cuadrículas simples 2×2', 'Cuadrículas medias 3×3', 'Cuadrículas avanzadas 4×4',
    'Los puzzles de cuadrícula desarrollan el razonamiento espacial',
    '¡Resuelve la cuadrícula!', 'Diversión con puzzles de cuadrícula',
    'Colección de puzzles de cuadrícula', 'Puzzles lógicos listos para el razonamiento espacial',
  ],
  'shadow-match': [
    'Puzzles de asociación de sombras', '¿Qué sombra corresponde a qué imagen?',
    'Asociación de sombras en tres niveles', 'De sombras simples a sombras rotadas',
    'Parejas de sombras simples', 'Imágenes de sombras rotadas', 'Puzzles de sombras complejos',
    'Los puzzles de sombras agudizan la observación',
    '¡Encuentra la sombra!', 'Puzzles de sombras',
    'Colección de asociación de sombras', 'Hojas estimulantes para la capacidad de observación',
  ],
  bingo: [
    'Crea tarjetas de bingo con imágenes', 'Tarjetas de bingo temáticas para imprimir y jugar',
    'Bingo en tres tamaños de tarjetas', 'De tarjetas simples a tarjetas completas para diferentes edades',
    'Bingo simple 3×3', 'Bingo de imágenes 4×4', 'Tarjetas de bingo completas 5×5',
    'El bingo convierte el aprendizaje grupal en diversión',
    '¡BINGO!', 'Diversión de bingo con imágenes',
    'Colección de tarjetas de bingo', 'Tarjetas temáticas listas para actividades grupales y de clase',
  ],
  'picture-sort': [
    'Clasificar imágenes por categorías', 'Ordenar y categorizar con imágenes coloridas',
    'Ejercicios de clasificación en tres niveles', 'De 2 categorías a la clasificación compleja',
    'Clasificación en 2 categorías', 'Clasificación en 3 categorías', 'Desafíos de 4+ categorías',
    'Clasificar enseña estructuración lógica',
    '¡Clasifica!', 'Puzzle de orden',
    'Colección de hojas de clasificación', 'Ejercicios de clasificación listos para casa y escuela',
  ],
  'missing-pieces': [
    'Descubre las piezas que faltan', 'Encontrar la pieza que falta en cada imagen',
    'Puzzles en tres niveles de dificultad', 'De puzzles visuales simples a complejos',
    'Piezas faltantes simples', 'Puzzles de varias piezas', 'Puzzles visuales complejos',
    'Los puzzles fortalecen el pensamiento visual',
    '¿Qué falta?', 'Detective de puzzles',
    'Colección de hojas de puzzles', 'Ejercicios de búsqueda estimulantes para mentes atentas',
  ],
  'odd-one-out': [
    'Encuentra el diferente', '¿Qué imagen no pertenece al grupo?',
    'Encuentra las diferencias en tres niveles', 'De series simples a series complejas',
    'Grupos simples de 3', 'Grupos medios de 4', 'Avanzado: 6+ imágenes',
    'Reconocer las diferencias fortalece el pensamiento lógico',
    '¿Cuál no va?', 'Puzzle ojo de águila',
    'Colección de puzzles lógicos', 'Ejercicios listos para la observación atenta',
  ],
  sudoku: [
    'Puzzles de sudoku con imágenes', 'Puzzles lógicos con imágenes en lugar de números',
    'Sudoku en tres niveles de dificultad', 'De la cuadrícula pequeña al gran desafío',
    'Sudoku de imágenes simple 4×4', 'Cuadrículas medias 6×6', 'Cuadrículas difíciles 9×9',
    'El sudoku entrena el pensamiento lógico de forma divertida',
    '¡Resuelve el sudoku!', 'Lógica con imágenes divertida',
    'Colección de sudoku con imágenes', 'Puzzles lógicos listos para el entrenamiento cerebral',
  ],
  'picture-path': [
    'Sigue los caminos de imágenes', 'Encontrar el camino correcto a través del laberinto de imágenes',
    'Búsqueda de caminos en tres niveles', 'De caminos rectos a laberintos complejos',
    'Caminos rectos simples', 'Caminos ramificados', 'Caminos de laberinto complejos',
    'La búsqueda de caminos desarrolla el sentido de la orientación',
    '¡Encuentra el camino!', 'Diversión de laberinto',
    'Colección de caminos de imágenes', 'Laberintos emocionantes para pequeños exploradores',
  ],
  'find-and-count': [
    'Actividades de buscar y contar', 'Encontrar y contar imágenes ocultas en escenas coloridas',
    'Imágenes de búsqueda en tres niveles', 'De la búsqueda simple a la escena compleja',
    'Encontrar 3-5 objetos', 'Contar hasta 10 objetos', 'Escenas avanzadas de conteo múltiple',
    'Buscar y contar hace estar atento',
    '¡Veo veo!', 'Diversión de buscar y contar',
    'Colección de buscar y contar', 'Escenas bellamente diseñadas para buscar',
  ],
  'find-objects': [
    'Encontrar objetos ocultos', 'Imágenes de búsqueda detalladas para ojos de lince',
    'Imágenes de búsqueda en tres niveles de dificultad', 'De lo visible a lo astutamente oculto',
    'Objetos ocultos simples', 'Búsqueda de escenas intermedias', 'Desafíos de búsqueda complejos',
    'La búsqueda atenta es recompensada',
    '¡Encuéntralos todos!', 'Aventura de imágenes de búsqueda',
    'Colección de imágenes de búsqueda', 'Escenas profesionales para la observación atenta',
  ],
  crossword: [
    'Crucigramas con imágenes', 'Resolver las pistas de imágenes y completar la cuadrícula',
    'Crucigramas en tres niveles', 'Del pequeño puzzle a la gran cuadrícula de palabras',
    'Crucigramas simples de 5 palabras', 'Puzzles intermedios de 10 palabras', 'Cuadrículas avanzadas de 15+ palabras',
    'Los crucigramas enriquecen el vocabulario de forma divertida',
    '¡Crucigramas divertidos!', 'Puzzle de cuadrícula de palabras',
    'Colección de crucigramas', 'Cuadrículas de palabras listas para el entrenamiento de vocabulario',
  ],
  'treasure-hunt': [
    'Búsqueda del tesoro con mapas', 'Lee las pistas, sigue las direcciones y encuentra el tesoro',
    'Actividades de búsqueda del tesoro en tres niveles', 'De la cuadrícula simple a la búsqueda de varios pasos',
    'Mapas de cuadrícula simples', 'Mapas del tesoro con direcciones', 'Búsquedas complejas de varios pasos',
    'Cada búsqueda del tesoro es una aventura',
    '¡Busca el tesoro!', 'Aventura en el mapa',
    'Colección de búsquedas del tesoro', 'Aventuras de mapas listas para pequeños exploradores',
  ],
};


// ─── Portuguese tool text (33 apps × 12-element tuples) ───
// [heroH, heroSub, tieredH, tieredSub, t1Desc, t2Desc, t3Desc, trophy, spotH, spotTag, galH, galSub]

const ptToolText: Record<string, EsTextTuple> = {
  'image-addition': [
    'Adição com imagens para jovens aprendizes', 'Folhas temáticas coloridas que tornam a adição intuitiva',
    'Progressão estruturada por níveis', 'Folhas adaptadas a cada ritmo de aprendizagem',
    'Contar imagens temáticas e somar até 5', 'Grupos de imagens mistas com somas até 10', 'Combinar imagens e números até 20',
    'Avança ao teu ritmo com matemática visual',
    'O cálculo a todo cor!', 'Domina a adição visual',
    'Coleção de folhas de adição', 'Exercícios prontos para imprimir para casa e escola',
  ],
  'image-subtraction': [
    'Subtração visual com imagens', 'Folhas de subtração para uma aprendizagem progressiva',
    'Exercícios de subtração progressivos', 'Folhas que evoluem com o progresso da criança',
    'Riscar imagens para encontrar o resultado (1-5)', 'Subtração imagem-número até 10', 'Modos de subtração mistos até 20',
    'Ganha confiança com cada problema resolvido',
    'Aprende a subtrair!', 'Subtrair com imagens',
    'Coleção de folhas de subtração', 'Exercícios para todos os níveis de dificuldade',
  ],
  'code-addition': [
    'Decifração de códigos com adição', 'Resolve operações para descobrir palavras secretas',
    'Exercícios de decifração progressivos', 'Operações adaptadas ao nível de cada aluno',
    'Códigos de adição simples (1-5)', 'Códigos intermédios com somas até 10', 'Códigos de vários passos até 20',
    'Decifrar códigos reforça as competências matemáticas',
    'Decifrar códigos!', 'Matemática + Mistério',
    'Coleção de folhas de decifração', 'Puzzles prontos para imprimir para casa e escola',
  ],
  'more-less': [
    'Comparação visual de quantidades', 'Folhas coloridas para reconhecer mais, menos e igual',
    'Exercícios de comparação por níveis', 'Atividades progressivas para uma compreensão sólida de quantidades',
    'Identificar simplesmente o grupo maior (1-5)', 'Comparar grupos temáticos até 10', 'Dominar maior que, menor que e igual',
    'As competências de comparação constroem as bases matemáticas',
    'Compara quantidades!', 'Compreensão numérica visual',
    'Coleção de folhas de comparação', 'Designs claros para todo o tipo de comparações',
  ],
  'math-puzzle': [
    'Puzzles de imagens com cálculo', 'Resolve operações para revelar imagens de animais escondidas',
    'Puzzles em três níveis de dificuldade', 'Da grelha simples ao puzzle complexo',
    'Grelhas simples 3×3 com adição', 'Puzzles temáticos com operações mistas', 'Grelhas complexas com números maiores',
    'Cada puzzle resolvido revela uma surpresa',
    'Resolve o puzzle!', 'Matemática e imagens divertidas',
    'Coleção de puzzles matemáticos', 'Grelhas estimulantes para calcular e descobrir',
  ],
  'math-worksheet': [
    'Equações visuais com imagens', 'Aprender conceitos algébricos com imagens de animais adoráveis',
    'Equações para cada nível', 'Da imagem simples à equação complexa',
    'Equações de imagens simples (1-5)', 'Equações temáticas até 10', 'Equações de imagens de vários passos até 20',
    'O pensamento algébrico começa com imagens',
    'Equações com imagens!', 'Aprendizagem visual da álgebra',
    'Coleção de folhas de equações', 'Exercícios prontos para a aprendizagem visual da álgebra',
  ],
  'alphabet-train': [
    'Atividade do comboio do alfabeto', 'Reconhecer e associar letras com exercícios de recorte do comboio',
    'Aprendizagem de letras em três níveis', 'Do reconhecimento à associação autónoma',
    'Associar maiúsculas A-M', 'Alfabeto completo com imagens temáticas', 'Associar maiúsculas e minúsculas',
    'No comboio do alfabeto, aprender é uma aventura',
    'Comboio ABC!', 'Aventura de letras',
    'Coleção do comboio do alfabeto', 'Folhas de recorte prontas para a aprendizagem de letras',
  ],
  prepositions: [
    'Palavras de posição com imagens', 'Sobre, debaixo, ao lado — preposições visuais e divertidas',
    'Exercícios de preposições em três níveis', 'Do vocabulário básico à descrição complexa',
    'Palavras espaciais básicas: sobre, em, debaixo', 'Vocabulário alargado com cenas temáticas', 'Relações espaciais complexas e frases',
    'As palavras de posição enriquecem a expressão',
    'Onde está?', 'Aprende palavras de posição',
    'Coleção de folhas de preposições', 'Exercícios prontos para o vocabulário espacial',
  ],
  'word-guess': [
    'Adivinhações de palavras com pistas de imagens', 'Completar as letras em falta graças a pistas visuais',
    'Adivinhações em três níveis de dificuldade', 'Da palavra simples ao puzzle criativo',
    'Palavras simples de 3-4 letras', 'Vocabulário temático com 2+ letras em falta', 'Palavras mais longas com listas personalizadas',
    'Cada adivinhação resolvida fortalece o vocabulário',
    'Adivinha as palavras!', 'Adivinhações com imagens',
    'Coleção de adivinhações de palavras', 'Exercícios motivadores para o vocabulário',
  ],
  'word-scramble': [
    'Puzzles de letras embaralhadas', 'Reordenar as letras embaralhadas com a ajuda de imagens',
    'Letras embaralhadas em três níveis', 'Do puzzle simples ao desafio ortográfico',
    'Palavras simples de 3-4 letras', 'Palavras temáticas de 5-6 letras', 'Palavras mais longas e listas personalizadas',
    'As letras embaralhadas melhoram a ortografia',
    'Ordena as letras!', 'Palavras desordenadas',
    'Coleção de letras embaralhadas', 'Exercícios de ortografia prontos para imprimir',
  ],
  'word-search': [
    'Caça-palavras na grelha', 'Encontrar palavras escondidas em grelhas temáticas',
    'Caça-palavras em três níveis de dificuldade', 'Da grelha pequena ao grande desafio',
    'Grelhas simples 6×6', 'Grelhas médias 10×10', 'Grelhas avançadas 15×15',
    'Cada palavra encontrada enriquece o vocabulário',
    'Procura as palavras!', 'Aventura de caça-palavras',
    'Coleção de caça-palavras', 'Caça-palavras prontas para cada tema',
  ],
  cryptogram: [
    'Puzzles de criptogramas com imagens', 'Substituição de letras com imagens temáticas',
    'Criptogramas em três níveis', 'Do código simples ao puzzle complexo',
    'Códigos de letras simples', 'Cifras intermédias', 'Criptogramas avançados',
    'Decifrar códigos aguça a mente',
    'Decifra os códigos!', 'Escrita secreta divertida',
    'Coleção de criptogramas', 'Puzzles lógicos prontos para imprimir',
  ],
  writing: [
    'Folhas de exercícios de escrita', 'Aprender a escrever letras e palavras com linhas de guia',
    'Exercícios de escrita em três níveis', 'Do traçado à escrita autónoma',
    'Prática de traçado', 'Escrita guiada de letras', 'Escrita autónoma',
    'Uma boa escrita começa com a prática',
    'Pratica a escrita!', 'Domínio das letras',
    'Coleção de exercícios de escrita', 'Folhas de escrita com linhas de guia',
  ],
  'big-small': [
    'Comparação visual de tamanhos', 'Reconhecer grande e pequeno com imagens coloridas',
    'Exercícios de tamanhos em três níveis', 'Da comparação simples à ordem de tamanho',
    'Simples: grande vs. pequeno', 'Ordenar por tamanho', 'Comparações de tamanhos complexas',
    'A comparação de tamanhos constrói as bases matemáticas',
    'Grande ou pequeno?', 'Compara os tamanhos',
    'Coleção de comparações de tamanhos', 'Folhas claras para a compreensão de tamanhos',
  ],
  'pattern-train': [
    'Completar os padrões no comboio', 'Reconhecer padrões de imagens e completar os vagões',
    'Exercícios de padrões em três níveis', 'Do padrão AB simples ao padrão ABCD complexo',
    'Padrões AB simples', 'Cadeias de padrões ABC', 'Padrões ABCD complexos',
    'O reconhecimento de padrões é a base da lógica',
    'Continua o padrão!', 'Diversão com padrões do comboio',
    'Coleção de padrões do comboio', 'Exercícios temáticos de padrões para imprimir',
  ],
  'pattern-worksheet': [
    'Reconhecer e continuar padrões', 'Treinar o pensamento lógico com padrões visuais',
    'Puzzles de padrões em três níveis', 'Do padrão repetitivo à sequência complexa',
    'Padrões de repetição simples', 'Padrões crescentes', 'Padrões mistos complexos',
    'O reconhecimento de padrões abre as portas ao pensamento lógico',
    'Descobre os padrões!', 'Treino lógico de padrões',
    'Coleção de folhas de padrões', 'Exercícios bem desenhados para o pensamento visual',
  ],
  'draw-and-color': [
    'Desenho em grelha passo a passo', 'Reproduzir modelos e colorir de forma criativa',
    'Exercícios de desenho em três níveis', 'Da grelha simples ao desenho livre',
    'Cópias de grelha simples', 'Desenhos de grelha detalhados', 'Desafios de desenho livre',
    'O desenho desenvolve a criatividade e a motricidade fina',
    'Reproduz!', 'Desenho criativo em grelha',
    'Coleção de desenhos em grelha', 'Exercícios passo a passo para cada tema',
  ],
  'drawing-lines': [
    'Traçar e praticar linhas', 'Treinar a motricidade fina com diferentes formas de linhas',
    'Exercícios de linhas em três níveis', 'De traços retos a padrões complexos',
    'Traçar linhas retas', 'Seguir caminhos curvos', 'Dominar formas de linhas complexas',
    'A prática de linhas prepara as crianças para a escrita',
    'Domina as linhas!', 'Treino motor',
    'Coleção de exercícios de linhas', 'Folhas progressivas para a motricidade fina',
  ],
  coloring: [
    'Páginas para colorir de muitos temas', 'Modelos de colorir profissionais para a criatividade e o relaxamento',
    'Colorir em três níveis de detalhe', 'De contornos simples a cenas complexas',
    'Contornos simples para colorir', 'Cenas temáticas detalhadas', 'Padrões e designs complexos',
    'Colorir desenvolve a concentração, a criatividade e a motricidade',
    'Diversão a colorir!', 'Descobre as cores',
    'Coleção de páginas para colorir', 'Modelos profissionais para cada tema',
  ],
  'chart-count': [
    'Criar e interpretar gráficos com imagens', 'Aprender a representar e compreender dados visualmente',
    'Exercícios de gráficos em três níveis', 'Da contagem simples à interpretação de dados',
    'Contar e representar graficamente (1-5)', 'Ler e interpretar gráficos', 'Comparar múltiplas categorias',
    'A compreensão de dados começa com as imagens',
    'Gráficos divertidos!', 'Aprendizagem visual de dados',
    'Coleção de gráficos com imagens', 'Folhas de dados prontas para casa e escola',
  ],
  matching: [
    'Exercícios de associação de imagens', 'Reconhecer visualmente e associar o que combina',
    'Associação em três níveis de dificuldade', 'Do par simples à associação complexa',
    'Associação simples de 3 pares', 'Associação média de 5 pares', 'Associação avançada de 8+ pares',
    'A associação desenvolve a concentração e a lógica',
    'Encontra os pares!', 'Associação visual',
    'Coleção de folhas de associação', 'Designs claros para exercícios cognitivos',
  ],
  'grid-match': [
    'Puzzles de associação em grelha', 'Posicionar logicamente as imagens na grelha',
    'Puzzles de grelha em três níveis', 'De grelhas simples a grelhas complexas',
    'Grelhas simples 2×2', 'Grelhas médias 3×3', 'Grelhas avançadas 4×4',
    'Os puzzles de grelha desenvolvem o raciocínio espacial',
    'Resolve a grelha!', 'Diversão com puzzles de grelha',
    'Coleção de puzzles de grelha', 'Puzzles lógicos prontos para o raciocínio espacial',
  ],
  'shadow-match': [
    'Puzzles de associação de sombras', 'Que sombra corresponde a que imagem?',
    'Associação de sombras em três níveis', 'De sombras simples a sombras rodadas',
    'Pares de sombras simples', 'Imagens de sombras rodadas', 'Puzzles de sombras complexos',
    'Os puzzles de sombras aguçam a observação',
    'Encontra a sombra!', 'Puzzles de sombras',
    'Coleção de associação de sombras', 'Folhas estimulantes para a capacidade de observação',
  ],
  bingo: [
    'Cria cartões de bingo com imagens', 'Cartões de bingo temáticos para imprimir e jogar',
    'Bingo em três tamanhos de cartões', 'De cartões simples a cartões completos para diferentes idades',
    'Bingo simples 3×3', 'Bingo de imagens 4×4', 'Cartões de bingo completos 5×5',
    'O bingo transforma a aprendizagem em grupo em diversão',
    'BINGO!', 'Diversão de bingo com imagens',
    'Coleção de cartões de bingo', 'Cartões temáticos prontos para atividades de grupo e de turma',
  ],
  'picture-sort': [
    'Classificar imagens por categorias', 'Ordenar e categorizar com imagens coloridas',
    'Exercícios de classificação em três níveis', 'De 2 categorias à classificação complexa',
    'Classificação em 2 categorias', 'Classificação em 3 categorias', 'Desafios de 4+ categorias',
    'Classificar ensina estruturação lógica',
    'Classifica!', 'Puzzle de ordem',
    'Coleção de folhas de classificação', 'Exercícios de classificação prontos para casa e escola',
  ],
  'missing-pieces': [
    'Descobre as peças em falta', 'Encontrar a peça que falta em cada imagem',
    'Puzzles em três níveis de dificuldade', 'De puzzles visuais simples a complexos',
    'Peças em falta simples', 'Puzzles de várias peças', 'Puzzles visuais complexos',
    'Os puzzles fortalecem o pensamento visual',
    'O que falta?', 'Detetive de puzzles',
    'Coleção de folhas de puzzles', 'Exercícios de busca estimulantes para mentes atentas',
  ],
  'odd-one-out': [
    'Encontra o diferente', 'Que imagem não pertence ao grupo?',
    'Encontra as diferenças em três níveis', 'De séries simples a séries complexas',
    'Grupos simples de 3', 'Grupos médios de 4', 'Avançado: 6+ imagens',
    'Reconhecer as diferenças fortalece o pensamento lógico',
    'Qual não pertence?', 'Puzzle olho de águia',
    'Coleção de puzzles lógicos', 'Exercícios prontos para a observação atenta',
  ],
  sudoku: [
    'Puzzles de sudoku com imagens', 'Puzzles lógicos com imagens em vez de números',
    'Sudoku em três níveis de dificuldade', 'Da grelha pequena ao grande desafio',
    'Sudoku de imagens simples 4×4', 'Grelhas médias 6×6', 'Grelhas difíceis 9×9',
    'O sudoku treina o pensamento lógico de forma divertida',
    'Resolve o sudoku!', 'Lógica com imagens divertida',
    'Coleção de sudoku com imagens', 'Puzzles lógicos prontos para o treino cerebral',
  ],
  'picture-path': [
    'Segue os caminhos de imagens', 'Encontrar o caminho correto através do labirinto de imagens',
    'Busca de caminhos em três níveis', 'De caminhos retos a labirintos complexos',
    'Caminhos retos simples', 'Caminhos ramificados', 'Caminhos de labirinto complexos',
    'A busca de caminhos desenvolve o sentido de orientação',
    'Encontra o caminho!', 'Diversão de labirinto',
    'Coleção de caminhos de imagens', 'Labirintos emocionantes para pequenos exploradores',
  ],
  'find-and-count': [
    'Atividades de procurar e contar', 'Encontrar e contar imagens escondidas em cenas coloridas',
    'Imagens de pesquisa em três níveis', 'Da pesquisa simples à cena complexa',
    'Encontrar 3-5 objetos', 'Contar até 10 objetos', 'Cenas avançadas de contagem múltipla',
    'Procurar e contar torna-nos atentos',
    'Vejo, vejo!', 'Diversão de procurar e contar',
    'Coleção de procurar e contar', 'Cenas lindamente desenhadas para procurar',
  ],
  'find-objects': [
    'Encontrar objetos escondidos', 'Imagens de pesquisa detalhadas para olhos de lince',
    'Imagens de pesquisa em três níveis de dificuldade', 'Do visível ao astutamente escondido',
    'Objetos escondidos simples', 'Pesquisa de cenas intermédias', 'Desafios de pesquisa complexos',
    'A pesquisa atenta é recompensada',
    'Encontra-os todos!', 'Aventura de imagens de pesquisa',
    'Coleção de imagens de pesquisa', 'Cenas profissionais para a observação atenta',
  ],
  crossword: [
    'Palavras cruzadas com imagens', 'Resolver as pistas de imagens e completar a grelha',
    'Palavras cruzadas em três níveis', 'Do pequeno puzzle à grande grelha de palavras',
    'Palavras cruzadas simples de 5 palavras', 'Puzzles intermédios de 10 palavras', 'Grelhas avançadas de 15+ palavras',
    'As palavras cruzadas enriquecem o vocabulário de forma divertida',
    'Palavras cruzadas divertidas!', 'Puzzle de grelha de palavras',
    'Coleção de palavras cruzadas', 'Grelhas de palavras prontas para o treino de vocabulário',
  ],
  'treasure-hunt': [
    'Caça ao tesouro com mapas', 'Lê as pistas, segue as direções e encontra o tesouro',
    'Atividades de caça ao tesouro em três níveis', 'Da grelha simples à caça de vários passos',
    'Mapas de grelha simples', 'Mapas do tesouro com direções', 'Caças complexas de vários passos',
    'Cada caça ao tesouro é uma aventura',
    'Procura o tesouro!', 'Aventura no mapa',
    'Coleção de caças ao tesouro', 'Aventuras de mapas prontas para pequenos exploradores',
  ],
};


// ─── Italian tool text (33 apps × 12-element tuples) ───
// [heroH, heroSub, tieredH, tieredSub, t1Desc, t2Desc, t3Desc, trophy, spotH, spotTag, galH, galSub]

const itToolText: Record<string, EsTextTuple> = {
  'image-addition': [
    'Pratica di addizione basata su immagini', 'Schede tematiche colorate che rendono l\'addizione chiara per i giovani studenti',
    'Progressione strutturata per livelli', 'Schede adattate a ogni ritmo di apprendimento',
    'Contare immagini tematiche e sommare fino a 5', 'Gruppi di immagini miste con somme fino a 10', 'Combinare immagini e numeri fino a 20',
    'Avanza al tuo ritmo con la matematica visiva',
    'Il calcolo a colori!', 'Padroneggia l\'addizione visiva',
    'Collezione di schede di addizione', 'Esercizi pronti da stampare per casa e scuola',
  ],
  'image-subtraction': [
    'Sottrazione visiva con immagini', 'Schede di sottrazione per un apprendimento progressivo',
    'Esercizi di sottrazione progressivi', 'Schede che evolvono con il progresso del bambino',
    'Cancellare immagini per trovare il risultato (1-5)', 'Sottrazione immagine-numero fino a 10', 'Modalità di sottrazione miste fino a 20',
    'Acquisisci sicurezza con ogni problema risolto',
    'Impara a sottrarre!', 'Sottrarre con le immagini',
    'Collezione di schede di sottrazione', 'Esercizi per tutti i livelli di difficoltà',
  ],
  'code-addition': [
    'Decifrare codici con l\'addizione', 'Risolvi operazioni per scoprire parole segrete',
    'Esercizi di decifratura progressivi', 'Operazioni adattate al livello di ogni alunno',
    'Codici di addizione semplici (1-5)', 'Codici intermedi con somme fino a 10', 'Codici a più passaggi fino a 20',
    'Decifrare codici rafforza le competenze matematiche',
    'Decifra i codici!', 'Matematica + Mistero',
    'Collezione di schede di decifratura', 'Puzzle pronti da stampare per casa e scuola',
  ],
  'more-less': [
    'Confronto visivo di quantità', 'Schede colorate per riconoscere di più, di meno e uguale',
    'Esercizi di confronto per livelli', 'Attività progressive per una comprensione solida delle quantità',
    'Identificare semplicemente il gruppo più grande (1-5)', 'Confrontare gruppi tematici fino a 10', 'Padroneggiare maggiore di, minore di e uguale',
    'Le competenze di confronto costruiscono le basi matematiche',
    'Confronta le quantità!', 'Comprensione numerica visiva',
    'Collezione di schede di confronto', 'Design chiari per ogni tipo di confronto',
  ],
  'math-puzzle': [
    'Puzzle con immagini e calcolo', 'Risolvi operazioni per rivelare immagini di animali nascoste',
    'Puzzle in tre livelli di difficoltà', 'Dalla griglia semplice al puzzle complesso',
    'Griglie semplici 3×3 con addizione', 'Puzzle tematici con operazioni miste', 'Griglie complesse con numeri più grandi',
    'Ogni puzzle risolto svela una sorpresa',
    'Risolvi il puzzle!', 'Matematica e immagini divertenti',
    'Collezione di puzzle matematici', 'Griglie stimolanti per calcolare e scoprire',
  ],
  'math-worksheet': [
    'Equazioni visive con immagini', 'Imparare concetti algebrici con adorabili immagini di animali',
    'Equazioni per ogni livello', 'Dall\'immagine semplice all\'equazione complessa',
    'Equazioni con immagini semplici (1-5)', 'Equazioni tematiche fino a 10', 'Equazioni con immagini a più passaggi fino a 20',
    'Il pensiero algebrico inizia con le immagini',
    'Equazioni con immagini!', 'Apprendimento visivo dell\'algebra',
    'Collezione di schede di equazioni', 'Esercizi pronti per l\'apprendimento visivo dell\'algebra',
  ],
  'alphabet-train': [
    'Attività del treno dell\'alfabeto', 'Riconoscere e associare lettere con esercizi di ritaglio del treno',
    'Apprendimento delle lettere in tre livelli', 'Dal riconoscimento all\'associazione autonoma',
    'Associare maiuscole A-M', 'Alfabeto completo con immagini tematiche', 'Associare maiuscole e minuscole',
    'Sul treno dell\'alfabeto, imparare è un\'avventura',
    'Treno ABC!', 'Avventura con le lettere',
    'Collezione del treno dell\'alfabeto', 'Schede di ritaglio pronte per l\'apprendimento delle lettere',
  ],
  prepositions: [
    'Parole di posizione con immagini', 'Sopra, sotto, accanto — preposizioni visive e divertenti',
    'Esercizi di preposizioni in tre livelli', 'Dal vocabolario base alla descrizione complessa',
    'Parole spaziali base: sopra, in, sotto', 'Vocabolario ampliato con scene tematiche', 'Relazioni spaziali complesse e frasi',
    'Le parole di posizione arricchiscono l\'espressione',
    'Dov\'è?', 'Impara le parole di posizione',
    'Collezione di schede di preposizioni', 'Esercizi pronti per il vocabolario spaziale',
  ],
  'word-guess': [
    'Indovinelli di parole con indizi di immagini', 'Completare le lettere mancanti grazie a indizi visivi',
    'Indovinelli in tre livelli di difficoltà', 'Dalla parola semplice al puzzle creativo',
    'Parole semplici di 3-4 lettere', 'Vocabolario tematico con 2+ lettere mancanti', 'Parole più lunghe con liste personalizzate',
    'Ogni indovinello risolto rafforza il vocabolario',
    'Indovina le parole!', 'Indovinelli con immagini',
    'Collezione di indovinelli di parole', 'Esercizi motivanti per il vocabolario',
  ],
  'word-scramble': [
    'Puzzle di lettere mescolate', 'Riordinare le lettere mescolate con l\'aiuto di immagini',
    'Lettere mescolate in tre livelli', 'Dal puzzle semplice alla sfida ortografica',
    'Parole semplici di 3-4 lettere', 'Parole tematiche di 5-6 lettere', 'Parole più lunghe e liste personalizzate',
    'Le lettere mescolate migliorano l\'ortografia',
    'Ordina le lettere!', 'Parole disordinate',
    'Collezione di lettere mescolate', 'Esercizi di ortografia pronti da stampare',
  ],
  'word-search': [
    'Cerca parole nella griglia', 'Trovare parole nascoste in griglie tematiche',
    'Cerca parole in tre livelli di difficoltà', 'Dalla griglia piccola alla grande sfida',
    'Griglie semplici 6×6', 'Griglie medie 10×10', 'Griglie avanzate 15×15',
    'Ogni parola trovata arricchisce il vocabolario',
    'Cerca le parole!', 'Avventura di cerca parole',
    'Collezione di cerca parole', 'Cerca parole pronte per ogni tema',
  ],
  cryptogram: [
    'Puzzle di crittogrammi con immagini', 'Sostituzione di lettere con immagini tematiche',
    'Crittogrammi in tre livelli', 'Dal codice semplice al puzzle complesso',
    'Codici di lettere semplici', 'Cifre intermedie', 'Crittogrammi avanzati',
    'Decifrare codici affina la mente',
    'Decifra i codici!', 'Scrittura segreta divertente',
    'Collezione di crittogrammi', 'Puzzle logici pronti da stampare',
  ],
  writing: [
    'Schede di esercizi di scrittura', 'Imparare a scrivere lettere e parole con linee guida',
    'Esercizi di scrittura in tre livelli', 'Dal ricalco alla scrittura autonoma',
    'Pratica di ricalco', 'Scrittura guidata di lettere', 'Scrittura autonoma',
    'Una bella scrittura inizia con la pratica',
    'Pratica la scrittura!', 'Padronanza delle lettere',
    'Collezione di esercizi di scrittura', 'Schede di scrittura con linee guida',
  ],
  'big-small': [
    'Confronto visivo di dimensioni', 'Riconoscere grande e piccolo con immagini colorate',
    'Esercizi di dimensioni in tre livelli', 'Dal confronto semplice all\'ordinamento per dimensione',
    'Semplice: grande vs. piccolo', 'Ordinare per dimensione', 'Confronti di dimensioni complessi',
    'Il confronto di dimensioni costruisce le basi matematiche',
    'Grande o piccolo?', 'Confronta le dimensioni',
    'Collezione di confronti di dimensioni', 'Schede chiare per la comprensione delle dimensioni',
  ],
  'pattern-train': [
    'Completare i pattern nel treno', 'Riconoscere pattern di immagini e completare i vagoni',
    'Esercizi di pattern in tre livelli', 'Dal pattern AB semplice al pattern ABCD complesso',
    'Pattern AB semplici', 'Catene di pattern ABC', 'Pattern ABCD complessi',
    'Il riconoscimento dei pattern è la base della logica',
    'Continua il pattern!', 'Divertimento con i pattern del treno',
    'Collezione di pattern del treno', 'Esercizi tematici di pattern pronti da stampare',
  ],
  'pattern-worksheet': [
    'Riconoscere e continuare i pattern', 'Allenare il pensiero logico con pattern visivi',
    'Puzzle di pattern in tre livelli', 'Dal pattern ripetitivo alla sequenza complessa',
    'Pattern di ripetizione semplici', 'Pattern crescenti', 'Pattern misti complessi',
    'Il riconoscimento dei pattern apre le porte al pensiero logico',
    'Scopri i pattern!', 'Allenamento logico di pattern',
    'Collezione di schede di pattern', 'Esercizi ben progettati per il pensiero visivo',
  ],
  'draw-and-color': [
    'Disegno su griglia passo dopo passo', 'Riprodurre modelli e colorare in modo creativo',
    'Esercizi di disegno in tre livelli', 'Dalla griglia semplice al disegno libero',
    'Copie di griglia semplici', 'Disegni di griglia dettagliati', 'Sfide di disegno libero',
    'Il disegno sviluppa la creatività e la motricità fine',
    'Riproduci!', 'Disegno creativo su griglia',
    'Collezione di disegni su griglia', 'Esercizi passo dopo passo per ogni tema',
  ],
  'drawing-lines': [
    'Tracciare e praticare linee', 'Allenare la motricità fine con diverse forme di linee',
    'Esercizi di linee in tre livelli', 'Da tratti dritti a pattern complessi',
    'Tracciare linee dritte', 'Seguire percorsi curvi', 'Padroneggiare forme di linee complesse',
    'La pratica delle linee prepara i bambini alla scrittura',
    'Padroneggia le linee!', 'Allenamento motorio',
    'Collezione di esercizi di linee', 'Schede progressive per la motricità fine',
  ],
  coloring: [
    'Pagine da colorare di molti temi', 'Modelli da colorare professionali per la creatività e il relax',
    'Colorare in tre livelli di dettaglio', 'Da contorni semplici a scene complesse',
    'Contorni semplici da colorare', 'Scene tematiche dettagliate', 'Pattern e design complessi',
    'Colorare sviluppa la concentrazione, la creatività e la motricità',
    'Divertimento a colorare!', 'Scopri i colori',
    'Collezione di pagine da colorare', 'Modelli professionali per ogni tema',
  ],
  'chart-count': [
    'Creare e interpretare grafici con immagini', 'Imparare a rappresentare e comprendere dati visivamente',
    'Esercizi di grafici in tre livelli', 'Dal conteggio semplice all\'interpretazione dei dati',
    'Contare e rappresentare graficamente (1-5)', 'Leggere e interpretare grafici', 'Confrontare più categorie',
    'La comprensione dei dati inizia con le immagini',
    'Grafici divertenti!', 'Apprendimento visivo dei dati',
    'Collezione di grafici con immagini', 'Schede di dati pronte per casa e scuola',
  ],
  matching: [
    'Esercizi di associazione di immagini', 'Riconoscere visivamente e associare ciò che corrisponde',
    'Associazione in tre livelli di difficoltà', 'Dalla coppia semplice all\'associazione complessa',
    'Associazione semplice di 3 coppie', 'Associazione media di 5 coppie', 'Associazione avanzata di 8+ coppie',
    'L\'associazione sviluppa la concentrazione e la logica',
    'Trova le coppie!', 'Associazione visiva',
    'Collezione di schede di associazione', 'Design chiari per esercizi cognitivi',
  ],
  'grid-match': [
    'Puzzle di associazione su griglia', 'Posizionare logicamente le immagini nella griglia',
    'Puzzle di griglia in tre livelli', 'Da griglie semplici a griglie complesse',
    'Griglie semplici 2×2', 'Griglie medie 3×3', 'Griglie avanzate 4×4',
    'I puzzle su griglia sviluppano il ragionamento spaziale',
    'Risolvi la griglia!', 'Divertimento con puzzle su griglia',
    'Collezione di puzzle su griglia', 'Puzzle logici pronti per il ragionamento spaziale',
  ],
  'shadow-match': [
    'Puzzle di associazione di ombre', 'Quale ombra corrisponde a quale immagine?',
    'Associazione di ombre in tre livelli', 'Da ombre semplici a ombre ruotate',
    'Coppie di ombre semplici', 'Immagini di ombre ruotate', 'Puzzle di ombre complessi',
    'I puzzle di ombre affinano l\'osservazione',
    'Trova l\'ombra!', 'Puzzle di ombre',
    'Collezione di associazione di ombre', 'Schede stimolanti per la capacità di osservazione',
  ],
  bingo: [
    'Crea cartelle di bingo con immagini', 'Cartelle di bingo tematiche da stampare e giocare',
    'Bingo in tre dimensioni di cartelle', 'Da cartelle semplici a cartelle complete per diverse età',
    'Bingo semplice 3×3', 'Bingo con immagini 4×4', 'Cartelle di bingo complete 5×5',
    'Il bingo trasforma l\'apprendimento di gruppo in divertimento',
    'BINGO!', 'Divertimento bingo con immagini',
    'Collezione di cartelle di bingo', 'Cartelle tematiche pronte per attività di gruppo e di classe',
  ],
  'picture-sort': [
    'Classificare immagini per categorie', 'Ordinare e categorizzare con immagini colorate',
    'Esercizi di classificazione in tre livelli', 'Da 2 categorie alla classificazione complessa',
    'Classificazione in 2 categorie', 'Classificazione in 3 categorie', 'Sfide di 4+ categorie',
    'Classificare insegna la strutturazione logica',
    'Classifica!', 'Puzzle di ordine',
    'Collezione di schede di classificazione', 'Esercizi di classificazione pronti per casa e scuola',
  ],
  'missing-pieces': [
    'Scopri i pezzi mancanti', 'Trovare il pezzo che manca in ogni immagine',
    'Puzzle in tre livelli di difficoltà', 'Da puzzle visivi semplici a complessi',
    'Pezzi mancanti semplici', 'Puzzle a più pezzi', 'Puzzle visivi complessi',
    'I puzzle rafforzano il pensiero visivo',
    'Cosa manca?', 'Detective dei puzzle',
    'Collezione di schede di puzzle', 'Esercizi di ricerca stimolanti per menti attente',
  ],
  'odd-one-out': [
    'Trova il diverso', 'Quale immagine non appartiene al gruppo?',
    'Trova le differenze in tre livelli', 'Da serie semplici a serie complesse',
    'Gruppi semplici di 3', 'Gruppi medi di 4', 'Avanzato: 6+ immagini',
    'Riconoscere le differenze rafforza il pensiero logico',
    'Quale non appartiene?', 'Puzzle occhio d\'aquila',
    'Collezione di puzzle logici', 'Esercizi pronti per l\'osservazione attenta',
  ],
  sudoku: [
    'Puzzle di sudoku con immagini', 'Puzzle logici con immagini al posto dei numeri',
    'Sudoku in tre livelli di difficoltà', 'Dalla griglia piccola alla grande sfida',
    'Sudoku con immagini semplice 4×4', 'Griglie medie 6×6', 'Griglie difficili 9×9',
    'Il sudoku allena il pensiero logico in modo divertente',
    'Risolvi il sudoku!', 'Logica con immagini divertente',
    'Collezione di sudoku con immagini', 'Puzzle logici pronti per l\'allenamento cerebrale',
  ],
  'picture-path': [
    'Segui i percorsi di immagini', 'Trovare il percorso giusto attraverso il labirinto di immagini',
    'Ricerca di percorsi in tre livelli', 'Da percorsi dritti a labirinti complessi',
    'Percorsi dritti semplici', 'Percorsi ramificati', 'Percorsi di labirinto complessi',
    'La ricerca di percorsi sviluppa il senso di orientamento',
    'Trova il percorso!', 'Divertimento nel labirinto',
    'Collezione di percorsi di immagini', 'Labirinti emozionanti per piccoli esploratori',
  ],
  'find-and-count': [
    'Attività di cercare e contare', 'Trovare e contare immagini nascoste in scene colorate',
    'Immagini di ricerca in tre livelli', 'Dalla ricerca semplice alla scena complessa',
    'Trovare 3-5 oggetti', 'Contare fino a 10 oggetti', 'Scene avanzate di conteggio multiplo',
    'Cercare e contare rende attenti',
    'Vedo, vedo!', 'Divertimento di cercare e contare',
    'Collezione di cercare e contare', 'Scene splendidamente disegnate per cercare',
  ],
  'find-objects': [
    'Trovare oggetti nascosti', 'Immagini di ricerca dettagliate per occhi di lince',
    'Immagini di ricerca in tre livelli di difficoltà', 'Dal visibile all\'astutamente nascosto',
    'Oggetti nascosti semplici', 'Ricerca di scene intermedie', 'Sfide di ricerca complesse',
    'La ricerca attenta è premiata',
    'Trovali tutti!', 'Avventura di immagini di ricerca',
    'Collezione di immagini di ricerca', 'Scene professionali per l\'osservazione attenta',
  ],
  crossword: [
    'Cruciverba con immagini', 'Risolvere gli indizi delle immagini e completare la griglia',
    'Cruciverba in tre livelli', 'Dal piccolo puzzle alla grande griglia di parole',
    'Cruciverba semplici da 5 parole', 'Puzzle intermedi da 10 parole', 'Griglie avanzate da 15+ parole',
    'I cruciverba arricchiscono il vocabolario in modo divertente',
    'Cruciverba divertenti!', 'Puzzle di griglia di parole',
    'Collezione di cruciverba', 'Griglie di parole pronte per l\'allenamento del vocabolario',
  ],
  'treasure-hunt': [
    'Caccia al tesoro con mappe', 'Leggi gli indizi, segui le direzioni e trova il tesoro',
    'Attività di caccia al tesoro in tre livelli', 'Dalla griglia semplice alla caccia a più passaggi',
    'Mappe a griglia semplici', 'Mappe del tesoro con direzioni', 'Cacce complesse a più passaggi',
    'Ogni caccia al tesoro è un\'avventura',
    'Cerca il tesoro!', 'Avventura sulla mappa',
    'Collezione di cacce al tesoro', 'Avventure di mappe pronte per piccoli esploratori',
  ],
};

const nlToolText: Record<string, FrTextTuple> = {
  'image-addition': ['Rekenen met plaatjes!', 'Professionele optelwerkbladen met themaplaatjes', 'Gedifferentieerd leren voor elk kind', 'Drie moeilijkheidsniveaus die meegroeien', 'Eenvoudig tellen (1-5)', 'Gemengde plaatjes tot 10', 'Gevorderde opgaven tot 20', 'Elk kind leert op eigen tempo', 'Optelpret!', 'Rekenen met plezier', 'Professionele werkbladen', 'Met zorg ontworpen materiaal'],
  'image-subtraction': ['Aftrekken wordt leuk!', 'Doorstrepen en vergelijken met themaplaatjes', 'Stap voor stap aftrekken', 'Drie niveaus van eenvoudig tot uitdagend', 'Plaatjes doorstrepen (1-5)', 'Plaatje-getal tot 10', 'Gemengde modi tot 20', 'Elke opgave bouwt vertrouwen', 'Aftrekpret!', 'Aftrekken is leuk', 'Professionele werkbladen', 'Heldere lay-outs voor leerlingen'],
  'code-addition': ['Kraak de code!', 'Los sommen op om berichten te ontcijferen', 'Van sommen tot geheime codes', 'Drie niveaus van codekraken', 'Eenvoudige codes (1-5)', 'Grotere sommen voor langere berichten', 'Meerstapscodes tot 20', 'Elke code versterkt rekenvertrouwen', 'Code kraken!', 'Rekenen ontmoet mysterie', 'Professionele codewerkbladen', 'Rekenen met puzzels combineren'],
  'more-less': ['Meer, minder of gelijk?', 'Hoeveelheden vergelijken met plaatjes', 'Vergelijkingen beheersen', 'Drie niveaus van vergelijking', 'Welke groep heeft meer (1-5)', 'Groepen tot 10 vergelijken', 'Groter/kleiner/gelijk', 'Vergelijken bouwt rekenbasis', 'Vergelijk het!', 'Meer of minder?', 'Vergelijkingswerkbladen', 'Visuele vergelijkingen'],
  'math-puzzle': ['Wiskundepuzzels!', 'Uitdagende rekenpuzzels met themaplaatjes', 'Van eenvoudig naar meesterbrein', 'Drie puzzelniveaus', 'Eenvoudige puzzels', 'Gemiddelde puzzels', 'Uitdagende puzzels', 'Elke puzzel scherpt het denken', 'Puzzelplezier!', 'Rekenen als puzzel', 'Rekenpuzzels', 'Uitdagend materiaal'],
  'math-worksheet': ['Rekenwerkbladen!', 'Professionele rekenoefeningen met themaplaatjes', 'Dagelijkse rekenoefening', 'Drie niveaus voor differentiatie', 'Basisoefeningen', 'Gemiddelde oefeningen', 'Gevorderde oefeningen', 'Dagelijks oefenen bouwt vertrouwen', 'Rekenpret!', 'Elke dag beter', 'Professionele werkbladen', 'Heldere lay-outs'],
  'alphabet-train': ['Instappen voor het ABC!', 'Letters herkennen met de alfabettrein', 'Van A tot Z', 'Drie niveaus van letterherkenning', 'Hoofdletters herkennen', 'Kleine letters koppelen', 'Complete alfabetoefening', 'Elke letter brengt dichter bij lezen', 'ABC-trein!', 'Letters leren is leuk', 'Alfabetwerkbladen', 'Kleurrijke treinwerkbladen'],
  'word-guess': ['Raad het woord!', 'Woordraadspelletjes met plaatjesaanwijzingen', 'Van eenvoudig naar uitdagend', 'Drie niveaus van woordraden', 'Eenvoudige woorden', 'Langere woorden', 'Uitdagende woorden', 'Elke gok versterkt woordenschat', 'Raad het!', 'Woorden ontdekken', 'Woordraadwerkbladen', 'Spannende woordpuzzels'],
  'word-scramble': ['Letterpuzzels!', 'Door elkaar gehusselde letters ordenen', 'Van eenvoudig naar complex', 'Drie niveaus van woordontwarring', 'Korte woorden (3-4 letters)', 'Gemiddelde woorden (5-6)', 'Lange woorden (7+)', 'Elke puzzel versterkt spelling', 'Letterzaak!', 'Ontwar de letters', 'Letterpuzzelwerkbladen', 'Spelling oefenen als spelletje'],
  'word-search': ['Vind de woorden!', 'Verborgen woorden zoeken in roosters', 'Van klein naar groot zoeken', 'Drie niveaus van woordzoekplezier', 'Klein rooster (6 woorden)', 'Gemiddeld rooster (10 woorden)', 'Groot rooster (15+ woorden)', 'Elk woord versterkt herkenning', 'Woordzoeker!', 'Zoek en vind', 'Woordzoekpuzzels', 'Thematische woordzoekers'],
  'big-small': ['Groot of klein?', 'Groottevergelijking met afbeeldingen', 'Maten vergelijken', 'Drie niveaus van groottebegrip', 'Duidelijke verschillen', 'Subtielere vergelijkingen', 'Complexe ordening', 'Vergelijken bouwt wiskundig denken', 'Groot & Klein!', 'Vergelijk de maten', 'Groottewerkbladen', 'Visuele vergelijkingen'],
  'pattern-train': ['Ontdek het patroon!', 'Patronen herkennen met de patroontrein', 'Van eenvoudig naar complex', 'Drie niveaus van patroonherkenning', 'AB-patronen', 'ABC-patronen', 'AABB-patronen', 'Patroonherkenning is rekenbasis', 'Patroontrein!', 'Volg het patroon', 'Patroonwerkbladen', 'Kleurrijke patronen'],
  'pattern-worksheet': ['Herken het patroon!', 'Patronen herkennen en voortzetten', 'Patroondenken ontwikkelen', 'Drie niveaus van patroonuitdaging', 'Eenvoudige AB-patronen', 'Gemiddelde ABC-patronen', 'Complexe patronen', 'Patronen zien is wiskundig denken', 'Patronenplezier!', 'Ontdek de regelmaat', 'Patroonwerkbladen', 'Systematisch oefenen'],
  'draw-and-color': ['Teken en kleur!', 'Stapsgewijs tekenen met themaplaatjes', 'Van eenvoudig naar gedetailleerd', 'Drie niveaus van tekenuitdaging', 'Eenvoudige vormen', 'Gedetailleerdere tekeningen', 'Creatieve creaties', 'Tekenen ontwikkelt fijne motoriek', 'Teken het!', 'Creatief bezig', 'Tekenwerkbladen', 'Stapsgewijze activiteiten'],
  'drawing-lines': ['Lijnen trekken!', 'Fijne motoriek met lijnactiviteiten', 'Van recht naar gebogen', 'Drie niveaus van lijnvaardigheid', 'Rechte lijnen', 'Gebogen lijnen', 'Complexe patronen', 'Lijnen bereidden voor op schrijven', 'Lijnenplezier!', 'Trek de lijn', 'Lijnwerkbladen', 'Schrijfvoorbereiding'],
  'chart-count': ['Gegevens worden leuk!', 'Plaatjesgrafieken maken en lezen', 'Data leren met plaatjes', 'Drie niveaus van grafiekvaardigheid', 'Eenvoudige grafieken', 'Meer categorieën', 'Complexe gegevensanalyse', 'Grafieken lezen is belangrijk', 'Grafiekenplezier!', 'Tellen en tekenen', 'Grafiekwerkbladen', 'Visuele gegevensverwerking'],
  'grid-match': ['Koppel het raster!', 'Rasterpuzzels met themaplaatjes', 'Van eenvoudig naar complex', 'Drie niveaus van rasterpuzzel', 'Eenvoudige herkenning', 'Gemiddelde puzzels', 'Complexe uitdagingen', 'Rasterpuzzels ontwikkelen ruimtelijk inzicht', 'Rasterpuzzel!', 'Denk in rasters', 'Rasterwerkbladen', 'Ruimtelijk denken'],
  'shadow-match': ['Vind de schaduw!', 'Schaduwen koppelen aan afbeeldingen', 'Van duidelijk naar subtiel', 'Drie niveaus van schaduwherkenning', 'Duidelijke schaduwen', 'Subtielere vormen', 'Uitdagende silhouetten', 'Schaduwkoppelen bereidt voor op lezen', 'Schaduwpret!', 'Koppel de schaduw', 'Schaduwwerkbladen', 'Visuele discriminatie'],
  'picture-sort': ['Sorteer het!', 'Afbeeldingen sorteren en categoriseren', 'Van eenvoudig naar complex', 'Drie niveaus van sorteeruitdaging', 'Twee categorieën', 'Drie categorieën', 'Complexe classificatie', 'Sorteren ontwikkelt logisch denken', 'Sorteerpret!', 'Indelen en ordenen', 'Sorteerwerkbladen', 'Classificatieactiviteiten'],
  'missing-pieces': ['Maak het af!', 'Ontbrekende stukjes vinden en invullen', 'Van eenvoudig naar complex', 'Drie niveaus van puzzeluitdaging', 'Duidelijk ontbrekend', 'Subtielere stukjes', 'Uitdagende puzzels', 'Puzzelen scherpt de waarneming', 'Puzzelpret!', 'Wat ontbreekt er?', 'Puzzelwerkbladen', 'Visuele logica'],
  'odd-one-out': ['Welke is anders?', 'De vreemde eend vinden', 'Van duidelijk naar subtiel', 'Drie niveaus van observatie', 'Duidelijk afwijkend', 'Subtielere verschillen', 'Complexe uitzonderingen', 'Observatie versterkt kritisch denken', 'Vreemde eend!', 'Vind het verschil', 'Observatiewerkbladen', 'Visueel redeneren'],
  'picture-path': ['Vind de weg!', 'Paden volgen en navigeren', 'Van eenvoudig naar complex', 'Drie niveaus van paduitdaging', 'Rechte paden', 'Bochtige paden', 'Complexe labyrinten', 'Paden volgen is probleemoplossing', 'Padavontuur!', 'Volg het spoor', 'Padwerkbladen', 'Navigatie-uitdagingen'],
  'find-and-count': ['Ik zie, ik zie!', 'Zoek en tel met kleurrijke scènes', 'Van weinig naar veel', 'Drie niveaus van zoek-en-tel', 'Tellen tot 5', 'Tellen tot 10', 'Tellen tot 20', 'Zoeken en tellen scherpt waarneming', 'Zoek & tel!', 'Hoeveel zie je?', 'Telwerkbladen', 'Visuele telactiviteiten'],
  'find-objects': ['Vind ze allemaal!', 'Verborgen voorwerpen in gedetailleerde scènes', 'Van eenvoudig naar complex', 'Drie niveaus van zoekuitdaging', 'Duidelijk zichtbaar', 'Gecamoufleerd', 'Uitdagend verborgen', 'Scherpe ogen ontwikkelen concentratie', 'Zoekpret!', 'Vind het voorwerp', 'Zoekwerkbladen', 'Concentratie-uitdagingen'],
  'treasure-hunt': ['Schattenjacht!', 'Kaartavonturen met verborgen schatten', 'Van eenvoudig naar complex', 'Drie niveaus van schatzoeken', 'Eenvoudige kaarten', 'Complexere kaarten', 'Uitdagende schatkaarten', 'Elke schat versterkt probleemoplossing', 'Schatzoeken!', 'Vind de schat', 'Schattenjachtwerkbladen', 'Kaartavonturen'],
  'bingo': ['BINGO!', 'Thematische bingokaarten voor de klas', 'Bingo voor elk thema', 'Drie niveaus van bingoplezier', 'Eenvoudige plaatjesbingo', 'Woordbingo', 'Gemengde uitdagingen', 'Bingo maakt leren een feestje', 'Bingopret!', 'Ogen op de kaart', 'Bingokaarten', 'Groepsactiviteiten'],
  'coloring': ['Kleur je wereld!', 'Kleurplaten met 100+ thema\'s', 'Kleuren voor iedereen', 'Van eenvoudig tot gedetailleerd', 'Grote vlakken', 'Gedetailleerde contouren', 'Fijne details', 'Kleuren ontwikkelt creativiteit', 'Kleurenpret!', 'Laat je creativiteit los', 'Kleurplaten', '100+ thema\'s'],
};

// ─── Generic tool localization function ───

// Locale-aware alt text templates for tool showcases
const toolAltTemplates: Record<string, {
  sample: (name: string, n: number) => string;
  tier: (name: string, tierName: string) => string;
  spotlight: (name: string) => string;
  gallery: (label: string) => string;
  answerKey: (label: string) => string;
}> = {
  de: {
    sample: (name, n) => `${name} — Arbeitsblatt Beispiel ${n}`,
    tier: (name, tierName) => `${name} — ${tierName} Arbeitsblatt`,
    spotlight: (name) => `${name} — Hervorgehobenes Arbeitsblatt`,
    gallery: (label) => `${label} — Professionelles Arbeitsblatt`,
    answerKey: (label) => `${label} — Lösungsschlüssel`,
  },
  fr: {
    sample: (name, n) => `${name} — Fiche exemple ${n}`,
    tier: (name, tierName) => `${name} — Fiche ${tierName}`,
    spotlight: (name) => `${name} — Fiche en vedette`,
    gallery: (label) => `${label} — Fiche professionnelle`,
    answerKey: (label) => `${label} — Corrigé`,
  },
  es: {
    sample: (name, n) => `${name} — Hoja de trabajo ejemplo ${n}`,
    tier: (name, tierName) => `${name} — Hoja de trabajo ${tierName}`,
    spotlight: (name) => `${name} — Hoja de trabajo destacada`,
    gallery: (label) => `${label} — Hoja de trabajo profesional`,
    answerKey: (label) => `${label} — Clave de respuestas`,
  },
  pt: {
    sample: (name, n) => `${name} — Folha de trabalho exemplo ${n}`,
    tier: (name, tierName) => `${name} — Folha de trabalho ${tierName}`,
    spotlight: (name) => `${name} — Folha de trabalho em destaque`,
    gallery: (label) => `${label} — Folha de trabalho profissional`,
    answerKey: (label) => `${label} — Chave de respostas`,
  },
  nl: {
    sample: (name, n) => `${name} — Werkblad voorbeeld ${n}`,
    tier: (name, tierName) => `${name} — ${tierName} werkblad`,
    spotlight: (name) => `${name} — Uitgelicht werkblad`,
    gallery: (label) => `${label} — Professioneel werkblad`,
    answerKey: (label) => `${label} — Antwoordsleutel`,
  },
};

function localizeToolShowcase(
  config: ToolShowcaseConfig,
  toolId: string,
  images: Record<string, { folder: string; imgs: string[]; answerKey: string }>,
  toolText: Record<string, FrTextTuple>,
  locale: string,
): ToolShowcaseConfig | null {
  const appKey = resolveAppKey(toolId);
  const gi = images[appKey];
  const dt = toolText[toolId];
  if (!gi || !dt) return null;

  const [heroH, heroSub, tieredH, tieredSub, t1Desc, t2Desc, t3Desc, trophy, spotH, spotTag, galH, galSub] = dt;
  const di = (filename: string) => imgUrl(gi.folder, filename, locale);
  const alt = toolAltTemplates[locale];

  return {
    hero: {
      ...config.hero,
      badge: t(config.hero.badge, locale),
      heading: heroH,
      subheading: heroSub,
      images: [
        { src: di(gi.imgs[0]), alt: alt ? alt.sample(heroH, 1) : config.hero.images[0]?.alt || '' },
        { src: di(gi.imgs[1]), alt: alt ? alt.sample(heroH, 2) : config.hero.images[1]?.alt || '' },
        { src: di(gi.imgs[2]), alt: alt ? alt.sample(heroH, 3) : config.hero.images[2]?.alt || '' },
      ],
      pills: tPills(config.hero.pills, locale),
    },
    tiered: {
      ...config.tiered,
      badge: t(config.tiered.badge, locale),
      heading: tieredH,
      subheading: tieredSub,
      tiers: config.tiered.tiers.map((tier, i) => {
        const tierName = t(tier.name, locale);
        return {
          ...tier,
          name: tierName,
          image: { src: di(gi.imgs[i]), alt: alt ? alt.tier(heroH, tierName) : tier.image.alt },
          desc: [t1Desc, t2Desc, t3Desc][i] || tier.desc,
        };
      }) as [typeof config.tiered.tiers[0], typeof config.tiered.tiers[1], typeof config.tiered.tiers[2]],
      trophyText: trophy,
    },
    spotlight: {
      ...config.spotlight,
      heading: spotH,
      tagline: spotTag,
      image: { src: di(gi.imgs[3]), alt: alt ? alt.spotlight(heroH) : config.spotlight.image.alt },
      pills: tStringPills(config.spotlight.pills, locale),
    },
    gallery: {
      ...config.gallery,
      heading: galH,
      subheading: galSub,
      items: [
        { image: { src: di(gi.imgs[4]), alt: alt ? alt.gallery(t(config.gallery.items[0]?.label || '', locale)) : config.gallery.items[0]?.image.alt || '' }, label: t(config.gallery.items[0]?.label || '', locale) },
        { image: { src: di(gi.imgs[5] || gi.imgs[0]), alt: alt ? alt.gallery(t(config.gallery.items[1]?.label || '', locale)) : config.gallery.items[1]?.image.alt || '' }, label: t(config.gallery.items[1]?.label || '', locale) },
        { image: { src: di(gi.answerKey), alt: alt ? alt.answerKey(t('Answer Key', locale)) : config.gallery.items[2]?.image.alt || '' }, label: t('Answer Key', locale) },
      ],
      pills: tStringPills(config.gallery.pills, locale),
    },
  };
}

// ─── Helpers ───

export function getToolShowcaseConfig(toolId: string, locale: string = 'en'): ToolShowcaseConfig | null {
  const enConfig = toolShowcaseConfigs[toolId] ?? null;
  if (!enConfig) return null;
  if (locale === 'de') return localizeToolShowcase(enConfig, toolId, germanImages, deToolText, 'de');
  if (locale === 'fr') return localizeToolShowcase(enConfig, toolId, frenchImages, frToolText, 'fr');
  if (locale === 'es') return localizeToolShowcase(enConfig, toolId, spanishImages, esToolText, 'es');
  if (locale === 'pt') return localizeToolShowcase(enConfig, toolId, portugueseImages, ptToolText, 'pt');
  if (locale === 'it') return localizeToolShowcase(enConfig, toolId, italianImages, itToolText, 'it');
  if (locale === 'nl') return localizeToolShowcase(enConfig, toolId, dutchImages, nlToolText, 'nl');
  return enConfig;
}

export function hasToolShowcase(toolId: string): boolean {
  return toolId in toolShowcaseConfigs;
}
