/**
 * SEO Part 52: Enrich music & pirates EN theme hub pages
 * - Music: adds 12 missing enrichment fields
 * - Pirates: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Music: 12 fields ─────────────────────────────────────────────────

const musicFields = `
  // -- SEO Enrichment (Part 52) --

  uniqueAngle: 'Music is the ONLY theme where the educational content IS pattern recognition itself \u2014 where every worksheet about extending rhythmic sequences, identifying repeating instrument arrangements, or analyzing growing beat patterns practices the exact algebraic thinking, sequential reasoning, and structural analysis that mathematical success requires, using the rhythms, melodies, and instruments children find inherently joyful. No other theme delivers this pattern-as-core-curriculum framework, because while shapes teaches patterns through geometric repetition and numbers teaches patterns through arithmetic sequences, only music makes pattern recognition the fundamental, unavoidable subject of every single activity \u2014 meaning every worksheet simultaneously builds artistic appreciation and the algebraic thinking that predicts mathematical achievement across all grade levels. This pattern-centrality framework is structurally different from all other themes because music worksheets teach pattern concepts through a medium that children experience emotionally and physically \u2014 they feel rhythms in their bodies, hear patterns in melodies, and create sequences through clapping and singing \u2014 creating a multisensory reinforcement pathway that purely visual or numerical pattern activities cannot match. Music is also the ONLY theme where instrument classification naturally teaches the scientific reasoning of attribute-based taxonomy \u2014 where sorting drums into percussion, guitars into strings, and flutes into woodwinds based on how they produce sound practices the exact same classification-by-mechanism thinking that biological taxonomy, chemical grouping, and material science require. The creative expression dimension adds a unique artistic-reasoning layer: music worksheets develop aesthetic appreciation and creative confidence alongside analytical skills, because composing a rhythm pattern is simultaneously an artistic act and a mathematical one. The combination of pattern-as-core-content, multisensory reinforcement, scientific classification through instrument families, and integrated artistic-analytical thinking makes music the most pattern-foundational and creatively enriching theme across all 50 available.',

  researchCitation: 'Hallam, S. (2010). "The Power of Music: Its Impact on the Intellectual, Social and Personal Development of Children and Young People." International Journal of Music Education, 28(3), 269\u2013289 \u2014 establishing that structured engagement with musical patterns, rhythms, and instrument classification significantly strengthens mathematical reasoning, spatial-temporal skills, and reading fluency in young children, because the cognitive processes activated by musical pattern recognition \u2014 sequential analysis, prediction, and structural awareness \u2014 transfer directly to the mathematical and linguistic pattern recognition that academic achievement requires.',

  snippetDefinition: 'Music and instrument worksheets for kids are printable educational activities featuring drums, guitars, pianos, violins, trumpets, and other instruments designed to build pattern recognition, rhythmic reasoning, instrument classification, and musical vocabulary for children ages 3 through 9. They include coloring and draw-and-color pages for fine motor development and creative expression, matching and shadow-matching for visual discrimination, addition with instrument counters, word search and word scramble for musical vocabulary, pattern-train and pattern-worksheet for sequential reasoning, and odd-one-out puzzles for analytical classification.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of instruments and musical scenes to build fine motor control and instrument vocabulary through detailed, engaging illustrations that spark creative connection to music.',
    'Progress to matching-app and shadow-match worksheets where children pair identical instruments and match instrument silhouettes, developing visual discrimination through the distinctive shapes of guitars, drums, trumpets, and violins.',
    'Introduce pattern foundations with pattern-train worksheets where children identify and extend simple AB and ABC instrument sequences, building the rhythmic pattern recognition that underlies algebraic thinking.',
    'Advance to complex patterns with pattern-worksheet activities featuring growing sequences and multi-element repeating units that challenge children to analyze structure and predict continuation.',
    'Incorporate arithmetic with image-addition worksheets using instrument counters that connect math operations to musical counting contexts.',
    'Extend to analytical reasoning with odd-one-out instrument classification puzzles and word-search and word-scramble musical vocabulary activities that develop deductive thinking and spelling fluency.',
    'Connect to real music-making through classroom rhythm sessions, instrument family sorting with audio clips, and original pattern composition that verify worksheet concepts through hands-on musical creation and performance.',
  ],

  limitations: 'Music worksheets\\u2019 focus on pattern recognition, rhythmic reasoning, and instrument classification provides less direct scope for spatial reasoning, scientific investigation, or narrative storytelling than themes like furniture, nature, or fairy tales where positional vocabulary, ecological observation, and plot structure drive the activities. The theme\\u2019s strength in sequential pattern analysis, musical vocabulary, and classification reasoning means it offers less material for measurement, geographic exploration, or social studies than themes with stronger mathematical-application, spatial, or community dimensions. While musical instruments are recognized worldwide, worksheets featuring specific instruments may emphasize Western orchestral traditions, and teachers should include diverse instruments from global musical cultures.',

  themeComparisons: [
    {
      vsThemeId: 'emotions',
      summary: 'Music worksheets provide a theme where patterns, rhythms, and instrument classification form the academic core with feelings emerging indirectly through musical expression and response. Emotions worksheets provide a theme studying feelings directly through identification, labeling, regulation strategies, and social-emotional awareness with emotions as the explicit subject. Music teaches feelings through artistic expression; emotions teaches feelings through self-examination.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Music worksheets provide a theme where patterns emerge through rhythmic sequences and instrument arrangements within an auditory-creative context that children experience through sound and movement. Shapes worksheets provide a theme where patterns emerge through geometric repetition and spatial tessellation within a visual-mathematical context studied through shape properties. Music teaches patterns through rhythm; shapes teaches patterns through geometry.',
    },
    {
      vsThemeId: 'circus',
      summary: 'Music worksheets provide a theme studying creative performance through instrumental sound, rhythmic structure, and musical composition within a structured pattern-analysis framework. Circus worksheets provide a theme studying creative performance through acrobatic acts, circus animals, and spectacular entertainment within an adventure-engagement framework. Music teaches performance through sound and rhythm; circus teaches performance through spectacle and wonder.',
    },
    {
      vsThemeId: 'toys',
      summary: 'Music worksheets provide a theme studying specific creative instruments designed to produce organized sound patterns through structured musical activities and classification exercises. Toys worksheets provide a theme studying a broad range of play objects designed for various types of engagement through sorting, counting, and imaginative play activities. Music focuses on sound-producing instruments; toys covers all play objects broadly.',
    },
  ],

  productLinks: [
    {
      appId: 'pattern-train',
      anchorText: 'Music pattern worksheets for kids',
      context: 'Sequential reasoning and algebraic thinking develop when children identify and extend rhythmic instrument patterns in our music pattern worksheets for kids, analyzing repeating sequences of drums, bells, and tambourines to predict continuation \u2014 building the pattern recognition and structural analysis that connect rhythmic musical sequences to the algebraic thinking and mathematical prediction that academic success requires.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Music word scramble worksheets printable',
      context: 'Spelling accuracy and musical vocabulary expand when children unscramble instrument and music terms in our music word scramble worksheets printable, rearranging letters to form words like xylophone, tambourine, and orchestra \u2014 building the orthographic processing and domain-specific vocabulary that connect word puzzle practice to the reading fluency and musical literacy that language arts standards require.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Instrument shadow matching worksheets for preschool',
      context: 'Visual discrimination and instrument recognition develop when children match musical instruments to their silhouettes in our instrument shadow matching worksheets for preschool, analyzing the distinctive outlines of guitars, drums, trumpets, and violins \u2014 building the figure-ground discrimination and shape awareness that connect silhouette matching to the visual processing and instrument classification skills that early learning requires.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'Music draw and color worksheets for kindergarten',
      context: 'Fine motor control and creative expression develop when children draw and color musical instruments and scenes in our music draw and color worksheets for kindergarten, creating detailed illustrations of drums, guitars, and pianos \u2014 building the hand-eye coordination and artistic confidence that connect creative drawing practice to the fine motor precision and visual-spatial skills that academic writing and geometric reasoning require.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and instrument recognition in her three- and four-year-olds using a theme where the distinctive shapes of musical instruments provide varied matching targets for children building their first instrument vocabulary.',
      solution: 'She introduces coloring and shadow-match worksheets where the distinctive shapes of drums, guitars, trumpets, and tambourines provide varied matching targets for three-year-old visual discrimination development. Children color instrument illustrations while naming each instrument and describing its shape, then match each instrument to its shadow. Every worksheet session ends with a sound-making activity where children shake maracas, tap drums, or clap rhythms to bridge visual recognition to auditory musical experience.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of musical instruments with their varied shapes. Fine motor control develops through coloring the curved bodies of guitars, the circular shapes of drums, and the detailed valves of trumpets. The teacher reports that the sound-making extension becomes the most anticipated part of every session, with three children who previously struggled to communicate beginning to name instruments and describe their sounds using vocabulary learned from worksheet activities.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate pattern recognition with visual discrimination and literacy but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs pattern-train rhythmic sequence worksheets with matching-app instrument pairing activities and word-search musical vocabulary featuring terms like drum, piano, flute, and rhythm, creating integrated sessions through a classroom music exploration unit where students identify and extend AB and ABC instrument patterns, match instruments by shape and family, and search for musical terms while building the sequential reasoning and classification skills that math and science standards require.',
      outcome: 'Pattern recognition accuracy reaches 88 percent as students practice identifying and extending instrument sequences within engaging musical contexts. Instrument matching skills strengthen as the distinctive shapes of musical instruments provide clear visual discrimination targets. Musical vocabulary usage increases as word-search activities introduce and reinforce terms in context. The teacher reports that five students begin spontaneously identifying instrument patterns in classroom music sessions, connecting worksheet pattern analysis to real auditory musical experience.',
    },
    {
      situation: 'A first-grade teacher wants to connect algebraic pattern thinking, spelling fluency, and explanatory writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated music-math literacy unit combining pattern-worksheet growing sequence activities with word-scramble musical vocabulary puzzles featuring terms like xylophone, orchestra, and tambourine. She extends the unit with a rhythm composition assignment where students create an original eight-beat pattern using three different instruments and write a paragraph explaining their pattern rule to connect algebraic pattern thinking, spelling fluency, and explanatory writing.',
      outcome: 'Pattern analysis accuracy reaches 91 percent as growing sequence activities challenge students to identify rules and predict continuation with mathematical precision. Spelling accuracy for multi-syllable musical vocabulary reaches 85 percent as word-scramble puzzles motivate careful letter analysis. The rhythm composition assignment produces the most mathematically articulate student writing of any literacy unit, and the teacher reports that connecting pattern analysis, vocabulary puzzles, and explanatory writing through the music theme generates authentic engagement because students experience their compositions as both artistic creations and mathematical demonstrations.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed instrument illustrations with varied shapes and design details that provide rich visual musical information. Use shadow-match instrument silhouette activities with high-contrast shapes showing the distinctive outlines of guitars, drums, and trumpets. Assign draw-and-color activities where children create their own instrument illustrations connecting visual creativity to musical knowledge.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with two-element AB patterns like drum-bell-drum-bell before introducing three-element ABC patterns that require tracking more items simultaneously. Reduce word-scramble terms to four-letter music words like drum, bell, and harp before introducing multi-syllable vocabulary like xylophone and tambourine. Pair every worksheet with a physical rhythm activity so children can clap or tap the pattern before analyzing it on paper.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with growing pattern investigation projects where students analyze sequences that increase by a rule and predict the tenth or twentieth term with written mathematical justification. Assign cross-cultural instrument research reports comparing instruments from different musical traditions with evidence-based analytical writing. Extend to original composition projects where students create rhythmic patterns following specific mathematical rules and explain the algebraic structure in multi-paragraph writing.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where drums, guitars, pianos, and trumpets are universally recognized musical instruments that transcend language barriers. Coloring, shadow-match, and pattern-train activities communicate through visual and rhythmic patterns rather than text, and basic instrument names like drum, bell, and horn are among the most recognizable English nouns worldwide due to global exposure to music, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Musical pattern recognition and instrument classification assessment',
      criteria: 'Give students a set of three instrument pattern sequences and five questions. They identify the repeating unit in each pattern, extend each sequence by four elements, name six instruments from illustrations, sort four instruments into two family categories, and write two sentences explaining the pattern rule they discovered. Assess using a three-level rubric: emerging (identifies repeating units in at least two patterns and names at least four instruments), proficient (identifies all repeating units, extends all sequences correctly, names six instruments, sorts into two families with reasoning, and writes two complete sentences about pattern rules), advanced (identifies all patterns with precise mathematical language, extends sequences with written rule explanation, names all instruments with family classification, sorts into multiple categories with detailed reasoning, and writes insightful sentences connecting musical patterns to algebraic thinking and mathematical structure).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one music worksheet per week over a four-week unit. Compare early and late samples to document growth in pattern recognition accuracy across sequence activities, instrument vocabulary breadth in word puzzle worksheets, classification sophistication in sorting and odd-one-out tasks, and fine motor precision in coloring and draw-and-color activities. Look specifically for progression from simple AB pattern recognition to complex growing pattern analysis, and from basic instrument naming to family-based classification with scientific reasoning.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on music coloring, pattern, and classification worksheets, note whether they identify instruments by pointing without verbal labels (Pre-K), name instruments and describe patterns using basic sequential vocabulary while sorting by family with verbal reasoning explanations (K\u20131st), or use sophisticated pattern vocabulary like repeating unit, growing sequence, and classification criteria in complete sentences while analyzing musical patterns with multi-step algebraic reasoning and instrument taxonomy (2nd\u20133rd). Record whether children transfer musical pattern recognition and classification skills to real-world contexts like identifying rhythmic patterns in songs, classifying instruments by sound production method, and using pattern vocabulary in other academic subjects.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Sound Production and Classification by Mechanism \u2014 Vibrating Strings, Air Columns, and Membranes, Cause-and-Effect Through Pitch and Tone & Observation Skills Through Auditory Experimentation)',
      connection: 'Understanding that instruments produce sound through different physical processes including vibrating strings, vibrating air columns, and vibrating membranes develops the mechanism-based classification thinking that biological taxonomy and materials science require. Observing that string length affects pitch and drum size affects tone builds cause-and-effect reasoning through auditory experimentation.',
      activity: 'After completing shadow-match instrument silhouette and odd-one-out classification worksheets, guide students through a sound investigation where they examine three classroom instruments or homemade sound-makers, observe what vibrates when each produces sound, discuss why different instruments create different sounds, and record their observations in a simple science journal \u2014 connecting the classification skills from worksheet activities to the physical science principle that sound is produced by vibration and different vibrating mechanisms create different tonal qualities.',
    },
    {
      subject: 'Math (Pattern Recognition as Algebraic Foundation \u2014 Rhythmic Pattern Analysis, Sequential Reasoning, Growing Musical Sequences & Counting Beats for Multiplication Readiness)',
      connection: 'Rhythmic pattern analysis builds the sequential reasoning that algebraic thinking requires. Extending instrument patterns practices the prediction and rule-identification skills that number patterns demand. Growing musical sequences introduce the concept of mathematical progression. Counting beats within measures develops the grouping and multiplication-readiness thinking that arithmetic fluency requires.',
      activity: 'After completing pattern-train rhythmic sequence and pattern-worksheet growing pattern worksheets, set up a classroom pattern composition station where students create an original four-beat repeating pattern using instrument stamps, extend it to sixteen beats, count the total repetitions, and write a mathematical rule describing their pattern \u2014 connecting worksheet pattern analysis to arithmetic through the creative context of original musical composition that makes algebraic thinking both audible and personally expressive.',
    },
    {
      subject: 'Language Arts (Musical Vocabulary as Literacy Enrichment \u2014 Multi-Syllable Instrument Names for Phonemic Awareness, Academic Musical Terminology & Explanatory Writing About Pattern Rules)',
      connection: 'Instrument names like xylophone, tambourine, and saxophone build phonemic awareness through complex multi-syllable words. Musical terms like rhythm, melody, harmony, and tempo expand academic vocabulary that appears in both artistic and analytical texts. Descriptive writing about musical experiences develops sensory vocabulary and organized composition. Explanatory writing about pattern rules practices the precise analytical language that informational writing standards require.',
      activity: 'After completing word-search musical vocabulary and word-scramble instrument spelling worksheets, guide students through a musical vocabulary writing project where they choose three instruments, write one sentence describing the sound each makes using sensory adjectives, identify which instrument family each belongs to, and compose a paragraph explaining how the three instruments could play a pattern together \u2014 connecting vocabulary acquisition and spelling fluency to descriptive and explanatory writing through the creatively engaging context of imagining a musical performance.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Pattern recognition and creative expression focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Rhythmic pattern analysis + instrument classification + musical vocabulary' },
  ],`;

// ── Pirates: 12 fields ──────────────────────────────────────────────────

const piratesFields = `
  // -- SEO Enrichment (Part 52) --

  uniqueAngle: 'Pirates is the ONLY theme where adventure narrative directly drives spatial reasoning and coordinate thinking \u2014 where every worksheet about following treasure map clues, navigating grid coordinates, plotting routes between islands, or decoding cryptogram messages practices the exact directional vocabulary, coordinate system understanding, and multi-step strategic planning that mathematical and geographic literacy require, wrapped in the most motivating adventure context available to young learners. No other theme delivers this navigation-as-curriculum framework, because while travel teaches about destinations and transportation teaches about vehicles, only pirates makes the act of navigating itself \u2014 reading maps, following coordinates, planning routes, and decoding spatial information \u2014 the central, unavoidable learning objective of every activity. This navigation-centrality framework is structurally different from all other themes because pirate worksheets teach spatial and strategic thinking through a narrative that children find so intrinsically exciting that even the most reluctant learners persist through challenging multi-step problems \u2014 the treasure at the end of the map transforms academic persistence from obligation into adventure. Pirates is also the ONLY theme where code-breaking and decoding are natural, central literacy activities rather than supplementary puzzles \u2014 where cryptogram worksheets that replace letters with symbols practice the exact same decoding-encoding cognitive process that phonics instruction requires, making pirates the most powerful theme for connecting puzzle-solving excitement to the letter-sound decoding that reading fluency demands. The historical dimension adds a unique research-reasoning layer: pirate worksheets introduce the Age of Exploration, real navigation technology, and the distinction between historical fact and popular legend, building the evidence-evaluation skills that critical thinking across all subjects requires. The combination of navigation-as-core-spatial-curriculum, unmatched motivational power for reluctant learners, natural code-breaking literacy, and historical research reasoning makes pirates the most spatially foundational and motivationally powerful theme across all 50 available.',

  researchCitation: 'Guthrie, J. T. & Wigfield, A. (2000). "Engagement and Motivation in Reading." Handbook of Reading Research, Vol. III, 403\u2013422 \u2014 establishing that adventure-themed narrative contexts significantly increase reading engagement, task persistence, and comprehension achievement in young learners, because children who encounter academic content embedded within compelling adventure narratives demonstrate stronger motivation to complete challenging tasks, greater willingness to persist through difficulty, and deeper comprehension of both narrative and informational text, making adventure themes like pirates uniquely effective vehicles for building the sustained academic engagement that literacy and mathematical achievement require.',

  snippetDefinition: 'Pirate and adventure worksheets for kids are printable educational activities featuring treasure maps, sailing ships, gold coins, parrots, islands, and pirate characters designed to build spatial reasoning, coordinate navigation, code-breaking literacy, and adventure-driven mathematical thinking for children ages 3 through 9. They include coloring pages for fine motor development, find-objects for visual scanning in busy ship scenes, matching and shadow-matching for visual discrimination, addition with gold coin counters, word search and word scramble for adventure vocabulary, image cryptogram for code-breaking literacy, sudoku for logical reasoning, treasure-hunt for multi-step problem-solving, and picture-path for route navigation.',

  snippetHowTo: [
    'Start with coloring pages of pirate ships, tropical islands, and treasure scenes to build fine motor control and adventure vocabulary through bold, exciting illustrations that immediately draw children into the learning quest.',
    'Progress to shadow-match and matching-app worksheets where children pair pirate characters and props to their silhouettes and match identical adventure items, developing visual discrimination through the distinctive shapes of anchors, compasses, treasure chests, and sailing ships.',
    'Introduce spatial navigation with treasure-hunt worksheets where children follow directional clues across grids and picture-path activities where they navigate routes through island mazes, building the map-reading and coordinate skills that geography and geometry require.',
    'Advance to literacy with word-search adventure vocabulary, word-scramble spelling puzzles, and image-cryptogram code-breaking activities where decoding symbol-letter ciphers practices the same cognitive process as phonics decoding.',
    'Incorporate arithmetic with image-addition worksheets using gold coin counters that embed math within treasure-counting scenarios children find irresistible.',
    'Extend to logical reasoning with sudoku pirate puzzles and find-objects visual scanning challenges on busy ship deck scenes that develop deductive thinking and focused attention.',
    'Connect to real adventure through classroom treasure hunts with written clues, backyard map-making projects, and historical exploration discussions that verify worksheet concepts through hands-on navigation and discovery experiences.',
  ],

  limitations: 'Pirate worksheets\\u2019 focus on spatial navigation, code-breaking, and adventure-driven problem-solving provides less direct scope for scientific investigation, measurement precision, or social-emotional learning than themes like nature, cooking, or emotions where ecological observation, culinary measurement, and feelings identification drive the activities. The theme\\u2019s strength in spatial reasoning, coordinate thinking, and narrative motivation means it offers less material for classification taxonomy, procedural sequencing, or artistic expression than themes with stronger science, routine, or creative dimensions. While pirate adventure is universally exciting to children, the historical pirate context involves elements of conflict and treasure-taking, and teachers should frame activities around exploration, navigation, and problem-solving rather than romanticizing piracy.',

  themeComparisons: [
    {
      vsThemeId: 'fairy-tales',
      summary: 'Pirates worksheets provide a theme where adventure drives spatial reasoning through treasure maps, coordinate navigation, and code-breaking within oceanic exploration scenarios. Fairy tales worksheets provide a theme where storytelling drives narrative comprehension through character analysis, moral reasoning, and story structure within enchanted kingdom scenarios. Pirates teaches through navigation adventure; fairy tales teaches through literary narrative.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Pirates worksheets provide a theme using the maritime setting as a backdrop for treasure-hunting adventure, spatial navigation, and code-breaking puzzle activities focused on map-reading and coordinate skills. Ocean worksheets provide a theme studying marine life, underwater ecosystems, and ocean science through biological classification, habitat observation, and environmental awareness activities. Pirates uses the ocean for adventure; ocean studies the ocean for science.',
    },
    {
      vsThemeId: 'camping',
      summary: 'Pirates worksheets provide a theme studying adventure through maritime navigation, treasure-map coordinate systems, and code-breaking within seafaring exploration contexts. Camping worksheets provide a theme studying adventure through outdoor wilderness exploration, nature observation, and camping skills within land-based outdoor contexts. Pirates teaches adventure at sea; camping teaches adventure on land.',
    },
    {
      vsThemeId: 'superheroes',
      summary: 'Pirates worksheets provide a theme where adventure motivation drives spatial reasoning and code-breaking through historically grounded maritime exploration and treasure-hunting scenarios. Superheroes worksheets provide a theme where adventure motivation drives creative thinking and moral reasoning through modern fictional heroism and good-versus-evil scenarios. Pirates teaches adventure through historical exploration; superheroes teaches adventure through modern heroism.',
    },
  ],

  productLinks: [
    {
      appId: 'treasure-hunt',
      anchorText: 'Pirate treasure hunt worksheets for kids',
      context: 'Spatial reasoning and multi-step problem-solving develop when children follow directional clues across treasure map grids in our pirate treasure hunt worksheets for kids, navigating from start to treasure using directional vocabulary and sequential logic \u2014 building the coordinate thinking and strategic planning that connect adventure-based navigation practice to the geography, geometry, and mathematical reasoning that academic success requires.',
    },
    {
      appId: 'image-cryptogram',
      anchorText: 'Pirate code breaking worksheets printable',
      context: 'Decoding fluency and analytical reasoning develop when children crack symbol-to-letter ciphers in our pirate code breaking worksheets printable, replacing pirate symbols with alphabet letters to reveal hidden messages \u2014 building the same decoding-encoding cognitive process that phonics instruction requires, connecting puzzle-solving excitement to the letter-sound mapping and reading fluency that literacy standards demand.',
    },
    {
      appId: 'picture-path',
      anchorText: 'Pirate maze worksheets for kindergarten',
      context: 'Route planning and sequential reasoning develop when children navigate through island mazes in our pirate maze worksheets for kindergarten, finding paths from ship to treasure through coral reefs and tropical islands \u2014 building the spatial navigation and planning-ahead thinking that connect maze-solving practice to the directional reasoning and strategic problem-solving that mathematical and geographic literacy require.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Pirate shadow matching worksheets for preschool',
      context: 'Visual discrimination and adventure vocabulary develop when children match pirate characters and props to their silhouettes in our pirate shadow matching worksheets for preschool, analyzing the distinctive outlines of anchors, compasses, treasure chests, and sailing ships \u2014 building the figure-ground discrimination and shape awareness that connect silhouette matching to the visual processing and spatial recognition skills that early learning requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and adventure vocabulary in her three- and four-year-olds using a theme where the distinctive shapes of pirate props provide exciting matching targets for children building their first navigation vocabulary.',
      solution: 'She introduces coloring pages of pirate ships and treasure scenes alongside shadow-match worksheets where the distinctive shapes of anchors, treasure chests, parrots, and sailing ships provide exciting matching targets for three-year-old visual discrimination development. Children color pirate illustrations while naming adventure objects and their functions, then match each item to its shadow. Every worksheet session ends with a classroom treasure search where children find hidden objects using simple directional clues to bridge visual recognition to spatial exploration experience.',
      outcome: 'Visual discrimination accuracy improves significantly over four weeks as children practice matching the distinctive silhouettes of pirate props with their varied adventure shapes. Fine motor control develops through coloring the detailed rigging of ships, the curved shapes of anchors, and the elaborate designs of treasure chests. The teacher reports that the classroom treasure search extension becomes the most anticipated part of every session, with three children who previously struggled with directional language beginning to use words like under, behind, and next to during the treasure-finding activity.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate visual scanning with spatial reasoning and literacy but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs find-objects busy ship scene worksheets with treasure-hunt grid navigation activities and word-search adventure vocabulary featuring terms like treasure, compass, island, and anchor, creating integrated sessions through a pirate adventure unit where students find hidden items in detailed illustrations, follow directional clues across simple grids, and search for adventure terms while building the spatial vocabulary and visual discrimination skills that geography and geometry standards require.',
      outcome: 'Visual scanning accuracy reaches 90 percent as students practice finding hidden objects within engaging pirate ship scenes. Grid navigation skills strengthen as treasure-hunt activities introduce basic directional vocabulary in exciting adventure contexts. Adventure vocabulary usage increases as word-search activities introduce and reinforce terms. The teacher reports that five students begin spontaneously using directional vocabulary during other classroom activities, describing where materials are located using spatial terms they learned from pirate navigation worksheets.',
    },
    {
      situation: 'A first-grade teacher wants to connect decoding literacy, spelling fluency, and spatial-descriptive writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated pirate navigation literacy unit combining image-cryptogram code-breaking worksheets with word-scramble adventure vocabulary puzzles featuring terms like compass, voyage, and horizon. She extends the unit with a treasure map creation project where students design their own grid-coordinate map with at least four labeled landmarks and write step-by-step navigation directions using directional vocabulary to connect decoding literacy, spelling fluency, and spatial-descriptive writing.',
      outcome: 'Cryptogram decoding accuracy reaches 89 percent as students practice the symbol-to-letter mapping that parallels phonics decoding processes. Spelling accuracy for adventure vocabulary reaches 86 percent as word-scramble puzzles motivate careful letter analysis. The treasure map creation project produces the most spatially detailed and directionally precise student writing of any literacy unit, and the teacher reports that connecting code-breaking, vocabulary puzzles, and spatial-descriptive writing through the pirate theme generates authentic engagement because students experience their maps as real navigation tools they created themselves.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed pirate ship and island scenes with multiple visual elements that provide rich adventure imagery for spatial engagement. Use shadow-match pirate character and prop silhouette activities with high-contrast adventure shapes showing the distinctive outlines of anchors, compasses, and treasure chests. Assign find-objects busy ship scene activities with richly illustrated environments that reward careful visual scanning and spatial attention.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with simple two-step treasure paths before introducing multi-step grid navigation that requires tracking more directions simultaneously. Reduce cryptogram activities to five-symbol codes before introducing full alphabet ciphers. Pair every map worksheet with a physical classroom treasure hunt so children can walk the route before tracing it on paper, bridging bodily spatial experience to abstract representation.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-coordinate treasure map design projects where students create grid maps with ten or more landmarks using letter-number pairs and write detailed navigation instructions for classmates to follow. Assign historical exploration research reports comparing real maritime expeditions with evidence-based analytical writing distinguishing documented fact from popular legend. Extend to cryptogram creation projects where students design their own cipher systems and write coded messages with solution keys for classmates.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where treasure chests, pirate ships, parrots, and gold coins are universally recognized adventure symbols that transcend language barriers. Coloring, shadow-match, and picture-path activities communicate through visual navigation and spatial patterns rather than text, and basic adventure words like ship, map, and gold are among the most recognizable English vocabulary worldwide due to global exposure to pirate media, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Pirate spatial navigation and code-breaking assessment',
      criteria: 'Give students a simple grid-coordinate treasure map and a set of five questions. They identify three landmarks by their grid coordinates, write directions from one location to another using directional vocabulary, decode a five-symbol cryptogram message, solve a two-step treasure word problem, and write two sentences explaining the route they would take to reach the treasure and why. Assess using a three-level rubric: emerging (identifies at least two landmarks by coordinates and decodes at least three symbols), proficient (identifies all three landmarks, writes directions using three or more directional terms, decodes the full cryptogram, solves the word problem correctly, and writes two complete sentences about route reasoning), advanced (identifies all landmarks with precise coordinate language, writes detailed multi-step directions with distance and directional vocabulary, decodes the cryptogram and explains the cipher pattern, solves the word problem with written mathematical reasoning, and writes insightful sentences connecting navigation strategy to spatial planning and coordinate thinking).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one pirate worksheet per week over a four-week unit. Compare early and late samples to document growth in spatial navigation accuracy across treasure-hunt and picture-path activities, decoding fluency in cryptogram worksheets, adventure vocabulary breadth in word puzzle activities, and visual scanning precision in find-objects exercises. Look specifically for progression from simple path-following to multi-step coordinate navigation, and from basic symbol decoding to fluent cipher-breaking with pattern recognition.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on pirate coloring, navigation, and code-breaking worksheets, note whether they follow simple paths by pointing without verbal direction descriptions (Pre-K), use basic directional vocabulary like left, right, up, and down while decoding simple symbol codes with verbal reasoning explanations (K\u20131st), or use sophisticated spatial vocabulary like coordinates, grid reference, and cipher pattern in complete sentences while analyzing navigation routes with multi-step strategic reasoning and code-breaking with pattern identification (2nd\u20133rd). Record whether children transfer pirate spatial reasoning and decoding skills to real-world contexts like giving directions to locations, reading simple maps, using directional vocabulary in other academic subjects, and applying code-breaking logic to phonics decoding tasks.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Navigation Technology and Observation Skills \u2014 Compass and Map Technology, Weather and Ocean Science & Visual Observation Through Detail Identification)',
      connection: 'Understanding that compasses, maps, and stars were the technology sailors used to navigate builds awareness of how scientific tools solve real problems. Observing differences between pirate ship illustrations to find hidden objects develops the careful visual observation that scientific inquiry requires. Discussing how weather affected ocean voyages connects adventure narratives to earth science concepts about wind, currents, and atmospheric conditions.',
      activity: 'After completing find-objects ship scene and treasure-hunt grid navigation worksheets, guide students through a navigation technology investigation where they examine a simple compass, observe how the needle always points north, discuss how pirates used this tool to navigate without GPS, and record their observations about magnetic direction in a simple science journal \u2014 connecting the spatial navigation skills from worksheet activities to the physical science principle that magnetism provides a reliable directional reference for exploration and travel.',
    },
    {
      subject: 'Math (Coordinate Systems and Strategic Reasoning \u2014 Treasure Map Grid Navigation, Counting Gold Coins for Number Sense & Multi-Step Treasure Problems for Sequential Operational Thinking)',
      connection: 'Treasure map grid navigation introduces the coordinate pair concept that formal graphing requires. Counting gold coins builds number sense through motivating treasure contexts. Multi-step treasure problems develop the sequential operational thinking that complex word problems demand. Treasure-sharing division problems introduce equal partitioning through the compelling fairness context of dividing loot among crew members.',
      activity: 'After completing treasure-hunt grid coordinate and image-addition gold coin counting worksheets, set up a classroom treasure math station where students plot five treasure locations on a coordinate grid using letter-number pairs, calculate the total gold coins at each location using addition, determine which location has the most treasure, and write a mathematical explanation of their treasure-finding strategy \u2014 connecting worksheet coordinate navigation and arithmetic skills to data analysis through the irresistibly motivating context of pirate treasure that makes abstract mathematical concepts feel like genuine adventure.',
    },
    {
      subject: 'Language Arts (Code-Breaking as Literacy Foundation \u2014 Cryptogram Decoding for Phonics Transfer, Adventure Vocabulary for Academic Word Banks & Spatial-Descriptive Writing for Composition Skills)',
      connection: 'Cryptogram decoding practices the exact symbol-to-letter mapping process that phonics instruction requires, building the decoding fluency that reading depends on. Adventure vocabulary including compass, voyage, horizon, and expedition expands academic word banks with vivid, memorable terms. Directional writing about map navigation develops precise spatial composition. Adventure narrative writing with dialogue and descriptive detail practices the full range of creative composition skills that language arts standards demand.',
      activity: 'After completing image-cryptogram code-breaking and word-scramble adventure vocabulary worksheets, guide students through an adventure writing project where they decode a secret treasure message using their cryptogram skills, write three sentences describing the treasure location using directional vocabulary from their worksheets, and compose a short adventure paragraph narrating the journey to find the treasure with at least two descriptive adjectives and one line of dialogue \u2014 connecting decoding fluency and vocabulary acquisition to creative narrative writing through the compelling adventure context that makes composition feel like an expedition rather than an assignment.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Spatial navigation and adventure motivation focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Coordinate navigation + code-breaking literacy + adventure vocabulary' },
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

console.log('Part 52: Enriching music & pirates theme hub pages...\n');

console.log('1. Injecting 12 fields into music/en.ts...');
injectFields(path.join(base, 'music', 'en.ts'), musicFields);

console.log('2. Injecting 12 fields into pirates/en.ts...');
injectFields(path.join(base, 'pirates', 'en.ts'), piratesFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
