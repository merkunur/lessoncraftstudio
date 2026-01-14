import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/matching-worksheets.ts
 * URL: /en/apps/matching-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingEnContent: ProductPageContent = {
  // Hero Section - FULL text from matching.md paragraphs 1-4
  hero: {
    title: 'Free Printable Matching Worksheets',
    subtitle: 'MatchUp Maker Generator for Kindergarten and First Grade',
    description: `Create professional matching worksheets with our MatchUp Maker generator. Your Core Bundle subscription gives you unlimited worksheet creation with no per-worksheet fees. Generate custom printable matching worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes. Save hours of preparation time every week.

Our matching worksheet generator helps teachers create educational worksheets where students draw lines to connect matching pairs. Choose from four matching modes including image-to-letter matching for alphabet worksheets. Try image-to-word matching for sight words worksheets practice. Use custom vocabulary matching for phonics worksheets and reading comprehension. Perfect for literacy skills development in early elementary classrooms.

MatchUp Maker offers flexible content creation for every subject area. Create math worksheets with visual matching for number recognition and counting practice. Generate addition worksheets where students match problems to answers. Build alphabet worksheets for letter recognition in preschool and kindergarten. Design tracing worksheets combined with matching activities for fine motor skills development. All content uses our 3000+ child-friendly image library.

Your Core Bundle subscription includes complete access to all visual materials. No per-image fees unlike competitors. No template charges like other platforms. Create unlimited free printable worksheets with one simple subscription. Commercial print-on-demand license included at no extra cost. Sell your matching worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP. Generate worksheets for your online store or membership site. All worksheets download at 300 DPI professional quality.`,
    previewImageSrc: '/samples/english/matching/matching portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/matching/matching portrait.jpeg',
        answerKeySrc: '/samples/english/matching/matching portrait answer_key.jpeg',
        altText: 'Matching worksheet portrait mode with image-to-letter matching for kindergarten alphabet practice',
        pdfDownloadUrl: '/samples/english/matching/matching portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/matching/image and word.jpeg',
        answerKeySrc: '/samples/english/matching/image and word answer_key.jpeg',
        altText: 'Image and word matching worksheet for sight words and vocabulary practice',
        pdfDownloadUrl: '/samples/english/matching/image and word.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/matching/image and custom word.jpeg',
        answerKeySrc: '/samples/english/matching/image and custom word answer_key.jpeg',
        altText: 'Custom vocabulary matching worksheet with images and teacher-defined words',
        pdfDownloadUrl: '/samples/english/matching/image and custom word.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from matching.md H3 sections
  features: {
    sectionTitle: 'Everything You Need for Matching Worksheets',
    sectionDescription: 'Our matching worksheet generator includes professional features designed specifically for teachers creating kindergarten worksheets and first grade worksheets. Every feature helps you build free printable worksheets faster than traditional methods. Create alphabet worksheets, phonics worksheets, math worksheets, and sight words worksheets with the same easy-to-use tool. Access all premium features with your Core Bundle subscription. No per-worksheet fees, no image charges, no template costs. Generate unlimited matching worksheets for all your classroom needs.',
    highlightBadgeText: 'Key Feature',
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Create Matching Worksheets in 3 Clicks',
        description: 'Generate complete matching worksheets in under three minutes from start to download. Choose your matching mode from four options. Select your images from our 3000+ library or upload your own. Click generate and your worksheet appears instantly on canvas. No design skills required for professional kindergarten worksheets. Our one-click generation works for all worksheet types. Create alphabet worksheets where students match images to beginning letters. Build phonics worksheets matching pictures to sounds. Design math worksheets pairing numbers with visual representations. Generate sight words worksheets connecting words to images. Make addition worksheets matching problems to answers. All matching worksheet types use the same simple three-click process. The quick generation saves hours compared to traditional worksheet creation. Teachers spend 30 seconds choosing settings instead of 30 minutes formatting in other programs.',
        highlighted: false,
      },
      {
        id: '2',
        icon: '🎯',
        title: 'Four Matching Modes for Every Learning Objective',
        description: 'Choose from four different matching modes to fit your lesson objectives. Each mode creates different kindergarten worksheets and first grade worksheets for varied learning goals. Image to Beginning Letter Mode creates perfect alphabet worksheets for letter recognition. Students match pictures to the first letter of each word. Image Plus Word to Image Plus Word Mode builds memory and recognition sight words worksheets. Both columns show pictures with words underneath. Image or Word to Image or Word Mode creates the most flexible matching worksheets. Choose whether each item shows as image or word. Image to Custom Word Mode builds vocabulary matching worksheets for any subject. Match pictures to definitions, translations, or custom phrases. Perfect for math worksheets where students match shapes to names.',
        highlighted: true,
      },
      {
        id: '3',
        icon: '✏️',
        title: 'Edit Everything on Your Matching Worksheet Canvas',
        description: 'Every element on your matching worksheet is fully editable on canvas. Click any image to move, resize, or rotate. Drag text elements anywhere on the page. Delete items you don\'t need. Add custom text instructions for students. Change colors to match your classroom theme. Insert your school logo or class mascot. Full editing works for all free printable worksheets. Customize alphabet worksheets with larger images for younger students. Adjust phonics worksheets for visual learners. Modify math worksheets to emphasize specific concepts. Personalize addition worksheets with familiar objects from your classroom. The canvas editor includes professional design tools. Layer controls let you bring elements forward or send them backward. Alignment buttons help you center items perfectly on the page.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Upload Custom Images for Personalized Worksheets',
        description: 'Upload your own images to create personalized matching worksheets for your specific students. Multi-file upload accepts JPEG, PNG, and GIF formats. Add photos of classroom objects for familiar sight words worksheets. Include pictures of student artwork for engagement. Upload manipulative images for hands-on math worksheets connection. Custom image upload works seamlessly with library images. Combine your photos with our 3000+ image collection. Create alphabet worksheets mixing student name photos with letter images. Build phonics worksheets featuring classroom items students recognize. Teachers use custom uploads for highly targeted kindergarten worksheets. Upload photos of students\' belongings for name recognition activities.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '🌍',
        title: '11 Languages for Multilingual Classrooms',
        description: 'Generate matching worksheets in 11 different languages for multilingual classrooms. Full interface translation and content localization included. Create kindergarten worksheets in English, German, French, Spanish, or Italian. Build first grade worksheets in Portuguese, Dutch, Danish, Swedish, Norwegian, or Finnish. Language support extends beyond simple translation. Image labels automatically switch to your selected language. Beginning letter matching worksheets show correct letters for each language\'s alphabet. Phonics worksheets reflect language-specific sound patterns. Sight words worksheets use high-frequency words from target language. All ABC worksheets and alphabet worksheets adapt to language requirements.',
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Commercial License Included',
        description: 'Your Core Bundle subscription includes print-on-demand commercial licensing at no extra cost. Sell matching worksheets you create on Teachers Pay Teachers, Etsy, or Amazon KDP. No additional licensing fees beyond your $144 annual subscription. Create unlimited kindergarten worksheets and first grade worksheets for commercial sale. Commercial licensing covers all worksheet types you generate. Sell alphabet worksheets in themed bundles. Market phonics worksheets as curriculum supplements. Offer math worksheets in seasonal collections. Package sight words worksheets by reading level. Bundle addition worksheets by difficulty progression. Every matching worksheet qualifies for commercial use.',
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professional 300 DPI Quality with Answer Keys',
        description: 'Generate high-resolution matching worksheets at 300 DPI professional quality. All math worksheets download crisp and clear for printing. Addition worksheets export with sharp images and readable text. Professional quality matches commercially published educational materials. Suitable for selling on Teachers Pay Teachers or classroom distribution. Every matching worksheet includes automatic answer key generation. Students get clear practice worksheets. Teachers get correct answers with connecting lines already drawn. Both worksheet and answer key download together. Fully editable on canvas before downloading.',
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎨',
        title: '3000+ Child-Friendly Image Library',
        description: 'Access our complete 3000+ child-friendly image library with your Core Bundle subscription. No per-image fees unlike stock photo websites. No download limits like clip art subscriptions. Browse images organized by themes including animals, food, transportation, school, nature, and seasons. Search by keyword to find specific images quickly. Every image works perfectly for kindergarten worksheets and first grade worksheets. Child-appropriate illustrations with clear, simple designs. Bright colors that engage young learners. Recognizable objects students encounter daily. Images scale beautifully from small thumbnails to large worksheet elements. Professional quality suitable for selling on Teachers Pay Teachers.',
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from matching.md Step sections
  howTo: {
    sectionTitle: 'Create Matching Worksheets in 5 Easy Steps',
    sectionDescription: 'Creating matching worksheets takes less than 3 minutes from start to download. Follow five simple steps to generate professional kindergarten worksheets and first grade worksheets. No design experience required to create alphabet worksheets, phonics worksheets, or math worksheets. Choose your matching mode, select images, customize settings, edit on canvas, and download. Your Core Bundle subscription includes unlimited worksheet generation with no time limits. Create as many free printable worksheets as your students need.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Choose Content for Your Matching Worksheets',
        description: 'Select your matching mode first to determine worksheet content type. Click the "Matching Mode" dropdown in the left sidebar under Worksheet Configuration. Four modes available for different kindergarten worksheets and first grade worksheets learning objectives. Choose Image to Beginning Letter mode for alphabet worksheets and letter recognition practice. Perfect for ABC worksheets teaching letter sounds. Students match pictures to uppercase letters. Select Image Plus Word to Image Plus Word mode for sight words worksheets and vocabulary reinforcement. Both columns show identical image-word pairs in different order. Pick Image or Word to Image or Word mode for flexible first grade worksheets. Choose whether each item shows as image or word. Choose Image to Custom Word mode for vocabulary matching worksheets. Match pictures to definitions, translations, or custom phrases.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Customize Matching Worksheet Settings',
        description: 'Set the number of matching pairs for your worksheet. Click the "Max Number of Pairs" dropdown. Choose 4, 5, or 6 pairs depending on student ability level. Four pairs work well for beginning kindergarten worksheets. Six pairs challenge advanced first grade worksheets users. Select your page size and orientation. Click "Page Size" dropdown at top of sidebar. Choose Letter Portrait for standard vertical kindergarten worksheets. Select Letter Landscape for wider horizontal layouts. Configure name and date fields for classroom management. Check "Include Name/Date Fields" box to add student information lines. Set item numbering preferences for easier instruction. Check "Include Item Numbers" to show 1, 2, 3 before each matching pair.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generate Your Matching Worksheet',
        description: 'Click the "Generate" button in the top-right corner of screen. Dropdown menu appears with two options. Click "Generate Worksheet" to create your matching worksheet. System processes your settings and builds worksheet in seconds. Watch as your matching worksheet appears on canvas. Images load in left and right columns. Text elements appear if using word-based modes. Page border, background, and decorative elements add automatically. Name and date fields appear at top if enabled. Items arrange automatically in optimal positions. System calculates spacing based on number of pairs selected. Four pairs use larger images with more spacing. Six pairs use slightly smaller images to fit page. Generation takes 10-15 seconds for most kindergarten worksheets.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit Matching Worksheets on Canvas',
        description: 'Click any image on your matching worksheet to select it. Blue bounding box with corner handles appears around selected object. Drag image to new position anywhere on canvas. Resize image by dragging corner handles. Rotate image by grabbing rotation control above object. Move items to create more balanced layouts on your first grade worksheets. Add custom text instructions anywhere on your kindergarten worksheets. Click "Text Tools" in left sidebar. Type instruction text in input field. Choose font, size, and color. Click "Add Text" to place text on canvas. Apply backgrounds and borders to make worksheets more engaging. Click "Background Theme" dropdown in Page Setup section. Choose from dozens of theme-based backgrounds.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Printable Matching Worksheets',
        description: 'Generate the answer key before downloading. Click "Generate" dropdown button in top-right corner. Select "Generate Answer Key" option. System creates matching answer key showing correct pairs connected with lines. Answer key appears on separate Answer Key tab. The answer key mirrors your worksheet layout exactly. Click "Download" dropdown button after generating both worksheet and answer key. Four download format options appear. Choose JPEG or PDF format for worksheet. Select JPEG or PDF format for answer key. Download each separately or download all together. Select PDF format for printing free printable worksheets at highest quality. Enable grayscale option before downloading to save printer ink. Print your downloaded matching worksheets on any home or school printer.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from matching.md persona sections
  useCases: {
    sectionTitle: 'Perfect for Teachers, Parents, and Educators',
    sectionDescription: 'Matching worksheets serve different educational needs across various teaching environments. Kindergarten teachers use matching worksheets for letter recognition and phonics practice. First grade teachers build sight words worksheets for reading development. Homeschool parents create alphabet worksheets customized to individual learning pace. ESL instructors design math worksheets with visual vocabulary support. Special education teachers generate differentiated free printable worksheets for varied ability levels. Teacher entrepreneurs sell matching worksheet bundles on Teachers Pay Teachers. Every educator benefits from quick worksheet creation and unlimited generation with Core Bundle subscription.',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Kindergarten and Preschool Teachers',
        subtitle: 'ABC Worksheets and Alphabet Worksheets for Letter Recognition',
        description: 'Kindergarten teachers need constant supply of alphabet worksheets for daily letter instruction. Create matching worksheets connecting images to beginning letters for phonics foundation. Generate ABC worksheets for each letter of alphabet throughout the year. Build sight words worksheets for high-frequency word recognition. Design free printable worksheets for center activities and small group instruction. Image to Beginning Letter mode creates perfect kindergarten worksheets for literacy centers. Students match apple to A, ball to B, cat to C. Visual connections help pre-readers understand letter-sound relationships. Generate new alphabet worksheets weekly to maintain student engagement. Create morning work matching worksheets for arrival time activities.',
        quote: 'My students love matching the colorful pictures to letters!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Elementary School Teachers',
        subtitle: 'Sight Words Worksheets and Math Worksheets for Skill Building',
        description: 'First grade teachers require sight words worksheets for Dolch and Fry word lists. Create matching worksheets connecting sight words to picture representations. Build phonics worksheets for blends, digraphs, and word families. Generate vocabulary matching for science and social studies units. Design math worksheets matching number words to numerals. Second grade teachers use Custom Word mode for subject-specific vocabulary matching. Match states to capitals for geography. Connect math terms to definitions. Third grade teachers create more complex matching worksheets with abstract concepts. Match fractions to visual models for math understanding. Build differentiated free printable worksheets for mixed-ability classrooms.',
        quote: 'I create differentiated worksheets for all my reading groups in minutes!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool Parents',
        subtitle: 'First Grade Worksheets and Kindergarten Worksheets for Individual Pacing',
        description: 'Homeschool parents create personalized matching worksheets matching each child\'s learning level. Generate alphabet worksheets when student masters letter recognition. Build phonics worksheets following chosen curriculum sequence. Design sight words worksheets at individual reading pace. Create math worksheets aligned to student\'s current skill level. Upload family photos for highly personalized kindergarten worksheets. Match child\'s name to photo for name recognition. Connect family members to relationship words. Create themed first grade worksheets matching family interests and hobbies. Sports-loving students get athletic vocabulary matching. Generate matching worksheets for multiple children simultaneously. Core Bundle subscription supports multiple grade levels in one household.',
        quote: 'One subscription covers all my kids at different grade levels!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL and Bilingual Teachers',
        subtitle: 'Phonics Worksheets and Alphabet Worksheets in 11 Languages',
        description: 'ESL teachers use matching worksheets for visual vocabulary instruction. Images provide context clues English language learners need. Match pictures to English words for basic vocabulary building. Create alphabet worksheets showing letter-sound connections. Build phonics worksheets reinforcing English pronunciation patterns. Generate sight words worksheets for survival vocabulary acquisition. Multilingual matching worksheets support heritage language programs. Create Spanish alphabet worksheets for dual language classrooms. Generate French sight words worksheets for immersion programs. Build German phonics worksheets for world language instruction. Bilingual teachers create parallel matching worksheets in two languages. Create culturally responsive free printable worksheets featuring diverse images.',
        quote: 'The Spanish worksheets help my English learners succeed!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Special Education Teachers',
        subtitle: 'Differentiated Math Worksheets and Addition Worksheets for Varied Abilities',
        description: 'Special education teachers need highly customizable matching worksheets for IEP goals. Create four-pair worksheets for students with attention challenges. Generate large-image alphabet worksheets for visual processing support. Build simple sight words worksheets for modified reading instruction. Design concrete math worksheets with visual representations. Upload photos of classroom manipulatives for hands-on learning connection. Match real counting bears to number words. Create matching worksheets supporting various learning disabilities. Large print options for students with visual impairments. Simple vocabulary for students with language delays. Generate progress monitoring free printable worksheets tracking IEP goal mastery. Create consistent format matching worksheets for reliable data collection.',
        quote: 'I can quickly adapt worksheets for each student\'s IEP goals!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Teacher Entrepreneurs',
        subtitle: 'Selling Kindergarten Worksheets on Teachers Pay Teachers',
        description: 'Teacher entrepreneurs build successful businesses selling matching worksheet bundles online. Create themed alphabet worksheet packs for seasonal demand. Generate comprehensive phonics worksheets sets organized by skill progression. Build sight words worksheets bundles sorted by reading level. Design math worksheets collections targeting specific grade standards. Package free printable worksheets into commercial products. Teachers Pay Teachers sellers price matching worksheet bundles at $3-8 per pack. Create 10-page alphabet worksheets bundle covering A-Z letters. Generate 15-page phonics worksheets set teaching initial consonants. Sell hundreds of copies monthly generating significant passive income. Commercial licensing included with Core Bundle saves money versus competitor platforms.',
        quote: 'I earned back my subscription cost in the first month of sales!',
      },
    ],
  },

  // FAQ Section - ALL questions from matching.md
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'Teachers ask common questions about creating matching worksheets with MatchUp Maker. Questions cover subscription requirements, printing capabilities, customization options, and commercial licensing. Answers help kindergarten teachers, first grade teachers, homeschool parents, and ESL instructors understand full platform capabilities. Learn about alphabet worksheets creation, phonics worksheets customization, math worksheets generation, and sight words worksheets downloading.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [
      {
        id: '1',
        question: 'Is This Matching Worksheet Generator Free to Use for Creating Kindergarten Worksheets?',
        answer: 'MatchUp Maker requires Core Bundle subscription at $144 per year or $15 monthly. No free tier available for matching worksheet generation. Core Bundle provides unlimited access to MatchUp Maker plus nine other worksheet generators. Create unlimited matching worksheets, alphabet worksheets, phonics worksheets, math worksheets, and sight words worksheets with subscription. No per-worksheet fees or usage limits like competitor platforms charge. The subscription model offers better value than pay-per-worksheet alternatives. Competitors charge $1-3 per worksheet download adding up quickly for daily classroom use. Teachers creating five matching worksheets weekly pay $260-780 annually with per-worksheet pricing. Core Bundle\'s $144 annual cost saves $116-636 compared to pay-per-use platforms.',
      },
      {
        id: '2',
        question: 'Can I Print Matching Worksheets at Home on Regular Printer?',
        answer: 'Yes, all matching worksheets print perfectly on any home or school printer. Standard inkjet and laser printers handle worksheet files easily. Download worksheets as PDF or JPEG formats. Both formats print on regular letter or A4 paper. No special paper required for professional-looking alphabet worksheets and phonics worksheets. Worksheets download at 300 DPI professional quality ensuring crisp printing. Images remain sharp when printed. Text stays clear and readable. Matching elements print with clean lines and defined edges. Print quality matches commercially published kindergarten worksheets and first grade worksheets. Grayscale option reduces ink consumption significantly. Enable grayscale before downloading to convert matching worksheets to black and white.',
      },
      {
        id: '3',
        question: 'Do I Need Design Skills to Create Professional Free Printable Matching Worksheets?',
        answer: 'No design experience required to create professional matching worksheets. MatchUp Maker uses simple dropdown menus and button clicks. Choose your matching mode from four options. Select images from library or upload your own. Click generate button. Professional kindergarten worksheet appears on canvas instantly. Entire process designed for teachers without graphic design backgrounds. The interface uses familiar educational terminology rather than design jargon. Settings labeled with teaching terms like "number of pairs" and "include name/date fields." No need to understand design concepts like layers, vectors, or resolution. System handles all technical aspects automatically. Auto-generation creates well-balanced layouts automatically. System calculates optimal spacing between matching items.',
      },
      {
        id: '4',
        question: 'Can I Use Matching Worksheets in My Classroom for Students?',
        answer: 'Yes, Core Bundle subscription specifically designed for classroom use. Create unlimited matching worksheets for all students in your classes. Generate kindergarten worksheets for 20-30 students daily without additional costs. Build first grade worksheets for multiple class periods. Design differentiated alphabet worksheets for small groups. No per-student fees or licensing restrictions for classroom distribution. Teachers legally photocopy matching worksheets for entire classes. Print one master copy and photocopy for 25 students. Create sets of phonics worksheets for literacy centers. Share digital matching worksheets through Google Classroom, Seesaw, or school learning management systems. Upload JPEG files for students to complete on tablets.',
      },
      {
        id: '5',
        question: 'What Languages Are Available for Alphabet Worksheets and Phonics Worksheets Creation?',
        answer: 'MatchUp Maker supports 11 languages for matching worksheet creation. Generate worksheets in English, German, French, Spanish, Italian, Portuguese, Dutch, Danish, Swedish, Norwegian, or Finnish. Both interface translations and content localization included. Create kindergarten worksheets with language-appropriate image labels and vocabulary. Build alphabet worksheets showing correct letters for each language\'s alphabet system. Language selection affects image filename vocabulary for word-based matching modes. Spanish mode shows Spanish words in matching worksheets. French mode displays French vocabulary in phonics worksheets. Interface fully translates to selected language. Switch between languages freely to create multilingual worksheet sets.',
      },
      {
        id: '6',
        question: 'Can I Sell Matching Worksheets on Teachers Pay Teachers?',
        answer: 'Yes, Core Bundle subscription includes full print-on-demand commercial license. Sell matching worksheets you create on Teachers Pay Teachers, Etsy, Amazon KDP, or your own website. No additional licensing fees beyond $144 annual Core Bundle subscription. Create unlimited kindergarten worksheets and first grade worksheets for commercial sale. Generate alphabet worksheet bundles, phonics worksheet collections, and sight words worksheet packs for online marketplaces. Commercial license covers individual worksheet sales and bundled collections. Sell single alphabet worksheets PDFs or comprehensive 50-page workbooks. No attribution required on commercial matching worksheets. Remove all LessonCraft Studio branding before selling. Add your own business name and branding.',
      },
      {
        id: '7',
        question: 'How Do I Customize Matching Worksheets for My Students?',
        answer: 'Customize matching worksheets through multiple settings before generation. Choose matching mode fitting your lesson objectives. Select number of pairs based on student ability levels. Pick page size and orientation for your printing needs. Enable or disable name/date fields for classroom management. Upload your own images for highly personalized kindergarten worksheets. Add photos of classroom objects students recognize. Include pictures of student artwork for engagement. Edit generated matching worksheets on canvas after generation. Move images to emphasize important content. Resize elements for visual learners needing larger pictures. Add custom text instructions tailored to your class procedures. Create difficulty variations by adjusting pair count and vocabulary complexity.',
      },
      {
        id: '8',
        question: 'What Age Groups Work Best with Free Printable Matching Worksheets?',
        answer: 'Matching worksheets work excellently for preschool through third grade students ages 3-9. Preschool students ages 3-4 benefit from simple four-pair matching with large familiar images. Kindergarten students ages 5-6 handle standard six-pair alphabet worksheets with beginning letter matching. First grade students ages 6-7 complete complex sight words worksheets and phonics worksheets. Second through third grade students ages 7-9 tackle vocabulary matching and subject-specific content. Younger preschool students need concrete image-to-image matching. Use Image Plus Word mode showing identical pictures for visual discrimination practice. Kindergarten represents prime age for alphabet worksheets and beginning letter recognition.',
      },
      {
        id: '9',
        question: 'Can I Upload My Own Images to Create Personalized Sight Words Worksheets?',
        answer: 'Yes, upload unlimited personal images to matching worksheets. Multi-file upload supports JPEG, PNG, and GIF formats. Add photos from your computer, phone, or tablet. Upload classroom pictures, student artwork, field trip photos, or family images. Combine uploaded images with 3000+ library images in same worksheet. Custom image upload personalizes kindergarten worksheets for specific student groups. Photograph classroom objects for familiar vocabulary matching. Upload pictures of school playground equipment for location-based alphabet worksheets. Create culturally responsive matching worksheets reflecting student backgrounds. Upload images representing diverse family structures. Add cultural foods, celebrations, and traditions from students\' communities.',
      },
      {
        id: '10',
        question: 'How Long Does It Take to Create Math Worksheets and Addition Worksheets?',
        answer: 'Complete matching worksheet creation takes under 3 minutes from start to download. Choose matching mode and settings in 30 seconds. Select images or configure pairs in 60 seconds. Click generate and worksheet appears in 15 seconds. Optional editing adds 30-60 seconds for customization. Download in 15 seconds. Total time 2.5-3 minutes for professional kindergarten worksheets. Quick generation enables creating multiple differentiated first grade worksheets rapidly. Generate easier version for intervention group in 3 minutes. Create grade-level alphabet worksheets for main class in another 3 minutes. Time savings compared to traditional worksheet creation proves substantial. Word processor-based matching worksheets take 30-60 minutes aligning images and text manually.',
      },
      {
        id: '11',
        question: 'Do Free Printable Kindergarten Worksheets Include Answer Keys?',
        answer: 'Yes, every matching worksheet includes automatic answer key generation. Click "Generate Answer Key" button after creating worksheet. System generates answer key showing correct matches with connecting lines drawn. Answer key appears on separate tab for independent downloading. Both worksheet and answer key download together or separately. Answer keys mirror worksheet layouts exactly maintaining same item positions. Images appear in identical locations on answer key and student worksheet. Connecting lines show correct matches between left and right columns. Teachers see solutions at glance for quick grading. Answer keys save significant grading time for teachers. Perfect for parent volunteers, teaching assistants, or substitute teachers helping with math centers.',
      },
      {
        id: '12',
        question: 'Can I Create Subject-Specific Math Worksheets with Custom Vocabulary?',
        answer: 'Yes, Custom Word mode enables subject-specific matching across all curriculum areas. Create math worksheets matching geometric shapes to mathematical names. Build science matching connecting animals to habitats or life cycle stages. Design social studies worksheets matching states to capitals or historical figures to events. Generate grammar matching linking parts of speech to examples. Math applications include matching number words to numerals for kindergarten. Match addition problems to answers for first grade fact fluency. Connect fractions to visual models for upper elementary. Science matching worksheets cover life science, earth science, and physical science. Social studies and language arts benefit from vocabulary matching worksheets.',
      },
      {
        id: '13',
        question: 'Are Coloring Worksheets and Tracing Worksheets Included with MatchUp Maker?',
        answer: 'Core Bundle subscription includes access to separate coloring worksheets and tracing worksheets generators alongside MatchUp Maker. Create coordinated ABC worksheets using the Alphabet Train app for letter tracing practice. Generate themed coloring worksheets using Coloring Creator app. Build comprehensive learning packets combining matching, tracing worksheets, and coloring worksheets. All tools share same 3000+ image library ensuring visual consistency across worksheet types.',
      },
      {
        id: '14',
        question: 'Can I Make Sight Words Worksheets and Phonics Worksheets for First Grade?',
        answer: 'Yes, MatchUp Maker excels at creating sight words worksheets for first grade reading instruction. Use Custom Word mode matching high-frequency words to picture representations. Generate phonics worksheets teaching letter combinations and sounds. Build alphabet worksheets introducing new letters systematically. Create comprehensive first grade literacy programs through varied worksheet combinations.',
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
    sectionDescription: 'Our platform offers 33 different worksheet generators beyond matching. Your Core Bundle subscription provides access to all generators for creating comprehensive learning packets. Combine matching worksheets with phonics worksheets, alphabet worksheets, and coloring worksheets. Build complete themed units mixing literacy practice with fine motor activities.',
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
        description: 'Combine matching worksheets with addition worksheets for comprehensive math practice. Students match number problems to answers then solve traditional addition equations.',
      },
      {
        id: '2',
        slug: 'word-search',
        name: 'Word Search',
        category: 'Language Arts',
        icon: '🔍',
        description: 'Pair matching worksheets with word search puzzles for vocabulary reinforcement. Students match words to images then find the same words hidden in puzzles.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Alphabet Train',
        category: 'Early Learning',
        icon: '🚂',
        description: 'Create complete ABC learning packets combining matching with alphabet train worksheets. Match letters to images then practice letter formation on tracing sheets.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Coloring Pages',
        category: 'Art & Creativity',
        icon: '🎨',
        description: 'Combine matching worksheets with coloring worksheets for engaging kindergarten activity packets. Students complete matching then color the same themed images.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tracing Worksheets',
        category: 'Fine Motor',
        icon: '✏️',
        description: 'Bundle matching with tracing worksheets for complete fine motor development. Students practice drawing lines between matching pairs then trace letter formations.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Find and Count',
        category: 'Math',
        icon: '🔢',
        description: 'Pair matching with counting worksheets for number recognition practice. Match numerals to quantities then count objects in visual search activities.',
      },
    ],
  },
};

export default matchingEnContent;
