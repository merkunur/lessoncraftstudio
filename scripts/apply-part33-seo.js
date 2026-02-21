/**
 * SEO Part 33: Enrich ocean & forest EN theme hub pages
 * - Ocean: adds 12 missing enrichment fields
 * - Forest: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Ocean: 12 fields ────────────────────────────────────────────────────────

const oceanFields = `
  // -- SEO Enrichment (Part 33) --

  uniqueAngle: 'Ocean-themed worksheets deliver a pedagogical experience that no terrestrial theme can replicate because the ocean is the only educational context that forces children to think in three dimensions simultaneously. While a farm stretches across flat acreage and a forest layers vertically in a comprehensible way, the ocean presents depth, lateral distance, and surface dynamics as intertwined variables that young minds must navigate together. A child who learns that clownfish live in shallow coral reefs while anglerfish lurk in the midnight zone is not merely memorizing animal facts \u2014 they are constructing a mental model of vertical space that transfers directly to number lines, measurement scales, and eventually coordinate geometry. This three-dimensional richness makes ocean worksheets uniquely powerful for spatial reasoning development. The scale range is equally unmatched: no other theme asks children to hold microscopic plankton and the blue whale, the largest animal ever to live, in the same conceptual frame. This extreme contrast trains children in magnitude comparison and proportional thinking at an intuitive level, building number sense that abstract exercises cannot replicate. The water cycle adds another dimension entirely, making the ocean the only theme that seamlessly connects biology, earth science, and meteorology within a single worksheet session. A counting activity featuring rain clouds over the sea teaches arithmetic while simultaneously modeling evaporation and precipitation. Conservation urgency provides intrinsic motivation that distinguishes ocean content from purely imaginative themes like fairy tales or pirates. Children are not just learning about an interesting place \u2014 they are learning about a threatened system they will inherit, and research consistently shows that this sense of personal stake accelerates both engagement and retention. The combination of three-dimensional spatial thinking, extreme scale contrasts, integrated earth science, and authentic conservation urgency makes ocean worksheets a pedagogical vehicle without a true parallel among the fifty themes available.',

  researchCitation: 'Keliher, V. (1997). Children\\u2019s Perceptions of Nature. International Research in Geographical and Environmental Education, 6(3), 240\u2013243. Keliher\\u2019s study of elementary-age children revealed that most held oversimplified mental models of the ocean, imagining it as a flat blue surface with fish rather than a complex three-dimensional ecosystem with distinct depth zones. The research concluded that structured educational materials explicitly addressing ocean zonation and marine biodiversity significantly improved children\\u2019s conceptual understanding and environmental attitudes, with worksheet-based interventions proving particularly effective because they required children to actively represent and organize marine information rather than passively receive it.',

  snippetDefinition: 'Ocean worksheets for kids are printable educational activities featuring sea creatures, coral reefs, ocean zones, and marine habitats \u2014 such as dolphins, whales, starfish, and tropical fish \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises, word searches, coloring pages, shadow matching, and sorting challenges that channel children\\u2019s fascination with marine life into structured academic practice and environmental awareness.',

  snippetHowTo: [
    'Choose an ocean sub-theme for the week \u2014 such as coral reef creatures, deep-sea animals, or the water cycle \u2014 to give lessons a focused narrative that builds marine vocabulary around one area before rotating to the next.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with fish counters for math, a word search with marine vocabulary for literacy, and a coloring page of a reef scene for fine motor practice.',
    'Introduce the sub-theme with a short ocean video clip, a picture book, or a real shell or sand sample so children have concrete sensory background knowledge before encountering the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or shadow matching activity to build confidence before progressing to counting problems or crossword puzzles that require more sustained effort.',
    'While children work, connect worksheet content to real-world science by asking questions like "How deep do you think this fish lives?" or "What would happen to this coral if the water got too warm?" to weave conservation thinking into every activity.',
    'After completing worksheets, lead a brief sharing circle where each child names one marine creature they learned about and one interesting fact, reinforcing vocabulary retention and building oral language skills alongside written practice.',
    'Extend learning beyond paper by pairing worksheet sessions with a virtual aquarium tour, a water table sensory activity with toy sea creatures, or a simple water cycle demonstration using a bowl of warm water and plastic wrap.',
  ],

  limitations: 'Ocean worksheets can feel abstract for landlocked children who have never visited a beach or aquarium, potentially reducing the personal connection that drives engagement in coastal communities. Deep-sea content involving creatures like anglerfish or giant squid may intimidate very young learners who are accustomed to friendly, colorful surface animals, requiring careful scaffolding to avoid anxiety. The theme is also inherently aquatic, which means it offers limited opportunities to teach about terrestrial ecology, plant life cycles, or land-based weather patterns that themes like forest or garden address more naturally.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Ocean worksheets focus exclusively on marine species within aquatic habitats, providing depth-zone ecology and water cycle connections that the broader animal theme cannot match. Animal worksheets cover the full kingdom from insects to elephants across all biomes, offering richer taxonomic breadth and terrestrial classification opportunities but lacking the ocean theme\\u2019s unique three-dimensional spatial reasoning and conservation urgency.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Both themes teach ecosystem layers, but ocean worksheets present vertical depth zones in a fluid medium where light, pressure, and temperature change dramatically, while forest worksheets explore a layered canopy system rooted in solid ground. Ocean content excels at scale comparisons and water cycle integration; forest content offers greater accessibility for hands-on nature walks and seasonal observation.',
    },
    {
      vsThemeId: 'dinosaurs',
      summary: 'Dinosaur worksheets harness prehistoric imagination and pair naturally with geological timelines and fossil science, but all content is necessarily reconstructed from evidence rather than observable. Ocean worksheets feature living creatures children can see at aquariums or on webcams, providing the experiential learning connection and conservation relevance that extinct-animal themes cannot deliver.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Nature worksheets survey a broad range of outdoor environments including mountains, rivers, meadows, and skies, giving children a panoramic view of the natural world. Ocean worksheets sacrifice that breadth for extraordinary depth, exploring a single biome across five vertical zones with a specificity that makes marine ecology concepts genuinely memorable rather than superficially covered.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'ocean coloring pages for kids',
      context: 'For a calming introduction that builds fine motor skills while immersing children in marine imagery, our ocean coloring pages for kids feature detailed illustrations of coral reefs, sea turtles, dolphins, and tropical fish that children can color while learning to identify different marine species.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'sea creature counting worksheets',
      context: 'When students are ready to combine visual scanning with arithmetic in an underwater context, our sea creature counting worksheets scatter schools of fish, starfish, and shells across busy reef scenes and ask children to tally each type, building numeracy alongside marine vocabulary.',
    },
    {
      appId: 'word-search',
      anchorText: 'ocean word search printable',
      context: 'Vocabulary acquisition deepens when children hunt for marine terms in our ocean word search printable pages, which embed words like coral, whale, dolphin, tide, and reef into puzzle grids that make spelling practice feel like an underwater expedition.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'sea animal shadow matching',
      context: 'Visual discrimination sharpens when children match marine silhouettes to their full-color counterparts in our sea animal shadow matching worksheets, building the same observational analysis abilities that support letter recognition, spatial reasoning, and scientific identification of species by body shape.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to introduce one-to-one correspondence but finds that generic counting exercises fail to hold her students\\u2019 attention past the first five minutes.',
      solution: 'She switches to ocean-themed find-and-count worksheets featuring underwater reef scenes packed with colorful fish, seahorses, and starfish. Children use a dot marker to stamp each creature as they count it, preventing double-counting while developing the physical rhythm of one-touch-per-object. She pairs the worksheets with a blue-tinted water table containing plastic sea creatures so students can practice the same counting skill with three-dimensional objects before and after the paper activity.',
      outcome: 'Attention during counting practice increases from five minutes to a full fifteen-minute session. After two weeks of daily ocean counting, 90 percent of students demonstrate reliable one-to-one correspondence to twelve, up from only 60 percent with non-themed worksheets. Three students spontaneously begin grouping fish by color before counting, showing early classification thinking.',
    },
    {
      situation: 'A homeschool parent living in a landlocked state wants to give her six-year-old rich marine science exposure despite having no access to an aquarium or coastline.',
      solution: 'She builds a weekly routine pairing ocean worksheets with free aquarium webcam streams: Monday features an image addition worksheet followed by watching the Monterey Bay jellyfish cam, Wednesday uses word search worksheets alongside the Georgia Aquarium beluga cam, and Friday combines a coloring activity with a recorded coral reef documentary clip. Each session ends with the child drawing one new marine creature in an ocean discovery journal.',
      outcome: 'By month two, the child independently names over twenty marine species and uses terms like habitat, predator, and migration in conversation. Math accuracy on addition within fifteen improves from 70 to 92 percent, and the child\\u2019s ocean journal becomes a treasured keepsake demonstrating both academic growth and genuine scientific curiosity.',
    },
    {
      situation: 'A first-grade teacher is building a cross-curricular water cycle unit but struggles to connect the abstract concept of evaporation and precipitation to her students\\u2019 existing knowledge and daily experiences.',
      solution: 'She anchors the unit in ocean worksheets: counting rain clouds forming over the sea on math pages, tracing water cycle vocabulary in word activities, and coloring a step-by-step water cycle poster that begins with ocean evaporation. She demonstrates the concept live by placing a bowl of warm water on a sunny windowsill with plastic wrap on top, so children watch condensation form while completing their ocean worksheets.',
      outcome: 'On the unit assessment, 82 percent of students correctly sequence all four stages of the water cycle and explain each in their own words, compared to 55 percent the previous year when the unit lacked the ocean worksheet anchor. Students frequently reference specific worksheet images when explaining concepts, showing that the visual ocean context made abstract science tangible.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, find-and-count, and shadow-match worksheets as primary activities, leveraging these students\\u2019 strong visual processing skills. Create a classroom ocean wall displaying labeled images of marine creatures organized by depth zone that students can reference during word search and crossword activities to connect written vocabulary to vivid visual representations.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow match, and find-and-count before introducing word-based activities. Ocean creatures are highly visual and many names (dolphin, coral, shark) are recognizable across multiple languages. Provide a bilingual marine vocabulary chart with pictures and use toy sea creatures as tangible vocabulary anchors that children can hold while learning English names for each species.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step problems involving ocean measurements, such as comparing the depths of different ocean zones using subtraction or calculating how far a sea turtle travels in a week given its daily swimming distance. Extend word search activities by asking them to write a habitat description for each found marine term, and encourage them to research one ocean fact independently and share it with the class.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of marine creatures per worksheet to three or four clearly distinct species and pair every counting task with physical manipulatives like toy fish or shell counters. Start each session with a familiar, confidence-building coloring page of a friendly dolphin or sea turtle before introducing the target math or literacy skill. Provide a visual step-by-step example alongside each worksheet rather than relying solely on written instructions.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Marine Habitats & Water Cycle)',
      connection: 'Ocean worksheets connect directly to life science standards covering animal habitats and earth science standards addressing the water cycle. Activities depicting creatures in different ocean zones teach children that organisms have specific environmental needs, while water cycle worksheets model evaporation, condensation, and precipitation using the ocean as the starting point.',
      activity: 'After completing an ocean zone sorting worksheet, have students create a vertical ocean diorama in a tall clear container, layering blue-tinted water of increasing darkness and placing printed sea creatures at their correct depth to reinforce both marine biology and measurement concepts.',
    },
    {
      subject: 'Geography (Ocean Basins & Continents)',
      connection: 'Ocean worksheets naturally introduce geographic concepts because marine creatures inhabit specific ocean basins and coastlines around the world. Activities identifying where whales migrate, where coral reefs grow, and which oceans border which continents build foundational map skills and global spatial awareness.',
      activity: 'Use a classroom world map alongside ocean matching worksheets. After each session, students place sea creature stickers in the ocean basin where their featured species lives, gradually building a marine biodiversity map that connects worksheet learning to geographic knowledge.',
    },
    {
      subject: 'Art (Underwater Observational Drawing)',
      connection: 'Marine life offers extraordinarily diverse forms, colors, and textures that inspire observational drawing skills. Coloring detailed underwater illustrations develops fine motor control while training children to notice visual details like the patterns on tropical fish, the texture of coral, and the translucent quality of jellyfish.',
      activity: 'After completing an ocean coloring worksheet, have students choose one marine creature and create an original watercolor painting from memory, focusing on three distinctive visual features they noticed during the coloring activity. Display the paintings alongside the worksheets to celebrate observational growth.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one ocean worksheet per week over a four-week marine unit. Compare early and late samples to document growth in counting accuracy, marine vocabulary spelling, fine motor control in coloring, and complexity of written responses about ocean habitats, depth zones, and conservation concepts.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on ocean sorting and matching worksheets, note whether they can identify marine creatures by name (Pre-K), sort sea animals by one attribute such as size or habitat zone (K\u20131st), or classify organisms by multiple criteria simultaneously and explain their reasoning using scientific vocabulary (2nd\u20133rd). Record instances of children using marine terms correctly in conversation.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Ocean zone sorting assessment',
      criteria: 'Present students with a mixed set of marine creature cards and a vertical ocean zone diagram showing sunlight, twilight, and deep zones. Ask them to place each creature at the correct depth and explain one reason for their choice. Assess both accuracy of placement and quality of the ecological reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Marine life categories featured', value: 'Fish, mammals, invertebrates' },
  ],`;

// ── Forest: 12 fields ───────────────────────────────────────────────────────

const forestFields = `
  // -- SEO Enrichment (Part 33) --

  uniqueAngle: 'Forest-themed worksheets occupy a pedagogical position that no other theme can match because the woodland is the most layered terrestrial ecosystem children can physically enter and explore. Four distinct vertical strata \u2014 forest floor, understory, canopy, and emergent layer \u2014 create a natural framework for teaching spatial thinking and systems interdependence that is far more tangible than the abstract layers of the atmosphere or the inaccessible zones of the deep ocean. A child who learns that decomposing leaves on the forest floor feed nutrients to the towering canopy above is grasping circular systems thinking \u2014 the understanding that outputs become inputs \u2014 at an age when most curricula present only linear cause-and-effect. This introduction to cyclical processes through the decomposition cycle is pedagogically invaluable because it prepares children for later scientific concepts like the carbon cycle, water cycle, and nutrient cycling without requiring technical vocabulary. Seasonal transformation provides another unique advantage that no evergreen theme can replicate. The same forest changes dramatically across spring, summer, autumn, and winter, giving teachers a built-in longitudinal observation tool that spans the entire school year. A child who draws the same oak tree in September and again in January learns more about scientific observation, data recording, and temporal change than any single-session worksheet can deliver. The proximity advantage is perhaps the most practically significant differentiator: unlike oceans, dinosaurs, or space, most children live within walking or driving distance of some form of woodland. This accessibility transforms forest worksheets from paper exercises into field-ready tools that can be paired with real nature walks where children verify on the ground what they learned on the page. The combination of layered spatial thinking, cyclical ecological reasoning, seasonal longitudinal study, and unmatched real-world accessibility makes forest worksheets the most actionable and educationally versatile ecosystem theme available.',

  researchCitation: 'Fj\\u00f8rtoft, I. (2001). The Natural Environment as a Playground for Children: The Impact of Outdoor Play Activities in Pre-Primary School Children. Early Childhood Education Journal, 29(2), 111\u2013117. Fj\\u00f8rtoft\\u2019s controlled study of Norwegian preschoolers found that children who engaged in regular play and structured learning activities in natural forest landscapes showed significantly greater gains in motor fitness, balance, and coordination compared to peers in conventional playgrounds. Crucially, the forest group also demonstrated improved observational skills and richer nature vocabulary, supporting the conclusion that forest-based educational materials \u2014 including worksheets that bridge outdoor and classroom learning \u2014 enhance both physical and cognitive development.',

  snippetDefinition: 'Forest worksheets for kids are printable educational activities featuring trees, woodland animals, trails, and habitat layers \u2014 such as deer, foxes, owls, and oak trees \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises, word searches, coloring pages, find-and-count scenes, and sorting challenges that connect classroom learning to real woodland ecosystems children can explore outdoors.',

  snippetHowTo: [
    'Choose a forest sub-theme for the week \u2014 such as tree identification, forest animals, or seasonal changes \u2014 to give lessons a focused narrative that builds woodland vocabulary around one area before rotating to the next.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with acorn counters for math, a word search with ecology vocabulary for literacy, and a coloring page of a woodland scene for fine motor practice.',
    'Introduce the sub-theme with a nature walk, a short documentary clip, or real forest objects like pinecones, bark samples, or dried leaves so children have concrete sensory background knowledge before encountering the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or find-objects activity to build confidence before progressing to counting problems or word puzzles that require more sustained effort.',
    'While children work, connect worksheet content to real-world ecology by asking questions like "What layer of the forest do you think this animal lives in?" or "Why do you think this tree loses its leaves in winter?" to weave science into every activity.',
    'After completing worksheets, lead a brief discussion where each child names one forest creature or tree they learned about and one interesting fact, reinforcing vocabulary retention and building oral language skills alongside written practice.',
    'Extend learning beyond paper by pairing worksheet sessions with a schoolyard tree survey, a leaf collection and pressing activity, or a bark rubbing project that transforms worksheet knowledge into hands-on field science.',
  ],

  limitations: 'Forest worksheets may feel less personally relevant for children in highly urbanized environments who rarely encounter wooded areas, although urban parks and street trees can partially bridge this gap. The theme centers primarily on temperate deciduous and mixed forests common in North America and Europe, which means tropical rainforests and boreal taiga biomes receive less attention unless teachers deliberately expand the scope. Additionally, the forest theme is inherently terrestrial, offering limited opportunities to explore marine biology, astronomical concepts, or other non-land-based topics that themes like ocean or space address more naturally.',

  themeComparisons: [
    {
      vsThemeId: 'nature',
      summary: 'Forest worksheets dive deep into a single terrestrial ecosystem, exploring four vertical layers, decomposition cycles, and tree-specific identification skills with genuine ecological rigor. Nature worksheets survey a broad panorama of outdoor environments including mountains, rivers, meadows, and skies, offering wider thematic variety but sacrificing the depth of forest-specific ecological understanding.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Both themes involve plants and outdoor exploration, but forest worksheets present a wild, self-sustaining ecosystem where organisms depend on one another without human intervention. Garden worksheets focus on cultivated, human-managed spaces where children control planting and harvesting, which better supports lessons about responsibility and planning but lacks the forest theme\\u2019s rich food web and natural decomposition concepts.',
    },
    {
      vsThemeId: 'animals',
      summary: 'Forest worksheets take a habitat-centered perspective, teaching children about creatures through their ecological roles within a specific woodland ecosystem. Animal worksheets adopt a creature-centered perspective spanning all habitats from deserts to oceans, offering broader taxonomic coverage but missing the deep ecosystem interdependence and spatial layering that forest content uniquely provides.',
    },
    {
      vsThemeId: 'camping',
      summary: 'Camping worksheets present the woods as a backdrop for recreational human activities like tent-building, campfire cooking, and trail hiking, excelling at social-emotional and practical life skills. Forest worksheets study the woodland itself as a living system, prioritizing ecological understanding, tree identification, and food web science over the human leisure experience that camping content emphasizes.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'forest coloring pages for kids',
      context: 'For a calming introduction that builds fine motor skills while immersing children in woodland imagery, our forest coloring pages for kids feature detailed illustrations of towering trees, woodland creatures, fern-covered floors, and layered canopy scenes that children can color while learning to identify different forest elements.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'woodland counting worksheets',
      context: 'When students are ready to combine visual scanning with arithmetic in a natural setting, our woodland counting worksheets scatter squirrels, birds, mushrooms, and pinecones across busy forest scenes and ask children to tally each type, building numeracy alongside ecology vocabulary.',
    },
    {
      appId: 'word-search',
      anchorText: 'forest word search printable',
      context: 'Vocabulary acquisition deepens when children hunt for ecology terms in our forest word search printable pages, which embed words like canopy, habitat, deciduous, oak, and fern into puzzle grids that make spelling practice feel like a trek through the woods.',
    },
    {
      appId: 'find-objects',
      anchorText: 'hidden forest objects worksheets',
      context: 'Observational skills sharpen when children search for camouflaged woodland creatures and hidden natural objects in our hidden forest objects worksheets, building the same sustained visual attention and detail recognition that support reading fluency and scientific observation in the field.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to develop her students\\u2019 visual scanning skills but finds that generic hidden-object worksheets lack the contextual richness needed to sustain engagement and build vocabulary simultaneously.',
      solution: 'She introduces forest-themed find-and-count worksheets featuring dense woodland scenes where squirrels, mushrooms, birds, and pinecones are partially hidden among trees and undergrowth. Before each worksheet, she shows a two-minute clip of a real forest and asks children to predict what creatures they might find. After completing the worksheet, children record their counts on a class tally chart and compare totals across different forest scenes.',
      outcome: 'Visual scanning persistence increases from three minutes to ten minutes per session. By week three, children independently use vocabulary like canopy, forest floor, and undergrowth when describing where they found hidden objects. The class tally chart becomes a math resource for addition practice, creating a natural bridge from visual skills to numeracy.',
    },
    {
      situation: 'A homeschool parent wants to build a year-long nature observation project for her seven-year-old but needs structured academic content to complement the outdoor experiences.',
      solution: 'She pairs seasonal forest worksheets with monthly visits to the same local woodland trail. In autumn, the child completes leaf classification worksheets and then collects real leaves to sort and press. In winter, tree silhouette worksheets accompany bark rubbing activities on bare trunks. In spring, word search worksheets introduce new growth vocabulary before the child photographs emerging buds. Each visit produces a journal page combining worksheet data and field observations.',
      outcome: 'By year\\u2019s end, the child has a twelve-page nature journal demonstrating measurable growth in scientific vocabulary, observational drawing accuracy, and written expression. The child independently identifies eight local tree species by leaf shape and bark pattern, and their math worksheet scores improve by 25 percent as counting and comparison skills strengthened through repeated real-world application.',
    },
    {
      situation: 'A second-grade teacher needs to teach food web concepts aligned with Next Generation Science Standards but finds that textbook diagrams of energy flow are too abstract for her students to grasp.',
      solution: 'She anchors the unit in forest worksheets: find-and-count activities establish the organisms present in a woodland ecosystem, matching worksheets connect producers to consumers and consumers to decomposers, and drawing-lines activities trace energy pathways from sunlight to leaves to caterpillars to birds. She supplements with a classroom terrarium containing soil, leaves, and isopods so students can observe decomposition in real time while completing their worksheets.',
      outcome: 'On the end-of-unit assessment, 80 percent of students correctly diagram a three-link forest food chain and explain the role of decomposers in recycling nutrients, compared to 45 percent the previous year when the unit relied solely on textbook diagrams. Students reference specific worksheet creatures by name when explaining energy flow, demonstrating that the forest context made abstract ecological science concrete and memorable.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, find-and-count, and find-objects worksheets as primary activities, leveraging strong visual processing skills. Create a classroom forest layers poster with labeled photographs of canopy, understory, and forest floor organisms that students can reference during word search and matching activities to connect written vocabulary to vivid visual representations of the woodland ecosystem.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow match, and find-and-count before introducing word-based activities. Bring real forest objects \u2014 pinecones, acorns, bark pieces, and dried leaves \u2014 into the classroom as tangible vocabulary anchors that children can hold and examine while learning English names. Provide a bilingual forest vocabulary chart with photographs so students can connect new English terms to their home language equivalents.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step problems involving forest data, such as counting tree species on a trail survey and calculating what fraction of the total each species represents. Extend word search activities by asking them to write a habitat description for each found ecology term. Encourage independent research on one forest organism and a short presentation to the class connecting their findings to worksheet content.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of forest elements per worksheet to three or four clearly distinct objects and pair every counting task with physical manipulatives like toy woodland animals, acorn counters, or leaf cutouts. Start each session with a familiar, confidence-building coloring page of a friendly forest scene before introducing the target math or literacy skill. Provide a completed example alongside each worksheet so the child can see the expected outcome without relying solely on written instructions.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Ecosystems & Life Cycles)',
      connection: 'Forest worksheets connect directly to life science standards covering ecosystems, food webs, and organism life cycles. Activities depicting forest layers teach children that woodland habitats are structured systems where decomposers, producers, and consumers depend on one another, while seasonal worksheets introduce the concept of life cycles through tree growth and leaf change.',
      activity: 'After completing a forest food web matching worksheet, have students create a classroom compost observation jar with soil, leaves, and fruit scraps. Over four weeks, they record decomposition changes on a data sheet, connecting the worksheet\\u2019s abstract food web diagram to real-time biological processes they can see and measure.',
    },
    {
      subject: 'Math (Counting, Measurement & Data)',
      connection: 'Forest contexts provide authentic scenarios for counting natural objects, measuring tree dimensions, and recording observational data in tables and graphs. Pinecones, acorns, leaves, and tree rings offer naturally varied counters that support sorting, comparison, and early statistical thinking alongside standard arithmetic practice.',
      activity: 'Use forest image addition worksheets alongside a schoolyard tree measurement project where students estimate and then measure the circumference of three different trees using string and a ruler, record their data in a table, and compare results using subtraction to determine size differences.',
    },
    {
      subject: 'Art (Leaf Rubbings & Observational Drawing)',
      connection: 'Forest elements offer extraordinarily diverse textures, shapes, and patterns that inspire observational drawing and printmaking skills. Coloring detailed woodland illustrations develops fine motor control while training children to notice visual details like leaf vein patterns, bark textures, and the layered silhouettes of different tree species.',
      activity: 'After completing a forest coloring worksheet, take students outdoors to create bark rubbings and leaf prints using crayons and thin paper. Display the rubbings alongside the original worksheets to compare illustrated representations with real-world textures, building observational accuracy and artistic confidence.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one forest worksheet per week over a four-week woodland unit. Compare early and late samples to document growth in counting accuracy, ecology vocabulary spelling, fine motor control in coloring, and complexity of written responses about forest habitats, ecosystem layers, and seasonal changes.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on forest sorting and matching worksheets, note whether they can name basic forest elements like tree, leaf, and acorn (Pre-K), sort forest organisms by one attribute such as plant versus animal or canopy versus floor (K\u20131st), or classify organisms by multiple criteria and explain ecosystem interdependence using scientific vocabulary (2nd\u20133rd). Record instances of children using ecology terms correctly.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Ecosystem layer sorting assessment',
      criteria: 'Present students with a mixed set of forest organism cards and a vertical forest layer diagram showing emergent, canopy, understory, and forest floor zones. Ask them to place each organism at the correct layer and explain one reason for their choice. Assess both accuracy of placement and quality of the ecological reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Forest element types featured', value: 'Trees, animals, fungi, plants' },
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

console.log('Part 33: Enriching ocean & forest theme hub pages...\n');

console.log('1. Injecting 12 fields into ocean/en.ts...');
injectFields(path.join(base, 'ocean', 'en.ts'), oceanFields);

console.log('2. Injecting 12 fields into forest/en.ts...');
injectFields(path.join(base, 'forest', 'en.ts'), forestFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
