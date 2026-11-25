'use strict';
/**
 * Teacher notes, English, social studies: the 19 lessons of the four Grade 3 social studies units (Daily Teaching
 * System, Stage D-3, 2026-11-25): Citizens, Rules and Laws; Maps of Our World and Our State; How Our Government Works;
 * Our Community Then and Now (design scripts/units/year/design.en.social.json, grade 3). Each note was written from the
 * pages the lesson hands out, read at every level: the new pages G3-612 to G3-629 from their text dump, sheets, renders
 * and bank (lcs-stage-d/batch-s3; types/_shared/dk-social-3.js, data/social/dk-social-3.js) AS FIXED in review round 1
 * after the US Grade 3 teacher's page review (BATCH-S3-RESULT.md "Review round 1", FIX-BRIEF-1.md, the regenerated text
 * dump, sheets and renders, and the teacher talk: respect as "treating people well when their ways are different from
 * yours" and each virtue used one time on every level, honesty also defensible for the fish; the Constitution panel and
 * the three freedoms, pictures on Levels 1-2; one of three stories on Level 1 of How People Change Laws, the grown-up
 * marchers, a man in the 1915 march, three lines a chart row; every town-map dot on a street, "inches" and "miles" above
 * the boxes, the state map's 100 miles, the Level 3 trip on one street; the blank street plates, "block(s)" and five key
 * rows on the grid map; the eight real places of the dot map (Miami, Jacksonville, Chicago, Cleveland, the Great Basin,
 * the Chihuahuan Desert, Idaho, Wyoming), from the 2020 Census; the mine in the forest hills, far from every site, and
 * the two-line site frames; two services of each level; "To check means to stop or limit." and the job cards in the
 * national chart; Level 1 tax services that never name their level, the buildings "local: our town" and so on, the
 * dollar box, the drawing boxes on Levels 2-3; the new "how" and "say" rows of the ways to decide; the crossing light
 * "all day and night"; the oil lamp; "the water for the dough", the wheat field and the salt shaker; each effect used one
 * time on every level and "In our town, ___. It happened because ___."; "I can accept it because" on every level);
 * then as fixed in review round 2 ("Review round 2", FIX-BRIEF-2.md: the school between the two Level 3 trip places,
 * so the trip is the near distance twice plus the far one; "Another way one branch can check another"; the Level 1 tax
 * pool without the driver's license, "highway patrol cars" its one state service, "soldiers who keep us safe"; the
 * election for a mayor or a governor, never paired with the president; bigger street plates and key lines, the north
 * arrow in the sea, the Appalachian shading kept off the coast, the girl's dress of about 1900, the cause-and-effect
 * layout, none of which a note describes); the published page G3-396 from its generator and fresh renders, copies 1
 * and 2 (lcs-stage-d/notes-s3). Pictures and
 * items that change from copy to copy are named as the pool they come from; a quoted sentence is one every copy prints,
 * or is marked as one level's. A second page review may change the pages again; the notes follow them.
 * Every lesson has its routine (`routine`), printed under "What the class does". Deciding together is teacher-led over
 * two sessions: its routine is the lesson, and the page is each child's record of it. The grid map has three sessions.
 * Kind and plain: no child is asked to tell about home or family; "our town" work works in any town and the teacher
 * helps; real people of the past are named plainly; on a record or opinion page every honest answer stands; a child
 * may pass.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 1,850 letters in all, the routine included.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:civic-virtues': {
      title: 'Civic Virtues at School',
      objective: 'Children read short school situations, name the civic virtue each one calls for (honesty, respect, responsibility, fairness, courage), and write what a good citizen would do.',
      routine: 'Day 1: write the five virtues and what each means on chart paper, in the page\'s words: honesty, telling the truth; respect, treating people well when their ways are different from yours; responsibility, doing a job you agreed to do; fairness, giving everyone the same chance; courage, doing what is right even when you feel afraid. Read short school moments aloud, never about a real classmate; the class names the virtue and what a good citizen would do. Day 2: the page.',
      note: {
        mistake: 'Children think courage means not feeling afraid, so they miss it where the page says a stomach gets tight or a heart beats fast. They pick a virtue from one word, or use a word twice.',
        words: 'Say: "A virtue is a way of acting that helps a group live and work together." The situations change from copy to copy (fifteen, three for each virtue). Level 1 has three situations and only their three virtues; Levels 2 and 3 have five and all five. On every level each word is used one time. Say: "In real life one moment can need two virtues (keeping a promise is honest too). On this page each virtue goes with one situation." Level 3 adds "My own situation for a partner:". Partners swap pages and name its virtue.',
        watch: 'Right: a scared feeling (a tight stomach, a fast heart, shaking hands), courage; owning up (who spilled, a start too soon, whose poster), honesty; a job you said you would do (the plant, the markers, the fish), responsibility; sharing a turn or a thing (the computer, the crackers, the ball), fairness; someone new or different (new words, a new lunch, an idea unlike your own), respect. Any kind, true act finishes "A good citizen would": "tell the coach the truth." No answer key.',
      },
    },
    '3:constitution': {
      title: 'The Constitution and Our Class Constitution',
      objective: 'Children learn that the U.S. Constitution, signed on September 17, 1787, is the plan for our national government and that the Bill of Rights protects freedoms such as speech and religion, then write a class constitution beginning "We the students."',
      routine: 'Day 1, near Constitution Day (September 17): show the first words, "We the People of the United States." Say: "In 1787 leaders wrote this plan for our national government. In 1791 the Bill of Rights, the first ten amendments, was added. It protects freedoms like speech, religion, and the press." List rules that would help our class, each with a reason, on chart paper. Day 2, after the page: the class picks four or five rules by a show of hands, writes them under "We the students of Room ___," and everyone signs.',
      note: {
        mistake: 'Children mix up the Constitution with the Declaration of Independence (1776), or think it is a list of rules for kids. On Level 3 they pick a rule that protects no freedom ("Walk in the hall").',
        words: 'Say: "A constitution is a plan for how a group will work together." Every level prints the Constitution\'s first words and the three freedoms. Level 1: a line from each freedom to its picture (the pictures change order from copy to copy), then two rules with "because." Level 2: four rules. Level 3 adds "Rule number ___ protects freedom of ___ in our class." Before Level 3, be sure one class rule protects a freedom: "We listen when someone shares an idea." Never ask a child about their religion.',
        watch: 'Right on Level 1: speech, the speaker; religion, the church, synagogue, and mosque; the press, the reporter. The rules are the class\'s own: there is no wrong rule. "In order to" takes a goal: "in order to learn and be kind." On Level 3: "Rule number 2 protects freedom of speech in our class. It does this by letting everyone share ideas." No answer key.',
      },
    },
    '3:deciding-together': {
      title: 'Deciding Together',
      objective: 'Children deliberate on a real class question (how to use indoor recess, where to put a reading corner): they list the choices, give reasons with evidence, listen to every side, and reach a decision the whole group can accept.',
      routine: 'Day 1: pose one real class question with three choices, one whose answer you will really carry out (how to use indoor recess, where to put a reading corner), and write it on the board. Small groups list a reason for and a reason against each choice on chart paper. Day 2: each group reports while the others listen and ask one question. Then the class looks for a choice, or a mix, most people can accept, and only then votes. Each child fills in the page as the class goes, on both days.',
      note: {
        mistake: 'Children argue for their favorite without a reason, or think the loudest side or the first vote wins. They hear a reason against their choice as an attack on them, or stop listening once they have spoken.',
        words: 'Say: "We are looking for a choice most of us can accept, not for a winner." Model: "I agree with ___ because ___." "I see it differently because ___." "So you think ___?" (say back a view before you answer it). The page is each child\'s record. Every level has our question, three choices with a reason for each, the choice the class reached, and "I can accept it because ___." Level 2 adds a reason against each choice and "The question I asked another group." Level 3 adds "Did my mind change?" yes or no, and what changed it or kept it.',
        watch: 'There is no wrong answer: every reason, question, and choice on the page is the child\'s own. Look for a reason backed by a fact ("The spot by the window has the most light"), a view said back fairly, and a child who changes their mind when they hear a better reason, or can say why it stayed. A child may pass when the class shares aloud. No answer key.',
      },
    },
    '3:changing-laws': {
      title: 'How People Change Laws',
      objective: 'Children read two true stories of people changing national laws (the 19th Amendment, 1920; the Americans with Disabilities Act, 1990) and a sample town\'s crosswalk story, and record who wanted each change, what they did, and what changed.',
      routine: 'Day 1: ask, "If a law seems unfair, what can people do?" List peaceful ways: speak out, write letters, gather signatures, march, vote. Tell the true stories: in 1848 at Seneca Falls, New York, women and men met to ask for women\'s rights, among them the right to vote, and many people carried on the work for more than 70 years, until the 19th Amendment (1920); people with disabilities spoke out, wrote to Congress, and marched until the Americans with Disabilities Act (1990). Day 2: the page.',
      note: {
        mistake: 'Children think one person or one day changed the law, or that a law changes as soon as people ask. They write who wanted the change under "What did they do?"',
        words: 'Say: "People change laws peacefully, and it can take many years." Each story has a picture; the 1915 march shows women and a man. Level 1 has one of the three stories (it changes from copy to copy), with its first answer given. Levels 2 and 3 have all three and a chart with three lines a row. Level 3 adds "One change I would ask for at school:" and "How I would ask:".',
        watch: 'Right: women and men gave speeches, wrote letters, and marched, and women won the right to vote ("women" alone is right too); people with disabilities spoke out, wrote to Congress, and marched, and a law requires ramps, wide doors, and fair hiring; neighbors gathered signatures and spoke at a city council meeting, and a crosswalk was painted ("the council voted yes" is right too). Even after 1920, unfair rules kept many Black, Native American, and Asian American women from voting for years. On Level 3, any peaceful way to ask is right. No answer key.',
      },
    },
    '3:continents-oceans': {
      title: 'Continents and Oceans',
      objective: 'Children locate the seven continents and five oceans on a world map and number them, then name the oceans that touch North America and the continent that lies south of Europe.',
      routine: 'Day 1: turn the class globe slowly. Children find the seven continents and the five oceans, touch each, and say its name. Ask: "Which oceans touch North America?" (the Pacific, the Atlantic, and the Arctic) and "Which continent lies south of Europe?" (Africa). Then lay a flat world map beside the globe and find the Pacific on both of its edges. Day 2: the page.',
      note: {
        mistake: 'Children think the Pacific is two oceans because the flat map shows it on both edges. They mix up the Arctic Ocean (at the top) and the Southern Ocean (around Antarctica), and North and South America.',
        words: 'Say: "A globe shows the whole Earth. A flat map cuts it open, so the Pacific shows on both sides." The numbers change from copy to copy, and the Pacific carries the same number twice. Three numbers point with a short line: the Arctic Ocean at the top, the Southern Ocean and Antarctica at the bottom. A dashed line divides Europe from Asia. Levels 1 and 2 say Oceania: Australia and the islands near it; many US books call it Australia. Level 1: write each number in the box next to its name; two are already written. Level 2: the same, none written. Level 3 has no names: write each name on the line with its number.',
        watch: 'Right: each box or line matches the number at that place on that copy: North America, South America, Europe, Asia, Africa, Oceania, Antarctica; the Pacific, Atlantic, Indian, Arctic, and Southern Oceans. "Australia" for Oceania is right too. On Level 3, accept small spelling slips when the name is clear. No answer key.',
      },
    },
    '3:map-scale': {
      title: 'How Far Is It? Using a Map Scale',
      objective: 'Children measure distances on a town map with a ruler and the map scale (1 inch stands for 1 mile), compare a town map with a state map, and tell which map shows more detail and which shows more land.',
      routine: 'Print the page at actual size (100%), never "fit to page," and give each child a real inch ruler. Day 1: show a printed road map of our state (a printout from the state\'s website works). Children copy the length of its scale bar onto a paper strip and measure from city to city: "Each strip is ___ miles." Compare it with a town map: which shows the streets, which more land? Day 2, the page: practice putting the ruler\'s 0 on the first dot.',
      note: {
        mistake: 'Children start at the end of the ruler or at 1 instead of 0, or measure from the edge of a picture instead of its dot. They think the bigger map on the page shows more land.',
        words: 'Say: "On this town map, 1 inch stands for 1 mile, so the inches and the miles are the same number." The sample town\'s five places (school, park, library, fire station, lake) are the same on every copy; where they sit and the pairs asked change. Every dot sits on a street; every asked pair lies along one. Each row has boxes under "inches" and "miles." Level 1: three distances to the nearest inch. Levels 2 and 3: to the nearest half inch. On the state map, 1 inch stands for 100 miles and the whole town is the red dot. Level 3 adds the shortest trip to two places on one street, the school between them.',
        watch: 'Measure the child\'s own copy: every distance is a whole inch on Level 1 and a whole or half inch on Levels 2 and 3. The town map shows the streets and the library; the state map shows more land and more cities. On Level 3, go to the nearer place first, back past the school, then on: the near distance twice plus the far one (for example, 1 + 1 + 1 1/2 = 3 1/2 miles). No answer key.',
      },
    },
    '3:grid-map': {
      title: 'Make a Grid Map of Our Community',
      objective: 'Children draw a map of the school neighborhood on a lettered and numbered grid with a title, a key, a compass rose with north at the top, and a scale, then write grid locations (B3, D1) for a partner to find.',
      routine: 'Session 1: walk around the school\'s block if your school allows it, or look at a printed street map of the blocks around school; list on chart paper what is near and which way it is from the school. Say: "On our map, north is at the top and each square is one block." Session 2: children draw their maps on the page. Session 3: partners swap pages, find each other\'s squares ("The park is in square B2."), and give and follow directions ("From the school, go 2 blocks north to the park.").',
      note: {
        mistake: 'Children write the number before the letter (4C) or count from the wrong corner. They turn the map so north is not at the top.',
        words: 'Say: "Name a square by its letter across the top, then its number down the side: C4." Level 1: the school is drawn in C4 with two crossing streets whose name plates are blank: pick two real streets that cross near the school. The compass rose has N, the scale says "1 square = 1 block," and the key has five symbols to copy (school, house, park, store, a place to eat). Levels 2 and 3: a blank grid, a box to draw the compass rose, "1 square = ___ block(s)," and five key rows. Level 3 adds two "From the ___, go ___ block(s) ___ to the ___." "A house" on the checklist is any house near school, never the child\'s own.',
        watch: 'There is no wrong map: it is the child\'s own drawing, and a place the neighborhood does not have stays unchecked. Look for a title, a compass rose with N at the top, the scale, a key whose symbols match the map, and squares a partner can find, the letter first. On Level 3: "From the school, go 2 block(s) north to the park." No answer key.',
      },
    },
    '3:where-people-live': {
      title: 'Where People Live and Why',
      objective: 'Children compare a U.S. population dot map with a land and water map, find that more people live along the coasts, big rivers, and the Great Lakes and fewer in deserts and high mountains, and write reasons why.',
      routine: 'Day 1: show a U.S. map and ask: "If you started a town long ago, what would you need?" (water, food, flat land, a way to ship things). Mark where the water is (the coasts, the Great Lakes, big rivers) and where living is hard (dry deserts, cold mountains). Then show a census map of where people live: did we guess right? Day 2: the page.',
      note: {
        mistake: 'Children decide many or few from the land map instead of the dots. They give a reason that does not fit the place ("ports" or "water" for a desert, "flat land" for the mountains).',
        words: 'Say: "Each dot is 100,000 people." The dots come from the 2020 Census and show the 48 states that touch each other. The letters and places change from copy to copy and are never named: each is one of eight real places, by the Atlantic (Miami, Jacksonville), on a Great Lake (Chicago, Cleveland), in a desert (Nevada\'s Great Basin, the Chihuahuan Desert in west Texas), or in the Rocky Mountains (Idaho, Wyoming). Circle from the dots; give the reason from the land map. The cream land is "other land": hills and valleys. Level 1: two places and the reason words (water, flat land, ports, cold, dry). Level 2: four places, one of each kind. Level 3 adds "In our state, many people live ___ because ___."',
        watch: 'Right: by the Atlantic or a Great Lake, many people, "because there is water, a port, and flat land" ("warm" is right too for Florida); in a desert, few, because it is dry ("cold" fits Nevada too); in the mountains, few, because it is cold and steep ("mountains" is right too). On Level 3, any true place and reason: "near the river because it brings water and trade." No answer key.',
      },
    },
    '3:towns-near-resources': {
      title: 'Towns Grow Near Resources',
      objective: 'Children study a map of a sample state with a river, a harbor, a forest, farmland, and a mine, choose good and poor places to start a town, and explain how water, soil, trees, or minerals helped real towns grow.',
      routine: 'Day 1: draw an island on chart paper with a river, a forest, farmland, a mine, a harbor, and a dry, rocky corner. Ask groups: "Where would you start a town? What would people need?" Groups mark a spot and say why. Name the resources: water to drink and travel on, soil for farms, trees for wood, minerals from a mine, a harbor for ships. If you can, tell what helped our own town begin. Day 2: the page.',
      note: {
        mistake: 'Children think open, empty land is best because there is room to build. On Level 1 they circle "minerals from the mine," though no site is by the mine.',
        words: 'Say: "A town needs water first, and a way to get food and to trade." The sites\' letters change from copy to copy, half the maps are flipped, and the mine sits by the forest, far from every site. Level 1: two sites, one in the dry, rocky land: circle the better site, then what it has, then "A town there could grow because ___." Levels 2 and 3: three sites, by the river and the farmland, by the harbor, and in the dry, rocky land. For each, "Site A has ___" and, on the next line, "so a town there could ___."; then the worst place. Model the dry site: "has dry, rocky land" and "so a town there could not grow food." Level 3 adds "A resource that helped our town begin: ___."',
        watch: 'Right: the river site has river water and rich soil for farms; the harbor site has a harbor for ships ("the sea" is right too); the dry, rocky site has no water and is the worst place for a town. Both good sites are good. On Level 1, the better site is the one out of the dry land, with the resource it has. On Level 3, our town\'s real resource, found with your help. No answer key.',
      },
    },
    '3:levels-of-government': {
      title: 'Three Levels of Government',
      objective: 'Children sort leaders and services into local (the mayor and the city council: parks, the fire department, trash pickup), state (the governor and the state legislature: state highways, driver\'s licenses), and national (the president and Congress: the mail, national parks, coins and paper money), and tell which level to ask about a problem.',
      routine: 'Day 1: draw three boxes inside each other on chart paper: our town or city inside our state inside our country. Write each level\'s leaders by role, and by name if you wish, plainly and without opinions: our mayor (or town leader) and council; our governor and state legislature; the president and Congress. Ask: "Who fixes the swings in our park? Who gives a driver\'s license? Who makes our coins?" Children hold up a card: local, state, or national. Day 2: the page.',
      note: {
        mistake: 'Children think the president runs everything, so they put a park, the fire department, or a state highway under national. They mix up Congress and the state legislature, which both make laws.',
        words: 'Say: "Each level of government has leaders and services for its own place." Every card names its level or its job: "a city park," "a state highway," "a national park." Level 1: the six leaders. Levels 2 and 3: the six leaders and two services of each level (the services change from copy to copy). Level 3 adds "The swing in a city park is broken. The level to ask: ___ Why: ___." Many places have a town board or a county instead of a city council: that is local too.',
        watch: 'Right, local: the mayor, the city council, a city park, the fire department, trash pickup. State: the governor, the state legislature, a state highway, a driver\'s license. National: the president, Congress, the mail, a national park, coins and paper money. On Level 3: local, "because the city takes care of its parks." No answer key.',
      },
    },
    '3:three-branches': {
      title: 'Three Branches',
      objective: 'Children learn that the U.S. Constitution splits the national government into three branches (Congress makes the laws, the president carries them out, the courts decide what laws mean) that check each other, and that our state government has the same three parts.',
      routine: 'Day 1: say, "The Constitution splits our national government into three branches so no one part has all the power." Three groups act it out: the lawmakers write a pretend class bill ("Recess is 5 minutes longer."; it does not change our real recess), the president signs it or vetoes it, and the judges decide whether it fits our class constitution. Then name our state\'s: the state legislature, the governor, the state courts. Day 2: the page.',
      note: {
        mistake: 'Children think the president makes the laws, or that a court decides who is in trouble at school. They put "decides what laws mean" under executive, because the president decides things.',
        words: 'Say: "Legislative makes the laws, executive carries them out, judicial decides what they mean." Every level prints what "check" means (to stop or limit), with the veto as its example. Level 1 has six cards for our national government. Levels 2 and 3 add the three state cards under "Our state government has the same three branches" and put the job cards in the national chart. Level 3 adds "Another way one branch can check another: The ___ can ___."',
        watch: 'Right: legislative, Congress, makes the laws, the state legislature; executive, the president, carries out laws, the governor; judicial, the Supreme Court, decides what laws mean, the state courts. On Level 3 the veto is printed, so look for another check: "Congress can pass a bill again over a veto, with two-thirds of each house." "The courts can decide a law goes against the Constitution." "The Senate can say yes or no to the judges the president chooses." No answer key.',
      },
    },
    '3:taxes-services': {
      title: 'Taxes Pay for Services',
      objective: 'Children trace how the taxes people and businesses pay become a fire truck, a library book, or a repaired road, and write which level of government provides each service and how it pays for it.',
      routine: 'Day 1: label three boxes "town," "state," and "nation." Each child drops one paper token, "tax money," into each box. Read service cards (a town pool, a state park, a national park ranger, highway patrol cars); a child carries each card to the box whose money pays for it. Say: "Towns collect mostly property taxes; states collect sales taxes, income taxes, or both; the nation collects mostly income taxes." Day 2: the page.',
      note: {
        mistake: 'Children think a government\'s money comes from nowhere, or that the president pays for everything. They put highway patrol cars under local because towns have police cars too.',
        words: 'Say: "People and businesses pay taxes. Each level of government collects its own and uses it for its services." Follow the arrows from the payers\' dollar box to the buildings marked "local: our town," "state: our state," and "national: our country." Level 1: three drawn services, one of each level (the local and national ones change from copy to copy); their names never say the level, so ask, "Who pays for this: our town, our state, or our country?" Levels 2 and 3: children draw or write three services, each with its level. Level 3 adds "Our town should spend more on ___ because ___."',
        watch: 'Right on Level 1, local: a fire truck, new books for the library, trash pickup; state: highway patrol cars; national: soldiers who keep us safe, astronauts exploring space. On Levels 2 and 3, any real service with its level: a fire station, local; a state park, state; the army, national. "Without taxes, the town would not have money for fire trucks." Level 3 is the child\'s opinion: every honest answer stands. No answer key.',
      },
    },
    '3:ways-to-decide': {
      title: 'Ways to Decide',
      objective: 'Children compare how decisions are made in a class vote, a town council meeting, and an election, where citizens 18 and older vote for leaders, and write one way each process gives people a say.',
      routine: 'Day 1: hold a quick class vote on a small real choice (the next read-aloud book): each student votes one time, and the most votes wins. Then act out a town council meeting: five children are the council at a table, two or three others speak for a minute about a park problem, then only the council votes. Ask: "Who decided each time? How did the others have a say?" Say: "In an election, citizens 18 and older vote for leaders, like a mayor or a governor." Day 2: the page.',
      note: {
        mistake: 'Children think everyone in the room votes at a council meeting, or that children vote in elections. In the chart they write who decides in the "How do people have a say?" row.',
        words: 'Say: "There is more than one fair way to decide. Ask: Who decides? What is the rule? What does one person do to have a say?" The three texts come in a new order on each copy, and the chart\'s columns follow them. Level 1 has the first row, "Who decides?", done. Level 2 is a blank chart. Level 3 adds "To choose a field trip, our class should use ___ because ___." Say it is a pretend choice, so no trip is promised.',
        watch: 'Right, a class vote: the students; the choice with the most votes wins; a student votes one time. A town council meeting: the council members; the council members vote; a person speaks at the meeting. An election: citizens 18 and older; the person with the most votes wins; a voter votes one time. (The page\'s election is for a mayor or a governor; voting for president works differently and comes later.) Where the two lower rows overlap, accept either sentence, in the child\'s own words. On Level 3, any way with a reason: "a class vote because everyone gets a say." No answer key.',
      },
    },
    '3:community-problem': {
      title: 'Solving a Community Problem',
      objective: 'Children study a sample community problem (no safe place to cross a busy street near a park), list possible solutions, choose one by weighing its costs and benefits, and write a letter to the city council proposing it.',
      routine: 'Day 1: read the problem aloud: in a sample town, a busy street runs between the homes and the park, with no crosswalk. Groups list ways to fix it and, for each, what it costs and how it helps: a sign that says SLOW, a crossing guard, a crosswalk with a light. Say: "A guard is paid every day and helps only before and after school. A light costs the most to build, but it stops cars all day and night." Day 2: the page, then read a few letters aloud. Sending a real letter is your choice.',
      note: {
        mistake: 'Children choose the solution that costs the most because it "works best," without weighing the cost, or think the city council builds the crosswalk itself. They write the solution after "We noticed."',
        words: 'Say: "Every solution has a cost and a benefit. A good choice weighs both." Level 1 gives the three solutions, each with a cost and a benefit (their order changes from copy to copy): circle one, then write "We noticed ___." and "We suggest ___ because ___." Level 2: the child writes three solutions with a cost and a benefit each, and the letter with "Thank you for ___." Level 3 adds "Who would carry out the plan the city council agrees to? Circle one." Model: "We noticed there is no crosswalk by the park. We suggest a crossing guard because children cross before and after school."',
        watch: 'There is no wrong choice: any solution is right when its reason weighs a cost or a benefit. A strong letter names the problem, the solution, and why. On Level 3: city workers; the city council decides, and city workers paint crosswalks and put up signs (not the Supreme Court or the governor). No answer key.',
      },
    },
    '3:primary-secondary': {
      title: 'Primary and Secondary Sources',
      objective: 'Children sort sources into primary (a diary, an old photograph, a letter, a map made at the time) and secondary (a textbook page, an encyclopedia article written later), and explain what each kind can tell a historian about the past.',
      routine: 'Day 1: hold up things made at the time (a class photo, today\'s morning message) and things made later (our social studies book, a library book about long ago). Ask: "When was it made? Was the maker there?" Sort them on chart paper under "Primary: made at the time by someone who was there" and "Secondary: made later by someone who studied the past." Keep the chart up. Day 2: the page.',
      note: {
        mistake: 'Children think anything old is primary, so they put the 1955 encyclopedia article there. They think a museum sign is primary because a museum keeps old things.',
        words: 'Say: "Ask two questions: When was it made? Was the maker there?" Level 1 prints the two definitions and four sources, both kinds, that change from copy to copy. Levels 2 and 3 have all eight sources and no definitions: keep the chart in view. Read each source and its line aloud. Level 3 adds "The source that best tells what school was like in 1900: ___ because ___."',
        watch: 'Right, primary: the diary (a girl wrote about her school in 1900), the photograph (taken the day the new school opened in 1871), the letter (a soldier wrote to his family during a war), the map (drawn in 1870), the newspaper (printed the day the town\'s bridge opened). Secondary: the textbook page (2019), the encyclopedia article (written in 1955 about the town\'s history), the museum sign (2021). On Level 3: the diary, "because the girl was there in 1900." No answer key.',
      },
    },
    '3:double-timeline': {
      title: 'A Double Timeline',
      objective: 'Children place events from a sample town\'s history and from U.S. history on two parallel timelines (the first transcontinental railroad in 1869, the town\'s first school in 1870, the Wright brothers\' first powered flight in 1903, women winning the vote in 1920), and tell which events happened at about the same time.',
      routine: 'Before Day 1, find two dates of our town\'s history (the town or library website). Day 1: tape two long paper strips on the wall, one above the other, marked 1860 to 1940 every ten years: "Our town" and "The United States." Place the U.S. events together: the first railroad across the country was finished in 1869; the Wright brothers made the first powered airplane flight in 1903; women won the right to vote in 1920. Add our town\'s dates (lengthen a strip if they fall outside 1860-1940) and ask: "What happened at about the same time?" Day 2: the page.',
      note: {
        mistake: 'Children place events in the order of the list, not by year, or put 1869 on the 1860 mark. They draw a line between two events on the same timeline.',
        words: 'Say: "Find the year first, then write the letter above it." The big marks are ten years apart and the small marks five; 1869 sits just before 1870, and 1903 just after 1900. The event letters change from copy to copy. Level 1: four events (the town\'s first school, 1870, and library, 1920; the railroad, 1869; the vote, 1920). Levels 2 and 3: all seven, adding the train station (1885), the paved road (1930), and the flight (1903). Level 3 adds "Two events from our town (find them with your teacher): In ___, ___."',
        watch: 'Right: each letter above its year on its own line, and two joining lines: the railroad (1869) and the town\'s first school (1870); women win the vote (1920) and the town library (1920). No other pair is within five years. On Level 3, any two real dates of our town, even ones after 1940. No answer key.',
      },
    },
    '3:then-and-now': {
      title: 'Life Then and Now',
      objective: 'Children compare life in a U.S. town around 1900 with life today (getting around, lighting homes, sending messages, going to school), using pictures and short texts, and write how one part of life changed and one stayed the same.',
      routine: 'Day 1: set out pairs of things: a candle (unlit) and a flashlight, a letter in an envelope and a phone, a picture of a horse and wagon and a toy car. Ask: "Which did people use around 1900? Which do we use today?" Say: "The telegraph sent urgent news along wires, in clicks of code." Make a T-chart, "About 1900" and "Today." Day 2: the page.',
      note: {
        mistake: 'Children think people around 1900 lived in the dark or had no schools, and that everything changed. Some write what their own home has instead of what is true in most places today.',
        words: 'Say: "These are drawn sample photos, not real people." The lighting photo shows an oil lamp (a glass chimney over a flame) beside a candle. Each row has a short true text about 1900; children write what it is like today in most places, never about their own home. Level 1 has two of the four rows (they change from copy to copy). Levels 2 and 3 have all four: getting around, lighting at home, sending messages, and school. Every level has "What changed most:" and "Something that stayed the same:". Level 3 adds "The change that mattered most: ___ because ___." Ask: "What do we still do? We walk, write letters, and learn with a teacher."',
        watch: 'There is no wrong answer when the child writes what is true today: cars and buses, electric lights, phones and email, schools with a class for each grade. A strong "stayed the same" names something both times share: "Children still learn to read at school." On Level 3, every honest reason stands. No answer key.',
      },
    },
    '3:economic-resources': {
      title: 'Resources and Jobs in Our Community',
      objective: 'Children sort the resources a local business uses into natural resources (wheat, water), human resources (a baker\'s skill), and capital resources (an oven, a delivery van), and do the same for a business in their own town.',
      routine: 'Day 1: hold up a loaf of bread (or a picture of one) and ask: "What did it take to make this?" Write each answer on a sticky note: wheat, water, salt, the baker, an oven, a truck. Sort them on chart paper into three columns: Natural, things found in nature; Human, people and what they do on the job; Capital, things people made that help make goods. Keep the chart up. Day 2: the page.',
      note: {
        mistake: 'Children put the oven, the van, or the building under human because people made them, and wheat under human because a farmer grew it. They put the water under capital because it comes from a tap: the tap is capital, the water is natural.',
        words: 'Say: "Natural resources come from nature. Human resources are people and their work. Capital resources are tools, machines, and buildings people made to help make goods." The picture shows a wheat field by the van and a salt shaker on the counter. Level 1: six cards, two of each kind, that change from copy to copy, and what each kind means under its column. Levels 2 and 3: all nine cards and no meanings: keep the class chart in view. Level 3 adds a chart for "A business in our town:" with a line under each kind. Any business in town works (a pizza shop, a gas station); never ask about a family\'s business.',
        watch: 'Right, natural: wheat grown on a farm, the water for the dough, salt. Human: the skill of the baker, a cashier\'s work. Capital: an oven, the mixer, a van that delivers bread, the bakery building. On Level 3, a pizza shop: natural, tomatoes; human, the cook; capital, the oven. No answer key.',
      },
    },
    '3:cause-effect-history': {
      title: 'Causes and Effects in a Town\'s History',
      objective: 'Children read a short history of a sample town, link each cause to its effect (a railroad came, so farmers could ship their crops; a factory closed, so families moved away), and write the most likely cause of one change in their own community.',
      routine: 'Day 1: chain causes and effects from class life on the board: "It rained, so recess was inside." "Recess was inside, so we played board games." Underline "so" and "because." Then read the class one change in our town and its cause from a source children can see (the town\'s or library\'s history page, a local history book). Day 2: the page.',
      note: {
        mistake: 'Children join a cause to the effect beside it, or to the one that comes next in the story. They mix up the factory opening and closing, because both are about families moving.',
        words: 'Say: "A cause is why something happened. The effect is what happened because of it." The story is one of three sample towns (Maple Falls, Cedar Creek, Willow Bend); only the name and the years change. Level 1 has two causes and two effects; Levels 2 and 3 have all four. On every level each effect is used one time. Read the story aloud, then each cause, and ask: "What happened because of it?" Level 3 adds "In our town, ___. It happened because ___. My source: ___." Model: "In our town, many new houses were built. It happened because a factory opened."',
        watch: 'Right: the railroad came, farmers shipped crops to cities; the river flooded, houses were built on the hill; a factory opened, many families moved in; the factory closed, many families moved away. On Level 3, any real change whose cause the source tells, with the source named: "My source: the town\'s history page." No answer key.',
      },
    },
  },
};
