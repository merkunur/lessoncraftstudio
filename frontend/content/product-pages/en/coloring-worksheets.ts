import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/coloring-worksheets.ts
 * URL: /en/apps/coloring-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const coloringEnContent: ProductPageContent = {
  // Hero Section - FULL text from coloring.md paragraphs 1-2
  hero: {
    title: 'Free Printable Coloring Pages',
    subtitle: 'Coloring Worksheet Generator for Kindergarten',
    description: `Create professional coloring worksheets with our easy-to-use coloring page designer. Your Core Bundle subscription gives you unlimited coloring page creation with no per-worksheet fees. Generate custom printable coloring pages perfect for kindergarten and first grade students. Design beautiful coloring worksheets in under 3 minutes. Download high-quality PDF and JPEG files ready for printing at home or school.

Our coloring worksheet maker helps teachers and parents create personalized coloring pages for children. Choose from over 3000 child-friendly images organized by themes like animals, food, transportation, and holidays. Upload your own images to build truly custom coloring worksheets that match your teaching needs. Select decorative borders from our border library to frame your coloring pages beautifully. Add text labels, instructions, or titles to any coloring worksheet. Include name fields so students can write their names on worksheets. Add handwriting practice lines to combine coloring with writing skills development.

Every element on your coloring page is fully editable. Drag images anywhere on the canvas with your mouse. Resize any object by pulling corner handles. Rotate images to any angle for perfect positioning. Delete unwanted elements with one click. Layer objects by bringing items forward or sending them backward. Align images to canvas edges or center for professional layouts. Adjust opacity to create layered effects or watermark backgrounds. Flip images horizontally or vertically for variety.`,
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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Coloring Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Perfect for Teachers, Parents, and Educators - Coloring Worksheets for Every Classroom Need',
    sectionDescription: 'Our coloring worksheet generator serves diverse teaching professionals and parents across educational settings. Kindergarten teachers create printable worksheets matching Common Core standards for early childhood. Elementary school teachers design first grade worksheets and second grade worksheets reinforcing curriculum concepts. Homeschool parents build personalized coloring pages targeting individual student needs. ESL teachers use coloring worksheets teaching English vocabulary through visual associations. Special education teachers create adapted printable kindergarten worksheets for differentiated instruction. Teacher entrepreneurs sell custom coloring pages on Teachers Pay Teachers generating supplemental income.',
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
    sectionDescription: 'Create complete learning packets by combining coloring worksheets with these complementary generators.',
    ctaTitle: 'Ready to Create Amazing Worksheets?',
    ctaDescription: 'Join thousands of educators creating professional worksheets. Unlimited generation, commercial license included.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'View All 33 Apps',
    items: [],
  },
};

export default coloringEnContent;
