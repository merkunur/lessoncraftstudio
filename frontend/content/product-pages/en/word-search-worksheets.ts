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
    appId: 'wordsearch',
    title: 'Free Word Search Worksheets | Word Search Puzzles Generator for Kids',
    description: 'Create free word search worksheets for kids with our word search generator. Free printables for kindergarten and first grade. Download PDF in 3 clicks.',
    keywords: 'word search worksheets, word search generator, kindergarten worksheets, printable worksheets, word search puzzles, free worksheets, first grade worksheets, vocabulary worksheets, sight words worksheets, phonics worksheets, free worksheet for kids, free printables, worksheet for kindergarten, word puzzles',
    canonicalUrl: 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
    // Images for Google Image Thumbnails in search results
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/wordsearch/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Free printable word search worksheets for kindergarten - vocabulary puzzles with colorful themed images',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/wordsearch/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Word search generator printable worksheets - word puzzles for first grade kids with picture clues',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/wordsearch/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Free word search worksheets - sight words and phonics practice for kindergarten students',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/wordsearch/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Word search printable free - vocabulary word puzzle for preschool learning',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/wordsearch/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Free word puzzles for kids - word search worksheet for kindergarten vocabulary building',
      },
    ],
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Free Printable Word Search Worksheets',
    subtitle: 'Word Search Generator for Kindergarten and First Grade',
    description: `Create professional word search worksheets in seconds with our word search generator. Perfect for kindergarten teachers, first grade educators, and homeschool parents. Generate custom word search puzzles using images or words in just three clicks. Free version includes watermark for personal use.

Our word search maker helps you create engaging learning activities for young students. Choose from over 3000 child-friendly images organized by theme. Each word search worksheet downloads as a high-quality PDF or JPEG. Your students will love searching for hidden words based on colorful pictures. Core Bundle subscription removes watermark and includes commercial licensing.

This word search generator works in 11 languages. Select a theme like animals or transportation. The app creates a complete word search puzzle with answer key. Edit everything on the canvas before downloading. Add custom text, change colors, or upload your own images. Generate unlimited printable worksheets for classroom or homeschool use.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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
    sectionTitle: 'Word Search Worksheets: Sample Free Printable Worksheets',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/english/wordsearch/sample-1.jpeg',
        answerKeySrc: '/samples/english/wordsearch/sample-1.jpeg',
        altText: 'Free printable word search worksheets for kindergarten - vocabulary puzzles with colorful themed images',
        imageTitle: 'Free printable word search worksheets for kindergarten',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/english/wordsearch/sample-2.jpeg',
        answerKeySrc: '/samples/english/wordsearch/sample-2.jpeg',
        altText: 'Word search generator printable worksheets - word puzzles for first grade kids with picture clues',
        imageTitle: 'Word search generator printable worksheets',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/english/wordsearch/sample-3.jpeg',
        answerKeySrc: '/samples/english/wordsearch/sample-3.jpeg',
        altText: 'Free word search worksheets - sight words and phonics practice for kindergarten students',
        imageTitle: 'Free word search worksheets',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/english/wordsearch/sample-4.jpeg',
        answerKeySrc: '/samples/english/wordsearch/sample-4.jpeg',
        altText: 'Word search printable free - vocabulary word puzzle for preschool learning',
        imageTitle: 'Word search printable free',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/english/wordsearch/sample-5.jpeg',
        answerKeySrc: '/samples/english/wordsearch/sample-5.jpeg',
        altText: 'Free word puzzles for kids - word search worksheet for kindergarten vocabulary building',
        imageTitle: 'Free word puzzles for kids',
      },
    ],
    
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Word Search Generator Features: Create Free Worksheets and Free Printables',
    sectionDescription: 'Our word search generator includes seven powerful features. Create free worksheet for kids faster than traditional methods. Every feature helps teachers create free printables and vocabulary worksheets in seconds.',
    highlightBadgeText: 'Key Feature',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'How to Create Word Search Worksheets: Word Puzzles Generator in 5 Steps',
    sectionDescription: 'Creating free worksheets takes less than three minutes. Follow these five simple steps to generate worksheet for kindergarten and first grade worksheets. No design experience required.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Select Images for Word Search Worksheets, Vocabulary Worksheets, and Word Puzzles',
        description: `Start by selecting images for your word search puzzle. Three methods give you complete flexibility. Choose a random theme for instant worksheet generation. Browse the 3000+ image library for specific pictures. Upload your own images for personalized kindergarten worksheets. Each method creates professional results. Teachers switch between methods based on lesson needs.

The random theme option creates worksheets in seconds. Click the dropdown menu. Select "Use Random Theme" and click generate. The app picks a theme automatically. Perfect for emergency substitute plans or last-minute activities. You get a complete word search worksheet without any decisions.

Individual image selection gives you precise control. Open the image library panel. Choose a theme category to filter images. Animals, transportation, food, school supplies, and dozens more themes available. Search by keyword to find specific pictures. Select up to eight images by clicking each one. Your selected images appear in the preview area.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Word Search Generator Settings for Worksheet for Kindergarten',
        description: `Configure your word search settings before generating. Grid size determines puzzle difficulty. Smaller grids work for kindergarten worksheets. Larger grids challenge first grade students. Adjust rows and columns independently. Set anywhere from 5x5 to 30x30 squares. The app remembers your preferred settings for future worksheets.

Choose puzzle direction options to control difficulty. Enable diagonal words for added challenge. Allow reverse words to increase complexity. Turn off both options for beginning readers. These settings create age-appropriate phonics worksheets and sight words worksheets. Kindergarten teachers typically disable diagonal and reverse. First grade teachers enable diagonal for advanced students.

Select your page format and size. Letter portrait works for standard US classrooms. A4 portrait fits international schools. Landscape orientation provides wider puzzle grids. Custom dimensions accommodate special printing needs.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Create Printable Worksheets: Generate Word Search Puzzles for Kindergarten Worksheets and First Grade',
        description: `Click the generate button to create your word search worksheet. The app builds your puzzle in seconds. Watch as images appear on the canvas. The word list generates automatically. Every element positions perfectly on the page. You see the complete worksheet immediately. No waiting or processing delays. The preview shows exactly what students will see.

The word search algorithm places words intelligently. Words never overlap in confusing ways. The grid fills with random letters around hidden words. Letter distribution looks natural and balanced. Students get a clean, professional word search puzzle. The algorithm works the same whether you chose three images or eight words. Every generated worksheet maintains high quality standards.

Answer key generation happens automatically. The app knows where every word hides. Click the answer key tab to see the solution. Hidden words appear highlighted in different colors. Each word uses a unique color for clarity. Teachers can verify puzzle difficulty before printing.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit Word Search Worksheets: Customize Sight Words Worksheets on Canvas',
        description: `Click any element to edit it directly on the canvas. Text becomes editable with one click. Change font family from seven available options. Adjust text size with the slider control. Pick new colors for letters and words. Add text outline for better readability. Every text property adjusts in real-time. Watch your changes update instantly on the worksheet.

Drag elements to new positions anywhere on the page. Move the word search grid higher or lower. Reposition the word list to the side. Drag individual images to better locations. Click and hold to move any object. Everything snaps into place smoothly. The canvas remembers every position change. Create unique layouts for your sight words worksheets and phonics worksheets.

Resize images and elements with corner handles. Click an image to select it. Drag corner handles to make it larger or smaller. Hold shift to maintain proportions. Scale the entire word search grid bigger or smaller. Adjust word list text size. Every element resizes precisely to your specifications.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Word Search Worksheets: Free Worksheet for Kids Ready to Print',
        description: `Download your finished word search worksheet in two formats. PDF format preserves exact layout and quality. JPEG works for quick sharing and web posting. Both formats export at professional 300 DPI resolution. Your printed worksheets look crystal clear on any printer. Choose the format that matches your usage needs.

Click the download dropdown to see all options. Download the main worksheet as JPEG for immediate printing. Save the worksheet as PDF for archival quality. Download the answer key as JPEG for teacher reference. Save the answer key as PDF for professional printing. All download options maintain perfect quality. You get four files from one worksheet creation session.

Enable grayscale mode before downloading to save printer ink. The checkbox converts everything to black and white. Grayscale printing reduces ink costs dramatically. Perfect for schools with limited printing budgets. The conversion maintains readability while eliminating color ink usage.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Word Search Worksheets Use Cases: Free Worksheets and Word Puzzles for Everyone',
    sectionDescription: 'Word search worksheets benefit multiple teaching contexts. Create free worksheet for kids in any subject. First grade educators love our free printables and vocabulary worksheets. The flexibility supports diverse teaching goals.',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Word Search Worksheets FAQ: Free Printables and Word Puzzles Questions',
    sectionDescription: 'Everything you need to know about our word search generator for free worksheet creation and vocabulary worksheets.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Core Bundle',
    price: '$144',
    priceInterval: '/year',
    priceSuffix: 'Billed annually',
    benefits: [
      'Unlimited worksheet creation',
      'Commercial license included',
      '11 languages supported',
      '3000+ themed images',
      '300 DPI print quality',
      'Answer keys included',
    ],
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default wordSearchEnContent;
