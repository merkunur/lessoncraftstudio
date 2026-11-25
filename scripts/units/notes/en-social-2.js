'use strict';
/**
 * Teacher notes, English, social studies: the 20 lessons of the five Grade 2 social studies units (Daily Teaching
 * System, Stage D-3, 2026-11-25): Our Class and Our Community; Maps and Our World; Communities Near and Far; History of
 * Our Community; Producers, Consumers and Money (design scripts/units/year/design.en.social.json, grade 2). Each note was
 * written from the pages the lesson hands out, read at every level: the new pages G2-614 to G2-630 from their text dump,
 * sheets and bank (lcs-stage-d/batch-s2; types/_shared/dk-social-2.js, data/social/dk-social-2.js) as the builder left
 * them (BATCH-S2-RESULT.md: "a pet chasing children" and "trash on the ground", "Nature changed this place." / "People
 * changed this place.", the sandbags in both flood pictures and its three changes, "Gulf coast", the drawn 1910 street
 * that is the same on every copy, the three days of Two Stories, the four sample towns and their "Because of" clue,
 * 20 cents a cup and "brings in more than they must pay", G2-630 built from the market routine) and AS FIXED in review
 * round 1 after the US Grade 2 teacher's page review (BATCH-S2-RESULT.md "Review round 1", FIX-BRIEF-1.md: "Use each
 * letter one time.", "one state" and "Our state is ___.", "The ___ helps ___.", the tree pair in place of the sea ice,
 * "A town before the flood" and the helpers seated in the boat, "the country where it began" and Las Posadas "a December
 * tradition from Mexico", "One thing in our classroom", the arrow direction in the trade instruction, wood chips and
 * Leo on his dad's shoulders, one early car, "the sentence that says the town grew and tells why", the worker on every
 * tools-and-skills card and "The baker uses ___ to make more bread because ___.", "At ___ a cup, they have $___ left
 * over.", "I saved $100. The bank added $1." and the banker holding the money out) and its teacher-talk lines, then as
 * fixed in round 2 ("A hill in winter and in spring: the trees grow new leaves.", the G2-627 tools "a … to …" in the
 * worker's hand and skills of varied shapes with "the steps to make bread", no paper in a thought bubble, "next to each
 * picture") and after the teacher's review of these notes (batch-s2/REVIEW-NOTES.tsv); the published pages
 * G2-369, G2-371, G2-370 and G2-362 from their generators and fresh renders (lcs-stage-d/notes-s2). Where a lesson hands
 * out two pages, the note describes each, the first as the main page. Pictures and items that change from copy to copy
 * are named as the pool they come from; a quoted sentence is one every copy prints, or is marked as one copy's.
 * Every lesson has its routine (`routine`), printed under "What the class does". Class market day is teacher-led over
 * three sessions: its routine is the lesson, and the page is the shopper's record.
 * Kind and plain: no child is asked to tell about home or family; sharing a tradition is a choice, and a child with none
 * to share is fine; disasters are about getting ready and helping, calmly; two accounts differ in what each person saw,
 * never in who is right; a child may pass.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 1,850 letters in all, the routine included,
 * about 1,450 for a lesson with two pages.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '2:class-agreement': {
      title: 'Our Class Agreement',
      objective: 'Children each write the class rule they think matters most and why, read a partner\'s rule and reason, show how the two views are alike and different, and help write a class agreement everyone signs.',
      routine: 'Day 1: ask, "Which class rule matters most to you, and why?" Model it: "I think listening matters most because it helps us learn." Partners take turns ("I think ___ because ___."), then each says back the other\'s view; with an odd number, make one group of three. Fill two overlapping circles on chart paper with one pair\'s ideas. Day 2, after the page: pairs read their sentences, the class picks four or five, writes them as "We will ___," and everyone signs with a name or a mark.',
      note: {
        mistake: 'Children write their partner\'s rule as their own, or write the reason where the rule goes. They leave "Both of us" empty when the two rules differ, or think a different view is a wrong one.',
        words: 'Say: "Two people can see one thing in different ways. A view is what you think, and why." Day 2, the page. Level 1 shows four of six numbered rules (walk in the hallway, be kind to others, take turns, keep your hands to yourself, listen when others talk, clean up after yourself; they change from copy to copy): the child writes a rule\'s number and a word from the box (learn, feel safe, play, be friends, get along) for "It helps us ___," the same for the partner, and a word in each part of the circles; partners share one copy, since the numbers change. Level 2: both views written out, rule and "because." Level 3 adds "Our class agreement: We will ___ and we will ___."',
        watch: 'There is no wrong answer: every rule, reason, and circle is the child\'s own. Look for the partner\'s view as said, and something in "Both of us": the same rule or a shared reason. On Level 3, a strong sentence holds both ideas: "We will listen when others talk and we will take turns." No answer key.',
      },
    },
    '2:community-laws': {
      title: 'Laws in Our Community',
      objective: 'Children read community laws (stop at a red light, keep dogs on a leash in the park, do not litter, wear a helmet on a bike), match each law to the problem it stops, and tell in a sentence why a community needs that law.',
      routine: 'Show photos of signs near school (or pictures of signs): a stop sign, a traffic light, a "no littering" sign, a dogs-on-leash sign. Say: "A rule is for one place, like our class. A law is for everyone in a community, and the government makes it." Use toy cars at a paper corner, a stuffed dog, and scrap paper on the floor: show a problem, and the class names the law that would stop it.',
      note: {
        mistake: 'Children think laws are only for grown-ups, or only for punishing people.',
        words: 'Say: "A law stops a problem before it happens." Ask: "What could happen if no one stopped at red lights?" Day 2, the page: the lettered problems are at the top, and the letters change order from copy to copy: read them first. Each law has a picture of people keeping it: a car stopped at a red light, a dog on a leash, a child dropping a wrapper into a trash can, a child with a helmet by a bike. Read each law aloud; children write a letter after "It stops problem." Level 1 has two laws and two problems. Level 2 has four of each and "Use each letter one time." Level 3 adds "The law: ___ Our community needs this law because ___."',
        watch: 'Right: red light, crashes at corners; leash, a pet chasing children; litter, trash on the ground; helmet, a hurt head. Check the letters on that copy. A child who says the red light also stops a hurt head thinks well: ask, "Which problem does it stop most?" With each letter used one time, the helmet takes the hurt head. Say: "In many towns and states children must wear a helmet by law. Is it a law where we live?" Ask the same about the leash. On Level 3, any true reason is right ("so cars do not crash"). No answer key.',
      },
    },
    '2:levels-of-government': {
      title: 'Local, State and National Government',
      objective: 'Children learn that a government is the people who make laws and run services for a place, sort leaders into local (the mayor, the city council), state (the governor), and national (the president, Congress), and write one job of each level.',
      routine: 'Draw three boxes inside each other on chart paper, the biggest outside: our country, our state, our town or city. Write the leaders in each: the president and Congress; our governor; our mayor (or our town\'s leader) and our city or town council. Say their names plainly, without opinions. Say: "Congress and the city council are groups chosen by voters. They make laws." Ask: "Who makes laws for the whole country?" Children hold up a card: local, state, or national.',
      note: {
        mistake: 'Children think the president is in charge of everything, even our town\'s parks. "Congress" and "city council" are new words, so children guess where they go. Some mix up our state and our country, because both are maps.',
        words: 'Say: "Each level takes care of a bigger place: our town or city, our state, our whole country." Day 2, the page: read the definition at the top aloud. Only the words on the leader cards tell who is who; no card is a real person. The boxes nest: our town (a town hall) inside our state inside our country. The state picture, "one state," is Colorado; children write ours on "Our state is ___." Write each leader in the smallest box it fits: the mayor goes in the town box. Level 1 has three leaders, Level 2 all five, and Level 3 all five and "One job of each level: Local: ___ State: ___ National: ___"',
        watch: 'Right: the mayor and the city council, local; the governor, state; the president and Congress, national. On Level 3, any true job is right: "The mayor leads our city." "Congress makes laws for our country." A town council or another town leader counts as local. No answer key.',
      },
    },
    '2:government-services': {
      title: 'Services Our Government Provides',
      objective: 'Children find the services a government provides in a picture of a town (a library, a park, a fire station, road repair, a public school, a mail carrier), tell them apart from businesses (a toy store, a pizza shop), and write who each service helps and why it helps everyone.',
      routine: 'Show photos of our town: a library, a park, a fire station, a mail carrier, a road being fixed, and a few stores. For each, ask: "Is it for everyone? Who pays for it?" Say: "Everyone helps pay for government services with taxes. A business sells things to make money." Make a T-chart, "Government service" and "Business," and add places children know. Ask: "Who uses the library?"',
      note: {
        mistake: 'Children circle every building, even the stores and the homes, or think a service is something you buy. They miss the mail carrier, who has no sign, and think the school is not a service because they go there every day.',
        words: 'Say: "A government service is work the town, the state, or the country does for everyone." It is printed at the top. Day 2, the page: one town with signs (SCHOOL, PARK, LIBRARY, FIRE STATION, ROAD WORK, TOY STORE, PIZZA). A mail carrier at a mailbox has no sign; the yellow house is a home: no circle. Level 1 has four of the six services and one store, circle only. Level 2 has all six and both stores, then "The ___ helps ___." twice. Level 3 adds "This service: ___ It helps everyone because ___."',
        watch: 'Right: circle the school, park, library, fire station, road work, and mail carrier (each one the page shows), not the toy store or the pizza shop. "The library helps kids who want books" is right, as is any true answer. On Level 3: "The fire station helps everyone because firefighters come to any home." A public school is run by the local school district; mail carriers work for the U.S. Postal Service, part of our national government. No answer key.',
      },
    },
    '2:cardinal-directions': {
      title: 'North, South, East and West',
      objective: 'Children label the four directions on compass roses, use them to find places on a map, and give a partner directions across the classroom.',
      routine: 'Find north with a compass app and tape N, E, S, W signs on the four walls. Children face north and point as you call each direction. Teach the order clockwise from north: "Never Eat Soggy Waffles." Partners give each other directions across the room ("Walk 4 steps north, then 3 steps east."), and the class checks the walk.',
      note: {
        mistake: 'Children mix up east and west. They think north always means up, at the top of the page, so they write N at the top of every rose, even a turned one.',
        words: 'Say: "The orange tip points north. Start there and go clockwise: N, E, S, W." Page 1: Level 1 has four upright roses, one letter given, the four words below; Level 2 six roses, three of them turned; Level 3 six, all turned. Page 2: an island map with a key. In each row, start at the first picture, look the way the word says, and circle the picture that lies that way (two choices on Level 1, three on Levels 2-3; Level 3 has only a north arrow).',
        watch: 'Right on Page 1: when the orange tip points right, east is at the bottom, south on the left, west on top. On Page 2, the right picture lies straight that way; the others lie off to the side. No answer key.',
      },
    },
    '2:continents': {
      title: 'The Seven Continents',
      objective: 'Children find and label the seven continents on a world map, find them again on the class globe with the oceans between them, and point to North America, the continent where the United States is.',
      routine: 'Turn the class globe slowly. Say: "A continent is a very big piece of land. There are seven." Children find each one on the globe and touch the oceans between them: the Pacific, the Atlantic, the Indian, the Arctic, and the Southern Ocean. Chant the seven names together. Then everyone puts a finger on North America and finds the United States in it: "This is where we live."',
      note: {
        mistake: 'Children think a country is a continent, so they call the United States one, or think every island is its own continent. They mix up North and South America, and look for a sea between Europe and Asia.',
        words: 'Say: "Europe and Asia are one big piece of land. The dashed line on the map shows where people divide them." The page says Oceania: Australia and the islands near it. Many US books call this continent Australia; tell the class both names. Each continent has a number, and the numbers change from copy to copy: children write each name on the line with that number. Level 1 has the word box and two names already written, Level 2 the word box and all seven to write, and Level 3 no word box.',
        watch: 'Right: each line names the continent that carries its number on that copy: North America, South America, Europe, Asia, Africa, Oceania, Antarctica. "Australia" for Oceania is right too. Antarctica runs along the bottom of the map. Accept a name copied with small slips when it names the right land. No answer key.',
      },
    },
    '2:places-change': {
      title: 'How Places Change',
      objective: 'Children compare before-and-after pictures of places that change (a hill whose trees grow new leaves in spring, a desert after a rare rain, a fishing village that became a city), circle whether nature or people changed each place, and write why it changed.',
      routine: 'Show two pictures of one place near school, then and now (from the library or historical society, or the schoolyard in two seasons). Ask: "What changed? Who or what changed it?" Make a chart, "Nature changed it" and "People changed it," and sort what children name: snow melting, leaves falling, a new building, a garden. Then look outside for one change of each kind.',
      note: {
        mistake: 'Children think a garden or a neighborhood grew by itself, because plants grow, or that the city was always there. Some think time made the change, because "long ago and today" comes with both kinds.',
        words: 'Say: "Sometimes nature changes the land: sun, rain, ice, and waves. Sometimes the way people live changes it: they build and plant." Day 2, the page: read each sentence aloud; it tells when and what changed, and only the garden\'s says who (the neighbors). The pairs change from copy to copy: a hill whose trees grow new leaves in spring, a desert in bloom, a pond whose ice melts, a beach where the waves washed sand away; a fishing village that became a city, a field that became a neighborhood, an empty lot where neighbors planted a garden. Level 1 has two pairs, circle only. Level 2 has three and "It changed because ___." Level 3 adds a box to draw a place near our school that has changed, with "It changed: ___ It changed because ___."',
        watch: 'Right, nature: the hill, the desert, the pond, the beach. People: the village, the field, the garden. A good "because" names the cause: "spring came," "neighbors planted it." On Level 3, any real change near school is right: a new playground. No answer key.',
      },
    },
    '2:disaster-ready': {
      title: 'When Disaster Strikes',
      objective: 'Children learn how a flood, a hurricane, or an earthquake can affect a place (roads, homes, power, schools), find on a U.S. map the Atlantic and Gulf coasts where hurricanes most often come ashore, and list ways families get ready and neighbors help.',
      routine: 'Keep it calm and about getting ready. Ask: "What kinds of big storms happen where we live?" Pull from a backpack what a family might keep in an emergency kit: water, a flashlight, canned food, a first-aid kit. Practice your school\'s drill for your area (for an earthquake: drop, cover, and hold on). Ask: "How can neighbors help?" (check on an older neighbor, share food, fill sandbags). Some children may have lived through a flood, a fire, or a storm: they share only if they want.',
      note: {
        mistake: 'Children think floods happen only by the ocean. On the page, they circle the sandbags or the neighbors, but those are in both pictures: they were put out before the rain.',
        words: 'Say: "We can\'t stop a storm, but we can get ready, and neighbors help each other." Day 2, the page: one town, not ours, before the flood (rain is coming; sandbags line the houses) and after; every copy shows the same town and the same changes. Level 1 is the two pictures: circle the 3 things the flood changed. Level 2 adds the family emergency kit: seven things in pictures and words (a radio and medicine among them); children draw or write any 4 in the boxes. Level 3 has the kit as words, a U.S. map with three coasts to color, and "Neighbors can help by ___."',
        watch: 'Right: three circles on the after picture: the water over the road, the CLOSED sign, the boat with two helpers in life vests. Any 4 kit things are right. Color the Atlantic and Gulf coasts, not the Pacific; the page says "Gulf coast," so name the gulf the way your class map does. "Neighbors can help by" any kind act: "checking on each other." No answer key.',
      },
    },
    '2:winter-traditions': {
      title: 'Winter Traditions Families May Keep',
      objective: 'Children read about winter traditions families may keep (Hanukkah, Christmas, Kwanzaa, Las Posadas, Lunar New Year), match each to its symbol, find on a world map the country where it began, and share a tradition from their own family if they wish.',
      routine: 'Day 1: introduce all five, each with its symbol, and find Mexico, the United States, and China on the globe. Day 2: the page. Invite, never ask: "If you want to, tell us about a tradition you know." Every family\'s tradition counts, many keep none of these, and a child may pass. Never ask a child to explain a family\'s religion.',
      note: {
        mistake: 'Children mix up the menorah and the kinara, because both hold candles: count them (nine and seven). They think everyone keeps Christmas, or that a tradition must be a holiday.',
        words: 'Say: "A tradition is something a family or a group does again and again, often every year." Facts: a Hanukkah menorah holds eight candles and a helper candle, set higher or apart (in the middle on the page); a kinara has seven candles, three red, one black, three green; Las Posadas, from Mexico, is nine nights, December 16 to 24; at Lunar New Year, families give red envelopes with a little money for good luck. Day 2: read each sentence aloud. Level 1 has three traditions and a box to draw one "if you want to." Level 2 has all five and "If you want to share: a tradition I know is ___." Level 3 has all five and a world map: a line from three names to the country where each began.',
        watch: 'Right: Hanukkah, the menorah; Christmas, the tree; Kwanzaa, the kinara; Las Posadas, the piñata; Lunar New Year, the red envelope. On the map: Lunar New Year, China; Kwanzaa, the United States; Las Posadas, Mexico (not Brazil or India). Lunar New Year is also kept in Vietnam, Korea, and many US cities. The drawing box and the sharing line are choices: an empty box is fine. No answer key.',
      },
    },
    '2:where-it-comes-from': {
      title: 'Where Does It Come From?',
      objective: 'Children read sample labels on everyday things (bananas grown in Ecuador, avocados grown in Mexico, a T-shirt made in Vietnam, coffee beans grown in Colombia), find each country on a world map, and draw a line from it to our country to see how buying things connects us to faraway people.',
      routine: 'Bring a few things with labels: a banana with its sticker, a T-shirt tag, a box of crayons, a pencil. Read each label aloud: "Grown in ___" or "Made in ___." Find the country on a world map and stretch a piece of yarn from it to a star on our state. Ask: "Who grew or made this? How did it get here?" (by ship, truck, or plane). Before the page, find one or two things in the room whose label names a country (a crayon box, a tissue box) for everyone to use; at home only if a child wants to.',
      note: {
        mistake: 'Children think things are made at the store. On the map they circle the country\'s name box instead of the land the name points to.',
        words: 'Say: "A label tells where a thing was grown or made. When we buy it, we are connected to the people who grew it or made it." Day 2, the page: name each picture and read its label ("Label: grown in Ecuador"). The map names ten countries; each name sits in a box near its land, often with a short line to it. Circle the land, then draw a line from it to the star, the United States. Level 1 has two of the four things (never bananas with coffee), and their countries are outlined in orange. Level 2 has all four, found by name. Level 3 adds "One thing in our classroom: ___ Its label says it came from ___."',
        watch: 'Right: bananas, Ecuador; avocados, Mexico; the T-shirt, Vietnam; coffee beans, Colombia; each country circled, with a line to the star. These are sample labels: a real banana may say Guatemala or Costa Rica. On Level 3, any real label in the room is right ("crayons, made in the USA"). No answer key.',
      },
    },
    '2:made-here-sold-there': {
      title: 'Made Here, Sold There',
      objective: 'Children sort products into those made in other countries and sold in the United States (bananas, cocoa beans, coffee) and those made in the United States and sold in other countries (airplanes, soybeans, corn), and give one example of each.',
      routine: 'Draw a U.S. map on the board with two big arrows: one pointing in ("Made in other countries, sold here") and one pointing out ("Made here, sold in other countries"). Hold up real things or pictures: a banana, a bag of coffee, an ear of corn, cocoa beans, a toy airplane. Ask: "Where was it grown or made? Which way does it travel?" Tape each in its arrow. Say: "Chocolate is made from cocoa beans. We sell a lot of corn, soybeans, and airplanes to other countries."',
      note: {
        mistake: 'Children think "made here" means made in our town. They put corn in the "sold here" arrow because they buy corn at the store, or think everything we eat grows in our country.',
        words: 'Say: "Some things come into our country from far away. Some things made here go out to other countries." Day 2, the page: each card has a picture, the thing\'s name, and one fact that tells where it grows or is made: read the facts aloud. Children write each thing\'s name on a line in the right arrow. The U.S. map is in the middle; the small globe stands for other countries. Level 1 has four of the six cards (the mix changes from copy to copy), Level 2 all six, and Level 3 all six and "The United States sells ___ to other countries." and "The United States buys ___ from other countries."',
        watch: 'Right, made in other countries, sold here: bananas, cocoa beans, coffee. Made here, sold in other countries: airplanes, soybeans, corn. On Level 3, any of those three in each sentence is right. A child who says some coffee grows in Hawaii is right: "Most of ours comes from other countries." The United States buys and sells many other things too. No answer key.',
      },
    },
    '2:why-countries-trade': {
      title: 'Why Countries Trade',
      objective: 'Children study three islands that each make something another island needs (fruit, fish, wool), draw the trades that let every island have food and warm clothes, and write why countries trade goods with each other.',
      routine: 'Make three island groups: Sunny Island gets paper fruit cards, Cold Island fish cards, and Hilly Island wool cards (yarn taped on paper). Tell each group what it needs: Sunny needs fish, Cold needs wool for warm clothes, Hilly needs fruit. Each group gives its cards to the island that needs them. Ask: "Could each island get what it needs alone? What did trading do?" Then: "Countries trade for the same reason."',
      note: {
        mistake: 'Children draw an arrow from the island that needs a thing instead of from the island that has it. On Levels 2 and 3 they look for two islands that swap, but these trades go around in a circle.',
        words: 'Say: "Each island gives one thing and gets one thing. Trading lets everyone have what they need." Day 2, the page: read each island\'s line ("Sunny Island has fruit and needs fish."); the person on each island thinks of what it needs. The instruction says it: draw each arrow from the island that has the thing to the island that needs it. The islands\' places change from copy to copy. Level 1 has two islands that trade fruit and fish, Level 2 three islands, and Level 3 three islands and "If Cold Island could not trade, ___."',
        watch: 'Right on Levels 2 and 3: fish from Cold Island to Sunny Island, fruit from Sunny Island to Hilly Island, wool from Hilly Island to Cold Island. On Level 1: fish from Cold Island to Sunny Island, fruit from Sunny Island to Cold Island. "Countries trade because" any true reason: "they need things other countries have." On Level 3, "it would have no wool for warm clothes" is right. No answer key.',
      },
    },
    '2:family-relationships': {
      title: 'Aunts, Cousins and Grandparents',
      objective: 'Children solve riddles about family relationships (my mom\'s sister is my aunt), place each relative in the right generation of a family tree, and remember that families come in many shapes.',
      routine: 'On chart paper, draw a three-row tree for a storybook family: grandparents; Mom, her sister, Dad, his brother; a child and a cousin. Read a riddle ("My mom\'s sister is my ___."); a child finds Mom, then her sister, and tapes on the card: aunt. Ask: "Which row is she in?" Say: "This is one family. Families come in many shapes." Never ask children to tell about their own family.',
      note: {
        mistake: 'Children read only the last word: "mom\'s brother" becomes "brother." They mix up grandpa and uncle (Mom\'s dad and Mom\'s brother), or call a cousin a brother or sister.',
        words: 'Say: "Read a riddle in two steps: first find Mom, then find her brother." Day 2, the page has riddles only; the tree is the class chart. It names one starred child (the name changes from copy to copy). Every riddle asks about that child ("Eli\'s mom\'s mom is Eli\'s ___."), and a word can answer two riddles. Level 1 has six riddles about grandparents, aunts, and uncles, with a word box. Level 2 has eight with a word box; most copies include cousins. Level 3 has eight with cousins ("an aunt\'s son") and no word box.',
        watch: 'Right: Mom\'s or Dad\'s mom, grandma; Mom\'s or Dad\'s dad, grandpa; Mom\'s or Dad\'s sister, aunt; Mom\'s or Dad\'s brother, uncle; an aunt\'s or an uncle\'s son or daughter, cousin. "Grandmother" or "grandfather" is right too. On the tree, aunts and uncles are in the parents\' row and cousins in the children\'s row. The page has an answer key.',
      },
    },
    '2:two-accounts': {
      title: 'Two Stories of the Same Day',
      objective: 'Children read two short accounts of the same event (the day a new library opened, told by a child and by the librarian), mark what both say and what only one says, and explain why two people can tell one event differently.',
      routine: 'After something the class shared (recess, an assembly, a class walk), tell it in four short sentences, and have a child (or a puppet that "watched") tell the same event in four; write the two side by side on chart paper. Children underline in blue what both told and in orange what only one told. Ask: "What was each of us doing?" Say: "Neither story is wrong."',
      note: {
        mistake: 'Children think that when two stories differ, one person is wrong. They underline in blue only the exact same words, and miss one fact said two ways (on the library day: "Lots of people came." and "Many people came.").',
        words: 'Say: "Two people can tell about the same day. Each tells what they saw, so the stories can differ, and both can be true." Day 2, the page: each story has its teller\'s picture and name. The day changes from copy to copy: a new library opens (Ava and Ms. Lin, the librarian), a town parade (Leo and Mr. Diaz, a drummer), a new playground opens (Sam and Ms. Cole, a park worker). Children need a blue and an orange crayon. Level 1 has four sentences a story: find one thing both say and one thing only one says. Level 2 has five a story: underline every sentence. Level 3 adds "They noticed different things because ___."',
        watch: 'Right, blue: what both tell, in their own words: the day it happened, that many people or kids came, the puppet show, the band, the fire truck, the sunny day. Orange: what only one tells (going with Grandpa, a heavy drum, checking every bolt). Underlining a shared fact in both stories is right. On Level 3, a strong reason names what each was doing: "Sam was playing, and Ms. Cole was working." No answer key.',
      },
    },
    '2:old-photo-questions': {
      title: 'Questions About an Old Photograph',
      objective: 'Children look closely at an old photograph of a main street with a horse and wagon, early cars, a streetcar, and shop signs, list what they see, and write questions the photograph makes them ask about how the town has changed.',
      routine: 'Show a printout of an old photo of our own town\'s main street from your library\'s or historical society\'s website (or, if none is found, the page\'s drawing). Make a three-column chart: I see, I think, I wonder. Children first name only what is in the photo, then what it tells about life then, then questions ("Where did people leave their horses?"). Ask: "How could we find out?"',
      note: {
        mistake: 'Children write what they think under "I see" ("People were poor."), or ask a question the photo already answers. Some think the world was gray long ago because old photos are black and white.',
        words: 'Say: "Historians look closely first, then think, then wonder." Day 2, the page: every copy shows the same drawn street, "Main Street, about 1910": a hardware store, a bank with columns, a streetcar on rails under its wire, a horse pulling a wagon, an early car, and people in long coats and hats. Say: "This is a drawing made to look like an old photo." Level 1: circle the five things in the list (a streetcar, an old car, a horse and wagon, the bank, a man in a hat) and finish "I wonder why ___?" Level 2: I see (two things), I think, and I wonder (two questions). Level 3: three questions and "How could we find out? We could ___."',
        watch: 'There is no wrong answer when the child writes what the photo shows and asks real questions. On Level 1, one circle on each of the five things (any man in a hat). A strong "I think" uses a clue: "People rode in wagons, so there were not many cars." A strong question asks about change: "Why is there no streetcar now?" On Level 3: ask a librarian or an older person, look in a book. No answer key.',
      },
    },
    '2:why-town-changed': {
      title: 'Why Did the Town Change?',
      objective: 'Children read a short history of a sample town (a railroad station opened, then new stores and houses were built), choose which reason most likely explains why the town grew, and give the clue from the text that supports their choice.',
      routine: 'Write two sentences on the board: "Our class got a new reading corner. Because of the reading corner, more children read at recess." Ask: "Why did more children read? Which sentence tells us?" Underline "Because of." Then ask: "What could make a town grow?" (a new road, a bridge, a railroad, jobs). If you can, show when a road, a railroad, or a factory came to our own town.',
      note: {
        mistake: 'Children pick the reason they like best (such as "People liked the weather.") instead of the one the story tells. They copy the first sentence, or one that names the railroad or the bridge but not the growth.',
        words: 'Say: "A historian picks the reason the clues show." Day 2, the page: the town and its story change from copy to copy (Oak Bend and a railroad, Mill River and a bridge, Pine Hill and a shoe factory, Sandy Creek and a highway), with pictures of the town at first and later; the towns are made up. Read the story aloud, then each reason. Children circle one reason and copy "the sentence that says the town grew and tells why." Level 1 has two reasons, Level 2 three, and Level 3 three and "___ is less likely because ___."',
        watch: 'Right: the reason the story names (the railroad came, a bridge was built, a factory opened, a highway was built), and the sentence to copy is the one that starts "Because of." If a child copies a sentence that only names the railroad, the bridge, the factory, or the highway, ask: "Does it tell that the town grew?" On Level 3, any reason that uses the story is right: "It snowed a lot is less likely because the story never says it snowed." No answer key.',
      },
    },
    '2:tools-and-skills': {
      title: 'Tools and Skills for the Job',
      objective: 'Children sort what producers need into tools and machines (an oven, a tractor, a drill) and skills learned through school and practice (the steps to make bread, a good time to plant seeds), and explain how both help a worker make more and better goods.',
      routine: 'Give two teams three minutes to make strips for a paper chain: one tears paper by hand, the other uses scissors and a ruler. Compare: "Which team made more? Which strips are better? Why?" Then ask: "Would the scissors help if you had never learned to cut on a line?" Lay two hoops on the floor, "Tools and machines" and "Skills," and sort cards: a mixer, a tractor, a hammer; the steps to make bread, a good time to plant seeds, a good way to measure wood.',
      note: {
        mistake: 'Children think a skill is something you can buy or hold, and color a card blue because its bubble shows a thing (a cow, a loaf, bricks): the bubble is what the worker knows.',
        words: 'Say: "A tool or machine is a thing a worker holds or uses. A skill is something a worker knows, learned at school and by practice." Day 2, the page: children need a blue and an orange crayon. The worker is on every card: holding a tool in hand, or thinking, with a thought bubble, for a skill. Read each card aloud, then color its box. Level 1 has one worker (a baker, a farmer, or a builder; it changes from copy to copy) and four big cards. Level 2 has all three workers, twelve cards. Level 3 adds, with an oven or a mixer always in the baker\'s row: "The baker uses ___ to make more bread because ___."',
        watch: 'Right, blue: the oven, mixer, rolling pin, whisk, tractor, watering can, shovel, wheelbarrow, drill, hammer, saw, and ladder. Orange: every card with a thought bubble. On Level 3: "The baker uses a mixer to make more bread because it mixes dough faster than hands." Ask: "How does practice help a baker make better bread?" No answer key.',
      },
    },
    '2:cost-to-make': {
      title: 'What Does It Cost to Make?',
      objective: 'Children plan a lemonade stand, list what they must pay for before they can sell anything (lemons, sugar, cups, a sign), add the costs, and find the lowest price per cup that brings in more than the costs.',
      routine: 'Plan a pretend class lemonade stand. Ask: "What must we buy before we can sell anything?" List the things on the board with sticky-note prices in whole dollars and add them. Then count with play dollars: "If we sell 10 cups at $1 a cup, how much comes in? At 50 cents a cup?" (two cups make a dollar). Ask: "Which price brings in more than we paid? What is left over?"',
      note: {
        mistake: 'Children circle the kite or the ball, or add every price on the list. They think all the money that comes in is left over. At 50 cents a cup they write $500 (or $50) for 10 cups: 500 cents is $5.',
        words: 'Say: "Before you sell, you pay for what you need. That is the cost." Day 2, the page: read the story aloud. The price list also shows things they do not need (a kite, a ball). Children circle what they must buy, write its prices, and add. Then they find what 10 cups bring in at each price: at 50 cents, 2 cups make a dollar; at 20 cents, count by 20s (20, 40 ... 200 cents is $2). Level 1: three costs and two of the three prices, with a hint. Level 2: four costs, three prices. Level 3 adds "Choose a price that brings in more than they must pay. At ___ a cup, they have $___ left over. I chose it because ___."',
        watch: 'Right: lemons, sugar, and 10 cups (and poster paper for a sign on Levels 2 and 3), never the kite or the ball; the sum of their prices on that copy; 10 cups bring in $10 at $1 a cup, $5 at 50 cents, $2 at 20 cents; the lowest price that brings in more than the sum. On Level 3, left over is what comes in minus the costs; any price that brings in more, with a reason, is right (costs of $4: "At 50¢ a cup, they have $1 left over."). No answer key.',
      },
    },
    '2:what-banks-do': {
      title: 'What Banks Do',
      objective: 'Children learn that a bank keeps people\'s money safe, pays savers a little extra called interest, and lends money to people who need it, then match each sentence to the picture that shows it.',
      routine: 'Set up a pretend bank: a desk, a shoebox vault, and play dollars. A child saves 100 dollars; the banker writes it down and puts it in the vault. Say: "After a year, the bank pays a little extra for saving: that is interest." Add 1 dollar. Then a pretend family borrows money from the same vault to fix a roof: "The bank lends some of the money people saved. That is why the family must pay it back, and the saver can still take money out." Never ask about a child\'s family money.',
      note: {
        mistake: 'Children think the bank keeps each person\'s own bills in a box with their name, or that borrowed money is a gift. Some think interest is money you pay the bank for saving, the other way around.',
        words: 'Say: "A bank keeps money safe, pays savers interest, and lends money." Day 2, the page: name each picture first: a child gives money to the teller, with the round vault door behind; a savings paper (I saved $100; The bank added $1; Now I have $101), the word "interest" not printed; a banker holding money out to a parent, who thinks of their roof being fixed. Read the sentences aloud; children copy the right one next to each picture. Level 1 has two of the three pictures and their two sentences, Level 2 all three, and Level 3 all three and "A family might borrow money because ___. They must pay it back because ___."',
        watch: 'Right: the vault, "The bank keeps money safe."; the savings paper, "The bank pays savers interest."; the roof, "The bank lends money." The sentences are never in the pictures\' order. On Level 3: "to fix their roof" or any real need; "it is not their money" or "the bank lends money other people saved." Accept small copying slips. No answer key.',
      },
    },
    '2:class-market': {
      title: 'Class Market Day',
      objective: 'Children run a class market: each group makes a good or offers a service, sets and writes its price, everyone buys with the same play coins, and the class talks about which prices sold.',
      routine: 'Session 1: groups make a good (bookmarks, paper flowers, cards) or offer a service (a drawing made to order). Session 2: groups write price tags from 10 cents to 1 dollar. On the Money Mat, the site\'s coin tool, pay the prices together, then pay each another way. Every child gets the same bag of play coins (2 quarters, 3 dimes, 3 nickels, 5 pennies: one dollar). Session 3: half the class sells while half shops, then they swap; sellers count the coins. Graph what sold; then each child fills in the page.',
      note: {
        mistake: 'Children count coins, not cents: 3 coins become 3 cents. They think a bigger coin is worth more, but the dime is the smallest.',
        words: 'Say: "A seller picks a price people will pay." Count on from the biggest coin: "25, 35, 40, 41." After the graph, ask: "Did lower prices sell more? Why?" Level 1: what you bought and paid, and two practice trays (10 to 50 cents; dimes, nickels, pennies). Level 2: two records and two trays with quarters, up to a dollar. Level 3: one record, two trays, change from a dollar, and "At our market, ___ sold the most. I think it sold well because ___." Coins are at real size, with no numbers on the trays. Pennies are no longer made but still count as money.',
        watch: 'The record has no wrong answer; "My coins make" matches "It cost" when the child paid exactly. On a tray, one set of coin kinds pays the price exactly (with extra coins of a kind, any of them count). Change: count up from the price to 100 (35; 40, 50, 75, 100: 65 cents). Never ask what children have at home. No answer key.',
      },
    },
  },
};
