const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const MARKER = '    },\n  },\n\n  // -- FAQ --';

const themes = {
  'animals': `    },
    'second-grade': {
      intro: 'Second graders bring a remarkable capacity for independent research and critical analysis to animal-themed worksheets, ready to tackle challenges that extend well beyond the single-step problems of first grade. Seven- and eight-year-olds can add and subtract within one hundred, work with place value concepts up to one thousand, and read multi-paragraph informational texts with comprehension and confidence. Animal worksheets at this level leverage these expanding abilities by presenting multi-step word problems such as a wildlife sanctuary rescued thirty-seven birds in January and forty-five birds in February, how many birds were rescued altogether, requiring regrouping strategies that push arithmetic into double-digit territory. Reading passages grow longer and more detailed, exploring topics like how arctic foxes change fur color between seasons, how elephants communicate using low-frequency sounds humans cannot hear, and how migration patterns shift in response to climate changes. These texts demand inference, identification of main ideas, and the ability to locate supporting details across multiple sentences. Data interpretation becomes a central skill as students read bar graphs showing animal population counts, create tally charts from observation data, and compare statistics across different species. Classification systems grow more sophisticated, with children organizing animals into vertebrates and invertebrates, distinguishing between cold-blooded and warm-blooded species, and exploring how scientists use physical characteristics to assign animals to taxonomic groups. Writing activities challenge second graders to compose organized paragraphs with topic sentences, supporting details, and concluding statements, using prompts like explaining why a particular animal is well adapted to its habitat or writing an opinion piece about which endangered species most deserves protection. The combination of larger numbers, longer texts, and deeper analytical thinking ensures that second-grade animal worksheets feel genuinely more advanced than first-grade material while maintaining the thematic excitement that makes animals such a beloved learning vehicle.',
      objectives: [
        { skill: 'Solve two-step addition and subtraction problems within 100 using animal data', area: 'math' },
        { skill: 'Identify main ideas and supporting details in multi-paragraph animal texts', area: 'literacy' },
        { skill: 'Organize animals into classification systems using multiple attributes', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the sustained attention and working memory to handle multi-step problems and extended reading passages lasting twenty to twenty-five minutes. Their growing capacity for abstract reasoning allows them to understand classification hierarchies and draw inferences from informational texts about animal behavior and adaptation.',
      teachingTips: [
        'Have students maintain an animal research journal where they record data from worksheets alongside their own observations, building habits of evidence-based thinking that connect classroom learning to real-world investigation.',
        'Challenge students to create their own animal comparison charts using data from multiple worksheets, synthesizing information across sources to draw original conclusions about similarities and differences between species.',
      ],
      faq: [
        { question: 'How do second-grade animal worksheets differ from first-grade ones?', answer: 'Second-grade worksheets use numbers up to one hundred and beyond, require multi-step problem solving with regrouping, include longer reading passages with inference questions, and introduce formal classification systems. The academic rigor increases significantly while the animal theme maintains high engagement.' },
        { question: 'Can animal worksheets support second-grade research projects?', answer: 'Yes. Worksheets provide structured data collection frameworks where students gather facts about habitat, diet, size, and classification for a chosen animal. This scaffolded approach teaches research skills like note-taking, organizing information by category, and synthesizing findings into written reports.' },
        { question: 'What data and graphing skills do second-grade animal worksheets develop?', answer: 'Students read and interpret bar graphs showing animal population data, create their own tally charts from observation activities, compare numerical data across species, and use measurement to analyze animal sizes. These activities align with second-grade math standards on data representation and interpretation.' },
      ],
    },
  },

  // -- FAQ --`,

  'farm': `    },
    'second-grade': {
      intro: 'Second graders are ready for farm worksheets that immerse them in the real mathematics and science behind agriculture, pushing beyond first-grade fundamentals into multi-step problem solving and extended informational reading. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, understand place value to one thousand, and read multi-paragraph passages independently, making them ideal candidates for worksheets that model authentic farming scenarios. Math activities at this level present challenges like a farmer harvested forty-eight bushels of apples on Monday and thirty-six bushels on Tuesday, how many bushels were harvested in total, requiring students to apply regrouping strategies to realistic agricultural quantities. Crop yield calculations introduce the concept of repeated addition as a foundation for multiplication, with problems asking how many ears of corn grow on five stalks if each stalk produces twelve ears. Measurement activities use standard units as students determine how many inches a corn stalk grew over two weeks or how many pounds of potatoes fill a harvest basket. Reading passages extend to multiple paragraphs covering topics like the farm-to-table journey of wheat becoming bread, the seasonal cycle of a dairy farm throughout the year, and how crop rotation keeps soil healthy. Comprehension questions require students to identify main ideas, sequence multi-step processes, and make inferences about cause and effect in agricultural systems. Students also engage with data interpretation, reading bar graphs of monthly egg production or rainfall charts that affect crop growth. Writing prompts challenge second graders to compose organized informational paragraphs explaining how a specific farm product reaches their kitchen or opinion pieces arguing which season is most important for farming. The integration of larger numbers, real-world measurement, process-based reading, and structured writing ensures that second-grade farm worksheets are substantially more challenging than first-grade content while keeping the agricultural theme deeply engaging and personally relevant to every child who eats food.',
      objectives: [
        { skill: 'Calculate crop yields and harvest totals using addition and subtraction within 100', area: 'math' },
        { skill: 'Read and sequence multi-step farm-to-table processes from informational texts', area: 'literacy' },
        { skill: 'Interpret bar graphs and charts displaying agricultural data', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds possess the sustained focus and working memory needed to follow multi-step agricultural processes through extended reading and multi-operation math problems. Their growing sense of systems thinking allows them to understand how planting, growing, harvesting, and distributing connect as sequential stages in a larger cycle.',
      teachingTips: [
        'Have students track a real or simulated crop through its entire growing season using a series of farm worksheets, recording planting dates, growth measurements, and harvest yields to build longitudinal data literacy skills.',
        'Use farm market role-play activities alongside worksheets, where students calculate costs for multiple produce items, make change from a dollar, and compare prices, reinforcing two-digit arithmetic in a practical context.',
      ],
      faq: [
        { question: 'How do second-grade farm worksheets build on first-grade content?', answer: 'They advance from single-digit arithmetic to two-digit addition and subtraction with regrouping, from short passages to multi-paragraph informational texts about farming processes, and from simple sequencing to analyzing cause-and-effect relationships in agricultural systems. Measurement with standard units and data interpretation from graphs are also introduced.' },
        { question: 'Can farm worksheets teach second graders about seasonal cycles?', answer: 'Yes. Multi-paragraph reading passages describe the full annual farming cycle from spring planting through summer growth to autumn harvest and winter rest. Students sequence these stages, answer inference questions about why timing matters, and connect seasonal vocabulary to real calendar concepts and weather patterns.' },
        { question: 'How do farm worksheets incorporate measurement skills for second graders?', answer: 'Students measure crop growth in inches and centimeters, weigh produce using standard units, calculate distances between farm structures, and track rainfall over weeks using rulers and charts. These hands-on measurement activities align with second-grade math standards on measuring length and representing data.' },
      ],
    },
  },

  // -- FAQ --`,

  'pets': `    },
    'second-grade': {
      intro: 'Second graders are ready for pet worksheets that challenge them with authentic responsibility mathematics, extended reading about animal care, and structured opinion writing that draws on personal experience. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, grasp introductory multiplication concepts through repeated addition, and read multi-paragraph texts fluently, making them ideal candidates for worksheets that mirror the real decisions pet owners face every day. Math activities at this level present scenarios like a puppy eats three cups of food each day, how many cups does it need for one week, introducing multiplication thinking through repeated addition in a context children find genuinely meaningful. Weight tracking problems ask students to chart a growing kitten\'s weight over eight weeks and calculate how much it gained, reinforcing subtraction within one hundred and data representation skills. Feeding schedule worksheets require calculating total food portions across multiple meals and multiple days, building multi-step problem-solving fluency. Reading passages extend beyond basic pet facts into comprehensive care guides covering nutrition, exercise requirements, grooming routines, and veterinary checkups for specific breeds, demanding that students identify main ideas, locate supporting details, and make inferences about responsible pet ownership. Vocabulary expands to include terms like nutrition, vaccination, grooming, and temperament, words that carry real-world weight and build academic language skills. Writing activities challenge students to compose organized opinion paragraphs about topics like which pet makes the best first pet for a family, requiring a clear claim supported by at least two reasons and a concluding statement. Pet care responsibility charts introduce data literacy as students create and interpret tables showing daily, weekly, and monthly care tasks. The meaningful personal connection that children feel toward pets ensures sustained motivation even as the academic demands increase substantially beyond first-grade expectations.',
      objectives: [
        { skill: 'Use repeated addition and two-digit arithmetic to solve pet care math problems', area: 'math' },
        { skill: 'Write organized opinion paragraphs about pets with supporting reasons', area: 'literacy' },
        { skill: 'Create and interpret data tables tracking pet care responsibilities over time', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the executive function skills needed to plan multi-step solutions and organize their writing with a clear beginning, middle, and end. Their capacity for empathy and perspective-taking has matured, allowing them to engage deeply with pet care content that requires considering the needs of another living being.',
      teachingTips: [
        'Assign a week-long pet care simulation where students use worksheets to plan feeding schedules, track expenses, and log daily care tasks for a pretend pet, building practical math skills alongside responsibility and empathy.',
        'Encourage students to interview a family member or friend who owns a pet and use their findings to complete comparison worksheets, connecting worksheet learning to real-world primary source research.',
      ],
      faq: [
        { question: 'How do second-grade pet worksheets develop responsibility skills alongside academics?', answer: 'Worksheets simulate real pet ownership decisions by asking students to calculate weekly food costs, plan daily care schedules, and track a pet\\\'s growth over time. This practical context teaches multi-step math and data literacy while reinforcing the concept that caring for a living creature requires consistent effort and planning.' },
        { question: 'What writing skills do second-grade pet worksheets develop?', answer: 'Students write structured opinion paragraphs arguing for their favorite pet with supporting reasons, compose informational paragraphs explaining how to care for a specific animal, and edit their own work for clarity and organization. These activities align with second-grade writing standards on opinion and informational text.' },
        { question: 'How do pet worksheets introduce multiplication concepts to second graders?', answer: 'Repeated addition problems like three treats per day for seven days naturally model the multiplication concept without requiring formal multiplication knowledge. Students see that adding three seven times equals twenty-one, building intuitive understanding that will formalize into multiplication fluency in third grade.' },
      ],
    },
  },

  // -- FAQ --`,

  'zoo': `    },
    'second-grade': {
      intro: 'Second graders are ready for zoo worksheets that transform a visit to the animal park into a rich mathematical and scientific investigation, pushing well beyond the single-step problems and short passages of first grade. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, work with place value to one thousand, and read multi-paragraph informational texts with comprehension and confidence. Zoo worksheets at this level present real-world math challenges like if adult tickets cost twelve dollars and child tickets cost eight dollars, how much does a family of two adults and two children pay to visit the zoo, requiring multi-step calculations that mirror genuine experiences. Exhibit planning problems ask students to calculate walking distances between zoo sections using a map with a distance key, introducing measurement and spatial reasoning in a practical context. Reading passages expand to cover detailed topics like how zoos design habitats to mimic natural environments, how breeding programs help save endangered species, and how zookeepers monitor animal health through daily observation routines. These extended texts demand that students identify main ideas across paragraphs, distinguish facts from opinions, and synthesize information from multiple sections. Classification activities grow more sophisticated as students organize zoo animals using Venn diagrams to compare and contrast two species across multiple attributes simultaneously. Data interpretation becomes central, with students reading pictographs of zoo visitor surveys, creating bar graphs from animal feeding data, and comparing statistics across different exhibit populations. Writing activities challenge second graders to compose organized informational paragraphs about a chosen zoo animal or persuasive pieces arguing why a particular species should receive more conservation funding. The combination of authentic zoo mathematics, in-depth scientific reading, and structured analytical writing ensures that second-grade zoo worksheets provide a substantial academic leap while maintaining the excitement that makes zoo animals irresistible to young learners.',
      objectives: [
        { skill: 'Solve multi-step word problems involving zoo ticket prices and distances within 100', area: 'math' },
        { skill: 'Distinguish facts from opinions in multi-paragraph texts about zoo animals and conservation', area: 'literacy' },
        { skill: 'Compare and contrast animal species using Venn diagrams and multiple attributes', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the analytical thinking skills needed to compare multiple attributes simultaneously and distinguish between factual statements and subjective opinions. Their growing spatial reasoning supports map reading and distance calculation activities that connect mathematics to real-world navigation.',
      teachingTips: [
        'Create a simulated zoo planning project where students use worksheets to design an exhibit layout, calculate visitor capacity, and budget for animal food costs, integrating math, writing, and critical thinking into a cohesive multi-day activity.',
        'Have students adopt a zoo animal for a research unit, completing a series of progressively challenging worksheets that build from basic facts to comparative analysis to a final written report with data displays.',
      ],
      faq: [
        { question: 'How do second-grade zoo worksheets incorporate map reading and measurement?', answer: 'Students use simplified zoo maps with distance keys to calculate walking routes between exhibits, compare distances, and plan efficient paths through the zoo. These activities build spatial reasoning and measurement skills while making abstract math concepts tangible through a familiar real-world context.' },
        { question: 'What conservation concepts do second-grade zoo worksheets cover?', answer: 'Extended reading passages explain how zoos participate in breeding programs for endangered species, how habitat loss threatens wildlife populations, and what actions communities can take to support conservation. Students analyze this information through comprehension questions that require inference and evaluation of evidence.' },
        { question: 'How do zoo worksheets help second graders develop comparison skills?', answer: 'Venn diagram activities challenge students to compare two zoo animals across multiple attributes including diet, habitat, size, and classification. This multi-attribute comparison develops analytical thinking that goes well beyond the single-attribute sorting typical of earlier grades.' },
      ],
    },
  },

  // -- FAQ --`,

  'birds': `    },
    'second-grade': {
      intro: 'Second graders are ready for bird worksheets that channel their natural curiosity into systematic data collection, scientific analysis, and extended informational writing about avian life. Seven- and eight-year-olds can add and subtract within one hundred, interpret data from graphs and charts, and read multi-paragraph texts with comprehension, making them ideal candidates for worksheets that approach bird study with the rigor of real ornithological research. Math activities at this level present challenges like during a class bird count students observed twenty-three robins, fifteen sparrows, and thirty-one crows, how many birds did they observe in total, requiring addition of multiple two-digit numbers and regrouping strategies. Migration pattern problems ask students to read simplified route maps and calculate approximate distances between stopping points, introducing measurement concepts through the dramatic journeys that birds undertake each season. Data collection becomes central as students create tally charts during bird observation sessions, transfer their data into bar graphs, and analyze which species appeared most frequently and during which time of day. Reading passages extend to multiple paragraphs covering topics like how different beak shapes evolved to match specific food sources, how birds navigate thousands of miles using Earth\'s magnetic field and star patterns, and how citizen science projects allow ordinary people to contribute valuable bird population data. These texts require students to identify cause-and-effect relationships, draw inferences about adaptation, and summarize main ideas in their own words. Field guide creation activities challenge students to write detailed identification descriptions including size, color pattern, beak shape, habitat preference, and distinctive behaviors for birds they have studied. Classification worksheets introduce the concept of dichotomous keys, guiding students through yes-or-no questions to identify an unknown bird species. The integration of authentic data practices, extended scientific reading, and structured descriptive writing ensures that second-grade bird worksheets feel genuinely more advanced than first-grade content while nurturing the observational skills that make bird study so rewarding.',
      objectives: [
        { skill: 'Collect, organize, and interpret bird observation data using tally charts and bar graphs', area: 'math' },
        { skill: 'Read multi-paragraph texts about bird adaptations and summarize main ideas', area: 'literacy' },
        { skill: 'Use systematic observation and classification to identify bird species by multiple traits', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the patience and observational discipline needed for structured bird watching activities and the analytical skills to translate their observations into organized data displays. Their growing capacity for cause-and-effect reasoning allows them to understand why birds have evolved specific physical adaptations.',
      teachingTips: [
        'Organize a weekly class bird count where students rotate as designated observers, recording sightings on tally sheets that connect directly to worksheet graphing and analysis activities throughout the week.',
        'Have students create personal field guides by completing a series of bird identification worksheets, compiling their written descriptions and illustrations into a booklet they can take on real bird watching outings.',
      ],
      faq: [
        { question: 'How do second-grade bird worksheets use real data collection?', answer: 'Students conduct structured bird observation sessions, recording species, quantity, time, and behavior on tally charts. They then transfer this data into bar graphs, compare results across observation sessions, and draw conclusions about which birds are most common in their area. This authentic data cycle builds scientific inquiry skills alongside math standards.' },
        { question: 'What role does migration play in second-grade bird worksheets?', answer: 'Migration activities challenge students to read simplified route maps, calculate distances between stopover points, compare journey lengths across species, and analyze why birds migrate using cause-and-effect reasoning from extended reading passages. These activities integrate geography, math, and science into a single compelling narrative.' },
        { question: 'How do bird worksheets develop descriptive writing skills in second graders?', answer: 'Field guide activities require students to write detailed, organized descriptions of bird species including physical features, habitat preferences, diet, and distinctive behaviors. This structured descriptive writing builds observation skills and teaches students to convey precise information clearly, aligning with second-grade informational writing standards.' },
      ],
    },
  },

  // -- FAQ --`,

  'insects': `    },
    'second-grade': {
      intro: 'Second graders are ready for insect worksheets that elevate familiar bug fascination into rigorous scientific observation, measurement-based investigation, and structured informational writing. Seven- and eight-year-olds can add and subtract within one hundred, work with basic measurement units, and read multi-paragraph texts independently, making them ideal candidates for worksheets that approach entomology with genuine academic depth. Math activities at this level present measurement challenges like a monarch butterfly caterpillar grows from two millimeters to fifty millimeters before forming a chrysalis, how many millimeters did it grow, introducing subtraction with larger numbers in a scientific context. Life cycle data worksheets ask students to compare the duration of each metamorphosis stage across different insect species, creating comparison tables and bar graphs that build data literacy alongside biological knowledge. Repeated addition problems model real-world insect mathematics, such as calculating how many legs are in a colony of fourteen ants, building intuitive foundations for multiplication. Reading passages extend to detailed scientific observations about how fireflies produce bioluminescence, how ant colonies divide labor among workers, soldiers, and the queen, and how praying mantises use camouflage to ambush prey. These texts demand that students identify cause-and-effect relationships, compare information across paragraphs, and distinguish between observations and inferences. Scientific observation journal activities challenge students to document insect behavior over multiple sessions, recording date, time, weather conditions, species observed, and detailed behavioral notes using precise descriptive language. Classification worksheets guide students through distinguishing true insects from arachnids and other arthropods using a systematic checklist of defining characteristics including body segment count, leg count, and presence of antennae. Writing prompts ask students to compose organized informational paragraphs explaining a specific insect adaptation or to write procedural texts describing how to conduct a proper insect observation. The integration of authentic measurement, data-driven analysis, extended scientific reading, and structured writing ensures that second-grade insect worksheets provide a substantial intellectual leap while maintaining the hands-on excitement that makes insects endlessly fascinating to young learners.',
      objectives: [
        { skill: 'Measure and compare insect growth data using standard units and subtraction within 100', area: 'math' },
        { skill: 'Write organized informational paragraphs about insect adaptations and life cycles', area: 'literacy' },
        { skill: 'Conduct structured observations and record findings using scientific journal formats', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the fine motor precision needed for detailed scientific drawings and the cognitive discipline required to maintain observation journals over multiple sessions. Their growing understanding of cause and effect allows them to reason about why insects have developed specific adaptations for survival.',
      teachingTips: [
        'Set up a long-term insect observation station where students use worksheets to log weekly sightings, measure specimens they find, and compile their data into end-of-month summary reports with graphs and written conclusions.',
        'Guide students through creating a classroom insect identification poster using dichotomous key worksheets, where each branch asks a yes-or-no question about physical features to narrow down the species.',
      ],
      faq: [
        { question: 'How do second-grade insect worksheets develop scientific observation skills?', answer: 'Students maintain structured observation journals where they record date, time, weather, species, and detailed behavioral descriptions during regular insect-watching sessions. This disciplined approach teaches the scientific method in practice, building habits of systematic data collection that transfer across all science subjects.' },
        { question: 'What measurement skills do second-grade insect worksheets build?', answer: 'Students measure insect body lengths in millimeters and centimeters, calculate growth across life cycle stages using subtraction within one hundred, compare sizes across species using data tables, and create bar graphs displaying measurement data. These activities align with second-grade standards on measuring length and representing data.' },
        { question: 'How do insect worksheets teach the difference between insects and other arthropods?', answer: 'Classification worksheets provide a systematic checklist that students apply to distinguish true insects from spiders, centipedes, and crustaceans. Students examine body segment count, leg count, antenna presence, and wing characteristics, building rigorous classification skills that go beyond the simple sorting of earlier grades.' },
      ],
    },
  },

  // -- FAQ --`,

  'ocean': `    },
    'second-grade': {
      intro: 'Second graders are ready for ocean worksheets that plunge into the quantitative and analytical depths of marine science, moving well beyond the single-step problems and short passages of first grade. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, work with place value to one thousand, and read multi-paragraph informational texts fluently, making them ideal candidates for worksheets that explore the ocean with genuine scientific rigor. Math activities at this level introduce ocean depth as a context for understanding large numbers, with problems like the sunlight zone extends to two hundred meters and the twilight zone reaches one thousand meters, how much deeper is the twilight zone, connecting place value and subtraction to dramatic real-world quantities. Marine animal counting challenges present scenarios involving schools of hundreds of fish, requiring students to work with three-digit numbers in meaningful contexts. Measurement worksheets ask students to compare the lengths of different whale species using data tables, calculate size differences, and represent their findings on bar graphs. Reading passages extend to multiple paragraphs covering topics like how coral reefs support thousands of interconnected species, how ocean currents distribute heat around the planet and influence weather patterns, and how marine biologists use tagging technology to track whale migration routes across entire ocean basins. These texts demand inference, main idea identification, and the ability to synthesize information from multiple paragraphs into coherent summaries. Research project worksheets guide students through gathering facts about a chosen marine species, organizing their notes by category, and presenting findings in a structured written report with supporting data. Classification activities challenge students to organize marine creatures using multiple criteria simultaneously, placing them into overlapping categories based on diet, habitat depth, body structure, and endangered status. Writing prompts ask second graders to compose persuasive paragraphs about ocean conservation or explanatory texts describing how a specific marine food chain works from producer to top predator. The combination of large-number mathematics, data-rich investigation, extended scientific reading, and structured analytical writing ensures that second-grade ocean worksheets deliver a meaningful academic advancement while maintaining the awe-inspiring wonder that makes the ocean an irresistible learning theme.',
      objectives: [
        { skill: 'Work with numbers to 1,000 in ocean depth and marine measurement contexts', area: 'math' },
        { skill: 'Synthesize information from multi-paragraph marine science texts into written summaries', area: 'literacy' },
        { skill: 'Design and execute a structured research project on a chosen marine species', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the capacity to work with numbers well beyond one hundred and to sustain focus through extended reading passages of twenty to twenty-five minutes. Their growing ability to synthesize information from multiple sources supports the research-based activities that distinguish second-grade ocean worksheets from earlier levels.',
      teachingTips: [
        'Assign each student a marine species research project that spans multiple worksheet sessions, building from data collection through comparison analysis to a final illustrated report, teaching the full cycle of academic research.',
        'Use ocean depth as a number line context, where students plot marine creatures at their correct depth on a vertical scale to build intuitive understanding of place value and large-number comparison.',
      ],
      faq: [
        { question: 'How do second-grade ocean worksheets use large numbers meaningfully?', answer: 'Ocean depths, whale lengths, and fish school sizes provide authentic contexts for working with numbers to one thousand. Students subtract ocean zone depths, compare whale measurements using three-digit numbers, and interpret data displays with values well beyond one hundred, building place value understanding through real marine science.' },
        { question: 'What research skills do second-grade ocean worksheets develop?', answer: 'Students follow a structured research process: selecting a marine species, gathering facts from reading passages and data tables, organizing notes into categories like habitat, diet, and physical features, and presenting findings in a written report with supporting data. This scaffolded approach teaches research methodology appropriate for the grade level.' },
        { question: 'How do ocean worksheets address marine conservation for second graders?', answer: 'Persuasive writing prompts ask students to argue for specific conservation actions using evidence from reading passages about plastic pollution, coral bleaching, and endangered species. Data interpretation activities show real trends in marine populations, helping students understand why conservation matters through concrete numerical evidence rather than abstract appeals.' },
      ],
    },
  },

  // -- FAQ --`,

  'dinosaurs': `    },
    'second-grade': {
      intro: 'Second graders are ready for dinosaur worksheets that transform prehistoric fascination into rigorous measurement, timeline analysis, and extended informational writing that stretches well beyond first-grade expectations. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, understand place value to one thousand, and read multi-paragraph passages independently, making them ideal candidates for worksheets that explore paleontology with genuine academic depth. Math activities at this level present size comparison challenges using real dinosaur measurements, such as a Brachiosaurus was eighty-five feet long and a Velociraptor was six feet long, how much longer was the Brachiosaurus, requiring subtraction with larger numbers in a scientifically accurate context. Timeline activities introduce the concept of millions of years, asking students to sequence major events across the Triassic, Jurassic, and Cretaceous periods and calculate the duration of each era using place value skills. Measurement worksheets challenge students to compare dinosaur heights, weights, and stride lengths using data tables, then represent their findings on bar graphs that make abstract numbers visual and concrete. Reading passages extend to multiple paragraphs covering topics like how paleontologists use fossilized footprints to estimate running speeds, how the asteroid impact sixty-six million years ago triggered a chain of events that caused mass extinction, and how modern birds are the living descendants of theropod dinosaurs. These texts demand that students identify cause-and-effect chains, distinguish scientific evidence from speculation, and summarize complex processes in their own words. Classification worksheets guide students through organizing dinosaurs by era, diet, body structure, and geographic location, using comparison charts that require analyzing multiple attributes simultaneously. Writing prompts challenge second graders to compose organized informational paragraphs explaining how a specific dinosaur was adapted to its environment or to write narrative accounts imagining a day in the Cretaceous period based on scientific evidence. The combination of measurement-driven mathematics, era-spanning timeline work, in-depth paleontology reading, and structured analytical writing ensures that second-grade dinosaur worksheets deliver a substantial intellectual leap while maintaining the prehistoric excitement that makes dinosaurs an eternally captivating learning theme.',
      objectives: [
        { skill: 'Compare and calculate dinosaur measurements using subtraction within 100 and place value concepts', area: 'math' },
        { skill: 'Read multi-paragraph paleontology texts and distinguish evidence from speculation', area: 'literacy' },
        { skill: 'Sequence geological eras and major extinction events on a timeline', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the conceptual framework needed to grasp extremely large numbers and deep time, especially when anchored to vivid contexts like dinosaur sizes and geological eras. Their growing ability to distinguish between what is known and what is hypothesized supports critical evaluation of paleontological evidence.',
      teachingTips: [
        'Create a classroom timeline wall spanning the three dinosaur eras, where students add measurement data, species facts, and comparison charts from their worksheets throughout the unit, building a collaborative visual reference that grows more detailed over time.',
        'Challenge students to write dinosaur field guides that combine data from measurement worksheets with descriptive writing from research passages, producing illustrated reference pages that demonstrate both mathematical and literacy skills.',
      ],
      faq: [
        { question: 'How do second-grade dinosaur worksheets teach measurement and comparison?', answer: 'Students work with real dinosaur dimensions, comparing lengths, heights, and estimated weights using subtraction within one hundred and data tables. They create bar graphs of species measurements and calculate differences between the largest and smallest dinosaurs, making measurement concepts vivid through scientifically accurate prehistoric data.' },
        { question: 'How do dinosaur worksheets introduce geological time to second graders?', answer: 'Timeline activities present the Triassic, Jurassic, and Cretaceous periods as distinct chapters in Earth\\\'s history, with students sequencing key events, matching species to their correct era, and calculating how many millions of years each period lasted. This builds foundational understanding of deep time that supports later earth science learning.' },
        { question: 'Can dinosaur worksheets teach second graders about scientific evidence and reasoning?', answer: 'Yes. Reading passages explain how paleontologists draw conclusions from fossils, footprints, and geological layers. Comprehension questions ask students to distinguish between what scientists know from evidence and what they hypothesize, building critical thinking skills that transfer to all areas of scientific inquiry.' },
      ],
    },
  },

  // -- FAQ --`,

  'forest': `    },
    'second-grade': {
      intro: 'Second graders are ready for forest worksheets that advance from simple woodland identification into data-driven ecosystem analysis, extended reading about habitat science, and structured environmental research projects. Seven- and eight-year-olds can add and subtract within one hundred with regrouping, measure using standard units, and read multi-paragraph informational texts fluently, making them ideal candidates for worksheets that explore forest ecology with genuine scientific depth. Math activities at this level present ecosystem data challenges like a forest survey counted forty-seven oak trees, twenty-nine pine trees, and thirty-five maple trees, how many trees were counted in total, requiring multi-step addition with regrouping. Measurement worksheets ask students to compare tree heights using data tables, calculate growth rates over multiple seasons, and represent their findings on bar graphs that reveal patterns in forest data. Habitat layer activities grow more analytical, with students not just identifying which animals live in which forest layer but examining how the canopy, understory, and forest floor form an interconnected system where changes in one layer affect all others. Reading passages extend to multiple paragraphs covering topics like how decomposers on the forest floor recycle nutrients that feed the tallest canopy trees, how forest fires can actually benefit certain ecosystems by clearing undergrowth and releasing seeds, and how animal populations shift in response to seasonal changes in food availability. These texts require students to identify cause-and-effect chains across paragraphs, draw inferences about ecological relationships, and summarize complex processes in their own words. Classification activities challenge students to organize forest organisms into producers, consumers, and decomposers, building foundational food web understanding. Research project worksheets guide students through selecting a forest animal or tree species, gathering data from multiple sources, and presenting findings in an organized written report with headings and supporting details. Writing prompts ask second graders to compose explanatory paragraphs about why forests are important for clean air and water or persuasive pieces arguing for the protection of a specific woodland habitat. The integration of ecosystem mathematics, layered scientific reading, and structured research writing ensures that second-grade forest worksheets provide a meaningful academic advancement while nurturing the environmental awareness that makes forest study so valuable.',
      objectives: [
        { skill: 'Analyze forest ecosystem data using multi-step addition and subtraction within 100', area: 'math' },
        { skill: 'Identify cause-and-effect relationships in multi-paragraph texts about forest ecology', area: 'literacy' },
        { skill: 'Classify forest organisms into producers, consumers, and decomposers within food web frameworks', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the systems thinking capacity needed to understand how multiple components of a forest ecosystem interact and depend upon one another. Their growing ability to track cause-and-effect chains across extended texts supports the analysis of complex ecological relationships that distinguishes second-grade forest content.',
      teachingTips: [
        'Organize a seasonal forest data collection project where students visit the same outdoor area quarterly, recording tree measurements, animal sightings, and ground cover observations on structured worksheets that build into a year-long ecological dataset.',
        'Have students build classroom food web displays using data from their worksheets, connecting organisms with yarn to show energy flow from producers through consumers to decomposers, making abstract ecological concepts physically visible.',
      ],
      faq: [
        { question: 'How do second-grade forest worksheets teach ecosystem thinking?', answer: 'Students explore how forest layers interact as a system, examining how decomposers recycle nutrients for trees, how canopy shade affects understory plants, and how animal populations depend on specific vegetation. This systems-level analysis goes beyond the simple identification and sorting typical of earlier grades.' },
        { question: 'What data skills do second-grade forest worksheets develop?', answer: 'Students collect tree measurement data, organize findings into tables, create bar graphs showing species distribution, and calculate totals and differences using multi-step addition and subtraction within one hundred. These data literacy activities align with second-grade math standards on measurement and data representation.' },
        { question: 'How do forest worksheets introduce food web concepts to second graders?', answer: 'Classification worksheets guide students through organizing forest organisms as producers, consumers, or decomposers. Students then trace energy pathways from sunlight to plants to herbivores to predators, building the foundational food web understanding that more formal ecology instruction in later grades will expand upon.' },
      ],
    },
  },

  // -- FAQ --`,

  'garden': `    },
    'second-grade': {
      intro: 'Second graders are ready for garden worksheets that cultivate real measurement skills, fraction concepts, and structured informational writing through authentic gardening scenarios that extend well beyond first-grade fundamentals. Seven- and eight-year-olds can add and subtract within one hundred, work with basic fractions, and read multi-paragraph texts independently, making them ideal candidates for worksheets that treat the garden as a living mathematics and science laboratory. Math activities at this level present measurement-rich challenges like if a sunflower grew fourteen inches in June and twenty-three inches in July, how tall is it now, requiring multi-step addition with regrouping applied to real growth data. Fraction activities use garden plots as visual models, asking students to shade one half, one third, or one quarter of a rectangular garden bed and calculate how many plants fit in each section, making abstract fraction concepts tangible through spatial reasoning. Planting guide worksheets require students to read informational charts showing optimal planting depths, spacing requirements, and days to harvest for different vegetables, then apply this data to plan a real garden layout with accurate measurements. Reading passages extend to multiple paragraphs covering topics like how photosynthesis converts sunlight into plant food, how companion planting helps certain vegetables grow better together, and how composting transforms kitchen scraps into rich soil over several months. These texts demand that students follow multi-step processes, identify cause-and-effect relationships, and compare information across different sections. Growth tracking projects become more sophisticated as students measure their plants weekly using rulers, record data in organized tables, calculate weekly growth increments, and create line graphs showing growth trends over an entire month. Writing prompts challenge second graders to compose step-by-step procedural texts explaining how to plant and care for a specific vegetable, requiring clear sequencing, precise vocabulary, and reader-awareness that their instructions must be detailed enough for someone else to follow. The combination of authentic measurement, introductory fractions, data-rich investigation, and structured expository writing ensures that second-grade garden worksheets deliver a substantial academic advancement while maintaining the hands-on excitement that makes gardening such a powerful learning vehicle.',
      objectives: [
        { skill: 'Apply measurement and basic fractions to garden planning and growth tracking activities', area: 'math' },
        { skill: 'Read planting guides and informational charts to extract and apply gardening data', area: 'literacy' },
        { skill: 'Track plant growth systematically and represent data in tables and line graphs', area: 'cognitive' },
      ],
      developmentalNotes: 'Seven- and eight-year-olds have developed the fine motor precision needed to measure with standard rulers and the cognitive maturity to understand that fractions represent equal parts of a whole. Their growing capacity for procedural thinking supports both multi-step garden planning and the structured how-to writing that garden topics naturally inspire.',
      teachingTips: [
        'Pair garden worksheets with a real classroom or windowsill growing project where students apply their measurement and data recording skills to living plants, creating a direct feedback loop between paper-based math and observable scientific outcomes.',
        'Use garden plot grid worksheets to introduce fraction concepts visually, having students divide rectangular beds into halves, thirds, and quarters before calculating how many plants fit in each section.',
      ],
      faq: [
        { question: 'How do garden worksheets introduce fractions to second graders?', answer: 'Garden plot activities provide a natural visual model for fractions. Students divide rectangular garden beds into equal sections, shade specific fractions like one half or one quarter, and calculate how many plants fit in each portion. This spatial approach makes abstract fraction concepts concrete and meaningful.' },
        { question: 'What measurement skills do second-grade garden worksheets develop?', answer: 'Students measure plant heights in inches and centimeters using real rulers, calculate growth increments using subtraction, read planting depth charts with precise measurements, and create data displays tracking growth over multiple weeks. These activities align with second-grade standards on measuring length and representing data.' },
        { question: 'How do garden worksheets build procedural writing skills?', answer: 'Students compose step-by-step planting guides that explain how to grow a specific vegetable from seed to harvest. This procedural writing requires clear sequencing, precise measurement vocabulary, and awareness that instructions must be detailed enough for another person to follow successfully.' },
      ],
    },
  },

  // -- FAQ --`,
};

let successCount = 0;
let errorCount = 0;

for (const [theme, block] of Object.entries(themes)) {
  const filePath = path.join(BASE, theme, 'en.ts');

  if (!fs.existsSync(filePath)) {
    console.error('File not found: ' + filePath);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const idx = content.indexOf(MARKER);

  if (idx === -1) {
    console.error('Pattern not found in ' + theme);
    errorCount++;
    continue;
  }

  content = content.substring(0, idx) + block + content.substring(idx + MARKER.length);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + theme);
  successCount++;
}

console.log('\nDone: ' + successCount + ' updated, ' + errorCount + ' errors');
