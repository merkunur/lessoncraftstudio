/**
 * SEO Part 46: Enrich transportation & travel EN theme hub pages
 * - Transportation: adds 12 missing enrichment fields
 * - Travel: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Transportation: 12 fields ─────────────────────────────────────────────

const transportationFields = `
  // -- SEO Enrichment (Part 46) --

  uniqueAngle: 'Transportation is the ONLY theme where the educational content IS the engineering that children observe in continuous operation on every street, highway, railway, airport, and harbor \u2014 where wheels, engines, propulsion systems, and infrastructure are not abstract concepts introduced in a classroom but visible, audible, tangible machines that children watch, ride, and interact with every single day. No other theme provides this density of real-world verification: a child who learns about wheels on a worksheet can count them on real vehicles during the drive home, a child who sorts vehicles by propulsion type on paper can verify the categories by watching cars, boats, and planes during a single family outing, and a child who patterns alternating vehicle types on a worksheet sees those exact patterns in parking lots, train yards, and traffic flows. This continuous classroom-to-reality feedback loop is unique to transportation because no other theme\\u2019s subject matter operates at such visible scale in children\\u2019s daily environments. Transportation is also the ONLY theme that teaches the foundational physics concept of force and motion through objects children already love \u2014 where the question "why does this go fast?" IS Newton\\u2019s laws at age four, where "why does this float?" IS buoyancy at age five, and where "why does this fly?" IS aerodynamics at age six, all explored through personally fascinating machines rather than abstract scientific demonstrations. The STEM integration is structurally deeper than any other theme because every vehicle IS an engineering solution to the problem of moving people and goods, meaning every worksheet about vehicles is simultaneously a worksheet about engineering design, materials science, and energy systems. The combination of continuous real-world verification, love-driven physics exploration, and inherent engineering content makes transportation the most naturally STEM-rich theme across all 50 available.',

  researchCitation: 'DeLoache, J. S., Simcock, G., & Macari, S. (2007). "Planes, Trains, Automobiles \\u2014 and Tea Sets: Extremely Intense Interests in Very Young Children." Developmental Psychology, 43(6), 1579\\u20131586 \\u2014 establishing that the extremely intense interest in vehicles that many children develop between ages 18 months and 6 years produces significantly enhanced conceptual knowledge, vocabulary acquisition, and sustained attention when leveraged as an educational context, because interest-driven learning activates deeper cognitive processing than externally motivated instruction.',

  snippetDefinition: 'Transportation worksheets for kids are printable educational activities featuring cars, trucks, trains, planes, boats, and construction vehicles designed to build counting fluency, size comparison, classification skills, and STEM vocabulary for children ages 3 through 9. They include coloring pages for fine motor development, addition and subtraction with vehicle and passenger counters, shadow matching and size comparison for visual discrimination, sorting by land/water/air for classification, word search for transportation vocabulary, pattern trains for algebraic thinking, and odd-one-out puzzles for analytical reasoning.',

  snippetHowTo: [
    'Start with coloring pages of cars, trucks, and trains to build fine motor control and vehicle vocabulary through detailed engineering illustrations that capture the geometric complexity of real machines.',
    'Progress to matching-app and shadow-match worksheets where children pair vehicles to silhouettes and match transportation pairs, developing visual discrimination and shape recognition through high-contrast vehicle imagery.',
    'Introduce classification with picture-sort worksheets where children categorize vehicles by land, water, and air, building the categorical thinking that underpins scientific classification.',
    'Advance to measurement with big-small-app size comparison activities where children order vehicles from smallest to largest, developing seriation and measurement vocabulary.',
    'Incorporate arithmetic with image-addition and subtraction worksheets using vehicle and passenger counters that connect math operations to real-world transportation scenarios.',
    'Extend to pattern recognition with pattern-train activities featuring alternating vehicle sequences and odd-one-out analytical puzzles that develop algebraic thinking through engineering contexts.',
    'Connect to real transportation through vehicle spotting logs, traffic pattern observation, and community vehicle surveys that verify worksheet concepts through daily environmental interaction.',
  ],

  limitations: 'Transportation worksheets\\u2019 focus on vehicles and engineering systems provides less direct scope for emotional exploration, narrative storytelling, or biological science than themes like emotions, fairy tales, or animals where character development, feelings, and life science drive the activities. The theme\\u2019s strength in STEM classification, measurement comparison, and mechanical vocabulary means it offers less material for extended creative writing, cultural exploration, or social-emotional development than themes with richer narrative and interpersonal dimensions. While vehicles are universally familiar, the specific vehicle types depicted may vary in relevance depending on children\\u2019s geographic contexts \\u2014 rural children may rarely see trains or ferries, while urban children may rarely see tractors.',

  themeComparisons: [
    {
      vsThemeId: 'travel',
      summary: 'Transportation worksheets provide a vehicle-focused STEM theme studying how machines move through engineering classification, wheel counting, speed comparison, and propulsion analysis within the child\\u2019s observable daily environment. Travel worksheets provide a geography-focused cultural theme studying where people go through map literacy, cultural comparison, trip planning, and global exploration across distant destinations. Transportation teaches engineering depth; travel teaches geographic breadth.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Transportation worksheets study finished vehicles that move people and goods across land, water, and air through classification, comparison, and pattern recognition. Construction worksheets study the machines and processes that build structures through engineering design, material science, and spatial planning. Transportation teaches movement engineering; construction teaches building engineering.',
    },
    {
      vsThemeId: 'jobs',
      summary: 'Transportation worksheets are a vehicle-centered theme where community workers appear as vehicle operators like bus drivers, pilots, and captains within a STEM and engineering learning context. Jobs worksheets are a people-centered theme studying what workers do across all professions for community awareness and career exploration. Transportation teaches vehicles as STEM objects; jobs teaches workers as community members.',
    },
    {
      vsThemeId: 'space',
      summary: 'Transportation worksheets study vehicles children observe daily on streets, railways, and airports for accessible STEM learning through familiar machines. Space worksheets study spacecraft, planets, and celestial phenomena for cosmic-scale science through extraordinary vehicles children dream about. Transportation teaches everyday engineering; space teaches cosmic exploration.',
    },
  ],

  productLinks: [
    {
      appId: 'pattern-train',
      anchorText: 'Transportation pattern worksheets for kids',
      context: 'Algebraic readiness develops when children identify and extend alternating vehicle sequences in our transportation pattern worksheets for kids, analyzing repeating car, bus, and train patterns to predict what comes next \\u2014 building the pattern recognition foundation that connects vehicle engineering fascination to mathematical sequence thinking and early algebraic reasoning.',
    },
    {
      appId: 'big-small-app',
      anchorText: 'Vehicle size comparison worksheets printable',
      context: 'Measurement vocabulary and seriation skills strengthen when children order vehicles from smallest to largest in our vehicle size comparison worksheets printable, comparing motorcycles, cars, trucks, and buses by relative size \\u2014 building the comparative reasoning and spatial estimation skills that form the foundation for formal measurement instruction.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'Transportation odd one out worksheets',
      context: 'Analytical reasoning and attribute identification develop when children find the vehicle that does not belong in our transportation odd one out worksheets, examining groups of cars, trains, planes, and boats to identify which differs by type, function, or engineering feature \\u2014 building the logical exclusion and categorical thinking skills that support both scientific classification and mathematical set theory.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'Vehicle shadow matching worksheets for kindergarten',
      context: 'Visual discrimination and shape recognition strengthen when children match vehicles to their silhouettes in our vehicle shadow matching worksheets for kindergarten, analyzing the geometric outlines of cars, trucks, planes, and boats to identify corresponding shadows \\u2014 building the spatial reasoning and form perception skills that support both engineering thinking and early geometry concepts.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and visual discrimination in her three- and four-year-olds but finds that standard shape-matching worksheets lack the engagement needed to sustain attention in children who are fascinated by vehicles.',
      solution: 'She introduces coloring pages featuring detailed cars, trucks, and trains alongside shadow-match vehicle silhouette worksheets where the geometric precision of wheels, windows, and wings provides ideal shape recognition training that surpasses organic forms. Children color vehicle illustrations to develop fine motor precision through the complex geometric outlines that vehicles uniquely provide, then match each vehicle to its shadow using high-contrast imagery.',
      outcome: 'Visual discrimination accuracy improves by 36 percent over four weeks as children practice matching vehicle shapes with the sustained attention that only their vehicle fascination can generate. Fine motor control develops noticeably through coloring the geometric complexity of wheels, windows, bumpers, and wings. Average time-on-task increases from seven minutes with standard shape worksheets to sixteen minutes with transportation materials, and four previously reluctant learners become the most engaged students during vehicle-themed sessions.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate scientific categorization with algebraic pattern thinking but finds that teaching classification and patterns as separate subjects fails to produce connected understanding.',
      solution: 'She pairs picture-sort land/water/air classification worksheets with pattern-train vehicle sequence activities, creating integrated sessions where children first sort vehicles into three transportation categories and then extend the cognitive work to identifying and continuing alternating vehicle patterns. Each session begins with hands-on sorting of toy vehicles into labeled bins and progresses to pattern-train worksheets featuring car-bus-car-bus and similar sequences.',
      outcome: 'Classification accuracy reaches 91 percent on the transportation unit assessment compared to 64 percent when sorting and patterns were taught separately. Pattern recognition scores improve by 28 percent as students transfer vehicle sorting logic to sequence analysis. The teacher reports that vehicle-obsessed children show the highest engagement of any thematic unit, and three students begin spontaneously identifying vehicle patterns in parking lots and traffic during family outings.',
    },
    {
      situation: 'A second-grade teacher wants to connect multi-digit arithmetic, technical vocabulary, and real-world data analysis but finds that abstract math problems and generic vocabulary instruction fail to produce authentic engagement.',
      solution: 'She launches a transportation STEM unit combining math-worksheet multi-step vehicle problems with word-search transportation vocabulary worksheets featuring terms like propulsion, intersection, and locomotive. She pairs the paper activities with a community vehicle survey data collection project where students count and classify vehicles passing the school during a fifteen-minute observation window, then analyze their data using multi-digit addition and comparison.',
      outcome: 'Multi-step arithmetic accuracy reaches 89 percent on the unit assessment compared to 65 percent with abstract number problems. Transportation vocabulary usage increases substantially as students apply technical terms spontaneously during vehicle survey discussions. The teacher reports that connecting worksheet math to real-world data collection through a personally exciting theme produces the strongest sustained engagement of any STEM unit, and six parents report their children spontaneously counting and classifying vehicles during family car rides.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed vehicle cross-sections with engineering components visible, find-and-count busy traffic scene illustrations with rich visual detail, and shadow-match vehicle silhouette activities with high-contrast geometric imagery. Create a classroom vehicle wall with photographs of real cars, trucks, trains, and planes alongside their worksheet representations so students can reference visual anchors during classification and pattern tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with two-category vehicle sorting like land versus air before introducing three categories including water, and reduce pattern sequences to AB alternating vehicles before introducing ABC patterns. Pair every worksheet with toy vehicles for concrete manipulation so children can physically sort, count, and arrange three-dimensional objects while working through two-dimensional paper activities, building the bridge between concrete and abstract thinking.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with speed, distance, and time calculation projects using multiplication, vehicle design engineering challenges with specification sheets covering speed, capacity, fuel type, and wheel configuration, and comparative efficiency analysis across transportation modes examining miles per gallon, passengers per trip, and cost per mile.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, shadow-match, and big-small-app comparison activities before introducing word-based activities. Cars, trucks, planes, and boats are universally recognized vehicle types that transcend language barriers. Vehicle classification and size comparison activities communicate through visual engineering rather than text, making STEM concepts accessible regardless of English proficiency level.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Vehicle classification and engineering assessment',
      criteria: 'Present students with a mixed set of twelve vehicle cards. They sort by land, water, and air, order by size within each category from smallest to largest, and explain what engineering feature makes each vehicle suited to its environment such as wheels for roads, hulls for water, and wings for air. Assess using a three-level rubric: emerging (correctly sorts vehicles into two of three categories and orders two vehicles by size), proficient (correctly sorts all vehicles into three categories with one or fewer errors and orders all vehicles by size within each category), advanced (sorts all vehicles correctly, orders by size with verbal explanation, and describes at least three engineering features connecting vehicle design to environment).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one transportation worksheet per week over a four-week unit. Compare early and late samples to document growth in vehicle classification accuracy, pattern recognition complexity, transportation vocabulary usage, and mathematical operation skills with vehicle contexts. Look specifically for progression from simple vehicle naming to multi-attribute classification and from single-step counting to multi-step vehicle word problems.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on transportation counting, sorting, and pattern worksheets, note whether they name vehicles by appearance only without classification (Pre-K), classify vehicles by type and mode of transportation and extend simple vehicle patterns with verbal explanations (K\\u20131st), or apply multi-step arithmetic to vehicle capacity and distance problems while using technical vocabulary like propulsion, capacity, and intersection in complete sentences (2nd\\u20133rd). Record whether children transfer vehicle classification and engineering reasoning skills to real-world transportation observation.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Forces and Motion \\u2014 Wheels Reduce Friction, Wings Generate Lift, Propellers Push Water)',
      connection: 'Every transportation worksheet connects to science because vehicles ARE applied physics. Wheels reduce friction for land travel, wings generate lift for air travel, and propellers push water for marine travel. Children who sort vehicles by type are simultaneously learning about the physical forces that make each mode of transportation possible, building intuitive understanding of Newton\\u2019s laws through objects they already love.',
      activity: 'After completing picture-sort land/water/air classification and shadow-match vehicle silhouette worksheets, set up a forces exploration station where students test toy cars on ramps of different heights to observe how slope affects speed, float toy boats to explore buoyancy, and fold paper airplanes to test wing design \\u2014 connecting worksheet vehicle classification to hands-on physics investigation through the engineering that makes each vehicle type work.',
    },
    {
      subject: 'Math (Wheel Counting as Multiplication Readiness, Vehicle Size Comparison & Speed/Distance/Time Concepts)',
      connection: 'Transportation worksheets generate rich mathematical learning because vehicles inherently involve numbers that matter. Counting wheels across multiple vehicles introduces repeated addition and multiplication readiness. Comparing vehicle sizes develops measurement vocabulary and seriation skills. Speed and distance problems introduce the rate concept that formalizes in later grades. Passenger capacity calculations provide authentic multi-step arithmetic scenarios.',
      activity: 'After completing image-addition vehicle counting and big-small-app size comparison worksheets, create a vehicle data collection station where students record wheel counts, passenger capacity, and estimated speeds for ten different vehicles. They organize data into a simple chart, calculate totals using addition, compare categories using subtraction, and identify which vehicle type has the most wheels overall \\u2014 connecting worksheet arithmetic to authentic data analysis through transportation engineering.',
    },
    {
      subject: 'Social Studies (Community Infrastructure \\u2014 How Buses, Trucks, and Emergency Vehicles Serve Neighborhoods)',
      connection: 'Transportation worksheets build social studies understanding because vehicles serve communities. Buses carry workers to jobs, trucks deliver goods to stores, ambulances save lives, and garbage trucks maintain public health. Children who learn about vehicles on worksheets simultaneously learn about the infrastructure that makes their community function, connecting vehicle fascination to civic awareness and community responsibility.',
      activity: 'After completing find-and-count traffic scene and matching-app vehicle pairing worksheets, lead a community transportation survey where students observe and tally the vehicles passing their school during a fifteen-minute window, classify each by community function like public transit, delivery, emergency, and personal, and discuss which vehicle types their neighborhood depends on most \\u2014 connecting worksheet counting and classification to genuine community awareness through transportation infrastructure analysis.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '12 apps' },
    { label: 'Primary pedagogical focus', value: 'STEM engineering learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Vehicle classification + force/motion physics + engineering vocabulary' },
  ],`;

// ── Travel: 12 fields ────────────────────────────────────────────────────

const travelFields = `
  // -- SEO Enrichment (Part 46) --

  uniqueAngle: 'Travel is the ONLY theme that systematically teaches academic skills through geographic scale-shifting \\u2014 expanding children\\u2019s spatial frame of reference from their bedroom to their neighborhood, from their city to their country, from their continent to the entire globe \\u2014 in a way that no other theme attempts because travel IS the act of moving between scales, and every worksheet about travel inherently practices the cognitive skill of thinking at multiple geographic levels simultaneously. No other theme provides this structured expansion of spatial awareness, because while animals teaches about creatures that live far away and weather teaches about systems that span large areas, only travel explicitly asks children to trace their position on a map, calculate the distance to a destination, and imagine what life looks like when they arrive \\u2014 the complete cognitive sequence of locating, navigating, and exploring that defines geographic literacy. Travel is also the ONLY theme where cultural comparison IS the learning objective rather than a supplementary benefit \\u2014 where every worksheet about packing for a destination, tasting a country\\u2019s cuisine, or identifying a landmark directly teaches children that people around the world live, eat, dress, and celebrate differently, building the empathy and cultural competence that modern curricula identify as essential 21st-century skills. The planning dimension adds a unique executive function layer that no other geography-adjacent theme provides: itinerary creation requires sequencing, budgeting requires arithmetic under constraints, and packing requires anticipating future needs \\u2014 all higher-order cognitive skills practiced through personally exciting scenarios. The combination of geographic scale-shifting, cultural comparison as core content, and executive-function-building trip planning makes travel the most globally expansive and cognitively layered theme across all 50 available.',

  researchCitation: 'Liben, L. S. & Downs, R. M. (2001). "Geography for Young Children: Maps as Tools for Learning Environments." In S. L. Golbeck (Ed.), Psychological Perspectives on Early Childhood Education. Lawrence Erlbaum Associates \\u2014 establishing that early exposure to maps, spatial representations, and geographic scale concepts through personally meaningful contexts like travel planning produces significantly stronger spatial reasoning, environmental awareness, and mathematical thinking than abstract spatial instruction, because children who connect geographic concepts to their own experiences develop mental mapping abilities that transfer broadly to academic problem-solving.',

  snippetDefinition: 'Travel worksheets for kids are printable educational activities featuring suitcases, maps, passports, landmarks, and world destinations designed to build counting fluency, geographic awareness, cultural literacy, and planning skills for children ages 3 through 9. They include coloring pages for fine motor development, addition with packing and distance counters, hidden object searches in airport scenes, matching and sorting for geographic classification, word search and image crossword for travel vocabulary, picture-path map navigation and treasure-hunt route-following for spatial reasoning, and odd-one-out puzzles for analytical comparison.',

  snippetHowTo: [
    'Start with coloring pages of airplanes, landmarks, and world maps to build fine motor control and geographic vocabulary through visually rich destination illustrations.',
    'Progress to matching-app and picture-sort worksheets where children pair landmarks to countries and classify travel items by category, developing geographic knowledge and organizational thinking.',
    'Introduce visual scanning with find-objects worksheets featuring detailed airport, train station, and travel scenes with hidden items to locate, building attention to detail and systematic search strategies.',
    'Advance to vocabulary with word-search and image-crossword puzzles featuring travel terms like destination, passport, continent, and souvenir.',
    'Incorporate spatial reasoning with picture-path map navigation activities where children follow directional clues through simplified route maps, developing cardinal direction vocabulary and spatial planning.',
    'Extend to logical reasoning with treasure-hunt geography adventures and odd-one-out comparison puzzles that develop deductive thinking through world exploration contexts.',
    'Connect to real travel through family trip planning, destination research projects, and cultural cooking nights that verify worksheet concepts through authentic geographic and cultural experiences.',
  ],

  limitations: 'Travel worksheets\\u2019 focus on geographic exploration and cultural comparison provides less direct scope for mathematical operations beyond addition, life science investigation, or engineering design than themes like animals, weather, or construction where scientific phenomena and mechanical systems drive the activities. The theme\\u2019s strength in geography, cultural awareness, and trip planning means it offers less material for sustained narrative writing, emotional exploration, or hands-on physical science experiments than themes with richer storytelling or laboratory dimensions. While travel imagery aims for global representation, the specific landmarks and destinations depicted may inadvertently emphasize certain regions over others, and children from families who rarely travel may need additional support connecting to the theme\\u2019s experiential dimension.',

  themeComparisons: [
    {
      vsThemeId: 'transportation',
      summary: 'Travel worksheets provide a geography-focused cultural theme studying where people go through map literacy, destination exploration, cultural comparison, and trip planning across the globe. Transportation worksheets provide a vehicle-focused STEM theme studying how machines move through engineering classification, wheel counting, speed comparison, and propulsion analysis within the child\\u2019s daily environment. Travel teaches geographic exploration; transportation teaches engineering analysis.',
    },
    {
      vsThemeId: 'camping',
      summary: 'Travel worksheets provide a global exploration theme studying diverse destinations, world landmarks, and cultural differences across continents through map-based navigation and itinerary planning. Camping worksheets provide a local outdoor adventure theme studying nature skills, wilderness safety, and environmental observation within nearby forests, parks, and campgrounds. Travel teaches global breadth; camping teaches local depth.',
    },
    {
      vsThemeId: 'holidays',
      summary: 'Travel worksheets are a geography-centered theme where cultural celebrations appear as destination features within a broader global exploration context emphasizing map skills and cultural comparison. Holidays worksheets are a celebration-centered theme studying traditions from worldwide communities throughout all twelve months with cultural identity as the primary focus. Travel teaches culture through geography; holidays teaches culture through celebration.',
    },
    {
      vsThemeId: 'food',
      summary: 'Travel worksheets are a destination-focused theme where local cuisine appears as one cultural element within a broader geographic exploration of landmarks, languages, and traditions. Food worksheets are a culinary-centered theme studying measurement, sequencing, and kitchen science as the primary academic focus with cultural recipes as supporting content. Travel teaches food as cultural discovery; food teaches cooking as scientific process.',
    },
  ],

  productLinks: [
    {
      appId: 'picture-path',
      anchorText: 'Travel map worksheets for kids',
      context: 'Spatial reasoning and directional vocabulary develop when children navigate simplified route maps in our travel map worksheets for kids, following directional clues to trace paths between landmarks, airports, and destinations \\u2014 building the cardinal direction understanding and map literacy skills that form the foundation for geographic thinking and mathematical spatial reasoning.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'Travel treasure hunt worksheets printable',
      context: 'Deductive reasoning and sequential thinking strengthen when children follow geographic clue trails in our travel treasure hunt worksheets printable, solving step-by-step logic puzzles that guide them through world exploration adventures \\u2014 building the multi-step problem-solving and spatial reasoning skills that transform travel curiosity into genuine academic capability.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'Travel crossword puzzles for kids',
      context: 'Geographic vocabulary and visual reasoning develop simultaneously when children solve our travel crossword puzzles for kids, matching landmark and destination images to their names while filling in crossword grids \\u2014 building the spelling accuracy, domain-specific vocabulary, and spatial organization skills that support both reading fluency and geographic literacy.',
    },
    {
      appId: 'find-objects',
      anchorText: 'Travel hidden objects worksheets printable',
      context: 'Visual scanning and sustained attention develop when children search detailed airport and travel scenes in our travel hidden objects worksheets printable, locating specific items within richly illustrated departure halls, hotel lobbies, and destination panoramas \\u2014 building the systematic observation and figure-ground discrimination skills that support both reading readiness and mathematical detail analysis.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop fine motor skills and visual scanning in her three- and four-year-olds but finds that standard worksheets lack the novelty needed to sustain attention in children who quickly lose interest in familiar themes.',
      solution: 'She introduces coloring pages featuring airplanes, world landmarks, and travel scenes alongside find-objects worksheets with richly detailed airport and destination illustrations where the novelty of unfamiliar places sustains attention longer than familiar classroom settings. Children color detailed travel illustrations to develop fine motor precision, then search for hidden items in busy airport scenes that reward careful systematic scanning.',
      outcome: 'Visual scanning accuracy improves by 33 percent over four weeks as children practice finding hidden objects within novel travel scenes that hold their attention. Fine motor control develops through coloring detailed landmark and destination illustrations. Average time-on-task increases from eight minutes with familiar-theme worksheets to fifteen minutes with travel materials, and the teacher reports that the constant novelty of new destinations keeps engagement high across the entire unit without the fatigue that repetitive themes produce.',
    },
    {
      situation: 'A kindergarten teacher needs to integrate cultural knowledge with categorical thinking but finds that teaching geography and classification as separate subjects fails to produce connected understanding in her five- and six-year-olds.',
      solution: 'She pairs matching-app landmark pairing worksheets with picture-sort geographic classification activities, creating integrated sessions where children first match landmarks to countries and then sort travel items by category. She wraps the unit in a classroom passport program where each completed worksheet set earns a stamp from a new virtual destination, building cumulative geographic knowledge through a motivating reward structure.',
      outcome: 'Geographic classification accuracy reaches 87 percent on the travel unit assessment compared to 59 percent when geography and sorting were taught separately. Cultural knowledge scores improve noticeably as students connect landmark images to country names through repeated matching practice. The passport program drives sustained enthusiasm across the full four-week unit, and five students begin spontaneously identifying landmarks and countries in books, television shows, and family conversations.',
    },
    {
      situation: 'A first-grade teacher wants to connect spatial reasoning, geographic vocabulary, and functional writing but finds that abstract map exercises and generic writing prompts fail to produce lasting engagement or authentic skill transfer.',
      solution: 'She launches a dream vacation unit combining picture-path map navigation worksheets for spatial reasoning with image-crossword travel vocabulary activities featuring terms like destination, passport, and continent. She pairs the paper activities with a dream vacation itinerary project where students choose a destination, trace their route on a simplified world map, list packing items with counts, and write three sentences explaining why they chose their destination.',
      outcome: 'Spatial reasoning accuracy reaches 88 percent on the unit assessment compared to 62 percent with abstract map instruction alone. Travel vocabulary usage increases substantially as students apply geographic terms in their itinerary writing. The teacher reports that giving children genuine agency in exploring the world through destination choice produces the strongest writing engagement of any unit, and four parents note their children spontaneously planning imaginary trips and using map vocabulary during family outings.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring detailed landmark and destination illustrations with geographic context, find-objects hidden item searches in busy travel scene panoramas with rich visual detail, and picture-path map navigation with colorful route markers and geographic imagery. Create a classroom world wall with photographs of famous landmarks alongside their worksheet representations so students can reference visual anchors during geography and classification tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Begin with two-destination comparisons before introducing multi-country analysis, and reduce map navigation to single-turn paths before introducing multi-step routes with multiple direction changes. Pair every worksheet with a physical globe or large wall map for concrete spatial reference so children can point to real locations while working through paper activities, building the bridge between abstract map symbols and physical geographic reality.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-leg trip budget projects using multiplication across transportation, lodging, and activity categories. Assign comparative geography research reports analyzing climate, culture, and economy across three destinations with evidence from multiple sources. Extend mathematical thinking with currency conversion problems introducing multiplicative relationships between number systems.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-objects, and picture-sort before introducing word-based activities. Suitcases, maps, airplanes, and landmarks are universally recognized travel symbols that transcend language barriers. Geographic sorting and map navigation activities communicate through visual spatial representation rather than text. Travel is often one of the first experiential topics ELL families can discuss because many have personal migration or travel stories that provide rich background knowledge for geography activities.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Trip planning and geographic literacy assessment',
      criteria: 'Give students a simplified world map with five labeled destinations. They choose two, trace the route between them, list three items they would pack for each destination\\u2019s climate, and write two sentences comparing what makes each place unique. Assess using a three-level rubric: emerging (chooses two destinations and lists at least two packing items for one destination), proficient (traces route between two destinations on the map, lists appropriate packing items for both climates, and writes two comparison sentences identifying one difference), advanced (traces route accurately with directional vocabulary, lists climate-appropriate items with explanations, writes detailed comparison sentences identifying multiple cultural and geographic differences, and suggests which destination they would recommend and why).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one travel worksheet per week over a four-week unit. Compare early and late samples to document growth in geographic vocabulary usage, map navigation accuracy, cultural knowledge breadth, and trip planning sophistication. Look specifically for progression from naming travel objects by appearance to using geographic terms like continent, destination, and cardinal direction, and from simple item counting to multi-step travel planning calculations.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on travel coloring, sorting, and navigation worksheets, note whether they name travel items by appearance without geographic context (Pre-K), classify destinations and travel items by geographic attributes and follow simple map directions with cardinal vocabulary (K\\u20131st), or apply multi-step planning arithmetic to trip scenarios while using geographic and cultural vocabulary like continent, landmark, and itinerary in complete sentences (2nd\\u20133rd). Record whether children transfer map reading and cultural comparison skills to real-world geographic contexts.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Social Studies (World Geography and Cultural Awareness \\u2014 Map Reading, Landmark Identification & Cultural Comparison)',
      connection: 'Every travel worksheet builds social studies understanding because travel IS geography in action. Map reading develops spatial reasoning and directional vocabulary. Landmark identification builds world knowledge and cultural awareness. Comparing how people live in different destinations teaches empathy and cultural competence. Children who plan imaginary trips practice the geographic thinking skills that social studies curricula require.',
      activity: 'After completing matching-app landmark pairing and picture-sort geographic classification worksheets, launch a destination of the week program where students research one country, locate it on the classroom world map, learn three facts about its culture, and share their findings in a brief oral presentation \\u2014 connecting worksheet classification to genuine geographic research and cultural awareness through the travel planning framework.',
    },
    {
      subject: 'Math (Trip Planning Arithmetic \\u2014 Packing Counts, Distance Addition, Travel Budget & Map Scale Reading)',
      connection: 'Travel worksheets generate authentic math practice because trip planning IS mathematics under real-world constraints. Counting items for a packing list practices addition within a planning framework. Calculating distances between destinations develops number sense with larger numbers. Budget planning requires arithmetic under constraints where spending cannot exceed available funds. Map scale reading with multiplication connects spatial representation to numerical calculation.',
      activity: 'After completing image-addition packing count and picture-path map navigation worksheets, set up a travel planning math station where students receive a pretend budget and must calculate costs for transportation, lodging, and activities at their chosen destination. They compare total costs to their budget using subtraction, determine if they can afford their plan, and adjust quantities if needed \\u2014 connecting worksheet arithmetic to authentic financial reasoning through personally exciting trip planning scenarios.',
    },
    {
      subject: 'Language Arts (Travel Vocabulary Development \\u2014 Destination, Passport, Itinerary, Continent & Functional Writing)',
      connection: 'Travel worksheets build language arts skills uniquely because travel generates authentic purposes for reading and writing. Postcards practice concise descriptive writing with audience awareness. Travel journals develop narrative sequencing and sensory detail. Destination research reports build informational writing with evidence from multiple sources. Geographic vocabulary like destination, passport, itinerary, and continent expands the academic register children need for social studies and science.',
      activity: 'After completing word-search and image-crossword travel vocabulary worksheets, guide students through writing a postcard from their dream destination. Students describe what they see using sensory details, include at least three travel vocabulary words, and address their postcard to a specific person \\u2014 connecting vocabulary acquisition to authentic functional writing that practices concise description, audience awareness, and geographic vocabulary in a personally motivating format.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Geographic exploration learning' },
    { label: 'Skill areas covered', value: '4 categories' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key topic coverage', value: 'Map literacy + cultural comparison + trip planning math' },
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

console.log('Part 46: Enriching transportation & travel theme hub pages...\n');

console.log('1. Injecting 12 fields into transportation/en.ts...');
injectFields(path.join(base, 'transportation', 'en.ts'), transportationFields);

console.log('2. Injecting 12 fields into travel/en.ts...');
injectFields(path.join(base, 'travel', 'en.ts'), travelFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
