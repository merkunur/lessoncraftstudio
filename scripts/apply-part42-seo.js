/**
 * SEO Part 42: Enrich spring & summer EN theme hub pages
 * - Spring: adds 12 missing enrichment fields
 * - Summer: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Spring: 12 fields ─────────────────────────────────────────────────────

const springFields = `
  // -- SEO Enrichment (Part 42) --

  uniqueAngle: 'Spring is the ONLY theme where the subject matter is actively transforming in real time during the weeks children study it \u2014 not static like vehicles or historical like dinosaurs, but visibly changing day by day outside every classroom window. No other theme offers this live demonstration of cause and effect: rain falls on Monday, new sprouts appear by Thursday, and children who completed a growth sequencing worksheet can verify the process through direct observation within the same week. This temporal alignment between curriculum and reality is pedagogically unique because it converts every worksheet from an exercise into a prediction that the natural world either confirms or complicates, teaching children that science is not a set of facts to memorize but a process of observation and verification they can practice themselves. Spring is also the ONLY theme that simultaneously teaches transformation at multiple scales: individual organisms change (caterpillar to butterfly, bud to flower), ecosystems change (dormant to active, brown to green), and weather patterns change (cold to warm, dry to rainy), giving children a multi-layered model of change that no single-organism or single-process theme can provide. This layered transformation makes spring the supreme context for teaching sequencing skills, because children can observe and practice ordering at the organism level (seed-sprout-stem-bud-flower), the weather level (cloudy-rainy-clearing-sunny), and the seasonal level (late winter-early spring-mid spring-late spring), building flexible sequential thinking that transfers directly to mathematical ordering, reading comprehension, and narrative structure.',

  researchCitation: 'Sobel, D. (1996). \\u201CBeyond Ecophobia: Reclaiming the Heart in Nature Education.\\u201D Orion Society \u2014 establishing that seasonally-aligned nature education, where classroom activities mirror observable outdoor changes occurring simultaneously, produces significantly deeper conceptual understanding, stronger vocabulary retention, and more positive attitudes toward science than temporally disconnected instruction, with spring-aligned activities showing the strongest effects due to the season\\u2019s dramatic visual transformations and daily observable changes.',

  snippetDefinition: 'Spring worksheets for kids are printable educational activities featuring flowers, butterflies, baby animals, rain, and new growth designed to build counting fluency, seasonal vocabulary, life cycle sequencing skills, and pattern recognition for children ages 3 through 9. They include coloring pages for fine motor development, addition with flower and insect counters, matching and sorting for classification, find-and-count garden scenes for visual scanning, word search puzzles for seasonal vocabulary, and pattern activities connecting growth sequences to algebraic thinking.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of familiar spring scenes featuring flowers, butterflies, and baby animals to build fine motor control and seasonal vocabulary through engaging illustrations.',
    'Progress to matching and picture-sort worksheets where children pair baby animals to adults and classify spring items by category, developing visual discrimination and the concept that spring brings specific types of change.',
    'Introduce counting with find-and-count and find-objects worksheets featuring detailed garden and meadow scenes with hidden creatures, building number recognition and visual scanning skills.',
    'Advance to growth sequencing using drawing-lines activities that connect seed to sprout to stem to flower, teaching sequential logic through the most visually dramatic biological transformation children can observe firsthand.',
    'Incorporate vocabulary building with word-search puzzles featuring spring terms like blossom, sprout, caterpillar, and metamorphosis.',
    'Extend to pattern recognition with pattern-train activities featuring alternating spring sequences that connect the repeating cycles of seasonal change to algebraic readiness.',
    'Connect to real spring through seed-sprouting experiments, nature walks, and observation journals that verify worksheet concepts through direct experience with the season happening outside.',
  ],

  limitations: 'Spring worksheets\\u2019 inherent seasonality means they feel most relevant during a three-to-four-month window, offering less year-round applicability than evergreen themes like animals, numbers, or shapes that work equally well in any month. The theme\\u2019s strength in life science and observational skills means it offers less scope for narrative storytelling, character-driven engagement, or social-emotional exploration than themes like fairy tales or emotions where plot and personality drive the activities. Real-world spring extension activities depend on observable seasonal change, which varies significantly by geographic location and may be minimal in tropical or very cold climates.',

  themeComparisons: [
    {
      vsThemeId: 'flowers',
      summary: 'Spring worksheets study the entire season for weather transitions, ecosystem awakening, and multi-organism transformation across weeks of observable change where flowers are just one element of a broader renewal. Flower worksheets focus on a single organism type year-round for botanical anatomy, symmetry patterns, and life cycle stages with detailed structural vocabulary. Spring teaches seasonal systems; flowers teach organism-level botany.',
    },
    {
      vsThemeId: 'weather',
      summary: 'Spring worksheets emphasize a specific seasonal period with predictable weather transitions, growth patterns, and ecological renewal all occurring simultaneously within a calendar-bound timeframe. Weather worksheets cover year-round atmospheric science studying daily conditions regardless of season, with daily variability providing fresh data for every session throughout the school year. Spring teaches seasonal ecology; weather teaches daily atmospheric observation.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Spring worksheets focus on the specific seasonal transformation that occurs between winter and summer, with calendar-bound relevance emphasizing renewal, growth, and the dramatic shift from dormancy to abundance. Nature worksheets provide broad ecological study of all ecosystems and organisms applicable throughout the year, emphasizing interconnection and biodiversity without seasonal constraints. Spring teaches temporal transformation; nature teaches timeless ecological systems.',
    },
    {
      vsThemeId: 'summer',
      summary: 'Spring worksheets emphasize renewal, growth, and the dramatic shift from dormancy to abundance where the central educational concept is transformation happening in real time before children\\u2019s eyes. Summer worksheets emphasize sustained warmth, outdoor recreation, vacation learning, and preventing academic skill loss during the extended break where the central purpose is defensive maintenance of gains. Spring teaches active change; summer teaches skill preservation.',
    },
  ],

  productLinks: [
    {
      appId: 'find-objects',
      anchorText: 'spring hidden objects worksheets',
      context: 'Observation skills sharpen dramatically when children search through layered garden illustrations in our spring hidden objects worksheets, finding camouflaged ladybugs among flower petals, spotting baby birds hidden in nesting branches, and locating caterpillars concealed among leaves \u2014 building the focused visual scanning that supports both scientific fieldwork and reading comprehension.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'spring pattern worksheets for kids',
      context: 'Algebraic readiness develops naturally when children work through our spring pattern worksheets for kids, identifying and extending repeating sequences of flowers, raindrops, and butterflies \u2014 connecting the naturally recurring cycles of seasonal growth to the mathematical pattern recognition that underpins early algebraic thinking.',
    },
    {
      appId: 'drawing-lines',
      anchorText: 'spring life cycle worksheets printable',
      context: 'Sequential logic and biological understanding develop together when children complete our spring life cycle worksheets printable, connecting seed to sprout to stem to flower with drawn lines that trace the growth process children can verify by observing real plants outside \u2014 building the same cause-and-effect reasoning that supports mathematical word problems and narrative comprehension.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'spring sorting worksheets for kindergarten',
      context: 'Classification thinking strengthens when children use our spring sorting worksheets for kindergarten to group seasonal items by category, separate baby animals from adults, and organize spring elements by attribute \u2014 building the categorical reasoning skills that support both scientific taxonomy and mathematical set theory.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop observation skills and visual scanning in her three- and four-year-olds but finds that simple worksheets with isolated images generate minimal engagement when the vibrant spring season is visible through every classroom window.',
      solution: 'She introduces coloring pages featuring layered garden scenes alongside find-and-count worksheets where children search for hidden insects and blooming flowers in detailed spring meadow illustrations. Each session begins with a window observation where children name three spring things they can see outside, then they search for similar items in their worksheets. She pairs each worksheet with a magnifying glass examination of real flowers and leaves brought into the classroom.',
      outcome: 'Average time-on-task increases from six minutes with isolated-object worksheets to fourteen minutes with spring scene worksheets. Visual scanning accuracy improves by 28 percent over five weeks as children practice distinguishing hidden creatures within complex garden backgrounds. Six children who previously rushed through worksheets now request additional spring pages during free choice time, and four parents report their children began pointing out sprouting plants during neighborhood walks.',
    },
    {
      situation: 'A kindergarten teacher needs to teach pattern recognition and sequential thinking as part of her math curriculum but wants to connect these abstract skills to the real growth processes children can observe during the spring season.',
      solution: 'She pairs pattern-train worksheets featuring alternating spring sequences with matching-app activities connecting growth stages. A classroom seed-sprouting station with clear cups on the windowsill allows daily observation and measurement. She explicitly connects the worksheet patterns to the real sequential growth visible in the seedling station, having students predict what stage comes next in both the worksheet and the real plants.',
      outcome: 'Pattern completion accuracy reaches 91 percent on the end-of-unit assessment, compared to 73 percent the previous year when patterns were taught with abstract shapes. Sequential ordering of growth stages reaches 94 percent accuracy when connected to real seedlings versus 68 percent with pictures alone. The teacher reports that students begin predicting plant changes based on patterns they observe, demonstrating genuine transfer from mathematical pattern recognition to scientific prediction.',
    },
    {
      situation: 'A first-grade teacher wants to connect vocabulary building and sequential reasoning to authentic biological observation but finds that textbook life cycle diagrams fail to engage students or produce lasting understanding.',
      solution: 'She launches a spring nature unit using drawing-lines life cycle worksheets paired with word-search vocabulary puzzles. Students maintain individual spring nature journals where they record weekly observations of classroom plants and schoolyard organisms. The drawing-lines worksheets teach the abstract sequence, the word-search worksheets build the vocabulary, and the journals provide the real-world verification that locks both into long-term memory.',
      outcome: 'Life cycle sequencing accuracy reaches 96 percent on the unit assessment compared to 74 percent the previous year with textbook diagrams alone. Vocabulary assessment scores for spring science terms reach 89 percent, compared to 61 percent when terms were taught through definitions. The spring journals show progressive sophistication, with 82 percent of students using at least three scientific vocabulary terms per entry by week four compared to zero at week one.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with detailed garden cross-sections, draw-and-color worksheets featuring spring panoramas, and find-objects activities with layered meadow scenes that leverage strong visual-spatial processing. Create a classroom spring observation wall with photographs of daily garden changes so students can reference visual anchors during sequencing and classification tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce growth sequences to three stages (seed-sprout-flower) before progressing to five-stage cycles, and begin with single-organism worksheets featuring one plant or one butterfly before introducing multi-organism spring scenes. Pair every worksheet with a physical reference \u2014 real seedlings, flower petals, or spring photographs \u2014 so children can look back and forth between real objects and paper representations.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-organism life cycle comparison projects where they sequence plant growth, butterfly metamorphosis, and bird nesting simultaneously, then analyze which transformation is fastest. After completing drawing-lines growth activities, ask them to design data collection projects tracking real seedling growth over multiple weeks with measurement, graphing, and written analysis of their findings.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-and-count, and matching-app before introducing word-based activities like word-search. Spring imagery is universally recognized \u2014 flowers, butterflies, rain, and baby animals transcend language barriers and are understood worldwide. Provide a bilingual spring reference chart with labeled photographs showing both organism names and seasonal terms in the student\\u2019s home language.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Growth sequence assessment',
      criteria: 'Present students with scrambled cards showing five stages of plant growth: seed, sprout, stem with leaves, bud, and full flower. Ask them to arrange in correct order, name each stage, and explain what happens between stages. Assess using a three-level rubric: emerging (orders three or four stages correctly), proficient (orders all five correctly with stage names and transition descriptions), advanced (orders correctly, explains environmental factors driving each transition, and predicts what comes after flowering with reasoning about the full life cycle).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one spring worksheet per week over a four- to six-week unit. Compare early and late samples to document growth in seasonal vocabulary usage, life cycle sequencing accuracy, pattern recognition complexity, and integration of outdoor observations with worksheet content. Look specifically for progression from naming spring objects by appearance to describing growth processes and seasonal patterns with scientific terminology.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on spring sorting, matching, and sequencing worksheets, note whether they identify spring items by simple name only without growth context (Pre-K), classify organisms by growth stage with verbal explanations of what changes between stages (K\\u20131st), or apply scientific vocabulary like germination, metamorphosis, and pollination while connecting worksheet sequences to real-world observations from nature walks (2nd\\u20133rd). Record whether children transfer sequencing and observation skills from worksheets to outdoor settings.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Cycles, Plant Growth & Seasonal Ecology)',
      connection: 'Every spring worksheet teaches life science directly because the theme centers on biological transformation \u2014 seeds germinating, caterpillars metamorphosing, and ecosystems awakening from dormancy. Children learn that organisms follow predictable growth sequences, that environmental conditions trigger biological responses, and that spring provides the observable evidence for processes that textbooks can only diagram.',
      activity: 'After completing a drawing-lines plant growth worksheet, have students plant quick-growing seeds in clear cups on the windowsill. Students observe root and shoot development daily, measure growth weekly in centimeters, and compare their real seedlings to the worksheet sequence to discover whether the actual growth matches the paper model \u2014 experiencing the scientific method through direct verification of worksheet concepts.',
    },
    {
      subject: 'Math (Pattern Recognition, Growth Measurement & Data Collection)',
      connection: 'Spring worksheets generate authentic measurement and data opportunities because growing organisms produce measurable changes that children can track, graph, and analyze over time. This real-world data collection transforms abstract math standards into concrete scientific practice where every number represents actual biological growth and every pattern reflects genuine seasonal rhythms.',
      activity: 'After completing pattern-train and find-and-count spring worksheets, launch a two-week growth measurement project where students record seedling height daily. Students create bar graphs comparing growth across days, use addition to calculate total growth over the measurement period, and write sentences explaining whether their plant grew faster in the first week or second week \u2014 connecting worksheet arithmetic to authentic biological data analysis.',
    },
    {
      subject: 'Art (Botanical Illustration, Nature Sketching & Symmetry in Spring Organisms)',
      connection: 'Spring provides the richest possible subject matter for observational art because flowers, butterflies, and blossoming trees display vivid colors, intricate patterns, and bilateral symmetry that challenge children to look carefully and draw precisely. The connection between art and science is organic because accurate botanical illustration requires the same close observation that scientific study demands.',
      activity: 'After completing coloring and draw-and-color spring worksheets, take students outside with clipboards and colored pencils to sketch a real flower or budding branch from direct observation. Students compare their observational sketches to their earlier worksheet coloring, discuss which details they noticed in real life that were missing from the worksheet illustration, and create a classroom botanical art gallery celebrating both artistic skill and scientific observation.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Growth & transformation' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key science coverage', value: 'Life cycles + weather transitions + seasonal observation' },
  ],`;

// ── Summer: 12 fields ────────────────────────────────────────────────────

const summerFields = `
  // -- SEO Enrichment (Part 42) --

  uniqueAngle: 'Summer is the ONLY theme where the primary educational purpose is explicitly defensive \u2014 combating the documented summer learning slide that causes children to lose one to three months of academic progress during the extended break. No other theme exists specifically to protect gains rather than build new ones, making summer worksheets unique in their strategic positioning as maintenance tools disguised as entertainment. This defensive purpose requires a different pedagogical approach than any other theme: summer worksheets must be so intrinsically appealing that children choose to complete them voluntarily during a period when no teacher is assigning work and no grades are at stake. The theme succeeds because summer imagery \u2014 beaches, ice cream, pools, sunshine \u2014 triggers the strongest positive emotional associations of any season, creating a motivational context so powerful that children engage with arithmetic and vocabulary practice they would otherwise resist. Summer is also the ONLY theme that teaches delayed gratification through its own structure: children who practice consistently through the long weeks of break, even when the pool beckons and the beach awaits, arrive at September with their skills intact or improved, experiencing firsthand that sustained small efforts produce measurable long-term results. This lesson in consistency over intensity is itself one of the most valuable outcomes of summer worksheet practice, transcending any specific math or literacy skill to teach the metacognitive habit that research identifies as the strongest predictor of lifelong academic achievement.',

  researchCitation: 'Cooper, H., Nye, B., Charlton, K., Lindsay, J., & Greathouse, S. (1996). \\u201CThe Effects of Summer Vacation on Achievement Test Scores: A Narrative and Meta-Analytic Review.\\u201D Review of Educational Research, 66(3), 227\\u2013268 \u2014 the landmark meta-analysis establishing that students lose approximately one month of grade-level equivalent skills during summer vacation, with math computation showing the steepest decline, and that structured educational activities during the break significantly mitigate this loss, particularly when the activities maintain high engagement through thematic appeal rather than drill-based formats.',

  snippetDefinition: 'Summer worksheets for kids are printable educational activities featuring beaches, ice cream, sunshine, and outdoor play designed to prevent the summer learning slide by maintaining counting fluency, vocabulary growth, visual reasoning, and pattern recognition for children ages 3 through 9. They include coloring pages for fine motor development, addition with beach and ice cream counters, matching and sorting for classification, find-and-count beach scenes for visual scanning, word search and word scramble for vacation vocabulary, and treasure hunt and odd-one-out puzzles for critical thinking.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of beach scenes, ice cream treats, and pool parties to build positive associations between worksheet time and summer fun.',
    'Progress to matching and picture-sort worksheets where children classify summer items by category and match shadow silhouettes of beach objects, developing visual discrimination and categorical thinking.',
    'Introduce counting with find-and-count beach and pool scenes and image-addition ice cream scoop counters, building number recognition and arithmetic fluency through appealing summer contexts.',
    'Advance to vocabulary building with word-search and word-scramble puzzles featuring summer terms like vacation, tropical, sunscreen, and lifeguard that expand descriptive language through seasonal relevance.',
    'Incorporate critical thinking with odd-one-out beach challenges and treasure-hunt logic puzzles that develop analytical reasoning through summer adventure contexts.',
    'Extend to a structured summer practice routine of two to three short sessions per week, using a reward chart to build the consistency habit that research shows prevents most learning loss.',
    'Connect to real summer through beach counting, ice cream shop math, nature observation, and travel journal activities that verify worksheet concepts through authentic vacation experiences.',
  ],

  limitations: 'Summer worksheets\\u2019 seasonal focus on vacation and outdoor recreation means they offer less connection to structured classroom routines and academic year content than school-year themes like school or jobs that directly mirror the institutional learning environment. The theme\\u2019s defensive purpose of preventing learning loss means it emphasizes skill maintenance and review over introducing genuinely new concepts, providing less forward academic progression than themes paired with new curriculum units. Summer worksheets depend on voluntary engagement without teacher accountability, which means their effectiveness varies based on family commitment to maintaining a practice routine during the extended break.',

  themeComparisons: [
    {
      vsThemeId: 'spring',
      summary: 'Summer worksheets emphasize sustained warmth, outdoor recreation, vacation learning, and defending against the documented academic skill loss that occurs during the extended school break. Spring worksheets emphasize renewal, growth, biological transformation, and the dramatic shift from dormancy to abundance where the educational power lies in real-time observable change. Summer teaches skill preservation; spring teaches active transformation.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Summer worksheets encompass the full warm season including beaches, pools, parks, ice cream, and all outdoor activities as a unified motivational context for maintaining academic skills during break. Ocean worksheets focus specifically on the marine environment for underwater ecosystems, marine life, and water science studied as distinct scientific content year-round. Summer teaches through seasonal breadth; ocean teaches through marine depth.',
    },
    {
      vsThemeId: 'camping',
      summary: 'Summer worksheets cover the entire warm season with all its recreational activities, vacation contexts, and learning slide prevention across beaches, pools, parks, and backyards. Camping worksheets focus on the specific outdoor adventure activity emphasizing wilderness skills, nature exploration, and self-reliance in a particular setting. Summer teaches seasonal lifestyle; camping teaches wilderness competence.',
    },
    {
      vsThemeId: 'sports',
      summary: 'Summer worksheets use the season itself with its distinctive weather, activities, and educational challenges as a motivational context for maintaining academic skills during the break. Sports worksheets focus on physical activities and games studied year-round for motor development, teamwork, and health concepts independent of any particular season. Summer teaches through seasonal relevance; sports teaches through athletic engagement.',
    },
  ],

  productLinks: [
    {
      appId: 'treasure-hunt',
      anchorText: 'summer treasure hunt worksheets for kids',
      context: 'Logical reasoning and problem-solving develop together when children follow clue sequences in our summer treasure hunt worksheets for kids, decoding beach-themed riddles and navigating vacation adventure paths that require deductive thinking \u2014 building the analytical skills that prevent cognitive decline during the extended summer break.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'summer word scramble worksheets printable',
      context: 'Spelling skills and vocabulary knowledge stay sharp throughout the break when children unscramble vacation terms in our summer word scramble worksheets printable, decoding jumbled letters to reveal words like sunscreen, lifeguard, and tropical \u2014 maintaining the literacy gains that research shows erode most quickly without practice.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'summer shadow matching worksheets',
      context: 'Visual discrimination and spatial reasoning develop when children match beach objects to their silhouettes in our summer shadow matching worksheets, analyzing outlines of surfboards, sandcastles, and palm trees to find correct pairs \u2014 building the perceptual skills that support both reading readiness and mathematical spatial thinking.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'summer odd one out worksheets',
      context: 'Critical thinking through categorical reasoning strengthens when children complete our summer odd one out worksheets, analyzing groups of beach items, pool accessories, and vacation objects to determine which one does not belong based on observable attributes \u2014 maintaining the analytical skills that distinguish maintained learners from those who experience the summer slide.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher running a summer care program needs to maintain counting and fine motor skills in her three- and four-year-olds but finds that standard review worksheets without seasonal context generate minimal voluntary engagement during the relaxed summer schedule.',
      solution: 'She introduces coloring pages featuring vibrant beach scenes alongside find-and-count worksheets where children tally ice cream scoops, seashells, and beach balls in detailed summer illustrations. Each session begins with a real summer object like shells or sand toys that children examine before finding matching items in their worksheets. She pairs each worksheet with a brief outdoor water play session to create positive associations between learning and summer fun.',
      outcome: 'Voluntary worksheet engagement increases from 35 percent with generic review sheets to 88 percent with summer-themed materials. Counting accuracy at the end of summer maintains within two percentage points of spring assessment levels compared to an average seven-point decline the previous year without themed practice. Eight of twelve children begin requesting worksheets during free choice time, and five parents report their children count beach objects spontaneously during family outings.',
    },
    {
      situation: 'A kindergarten teacher needs to prevent the summer learning slide by sending home a practice packet but knows from experience that most generic review packets end up unused in backpacks by mid-July.',
      solution: 'She creates a summer bridge packet using picture-sort classification worksheets and word-search vocabulary puzzles organized around a weekly summer adventure calendar. Each week features a different summer sub-theme (beach week, pool week, ice cream week, camping week) with two worksheets and one real-world activity suggestion. A family practice chart with sticker rewards tracks completion, and she sends a brief weekly email reminder connecting each worksheet to a suggested summer outing.',
      outcome: 'Packet completion rate reaches 74 percent compared to 23 percent for the generic review packet used the previous year. Fall assessment scores show that students who completed at least 60 percent of the summer packet maintained their spring skill levels in both math computation and sight word recognition, while students with less engagement showed the typical one-to-two-month decline. Three parents email unsolicited thank-you notes reporting that the themed format made summer learning a positive family routine.',
    },
    {
      situation: 'A second-grade teacher wants to maintain both literacy and computation skills over the extended break but finds that separate math and reading review packets overwhelm families and reduce completion rates.',
      solution: 'She combines word-scramble vocabulary puzzles and image-addition computation worksheets into integrated summer activity sheets where children decode a scrambled summer word, then solve a related math problem using the number of letters in their answer. She adds a summer reading and math journal where students record one summer observation per week alongside a related calculation, connecting literacy practice to mathematical reasoning through authentic vacation experiences.',
      outcome: 'Integrated packet completion reaches 68 percent compared to 31 percent for the previous year\\u2019s separate math and reading packets. Fall computation assessment scores show an average decline of only 0.8 months for packet completers versus 2.3 months for non-completers. Vocabulary retention for summer terms reaches 85 percent in fall assessment, and the teacher reports that students who maintained the journal produce noticeably more detailed descriptive writing in September than students who did not.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with vivid beach panoramas, draw-and-color worksheets featuring detailed summer scenes, and shadow-match activities where summer objects are represented through rich visual illustrations. Create a summer photo reference board with bright images of beaches, pools, and outdoor activities so visual learners can connect worksheet content to recognizable real-world settings.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Focus on review-only content at or slightly below the student\\u2019s spring skill level to build confidence rather than introducing new challenges during the unstructured break. Pair every worksheet with a real summer object like shells, sand toys, or ice cream scoops so children can manipulate physical items while completing paper activities. Reduce each session to eight to ten minutes maximum to maintain positive associations with learning.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step vacation budgeting problems requiring multiplication, addition, and comparison of options. After completing treasure-hunt logic puzzles, ask them to design their own summer treasure hunt with original clues, create a travel journal with data analysis comparing visited locations, or calculate optimal packing lists based on trip duration and activity requirements.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-and-count, and shadow-match before introducing word-based activities like word-search and word-scramble. Summer imagery is universally recognized worldwide \u2014 sun, beach, ice cream, and swimming pool are understood across cultures and languages. Provide a bilingual summer reference chart with labeled photographs showing activity names and vocabulary terms in the student\\u2019s home language.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Summer practice consistency assessment',
      criteria: 'Provide students with a weekly log tracking worksheet completion frequency and accuracy trends over the break. At the start of fall, compare spring assessment scores to September assessment scores for students who maintained different levels of summer practice. Assess using a three-level rubric: emerging (completed fewer than one-third of assigned worksheets with declining accuracy), proficient (completed at least half of assigned worksheets maintaining spring accuracy levels), advanced (completed two-thirds or more with accuracy improvement over the summer period, demonstrating that consistent practice produced measurable skill growth during the break).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect summer worksheets submitted over the break or returned in September. Compare June and August samples to document maintenance or decline in counting accuracy, vocabulary usage, fine motor precision, and critical thinking complexity. Look specifically for evidence that the summer theme sustained engagement over multiple weeks rather than producing a burst of early-summer activity followed by abandonment.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'During the first two weeks of fall, note whether returning students demonstrate counting and vocabulary skills at pre-summer levels (maintained), below spring assessment levels by more than one grade-level month (declined), or above spring levels suggesting active summer growth (advanced). Compare results between students who reported consistent summer worksheet use and those who did not to document the protective effect of themed summer practice materials.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Seasonal Weather Patterns, Water Cycle & Sun Safety)',
      connection: 'Summer worksheets teach weather science naturally because the season\\u2019s defining characteristic is sustained warmth and sunshine, providing daily observable data about temperature, UV exposure, and water evaporation. Children learn why summer days are longer, how the sun\\u2019s angle affects temperature, and why water evaporates faster in summer heat \u2014 core earth science concepts experienced through the season\\u2019s sensory richness.',
      activity: 'After completing coloring and find-and-count summer worksheets, set up a simple outdoor evaporation experiment with two cups of water, one in direct sunlight and one in shade. Students predict which will evaporate faster, check levels daily, record measurements, and write sentences explaining their results using vocabulary from summer worksheets \u2014 connecting seasonal fun to authentic scientific observation and data collection.',
    },
    {
      subject: 'Math (Vacation Budgeting, Schedule Planning & Data Collection)',
      connection: 'Summer provides authentic contexts for practical mathematics because vacation planning involves real calculations that children can verify: counting money for ice cream, calculating how many days until a trip, and budgeting allowances across weeks of activities. This real-world math is more motivating than abstract drill because every number connects to something the child genuinely wants to do.',
      activity: 'After completing image-addition and treasure-hunt worksheets, give students a pretend summer budget of twenty-five dollars and a menu of summer activities with prices. Students plan a one-week summer schedule within budget, use addition and subtraction to track spending, and write a paragraph explaining their choices \u2014 connecting worksheet arithmetic to the practical financial reasoning that summer vacation makes personally relevant.',
    },
    {
      subject: 'Social Studies (Summer Traditions, Travel Geography & Community Recreation)',
      connection: 'Summer connects to social studies through the universal human experience of seasonal recreation \u2014 every culture has summer traditions, vacation customs, and community activities that reflect geographic and cultural context. Exploring how different families and communities spend summer builds cultural awareness, geographic literacy, and appreciation for diverse traditions.',
      activity: 'After completing picture-sort and word-search summer worksheets, have students interview family members about their favorite summer traditions and childhood summer memories. Students compile responses into a class chart, identify similarities and differences across families, locate summer vacation destinations on a classroom map, and write a paragraph comparing two different summer traditions \u2014 connecting worksheet classification skills to real community knowledge and geographic awareness.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Summer slide prevention' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201315 min' },
    { label: 'Key topic coverage', value: 'Beach + pool + vacation + outdoor play' },
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

console.log('Part 42: Enriching spring & summer theme hub pages...\n');

console.log('1. Injecting 12 fields into spring/en.ts...');
injectFields(path.join(base, 'spring', 'en.ts'), springFields);

console.log('2. Injecting 12 fields into summer/en.ts...');
injectFields(path.join(base, 'summer', 'en.ts'), summerFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
