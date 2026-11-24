'use strict';
/**
 * Teacher notes, English, health: the 10 lessons of the two Grade 3 health units (Daily Teaching System, Stage D-3,
 * 2026-11-24; units in scripts/units/year/place-ready-3.en.science.js; design scripts/units/year/design.en.health.json,
 * grade 3). Each note was written from the page the lesson hands out, at every published level (G3-602 to G3-611, from
 * lcs-stage-d/batch-3/TEXT-DUMP.md and the sheets). Every lesson has its hands-on routine (`routine`), printed under "What
 * the class does" before the page. Three lessons are teacher-led in the design (big feelings, working out a conflict,
 * saying no): their routine leads the lesson with talk, role-play and practice, and the page records it. The notes stay
 * kind and plain: no blame of families, every feeling is OK, no child has to show where they live, 911 is only for
 * emergencies, and a child's worry is never kept as a secret. A note names only the page its lesson hands out and has to
 * fit its sheet of the teacher guide (build-guide.js).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:how-germs-spread': {
      title: 'How Germs Spread and How We Stop Them',
      objective: 'Children explain how germs spread (hands, coughs and sneezes, shared cups and door handles) and why each habit stops them: washing with soap for 20 seconds, coughing into the elbow, using their own cup, and staying home when they have a fever.',
      routine: 'Put a little hand lotion and a pinch of glitter on one child\'s hands as pretend germs, and keep hands away from eyes. That child opens the door, shares a marker, and passes a ball; children look where the "germs" went. Then two children rinse with water only, and two scrub with soap for 20 seconds (sing "Happy Birthday" twice), and the class compares. Practice coughing and sneezing into the elbow. Real germs are too small to see.',
      note: {
        mistake: 'Children think germs are only on things that look dirty, and that water alone washes them off. They sneeze into their hands and then touch things.',
        words: 'Say: "Germs spread on hands, in coughs and sneezes, and on shared cups and door handles. Each habit stops them in a different place." Ask: "Where could the germ have been stopped?" Level 1 has three pictures: children glue each habit beside the picture where it would stop the germ. Level 2 follows the germ through six pictures: children circle each picture where a habit would stop it and write the habit. Level 3 adds a drawing of a new ending where the germ is stopped in picture 1.',
        watch: 'Right: Ava sneezes into her hand, "sneeze into your elbow"; Ava opens the door, and then Ben opens the same door to go to lunch, "wash your hands with soap for 20 seconds" for each; Ben eats without washing, "wash your hands before you eat"; Ben shares his bottle, "use your own water bottle." Only picture 6, the germ reaching Cam, is not circled. The page does not ask about fevers; teach it anyway: a child with a fever stays home. No answer key.',
      },
    },
    '3:myplate-day': {
      title: 'Fuel for the Day: MyPlate Meals and Drinks',
      objective: 'Children plan a day of meals and snacks that uses all five MyPlate food groups, choose water and milk as everyday drinks and soda as a sometimes drink, and explain each choice in a sentence.',
      routine: 'Show the MyPlate picture: fruits, vegetables, grains, protein, and dairy. Set out food pictures or clean, empty packages, and small groups build a breakfast, a lunch, and a dinner on paper plates. Talk about foods from many families and cultures: rice, tortillas, noodles, beans, tofu, and soy milk all fit a group. Then groups sort drink pictures into everyday drinks and sometimes drinks, and tell why.',
      note: {
        mistake: 'Children think healthy means only fruits and vegetables, or that a sometimes food is bad. They forget that drinks count too.',
        words: 'Say: "Across a day, MyPlate meals use all five food groups. Water and milk are everyday drinks; soda is a sometimes drink." Ask: "Which group is missing? How could you add it?" Level 1: children glue foods to plan a lunch, check its food groups, and circle each drink\'s answer. Level 2 plans breakfast, lunch, a snack, and dinner. Level 3 adds "My ___ is missing the ___ group. I can add ___."',
        watch: 'Drinks: water, everyday; milk, everyday; soda, sometimes. The checks must match the foods: the apple and the banana are fruits, the carrot and the broccoli vegetables, the bread and the rice grains, the egg and the fish protein, the milk and the cheese dairy. Fortified soy milk counts as dairy. The plans are pretend: never ask what a child ate at home, and never judge anyone\'s lunch. No answer key.',
      },
    },
    '3:sleep-screens-play': {
      title: 'Sleep, Screens, and an Hour of Play',
      objective: 'Children look at their own school day (how many hours they sleep, against the 9 to 12 hours children their age need; how long they spend on screens; whether they move for 60 minutes) and find one change that would help them feel rested and strong.',
      routine: 'On the board, draw a strip of 24 boxes from 7 AM to 7 AM the next morning and color a made-up child\'s day: school, play, screens, and sleep. Count the sleep boxes together: children ages 6 to 12 need 9 to 12 hours. Then everyone plays one minute of an active game, such as jumping jacks or a fast walk, and talks about what an hour of moving could look like. Children color their own strips privately; nobody has to share.',
      note: {
        mistake: 'Children think they need less sleep than grown-ups, that sleeping in on weekends makes up for late nights, and that only sports count as moving.',
        words: 'Say: "Children your age need 9 to 12 hours of sleep and at least 60 minutes of moving every day." Say: "This is about one change you choose, not a grade." Each box is an hour split into two half hours. Level 1: children color the half hours they sleep and play actively. Level 2 adds school and screens, then counts the hours of sleep (the boxes with a thick line show 9 to 12) and the "Minutes of active play today." Level 3 adds "One change I will try: ___. I will try it on ___."',
        watch: 'Every strip is the child\'s own day, so there is no right answer; check only that the counts match the colored boxes. A good change is small and the child\'s own: "screens off an hour before bed," "play outside after school." Many things are not a child\'s choice, such as a shared room or a grown-up\'s work hours; never blame a family. No answer key.',
      },
    },
    '3:what-sways-my-choices': {
      title: 'What Sways My Choices?',
      objective: 'Children work out how family, friends, ads, and online videos influence their own health choices and their friends\' (a friend who rides without a helmet, an ad for a sugary drink, a family that walks after dinner), and practice one way to make their own choice.',
      routine: 'Tape four signs on the walls: family, friends, ads, online videos. Read a scene aloud, and children walk to the influence, then show a thumb up if it pushes toward a healthy choice or a thumb sideways if less healthy. Talk about how influences can push either way. Then pairs practice making their own choice: one says, "Helmets are for babies," and the other answers in a calm voice, "I still wear mine. Let\'s race to the park."',
      note: {
        mistake: 'Children think influences are always bad, or that only ads influence them. They think they must go along with a friend to stay friends.',
        words: 'Say: "An influence is anyone or anything that pushes our choices. We can notice it and still choose." Ask: "Who is the influence? Which way does it push?" Level 1 has three scenes: children circle the influence and "healthy" or "less healthy," and write what they could do. Level 2 has six scenes. Level 3 adds "This week, an influence I noticed was ___. What I did about it: ___."',
        watch: 'Right: the TV ad for a big, sugary drink, ads, less healthy; Max riding without a helmet, friends, less healthy; Rosa\'s family walk, family, healthy; Mia\'s orange slices, friends, healthy; Sam\'s smoothie video, online videos, healthy; the video about staying up very late, online videos, less healthy. "I could" is the child\'s own: accept any safe, kind choice. No answer key.',
      },
    },
    '3:goal-plan-track': {
      title: 'My Goal: Plan It, Track It, Look Back',
      objective: 'Children set one health goal, write a plan with the steps, the things they need, and the people who will help, track it for three weeks on a chart, and look back on what helped and what got in the way.',
      routine: 'Share a small goal of your own, with its steps, what you need, and who will help. Children choose a goal they can check each day (drink water at lunch, read before bed, play outside for an hour) and plan it with a partner. The chart runs 21 days, at home or at morning meeting, so plan the look-back three weeks later and remind families halfway. Day 2, three weeks later: children count their checked days and look back.',
      note: {
        mistake: 'Children choose goals that are too big or not about them, and think a missed day means they failed. They think changing a goal is giving up.',
        words: 'Say: "A good goal is small, and you can check it every day." Say: "Looking back is not a test: it tells us what to keep or change." Level 1: the goal and two steps, what I need, who will help, 21 days to check, and the look-back. Level 2 adds why it matters and three steps. Level 3 adds "On a busy day, my backup step is ___."',
        watch: 'Accept any small, safe goal the child can do; a helper can be a grown-up at home or at school. "I worked on my goal on ___ of 21 days" must match the checks. "Keep my goal," "change my goal," and "I met my goal!" are all honest choices. Keep the counts private, and praise the plan and the effort, not the number. No answer key.',
      },
    },
    '3:big-feelings': {
      title: 'Big Feelings: Name It, Calm It, Say It',
      objective: 'Children name a feeling and how strong it is, use a calm-down tool, and say it with an I-message (\'I feel ... when ... I need ...\'), knowing that every feeling is OK and that what we do with it is the choice.',
      routine: 'Lead the lesson with talk and practice; the page records it. Hold up six feeling cards: someone cut in line, a friend did not save a seat, a lost library book, and three of your own. For each, children show the feeling on their faces, rate it from 1 to 5 with their fingers, and try a calm-down tool together: three deep breaths, counting slowly to 10, or a break in the calm corner. Model an I-message, then pairs practice one.',
      note: {
        mistake: 'Children think some feelings are bad, or that they must hide anger or sadness. They use "you" messages that blame ("You made me mad") instead of telling what they feel and need.',
        words: 'Read the page together: "Every feeling is OK. What we do with a feeling is our choice." Ask: "How big is it, from 1 to 5? What can help?" Model: "I feel ___ when ___. I need ___." Level 1: for each of three cards, children circle a feeling (angry, sad, scared, happy, or worried, frustrated, disappointed, left out, or another), color how big it is, and circle a calm-down tool. Level 2 adds an I-message for two cards. Level 3 adds helping a partner write one.',
        watch: 'Every answer is the child\'s own: two children can feel differently about the same card, and both are right. An I-message names a feeling and a need without blame: "I feel angry when someone cuts in front of me. I need a fair turn." If a child shares a worry about safety, follow your school\'s reporting steps; do not ask leading questions or promise to keep it a secret. No answer key.',
      },
    },
    '3:solve-a-conflict': {
      title: 'Working It Out: Solving a Conflict',
      objective: 'Children practice the steps of working out a conflict (cool down, each tell their side with an I-message, listen, think of solutions, choose one that is fair to both) and know when to get a grown-up instead.',
      routine: 'Lead the lesson with talk and role-play; the page records it. Tape a talk-it-out mat on the floor with the five steps in order. Two volunteers act out both wanting the same swing at recess and walk the mat step by step while the class coaches: cool down, each tell your side with an I-message, listen, think of solutions together, choose one that is fair to both. Then the class sorts real problems: which can we work out, and which need a grown-up right away?',
      note: {
        mistake: 'Children think whoever wins the argument solved it, or that telling a grown-up about hitting is tattling. They skip cooling down and jump to solutions.',
        words: 'Say: "A fair solution works for both people." Say: "Get a grown-up right away when someone is hurt, hitting, or saying they will hurt someone." Level 1: children read the steps with you, circle every fair solution for the swing, and draw the friends after they work it out. Level 2 adds gluing the steps in order, 1 to 5, and an I-message. Level 3 adds sorting problems into "We can work it out" and "Get a grown-up right away."',
        watch: 'Fair solutions: "play together," "take turns," and "use a timer and switch." Steps in order: cool down; each tell your side with an I-message; listen to the other side; think of solutions together; choose one that is fair to both (accept steps 2 and 3 in either order). Get a grown-up right away: someone got hurt, someone says they will hurt someone, someone is hitting or pushing. We can work it out: the swing, which game to play, a friend who keeps changing the rules. No answer key.',
      },
    },
    '3:say-no-walk-away': {
      title: 'Saying No and Walking Away',
      objective: 'Children practice refusal skills (say no clearly, give a reason, suggest something else, walk away and tell a trusted adult) for scenes such as a dare to ride without a helmet, a friend offering medicine that is not theirs, or a game that leaves someone out.',
      routine: 'Lead the lesson with role-play; the page records it. Teach the four ways: say no clearly, give a reason, suggest something else, walk away and tell a trusted adult. Model a weak no ("No... well, okay") and a strong one, in a calm, firm voice, standing tall and looking at the person. In pairs, children practice three scenes: a dare to ride without a helmet, a friend offering medicine that is not theirs, and a game that leaves the new kid out. A child may pass.',
      note: {
        mistake: 'Children think saying no makes them a bad friend, or that "maybe" works like no. They think medicine from a friend is safe because it is medicine.',
        words: 'Say: "A clear no is short and strong. You can still be kind." Say: "Medicine comes only from your grown-up or the school nurse." Level 1: children circle the clear way to say no in three scenes and write the trusted adult they will tell. Level 2 adds "No, I will not ___ because ___." Level 3 adds "Let\'s ___ instead."',
        watch: 'Right: "No. I always wear my helmet."; "No. I only take medicine from my grown-up or the school nurse."; "No. Everyone can play." A trusted adult can be a parent, a teacher, the school counselor, or another grown-up the child trusts. A reason and a suggestion are the child\'s own; accept any that are safe and kind. No answer key.',
      },
    },
    '3:fire-escape-plan': {
      title: 'Our Home Fire Escape Plan',
      objective: 'Children draw a map of their home with two ways out of every room and an outside meeting place, learn that a grown-up tests the smoke alarms every month, and practice the plan with their family at home.',
      routine: 'Practice at school first: find two ways out of the classroom on the school fire map. Practice crawling low under pretend smoke (a sheet held up by two grown-ups) and feeling a closed door with the back of the hand before opening it. Children may draw their own home, a made-up home, or the school; nobody has to show where they live. A child in an apartment marks the stairs, never the elevator. Send the plan home with the family checklist.',
      note: {
        mistake: 'Children think they should hide under a bed or in a closet, or go back inside for a pet or a toy. They think a smoke alarm tests itself, and that 911 should be called from inside.',
        words: 'Say: "Know two ways out of every room. Get out, stay out, and call 911 from outside." Say: "A grown-up tests the smoke alarms every month." Level 1: children draw one room with two ways out, the smoke alarm, and the meeting place outside. Level 2 draws every room. Level 3 adds, on the checklist, "Our day:" for the practice day and "Who:" for the grown-up who tests the alarms. Every level carries the take-home checklist.',
        watch: 'Check that every room drawn has two ways out marked with arrows, at least one smoke alarm, and one meeting place outside, such as a tree or a mailbox. A window high above the ground is a way out only with a grown-up\'s plan. Some families cannot practice at home; praise the plan itself, and never blame. No answer key.',
      },
    },
    '3:who-can-help': {
      title: 'Who Can Help? Trusted Adults and Health Resources',
      objective: 'Children decide which trusted adult or resource fits each situation (the school nurse for a stomachache, the school counselor for a worry, a parent for a bad dream, a lifeguard at the pool, 911 for an emergency), practice asking clearly for help, and know to keep asking if the first adult cannot help.',
      routine: 'Children practice asking for help clearly: who you are, what happened, and what you need ("Excuse me, I can\'t find my grown-up. Can you help me?"). Act out short scenes with a pretend lifeguard, school nurse, and store worker. Practice a pretend 911 call on an unplugged phone (your name, where you are, what happened), and talk about what an emergency is: 911 is only for emergencies. If the first grown-up cannot help, keep asking.',
      note: {
        mistake: 'Children think they should not bother a grown-up, or stop after one grown-up cannot help. They think 911 is for any problem, or that only family can help.',
        words: 'Say: "Choose the helper who fits the problem, and ask clearly. If that helper cannot help, keep asking until someone does." Read the page together: "A helper can get more than one line." Level 1 has four problems and four helpers. Level 2 has eight problems and six helpers, including 911. Level 3 adds "If that helper could not help, I would ask ___."',
        watch: 'Right: a bad dream at night and a headache at home, a parent; a friend who cannot swim well, the lifeguard; a stomachache at school, the school nurse; lost in a store, a store worker at the checkout; a fire in a building, call 911; a classmate left out again and again and a worry at school that will not go away, the school counselor. "A parent" means any grown-up who cares for the child at home. No answer key.',
      },
    },
  },
};
