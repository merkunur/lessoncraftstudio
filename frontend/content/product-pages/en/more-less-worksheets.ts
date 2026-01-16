import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More or Less Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/more-less-worksheets.ts
 * URL: /en/apps/more-less-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const moreLessEnContent: ProductPageContent = {
  // Hero Section - FULL text from more-less.md paragraphs 1-4
  hero: {
    title: 'Free Printable Comparison Worksheets',
    subtitle: 'Greater Than Less Than Worksheet Maker for Kindergarten',
    description: `Create professional comparison worksheets with our greater than less than worksheet maker. Your Full Access subscription gives you unlimited worksheet creation with no per-worksheet fees. Generate custom printable math worksheets perfect for kindergarten and first grade students learning number comparison skills. Download high-quality PDF worksheets in under 3 minutes.

Our comparison worksheet generator helps teachers create engaging math worksheets where students compare quantities and choose the correct symbol. Generate worksheets with greater than, less than, and equal to symbols using colorful images or traditional mathematical symbols. Perfect for kindergarten worksheets and first grade worksheets focused on early math skills.

The worksheet maker offers flexible comparison modes including image-to-image comparisons and image-to-number comparisons. Teachers can customize every aspect including the number of exercises, symbol display style, and whether students fill in blanks or circle the correct answer. Create free printable worksheets that make learning math comparison fun and visual for young learners.`,
    previewImageSrc: '/samples/english/more less/image to image.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/more less/image to image.jpeg',
        answerKeySrc: '/samples/english/more less/image to image answer_key.jpeg',
        altText: 'Image-to-image comparison worksheet with greater than less than symbols for kindergarten students',
        pdfDownloadUrl: '/samples/english/more less/image to image.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/more less/image to number.jpeg',
        answerKeySrc: '/samples/english/more less/image to number answer_key.jpeg',
        altText: 'Image-to-number comparison worksheet combining counting and numeral recognition for first grade',
        pdfDownloadUrl: '/samples/english/more less/image to number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/more less/illustration.jpeg',
        answerKeySrc: '/samples/english/more less/illustration answer_key.jpeg',
        altText: 'Illustrated comparison worksheet with colorful symbols for visual learners',
        pdfDownloadUrl: '/samples/english/more less/illustration.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from more-less.md H3 sections
  features: {
    sectionTitle: 'Everything You Need for Comparison Worksheets',
    sectionDescription: 'Our comparison worksheet maker includes seven powerful features that make creating math worksheets fast and easy. Generate free printable worksheets for kindergarten through first grade students. Every feature works together to help teachers create professional-quality comparison worksheets in minutes. The worksheet generator combines simplicity with professional results. Teachers get unlimited worksheet creation with their Full Access subscription. No per-worksheet fees means you can create as many math worksheets as your students need. Download worksheets in high-quality PDF or JPEG format ready for printing.',
    highlightBadgeText: 'Key Feature',
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Create Math Worksheets in 3 Clicks',
        description: 'Generate comparison worksheets in under 3 minutes with our simple creation process. Choose your images from 3000+ child-friendly pictures. Select whether students compare greater than, less than, or equal to. Click generate and your worksheet appears instantly on screen. The simple interface requires no design skills or technical knowledge. Teachers create professional math worksheets without complicated software. Perfect for busy educators who need kindergarten worksheets quickly. Your Full Access subscription includes unlimited worksheet generation with no extra charges per worksheet. Select from individual images or choose an entire theme for automatic image selection. The generator randomly selects images and creates appropriate comparison problems. First grade worksheets appear ready to edit within seconds of clicking generate.',
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edit Everything on Your Math Worksheets',
        description: 'Every element on your comparison worksheet is fully editable after generation. Drag images to new positions with your mouse. Rotate objects to any angle you prefer. Scale images larger or smaller to emphasize important elements. Delete any element you don\'t want on the worksheet. Add custom text for student names, instructions, or special directions. Change colors, fonts, and sizes of all text elements. Your worksheet becomes exactly what your kindergarten students need. The canvas editing works like professional design software but simpler. No learning curve required for basic editing tasks. Teachers modify math worksheets to match specific lesson plans. Every first grade worksheet can be customized for individual student needs or classroom requirements.',
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Custom Images for Personalized Worksheets',
        description: 'Add your own images to comparison worksheets for maximum personalization. Upload photos of classroom objects, student artwork, or curriculum-specific pictures. Multi-file upload accepts JPEG, PNG, and GIF formats simultaneously. Combine uploaded images with our 3000+ library images on the same worksheet. Perfect for creating math worksheets that reflect your classroom environment. Use pictures of actual classroom manipulatives students recognize. First grade worksheets become more engaging with familiar objects. Uploaded images remain available throughout your current session for multiple worksheets. Create themed free printable worksheets using your school\'s seasonal decorations. Add student photos for personalized kindergarten worksheets that increase engagement and motivation.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Languages for Multilingual Classrooms',
        description: 'The worksheet maker operates in 11 different languages for ESL and bilingual classrooms. The entire interface translates including all buttons, labels, and instructions. Generate kindergarten worksheets in English, Spanish, French, German, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, or Finnish. Language selection changes all interface text instantly. Create math worksheets for dual-language immersion programs. Perfect for international schools teaching first grade students in multiple languages. ESL teachers create free printable worksheets matching students\' home languages. The 11-language support extends to all worksheet text and headers. Generate comparison worksheets with instructions in the target language. First grade worksheets automatically adapt language for bilingual education programs. Your Full Access subscription includes all languages with no additional fees.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Commercial License for Teachers Pay Teachers',
        description: 'Your Full Access subscription includes full print-on-demand commercial licensing at no extra cost. Sell comparison worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP. Create products for your educational business without additional licensing fees. The commercial license covers all math worksheets you create with the generator. Many teachers build profitable side businesses selling free printable worksheets. List kindergarten worksheets on multiple platforms simultaneously. No attribution required on worksheets you sell. Teacher entrepreneurs earn $500 to $5000 monthly selling educational worksheets online. Your Full Access subscription pays for itself quickly with commercial sales. Create first grade worksheet bundles for passive income. The POD license saves you $100-200 annually compared to competitors charging separate licensing fees.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Access 3000+ Images',
        description: 'Choose from over 3000 child-friendly images organized by themes. Browse animals, food, toys, school supplies, and seasonal images. All images included with your Full Access subscription at no extra charge per image. Theme-based organization makes finding perfect images fast. Select an entire theme and the generator randomly picks images for variety. Individual image selection gives complete control over worksheet appearance. Perfect for creating engaging math worksheets that capture student attention. The image library includes backgrounds and decorative borders. Add visual appeal to kindergarten worksheets without extra design work. Create professional-looking first grade worksheets with themed borders. Unlike competitors charging per image, all visual content is included in your subscription.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professional 300 DPI Quality',
        description: 'Export comparison worksheets as high-resolution 300 DPI files perfect for printing. Download in PDF format for best print quality. Choose JPEG format for digital distribution. Both formats maintain professional quality for kindergarten worksheets. The grayscale conversion option saves printer ink for classroom budgets. Convert colorful math worksheets to black and white before downloading. Perfect for schools needing to reduce printing costs. First grade worksheets print clearly in grayscale mode. Answer keys download separately in the same high quality. Teachers get worksheet and answer key as individual files. Print answer keys for teacher reference or student self-checking. Your Full Access subscription includes unlimited downloads of all free printable worksheets you create.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from more-less.md Step sections
  howTo: {
    sectionTitle: 'Create Comparison Worksheets in 5 Easy Steps',
    sectionDescription: 'Creating comparison worksheets takes under 3 minutes from start to download. Our simple five-step process requires no design experience. Teachers create professional kindergarten worksheets faster than photocopying premade materials. Follow these steps to generate free printable worksheets perfect for first grade math lessons. The worksheet maker guides you through each step with clear instructions. Select your preferences and watch your math worksheet appear on screen. Edit anything you want before downloading. Your Full Access subscription means unlimited worksheet creation without time limits or extra fees.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Choose Images for Your Math Worksheets',
        description: 'Start by selecting images for your comparison worksheet. Choose individual images from our 3000+ library or select an entire theme. Individual selection gives complete control over which objects appear. Theme selection randomly picks images for variety across math worksheets. Browse images by category including animals, food, classroom objects, and seasonal themes. The search function finds specific images quickly. Select 1 to 5 different images for your kindergarten worksheets. The generator uses your selected images to create all comparison problems. Theme mode offers faster worksheet creation for busy teachers. Select animals theme and the generator picks different animals randomly. Perfect for creating multiple first grade worksheets with varied content. Upload your own images for maximum customization. Add photos of classroom manipulatives students use daily. Include pictures from current science or social studies units. Combined library and uploaded images create personalized free printable worksheets connecting to your lessons.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Math Worksheet Settings',
        description: 'Set the number of comparison exercises from 1 to 8 problems per worksheet. Most kindergarten worksheets use 4 to 6 exercises for appropriate difficulty. First grade worksheets often include 6 to 8 problems for more practice. Choose the number matching your lesson plan timing. Select which comparison symbols to include in problems. Check greater than, less than, or equal to individually. Focus worksheets on one symbol type for targeted practice. Include all three symbols for comprehensive math worksheets covering complete comparison skills. Choose between illustrated symbols or standard mathematical symbols. Illustrated symbols show fun graphics making kindergarten worksheets more engaging. Standard symbols prepare first grade students for traditional math notation. Switch between modes for different learning stages or student preferences. Select comparison mode between image-to-image or image-to-number. Image-to-image shows objects on both sides for counting practice. Image-to-number combines counting objects with numeral recognition. This flexibility creates free printable worksheets matching exact curriculum needs.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generate Your Kindergarten Worksheets',
        description: 'Click the generate button and your comparison worksheet appears within seconds. The generator creates random problems using your selected images and settings. Each problem shows appropriate quantities for kindergarten or first grade levels. No two worksheets are identical even with same settings. The worksheet displays on an editable canvas immediately after generation. Preview the entire layout before downloading. Check that exercises fit your lesson objectives. Generate again instantly if you want different random problems. Your Full Access subscription includes unlimited regeneration attempts. Exercise numbers appear automatically if that option is selected. Name and date fields display at the top when enabled. All elements appear in positions optimized for the selected page size. The generator handles all layout decisions automatically for professional-looking math worksheets. The answer key generates separately with one additional click. Teachers get both worksheet and answer key matching exactly. Answer keys show the correct comparison symbol for each problem. Perfect for quick grading or student self-checking activities with free printable worksheets.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit Math Worksheets on Canvas',
        description: 'Click any element on the worksheet to select it for editing. Drag images to new positions with your mouse. Resize objects by dragging corner handles. Rotate items to any angle for visual variety on kindergarten worksheets. Add custom text for student names, special instructions, or title text. Choose from seven child-friendly fonts perfect for first grade worksheets. Change text colors to match classroom themes or highlight important directions. Adjust font sizes to emphasize key information on math worksheets. Delete any element you don\'t need by selecting it and pressing delete. Add decorative backgrounds from theme collections. Apply themed borders for seasonal free printable worksheets. Every editing feature works intuitively without training or complicated menus. Layer controls move objects forward or backward in the visual stack. Align multiple selected objects for neat appearance. Lock elements to prevent accidental changes during final edits. The editing canvas provides professional design capabilities in a simple interface perfect for busy teachers creating kindergarten worksheets quickly.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Free Printable Math Worksheets',
        description: 'Select your download format from the dropdown menu. PDF format provides best quality for printing math worksheets. JPEG format works well for digital distribution or online learning platforms. Both formats export at professional 300 DPI resolution. Enable grayscale conversion to save classroom printer ink. Color worksheets convert to black and white while maintaining clarity. Perfect for schools with limited color printing budgets. First grade worksheets print beautifully in grayscale mode. Download the worksheet file to your computer. Download the answer key as a separate file. Both files use clear naming for easy organization. Your Full Access subscription includes unlimited downloads of all kindergarten worksheets you create. Print immediately or save files for future use. Share PDF files with colleagues teaching the same grade level. Upload to learning management systems for remote learning. Create worksheet libraries organized by skill, theme, or difficulty level. Every free printable worksheet you download is yours to use unlimited times.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from more-less.md persona sections
  useCases: {
    sectionTitle: 'Perfect for Teachers, Parents, and Educators',
    sectionDescription: 'Comparison worksheets serve diverse educational needs across multiple teaching environments. Kindergarten teachers, first grade teachers, homeschool parents, ESL instructors, special education teachers, and teacher entrepreneurs all benefit from customizable math worksheets. Each group uses the worksheet maker differently to meet specific student needs. Our Full Access subscription supports all teaching contexts with unlimited worksheet creation. Generate free printable worksheets matching any curriculum requirement.',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Kindergarten Teachers',
        subtitle: 'Alphabet Worksheets and Tracing Worksheets for Early Learning',
        description: 'Kindergarten teachers use comparison worksheets to build foundational number sense skills. Students learn to recognize quantities visually before mastering numeral comparison. The illustrated symbol option makes abstract concepts concrete for 5 and 6 year olds. Comparison skills form the basis for later addition and subtraction understanding. Create worksheets with 3 to 5 exercises matching kindergarten attention spans. Use familiar objects from classroom themes currently being studied. Upload photos of classroom counting manipulatives for instant recognition. Students connect worksheet activities to hands-on learning experiences. Combine comparison worksheets with alphabet worksheets and tracing worksheets for complete learning centers. Rotate math worksheets with literacy activities throughout the day. Use colorful illustrated symbols that appeal to young learners. The visual approach supports kindergarten students still developing abstract thinking skills. Generate multiple versions for differentiated instruction groups. Advanced students compare larger quantities while others practice smaller numbers. Your Full Access subscription allows creating unlimited kindergarten worksheets without per-worksheet costs. Adapt difficulty throughout the school year as students progress.',
        quote: 'My students finally understand greater than and less than thanks to the visual approach!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'First Grade Teachers',
        subtitle: 'Addition Worksheets and Phonics Worksheets Integration',
        description: 'First grade teachers integrate comparison worksheets across math curriculum units. Students ready for standard symbols transition from illustrated to traditional greater than and less than symbols. Comparison skills connect to addition worksheets when students compare sums. These math worksheets reinforce multiple concepts simultaneously. Use image-to-number mode as students develop numeral recognition fluency. Count objects and compare to written numbers for integrated skill practice. Perfect for morning work, math centers, or homework assignments. Create weekly worksheet sets matching current math topics. Combine math comparison practice with phonics worksheets themes. Use images representing phonics patterns being taught. Students count objects while reinforcing vocabulary from reading lessons. This cross-curricular approach maximizes learning time efficiency for first grade classrooms. Generate assessment worksheets tracking student progress on comparison skills. Print answer keys for quick grading during planning periods. Create differentiated versions for struggling and advanced learners. Your Full Access subscription supports all these first grade worksheet needs without additional costs.',
        quote: 'I create a week\'s worth of comparison practice in 15 minutes!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool Parents',
        subtitle: 'Sight Words Worksheets and Kindergarten Worksheets',
        description: 'Homeschool parents appreciate the flexibility to create math worksheets matching individual child progress. Generate worksheets as needed without purchasing expensive workbook sets. Create comparison practice reinforcing concepts from chosen math curriculum. The ability to customize ensures worksheets match specific learning objectives. Upload family photos for personalized worksheets increasing child engagement. Use pictures from nature walks, family activities, or educational outings. Children enjoy counting familiar objects from their experiences. This personalization makes free printable worksheets more meaningful than generic commercial materials. Combine comparison worksheets with sight words worksheets and other kindergarten worksheets for varied homeschool days. Create thematic units covering multiple subjects. Use seasonal images matching current holidays or weather. Your Full Access subscription provides worksheet variety commercial curriculum cannot match. Generate worksheets for multiple children at different grade levels efficiently. Create kindergarten comparison worksheets for younger children and more advanced versions for older siblings. Share worksheet ideas with homeschool co-op members. The commercial license allows selling created worksheets to other homeschool families.',
        quote: 'Finally, math worksheets that match exactly what my kids are learning!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL and Bilingual Teachers',
        subtitle: 'Phonics Worksheets and Alphabet Worksheets for Language Learning',
        description: 'ESL and bilingual teachers use comparison worksheets to teach math concepts and English vocabulary simultaneously. The 11-language interface helps students understand instructions in their home language. Math provides universal concepts that transcend language barriers. Students learn greater than and less than while building English vocabulary. Select images representing vocabulary words from current ESL lessons. Students count objects while practicing English names for items. Combine comparison practice with alphabet worksheets and phonics worksheets themes. This integrated approach accelerates both math and language acquisition. Use illustrated symbols reducing language barriers for beginning English learners. Images communicate comparison concepts before students master English math terminology. Advanced ESL students transition to standard mathematical symbols. Create worksheets at varying language complexity levels. Generate worksheets with culturally familiar images for diverse student backgrounds. Upload images representing students\' home cultures for inclusive math worksheets. Your Full Access subscription includes all 11 languages without extra fees. Create engaging free printable worksheets supporting multilingual learners.',
        quote: 'The 11-language support is perfect for my diverse classroom!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Special Education Teachers',
        subtitle: 'Coloring Worksheets and Tracing Worksheets Modifications',
        description: 'Special education teachers customize comparison worksheets for diverse learning needs. Reduce exercise numbers from 8 to 2 or 3 for students needing smaller chunks. Enlarge images for students with visual processing challenges. Add extra visual supports through color coding or highlighting. Use the symbol circling option instead of fill-in-the-blank for students with fine motor challenges. This modification allows focus on comparison concepts rather than writing skills. Perfect for students working on foundational math understanding. Combine with coloring worksheets and tracing worksheets for multi-sensory learning. Create highly repetitive worksheets for students needing extensive practice. Generate 20 similar worksheets for mastery-based learning approaches. Upload familiar classroom objects students recognize easily. Use consistent layouts reducing cognitive load for students with processing difficulties. Generate social stories using comparison concepts with student photos. Create personalized math worksheets featuring classmates and teachers. Your Full Access subscription supports unlimited differentiation attempts. Print multiple versions testing different approaches for individual students.',
        quote: 'I can quickly adapt worksheets for each student\'s IEP goals!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Teacher Entrepreneurs',
        subtitle: 'Selling First Grade Worksheets on Teachers Pay Teachers',
        description: 'Teacher entrepreneurs build profitable educational product businesses using the commercial license included with Full Access subscriptions. Create comparison worksheet bundles for Teachers Pay Teachers. Design themed packets combining math worksheets with other content. Sell seasonal worksheet sets throughout the school year. Generate comprehensive first grade worksheet bundles covering entire units. Include worksheets, answer keys, and teaching suggestions. Combine comparison worksheets with addition worksheets for complete math packets. Price bundles at $4 to $8 generating passive income. Use professional 300 DPI quality ensuring customer satisfaction. Create preview images showing worksheet quality and variety. Write detailed product descriptions highlighting customization features. Successful teacher sellers earn $500 to $5000 monthly from worksheet products. Market worksheet bundles through Pinterest and teacher Facebook groups. Create free sample worksheets building email lists. Offer exclusive bundles to email subscribers. Your Full Access subscription commercial license covers unlimited product creation and sales without additional licensing fees.',
        quote: 'I earned back my subscription cost selling comparison worksheet bundles!',
      },
    ],
  },

  // FAQ Section - ALL questions from more-less.md
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'Teachers and parents commonly ask questions about creating comparison worksheets before subscribing. These answers address pricing, classroom use, customization options, and technical requirements. Understanding subscription benefits helps educators decide if the worksheet maker meets their teaching needs.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [
      {
        id: '1',
        question: 'Is This Comparison Worksheet Generator Really Free to Use?',
        answer: 'The comparison worksheet generator requires a Full Access subscription costing $240 annually or $25 monthly. Your subscription gives you unlimited comparison worksheet creation with no per-worksheet fees. Generate as many math worksheets, kindergarten worksheets, and first grade worksheets as you need without additional charges. Create hundreds of worksheets throughout the school year for the flat subscription price. The Core Bundle includes 10 popular worksheet generators and costs $144 annually. Full Access subscription costs $240 annually and includes all 33 worksheet generator types including comparison worksheets. Both subscriptions include commercial licensing, 11 language support, and professional 300 DPI quality exports. Most teachers choose Full Access for complete worksheet variety. Your Full Access subscription allows unlimited experimentation finding perfect worksheet designs. Regenerate comparison worksheets until you get ideal random problems. Combine with addition worksheets, alphabet worksheets, and phonics worksheets from the same subscription. The unlimited creation model provides better value than per-worksheet pricing competitors charge.',
      },
      {
        id: '2',
        question: 'Can I Print Comparison Worksheets at Home?',
        answer: 'Comparison worksheets print perfectly on regular home printers using standard letter or A4 paper. Download high-quality PDF files designed for home printing. The 300 DPI resolution ensures crisp images and text on consumer printers. Print comparison worksheets alongside addition worksheets and sight words worksheets for complete home learning packets. Enable grayscale conversion saving expensive color printer ink. Black and white versions maintain full clarity and educational value. Perfect for parents homeschooling on tight budgets. Print coloring worksheets in grayscale for children to color by hand adding interactive elements. Standard 8.5x11 inch letter size fits common printer paper. A4 size works for international users with different paper standards. Landscape orientation options provide variety in worksheet layouts. Your Full Access subscription outputs print-ready files requiring no additional formatting or adjustments.',
      },
      {
        id: '3',
        question: 'Do I Need Design Skills to Create Kindergarten Worksheets?',
        answer: 'Comparison worksheet creation requires absolutely no design skills or technical knowledge. The simple three-step process guides you through image selection, settings configuration, and generation. Create professional kindergarten worksheets as easily as using a photocopier. No graphic design background needed for beautiful results. The interface uses clear labels and intuitive controls. Select images from organized theme categories. Checkboxes and dropdown menus handle all settings. Click generate and your worksheet appears ready to use. Even technology-hesitant teachers master the system within minutes. After generation, optional editing features remain simple. Drag elements to new positions with your mouse. Click text to change fonts or colors. Add alphabet worksheets and tracing worksheets elements without design expertise. The editing canvas works like simplified PowerPoint familiar to most educators.',
      },
      {
        id: '4',
        question: 'Can I Use Comparison Worksheets in My Classroom?',
        answer: 'Full Access subscription includes unlimited classroom use for all worksheets you create. Print comparison worksheets for entire classes without per-student fees. Distribute worksheets as homework, classwork, or assessment materials. Use in learning centers, morning work, or test preparation activities throughout the school year. Share worksheets with grade-level team members teaching the same content. Coordinate lesson plans using identical comparison worksheets across multiple classrooms. Combine with first grade worksheets, coloring worksheets, and phonics worksheets for comprehensive curriculum coverage. Your subscription supports collaborative teaching approaches. Create differentiated versions for various ability levels within one classroom. Generate easier comparison worksheets for struggling learners. Produce challenging versions for advanced students. Mix comparison practice with alphabet worksheets and tracing worksheets for diverse learning needs. One subscription serves all classroom differentiation requirements.',
      },
      {
        id: '5',
        question: 'What Languages Are Available for Comparison Worksheets?',
        answer: 'Comparison worksheets generate in 11 different languages supporting multilingual classrooms. The complete interface translates to English, Spanish, French, German, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. All buttons, labels, and instructions appear in your selected language. Switch languages instantly for different student groups. Create morning comparison worksheets in Spanish for dual-language immersion programs. Generate afternoon versions in English for ESL transition students. Combine with phonics worksheets and sight words worksheets in target languages. The multi-language support makes this tool invaluable for bilingual education programs. Heritage language programs access quality materials in languages beyond English. Generate comparison worksheets for children learning family languages at home. Pair with alphabet worksheets teaching non-English writing systems. Adult ESL programs create basic math vocabulary materials with visual comparison support. Your Full Access subscription includes all 11 languages without extra fees.',
      },
      {
        id: '6',
        question: 'Can I Sell Comparison Worksheets I Create?',
        answer: 'Yes. Full Access subscription includes full commercial print-on-demand licensing at no extra cost. Sell comparison worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP without additional licensing fees. Create worksheet bundles combining comparison worksheets with addition worksheets and tracing worksheets. Your subscription covers unlimited commercial use across all platforms. The commercial license saves $100 to $200 annually compared to competitors charging separate licensing fees. Build profitable teacher entrepreneur businesses selling worksheet products. Package comparison worksheets with alphabet worksheets, coloring worksheets, and sight words worksheets for comprehensive bundles. Price products at $6 to $12 earning passive income. No attribution required on worksheets you sell. Brand products with your business name and logo. Create exclusive designs differentiating your products from competitors. Successful sellers earn $500 to $5000 monthly from educational worksheet sales. Your Full Access subscription commercial license makes teacher entrepreneurship accessible and profitable.',
      },
      {
        id: '7',
        question: 'How Do I Customize Comparison Worksheets?',
        answer: 'Customize comparison worksheets extensively through generation settings and post-generation editing. Choose individual images or theme-based random selection. Select which comparison symbols to include in problems. Adjust exercise numbers from 1 to 8 per worksheet. Configure symbol display between illustrated graphics and standard mathematical symbols. After generation, edit any element on the worksheet canvas. Add custom text for student names or special instructions. Change colors matching classroom themes. Delete unwanted elements or add decorative borders. Upload custom images personalizing worksheets for specific students. Combine comparison elements with coloring worksheets features for hybrid activities. Layer multiple worksheet types creating comprehensive learning packets. Generate comparison worksheets, then add alphabet worksheets and tracing worksheets elements. Create thematic units combining math and literacy practice. Your Full Access subscription supports unlimited customization experimentation finding perfect designs for your teaching style.',
      },
      {
        id: '8',
        question: 'What Age Groups Work Best with Comparison Worksheets?',
        answer: 'Comparison worksheets work perfectly for kindergarten through second grade students ages 5 to 8. Kindergarten students practice visual quantity comparison using illustrated symbols. First grade students transition to standard mathematical symbols. Second grade students work with larger quantities and more complex comparisons. Younger preschool students ages 3 to 4 benefit from simplified comparison worksheets with 1 to 3 exercises. Use large images and illustrated symbols only. Older elementary students practice comparison skills reviewing foundational concepts. Mix comparison worksheets with addition worksheets and sight words worksheets matching developmental stages. Special education students at any age use comparison worksheets matched to cognitive rather than chronological age. Adult ESL learners practice basic math vocabulary with visual comparison support. The flexibility to adjust difficulty makes comparison worksheets appropriate across broad age ranges and ability levels.',
      },
      {
        id: '9',
        question: 'Can I Upload My Own Images to Comparison Worksheets?',
        answer: 'Upload custom images freely through the multi-file upload feature. Add photos of classroom manipulatives students recognize. Include pictures from current curriculum units. Upload student artwork or family photos for personalized worksheets. The system accepts JPEG, PNG, and GIF formats simultaneously. Combine uploaded images with the 3000+ library images on same worksheets. Create phonics worksheets using images representing sound patterns being taught. Design alphabet worksheets with pictures matching letter names. Uploaded images remain available throughout your session for multiple worksheet creation. Upload themed image sets for seasonal or holiday worksheets. Add culturally relevant pictures for diverse student backgrounds. Include images from field trips or classroom experiences. Custom image upload transforms comparison worksheets into personally meaningful learning materials connecting to students\' lives and experiences.',
      },
      {
        id: '10',
        question: 'How Long Does It Take to Create Comparison Worksheets?',
        answer: 'Creating comparison worksheets takes under 3 minutes from start to download. Select images in under one minute. Configure settings in 30 seconds. Generate instantly with one click. Simple edits add another minute. Total time investment remains under 3 minutes for complete worksheets ready to print. This speed advantage multiplies across school years creating enormous time savings. Generate weekly comparison worksheets in 15 minutes total. Add alphabet worksheets, tracing worksheets, and coloring worksheets from the same platform in minutes more. Eliminate hours spent searching multiple websites or manually creating materials. Batch creation during planning periods provides weeks of materials quickly. Generate 10 comparison worksheets in 30 minutes. Pair with addition worksheets and sight words worksheets for complete curriculum coverage. Your Full Access subscription transforms material preparation from hours to minutes weekly.',
      },
      {
        id: '11',
        question: 'Do Comparison Worksheets Include Answer Keys?',
        answer: 'Comparison worksheets include automatic answer key generation with one additional click. The answer key matches your worksheet layout exactly showing correct comparison symbols for each problem. Download worksheet and answer key as separate files. Print answer keys for teacher reference or student self-checking activities. Answer keys display the same format as worksheets maintaining consistency. If you selected illustrated symbols, answer keys show illustrated symbols. Standard mathematical symbols appear in answer keys when selected. This matching format helps students check their work independently. Create answer keys for all worksheet types from your Full Access subscription. Generate answer keys for addition worksheets, first grade worksheets, and phonics worksheets. Store answer keys digitally or print for classroom reference binders. The automated answer key feature saves teachers countless grading hours throughout school years.',
      },
      {
        id: '12',
        question: 'Can I Create Comparison Worksheets About Specific Subjects?',
        answer: 'Create subject-specific comparison worksheets using themed image selection. Choose science themes comparing animals, plants, or weather elements. Select social studies themes with community helpers, transportation, or cultural objects. Math-focused themes reinforce number comparison within curriculum context. Integrate comparison worksheets with current reading units. Select images matching story vocabulary students are learning. Combine with sight words worksheets reinforcing story-related vocabulary. Create thematic units pairing comparison math with literacy content. This cross-curricular approach maximizes instructional time efficiency. Upload subject-specific images from current curriculum units. Photograph science experiment materials for comparison practice. Include historical artifacts from social studies lessons. Pair comparison worksheets with coloring worksheets featuring the same subject themes. Your Full Access subscription supports unlimited subject integration across all worksheet types.',
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
      'Unlimited worksheet creation',
      'Commercial license included',
      '11 languages supported',
      '3000+ themed images',
      '300 DPI print quality',
      'Answer keys included',
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
    sectionDescription: 'Our platform offers 33 different worksheet generators beyond comparison worksheets. Your Full Access subscription provides access to all generators for creating comprehensive learning packets. Combine comparison worksheets with addition worksheets, alphabet worksheets, and counting activities. Build complete themed units mixing quantity comparison with other early math skills.',
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
        description: 'Combine comparison worksheets with addition practice for comprehensive math learning. Students compare quantities then solve addition equations.',
      },
      {
        id: '2',
        slug: 'find-and-count-worksheets',
        name: 'Find and Count',
        category: 'Math',
        icon: '🔢',
        description: 'Pair comparison worksheets with counting activities. Students count objects then compare quantities using greater than and less than symbols.',
      },
      {
        id: '3',
        slug: 'big-small-worksheets',
        name: 'Big vs Small',
        category: 'Visual Learning',
        icon: '📐',
        description: 'Create complete size comparison units combining more/less with big/small worksheets. Practice quantity and size comparison together.',
      },
      {
        id: '4',
        slug: 'matching-worksheets',
        name: 'Matching Worksheets',
        category: 'Visual Learning',
        icon: '🔗',
        description: 'Bundle comparison worksheets with matching activities. Students identify quantities then match equal groups of objects.',
      },
      {
        id: '5',
        slug: 'chart-count-worksheets',
        name: 'Chart Count',
        category: 'Math',
        icon: '📊',
        description: 'Combine comparison with pictograph worksheets for data analysis skills. Students read charts then compare quantities shown.',
      },
      {
        id: '6',
        slug: 'math-worksheets',
        name: 'Math Worksheets',
        category: 'Math',
        icon: '🧮',
        description: 'Create comprehensive math packets with comparison and general math worksheets. Cover multiple early math concepts in one learning unit.',
      },
    ],
  },
};

export default moreLessEnContent;
