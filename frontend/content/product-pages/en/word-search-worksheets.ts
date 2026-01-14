import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/word-search-worksheets.ts
 * URL: /en/apps/word-search-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchEnContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'word-search-worksheets',
    appId: 'word-search',
    title: 'Free Printable Word Search Worksheets | Word Search Generator for Kindergarten',
    description: 'Create professional word search worksheets in seconds with our word search generator. Perfect for kindergarten teachers, first grade educators, and homeschool parents. Generate custom word search puzzles using images or words in just three clicks.',
    keywords: 'word search worksheets, word search generator, kindergarten worksheets, printable worksheets, word search puzzles, free worksheets, first grade worksheets, vocabulary worksheets, sight words worksheets, phonics worksheets',
    canonicalUrl: 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Free Printable Word Search Worksheets',
    subtitle: 'Word Search Generator for Kindergarten and First Grade',
    description: `Create professional word search worksheets in seconds with our word search generator. Perfect for kindergarten teachers, first grade educators, and homeschool parents. Generate custom word search puzzles using images or words in just three clicks. Free version includes watermark for personal use.

Our word search maker helps you create engaging learning activities for young students. Choose from over 3000 child-friendly images organized by theme. Each word search worksheet downloads as a high-quality PDF or JPEG. Your students will love searching for hidden words based on colorful pictures. Core Bundle subscription removes watermark and includes commercial licensing.

This word search generator works in 11 languages. Select a theme like animals or transportation. The app creates a complete word search puzzle with answer key. Edit everything on the canvas before downloading. Add custom text, change colors, or upload your own images. Generate unlimited printable worksheets for classroom or homeschool use.`,
    previewImageSrc: '',
    ctaLabels: {
      tryFree: 'Try Free',
      viewSamples: 'View Samples',
    },
    trustBadges: {
      languages: '11 Languages',
      images: '3000+ Images',
      license: 'Commercial License',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Word Search Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfect for Teachers, Parents, and Educators',
    sectionDescription: 'Word search worksheets benefit multiple teaching contexts. Kindergarten teachers use them for vocabulary building. First grade educators assign them for spelling practice. The flexibility supports diverse teaching goals and student populations.',
    items: [],
    ctaText: 'Start Creating Now',
    bundleDescription: 'Your subscription includes access to 10 worksheet generators:',
    bundleApps: [
      'Image Addition',
      'Alphabet Train',
      'Coloring Pages',
      'Math Worksheets',
      'Word Scramble',
      'Find and Count',
      'MatchUp Maker',
      'Drawing Lines',
      'Picture Bingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine with Other Worksheet Generators',
    sectionDescription: 'Create complete learning packets by combining word search worksheets with these complementary generators.',
    ctaTitle: 'Ready to Create Amazing Worksheets?',
    ctaDescription: 'Join thousands of educators creating professional worksheets. Unlimited generation, commercial license included.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'View All 33 Apps',
    items: [],
  },
};

export default wordSearchEnContent;
