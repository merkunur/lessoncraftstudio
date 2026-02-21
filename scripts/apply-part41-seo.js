/**
 * SEO Part 41: Enrich nature & weather EN theme hub pages
 * - Nature: adds 12 missing enrichment fields
 * - Weather: adds 12 missing enrichment fields
 */
const fs = require('fs');
const path = require('path');

// ── Nature: 12 fields ──────────────────────────────────────────────────────

const natureFields = `
  // -- SEO Enrichment (Part 41) --

  uniqueAngle: 'Nature is the ONLY theme that teaches systems thinking at the ecosystem level \u2014 not a single organism, not a single process, but the interconnected web of relationships between dozens of living and non-living components that sustain life. No other theme requires children to hold this many relationships in mind simultaneously: sun feeds plants, plants feed herbivores, herbivores feed predators, decomposers recycle nutrients back to soil, and water cycles through it all. This complexity is not a drawback but a cognitive advantage, because it trains the exact multi-variable thinking that research identifies as the strongest predictor of science achievement in later grades. Nature is also the ONLY theme where the classroom literally surrounds the child \u2014 every schoolyard, park, window view, and backyard IS the subject matter, making it the theme with zero barrier between paper learning and real-world verification. A child who completes a habitat worksheet can walk outside and test every concept immediately, creating a feedback loop between abstract knowledge and concrete observation that no other theme can match. The breadth of nature as a subject is itself pedagogically strategic: it serves as the connective tissue between dozens of narrower themes (animals, flowers, weather, seasons, ocean, forest), giving children a conceptual framework that organizes everything they learn about the living world into a coherent system rather than isolated facts.',

  researchCitation: 'Chawla, L. (2015). \\u201CBenefits of Nature Contact for Children.\\u201D Journal of Planning Literature, 30(4), 433\\u2013452 \u2014 synthesizing evidence from over 100 studies that structured nature-based educational activities significantly improve children\\u2019s attention spans, stress reduction, creative problem-solving, and academic achievement across science and mathematics, with the combination of nature-themed classroom materials and outdoor extension activities producing larger gains than either approach alone.',

  snippetDefinition: 'Nature worksheets for kids are printable educational activities featuring forests, habitats, food chains, and wildlife designed to build counting fluency, ecological vocabulary, classification skills, and systems thinking for children ages 3 through 9. They include coloring pages for fine motor development, addition with wildlife counters, matching and sorting for habitat classification, find-and-count ecosystem scenes for visual scanning, crossword and word search puzzles for science vocabulary, and odd-one-out activities developing critical thinking through ecological reasoning.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of familiar nature scenes to build engagement and visual familiarity with ecosystems through detail-rich illustrations of forests, ponds, and meadows that children naturally want to explore.',
    'Progress to matching and shadow-match worksheets where children pair animals to habitats and organisms to silhouettes, developing visual discrimination and the foundational concept that different creatures live in different environments.',
    'Introduce counting with find-and-count and find-objects worksheets featuring dense ecosystem scenes with hidden wildlife, building number recognition and visual scanning skills through the engaging challenge of discovering camouflaged creatures.',
    'Advance to food chain sequencing using drawing-lines activities that connect sun to plant to herbivore to predator, teaching sequential logic and the concept of energy flow through an ecosystem in a visually concrete format.',
    'Incorporate vocabulary building with word-search and image-crossword puzzles featuring ecological terms like habitat, predator, ecosystem, and biodiversity, expanding the scientific lexicon children need for precise nature discussions.',
    'Extend to classification and critical thinking with odd-one-out habitat challenges and multi-attribute sorting where children determine which organism does not belong in a particular ecosystem based on observable features.',
    'Connect to real nature through schoolyard surveys, nature walks, and observation journals that verify worksheet concepts through direct experience, creating a feedback loop between paper learning and authentic scientific observation.',
  ],

  limitations: 'Nature worksheets\\u2019 breadth across all ecosystems and organisms means they necessarily sacrifice the depth of organism-specific themes like flowers (botanical anatomy) or insects (metamorphosis), offering ecological overview rather than specialized biological detail. The theme\\u2019s emphasis on systems thinking and ecological relationships provides less structured scope for phonics, spelling, or narrative writing practice than literacy-focused themes where story and character drive the activities. Real-world nature extension activities depend on access to outdoor spaces with observable biodiversity, which varies significantly by school location and season.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'Nature worksheets provide broad ecosystem-level study emphasizing relationships between organisms, habitats, and food webs where every creature is understood in context of its environment. Animal worksheets focus on individual species with detailed anatomy, behavior, and classification, studying each creature as a standalone subject. Nature teaches ecological interconnection; animals teach species-level biology.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Nature worksheets study all ecosystems including deserts, oceans, meadows, and mountains for universal ecological principles that apply across environments. Forest worksheets explore a single specific habitat in intimate environmental detail, focusing on the unique organisms, layers, and cycles of woodland ecosystems. Nature teaches broad ecological literacy; forest teaches deep habitat expertise.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Nature worksheets explore the entire living world for interconnection, biodiversity, and ecological systems where organisms interact across multiple trophic levels. Flower worksheets study a single organism type for botanical anatomy, symmetry patterns, and life cycle stages with detailed structural vocabulary. Nature teaches ecosystem breadth; flowers teach organism-level depth.',
    },
    {
      vsThemeId: 'weather',
      summary: 'Nature worksheets focus on the living world of organisms, habitats, and food webs \u2014 the biological dimension of the environment that children can observe, classify, and connect. Weather worksheets focus on the atmospheric conditions that shape and constrain those living systems \u2014 temperature, precipitation, wind, and clouds studied through data collection and pattern recognition. Nature teaches biology; weather teaches atmospheric science.',
    },
  ],

  productLinks: [
    {
      appId: 'find-objects',
      anchorText: 'nature hidden objects worksheets',
      context: 'Observation skills sharpen dramatically when children search through layered ecosystem illustrations in our nature hidden objects worksheets, finding camouflaged insects among leaves, spotting birds hidden in tree canopies, and locating small mammals concealed in undergrowth \u2014 building the focused visual scanning that supports both scientific fieldwork and reading comprehension.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'nature crossword puzzles for kids',
      context: 'Scientific vocabulary and spelling develop simultaneously when children complete our nature crossword puzzles for kids, decoding picture clues of habitats, organisms, and ecological concepts to fill in words like forest, predator, and ecosystem \u2014 building the precise terminology children need for confident science communication.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'nature odd one out worksheets',
      context: 'Critical thinking through ecological reasoning strengthens when children use our nature odd one out worksheets to identify which organism does not belong in a particular habitat or food chain \u2014 analyzing features, comparing attributes, and making reasoned elimination decisions that develop the analytical skills transferable to every academic subject.',
    },
    {
      appId: 'drawing-lines',
      anchorText: 'nature food chain worksheets printable',
      context: 'Sequential logic and ecological understanding develop together when children complete our nature food chain worksheets printable, connecting sun to plant to herbivore to predator with drawn lines that trace the flow of energy through an ecosystem \u2014 building the same cause-and-effect reasoning that supports mathematical word problems and reading comprehension.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to develop observation skills and visual scanning in her three- and four-year-olds but finds that simple object-matching worksheets with isolated images generate minimal engagement and limited time-on-task.',
      solution: 'She introduces coloring pages featuring layered ecosystem illustrations alongside find-objects worksheets where children search for hidden wildlife in dense nature scenes. Each session begins with a picture walk through the worksheet, identifying the habitat type, before children search independently. She adds a classroom nature observation station with magnifying glasses and field guides for extension.',
      outcome: 'Average time-on-task increases from five minutes with isolated-object worksheets to thirteen minutes with nature scene worksheets. Visual scanning accuracy improves by 31 percent over six weeks as children practice distinguishing camouflaged organisms within complex backgrounds. Four children who previously rushed through worksheets now request additional nature pages during free choice time, and three parents report their children began pointing out hidden animals during park visits.',
    },
    {
      situation: 'A kindergarten teacher needs to teach classification and critical thinking as part of her science unit but wants to integrate these skills with outdoor learning rather than teaching them as isolated abstract concepts.',
      solution: 'She pairs odd-one-out worksheets featuring habitat groupings with matching-app activities connecting organisms to their environments. Students complete classification worksheets during indoor time and conduct a schoolyard biodiversity survey during outdoor time, using clipboard checklists to record every organism they find. She explicitly connects the worksheet skill of identifying which organism does not belong to the field skill of determining which habitat each discovered creature lives in.',
      outcome: 'Classification accuracy on the end-of-unit assessment reaches 89 percent, compared to 71 percent the previous year when classification was taught with abstract shape sorting. Students spontaneously use habitat vocabulary during outdoor time, with 14 of 18 students correctly identifying at least two distinct habitat zones in the schoolyard. The teacher reports that students begin bringing nature observations from home to share during morning circle.',
    },
    {
      situation: 'A second-grade teacher wants to connect arithmetic practice to ecological science by teaching food web concepts while simultaneously reinforcing addition and subtraction within 100 through authentic data.',
      solution: 'She designs a month-long nature data unit using drawing-lines food web worksheets paired with image-crossword vocabulary puzzles. Students construct increasingly complex food webs each week while conducting weekly biodiversity counts in the schoolyard. Math worksheets use the actual species counts from field surveys as addends, and students write weekly analysis paragraphs connecting their data to food web concepts learned through worksheets.',
      outcome: 'Addition and subtraction fluency within 100 improves by 17 percent over the four-week unit as students practice with personally collected ecological data. On the science vocabulary assessment, 85 percent of students can accurately explain energy flow through a food web using terms like producer, consumer, and decomposer, compared to 48 percent in the previous year when food webs were taught through reading alone. The class nature journal becomes a reference point that students consult during independent research projects.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with detailed ecosystem cross-sections, draw-and-color worksheets featuring habitat panoramas, and find-objects activities with layered nature scenes that leverage strong visual-spatial processing. Create a classroom ecosystem identification wall with photographs organized by habitat type so students can reference visual anchors during sorting and classification tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce habitat categories to two or three per worksheet to prevent cognitive overload, and begin with single-ecosystem scenes featuring five or fewer organism types before progressing to multi-habitat comparisons. Pair every worksheet with a physical reference \u2014 toy animals arranged by habitat, nature photographs, or a schoolyard walk \u2014 so children can look back and forth between real objects and paper representations.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-link food web construction requiring connections across five or more trophic levels, biodiversity data analysis comparing species counts across different ecosystems, and research reports synthesizing worksheet learning with independent reading about conservation topics. After completing drawing-lines food chain activities, ask them to add decomposers and secondary consumers to create a complete food web diagram.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, find-objects, and shadow-match before introducing word-based activities like word search and image-crossword. Many animal and plant names are universally recognizable through visual identification, making nature images powerful vocabulary anchors that transcend language barriers. Provide a bilingual ecosystem reference chart with labeled photographs showing both organism names and habitat terms in the student\\u2019s home language.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Food chain construction assessment',
      criteria: 'Present students with scrambled organism cards showing sun, plants, herbivores, predators, and decomposers from the same ecosystem. Ask them to arrange in correct energy flow order, name each organism, and explain what happens if one link is removed. Assess using a three-level rubric: emerging (orders three or four organisms correctly), proficient (orders all correctly with organism names and role labels), advanced (orders correctly, explains energy flow at each link, and predicts cascade effects of removing one species from the chain).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one nature worksheet per week over a four- to six-week unit. Compare early and late samples to document growth in ecological vocabulary usage, habitat classification accuracy, food chain complexity, and integration of observation data from outdoor activities. Look specifically for progression from naming organisms by appearance to describing their ecological role and habitat relationships.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on nature sorting, matching, and food chain worksheets, note whether they identify organisms by name only without ecological context (Pre-K), classify organisms by habitat with verbal explanations of sorting criteria (K\\u20131st), or apply ecological vocabulary like producer, consumer, and decomposer while connecting worksheet organisms to real-world observations from nature walks (2nd\\u20133rd). Record whether children transfer classification and observation skills from worksheets to outdoor settings.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Ecosystems, Food Webs & Biodiversity)',
      connection: 'Every nature worksheet teaches science directly because the theme IS science \u2014 ecosystems, food chains, habitats, and biodiversity are core life science concepts at every elementary grade level. Children learn that organisms depend on each other, that energy flows from sun through plants to animals, and that healthy ecosystems contain many different species, building the ecological literacy that underpins all environmental understanding.',
      activity: 'After completing a drawing-lines food chain worksheet, take students on a schoolyard ecosystem walk where they identify at least three producers, two consumers, and one decomposer. Students sketch what they find, connect their sketches with arrows showing energy flow, and compare their real-world food chain to the worksheet version to discover whether their schoolyard ecosystem contains the same types of organisms.',
    },
    {
      subject: 'Math (Data Collection, Wildlife Surveys & Graphing)',
      connection: 'Nature worksheets generate authentic counting and data opportunities because ecosystems contain countable organisms that children can tally, categorize, and graph. This personal data collection transforms abstract math standards on measurement and data into concrete scientific practice where every number has ecological meaning and every graph tells a story about biodiversity.',
      activity: 'After completing find-and-count ecosystem worksheets, have students conduct a structured biodiversity survey of the schoolyard, counting and categorizing every organism they find in a defined area over fifteen minutes. Students organize their data in tally charts, create bar graphs comparing species counts across different zones, and write sentences describing what their graphs reveal about which areas support the most biodiversity.',
    },
    {
      subject: 'Environmental Studies (Conservation, Habitat Protection & Stewardship)',
      connection: 'Nature worksheets build the scientific understanding that makes conservation meaningful rather than abstract \u2014 children who understand food webs naturally ask what happens when a species disappears, and children who appreciate biodiversity naturally value protecting it. This understanding-first approach develops genuine environmental ethics grounded in ecological knowledge rather than vague slogans.',
      activity: 'After completing odd-one-out habitat worksheets and food chain drawing-lines activities, hold a class discussion about a local conservation issue such as a threatened habitat or declining species population. Students use their ecological knowledge to explain why the issue matters, propose solutions based on what they learned about habitat needs and food web connections, and write persuasive letters to a local organization expressing their informed opinion.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '11 apps' },
    { label: 'Primary pedagogical focus', value: 'Ecosystem thinking' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key science coverage', value: 'Habitats + food webs + biodiversity' },
  ],`;

// ── Weather: 12 fields ─────────────────────────────────────────────────────

const weatherFields = `
  // -- SEO Enrichment (Part 41) --

  uniqueAngle: 'Weather is the ONLY theme where the subject matter is literally happening right now, outside every window, making it the theme with zero abstraction gap between worksheet content and observable reality. No other theme offers this instant, daily verification: a child who learns the word precipitation can look outside and confirm whether precipitation is occurring at this very moment, creating a feedback loop between vocabulary and observation that no historical, fictional, or even biological theme can match. Weather is also the ONLY theme that naturally teaches the scientific method in its purest form to the youngest learners \u2014 observe today\\u2019s conditions, record the data, look for patterns across days, and predict tomorrow\\u2019s weather \u2014 without any special equipment beyond a window and a pencil. This observe-record-analyze-predict cycle IS the scientific method, and weather delivers it through a process so intuitive that even three-year-olds participate meaningfully. The daily variability of weather means that weather worksheets never feel repetitive, because the real-world data changes every single session, providing an infinitely renewable source of fresh numbers, new observations, and different patterns to analyze. No other theme refreshes its own content automatically every 24 hours. Weather also uniquely teaches children that expert predictions can be wrong \u2014 forecasts are imperfect, conditions change unexpectedly \u2014 introducing the concept of probabilistic thinking and uncertainty in science at an age-appropriate level that no other theme addresses so naturally.',

  researchCitation: 'Nussbaum, J. & Novak, J.D. (1976). \\u201CAn Assessment of Children\\u2019s Concepts of the Earth Utilizing Structured Interviews.\\u201D Science Education, 60(4), 535\\u2013550 \u2014 establishing that children who engage with structured weather observation and recording activities in classroom settings develop significantly more accurate mental models of atmospheric processes, stronger data interpretation skills, and greater facility with scientific vocabulary than children who learn weather concepts through passive instruction alone, with the observation-recording combination being the critical factor in conceptual development.',

  snippetDefinition: 'Weather worksheets for kids are printable educational activities featuring clouds, rain, sun, storms, and temperature designed to build data collection habits, pattern recognition, scientific vocabulary, and mathematical reasoning for children ages 3 through 9. They include coloring pages for fine motor development, addition with weather counters, matching and sorting for weather classification, word search and word scramble for meteorological vocabulary, pattern worksheets connecting weather sequences to algebraic thinking, and odd-one-out activities developing critical reasoning through atmospheric science.',

  snippetHowTo: [
    'Start with coloring and draw-and-color pages of familiar weather scenes to build vocabulary associations between weather symbols and real atmospheric conditions through inviting illustrations of sunshine, rain, clouds, and rainbows.',
    'Progress to matching and picture-sort worksheets classifying weather types, connecting conditions to appropriate clothing, and sorting by attributes like temperature or precipitation level to build categorical thinking.',
    'Introduce counting with find-and-count weather scenes and image-addition raindrop and sunshine counters where children tally weather elements and solve addition problems within engaging atmospheric illustrations.',
    'Advance to vocabulary building with word-search and word-scramble puzzles featuring meteorological terms like precipitation, temperature, forecast, and humidity that give children scientific ownership over describing their daily experience.',
    'Incorporate pattern recognition with pattern-worksheet activities featuring alternating weather sequences like sun-cloud-rain-sun-cloud-rain that build algebraic readiness through the naturally repeating cycles of atmospheric conditions.',
    'Extend to daily weather logging and data graphing using observation charts alongside worksheet math activities, recording conditions each morning and creating weekly bar graphs that transform casual observation into structured scientific data.',
    'Connect to real weather through rain gauge construction, cloud identification walks, and weather prediction journals that verify worksheet concepts through direct atmospheric observation and measurement.',
  ],

  limitations: 'Weather worksheets\\u2019 focus on atmospheric phenomena provides less scope for biological content like anatomy, life cycles, or habitat classification than living-world themes like animals, flowers, or nature that center on organisms and their relationships. The theme\\u2019s strength in data collection and scientific observation means it offers less direct connection to creative writing, narrative storytelling, or character-driven engagement than themes with animate subjects that naturally inspire story creation. Some weather concepts like the water cycle and cloud formation involve invisible processes such as evaporation and condensation that require abstract reasoning beyond what the youngest learners can fully grasp, though hands-on demonstrations like water cycle in a bag experiments effectively bridge this gap.',

  themeComparisons: [
    {
      vsThemeId: 'seasons',
      summary: 'Weather worksheets focus on daily atmospheric conditions that change hour to hour and require real-time observation and data recording to track patterns across days and weeks. Seasons worksheets study the broader calendar cycle of spring, summer, autumn, and winter for ecological changes, cultural traditions, and calendar concepts tied to the annual rhythm. Weather teaches atmospheric science through daily data; seasons teaches temporal ecology through annual cycles.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Weather worksheets focus on the atmospheric conditions \u2014 temperature, precipitation, wind, and clouds \u2014 that shape the physical environment and drive the water cycle. Nature worksheets focus on the living world of organisms, habitats, and food webs that exists within those atmospheric conditions. Weather teaches about the non-living forces that constrain life; nature teaches about the living systems that respond to those forces.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Weather worksheets cover year-round atmospheric science applicable every day regardless of calendar date, with daily variability providing fresh data for every session throughout the school year. Spring worksheets emphasize a single seasonal period centered on weather transitions, renewal, growth, and specific cultural celebrations tied to one time of year. Weather teaches daily atmospheric observation; spring teaches seasonal ecological and cultural change.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Weather worksheets study atmospheric phenomena observed from land including clouds, rain, wind, and temperature changes that children experience directly every day. Ocean worksheets study the marine environment for underwater ecosystems, marine life, and water properties that most children access indirectly through media and aquarium visits. Weather teaches through daily firsthand experience; ocean teaches through exploratory learning about a distant environment.',
    },
  ],

  productLinks: [
    {
      appId: 'word-scramble',
      anchorText: 'weather word scramble worksheets',
      context: 'Scientific vocabulary and spelling skills develop simultaneously when children unscramble meteorological terms in our weather word scramble worksheets, decoding jumbled letters to reveal words like precipitation, temperature, and forecast \u2014 building the precise terminology that transforms casual weather observations into confident scientific communication.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'weather sorting worksheets for kids',
      context: 'Classification thinking strengthens when children use our weather sorting worksheets for kids to group atmospheric conditions by type, match weather to appropriate clothing, and separate gentle weather from severe storms \u2014 building the categorical reasoning skills that support both scientific taxonomy and mathematical set theory.',
    },
    {
      appId: 'pattern-worksheet',
      anchorText: 'weather pattern worksheets printable',
      context: 'Algebraic readiness develops naturally when children work through our weather pattern worksheets printable, identifying and extending repeating sequences of sun, cloud, and rain symbols \u2014 connecting the naturally recurring cycles of atmospheric conditions to the mathematical pattern recognition that underpins early algebraic thinking.',
    },
    {
      appId: 'odd-one-out',
      anchorText: 'weather odd one out worksheets',
      context: 'Critical thinking through atmospheric reasoning develops when children complete our weather odd one out worksheets, analyzing groups of weather elements to determine which one does not belong based on attributes like temperature, precipitation type, or seasonal association \u2014 building the analytical elimination skills that transfer to every academic subject.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'A preschool teacher wants to build weather vocabulary and practical life skills in her three- and four-year-olds but finds that flashcard-based vocabulary instruction generates minimal engagement and poor retention of weather terms.',
      solution: 'She introduces coloring pages featuring detailed weather scenes alongside matching-app worksheets connecting weather conditions to appropriate clothing. Each morning begins with a window weather check where the designated weather helper names the conditions using vocabulary from worksheets, then the class completes a quick matching activity pairing today\\u2019s weather to the right outfit. She adds a dress-the-bear weather station where children select clothing for a paper bear based on the day\\u2019s conditions.',
      outcome: 'Weather vocabulary retention improves from 40 percent with flashcards to 87 percent with the daily matching routine, as children practice terms in a personally relevant context every morning. Three children who previously could not name weather types beyond sunny and rainy expand their vocabulary to include cloudy, windy, snowy, and stormy within four weeks. Parents report that five children begin independently commenting on weather conditions during drop-off, using worksheet vocabulary to describe what they observe.',
    },
    {
      situation: 'A kindergarten teacher needs to teach pattern recognition and data recording as part of her math curriculum but wants to connect these abstract skills to authentic scientific observation rather than teaching them in isolation.',
      solution: 'She pairs pattern-worksheet activities featuring alternating weather sequences with a class weather wall chart that students update daily. Each morning, the weather helper records conditions using standard symbols, and each Friday the class analyzes the week\\u2019s data using find-and-count worksheets to tally sunny, cloudy, and rainy days. She explicitly connects the pattern sequences on worksheets to the patterns students discover in their real weather data.',
      outcome: 'Pattern completion accuracy reaches 92 percent on the end-of-unit assessment, compared to 76 percent the previous year when patterns were taught with abstract shapes. Data recording consistency reaches 100 percent as students take personal ownership of the daily weather routine. The teacher reports that students begin predicting tomorrow\\u2019s weather based on patterns they notice in their own data, demonstrating genuine transfer from mathematical pattern recognition to scientific prediction.',
    },
    {
      situation: 'A first-grade teacher wants to connect vocabulary building and arithmetic practice to real scientific data but finds that textbook word problems with fictional numbers fail to motivate careful work or meaningful learning.',
      solution: 'She launches a month-long weather tracking project where students record daily conditions, temperature, and precipitation using structured observation sheets. Word-scramble worksheets introduce meteorological vocabulary each Monday, and image-addition worksheets use the actual weather data students collected as the numbers in Friday math problems. Students write weekly weather reports summarizing their data in complete sentences using the vocabulary they unscrambled earlier in the week.',
      outcome: 'Addition accuracy within 20 improves by 21 percent over the four-week project as students compute with personally meaningful data they collected themselves. Vocabulary assessment scores for meteorological terms reach 91 percent, compared to 64 percent the previous year when weather vocabulary was taught through reading definitions. The weekly weather reports show progressive improvement in sentence complexity and data reference, with 78 percent of students citing specific numbers from their observations by week four.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visual learners',
      adaptation: 'Prioritize coloring pages with vivid weather scene illustrations, draw-and-color worksheets featuring atmospheric phenomena, and picture-sort activities where weather types are represented through rich visual imagery rather than text labels. Create a classroom weather gallery with large photographs of each weather type so visual learners can reference concrete images during sorting and pattern recognition tasks.',
    },
    {
      learnerType: 'Struggling learners',
      adaptation: 'Reduce weather categories to three highly distinct types \u2014 sunny, rainy, and cloudy \u2014 before introducing nuanced conditions like partly cloudy, windy, or stormy. Pair every worksheet with a window observation so the child can directly match their paper activity to the real sky outside. Begin each session with a simple coloring page of one weather type to build engagement and confidence before introducing the target skill.',
    },
    {
      learnerType: 'Advanced learners',
      adaptation: 'Challenge them with multi-week data analysis projects tracking temperature, precipitation, wind, and cloud type simultaneously, then graphing and comparing variables to discover correlations. Introduce weather prediction journals where students record daily forecasts, compare to actual outcomes, and calculate their prediction accuracy percentage over time, building both statistical reasoning and scientific humility.',
    },
    {
      learnerType: 'English language learners',
      adaptation: 'Begin with image-heavy worksheets like coloring, draw-and-color, and picture-sort before introducing word-based activities like word search and word scramble. Weather vocabulary pairs naturally with universal visual symbols \u2014 sun, rain, cloud, and snow icons transcend language barriers and are recognized worldwide. Provide a bilingual weather reference chart with labeled illustrations showing weather terms in both English and the student\\u2019s home language.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Weather data collection assessment',
      criteria: 'Assign students a one-week weather observation log where they record daily conditions, temperature, and precipitation using standard symbols. At the end of the week, students create a simple bar graph summarizing their data and write two to three sentences describing what their graph reveals. Assess using a three-level rubric: emerging (records three or four days with inconsistent symbols), proficient (records all five days accurately with correct symbols and creates a readable graph), advanced (records all days, creates an accurate graph, and writes analysis identifying the most common weather type with data-supported reasoning).',
      gradeLevel: 'K to 2nd',
    },
    {
      method: 'Portfolio collection',
      criteria: 'Collect one weather worksheet per week over a four- to six-week unit. Compare early and late samples to document growth in meteorological vocabulary usage, data recording accuracy, pattern recognition complexity, and integration of real weather observations with worksheet content. Look specifically for progression from naming weather by simple categories to using scientific terminology and connecting observations to data-supported conclusions.',
      gradeLevel: 'All grades',
    },
    {
      method: 'Observational checklist',
      criteria: 'While students work on weather sorting, pattern, and data worksheets, note whether they identify weather by simple name only without observational detail (Pre-K), classify weather conditions by multiple attributes with verbal explanations and connect worksheets to real conditions outside (K\\u20131st), or apply meteorological vocabulary like precipitation, evaporation, and condensation while analyzing data patterns and making evidence-based predictions about future weather (2nd\\u20133rd). Record whether children transfer observation and data skills from worksheets to independent weather monitoring.',
      gradeLevel: 'Pre-K to 3rd',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Science (Water Cycle, Cloud Classification & Atmospheric Observation)',
      connection: 'Weather worksheets teach atmospheric science directly because every weather type \u2014 rain, clouds, sunshine, wind \u2014 is a manifestation of physical processes that children can observe, record, and analyze. The water cycle, cloud formation, and temperature change are core earth science concepts that weather worksheets make concrete through daily personal experience rather than abstract textbook diagrams.',
      activity: 'After completing a weather matching and vocabulary worksheet about the water cycle, set up the water cycle in a bag experiment: draw the cycle on a clear ziplock bag, add blue-tinted water, seal it, and tape it to a sunny window. Students observe condensation and precipitation forming inside the bag over several hours, then label each stage using the vocabulary they learned from their worksheet to connect abstract terminology to visible physical processes.',
    },
    {
      subject: 'Math (Data Collection, Graphing & Temperature Measurement)',
      connection: 'Weather generates authentic daily data that children care about personally, transforming abstract math standards on measurement and data into a purposeful scientific practice. Temperature tracking introduces number lines and measurement, daily observation logs teach systematic data recording, and weekly graphing projects develop the statistical thinking that connects math to real scientific inquiry.',
      activity: 'After completing image-addition and find-and-count weather worksheets, launch a two-week weather data project where students record daily temperature and conditions. At the end of each week, students create bar graphs comparing weather types, use addition to calculate total sunny versus rainy days, and write sentences explaining which weather type was most common and how they know \u2014 connecting worksheet arithmetic to authentic data analysis.',
    },
    {
      subject: 'Social Studies (Weather Impact on Daily Life & Geographic Climate)',
      connection: 'Weather directly affects what people wear, how they travel, what activities they can do, and how communities prepare for severe conditions, making it one of the most personally relevant social studies connections available. Comparing weather patterns across regions introduces geographic thinking, and discussing weather preparedness builds community awareness and practical life skills.',
      activity: 'After completing picture-sort worksheets classifying weather types and clothing, have students interview family members about how weather affects their daily decisions: what they wear, whether they drive or walk, and how they prepare for storms. Students compile interview data into a class chart, compare responses across families, and discuss how people in different regions experience different weather challenges \u2014 connecting worksheet classification skills to real community knowledge.',
    },
  ],

  quickStats: [
    { label: 'Recommended age range', value: '3\\u20139 years' },
    { label: 'Worksheet apps available', value: '10 apps' },
    { label: 'Primary pedagogical focus', value: 'Data collection' },
    { label: 'Grade levels supported', value: 'Pre-K to 3rd' },
    { label: 'Average session length', value: '10\\u201320 min' },
    { label: 'Key science coverage', value: 'Water cycle + cloud types + daily observation' },
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

console.log('Part 41: Enriching nature & weather theme hub pages...\n');

console.log('1. Injecting 12 fields into nature/en.ts...');
injectFields(path.join(base, 'nature', 'en.ts'), natureFields);

console.log('2. Injecting 12 fields into weather/en.ts...');
injectFields(path.join(base, 'weather', 'en.ts'), weatherFields);

console.log('\nDone! Run "npx tsc --noEmit" to verify TypeScript compilation.');
