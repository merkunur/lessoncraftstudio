import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Writing Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/writing-worksheets.ts
 * URL: /en/apps/writing-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const writingEnContent: ProductPageContent = {
  // SEO Metadata - Optimized for Google Image Thumbnails and search ranking
  seo: {
    slug: 'writing-worksheets',
    appId: 'writing',
    title: 'Free Letter Tracing Worksheets | Handwriting Practice Generator',
    description: 'Create free letter tracing worksheets for kindergarten and first grade. Handwriting practice with guided lines. Download printable PDF in 3 minutes. Perfect for teachers and parents.',
    keywords: 'tracing worksheets, letter tracing worksheets, handwriting worksheets, kindergarten worksheets, first grade worksheets, free printable worksheets, alphabet worksheets, abc worksheets, sight words worksheets, worksheet for kids',
    canonicalUrl: 'https://www.lessoncraftstudio.com/en/apps/writing-worksheets',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/writing/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Free printable letter tracing worksheet with guided writing lines for kindergarten handwriting practice'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/writing/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Custom text tracing worksheet for first grade handwriting and sight words practice'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/writing/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Beginning letter tracing worksheet with image prompts for alphabet learning and phonics'
      }
    ]
  },

  // Hero Section - FULL text from writing.md paragraphs 1-3
  hero: {
    title: 'Free Printable Tracing Worksheets',
    subtitle: 'Letter Tracing Worksheets Generator for Kindergarten and First Grade',
    description: `Create professional handwriting practice worksheets with our writing worksheet generator. Your Full Access subscription gives you unlimited worksheet creation with no per-worksheet fees. Generate custom printable tracing worksheets perfect for kindergarten and first grade students learning letter formation. Download high-quality PDF worksheets in under 3 minutes.

Our letter tracing worksheets generator helps teachers create alphabet worksheets with guided writing lines. Choose from print or cursive fonts with multiple tracing modes. Each worksheet includes proper baseline guides for correct letter formation. Perfect for handwriting instruction across all grade levels.

Generate tracing worksheets for letters, words, names, or custom text. Your Full Access subscription includes access to all 33 worksheet generator types plus commercial licensing. Create unlimited free printable worksheets for classroom use or selling on Teachers Pay Teachers.`,
    previewImageSrc: '/samples/english/writing/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/writing/
  samples: {
    sectionTitle: 'Free Worksheet for Kids - Free Printables Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from writing.md feature sections
  features: {
    sectionTitle: 'Free Worksheet for Kids Features - Worksheet for Kindergarten and Free Printables',
    sectionDescription: 'Our writing worksheet maker includes powerful features for creating free printables including letter tracing worksheets and handwriting practice materials. Teachers love the free printables for their combination of ease and flexibility. Generate professional free printables in minutes instead of hours spent hand-drawing writing lines.',
    highlightBadgeText: 'Key Feature',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from writing.md step sections
  howTo: {
    sectionTitle: 'How to Create Free Letter Tracing Worksheets in 5 Steps - Free Worksheets for Kindergarten Ready in Minutes',
    sectionDescription: 'Creating professional handwriting practice materials takes under 3 minutes with our writing worksheet generator. The streamlined workflow guides you from blank page to finished worksheet quickly. No graphic design experience required. Follow five simple steps to produce letter tracing worksheets matching your exact teaching needs. Your students receive high-quality practice materials in minutes instead of hours.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Choose Your Page Setup - Free Printable Worksheets for Kids and Free Kindergarten Worksheets',
        description: `Start by selecting your page size from the Page Setup accordion. Choose Letter Portrait for standard US classroom printers. Select A4 Portrait for international settings. Pick Landscape orientation for wider writing lines. Custom size option lets you specify exact dimensions in pixels. The worksheet canvas adjusts automatically to your selected size.

Add optional background themes and border decorations next. Click the Background Theme dropdown to browse available options. Thumbnails preview each theme before selection. Adjust background opacity using the slider if you want subtle watermark effects. Border themes work identically with their own opacity controls. These decorative elements make worksheets more engaging without distracting from handwriting practice.

Upload your own images if you want personalized content. Click Upload Custom Images accordion to access the file selector. Choose multiple image files simultaneously from your computer. Preview thumbnails appear showing all uploaded images. You can add classroom photos, student pictures, or subject-specific graphics. Uploaded images become available for placement on your worksheet canvas.

Browse the 3000+ image library alternatively. Open the Image Library accordion and select a theme from the dropdown. Search by keyword to find specific image types quickly. Click any image thumbnail to select it for your worksheet. Selected images appear in the preview area. Exercise images can automatically generate letter content based on their filenames. This connection between images and text streamlines worksheet creation significantly.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Customize Writing Row Settings - Alphabet Worksheets and First Grade Worksheets for All Learning Levels',
        description: `Add your first writing row by clicking the Add Row button in the top-right corner. A new accordion appears in the sidebar labeled Row 1. Click to expand it and reveal all customization options. Each row works independently so you can mix different settings on one worksheet. This flexibility lets you create multi-level practice sheets or progressive difficulty sequences.

Select your row type from the first dropdown menu. Trace mode shows full guide letters for beginning writers to trace directly. Fading Trace mode displays semi-transparent letters for transitional practice. Guided Copy mode shows the first letter fully with remaining letters faded. Each mode serves different instructional purposes and skill levels. Mix row types on one worksheet to provide differentiated practice.

Choose your font style from the Font Style dropdown. Print Regular offers clean, simple letters perfect for early learners. Print Regular Arrow adds directional arrows showing proper stroke sequence. Print Tracing provides dotted outline letters. Print Tracing Arrow combines dots with stroke direction guides. Cursive option switches to connected handwriting practice. Font choice dramatically impacts the learning experience so match it to your instructional goals.

Set your content type in the Content dropdown. Empty rows provide blank writing lines for independent practice. Beginning Letter option extracts the first letter from your selected image filename automatically. Whole File Name displays the complete filename text for word practice. Custom Text option lets you type any text you want students to trace. A text input field appears when you select this option. Type student names, spelling words, sentences, or any custom content needed for your lesson.

Select case formatting from the Case dropdown. Uppercase creates capital letters throughout. Lowercase generates small letters. Title Case capitalizes the first letter of each word. Case selection applies to automatically generated content from images or custom text you enter. Beginning writers often start with uppercase before progressing to lowercase letters. The case option lets you target either skill level appropriately.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Add Multiple Writing Rows - Free Phonics Worksheets and Free Sight Words Worksheets for Kids',
        description: `Click Add Row again to create additional writing rows on your worksheet. Each new row adds another numbered accordion in the sidebar. Expand any row accordion to access its individual settings. Collapse rows you have already configured to reduce sidebar clutter. The sidebar organization keeps everything manageable even with many rows on one worksheet.

Configure each row independently to build comprehensive practice sheets. Create the first row with uppercase trace letters. Add a second row with lowercase guided copy. Include a third row with custom sight words typed in. Mix font styles like print and cursive on the same page. This multi-row flexibility supports diverse instructional approaches and student needs.

Use the stroke practice feature for pre-writing motor skill development. Change the Content dropdown to Empty. A Stroke Type dropdown appears offering four pattern options. Vertical Line creates up-down stroke practice. Horizontal Line provides left-right movement practice. Circle offers curved stroke practice. Zig-Zag Line develops diagonal control. These fundamental strokes prepare students for letter formation.

Delete any row by clicking its Delete Row button at the bottom of the accordion. The row removes from both sidebar and canvas immediately. Removing rows helps you refine worksheets during creation. Try different configurations and delete what does not work. Experimentation costs nothing since you can regenerate unlimited variations instantly.

Add as many rows as fit your page size comfortably. Letter Portrait typically accommodates 5-8 writing rows depending on height settings. Landscape orientation fits 6-10 rows. Watch the canvas preview to see when your page feels full. Overcrowded worksheets reduce effectiveness so maintain appropriate spacing between rows. Your judgment about visual balance improves quickly with practice.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit on Canvas - Position Math Worksheets, Addition Worksheets, and All Worksheet Elements Perfectly',
        description: `Your writing rows appear on the worksheet canvas automatically as you create them. Each row becomes a draggable, resizable element you can reposition freely. Click any row to select it and show the editing toolbar. Blue selection borders indicate selected elements. Multiple selection works by holding Shift while clicking additional elements. This canvas editing system provides complete layout control.

Drag selected rows to new vertical positions on the page. Click and hold on a row then move your mouse to reposition it. Release the mouse button to place it at the new location. Rearrange row order by dragging rows up or down. Create custom spacing between rows by positioning them precisely where you want them. Visual layout control ensures optimal learning material design.

Resize rows by grabbing the resize handle in the bottom-right corner of selected elements. Click and drag the handle to make rows taller or shorter. Taller rows provide more space for larger handwriting. Shorter rows work for older students with developed fine motor control. Row width adjusts automatically to match page width so you only control height manually.

Add custom text blocks anywhere on the worksheet using Text Tools accordion. Type your text in the input field and click Add Text to Worksheet. The text appears as a draggable element on canvas. Select the text block to access color, size, and font controls. Add worksheet titles, instructions, student name lines, or decorative text elements. Text blocks integrate seamlessly with writing rows.

Place custom images on the canvas using the Custom Images mode in Image Library. Select an uploaded image from the preview gallery. Click Add Selected Image button to place it on the worksheet. The image becomes a movable, resizable element. Position images beside related writing practice. Add picture prompts above word tracing rows. Create themed worksheets combining images and text creatively.

Use the alignment tools in the contextual toolbar for precise positioning. Select multiple elements then click the Align button to show options. Align Left makes all selected elements line up on their left edges. Center Horizontally spaces elements evenly. Align Top positions elements along the same top line. These alignment tools create professional-looking layouts quickly without manual adjustment tedium.

Lock elements to prevent accidental changes after positioning them perfectly. Select an element and click the Lock button in the toolbar. The lock icon changes to indicate locked status. Locked elements cannot be moved, resized, or deleted until unlocked. Use locking to protect your carefully designed layout while you continue editing other elements. This prevents frustrating accidental disruptions to finished areas.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Free Printable Worksheets - ABC Worksheets, Tracing Worksheets, and All Free Worksheet Types',
        description: `Click the Download button in the top-right corner when your worksheet design is complete. A dropdown menu offers two export format options. Download as PDF creates a print-ready PDF file. Download as JPEG exports a high-resolution image file. Both formats produce professional 300 DPI quality suitable for printing or selling. Choose based on your intended use and file compatibility needs.

Select the Grayscale checkbox before downloading if you want black-and-white output. Grayscale conversion saves printer ink costs significantly. Color elements convert to shades of gray automatically. Writing lines and letters remain perfectly clear in grayscale. Many teachers prefer grayscale for routine practice worksheets to manage printing budgets effectively. Color versions work better for special occasions or products you plan to sell.

Click Download as PDF for the highest quality printing results. The PDF format preserves vector graphics where possible. Text and lines stay sharp at any zoom level. PDFs open in any PDF reader on any device. Print directly from the PDF viewer to any printer. PDF files work perfectly for uploading to Teachers Pay Teachers or Etsy as digital products.

Choose Download as JPEG if you need image files instead. JPEG format works with word processors and presentation software easily. Insert worksheet images into larger educational resources. Add them to classroom slideshows or parent newsletters. JPEG files preview easily without special software. They upload to social media platforms for sharing teaching ideas with colleagues.

Your download begins immediately after clicking the format button. The file saves to your browser's default download folder. Open the file to verify it looks correct before printing or sharing. If you notice any changes needed, return to the editor and make adjustments. Regenerate downloads unlimited times until your worksheet is perfect. No download limits exist with your Full Access subscription.

Print your downloaded worksheets on standard printer paper or cardstock. Regular 20-pound copy paper works fine for most handwriting practice. Heavier cardstock provides more durability for repeated use or lamination. Commercial print shops can produce professional booklets from your PDF files. The high 300 DPI resolution ensures crisp printing at any professional print quality level.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from writing.md use case sections
  useCases: {
    sectionTitle: 'Free Worksheet for Kids - Worksheet for Kindergarten for Educators',
    sectionDescription: 'Writing worksheet generators serve diverse teaching contexts and student populations. Preschool teachers preparing students for kindergarten use different materials than third grade teachers refining cursive skills. Homeschool parents need flexibility that classroom teachers do not require. ESL instructors face unique challenges with letter formation across languages. Our generator adapts to all these distinct needs seamlessly.',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from writing.md
  faq: {
    sectionTitle: 'FAQ - Worksheet for Kindergarten and Free Printables',
    sectionDescription: 'Everything you need to know about our writing worksheet generator.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Full Access',
    price: '$240',
    priceInterval: '/year',
    priceSuffix: 'Billed annually',
    benefits: [
      'Unlimited worksheet creation',
      'Commercial license included',
      '11 languages supported',
      '3000+ themed images',
      '300 DPI print quality',
      'Multiple tracing modes',
    ],
    ctaText: 'Start Creating Now',
    bundleDescription: 'Your subscription includes access to all 33 worksheet generators:',
    bundleApps: [
      'Image Addition',
      'Alphabet Train',
      'Big or Small',
      'Picture Bingo',
      'Chart Count',
      'Code Addition',
      'Coloring Pages',
      'Crossword',
      'Cryptogram',
      'Draw and Color',
      'Drawing Lines',
      'Find and Count',
      'Find Objects',
      'Grid Match',
      'MatchUp Maker',
      'Math Puzzle',
      'Math Worksheets',
      'Missing Pieces',
      'More or Less',
      'Odd One Out',
      'Pattern Train',
      'Pattern Worksheets',
      'Picture Path',
      'Picture Sort',
      'Prepositions',
      'Shadow Match',
      'Subtraction',
      'Sudoku',
      'Treasure Hunt',
      'Word Guess',
      'Word Scramble',
      'Word Search',
      'Writing',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine with Other Worksheet Generators',
    sectionDescription: 'Create complete learning packets by combining writing worksheets with these complementary generators.',
    ctaTitle: 'Ready to Create Amazing Worksheets?',
    ctaDescription: 'Join thousands of educators creating professional worksheets. Unlimited generation, commercial license included.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'View All 33 Apps',
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default writingEnContent;
