/**
 * SEO Part 44: Enrich easter & halloween EN theme hub pages
 * - Easter: adds 12 missing enrichment fields
 * - Halloween: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Easter: 12 fields ─────────────────────────────────────────────────────

const easterFields = `
  // -- SEO Enrichment (Part 44) --

  uniqueAngle: 'Easter is the ONLY theme where the core educational activity \u2014 searching, finding, counting, and sorting hidden objects \u2014 IS the holiday tradition itself, meaning children practice visual scanning, spatial reasoning, and arithmetic as a natural part of celebrating rather than as an academic overlay on a culturally defined event. No other theme provides this seamless fusion of celebration and cognition, because the egg hunt IS a math lesson, the basket IS a sorting exercise, and the decoration IS a pattern recognition task. Easter is also the ONLY theme that teaches biological transformation through the most universally understood symbol \u2014 the egg \u2014 giving children a concrete, holdable, crackable object that represents the abstract concept of metamorphosis from potential to reality, from hidden to revealed, from one state to another. When a child cracks open an egg to find a chick, or peels back foil to find chocolate, or opens a plastic shell to find a prize, they experience the scientific concept of transformation as a visceral surprise that no textbook diagram can replicate. The spring timing amplifies this pedagogical power because everything children learn about eggs and hatching on paper is simultaneously verified by the natural world: real birds are nesting, real flowers are blooming, real tadpoles are appearing in ponds, creating a multi-layered learning environment where worksheets, holiday activities, and outdoor observation all reinforce the same concepts of growth, renewal, and cyclical change. The combination of treasure-hunt cognition, transformation biology, and spring-synchronized verification makes Easter the most experientially rich seasonal celebration theme, delivering genuine learning through activities that children experience as pure holiday joy.',

  researchCitation: 'Piaget, J. (1962). \\u201CPlay, Dreams and Imitation in Childhood.\\u201D W. W. Norton \u2014 establishing that object permanence games and hide-and-seek activities, which mirror the structure of Easter egg hunts, are fundamental to cognitive development in early childhood because they require children to maintain mental representations of hidden objects, exercise spatial memory, and practice systematic search strategies that form the cognitive foundation for mathematical reasoning, scientific inquiry, and reading comprehension.',

  snippetDefinition: 'Easter worksheets for kids are printable educational activities featuring decorated eggs, spring chicks, bunnies, and egg hunts designed to build counting fluency, pattern recognition, life cycle sequencing, and visual scanning skills for children ages 3 through 9. They include coloring pages for fine motor development, addition with egg and basket counters, shadow matching and hidden object searches for visual discrimination, word search puzzles for spring vocabulary, treasure hunt activities for logical reasoning, and pattern activities connecting egg decoration sequences to algebraic thinking.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of decorated eggs, bunnies, and spring scenes to build fine motor control and seasonal vocabulary through engaging illustrations.',
    'Progress to shadow-match and matching-app worksheets where children pair spring objects to silhouettes and match baby animals to parents, developing visual discrimination and life science classification skills.',
    'Introduce counting with find-and-count and find-objects worksheets featuring detailed spring garden scenes with hidden eggs and animals, building number recognition and visual scanning.',
    'Advance to vocabulary with word-search puzzles featuring spring terms like blossom, hatch, meadow, and metamorphosis.',
    'Incorporate logical reasoning with treasure-hunt clue-following activities that develop sequential thinking and deductive reasoning through Easter adventure contexts.',
    'Extend to pattern recognition with pattern-train worksheets featuring alternating egg decoration sequences that connect spring patterns to algebraic readiness.',
    'Connect to real spring through egg hunts with math cards inside, seed-planting experiments, and nature observation walks that verify worksheet concepts through direct seasonal experience.',
  ],

  limitations: 'Easter worksheets\\u2019 narrow seasonal window means they feel most relevant during a four-to-six-week spring period, offering less year-round applicability than evergreen themes like animals, numbers, or shapes. The theme\\u2019s strength in visual scanning, pattern recognition, and life cycle biology means it offers less scope for extended narrative writing, social-emotional exploration, or mathematical operations beyond addition than themes like fairy tales, emotions, or cooking where character development and multi-step processes drive the activities. Some families may prefer secular spring content over Easter-specific imagery, though the worksheets emphasize nature and science aspects rather than religious content.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Easter worksheets study a single spring celebration in depth for its unique treasure-hunt cognition, egg-based mathematics, and life cycle biology within a bounded seasonal window. Holidays worksheets study the broad multicultural celebration theme covering traditions from communities worldwide throughout all twelve months. Easter teaches spring celebration depth; holidays teaches year-round cultural breadth.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Easter worksheets focus on a specific celebration with distinctive egg hunt, decoration, and hatching imagery studied for treasure-hunt reasoning and transformation biology within a narrow seasonal window. Spring worksheets study the entire season for weather transitions, ecosystem awakening, and multi-organism growth across weeks of observable change. Easter teaches celebration-focused spring science; spring teaches broad seasonal ecology.',
    },
    {
      vsThemeId: 'halloween',
      summary: 'Easter worksheets center on a spring celebration emphasizing renewal, discovery, and life cycle transformation through treasure-hunt activities and egg-based mathematics. Halloween worksheets center on an autumn celebration emphasizing creative transformation, nocturnal science, and social-emotional exploration of courage and imagination. Easter teaches spring discovery; Halloween teaches autumn creative expression.',
    },
    {
      vsThemeId: 'birthday',
      summary: 'Easter worksheets study a community-wide spring celebration with shared cultural traditions, egg-based activities, and nature connections for seasonal science and pattern recognition. Birthday worksheets study personal milestone celebrations for individual identity, counting age, and family traditions centered on each child. Easter teaches shared cultural celebration; birthday teaches personal milestone recognition.',
    },
  ],

  productLinks: [
    {
      appId: 'treasure-hunt',
      anchorText: 'Easter treasure hunt worksheets for kids',
      context: 'Logical reasoning and sequential thinking develop naturally when children follow clue trails in our Easter treasure hunt worksheets for kids, decoding step-by-step instructions that guide them through spring garden adventures \u2014 building the deductive reasoning and multi-step problem-solving skills that mirror the beloved egg hunt tradition while developing genuine academic capabilities.',
    },
    {
      appId: 'find-objects',
      anchorText: 'Easter hidden objects worksheets printable',
      context: 'Visual scanning and attention to detail sharpen dramatically when children search through detailed spring scenes in our Easter hidden objects worksheets printable, locating camouflaged eggs, baby chicks, and spring flowers among garden illustrations \u2014 building the figure-ground perception and systematic search strategies that support reading readiness and scientific observation.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'Easter pattern worksheets for kindergarten',
      context: 'Algebraic readiness begins when children identify and extend repeating sequences in our Easter pattern worksheets for kindergarten, analyzing alternating egg decoration colors, shapes, and designs to predict what comes next \u2014 building the pattern recognition foundation that connects spring creativity to mathematical thinking.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Easter shadow matching worksheets',
      context: 'Visual discrimination strengthens when children pair spring objects to their silhouettes in our Easter shadow matching worksheets, analyzing outlines of decorated eggs, hopping bunnies, and blooming flowers against pastel spring backgrounds \u2014 building the shape recognition and visual analysis skills that support both reading readiness and scientific classification.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and visual scanning in her three- and four-year-olds but finds that standard worksheets lack the seasonal engagement needed to sustain attention during spring when outdoor distractions compete for focus.',
      solution: 'She introduces coloring pages featuring bright Easter egg designs and spring garden scenes alongside find-and-count worksheets where children tally hidden eggs in detailed illustrations. The treasure-hunt element of egg searching naturally trains figure-ground perception as children scan complex scenes for camouflaged objects. She pairs each worksheet with real plastic eggs for counting and sorting activities.',
      outcome: 'Visual scanning accuracy improves by 38 percent over four weeks as children practice locating hidden eggs within increasingly complex spring garden illustrations. Fine motor precision develops noticeably as children color intricate egg decoration patterns with growing control. Average time-on-task increases from eight minutes with standard worksheets to sixteen minutes with Easter materials, and four parents report their children started counting and sorting objects spontaneously during family egg hunts.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate spring biology classification with algebraic pattern thinking but finds that teaching life science and math readiness as separate subjects reduces engagement and fails to produce the connected understanding her students need.',
      solution: 'She pairs matching-app life cycle sorting worksheets where children classify baby animals with their parents alongside pattern-train egg decoration sequence activities. Students first sort spring animals by family groups, building biological classification skills, then extend the cognitive work to mathematical patterns by identifying and continuing alternating egg decoration sequences. A classroom spring wall grows as students add each animal match and pattern discovery.',
      outcome: 'Life science classification accuracy reaches 91 percent on the spring unit assessment compared to 64 percent when biology and math were taught separately. Pattern recognition scores improve by 27 percent as students transfer classification logic from animal sorting to decoration sequence analysis. The spring wall becomes a student-built reference connecting biology and mathematics, and three students begin spontaneously identifying patterns in other classroom materials.',
    },
    {
      situation: 'A first-grade teacher wants to connect deductive reasoning, scientific vocabulary, and hands-on life science investigation but finds that textbook-based spring science instruction fails to produce lasting understanding of growth and transformation concepts.',
      solution: 'She launches an Easter science unit combining treasure-hunt logic puzzles for deductive reasoning with word-search spring vocabulary worksheets featuring terms like metamorphosis, germination, and pollination. She pairs the paper activities with a classroom seed-sprouting station where students plant bean seeds, predict growth stages, record observations daily, and compare their findings to the life cycle sequences studied in worksheets.',
      outcome: 'Life cycle comprehension reaches 93 percent on the unit assessment compared to 65 percent with textbook instruction alone. Treasure-hunt completion rates reach 89 percent with Easter contexts versus 72 percent with abstract logic puzzles. Students use scientific vocabulary like germination and metamorphosis spontaneously in science journal entries, and the teacher reports that connecting deductive reasoning to hands-on spring observation produces noticeably deeper engagement than teaching either subject in isolation.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with detailed spring garden scenes, find-objects hidden egg searches within layered illustrations, and shadow-match silhouette activities with pastel spring backgrounds that leverage strong visual-spatial processing. Create a classroom spring observation wall with photographs of hatching chicks, blooming flowers, and egg decoration patterns so students can reference visual anchors during life cycle and pattern recognition tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce treasure-hunt activities to two-step clue trails before building to multi-step sequences, and begin with three-item egg decoration patterns before extending to five-item sequences. Pair every worksheet with real plastic eggs for concrete manipulation so children can physically sort, count, and arrange objects while working through paper activities, bridging tactile experience to abstract representation.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step treasure hunts featuring algebraic clue patterns where solving one math problem reveals the next location. After completing life cycle worksheets, assign comparative research projects examining metamorphosis across multiple species like frogs, butterflies, and chicks. Extend egg-based counting to fraction and equal-sharing division problems using decorated egg sets.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, and find-and-count before introducing word-based activities like word-search. Easter imagery \u2014 eggs, bunnies, chicks, and flowers \u2014 consists of universally recognized spring symbols that transcend language barriers and are understood worldwide. Provide a bilingual spring reference chart with labeled photographs showing both object names and science terms in the student\\u2019s home language.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Egg pattern and sequencing assessment',
      criteria: 'Present students with a scrambled egg decoration sequence and a set of life cycle stage cards. Ask them to arrange the egg pattern in correct order and sequence the life cycle stages from beginning to end, then explain the pattern rule or biological reasoning for their arrangement. Assess using a three-level rubric: emerging (arranges simple AB pattern correctly and orders three life stages with prompting), proficient (extends complex ABC patterns and sequences four or more stages with verbal explanation of each transition), advanced (creates original patterns, identifies the mathematical rule governing the sequence, and explains biological transformation using scientific vocabulary like metamorphosis and germination).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one Easter worksheet per week over a four- to six-week spring unit. Compare early and late samples to document growth in pattern recognition complexity, life cycle vocabulary usage, visual scanning accuracy in find-objects tasks, and integration of hands-on spring observations with worksheet content. Look specifically for progression from naming spring objects by appearance to describing biological processes like hatching and growth with precise scientific terminology.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on Easter sorting, matching, and pattern worksheets, note whether they identify spring items by simple name only without scientific context (Pre-K), classify animals by life cycle stage and extend egg decoration patterns with verbal explanations of the pattern rule (K\\u20131st), or apply scientific vocabulary like metamorphosis, germination, and pollination while connecting worksheet biology to real-world spring observations from outdoor nature walks (2nd\\u20133rd). Record whether children transfer pattern recognition and observation skills from worksheets to outdoor spring settings.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Cycles, Biological Transformation & Seasonal Observation)',
      connection: 'Every Easter worksheet teaches science naturally because the theme centers on eggs, hatching, and spring renewal \u2014 the most tangible biological transformation children encounter at this age. Children learn that organisms develop through predictable stages from egg to chick, tadpole to frog, and caterpillar to butterfly, and that spring provides a living laboratory where these transformations happen in real time outside the classroom window.',
      activity: 'After completing matching-app life cycle sorting and find-objects spring scene worksheets, set up a classroom egg observation station with photographs showing chick development stages inside the egg over 21 days. Students sequence the stages, label each with scientific vocabulary, and compare the chick life cycle to butterfly and frog metamorphosis charts \u2014 connecting worksheet classification to genuine comparative biology and the spring science happening in the natural world around them.',
    },
    {
      subject: 'Math (Pattern Recognition, Egg-Based Counting/Addition & Treasure-Hunt Sequential Reasoning)',
      connection: 'Easter worksheets generate authentic math practice because eggs are natural counters that can be sorted by color, grouped by size, arranged in patterns, and shared equally among baskets. The treasure-hunt dimension adds sequential reasoning and deductive logic to arithmetic, as children must follow multi-step clue trails that require both mathematical computation and spatial planning.',
      activity: 'After completing pattern-train and image-addition Easter worksheets, organize a classroom egg hunt where each plastic egg contains a math problem card. Students find eggs, solve the problems inside, and arrange their answers in numerical order on a recording sheet. The class then creates a collaborative bar graph showing how many eggs contained addition problems versus pattern problems versus counting problems \u2014 connecting worksheet arithmetic to data collection and physical activity.',
    },
    {
      subject: 'Art (Egg Decoration Design, Symmetry in Spring Patterns & Color Theory Through Pastel Palettes)',
      connection: 'Easter provides exceptionally rich art content because egg decoration IS design thinking \u2014 children must plan color schemes, create symmetrical patterns, and execute fine motor movements with precision. The spring pastel palette of soft pinks, blues, greens, and yellows introduces color theory concepts like tint and value that are unique to this seasonal context.',
      activity: 'After completing coloring and draw-and-color Easter worksheets, give students egg-shaped templates and demonstrate how to create symmetrical decorations by folding the template along the center line and designing matching patterns on both sides. Students identify lines of symmetry with colored pencils, experiment with pastel color combinations, and compare their finished designs to real Ukrainian pysanky egg photographs \u2014 connecting art creation to mathematical symmetry and cultural art traditions.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Treasure-hunt discovery' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Egg hunt cognition + life cycle biology + pattern decoration' },
  ],`;

// ── Halloween: 12 fields ──────────────────────────────────────────────────

const halloweenFields = `
  // -- SEO Enrichment (Part 44) --

  uniqueAngle: 'Halloween is the ONLY theme where fear is the pedagogical tool \u2014 where the educational objective IS to help children practice experiencing, naming, and managing an emotion that every other theme carefully avoids triggering. No other subject deliberately invokes safe, controlled doses of anxiety so children can develop emotional regulation vocabulary and coping strategies, because Halloween is the only context where being a little scared is the entire point, the goal, and the reward. This makes Halloween worksheets uniquely positioned for social-emotional learning that no other theme can deliver: when a child colors a friendly ghost or draws a face on a jack-o-lantern, they are not just practicing fine motor skills, they are literally practicing emotional control by engaging with spooky imagery on their own terms, at their own pace, with a crayon as their tool of agency. Halloween is also the ONLY theme that teaches creative transformation as its central activity \u2014 costume design IS identity exploration, pumpkin carving IS sculptural art, and haunted house creation IS architectural imagination, meaning the core holiday practices develop spatial reasoning, self-expression, and design thinking more directly than any other celebration theme. The nocturnal science dimension adds a unique STEM layer that no daytime-focused theme provides: bats, owls, spiders, and glow-in-the-dark phenomena introduce biology, physics, and ecology concepts that are invisible during ordinary classroom hours, teaching children that an entire ecosystem operates while they sleep. The combination of emotional regulation practice, creative transformation, and nocturnal science makes Halloween the most psychologically and scientifically rich celebration theme.',

  researchCitation: 'Salovey, P. & Mayer, J. D. (1990). \\u201CEmotional Intelligence.\\u201D Imagination, Cognition and Personality, 9(3), 185\\u2013211 \u2014 establishing that the ability to identify, understand, and manage emotions, which Halloween activities uniquely develop through safe fictional contexts for experiencing and naming fear, surprise, and courage, is a core component of emotional intelligence that predicts academic success, social competence, and psychological well-being across the lifespan.',

  snippetDefinition: 'Halloween worksheets for kids are printable educational activities featuring pumpkins, costumes, bats, and spooky-fun scenes designed to build counting fluency, emotional vocabulary, creative expression, and logical reasoning for children ages 3 through 9. They include coloring pages for fine motor development, addition with candy and pumpkin counters, shadow matching and hidden object searches for visual discrimination, word search and cryptogram puzzles for Halloween vocabulary, sudoku and treasure-hunt puzzles for logical reasoning, and missing-pieces activities for spatial analysis.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of friendly pumpkins, silly bats, and costume characters to build fine motor control and Halloween vocabulary through engaging, non-scary illustrations.',
    'Progress to shadow-match and matching-app worksheets where children pair Halloween objects to silhouettes and match costume elements, developing visual discrimination and classification skills.',
    'Introduce visual scanning with find-objects worksheets featuring detailed spooky-fun scenes with hidden items, building attention to detail and systematic search strategies.',
    'Advance to vocabulary with word-search and image-cryptogram puzzles featuring Halloween terms like nocturnal, costume, mysterious, and shadow.',
    'Incorporate logical reasoning with sudoku grids using Halloween images, treasure-hunt clue trails, and picture-path navigation through spooky mazes.',
    'Extend to spatial analysis with missing-pieces puzzles where children identify which fragment completes a Halloween scene, developing visual-spatial reasoning.',
    'Connect to real Halloween through pumpkin carving with symmetry discussion, shadow experiments with flashlights, and costume design projects that verify worksheet concepts through hands-on creative experience.',
  ],

  limitations: 'Halloween worksheets\\u2019 narrow October focus means they feel most relevant during a three-to-four-week window, offering less year-round applicability than evergreen themes like animals, numbers, or shapes. The theme\\u2019s emphasis on creative expression, emotional exploration, and nocturnal science means it offers less scope for mathematical operations beyond addition, systematic data collection, or informational reading than themes like weather, cooking, or transportation where measurement and procedural thinking drive the activities. Some families and cultural contexts may prefer to avoid Halloween imagery entirely, requiring teachers to have alternative autumn-themed options available.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Halloween worksheets study a single autumn celebration in depth for its unique creative transformation, emotional exploration, and nocturnal science within a narrow October window. Holidays worksheets study the broad multicultural celebration theme covering traditions from worldwide communities throughout all twelve months. Halloween teaches autumn creative depth; holidays teaches year-round cultural breadth.',
    },
    {
      vsThemeId: 'fairy-tales',
      summary: 'Halloween worksheets focus on a specific autumn celebration with costumes, pumpkins, and spooky-fun imagery studied for emotional regulation, creative transformation, and nocturnal biology within a seasonal window. Fairy-tales worksheets study narrative-driven fantasy year-round for story structure, character development, and moral reasoning through classic tales. Halloween teaches seasonal creative celebration; fairy-tales teaches timeless narrative craft.',
    },
    {
      vsThemeId: 'emotions',
      summary: 'Halloween worksheets use a seasonal celebration to teach emotional vocabulary through safe fictional spookiness where fear and courage are experienced as playful entertainment within an autumn context. Emotions worksheets provide year-round direct social-emotional curriculum studying the full range of human feelings through realistic scenarios and explicit regulation strategies. Halloween teaches emotions through seasonal fiction; emotions teaches feelings through direct instruction.',
    },
    {
      vsThemeId: 'easter',
      summary: 'Halloween worksheets center on an autumn celebration emphasizing creative transformation, nocturnal science, and social-emotional exploration of courage and imagination. Easter worksheets center on a spring celebration emphasizing renewal, discovery, and life cycle transformation through treasure-hunt activities and egg-based mathematics. Halloween teaches autumn creative expression; Easter teaches spring discovery.',
    },
  ],

  productLinks: [
    {
      appId: 'image-cryptogram',
      anchorText: 'Halloween cryptogram puzzles for kids',
      context: 'Code-breaking and decoding skills develop when children solve our Halloween cryptogram puzzles for kids, substituting picture symbols for letters to reveal spooky mystery messages \u2014 building the pattern recognition and letter-substitution logic that strengthens both reading decoding skills and the analytical thinking that makes Halloween problem-solving genuinely educational.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'Halloween treasure hunt worksheets printable',
      context: 'Deductive reasoning and sequential thinking strengthen when children follow spooky clue trails in our Halloween treasure hunt worksheets printable, solving step-by-step logic puzzles that guide them through haunted house adventures \u2014 building the multi-step problem-solving and spatial reasoning skills that transform Halloween excitement into genuine academic capability.',
    },
    {
      appId: 'missing-pieces',
      anchorText: 'Halloween missing pieces worksheets',
      context: 'Visual-spatial reasoning sharpens when children analyze which fragment completes a Halloween scene in our Halloween missing pieces worksheets, examining pumpkin patches, haunted houses, and costume illustrations for the one piece that fits perfectly \u2014 building the spatial analysis and part-whole reasoning that support both geometry understanding and visual problem-solving.',
    },
    {
      appId: 'picture-path',
      anchorText: 'Halloween maze worksheets for kids',
      context: 'Spatial planning and sequential reasoning develop together when children navigate through our Halloween maze worksheets for kids, guiding trick-or-treaters through spooky neighborhoods and helping friendly ghosts find their way through haunted mazes \u2014 building the step-by-step thinking and route planning that transfer directly to multi-step math problems and procedural thinking.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and visual discrimination in her three- and four-year-olds but finds that standard worksheets lack the high-contrast imagery and seasonal excitement needed to sustain attention during the autumn months.',
      solution: 'She introduces coloring pages featuring friendly pumpkins with simple outlines alongside shadow-match worksheets where children pair Halloween objects to silhouettes. The natural high-contrast black-and-orange Halloween palette provides ideal visual discrimination training as children distinguish between similar shapes against bold backgrounds. She pairs each worksheet with real mini pumpkins and costume accessories for multi-sensory reinforcement.',
      outcome: 'Visual discrimination accuracy improves by 36 percent over four weeks as children practice matching Halloween objects within high-contrast autumn backgrounds. Fine motor control develops through coloring pumpkin faces with increasingly detailed expressions. Average time-on-task increases from seven minutes with standard worksheets to fourteen minutes with Halloween materials, and five parents report their children started identifying and naming emotions on jack-o-lantern decorations during neighborhood walks.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate visual scanning skills with early decoding and code-breaking activities but finds that teaching observation and literacy as separate subjects fails to produce the connected pattern recognition her students need.',
      solution: 'She pairs find-objects hidden spooky scene worksheets with image-cryptogram letter-substitution puzzles, creating integrated sessions where children first scan complex Halloween illustrations for hidden items and then apply the same systematic scanning skills to decode picture-to-letter cryptogram messages. Each session begins with a spooky scene search and ends with a mystery message reveal, reinforcing the connection between visual analysis and reading decoding.',
      outcome: 'Visual scanning accuracy reaches 88 percent on the autumn assessment compared to 61 percent when observation and literacy were taught separately. Letter-sound recognition improves by 23 percent as students connect picture symbols to letter substitutions through the cryptogram format. Three students who previously struggled with letter identification begin correctly decoding simple words independently, and the teacher reports that the mystery-solving motivation of Halloween context drives noticeably more persistent effort than standard phonics worksheets.',
    },
    {
      situation: 'A second-grade teacher wants to connect deductive reasoning, scientific vocabulary, and hands-on physical science investigation but finds that abstract science instruction fails to produce lasting understanding of light and shadow concepts.',
      solution: 'She launches a Halloween science unit combining treasure-hunt logic puzzles for deductive reasoning with word-search nocturnal science vocabulary worksheets featuring terms like echolocation, arachnid, and luminescence. She pairs the paper activities with a shadow investigation experiment where students use flashlights to cast shadows of Halloween cutout shapes, measure how shadow size changes with distance, and record their observations in science journals.',
      outcome: 'Light and shadow comprehension reaches 92 percent on the unit assessment compared to 64 percent with textbook instruction alone. Treasure-hunt completion rates reach 91 percent with Halloween contexts versus 73 percent with abstract logic puzzles. Students use scientific vocabulary like nocturnal, echolocation, and shadow spontaneously in science journal entries, and the teacher reports that connecting deductive reasoning to physical science exploration produces deeper engagement than teaching either subject in isolation.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with detailed spooky-fun scenes, find-objects hidden item searches within layered Halloween illustrations, and shadow-match silhouette activities with high-contrast black-and-orange Halloween imagery. Create a classroom nocturnal animal display with photographs of bats, owls, and spiders alongside their worksheet counterparts so students can reference real animals during science vocabulary and classification tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Use only friendly pumpkin, candy, and costume imagery to ensure comfort and engagement. Reduce treasure-hunt clues to two steps before gradually adding complexity, and begin missing-pieces activities with three-piece puzzles before extending to more fragments. Pair every worksheet with real pumpkins, costume props, and flashlights for shadow exploration so children can manipulate physical objects while working through paper activities.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-room haunted house design projects requiring area and perimeter calculations for each room. After completing nocturnal animal worksheets, assign comparative research reports examining how bats, owls, and spiders have each evolved different sensory adaptations for nighttime survival. Extend creative writing through mystery narrative assignments with proper plot structure, dialogue, and suspense techniques.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, and find-objects before introducing word-based activities like word-search and image-cryptogram. Halloween imagery \u2014 pumpkins, bats, candy, and costumes \u2014 consists of universally recognized symbols that transcend language barriers. The highly visual nature of costume design and pumpkin face activities communicates through imagery rather than text, allowing participation and learning regardless of English proficiency level.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Emotion identification and design assessment',
      criteria: 'Present students with six blank pumpkin outlines and ask them to draw a different facial expression on each: happy, scared, surprised, angry, sad, and silly. For each expression, students write the emotion name and describe a situation when someone might feel that way. Assess using a three-level rubric: emerging (draws three or more recognizable expressions and names the emotions with prompting), proficient (draws five or more distinct expressions with correct emotion labels and provides one-sentence situational descriptions for each), advanced (draws all six with nuanced detail like furrowed brows for angry versus wide eyes for scared, provides multi-sentence situational descriptions, and suggests a coping strategy for the uncomfortable emotions).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one Halloween worksheet per week over a three- to four-week October unit. Compare early and late samples to document growth in emotional vocabulary usage, visual-spatial reasoning accuracy in missing-pieces and shadow-match tasks, nocturnal science vocabulary acquisition, and creativity in costume design and pumpkin face activities. Look specifically for progression from naming Halloween objects by appearance to describing scientific phenomena and emotional states with precise vocabulary.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on Halloween sorting, matching, and vocabulary worksheets, note whether they identify Halloween items by simple name only without emotional or scientific context (Pre-K), classify nocturnal animals by sensory adaptations and name emotions shown on pumpkin faces with verbal explanations (K\\u20131st), or apply scientific vocabulary like nocturnal, echolocation, and arachnid while connecting emotional vocabulary to real social situations beyond the Halloween context (2nd\\u20133rd). Record whether children transfer emotional awareness and scientific observation skills from worksheets to classroom social interactions and outdoor settings.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Nocturnal Animal Biology, Light/Shadow Physics & Sensory Adaptations)',
      connection: 'Every Halloween worksheet connects to science because the theme centers on creatures and phenomena that operate in darkness \u2014 bats navigating by echolocation, owls hunting with exceptional night vision, spiders engineering webs as prey traps, and shadows changing shape with light angle and distance. Children learn that an entire ecosystem operates at night and that nocturnal animals have evolved remarkable sensory adaptations invisible during daytime classroom hours.',
      activity: 'After completing shadow-match and find-objects Halloween worksheets, set up a shadow investigation station with flashlights and Halloween cutout shapes. Students position the flashlight at different distances, observe how shadow size and sharpness change, record measurements, and write sentences explaining the relationship between light source distance and shadow characteristics \u2014 experiencing physical science concepts through direct hands-on investigation of the light and shadow phenomena central to Halloween.',
    },
    {
      subject: 'Social-Emotional Learning (Emotion Identification, Fear Regulation & Courage Through Safe Fictional Contexts)',
      connection: 'Halloween worksheets build social-emotional skills uniquely because the theme provides a safe fictional context for experiencing and naming emotions that other themes avoid. Children practice identifying fear, surprise, courage, and excitement through pumpkin face activities and spooky story scenarios, developing the emotional vocabulary and regulation strategies that support classroom behavior, peer relationships, and personal well-being.',
      activity: 'After completing coloring and draw-and-color pumpkin face worksheets, lead a class discussion where students share which pumpkin expression matches how they feel today and explain why. Create a classroom emotion pumpkin patch wall where students add new emotion faces throughout October, discuss situations that trigger each feeling, and brainstorm regulation strategies \u2014 connecting worksheet art to genuine emotional literacy development through the safe, playful lens of Halloween.',
    },
    {
      subject: 'Art (Costume Design, Pumpkin Face Symmetry & Color Theory Through the Halloween Palette)',
      connection: 'Halloween provides exceptionally rich art content because costume design IS design thinking \u2014 children plan, sketch, and create wearable art that expresses identity and imagination. Pumpkin face carving teaches symmetry, proportion, and emotional expression through facial feature placement, while the bold orange, black, and purple Halloween palette introduces color contrast and complementary color concepts.',
      activity: 'After completing coloring and draw-and-color Halloween worksheets, give students pumpkin-shaped templates and demonstrate how to create symmetrical jack-o-lantern faces by folding the template along the center vertical line and designing matching features on both sides. Students experiment with different emotional expressions, identify lines of symmetry with colored pencils, and compare their designs to photographs of carved pumpkins from different cultures \u2014 connecting art creation to mathematical symmetry and emotional expression.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Primary pedagogical focus', value: 'Creative transformation' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Emotional vocabulary + nocturnal science + costume design thinking' },
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

console.log('Part 44: Enriching easter & halloween theme hub pages...\n');

console.log('1. Injecting 12 fields into easter/en.ts...');
injectFields(path.join(base, 'easter', 'en.ts'), easterFields);

console.log('2. Injecting 12 fields into halloween/en.ts...');
injectFields(path.join(base, 'halloween', 'en.ts'), halloweenFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
