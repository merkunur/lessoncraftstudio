/**
 * SEO Part 32: Enrich farm & zoo EN theme hub pages
 * - Farm: adds 12 missing enrichment fields
 * - Zoo: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Farm: 12 fields ─────────────────────────────────────────────────────────

const farmFields = `
  // -- SEO Enrichment (Part 32) --

  uniqueAngle: 'Farm-themed worksheets hold a pedagogical position that no other theme can occupy because they connect the abstract world of academic skills to the most fundamental human activity: producing food. Every child eats, yet remarkably few understand where their meals originate, and this knowledge gap creates a powerful learning opportunity that farm worksheets exploit with extraordinary efficiency. When a student counts baskets of apples or traces the word harvest, they are simultaneously building mathematical and literacy competencies while closing an agricultural literacy gap that researchers have identified as increasingly urgent in urbanized societies. What makes the farm theme genuinely distinct from related themes like animals or nature is its emphasis on human systems and economic relationships. A farm is not simply a collection of creatures and plants \u2014 it is a working enterprise where inputs like seeds, water, and labor transform into outputs like food, fiber, and fuel. This systems-level thinking introduces children to cause-and-effect reasoning, supply chains, and resource management in ways that feel natural rather than abstract. Seasonal cycling provides another unique advantage: farming is inherently temporal, governed by planting seasons, growth periods, and harvest windows that map directly onto calendar skills, sequencing tasks, and prediction activities. No other theme offers such an organic framework for teaching children about time, planning, and patience. The economic dimension also sets farm worksheets apart from purely zoological themes. When children sort crops by type, count eggs by the dozen, or calculate how many rows a farmer needs to plant, they are practicing the earliest forms of quantitative reasoning that underpin financial literacy. This blend of biological science, temporal reasoning, economic thinking, and hands-on food awareness makes farm worksheets a uniquely multi-disciplinary educational tool that delivers outcomes no single-subject worksheet can match.',

  researchCitation: 'Blair, D. (2009). The Child in the Garden: An Evaluative Review of the Benefits of School Gardening. Journal of Environmental Education, 40(2), 15\u201338. Blair\\u2019s systematic review of school garden and agricultural education programs found that hands-on food production activities significantly improved children\\u2019s science achievement scores, increased vegetable consumption, and enhanced environmental attitudes, with the strongest academic gains observed when garden-based activities were explicitly linked to classroom worksheets and curriculum objectives.',

  snippetDefinition: 'Farm worksheets for kids are printable educational activities featuring barns, tractors, crops, and farm animals \u2014 such as cows, chickens, and pigs \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises, word searches, coloring pages, and sorting challenges that connect classroom learning to the real-world process of growing food and raising animals.',

  snippetHowTo: [
    'Choose a farm sub-theme for the week \u2014 such as dairy animals, crops and harvest, or farm machinery \u2014 to give lessons a focused narrative that builds vocabulary around one area before rotating to the next.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page for math with egg counters, a word search for farm vocabulary, and a coloring page of a barn scene for fine motor practice.',
    'Introduce the sub-theme with a short read-aloud, a two-minute farm video, or a real food item from the featured category so children have concrete background knowledge before encountering the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or matching activity to build confidence before progressing to counting problems or word puzzles that require more sustained effort.',
    'While children work, circulate and connect worksheet content to real food experiences by asking questions like "Have you ever eaten something that grows on a farm like this?" or "What season do you think the farmer planted these seeds?"',
    'After completing worksheets, lead a brief sharing circle where each child names one farm fact they learned, reinforcing vocabulary retention and building oral language skills alongside the written practice.',
    'Extend the lesson beyond paper by pairing worksheet sessions with a cooking activity, a seed-planting experiment, or a trip to a farmers market so children experience the farm-to-table connection firsthand.',
  ],

  limitations: 'Farm worksheets can feel abstract for children in urban environments who have never visited agricultural land or interacted with livestock, potentially reducing the personal relevance that drives engagement. The theme also risks romanticizing farming by presenting it as a simple, idyllic lifestyle rather than the complex, technologically driven industry it has become, which may require teachers to supplement worksheets with age-appropriate discussions about modern agriculture. Additionally, the farm theme is inherently terrestrial and domesticated, offering limited opportunities to explore marine biology, aerial ecosystems, or wild animal behavior that themes like ocean or animals cover more naturally.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Farm worksheets focus specifically on domesticated species in agricultural settings, connecting animals to food production, economic activity, and seasonal cycles. Animal worksheets span the entire animal kingdom from insects to whales, offering richer biodiversity and classification lessons but lacking the farm theme\\u2019s unique connection to food systems and community economics.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Both themes involve growing things, but farm worksheets encompass livestock, machinery, and large-scale crop production alongside plants, while garden worksheets focus exclusively on small-scale horticulture. Farm content naturally teaches supply chains and community roles, whereas garden content excels at hands-on observation of individual plant life cycles.',
    },
    {
      vsThemeId: 'food',
      summary: 'Farm worksheets address the production side of the food chain \u2014 growing, raising, and harvesting \u2014 while food worksheets emphasize the consumption side: nutrition, cooking, and healthy eating habits. Together they create a complete farm-to-fork educational journey, but each alone covers only half the story.',
    },
    {
      vsThemeId: 'pets',
      summary: 'Pet worksheets feature companion animals in domestic home settings, excelling at social-emotional lessons about caregiving and daily responsibility. Farm worksheets present working animals in agricultural contexts, which better supports lessons about economics, food origins, and community systems but offers less personal emotional connection for most children.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'farm animal coloring worksheets',
      context: 'For a calming entry point that builds fine motor skills while familiarizing children with agricultural imagery, our farm animal coloring worksheets feature detailed illustrations of cows, chickens, tractors, and barns that children can color while learning the names and roles of each element on a working farm.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'farm counting activities',
      context: 'When students are ready to combine visual scanning with arithmetic in an agricultural context, our farm counting activities scatter eggs, apples, and barn animals across busy farm scenes and ask children to tally each type, building numeracy alongside agricultural vocabulary.',
    },
    {
      appId: 'word-search',
      anchorText: 'farm word search printable',
      context: 'Vocabulary acquisition deepens when children hunt for agriculture-specific terms in our farm word search printable pages, which embed words like harvest, pasture, tractor, and livestock into puzzle grids that make spelling practice feel like an exploration of farm life.',
    },
    {
      appId: 'matching-app',
      anchorText: 'farm matching worksheets',
      context: 'Our farm matching worksheets pair animals with their products, crops with their seasons, and tools with their functions, challenging children to apply agricultural knowledge while developing the visual discrimination and logical reasoning skills that support both reading readiness and scientific inquiry.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher notices that several students struggle with one-to-one correspondence during math centers, consistently miscounting objects above five.',
      solution: 'She introduces farm-themed find-and-count worksheets featuring rows of eggs in nests and baskets of apples in an orchard. Each item is clearly separated and arranged in natural farm groupings, giving children a structured visual context for touching and counting. She pairs the worksheets with plastic egg cartons and toy apples for concrete reinforcement.',
      outcome: 'After three weeks of daily farm counting practice, the struggling students reliably count to ten with one-to-one correspondence. Two students spontaneously begin grouping objects by fives using the egg carton model, demonstrating early skip-counting readiness ahead of the curriculum timeline.',
    },
    {
      situation: 'A homeschool parent wants to connect her first grader\\u2019s worksheet learning to real-world experiences but lives in a suburban neighborhood with no farms nearby.',
      solution: 'She builds a weekly routine where farm worksheets on Monday and Wednesday cover math and vocabulary, and on Saturday the family visits the local farmers market. The child brings a farm vocabulary checklist from the worksheets and marks off items they can identify: tomatoes, eggs, honey, corn. On Sunday, they cook a recipe using one purchased ingredient.',
      outcome: 'The child\\u2019s engagement with academic worksheets doubles because each session connects to a tangible weekend experience. By month two, the child independently reads produce labels at the grocery store and asks questions about where different foods are grown, demonstrating transfer from worksheet learning to real-world curiosity.',
    },
    {
      situation: 'A second-grade teacher needs to build a cross-curricular unit connecting math, science, and social studies standards but has limited planning time and resources.',
      solution: 'She anchors the unit around farm worksheets: image addition with harvest quantities for math, word searches with crop and livestock vocabulary for literacy, and coloring pages depicting seasonal farming cycles for science. She adds a class discussion about community helpers who work on farms to address social studies objectives, using the same farm imagery from the worksheets.',
      outcome: 'The thematic consistency across subjects reduces student confusion and increases transfer between lessons. On the end-of-unit assessment, 85 percent of students correctly sequence the seasonal farming cycle and solve two-step harvest word problems, outperforming the previous year\\u2019s scores on comparable standards-aligned assessments.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, find-and-count, and picture-sort worksheets as primary activities, supplementing word-based tasks with farm photograph cards that children can reference while working. Create a visual farm vocabulary wall with labeled images of tractors, barns, crops, and animals that students can consult during word search and alphabet activities.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, big-small comparison, and matching before introducing word-based activities. Farm vocabulary is highly concrete and translatable, so provide a bilingual word list pairing farm terms in the child\\u2019s home language with English equivalents. Use real food items from the farm theme as tangible vocabulary anchors during worksheet sessions.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step word problems involving farm economics, such as calculating total costs for seed purchases or comparing harvest yields across two farms. Extend word search activities by asking them to write sentences using each found word, and encourage them to design their own farm-themed worksheets for classmates to solve.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of items per worksheet to three or four and pair every counting task with physical manipulatives like toy farm animals or dried beans representing crops. Start each session with a familiar, confidence-building activity like coloring a barn before introducing the target math or literacy skill. Provide a completed example alongside each worksheet rather than relying on verbal instructions alone.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Cycles & Seasonal Patterns)',
      connection: 'Farm worksheets connect directly to life science standards covering plant growth stages and animal life cycles. Activities depicting seed germination, crop maturation, and seasonal harvest cycles teach children that living things change over time and depend on environmental conditions.',
      activity: 'After completing a seasonal farming worksheet, have students plant bean seeds in cups and create a growth observation journal, recording measurements weekly and comparing their real seedlings to the crop illustrations from their worksheets.',
    },
    {
      subject: 'Math (Counting, Measurement & Operations)',
      connection: 'Farm contexts provide authentic scenarios for counting discrete objects, measuring growth in standard units, and performing addition and subtraction with concrete quantities. Baskets of apples, rows of corn, and cartons of eggs offer naturally grouped visual counters that support place value and early multiplication concepts.',
      activity: 'Use farm image addition worksheets alongside a classroom farm stand where students calculate totals for baskets of produce, make change with play coins, and record transactions in a simple ledger to build numeracy and data recording skills simultaneously.',
    },
    {
      subject: 'Social Studies (Community Helpers & Food Systems)',
      connection: 'Farm worksheets introduce the concept that food reaches families through a chain of community workers including farmers, truck drivers, grocers, and cooks. This builds foundational understanding of economic interdependence and the roles people play in sustaining communities.',
      activity: 'After discussing the farm-to-table journey on a matching worksheet, have students interview a family member about their job and draw a connection between that role and how food gets from the farm to the dinner table, presenting their findings in a short oral report.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one farm worksheet per week over a four-week thematic unit. Compare early and late samples to document growth in counting accuracy, farm vocabulary spelling, fine motor control in coloring, and complexity of written responses about food origins and farming processes.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on farm sorting and matching worksheets, note whether they can classify farm items by one attribute such as animal versus crop (Pre-K), by two attributes simultaneously such as season and type (K\u20131st), or create and justify their own classification categories with agricultural reasoning (2nd\u20133rd). Record instances of children using farm vocabulary correctly in their explanations.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Farm-to-table sorting assessment',
      criteria: 'Present students with a mixed set of farm product images \u2014 milk, bread, eggs, salad, wool sweater, apple juice \u2014 and ask them to trace each product back to its farm source and explain the steps involved. Assess both accuracy of source identification and quality of the sequential reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Farm categories featured', value: 'Animals, crops, machinery' },
  ],`;

// ── Zoo: 12 fields ──────────────────────────────────────────────────────────

const zooFields = `
  // -- SEO Enrichment (Part 32) --

  uniqueAngle: 'Zoo-themed worksheets occupy a distinctive pedagogical niche because they mirror the structure of formal education itself: a zoo is fundamentally an organized learning environment where diverse subjects are curated into discrete, navigable exhibits, much like a classroom organizes knowledge into distinct learning stations. This structural parallel gives zoo worksheets a metacognitive dimension that other animal themes lack. When children sort zoo creatures by exhibit, they are practicing the same organizational thinking that allows them to categorize information across academic subjects. The zoo context also uniquely bridges informal and formal education in ways that research has shown to be exceptionally effective for young learners. A child who completes a zoo worksheet before a field trip arrives at the zoo with activated prior knowledge, primed to observe, compare, and question rather than passively spectate. Conversely, worksheets completed after a visit consolidate experiential memories into structured academic knowledge, transforming a fun outing into lasting learning. This before-during-after scaffolding cycle is a hallmark of effective museum and zoo pedagogy that classroom-only themes cannot replicate. Zoo worksheets also introduce children to conservation and environmental stewardship through a uniquely accessible lens. Unlike abstract environmental themes, the zoo presents endangered species as specific, nameable individuals that children can see, remember, and care about, creating emotional investment that researchers have linked to stronger pro-environmental attitudes in later childhood. The geographic diversity of zoo collections provides another distinct advantage: a single worksheet session can travel children from the African savanna to the Arctic tundra to the Amazon rainforest, building global awareness and spatial thinking that purely domestic themes like farm or pets cannot deliver. This combination of organizational metacognition, experiential learning bridges, conservation education, and geographic breadth makes zoo worksheets a genuinely unique pedagogical tool rather than simply another variation on the animal theme.',

  researchCitation: 'Falk, J.H., Reinhard, E.M., Vernon, C.L., Bronnenkant, K., Deans, N.L., & Heimlich, J.E. (2007). Why Zoos & Aquariums Matter: Assessing the Impact of a Visit to a Zoo or Aquarium. Association of Zoos and Aquariums. This large-scale study of over 5,500 visitors across twelve zoos found that zoo visits combined with structured educational activities significantly reinforced visitors\\u2019 understanding of biodiversity and conservation, with the strongest learning gains observed among children who engaged with pre-visit and post-visit educational materials that connected zoo experiences to classroom content.',

  snippetDefinition: 'Zoo worksheets for kids are printable educational activities featuring exotic animals, exhibits, and zookeeper scenarios \u2014 such as lions, elephants, penguins, and giraffes \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises, word searches, coloring pages, shadow matching, and sorting challenges that harness children\\u2019s fascination with zoo animals to build academic skills and conservation awareness.',

  snippetHowTo: [
    'Choose a zoo sub-theme for the week \u2014 such as African animals, Arctic creatures, or rainforest species \u2014 to give lessons a geographic focus that builds vocabulary and map awareness around one region before rotating to the next.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with groups of penguins for math, a word search with zoo vocabulary for literacy, and a shadow match with animal silhouettes for visual reasoning.',
    'If a zoo field trip is planned, use worksheets as pre-visit preparation to build vocabulary and activate prior knowledge so children arrive ready to observe and compare rather than passively wander between exhibits.',
    'Distribute worksheets in order of increasing difficulty, starting with an engaging coloring page or matching activity to spark enthusiasm before progressing to counting problems or word puzzles that require more focus.',
    'While children work, connect worksheet content to geography by asking questions like "Which continent does this animal come from?" or "What kind of weather does this animal need to survive?" to weave science and social studies into every activity.',
    'After completing worksheets, hold a brief discussion where children share one fact about a featured zoo animal, building oral language skills and reinforcing the content knowledge embedded in the worksheet activities.',
    'For post-visit follow-up, have children complete a zoo journal page matching worksheet animals to creatures they actually observed, strengthening the connection between academic learning and real-world experience.',
  ],

  limitations: 'Zoo worksheets assume familiarity with zoo visits that not all children share, particularly those in rural areas or from families where zoo admission costs are prohibitive, which can make activities feel less personally relevant. The theme may also prompt questions about the ethics of keeping wild animals in captivity, requiring teachers to be prepared for age-appropriate discussions about animal welfare and the conservation role of modern zoos. Additionally, the zoo context focuses on observation from a distance rather than direct interaction, offering less scope for the hands-on caregiving lessons that pet or farm themes provide more naturally.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Zoo worksheets present creatures within a structured, curated environment organized by exhibit and continent, which naturally teaches organizational thinking and geographic awareness. Animal worksheets cover the full wild kingdom in natural habitats, offering broader biodiversity and ecological concepts but lacking the zoo theme\\u2019s unique connection to real-world institutions children can visit and experience firsthand.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Farm worksheets focus on domestic agricultural animals connected to food production, seasonal cycles, and community economics. Zoo worksheets feature exotic wild species organized by geographic origin, which better supports lessons about global biodiversity, conservation, and habitat science but offers less direct connection to children\\u2019s everyday food experiences.',
    },
    {
      vsThemeId: 'pets',
      summary: 'Pet worksheets leverage the deep personal bond between children and their household companions, excelling at social-emotional learning about daily caregiving and responsibility. Zoo worksheets trade that intimate personal connection for geographic breadth and conservation awareness, introducing children to creatures from every continent in a structured observational context that builds scientific thinking skills.',
    },
    {
      vsThemeId: 'dinosaurs',
      summary: 'Dinosaur worksheets harness the excitement of prehistoric creatures and pair naturally with lessons about paleontology, extinction, and geological time scales. Zoo worksheets focus on living species children can observe in person, providing the experiential learning connection that dinosaur content cannot offer. Together, they create a compelling past-and-present perspective on the diversity of life on Earth.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'zoo animal coloring pages',
      context: 'For a calming, confidence-building entry into zoo-themed learning, our zoo animal coloring pages feature detailed illustrations of lions, elephants, giraffes, and penguins that develop fine motor precision while familiarizing children with the exotic species they will encounter in more challenging activities.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'zoo counting worksheets',
      context: 'When students are ready to combine visual scanning with arithmetic in an exciting wildlife context, our zoo counting worksheets scatter groups of zoo animals across busy exhibit scenes and ask children to tally each species, building numeracy and observation skills simultaneously.',
    },
    {
      appId: 'word-search',
      anchorText: 'zoo word search printable',
      context: 'Vocabulary acquisition accelerates when children hunt for wildlife terms in our zoo word search printable pages, which embed words like giraffe, penguin, elephant, and habitat into puzzle grids that make spelling practice feel like an expedition through the animal kingdom.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'zoo animal shadow matching',
      context: 'Visual discrimination sharpens when children match exotic animal silhouettes to their full-color counterparts in our zoo animal shadow matching worksheets, building the same visual analysis abilities that support letter recognition, spatial reasoning, and scientific observation skills.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A pre-K teacher is preparing her class of four-year-olds for their first-ever zoo field trip, but many children have never seen exotic animals beyond picture books and are anxious about what to expect.',
      solution: 'She spends the week before the trip using zoo coloring pages and shadow match worksheets to introduce the animals they will see. Each day focuses on one exhibit area: Monday is African animals, Tuesday is Arctic creatures, Wednesday is rainforest species. Children color each animal and practice saying its name aloud, building both vocabulary and visual familiarity.',
      outcome: 'On field trip day, children excitedly recognize animals from their worksheets, shouting names like giraffe and penguin with confidence. The teacher observes that even the most anxious children approach exhibits eagerly because the animals feel familiar. Post-trip, children complete matching worksheets connecting animals to their exhibits with 90 percent accuracy.',
    },
    {
      situation: 'A first-grade teacher wants to use zoo worksheets to build a classification unit aligned with Next Generation Science Standards, but she needs to ensure activities go beyond simple coloring to develop genuine scientific thinking.',
      solution: 'She designs a progression: week one uses find-and-count worksheets to establish zoo animal vocabulary, week two introduces picture-sort worksheets where children classify animals by number of legs and body covering, and week three combines word search activities with a student-created zoo guidebook where each child writes three facts about their assigned animal.',
      outcome: 'By week three, students independently sort unfamiliar animals into correct taxonomic groups using the classification criteria they learned through the worksheet progression. On the end-of-unit assessment, 78 percent of students correctly classify ten novel animals by two attributes simultaneously, exceeding the grade-level benchmark by twelve percentage points.',
    },
    {
      situation: 'A homeschool parent wants to build a virtual zoo exploration week for her seven-year-old who is passionate about animals but cannot visit a zoo due to geographic isolation.',
      solution: 'She pairs free zoo webcam feeds from major zoos with daily worksheet sessions: Monday is counting penguins on the webcam followed by a zoo addition worksheet, Wednesday is watching the giraffe cam and completing a big-small comparison activity, Friday is observing the monkey exhibit online and finishing a pattern worksheet with primate sequences. Each session ends with a journal entry about what the child observed.',
      outcome: 'The child completes the week with a five-page zoo journal combining worksheet results and personal observations. Their math accuracy on addition within twenty improves from 65 to 88 percent, and they independently research three additional zoo animals using library books, demonstrating the self-directed curiosity that the structured worksheet-and-webcam pairing sparked.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, shadow-match, and find-and-count worksheets as primary activities, leveraging strong visual processing skills. Supplement word-based tasks with zoo animal photograph cards and a visual vocabulary wall featuring labeled images of exhibits and species that students can reference during word search and alphabet activities.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow match, and big-small comparison before introducing word-based activities. Zoo animal names are highly visual and often recognizable across languages, making this theme accessible. Provide a bilingual animal name chart and use gestures or animal sounds to reinforce vocabulary connections during worksheet sessions.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step problems involving zoo logistics, such as calculating total visitors across exhibit areas or comparing animal populations in different sections. Extend word search activities by asking them to write a habitat description for each found word, and encourage them to design their own zoo map with animal placement justified by geographic and biological reasoning.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of animals per worksheet to three or four and pair every task with concrete manipulatives like toy zoo animals or picture cards. Start each session with a familiar, confidence-building coloring page before introducing the target skill. Provide a visual step-by-step example alongside each worksheet and allow children to work with a partner for additional support.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Habitats & Animal Classification)',
      connection: 'Zoo worksheets connect directly to life science standards covering animal habitats, physical characteristics, and basic taxonomy. Activities depicting animals in different exhibit zones teach children that creatures have specific environmental needs and can be grouped by shared physical traits.',
      activity: 'After completing a zoo animal sorting worksheet, have students create a habitat diorama in a shoebox for their favorite zoo animal, labeling the climate, food sources, and shelter features, then present it to the class with three facts from their worksheet research.',
    },
    {
      subject: 'Geography (World Regions & Continents)',
      connection: 'Zoo collections span every continent, providing a natural framework for teaching children about global regions, climates, and the relationship between geography and biodiversity. Worksheets that group animals by continent build foundational map skills and spatial awareness.',
      activity: 'Use a large classroom world map alongside zoo matching worksheets. After each session, students place animal stickers on the continent where their featured species originates, gradually building a visual biodiversity map that connects worksheet learning to geographic knowledge.',
    },
    {
      subject: 'Art (Observational Drawing & Creative Expression)',
      connection: 'Zoo animals offer extraordinarily diverse forms, textures, and patterns that inspire observational drawing skills. Coloring detailed zoo illustrations develops fine motor control while training children to notice visual details like stripe patterns, feather textures, and body proportions.',
      activity: 'After completing a zoo coloring worksheet, have students choose one featured animal and create an original drawing from memory, focusing on three distinctive features they noticed during the coloring activity. Display the drawings alongside the original worksheets to celebrate observational growth.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one zoo worksheet per week over a four-week unit. Compare early and late samples to document growth in counting accuracy, zoo vocabulary spelling, fine motor control in coloring, and complexity of written responses about animal habitats, classification, and conservation.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on zoo sorting and matching worksheets, note whether they can classify zoo animals by one attribute such as size or number of legs (Pre-K), by two attributes simultaneously such as diet and habitat (K\u20131st), or create and justify their own classification systems using scientific reasoning (2nd\u20133rd). Record instances of children using zoo and habitat vocabulary correctly.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Habitat sorting assessment',
      criteria: 'Present students with a mixed set of zoo animal cards and four habitat zones \u2014 savanna, arctic, rainforest, and ocean \u2014 and ask them to sort each animal into the correct habitat and explain one reason for their choice. Assess both accuracy of placement and quality of the scientific reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Zoo animal types featured', value: 'Mammals, birds, reptiles' },
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

console.log('Part 32: Enriching farm & zoo theme hub pages...\n');

console.log('1. Injecting 12 fields into farm/en.ts...');
injectFields(path.join(base, 'farm', 'en.ts'), farmFields);

console.log('2. Injecting 12 fields into zoo/en.ts...');
injectFields(path.join(base, 'zoo', 'en.ts'), zooFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
