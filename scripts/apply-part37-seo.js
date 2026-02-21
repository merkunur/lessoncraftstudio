/**
 * SEO Part 37: Enrich shapes & colors EN theme hub pages
 * - Shapes: adds 12 missing enrichment fields
 * - Colors: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Shapes: 12 fields ──────────────────────────────────────────────────────

const shapesFields = `
  // -- SEO Enrichment (Part 37) --

  uniqueAngle: 'Shapes occupy a pedagogical position no other theme in the collection can claim: they are the only theme that teaches children how to see rather than what to see. Every other theme \u2014 animals, dinosaurs, space, food \u2014 presents content for children to learn about, but shapes teaches the perceptual framework that makes all visual learning possible. When a child understands that a window is a rectangle and a wheel is a circle, they have not merely added two facts to their knowledge base; they have acquired a permanent geometric lens that restructures how they perceive every object they encounter for the rest of their lives. This transformation of perception itself is unique to geometry among all educational themes. Shapes are also the only theme where abstract mathematical concept and concrete physical reality share a relationship of identity rather than analogy. A triangle drawn on a worksheet IS a triangle, not a picture of a triangle the way a drawn cat is merely a picture of a cat. This identity between mathematical abstraction and physical form gives shapes an epistemological directness that no content-driven theme can replicate. The van Hiele model of geometric thinking provides a research-validated, multi-year developmental progression \u2014 from visual recognition through attribute analysis to informal deduction and beyond \u2014 that makes shapes the only theme with a formally structured cognitive development trajectory spanning the entire elementary curriculum. Children move through predictable levels of geometric understanding, and worksheets at each level can be precisely calibrated to support the transition to the next. Furthermore, shapes are the foundational language of spatial reasoning, which research consistently identifies as one of the strongest predictors of STEM achievement. The ability to mentally rotate, decompose, and compose shapes is not just a geometry skill \u2014 it is the cognitive infrastructure that supports engineering design, scientific visualization, architectural thinking, and even surgical precision.',

  researchCitation: 'Clements, D.H. & Sarama, J. (2000). "Young Children\\'s Ideas about Geometric Shapes." Teaching Children Mathematics, 6(8), 482\u2013488. This study demonstrated that children\\'s geometric thinking develops through predictable levels aligned with the van Hiele model, and that exposure to varied, non-prototypical shape examples in structured worksheet and manipulative activities \u2014 triangles that are long and skinny rather than equilateral, squares rotated to diamond orientation, rectangles of extreme proportions \u2014 significantly accelerates progression through geometric reasoning levels compared to instruction using only standard prototype shapes.',

  snippetDefinition: 'Shape worksheets for kids are printable educational activities featuring circles, squares, triangles, rectangles, hexagons, and other geometric forms \u2014 designed to build spatial reasoning, geometry vocabulary, and visual analysis skills for children ages 3 through 9. They include coloring pages that develop boundary awareness, shadow matching for spatial visualization, grid matching for precise comparison, picture sorting for attribute-based classification, missing-pieces puzzles for logical deduction, and pattern activities that connect geometry to algebraic thinking.',

  snippetHowTo: [
    'Begin with a real-world shape hunt around the classroom or home, asking children to find and name shapes in everyday objects like rectangular doors, circular clocks, and triangular roof peaks \u2014 this grounds abstract geometry in tangible experience before any worksheet appears.',
    'Start worksheet practice with recognition and naming activities such as coloring pages and matching worksheets, where children identify and color familiar shapes like circles, squares, and triangles in varied sizes and orientations to build flexible mental prototypes rather than rigid visual stereotypes.',
    'Progress to attribute analysis using picture-sort worksheets that ask children to classify shapes by properties like number of sides, number of corners, or presence of curves \u2014 pushing them beyond visual appearance toward the defining characteristics that make a shape what it is.',
    'Pair each paper-based worksheet with a hands-on sorting activity using cardboard cutouts or pattern blocks, so children feel the difference between three sides and four sides with their hands before analyzing it with their eyes on the worksheet.',
    'Advance to spatial reasoning challenges like shadow-match activities that present shapes in silhouette and varied orientations, training the mental rotation skills that predict success in STEM fields.',
    'Introduce composition and decomposition through missing-pieces and grid-match puzzles, where children must mentally rotate and combine shapes to complete patterns \u2014 the geometric equivalent of phonics blending in reading.',
    'Connect geometry to other math domains by using pattern worksheets with shape sequences and math worksheets with shape-based counters, showing children that geometry is not an isolated topic but a lens that enriches every area of mathematics.',
  ],

  limitations: 'Shape worksheets are inherently focused on visual-spatial and geometric skills, which means they offer less scope for narrative engagement, emotional exploration, or storytelling than content-driven themes like dinosaurs, fairy tales, or animals. Two-dimensional worksheet representations cannot fully capture the properties of three-dimensional shapes like cubes, cones, and spheres, requiring physical manipulatives to supplement paper-based learning for solid geometry concepts. The theme\\'s abstract, structural nature can feel less immediately motivating to some children than character-driven or adventure-based themes, particularly for learners who are strongly narrative-oriented.',

  themeComparisons: [
    {
      vsThemeId: 'numbers',
      summary: 'Shapes worksheets develop spatial reasoning through concrete geometric properties that children can see and touch \u2014 sides, corners, curves, and symmetry \u2014 while numbers worksheets develop abstract quantitative reasoning through counting, operations, and place value. Shapes build the visual-spatial intelligence that supports geometry, engineering, and design; numbers build the computational fluency that supports arithmetic, algebra, and data analysis. Together they cover the two foundational pillars of elementary mathematics.',
    },
    {
      vsThemeId: 'colors',
      summary: 'Shapes worksheets focus on geometric structural properties \u2014 how many sides, what kind of angles, whether lines are parallel \u2014 teaching children to analyze the skeleton of objects. Colors worksheets focus on visual-perceptual properties \u2014 hue, saturation, warm versus cool \u2014 teaching children to analyze the surface appearance of objects. Shapes train structural analysis; colors train perceptual discrimination. Both develop visual intelligence but through fundamentally different cognitive pathways.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Shapes worksheets study pure geometric concepts \u2014 the properties and relationships of forms in isolation \u2014 while construction worksheets apply geometry in building contexts where shapes serve functional purposes. Shapes teach why a triangle is structurally strong; construction shows that strength in action through bridges and buildings. Shapes provide the theoretical foundation; construction provides the applied engineering context.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Shapes worksheets develop abstract spatial reasoning through geometric analysis of forms with no narrative content, while animal worksheets develop classification and observation skills through content-rich creature study that naturally engages children\\'s curiosity. Shapes excel at building mathematical and spatial thinking; animals excel at building scientific observation and emotional engagement. The themes complement each other when animal illustrations are analyzed for their underlying geometric structures.',
    },
  ],

  productLinks: [
    {
      appId: 'shadow-match',
      anchorText: 'shape shadow matching worksheets',
      context: 'When students are ready to develop the spatial visualization skills that predict STEM success, our shape shadow matching worksheets present geometric forms as dark silhouettes in varied orientations, requiring children to analyze outlines and proportions without the aid of color or internal detail \u2014 the same cognitive process architects and engineers use when reading blueprints.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'shape sorting worksheets for kids',
      context: 'Classification thinking develops powerfully when children use our shape sorting worksheets for kids to group geometric forms by defining attributes like number of sides, presence of corners, or whether edges are curved or straight \u2014 moving beyond visual appearance to the property-based analysis that formal geometry requires.',
    },
    {
      appId: 'missing-pieces',
      anchorText: 'shape puzzle worksheets printable',
      context: 'Logical deduction and spatial reasoning combine when children work through our shape puzzle worksheets printable activities, which present incomplete geometric patterns and challenge young learners to determine which piece completes the design by mentally rotating, flipping, and comparing shape attributes.',
    },
    {
      appId: 'grid-match',
      anchorText: 'shape grid matching activities',
      context: 'Visual precision and attention to geometric detail sharpen as children work through our shape grid matching activities, where they must identify which cell in a complex grid contains an identical shape by comparing orientations, proportions, and structural features with the accuracy that mathematical analysis demands.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A first-grade teacher notices that several students consistently confuse b and d when reading, and traditional letter-reversal drills have not resolved the problem after three weeks of daily practice.',
      solution: 'She introduces a spatial reasoning intervention using shape shadow-match and grid-match worksheets that require children to distinguish between shapes that are mirror images of each other \u2014 a left-facing arrow versus a right-facing one, an L-shape versus its reflection. Each session pairs fifteen minutes of shape orientation work with five minutes of letter comparison, explicitly connecting the spatial discrimination skill to the letter-reversal challenge. Missing-pieces puzzles that require mental rotation provide additional practice.',
      outcome: 'After two weeks, four of five students with persistent b/d reversals resolve the confusion completely. The spatial reasoning approach succeeds where direct letter practice failed because the underlying deficit was visual-spatial discrimination, not letter knowledge. The teacher\\'s standardized spatial reasoning assessment scores for the class improve by 23 percent over the same period.',
    },
    {
      situation: 'A parent wants to support her kindergartner who has been identified as having math anxiety \u2014 the child freezes whenever number worksheets appear and says I\\'m bad at math, despite showing strong verbal and creative skills.',
      solution: 'The parent replaces all number-focused worksheets with shape activities for four weeks: coloring pages featuring geometric designs, picture-sort worksheets classifying shapes by attributes, and draw-and-color activities composing pictures from basic shapes. She frames every session as art and building, never mentioning math. In week three, she introduces pattern worksheets with shape sequences, and in week four, image addition worksheets using shape counters \u2014 both of which involve mathematical reasoning without triggering the math anxiety label.',
      outcome: 'The child completes all four weeks without a single anxiety episode because shapes feel like creative exploration rather than math. When number worksheets return in week five, the child approaches them with noticeably less resistance. The kindergarten teacher reports that the child voluntarily participates in geometry discussions for the first time, and informal assessment shows the child\\'s shape attribute vocabulary has doubled from six to twelve terms.',
    },
    {
      situation: 'A second-grade teacher needs to introduce fraction concepts but her students have no intuitive understanding of equal parts \u2014 they can memorize that half means two pieces but cannot explain why two unequal pieces do not count as halves.',
      solution: 'She designs a two-week geometry-first fractions unit using shape worksheets as the foundation. Students begin with picture-sort activities classifying shapes as having lines of symmetry or not, then progress to pattern worksheets where they complete symmetrical designs. Missing-pieces puzzles require them to identify which piece creates two equal halves. Finally, they use draw-and-color worksheets to partition circles and rectangles into halves, thirds, and fourths, shading specific fractions and defending why their partitions are truly equal.',
      outcome: 'When the formal fractions unit begins, 89 percent of students can correctly identify and create equal parts on their first assessment, compared to 52 percent the previous year when fractions were introduced without the geometry foundation. Students spontaneously use shape vocabulary like symmetrical and equal sides when explaining fraction concepts, demonstrating deep transfer from geometric understanding to numerical reasoning.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize shadow-match, grid-match, and coloring worksheets that leverage strong visual processing. Create a classroom shape wall with labeled examples showing each shape in multiple sizes, orientations, and real-world contexts so students can reference visual anchors during sorting and classification tasks. Use color-coded attribute charts where each property like number of sides or type of angles has a consistent color across all worksheets.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of shape types per worksheet to two or three visually distinct forms \u2014 such as circles, squares, and triangles \u2014 before introducing shapes that share attributes like rectangles and parallelograms. Pair every worksheet with physical manipulatives: cardboard cutouts children can hold, rotate, and trace before analyzing the printed version. Start each session with a confidence-building coloring page before introducing the target classification or spatial reasoning skill, and provide a completed example alongside each new worksheet type.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-attribute classification tasks where shapes must be sorted by two or three properties simultaneously, such as identifying all quadrilaterals with at least one right angle and at least one pair of parallel sides. After completing pattern worksheets, ask them to create their own tessellation designs and write explanatory paragraphs about which shapes tessellate and why. Introduce vocabulary like vertex, parallel, perpendicular, and congruent earlier than grade-level expectations.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, and grid-match before introducing word-based activities. Shape names are generally short and phonetically accessible (square, star, cube), making them ideal early English vocabulary. Provide a bilingual shape reference poster with labeled illustrations showing each shape alongside its name in both languages, and use physical shape manipulatives as tangible vocabulary anchors that children can hold and name while building confidence with English geometric terminology.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Art (Composition & Design)',
      connection: 'Shape analysis is the foundation of visual art composition. Every drawing, painting, and sculpture can be decomposed into basic geometric forms, and understanding this structure helps children both analyze existing artworks and create their own with intentional design rather than random placement. Artists from Mondrian to Kandinsky built entire careers on the relationship between geometric shapes and visual expression.',
      activity: 'After completing a draw-and-color shape worksheet, have students analyze a famous artwork by Mondrian or Kandinsky and identify every circle, rectangle, triangle, and line they can find. Then create their own geometric composition using only three shape types and three colors, writing a sentence explaining their design choices.',
    },
    {
      subject: 'Science (Crystal Structures & Cell Biology)',
      connection: 'Geometric shapes appear throughout the natural world in ways that connect directly to science standards. Crystal structures exhibit geometric patterns, honeycomb cells are hexagonal, snowflakes display six-fold symmetry, and cell biology reveals spherical, rod-shaped, and spiral structures. Recognizing these natural geometries transforms shape knowledge from abstract mathematics into observational science.',
      activity: 'Give students photographs of natural geometric structures \u2014 honeycombs, snowflakes, crystal formations, and cross-sections of fruit. Have them identify the dominant shape in each photograph using geometric vocabulary, then sort the photographs by shape type on a classification chart, writing one sentence explaining why nature might use that particular shape in each case.',
    },
    {
      subject: 'Architecture & Engineering',
      connection: 'Every building, bridge, and structure is a composition of geometric shapes chosen for specific structural properties. Triangles provide rigidity in trusses, arches distribute weight through curves, and rectangular grids create efficient floor plans. Understanding why architects choose specific shapes connects geometry to real-world engineering and gives children concrete answers to the question of why shapes matter beyond the classroom.',
      activity: 'Take students on a building shape hunt around the school, photographing or sketching every distinct geometric shape they find in doors, windows, roof lines, floor tiles, and structural supports. Back in the classroom, create a bar graph of shape frequency and discuss why rectangles dominate building design while triangles appear in roof structures \u2014 connecting geometric properties to engineering function.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one shape worksheet per week over a four-week geometry unit. Compare early and late samples to document growth in shape identification accuracy, attribute vocabulary usage, fine motor control in coloring precision, and complexity of spatial reasoning demonstrated in shadow-match and missing-pieces responses. Look specifically for evidence of progression from visual recognition to property-based analysis.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on shape sorting and matching worksheets, note whether they identify shapes by appearance only (Pre-K), describe shapes using attribute language like sides, corners, and curves (K\u20131st), or classify shapes by multiple properties simultaneously while explaining hierarchical relationships like a square is a special rectangle (2nd\u20133rd). Record whether children can recognize shapes in non-standard orientations and sizes.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Classification sorting assessment',
      criteria: 'Present students with a mixed set of shape cards including circles, triangles, squares, rectangles, hexagons, and irregular shapes. Ask them to sort the cards into groups, name each group, and explain one defining attribute that determines membership. For advanced students, ask them to re-sort using a different attribute and explain why the same shape can belong to different groups depending on the classification criterion used.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Shapes covered', value: 'Circles, squares, triangles, rectangles, hexagons & more' },
  ],`;

// ── Colors: 12 fields ──────────────────────────────────────────────────────

const colorsFields = `
  // -- SEO Enrichment (Part 37) --

  uniqueAngle: 'Colors occupy a singular pedagogical position because they are the only theme that teaches a perceptual skill children already possess naturally \u2014 every sighted child sees color from birth \u2014 and transforms it from passive sensation into an active analytical tool. No other theme in the collection builds on such a powerful pre-existing foundation: children arrive already able to perceive the content, and worksheets teach them to name it, classify it, measure it, and reason about it systematically. This progression from raw perception to structured analysis mirrors the scientific method itself, making color worksheets a natural gateway to scientific thinking even for the youngest learners. Colors are also uniquely positioned at the intersection of subjective experience and objective science. The same wavelength of light that physics measures precisely is also the favorite color that provokes passionate personal preference, making colors the only theme that naturally bridges STEM and humanities in every single activity. A color sorting worksheet is simultaneously a math classification exercise, a science observation task, and an aesthetic experience \u2014 three disciplines unified in a single page. The theme\\'s universality across cultures combined with striking cultural variation in color symbolism creates unique cross-cultural teaching opportunities: red means danger in Western traffic signals but luck in Chinese celebrations, white signifies purity in some traditions and mourning in others. This cultural dimension gives color worksheets a social studies depth that purely mathematical or scientific themes cannot match. Perhaps most powerfully, color is the most democratic entry point in education: it requires no prior academic knowledge, no reading ability, no mathematical foundation, and no cultural context to begin. A three-year-old who cannot count to five or write their name can sort objects by color with confidence, making color worksheets the ultimate equalizer in diverse classrooms.',

  researchCitation: 'Sandhofer, C.M. & Smith, L.B. (1999). "Learning Color Words Involves Learning a System of Mappings." Developmental Psychology, 35(3), 668\u2013679. This study demonstrated that color word learning is fundamentally different from object word learning because it requires building a systematic mapping between continuous perceptual categories and discrete linguistic labels \u2014 children must learn not just that red is a word but where red ends and orange begins. Structured sorting and matching activities that present colors in direct comparison significantly accelerated this mapping process compared to incidental color exposure, confirming that deliberate worksheet-based practice builds color vocabulary faster than everyday conversation alone.',

  snippetDefinition: 'Color worksheets for kids are printable educational activities featuring red, blue, yellow, green, orange, purple, and other colors \u2014 designed to build classification skills, data collection abilities, pattern recognition, and descriptive vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, picture sorting for classification thinking, chart-count-color activities for data graphing, find-and-count exercises for visual scanning, pattern worksheets for algebraic readiness, and matching activities that connect color names to visual perception.',

  snippetHowTo: [
    'Begin with hands-on color sorting using real objects \u2014 colored blocks, buttons, crayons, or fruit \u2014 before introducing any worksheet, so children establish physical, tactile associations between color categories and concrete items they can hold and group.',
    'Start worksheet practice with recognition and matching activities like coloring pages and matching worksheets, where children pair color swatches with objects of the same color to reinforce the connection between color names and visual perception.',
    'Progress to classification exercises using picture-sort worksheets that ask children to group objects by color, building the categorical thinking that underpins both scientific taxonomy and mathematical data organization.',
    'Introduce data collection through chart-count-color worksheets where children count objects of each color in a scene and create bar graphs \u2014 connecting color recognition to the math standards for organizing and interpreting data.',
    'Advance to pattern recognition using pattern-train and pattern-worksheet activities with color sequences like red, blue, red, blue, which develop the ability to identify repeating units and predict what comes next \u2014 the foundation of algebraic thinking.',
    'Pair worksheet practice with hands-on color mixing experiments using paint or food coloring, recording results on paper to connect the science of color to the classification skills practiced on worksheets.',
    'Extend learning by using find-and-count worksheets in detailed scenes where children scan for and tally specific colors, building the systematic visual attention and data recording skills that support research and scientific observation.',
  ],

  limitations: 'Color worksheets are inherently dependent on accurate color printing and screen calibration \u2014 a purple that prints as blue or a green that displays as teal undermines the precision that color learning requires. Children with color vision deficiency, affecting approximately 8 percent of boys and 0.5 percent of girls, may need significant accommodations including high-contrast alternatives and labeled color swatches. The theme\\'s strength in visual-perceptual and classification skills means it offers less direct support for number operations, phonics, decoding, or extended narrative writing than math-focused or literacy-focused themes.',

  themeComparisons: [
    {
      vsThemeId: 'shapes',
      summary: 'Colors worksheets focus on visual-perceptual properties \u2014 hue, value, warm versus cool \u2014 teaching children to analyze the surface appearance and sensory quality of objects. Shapes worksheets focus on geometric structural properties \u2014 sides, corners, angles, and symmetry \u2014 teaching children to analyze the underlying skeleton of objects. Colors train perceptual discrimination and aesthetic awareness; shapes train spatial reasoning and mathematical analysis. Both develop visual intelligence but through fundamentally different cognitive pathways.',
    },
    {
      vsThemeId: 'alphabet',
      summary: 'Colors worksheets build on concrete sensory experience that children already possess before any instruction \u2014 every sighted child sees color from birth. Alphabet worksheets introduce an entirely abstract symbol system that must be learned from scratch with no pre-existing perceptual foundation. Colors excel as a confidence-building entry point because children arrive already competent; alphabet worksheets require sustained instruction to build competence with arbitrary letter-sound correspondences.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Colors worksheets isolate a single perceptual attribute for focused analysis \u2014 classification, pattern recognition, and data collection using color as the organizing variable. Nature worksheets integrate multiple attributes in holistic environmental observation \u2014 seasons, weather, plants, and animals observed together. Colors provide concentrated practice in one cognitive skill; nature provides broader but less focused ecological awareness.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Colors worksheets study color as the primary subject of learning \u2014 classification by hue, data collection, pattern analysis, and color vocabulary development. Flower worksheets feature color as incidental decoration in a botanical context \u2014 flowers happen to be colorful, but the learning focus is on plant types, growth, and nature appreciation. Colors teach about color itself; flowers use color as background to teach about plants.',
    },
  ],

  productLinks: [
    {
      appId: 'picture-sort',
      anchorText: 'color sorting worksheets for kids',
      context: 'Classification thinking develops naturally when children use our color sorting worksheets for kids to group objects by hue \u2014 the same logical operation that underpins scientific taxonomy, mathematical data organization, and everyday decision-making \u2014 making color sorting the most accessible gateway to categorical reasoning.',
    },
    {
      appId: 'chart-count-color',
      anchorText: 'color graphing worksheets printable',
      context: 'Data collection and visual representation skills build simultaneously when children use our color graphing worksheets printable to count objects by color, record tallies, and create bar graphs \u2014 directly addressing measurement and data standards while making abstract statistics concrete through the familiar language of color.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'color counting worksheets',
      context: 'Visual attention and numerical fluency develop together when children work through our color counting worksheets, scanning detailed scenes to locate and tally objects of specific colors \u2014 building the systematic observation skills that support both mathematical accuracy and scientific data collection.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'color pattern worksheets for kids',
      context: 'Algebraic readiness begins with pattern recognition, and our color pattern worksheets for kids present engaging color sequences where children identify the repeating unit, predict what comes next, and create their own patterns \u2014 developing the analytical thinking that underpins variable reasoning and function concepts in later mathematics.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher needs to address the Common Core standard K.MD.B.3 requiring students to classify objects and count by category, but her students find generic sorting exercises with abstract blocks tedious and lose focus after three minutes.',
      solution: 'She redesigns the classification unit around color as the primary sorting attribute, using picture-sort worksheets where children group illustrated objects by color. She follows each sorting session with a chart-count-color worksheet where students count each color group and fill in a bar graph with corresponding colored squares. A classroom color scavenger hunt precedes each worksheet session, giving children real-world data to compare with their worksheet results.',
      outcome: 'Engagement during classification activities increases from three-minute average sessions to consistent twelve-minute sessions. On the end-of-unit assessment, 94 percent of students correctly classify and count objects by category, compared to 71 percent the previous year when generic sorting materials were used. Three students independently begin sorting classroom supplies by color during free time, demonstrating transfer of classification thinking to self-directed activity.',
    },
    {
      situation: 'A parent is concerned because her four-year-old consistently confuses green and blue, calling both colors blue, and wonders whether this indicates a color vision problem or just a developmental delay.',
      solution: 'The parent introduces a structured four-week color discrimination program using matching worksheets that pair green and blue swatches side by side with clear labels, picture-sort worksheets with only green and blue categories to provide concentrated practice, and find-and-count worksheets that ask the child to find all green items in a picture and then all blue items separately. She pairs each worksheet session with a real-world comparison: holding a green leaf next to a blue crayon and naming both colors slowly and clearly.',
      outcome: 'By week three, the child correctly distinguishes green from blue in eight of ten worksheet trials. By week four, the child spontaneously uses both color names correctly in everyday conversation without prompting. The parent\\'s pediatrician confirms normal color vision at the annual checkup, noting that green-blue confusion is developmentally typical until age four and a half and that the structured sorting practice likely accelerated the natural discrimination process.',
    },
    {
      situation: 'A first-grade teacher wants to introduce data collection and graphing but finds that her students treat graph-making as a mechanical fill-in task rather than a meaningful way to answer questions about the world.',
      solution: 'She creates a week-long color data investigation where students collect real color data from different sources each day: Monday they count colors of cars in the parking lot, Tuesday they tally colors of shirts in the classroom, Wednesday they survey favorite colors of students in two classes. Each day\\'s data is recorded on chart-count-color worksheets and compiled into comparative bar graphs. Find-and-count worksheets provide additional scanning practice, and pattern-train worksheets help students look for trends in their accumulated data.',
      outcome: 'Students begin asking their own data questions by Wednesday, proposing surveys the teacher had not planned. The comparative graphs generate genuine mathematical discussion about why parking lot colors are mostly black and white while shirt colors are more varied. On the unit assessment, 88 percent of students can independently create and interpret a three-category bar graph, compared to 63 percent the previous year, and four students begin maintaining personal data journals tracking color observations during recess.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Color-blind students',
      adaptation: 'For students with color vision deficiency, provide worksheets with high-contrast color combinations that remain distinguishable (blue versus yellow, red versus blue) and avoid problematic pairs (red versus green, orange versus green). Add text labels or pattern fills alongside color swatches so students can identify categories through multiple channels. Focus these students on the classification and data skills rather than precise color identification \u2014 the cognitive processes of sorting and graphing are the real learning targets, and colors are the accessible medium.',
    },
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, picture-sort, and chart-count-color worksheets that leverage strong visual processing. Create a classroom color reference wall with labeled swatches arranged in color wheel order so students can reference precise color names during matching and sorting tasks. Use color-coded organizational systems throughout the classroom so these learners constantly practice color discrimination in functional contexts.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-attribute sorting tasks where colors must be classified by multiple properties simultaneously \u2014 warm versus cool AND primary versus secondary. Introduce color theory vocabulary like complementary, analogous, tint, shade, and hue earlier than grade-level expectations. After completing chart-count-color worksheets, ask them to write analytical paragraphs comparing two data sets and explaining why color distributions differ between contexts.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring and picture-sort before introducing word-based activities. Basic color names (red, blue, green) are among the first English words many ELL students learn, making color worksheets an ideal confidence-building entry point. Provide a bilingual color chart with swatches and labels in both languages, and use physical colored objects as tangible vocabulary anchors that children can hold and name while building English color vocabulary.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Light & Optics)',
      connection: 'Color is fundamentally a phenomenon of light physics. White light contains all visible wavelengths, prisms separate these wavelengths into the visible spectrum, and objects appear colored because they absorb some wavelengths and reflect others. Even preschoolers can observe that mixing red and yellow paint produces orange, laying experiential groundwork for the wave theory of light they will study in later grades. Color mixing experiments connect directly to chemistry and physics standards.',
      activity: 'After completing a color matching worksheet, set up a simple prism experiment where students observe white light splitting into a rainbow spectrum. Have them record the colors they see in order and compare this natural spectrum to the color wheel they use for sorting worksheets, then write one sentence about what surprised them \u2014 connecting hands-on science observation to color classification skills.',
    },
    {
      subject: 'Art (Color Theory & Composition)',
      connection: 'Color theory is the formal language of visual art. Understanding primary, secondary, and tertiary colors, warm and cool groupings, complementary and analogous relationships, and the effects of tint and shade gives children a framework for making deliberate creative choices rather than random color selections. Every professional artist, graphic designer, and filmmaker uses color theory principles that begin with the same sorting and classification skills practiced on elementary worksheets.',
      activity: 'After completing a picture-sort worksheet classifying colors as warm or cool, have students create a split composition where one half uses only warm colors and the other half uses only cool colors. Display the artworks and discuss as a class how the warm side feels energetic while the cool side feels calm, building both color theory vocabulary and aesthetic awareness.',
    },
    {
      subject: 'Social Studies (Cultural Color Symbolism)',
      connection: 'Colors carry different symbolic meanings across cultures, providing a natural entry point for cross-cultural understanding. Red symbolizes luck in Chinese culture but danger in Western traffic signals. White represents purity in Western weddings but mourning in some Eastern traditions. These variations teach children that cultural context shapes meaning, a foundational social studies concept that builds empathy and global awareness.',
      activity: 'After completing a color word search worksheet, give students a simple chart showing what three colors (red, white, black) symbolize in three different cultures. Have them draw a scene using one color and write two sentences explaining what that color means in two different cultural traditions, building both color vocabulary and cultural awareness.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Color naming speed assessment',
      criteria: 'Present students with a grid of twenty color swatches in random order and time how quickly and accurately they can name each color. Compare results at the beginning and end of a color unit to measure growth in both speed and accuracy of color vocabulary. For advanced students, include nuanced shades like teal, maroon, navy, and crimson to assess expanded vocabulary development.',
      gradeLevel: 'Pre-K to 1st',
    },
    {
      method: 'Data collection and graphing rubric',
      criteria: 'Assess students\\' chart-count-color worksheet results using a three-level rubric: emerging (counts some categories accurately but graph is incomplete), proficient (counts all categories accurately and creates a correctly labeled bar graph), and advanced (counts accurately, creates a scaled graph, and writes a comparison sentence interpreting the data). This rubric directly measures the data and measurement standards addressed by color worksheets.',
      gradeLevel: 'K to 3rd',
    },
    {
      method: 'Creative color portfolio',
      criteria: 'Collect one color-themed artwork or coloring page per week over a unit. Assess growth in fine motor control (staying within boundaries, consistent color application), color vocabulary usage in written or oral descriptions, deliberate color choice making (can the student explain why they chose specific colors), and complexity of color relationships used (primary only versus mixing tints and shades).',
      gradeLevel: 'All grades',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Colors featured', value: 'Primary, secondary, warm, cool & more' },
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

console.log('Part 37: Enriching shapes & colors theme hub pages...\n');

console.log('1. Injecting 12 fields into shapes/en.ts...');
injectFields(path.join(base, 'shapes', 'en.ts'), shapesFields);

console.log('2. Injecting 12 fields into colors/en.ts...');
injectFields(path.join(base, 'colors', 'en.ts'), colorsFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
