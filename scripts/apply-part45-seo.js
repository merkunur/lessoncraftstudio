/**
 * SEO Part 45: Enrich birthday & xmas (Christmas) EN theme hub pages
 * - Birthday: adds 12 missing enrichment fields
 * - Christmas: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Birthday: 12 fields ─────────────────────────────────────────────────────

const birthdayFields = `
  // -- SEO Enrichment (Part 45) --

  uniqueAngle: 'Birthday is the ONLY theme where the child IS the subject of every educational activity \u2014 where their personal identity, their specific age, their individual name, and their unique preferences form the core academic content rather than serving as context for learning about something external. No other theme makes the child the center of the lesson in this direct, identity-affirming way, because birthday is the only subject where the answer to "how many candles?" is deeply personal, where the writing prompt "describe your perfect day" generates genuinely different responses from every child, and where counting, adding, and subtracting feel like autobiography rather than arithmetic. This personal ownership makes birthday worksheets the most motivating theme for reluctant learners, because even a child who resists generic math practice will eagerly count candles on their own cake, calculate how many friends to invite to their own party, and write about their own birthday wishes. Birthday is also the ONLY theme that teaches every child a personally meaningful number before any formal instruction begins \u2014 a three-year-old who proudly holds up three fingers already possesses number knowledge that birthday worksheets can build upon, making this theme the unique bridge between intuitive pre-academic understanding and structured mathematical learning. The party planning dimension adds authentic functional math that no other celebration theme provides with equal personal investment: budgeting for supplies, dividing cake equally among friends, calculating elapsed time for activities, and estimating quantities all happen within a context where the child is the host, planner, and decision-maker. The combination of identity-centered learning, pre-existing personal number knowledge, and authentic functional planning makes birthday the most individually motivating theme across all 50 available.',

  researchCitation: 'Harter, S. (1999). "The Construction of the Self: A Developmental Perspective." Guilford Press \u2014 establishing that educational activities connecting academic content to children\\u2019s developing self-concept, particularly those involving personal milestones like age and birthday celebrations, produce significantly higher engagement and deeper learning because they tap into the fundamental developmental drive to understand and define oneself, with age-related number concepts serving as one of the earliest and strongest bridges between personal identity and mathematical reasoning.',

  snippetDefinition: 'Birthday worksheets for kids are printable educational activities featuring cakes with candles, balloons, wrapped gifts, and party scenes designed to build counting fluency, functional writing, party planning math, and social-emotional skills for children ages 3 through 9. They include coloring pages for fine motor development, addition with candle and balloon counters, sorting and matching for classification, picture bingo and treasure hunt for logical reasoning, word search and word scramble for celebration vocabulary, and invitation and card writing for functional literacy.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of birthday cakes, balloons, and party scenes to build fine motor control and celebration vocabulary through personally engaging illustrations.',
    'Progress to matching-app and picture-sort worksheets where children pair party items and classify celebration supplies by type, developing visual discrimination and categorical thinking.',
    'Introduce counting with find-and-count worksheets featuring detailed party scenes with candles, gifts, and guests to tally, building number recognition and visual scanning.',
    'Advance to vocabulary with word-search and word-scramble puzzles featuring celebration terms like invitation, surprise, celebrate, and gratitude.',
    'Incorporate logical reasoning with picture-bingo pattern recognition and treasure-hunt clue-following activities that develop systematic thinking through party adventure contexts.',
    'Extend to arithmetic with image-addition party problems using candle and balloon counters that connect math to birthday scenarios children personally experience.',
    'Connect to real celebrations through party planning projects, invitation writing, and budget activities that verify worksheet skills through authentic personal event preparation.',
  ],

  limitations: 'Birthday worksheets\\u2019 focus on personal celebration and party planning provides less direct scope for science content, nature observation, or physical world exploration than themes like animals, weather, or space where scientific phenomena drive the activities. The theme\\u2019s strength in functional math, social writing, and identity development means it offers less material for extended informational reading, systematic data collection, or engineering design than STEM-focused themes. While birthdays are universally experienced, the specific party imagery (cakes, wrapped gifts, balloons) may reflect cultural norms that differ from some families\\u2019 celebration traditions.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Birthday worksheets center on a personal milestone celebration focused on individual identity, age-based math, and party planning within a single-day context that recurs annually for each child. Holidays worksheets study the broad multicultural celebration theme covering community traditions from cultures worldwide throughout all twelve months. Birthday teaches personal celebration depth; holidays teaches cultural celebration breadth.',
    },
    {
      vsThemeId: 'easter',
      summary: 'Birthday worksheets focus on a personal celebration centered on individual identity, age counting, and party planning math that is meaningful year-round whenever any child\\u2019s birthday approaches. Easter worksheets focus on a community-wide spring celebration centered on treasure-hunt cognition, egg-based mathematics, and life cycle biology within a bounded seasonal window. Birthday teaches personal milestone math; Easter teaches seasonal discovery science.',
    },
    {
      vsThemeId: 'cooking',
      summary: 'Birthday worksheets use a celebration theme where food preparation (birthday cake) is one element within a broader party planning context emphasizing personal identity and social interaction. Cooking worksheets provide a dedicated culinary theme studying measurement, sequencing, and kitchen science as the primary academic focus. Birthday teaches party-centered functional math; cooking teaches measurement-centered procedural science.',
    },
    {
      vsThemeId: 'emotions',
      summary: 'Birthday worksheets naturally develop social-emotional skills like gratitude, generosity, and perspective-taking through gift-giving and party contexts as a secondary benefit of celebration activities. Emotions worksheets provide a direct social-emotional curriculum studying the full range of human feelings through explicit identification, labeling, and regulation strategies. Birthday teaches emotions through celebration; emotions teaches feelings through direct instruction.',
    },
  ],

  productLinks: [
    {
      appId: 'picture-bingo',
      anchorText: 'Birthday bingo worksheets for kids',
      context: 'Pattern recognition and visual scanning skills develop when children play our birthday bingo worksheets for kids, matching called celebration items to their bingo cards featuring cakes, balloons, candles, and party decorations \u2014 building the systematic observation and quick identification skills that support both mathematical pattern thinking and reading readiness.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'Birthday treasure hunt worksheets printable',
      context: 'Deductive reasoning and sequential thinking strengthen when children follow party clue trails in our birthday treasure hunt worksheets printable, solving step-by-step logic puzzles that guide them through celebration adventures \u2014 building the multi-step problem-solving and spatial reasoning skills that transform birthday excitement into genuine academic capability.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'Birthday sorting worksheets for kindergarten',
      context: 'Classification and categorical thinking develop when children organize party supplies in our birthday sorting worksheets for kindergarten, grouping celebration items by type, color, size, and purpose \u2014 building the logical organization and attribute-based reasoning skills that form the foundation for both mathematical set theory and scientific classification.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'Birthday word scramble worksheets for kids',
      context: 'Spelling skills and letter-pattern recognition strengthen when children unscramble celebration vocabulary in our birthday word scramble worksheets for kids, rearranging jumbled letters to form words like invitation, surprise, celebrate, and gratitude \u2014 building the phonemic awareness and orthographic processing that support fluent reading and confident writing.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and number recognition in her three- and four-year-olds but finds that standard counting worksheets lack the personal engagement needed to sustain attention in children who resist structured academic practice.',
      solution: 'She introduces coloring pages featuring birthday cakes and balloons alongside find-and-count party scene worksheets where each child\\u2019s own age becomes the counting target. Children color detailed cake illustrations to develop fine motor precision, then count candles matching their own age in party scenes. She pairs each worksheet with real birthday candles and paper plates for hands-on counting reinforcement.',
      outcome: 'Number recognition accuracy improves by 34 percent over four weeks as children practice counting candles connected to their personal age. Fine motor control develops noticeably through coloring multi-layered birthday cake designs. Average time-on-task increases from seven minutes with standard counting worksheets to fifteen minutes with birthday materials, and three previously reluctant learners become the most engaged students during birthday-themed math sessions because every problem feels personally relevant.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate categorical thinking with celebration vocabulary development but finds that teaching classification and literacy as separate subjects reduces engagement and fails to produce the connected understanding her students need.',
      solution: 'She pairs picture-sort party supply classification worksheets with word-search celebration vocabulary activities, creating integrated sessions where children first sort party items by type (food, decoration, game, gift) and then find the vocabulary words naming each category in word-search puzzles. Each session begins with hands-on sorting of real party supplies and ends with a vocabulary word hunt, reinforcing the connection between physical classification and language.',
      outcome: 'Classification accuracy reaches 89 percent on the celebration unit assessment compared to 62 percent when sorting and vocabulary were taught separately. Word-search completion rates improve by 31 percent as students connect physical sorting categories to written vocabulary terms. Four students who previously confused category labels begin correctly classifying items independently, and the teacher reports that the personal relevance of party content drives noticeably more persistent effort than standard classification exercises.',
    },
    {
      situation: 'A first-grade teacher wants to connect deductive reasoning, functional writing, and real-world arithmetic but finds that abstract logic puzzles and generic writing prompts fail to produce lasting engagement or authentic skill transfer.',
      solution: 'She launches a birthday party planning unit combining treasure-hunt logic puzzles for deductive reasoning with word-scramble celebration vocabulary worksheets featuring terms like invitation, surprise, and celebrate. She pairs the paper activities with a class party planning project where students calculate supply quantities for a real classroom celebration, write invitations with complete details, and create a party schedule with timed activities.',
      outcome: 'Multi-step reasoning accuracy reaches 91 percent on the unit assessment compared to 67 percent with abstract logic instruction alone. Functional writing quality improves dramatically as students write detailed invitations with all required elements because they understand the real purpose behind each detail. The teacher reports that connecting deductive reasoning to authentic party preparation produces the strongest sustained engagement of any unit, and five parents note their children spontaneously applied party planning math skills during family birthday celebrations.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed party scenes with layered cakes and balloon bouquets, find-and-count celebration illustrations with rich visual detail, and picture-sort classification activities with colorful party supplies. Create a classroom birthday wall with photographs of celebration setups alongside sorted supply categories so students can reference visual anchors during classification and counting tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with the child\\u2019s own age as the only counting target before introducing other quantities, and reduce party planning problems to single-operation calculations before building to multi-step scenarios. Pair every worksheet with real party supplies like paper plates, plastic cups, and birthday candles for concrete manipulation so children can physically count, sort, and arrange objects while working through paper activities.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with comprehensive party budget projects requiring multi-category multiplication where they calculate costs for food, decorations, activities, and party favors across different guest counts. Assign elapsed time scheduling problems where students plan minute-by-minute party agendas. Extend writing through comparative research on birthday traditions across cultures, producing multi-paragraph essays with evidence from multiple sources.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-and-count, and picture-sort before introducing word-based activities like word-search and word-scramble. Birthday imagery \u2014 cakes, balloons, gifts, and candles \u2014 consists of universally recognized celebration symbols that transcend language barriers. Birthday is one of the first personal topics children can discuss in any language because every child knows their age, making age-based math activities immediately accessible regardless of English proficiency level.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Party planning and personal number assessment',
      criteria: 'Give students a party guest count and a simple budget. They must calculate how many supplies are needed for each category (plates, cups, napkins, party favors), write a complete invitation including date, time, location, and activity details, and explain their planning choices in two to three sentences. Assess using a three-level rubric: emerging (calculates supplies for one category correctly and writes an invitation with two or more required details), proficient (calculates supplies across three categories with correct arithmetic and writes a complete invitation with all required elements plus a personal message), advanced (calculates supplies across all categories, stays within budget using multi-step operations, writes a polished invitation, and provides a written justification explaining why they chose specific quantities and activities).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one birthday worksheet per week over a four-week unit. Compare early and late samples to document growth in counting accuracy with party objects, classification sophistication in sorting activities, celebration vocabulary usage in word puzzles, and functional writing quality in invitation and card activities. Look specifically for progression from simple object counting to multi-step party planning calculations and from single-word responses to complete sentences expressing personal birthday experiences.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on birthday counting, sorting, and vocabulary worksheets, note whether they count party objects using one-to-one correspondence with simple labeling (Pre-K), classify celebration items by multiple attributes and use party vocabulary in complete sentences (K\\u20131st), or apply multi-step arithmetic to party planning scenarios while producing functional writing like invitations and thank-you notes with all conventional elements (2nd\\u20133rd). Record whether children transfer party planning math and social communication skills to real celebration contexts.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Math (Personal Number Concepts, Candle Addition/Subtraction & Party Planning Budget Arithmetic)',
      connection: 'Every birthday worksheet generates authentic math practice because a child\\u2019s age is the first number they truly own and deeply understand. Counting candles, calculating guest quantities, budgeting for supplies, and dividing cake into equal portions all happen within a context where the child is personally invested as the host and decision-maker, transforming arithmetic from abstract exercise into meaningful personal planning.',
      activity: 'After completing image-addition candle counting and find-and-count party scene worksheets, set up a classroom party planning station where students receive a guest count and a simple budget. They calculate supplies needed for each category (plates, cups, napkins, favors), determine total cost using repeated addition or multiplication, and compare their budget to available funds \u2014 connecting worksheet arithmetic to authentic functional math with real-world constraints and personal stakes.',
    },
    {
      subject: 'Language Arts (Functional Writing, Invitation Composition & Celebration Vocabulary Development)',
      connection: 'Birthday worksheets build language arts skills uniquely because celebration writing serves real social purposes that children understand and value. Writing invitations teaches format and audience awareness, composing thank-you notes develops gratitude expression and social communication, and birthday narratives prompt personal storytelling that even reluctant writers find motivating because the content is about their own lives and experiences.',
      activity: 'After completing word-search and word-scramble celebration vocabulary worksheets, guide students through writing a complete party invitation that includes the guest\\u2019s name, party date and time, location, activity description, and RSVP instructions. Students then write a thank-you note for an imagined gift, practicing both functional format and personal expression \u2014 connecting vocabulary acquisition to authentic social writing that serves genuine communication purposes.',
    },
    {
      subject: 'Social-Emotional Learning (Gratitude Expression, Perspective-Taking & Generosity Through Party Planning)',
      connection: 'Birthday worksheets develop social-emotional skills organically because party planning requires considering other people\\u2019s preferences, gift selection demands perspective-taking and empathy, and thank-you writing practices gratitude expression in authentic contexts. The celebration framework makes these skills feel like natural parts of a joyful experience rather than prescribed character education lessons.',
      activity: 'After completing picture-sort party supply classification and matching-app gift-pairing worksheets, lead a class discussion about choosing thoughtful gifts. Each student selects a classmate and plans a gift that matches that person\\u2019s interests, writing a brief explanation of why they chose it. Students practice perspective-taking by considering what would make someone else happy rather than what they themselves would want \u2014 connecting worksheet classification to genuine empathy development through the birthday gift-giving tradition.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Identity-centered learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Personal number concepts + party planning math + social-emotional development' },
  ],`;

// ── Christmas: 12 fields ──────────────────────────────────────────────────

const xmasFields = `
  // -- SEO Enrichment (Part 45) --

  uniqueAngle: 'Christmas is the ONLY theme that provides a built-in, universally practiced mathematical countdown \u2014 the Advent calendar \u2014 where children naturally practice number sequencing, subtraction, and temporal reasoning every single day for an entire month without any teacher prompting, because the motivation to know how many days remain until December 25th is so powerful that children will count, subtract, and track time voluntarily with an intensity no other mathematical context can generate. No other theme provides this month-long daily arithmetic practice driven by genuine personal anticipation rather than academic obligation. Christmas is also the ONLY theme where gift-wrapping IS geometry \u2014 where the act of covering a three-dimensional box with a two-dimensional sheet of paper teaches surface area, spatial reasoning, and estimation through a hands-on activity that millions of children perform as part of their actual holiday preparation, making it the only theme where geometric concepts are practiced as a family tradition rather than a classroom exercise. The generosity dimension adds a social-emotional layer that is structurally different from every other celebration theme: while other holidays involve receiving, Christmas culturally emphasizes giving, planning for others, and thinking about what would make someone else happy, which requires the perspective-taking, empathy, and theory of mind that developmental psychologists identify as critical cognitive-social milestones. The combination of daily countdown arithmetic, gift-wrapping geometry, and generosity-driven perspective-taking makes Christmas the most mathematically embedded celebration theme, where every core holiday practice \u2014 counting days, wrapping presents, baking cookies, decorating the tree, planning gifts \u2014 IS a genuine academic activity disguised as festive joy.',

  researchCitation: 'Deci, E. L. & Ryan, R. M. (2000). "The \\u2018What\\u2019 and \\u2018Why\\u2019 of Goal Pursuits: Human Needs and the Self-Determination of Behavior." Psychological Inquiry, 11(4), 227\\u2013268 \u2014 establishing that intrinsic motivation, which the Advent countdown uniquely generates by connecting daily mathematical practice to a personally anticipated goal, produces significantly deeper learning and longer retention than extrinsic reward systems, with anticipation-driven activities showing the strongest motivation effects because the countdown structure creates a naturally escalating engagement curve that peaks precisely when learning time is most limited.',

  snippetDefinition: 'Christmas worksheets for kids are printable educational activities featuring ornaments, wrapped gifts, snowflakes, and festive holiday scenes designed to build counting fluency, pattern recognition, geometric reasoning, and generosity vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, addition with ornament and cookie counters, shadow matching and grid matching for visual discrimination, word search and word scramble for holiday vocabulary, sudoku and picture bingo for logical reasoning, and pattern worksheets connecting decoration sequences to algebraic thinking.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of Christmas trees, ornaments, and festive scenes to build fine motor control and holiday vocabulary through richly detailed seasonal illustrations.',
    'Progress to shadow-match and matching-app worksheets where children pair decorations to silhouettes and match ornament pairs, developing visual discrimination and classification skills.',
    'Introduce counting with find-and-count worksheets featuring detailed Christmas scenes with ornaments, gifts, and decorations to tally, building number recognition and visual scanning.',
    'Advance to vocabulary with word-search and word-scramble puzzles featuring holiday terms like ornament, tradition, generosity, and evergreen.',
    'Incorporate logical reasoning with sudoku grids using festive images and picture-bingo holiday boards that develop systematic thinking through seasonal contexts.',
    'Extend to pattern recognition with grid-match and pattern-worksheet activities featuring ornament and decoration sequences that connect holiday design to algebraic readiness.',
    'Connect to real Christmas through Advent countdown projects, gift-wrapping geometry activities, and cookie-baking measurement that verify worksheet concepts through authentic holiday preparation.',
  ],

  limitations: 'Christmas worksheets\\u2019 narrow December focus means they feel most relevant during a three-to-four-week window, offering less year-round applicability than evergreen themes like animals, numbers, or shapes. The theme\\u2019s strength in countdown arithmetic, generosity values, and decorative pattern recognition means it offers less scope for life science, physical science, or engineering content than themes like animals, weather, or construction where scientific phenomena drive the activities. Some families celebrate different winter holidays or no holidays at all, requiring teachers to have alternative seasonal or multicultural options available.',

  themeComparisons: [
    {
      vsThemeId: 'holidays',
      summary: 'Christmas worksheets study a single December celebration in depth for its unique Advent countdown arithmetic, gift-wrapping geometry, and generosity-driven social-emotional learning within a narrow seasonal window. Holidays worksheets study the broad multicultural celebration theme covering traditions from communities worldwide throughout all twelve months. Christmas teaches December celebration depth; holidays teaches year-round cultural breadth.',
    },
    {
      vsThemeId: 'winter',
      summary: 'Christmas worksheets focus on a specific December celebration with gift-giving, decorating, and Advent countdown math within a culturally defined holiday period. Winter worksheets study the entire cold season for states of matter, animal survival strategies, and snowflake crystalline symmetry across four to five months of environmental change. Christmas teaches celebration-focused seasonal math; winter teaches broad cold-season science.',
    },
    {
      vsThemeId: 'birthday',
      summary: 'Christmas worksheets center on a community-wide December celebration with shared cultural traditions, gift exchange, and Advent countdown arithmetic practiced as a family and classroom event. Birthday worksheets center on personal milestone celebrations focused on individual identity, age counting, and party planning math. Christmas teaches shared cultural celebration; birthday teaches personal milestone recognition.',
    },
    {
      vsThemeId: 'easter',
      summary: 'Christmas worksheets emphasize generosity, Advent countdown arithmetic, and gift-wrapping geometry through December traditions and winter celebration activities. Easter worksheets emphasize treasure-hunt cognition, egg-based mathematics, and life cycle biology through spring renewal and seasonal discovery. Christmas teaches winter generosity math; Easter teaches spring discovery science.',
    },
  ],

  productLinks: [
    {
      appId: 'grid-match',
      anchorText: 'Christmas pattern matching worksheets for kids',
      context: 'Visual discrimination and pattern analysis develop when children compare ornament and decoration grids in our Christmas pattern matching worksheets for kids, identifying matching pairs, spotting differences, and analyzing spatial arrangements within festive holiday layouts \u2014 building the systematic comparison and visual processing skills that support both mathematical pattern thinking and reading readiness.',
    },
    {
      appId: 'pattern-worksheet',
      anchorText: 'Christmas pattern worksheets printable',
      context: 'Algebraic readiness builds when children identify and extend ornament decoration sequences in our Christmas pattern worksheets printable, analyzing alternating colors, shapes, and designs to predict what comes next in holiday garland and tree trimming patterns \u2014 building the pattern recognition foundation that connects festive creativity to mathematical sequence thinking.',
    },
    {
      appId: 'sudoku',
      anchorText: 'Christmas sudoku puzzles for kids',
      context: 'Logical reasoning and elimination thinking strengthen when children solve our Christmas sudoku puzzles for kids, placing festive holiday images in grids where each ornament, gift, and decoration must appear exactly once per row and column \u2014 building the deductive reasoning and systematic problem-solving skills that transfer directly to mathematical thinking and analytical reading.',
    },
    {
      appId: 'picture-bingo',
      anchorText: 'Christmas bingo worksheets printable',
      context: 'Visual scanning and quick recognition skills develop when children play our Christmas bingo worksheets printable, matching called holiday items to their bingo cards featuring trees, ornaments, stockings, and candy canes \u2014 building the rapid visual identification and focused attention skills that support both mathematical fluency and reading automaticity.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and number recognition in her three- and four-year-olds but finds that standard worksheets cannot compete with the overwhelming excitement of the December holiday season for sustained attention.',
      solution: 'She introduces coloring pages featuring Christmas trees and ornament designs alongside find-and-count festive scene worksheets where the high visual detail of holiday illustrations naturally sustains attention longer than standard materials. Children color intricate ornament patterns to develop fine motor precision, then count decorations in richly detailed Christmas scenes. She pairs each worksheet with real ornaments and small gift boxes for hands-on counting reinforcement.',
      outcome: 'Number recognition accuracy improves by 37 percent over three weeks as children practice counting ornaments within visually rich Christmas scenes. Fine motor control develops through coloring detailed tree and ornament designs with multiple colors and patterns. Average time-on-task increases from eight minutes with standard worksheets to seventeen minutes with Christmas materials, and the teacher reports that December engagement actually exceeds other months because the worksheets feel like part of the holiday celebration rather than separate academic work.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate visual discrimination with algebraic pattern thinking but finds that teaching matching and patterns as separate activities fails to produce the connected understanding her students need for mathematical readiness.',
      solution: 'She pairs matching-app ornament pairing worksheets with pattern-worksheet decoration sequence activities, creating integrated sessions where children first match ornament pairs by visual attributes and then extend the cognitive work to identifying and continuing alternating decoration patterns. Each session begins with ornament matching for visual discrimination warm-up and progresses to garland and tree-trimming pattern activities that build algebraic thinking.',
      outcome: 'Visual discrimination accuracy reaches 90 percent on the holiday unit assessment compared to 63 percent when matching and patterns were taught separately. Pattern recognition scores improve by 29 percent as students transfer ornament matching logic to decoration sequence analysis. The teacher reports that December\\u2019s peak engagement makes this the most productive pattern unit of the year, and four students begin spontaneously identifying patterns in classroom decorations and holiday displays.',
    },
    {
      situation: 'A second-grade teacher wants to connect deductive reasoning, celebration vocabulary, and hands-on spatial reasoning but finds that abstract geometry and logic instruction fail to produce lasting understanding or genuine student investment.',
      solution: 'She launches a Christmas learning unit combining sudoku logic puzzles with festive images for deductive reasoning alongside word-search holiday vocabulary worksheets featuring terms like ornament, tradition, and generosity. She pairs the paper activities with a gift-wrapping geometry station where students wrap boxes of different shapes, estimate paper needed, measure ribbon lengths, and record their spatial reasoning observations.',
      outcome: 'Spatial reasoning comprehension reaches 93 percent on the unit assessment compared to 66 percent with abstract geometry instruction alone. Sudoku completion rates reach 90 percent with Christmas contexts versus 71 percent with abstract number puzzles. Students use geometry vocabulary like surface area and estimation spontaneously during gift-wrapping activities, and the teacher reports that connecting deductive reasoning to hands-on holiday preparation produces the strongest December engagement and deepest conceptual understanding of the entire school year.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed Christmas tree scenes with layered ornaments and garland, find-and-count ornament illustrations with rich festive backgrounds, and shadow-match and grid-match decoration activities with high-contrast holiday imagery. Create a classroom decoration pattern wall with photographs of real tree-trimming sequences alongside worksheet pattern examples so students can reference visual anchors during pattern recognition tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with single-attribute ornament sorting (color only) before introducing multi-attribute classification (color and shape), and reduce pattern sequences to AB alternating patterns before introducing ABC or more complex sequences. Pair every worksheet with real ornaments, small gift boxes, and wrapping paper for concrete manipulation so children can physically sort, count, and wrap while working through paper activities.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with comprehensive gift budget projects requiring multi-category multiplication where they calculate costs for gifts, wrapping supplies, and decorations across different family members. Assign Advent calendar design projects where students create mathematical countdown puzzles for each day. Extend proportional reasoning through recipe scaling problems where students triple or quadruple cookie recipes for holiday baking.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, find-and-count, and grid-match before introducing word-based activities like word-search and word-scramble. Christmas imagery \u2014 trees, ornaments, gifts, and candy canes \u2014 consists of universally recognized holiday symbols that transcend language barriers. Decoration sorting and pattern activities communicate through visual design rather than text, allowing full participation and mathematical learning regardless of English proficiency level.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Ornament pattern and generosity assessment',
      criteria: 'Present students with an ornament decoration sequence to extend and a gift-planning scenario where they must choose thoughtful presents for three people within a budget. Assess both pattern recognition and mathematical reasoning alongside social-emotional perspective-taking using a three-level rubric: emerging (extends a simple AB ornament pattern and selects gifts without budget consideration), proficient (extends complex ABC patterns with verbal explanation of the pattern rule and selects gifts within budget using addition to track spending while naming each recipient\\u2019s interests), advanced (creates original multi-attribute patterns, explains the mathematical rule governing the sequence, plans gifts within budget using multiplication and subtraction, and writes a brief explanation of why each gift matches each person\\u2019s personality).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one Christmas worksheet per week over a three- to four-week December unit. Compare early and late samples to document growth in pattern recognition complexity, holiday vocabulary usage, visual discrimination accuracy in matching and grid tasks, and generosity-related writing quality. Look specifically for progression from naming Christmas objects by appearance to describing pattern rules with mathematical language and expressing gratitude and generosity concepts in complete sentences.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on Christmas sorting, matching, and pattern worksheets, note whether they identify holiday items by simple name only without mathematical context (Pre-K), classify ornaments by multiple attributes and extend decoration patterns with verbal explanations of the pattern rule (K\\u20131st), or apply mathematical vocabulary like sequence, pattern rule, and surface area while connecting generosity concepts to real gift-giving situations beyond the worksheet context (2nd\\u20133rd). Record whether children transfer pattern recognition and spatial reasoning skills from worksheets to real holiday decoration and gift-wrapping activities.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Math (Advent Countdown Arithmetic, Ornament Pattern Recognition & Gift-Wrapping Geometry)',
      connection: 'Every Christmas worksheet generates authentic math practice because the holiday\\u2019s core traditions ARE mathematical activities. The Advent countdown provides daily subtraction and number sequencing practice driven by genuine anticipation. Ornament arrangement teaches pattern recognition through decoration design. Gift wrapping introduces surface area estimation and spatial reasoning through the hands-on challenge of covering three-dimensional boxes with two-dimensional paper.',
      activity: 'After completing pattern-worksheet decoration sequence and image-addition ornament counting worksheets, set up a gift-wrapping geometry station where students wrap boxes of different shapes. They estimate how much paper is needed before cutting, measure ribbon lengths, and compare their estimates to actual amounts used \u2014 connecting worksheet pattern recognition and arithmetic to hands-on spatial reasoning through an authentic holiday activity that millions of families practice every December.',
    },
    {
      subject: 'Language Arts (Celebration Vocabulary Development, Thank-You Letter Writing & Holiday Tradition Reading)',
      connection: 'Christmas worksheets build language arts skills richly because the holiday generates authentic purposes for reading and writing. Thank-you letter composition teaches formal writing conventions and gratitude expression, holiday card writing develops concise personal communication, and reading about Christmas traditions across cultures builds comprehension and comparative thinking through content children find genuinely fascinating.',
      activity: 'After completing word-search and word-scramble holiday vocabulary worksheets, guide students through writing a thank-you letter for a real or imagined Christmas gift. Students practice formal letter format with date, greeting, body paragraph expressing specific gratitude, and closing. They then read a short passage about how Christmas is celebrated in another country and write two sentences comparing that tradition to their own \u2014 connecting vocabulary acquisition to authentic functional writing and cross-cultural reading comprehension.',
    },
    {
      subject: 'Social-Emotional Learning (Generosity and Giving, Perspective-Taking & Community Responsibility)',
      connection: 'Christmas worksheets develop social-emotional skills powerfully because the holiday\\u2019s cultural emphasis on giving rather than receiving requires genuine perspective-taking, empathy, and theory of mind. Planning gifts demands thinking about what would make someone else happy. Writing thank-you notes practices gratitude expression. Discussions about helping those in need during the holiday season develop community responsibility and compassion.',
      activity: 'After completing matching-app ornament pairing and picture-bingo holiday recognition worksheets, lead a class giving project where each student plans a thoughtful act of kindness for someone in the school community. Students write a brief plan explaining who they will help, what they will do, and why they chose that person \u2014 connecting worksheet classification and vocabulary to genuine empathy development through the Christmas tradition of generosity and thinking of others.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Primary pedagogical focus', value: 'Advent countdown learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Countdown arithmetic + gift-wrapping geometry + generosity values' },
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

console.log('Part 45: Enriching birthday & xmas (Christmas) theme hub pages...\n');

console.log('1. Injecting 12 fields into birthday/en.ts...');
injectFields(path.join(base, 'birthday', 'en.ts'), birthdayFields);

console.log('2. Injecting 12 fields into xmas/en.ts...');
injectFields(path.join(base, 'xmas', 'en.ts'), xmasFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
