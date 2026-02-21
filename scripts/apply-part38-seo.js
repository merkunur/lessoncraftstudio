/**
 * SEO Part 38: Enrich food & cooking EN theme hub pages
 * - Food: adds 12 missing enrichment fields
 * - Cooking: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Food: 12 fields ──────────────────────────────────────────────────────

const foodFields = `
  // -- SEO Enrichment (Part 38) --

  uniqueAngle: 'Food is the ONLY theme in the collection that connects academic learning to a universal biological necessity every child experiences multiple times daily \u2014 hunger, eating, and mealtime are the most frequent recurring events in any child\\'s life. No other theme offers this density of real-world touchpoints: a child encounters food concepts at breakfast, snack time, lunch, and dinner, meaning food worksheets have four daily reinforcement opportunities that no other theme \u2014 animals, space, shapes \u2014 can match. This frequency of natural repetition is pedagogically invaluable because spaced repetition is the single most effective memory consolidation strategy, and food delivers it automatically without any instructional planning required. Food is also uniquely positioned at the intersection of science (nutrition, biology, agriculture), mathematics (measurement, fractions, counting), culture (cuisine, traditions, celebrations), and personal choice (preference, health decisions), making it the most naturally cross-curricular theme available. A single worksheet about sorting fruits by food group simultaneously addresses math classification standards, science nutrition standards, health education requirements, and vocabulary development \u2014 four curricular goals from one page. The theme transforms the most ordinary, taken-for-granted experience of eating into structured academic practice, teaching children that the world they already navigate daily is full of countable, sortable, graphable, and describable learning opportunities. This realization \u2014 that everyday life IS learning \u2014 may be the most important metacognitive lesson any educational theme can deliver.',

  researchCitation: 'Contento, I.R. (2008). "Nutrition Education: Linking Research, Theory, and Practice." Asia Pacific Journal of Clinical Nutrition, 17(S1), 176\u2013179. This study demonstrated that children who engage with food classification and nutrition categorization activities in structured educational settings show significantly higher food literacy and healthier eating attitudes than those receiving nutrition information through passive instruction alone, confirming that hands-on sorting and analysis worksheets build deeper nutritional understanding than lecture-based health education.',

  snippetDefinition: 'Food worksheets for kids are printable educational activities featuring fruits, vegetables, grains, proteins, and dairy items \u2014 designed to build classification skills, counting fluency, data graphing abilities, and nutrition vocabulary for children ages 3 through 9. They include sorting activities for food group classification, addition and subtraction with food counters, graphing worksheets for data literacy, word searches for nutrition vocabulary, and pattern activities that connect everyday eating to mathematical thinking.',

  snippetHowTo: [
    'Start with familiar foods children eat daily \u2014 bananas, bread, milk, carrots \u2014 using coloring pages and matching worksheets that build confidence through recognition of items the child already knows from home.',
    'Progress to sorting and classification activities using picture-sort worksheets where children group foods by food group, color, or source (plant versus animal), building the categorical thinking that underpins scientific taxonomy.',
    'Introduce counting and comparison using find-and-count and more-less worksheets with plates and baskets of food items, connecting abstract number concepts to the tangible experience of mealtime portions.',
    'Advance to data collection and graphing through chart-count-color worksheets where children survey favorite foods, record results, and create bar graphs \u2014 directly addressing measurement and data standards.',
    'Connect worksheet classification to real meals by having children identify food groups on their own lunch plates after completing sorting activities on paper, bridging academic learning to daily nutrition.',
    'Extend to subtraction and pattern activities that use food scenarios like eating items from a group or alternating fruit sequences, building arithmetic fluency and algebraic readiness through food contexts.',
    'Deepen learning by discussing cultural food traditions and diverse cuisines, using worksheets featuring rice, tortillas, pasta, and naan to build both nutritional knowledge and multicultural awareness.',
  ],

  limitations: 'Food worksheets can inadvertently reinforce cultural food biases if not curated for dietary diversity \u2014 worksheets featuring only Western foods exclude children whose home cuisines center on rice, lentils, tofu, or plantains. The theme\\'s strength in classification, counting, and data analysis offers less direct scope for spatial reasoning, phonics decoding, or extended narrative writing than geometry or literacy-focused themes. Food allergies and dietary restrictions require sensitivity in classroom settings, as some children may feel excluded when worksheets prominently feature items they cannot eat.',

  themeComparisons: [
    {
      vsThemeId: 'cooking',
      summary: 'Food worksheets treat food as a classification and science subject \u2014 sorting by food group, counting servings, graphing preferences, and analyzing nutritional properties. Cooking worksheets treat food as a procedural and sequential process \u2014 following recipe steps, measuring ingredients, and understanding why order matters. Food teaches WHAT food is and how to categorize it; cooking teaches HOW to transform ingredients through sequential action. Both connect to nutrition but through fundamentally different cognitive pathways.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Food worksheets organize consumable products by nutritional categories \u2014 food groups, health value, and dietary function \u2014 while animal worksheets organize living creatures by biological categories \u2014 habitat, species, and physical characteristics. Both develop classification skills, but food classification connects to personal health decisions children make daily, while animal classification connects to scientific observation of the natural world.',
    },
    {
      vsThemeId: 'fruits',
      summary: 'Food worksheets encompass all food groups including grains, proteins, dairy, fruits, and vegetables, providing a comprehensive nutritional framework for classification and data activities. Fruits worksheets focus deeply on a single food category, allowing more specialized vocabulary and detailed botanical knowledge. Food provides breadth across nutrition science; fruits provide depth within one delicious domain.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Food worksheets focus on food as a finished product for consumption \u2014 sorting, counting, and analyzing items as they appear on plates and in grocery stores. Garden worksheets focus on the growth process \u2014 planting, watering, and observing how food develops from seed to harvest. Food teaches downstream classification and nutrition; garden teaches upstream biology and patience.',
    },
  ],

  productLinks: [
    {
      appId: 'picture-sort',
      anchorText: 'food sorting worksheets for kids',
      context: 'Classification thinking develops powerfully when children use our food sorting worksheets for kids to group items by food group, color, or nutritional category \u2014 the same logical sorting operation that underpins scientific taxonomy, data organization, and the healthy eating decisions children will make throughout their lives.',
    },
    {
      appId: 'chart-count-color',
      anchorText: 'food graphing worksheets printable',
      context: 'Data literacy skills build naturally when children use our food graphing worksheets printable to count items by category, record tallies, and create colorful bar graphs of food preferences \u2014 directly addressing measurement and data standards while making abstract statistics concrete through the universally familiar language of meals and nutrition.',
    },
    {
      appId: 'more-less',
      anchorText: 'food comparison worksheets',
      context: 'Quantitative reasoning strengthens when children work through our food comparison worksheets, determining whether a basket holds more apples or oranges and which plate has fewer vegetables \u2014 building the comparison vocabulary and numerical judgment that supports both mathematical fluency and practical portion awareness.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'food odd one out worksheets',
      context: 'Critical thinking sharpens when children identify the item that does not belong in our food odd one out worksheets \u2014 a cookie among vegetables, a drink among solid foods \u2014 requiring attribute analysis and category boundary reasoning that develops the same logical exclusion skills used in scientific classification.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher is introducing the USDA MyPlate food groups as part of a health education unit but finds that her students treat the five food groups as abstract labels rather than meaningful categories they can apply to their own eating.',
      solution: 'She designs a week-long food classification unit using picture-sort worksheets where children sort illustrated foods into five food group bins. Each day focuses on one food group, with the chart-count-color worksheet used to graph how many items belong to that group. On Friday, students bring photos of their home lunches and classify each item using the same sorting criteria practiced all week.',
      outcome: 'By the end of the week, 91 percent of students can correctly classify common foods into all five food groups without assistance, compared to 54 percent the previous year when food groups were taught through lecture and poster display only. Three students begin spontaneously labeling food groups during cafeteria lunch, and parent feedback indicates children are discussing food groups at dinner for the first time.',
    },
    {
      situation: 'A parent wants to help her second grader practice data collection and bar graphing at home but finds that generic math worksheets with abstract counters fail to hold her child\\'s attention for more than three minutes.',
      solution: 'She introduces chart-count-color worksheets with food themes, asking her child to survey family members about favorite fruits, record the data in tally marks, and build a color-coded bar graph. She extends the activity by having the child count food items in the refrigerator by food group and create a second comparison graph. More-less worksheets provide additional practice comparing quantities across food categories.',
      outcome: 'The child completes twenty-minute graphing sessions willingly because the data is personally meaningful \u2014 knowing that Dad\\'s favorite fruit is mango feels more engaging than graphing abstract colored squares. Over three weeks, the child independently graphs food items at a restaurant visit, demonstrating genuine transfer of data collection skills to novel contexts. The teacher reports a full letter grade improvement in the data and measurement unit assessment.',
    },
    {
      situation: 'A first-grade teacher needs to address subtraction fluency within 20 but several students resist traditional subtraction practice because they associate it with difficulty and frustration from earlier unsuccessful experiences.',
      solution: 'She reframes subtraction as eating food from a plate: there were twelve grapes on the plate and you ate five, how many are left. She uses food-themed subtraction worksheets alongside image-addition worksheets with food counters, letting students choose which operation to practice each day. Odd-one-out worksheets provide breaks between computation sessions while still developing analytical thinking with food contexts.',
      outcome: 'Four of six subtraction-resistant students voluntarily complete food subtraction worksheets without protest because the eating context makes subtraction feel logical rather than arbitrary \u2014 of course food disappears when you eat it. Subtraction fluency assessment scores for these students improve by an average of 34 percent over four weeks, and two students begin creating their own food subtraction problems during free time.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, picture-sort, and chart-count-color worksheets that leverage strong visual processing with colorful food illustrations. Create a classroom food group wall with labeled photographs of real foods organized by category so students can reference visual anchors during sorting and classification tasks. Use color-coded food group charts where each group has a consistent color across all worksheets and classroom materials.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce sorting categories to two or three food groups at a time rather than all five simultaneously, building confidence with familiar items like fruits versus vegetables before introducing grains, dairy, and proteins. Pair every worksheet with physical food manipulatives \u2014 plastic food toys or food image cards children can physically move into piles before marking answers on paper. Start each session with a coloring page featuring familiar comfort foods to build engagement before introducing the target classification or math skill.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-attribute food classification tasks where items must be sorted by two criteria simultaneously \u2014 food group AND whether the item is typically eaten raw or cooked. After completing chart-count-color worksheets, ask them to write analytical paragraphs comparing two data sets and explaining why food preferences might differ between two classrooms. Introduce nutrition label reading and calorie comparison for authentic multi-digit math practice.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, picture-sort, and find-and-count before introducing word-based activities. Food names are among the most universally recognizable vocabulary across languages, and many food terms are cognates (banana, chocolate, pizza, hamburger). Provide a bilingual food reference chart with labeled photographs and names in both languages, using real food items as tangible vocabulary anchors that children can see, hold, and name while building English food vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one food worksheet per week over a four-week nutrition unit. Compare early and late samples to document growth in food group classification accuracy, nutritional vocabulary usage, counting and graphing precision, and complexity of comparative reasoning. Look specifically for evidence of progression from single-attribute sorting to multi-attribute classification and from simple counting to data interpretation.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on food sorting and graphing worksheets, note whether they classify foods by appearance only such as color or shape (Pre-K), use food group labels accurately while sorting (K\u20131st), or apply multiple classification criteria simultaneously while explaining nutritional rationale for grouping decisions (2nd\u20133rd). Record whether children can transfer classification skills from worksheets to real food items at snack time.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Food classification sorting assessment',
      criteria: 'Present students with a mixed set of twenty food image cards spanning all five food groups. Ask them to sort the cards into groups, name each group using correct food group terminology, and explain one defining attribute that determines membership. For advanced students, present borderline items like nuts or avocados that could fit multiple categories and ask them to defend their classification choice with nutritional reasoning.',
      gradeLevel: 'K to 2nd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Nutrition & Biology)',
      connection: 'Food is the most direct connection between classroom learning and biological science. Understanding food groups, nutrient categories, and the relationship between diet and health bridges life science standards about the human body with health education standards about nutrition. Children learn that proteins build muscles, carbohydrates provide energy, and vitamins support immune function \u2014 transforming abstract biology into personally relevant knowledge.',
      activity: 'After completing a food sorting worksheet, have students investigate where three different foods come from by tracing them back to their plant or animal source. Create a simple food chain diagram showing sun, plant, animal, and plate, and write one sentence explaining how energy moves from the sun to their lunch. This connects food classification to life science and ecology concepts.',
    },
    {
      subject: 'Social Studies (Cultural Cuisines & Traditions)',
      connection: 'Food is one of the most powerful vehicles for multicultural education because every culture has a distinctive cuisine that reflects geography, history, climate, and values. Discussing how different families meet the same nutritional needs with different staple foods \u2014 rice in Asia, bread in Europe, tortillas in Mexico, injera in Ethiopia \u2014 teaches respect for diversity while reinforcing the universal science of nutrition.',
      activity: 'After completing a food word search worksheet, give students a simple world map and images of staple foods from five continents. Have them match each food to its region of origin, then write two sentences about why people in different climates might rely on different staple foods. Display the maps to create a classroom celebration of global food diversity.',
    },
    {
      subject: 'Health Education (Healthy Eating Habits)',
      connection: 'Food worksheets build health literacy by teaching children to evaluate meals for nutritional balance, identify food groups, and understand why variety matters. The classification skills practiced on sorting worksheets directly transfer to the real-world skill of building balanced plates and making informed food choices \u2014 habits that impact lifelong health outcomes.',
      activity: 'After completing a food graphing worksheet, have students plan a balanced lunch that includes at least one item from each of three food groups. They draw their plate, label each item with its food group, and write one sentence explaining why their meal is nutritious. Compare plates in small groups to discover how many different balanced meals are possible.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Food groups covered', value: 'Fruits, vegetables, grains, proteins, dairy & more' },
  ],`;

// ── Cooking: 12 fields ──────────────────────────────────────────────────────

const cookingFields = `
  // -- SEO Enrichment (Part 38) --

  uniqueAngle: 'Cooking is the ONLY theme in the collection that teaches procedural literacy \u2014 the ability to follow a precise sequence of steps where order matters and skipping a step produces failure \u2014 through an activity every child finds intrinsically motivating. No other theme makes sequential thinking as concrete and consequential: if you add eggs before flour in a cake recipe, you get a different result than if you add flour before eggs. This inherent order-dependency mirrors the sequential logic of computer programming, scientific experimentation, and mathematical proof, making cooking worksheets a hidden gateway to computational thinking that disguises rigorous logic as kitchen fun. Cooking also uniquely integrates measurement, fractions, and time in a single authentic context \u2014 a recipe that calls for half a cup, baked for twenty minutes at 350 degrees demands math skills from three different domains simultaneously. No other theme requires children to coordinate quantity, duration, and temperature in a single task. The procedural precision cooking demands teaches children that words matter: stir is not the same as fold, chop is not the same as dice, and a tablespoon is not a teaspoon. This vocabulary precision transfers directly to scientific writing, mathematical terminology, and expository composition where word choice determines meaning. Perhaps most powerfully, cooking is the only theme where following instructions correctly produces a tangible, edible reward that children can share with others \u2014 transforming abstract academic accuracy into delicious, concrete results that motivate the careful attention to detail that all rigorous learning requires.',

  researchCitation: 'Hersch, D., Perdue, L., Ambroz, T., & Boucher, J.L. (2014). "Peer Reviewed: The Impact of Cooking Classes on Food-Related Preferences, Attitudes, and Behaviors of School-Aged Children." Preventing Chronic Disease, 11, E193. This study showed that children who participated in structured cooking education with sequenced instructional materials demonstrated significantly improved procedural comprehension, measurement accuracy, and nutritional knowledge compared to control groups, confirming that the combination of procedural literacy practice and hands-on cooking application produces learning gains that neither approach achieves alone.',

  snippetDefinition: 'Cooking worksheets for kids are printable educational activities featuring recipes, kitchen tools, measuring instruments, and step-by-step cooking processes \u2014 designed to build procedural literacy, measurement skills, sequencing abilities, and kitchen vocabulary for children ages 3 through 9. They include recipe sequencing activities for procedural thinking, ingredient sorting for classification skills, preposition worksheets for spatial language, word searches for culinary vocabulary, and pattern activities that connect kitchen routines to mathematical reasoning.',

  snippetHowTo: [
    'Start with recipe vocabulary and kitchen tool identification using matching worksheets and coloring pages, building familiarity with terms like spatula, whisk, measuring cup, and ingredients before introducing procedural activities.',
    'Progress to simple three-step recipe sequencing worksheets where children number illustrated cooking steps in correct order, developing the temporal and logical reasoning that procedural thinking requires.',
    'Introduce spatial language through preposition worksheets set in kitchen contexts \u2014 the bowl is on the counter, the spoon is in the drawer, the cookies are inside the oven \u2014 building the position vocabulary essential for following any set of instructions.',
    'Advance to sorting and classification with picture-sort worksheets that ask children to categorize items as tools versus ingredients, items for measuring versus mixing, or foods that are cooked versus eaten raw.',
    'Pair worksheet sequencing activities with real simple recipes like fruit salad, trail mix, or no-bake cookies, letting children experience that the procedural thinking practiced on paper produces edible results in the kitchen.',
    'Extend to measurement and math connections through image-addition worksheets where children add ingredient quantities and more-less worksheets comparing recipe amounts, linking kitchen math to arithmetic standards.',
    'Deepen procedural writing skills by having children create their own illustrated recipe cards after practicing with worksheets, transferring the sequencing structure they have analyzed into original compositions.',
  ],

  limitations: 'Cooking worksheets cannot replicate the multisensory experience of actual cooking \u2014 the smell of baking bread, the sizzle of butter in a pan, the texture of kneading dough \u2014 making them supplementary rather than primary instructional tools for culinary education. The theme requires more adult supervision context than self-directed themes because real cooking extensions involve heat, sharp tools, and food safety considerations that must be explicitly addressed. Kitchen safety content and food allergy awareness add instructional complexity that purely academic themes like numbers or shapes do not require.',

  themeComparisons: [
    {
      vsThemeId: 'food',
      summary: 'Cooking worksheets focus on the procedural and sequential process of preparing meals \u2014 following recipe steps, measuring ingredients, and understanding why order matters. Food worksheets focus on the classification and science of nutrition \u2014 sorting by food group, counting servings, and analyzing nutritional properties. Cooking teaches the PROCESS of transformation; food teaches the PRODUCT and its categories. Both connect to nutrition but through fundamentally different cognitive operations.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Cooking worksheets teach how to transform raw ingredients into finished dishes through precise sequential procedures, while garden worksheets teach how to grow ingredients from seeds through patient cultivation over time. Cooking develops procedural thinking and measurement precision; gardening develops observational patience and biological understanding. Both connect children to the food system but at different stages of the farm-to-table journey.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Cooking worksheets and construction worksheets both teach procedural thinking through following step-by-step instructions to build something, but cooking produces edible, temporary results while construction produces durable, structural results. Cooking emphasizes measurement precision and timing; construction emphasizes spatial reasoning and structural stability. Both develop the sequential planning skills that transfer to programming and engineering.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Cooking worksheets introduce scientific concepts through kitchen chemistry \u2014 how heat changes states of matter, why bread rises, and what happens when you mix baking soda with vinegar \u2014 while nature worksheets teach scientific observation through ecological exploration of plants, animals, weather, and seasons. Cooking provides accessible, hands-on science through transformation of ingredients; nature provides observational science through exploration of the living world.',
    },
  ],

  productLinks: [
    {
      appId: 'prepositions',
      anchorText: 'cooking preposition worksheets',
      context: 'Spatial language fluency develops naturally when children work through our cooking preposition worksheets, placing ingredients on the counter, in the bowl, next to the spoon, and under the towel \u2014 building the precise position vocabulary that recipe comprehension and instruction-following demand across every academic subject.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'cooking ingredient sorting worksheets',
      context: 'Classification thinking strengthens when children use our cooking ingredient sorting worksheets to categorize items as tools versus ingredients, items for measuring versus mixing, or foods that need cooking versus those eaten raw \u2014 developing the multi-attribute sorting skills that support both kitchen organization and scientific taxonomy.',
    },
    {
      appId: 'matching-app',
      anchorText: 'cooking matching worksheets for kids',
      context: 'Vocabulary and visual association skills build together when children work through our cooking matching worksheets for kids, pairing kitchen tools with their functions, ingredients with finished dishes, and recipe steps with their illustrations \u2014 creating the conceptual connections that make recipe reading and procedural comprehension possible.',
    },
    {
      appId: 'word-search',
      anchorText: 'cooking word search printable',
      context: 'Culinary vocabulary expands as children scan for hidden words in our cooking word search printable activities, locating terms like recipe, ingredient, spatula, measure, and temperature \u2014 building the specialized vocabulary that transforms kitchen tools from mysterious objects into named, understood instruments children can discuss with confidence.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A first-grade teacher notices that her students struggle with following multi-step written instructions across all subjects \u2014 they read the first step but skip ahead or forget intermediate steps when completing science experiments, math procedures, and writing tasks.',
      solution: 'She introduces a two-week procedural literacy unit using cooking sequencing worksheets as the primary training material. Students begin with three-step recipe sequences and progress to six-step sequences, explicitly discussing why each step must happen in order and what would go wrong if steps were skipped or reversed. Preposition worksheets with kitchen contexts reinforce the spatial language embedded in instructions. Each sequencing worksheet is followed by a brief class discussion about what other activities require following steps in order.',
      outcome: 'After two weeks, the teacher observes a measurable improvement in multi-step instruction following across subjects: science experiment completion accuracy improves from 61 percent to 84 percent, and math procedural errors decrease by 40 percent. Students spontaneously reference cooking analogies when explaining why order matters, saying things like you have to add before you subtract, just like you have to mix before you bake.',
    },
    {
      situation: 'A parent wants to involve her kindergartner in real cooking but finds the child lacks the vocabulary and procedural understanding to participate meaningfully \u2014 the child grabs ingredients randomly, does not understand sequence words like first, next, and then, and becomes frustrated when told to wait.',
      solution: 'She introduces matching and picture-sort worksheets to build kitchen vocabulary first, ensuring the child can name common tools and ingredients. Then she moves to three-step sequencing worksheets, practicing the concept that cooking has a fixed order. Each worksheet session is followed by making a simple no-cook recipe together, with the child serving as the instruction reader for the steps they just sequenced on paper.',
      outcome: 'After three weeks of paired worksheet-and-cooking sessions, the child uses sequence vocabulary independently, saying first we need the bread, then the peanut butter. Kitchen frustration disappears because the child understands waiting as part of the procedure rather than an arbitrary restriction. The parent reports that the child now requests to help cook dinner and can follow two-step verbal kitchen instructions without visual support.',
    },
    {
      situation: 'A second-grade teacher wants to teach measurement and fractions in context but finds that abstract fraction manipulatives fail to convey why fractions matter in real life \u2014 students can shade half a circle but cannot explain when anyone would actually need to use one-half.',
      solution: 'She designs a recipe-based fractions unit using cooking worksheets alongside real measuring tools. Students complete image-addition worksheets where recipe quantities are combined, then advance to problems requiring halving and doubling recipe measurements. More-less worksheets compare ingredient amounts across recipes. Each paper session is paired with a measurement station where students pour actual half cups and quarter cups of rice to verify their worksheet calculations physically.',
      outcome: 'On the end-of-unit fractions assessment, 87 percent of students can explain a real-world use for fractions without prompting, compared to 38 percent the previous year. Every student cites cooking as their primary example. Measurement accuracy on hands-on tasks improves by 29 percent because the worksheet-to-kitchen bridge gives fractions tangible, purposeful meaning that abstract manipulatives alone cannot provide.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages of kitchen scenes, picture-sort worksheets with vivid food and tool illustrations, and matching worksheets that pair images with images rather than text with images. Create a classroom recipe wall with large step-by-step photo sequences showing real cooking processes so students can reference visual models during sequencing tasks. Use color-coded recipe step cards where each step number has a consistent color across all worksheets.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with three-step sequences using large, unmistakable illustrations before progressing to longer sequences. Pair every sequencing worksheet with a physical acting-out activity where the child demonstrates each step with play kitchen tools before numbering them on paper. Provide a completed example recipe sequence alongside each new worksheet so students can reference the pattern. Start sessions with a confidence-building coloring page of a chef or kitchen scene before introducing the target procedural skill.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with recipe comparison tasks where they analyze two versions of the same recipe and identify differences in ingredient quantities, step order, and preparation methods. After completing sequencing worksheets, ask them to write original multi-step recipes with precise measurements and transition words. Introduce recipe scaling problems that require multiplication and fraction operations, and have them evaluate whether a recipe could work if a specific step were moved to a different position.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, matching, and picture-sort before introducing word-based activities like word search. Kitchen vocabulary is highly concrete and demonstrable \u2014 a child can hold a spoon, stir a bowl, and pour from a cup while saying each word, creating kinesthetic vocabulary anchors. Provide a bilingual kitchen vocabulary chart with labeled photographs, and use physical kitchen tools as tangible word anchors that children can handle and name while building English culinary vocabulary.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Recipe sequencing assessment',
      criteria: 'Present students with a set of six scrambled recipe step cards and ask them to arrange the steps in correct order, then explain why each step must come in that position. Assess using a three-level rubric: emerging (correctly orders some steps but cannot explain reasoning), proficient (correctly orders all steps and explains at least two dependencies), advanced (correctly orders all steps, explains all dependencies, and identifies what would go wrong if specific steps were reversed).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Procedural writing rubric',
      criteria: 'After completing sequencing worksheets, have students write their own simple recipe with at least four steps. Assess for sequential organization (numbered steps in logical order), measurement precision (specific quantities rather than vague amounts), transition vocabulary (first, next, then, finally), and completeness (would someone unfamiliar with the recipe be able to follow these instructions successfully).',
      gradeLevel: '1st to 3rd',
    },
    {
      method: 'Kitchen tool and ingredient classification task',
      criteria: 'Present students with a mixed set of kitchen tool and ingredient image cards. Ask them to sort into categories, name each category, and explain one defining attribute for each group. For advanced students, introduce multi-attribute sorting: tools that measure versus tools that mix, or ingredients that need cooking versus those eaten raw. Assess both sorting accuracy and the quality of verbal or written explanations.',
      gradeLevel: 'Pre-K to 1st',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Math (Measurement & Fractions)',
      connection: 'Cooking is the most natural and authentic context for teaching measurement and fractions because every recipe requires precise quantities expressed in cups, tablespoons, teaspoons, halves, and quarters. Children who learn measurement through cooking understand not just HOW to measure but WHY measurement matters \u2014 too much salt ruins a dish, too little flour produces flat cookies \u2014 giving mathematical precision a tangible, consequential purpose.',
      activity: 'After completing a measurement-focused cooking worksheet, set up a kitchen math station with measuring cups, spoons, and rice or water. Have students verify their worksheet answers by physically measuring the quantities, then write one sentence explaining what would happen to the recipe if they used the wrong measurement. This connects abstract math to concrete kitchen consequences.',
    },
    {
      subject: 'Science (Kitchen Chemistry & States of Matter)',
      connection: 'Cooking is applied chemistry: melting butter demonstrates solid-to-liquid phase change, boiling water shows liquid-to-gas transition, baking bread involves irreversible chemical reactions between yeast, sugar, and flour, and dissolving sugar in water illustrates solution chemistry. Every cooking process connects to science standards about properties of matter and how materials change.',
      activity: 'After completing a recipe sequencing worksheet, have students identify which steps involve a change in state of matter (melting butter, boiling water, freezing ice pops). Create a simple chart listing the step, the starting state, the ending state, and what caused the change. This transforms recipe steps into scientific observations that connect cooking procedures to physical science concepts.',
    },
    {
      subject: 'Language Arts (Procedural Writing & Sequencing)',
      connection: 'Recipes are the most accessible form of procedural text for young learners because they follow a clear, predictable structure: ingredient list, numbered steps, and a finished product. Learning to read and write recipes develops the same organizational skills required for scientific lab reports, instructional manuals, and how-to essays \u2014 making cooking worksheets a genuine literacy tool disguised as kitchen fun.',
      activity: 'After completing a sequencing worksheet, have students write their own three-to-five-step recipe for a simple snack they know how to make. Then swap recipes with a partner who follows the written instructions exactly, discovering whether the procedural writing was clear and complete enough for someone else to follow. Discuss what was missing and revise \u2014 connecting recipe writing to the revision process in all composition.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Key skill developed', value: 'Procedural literacy & sequencing' },
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

console.log('Part 38: Enriching food & cooking theme hub pages...\n');

console.log('1. Injecting 12 fields into food/en.ts...');
injectFields(path.join(base, 'food', 'en.ts'), foodFields);

console.log('2. Injecting 12 fields into cooking/en.ts...');
injectFields(path.join(base, 'cooking', 'en.ts'), cookingFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
