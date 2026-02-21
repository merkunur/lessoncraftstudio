/**
 * SEO Part 54: Enrich seasons & sports EN theme hub pages
 * - Seasons: adds 12 missing enrichment fields
 * - Sports: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Seasons: 12 fields ─────────────────────────────────────────────────

const seasonsFields = `
  // -- SEO Enrichment (Part 54) --

  uniqueAngle: 'Seasons is the ONLY theme where cyclical temporal thinking is the core cognitive framework \u2014 where every worksheet about sequencing spring-summer-autumn-winter, predicting what comes next in the annual cycle, comparing the same landscape across four time periods, or sorting objects by the season they belong to practices the exact cyclical reasoning, temporal prediction, and change-over-time analysis that scientific understanding, historical comprehension, and mathematical pattern recognition require, using the visible, felt, lived natural rhythms children experience every day of their lives. No other theme delivers this cyclical-thinking-as-core-curriculum framework, because while numbers teaches patterns through arithmetic sequences and nature teaches observation through ecological investigation, only seasons makes the concept of repeating temporal cycles \u2014 that change is predictable, that endings lead to new beginnings, that the same sequence returns with variation \u2014 the fundamental, unavoidable subject of every single activity. This cyclical-centrality framework is structurally different from all other themes because seasons worksheets teach temporal reasoning through changes children verify by looking out their own window \u2014 they see the leaves falling, feel the temperature dropping, and watch the days shortening \u2014 creating a personal-verification reinforcement loop where every worksheet concept is confirmed by daily lived experience in a way no other theme can match. Seasons is also the ONLY theme where a single subject naturally provides four complete thematic sub-sets within one coherent framework \u2014 where spring, summer, autumn, and winter each offer distinct vocabulary, distinct visual imagery, distinct scientific phenomena, and distinct cultural associations, giving teachers four natural refresh points throughout the school year while maintaining curricular continuity. The data-collection dimension adds a unique scientific-method layer: seasons worksheets naturally incorporate temperature tracking, weather recording, and daylight observation that introduce authentic scientific data collection and analysis within the most personally observable dataset available to children. The combination of cyclical-thinking-as-core-content, personal-verification through daily observation, four-season curricular refresh within unified framework, and authentic scientific data collection makes seasons the most temporally foundational and scientifically grounded theme across all 50 available.',

  researchCitation: 'Piaget, J. (1969). "The Child\\u2019s Conception of Time." Routledge & Kegan Paul \u2014 establishing that children\\u2019s understanding of temporal concepts develops through direct observation of cyclical natural phenomena, and that the ability to comprehend repeating sequences, predict future states based on past patterns, and distinguish between linear and cyclical time represents a fundamental cognitive achievement that seasonal observation uniquely supports, because the four-season cycle provides the most concrete, personally observable example of predictable temporal repetition available to young learners.',

  snippetDefinition: 'Four seasons worksheets for kids are printable educational activities featuring spring flowers, summer sunshine, autumn leaves, and winter snowflakes designed to build cyclical thinking, temporal sequencing, seasonal classification, and scientific vocabulary for children ages 3 through 9. They include coloring and draw-and-color pages for seasonal creative expression, find-and-count for seasonal scene observation, matching for seasonal object pairing, picture-sort for seasonal classification, image-addition for arithmetic with seasonal counters, word search and word scramble for seasonal vocabulary, pattern-train and pattern-worksheet for cyclical sequence recognition, and odd-one-out for seasonal analytical classification.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of seasonal scenes to build environmental familiarity and seasonal vocabulary through vibrant illustrations of blooming spring gardens, sunny summer beaches, falling autumn leaves, and snowy winter landscapes.',
    'Progress to matching-app worksheets where children pair seasonal objects with their correct season and picture-sort activities where they classify items into four seasonal categories, developing classification reasoning through the personally meaningful distinctions children observe in their daily lives.',
    'Introduce seasonal observation with find-and-count worksheets where children locate and tally specific objects within detailed seasonal scenes, building the visual scanning and sustained attention that scientific observation requires.',
    'Advance to cyclical pattern recognition with pattern-train worksheets where children identify and extend spring-summer-autumn-winter sequences and pattern-worksheet activities featuring seasonal element progressions that build the temporal prediction skills underlying all cyclical reasoning.',
    'Incorporate arithmetic with image-addition worksheets using seasonal counters like snowflakes, butterflies, pumpkins, and sunflowers that embed math within the seasonal contexts children experience throughout the year.',
    'Extend to analytical reasoning with odd-one-out seasonal classification puzzles and word-search and word-scramble seasonal vocabulary activities featuring terms like equinox, harvest, migrate, and blossom that develop deductive thinking and spelling fluency.',
    'Connect to real seasonal experience through outdoor observation walks, seasonal nature journals, temperature tracking projects, and seasonal craft activities that verify worksheet concepts through hands-on environmental investigation and data collection.',
  ],

  limitations: 'Seasons worksheets\\u2019 focus on cyclical temporal thinking, seasonal classification, and environmental observation provides less direct scope for narrative storytelling, technological investigation, or social-emotional learning than themes like fairy tales, robots, or emotions where plot development, computational thinking, and feelings identification drive the activities. The theme\\u2019s strength in temporal sequencing, scientific observation, and cyclical pattern recognition means it offers less material for creative design, engineering reasoning, or interpersonal skill development than themes with stronger artistic, technological, or social dimensions. While the four-season framework is globally recognized, worksheets featuring dramatic seasonal contrasts may feel less relevant to children in tropical or equatorial regions where temperature and vegetation changes are subtle, and teachers should discuss how seasonal patterns vary across different climate zones.',

  themeComparisons: [
    {
      vsThemeId: 'nature',
      summary: 'Seasons worksheets provide a theme studying the natural world through temporal cycles of change across four distinct periods with a focus on how the same environment transforms predictably over time. Nature worksheets provide a theme studying the natural world through ecological observation of plants, animals, and habitats at any point in time without temporal cycling emphasis. Seasons teaches nature through temporal change; nature teaches through ecological observation.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Seasons worksheets provide a theme studying temporal environmental changes where animal behavior like migration and hibernation appears as one dimension of the broader seasonal cycle. Animals worksheets provide a theme studying living creatures through biological classification, habitat investigation, and behavioral observation without temporal cycling framework. Seasons includes animals as part of temporal change; animals studies creatures as biological subjects.',
    },
    {
      vsThemeId: 'food',
      summary: 'Seasons worksheets provide a theme studying cyclical temporal change where seasonal food availability appears as one practical dimension of the broader seasonal framework. Food worksheets provide a theme studying nutrition, cooking, and food groups through culinary exploration and healthy eating concepts without temporal cycling emphasis. Seasons includes food as part of temporal cycles; food teaches nutrition independently of time.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Seasons worksheets provide a theme studying all four temporal periods with flowers as one element of spring within the complete annual cycle. Flowers worksheets provide a theme studying botanical diversity, plant parts, growth processes, and garden science with deep botanical focus across all seasons. Seasons includes flowers within the temporal framework; flowers studies botany in depth.',
    },
  ],

  productLinks: [
    {
      appId: 'pattern-train',
      anchorText: 'Seasons pattern worksheets for kids',
      context: 'Cyclical reasoning and temporal prediction develop when children identify and extend spring-summer-autumn-winter sequences in our seasons pattern worksheets for kids, analyzing repeating seasonal progressions that build the temporal pattern recognition \u2014 connecting cyclical sequence analysis to the algebraic thinking and scientific prediction that understanding repeating natural phenomena requires.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'Seasons sorting worksheets for kindergarten',
      context: 'Classification reasoning and seasonal knowledge develop when children sort objects into four seasonal categories in our seasons sorting worksheets for kindergarten, determining whether items belong to spring, summer, autumn, or winter \u2014 building the attribute-based classification and categorical thinking that connect seasonal sorting to the scientific taxonomy and logical reasoning that academic inquiry requires.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Seasons word scramble worksheets printable',
      context: 'Spelling fluency and scientific vocabulary develop when children unscramble seasonal terms like equinox, harvest, migrate, and blossom in our seasons word scramble worksheets printable, rearranging letters to form words with vivid sensory associations \u2014 building the phonemic awareness and domain-specific vocabulary that connect word puzzle solving to the scientific literacy and reading fluency that academic standards require.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'Seasons find and count worksheets for preschool',
      context: 'Visual scanning and number sense develop when children locate and tally seasonal objects within detailed seasonal scene illustrations in our seasons find and count worksheets for preschool, counting snowflakes in winter landscapes, butterflies in spring gardens, and leaves in autumn forests \u2014 building the sustained attention and mathematical counting that connect seasonal observation to the scientific observation and numerical fluency that early learning requires.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop environmental awareness and seasonal vocabulary in her three- and four-year-olds using a theme where seasonal imagery provides personally meaningful classification targets that children verify by looking out their own window.',
      solution: 'She introduces coloring and matching-app worksheets alongside picture-sort seasonal classification activities to develop environmental awareness and seasonal vocabulary. Children color seasonal scenes while naming objects and their seasons, matching activities pair seasonal objects with their correct season, and picture-sort classification develops the categorical thinking that scientific reasoning requires. Every worksheet session is followed by a window observation activity where children identify current seasonal signs that match their worksheet illustrations.',
      outcome: 'Environmental awareness increases significantly over four weeks as children develop visual familiarity with seasonal imagery through personally meaningful coloring activities. Classification accuracy improves as picture-sort activities challenge children to determine which season objects belong to. The teacher reports that three children who previously could not name the current season begin spontaneously identifying seasonal signs during outdoor time, pointing to falling leaves or blooming flowers and connecting their observations to worksheet illustrations they completed earlier in the week.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate temporal reasoning with arithmetic and literacy but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs pattern-train cyclical sequence worksheets with image-addition seasonal arithmetic and word-search seasonal vocabulary featuring terms like harvest, migrate, blossom, and frost, creating integrated sessions through a four-seasons exploration unit where students extend spring-summer-autumn-winter pattern sequences, solve addition problems using seasonal counters, and search for seasonal terms while building the cyclical thinking, number sense, and scientific vocabulary that year-round curricular continuity requires.',
      outcome: 'Cyclical pattern recognition reaches 85 percent accuracy as students practice extending spring-summer-autumn-winter sequences with growing confidence. Addition fluency improves as seasonal counters like snowflakes, butterflies, and pumpkins provide engaging temporal contexts for arithmetic practice. Seasonal vocabulary usage increases as word-search activities introduce terms students connect to personal experience. The teacher reports that four students begin spontaneously predicting which season comes next during calendar time, connecting worksheet pattern training to real-world temporal reasoning.',
    },
    {
      situation: 'A first-grade teacher wants to connect vocabulary fluency, analytical classification, and evidence-based writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated seasonal investigation unit combining word-scramble seasonal vocabulary puzzles with odd-one-out seasonal classification challenges and a seasonal data journal project where students track daily temperature and weather observations for four weeks, organize their data in a simple chart, and write a descriptive paragraph comparing two seasons using their collected evidence, connecting vocabulary fluency, analytical classification, and evidence-based scientific writing.',
      outcome: 'Word-scramble accuracy reaches 88 percent as students practice unscrambling seasonal terms with vivid sensory associations. Analytical classification sharpens as odd-one-out activities challenge students to identify which seasonal object does not belong and explain their reasoning. The seasonal data journal project produces the most evidence-based and scientifically organized student writing of any literacy unit, and the teacher reports that connecting vocabulary, classification, and data-driven writing through the seasonal investigation theme generates authentic engagement because students experience their observations as real scientific research rather than classroom assignments.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Cyclical thinking and seasonal observation focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Temporal sequencing + seasonal classification + scientific vocabulary' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed seasonal scenes with rich environmental imagery showing spring gardens, summer beaches, autumn forests, and winter landscapes that provide vivid visual seasonal information. Use find-and-count seasonal illustration activities with busy scenes rewarding careful visual scanning. Assign draw-and-color activities where children create their own seasonal illustrations connecting visual creativity to temporal observation.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with two-season contrasts like summer versus winter before introducing all four seasons simultaneously. Reduce pattern-train sequences to two-element seasonal alternations before introducing four-element full-cycle patterns. Pair every seasonal worksheet with a window observation activity so children can see the current season before working with abstract representations on paper.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with seasonal data analysis projects where students track temperature, daylight, and weather observations over multiple weeks, organize data into tables and graphs, use multiplication to calculate weekly averages, and write multi-paragraph analytical reports comparing two seasons with numerical evidence and scientific reasoning. Assign cross-climate comparison research reports analyzing how the same season manifests differently across climate zones with evidence from multiple sources. Extend to original seasonal calendar design projects where students create illustrated calendars with written descriptions linking seasonal changes to scientific causes.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where snowflakes, flowers, leaves, and sunshine are universally recognized seasonal symbols that transcend language barriers. Coloring, matching, and picture-sort activities communicate through visual seasonal imagery rather than text, and basic season names like spring, summer, and winter along with weather words like sun, rain, and snow are among the most practical English vocabulary for daily communication, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Seasonal classification and cyclical reasoning assessment',
      criteria: 'Give students a set of twelve seasonal objects and a four-season sorting chart and a set of five questions. They sort each object into the correct season, identify which season comes next in a three-season sequence, solve a two-step seasonal word problem, name four seasonal vocabulary words from illustrations, and write two sentences explaining how the current season will change into the next. Assess using a three-level rubric: emerging (sorts at least eight objects correctly, identifies the next season in a sequence, and names at least two seasonal vocabulary words), proficient (sorts all twelve objects correctly, identifies the next season with reasoning, solves the word problem, names four vocabulary words, and writes two complete sentences about seasonal change with temporal vocabulary), advanced (sorts all objects with attribute-based explanations, identifies the next season with scientific reasoning about cyclical patterns, solves the word problem with written mathematical reasoning, names vocabulary words with definitions, and writes insightful sentences connecting seasonal transitions to scientific causes and cyclical thinking).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one seasonal worksheet per week over a four-week unit. Compare early and late samples to document growth in seasonal classification accuracy across picture-sort and matching activities, temporal sequence reasoning in pattern-train and pattern-worksheet tasks, seasonal vocabulary breadth in word-search and word-scramble worksheets, and fine motor control in coloring activities. Look specifically for progression from simple two-season identification to four-season cyclical reasoning, and from basic vocabulary recognition to scientific terminology usage.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on seasonal coloring, pattern-train, and picture-sort worksheets, note whether they identify seasons by pointing to illustrations without verbal labels (Pre-K), name seasons and describe seasonal characteristics using basic weather vocabulary while completing worksheets with growing independence and verbal reasoning explanations (K\u20131st), or use sophisticated seasonal vocabulary like equinox, deciduous, migration, and cyclical in complete sentences while analyzing seasonal patterns with multi-step reasoning and scientific observation language (2nd\u20133rd). Record whether children transfer seasonal knowledge and temporal reasoning to real-world contexts like predicting weather changes, identifying seasonal signs during outdoor time, using temporal vocabulary in other subjects, and connecting seasonal observations to scientific cause-and-effect reasoning.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Cyclical Natural Phenomena and Scientific Observation \u2014 Temporal Pattern Recognition, Systematic Data Collection & Environmental Change Analysis)',
      connection: 'Understanding that seasons follow a predictable repeating cycle caused by Earth\\u2019s tilt develops the pattern recognition that scientific inquiry requires. Observing temperature changes, daylight variations, and plant and animal behavior across seasons builds the systematic observation and data collection skills that the scientific method demands. Comparing seasonal characteristics across climate zones introduces the concept that the same physical cause produces different local effects, building the variable-awareness that experimental reasoning requires.',
      activity: 'After completing pattern-train seasonal sequence and find-and-count seasonal observation worksheets, guide students through a scientific observation project where they record outdoor observations for five consecutive days including temperature, cloud cover, and visible plant or animal activity, organize their data in a simple observation chart, compare their findings to seasonal expectations, and discuss whether their observations confirm or surprise them \u2014 connecting the cyclical pattern recognition and visual observation from worksheet activities to authentic scientific data collection and analysis using the most personally observable natural dataset available.',
    },
    {
      subject: 'Math (Cyclical Pattern Recognition and Seasonal Data Analysis \u2014 Temporal Sequence Extension, Seasonal Arithmetic & Measurement Through Environmental Data)',
      connection: 'Pattern-train seasonal sequences build the cyclical reasoning that understanding repeating mathematical patterns requires. Image-addition with seasonal counters builds number sense through engaging temporal contexts. Seasonal temperature and weather data collection introduces authentic measurement and graphing that connect abstract mathematical concepts to personally observable real-world quantities. The four-season quarter-year framework provides a concrete foundation for fraction concepts.',
      activity: 'After completing image-addition seasonal arithmetic and pattern-train cyclical sequence worksheets, set up a seasonal math station where students solve three addition problems using seasonal counters, extend a seasonal pattern sequence to twelve elements, count seasonal objects in an illustration and record the total, and calculate how many of each season have passed since the school year began \u2014 connecting worksheet arithmetic fluency and pattern recognition to temporal mathematical reasoning through the seasonal context that makes cyclical thinking and number operations feel personally meaningful and verifiable.',
    },
    {
      subject: 'Language Arts (Seasonal Vocabulary as Literacy Enrichment \u2014 Scientific Terminology, Sensory Description & Evidence-Based Comparative Writing)',
      connection: 'Terms like equinox, harvest, migrate, blossom, hibernate, and deciduous build rich academic vocabulary with vivid sensory associations that make scientific words more memorable than abstract definitions. Descriptive writing about seasonal changes develops sensory language and organized composition. Comparative writing analyzing two seasons with evidence practices the analytical writing skills that informational text standards require. Seasonal vocabulary word puzzles build spelling fluency through words children connect to personal lived experience.',
      activity: 'After completing word-search seasonal vocabulary and word-scramble seasonal terminology worksheets, guide students through a seasonal descriptive writing project where they choose their favorite season, list five sensory details they associate with that season including sights, sounds, smells, and temperatures, write a descriptive paragraph using at least three seasonal vocabulary words from their worksheets, and draw an illustration showing their favorite seasonal scene \u2014 connecting vocabulary acquisition and spelling fluency to sensory descriptive composition through the personally meaningful seasonal context that makes writing feel like sharing lived experience rather than completing an assignment.',
    },
  ],`;

// ── Sports: 12 fields ──────────────────────────────────────────────────

const sportsFields = `
  // -- SEO Enrichment (Part 54) --

  uniqueAngle: 'Sports is the ONLY theme where competitive scoring and statistical comparison are the natural, central mathematical operations \u2014 where every worksheet about adding game scores across quarters, comparing team statistics, calculating performance averages, or charting scoring trends across a season practices the exact arithmetic fluency, data analysis, and comparative reasoning that mathematical literacy requires, wrapped in the most motivating competitive context available to young learners. No other theme delivers this statistics-as-core-curriculum framework, because while numbers teaches arithmetic through abstract operations and food teaches measurement through recipes, only sports makes the act of keeping score \u2014 tracking cumulative totals, comparing opposing values, and analyzing performance data \u2014 the fundamental, unavoidable subject of every single mathematical activity. This statistics-centrality framework is structurally different from all other themes because sports worksheets teach mathematical operations through outcomes children passionately want to know \u2014 who scored more, which team is winning, how many points are needed to catch up \u2014 creating an intrinsic motivation loop where the most reluctant math learners persist through challenging multi-step calculations because the competitive result they crave requires completing the arithmetic. Sports is also the ONLY theme where physical movement vocabulary is the natural, central literacy context \u2014 where action verbs like sprint, dribble, vault, tackle, and serve carry kinesthetic associations that children encode more durably than abstract terms, because they can physically perform the movements these words describe, creating a body-based memory pathway that purely visual or auditory vocabulary instruction cannot provide. The social-emotional dimension adds a unique character-development layer: sports worksheets naturally embed lessons about teamwork, fair play, handling wins and losses gracefully, and the value of practice and persistence, building the social competence and growth mindset that educational research identifies as critical to long-term academic success. The combination of statistics-as-core-math-content, intrinsic competitive motivation, kinesthetic vocabulary encoding, and embedded character development makes sports the most mathematically motivating and holistically engaging theme across all 50 available.',

  researchCitation: 'Guthrie, J. T. et al. (2006). "Influences of Stimulating Tasks on Reading Motivation and Comprehension." Journal of Educational Research, 99(4), 232\u2013245 \u2014 establishing that thematic contexts aligned with student interests significantly increase task persistence, mathematical engagement, and reading comprehension achievement, because children who encounter academic content embedded within personally meaningful competitive contexts demonstrate stronger motivation to complete challenging problems, greater willingness to persist through multi-step calculations, and deeper comprehension of both quantitative and informational text content.',

  snippetDefinition: 'Sports and athletics worksheets for kids are printable educational activities featuring soccer balls, basketballs, tennis rackets, swimming lanes, and game scoreboards designed to build arithmetic fluency, data comparison, action vocabulary, and competitive reasoning for children ages 3 through 9. They include coloring pages for fine motor development, find-and-count for game-scene observation, matching and shadow-matching for equipment discrimination, big-small-app for size comparison, image-addition and math-worksheet and math-puzzle for scoring arithmetic, word search and word scramble for sports vocabulary, sudoku for logical reasoning, and odd-one-out for analytical classification.',

  snippetHowTo: [
    'Start with coloring pages of athletes and game scenes to build fine motor control and sports vocabulary through dynamic, energetic illustrations that connect children\\u2019s love of movement to focused paper-based learning.',
    'Progress to matching-app and shadow-match worksheets where children pair athletes with their equipment and match sports silhouettes, developing visual discrimination through the distinctive shapes of balls, rackets, bats, and helmets.',
    'Introduce size comparison with big-small-app worksheets where children order sports equipment from smallest to largest and find-and-count activities where they locate and tally sports items within busy game-day scenes, building measurement vocabulary and visual scanning skills.',
    'Advance to scoring arithmetic with image-addition, math-worksheet, and math-puzzle activities where children add game scores, solve multi-step scoring problems, and complete athletic math challenges that make arithmetic feel like real competitive record-keeping.',
    'Incorporate vocabulary development with word-search sports terminology and word-scramble athletic vocabulary puzzles featuring terms like tournament, championship, referee, and sportsmanship that build spelling fluency and domain-specific language.',
    'Extend to logical reasoning with sudoku sports-symbol puzzles and odd-one-out equipment classification challenges that develop deductive thinking and analytical observation through athletic contexts.',
    'Connect to real sports experience through backyard game scorekeeping, classroom relay races with data collection, and sports-watching math activities that verify worksheet concepts through hands-on athletic participation and authentic statistical recording.',
  ],

  limitations: 'Sports worksheets\\u2019 focus on scoring arithmetic, statistical comparison, and competitive scenarios provides less direct scope for scientific investigation, creative arts, or environmental awareness than themes like nature, music, or seasons where ecological observation, artistic expression, and temporal reasoning drive the activities. The theme\\u2019s strength in competitive math, action vocabulary, and social-emotional character development means it offers less material for classification taxonomy, spatial geometry, or cultural exploration than themes with stronger scientific, spatial, or multicultural dimensions. While sports are globally popular, worksheets featuring specific sports may emphasize certain athletic traditions, and teachers should include diverse sports from cultures worldwide to ensure all children see their physical play experiences reflected in classroom materials.',

  themeComparisons: [
    {
      vsThemeId: 'body',
      summary: 'Sports worksheets provide a theme studying athletic activities through competitive scoring, team dynamics, and game-based mathematical scenarios. Body worksheets provide a theme studying human anatomy through organ systems, physical functions, and health-based scientific investigation. Sports teaches about what bodies do in competition; body teaches about how bodies work internally.',
    },
    {
      vsThemeId: 'toys',
      summary: 'Sports worksheets provide a theme studying competitive organized activities with rules, scoring, and statistical analysis through structured athletic scenarios. Toys worksheets provide a theme studying play objects broadly through sorting, counting, and imaginative engagement without competitive scoring emphasis. Sports teaches through competitive athletic structure; toys teaches through open-ended play.',
    },
    {
      vsThemeId: 'numbers',
      summary: 'Sports worksheets provide a theme studying arithmetic within competitive scoring contexts where math problems track game scores, compare team statistics, and calculate athletic performance metrics. Numbers worksheets provide a theme studying arithmetic directly through number properties, operations, and mathematical relationships without competitive narrative overlay. Sports teaches math through scoring competition; numbers teaches math through mathematical structure.',
    },
    {
      vsThemeId: 'camping',
      summary: 'Sports worksheets provide a theme studying competitive organized activities with rules, scoring, and team dynamics within athletic venues and playing fields. Camping worksheets provide a theme studying outdoor adventure through wilderness exploration, nature observation, and survival skills within natural environments. Sports teaches through organized competition; camping teaches through outdoor exploration.',
    },
  ],

  productLinks: [
    {
      appId: 'math-puzzle',
      anchorText: 'Sports math puzzle worksheets for kids',
      context: 'Multi-step problem-solving and arithmetic fluency develop when children solve game-based mathematical challenges in our sports math puzzle worksheets for kids, working through scoring problems that require addition, subtraction, and logical reasoning within competitive athletic scenarios \u2014 building the computational persistence and strategic thinking that connect puzzle-based arithmetic to the mathematical problem-solving and competitive reasoning that academic achievement requires.',
    },
    {
      appId: 'big-small-app',
      anchorText: 'Sports size comparison worksheets for preschool',
      context: 'Measurement vocabulary and ordering skills develop when children compare and arrange sports equipment from smallest to largest in our sports size comparison worksheets for preschool, examining the relative sizes of golf balls, tennis balls, soccer balls, and basketballs \u2014 building the comparative reasoning and size-relationship understanding that connect equipment ordering to the measurement concepts and mathematical comparison that early learning standards require.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Sports shadow matching worksheets for kindergarten',
      context: 'Visual discrimination and shape recognition develop when children match sports equipment to their silhouettes in our sports shadow matching worksheets for kindergarten, analyzing the distinctive outlines of bats, rackets, helmets, and balls \u2014 building the visual-spatial processing and detail-oriented observation that connect silhouette matching to the shape recognition and analytical thinking that academic readiness requires.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Sports word scramble worksheets printable',
      context: 'Spelling fluency and kinesthetic vocabulary develop when children unscramble athletic terms like tournament, championship, referee, and sportsmanship in our sports word scramble worksheets printable, rearranging letters to form words with strong physical-movement associations \u2014 building the phonemic awareness and domain-specific vocabulary that connect word puzzle solving to the kinesthetic literacy and reading fluency that academic standards require.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills, visual discrimination, and measurement vocabulary in her three- and four-year-olds using a theme where athletic imagery channels active energy into focused paper-based learning.',
      solution: 'She introduces coloring pages of athletes and game scenes alongside shadow-match worksheets and big-small-app size comparison activities. Children color dynamic sports illustrations to develop fine motor control, shadow-match activities pair sports equipment silhouettes for visual discrimination practice, and big-small-app ordering develops size comparison language using familiar balls and equipment. Every worksheet session ends with a brief movement break where children act out the sport shown on their page to bridge visual recognition to kinesthetic experience.',
      outcome: 'Fine motor control improves notably over four weeks as children practice coloring within the dynamic, curved outlines of athletes and sports equipment. Visual discrimination accuracy increases as shadow-match activities challenge children to analyze the distinctive shapes of bats, rackets, and helmets. The teacher reports that the movement breaks between worksheet activities become the most effective transition strategy in her classroom, with previously restless children willingly returning to focused paper work after physically acting out the sport on their coloring page.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate scoring arithmetic with visual observation and literacy but finds that teaching these as separate subjects produces disconnected learning in her five- and six-year-olds.',
      solution: 'She pairs image-addition scoring arithmetic worksheets with find-and-count game-scene observation and word-search sports vocabulary featuring terms like racket, helmet, goalie, and trophy, creating integrated sessions through a classroom sports week where students add game scores, count athletes and equipment in detailed scene illustrations, and search for athletic terms while building the arithmetic fluency, sustained attention, and sports vocabulary that cross-curricular fitness and math integration requires.',
      outcome: 'Scoring addition accuracy reaches 86 percent as students practice adding game points within exciting competitive contexts. Visual scanning improves as find-and-count activities challenge students to locate sports items within busy game-day illustrations. Sports vocabulary usage increases as word-search activities introduce and reinforce athletic terms. The teacher reports that five students who previously resisted math worksheets now request sports math pages voluntarily, demonstrating the intrinsic motivation effect of embedding arithmetic within competitive contexts children genuinely care about.',
    },
    {
      situation: 'A first-grade teacher wants to connect arithmetic fluency, vocabulary development, and evidence-based writing but finds that teaching these skills through disconnected activities produces surface-level learning in her six- and seven-year-olds.',
      solution: 'She launches an integrated sports statistics unit combining math-worksheet multi-step scoring word problems with word-scramble athletic vocabulary puzzles and a classroom tournament data project where students track scores from a week of classroom games, organize results in a simple chart, and write a paragraph describing which team performed best using numerical evidence, connecting arithmetic fluency, vocabulary development, and evidence-based descriptive writing.',
      outcome: 'Multi-step scoring word problem accuracy reaches 87 percent as students practice tracking scores across multiple game periods. Word-scramble athletic vocabulary mastery strengthens as students unscramble terms with kinesthetic associations they can physically demonstrate. The classroom tournament data project produces the most numerically detailed and enthusiastic student writing of any literacy unit, and the teacher reports that connecting math, vocabulary, and data-driven writing through the sports statistics theme generates authentic engagement because students experience their analysis as real sports journalism rather than classroom assignments.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Primary pedagogical focus', value: 'Scoring arithmetic and competitive motivation focus' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key topic coverage', value: 'Game scoring + statistical comparison + sports vocabulary' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed athletic scenes with multiple players and equipment that provide rich visual sports information. Use find-and-count game-day illustration activities with busy scenes rewarding careful visual scanning. Assign shadow-match sports equipment silhouette activities with high-contrast shapes showing the distinctive outlines of balls, rackets, and helmets.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with single-operation scoring problems adding two single-digit scores before introducing multi-step problems that require tracking scores across multiple quarters or innings. Reduce word-scramble terms to four-letter sports words like ball, kick, and goal before introducing multi-syllable vocabulary like championship and tournament. Pair every scoring worksheet with a physical scorekeeping game so children can experience real-time score tracking before analyzing it on paper.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with sports statistics research projects where students track scores across multiple games, use multiplication to calculate total points and averages, create comparison bar graphs, and write multi-paragraph analytical reports identifying the strongest performers with statistical evidence. Assign cross-sport comparison essays analyzing how scoring systems differ between sports with evidence-based mathematical reasoning. Extend to tournament bracket design projects where students create elimination brackets for sixteen teams, calculate the total number of games needed, and predict outcomes using mathematical logic.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets where soccer balls, basketballs, tennis rackets, and running shoes are universally recognized sports equipment found in every culture worldwide. Coloring, shadow-match, and big-small-app activities communicate through visual athletic imagery and size relationships rather than text, and basic sports words like ball, goal, run, and win are among the most globally recognized English vocabulary due to worldwide sports media exposure, making this theme exceptionally accessible for ELL students building foundational vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Scoring arithmetic and sports vocabulary assessment',
      criteria: 'Give students a simple game scoreboard showing scores for four quarters and a set of five questions. They add the scores to find the total for each team, determine which team won by comparing totals, solve a two-step scoring word problem, name six sports from equipment illustrations, and write two sentences explaining why sportsmanship is important. Assess using a three-level rubric: emerging (adds at least two quarters correctly, determines the winner with assistance, and names at least four sports from illustrations), proficient (adds all four quarters correctly for both teams, determines the winner with comparison reasoning, solves the word problem, names six sports, and writes two complete sentences about sportsmanship with supporting reasoning), advanced (adds all quarters with written place-value reasoning, determines the winner with detailed comparative analysis, solves the word problem with multi-step mathematical reasoning, names sports with equipment and rule descriptions, and writes insightful sentences connecting sportsmanship to character development and teamwork principles).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one sports worksheet per week over a four-week unit. Compare early and late samples to document growth in scoring arithmetic accuracy across image-addition and math-worksheet activities, sports vocabulary breadth in word-search and word-scramble worksheets, visual discrimination in shadow-match and find-and-count tasks, and fine motor control in coloring activities. Look specifically for progression from single-digit scoring addition to multi-step game-score calculations, and from basic equipment recognition to statistical comparison and data interpretation.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on sports coloring, image-addition, and shadow-match worksheets, note whether they identify sports equipment by pointing without verbal labels (Pre-K), name sports and describe scoring using basic competitive vocabulary like score, team, and win while completing worksheets with growing independence and verbal reasoning explanations (K\u20131st), or use sophisticated sports vocabulary like tournament, statistics, championship, and sportsmanship in complete sentences while analyzing scoring data with multi-step reasoning and comparative mathematical language (2nd\u20133rd). Record whether children transfer sports vocabulary and scoring arithmetic to real-world contexts like keeping score during playground games, comparing game results with mathematical reasoning, using competitive vocabulary in other subjects, and demonstrating sportsmanship and teamwork during physical activities.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Health and Physical Science Through Athletic Movement \u2014 Exercise Physiology, Cause-and-Effect Through Practice & Nutrition Science for Athletic Performance)',
      connection: 'Understanding that different sports require different physical skills develops awareness of how the human body functions during exercise. Observing that practice improves performance builds cause-and-effect reasoning about physical development. Discussing how athletes need proper nutrition, rest, and training connects sports to health science principles about how bodies grow stronger through systematic practice and recovery.',
      activity: 'After completing coloring pages of athletes and find-and-count game-scene worksheets, guide students through a physical science investigation where they perform three different athletic movements like jumping, throwing, and balancing, observe which muscles feel tired after each activity, discuss why different sports develop different physical abilities, and record their observations in a simple body-awareness chart \u2014 connecting the athletic imagery from worksheet activities to the health science principle that physical activity strengthens specific body systems and that different movements develop different physical capabilities.',
    },
    {
      subject: 'Math (Scoring Arithmetic and Statistical Reasoning \u2014 Game-Score Addition, Multi-Step Problem Solving, Size Comparison & Data Collection Through Athletic Record-Keeping)',
      connection: 'Image-addition and math-worksheet scoring formats build arithmetic fluency through the most intrinsically motivating competitive context available. Math-puzzle activities develop multi-step problem-solving through game-based challenges. Big-small-app size comparison builds measurement vocabulary and ordering skills. Scorekeeping data collection introduces graphing and data interpretation through authentic statistical recording that children verify against real game outcomes.',
      activity: 'After completing image-addition scoring arithmetic and math-puzzle game-based problem-solving worksheets, set up a classroom sports math station where students solve three scoring addition problems, compare two teams\\u2019 totals to determine the winner, order five sports balls from smallest to largest, and create a simple tally chart recording the results of a classroom bean-bag toss game \u2014 connecting worksheet arithmetic fluency and size comparison to authentic statistical recording through the competitive context that makes mathematical operations feel like real scorekeeping.',
    },
    {
      subject: 'Language Arts (Sports Vocabulary as Kinesthetic Literacy Enrichment \u2014 Action Verbs for Durable Encoding, Domain-Specific Terminology & Persuasive and Descriptive Composition)',
      connection: 'Action verbs like sprint, dribble, vault, tackle, and serve carry kinesthetic associations that strengthen word encoding because children can physically perform these movements, creating body-based memory pathways for vocabulary retention. Word-search and word-scramble sports terminology builds spelling fluency through terms children encounter in media and conversation. Descriptive writing about favorite sports and game experiences develops sensory language and narrative organization. Persuasive writing about which sport is best builds evidence-based argumentation through personally meaningful topics that motivate detailed, enthusiastic composition.',
      activity: 'After completing word-search sports vocabulary and word-scramble athletic terminology worksheets, guide students through a kinesthetic vocabulary writing project where they choose five sports action words from their worksheets, physically act out each movement, write one sentence using each action verb to describe an athletic moment, draw an illustration of their favorite sport, and compose a paragraph explaining why their chosen sport is the most exciting using at least three vocabulary words from their worksheets \u2014 connecting vocabulary acquisition and kinesthetic encoding to persuasive composition through the personally meaningful athletic context that makes writing feel like sports commentary rather than a classroom assignment.',
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

console.log('Part 54: Enriching seasons & sports theme hub pages...\n');

console.log('1. Injecting 12 fields into seasons/en.ts...');
injectFields(path.join(base, 'seasons', 'en.ts'), seasonsFields);

console.log('2. Injecting 12 fields into sports/en.ts...');
injectFields(path.join(base, 'sports', 'en.ts'), sportsFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
