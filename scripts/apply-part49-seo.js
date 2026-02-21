/**
 * SEO Part 49: Enrich construction & emotions EN theme hub pages
 * - Construction: adds 12 missing enrichment fields
 * - Emotions: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Construction: 12 fields ─────────────────────────────────────────────────

const constructionFields = `
  // -- SEO Enrichment (Part 49) --

  uniqueAngle: 'Construction is the ONLY theme where the educational content IS the engineering process itself \u2014 where every worksheet about counting bricks, measuring beams, following blueprints, or sequencing building steps practices the exact planning, measurement, spatial reasoning, and procedural thinking skills that real builders use, creating a direct pipeline from classroom learning to STEM career readiness that no other theme provides. No other theme delivers this plan-then-build pedagogical framework, because while robots teaches about technology and shapes teaches geometry in isolation, only construction embeds mathematical operations within the authentic engineering sequence of designing, measuring, calculating materials, and assembling structures \u2014 making every worksheet feel like genuine problem-solving rather than abstract exercise. This engineering-process framework is structurally different from other STEM-adjacent themes because construction worksheets are inherently sequential and consequential \u2014 you must calculate materials before building, measure before cutting, and plan before acting \u2014 teaching the executive function skills of planning, sequencing, and error-prevention that predict academic success across every subject, not just mathematics. Construction is also the ONLY theme that makes measurement feel immediately purposeful rather than abstract \u2014 where every length comparison, area calculation, and quantity estimation answers a real building question that children intuitively understand matters, because getting the measurement wrong means the wall does not fit, the blueprint fails, or the materials run out. The combination of authentic engineering process, sequential executive function development, and measurement-with-real-consequences makes construction the most STEM-aligned and practically purposeful theme across all 50 available.',

  researchCitation: 'Uttal, D. H. et al. (2013). "The Malleability of Spatial Skills: A Meta-Analysis of Training Studies." Psychological Bulletin, 139(2), 352\u2013402 \u2014 establishing that construction-based spatial activities including building from blueprints, manipulating three-dimensional representations, and translating between two-dimensional plans and three-dimensional structures produce significant and durable improvements in spatial reasoning skills, and that these spatial gains transfer broadly to mathematics, science, and engineering performance because spatial thinking is a foundational cognitive capacity that construction activities develop more naturally than abstract training tasks.',

  snippetDefinition: 'Construction worksheets for kids are printable educational activities featuring cranes, bulldozers, hard hats, bricks, blueprints, and building sites designed to build counting fluency, measurement skills, spatial reasoning, and engineering vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, addition and multi-step math with brick and beam counters, grid-match and shadow-match for spatial discrimination, code addition puzzles within blueprint grids, word search for construction vocabulary, sudoku and pattern worksheets for logical reasoning, and picture-path navigation through construction site mazes.',

  snippetHowTo: [
    'Start with coloring pages of cranes, bulldozers, and building sites to build fine motor control and construction vocabulary through detailed, industrious illustrations that mirror real engineering environments.',
    'Progress to matching-app and shadow-match worksheets where children pair tools to functions and match construction equipment silhouettes, developing visual discrimination through the geometric precision of building machinery.',
    'Introduce spatial reasoning with grid-match worksheets where children reproduce building block patterns on blank grids, developing the blueprint-reading skills that connect two-dimensional plans to three-dimensional thinking.',
    'Advance to arithmetic with image-addition brick counting, math-worksheet operations, and code-addition blueprint grid puzzles that embed calculations within authentic engineering scenarios.',
    'Incorporate vocabulary with word-search puzzles featuring construction terms like foundation, scaffold, blueprint, and reinforcement.',
    'Extend to logical reasoning with sudoku construction puzzles, pattern-worksheet brick sequences, and picture-path site navigation activities that develop deductive and sequential thinking.',
    'Connect to real construction through block-building projects, classroom blueprint challenges, and neighborhood construction site observation walks that verify worksheet concepts through hands-on engineering experience.',
  ],

  limitations: 'Construction worksheets\\u2019 focus on engineering processes, measurement, and spatial reasoning provides less direct scope for narrative storytelling, emotional exploration, or biological science than themes like fairy tales, emotions, or nature where plot development, social-emotional learning, and ecological observation drive the activities. The theme\\u2019s strength in STEM skills, sequential planning, and geometric reasoning means it offers less material for creative writing, cultural exploration, or musical expression than themes with richer artistic or interpersonal dimensions. While construction imagery appeals broadly, worksheets featuring specific construction methods may reflect Western building traditions, and teachers should discuss diverse architectural traditions from around the world.',

  themeComparisons: [
    {
      vsThemeId: 'robots',
      summary: 'Construction worksheets provide a physical-building theme studying real-world engineering through brick-laying, crane-operating, and blueprint-following in tangible construction contexts. Robots worksheets provide a technology theme studying programmable machines, coding logic, and digital systems through futuristic automation contexts. Construction teaches building with physical materials; robots teaches building with digital logic.',
    },
    {
      vsThemeId: 'transportation',
      summary: 'Construction worksheets provide a theme studying how structures are built through engineering processes, material calculations, and spatial design within stationary building projects. Transportation worksheets provide a theme studying how vehicles move through counting, sorting, and comparing modes of transport within mobility and journey contexts. Construction teaches things that stay in place; transportation teaches things that move.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Construction worksheets provide a theme where geometry emerges naturally from building contexts \u2014 rectangular bricks, triangular roof trusses, and cylindrical pillars serving structural purposes within engineering design projects. Shapes worksheets provide a focused geometry theme studying shape identification, properties, and spatial relationships as the primary mathematical learning objective. Construction teaches shapes through building function; shapes teaches shapes as abstract geometry.',
    },
    {
      vsThemeId: 'jobs',
      summary: 'Construction worksheets provide a theme deeply exploring ONE specific profession through its tools, processes, materials, and engineering challenges within detailed construction site activities. Jobs worksheets provide a broad community-helpers theme surveying MANY professions through identification, role-matching, and community-contribution awareness. Construction teaches one job deeply; jobs teaches many jobs broadly.',
    },
  ],

  productLinks: [
    {
      appId: 'grid-match',
      anchorText: 'Construction blueprint worksheets for kids',
      context: 'Spatial reasoning and blueprint-reading skills develop when children reproduce building block patterns on blank grids in our construction blueprint worksheets for kids, analyzing two-dimensional construction plans and translating them into accurate grid reproductions \u2014 building the spatial discrimination and planning skills that connect classroom grid activities to the authentic engineering skill of reading and following blueprints.',
    },
    {
      appId: 'code-addition',
      anchorText: 'Construction math code worksheets printable',
      context: 'Computational fluency and puzzle-solving skills strengthen when children decode addition problems hidden within blueprint-style grids in our construction math code worksheets printable, solving arithmetic operations embedded in engineering contexts where every correct calculation reveals part of a building plan \u2014 building the mathematical precision and systematic thinking that connect code-breaking excitement to authentic construction planning.',
    },
    {
      appId: 'picture-path',
      anchorText: 'Construction site maze worksheets for kindergarten',
      context: 'Sequential thinking and spatial navigation develop when children guide construction workers through building site mazes in our construction site maze worksheets for kindergarten, planning routes past cranes, around scaffolding, and through material yards \u2014 building the directional reasoning and planning skills that connect maze-solving to the real engineering challenge of navigating complex construction environments.',
    },
    {
      appId: 'math-puzzle',
      anchorText: 'Construction math puzzle worksheets for preschool',
      context: 'Number recognition and arithmetic readiness develop when children solve construction-themed math puzzles in our construction math puzzle worksheets for preschool, completing number operations that assemble building images piece by piece as each answer is found \u2014 building the mathematical motivation and problem-solving persistence that connect puzzle excitement to foundational arithmetic fluency.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and shape recognition in her three- and four-year-olds using a theme with bold, geometric shapes that sustain attention through the energy and excitement of building machines and construction sites.',
      solution: 'She introduces coloring pages of cranes, bulldozers, and building sites alongside shadow-match worksheets where the geometric precision of construction vehicle silhouettes provides distinct matching targets ideal for three-year-old spatial discrimination development. Children color vibrant construction illustrations while naming tools and vehicles, then match each construction element to its shadow. Every worksheet session ends with hands-on block-building time that bridges two-dimensional paper activities to three-dimensional construction.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of cranes, bulldozers, and construction tools. Fine motor control develops through coloring the geometric variety of triangular crane booms, rectangular bricks, and circular wheels. The teacher reports that construction is the most sustained-engagement theme for her most active students, with average time-on-task increasing from seven minutes with standard worksheets to fourteen minutes with construction materials because the building energy matches their natural drive to create.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate spatial reasoning with categorical thinking and arithmetic but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs grid-match blueprint reproduction worksheets with matching-app tool-to-function pairing activities and image-addition brick counting exercises, creating integrated sessions through a classroom construction zone where students plan structures on graph paper, calculate materials needed, and build with blocks while wearing paper hard hats. Students rotate through stations completing different worksheet types at each stop.',
      outcome: 'Blueprint reproduction accuracy reaches 89 percent as children develop the spatial reasoning to translate visual plans into grid patterns. Classification skills strengthen as students sort tools by function and materials by type within the construction context. Brick counting addition accuracy improves as the tangible building context makes arithmetic feel purposeful. The classroom construction zone becomes the most requested activity center, and the teacher reports that three students who previously disengaged from abstract math become enthusiastic participants when calculations involve building materials.',
    },
    {
      situation: 'A first-grade teacher wants to connect computational fluency, domain-specific vocabulary, and sequential writing but finds that teaching these literacy and math skills through disconnected activities produces surface-level learning.',
      solution: 'She launches an integrated STEM-literacy engineering unit combining code-addition blueprint grid puzzles with word-search construction vocabulary featuring terms like foundation, scaffold, blueprint, and reinforcement. She extends the unit with a procedural writing assignment about how to build a birdhouse step by step, requiring students to use at least four construction vocabulary words and number their steps sequentially.',
      outcome: 'Code-addition accuracy reaches 87 percent as the blueprint puzzle context motivates sustained computational practice. Construction vocabulary usage increases substantially as students encounter the terms in word searches and then apply them in their procedural writing. The how-to-build-a-birdhouse writing assignment produces the most detailed and sequentially organized student work of any writing unit, and the teacher reports that connecting math, vocabulary, and procedural writing through the construction theme generates authentic STEM engagement that isolated skill instruction cannot replicate.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed construction site scenes with cranes, scaffolding, and multi-story structures that provide rich visual engineering information. Use grid-match blueprint reproduction activities with clear grid lines and color-coded blocks that make spatial patterns visually explicit. Assign shadow-match construction equipment silhouettes with high-contrast geometric shapes that provide clear visual matching targets for equipment recognition.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with simple two-by-two grid patterns before progressing to larger blueprint grids with more complex building designs. Reduce brick counting to quantities under ten before introducing multi-step material calculations with larger numbers. Pair every worksheet with physical building blocks so children can construct what they see on paper and verify answers through tangible manipulation, bridging abstract spatial reasoning to concrete three-dimensional building experience.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-story building design projects using multiplication for material quantities across multiple floors and rooms. Assign area and perimeter calculation challenges for room layouts on graph paper requiring precise measurement and multi-step operations. Extend to structural engineering research reports comparing building techniques from different cultures and historical periods with evidence from multiple sources and organized multi-paragraph writing.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where cranes, bulldozers, hard hats, and bricks are universally recognizable construction imagery that transcends language barriers. Grid-match and shadow-match activities communicate through spatial patterns rather than text, allowing full participation regardless of English proficiency. Construction vocabulary uses concrete, demonstrable nouns that can be taught through real tools and toy models, making physical demonstration an effective vocabulary bridge for students building English skills.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Construction planning and measurement assessment',
      criteria: 'Give students a simple blueprint showing a structure with labeled dimensions and a materials list. They calculate how many bricks are needed for each wall using the dimensions, identify which tool from a set of four is needed for each building step, and write two sentences explaining why builders follow blueprints before starting construction. Assess using a three-level rubric: emerging (calculates at least two wall totals correctly and identifies two tools), proficient (calculates all wall totals correctly, identifies all four tools with brief reasoning, and writes two complete sentences about blueprint importance), advanced (calculates all totals correctly with clear work shown, identifies tools with detailed explanations of their functions, and writes descriptive sentences connecting blueprints to planning, measurement accuracy, and material efficiency).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one construction worksheet per week over a four-week unit. Compare early and late samples to document growth in spatial reasoning accuracy within grid-match and blueprint activities, arithmetic fluency in material calculation problems, construction vocabulary breadth in word puzzles, and sequential thinking quality in pattern and path-finding tasks. Look specifically for progression from simple grid reproduction to complex multi-element blueprint interpretation, and from basic brick counting to multi-step material calculation.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on construction coloring, grid-match, and vocabulary worksheets, note whether they identify construction items by pointing without verbal labels (Pre-K), name tools and materials while reproducing grid patterns and explaining their counting strategies verbally (K\u20131st), or use sophisticated engineering vocabulary like foundation, structural, and blueprint in complete sentences while analyzing construction designs with multi-step spatial and mathematical reasoning (2nd\u20133rd). Record whether children transfer construction planning and measurement skills to real-world contexts like block building, classroom projects, and observation of neighborhood construction.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Engineering Design and Materials Science \u2014 Structural Purposes of Different Materials, Triangle Strength in Trusses & Simple Machines in Construction Equipment)',
      connection: 'Every construction worksheet connects to science because building IS applied engineering. Understanding that different materials serve different structural purposes, that triangles are the strongest shape for trusses and bridges, and that testing and iteration improve designs develops engineering design thinking. Simple machines like levers, pulleys, and inclined planes appear throughout construction equipment, providing entry points for physics concepts in terms children can observe and understand.',
      activity: 'After completing grid-match blueprint and shadow-match construction equipment worksheets, conduct a bridge-building challenge where students construct bridges from paper, straws, and tape, test them with increasing weight, and record which designs hold the most \u2014 connecting the spatial planning from worksheet activities to the engineering design process of building, testing, and improving structures.',
    },
    {
      subject: 'Math (Measurement as Engineering Necessity \u2014 Brick Counting for Addition Fluency, Tool Length Comparison for Measurement Vocabulary & Area and Perimeter for Building Planning)',
      connection: 'Construction worksheets develop mathematical skills uniquely because every calculation serves an authentic building purpose. Counting bricks builds addition fluency through repeated practice with tangible construction objects. Comparing tool lengths develops measurement vocabulary through the practical context of selecting the right-sized instrument. Calculating area and perimeter solves real building problems that children can visualize. Estimating material quantities introduces multiplication readiness through repeated addition in authentic planning contexts.',
      activity: 'After completing image-addition brick counting and code-addition blueprint grid worksheets, set up a classroom building supply store where students calculate total materials needed by counting bricks per wall and adding across multiple walls, compare tool lengths using rulers, and estimate how many tiles cover a paper floor plan by counting grid squares \u2014 connecting worksheet arithmetic skills to authentic measurement and calculation through the motivating context of construction planning.',
    },
    {
      subject: 'Language Arts (Procedural and Technical Vocabulary Development \u2014 Foundation, Scaffold, Blueprint, Reinforcement & Step-by-Step Building Instructions)',
      connection: 'Construction worksheets build language arts skills uniquely because building vocabulary is inherently technical and precise. Words like foundation, scaffold, blueprint, reinforcement, and structural carry specific engineering meanings that stretch vocabulary beyond everyday language. Procedural writing through step-by-step building instructions develops sequential composition skills with authentic purpose. Informational reading about how buildings are constructed builds comprehension of technical exposition. Descriptive writing about construction sites develops precise spatial and engineering terminology.',
      activity: 'After completing word-search construction vocabulary and pattern-worksheet brick sequence activities, guide students through writing step-by-step instructions for building a simple structure using at least five construction vocabulary words, numbered sequential steps with transitional words like first, next, and finally, and a concluding sentence explaining why following the correct order matters \u2014 connecting vocabulary acquisition to authentic procedural writing through the engineering context of construction planning.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Primary pedagogical focus', value: 'STEM-focused engineering learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Measurement + spatial reasoning + blueprint-based planning vocabulary' },
  ],`;

// ── Emotions: 12 fields ──────────────────────────────────────────────────

const emotionsFields = `
  // -- SEO Enrichment (Part 49) --

  uniqueAngle: 'Emotions is the ONLY theme where the educational content IS the learner\\u2019s own inner experience \u2014 where every worksheet about identifying feelings, sorting emotional expressions, or matching scenarios to reactions teaches children to understand the invisible psychological landscape they navigate every moment of every day, creating a uniquely personal and immediately applicable learning context that no other theme can replicate. No other theme provides this self-knowledge-as-curriculum framework, because while body teaches about the physical self and school teaches about the learning environment, only emotions makes the child\\u2019s own feelings the subject of academic study, meaning every worksheet answer is simultaneously a moment of self-discovery and self-awareness that builds the emotional intelligence research consistently links to academic success, healthy relationships, and lifelong wellbeing. This dual-purpose architecture is structurally different from all other themes because emotions worksheets simultaneously build two skill sets at once \u2014 academic skills like vocabulary, classification, and reading comprehension AND social-emotional competencies like self-awareness, empathy, and self-regulation \u2014 without either dimension being supplementary or secondary. Emotions is also the ONLY theme where vocabulary acquisition has immediate behavioral impact \u2014 where a child who learns the word frustrated instead of just mad can communicate their needs more precisely to teachers and parents, a child who learns overwhelmed can request help before melting down, and a child who learns grateful can articulate positive feelings that strengthen relationships. The therapeutic dimension adds a unique wellbeing layer: emotions worksheets provide a safe, structured medium for processing feelings that children might not otherwise articulate, making them tools for emotional health as well as academic development. The combination of self-knowledge as curriculum, dual academic-SEL skill building, and therapeutic value makes emotions the most personally transformative and developmentally essential theme across all 50 available.',

  researchCitation: 'Durlak, J. A. et al. (2011). "The Impact of Enhancing Students\\u2019 Social and Emotional Learning: A Meta-Analysis of School-Based Universal Interventions." Child Development, 82(1), 405\u2013432 \u2014 establishing that structured social-emotional learning activities produce an average 11-percentile-point gain in academic achievement compared to control groups, because children who can identify, understand, and regulate their emotions are better able to focus attention, sustain effort, collaborate with peers, and persist through academic challenges, making emotional competence a foundational prerequisite for cognitive performance.',

  snippetDefinition: 'Emotions worksheets for kids are printable educational activities featuring facial expressions, feeling scenarios, empathy exercises, and self-regulation strategies designed to build emotional vocabulary, social awareness, classification skills, and self-management for children ages 3 through 9. They include coloring and drawing activities for expressive fine motor development, addition with emotion-themed counters, picture sorting for feelings classification, matching and drawing-lines for scenario-emotion pairing, word search and word guess for feelings vocabulary, writing activities for reflective composition, and odd-one-out puzzles for analytical reasoning about emotional patterns.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of expressive faces and emotion scenes to build fine motor control and feelings vocabulary through personally meaningful illustrations children can connect to their own daily emotional experiences.',
    'Progress to matching-app and drawing-lines worksheets where children pair facial expressions to scenarios and connect feelings to causes, developing perspective-taking through structured emotion-situation reasoning.',
    'Introduce classification with picture-sort worksheets where children sort emotions into categories like comfortable and uncomfortable or calm and intense, building the categorical thinking that underpins both scientific taxonomy and emotional self-awareness.',
    'Advance to vocabulary with word-search and word-guess puzzles featuring feelings terms like frustrated, grateful, overwhelmed, and confident.',
    'Incorporate reflective composition with writing-app activities where children compose sentences about their own emotional experiences, developing both literacy fluency and self-awareness.',
    'Extend to analytical reasoning with odd-one-out emotion puzzles that develop deductive thinking through identifying which feeling does not belong in a group.',
    'Connect to real emotions through classroom feelings check-ins, empathy circle discussions, and personal feelings journals that verify worksheet concepts through authentic daily emotional experience.',
  ],

  limitations: 'Emotions worksheets\\u2019 focus on social-emotional learning, feelings identification, and self-regulation provides less direct scope for mathematical operations beyond basic counting, scientific investigation, or geographic exploration than themes like construction, nature, or travel where engineering design, empirical observation, and spatial concepts drive the activities. The theme\\u2019s strength in emotional vocabulary, empathy development, and self-awareness means it offers less material for measurement, pattern recognition, or technical vocabulary than themes with richer mathematical or STEM dimensions. While emotions are universal, specific facial expressions and emotional norms may vary across cultures, and teachers should discuss how different communities express and value different emotional states.',

  themeComparisons: [
    {
      vsThemeId: 'body',
      summary: 'Emotions worksheets provide an internal-experience theme studying the psychological self through feelings identification, empathy development, and self-regulation strategies with the emotional mind as the primary subject. Body worksheets provide a physical-anatomy theme studying the biological self through body parts, senses, and health science with the physical body as the primary subject. Emotions teaches what we feel inside; body teaches what we are made of physically.',
    },
    {
      vsThemeId: 'fairy-tales',
      summary: 'Emotions worksheets provide a self-awareness theme where feelings are studied directly through identification, classification, and regulation activities with real emotional experiences as the subject matter. Fairy tales worksheets provide a narrative theme where feelings emerge indirectly through character journeys, moral dilemmas, and story-based empathy with fictional characters as the emotional vehicles. Emotions teaches feelings explicitly; fairy tales teaches feelings through story.',
    },
    {
      vsThemeId: 'music',
      summary: 'Emotions worksheets provide a psychological theme studying emotions through naming, sorting, and analyzing feelings with visual facial expressions and written scenarios as the primary medium. Music worksheets provide a performing-arts theme where emotions are expressed and experienced through melody, rhythm, and musical performance with sound as the emotional medium. Emotions teaches feelings through words and images; music teaches feelings through sound.',
    },
    {
      vsThemeId: 'school',
      summary: 'Emotions worksheets provide a social-emotional theme studying the inner world of feelings, empathy, and self-regulation as the primary learning objective. School worksheets provide an academic-environment theme studying school routines, classroom objects, and learning activities as the primary subject matter. Emotions teaches how children feel at school; school teaches what children do at school.',
    },
  ],

  productLinks: [
    {
      appId: 'writing-app',
      anchorText: 'Feelings writing worksheets for kids',
      context: 'Reflective writing and emotional self-awareness develop simultaneously when children compose sentences about their own feelings in our feelings writing worksheets for kids, describing emotional experiences using precise vocabulary like frustrated, grateful, and overwhelmed \u2014 building the personal narrative skills and emotional literacy that connect authentic self-expression to the writing fluency academic curricula require.',
    },
    {
      appId: 'word-guess',
      anchorText: 'Emotions word guess worksheets printable',
      context: 'Spelling fluency and feelings vocabulary expand when children decode emotion words letter by letter in our emotions word guess worksheets printable, using phonetic knowledge and contextual clues to reveal terms like disappointed, determined, and compassionate \u2014 building the word-attack skills and emotional lexicon that connect vocabulary puzzle excitement to the nuanced feelings language children need for effective social communication.',
    },
    {
      appId: 'drawing-lines',
      anchorText: 'Feelings matching lines worksheets for kindergarten',
      context: 'Perspective-taking and cause-and-effect reasoning develop when children draw lines connecting facial expressions to the scenarios that caused them in our feelings matching lines worksheets for kindergarten, analyzing why a character who lost a toy feels sad and why a character who received a gift feels happy \u2014 building the empathic reasoning and fine motor coordination that connect structured matching practice to real-world social understanding.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'Emotions sorting worksheets for preschool',
      context: 'Categorical thinking and emotional classification skills develop when children sort facial expressions into feeling groups in our emotions sorting worksheets for preschool, organizing happy, sad, angry, and scared faces into distinct categories \u2014 building the multi-attribute sorting skills and basic emotional vocabulary that connect structured classification practice to the self-awareness foundation that social-emotional learning programs prioritize.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and basic feelings identification in her three- and four-year-olds using a theme where the bold, exaggerated features of illustrated faces provide clear recognition targets for children building their first emotional vocabulary.',
      solution: 'She introduces coloring pages of expressive emotion faces alongside matching-app worksheets where children pair facial expressions showing happy, sad, angry, and scared. The exaggerated features of the illustrated faces \u2014 wide smiles, downturned mouths, raised eyebrows, and squinted eyes \u2014 provide unmistakable visual cues for three-year-olds developing shape recognition and emotional awareness simultaneously. Every worksheet session ends with a brief mirror activity where children make each face themselves to connect visual recognition to physical self-awareness.',
      outcome: 'Basic emotion identification accuracy improves significantly over three weeks as children practice matching the bold, distinctive facial expression illustrations. Fine motor control develops through coloring the curved lines of smiles, the circular shapes of surprised eyes, and the angular features of angry expressions. The mirror activity becomes the most anticipated part of every session, and the teacher reports that four children who previously struggled to communicate frustration begin pointing to the sad or angry face illustrations during actual emotional moments, using the worksheet vocabulary as a communication bridge.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate categorical thinking with cause-and-effect reasoning and arithmetic through a theme that makes classification personally meaningful for five- and six-year-olds navigating increasingly complex social situations.',
      solution: 'She pairs picture-sort feelings classification worksheets where children sort emotions into comfortable and uncomfortable categories with drawing-lines scenario-emotion connection activities and image-addition emotion counter worksheets. She extends the learning through a classroom feelings check-in routine where students select their morning emotion from a poster, complete related worksheets during center time, and discuss what helped or changed their feeling during afternoon circle.',
      outcome: 'Feelings classification accuracy reaches 91 percent as students practice sorting emotions into meaningful categories that help them understand their own experiences. Cause-and-effect reasoning improves as drawing-lines activities require students to analyze why specific situations produce specific feelings. The daily feelings check-in becomes the anchor of the classroom routine, and five students begin spontaneously using emotion vocabulary from worksheets during conflict resolution conversations, demonstrating transfer from structured paper activities to authentic social-emotional application.',
    },
    {
      situation: 'A first-grade teacher wants to connect spelling fluency, personal narrative writing, and perspective-taking but finds that teaching these literacy skills through disconnected activities produces surface-level engagement in her six- and seven-year-olds.',
      solution: 'She launches an integrated social-emotional literacy unit combining word-guess emotion vocabulary puzzles featuring terms like frustrated, determined, and grateful with writing-app reflective composition activities where children write about their own emotional experiences. She extends the unit with a compare-and-contrast discussion about how two characters in a read-aloud felt differently about the same event, connecting vocabulary knowledge to perspective-taking and analytical composition.',
      outcome: 'Spelling accuracy for emotion vocabulary reaches 90 percent as the personal relevance of feelings words motivates sustained practice and home conversation. Reflective writing quality improves dramatically as students apply precise emotion vocabulary to describe their own experiences instead of relying on generic words like happy and sad. The compare-and-contrast character analysis produces the most thoughtful and empathetic student writing of any unit, and the teacher reports that connecting spelling, personal writing, and perspective-taking through the emotions theme generates authentic engagement because every child is the expert on their own feelings.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring expressive emotion faces with exaggerated features and body language cues that provide rich visual emotional information. Use picture-sort emotion classification activities with clear facial expression illustrations that make emotional categories visually distinct. Assign drawing-lines scenario-to-feeling connection activities with vivid situation illustrations paired with emotion faces that create strong visual associations between causes and emotional responses.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with four basic emotions \u2014 happy, sad, angry, scared \u2014 before introducing nuanced feelings like frustrated, overwhelmed, and embarrassed that require finer emotional discrimination. Use matching activities with bold facial expression illustrations before progressing to scenario-based emotion reasoning that requires inference from situational context. Pair every worksheet with a physical mirror activity where children practice making each face to connect visual recognition to kinesthetic self-awareness, bridging abstract emotional concepts to tangible physical experience.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with mixed-emotion analysis projects where students identify situations that trigger two feelings simultaneously and write paragraphs explaining how both can be true at once. Assign empathy interview projects where students ask family members about their emotional experiences and write comparative reflection essays analyzing similarities and differences. Extend to emotion regulation strategy evaluation reports analyzing which coping techniques work best for different types of feelings with evidence from multiple sources and organized multi-paragraph argumentation.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where facial expressions are the most universally understood human communication system and transcend all language barriers. Coloring emotion faces, matching expressions, and sorting feeling illustrations communicate through visual human expression rather than text, allowing full participation regardless of English proficiency. Basic emotion words like happy, sad, and angry are among the first English words taught in any language program because children need these terms for essential daily social communication, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Emotions identification and empathy assessment',
      criteria: 'Give students a set of six scenario cards describing common childhood situations and a feelings word bank with twelve emotion options. They select the best emotion for each scenario, explain why a character might feel that way in one sentence, and write two sentences about a time they felt one of those emotions themselves. Assess using a three-level rubric: emerging (correctly identifies at least three emotions and writes one sentence about personal experience), proficient (correctly identifies five or more emotions with brief reasoning for each, and writes two complete sentences about personal emotional experience using vocabulary from the word bank), advanced (correctly identifies all six emotions with detailed perspective-taking reasoning, writes reflective sentences connecting personal experience to the scenarios using precise emotional vocabulary, and suggests a coping strategy for one challenging emotion).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one emotions worksheet per week over a four-week unit. Compare early and late samples to document growth in emotion identification accuracy across facial expression and scenario-based activities, feelings vocabulary breadth in word puzzles and writing tasks, classification sophistication in sorting activities, and reflective writing quality in composition exercises. Look specifically for progression from identifying basic emotions to recognizing nuanced feelings, and from simple labeling to analytical reasoning about emotional causes and coping strategies.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on emotions coloring, matching, and vocabulary worksheets, note whether they identify emotion faces by pointing without verbal labels (Pre-K), name feelings while sorting and matching emotion illustrations with verbal explanations of why characters feel specific emotions (K\u20131st), or use sophisticated emotional vocabulary like overwhelmed, determined, and compassionate in complete sentences while analyzing scenarios with multi-step perspective-taking and suggesting coping strategies (2nd\u20133rd). Record whether children transfer emotion identification and vocabulary skills to real-world contexts like classroom conflict resolution, feelings check-ins, and empathetic peer interactions.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Psychology and Brain Science \u2014 How the Brain Produces Emotions, Amygdala and Prefrontal Cortex Functions & Physical-Emotional Health Connections)',
      connection: 'Emotions worksheets connect to science through introductory psychology and brain science. Understanding that emotions are produced by the brain and serve survival functions, that the amygdala processes threat-related emotions while the prefrontal cortex enables regulation, and that physical states like hunger and tiredness affect emotional responses gives children a scientific framework for understanding their inner world. Health science connects through the relationship between emotional wellbeing and physical health.',
      activity: 'After completing matching-app facial expression and picture-sort emotion classification worksheets, guide students through a simple brain science lesson where they learn that the amygdala is like an alarm bell that triggers strong emotions and the prefrontal cortex is like a wise helper that helps us think before we act \u2014 then create a poster showing how deep breathing helps the wise helper calm the alarm bell, connecting worksheet emotion knowledge to basic neuroscience through age-appropriate metaphor.',
    },
    {
      subject: 'Math (Data Collection and Analysis with Emotional Content \u2014 Feelings Surveys, Tally Charts, Bar Graphs & Frequency Comparison Across Days)',
      connection: 'Emotions worksheets develop mathematical skills uniquely because emotional data is personally meaningful. Surveying classmates about feelings builds data literacy through authentic social research. Creating tally charts and bar graphs of emotion check-in results develops graphing skills with data children genuinely care about. Comparing frequencies of different emotions across days introduces statistical thinking through patterns in their own emotional lives. Counting emotion-themed objects provides arithmetic practice within personally meaningful contexts that sustain engagement.',
      activity: 'After completing image-addition emotion counting and drawing-lines scenario-emotion worksheets, launch a week-long class feelings survey where students record their morning emotion each day on a class tally chart, create individual bar graphs showing their emotional patterns across five days, and write three sentences analyzing what they notice about when certain emotions appear most often \u2014 connecting worksheet emotion vocabulary to authentic data collection, graphing, and analytical writing.',
    },
    {
      subject: 'Language Arts (Emotional Vocabulary as Literacy Acceleration \u2014 Precise Feeling Words for Descriptive Writing, Character Emotion Analysis for Reading Comprehension & Reflective Journals for Personal Narrative)',
      connection: 'Emotions worksheets build language arts skills uniquely because emotional vocabulary is the foundation of both effective writing and deep reading comprehension. Learning precise feeling words like frustrated, overwhelmed, grateful, and determined develops the nuanced descriptive vocabulary that strong writing requires. Reading comprehension through character emotion analysis develops inference and perspective-taking skills that unlock deeper meaning in literature. Reflective writing through feelings journals builds personal narrative skill with authentic purpose and genuine voice that generic prompts cannot replicate.',
      activity: 'After completing word-search and word-guess feelings vocabulary worksheets, guide students through a character emotion analysis of a class read-aloud where they identify three emotions a character experienced, use their worksheet vocabulary to describe each feeling precisely, and write a reflective paragraph comparing one of the character\\u2019s emotions to a time they felt similarly \u2014 connecting vocabulary acquisition to literary analysis and personal narrative writing through the emotionally engaging context of story characters and self-reflection.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Social-emotional learning focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Emotional vocabulary + feelings classification + empathy and self-regulation' },
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

console.log('Part 49: Enriching construction & emotions theme hub pages...\n');

console.log('1. Injecting 12 fields into construction/en.ts...');
injectFields(path.join(base, 'construction', 'en.ts'), constructionFields);

console.log('2. Injecting 12 fields into emotions/en.ts...');
injectFields(path.join(base, 'emotions', 'en.ts'), emotionsFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
