/**
 * SEO Part 50: Enrich fairy-tales & furniture EN theme hub pages
 * - Fairy Tales: adds 12 missing enrichment fields
 * - Furniture: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Fairy Tales: 12 fields ─────────────────────────────────────────────────

const fairyTalesFields = `
  // -- SEO Enrichment (Part 50) --

  uniqueAngle: 'Fairy tales is the ONLY theme where the educational content IS narrative structure itself \u2014 where every worksheet about sequencing story events, identifying character traits, predicting outcomes, or analyzing morals practices the exact comprehension, inference, and analytical skills that reading mastery requires, creating a direct pipeline from themed engagement to the literary competence that predicts lifelong academic success like no other theme can. No other theme delivers this story-as-curriculum framework, because while emotions teaches about feelings and school teaches about the learning environment, only fairy tales makes the architecture of narrative \u2014 beginning, middle, end, character motivation, conflict, resolution, and moral \u2014 the explicit subject of academic study, meaning every worksheet simultaneously entertains and teaches children how stories work at a structural level they can transfer to any text they encounter. This narrative-structure framework is structurally different from all other themes because fairy tales provide the clearest, most universal model of story architecture available \u2014 their predictable patterns of events happening in threes, good triumphing over evil, and characters earning rewards through virtuous choices give children an internalized story grammar that functions as a comprehension scaffold for every narrative they will read for the rest of their lives. Fairy tales are also the ONLY theme that teaches moral reasoning through literary analysis rather than direct instruction \u2014 where children who identify why a character was brave, evaluate whether a villain\\u2019s punishment was fair, or debate what they would have done differently develop ethical thinking through genuine intellectual engagement rather than didactic lecturing. The cross-cultural dimension adds a unique global-literacy layer: fairy tales exist in every culture worldwide, making them the only theme that can simultaneously build literary skills, cultural awareness, and empathy for diverse traditions through a single genre of activity. The combination of narrative-structure-as-curriculum, organic moral reasoning, and cross-cultural universality makes fairy tales the most literarily foundational and culturally expansive theme across all 50 available.',

  researchCitation: 'Paris, A. H. & Paris, S. G. (2003). "Assessing Narrative Comprehension in Young Children." Reading Research Quarterly, 38(1), 36\u201376 \u2014 establishing that children who develop internalized story grammar through repeated exposure to well-structured narratives demonstrate significantly stronger reading comprehension, recall, and inferential reasoning across all text types, because the predictable narrative patterns of fairy tales provide an accessible schema that children use as a cognitive framework for understanding increasingly complex texts throughout their academic careers.',

  snippetDefinition: 'Fairy tale worksheets for kids are printable educational activities featuring castles, dragons, princesses, knights, enchanted forests, and storybook characters designed to build narrative comprehension, character analysis, vocabulary richness, and moral reasoning for children ages 3 through 9. They include coloring and drawing activities for fine motor development, addition with fairy tale object counters, alphabet train and word scramble for literary vocabulary, word search and word guess for spelling fluency, shadow matching for visual discrimination, sudoku for logical reasoning, picture-path for enchanted maze navigation, and treasure-hunt puzzles for multi-step problem-solving.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of castles, dragons, and fairy tale characters to build fine motor control and storybook vocabulary through enchanting illustrations that spark imagination and narrative curiosity.',
    'Progress to shadow-match worksheets where children pair fairy tale characters and props to their silhouettes, developing visual discrimination through the distinctive shapes of crowns, wands, castles, and magical creatures.',
    'Introduce literacy foundations with alphabet-train fairy tale vocabulary activities where children sequence letters to spell enchanting words, building phonemic awareness through story-rich contexts.',
    'Advance to vocabulary building with word-scramble and word-search puzzles featuring literary terms like enchanted, kingdom, quest, and courageous, and word-guess activities that develop spelling through contextual reasoning.',
    'Incorporate arithmetic with image-addition worksheets using gold coins, magic wands, and crown counters that embed math within fairy tale treasure and reward scenarios.',
    'Extend to logical reasoning with sudoku fairy tale puzzles, picture-path enchanted forest navigation, and treasure-hunt multi-step adventure activities that develop deductive thinking through quest contexts.',
    'Connect to real storytelling through classroom read-alouds, retelling with props, and original fairy tale writing that verify worksheet concepts through authentic narrative creation and performance.',
  ],

  limitations: 'Fairy tale worksheets\\u2019 focus on narrative structure, character analysis, and moral reasoning provides less direct scope for scientific investigation, measurement, engineering design, or geographic exploration than themes like nature, construction, or travel where empirical observation, spatial calculation, and physical-world concepts drive the activities. The theme\\u2019s strength in literary analysis, vocabulary richness, and moral discussion means it offers less material for data analysis, pattern recognition, or technical vocabulary than themes with stronger mathematical or STEM dimensions. While fairy tales exist across all cultures, the most commonly illustrated versions often reflect European traditions, and teachers should actively include fairy tales from diverse cultural origins.',

  themeComparisons: [
    {
      vsThemeId: 'emotions',
      summary: 'Fairy tales worksheets provide a narrative theme where feelings emerge indirectly through character journeys, moral dilemmas, and story-based empathy with fictional characters as the emotional vehicles. Emotions worksheets provide a self-awareness theme studying feelings directly through identification, classification, and regulation activities with the child\\u2019s own emotions as the primary subject. Fairy tales teaches feelings through story; emotions teaches feelings through self-examination.',
    },
    {
      vsThemeId: 'pirates',
      summary: 'Fairy tales worksheets provide a literary genre theme studying classic story structures, character archetypes, and moral lessons through enchanted kingdoms, magical quests, and timeless narrative patterns. Pirates worksheets provide an adventure theme studying treasure maps, ocean voyages, and exploration through nautical scenarios. Fairy tales teaches narrative through literary structure; pirates teaches narrative through adventure action.',
    },
    {
      vsThemeId: 'superheroes',
      summary: 'Fairy tales worksheets provide a traditional storytelling theme where heroism emerges through ordinary virtues like kindness, cleverness, and perseverance in timeless narratives passed across generations. Superheroes worksheets provide a modern media theme where heroism involves extraordinary powers, action sequences, and good-versus-evil scenarios from contemporary pop culture. Fairy tales teaches classic heroism; superheroes teaches modern heroism.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Fairy tales worksheets provide a narrative theme using animals as characters within story frameworks where creatures serve symbolic roles representing human traits and moral lessons. Animals worksheets provide a science theme studying real animals through biological classification, habitat observation, and life cycle investigation. Fairy tales uses animals as story characters; animals studies animals as living organisms.',
    },
  ],

  productLinks: [
    {
      appId: 'alphabet-train',
      anchorText: 'Fairy tale alphabet worksheets for kids',
      context: 'Phonemic awareness and letter sequencing develop when children spell enchanting fairy tale words letter by letter in our fairy tale alphabet worksheets for kids, building letter-sound connections through storybook vocabulary like castle, dragon, and kingdom that spark imaginative engagement while establishing the foundational literacy skills that reading fluency requires.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'Fairy tale treasure hunt worksheets printable',
      context: 'Multi-step problem-solving and deductive reasoning develop when children follow clues through enchanted quest scenarios in our fairy tale treasure hunt worksheets printable, navigating logical sequences that require reading comprehension, spatial reasoning, and analytical thinking \u2014 building the complex cognitive skills that connect puzzle-solving excitement to the sustained reasoning academic tasks demand.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Fairy tale word scramble worksheets for kindergarten',
      context: 'Spelling fluency and vocabulary breadth expand when children unscramble literary fairy tale words in our fairy tale word scramble worksheets for kindergarten, rearranging letters to form terms like enchanted, courageous, and kingdom \u2014 building the orthographic awareness and rich literary vocabulary that connect word puzzle engagement to the reading and writing fluency that literacy standards require.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Fairy tale shadow matching worksheets for preschool',
      context: 'Visual discrimination and shape recognition develop when children match fairy tale characters and props to their silhouettes in our fairy tale shadow matching worksheets for preschool, analyzing the distinctive outlines of crowns, wands, castles, and magical creatures \u2014 building the visual-spatial processing skills that connect silhouette matching to the figure-ground discrimination that reading readiness requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and character recognition in her three- and four-year-olds using a theme where enchanting illustrations of castles, dragons, and storybook characters sustain attention through the wonder and imagination of fairy tale worlds.',
      solution: 'She introduces coloring and draw-and-color pages of fairy tale scenes alongside shadow-match worksheets where the distinctive shapes of crowns, wands, castles, and magical creatures provide clear matching targets for three-year-old visual discrimination development. Children color enchanting fairy tale illustrations while naming characters and objects, then match each fairy tale element to its shadow. Every worksheet session ends with a brief retelling activity using finger puppets to bridge visual recognition to oral narrative skill.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of fairy tale characters and props. Fine motor control develops through coloring the varied curves of castle towers, the angular shapes of crowns, and the detailed features of storybook characters. The teacher reports that the finger puppet retelling activity becomes the most anticipated part of every session, with three children who previously struggled to communicate in sentences beginning to retell simple fairy tale sequences using worksheet vocabulary and puppet characters.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate literacy foundations with arithmetic and narrative comprehension but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs word-search fairy tale vocabulary activities with alphabet-train letter sequencing and image-addition gold coin counting exercises, creating integrated sessions through a fairy tale of the week rotation where students explore vocabulary, math, and comprehension all connected to a single story. Students rotate through stations completing different worksheet types at each stop, creating deepening familiarity with the featured tale that strengthens both word recognition and narrative understanding.',
      outcome: 'Word recognition accuracy improves substantially as children encounter fairy tale vocabulary across multiple worksheet formats within a single story context. Letter sequencing skills strengthen as alphabet-train activities provide phonemic awareness practice through enchanting vocabulary. Gold coin counting addition accuracy increases as the fairy tale treasure context makes arithmetic feel purposeful. The teacher reports that the fairy tale of the week rotation produces the most sustained engagement of any thematic unit, with students requesting to continue worksheets beyond the scheduled session time.',
    },
    {
      situation: 'A first-grade teacher wants to connect spelling fluency, analytical reasoning, and narrative composition but finds that teaching these literacy skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated fairy tale literacy unit combining word-scramble literary vocabulary puzzles featuring terms like enchanted, courageous, and kingdom with treasure-hunt multi-step logic activities that require reading comprehension and deductive reasoning. She extends the unit with a creative writing assignment where students compose an alternate ending to a familiar fairy tale, requiring use of at least four vocabulary words from their word-scramble worksheets.',
      outcome: 'Spelling accuracy for literary vocabulary reaches 88 percent as the enchanting fairy tale context motivates sustained practice with challenging multi-syllable words. Treasure-hunt puzzle completion rates increase as students develop the multi-step reasoning skills that connect clue-following to analytical thinking. The alternate ending writing assignment produces the most creative and vocabulary-rich student work of any writing unit, and the teacher reports that connecting spelling, logic puzzles, and creative writing through the fairy tale theme generates authentic literary engagement because every child brings personal fairy tale knowledge that makes them feel confident and invested.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring enchanted castle scenes and fairy tale characters with rich costume and setting detail that provides vivid visual narrative information. Use shadow-match character silhouette activities with high-contrast storybook shapes showing the distinctive outlines of crowns, wands, and magical creatures. Assign draw-and-color activities where children illustrate their own fairy tale scenes, connecting visual creativity to narrative imagination.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with three-picture story sequencing before progressing to longer narrative ordering tasks that require tracking more events and character actions. Reduce word-scramble terms to four-letter fairy tale words like king, wand, and gold before introducing multi-syllable vocabulary like enchanted and courageous. Pair every worksheet with a read-aloud of the related fairy tale so children have narrative context before attempting comprehension or vocabulary tasks, bridging oral story familiarity to paper-based academic work.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with cross-cultural fairy tale comparison projects analyzing how the same story transforms across different traditions with evidence-based analytical essays identifying patterns and cultural values. Assign original fairy tale composition projects with dialogue, descriptive detail, and clear narrative arc following story structure frameworks from exposition through resolution. Extend to literary analysis comparing character motivations across multiple tales with multi-paragraph comparative writing that evaluates heroism, moral reasoning, and narrative technique.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where castles, dragons, crowns, and wands are universally recognized fairy tale imagery that transcends language barriers. Coloring, shadow-match, and picture-path activities communicate through visual narrative rather than text, allowing full participation regardless of English proficiency. Fairy tale character names like king, queen, and prince are among the most recognizable English vocabulary words worldwide due to global exposure to fairy tale media, making this theme exceptionally accessible for ELL students building foundational English vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Fairy tale comprehension and character analysis assessment',
      criteria: 'Give students a short fairy tale passage and a set of five questions. They sequence three story events in correct order, identify one character trait with evidence from the text, predict what would happen if the story continued, and write two sentences explaining the moral or lesson. Assess using a three-level rubric: emerging (sequences at least two events correctly and identifies one character trait), proficient (sequences all three events correctly, identifies a character trait with textual evidence, makes a reasonable prediction, and writes two complete sentences about the moral), advanced (sequences all events with detailed reasoning, identifies multiple character traits with specific textual evidence, makes a prediction grounded in narrative patterns, and writes insightful sentences connecting the moral to broader themes of fairness, courage, or kindness).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one fairy tale worksheet per week over a four-week unit. Compare early and late samples to document growth in narrative comprehension across sequencing and character analysis activities, vocabulary breadth in word puzzles and spelling tasks, fine motor precision in coloring and drawing activities, and logical reasoning quality in puzzle and treasure-hunt tasks. Look specifically for progression from basic character identification to analytical trait discussion, and from simple vocabulary recognition to contextual use of literary terms in writing.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on fairy tale coloring, vocabulary, and puzzle worksheets, note whether they identify fairy tale characters by pointing without verbal labels (Pre-K), name characters and story elements while completing vocabulary and matching activities with verbal explanations of character traits and story events (K\u20131st), or use sophisticated literary vocabulary like narrative, protagonist, and moral in complete sentences while analyzing fairy tale structure with multi-step reasoning about character motivation and thematic meaning (2nd\u20133rd). Record whether children transfer fairy tale comprehension and vocabulary skills to real-world contexts like retelling stories, discussing character decisions in read-alouds, and applying narrative structure knowledge to their own creative writing.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Observation and Prediction Through Story Patterns \u2014 Pattern Recognition, Hypothesis-Forming Thinking & Classification of Narrative Elements)',
      connection: 'Fairy tales teach the scientific thinking skill of predicting outcomes based on observed patterns, as children who notice that events happen in threes, that kindness is rewarded, and that cleverness solves problems develop the pattern recognition and hypothesis-forming thinking that scientific inquiry requires. Classification of fairy tale elements into categories like heroes, villains, magical objects, and settings develops the taxonomic reasoning used in biological classification. The experimental mindset of asking what would happen if a character made a different choice mirrors the scientific method of changing variables to observe different outcomes.',
      activity: 'After completing shadow-match character recognition and word-search fairy tale vocabulary worksheets, guide students through a fairy tale prediction experiment where they read the beginning of an unfamiliar fairy tale, record three predictions about what will happen based on patterns they have observed in other tales, then read the ending and compare their predictions to the actual outcome \u2014 connecting the pattern recognition from worksheet activities to the hypothesis-testing process that scientific inquiry demands.',
    },
    {
      subject: 'Math (Counting and Operations with Narrative Context \u2014 Gold Coin Addition, Treasure-Sharing Division Readiness & Data Collection Across Tale Versions)',
      connection: 'Gold coins provide natural addition and subtraction counters within fairy tale treasure scenarios that make arithmetic feel purposeful. Treasure-sharing scenarios introduce division and fair-sharing concepts through compelling narrative contexts where mathematical accuracy determines whether characters receive equal portions. Comparing quantities of magical objects develops number sense through emotionally engaging counting contexts. Tracking story elements across multiple tale versions introduces data collection and comparison skills that support statistical thinking, as students tally recurring patterns and analyze their frequency.',
      activity: 'After completing image-addition gold coin counting and treasure-hunt multi-step logic worksheets, set up a classroom fairy tale treasure division activity where students receive a bag of paper gold coins and must divide them equally among three fairy tale characters, calculate how many each character receives, determine if there are remainders, and record their solutions \u2014 connecting worksheet arithmetic skills to division readiness through the motivating context of fair treasure distribution.',
    },
    {
      subject: 'Language Arts (Narrative Structure as the Foundation of Reading Comprehension \u2014 Story Grammar Internalization, Character Trait Vocabulary & Original Composition)',
      connection: 'Fairy tales provide the clearest model of beginning, middle, and end that children can internalize as a reading scaffold for all genres, because their predictable narrative patterns create a story grammar framework that transfers to every text students encounter. Character trait vocabulary like courageous, cunning, generous, and treacherous builds the descriptive language that strong writing requires. Retelling fairy tales in their own words develops oral fluency and narrative memory. Writing original fairy tales with dialogue and descriptive detail practices the full range of composition skills that language arts standards demand, from narrative structure and character development to precise word choice and coherent sequencing.',
      activity: 'After completing word-scramble literary vocabulary and alphabet-train letter sequencing worksheets, guide students through an original fairy tale composition project where they plan a story using a beginning-middle-end graphic organizer, write a multi-sentence draft incorporating at least four vocabulary words from their worksheets, revise for narrative coherence and descriptive detail, and share their completed tale with the class \u2014 connecting vocabulary acquisition and phonemic awareness to authentic creative writing through the fairy tale genre that children know and love.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Narrative comprehension focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Literary vocabulary + story structure + character analysis and moral reasoning' },
  ],`;

// ── Furniture: 12 fields ──────────────────────────────────────────────────

const furnitureFields = `
  // -- SEO Enrichment (Part 50) --

  uniqueAngle: 'Furniture is the ONLY theme where the educational content IS spatial reasoning in its purest everyday form \u2014 where every worksheet about positioning chairs, sorting tables by room, comparing shelf sizes, or describing what is on, under, beside, and between objects practices the exact spatial vocabulary, geometric recognition, and positional thinking that mathematics and science require, using objects children physically interact with every moment of every day. No other theme delivers this spatial-reasoning-as-core-curriculum framework, because while shapes teaches geometry as abstract concepts and construction teaches spatial skills through building projects, only furniture embeds spatial reasoning within the immediate personal environment where children sit, sleep, eat, and play \u2014 meaning every worksheet answer can be verified by simply looking around the room, creating an unbroken connection between academic learning and lived experience that no other theme can match. This environmental-verification framework is structurally different from all other themes because furniture worksheets teach spatial concepts that children test and reinforce hundreds of times daily without conscious effort \u2014 every time they pull out a chair, reach for a shelf, or walk around a table, they are practicing the spatial relationships their worksheets formalized, creating a frequency of real-world reinforcement that no other theme can approach. Furniture is also the ONLY theme where preposition mastery is the natural, central learning objective rather than a supplementary benefit \u2014 where describing furniture positions requires the full range of spatial vocabulary from basic terms like on and under to advanced terms like between, behind, and adjacent to, making furniture worksheets the most comprehensive and authentic vehicle for building the spatial language that predicts both mathematical and reading success. The combination of pure spatial reasoning as core content, environmental verification every moment of the day, and comprehensive preposition mastery makes furniture the most spatially foundational and immediately reinforced theme across all 50 available.',

  researchCitation: 'Newcombe, N. S. & Frick, A. (2010). "Early Education for Spatial Intelligence: Why, What, and How." Mind, Brain, and Education, 4(3), 102\u2013111 \u2014 establishing that spatial reasoning skills developed through activities involving object positioning, arrangement, and spatial vocabulary predict mathematical achievement more strongly than verbal abilities alone, and that children who regularly practice describing spatial relationships between everyday objects like furniture demonstrate significantly stronger geometry performance, measurement understanding, and mathematical problem-solving because spatial thinking is a trainable cognitive foundation that furniture-based activities develop through personally meaningful, environmentally reinforced daily practice.',

  snippetDefinition: 'Furniture worksheets for kids are printable educational activities featuring chairs, tables, beds, sofas, shelves, desks, and room layouts designed to build spatial reasoning, geometric recognition, preposition mastery, and functional classification for children ages 3 through 9. They include coloring pages for fine motor development, addition with furniture-item counters, preposition practice with detailed room scenes, matching and shadow-matching for visual discrimination, grid-match for spatial memory, picture-sort for room and function classification, word search for furniture vocabulary, pattern worksheets for arrangement sequences, and odd-one-out puzzles for analytical reasoning.',

  snippetHowTo: [
    'Start with coloring pages of room interiors with multiple furniture pieces to build fine motor control and furniture vocabulary through detailed, familiar illustrations children recognize from their own homes.',
    'Progress to matching-app and shadow-match worksheets where children pair identical furniture items and match furniture silhouettes, developing visual discrimination through the diverse geometric shapes of chairs, tables, and shelves.',
    'Introduce spatial language with prepositions worksheets where children identify and use positional terms like on, under, beside, between, and behind to describe furniture arrangements in detailed room scenes.',
    'Advance to classification with picture-sort worksheets where children sort furniture by room, function, or material, building the multi-attribute categorical thinking that underpins scientific taxonomy.',
    'Incorporate arithmetic with image-addition worksheets using furniture-item counters that connect math operations to room-counting contexts.',
    'Extend to spatial reasoning with grid-match furniture arrangement activities, pattern-worksheet alternating furniture sequences, and odd-one-out analytical puzzles that develop geometric thinking and deductive reasoning.',
    'Connect to real furniture through classroom shape hunts, home room arrangement activities, and shoebox miniature room construction that verify worksheet concepts through hands-on spatial experience in every room of the house.',
  ],

  limitations: 'Furniture worksheets\\u2019 focus on spatial reasoning, geometric recognition, and positional vocabulary provides less direct scope for narrative storytelling, emotional exploration, or biological science than themes like fairy tales, emotions, or nature where plot development, social-emotional learning, and ecological observation drive the activities. The theme\\u2019s strength in spatial vocabulary, classification, and geometry means it offers less material for creative writing, cultural exploration, or performance arts than themes with richer narrative, interpersonal, or artistic dimensions. While furniture is universally familiar, worksheets featuring specific furniture styles may reflect certain cultural or economic contexts, and teachers should discuss how homes and furniture vary across cultures and communities.',

  themeComparisons: [
    {
      vsThemeId: 'household',
      summary: 'Furniture worksheets provide a theme focusing specifically on the design, shapes, and spatial arrangement of individual furniture pieces with geometry, size comparison, and positional vocabulary as the primary learning objectives. Household worksheets provide a broader domestic-life theme studying the entire home including rooms, daily routines, safety, and household objects across all aspects of living. Furniture teaches spatial reasoning through individual objects; household teaches domestic life broadly.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Furniture worksheets provide a theme where geometry emerges naturally from real three-dimensional furniture objects that children can see and touch in every room \u2014 rectangular table tops, circular clocks, cylindrical legs \u2014 within practical spatial arrangement contexts. Shapes worksheets provide a focused geometry theme studying shape identification, properties, and spatial relationships as abstract mathematical concepts. Furniture teaches geometry through real objects; shapes teaches geometry as mathematical abstraction.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Furniture worksheets provide a theme studying how completed structures are arranged, classified, and described in spatial terms within interior design and room organization contexts. Construction worksheets provide a theme studying how structures are built from raw materials through engineering processes, measurement, and sequential construction planning. Furniture teaches how things are arranged in spaces; construction teaches how things are built.',
    },
    {
      vsThemeId: 'school',
      summary: 'Furniture worksheets provide a theme studying the objects that fill learning and living spaces through spatial arrangement, geometric analysis, and functional classification of chairs, desks, and shelves. School worksheets provide a theme studying the academic environment itself through classroom routines, school supplies, and learning activities. Furniture teaches about the objects in rooms; school teaches about what happens in rooms.',
    },
  ],

  productLinks: [
    {
      appId: 'prepositions',
      anchorText: 'Furniture preposition worksheets for kids',
      context: 'Spatial vocabulary and positional reasoning develop when children describe furniture arrangements using precise prepositions in our furniture preposition worksheets for kids, identifying what is on the table, under the chair, beside the shelf, and between the beds \u2014 building the comprehensive spatial language that connects everyday furniture observation to the geometry, map reading, and descriptive writing skills that academic success requires.',
    },
    {
      appId: 'grid-match',
      anchorText: 'Furniture grid matching worksheets printable',
      context: 'Spatial memory and pattern reproduction develop when children recreate furniture arrangement patterns on blank grids in our furniture grid matching worksheets printable, analyzing the positions of chairs, tables, and shelves in reference grids and reproducing them accurately \u2014 building the spatial visualization and working memory skills that connect grid-based activities to the geometric reasoning and coordinate thinking that mathematics demands.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'Furniture sorting worksheets for kindergarten',
      context: 'Classification reasoning and categorical thinking develop when children sort furniture items by room, function, or material in our furniture sorting worksheets for kindergarten, organizing chairs, tables, beds, and shelves into meaningful groups \u2014 building the multi-attribute sorting skills and functional vocabulary that connect structured classification practice to the scientific taxonomy and analytical reasoning that academic curricula require.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Furniture shadow matching worksheets for preschool',
      context: 'Visual discrimination and geometric shape recognition develop when children match furniture items to their silhouettes in our furniture shadow matching worksheets for preschool, analyzing the distinctive outlines of chairs, tables, beds, and shelves \u2014 building the figure-ground discrimination and shape awareness that connect silhouette matching to the spatial reasoning and geometry readiness that early mathematics requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and shape recognition in her three- and four-year-olds using a theme where the diverse geometric shapes of familiar furniture items provide varied matching targets for children building spatial awareness.',
      solution: 'She introduces coloring pages of room interiors with multiple furniture pieces alongside shadow-match worksheets where the diverse geometric shapes of chairs, tables, beds, and shelves provide varied matching targets for three-year-old spatial discrimination development. Children color detailed room illustrations while naming furniture items and their functions, then match each furniture silhouette to its original image. Every worksheet session ends with a real-object identification activity where children point to classroom furniture that matches items from their worksheet.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of furniture items with their varied geometric profiles. Fine motor control develops through coloring the straight lines of bookshelves, the curved shapes of armchairs, and the rectangular forms of tables and desks. The teacher reports that the real-object identification activity becomes a favorite classroom routine, with children spontaneously naming furniture shapes during transitions and pointing out rectangular table tops, cylindrical chair legs, and circular clock faces throughout the school day.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate spatial language with categorical thinking and arithmetic but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs prepositions worksheets with detailed room scenes alongside picture-sort room classification activities and matching-app furniture pairing exercises, creating integrated sessions through a classroom furniture detective unit where students describe furniture positions using five different prepositions, sort illustrated items by room, and match furniture pairs. She extends with image-addition furniture counting exercises that build arithmetic within the spatial context students have been exploring.',
      outcome: 'Preposition usage accuracy reaches 90 percent as students practice describing furniture positions using on, under, beside, between, and behind within meaningful room contexts. Classification skills strengthen as students sort furniture by room and function within the detective unit context. Furniture matching accuracy improves as the geometric variety of furniture shapes provides clear visual discrimination targets. The teacher reports that five students begin spontaneously using spatial vocabulary during other subjects, describing where materials are located using precise prepositions they learned from furniture worksheets.',
    },
    {
      situation: 'A first-grade teacher wants to connect spatial reasoning, domain-specific vocabulary, and descriptive writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated room design unit combining grid-match furniture arrangement activities with word-search furniture vocabulary featuring terms like bookshelf, wardrobe, nightstand, and armchair. She extends the unit with a descriptive writing assignment where students design their dream bedroom on graph paper and write a paragraph explaining their furniture placement choices using at least five prepositions.',
      outcome: 'Grid-match spatial accuracy reaches 87 percent as the furniture arrangement context motivates sustained spatial reasoning practice. Furniture vocabulary usage increases substantially as students encounter the terms in word searches and then apply them in their descriptive writing. The dream bedroom design assignment produces the most detailed and spatially organized student work of any writing unit, and the teacher reports that connecting spatial reasoning, vocabulary, and descriptive writing through the furniture theme generates authentic engagement because every child is the expert on their own room and furniture preferences.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed room interior scenes with multiple furniture pieces and spatial relationships that provide rich visual spatial information. Use shadow-match furniture silhouette activities with high-contrast geometric shapes showing the distinctive outlines of chairs, beds, and shelves. Assign grid-match furniture arrangement activities with clear grid lines and color-coded items that make spatial patterns visually explicit.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with two basic prepositions \u2014 on and under \u2014 before introducing between, behind, and beside that require more complex spatial reasoning. Reduce classification to single-attribute sorting like sort by room before introducing multi-attribute tasks that require considering function and material simultaneously. Pair every worksheet with real furniture in the classroom or a dollhouse so children can physically position objects before describing spatial relationships on paper, bridging concrete spatial experience to abstract representation.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with scaled room design projects on graph paper where students calculate whether furniture fits within specific dimensions using measurement and area concepts. Assign multi-attribute Venn diagram classification projects sorting furniture by three criteria simultaneously including room, function, and material. Extend to furniture design history research reports comparing styles across cultures and centuries with evidence from multiple sources and organized multi-paragraph writing.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where chairs, tables, beds, and shelves are universally recognized furniture items found in every home regardless of cultural background. Coloring, shadow-match, and grid-match activities communicate through spatial patterns rather than text, allowing full participation regardless of English proficiency. Basic furniture words like chair, table, and bed are among the first practical nouns taught in any language program because children need these terms for daily communication about their environment, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Furniture spatial reasoning and classification assessment',
      criteria: 'Give students a room illustration showing eight furniture items and a set of five questions. They name each item, describe the position of three items using different prepositions, sort the items into two functional categories, identify one geometric shape within a furniture piece, and write two sentences explaining why a specific item belongs in that room. Assess using a three-level rubric: emerging (names at least five items and describes positions of two items using basic prepositions), proficient (names all items, describes three positions using varied prepositions, sorts into two categories with brief reasoning, identifies one shape, and writes two complete sentences about room placement), advanced (names all items with precise vocabulary, describes positions using five or more prepositions, sorts into functional categories with detailed reasoning, identifies multiple geometric shapes with property descriptions, and writes insightful sentences connecting furniture placement to spatial function and room purpose).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one furniture worksheet per week over a four-week unit. Compare early and late samples to document growth in spatial vocabulary accuracy across preposition and description activities, classification sophistication in sorting tasks, geometric recognition within furniture illustration analysis, and fine motor precision in coloring and grid activities. Look specifically for progression from basic preposition use to complex spatial descriptions with multiple positional terms, and from single-attribute sorting to multi-criteria functional classification.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on furniture coloring, preposition, and classification worksheets, note whether they identify furniture items by pointing without verbal labels (Pre-K), name furniture and describe positions using basic prepositions while sorting by room with verbal reasoning explanations (K\u20131st), or use sophisticated spatial vocabulary like adjacent, perpendicular, and symmetrical in complete sentences while analyzing furniture design with multi-step geometric and functional reasoning (2nd\u20133rd). Record whether children transfer furniture spatial vocabulary and classification skills to real-world contexts like describing classroom arrangement, organizing their desk area, and using precise prepositions in other academic subjects.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Geometry in the Physical World and Materials Science \u2014 Structural Purposes of Different Materials, Form-to-Function Relationships & Engineering Design Thinking)',
      connection: 'Understanding that furniture embodies geometric shapes children can see and touch daily, that rectangular surfaces provide stable work areas while cylindrical legs distribute weight, and that different materials like wood, metal, and fabric serve different structural and comfort purposes develops scientific observation and materials-science reasoning. Engineering design thinking emerges through discussing why furniture is built certain ways, connecting form to function through the structural analysis of everyday objects that children interact with physically throughout every day.',
      activity: 'After completing shadow-match furniture silhouette and grid-match arrangement worksheets, guide students through a furniture materials investigation where they examine three classroom furniture items, identify what each is made of, discuss why that material was chosen for that purpose, and record their observations in a simple science journal \u2014 connecting the geometric shape recognition from worksheet activities to the engineering design principle that materials and shapes serve specific structural purposes.',
    },
    {
      subject: 'Math (Spatial Reasoning as Mathematical Foundation \u2014 Preposition Practice for Geometry Vocabulary, Room Layout for Spatial Visualization & Counting Furniture Groups for Multiplication Readiness)',
      connection: 'Preposition practice builds the spatial vocabulary that geometry and coordinate systems require, as the positional language of on, under, beside, between, and behind directly develops the spatial reasoning that mathematical thinking demands. Room layout activities develop spatial visualization and mental rotation skills that predict geometry success. Size ordering builds measurement and seriation skills through concrete furniture comparisons. Counting furniture groups introduces multiplication readiness through repeated addition in authentic room-counting contexts, and calculating area and perimeter of furniture surfaces provides concrete models for abstract geometry concepts.',
      activity: 'After completing prepositions room scene and image-addition furniture counting worksheets, set up a classroom furniture measurement station where students measure the length and width of three pieces of classroom furniture using rulers, record the measurements in a data table, calculate the perimeter of each surface by adding all sides, and compare which furniture piece has the largest perimeter \u2014 connecting worksheet spatial vocabulary and counting skills to authentic measurement and geometry through the motivating context of analyzing the furniture they use every day.',
    },
    {
      subject: 'Language Arts (Spatial Vocabulary as Descriptive Writing Foundation \u2014 Preposition Mastery for Precise Composition, Furniture Vocabulary for Functional Word Banks & Persuasive Writing About Arrangement Choices)',
      connection: 'Mastering prepositions like on, under, beside, between, behind, and above builds the precise positional language that descriptive and informational writing requires, because spatial vocabulary is the foundation of clear, specific description. Furniture vocabulary including bookshelf, wardrobe, nightstand, and armchair expands functional word banks with practical terms children use in daily communication. Descriptive writing about room layouts develops organized composition using spatial terms as structural elements. Persuasive writing about furniture arrangement choices builds evidence-based argumentation with authentic spatial reasoning as the subject matter.',
      activity: 'After completing word-search furniture vocabulary and prepositions room description worksheets, guide students through a descriptive writing project where they choose a room in their home or school, list every piece of furniture they can remember, describe the position of each item using at least three different prepositions, and write an organized paragraph that would help a reader visualize the room layout \u2014 connecting vocabulary acquisition and spatial language to authentic descriptive writing through the personally meaningful context of describing spaces children know intimately.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Spatial reasoning and geometry focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Preposition mastery + geometric recognition + functional classification vocabulary' },
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

console.log('Part 50: Enriching fairy-tales & furniture theme hub pages...\n');

console.log('1. Injecting 12 fields into fairy-tales/en.ts...');
injectFields(path.join(base, 'fairy-tales', 'en.ts'), fairyTalesFields);

console.log('2. Injecting 12 fields into furniture/en.ts...');
injectFields(path.join(base, 'furniture', 'en.ts'), furnitureFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
