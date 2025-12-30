import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - English Content
 *
 * File: frontend/content/product-pages/en/treasure-hunt-worksheets.ts
 * URL: /en/apps/treasure-hunt-worksheets
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/English/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const treasureHuntEnContent: ProductPageContent = {
  // Hero Section - FULL text from treasure-hunt.md paragraphs 1-4
  hero: {
    title: 'Free Printable Following Directions Worksheets',
    subtitle: 'Treasure Hunt Generator for Kindergarten and First Grade',
    description: `Create professional treasure hunt worksheets with our following directions worksheet generator. Your Full Access subscription gives you unlimited worksheet creation with no per-worksheet fees. Generate custom printable treasure hunt worksheets perfect for kindergarten and first grade students learning directional vocabulary and reading comprehension. Download high-quality PDF worksheets in under 3 minutes.

Treasure hunt worksheets help young learners practice following multi-step directions while building spatial awareness and directional vocabulary. Students read written instructions and navigate through a 5x5 grid of images to find the hidden treasure. Each worksheet combines reading comprehension practice with visual learning in an engaging puzzle format that keeps children motivated.

This treasure hunt generator creates unique worksheets every time you click generate. Choose from thousands of child-friendly images organized by theme or upload your own pictures to personalize worksheets for your students. Perfect for kindergarten teachers, first grade teachers, homeschool parents, and special education instructors who need differentiated following directions practice materials.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Worksheet Samples',
    downloadLabel: 'Download Free Sample',
    worksheetLabel: 'Worksheet',
    answerKeyLabel: 'Answer Key',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Treasure hunt worksheet with up down left right directions for kindergarten',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Treasure hunt worksheet with cardinal directions north south east west for first grade',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from treasure-hunt.md H3 sections
  features: {
    sectionTitle: 'Everything You Need for Treasure Hunt Worksheets',
    sectionDescription: 'Our treasure hunt worksheet maker includes seven powerful features that help teachers create professional following directions worksheets in minutes. Each feature works together to give you complete control over your kindergarten worksheets and first grade worksheets. Generate unlimited treasure hunt activities with your Full Access subscription. No per-worksheet fees mean you can create as many free printable worksheets as your students need.',
    highlightBadgeText: 'Key Feature',
    items: [
      {
        id: '1',
        icon: '🚀',
        title: 'Create Worksheets in 3 Clicks',
        description: 'Generate complete treasure hunt worksheets in under 3 minutes with our simple three-step process. Select a theme from our image library to automatically populate your worksheet with six related images. The generator creates a 5x5 grid and generates six random directional moves that guide students to the treasure location. Your treasure hunt worksheet appears instantly with clues and grid ready to print. Teachers love how fast they can create differentiated kindergarten worksheets for different ability levels. Generate basic direction worksheets using up/down/left/right vocabulary for preschool and kindergarten students. Switch to cardinal directions with north/south/east/west for first grade worksheets and second grade students. Each worksheet includes clear written instructions that students follow step by step. The automatic generation handles all the complex work behind the scenes. Our algorithm ensures no two adjacent grid cells contain the same image so students can accurately follow directions without confusion. Every treasure hunt worksheet includes properly formatted clues and a clean grid layout that prints perfectly on standard letter or A4 paper.',
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Full Canvas Editability',
        description: 'Every element on your treasure hunt worksheet is completely editable after generation. Drag and resize the instruction clues to fit your preferred layout. Move the 5x5 image grid anywhere on the page. Add custom text labels or additional instructions for students who need extra support. Change colors, adjust spacing, or modify any visual element to match your classroom materials. The canvas editing system gives you professional design control without requiring design skills. Click any text element to change the font, size, or color. Select the grid to reposition it on the page. Add your school logo or classroom branding to create cohesive free printable worksheets that match your existing materials. Teachers use this editing flexibility to differentiate kindergarten worksheets for diverse learners. Add picture cues for emerging readers. Increase font sizes for students with visual processing needs. Include bilingual labels for English language learners. Every modification happens directly on the canvas with immediate visual feedback.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Custom Images',
        description: 'Upload your own photographs or drawings to create treasure hunt worksheets that connect directly to your curriculum. Teaching a unit on farm animals? Upload photos from your class field trip and generate treasure hunt worksheets featuring those specific images. Students stay more engaged when they recognize familiar pictures in their kindergarten worksheets. The multi-file upload system accepts JPEG, PNG, and GIF formats. Upload an entire theme set at once or add individual images as needed. Your uploaded images combine seamlessly with our 3000+ image library so you can mix custom content with ready-made graphics. This flexibility helps you create phonics worksheets, math worksheets, and sight words worksheets that align perfectly with your lesson plans. Custom uploads work especially well for special education teachers who need highly personalized materials. Upload photos of classroom objects for life skills vocabulary practice. Create treasure hunt worksheets featuring students\' favorite characters or interests to boost motivation. Upload simplified graphics for students who struggle with visual complexity.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Languages Supported',
        description: 'Create treasure hunt worksheets in English, Spanish, French, German, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, or Finnish. The language selector controls both the user interface and the image library content. This dual-language system helps ESL teachers create differentiated first grade worksheets for students at different English proficiency levels. The multilingual feature shines brightest in dual-language classrooms and world language instruction. Generate Spanish treasure hunt worksheets with directional vocabulary like "norte, sur, este, oeste" for Spanish immersion kindergarten students. Create French worksheets with "nord, sud, est, ouest" for French language learners. Each language includes culturally appropriate images with accurate translations. Language teachers use treasure hunt worksheets to practice directional vocabulary in context. Students learn prepositions and spatial terms while following engaging multi-step directions. The visual grid provides comprehension support for beginning language learners. Advanced students can create their own treasure hunt clues in the target language for authentic writing practice.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Commercial License Included',
        description: 'Your Full Access subscription includes complete commercial print-on-demand licensing at no extra cost. Sell your treasure hunt worksheets on Teachers Pay Teachers, Etsy, or Amazon KDP without additional licensing fees. Create entire worksheet packets combining treasure hunt activities with alphabet worksheets, tracing worksheets, and coloring worksheets to sell as comprehensive learning bundles. The commercial license gives teacher entrepreneurs a powerful income opportunity. Many educators earn $500 to $5,000 monthly selling printable kindergarten worksheets and first grade worksheets online. The 300 DPI professional quality ensures your worksheets look crisp and clear in customer downloads. No attribution required means cleaner product pages that focus on your brand. This licensing value represents significant savings compared to competitors who charge $100-$200 annually for commercial rights. Your Full Access subscription includes commercial licensing for all 33 worksheet generators on the platform. Create diverse worksheet products from treasure hunts to addition worksheets to phonics worksheets, all with full resale rights included.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '📚',
        title: '3000+ Child-Friendly Images',
        description: 'Access over 3,000 professional child-friendly images organized into dozens of themes. Browse images by category like animals, food, transportation, classroom objects, or seasonal themes. The search function helps you quickly find specific images for themed treasure hunt worksheets. Every image is optimized for clarity and print quality. The theme-based organization makes creating cohesive kindergarten worksheets incredibly fast. Select "Ocean Animals" to generate treasure hunt worksheets featuring sea creatures. Choose "School Supplies" for back-to-school following directions practice. Each theme includes enough image variety to create dozens of unique worksheets without repetition. Teachers appreciate the age-appropriate image selection carefully curated for early childhood education. All images feature simple, recognizable subjects that kindergarten and first grade students can easily identify. Bright colors and clear details help beginning readers connect written clues to visual targets. The library constantly expands with new themes and seasonal content.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professional 300 DPI Quality',
        description: 'Download every treasure hunt worksheet as high-resolution 300 DPI JPEG or PDF files. This professional print quality ensures crisp text and clear images whether you print at home, at school, or through commercial printing services. The grayscale option reduces ink consumption while maintaining excellent clarity for budget-conscious classrooms. The 300 DPI resolution makes your free printable worksheets look professionally published. Parents and administrators notice the quality difference compared to low-resolution worksheets from free websites. Sell your teacher-created materials with confidence knowing the print quality matches or exceeds commercial worksheet publishers. Export options include separate worksheet and answer key downloads. The answer key shows the treasure location marked with a clear visual indicator. Teachers save prep time with automatically generated answer keys that match each unique worksheet variation. Both worksheet and answer key maintain identical formatting and professional quality.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from treasure-hunt.md Step sections
  howTo: {
    sectionTitle: 'Create Treasure Hunt Worksheets in 5 Easy Steps',
    sectionDescription: 'Generate professional treasure hunt worksheets in under 3 minutes following this simple five-step process. No design skills required. Teachers create custom kindergarten worksheets and first grade worksheets during prep periods or planning time. The streamlined workflow helps you build entire worksheet packets combining treasure hunts with math worksheets, alphabet worksheets, and addition worksheets for comprehensive learning units.',
    ctaText: 'Start Creating Now',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Choose Your Content',
        description: 'Start by selecting six images for your treasure hunt grid using one of two methods. The fastest approach uses theme-based automatic generation where you select a category like "Farm Animals" or "School Supplies" and the generator automatically chooses six related images. This works perfectly when creating general kindergarten worksheets or first grade worksheets that don\'t require specific vocabulary. The manual selection method gives you precise control over which images appear in your worksheet. Browse the 3000+ image library using theme filters or the search function. Click six individual images to build custom vocabulary sets. Teachers use manual selection when creating targeted phonics worksheets, sight words worksheets, or math worksheets that must feature specific objects for curriculum alignment. Upload your own images for maximum personalization. Combine uploaded photos with library images to create treasure hunt worksheets that connect directly to your classroom lessons. This flexibility helps special education teachers create highly individualized free printable worksheets featuring familiar objects from students\' daily experiences.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Customize Settings',
        description: 'Choose your page size from Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape, or Square formats. Portrait orientation works best for vertical filing systems and standard worksheet binders. Landscape orientation provides more horizontal space for longer instruction clues. Select the format that matches your classroom organization system and printing setup. Set the direction vocabulary type based on your students\' grade level and curriculum standards. Choose basic directions with up/down/left/right terminology for preschool through first grade students. This age-appropriate vocabulary appears in most kindergarten worksheets and early first grade worksheets. Switch to cardinal directions using north/south/east/west for second grade and above when students learn map skills and geographic orientation. Add optional background themes or border decorations to create visually engaging free printable worksheets. The opacity slider lets you adjust background intensity so decorative elements enhance without overwhelming the instructional content.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generate Your Worksheet',
        description: 'Click the generate button and watch your treasure hunt worksheet appear instantly on the canvas. The automatic layout system positions the 5x5 image grid and instruction clues in an optimized arrangement for readability. Landscape pages show clues on the left with the grid on the right. Portrait pages stack clues above the grid. Both layouts maximize space efficiency for clear, uncluttered worksheets. The generation algorithm creates six random directional moves that guide students from the starting image to the treasure location. No two worksheets are identical because the moves randomize with each generation. Teachers create multiple differentiated first grade worksheets for different ability groups by generating several variations using the same image set with different movement patterns. Review the preview to verify the worksheet meets your needs before downloading. Check that the instruction clues are clearly readable and the grid images are large enough for young students to identify easily.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edit on Canvas',
        description: 'Click any element on the canvas to select it for editing. Drag the instruction clue text box to reposition it anywhere on the page. Resize the 5x5 grid by grabbing corner handles and dragging to scale larger or smaller. Every component is fully editable so you can create perfectly customized free printable worksheets that match your exact specifications. Add supplementary text elements using the text tools panel. Insert your name, classroom number, or student name fields at the top of kindergarten worksheets. Add completion instructions like "Circle the treasure when you find it" or "Color the path you followed." Include vocabulary hints or picture labels to scaffold learning for struggling readers. The unlimited text additions let you differentiate worksheets for diverse learners. Teachers combine treasure hunt worksheets with other worksheet types by adding elements from different generators. Create comprehensive learning packets by placing a treasure hunt, alphabet worksheet section, and math worksheet section all on one page.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download and Print',
        description: 'Select your download format from the dropdown menu offering JPEG or PDF options. JPEG files work well for inserting into Google Slides presentations or digital classroom platforms. PDF files maintain perfect print quality and work best for physical printouts. Both formats export at professional 300 DPI resolution ensuring crisp text and clear images. Generate the answer key before downloading if you want both versions. The answer key shows the identical worksheet with a red circle marking the treasure location. Having both files ready saves time during lesson prep. Print the worksheet for students and keep the answer key in your teaching materials for quick reference during instruction or assessment. Enable the grayscale toggle if you\'re printing on a black-and-white printer or want to reduce color ink consumption. Grayscale conversion maintains excellent clarity while significantly lowering printing costs. Many teachers print grayscale kindergarten worksheets and first grade worksheets for daily practice activities then save color versions for special occasions.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from treasure-hunt.md persona sections
  useCases: {
    sectionTitle: 'Perfect for Teachers, Parents, and Educators',
    sectionDescription: 'Treasure hunt worksheets serve diverse educational settings from traditional classrooms to homeschool environments. Teachers across grade levels use following directions activities to build reading comprehension, spatial awareness, and critical thinking skills. The flexible format adapts to different curriculum standards and learning objectives. Create unlimited free printable worksheets for daily practice, assessment, enrichment, or intervention programs.',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Kindergarten Teachers',
        subtitle: 'Sight Words Worksheets, Alphabet Worksheets, and Math Worksheets',
        description: 'Kindergarten teachers use treasure hunt worksheets to practice directional vocabulary while reinforcing letter recognition and number identification. Create alphabet worksheets featuring letter images where students follow directions to find specific letters. Build sight words worksheets using high-frequency word images that students must navigate to locate. These dual-purpose activities combine literacy practice with spatial reasoning development. Math vocabulary treasure hunts help kindergarten students learn number recognition and counting skills. Select images of objects students can count like apples, blocks, or animals. Include directional clues using basic up/down/left/right terminology appropriate for five and six-year-olds. Students practice reading simple directions while simultaneously identifying mathematical concepts. This integrated approach maximizes instructional time by addressing multiple learning objectives simultaneously. Kindergarten teachers appreciate treasure hunt worksheets for literacy centers and small group instruction. Print multiple variations using different themes to maintain student interest across the school year. Seasonal treasure hunts featuring holiday images keep activities fresh and engaging. Use the worksheets during transition times when students finish other work early.',
        quote: 'My students beg to do treasure hunts every day!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Elementary School Teachers',
        subtitle: 'Addition Worksheets, Phonics Worksheets, and First Grade Worksheets',
        description: 'First grade teachers use treasure hunt worksheets to practice reading comprehension and following complex multi-step directions. Students at this age are developing fluency with directional vocabulary and can handle more sophisticated instruction sequences. Create first grade worksheets using cardinal directions like north/south/east/west to connect with social studies map skills curriculum. The cross-curricular connections strengthen learning across subject areas. Second and third grade teachers create challenging treasure hunt variations by increasing the number of directional steps or using more complex vocabulary. Include phonics worksheets elements by selecting images that feature specific sound patterns students are learning. Create themed treasure hunts around word families or phonics rules. Students practice decoding skills while following directions to locate the target image. Teachers use treasure hunt worksheets for differentiated instruction by varying complexity levels. Struggling readers receive worksheets with three or four simple directional moves using basic vocabulary. Advanced students get worksheets with six or seven moves incorporating cardinal directions and more complex sentence structures. This differentiation happens quickly because you can generate multiple variations in minutes.',
        quote: 'The map skills connection makes social studies come alive!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Homeschool Parents',
        subtitle: 'Tracing Worksheets and Coloring Worksheets',
        description: 'Homeschool parents love treasure hunt worksheets because one activity engages multiple grade levels simultaneously. Generate different difficulty versions of the same theme so siblings work on related content at appropriate challenge levels. A preschooler practices basic directional vocabulary while the first grader works on cardinal directions using identical farm animal images. This parallel teaching saves preparation time while maintaining academic rigor. The combination potential makes treasure hunt worksheets extremely versatile for homeschool multi-subject units. Create treasure hunts for science vocabulary lessons about animals, plants, or weather. Build geography treasure hunts featuring country flags or landmark images. Design history-themed activities using images of historical figures or artifacts. The unlimited generation capability means homeschool parents never run out of fresh materials. Homeschool families combine treasure hunt activities with tracing worksheets and coloring worksheets for comprehensive skill development. Students complete the treasure hunt first, then trace the path they followed on the grid. Extend the activity by having children color the images in the grid for fine motor practice. This multi-step approach transforms a simple following directions worksheet into an hour-long integrated learning experience.',
        quote: 'One theme works for all three of my kids at different levels!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL and Language Teachers',
        subtitle: 'Multilingual Kindergarten Worksheets',
        description: 'ESL teachers find treasure hunt worksheets invaluable for teaching directional vocabulary to English language learners. The visual grid provides comprehension support for students still developing English reading skills. Students can see the images they\'re navigating between, which helps them understand directional words in context. This visual scaffolding makes treasure hunts perfect for newcomer students with limited English proficiency. The 11-language support allows ESL teachers to create parallel worksheets in students\' native languages and English. Generate the same treasure hunt in Spanish and English so students can compare vocabulary and build bilingual skills. This contrastive approach helps learners see patterns between languages. Students develop metalinguistic awareness while practicing directional vocabulary in both languages. Dual-language immersion teachers use treasure hunt worksheets for target language instruction. Create French free printable worksheets using "nord, sud, est, ouest" vocabulary for French immersion kindergarten classrooms. Generate German worksheets with "Norden, Suden, Osten, Westen" for German language programs. The authentic directional vocabulary practice supports curriculum standards while keeping students engaged through game-like activities.',
        quote: 'The visual support helps my newcomer students succeed!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Special Education Teachers',
        subtitle: 'Differentiated First Grade Worksheets and Phonics Worksheets',
        description: 'Special education teachers use treasure hunt worksheets to create highly individualized materials for students with diverse learning needs. Upload photographs of familiar classroom objects to create life skills vocabulary practice. Students with autism spectrum disorders benefit from worksheets featuring their special interests. Generate dinosaur treasure hunts for the child obsessed with paleontology. Create train-themed activities for the student who loves locomotives. This personalization dramatically increases engagement and on-task behavior. The editing capabilities help special education teachers modify worksheets for specific accommodations. Increase font sizes for students with visual processing difficulties. Add picture cues next to directional words for non-readers or emergent readers. Include color coding where each direction type uses a different color. These modifications happen directly on the canvas without needing separate accessibility software. Special education teachers create treasure hunt worksheets that bridge multiple skill levels within one classroom. Generate simplified two-step treasure hunts for students working on basic direction following. Create standard six-step versions for students approaching grade-level expectations. Advanced learners get eight-step treasure hunts with complex vocabulary. This differentiation supports inclusive classrooms where students with IEPs work alongside typically developing peers using appropriately challenging materials.',
        quote: 'I can customize everything to match each student\'s IEP goals!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Teacher Entrepreneurs',
        subtitle: 'Selling Math Worksheets and Addition Worksheets on TPT',
        description: 'Teacher entrepreneurs build profitable worksheet businesses selling treasure hunt packets on Teachers Pay Teachers, Etsy, and Amazon KDP. The Full Access commercial license means you can create and sell unlimited worksheet products. Many successful sellers earn $500 to $5,000 monthly selling seasonal worksheet bundles, themed activity packets, and curriculum-aligned materials. Every treasure hunt worksheet you create becomes commercially licensable inventory. Top-selling treasure hunt products include comprehensive curriculum-aligned sets. Create 26 alphabet treasure hunts teaching letter recognition A through Z. Develop 100 sight words treasure hunts covering Dolch and Fry high-frequency lists. Package 50 seasonal treasure hunts for year-round sales. These complete sets command premium pricing versus single worksheet sales. Teacher entrepreneurs differentiate products through creative combinations. Bundle treasure hunts with matching coloring worksheets for dual-purpose products. Create comprehensive learning packets combining treasure hunts with addition worksheets, math worksheets, and alphabet worksheets. Price bundled packets higher than individual worksheets to maximize revenue per sale. Customers love variety packs that provide multiple activities for one purchase price.',
        quote: 'My treasure hunt bundles sell hundreds of copies every month!',
      },
    ],
  },

  // FAQ Section - ALL questions from treasure-hunt.md
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'Teachers commonly ask twelve questions about creating treasure hunt worksheets and using the generator effectively. These answers address pricing, usage rights, customization options, and technical details. Understanding these fundamentals helps you maximize your Full Access subscription value and create better educational materials for your students.',
    showMoreText: 'Show more questions',
    showLessText: 'Show less',
    items: [
      {
        id: '1',
        question: 'Is This Treasure Hunt Worksheet Generator Really Free to Use?',
        answer: 'The treasure hunt worksheet generator requires a Full Access subscription costing $240 annually or $25 monthly. Your subscription gives you unlimited treasure hunt creation with no per-worksheet fees. Generate as many directional vocabulary worksheets as you need without additional charges. The subscription includes access to all 33 worksheet generators on the platform including math worksheets, addition worksheets, alphabet worksheets, and more. The Core Bundle includes 10 popular worksheet generators and costs $144 annually. Full Access subscription costs $240 annually and includes all 33 worksheet generator types including treasure hunt worksheets. Both subscriptions include commercial licensing, 11-language support, and professional 300 DPI quality exports. Full Access provides better value for teachers needing diverse worksheet types across multiple subjects.',
      },
      {
        id: '2',
        question: 'Can I Print Treasure Hunt Worksheets at Home?',
        answer: 'Treasure hunt worksheets print perfectly on standard home and office printers using regular letter or A4 paper. The generator creates standard page sizes that work with any inkjet or laser printer. Download worksheets as PDF files for best printing results. The 300 DPI resolution ensures crisp text and clear images even on budget home printers. The grayscale option reduces color ink consumption significantly while maintaining excellent worksheet clarity. Many teachers print grayscale kindergarten worksheets and first grade worksheets for daily practice to save money. Reserve color printing for special occasions or student rewards. Both color and grayscale versions print beautifully on standard 20-pound copy paper available at any office supply store.',
      },
      {
        id: '3',
        question: 'Do I Need Design Skills to Create Treasure Hunt Worksheets?',
        answer: 'No design skills required to create professional treasure hunt worksheets. The automatic generation handles all layout, formatting, and visual design. Click generate and receive a complete worksheet ready to print or download. The system positions the grid, formats instruction clues, and creates balanced layouts automatically. Teachers with zero graphic design experience create professional materials in minutes. The editing tools provide optional customization without requiring design expertise. Drag elements to reposition them. Click text to change fonts or colors. Resize objects by grabbing corner handles. These simple controls work like basic word processing software. Teachers report the interface feels intuitive and easy to learn within 10-15 minutes of first use.',
      },
      {
        id: '4',
        question: 'Can I Use Treasure Hunt Worksheets in My Classroom?',
        answer: 'Full Access subscription includes unlimited classroom use for your students. Generate treasure hunt worksheets for whole class instruction, small group work, learning centers, or individual practice. Print copies for your entire class without worrying about licensing restrictions. Use worksheets for homework, classwork, assessment, or enrichment activities. The classroom use rights extend to substitute teachers using your materials during your absence. Share physical printed worksheets with students and parents freely. The subscription covers traditional classroom distribution of paper copies. Teachers cannot share digital files on public websites or parent portals where non-students might access them. Print and distribute paper copies within your school or classroom as needed for educational purposes.',
      },
      {
        id: '5',
        question: 'What Languages Are Available for Treasure Hunt Worksheets?',
        answer: 'Create treasure hunt worksheets in 11 languages including English, Spanish, French, German, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. The language selector controls both the user interface and the image library content. Switch between languages instantly to create parallel worksheets for dual-language instruction or ESL programs. Each language includes culturally appropriate images with accurate translations and region-specific directional vocabulary. Spanish worksheets use "norte, sur, este, oeste" while French versions feature "nord, sud, est, ouest." The multilingual support serves world language teachers, ESL instructors, bilingual education programs, and heritage language schools. Generate alphabet worksheets and phonics worksheets in students\' native languages to support literacy development.',
      },
      {
        id: '6',
        question: 'Can I Sell Treasure Hunt Worksheets I Create?',
        answer: 'Yes. Full Access subscription includes full commercial print-on-demand licensing at no extra cost. Sell your treasure hunt worksheets on Teachers Pay Teachers, Etsy, Amazon KDP, or your own website. Create worksheet bundles combining treasure hunts with math worksheets, sight words worksheets, alphabet worksheets, and other educational materials. No attribution required means cleaner product pages focusing on your teacher brand. The commercial license covers unlimited sales with no royalty fees or revenue sharing. Keep 100% of your earnings after platform fees. Many teacher entrepreneurs earn $500-$5,000 monthly selling printable worksheets created with Full Access subscription tools. The license includes rights to modify, bundle, and resell worksheets as finished products. You cannot resell the generator tool itself or share your login credentials.',
      },
      {
        id: '7',
        question: 'How Do I Customize Treasure Hunt Worksheets for My Students?',
        answer: 'Click any element on the generated worksheet to select it for editing. Drag instruction clues to reposition them anywhere on the page. Resize the 5x5 image grid larger or smaller by grabbing corner handles. Add custom text elements with student names, classroom numbers, or additional instructions. Change fonts, colors, and sizes using the text properties panel. Upload custom images to create highly personalized worksheets featuring classroom-specific content. Combine uploaded photos with library images for unique worksheet designs. Add backgrounds and borders to match seasonal themes or classroom decor. The unlimited editing capabilities let you transform basic generated worksheets into customized materials that perfectly match your teaching style and student needs.',
      },
      {
        id: '8',
        question: 'What Age Groups Work Best With Treasure Hunt Worksheets?',
        answer: 'Treasure hunt worksheets work excellently for ages 4-8 covering preschool through second grade. Kindergarten students practice basic directional vocabulary like up/down/left/right while building reading comprehension skills. First grade students handle more complex multi-step directions and can transition to cardinal directions like north/south/east/west. Second graders work on sophisticated direction sequences and abstract spatial reasoning. Adjust difficulty by changing direction vocabulary type and number of moves. Preschool and kindergarten students start with 3-4 moves using basic directions. First grade worksheets include 5-6 moves mixing basic and cardinal vocabulary. Advanced second graders handle 6-7 moves using exclusively cardinal directions. The flexible difficulty scaling supports differentiated instruction across mixed-ability classrooms.',
      },
      {
        id: '9',
        question: 'Can I Upload My Own Images to Treasure Hunt Worksheets?',
        answer: 'Upload unlimited custom images in JPEG, PNG, or GIF formats. The multi-file upload accepts entire image sets at once for efficient workflow. Your uploaded images integrate seamlessly with the 3000+ image library so you can mix custom and stock content freely. This flexibility helps you create treasure hunt worksheets that align perfectly with specific curriculum units. Teachers upload classroom photos for personalized life skills worksheets. ESL instructors upload culturally relevant images for English language learners. Special education teachers upload favorite characters or interests to boost student motivation. Homeschool parents upload family photos for engaging personalized learning materials. The custom upload capability transforms generic worksheets into highly targeted educational tools.',
      },
      {
        id: '10',
        question: 'How Long Does It Take to Create a Treasure Hunt Worksheet?',
        answer: 'Generate complete treasure hunt worksheets in under 3 minutes from start to download. Select a theme or choose six images, pick your direction vocabulary type, click generate, and download the finished worksheet. The automatic generation handles all complex layout and formatting work instantly. Teachers create multiple worksheet variations in 10-15 minutes for an entire week of activities. The speed advantage becomes dramatic when creating differentiated materials. Generate three difficulty levels of the same themed treasure hunt in under 10 minutes total. Create matching worksheets in two languages in 5 minutes. Build comprehensive worksheet packets combining treasure hunts with tracing worksheets and coloring worksheets in 20-30 minutes. This efficiency saves hours compared to traditional manual worksheet creation methods.',
      },
      {
        id: '11',
        question: 'Do Treasure Hunt Worksheets Include Answer Keys?',
        answer: 'Yes. Generate answer keys showing the treasure location marked with a clear red circle indicator. The answer key uses identical layout and formatting as the student worksheet for easy comparison. Download separate files for worksheet and answer key or generate both together. Teachers save significant preparation time with automatically generated answer keys that match each unique worksheet variation perfectly. The answer key appears on a separate canvas tab allowing independent editing if needed. Adjust answer key formatting without affecting the student worksheet. Print answer keys on different colored paper for easy filing organization. Include answer keys in your teaching materials binder for quick reference during instruction or assessment. Both worksheet and answer key export at professional 300 DPI quality.',
      },
      {
        id: '12',
        question: 'Can I Create Treasure Hunt Worksheets About Specific Subjects?',
        answer: 'Absolutely. Create subject-specific treasure hunt worksheets by selecting themed images related to any curriculum area. Math treasure hunts feature number images, geometric shapes, or counting objects. Science worksheets showcase animals, plants, weather symbols, or laboratory equipment. Social studies treasure hunts include maps, flags, historical figures, or cultural symbols. The theme-based image library organizes content by subject area for quick selection. Search functionality helps you find specific vocabulary words needed for targeted lessons. Upload subject-specific images to create treasure hunts perfectly aligned with your exact curriculum standards. Combine treasure hunt directional practice with content-area vocabulary reinforcement for integrated cross-curricular learning activities.',
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
      'All 33 worksheet generators',
      'Two direction modes',
    ],
    ctaText: 'Start Creating Now',
    guaranteeText: '30-day money-back guarantee',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine with Other Worksheet Generators',
    sectionDescription: 'Your Full Access subscription includes 33 different worksheet generators. Combine treasure hunt activities with alphabet worksheets, math worksheets, and coloring worksheets for comprehensive learning packets. Every generator works seamlessly together for thematic curriculum units.',
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
        description: 'Combine treasure hunts with addition worksheets for comprehensive math practice. Students practice directional vocabulary while reinforcing number skills.',
      },
      {
        id: '2',
        slug: 'alphabet-train-worksheets',
        name: 'Alphabet Train',
        category: 'Early Learning',
        icon: '🚂',
        description: 'Pair treasure hunt directional practice with alphabet train letter recognition. Create complete literacy packets combining navigation and letter learning.',
      },
      {
        id: '3',
        slug: 'word-search-worksheets',
        name: 'Word Search',
        category: 'Language Arts',
        icon: '🔍',
        description: 'Bundle treasure hunts with word search puzzles for vocabulary reinforcement. Students find directional vocabulary words hidden in puzzles after completing hunts.',
      },
      {
        id: '4',
        slug: 'coloring-worksheets',
        name: 'Coloring Pages',
        category: 'Art & Creativity',
        icon: '🎨',
        description: 'Extend treasure hunt activities with coloring worksheets featuring the same themed images. Students color the path they followed through the grid.',
      },
      {
        id: '5',
        slug: 'drawing-lines-worksheets',
        name: 'Tracing Worksheets',
        category: 'Fine Motor',
        icon: '✏️',
        description: 'Combine directional following practice with tracing worksheets for complete fine motor development. Students trace paths after completing treasure hunts.',
      },
      {
        id: '6',
        slug: 'picture-path-worksheets',
        name: 'Picture Path Mazes',
        category: 'Visual Learning',
        icon: '🗺️',
        description: 'Pair treasure hunts with picture path mazes for varied navigation practice. Both activities build spatial awareness through different pathfinding formats.',
      },
    ],
  },
};

export default treasureHuntEnContent;
