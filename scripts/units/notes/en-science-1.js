'use strict';
/**
 * Teacher notes, English, science: the ten Grade 1 lessons whose pages already exist (Daily Teaching System, Stage D-3,
 * 2026-11-23; lcs-stage-d/1-INVENTORY.md lines marked [exact]; design scripts/units/year/design.en.science.json, grade
 * 1). Each note was written from the pages the lesson hands out, rendered at every published level (the Level Set
 * config year-sci-a; a type not listed there is published at its core level only; renders in lcs-stage-d/notes-1).
 * Where a point lists several types, the lesson hands out the first two the match names; the others are named as
 * other pages of the same lesson. Every lesson has its hands-on routine (`routine`): what the class does with real
 * things, printed under "What the class does" before the page; the note's "words" keep what the teacher says and how
 * the pages go. A note has to fit its sheet of the teacher guide (build-guide.js): about 2,000 letters in all.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:five-senses': {
      title: 'Our Five Senses',
      objective: 'Children sort things by the sense they use for each, name the body part that does it, and say "I can hear ..." sentences about sounds they find in the classroom.',
      routine: 'Set up five stations, one sense each: shake a bell in a closed box (hear), sniff a cotton ball with a drop of vanilla (smell), feel sandpaper and a feather in a paper bag (touch), look at a leaf with a magnifying glass (see), and taste an apple slice only with families\' permission and after checking allergies (taste). Then children listen with eyes closed for one minute, and you write the sounds they heard: "I can hear the clock."',
      note: {
        mistake: 'Children mix up smell and taste, and think we touch only with our fingers. Because we can see almost everything, some draw every line to the eye.',
        words: 'Say: "Scientists use their senses to observe. Each sense has its own body part." For each picture ask, "Which sense do you use MOST for this?" On Sort by Sense, children draw a line from each picture to a sense box; each box shows its word and its body part, so read the five words together. On Which Sense?, children circle one body part in each row. Each page is the same at every level.',
        watch: 'The pictures change from copy to copy. Right: candy, cookies, and other foods go to taste; drums, guitars, bells, and other things that make sounds to hear; flowers to smell; the sand, rock, and feather to touch; things we look at or through (a star, lights, a flashlight, binoculars) to see. A child who says "I can see the sand too" is right; ask, "Which sense tells you it is rough?" No answer key.',
      },
    },
    '1:weather': {
      title: 'Weather Words and the Weekly Forecast',
      objective: 'Children write the weather word for each symbol, read a five-day forecast, and decide which day is best for outdoor recess and which day needs a raincoat.',
      routine: 'On Monday, print a five-day forecast for your town from a local TV station or weather.gov and post it on the Calendar Wall. Read it together and choose the best day for outdoor recess and the day that needs a raincoat. Each morning, a weather helper looks outside and posts the real weather beside the forecast. On Friday, the class compares the two: "Was the forecast right every day?"',
      note: {
        mistake: 'Children think a forecast is a promise, so they are upset when it is wrong. They read every cloud as rain, and mix up the rain and storm symbols. Some think one cold week means it is always cold where they live.',
        words: 'Say: "Weather is what the air outside is like today. A forecast tells what the weather will probably be." On Write the Weather Word, children find each symbol\'s word in the bank and write it, one letter in each box: "Count the boxes. The word has that many letters." On Read the Weekly Forecast, the five days have one symbol each; read each question aloud, children find the symbol, then circle the day under it. Each page is the same at every level. Ask the class questions too: "Which day is best for recess? Which day needs a raincoat?"',
        watch: 'Right on the word page: sun, cloud, rain, storm, snow, and rainbow, each matching its number of boxes. On the forecast page, the days change from copy to copy; check that the circled day has the symbol the question names. For recess, accept a sunny or a cloudy day with a reason. A child who circles the day before or after has lost track of the column: have him or her point from the symbol straight down. No answer key.',
      },
    },
    '1:sun-earth-moon': {
      title: 'Sun, Earth, and Moon',
      objective: 'Children read facts about the Sun, the Earth, and the Moon and check which one each fact is about, then put pictures of the Moon in order as its lit part grows and shrinks.',
      routine: 'Darken the room and set a lamp without its shade on a table as the Sun; nobody touches the hot bulb. In small groups, with room to turn, each child holds a foam ball on a pencil at arm\'s length, a little above the head, as the Moon, and faces the lamp. Children turn slowly in a circle and watch the ball\'s lit part grow from a thin sliver to a full circle and shrink again.',
      note: {
        mistake: 'Children say the Moon makes its own light, that it really changes shape, and that the Sun goes around the Earth. They do not believe the Sun is a star, because it looks so different from the stars at night.',
        words: 'Say: "The Sun is a star. It makes its own light and heat. The Moon has no light of its own; sunlight shines on it. The Moon does not change shape: we see more or less of its sunny side." On Sun, Earth and Moon, children read each sentence, with you as needed, and check one box: Level 1 has six sentences, Level 2 eight, Level 3 ten. On Moon Phases in Order, say: "The white part is the part we see lit by the Sun. A wedge that gets wider means the lit part grows." Children write 1 to 5 in each row. That page is one level.',
        watch: 'Right: covered in craters, goes around our planet, shape seems to change, and the smallest are the Moon; big oceans, air we can breathe, a planet, and its turning gives day and night are the Earth; makes its own light, a star, the biggest, and the hottest are the Sun. In the growing row, the dark moon is 1, then the thin sliver, the half, the almost-full moon, and the full moon 5; the shrinking row starts at the full moon. No answer key.',
      },
    },
    '1:animal-classes-coverings': {
      title: 'Animal Groups and Body Coverings',
      objective: 'Children sort animals into mammals, birds, and reptiles by their body coverings (fur, feathers, scales) and tell how each covering helps.',
      routine: 'Pass around a feather, a scrap of fake fur, and a toy lizard or a photo of snakeskin, and let children feel and describe each one. Then test fur: fill two cups with warm (not hot) tap water, wrap one in the fake fur, and leave the other bare. After 15 minutes, children touch both cups: the wrapped one is still warmer.',
      note: {
        mistake: 'Children say a penguin is not a bird because it cannot fly, and that a bat is a bird because it flies. They think a turtle has no scales because of its shell. Some sort by where an animal lives or by its size.',
        words: 'Say: "Mammals have fur or hair. Birds have feathers. Reptiles have dry scales." Then: "Fur keeps a mammal warm. Feathers keep a bird warm and help most birds fly. Scales protect a reptile\'s skin." On Sort the Animals, children draw a line from each animal to Mammals, Birds, or Reptiles; on Animal Coverings, to Fur, Feathers, or Scales. Both pages have 6 animals on Level 1, 9 on Level 2, and 12 on Level 3.',
        watch: 'In the first copies, the mammals are the wolf, sheep, panda, zebra, pig, dog, giraffe, cat, fox, rabbit, and lion; the birds the seagull, owl, penguin, woodpecker, duck, swan, peacock, and parrot; the reptiles the snake, tortoise, turtle, chameleon, iguana, gecko, and alligator. A pig has short, bristly hair even when you cannot see it, and its babies drink milk: it is a mammal. The turtle\'s shell is covered with big scales. The fish on Level 3 of the coverings page has scales but is not a reptile. No answer key.',
      },
    },
    '1:body-parts': {
      title: 'Parts of Our Body and Their Jobs',
      objective: 'Children label the parts of the human body, tell the job of each part, and compare our parts with an animal\'s: our hands grab like a monkey\'s, our eyes face forward like an owl\'s.',
      routine: 'Trace one volunteer\'s body on a long sheet of butcher paper. Children take turns writing a body word on a sticky note and sticking it on that part, and the class says the part\'s job: "Hands hold things. Legs walk and run. Ears hear." Then show photos of a monkey holding a branch and an owl looking straight ahead, and children compare: "Our hands grab like a monkey\'s. Our eyes face forward like an owl\'s." Hang the tracing for the lesson.',
      note: {
        mistake: 'Children mix up the shoulder and the elbow, and call the whole arm "hand" and the whole leg "foot," so they write "arm" for the shoulder tag. When spelling, they skip letters and leave boxes empty.',
        words: 'Say: "Every part of our body has a job." Ask: "What would be hard without your elbows? Without your knees?" The page has a figure with six numbered tags; children find each tag and write the part\'s name, one letter in each box. The page has no word bank, so leave the sticky notes from the tracing in sight, or write the words on the board. Say: "Count the boxes. The word has that many letters." The page is one level.',
        watch: 'In the first copy the six parts are the ear, mouth, shoulder, arm, hand, and knee; other copies choose other parts, so check each tag on the figure. A word is right when it names the tagged part; accept a letter or two off when the child says the word and the boxes count. Ask about two parts, "What job does it do?" A child who writes "leg" for the knee tag is close: point to the bend and ask what it is called. No answer key.',
      },
    },
    '1:habitats-needs': {
      title: 'Where Animals Live and What They Need',
      objective: 'Children match animals to the habitats where they find food, water, and shelter, and tell what each animal needs.',
      routine: 'Lay four large sheets of paper on tables labeled rainforest, savanna, pond, and ocean, with a photo or a drawing of each. Children place toy animals or animal photos where each one lives and tell where it finds food, water, and shelter: "The beaver eats bark, drinks from the pond, and lives in a lodge." Then walk the schoolyard: a grown-up lifts a log or a rock, rolling it toward himself or herself; children look but never reach under it. Put it back gently.',
      note: {
        mistake: 'Children think an animal chooses where it likes to live, as people do. They think every water animal can live in any water, and that whales and dolphins are fish. Some think a savanna is a zoo.',
        words: 'Say: "A habitat is the place where an animal finds what it needs: food, water, and shelter." Ask: "Could a whale live in a pond? Why not?" On Animal Habitats, four pictures are labeled A, rainforest; B, savanna; C, pond; and D, ocean; children write the letter under each animal. That page is one level. On Where Do Animals Live?, children draw a line from each animal to Land or Water: Level 1 has 6 animals, Level 2 8, Level 3 10.',
        watch: 'Right on the habitats page: the toucan, macaw, and gorilla A; the lion B; the beaver and dragonfly C; the whale and octopus D. On the land page (the animals change from copy to copy): the cat, dog, lion, horse, and elephant land; the fish, dolphin, whale, shark, jellyfish, and octopus water. A child who says "a dolphin breathes air" is right: it comes up to breathe and still lives in water. Ask about one animal, "What does it eat there?" No answer key.',
      },
    },
    '1:plant-parts': {
      title: 'Parts of a Plant',
      objective: 'Children dig up a weed or a bean plant, wash the roots, find the roots, stem, leaves, and flower, and label each part and its job on a diagram.',
      routine: 'With gloves, pull up a few small weeds from the schoolyard (ask first) or bean plants the class grew. Shake off the soil, swish the roots in a tub of water, and lay each plant on a paper towel. Children look with magnifying glasses and point to the roots, stem, leaves, and any flowers. Open a pea pod to find the seeds. Then stand a celery stalk with leaves in a cup of water with food coloring; the next day the leaves show the color. Wash hands afterward.',
      note: {
        mistake: 'Children think plants eat soil through their roots and that roots are the bottom of the stem. They call every colorful part a flower, and do not know that the pod is a fruit or that the beans inside are seeds.',
        words: 'Say: "Roots take in water and hold the plant in the soil. The stem holds the plant up and carries water. Leaves use sunlight to make the plant\'s food. The flower makes seeds, and the fruit holds the seeds." Ask about the celery: "How did the color get to the leaves?" (Up the long celery stalk, which carries water the way a stem does.) The page: children write the name of the part each numbered tag points to. Level 1 has four tags and a bank (leaf, stem, flower, roots); Level 2 six tags and a bank that adds seed and fruit; Level 3 six tags and no bank.',
        watch: 'Check each tag against the drawing: the fruit is the green pod, and a seed is one bead inside it; the leaf tag sits on a leaf, and the roots tag sits in the soil. On Level 3, write the six words on the board for children who need them. Accept invented spelling when the part is right. Ask about one part, "What is its job?" No answer key.',
      },
    },
    '1:life-cycles': {
      title: 'Life Cycles in Order',
      objective: 'Children put the life cycles of a chicken, a butterfly, a frog, and a plant in order and tell what the young looks like at each stage.',
      routine: 'Act out the butterfly life cycle together: curl up small as an egg on a leaf, crawl and munch as a caterpillar, hold still wrapped in arms as a chrysalis, then stretch and flap as a butterfly that lays eggs again. Then hand out large stage cards for the chicken, the frog, and a bean plant. Small groups stand in a circle in the right order and walk around once, to show that the cycle starts again.',
      note: {
        mistake: 'Children think a caterpillar and a butterfly are two different animals, and that a tadpole is a fish. They put the stages in a line and stop at the grown-up. Some put the hen first and the egg last.',
        words: 'Say: "A life cycle is the way a living thing grows and changes. When it is grown, it has young, and the cycle starts again." Ask: "Does the caterpillar look like its parent? What changes?" On The Life Cycle of a Chicken, children write 1, 2, and 3 under eggs in a nest, a chick, and a hen; that page is one level. On Butterfly Life Cycle, Level 1 prints the egg as 1 and the butterfly as 4, and children write 2 and 3; on Level 2 only the egg is printed, children write 2 to 4, and the last box asks what comes after the butterfly; Level 3 prints no numbers.',
        watch: 'Right: the eggs 1, the chick 2, and the hen 3; the egg 1, the caterpillar 2, the chrysalis 3, and the butterfly 4. The box after the butterfly is 1: the butterfly lays eggs, and the cycle starts again. A child who writes 5 sees a line, not a cycle. Call it a chrysalis; a moth spins a cocoon. No answer key.',
      },
    },
    '1:materials-recycling': {
      title: 'What Is It Made Of?',
      objective: 'Children sort clean recycling into paper, cardboard, plastic, glass, metal, and wood by how each one looks and feels, and draw three things their family recycles at home.',
      routine: 'Bring clean, empty things: a newspaper, a cereal box, a plastic bottle, a glass jar, a can with taped edges, and a wooden craft stick. Children tap each one with a pencil (metal rings, glass clinks, plastic thuds) and try to bend it (paper bends), then sort the things onto trays by material. A grown-up handles the glass; anything chipped or broken stays out.',
      note: {
        mistake: 'Children decide by color or shine: anything clear is glass, and anything shiny is metal. They call a cardboard box paper, and think a thing is made of what is inside it, such as a jar of jam being "jam."',
        words: 'Say: "Look and feel, then test. What is it made of?" Ask: "Does it bend? What sound does it make when you tap it?" On What Is It Made Of?, eight things are numbered; children write the material from the bank (plastic, paper, cardboard, glass, metal) on each line. Read the bank together. On Three Things I Recycle, children draw three things their family recycles at home and write what each one is; it can go home to finish with a grown-up. Each page is one level.',
        watch: 'Right in the first copy: the bolt and the saucepan are metal; the spoon is plastic; the notebook and the sheet of paper are paper; the honey jar and the jam jar are glass; the box is cardboard. Other copies add a toothbrush, comb, glue, shampoo, or sunscreen tube (plastic), an envelope or a letter (paper), and a can (metal). Cardboard is thick, stiff paper; the box is cardboard. On the drawing page, accept any thing the family recycles. No answer key.',
      },
    },
    '1:sink-float': {
      title: 'Sink or Float? Predict and Test',
      objective: 'Children predict and then test whether objects sink or float, find that some heavy things float while some light things sink, and use the results to choose materials for a raft.',
      routine: 'Fill a clear tub with water, lay out towels, and test the things on the pages: a pine cone, a leaf, a rock, a bolt, a nail, metal scissors, a ball, a small pumpkin, a toy boat, a wooden pencil, a block of wood, and an apple. Children predict with a thumbs-up (float) or a thumbs-down (sink), then watch. Let them hold the pumpkin and the nail: which is heavier? A grown-up handles the nail and the scissors.',
      note: {
        mistake: 'Children think heavy things always sink and light things always float. They change their guess after the test so it looks right.',
        words: 'Say: "Scientists make a guess, then test it. A wrong guess teaches us something." Ask: "The pumpkin is heavier than the nail. Why does it float?" On Sink or Float?, children draw a line from each object to the group they THINK it belongs in, before the test (4, 6, or 8 objects on Levels 1 to 3). On the experiment page, each object has two tanks: children color the top ring (floats) or the bottom ring (sinks) in My guess before the test and in The test after it, and the star if they were surprised (4, 6, or 7 objects).',
        watch: 'In water: the leaf, feather, apple, lemon, banana, duck, boat, ball, pumpkin, pine cone, pencil, and log float; the rock, bolt, nail, key, fork, hammer, pliers, and scissors sink. The first page is a guess, so any line is fine there. On the experiment page, check that The test matches what the class saw, and that the guess was not changed. No answer key.',
      },
    },
    '1:vibrations-make-sound': {
      title: 'Feel the Buzz: Vibrations Make Sound',
      objective: 'Children pluck rubber bands, tap a drum with rice on it, twang a ruler, and hum with fingers on their throat, and find that every sound came with something shaking.',
      routine: 'Set up four stations: rubber bands stretched around an open shoebox to pluck; a drum made of plastic wrap pulled tight over a bowl with a rubber band, with a spoonful of rice on top to tap; a ruler held flat on a desk with one end sticking out to twang; and a spot to hum with fingertips resting lightly on the throat. Small groups visit every station. On Day 3, groups try one change: a band stretched a little tighter, or a shorter ruler end. What happens to the sound? Rubber bands stay on the box, never snapped at anyone.',
      note: {
        mistake: 'Children think the sound comes from hitting, not from shaking. They expect to see every shake, so humming "does not count." They do not notice that the sound stops when the shaking stops.',
        words: 'Say: "Sound is made when something shakes back and forth very fast. That shaking is called a vibration." At each station ask, "What shook? Did you feel it, see it, or both?" Then: "Hold the ruler still. What happened to the sound?" The page: at each station children circle "I felt it shake," "I saw it shake," or both. Level 1 has three stations; Level 2 has four and a box to draw the part that moved; Level 3 adds the sentence "The sound came when the ___ shook."',
        watch: 'The page records what each child noticed. Usually children see the rubber bands, the rice, and the ruler shake, and feel their throat shake. Either circle, or both, is right when it is true for that child. The part that moved: the rubber band, the drum top, the end of the ruler, or the throat; on Level 3 accept any of them. On Day 3, a tighter band or a shorter ruler end makes a higher sound, because it shakes faster. No answer key.',
      },
    },
    '1:sound-moves-things': {
      title: 'Sound Makes Things Move',
      objective: 'Children bang a pan near a drum with rice on it, dip a ringing tuning fork into water, and rest a hand on a speaker playing music, and find that sound can make things vibrate.',
      routine: 'Hold a metal pan close to the plastic-wrap drum with rice on it, without touching it, and bang the pan with a wooden spoon; warn the class before each bang. Then strike a tuning fork (borrow one from the music room) on a rubber eraser and dip its tips into a clear cup of water. Last, each child rests a hand on a small speaker playing music. Keep the bangs short, and wipe up spilled water.',
      note: {
        mistake: 'Children think the wind from the pan moved the rice, or that the pan must touch the drum. They think sound is only something we hear, not something that can push. Some draw the "with the sound" picture the same as "before."',
        words: 'Say: "Sound travels through the air as vibrations, and it can make other things vibrate too." Ask: "The pan did not touch the drum. What made the rice jump?" Try a soft bang and a loud bang. For each test, children draw the thing before the sound and with the sound, then circle what happened. Level 1 has two tests (the pan and the tuning fork); Level 2 adds the speaker; Level 3 adds the sentence "The sound made the ___ move."',
        watch: 'The page records the class\'s tests. A right drawing shows the rice still before and jumping with the sound, the water flat before and splashing with the sound. On the speaker row, children circle what their hand felt. If nothing moved, bang louder or closer and test again; record what really happened. On Level 3, accept the rice, the water, the speaker, or my hand. No answer key.',
      },
    },
    '1:cup-telephone': {
      title: 'Cup Telephones',
      objective: 'Children build a cup-and-string telephone, test it with the string tight, loose, and touching a chair, and find the string must be tight to carry a whisper.',
      routine: 'Each pair gets two paper or plastic cups and about 15 feet of string or yarn. A grown-up pokes a small hole in each cup bottom with a pencil. Children push the string ends through, tie a big knot inside each cup, and walk apart. One whispers into a cup while the other listens. Test with the string pulled tight and hanging loose; on Day 3, test it touching a chair and try one change of your own. Keep string away from necks.',
      note: {
        mistake: 'Children think the sound travels through the air between the cups, so a loose string should work. They shout instead of whispering, so they hear each other without the telephone.',
        words: 'Say: "Your voice makes the cup bottom vibrate. The string carries the vibrations to the other cup, and it gives them back as sound." Ask: "What changed when the string was loose?" Say: "Whisper, so you only hear it through the string." The page: children circle the cups and the string the class used, then circle "I heard it" or "I did not hear it" for each test. Level 1 has two tests (tight, loose); Level 2 adds a drawing of our telephone and the chair test; Level 3 adds one change that made the telephone work better.',
        watch: 'The class\'s results decide. Most groups hear the whisper with the string tight and not with it loose or touching the chair. A group that heard a little through a loose string can circle "I heard it": ask, "Was it as clear as with a tight string?" On Level 3, accept any change the class really tried, such as pulling the string tighter or keeping it off the chair. No answer key.',
      },
    },
    '1:see-with-light': {
      title: 'We See Only with Light',
      objective: 'Children peek through a hole into a closed shoebox with a toy inside, then open a flap in the lid, and explain that they could see the toy only when light shone on it.',
      routine: 'Make a peep box: a shoebox with a small toy inside, a hole the size of a pencil in one end, and a flap cut in the lid on three sides so it can open. Tape the box shut so no light gets in. Each child looks through the hole with the flap closed, then again with the flap open while a friend shines a flashlight in. Shine the light into the box, never into eyes.',
      note: {
        mistake: 'Children think we can see in total darkness if we wait, or that cats can. Some think our eyes send out light. If light sneaks in through a gap, they say they saw the toy in the dark.',
        words: 'Say: "We see a thing when light shines on it and bounces into our eyes. No light, no seeing." Ask: "What was different when the flap was open?" The page shows the box twice, flap closed and flap open. Level 1: children circle "I saw it" or "I did not see it" for each box. Level 2 adds a box to draw what they saw through the hole. Level 3 adds the sentence "I could see the toy when ___."',
        watch: 'Right: with the flap closed, children did not see the toy; with it open, they did. A child who saw something with the flap closed is telling the truth: light got in through a gap. Tape it, test again, and talk about it. On Level 3, accept "the flap was open" or "light came in." No answer key.',
      },
    },
    '1:light-through-materials': {
      title: 'Does Light Go Through?',
      objective: 'Children shine a flashlight at wax paper, plastic wrap, cardboard, a clear cup, thick cloth, and foil, and sort each one: lets all light through, lets some through, or blocks it.',
      routine: 'Dim the room and tape a sheet of white paper to the wall. Pairs hold each material between a flashlight and the paper: wax paper, plastic wrap, cardboard, a clear plastic cup, a folded towel, and foil. They look at the paper: a bright spot, a dim spot, or no spot at all. Then they sort the materials onto three trays: all light, some light, no light. On Day 3, each child tests one more thing from the room. Never shine the flashlight into eyes.',
      note: {
        mistake: 'Children think foil lets light through because it is shiny, or that clear things are "nothing." They judge by color instead of by looking at the spot on the paper.',
        words: 'Say: "Some materials let all the light through, some let a little through, and some block it." Teach the words clear (all light), cloudy (some light), and blocks (no light). Ask: "Look at the paper. Is the spot bright, dim, or gone?" Level 1: children color the box for all light, some light, or no light for four materials. Level 2 has six materials. Level 3: children write clear, cloudy, or blocks from the word bank, then test one more thing from the room, draw it, and write its name.',
        watch: 'Right: plastic wrap and the clear cup let all light through (clear); wax paper lets some through (cloudy); cardboard, foil, and thick cloth block it. A thin cloth may let some light through: accept what the class\'s cloth did. On Level 3, the extra material and its word must match the test. No answer key.',
      },
    },
    '1:mirrors-bounce-light': {
      title: 'Mirrors Bounce Light',
      objective: 'Children use a small unbreakable mirror to bounce a flashlight beam onto a paper star on the wall, and find that a mirror sends light off in a new direction.',
      routine: 'Tape a paper star on the wall. Pairs get a flashlight and a small unbreakable plastic mirror. One child shines the light at the mirror, held on a desk; the other turns the mirror slowly until the spot of light lands on the star. Then move the star and try again. Never shine the light, or its bounce, into anyone\'s eyes.',
      note: {
        mistake: 'Children think the mirror makes its own light, or that light goes through it. They think it does not matter which way the mirror is turned. Some draw the path from the star back to the flashlight.',
        words: 'Say: "Light travels in a straight line until it hits something. A mirror bounces the light off in a new direction." Ask: "Which way did you turn the mirror to reach the star?" Level 1: children trace the dashed path from the flashlight to the mirror to the star, and color the star when their real light lands on it. Level 2: in each room, children circle the one mirror of three that is turned the right way. Level 3: children draw the path with arrows through two mirrors, then choose a mirror in a second room.',
        watch: 'Right on Level 2: when the star is below the light, the mirror slanted like \\; when the star is above, the mirror slanted like /. A mirror standing straight up sends the light back. Test any argued room with a real mirror. On Level 3, the arrows go from the flashlight to the lower mirror, up to the top mirror, and across to the star. Check that every arrow points the way the light travels. No answer key.',
      },
    },
    '1:shadows-near-far': {
      title: 'Shadows',
      objective: 'Children hold toys in a flashlight beam, see that a shadow forms where something blocks the light, and find that the shadow grows when the toy moves closer to the flashlight.',
      routine: 'Dim the room and shine a flashlight at a wall from a desk. Children make hand shadows, then hold small toys in the beam. One child moves a toy slowly from near the flashlight toward the wall while the class watches the shadow change, and a helper marks the shadow\'s size with tape: once with the toy near the light, once far from it. Keep the flashlight pointed at the wall.',
      note: {
        mistake: 'Children think a shadow is a reflection with the toy\'s colors, or a thing that can come off. Many think the shadow gets bigger when the toy moves closer to the wall.',
        words: 'Say: "A shadow forms where something blocks the light. The closer the toy is to the light, the bigger its shadow." Ask: "Where was the toy when the shadow was biggest?" Level 1: children draw a line from each of four toys to its shadow. Level 2: three toys, then a drawing of a toy near the light and its shadow on the wall. Level 3: three toys, then two drawings (near the light and far from it), a circle on the bigger shadow, and the sentence "The shadow got bigger when ___."',
        watch: 'A shadow matches its toy by outline, not by color: point to the shape. On Level 3, the drawing with the toy near the light has the bigger shadow, and the sentence says "the toy was near the light" or "the toy was close to the flashlight." No answer key.',
      },
    },
    '1:light-messages': {
      title: 'Send a Message with Light',
      objective: 'Children invent a flashlight code with a partner, test whether a classmate across the darkened room can read it, and change the signal until it works every time.',
      routine: 'Pairs invent a code: for example, one flash for yes, two for no, three for come here. Dim the room. One child stands across the room and flashes the light at the floor near the partner\'s feet; the partner says the message out loud. Switch roles. On Day 3, pairs change what did not work (slower flashes, a pause between them, a brighter light) and test again. Never shine the light into eyes.',
      note: {
        mistake: 'Children flash too fast to count, so two flashes look like one. Partners forget to agree on the code before they start. Some think a wrong message means they failed, when it shows what to change.',
        words: 'Say: "People send messages with light: a lighthouse, a traffic light, a car\'s turn signal." Ask: "What made the message hard to read? What can we change?" The page: children color one circle for each flash of their code and draw their signal light, then for each test circle the message they sent, the message their friend read, and "right" or "wrong." Level 1 has yes and no and two tests; Level 2 adds come here and three tests; Level 3 adds one change that made the message easier to see.',
        watch: 'A test is right when the message sent and the message read are the same. The code circles must match the code the pair used. A wrong result is useful data: ask what the pair changed next. On Level 3, accept any change the pair really tried. No answer key.',
      },
    },
    '1:shadow-through-day': {
      title: 'My Shadow Through the Day',
      objective: 'Children trace the shadow of a stick in the morning, near noon, and in the afternoon, and find that the shadow moves and changes length because the Sun seems to move across the sky from east to west.',
      routine: 'On a sunny day, stand a stick upright in a can of sand or soil on the blacktop, in a spot that gets sun all day. The class stands facing south. At about 9:00, at midday when the Sun is highest (about 12:00, or about 1:00 p.m. during daylight saving time), and at about 2:30, a child traces the shadow with chalk and writes the time beside it. Children may point to the Sun, but never look straight at it.',
      note: {
        mistake: 'Children think the shadow is longest at noon, or that it disappears at noon. They think the shadow points toward the Sun, and that the Sun really moves around the Earth.',
        words: 'Say: "We face south. East is on our left, and west is on our right." Say: "The Sun seems to move across the sky from east to west, because the Earth turns." At midday, say out loud: "The shadow is short, but it does not go away. In most of the United States the Sun is never straight overhead." The page calls the midday trace "near noon." Level 1: the Sun is drawn in each picture, and children draw the stick\'s shadow and circle when it was shortest. Level 2: children draw the Sun and the shadow. Level 3 adds "The Sun seems to move from ___ to ___."',
        watch: 'Right: in the morning the Sun is low on the left (east) and the shadow is long on the right (west); near noon the Sun is high and the shadow is short; in the afternoon the Sun is low on the right and the shadow is long on the left. The shadow always points away from the Sun. The shortest shadow is near noon. Level 3: from east to west. No answer key.',
      },
    },
    '1:moon-journal': {
      title: 'Moon Journal',
      objective: 'Children look at the Moon every few days for a month, record its shape, and find that the shapes change in a pattern that repeats and can be predicted.',
      routine: 'Start the journal about a month before this lesson, near a new Moon (a Moon calendar shows when), and send a note home asking families to look for the Moon with their child in the evening. After the full Moon, look in the morning sky too: before school or at morning recess the class can often see it toward the west. Hand out the page on the first day and keep it in folders. On Day 3 of the lesson, children compare their journals and guess the next shape. Looking at the Moon is safe; looking at the Sun is not.',
      note: {
        mistake: 'Children think the Moon comes out only at night and that its shapes change in no order. They color the dark part instead of the bright part. Some think the Earth\'s shadow makes the shapes.',
        words: 'Say: "The bright part of the Moon is the part lit by the Sun. The shape we see changes in a pattern that repeats about every month." In the Sun, Earth, and Moon lesson the moons showed the bright part white; here we color the bright part, so the journal looks like the Moon we see. The new Moon is the dark one; we cannot see it. Level 1: eight boxes, every few days; children write the day, color the bright part, or circle "cloudy" or "not in the sky." Level 2: a numbered circle for every day; circle 1 is the first day of the journal, weekends included; X means clouds hid the Moon, and a dash means it was not in the sky. Level 3 adds a guess for the next shape, then the Moon they saw, and "the same" or "not the same."',
        watch: 'Check that children color the bright part. Over about two weeks the bright part grows from a thin sliver to a full Moon, then shrinks again; in the United States it grows on the right side. Accept a rough shape. Cloudy days are real data. On Level 3, a guess is good when it follows the pattern. No answer key.',
      },
    },
    '1:day-night-sky': {
      title: 'Stars Come Out at Night',
      objective: 'Children compare the day sky and the night sky and explain that the stars are in the sky all the time, but we see them only at night because the bright Sun hides them in the day.',
      routine: 'Poke small holes in a sheet of black paper and tape it over the end of a flashlight. Turn the flashlight on in the bright classroom and shine the "stars" on the ceiling: they are hard to see. Then turn off the lights and close the blinds: the stars are easy to see. Later, go outside on a morning when the Moon is up and look for it. Never look straight at the Sun.',
      note: {
        mistake: 'Children think the stars go away or turn off in the day. They think the Moon is only in the night sky, and that the Sun is not a star.',
        words: 'Say: "The stars are always in the sky. In the day, the Sun is so bright that we cannot see them. The Sun is a star too: the closest one." Ask: "Our flashlight stars were there all the time. Why could we not see them with the lights on?" Level 1: children draw what they can see in the day window and the night window, using the pictures of the Sun, the Moon, and stars. Level 2: the same, without the pictures. Level 3 adds the sentence "The stars are still there in the day, but ___."',
        watch: 'Right: the Sun in the day window and stars in the night window. The Moon may go in either window: we see it at night and on some days. On Level 3 accept "the Sun is too bright" or "the sky is too bright to see them." No answer key.',
      },
    },
    '1:daylight-hours': {
      title: 'How Long Is the Day?',
      objective: 'Children color a bar for the hours of daylight on the 21st of each month from September on, and find that the days are shortest in December and grow longer again.',
      routine: 'Look up the 21st of each month, from September on, on a sunrise-and-sunset table for your town (it shows past dates too), even when the 21st falls on a weekend or in winter break. Round the day length to the nearest hour and add it to a class chart. If you start late, look up the past months together. Level 1 needs September to December; Levels 2 and 3 also need January 21. Add April when it comes.',
      note: {
        mistake: 'Children think the days are the same length all year, or that winter days are short because it is cold. Some read the clock time of sunset as the length of the day.',
        words: 'Say: "Daylight is the time from sunrise to sunset. In our winter the days are short, and in summer they are long. The shortest day is around December 21." Ask: "What happened to the bars from September to December? And in January?" Level 1: children color the bars for September to December from the class chart and circle the month with the shortest day. Level 2 adds January and a box to write each month\'s hours. Level 3 adds a dashed guess for April. On every level, if months are the same, children circle all of them.',
        watch: 'The bars must match the class chart. In the northern half of the country December is the shortest bar. In much of the South and Southwest, November, December, and January round to the same hour: children circle all of them, and you may show the minutes from the table, where December 21 is still the shortest day. The April guess is good when it is longer than January; color the real bar when April 21 comes. In Alaska a December bar can be under 7 hours: leave it empty and write the number. No answer key.',
      },
    },
    '1:animal-parents': {
      title: 'Animal Parents and Their Young',
      objective: 'Children read about animal families, record what parents do (feed, carry, keep warm, protect) and what babies do (call, follow) to help the young survive, and find that some animals, like sea turtles, never care for their young.',
      routine: 'Read short picture books or watch short clips about animal families: a cat and kittens, a kangaroo and a joey, penguins, robins, and sea turtles. After each one, the class adds to a two-column chart: what the parent did and what the baby did. On Day 3, read about the sea turtle, finish the chart, and act it out: a "baby" calls, and a "parent" comes to feed or protect it.',
      note: {
        mistake: 'Children think every animal takes care of its babies, and that only mothers do. They think babies just wait to be cared for and do nothing to help. Some think a robin carries its chicks.',
        words: 'Say: "Parents help their young survive: they feed them, carry them, keep them warm, and protect them. Babies help too: they call when they need something and follow their parents." Say: "A sea turtle lays her eggs in the sand and swims away. The babies find the sea by themselves." The page: children circle what each parent and each baby does, as the book or clip showed. Level 1 has the cat and the kangaroo. Level 2 has four families and asks which parent never takes care of its babies. Level 3 has three families, a sentence for each ("The parent ___ so the baby ___."), and the same question.',
        watch: 'Circles should match what the class read or saw. A cat feeds, carries (by the neck), keeps warm, and protects; kittens call and follow. A kangaroo carries its joey in a pouch. Penguin parents keep the chick warm on their feet and feed it. Robin parents feed and keep chicks warm but do not carry them. The sea turtle is the parent that never takes care of its babies. No answer key.',
      },
    },
    '1:design-like-an-animal': {
      title: 'Copy an Animal: Design a Helper',
      objective: 'Children study an animal part (a duck\'s webbed feet, a bird\'s beak, a beaver\'s teeth) and design something for people that copies how it works.',
      routine: 'First, children paddle in a tub of water with fingers spread, then with a plastic sandwich bag over the spread hand, like a webbed foot, and feel which pushes more water. Then each child makes beak tongs from two craft sticks and a clothespin and picks up pom-poms or dry beans. On Day 3, pairs build a model of their own invention from craft sticks, paper, tape, and clothespins, and show the class how it works.',
      note: {
        mistake: 'Children copy how the animal looks instead of how its part works: tongs shaped like a bird\'s head. They think an invention must be big or have a motor.',
        words: 'Say: "Engineers copy how an animal\'s body part works to solve a problem for people." Ask: "What does this part do for the animal? What could it do for people?" Level 1: children draw a line from each animal part to the invention that copies it, then draw one invention. Level 2: children circle one animal part (a woodpecker\'s beak, a toucan\'s beak, or a whale\'s body shape), draw an invention that copies it, and finish "It helps people ___." Level 3 adds "My ___ works like a ___ because ___."',
        watch: 'Right on Level 1: the duck\'s webbed feet go with the paddle, the beaver\'s front teeth with the saw, and the toucan\'s beak with the tongs. On Levels 2 and 3, accept any invention that copies how the part works: a woodpecker beak like a hammer or a drill, a toucan beak like tongs, a whale\'s shape like a submarine or a boat. Ask, "How does it work like the animal\'s part?" No answer key.',
      },
    },
    '1:like-parents': {
      title: 'Like Their Parents, but Not Exactly',
      objective: 'Children compare young animals with their parents and find how each young animal is like its parent and how it is different.',
      routine: 'Show photos of animal parents and their young: a dog and puppies, a cat and kittens, a swan and gray cygnets, a horse and a foal. Pairs take one photo, find one way the young is like its parent and one way it is different, and tell the class; write the words on a two-column chart, alike and different. On Day 3, each pair compares a second photo. Keep the comparisons to animals; do not ask children to compare themselves with their own families.',
      note: {
        mistake: 'Children expect a baby to be a tiny copy of its parent, so a gray cygnet "cannot be" a swan\'s baby. They think size is the only difference, or call every clue different.',
        words: 'Say: "Young animals are like their parents in many ways, but not exactly." Ask: "What does the foal have that its mother has too? What is different?" The page: for each parent and young, children circle each clue that is the same for both and cross out each clue that is different. Level 1 has the horse and foal; Level 2 adds the sheep and lamb and the hen and chick; Level 3 has two pairs and the sentence "The ___ is like its parent because ___, but different because ___."',
        watch: 'Right: size is different for every pair; has four legs, has a mane, has wool, has two legs, and has a beak are the same; color is different for the hen and the chick (a white hen, a yellow chick). On Level 3, accept any true pair of reasons, such as "The lamb is like its parent because it has wool, but different because it is smaller." No answer key.',
      },
    },
    '1:seedlings-and-parent': {
      title: 'Young Plants and Grown Plants',
      objective: 'Children compare bean seedlings with a grown bean plant and with each other, and find that young plants of one kind are like their parent but not exactly alike.',
      routine: 'Plant the grown bean plant 8 to 10 weeks before this lesson (bush beans flower in about 6 weeks and make pods in 7 to 8) in a big pot in the sunniest window; if you have none, use a large photo of a grown bean plant. Two or three weeks before the lesson, each child plants a bean seed in a clear cup of soil and keeps it watered. Children set their seedling beside the grown plant, measure both with a paper strip, and count the leaves. Wash hands after handling soil.',
      note: {
        mistake: 'Children think a seedling is a different plant because its first leaves look different from the grown plant\'s. They expect all the seedlings to be exactly the same size.',
        words: 'Say: "A young plant is like its parent, but not exactly the same. Young plants of one kind are not all the same either." Say: "A bean seedling\'s first leaves are single leaves. Later leaves grow in threes, like the leaves of our grown plant." The page shows our grown bean plant. Level 1: children draw one seedling, count its leaves, and circle "same" or "different" for leaf shape, size, and color. Level 2 has three seedlings. Level 3 adds the sentence "My seedlings are different from each other because ___."',
        watch: 'The page records what children see. Size is different. Leaf shape is different while the seedling has only single leaves; accept "same" once its leaves come in threes. Color is usually the same green; a seedling that got less light can be paler. Accept a careful leaf count. On Level 3, accept any true reason ("one is taller," "it has more leaves"). No answer key.',
      },
    },
    '1:design-a-raft': {
      title: 'Design a Raft',
      objective: 'Children sketch a raft that will carry ten pennies across a tub of water, choose floating materials, build it, and label how its shape and parts keep the pennies dry.',
      routine: 'Give each group craft sticks, a foam tray, corks, plastic straws, clear packing tape, a metal washer, and 10 pennies. First, test each material in a tub of water: does it float? Groups then sketch a raft from the materials that floated, and build it on Day 2. On Day 3, they set it gently in the water, add the pennies, and see whether the pennies stay dry. Label each raft with the group\'s name, let it dry on a paper towel, and retape loose sticks before the test. Keep pennies away from mouths.',
      note: {
        mistake: 'Children think more material always makes a better raft, and pile the pennies on one side. They build first and plan after, or plan a raft from materials that sank in the float check.',
        words: 'Say: "Engineers plan before they build. Your raft must carry 10 pennies and keep them dry." Ask: "Which materials floated? How will your raft keep the water off the pennies?" Level 1: children check the materials they used and color the raft drawn on the page. Level 2: children draw their own raft and label two parts that keep the pennies dry. Level 3: children draw it, label three parts, and finish "My raft will float because ___."',
        watch: 'The page records each group\'s plan. The checked materials should match what the group used. Good labels name parts that matter, such as "sides," "corks under it," or "flat bottom"; invented spelling is fine. On Level 3, accept a reason tied to the test, such as "corks and foam float." Keep the plans for the next lesson\'s test. No answer key.',
      },
    },
    '1:test-two-rafts': {
      title: 'Test Two Rafts',
      objective: 'Children load two rafts with pennies one at a time, record how many each held before water came over the top, and tell one strength and one weakness of each raft.',
      routine: 'Both boxes on the page say "our raft": each group tests two rafts of its own. Raft A is the raft the group built in the last lesson; at the start of this lesson the group builds Raft B with one change (more corks, sides, or a foam-tray base). Test both in the same tub: a child adds pennies one at a time, in the middle, while the class counts aloud, and stops when water comes over the top or the raft tips; the raft held the pennies before that one. Count the pennies back into a cup.',
      note: {
        mistake: 'Children count the penny that sank the raft, or drop pennies on one side. They decide which raft is better by how it looks, or test one raft more gently than the other.',
        words: 'Say: "A fair test treats both rafts the same way: the same water, the same pennies, one at a time." Ask: "Which raft held more? What made it work?" Level 1: children draw each raft and color one circle for each penny it held, with a "+ more" box after 20. Level 2: a tally mark for each penny and the total. Level 3 adds one good thing and one thing to fix for each raft, and the better raft circled (or both, if they held the same).',
        watch: 'The circles or tallies must match the class count, and the total must match the tallies. The better raft held more pennies. A good thing and a thing to fix should fit what happened: "the sides kept water out," "it tipped, so add corks at the corners." No answer key.',
      },
    },
  },
};
