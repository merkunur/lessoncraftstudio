'use strict';
/**
 * Teacher notes, English, science: the 28 lessons of the six Grade 2 science units (Daily Teaching System, Stage D-3,
 * 2026-11-24; units in scripts/units/year/place-ready-2.en.science.js; design scripts/units/year/design.en.science.json,
 * grade 2). Each note was written from the pages the lesson hands out, at every published level: the new pages G2-584 to
 * G2-604 from lcs-stage-d/batch-2/TEXT-DUMP.md and the sheets, the published pages from fresh renders (lcs-stage-d/notes-2;
 * those are published at one level). Every lesson has its hands-on routine (`routine`), printed under "What the class
 * does" before the page; nine investigations have three sessions, and the routine says what the third one does. A note
 * names only the pages its lesson hands out. A note has to fit its sheet of the teacher guide (build-guide.js).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '2:materials': {
      title: 'Sort by Material',
      objective: 'Children examine objects made of paper, plastic, glass, metal, and wood, sort them by material, and find the one in each row that is made of something different.',
      routine: 'Set out clean, empty things: a notebook, a cereal box, a plastic bottle, a plastic spoon, a glass jar, a metal spoon, a can with taped edges, a wooden block, and a pencil. Children feel each one, tap it with a pencil (metal rings, glass clinks, plastic thuds), and try to bend it, then sort the things into hoops by material: paper, plastic, glass, metal, and wood. A grown-up hands around the glass jar.',
      note: {
        mistake: 'Children sort by use or by color, so the kitchen things go together. They think a cardboard box is not paper, and that a jar with a metal lid is made of metal.',
        words: 'Say: "A material is what a thing is made of. Things that look very different can be made of the same material." Ask: "What is it made of? How do you know?" The page has four rows of four things; in each row, three are made of the same material, and children circle the one that is different. The page is one level.',
        watch: 'Right in the first copy: row 1 the honey jar (glass; the notebook, cereal box, and envelope are paper), row 2 the jam jar (glass; the spoon, glue, and toothbrush are plastic), row 3 the sheet of paper (the saucepan, can, and bolt are metal), row 4 the corn (food; the sunscreen, shampoo, and comb are plastic). The rows change from copy to copy. A child who circles the cereal box "because it is cardboard" needs to hear: "Cardboard is thick paper. Which one is not paper at all?" No answer key.',
      },
    },
    '2:describe-materials': {
      title: 'Describe It: Hard, Bendy, Rough, Soaks Up Water',
      objective: 'Children test a wood block, a sponge, a metal spoon, a rubber band, a paper towel, and a plastic lid for hardness, bendiness, texture, and whether water soaks in, and record the results.',
      routine: 'Each group gets a wood block, a kitchen sponge, a metal spoon, a rubber band, a paper towel, and a plastic lid. Day 1: press each one with a thumb (hard or soft) and try to bend it gently (bends or stays stiff). Day 2: rub it with a finger (rough or smooth), then put 5 drops of water on it and wait a minute (soaks up water or does not). Day 3: groups compare results, sort the materials two ways, and describe one material.',
      note: {
        mistake: 'Children think hard means heavy, and that rough things must be hard. They look at a material instead of testing it, so they say a dry sponge "does not soak up water."',
        words: 'Say: "Scientists describe a material by its properties: how it feels and what it does." Agree on one item of each kind, and decide hard cases together: "Press it with your thumb." "Five drops, then wait a minute." Level 1 has four materials (a paper towel, a plastic lid, a metal spoon, a sponge) and two properties: children circle hard or soft and bends or stays stiff. Level 2 has six materials and four properties, then children write the names under hard, soft, soaks up water, and does not. Level 3 adds the sentence "The ___ is ___, ___, and ___."',
        watch: 'The class\'s tests decide. Usually the wood block and the spoon are hard and stay stiff; the sponge and the paper towel are soft and soak up water; the rubber band bends; a thin plastic lid may bend. A sponge is rough; the spoon and lid are smooth. On Level 3, the three properties must match the child\'s own circles. No answer key.',
      },
    },
    '2:sink-float': {
      title: 'Floating Facts: Shape the Clay',
      objective: 'Children test a ball of clay and the same clay pressed into a boat, find that the ball sinks and the boat floats, and use their results to decide whether sentences about floating are true or false.',
      routine: 'Give each pair the same size lump of modeling clay and a tub of water. First, children roll the clay into a ball and lower it into the water: it sinks. Then they press the same clay into a flat boat with high sides and set it on the water: it floats. Groups whose boat sinks fix a leak or make the sides higher and try again. Lay towels under the tubs.',
      note: {
        mistake: 'Children think the boat floats because it is lighter, though it is the same clay. They think heavy things always sink, so a steel ship "cannot" float.',
        words: 'Say: "The clay is the same, and it weighs the same. Only the shape changed. The boat shape pushes aside more water, and the water pushes back up on it." On Make Clay Float, children color where each clay shape ends up, circle the steel thing that floats, and draw a clay boat. On Floating Facts, children read six sentences and circle true or false. Each page is one level.',
        watch: 'Right: the clay boat floats, the ball sinks, and the ship (not the nail) floats. In the first copy of Floating Facts: "A heavy pumpkin floats." true; "Some heavy things float." true; "All light things float." false; "A steel ship sinks." false; "A feather sinks." false; "An apple floats, but a potato sinks." true. Most potatoes sink in tap water; test one if a child doubts it. No answer key.',
      },
    },
    '2:best-material': {
      title: 'The Best Material for the Job',
      objective: 'Children test paper, plastic wrap, foil, cloth, and a paper towel as a roof for a toy, count the drops of water that come through each, and choose the best material for an umbrella using their data.',
      routine: 'Set a small toy between two blocks and lay a square of one material across the blocks as a roof. A child drips water onto the same spot with a dropper, one drop at a time, while the group counts; stop when the toy gets wet, or at 20 drops (write 20+). Day 1: test two materials. Day 2: test the rest the same way. Day 3: compare the drops, color the graph, and choose the best umbrella and the best towel. Keep paper towels nearby for spills.',
      note: {
        mistake: 'Children pick the thickest or the softest material without looking at the data. They think the best material for one job is the best for every job, so they choose plastic wrap for a towel too.',
        words: 'Say: "Engineers choose a material by what the job needs. An umbrella must keep water out. A towel must soak water up." Ask: "Which roof held the most drops?" Level 1 tests three roofs (plastic wrap, paper, cloth), and children circle "wet" or "dry." Level 2 tests five roofs: children write the drops before it leaked, circle wet or dry, and color the bar graph. Level 3 adds "The best material for an umbrella is ___ because ___." and the same sentence for a towel.',
        watch: 'The class\'s counts decide. Usually plastic wrap and foil keep the toy dry past 20 drops, while paper and the paper towel leak soon; cloth depends on how thick it is. The best umbrella is a material that kept the toy dry; the best towel is one that soaked up the water, like the paper towel or cloth. The bars must match the counts. No answer key.',
      },
    },
    '2:take-apart-build': {
      title: 'Take It Apart, Build Something New',
      objective: 'Children build a small house from ten building blocks, take it apart, use the same pieces to build something different, and explain how one set of pieces can make many objects.',
      routine: 'Each pair counts out 10 building blocks or snap cubes. They build a small house with all 10 pieces and count them again. Then they take it apart and build something different with the same 10 pieces: a car, a tower, a boat, or a bridge. Pairs walk around and look at what others built from the same pieces.',
      note: {
        mistake: 'Children think a new object needs new pieces, or that some pieces get "used up" when they take the house apart. They lose count and think the second object has a different number of pieces.',
        words: 'Say: "Many different objects can be built from the same small pieces." Ask: "How many pieces did your house use? How many does your car use?" Level 1: children draw the first object, take it apart, and draw the new one. Level 2 adds the number of pieces each object used and "Did both objects use the same number of pieces?" Level 3 adds "I used the pieces again by ___."',
        watch: 'Right: both objects used 10 pieces, so the answer is "yes." The two drawings should show two different objects. A child who counts 9 or 11 should count the real pieces again. On Level 3, accept any true sentence, such as "taking the house apart and making a car." Point out that houses, toys, and furniture are built from smaller pieces too. No answer key.',
      },
    },
    '2:land-water-map': {
      title: 'Make a Map: Land and Water',
      objective: 'Children color a map of an island with a key, land in green or brown and water in blue, and label a lake, a river, a hill, and the ocean.',
      routine: 'Look at a globe and a map of your state together: find blue water, land, a lake, and a river, and read the map key. Then the class makes a big island map on butcher paper: blue paper for the ocean all around and for a lake and a river, green or brown paper for the land, and drawn hills. Children add a key with a sample of each color.',
      note: {
        mistake: 'Children think a map shows what the land really looks like from the ground. They mix up a lake and the ocean, and color the river green because it is "on the land." Many skip the key.',
        words: 'Say: "A map shows a place from above. The key tells what each color or symbol means." Ask: "Is the lake inside the land or around it? Where does the river go?" Level 1: children color the key boxes first, then the land green or brown and the water blue. Level 2 adds four numbered tags to label from the word bank (hill, ocean, river, lake). Level 3: children draw a made-up island with five features and make a key for it.',
        watch: 'Right: the ocean around the island, the lake, and the river are blue; the rest of the island is green or brown, with the hills on land. On Level 2 the tag numbers change from copy to copy; in the first copy, 1 is the hill, 2 the lake, 3 the ocean, and 4 the river. On Level 3, every symbol on the map should be in the key. No answer key.',
      },
    },
    '2:landform-model': {
      title: 'Shape the Land: A Landform Model',
      objective: 'Children build a hill, a valley, a plain, and a lake from sand or clay in a tray, pour a little water to see where it collects, and draw a top-down map of their model.',
      routine: 'Each group gets a tray of damp sand (or modeling clay) on towels. Day 1: build a mountain, a hill, a valley, a flat plain, and a hollow for a lake. Day 2: press plastic wrap or foil into the lake hollow so water can collect there (or build in clay), pour a little water slowly onto the high places, and watch where it runs and collects, then draw the model from the side. Day 3: stand over the tray, look straight down, and draw it as a map from above with a key. Wash hands afterward.',
      note: {
        mistake: 'Children call any hill a mountain, and think a valley is a kind of hill. They draw the map from the side, so mountains look like triangles. Some expect water to stay where it was poured.',
        words: 'Say: "A landform is a shape of the land. Water runs downhill and collects in low places." Ask: "Where did the water go? Why there?" Say: "A map shows the land from above, the way a bird sees it." Level 1: children circle each landform they made and draw the model. Level 2: children draw the model from the side and from above and label three landforms from the word bank (hill, valley, lake). Level 3: they label five and make a key.',
        watch: 'The page records each group\'s own model. Water should collect in the lake and the valley, the low places. On the map from above, hills and mountains are shapes seen from the top, and the lake is a blue patch; the side view shows heights. Labels must match the model. No answer key.',
      },
    },
    '2:water-on-earth': {
      title: 'Where Is Water on Earth?',
      objective: 'Children use a globe and picture cards to find water in oceans, rivers, lakes, ponds, snow, and ice, and sort them into solid or liquid and salty or fresh.',
      routine: 'Find the oceans, a big lake, and a river on a globe, and the white ice near the poles. Pass around an ice cube in a cup and a cup of water: solid and liquid. Then stir a spoonful of salt into one cup of water: it looks the same as fresh water, so we cannot tell salty from fresh by looking, and in science class we never taste to find out. Last, sort picture cards on a floor chart: liquid or solid, salty or fresh.',
      note: {
        mistake: 'Children think all water is salty, or that the ocean is fresh. They do not count snow and ice as water. Many think most of Earth\'s water is in rivers and lakes.',
        words: 'Say: "Water can be liquid or solid. Ocean water is salty. Rain, rivers, lakes, ponds, snow, and ice on land are fresh." Ask: "Is it liquid or solid? Salty or fresh?" Level 1: children cut out six cards and glue each under "liquid water" or "solid water." Level 2: eight cards go into four boxes (liquid salty, liquid fresh, solid salty, solid fresh); "Some boxes may stay empty." Level 3 adds "Most of Earth\'s water is in ___." with a word bank.',
        watch: 'Right: the river, the ocean, the puddle, and rain are liquid; snowflakes, the icicle, the snowy mountain top, and the frozen pond are solid. Only the ocean is salty, so "solid, salty" stays empty. On the mountain card, say: "The water here is the snow on top." Level 3: the ocean. No answer key.',
      },
    },
    '2:globe-toss': {
      title: 'Globe Toss: More Water or Land?',
      objective: 'Children toss an inflatable globe around the circle, record whether the catcher\'s right thumb lands on water or land, and use their tally to conclude that most of Earth\'s surface is covered by water.',
      routine: 'Sit in a circle with an inflatable globe. Toss it gently underhand; the catcher looks where the right thumb landed and says "water" or "land," and a recorder marks it on chart paper. If the thumb sits on both, choose where most of it is. Toss 10 times for the first count, then 30 times. Any child may pass the globe on without a turn.',
      note: {
        mistake: 'Children expect half water and half land, or decide from one or two catches. They think a lake or river on a thumb counts as land because it is inside a country.',
        words: 'Say: "Each catch is like picking a spot on Earth without looking. The more catches we make, the better our answer." Ask: "What do our marks tell us?" Level 1: children write W or L after each of 10 catches, count each, and circle "water," "land," or "the same." Level 2: 30 catches as tally marks, the totals, a bar graph, and "Most of Earth is covered by ___." Level 3 adds "We caught water ___ times and land ___ times."',
        watch: 'Usually water comes up much more often: about 7 of every 10 catches. The class\'s count is real data even if it differs; more tosses bring it closer. The bars must match the totals, and the totals must match the tally. Levels 2 and 3: water. No answer key.',
      },
    },
    '2:day-and-night': {
      title: 'Why Do We Have Day and Night?',
      objective: 'Children turn a globe slowly in a flashlight beam, find where it is day and where it is night, and explain that the Earth turning makes day and night, not the Sun going around the Earth.',
      routine: 'Darken the room. Put a small sticky note on your town on a globe. A child holds a flashlight still as the Sun and shines it at the globe from a few steps away, while another child turns the globe slowly toward the east (counterclockwise, seen from above the North Pole). The class watches the note move into the light (day) and out of it (night). Then children take turns being the Sun and the turner.',
      note: {
        mistake: 'Children think the Sun goes around the Earth, or goes behind the mountains or "to sleep" at night. They think one side of the Earth always has day.',
        words: 'Say: "The Earth turns all the time. The side facing the Sun has day; the side facing away has night. One whole turn takes about 24 hours." Ask: "When it is day here, where is it night?" The page shows the Earth from above, with the Sun on one side and six numbered pins; children circle Day or Night for each pin. The page is one level.',
        watch: 'Right: pins on the half of the Earth facing the Sun have day; pins on the far half have night. In the first copy, pins 2, 4, and 5 have day and pins 1, 3, and 6 have night. A child who circles by number order has not looked at the Sun: ask, "Which side faces the Sun?" No answer key.',
      },
    },
    '2:moon-phases': {
      title: 'The Moon\'s Shapes in a Month',
      objective: 'Children name the new moon, first quarter, full moon, and last quarter, put them in their monthly order, and check their chart against a month of the real Moon.',
      routine: 'About a month before this lesson, start a class Moon calendar: each school day a helper looks up the Moon\'s shape on a Moon calendar or looks for it in the sky, and draws it on the class calendar. In the lesson, darken the room, set a lamp as the Sun, and let small groups hold a foam ball on a pencil and turn slowly to find the new moon, first quarter, full moon, and last quarter. Nobody touches the hot bulb.',
      note: {
        mistake: 'Children think the Earth\'s shadow makes the Moon\'s shapes, or that the Moon really changes shape. They think "quarter" means a quarter of the Moon is lit, though at a quarter we see half of it lit.',
        words: 'Say: "The Moon goes around the Earth about once a month. We see more or less of its sunlit side." Say: "At first quarter and at last quarter, we see half of the Moon lit, not a quarter." On the page, the white part is the lit part. Children write each moon\'s name, using each word in the word bank twice. In the Northern Hemisphere, the first quarter is lit on the right and the last quarter on the left. The page is one level.',
        watch: 'Right: all white is the full moon; all gray is the new moon; white on the right half is the first quarter; white on the left half is the last quarter. Each name is used twice. Then compare with the class Moon calendar: the order is new, first quarter, full, last quarter, and new again. No answer key.',
      },
    },
    '2:fast-slow-changes': {
      title: 'Fast Changes: Earthquakes, Volcanoes, Landslides',
      objective: 'Children read short texts and look at photos and videos of an earthquake, a volcanic eruption, a landslide, and a flood, and sort Earth events into those that happen in minutes, hours, or days and those that take many years.',
      routine: 'Show short, calm photos and videos of an earthquake, a volcano erupting, a landslide, and a flood, and of slow changes: a canyon, an old worn-down mountain, moving sand dunes, and a rock cracked by ice. Preview each clip; a child who has lived through a disaster may feel upset, so talk gently about how helpers keep people safe. Then the class lays event cards on a floor line with two ends: minutes, hours, or days, and many years.',
      note: {
        mistake: 'Children think all changes to the Earth are fast, or that mountains and canyons never change. They think one big storm carved the Grand Canyon.',
        words: 'Say: "Some changes to the Earth happen fast, in minutes, hours, or days. Others are so slow that they take many years." Say: "One storm moves a little sand; a whole dune moves over many years." Level 1: children cut out four cards and glue each on the side that tells how fast it happens. Level 2 has eight cards. Level 3 adds book, photo, or video to circle under each card: what showed you how fast it was.',
        watch: 'Right: an earthquake, a flood, a landslide, and a volcano erupting are minutes, hours, or days; ice cracking a rock winter after winter, a mountain wearing down, a river carving a canyon, and sand dunes moving are many years. On Level 3, accept "video" or "book" for what showed the speed; a photo shows what changed, but not how fast. No answer key.',
      },
    },
    '2:water-shapes-land': {
      title: 'Slow Changes: Water Shapes the Land',
      objective: 'Children pour water over a sand hill in a tray again and again, watch the sand wash down and spread out, and compare it with photos of the Grand Canyon, which the Colorado River carved over millions of years.',
      routine: 'Outside or on towels, each group builds a sand hill at one end of a tray, with a book under that end. Day 1: pour water from a cup onto the top of the hill, one cup at a time from the same height, counting the cups, and draw the hill before and after. Day 2: rebuild the hill and pour again, looking for a path cut into it and sand spreading at the bottom. Day 3: compare the trays with photos of the Grand Canyon.',
      note: {
        mistake: 'Children think the sand disappears, instead of moving downhill. They think a river carves a canyon in a few days, the way the tray changed in minutes.',
        words: 'Say: "Moving water picks up sand and carries it downhill. Over a very long time, a river can carve a canyon." Ask: "Where did the sand go?" Say: "The Colorado River carved the Grand Canyon over millions of years." Level 1: children draw the sand hill before and after the water. Level 2 adds a tally of the cups poured and three things to circle. Level 3 adds two sentences with words from the word bank (millions of years, minutes).',
        watch: 'Drawings should show the hill lower after the water, a path cut into it, and sand spread at the bottom. Children circle every change they really saw: "a path cut into the hill," "sand spread out at the bottom," "the hill got lower." Level 3: "Our tray changed in minutes." "The Colorado River made the Grand Canyon in millions of years." No answer key.',
      },
    },
    '2:stop-the-sand': {
      title: 'Stop the Sand from Washing Away',
      objective: 'Children test two ways to keep sand on a hill in a tray during the same pour of water, measure how much sand washed down, and compare the strengths and weaknesses of each design.',
      routine: 'Two to three weeks ahead, sow grass seed in a little soil so one group can try "soil and plants." Each group builds the same sand hill in two trays and protects each with a different design: rocks, a grass mat, a craft-stick wall, or soil and plants. Day 1: plan and build. Day 2: pour the same number of cups the same way on both hills, then scoop the sand that washed to the bottom with a spoon and count the spoonfuls. Day 3: compare results and talk about each design.',
      note: {
        mistake: 'Children test the two designs with different amounts of water, so the test is not fair. They think more stuff on the hill always works better, and mix up the sand that stayed with the sand that washed down.',
        words: 'Say: "A fair test gives both designs the same water, poured the same way." Say: "Fewer spoonfuls washed down means more sand stayed on the hill." Level 1: children draw both designs before and after the water, circle the words for what each design used, and circle the one that kept more sand ("If both kept the same sand, circle both."). Level 2 adds the spoonfuls of sand that washed down. Level 3 adds a strength and a weakness of each design.',
        watch: 'The design that kept more sand is the one with fewer spoonfuls washed down. A good strength or weakness tells what really happened: "the rocks held the sand, but water ran around them." If a test was not fair, run it again. No answer key.',
      },
    },
    '2:best-solution': {
      title: 'Which Real Solution Is Best?',
      objective: 'Children compare photos of real solutions (a seawall, a windbreak of trees, a sand fence on a dune, big rocks along a riverbank) with their tray results, and tell how each slows wind or water and one drawback of each.',
      routine: 'Show photos of a seawall, a row of trees as a windbreak, a sand fence on a dune, and big rocks along a riverbank. Children match each photo to a design from their sand trays: "This is like our rocks." Then, outside or in a deep plastic bin, a grown-up fans dry sand with a paper plate, first with no fence and then with a little fence of index cards, while children stand back and watch where the sand goes.',
      note: {
        mistake: 'Children think one solution stops both wind and water, and that a real solution has no problems. They think the biggest solution is always the best one.',
        words: 'Say: "Each solution slows wind or water. Each one also has a problem." Ask: "What does this one slow? What could go wrong?" Level 1: for a windbreak of trees and a seawall, children circle wind or water, then color the star of the one they would pick for our sandy hill. Level 2 has four solutions and adds how each one works and a problem. Level 3 adds "For our sandy hill I would pick ___ because ___."',
        watch: 'Right: the windbreak of trees and the sand fence slow wind; the seawall and the riverbank rocks slow water. The star is the child\'s own pick: it is right when the reason fits the problem. Problems to accept: trees take years to grow; a seawall costs a lot, and sand can wash away in front of it; a sand fence can get buried; rocks are heavy to move. No answer key.',
      },
    },
    '2:ice-melt-fastest': {
      title: 'Where Does Ice Melt Fastest?',
      objective: 'Children place same-size ice cubes in the sun, in the shade, on a metal tray, and wrapped in a mitten, check them every ten minutes, and find that the mitten slows the melting because it keeps the warmth out.',
      routine: 'Day 1: children predict where ice will melt fastest. Day 2, on a sunny day: put same-size cubes from one tray out at the same time, each on a paper plate: one in the sun, one in the shade, one on a metal tray in the shade, and one wrapped in a mitten in the shade. Check every 10 minutes for 30 minutes. Day 3: repeat the test or compare with another class, and talk about why the results came out as they did.',
      note: {
        mistake: 'Children think a mitten makes things warm, so the ice in it will melt first. They think the metal tray feels cold, so its ice will last longest.',
        words: 'Say: "A mitten does not make heat. It keeps warmth out, so the ice inside melts slowly." Say: "Metal moves warmth into the ice quickly, even when it feels cold." Ask: "Was it a fair test? What was the same for every cube?" Level 1 has the sun and the shade; Levels 2 and 3 add the metal tray and the mitten. Children color the ice left at the start and at 10, 20, and 30 minutes, then circle where it melted fastest and slowest. Level 3 adds "The warmest place was ___. I know because ___."',
        watch: 'The class\'s results decide. Usually the ice in the sun melts fastest and the ice in the mitten slowest; the metal tray often melts its cube faster than the plain shade. The colored ice should shrink from box to box. On Level 3, the warmest place is usually the sun. If a child names the metal tray, ask: "Was the tray warmer, or did the metal move the warmth into the ice faster?" No answer key.',
      },
    },
    '2:melt-freeze-back': {
      title: 'Melt It, Freeze It Back',
      objective: 'Children warm an ice cube, a pat of butter, and a piece of chocolate in sealed bags in their hands or a sunny window, watch them melt, cool the ice in the freezer and the others in the refrigerator, and find each one turns solid again.',
      routine: 'Check your allergy list first. Put an ice cube, a pat of butter, and a square of chocolate each in its own zip-top bag and seal it. Children warm the bags in their hands or on a sunny windowsill and watch them melt; a sunny window melts butter better than hands. Then the ice goes in the freezer, and the butter and the chocolate go in the refrigerator until the next day. Keep the bags sealed: no tasting.',
      note: {
        mistake: 'Children think melted chocolate has become a new material, or that the ice disappeared when it melted. They think only ice can melt.',
        words: 'Say: "Warming can melt a solid into a liquid. Cooling can make it solid again. This change can go back." Ask: "What did the chocolate look like after the refrigerator?" Level 1 has the ice and the chocolate; Levels 2 and 3 add the butter. Children draw each one before, warmed, and cooled, and circle "it changed back" or "it did not." Level 3 adds "Warming made them ___. Cooling made them ___."',
        watch: 'All three changed back to solid, even if the shape changed. Drawings should show the solid, then a melted puddle or soft lump, then a solid again. On Level 3, accept "melt" or "soft" and "hard" or "solid again." No answer key.',
      },
    },
    '2:changes-cannot-undo': {
      title: 'Changes We Cannot Undo',
      objective: 'Children compare raw and cooked pairs the teacher prepared at home (a raw egg and a hard-boiled egg, bread and toast, cake batter and a cupcake, wet clay and fired pottery) and decide whether cooling could change each one back.',
      routine: 'Prepare the pairs at home; nothing is cooked in class. Children look at, touch, and smell each pair: a raw egg cracked into a sealed zip-top bag and a hard-boiled egg, bread and toast, cake batter and a cupcake, wet clay and a fired clay pot (a terracotta flowerpot is fired clay). No tasting, and wash hands after the raw egg. Then put the toast and the hard-boiled egg in the refrigerator overnight, and check the next day: they did not change back.',
      note: {
        mistake: 'Children think a refrigerator can undo any change, or that every change made by heating can go back. They see melting and cooking as the same kind of change.',
        words: 'Say: "Some changes can go back, like melting and freezing. Cooking and baking make something new that cannot go back." Say: "Melting used a little heat; cooking and baking used a lot of heat, and those changes stay." Level 1 has four pairs and Level 2 six: children circle "can change back" or "cannot change back." Level 3 adds "The changes that cannot go back all used ___." with a word bank (water, cold, heat).',
        watch: 'Right: ice and water, chocolate and melted chocolate, and butter and melted butter can change back; wet clay and a fired pot, cake batter and a cupcake, raw eggs and a cooked egg, and bread and toast cannot. Level 3: heat. No answer key.',
      },
    },
    '2:change-back-claim': {
      title: 'Can It Change Back? Make an Argument',
      objective: 'Children choose one change from the unit, write a claim that it can or cannot be reversed, and support it with what they saw in their tests.',
      routine: 'Children take out their pages from the melting and cooking lessons. Each child picks one change and tells a partner a claim with evidence: "I think the chocolate can change back, because I saw it get hard in the refrigerator." The partner asks, "How do you know?" Then the class sorts the claims on a chart under "can change back" and "cannot change back," with the evidence written beside each.',
      note: {
        mistake: 'Children give a reason that is not evidence ("because I think so," "because my mom said"). They use what they wish happened instead of what they saw in the test.',
        words: 'Say: "A claim is what you think is true. Evidence is what you saw that shows it." Ask: "What did you see in our test?" Children circle one change: ice melting, chocolate melting, an egg cooking, or bread toasting. Level 1: circle the claim and draw the evidence. Level 2: write the claim (cross out can or cannot), draw the test, and finish "My evidence: I saw ___." Level 3 adds a second piece of evidence and "How could you change it back?"',
        watch: 'Ice and chocolate melting can change back; an egg cooking and bread toasting cannot. Evidence must be something the child saw ("it got hard again," "the toast stayed toast"). On Level 3, the way back is cooling or freezing; for the egg and the toast, "It cannot change back." No answer key.',
      },
    },
    '2:plant-parts': {
      title: 'Plant Parts and the Parts We Eat',
      objective: 'Children name the parts of a plant and their jobs, then look at real carrots, asparagus, lettuce, broccoli, and tomatoes and decide which part of the plant each one is.',
      routine: 'Bring a carrot with its leafy top, asparagus spears, lettuce, broccoli, a tomato, and a pea pod; check your allergy list first. Children look, touch, and smell. The teacher cuts the tomato open and children open the pod to find the seeds. Then children sort the foods onto six paper plates labeled roots, stem, leaf, flower, fruit, and seed, and wash their hands afterward.',
      note: {
        mistake: 'Children think a tomato is a vegetable, so it cannot be a fruit; in science a fruit is the part that holds the seeds. They think broccoli is a leaf, though we eat its flower buds.',
        words: 'Say: "Roots take in water. The stem holds the plant up and carries water. Leaves make food from sunlight. Flowers make seeds. A fruit holds the seeds, and a seed can grow into a new plant." On Parts of a Plant We Eat, children circle the part of the plant we eat for eight foods. On Parts of a Plant and Their Functions, children read what each part does and write the number of its tag on the plant. Each page is one level.',
        watch: 'Right in the first copy of the foods page: the asparagus stem, the radish roots, the corn seed, the lettuce leaf, the carrot roots, the eggplant fruit, the cauliflower flower, and the spinach leaf. On the functions page in the first copy: grow into a new plant 2 (seed), make food 4 (leaf), take in water 5 (roots), hold the plant up 1 (stem), call bees 3 (flower). No answer key.',
      },
    },
    '2:plants-light-water': {
      title: 'Do Plants Need Light and Water?',
      objective: 'Children set up four cups of the same seedlings (light and water, light and no water, water and no light, neither), change only one thing per cup, and measure, draw, and describe the plants each week for three weeks.',
      routine: 'Plan ahead: about five weeks before this lesson, sow radish or bean seeds in four clear cups of soil. When the seedlings are up (about two weeks), label the cups A to D and place them: A in a sunny window and watered, B in the window with no water, C in a dark closet and watered, D in the closet with no water. Hand out the page, and once a week for three weeks, at morning meeting, children measure and record each cup. Day 1: look at the cups and the three weeks of records. Day 2: compare the cups and make the graph. Day 3: write the conclusion and share it.',
      note: {
        mistake: 'Children think the plant in the dark did best because it grew tallest. They change two things at once, or water the "no water" cup to be kind.',
        words: 'Say: "We change only one thing in each cup, so we know what made the difference." Read the page\'s note together: "A plant in the dark can grow tall and thin, but it turns pale and weak. Look at the color and the leaves, not only the height." Level 1 has cups A and B; children draw each plant each week. Level 2 has all four cups: each week children write the height in inches and circle green, pale, or brown or dry, then finish "Plants need ___ and ___ to grow well." Level 3 adds a bar graph of the final heights and "because."',
        watch: 'Usually cup A stays green and grows; cup B dries out and turns brown; cup C grows tall, thin, and pale; cup D dries out and turns pale. The sentence: light and water. The bars must match the final heights; if cup C is tallest, ask, "Is it the healthiest?" No answer key.',
      },
    },
    '2:seeds-on-the-move': {
      title: 'Seeds on the Move',
      objective: 'Children examine seeds that hook, fly, or are eaten, make a model of an animal\'s fur from a sock or felt, and test which seeds it carries away.',
      routine: 'Plan ahead: collect burrs, maple seeds, and acorns in the fall, and dandelion seed heads in spring, or use photos for any you cannot find. Day 1: each child pulls a fuzzy old sock over one hand as fur and pats it gently on each seed: which ones stick? Day 2: drop a maple seed and blow gently on a dandelion seed head: which ones fly? Look at cherries and their pits: animals eat the fruit and drop the seed. Day 3: sort the seeds by how they travel. Handle burrs gently, because they prick; nothing is eaten in class.',
      note: {
        mistake: 'Children think seeds just fall under the plant, or that seeds can walk. They think animals carry seeds on purpose, to help the plant.',
        words: 'Say: "A plant cannot walk, so its seeds travel. Some stick to fur, some fly on the wind, and some are eaten or buried by animals." Ask: "Why would a plant want its seeds to go far away?" Level 1: children draw their fur model and circle "stuck" or "fell off" for three seeds. Level 2 has six seeds, then children cut out the seeds and glue each in its box: sticks to fur, blown by the wind, or eaten or buried by animals. Level 3 adds "The animal helps the plant by ___."',
        watch: 'Right in the sort: the burr and the cleavers seeds stick to fur; the maple seed and the dandelion seeds are blown by the wind; the cherries and the acorn are eaten or buried by animals (squirrels bury acorns and forget some). The fur test is a record; the sort shows how each seed usually travels. Level 3: "carrying its seeds to a new place." No answer key.',
      },
    },
    '2:be-a-pollinator': {
      title: 'Be a Pollinator',
      objective: 'Children use a pipe-cleaner bee to pick up colored chalk dust from one paper flower and carry it to others, modeling how bees move pollen so that many flowers can make seeds.',
      routine: 'Make paper flowers of one kind (cupcake liners work well) and put a little crushed colored sidewalk chalk in the middle of each flower, a different color in each. Each child twists a fuzzy pipe cleaner into a bee and visits flowers one after another, touching the middle of each. Children watch the colors mix as the bee carries "pollen." Do not blow the chalk dust, and wash hands afterward.',
      note: {
        mistake: 'Children think bees visit flowers only to make honey, and that a flower makes seeds by itself. They think any flower\'s pollen works on any flower.',
        words: 'Say: "Pollen sticks to a bee\'s fuzzy body and rubs off on the next flower." Read the page together: "Our chalk is the pollen. A flower makes seeds only with pollen from a flower of the same kind." Level 1 has 2 sunflowers and Levels 2 and 3 have 4: children draw the bee\'s path from flower to flower and color the circle of each flower that got pollen from another flower with that chalk color, then draw yellow dots of pollen on one flower and write the word pollen. Level 3 adds "Many flowers need a visitor to make seeds because ___."',
        watch: 'The page records each child\'s path. The first flower the bee visits gets no pollen from another flower unless the bee comes back to it, so its circle can stay empty. Every later flower on the path got chalk from the flower before it, so its circle takes that color. Level 3: accept "the visitor carries pollen from another flower of the same kind." No answer key.',
      },
    },
    '2:life-cycles': {
      title: 'Life Cycles: From Egg to Grown-Up',
      objective: 'Children label the stages of a butterfly\'s life cycle and match young stages (a tadpole, a caterpillar, a chrysalis) to the animal they become, finding that some young look very different from their parents.',
      routine: 'If you can, order a classroom butterfly kit three to four weeks ahead, watch the caterpillars grow and make chrysalises, and release the butterflies only where that kind lives. If not, use photos. Hand out stage cards for the butterfly, the frog, and the ladybug, and have children act out each stage, then lay the cards in a circle for each animal on the floor.',
      note: {
        mistake: 'Children think a caterpillar and a butterfly are two different animals, and that a tadpole is a fish. They expect a young ladybug to look like a tiny ladybug, and call every chrysalis a cocoon.',
        words: 'Say: "Some young look very different from their parents. They change shape as they grow; scientists call it metamorphosis." On Label the Butterfly Life Cycle, children write the four stage names from the word bank under the pictures, then cross out the name that does not belong. On Metamorphosis: Which Animal Will It Become?, children write each stage\'s letter under the butterfly, the frog, or the ladybug; some boxes stay empty. Each page is one level.',
        watch: 'Right on the first page: egg, caterpillar, chrysalis, butterfly, and tadpole crossed out. On the second page in the first copy: A (the chrysalis) and G (the caterpillar) go to the butterfly; C, E, F, and H (the tadpole with legs, the eggs in the water, the froglet, the tadpole) to the frog; B (the pupa on a leaf) and D (the spiky larva) to the ladybug. A butterfly makes a chrysalis; a moth spins a cocoon. No answer key.',
      },
    },
    '2:habitats-adaptations': {
      title: 'Habitats and How Animals Adapt',
      objective: 'Children read how body parts help animals live in their habitat, match each sentence to its animal, and write a habitat report with three animals and a plant that live there.',
      routine: 'Set out "foods" in bowls (dry beans, pom-poms, and water in a cup) and "beaks" (clothespins, spoons, straws, and tongs). Pairs try each beak on each food for 30 seconds and see which beak works best for which food. Then the class talks about real animals: a hummingbird sips with a long beak, a duck scoops, a woodpecker drills. Nothing goes in mouths.',
      note: {
        mistake: 'Children think an animal grows a body part because it wants one. They say a camel\'s hump stores water; it stores fat. Some think a penguin is not a bird because it cannot fly.',
        words: 'Say: "An adaptation is a body part or a way of living that helps an animal live in its habitat." Ask: "How does this body part help the animal live where it lives?" On How Animals Adapt, children write the letter of the animal each sentence tells about; one animal is left over. On My Habitat Report, children draw three animals that live in the habitat shown, write their names and a plant that grows there, and circle wet or dry. Each page is one level.',
        watch: 'Right on the adapt page in the first copy: the penguin for flippers, the beaver for front teeth, the elephant for the trunk, the toucan for the huge beak, the woodpecker for drilling, and the camel for the hump; the orangutan is left over. On the report, the first copy shows the ocean: animals such as fish, a whale, an octopus, or a crab; a plant such as sea grass (accept seaweed); and "wet." No answer key.',
      },
    },
    '2:schoolyard-survey': {
      title: 'Schoolyard Survey: How Many Kinds?',
      objective: 'Children mark a square yard of lawn and a square yard of garden or ground under a tree with string, find and tally the different kinds of plants and animals in each, and compare which habitat has more kinds.',
      routine: 'Choose a warm, dry day in spring or early fall. A grown-up first checks each spot for poison ivy, fire ants, and bees, then marks two squares about 3 feet on each side with string and four craft sticks: one on the lawn and one in a garden bed or under a tree. Children look with magnifying glasses but do not touch spiders, bees, or ants. Day 1: the lawn square. Day 2: the garden square. Day 3: count the kinds, make the graph, and compare.',
      note: {
        mistake: 'Children count every ant as a new kind, so ten ants become ten kinds. They count only animals and forget the plants, or think nothing lives in a lawn.',
        words: 'Say: "A kind is one type of living thing. Ten ants are one kind." Ask: "Is this a new kind, or one we already counted?" Level 1: children draw each kind they find in each square and circle which square had more kinds (or "the same number"). Level 2: children tally the animals (ant, spider, ladybug, snail, other), check the plants (clover, grass, other), and write the number of kinds. Level 3 adds a bar graph and "The ___ had more kinds because ___." or the tie box.',
        watch: 'The number of kinds counts each animal and each plant once, however many were seen. Often the garden or the ground under a tree has more kinds than the lawn; real results decide. A tie is right when the counts are the same. The bars must match the kinds counted. No answer key.',
      },
    },
    '2:compare-habitats': {
      title: 'Compare Habitats: Desert, Rain Forest, Ocean',
      objective: 'Children use books and short videos to list the plants and animals of a desert, a rain forest, and an ocean, and compare how many kinds of living things they found in each.',
      routine: 'Set up three tables with library books or short videos: the desert, the rain forest, and the ocean. Small groups visit each table and add a sticky note for each living thing they find, drawn or named, to that habitat\'s class chart. Then the class counts the kinds on each chart and talks about the differences.',
      note: {
        mistake: 'Children think deserts have no life, that any forest is a rain forest, and that the ocean has only fish. They leave the plants off their lists.',
        words: 'Say: "Each habitat has its own kinds of plants and animals. Some habitats have many more kinds than others." Ask: "Which chart is longest? Why might that be?" Level 1: children cut out nine picture cards and glue each under desert, rain forest, or ocean. Level 2: children draw or write five living things for each habitat from the class books, then circle the habitat with the most kinds. Level 3 adds two comparison sentences.',
        watch: 'Right on Level 1: the meerkat, the camel, and the cactus live in the desert; the monkey, the toucan, and the tree frog in the rain forest; the whale, the starfish, and the octopus in the ocean. On Levels 2 and 3, the class\'s books decide; rain forests usually have the most kinds. Accept any true comparison sentence. No answer key.',
      },
    },
    '2:plants-for-habitats': {
      title: 'Plants for Every Habitat',
      objective: 'Children observe a cactus, a fern, and a water plant (or photos of them), describe their stems and leaves, and match each plant to the habitat where it grows best.',
      routine: 'Bring a small potted cactus, a potted fern, and a water plant from a pet store in a jar of water, or photos. Children look closely with magnifying glasses and describe the stems and leaves; they look at the cactus but do not touch its spines. Float a leaf from the water plant and lay a fern frond beside a cactus to compare. Talk about where each plant would grow best.',
      note: {
        mistake: 'Children think the cactus has no leaves; its spines are its leaves. They think every plant needs lots of water, or that a water lily lives without roots.',
        words: 'Say: "A plant\'s parts help it grow where it lives." Ask: "How does this part help the plant live there?" Level 1: children draw a line from each plant (cactus, water lily, fern) to where it grows best: a desert, a pond, or a shady forest floor. Level 2 adds circling the part that helps each plant grow there. Level 3 adds one sentence for each plant.',
        watch: 'Right: the cactus grows in the desert, with "a thick stem that holds water"; the water lily in the pond, with "leaves that float"; the fern on the shady forest floor, with "big leaves to catch a little light." The water lily\'s roots are in the mud at the bottom of the pond. On Level 3, accept a sentence that names the part and its job. No answer key.',
      },
    },
  },
};
