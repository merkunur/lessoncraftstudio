'use strict';
/**
 * Teacher notes, English, social studies: the 20 lessons of the five Grade 1 social studies units (Daily Teaching
 * System, Stage D-3, 2026-11-24): Rules and Good Citizens; Families Long Ago and Today; Maps and Places; Our Country's
 * Symbols and Stories; Goods, Services and Money (design scripts/units/year/design.en.social.json, grade 1). Each note was
 * written from the pages the lesson hands out, read at every level: the new pages G1-653 to G1-670 from their text dump,
 * sheets and bank (lcs-stage-d/batch-s1; types/_shared/dk-social-1.js, data/social/dk-social-1.js) AS FIXED in review
 * round 1 after the US Grade 1 teacher's page review (batch-s1/REVIEW.tsv and BATCH-S1-RESULT.md "Review round 1": the
 * wet-floor pool rule and "the street", the paint story, the Colorado close-up, the photo questions, "When you were
 * little," on every interview question, "a big school" and "a pen you dip in ink", the shopping-center sentences, one
 * thing per park change and the dog walker who is not helping, "At the ___, people can ___", the quarter front and back
 * with its ring, no "no" sign on a true reason, every town label printed, "my goal ($20 or less)", a job chart every
 * class has, and G1-670 rebuilt as a market stall with a coin key at real size and one way to pay each price); the
 * published pages G1-385, G1-386, G1-379, G1-528 and G1-530 from their generators and fresh renders
 * (lcs-stage-d/notes-s1). Review round 2 is in too (BATCH-S1-RESULT.md "Review round 2": the kind/honest talk on the
 * paint story, no picture and its own sentence on one page, the garage sentence, "Place: ___", the shoe print, "Circle
 * one:", today's nickel and counting on from the quarter). Then the teacher's review of these notes
 * (batch-s1/REVIEW-NOTES.tsv): the baker's rolling pin, the year in "In 1950, people", puppets for the one alone, the
 * map key's tool, The Rail That Waits, and "everyone faces the board", one family of many shapes, today's nickel and the penny. Where a lesson hands out two or three pages, the note
 * describes each, the first as the main page. Pictures that change from copy to copy are named as the pool they come from.
 * Every lesson has its routine (`routine`), printed under "What the class does". The class meeting is teacher-led: its
 * routine is the lesson, and the page records it. "Read the map key" has three sessions, one page each.
 * Kind and plain: any older person the child knows is right for the interview; no child is asked to tell more about home
 * than he or she wants; a child may pass; a puppet or the teacher, never a child, plays the one left alone or the unfair
 * king; real people's stories are told truthfully, simply and without violence, and say plainly what was unfair.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 1,850 letters in all, the routine included,
 * about 1,600 for a lesson with two or three pages.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:rules-in-places': {
      title: 'Rules in Different Places',
      objective: 'Children read short rules, match each rule to the place where it belongs (the classroom, the library, the pool, the street), and tell how each rule keeps people safe or makes things fair.',
      routine: 'Tape four signs around the room: classroom, library, pool, street. Read a rule card aloud ("Wait for the walk sign."); children walk to the sign where it belongs and act out the rule: a raised hand, a whisper, a slow walk, waiting for a paper walk sign. After each, ask: "What could happen without this rule? Does it keep us safe, or make it fair?" Then the class makes up one rule for the playground and says why.',
      note: {
        mistake: 'Children match by things they see instead of reading the rule: books are in a classroom too. They think a rule fits every place the same way, or that rules are there to get children in trouble.',
        words: 'Say: "Each place has rules that fit what people do there." Ask: "Why does the pool need this rule? What could happen?" Day 2, the page: read each rule aloud; the small picture beside it shows the action (a raised hand, a finger at the lips, bare footprints by drops of water, the walk-sign figure). The places are drawn and named: the classroom, the library, the pool, the street. Level 1 has two rules and two places (never the classroom and the library together), Level 2 all four, and Level 3 all four and a playground rule to write: "We ___ so that ___."',
        watch: 'Right: raise your hand to talk, the classroom; use a quiet voice with books, the library; walk, do not run (the floor is wet), the pool; wait for the walk sign, the street. A child who says you raise your hand in the library too is right: ask, "Where does it belong most?" On Level 3, any playground rule with a reason is right ("We take turns on the slide so that everyone gets a turn."). No answer key.',
      },
    },
    '1:class-meeting': {
      title: 'Our Class Meeting',
      objective: 'Children hold a class meeting with three talking rules, say back what the last speaker said before adding their own idea, and decide together how the class jobs will work.',
      routine: 'Day 1: sit in a circle and post three picture talking rules: one voice at a time, look at the speaker, wait for your turn. Practice on an easy question ("What game should we play at recess?"). The Name Sticks tool (or craft sticks in a jar) chooses who speaks first; each next speaker starts, "I heard ___ say ___. I think ___." A child may pass. Day 2, the meeting: which class jobs do we need, and how often should they change? Vote with a show of hands: call each choice, count the hands aloud together, and write the number. The most votes wins, a tie is voted again, and everyone goes along with it. Post the job chart.',
      note: {
        mistake: 'Children talk over each other, or say back their own idea instead of the speaker\'s. Some think a meeting is for telling on a classmate, or that a vote is unfair when their idea loses.',
        words: 'Model: "I heard Maya say jobs should change every week. I think that is fair." Talk about jobs, never about a classmate. Every level: check each talking rule you followed. Level 1 adds a box to draw "my idea for our class jobs." Level 2 adds the "I heard" frame, a job chart to circle a job you would like (line leader, door holder, paper passer, board cleaner, supply helper, messenger), and how often jobs change. Level 3 adds "Circle one:" day, week, or month, "A job I would like," and "Our class decided ___."',
        watch: 'There is no wrong answer: every check and choice is the child\'s own, and the decision is the class\'s. Watch for children who wait, look at the speaker, and say back a classmate\'s idea. An empty check box is honest: ask, "What will you try next time?" Add your own class\'s jobs. "Our class decided" is what the vote chose. No answer key.',
      },
    },
    '1:good-citizen': {
      title: 'Being a Good Citizen',
      objective: 'Children read short stories about children at school, circle the good-citizen choice in each, and circle the word that names it: honest, kind, responsible, or fair.',
      routine: 'Write the four words on chart paper, each with its sign: honest (a speech bubble with a check), kind (a heart), responsible (a clipboard), fair (a balance scale). A puppet acts out school moments: it spills the water and is asked who did it; it sees a second puppet (or a stuffed animal) sitting alone; it forgets to water the class plant; it keeps the only ball. Children show the good-citizen choice and name its word. Puppets, never children, sit alone or keep the ball.',
      note: {
        mistake: 'Children call every good choice "kind." They think saying "I did it" is the wrong choice because it may bring trouble. Some think the child who made the other choice is a bad child.',
        words: 'Say: "Honest: you tell the truth. Kind: you help someone feel good. Responsible: you do your job. Fair: everyone gets a turn or a share." Day 2, the page: four stories, each with a picture: Maya spills the paint, and the teacher asks who did it; Sam sees a child sitting alone at recess; it is Lee\'s day to feed the class fish; Ana\'s group has one ball. Read each story and both choices aloud. Level 1 has two of the stories, each with two pictures and "or" between them. Level 2 has all four with two sentence choices, and Level 3 all four and "One more: A friend drops a box of crayons. I would ___."',
        watch: 'Right: "I did it," honest; he asks the child to play, kind; Lee feeds the fish, responsible; they take turns, fair. If a child says kind, ask: "What did Maya do? She told the truth. That is being honest." A child who says responsible (she owned her mistake) or fair (no one else was blamed) has a good reason too. On Level 3, any helpful act is right. No answer key.',
      },
    },
    '1:leaders-jobs': {
      title: 'Leaders and Their Jobs',
      objective: 'Children match leaders by their role to what they lead (the principal a school, the mayor a town or city, the governor a state, the president the whole country) and tell one thing each leader is responsible for.',
      routine: 'Draw four circles inside each other on chart paper, the smallest in the middle: our school, our town or city, our state, our country. Beside each, write its leader: our principal, our mayor (or our town\'s leader), our governor, the president. Say their names plainly, without opinions. Ask: "What is each one in charge of?" Invite the principal to tell the class one part of the job.',
      note: {
        mistake: 'Children think the president is the boss of every other leader, but each leader is in charge of a different place. They mix up a state and the whole country, because both are shown as maps.',
        words: 'Say: "Each leader leads one place, and the places get bigger." Day 2, the page: the leaders all stand at a lectern; only the word under each tells the job, so read the words aloud. The places: a school; a town hall with houses; one state up close, Colorado in orange among its neighbors (say, "This is one example state. Our state is ___."); the whole country in green, with Alaska and Hawaii in small boxes. Level 1 has two leaders, Level 2 all four and "Who says it? Circle." (four sentences, two leaders each), and Level 3 all four and "A mayor helps a town by ___."',
        watch: 'Right: principal, a school; mayor, a town; governor, a state; president, our whole country. "I lead the whole country": president; "I lead a state": governor; "I lead a town or a city": mayor; "I lead a school": principal. If a child sends the governor to the whole country, point to the one orange state. On Level 3, any true town job is right: fixing roads, caring for parks, keeping the town safe. No answer key.',
      },
    },
    '1:family-generations': {
      title: 'Family Generations',
      objective: 'Children order family words from the oldest generation to the youngest, read clues to fill in a family tree, and draw a tree of people important to them.',
      routine: 'Day 1: children holding picture cards (a grandma, a mom, a girl, then an aunt and a cousin) line up by generation, oldest first. Day 2, after the pages: each child draws a tree of people important to them (family, a neighbor, anyone who cares for them); a pretend or storybook family is fine too. Children share only by choice.',
      note: {
        mistake: 'Children order by age, not generation: they put a baby in a row of its own, or an aunt above Mom. On the tree they answer for themselves, not for the starred child.',
        words: 'Say: "This is one family. Families have many shapes. A generation is one row of the family tree: grandparents; then parents, aunts, and uncles; then children, cousins, and babies." Page 1 shows the three generations in pictures, numbered 1 to 3. Level 1 has four rows of three words to number; Levels 2 and 3 have six and seven, adding aunt, uncle, cousin, and baby brother or sister. Page 2 is a tree with some names filled in; the clues (two, four, or five by level) are about the starred child.',
        watch: 'Right: grandparents 1; parents, aunts, and uncles 2; children, cousins, and babies 3. On the tree, an aunt or uncle hangs from the grandparents\' line and a cousin below. Both pages have an answer key; the child\'s own tree has no wrong answer.',
      },
    },
    '1:old-postcard-clues': {
      title: 'Clues in an Old Photograph',
      objective: 'Children study the front and back of an old photo postcard, find the clues that tell who took the photo, when, and where (the photo studio, the year, the town), and circle the answers to short questions.',
      routine: 'Show an old photograph or postcard: your own, or a printout of an old postcard of your town from your library\'s or historical society\'s website. Look at the front: "What do you see? What looks different from today?" Turn it over: "Is there a name? A place? A year?" Fill in a chart: Who took it? When? Where? Write "We do not know" where there is no clue.',
      note: {
        mistake: 'For "Who took the photo?" children circle the shop on the sign or the town: the sign tells what the shop is, not who made the picture. They guess the year from how old the card looks instead of reading it, and think the world was gray long ago because old photos are black and white.',
        words: 'Say: "An old photo is a clue to the past. \'Photo by\' tells us who made the picture; the back often tells when and where." Day 2, the page: the sample card changes from copy to copy, and its towns and shops are made up. The front shows a Main Street shop sign, people in hats and coats, and an old car; the back says "Photo by," a studio, a town, and a year, with a round date stamp. Read each question and its three choices aloud. Level 1 asks two of the three questions, with the clues circled in orange. Level 2 asks all three with no help, and Level 3 adds "In [the card\'s year], people ___."',
        watch: 'Right: "Who took the photo?" is the studio after "Photo by"; "When was the photo taken?" is the year on the back; "Where was the photo taken?" is the town after the studio. A date stamp shows when a card was mailed; on these cards it is the same year as the photo. On Level 3, anything the front shows is right: people wore hats, the cars looked different. No answer key.',
      },
    },
    '1:ask-someone-older': {
      title: 'Ask Someone Older',
      objective: 'Children prepare questions, interview an older person they know (a family member, a neighbor, or someone at school) about his or her childhood, and tell the class one thing the interview taught them about the past.',
      routine: 'Day 1: read the page\'s questions aloud and add one the class wants to ask. Practice: you are the older person; children ask, listen, and draw or write your answer. Each child chooses anyone older he or she knows. Ask a few staff members ahead (the librarian, the custodian, the principal) to be interviewed at school by any child who wants. Day 2, a few days later: children tell one thing they learned. A child may pass.',
      note: {
        mistake: 'Children think older people never played games or went to school. They ask yes-or-no questions and get one-word answers, or let the person answer about today instead of long ago.',
        words: 'Say: "An older person is a source: he or she remembers things we never saw." Model a follow-up: "What was your favorite game? How did you play it?" Every question, the child\'s own too, starts "When you were little," so the answers are about the past; read them aloud first. Level 1 has two of the three questions (lunch, getting to school, games), each with a box to draw the answer. Level 2 has all three, a line for each, and one box to draw one answer. Level 3 has two, "My own question," and "I learned that ___." On the top line, a first name or "my neighbor" is enough.',
        watch: 'There is no wrong answer: every answer is the older person\'s, and every question is the child\'s. Any older person the child knows is right. A child who cannot ask anyone outside school does the interview with you or another adult at school, and no one asks why. Never ask a child to tell more about home than he or she wants. A strong "I learned" compares then and now: "My neighbor walked to school. I ride the bus." No answer key.',
      },
    },
    '1:school-play-long-ago': {
      title: 'School and Play Long Ago and Today',
      objective: 'Children compare a school day and games of about 100 years ago with their own, read what a child back then might have said about school, and tell which school they would like and why.',
      routine: 'Show photos of a one-room school from long ago (the Library of Congress has many) or read a picture book about one. Pass around a small whiteboard as a slate and a cup as a tin lunch pail. Outside, children roll a hula hoop with a stick or a ruler. Make a T-chart, "Long ago" and "Today": children name things for each side (a slate, a tablet; walking with a tin pail, riding the bus).',
      note: {
        mistake: 'Children think "long ago" means when their parents were small, or the time of the dinosaurs, and that children long ago did not play. Some circle "today" for walking to school, because they walk to school too.',
        words: 'Say: "About 100 years ago, many children learned in one room, big and little children together. They wrote on slates, and their pens had no ink inside, so they dipped the tip in a bottle of ink." Day 2, the page: name each picture first; they change from copy to copy (a one-room school, a pen you dip in ink, walking to school with a tin pail, a hoop and stick; a big school, a computer, a school bus, a game on a tablet). Level 1 has four pictures. Level 2 adds three things a child said ("I dip my pen in ink."). Level 3 adds "I would like to go to school (long ago / today) because ___."',
        watch: 'Right, long ago: the one-room school, the dip pen, the tin pail, the hoop and stick, and the sentences about ink, a slate, a tin pail, or one room. Today: the big school, the computer, the school bus, the tablet, and the sentences about the bus, typing, a tablet, or a video. A child who says children walk to school today too is right: "Look at the tin pail and the old clothes." On Level 3 there is no wrong answer. No answer key.',
      },
    },
    '1:map-key': {
      title: 'Read the Map Key',
      objective: 'Children read a map key, follow step directions on a grid, and make their own map with a key.',
      routine: 'Session 1: draw the classroom from above with a key and count its tables. Session 2: on a 4-by-4 grid taped to the floor, with everyone facing the board, a child walks the steps the class gives. On The Rail That Waits, cards also turn the beetle; on paper you only move. Session 3: children map the classroom or a pretend island, with a key.',
      note: {
        mistake: 'Children count the key\'s symbol as one on the map, or count the start square as step 1.',
        words: 'Session 1: an island map with a count box for each key symbol. Session 2: say, "Up and north are the top of the page." Two, three, or four steps by level.',
        watch: 'Right: each count matches the island, never the key; a bridge is where the road crosses the river. Step off the start before counting squares. A child\'s own map is right when its key has every symbol.',
      },
    },
    '1:city-suburb-town': {
      title: 'City, Suburb and Small Town',
      objective: 'Children compare pictures of a big city, a suburb, and a farm town, read short sentences about how people there live, travel, and get food, and write the letter of the community each sentence tells about.',
      routine: 'Show three photos: a city street with tall buildings, a suburb with houses near a shopping center, and a farm town with fields. Make a three-column chart and ask for each: "How do people get around? Where do they live? Where do they shop?" Read sentence strips ("I ride the subway to work."); children tape each under its place. Tell the class which kind of place our school is in.',
      note: {
        mistake: 'Children think a suburb is the same as a city, or that farm towns have no stores. They match by one word: "tall" is in both the silo sentence and the apartment sentence.',
        words: 'Say: "A city has tall buildings and many people close together. A suburb has houses and shopping centers near a city. A farm town is a small town with farms and fields around it." Day 2, the page: the places are lettered, and the letters change order from copy to copy: read them first. Each sentence fits one picture by something drawn only there: the subway and the tall buildings in the city, the shopping center and the garages in the suburb, the corn and the silo in the farm town. Level 1 has two places and three sentences, Level 2 three places and six, and Level 3 six and "I live in a ___. We get food from ___."',
        watch: 'Right: the subway and the tall apartment building, the city; the shopping center and the garage, the suburb; the corn and the silo, the farm town. Check the letters on that copy. On Level 3 there is no wrong answer: a child on a farm or in an apartment writes what fits, and any food source is a good answer (a store, a market, a garden, a farm, school lunch). Never ask more about home than the child wants to tell. No answer key.',
      },
    },
    '1:work-fits-land': {
      title: 'Work That Fits the Land',
      objective: 'Children match places (the ocean coast, a forest, flat farmland, snowy mountains) to the work people do there (fishing, cutting lumber, growing wheat, teaching skiing), and tell how the land makes that work possible.',
      routine: 'Show four photos: an ocean coast with boats, a forest, flat farmland, snowy mountains. Ask: "What does this land have? What work could people do here?" Children act out each job without words (pulling in a fish, carrying a log, driving a tractor, skiing), and the class guesses the land. Then ask: "What work do people do near us because of our land or water?"',
      note: {
        mistake: 'Children think any job can be done anywhere: skiing on a farm, fishing in a forest. They match the forest and the farmland because both are full of plants, without asking what grows there.',
        words: 'Say: "People do work that fits the land: the ocean has fish, the forest has trees, flat farmland has rich soil, the mountains have snow." Ask: "What does this land have that the worker needs?" Day 2, the page: name the workers by what they hold: a person who fishes (a fish and a crab trap), a lumber worker (a log), a wheat farmer (a tractor), a ski teacher (on skis, with a child). Level 1 has two workers and two places, Level 2 all four, and Level 3 all four, then "Place: ___" for one place the child picks and "People can ___ there because the land has ___."',
        watch: 'Right: the person who fishes, the ocean coast; the lumber worker, the forest; the wheat farmer, flat farmland; the ski teacher, snowy mountains. On Level 3, any true sentence about one of the four places is right: Place: a forest. "People can cut lumber there because the land has many tall trees." No answer key.',
      },
    },
    '1:caring-for-places': {
      title: 'Caring for the Places We Share',
      objective: 'Children compare pictures of a park in the morning, after careless people in the evening, and on a clean-up day, circle what people changed and who helps, and plan one way the class can care for the schoolyard.',
      routine: 'Walk the schoolyard. Children point to signs of care (a trash can, a garden, a path) and things that need care (litter, stepped-on plants). Back in class, list ideas: pick up litter wearing gloves with a grown-up, put trash in the can, water a plant, stay on the path. The class picks one plan and does it this week. Children never pick up glass or anything sharp.',
      note: {
        mistake: 'Children think the wind or animals made the mess, or that a park takes care of itself. They circle things that look the same in both pictures, and on clean-up day they circle everyone, even the person who is only walking a dog.',
        words: 'Say: "A park belongs to everyone, so everyone takes care of it." Day 2, the page: the same park in the morning and in the evening, and on Levels 2 and 3 on a clean-up day. The changes differ from copy to copy (a candy wrapper on the grass, a cup left on the bench, a plastic bag in the pond, a branch broken by a rope swing, flowers stepped on, the trash can knocked over), and each change is one thing to circle. Level 1 has two pictures and three changes; Levels 2 and 3 three pictures and five changes, and children circle each person who helps. Level 3 adds "Our schoolyard: Our class can ___."',
        watch: 'Right: one circle for each change, as many as the page asks (3 on Level 1, 5 on Levels 2 and 3). Every change was made by people: a shoe print is in the flower bed, and the branch broke when someone swung too hard on the rope swing. On clean-up day, circle each helper, each fixing one change; the person walking a dog is visiting, not helping. On Level 3, any real way to help is right. No answer key.',
      },
    },
    '1:us-symbols': {
      title: 'Symbols of the United States',
      objective: 'Children match American symbols (the flag, the bald eagle, the Statue of Liberty, the Liberty Bell) to their names, read short sentences about them, and tell why freedom and fairness for all matter in a class too.',
      routine: 'Look at the class flag and pictures of the bald eagle, the Statue of Liberty, and the Liberty Bell. Say: "A symbol stands for something bigger, the way a stop sign means stop." Ask: "Freedom means we can make choices. Fair for all means everyone gets a turn. Where do we see freedom and fairness in our class?" Children share ideas for a class symbol, and you sketch a few on the board.',
      note: {
        mistake: 'Children think the Statue of Liberty is a real person, or that the Statue and the Liberty Bell are in the same city. They think a symbol is only a picture of a thing, not an idea. Some count the stripes as states.',
        words: 'Say: "The flag has 13 stripes for the 13 colonies and 50 stars for the 50 states. The bald eagle is our national bird. The Statue of Liberty, in New York Harbor, stands for freedom. The Liberty Bell, in Philadelphia, has a big crack." Day 2, the page: read each sentence aloud; it says "It," never the name. Level 1 has two of the symbols, and children trace each name three times. Level 2 has all four and a word box: children write each name. Level 3 adds a box to draw a symbol for our class and "It stands for ___."',
        watch: 'Right: "It has 50 stars, one for each state": flag; "It is our national bird": bald eagle; "It stands for freedom": Statue of Liberty; "It has a crack. It is in Philadelphia": Liberty Bell. Accept a name copied with small slips when it names the right symbol. On Level 3 there is no wrong answer: a heart for kindness, a book for learning; ask, "What does it stand for?" No answer key.',
      },
    },
    '1:washington-lincoln': {
      title: 'George Washington and Abraham Lincoln',
      objective: 'Children learn that George Washington was the first president and that Abraham Lincoln, the 16th, led the country through the Civil War and worked to end slavery, and sort the sources that tell us about them.',
      routine: 'Show a real quarter and a penny: "George Washington, our first president, is on the quarter. Abraham Lincoln, our 16th president, is on the penny." Tell each story simply: Washington led the army in the war for independence and became our first president. Lincoln led the country through the Civil War, when the North and the South were divided, and worked to end slavery, when people were enslaved: made to work without pay and not allowed to leave.',
      note: {
        mistake: 'Children circle Lincoln for the coin because Lincoln is on the penny, and Washington for the Lincoln Memorial because it is in Washington, D.C. They think the two lived at the same time; Washington died before Lincoln was born.',
        words: 'Say: "A source tells us about the past. A painting shows how a person looked; a letter, words the person wrote; a coin and a building were made later to remember the person." Day 2, the page: children write the kind of source from the word box, then circle the president. The painting has a name plate; the letter is signed "A. Lincoln"; the quarter is shown front and back at real size, the back an eagle and QUARTER DOLLAR (a newer quarter\'s back may differ); the memorial has a small statue inside. Level 1 has two sources (the quarter adds a ring: "Put a real quarter here."). Level 2 has all four, Level 3 all four and "I would most like to see the ___ because ___."',
        watch: 'Right: painting, George Washington; coin, George Washington; letter, Abraham Lincoln; building, Abraham Lincoln. "Quarter" or "memorial" is right too. If children ask about the war or slavery, answer simply and truthfully, as much as you judge right. No answer key.',
      },
    },
    '1:fourth-of-july': {
      title: 'Why We Have the Fourth of July',
      objective: 'Children hear how the 13 colonies declared independence from Great Britain on July 4, 1776, circle the sentences that are real reasons the colonists gave (they wanted to make their own laws; they did not want taxes they had no say in), and tell a reason in their own words.',
      routine: 'Put on a paper crown and play the king: "From now on, I choose every recess game, and you each pay me two crayons a week." Ask: "Is that fair? Did you have a say?" Tell the story: long ago, the king of Great Britain, far across the ocean, ruled the 13 colonies, and laws and taxes were made for them without their say. On July 4, 1776, their leaders approved the Declaration of Independence: the colonies would make their own laws. Then the class makes one rule together, with everyone\'s say.',
      note: {
        mistake: 'Children think the Fourth of July is about fireworks, or is the flag\'s birthday. They think the colonists wanted a new king or more taxes. They skip the "not" in "They did not want to pay taxes they had no say in."',
        words: 'Say: "Taxes are money people pay to run the country. The colonists did not want taxes they had no say in. They wanted to make their own laws and choose their own leaders." Day 2, the page: read the caption and each sentence aloud, stressing "not." The small picture by each sentence helps children find it; it does not show which are true. Level 1 has two sentences, one real. Level 2 has four, and Level 3 four and "The colonists wanted ___." The number of real reasons changes from copy to copy.',
        watch: 'Right: "They wanted to make their own laws," "They did not want to pay taxes they had no say in," "They wanted to choose their own leaders." Not reasons: a new king, moving to Great Britain, more taxes to the king. On Level 3, any true reason in the child\'s words is right: "to make their own rules," "to rule themselves." No answer key.',
      },
    },
    '1:people-made-fairer': {
      title: 'People Who Made Life Fairer',
      objective: 'Children hear short true stories of people who worked to make life fairer (Martin Luther King Jr., Rosa Parks, Ruby Bridges, Helen Keller), read one fact about each, and write a question they would like to ask one of them.',
      routine: 'Tell two stories a day. Rosa Parks: in 1955 in Montgomery, Alabama, an unfair law made Black riders give up their bus seats to white riders; she calmly said no, and people worked together until the law changed. Ruby Bridges: some schools would not let Black children in; in 1960 in New Orleans, at six, she started first grade at a school that had been for white children only. Helen Keller could not see or hear; her teacher spelled words into her hand, and she learned to read, wrote books, and worked for people with disabilities. Dr. King led peaceful marches for fair laws in many places in our country.',
      note: {
        mistake: 'Children hear "would not give up her seat" as not sharing: say plainly that the law was unfair. They think each person changed things alone, or that Rosa Parks was only tired; she said she was tired of giving in. They think Helen Keller could not learn.',
        words: 'Say: "Each of these people saw something unfair and worked with many others to make it fairer." Model a question: "Why did you say no?" Day 2, the page: each card names the person and prints one true sentence; read them aloud. Level 1 has two of the four people and "Why did you ___?" Level 2 has all four, "Circle Why or How," and one question. Level 3 has two questions and "___ matters because ___."',
        watch: 'There is no wrong answer: every question and reason is the child\'s own. A good question is about the person\'s story ("How did you learn to read?"). If a child asks more, answer simply and truthfully, as much as you judge right. Ruby Bridges has written books for children about her school. No answer key.',
      },
    },
    '1:goods-services-near-far': {
      title: 'Goods and Services Near and Far',
      objective: 'Children sort pictures into goods (things people make or grow) and services (work someone does for you), and read short labels to tell which goods in a sample town are made there and which come from far away.',
      routine: 'Lay two hoops on the floor: Goods and Services. Put real goods in one (a banana, an apple, a T-shirt) and act out services for the other: brush a doll\'s hair, read a story, deliver a paper letter. Ask: "Is it a thing people made or grew, or work someone does for you?" Read the sticker on the banana if it names a country, find that country on the globe, then find our town.',
      note: {
        mistake: 'Children think a service is a thing: the bus is a thing, but a bus ride is the driver\'s work. They think goods just come from the store, and that our bananas grow nearby; most are grown far away, in warm countries.',
        words: 'Say: "Goods are things people make or grow. Services are work someone does for you." Day 2, the page: name each picture first; they change from copy to copy (bread, milk, bananas, apples, a T-shirt, a kite; a haircut, a checkup at the doctor, a bus ride, story time at the library, mail brought to your home, a tooth cleaning). Read the key: color the box under each picture yellow for goods, green for services. Level 1 has four pictures, Level 2 eight, and Level 3 eight and a map of a sample town (a bakery, a dairy farm, an apple orchard, homes) with labels: read them aloud, and children circle each label about a good from our town.',
        watch: 'Right: bread, milk, bananas, apples, the T-shirt, and the kite are goods (yellow); the haircut, checkup, bus ride, story time, mail, and tooth cleaning are services (green). On Level 3, the three labels about bread, milk, and apples from our town are circled; the one or two about goods grown far away (bananas, pineapple) are not. For the bus ride, ask, "Who does the work?" No answer key.',
      },
    },
    '1:jobs-earning-money': {
      title: 'Jobs and Earning Money',
      objective: 'Children read short sentences about workers who earn money (a baker, a bus driver, a dentist, a farmer), match each worker to what he or she is paid for, and tell what families use the money they earn for.',
      routine: 'Play "What is my job?": a child acts out a job without words (a baker, a bus driver, a dentist, a farmer, a teacher), and the class guesses. Ask: "What is this worker paid for?" Then sort picture cards into two piles: what money can buy (food, clothes, shoes) and what money cannot buy (the sun, a hug, a rainbow). Never ask about the jobs or money of a child\'s family.',
      note: {
        mistake: 'Children think money comes from a bank machine or a card, not from work. They think money can buy anything, even a hug. Some do not know what rent is.',
        words: 'Say: "A job is work people are paid for. Pay buys what a family needs: food, clothes, a home. Rent is money paid to live in a home." Ask: "What does this worker do to earn money?" Day 2, the page: read each sentence aloud ("I am paid to bake bread."). The workers have no names: find the baker by the tall white hat and the rolling pin, the bus driver in the bus, the dentist by the big tooth, the farmer by the basket of food. Level 1 has two workers and four pictures to circle or leave, Level 2 four workers and five pictures, and Level 3 the same and "I would like to be a ___. I would be paid to ___."',
        watch: 'Right: bake bread, the baker; drive people, the bus driver; check teeth, the dentist; the food I grow and sell, the farmer. Circled: food, rent for a home, clothes, shoes. Not circled: the sun, a hug, a rainbow: "Some of the best things cannot be bought." On Level 3, any job with a true pay sentence is right ("a vet, paid to help sick animals"). Caring for a home and family is work too, even when no one is paid. No answer key.',
      },
    },
    '1:prices-market': {
      title: 'Prices at the Market',
      objective: 'Children read price tags at a pretend market, find the pennies, nickels, dimes, and quarters that pay each price exactly, and tell which of two things costs more.',
      routine: 'Pass around a real penny, nickel, dime, and quarter; say each name and value, and how to tell them apart. Set up a class market: small things with sticky-note price tags under 50 cents. Partners take turns as shopper and seller with real or play coins: the shopper pays the exact price, and the seller counts it. Hold up two things: "Which costs more? How do you know?" Then practice on the Money Mat.',
      note: {
        mistake: 'Children count coins, not cents: they call 4 coins 4 cents. They think a bigger coin is worth more, but the dime, the smallest, is worth more than the penny and the nickel. Some circle every coin on the tray.',
        words: 'Start with the biggest coin and count on: "25; 35 for the dime; 40 for the nickel; then 41, 42 for each penny." Day 2, the page: the coin key at the top shows each coin of the level at its real size, with its name and value. The tray coins have no numbers: children match each to the key. The nickel looks like nickels made since 2006; older ones show Jefferson\'s side. New pennies are not made anymore (since 2025), but pennies still count as money. Each thing at the stall has a price tag and a tray: circle the coins that pay its price exactly. Then: "Which costs more? Circle it." Level 1: two things, 3 to 9 cents, pennies and one nickel. Level 2: three things, up to 25 cents, dimes too. Level 3: three things, up to 50 cents, all four coins, a quarter on every tray.',
        watch: 'On this page, only one set of coins on each tray pays the price; the pennies are alike, so any of them will do. Some coins are left over. Say: "At a real store, any coins that make the price exactly would work." In "Which costs more?", the bigger price is right. No answer key.',
      },
    },
    '1:saving-goal': {
      title: 'Saving for a Goal',
      objective: 'Children follow a child who saves one dollar a week for a goal, color the savings jar week by week, and tell why people save money for something they want later.',
      routine: 'Draw a jar of five parts on the board for a pretend class goal: a $5 kite. Pretend each day is one week: each day, a child drops a paper dollar into a clear cup, and the class colors one part from the bottom up and says, "Week 1, one dollar." Ask: "How many weeks until we have 5 dollars? Why not spend each dollar right away?" Never ask about a child\'s money at home.',
      note: {
        mistake: 'Children color the whole jar at once, or stop at the number in the "After ___ weeks" question. They think saving means you never get the thing. Some do not see that at one dollar a week the weeks and the dollars are the same number.',
        words: 'Say: "To save is to keep money now to buy something later." Ask: "After 2 weeks, how much is in the jar?" Day 2, the page: read the story aloud; the name and the goal change from copy to copy (Kim, Leo, Nia, or Ben saving for a kite, a ball, or a book). Children color one part of the jar for each week, from the bottom, until it is full. Level 1 has a $3 goal and a jar of 3 parts. Level 2 has a $5 goal, 5 parts, and a question like "After 4 weeks, Nia has $___." Level 3 adds a box, "my goal ($20 or less)": children draw a goal of their own and write its price and the weeks they need.',
        watch: 'Right: every part colored by the end; the weeks are the price (3 or 5); after 2, 3, or 4 weeks, the jar holds that many dollars; and "to buy it later." On Level 3, any goal of $20 or less is right when the weeks match the price ($8, 8 weeks); a pretend goal is fine. No answer key.',
      },
    },
  },
};
