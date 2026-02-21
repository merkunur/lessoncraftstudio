/**
 * SEO Part 35: Enrich dinosaurs & space EN theme hub pages
 * - Dinosaurs: adds 12 missing enrichment fields
 * - Space: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Dinosaurs: 12 fields ──────────────────────────────────────────────────────

const dinosaursFields = `
  // -- SEO Enrichment (Part 35) --

  uniqueAngle: 'Dinosaur-themed worksheets hold a pedagogical position unlike any other theme in the collection because they are built entirely on reconstructed evidence \u2014 no child has ever seen a living dinosaur, yet children as young as three can identify a Tyrannosaurus Rex with astonishing confidence. This epistemological gap between total extinction and intimate familiarity makes dinosaurs the single most powerful gateway to teaching the scientific method at early ages. Every fact a child absorbs about dinosaurs arrived through the same process professional scientists use: observing physical evidence, forming hypotheses, and revising conclusions when new fossils emerge. When a worksheet asks a child to compare a Triceratops skull to a modern rhinoceros, it is implicitly teaching inference from evidence \u2014 the foundational skill of all scientific disciplines \u2014 in a context so exciting that the child does not realize they are reasoning like a paleontologist. The extinction narrative introduces cause-and-effect reasoning at planetary scale, a conceptual leap no other theme demands. Understanding that an asteroid impact triggered climate collapse that eliminated dominant species requires children to link a single event to cascading consequences across ecosystems and millions of years. Deep time is another dimension unique to this theme: numbers like sixty-six million years stretch place value intuition far beyond anything farm, ocean, or vehicle themes require, pushing children to grapple with magnitudes that expand their mathematical imagination. Size extremes within the theme make measurement comparison visceral rather than abstract \u2014 the contrast between a forty-foot Brachiosaurus and a chicken-sized Compsognathus delivers more measurement intuition than any ruler exercise. Perhaps most remarkably, dinosaur science is still actively changing: new fossil discoveries regularly revise what we thought we knew, teaching children that knowledge itself evolves, a metacognitive insight that no static-content theme can replicate.',

  researchCitation: 'Crowley, K., & Jacobs, M. (2002). Building Islands of Expertise in Everyday Family Activity. In G. Leinhardt, K. Crowley, & K. Knutson (Eds.), Learning Conversations in Museums (pp. 333\u2013356). Lawrence Erlbaum Associates. This longitudinal study documented how parent-child conversations in natural history museums around dinosaur exhibits sustained significantly longer explanatory dialogue than any other exhibit type. Children who had prior worksheet or book exposure to dinosaur species engaged in three times more spontaneous hypothesis-generation about fossil evidence than those without preparation, demonstrating that structured educational materials create \u201cislands of expertise\u201d that catalyze deeper scientific reasoning during real-world encounters.',

  snippetDefinition: 'Dinosaur worksheets for kids are printable educational activities featuring T-Rex, Triceratops, Stegosaurus, Brachiosaurus, and other prehistoric creatures \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises with dinosaur egg counters, word searches with paleontology vocabulary, coloring pages of Mesozoic species, size comparison charts, shadow matching puzzles, and treasure hunt adventures that transform children\u2019s fascination with prehistoric life into structured academic practice and scientific reasoning skills.',

  snippetHowTo: [
    'Choose a dinosaur sub-theme for the week \u2014 such as carnivores versus herbivores, the three geological eras, or baby dinosaurs and eggs \u2014 to give lessons a focused narrative that builds species-specific vocabulary before rotating to the next group.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with dinosaur egg counters for math, a word search with paleontology vocabulary for literacy, and a coloring page of a Stegosaurus for fine motor practice.',
    'Introduce the sub-theme with a short video clip of a fossil excavation, a picture book about dinosaurs, or a hands-on fossil replica so children have sensory context before starting the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or shadow matching activity to build confidence before progressing to counting problems or word scrambles that require more sustained focus.',
    'While children work, connect worksheet content to scientific reasoning by asking questions like "How do we know what this dinosaur looked like?" or "Why do you think this dinosaur had such long teeth?" to weave evidence-based thinking into every activity.',
    'After completing worksheets, extend learning with a hands-on activity: a sandbox fossil dig with buried toy bones, a size comparison walk measuring dinosaur lengths on the playground, or a geological era timeline where children place their worksheet dinosaurs in the correct period.',
    'Build a running classroom or family dinosaur field guide throughout the unit, adding each new species studied to a binder with the child\u2019s completed worksheet, a fact card, and a drawing, creating a personalized paleontology reference that grows with their knowledge.',
  ],

  limitations: 'All dinosaur content is necessarily reconstructed from fossil evidence rather than direct observation, which means children cannot verify what they learn by looking at living specimens the way they can with animal, bird, or insect themes. The theme is heavily creature-focused on prehistoric reptiles and offers limited scope for plant science, modern ecology, or non-biological subjects that themes like garden, nature, or shapes address more directly. Some young children, particularly preschoolers, may find large predatory species like T-Rex or Velociraptor frightening, requiring teachers to start with gentler herbivores like Brachiosaurus or Triceratops before introducing carnivores.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Dinosaur worksheets focus exclusively on extinct, reconstructed creatures that children can never observe alive, building scientific inference skills through fossil evidence and hypothesis construction. Animal worksheets feature living, observable species that children encounter at zoos, farms, and parks, emphasizing direct observation and real-time behavior. Dinosaurs excel at teaching deep time, extinction, and evidence-based reasoning; animals excel at teaching habitat ecology, behavior, and classification of creatures children can interact with directly.',
    },
    {
      vsThemeId: 'space',
      summary: 'Both themes deal with scales far beyond everyday experience, but dinosaurs anchor learning in deep time and paleontological reconstruction from physical fossils, while space anchors learning in deep distance and astronomical observation of phenomena children can actually see like the moon, stars, and planets. Dinosaurs build historical-scientific reasoning; space builds spatial-mathematical reasoning. Together they cover both temporal and spatial extremes of human knowledge.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Dinosaur worksheets study extinct land and air creatures reconstructed entirely from fossil evidence, while ocean worksheets explore a living aquatic ecosystem teeming with observable marine life. Dinosaurs excel at teaching geological time, extinction events, and evidence-based reconstruction; ocean worksheets excel at teaching marine habitats, living food chains, and the water cycle. The ocean theme offers ongoing ecological relevance; the dinosaur theme offers unmatched historical-scientific depth.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Dinosaur worksheets reconstruct a prehistoric world that no longer exists, teaching children to reason from fossil evidence about creatures and ecosystems they cannot directly observe. Nature worksheets focus on the present-day observable environment \u2014 seasons, weather, plants, and animals children encounter daily. Dinosaurs build deep-time scientific reasoning; nature builds immediate environmental awareness and seasonal observation skills.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'dinosaur coloring pages for kids',
      context: 'For a calming introduction that builds fine motor control while familiarizing children with prehistoric body shapes and species diversity, our dinosaur coloring pages for kids feature detailed illustrations of T-Rex, Triceratops, Stegosaurus, and Brachiosaurus that children can color while learning to distinguish carnivores from herbivores by their distinctive body structures.',
    },
    {
      appId: 'big-small-app',
      anchorText: 'dinosaur size comparison worksheets',
      context: 'When students are ready to explore measurement through the dramatic contrasts of prehistoric life, our dinosaur size comparison worksheets present species ranging from chicken-sized Compsognathus to building-sized Brachiosaurus side by side, asking children to order, compare, and describe size differences that make abstract measurement concepts visceral and unforgettable.',
    },
    {
      appId: 'word-search',
      anchorText: 'dinosaur word search printable',
      context: 'Vocabulary acquisition accelerates when children hunt for paleontology terms in our dinosaur word search printable pages, which embed words like fossil, skeleton, carnivore, herbivore, and extinction into puzzle grids that make spelling practice feel like a fossil excavation through language.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'dinosaur treasure hunt worksheets',
      context: 'Logical reasoning and reading comprehension develop simultaneously when children follow clues through prehistoric landscapes in our dinosaur treasure hunt worksheets, which guide young paleontologists through multi-step challenges that combine directional vocabulary, sequencing, and problem-solving in an adventure narrative.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to introduce measurement vocabulary like bigger, smaller, taller, and shorter but finds that using abstract blocks and shapes fails to capture her five-year-olds\\u2019 attention for more than a few minutes.',
      solution: 'She introduces dinosaur size comparison worksheets that pair dramatically different species side by side \u2014 a towering Brachiosaurus next to a tiny Compsognathus, a massive T-Rex beside a slender Velociraptor. Each worksheet asks children to circle the bigger dinosaur, draw a line under the shorter one, and color the tallest species first. She pairs the worksheets with a playground measurement walk where children pace out actual dinosaur lengths with chalk marks.',
      outcome: 'Measurement vocabulary engagement jumps from three-minute attention spans to consistent twelve-minute sessions. After two weeks, 91 percent of students correctly use bigger, smaller, taller, and shorter in non-dinosaur contexts, compared to 58 percent before the dinosaur integration. Several children spontaneously begin estimating the sizes of classroom objects in dinosaur units.',
    },
    {
      situation: 'A homeschool parent wants to build a month-long science unit that combines hands-on exploration with daily academic practice, but her seven-year-old resists anything that feels like separate school subjects.',
      solution: 'She creates a four-week paleontology expedition unit pairing dinosaur worksheets with a fossil excavation kit, a timeline poster, and weekly library books. Week one focuses on herbivores using coloring and word search worksheets alongside plant-eating dinosaur figurines. Week two covers carnivores with treasure hunt and addition worksheets. Week three explores fossil evidence with word scramble and shadow matching activities. Week four is a capstone where the child creates a dinosaur field guide combining completed worksheets with original drawings and written facts.',
      outcome: 'The child completes the entire month without a single resistance episode because the worksheets feel like tools for the expedition rather than isolated schoolwork. Math accuracy within twenty improves from 72 to 95 percent, the child correctly sequences the three geological eras unprompted, and the finished field guide becomes a prized possession the child shows to every visiting relative.',
    },
    {
      situation: 'A second-grade teacher needs to connect place value concepts to real-world contexts but finds that using money or generic large numbers fails to excite her students or make the magnitude feel meaningful.',
      solution: 'She builds a geological timeline math unit using dinosaur worksheets as the academic backbone. Students work with numbers in the millions as they plot the Triassic (252 to 201 million years ago), Jurassic (201 to 145 million years ago), and Cretaceous (145 to 66 million years ago) periods on a number line. Image addition worksheets provide daily dinosaur counting practice, while word search activities reinforce era vocabulary like Mesozoic, Jurassic, and Cretaceous.',
      outcome: 'Place value comprehension improves dramatically as students contextualize large numbers with genuine excitement rather than rote memorization. The class scores 22 percentage points higher on the place value assessment compared to the previous year\\u2019s cohort, and three students independently research the Permian extinction \u2014 demonstrating curiosity-driven learning that extends beyond the assigned curriculum.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, shadow-match, and big-small comparison worksheets that leverage strong visual processing. Create a classroom dinosaur wall with labeled illustrations organized by era and diet so students can reference species images during word search and word scramble activities, connecting written vocabulary to vivid visual representations of each prehistoric creature.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow match, and big-small comparison before introducing word-based activities. Dinosaur names like T-Rex and Stego are short enough for early practice, and species illustrations provide strong visual context clues. Provide a bilingual dinosaur chart with labeled pictures and use toy dinosaur figurines as tangible vocabulary anchors that children can hold and name while building confidence with English paleontology vocabulary.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step problems involving geological era timelines, dinosaur measurement calculations using real paleontological data, and species classification by multiple attributes simultaneously. After completing word searches, ask them to write a three-sentence paragraph explaining how a specific dinosaur was adapted to its environment. Encourage independent research projects where they compare two species and present evidence-based arguments about which was better adapted for survival.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of dinosaur species per worksheet to three or four visually distinct creatures with clearly different sizes and shapes \u2014 such as T-Rex, Brachiosaurus, and Stegosaurus. Pair every counting task with physical manipulatives like toy dinosaur figurines. Start each session with a familiar, confidence-building coloring page of a friendly herbivore before introducing the target math or literacy skill, and provide a completed example alongside each new worksheet type.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Fossil Evidence & Extinction)',
      connection: 'Dinosaur worksheets connect directly to earth and life science standards covering fossil formation, evidence-based reconstruction, and the concept of extinction. Activities featuring fossil sorting, skeletal reconstruction, and species classification teach children that scientific knowledge is built by observing physical evidence and drawing logical conclusions, not by memorizing facts.',
      activity: 'After completing a dinosaur classification worksheet, have students examine five replica fossils (or printed photographs) and determine which body part each represents, which dinosaur it might belong to, and whether the creature was a carnivore or herbivore based on tooth shape. Students present their evidence and reasoning to the class.',
    },
    {
      subject: 'Math (Measurement & Deep-Time Place Value)',
      connection: 'The dramatic size range of dinosaur species and the enormous time spans of geological eras create authentic contexts for measurement comparison and place value that no other theme can match. Comparing a six-foot Velociraptor to an eighty-five-foot Brachiosaurus builds measurement intuition, while working with numbers in the millions of years stretches place value understanding far beyond everyday contexts.',
      activity: 'Give students a data table with five dinosaurs, their lengths in feet, and their geological era in millions of years ago. Have them create a bar graph of dinosaur lengths and plot the eras on a simplified timeline, then write three comparison sentences using vocabulary like longer than, shorter than, and millions of years before.',
    },
    {
      subject: 'History (Geological Eras & Scientific Discovery)',
      connection: 'Dinosaur themes naturally introduce historical thinking as children learn that Earth has undergone dramatic changes across geological eras and that scientific understanding evolves as new evidence is discovered. The stories of famous paleontologists like Mary Anning and their discoveries provide human narrative alongside the scientific content.',
      activity: 'Create a two-part timeline: the top row shows the three dinosaur eras with representative species, and the bottom row shows key fossil discovery dates in the 1800s and 1900s. Students compare the two timelines and discuss how recent our knowledge of ancient creatures really is, building perspective on both geological and human history.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one dinosaur worksheet per week over a four-week paleontology unit. Compare early and late samples to document growth in counting accuracy, paleontology vocabulary spelling, fine motor control in coloring detail, and complexity of responses about species identification, geological era knowledge, and evidence-based reasoning about fossil evidence.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on dinosaur counting and matching worksheets, note whether they can name common species by sight (Pre-K), sort dinosaurs by one attribute such as size or diet (K\u20131st), or classify dinosaurs by multiple criteria like era, diet, and body structure while explaining their reasoning with scientific vocabulary like carnivore, herbivore, and Cretaceous (2nd\u20133rd). Record instances of children using evidence-based language.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Dinosaur classification sorting assessment',
      criteria: 'Present students with a mixed set of dinosaur picture cards representing herbivores, carnivores, flying reptiles, and marine reptiles. Ask them to sort the cards into groups, name each group, and explain one reason a specific dinosaur belongs in its category based on observable body features like teeth shape or neck length. Assess both sorting accuracy and the quality of evidence-based reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Dinosaur types featured', value: 'T-Rex, Triceratops, Stegosaurus, Brachiosaurus' },
  ],`;

// ── Space: 12 fields ──────────────────────────────────────────────────────────

const spaceFields = `
  // -- SEO Enrichment (Part 35) --

  uniqueAngle: 'Space-themed worksheets occupy a singular pedagogical position because space is the only theme that operates at genuinely infinite scale \u2014 pushing number sense, measurement, and proportional thinking beyond anything terrestrial themes can offer. When a child compares Earth to Jupiter, they are working with size ratios that dwarf the biggest-to-smallest contrasts available in animal, dinosaur, or vehicle themes. When they learn that light from the nearest star takes over four years to reach us, they are grappling with a magnitude of time and distance that fundamentally redefines what large means in their mathematical vocabulary. The solar system is the most powerful natural context for teaching ordered sequences, as the eight planets provide a fixed, universally recognized sequence that children can memorize, recite, and test themselves on \u2014 building the same sequential thinking that underpins number lines, alphabetical order, and timeline comprehension. Extreme comparison is another dimension unique to space: grain-of-sand-to-beach-ball planet size models and arm-span solar system distance walks give children physical anchors for ratios that would otherwise remain abstract. Space is also the only theme in the collection that seamlessly integrates STEM with narrative heroism \u2014 astronauts are real people who used math, science, and engineering to achieve the extraordinary, giving children role models who embody the value of academic skills in the most dramatic possible context. Countdown sequences embedded in rocket launch scenarios provide natural number fluency practice, as children count backward from ten with genuine excitement rather than rote obligation. Perhaps most powerfully, space remains empirically accessible despite its vast distances: moon phases visible from any window, planets visible to the naked eye, and the day-night cycle caused by Earth\u2019s rotation all give children direct observational evidence that connects worksheet content to their nightly sky.',

  researchCitation: 'Plummer, J.D. (2009). Early Elementary Students\\u2019 Development of Astronomy Concepts in the Planetarium. Journal of Research in Science Teaching, 46(2), 192\u2013209. Plummer\\u2019s study investigated how first- through third-grade students develop understanding of astronomical phenomena through structured observation activities and found that children who engaged with sequenced educational materials about celestial patterns \u2014 including worksheets requiring planet ordering, moon phase tracking, and day-night cycle analysis \u2014 demonstrated significantly stronger spatial reasoning and model-based thinking than control groups. The research concluded that structured, hands-on astronomy activities build transferable cognitive skills in spatial visualization and proportional reasoning that benefit mathematical thinking far beyond the science classroom.',

  snippetDefinition: 'Space worksheets for kids are printable educational activities featuring planets, rockets, astronauts, stars, and the solar system \u2014 designed to teach math, literacy, and science skills to children ages 3 through 9. They include counting exercises with star and planet counters, word searches with astronomy vocabulary, coloring pages of spacecraft and galaxies, cryptogram puzzles, sudoku with space images, and path-finding challenges that transform children\u2019s wonder about the cosmos into structured academic practice and scientific observation skills.',

  snippetHowTo: [
    'Choose a space sub-theme for the week \u2014 such as the inner planets, astronauts and missions, stars and constellations, or the moon \u2014 to give lessons a focused narrative that builds topic-specific vocabulary before rotating to the next celestial subject.',
    'Select two or three worksheet types targeting different skills: for example, an image addition page with planet counters for math, a word search with astronomy vocabulary for literacy, and a coloring page of a rocket for fine motor practice.',
    'Introduce the sub-theme with a brief stargazing session (even daytime moon observation counts), a short video of a rocket launch, or a picture book about the solar system so children have sensory context before starting the worksheets.',
    'Distribute worksheets in order of increasing difficulty, starting with an accessible coloring or shadow matching activity to build confidence before progressing to addition problems, cryptogram puzzles, or sudoku that require more sustained focus.',
    'While children work, connect worksheet content to observable phenomena by asking questions like "Can you see the moon during the day sometimes?" or "Why do you think the planets go in this order?" to weave astronomical thinking into every activity.',
    'After completing worksheets, extend learning with a hands-on activity: building a solar system model with different-sized balls, starting a moon phase journal using a window observation each evening, or creating constellation pictures by poking holes in dark paper and holding it up to a light.',
    'Maintain a running class or family space discovery log throughout the unit, recording each new planet fact, vocabulary word, and real-sky observation alongside the corresponding worksheet, creating a personalized astronomy reference that connects paper learning to the actual night sky.',
  ],

  limitations: 'Space concepts can feel abstract for children in heavily light-polluted urban areas or regions with persistent cloud cover, where direct sky observation of stars, planets, and constellations is difficult without planetarium access. The theme is heavily weighted toward physics and astronomy, offering less scope for biology, ecology, social studies, or hands-on nature exploration that themes like animals, garden, or insects address more directly. Very large numbers required at upper grades \u2014 planetary distances in millions of miles, stellar distances in light-years \u2014 may overwhelm some learners who have not yet developed strong place value foundations, requiring careful scaffolding from concrete to abstract.',

  themeComparisons: [
    {
      vsThemeId: 'dinosaurs',
      summary: 'Both themes deal with scales far beyond everyday experience, but space anchors learning in deep distance and astronomical observation of phenomena children can actually see \u2014 the moon, visible planets, and star patterns \u2014 while dinosaurs anchor learning in deep time and paleontological reconstruction from physical fossils no child has observed forming. Space builds spatial-mathematical reasoning and STEM-heroism narratives; dinosaurs build historical-scientific reasoning and evidence-from-absence skills.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Space worksheets focus on celestial phenomena beyond Earth \u2014 planets, stars, moons, and the physics of the cosmos \u2014 while nature worksheets ground learning in terrestrial ecosystems children can walk through and touch. Space excels at teaching large-number reasoning, sequential ordering, and proportional thinking at cosmic scale; nature excels at teaching seasonal observation, plant and animal ecology, and immediate environmental awareness.',
    },
    {
      vsThemeId: 'robots',
      summary: 'Space worksheets connect to real astronomical exploration, real spacecraft, and real astronaut missions, grounding STEM learning in documented human achievement. Robot worksheets lean toward imaginative, fictional, or future-oriented technology contexts. Both themes foster engineering and problem-solving thinking, but space provides historically verifiable narratives while robots provide open-ended creative design scenarios.',
    },
    {
      vsThemeId: 'numbers',
      summary: 'Space worksheets apply large-number concepts to authentic astronomical contexts \u2014 planet distances, orbital periods, and crew supply calculations \u2014 giving abstract numbers concrete meaning. Pure number worksheets build foundational arithmetic fluency through direct practice without thematic context. Space excels at showing why large numbers matter; numbers excels at building raw computational speed and pattern recognition.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'space coloring pages for kids',
      context: 'For a calming introduction that builds fine motor control while familiarizing children with spacecraft designs and celestial bodies, our space coloring pages for kids feature detailed illustrations of rockets, planets with rings, astronauts in spacesuits, and star-filled galaxies that children can color while learning to distinguish different celestial objects by their visual characteristics.',
    },
    {
      appId: 'image-addition',
      anchorText: 'planet math worksheets',
      context: 'When students are ready to combine visual counting with arithmetic in a cosmic context, our planet math worksheets use rockets, stars, and planets as visual counters in addition and subtraction problems that transform abstract number operations into exciting space mission calculations.',
    },
    {
      appId: 'word-search',
      anchorText: 'space word search printable',
      context: 'Vocabulary acquisition accelerates when children hunt for astronomy terms in our space word search printable pages, which embed words like orbit, galaxy, astronaut, constellation, and gravity into puzzle grids that make spelling practice feel like navigating through the cosmos.',
    },
    {
      appId: 'image-cryptogram',
      anchorText: 'space cryptogram puzzles',
      context: 'Logical reasoning and letter-substitution skills develop simultaneously when children decode hidden messages in our space cryptogram puzzles, which use planet and star symbols as cipher keys to reveal astronomy facts, building both decoding fluency and science vocabulary in an engaging secret-code format.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to teach planet ordering and sequential thinking but finds that generic number-line activities fail to hold her five-year-olds\\u2019 attention beyond a few minutes.',
      solution: 'She introduces a solar system ordering unit pairing space worksheets with a classroom mobile. Each day focuses on one planet: students color a planet worksheet, complete an image addition page using that planet as the visual counter, and then hang the colored planet in its correct position on the mobile. Word search worksheets reinforce planet names alongside spatial vocabulary like nearest, farthest, and between.',
      outcome: 'Sequential ordering engagement increases from four-minute average sessions to consistent fifteen-minute sessions. After two weeks, 94 percent of students correctly sequence the eight planets from memory, compared to 45 percent before the space integration. Three students independently begin asking about dwarf planets and asteroid belts, demonstrating curiosity-driven learning that extends beyond the curriculum.',
    },
    {
      situation: 'A homeschool parent wants to build a weekly stargazing habit that connects real sky observation to academic practice, but her six-year-old loses interest in astronomy books after just a few pages.',
      solution: 'She creates a semester-long space explorer curriculum where each week pairs a specific celestial topic with matching worksheets and one real-sky observation. Week one covers the moon with coloring and shadow matching worksheets, followed by drawing the moon\u2019s current phase from the window. Subsequent weeks cover visible planets, the Big Dipper, seasonal constellations, and the day-night cycle. Image addition and word search worksheets provide daily math and literacy practice themed to each week\u2019s celestial focus.',
      outcome: 'The child maintains the stargazing habit for the entire semester without resistance because the worksheets and observations reinforce each other. Moon phase tracking accuracy reaches 100 percent by week six, math fluency within twenty improves from 68 to 96 percent, and the child independently starts an astronomy journal with drawings and written observations that combine science, art, and literacy skills organically.',
    },
    {
      situation: 'A first-grade teacher needs to make addition word problems feel meaningful rather than mechanical, but her students rush through generic number problems without engaging with the narrative context.',
      solution: 'She builds a two-week space mission math unit where every addition and subtraction problem is framed as a mission supply calculation. Students determine how many oxygen tanks a crew of three astronauts needs if each carries four, how many food packs remain after the crew uses seven of fifteen, and how many stars a telescope can photograph in two nights if it captures eight per night. Image addition worksheets with rocket and planet counters provide daily practice, while word search and cryptogram puzzles reinforce mission vocabulary between math sessions.',
      outcome: 'Word problem engagement transforms from rushed, careless solving to careful reading and genuine interest in whether mission supplies will last. Addition and subtraction accuracy within twenty improves by 18 percentage points over the two-week unit, and students begin creating their own space word problems voluntarily, a self-directed extension the teacher did not assign.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize the coloring, shadow-match, and picture-path worksheets that leverage strong visual processing. Create a classroom solar system display wall with labeled photographs of each planet and major moons so students can reference real NASA images during word search and cryptogram activities, connecting written vocabulary to vivid visual representations of celestial objects.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow match, and image addition before introducing word-based activities. Many space words are short and phonetically accessible (sun, moon, star, Mars), making them ideal early English vocabulary. Provide a bilingual planet chart with labeled photographs and use a simple solar system poster as a visual reference anchor during word search and word scramble activities.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-step problems involving planetary distance calculations, crew supply multiplication, and mission timeline planning that pushes beyond single-operation arithmetic. After completing word searches, ask them to write a three-sentence paragraph explaining one astronomical phenomenon they learned about. Encourage independent research projects where they compare two planets using real NASA data and present their findings with evidence-based reasoning.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of celestial objects per worksheet to three or four visually distinct items \u2014 such as Earth, the Moon, the Sun, and a rocket. Pair every counting task with physical manipulatives like foam planet balls or star-shaped counters. Start each session with a familiar, confidence-building coloring page of a friendly rocket or smiling astronaut before introducing the target math or literacy skill, and provide a completed example alongside each new worksheet type.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Earth & Space Science)',
      connection: 'Space worksheets connect directly to earth and space science standards covering the sun-Earth-moon system, observable celestial patterns, and the structure of the solar system. Activities featuring planet ordering, moon phase identification, and day-night cycle analysis teach children that predictable patterns in the sky can be observed, recorded, and used to make predictions.',
      activity: 'After completing a planet ordering worksheet, have students create a scaled solar system walk in the hallway using different-sized balls for planets and measured distances between them. Each student writes one fact about their assigned planet on an index card placed at the correct position, building both spatial understanding and informational writing skills.',
    },
    {
      subject: 'Math (Large Numbers & Measurement)',
      connection: 'The enormous distances and sizes in the solar system create authentic contexts for place value, comparison, and proportional reasoning that no terrestrial theme can match. Comparing planet diameters, mission durations, and distances from the Sun gives children concrete reasons to work with numbers in the hundreds, thousands, and millions, making large-number operations exciting rather than abstract.',
      activity: 'Give students a simplified data table with four planets showing diameter and distance from the Sun. Have them create a comparison chart using bar graphs for diameters and a number line for distances, then write three sentences using comparison vocabulary like larger than, closer to, and farther from to describe what the data shows.',
    },
    {
      subject: 'Art (Constellation Design & Spacecraft Illustration)',
      connection: 'Space imagery offers extraordinary inspiration for creative expression, from the geometric patterns of constellations to the engineering details of rockets and space stations. Drawing and coloring celestial scenes develops fine motor control while training children to observe and reproduce visual patterns, proportions, and spatial relationships.',
      activity: 'After completing a space coloring worksheet, have each student invent their own constellation by placing star dots on dark blue paper and connecting them into a pattern. They name their constellation, write a two-sentence origin story, and present it to the class, combining spatial design thinking with creative narrative writing.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolio collection',
      criteria: 'Collect one space worksheet per week over a four-week astronomy unit. Compare early and late samples to document growth in counting accuracy, space vocabulary spelling, fine motor control in coloring detail, and complexity of responses about planet identification, solar system ordering, and astronomical observation skills.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on space counting and matching worksheets, note whether they can name common celestial objects like the Sun, Moon, and Earth (Pre-K), sequence the planets in correct order from the Sun and use comparison vocabulary (K\u20131st), or explain observable patterns like moon phases and day-night cycles while using scientific vocabulary like orbit, rotation, and gravity (2nd\u20133rd). Record instances of children connecting worksheet content to real sky observations.',
      gradeLevel: 'Pre-K to 3rd',
    },
    {
      method: 'Planet ordering and classification assessment',
      criteria: 'Present students with shuffled planet picture cards and ask them to arrange the planets in correct order from the Sun. Then ask them to sort planets into groups \u2014 rocky versus gas giants, or inner versus outer \u2014 and explain one reason each planet belongs in its group. Assess both ordering accuracy and the quality of classification reasoning in their explanations.',
      gradeLevel: 'K to 2nd',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Curriculum areas covered', value: '4 areas' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\u201320 min' },
    { label: 'Space topics featured', value: 'Planets, rockets, astronauts, stars, constellations' },
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

console.log('Part 35: Enriching dinosaurs & space theme hub pages...\n');

console.log('1. Injecting 12 fields into dinosaurs/en.ts...');
injectFields(path.join(base, 'dinosaurs', 'en.ts'), dinosaursFields);

console.log('2. Injecting 12 fields into space/en.ts...');
injectFields(path.join(base, 'space', 'en.ts'), spaceFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
