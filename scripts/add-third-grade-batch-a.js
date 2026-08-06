const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const MARKER = '    },\n  },\n\n  // -- FAQ --';

const themes = {
  'animals': `    },
    'third-grade': {
      intro: 'Third graders bring multiplication fluency, sustained research stamina, and multi-paragraph writing skills to animal-themed worksheets that are genuinely more complex than second-grade material. Eight- and nine-year-olds can multiply and divide within one hundred, read chapter-length informational texts, and organize their thinking into structured essays with introductions, evidence-based body paragraphs, and conclusions. Animal worksheets at this level use multiplication to calculate population data, such as if a wildlife reserve has six wolf packs with eight wolves in each pack, how many wolves live on the reserve in total. Division problems model real conservation scenarios, like distributing forty-eight fish equally among six aquarium tanks. Reading passages extend to chapter-length explorations of animal adaptations and the science behind food webs, requiring students to synthesize information across multiple sections and cite specific textual evidence. Data analysis becomes central as students create multiplication-based tables showing population changes across seasons and compare statistics from multiple ecosystems. Writing activities challenge third graders to compose multi-paragraph research reports comparing two species across at least three traits, using evidence from multiple sources. The food web serves as a unifying framework, with students tracing energy transfer from producers through consumers to decomposers, using multiplication and division to model how population changes at one level ripple through the entire system. Classification work grows more sophisticated as students evaluate competing criteria for grouping species and defend their choices in writing. The integration of multiplicative reasoning, chapter-length scientific reading, and evidence-based analytical writing ensures that third-grade animal worksheets deliver substantial intellectual advancement while maintaining the excitement that makes the animal kingdom an endlessly engaging context for rigorous academic work.',
      objectives: [
        { skill: 'Multiply and divide within 100 using animal population data', area: 'math' },
        { skill: 'Write multi-paragraph research reports comparing animal species', area: 'literacy' },
        { skill: 'Analyze food webs and energy transfer in ecosystems', area: 'cognitive' },
      ],
      developmentalNotes: 'Eight- and nine-year-olds can sustain focused research for twenty-five to thirty minutes, think abstractly about interconnected systems like food webs, and organize their writing into structured multi-paragraph essays with clear introductions, evidence-based body paragraphs, and conclusions.',
      teachingTips: [
        'Assign paired research projects where students compare two animals from different ecosystems, using multiplication to calculate population differences and presenting findings in a structured three-paragraph report.',
        'Create a classroom food web display where students use division to determine how many prey animals each predator needs per week, reinforcing both ecological concepts and arithmetic fluency.',
      ],
      faq: [
        { question: 'How do third-grade animal worksheets build on second-grade skills?', answer: 'Third-grade worksheets introduce multiplication and division using animal data, require multi-paragraph writing with evidence, and explore complex systems like food webs. Students move from single-operation problems to multi-step challenges involving all four operations.' },
        { question: 'What research skills do third-grade animal worksheets develop?', answer: 'Students learn to gather information from multiple sources, organize findings into structured reports with introduction, body, and conclusion paragraphs, cite evidence from texts, and create data tables that synthesize information across sources.' },
        { question: 'How do animal worksheets support third-grade science standards?', answer: 'They address ecosystems, food webs, energy transfer, and adaptation through data analysis and informational reading. Students use multiplication to model population dynamics and write evidence-based explanations of scientific concepts.' },
      ],
    },
  },

  // -- FAQ --`,

  'farm': `    },
    'third-grade': {
      intro: 'Third graders are ready for farm worksheets that harness multiplication arrays, area and perimeter calculations, and multi-paragraph informational writing to explore agriculture with genuine depth. Students at this level can multiply and divide within one hundred, calculate area and perimeter of rectangular shapes, and read chapter-length texts with strong comprehension. Multiplication arrays become tangible when applied to crop rows, with problems like a farmer plants seven rows of tomato plants with nine plants in each row, how many tomato plants are there in total. Area and perimeter calculations come alive as students design rectangular farm plots, determining that a bed measuring eight feet by six feet has an area of forty-eight square feet and a perimeter of twenty-eight feet. Division enters through harvest distribution scenarios such as sharing sixty-three ears of corn equally among nine families. Reading passages extend to chapter-length explorations of agricultural processes from seed selection through planting, pest management, harvesting, and distribution to market, demanding that students track multi-stage processes and identify cause-and-effect relationships. Fraction concepts emerge through authentic farm contexts like dividing a harvest into equal portions, measuring partial quantities for recipes, and partitioning rectangular fields into fractional sections on grid paper. Opinion essays challenge students to evaluate sustainable farming practices, arguing for organic versus conventional methods using evidence from their reading. Data interpretation grows more sophisticated as students read and create bar graphs showing crop yields across seasons and use multiplication to calculate projected harvests from sample plot data. The integration of multiplicative reasoning, geometric measurement, fraction concepts, and evidence-based persuasive writing ensures that third-grade farm worksheets deliver genuinely advanced academic challenges while maintaining the agricultural context that makes farming such a motivating learning theme.',
      objectives: [
        { skill: 'Calculate area and perimeter of rectangular farm plots using multiplication', area: 'math' },
        { skill: 'Read and interpret multi-paragraph texts about agricultural processes', area: 'literacy' },
        { skill: 'Compare farming methods using data from multiple sources', area: 'cognitive' },
      ],
      developmentalNotes: 'Third graders can think systematically about processes with multiple stages, such as the journey from planting to harvesting to selling. They apply multiplication and division to real-world scenarios with genuine enthusiasm when the context involves tangible products they eat and use daily.',
      teachingTips: [
        'Design a farm planning project where students calculate the area of garden plots, determine how many seeds fit using multiplication arrays, and estimate harvest yields, writing up their plan in a three-paragraph report.',
        'Use farm market scenarios to practice multi-step word problems involving all four operations, such as calculating revenue from selling produce at different prices per unit.',
      ],
      faq: [
        { question: 'What multiplication concepts do third-grade farm worksheets teach?', answer: 'Students use arrays to model crop rows, calculate total plants by multiplying rows by columns, determine area and perimeter of farm plots, and solve multi-step problems involving planting, harvesting, and selling quantities.' },
        { question: 'How do farm worksheets develop third-grade writing skills?', answer: 'Students write multi-paragraph opinion essays about farming practices, compose research reports comparing different agricultural methods, and create procedural texts explaining farm processes with sequenced paragraphs and supporting evidence.' },
        { question: 'Can farm worksheets teach fractions at the third-grade level?', answer: 'Yes. Farm contexts naturally introduce fractions through dividing harvests equally, measuring partial quantities of ingredients, partitioning plots into equal sections, and representing fractional amounts on number lines using harvest scenarios.' },
      ],
    },
  },

  // -- FAQ --`,

  'pets': `    },
    'third-grade': {
      intro: 'Third graders are ready for pet worksheets that combine multiplication and division with persuasive multi-paragraph writing and multi-source research to explore pet ownership at an analytical depth matching the ambitions of eight- and nine-year-olds. Students can multiply and divide within one hundred, construct organized essays with thesis statements, and evaluate information critically from multiple texts. Multiplication and division drive pet ownership math, with problems like if a dog eats four cups of food each day, how many cups does it need for a full week, and if you buy eighty-four treats and divide them equally among seven days, how many can you give each day. Cost analysis becomes genuinely challenging as students calculate weekly and monthly expenses for food, grooming, and veterinary visits, then compare total costs across three pet options using data tables. Reading passages extend to chapter-length texts exploring veterinary science, breed-specific care requirements, and the ethical considerations of pet adoption versus purchasing from breeders. These texts demand that students identify author perspective, evaluate supporting evidence, and synthesize information from multiple sources. Persuasive writing reaches a new level as students compose multi-paragraph essays arguing for or against pet ownership policies, structuring their arguments with a clear thesis, body paragraphs containing supporting reasons with evidence, and a reinforcing conclusion. Comparison charts grow more complex as students evaluate pets across five or more categories including initial cost, monthly maintenance, space requirements, and time commitment. Fraction concepts appear through feeding measurements and scheduling, such as determining what fraction of a family budget goes toward pet care. The integration of multiplicative financial reasoning, critical reading of multiple sources, and structured persuasive writing ensures that third-grade pet worksheets provide a rigorous academic experience while maintaining the personal connection that makes pets such a powerful motivational theme.',
      objectives: [
        { skill: 'Solve multi-step multiplication and division problems in pet care contexts', area: 'math' },
        { skill: 'Write persuasive multi-paragraph essays about pet-related topics', area: 'literacy' },
        { skill: 'Evaluate information from multiple sources to make reasoned decisions about pet care', area: 'cognitive' },
      ],
      developmentalNotes: 'Eight- and nine-year-olds are deeply invested in questions of responsibility and fairness, making pet care an ideal context for persuasive writing. Their growing capacity for sustained logical argument allows them to marshal evidence across multiple paragraphs when defending a position.',
      teachingTips: [
        'Create a pet budget project where students use multiplication to calculate weekly and monthly food costs, compare expenses across three different pets using data tables, and write a recommendation report with a clear thesis and supporting evidence.',
        'Set up a classroom debate format where students use evidence from their worksheets to argue which pet is best suited for a specific living situation, practicing oral argumentation alongside written analysis.',
      ],
      faq: [
        { question: 'How do pet worksheets challenge third graders beyond second-grade level?', answer: 'Third-grade pet worksheets require multiplication and division for cost calculations, multi-paragraph persuasive writing with evidence, analysis across multiple data sources, and abstract reasoning about long-term responsibility and consequences.' },
        { question: 'What real-world math do pet worksheets teach third graders?', answer: 'Students calculate feeding schedules using multiplication, divide supplies equally among multiple pets, compute weekly and monthly costs, compare prices using subtraction and multiplication, and create budgets that require sustained multi-step problem solving.' },
        { question: 'How do pet worksheets develop third-grade persuasive writing?', answer: 'Students write opinion essays with clear thesis statements, support arguments with evidence from multiple sources, organize ideas into introduction, body, and conclusion paragraphs, and use transitional phrases to connect their reasoning logically.' },
      ],
    },
  },

  // -- FAQ --`,

  'zoo': `    },
    'third-grade': {
      intro: 'Third graders are ready for zoo worksheets that integrate multiplication, division, area and perimeter calculations, and structured research writing to explore zoological science with genuine analytical depth. Eight- and nine-year-olds can multiply and divide within one hundred, calculate area and perimeter of rectangular shapes, and compose organized multi-paragraph texts with evidence from multiple sources. Multiplication drives zoo data analysis, with problems like if a zoo welcomes seventy-eight visitors per day on weekdays and one hundred forty-three on weekends, how many total visitors come in a full week, requiring students to combine multiplication with multi-step addition. Area and perimeter calculations become meaningful when applied to zoo enclosure design, as students determine that a rectangular elephant habitat measuring twelve meters by nine meters provides one hundred eight square meters of space and a perimeter of forty-two meters. Division models fair resource allocation, such as distributing ninety-six pounds of food equally among eight animals. Reading passages extend to chapter-length texts exploring how modern zoos balance entertainment with conservation, how breeding programs have saved endangered species, and how veterinarians monitor animal health using scientific methods. These texts demand synthesis across sections, evaluation of competing perspectives on animal welfare, and citation of specific evidence. Writing activities challenge students to compose structured informational reports incorporating enclosure measurements, population statistics, and conservation outcomes into cohesive multi-paragraph pieces. Fraction concepts emerge through ticket pricing scenarios and feeding schedule divisions. Graph interpretation grows more sophisticated as students analyze bar graphs showing attendance trends, create data displays from exhibit population data, and use multiplication to calculate averages. The integration of geometric measurement, multiplicative data analysis, chapter-length scientific reading, and evidence-based informational writing ensures that third-grade zoo worksheets deliver genuinely advanced challenges while maintaining the excitement that makes zoo animals a compelling learning context.',
      objectives: [
        { skill: 'Use multiplication and division to analyze zoo visitor statistics and enclosure measurements', area: 'math' },
        { skill: 'Write structured informational reports about zoo conservation programs', area: 'literacy' },
        { skill: 'Synthesize data from multiple exhibits to draw conclusions about animal welfare', area: 'cognitive' },
      ],
      developmentalNotes: 'Third graders can engage meaningfully with concepts like conservation and welfare, bringing both emotional investment and emerging logical reasoning to discussions about why zoos exist and how they protect species. Their ability to handle multi-variable comparisons makes zoo data analysis genuinely challenging and rewarding.',
      teachingTips: [
        'Design a zoo architect project where students calculate the area and perimeter of enclosures for different animals, using multiplication and research to determine minimum space requirements, then write a report justifying their design choices.',
        'Have students analyze real zoo attendance data presented in bar graphs, using multiplication and division to calculate averages and compare seasons, strengthening both data literacy and arithmetic fluency.',
      ],
      faq: [
        { question: 'What geometry skills do third-grade zoo worksheets develop?', answer: 'Students calculate area and perimeter of rectangular zoo enclosures, use multiplication to determine total square footage, compare enclosure sizes across species, and apply measurement concepts to real-world animal welfare questions.' },
        { question: 'How do zoo worksheets integrate reading and math at the third-grade level?', answer: 'Students read multi-paragraph texts about zoo conservation, extract numerical data from passages, use multiplication and division to analyze that data, and write reports synthesizing both quantitative findings and textual information.' },
        { question: 'Can zoo worksheets teach third graders about data interpretation?', answer: 'Yes. Students read and create bar graphs of zoo attendance, interpret picture graphs showing animal populations, calculate averages using division, compare data across multiple exhibits, and draw evidence-based conclusions from graphical information.' },
      ],
    },
  },

  // -- FAQ --`,

  'birds': `    },
    'third-grade': {
      intro: 'Third graders are ready for bird worksheets that channel developing research skills and multiplication fluency into authentic ornithological investigation, comparative analysis, and structured scientific writing. Eight- and nine-year-olds can multiply and divide within one hundred, sustain focused research across multiple sessions, and compose organized multi-paragraph texts with evidence from several sources. Multiplication drives population analysis, with problems like if a birdwatcher counts eight flocks of migrating geese with twelve birds in each flock, how many geese were observed in total. Division models resource distribution in nesting scenarios, such as distributing thirty-six pairs of bluebirds equally across four meadow sections. Migration worksheets use multiplication to calculate total distances traveled over multiple days, introducing the concept of rate when students determine that a bird flying forty-five miles per day covers three hundred fifteen miles in seven days. Reading passages extend to chapter-length texts exploring bird anatomy and flight mechanics, migration navigation, nesting architecture, and the role of birds in seed dispersal and ecosystem health. These demanding texts require students to synthesize information across chapters, identify the author\\\'s organizational structure, and cite specific evidence. Comparison essays become a central writing activity as students select two bird species and analyze them across at least three traits such as habitat, diet, and migration pattern, organizing their analysis into structured multi-paragraph pieces with clear topic sentences and supporting evidence. Data tables grow more complex as students organize findings across multiple categories for several species simultaneously. Fraction concepts emerge through wingspan measurements, egg-hatching timeline calculations, and analyzing what fraction of a bird\\\'s life cycle is spent in each developmental stage. The integration of multiplicative data analysis, chapter-length scientific reading, structured comparison writing, and authentic research methodology ensures that third-grade bird worksheets deliver substantial intellectual advancement while nurturing the observational skills that make ornithology a rewarding scientific pursuit.',
      objectives: [
        { skill: 'Apply multiplication and division to analyze bird migration data and population counts', area: 'math' },
        { skill: 'Write comparison essays examining two bird species across multiple characteristics', area: 'literacy' },
        { skill: 'Design and conduct structured research using multiple information sources about birds', area: 'cognitive' },
      ],
      developmentalNotes: 'Bird-themed content perfectly suits third graders\\\' growing interest in systematic observation and data collection. Eight- and nine-year-olds can maintain observation logs over multiple days, record quantitative data, and use multiplication to analyze their findings in ways that mirror authentic scientific practice.',
      teachingTips: [
        'Launch a bird-watching research project where students observe and tally birds over a week, use multiplication to calculate weekly totals from daily averages, and write a three-paragraph research report comparing their findings with published data.',
        'Create bird species comparison cards where students record wingspan, weight, diet, and habitat for multiple species, then use the data to write structured essays identifying similarities and differences across at least three traits.',
      ],
      faq: [
        { question: 'How do bird worksheets develop third-grade multiplication skills?', answer: 'Students multiply to calculate flock sizes, total migration distances over multiple days, egg counts across nesting sites, and food consumption rates. These contextual problems make abstract multiplication meaningful through vivid ecological scenarios.' },
        { question: 'What research skills do third-grade bird worksheets build?', answer: 'Students gather data from observation logs and reference texts, organize findings in comparison tables, synthesize information from multiple sources into structured reports, and support conclusions with numerical evidence and textual citations.' },
        { question: 'How do bird worksheets connect to third-grade writing standards?', answer: 'Students write comparison essays with clear organizational structures, compose informational reports with introduction and conclusion paragraphs, use evidence from data tables to support claims, and employ transitional phrases to connect ideas across paragraphs.' },
      ],
    },
  },

  // -- FAQ --`,

  'insects': `    },
    'third-grade': {
      intro: 'Third graders are ready for insect worksheets that leverage multiplication to model enormous colony populations, explore geometric symmetry in wing and body patterns, and develop explanatory writing through multi-paragraph essays about complex biological processes like metamorphosis. Eight- and nine-year-olds can multiply and divide within one hundred, analyze geometric patterns, and compose organized texts with evidence from multiple sources. Multiplication becomes powerfully concrete when applied to insect body parts, with problems like if there are fifteen ladybugs on a leaf and each has six legs, how many legs are there in total. Colony mathematics scales up dramatically as students calculate worker populations in ant colonies, determine how many cells bees can build in a week given a daily rate, and use division to figure out foraging trip requirements. Geometric analysis enters through the remarkable symmetry of insect wings, with students identifying lines of symmetry, measuring patterns, and exploring how bilateral symmetry appears across diverse species. Reading passages extend to chapter-length explorations of complete and incomplete metamorphosis, social hierarchies within ant and bee colonies, and the critical role insects play in pollination and decomposition. These texts demand that students track multi-stage processes, compare different types of metamorphosis, and synthesize information into coherent written explanations. Explanatory writing challenges students to describe metamorphosis from egg through larva and pupa to adult in a structured four-paragraph essay using precise scientific vocabulary and sequential transitions. Fraction concepts emerge through life cycle stage durations, such as calculating what fraction of a butterfly\\\'s life span is spent as a caterpillar versus an adult. Data projects ask students to create multiplication-based colony growth models, predict populations after several generations, and present findings in data tables with analytical paragraphs. The integration of multiplicative reasoning, geometric analysis, chapter-length scientific reading, and process-based explanatory writing ensures that third-grade insect worksheets deliver genuinely advanced challenges while maintaining the fascination that makes insects captivating for young scientists.',
      objectives: [
        { skill: 'Use multiplication to model insect populations and calculate body part totals across groups', area: 'math' },
        { skill: 'Write multi-paragraph explanatory texts describing insect life cycle processes', area: 'literacy' },
        { skill: 'Analyze geometric patterns and symmetry in insect body structures', area: 'cognitive' },
      ],
      developmentalNotes: 'Third graders are fascinated by the strange and surprising aspects of insect biology, from metamorphosis to colony hierarchies. Their developing capacity for sequential reasoning makes them well suited to tracking multi-stage processes, while multiplication gives them tools to quantify the enormous numbers that characterize insect populations.',
      teachingTips: [
        'Create an insect multiplication wall where students calculate total legs, wings, and antennae for groups of different insects, then compare totals to explore the relationship between multiplication and repeated addition with increasingly large numbers.',
        'Assign a metamorphosis explanatory essay project where students research one insect\\\'s life cycle from multiple sources and write a four-paragraph explanation with an introduction, two body paragraphs covering different stages, and a conclusion.',
      ],
      faq: [
        { question: 'How do insect worksheets make multiplication concrete for third graders?', answer: 'Insects are ideal for multiplication because they have consistent countable features. Six legs times any number of insects produces a predictable product, letting students verify multiplication through repeated addition before trusting the operation independently.' },
        { question: 'What science concepts do third-grade insect worksheets cover?', answer: 'Students explore complete and incomplete metamorphosis, colony social structures, predator-prey relationships, pollination, and geometric symmetry in wing patterns, all through reading, data analysis, and structured writing activities.' },
        { question: 'How do insect worksheets develop explanatory writing at the third-grade level?', answer: 'Students write organized multi-paragraph essays explaining processes like metamorphosis, using sequential structure, precise scientific vocabulary, evidence from multiple sources, and transitional phrases to guide readers through complex biological transformations.' },
      ],
    },
  },

  // -- FAQ --`,

  'ocean': `    },
    'third-grade': {
      intro: 'Third graders are ready for ocean worksheets that dive into multiplication-based measurement analysis, fraction concepts, and multi-source research writing to explore marine science with genuine intellectual depth. Eight- and nine-year-olds can multiply and divide within one hundred, work with basic fractions, and compose organized multi-paragraph research reports using evidence from multiple texts. Multiplication drives ocean measurement challenges, with problems like if a sea turtle swims thirty-seven miles each day during migration, how far does it travel in nine days. Division models resource distribution in marine contexts, such as dividing seventy-two fish equally among eight aquarium tanks. Fraction concepts emerge through ocean composition data, with students learning that approximately seven-tenths of Earth\\\'s surface is covered by water and analyzing what fraction of marine species inhabit each ocean zone. Area and perimeter calculations apply to mapping activities where students determine the size of coral reef protection zones. Reading passages extend to chapter-length texts exploring ocean zones from the sunlit epipelagic to the pitch-dark hadal zone, symbiotic relationships within coral reef ecosystems, and conservation challenges including acidification and habitat destruction. These demanding texts require students to synthesize information across sections, evaluate source reliability, and cite specific evidence when constructing arguments. Research reports challenge students to select a marine ecosystem, gather data from multiple texts, and organize findings into a structured multi-paragraph report with an introduction, evidence-based body paragraphs, and a conclusion drawing original insights. Graph interpretation becomes more sophisticated as students create and analyze bar graphs showing marine population data, use multiplication and division to calculate rates and averages, and compare statistics across ocean regions. The integration of multiplicative measurement analysis, fraction concepts, chapter-length scientific reading, and evidence-based research writing ensures that third-grade ocean worksheets deliver substantial intellectual advancement while maintaining the wonder that makes the ocean an endlessly fascinating learning context.',
      objectives: [
        { skill: 'Apply multiplication and division to solve multi-step problems involving ocean measurements and data', area: 'math' },
        { skill: 'Write research reports about ocean ecosystems synthesizing information from multiple sources', area: 'literacy' },
        { skill: 'Analyze relationships between ocean zones and the organisms adapted to each environment', area: 'cognitive' },
      ],
      developmentalNotes: 'The vastness and mystery of the ocean captivate eight- and nine-year-olds, who now have the cognitive tools to grapple with large numbers, layered ecosystems, and abstract concepts like pressure and depth zones. Their growing research skills allow them to explore ocean topics with genuine intellectual depth.',
      teachingTips: [
        'Design an ocean explorer research project where students choose a marine ecosystem, gather data from multiple texts, use multiplication to calculate population estimates, and present their findings in a structured three-paragraph report with a data table.',
        'Create ocean measurement challenges where students use multiplication to convert between units, calculate how far whales travel in a week given daily distances, and compare depths of ocean zones using multi-step subtraction and division.',
      ],
      faq: [
        { question: 'What math skills do third-grade ocean worksheets develop?', answer: 'Students use multiplication to calculate distances traveled by marine animals, division to analyze feeding rates, fractions to represent ocean composition, and multi-step operations to solve measurement problems involving depth, distance, and population data.' },
        { question: 'How do ocean worksheets build third-grade research skills?', answer: 'Students read multiple informational texts about ocean zones, extract and organize data into tables, synthesize findings from different sources into cohesive reports, and support their conclusions with both numerical evidence and textual citations.' },
        { question: 'Can ocean worksheets teach fractions at the third-grade level?', answer: 'Yes. Ocean contexts introduce fractions through water composition ratios, portions of marine food chains, dividing ocean regions into equal zones on maps, and representing fractional distances on number lines using migration route data.' },
      ],
    },
  },

  // -- FAQ --`,

  'dinosaurs': `    },
    'third-grade': {
      intro: 'Third graders are ready for dinosaur worksheets that push into multiplication with large numbers, place value into the thousands, and structured opinion writing about genuine paleontological debates. Eight- and nine-year-olds can multiply and divide within one hundred, understand place value through the thousands, and compose organized multi-paragraph essays with thesis statements and supporting evidence. Multiplication with large dinosaur numbers drives the mathematics, with problems like if a Tyrannosaurus rex had sixty teeth arranged in four rows and a museum displays seven T. rex skulls, how many total teeth are shown across all displays, requiring multi-step reasoning combining multiplication with place value understanding. Geological timeline work makes place value meaningful as students calculate intervals between periods and compare durations across eras using subtraction with numbers in the thousands. Division models paleontological resource allocation, such as distributing fossil specimens equally among museum display cases or dividing an excavation site into equal grid squares. Reading passages extend to chapter-length texts exploring competing theories about extinction, evidence for warm-blooded versus cold-blooded physiology, and how fossil discoveries have revolutionized understanding of the dinosaur-to-bird evolutionary transition. These texts demand that students evaluate competing arguments, identify which claims are supported by fossil evidence versus speculation, and synthesize multiple perspectives. Opinion essays challenge third graders to take a position on a genuine scientific debate, such as whether Tyrannosaurus rex was primarily a hunter or a scavenger, structuring their argument with a clear thesis, evidence-based body paragraphs, and a conclusion acknowledging the opposing viewpoint. Fraction concepts emerge through fossil measurement activities, skeletal proportions, and determining what fraction of known dinosaur species were carnivores versus herbivores. The integration of multiplicative reasoning with large numbers, place value through the thousands, chapter-length scientific reading, and evidence-based opinion writing ensures that third-grade dinosaur worksheets deliver authentically advanced challenges while maintaining the prehistoric excitement that makes dinosaurs irresistible.',
      objectives: [
        { skill: 'Use multiplication and place value to work with large numbers in paleontological contexts', area: 'math' },
        { skill: 'Write multi-paragraph opinion essays about dinosaur-related scientific questions', area: 'literacy' },
        { skill: 'Evaluate competing theories using evidence from multiple paleontological sources', area: 'cognitive' },
      ],
      developmentalNotes: 'Dinosaurs uniquely motivate third graders to wrestle with large numbers and deep time, concepts that push their mathematical and conceptual boundaries in productive ways. Their emerging ability to weigh competing explanations makes paleontological debates an ideal context for developing critical thinking and evidence-based argumentation.',
      teachingTips: [
        'Create a paleontologist research station where students use multiplication to estimate dinosaur herd populations, calculate total body lengths of multiple dinosaurs, and write opinion essays evaluating different extinction theories with evidence from at least two sources.',
        'Build a classroom timeline where students use place value and multiplication to plot key events in dinosaur history, calculating how many millions of years separated different periods and presenting their analysis in a structured paragraph.',
      ],
      faq: [
        { question: 'How do dinosaur worksheets develop third-grade multiplication with large numbers?', answer: 'Students multiply to calculate herd populations, total teeth across jaw rows, combined body lengths of dinosaur groups, and timeline intervals. The naturally large numbers in paleontology push students to apply place value understanding alongside multiplication fluency.' },
        { question: 'What critical thinking skills do third-grade dinosaur worksheets build?', answer: 'Students evaluate competing extinction theories, weigh evidence from multiple sources, distinguish between facts and opinions in scientific texts, and write structured opinion essays defending their position with specific paleontological evidence.' },
        { question: 'How do dinosaur worksheets connect to third-grade writing standards?', answer: 'Students write opinion essays with clear thesis statements about paleontological questions, compose informational reports about specific dinosaur species, organize research from multiple sources into structured paragraphs, and use domain-specific vocabulary accurately.' },
      ],
    },
  },

  // -- FAQ --`,

  'forest': `    },
    'third-grade': {
      intro: 'Third graders are ready for forest worksheets that integrate area and perimeter calculations, multiplication-based population estimates, and comparative research writing to explore woodland ecology with systems-level thinking. Eight- and nine-year-olds can multiply and divide within one hundred, calculate area and perimeter of rectangular shapes, and compose organized multi-paragraph reports using evidence from multiple sources. Area and perimeter calculations ground the mathematics in spatial reality, with problems like a ranger needs to fence a rectangular wildlife zone measuring nine meters by seven meters, what is the area and how many meters of fencing are needed. Multiplication drives population estimates, as students calculate that if a sample plot contains twelve oak trees and the forest has eight identical plots, the estimated total is ninety-six trees, introducing sampling methodology alongside arithmetic. Division models resource distribution, such as assigning equal numbers of monitoring stations to different quadrants. Reading passages extend to chapter-length texts exploring relationships between forest layers, from the sunlit canopy through the understory to the decomposer-rich forest floor. Students read about how decomposition cycles return nutrients to soil, how old-growth forests differ from managed plantations, and how climate change alters tree species distribution. These demanding texts require synthesis across sections and citation of specific evidence. Comparative research reports challenge students to analyze two forest biomes such as temperate deciduous and boreal coniferous forests, gathering data about climate, dominant species, and soil conditions from multiple sources and organizing findings into structured multi-paragraph pieces. Fraction concepts emerge through canopy coverage percentages and determining what fraction of total forest biodiversity each layer supports. Data projects grow more sophisticated as students create multiplication-based population models, predict how tree counts change over seasons, and present analysis in graphs with explanatory paragraphs. The integration of geometric measurement, multiplicative ecological modeling, chapter-length reading, and evidence-based comparative writing ensures that third-grade forest worksheets deliver genuinely advanced challenges while nurturing environmental awareness.',
      objectives: [
        { skill: 'Calculate area and perimeter of forest plots and use multiplication to estimate tree populations', area: 'math' },
        { skill: 'Write comparative research reports about different forest biomes using multiple sources', area: 'literacy' },
        { skill: 'Analyze the interconnected relationships between forest layers and their organisms', area: 'cognitive' },
      ],
      developmentalNotes: 'Forest ecosystems offer third graders a rich context for systems thinking, as they can now trace how changes in one forest layer affect others. Their growing spatial reasoning allows them to engage meaningfully with area and perimeter calculations, while their research stamina supports multi-source investigation projects lasting several sessions.',
      teachingTips: [
        'Design a forest surveyor project where students calculate the area and perimeter of rectangular forest sections, use multiplication to estimate tree counts based on sample plots, and write a comparative report analyzing two different forest biomes.',
        'Create a forest layers investigation where students read about canopy, understory, shrub, and forest floor ecosystems, organize data from multiple sources into comparison charts, and use fractions to describe how much of total forest biodiversity each layer contains.',
      ],
      faq: [
        { question: 'How do forest worksheets teach area and perimeter at the third-grade level?', answer: 'Students calculate the area and perimeter of rectangular forest plots, use multiplication to determine how many trees fit in a given area, compare plot sizes using division, and apply these measurements to real-world forestry management scenarios.' },
        { question: 'What research projects can third graders complete with forest worksheets?', answer: 'Students compare biomes like deciduous and coniferous forests, gather data from multiple texts about climate, species, and soil conditions, organize findings into comparison tables, and write multi-paragraph reports with evidence-based conclusions.' },
        { question: 'How do forest worksheets develop third-grade systems thinking?', answer: 'Students analyze how forest layers interconnect, trace decomposition cycles from leaf fall to soil nutrient return, model population relationships using multiplication, and explain how changes in one part of the ecosystem affect the whole system.' },
      ],
    },
  },

  // -- FAQ --`,

  'garden': `    },
    'third-grade': {
      intro: 'Third graders are ready for garden worksheets that cultivate multiplication-based planning, area calculations for garden bed design, and multi-paragraph informational and procedural writing reflecting the analytical sophistication of eight- and nine-year-olds. Students can multiply and divide within one hundred, calculate area and perimeter of rectangular shapes, and compose organized multi-paragraph texts with evidence and precise vocabulary. Multiplication arrays become tangible in garden contexts, with problems like if a raised bed has six rows and you plant eight seeds in each row, how many seeds do you need in total, giving the array model a physical reality students can verify by counting. Area calculations ground geometry in practical decision-making, as students determine that a bed measuring seven feet by five feet provides thirty-five square feet of growing space, then figure out how many plants fit given spacing requirements. Division enters through harvest distribution scenarios like sharing forty-five tomatoes equally among nine families. Reading passages extend to chapter-length texts exploring photosynthesis and nutrient cycling, companion planting strategies backed by research, and crop rotation mathematics used by professional farmers. These demanding texts require students to follow multi-step scientific processes and synthesize information from multiple sources into practical plans. Procedural writing reaches a new level as students compose multi-paragraph planting guides with precise measurements, sequential steps, and scientifically justified recommendations for a real audience. Informational reports challenge students to research a specific plant species, gathering data about growing conditions and nutritional content from multiple sources. Growth data analysis becomes genuinely analytical as students track measurements over weeks, use multiplication to calculate growth rates, predict future heights, and create graphs with written interpretations. Fraction concepts appear through garden section divisions, recipe measurements, and calculating what fraction of the growing season has elapsed. The integration of multiplicative planning, geometric measurement, chapter-length botanical reading, and evidence-based writing ensures that third-grade garden worksheets deliver rigorous challenges while maintaining the tangible satisfaction of gardening.',
      objectives: [
        { skill: 'Use multiplication and area calculations to design and plan garden layouts', area: 'math' },
        { skill: 'Write multi-paragraph procedural and informational texts about garden planning', area: 'literacy' },
        { skill: 'Analyze plant growth data over time to identify patterns and draw conclusions', area: 'cognitive' },
      ],
      developmentalNotes: 'Garden themes offer third graders a powerful context for applied mathematics because every aspect of garden planning involves multiplication, measurement, and spatial reasoning. Their growing patience for long-term projects makes tracking plant growth over weeks a satisfying experience that reinforces data collection habits and analytical thinking.',
      teachingTips: [
        'Launch a garden design project where students calculate the area and perimeter of rectangular beds, use multiplication to determine how many plants fit with proper spacing, and write a multi-paragraph plan explaining their design choices with measurements and reasoning.',
        'Set up a growth tracking investigation where students measure plants weekly, record data in tables, use multiplication to predict future growth based on average rates, and write analytical paragraphs describing the patterns they observe.',
      ],
      faq: [
        { question: 'What multiplication skills do third-grade garden worksheets develop?', answer: 'Students calculate total plants using row-by-column arrays, determine seed quantities through multiplication, compute area of rectangular garden beds, and solve multi-step problems involving planting schedules, spacing requirements, and harvest estimates.' },
        { question: 'How do garden worksheets build third-grade writing skills?', answer: 'Students write procedural texts with sequenced steps for planting, compose informational reports about plant biology using multiple sources, create multi-paragraph garden plans with measurements and justifications, and use precise vocabulary from botanical contexts.' },
        { question: 'Can garden worksheets teach data analysis at the third-grade level?', answer: 'Yes. Students record plant growth measurements over time, create line plots and bar graphs from their data, use multiplication to calculate growth rates and predict future measurements, and write analytical paragraphs interpreting the patterns they observe in their data.' },
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

  if (content.includes("'third-grade'")) {
    console.log('SKIP ' + theme + ': already has third-grade');
    continue;
  }

  const idx = content.indexOf(MARKER);

  if (idx === -1) {
    console.error('Pattern not found in ' + theme);
    errorCount++;
    continue;
  }

  content = content.substring(0, idx) + block + content.substring(idx + MARKER.length);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('OK ' + theme);
  successCount++;
}

console.log('\nDone: ' + successCount + ' updated, ' + errorCount + ' errors');
