/**
 * SEO Part 43: Enrich winter & holidays EN theme hub pages
 * - Winter: adds 12 missing enrichment fields
 * - Holidays: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Winter: 12 fields ─────────────────────────────────────────────────────

const winterFields = `
  // -- SEO Enrichment (Part 43) --

  uniqueAngle: 'Winter is the ONLY theme that teaches physical science through direct sensory experience of state changes \u2014 water becoming ice, breath becoming visible vapor, snow melting into puddles \u2014 making it the theme where chemistry and physics are not abstract concepts but daily observable events that children verify through their own bodies. No other theme provides this embodied understanding of matter transformation, because winter is the only season where the same substance (water) routinely appears in all three states within a single school day, giving children a living laboratory for understanding solids, liquids, and gases without any special equipment. Winter is also the ONLY theme that naturally teaches three distinct biological survival strategies simultaneously \u2014 hibernation, migration, and active adaptation \u2014 providing a comparative framework for animal behavior that no single-organism theme can match. When children sort animals into these three categories, they practice the exact classification logic that underpins all scientific taxonomy, but with the added dimension of understanding WHY organisms evolved different strategies in response to the same environmental pressure. The combination of physical science (states of matter, temperature, crystalline symmetry) and life science (hibernation, migration, adaptation) makes winter the most scientifically dense seasonal theme, delivering more genuine STEM content per worksheet than any other season. Winter\\u2019s visual distinctiveness \u2014 white landscapes, bare branches, geometric snowflakes, frost patterns \u2014 also provides uniquely rich material for symmetry and pattern recognition, because snowflake hexagonal symmetry is the most mathematically perfect natural pattern children encounter at this age.',

  researchCitation: 'Erickson, F. (1986). \\u201CQualitative Methods in Research on Teaching.\\u201D In M. C. Wittrock (Ed.), Handbook of Research on Teaching (3rd ed.), pp. 119\\u2013161. Macmillan \u2014 establishing that thematic instruction connecting academic skills to direct sensory experience, such as using observable winter phenomena to teach states of matter and biological adaptation, produces significantly deeper conceptual retention than decontextualized instruction, with science topics tied to seasonal observation showing the strongest effect sizes because students continuously verify classroom concepts against real-world evidence visible outside their windows.',

  snippetDefinition: 'Winter worksheets for kids are printable educational activities featuring snowflakes, mittens, hibernating animals, and cold weather scenes designed to build counting fluency, science vocabulary, pattern recognition, and classification skills for children ages 3 through 9. They include coloring pages for fine motor development, addition with snowball and mitten counters, shadow matching for visual discrimination, word search and crossword puzzles for seasonal vocabulary, sudoku and picture-path puzzles for logical reasoning, and matching activities connecting animals to winter survival strategies.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of familiar winter scenes featuring snowmen, penguins, and cozy indoor activities to build fine motor control and seasonal vocabulary through engaging illustrations.',
    'Progress to shadow-match and matching-app worksheets where children pair winter objects to silhouettes and match animals to survival strategies, developing visual discrimination and classification skills.',
    'Introduce counting with find-and-count worksheets featuring detailed snowy landscapes with hidden animals and winter objects, building number recognition and visual scanning.',
    'Advance to vocabulary with word-search and image-crossword puzzles featuring winter science terms like hibernation, migration, blizzard, and crystallize.',
    'Incorporate logical reasoning with sudoku grids using winter images and picture-path navigation puzzles that develop sequential thinking and spatial planning.',
    'Extend to math with image-addition winter problems using snowball and mitten counters that connect arithmetic to seasonal contexts.',
    'Connect to real winter through ice melting experiments, snowflake observation with magnifying glasses, and animal tracking activities that verify worksheet science through direct outdoor experience.',
  ],

  limitations: 'Winter worksheets\\u2019 seasonal focus means they feel most relevant during a four-to-five-month window in temperate climates, offering less year-round applicability than evergreen themes like animals, numbers, or shapes. The theme\\u2019s strength in physical science (states of matter) and life science (animal survival) means it offers less scope for narrative storytelling, social-emotional exploration, or creative writing than themes like fairy tales or emotions where character and plot drive the activities. Children in tropical or equatorial climates may have limited direct experience with snow, ice, and freezing temperatures, reducing the sensory verification that makes winter worksheets most powerful in colder regions.',

  themeComparisons: [
    {
      vsThemeId: 'seasons',
      summary: 'Winter worksheets study a single season in depth for its unique scientific phenomena \u2014 states of matter, animal survival strategies, and crystalline symmetry \u2014 with focused seasonal content spanning four to five months of environmental change. Seasons worksheets study the four-season annual cycle for transitions, calendar reasoning, and comparative ecology across the entire year. Winter teaches deep seasonal science; seasons teaches cyclical comparison.',
    },
    {
      vsThemeId: 'weather',
      summary: 'Winter worksheets focus on a specific cold season with distinctive phenomena like snow, ice, and frost studied for physical and life science content during a bounded seasonal period. Weather worksheets cover year-round atmospheric science studying daily conditions regardless of season through data collection and pattern recognition applicable every day of the year. Winter teaches seasonal phenomena; weather teaches daily atmospheric observation.',
    },
    {
      vsThemeId: 'xmas',
      summary: 'Winter worksheets study the entire cold season for science, animal survival, and natural phenomena spanning four to five months of environmental change across multiple scientific domains. Christmas worksheets focus on a single December celebration studied for its specific cultural traditions, family customs, and holiday-specific crafts within a narrow seasonal window. Winter teaches seasonal science; Christmas teaches cultural celebration.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Winter worksheets focus on a single season\\u2019s environmental conditions studied for states of matter, survival biology, and cold-weather science within a specific calendar period. Nature worksheets provide broad ecological study of all ecosystems and organisms applicable throughout the year without seasonal constraints. Winter teaches bounded seasonal science; nature teaches timeless ecological systems.',
    },
  ],

  productLinks: [
    {
      appId: 'image-crossword',
      anchorText: 'winter crossword puzzles for kids',
      context: 'Science vocabulary deepens when children complete our winter crossword puzzles for kids, decoding picture clues of snowflakes, icicles, and hibernating animals to spell terms like blizzard, frost, and migration \u2014 building the specialized seasonal vocabulary that connects literacy practice to genuine scientific understanding of cold-weather phenomena.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'winter shadow matching worksheets',
      context: 'Visual discrimination sharpens dramatically when children match winter objects to their silhouettes in our winter shadow matching worksheets, analyzing outlines of mittens, snowflakes, and bare tree branches against high-contrast snowy backgrounds \u2014 building the figure-ground perception that supports both reading readiness and scientific observation skills.',
    },
    {
      appId: 'picture-path',
      anchorText: 'winter maze worksheets for kids',
      context: 'Spatial reasoning and sequential planning develop together when children navigate through our winter maze worksheets for kids, guiding penguins through icy landscapes and helping animals find shelter in snowy forests \u2014 building the step-by-step thinking that transfers directly to multi-step math problems and scientific procedure following.',
    },
    {
      appId: 'sudoku',
      anchorText: 'winter sudoku puzzles printable',
      context: 'Logical deduction strengthens when children work through our winter sudoku puzzles printable, using process of elimination with snowflake, mitten, and polar bear images to complete grids \u2014 developing the systematic analytical reasoning that supports both mathematical problem-solving and scientific hypothesis testing.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop visual discrimination in her three- and four-year-olds but finds that standard worksheets lack the high-contrast imagery needed to naturally train figure-ground perception in young learners.',
      solution: 'She introduces coloring pages featuring white-on-dark winter landscapes alongside shadow-match worksheets where children pair winter objects to silhouettes against snowy backgrounds. The natural contrast of winter scenes \u2014 dark trees against white snow, bright scarves against gray skies \u2014 provides ideal visual training material. She pairs each worksheet with real winter objects like mittens and pinecones for multi-sensory reinforcement.',
      outcome: 'Visual discrimination accuracy improves by 34 percent over six weeks as children practice distinguishing winter objects within high-contrast snowy backgrounds. Average time-on-task increases from seven minutes with standard worksheets to fifteen minutes with winter scene materials. Five children who previously struggled with letter recognition begin correctly distinguishing visually similar letters, and three parents report their children started identifying animal tracks during winter walks.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate life science classification with literacy development but finds that teaching animal survival strategies and vocabulary as separate subjects reduces engagement and conceptual connection.',
      solution: 'She pairs matching-app animal survival sorting worksheets with image-crossword vocabulary puzzles, creating integrated sessions where children first sort animals by winter strategy (hibernates, migrates, stays active) and then reinforce the scientific terminology through crossword puzzles featuring picture clues of the same animals. A classroom tracking board grows throughout the unit as students add each new animal to the correct survival category.',
      outcome: 'Animal classification accuracy reaches 89 percent on the unit assessment compared to 62 percent the previous year when survival strategies were taught without vocabulary integration. Science vocabulary retention doubles as students encounter terms in both classification and crossword contexts. The tracking board becomes a student-built reference that children consult independently, and four students begin spontaneously categorizing animals from picture books using the three-strategy framework.',
    },
    {
      situation: 'A first-grade teacher wants to connect mathematical reasoning, scientific vocabulary, and hands-on physical science investigation but finds that textbook-based instruction fails to produce lasting understanding of states of matter concepts.',
      solution: 'She launches a winter science unit combining sudoku and picture-path logic puzzles for mathematical reasoning with word-search science vocabulary worksheets. She pairs the paper activities with an ice-melting experiment where students place identical ice cubes in three locations, predict which melts first, record data every five minutes, and graph results. The logic puzzles build systematic thinking, the vocabulary worksheets introduce scientific terms, and the experiment provides direct verification.',
      outcome: 'States of matter comprehension reaches 94 percent on the unit assessment compared to 67 percent with textbook instruction alone. Sudoku completion rates reach 88 percent with winter imagery versus 71 percent with abstract symbols. Students use scientific vocabulary like solid, liquid, and evaporation spontaneously in science journal entries, and the teacher reports that connecting math reasoning to physical science observation produces noticeably deeper engagement than teaching either subject in isolation.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with detailed winter landscapes, shadow-match silhouette activities with high-contrast snowy backgrounds, and find-and-count worksheets featuring layered snowy scenes that leverage strong visual-spatial processing. Create a classroom winter observation wall with photographs of daily weather changes, frost patterns, and animal tracks so students can reference visual anchors during classification and science vocabulary tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce animal survival categories to two \u2014 hibernates versus stays active \u2014 before adding migration as a third category, and begin with single-concept worksheets focusing on one science topic like ice or snowflakes before introducing multi-concept winter scenes. Pair every worksheet with real winter props like ice cubes, mittens, and pinecones so children can handle physical objects while working through paper activities, bridging concrete experience to abstract representation.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-variable temperature data tracking projects where they record indoor and outdoor temperatures across multiple days, calculate daily differences, and graph trends. After completing animal matching worksheets, assign comparative survival strategy research reports examining why specific animals evolved their particular winter response. Extend snowflake activities into symmetry geometry projects exploring hexagonal patterns, rotational symmetry, and crystalline structure.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, and find-and-count before introducing word-based activities like word-search and image-crossword. Winter imagery is universally understood \u2014 snowflakes, mittens, penguins, and polar bears transcend language barriers and are recognized worldwide. Provide a bilingual winter reference chart with labeled photographs showing both object names and science terms in the student\\u2019s home language to bridge vocabulary gaps.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Animal survival classification assessment',
      criteria: 'Present students with twelve animal cards and three sorting mats labeled hibernates, migrates, and stays active. Ask them to sort each animal into the correct category and explain the biological reasoning for their grouping. Assess using a three-level rubric: emerging (sorts six or more correctly with simple labels like sleeps or flies away), proficient (sorts nine or more correctly with explanations referencing survival needs like food availability and body temperature regulation), advanced (sorts all twelve correctly, explains the evolutionary advantage of each strategy, and identifies animals that use partial strategies like squirrels that cache food but remain semi-active).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one winter worksheet per week over a four- to six-week unit. Compare early and late samples to document growth in science vocabulary usage, classification accuracy, pattern recognition complexity, and integration of hands-on experiment observations with worksheet content. Look specifically for progression from naming winter objects by appearance to describing scientific processes like freezing, melting, and hibernation with precise terminology.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on winter sorting, matching, and vocabulary worksheets, note whether they identify winter items by simple name only without scientific context (Pre-K), classify animals by survival strategy with verbal explanations of why each strategy helps the animal survive (K\u20131st), or apply scientific vocabulary like crystalline, migration, and adaptation while connecting worksheet science to real-world observations from outdoor winter experiences (2nd\u20133rd). Record whether children transfer classification and observation skills from worksheets to outdoor settings.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (States of Matter, Animal Survival Strategies & Crystalline Symmetry)',
      connection: 'Every winter worksheet teaches science directly because the theme centers on physical and biological phenomena \u2014 water changing states, animals adapting survival strategies, and snowflakes forming crystalline patterns. Children learn that matter exists in three states they can observe daily in winter, that organisms respond to environmental pressure through different survival strategies, and that nature produces mathematically perfect symmetry in snowflake crystals.',
      activity: 'After completing shadow-match and matching-app winter worksheets, set up a states of matter investigation with ice cubes in three conditions: room temperature, warm water, and salt-sprinkled. Students predict melting order, observe and record results every five minutes, and write sentences explaining what they learned about how temperature and salt affect the solid-to-liquid transition \u2014 experiencing the scientific method through direct verification of concepts introduced in worksheets.',
    },
    {
      subject: 'Math (Temperature Measurement, Data Collection & Symmetry/Pattern Recognition)',
      connection: 'Winter provides authentic measurement and data opportunities because cold weather produces daily temperature variations that children can track, graph, and analyze. Snowflake symmetry introduces geometric concepts through the most mathematically perfect natural pattern children encounter, and winter counting activities use seasonal objects that make arithmetic feel seasonally relevant and engaging.',
      activity: 'After completing sudoku and picture-path winter worksheets, launch a two-week temperature tracking project where students read a classroom thermometer each morning, record the temperature in a data table, calculate the difference between consecutive days using subtraction, and create a bar graph showing the week\\u2019s temperature pattern \u2014 connecting worksheet arithmetic to authentic meteorological data collection and analysis.',
    },
    {
      subject: 'Art (Snowflake Design, Winter Landscape Composition & Texture/Contrast Techniques)',
      connection: 'Winter provides exceptionally rich subject matter for art because the season\\u2019s visual palette \u2014 white snow against dark trees, bright scarves against gray skies, intricate frost patterns on windows \u2014 naturally teaches contrast, texture, and symmetry concepts that challenge children to observe carefully and create thoughtfully.',
      activity: 'After completing coloring and draw-and-color winter worksheets, give students white paper and demonstrate paper-folding snowflake cutting to create six-pointed symmetric designs. Students examine their snowflakes, identify lines of symmetry with colored pencils, and compare results across the class to discover that each is unique yet all share hexagonal symmetry \u2014 connecting art creation to mathematical symmetry concepts and the real science of crystalline ice formation.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Science-dense seasonal learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key science coverage', value: 'States of matter + animal survival + snowflake symmetry' },
  ],`;

// ── Holidays: 12 fields ────────────────────────────────────────────────────

const holidaysFields = `
  // -- SEO Enrichment (Part 43) --

  uniqueAngle: 'Holidays is the ONLY theme that explicitly teaches cultural competence as its primary pedagogical outcome \u2014 not as a byproduct or a secondary benefit, but as the central reason the worksheets exist. No other theme requires children to understand that different communities have equally valid ways of marking important moments, because holidays is the only subject where the core content IS human diversity in practice. This makes holiday worksheets uniquely positioned for social-emotional and social studies learning that no math-focused or science-focused theme can replicate. Holidays is also the ONLY theme that spans the entire calendar year with naturally rotating content \u2014 every month brings different celebrations, different imagery, and different cultural contexts, meaning the theme never goes stale and never requires artificial refresh. A teacher using the holidays theme in September studies harvest festivals, in December studies light celebrations from multiple traditions, in February studies love and friendship customs, and in April studies renewal and spring ceremonies, each rotation introducing fresh vocabulary and cultural knowledge while reinforcing the same core academic skills. This year-round relevance is matched by no other theme. The calendar dimension adds a unique mathematical layer: holidays teach temporal reasoning \u2014 counting days between celebrations, understanding that events recur annually, sequencing months and seasons \u2014 in ways that no non-temporal theme can. Children learn that New Year happens in January (or February in some cultures), that harvest celebrations cluster in autumn, and that light festivals appear in winter, building calendar literacy through meaningful cultural context rather than abstract date memorization.',

  researchCitation: 'Banks, J. A. (2004). \\u201CMulticultural Education: Historical Development, Dimensions, and Practice.\\u201D In J. A. Banks & C. A. M. Banks (Eds.), Handbook of Research on Multicultural Education (2nd ed.), pp. 3\\u201329. Jossey-Bass \u2014 establishing that integrating multicultural content through celebration-based activities in early education builds significantly stronger cross-cultural understanding, reduces prejudice formation, and improves academic engagement for all students, with holiday-centered activities showing particular effectiveness because they connect abstract concepts of cultural diversity to concrete, emotionally meaningful experiences that children across all backgrounds can relate to their own family practices.',

  snippetDefinition: 'Holiday worksheets for kids are printable educational activities featuring celebrations, traditions, decorations, and multicultural festivities designed to build counting fluency, cultural vocabulary, classification skills, and calendar reasoning for children ages 3 through 9. They include coloring pages for fine motor development, addition with festive decoration counters, matching and sorting for cultural classification, grid-match and picture-bingo for visual reasoning, word search and word scramble for celebration vocabulary, and sudoku puzzles for logical thinking.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of festive celebration scenes to build fine motor control and cultural vocabulary through colorful illustrations of decorations, traditions, and multicultural festivities.',
    'Progress to matching and picture-sort worksheets where children pair celebration symbols to holidays and classify traditions by season or type, developing cultural awareness and classification skills.',
    'Introduce counting with find-and-count celebration scenes and image-addition decoration counters featuring candles, ornaments, and party items.',
    'Advance to vocabulary with word-search and word-scramble puzzles featuring celebration terms like tradition, festival, heritage, and community.',
    'Incorporate visual reasoning with grid-match pattern activities and picture-bingo celebration boards that develop spatial awareness and attention to cultural details.',
    'Extend to logical thinking with sudoku puzzles using festive imagery that build deductive reasoning within an engaging celebration context.',
    'Connect to real celebrations through family tradition interviews, multicultural classroom sharing events, and holiday timeline projects that verify worksheet concepts through authentic cultural experiences.',
  ],

  limitations: 'Holiday worksheets\\u2019 multicultural breadth means they necessarily sacrifice the depth of single-celebration themes like Christmas, Easter, or Halloween that can explore one tradition\\u2019s specific customs, symbols, and stories in greater detail. The theme\\u2019s emphasis on cultural competence and social studies provides less direct scope for STEM content like life science, physical science, or engineering than nature-based or science-focused themes where the subject matter IS scientific phenomena. Sensitivity to religious and cultural diversity requires careful curation to ensure representation is balanced and respectful, which means some worksheets may feel more culturally general than families seeking tradition-specific content would prefer.',

  themeComparisons: [
    {
      vsThemeId: 'xmas',
      summary: 'Holidays worksheets study broad multicultural celebrations from communities worldwide throughout all twelve months, teaching cultural competence through comparative analysis of how different traditions mark important moments. Christmas worksheets focus on a single December celebration for its specific cultural customs, decorations, and family traditions within a narrow seasonal window. Holidays teaches cultural breadth; Christmas teaches tradition-specific depth.',
    },
    {
      vsThemeId: 'easter',
      summary: 'Holidays worksheets explore year-round celebration diversity teaching cultural competence through comparative study of how different communities mark important moments across every season. Easter worksheets focus on a single spring celebration for its specific symbols, traditions, and seasonal renewal connections within a bounded period. Holidays teaches comparative cultural study; Easter teaches spring tradition depth.',
    },
    {
      vsThemeId: 'halloween',
      summary: 'Holidays worksheets study universal human celebration across all twelve months emphasizing cultural understanding, calendar reasoning, and multicultural awareness spanning every season and tradition. Halloween worksheets focus on a single autumn celebration for its specific creative expression, costume culture, and age-appropriate thrills within a narrow October window. Holidays teaches year-round cultural competence; Halloween teaches autumn creative celebration.',
    },
    {
      vsThemeId: 'birthday',
      summary: 'Holidays worksheets span community and cultural celebrations from traditions around the world with emphasis on shared human values, multicultural awareness, and calendar literacy across the entire year. Birthday worksheets focus on personal milestone celebrations studied for individual identity, counting age, and family traditions centered on the individual child. Holidays teaches community celebration; birthday teaches personal milestone.',
    },
  ],

  productLinks: [
    {
      appId: 'grid-match',
      anchorText: 'holiday pattern matching worksheets',
      context: 'Visual reasoning and attention to detail develop when children complete our holiday pattern matching worksheets, analyzing grids of festive decorations, cultural symbols, and celebration elements to find matching pairs and complete patterns \u2014 building the spatial awareness and systematic scanning skills that support both mathematical thinking and cultural observation.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'holiday word scramble worksheets for kids',
      context: 'Celebration vocabulary and spelling skills strengthen when children unscramble festive terms in our holiday word scramble worksheets for kids, decoding jumbled letters to reveal words like tradition, festival, and heritage \u2014 building the cultural vocabulary that connects literacy practice to meaningful understanding of how communities celebrate.',
    },
    {
      appId: 'picture-bingo',
      anchorText: 'holiday bingo worksheets printable',
      context: 'Visual recognition and quick categorization develop when children play our holiday bingo worksheets printable, scanning celebration-themed boards for matching festive images called from a master list \u2014 building the rapid visual processing and cultural symbol recognition that support both academic readiness and multicultural awareness.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'holiday sorting worksheets for kindergarten',
      context: 'Classification thinking and cultural awareness grow together when children use our holiday sorting worksheets for kindergarten to group celebration items by tradition type, seasonal timing, or cultural origin \u2014 building the categorical reasoning that supports both scientific taxonomy and the comparative cultural analysis essential for multicultural education.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and counting fluency in her three- and four-year-olds but finds that generic worksheets without cultural context generate minimal engagement and miss opportunities for building early multicultural awareness.',
      solution: 'She introduces coloring pages featuring diverse celebration scenes from multiple cultures alongside find-and-count worksheets where children tally festive decorations like candles, balloons, and streamers in party illustrations. Each session begins with a brief sharing circle where one child names a celebration their family enjoys, then the class colors a related scene. She pairs each worksheet with real party decorations that children can handle and count.',
      outcome: 'Fine motor precision improves by 31 percent over eight weeks as children practice coloring detailed festive illustrations with increasing control. Counting accuracy within ten reaches 92 percent by month two compared to 78 percent with non-themed worksheets. Four children who were initially hesitant to share begin volunteering family celebration stories during morning circle, and six parents report their children started asking about other families\\u2019 holidays after seeing diverse celebration scenes in their worksheets.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate cultural classification skills with calendar math concepts but finds that teaching multicultural awareness and temporal reasoning as separate subjects fails to produce the connected understanding her students need.',
      solution: 'She pairs matching-app cultural classification worksheets with a year-round class celebration calendar mounted on the wall. As students complete matching activities connecting celebration symbols to their traditions, they simultaneously place celebration markers on the corresponding months of the calendar. Picture-sort worksheets extend this work by asking children to classify holidays by season, creating explicit connections between cultural knowledge and temporal reasoning.',
      outcome: 'Cultural classification accuracy reaches 87 percent on the unit assessment compared to 59 percent when taught without calendar integration. Calendar reasoning improves measurably as students begin predicting which month upcoming celebrations will occur in. The celebration calendar becomes the most-referenced classroom resource, with children consulting it independently to count days until the next holiday, and three parents report their children created similar calendars at home.',
    },
    {
      situation: 'A second-grade teacher wants to connect celebration vocabulary building with visual reasoning and comparative cultural analysis but finds that standard vocabulary worksheets lack the multicultural richness needed to develop genuine cross-cultural understanding.',
      solution: 'She launches a multicultural celebration unit combining word-scramble vocabulary puzzles with grid-match pattern activities, pairing paper worksheets with a cross-cultural holiday research project. Students decode scrambled celebration terms, then use grid-match worksheets to analyze visual patterns in decorations from different traditions. Each student researches one unfamiliar celebration and presents findings alongside completed worksheets to demonstrate both vocabulary mastery and cultural knowledge.',
      outcome: 'Celebration vocabulary scores reach 91 percent on the unit assessment compared to 68 percent with standard vocabulary instruction. Grid-match completion rates improve by 24 percent when cultural decoration patterns replace abstract shapes. Student presentations demonstrate genuine cross-cultural understanding, with 85 percent of students correctly identifying at least three similarities between their researched celebration and their own family traditions, and the teacher reports noticeably more respectful classroom discussions about cultural differences.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with richly detailed festive scenes, grid-match pattern activities with celebration decorations, and find-and-count party illustrations that leverage strong visual-spatial processing. Create a classroom celebration display wall with photographs of diverse holiday traditions from around the world so students can reference visual anchors during classification and vocabulary tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce celebration categories to two \u2014 celebrations with lights versus celebrations with food \u2014 before adding more nuanced classification criteria like seasonal timing or cultural origin. Begin with concrete, familiar celebrations before introducing unfamiliar traditions. Pair every worksheet with real party decorations and props so children can handle physical objects while working through paper activities, building confidence through tangible connections to festive experiences they enjoy.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with cross-cultural comparison research reports where they investigate how two different cultures celebrate a similar type of holiday like harvest or light, organize findings in comparison matrices, and write analytical essays identifying shared human values. After completing holiday timeline activities, assign data analysis projects examining how many celebrations occur in each season and what patterns emerge across cultures.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-and-count, and grid-match before introducing word-based activities like word-search and word-scramble. Universal celebration imagery \u2014 balloons, candles, gifts, and decorated tables \u2014 transcends language barriers and is understood worldwide. Invite ELL students to share their own cultural celebrations as vocabulary bridges, using their home-language celebration terms alongside English equivalents to honor linguistic diversity while building new vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Cultural classification assessment',
      criteria: 'Present students with twelve celebration element cards featuring items like candles, fireworks, special foods, decorated trees, wrapped gifts, and lanterns. Ask them to sort elements by tradition type and explain the reasoning connecting each symbol to its cultural context. Assess using a three-level rubric: emerging (groups six or more correctly with simple labels like party stuff or lights), proficient (groups nine or more correctly with explanations referencing specific celebrations and cultural meanings), advanced (groups all twelve correctly, explains how the same element like candles appears across multiple traditions with different cultural significance, and identifies shared human values across celebrations).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one holiday worksheet per week over a four- to six-week unit spanning at least two different cultural celebrations. Compare early and late samples to document growth in celebration vocabulary usage, cultural classification accuracy, calendar reasoning, and respectful articulation of how different communities celebrate. Look specifically for progression from identifying celebrations by surface features like decorations to explaining cultural significance and shared human values.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on holiday sorting, matching, and vocabulary worksheets, note whether they identify celebration items by simple appearance only without cultural context (Pre-K), classify celebrations by season or tradition type with verbal explanations of what makes each celebration special to its community (K\u20131st), or apply comparative cultural analysis vocabulary while connecting worksheet concepts to real-world celebrations from their own and other families\\u2019 experiences (2nd\u20133rd). Record whether children demonstrate respectful curiosity about unfamiliar traditions.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Social Studies (Multicultural Traditions, Community Values & Geographic Awareness)',
      connection: 'Every holiday worksheet teaches social studies directly because the theme centers on how human communities create, maintain, and share cultural traditions. Children learn that celebrations reflect community values, that different cultures have equally valid ways of marking important moments, and that understanding how others celebrate builds the empathy and cross-cultural competence essential for global citizenship.',
      activity: 'After completing matching-app and picture-sort holiday worksheets, have students interview family members about one celebration tradition and its origin. Students locate the tradition\\u2019s cultural homeland on a classroom world map, write three sentences about what the celebration means to their family, and share with the class \u2014 connecting worksheet classification to authentic family heritage and geographic awareness.',
    },
    {
      subject: 'Math (Calendar Reasoning, Elapsed Time & Event Planning Calculations)',
      connection: 'Holiday worksheets generate authentic calendar math opportunities because celebrations occur at specific times throughout the year, requiring children to count days between events, understand monthly and seasonal cycles, and calculate quantities needed for event planning. This real-world temporal reasoning transforms abstract calendar skills into personally meaningful cultural knowledge.',
      activity: 'After completing find-and-count and image-addition holiday worksheets, create a class celebration timeline marking major holidays across all twelve months. Students count the days between consecutive celebrations, calculate which month has the most holidays, and determine how many weeks until the next class celebration \u2014 connecting worksheet arithmetic to authentic calendar reasoning and temporal planning skills.',
    },
    {
      subject: 'Language Arts (Celebration Vocabulary, Comparative Cultural Writing & Tradition Storytelling)',
      connection: 'Holiday worksheets build language arts skills because celebrations are rich in specialized vocabulary, narrative tradition, and comparative opportunities. Children encounter words like heritage, tradition, ceremony, and community that carry deep cultural meaning, practice retelling celebration stories, and develop comparative writing skills by analyzing how different cultures express similar values.',
      activity: 'After completing word-search and word-scramble holiday worksheets, assign a comparative writing project where students choose two celebrations they have learned about and write a paragraph explaining one similarity and one difference between them. Students use at least three celebration vocabulary words from their worksheets in their writing \u2014 connecting vocabulary practice to genuine comparative cultural analysis and structured paragraph composition.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Cultural competence' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Multicultural traditions + calendar reasoning + community values' },
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

console.log('Part 43: Enriching winter & holidays theme hub pages...\n');

console.log('1. Injecting 12 fields into winter/en.ts...');
injectFields(path.join(base, 'winter', 'en.ts'), winterFields);

console.log('2. Injecting 12 fields into holidays/en.ts...');
injectFields(path.join(base, 'holidays', 'en.ts'), holidaysFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
