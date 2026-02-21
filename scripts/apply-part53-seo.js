/**
 * SEO Part 53: Enrich robots & school EN theme hub pages
 * - Robots: adds 12 missing enrichment fields
 * - School: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Robots: 12 fields ─────────────────────────────────────────────────

const robotsFields = `
  // -- SEO Enrichment (Part 53) --

  uniqueAngle: 'Robots is the ONLY theme where the educational content IS computational thinking itself \u2014 where every worksheet about following code-addition sequences, extending gear patterns, reproducing grid designs, or decoding cryptogram messages practices the exact sequential reasoning, algorithmic logic, and systematic problem-solving that computer science and engineering careers require, using the mechanical characters and futuristic scenarios children find irresistibly exciting. No other theme delivers this computation-as-core-curriculum framework, because while numbers teaches arithmetic through abstract operations and shapes teaches geometry through visual properties, only robots makes the act of thinking like a machine \u2014 following precise instructions, identifying logical patterns, debugging errors, and designing systematic solutions \u2014 the fundamental, unavoidable subject of every single activity. This computational-centrality framework is structurally different from all other themes because robot worksheets teach thinking skills through a context that children associate with imagination and play rather than academic obligation \u2014 they program robots, crack codes, and build mechanical designs \u2014 creating an engagement pathway where the most reluctant learners willingly practice the exact logical reasoning that STEM achievement requires. Robots is also the ONLY theme where engineering design thinking is the natural, central creative process \u2014 where designing a robot on paper requires simultaneous consideration of form and function, where grid-match reproduction demands the precise spatial reasoning that technical drawing requires, and where code-addition formats introduce the instruction-following mindset that all programming languages share. The geometric dimension adds a unique spatial-analytical layer: robot illustrations built from circles, squares, and rectangles make every coloring page a shape-recognition exercise and every grid-match activity a spatial reasoning challenge. The combination of computation-as-core-content, engineering design as creative process, geometric spatial reasoning through mechanical forms, and unmatched STEM engagement makes robots the most computationally foundational and future-ready theme across all 50 available.',

  researchCitation: 'Wing, J. M. (2006). "Computational Thinking." Communications of the ACM, 49(3), 33\u201335 \u2014 establishing that computational thinking, including decomposition, pattern recognition, abstraction, and algorithmic design, is a fundamental skill for everyone and not just computer scientists, because the systematic problem-solving processes that computing requires \u2014 breaking complex problems into manageable steps, recognizing repeating patterns, and designing sequential solutions \u2014 transfer directly to mathematical reasoning, scientific inquiry, and analytical thinking across all academic disciplines.',

  snippetDefinition: 'Robot and technology worksheets for kids are printable educational activities featuring mechanical characters, gears, circuits, and futuristic machines designed to build computational thinking, sequential reasoning, pattern recognition, and STEM vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, grid-match for spatial pattern reproduction, matching and shadow-matching for visual discrimination, image-addition and code-addition for arithmetic with algorithmic formatting, word search and image cryptogram for STEM vocabulary and code-breaking, sudoku for logical deduction, odd-one-out for analytical observation, picture-path for route planning, and pattern-worksheet for sequential reasoning.',

  snippetHowTo: [
    'Start with coloring pages of friendly robot characters to build fine motor control and geometric shape awareness through the angular, mechanical illustrations that distinguish robot designs from organic themes.',
    'Progress to matching-app and shadow-match worksheets where children pair identical robots and match robot silhouettes, developing visual discrimination through the distinctive geometric shapes of gears, antennae, and circuit components.',
    'Introduce spatial reasoning with grid-match worksheets where children reproduce robot designs by copying patterns from one grid to another, building the precise spatial reproduction skills that technical drawing and engineering require.',
    'Advance to computational thinking with code-addition worksheets where arithmetic is presented in sequential instruction formats that mirror programming logic, and pattern-worksheet activities featuring growing gear sequences.',
    'Incorporate code-breaking with image-cryptogram worksheets where children decode robot messages using symbol-to-letter mapping, and word-search STEM vocabulary activities featuring terms like circuit, sensor, and algorithm.',
    'Extend to logical reasoning with sudoku robot puzzles, odd-one-out mechanical observation challenges, and picture-path circuit-board maze navigation that develop deductive thinking and planning skills.',
    'Connect to real STEM experience through recycled-material robot building, unplugged coding activities with directional commands, and programmable toy exploration that verify worksheet concepts through hands-on engineering and computational creation.',
  ],

  limitations: 'Robot worksheets\\u2019 focus on computational thinking, sequential reasoning, and engineering design provides less direct scope for narrative storytelling, social-emotional learning, or ecological investigation than themes like fairy tales, emotions, or nature where plot development, feelings identification, and environmental observation drive the activities. The theme\\u2019s strength in algorithmic logic, STEM vocabulary, and geometric spatial reasoning means it offers less material for cultural exploration, creative writing, or community awareness than themes with stronger narrative, artistic, or social dimensions. While robots are universally fascinating to children, worksheets emphasizing technology and engineering should be balanced with themes that develop the interpersonal, creative, and emotional skills that holistic education requires.',

  themeComparisons: [
    {
      vsThemeId: 'construction',
      summary: 'Robots worksheets provide a theme studying technology through computational thinking, code-following, and engineering design with mechanical characters and futuristic scenarios as the learning context. Construction worksheets provide a theme studying building through physical construction processes, tools, materials, and structural engineering within real-world building site scenarios. Robots teaches engineering through computation and code; construction teaches engineering through physical building.',
    },
    {
      vsThemeId: 'space',
      summary: 'Robots worksheets provide a theme studying technology through computational reasoning, sequential logic, and engineering design with mechanical characters performing tasks on Earth. Space worksheets provide a theme studying exploration through astronomical observation, planetary science, and space travel within cosmic discovery scenarios. Robots teaches technology through mechanical design; space teaches science through cosmic exploration.',
    },
    {
      vsThemeId: 'pirates',
      summary: 'Robots worksheets provide a theme where code-breaking and sequential logic serve STEM-focused computational thinking goals through algorithmic instruction-following formats. Pirates worksheets provide a theme where code-breaking and navigation serve adventure-driven spatial reasoning goals through treasure-hunting narrative contexts. Robots teaches code-breaking for computational literacy; pirates teaches code-breaking for adventure navigation.',
    },
    {
      vsThemeId: 'numbers',
      summary: 'Robots worksheets provide a theme studying arithmetic within computational and engineering contexts where math problems are formatted as robot programming instructions and sequential code. Numbers worksheets provide a theme studying arithmetic directly through number properties, operations, and mathematical relationships without thematic narrative overlay. Robots teaches math through STEM contexts; numbers teaches math through mathematical structure.',
    },
  ],

  productLinks: [
    {
      appId: 'code-addition',
      anchorText: 'Robot coding math worksheets for kids',
      context: 'Sequential reasoning and computational thinking develop when children solve arithmetic problems formatted as robot programming instructions in our robot coding math worksheets for kids, following multi-step code sequences that present addition as algorithmic operations \u2014 building the instruction-following precision and sequential logic that connect code-based arithmetic to the computational thinking and programming readiness that STEM education requires.',
    },
    {
      appId: 'grid-match',
      anchorText: 'Robot grid match worksheets for kindergarten',
      context: 'Spatial reasoning and engineering precision develop when children reproduce robot designs by copying patterns from one grid to another in our robot grid match worksheets for kindergarten, analyzing the geometric arrangement of gears, antennae, and mechanical components \u2014 building the spatial reproduction accuracy and technical drawing skills that connect grid-based pattern copying to the engineering design and geometric reasoning that STEM careers require.',
    },
    {
      appId: 'image-cryptogram',
      anchorText: 'Robot code breaking worksheets printable',
      context: 'Decoding fluency and analytical reasoning develop when children crack symbol-to-letter ciphers to reveal robot messages in our robot code breaking worksheets printable, replacing technology symbols with alphabet letters using logical deduction \u2014 building the same decoding-encoding cognitive process that phonics instruction requires, connecting STEM puzzle-solving excitement to the letter-sound mapping and reading fluency that literacy standards demand.',
    },
    {
      appId: 'pattern-worksheet',
      anchorText: 'Robot pattern worksheets for preschool',
      context: 'Pattern recognition and algebraic thinking develop when children identify and extend growing gear sequences in our robot pattern worksheets for preschool, analyzing repeating and increasing patterns of gears, lights, and mechanical components to predict continuation \u2014 building the rule-identification and sequential reasoning that connect mechanical pattern analysis to the algebraic thinking and mathematical prediction that academic success requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and shape recognition in her three- and four-year-olds using a theme where the geometric shapes of robot illustrations provide distinctive matching targets for children building their first technology vocabulary.',
      solution: 'She introduces coloring pages of friendly robot characters alongside shadow-match worksheets where the geometric shapes of gears, buttons, and antennae provide distinctive matching targets for three-year-old visual discrimination development. Children color robot illustrations while naming each component and its shape, then match each robot to its shadow. Every worksheet session ends with a block-building activity where children construct simple robots from shapes to bridge visual recognition to three-dimensional spatial construction.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive geometric silhouettes of robot characters with their varied mechanical shapes. Fine motor control develops through coloring the angular outlines of gears, buttons, and antennae that require different hand movements than organic curved illustrations. The teacher reports that the block-building extension becomes the most anticipated part of every session, with three children who previously struggled with shape names beginning to identify circles, squares, and rectangles by pointing to robot components and naming their geometric shapes.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate computational thinking with spatial reasoning and literacy but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs code-addition sequential arithmetic worksheets with grid-match robot pattern reproduction activities and word-search STEM vocabulary featuring terms like gear, sensor, circuit, and robot, creating integrated sessions through a classroom robot lab unit where students solve addition problems in code format, reproduce robot designs on grids, and search for technology terms while building the sequential reasoning and spatial skills that math and science standards require.',
      outcome: 'Sequential arithmetic accuracy reaches 87 percent as students practice solving code-addition problems within engaging computational formats. Spatial reproduction skills strengthen as grid-match activities challenge students to copy robot designs with increasing precision. STEM vocabulary usage increases as word-search activities introduce and reinforce technology terms in context. The teacher reports that five students begin spontaneously describing everyday sequences using computational vocabulary, connecting worksheet coding concepts to real-world sequential reasoning.',
    },
    {
      situation: 'A first-grade teacher wants to connect decoding logic, analytical observation, and technical writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated STEM literacy unit combining image-cryptogram code-breaking worksheets with odd-one-out analytical observation puzzles and a robot design engineering project where students design a helper robot on graph paper, label each component with its function, and write a paragraph explaining how the robot would follow sequential instructions to complete a task, connecting decoding logic, analytical observation, and technical writing through an integrated STEM literacy unit.',
      outcome: 'Cryptogram decoding accuracy reaches 90 percent as students practice the symbol-to-letter mapping that mirrors computational encoding processes. Analytical observation sharpens as odd-one-out activities challenge students to identify subtle mechanical differences among similar robot designs. The robot design project produces the most technically detailed and sequentially organized student writing of any literacy unit, and the teacher reports that connecting code-breaking, analytical observation, and technical writing through the robot theme generates authentic engagement because students experience their designs as real engineering projects rather than classroom assignments.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Primary pedagogical focus', value: 'Computational thinking and STEM focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Sequential reasoning + engineering design + STEM vocabulary' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed robot illustrations with geometric components that provide rich visual STEM information. Use shadow-match robot silhouette activities with high-contrast mechanical shapes showing the distinctive outlines of gears, antennae, and circuit boards. Assign grid-match robot reproduction activities with clear grid lines that make spatial patterns visually explicit.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with simple two-step code-addition sequences before introducing multi-step algorithmic problems that require tracking more operations simultaneously. Reduce grid-match complexity to four-cell grids before introducing nine-cell or sixteen-cell reproduction challenges. Pair every computational worksheet with a physical unplugged coding activity so children can walk through sequential steps before analyzing them on paper.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with algorithm design projects where students write multi-step robot instruction sequences, identify where loops replace repeated steps, test their programs with a classmate acting as the robot, and write explanatory paragraphs about their debugging process. Assign cross-disciplinary engineering research reports comparing different types of real-world robots with evidence-based analytical writing. Extend to original robot blueprint projects where students design robots for specific purposes with labeled components and written functional specifications.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where gears, robots, circuits, and mechanical components are universally recognized technology symbols that transcend language barriers. Coloring, shadow-match, and grid-match activities communicate through visual and spatial patterns rather than text, and basic technology words like robot, gear, and code are among the most globally recognized English terms due to worldwide exposure to technology culture, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Computational thinking and engineering design assessment',
      criteria: 'Give students a simple code-addition sequence, a four-cell grid-match robot design, and a set of five questions. They solve the code sequence showing their step-by-step work, reproduce the robot design on a blank grid, name six robot components from illustrations, identify the odd-one-out in a set of four mechanical objects with explanation, and write two sentences describing how a robot follows instructions. Assess using a three-level rubric: emerging (solves the code sequence with assistance, reproduces at least half of the grid design, and names at least four robot components), proficient (solves the code sequence showing step-by-step work, reproduces the grid design accurately, names six components, identifies the odd-one-out with reasoning, and writes two complete sentences about robot instructions), advanced (solves the code sequence with written algorithmic reasoning, reproduces the grid design with engineering-level precision, names all components with functional descriptions, identifies the odd-one-out with detailed analytical explanation, and writes insightful sentences connecting sequential instruction-following to computational thinking and programming concepts).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one robot worksheet per week over a four-week unit. Compare early and late samples to document growth in computational thinking accuracy across code-addition and pattern activities, STEM vocabulary breadth in word-search and cryptogram worksheets, spatial reasoning precision in grid-match reproduction tasks, and fine motor control in coloring activities. Look specifically for progression from simple two-step code sequences to multi-step algorithmic reasoning, and from basic shape matching to precise grid reproduction with engineering-level spatial accuracy.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on robot coloring, code-addition, and grid-match worksheets, note whether they follow simple step sequences by pointing without verbal descriptions (Pre-K), use basic computational vocabulary like step, next, and pattern while solving code-addition problems and reproducing grid designs with verbal reasoning explanations (K\u20131st), or use sophisticated STEM vocabulary like algorithm, sequence, debug, and engineering design in complete sentences while analyzing multi-step code problems with computational reasoning and grid reproductions with spatial precision (2nd\u20133rd). Record whether children transfer robot computational thinking and spatial reasoning skills to real-world contexts like giving sequential instructions, identifying patterns in daily routines, using directional vocabulary in other subjects, and applying debugging logic to error-correction tasks.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Engineering Design Process and Technology Awareness \u2014 Component Function Analysis, Cause-and-Effect Through Mechanical Experimentation & STEM Career Awareness)',
      connection: 'Understanding that robots are designed with specific purposes and that each component serves a function develops the design-thinking that engineering standards require. Observing how different gear arrangements create different movements builds cause-and-effect reasoning through mechanical experimentation. Discussing how real-world robots help in medicine, manufacturing, and exploration connects worksheet activities to authentic STEM career awareness.',
      activity: 'After completing grid-match robot design reproduction and shadow-match robot silhouette worksheets, guide students through an engineering investigation where they examine three simple machines or mechanical devices, observe which parts move and how, discuss why engineers choose specific shapes and materials for specific functions, and record their observations in a simple design journal \u2014 connecting the spatial reasoning and component analysis from worksheet activities to the engineering design principle that every robot component serves a purpose and design decisions involve balancing form and function.',
    },
    {
      subject: 'Math (Computational Arithmetic and Spatial Geometry \u2014 Code-Addition Sequential Operations, Grid-Match Spatial Visualization, Pattern-Worksheet Rule Identification & STEM-Context Number Sense)',
      connection: 'Code-addition formats build the sequential operation thinking that algebraic reasoning requires. Grid-match robot reproduction develops the spatial visualization that geometry demands. Pattern-worksheet gear sequences practice the rule-identification that algebraic thinking requires. Counting robot components builds number sense through engaging STEM contexts that motivate sustained mathematical practice.',
      activity: 'After completing code-addition sequential arithmetic and pattern-worksheet gear sequence worksheets, set up a classroom computation station where students write a three-step robot instruction sequence using addition, extend a gear pattern to twelve elements, count the total mechanical components in a robot illustration, and write a mathematical rule describing their pattern \u2014 connecting worksheet sequential reasoning and pattern analysis to arithmetic through the computational context of robot programming that makes mathematical operations feel like engineering commands.',
    },
    {
      subject: 'Language Arts (STEM Vocabulary as Literacy Enrichment \u2014 Technology Terms for Academic Word Banks, Cryptogram Decoding for Phonics Transfer & Technical Writing for Composition Skills)',
      connection: 'Technology terms like algorithm, circuit, sensor, and mechanical build academic vocabulary that appears in science and informational texts across the curriculum. Cryptogram decoding practices the symbol-to-meaning mapping process that reading fluency requires. Technical writing about robot designs and functions develops precise, organized composition. Explanatory writing about sequential instructions practices the procedural language that informational writing standards demand.',
      activity: 'After completing word-search STEM vocabulary and image-cryptogram code-breaking worksheets, guide students through a technical writing project where they choose a robot from their coloring pages, write three sentences describing what each labeled part does using technical vocabulary from their worksheets, decode a cryptogram message about the robot using their cipher skills, and compose a paragraph explaining how the robot would follow instructions to complete a simple task \u2014 connecting vocabulary acquisition and decoding fluency to technical explanatory writing through the engaging context of robot design documentation that makes composition feel like engineering communication.',
    },
  ],`;

// ── School: 12 fields ──────────────────────────────────────────────────

const schoolFields = `
  // -- SEO Enrichment (Part 53) --

  uniqueAngle: 'School is the ONLY theme where the educational content IS the learning environment itself \u2014 where every worksheet about identifying school supplies, sequencing classroom routines, counting objects in classroom scenes, or solving word problems set in school contexts practices academic skills while simultaneously teaching children how to navigate, understand, and thrive within the place where all their other learning happens. No other theme delivers this meta-learning framework, because while numbers teaches math through abstract operations and emotions teaches feelings through self-examination, only school makes the act of being a student \u2014 understanding routines, managing materials, following multi-step instructions, and developing study skills \u2014 the central, unavoidable subject of every activity. This learning-about-learning framework is structurally different from all other themes because school worksheets teach skills children immediately apply in the same environment where they complete the worksheets \u2014 every routine they sequence, every supply they identify, and every classroom word they learn becomes immediately functional knowledge they use hundreds of times daily, creating an instant-application reinforcement loop no other theme can provide. School is also the ONLY theme where social-emotional readiness is naturally embedded in academic activities rather than taught as a separate domain \u2014 where worksheets about sharing supplies, following classroom rules, and navigating peer interactions build the social competence that research identifies as more predictive of school success than early academic knowledge. The school-readiness dimension adds a unique anxiety-reduction layer: school worksheets completed at home before the first day make unfamiliar environments familiar, transforming novelty-driven anxiety into recognition-based confidence. The combination of meta-learning as core content, instant-application reinforcement, embedded social-emotional development, and anxiety-reducing environmental familiarity makes school the most practically functional and holistically supportive theme across all 50 available.',

  researchCitation: 'Blair, C. & Razza, R. P. (2007). "Relating Effortful Control, Executive Function, and False Belief Understanding to Emerging Math and Literacy Ability in Kindergarten." Child Development, 78(2), 647\u2013663 \u2014 establishing that executive function skills including self-regulation, sustained attention, and the ability to follow multi-step instructions are stronger predictors of kindergarten academic achievement than pre-academic knowledge, because children who can manage their behavior, maintain focus during structured activities, and navigate classroom routines absorb academic instruction more effectively than peers who possess content knowledge but lack these foundational learning-to-learn competencies.',

  snippetDefinition: 'School and classroom worksheets for kids are printable educational activities featuring school supplies, classroom scenes, routines, and academic contexts designed to build school readiness, classroom vocabulary, learning-to-learn skills, and academic fluency for children ages 3 through 9. They include coloring pages for environmental familiarity, matching for supply-function pairing, find-and-count for classroom visual scanning, grid-match for spatial reproduction, image-addition and math-worksheet and subtraction for school-context arithmetic, alphabet-train and writing-app for school vocabulary literacy, word search for classroom terminology, sudoku for logical reasoning, odd-one-out for analytical classification, and pattern-worksheet for routine sequencing.',

  snippetHowTo: [
    'Start with coloring pages of classrooms, school buses, and playground scenes to build environmental familiarity and reduce school anxiety through detailed, welcoming illustrations that help children visualize the school setting.',
    'Progress to matching-app worksheets where children pair school supplies with their functions and grid-match activities where they reproduce classroom object patterns, developing visual discrimination and spatial reasoning through the distinctive shapes of pencils, scissors, rulers, and backpacks.',
    'Introduce classroom observation with find-and-count worksheets where children locate and tally specific objects within detailed classroom scenes, building the visual scanning and sustained attention that classroom participation requires.',
    'Advance to arithmetic with image-addition, math-worksheet, and subtraction activities using school-supply counters that embed math within the classroom inventory scenarios children experience daily.',
    'Incorporate literacy with alphabet-train school vocabulary activities, writing-app handwriting practice with school words, and word-search classroom terminology that builds the academic language children need across all subjects.',
    'Extend to analytical reasoning with sudoku school-supply puzzles, odd-one-out classroom classification challenges, and pattern-worksheet routine sequencing activities that develop logical thinking and predictability awareness.',
    'Connect to real school experience through classroom supply scavenger hunts, daily routine sequencing with real schedule steps, and school role-play activities that verify worksheet concepts through hands-on environmental exploration and social practice.',
  ],

  limitations: 'School worksheets\\u2019 focus on classroom readiness, routine sequencing, and learning-environment vocabulary provides less direct scope for creative arts, scientific investigation, or adventure-driven engagement than themes like music, nature, or pirates where artistic expression, ecological observation, and narrative excitement drive the activities. The theme\\u2019s strength in meta-learning skills, environmental familiarity, and social-emotional readiness means it offers less material for domain-specific content exploration, creative design, or physical world investigation than themes with stronger subject-matter, artistic, or scientific dimensions. While schools are universal institutions, worksheets featuring specific classroom layouts, supply types, or routine structures may reflect certain educational traditions, and teachers should discuss how school experiences vary across communities and cultures.',

  themeComparisons: [
    {
      vsThemeId: 'emotions',
      summary: 'School worksheets provide a theme studying the school environment through classroom routines, supply identification, and learning-to-learn skills within the academic setting where children spend their days. Emotions worksheets provide a theme studying internal feeling states through emotion identification, labeling, and regulation strategies within personal and social contexts. School teaches about the learning environment; emotions teaches about internal experience.',
    },
    {
      vsThemeId: 'numbers',
      summary: 'School worksheets provide a theme studying arithmetic within classroom contexts where math problems involve counting supplies, students, and school objects to reinforce both math skills and environmental familiarity simultaneously. Numbers worksheets provide a theme studying arithmetic directly through number properties, operations, and mathematical relationships without environmental thematic context. School teaches math through classroom scenarios; numbers teaches math through mathematical structure.',
    },
    {
      vsThemeId: 'alphabet',
      summary: 'School worksheets provide a theme studying literacy within the comprehensive school environment where letter and word learning connects to classroom vocabulary, supply labels, and routine language. Alphabet worksheets provide a theme studying literacy through focused letter recognition, phonics, and alphabetic principle activities. School teaches literacy through classroom context; alphabet teaches literacy through letter-focused instruction.',
    },
    {
      vsThemeId: 'household',
      summary: 'School worksheets provide a theme studying the academic environment where children learn through classroom routines, school supplies, and structured learning activities. Household worksheets provide a theme studying the home environment where children live through room organization, domestic routines, and household objects. School teaches about where children learn; household teaches about where children live.',
    },
  ],

  productLinks: [
    {
      appId: 'find-and-count',
      anchorText: 'School find and count worksheets for kindergarten',
      context: 'Visual scanning and number sense develop when children locate and count specific objects within detailed classroom illustrations in our school find and count worksheets for kindergarten, tallying supplies, books, and school items across busy scenes \u2014 building the sustained attention and systematic observation that connect visual counting practice to the mathematical fluency and environmental awareness that classroom participation requires.',
    },
    {
      appId: 'writing-app',
      anchorText: 'School handwriting worksheets for kids',
      context: 'Handwriting fluency and school vocabulary develop when children practice letter formation with classroom words in our school handwriting worksheets for kids, tracing and writing terms like teacher, pencil, and classroom \u2014 building the fine motor precision and personally meaningful vocabulary that connect handwriting practice to the academic communication and environmental literacy that school readiness requires.',
    },
    {
      appId: 'math-worksheet',
      anchorText: 'School math worksheets printable',
      context: 'Arithmetic fluency and contextual reasoning develop when children solve addition and subtraction problems set in classroom scenarios in our school math worksheets printable, calculating with school supplies, student groups, and classroom inventory \u2014 building the operational fluency and problem-solving skills that connect school-context arithmetic to the mathematical reasoning and real-world application that academic standards require.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'School odd one out worksheets for preschool',
      context: 'Analytical observation and classification reasoning develop when children identify which school item does not belong in a set in our school odd one out worksheets for preschool, examining groups of classroom objects and determining the distinguishing attribute \u2014 building the comparison and categorization skills that connect classification analysis to the critical thinking and scientific reasoning that academic inquiry requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop environmental familiarity and supply recognition in her three- and four-year-olds entering school for the first time, where classroom imagery can reduce anxiety by making the school setting visually familiar before children walk through the door.',
      solution: 'She introduces coloring pages of classrooms and school buses alongside matching-app worksheets where children pair school supplies with their functions, building practical vocabulary needed for smooth transitions. Children color classroom scenes while naming objects and their purposes, then complete matching activities pairing supplies with uses. Every worksheet session ends with a real supply identification activity where children find and name actual classroom objects that match their worksheet illustrations.',
      outcome: 'Environmental anxiety decreases notably as children develop visual familiarity with classroom settings through coloring activities completed at home and in the first week of school. Supply recognition and functional vocabulary improve as matching activities connect object names to practical uses. The teacher reports that children who completed school-themed worksheets before the first day demonstrate smoother transitions, with three children independently locating and naming supplies during the first week rather than needing adult guidance for every material request.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate visual scanning with arithmetic and literacy but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs find-and-count classroom scene worksheets with image-addition school-supply arithmetic and word-search classroom vocabulary featuring terms like teacher, pencil, library, and recess, creating integrated sessions through a beginning-of-year orientation unit where students count objects in detailed classroom illustrations, solve addition problems using supply counters, and search for school terms while building the environmental awareness, number sense, and academic vocabulary that successful classroom participation requires.',
      outcome: 'Visual scanning accuracy reaches 89 percent as students practice finding and counting objects within detailed classroom illustrations. Addition fluency improves as school-supply counters provide personally meaningful contexts for arithmetic practice. Classroom vocabulary usage increases as word-search activities introduce and reinforce terms students hear and use daily. The teacher reports that five students begin using academic vocabulary spontaneously during classroom discussions, describing their school environment with precision and confidence gained from worksheet vocabulary practice.',
    },
    {
      situation: 'A first-grade teacher wants to connect arithmetic fluency, data analysis, and persuasive writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated school-improvement literacy unit combining math-worksheet multi-step school word problems with writing-app school vocabulary composition and a classroom improvement project where students identify something they would change about their learning environment, conduct a class survey, graph the results, and write a persuasive paragraph with supporting evidence, connecting arithmetic fluency, data analysis, and persuasive writing through an authentic school-improvement context.',
      outcome: 'Multi-step word problem accuracy reaches 88 percent as students practice solving arithmetic within meaningful classroom scenarios. Survey design and graphing skills develop as students collect, organize, and represent data about peer preferences. The classroom improvement project produces the most evidence-based and persuasive student writing of any literacy unit, and the teacher reports that connecting math, data analysis, and persuasive writing through the school-improvement theme generates authentic engagement because students experience their proposals as real advocacy for changes they genuinely want in their learning environment.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '13 apps' },
    { label: 'Primary pedagogical focus', value: 'School readiness and meta-learning focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Classroom vocabulary + routine sequencing + learning-to-learn skills' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed classroom scenes with multiple school objects and spatial relationships that provide rich visual environmental information. Use find-and-count classroom illustration activities with busy scenes rewarding careful visual scanning. Assign grid-match school-supply pattern reproduction with clear grid lines that make spatial relationships visually explicit.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with three to four highly recognizable school supplies like pencil, book, and backpack before introducing less familiar items like protractor, encyclopedia, and compasses. Reduce find-and-count scenes to five target objects before introducing complex scenes with ten or more targets. Pair every classroom worksheet with a real-object identification walk so children can touch and name actual supplies before working with paper representations.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with school improvement research projects where students design and conduct surveys, analyze results using multiplication to project school-wide data, and write multi-paragraph persuasive proposals with evidence-based reasoning. Assign cross-cultural education comparison reports analyzing similarities and differences between school systems in different countries with evidence from multiple sources. Extend to schedule optimization projects where students calculate time allocations across subjects using fractions and elapsed time and propose evidence-based improvements to the daily routine.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where pencils, books, backpacks, desks, and classroom scenes are universally recognized school environments found in every educational system worldwide. Coloring, matching, and find-and-count activities communicate through visual environmental imagery rather than text, and basic school words like book, desk, and teacher are among the first academic nouns taught in any language program because children need these terms for daily school communication, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'School readiness and classroom awareness assessment',
      criteria: 'Give students a detailed classroom illustration and a set of five questions. They name eight school supplies visible in the scene, describe the function of three supplies, solve a two-step classroom word problem, sequence four daily routine steps in correct order, and write two sentences explaining why a specific classroom rule is important. Assess using a three-level rubric: emerging (names at least six school supplies, describes the function of at least one, and sequences at least two routine steps correctly), proficient (names eight supplies, describes three functions, solves the word problem correctly, sequences all four routine steps, and writes two complete sentences about classroom rules with reasoning), advanced (names all supplies with precise functional descriptions, solves the word problem with written mathematical reasoning, sequences routine steps with temporal vocabulary, and writes insightful sentences connecting classroom rules to the learning environment principles that effective education requires).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one school worksheet per week over a four-week unit. Compare early and late samples to document growth in classroom vocabulary breadth across word-search and writing activities, environmental familiarity in find-and-count classroom scenes, arithmetic accuracy in school-context math problems, and self-regulation in multi-step worksheet completion. Look specifically for progression from simple supply identification to functional knowledge of how supplies are used, and from single-step counting to multi-step word problems within classroom scenarios.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on school coloring, find-and-count, and matching worksheets, note whether they identify school supplies by pointing without verbal labels (Pre-K), name supplies and describe classroom routines using basic school vocabulary while completing worksheets with growing independence and verbal reasoning explanations (K\u20131st), or use sophisticated academic vocabulary like curriculum, schedule, and assignment in complete sentences while analyzing classroom scenarios with multi-step reasoning and metacognitive awareness about their own learning processes (2nd\u20133rd). Record whether children transfer school vocabulary and routine knowledge to real-world contexts like independently locating materials, following multi-step classroom directions, using school vocabulary in other subjects, and demonstrating self-regulation during structured learning activities.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Observation Skills and Classification Through Environmental Investigation \u2014 Supply Material Classification, Attribute-Based Sorting & Cause-and-Effect Through Environmental Design Analysis)',
      connection: 'Identifying and classifying school supplies by material, function, and physical properties develops the attribute-based classification reasoning that scientific taxonomy requires. Observing classroom organization and analyzing why specific supplies are stored in specific locations builds the cause-and-effect reasoning and systematic observation that scientific inquiry demands. Comparing classroom environments across cultures introduces the concept that environments are designed for purposes, connecting to engineering and environmental science principles.',
      activity: 'After completing find-and-count classroom scene and matching-app supply-function worksheets, guide students through a classroom science investigation where they sort ten classroom supplies by material type including wood, plastic, metal, and paper, discuss why each supply is made from its specific material, observe which supplies float or sink in water, and record their observations in a simple classification chart \u2014 connecting the identification and classification skills from worksheet activities to the physical science principle that materials are chosen for specific properties and that scientific observation reveals patterns in everyday objects.',
    },
    {
      subject: 'Math (Arithmetic Through Authentic Classroom Contexts \u2014 Supply Counting for Number Sense, School-Context Word Problems & Schedule Analysis for Measurement and Elapsed Time)',
      connection: 'Counting supplies builds number sense through personally meaningful inventory scenarios children verify daily. Addition and subtraction word problems set in classroom contexts ground operations in the most familiar mathematical environment available. Multiplication emerges naturally through equal-group classroom scenarios like students per table and supplies per student. Schedule analysis with elapsed time calculations connects measurement to the daily temporal structure children experience every school day.',
      activity: 'After completing image-addition school-supply counting and math-worksheet classroom word problem worksheets, set up a classroom inventory station where students count supplies in three different containers, use addition to find the total, compare quantities to determine which container has the most and fewest, and write a number sentence showing their calculation \u2014 connecting worksheet arithmetic fluency to real-world inventory through the authentic classroom context where mathematical operations have immediate practical purpose and results can be verified by recounting.',
    },
    {
      subject: 'Language Arts (Academic Vocabulary as Literacy Foundation \u2014 Cross-Curricular School Terminology, Handwriting With Meaningful Words & Persuasive and Procedural Writing Through School Topics)',
      connection: 'School vocabulary including curriculum, assignment, schedule, and laboratory builds the cross-curricular academic language that informational text comprehension requires. Handwriting practice with school words develops letter formation through personally meaningful terms. Persuasive writing about school improvements develops evidence-based argumentation. Procedural writing about classroom routines develops the sequential composition skills that informational writing standards demand across all subjects.',
      activity: 'After completing word-search classroom vocabulary and writing-app school handwriting worksheets, guide students through an academic vocabulary writing project where they choose five school vocabulary words from their word search, write one sentence using each word correctly in a school context, draw an illustration showing the word in use, and compose a paragraph describing their favorite part of the school day using at least three academic vocabulary words \u2014 connecting vocabulary acquisition and handwriting fluency to descriptive composition through the personally meaningful context of daily school experience that makes writing feel like sharing rather than assignment.',
    },
  ],`;

// ── Injection Logic ─────────────────────────────────────────────────────────

function injectFields(filePath, newFields) {
  const src = fs.readFileSync(filePath, 'utf8');

  // Find the closing `};` that ends the content object (before registerThemeContent)
  const marker = /\n\};\s*\n\nregisterThemeContent/;
  const match = src.match(marker);
  if (!match) {
    throw new Error(`Could not find closing marker in ${filePath}`);
  }

  const insertPos = match.index;
  const updated = src.slice(0, insertPos) + '\n' + newFields + '\n};\n\nregisterThemeContent' + src.slice(match.index + match[0].length);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`  Updated ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

// ── Main ────────────────────────────────────────────────────────────────────

const base = path.join(__dirname, '..', 'frontend', 'content', 'themes');

console.log('Part 53: Enriching robots & school theme hub pages...\n');

console.log('1. Injecting 12 fields into robots/en.ts...');
injectFields(path.join(base, 'robots', 'en.ts'), robotsFields);

console.log('2. Injecting 12 fields into school/en.ts...');
injectFields(path.join(base, 'school', 'en.ts'), schoolFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
