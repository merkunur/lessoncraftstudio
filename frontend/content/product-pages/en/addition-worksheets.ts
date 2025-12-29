import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/addition-worksheets.ts
 * URL: /en/apps/addition-worksheets
 *
 * This file contains all the content for the Addition Worksheets product page.
 * Each language will have its own content file with native translations.
 */

export const additionEnContent: ProductPageContent = {
  // Hero Section
  hero: {
    title: 'Free Printable Addition Worksheets',
    subtitle: 'Professional Math Worksheet Generator for Kindergarten',
    description: 'Create professional addition worksheets with our math worksheet generator. Generate custom printable worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
    previewImageSrc: '/samples/english/addition/sample-1.jpg',
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

  // Sample Gallery
  samples: {
    sectionTitle: 'Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/addition/sample-1.jpg',
        answerKeySrc: '/samples/english/addition/sample-1-answer.jpg',
        altText: 'Addition worksheet with colorful apple counting for kindergarten',
        pdfDownloadUrl: '/samples/english/addition/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/sample-2.jpg',
        answerKeySrc: '/samples/english/addition/sample-2-answer.jpg',
        altText: 'Visual addition problems with animal images',
        pdfDownloadUrl: '/samples/english/addition/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/sample-3.jpg',
        answerKeySrc: '/samples/english/addition/sample-3-answer.jpg',
        altText: 'Mixed addition worksheet with pictures and numbers',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Everything You Need for Math Worksheets',
    sectionDescription: 'Our addition worksheet maker includes powerful features for creating kindergarten and first grade math activities.',
    highlightBadgeText: 'Key Feature',
    items: [
      {
        id: '1',
        icon: '⚡',
        title: '3-Click Creation',
        description: 'Generate complete addition worksheets in under 3 minutes. Select images, configure settings, and download instantly.',
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Full Canvas Editing',
        description: 'Every element is fully editable. Drag, resize, rotate, and customize any object to match your teaching style.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Your Images',
        description: 'Use classroom photos, student artwork, or curriculum-specific pictures for personalized worksheets.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Languages',
        description: 'Create worksheets in English, Spanish, French, German, and 7 more languages for multilingual classrooms.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Commercial License',
        description: 'Sell your worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP. No attribution required.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Images',
        description: 'Browse animals, vehicles, food, toys, and dozens more themed categories. All included at no extra cost.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: '300 DPI Quality',
        description: 'Professional print resolution for classroom printing and commercial sales. Crisp, clear images every time.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Create Worksheets in 5 Easy Steps',
    sectionDescription: 'No design experience required. Just select, generate, and print.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Select Images',
        description: 'Browse over 3000 child-friendly images organized by theme. Select animals for zoo units, food for nutrition lessons, or seasonal images for holidays.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Customize Settings',
        description: 'Choose page size, problem count (1-10 per page), and difficulty level. Select from four exercise modes including image-based and number problems.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generate Worksheet',
        description: 'Click Generate and your worksheet appears instantly. Problems are randomly created within your specified ranges with colorful images.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit on Canvas',
        description: 'Fine-tune every element. Add custom text, resize images, adjust layout, and personalize with student names or instructions.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download & Print',
        description: 'Export as PDF or JPEG at professional 300 DPI resolution. Answer keys generate automatically for quick grading.',
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Perfect for Teachers, Parents, and Educators',
    sectionDescription: 'Our addition worksheet generator serves diverse educational needs across different teaching environments.',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Kindergarten Teachers',
        subtitle: 'Early Learning Centers',
        description: 'Create engaging visual math worksheets for ages 4-6. Use image-based problems with sums to 5 or 10 for developmentally appropriate practice.',
        quote: 'My students love counting the colorful pictures!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Elementary Teachers',
        subtitle: 'Grades 1-3',
        description: 'Build fact fluency with differentiated worksheets. Transition from concrete images to abstract numbers as students progress.',
        quote: 'I create fresh worksheets daily to keep practice engaging.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool Parents',
        subtitle: 'Multi-Grade Teaching',
        description: 'Generate worksheets for multiple children at different levels. Upload family photos for personalized, engaging math practice.',
        quote: 'One subscription covers all my kids perfectly.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL & Bilingual Teachers',
        subtitle: '11 Languages',
        description: 'Create worksheets in students\' native languages. Perfect for dual-language programs and newcomer support.',
        quote: 'The Spanish worksheets help my English learners succeed.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Special Education',
        subtitle: 'IEP Goals',
        description: 'Easily differentiate with custom problem counts, familiar images, and modified difficulty levels for individual needs.',
        quote: 'I can quickly adapt worksheets for each student\'s IEP.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Teacher Entrepreneurs',
        subtitle: 'Sell on TPT & Etsy',
        description: 'Commercial license included. Create themed bundles and earn passive income from your worksheet designs.',
        quote: 'I earned back my subscription cost in the first month!',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'Everything you need to know about our addition worksheet generator.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [
      {
        id: '1',
        question: 'Is this addition worksheet generator really free to use?',
        answer: 'The generator requires a Core Bundle subscription at $144 per year. However, you create unlimited "free printable worksheets" with your subscription - no per-worksheet fees. Generate as many worksheets as your classroom needs.',
      },
      {
        id: '2',
        question: 'Can I print addition worksheets at home on a regular printer?',
        answer: 'Yes! All worksheets export at 300 DPI resolution and work perfectly with any inkjet or laser printer. Enable grayscale mode to save colored ink while maintaining quality.',
      },
      {
        id: '3',
        question: 'Do I need design skills to create professional worksheets?',
        answer: 'No design skills required. The generator handles all layout and formatting automatically. Most teachers master the interface in under 10 minutes.',
      },
      {
        id: '4',
        question: 'Can I use these worksheets in my classroom?',
        answer: 'Absolutely! Your subscription includes full classroom usage rights. Print for all your students, use for homework, classwork, assessments, and math centers.',
      },
      {
        id: '5',
        question: 'What languages are available?',
        answer: 'Create worksheets in 11 languages: English, Spanish, French, German, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish.',
      },
      {
        id: '6',
        question: 'Can I sell the worksheets I create?',
        answer: 'Yes! Your Core Bundle includes commercial licensing. Sell on Teachers Pay Teachers, Etsy, Amazon KDP, or your own website with no attribution required.',
      },
      {
        id: '7',
        question: 'How do I customize worksheets for different student needs?',
        answer: 'Adjust difficulty by changing item counts (1-10 per group), select from four exercise modes, and use the canvas editor to modify any element for individual needs.',
      },
      {
        id: '8',
        question: 'What age groups work best with addition worksheets?',
        answer: 'Addition worksheets work best for ages 4-8, covering preschool through second grade. Adjust difficulty settings to match each grade level.',
      },
      {
        id: '9',
        question: 'Can I upload my own images?',
        answer: 'Yes! Upload classroom photos, student artwork, or curriculum-specific pictures. Combine uploaded images with our 3000+ library for truly personalized worksheets.',
      },
      {
        id: '10',
        question: 'How long does it take to create one worksheet?',
        answer: 'Under 3 minutes from start to download. Select images (30 sec), configure settings (30 sec), generate (10 sec), review and download (30 sec).',
      },
      {
        id: '11',
        question: 'Do worksheets include answer keys?',
        answer: 'Yes! Every worksheet automatically generates a matching answer key. Download them separately as PDF files for quick grading.',
      },
      {
        id: '12',
        question: 'Can I create themed worksheets for specific subjects?',
        answer: 'Absolutely! Select images matching your current units - ocean animals for marine biology, space images for astronomy, seasonal themes for holidays.',
      },
    ],
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
    guaranteeText: '30-day money-back guarantee',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine with Other Worksheet Generators',
    sectionDescription: 'Create complete learning packets by combining addition worksheets with these complementary generators.',
    ctaTitle: 'Ready to Create Amazing Worksheets?',
    ctaDescription: 'Join thousands of educators creating professional worksheets. Unlimited generation, commercial license included.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'View All 33 Apps',
    items: [
      {
        id: '1',
        slug: 'subtraction-worksheets',
        name: 'Subtraction Worksheets',
        category: 'Math',
        icon: '➖',
        description: 'Complete your math instruction with visual subtraction problems using the same familiar images.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Coloring Pages',
        category: 'Art & Creativity',
        icon: '🎨',
        description: 'Reward completed math work with themed coloring pages that develop fine motor skills.',
      },
      {
        id: '3',
        slug: 'wordsearch',
        name: 'Word Search',
        category: 'Language Arts',
        icon: '🔍',
        description: 'Combine math and literacy with vocabulary word searches using math-related terms.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alphabet Train',
        category: 'Early Learning',
        icon: '🚂',
        description: 'Balance math practice with letter recognition activities for well-rounded learning.',
      },
      {
        id: '5',
        slug: 'math-puzzle',
        name: 'Math Puzzles',
        category: 'Logic',
        icon: '🧩',
        description: 'Challenge students with logic puzzles that apply addition skills in problem-solving contexts.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Tracing Worksheets',
        category: 'Fine Motor',
        icon: '✏️',
        description: 'Develop pencil control skills that help students write numbers neatly on math worksheets.',
      },
    ],
  },
};

export default additionEnContent;
