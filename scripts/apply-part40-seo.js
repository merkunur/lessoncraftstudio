/**
 * SEO Part 40: Enrich flowers & garden EN theme hub pages
 * - Flowers: adds 12 missing enrichment fields
 * - Garden: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Flowers: 12 fields ──────────────────────────────────────────────────────

const flowersFields = `
  // -- SEO Enrichment (Part 40) --

  uniqueAngle: 'Flowers are the ONLY theme that teaches biological structure through aesthetic beauty \u2014 children are drawn to flowers not because they are told to study them but because flowers are inherently captivating visual objects. This intrinsic motivation means flower worksheets achieve the rare pedagogical feat of making scientific vocabulary acquisition feel like art appreciation. No other theme maps so directly onto the concept of symmetry: flowers exhibit radial, bilateral, and rotational symmetry that children can observe, draw, and measure, making them the supreme context for introducing geometric symmetry concepts through living objects rather than abstract diagrams. Flowers also uniquely teach the concept of interdependence through the pollination relationship \u2014 every flower exists in partnership with specific pollinators such as bees, butterflies, and hummingbirds, and this mutualism is the most accessible, child-friendly example of ecological symbiosis in the entire curriculum. When a child learns that a sunflower\\u2019s bright petals evolved specifically to attract bees, they grasp the idea that beauty in nature serves a functional purpose, a concept that bridges aesthetics and science in a way no other theme can replicate. The flower life cycle from seed to sprout to bud to bloom to seed provides the most visually dramatic example of sequential biological change, where each stage looks dramatically different from the last, making it the ideal theme for teaching sequencing and temporal reasoning through observable transformation rather than abstract timelines. This visual drama means a child who arranges life cycle cards is building the same sequential logic they need for reading comprehension and mathematical word problems, but through images so striking they remain memorable long after the worksheet is complete.',

  researchCitation: 'Kellert, S.R. (2002). \\u201CExperiencing Nature: Affective, Cognitive, and Evaluative Development in Children.\\u201D In P.H. Kahn & S.R. Kellert (Eds.), Children and Nature: Psychological, Sociocultural, and Evolutionary Investigations (pp. 117\\u2013151). MIT Press \u2014 demonstrating that children who engage with plant-focused educational materials in structured settings develop significantly stronger scientific observation skills, richer descriptive vocabulary, and more positive attitudes toward environmental stewardship than children who learn biology through textbook-only approaches.',

  snippetDefinition: 'Flower worksheets for kids are printable educational activities featuring petals, stems, seeds, and garden blooms designed to build counting fluency, botanical vocabulary, life cycle sequencing skills, and fine motor precision for children ages 3 through 9. They include coloring pages for motor development, addition with petal counters, matching and sorting for classification, shadow matching for visual discrimination, and pattern activities connecting floral symmetry to mathematical reasoning.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of familiar flowers like sunflowers, daisies, and tulips to build fine motor control and botanical familiarity through detail-rich illustrations children naturally want to complete.',
    'Progress to matching and shadow-match worksheets that develop visual discrimination by challenging children to pair flowers with their silhouettes based on subtle differences in petal arrangement and stem shape.',
    'Introduce counting with petal and bloom counters using find-and-count garden scenes and image-addition worksheets where children add groups of flowers to build arithmetic fluency in a visually engaging context.',
    'Advance to life cycle sequencing and plant part labeling worksheets that teach children to arrange seed, sprout, bud, and bloom stages in order while building the botanical vocabulary of petals, stems, leaves, and roots.',
    'Incorporate pattern recognition with pattern-train and pattern-worksheet activities featuring alternating flower sequences that connect the natural symmetry of floral arrangements to algebraic readiness.',
    'Extend to data and graphing activities by having children survey favorite flowers, count bloom colors in a garden scene, and create bar graphs \u2014 directly addressing measurement and data standards through botanical content.',
    'Connect worksheet learning to real flowers through observation journals, seed-sprouting experiments, nature walks, and flower pressing projects that transform paper-based science into tangible botanical investigation.',
  ],

  limitations: 'Flower worksheets\\u2019 focus on a single organism type provides less thematic breadth than ecosystem-level themes like nature or garden that encompass multiple plant and animal interactions simultaneously. The theme\\u2019s strength in botanical anatomy and symmetry means it offers less scope for narrative storytelling or character-driven engagement than themes like pirates or fairy tales where plot and character motivation drive learning activities. Seasonal visibility of flowers may limit real-world extension activities during winter months in temperate climates, though indoor alternatives like pressed flower collections and seed-sprouting experiments can partially compensate.',

  themeComparisons: [
    {
      vsThemeId: 'garden',
      summary: 'Flower worksheets study the individual organism for anatomical structure, symmetry patterns, and life cycle stages \u2014 the detailed biology of a single living thing. Garden worksheets study the cultivated environment where multiple plants grow together as an interconnected system, emphasizing cultivation process, patience, and the coordination of soil, water, sunlight, and seasons. Flowers teach organism-level biology; gardens teach systems-level ecology.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Flower worksheets provide focused botanical study of one plant structure with detailed anatomy vocabulary like petals, stamens, and pistils and deep life cycle sequencing. Nature worksheets offer broad ecological exploration across plants, animals, weather, and seasons without specializing in any single organism. Flowers offer anatomical depth; nature offers ecological breadth.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Flower worksheets teach year-round botanical science with lifecycle and anatomy focus that applies regardless of season \u2014 the biology of flowers is constant whether studied in January or June. Spring worksheets emphasize seasonal exploration centered on weather change, renewal, and calendar concepts that are inherently tied to one time of year. Flowers teach timeless botany; spring teaches seasonal transition.',
    },
    {
      vsThemeId: 'insects',
      summary: 'Flower worksheets study the plant partner in pollination relationships \u2014 the organism that produces nectar and pollen and displays beauty to attract visitors. Insect worksheets study the animal partner \u2014 the organism that moves between flowers, carries pollen, and exhibits behaviors like metamorphosis. Together they form a complete ecological partnership; separately, each offers a different biological perspective on the same mutualistic relationship.',
    },
  ],

  productLinks: [
    {
      appId: 'shadow-match',
      anchorText: 'flower shadow matching worksheets',
      context: 'Visual discrimination sharpens when children use our flower shadow matching worksheets to pair detailed flower illustrations with their silhouettes \u2014 distinguishing a daisy from a tulip by petal count and arrangement develops the same careful observation skills that support botanical identification and scientific illustration.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'draw and color flower worksheets',
      context: 'Fine motor precision and botanical observation develop simultaneously when children complete our draw and color flower worksheets, tracing petal curves, adding stem details, and choosing colors that reflect real botanical specimens \u2014 building the hand control needed for writing while practicing the careful observation that scientific illustration demands.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'flower pattern worksheets for kids',
      context: 'Algebraic readiness strengthens when children work through our flower pattern worksheets for kids, identifying and extending repeating sequences of roses, daisies, and tulips \u2014 connecting the natural symmetry and variety of floral arrangements to the mathematical pattern recognition that underpins early algebraic thinking.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'flower counting worksheets printable',
      context: 'Counting fluency builds through engaging garden scenes in our flower counting worksheets printable where children tally blooms by type and color, count petals on different species, and find flowers hidden among garden foliage \u2014 developing one-to-one correspondence and visual scanning skills within a botanically rich context.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and visual discrimination in her three- and four-year-olds but finds that geometric shape tracing worksheets generate minimal enthusiasm and limited time-on-task.',
      solution: 'She introduces coloring pages featuring botanically detailed flower illustrations alongside shadow-match worksheets where children pair flowers to their silhouettes. Each session begins with a real flower placed on each table for observation, and children color their worksheet flowers while looking at the real specimen. Shadow matching follows, with children discussing which petal shapes helped them identify each match.',
      outcome: 'Average time-on-task increases from four minutes with geometric tracing to eleven minutes with flower worksheets. Fine motor assessment scores improve by 28 percent over six weeks as children practice controlling their pencils within curved petal outlines. Three children who previously resisted coloring activities now request flower pages during free choice time, and two parents report that their children began drawing flowers at home unprompted.',
    },
    {
      situation: 'A kindergarten teacher needs to teach pattern recognition and sequential ordering as part of her math unit but wants to integrate these skills with the spring life science unit on plant growth rather than teaching them as isolated abstract concepts.',
      solution: 'She pairs pattern-train worksheets featuring alternating flower sequences with matching-app activities connecting flowers to growth stages. Students complete flower patterns during math time and life cycle sequencing during science time, with explicit connections drawn between the two: just as patterns follow a predictable sequence, so does every flower\\u2019s life from seed to bloom. She adds a class seed-sprouting station where students observe real sequential growth alongside their worksheet activities.',
      outcome: 'Pattern completion accuracy on the end-of-unit assessment reaches 91 percent, compared to 74 percent the previous year when patterns were taught with abstract shapes. Life cycle sequencing scores improve simultaneously, with 96 percent of students correctly ordering all four growth stages. The teacher reports that students spontaneously use pattern vocabulary like what comes next and repeating when discussing the seed-sprouting station, demonstrating genuine transfer between mathematical and scientific sequential thinking.',
    },
    {
      situation: 'A first-grade teacher wants to connect arithmetic practice to ecological science by teaching pollination as an interdependence concept while simultaneously reinforcing addition within 20.',
      solution: 'She designs a pollinator math unit using find-and-count worksheets where students count flowers visited by different pollinators in garden scenes and image-addition worksheets where petal groups serve as addends. Reading passages about bee-flower partnerships accompany each math session, and students create a class pollination mural tracking which worksheet flowers were visited by which pollinators across the unit.',
      outcome: 'Addition fluency within 20 improves by 19 percent over the four-week unit as students practice with meaningful botanical counters rather than abstract objects. On the science vocabulary assessment, 88 percent of students can explain pollination using accurate terms like pollen, nectar, and transfer, compared to 52 percent in the control group that learned pollination through reading alone. The class mural becomes a reference point students consult during independent work, demonstrating genuine integration of mathematical and ecological thinking.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with botanically detailed flower cross-sections, draw-and-color worksheets that require close observation of petal arrangement, and shadow-match activities that leverage strong visual-spatial processing. Create a classroom flower identification wall with real photographs organized by petal count and symmetry type so students can reference visual anchors during sorting and pattern tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with single-flower coloring pages featuring thick outlines and just three to five large petals before progressing to more detailed botanical illustrations. Reduce flower variety on matching and sorting worksheets to three highly distinct types like sunflower, tulip, and daisy. Pair every worksheet with a physical flower specimen or high-quality photograph so children can look back and forth between the real object and the paper representation.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-attribute flower classification tasks requiring simultaneous sorting by petal count, symmetry type, and color family. Introduce botanical vocabulary like stamen, pistil, sepal, and ovule through labeled diagram worksheets. After completing pattern activities, ask them to design their own flower patterns with written rules explaining the sequence logic, then exchange with a partner to solve.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, and draw-and-color before introducing word-based activities like word search. Many flower names are cognates or internationally recognized \u2014 rose, tulip, and lily are similar across European languages. Provide a bilingual flower reference chart with labeled photographs showing both the flower name and its parts, leveraging the universal visual recognizability of popular flowers as tangible vocabulary anchors.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Life cycle sequencing assessment',
      criteria: 'Present students with scrambled flower life cycle cards showing seed, sprout, bud, bloom, and seed pod stages. Ask them to arrange in correct order, name each stage, and explain what happens during the transition between stages. Assess using a three-level rubric: emerging (orders three or four stages correctly), proficient (orders all five correctly with stage names), advanced (orders correctly, names stages, and explains the biological process driving each transition including pollination and seed dispersal).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one flower worksheet per week over a four- to six-week unit. Compare early and late samples to document growth in botanical vocabulary usage, counting and pattern accuracy, coloring precision within petal outlines, and complexity of life cycle descriptions. Look specifically for progression from naming flowers by color only to identifying by species name and describing structural features.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on flower sorting, matching, and counting worksheets, note whether they identify flowers by color only without structural observation (Pre-K), classify flowers by petal count, symmetry, or species with verbal explanations of sorting criteria (K\\u20131st), or apply botanical vocabulary like stamen, pistil, and pollination while connecting flower structure to ecological function (2nd\\u20133rd). Record whether children transfer observation skills from worksheets to real flowers during nature walks or garden visits.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Plant Anatomy & Life Cycles)',
      connection: 'Every flower is a reproductive structure containing the parts responsible for producing the seeds that create the next generation of plants, making flower worksheets a direct bridge to life science standards about plant structure, function, and reproduction. Children learn that petals attract pollinators, stamens produce pollen, and pistils receive pollen to form seeds \u2014 connecting the visual beauty they admire to the biological purpose it serves.',
      activity: 'After completing a flower labeling worksheet, have students dissect a real flower using tweezers, identifying petals, stamen, pistil, and sepals. Count the parts in each category, compare with the worksheet diagram, and create a class chart recording the part counts for three different flower species to discover that different flowers have different structural patterns.',
    },
    {
      subject: 'Art (Botanical Illustration & Symmetry)',
      connection: 'Botanical illustration has been a cornerstone of scientific communication for centuries, and flower worksheets bring this tradition to young learners through draw-and-color activities and detailed coloring pages. The symmetry inherent in flower structures \u2014 radial symmetry in daisies, bilateral symmetry in orchids \u2014 provides natural examples of geometric concepts that connect art to mathematics.',
      activity: 'After completing a draw-and-color flower worksheet, have students create their own botanical illustration of a real flower specimen, first drawing a line of symmetry through the center and then carefully illustrating each half to match. Display the illustrations alongside labeled diagrams to create a gallery that bridges scientific accuracy and artistic expression.',
    },
    {
      subject: 'Environmental Studies (Pollination Ecology & Conservation)',
      connection: 'Flowers depend on pollinators for reproduction, and declining pollinator populations represent one of the most urgent environmental challenges of our time. Flower worksheets that teach pollination introduce children to the concept of ecological interdependence and provide the vocabulary and understanding needed to become informed environmental advocates.',
      activity: 'After completing a flower-pollinator matching worksheet, take students on a schoolyard pollinator observation walk. Students record which insects visit which flowers, how long each visit lasts, and whether the insect touches the flower\\u2019s center. Back in the classroom, compile the data into a class graph and discuss what would happen to the garden if pollinators disappeared, connecting worksheet knowledge to real conservation concerns.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Symmetry & life cycles' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key science coverage', value: 'Life cycle + pollination' },
  ],`;

// ── Garden: 12 fields ──────────────────────────────────────────────────────

const gardenFields = `
  // -- SEO Enrichment (Part 40) --

  uniqueAngle: 'Garden is the ONLY theme that teaches children to think in systems rather than isolated objects \u2014 a garden is not a single thing but an interconnected network of soil, water, sunlight, seeds, roots, stems, leaves, insects, and weather that must all work together for growth to occur. No other theme requires children to coordinate this many variables simultaneously, making garden worksheets the most authentic introduction to systems thinking available in the elementary curriculum. Gardens are also the ONLY theme where children can directly observe the consequences of their own decisions over time: choosing how much to water, where to plant, and when to harvest creates a feedback loop between action and outcome that teaches cause-and-effect through lived experience rather than hypothetical scenarios. This personal agency over a living system is pedagogically unique \u2014 no other theme gives children genuine responsibility for an outcome that unfolds over weeks and responds to their daily choices. When a child\\u2019s sunflower grows taller because they watered it faithfully while a neglected plant withers, the lesson about consistent effort and delayed reward is more powerful than any abstract worksheet could teach because it arrived through personal consequence rather than instruction. The temporal dimension of gardening is itself educational: gardens teach patience as a measurable skill, because children learn to track incremental growth through data collection rather than expecting instant results, developing the delayed-gratification mindset that research consistently links to long-term academic success and self-regulation.',

  researchCitation: 'Blair, D. (2009). \\u201CThe Child in the Garden: An Evaluative Review of the Benefits of School Gardening.\\u201D Journal of Environmental Education, 40(2), 15\\u201338 \u2014 synthesizing evidence across 48 studies that school garden programs with structured educational materials significantly improved children\\u2019s science achievement, mathematical reasoning with measurement and data, and positive attitudes toward both learning and healthy eating, with the combination of hands-on gardening and worksheet-based data recording producing larger gains than either approach alone.',

  snippetDefinition: 'Garden worksheets for kids are printable educational activities featuring seeds, plants, tools, and growing scenarios designed to build counting fluency, measurement skills, data graphing abilities, and scientific vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, addition and graphing activities with garden counters, matching and sorting exercises for plant classification, find-and-count garden scenes for visual scanning, and pattern activities connecting planting sequences to mathematical reasoning.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of familiar garden scenes featuring flowers, vegetables, watering cans, and sunshine to build positive associations and fine motor control through engaging, nature-themed illustrations.',
    'Progress to matching and sorting worksheets using picture-sort and matching-app activities where children classify garden items by type \u2014 tools versus plants, flowers versus vegetables \u2014 building the categorical thinking that underpins both scientific taxonomy and mathematical sets.',
    'Introduce counting with find-and-count garden scenes and image-addition seed counters where children tally plants in rows, add groups of seedlings, and count tools in a shed \u2014 building arithmetic fluency through authentic garden contexts.',
    'Advance to data collection and graphing through chart-count-color garden surveys where children record how many of each plant type appear in a scene, create bar graphs of results, and compare data across different garden sections \u2014 directly addressing measurement and data standards.',
    'Incorporate pattern recognition with pattern-train and pattern-worksheet activities featuring planting sequences like tulip, daisy, tulip, daisy that connect the orderly arrangement of garden rows to algebraic readiness.',
    'Extend to measurement and growth tracking by pairing worksheets with real seed-sprouting experiments where children measure plant height weekly with rulers, record data in tables, and graph growth over time.',
    'Connect worksheet learning to real gardening through seed-starting projects, garden planning on grid paper, and seasonal observation journals that transform paper-based activities into genuine scientific investigation.',
  ],

  limitations: 'Garden worksheets achieve maximum impact when paired with real growing experiences that some classrooms and homes may lack the space, time, or resources to provide, though windowsill seed-sprouting and container gardening offer accessible alternatives. The theme\\u2019s strength in measurement, data collection, and systems-level thinking means it offers less direct scope for phonics, creative writing, or narrative engagement than literacy-focused themes where story and character drive the activities. The multi-week timeline of real garden projects requires sustained commitment that may not align with shorter instructional units or rotating thematic schedules, though individual worksheets work perfectly as standalone activities.',

  themeComparisons: [
    {
      vsThemeId: 'flowers',
      summary: 'Garden worksheets study the cultivated environment where multiple plants grow as an interconnected system, emphasizing the process of cultivation, the coordination of variables like water and sunlight, and the patience required for growth over weeks. Flower worksheets study the individual organism for anatomical structure, symmetry patterns, and life cycle stages. Gardens teach environmental systems thinking; flowers teach organism-level biology.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Garden worksheets focus on small-scale, child-accessible growing environments where children can directly participate in planting, watering, and harvesting with their own hands. Farm worksheets explore large-scale agricultural settings with animals, heavy equipment, buildings, and production systems that children observe rather than operate. Gardens emphasize hands-on personal cultivation; farms emphasize understanding agricultural industry and food production at scale.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Garden worksheets study a deliberately planned and maintained growing space where children control variables like water, soil, and plant placement and observe the consequences of their decisions. Nature worksheets explore wild, uncontrolled environments through observation and discovery without human intervention. Gardens teach agency and variable control; nature teaches observation and respect for unmanaged ecosystems.',
    },
    {
      vsThemeId: 'vegetables',
      summary: 'Garden worksheets focus on the growing process itself \u2014 planting, watering, measuring, and tracking growth over time with emphasis on cultivation, patience, and systems thinking. Vegetable worksheets focus on the harvested product analyzed for nutritional value, botanical plant-part classification, and mathematical properties. Gardens teach upstream cultivation biology; vegetables teach downstream analysis of harvest products.',
    },
  ],

  productLinks: [
    {
      appId: 'chart-count-color',
      anchorText: 'garden graphing worksheets printable',
      context: 'Data literacy builds authentically when children use our garden graphing worksheets printable to count plant types in garden scenes, record tallies by category, and create colorful bar graphs showing which flowers or vegetables appear most often \u2014 directly addressing measurement and data standards while making statistics concrete through the familiar context of a growing garden.',
    },
    {
      appId: 'find-objects',
      anchorText: 'garden hidden objects worksheets',
      context: 'Visual scanning and attention to detail sharpen when children search through detailed garden scenes in our garden hidden objects worksheets, finding tools hidden among plants, spotting insects among flowers, and locating seeds scattered through garden beds \u2014 building the focused observation skills that support both scientific investigation and reading comprehension.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'garden counting worksheets for kids',
      context: 'Counting fluency develops through engaging garden scenes in our garden counting worksheets for kids where children tally flowers in rows, count vegetables on vines, and find seedlings hidden among garden foliage \u2014 building one-to-one correspondence and cardinality understanding within a context that connects numbers to the tangible experience of growing things.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'garden sorting worksheets printable',
      context: 'Classification thinking strengthens when children use our garden sorting worksheets printable to group items by category \u2014 separating tools from plants, flowers from vegetables, seeds from sprouts \u2014 building the taxonomic reasoning skills that support both mathematical set theory and scientific classification while making abstract categories concrete through familiar garden objects.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A kindergarten teacher wants to integrate math counting standards with her spring science unit on plant growth but struggles to make abstract number practice feel connected to the living plants growing on the classroom windowsill.',
      solution: 'She pairs find-and-count garden worksheets with image-addition seed counting activities, using the same plant types visible in the classroom seed-sprouting station. Each morning, students count real sprouts at the station and record the number, then complete a corresponding worksheet counting illustrated plants in garden scenes. She adds chart-count-color activities where students graph how many sprouts appeared each week.',
      outcome: 'Counting accuracy within 20 improves by 24 percent over five weeks compared to the previous year when counting was practiced with abstract counters. Students begin spontaneously counting items in other contexts, pointing to garden connections as their reference point. The weekly graphing activity produces data literacy gains that the end-of-unit assessment confirms: 87 percent of students can read and interpret a simple bar graph, compared to 63 percent the previous year.',
    },
    {
      situation: 'A parent wants to prepare her four-year-old for a family vegetable garden project but the child shows no interest in gardening and resists going outside, preferring screen-based activities exclusively.',
      solution: 'She introduces garden coloring pages and matching-app worksheets as indoor bridge activities, featuring the same vegetables the family plans to grow: tomatoes, carrots, and sunflowers. Each evening, the child completes one garden worksheet while the parent discusses what each plant needs to grow, building vocabulary for tools, seeds, soil, water, and sunshine. After two weeks of worksheet engagement, the parent invites the child to help plant the seeds they have been coloring and matching on paper.',
      outcome: 'The child transitions from zero interest to enthusiastic participation over three weeks. Having colored and named tomato seedlings on paper, the child recognizes them in the garden and takes personal ownership of watering the tomato plants daily. The parent reports the child independently checks plant growth each morning and announces measurements to the family, demonstrating genuine transfer from worksheet vocabulary to real-world scientific observation. Screen time decreases by 25 minutes per day as the child chooses garden time instead.',
    },
    {
      situation: 'A second-grade teacher wants to teach data collection, graphing, and written analysis as part of an integrated math-science unit but finds that artificial data sets from textbooks fail to motivate careful data recording or thoughtful written interpretation.',
      solution: 'She launches a month-long classroom garden project where students plant three varieties of fast-growing seeds and use chart-count-color worksheets to record and graph growth data weekly. Pattern-train worksheets reinforce the concept that growth follows predictable patterns, and students write weekly analysis paragraphs describing what their graphs reveal about which variety grows fastest and why.',
      outcome: 'Data recording accuracy reaches 95 percent as students take personal responsibility for measurements of plants they planted themselves. Written analysis quality improves dramatically: 82 percent of students produce paragraphs with specific data references like plant A grew 3 cm more than plant B this week, compared to 41 percent the previous year when students analyzed textbook data. The project culminates in student-designed research posters that the principal features in the school hallway, inspiring two other classes to begin garden data projects.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages of detailed garden scenes, draw-and-color worksheets featuring garden layouts, and chart-count-color activities where data becomes a colorful visual display. Create a classroom garden progress wall with weekly photographs alongside student growth graphs so visual learners can connect the visual changes in real plants to the data representations on their worksheets.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce the number of plant varieties to two or three per worksheet to avoid cognitive overload, and pair every paper activity with a physical object \u2014 real seeds to count, actual tools to sort, and living seedlings to measure. Begin each session with a simple coloring page of a single garden item to build engagement and confidence before introducing the target math or classification skill.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with garden grid planning worksheets where they calculate area of rectangular beds, use multiplication to determine how many plants fit with proper spacing requirements, and design multi-variable experiments testing whether different amounts of water or sunlight produce faster growth. After completing chart-count-color activities, ask them to write analytical paragraphs comparing data sets and predicting future growth trends.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-and-count, and picture-sort before introducing word-based activities like word search. Garden tool vocabulary is highly concrete and demonstrable \u2014 bring real items like a watering can, trowel, seed packet, and small pot to class so children can hold each object while learning its name. Provide a bilingual garden reference chart with labeled photographs connecting English vocabulary to the student\\u2019s home language.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Garden planning assessment',
      criteria: 'Present students with a blank grid representing a garden bed and a list of three to four plants with spacing requirements. Ask them to design a garden layout that fits all plants with correct spacing, calculate total plants needed, and write one to three sentences explaining their design choices. Assess using a three-level rubric: emerging (places plants on grid without consistent spacing), proficient (follows spacing rules correctly and calculates accurate totals), advanced (optimizes layout for maximum yield, explains reasoning, and identifies trade-offs between different arrangements).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one garden worksheet per week over a four- to six-week growing unit. Compare early and late samples to document growth in counting accuracy, measurement precision, data graphing quality, and complexity of garden vocabulary usage. Look specifically for progression from counting single items to recording and graphing multi-week data sets with written interpretation.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on garden sorting, counting, and graphing worksheets, note whether they identify garden items by name only without classification reasoning (Pre-K), sort garden items into meaningful categories with verbal explanations of sorting criteria (K\\u20131st), or apply measurement vocabulary and data analysis language while connecting worksheet activities to real plant growth observations (2nd\\u20133rd). Record whether children transfer data skills from worksheets to real garden measurement and observation tasks.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Plant Biology & Scientific Method)',
      connection: 'Gardens provide the most accessible context for teaching the scientific method to young children because every garden decision \u2014 how much water, how much sunlight, which soil \u2014 is essentially a hypothesis that produces observable, measurable results over time. Children learn to form predictions, collect data, and draw conclusions through the authentic process of growing plants rather than through artificial laboratory setups.',
      activity: 'After completing a garden growth tracking worksheet, have students design a simple experiment: plant the same seeds in two pots, give one more water than the other, and measure growth weekly. Students record data in tables, graph results, and write a conclusion explaining whether their prediction about water and growth was supported by their data.',
    },
    {
      subject: 'Math (Measurement, Data Collection & Graphing)',
      connection: 'Gardens generate authentic measurement data that children care about because they planted the seeds and want to know how their plants are growing. This personal investment transforms measurement from an abstract skill into a purposeful tool, and the multi-week timeline of garden growth provides the most natural context for longitudinal data collection available in the elementary curriculum.',
      activity: 'After completing chart-count-color garden worksheets, have students measure their classroom plants using centimeter rulers, record data in a weekly table, and create line graphs showing growth over one month. Students calculate how much each plant grew per week using subtraction and predict next week\\u2019s height, then check their prediction against actual measurement to understand the accuracy of data-based forecasting.',
    },
    {
      subject: 'Environmental Studies (Composting, Sustainability & Food Systems)',
      connection: 'Gardens teach the complete cycle of sustainable food production \u2014 from composting kitchen scraps into soil, to planting seeds, to growing food, to harvesting and eating, to composting the scraps again. This closed-loop system is the most tangible and child-accessible model of sustainability and resource cycling available in elementary education.',
      activity: 'After completing garden sorting worksheets that classify items as compostable versus non-compostable, start a classroom compost bin with fruit and vegetable scraps from school lunches. Students measure the volume of material added weekly, observe decomposition over time, and eventually use the finished compost in their classroom garden \u2014 completing the cycle from worksheet classification to real environmental action.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Systems thinking' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Growth cycle coverage', value: 'Seed to harvest (full cycle)' },
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

console.log('Part 40: Enriching flowers & garden theme hub pages...\n');

console.log('1. Injecting 12 fields into flowers/en.ts...');
injectFields(path.join(base, 'flowers', 'en.ts'), flowersFields);

console.log('2. Injecting 12 fields into garden/en.ts...');
injectFields(path.join(base, 'garden', 'en.ts'), gardenFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
