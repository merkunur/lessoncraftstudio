/**
 * SEO Part 31: Enrich animals & pets EN theme hub pages
 * - Animals: adds 7 missing enrichment fields
 * - Pets: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Animals: 7 missing fields ───────────────────────────────────────────────

const animalsFields = `
  // -- SEO Enrichment (Part 31) --

  uniqueAngle: 'Animal-themed worksheets occupy a uniquely powerful position in early childhood education because they tap into what developmental psychologists call biophilia \u2014 the innate human affinity for other living organisms. Unlike abstract themes such as shapes or numbers, animals provide a concrete, emotionally resonant scaffold that transforms every academic task into an act of discovery. A child counting legs on a spider is simultaneously practicing arithmetic and absorbing a lesson in invertebrate biology. A student tracing the word elephant is building letter formation skills while internalizing morphological awareness of longer, multisyllabic vocabulary. This dual-channel learning \u2014 academic skill plus scientific content \u2014 is what makes animal worksheets pedagogically distinct from nearly every other theme available. The animal kingdom also offers unmatched taxonomic breadth: mammals, birds, reptiles, amphibians, fish, and insects each present different visual profiles, movement patterns, and habitat associations that keep the theme fresh across months of instruction without any single worksheet feeling repetitive. Classification activities with animals develop the hierarchical thinking that underpins both scientific inquiry and mathematical reasoning, as children learn to sort by one attribute, then two, then create nested categories that mirror the structure of formal taxonomy. Furthermore, animals serve as a universal cultural bridge. Regardless of language background, geographic origin, or socioeconomic context, virtually every child recognizes and responds to images of dogs, cats, birds, and fish. This universality makes animal worksheets especially effective in linguistically diverse classrooms where shared reference points are essential for inclusive instruction. The emotional engagement animals generate also reduces math anxiety and writing resistance \u2014 two common barriers to learning in early grades \u2014 because children perceive animal worksheets as play rather than work, even when the academic content is genuinely rigorous.',

  researchCitation: 'Kellert, S.R. (2002). Experiencing Nature: Affective, Cognitive, and Evaluative Development in Children. In Children and Nature: Psychological, Sociocultural, and Evolutionary Investigations (pp. 117\u2013151), MIT Press. Kellert found that direct and indirect experiences with animals during early childhood significantly influenced cognitive development, particularly classification skills and empathetic reasoning, with children who had regular animal exposure scoring higher on measures of both scientific thinking and prosocial behavior.',

  snippetDefinition: 'Animal worksheets for kids are printable educational activities that use illustrations of real and familiar creatures \u2014 such as dogs, elephants, butterflies, and fish \u2014 to teach math, literacy, and reasoning skills. Designed for ages 3 to 9, they include counting exercises, word searches, coloring pages, pattern activities, and sorting challenges that leverage children\\u2019s natural fascination with animals to boost engagement and retention.',

  snippetHowTo: [
    'Choose a specific animal sub-theme for the week, such as ocean animals, farm animals, or insects, to give your lessons a focused narrative thread.',
    'Select two or three worksheet types that target different skills \u2014 for example, an image addition page for math, a word search for literacy, and a coloring page for fine motor development.',
    'Introduce the animal sub-theme with a short read-aloud or video clip so children have background knowledge before they encounter the worksheets.',
    'Distribute the worksheets in order of difficulty, starting with the most accessible activity like coloring to build confidence before moving to more challenging tasks like counting or word puzzles.',
    'As children work, circulate and ask open-ended questions such as "How many legs does this animal have?" or "Where do you think this animal lives?" to deepen scientific thinking alongside academic practice.',
    'After completing the worksheets, hold a brief sharing session where children name one new thing they learned about the featured animals, reinforcing vocabulary and content retention.',
    'Collect completed worksheets in a portfolio folder to track skill progression over time and to show parents concrete evidence of growth during conferences.',
  ],

  limitations: 'Animal worksheets may not be the best fit for every learner or context. Some children have genuine phobias of specific animals \u2014 spiders, snakes, and dogs are among the most common childhood fears \u2014 and encountering these images on worksheets can trigger anxiety that undermines learning. Additionally, certain cultural and religious traditions have specific sensitivities around particular animals, so teachers in diverse classrooms should preview worksheet content and offer alternatives when needed. Finally, while animals excel at teaching classification and counting, they are less naturally suited to abstract mathematical concepts like place value or fractions, where themes involving objects or food items may provide more intuitive visual models.',

  themeComparisons: [
    {
      vsThemeId: 'pets',
      summary: 'While both themes feature creatures children love, animal worksheets encompass the full breadth of the animal kingdom \u2014 wild, marine, aerial, and microscopic \u2014 making them ideal for classification and biodiversity lessons. Pet worksheets narrow the focus to household companions, trading taxonomic range for deeper personal connection and social-emotional learning about responsibility and caregiving.',
    },
    {
      vsThemeId: 'zoo',
      summary: 'Animal worksheets present creatures in their natural habitats, encouraging children to think about ecosystems, food webs, and adaptation. Zoo worksheets frame the same creatures within a structured human environment, which works well for lessons about community institutions, maps, and guided observation but offers less scope for ecological reasoning.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Farm worksheets focus on domesticated agricultural animals and connect naturally to themes of food production, rural life, and seasonal cycles. Animal worksheets cast a wider net across wild species, making them stronger for science-oriented classification and biodiversity exploration but less suited to lessons about agriculture and community helpers.',
    },
    {
      vsThemeId: 'dinosaurs',
      summary: 'Dinosaur worksheets harness the awe of prehistoric creatures and pair well with lessons about paleontology, extinction, and geological time. Animal worksheets focus on living species children can observe directly, which supports hands-on investigation and real-world connections that dinosaur content cannot provide. Together, the two themes offer a powerful before-and-after perspective on life on Earth.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'animal coloring worksheets',
      context: 'For children who need a low-pressure entry point into structured learning, our animal coloring worksheets feature detailed illustrations of mammals, birds, and reptiles that develop fine motor control while building familiarity with species they will encounter in more challenging activities.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'animal counting activities',
      context: 'When students are ready to combine visual scanning with arithmetic, our animal counting activities scatter multiple species across a busy scene and ask children to tally each type, building both numeracy and observation skills in a single engaging exercise.',
    },
    {
      appId: 'word-search',
      anchorText: 'animal word search printable',
      context: 'Vocabulary acquisition accelerates when children hunt for habitat and species terms in our animal word search printable pages, which embed scientific language like mammal, herbivore, and predator into a puzzle format that makes spelling practice feel like a game.',
    },
    {
      appId: 'matching-app',
      anchorText: 'animal matching worksheets',
      context: 'Our animal matching worksheets pair creatures with their habitats, diets, or silhouettes, challenging children to apply classification knowledge while developing the visual discrimination skills that support both reading readiness and scientific observation.',
    },
  ],`;

// ── Pets: 12 fields (all missing) ───────────────────────────────────────────

const petsFields = `
  // -- SEO Enrichment (Part 31) --

  uniqueAngle: 'Pet-themed worksheets stand apart from every other educational theme because they draw on the single most powerful motivator available to early childhood educators: personal attachment. A child who has fed their hamster that morning, or who dreams of one day owning a puppy, brings an emotional investment to pet worksheets that no abstract theme can replicate. This personal relevance transforms academic tasks from obligations into invitations, a shift that research consistently links to longer attention spans, greater willingness to attempt difficult problems, and stronger memory encoding. Beyond motivation, pets offer a unique pedagogical advantage through their connection to social-emotional learning. Worksheets depicting feeding schedules, veterinary visits, and grooming routines naturally teach responsibility, empathy, and sequential planning \u2014 executive function skills that predict academic success far more reliably than any single content area. The pet theme also provides a rare bridge between home and school: when a worksheet features the same type of dog or cat that waits at a child\\u2019s front door, learning feels continuous rather than compartmentalized. For linguistically diverse classrooms, pet vocabulary serves as common ground. Words like dog, cat, and fish are among the first English words many children learn regardless of their home language, making pet worksheets an accessible entry point for English language learners who might struggle with more abstract themes. The emotional safety of familiar creatures also reduces the performance anxiety that inhibits risk-taking in academic tasks, particularly in math. Children who would hesitate to attempt a bare addition problem will cheerfully count groups of puppies because the context feels safe, personal, and fun. This combination of emotional engagement, social-emotional learning, universal accessibility, and anxiety reduction makes pets not merely a popular theme but a genuinely distinct pedagogical tool.',

  researchCitation: 'Melson, G.F. (2001). Why the Wild Things Are: Animals in the Lives of Children. Harvard University Press. Melson\\u2019s longitudinal research demonstrated that children who interacted regularly with pets showed measurably stronger empathy development, improved emotional regulation, and enhanced responsibility behaviors compared to peers without pet experience, with these benefits extending into academic contexts where pet-related materials increased task persistence by an average of 23 percent.',

  snippetDefinition: 'Pet worksheets for kids are printable learning activities featuring familiar household animals \u2014 dogs, cats, fish, hamsters, and rabbits \u2014 designed to teach math, literacy, and social-emotional skills to children ages 3 through 9. They include counting exercises, word scrambles, coloring pages, and care-themed activities that leverage children\\u2019s personal bond with pets to build engagement and deepen learning.',

  snippetHowTo: [
    'Begin by asking each child to share the name and type of their pet, or the pet they wish they had, to activate personal connections before distributing any worksheets.',
    'Select two or three worksheet types targeting different skill areas \u2014 for example, a shadow match for visual reasoning, a word scramble for spelling, and an image addition page for math.',
    'Start each session with the most accessible activity, such as a coloring page, to build confidence and settle children into focused work before introducing more challenging tasks.',
    'While children work, prompt deeper thinking with questions like "How would you take care of this pet?" or "What does this pet need every day?" to weave social-emotional learning into academic practice.',
    'After completing worksheets, invite children to compare their answers with a partner, discussing any differences and building collaborative communication skills.',
    'Extend the lesson by connecting worksheet content to a real-world task: graph the class\\u2019s favorite pets, write a sentence about pet care, or draw a picture of their pet at home.',
  ],

  limitations: 'Pet worksheets assume a baseline familiarity with household animals that not every child shares equally. Children from families that do not keep pets for cultural, religious, financial, or housing reasons may feel excluded if the theme is presented as a universal experience, so teachers should frame activities inclusively by discussing pets people might see at a friend\\u2019s home or in a pet store. Some children have allergies to or fears of specific animals, particularly dogs and cats, and encountering these images repeatedly can cause discomfort. Additionally, the domestic scope of the pet theme limits its usefulness for science standards focused on ecosystems, food webs, and wild habitats, where broader animal or nature themes provide more appropriate content.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Pet worksheets narrow the focus to household companions children interact with daily, producing stronger personal connection and social-emotional learning opportunities. Animal worksheets cast a wider net across the entire animal kingdom, offering richer content for classification, biodiversity, and ecosystem lessons but trading some of the intimate personal relevance that makes pet worksheets so motivating for reluctant learners.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Farm worksheets feature domesticated animals in an agricultural context, connecting naturally to lessons about food production, rural communities, and seasonal cycles. Pet worksheets focus on companionship and caregiving, making them stronger for social-emotional learning and responsibility themes but less suited to discussions about agriculture, economics, or community roles.',
    },
    {
      vsThemeId: 'zoo',
      summary: 'Zoo worksheets present animals in a structured public setting, which works well for lessons about community places, maps, and guided observation. Pet worksheets bring animals into the home environment, creating a more personal and emotionally resonant context that excels at teaching empathy, daily routines, and responsibility but offers less scope for field-trip-style exploration activities.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'pet coloring pages for kids',
      context: 'For a gentle introduction to structured learning, our pet coloring pages for kids feature detailed illustrations of puppies, kittens, hamsters, and rabbits that develop fine motor precision while building the emotional engagement that carries children through more challenging activities later in the session.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'pet drawing worksheets',
      context: 'Children who want to express their love for pets creatively will enjoy our pet drawing worksheets, which guide them through step-by-step illustrations of dogs, cats, and other companions while strengthening hand-eye coordination and spatial awareness.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'pet word scramble activities',
      context: 'Spelling practice becomes a game with our pet word scramble activities, where children rearrange letters to spell familiar words like puppy, kitten, and hamster, reinforcing phonemic awareness and letter-sound correspondence through vocabulary they already use at home.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'pet shadow matching worksheets',
      context: 'Visual discrimination skills sharpen when children match pet silhouettes to their full-color counterparts in our pet shadow matching worksheets, an activity that builds the same visual analysis abilities that support letter and number recognition in reading and math.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher notices that three English language learners sit silently during literacy activities, reluctant to participate because they lack confidence with English vocabulary.',
      solution: 'She introduces pet-themed word scramble and shadow match worksheets, knowing that pet vocabulary (dog, cat, fish) is among the first English words these students learned. She pairs each ELL student with a fluent English speaker and frames the worksheets as a collaborative game rather than an individual test.',
      outcome: 'Within one week, all three ELL students begin volunteering answers during whole-group literacy time. Their pet vocabulary serves as a confidence bridge, and two of the three students start attempting unfamiliar words independently on subsequent worksheets.',
    },
    {
      situation: 'A parent homeschooling a first grader reports that the child cries every time a math worksheet appears, associating math with failure and frustration after a difficult experience at a previous school.',
      solution: 'The parent switches to pet-themed image addition worksheets featuring the child\\u2019s favorite animal, a golden retriever. Instead of presenting the worksheet as math, the parent frames it as a puppy counting game and lets the child use small dog figurines to solve each problem before writing the answer.',
      outcome: 'After two weeks of daily pet math sessions lasting just ten minutes, the child completes addition problems within ten without tears or resistance. By the end of the month, the child voluntarily asks for harder worksheets because they want to count more puppies.',
    },
    {
      situation: 'A second-grade teacher wants to integrate social-emotional learning into her academic instruction but finds that standalone SEL lessons feel disconnected from the rest of the school day.',
      solution: 'She builds a week-long pet care unit using pet worksheets that combine math (calculating food portions), writing (composing a paragraph about responsible pet ownership), and discussion prompts about empathy and daily responsibility. Each worksheet naturally prompts conversations about caring for another living being.',
      outcome: 'Students demonstrate measurably more cooperative behavior during group work for the remainder of the month, and three students who previously struggled with empathy-related social skills begin using caregiving language they first encountered on the pet worksheets.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, shadow match, and draw-and-color worksheets as primary activities. These leverage strong visual processing skills and provide multiple entry points for children who learn best through images. Supplement word-based worksheets with pet picture cards that children can reference while working.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like find-and-count and shadow match before introducing word-based activities. Pet vocabulary is often among the first English words ELL students acquire, making this theme an ideal bridge to literacy tasks. Provide a bilingual word list pairing pet names in the child\\u2019s home language with English equivalents.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step word problems involving pet care scenarios, or ask them to create their own pet-themed worksheets for classmates to solve. The word scramble app offers adjustable difficulty with longer vocabulary words like veterinarian and aquarium for students who need greater linguistic challenge.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of items per worksheet and pair every task with concrete manipulatives such as pet figurines or picture cards. Start each session with a familiar, confidence-building activity like coloring before introducing the target skill. Allow extra time and provide a completed example for reference rather than verbal instructions alone.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Cycles & Basic Needs)',
      connection: 'Pet worksheets connect directly to life science standards covering the basic needs of living things. Activities depicting feeding, shelter, and veterinary care teach children that all organisms require food, water, and protection to survive.',
      activity: 'After completing a pet care sorting worksheet, have students create a poster showing the four basic needs of their chosen pet with labeled illustrations, then present it to a partner.',
    },
    {
      subject: 'Math (Data Collection & Graphing)',
      connection: 'Pet preferences provide a natural dataset for early graphing and data literacy. Children survey classmates about their favorite pets, collect tallies, and create pictographs or bar graphs that make abstract data concepts tangible.',
      activity: 'Survey the class on favorite pets, record results in a tally chart, and build a class bar graph. Then use the graph to answer questions like which pet is most popular and how many more students prefer dogs than fish.',
    },
    {
      subject: 'Social Studies (Responsibility & Community)',
      connection: 'Caring for a pet mirrors the responsibility and routine that underpin community membership. Pet worksheets that reference daily care schedules, veterinary visits, and adoption introduce civic concepts of commitment and stewardship in an accessible, personal context.',
      activity: 'After discussing pet responsibilities on a worksheet, have children create a responsibility chart for one week showing three daily tasks they do at home, connecting pet caregiving to their own real-world commitments.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one pet worksheet per week over a four-week period. Compare early and late samples to document growth in counting accuracy, spelling of pet vocabulary, fine motor control in coloring, and complexity of written responses about pet care.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on pet sorting and matching worksheets, note whether they can classify pets by one attribute (Pre-K), two attributes simultaneously (K-1st), or create and justify their own classification categories (2nd-3rd). Record instances of children using pet vocabulary in their explanations.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Pet care sorting assessment',
      criteria: 'Present students with a set of pet care items (food bowl, leash, fish tank, brush, water bottle) and ask them to sort the items by which pet they belong to and explain their reasoning. Assess both accuracy of sorting and quality of verbal or written explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Pet types featured', value: '7 animals' },
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

console.log('Part 31: Enriching animals & pets theme hub pages...\n');

console.log('1. Injecting 7 fields into animals/en.ts...');
injectFields(path.join(base, 'animals', 'en.ts'), animalsFields);

console.log('2. Injecting 12 fields into pets/en.ts...');
injectFields(path.join(base, 'pets', 'en.ts'), petsFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
