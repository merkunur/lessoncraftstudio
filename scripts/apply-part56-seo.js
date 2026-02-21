/**
 * SEO Part 56: Enrich preschool grade for animals, pets, farm, zoo, birds
 * Adds 6 grade-level enrichment fields to gradeContent.preschool for each theme.
 * Fields: uniqueGradeAngle, developmentalMilestones, differentiationNotes,
 *         parentTakeaway, classroomIntegration, assessmentRubric
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

// Escape single quotes for TS single-quoted strings
function esc(s) {
  return s.replace(/'/g, "\\'");
}

function buildInjection(data, nl) {
  const lines = [];
  lines.push(`      uniqueGradeAngle: '${esc(data.uniqueGradeAngle)}',`);
  lines.push(`      developmentalMilestones: [`);
  for (const m of data.developmentalMilestones) {
    lines.push(`        { milestone: '${esc(m.milestone)}', howWeAddress: '${esc(m.howWeAddress)}' },`);
  }
  lines.push(`      ],`);
  lines.push(`      differentiationNotes: '${esc(data.differentiationNotes)}',`);
  lines.push(`      parentTakeaway: '${esc(data.parentTakeaway)}',`);
  lines.push(`      classroomIntegration: '${esc(data.classroomIntegration)}',`);
  lines.push(`      assessmentRubric: [`);
  for (const r of data.assessmentRubric) {
    lines.push(`        { skill: '${esc(r.skill)}', emerging: '${esc(r.emerging)}', proficient: '${esc(r.proficient)}', advanced: '${esc(r.advanced)}' },`);
  }
  lines.push(`      ],`);
  return lines.join(nl);
}

// ── Theme content ────────────────────────────────────────────────────────

const themes = [
  // ── Animals ──────────────────────────────────────────────────────────
  {
    name: 'animals',
    uniqueGradeAngle: 'Preschool is the developmental sweet spot for animal worksheets because three- and four-year-olds are in the peak period of categorical thinking development \u2014 they are actively constructing their first mental taxonomies by sorting the world into groups, and animals provide the most naturally rich, emotionally engaging classification domain available. At this age, children spontaneously group animals by observable attributes (has fur vs. has feathers, lives in water vs. lives on land) long before they encounter formal science vocabulary, and animal worksheets formalize this intuitive classification into structured practice that directly builds the cognitive architecture for later scientific taxonomy, mathematical set theory, and reading comprehension categorization skills.',
    developmentalMilestones: [
      { milestone: 'One-to-one counting with animal counters (ages 3-4 are establishing cardinality \u2014 understanding that the last number counted represents the total)', howWeAddress: 'image-addition and find-and-count worksheets use animal illustrations as concrete counters that make abstract number concepts tangible' },
      { milestone: 'Single-attribute sorting and classification (preschoolers can reliably sort by one attribute at a time)', howWeAddress: 'matching-app and shadow-match activities sort animals by visual features, building the categorical thinking that underpins all later classification' },
      { milestone: 'Fine motor control through guided coloring (transitioning from whole-arm scribbling to wrist-based control within boundaries)', howWeAddress: 'coloring pages with thick animal outlines and draw-and-color activities develop the pencil grip and stroke control needed for letter formation' },
      { milestone: 'Receptive vocabulary expansion through visual association (preschoolers learn 5-10 new words daily through image-label pairing)', howWeAddress: 'word-search activities with animal names build letter recognition while expanding the vocabulary of creature names children use in daily conversation' },
    ],
    differentiationNotes: 'For struggling preschoolers, reduce animal sets to two or three highly familiar creatures (cat, dog, fish) before introducing less common animals, use hand-over-hand guidance for coloring within boundaries, and pair every worksheet with a real animal figurine so children can manipulate a physical object alongside the paper task. For advanced preschoolers, introduce two-attribute sorting challenges (find all animals that are both small AND have fur), extend counting beyond ten using animal-filled scenes, and ask children to verbally explain their sorting rationale to build metacognitive awareness and oral language skills.',
    parentTakeaway: 'The most important thing parents can know about preschool animal worksheets is that the learning happens through the emotional connection, not despite it. When your three- or four-year-old lights up at seeing a puppy on their worksheet, that excitement is not a distraction from learning \u2014 it is the engine that drives focus, persistence, and memory formation. Keep sessions to eight to twelve minutes, always have real animal toys or picture books nearby to extend the conversation, and celebrate effort over accuracy because at this age building a positive association with structured learning matters more than getting every answer correct.',
    classroomIntegration: 'Animal preschool worksheets integrate naturally into circle time, learning centers, and thematic units that are already standard in preschool programming. Use coloring pages as table-time settling activities during morning arrival, incorporate counting worksheets into a weekly animal-of-the-week rotation where the featured creature appears across math, literacy, and art stations, and connect sorting worksheets to outdoor nature walks where children look for real animals that match the categories they practiced on paper. The cross-curricular connections to science (animal habitats and diets), social-emotional learning (caring for living things), and language development (animal vocabulary and descriptive words) make animal worksheets a natural anchor for integrated thematic instruction.',
    assessmentRubric: [
      { skill: 'Counting with animal counters', emerging: 'counts to 3 with one-to-one correspondence using animal images', proficient: 'counts to 7 with reliable one-to-one correspondence and identifies the numeral', advanced: 'counts to 10+, recognizes numerals, and can compare two groups to determine which has more' },
      { skill: 'Animal classification', emerging: 'sorts animals into two groups with teacher guidance using one obvious attribute', proficient: 'independently sorts animals by one attribute and names the sorting rule', advanced: 'sorts by one attribute, re-sorts by a different attribute, and explains both sorting rules verbally' },
      { skill: 'Fine motor control', emerging: 'colors animal illustrations using whole-arm movements with frequent boundary crossing', proficient: 'colors within thick outlines using wrist-based strokes with occasional boundary crossing', advanced: 'colors within outlines with controlled strokes, uses multiple colors deliberately, and attempts to trace animal name letters' },
    ],
  },

  // ── Pets ─────────────────────────────────────────────────────────────
  {
    name: 'pets',
    uniqueGradeAngle: 'Preschool is the ideal stage for pet worksheets because three- and four-year-olds are developing their first understanding of caregiving responsibility and emotional attachment to other living beings \u2014 concepts that pet themes uniquely embody. Unlike wild animals that remain abstract, pets are creatures many preschoolers live with, feed, walk, and sleep beside, making pet worksheets the most personally authentic theme available for connecting academic skills to daily lived experience. This personal connection means every counting, matching, and sorting activity activates genuine prior knowledge and emotional investment that no other theme can replicate at this level of intimacy.',
    developmentalMilestones: [
      { milestone: 'Emotional vocabulary through caregiving contexts (preschoolers are learning to name and express feelings)', howWeAddress: 'pet-themed worksheets introduce caring vocabulary like feed, walk, gentle, and love that children practice both on paper and with real pets at home' },
      { milestone: 'Visual discrimination through familiar animal features (preschoolers are refining their ability to notice small differences)', howWeAddress: 'shadow-match and matching-app activities use pet silhouettes and features children already know intimately from their own pets' },
      { milestone: 'Counting within personally meaningful contexts (cardinality develops faster with emotionally engaging materials)', howWeAddress: 'find-and-count and image-addition worksheets use pet illustrations children connect to real animals they care for daily' },
    ],
    differentiationNotes: 'For struggling preschoolers, focus on the two or three most universally familiar pets (cat, dog, fish) and use real photographs alongside illustrated worksheets to bridge recognition gaps; pair counting activities with physical pet figurines children can touch and move. For advanced preschoolers, extend to less common pets (hamster, rabbit, turtle), introduce simple pet care sequencing (first fill the bowl, then pour the food, then give it to the dog), and ask children to dictate sentences about their own pet or a pet they would like to have.',
    parentTakeaway: 'Pet worksheets are uniquely powerful at the preschool level because your child already has an expert relationship with this subject \u2014 they know what their cat eats, where their dog sleeps, and how their fish moves. This prior knowledge means preschool pet worksheets build academic skills on a foundation of authentic personal experience rather than introducing unfamiliar content. Use worksheet time as a conversation starter about pet care responsibility, and follow every worksheet with a real caregiving task like filling the water bowl or brushing the dog to connect paper learning to hands-on responsibility.',
    classroomIntegration: 'Pet worksheets integrate into preschool routines through a classroom pet care unit that connects academic skills to social-emotional responsibility learning. Use pet coloring pages during arrival time, incorporate counting worksheets into a pet shop dramatic play center where children count food items and match pets to accessories, and connect sorting activities to class discussions about what different pets need to stay healthy. If the classroom has a live pet or hosts a visiting animal, time worksheet activities to precede or follow the live interaction for maximum engagement and knowledge transfer.',
    assessmentRubric: [
      { skill: 'Pet identification and matching', emerging: 'matches two identical pet images with teacher prompting', proficient: 'independently matches 4-5 pet pairs and names each animal', advanced: 'matches pets, names them, and describes one characteristic of each like soft fur or long tail' },
      { skill: 'Counting with pet counters', emerging: 'counts to 3 pet images with one-to-one touching', proficient: 'counts to 5-7 pet images reliably and identifies the matching numeral', advanced: 'counts to 10, compares two pet groups, and uses vocabulary like more, fewer, and same' },
      { skill: 'Pet care vocabulary', emerging: 'points to pet care items when named by teacher', proficient: 'names 3-4 pet care items independently like bowl, leash, bed', advanced: 'names items and explains their purpose in simple sentences like the leash is for walking the dog' },
    ],
  },

  // ── Farm ─────────────────────────────────────────────────────────────
  {
    name: 'farm',
    uniqueGradeAngle: 'Preschool is the optimal stage for farm worksheets because three- and four-year-olds are in the concrete operational precursor period where learning through tangible, multi-sensory environments is most effective \u2014 and the farm provides the richest multi-sensory learning context of any theme, combining animals, vehicles, buildings, crops, sounds, and daily routines into a single coherent world children can explore across every academic domain. Farm worksheets connect counting (eggs, apples, animals), classification (animals vs. crops vs. tools), sequencing (planting to harvesting), and vocabulary (barn, tractor, haystack) within one unified setting that makes cross-curricular learning feel like a single adventure rather than disconnected subjects.',
    developmentalMilestones: [
      { milestone: 'Sequencing and temporal reasoning (preschoolers are beginning to understand before and after, first and then)', howWeAddress: 'farm worksheets with planting-growing-harvesting sequences and daily farm routine ordering build the temporal reasoning that supports narrative comprehension and mathematical sequencing' },
      { milestone: 'Multi-category sorting (transitioning from single-attribute to recognizing multiple groups)', howWeAddress: 'farm provides naturally distinct categories (animals, crops, tools, buildings) that children sort without needing abstract instructions' },
      { milestone: 'Sound-symbol association and vocabulary (preschoolers are mapping sounds to images and words)', howWeAddress: 'farm animal sounds (moo, cluck, oink) are among the first sound-symbol connections children master, making farm word activities build on existing phonemic awareness' },
    ],
    differentiationNotes: 'For struggling preschoolers, start with the three most recognizable farm elements (cow, chicken, tractor) and use farm animal sound effects alongside worksheets to create multi-sensory reinforcement; reduce sorting categories to two (animals vs. not animals) before introducing three-way sorts. For advanced preschoolers, introduce farm product chains (cow makes milk, chicken lays eggs, apple tree grows apples), extend counting to farm-themed addition scenarios, and challenge children to sequence a three-step farm process like planting seeds, watering, and picking vegetables.',
    parentTakeaway: 'Farm worksheets give preschoolers something most themes cannot \u2014 a complete world with its own logic, routines, and cause-and-effect relationships that children grasp intuitively. When your child sorts farm animals from crops, they are practicing the same classification skills that will later support scientific taxonomy. When they count eggs in a basket, they are building the cardinality understanding that will support formal arithmetic. Visit a local farm, farmers market, or petting zoo to transform worksheet learning into multisensory lived experience, and use mealtimes to discuss where foods come from to extend the farm-to-table connection.',
    classroomIntegration: 'Farm worksheets anchor a preschool thematic unit that naturally spans two to three weeks and connects to every learning domain. Set up a dramatic play farm center with toy animals, a play barn, and counting baskets during free choice time. Use farm coloring pages for morning table work, incorporate counting worksheets into small-group math instruction, and connect sorting activities to sensory bin explorations where children dig for plastic vegetables in soil-textured material. Farm songs like Old MacDonald reinforce animal sound-symbol connections from worksheets, and a simple classroom planting activity (seeds in cups) extends the growing sequence children practice on paper into hands-on scientific observation.',
    assessmentRubric: [
      { skill: 'Farm category sorting', emerging: 'sorts farm items into two groups with teacher modeling', proficient: 'independently sorts into animals, crops, and tools and names each group', advanced: 'sorts into three categories, explains sorting rationale, and identifies items that could belong to more than one group' },
      { skill: 'Counting farm objects', emerging: 'counts to 3 farm items with one-to-one correspondence', proficient: 'counts to 7 farm items, matches to numeral, and uses farming context words like three eggs', advanced: 'counts to 10+, compares two farm groups, and creates simple story problems like if the farmer picks 4 apples and then 2 more' },
      { skill: 'Farm sequence understanding', emerging: 'identifies first and last in a two-step farm sequence with picture support', proficient: 'orders a three-step farm sequence like plant, water, pick correctly', advanced: 'orders a three-step sequence, explains why each step comes in that order, and predicts what happens next' },
    ],
  },

  // ── Zoo ──────────────────────────────────────────────────────────────
  {
    name: 'zoo',
    uniqueGradeAngle: 'Preschool is the perfect stage for zoo worksheets because three- and four-year-olds are in the peak period of wonder and curiosity about exotic creatures they cannot encounter in daily life \u2014 and the zoo provides a structured, curated window into global biodiversity that transforms awe into academic engagement. Unlike generic animal themes that mix familiar and exotic creatures, zoo worksheets specifically leverage the excitement of rare, dramatic animals (lions, elephants, giraffes, penguins) that preschoolers find thrilling precisely because they are extraordinary, creating an anticipation-driven motivation loop where children eagerly approach each new worksheet to discover which spectacular creature appears next.',
    developmentalMilestones: [
      { milestone: 'Size comparison and spatial vocabulary (preschoolers are developing concepts of big and small, tall and short)', howWeAddress: 'zoo animals provide the most dramatically different sizes available (ant-sized to elephant-sized), making size comparison worksheets viscerally meaningful rather than abstract' },
      { milestone: 'Habitat and environment awareness (preschoolers are beginning to understand that different creatures live in different places)', howWeAddress: 'zoo-themed sorting activities where children match animals to enclosure types build the habitat-classification reasoning that supports early science' },
      { milestone: 'Counting and quantity comparison with high-motivation visuals (exotic animals sustain attention longer than familiar objects)', howWeAddress: 'find-and-count and image-addition worksheets use spectacular zoo animals that maintain focus through the novelty and excitement factor' },
    ],
    differentiationNotes: 'For struggling preschoolers, focus on three to four most recognizable zoo animals (lion, elephant, monkey, giraffe) and use size as the primary sorting attribute since zoo animals offer the most dramatic size contrasts of any theme; pair every worksheet with a stuffed zoo animal for tactile reinforcement. For advanced preschoolers, introduce continent-based sorting (African animals vs. Arctic animals), extend counting to larger zoo groups, and ask children to verbally describe what makes each animal special using descriptive vocabulary like striped, spotted, enormous, and tiny.',
    parentTakeaway: 'Zoo worksheets tap into a motivation source that is unique to the preschool years \u2014 the sense of wonder and amazement at creatures that seem almost magical. When your three- or four-year-old gasps at a giraffe illustration, that emotional response is building a memory scaffold that makes the counting, matching, and sorting on the worksheet significantly more memorable. Plan a zoo visit to coincide with a zoo worksheet unit, and bring worksheets along to complete in front of the real animals. The combination of paper learning and real observation creates connections that pure worksheet practice or pure observation alone cannot match.',
    classroomIntegration: 'Zoo worksheets support a multi-week preschool thematic unit built around a classroom zoo dramatic play center. Set up enclosures using blocks, populate them with plastic zoo animals sorted by habitat, and create a ticket booth counting station. Use zoo coloring pages for arrival work, incorporate counting worksheets into the dramatic play rotation, and connect size comparison activities to a classroom height chart where children measure themselves against animal heights marked on the wall. A virtual zoo visit via video extends the theme for classrooms that cannot take field trips, and zoo animal movement activities (stomp like an elephant, stretch like a giraffe) bridge worksheets to gross motor development.',
    assessmentRubric: [
      { skill: 'Zoo animal size comparison', emerging: 'identifies the biggest animal in a pair with teacher prompting', proficient: 'independently orders three zoo animals by size and uses vocabulary like biggest, smallest, taller', advanced: 'orders four or more animals by size, compares using multiple size words, and explains reasoning like the giraffe is taller because of its long neck' },
      { skill: 'Counting zoo animals', emerging: 'counts to 3 zoo animals with one-to-one correspondence', proficient: 'counts to 7 zoo animals reliably and identifies the matching numeral', advanced: 'counts to 10+, compares two enclosure groups, and answers which has more or fewer' },
      { skill: 'Zoo animal recognition and classification', emerging: 'names 3-4 common zoo animals from illustrations', proficient: 'names 6+ zoo animals and sorts them into two habitat groups like water and land', advanced: 'names 8+ animals, sorts by habitat, and describes one adaptation for each like the penguin swims because it has flippers' },
    ],
  },

  // ── Birds ────────────────────────────────────────────────────────────
  {
    name: 'birds',
    uniqueGradeAngle: "Preschool is the ideal stage for bird worksheets because three- and four-year-olds are developing their observational skills through the most accessible wildlife observation opportunity available \u2014 birds are everywhere, every day, in every environment preschoolers inhabit. Unlike zoo or ocean animals that require special trips to encounter, birds appear in backyards, parks, playgrounds, and even through classroom windows, making bird worksheets the ONLY animal-adjacent theme where every single academic concept practiced on paper can be immediately verified through real-world observation in the child's daily environment. This constant observation-verification loop accelerates learning in a way no other creature theme can match at the preschool level.",
    developmentalMilestones: [
      { milestone: 'Color recognition and naming through vivid plumage (preschoolers are mastering basic color identification)', howWeAddress: 'bird coloring pages and matching activities feature the most dramatic natural color variety of any animal group, reinforcing color names through visually spectacular illustrations' },
      { milestone: 'Auditory discrimination and sound-symbol mapping (preschoolers are developing the ability to distinguish between similar sounds)', howWeAddress: 'bird call recognition activities build the auditory discrimination skills that directly support phonemic awareness and early reading' },
      { milestone: 'Observation and attention to detail (preschoolers are learning to look carefully and notice specific features)', howWeAddress: 'shadow-match and odd-one-out bird worksheets train the careful visual scanning that supports letter discrimination and reading readiness' },
    ],
    differentiationNotes: 'For struggling preschoolers, start with three highly recognizable birds (robin, duck, owl) and use real bird sounds alongside worksheets to create multi-sensory connections; reduce matching activities to two to three bird pairs with high-contrast visual differences. For advanced preschoolers, introduce bird feature vocabulary (beak, feathers, wings, nest, egg), extend counting to bird-in-tree scenes with ten or more items, and encourage children to keep a simple bird observation tally of species they spot outside the classroom window.',
    parentTakeaway: 'Bird worksheets offer a unique advantage at the preschool level \u2014 they connect to wildlife your child can observe every single day without any special equipment or field trips. After completing a bird worksheet, step outside with your child and look for real birds together. Ask them to count the birds they see, notice colors they recognize from their worksheet, and listen for different bird songs. This immediate paper-to-reality transfer is something most animal themes cannot provide, and it builds the observation habit that scientists, writers, and mathematicians all share. Keep a simple bird tally chart on the refrigerator to extend worksheet counting into a long-term data collection project.',
    classroomIntegration: 'Bird worksheets integrate into preschool programming through a bird observation unit that transforms ordinary outdoor time into scientific investigation. Mount a simple bird feeder visible from the classroom window and use it as a daily counting and observation station. Pair coloring worksheets with read-alouds about bird habitats, connect matching activities to an indoor bird nest building station using natural materials, and use shadow-match worksheets as an introduction to birdwatching during outdoor play. The cross-curricular connections to science (flight, feathers, eggs, nests), math (counting, sorting by color or size), and language (bird names, descriptive vocabulary, sound words) make birds a natural anchor for an integrated early learning unit that extends across the full school day.',
    assessmentRubric: [
      { skill: 'Bird color recognition', emerging: 'names the color of one bird feature when asked by teacher', proficient: 'independently identifies and names two to three colors on a bird illustration', advanced: 'names multiple colors, describes patterns like the bird has a red chest and brown wings, and compares colors across two different birds' },
      { skill: 'Counting birds in scenes', emerging: 'counts to 3 birds in a simple scene with one-to-one pointing', proficient: 'counts to 5-7 birds in a detailed scene and identifies the matching numeral', advanced: 'counts to 10+ birds, compares groups in different parts of the scene, and uses comparison vocabulary' },
      { skill: 'Bird observation and description', emerging: 'points to a bird feature like beak or wing when named by teacher', proficient: 'names three bird body parts independently and matches birds to their shadows', advanced: 'names body parts, describes their function like wings are for flying, and identifies which bird does not belong in a group with explanation' },
    ],
  },
];

// ── Injection ────────────────────────────────────────────────────────────

let successCount = 0;

for (const theme of themes) {
  const filePath = path.join(BASE, theme.name, 'en.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Detect line endings
  const nl = content.includes('\r\n') ? '\r\n' : '\n';

  // Build injection block
  const injection = buildInjection(theme, nl);

  // Pattern: end of faq array ], then close preschool }, then 'kindergarten':
  // Uses a regex that handles both \n and \r\n
  const pattern = /(      \],)\r?\n(    \},)\r?\n(    'kindergarten':)/;

  if (!pattern.test(content)) {
    console.error(`ERROR: Injection pattern not found in ${theme.name}/en.ts`);
    process.exit(1);
  }

  // Check if already injected
  if (content.includes("uniqueGradeAngle: '") && content.indexOf("uniqueGradeAngle: '") < content.indexOf("'kindergarten':")) {
    console.log(`SKIP: ${theme.name}/en.ts already has uniqueGradeAngle in preschool section`);
    continue;
  }

  content = content.replace(pattern, `$1${nl}${injection}${nl}$2${nl}$3`);

  fs.writeFileSync(filePath, content, 'utf8');
  successCount++;
  console.log(`OK: Injected 6 preschool fields into ${theme.name}/en.ts`);
}

console.log(`\nDone! ${successCount} of ${themes.length} themes enriched.`);
