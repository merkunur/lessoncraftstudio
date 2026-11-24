'use strict';
/**
 * Teacher notes, English, science: the 25 lessons of the five Grade 3 science units (Daily Teaching System, Stage D-3,
 * 2026-11-24; units in scripts/units/year/place-ready-3.en.science.js; design scripts/units/year/design.en.science.json,
 * grade 3). Each note was written from the pages the lesson hands out, at every published level: the new pages G3-581 to
 * G3-601 from lcs-stage-d/batch-3/TEXT-DUMP.md and the sheets, the published pages G3-400, G3-385, G3-393 and G3-392 from
 * fresh renders (lcs-stage-d/notes-3; those are published at one level). Every lesson has its hands-on routine
 * (`routine`), printed under "What the class does" before the page; eleven investigations have three sessions, and the
 * routine says what the third one does. A note names only the pages its lesson hands out. A note has to fit its sheet of
 * the teacher guide (build-guide.js).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:investigation': {
      title: 'A Fair Test: One Change at a Time',
      objective: 'Children plan a fair sink-or-float test that changes only one thing, keep everything else the same, run it, and write a lab report with their question, prediction, results, and conclusion.',
      routine: 'Give each group a tub of water on towels, two oranges, and modeling clay with a cup of plastic counting cubes. Day 1: groups choose a question and list what they will keep the same (the same tub, the same water, the same orange). Orange groups float one orange with its peel, then peel the other and float it. Clay-boat groups add cubes one at a time and count until the boat sinks. Day 2: groups run the test again and finish the report.',
      note: {
        mistake: 'Children change two things at once (a bigger orange and no peel), so they cannot tell which change mattered. They think heavy things always sink, and they write what they expected instead of what happened.',
        words: 'Say: "In a fair test, we change only one thing and keep everything else the same." Ask: "What is the one thing you changed? What stayed the same?" The page is a lab report: children check one question ("Does an orange float with its peel? Does it float without its peel?" or "How many cubes can a clay boat carry before it sinks?"), write what they think, draw what happened in the two tanks and describe it, then finish "Now I know that ___." The page is one level.',
        watch: 'An orange with its peel usually floats, because the peel is full of tiny air pockets; without its peel it usually sinks. A clay boat carries cubes until the water comes over its sides. "I think" is right as a guess even when the test shows something else; "I learned" must match what happened. Keep the reports: the later investigations use the same steps. No answer key.',
      },
    },
    '3:balanced-forces': {
      title: 'Balanced and Unbalanced Forces',
      objective: 'Children play tug-of-war with a rope and a stuffed animal in the middle, push a box from both sides, and find that equal pushes or pulls in opposite directions leave it still while unequal ones make it move; they show each case with force arrows.',
      routine: 'Tie a stuffed animal to the middle of a rope and tape a line on the floor under it. Day 1: two children pull gently and equally, then one pulls harder, while the class watches the animal; no wrapping the rope around hands, and everyone stops on "stop." Day 2: two children push an empty box from opposite sides, first equally, then one harder. Day 3: children draw force arrows for each case on the board, a longer arrow for a stronger force, and act out a book resting on a table.',
      note: {
        mistake: 'Children think a thing that is not moving has no forces on it, so a book on a table has none. They think a force is needed to keep a moving thing moving, and that the bigger child always wins.',
        words: 'Say: "A force is a push or a pull. It has a size and a direction." Say: "Balanced forces do not change how an object moves, so a still object stays still. Unbalanced forces make it start to move, stop, or change speed or direction." Level 1: three pictures with arrows; children circle "balanced" or "unbalanced" and "stays still" or "starts to move." Level 2 has six pictures, and children draw the arrows. Level 3 adds "The book does not fall because the table ___."',
        watch: 'Right: the rope with both pulling equally hard, the book on the table, and the bag on the hook are balanced and stay still; the box with one child pushing much harder, the wagon, and the kicked ball are unbalanced and start to move. Level 3: the table pushes up on the book as hard as gravity pulls it down, and "The two forces on the book are balanced (equal), so it stays still." A longer arrow means a stronger force. No answer key.',
      },
    },
    '3:predict-the-swing': {
      title: 'Predict the Swing',
      objective: 'Children build a pendulum from string and a washer, count its swings in 15 seconds several times, find the count stays the same for the same string, and use the pattern to predict the count for a shorter string before testing it.',
      routine: 'Gather string, metal washers, tape, rulers, and a timer. Groups tape the string to the edge of a table so the washer hangs without touching anything, and measure from the tape to the washer. Use the same washer for every string, and each time pull it out to the side the same small distance and let go without pushing. Day 1: count the swings of a 12-inch string for 15 seconds, three times. Day 2: predict, then test a 6-inch string. Day 3: test a 9-inch string, find the class pattern, and test a 3-inch string against a prediction.',
      note: {
        mistake: 'Children count each move to one side as a swing, so their counts double. They think a heavier washer or a harder push changes the count, or that one count is enough.',
        words: 'Say: "One swing is over and back." Say: "Scientists repeat a test and use the middle count, so one mistake does not fool them." Ask: "What changed? What stayed the same?" Level 1: three counts for the 12-inch string, "Were the three counts close to each other?", and a drawing. Level 2 adds the 6-inch string, the middle count, and a prediction ("close" or "not close"). Level 3 adds the 9-inch string, a bar graph, "When the string is shorter, it swings ___ times," and "A 3-inch string would swing about ___ times."',
        watch: 'The class\'s counts decide. Expect about 13 or 14 swings for 12 inches, about 15 or 16 for 9 inches, and about 19 for 6 inches; counts from the same string should be within a swing or two. Shorter string, "more" swings. The 3-inch prediction should be more than the 6-inch count (it is about 27). The middle count is the middle one of the three put in order. No answer key.',
      },
    },
    '3:friction': {
      title: 'Friction Slows It Down',
      objective: 'Children roll a toy car down the same ramp onto carpet, tile, and sandpaper, measure in inches how far it travels on each, and explain that friction is a force that slows a moving object.',
      routine: 'Set a board on one book as a low ramp on a tile floor. Children start the same toy car at the top of the board every time, let it roll without a push, and measure in inches, with a yardstick or tape measure, from the end of the board to the front of the car. Then lay a carpet square at the foot of the ramp, then a sheet of sandpaper, and test the same way, three tries on each surface. Last, each child rubs a hand over each surface and tells which feels roughest.',
      note: {
        mistake: 'Children think the car stops because it "runs out of push," not because a force slows it. They push the car on one try, or start it from different spots.',
        words: 'Say: "Friction is a force that pushes against a moving thing and slows it down. Rough surfaces make more friction." Ask: "Was it fair? What stayed the same?" Level 1: one try on the tile floor and the carpet, "The car went farther on," and a drawing of the ramp. Level 2 has three surfaces, three tries each, the middle distance, and "The car went farthest on ___ because ___." Level 3 adds a bar graph, rounded to the nearest 10 inches, and "Friction is a force that ___."',
        watch: 'The class\'s measurements decide. Usually the car goes farthest on the tile floor and much shorter on carpet; sandpaper is often in between. A good reason names friction: "the carpet made more friction." Level 3: "Friction is a force that slows a moving object." For the graph, 85 inches rounds to 90; past 160, color to the top and write the number on the bar. No answer key.',
      },
    },
    '3:static-electricity': {
      title: 'Balloon Tricks: Static Electricity',
      objective: 'Children rub a balloon on a wool sweater or scarf, bring it near bits of paper, a thin stream of tap water, and another rubbed balloon, and record which things move without being touched.',
      routine: 'Check for latex allergies first and use non-latex balloons if needed. Tear tiny bits of paper, and turn a faucet on to a thin, steady stream. Children rub a balloon on a wool sweater or scarf for 10 seconds and hold it close to the paper, then to the water, then to a second rubbed balloon hanging from a string, without touching. Repeat with a balloon nobody rubbed. Dry days work best. Pick up every piece of a popped balloon right away.',
      note: {
        mistake: 'Children think the balloon is sticky, or that the paper moves because of wind. They think a force can only act when things touch.',
        words: 'Say: "Rubbing gives the balloon an electric charge. A charged balloon can pull or push some things without touching them." Ask: "What changed when we rubbed it?" Level 1: three tests; children circle "moved toward," "moved away," or "did not move." Level 2 adds a prediction for each test and "a balloon we did NOT rub," then "What happened when we did not rub the balloon?" Level 3 adds "When I rubbed the balloon, ___. This happened because ___."',
        watch: 'Usually the paper bits and the stream of water moved toward the rubbed balloon; the two rubbed balloons moved away from each other; the balloon nobody rubbed did not move the paper. That balloon is the comparison: it shows the rubbing made the difference. On a humid day the tricks can fail; that is a real result. Level 3: "it got an electric charge from rubbing." No answer key.',
      },
    },
    '3:what-magnets-pull': {
      title: 'What Do Magnets Pull?',
      objective: 'Children predict and test which classroom objects a magnet pulls, and find that magnets pull things with iron or steel in them but not every metal (aluminum foil, a penny, and a brass key are not pulled).',
      routine: 'Gather a bar magnet for each pair and a tray of objects: a ball of aluminum foil, a penny, plain steel washers (not stainless steel), paper clips, crimped metal bottle caps, a safety pin, steel scissors, a nail, a plastic button, an eraser, an all-wood spoon, and a brass key. Test every object yourself first. Pairs predict, then touch the magnet to each object and sort it into "pulled" and "not pulled." Keep magnets away from computers, tablets, and phones, and out of mouths.',
      note: {
        mistake: 'Children think magnets pull all metals, or anything shiny. They think a magnet will pull a penny because it is metal.',
        words: 'Say: "Magnets pull things that have iron or steel in them. Many metals are not pulled." Ask: "Is it metal? Was it pulled?" Level 1 has six objects, each with what it is made of; children circle a prediction and a result. Level 2 has twelve objects, then children sort them into "pulled" and "not pulled." Level 3 adds "Does a magnet pull all metals? My evidence: ___."',
        watch: 'Pulled: the washer, the paper clip, the bottle cap, the safety pin, the scissors, and the nail. Not pulled: the aluminum foil, the penny (copper and zinc), the brass key, the button, the eraser, and the wooden spoon. Level 3: no; the foil, the penny, and the brass key are metals that were not pulled. A prediction is right as a guess; the result must match the test. If one of your objects surprises you, the test decides. No answer key.',
      },
    },
    '3:magnet-distance': {
      title: 'Magnet Force from a Distance',
      objective: 'Children measure in inches how close a paper clip must be before a magnet pulls it, test whether the pull works through paper, cardboard, and water, and find the force gets weaker as the distance grows.',
      routine: 'Tape a ruler to each table and lay a magnet at 0. Use classroom bar magnets, not tiny strong ones, keep them away from computers, tablets, and phones, and count them back in: small magnets are dangerous if swallowed, so none go home. Day 1: slide a paper clip slowly toward the magnet and mark where it starts to move, to the nearest half inch, three times. Day 2: repeat with a small and a big magnet. Day 3: hold paper, cardboard, a cup of water, and a thick book between magnet and clip.',
      note: {
        mistake: 'Children think a bigger magnet is always stronger, or that the pull stops at a sharp edge. They think a magnet cannot pull through paper or water.',
        words: 'Say: "A magnet can pull without touching. The pull gets weaker as the distance grows." Ask: "Where did the clip start to move?" Level 1: one measurement, then a prediction and a result for a sheet of paper, cardboard, a plastic cup of water, and a thick book, and a drawing of one test. Level 2 measures a small and a big magnet three times each, with the middle distance and "Which magnet pulled from farther away?" Level 3 adds "When the clip is farther from the magnet, the pull is ___. I know because ___."',
        watch: 'Print the page at 100%: its ruler is true to scale. The class\'s measurements decide. A bigger magnet is not always stronger, so "small," "big," or "the same" can all be right. The pull goes through the paper, the cardboard, and the water; a thick book may stop a weak magnet, which is a real result, not a wrong one. Level 3: "weaker," because the clip did not move until it was close. No answer key.',
      },
    },
    '3:magnet-problem': {
      title: 'A Problem Magnets Could Solve',
      objective: 'Children list everyday problems a magnet could help with (a cabinet door that swings open, a box of steel and aluminum cans to sort, a lost needle), choose one, and write what a good solution must do and what limits it has (materials, size, time).',
      routine: 'Show the three problems for real: a cabinet door that swings open, a box of clean, empty steel and aluminum cans with taped edges, and a straightened paper clip hidden in a rug square as the lost needle (never a real needle). Children try each one with their hands, then talk in groups: what would a good solution have to do, and what are the limits? List the criteria and constraints on chart paper. Keep the chart for the next lesson.',
      note: {
        mistake: 'Children jump to building before they know what the solution must do. They mix up criteria and constraints, and think a solution can have no limits.',
        words: 'Say: "Criteria are what the solution must do. Constraints are our limits: the materials, the money, the time, and the size." Ask: "How will we know it worked?" Level 1: children circle one problem, circle what a good solution must do and our limits, and sketch the problem. Level 2: children write the problem, "A good solution must ___," and "We can only use ___." Level 3 asks for two criteria and two constraints.',
        watch: 'Good choices for the door: "holds the door shut" and "still opens easily"; for the cans: "pulls out only the steel cans"; for the needle: "finds the needle fast"; "is safe for small hands" fits all three. The Level 1 limits ("costs very little," "uses only things in our classroom") are constraints, not things the solution must do. Constraints name real limits, such as one magnet, tape and cardboard, one class period. No answer key.',
      },
    },
    '3:compare-magnet-solutions': {
      title: 'Design and Compare Magnet Solutions',
      objective: 'Children sketch two or three solutions to their magnet problem, score each against their criteria and constraints, build the best one, and test it.',
      routine: 'Each group takes out its problem and criteria chart from the last lesson. Set out magnets, cardboard, tape, string, craft sticks, and paper cups. Day 1: each child sketches a different solution, and the group shares them. Day 2: the group scores each sketch against its criteria, a check for each one met, and builds the best one. Day 3: the group tests it against each criterion, improves it, and tests again. Keep magnets away from computers, tablets, and phones.',
      note: {
        mistake: 'Children choose the design they like best or a friend\'s, not the one that meets the most criteria. They think a test that shows a problem means the group failed.',
        words: 'Say: "Engineers compare their ideas against the criteria before they build." Say: "A test that shows a problem is useful: it tells us what to improve." Ask: "Which criteria does this sketch meet?" Level 1: two sketches, why each is good, which one to build, and how the test went. Level 2 has three sketches and a chart of three "must do" rows and two "our limit" rows, with a check under each solution that meets each one. Level 3 adds "After the test, we would improve it by ___."',
        watch: 'The chosen solution should have the most checks, or the "because" must say why not. "When we tested it" tells what really happened, against a criterion: "the door stayed shut." An improvement should fix what the test showed. Every group\'s answers are its own. No answer key.',
      },
    },
    '3:weather-data': {
      title: 'Our Weather Data: Tables and Graphs',
      objective: 'Children put two weeks of the class\'s daily high temperature in degrees Fahrenheit, rain or snow, and cloud cover into a table and a bar graph, and compare them with the class\'s data from the fall.',
      routine: 'Plan ahead: in the first weeks of school, start the class weather log. Each school day a helper writes the date, the high in °F (from the National Weather Service for your town, or an outdoor thermometer read at about 2 p.m.), rain or snow, and the clouds: clear, partly cloudy, or cloudy. Keep the fall pages. Day 1: children copy the last two weeks of the log into their tables. Day 2: they round the highs and graph them. Day 3: they compare the graphs with the fall.',
      note: {
        mistake: 'Children think one cold day means winter has come, or that the weather on a date is the same every year. They read a bar graph by its color instead of by the line at the top of the bar.',
        words: 'Say: "Weather is what the air is like on one day. Data from many days shows a pattern." Ask: "How have the highs changed since the fall?" Level 1: five days, then "The warmest day was day ___. Its high was ___ °F." Level 2 has ten days, a bar graph (round each high to the nearest 10 degrees), and "In the fall, our warmest high was ___ °F. Now it is ___ °F." Level 3 adds two highs changed to °C, read across a °F and °C thermometer.',
        watch: 'Every answer is the class\'s own data. The bars must match the rounded highs: 64 °F rounds to 60, and 65 °F rounds up to 70. "Now our days are ___ than in the fall": warmer or colder, as the data shows. On Level 3, read across the thermometer: 70 °F is about 21 °C, and 32 °F is 0 °C. No answer key.',
      },
    },
    '3:seasons-weather': {
      title: 'What Weather to Expect Each Season',
      objective: 'Children graph the average monthly high temperature and rainfall for their town or a US city from a table, and describe the typical weather of each season from the graph.',
      routine: 'Find Seattle, Washington, and your own town on a US map. Read Seattle\'s table of monthly highs and rain together. Pour water into a clear container up to 6 inches to show January\'s rain, and into another up to 1 inch for July\'s. Then children act out Seattle\'s year: shiver for the coolest months, fan themselves for the warmest, open a pretend umbrella for the rainiest. If you can, find your own town\'s averages too and compare.',
      note: {
        mistake: 'Children think summer is hot and dry everywhere and every winter is snowy. They mix up the weather on one day with the usual weather of a season.',
        words: 'Say: "These are averages from 1991 to 2020: the usual weather, not one day." Ask: "Which months are warmest? Which are wettest?" Level 1: four months (Jan, Apr, Jul, Oct); children graph each high rounded to the nearest 10 degrees and write two words from the word bank for each season, with a drawing. Level 2 graphs all twelve months (January and February are done for you). Level 3 adds "The warmest season is ___," "The wettest season is ___," and how they differ.',
        watch: 'Bars: Jan 50, Apr 60, Jul 80, Oct 60; on Levels 2 and 3 also Feb 50, Mar 50, May 70, Jun 70, Aug 80, Sep 70, Nov 50, Dec 50. Words that fit: winter cold or cool and rainy; spring cool or mild; summer warm, sunny, and dry; fall cool and rainy. Level 3: summer, highs about 70 to 80 °F; winter, about 16 inches of rain in all (6 + 4 + 6). No answer key.',
      },
    },
    '3:water-cycle': {
      title: 'The Water Cycle',
      objective: 'Children mark the water level in an open cup each day as water evaporates, see water condense on the outside of a cold glass (water from the air, not from inside the glass), and label evaporation, condensation, precipitation, and collection on a water-cycle diagram.',
      routine: 'A week ahead, fill a clear cup with water, mark the level with tape, set it in a sunny window, and mark the level each day. On the day, fill a dry glass with ice water and a few drops of food coloring; children dry the outside and watch drops form. The drops are clear, not colored, so the water came from the air, not from inside the glass. Then children act out the cycle: rise as vapor, huddle as a cloud, fall as rain, and pool as a lake.',
      note: {
        mistake: 'Children think the water in the cup disappeared or that the Sun used it up. They think the drops on a cold glass leaked through it, and that clouds are made of steam or smoke.',
        words: 'Say: "Water evaporates into the air as a gas we cannot see. When it cools, it condenses into tiny drops: that is what a cloud is." Say: "The water goes around and around: evaporation, condensation, precipitation, collection." The page has a diagram with four numbers; children write each word from the word bank on the line with the same number. The page is one level.',
        watch: 'Right in the first copy: 1 evaporation (the arrow rising from the water), 2 condensation (the cloud), 3 precipitation (the rain), and 4 collection (the water on the ground). The class cup should show the level dropping a little each day. No answer key.',
      },
    },
    '3:climates-of-the-world': {
      title: 'Climates Around the World',
      objective: 'Children read climate graphs for places such as northern Alaska, Miami, the Sahara, and the Amazon rain forest, compare their typical temperatures and rainfall across the year, and sort them into hot and dry, hot and wet, and cold.',
      routine: 'Find each place on a globe: Utqiagvik in northern Alaska, Miami in Florida, Tamanrasset in the Sahara, and Manaus in the Amazon rain forest. Day 1: read the temperature bars together and act each place out (shiver, fan yourself). Day 2: read the rain bars, and fill a tall vase to about 12 inches to show Manaus\'s wettest month beside an almost empty cup for Tamanrasset. Day 3: sort the four places by climate and talk about how weather and climate differ.',
      note: {
        mistake: 'Children think weather and climate are the same thing, or that one cold day changes a place\'s climate. They think every hot place is a desert.',
        words: 'Say: "Weather is what the air is like on one day. Climate is the usual weather of a place over many years." Ask: "What do the bars show about this place all year?" Level 1 has two places: children write each place\'s letter from the map and circle "hot and dry," "hot and wet," or "cold." Level 2 has four places. Level 3 adds "Weather is ___. Climate is ___."',
        watch: 'Right: Utqiagvik is cold ("In winter the high is below 0 °F"); Miami is hot and wet; Tamanrasset in the Sahara is hot and dry, with almost no rain; Manaus in the Amazon is hot and wet. The map letters change from level to level, so check each place by where its dot is: the far north of North America, the tip of Florida, the middle of northern Africa, and northern South America. No answer key.',
      },
    },
    '3:weather-problem': {
      title: 'Define a Weather Problem',
      objective: 'Children choose a weather hazard of their region (a flood, high wind, a blizzard, lightning), describe a problem it causes for the school, and write the criteria a solution must meet and its constraints.',
      routine: 'Talk about the weather hazards of your region: floods, high wind, blizzards, lightning. Show photos you have previewed so they do not frighten; some children may have lived through a storm. Walk the schoolyard and look for places a hazard would cause trouble: a low spot where water pools, the path to the door, things that could blow away. Review the safety rule for each, such as "When thunder roars, go indoors." Groups choose one hazard and list the problems it causes.',
      note: {
        mistake: 'Children describe the weather instead of the problem it causes, or jump straight to a solution. They think a solution can stop the storm itself, not just reduce the damage.',
        words: 'Say: "We cannot stop a storm, but we can reduce the damage it causes." Say: "Criteria are what the solution must do; constraints are our limits." Level 1: children circle a hazard, circle what a good solution must do, and sketch the school and the hazard. Level 2: children write the hazard, the problem it causes, "A good solution must ___," and "We are limited by ___." Level 3 asks for two criteria and two constraints.',
        watch: 'Good choices match the hazard: a flood, "keeps water out of the school"; high wind, "keeps the playground safe"; a blizzard, "keeps the path to the door clear"; lightning, "protects people outside." "Is strong enough for a storm" fits most. On Level 1, "costs very little" and "uses only things in our classroom" sit under "Circle our limits:": they are the constraints. Keep the pages: the next lesson tests designs. No answer key.',
      },
    },
    '3:reduce-weather-damage': {
      title: 'Which Design Reduces the Damage?',
      objective: 'Children test model solutions such as a wind barrier in front of a fan or a model house on stilts in a tray that floods, compare the results, and make a claim with evidence about which design best reduces the hazard.',
      routine: 'Each group builds a small model house (a milk carton or a paper cup) in a plastic tray. Flood groups pour the same cup of water each time; for wind groups, a grown-up runs a fan on low at the same distance each time, with the fan and its cord well away from the water trays. Day 1: test the house with no protection. Day 2: build two designs, such as stilts of craft sticks, a wall of clay, or a barrier of blocks, and test each the same way. Day 3: compare and write the claim.',
      note: {
        mistake: 'Children test each design differently (more water, a closer fan), so the results cannot be compared. They choose the design they like best, not the one the evidence supports.',
        words: 'Say: "A claim is what we think is true. Evidence is what we saw in our test. Reasoning tells why the evidence supports the claim." Level 1: children draw the house before and after the test, circle whether it stayed dry and stayed standing, and write what they would change. Level 2 tests two designs and circles the one that worked better. Level 3 adds a claim, evidence, and reasoning, and circles a real design that works like theirs.',
        watch: 'The class\'s tests decide: the better design kept the house drier or standing under the same test. On Level 3, a wall of clay along the water is like "a levee (a wall of earth along a river)," and blocks in front of the fan are like "a row of trees to block the wind." A house on stilts is like "a house raised on posts." No answer key.',
      },
    },
    '3:life-cycles-compare': {
      title: 'Butterfly and Frog Life Cycles Compared',
      objective: 'Children compare the butterfly and frog life cycles, sort facts into true for one, the other, or both, and find that every life cycle includes birth, growth, reproduction, and death.',
      routine: 'Show photos or a short video of a butterfly\'s and a frog\'s life cycles. Lay stage cards for each in two circles on the floor, and children walk each circle saying the stages aloud. Then talk about all living things: they are born, grow, have young (reproduce), and die. Children name another animal and tell its stages, such as a chicken: egg, chick, and adult hen.',
      note: {
        mistake: 'Children think a caterpillar and a butterfly, or a tadpole and a frog, are different animals. They think a tadpole is a fish, and that the two life cycles have nothing in common.',
        words: 'Say: "Every life cycle has birth, growth, reproduction, and death, even when the young look very different from the grown-up." Ask: "Is it true for the butterfly, the frog, or both?" The page has eight sentences; children put a check under the butterfly, the frog, or both when the sentence is true for that animal. The page is one level.',
        watch: 'Right in the first copy: "The grown-up catches insects to eat." frog; "The grown-up has six legs." butterfly; "It hatches from an egg." both; "Its young has no legs at first." frog (a caterpillar has legs); "The grown-up drinks nectar from flowers." butterfly; "Its young swims with a tail." frog; "Its young looks very different from the grown-up." both; "It spends one stage as a chrysalis." butterfly. The sentences change from copy to copy. No answer key.',
      },
    },
    '3:flower-parts': {
      title: 'Flowers Make Seeds',
      objective: 'Children take apart a grocery-store flower, find and name the petals, sepals, stamens, and pistil, and explain that a flower is the part of the plant that makes seeds so new plants can grow.',
      routine: 'Buy grocery-store flowers with big parts, such as lilies or alstroemeria, one for each pair; in these flowers the three outer parts that look like petals are the sepals. Pairs gently pull the flower apart with their fingers and tape each part onto paper with its name: sepals, petals, stamens (stalks tipped with pollen), and the pistil in the middle. With a hand lens, they look inside the base of the pistil for tiny bumps that can become seeds. Pollen stains, so cover the tables; wash hands after.',
      note: {
        mistake: 'Children think flowers are only for looks, and that every colorful part is a petal. They think seeds come from the soil, not from the flower.',
        words: 'Say: "A flower is the part of the plant that makes seeds. Pollen from the stamens reaches the pistil, and seeds grow at the base of the pistil." Ask: "Which part protected the bud? Which part makes pollen?" The page shows a flower with four numbered parts; children write each part\'s name on its line and cross out the word in the word bank that is not a part of a flower. The page is one level.',
        watch: 'Right in the first copy: 1 sepal, 2 stamen, 3 pistil, 4 petal; "roots" is crossed out, because roots are a part of the plant but not of the flower. The numbers change from copy to copy. No answer key.',
      },
    },
    '3:mealworm-life-cycle': {
      title: 'Raise Mealworms Through Their Life Cycle',
      objective: 'Children keep mealworms in oats with a slice of carrot, observe them every few days for several weeks, record each stage with a dated drawing and length in inches, and build a model of the darkling beetle\'s life cycle.',
      routine: 'Plan ahead: about six weeks before, buy 20 regular mealworms at a pet store (not giant mealworms or superworms, which may never become pupae) and keep them in a plastic tub with an inch of oats and a slice of carrot, no water dish; change the carrot when it dries. Hand out the page then: twice a week children measure one mealworm in inches (and draw it on the Level 1 and 2 logs). Day 1: compare the log. Day 2: find larvae, pupae, and beetles in the tub and finish the log. Day 3: build a clay or paper-plate model of the life cycle. Wash hands after; never release them outdoors.',
      note: {
        mistake: 'Children think a mealworm is a worm; it is the larva of the darkling beetle, an insect. They think the still pupa is dead, and that the beetle is a different animal.',
        words: 'Say: "A mealworm is a larva. Like a butterfly, the darkling beetle has four stages: egg, larva, pupa, and adult." Ask: "What changed since last time?" Level 1: four dated drawings, each with its stage circled, then the life-cycle ring. Level 2 has eight rows and adds the length in inches, to the nearest quarter inch. Level 3 keeps the date, length, and stage without drawings, and adds "A mealworm is a ___, like a caterpillar," "Both life cycles have ___ stages," and one way they differ.',
        watch: 'The ring, round the arrows from the eggs: larva, pupa, adult beetle. Level 3: "larva"; "four" stages: egg, larva, pupa, adult; a difference: a butterfly pupa is a chrysalis, or the adult is a beetle, not a butterfly. A larva grows longer; a pupa does not eat and hardly moves. The eggs are too small to see easily. No answer key.',
      },
    },
    '3:traits-from-parents': {
      title: 'Traits from Parents',
      objective: 'Children compare photos of parent animals and their young and a litter of puppies, record traits passed from parents (ear shape, fur color) and how the young differ from each other, and analyze the data in a table.',
      routine: 'Find photos of parent animals with their young: a dog with a litter of puppies, cats and kittens, horses and a foal. Do not ask children to compare themselves with their own families. Day 1: in pairs, children list traits they can see, such as fur color, ear shape, and spots, for each parent and each young animal. Day 2: they make a class table of which young share each trait with the mother, the father, or both. Day 3: they look at how the young differ from each other and why it matters.',
      note: {
        mistake: 'Children think the young look only like the mother, or that brothers and sisters look the same. They think a trait a parent got during its life, such as a scar, passes to its young.',
        words: 'Say: "Young animals get traits from both parents, so brothers and sisters can look different from each other. That is called variation." Ask: "Where did this puppy get its ears?" Level 1: children circle each dog\'s fur color and ear shape. Level 2 adds spots, then "Which traits came from the parents?" and "Are all the puppies the same?" Level 3 adds a cat family and asks why variation matters.',
        watch: 'Right in the first copy: mother brown, floppy ears, no spots; father white, pointed ears, spots. Puppies: 1 brown, pointed, no spots; 2 white, floppy, spots; 3 brown, floppy, spots; 4 white, pointed, no spots; 5 brown, floppy, no spots. Every trait came from a parent; the puppies are not all the same ("no"). Cats: mother gray, white paws; kitten 1 gray, white paws; kitten 2 brown, no white paws; kitten 3 gray, no white paws. Variation matters because some young may survive better if things change. No answer key.',
      },
    },
    '3:traits-environment': {
      title: 'Traits the Environment Changes',
      objective: 'Children compare two bean plants of the same kind grown with plenty and with too little water and read about a dog that gets heavy from too much food and little exercise, and explain that the environment can change traits such as height and weight.',
      routine: 'Plan ahead: about four weeks before, plant beans from one packet in two cups of the same soil in the same sunny window. Water one every day and the other once a week. On the day, children measure both plants in inches and count their leaves. Then read about Max the beagle together. Keep the talk on Max and the plants, never on anyone\'s body or weight.',
      note: {
        mistake: 'Children think the short plant is a different kind of bean, or that every trait comes from the parents. They think a change from the environment, such as Max getting heavy, passes to his puppies.',
        words: 'Say: "Some traits come from the parents. The environment, such as water, light, food, and exercise, can change other traits, such as height and weight." Ask: "Was this trait there from the start, or did the environment change it?" Level 1: children cut out four cards and glue each under "a trait from the parents" or "a trait changed by the environment." Level 2 has eight cards. Level 3 adds "Both bean plants grew from the same kind of seed, but ___. This shows that the environment can change ___."',
        watch: 'From the parents: a kitten born with long, fluffy fur; Max\'s long, floppy ears; a puppy born with spotted fur; the color of a bean plant\'s flowers. Changed by the environment: a bean plant that stayed short with too little water; Max getting heavy from too much food and little exercise; a plant with pale leaves after a week in a dark closet; a tree that grew bent by strong winds. Level 3: the one watered once a week grew shorter, with fewer leaves; "traits such as height." No answer key.',
      },
    },
    '3:animals-in-groups': {
      title: 'Animals in Groups',
      objective: 'Children read about wolves, honeybees, Canada geese, and schools of fish, list how living in a group helps members find food, stay safe, or save energy, and write an argument with evidence for one animal.',
      routine: 'Read short texts or watch short videos about a wolf pack, a honeybee hive, a V of Canada geese, and a school of fish. Then try two models. Children walk in a V behind a leader, like geese. In a quick game, a "hunter" tries to tag one child gently, first while the class stands spread out, then while it moves together as a tight school. Talk about which was harder for the hunter, and why.',
      note: {
        mistake: 'Children think animals live in groups because they are friends, without a survival reason. They think every animal in a group does the same job.',
        words: 'Say: "Living in a group can help animals find food, stay safe, or save energy." Say: "Circle only what the text says." Level 1 has wolves and Canada geese: children write how each group works, circle how it helps, and finish "The ___ live in a group because ___." Level 2 has four groups. Level 3 adds "Claim: living in a group helps ___ survive. Evidence 1: ___. Evidence 2: ___."',
        watch: 'Right: wolves, "find food" (they hunt big animals together); Canada geese, "save energy" (each flies just behind and beside another goose, where the air is pushed up); a school of fish, "stay safe" (a hunting fish has trouble picking out one fish); honeybees, "find food" and "stay safe" (some gather food, others guard the door). Evidence comes from the texts, in the child\'s own words. No answer key.',
      },
    },
    '3:camouflage': {
      title: 'Hide and Survive: Camouflage',
      objective: 'Children act as birds picking up colored paper moths from a newspaper and a green lawn in 30 seconds, count which colors were found least, and explain why moths that match their background are more likely to survive.',
      routine: 'Day 1: cut moth shapes from green, gray, red, and yellow paper, ten of each color for each background, and predict which will be found least. Day 2: scatter the moths on a green lawn (or green paper), then on sheets of newspaper; a "bird" picks up as many as possible in 30 seconds, one at a time, and the class tallies the colors found. Run several birds on each background. Day 3: color the graph, compare, and explain which moths survived.',
      note: {
        mistake: 'Children think the moths choose a matching color or change color to hide. They think the bright moths were found because they were slow.',
        words: 'Say: "Moths that match their background are harder for a bird to find, so more of them survive and have young." Ask: "Which color was found least on the lawn? On the newspaper?" Level 1 has green and red moths on the green lawn. Level 2 has four colors on two backgrounds. Level 3 adds a bar graph and "Moths of one kind can be different colors. This matters because ___."',
        watch: 'The class\'s tallies decide. Usually green moths survive best on the lawn and gray moths on the newspaper; red and yellow are found fastest. Remember: the moths that were not found survived. Level 3: if the background changes, some moths will still match it and survive. No answer key.',
      },
    },
    '3:survive-well-or-not': {
      title: 'Survive Well, Less Well, or Not at All',
      objective: 'Children read about a pond or a desert habitat, sort its plants and animals into those that survive well, less well, or not at all there, and support each choice with evidence.',
      routine: 'Show photos of a desert with one small water hole. Label three spots in the room: survives well, survives less well, cannot survive. Read a living thing and what it needs, such as "a polar bear needs cold, ice, and snow," and children walk to a spot and say why. Then imagine a pond instead: which of the same living things would survive well there?',
      note: {
        mistake: 'Children think animals can move or learn to live anywhere, or that "less well" means it dies at once. They sort by which animal they like instead of by what it needs.',
        words: 'Say: "A living thing survives well where it can get what it needs." Ask: "What does it need? Can it get that here?" Read the desert card together: "The only water is one small water hole. In the summer it gets very small and shallow. Plants that need water often can grow only right next to the water hole." Level 1: children cut out five cards and glue each in its column. Level 2 has eight cards, and children write why. Level 3 adds a sentence about one that survives well and one that cannot.',
        watch: 'Right: the camel, the cactus, and the desert tortoise survive well; the horse and the sunflower survive less well, only near the small water hole, because they need water every day or often; the goldfish and the water lily need deep water and the polar bear needs ice and snow, so they cannot survive. Each "because" uses what the card says the living thing needs. No answer key.',
      },
    },
    '3:fossils': {
      title: 'Fossils Tell About Long Ago',
      objective: 'Children press a shell or a leaf into clay to make a model fossil, then study fossil photos (a fish fossil found high on a mountain, a fern fossil found in Antarctica) and explain what each tells about the living things and environments of long ago.',
      routine: 'Collect shells and sturdy leaves ahead of time. Day 1: each child flattens a ball of modeling clay, presses a shell or leaf into it, lifts it out, and studies the print. Day 2: look at photos of real fossils: a fish fossil found high on a mountain, a fern fossil found in Antarctica, seashells found in a desert. Day 3: children trade model fossils and tell what living thing made each print and where it might have lived.',
      note: {
        mistake: 'Children think a fossil is the living thing itself, and that places have always looked the way they do now. They think fossils form in a few days, like the clay model.',
        words: 'Say: "A fossil is what is left of a living thing from long ago, kept in rock. Real fossils take a very long time to form." Say: "A fish fossil on a mountain means water once covered that place. A fern fossil in Antarctica means it was once warm." Level 1: two fossils; children circle what lived there and what the place was like then. Level 2 has four fossils, and children write what lived there, what the place was like then, and what it is like now. Level 3 adds "Fossils show that places change. For example, ___."',
        watch: 'Right: the fern in Antarctica, a land plant, a warm forest on land, now cold and icy; the fish high on a mountain, a water animal, under water, now a high, dry mountain; the seashell in a desert, a water animal, under water, now a hot, dry desert; the palm leaf in a snowy place, a land plant, a warm forest on land, now cold and snowy in winter. No answer key.',
      },
    },
    '3:habitat-change': {
      title: 'When a Habitat Changes',
      objective: 'Children read about a change to a habitat (a new highway through a forest, a river dammed for a town) and judge the merit of solutions such as wildlife crossings and fish ladders, making a claim with evidence.',
      routine: 'Lay a long strip of paper across the floor as a highway, with a "pond" on one side. Some children are deer, foxes, and turtles who need the pond; a few walk along the road as cars. Try crossing with no help, then over a "bridge" (a path of paper over the road) and through a "tunnel" (under a table). Talk about what each solution changed and what it would cost to build. Then look at photos of real wildlife crossings and fish ladders.',
      note: {
        mistake: 'Children think a habitat change matters only if animals die right away, or that a solution with no cost exists. They think one solution works for every animal.',
        words: 'Say: "When a habitat changes, people can design solutions. Each one has good points and limits." Ask: "How does it help the animals? What does it cost?" Level 1: one solution, a wildlife bridge; children circle yes or no for four questions and finish "I think the bridge is a good solution because ___." Level 2 adds a tunnel and a chart of how each helps and what it costs, then a choice. Level 3 adds a claim, evidence, and "A limit of my choice."',
        watch: 'Right on Level 1: "Can the animals cross without meeting cars?" yes; "Do the animals still have to walk on the road?" no; "Can the animals on one side reach the pond?" yes; "Does building it cost money?" yes. On Levels 2 and 3, both solutions help and both cost money, and some animals may not walk into a dark tunnel. Either choice is right with evidence. No answer key.',
      },
    },
  },
};
