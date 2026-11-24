'use strict';
/**
 * Teacher notes, English, social studies: the 20 lessons of the five Kindergarten social studies units (Daily Teaching
 * System, Stage D-3, 2026-11-24): Me and My School; My Family; Helpers, Needs and Wants; Our Country and Being Fair;
 * Maps, Places and Getting Around (units in scripts/units/year/place-ready-k.en.social.js; design
 * scripts/units/year/design.en.social.json, grade K). Each note was written from the pages the lesson hands out, read at
 * every level: the new pages K-712 to K-726 from their text dump and sheets (lcs-stage-d/batch-sk) AS FIXED in review
 * round 1 after the US Kindergarten teacher's page review (batch-sk/REVIEW.tsv: the bars of 20 boxes, the star and the
 * new tie rule of the vote, "the one you do not pick", the varied kind / not-kind split, the round diya and the pumpkin
 * pie, the brown doors on the map, the circled word on Dr. King's page, and the rest), the published pages (K-377,
 * K-563, K-370, K-375, K-213, K-212, K-210, K-206) from their generators and fresh renders (lcs-stage-d/notes-sk); K-213
 * re-rendered after its mechanic pair was retired (its level 1 adds one picture that belongs to no helper on the page).
 * Where a lesson hands out two pages, the note describes the first and names the second. Pictures that change from
 * copy to copy are named as the pool they come from, never as one copy.
 * Every lesson has its routine (`routine`), printed under "What the class does" before the page. Two lessons are
 * teacher-led (the school walk, the class vote): their routine is the lesson, and the page records it.
 * Kind and plain: every family is a family, and "the people who take care of me" is always a right answer; no child is
 * asked to show more about home than he or she wants; no tradition is the usual one; an unfair picture shows an action,
 * never a bad child; a vote is fair even when my book does not win; Dr. King's story has no violence on the page.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 2,000 letters in all, the routine included.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:class-rules': {
      title: 'Our Class Rules',
      objective: 'Children help make three or four class rules with picture signs, act out each rule, and tell how a rule keeps everyone safe or helps us learn.',
      routine: 'On the rug, ask: "What helps us stay safe and learn?" Agree on three or four rules and write each on chart paper with a quick picture sign: walking feet, a raised hand, hands cleaning up, eyes on the book. Children act out each rule: walk to the door, raise a hand and wait, put the blocks back in the bin. Everyone signs the chart with a name or a handprint, and it stays on the wall.',
      note: {
        mistake: 'Children think rules are only "no" rules, or that rules are there to get children in trouble. They think a child who breaks a rule is a bad child. Some circle the picture that looks like more fun.',
        words: 'Say: "A rule keeps everyone safe or helps us learn." Ask about each rule: "Does it keep us safe, or help us learn?" Day 2, the page: each row shows the same child at the same moment twice; read "or" between the pictures and say the rule: "We walk in the hall." "We raise a hand to talk." "We clean up our blocks." "We look and listen at story time." Children circle the picture that follows the rule and cross out the other. Level 1 has two rows, Level 2 all four, and Level 3 four rows and a box to draw one more class rule being followed.',
        watch: 'Right: walking in the hall, raising a hand, cleaning up the blocks, listening at story time. Crossed out: running, shouting out, walking away from the blocks on the floor, playing with a toy car at story time. Talk about the action, never the child: "Running in the hall is not safe." On Level 3, any rule being followed is right, also a rule of your own class; ask the child to tell you the rule. No answer key.',
      },
    },
    'K:take-turns-share': {
      title: 'Taking Turns and Sharing',
      objective: 'Children practice taking turns with the fair name jar and sharing materials at a table, then circle pictures of friends who take turns, share, or help.',
      routine: 'Write each child\'s name on a craft stick and put the sticks in a jar: the fair name jar. Pull a name for who goes first, and for every turn of the day. Give each table one box of crayons to share, and use a sand timer for turns with a favorite toy. Role-play asking, "May I have a turn when you are done?" and a tower knocked down by accident: the friend says sorry and helps build it again.',
      note: {
        mistake: 'Children think sharing means giving it away for good, and taking turns means waiting forever. They think "sorry" alone fixes it. Some think the child doing the unkind act is a bad child.',
        words: 'Say: "Kind friends take turns, share, and help." Ask: "Was that kind? How does the friend feel? What could you do instead?" Day 2, the page: name each picture first. Kind: two friends take turns on the slide; a friend shares the crayons; a friend helps up a friend who fell; a friend shares cookies at a picnic. Not kind: a child grabs a teddy bear from a friend; a child pushes in line; a child knocks down a friend\'s tower; a child tears a friend\'s drawing. Children circle the kind pictures and cross out the others. Level 1 has four pictures; Levels 2 and 3 have six, and Level 3 a box to draw "me helping a friend." Some pages have more kind pictures, some fewer, so children look at each one.',
        watch: 'Right: circle the slide, the crayons, the joined hands, and the cookies; cross out the grabbing, the pushing, the knocked-down tower, and the torn drawing. Talk about the act, not the child: "Grabbing is not kind. What could he say instead?" A child who says the friend can say sorry and help build the tower again is thinking well. On Level 3, any drawing of the child helping is right. No answer key.',
      },
    },
    'K:school-helpers': {
      title: 'Who Helps at Our School?',
      objective: 'Children walk the school with the teacher to meet the principal, the school nurse, the office staff, and the custodian, learn what each one is in charge of, and point to the person to ask for each kind of help.',
      routine: 'This lesson is the walk. A day ahead, ask each grown-up for two minutes of their time. Visit the office, the nurse\'s room, the library, and the cafeteria, and meet the principal and the custodian on the way. Each adult says in one sentence what they are in charge of and how a child asks them for help ("If you get hurt, tell your teacher, and your teacher sends you to me."). Take a photo of each. Back in class, show the photos, name a problem (a hurt knee, a spill, a book you want to find), and children point to the right person.',
      note: {
        mistake: 'Children think the teacher does every job, or that the principal is there only when someone is in trouble. They do not know who the custodian is, and think the nurse is only for big hurts.',
        words: 'Say: "Many grown-ups help at our school. Each one is in charge of something." Ask: "Who takes care of the books? Who helps when you get hurt?" Day 2, the page: name each problem and helper first. Problems: a hurt knee; a child who wants a book about dinosaurs; a big spill on the classroom floor; a child who needs a hot lunch; a well child in a coat, with a grown-up holding car keys, going home early. Children draw a line from each problem to its helper. Level 1 has three problems, Level 2 five, and Level 3 five and a box to draw a helper met on the walk.',
        watch: 'Right: the knee to the nurse, the dinosaur book to the librarian, the spill to the custodian, the lunch to the cafeteria cook, the early pickup to the office: "Your grown-up signs you out at the office." Watch for children who can say who is in charge where and whom to ask. The principal, in charge of the whole school, has no picture; name the principal on the walk. No answer key.',
      },
    },
    'K:birds-eye-view': {
      title: 'The Room from Above',
      objective: 'Children look at classroom things from the side and from above, match each thing to its view from above, and lay paper shapes on a big plan of our room to make a first map.',
      routine: 'Hold a cup, a block, and a book at eye level: that is the side. Set each on the floor; children look straight down: that is from above. Trace around the bottom of each on paper. On butcher paper, draw the room\'s walls; children glue cut-paper shapes for the tables, rug, bookshelf, and door where they really are: our first map.',
      note: {
        mistake: 'Children think a map is a picture taken from the side, so they look for legs, wheels, or a lamp\'s pole. Round things mix them up: a lamp, a round table, and a cone are all circles from above.',
        words: 'Say: "From above, like a bird looking down, we see only the top." Ask: "What would a bird on the ceiling see?" Day 2, the first page: an eye with a sideways arrow marks the side views; an eye with a down arrow, the views from above. Level 1 has four things, Level 2 five, Level 3 five with some top views turned. The second page shows a room from above, its furniture in letter tags: four things on Level 1, six on Levels 2 and 3, turned on Level 3.',
        watch: 'A right line goes to what you really see from the top: the car is a long box with its roof; the bed shows its pillow; a lamp is a circle in a circle, a round table one plain circle; a cone is circles on a square base. If a child hesitates, look down at the real thing together. No answer key.',
      },
    },
    'K:family': {
      title: 'Who Is in My Family?',
      objective: 'Children find each person on a picture family tree as the teacher reads the family words aloud, give each the right number, and tell one job someone at home does to help.',
      routine: 'Put the family words, each with a drawing, on the Picture Word Wall: mom, dad, sister, brother, baby, grandma, grandpa, aunt, uncle. Name each person of a puppet or picture book family. Each child tells one job someone at home does to help. "Someone at home" is always enough; no child has to name who lives there.',
      note: {
        mistake: 'Children answer from their own family instead of the starred child\'s: the star child\'s sister is "sister" even for a child who has none. They mix up mom and sister, or dad and uncle.',
        words: 'Say: "This is one family. The star shows the child, and each word tells who the person is to that child." Read each word aloud and follow the lines with your finger: Mom and Dad are joined by a line, their children hang below, the grandparents (white hair) sit above, and an aunt or uncle hangs from their line beside Mom or Dad. Level 1 has Mom, Dad, and one or two brothers or sisters (maybe a baby); Level 2 adds the grandparents; Level 3, an aunt or uncle, or a baby.',
        watch: 'The first page has an answer key. On Level 3 of the trace page, where words have no numbers, read each word aloud with the class before they trace it, then ask, "Who is the grandpa on the tree? What is his number?" Shaky writing is fine. The tree is a made-up family, not the child\'s.',
      },
    },
    'K:many-kinds-of-families': {
      title: 'Families Come in Many Shapes',
      objective: 'Children look at pictures of many kinds of families (one parent, two parents, a grandparent raising grandchildren, a foster family, big and small families), hear that every one of them is a family, and draw the people who care for them at home.',
      routine: 'Read aloud a picture book that shows many kinds of families. Then make a class chart: as children name families they know from books and shows, draw each with stick figures (a mom and a baby, two dads, a grandma and three kids, a big family with cousins). After each one, the class says together: "That is a family." Children tell about their own family only if they want to.',
      note: {
        mistake: 'Children think there is one right kind of family, with a mom and a dad, and that a grandparent raising grandchildren or a foster family is not a real family. They think people in one family must look alike.',
        words: 'Say: "A family is the people who love you and take care of you. Families come in many shapes." Point and name: a mom and her child; two dads and their twins; a grandmother and the two grandchildren she takes care of; a foster family, two parents and the children they care for; a big family with a grandpa and a baby; a dad and his teenager. After each: "That is a family." Level 1 has three families and a box to draw one person who cares for you. Level 2 has all six and a box to draw everyone at home. Level 3 adds a box for one thing your family does together. Say: "If you have two homes, draw one or both. You can draw anyone who takes care of you."',
        watch: 'There is no wrong answer: every drawing is the child\'s own family. Write the names the child says on the "names" line (Mom, Nana, Uncle Ray), and never ask for more than the child offers. A child who draws one grown-up, a foster parent, or a parent who lives away is right. If a child says a picture is "not a family," answer: "Every one is a family." No answer key.',
      },
    },
    'K:family-traditions': {
      title: 'Family Traditions',
      objective: 'Children look at pictures of traditions some families keep (a birthday, a Thanksgiving meal, Diwali lamps, a Lunar New Year visit), match each tradition to the thing that goes with it, and draw a tradition their own family keeps.',
      routine: 'Show things or pictures: a party hat, a pie tin, a small clay lamp, and a red envelope. Say: "A tradition is something a family does again and again, like a special meal or a celebration." Each child tells something the family does every year or week (a birthday cake, Sunday pancakes, a holiday visit, a bedtime story), and you write it on a chart with the child\'s name. A child may pass. Every family\'s tradition goes on the chart; none is the usual one.',
      note: {
        mistake: 'Children think every family keeps the same holidays, or that a tradition must be a big holiday. They think a tradition new to them is strange. Some think the red envelope is a birthday card.',
        words: 'Say: "Some families keep these traditions. Your family may keep others." Name each picture: a birthday party with a cake and candles; a Thanksgiving meal with a turkey and a pumpkin pie; Diwali, when families light small clay lamps called diyas; Lunar New Year, when families hang red lanterns and share oranges, and a grandparent gives a child a red envelope with a little money inside for good luck. Day 2, the page: each thing also appears in its family picture. Level 1 has two things and two pictures; Level 2 has four of each ("Each family picture gets one line"); Level 3 adds a box to draw a tradition your family keeps.',
        watch: 'Right: the party hat to the birthday, the pie to Thanksgiving, the diya to Diwali, the red envelope to Lunar New Year. On Level 3 there is no wrong answer: a family dinner, a visit to Grandma, or game night is a tradition. Never ask a child to explain a family\'s religion. A family that does not celebrate birthdays or holidays still has traditions (a Sunday walk, a story at bedtime): "Every family has its own." If a child says, "We don\'t do anything special," ask, "What is something you like to do with someone at home?" No answer key.',
      },
    },
    'K:long-ago-today': {
      title: 'Long Ago and Today',
      objective: 'Children compare pictures of things from long ago and today that do the same job, draw a line from each old thing to its new one, and ask a grown-up at home about a toy they played with when they were small.',
      routine: 'Lay two hoops on the floor: long ago and today. Show things or pictures: a candle and a flashlight, a horse and buggy and a toy car, a corded phone and a cell phone. Children place each in a hoop, then pair the two that do the same job. Ask: "How did people see at night before electric lights?" Send home the question: "What toy did you play with when you were little?"',
      note: {
        mistake: 'Children think "long ago" means the time of the dinosaurs, or that their parents grew up with horses and buggies. They think people long ago could not wash clothes, see at night, or talk far away, or that old things are bad.',
        words: 'Say: "Long ago, people had the same jobs to do: wash clothes, see at night, get around, talk to someone far away. They used different things." Name each picture: a washboard and tub, a candle in a holder, a horse and buggy, a telephone on the wall with a cord; a washing machine, a lamp, a car, a cell phone. Ask: "Which one does the same job today?" Day 2, the page: read the headings "long ago" and "today." Level 1 has two pairs, Level 2 four, and Level 3 four and a box for a toy a grown-up at home played with long ago. That box is take-home: send it home after the lines are done.',
        watch: 'Right: the washboard and tub to the washing machine, the candle to the lamp, the horse and buggy to the car, the wall telephone to the cell phone. A child who says we still use candles is right: "Long ago, candles were how people saw at night." On Level 3 there is no wrong answer; a child who cannot ask at home can ask you or another grown-up at school. No answer key.',
      },
    },
    'K:community-helpers': {
      title: 'Community Helpers and Their Tools',
      objective: 'Children match community helpers to the tools they use (a firefighter\'s ladder, a doctor\'s thermometer, a farmer\'s tractor), act out one job, and tell how that helper\'s work helps everyone in the community.',
      routine: 'Fill a prop box with cheap things: a toy stethoscope, a paper firefighter hat, a whisk, a toy hammer, a book, a garden trowel. A child picks one, acts out the job without words, and the class guesses the helper. Ask: "How does this helper help everyone in our town?" Name helpers the children may know: the firefighters at the station near school, the doctor, the school nurse.',
      note: {
        mistake: 'Children think a helper uses only one tool, or that a helper helps only one person. They think some jobs are only for men or only for women.',
        words: 'Say: "A community helper does a job that helps everyone, and each one uses tools." Ask: "Who uses this? How does it help?" Day 2, the page: name every picture first; the helpers change from copy to copy (a firefighter, a doctor, a nurse, a farmer, a chef, a teacher, a carpenter, a gardener). Say: "A man or a woman can do any of these jobs." Children draw a line from each helper to the tool he or she uses. Level 1 has four helpers and five pictures on the right: one is the tool of a helper who is not on the page, so it is left over. Level 2 has five of each, Level 3 six of each.',
        watch: 'Right: firefighter, ladder; doctor, thermometer; nurse, a needle for shots; farmer, tractor; chef, whisk; teacher, book; carpenter, hammer; gardener, rake. On Level 1 the left-over picture stays without a line, and that is correct. A child who says the teacher could use the hammer too is thinking: ask, "Which helper uses it for the job?" No answer key.',
      },
    },
    'K:wants-needs': {
      title: 'Needs and Wants',
      objective: 'Children sort pictures into needs (food, water, clothes, a home) and wants (toys, candy, a TV), and tell why a family buys what it needs first when there is not enough money for everything.',
      routine: 'Lay two hoops on the floor: needs, marked with a drawing of a house and an apple, and wants, marked with a toy. Pass out picture cards or clean, empty packages (a cereal box, a water bottle, a page from a toy catalog). Each child puts one in a hoop and tells why. Ask: "If a family has money for only some things, what does it buy first?" Use the Sorting Hoops tool to sort again. Never ask what children have at home.',
      note: {
        mistake: 'Children call everything they like a need ("I need candy"), and think a want is bad. They think a TV is a need because their family has one.',
        words: 'Say: "A need is something we must have to live: food, water, clothes, and a home. A want is something nice to have." Ask: "Can we live without it?" Day 2, the page: read the group names, Needs and Wants, and name each picture. Children draw a line from each picture to its group. Level 1 has four pictures, Level 2 six, Level 3 eight. Ask the family question again with the page: "Which of these would a family buy first?"',
        watch: 'Right: water, an apple, bread, a shirt, and a house are needs; a ball, a doll, candy, a TV, a balloon, and a bicycle are wants. A child who says a bike is a need to get to school is thinking: ask, "Could you walk or ride the bus?" Wants are not bad: everyone has some. Never comment on what a family has or buys. No answer key.',
      },
    },
    'K:choosing-one-thing': {
      title: 'Choosing One Thing',
      objective: 'Children choose between two things they cannot both have, circle their choice, put an X on the one they do not pick (the one they give up), and tell one good thing their choice brings and one thing it costs them.',
      routine: 'Set up a pretend class store with two things, such as a ball and a kite (pictures are fine). Give each child one pretend coin, a paper circle: it buys only one thing. Each child chooses, tells why, and says what he or she gave up. Then say: "Recess has time for one thing: play outside or paint." Children stand by the picture they choose.',
      note: {
        mistake: 'Children want to circle both, or think there is one right choice. They think a friend who chose the other thing chose wrong.',
        words: 'Say: "You can have only one. The one you do not pick is the one you give up." Day 2, the page: read each row aloud; the rows change from copy to copy. One pretend coin buys a ball or a kite, or an ice cream or a lemonade; at recess you can play outside or paint; you can take home one library book, about trucks or about dinosaurs. Each row starts with a small "1" and an arrow, with a hand holding one coin or one book: it shows what you have only one of, and it is not a choice. The recess row shows only the "1": say, "Recess has time for one thing." Level 1 has two rows, Level 2 three, and Level 3 three rows and a box to draw yourself with the thing you picked in the last row.',
        watch: 'There is no wrong answer. Check only that every row has one circle and one X. Ask: "What is one good thing about your choice? What did you give up?" Two children who choose differently are both right. On Level 3, the drawing shows the child with the thing circled in the last row. No answer key.',
      },
    },
    'K:goods-and-services': {
      title: 'Who Makes It? Who Does It?',
      objective: 'Children match workers to the goods they make or the services they give (a baker and bread, a builder and a house, a barber and a haircut, a mail carrier and a letter), and tell one thing each worker had to learn to do the job.',
      routine: 'Set up a pretend Main Street: a bakery with play dough bread, a barbershop with a comb and a mirror (no scissors), and a post office with paper letters for class mailboxes. Children take turns as workers and customers. Then sort on the board: things a worker made, that you can hold (bread, a house), are goods; things a worker did for you (a haircut, bringing the mail) are services.',
      note: {
        mistake: 'Children think goods just come from the store and nobody makes them. They think a service is not real work because you cannot hold it, and that the mail carrier writes the letters.',
        words: 'Say: "Goods are things people make. Services are things people do for us." Ask: "Does this worker make something or do something? What did the worker have to learn?" Day 2, the page: name the workers by what they wear and hold (the baker\'s tall hat and rolling pin, the builder\'s hard hat and hammer, the barber\'s pole, comb, and scissors, the mail carrier\'s bag of letters) and the results (bread, a house, a child with a new haircut, a letter in a mailbox). Children draw a line from each worker to what he or she makes or does. Level 1 has two workers, Level 2 four, Level 3 four and two boxes: a job I want to learn, and what it makes or does.',
        watch: 'Right: baker, bread; builder, house; barber, haircut; mail carrier, the letter in the mailbox. Bread and a house are goods; a haircut and bringing the mail are services. On Level 3 there is no wrong answer; ask, "Does your job make something or do something?" No answer key.',
      },
    },
    'K:our-flag': {
      title: 'Our Country and Its Flag',
      objective: 'Children learn that our country is the United States of America, that its leaders (the president for the whole country, the mayor for a town) help make and carry out rules for everyone, and color the flag with its red and white stripes and its blue box of stars.',
      routine: 'Look closely at the classroom flag. Count the stripes together and find the red stripes at the top and the bottom. Say: "Our country is the United States of America. The 13 stripes stand for the first 13 colonies, and the 50 stars for the 50 states." Then talk about leaders: the line leader helps our class, the mayor leads our town or city, the president leads the whole country. Children name a rule that leaders help everyone follow.',
      note: {
        mistake: 'Children count only the red stripes, or think there is one stripe for each star. They think the president makes every rule alone, or that the flag belongs to one person.',
        words: 'Say: "Leaders help make rules and help everyone follow them." Ask: "Who leads our whole country? Who leads our town?" Name your mayor, or your town\'s leader. Day 2, the page: show the small colored flag and the red, white, and blue crayon chips. Level 1: children color the stripes with the red dots red, leave the other stripes white, color the box blue around the stars, and leave the stars white. Level 2 has no dots: red and white stripes, red at the top and the bottom. Level 3 adds "How many stripes?": children count and circle the number.',
        watch: 'Right: 7 red and 6 white stripes, red at the top and the bottom, and a blue box with white stars in the top left corner. Kindergarten coloring is rough; check the order of the colors, not the edges. On Level 3, 13 is right; a child who circles 12 may have counted the lines between the stripes: count again together, touching each stripe. The leaders are not on the page; the talk carries them. No answer key.',
      },
    },
    'K:martin-luther-king': {
      title: 'Martin Luther King Jr.',
      objective: 'Children hear the true story of Martin Luther King Jr., who worked peacefully with many others to change unfair laws that kept Black people and white people apart, and draw one way they can be fair and kind to everyone.',
      routine: 'Tell the story simply: "Long ago, in many places in our country, there were unfair laws that kept Black people and white people apart: at school, on the bus, even at water fountains. Martin Luther King Jr. worked with many other people to change those laws. He used words and marches, never fighting." Then make a fairness chain: each child draws one way to be fair or kind on a paper strip, and the class links the strips into one chain. Teach it near Martin Luther King Jr. Day, the third Monday in January.',
      note: {
        mistake: 'Children think Dr. King changed the laws all by himself, or mix him up with Abraham Lincoln. The building in the picture is the Lincoln Memorial; say, "Dr. King spoke on the steps of a building that honors President Lincoln, who lived long before him." They think it is happening now, or that people with different skin colors cannot be friends.',
        words: 'Say: "This was long ago, in 1963, in Washington, D.C. Dr. King is speaking to a huge crowd of people of many colors who came to ask for fair laws." Ask: "How can we be fair and kind to everyone?" Day 2: find him small at the top of the steps, the crowd in front. Level 1: children draw themselves and a friend being fair; Level 2, a game where everyone gets a turn. Level 3 adds "my word": read fair, kind, and share aloud; the child circles the one that fits the drawing.',
        watch: 'There is no wrong answer: any drawing of children taking turns, sharing, or playing together is right; ask the child to tell you about it. Any of the three words can fit; ask, "Why that word?" Friends of any skin color are right. If a child asks more about Dr. King\'s life, answer simply and truthfully, as much as you judge right; the page shows no violence. No answer key.',
      },
    },
    'K:fair-for-everyone': {
      title: 'Fair for Everyone',
      objective: 'Children look at pairs of pictures of fair and unfair moments (one child keeping the swing, children taking turns on it), circle the fair ones, and act out how to make an unfair moment fair.',
      routine: 'Act out three moments: a chair is the swing, paper circles are crackers, and a ball is the game. First you (or a puppet) play the one who keeps the swing, keeps all the crackers, or is left out of the game; then the class shows how to make it fair: take turns with a sand timer, share the crackers so everyone has the same, invite the friend in. Ask the class: "How do you think the left-out friend felt?" Children act only parts they agree to.',
      note: {
        mistake: 'Children think fair means "I get what I want," or that whoever got there first keeps it. They think the child in the unfair picture is a bad child.',
        words: 'Say: "Fair means everyone gets a turn, a share, and a place in the game." Ask: "Is this fair to everyone? How could we make it fair?" Day 2, the page: each row shows the same children at the same moment twice; read "or" between them and name the moment: the swing, the crackers, the ball game. Children circle the picture that is fair to everyone. Level 1 has two rows, Level 2 three, and Level 3 three rows and one more picture, one child with all the crayons: children draw it made fair in the box.',
        watch: 'Right: children taking turns on the swing, the same number of crackers for each child, everyone in the ball game. Talk about the act, never the child: "Keeping the swing is not fair to the others." On Level 3, any fair drawing is right: the crayons shared, a box in the middle of the table, or a friend handing some over. No answer key.',
      },
    },
    'K:class-vote': {
      title: 'Our Class Vote',
      objective: 'Children vote once each with a picture ballot to choose the next class read-aloud, watch the votes become a class graph, and learn that the choice with the most votes wins and the whole class goes along with it.',
      routine: 'Show the real book for each cover, or name it. Each child circles one book (or taps once on the Class Graph). Then call each book in turn: the children who circled it stand up (or each drops a cube in that book\'s cup), and the class counts them aloud together. Everyone colors one box for each vote. The most votes wins; the class reads that book. Day 2: vote on a new question.',
      note: {
        mistake: 'Children vote twice, or vote for the book a friend picks. They think a vote is unfair when their book does not win, or that the winner is the "best" book.',
        words: 'Say: "Each person gets one vote. The most votes wins, and we all go along with it." Ask: "How many votes did this book get? Which book has the most boxes colored?" Count to 20 with the class. Each book has two rows of ten boxes, numbered 1 to 20 like a twenty-frame, and a star to color by the book that won. Color from 1 across the top row to 10, then go on in the bottom row from 11. The numbers above and below the boxes show the way. Read the tie rule on the page aloud. Level 1 has two books, Level 2 three books and "Did my book win?", Level 3 also a box by each book for its votes and two boxes to draw the choices for a new vote.',
        watch: 'There is no wrong answer: each vote is the child\'s own. Watch for children who vote only once, wait their turn, and can say what happens when their book did not win: "It is still fair. We read the winner." Check that each book has as many colored boxes as the class counted. If more than 20 children pick one book, that book has won. If two books tie for the most votes, vote again on just those two; if they tie again, read both, one today and one tomorrow. No answer key.',
      },
    },
    'K:land-and-water': {
      title: 'Land and Water on the Globe',
      objective: 'Children look at a globe, find that blue shows water and green or brown shows land, notice that there is more water than land, and color the land and water on a picture of the Earth.',
      routine: 'Toss an inflatable globe around the circle, or pass the class globe. Whoever catches it looks at one thumb: is it on water or on land? The class keeps a tally on the board. After 20 catches, count. Most of the time there are more water marks; if not, toss 20 more. Say: "A globe is a small model of the Earth. Blue is water. On many globes the land is green and brown; on some, each country has its own color, but the water is always blue."',
      note: {
        mistake: 'Children think the blue is sky, or that there is more land than water because we live on land. They think the globe shows only our country.',
        words: 'Say: "There is more water than land on the Earth." Ask: "Is your thumb on land or on water?" Day 2, the page: the picture shows one side of the Earth, with North and South America facing us. Read the key: water blue, land green. Level 1 has the big land shapes, with a blue dot in each ocean and a green dot in each big land shape to start from (the thin island beside Greenland has none: it is land too). Level 2 has all the land, plain, and asks, "Is there more water or more land?": children circle the wave or the tree. Level 3 asks the same question and adds a star: find the United States on the class globe first, then draw the star on it on the page.',
        watch: 'Right: the oceans blue and the land green; the strip at the right edge is part of Africa and Europe, and it is land. On Levels 2 and 3, the wave, more water, is right. On Level 3, the star goes in the middle of North America, below Canada and above Mexico. A star on Alaska is also in the United States. Coloring will be rough; check only that land and water are not swapped. No answer key.',
      },
    },
    'K:neighborhood-map': {
      title: 'A Map of a Neighborhood',
      objective: 'Children look at a picture map of a neighborhood seen from above, find the school, the park, and the fire station by their map pictures, and draw a path from a house to the school.',
      routine: 'Lay masking-tape streets on the floor and set toys or block buildings between them: a school, a park with a toy tree, a fire station with a toy fire truck, houses. Children stand and look down: that is how a map shows the town. Make a key: a sticky note for each place, with the same small picture. Children take turns driving a toy car along the streets from a house to the school.',
      note: {
        mistake: 'Children think a map is a picture taken from the side, or that a map picture is as big as the place. They think north means "up in the sky," and cut across blocks instead of following the streets.',
        words: 'Say: "The streets are drawn from above, like a bird sees them. Each little picture shows what is on that block. The key tells what each picture means, and the N arrow points north, to the top of the map." Ask: "Which picture in the key means school? Where is it on the map?" Day 2, the page: Level 1 has the school, the park, and the house with the red door, with a dotted path to trace from the red door to the school. Level 2 adds a fire station (a fire truck in its door), a store, and more houses with brown doors, and children draw the path along the streets themselves. Level 3 adds an empty lot: children draw their own house there and a path along the streets to the park. On Levels 2 and 3, ask: "Where is the fire station? Find it in the key, then on the map."',
        watch: 'Right: the school (bell tower and flag) circled, the park (trees and a pond) with an X. Any path is right if it starts at the red-door house, stays on the streets, and ends at the school. On Level 3, any house is right; the path to the park stays on the streets. No answer key.',
      },
    },
    'K:transport-flying': {
      title: 'On Land, on Water, in the Air',
      objective: 'Children sort vehicles by where they travel (on land, on water, in the air) and things that can fly from things that cannot, and tell how people and the things we buy get from place to place.',
      routine: 'Lay out three hoops: land (brown paper), water (blue paper), and air (a white paper cloud). Children drive, sail, or fly toy vehicles or picture cards into the hoops. Ask: "How did the bananas get to our store?" Trace the trip: a ship across the ocean, a truck on the road, a car home. Sort again with the Sorting Hoops tool.',
      note: {
        mistake: 'Children think anything with wings can fly, sort a vehicle by where they last saw it (a parked plane, a boat on a trailer), not where it travels, and think a submarine is not a water vehicle.',
        words: 'Say: "Vehicles carry people and things. Some go on land, some on water, and some in the air." Ask: "Where does it travel? What does it carry?" Day 2: read the group names and name each vehicle. Level 1 has six vehicles, Level 2 nine, Level 3 twelve. The second page sorts animals and machines into Can Fly and Cannot Fly: four on Level 1, six on Level 2, eight on Level 3.',
        watch: 'Right: car, bus, truck, bicycle, motorcycle, and train go on land; boat, ship, sailboat, canoe, ferry, and submarine on water; airplane, jet, helicopter, hot-air balloon, and rocket in the air. A rocket flies up through the air into space: air is right. Can fly: bird, eagle, owl, bee, butterfly, airplane, helicopter. Cannot fly: dog, cat, rabbit, horse, turtle, fish, car. No answer key.',
      },
    },
    'K:hot-cold-places': {
      title: 'Hot Places, Cold Places',
      objective: 'Children compare a snowy mountain town and a hot beach town, match clothes and play to each place, and tell how the weather where we live changes what we wear and do outside.',
      routine: 'Tape a picture of a snowy place on one wall and a picture of a beach on the other. Fill a bag with real things or pictures: a winter hat, mittens, a scarf, a sled, a swimsuit, flip-flops, a beach ball. Each child pulls one out and walks it to the place where people would use it, and tells why. Then look out the window: "What is the weather today? What do we wear outside?"',
      note: {
        mistake: 'Children think the weather is the same everywhere as it is here today, or that every place gets snow in winter. Some match by color instead of by use.',
        words: 'Say: "In a cold place, people dress to stay warm. In a hot place, people dress to stay cool." Ask: "Where would people use this? Why?" Day 2, the page: name the two places, a snowy mountain town and a hot beach town, and each small picture; they change from copy to copy. Children draw a line from each thing to the place where people would use it. Level 1 has four things, Level 2 six, and Level 3 six and a box to draw what you wear outside today.',
        watch: 'Right: a coat, mittens, a winter hat, snow boots, and a sled go to the snowy town; a swimsuit, sandals, flip-flops, and a beach ball go to the beach town. On Level 3 there is no wrong answer: the drawing shows today\'s weather where you live; ask, "Why did you pick that?" No answer key.',
      },
    },
  },
};
