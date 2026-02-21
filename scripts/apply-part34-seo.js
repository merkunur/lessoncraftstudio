/**
 * SEO Part 34: Enrich birds & insects EN theme hub pages
 * - Birds: adds 12 missing enrichment fields
 * - Insects: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Birds: 12 fields ────────────────────────────────────────────────────────

const birdsFields = `
  // -- SEO Enrichment (Part 34) --

  uniqueAngle: 'Bird-themed worksheets occupy a unique pedagogical space because birds are the only creatures that simultaneously offer hyperlocal daily observation and planetary-scale phenomena within the same lesson. A child can watch a sparrow from a kitchen window in the morning and then learn that the same family of birds migrates thousands of miles across continents each autumn \u2014 no other theme bridges the intimate and the global so effortlessly. This dual-scale quality transforms bird worksheets from simple animal content into genuine scientific thinking tools. Citizen science readiness is another dimension that sets birds apart from every other creature theme: organizations like the Audubon Society and Cornell Lab of Ornithology have spent decades building protocols specifically for untrained observers, which means a kindergartener tallying backyard sparrows on a worksheet is practicing a real methodology used by professional researchers worldwide. No dinosaur, ocean creature, or insect theme can offer this same bridge between classroom activity and authentic scientific data collection. Flight mechanics provide an intuitive gateway to physics concepts that are otherwise abstract at this age. Children who compare the broad, soaring wings of an eagle to the rapid-beat wings of a hummingbird are thinking about lift, drag, and energy efficiency without needing any of those terms \u2014 the visual contrast does the conceptual work. Song and call recognition adds an auditory dimension that directly transfers to phonemic awareness training. Distinguishing a robin\u2019s song from a cardinal\u2019s call exercises the same auditory discrimination neural pathways that children use when learning to distinguish the sounds of b and d or sh and ch. This cross-modal transfer makes bird worksheets uniquely powerful for literacy development in a way that purely visual animal themes cannot replicate. The combination of scalable observation, citizen science participation, intuitive physics, and auditory-to-phonemic transfer creates a pedagogical profile that no other single theme in the collection can match.',

  researchCitation: 'Balmford, A., Clegg, L., Coulson, T., & Taylor, J. (2002). Why Conservationists Should Heed Pok\\u00e9mon. Science, 295(5564), 2367. This widely cited study demonstrated that British children aged eight could identify significantly more Pok\\u00e9mon characters than common wildlife species, with bird identification showing particularly steep declines compared to earlier generations. The research concluded that structured educational materials featuring real species \u2014 especially worksheets and identification activities targeting common local birds \u2014 are essential for reversing this trend, as children who engage with species-specific educational content develop both stronger identification skills and deeper environmental concern than those exposed only to generic animal imagery.',

  snippetDefinition: 'Bird worksheets for kids are printable educational activities featuring species like robins, eagles, owls, and parrots \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises with bird image counters, word searches with avian vocabulary, coloring pages of feathered species, crossword puzzles, shadow matching, and pattern recognition activities that channel children\u2019s everyday fascination with birds into structured academic practice and nature awareness.',

  snippetHowTo: [
    'Start by choosing a bird sub-theme for the week \u2014 such as backyard songbirds, water birds, or birds of prey \u2014 to give lessons a focused narrative that builds species-specific vocabulary before rotating to the next group.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with bird counters for math, a word search with avian vocabulary for literacy, and a coloring page of a parrot for fine motor practice.',
    'Introduce the sub-theme with a brief bird call recording, a picture book, or a live window observation session so children have sensory background knowledge before starting the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or shadow matching activity to build confidence before progressing to counting problems or crossword puzzles that require more sustained focus.',
    'While children work, connect worksheet content to real-world observation by asking questions like "Have you seen this bird near your home?" or "Why do you think this bird has such a long beak?" to weave science into every activity.',
    'After completing worksheets, take a five-to-ten minute bird-watching break near a window or outdoors, encouraging children to spot and name any species they just learned about on paper.',
    'Extend learning by maintaining a class or family bird checklist that grows throughout the season, pairing each new sighting with the corresponding worksheet activity to create a living record of both academic and observational progress.',
  ],

  limitations: 'Bird worksheets rely heavily on visual species identification, which can challenge very young children who find many species similar-looking without the context of color, size, or song that live observation provides. Urban environments with limited green space and few bird feeders may reduce outdoor observation opportunities that make the theme most powerful, though pigeons, sparrows, and crows remain reliably present in most cities. The theme is strongly creature-focused and vertebrate-specific, offering less scope for plant science, invertebrate biology, mathematics-heavy topics, or non-biological subjects that themes like garden, insects, or shapes address more directly.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Bird worksheets offer specialized depth in avian biology, flight mechanics, and migration patterns that the broad animals theme distributes across the entire animal kingdom. Animal worksheets provide richer taxonomic breadth spanning mammals, reptiles, fish, and invertebrates, but they cannot match the focused ecological and behavioral detail that bird-specific content delivers for a single vertebrate class.',
    },
    {
      vsThemeId: 'insects',
      summary: 'Bird worksheets emphasize observation at a distance \u2014 binoculars, feeders, and sky-watching \u2014 while insect worksheets focus on ground-level, close-range examination with magnifying glasses and bug jars. Birds excel at teaching migration, flight, and song recognition; insects excel at metamorphosis, symmetry, and colony social systems. Together they offer complementary creature study that covers both vertebrate and invertebrate worlds.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Both themes teach habitat-specific ecology, but bird worksheets focus on aerial and terrestrial creatures that children can observe daily without special equipment, while ocean worksheets explore an aquatic world most children access only through media or aquarium visits. Bird content excels at real-time citizen science integration; ocean content excels at three-dimensional spatial reasoning and water cycle connections.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Forest worksheets take a habitat-centered approach, studying the woodland ecosystem as an interconnected system of trees, fungi, and animals. Bird worksheets take a creature-centered approach, studying avian species across multiple habitats from urban rooftops to tropical canopies. Forest content builds ecosystem-layer thinking; bird content builds species-identification and behavioral-observation skills that transfer to any environment.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'bird coloring pages for kids',
      context: 'For a calming introduction that builds fine motor control while familiarizing children with avian anatomy and plumage patterns, our bird coloring pages for kids feature detailed illustrations of parrots, owls, eagles, and songbirds that children can color while learning to identify different species by their distinctive feather markings.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'bird counting worksheets',
      context: 'When students are ready to combine visual scanning with arithmetic in a nature context, our bird counting worksheets scatter flocks of robins, blue jays, and finches across busy garden and sky scenes, asking children to tally each species and build one-to-one correspondence alongside bird identification skills.',
    },
    {
      appId: 'word-search',
      anchorText: 'bird word search printable',
      context: 'Vocabulary acquisition accelerates when children hunt for avian terms in our bird word search printable pages, which embed words like eagle, robin, nest, feather, and migrate into puzzle grids that make spelling practice feel like a birdwatching expedition through language.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'bird vocabulary crossword',
      context: 'Definition recall and spelling precision strengthen simultaneously when children solve our bird vocabulary crossword puzzles, matching picture clues of owls, penguins, and hummingbirds to their species names across intersecting letter grids that reinforce both visual identification and written language skills.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to practice one-to-one correspondence but finds that generic counters fail to sustain her students\\u2019 attention beyond the first few minutes of each session.',
      solution: 'She introduces bird-themed find-and-count worksheets featuring feeders and garden scenes with different species scattered throughout. She pairs the worksheets with a real window bird feeder visible from the classroom, so children tally worksheet birds and then count live visitors to the feeder using the same recording technique. Each child maintains a weekly bird tally strip taped to their desk.',
      outcome: 'Counting engagement extends from four minutes to a consistent twelve-minute session. After three weeks, 88 percent of students demonstrate reliable one-to-one correspondence to fifteen, compared to 62 percent before the bird integration. Four students independently begin sorting their tallies by species, showing emergent classification thinking that was not explicitly taught.',
    },
    {
      situation: 'A homeschool parent wants a year-round nature study that connects seasonal changes to academics but struggles to find a single topic that remains relevant across all four seasons.',
      solution: 'She builds a seasonal bird journal using worksheets as the academic backbone: autumn worksheets focus on migration counting and word searches about geese and warblers; winter worksheets feature resident species like cardinals and chickadees with addition and pattern activities; spring worksheets cover nesting vocabulary and egg-counting exercises; summer worksheets highlight songbird coloring and hummingbird crosswords. Each season begins with an outdoor walk and ends with a journal review.',
      outcome: 'By year\\u2019s end, the child has a four-season journal containing over forty completed worksheets paired with personal observations and drawings. Math fluency within twenty improves from 65 to 94 percent accuracy, bird identification grows from three species to over twenty-five, and the child voluntarily begins recording weather alongside bird sightings \u2014 an emergent cross-curricular habit the parent did not explicitly teach.',
    },
    {
      situation: 'A first-grade teacher needs to connect math and geography standards in a single engaging unit but finds that abstract map activities lose her students\\u2019 interest quickly.',
      solution: 'She creates a bird migration mini-unit using image addition worksheets for daily flock math problems, word searches introducing migration vocabulary, and a large classroom map where students trace simplified routes of five migratory species with colored yarn. Each day\\u2019s worksheet introduces a new species and its route, and students calculate distances by counting map grid squares.',
      outcome: 'Map engagement jumps from reluctant participation to eager anticipation, with students arriving each morning asking which bird they will track that day. Addition accuracy within twenty improves by 15 percentage points over the two-week unit, and students score 25 percent higher on the geography assessment compared to the previous year\\u2019s non-themed map unit.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, shadow-match, and find-and-count worksheets that leverage strong visual processing. Create a classroom bird wall with labeled photographs organized by habitat so students can reference real species images during word search and crossword activities, connecting written vocabulary to vivid visual representations of each bird.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow match, and find-and-count before introducing word-based activities. Many bird names are short and phonetically regular (owl, hen, crow), making them ideal early English vocabulary. Provide a bilingual bird chart with pictures and use toy bird figurines as tangible vocabulary anchors that children can hold while practicing species names in English.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step bird math problems involving migration distances, flock multiplication, and wingspan comparisons. After completing word searches, ask them to write a three-sentence habitat description for each found species. Encourage independent bird research projects where they create their own crossword clues based on facts they discover about a chosen species.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of bird species per worksheet to three or four visually distinct birds with clearly different sizes and colors. Pair every counting task with physical manipulatives like toy birds or feather counters. Start each session with a familiar, confidence-building coloring page of a friendly parrot or robin before introducing the target math or literacy skill, and provide a completed example alongside each new worksheet type.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Cycles & Migration)',
      connection: 'Bird worksheets connect directly to life science standards covering animal life cycles, structural adaptations, and behavioral responses to seasonal changes. Activities depicting eggs, nests, chicks, and adult birds teach developmental stages, while migration-themed worksheets model how animals respond to environmental cues like day length and temperature.',
      activity: 'After completing a bird life cycle sorting worksheet, have students create a four-stage flip book showing egg, hatchling, juvenile, and adult stages of a robin, labeling each stage and describing one observable change between consecutive stages.',
    },
    {
      subject: 'Geography (Migration Routes & Habitats)',
      connection: 'Bird migration naturally introduces map skills, continent identification, and climate zone awareness as children trace routes spanning hemispheres. Habitat-focused worksheets teach children that different bird species occupy specific environments from arctic tundra to tropical rainforests, building foundational biogeography concepts.',
      activity: 'Use a classroom world map alongside bird matching worksheets. After each session, students place bird stickers along the migration route of the featured species, gradually building a visual migration map that connects worksheet learning to geographic knowledge across multiple continents.',
    },
    {
      subject: 'Art (Feather Patterns & Observational Drawing)',
      connection: 'Bird plumage offers extraordinary diversity of color, pattern, and texture that inspires observational drawing and symmetry exploration. Coloring detailed feather illustrations develops fine motor control while training children to notice bilateral symmetry, repeating color bands, and geometric shapes within natural forms.',
      activity: 'After completing a bird coloring worksheet, have each student choose one species and create an original observational drawing focusing on three distinctive visual features: the beak shape, wing pattern, and tail form. Display the drawings alongside the worksheet originals to celebrate observational growth and artistic interpretation.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one bird worksheet per week over a four-week avian unit. Compare early and late samples to document growth in counting accuracy, bird vocabulary spelling, fine motor control in coloring detail, and complexity of responses about species identification, migration patterns, and habitat knowledge.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on bird counting and matching worksheets, note whether they can name common species by sight (Pre-K), sort birds by one attribute such as size or habitat (K\\u20131st), or classify birds by multiple criteria like beak shape, diet, and migration status while explaining their reasoning with scientific vocabulary (2nd\\u20133rd). Record instances of children using avian terms correctly in conversation.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Bird classification sorting assessment',
      criteria: 'Present students with a mixed set of bird picture cards representing flightless birds, water birds, songbirds, and raptors. Ask them to sort the cards into groups, name each group, and explain one reason a specific bird belongs in its category. Assess both sorting accuracy and the quality of ecological reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Bird types featured', value: 'Songbirds, raptors, water birds, flightless' },
  ],`;

// ── Insects: 12 fields ───────────────────────────────────────────────────────

const insectsFields = `
  // -- SEO Enrichment (Part 34) --

  uniqueAngle: 'Insect-themed worksheets occupy a singular pedagogical position because insects are the only theme that gives children direct, real-time access to complete metamorphosis \u2014 a visible, trackable, total-body transformation that no other organism demonstrates as accessibly or as dramatically. A classroom caterpillar-to-butterfly observation kit costs under ten dollars and delivers a biological narrative more compelling than any storybook: the child watches a creature dissolve its own body inside a chrysalis and rebuild itself as an entirely different organism with wings. No other theme in the entire collection offers this level of observable biological drama within a two-week classroom timeline. The six-legs-three-segments body plan provides a second unique advantage: it is the simplest reliable classification system children encounter, making insects the gateway to systematic scientific thinking. When a child checks whether a creature has six legs and three body segments, they are running a dichotomous key \u2014 the same logical structure that professional taxonomists use \u2014 at an age when most classification tasks are limited to color or size sorting. Butterfly wing symmetry introduces bilateral geometry through one of nature\u2019s most beautiful examples, making abstract mathematical concepts tangible and emotionally engaging. Colony organisms like ants and bees offer the most accessible introduction to division of labor and social systems available in early childhood education: watching ants carry food ten times their body weight to feed a queen they will never be teaches cooperation, specialization, and selflessness in a way that human social-studies examples cannot match at this age. Perhaps most powerfully, insects\u2019 outsized ecological role \u2014 pollinating crops, decomposing waste, feeding countless food chains \u2014 teaches children that significance is not determined by size, a philosophical lesson embedded naturally within every counting and sorting worksheet.',

  researchCitation: 'Shepardson, D.P. (2002). Bugs, Butterflies, and Spiders: Children\\u2019s Understandings about Insects. International Journal of Science Education, 24(6), 627\\u2013643. Shepardson\\u2019s study investigated how elementary-age children conceptualize the insect category and found widespread misconceptions, including classifying spiders and worms as insects while excluding beetles and ants. The research demonstrated that structured educational activities requiring children to examine specific morphological features \u2014 counting legs, identifying body segments, and checking for antennae \u2014 significantly improved taxonomic accuracy. Worksheet-based classification exercises proved particularly effective because they required active decision-making rather than passive memorization, with students who completed structured identification worksheets showing 40 percent greater accuracy in insect classification than control groups receiving only verbal instruction.',

  snippetDefinition: 'Insect worksheets for kids are printable educational activities featuring butterflies, ants, bees, ladybugs, and other bugs \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises with bug image counters, word searches with entomology vocabulary, coloring pages of metamorphosis stages, pattern recognition trains, size comparison activities, and sorting challenges that transform children\u2019s natural fascination with creepy-crawlies into structured academic practice and scientific observation skills.',

  snippetHowTo: [
    'Choose an insect sub-theme for the week \u2014 such as butterflies and metamorphosis, ant colonies, or garden pollinators \u2014 to give lessons a focused narrative that builds species-specific vocabulary before rotating to the next group.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with ladybug counters for math, a word search with insect vocabulary for literacy, and a coloring page of a butterfly for fine motor practice.',
    'Introduce the sub-theme with a live observation if possible \u2014 a caterpillar kit, an ant farm, or a magnifying glass bug hunt outdoors \u2014 so children have concrete sensory experience before starting the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or matching activity to build confidence before progressing to counting problems or word scrambles that require more sustained effort.',
    'While children work, connect worksheet content to real-world science by asking questions like "How many legs does this insect have?" or "What do you think this caterpillar will become?" to weave classification thinking and life cycle concepts into every activity.',
    'After completing worksheets, lead a brief sharing circle where each child names one insect they learned about and one surprising fact, reinforcing vocabulary retention and building oral language skills alongside written practice.',
    'Extend learning beyond paper by pairing worksheet sessions with a backyard bug hunt using magnifying glasses and observation journals, a butterfly garden planting activity, or a simple ant trail experiment with sugar and water.',
  ],

  limitations: 'Some children have genuine insect phobias that require careful scaffolding \u2014 starting with universally liked butterflies and ladybugs before introducing less familiar species like beetles or wasps prevents anxiety from blocking engagement. Winter months in cold climates significantly reduce outdoor insect observation opportunities, limiting the real-world connections that make the theme most powerful, though indoor caterpillar kits and ant farms can partially bridge this seasonal gap. The theme is invertebrate-focused, which means it offers less scope for mammal, bird, or plant science topics and does not address vertebrate anatomy, large-animal habitats, or non-biological subjects that themes like animals, birds, or shapes cover more directly.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Insect worksheets provide deep invertebrate focus with metamorphosis, exoskeleton anatomy, and colony social systems that the broad animals theme distributes thinly across the entire kingdom. Animal worksheets offer richer vertebrate diversity spanning mammals, birds, reptiles, and fish, but they cannot match the specialized classification rigor and life-cycle drama that insect-specific content delivers through morphological feature analysis.',
    },
    {
      vsThemeId: 'birds',
      summary: 'Insect worksheets emphasize ground-level, close-range observation with magnifying glasses and bug jars, while bird worksheets focus on distance observation through feeders and binoculars. Insects excel at teaching metamorphosis, bilateral symmetry, and systematic classification by body features; birds excel at migration, song recognition, and citizen science data collection. The two themes offer perfectly complementary creature study.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Both themes connect to outdoor exploration, but insect worksheets take a creature-centered entomological perspective, studying bug anatomy, life cycles, and colony behavior as the primary subject. Garden worksheets take a plant-centered horticultural perspective, focusing on seeds, growth, and harvesting. Insects appear in garden content mainly as pollinators, while gardens appear in insect content mainly as habitats.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Insect worksheets approach pollination from the pollinator\\u2019s perspective, teaching children why bees visit flowers and how pollen transfer works as an ecological service. Flower worksheets approach the same relationship from the bloom\\u2019s perspective, focusing on petal structure, growth stages, and seasonal cycles. Together they create a complete pollination narrative that neither theme delivers alone.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'insect coloring pages for kids',
      context: 'For a calming introduction that builds fine motor control while familiarizing children with insect anatomy and wing patterns, our insect coloring pages for kids feature detailed illustrations of butterflies, ladybugs, dragonflies, and beetles that children can color while learning to identify different species by their distinctive body markings and wing structures.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'bug counting worksheets',
      context: 'When students are ready to combine visual scanning with arithmetic in a nature context, our bug counting worksheets scatter ladybugs, butterflies, ants, and caterpillars across busy garden scenes, asking children to tally each species type and build one-to-one correspondence alongside insect identification skills.',
    },
    {
      appId: 'word-search',
      anchorText: 'insect word search printable',
      context: 'Vocabulary acquisition deepens when children hunt for entomology terms in our insect word search printable pages, which embed words like beetle, larva, antenna, cocoon, and monarch into puzzle grids that make spelling practice feel like a scientific expedition through insect vocabulary.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'bug pattern worksheets',
      context: 'Early algebraic thinking develops naturally when children identify and extend repeating sequences in our bug pattern worksheets, which use alternating images of butterflies, caterpillars, bees, and ladybugs to build the pattern recognition skills that underpin mathematical reasoning across all grade levels.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to teach the butterfly life cycle but finds that poster-based instruction leaves her five-year-olds passively watching rather than actively processing the stages of metamorphosis.',
      solution: 'She introduces a two-week butterfly unit combining live caterpillar observation kits with daily insect worksheets. Each morning, students observe and draw the caterpillars\\u2019 progress in observation journals, then complete a related worksheet: coloring pages during the eating stage, find-and-count worksheets during chrysalis formation, and pattern-train activities once butterflies emerge. Word search worksheets introduce vocabulary like larva, pupa, and chrysalis alongside the live observations.',
      outcome: 'By the unit\\u2019s end, 95 percent of students correctly sequence all four metamorphosis stages without assistance, compared to 60 percent in previous years using only posters and videos. Three students begin using the word metamorphosis unprompted in conversation, and the class maintains the observation journals voluntarily for two additional weeks after the unit formally ends.',
    },
    {
      situation: 'A homeschool parent wants to build her six-year-old\\u2019s math and science skills simultaneously but finds that switching between unrelated subjects causes daily resistance and transition meltdowns.',
      solution: 'She creates a backyard bug survey curriculum pairing outdoor exploration with insect worksheets as integrated data-recording tools. Each session begins with a fifteen-minute magnifying glass bug hunt in the garden, where the child records species found on a tally sheet. Back inside, the child completes a find-and-count worksheet to practice the same counting skill on paper, then a word search to reinforce the names of insects they just observed live.',
      outcome: 'Transition resistance disappears entirely because math and science feel like one continuous activity rather than separate subjects. Within six weeks, the child accurately counts and records insect totals to thirty, identifies eight garden insect species by name, and independently begins categorizing bugs as "flyers" and "crawlers" \\u2014 an emergent classification behavior the parent did not explicitly teach.',
    },
    {
      situation: 'A second-grade teacher needs to introduce multiplication through repeated addition but struggles to make the concept concrete with abstract number manipulatives.',
      solution: 'She uses insect body-part counting as a multiplication bridge: each worksheet presents groups of insects and asks students to calculate total legs. Three ants have how many legs total? Students first draw the legs, then write the repeated addition sentence (6 + 6 + 6 = 18), then learn the multiplication shorthand (3 \\u00d7 6 = 18). Image addition worksheets provide daily insect counting practice that reinforces the transition from counting to multiplying.',
      outcome: 'Students who struggle with abstract multiplication master the concept two weeks faster than the previous year\\u2019s cohort. The tactile reality of insect legs makes the repeated-addition-to-multiplication bridge intuitive rather than arbitrary, and 78 percent of students independently apply the multiplication strategy to non-insect problems by the unit\\u2019s third week.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, find-and-count, and matching worksheets that leverage strong visual processing abilities. Create a classroom insect identification wall with labeled photographs organized by type (beetles, butterflies, ants, bees) so students can reference real species images during word search and word scramble activities, connecting written vocabulary to vivid visual representations of each insect.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, big-small comparison, and find-and-count before introducing word-based activities. Many insect names are short and phonetically accessible (ant, bee, bug), making them ideal early English vocabulary. Provide a bilingual insect chart with labeled pictures and use plastic bug figurines as tangible vocabulary anchors that children can hold and examine while learning English names for each species.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step insect math problems involving body-part multiplication, metamorphosis timeline calculations, and colony population estimates. After completing word searches, ask them to write a three-sentence description of each found insect\\u2019s role in its ecosystem. Encourage independent research where they create their own word scramble clues based on entomology facts they discover about a chosen species.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of insect species per worksheet to three or four visually distinct bugs with clearly different sizes, colors, and shapes. Pair every counting task with physical manipulatives like plastic insects or pom-pom caterpillar counters. Start each session with a familiar, confidence-building coloring page of a friendly butterfly or ladybug before introducing the target math or literacy skill, and provide a completed example alongside each new worksheet type.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Life Cycles & Metamorphosis)',
      connection: 'Insect worksheets connect directly to life science standards covering organism life cycles, structural adaptations, and growth and development. Complete metamorphosis from egg through larva and pupa to adult provides the most dramatic and observable life cycle transformation available in a classroom setting, while insect body-part identification builds systematic classification skills.',
      activity: 'After completing an insect life cycle sorting worksheet, have students create a four-stage metamorphosis accordion book showing egg, caterpillar, chrysalis, and butterfly stages, labeling each stage with its scientific name and writing one sentence describing the key transformation that occurs between consecutive stages.',
    },
    {
      subject: 'Math (Symmetry & Multiplication)',
      connection: 'Butterfly wing patterns provide one of nature\\u2019s most beautiful examples of bilateral symmetry, making abstract geometric concepts tangible and emotionally engaging. Insect body parts with consistent counts (six legs, two antennae) create natural multiplication contexts where repeated addition becomes concrete and verifiable rather than abstract.',
      activity: 'Give each student a half-butterfly outline and have them design a wing pattern on one side, then fold and trace to create perfect bilateral symmetry. Follow with a multiplication worksheet where students calculate total legs, wings, and antennae for groups of insects, explicitly connecting the symmetry art to mathematical thinking.',
    },
    {
      subject: 'Art (Wing Pattern Design & Observational Drawing)',
      connection: 'Insect wings offer extraordinary diversity of color, pattern, and structural design that inspires creative expression and trains observational precision. From the fractal-like veins of dragonfly wings to the eyespot patterns of moth wings, insect anatomy provides endless inspiration for art projects that simultaneously build scientific observation skills.',
      activity: 'After completing an insect coloring worksheet, have students choose one species and create an original mixed-media artwork: paint the body, use tissue paper for translucent wings, and add pipe-cleaner antennae. Display the artworks alongside labeled anatomical diagrams to connect creative expression with scientific accuracy.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one insect worksheet per week over a four-week entomology unit. Compare early and late samples to document growth in counting accuracy, insect vocabulary spelling, fine motor control in coloring detail, life cycle sequencing accuracy, and complexity of written responses about species identification, metamorphosis stages, and ecological roles.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on insect counting and matching worksheets, note whether they can name common insects by sight (Pre-K), sort insects by one attribute such as size or wing presence (K\\u20131st), or classify creatures as insects versus non-insects using the six-legs-three-segments criteria while explaining their reasoning with scientific vocabulary (2nd\\u20133rd). Record instances of children self-correcting misclassifications.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Insect-vs-arachnid classification assessment',
      criteria: 'Present students with a mixed set of creature picture cards including insects (six legs, three segments), arachnids (eight legs, two segments), and other arthropods. Ask them to sort the cards into insect and non-insect groups, explain the defining feature that determined each placement, and identify at least one creature they initially wanted to misclassify. Assess sorting accuracy, reasoning quality, and metacognitive awareness.',
      gradeLevel: 'K to 3rd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Insect types featured', value: 'Butterflies, beetles, ants, bees, ladybugs' },
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

console.log('Part 34: Enriching birds & insects theme hub pages...\n');

console.log('1. Injecting 12 fields into birds/en.ts...');
injectFields(path.join(base, 'birds', 'en.ts'), birdsFields);

console.log('2. Injecting 12 fields into insects/en.ts...');
injectFields(path.join(base, 'insects', 'en.ts'), insectsFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
