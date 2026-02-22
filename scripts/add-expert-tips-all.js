#!/usr/bin/env node
/**
 * Part 162 fix: Add expertTips to all 50 EN theme hub content files.
 * Each theme gets 3 unique, theme-specific expert tips with source attribution.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

// Theme-specific expert tips data
const EXPERT_TIPS = {
  animals: [
    { tip: 'Use animal classification as a bridge to mathematical set theory. When children sort animals by habitat, diet, or body covering, they practice the same logical operations (union, intersection, subset) that underpin formal mathematics.', source: 'National Council of Teachers of Mathematics (NCTM) Principles', gradeRange: 'K-3rd' },
    { tip: 'Introduce animal vocabulary through multisensory channels. Have children trace animal names in sand while saying each letter, then match the written word to a photograph. This triple encoding (kinesthetic, auditory, visual) dramatically improves retention for early readers.', source: 'Orton-Gillingham multisensory literacy approach', gradeRange: 'Pre-K to 1st' },
    { tip: 'Leverage the emotional power of animal themes to build growth mindset. When children see that baby animals must practice skills like walking and hunting, they internalize the message that struggle is a natural part of learning, reducing fear of academic failure.', source: 'Carol Dweck, Mindset: The New Psychology of Success, 2006', gradeRange: 'All grades' },
  ],
  food: [
    { tip: 'Connect food worksheets to real nutritional literacy by having students classify their own lunchbox items into food groups after completing a sorting activity. This transfer from paper to reality deepens conceptual understanding far beyond rote categorization.', source: 'USDA MyPlate nutritional education guidelines', gradeRange: 'K-3rd' },
    { tip: 'Use food fractions as an intuitive entry point for mathematical partitioning. Pizzas, pies, and sandwiches naturally divide into halves, quarters, and eighths, giving children concrete visual models before they encounter abstract fraction notation.', source: 'National Council of Teachers of Mathematics (NCTM)', gradeRange: '1st-3rd' },
    { tip: 'Pair food counting activities with cooking experiences. When children count ingredients on paper and then measure them in a real recipe, they build number sense through embodied cognition, which research shows creates stronger neural pathways than pencil-and-paper work alone.', source: 'Lakoff & Nunez, Where Mathematics Comes From, 2000', gradeRange: 'Pre-K to K' },
  ],
  transportation: [
    { tip: 'Use vehicle worksheets to teach comparative measurement. Ask children to estimate and then verify whether a bus is longer than a car, or whether a bicycle wheel is larger than a skateboard wheel. This develops spatial reasoning and measurement vocabulary simultaneously.', source: 'Van Hiele model of geometric reasoning', gradeRange: 'K-2nd' },
    { tip: 'Integrate transportation themes with map skills by having students trace routes between locations after completing a vehicle sorting worksheet. This builds spatial orientation skills that predict later success in geometry and geography.', source: 'National Geography Standards for K-4', gradeRange: '1st-3rd' },
    { tip: 'Leverage children\'s fascination with vehicles to practice sequential reasoning. Activities where students arrange transportation by speed, size, or number of wheels develop seriation skills that are prerequisite to understanding number lines and ordinal relationships.', source: 'Piaget\'s theory of cognitive development (concrete operational stage)', gradeRange: 'Pre-K to 1st' },
  ],
  nature: [
    { tip: 'Take nature worksheets outdoors for maximum impact. When children complete a leaf sorting activity at a desk and then replicate the sort with real leaves in the schoolyard, dual-context learning cements classification skills through embodied experience.', source: 'Richard Louv, Last Child in the Woods, 2005', gradeRange: 'All grades' },
    { tip: 'Use nature observation worksheets to develop scientific drawing skills. Ask children to draw a plant or insect from life, label its parts, and compare their drawing to a worksheet illustration. This builds observational precision that transfers to reading comprehension and mathematical diagram interpretation.', source: 'Next Generation Science Standards (NGSS) Science & Engineering Practices', gradeRange: '1st-3rd' },
    { tip: 'Connect nature counting activities to environmental awareness. When students count trees, flowers, or birds in worksheet scenes, follow up with a discussion about why biodiversity matters. This integrates math practice with social-emotional learning about stewardship.', source: 'North American Association for Environmental Education (NAAEE) guidelines', gradeRange: 'K-2nd' },
  ],
  school: [
    { tip: 'Use school supply worksheets during the first weeks of the academic year as both assessment tools and community builders. While children sort pencils, books, and crayons, teachers can observe fine motor skills, counting abilities, and social interaction patterns without formal testing pressure.', source: 'Responsive Classroom approach to assessment', gradeRange: 'Pre-K to 1st' },
    { tip: 'Transform school-themed worksheets into role-play scenarios. After completing a classroom sorting activity, let children set up a pretend classroom where they teach the same concepts to stuffed animals. Teaching others is the highest level of Bloom\'s taxonomy and dramatically deepens understanding.', source: 'Bloom\'s Revised Taxonomy, Anderson & Krathwohl, 2001', gradeRange: 'K-2nd' },
    { tip: 'Use school routine worksheets to support executive function development. Sequencing activities that order a school day build the planning and time management skills that research identifies as stronger predictors of academic success than IQ.', source: 'Adele Diamond, executive function research, University of British Columbia', gradeRange: '1st-3rd' },
  ],
  sports: [
    { tip: 'Connect sports worksheets to data literacy. Have students collect data from a real or simulated game, such as counting goals, tracking passes, or timing runs, then create simple graphs. This transforms sports enthusiasm into genuine statistical reasoning.', source: 'Common Core Standards for Mathematical Practice (MP.4: Model with mathematics)', gradeRange: '2nd-3rd' },
    { tip: 'Use sports movement vocabulary to build action verb literacy. Worksheets that label actions like throw, catch, kick, and sprint give kinesthetic learners a physical anchor for verb recognition that transfers to reading comprehension of narrative texts.', source: 'Total Physical Response (TPR) language teaching methodology', gradeRange: 'Pre-K to 1st' },
    { tip: 'Leverage the rules of sports to teach logical reasoning. When children explain why a soccer goal counts or does not count based on game rules, they practice the same if-then conditional logic that underpins mathematical proof and computer science.', source: 'National Council of Teachers of Mathematics (NCTM) process standards', gradeRange: '1st-3rd' },
  ],
  emotions: [
    { tip: 'Use emotion worksheets as morning check-in tools. Having children identify their current feeling on a worksheet before academic instruction begins reduces emotional interference with learning and builds the self-awareness vocabulary that predicts social-emotional competence.', source: 'CASEL (Collaborative for Academic, Social, and Emotional Learning) framework', gradeRange: 'All grades' },
    { tip: 'Connect emotion identification worksheets to literacy instruction. When children match facial expressions to emotion words, they are simultaneously building sight word vocabulary, developing empathy, and practicing the inference skills that reading comprehension demands.', source: 'Marc Brackett, Permission to Feel, Yale Center for Emotional Intelligence, 2019', gradeRange: 'K-2nd' },
    { tip: 'Use emotion-themed sorting activities to teach the concept of a spectrum. Emotions exist on continuums (slightly happy to very happy) which parallels mathematical concepts like number lines and measurement scales, making this a natural cross-curricular connection.', source: 'Zones of Regulation curriculum, Leah Kuypers, 2011', gradeRange: '1st-3rd' },
  ],
  body: [
    { tip: 'Use body part worksheets as an entry point for measurement concepts. Having children measure their own hand span, foot length, or arm reach and then record the data on a worksheet creates personal connections to mathematical measurement that abstract units cannot match.', source: 'Measurement standards, Common Core Math K.MD', gradeRange: 'K-2nd' },
    { tip: 'Connect body worksheets to health literacy by discussing why we need to care for each body part. This transforms an anatomy lesson into a public health conversation that builds vocabulary, reasoning skills, and health-protective knowledge simultaneously.', source: 'National Health Education Standards (NHES)', gradeRange: 'All grades' },
    { tip: 'Use body symmetry worksheets to introduce geometric concepts. When children draw the other half of a face or body, they practice line symmetry, proportional reasoning, and spatial awareness, all foundational geometry skills that benefit from a personal, relatable context.', source: 'Van Hiele model of geometric thinking', gradeRange: '1st-3rd' },
  ],
  clothing: [
    { tip: 'Use clothing sorting worksheets to develop multi-attribute classification. Sorting by color alone is pre-K level; sorting by color AND season is a significantly more complex cognitive operation that builds the hierarchical thinking needed for scientific taxonomy.', source: 'Piaget\'s classification development stages', gradeRange: 'Pre-K to 2nd' },
    { tip: 'Connect clothing worksheets to cultural awareness. When children see that different cultures wear different clothing for similar purposes (warmth, protection, celebration), they develop cross-cultural respect while practicing the compare-and-contrast skills that strengthen reading comprehension.', source: 'National Council for the Social Studies (NCSS) thematic standards', gradeRange: 'K-3rd' },
    { tip: 'Leverage clothing themes for practical math by having children calculate costs. Simple addition of shirt plus pants prices, or comparing which outfit costs more, provides authentic mathematical context that children recognize from real shopping experiences.', source: 'Realistic Mathematics Education (RME) approach, Freudenthal Institute', gradeRange: '1st-3rd' },
  ],
  household: [
    { tip: 'Use household object worksheets to build spatial vocabulary. Prepositions like on, under, beside, and between are best learned through familiar home contexts, and spatial language proficiency directly predicts mathematical achievement in geometry and measurement.', source: 'Pruden, Levine & Huttenlocher, spatial language research, University of Chicago', gradeRange: 'Pre-K to 1st' },
    { tip: 'Connect household sorting activities to real organizational skills. After completing a worksheet sorting items by room, have children organize a section of their own desk or shelf. This transfer from abstract to practical develops executive function skills.', source: 'Montessori practical life curriculum principles', gradeRange: 'K-2nd' },
    { tip: 'Use household item counting worksheets to practice estimation before counting. Ask children to guess how many cups are in the picture before they count, then compare their estimate to the actual number. This builds number sense and metacognitive awareness simultaneously.', source: 'John Van de Walle, Elementary and Middle School Mathematics, estimation strategies', gradeRange: 'K-3rd' },
  ],
  toys: [
    { tip: 'Use toy-themed worksheets to teach economic thinking. Activities where children choose which toys they would buy with a limited budget introduce opportunity cost and decision-making, connecting mathematical addition to real-world financial literacy.', source: 'Council for Economic Education, K-4 standards', gradeRange: '1st-3rd' },
    { tip: 'Leverage toy familiarity to reduce math anxiety. When children encounter addition problems featuring their favorite toys instead of abstract symbols, their emotional connection to the content lowers the stress response that typically inhibits mathematical reasoning.', source: 'Sian Beilock, math anxiety research, University of Chicago', gradeRange: 'Pre-K to 2nd' },
    { tip: 'Connect toy sorting worksheets to engineering thinking. When children classify toys by how they work (wheels, springs, batteries, magnets), they develop early technology literacy and the categorical reasoning that supports STEM inquiry.', source: 'ITEEA Standards for Technological and Engineering Literacy', gradeRange: 'K-3rd' },
  ],
  music: [
    { tip: 'Use music worksheets to reinforce pattern recognition. Rhythm patterns (clap-clap-rest, clap-clap-rest) are mathematical sequences, and children who practice musical patterning consistently outperform peers on mathematical pattern assessments.', source: 'Spelke, 2008, Core Knowledge of Geometry and Number, Harvard University', gradeRange: 'Pre-K to 2nd' },
    { tip: 'Connect instrument counting worksheets to multiplicative thinking. Grouping four drums and three guitars introduces the concept of equal groups, building the conceptual foundation for multiplication well before formal instruction begins.', source: 'Common Core Math 2.OA.C.4 (arrays and equal groups)', gradeRange: '1st-3rd' },
    { tip: 'Use music vocabulary worksheets to build phonological awareness. Words like tambourine, xylophone, and triangle expose children to complex syllable structures and unusual letter combinations, expanding the phonological repertoire that supports decoding skills.', source: 'National Reading Panel, phonological awareness research', gradeRange: 'K-2nd' },
  ],
  jobs: [
    { tip: 'Use community helper worksheets to develop interview and research skills. After identifying job roles on a worksheet, have children prepare three questions they would ask someone in that profession. This builds inquiry skills and connects academic work to real-world purpose.', source: 'Project-based learning principles, Buck Institute for Education', gradeRange: '2nd-3rd' },
    { tip: 'Connect job-themed worksheets to mathematical operations by exploring how different workers use math daily. A baker measures ingredients, a carpenter measures wood, a nurse counts medications. This contextualizes arithmetic within authentic professional scenarios.', source: 'Realistic Mathematics Education (RME), Freudenthal Institute', gradeRange: '1st-3rd' },
    { tip: 'Use career-themed sorting activities to challenge gender stereotypes early. Research shows that children develop rigid occupational gender associations by age six, and diverse visual representation in worksheets is one of the most effective interventions.', source: 'Bigler & Liben, developmental intergroup theory, 2007', gradeRange: 'Pre-K to K' },
  ],
  space: [
    { tip: 'Use space worksheets to introduce the concept of scale. Comparing planet sizes, distances between celestial bodies, or the relative brightness of stars helps children understand that numbers can represent enormous quantities, expanding their number sense beyond the classroom scale.', source: 'Common Core Math: Measurement & Data standards', gradeRange: '2nd-3rd' },
    { tip: 'Connect space counting activities to scientific observation skills. When children count stars in a constellation worksheet and then look at the real night sky, they practice the same observe-record-compare cycle that professional scientists use.', source: 'Next Generation Science Standards (NGSS), Science Practices', gradeRange: 'K-2nd' },
    { tip: 'Leverage space themes to build persistence through productive struggle. The narrative of astronaut training, where mistakes are expected and persistence is essential, provides a powerful metaphor for academic challenge that research shows improves growth mindset.', source: 'Carol Dweck, growth mindset research, Stanford University', gradeRange: 'All grades' },
  ],
  seasons: [
    { tip: 'Use seasonal worksheets as a year-long data collection project. Track temperature, daylight hours, or clothing choices across all four seasons and create cumulative graphs. This longitudinal approach teaches data trends in a way that single worksheets cannot.', source: 'Common Core Math: Measurement & Data, graphing standards', gradeRange: '1st-3rd' },
    { tip: 'Connect seasonal themes to cause-and-effect reasoning. When children sort activities by season and explain why swimming belongs to summer or sledding to winter, they practice the causal reasoning that underpins both scientific inquiry and reading comprehension.', source: 'Next Generation Science Standards (NGSS), Crosscutting Concepts', gradeRange: 'K-2nd' },
    { tip: 'Use seasonal transition periods to explore the concept of gradual change. Discussing how fall slowly becomes winter parallels mathematical concepts like number lines and gradients, building abstract thinking through concrete, observable phenomena.', source: 'Vygotsky, zone of proximal development through concrete-to-abstract scaffolding', gradeRange: 'Pre-K to 1st' },
  ],
  holidays: [
    { tip: 'Use holiday worksheets to practice calendar math skills. Counting days until a holiday, identifying the day of the week it falls on, and calculating how many weeks remain all reinforce the temporal reasoning that young children find inherently motivating during holiday anticipation.', source: 'Common Core Math K.MD: Describe and compare measurable attributes', gradeRange: 'K-2nd' },
    { tip: 'Connect holiday themes to cultural literacy by including diverse celebrations in worksheet sets. When children learn that different cultures celebrate different holidays for different reasons, they develop the perspective-taking skills that strengthen both social competence and reading comprehension.', source: 'National Council for the Social Studies (NCSS), cultural understanding standards', gradeRange: '1st-3rd' },
    { tip: 'Leverage holiday excitement to introduce budgeting concepts. Simple activities where children allocate a pretend budget to buy holiday gifts or supplies combine addition, subtraction, comparison, and decision-making in an emotionally engaging context.', source: 'Council for Economic Education, financial literacy standards', gradeRange: '2nd-3rd' },
  ],
  weather: [
    { tip: 'Use weather worksheets as daily data collection tools. Recording temperature, cloud cover, and precipitation each morning and then graphing weekly results teaches data literacy through repetition and personal relevance, which research shows outperforms worksheet-only instruction.', source: 'Common Core Math: Measurement & Data, representing data standards', gradeRange: 'K-3rd' },
    { tip: 'Connect weather sorting activities to scientific prediction. After children classify weather types on a worksheet, ask them to predict tomorrow\'s weather using today\'s observations. This builds the hypothesis-test cycle that is central to scientific inquiry.', source: 'Next Generation Science Standards (NGSS), ESS2: Earth\'s Systems', gradeRange: '1st-3rd' },
    { tip: 'Use weather vocabulary worksheets to build academic language. Terms like precipitation, temperature, and forecast appear in standardized assessments across subjects, and early exposure through meaningful weather contexts accelerates academic vocabulary acquisition.', source: 'Isabel Beck, Bringing Words to Life: Robust Vocabulary Instruction, 2002', gradeRange: 'K-2nd' },
  ],
  colors: [
    { tip: 'Use color mixing worksheets as an introduction to experimental reasoning. When children predict what happens when red and blue mix, test their prediction with paint, and then record the result on a worksheet, they complete a full scientific inquiry cycle.', source: 'Next Generation Science Standards (NGSS), Science & Engineering Practices', gradeRange: 'Pre-K to 1st' },
    { tip: 'Connect color sorting activities to data representation. Creating bar graphs of how many objects are each color builds graphing skills while reinforcing color recognition, achieving two learning objectives in a single engaging activity.', source: 'Common Core Math 1.MD.C.4: Organize and represent data', gradeRange: 'K-2nd' },
    { tip: 'Use color pattern worksheets to build algebraic thinking. Identifying and extending color patterns (red, blue, red, blue) develops the same pattern recognition skills that children will later apply to numerical sequences and algebraic expressions.', source: 'NCTM Algebra standards for early childhood', gradeRange: 'Pre-K to 2nd' },
  ],
  shapes: [
    { tip: 'Move beyond naming shapes to exploring their properties. Ask children to count sides and corners, compare shapes by size, and find shapes within complex figures. This property-based approach builds geometric reasoning that shape recognition alone cannot develop.', source: 'Van Hiele levels of geometric thinking', gradeRange: 'K-2nd' },
    { tip: 'Use shape worksheets as a springboard for architectural observation. After identifying shapes on paper, take a walk and find triangles in roofs, rectangles in windows, and circles in wheels. This real-world connection cements geometric concepts through embodied experience.', source: 'Clements & Sarama, Learning and Teaching Early Math: The Learning Trajectories Approach, 2014', gradeRange: 'Pre-K to 1st' },
    { tip: 'Connect shape worksheets to spatial reasoning through construction challenges. After identifying shapes, have children build them with craft sticks or clay. Research shows that construction activities improve spatial visualization abilities by up to 40% in early learners.', source: 'Newcombe & Frick, spatial skills research, Temple University', gradeRange: 'K-3rd' },
  ],
  numbers: [
    { tip: 'Use number worksheets to build number sense, not just number recognition. Activities that ask children to compare quantities, estimate amounts, and compose/decompose numbers develop flexible mathematical thinking that rote counting cannot achieve.', source: 'John Van de Walle, Teaching Student-Centered Mathematics, 2013', gradeRange: 'K-2nd' },
    { tip: 'Connect number worksheets to real counting contexts daily. After a counting worksheet, count real objects during cleanup time, snack distribution, or attendance. This repeated transfer between symbolic and physical counting builds robust cardinality understanding.', source: 'Common Core Math K.CC: Know number names and the count sequence', gradeRange: 'Pre-K to K' },
    { tip: 'Use number line activities to develop spatial-numerical associations. Research shows that children who can accurately place numbers on a number line demonstrate better arithmetic skills, because the mental number line is the cognitive foundation for calculation.', source: 'Siegler & Booth, 2004, Development of numerical estimation, Psychological Science', gradeRange: '1st-3rd' },
  ],
  alphabet: [
    { tip: 'Teach letter formation through multisensory worksheets that combine tracing with sound production. Have children say the letter sound while tracing, which creates a motor-phonological connection that strengthens both handwriting fluency and phonemic awareness.', source: 'Orton-Gillingham multisensory approach', gradeRange: 'Pre-K to 1st' },
    { tip: 'Focus alphabet worksheets on the letters children find most confusing (b/d, p/q, m/w) rather than teaching A-Z sequentially. Research shows that targeted practice on frequently confused letters reduces reversal errors more effectively than alphabetical instruction.', source: 'National Reading Panel findings on phonics instruction', gradeRange: 'K-1st' },
    { tip: 'Connect letter recognition worksheets to environmental print hunts. After identifying letters on paper, challenge children to find those same letters on cereal boxes, street signs, or book covers. This transfer builds the automatic letter recognition that fluent reading requires.', source: 'Marie Clay, Reading Recovery program principles', gradeRange: 'Pre-K to K' },
  ],
  furniture: [
    { tip: 'Use furniture worksheets to practice spatial prepositions in context. Activities placing objects on, under, beside, and behind furniture build the spatial language that research identifies as a powerful predictor of mathematical achievement.', source: 'Pruden, Levine & Huttenlocher, spatial language research, University of Chicago', gradeRange: 'Pre-K to 1st' },
    { tip: 'Connect furniture-themed counting to room design activities. Have children plan a room layout by selecting and counting furniture pieces within a budget, integrating addition, spatial reasoning, and creative thinking in one authentic task.', source: 'Realistic Mathematics Education (RME), Freudenthal Institute', gradeRange: '1st-3rd' },
    { tip: 'Use furniture sorting worksheets to develop functional categorization skills. Sorting by room (bedroom, kitchen, bathroom) requires understanding purpose and function rather than just visual appearance, building the abstract thinking skills that formal education demands.', source: 'Vygotsky, concept formation through functional categorization', gradeRange: 'K-2nd' },
  ],
  easter: [
    { tip: 'Use Easter egg hunt worksheets to teach probability concepts. Activities where children predict which color egg they will find next, based on the colors already found, introduce basic probability reasoning in an exciting, familiar context.', source: 'Common Core Math: Statistics & Probability standards', gradeRange: '2nd-3rd' },
    { tip: 'Connect Easter pattern activities to algebraic thinking. Decorating eggs with repeating patterns (stripe, dot, stripe, dot) is a concrete introduction to mathematical sequences that builds the pattern recognition skills prerequisite to formal algebra.', source: 'NCTM Algebra standards for early childhood', gradeRange: 'Pre-K to 1st' },
    { tip: 'Leverage seasonal excitement to practice equal sharing. Dividing Easter eggs equally among baskets introduces the concept of fair sharing that is the conceptual foundation of division, long before children encounter formal division notation.', source: 'Carpenter et al., Children\'s Mathematics: Cognitively Guided Instruction, 1999', gradeRange: 'K-2nd' },
  ],
  halloween: [
    { tip: 'Use Halloween worksheets to explore estimation skills. Activities where children estimate how many candy pieces fill a jar, then count to verify, build the estimation-verification cycle that strengthens number sense and metacognitive awareness.', source: 'John Van de Walle, estimation strategies for elementary mathematics', gradeRange: 'K-3rd' },
    { tip: 'Connect Halloween sorting activities to Venn diagram thinking. Sorting costumes by scary versus funny, and identifying costumes that are both, introduces set intersection in a context that children find genuinely engaging.', source: 'Common Core Math: Classification standards', gradeRange: '1st-3rd' },
    { tip: 'Leverage the creative energy of Halloween for narrative writing integration. After completing a Halloween word search or vocabulary worksheet, have children write a short story using the discovered words. This transfers vocabulary acquisition into productive language use.', source: 'National Writing Project, writing across the curriculum principles', gradeRange: '1st-3rd' },
  ],
  xmas: [
    { tip: 'Use Christmas worksheets to practice skip counting. Counting ornaments by twos, lights by fives, or presents by tens builds multiplicative thinking in a festive context that sustains attention during the high-excitement holiday period.', source: 'Common Core Math 2.NBT.A.2: Skip-count by 5s, 10s, and 100s', gradeRange: 'K-2nd' },
    { tip: 'Connect gift-themed worksheets to measurement activities. Wrapping presents requires estimating and measuring length, while baking cookies involves measuring volume and weight. These authentic holiday tasks make measurement standards concrete and memorable.', source: 'Common Core Math: Measurement & Data standards', gradeRange: '1st-3rd' },
    { tip: 'Use holiday wish list activities to teach prioritization and budgeting. When children rank wishes and calculate costs within a budget, they practice comparison, addition, subtraction, and decision-making skills in a context that feels personally meaningful.', source: 'Council for Economic Education, financial literacy K-4 standards', gradeRange: '2nd-3rd' },
  ],
  winter: [
    { tip: 'Use winter worksheets to explore temperature as a measurement concept. Reading thermometers, comparing temperatures, and tracking daily changes introduce negative numbers and number line concepts in a naturally occurring context that makes abstract math tangible.', source: 'Common Core Math: Measurement & Data, temperature standards', gradeRange: '1st-3rd' },
    { tip: 'Connect snowflake symmetry worksheets to geometric reasoning. Drawing and identifying lines of symmetry in snowflakes develops spatial visualization skills that research links to later success in geometry, engineering, and architectural thinking.', source: 'Newcombe & Frick, spatial reasoning research, Temple University', gradeRange: 'K-2nd' },
    { tip: 'Leverage winter clothing layering to teach sequencing skills. Activities that order dressing steps (socks before boots, shirt before coat) build the sequential reasoning that supports both mathematical procedural thinking and reading comprehension of procedural texts.', source: 'Piaget, seriation development in the preoperational stage', gradeRange: 'Pre-K to K' },
  ],
  farm: [
    { tip: 'Use farm worksheets to introduce multiplication through equal groups. Counting eggs by dozens, apples in bushels, or animals in pens creates natural grouping scenarios that build the conceptual foundation for multiplication well before formal instruction.', source: 'Carpenter et al., Cognitively Guided Instruction (CGI) multiplication research', gradeRange: '1st-3rd' },
    { tip: 'Connect farm-themed activities to life cycle science. When children sequence plant growth stages or animal development on worksheets, they practice both scientific observation skills and the ordinal thinking that supports mathematical sequencing.', source: 'Next Generation Science Standards (NGSS), LS1: From Molecules to Organisms', gradeRange: 'K-2nd' },
    { tip: 'Use farm animal worksheets to develop comparison language. Activities asking whether cows are bigger than chickens, or whether horses run faster than pigs, build the comparative and superlative vocabulary that academic discourse requires across all subjects.', source: 'Common Core ELA: Language standards for vocabulary acquisition', gradeRange: 'Pre-K to 1st' },
  ],
  ocean: [
    { tip: 'Use ocean worksheets to explore depth and layering concepts. Activities that sort sea creatures by ocean zone (surface, middle, deep) introduce the spatial concept of layering that parallels geological strata and mathematical number hierarchies.', source: 'Next Generation Science Standards (NGSS), ESS2: Earth\'s Systems', gradeRange: '1st-3rd' },
    { tip: 'Connect ocean counting activities to conservation math. When children count fish and then discuss what happens when too many are caught, they learn about subtraction in a context that also builds environmental literacy and ethical reasoning.', source: 'North American Association for Environmental Education (NAAEE)', gradeRange: 'K-2nd' },
    { tip: 'Leverage the mystery of ocean life to build inquiry skills. Present ocean worksheets as detective missions where children must find hidden creatures, count species, and classify by features. This investigative framing increases engagement and models scientific inquiry habits.', source: 'National Research Council, Inquiry and the National Science Education Standards', gradeRange: 'Pre-K to 2nd' },
  ],
  dinosaurs: [
    { tip: 'Use dinosaur worksheets to introduce the concept of deep time and large numbers. When children learn that dinosaurs lived millions of years ago, they stretch their number sense beyond everyday experience, building comfort with large quantities that supports later mathematical reasoning.', source: 'Common Core Math: Number & Operations in Base Ten, place value standards', gradeRange: '2nd-3rd' },
    { tip: 'Connect dinosaur classification worksheets to scientific taxonomy skills. Sorting dinosaurs by diet (herbivore, carnivore, omnivore), era, or physical features builds the same hierarchical classification abilities used in formal biology.', source: 'Next Generation Science Standards (NGSS), LS4: Biological Evolution', gradeRange: 'K-2nd' },
    { tip: 'Leverage dinosaur enthusiasm to build academic vocabulary. Words like extinct, fossil, predator, and herbivore are Tier 2 academic vocabulary that appears across disciplines, and dinosaur contexts provide the emotional engagement that makes these words stick.', source: 'Isabel Beck, Bringing Words to Life: Robust Vocabulary Instruction, 2002', gradeRange: 'K-3rd' },
  ],
  insects: [
    { tip: 'Use insect worksheets to develop precise counting skills. Counting six legs on each insect, four wings on a butterfly, or eight eyes on a spider provides natural practice with small-number arithmetic in a context that demands careful observation.', source: 'Common Core Math K.CC: Count to tell the number of objects', gradeRange: 'Pre-K to 1st' },
    { tip: 'Connect insect life cycle worksheets to sequencing and transformation concepts. Following the stages from egg to caterpillar to chrysalis to butterfly teaches sequential reasoning and the mathematical concept that quantities can change form while maintaining essential properties.', source: 'Next Generation Science Standards (NGSS), LS1: From Molecules to Organisms', gradeRange: 'K-2nd' },
    { tip: 'Leverage children\'s curiosity about insects to build observational drawing skills. Detailed insect illustrations require attention to small differences (antennae, leg segments, wing patterns) that develop the visual discrimination abilities supporting letter recognition and reading readiness.', source: 'Betty Edwards, Drawing on the Right Side of the Brain, visual perception research', gradeRange: 'Pre-K to 1st' },
  ],
  fruits: [
    { tip: 'Use fruit worksheets to teach fractions through natural models. Apples cut in half, oranges in quarters, and watermelons in slices provide intuitive fraction representations that research shows are more effective than abstract geometric shapes for initial fraction instruction.', source: 'Common Core Math 3.NF: Develop understanding of fractions', gradeRange: '1st-3rd' },
    { tip: 'Connect fruit sorting activities to nutritional science. When children categorize fruits by color, season, or growing region, they simultaneously practice classification skills and build health literacy that supports informed eating choices.', source: 'USDA Dietary Guidelines for Americans, nutrition education standards', gradeRange: 'K-2nd' },
    { tip: 'Leverage fruit themes to practice estimation and weighing. Activities where children estimate how many grapes fill a cup or which fruit is heaviest develop the measurement sense that standardized assessments increasingly emphasize.', source: 'Common Core Math: Measurement & Data standards', gradeRange: 'Pre-K to 1st' },
  ],
  vegetables: [
    { tip: 'Use vegetable garden worksheets to teach spatial planning. Activities where children decide where to plant each vegetable in a grid develop the coordinate thinking and area concepts that formal geometry instruction builds upon.', source: 'Common Core Math 3.MD: Geometric measurement and area concepts', gradeRange: '1st-3rd' },
    { tip: 'Connect vegetable sorting activities to sensory vocabulary development. Describing vegetables as crunchy, smooth, leafy, or bumpy builds the descriptive language skills that strengthen both scientific observation reports and narrative writing.', source: 'Common Core ELA: Language standards, vocabulary acquisition', gradeRange: 'Pre-K to 1st' },
    { tip: 'Leverage vegetable growth worksheets to introduce measurement over time. Tracking how tall a plant grows each week on a simple chart teaches data collection, graphing, and the concept of change over time in a hands-on, patient-building activity.', source: 'Next Generation Science Standards (NGSS), Science Practices: Planning investigations', gradeRange: 'K-2nd' },
  ],
  flowers: [
    { tip: 'Use flower worksheets to teach symmetry through petal patterns. Many flowers have natural rotational and reflective symmetry, making them perfect models for introducing geometric transformations in a beautiful, engaging context.', source: 'Common Core Math 4.G: Draw and identify lines of symmetry', gradeRange: '1st-3rd' },
    { tip: 'Connect flower counting activities to multiplication concepts. Counting petals on multiple flowers (5 petals times 3 flowers) provides a concrete introduction to repeated addition and multiplicative thinking.', source: 'Common Core Math 2.OA.C.4: Work with equal groups of objects', gradeRange: 'K-2nd' },
    { tip: 'Leverage flower themes to build color vocabulary and mixing understanding. When children color flowers and explore what happens when colors blend on the page, they practice fine motor skills while gaining intuitive understanding of color theory principles.', source: 'Lowenfeld & Brittain, Creative and Mental Growth, art education principles', gradeRange: 'Pre-K to 1st' },
  ],
  birds: [
    { tip: 'Use bird worksheets to develop observational comparison skills. Activities that ask children to compare beak shapes, wing spans, and foot types build the systematic comparison abilities that underpin both scientific classification and mathematical relational thinking.', source: 'Next Generation Science Standards (NGSS), LS4: Biological Evolution (adaptations)', gradeRange: '1st-3rd' },
    { tip: 'Connect bird counting to citizen science projects. After practicing counting birds on worksheets, have children participate in real bird counts using their window or schoolyard, building data collection skills through authentic scientific participation.', source: 'Cornell Lab of Ornithology, eBird citizen science program', gradeRange: 'K-3rd' },
    { tip: 'Leverage bird migration to teach directional and map concepts. Following bird migration routes on simplified maps develops the spatial orientation and directional vocabulary (north, south, east, west) that geography and geometry instruction require.', source: 'National Geography Standards for K-4', gradeRange: '1st-3rd' },
  ],
  pets: [
    { tip: 'Use pet care worksheets to develop scheduling and time management skills. Creating a pet feeding and walking schedule requires understanding of daily routines, time intervals, and responsibility, building executive function through an emotionally engaging context.', source: 'Adele Diamond, executive function development research, University of British Columbia', gradeRange: '1st-3rd' },
    { tip: 'Connect pet worksheets to survey and graphing activities. Conducting a class survey about favorite pets and creating bar graphs teaches data collection, representation, and interpretation skills using topics children care deeply about.', source: 'Common Core Math 1.MD.C.4: Represent and interpret data', gradeRange: 'K-2nd' },
    { tip: 'Leverage the emotional bond children feel with pets to teach responsibility concepts. Worksheets about pet needs (food, water, shelter, exercise) parallel the social-emotional learning standards about caring for others and understanding interdependence.', source: 'CASEL social-emotional learning competencies framework', gradeRange: 'Pre-K to 1st' },
  ],
  zoo: [
    { tip: 'Use zoo map worksheets to develop directional and spatial reasoning. Having children navigate a zoo map to find specific animals builds the same wayfinding skills that predict success in geometry and coordinate plane mathematics.', source: 'Newcombe & Huttenlocher, Making Space: The Development of Spatial Representation, MIT Press', gradeRange: 'K-2nd' },
    { tip: 'Connect zoo-themed worksheets to habitat classification. When children sort animals into their correct zoo sections (African savanna, Arctic, rainforest), they practice multi-attribute classification that develops both scientific and mathematical reasoning.', source: 'Next Generation Science Standards (NGSS), LS2: Ecosystems', gradeRange: '1st-3rd' },
    { tip: 'Leverage zoo excitement to build descriptive writing skills. After completing a zoo animal identification worksheet, have children write sentences describing their favorite animal using at least three adjectives. This transfers vocabulary recognition into productive language use.', source: 'Common Core ELA: Writing standards, descriptive writing', gradeRange: 'K-2nd' },
  ],
  garden: [
    { tip: 'Use garden worksheets to teach measurement through planting activities. Measuring seed spacing, garden bed dimensions, and plant heights provides authentic measurement contexts that make abstract units like inches and centimeters personally meaningful.', source: 'Common Core Math: Measurement & Data standards', gradeRange: 'K-2nd' },
    { tip: 'Connect garden counting to addition and subtraction word problems. Stories about planting seeds, picking vegetables, and sharing the harvest create natural contexts for arithmetic operations that feel like real life rather than abstract exercises.', source: 'Carpenter et al., Cognitively Guided Instruction (CGI), word problem research', gradeRange: '1st-3rd' },
    { tip: 'Leverage garden themes to develop patience and long-term thinking. Tracking plant growth over weeks on a worksheet chart teaches children that meaningful outcomes require sustained effort, reinforcing the growth mindset that predicts academic persistence.', source: 'Angela Duckworth, Grit: The Power of Passion and Perseverance, 2016', gradeRange: 'All grades' },
  ],
  camping: [
    { tip: 'Use camping worksheets to teach survival math. Activities about rationing food, calculating distances, or reading trail maps provide authentic mathematical contexts where getting the right answer has clear practical importance, increasing motivation and precision.', source: 'Realistic Mathematics Education (RME), authentic contexts principle', gradeRange: '2nd-3rd' },
    { tip: 'Connect camping themes to scientific observation worksheets. Nature journaling activities where children draw and label plants, animals, or geological features they might see while camping build the systematic observation skills central to scientific inquiry.', source: 'Next Generation Science Standards (NGSS), Science Practices: Obtaining and communicating information', gradeRange: 'K-2nd' },
    { tip: 'Leverage camping excitement to practice list-making and organizational skills. Creating a camping packing list requires categorization (clothing, food, equipment), counting, and planning, building executive function through an engaging imaginary scenario.', source: 'Montessori practical life curriculum, organizational skill development', gradeRange: '1st-3rd' },
  ],
  pirates: [
    { tip: 'Use treasure map worksheets to develop coordinate grid thinking. Following map coordinates to find hidden treasure is a concrete introduction to the coordinate plane that makes abstract x-y notation feel like an adventure rather than a math lesson.', source: 'Common Core Math 5.G: Graph points on the coordinate plane', gradeRange: '1st-3rd' },
    { tip: 'Connect pirate counting activities to addition and subtraction stories. Narratives about finding gold coins, sharing treasure, or losing gems to sea monsters create compelling word problem contexts that sustain attention through the emotional power of the story.', source: 'Carpenter et al., Cognitively Guided Instruction (CGI)', gradeRange: 'K-2nd' },
    { tip: 'Leverage pirate themes to teach directional vocabulary. Following treasure map instructions using compass directions (north, south, east, west) and distance language (three steps forward, turn right) builds spatial orientation skills essential for geometry and geography.', source: 'National Geography Standards for K-4, spatial thinking', gradeRange: 'K-2nd' },
  ],
  'fairy-tales': [
    { tip: 'Use fairy tale worksheets to develop narrative comprehension skills. Sequencing story events, identifying characters, and predicting outcomes on worksheets build the same comprehension strategies that standardized reading assessments measure.', source: 'National Reading Panel, comprehension strategy instruction', gradeRange: 'K-2nd' },
    { tip: 'Connect fairy tale themes to mathematical concepts naturally embedded in stories. The Three Little Pigs teaches counting and material properties, Goldilocks teaches comparison and ordering, and Jack and the Beanstalk teaches measurement and growth. These narratives make math memorable.', source: 'Whitin & Whitin, Math Is Language Too: Talking and Writing in the Mathematics Classroom, 2000', gradeRange: 'Pre-K to 1st' },
    { tip: 'Leverage fairy tale characters to explore perspective-taking. Worksheets that ask children to retell a story from the wolf\'s perspective or the giant\'s viewpoint develop the theory of mind skills that support both social competence and literary analysis.', source: 'Common Core ELA: Reading Literature, point of view standards', gradeRange: '1st-3rd' },
  ],
  robots: [
    { tip: 'Use robot worksheets to introduce algorithmic thinking. Activities where children write step-by-step instructions for a robot to follow build the sequential reasoning and precision of language that computational thinking and coding require.', source: 'ISTE Standards for Students: Computational Thinker', gradeRange: '1st-3rd' },
    { tip: 'Connect robot building worksheets to geometric shape composition. Constructing robots from basic shapes (circles, rectangles, triangles) teaches children that complex forms can be decomposed into simple components, a foundational geometric concept.', source: 'Common Core Math K.G: Compose simple shapes to form larger shapes', gradeRange: 'Pre-K to 1st' },
    { tip: 'Leverage robot themes to explore the concept of input and output. Simple worksheets where children determine what a robot will do given specific commands introduce the function concept that is central to both mathematics and computer science.', source: 'Code.org Computer Science Fundamentals curriculum', gradeRange: 'K-3rd' },
  ],
  superheroes: [
    { tip: 'Use superhero worksheets to build growth mindset through the origin story narrative. Every superhero started without powers and had to develop them through practice and persistence, mirroring the academic growth trajectory that children need to internalize.', source: 'Carol Dweck, growth mindset research, Stanford University', gradeRange: 'All grades' },
    { tip: 'Connect superhero themes to comparison and measurement activities. Comparing hero heights, speeds, and strengths provides engaging contexts for mathematical comparison operators (greater than, less than, equal to) that abstract symbols alone cannot motivate.', source: 'Common Core Math 1.NBT.B.3: Compare two two-digit numbers', gradeRange: 'K-2nd' },
    { tip: 'Leverage superhero problem-solving narratives to develop mathematical reasoning. When children figure out how a hero can rescue people using available resources, they practice the same constraint-based problem solving that word problems demand.', source: 'Polya, How to Solve It: A New Aspect of Mathematical Method, problem-solving heuristics', gradeRange: '1st-3rd' },
  ],
  construction: [
    { tip: 'Use construction worksheets to teach measurement concepts through building scenarios. Calculating how many bricks fill a wall, how long a beam needs to be, or how much paint covers a surface provides authentic measurement contexts that make abstract units tangible.', source: 'Common Core Math: Measurement & Data standards', gradeRange: '1st-3rd' },
    { tip: 'Connect construction sorting activities to material science concepts. When children classify building materials by properties (hard vs. soft, heavy vs. light, waterproof vs. absorbent), they develop the property-based reasoning that formal science instruction requires.', source: 'Next Generation Science Standards (NGSS), PS1: Matter and Its Interactions', gradeRange: 'K-2nd' },
    { tip: 'Leverage construction themes to develop spatial reasoning through blueprint activities. Simple floor plan worksheets where children identify shapes, measure distances, and plan room layouts build the spatial visualization skills that predict STEM career success.', source: 'Newcombe, 2010, Picture This: Increasing Math and Science Learning by Improving Spatial Thinking', gradeRange: '2nd-3rd' },
  ],
  cooking: [
    { tip: 'Use cooking worksheets to teach fractions through recipe contexts. Measuring half a cup, a quarter teaspoon, or doubling a recipe provides the most intuitive fraction instruction available, because children can taste the result of getting the math right.', source: 'Common Core Math 3.NF: Develop understanding of fractions as numbers', gradeRange: '1st-3rd' },
    { tip: 'Connect cooking sequence worksheets to procedural text comprehension. Following a recipe requires the same sequential reading skills that instruction manuals and science procedures demand, making cooking worksheets a cross-disciplinary literacy tool.', source: 'Common Core ELA: Reading Informational Text, procedural text standards', gradeRange: 'K-2nd' },
    { tip: 'Leverage cooking themes to explore chemical and physical changes. Mixing ingredients, heating dough, and freezing liquids introduce the concepts of reversible and irreversible change that science curricula require, using contexts children find inherently fascinating.', source: 'Next Generation Science Standards (NGSS), PS1: Matter and Its Interactions', gradeRange: '1st-3rd' },
  ],
  travel: [
    { tip: 'Use travel worksheets to develop map reading and scale concepts. Activities where children calculate distances between cities, identify countries, and trace routes build the spatial and mathematical skills that geography and geometry share.', source: 'National Geography Standards for K-4, maps and spatial thinking', gradeRange: '1st-3rd' },
    { tip: 'Connect travel themes to currency and money math. Simple activities comparing prices in different countries or converting between currencies provide authentic mathematical contexts that build both numeracy and cultural awareness simultaneously.', source: 'Council for Economic Education, international economics standards', gradeRange: '2nd-3rd' },
    { tip: 'Leverage travel excitement to build descriptive and comparative vocabulary. Worksheets comparing climates, landscapes, and cultures between destinations develop the academic language skills that informational writing and reading comprehension require.', source: 'Common Core ELA: Language standards, vocabulary acquisition and use', gradeRange: 'K-2nd' },
  ],
  birthday: [
    { tip: 'Use birthday worksheets to teach elapsed time concepts. Calculating ages, counting days until a birthday, or figuring out what time a party ends provide personally meaningful time problems that abstract clock worksheets cannot match.', source: 'Common Core Math 3.MD: Tell and write time, solve elapsed time problems', gradeRange: '1st-3rd' },
    { tip: 'Connect birthday party planning to budgeting and addition. Activities where children select decorations, food, and activities within a pretend budget integrate multiple mathematical operations in an emotionally engaging context that sustains motivation.', source: 'Council for Economic Education, financial literacy standards', gradeRange: '2nd-3rd' },
    { tip: 'Leverage birthday themes to practice equal sharing and division concepts. Dividing cake slices, distributing party favors, and sharing treats equally introduce the fair sharing concept that is the conceptual foundation of division.', source: 'Carpenter et al., Children\'s Mathematics: Cognitively Guided Instruction, division research', gradeRange: 'K-2nd' },
  ],
  circus: [
    { tip: 'Use circus worksheets to teach symmetry and balance concepts. Activities featuring tightrope walkers, balanced acrobat formations, and symmetrical tent designs introduce geometric balance in a visually dramatic context that makes abstract symmetry concepts concrete.', source: 'Common Core Math 4.G: Draw and identify lines of symmetry', gradeRange: 'K-2nd' },
    { tip: 'Connect circus counting activities to multiplication through seating arrangements. Calculating how many people fit in circus rows (6 seats times 5 rows) provides a natural array model for multiplication that is more engaging than abstract grid diagrams.', source: 'Common Core Math 2.OA.C.4: Use addition to find the total number of objects in arrays', gradeRange: '1st-3rd' },
    { tip: 'Leverage circus themes to develop sequential reasoning. Activities that order circus acts, plan performance schedules, or sequence juggling patterns build the same serial order thinking that mathematical procedures and reading comprehension of narrative texts require.', source: 'Piaget, seriation development in concrete operational stage', gradeRange: 'Pre-K to 1st' },
  ],
  forest: [
    { tip: 'Use forest worksheets to teach ecological math concepts. Counting species, measuring tree heights, and calculating leaf areas introduce mathematical operations within an environmental context that builds both numeracy and ecological literacy simultaneously.', source: 'North American Association for Environmental Education (NAAEE) guidelines', gradeRange: '1st-3rd' },
    { tip: 'Connect forest-themed activities to scientific observation journals. Worksheets that ask children to identify, count, and classify forest organisms build the systematic recording habits that professional ecologists use in field research.', source: 'Next Generation Science Standards (NGSS), LS2: Ecosystems', gradeRange: 'K-2nd' },
    { tip: 'Leverage forest themes to develop estimation skills in natural contexts. Estimating how many leaves are on a branch, how tall a tree is compared to a building, or how many animals live in a given area builds the approximation reasoning that practical mathematics requires.', source: 'John Van de Walle, estimation strategies in elementary mathematics education', gradeRange: 'K-3rd' },
  ],
  spring: [
    { tip: 'Use spring worksheets to teach data collection through nature observation. Recording daily temperature, rainfall, and plant growth across spring weeks creates a personal dataset that makes graphing and data analysis skills concrete and meaningful.', source: 'Common Core Math: Measurement & Data, representing and interpreting data', gradeRange: '1st-3rd' },
    { tip: 'Connect spring themes to life cycle and growth sequencing. Activities ordering the stages of seed germination, tadpole development, or butterfly metamorphosis build sequential reasoning while integrating genuine science content.', source: 'Next Generation Science Standards (NGSS), LS1: From Molecules to Organisms', gradeRange: 'K-2nd' },
    { tip: 'Leverage the sensory richness of spring to build descriptive vocabulary. Worksheets about spring sights, sounds, and smells develop the sensory language that strengthens both creative writing and scientific observation reporting.', source: 'Common Core ELA: Language standards, vocabulary acquisition and use', gradeRange: 'Pre-K to 1st' },
  ],
  summer: [
    { tip: 'Use summer worksheets to combat the summer slide effect. Research shows children lose one to three months of academic progress during summer break, and themed worksheets that feel like fun rather than homework maintain learning momentum without triggering resistance.', source: 'Cooper et al., 1996, The Effects of Summer Vacation on Achievement Test Scores, Review of Educational Research', gradeRange: 'All grades' },
    { tip: 'Connect summer activity worksheets to measurement and time concepts. Calculating swim time, measuring sandcastle dimensions, or planning a day trip schedule provides authentic mathematical contexts embedded in children\'s real summer experiences.', source: 'Common Core Math: Measurement & Data standards', gradeRange: '1st-3rd' },
    { tip: 'Leverage summer excitement to build reading stamina through themed activities. Pairing summer word searches and crosswords with summer reading challenges creates a positive association between literacy and leisure that sustains reading habits year-round.', source: 'National Summer Learning Association, summer learning loss prevention research', gradeRange: 'K-3rd' },
  ],
};

// ── Insert expertTips into each file ──────────────────────────────────────────

let modified = 0;
let skipped = 0;

for (const themeId of Object.keys(EXPERT_TIPS)) {
  const filePath = path.join(CONTENT_DIR, themeId, 'en.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${themeId}/en.ts not found`);
    skipped++;
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf8');

  // Check if expertTips already exists
  if (src.includes('expertTips:') || src.includes('"expertTips":')) {
    console.log(`SKIP: ${themeId} already has expertTips`);
    skipped++;
    continue;
  }

  const tips = EXPERT_TIPS[themeId];
  if (!tips || tips.length === 0) {
    console.log(`SKIP: ${themeId} has no tips data`);
    skipped++;
    continue;
  }

  // Build the expertTips block
  const tipsBlock = tips.map(t => {
    // Escape single quotes in tip, source, gradeRange
    const tipEsc = t.tip.replace(/'/g, "\\'");
    const srcEsc = t.source.replace(/'/g, "\\'");
    const grEsc = t.gradeRange.replace(/'/g, "\\'");
    return `    { tip: '${tipEsc}', source: '${srcEsc}', gradeRange: '${grEsc}' }`;
  }).join(',\n');

  const expertTipsSection = `  expertTips: [\n${tipsBlock},\n  ],\n`;

  // Find insertion point: before the closing '};' of the content object
  // Look for the last '],' before '};' and insert after it
  const closingIdx = src.lastIndexOf('};');
  if (closingIdx === -1) {
    console.log(`ERROR: ${themeId} - cannot find closing '};'`);
    skipped++;
    continue;
  }

  // Insert before '};'
  const before = src.slice(0, closingIdx);
  const after = src.slice(closingIdx);

  // Ensure proper spacing
  const newSrc = before.trimEnd() + '\n\n' + expertTipsSection + after;

  fs.writeFileSync(filePath, newSrc, 'utf8');
  console.log(`OK: ${themeId} - added ${tips.length} expertTips`);
  modified++;
}

console.log(`\nDone: ${modified} files modified, ${skipped} skipped`);
