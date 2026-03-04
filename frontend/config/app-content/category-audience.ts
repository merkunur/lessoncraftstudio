/**
 * "Who Is This For" — Shared Audience Segments
 *
 * 6 categories x 11 locales. Shared across all apps in the same category.
 * Each category has 4 audience segments (~300 words per category per locale).
 */

import type { SupportedLocale } from '../product-page-slugs';

export interface AudienceSegment {
  title: string;
  description: string;
}

export type CategoryAudience = AudienceSegment[];

type CategoryId = 'math' | 'literacy' | 'visual' | 'matching' | 'puzzle' | 'search';

// English audience segments per category
// Other locales will be added in Phases 7-16
const categoryAudienceData: Record<CategoryId, Record<string, CategoryAudience>> = {
  math: {
    en: [
      {
        title: 'Etsy Sellers Building a Math Printable Shop',
        description: 'You sell digital downloads on Etsy and want to expand into math worksheets. These generators let you create unique, professional-quality math printables faster than designing from scratch. Each worksheet targets a specific skill level, so you can build a catalog that covers kindergarten through third grade with dozens of listings per age group.',
      },
      {
        title: 'Amazon KDP Publishers Creating Activity Books',
        description: 'You publish low-content or activity books on Amazon KDP. Math worksheet generators produce print-ready 300 DPI pages that meet KDP formatting requirements. Combine different math operations and difficulty levels into themed activity books that parents and teachers search for on Amazon.',
      },
      {
        title: 'Teachers Pay Teachers Sellers',
        description: 'You create and sell educational resources on TPT. These generators save you hours of worksheet design time while producing materials that match curriculum standards. Add your own branding, customize difficulty, and create bundles that teachers need for their classrooms.',
      },
      {
        title: 'Homeschool Parents and Educators',
        description: 'You teach math at home or in a classroom and need fresh worksheets regularly. Instead of searching for the right worksheet online, create exactly what your students need in seconds. Adjust difficulty, choose themes your kids love, and print as many copies as you need.',
      },
    ],
  },
  literacy: {
    en: [
      {
        title: 'Etsy Sellers Specializing in Language Arts',
        description: 'You sell literacy and language arts printables on Etsy. Word puzzles and letter recognition worksheets are consistently among the most searched educational printables. These generators help you create unique products that stand out from generic templates, with the added advantage of creating the same worksheet in 11 languages to reach international buyers.',
      },
      {
        title: 'Amazon KDP Publishers Building Puzzle Books',
        description: 'You publish word search books, crossword collections, and other puzzle books on KDP. These generators produce camera-ready pages with automatic answer keys. Create themed collections that target specific niches like farm animals, space, or dinosaurs to differentiate your books in a competitive market.',
      },
      {
        title: 'ESL and Language Teachers',
        description: 'You teach English as a second language or foreign languages. The multi-language capabilities let you create vocabulary worksheets where students connect images with words in their target language. Word searches, crosswords, and matching exercises reinforce vocabulary in an engaging way.',
      },
      {
        title: 'Homeschool Families and Tutors',
        description: 'You need fresh literacy activities for your students. Whether it is alphabet recognition for young learners or word puzzles for older kids, these generators create age-appropriate content on demand. Choose from themed image libraries to match your current unit or your child\'s interests.',
      },
    ],
  },
  visual: {
    en: [
      {
        title: 'Etsy Sellers Creating Visual Learning Printables',
        description: 'You sell early learning and visual skill worksheets on Etsy. Pattern recognition, size comparison, and drawing exercises are popular with parents of preschoolers and kindergarteners. These generators help you build a catalog of visually engaging worksheets that teach fundamental skills through hands-on activities.',
      },
      {
        title: 'Amazon KDP Publishers in the Coloring Book Niche',
        description: 'You create coloring books, drawing guides, or visual activity books for KDP. The coloring page and drawing generators turn themed images into print-ready worksheets. Build entire books around popular themes like animals, vehicles, or seasons with consistent quality across every page.',
      },
      {
        title: 'Preschool and Kindergarten Teachers',
        description: 'You need visual learning activities for young students who are still developing fine motor skills and pattern recognition. These generators create worksheets that build foundational skills through drawing lines, identifying patterns, comparing sizes, and coloring themed images.',
      },
      {
        title: 'Parents Looking for Screen-Free Activities',
        description: 'You want engaging, educational activities that get your child away from screens. Print worksheets featuring your child\'s favorite themes and watch them practice drawing, pattern recognition, and visual discrimination while having fun with colorful or hand-drawn images.',
      },
    ],
  },
  matching: {
    en: [
      {
        title: 'Etsy Sellers in the Early Education Niche',
        description: 'You sell preschool and kindergarten printables on Etsy. Matching, sorting, and bingo activities are top sellers because teachers and parents need fresh materials constantly. These generators let you create unique worksheets with themed images that no competitor has, giving your shop a distinct advantage.',
      },
      {
        title: 'Amazon KDP Publishers Creating Activity Packs',
        description: 'You build activity book collections on KDP. Matching and sorting worksheets add variety to your books beyond just coloring or math. Create themed bingo card sets, shadow matching pages, and grid match exercises that keep kids engaged across multiple activity types.',
      },
      {
        title: 'Teachers Needing Classroom Activities',
        description: 'You need ready-to-use matching and sorting activities for your classroom. Print bingo cards for class games, create category sorting exercises for science lessons, or generate shadow matching worksheets for visual discrimination practice. Every worksheet comes with an answer key.',
      },
      {
        title: 'Party Planners and Event Organizers',
        description: 'You organize birthday parties, classroom events, or community gatherings. Picture bingo cards with themed images make perfect party games. Create unique cards for every event theme, print as many as you need, and keep kids entertained with educational fun.',
      },
    ],
  },
  puzzle: {
    en: [
      {
        title: 'Etsy Sellers in the Puzzle and Activity Niche',
        description: 'You sell puzzle worksheets and activity pages on Etsy. Jigsaw puzzles, sudoku, mazes, and odd-one-out exercises are evergreen products that parents and teachers buy year-round. These generators create unique puzzles with themed images that make your listings stand out from text-only alternatives.',
      },
      {
        title: 'Amazon KDP Publishers Building Puzzle Books',
        description: 'You create puzzle and activity books for KDP. Picture sudoku, maze collections, and missing pieces puzzles appeal to parents looking for screen-free entertainment. Each generator produces pages with automatic answer keys, ready for your book layout.',
      },
      {
        title: 'Teachers Looking for Critical Thinking Activities',
        description: 'You need activities that develop logical reasoning, spatial awareness, and problem-solving skills. Picture path mazes, visual sudoku with images, and missing pieces puzzles challenge students while keeping them engaged with colorful themed content.',
      },
      {
        title: 'Parents Seeking Educational Entertainment',
        description: 'You want activities that are both fun and educational for your children. Puzzles develop critical thinking and patience. Choose themes your child loves, adjust difficulty to match their level, and print fresh puzzles whenever they finish the last batch.',
      },
    ],
  },
  search: {
    en: [
      {
        title: 'Etsy Sellers Creating Search and Find Printables',
        description: 'You sell I Spy worksheets, hidden object activities, and search puzzles on Etsy. These are among the most popular printables because they engage kids for extended periods. Create unique scenes with themed images that cannot be found in generic worksheet databases.',
      },
      {
        title: 'Amazon KDP Publishers in the Activity Book Market',
        description: 'You build search-and-find activity books for KDP. Hidden object scenes, crossword puzzles, and treasure hunts fill pages with engaging content. Each generator creates unique layouts with answer keys, so you can rapidly produce themed books for different age groups and interests.',
      },
      {
        title: 'Teachers Needing Attention-Building Activities',
        description: 'You need activities that develop visual scanning, attention to detail, and vocabulary skills. Find-and-count exercises, picture crosswords, and hidden object worksheets keep students focused while reinforcing learning objectives. The image-based approach works across language barriers.',
      },
      {
        title: 'Parents and Caregivers',
        description: 'You need engaging activities for quiet time, travel, or waiting rooms. Search and find worksheets hold children\'s attention longer than most activities. Print themed treasure hunts and I Spy pages that match your child\'s current interests and keep them entertained without screens.',
      },
    ],
  },
};

/**
 * Get audience segments for a category and locale.
 * Falls back to English if locale not available.
 */
export function getCategoryAudience(
  categoryId: string,
  locale: SupportedLocale
): CategoryAudience {
  const category = categoryAudienceData[categoryId as CategoryId];
  if (!category) return [];
  return category[locale] || category.en || [];
}
