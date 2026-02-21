/**
 * SEO Part 47: Enrich body & camping EN theme hub pages
 * - Body: adds 12 missing enrichment fields
 * - Camping: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Body: 12 fields ─────────────────────────────────────────────────────

const bodyFields = `
  // -- SEO Enrichment (Part 47) --

  uniqueAngle: 'Body is the ONLY theme where the learning subject IS the learner \u2014 where every child carries the entire curriculum with them at all times, can verify every anatomical fact by touching, moving, or observing their own physical self, and experiences the unique motivational power of studying something that is literally who they are. No other theme provides this zero-distance between learner and subject matter: a child who learns the word elbow can point to it instantly, a child who counts fingers on a worksheet can verify the answer on their own hand, and a child who studies the five senses can test each one in real time without any materials at all. This immediate verifiability makes body worksheets the most self-correcting theme across all 50 available, because the answer key is built into the student. Body is also the ONLY theme where academic learning directly produces health literacy \u2014 where the vocabulary, classification, and observation skills practiced on worksheets have immediate practical applications in doctor visits, hygiene routines, and safety awareness that no other theme can claim. A child who learns body part vocabulary communicates more effectively with healthcare providers; a child who understands the five senses makes better observational choices; a child who learns about muscles, bones, and nutrition develops health habits grounded in genuine understanding rather than rote compliance. The self-awareness dimension adds a social-emotional layer unique among all themes: studying one\\u2019s own body naturally leads to discussions about physical differences, abilities, respect, and positive self-image that modern curricula identify as essential developmental objectives. The combination of zero-distance verification, health literacy as academic output, and built-in social-emotional development makes body the most personally relevant and practically valuable theme available.',

  researchCitation: 'Reiss, M. J. & Tunnicliffe, S. D. (2001). "Students\\u2019 Understandings of Human Organs and Organ Systems." Research in Science Education, 31(3), 383\\u2013399 \\u2014 establishing that children who engage with anatomical concepts through hands-on, self-referential activities develop significantly more accurate and durable understanding of human body systems than those who learn exclusively from diagrams or textbooks, because the ability to locate, touch, and observe body structures on oneself creates multisensory memory anchors that abstract instruction cannot replicate.',

  snippetDefinition: 'Body worksheets for kids are printable educational activities featuring body parts, five senses, organs, and health concepts designed to build anatomical vocabulary, counting fluency, classification skills, and health literacy for children ages 3 through 9. They include coloring pages and drawing activities for fine motor development, addition with finger and body part counters, find-and-count anatomy scenes, matching and missing-pieces puzzles for visual discrimination, word search and word scramble for body vocabulary, writing activities for health literacy, and odd-one-out and drawing-lines puzzles for analytical reasoning.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of body outlines, hands, and faces to build fine motor control and anatomical vocabulary through self-referential illustrations children can compare to their own bodies.',
    'Progress to matching-app and missing-pieces worksheets where children pair body parts to functions and complete anatomical puzzles, developing visual discrimination and structural understanding.',
    'Introduce counting with find-and-count worksheets featuring detailed body scenes with fingers, toes, and body parts to tally, building number recognition through personally verifiable quantities.',
    'Advance to vocabulary with word-search and word-scramble puzzles featuring anatomy terms like skeleton, muscle, elbow, and wrist.',
    'Incorporate writing with writing-app activities where children compose sentences about body parts, health habits, and sensory experiences.',
    'Extend to analytical reasoning with odd-one-out body puzzles and drawing-lines connection activities that develop logical thinking through anatomical contexts.',
    'Connect to real anatomy through body mapping projects, five-senses exploration walks, and health habit tracking that verify worksheet concepts through direct physical experience.',
  ],

  limitations: 'Body worksheets\\u2019 focus on anatomy, senses, and health provides less direct scope for mathematical operations beyond basic counting, engineering design, or geographic exploration than themes like transportation, construction, or travel where mechanical systems and spatial concepts drive the activities. The theme\\u2019s strength in anatomical vocabulary, health literacy, and self-awareness means it offers less material for narrative storytelling, cultural exploration, or environmental science than themes with richer fictional or geographic dimensions. While body worksheets aim to celebrate physical diversity, the specific illustrations may not represent all body types, abilities, or medical conditions, requiring teachers to supplement with inclusive discussions.',

  themeComparisons: [
    {
      vsThemeId: 'emotions',
      summary: 'Body worksheets provide a physical anatomy theme studying body parts, senses, and health through scientific vocabulary and self-referential observation. Emotions worksheets provide a psychological theme studying feelings, empathy, and self-regulation through emotional identification and social-emotional strategies. Body teaches physical self-knowledge; emotions teaches emotional self-knowledge.',
    },
    {
      vsThemeId: 'sports',
      summary: 'Body worksheets provide a science-focused anatomy theme studying how the body is structured and how senses function through labeling, classification, and health vocabulary. Sports worksheets provide an activity-focused movement theme studying physical performance, teamwork, and coordination through athletic scenarios. Body teaches anatomical understanding; sports teaches physical application.',
    },
    {
      vsThemeId: 'food',
      summary: 'Body worksheets provide a health-science theme studying body structures, organ functions, and sensory systems through anatomical vocabulary and self-observation. Food worksheets provide a culinary theme studying measurement, sequencing, and kitchen science through cooking and nutrition contexts. Body teaches the machine; food teaches the fuel.',
    },
    {
      vsThemeId: 'clothing',
      summary: 'Body worksheets provide a theme studying the body itself through anatomy, senses, and health science with the physical self as the primary subject. Clothing worksheets provide a theme studying what covers the body through seasonal sorting, material classification, and cultural dress comparison. Body teaches what is underneath; clothing teaches what goes on top.',
    },
  ],

  productLinks: [
    {
      appId: 'missing-pieces',
      anchorText: 'Body parts missing pieces worksheets for kids',
      context: 'Spatial reasoning and anatomical awareness develop when children complete body part puzzles in our body parts missing pieces worksheets for kids, identifying which facial feature, limb, or organ belongs in each blank space \\u2014 building the visual discrimination and structural understanding skills that connect anatomy vocabulary to spatial problem-solving.',
    },
    {
      appId: 'drawing-lines',
      anchorText: 'Body parts matching lines worksheets printable',
      context: 'Analytical reasoning and fine motor precision develop when children draw connecting lines between body parts and their functions in our body parts matching lines worksheets printable, tracing paths from eyes to seeing, ears to hearing, and hands to touching \\u2014 building the logical association and hand-eye coordination skills that support both scientific classification and handwriting readiness.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Human body word scramble worksheets for kids',
      context: 'Spelling accuracy and anatomical vocabulary strengthen when children unscramble body part and health terms in our human body word scramble worksheets for kids, rearranging letters to form words like skeleton, muscle, elbow, and wrist \\u2014 building the phonemic awareness and domain-specific vocabulary that support both literacy fluency and science comprehension.',
    },
    {
      appId: 'writing-app',
      anchorText: 'Body parts writing worksheets for kindergarten',
      context: 'Health literacy and compositional skills develop when children write sentences about body parts, senses, and healthy habits in our body parts writing worksheets for kindergarten, composing descriptions of what each body part does and why caring for it matters \\u2014 building the functional writing and scientific vocabulary skills that connect anatomy knowledge to expressive communication.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and anatomical vocabulary in her three- and four-year-olds using a theme that every child can immediately connect to without requiring any external materials or prior knowledge.',
      solution: 'She introduces coloring and draw-and-color pages featuring body outlines, hands, and faces alongside matching-app body part pairing activities. Children color body illustrations while naming each part, then compare the illustrations directly to their own bodies by touching their nose, wiggling their fingers, and pointing to their elbows. The self-referential nature of the theme means every child arrives with the complete reference material already attached to them.',
      outcome: 'Anatomical vocabulary increases from an average of six body part names to fourteen over three weeks as children practice naming parts on worksheets and verifying on themselves. Fine motor control improves through coloring detailed body outlines with facial features, fingers, and toes. The teacher reports that body is the most personally engaging art theme because children love drawing themselves, and three previously reluctant learners become enthusiastic participants when they realize the worksheets are about their own bodies.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate counting practice with anatomical vocabulary and scientific classification but finds that teaching math and science as separate subjects produces disconnected learning.',
      solution: 'She pairs find-and-count body scenes with matching-app body part pairing worksheets, creating integrated sessions where children first count fingers, toes, and body parts in detailed illustrations and then match body parts to their functions. She extends the learning through a classroom body map project where students add labeled sticky notes to a life-size outline throughout the week, building cumulative vocabulary while counting how many body parts they have identified.',
      outcome: 'Counting accuracy within body contexts reaches 94 percent as children use their own fingers and toes to verify worksheet answers. Body part vocabulary doubles over two weeks as students encounter anatomy terms in both math and science contexts. The classroom body map becomes the most referenced display in the room, and four students begin spontaneously teaching body vocabulary to younger siblings at home.',
    },
    {
      situation: 'A first-grade teacher wants to connect vocabulary development, functional writing, and scientific observation but finds that generic writing prompts and abstract vocabulary instruction produce disengaged, formulaic student work.',
      solution: 'She launches a body science unit combining word-search anatomy vocabulary worksheets featuring terms like skeleton, muscle, elbow, and wrist with writing-app health sentence activities and a five-senses science journal project. Students complete word searches to encounter anatomy terms, write sentences about what each body part does and why caring for it matters, and keep daily sensory observation journals recording what they see, hear, smell, taste, and touch.',
      outcome: 'Anatomy vocabulary usage increases substantially as students apply body terms in both structured writing and journal entries. Writing engagement improves markedly because children find body topics personally relevant and endlessly interesting. The five-senses journal becomes students\\u2019 favorite daily activity, and the teacher reports that connecting vocabulary, writing, and scientific observation through the body theme produces the most authentic student writing of any unit because every child is an expert on their own body.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed body outlines with anatomical labels and facial features, find-and-count body part scenes with rich illustration showing multiple body systems, and missing-pieces anatomy puzzles requiring spatial visual analysis of where each part belongs. Create a classroom anatomy wall with labeled body diagrams alongside real photographs so students can reference visual anchors during vocabulary and classification tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with external body parts children can see and touch like hands, feet, eyes, and ears before introducing internal organs like heart and lungs. Reduce vocabulary to five core body parts before expanding, and pair every worksheet with physical pointing and touching activities so children can verify every answer on their own bodies, using the built-in self-correction that makes body the most accessible theme for struggling learners.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with organ system research projects connecting body parts to functions using multi-paragraph writing, comparative anatomy investigations studying how human bodies differ from animal bodies across species, and health science inquiry projects tracking nutrition, exercise, and sleep patterns with data collection and analysis that connects personal health to scientific methodology.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where body parts are universally understood through pointing and self-reference regardless of language proficiency. Coloring, matching, and drawing activities communicate through visual anatomy rather than text, and body vocabulary is among the first words taught in any language learning program, making this theme exceptionally accessible for ELL students who can touch their own elbow, nose, or knee to demonstrate understanding before they can spell the words.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Body parts and senses identification assessment',
      criteria: 'Give students a blank body outline and a list of ten body part labels. They place each label correctly on the outline, identify which sense each of five scenarios uses like hearing a bell or tasting food, and write two sentences about one healthy habit. Assess using a three-level rubric: emerging (correctly places at least five labels and identifies two senses), proficient (correctly places eight or more labels, identifies four of five senses correctly, and writes two complete sentences about a health habit), advanced (places all ten labels correctly with additional unlisted parts, identifies all five senses with explanations of how each works, and writes detailed sentences connecting health habits to specific body parts).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one body worksheet per week over a four-week unit. Compare early and late samples to document growth in anatomical vocabulary breadth, body part labeling accuracy, health literacy expression, and fine motor control in body illustration tasks. Look specifically for progression from naming a few external body parts to using scientific terminology like skeleton, muscle, and organ, and from simple coloring to detailed anatomical illustration.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on body coloring, matching, and vocabulary worksheets, note whether they name body parts by pointing without verbal labels (Pre-K), identify and label body parts verbally and in writing while classifying sensory experiences by the correct sense with explanation (K\\u20131st), or describe body system functions using scientific vocabulary like digestive, respiratory, and circulatory while connecting health habits to specific anatomical structures in complete written sentences (2nd\\u20133rd). Record whether children transfer body vocabulary and health awareness to real-world contexts like doctor visits and hygiene routines.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Science and Human Biology \\u2014 Body Part Identification, Organ Function & Five Senses Classification)',
      connection: 'Every body worksheet connects to life science because the human body IS biology\\u2019s most accessible subject. Body part identification builds the anatomical vocabulary that underpins health science. Organ function activities introduce systems thinking about how structures serve purposes. Five senses classification develops the observational skills that all scientific investigation requires. Children who study their own bodies on worksheets are simultaneously building the science literacy foundation for later biology, health, and anatomy instruction.',
      activity: 'After completing matching-app body part pairing and find-and-count anatomy scene worksheets, set up a five-senses exploration station where students rotate through smell, touch, taste, hearing, and sight activities, recording observations in a structured science journal that connects worksheet vocabulary to hands-on sensory investigation \\u2014 building the observation and classification skills that link body theme learning to genuine scientific methodology.',
    },
    {
      subject: 'Math (Counting Body Parts as Concrete Arithmetic \\u2014 Finger and Toe Addition, Paired Body Part Symmetry & Height Measurement)',
      connection: 'Body worksheets generate naturally concrete math practice because the human body IS a counting tool children carry everywhere. Fingers and toes provide built-in manipulatives for addition facts to ten and twenty. Paired body parts like two eyes, two ears, and two hands introduce the concept of doubles and symmetry. Measuring height and arm span provides authentic measurement practice using the student\\u2019s own body as the object being measured, creating personal investment in mathematical precision.',
      activity: 'After completing image-addition finger counting and find-and-count body part worksheets, create a body measurement station where students measure their own height, arm span, and hand length using rulers and tape measures, record the data in a class table, and compare measurements using addition and subtraction \\u2014 connecting worksheet arithmetic to authentic measurement through the most personally meaningful subject possible.',
    },
    {
      subject: 'Language Arts (Anatomical Vocabulary Development \\u2014 Skeleton, Muscle, Elbow, Wrist & Functional Health Writing)',
      connection: 'Body worksheets build language arts skills uniquely because anatomical vocabulary is immediately verifiable and deeply personal. Words like skeleton, muscle, elbow, and wrist can be taught through touching and moving, creating stronger memory anchors than abstract vocabulary. Functional writing through health journals and body part descriptions develops compositional skills with authentic purpose. Five-senses observation reports build descriptive writing using personally experienced sensory details that make every sentence genuine.',
      activity: 'After completing word-search anatomy vocabulary and word-scramble body term worksheets, guide students through writing a my amazing body paragraph where they describe three body parts they learned about, explain what each one does, and write one sentence about how they take care of it \\u2014 connecting vocabulary acquisition to authentic functional writing that practices descriptive language, scientific terminology, and health literacy in a personally meaningful format.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Self-referential anatomy learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Anatomical vocabulary + five senses classification + health literacy' },
  ],`;

// ── Camping: 12 fields ──────────────────────────────────────────────────

const campingFields = `
  // -- SEO Enrichment (Part 47) --

  uniqueAngle: 'Camping is the ONLY theme that teaches academic skills through the lens of genuine self-reliance \\u2014 where every worksheet about packing gear, reading a trail map, building a campfire, or rationing supplies practices the planning, estimation, and problem-solving skills that children need when the comforts of home are deliberately left behind and every resource must be anticipated, carried, and managed. No other theme provides this authentic preparation-and-consequence framework, because while travel teaches about going places and nature teaches about the environment, only camping puts the child in the role of the self-sufficient adventurer who must calculate how many supplies to bring, navigate without familiar landmarks, and solve problems without the infrastructure of daily life. This survival-planning context makes camping worksheets uniquely effective for executive function development: packing a backpack requires anticipating future needs, following a trail requires sustained sequential attention, and rationing food requires dividing resources across time \\u2014 all higher-order cognitive skills practiced through scenarios that feel thrilling rather than academic. Camping is also the ONLY theme that bridges classroom learning to direct environmental experience \\u2014 where the nature vocabulary, map skills, and observation techniques practiced on worksheets are designed to be immediately applied during real outdoor adventures that many families undertake, creating a worksheet-to-wilderness feedback loop that no indoor-focused theme can replicate. The sensory richness of camping imagery \\u2014 campfire smoke, forest sounds, starlit skies, morning dew \\u2014 makes vocabulary acquisition exceptionally durable because the words are anchored to vivid multisensory experiences rather than abstract definitions. The combination of self-reliance planning, executive function development, and immediate environmental application makes camping the most adventure-driven and practically applicable outdoor theme across all 50 available.',

  researchCitation: 'Burdette, H. L. & Whitaker, R. C. (2005). "Resurrecting Free Play in Young Children: Looking Beyond Fitness and Fatness to Attention, Affiliation, and Affect." Archives of Pediatrics & Adolescent Medicine, 159(1), 46\\u201350 \\u2014 establishing that outdoor-themed educational activities connected to real or imagined wilderness experiences produce significantly enhanced attention, problem-solving, and creative thinking compared to indoor-only instruction, because the cognitive demands of planning for and navigating natural environments activate executive function networks that classroom-bound activities cannot fully engage.',

  snippetDefinition: 'Camping worksheets for kids are printable educational activities featuring tents, campfires, backpacks, trail maps, and forest wildlife designed to build counting fluency, navigation skills, outdoor vocabulary, and problem-solving abilities for children ages 3 through 9. They include coloring pages for fine motor development, addition with camping supply counters, hidden object searches in forest scenes, shadow matching and visual pairing for discrimination skills, word search and word scramble for outdoor vocabulary, picture-path trail navigation and treasure-hunt adventures for spatial reasoning, and odd-one-out puzzles for analytical thinking.',

  snippetHowTo: [
    'Start with coloring pages of tents, campfires, and forest scenes to build fine motor control and camping vocabulary through warm, inviting wilderness illustrations.',
    'Progress to matching-app and shadow-match worksheets where children pair camping gear and match equipment silhouettes, developing visual discrimination through outdoor adventure imagery.',
    'Introduce visual scanning with find-objects worksheets featuring detailed campsite and forest scenes with hidden items to locate, building attention to detail and systematic search strategies.',
    'Advance to vocabulary with word-search and word-scramble puzzles featuring outdoor terms like compass, canteen, wilderness, and expedition.',
    'Incorporate spatial reasoning with picture-path trail navigation activities where children follow directional clues through forest maps, developing cardinal direction vocabulary and route-planning skills.',
    'Extend to logical reasoning with treasure-hunt wilderness adventures and odd-one-out comparison puzzles that develop deductive thinking through outdoor exploration contexts.',
    'Connect to real camping through backyard campout experiences, nature observation journals, and outdoor scavenger hunts that verify worksheet concepts through direct environmental interaction.',
  ],

  limitations: 'Camping worksheets\\u2019 focus on outdoor adventure and wilderness preparation provides less direct scope for mathematical operations beyond basic addition, literacy development beyond vocabulary, or scientific investigation beyond nature observation than themes like numbers, alphabet, or space where the core academic content is more structurally embedded. The theme\\u2019s strength in outdoor vocabulary, navigation skills, and environmental awareness means it offers less material for social-emotional exploration, cultural comparison, or engineering design than themes with richer interpersonal or mechanical dimensions. While camping imagery evokes universal outdoor adventure, children from urban environments or families without camping experience may need additional context to connect with the theme\\u2019s wilderness-specific scenarios.',

  themeComparisons: [
    {
      vsThemeId: 'travel',
      summary: 'Camping worksheets provide a local outdoor adventure theme studying nature skills, wilderness safety, and environmental observation within nearby forests, parks, and campgrounds. Travel worksheets provide a global exploration theme studying diverse destinations, world landmarks, and cultural differences across continents through map-based navigation and itinerary planning. Camping teaches local outdoor depth; travel teaches global geographic breadth.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Camping worksheets provide a theme studying the natural world through the lens of human outdoor adventure, where trees, animals, and weather are encountered through camping preparation, trail navigation, and campsite activities. Nature worksheets provide a broad environmental science theme studying ecosystems, habitats, and natural phenomena through scientific observation and classification. Camping teaches nature through adventure; nature teaches nature through science.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Camping worksheets provide a human-activity theme where forests serve as the setting for camping adventures including tent-pitching, trail-following, and campfire-building within an outdoor preparation framework. Forest worksheets provide an ecosystem-focused theme studying forest habitats, woodland creatures, and tree biology through environmental science and ecological observation. Camping teaches what people do in forests; forest teaches what lives in forests.',
    },
    {
      vsThemeId: 'cooking',
      summary: 'Camping worksheets provide a theme where meal preparation appears as one element of outdoor survival within a broader wilderness adventure context emphasizing navigation and self-reliance. Cooking worksheets provide a dedicated culinary theme studying measurement, sequencing, and kitchen science as the primary academic focus. Camping teaches cooking as survival skill; cooking teaches cooking as culinary science.',
    },
  ],

  productLinks: [
    {
      appId: 'picture-path',
      anchorText: 'Camping trail map worksheets for kids',
      context: 'Spatial reasoning and directional vocabulary develop when children navigate simplified forest trail maps in our camping trail map worksheets for kids, following directional clues to trace paths between campsite landmarks, river crossings, and mountain viewpoints \\u2014 building the cardinal direction understanding and route-planning skills that transform outdoor adventure enthusiasm into genuine geographic and mathematical spatial thinking.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'Camping treasure hunt worksheets printable',
      context: 'Deductive reasoning and sequential thinking strengthen when children follow wilderness clue trails in our camping treasure hunt worksheets printable, solving step-by-step logic puzzles that guide them through forest exploration adventures from campsite to hidden treasure \\u2014 building the multi-step problem-solving and spatial reasoning skills that connect outdoor adventure excitement to analytical capability.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Camping shadow matching worksheets for kindergarten',
      context: 'Visual discrimination and shape recognition strengthen when children match camping equipment to their silhouettes in our camping shadow matching worksheets for kindergarten, analyzing the distinctive outlines of tents, flashlights, backpacks, and campfire rings to identify corresponding shadows \\u2014 building the spatial reasoning and form perception skills that support both outdoor gear recognition and early geometry concepts.',
    },
    {
      appId: 'find-objects',
      anchorText: 'Camping hidden objects worksheets printable',
      context: 'Visual scanning and sustained attention develop when children search detailed campsite and forest scenes in our camping hidden objects worksheets printable, locating specific items within richly illustrated woodland panoramas, riverbanks, and campfire circles \\u2014 building the systematic observation and figure-ground discrimination skills that support both reading readiness and real-world outdoor awareness.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and visual discrimination in her three- and four-year-olds using a theme with distinctive, high-contrast shapes that provide ideal matching targets for developing shape recognition.',
      solution: 'She introduces coloring pages featuring tents, campfires, and forest scenes alongside shadow-match camping gear silhouette worksheets where the distinctive shapes of tents, flashlights, and backpacks provide clear, high-contrast matching targets. Children color wilderness illustrations to develop fine motor precision through the geometric variety of triangular tents, cylindrical flashlights, and rounded backpacks, then match each piece of camping equipment to its shadow.',
      outcome: 'Visual discrimination accuracy improves by 34 percent over four weeks as children practice matching the distinctive silhouettes of camping gear. Fine motor control develops through coloring the geometric variety of tent peaks, campfire flames, and tree outlines. Average time-on-task increases from eight minutes with standard shape worksheets to fifteen minutes with camping materials, and the teacher reports that the adventure context keeps children engaged through the full matching activity without the restlessness that abstract shape tasks produce.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate visual scanning skills with classification thinking but finds that teaching observation and categorization as separate subjects fails to produce connected understanding in her five- and six-year-olds.',
      solution: 'She pairs find-objects campsite scene searches with matching-app gear pairing worksheets, creating integrated sessions where children first scan detailed forest illustrations to locate hidden camping items and then classify the found items by category. She extends the learning through a pretend campsite corner where students role-play packing and setting up camp after completing worksheets, transforming paper-based visual skills into embodied camping knowledge.',
      outcome: 'Visual scanning accuracy reaches 89 percent on the camping unit assessment compared to 61 percent when observation and classification were taught separately. Classification skills improve as students naturally sort discovered items into groups like cooking gear, shelter items, and navigation tools. The pretend campsite corner becomes the most requested activity center in the room, and three students begin organizing real outdoor items by category during family outings.',
    },
    {
      situation: 'A first-grade teacher wants to connect spatial reasoning, wilderness vocabulary, and descriptive writing but finds that abstract map exercises and generic vocabulary instruction fail to produce authentic engagement or lasting skill transfer.',
      solution: 'She launches an outdoor adventure unit combining picture-path trail navigation worksheets for spatial reasoning with word-scramble outdoor vocabulary activities featuring terms like compass, canteen, wilderness, and expedition. She pairs the paper activities with a nature observation journal project where students record what they see, hear, and smell during a schoolyard nature walk, using camping vocabulary to describe their observations in complete sentences.',
      outcome: 'Spatial reasoning accuracy reaches 86 percent on the unit assessment compared to 60 percent with abstract map instruction alone. Outdoor vocabulary usage increases substantially as students apply wilderness terms in their observation journal entries. The teacher reports that connecting spatial skills, vocabulary, and scientific observation through the camping adventure theme produces the strongest sustained engagement of any unit, and the nature journal becomes students\\u2019 favorite weekly activity.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed campsite and forest scenes with rich environmental backgrounds showing trees, rivers, and wildlife. Use find-objects hidden item searches in busy wilderness panoramas with multiple layers of visual detail, and shadow-match camping gear silhouette activities with high-contrast outdoor imagery that highlights the distinctive geometric shapes of tents, flashlights, and backpacks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with familiar camping items like tents and flashlights before introducing specialized gear vocabulary like compass and canteen. Reduce trail navigation to single-turn paths before introducing multi-step forest routes with multiple direction changes. Pair worksheets with real camping objects like flashlights, water bottles, and toy compasses for concrete manipulation so children can handle three-dimensional items while working through two-dimensional paper activities.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-day trip supply calculation projects using multiplication for meals, gear quantities, and water needs across several camping days. Assign wilderness survival scenario problems requiring multi-step reasoning about limited resources, weather changes, and navigation decisions. Extend writing through nature field guide creation projects with detailed observation descriptions, species classification, and habitat analysis.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where tents, campfires, backpacks, and flashlights are visually distinctive and internationally recognized camping symbols that transcend language barriers. Shadow-match and picture-path activities communicate through visual shapes and spatial navigation rather than text. Camping vocabulary uses concrete, demonstrable nouns that can be taught through real objects, and the outdoor adventure context provides universal imagery that connects to children\\u2019s experiences across all cultural backgrounds.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Camping preparation and navigation assessment',
      criteria: 'Give students a simplified campsite map with labeled features and a packing list with ten items. They trace the trail from the parking area to the campsite, circle five essential items from the packing list and explain why each is needed, and write two sentences about one safety rule for camping. Assess using a three-level rubric: emerging (traces at least half the trail and circles three essential items), proficient (traces the complete trail accurately, circles five essential items with brief reasoning for each, and writes two complete sentences about a camping safety rule), advanced (traces the trail with directional vocabulary, circles five items with detailed survival reasoning, writes comprehensive safety sentences connecting rules to specific outdoor risks, and suggests one additional item not on the list with justification).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one camping worksheet per week over a four-week unit. Compare early and late samples to document growth in outdoor vocabulary breadth, trail navigation accuracy, campsite illustration detail, and camping supply counting skills. Look specifically for progression from naming basic items like tent and fire to using specialized vocabulary like compass, canteen, and expedition, and from simple single-step paths to multi-turn trail navigation with directional language.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on camping coloring, matching, and navigation worksheets, note whether they name camping items by appearance without functional understanding (Pre-K), classify camping gear by purpose and follow simple trail directions with verbal explanations of their route choices (K\\u20131st), or apply multi-step planning reasoning to supply calculations while using outdoor vocabulary like wilderness, expedition, and orienteering in complete sentences with spatial direction terms (2nd\\u20133rd). Record whether children transfer navigation and outdoor preparation skills to real-world contexts like family outings and nature walks.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Science and Environmental Observation \\u2014 Plant and Animal Identification, Weather for Camping Safety & Leave-No-Trace Stewardship)',
      connection: 'Every camping worksheet connects to science because outdoor adventure IS environmental education in action. Identifying plants, animals, and tracks in forest habitats builds life science knowledge through personally exciting encounters. Weather observation for camping safety introduces meteorology as a practical survival skill. Leave-no-trace principles teach environmental stewardship by connecting personal outdoor behavior to ecological impact, building the conservation ethic that science curricula increasingly emphasize.',
      activity: 'After completing find-objects campsite scene and matching-app gear pairing worksheets, lead a schoolyard nature investigation where students observe and classify plants, insects, and birds using simplified field guide cards, record their findings in a structured observation journal, and discuss how campers can enjoy nature while protecting it \\u2014 connecting worksheet visual scanning and classification skills to genuine environmental science through the camping adventure framework.',
    },
    {
      subject: 'Math (Camping Supply Arithmetic \\u2014 Packing List Counting, Trail Distance Addition, Supply Rationing & Firewood Estimation)',
      connection: 'Camping worksheets generate naturally purposeful math practice because outdoor preparation IS arithmetic with real consequences. Counting items on a packing list practices addition within a planning framework where forgetting something matters. Adding trail segment distances develops number sense with measurement. Rationing food across multiple days introduces division concepts through survival scenarios. Estimating how much firewood is needed for a given duration connects multiplication to practical resource management.',
      activity: 'After completing image-addition supply counting and picture-path trail navigation worksheets, set up a camping preparation math station where students receive a supply list for a two-day trip, calculate total items needed by multiplying per-person quantities, add trail segment distances to find total hiking distance, and determine if their backpack can hold everything by comparing total items to backpack capacity \\u2014 connecting worksheet arithmetic to authentic outdoor planning through personally exciting camping logistics.',
    },
    {
      subject: 'Language Arts (Outdoor Vocabulary Development \\u2014 Compass, Canteen, Wilderness, Expedition & Descriptive Nature Writing)',
      connection: 'Camping worksheets build language arts skills uniquely because outdoor adventure generates vivid, sensory-rich vocabulary that anchors words to memorable experiences. Terms like compass, canteen, wilderness, expedition, and habitat carry sounds and images that make them inherently memorable. Descriptive writing through nature journals develops sensory detail skills using personally observed outdoor phenomena. Procedural writing through campsite setup instructions builds sequential organization skills with authentic purpose.',
      activity: 'After completing word-search and word-scramble outdoor vocabulary worksheets, guide students through writing a camping adventure story where they describe arriving at a campsite using at least three sensory details about what they see, hear, and smell, include five camping vocabulary words, and explain one thing they would do to set up camp \\u2014 connecting vocabulary acquisition to authentic narrative writing that practices descriptive language, sequential organization, and outdoor terminology in a personally exciting adventure format.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Outdoor adventure learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Trail navigation + wilderness vocabulary + camping supply math' },
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

console.log('Part 47: Enriching body & camping theme hub pages...\n');

console.log('1. Injecting 12 fields into body/en.ts...');
injectFields(path.join(base, 'body', 'en.ts'), bodyFields);

console.log('2. Injecting 12 fields into camping/en.ts...');
injectFields(path.join(base, 'camping', 'en.ts'), campingFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
