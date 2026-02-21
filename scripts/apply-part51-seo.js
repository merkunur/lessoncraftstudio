/**
 * SEO Part 51: Enrich household & jobs EN theme hub pages
 * - Household: adds 12 missing enrichment fields
 * - Jobs: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Household: 12 fields ─────────────────────────────────────────────────

const householdFields = `
  // -- SEO Enrichment (Part 51) --

  uniqueAngle: 'Household is the ONLY theme where the educational content IS the child\\u2019s own living environment \\u2014 where every worksheet about sorting objects by room, describing positions with prepositions, sequencing daily routines, or counting items on shelves practices the exact spatial reasoning, classification, and procedural thinking skills that academic success requires, using the rooms, objects, and routines children experience every moment they are at home. No other theme delivers this home-as-classroom framework, because while furniture teaches spatial skills through individual objects and cooking teaches through kitchen activities, only household encompasses the entire domestic environment \\u2014 every room, every routine, every spatial relationship, and every safety concept \\u2014 making it the broadest and most continuously reinforced learning context available. This total-environment framework is structurally different from all other themes because household worksheets teach concepts children verify and reinforce hundreds of times daily without conscious effort \\u2014 every time they find their shoes under the bed, put dishes in the kitchen, or follow their morning routine in sequence, they are practicing the spatial vocabulary, classification reasoning, and procedural thinking their worksheets formalized, creating a frequency and breadth of real-world reinforcement no single-topic theme can approach. Household is also the ONLY theme where daily routine sequencing is the natural, central learning objective rather than a supplementary benefit \\u2014 where ordering morning steps, bedtime steps, and household chore procedures develops the temporal reasoning and procedural literacy that directly transfer to science experiments, recipe following, narrative writing, and mathematical operations on number lines. The safety education dimension adds a unique practical-reasoning layer: household worksheets teach cause-and-effect thinking through hazard identification and rule reasoning that no other theme can provide with such immediate personal relevance. The combination of total-environment spatial reasoning, routine-based procedural literacy, and safety-focused cause-and-effect reasoning makes household the most comprehensively practical and continuously reinforced theme across all 50 available.',

  researchCitation: 'Bronfenbrenner, U. (1979). "The Ecology of Human Development: Experiments by Nature and Design." Harvard University Press \\u2014 establishing that the home microsystem is the most influential learning environment in early childhood, where spatial arrangements, daily routines, and object interactions create the primary context through which children develop cognitive schemas for classification, spatial reasoning, and procedural understanding, because the frequency and emotional significance of home-based experiences create stronger and more durable learning associations than any novel environment can provide.',

  snippetDefinition: 'Household worksheets for kids are printable educational activities featuring rooms, furniture, home objects, daily routines, and domestic scenes designed to build spatial reasoning, object classification, preposition mastery, and procedural sequencing for children ages 3 through 9. They include coloring pages for fine motor development, find-and-count for visual scanning, matching and shadow-matching for visual discrimination, picture-sort for room classification, grid-match for spatial memory, addition with household counters, preposition practice with room scenes, word search for home vocabulary, pattern worksheets for arrangement sequences, and odd-one-out puzzles for analytical reasoning.',

  snippetHowTo: [
    'Start with coloring pages of room interiors with kitchens, bedrooms, and living rooms to build fine motor control and household vocabulary through detailed, familiar illustrations children recognize from their own homes.',
    'Progress to matching-app and shadow-match worksheets where children pair identical household objects and match home item silhouettes, developing visual discrimination through the distinctive shapes of lamps, clocks, pots, and furniture.',
    'Introduce spatial language with prepositions worksheets where children identify and use positional terms like on, under, beside, between, and behind to describe object positions in detailed room scenes.',
    'Advance to classification with picture-sort worksheets where children sort household objects by room, function, or material, building the multi-attribute categorical thinking that underpins scientific taxonomy.',
    'Incorporate arithmetic with image-addition worksheets using household-object counters and find-and-count visual scanning activities that connect math to home inventory scenarios.',
    'Extend to analytical reasoning with grid-match room arrangement activities, pattern-worksheet household object sequences, and odd-one-out puzzles identifying which item does not belong in a specific room.',
    'Connect to real household experience through room-walking classification games, daily routine sequencing with real morning steps, and home scavenger hunts that verify worksheet concepts through hands-on domestic exploration.',
  ],

  limitations: 'Household worksheets\\u2019 focus on spatial reasoning, room classification, and daily routine sequencing provides less direct scope for narrative storytelling, creative arts, or scientific investigation than themes like fairy tales, music, or nature where plot development, artistic expression, and ecological observation drive the activities. The theme\\u2019s strength in spatial vocabulary, functional classification, and procedural sequencing means it offers less material for creative writing, cultural exploration, or performance arts than themes with richer narrative, artistic, or interpersonal dimensions. While homes are universally familiar, worksheets featuring specific household styles, room layouts, or domestic objects may reflect certain cultural or economic contexts, and teachers should discuss how homes vary across cultures and communities.',

  themeComparisons: [
    {
      vsThemeId: 'furniture',
      summary: 'Household worksheets provide a broad domestic-life theme studying the entire home including rooms, daily routines, safety concepts, and all household objects across every aspect of domestic living. Furniture worksheets provide a focused spatial theme studying the design, shapes, and arrangement of individual furniture pieces with geometry, size comparison, and positional vocabulary. Household teaches about home life broadly; furniture teaches about room objects spatially.',
    },
    {
      vsThemeId: 'cooking',
      summary: 'Household worksheets provide a comprehensive home environment theme studying every room, routine, and domestic concept across the full range of household experience. Cooking worksheets provide a kitchen-specific theme studying food preparation, recipe following, and culinary measurement within one specialized domestic activity. Household covers all rooms and routines; cooking focuses deeply on kitchen activities.',
    },
    {
      vsThemeId: 'school',
      summary: 'Household worksheets provide a theme studying the home environment through room organization, domestic routines, and spatial reasoning in the space where children live. School worksheets provide a theme studying the academic environment through classroom routines, school supplies, and learning activities in the space where children learn. Household teaches about home life; school teaches about school life.',
    },
    {
      vsThemeId: 'body',
      summary: 'Household worksheets provide a theme studying the domestic environment that surrounds children through spatial arrangements, object classification, and routine procedures in home contexts. Body worksheets provide a theme studying the physical self through body parts, senses, health science, and biological functions. Household teaches about the space around the child; body teaches about the child themselves.',
    },
  ],

  productLinks: [
    {
      appId: 'prepositions',
      anchorText: 'Household preposition worksheets for kids',
      context: 'Spatial vocabulary and positional reasoning develop when children describe household object positions using precise prepositions in our household preposition worksheets for kids, identifying what is on the shelf, under the table, beside the lamp, and between the chairs \\u2014 building the comprehensive spatial language that connects everyday home observation to the geometry, map reading, and descriptive writing skills that academic success requires.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'Room sorting worksheets for kindergarten',
      context: 'Classification reasoning and categorical thinking develop when children sort household objects by room, function, or material in our room sorting worksheets for kindergarten, organizing lamps, pots, towels, and tools into meaningful room-based groups \\u2014 building the multi-attribute sorting skills and functional vocabulary that connect structured classification practice to the scientific taxonomy and analytical reasoning that academic curricula require.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'Household find and count worksheets printable',
      context: 'Visual scanning accuracy and number sense develop when children search detailed household scenes to locate and count specific objects in our household find and count worksheets printable, finding all the cups in the kitchen or counting windows across multiple rooms \\u2014 building the focused attention and enumeration skills that connect visual search tasks to the mathematical counting fluency and observational precision that early academic success requires.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Household shadow matching worksheets for preschool',
      context: 'Visual discrimination and shape recognition develop when children match household objects to their silhouettes in our household shadow matching worksheets for preschool, analyzing the distinctive outlines of lamps, clocks, brooms, and kitchen items \\u2014 building the figure-ground discrimination and shape awareness that connect silhouette matching to the spatial reasoning and geometry readiness that early mathematics requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and object recognition in her three- and four-year-olds using a theme where the distinctive shapes of household items provide clear matching targets for children building their first home vocabulary.',
      solution: 'She introduces coloring pages of room interiors alongside shadow-match worksheets where the distinctive shapes of lamps, clocks, pots, and brooms provide clear matching targets for three-year-old visual discrimination development. Children color household illustrations while naming objects and their functions, then match each home item to its shadow. Every worksheet session ends with a real-object identification activity where children point to classroom or home items that match illustrations from their worksheet.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of household objects with their varied shapes. Fine motor control develops through coloring the curved shapes of lamps, the angular forms of shelves, and the detailed features of kitchen items. The teacher reports that the real-object identification activity becomes a favorite routine, with three children who previously struggled to communicate in sentences beginning to name household items and describe their positions using basic prepositions learned from worksheet activities.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate spatial language with categorical thinking and number sense but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs prepositions worksheets with detailed room scenes alongside picture-sort room classification activities and find-and-count visual scanning exercises, creating integrated sessions through a classroom home corner unit where students describe object positions using five different prepositions, sort illustrated items by room, and count objects in household scenes while building the spatial vocabulary that geometry standards require.',
      outcome: 'Preposition usage accuracy reaches 90 percent as students practice describing household object positions using on, under, beside, between, and behind within meaningful room contexts. Classification skills strengthen as students sort household items by room and function within the home corner unit. Number sense develops as find-and-count activities connect counting to household inventory scenarios. The teacher reports that five students begin spontaneously using spatial vocabulary during other subjects, describing where materials are located using precise prepositions they learned from household worksheets.',
    },
    {
      situation: 'A first-grade teacher wants to connect spatial reasoning, domain-specific vocabulary, and descriptive writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated household literacy unit combining grid-match room arrangement activities with word-search household vocabulary featuring terms like cabinet, appliance, curtain, and radiator. She extends the unit with a descriptive writing assignment where students write a paragraph describing their bedroom layout using at least five prepositions and explaining where key objects belong and why.',
      outcome: 'Grid-match spatial accuracy reaches 87 percent as the room arrangement context motivates sustained spatial reasoning practice. Household vocabulary usage increases substantially as students encounter the terms in word searches and then apply them in their descriptive writing. The bedroom description assignment produces the most detailed and spatially organized student work of any writing unit, and the teacher reports that connecting spatial reasoning, vocabulary, and descriptive writing through the household theme generates authentic engagement because every child is the expert on their own room and home arrangement.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed room scenes with multiple household objects and spatial relationships that provide rich visual environmental information. Use shadow-match household silhouette activities with high-contrast object shapes showing the distinctive outlines of lamps, clocks, and kitchen items. Assign grid-match room arrangement activities with clear grid lines and color-coded objects that make spatial patterns visually explicit.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with two basic prepositions \\u2014 on and under \\u2014 before introducing between, behind, and beside that require more complex spatial reasoning. Reduce room classification to two rooms like kitchen and bedroom before introducing multi-room sorting. Pair every worksheet with real household objects in the classroom so children can physically position items before describing spatial relationships on paper, bridging concrete spatial experience to abstract representation.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with home floor plan design projects on graph paper where students calculate room dimensions and plan furniture placement using measurement and area concepts. Assign multi-attribute classification projects sorting household objects by three criteria simultaneously including room, function, and material. Extend to daily routine optimization reports analyzing morning sequences for efficiency with written justification and time estimation.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where kitchens, bedrooms, bathrooms, and their contents are universally recognized household contexts found in every home regardless of cultural background. Coloring, shadow-match, and grid-match activities communicate through spatial patterns rather than text, allowing full participation regardless of English proficiency. Basic household words like bed, cup, and door are among the first practical nouns taught in any language program because children need these terms for daily communication about their immediate environment, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Household spatial reasoning and classification assessment',
      criteria: 'Give students a room illustration showing ten household objects and a set of five questions. They name each object, describe the position of three objects using different prepositions, sort the objects into two room categories, sequence three daily routine steps in correct order, and write two sentences explaining why a specific object belongs in a particular room. Assess using a three-level rubric: emerging (names at least six objects and describes positions of two objects using basic prepositions), proficient (names all objects, describes three positions using varied prepositions, sorts into two categories with reasoning, sequences routine steps correctly, and writes two complete sentences about room placement), advanced (names all objects with precise vocabulary, describes positions using five or more prepositions, sorts into categories with detailed functional reasoning, sequences steps with dependency explanation, and writes insightful sentences connecting object placement to spatial function and room purpose).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one household worksheet per week over a four-week unit. Compare early and late samples to document growth in spatial vocabulary accuracy across preposition and description activities, classification sophistication in room sorting tasks, procedural sequencing quality in routine ordering activities, and fine motor precision in coloring and grid activities. Look specifically for progression from basic preposition use to complex spatial descriptions with multiple positional terms, and from single-room sorting to multi-criteria functional classification.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on household coloring, preposition, and classification worksheets, note whether they identify household objects by pointing without verbal labels (Pre-K), name objects and describe positions using basic prepositions while sorting by room with verbal reasoning explanations (K\\u20131st), or use sophisticated spatial vocabulary like adjacent, perpendicular, and symmetrical in complete sentences while analyzing room layouts with multi-step spatial and functional reasoning (2nd\\u20133rd). Record whether children transfer household spatial vocabulary and classification skills to real-world contexts like describing their home arrangement, organizing their desk area, and using precise prepositions in other academic subjects.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Materials Science and Safety Reasoning \\u2014 Physical Properties of Home Objects, Cause-and-Effect Through Hazard Identification & Observation Skills Through Object Classification)',
      connection: 'Understanding that household objects are made from different materials like wood, glass, metal, and fabric that serve different purposes develops materials-science awareness and functional reasoning. Cause-and-effect reasoning through hazard identification and safety rule analysis builds the analytical thinking that scientific inquiry requires. Observation skills through identifying and classifying objects by physical properties connect science standards to the most personally relevant environment children know.',
      activity: 'After completing shadow-match household object and picture-sort room classification worksheets, guide students through a household materials investigation where they examine five classroom or home objects, identify what each is made of, discuss why that material was chosen for that purpose, and record their observations in a simple science journal \\u2014 connecting the classification skills from worksheet activities to the materials-science principle that different materials serve different functions based on their physical properties.',
    },
    {
      subject: 'Math (Spatial Reasoning as Mathematical Foundation \\u2014 Preposition Practice for Geometry Vocabulary, Room Layout for Spatial Visualization & Counting Household Objects for Number Sense)',
      connection: 'Preposition practice builds the spatial vocabulary that geometry and coordinate systems require, as the positional language of on, under, beside, between, and behind directly develops the spatial reasoning that mathematical thinking demands. Room layout activities develop spatial visualization that predicts geometry success. Counting household objects builds number sense through personally meaningful inventory scenarios. Daily routine sequencing develops the temporal ordering that number lines and mathematical operations require.',
      activity: 'After completing prepositions room scene and image-addition household counting worksheets, set up a classroom household counting station where students count objects in different illustrated rooms, record totals in a data table, compare which room has the most items, and calculate simple addition problems combining objects from two rooms \\u2014 connecting worksheet spatial vocabulary and counting skills to arithmetic through the motivating context of analyzing the household environments they know from daily life.',
    },
    {
      subject: 'Language Arts (Spatial and Procedural Vocabulary as Literacy Foundation \\u2014 Preposition Mastery for Descriptive Writing, Household Vocabulary for Functional Word Banks & Procedural Writing About Daily Routines)',
      connection: 'Mastering prepositions like on, under, beside, between, behind, and above builds the precise positional language that descriptive writing requires. Household vocabulary including cabinet, appliance, curtain, and radiator expands functional word banks with practical terms children use in daily communication. Procedural writing about daily routines develops sequential composition with transition words. Descriptive writing about room layouts practices organized spatial composition that transfers to informational and narrative writing across all subjects.',
      activity: 'After completing word-search household vocabulary and prepositions room description worksheets, guide students through a descriptive writing project where they choose a room in their home, list every object they can remember, describe the position of each item using at least three different prepositions, and write an organized paragraph that would help a reader visualize the room layout \\u2014 connecting vocabulary acquisition and spatial language to authentic descriptive writing through the personally meaningful context of describing the home environment children know intimately.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Spatial reasoning and classification focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Preposition mastery + room classification + daily routine sequencing vocabulary' },
  ],`;

// ── Jobs: 12 fields ──────────────────────────────────────────────────────

const jobsFields = `
  // -- SEO Enrichment (Part 51) --

  uniqueAngle: 'Jobs is the ONLY theme where the educational content IS social systems thinking \\u2014 where every worksheet about matching workers to tools, sorting community helpers by role, tracing supply chains from farmer to baker to store, or counting workplace objects teaches children how their community actually functions as an interconnected network of specialized contributions, building the systems-level understanding that no other theme provides. No other theme delivers this community-as-curriculum framework, because while school teaches about the learning environment and household teaches about the home environment, only jobs reveals the invisible network of human cooperation that makes everything else possible \\u2014 showing children that the food on their table, the buildings they enter, and the safety they enjoy all result from dozens of interconnected professionals whose work depends on each other. This interdependence framework is structurally different from all other themes because jobs worksheets simultaneously build two skill dimensions at once \\u2014 academic skills like classification, vocabulary, and arithmetic AND social understanding of roles, responsibilities, and cooperation \\u2014 without either dimension being supplementary. Jobs is also the ONLY theme where vocabulary acquisition spans every professional domain simultaneously \\u2014 where a single unit introduces medical terms from healthcare, engineering terms from construction, culinary terms from cooking, and agricultural terms from farming, creating the broadest cross-domain vocabulary exposure of any theme through the natural diversity of career fields. The career-awareness dimension adds a unique aspirational layer: jobs worksheets expand children\\u2019s sense of what is possible by introducing professions they may never have encountered, building growth mindset through the understanding that every job requires learning and practice. The combination of systems-level community understanding, cross-domain vocabulary breadth, and aspirational career awareness makes jobs the most socially foundational and vocabulary-expansive theme across all 50 available.',

  researchCitation: 'Hartung, P. J., Porfeli, E. J. & Vondracek, F. W. (2005). "Child Vocational Development: A Review and Reconsideration." Journal of Vocational Behavior, 66(3), 385\\u2013419 \\u2014 establishing that early exposure to diverse career roles through structured educational activities significantly broadens children\\u2019s occupational aspirations and reduces gender and socioeconomic stereotyping of professions, because children who encounter a wide range of community helpers and professional roles in their formative years develop more flexible career schemas and stronger understanding of how education connects to professional contribution.',

  snippetDefinition: 'Jobs and community helper worksheets for kids are printable educational activities featuring doctors, firefighters, teachers, farmers, chefs, police officers, and other community workers designed to build classification skills, career vocabulary, social studies reasoning, and community awareness for children ages 3 through 9. They include coloring pages for fine motor development, find-and-count for visual scanning in workplace scenes, matching and shadow-matching for worker-tool pairing, picture-sort for career classification, addition with workplace counters, word search and word scramble for career vocabulary, image crossword for spelling and spatial reasoning, odd-one-out for analytical thinking, and picture bingo for recognition fluency.',

  snippetHowTo: [
    'Start with coloring pages of community helpers in their uniforms and workplaces to build fine motor control and career vocabulary through detailed, engaging illustrations of doctors, firefighters, and teachers children recognize from their communities.',
    'Progress to matching-app and shadow-match worksheets where children pair workers to their tools and match community helper silhouettes, developing visual discrimination through the distinctive shapes of stethoscopes, fire hoses, and chef hats.',
    'Introduce classification with picture-sort worksheets where children sort community helpers by workplace, role type, or tools used, building multi-attribute categorical thinking about career organization.',
    'Advance to vocabulary with word-search and word-scramble puzzles featuring career terms like ambulance, delivery, uniform, and construction, and image-crossword activities that combine spelling with visual reasoning.',
    'Incorporate arithmetic with image-addition worksheets using workplace-object counters and find-and-count visual scanning activities set in workplace scenes.',
    'Extend to analytical reasoning with odd-one-out career puzzles and picture-bingo recognition fluency games that develop deductive thinking through career classification contexts.',
    'Connect to real community helpers through classroom career days, neighborhood observation walks, and family interview projects that verify worksheet concepts through authentic encounters with workers in the community.',
  ],

  limitations: 'Jobs worksheets\\u2019 focus on career classification, community interdependence, and cross-domain vocabulary provides less direct scope for spatial reasoning, geometric concepts, or scientific investigation than themes like furniture, shapes, or nature where positional vocabulary, mathematical properties, and ecological observation drive the activities. The theme\\u2019s strength in social systems thinking, career vocabulary breadth, and classification reasoning means it offers less material for measurement, pattern recognition, or creative arts than themes with stronger mathematical, sequential, or artistic dimensions. While community helpers exist everywhere, worksheets featuring specific professions may reflect certain economic or cultural contexts, and teachers should discuss how jobs and career paths vary across communities and cultures.',

  themeComparisons: [
    {
      vsThemeId: 'construction',
      summary: 'Jobs worksheets provide a broad community-helpers theme surveying MANY professions through identification, role-matching, tool-pairing, and community-contribution awareness across diverse career fields. Construction worksheets provide a theme deeply exploring ONE specific profession through its tools, processes, materials, and engineering challenges within detailed construction site activities. Jobs teaches many careers broadly; construction teaches one career deeply.',
    },
    {
      vsThemeId: 'cooking',
      summary: 'Jobs worksheets provide a comprehensive career exploration theme studying the full range of community roles from healthcare to education to public safety to agriculture. Cooking worksheets provide a kitchen-specific theme studying food preparation, recipe following, and culinary skills within one specialized professional domain. Jobs covers all career fields; cooking focuses deeply on the culinary profession.',
    },
    {
      vsThemeId: 'school',
      summary: 'Jobs worksheets provide a theme studying the people who make communities function through their specialized roles, tools, and professional contributions across diverse workplaces. School worksheets provide a theme studying the academic environment itself through classroom routines, school supplies, and learning activities. Jobs teaches about who works in the community; school teaches about what happens in the classroom.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Jobs worksheets provide a broad career awareness theme exploring the full diversity of community professions from doctors to firefighters to mail carriers to engineers. Farm worksheets provide a theme exploring one specific agricultural career through seasonal cycles, animal care, crop production, and rural life. Jobs surveys all professions; farm explores agriculture deeply.',
    },
  ],

  productLinks: [
    {
      appId: 'image-crossword',
      anchorText: 'Community helpers crossword worksheets for kids',
      context: 'Spelling fluency and visual-spatial reasoning develop when children solve career-themed crossword puzzles in our community helpers crossword worksheets for kids, identifying community helper images and spelling their names across intersecting grid positions \\u2014 building the orthographic awareness and domain-specific vocabulary that connect word puzzle engagement to the reading fluency and career literacy that academic success requires.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Jobs word scramble worksheets printable',
      context: 'Spelling accuracy and career vocabulary expand when children unscramble job-related words in our jobs word scramble worksheets printable, rearranging letters to form terms like firefighter, ambulance, and construction \\u2014 building the orthographic processing and cross-domain vocabulary that connect word puzzle practice to the broad career literacy and reading fluency that language arts standards require.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'Community helpers sorting worksheets for kindergarten',
      context: 'Classification reasoning and categorical thinking develop when children sort community helpers by workplace, role type, or tools used in our community helpers sorting worksheets for kindergarten, organizing doctors, firefighters, teachers, and farmers into meaningful career groups \\u2014 building the multi-attribute sorting skills and social studies vocabulary that connect structured classification practice to the analytical reasoning and community awareness that academic curricula require.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Community helpers shadow matching worksheets for preschool',
      context: 'Visual discrimination and career recognition develop when children match community helper figures to their silhouettes in our community helpers shadow matching worksheets for preschool, analyzing the distinctive outlines of fire helmets, stethoscopes, and chef hats \\u2014 building the figure-ground discrimination and professional symbol recognition that connect silhouette matching to the visual processing and career awareness that early learning requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and career recognition in her three- and four-year-olds using a theme where the distinctive shapes of professional uniforms and tools provide clear matching targets for children building their first career vocabulary.',
      solution: 'She introduces coloring pages of community helpers in their uniforms alongside shadow-match worksheets where the distinctive shapes of fire helmets, stethoscopes, and chef hats provide clear matching targets for three-year-old visual discrimination development. Children color community helper illustrations while naming workers and their roles, then match each helper to their shadow. Every worksheet session ends with a dramatic play activity where children act out the role they just learned about using simple props to bridge visual recognition to embodied role understanding.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of community helpers with their varied professional shapes. Fine motor control develops through coloring the detailed uniforms, tools, and workplace settings of diverse community workers. The teacher reports that the dramatic play extension becomes the most anticipated part of every session, with three children who previously struggled to communicate in sentences beginning to use career vocabulary and role descriptions during pretend play scenarios.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate number sense with categorical thinking and career vocabulary but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs find-and-count workplace scene worksheets with picture-sort career classification activities and matching-app worker-tool pairing exercises, creating integrated sessions through a community helpers unit where students count workers and tools in busy workplace illustrations, sort helpers by where they work and what they do, and match each profession to its signature tool while building the classification skills and career vocabulary that social studies standards require.',
      outcome: 'Counting accuracy in workplace scenes reaches 92 percent as students practice enumeration within engaging community helper contexts. Classification skills strengthen as students sort community helpers by workplace and function within the unit context. Worker-tool matching accuracy improves as the distinctive shapes of professional equipment provide clear visual discrimination targets. The teacher reports that five students begin spontaneously identifying community helpers during field trips and neighborhood walks, naming workers and their tools using vocabulary learned from worksheet activities.',
    },
    {
      situation: 'A first-grade teacher wants to connect spelling fluency, domain-specific vocabulary, and informational writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated community helpers literacy unit combining word-scramble career vocabulary puzzles featuring terms like firefighter, ambulance, and construction with image-crossword spelling activities that combine visual reasoning with career vocabulary. She extends the unit with a career research project where students interview a family member about their job and write a four-sentence career profile describing the person\\u2019s workplace, tools, daily tasks, and community contribution.',
      outcome: 'Spelling accuracy for career vocabulary reaches 88 percent as the community helper context motivates sustained practice with challenging multi-syllable professional terms. Image-crossword completion rates increase as students develop visual-spatial reasoning alongside career vocabulary. The family interview career profile assignment produces the most personally engaged informational writing of any literacy unit, and the teacher reports that connecting spelling, vocabulary puzzles, and informational writing through the jobs theme generates authentic engagement because every child brings family career knowledge that makes them feel confident and invested.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed community helper illustrations with distinctive uniforms, tools, and workplace settings that provide rich visual career information. Use shadow-match worker silhouette activities with high-contrast professional shapes showing the distinctive outlines of fire helmets, stethoscopes, and police badges. Assign find-and-count workplace scene activities with busy illustrated environments that reward careful visual scanning.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with four highly recognizable community helpers \\u2014 firefighter, doctor, teacher, police officer \\u2014 before introducing less visible professions like engineer, librarian, or veterinarian. Reduce matching to single-tool-per-worker before introducing multi-tool career matching. Pair every worksheet with a physical prop or dramatic play activity so children can embody the career role before completing paper-based classification tasks, bridging physical role experience to abstract categorical reasoning.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with supply chain research projects tracing how multiple workers contribute to a single product from raw materials to finished goods with multi-paragraph analytical writing. Assign career comparison reports analyzing similarities and differences across professions using evidence from multiple sources and organized multi-paragraph argumentative writing. Extend to community planning projects where students determine how many workers of different types a town needs and justify their staffing decisions with mathematical reasoning.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where fire trucks, doctor coats, chef hats, and police badges are universally recognized professional symbols that transcend language barriers. Coloring, shadow-match, and picture-sort activities communicate through visual professional imagery rather than text, allowing full participation regardless of English proficiency. Basic career words like doctor, teacher, and farmer are among the first occupational nouns taught in any language program because children encounter these roles in every community worldwide, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Community helper classification and career awareness assessment',
      criteria: 'Give students a set of eight community helper illustrations with their tools and a set of five questions. They name each worker, match three workers to their tools with explanation, sort the workers into two workplace categories, identify one way two different workers depend on each other, and write two sentences explaining why a specific community helper is important. Assess using a three-level rubric: emerging (names at least five workers and matches two workers to their tools), proficient (names all workers, matches three workers to tools with reasoning, sorts into two categories, identifies one interdependence connection, and writes two complete sentences about community importance), advanced (names all workers with precise career vocabulary, matches all workers to tools with detailed functional reasoning, sorts into multiple categories with explanation, identifies multiple interdependence connections, and writes insightful sentences connecting community helper roles to broader social systems and cooperation).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one jobs worksheet per week over a four-week unit. Compare early and late samples to document growth in career vocabulary breadth across word puzzle and matching activities, classification sophistication in sorting tasks, arithmetic accuracy in workplace-themed math activities, and informational writing quality in career profile assignments. Look specifically for progression from basic worker identification to analytical career comparison, and from single-attribute sorting to multi-criteria professional classification.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on jobs coloring, matching, and classification worksheets, note whether they identify community helpers by pointing without verbal labels (Pre-K), name workers and describe their roles using basic career vocabulary while sorting by workplace with verbal reasoning explanations (K\\u20131st), or use sophisticated career vocabulary like profession, specialization, and interdependence in complete sentences while analyzing community systems with multi-step reasoning about career connections and social contribution (2nd\\u20133rd). Record whether children transfer career vocabulary and classification skills to real-world contexts like identifying community helpers during neighborhood walks, discussing family members\\u2019 jobs, and using career knowledge in social studies and writing assignments.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Tools as Technology and Systems Thinking \\u2014 Specialized Equipment Analysis, Professional Interdependence Networks & Classification by Function and Behavior)',
      connection: 'Understanding that every profession uses specialized tools designed for specific purposes develops the technology-awareness dimension of science standards. Tracing how workers in different fields depend on each other builds systems thinking that mirrors ecological food web analysis. Classifying workers by the type of work they do parallels biological classification by function and behavior, connecting social studies career exploration to the scientific classification and systems reasoning that STEM curricula require.',
      activity: 'After completing shadow-match worker silhouette and picture-sort career classification worksheets, guide students through a career tools investigation where they examine three professional tools or tool images, identify what each tool is designed to do, discuss which worker uses it and why that specific design is needed, and record their observations in a simple technology journal \\u2014 connecting the classification skills from worksheet activities to the engineering design principle that tools are purpose-built technology serving specific professional needs.',
    },
    {
      subject: 'Math (Workplace Arithmetic and Data Reasoning \\u2014 Counting Tools and Workers, Addition and Subtraction in Professional Scenarios & Graphing Career Data for Data Literacy)',
      connection: 'Counting tools and workers builds number sense through career-themed contexts that make enumeration feel purposeful. Addition and subtraction word problems set in workplace scenarios connect operations to authentic professional situations. Comparing quantities across different workplaces develops measurement and comparison reasoning. Graphing career data introduces data literacy through personally interesting professional information that motivates careful data collection and analysis.',
      activity: 'After completing find-and-count workplace scene and image-addition career-themed worksheets, set up a classroom career data collection activity where students survey classmates about their dream jobs, record results in a tally chart, create a bar graph showing the most popular careers, and write three mathematical comparison sentences about their data \\u2014 connecting worksheet counting and arithmetic skills to data collection and graphing through the motivating context of career preferences that every student finds personally interesting.',
    },
    {
      subject: 'Language Arts (Cross-Domain Vocabulary as Literacy Acceleration \\u2014 Medical, Construction, Culinary, and Agricultural Terminology, Informational Writing About Careers & Oral Research Through Career Interviews)',
      connection: 'Career vocabulary spans medical terms like stethoscope and diagnosis, construction terms like blueprint and scaffold, culinary terms like recipe and ingredient, and agricultural terms like harvest and irrigation, creating the broadest vocabulary exposure of any single theme. Informational writing about careers develops organized composition with domain-specific terminology. Career interview projects build oral research skills and informational writing through authentic interpersonal communication that connects spoken language to written academic composition.',
      activity: 'After completing word-scramble career vocabulary and image-crossword spelling worksheets, guide students through a career interview and writing project where they interview a family member or school staff member about their job using five prepared questions, record the answers, and write an organized career profile paragraph using at least four career vocabulary words from their worksheets \\u2014 connecting vocabulary acquisition and spelling fluency to authentic informational writing through the personally meaningful context of real community helpers students know and can question directly.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Community awareness and social studies focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Career vocabulary + community interdependence + tool-role classification' },
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

console.log('Part 51: Enriching household & jobs theme hub pages...\n');

console.log('1. Injecting 12 fields into household/en.ts...');
injectFields(path.join(base, 'household', 'en.ts'), householdFields);

console.log('2. Injecting 12 fields into jobs/en.ts...');
injectFields(path.join(base, 'jobs', 'en.ts'), jobsFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
