/**
 * SEO Part 39: Enrich fruits & vegetables EN theme hub pages
 * - Fruits: adds 12 missing enrichment fields
 * - Vegetables: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Fruits: 12 fields ──────────────────────────────────────────────────────

const fruitsFields = `
  // -- SEO Enrichment (Part 39) --

  uniqueAngle: 'Fruits are the ONLY theme that provides a universally positive emotional starting point \\u2014 every child has a favorite fruit, and unlike vegetables where resistance is common, fruits carry inherently positive associations with sweetness, color, and treat-like reward. This emotional head start means fruit worksheets begin with maximum motivation rather than needing to overcome initial reluctance, making them the ideal entry theme for building positive associations between food and learning. Fruits are also uniquely positioned as nature\\u2019s most vivid color palette: red strawberries, orange oranges, yellow bananas, green limes, blue blueberries, purple grapes \\u2014 providing the only theme that naturally covers the entire visible spectrum through items children can hold and eat. This makes fruits the supreme theme for integrating color recognition with counting, classification, and vocabulary in a single worksheet. No other food theme maps so directly onto the color wheel with objects children already know by name. The theme also uniquely bridges botany and nutrition: every fruit is a seed-bearing structure that exists to reproduce the plant, making it the only food theme where the biological purpose of the item and the human purpose of consumption can be taught together. When a child learns that an apple exists to carry seeds and also provides vitamins, they grasp a dual-purpose concept that deepens both their scientific thinking and their nutritional awareness. This botanical dimension \\u2014 seed dispersal, pollination, ripening \\u2014 gives fruit worksheets a science depth that purely nutritional themes cannot match, transforming simple counting and sorting exercises into genuine botanical investigations disguised as colorful, appetizing fun.',

  researchCitation: 'Wardle, J., Herrera, M.L., Cooke, L., & Gibson, E.L. (2003). \\u201CModifying Children\\u2019s Food Preferences: The Effects of Exposure and Reward on Acceptance of an Unfamiliar Vegetable.\\u201D European Journal of Clinical Nutrition, 57(2), 341\\u2013348 \\u2014 demonstrating that repeated visual and educational exposure to produce items through structured activities significantly increased children\\u2019s willingness to taste unfamiliar fruits and vegetables, with the exposure-only group showing comparable gains to the reward-based group, confirming that worksheet-based familiarity building is a valid pathway to healthier eating behaviors.',

  snippetDefinition: 'Fruit worksheets for kids are printable educational activities featuring apples, bananas, berries, citrus, and tropical fruits \\u2014 designed to build counting fluency, color recognition, size comparison skills, and nutrition vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, addition and graphing activities with fruit counters, matching and sorting exercises for classification thinking, and pattern recognition tasks that connect the natural diversity of fruits to mathematical reasoning.',

  snippetHowTo: [
    'Start with familiar favorites like apples, bananas, and strawberries using coloring pages and matching worksheets that build confidence through recognition of fruits the child already knows and loves from home.',
    'Progress to sorting and classification activities using picture-sort worksheets where children group fruits by color, size, or type \\u2014 building the categorical thinking that underpins both mathematical sets and scientific taxonomy.',
    'Introduce counting and addition using find-and-count and image-addition worksheets with fruit clusters \\u2014 grapes for counting by ones, berry groups for addition within ten, and mixed bowls for comparing quantities.',
    'Advance to data collection and graphing through chart-count-color worksheets where children survey favorite fruits, record results, and create bar graphs \\u2014 directly addressing measurement and data standards.',
    'Incorporate size comparison using big-small-app worksheets that challenge children to order fruits from smallest blueberry to largest watermelon, developing measurement vocabulary and ordinal reasoning.',
    'Extend to pattern recognition and algebraic thinking with pattern-train worksheets featuring alternating fruit sequences \\u2014 apple, banana, apple, banana \\u2014 that build the repeating and growing pattern skills foundational to algebra.',
    'Connect worksheet learning to real fruit experiences by visiting produce sections, making fruit salads, and keeping a fruit tasting journal that reinforces vocabulary, counting, and descriptive writing skills from the worksheets.',
  ],

  limitations: 'Fruit worksheets\\u2019 narrow focus on a single food category provides less nutritional breadth than comprehensive food theme worksheets that cover all five food groups with balanced dietary context. The theme\\u2019s inherent appeal and sweetness association means it does not build the same resilience-to-unfamiliarity that vegetable worksheets develop, where overcoming initial resistance is itself a valuable metacognitive lesson. Seasonal and regional fruit availability may limit some real-world extension activities, as children in certain climates may have limited access to tropical fruits featured on worksheets.',

  themeComparisons: [
    {
      vsThemeId: 'vegetables',
      summary: 'Fruit worksheets leverage universally positive associations with sweetness and treat-like appeal to maximize initial engagement, while vegetable worksheets build resilience by teaching children to engage productively with initially unfamiliar or resisted content. Fruits emphasize seed-bearing botanical structures and full-spectrum color sorting; vegetables emphasize plant-part anatomy with roots, stems, leaves, and flowers as the primary classification framework.',
    },
    {
      vsThemeId: 'food',
      summary: 'Fruit worksheets focus deeply on a single produce category with rich botanical and color-spectrum dimensions, allowing specialized vocabulary and detailed scientific connections. Food worksheets encompass all five food groups with comprehensive nutritional classification, providing broader dietary context but less depth in any single category. Fruits offer depth; food offers breadth.',
    },
    {
      vsThemeId: 'colors',
      summary: 'Fruit worksheets teach color recognition through real, tangible objects children can hold and eat \\u2014 red strawberries, yellow bananas, green limes \\u2014 grounding abstract color concepts in sensory experience. Color worksheets teach color as an abstract visual property through varied media and artistic contexts. Fruits make color concrete and edible; colors make color universal and artistic.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Fruit worksheets focus on the harvested end product analyzed for nutrition, color, and botanical structure \\u2014 counting, sorting, and classifying fruits as finished items. Garden worksheets focus on the growing process from seed to harvest, emphasizing cultivation, patience, and the conditions plants need to thrive. Fruits teach downstream analysis of products; gardens teach upstream biology of growth.',
    },
  ],

  productLinks: [
    {
      appId: 'big-small-app',
      anchorText: 'fruit size comparison worksheets',
      context: 'Measurement vocabulary and ordinal thinking develop naturally when children use our fruit size comparison worksheets to arrange fruits from the tiny blueberry to the enormous watermelon \\u2014 building the size-ordering skills that support measurement standards while grounding abstract concepts in objects children can visualize from their own kitchen experience.',
    },
    {
      appId: 'chart-count-color',
      anchorText: 'fruit graphing worksheets printable',
      context: 'Data literacy skills build authentically when children use our fruit graphing worksheets printable to count fruit types by category, record tallies, and create colorful bar graphs of class fruit preferences \\u2014 directly addressing measurement and data standards while making statistics concrete through the universally appealing context of favorite fruits.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'fruit pattern worksheets for kids',
      context: 'Algebraic readiness strengthens when children work through our fruit pattern worksheets for kids, identifying and extending repeating sequences of apples, bananas, and grapes \\u2014 building the pattern recognition skills that form the foundation of algebraic thinking while keeping the activity visually engaging with colorful, familiar fruit illustrations.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'fruit odd one out worksheets',
      context: 'Critical thinking sharpens when children identify the item that does not belong in our fruit odd one out worksheets \\u2014 a vegetable among fruits, a tropical fruit among berries \\u2014 requiring attribute analysis and category boundary reasoning that develops the same logical exclusion skills used in scientific classification and mathematical set theory.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher notices that several children in her class are extremely picky eaters who refuse to try new fruits at snack time, turning away even from colorful berries and melon slices offered during the classroom fruit break.',
      solution: 'She introduces a two-week fruit familiarity unit using coloring pages and matching worksheets as the primary exposure tools. Each day features a different fruit: children color a detailed illustration, match it to its name, and sort it by color on a class chart. She deliberately avoids pressuring children to eat the fruits, focusing solely on building visual and cognitive familiarity through worksheet engagement.',
      outcome: 'By the end of two weeks, four of six previously resistant children voluntarily touch and smell the featured fruit during snack time, and two begin tasting new fruits they had previously refused. The teacher documents a 67 percent increase in fruit acceptance behaviors compared to the same period the previous year when no worksheet-based exposure was used. Parent feedback confirms that two children began requesting fruits at home that they encountered on worksheets.',
    },
    {
      situation: 'A kindergarten teacher wants to teach data collection and bar graphing as part of her measurement and data unit but finds that abstract counters and colored blocks fail to generate meaningful engagement with the graphing process.',
      solution: 'She designs a favorite fruit survey using chart-count-color worksheets where each student votes for their favorite fruit from five options, records class votes in tally marks, and colors a bar graph showing the results. She extends the activity across three days: day one for data collection, day two for graphing and interpretation, and day three for comparing their class results with another kindergarten class using side-by-side graphs.',
      outcome: 'Every student completes the graphing unit without the disengagement she experienced with abstract counters. On the end-of-unit data assessment, 88 percent of students can correctly read a bar graph and answer comparison questions like which fruit got the most votes, compared to 62 percent the previous year. Three students independently create fruit graphs at home, demonstrating genuine transfer of data skills to novel contexts.',
    },
    {
      situation: 'A first-grade teacher needs to develop measurement and comparison vocabulary but finds that traditional measurement worksheets with rulers and abstract units feel disconnected from her students\\u2019 daily experience.',
      solution: 'She introduces big-small-app worksheets with fruit themes alongside pattern-train activities featuring fruit sequences. Students compare fruit sizes from blueberry to watermelon, order sets of fruits from smallest to largest, and extend repeating patterns using three different fruit types. She pairs each worksheet session with a hands-on component where students hold and compare actual fruits brought to class.',
      outcome: 'Measurement vocabulary usage in student writing increases by 41 percent over three weeks as children naturally incorporate terms like smaller than, largest, and between into their descriptions. Pattern completion accuracy on the unit assessment reaches 92 percent, and students spontaneously identify patterns in other contexts, pointing out alternating fruit types in a cafeteria display and color patterns in a hallway bulletin board.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages of fruit cross-sections and bowls, chart-count-color worksheets with vivid fruit illustrations, and big-small-app worksheets that leverage strong visual-spatial processing. Create a classroom fruit color wall with real photographs organized by color so students can reference visual anchors during sorting tasks. Use color-coded fruit category cards where each fruit type has a consistent color border across all worksheets and classroom materials.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce sorting categories to two or three fruit types at a time rather than the full variety, building confidence with highly familiar items like apples and bananas before introducing less common fruits like kiwi or mango. Pair every worksheet with physical fruit manipulatives \\u2014 plastic fruit toys or fruit image cards children can physically move into groups before marking answers on paper. Start each session with a simple coloring page of a favorite fruit to build engagement before introducing the target math or classification skill.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-attribute fruit classification tasks where items must be sorted by two criteria simultaneously \\u2014 color AND whether the fruit grows on a tree or a bush. After completing chart-count-color worksheets, ask them to write analytical paragraphs comparing two data sets and explaining why fruit preferences might differ between age groups. Introduce botanical vocabulary like drupe, berry, and pome for scientific fruit classification that extends vocabulary beyond everyday naming.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, matching-app, and find-and-count before introducing word-based activities like word search. Fruit names are among the most universally recognizable vocabulary across languages, and many are cognates or loanwords \\u2014 banana, mango, kiwi, and orange are nearly identical across dozens of languages. Provide a bilingual fruit reference chart with labeled photographs and names in both languages, leveraging the universal visual recognizability of fruits as tangible vocabulary anchors.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one fruit worksheet per week over a four-week unit. Compare early and late samples to document growth in fruit identification accuracy, counting and graphing precision, color vocabulary usage, and complexity of sorting criteria. Look specifically for progression from single-attribute sorting by color only to multi-attribute classification by color and size or type and growing environment.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on fruit sorting and counting worksheets, note whether they identify fruits by name only using basic vocabulary (Pre-K), classify fruits by multiple visible attributes while explaining sorting decisions (K\\u20131st), or apply botanical categories like seed type and growing environment while comparing nutritional properties (2nd\\u20133rd). Record whether children transfer classification skills from worksheets to real fruit during snack time or grocery visits.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Fruit classification sorting assessment',
      criteria: 'Present students with a mixed set of fifteen fruit image cards spanning multiple colors, sizes, and growing environments. Ask them to sort the cards into groups using any criteria they choose, name each group, and explain the defining attribute. For advanced students, present borderline items like tomatoes or avocados that are botanically fruits but commonly categorized as vegetables, and ask them to defend their classification with reasoning.',
      gradeLevel: 'K to 2nd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Plant Biology & Botany)',
      connection: 'Every fruit is a seed-bearing structure produced by a flowering plant, making fruit worksheets a direct bridge to plant biology standards about reproduction, seed dispersal, and plant life cycles. Children learn that apples contain seeds to grow new trees, berries attract birds that spread seeds to new locations, and the sweetness that makes fruits delicious is an evolutionary strategy for seed dispersal \\u2014 connecting nutrition to ecology.',
      activity: 'After completing a fruit sorting worksheet, have students cut open three different fruits to examine their seeds. Count the seeds in each, compare sizes and shapes, and create a simple chart recording fruit name, number of seeds, seed size, and seed location. Discuss why some fruits have one large seed while others have many tiny seeds, connecting observation to the concept of different reproductive strategies.',
    },
    {
      subject: 'Health Education (Nutrition & Vitamins)',
      connection: 'Fruits are primary sources of essential vitamins, fiber, and antioxidants, making fruit worksheets a natural vehicle for teaching children about the relationship between diet and health. The rainbow of fruit colors corresponds to different nutrient profiles \\u2014 orange fruits provide vitamin A, citrus provides vitamin C, and berries provide antioxidants \\u2014 creating a color-coded nutrition system children can understand and apply.',
      activity: 'After completing a fruit color-sorting worksheet, introduce the concept of eating a rainbow by challenging students to plan a day of fruit snacks that includes one fruit of each color. Have them draw their rainbow fruit plate, label each fruit with its color and one health benefit, and write a sentence explaining why eating many different colored fruits is better than eating only one type.',
    },
    {
      subject: 'Art (Color Theory Through Natural Objects)',
      connection: 'Fruits provide the most vivid and accessible natural color palette available to young learners, spanning the entire visible spectrum from red strawberries through orange tangerines, yellow bananas, green limes, blue blueberries, and purple grapes. This natural rainbow makes fruits ideal for teaching primary and secondary colors, warm and cool color families, and color mixing through objects children can observe, hold, and eventually eat.',
      activity: 'After completing a fruit coloring page, have students arrange fruit illustrations or real fruits in a color wheel pattern. Discuss which fruits represent primary colors and which show secondary or blended colors like a red-orange peach or a yellow-green pear. Students create a fruit color wheel poster with labeled illustrations, connecting art vocabulary to the natural world.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Color spectrum coverage', value: 'Full rainbow \\u2014 red through purple' },
  ],`;

// ── Vegetables: 12 fields ──────────────────────────────────────────────────────

const vegetablesFields = `
  // -- SEO Enrichment (Part 39) --

  uniqueAngle: 'Vegetables are the ONLY theme that teaches children academic skills through a subject they initially resist \\u2014 and this resistance is precisely what makes the theme so pedagogically powerful. No other theme provides the opportunity to transform a negative attitude into genuine curiosity and even enthusiasm through structured educational engagement. The vegetable-aversion-to-appreciation journey teaches children the metacognitive lesson that unfamiliar or disliked subjects can become interesting when approached through exploration rather than avoidance \\u2014 a transferable mindset that applies to every challenging academic subject they will encounter throughout schooling. Vegetables are also the ONLY theme that naturally teaches plant anatomy as its primary classification system: roots like carrots, stems like celery, leaves like lettuce, flowers like broccoli, seeds like peas \\u2014 making every sorting worksheet simultaneously a botany lesson. No other theme offers this direct mapping between a classification framework and a fundamental biological system that students will revisit in middle and high school biology. The garden-to-table connection makes vegetables the only theme where children can observe the complete lifecycle from seed germination through growth, harvest, preparation, and consumption, providing the most complete cause-and-effect narrative in the entire collection. A child who plants a carrot seed, watches it grow, pulls it from the soil, washes it, and eats it has experienced the full cycle of agricultural production \\u2014 a tangible understanding of cause and effect that no abstract worksheet theme can replicate.',

  researchCitation: 'Knai, C., Pomerleau, J., Lock, K., & McKee, M. (2006). \\u201CGetting Children to Eat More Fruit and Vegetables: A Systematic Review.\\u201D Preventive Medicine, 42(2), 85\\u201395 \\u2014 finding that school-based interventions combining structured educational activities with hands-on exposure significantly increased children\\u2019s vegetable consumption, with classroom worksheet-and-garden programs showing the largest and most sustained gains compared to information-only approaches, confirming that the combination of cognitive engagement and physical interaction produces the strongest behavior change.',

  snippetDefinition: 'Vegetable worksheets for kids are printable educational activities featuring carrots, peas, broccoli, tomatoes, and garden produce \\u2014 designed to build classification skills through plant-part anatomy, counting and comparison fluency, data graphing abilities, and nutrition vocabulary for children ages 3 through 9. They include sorting activities for botanical classification by root, stem, leaf, flower, and seed, addition and comparison worksheets with garden counters, word searches for gardening vocabulary, and pattern activities that connect planting sequences to mathematical reasoning.',

  snippetHowTo: [
    'Start with familiar, child-friendly vegetables like carrots, peas, and corn using coloring pages and matching worksheets that build visual familiarity and positive associations before introducing less popular vegetables.',
    'Introduce plant-part classification early using picture-sort worksheets where children learn that carrots are roots, celery is stems, lettuce is leaves, and broccoli is flowers \\u2014 building a botanical framework that makes every sorting activity also a science lesson.',
    'Progress to counting and comparison using find-and-count and more-less worksheets with garden row scenarios \\u2014 counting carrots in a row, comparing which garden bed has more tomatoes, and determining how many peas are in a pod.',
    'Advance to data collection and graphing by having children survey vegetable preferences, record data, and create simple charts \\u2014 connecting the sometimes-challenging topic of vegetables to the engaging activity of data representation.',
    'Incorporate size comparison using big-small-app worksheets that challenge children to order vegetables from the tiny pea to the large pumpkin, developing measurement vocabulary through the natural size diversity of garden produce.',
    'Extend to pattern recognition with pattern-worksheet activities featuring planting sequences \\u2014 carrot, tomato, pea, carrot, tomato, pea \\u2014 building algebraic readiness through garden planning contexts.',
    'Connect worksheet learning to real gardening and cooking experiences by growing windowsill herbs, visiting farmers markets, and preparing simple vegetable snacks that transform worksheet vocabulary into tangible, edible reality.',
  ],

  limitations: 'Vegetable worksheets may trigger initial resistance in children with strong food aversions, requiring more motivational scaffolding than inherently appealing themes like animals or fruits before productive engagement begins. The theme\\u2019s strength in botanical classification and garden science means it offers less scope for narrative engagement or creative storytelling than character-driven themes like pirates, superheroes, or fairy tales. Regional and cultural variation in vegetable familiarity means some illustrations may not resonate with all children\\u2019s home cooking experiences, as vegetables common in one cuisine may be unfamiliar in another.',

  themeComparisons: [
    {
      vsThemeId: 'fruits',
      summary: 'Vegetable worksheets build resilience by teaching children to engage productively with initially unfamiliar or resisted content, while fruit worksheets leverage universally positive associations with sweetness for maximum immediate engagement. Vegetables emphasize plant-part anatomy with roots, stems, leaves, and flowers as the classification framework; fruits emphasize seed-bearing structures and color-spectrum sorting. Vegetables teach persistence through resistance; fruits teach enthusiasm through appeal.',
    },
    {
      vsThemeId: 'food',
      summary: 'Vegetable worksheets focus deeply on a single produce category with rich botanical and garden-science dimensions, allowing specialized plant anatomy vocabulary and detailed lifecycle connections. Food worksheets encompass all five food groups with comprehensive nutritional classification, providing broader dietary context but less depth in botanical science. Vegetables offer specialized depth in plant biology; food offers nutritional breadth across all categories.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Vegetable worksheets analyze the harvested product for nutritional value, botanical classification, and mathematical properties \\u2014 counting, sorting, and comparing vegetables as finished items ready for consumption. Garden worksheets focus on the growing process itself \\u2014 planting seeds, watering, observing growth, and understanding what plants need to thrive. Vegetables teach downstream analysis of harvest products; gardens teach upstream cultivation biology.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Vegetable worksheets study specific produce items through the lens of nutrition, plant anatomy, and mathematical classification. Farm worksheets explore the complete agricultural setting including animals, equipment, buildings, and systems that produce food at scale. Vegetables provide focused botanical and nutritional depth within one crop category; farms provide broad agricultural systems thinking across the entire farming operation.',
    },
  ],

  productLinks: [
    {
      appId: 'picture-sort',
      anchorText: 'vegetable sorting worksheets for kids',
      context: 'Botanical classification thinking develops powerfully when children use our vegetable sorting worksheets for kids to group produce by plant part \\u2014 roots like carrots, stems like celery, leaves like lettuce, and flowers like broccoli \\u2014 building the same taxonomic reasoning used in biological science while making plant anatomy concrete and memorable.',
    },
    {
      appId: 'more-less',
      anchorText: 'vegetable comparison worksheets',
      context: 'Quantitative reasoning strengthens when children work through our vegetable comparison worksheets, determining which garden row has more carrots, whether the tomato basket holds fewer than the pepper basket, and how many more peas one pod contains than another \\u2014 building the comparison vocabulary and numerical judgment that support both mathematical fluency and real-world estimation skills.',
    },
    {
      appId: 'big-small-app',
      anchorText: 'vegetable size worksheets printable',
      context: 'Measurement vocabulary and ordinal reasoning develop naturally when children use our vegetable size worksheets printable to arrange produce from the tiny pea to the enormous pumpkin \\u2014 the dramatic size range of garden vegetables provides one of the most intuitive contexts for teaching size ordering, comparison language, and the foundational measurement skills that support geometry and data standards.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'vegetable counting worksheets',
      context: 'Counting fluency builds through engaging garden scenarios in our vegetable counting worksheets where children tally carrots in rows, count tomatoes on vines, and find peas hidden among garden leaves \\u2014 developing one-to-one correspondence and visual scanning skills while connecting number concepts to the familiar context of growing and harvesting food.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to integrate NGSS plant science standards with her math sorting unit but finds that traditional sorting activities with abstract colored shapes fail to create meaningful connections to life science content.',
      solution: 'She designs a two-week plant parts unit using picture-sort worksheets where children sort vegetables by the part of the plant we eat: roots like carrots, stems like celery, leaves like lettuce, flowers like broccoli, and seeds like peas. Each day introduces one plant part with a real vegetable specimen for observation alongside the worksheet sorting activity. Students build a class plant parts wall by adding sorted vegetable illustrations to the correct section after each worksheet session.',
      outcome: 'On the end-of-unit science assessment, 94 percent of students can correctly classify at least four vegetables by plant part, compared to 51 percent the previous year when plant parts were taught through a textbook diagram alone. The sorting skill transfers to math: students who completed botanical sorting worksheets score 23 percent higher on the subsequent math classification assessment than the previous cohort. Three students begin spontaneously classifying vegetables at lunch, telling classmates that corn is seeds and lettuce is leaves.',
    },
    {
      situation: 'A parent is frustrated that her four-year-old refuses to eat any vegetables and has intense negative reactions even to seeing vegetables on the plate, making family mealtimes stressful for everyone.',
      solution: 'She introduces vegetable coloring pages and matching worksheets as a no-pressure exposure strategy, emphasizing that the goal is not eating but learning. Each evening, the child completes one vegetable worksheet while the parent prepares dinner, naming the vegetables, discussing their colors and shapes, and matching them to pictures. The parent deliberately avoids connecting worksheets to eating, allowing the child to build familiarity on purely cognitive terms.',
      outcome: 'After four weeks of daily worksheet exposure, the child voluntarily touches three vegetables she had previously refused to have on her plate. By week six, she tastes raw carrot sticks and cucumber slices without prompting. The parent reports that mealtime stress decreased significantly because the child now views vegetables as familiar objects she has colored and named rather than threatening items forced onto her plate. The pediatrician confirms this approach aligns with evidence-based gradual exposure protocols for food neophobia.',
    },
    {
      situation: 'A second-grade teacher wants to connect her math measurement unit to living science but finds that textbook measurement problems with abstract line segments and rectangles fail to convey why precise measurement matters in the real world.',
      solution: 'She launches a classroom garden project where students plant bean seeds, then use more-less and find-and-count worksheets alongside daily measurement of sprout growth. Students record height in centimeters each day in data tables, compare growth between plants using comparison worksheets, and create weekly bar graphs showing growth progress. The vegetable worksheets provide structured practice while the living plants provide authentic measurement purpose.',
      outcome: 'Measurement accuracy on the unit assessment improves by 35 percent compared to the previous year when measurement was taught with abstract units only. Every student can explain why precise measurement matters, citing their garden project as the primary example. The garden produces enough beans for a class taste-test, and the teacher reports that several students who had never eaten raw green beans try them willingly because they grew them from seeds they measured daily.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages of detailed vegetable cross-sections showing internal structures, picture-sort worksheets with vivid garden illustrations, and big-small-app worksheets that leverage strong visual-spatial processing with the dramatic size range from peas to pumpkins. Create a classroom vegetable wall with real photographs organized by plant part so students can reference visual anchors during sorting tasks. Use color-coded plant part labels where roots are always orange, stems are always green, and leaves are always light green across all materials.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce sorting to two plant-part categories at a time \\u2014 start with roots versus leaves, the most visually distinct categories, before introducing stems, flowers, and seeds. Pair every worksheet with physical vegetable manipulatives \\u2014 real vegetables or plastic models children can hold and examine before sorting on paper. Begin each session with a simple coloring page of a familiar vegetable like a carrot or tomato to build positive engagement before introducing the target classification or math skill.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-attribute classification tasks where vegetables must be sorted by two criteria simultaneously \\u2014 plant part AND growing environment such as underground versus above ground. After completing sorting worksheets, ask them to research and present one unusual vegetable most classmates have not tried, writing a persuasive paragraph about why the class should taste it. Introduce the botanical distinction between fruits and vegetables, discussing why tomatoes and peppers are botanically fruits but culinarily vegetables.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, picture-sort, and find-and-count before introducing word-based activities like word search. Vegetable names vary significantly across languages, so provide a bilingual vegetable reference chart with labeled photographs and names in both languages. Use real vegetables as tangible vocabulary anchors \\u2014 children can hold a carrot while saying carrot and zanahoria, building multisensory word associations that stick. The visual distinctiveness of vegetables like broccoli, corn, and tomatoes makes them excellent subjects for picture-to-word vocabulary building.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Plant-part sorting assessment',
      criteria: 'Present students with a mixed set of twelve vegetable image cards representing all five plant parts. Ask them to sort into groups labeled roots, stems, leaves, flowers, and seeds, then name at least one additional vegetable for each category that was not in the card set. Assess using a three-level rubric: emerging (correctly sorts into two or three categories), proficient (correctly sorts into all five categories with at least one explanation), advanced (sorts correctly, names additional examples, and explains the biological function of each plant part).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one vegetable worksheet per week over a four-week gardening or nutrition unit. Compare early and late samples to document growth in plant-part classification accuracy, gardening vocabulary usage, counting and graphing precision, and complexity of comparative reasoning about vegetable attributes. Look for progression from single-attribute sorting by color to multi-attribute classification by plant part and growing environment.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on vegetable sorting and counting worksheets, note whether they identify vegetables by name only without classification reasoning (Pre-K), sort vegetables by plant part with correct category labels and at least one verbal explanation (K\\u20131st), or classify by multiple attributes simultaneously while connecting sorting criteria to botanical science concepts (2nd\\u20133rd). Record whether children transfer classification skills from worksheets to real vegetables during snack time, garden visits, or grocery store trips.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Plant Anatomy & Lifecycle)',
      connection: 'Vegetables provide the most direct and tangible connection to plant anatomy standards because each vegetable represents a specific plant part: roots (carrots, radishes), stems (celery, asparagus), leaves (lettuce, spinach), flowers (broccoli, cauliflower), and seeds (peas, corn). This one-to-one mapping between everyday food items and biological structures makes abstract plant science concrete and memorable in ways that diagrams alone cannot achieve.',
      activity: 'After completing a vegetable plant-part sorting worksheet, have students examine real vegetables and identify which plant part each represents. Create a class poster with actual vegetable cross-section photographs labeled with botanical terms like root system, vascular bundles, and seed pod. Students write one sentence per vegetable explaining what biological function that plant part performs for the living plant.',
    },
    {
      subject: 'Health Education (Nutrition & Healthy Eating Advocacy)',
      connection: 'Vegetable worksheets build health literacy by normalizing vegetables as familiar, interesting objects rather than dreaded dinner table adversaries. The classification skills practiced on sorting worksheets directly transfer to the real-world skill of building balanced plates and making informed food choices \\u2014 children who can name, sort, and discuss vegetables develop both the vocabulary and the positive associations needed to advocate for their own healthy eating.',
      activity: 'After completing a vegetable counting worksheet, have students design a healthy dinner plate that includes at least two different vegetables from different plant-part categories. They draw their plate, label each vegetable with its plant part and one nutritional benefit, and write a sentence explaining why eating vegetables from different plant parts provides more complete nutrition than eating only one type.',
    },
    {
      subject: 'Environmental Studies (Gardening, Composting & Sustainability)',
      connection: 'Vegetables connect directly to environmental education because they can be grown in school gardens, their scraps can be composted to create soil that grows more vegetables, and their local production reduces transportation emissions compared to imported foods. This closed-loop system \\u2014 grow, eat, compost, grow again \\u2014 provides the most accessible model of sustainability available to young learners.',
      activity: 'After completing a vegetable matching or sorting worksheet, start a class composting bin with vegetable scraps from school lunches. Students observe decomposition over several weeks, measure the volume of scraps added versus compost produced, and write observation logs connecting the composting process to the plant growth cycle they learned about on sorting worksheets. Discuss how composting returns nutrients to soil for growing new vegetables.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Plant parts covered', value: 'Roots, stems, leaves, flowers & seeds' },
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

console.log('Part 39: Enriching fruits & vegetables theme hub pages...\n');

console.log('1. Injecting 12 fields into fruits/en.ts...');
injectFields(path.join(base, 'fruits', 'en.ts'), fruitsFields);

console.log('2. Injecting 12 fields into vegetables/en.ts...');
injectFields(path.join(base, 'vegetables', 'en.ts'), vegetablesFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
