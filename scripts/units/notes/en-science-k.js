'use strict';
/**
 * Teacher notes, English, science: the 31 lessons of the seven Kindergarten science units (Daily Teaching System,
 * Stage D-3, 2026-11-23): My Senses and My Body; Weather and the Seasons; Animals and Their Homes; Pushes and Pulls;
 * Sink, Float and Build a Boat; Plants and Animals Grow; Sunlight and Caring for Our Earth (design:
 * scripts/units/year/design.en.science.json, grade K). Each note was written from the pages the lesson hands out, read
 * at every level: the new pages K-687 to K-704 from their text dump and sheets (lcs-stage-d/batch-k), the published
 * pages from their generators and fresh renders (lcs-stage-d/notes-k). Where a type has several faces, the note
 * describes the face the lesson lists first and names the others as other pages of the same lesson. One US
 * Kindergarten teacher read the notes against the pages (REVIEW-3, 2026-11-23; every finding applied).
 * Every lesson also has its hands-on routine (`routine`, 2026-11-23): what the class does with real things, printed
 * under "What the class does" before the page; the note's "words" keep what the teacher says and how the levels go.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 2,000 letters in all, the routine included.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:five-senses': {
      title: 'My Five Senses',
      objective: 'Children observe real things one sense at a time, name the body part they use to see, hear, smell, taste, and touch, and match each picture to the body part we use most for it.',
      routine: 'Set up four stations and send small groups to each in turn: shake a jar of dry beans with eyes closed (hear), smell half a lemon (smell), feel a feather and a square of sandpaper inside a paper bag (touch), and look closely at a picture book with a magnifying glass (see). Tasting is optional: an apple slice, only with families\' permission and after checking your allergy list. At each station, children say which body part they used.',
      note: {
        mistake: 'Children mix up smell and taste ("I smell with my mouth") and think we touch only with our fingers. They think each thing goes with one sense only, or they draw every line to the eye, because we can see everything.',
        words: 'At each station ask, "Which body part helped you? What did you find out?" Say: "Scientists use their senses to observe." Ask: "How do your nose and your eyes help you find good food?" Day 2, the page: say, "Each body part gets one line. Which one do you use MOST for this picture?" Level 1 has four pictures and four body parts (one sense is left out); Level 2 has five, one for every sense. Start with Level 1, and give Level 2 to children who match easily.',
        watch: 'Name each picture first; they change from copy to copy (a drum, a rose, a lollipop, a rock, the Moon). A right line goes to the body part we use most: a drum to the ear, a rose to the nose, a lollipop to the tongue, a rock to the hand. The lemon is the taste picture: it goes to the tongue, and a flower takes the nose, even though the class smelled a lemon. If two lines end at one body part, ask, "Which of these do you hear? Which do you smell?" A child who says "I see the rose too" is right: agree, then ask, "How do you find out it smells sweet?" No answer key.',
      },
    },
    'K:human-body': {
      title: 'Parts of My Body',
      objective: 'Children point to and name parts of their own body, copy body words onto a drawn child, and tell which parts help them eat, drink, and breathe.',
      routine: 'Stand in a circle and play Simon Says with body words: touch your elbow, your shoulder, your knee, your wrist. Sing "Head, Shoulders, Knees and Toes." Then children count their own eyes, ears, hands, and fingers. Last, each child takes a sip of water and a deep breath, and the class names the parts that helped.',
      note: {
        mistake: 'Children mix up neighbors: elbow and knee, shoulder and neck, finger and toe. They call the whole leg "foot" and the whole arm "hand," and many point to an elbow or a shoulder before they have its word. On the twos page they circle the nose, because it has two holes.',
        words: 'Ask: "Which parts help you eat? Drink? Breathe?" (the mouth, teeth, and tongue; the nose and mouth take in air, and the lungs in the chest fill with it). The page: children copy each word from the bank onto the line that points to that part. Read every word in the bank aloud and point to it; children do not need to read alone. Have them touch the part on their own body before they write. Level 1 has four words, Level 2 six, Level 3 eight. Other pages of the same lesson ask which parts come in twos and count parts on the child\'s own body.',
        watch: 'Check that each word sits on the line whose ring is on that part; shaky letters are fine. The line for "head" ends on the top of the head. Watch for children who copy the words in the order of the bank. On the twos page, the nose and the mouth are one each. On the counting page, a child whose body differs counts his or her own body, and that count is right. There is no answer key: check against the rings on the drawing.',
      },
    },
    'K:body-needs': {
      title: 'What Does a Body Need to Live?',
      objective: 'Children sort pictures into what a body needs to stay alive (food, water, and air) and what is just nice to have, and tell why each need matters.',
      routine: 'Each child puts a hand on the chest and breathes in and out slowly, feeling the air go in and out. Then lay two hula hoops on the floor beside a basket of real things: an apple, a slice of bread, a cup of water, a card with the word air, a toy car, a ball, a stuffed animal, and a book. One at a time, a child picks a thing, puts it in the hoop for "needs to live" or "nice to have," and tells why; the class shows a thumbs-up or a thumbs-down.',
      note: {
        mistake: 'Children circle what they love: a teddy bear, a TV, a bike ("I need my bike!"). They leave out air because they cannot see it. Some count only bread or apples as food and cross out a banana or a carrot.',
        words: 'Ask: "We can live a day without TV. Can we live without water? Without food? Without air?" Say: "A body needs food, water, and air to live. Toys are nice to have; we can live without them." The page: read the instruction and every word under the pictures. Point to the swirl and say, "This card means air, the air we breathe." Children circle each need and cross out each thing that is just nice to have. Level 1 has six cards: one food, water, air, and three toys or a TV. Level 2 has eight, with two foods. Level 3 adds a box to draw one more food or drink a body needs.',
        watch: 'Right: every food, the water, and the air are circled; the toys, the bike, and the TV are crossed out. Ask about each choice, "Could you live without it?" A child who circles the teddy bear "because I need it to sleep" is telling you a real feeling: say, "It helps you feel safe; your body can live without it." On Level 3, accept any food or drink, such as milk, rice, or an orange. No answer key.',
      },
    },
    'K:living-nonliving': {
      title: 'Living or Not Living?',
      objective: 'Children observe a plant, a bean seed, a worm or class pet, a rock, a cup of water, and a toy, ask "Does it grow? Does it need food or water?", and sort pictures into living and non-living things.',
      routine: 'Put real things on a table: a potted plant, a bean seed soaked overnight, the class pet or an earthworm in a clear cup of damp soil, a rock, a cup of water, and a toy car. Children look closely with a magnifying glass, then sort the things into two hula hoops, living and not living, and tell why. Everyone washes hands afterward, and the worm goes back outside.',
      note: {
        mistake: 'Children say that things that move are alive (a car, a ticking clock, a rolling ball) and that plants are not, because they do not walk or eat. They think a seed is not living because it looks like a pebble, and that a snowflake is alive because it falls and "grows."',
        words: 'Say: "Living things grow, need food and water, and make more of their kind. A car moves, but it does not grow or eat." Plants make their own food from light, air, and water. Say: "A seed is living. It is waiting to grow, and when it gets water it starts to grow." Day 2, the page: read the two group names, Living and Non-living. Children draw a line from each picture to its group. Name every picture first (a bee, a clock, a key). Level 1 has four pictures, Level 2 six, Level 3 eight.',
        watch: 'Right: the animals (fish, bird, dog, cat, rabbit, bee, frog, butterfly) and the flower are living; the chair, spoon, cup, key, clock, car, ball, book, rock, and snowflake are non-living. Ask the three questions about any picture a child hesitates over. A child who calls the snowflake living needs the questions again: it does not eat or make more snowflakes. A child who says a picked flower is dying is right: it was alive and still is for a while. No answer key.',
      },
    },
    'K:weather-temperature': {
      title: 'Weather Words and Our Weather Chart',
      objective: 'Children look outside each morning, choose the weather symbol for the day, read the thermometer as cold, warm, or hot, and keep a week of weather on a chart.',
      routine: 'Every morning at the same time, a weather helper opens the blinds, or the class steps outside for a minute to look at the sky and feel the air. The helper reads the class thermometer with you and puts the day\'s weather symbol on the Calendar Wall. On Friday, the class counts the week\'s sunny, cloudy, and rainy days.',
      note: {
        mistake: 'Children report the weather they wish for, or yesterday\'s, not what they see out the window. They think a sunny day is always warm, even in winter, and say "it is winter, so it is cold" without checking the thermometer.',
        words: 'Ask: "What do you see? Clouds? Sun? Is anything falling? How does the air feel?" Read the thermometer: "The red line is low: cold. In the middle: warm. High: hot." Say: "Weather is what the air outside is like today. It can change from day to day, even from morning to afternoon." The weather chart has a box for each day from Monday to Sunday and a key with six symbols: sun, cloud, rain, storm, snow, and rainbow. Each day children draw the symbol for that morning; on a cloudy, rainy day they may draw both. Saturday and Sunday are not school days: send the page home on Friday for a grown-up to help, or leave those boxes empty. The chart is one page for everyone. Other pages of the same lesson match weather symbols to their words and read a thermometer.',
        watch: 'A right box shows what the class saw that morning, even if it changed later. Accept a sun or a cloud for a partly cloudy day. A child who draws snow on a warm, rainy day may be copying a friend: ask, "Look out the window. What do you see?" A recognizable sun or cloud is enough. At the end of the week ask, "Did the weather change?" No answer key.',
      },
    },
    'K:wind-watch': {
      title: 'Wind Watch',
      objective: 'Children hold a streamer outside each day, see whether it hangs still, flutters, or flies straight out, and record calm, breezy, or windy for the week.',
      routine: 'Make a streamer: a strip of crepe paper about two feet long taped to a paper towel tube. Each day at the same time, a helper holds it up outside, away from the building, while the class watches for a slow count of ten. Then children show with their arms what it did: hanging straight down (calm), waving a little (breezy), or held straight out (windy). Keep the streamer by the door for the next day.',
      note: {
        mistake: 'Children say it is windy on a cold or cloudy day, or think there is wind only when trees bend. They think we can see the wind itself. On the page they circle the streamer they like, or the same one every day.',
        words: 'Ask: "Is it hanging straight down? Moving a little? Flying straight out?" Say: "We cannot see the wind, but we can see what it does." Use the words in the key at the top of the page: calm, breezy, and windy. At the end of the week, ask: "Were most days calm or windy? Did it change?" Level 1 has three days, and children only circle. Level 2 has five days, and children also draw a flag or a tree in that day\'s wind. Level 3 adds the windiest and the calmest day of the week to circle at the end.',
        watch: 'A right circle matches what the class streamer did that day; the page has no answer of its own. Look at the drawings: a windy day shows a flag flying straight out or a bending tree, a calm day a hanging flag. On Level 3, the windiest and calmest days should match the circles above; if two days tie, children circle both. If the streamer changed during the count, the class decides together what it did most of the time. No answer key.',
      },
    },
    'K:rain-gauge': {
      title: 'Rain Gauge: How Much Rain Fell?',
      objective: 'Children set out a clear, straight-sided cup with tape marks, read how high the rainwater reached after a rainy day, and compare two or three rainy days: more, less, or the same.',
      routine: 'Make the gauge: a clear plastic cup or jar with straight sides and a flat bottom. Put five strips of tape up one side, the first about a quarter inch from the bottom and the rest a quarter inch apart. Set it in an open spot away from roofs and trees, steadied in a box or with stones. After a rainy day, read it in the morning: children crouch so their eyes are level with the water and find the tape mark closest to it. Then empty the cup and put it back.',
      note: {
        mistake: 'Children think the loudest rain or the darkest clouds brought the most water. They color the cup to the top, or to the mark they like, instead of the mark closest to the water. On Level 3 they count all five tape marks, not only the ones under the water.',
        words: 'Ask: "Which tape mark is closest to the water? Is it more rain than last time, or less?" Say: "Rain can be a little or a lot. The gauge shows how much fell." The page has cups with tape marks like the class cup. It waits for rainy days and can take two weeks; if the rain reaches no mark, wait for a rainier day. Level 1 has two cups, Level 2 three; Level 3 also asks children to write how many marks the colored water reaches.',
        watch: 'A right page shows the water colored up to the mark the class read and the day with the most water circled; if two days are the same, both are circled. Ask, "How do you know Day 2 had more rain?" ("The water is higher.") On Level 3, children count the tape marks from the bottom up to the top of the colored water. If the water sat halfway between two marks, the class picks one together. There is no answer key: the answers come from your cup.',
      },
    },
    'K:seasons': {
      title: 'The Four Seasons',
      objective: 'Children sort pictures and clothes by season, put the four seasons in order, and tell how a schoolyard tree changes from season to season.',
      routine: 'Visit one schoolyard tree as a class, and children draw it as it looks today. Visit it again in winter and in spring, draw it, and compare. Back in the room, children sort a bag of real clothes (mittens, a scarf, shorts, a sun hat) into summer and winter.',
      note: {
        mistake: 'Children think the seasons can come in any order, or that winter comes right after summer. They sort by color and think every winter has snow. They call one cold day "winter" and one warm fall day "summer."',
        words: 'Say: "The four seasons come in the same order every year: winter, spring, summer, fall, then winter again." Each season has its usual weather, but any one day can surprise us. If your winters have no snow, say so: the pictures show winter where it snows. Day 2, the sorting page: children draw a line from the dot on each picture to its season box. Level 1 has four pictures, Level 2 eight, Level 3 twelve. The clothes page sorts clothes into Summer and Winter (four, six, or eight). Other pages of the same lesson put the seasons in order and draw the tree in four seasons.',
        watch: 'Right: skating, a sled, skiing, snowboarding, and icicles go with winter; tulips, buds, nests, chicks, and lambs with spring; the beach, a pool, swimming, a surfboard, flip-flops, and a seashell with summer; pumpkins, apples, a red maple tree, and the harvest with fall. Ask, "When do you see this where we live?" and accept a reason that fits your place. On the clothes page, sunglasses or a cap can be argued both ways; accept the child\'s reason. No answer key.',
      },
    },
    'K:weather-ready': {
      title: 'Getting Ready for a Storm',
      objective: 'Children listen to a short weather forecast, tell what to wear or bring for each kind of weather, choose the safe thing to do in a thunderstorm, and practice the school\'s storm and tornado drills.',
      routine: 'Play a short forecast for tomorrow from a local TV station or the National Weather Service, and lay out what to wear or bring: an umbrella, a coat, mittens, a sun hat, a water bottle. Practice your school\'s severe-weather and tornado drill: walk quietly to the safe place, crouch low, and cover your head. Then practice coming in from the playground at a signal, as when thunder roars.',
      note: {
        mistake: 'Children think it is safe to stay outside in a thunderstorm until the rain starts, or to stand under a tree to stay dry. They pack for today\'s weather instead of tomorrow\'s, and pick sunglasses for a rainy day because they like them.',
        words: 'Teach the rule: "When thunder roars, go indoors." A tree, a playground, or a pool is not safe in a thunderstorm; a building is. The page has no tornado row, so the drill teaches it. Each row of the page shows the weather with its word (hot, rain, thunderstorm, snowstorm) and three choices; children circle what to do, wear, or bring. Level 1 has two of the four rows; Level 2 has all four; Level 3 adds a box to draw what to bring for tomorrow\'s weather.',
        watch: 'Right: the umbrella for rain, the house (go indoors) for a thunderstorm, the coat for a snowstorm, and the water for a hot day. The tree, the playground, and the pool are wrong in a thunderstorm; a coat, mittens, or a winter hat is wrong on a hot day. Ask "Why?" for each circle ("Lightning can hit tall things outside"). On Level 3, the drawing should fit tomorrow\'s forecast. A child who fears storms needs to hear: "We practice so we know what to do." No answer key.',
      },
    },
    'K:animal-groups-homes': {
      title: 'Where Animals Live',
      objective: 'Children sort animals into pets, farm animals, and wild animals and match each animal to the home where it finds what it needs.',
      routine: 'Set out three hula hoops marked with a drawn house, barn, and tree. Children sort toy animals or animal photos into pets, farm animals, and wild animals, and say who takes care of each one. Then they match each animal to a picture of its home: a doghouse, a barn, a nest, a hive, a burrow.',
      note: {
        mistake: 'Children think zoo animals are pets because people feed them, and that a hamster is wild because it lives in a cage. They sort by size (small animals are pets) or by what they would like to own ("I want a lion").',
        words: 'Ask: "Who takes care of a dog? Who takes care of a lion?" Say: "A pet lives with people who give it food, water, and a home. A farm animal is raised by farmers for milk, eggs, wool, or work. A wild animal finds its own food, water, and home." The page: children draw a line from each animal to Pets or Wild Animals. Name every animal first. Level 1 has four animals, Level 2 six, Level 3 eight. Other pages of the same lesson sort farm and wild animals and match each animal to its home.',
        watch: 'Right: the dog, cat, hamster, gerbil, and goldfish are pets; the lion, elephant, zebra, giraffe, monkey, and gorilla are wild. Ask, "Who gives it food?" A child who says a zoo lion is a pet is right that people feed it; say, "It is a wild animal that lives in a zoo." On the farm page, the sheep, goat, and chicken are farm animals. On the homes page: bird and nest, bee and hive, spider and web, rabbit and burrow, ant and anthill, beaver and lodge. No answer key.',
      },
    },
    'K:animal-food': {
      title: 'What Do Animals Eat?',
      objective: 'Children watch a class animal or birds at a feeder, record what it eats, and find that every animal needs food: some eat plants, some eat other animals, and some eat both.',
      routine: 'Watch the class pet at feeding time, or make a bird feeder: spread a pinecone with vegetable shortening, roll it in birdseed, and hang it outside a window where children can see it. Each day for a week, children watch for a few minutes and say what the animal or the birds ate, and the class keeps a list with drawings (seeds, lettuce, pellets, bugs). Children wash hands after handling the seed.',
      note: {
        mistake: 'Children think every animal eats what people eat, or that a lion eats grass like a cow. They think a frog eats leaves because it lives among plants. They circle only one food for the robin, because they expect one right answer.',
        words: 'Ask: "What did it eat? Plants or animals?" Say: "Every animal needs food. A cow eats plants, a lion eats other animals, and a robin eats both: bugs and berries." Day 2, the page: each row has an animal, an arrow, and three foods. Name them first: grass, a leaf, a carrot, berries, meat (the picture is a ham), a fish, a grasshopper, a cricket, a caterpillar. Level 1 has four animals, each with one right food. Level 2 adds the robin, which eats two of its three foods: say, "Circle every food it eats." Level 3 adds a box to draw what the class animal or the feeder birds ate.',
        watch: 'Right: the frog eats the grasshopper or the cricket, the cow the grass, the rabbit the carrot or the grass, the lion the meat, and the robin both the caterpillar and the berries. The fish and the meat are wrong for the robin. Ask, "What would happen if the lion had only grass?" On Level 3, the drawing should show what children really saw, even if it was only seeds. No answer key.',
      },
    },
    'K:animal-home': {
      title: 'Build a Home for an Animal',
      objective: 'Children build a model of a place where a frog could live, with food, water, and a place to hide, and tell why a frog could live there.',
      routine: 'Groups build a home for a frog in a shoebox. Give each group construction paper, modeling clay, twigs, leaves, small stones, and a blue paper pond. Each group adds food (clay bugs), water (the pond), and places to hide (a twig log, a stone, paper grass), then sets a paper or clay frog inside. Each group shows the class where its frog finds food, water, and a place to hide.',
      note: {
        mistake: 'Children give the animal what a person or a pet needs: a bed, a bowl, a toy. They think a frog eats grass or leaves because they are green. They glue in every picture without asking whether the frog needs it.',
        words: 'Ask: "What does a frog need to live? Where does it find food? Water? A place to hide from a hungry bird?" Say: "An animal lives where it can find food, water, and shelter." The page is always a frog. Level 1: children cut out three pictures (a bug, water that looks like a puddle, and a hiding place), glue them in the frog\'s home, and draw the frog. Level 2: eight cut-outs, two of which a frog does not need (two of a carrot, an acorn, a honey jar, and a bird\'s nest); children glue in only what a frog needs. Level 3: no cut-outs; children draw the home, then draw a line from the words food, water, and hiding place to those parts.',
        watch: 'Right on Level 2: the grasshopper and the cricket are food, the puddle is water, and the log, the rock, and the grass are places to hide; the carrot, the acorn, the honey, and the nest do not fit. Ask about each picture, "Is it food, water, or a hiding place?" A child who calls the grass food needs to hear that frogs eat bugs; the grass is where a frog hides. On Level 3, a drawing is right when it has all three parts and the lines point to them. No answer key.',
      },
    },
    'K:animals-change-land': {
      title: 'Animals Change Their World',
      objective: 'Children look for signs that animals change the land to meet their needs (an anthill, a nest, a hole in the ground, a beaver lodge) and tell what each animal changed and why.',
      routine: 'Take the class on a walk around the schoolyard to look for signs that animals changed the land: an anthill in a sidewalk crack, a nest in a tree, a hole dug in the dirt, chewed leaves, a spider web. Look with your eyes only; never touch a nest or reach into a hole. Children point, and you take a photo of each sign. Back in the room, look at the photos together, with a photo of a beaver lodge.',
      note: {
        mistake: 'Children think only people change the land, or that holes and anthills just happen. They match the animal that lives near a place, not the one that made the change. Some think a beaver lodge is a pile of sticks that fell into the water.',
        words: 'Ask: "What was here before? What did the animal change? Why did it need to?" Say: "Animals change the land to get what they need: a home, a safe place for eggs or babies, food." Each picture pair on the page shows a place before and after, with an arrow; children draw a line from the after picture to the animal that made the change. Level 1 has two pairs and three animals, so one animal is left over. Level 2 has four pairs and four animals. Level 3 adds a box to draw a change seen in the schoolyard and the animal that made it.',
        watch: 'Right: the ant made the anthill and its tunnels, the robin built the nest for its eggs, the rabbit dug the hole, and the beaver built the lodge of sticks in the water. Ask, "Why did the animal make it?" (a home, a place for eggs, a place to hide). On Level 1, one animal has no line, and that is correct. On Level 3, accept a change children truly saw, such as a hole, an anthill, a web, or chewed leaves. No answer key.',
      },
    },
    'K:push-pull': {
      title: 'Push or Pull?',
      objective: 'Children push and pull classroom things (a wagon, a toy car, a drawer, a chair) and sort pictures of everyday actions into pushes and pulls.',
      routine: 'Act out pushes and pulls with real things: push a chair away and pull it back, pull a drawer open and push it shut, pull a wagon by its handle, and push a toy car across the floor. After each one, children say whether the thing moved away from them or toward them. Then play a game: you name an action (kick a ball, pull a sled, push a swing), and children show it with their hands.',
      note: {
        mistake: 'Children decide by the way the arrow points (left or right) instead of asking whether the thing moves away from the person or toward the person. They think a kick is not a push because it uses a foot, and that you can only pull with a rope.',
        words: 'Say: "A push moves a thing away from you. A pull moves it toward you. A push or a pull can start a thing moving, stop it, make it go faster or slower, or change which way it goes." Day 2, the page: each card shows a person, a thing, and an arrow for the way it moves. A person behind the thing is pushing; a person in front holding a rope is pulling. Children draw a line from each card to push or pull; the two words swap sides from page to page, so read them each time. Level 1 has four cards, Level 2 eight, Level 3 six and two boxes to draw a push and a pull the child did today.',
        watch: 'Right: the soccer ball (a kick), the shopping cart, the lawn mower, and the toy train are pushes; the sled, the sleigh, the toy truck on a rope, and the log are pulls. Ask the child to act out a card: "Show me with your hands." On Level 3, a drawing is right when the child can tell you what moved and whether it went away or came closer, such as kicking a ball or pulling a door open. No answer key.',
      },
    },
    'K:push-strength': {
      title: 'A Harder Push, a Farther Roll',
      objective: 'Children roll a ball across the floor with a gentle push and a hard push, mark where it stops, and find that a harder push makes it roll faster and farther.',
      routine: 'Find a hallway or a smooth floor with square tiles, and tape a start line. Use the same ball for every test. One child sets the ball on the start line and rolls it with a gentle push; another lays a piece of tape where it stops. Then a hard push from the same line, and another piece of tape. Together, count the tiles from the start line to each stop. Roll, never throw, and keep the hallway clear of people.',
      note: {
        mistake: 'Children think the ball stops because it "gets tired." They change two things at once, pushing harder and from a new spot, and still say the push made the difference. Asked for a harder push, many throw or bounce the ball instead of rolling it.',
        words: 'Ask: "What changed? What stayed the same?" (the same ball, the same line, the same floor). Say: "A harder push makes the ball go faster and farther. The floor rubs on the ball and slows it down until it stops." The page shows a strip of ten tiles with a box past the end. Level 1: a gentle row and a hard row; children color the arrow and draw the ball where it stopped. Level 2 adds a medium push and asks children to circle the push that sent it farthest. Level 3: children write how many tiles it rolled.',
        watch: 'A right page matches your test: the hard push drawn farther than the gentle one, and the end box colored if the ball rolled past ten tiles. Ask, "Which push sent it farthest? How do you know?" If a result surprises you (the gentle push went farther), roll again: the ball may have hit a wall or a bump. On Level 3, check the tile counts against the tape. There is no answer key: the answers come from your test.',
      },
    },
    'K:change-direction': {
      title: 'Change Its Direction',
      objective: 'Children roll a ball toward a wall, a block, and a friend\'s hand, and see that a push from a different direction turns the ball or sends it back.',
      routine: 'Sit in a circle on the floor with a playground ball. Roll it to a friend, who pushes it back with a hand. Roll it straight at a wall and watch it bounce back. Lay a long block or a board across its path at a slant, and roll the ball into it: the ball turns. Last, lay the block on the floor and have children stand and look straight down at it, to see how it looks from above.',
      note: {
        mistake: 'Children expect the ball to stop dead at a wall or go straight through. They think only a hand can push, not a wall or a block. On the page they draw where the ball came from, because a view from above is new to them.',
        words: 'Ask: "What pushed the ball? Which way did it go after the push?" Say: "A push can change the direction a ball goes." Then: "On the page we look down at the floor from above. The pale circles show where the ball came from." Level 1: two of the four pictures, and children circle one of two arrow pictures. Level 2: all four (a hand, a wall, and two slanted blocks), and children draw the arrow. Level 3: two pictures and a box to draw a ball game of their own, with an arrow for each push.',
        watch: 'Right: the wall and the hand send the ball back the way it came. A block slanted like / turns the ball up the page; a block slanted like \\ turns it down the page. Test any picture children argue about with a real ball and block. An arrow is right when it starts at the ball and points the way the ball goes next. On Level 3, ask the child to tell you the game: who pushed, and which way the ball went. No answer key.',
      },
    },
    'K:ramp-to-target': {
      title: 'Make the Ball Hit the Target',
      objective: 'Children build a ramp from a board and blocks, roll a ball down it to knock over a paper cup, and change the ramp\'s height or direction until their design works.',
      routine: 'Each group gets a stiff board or a strip of cardboard, three or four blocks, a small ball, and a paper cup standing on the floor about two feet past the end of the ramp. Groups build a ramp, let the ball go from the top without pushing it, and watch whether it knocks the cup over. After a miss, they change one thing: they make the ramp higher, turn it toward the cup, or line the ball\'s path with walls of blocks. Then they try again. Keep small balls away from mouths.',
      note: {
        mistake: 'Children change everything at once after a miss, so they cannot tell which change helped. They give up after one try, or they push the ball instead of letting it go and then say the ramp worked.',
        words: 'Say: "Your job is to make the ball hit the cup. Engineers try, look, and try again." After each try ask, "Did it work? What will you change?" Say: "Change one thing at a time." The changes on the page are a higher ramp, a turned ramp pointed at the cup, and walls of blocks along the ball\'s path (the last two are drawn from above). Level 1: children draw the ramp, circle it worked or try again, and circle a change or draw another one in the empty box. Level 2: they draw the ramp and their change. Level 3: they draw two tries and circle the try that hit the cup, or both.',
        watch: 'There is no answer: the page records your group\'s test. Look for a drawing with a board, blocks, the ball, and the cup, and a circle that matches what happened. Ask, "Why did that change help?" ("Now the ball goes straight to the cup.") A group that hits the cup on the first try can still change one thing and see what happens. A child who circles "it worked" when it did not needs to hear: "Engineers learn the most from the tries that do not work."',
      },
    },
    'K:compare-ramps': {
      title: 'Which Ramp Works Better?',
      objective: 'Children test a low ramp and a high ramp three times each, count how many blocks the ball knocks down, and tell which ramp works better and why.',
      routine: 'Build two ramps the same way except for height: one board on one block, one board on three blocks. Stand a tower of three blocks the same distance from the end of each ramp. Use the same ball, and let it go from the top each time without pushing. Roll it down each ramp three times. After each try, the class counts the blocks that fell and builds the tower again.',
      note: {
        mistake: 'Children decide from one try, or pick the ramp they built. They count a block that wobbled as fallen, or let the ball go from a different spot each time. Some say the high ramp is better before the test and do not look at their counts.',
        words: 'Ask: "Is our test fair? What is the same? What is different?" Say: "We test each ramp more than once, because one try can be lucky." Level 1: one try each; children color the blocks that fell and circle the ramp that worked better. Level 2: three tries each, with a tally mark for each block that fell. Level 3: children also write each total and draw a way to make a ramp better. If the ramps tie, children circle both.',
        watch: 'The class\'s counts decide. A right page shows tallies that match the test and a circle on the ramp that knocked down more blocks, usually the high ramp, because the ball comes down faster. Ask, "How do you know?" ("It knocked down more blocks.") On Level 3, check that each total adds up the three tries (nine at most). A better ramp could be higher, longer, or have walls of blocks; ask the child why it would help. No answer key.',
      },
    },
    'K:sink-float': {
      title: 'Sink or Float? Test It',
      objective: 'Children test classroom things in a tub of water, sort them into things that float and things that sink, and use what they find to choose materials for a boat for the class bear.',
      routine: 'Fill a clear tub with water and lay out towels and a tray of things: a cork, a wooden block, a plastic lid, an apple, a key, a metal spoon, a rock, a marble, and, for the boat lessons, a sponge, a sheet of paper, a square of foil, and a craft stick. Before each test, children predict with a thumbs-up for float or a thumbs-down for sink. Lay the thing gently on the water and watch. Sort the things onto two trays, floats and sinks. Wipe up spills at once, and keep marbles and small things away from mouths.',
      note: {
        mistake: 'Children think heavy things always sink and light things always float, or that big things sink. A big wooden block or an apple floats, while a small key or a marble sinks. They predict and then forget to watch what really happens.',
        words: 'Ask: "Was it heavy? Did it float anyway?" Say: "Heavy things can float, and small things can sink. We test to find out." Keep the floats tray for the boat lessons. Day 2, the page: children draw two things that floated in the dashed boxes on the water and two that sank in the boxes on the bottom. The page is one page for everyone.',
        watch: 'A right drawing matches the class test: a cork, a block, or an apple on the water; a key, a rock, or a marble on the bottom. Ask the child to name each drawing, and label it for them. If a child draws the paper on the water, ask what happened to it later: paper floats at first, then soaks up water. Ask, "Was everything that floated light?" and listen for the apple or the big block. No answer key.',
      },
    },
    'K:boat-plan': {
      title: 'Draw a Boat for the Bear',
      objective: 'Children draw a boat that could carry the class bear across the water table, choose a material that floats, and tell how the boat\'s shape will keep the bear dry.',
      routine: 'Bring back the floats tray from the sink-or-float test and the class bear, a plastic counting bear that can get wet. In a tub of water, children set the bear on each floating thing to see whether it stays dry. Then they look at a few real containers that float (a foam food tray, a foil pie pan, a plastic lid) and talk about sides, a flat bottom, and room for the bear. Each child chooses a material for a boat.',
      note: {
        mistake: 'Children draw a boat with no sides, or a tall, narrow boat that will tip over. They choose a material for its color, or because it is soft for the bear, not because it floated. They think a bigger boat always works better.',
        words: 'Ask: "What will your boat be made of? What shape will keep the bear dry?" Say: "Engineers draw a plan before they build." The counting bear stands in for the teddy on the page. The page has a row of material boxes: a sponge and a sheet of paper are drawn, and three empty boxes are for other things the class tested, such as foil, a plastic tray, or craft sticks. The sponge and the paper must have been in your test; paper floats only until it soaks up water. Level 1: children circle what floated and color the boat already drawn in the water. Level 2: they draw their own boat. Level 3: they draw it and write one word about it on the line; the words sides, flat, and tall are printed to copy.',
        watch: 'A right plan uses a material that floated in your test and has sides to keep water out. Ask, "Where will the bear sit? How will the water stay out?" A child who circles the paper is right that it floated: ask, "What happened to it after a while?" On Level 3, accept invented spelling or a copied word. Keep the plans: children build from them in the next lesson. No answer key.',
      },
    },
    'K:boat-test': {
      title: 'Build and Test Our Boats',
      objective: 'Children build their boat from foil, plastic trays, and craft sticks, test it with the bear in the water table, and draw what happened and one change that would help.',
      routine: 'Set out squares of foil, clean foam or plastic trays, craft sticks, tape, a water table or a tub, the counting bear, and towels. Each child or pair builds a boat from the plan. Test one boat at a time: set the bear in the middle, lower the boat gently onto the water, and count to ten. Children look for where the water came in, change one thing, and test again. Wipe up spills at once.',
      note: {
        mistake: 'Children think a boat that let the bear get wet is "bad" and start over instead of changing one thing. They blame the water or the bear. Asked for a change, they name one that would not help, such as a new color.',
        words: 'Ask: "Did the bear stay dry? Where did the water come in?" Say: "Engineers test, then make it better." Talk about two changes: taller sides keep the water out, and a flatter, wider bottom keeps the boat from tipping. Level 1: children circle whether the bear stayed dry or got wet and, if it got wet, circle one change (a flatter bottom or taller sides). Level 2: they draw their boat in the water with the bear and circle dry or wet. Level 3: they also draw a new boat with one change.',
        watch: 'There is no answer: the page records each child\'s own test. A right circle matches what happened. Ask, "Why did the bear get wet? What one change would help?" A change is right when it fits what went wrong: taller sides if water came over the top, a flatter bottom if the boat tipped. On Level 2, talk about the change aloud. A boat that kept the bear dry can still be tested: "Could it carry two bears?"',
      },
    },
    'K:boat-compare': {
      title: 'Which Boat Carried More?',
      objective: 'Children add pennies one at a time to two foil boats, a flat raft and a boat with sides, count how many each held before it sank, and tell which shape worked better.',
      routine: 'Make two boats from same-size squares of foil, about four inches: one stays flat, a raft; one has its edges folded up into sides. Float each in a tub of water. A child adds pennies one at a time, gently, in the middle, while the class counts aloud. When the boat sinks, stop and write down how many pennies it held before the last one. Test the other boat the same way. Keep pennies away from mouths, and count them back into a cup.',
      note: {
        mistake: 'Children think the bigger-looking boat will hold more, and pick the winner before the test. They drop pennies in a pile on one side, or count the penny that sank the boat. They think the boat with sides is heavier, so it must sink first.',
        words: 'Say: "Both boats are the same foil. Only the shape is different." Ask: "Which shape held more? Why?" The page has a row of circles for each boat; children color one circle for each penny it held. Level 1 has ten circles a boat; Level 2 has twenty; Level 3 has twenty and asks children to write each number and draw the shape they would build next. If a boat held more, children color the + more box and you count with them.',
        watch: 'A right page has circles that match the class count and a circle on the boat that held more, almost always the boat with sides. Ask, "How do you know it held more?" On Level 3, check the numbers against the circles. A child who says "the raft was better because it did not tip" has a point: ask what this test measured. There is no answer key: your test is the answer.',
      },
    },
    'K:plant-needs': {
      title: 'What Plants Need to Grow',
      objective: 'Children care for cups of grass seedlings, one in a sunny window and one in a dark closet, then one watered and one left dry, and find that a plant needs light and water to grow.',
      routine: 'Plant grass seed in four clear cups of soil and water them; the seeds sprout in a few days. When the seedlings are up, put one cup in a sunny window and one in a dark closet or cabinet, and water both. Put the other two in the window: water one and leave one dry. Every few days for two weeks, the class looks at all four cups side by side and draws what they see.',
      note: {
        mistake: 'Children think plants eat soil or the plant food from the store, and that a plant in the dark is fine if it has water; when it grows tall, they think it did best, though it is thin and pale. They think more water is always better.',
        words: 'Ask: "Which plant looks strong and green? Which looks pale or droopy? What was different?" Say: "Plants make their own food from light, air, and water. They need light and water to grow." The plant in the dark turns pale and weak; the dry one wilts. The page: each row shows two potted plants with arrows from what each one gets, the sun, a water drop, or something a plant cannot use, such as a toy, a shoe, a pencil, or a glove. Children circle the plant that gets both things it needs, light and water. The page is one page for everyone.',
        watch: 'Right: in each row, the pot with the sun and the water drop. Ask about the other pot, "What is this plant missing?" ("It has no water. A pencil does not help a plant.") A child who says plants also need air and soil is right: plants need air too, and their roots hold them in the soil and take up water. The page shows the two needs the class tested. No answer key.',
      },
    },
    'K:seed-journal': {
      title: 'Plant a Seed and Watch It Grow',
      objective: 'Children plant a bean seed against the side of a clear cup, water it, and draw it every few days as a root, a stem, and leaves come out, seeing that a living seed starts to grow when it gets water.',
      routine: 'Soak dry lima or pinto beans in water overnight. Each child fills a clear plastic cup with soil and presses a bean against the side, about an inch down, so it shows through the plastic. Water so the soil stays damp, not soggy, and set the cups on a sunny windowsill. Every two or three days, children look at their bean and draw it. Beans are for planting, not eating; wash hands after planting.',
      note: {
        mistake: 'Children think the seed is dead because it looks like a pebble, and that leaves come out first. They draw what they expect, such as a flower, instead of what they see. Some think the bean needs sunlight to start growing.',
        words: 'Ask: "What came out first? Which way is the root growing? Which way is the stem going?" Say: "A seed is living. Inside it is a baby plant and its food. When it gets water, it starts to grow." The root comes out first, then a stem pushes up toward the light, then leaves. Each box on the page has a cup outline, a dashed line for the top of the soil, and "Day" with a space. Level 1: children write the day and draw what they see. Level 2: they also circle taller or the same (read both words with them). Level 3: on the last day they also write how many leaves it has.',
        watch: 'A right drawing shows the bean as it looked that day: a seed, then a root below the soil line, then a stem and leaves above it. Ask, "What changed since last time?" Accept a day number or a date in the box. On Level 2, check that taller or the same matches the plant. If a bean does not sprout, that is a real result: "Some seeds do not grow. What could have happened?" No answer key.',
      },
    },
    'K:fruit-vegetable': {
      title: 'Fruits and Vegetables: Food from Plants',
      objective: 'Children look at, touch, and smell real fruits and vegetables, sort them into the two groups the kitchen uses, and find that every one of them comes from a plant.',
      routine: 'Bring real fruits and vegetables: an apple, a banana, a pear, a carrot with its leaves, a potato, an onion, lettuce, and broccoli. Check your food allergy list first; children look, touch, and smell, and taste only if families have said yes. Cut an apple in half to see the seeds, then sort the food into two baskets, fruits and vegetables. Wash hands afterward.',
      note: {
        mistake: 'Children think fruits are sweet and vegetables are green, so a carrot "is not a vegetable because it is orange." They think food comes from the store, not from a plant. They put a round potato with the fruits.',
        words: 'Say: "A fruit is the part of a plant that holds the seeds. Vegetables are other parts: a root (the carrot), leaves (the lettuce), flower buds (the broccoli). Potatoes and onions grow under the ground." Ask: "Where did this come from before the store?" The page: children draw a line from each food to Fruits or Vegetables. Name every food first. Level 1 has four foods, Level 2 six, Level 3 eight. The page uses the kitchen groups and shows only foods that fit one group.',
        watch: 'Right: the apple, banana, orange, pear, peach, cherry, and watermelon are fruits; the carrot, potato, onion, lettuce, and broccoli are vegetables. Ask, "Which part of the plant do we eat?" A child who says a tomato is a fruit is right, as scientists say it; the page does not show one. The cherry and the peach can look like an apple, but a fruit is a fruit: the group stays the same. No answer key.',
      },
    },
    'K:animal-babies': {
      title: 'Animal Babies and What They Need',
      objective: 'Children match grown-up animals to their babies and tell what each baby needs to live: a calf drinks its mother\'s milk, a chick pecks at seeds and bugs, a caterpillar eats leaves.',
      routine: 'Show photos or a picture book of animal families: a cow and her calf, a hen and her chicks, a butterfly and a caterpillar. Lay out printed photos of grown-ups in one row and of babies in another. Children take turns matching a baby to its parent and telling one way they look alike and one way they look different. Then the class acts out how each baby eats: drinking milk, pecking at seeds, munching leaves.',
      note: {
        mistake: 'Children expect every baby to look like a small copy of its parent, so they will not match the caterpillar to the butterfly. They think all babies drink milk, the chick and the caterpillar too. Some match by color.',
        words: 'Ask: "How is the baby like its parent? How is it different?" Say: "A calf, a foal, and a lamb drink their mother\'s milk. A chick pecks at seeds and bugs by itself. A caterpillar eats leaves, then turns into a butterfly." Ask: "What does every baby need?" (food, water, air, and a safe place). The page: children draw a line from each grown-up animal to its baby. Name each pair first: cow and calf, horse and foal, sheep and lamb, hen and chick, butterfly and caterpillar. Level 1 has four pairs; Level 2 has five. As children work, ask what each baby eats; the page shows the animals, not their food.',
        watch: 'Right: the cow to the calf, the horse to the foal, the sheep to the lamb, the hen to the chick, and the butterfly to the caterpillar. Some babies look almost like their parents; ask, "How can you tell which one is the baby?" A child who stops at the caterpillar should hear: "This baby does not look like its parent yet." Ask about one pair, "What does this baby eat?" No answer key.',
      },
    },
    'K:day-night': {
      title: 'Day and Night',
      objective: 'Children sort pictures of the day and the night, tell that the Sun lights and warms the day, and look for the Moon in the morning sky to find that it can be seen in the daytime too.',
      routine: 'On a sunny morning, children feel a wall in the sun with the back of a hand, then one in the shade. Never look at the Sun. In the week after a full moon, the Moon is often in the morning sky: look for it together. Back inside, darken the room, tape a small paper child on a ball, and shine a flashlight on it: when the child faces the light it is day there, and when you turn the ball away it is night. Children take turns turning the ball.',
      note: {
        mistake: 'Children say the Moon comes out only at night and that the Sun goes to sleep or hides behind the hills. They think the stars go away during the day, and that the Moon makes its own light.',
        words: 'Ask: "What lights up the day? What warms the ground?" Say: "The Sun lights and warms the day. The Moon does not make its own light; sunlight shines on it. The stars are in the sky in the daytime too, but the Sun is so bright that we cannot see them." Day 2, the page: read the two group names, Day and Night. Children draw a line from each picture to its group. Name every picture first: a rainbow, a kite, a bird, an owl, a bat, a star, a comet (a ball of ice and dust with a glowing tail). Level 1 has four pictures, Level 2 six, Level 3 eight.',
        watch: 'Right: the sun, the rainbow, the kite, and the bird go with day; the owl, the bat, the star, and the comet go with night. Ask, "When do you see it?" An owl and a bat are awake at night and sleep in the day. A child who says "I saw a star in the day" may mean the Sun, which is a star: praise the thinking. The Moon is not on the page because we can see it by day and by night. No answer key.',
      },
    },
    'K:sun-warms': {
      title: 'Sun or Shade: Which Is Warmer?',
      objective: 'Children put pairs of things outside, one in the sun and one in the shade, feel them an hour later, and find that sunlight warms what it shines on.',
      routine: 'Set out two of each: a pail of sand, a bottle of water, a rock, and a ball. In the morning, put one of each in full sun and one in the shade of a tree or a building. After about an hour, children feel each pair with the back of a hand; a grown-up touches first, because a dark rock in strong sun can get hot. Then pour each bottle into a cup and stand a thermometer in each cup for a few minutes to read the water.',
      note: {
        mistake: 'Children think the shade is cool because of the wind, or because "shade is cold," not because the sunlight is blocked. They expect both things to be warm because both were outside, and they decide before they touch.',
        words: 'Ask: "Which one is warmer? What was different?" (only the sunlight). Say: "Sunlight warms what it shines on: the sand, the water, the rocks, the ground." Each row of the page shows the same thing in the sun and in the shade, and the sun side changes from row to row. Level 1 has two pairs, Level 2 four. Level 3 has three pairs and two thermometers for the water: read the cup thermometers, then show each child the line to color up to.',
        watch: 'Right: in every row, the circle beside the thing in the sun is red and the one beside the thing in the shade is blue. Check that children look for the sun or shade label, not the side of the page. On Level 3, the sun thermometer is colored higher and is the one circled. If a pair felt the same on a cloudy day, say so and test again on a sunny day. No answer key.',
      },
    },
    'K:make-shade': {
      title: 'Make Shade for an Ice Cube',
      objective: 'Children build a small shade from paper, cloth, craft sticks, and cups to keep an ice cube from melting in the sun, then compare which shade kept its ice cube the longest.',
      routine: 'Set out ice cubes of one size, paper plates, construction paper, cloth scraps, craft sticks, paper cups, tape, leaves, and a small umbrella. Each group builds a shade that stands over its ice cube on a plate. Put all the plates in full sun at the same time, plus one ice cube with no shade to compare with. Check every 10 to 15 minutes and watch which ice cube melts fastest.',
      note: {
        mistake: 'Children think a shade must wrap the ice cube, or that any cover works, even clear plastic that lets the sunlight through. They think the ice melts because of the wind, not the sunlight.',
        words: 'Ask: "Which ice cube is melting fastest? Why?" Say: "A shade blocks the sunlight, so the ice under it warms more slowly." The page shows paper, a plate, an umbrella, a leaf, and an empty box for something else. Level 1: children circle what they will use, draw their shade over the ice cube, and after the test color how much ice was left: all, half, or none. Level 2: they color the result for two shades. Level 3: they also draw a better shade for next time.',
        watch: 'There is no answer: the results come from your test. A right page shows a shade drawn over the ice cube and a result that matches what happened. Ask, "Did your shade keep the sunlight off? How do you know?" Compare each result with the ice cube with no shade. A shade that let light through, such as thin paper, is a good result to talk about: "What would block more light?" On Level 3, ask what the better shade changes: bigger, thicker, or another material.',
      },
    },
    'K:natural-made': {
      title: 'Natural or Made by People?',
      objective: 'Children sort real things (a rock, a leaf, a pinecone, a cup, a crayon, a paper bag) into natural and made by people, and tell how people change the land to get what they need, such as cutting trees for wood and paper.',
      routine: 'Put real things on a tray: a rock, a leaf, a pinecone, a stick, a plastic cup, a crayon, a paper bag, and a wooden block. Children pick up each one, say whether people made it or it came from nature, and sort the things into two baskets. Then hold up the stick beside the wooden block and the paper bag, and talk about how people make wood and paper from trees.',
      note: {
        mistake: 'Children think a wooden chair or a paper bag is natural because wood comes from trees. They call anything found outside natural and anything inside made by people, so a flower in a classroom pot is "made by people."',
        words: 'Ask about each thing: "Did people make it, or did it come from nature?" Say: "People cut down trees and made wood and paper from them. The tree is natural; the paper bag was made by people." Ask: "What else do people change to get what they need?" (fields for food, roads, houses). Say: "When people cut trees, they can plant new ones." Day 2, the page: the two groups are printed Natural and Man-made. Read "Man-made" and say, "That means made by people." Children draw a line from each picture to its group. Name every picture first. Level 1 has four pictures, Level 2 six, Level 3 eight.',
        watch: 'Right: the flower, the rock, the leaf, the mountain, and the sun are natural; the house, the chair, the car, the ball, the cup, and the book are made by people. Ask, "Who made it?" A child who puts the chair or the book with natural because "it is made of wood" or paper is thinking well: agree that it came from a tree, then ask, "Who made it into a chair?" No answer key.',
      },
    },
    'K:recycling': {
      title: 'Recycle, Reuse, and Keep Earth Clean',
      objective: 'Children sort clean, empty things by what they are made of and into the class recycling and trash bins, find one thing they can use again, and help pick up litter around the school.',
      routine: 'Bring clean, empty things: a cereal box, a can, a glass jar, a plastic water bottle, a banana peel, a plastic spoon. Children say what each is made of, sort them into the school\'s recycling, compost, and trash bins, and find one thing to use again. Then take a short litter walk: everyone wears gloves, children pick up paper and wrappers, a grown-up picks up anything sharp or broken, and everyone washes hands.',
      note: {
        mistake: 'Children think everything goes in the recycling bin, food scraps and plastic spoons too, and that recycled things just disappear. They think a clear or yellow jar is plastic.',
        words: 'Ask, "What is it made of?" Say what your town takes: many US towns put paper, plastic, glass, and metal in one recycling cart, and a plastic spoon or a toothbrush goes in the trash. The page sorts things by material into five bins: paper, plastic, glass, metal, and compost (food scraps). Read the bin names. Every thing on the page is one a US recycling cart or a compost bin takes, empty and clean. Children draw a line from each thing to its bin. Level 1 has six things, Level 2 eight, Level 3 nine. Another page of the same lesson asks children to circle the bin in each row.',
        watch: 'Right: paper, an envelope, a notebook, a cereal box, and a box to paper; the water bottle and the shampoo bottle to plastic; the jars (honey, jam) to glass; the can to metal; fruit, vegetables, bread, and a leaf to compost. A child who says "in our town paper and cans go in one cart" is right too: the five bins are the sorting the recycling center does. No answer key.',
      },
    },
  },
};
