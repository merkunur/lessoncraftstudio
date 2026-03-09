import type { HeroShowcaseConfig, TieredShowcaseConfig, SpotlightConfig, GalleryConfig } from './ShowcaseSections';
import { imgUrl, t, tPills, tStringPills } from '@/config/showcase-i18n';
import { germanImages } from '@/config/german-showcase-images';

export interface ShowcaseConfig {
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
// SHOWCASE CONFIGS — one per app
// ═══════════════════════════════════════════════════════════════════

export const showcaseConfigs: Record<string, ShowcaseConfig> = {

  // ─── Addition ───
  addition: {
    hero: {
      gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 30%, #fdba74 60%, #fb923c 100%)',
      accentColor: 'orange',
      badge: 'Grades K-2',
      heading: 'Learn Math with Pictures!',
      subheading: 'Professional addition worksheets your students will love',
      images: [
        { src: img('addition', 'Addition Fun 1.webp'), alt: 'Addition worksheet with themed pictures — beginner level' },
        { src: img('addition', 'Addition Fun 2.webp'), alt: 'Addition worksheet with themed pictures — intermediate level' },
        { src: img('addition', 'Addition Fun 3.webp'), alt: 'Addition worksheet with themed pictures — advanced level' },
      ],
      pills: [
        { label: 'Pictures + Numbers', icon: '🖼' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '+',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #dbeafe 0%, #fef3c7 40%, #fed7aa 70%, #fecaca 100%)',
      badge: 'Skill Levels',
      heading: 'Differentiated Learning for Every Child',
      subheading: 'Three difficulty tiers that grow with your students',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('addition', 'Addition Fun 1.webp'), alt: 'Beginner addition worksheet — simple picture counting' },
          desc: 'Simple picture counting with numbers 1-5',
        },
        {
          name: 'Explorer', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('addition', 'addition_worksheet portrait.webp'), alt: 'Explorer addition worksheet — mixed images with sums to 10' },
          desc: 'Mixed images with sums up to 10',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('addition', 'image and number.webp'), alt: 'Expert addition worksheet — multi-step problems' },
          desc: 'Multi-step problems with sums up to 20',
        },
      ],
      trophyText: 'Every child can succeed at their own pace',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Addition Fun!',
      tagline: 'Math Made Joyful!',
      image: { src: img('addition', 'Addition Fun 4.webp'), alt: 'Featured addition worksheet — colorful themed pictures for joyful math learning' },
      pills: ['Print Instantly!', 'Pictures for Math', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'The Art of Math',
      subheading: 'Professional worksheets crafted with care and precision',
      items: [
        { image: { src: img('addition', 'Addition Fun 5.webp'), alt: 'Professional addition worksheet — clean layout with themed images' }, label: 'Worksheet' },
        { image: { src: img('addition', 'Addition Fun 6.webp'), alt: 'Professional addition worksheet — intermediate difficulty with themed visuals' }, label: 'Worksheet' },
        { image: { src: img('addition', 'Addition Fun 5 answer_key.webp'), alt: 'Professional addition answer key — complete solutions included' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Differentiated'],
      frameColor: '#b87333',
    },
  },

  // ─── Subtraction ───
  subtraction: {
    hero: {
      gradient: 'linear-gradient(155deg, #F3E5F5 0%, #FCE4EC 50%, #FFF3E0 100%)',
      accentColor: 'pink',
      badge: 'Grades K-2',
      heading: 'Visual Subtraction Made Easy!',
      subheading: 'Cross out, compare, and solve with themed picture worksheets',
      images: [
        { src: img('subtraction', 'Subtraction Fun 1.webp'), alt: 'Subtraction worksheet — cross out method with pictures' },
        { src: img('subtraction', 'Subtraction Fun 2.webp'), alt: 'Subtraction worksheet — find the subtrahend with images' },
        { src: img('subtraction', 'Subtraction Fun 3.webp'), alt: 'Subtraction worksheet — mixed problems with themed visuals' },
      ],
      pills: [
        { label: 'Cross Out Method', icon: '✕' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '−',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 40%, #fef3c7 100%)',
      badge: 'Skill Levels',
      heading: 'Step-by-Step Subtraction Mastery',
      subheading: 'Three difficulty tiers from simple to challenging',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('subtraction', 'cross out.webp'), alt: 'Beginner subtraction — simple cross out method' },
          desc: 'Cross out pictures to find the answer (1-5)',
        },
        {
          name: 'Explorer', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('subtraction', 'image number.webp'), alt: 'Explorer subtraction — image and number problems' },
          desc: 'Image-number subtraction up to 10',
        },
        {
          name: 'Expert', gradientClass: 'from-pink-400 to-rose-500', textColorClass: 'text-pink-700', borderColorClass: 'border-pink-300', stars: 3,
          image: { src: img('subtraction', 'mixed.webp'), alt: 'Expert subtraction — mixed problem types' },
          desc: 'Mixed subtraction modes with sums up to 20',
        },
      ],
      trophyText: 'Build confidence with every problem solved',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      heading: 'Subtraction Fun!',
      tagline: 'Take Away the Easy Way!',
      image: { src: img('subtraction', 'Subtraction Fun 4.webp'), alt: 'Featured subtraction worksheet — colorful themed pictures' },
      pills: ['Print Instantly!', 'Cross Out Pictures', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'pink',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Subtraction Worksheets',
      subheading: 'Clean layouts designed for young learners',
      items: [
        { image: { src: img('subtraction', 'Subtraction Fun 1.webp'), alt: 'Professional subtraction worksheet — themed picture layout' }, label: 'Worksheet' },
        { image: { src: img('subtraction', 'find subtrahend.webp'), alt: 'Find the subtrahend worksheet — challenging format' }, label: 'Find Subtrahend' },
        { image: { src: img('subtraction', 'Subtraction Fun 1 answer_key.webp'), alt: 'Subtraction answer key — solutions included' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Modes'],
      frameColor: '#C2185B',
    },
  },

  // ─── Code Addition ───
  'code-addition': {
    hero: {
      gradient: 'linear-gradient(145deg, #1E3A5F 0%, #4A148C 50%, #7B1FA2 100%)',
      accentColor: 'purple',
      badge: 'Grades 1-3',
      heading: 'Crack the Code with Addition!',
      subheading: 'Solve math problems to decode secret messages',
      images: [
        { src: img('code addition', 'Code Breaker Addition 1.webp'), alt: 'Code breaker addition worksheet — decode with math' },
        { src: img('code addition', 'Code Breaker Addition 2.webp'), alt: 'Code breaker addition worksheet — secret message puzzle' },
        { src: img('code addition', 'Code Breaker Addition 3.webp'), alt: 'Code breaker addition worksheet — advanced code cracking' },
      ],
      pills: [
        { label: 'Decode Messages', icon: '🔓' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '?',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ede9fe 0%, #e0e7ff 40%, #fef3c7 100%)',
      badge: 'Challenge Levels',
      heading: 'From Simple Sums to Secret Codes',
      subheading: 'Three difficulty levels of code-breaking fun',
      tiers: [
        {
          name: 'Rookie', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('code addition', 'Code Breaker Addition 1.webp'), alt: 'Rookie code breaker — simple addition codes' },
          desc: 'Simple addition sums decode short words',
        },
        {
          name: 'Agent', gradientClass: 'from-violet-400 to-purple-500', textColorClass: 'text-violet-700', borderColorClass: 'border-violet-300', stars: 2,
          image: { src: img('code addition', 'Code Breaker Addition 2.webp'), alt: 'Agent code breaker — medium difficulty' },
          desc: 'Larger sums unlock longer messages',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('code addition', 'Code Breaker Addition 4.webp'), alt: 'Master code breaker — advanced challenge' },
          desc: 'Multi-step codes with sums up to 20',
        },
      ],
      trophyText: 'Every code cracked builds math confidence',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)',
      heading: 'Code Cracking Fun!',
      tagline: 'Math Meets Mystery!',
      image: { src: img('code addition', 'Code Breaker Addition 3.webp'), alt: 'Featured code addition worksheet — crack the code with math' },
      pills: ['Print Instantly!', 'Decode Secret Words', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'violet',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'The Art of Code Breaking',
      subheading: 'Professional worksheets that combine math with mystery',
      items: [
        { image: { src: img('code addition', 'image_addition_worksheet.webp'), alt: 'Image addition worksheet — professional layout' }, label: 'Image Mode' },
        { image: { src: img('code addition', 'Code Breaker Addition 4.webp'), alt: 'Code breaker worksheet — decode challenge' }, label: 'Code Breaker' },
        { image: { src: img('code addition', 'Code Breaker Addition 1 answer_key.webp'), alt: 'Code breaker answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Two Game Modes'],
      frameColor: '#7B1FA2',
    },
  },

  // ─── More Less ───
  'more-less': {
    hero: {
      gradient: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 30%, #dbeafe 60%, #f0fdf4 100%)',
      accentColor: 'violet',
      badge: 'Grades K-2',
      heading: 'More, Less, or Equal?',
      subheading: 'Compare quantities with colorful picture worksheets',
      images: [
        { src: img('more less', 'More Less.webp'), alt: 'More or less comparison worksheet with pictures' },
        { src: img('more less', 'More Less (8).webp'), alt: 'Comparison worksheet — themed images' },
        { src: img('more less', 'More Less (9).webp'), alt: 'More less worksheet — advanced comparison' },
      ],
      pills: [
        { label: 'Compare Quantities', icon: '⚖' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⟨',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 40%, #fef3c7 100%)',
      badge: 'Comparison Skills',
      heading: 'Master Number Comparisons',
      subheading: 'Three levels of comparison challenges',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('more less', 'More Less worksheet (1).webp'), alt: 'Easy comparison — spot which group has more' },
          desc: 'Spot which group has more pictures (1-5)',
        },
        {
          name: 'Comparer', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('more less', 'More Less worksheet (3).webp'), alt: 'Medium comparison — mixed themed groups' },
          desc: 'Compare themed groups up to 10',
        },
        {
          name: 'Champion', gradientClass: 'from-violet-400 to-purple-500', textColorClass: 'text-violet-700', borderColorClass: 'border-violet-300', stars: 3,
          image: { src: img('more less', 'More Less worksheet (5).webp'), alt: 'Hard comparison — larger groups' },
          desc: 'Greater than, less than, and equal challenges',
        },
      ],
      trophyText: 'Comparison skills build math foundations',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Compare & Discover!',
      tagline: 'Number Sense Made Visual!',
      image: { src: img('more less', 'More Less (10).webp'), alt: 'Featured more-less worksheet — colorful comparison activity' },
      pills: ['Print Instantly!', 'Visual Comparison', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'violet',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Comparison Worksheets',
      subheading: 'Clear layouts that make comparing quantities intuitive',
      items: [
        { image: { src: img('more less', 'More Less (11).webp'), alt: 'Professional more-less worksheet' }, label: 'Worksheet' },
        { image: { src: img('more less', 'More Less (12).webp'), alt: 'More-less worksheet — another themed variation' }, label: 'Worksheet' },
        { image: { src: img('more less', 'More Less answer_key (8).webp'), alt: 'More-less answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', '3 Comparison Types'],
      frameColor: '#5E35B1',
    },
  },

  // ─── Math Puzzle ───
  'math-puzzle': {
    hero: {
      gradient: 'linear-gradient(150deg, #006D77 0%, #004E57 60%, #003840 100%)',
      accentColor: 'teal',
      badge: 'Grades K-3',
      heading: 'Solve & Reveal Picture Puzzles!',
      subheading: 'Math problems unlock hidden animal pictures',
      images: [
        { src: img('math puzzle', 'Math Puzzles.webp'), alt: 'Math puzzle worksheet — solve to reveal hidden picture' },
        { src: img('math puzzle', 'Math Puzzles (1).webp'), alt: 'Math puzzle worksheet — themed picture reveal' },
        { src: img('math puzzle', 'Math Puzzles (2).webp'), alt: 'Math puzzle worksheet — advanced grid puzzle' },
      ],
      pills: [
        { label: 'Solve & Reveal', icon: '🧩' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🧩',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ccfbf1 0%, #e0f2fe 40%, #fef3c7 100%)',
      badge: 'Puzzle Levels',
      heading: 'Puzzles for Every Skill Level',
      subheading: 'From simple sums to challenging grids',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('math puzzle', 'Math Puzzles (3).webp'), alt: 'Easy math puzzle — 3x3 grid' },
          desc: 'Simple 3×3 grids with basic addition',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('math puzzle', 'Math Puzzles (5).webp'), alt: 'Medium math puzzle — themed pictures' },
          desc: 'Themed puzzles with mixed operations',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('math puzzle', 'Math Puzzles (8).webp'), alt: 'Hard math puzzle — complex grid' },
          desc: 'Complex grids with larger numbers',
        },
      ],
      trophyText: 'Every puzzle solved reveals something amazing',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      heading: 'Puzzle Time!',
      tagline: 'Math + Pictures = Fun!',
      image: { src: img('math puzzle', 'Math Puzzles (10).webp'), alt: 'Featured math puzzle — colorful themed reveal' },
      pills: ['Print Instantly!', 'Hidden Pictures', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Math Puzzles',
      subheading: 'Engaging grids that make math practice exciting',
      items: [
        { image: { src: img('math puzzle', 'Math Puzzles (12).webp'), alt: 'Professional math puzzle worksheet' }, label: 'Puzzle' },
        { image: { src: img('math puzzle', 'Math Puzzles (15).webp'), alt: 'Math puzzle — themed variation' }, label: 'Puzzle' },
        { image: { src: img('math puzzle', 'Math Puzzles answer_key (1).webp'), alt: 'Math puzzle answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Cute Animals'],
      frameColor: '#006D77',
    },
  },

  // ─── Math Worksheet ───
  'math-worksheet': {
    hero: {
      gradient: 'linear-gradient(135deg, #F3E8FF 0%, #DBEAFE 50%, #FED7AA 100%)',
      accentColor: 'violet',
      badge: 'Grades K-3',
      heading: 'Picture Algebra for Little Mathematicians!',
      subheading: 'Solve equations with adorable animal pictures',
      images: [
        { src: img('math worksheet', 'Math Worksheet 1.webp'), alt: 'Picture algebra worksheet — solve with animal images' },
        { src: img('math worksheet', 'Math Worksheet 2.webp'), alt: 'Math worksheet — themed picture equations' },
        { src: img('math worksheet', 'Math Worksheet 3.webp'), alt: 'Math worksheet — advanced picture algebra' },
      ],
      pills: [
        { label: 'Picture Equations', icon: '🐾' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '=',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ede9fe 0%, #dbeafe 40%, #fef3c7 100%)',
      badge: 'Skill Levels',
      heading: 'Algebra Concepts for Every Level',
      subheading: 'Visual equations that grow with your students',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('math worksheet', 'Math Worksheet 4.webp'), alt: 'Beginner picture algebra — simple equations' },
          desc: 'Simple picture equations with numbers 1-5',
        },
        {
          name: 'Explorer', gradientClass: 'from-violet-400 to-purple-500', textColorClass: 'text-violet-700', borderColorClass: 'border-violet-300', stars: 2,
          image: { src: img('math worksheet', 'math worksheet portrait.webp'), alt: 'Explorer picture algebra — mixed themes' },
          desc: 'Mixed themed equations up to 10',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('math worksheet', 'Math Worksheet 8.webp'), alt: 'Expert picture algebra — multi-step' },
          desc: 'Multi-step picture equations up to 20',
        },
      ],
      trophyText: 'Building algebraic thinking from the start',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Picture Algebra!',
      tagline: 'Animals + Math = Learning!',
      image: { src: img('math worksheet', 'Math Worksheet 10.webp'), alt: 'Featured math worksheet — adorable animal picture equations' },
      pills: ['Print Instantly!', 'Animal Pictures', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'violet',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Picture Algebra',
      subheading: 'Beautiful worksheets that introduce algebra concepts visually',
      items: [
        { image: { src: img('math worksheet', 'Math Worksheet 12.webp'), alt: 'Professional picture algebra worksheet' }, label: 'Worksheet' },
        { image: { src: img('math worksheet', 'Math Worksheet 15.webp'), alt: 'Picture algebra — themed variation' }, label: 'Worksheet' },
        { image: { src: img('math worksheet', 'Math Worksheet 1 answer_key.webp'), alt: 'Picture algebra answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#7C3AED',
    },
  },

  // ─── Alphabet Train ───
  'alphabet-train': {
    hero: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFE0B2 50%, #FFCC80 100%)',
      accentColor: 'amber',
      badge: 'Pre-K to 1st',
      heading: 'All Aboard the Alphabet Train!',
      subheading: 'Learn letters with a fun cut & paste train activity',
      images: [
        { src: img('alphabet train', 'Alphabet Train 1.webp'), alt: 'Alphabet train worksheet — letter recognition activity' },
        { src: img('alphabet train', 'Alphabet Train 2.webp'), alt: 'Alphabet train — cut and paste letters' },
        { src: img('alphabet train', 'Alphabet Train 3.webp'), alt: 'Alphabet train — themed letter learning' },
      ],
      pills: [
        { label: 'Cut & Paste', icon: '✂' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: 'A',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fff8e1 0%, #ffe0b2 40%, #fef3c7 100%)',
      badge: 'Learning Stages',
      heading: 'Letters for Every Learner',
      subheading: 'Progressive letter recognition activities',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('alphabet train', 'Alphabet Train 4.webp'), alt: 'Starter alphabet train — simple letters' },
          desc: 'Uppercase letter matching A-M',
        },
        {
          name: 'Builder', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('alphabet train', 'alphabet train portrait.webp'), alt: 'Builder alphabet train — full alphabet' },
          desc: 'Full alphabet with themed images',
        },
        {
          name: 'Champion', gradientClass: 'from-red-400 to-rose-500', textColorClass: 'text-red-700', borderColorClass: 'border-red-300', stars: 3,
          image: { src: img('alphabet train', 'Alphabet Train 8.webp'), alt: 'Champion alphabet train — upper and lowercase' },
          desc: 'Upper and lowercase letter matching',
        },
      ],
      trophyText: 'Every letter is an adventure on the train',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
      heading: 'Choo Choo Letters!',
      tagline: 'Learning Letters is a Journey!',
      image: { src: img('alphabet train', 'Alphabet Train 5.webp'), alt: 'Featured alphabet train — colorful letter activity' },
      pills: ['Print Instantly!', 'Cut & Paste Fun', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Beautiful Letter Activities',
      subheading: 'Professionally designed train-themed worksheets',
      items: [
        { image: { src: img('alphabet train', 'Alphabet Train 10.webp'), alt: 'Professional alphabet train worksheet' }, label: 'Worksheet' },
        { image: { src: img('alphabet train', 'Alphabet Train 12.webp'), alt: 'Alphabet train — themed variation' }, label: 'Worksheet' },
        { image: { src: img('alphabet train', 'Alphabet Train 1 answer_key.webp'), alt: 'Alphabet train answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Cut & Paste'],
      frameColor: '#E65100',
    },
  },

  // ─── Prepositions ───
  prepositions: {
    hero: {
      gradient: 'linear-gradient(145deg, #F5F3FF 0%, #EDE9FE 40%, #FEF7ED 100%)',
      accentColor: 'violet',
      badge: 'Grades K-2',
      heading: 'Learn Spatial Words with Pictures!',
      subheading: 'On, under, beside, in — prepositions made visual and fun',
      images: [
        { src: img('prepositions', 'prepositions_worksheet.webp'), alt: 'Prepositions worksheet — spatial word practice' },
        { src: img('prepositions', 'prepositions_worksheet (1).webp'), alt: 'Prepositions worksheet — themed images' },
        { src: img('prepositions', 'prepositions_worksheet (2).webp'), alt: 'Prepositions worksheet — cut and paste' },
      ],
      pills: [
        { label: 'Spatial Words', icon: '📍' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⬆',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 40%, #fef3c7 100%)',
      badge: 'Language Levels',
      heading: 'Prepositions for Every Learner',
      subheading: 'Progressive spatial vocabulary activities',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('prepositions', 'prepositions_worksheet (3).webp'), alt: 'Easy prepositions — basic spatial words' },
          desc: 'Basic spatial words: on, in, under',
        },
        {
          name: 'Builder', gradientClass: 'from-violet-400 to-purple-500', textColorClass: 'text-violet-700', borderColorClass: 'border-violet-300', stars: 2,
          image: { src: img('prepositions', 'prepositions_worksheet (6).webp'), alt: 'Medium prepositions — expanded vocabulary' },
          desc: 'Expanded vocabulary with themed scenes',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('prepositions', 'prepositions_worksheet (10).webp'), alt: 'Advanced prepositions — complex spatial relationships' },
          desc: 'Complex spatial relationships and sentences',
        },
      ],
      trophyText: 'Spatial words unlock better communication',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Where Is It?',
      tagline: 'Spatial Words Made Fun!',
      image: { src: img('prepositions', 'prepositions_worksheet (5).webp'), alt: 'Featured prepositions worksheet — colorful spatial word activity' },
      pills: ['Print Instantly!', 'Themed Scenes', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'violet',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Language Worksheets',
      subheading: 'Beautifully designed spatial vocabulary activities',
      items: [
        { image: { src: img('prepositions', 'prepositions_worksheet (8).webp'), alt: 'Professional prepositions worksheet' }, label: 'Worksheet' },
        { image: { src: img('prepositions', 'prepositions_worksheet (12).webp'), alt: 'Prepositions — themed variation' }, label: 'Worksheet' },
        { image: { src: img('prepositions', 'prepositions_answer_key (1).webp'), alt: 'Prepositions answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Cut & Paste'],
      frameColor: '#6D28D9',
    },
  },

  // ─── Word Guess ───
  'word-guess': {
    hero: {
      gradient: 'linear-gradient(145deg, #4C1D95 0%, #6B21A8 40%, #4C1D95 100%)',
      accentColor: 'purple',
      badge: 'Grades 1-3',
      heading: 'Guess the Word with Picture Clues!',
      subheading: 'Fill in missing letters using picture hints',
      images: [
        { src: img('word guess', 'clue-grid_worksheet.webp'), alt: 'Word guess worksheet — picture clue puzzles' },
        { src: img('word guess', 'clue-grid_worksheet (1).webp'), alt: 'Word guess — fill in missing letters' },
        { src: img('word guess', 'clue-grid_worksheet (2).webp'), alt: 'Word guess — themed word challenges' },
      ],
      pills: [
        { label: 'Picture Clues', icon: '🔍' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '?',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 40%, #fef3c7 100%)',
      badge: 'Word Levels',
      heading: 'Vocabulary for Every Reader',
      subheading: 'Three levels of word-guessing challenge',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('word guess', 'clue-grid_worksheet (3).webp'), alt: 'Easy word guess — simple 3-letter words' },
          desc: 'Simple 3-4 letter words with picture hints',
        },
        {
          name: 'Detective', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('word guess', 'clue-grid_worksheet (4).webp'), alt: 'Medium word guess — themed vocabulary' },
          desc: 'Themed vocabulary with 2+ missing letters',
        },
        {
          name: 'Genius', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('word guess', 'custom word list.webp'), alt: 'Hard word guess — custom word lists' },
          desc: 'Longer words with custom word lists',
        },
      ],
      trophyText: 'Every word guessed builds reading confidence',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Word Detective!',
      tagline: 'Pictures + Letters = Fun!',
      image: { src: img('word guess', 'landscape.webp'), alt: 'Featured word guess — colorful vocabulary challenge' },
      pills: ['Print Instantly!', 'Picture Clues', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Word Puzzles',
      subheading: 'Engaging vocabulary worksheets with picture clues',
      items: [
        { image: { src: img('word guess', 'clue-grid_worksheet.webp'), alt: 'Professional word guess worksheet' }, label: 'Clue Grid' },
        { image: { src: img('word guess', 'clue-grid_worksheet (2).webp'), alt: 'Word guess — themed variation' }, label: 'Themed' },
        { image: { src: img('word guess', 'clue-grid_answer-key (1).webp'), alt: 'Word guess answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Custom Lists'],
      frameColor: '#6B21A8',
    },
  },

  // ─── Word Scramble ───
  'word-scramble': {
    hero: {
      gradient: 'linear-gradient(145deg, #0D9488 0%, #14B8A6 40%, #0D9488 100%)',
      accentColor: 'teal',
      badge: 'Grades 1-3',
      heading: 'Unscramble Words with Picture Clues!',
      subheading: 'Rearrange letters to spell the word shown in the picture',
      images: [
        { src: img('word scramble', 'Word Scramble 1.webp'), alt: 'Word scramble worksheet — unscramble with picture clues' },
        { src: img('word scramble', 'Word Scramble 2.webp'), alt: 'Word scramble — themed letter puzzles' },
        { src: img('word scramble', 'Word Scramble 3.webp'), alt: 'Word scramble — advanced challenges' },
      ],
      pills: [
        { label: 'Unscramble Letters', icon: '🔤' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🔤',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ccfbf1 0%, #e0f2fe 40%, #fef3c7 100%)',
      badge: 'Spelling Levels',
      heading: 'Spelling Fun for Every Level',
      subheading: 'Three tiers of word scramble challenges',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('word scramble', 'Word Scramble 4.webp'), alt: 'Easy word scramble — simple 3-letter words' },
          desc: 'Simple 3-4 letter word scrambles',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('word scramble', 'word scramble portrait.webp'), alt: 'Medium word scramble — themed words' },
          desc: 'Themed words with 5-6 letters',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('word scramble', 'Word Scramble 8.webp'), alt: 'Hard word scramble — longer words' },
          desc: 'Longer words and custom word lists',
        },
      ],
      trophyText: 'Every word unscrambled builds spelling skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      heading: 'Scramble Mania!',
      tagline: 'Unscramble, Spell, Learn!',
      image: { src: img('word scramble', 'Word Scramble 10.webp'), alt: 'Featured word scramble — colorful themed activity' },
      pills: ['Print Instantly!', 'Picture Clues', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Word Scrambles',
      subheading: 'Clean, engaging layouts for vocabulary practice',
      items: [
        { image: { src: img('word scramble', 'Word Scramble 12.webp'), alt: 'Professional word scramble worksheet' }, label: 'Worksheet' },
        { image: { src: img('word scramble', 'Word Scramble 15.webp'), alt: 'Word scramble — themed variation' }, label: 'Worksheet' },
        { image: { src: img('word scramble', 'Word Scramble 1 answer-key.webp'), alt: 'Word scramble answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Custom Lists'],
      frameColor: '#0D9488',
    },
  },

  // ─── Wordsearch ───
  wordsearch: {
    hero: {
      gradient: 'linear-gradient(135deg, #6D28D9 0%, #4338CA 50%, #3730A3 100%)',
      accentColor: 'indigo',
      badge: 'Grades K-3',
      heading: 'Picture-Powered Word Search!',
      subheading: 'Find hidden words with image clues in themed puzzles',
      images: [
        { src: img('wordsearch', 'Word Search 1.webp'), alt: 'Word search puzzle with picture clues' },
        { src: img('wordsearch', 'Word Search 2.webp'), alt: 'Word search — themed image vocabulary' },
        { src: img('wordsearch', 'Word Search 3.webp'), alt: 'Word search — advanced grid puzzle' },
      ],
      pills: [
        { label: 'Image Clues', icon: '🔍' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⬡',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ede9fe 0%, #e0e7ff 40%, #fef3c7 100%)',
      badge: 'Search Levels',
      heading: 'Word Searches for Every Skill',
      subheading: 'From easy grids to challenging puzzles',
      tiers: [
        {
          name: 'Seeker', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('wordsearch', 'Word Search 4.webp'), alt: 'Easy word search — small grid' },
          desc: 'Small grids with simple themed words',
        },
        {
          name: 'Hunter', gradientClass: 'from-indigo-400 to-violet-500', textColorClass: 'text-indigo-700', borderColorClass: 'border-indigo-300', stars: 2,
          image: { src: img('wordsearch', 'wordsearch portrait.webp'), alt: 'Medium word search — themed puzzle' },
          desc: 'Themed puzzles with diagonal words',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('wordsearch', 'Word Search 8.webp'), alt: 'Hard word search — large grid' },
          desc: 'Large grids with hidden words in all directions',
        },
      ],
      trophyText: 'Finding words sharpens vocabulary and focus',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)',
      heading: 'Word Hunt!',
      tagline: 'Find, Circle, Learn!',
      image: { src: img('wordsearch', 'Word Search 6.webp'), alt: 'Featured word search — colorful themed puzzle' },
      pills: ['Print Instantly!', 'Image Clues', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'indigo',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Word Search Puzzles',
      subheading: 'Beautifully designed grids with themed vocabulary',
      items: [
        { image: { src: img('wordsearch', 'Word Search 10.webp'), alt: 'Professional word search worksheet' }, label: 'Puzzle' },
        { image: { src: img('wordsearch', 'Word Search 12.webp'), alt: 'Word search — themed variation' }, label: 'Puzzle' },
        { image: { src: img('wordsearch', 'Word Search 1 answer_key.webp'), alt: 'Word search answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#4338CA',
    },
  },

  // ─── Cryptogram ───
  cryptogram: {
    hero: {
      gradient: 'linear-gradient(145deg, #7C3AED 0%, #5B21B6 30%, #1a0a2e 100%)',
      accentColor: 'purple',
      badge: 'Grades 1-3',
      heading: 'Crack the Picture Code!',
      subheading: 'Decode secret messages using picture-to-letter ciphers',
      images: [
        { src: img('cryptogram', 'cryptogram_worksheet.webp'), alt: 'Cryptogram worksheet — decode picture codes' },
        { src: img('cryptogram', 'cryptogram_worksheet (1).webp'), alt: 'Cryptogram — themed cipher puzzle' },
        { src: img('cryptogram', 'cryptogram_worksheet (2).webp'), alt: 'Cryptogram — advanced code cracking' },
      ],
      pills: [
        { label: 'Picture Codes', icon: '🔐' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🔑',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 40%, #fef3c7 100%)',
      badge: 'Code Levels',
      heading: 'Ciphers for Every Code Breaker',
      subheading: 'Progressive decoding challenges',
      tiers: [
        {
          name: 'Novice', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('cryptogram', 'cryptogram_worksheet (3).webp'), alt: 'Easy cryptogram — simple picture codes' },
          desc: 'Short words with simple picture substitutions',
        },
        {
          name: 'Decoder', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('cryptogram', 'cryptogram_worksheet (6).webp'), alt: 'Medium cryptogram — themed ciphers' },
          desc: 'Themed phrases with mixed cipher symbols',
        },
        {
          name: 'Cipher Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('cryptogram', 'cryptogram_worksheet (10).webp'), alt: 'Hard cryptogram — complex codes' },
          desc: 'Full sentences with complex picture codes',
        },
      ],
      trophyText: 'Every code cracked sharpens critical thinking',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Secret Messages!',
      tagline: 'Decode the Fun!',
      image: { src: img('cryptogram', 'cryptogram_worksheet (8).webp'), alt: 'Featured cryptogram — colorful picture cipher puzzle' },
      pills: ['Print Instantly!', 'Picture Ciphers', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Cryptogram Puzzles',
      subheading: 'Beautifully designed cipher activities for young minds',
      items: [
        { image: { src: img('cryptogram', 'cryptogram_worksheet (12).webp'), alt: 'Professional cryptogram worksheet' }, label: 'Cipher' },
        { image: { src: img('cryptogram', 'cryptogram_worksheet (15).webp'), alt: 'Cryptogram — themed variation' }, label: 'Cipher' },
        { image: { src: img('cryptogram', 'cryptogram_answer_key (1).webp'), alt: 'Cryptogram answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#7C3AED',
    },
  },

  // ─── Writing ───
  writing: {
    hero: {
      gradient: 'linear-gradient(170deg, #FDF8EF 0%, #E8F0E4 55%, #D7E4D0 100%)',
      accentColor: 'green',
      badge: 'Pre-K to 1st',
      heading: 'Learn to Write Letters!',
      subheading: 'Guided letter tracing worksheets for beginning writers',
      images: [
        { src: img('writing', 'writing.webp'), alt: 'Letter tracing worksheet — learn to write' },
        { src: img('writing', 'writing beginning letter.webp'), alt: 'Beginning letter writing practice' },
        { src: img('writing', 'writing custom.webp'), alt: 'Custom writing worksheet — personalized practice' },
      ],
      pills: [
        { label: 'Letter Tracing', icon: '✏' },
        { label: 'No Prep', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '✏',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 40%, #fef3c7 100%)',
      badge: 'Writing Stages',
      heading: 'Writing Practice for Every Level',
      subheading: 'Progressive letter formation activities',
      tiers: [
        {
          name: 'Tracer', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('writing', 'writing.webp'), alt: 'Beginner writing — guided letter tracing' },
          desc: 'Guided tracing with dotted letters',
        },
        {
          name: 'Writer', gradientClass: 'from-lime-400 to-green-500', textColorClass: 'text-lime-700', borderColorClass: 'border-lime-300', stars: 2,
          image: { src: img('writing', 'writing beginning letter.webp'), alt: 'Intermediate writing — beginning letters' },
          desc: 'Beginning letter practice with guidelines',
        },
        {
          name: 'Author', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('writing', 'writing custom.webp'), alt: 'Advanced writing — custom content' },
          desc: 'Independent writing with custom words',
        },
      ],
      trophyText: 'Every letter practiced builds writing confidence',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
      heading: 'Write It Out!',
      tagline: 'Practice Makes Perfect!',
      image: { src: img('writing', 'writing beginning letter.webp'), alt: 'Featured writing worksheet — beautiful letter tracing activity' },
      pills: ['Print Instantly!', 'Guided Tracing', 'No Prep Needed'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'emerald',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Beautiful Writing Practice',
      subheading: 'Professional worksheets with clear letter guides',
      items: [
        { image: { src: img('writing', 'writing.webp'), alt: 'Professional writing worksheet' }, label: 'Tracing' },
        { image: { src: img('writing', 'writing beginning letter.webp'), alt: 'Beginning letter worksheet' }, label: 'Letters' },
        { image: { src: img('writing', 'writing custom.webp'), alt: 'Custom writing worksheet' }, label: 'Custom' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Multiple Formats', 'A-Z Coverage'],
      frameColor: '#2E7D32',
    },
  },

  // ─── Big Small ───
  'big-small': {
    hero: {
      gradient: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 30%, #fef2f2 60%, #faf5ff 100%)',
      accentColor: 'sky',
      badge: 'Pre-K to 1st',
      heading: 'Sort by Size — Big & Small!',
      subheading: 'Compare sizes with adorable picture worksheets',
      images: [
        { src: img('big small', 'big-small identical images.webp'), alt: 'Big and small worksheet — identical images comparison' },
        { src: img('big small', 'big-small-different images.webp'), alt: 'Big and small — different images comparison' },
        { src: img('big small', 'big-small number 1-2-3.webp'), alt: 'Big and small — number ordering' },
      ],
      pills: [
        { label: 'Size Sorting', icon: '📏' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '◯',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 40%, #fef3c7 100%)',
      badge: 'Activity Types',
      heading: '3 Ways to Learn Size Comparison',
      subheading: 'Identical, different, and numbered size activities',
      tiers: [
        {
          name: 'Identical', gradientClass: 'from-sky-400 to-blue-500', textColorClass: 'text-sky-700', borderColorClass: 'border-sky-300', stars: 1,
          image: { src: img('big small', 'big-small-worksheet_worksheet.webp'), alt: 'Identical images — find the big one' },
          desc: 'Compare identical pictures of different sizes',
        },
        {
          name: 'Different', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 2,
          image: { src: img('big small', 'big-small-worksheet_worksheet (5).webp'), alt: 'Different images — compare sizes' },
          desc: 'Compare different images by size',
        },
        {
          name: 'Numbered', gradientClass: 'from-rose-400 to-pink-500', textColorClass: 'text-rose-700', borderColorClass: 'border-rose-300', stars: 3,
          image: { src: img('big small', 'big-small-worksheet_worksheet (10).webp'), alt: 'Number ordering — 1-2-3 sizing' },
          desc: 'Order 3 images from smallest to biggest',
        },
      ],
      trophyText: 'Size comparison builds math foundations',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
      heading: 'Big or Small?',
      tagline: 'Size Sorting Made Fun!',
      image: { src: img('big small', 'big-small-worksheet_worksheet (15).webp'), alt: 'Featured big-small worksheet — adorable size comparison' },
      pills: ['Print Instantly!', 'Cute Animals', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'sky',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Size Activities',
      subheading: 'Beautifully designed worksheets for early learners',
      items: [
        { image: { src: img('big small', 'big-small-worksheet_worksheet (20).webp'), alt: 'Professional big-small worksheet' }, label: 'Worksheet' },
        { image: { src: img('big small', 'big-small-worksheet_worksheet (25).webp'), alt: 'Big-small — themed variation' }, label: 'Worksheet' },
        { image: { src: img('big small', 'big-small-worksheet_answer_key (1).webp'), alt: 'Big-small answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', '3 Activity Types'],
      frameColor: '#0284C7',
    },
  },

  // ─── Pattern Train ───
  'pattern-train': {
    hero: {
      gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFCC80 100%)',
      accentColor: 'amber',
      badge: 'Pre-K to 1st',
      heading: 'Pattern Train — Choo Choo!',
      subheading: 'Complete pattern sequences with a fun train theme',
      images: [
        { src: img('pattern train', 'pattern_train_worksheet.webp'), alt: 'Pattern train worksheet — complete the sequence' },
        { src: img('pattern train', 'pattern_train_worksheet (1).webp'), alt: 'Pattern train — themed pattern practice' },
        { src: img('pattern train', 'pattern_train_worksheet (2).webp'), alt: 'Pattern train — advanced sequences' },
      ],
      pills: [
        { label: 'Cut & Paste', icon: '✂' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🚂',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fff8e1 0%, #ffe0b2 40%, #fef3c7 100%)',
      badge: 'Pattern Levels',
      heading: 'Patterns for Every Learner',
      subheading: 'From simple AB patterns to complex sequences',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('pattern train', 'pattern_train_worksheet (3).webp'), alt: 'Easy pattern train — AB patterns' },
          desc: 'Simple AB pattern sequences',
        },
        {
          name: 'Builder', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('pattern train', 'pattern_train_worksheet (8).webp'), alt: 'Medium pattern train — ABC patterns' },
          desc: 'ABC and ABB pattern sequences',
        },
        {
          name: 'Master', gradientClass: 'from-red-400 to-rose-500', textColorClass: 'text-red-700', borderColorClass: 'border-red-300', stars: 3,
          image: { src: img('pattern train', 'pattern_train_worksheet (15).webp'), alt: 'Hard pattern train — complex sequences' },
          desc: 'Complex multi-element patterns',
        },
      ],
      trophyText: 'Pattern recognition builds logical thinking',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
      heading: 'All Aboard!',
      tagline: 'Patterns on the Train!',
      image: { src: img('pattern train', 'pattern_train_worksheet (5).webp'), alt: 'Featured pattern train — colorful sequence activity' },
      pills: ['Print Instantly!', 'Cut & Paste Fun', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Beautiful Pattern Activities',
      subheading: 'Professional train-themed worksheets for pattern practice',
      items: [
        { image: { src: img('pattern train', 'pattern_train_worksheet (10).webp'), alt: 'Professional pattern train worksheet' }, label: 'Worksheet' },
        { image: { src: img('pattern train', 'pattern_train_worksheet (18).webp'), alt: 'Pattern train — themed variation' }, label: 'Worksheet' },
        { image: { src: img('pattern train', 'pattern_train_answer_key (1).webp'), alt: 'Pattern train answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Cut & Paste'],
      frameColor: '#E65100',
    },
  },

  // ─── Pattern Worksheet ───
  'pattern-worksheet': {
    hero: {
      gradient: 'linear-gradient(150deg, #6C3483 0%, #4A235A 60%, #311B4E 100%)',
      accentColor: 'purple',
      badge: 'Grades K-2',
      heading: 'Complete the Pattern Sequence!',
      subheading: 'Visual pattern recognition with colorful shapes and images',
      images: [
        { src: img('pattern worksheet', 'pattern_worksheet.webp'), alt: 'Pattern worksheet — complete the sequence' },
        { src: img('pattern worksheet', 'pattern_worksheet (1).webp'), alt: 'Pattern worksheet — themed pattern practice' },
        { src: img('pattern worksheet', 'pattern_worksheet (2).webp'), alt: 'Pattern worksheet — advanced sequences' },
      ],
      pills: [
        { label: 'Visual Patterns', icon: '◆' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '◆',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 40%, #fef3c7 100%)',
      badge: 'Sequence Levels',
      heading: 'Patterns for Every Learner',
      subheading: 'Three tiers of pattern challenges',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('pattern worksheet', 'pattern_worksheet (3).webp'), alt: 'Easy patterns — simple shape sequences' },
          desc: 'Simple repeating shape patterns',
        },
        {
          name: 'Builder', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 2,
          image: { src: img('pattern worksheet', 'pattern_worksheet (8).webp'), alt: 'Medium patterns — color and shape' },
          desc: 'Color and shape combination patterns',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('pattern worksheet', 'pattern_worksheet (15).webp'), alt: 'Hard patterns — complex multi-element' },
          desc: 'Complex multi-element pattern sequences',
        },
      ],
      trophyText: 'Patterns are the foundation of mathematical thinking',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      heading: 'Pattern Power!',
      tagline: 'See It, Complete It!',
      image: { src: img('pattern worksheet', 'pattern_worksheet (5).webp'), alt: 'Featured pattern worksheet — colorful sequence challenge' },
      pills: ['Print Instantly!', 'Visual Learning', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'purple',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Pattern Worksheets',
      subheading: 'Clean designs for focused pattern practice',
      items: [
        { image: { src: img('pattern worksheet', 'pattern_worksheet (10).webp'), alt: 'Professional pattern worksheet' }, label: 'Worksheet' },
        { image: { src: img('pattern worksheet', 'pattern_worksheet (12).webp'), alt: 'Pattern worksheet — themed variation' }, label: 'Worksheet' },
        { image: { src: img('pattern worksheet', 'pattern_answer_key (1).webp'), alt: 'Pattern worksheet answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Levels'],
      frameColor: '#6C3483',
    },
  },

  // ─── Draw and Color ───
  'draw-and-color': {
    hero: {
      gradient: 'linear-gradient(160deg, #00695C 0%, #004D40 60%, #00352C 100%)',
      accentColor: 'emerald',
      badge: 'All Ages',
      heading: 'Learn to Draw with Grid Art!',
      subheading: 'Copy adorable pictures using the grid drawing method',
      images: [
        { src: img('draw and color', 'grid-drawing_worksheet.webp'), alt: 'Grid drawing worksheet — learn to draw animals' },
        { src: img('draw and color', 'grid-drawing_worksheet (1).webp'), alt: 'Grid drawing — themed picture copying' },
        { src: img('draw and color', 'grid-drawing_worksheet (2).webp'), alt: 'Grid drawing — advanced art activity' },
      ],
      pills: [
        { label: 'Grid Method', icon: '📐' },
        { label: 'No Prep', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🎨',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 40%, #fef3c7 100%)',
      badge: 'Art Levels',
      heading: 'Drawing for Every Skill Level',
      subheading: 'Progressive grid art from simple to detailed',
      tiers: [
        {
          name: 'Beginner', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('draw and color', 'grid-drawing_worksheet (5).webp'), alt: 'Easy grid drawing — simple shapes' },
          desc: 'Simple shapes on large grid squares',
        },
        {
          name: 'Artist', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('draw and color', 'grid-drawing_worksheet (10).webp'), alt: 'Medium grid drawing — animals' },
          desc: 'Cute animals with medium detail',
        },
        {
          name: 'Master', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('draw and color', 'grid-drawing_worksheet (20).webp'), alt: 'Advanced grid drawing — detailed art' },
          desc: 'Detailed pictures with fine grid work',
        },
      ],
      trophyText: 'Every drawing builds fine motor skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      heading: 'Draw Like a Pro!',
      tagline: 'Grid Art Made Easy!',
      image: { src: img('draw and color', 'grid-drawing_worksheet (8).webp'), alt: 'Featured grid drawing — adorable animal art activity' },
      pills: ['Print Instantly!', 'Cute Animals', 'No Prep Needed'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'emerald',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Drawing Activities',
      subheading: 'Beautifully designed grid art worksheets',
      items: [
        { image: { src: img('draw and color', 'grid-drawing_worksheet (15).webp'), alt: 'Professional grid drawing worksheet' }, label: 'Drawing' },
        { image: { src: img('draw and color', 'grid-drawing_worksheet (25).webp'), alt: 'Grid drawing — themed variation' }, label: 'Drawing' },
        { image: { src: img('draw and color', 'grid-drawing_worksheet (30).webp'), alt: 'Grid drawing — detailed activity' }, label: 'Drawing' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Grid Method', 'Cute Animals'],
      frameColor: '#00695C',
    },
  },

  // ─── Drawing Lines ───
  'drawing-lines': {
    hero: {
      gradient: 'linear-gradient(145deg, #FFFBF0 0%, #FFE4E1 50%, #FFF0E8 100%)',
      accentColor: 'rose',
      badge: 'Pre-K to K',
      heading: 'Pre-Writing Line Practice!',
      subheading: 'Build fine motor skills with guided line drawing',
      images: [
        { src: img('drawing lines', 'drawing_lines_horizontal.webp'), alt: 'Drawing lines worksheet — horizontal line practice' },
        { src: img('drawing lines', 'drawing_lines_vertical.webp'), alt: 'Drawing lines — vertical line practice' },
        { src: img('drawing lines', 'drawing_lines_curve 1.webp'), alt: 'Drawing lines — curved line practice' },
      ],
      pills: [
        { label: 'Fine Motor Skills', icon: '✏' },
        { label: 'No Prep', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '〰',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fff1f2 0%, #ffe4e6 40%, #fef3c7 100%)',
      badge: 'Skill Levels',
      heading: 'Lines for Every Stage',
      subheading: 'From straight lines to complex curves',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('drawing lines', 'drawing_lines_worksheet (1).webp'), alt: 'Easy line drawing — guided straight lines' },
          desc: 'Straight horizontal and vertical lines',
        },
        {
          name: 'Tracer', gradientClass: 'from-rose-400 to-pink-500', textColorClass: 'text-rose-700', borderColorClass: 'border-rose-300', stars: 2,
          image: { src: img('drawing lines', 'drawing_lines_diagonal 1.webp'), alt: 'Medium line drawing — diagonal lines' },
          desc: 'Diagonal lines and simple zigzags',
        },
        {
          name: 'Artist', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('drawing lines', 'drawing_lines_curve 2.webp'), alt: 'Advanced line drawing — curved paths' },
          desc: 'Curves, waves, and spiral paths',
        },
      ],
      trophyText: 'Line practice prepares children for writing',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fff1f2 0%, #fce7f3 50%, #fbcfe8 100%)',
      heading: 'Trace & Draw!',
      tagline: 'Pre-Writing Made Fun!',
      image: { src: img('drawing lines', 'drawing_lines_curve 3.webp'), alt: 'Featured drawing lines — guided curve tracing activity' },
      pills: ['Print Instantly!', 'Cute Animals', 'Fine Motor Skills'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'rose',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Line Activities',
      subheading: 'Guided paths that build pre-writing confidence',
      items: [
        { image: { src: img('drawing lines', 'drawing_lines_worksheet (5).webp'), alt: 'Professional line drawing worksheet' }, label: 'Lines' },
        { image: { src: img('drawing lines', 'drawing_lines_worksheet (15).webp'), alt: 'Line drawing — themed variation' }, label: 'Paths' },
        { image: { src: img('drawing lines', 'Line Drawing Practic.webp'), alt: 'Line drawing practice sheet' }, label: 'Practice' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Multiple Line Types', 'Cute Animals'],
      frameColor: '#E11D48',
    },
  },

  // ─── Coloring ───
  coloring: {
    hero: {
      gradient: 'linear-gradient(145deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%)',
      accentColor: 'red',
      badge: 'All Ages',
      heading: 'Beautiful Coloring Pages!',
      subheading: 'Print-ready coloring sheets for creative fun',
      images: [
        { src: img('coloring', 'coloring portrait 1.webp'), alt: 'Coloring page — themed holiday illustration' },
        { src: img('coloring', 'coloring portrait 2.webp'), alt: 'Coloring page — detailed picture' },
        { src: img('coloring', 'coloring portrait 3.webp'), alt: 'Coloring page — fun scene to color' },
      ],
      pills: [
        { label: 'Cozy Scenes', icon: '🎨' },
        { label: 'No Prep', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🖍',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fef2f2 0%, #fef3c7 40%, #ecfdf5 100%)',
      badge: 'Detail Levels',
      heading: 'Coloring for Every Age',
      subheading: 'From simple outlines to detailed scenes',
      tiers: [
        {
          name: 'Simple', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('coloring', 'coloring portrait 4.webp'), alt: 'Simple coloring page — bold outlines' },
          desc: 'Bold outlines perfect for young artists',
        },
        {
          name: 'Detailed', gradientClass: 'from-orange-400 to-red-500', textColorClass: 'text-orange-700', borderColorClass: 'border-orange-300', stars: 2,
          image: { src: img('coloring', 'coloring portrait 5.webp'), alt: 'Detailed coloring page — medium complexity' },
          desc: 'Themed scenes with moderate detail',
        },
        {
          name: 'Intricate', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 3,
          image: { src: img('coloring', 'coloring landscape 1.webp'), alt: 'Intricate coloring page — complex scene' },
          desc: 'Complex landscapes for older colorists',
        },
      ],
      trophyText: 'Coloring builds focus and creativity',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)',
      heading: 'Color Your World!',
      tagline: 'Creativity Unleashed!',
      image: { src: img('coloring', 'coloring portrait 6.webp'), alt: 'Featured coloring page — beautiful themed illustration' },
      pills: ['Print Instantly!', 'Cozy Scenes', 'No Prep Needed'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'orange',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Coloring Pages',
      subheading: 'Beautiful illustrations ready to print and color',
      items: [
        { image: { src: img('coloring', 'coloring landscape 2.webp'), alt: 'Professional coloring page — landscape' }, label: 'Landscape' },
        { image: { src: img('coloring', 'coloring landscape 3.webp'), alt: 'Coloring page — themed scene' }, label: 'Scene' },
        { image: { src: img('coloring', 'coloring portrait 1.webp'), alt: 'Coloring page — portrait style' }, label: 'Portrait' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Multiple Themes', 'Variety Included'],
      frameColor: '#6C4AB6',
    },
  },

  // ─── Chart Count ───
  'chart-count': {
    hero: {
      gradient: 'linear-gradient(145deg, #FFF8E1 0%, #FFCC80 50%, #FFB74D 100%)',
      accentColor: 'amber',
      badge: 'Grades K-2',
      heading: 'Data Detective — Picture Graphs!',
      subheading: 'Count, graph, and analyze with themed picture data',
      images: [
        { src: img('chart count', 'Picture Graph 1.webp'), alt: 'Picture graph worksheet — count and chart' },
        { src: img('chart count', 'Picture Graph 2.webp'), alt: 'Picture graph — themed data analysis' },
        { src: img('chart count', 'Picture Graph 3.webp'), alt: 'Picture graph — advanced charting' },
      ],
      pills: [
        { label: 'Picture Graphs', icon: '📊' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '📊',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 40%, #e0f2fe 100%)',
      badge: 'Data Levels',
      heading: 'Graphing for Every Learner',
      subheading: 'From simple counting to data analysis',
      tiers: [
        {
          name: 'Counter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('chart count', 'chart count.webp'), alt: 'Easy chart count — simple picture counting' },
          desc: 'Count pictures and fill in the chart',
        },
        {
          name: 'Grapher', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('chart count', 'Picture Graph 5.webp'), alt: 'Medium chart — themed picture graphs' },
          desc: 'Create themed picture graphs',
        },
        {
          name: 'Analyst', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 3,
          image: { src: img('chart count', 'Picture Graph 10.webp'), alt: 'Advanced chart — data analysis' },
          desc: 'Analyze data and answer questions',
        },
      ],
      trophyText: 'Data skills start with picture graphs',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
      heading: 'Count & Chart!',
      tagline: 'Data Made Visual!',
      image: { src: img('chart count', 'Picture Graph 8.webp'), alt: 'Featured picture graph — colorful data activity' },
      pills: ['Print Instantly!', 'Multiple Themes', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Graph Activities',
      subheading: 'Beautiful picture graph worksheets for data learning',
      items: [
        { image: { src: img('chart count', 'Picture Graph 12.webp'), alt: 'Professional picture graph worksheet' }, label: 'Graph' },
        { image: { src: img('chart count', 'Picture Graph 15.webp'), alt: 'Picture graph — themed variation' }, label: 'Graph' },
        { image: { src: img('chart count', 'Picture Graph 1 answer_key.webp'), alt: 'Picture graph answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#F57C00',
    },
  },

  // ─── Matching ───
  matching: {
    hero: {
      gradient: 'linear-gradient(145deg, #FF9A56 0%, #FF6B6B 50%, #FF8A7A 100%)',
      accentColor: 'red',
      badge: 'Pre-K to 1st',
      heading: 'Match Pictures to Words!',
      subheading: 'Draw lines to connect matching images and vocabulary',
      images: [
        { src: img('matching', 'Match Up 1.webp'), alt: 'Matching worksheet — connect pictures to words' },
        { src: img('matching', 'Match Up 2.webp'), alt: 'Matching — themed image vocabulary' },
        { src: img('matching', 'Match Up 3.webp'), alt: 'Matching — advanced word-picture connections' },
      ],
      pills: [
        { label: 'Draw Lines', icon: '↗' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '↔',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fef2f2 0%, #ffedd5 40%, #fef3c7 100%)',
      badge: 'Match Levels',
      heading: 'Matching for Every Learner',
      subheading: 'From simple image matching to word connections',
      tiers: [
        {
          name: 'Matcher', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('matching', 'matching portrait.webp'), alt: 'Easy matching — simple image pairs' },
          desc: 'Match identical pictures together',
        },
        {
          name: 'Connector', gradientClass: 'from-orange-400 to-red-500', textColorClass: 'text-orange-700', borderColorClass: 'border-orange-300', stars: 2,
          image: { src: img('matching', 'image and word.webp'), alt: 'Medium matching — images to words' },
          desc: 'Connect images to their word labels',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('matching', 'image and custom word.webp'), alt: 'Advanced matching — custom vocabulary' },
          desc: 'Match custom vocabulary with themed images',
        },
      ],
      trophyText: 'Matching builds vocabulary and visual skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)',
      heading: 'Match It Up!',
      tagline: 'Connect & Learn!',
      image: { src: img('matching', 'Match Up 5.webp'), alt: 'Featured matching worksheet — colorful vocabulary activity' },
      pills: ['Print Instantly!', 'Themed Images', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'orange',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Matching Activities',
      subheading: 'Beautifully designed vocabulary connection worksheets',
      items: [
        { image: { src: img('matching', 'Match Up 8.webp'), alt: 'Professional matching worksheet' }, label: 'Match Up' },
        { image: { src: img('matching', 'Match Up 12.webp'), alt: 'Matching — themed variation' }, label: 'Match Up' },
        { image: { src: img('matching', 'Match Up 1 answer_key.webp'), alt: 'Matching answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#FF6B6B',
    },
  },

  // ─── Grid Match ───
  'grid-match': {
    hero: {
      gradient: 'linear-gradient(150deg, #00838F 0%, #006064 50%, #004D40 100%)',
      accentColor: 'teal',
      badge: 'Grades K-2',
      heading: 'Grid Match Puzzles!',
      subheading: 'Match pictures to numbered grid positions',
      images: [
        { src: img('grid match', 'Grid Match.webp'), alt: 'Grid match puzzle — position matching' },
        { src: img('grid match', 'Grid Match (1).webp'), alt: 'Grid match — themed puzzle' },
        { src: img('grid match', 'Grid Match (2).webp'), alt: 'Grid match — advanced grid challenge' },
      ],
      pills: [
        { label: '3×3 Grid', icon: '⊞' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '#',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ccfbf1 0%, #e0f2fe 40%, #fef3c7 100%)',
      badge: 'Grid Levels',
      heading: 'Grid Challenges for Every Level',
      subheading: 'From simple matching to spatial reasoning',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('grid match', 'Grid Match (3).webp'), alt: 'Easy grid match — simple positions' },
          desc: 'Match pictures to 3×3 grid positions',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('grid match', 'Grid Match (6).webp'), alt: 'Medium grid match — themed animals' },
          desc: 'Themed animal grid matching puzzles',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('grid match', 'Grid Match (10).webp'), alt: 'Hard grid match — spatial reasoning' },
          desc: 'Complex spatial position challenges',
        },
      ],
      trophyText: 'Grid matching builds spatial reasoning skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      heading: 'Grid Time!',
      tagline: 'Match & Place!',
      image: { src: img('grid match', 'Grid Match (8).webp'), alt: 'Featured grid match — colorful spatial puzzle' },
      pills: ['Print Instantly!', 'Cute Animals', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Grid Puzzles',
      subheading: 'Engaging spatial reasoning worksheets',
      items: [
        { image: { src: img('grid match', 'Grid Match (12).webp'), alt: 'Professional grid match worksheet' }, label: 'Puzzle' },
        { image: { src: img('grid match', 'Grid Match (15).webp'), alt: 'Grid match — themed variation' }, label: 'Puzzle' },
        { image: { src: img('grid match', 'Grid Match answer_key (1).webp'), alt: 'Grid match answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Cute Animals'],
      frameColor: '#00838F',
    },
  },

  // ─── Shadow Match ───
  'shadow-match': {
    hero: {
      gradient: 'linear-gradient(170deg, #0B1628 0%, #101D3A 40%, #142240 100%)',
      accentColor: 'yellow',
      badge: 'Pre-K to 1st',
      heading: 'Match the Shadow!',
      subheading: 'Find the matching silhouette for each picture',
      images: [
        { src: img('shadow match', 'shadow-match-horizontal.webp'), alt: 'Shadow match worksheet — horizontal layout' },
        { src: img('shadow match', 'shadow-match-vertical.webp'), alt: 'Shadow match — vertical layout' },
        { src: img('shadow match', 'shadow-match-worksheet.webp'), alt: 'Shadow match — themed shadow puzzles' },
      ],
      pills: [
        { label: 'Visual Perception', icon: '👁' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '◐',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #1e293b 0%, #1e3a5f 40%, #0f172a 100%)',
      badge: 'Observation Levels',
      heading: 'Shadow Challenges for Sharp Eyes',
      subheading: 'Test visual perception at every level',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-300', borderColorClass: 'border-emerald-500', stars: 1,
          image: { src: img('shadow match', 'shadow-match-worksheet (1).webp'), alt: 'Easy shadow match — clear silhouettes' },
          desc: 'Clear silhouettes with distinct shapes',
        },
        {
          name: 'Detective', gradientClass: 'from-yellow-400 to-amber-500', textColorClass: 'text-yellow-300', borderColorClass: 'border-yellow-500', stars: 2,
          image: { src: img('shadow match', 'shadow-match-worksheet (2).webp'), alt: 'Medium shadow match — similar shapes' },
          desc: 'Similar shapes that require careful observation',
        },
        {
          name: 'Eagle Eye', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-300', borderColorClass: 'border-blue-500', stars: 3,
          image: { src: img('shadow match', 'shadow-match-worksheet (3).webp'), alt: 'Hard shadow match — tricky silhouettes' },
          desc: 'Tricky silhouettes with subtle differences',
        },
      ],
      trophyText: 'Shadow matching sharpens visual skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #1e293b 0%, #334155 50%, #475569 100%)',
      heading: 'Shadow Detective!',
      tagline: 'Find the Match!',
      image: { src: img('shadow match', 'shadow-match-horizontal.webp'), alt: 'Featured shadow match — engaging silhouette puzzle' },
      pills: ['Print Instantly!', 'Visual Skills', 'With Answer Keys'],
      hasBunting: false,
      hasConfetti: false,
      accentColor: 'yellow',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Shadow Activities',
      subheading: 'Engaging visual perception worksheets',
      items: [
        { image: { src: img('shadow match', 'shadow-match-horizontal.webp'), alt: 'Professional shadow match — horizontal' }, label: 'Horizontal' },
        { image: { src: img('shadow match', 'shadow-match-vertical.webp'), alt: 'Shadow match — vertical layout' }, label: 'Vertical' },
        { image: { src: img('shadow match', 'shadow-match-answer-key (1).webp'), alt: 'Shadow match answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Visual Skills'],
      frameColor: '#FFD93D',
    },
  },

  // ─── Bingo ───
  bingo: {
    hero: {
      gradient: 'linear-gradient(135deg, #1565C0 0%, #7B1FA2 50%, #E53935 100%)',
      accentColor: 'blue',
      badge: 'All Ages',
      heading: 'Picture Bingo Card Generator!',
      subheading: 'Create custom bingo cards with themed images and words',
      images: [
        { src: img('bingo', 'bingo_card.webp'), alt: 'Bingo card — themed picture bingo' },
        { src: img('bingo', 'bingo_card_1.webp'), alt: 'Bingo card — image-based game' },
        { src: img('bingo', 'bingo_card_2.webp'), alt: 'Bingo card — classroom activity' },
      ],
      pills: [
        { label: 'Image & Word Cards', icon: '🎯' },
        { label: 'Callout Sheets', icon: '📋' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: 'B',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #dbeafe 0%, #e0e7ff 40%, #fef3c7 100%)',
      badge: 'Grid Sizes',
      heading: 'Bingo for Every Group Size',
      subheading: 'From simple 3×3 to challenging 5×5 grids',
      tiers: [
        {
          name: '3×3', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('bingo', 'bingo_card_3.webp'), alt: '3x3 bingo card — simple grid' },
          desc: 'Quick games with 9 picture squares',
        },
        {
          name: '4×4', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('bingo', 'bingo_card word.webp'), alt: '4x4 bingo card — word mode' },
          desc: 'Standard bingo with 16 squares',
        },
        {
          name: '5×5', gradientClass: 'from-purple-400 to-violet-500', textColorClass: 'text-purple-700', borderColorClass: 'border-purple-300', stars: 3,
          image: { src: img('bingo', 'bingo_card_4.webp'), alt: '5x5 bingo card — full grid' },
          desc: 'Classic 25-square bingo with free center',
        },
      ],
      trophyText: 'Bingo makes learning a celebration',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #ede9fe 0%, #e0e7ff 50%, #dbeafe 100%)',
      heading: 'BINGO!',
      tagline: 'Game Time Learning!',
      image: { src: img('bingo', 'callout.webp'), alt: 'Bingo callout sheet — themed picture calling cards' },
      pills: ['Print Instantly!', 'Callout Sheets', 'Image & Word Modes'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'indigo',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Bingo Materials',
      subheading: 'Complete sets with cards and callout sheets',
      items: [
        { image: { src: img('bingo', 'bingo_card_1 word.webp'), alt: 'Professional bingo card — word mode' }, label: 'Word Card' },
        { image: { src: img('bingo', 'callout (1).webp'), alt: 'Bingo callout sheet' }, label: 'Callout' },
        { image: { src: img('bingo', 'callout word (1).webp'), alt: 'Word callout sheet' }, label: 'Word Callout' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Multiple Sizes', 'Themed Sets'],
      frameColor: '#7B1FA2',
    },
  },

  // ─── Picture Sort ───
  'picture-sort': {
    hero: {
      gradient: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 30%, #fef2f2 60%, #fff7ed 100%)',
      accentColor: 'pink',
      badge: 'Pre-K to 1st',
      heading: 'Sort Pictures into Categories!',
      subheading: 'Cut and sort themed images into the right groups',
      images: [
        { src: img('picture sort', 'Picture Sort.webp'), alt: 'Picture sort worksheet — categorize images' },
        { src: img('picture sort', 'Picture Sort (1).webp'), alt: 'Picture sort — themed sorting activity' },
        { src: img('picture sort', 'Picture Sort (2).webp'), alt: 'Picture sort — advanced categorization' },
      ],
      pills: [
        { label: 'Cut & Sort', icon: '✂' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⬡',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 40%, #fef3c7 100%)',
      badge: 'Sorting Levels',
      heading: 'Sorting for Every Learner',
      subheading: 'From simple categories to complex classifications',
      tiers: [
        {
          name: 'Sorter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('picture sort', 'Picture Sort (3).webp'), alt: 'Easy sorting — two simple categories' },
          desc: 'Sort into 2 clear categories',
        },
        {
          name: 'Classifier', gradientClass: 'from-pink-400 to-rose-500', textColorClass: 'text-pink-700', borderColorClass: 'border-pink-300', stars: 2,
          image: { src: img('picture sort', 'Picture Sort (6).webp'), alt: 'Medium sorting — themed categories' },
          desc: 'Sort themed images into 3 groups',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('picture sort', 'Picture Sort (10).webp'), alt: 'Hard sorting — complex categories' },
          desc: 'Complex categorization with reasoning',
        },
      ],
      trophyText: 'Sorting builds critical thinking skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      heading: 'Sort It Out!',
      tagline: 'Categories Made Fun!',
      image: { src: img('picture sort', 'Picture Sort (5).webp'), alt: 'Featured picture sort — colorful categorization activity' },
      pills: ['Print Instantly!', 'Cut & Paste', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'pink',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Sorting Activities',
      subheading: 'Beautiful categorization worksheets for young minds',
      items: [
        { image: { src: img('picture sort', 'Picture Sort (8).webp'), alt: 'Professional picture sort worksheet' }, label: 'Sorting' },
        { image: { src: img('picture sort', 'Picture Sort (12).webp'), alt: 'Picture sort — themed variation' }, label: 'Sorting' },
        { image: { src: img('picture sort', 'Picture Sort answer_key (1).webp'), alt: 'Picture sort answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#C2185B',
    },
  },

  // ─── Missing Pieces ───
  'missing-pieces': {
    hero: {
      gradient: 'linear-gradient(160deg, #E3F7FA 0%, #D4F5E9 40%, #F0FFF4 100%)',
      accentColor: 'emerald',
      badge: 'Pre-K to 1st',
      heading: 'Find the Missing Piece!',
      subheading: 'Complete the picture by finding the right cutout',
      images: [
        { src: img('missing pieces', 'Missing Pieces.webp'), alt: 'Missing pieces puzzle worksheet' },
        { src: img('missing pieces', 'Missing Pieces (1).webp'), alt: 'Missing pieces — themed puzzle' },
        { src: img('missing pieces', 'Missing Pieces (2).webp'), alt: 'Missing pieces — advanced challenge' },
      ],
      pills: [
        { label: 'Visual Puzzles', icon: '🧩' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🧩',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 40%, #fef3c7 100%)',
      badge: 'Puzzle Levels',
      heading: 'Puzzles for Every Age',
      subheading: 'Progressive visual completion challenges',
      tiers: [
        {
          name: 'Finder', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('missing pieces', 'Missing Pieces (3).webp'), alt: 'Easy missing pieces — clear cutouts' },
          desc: 'Clear square cutouts with obvious matches',
        },
        {
          name: 'Solver', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('missing pieces', 'Missing Pieces (6).webp'), alt: 'Medium missing pieces — themed images' },
          desc: 'Themed images with circle cutouts',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('missing pieces', 'Missing Pieces (10).webp'), alt: 'Hard missing pieces — tricky matches' },
          desc: 'Multiple cutouts with similar options',
        },
      ],
      trophyText: 'Puzzle solving builds observation skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
      heading: 'Complete the Picture!',
      tagline: 'Puzzle Power!',
      image: { src: img('missing pieces', 'Missing Pieces (8).webp'), alt: 'Featured missing pieces — engaging visual puzzle' },
      pills: ['Print Instantly!', 'Cut & Paste', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'emerald',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Puzzle Worksheets',
      subheading: 'Beautiful visual completion activities',
      items: [
        { image: { src: img('missing pieces', 'Missing Pieces (12).webp'), alt: 'Professional missing pieces worksheet' }, label: 'Puzzle' },
        { image: { src: img('missing pieces', 'Missing Pieces (15).webp'), alt: 'Missing pieces — themed variation' }, label: 'Puzzle' },
        { image: { src: img('missing pieces', 'Missing Pieces answer_key (1).webp'), alt: 'Missing pieces answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#2E7D32',
    },
  },

  // ─── Odd One Out ───
  'odd-one-out': {
    hero: {
      gradient: 'linear-gradient(180deg, #E0F2FE 0%, #FEF3C7 60%, #FDE68A 100%)',
      accentColor: 'amber',
      badge: 'Pre-K to 2nd',
      heading: 'Find the Odd One Out!',
      subheading: 'Spot which picture does not belong in the group',
      images: [
        { src: img('odd one out', 'Find the Odd One Out.webp'), alt: 'Odd one out worksheet — spot the different one' },
        { src: img('odd one out', 'Find the Odd One Out (1).webp'), alt: 'Odd one out — themed categories' },
        { src: img('odd one out', 'Find the Odd One Out (2).webp'), alt: 'Odd one out — advanced challenge' },
      ],
      pills: [
        { label: 'Critical Thinking', icon: '🤔' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '✕',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #e0f2fe 0%, #fef3c7 40%, #fde68a 100%)',
      badge: 'Thinking Levels',
      heading: 'Challenges for Every Thinker',
      subheading: 'From obvious differences to subtle distinctions',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('odd one out', 'Find the Odd One Out (3).webp'), alt: 'Easy odd one out — obvious differences' },
          desc: 'One item clearly different from the rest',
        },
        {
          name: 'Thinker', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 2,
          image: { src: img('odd one out', 'Find the Odd One Out (6).webp'), alt: 'Medium odd one out — themed groups' },
          desc: 'Themed groups with category reasoning',
        },
        {
          name: 'Genius', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 3,
          image: { src: img('odd one out', 'Find the Odd One Out (10).webp'), alt: 'Hard odd one out — subtle differences' },
          desc: 'Subtle distinctions requiring deep thinking',
        },
      ],
      trophyText: 'Finding the odd one out builds classification skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
      heading: 'Spot the Difference!',
      tagline: 'Think & Eliminate!',
      image: { src: img('odd one out', 'Find the Odd One Out (5).webp'), alt: 'Featured odd one out — colorful critical thinking activity' },
      pills: ['Print Instantly!', 'Multiple Themes', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'amber',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Thinking Worksheets',
      subheading: 'Engaging classification and reasoning activities',
      items: [
        { image: { src: img('odd one out', 'Find the Odd One Out (12).webp'), alt: 'Professional odd one out worksheet' }, label: 'Challenge' },
        { image: { src: img('odd one out', 'Find the Odd One Out (15).webp'), alt: 'Odd one out — themed variation' }, label: 'Challenge' },
        { image: { src: img('odd one out', 'Find the Odd One Out answer-key (1).webp'), alt: 'Odd one out answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Categories'],
      frameColor: '#D97706',
    },
  },

  // ─── Sudoku ───
  sudoku: {
    hero: {
      gradient: 'linear-gradient(145deg, #00897B 0%, #00695C 45%, #004D40 100%)',
      accentColor: 'teal',
      badge: 'Grades K-3',
      heading: 'Picture Sudoku for Kids!',
      subheading: 'Solve 4×4 sudoku puzzles with cute animal pictures',
      images: [
        { src: img('sudoku', 'sudoku_easy.webp'), alt: 'Picture sudoku — easy level with animals' },
        { src: img('sudoku', 'sudoku medium.webp'), alt: 'Picture sudoku — medium difficulty' },
        { src: img('sudoku', 'sudoku hard.webp'), alt: 'Picture sudoku — hard challenge' },
      ],
      pills: [
        { label: '4×4 Grid', icon: '⊞' },
        { label: 'Cut & Paste', icon: '✂' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⊞',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ccfbf1 0%, #e0f2fe 40%, #fef3c7 100%)',
      badge: 'Difficulty Levels',
      heading: 'Sudoku for Every Skill Level',
      subheading: 'Three levels of picture puzzle challenge',
      tiers: [
        {
          name: 'Easy', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('sudoku', 'sudoku_worksheet.webp'), alt: 'Easy picture sudoku — few missing pieces' },
          desc: 'Few missing pictures to place',
        },
        {
          name: 'Medium', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('sudoku', 'sudoku_worksheet (5).webp'), alt: 'Medium picture sudoku — themed challenge' },
          desc: 'More missing pictures with themed animals',
        },
        {
          name: 'Hard', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('sudoku', 'sudoku_worksheet (10).webp'), alt: 'Hard picture sudoku — logic challenge' },
          desc: 'Most squares empty — true logic challenge',
        },
      ],
      trophyText: 'Sudoku builds logical reasoning skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      heading: 'Sudoku Fun!',
      tagline: 'Logic Made Playful!',
      image: { src: img('sudoku', 'sudoku_worksheet (3).webp'), alt: 'Featured picture sudoku — adorable animal grid puzzle' },
      pills: ['Print Instantly!', 'Cut & Paste', 'Multiple Levels'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Picture Sudoku',
      subheading: 'Beautifully designed logic puzzles for young thinkers',
      items: [
        { image: { src: img('sudoku', 'sudoku_worksheet (15).webp'), alt: 'Professional picture sudoku worksheet' }, label: 'Puzzle' },
        { image: { src: img('sudoku', 'sudoku_worksheet (20).webp'), alt: 'Picture sudoku — themed variation' }, label: 'Puzzle' },
        { image: { src: img('sudoku', 'sudoku_answer_key (1).webp'), alt: 'Picture sudoku answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Levels'],
      frameColor: '#00897B',
    },
  },

  // ─── Picture Path ───
  'picture-path': {
    hero: {
      gradient: 'linear-gradient(145deg, #2E7D32 0%, #00C853 50%, #4CAF50 100%)',
      accentColor: 'green',
      badge: 'Grades K-2',
      heading: 'Follow the Picture Pathway!',
      subheading: 'Navigate through grids by following picture clues',
      images: [
        { src: img('picture path', 'Picture Pathway.webp'), alt: 'Picture pathway worksheet — follow the trail' },
        { src: img('picture path', 'Picture Pathway (1).webp'), alt: 'Picture pathway — themed grid navigation' },
        { src: img('picture path', 'Picture Pathway (2).webp'), alt: 'Picture pathway — advanced challenge' },
      ],
      pills: [
        { label: 'Grid Navigation', icon: '🧭' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '→',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 40%, #fef3c7 100%)',
      badge: 'Path Levels',
      heading: 'Pathways for Every Explorer',
      subheading: 'From simple trails to complex grid navigation',
      tiers: [
        {
          name: 'Hiker', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('picture path', 'Picture Pathway (3).webp'), alt: 'Easy picture path — simple trail' },
          desc: 'Follow a simple picture trail',
        },
        {
          name: 'Navigator', gradientClass: 'from-green-400 to-teal-500', textColorClass: 'text-green-700', borderColorClass: 'border-green-300', stars: 2,
          image: { src: img('picture path', 'Picture Pathway (6).webp'), alt: 'Medium picture path — themed navigation' },
          desc: 'Navigate themed grids with turns',
        },
        {
          name: 'Explorer', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('picture path', 'Picture Pathway (10).webp'), alt: 'Hard picture path — complex grid' },
          desc: 'Complex grids with multiple path options',
        },
      ],
      trophyText: 'Pathfinding builds problem-solving skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
      heading: 'Find Your Way!',
      tagline: 'Adventure Awaits!',
      image: { src: img('picture path', 'Picture Pathway (5).webp'), alt: 'Featured picture pathway — colorful grid adventure' },
      pills: ['Print Instantly!', 'Grid Navigation', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'green',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Pathway Puzzles',
      subheading: 'Engaging grid navigation activities',
      items: [
        { image: { src: img('picture path', 'Picture Pathway (12).webp'), alt: 'Professional picture pathway worksheet' }, label: 'Pathway' },
        { image: { src: img('picture path', 'Picture Pathway (15).webp'), alt: 'Picture pathway — themed variation' }, label: 'Pathway' },
        { image: { src: img('picture path', 'Picture Pathway answer_key (1).webp'), alt: 'Picture pathway answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#2E7D32',
    },
  },

  // ─── Find and Count ───
  'find-and-count': {
    hero: {
      gradient: 'linear-gradient(145deg, #1A237E 0%, #0097A7 50%, #00BCD4 100%)',
      accentColor: 'cyan',
      badge: 'Pre-K to 2nd',
      heading: 'I Spy — Find & Count!',
      subheading: 'Search for hidden pictures and count how many you find',
      images: [
        { src: img('find and count', 'I Spy 1.webp'), alt: 'I Spy worksheet — find and count hidden objects' },
        { src: img('find and count', 'I Spy 2.webp'), alt: 'I Spy — themed search and count' },
        { src: img('find and count', 'I Spy 3.webp'), alt: 'I Spy — advanced hidden picture challenge' },
      ],
      pills: [
        { label: 'Count & Circle', icon: '🔍' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '🔍',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #e0f2fe 0%, #cffafe 40%, #fef3c7 100%)',
      badge: 'Search Levels',
      heading: 'I Spy for Every Detective',
      subheading: 'From easy counting to challenging hidden objects',
      tiers: [
        {
          name: 'Spotter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('find and count', 'I Spy 4.webp'), alt: 'Easy I Spy — clear pictures to find' },
          desc: 'Large, clear pictures to count',
        },
        {
          name: 'Searcher', gradientClass: 'from-cyan-400 to-blue-500', textColorClass: 'text-cyan-700', borderColorClass: 'border-cyan-300', stars: 2,
          image: { src: img('find and count', 'find and count portrait.webp'), alt: 'Medium I Spy — themed search' },
          desc: 'Themed scenes with more to find',
        },
        {
          name: 'Detective', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('find and count', 'I Spy 10.webp'), alt: 'Hard I Spy — tricky hidden pictures' },
          desc: 'Crowded scenes with tricky hidden objects',
        },
      ],
      trophyText: 'Finding and counting builds attention to detail',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)',
      heading: 'I Spy!',
      tagline: 'Search, Count, Discover!',
      image: { src: img('find and count', 'I Spy 8.webp'), alt: 'Featured I Spy — colorful hidden picture activity' },
      pills: ['Print Instantly!', 'Themed Scenes', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'cyan',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional I Spy Activities',
      subheading: 'Beautiful search-and-count worksheets',
      items: [
        { image: { src: img('find and count', 'I Spy 12.webp'), alt: 'Professional I Spy worksheet' }, label: 'I Spy' },
        { image: { src: img('find and count', 'I Spy 15.webp'), alt: 'I Spy — themed variation' }, label: 'I Spy' },
        { image: { src: img('find and count', 'I Spy 1 answer_key.webp'), alt: 'I Spy answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#0097A7',
    },
  },

  // ─── Find Objects ───
  'find-objects': {
    hero: {
      gradient: 'linear-gradient(135deg, #D32F2F 0%, #FF5722 50%, #FF7043 100%)',
      accentColor: 'red',
      badge: 'All Ages',
      heading: 'Eagle Eyes — Spot the Objects!',
      subheading: 'Test your super vision with challenging spot-the-difference activities',
      images: [
        { src: img('find objects', 'spotworks_worksheet.webp'), alt: 'Find objects worksheet — eagle eye challenge' },
        { src: img('find objects', 'spotworks_worksheet (1).webp'), alt: 'Find objects — themed visual search' },
        { src: img('find objects', 'spotworks_worksheet (2).webp'), alt: 'Find objects — advanced spot challenge' },
      ],
      pills: [
        { label: 'Visual Skills', icon: '👁' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '👁',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #fef2f2 0%, #ffedd5 40%, #fef3c7 100%)',
      badge: 'Vision Levels',
      heading: 'Spotting Challenges for Every Age',
      subheading: 'From clear objects to hidden details',
      tiers: [
        {
          name: 'Rookie', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('find objects', 'spotworks_worksheet (5).webp'), alt: 'Easy find objects — clear items' },
          desc: 'Clear objects easy to spot',
        },
        {
          name: 'Sharp Eye', gradientClass: 'from-red-400 to-rose-500', textColorClass: 'text-red-700', borderColorClass: 'border-red-300', stars: 2,
          image: { src: img('find objects', 'spotworks_worksheet (10).webp'), alt: 'Medium find objects — themed search' },
          desc: 'Themed scenes with camouflaged items',
        },
        {
          name: 'Eagle Eye', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('find objects', 'spotworks_worksheet (20).webp'), alt: 'Hard find objects — hidden items' },
          desc: 'Tiny hidden details for sharp observers',
        },
      ],
      trophyText: 'Spotting objects trains your brain',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #fef2f2 0%, #fecaca 50%, #fca5a5 100%)',
      heading: 'Eagle Vision!',
      tagline: 'Test Your Super Sight!',
      image: { src: img('find objects', 'spotworks_worksheet (8).webp'), alt: 'Featured find objects — exciting visual challenge' },
      pills: ['Print Instantly!', 'Multiple Themes', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'red',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Spotting Activities',
      subheading: 'Challenging visual perception worksheets',
      items: [
        { image: { src: img('find objects', 'spotworks_worksheet (15).webp'), alt: 'Professional find objects worksheet' }, label: 'Challenge' },
        { image: { src: img('find objects', 'spotworks_worksheet (25).webp'), alt: 'Find objects — themed variation' }, label: 'Challenge' },
        { image: { src: img('find objects', 'spotworks_answer_key (1).webp'), alt: 'Find objects answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#D32F2F',
    },
  },

  // ─── Crossword ───
  crossword: {
    hero: {
      gradient: 'linear-gradient(135deg, #1A365D 0%, #0F2744 50%, #1A365D 100%)',
      accentColor: 'blue',
      badge: 'Grades 1-3',
      heading: 'Picture Crossword Puzzles!',
      subheading: 'Solve crosswords using picture clues instead of text',
      images: [
        { src: img('crossword', 'crossword_worksheet.webp'), alt: 'Crossword puzzle worksheet with picture clues' },
        { src: img('crossword', 'crossword_worksheet (1).webp'), alt: 'Picture crossword — themed vocabulary' },
        { src: img('crossword', 'crossword_worksheet (2).webp'), alt: 'Picture crossword — advanced challenge' },
      ],
      pills: [
        { label: 'Image Clues', icon: '📸' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '⊞',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #dbeafe 0%, #e0e7ff 40%, #fef3c7 100%)',
      badge: 'Puzzle Levels',
      heading: 'Crosswords for Every Solver',
      subheading: 'From small grids to full-size puzzles',
      tiers: [
        {
          name: 'Starter', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('crossword', 'crossword_worksheet (3).webp'), alt: 'Easy crossword — small grid' },
          desc: 'Small grids with 4-6 picture clues',
        },
        {
          name: 'Puzzler', gradientClass: 'from-blue-400 to-indigo-500', textColorClass: 'text-blue-700', borderColorClass: 'border-blue-300', stars: 2,
          image: { src: img('crossword', 'crossword_worksheet (6).webp'), alt: 'Medium crossword — themed grid' },
          desc: 'Medium grids with themed vocabulary',
        },
        {
          name: 'Expert', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('crossword', 'crossword_worksheet (10).webp'), alt: 'Hard crossword — large puzzle' },
          desc: 'Large grids with 10+ picture clues',
        },
      ],
      trophyText: 'Crosswords build vocabulary and spelling',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
      heading: 'Puzzle Time!',
      tagline: 'Words Meet Pictures!',
      image: { src: img('crossword', 'crossword_worksheet (5).webp'), alt: 'Featured picture crossword — engaging vocabulary puzzle' },
      pills: ['Print Instantly!', 'Image Clues', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'blue',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Crossword Puzzles',
      subheading: 'Beautiful picture-based crossword activities',
      items: [
        { image: { src: img('crossword', 'crossword_worksheet (8).webp'), alt: 'Professional picture crossword' }, label: 'Puzzle' },
        { image: { src: img('crossword', 'crossword_worksheet (12).webp'), alt: 'Crossword — themed variation' }, label: 'Puzzle' },
        { image: { src: img('crossword', 'crossword_answer_key (1).webp'), alt: 'Crossword answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Grid Sizes'],
      frameColor: '#1A365D',
    },
  },

  // ─── Treasure Hunt ───
  'treasure-hunt': {
    hero: {
      gradient: 'linear-gradient(145deg, #0B3D5B 0%, #006064 55%, #004D40 100%)',
      accentColor: 'teal',
      badge: 'Grades K-2',
      heading: 'Treasure Hunt Adventures!',
      subheading: 'Follow direction clues to find hidden treasure on the grid',
      images: [
        { src: img('treasure hunt', 'Treasure Hunt 1.webp'), alt: 'Treasure hunt worksheet — follow directions' },
        { src: img('treasure hunt', 'Treasure Hunt 2.webp'), alt: 'Treasure hunt — themed grid adventure' },
        { src: img('treasure hunt', 'Treasure Hunt 3.webp'), alt: 'Treasure hunt — advanced navigation' },
      ],
      pills: [
        { label: 'Grid Navigation', icon: '🧭' },
        { label: 'Answer Keys', icon: '✓' },
        { label: 'Print-Ready', icon: '🖨' },
        { label: 'Free Trial with Watermark', icon: '★' },
      ],
      decorativeSymbol: '💎',
    },
    tiered: {
      gradient: 'linear-gradient(180deg, #ccfbf1 0%, #e0f2fe 40%, #fef3c7 100%)',
      badge: 'Adventure Levels',
      heading: 'Adventures for Every Explorer',
      subheading: 'From simple paths to treasure-filled journeys',
      tiers: [
        {
          name: 'Scout', gradientClass: 'from-emerald-400 to-green-500', textColorClass: 'text-emerald-700', borderColorClass: 'border-emerald-300', stars: 1,
          image: { src: img('treasure hunt', 'north south.webp'), alt: 'Easy treasure hunt — north/south directions' },
          desc: 'Simple up-down-left-right navigation',
        },
        {
          name: 'Adventurer', gradientClass: 'from-teal-400 to-cyan-500', textColorClass: 'text-teal-700', borderColorClass: 'border-teal-300', stars: 2,
          image: { src: img('treasure hunt', 'Treasure Hunt 4.webp'), alt: 'Medium treasure hunt — themed grid' },
          desc: 'Themed grids with multi-step directions',
        },
        {
          name: 'Captain', gradientClass: 'from-amber-400 to-orange-500', textColorClass: 'text-amber-700', borderColorClass: 'border-amber-300', stars: 3,
          image: { src: img('treasure hunt', 'Treasure Hunt 5.webp'), alt: 'Hard treasure hunt — complex routes' },
          desc: 'Complex routes with compass directions',
        },
      ],
      trophyText: 'Every treasure found builds problem-solving skills',
    },
    spotlight: {
      gradient: 'linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
      heading: 'Find the Treasure!',
      tagline: 'X Marks the Spot!',
      image: { src: img('treasure hunt', 'up down.webp'), alt: 'Featured treasure hunt — exciting directional grid activity' },
      pills: ['Print Instantly!', 'Grid Adventures', 'With Answer Keys'],
      hasBunting: true,
      hasConfetti: true,
      accentColor: 'teal',
    },
    gallery: {
      gradient: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)',
      heading: 'Professional Treasure Hunts',
      subheading: 'Engaging directional grid activities',
      items: [
        { image: { src: img('treasure hunt', 'Treasure Hunt 1.webp'), alt: 'Professional treasure hunt worksheet' }, label: 'Hunt' },
        { image: { src: img('treasure hunt', 'Treasure Hunt 3.webp'), alt: 'Treasure hunt — themed variation' }, label: 'Hunt' },
        { image: { src: img('treasure hunt', 'Treasure Hunt 1 answer_key.webp'), alt: 'Treasure hunt answer key' }, label: 'Answer Key' },
      ],
      pills: ['Print-Ready', 'No Prep Required', 'Answers Included', 'Multiple Themes'],
      frameColor: '#006064',
    },
  },
};

// ═══════════════════════════════════════════════════════════════════
// GERMAN LOCALIZATION — per-app text overrides
// Format: [heroH, heroSub, tieredH, tieredSub, t1, t2, t3, trophy, spotH, spotTag, galH, galSub]
// ═══════════════════════════════════════════════════════════════════

type DeTextTuple = [string, string, string, string, string, string, string, string, string, string, string, string];

const deAppText: Record<string, DeTextTuple> = {
  addition: [
    'Rechnen mit Bildern lernen!', 'Professionelle Additionsarbeitsblätter, die Ihre Schüler lieben werden',
    'Differenziertes Lernen für jedes Kind', 'Drei Schwierigkeitsstufen, die mit Ihren Schülern wachsen',
    'Einfaches Bilder-Zählen (1-5)', 'Gemischte Bilder mit Summen bis 10', 'Mehrstufige Aufgaben bis 20',
    'Jedes Kind kann in seinem eigenen Tempo Erfolg haben',
    'Additionsspaß!', 'Mathe mit Freude!',
    'Die Kunst der Mathematik', 'Professionelle Arbeitsblätter mit Sorgfalt und Präzision gestaltet',
  ],
  subtraction: [
    'Visuelles Subtrahieren leicht gemacht!', 'Durchstreichen, vergleichen und lösen mit thematischen Bildern',
    'Schritt für Schritt Subtraktion meistern', 'Drei Schwierigkeitsstufen von einfach bis herausfordernd',
    'Bilder durchstreichen (1-5)', 'Bild-Zahl-Subtraktion bis 10', 'Gemischte Modi bis 20',
    'Mit jeder gelösten Aufgabe wächst das Selbstvertrauen',
    'Subtraktionsspaß!', 'Abziehen leicht gemacht!',
    'Professionelle Subtraktionsarbeitsblätter', 'Klare Layouts für junge Lerner',
  ],
  'code-addition': [
    'Knack den Code mit Addition!', 'Löse Rechenaufgaben, um Geheimbotschaften zu entschlüsseln',
    'Von einfachen Summen zu Geheimcodes', 'Drei Schwierigkeitsstufen zum Codeknacken',
    'Einfache Additionscodes (1-5)', 'Größere Summen entschlüsseln längere Botschaften', 'Mehrstufige Codes bis 20',
    'Jeder geknackte Code stärkt das Mathe-Selbstvertrauen',
    'Code knacken!', 'Mathe trifft Geheimnis!',
    'Die Kunst des Codeknackens', 'Professionelle Arbeitsblätter, die Mathe mit Rätseln verbinden',
  ],
  'more-less': [
    'Mehr, Weniger oder Gleich?', 'Mengen vergleichen mit bunten Bilderarbeitsblättern',
    'Zahlenvergleiche meistern', 'Drei Stufen der Vergleichsherausforderung',
    'Erkennen welche Gruppe mehr hat (1-5)', 'Thematische Gruppen bis 10 vergleichen', 'Größer als, kleiner als und gleich',
    'Vergleichsfähigkeiten bilden mathematische Grundlagen',
    'Vergleichen & Entdecken!', 'Zahlenverständnis visuell!',
    'Professionelle Vergleichsarbeitsblätter', 'Klare Layouts für intuitives Mengenvergleichen',
  ],
  'math-puzzle': [
    'Löse & Enthülle Bilder-Rätsel!', 'Rechenaufgaben enthüllen versteckte Tierbilder',
    'Rätsel für jedes Können', 'Von einfachen Summen bis zu kniffligen Rastern',
    'Einfache 3×3-Raster mit Addition', 'Thematische Rätsel mit gemischten Rechenarten', 'Komplexe Raster mit größeren Zahlen',
    'Jedes gelöste Rätsel enthüllt etwas Tolles',
    'Rätselzeit!', 'Mathe + Bilder = Spaß!',
    'Professionelle Mathe-Rätsel', 'Motivierende Raster, die Matheübung spannend machen',
  ],
  'math-worksheet': [
    'Bilder-Algebra für kleine Mathematiker!', 'Gleichungen lösen mit niedlichen Tierbildern',
    'Algebra-Konzepte für jede Stufe', 'Visuelle Gleichungen, die mit Ihren Schülern wachsen',
    'Einfache Bildgleichungen (1-5)', 'Gemischte Themengleichungen bis 10', 'Mehrstufige Bildgleichungen bis 20',
    'Algebraisches Denken von Anfang an aufbauen',
    'Bilder-Algebra!', 'Tiere + Mathe = Lernen!',
    'Professionelle Bilder-Algebra', 'Schöne Arbeitsblätter für visuelles Algebralernen',
  ],
  'alphabet-train': [
    'Alle einsteigen zum Alphabet-Zug!', 'Buchstaben lernen mit einer lustigen Ausschneide-Aktivität',
    'Buchstaben für jeden Lerner', 'Aufbauende Buchstabenerkennungsaktivitäten',
    'Großbuchstaben zuordnen A-M', 'Volles Alphabet mit Themenbildern', 'Groß- und Kleinbuchstaben zuordnen',
    'Jeder Buchstabe ist ein Abenteuer auf dem Zug',
    'Tut-Tut Buchstaben!', 'Buchstaben lernen ist eine Reise!',
    'Wunderschöne Buchstabenaktivitäten', 'Professionell gestaltete Zug-Arbeitsblätter',
  ],
  prepositions: [
    'Raumwörter mit Bildern lernen!', 'Auf, unter, neben, in — Präpositionen visuell und lustig',
    'Präpositionen für jeden Lerner', 'Aufbauende räumliche Wortschatzaktivitäten',
    'Grundlegende Raumwörter: auf, in, unter', 'Erweiterter Wortschatz mit Themenszenen', 'Komplexe räumliche Beziehungen und Sätze',
    'Raumwörter verbessern die Kommunikation',
    'Wo ist es?', 'Raumwörter mit Spaß!',
    'Professionelle Spracharbeitsblätter', 'Schön gestaltete räumliche Wortschatzaktivitäten',
  ],
  'word-guess': [
    'Errate das Wort mit Bilderhinweisen!', 'Fehlende Buchstaben mit Bildhinweisen ergänzen',
    'Wortschatz für jeden Leser', 'Drei Stufen der Worträtsel-Herausforderung',
    'Einfache 3-4 Buchstabenwörter mit Bildhinweisen', 'Themenwortschatz mit 2+ fehlenden Buchstaben', 'Längere Wörter mit eigenen Wortlisten',
    'Jedes erratene Wort stärkt das Lesevertrauen',
    'Wortdetektiv!', 'Bilder + Buchstaben = Spaß!',
    'Professionelle Worträtsel', 'Motivierende Wortschatzarbeitsblätter mit Bilderhinweisen',
  ],
  'word-scramble': [
    'Buchstabensalat mit Bilderhinweisen!', 'Buchstaben neu ordnen zum abgebildeten Wort',
    'Rechtschreibspaß für jede Stufe', 'Drei Stufen der Buchstabensalat-Herausforderung',
    'Einfache 3-4 Buchstaben-Wörter', 'Themenwörter mit 5-6 Buchstaben', 'Längere Wörter und eigene Wortlisten',
    'Jedes entworrene Wort verbessert die Rechtschreibung',
    'Buchstabensalat!', 'Rechtschreibung mit Spaß!',
    'Professionelle Buchstabenrätsel', 'Motivierende Arbeitsblätter für die Rechtschreibung',
  ],
  wordsearch: [
    'Versteckte Wörter im Buchstabengitter!', 'Finde die versteckten Wörter in thematischen Wortsuchrätseln',
    'Wortsuche für jede Stufe', 'Drei Schwierigkeitsstufen der Wortsuche',
    'Einfache 6×6-Raster', 'Mittlere 10×10-Rätsel', 'Anspruchsvolle 15×15-Raster',
    'Jedes gefundene Wort erweitert den Wortschatz',
    'Finde die Wörter!', 'Wortsuche Abenteuer!',
    'Professionelle Wortsuchrätsel', 'Klare Layouts für spannendes Wörtersuchen',
  ],
  cryptogram: [
    'Geheime Bildercodes entschlüsseln!', 'Buchstaben-Ersetzungsrätsel mit thematischen Bildern',
    'Entschlüsselung für jeden Level', 'Drei Stufen der Kryptogramm-Herausforderung',
    'Einfache Buchstabencodes', 'Mittelschwere Verschlüsselungen', 'Fortgeschrittene Kryptogramme',
    'Jeder geknackte Code schärft das logische Denken',
    'Knack den Code!', 'Buchstaben-Rätsel Spaß!',
    'Professionelle Kryptogramme', 'Motivierende Logik-Rätsel zum Ausdrucken',
  ],
  writing: [
    'Schönschreiben mit Führungslinien!', 'Buchstaben und Wörter sauber schreiben lernen',
    'Schreiben für jeden Lerner', 'Aufbauende Handschrift-Übungen',
    'Nachzeichnen üben', 'Geführtes Buchstabenschreiben', 'Selbstständiges Schreiben',
    'Schöne Handschrift öffnet Türen',
    'Schreiben & Lernen!', 'Buchstaben meistern!',
    'Professionelle Schreibübungen', 'Sorgfältig gestaltete Handschrift-Arbeitsblätter',
  ],
  'big-small': [
    'Groß oder Klein erkennen!', 'Größen vergleichen mit lustigen Bildern',
    'Größenvergleiche meistern', 'Drei Stufen des Größenverständnisses',
    'Einfach: groß vs. klein', 'Nach Größe ordnen', 'Komplexe Vergleiche',
    'Größenverständnis stärkt mathematisches Denken',
    'Groß oder Klein?', 'Größen entdecken!',
    'Professionelle Größenvergleiche', 'Klare Arbeitsblätter zum Größenvergleichen',
  ],
  'pattern-train': [
    'Muster auf dem Zug vervollständigen!', 'Erkenne und setze Bildmuster auf dem Zug fort',
    'Muster für jede Stufe', 'Drei Schwierigkeitsgrade der Mustererkennung',
    'AB-Muster', 'ABC-Muster', 'Komplexe ABCD-Muster',
    'Mustererkennung schult logisches Denken',
    'Muster vervollständigen!', 'Zug-Muster Spaß!',
    'Professionelle Muster-Arbeitsblätter', 'Ansprechende Zug-Themen für die Mustererkennung',
  ],
  'pattern-worksheet': [
    'Muster erkennen und fortsetzen!', 'Logisches Denken mit Bildmustern trainieren',
    'Musterübungen für jede Stufe', 'Drei Schwierigkeitsgrade der Mustererkennung',
    'Einfache Wiederholungsmuster', 'Wachsende Muster', 'Komplexe gemischte Muster',
    'Mustererkennung ist der Schlüssel zum logischen Denken',
    'Erkenne das Muster!', 'Logisches Denken Spaß!',
    'Professionelle Muster-Rätsel', 'Durchdachte Arbeitsblätter für kritisches Denken',
  ],
  'draw-and-color': [
    'Zeichnen nach Raster!', 'Schritt für Schritt zeichnen lernen mit Rastervorlagen',
    'Zeichnen für jede Stufe', 'Drei Schwierigkeitsgrade des Rasterzeichnens',
    'Einfache Raster-Kopien', 'Detaillierte Rasterzeichnungen', 'Freie Zeichenherausforderungen',
    'Jedes Bild stärkt die künstlerischen Fähigkeiten',
    'Zeichne es!', 'Kreatives Zeichnen!',
    'Professionelle Zeichenübungen', 'Schritt-für-Schritt Arbeitsblätter für jedes Thema',
  ],
  'drawing-lines': [
    'Linien nachzeichnen üben!', 'Feinmotorik trainieren mit verschiedenen Linienformen',
    'Linienübungen für jede Stufe', 'Drei Schwierigkeitsgrade der Linienverfolgung',
    'Gerade Linien', 'Geschwungene Pfade', 'Komplexe Muster',
    'Feinmotorik bildet die Grundlage für das Schreiben',
    'Nachzeichnen & Lernen!', 'Linien meistern!',
    'Professionelle Linienübungen', 'Aufbauende Arbeitsblätter für die Feinmotorik',
  ],
  coloring: [
    'Ausmalbilder zu jedem Thema!', 'Über 100 Themen zum Ausmalen und kreativen Gestalten',
    'Ausmalbilder für jede Stufe', 'Drei Detailstufen zum Ausmalen',
    'Einfache Umrisse', 'Detaillierte Szenen', 'Komplexe Muster',
    'Kreativität kennt keine Grenzen',
    'Male deine Welt!', 'Farben entdecken!',
    'Professionelle Ausmalbilder', 'Wunderschöne Vorlagen für jedes Thema',
  ],
  'chart-count': [
    'Bilddiagramme erstellen und lesen!', 'Daten sammeln und in Diagrammen darstellen',
    'Diagramme für jede Stufe', 'Drei Schwierigkeitsgrade der Datenvisualisierung',
    'Zählen und grafisch darstellen (1-5)', 'Diagramme lesen und interpretieren', 'Mehrere Kategorien darstellen',
    'Datenkompetenz von Anfang an aufbauen',
    'Daten machen Spaß!', 'Visuelles Zählen!',
    'Professionelle Bilddiagramme', 'Klare Arbeitsblätter für visuelles Datenlernen',
  ],
  matching: [
    'Paare finden!', 'Zusammengehörendes visuell zuordnen mit thematischen Bildern',
    'Zuordnung für jede Stufe', 'Drei Schwierigkeitsgrade der Paarbildung',
    'Einfache 3-Paar-Zuordnung', 'Mittlere 5-Paar-Zuordnung', 'Fortgeschrittene 8+ Paare',
    'Zuordnungsfähigkeiten stärken das Denken',
    'Finde das Paar!', 'Visuelles Zuordnen!',
    'Professionelle Zuordnungsarbeitsblätter', 'Klare Layouts für kognitive Entwicklung',
  ],
  'grid-match': [
    'Raster-Puzzle lösen!', 'Bilder im Gitter richtig zuordnen',
    'Raster-Rätsel für jede Stufe', 'Drei Schwierigkeitsgrade der Gitterzuordnung',
    'Einfache 2×2-Raster', 'Mittlere 3×3-Raster', 'Fortgeschrittene 4×4-Raster',
    'Räumliches Denken durch Rätsel stärken',
    'Raster zuordnen!', 'Puzzle-Spaß!',
    'Professionelle Raster-Rätsel', 'Durchdachte Arbeitsblätter für räumliches Denken',
  ],
  'shadow-match': [
    'Schatten zuordnen!', 'Welcher Schatten gehört zu welchem Bild?',
    'Schattenzuordnung für jede Stufe', 'Drei Schwierigkeitsgrade der Schattenrätsel',
    'Einfache Schattenpaare', 'Gedrehte Schatten', 'Komplexe Schattenrätsel',
    'Beobachtungsgabe durch Schatten schärfen',
    'Finde den Schatten!', 'Schatten-Rätsel Spaß!',
    'Professionelle Schattenrätsel', 'Herausfordernde Arbeitsblätter für die Beobachtungsgabe',
  ],
  bingo: [
    'Bilder-Bingo Karten erstellen!', 'Ausdrucken und Spielen mit thematischen Bingokarten',
    'Bingo für jede Stufe', 'Drei Kartengrößen für verschiedene Altersgruppen',
    'Einfaches 3×3-Bingo', '4×4 Bilder-Bingo', '5×5 Vollständige Bingokarten',
    'Gemeinsam spielen und lernen',
    'BINGO!', 'Bingo-Spaß für alle!',
    'Professionelle Bingokarten', 'Thematische Karten für Gruppen- und Klassenaktivitäten',
  ],
  'picture-sort': [
    'Bilder sortieren und zuordnen!', 'In Kategorien einteilen lernen mit bunten Bildern',
    'Sortierübungen für jede Stufe', 'Drei Schwierigkeitsgrade der Klassifizierung',
    '2-Kategorien-Sortierung', '3-Kategorien-Sortierung', '4+ Kategorien-Herausforderungen',
    'Sortieren schärft das kritische Denken',
    'Sortiere es!', 'Ordnung macht Spaß!',
    'Professionelle Sortierübungen', 'Durchdachte Arbeitsblätter für Klassifizierung',
  ],
  'missing-pieces': [
    'Fehlende Teile finden!', 'Welches Teil fehlt im Bild?',
    'Puzzles für jede Stufe', 'Drei Schwierigkeitsgrade der visuellen Rätsel',
    'Einfache fehlende Teile', 'Mehrteilige Puzzles', 'Komplexe visuelle Herausforderungen',
    'Beobachtungsgabe durch Rätsel stärken',
    'Vervollständige das Bild!', 'Puzzle-Detektiv!',
    'Professionelle Puzzle-Arbeitsblätter', 'Herausfordernde Rätsel für die Beobachtungsgabe',
  ],
  'odd-one-out': [
    'Finde das Andere!', 'Welches Bild passt nicht in die Reihe?',
    'Unterschiede finden für jede Stufe', 'Drei Schwierigkeitsgrade der Logik-Rätsel',
    'Einfache 3er-Gruppen', 'Mittlere 4er-Gruppen', 'Fortgeschrittene 6+ Bilder',
    'Logisches Denken durch Beobachtung stärken',
    'Welches ist anders?', 'Adlerauge gefragt!',
    'Professionelle Logik-Rätsel', 'Durchdachte Arbeitsblätter für Beobachtungsgabe',
  ],
  sudoku: [
    'Bilder-Sudoku Spaß!', 'Logik-Rätsel mit Bildern statt Zahlen',
    'Sudoku für jede Stufe', 'Drei Schwierigkeitsgrade der Sudoku-Rätsel',
    'Einfaches 4×4 Bilder-Sudoku', 'Mittlere 6×6-Raster', 'Schwere 9×9-Herausforderungen',
    'Logisches Denken spielerisch trainieren',
    'Sudoku-Spaß!', 'Bilder-Logik!',
    'Professionelle Bilder-Sudoku', 'Gehirntraining-Rätsel zum Ausdrucken',
  ],
  'picture-path': [
    'Bilderpfad finden!', 'Folge dem richtigen Weg durch das Bilder-Labyrinth',
    'Pfadsuche für jede Stufe', 'Drei Schwierigkeitsgrade der Wegfindung',
    'Einfache gerade Pfade', 'Verzweigte Wege', 'Komplexe Labyrinth-Pfade',
    'Orientierungsfähigkeiten spielerisch trainieren',
    'Finde den Weg!', 'Labyrinth-Abenteuer!',
    'Professionelle Labyrinth-Arbeitsblätter', 'Spannende Pfadsuche mit verschiedenen Themen',
  ],
  'find-and-count': [
    'Ich sehe was & Zählen!', 'Finde und zähle die versteckten Bilder in bunten Szenen',
    'Suchen & Zählen für jede Stufe', 'Drei Schwierigkeitsgrade der Suchbilder',
    '3-5 Objekte finden', 'Bis zu 10 Gegenstände zählen', 'Fortgeschrittene Mehrfach-Zählszenen',
    'Aufmerksames Beobachten macht Spaß',
    'Ich sehe was!', 'Zählen & Finden!',
    'Professionelle Suchbilder', 'Liebevoll gestaltete Szenen zum Suchen und Zählen',
  ],
  'find-objects': [
    'Versteckte Objekte finden!', 'Schärfe deine Augen mit detaillierten Suchbildern',
    'Suchbilder für jede Stufe', 'Drei Schwierigkeitsgrade der Objektsuche',
    'Einfache versteckte Objekte', 'Mittelschwere Szenensuche', 'Komplexe Suchherausforderungen',
    'Scharfe Augen werden belohnt',
    'Finde sie alle!', 'Adleraugen gefragt!',
    'Professionelle Suchbilder', 'Detaillierte Szenen für aufmerksames Beobachten',
  ],
  crossword: [
    'Bilderkreuzworträtsel lösen!', 'Löse die Bilderhinweise und fülle das Gitter',
    'Kreuzworträtsel für jede Stufe', 'Drei Schwierigkeitsgrade der Worträtsel',
    'Einfache 5-Wort-Kreuzworträtsel', 'Mittlere 10-Wort-Rätsel', 'Fortgeschrittene 15+ Wort-Gitter',
    'Wortschatz spielerisch erweitern',
    'Kreuzworträtsel-Spaß!', 'Wörter-Rätsel Abenteuer!',
    'Professionelle Kreuzworträtsel', 'Durchdachte Wort-Gitter für den Wortschatz',
  ],
  'treasure-hunt': [
    'Schatzsuche auf der Karte!', 'Folge den Hinweisen und finde den versteckten Schatz',
    'Schatzsuche für jede Stufe', 'Drei Schwierigkeitsgrade der Kartenrätsel',
    'Einfache Gitterkarten', 'Richtungsbasierte Schatzkarten', 'Komplexe mehrstufige Jagden',
    'Jede Schatzsuche ist ein Abenteuer',
    'Schatzsuche!', 'Karten-Abenteuer!',
    'Professionelle Schatzsuche-Arbeitsblätter', 'Spannende Kartenabenteuer für kleine Entdecker',
  ],
};

// ─── Localization function ───

function localizeShowcase(config: ShowcaseConfig, appId: string): ShowcaseConfig | null {
  const gi = germanImages[appId];
  const dt = deAppText[appId];
  if (!gi || !dt) return null;

  const [heroH, heroSub, tieredH, tieredSub, t1, t2, t3, trophy, spotH, spotTag, galH, galSub] = dt;
  const di = (filename: string) => imgUrl(gi.folder, filename, 'de');

  return {
    hero: {
      ...config.hero,
      badge: t(config.hero.badge, 'de'),
      heading: heroH,
      subheading: heroSub,
      images: [
        { src: di(gi.imgs[0]), alt: config.hero.images[0]?.alt || '' },
        { src: di(gi.imgs[1]), alt: config.hero.images[1]?.alt || '' },
        { src: di(gi.imgs[2]), alt: config.hero.images[2]?.alt || '' },
      ],
      pills: tPills(config.hero.pills, 'de'),
    },
    tiered: {
      ...config.tiered,
      badge: t(config.tiered.badge, 'de'),
      heading: tieredH,
      subheading: tieredSub,
      tiers: config.tiered.tiers.map((tier, i) => ({
        ...tier,
        name: t(tier.name, 'de'),
        image: { src: di(gi.imgs[i]), alt: tier.image.alt },
        desc: [t1, t2, t3][i] || tier.desc,
      })) as [typeof config.tiered.tiers[0], typeof config.tiered.tiers[1], typeof config.tiered.tiers[2]],
      trophyText: trophy,
    },
    spotlight: {
      ...config.spotlight,
      heading: spotH,
      tagline: spotTag,
      image: { src: di(gi.imgs[3]), alt: config.spotlight.image.alt },
      pills: tStringPills(config.spotlight.pills, 'de'),
    },
    gallery: {
      ...config.gallery,
      heading: galH,
      subheading: galSub,
      items: [
        { image: { src: di(gi.imgs[4]), alt: config.gallery.items[0]?.image.alt || '' }, label: t(config.gallery.items[0]?.label || '', 'de') },
        { image: { src: di(gi.imgs[5] || gi.imgs[0]), alt: config.gallery.items[1]?.image.alt || '' }, label: t(config.gallery.items[1]?.label || '', 'de') },
        { image: { src: di(gi.answerKey), alt: config.gallery.items[2]?.image.alt || '' }, label: t('Answer Key', 'de') },
      ],
      pills: tStringPills(config.gallery.pills, 'de'),
    },
  };
}

/** Get showcase config for a given app ID and locale */
export function getLocalizedShowcaseConfig(appId: string, locale: string): ShowcaseConfig | null {
  const enConfig = showcaseConfigs[appId] ?? null;
  if (!enConfig) return null;
  if (locale === 'de') return localizeShowcase(enConfig, appId);
  return enConfig;
}
