import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big and Small Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/big-small-worksheets.ts
 * URL: /en/apps/big-small-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const bigSmallEnContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'big-small-worksheets',
    appId: 'big-small-app',
    title: 'Free Big and Small Worksheets for Kindergarten | Size Comparison Generator',
    description: 'Create free printable size comparison worksheets for kids. Professional big and small worksheet generator for kindergarten. Download PDF worksheets in 3 minutes.',
    keywords: 'free worksheet, free worksheets, free printables, worksheet for kids, worksheet for kindergarten, big and small worksheets, size comparison worksheets, kindergarten worksheets, math worksheets, preschool worksheets, first grade worksheets, visual discrimination worksheets, size sorting worksheets, big or small worksheets, free printable worksheets',
  },

  // Hero Section - FULL text from big-small.md introduction paragraphs
  hero: {
    title: 'Free Printable Size Comparison Worksheets for Kindergarten',
    subtitle: 'Big and Small Worksheet Generator for First Grade',
    description: `Create professional size comparison worksheets with our Big and Small worksheet generator. Your Full Access subscription gives you unlimited worksheet creation with no per-worksheet fees. These free printable worksheets teach children to identify big and small objects. Perfect for kindergarten classrooms, preschool centers, and homeschool families.

Size discrimination is a foundational math skill for young learners. Children need to recognize differences in size before they can understand measurement concepts. Our worksheet generator creates engaging size comparison activities in under three minutes. Each worksheet presents clear visual choices that help students identify the biggest, smallest, or medium-sized object.

The Big and Small worksheet maker offers five different question types. Students can circle the big one, circle the small one, or find the medium object. Teachers also use ordering activities where students number objects from smallest to biggest. These varied question formats keep worksheets fresh and challenging. Every worksheet includes an automatic answer key for quick grading.`,
    previewImageSrc: '/samples/english/big small/big-small-different images.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/big small/big-small-different images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small-different images answer_key.jpeg',
        altText: 'Free printable big and small worksheets - size comparison worksheet for kindergarten with different themed images for visual discrimination practice',
        pdfDownloadUrl: '/samples/english/big small/big-small-different images.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/big small/big-small identical images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small identical images answer_key.jpeg',
        altText: 'Size comparison worksheets free printable - big or small worksheet for kids with identical images in different sizes for kindergarten math',
        pdfDownloadUrl: '/samples/english/big small/big-small identical images.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/big small/big-small number 1-2-3.jpeg',
        answerKeySrc: '/samples/english/big small/big-small number 1-2-3 answer_key.jpeg',
        altText: 'Free worksheet for kids - size sorting worksheets where kindergarten students number objects from smallest to biggest for math practice',
        pdfDownloadUrl: '/samples/english/big small/big-small number 1-2-3.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from big-small.md H3 sections
  features: {
    sectionTitle: 'Free Printable Size Comparison Worksheets - Features for Kindergarten and First Grade',
    sectionDescription: 'The Big and Small worksheet generator includes every feature teachers need to create professional size comparison activities. This section covers all the tools available in our worksheet maker. Each feature helps you create better worksheets faster. From easy generation to full editing control, these features make worksheet creation simple.',
    highlightBadgeText: 'Key Feature',
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Create Free Worksheet for Kids: Big and Small Worksheets in Three Clicks',
        description: 'Making size comparison worksheets takes just three clicks. First, select your theme or images. Second, choose your question type. Third, click generate. Your worksheet appears instantly on the canvas. No waiting for processing or loading screens. The generator creates professional layouts automatically. Teachers save hours compared to manual worksheet creation. This speed lets you create free printable worksheets for your entire class in minutes. Kindergarten worksheets have never been this easy to produce.',
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Full Canvas Editing for Math Worksheets and First Grade Worksheets',
        description: 'Every element on your worksheet is fully editable. Drag images to new positions with your mouse. Rotate objects to any angle you prefer. Scale images larger or smaller as needed. Delete elements you do not want. Add new images from the library at any time. This flexibility works perfectly for math worksheets that need specific layouts. First grade worksheets often require custom arrangements. The editing tools give you complete control over your final design. Undo and redo buttons let you experiment freely.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Custom Images for Free Printables and Preschool Worksheets',
        description: 'Teachers can upload their own images to any worksheet. The multi-file uploader accepts all common image formats. Use photos of classroom objects for authentic learning experiences. Upload pictures of student names for personalized alphabet worksheets. Add phonics worksheets images that match your current curriculum. Custom images make worksheets more engaging for students. Combine uploaded images with library images freely. All uploaded images remain available during your session. Create truly unique worksheets that connect to your specific teaching goals.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Eleven Languages for Free Worksheets and Worksheet for Kindergarten',
        description: 'The image library supports eleven different languages. Choose from English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish, Danish, Norwegian, and Finnish. Each language uses properly translated image labels. This feature benefits ESL teachers creating sight words worksheets. Bilingual classrooms use multiple language settings for ABC worksheets. International schools appreciate native language support. The language selector changes image names throughout the library. Students see vocabulary in their home language. Dual-language worksheets become simple to create.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Commercial License for Big or Small Worksheets and Free Printable Worksheets',
        description: 'Full Access subscription includes commercial print-on-demand licensing. Sell worksheets on Teachers Pay Teachers without extra fees. Open an Etsy shop featuring your original tracing worksheets. Publish addition worksheets on Amazon KDP. The commercial license covers all worksheet types you create. No attribution required on sold products. Keep one hundred percent of your sales revenue. Many teachers earn supplemental income selling worksheets. The 300 DPI export quality meets professional print standards. Your tracing worksheets will look sharp and professional.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Image Library for Free Printables and Kindergarten Worksheets',
        description: 'Access over three thousand child-friendly images organized by theme. Animal themes include farm animals, zoo animals, and pets. Food categories cover fruits, vegetables, and treats. Vehicle collections feature cars, trucks, planes, and boats. Seasonal themes change with holidays throughout the year. Each image works perfectly for coloring worksheets when printed in grayscale. Kindergarten worksheets benefit from familiar, friendly imagery. The search function helps you find specific items quickly. Browse by theme or search by keyword. New images are added regularly to expand your options.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professional 300 DPI Quality for Math Worksheets and First Grade Worksheets',
        description: 'Every worksheet exports at professional 300 DPI resolution. This high quality ensures crisp lines and clear images. First grade worksheets print beautifully on any printer. Free printable worksheets look professional enough to sell. Choose between JPEG and PDF export formats. The grayscale toggle saves ink on classroom copies. Download worksheets individually or create answer keys. The answer key generator marks correct answers automatically. Both worksheet and answer key maintain consistent quality. Parents and administrators will notice the professional appearance.',
        highlighted: true,
      },
      {
        id: '8',
        icon: '🔢',
        title: 'Five Question Types for Size Comparison Worksheets and Visual Discrimination Worksheets',
        description: 'The generator offers five different question formats. Circle the big one teaches basic size identification. Circle the small one reinforces comparison skills. Find the medium challenges students with three-way comparisons. Number one to three from small to big introduces ordering concepts. Number one to three from big to small reverses the challenge. These varied formats keep math worksheets engaging over time. Kindergarten worksheets can progress from simple to complex. Teachers can differentiate by selecting appropriate question types. Each format generates unique worksheet layouts.',
        highlighted: false,
      },
      {
        id: '9',
        icon: '✓',
        title: 'Automatic Answer Keys for Size Sorting Worksheets and Worksheet for Kids',
        description: 'Every worksheet includes an automatic answer key option. Generate your worksheet first, then click generate answer key. The answer key shows correct responses clearly marked. Green checkmarks appear on correct answers for identification questions. Numbers appear in correct positions for ordering questions. This feature saves enormous grading time on phonics worksheets. Alphabet worksheets with answer keys help parent volunteers assist. Substitute teachers can grade work accurately. Students can self-check their answers independently. The answer key maintains the same professional quality as the worksheet.',
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from big-small.md Step sections
  howTo: {
    sectionTitle: 'Create Free Big and Small Worksheets for Kindergarten in Five Easy Steps',
    sectionDescription: 'Creating professional size comparison worksheets takes under three minutes. This step-by-step guide walks you through the entire process. No design experience required. No complicated software to learn. Follow these five simple steps to create beautiful worksheets for your students. The Big and Small generator handles all the technical work automatically.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Select Images for Your Size Comparison Worksheet',
        description: 'Start by selecting the images for your size comparison worksheet. Open the Image Library accordion in the sidebar. Choose a theme from the dropdown menu. Popular themes include animals, food, vehicles, and school supplies. Browse the image thumbnails that appear in the gallery. Click any image to add it to your selection. The selected images panel shows your current choices. You need at least two images for each exercise on your worksheet. For a four-exercise worksheet, select eight or more images. The generator will randomly pair images for size comparisons. This method creates free printable worksheets with varied content. Math worksheets benefit from themed image selections that match your curriculum.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Exercise Settings for Your Worksheet',
        description: 'Next, open the Exercise Settings accordion to configure your worksheet. Set the number of exercises between one and ten. More exercises work well for addition worksheets practice sessions. Fewer exercises suit quick assessments or tracing worksheets warmups. Choose two or three images per exercise. Two images create simple big versus small comparisons. Three images add medium-sized objects for greater challenge. Select your question type from five available options. Circle the big one works well for beginners. Ordering tasks challenge more advanced students. Toggle answer indicators on or off based on preference. Enable exercise numbers for structured worksheets. These settings let you create perfectly tailored activities.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generate Your Worksheet Instantly',
        description: 'Click the Generate button to create your worksheet instantly. The canvas displays your complete worksheet within seconds. Images appear in a clean grid layout with proper spacing. The generator automatically sizes images for clear comparisons. Big images appear noticeably larger than small ones. Medium images fall clearly between the two extremes. Review the layout on your screen before proceeding. The worksheet works alongside alphabet worksheets for literacy centers. Combine with phonics worksheets for comprehensive learning stations. If you want different image arrangements, click Generate again. Each generation creates a new random layout. Continue generating until you find the perfect arrangement.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit on Canvas for Full Customization',
        description: 'Now customize your worksheet using the canvas editing tools. Click any image to select it for editing. Drag images to new positions anywhere on the page. Use corner handles to resize images larger or smaller. Rotate images by dragging the rotation handle. Delete unwanted elements by selecting and pressing delete. Add text elements for custom instructions or titles. Change text font, size, color, and outline settings. Add background images from the theme library. Apply decorative borders to enhance visual appeal. These editing tools work identically on coloring worksheets. Kindergarten worksheets often need extra customization for young learners. The undo button reverses any mistakes instantly.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Your Worksheet for Printing',
        description: 'Finally, download your completed worksheet for printing. Click the Download dropdown in the top toolbar. Choose Worksheet JPEG for image format downloads. Select Worksheet PDF for document format downloads. Enable the grayscale toggle to save printer ink. The grayscale option works perfectly for sight words worksheets. Black and white printing costs less than color. Next, generate and download the answer key. Click Generate then Answer Key from the Generate dropdown. Download the answer key in your preferred format. ABC worksheets with answer keys simplify grading tasks. Store your downloaded files for future classroom use. Share digital copies with parents for home practice.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from big-small.md persona sections
  useCases: {
    sectionTitle: 'Free Printable Worksheets for Teachers, Parents, and Educators',
    sectionDescription: 'Size comparison worksheets serve many different educational settings. Teachers, parents, and tutors all benefit from professional worksheet creation tools. This section explains how different educators use the Big and Small generator. Each user type has unique needs that our worksheet maker addresses. Discover how size comparison activities fit into your specific teaching context.',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Preschool and Kindergarten Teachers',
        subtitle: 'Early Childhood Size Discrimination Activities',
        description: 'Preschool and kindergarten teachers use size comparison worksheets daily. Young children ages three to six are developing visual discrimination skills. Identifying big and small objects builds foundational math understanding. These skills prepare students for counting, sorting, and measurement concepts. Kindergarten teachers pair size worksheets with alphabet worksheets during center rotations. Free printable worksheets save precious preparation time for busy educators. The Big and Small generator creates age-appropriate content with child-friendly images. Circle the big one activities work perfectly for pre-K students. Teachers appreciate the automatic answer keys for quick assessment. Size comparison mastery typically occurs during the kindergarten year.',
        quote: 'My students love finding the biggest animal!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'First Grade and Second Grade Teachers',
        subtitle: 'Elementary Mathematics Size Concepts',
        description: 'Elementary school teachers in grades one through three use size worksheets for math instruction. First grade worksheets often include size comparison as a warm-up activity. Students transition from identifying sizes to ordering objects by size. The ordering question types challenge students to sequence three items correctly. Teachers integrate size activities with addition worksheets for comprehensive math lessons. Second grade teachers use more complex three-image comparisons. The medium-sized object adds difficulty appropriate for older students. First grade worksheets with size ordering connect to number line concepts. Greater than and less than symbols relate directly to size comparison skills. Elementary teachers value the curriculum alignment these worksheets provide.',
        quote: 'Size ordering prepares my students for number lines.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool Parents',
        subtitle: 'Flexible Home Education Resources',
        description: 'Homeschool parents appreciate the flexibility of creating custom worksheets at home. Size comparison activities work well in multi-age homeschool settings. Parents can adjust difficulty levels for each child individually. Younger children work on simple big versus small identification. Older siblings tackle ordering tasks with three objects. Homeschool families often combine subjects throughout the day. Size worksheets pair naturally with phonics worksheets during morning routines. Letter size recognition connects to tracing worksheets practice. Parents upload family photos for personalized learning experiences. The commercial license allows homeschool co-ops to share printed materials. Many homeschool parents create worksheet packets for their local community.',
        quote: 'I can differentiate for all three of my kids.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL and Bilingual Teachers',
        subtitle: 'Multilingual Size Vocabulary Support',
        description: 'English as a Second Language teachers find size worksheets valuable for vocabulary building. The eleven language options support diverse classroom populations. Teachers can create worksheets with image labels in students native languages. Bilingual classrooms use dual-language size activities for comparison practice. Size vocabulary appears early in most language curricula. Big, small, and medium are essential descriptive words. ESL teachers combine size activities with sight words worksheets. Basic vocabulary practice reinforces language acquisition naturally. ABC worksheets in multiple languages support letter recognition across languages. International school teachers appreciate the global language support. Heritage language programs use native language settings for cultural connection.',
        quote: 'Students learn size words in both languages.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Special Education Teachers',
        subtitle: 'Differentiated Instruction and Adapted Materials',
        description: 'Special education teachers rely on customizable worksheet features for differentiated instruction. Students with learning differences benefit from visual comparison activities. The adjustable exercise count accommodates varying attention spans. Two exercises per page work well for students needing reduced stimuli. Simple two-image comparisons reduce cognitive load appropriately. Teachers can enlarge images for students with visual processing needs. The identical image mode removes object recognition as a variable. Students focus purely on size differences without distraction. Special education teachers pair size activities with coloring worksheets for fine motor practice. Kindergarten worksheets with modified layouts support inclusive classroom environments. Answer indicators help students understand task expectations clearly.',
        quote: 'The simple layouts work great for my students.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Teacher Entrepreneurs',
        subtitle: 'Creating and Selling Commercial Worksheets',
        description: 'Teacher entrepreneurs use the Big and Small generator to create sellable products. The Full Access subscription includes commercial print-on-demand licensing. Sell original worksheets on Teachers Pay Teachers without extra fees. Create themed worksheet bundles for seasonal marketing opportunities. Math worksheets focusing on size comparison fill a specific market niche. Bundle size activities with other early math concepts for higher value. The professional 300 DPI quality meets marketplace standards. Free printable worksheets as lead magnets attract potential customers. Build an email list by offering sample worksheets. Many teacher sellers earn significant supplemental income monthly. The quick creation process enables rapid product development.',
        quote: 'I sell size comparison bundles every month.',
      },
    ],
  },

  // FAQ Section - ALL questions from big-small.md
  faq: {
    sectionTitle: 'Frequently Asked Questions About Free Size Comparison Worksheets',
    sectionDescription: 'Teachers and parents have common questions about our worksheet generators. This FAQ section answers the most frequent inquiries we receive. Find answers about pricing, features, printing, and classroom use below. Each answer provides practical information to help you get started quickly.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [
      {
        id: '1',
        question: 'Is This Size Comparison Generator Free for Kindergarten Worksheets?',
        answer: 'The Big and Small worksheet generator requires a Full Access subscription costing $240 annually or $25 monthly. Your subscription gives you unlimited worksheet creation with no per-worksheet fees. Generate as many kindergarten worksheets as you need without additional charges. The subscription includes all thirty-three worksheet generators on the platform. Create size comparison worksheets alongside addition worksheets and other math activities. Both personal and commercial use are included in your subscription. The Core Bundle at $144 annually includes ten popular generators but does not include Big and Small. Full Access subscribers get this generator plus twenty-three additional specialized tools.',
      },
      {
        id: '2',
        question: 'Can I Print Size Comparison Worksheets at Home on a Regular Printer?',
        answer: 'Yes, all worksheets print perfectly on standard home printers. The generator exports files optimized for both inkjet and laser printers. Choose letter size or A4 paper depending on your location. Math worksheets print with crisp lines and clear images at any size. First grade worksheets look professional even on basic printer models. The grayscale option reduces ink usage for everyday classroom printing. Color printing works beautifully for special occasions or sellable products. PDF format ensures consistent printing across all printer brands. JPEG format works for quick prints when PDF is unavailable.',
      },
      {
        id: '3',
        question: 'Do I Need Design Skills to Create Size Comparison Worksheets?',
        answer: 'No design skills are required to create professional worksheets. The generator handles all layout and formatting automatically. Simply select your images and choose your settings. Click generate and your worksheet appears ready to download. Tracing worksheets require the same zero-skill process as other worksheet types. Sight words worksheets generate with proper spacing and alignment automatically. The drag-and-drop editor lets you make adjustments without technical knowledge. Move images by clicking and dragging with your mouse. Resize elements using corner handles intuitively. Anyone can create beautiful worksheets within minutes of their first visit.',
      },
      {
        id: '4',
        question: 'Can I Use These Worksheets in My Classroom with Students?',
        answer: 'Full Access subscription includes unlimited classroom use rights. Print as many copies as your students need without restrictions. Phonics worksheets can be distributed to every student in your class. Coloring worksheets work perfectly for early finisher activities or centers. Share digital copies with students for at-home practice sessions. Parent volunteers can print worksheets for classroom use freely. The subscription covers all educational settings including public and private schools. Homeschool families have full rights to use worksheets with their children. Tutoring centers can use worksheets with all their enrolled students.',
      },
      {
        id: '5',
        question: 'What Languages Are Available for Size Comparison Worksheets?',
        answer: 'The image library supports eleven languages for worksheet creation. English serves as the default language for most users. German, French, Spanish, and Italian cover major European languages. Portuguese uses Brazilian Portuguese translations specifically. Dutch, Swedish, Danish, and Norwegian serve Scandinavian educators. Finnish rounds out the eleven supported languages. Alphabet worksheets display image labels in your selected language. ABC worksheets benefit from properly translated vocabulary words. The language selector appears in the sidebar for easy switching. Change languages anytime without losing your current work. Bilingual worksheets become simple when you understand the language options.',
      },
      {
        id: '6',
        question: 'Can I Sell Worksheets I Create with This Generator?',
        answer: 'Yes, Full Access subscription includes full commercial print-on-demand licensing at no extra cost. Sell your original addition worksheets on Teachers Pay Teachers marketplace. Open an Etsy shop featuring your tracing worksheets and other printables. Publish worksheet collections on Amazon KDP for royalty income. The commercial license requires no attribution on sold products. Keep one hundred percent of your sales revenue from worksheet sales. Many teacher entrepreneurs earn significant monthly income selling worksheets. The 300 DPI export quality meets professional marketplace standards. Bundle multiple worksheet types together for higher-value product offerings.',
      },
      {
        id: '7',
        question: 'How Do I Customize Size Comparison Worksheets for My Students?',
        answer: 'Customization options appear throughout the generator interface. Start by selecting specific images that match your curriculum themes. Choose the number of exercises between one and ten per page. Select two or three images per exercise for different difficulty levels. Pick your question type from five available options. Math worksheets can use ordering tasks for number sequence practice. Kindergarten worksheets often work best with simple two-image comparisons. Add custom text for specific instructions or student names. Upload your own images for personalized content connections. Change background and border themes to match classroom decor.',
      },
      {
        id: '8',
        question: 'What Age Groups Work Best with Size Comparison Worksheets?',
        answer: 'Size comparison worksheets work best for children ages three through eight. Preschoolers ages three and four benefit from simple big versus small activities. Kindergarten students ages five and six master two-image comparisons. First grade worksheets introduce ordering tasks with three objects. Second grade students ages seven and eight handle complex sequencing challenges. Phonics worksheets pair well with size activities for literacy integration. The adjustable difficulty settings accommodate all skill levels within this range. Special education students may benefit from simplified versions at any age. Gifted students can tackle advanced ordering tasks earlier than typical peers.',
      },
      {
        id: '9',
        question: 'Can I Upload My Own Images to Size Comparison Worksheets?',
        answer: 'Yes, the multi-file uploader accepts custom images in all common formats. Upload JPEG, PNG, or GIF files from your computer or device. Use photographs of classroom objects for authentic learning connections. Add pictures of student names for personalized coloring worksheets. Upload curriculum-specific images that match your current teaching units. Sight words worksheets benefit from familiar images students recognize. Combine uploaded images with library images in the same worksheet. All uploaded images remain available during your current session. Create truly unique worksheets that connect to your specific students.',
      },
      {
        id: '10',
        question: 'How Long Does It Take to Create Size Comparison Worksheets?',
        answer: 'Most users create complete worksheets in under three minutes. Selecting images from the library takes approximately one minute. Choosing settings requires about thirty seconds of decision time. Generation happens instantly after clicking the generate button. Free printable worksheets download immediately in your chosen format. Alphabet worksheets with custom arrangements may take slightly longer. The editing process adds time only if you want specific adjustments. Experienced users often complete worksheets in under two minutes. Creating multiple worksheet variations takes just seconds each after initial setup. The speed enables teachers to create materials during brief planning periods.',
      },
      {
        id: '11',
        question: 'Do Size Comparison Worksheets Include Answer Keys?',
        answer: 'Yes, every worksheet includes an automatic answer key option. Generate your worksheet first using your selected settings. Then click generate answer key from the dropdown menu. The answer key shows correct responses clearly marked. Green checkmarks appear on correct answers for circle questions. Numbers appear in proper positions for ordering questions. Addition worksheets from other generators also include answer keys. Math worksheets across the platform feature this time-saving option. Download answer keys in the same format as your worksheet. Print answer keys for substitute teachers or parent volunteers. Students can self-check their work using the provided answers.',
      },
      {
        id: '12',
        question: 'Can I Create Worksheets About Specific School Subjects?',
        answer: 'The image library organizes content by themes that cover school subjects naturally. Animal themes support science and nature curriculum connections. Food categories align with health and nutrition education units. Vehicle themes connect to transportation and community helper studies. Seasonal collections match holiday and calendar learning activities. Tracing worksheets can feature subject-specific imagery you select. Coloring worksheets print in grayscale for any theme you choose. Upload custom images to create truly subject-specific worksheets. Combine the Big and Small generator with other tools for comprehensive units. The thirty-three generators cover math, literacy, and creative skill areas.',
      },
      {
        id: '13',
        question: 'Are These Big and Small Worksheets Free Printable for Kindergarten Use?',
        answer: 'Big and small worksheets are available through our Full Access subscription which provides unlimited worksheet creation. Once subscribed, you can create and print as many free printable worksheets as you need for kindergarten classrooms. The subscription model means no per-worksheet fees ever. Kindergarten teachers appreciate the unlimited creation for multiple classes and activities. The worksheets export as PDF or JPEG files ready for any printer. Each worksheet maintains professional quality suitable for daily classroom use. Free printable worksheets save kindergarten budgets significantly compared to purchasing pre-made materials.',
      },
      {
        id: '14',
        question: 'What Makes This Worksheet for Kids Different from Other Size Comparison Tools?',
        answer: 'This worksheet for kids generator stands apart through its combination of features tailored for young learners. The visual discrimination worksheets use child-friendly images that engage students effectively. Five different question types provide varied learning approaches for size comparison. The automatic answer key generation saves teacher preparation time significantly. Worksheet for kindergarten students includes appropriate difficulty levels and clear visual layouts. The 3000+ image library offers themed collections that connect to curriculum topics. Full canvas editing allows customization for individual student needs. Professional 300 DPI quality ensures crisp printing every time.',
      },
      {
        id: '15',
        question: 'Can I Create Free Worksheets for Multiple Kindergarten Classes?',
        answer: 'Your Full Access subscription allows unlimited free worksheets creation for all your kindergarten classes. Create unique kindergarten worksheets for each classroom section without additional fees. Teachers handling multiple classes appreciate the ability to generate varied content quickly. Each worksheet can feature different images and question types for differentiated instruction. Free worksheets for different ability levels within the same grade are easy to produce. The subscription covers all thirty-three worksheet generators for comprehensive curriculum support. Share worksheet files with grade-level team members for collaborative planning.',
      },
      {
        id: '16',
        question: 'How Do Preschool Worksheets Differ from First Grade Worksheets in Size Comparison?',
        answer: 'Preschool worksheets focus on basic big versus small identification with two-image comparisons. First grade worksheets introduce more complex three-image comparisons including medium-sized objects. Preschool students benefit from larger images and simpler layouts for developing visual discrimination. First grade worksheets can include ordering tasks where students number objects from smallest to biggest. The generator allows teachers to adjust exercise settings for each age group appropriately. Preschool worksheets typically use two to four exercises per page. First grade worksheets can handle six to ten exercises for extended practice sessions.',
      },
      {
        id: '17',
        question: 'What Size Sorting Worksheets Options Are Available for Math Practice?',
        answer: 'Size sorting worksheets offer multiple options for comprehensive math practice. Circle the big one exercises teach basic size identification skills. Circle the small one activities reinforce comparison concepts from another angle. Find the medium object introduces three-way size sorting challenges. Number one to three from small to big develops sequencing and ordering skills. Number one to three from big to small reverses the ordering challenge. These math worksheets connect directly to greater than and less than concepts. Size sorting worksheets build foundational skills for measurement curriculum later. Each format generates unique layouts for repeated practice without repetition.',
      },
      {
        id: '18',
        question: 'Do Free Printables Include Visual Discrimination Worksheets for Early Learners?',
        answer: 'Visual discrimination worksheets are a core component of our free printables collection. Size comparison activities require careful visual attention that strengthens discrimination skills. Students must observe subtle differences in object sizes to identify correct answers. The identical image mode isolates size as the only variable for focused discrimination practice. Different image mode adds object recognition alongside size comparison challenges. Visual discrimination worksheets prepare students for reading readiness and letter recognition. These free printables work excellently for early intervention programs and developmental screening. Teachers use visual discrimination worksheets alongside alphabet and phonics activities.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Full Access',
    price: '$240',
    priceInterval: '/year',
    priceSuffix: 'Billed annually',
    benefits: [
      'Unlimited size comparison worksheets',
      'Commercial license included',
      '11 languages supported',
      '3000+ themed images',
      '300 DPI print quality',
      'Automatic answer keys',
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
    sectionDescription: 'The Full Access subscription includes thirty-three different worksheet generators beyond Big and Small. Teachers create comprehensive learning packets by combining multiple worksheet types. This section shows how size comparison activities integrate with other educational tools. Build complete curriculum units using worksheets that reinforce related skills. Every generator works together seamlessly within your single subscription.',
    ctaTitle: 'Ready to Create Amazing Worksheets?',
    ctaDescription: 'Join educators creating professional worksheets. Unlimited generation, commercial license included.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'View All 33 Apps',
    items: [
      {
        id: '1',
        slug: 'addition-worksheets',
        name: 'Addition Worksheets',
        category: 'Math',
        icon: '➕',
        description: 'Size comparison skills connect directly to mathematical thinking. Students who understand big and small grasp greater than and less than concepts faster. Pair size worksheets with addition worksheets for comprehensive math instruction.',
      },
      {
        id: '2',
        slug: 'matching-worksheets',
        name: 'Matching Worksheets',
        category: 'Visual Learning',
        icon: '🔗',
        description: 'Combine size comparison with matching worksheets for visual discrimination practice. Students identify sizes then complete image-to-image matching activities. Create comprehensive visual learning packets.',
      },
      {
        id: '3',
        slug: 'find-and-count-worksheets',
        name: 'Find and Count',
        category: 'Math',
        icon: '🔢',
        description: 'Pair size activities with find and count worksheets for counting practice. Students compare sizes then count objects in I Spy style activities. Build strong early math foundations.',
      },
      {
        id: '4',
        slug: 'coloring-worksheets',
        name: 'Coloring Pages',
        category: 'Art & Creativity',
        icon: '🎨',
        description: 'Combine size worksheets with coloring activities for fine motor practice. Students can color size comparison worksheets after completing exercises. The grayscale export creates perfect coloring versions.',
      },
      {
        id: '5',
        slug: 'drawing-lines-worksheets',
        name: 'Drawing Lines',
        category: 'Fine Motor Skills',
        icon: '✏️',
        description: 'Size discrimination requires visual attention that transfers to handwriting skills. Pair size worksheets with tracing worksheets for complete fine motor practice.',
      },
      {
        id: '6',
        slug: 'alphabet-train-worksheets',
        name: 'Alphabet Train',
        category: 'Early Learning',
        icon: '🚂',
        description: 'Combine size activities with alphabet train worksheets for letter learning. Students practice size concepts while reinforcing letter recognition through fun train themes.',
      },
    ],
  },
};

export default bigSmallEnContent;
