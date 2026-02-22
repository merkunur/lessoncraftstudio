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
    appId: 'big-small',
    title: 'Big and Small Worksheet Maker for Kids | LessonCraftStudio',
    description: 'Create big and small worksheets with visual size comparison activities. Free printable for pre-K and kindergarten. Build spatial awareness and sorting skills.',
    keywords: 'size comparison activities, bigger and smaller worksheets, size sorting printable, spatial awareness for kids, large and small activities, size ordering worksheets, visual size sorting, preschool size concepts, compare sizes worksheets, measurement readiness worksheets',
    canonicalUrl: 'https://www.lessoncraftstudio.com/en/apps/big-small-worksheets',
      },

  // Hero Section - FULL text from big-small.md introduction paragraphs
  hero: {
    title: 'Big and Small Size Comparison Worksheets',
    subtitle: 'Visual Size Sorting Activities for Pre-K and Kindergarten',
    description: `Create professional size comparison worksheets with our Big and Small worksheet generator. Your Full Access subscription gives you unlimited worksheet creation with no per-worksheet fees. These free printable worksheets teach children to identify big and small objects. Perfect for kindergarten classrooms, preschool centers, and homeschool families.

Size discrimination is a foundational math skill for young learners. Children need to recognize differences in size before they can understand measurement concepts. Our worksheet generator creates engaging size comparison activities in under three minutes. Each worksheet presents clear visual choices that help students identify the biggest, smallest, or medium-sized object.

The Big and Small worksheet maker offers five different question types. Students can circle the big one, circle the small one, or find the medium object. Teachers also use ordering activities where students number objects from smallest to biggest. These varied question formats keep worksheets fresh and challenging. Every worksheet includes an automatic answer key for quick grading.

The Big and Small generator offers five distinct question types that develop size discrimination progressively. Circle the Big and Circle the Small build basic comparison skills. Find the Medium introduces three-way size relationships. Ordering tasks require arranging objects from biggest to smallest or vice versa. Each question type targets different cognitive complexity levels suitable for preschool through first grade learners. Teachers set between two and five images per exercise to control difficulty precisely. Fewer images with dramatic size differences suit beginning learners while more images with subtle variations challenge advanced students.`,
    previewImageSrc: '/samples/english/big-small/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Try Free',
      viewSamples: 'View Samples',
    },
    trustBadges: {
      languages: '11 Languages',
      images: '3000+ Images',
      license: 'Commercial License',
    },
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'See How It Works',
        modalTitle: 'Quick Feature Overview',
      },
      appSpecific: {
        videoId: 'S2s2U6Nb7FI',
        buttonText: 'Big and Small Features',
        modalTitle: 'Big and Small Tutorial',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/big-small/
  samples: {
    sectionTitle: 'Free Worksheets - Worksheet for Kindergarten Free Printables',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [],
    
  },

  // Features Grid - FULL descriptions from big-small.md H3 sections
  features: {
    sectionTitle: 'Free Worksheets Features - Free Printables and Worksheet for Kindergarten',
    sectionDescription: 'Create free worksheet for kids with our Big and Small worksheet generator. This includes every feature teachers need to create professional free worksheet for kids for size comparison. Each feature helps you create better free worksheet for kids faster. From easy generation to full editing control, these features make free worksheet for kids creation simple.',
    highlightBadgeText: 'Key Feature',
    items: [
      {
        id: '1',
        icon: '📏',
        title: 'Five Size Comparison Question Types for Progressive Learning',
        description: 'Choose from five distinct question modes that build size discrimination skills progressively. Circle the Big asks students to identify the largest image. Circle the Small targets the smallest. Find the Medium challenges learners to pick the middle-sized object. Ordering from biggest to smallest and smallest to biggest develop sequential reasoning. Each mode addresses a different cognitive skill level.',
        highlighted: true,
      },
      {
        id: '2',
        icon: '⚙️',
        title: 'Adjustable Image Count Per Exercise for Age-Appropriate Challenge',
        description: 'Control difficulty by setting two to five images per exercise question. Two images work perfectly for preschool beginners learning basic big versus small distinctions. Three images introduce the medium concept for kindergarten students. Four and five images challenge first graders with more nuanced size discrimination requiring careful visual analysis across multiple objects.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '🖼️',
        title: '3000+ Themed Images Organized by Category for Visual Size Activities',
        description: 'Browse over 3000 child-friendly images organized across dozens of themes including animals, food, vehicles, toys, and nature. Every image renders at different sizes within exercises so students compare familiar objects. Theme-based generation automatically selects varied images ensuring visually engaging worksheets that connect size concepts to real-world objects children recognize.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '✅',
        title: 'Automatic Answer Key Generation for Every Size Worksheet',
        description: 'Every big and small worksheet automatically generates a complete answer key highlighting the correct responses. Teachers verify student work in seconds without solving exercises themselves. Print answer keys on separate pages for self-checking stations or use them during whole-class review sessions. The system marks correct answers clearly for quick grading.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '🎨',
        title: 'Full Canvas Editing With Drag Resize and Rotate Controls',
        description: 'Click any element on the canvas to select, reposition, resize, or rotate it freely. Add custom titles, student names, and instructions using professional text tools. Choose from themed backgrounds and decorative borders to create visually appealing worksheets. Lock completed elements to prevent accidental changes while editing other sections of your size comparison worksheet.',
        highlighted: false,
      },
      {
        id: '6',
        icon: '📄',
        title: 'Configurable Exercise Count From One to Ten Per Page',
        description: 'Set between one and ten exercises per worksheet page to match your lesson objectives and student attention spans. Fewer exercises with larger images work best for preschool learners who need clear visual distinctions. More exercises per page suit older students ready for focused independent practice during math centers or homework assignments.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '📤',
        title: 'Upload Custom Images for Personalized Size Comparison Activities',
        description: 'Upload your own photos and images to create truly personalized size worksheets. Use classroom objects, student artwork, or curriculum-specific pictures for contextual learning. Combine uploaded images with the built-in library for maximum variety. Support for JPEG, PNG, and GIF formats with batch upload capability for efficient workflow.',
        highlighted: false,
      },
      {
        id: '8',
        icon: '🌍',
        title: 'Create Size Worksheets in Eleven Languages for Global Classrooms',
        description: 'Generate size comparison worksheets in English, Spanish, French, German, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, or Finnish. All interface labels, instructions, and question prompts translate automatically. Perfect for ESL classrooms, bilingual programs, and international schools where students learn size vocabulary in their primary language.',
        highlighted: false,
      },
      {
        id: '9',
        icon: '🖨️',
        title: 'Professional PDF and JPEG Downloads at 300 DPI Print Quality',
        description: 'Download completed worksheets as high-resolution PDF or JPEG files ready for professional printing. The 300 DPI output ensures crisp images and sharp text on standard paper sizes. Enable grayscale mode to save color ink while maintaining clear visual distinctions between different-sized objects. Both formats work for classroom printing and commercial distribution.',
        highlighted: false,
      },
      {
        id: '10',
        icon: '💼',
        title: 'Commercial License Included for Selling Size Worksheets Online',
        description: 'Your subscription includes commercial licensing for selling size comparison worksheets on Teachers Pay Teachers, Etsy, Amazon KDP, or your own website. Create themed bundles combining multiple size activities with different image themes. No attribution required and no additional licensing fees. Size comparison worksheets fill a high-demand niche in the early childhood educational marketplace.',
        highlighted: false,
      },
    ], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from big-small.md Step sections
  howTo: {
    sectionTitle: 'How to Create Worksheet for Kindergarten - Free Worksheets in 5 Steps',
    sectionDescription: 'Creating professional size comparison worksheets takes under three minutes. This step-by-step guide walks you through the entire process. No design experience required. No complicated software to learn. Follow these five simple steps to create beautiful worksheets for your students. The Big and Small generator handles all the technical work automatically.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Select Images for Size Comparison Worksheets: Kindergarten Worksheets Setup',
        description: 'Start by selecting the images for your size comparison worksheet. Open the Image Library accordion in the sidebar. Choose a theme from the dropdown menu. Popular themes include animals, food, vehicles, and school supplies. Browse the image thumbnails that appear in the gallery. Click any image to add it to your selection. The selected images panel shows your current choices. You need at least two images for each exercise on your worksheet. For a four-exercise worksheet, select eight or more images. The generator will randomly pair images for size comparisons. This method creates free printable worksheets with varied content. Math worksheets benefit from themed image selections that match your curriculum.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Visual Discrimination Worksheets: Preschool Worksheets Exercise Options',
        description: 'Next, open the Exercise Settings accordion to configure your worksheet. Set the number of exercises between one and ten. More exercises work well for addition worksheets practice sessions. Fewer exercises suit quick assessments or tracing worksheets warmups. Choose two or three images per exercise. Two images create simple big versus small comparisons. Three images add medium-sized objects for greater challenge. Select your question type from five available options. Circle the big one works well for beginners. Ordering tasks challenge more advanced students. Toggle answer indicators on or off based on preference. Enable exercise numbers for structured worksheets. These settings let you create perfectly tailored activities.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generate Big and Small Worksheets: Free Printable Worksheets in Seconds',
        description: 'Click the Generate button to create your worksheet instantly. The canvas displays your complete worksheet within seconds. Images appear in a clean grid layout with proper spacing. The generator automatically sizes images for clear comparisons. Big images appear noticeably larger than small ones. Medium images fall clearly between the two extremes. Review the layout on your screen before proceeding. The worksheet works alongside alphabet worksheets for literacy centers. Combine with phonics worksheets for comprehensive learning stations. If you want different image arrangements, click Generate again. Each generation creates a new random layout. Continue generating until you find the perfect arrangement.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit Size Sorting Worksheets: Math Worksheets Canvas Customization',
        description: 'Now customize your worksheet using the canvas editing tools. Click any image to select it for editing. Drag images to new positions anywhere on the page. Use corner handles to resize images larger or smaller. Rotate images by dragging the rotation handle. Delete unwanted elements by selecting and pressing delete. Add text elements for custom instructions or titles. Change text font, size, color, and outline settings. Add background images from the theme library. Apply decorative borders to enhance visual appeal. These editing tools work identically on coloring worksheets. Kindergarten worksheets often need extra customization for young learners. The undo button reverses any mistakes instantly.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Big or Small Worksheets: First Grade Worksheets PDF Export',
        description: 'Finally, download your completed worksheet for printing. Click the Download dropdown in the top toolbar. Choose Worksheet JPEG for image format downloads. Select Worksheet PDF for document format downloads. Enable the grayscale toggle to save printer ink. The grayscale option works perfectly for sight words worksheets. Black and white printing costs less than color. Next, generate and download the answer key. Click Generate then Answer Key from the Generate dropdown. Download the answer key in your preferred format. ABC worksheets with answer keys simplify grading tasks. Store your downloaded files for future classroom use. Share digital copies with parents for home practice.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from big-small.md persona sections
  useCases: {
    sectionTitle: 'Free Printables for Teachers - Worksheet for Kindergarten for Every Educator',
    sectionDescription: 'Size comparison worksheets serve many different educational settings. Teachers, parents, and tutors all benefit from professional worksheet creation tools. This section explains how different educators use the Big and Small generator. Each user type has unique needs that our worksheet maker addresses. Discover how size comparison activities fit into your specific teaching context.',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Kindergarten Teachers: Visual Size Discrimination Development',
        subtitle: 'Big & Small Worksheets for Ages 5-6 Classroom Activities',
        description: 'Kindergarten teachers integrate size comparison worksheets into daily routines as engaging math center activities. Set difficulty to beginner level with simple exercises that build visual size discrimination and ordering skills progressively. The visual format requires minimal reading so students work independently after brief teacher modeling. Create themed worksheets matching current classroom units for cross-curricular connections. Generate multiple versions using different image themes for variety throughout the week.',
        quote: 'My kindergarteners love the big & small worksheets. They ask for more every day!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'First Grade Teachers: Building Visual Size Discrimination Skills',
        subtitle: 'Advanced Big & Small Activities for Independent Practice',
        description: 'First grade teachers use size comparison worksheets at increased difficulty levels for independent practice and early finisher activities. Students develop visual size discrimination and ordering skills through progressively challenging exercises that build confidence and persistence. Create differentiated worksheet sets using the same theme at multiple levels for seamless classroom management. The size comparison activities work perfectly for morning routines, homework packets, and assessment preparation activities.',
        quote: 'Big & Small worksheets are my go-to early finisher activity. Students stay engaged until the bell.',
      },
      {
        id: '3',
        icon: '🌟',
        title: 'Special Education Teachers: Accessible Big & Small Activities',
        subtitle: 'Visual Learning Supports for Diverse Abilities',
        description: 'Special education teachers value size comparison worksheets because the visual format accommodates diverse learning needs without requiring strong reading skills. Adjust difficulty settings to create individualized worksheets matching each student\'s developmental level. The image-based exercises build visual size discrimination and ordering skills through concrete visual experiences rather than abstract concepts. Create consistent routine activities using familiar image themes that reduce anxiety while building essential cognitive skills.',
        quote: 'The adjustable difficulty lets me create big & small sheets perfect for each student\'s level.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL Teachers: Language-Free Big & Small Practice',
        subtitle: 'Visual Activities Accessible at All Language Levels',
        description: 'ESL teachers incorporate size comparison worksheets as equitable activities where all students participate regardless of English proficiency. The size comparison activities require visual analysis rather than language comprehension, creating natural entry points for newcomer students. Use themed images to build vocabulary connections as students discuss their work. Generate worksheets in eleven languages to provide instructions in students\' primary language while developing visual size discrimination and ordering skills.',
        quote: 'My newcomer students complete big & small worksheets with the same confidence as native speakers.',
      },
      {
        id: '5',
        icon: '🏠',
        title: 'Homeschool Parents: Self-Paced Big & Small Learning',
        subtitle: 'Independent Practice Activities for Home Education',
        description: 'Homeschool parents appreciate size comparison worksheets as independent practice activities that develop visual size discrimination and ordering skills without requiring constant supervision. Create progressive difficulty sets for self-paced skill building across multiple sessions. The visual format engages children who struggle with text-heavy worksheets. Generate themed versions connecting to current unit studies for integrated learning. One subscription provides unlimited worksheet creation for multiple children at different ability levels.',
        quote: 'My kids work through big & small sheets independently while I teach their siblings.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Teacher Entrepreneurs: Big & Small Bundles for Marketplace',
        subtitle: 'Create and Sell Professional Worksheet Products Online',
        description: 'Teacher entrepreneurs create themed size comparison worksheets bundles for Teachers Pay Teachers, Etsy, and Amazon KDP. Package worksheets by theme, difficulty level, or seasonal collections for maximum marketplace appeal. The size comparison activities fill a consistent demand niche in early childhood education. Your subscription includes commercial licensing with no additional fees or attribution requirements. Create holiday packs, themed bundles, and progressive difficulty series generating passive income from your teaching expertise.',
        quote: 'My big & small bundles sell consistently. The themed sets are especially popular.',
      },
    ], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - ALL questions from big-small.md
  faq: {
    sectionTitle: 'FAQ - Free Worksheets and Free Printables Questions Answered',
    sectionDescription: 'Teachers and parents have common questions about our worksheet generators. This FAQ section answers the most frequent inquiries we receive. Find answers about pricing, features, printing, and classroom use below. Each answer provides practical information to help you get started quickly.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [
      {
        id: '1',
        question: 'What Question Types Does the Big and Small Generator Offer?',
        answer: 'Five question types address different size discrimination skills. Circle the Big asks students to identify the largest image. Circle the Small identifies the smallest. Find the Medium requires identifying the middle-sized object among three. Ordering tasks have students arrange images from biggest to smallest or smallest to biggest. Each type develops progressively more nuanced size comparison abilities.',
      },
      {
        id: '2',
        question: 'How Many Images Appear in Each Size Comparison Exercise?',
        answer: 'Each exercise displays 2 to 3 images of the same object at different sizes. Two-image exercises present simple big versus small comparisons for the youngest learners. Three-image exercises add a medium-sized option for more nuanced discrimination. The generator creates clear size differences that are developmentally appropriate for the target age group while challenging students to observe carefully.',
      },
      {
        id: '3',
        question: 'How Many Exercises Fit on One Worksheet?',
        answer: 'Customize from 1 to 10 exercises per worksheet. One to two exercises provide large images with ample decision-making space for preschoolers. Four to five exercises suit standard kindergarten practice. Eight to ten exercises create comprehensive review worksheets for students developing size comparison fluency. The generator adjusts image sizes and layout automatically based on your exercise count.',
      },
      {
        id: '4',
        question: 'Do Big and Small Worksheets Include Answer Keys?',
        answer: 'Every big and small worksheet generates a complete answer key showing the correct response for each exercise. Circle tasks highlight which image should be circled. Ordering tasks show the correct size sequence. Teachers use answer keys for quick grading. Students self-check at independent stations. The visual answer format makes verification instant without reading text.',
      },
      {
        id: '5',
        question: 'How Do Ordering Activities Work?',
        answer: 'Ordering activities present 2 to 3 images at different sizes and ask students to number them from biggest to smallest or smallest to biggest. Students compare all images simultaneously and assign sequence numbers indicating relative size. This requires more sophisticated reasoning than simply identifying the biggest or smallest, as students must evaluate the complete size relationship among all presented items.',
      },
      {
        id: '6',
        question: 'What Age Groups Benefit from Big and Small Worksheets?',
        answer: 'Big and small worksheets serve ages 2 through 7 across toddler programs through first grade. Toddlers ages 2 to 3 practice two-image big versus small with parent guidance. Preschoolers ages 3 to 4 identify big and small independently. Kindergarteners ages 5 to 6 find medium objects and begin ordering activities. First graders master three-image ordering and connect size comparison to measurement concepts.',
      },
      {
        id: '7',
        question: 'Are Big and Small Worksheets Appropriate for Kindergarten?',
        answer: 'Big and small worksheets are valuable kindergarten math activities developing measurement readiness and comparative thinking. Use three-image exercises with all question types for comprehensive size discrimination practice. The Find the Medium type is particularly appropriate for kindergarteners who can identify extremes but need practice with middle values. These worksheets build foundations for formal measurement instruction in later grades.',
      },
      {
        id: '8',
        question: 'How Do Size Comparison Worksheets Build Math Foundations?',
        answer: 'Size comparison develops foundational measurement concepts including relative magnitude, ordering, and comparative vocabulary. Students learn that size is relative, not absolute, as the same image can be big compared to one item and small compared to another. This comparative thinking transfers directly to number comparison, measurement units, and data analysis skills in later mathematics instruction.',
      },
      {
        id: '9',
        question: 'Can I Create Themed Size Comparison Worksheets?',
        answer: 'Yes, select images from any theme for engaging size comparison activities. Generate animal-themed worksheets where students compare big and small animals. Create vehicle-themed activities with cars, trucks, and buses at different sizes. Build seasonal worksheets for holiday connections. The 3000+ image library provides diverse options. Upload your own images for fully customized comparison activities.',
      },
      {
        id: '10',
        question: 'How Long Does It Take to Create a Big and Small Worksheet?',
        answer: 'Creating one big and small worksheet takes under 2 minutes. Select your theme, question type, and exercise count. Choose 2 or 3 images per exercise. The generator creates appropriately sized image variants instantly. Download and print immediately. Create a comprehensive size comparison packet covering all five question types in under 10 minutes.',
      },
      {
        id: '11',
        question: 'Can I Sell Big and Small Worksheets I Create?',
        answer: 'Your Full Access subscription includes commercial licensing for selling big and small worksheets on Teachers Pay Teachers, Etsy, Amazon KDP, or your own website. Size comparison worksheets have strong demand in preschool and kindergarten markets. Create themed bundles or progressive difficulty packs. No attribution or extra licensing fees required beyond your subscription.',
      },
      {
        id: '12',
        question: 'How Do I Print Size Comparison Worksheets?',
        answer: 'Download big and small worksheets as PDF files at 300 DPI professional print quality. Size differences between images print clearly for accurate discrimination. Select Letter or A4 page size. Enable grayscale mode for ink-saving prints where size distinctions remain clearly visible. Both inkjet and laser printers produce clean results where relative sizes are easy for students to evaluate.',
      },
      {
        id: '13',
        question: 'Can Big and Small Worksheets Help English Language Learners?',
        answer: 'Big and small worksheets are excellent for English language learners because size comparison is a visual skill requiring no text reading. Students identify relative sizes using visual perception independent of language proficiency. The generator supports 11 languages for optional vocabulary labels. Teachers use size worksheets to teach comparative vocabulary like bigger, smaller, and biggest in context.',
      },
      {
        id: '14',
        question: 'How Do Big and Small Worksheets Support Differentiated Instruction?',
        answer: 'Differentiate by adjusting question type, image count, and exercise count. Provide two-image Circle the Big activities for developing learners. Use three-image exercises with Find the Medium for on-level kindergarten practice. Challenge advanced students with three-image ordering tasks requiring sequential size ranking. All levels use the same engaging themed images for seamless classroom grouping.',
      },
      {
        id: '15',
        question: 'What Curriculum Standards Do Big and Small Worksheets Address?',
        answer: 'Big and small worksheets address early childhood measurement standards for comparing objects by size and ordering objects from smallest to largest. They support math standards for measurable attributes and comparison. The comparative vocabulary component addresses language development standards. Many state preschool frameworks include size comparison as a foundational cognitive skill for mathematical readiness.',
      },
      {
        id: '16',
        question: 'Can I Upload Custom Images for Size Activities?',
        answer: 'Yes, upload custom images for personalized size comparison worksheets. The generator creates differently sized versions of your uploaded images for comparison exercises. Use classroom photos, curriculum illustrations, or familiar objects. Students compare sizes of images that connect to their daily experiences and current classroom learning for increased engagement and relevance.',
      },
      {
        id: '17',
        question: 'How Does Find the Medium Task Develop Reasoning?',
        answer: 'Find the Medium requires students to evaluate three images simultaneously and identify the one that is neither biggest nor smallest. This middle-value identification develops more sophisticated comparative reasoning than binary big or small judgments. Students must understand that size is a spectrum and apply three-way comparison logic. This prepares students for median concepts and data ordering in later math.',
      },
      {
        id: '18',
        question: 'How Do Big and Small Worksheets Connect to Measurement?',
        answer: 'Size comparison is the conceptual foundation for formal measurement instruction. Students who master relative size judgment develop the comparative thinking needed for using rulers, scales, and measuring cups. Understanding that objects can be ordered by size prepares students for number line concepts and measurement unit comparisons. Big and small worksheets build the intuitive understanding that formal measurement quantifies.',
      },
      {
        id: '19',
        question: 'How Do Big and Small Worksheets Pair with Other Activities?',
        answer: 'Big and small worksheets pair naturally with more or less worksheets for comprehensive comparison skill development, pattern worksheets for ordering and sequencing connections, and coloring activities for engaging activity packets. Use the same themed images to create cohesive math packets covering size comparison, quantity comparison, and sequencing in unified instructional sequences.',
      },
      {
        id: '20',
        question: 'Can Big and Small Worksheets Be Used for Assessment?',
        answer: 'Big and small worksheets serve as effective informal assessments for size discrimination readiness. Administer worksheets with all five question types to evaluate comprehensive size comparison skills. Track whether students can identify big, small, and medium accurately. Assess ordering ability separately from identification. Score efficiently using provided answer keys to document measurement readiness development.',
      },
    ]
    
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
        slug: 'more-less-worksheets',
        name: 'More or Less Worksheets',
        category: 'Math',
        icon: '⚖️',
        description: 'Supplement big & small worksheets with more or less exercises for balanced instruction. The quantity comparison activities for early number sense format provides variety that keeps students motivated. Mix both generators to create professional learning packets for any classroom theme.',
      },
      {
        id: '2',
        slug: 'picture-sort-worksheets',
        name: 'Picture Sort Worksheets',
        category: 'Visual Skills',
        icon: '🗂️',
        description: 'Add picture sort worksheets to your big & small rotation for diverse learning opportunities. The categorization and sorting activities with picture groups activities build skills that complement big & small practice. Generate complete themed packets covering both worksheet types in minutes.',
      },
      {
        id: '3',
        slug: 'matching-worksheets',
        name: 'Matching Worksheets',
        category: 'Visual Skills',
        icon: '🤝',
        description: 'Combine big & small worksheets with matching exercises for comprehensive lesson planning. The picture pair matching for visual association skills activities complement big & small skills perfectly. Build complete learning packets mixing both generators for varied classroom practice.',
      },
      {
        id: '4',
        slug: 'shadow-match-worksheets',
        name: 'Shadow Match Worksheets',
        category: 'Visual Skills',
        icon: '👤',
        description: 'Extend big & small practice with shadow match worksheets for well-rounded skill development. Students benefit from silhouette matching activities for shape recognition alongside big & small activities. Create themed bundles that keep learners engaged across multiple skill areas.',
      },
      {
        id: '5',
        slug: 'find-objects-worksheets',
        name: 'Find Objects Worksheets',
        category: 'Visual Skills',
        icon: '🔎',
        description: 'Pair Big & Small activities with find objects worksheets for cross-curricular skill building. Students strengthen visual scanning and search activities with hidden objects while reinforcing concepts from big & small practice sessions. Create themed packets that combine both worksheet types for engaging homework or center rotations.',
      },
      {
        id: '6',
        slug: 'pattern-worksheets',
        name: 'Pattern Worksheets',
        category: 'Logic & Puzzles',
        icon: '🔄',
        description: 'Extend big & small practice with pattern worksheets for well-rounded skill development. Students benefit from pattern recognition and sequence completion exercises alongside big & small activities. Create themed bundles that keep learners engaged across multiple skill areas.',
      },
    ], // Samples loaded dynamically from content manager

  },

  // -- SEO & Content Enrichment (Part 26) ------------------------------------

  aiOverviewSnippet: 'A big and small worksheet generator creates size comparison activities with 5 question types: circle the big, circle the small, find the medium, order smallest-to-biggest, and order biggest-to-smallest. Teachers select themed images, set 1\u201310 exercises with 2\u20133 images each, and download a 300 DPI PDF with automatic answer key in under two minutes.',

  comparisonTable: [
    { feature: 'Question Types', ourApp: '5 types including ordering and medium identification', typical: 'Basic big vs. small only' },
    { feature: 'Exercise Count', ourApp: 'Adjustable 1\u201310 exercises per worksheet', typical: 'Fixed layout with set number of exercises' },
    { feature: 'Images Per Exercise', ourApp: '2\u20133 images with automatic size differentiation', typical: 'Fixed image count per exercise' },
    { feature: 'Ordering Activities', ourApp: 'Both smallest-to-biggest and biggest-to-smallest sequencing', typical: 'Size identification only, no ordering' },
    { feature: 'Answer Keys', ourApp: 'Auto-generated visual answer key for all 5 question types', typical: 'Often not included or teacher-made' },
    { feature: 'Commercial License', ourApp: 'Included for TPT, Etsy, and KDP sales', typical: 'Extra fee or personal use only' },
  ],

  researchBacking: [
    {
      claim: 'Size comparison and seriation tasks develop measurement foundations and comparative reasoning aligned with K.MD standards, as children who practice ordering objects by size build the relational thinking needed for number lines, measurement units, and data analysis.',
      source: 'Piaget, J. & Inhelder, B., "The Child\'s Conception of Space," W.W. Norton & Company, 1967',
    },
    {
      claim: 'Ordering activities that require arranging items from smallest to largest build understanding of transitivity \u2014 the logical principle that if A is bigger than B and B is bigger than C, then A is bigger than C \u2014 a foundational reasoning skill for mathematical proof and scientific classification.',
      source: 'Clements, D.H. & Sarama, J., "Learning and Teaching Early Math: The Learning Trajectories Approach," Routledge, 2014',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'My 3-year-olds started with the circle-the-big-one mode using 2 images per exercise, and within weeks they graduated to 3-image exercises with find-the-medium. The automatic answer key is a lifesaver \u2014 I print one copy for my assessment binder and students self-check at the math station independently.',
      name: 'Wendy Nakamura',
      role: 'Pre-K Teacher',
      school: 'Little Scholars Preschool',
    },
    {
      quote: 'The ordering activities are exactly what my kindergarteners needed for measurement readiness. I set 3 images per exercise and alternate between smallest-to-biggest and biggest-to-smallest each day. The 10-exercise option gives me a full-page assessment worksheet that takes about 8 minutes \u2014 perfect for a math center rotation.',
      name: 'Aaron Fitzgerald',
      role: 'Kindergarten Teacher',
      school: 'Oakridge Primary',
    },
  ],

  tips: {
    sectionTitle: 'Size Comparison Strategies by Grade Level',
    sectionDescription: 'Adjust question type, image count, and exercise count to match each developmental stage. The Big and Small generator covers everything from simple two-image comparisons for toddlers to three-way ordering tasks that build measurement readiness for first graders.',
    items: [
      {
        id: 'preschool',
        icon: '\u{1F331}',
        title: 'Preschool: Circle the Big One with 2 Images',
        description: 'Start with the simplest mode \u2014 circle the big one using just 2 images per exercise. Set 3\u20134 exercises per page for large, clear images that toddlers and young preschoolers can distinguish easily. Choose highly familiar themes like animals or food so size differences are intuitive and engaging for 3\u20134 year olds.',
      },
      {
        id: 'kindergarten',
        icon: '\u{1F392}',
        title: 'Kindergarten: Find the Medium with 3 Images',
        description: 'Introduce 3-image exercises with the find-the-medium question type for kindergarteners ready for three-way comparison. This challenges students to evaluate relative size among all three items rather than simply identifying the extreme. Set 5\u20136 exercises per page for a balanced practice session.',
      },
      {
        id: 'first-grade',
        icon: '\u{1F4DA}',
        title: '1st Grade: Ordering Smallest to Biggest',
        description: 'Use the ordering modes with 3 images per exercise for first graders developing seriation skills. Alternate between smallest-to-biggest and biggest-to-smallest to build flexible comparative thinking. Set 6\u20138 exercises per page and pair with number ordering activities to connect size comparison to mathematical sequencing.',
      },
      {
        id: 'second-grade',
        icon: '\u270F\uFE0F',
        title: '2nd Grade: Mixed Question Types',
        description: 'Generate worksheets using different question types across exercises for comprehensive review. Combine circle-the-big, find-the-medium, and ordering tasks on a single worksheet to assess multiple size comparison skills. Set 8\u201310 exercises for a thorough practice page that covers all aspects of measurement readiness.',
      },
      {
        id: 'third-grade',
        icon: '\u{1F3AF}',
        title: '3rd Grade: Cross-Curricular Size Reasoning',
        description: 'Upload custom images from science or social studies units for content-area size comparison. Students compare sizes of planets, animals, or geographic features while practicing measurement vocabulary. Use the ordering mode with 3 images to connect size comparison to data analysis and classification skills in science.',
      },
    ],
  },
};

export default bigSmallEnContent;
