'use strict';
/**
 * Teacher notes, English, health: the 11 lessons of the two Grade 2 health units (Daily Teaching System, Stage D-3,
 * 2026-11-24; units in scripts/units/year/place-ready-2.en.science.js; design scripts/units/year/design.en.health.json,
 * grade 2). Each note was written from the pages the lesson hands out, at every published level: the new pages G2-605 to
 * G2-613 from lcs-stage-d/batch-2/TEXT-DUMP.md and the sheets, the published pages G2-379, G2-360 and G2-361 from fresh
 * renders (lcs-stage-d/notes-2; those are published at one level). Every lesson has its hands-on routine (`routine`),
 * printed under "What the class does" before the page. The notes stay kind and plain: no blame of families, every feeling
 * is okay, "Stop" is respected, and a child's worry is never kept as a secret. A note names only the pages its lesson
 * hands out and has to fit its sheet of the teacher guide (build-guide.js).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '2:three-ways-healthy': {
      title: 'Healthy in Body, Feelings, and Friendships',
      objective: 'Children sort healthy actions into three parts of being well (my body: sleep, food, moving; my feelings: calming down, talking about a worry; my friendships: playing fair, including others) and name one thing they already do for each part.',
      routine: 'Lay three hoops on the floor with signs: my body, my feelings, my friendships. A child acts out an action without words (yawning and lying down, taking a slow breath, sharing crayons, inviting someone to play), the class guesses it, and the actor stands in the hoop it helps. Practice one calm breath together: smell the flower, blow out the candle. End in a circle: each child names one thing he or she already does for one part, or passes.',
      note: {
        mistake: 'Children think being healthy means only food and exercise. They think a worry should be kept inside, that some feelings are bad, or that telling a grown-up a worry is tattling.',
        words: 'Say: "Being healthy means taking care of my body, my feelings, and my friendships." Say: "All feelings are okay. What we do with them can help us." Ask: "Which part does this help?" Level 1: children cut out six cards and glue each under my body, my feelings, or my friendships. Level 2 has nine cards. Level 3 adds "Write one more thing you do under each part."',
        watch: 'Right: sharing crayons, inviting a friend to play, and taking turns in a game help my friendships; telling a grown-up a worry, a deep breath to calm down, and drawing to feel better help my feelings; sleeping at night, running fast, and eating an apple help my body. If a child says running with friends helps friendships too, agree, and ask which part the card shows most. On Level 3, accept any true thing the child does. If a worry a child shares makes you concerned for his or her safety, follow your school\'s reporting steps, and never promise to keep it a secret. No answer key.',
      },
    },
    '2:healthy-habits-why': {
      title: 'Why We Do Healthy Habits',
      objective: 'Children match each habit to what it protects (washing hands keeps germs away, brushing teeth twice a day keeps teeth strong and stops cavities, sleep rests the body and the brain, moving makes the heart and muscles strong, sunscreen and a hat keep skin from burning) and explain one habit in a full sentence.',
      routine: 'Put a drop of hand lotion and a pinch of ground cinnamon on one child\'s hands as "germs." Children shake hands around the circle and look: the "germs" spread to many hands. Two children rinse with water only, and two scrub with soap for 20 seconds (sing "Happy Birthday" twice), then compare. Last, everyone jogs in place for a minute and feels the heart beat faster. Check for skin allergies first, and keep hands away from eyes until everyone has washed.',
      note: {
        mistake: 'Children think water alone washes germs away, or that hands are clean if they look clean. They think brushing once a day is enough, and that sleep is only for when they feel tired.',
        words: 'Say: "A habit is something we do again and again. Each healthy habit protects us." Ask: "Why do we do this one?" Ask children to answer in a full sentence: "We wash our hands because …" The page has five habits and five reasons; children draw a line from each habit to the sentence that tells why we do it. The page is one level.',
        watch: 'Right: the sun hat and sunscreen go to "We do not get burned on sunny days."; running to "It makes us fit, fast and strong."; washing hands to "It gets rid of the germs we picked up when we touched things."; sleeping to "Our body and brain rest and get ready for a new day."; brushing teeth to "It keeps our smile clean and bright." The rows change from copy to copy. Current practice: scrub with soap for 20 seconds; brush twice a day for two minutes. No answer key.',
      },
    },
    '2:who-helps-me-choose': {
      title: 'Who and What Influences My Choices?',
      objective: 'Children name the people and things that influence their health choices (family, friends, teachers, coaches, TV and videos, ads and packages) and decide for six everyday choices who or what influenced each one.',
      routine: 'Tape six signs around the room: family, friends, teacher, coach, TV or videos, and ads and packages. Read a choice aloud ("I ate carrots at dinner," "I wore a helmet," "I wanted a cereal with a toy"), and each child walks to the sign that helped him or her most. Look around together: different children stand at different signs, and that is fine. Family means the grown-ups who care for you at home.',
      note: {
        mistake: 'Children think only grown-ups influence their choices, and do not notice what TV, videos, ads, and packages do. They think there is one right answer for everyone.',
        words: 'Say: "Many people and things help us choose. Some help us choose healthy things, and some do not." Say: "There are no wrong answers here. This page is about you." Ask: "Who or what helped you choose that?" Read the page together: "A choice can have more than one helper. Glue it next to the one that helped YOU most." Level 1 has three choices and Levels 2 and 3 have six; children draw themselves in the middle and glue each choice next to a helper. Level 3 adds "My own choice: ___. ___ helped me choose it."',
        watch: 'Any helper is right if it is true for the child. Help children notice that "a cereal with a toy" often comes from an ad or a package, and "up late for a show" from TV or videos. Keep the talk on who helped, not on whether a family\'s choice was right; do not ask about bedtimes or meals at home. A child with no coach simply does not use that helper. No answer key.',
      },
    },
    '2:ad-detective': {
      title: 'What Does This Ad Want Me to Do?',
      objective: 'Children look at three pretend ads (a cereal, a soda, a fruit snack), find the trick each one uses (a cartoon character, a free prize, rainbow colors, \'everybody loves it\'), and tell whether the ad says anything about keeping them healthy.',
      routine: 'The teacher brings a few empty cereal boxes and snack packages. Small groups are "ad detectives": they find the cartoon characters, the prizes, the bright colors, and words like "new," "fun," and "everybody loves it," and they list the tricks on chart paper. Then each group looks for any words on the front that say whether the food is healthy. Grown-ups look at the Nutrition Facts on the side to find out.',
      note: {
        mistake: 'Children think an ad tells the truth about a food, or that a cartoon or a prize means the food is good for kids. They think "everybody loves it" means it is healthy.',
        words: 'Say: "An ad wants you to buy something. A trick is a way an ad makes you want it." Say: "Everyday foods help us grow strong; sometimes foods are treats." Ask: "What does this ad want me to do? Does it tell me if the food is healthy?" Level 1 has the cereal ad: children circle every trick it uses, circle yes or no, and draw an ad for an everyday food. Level 2 has three ads: a soda, a cereal, and a fruit snack. Level 3 adds "It wants me to ___." for each ad.',
        watch: 'Right: Zoomeroos (the cereal) uses a free prize and a cartoon character; Zingle Pop (the soda) uses "everybody loves it"; Rainbow Wigglies (the fruit snack) uses rainbow colors. "Does the ad tell me if it is healthy?" is no for every ad. Level 3: accept "buy it," "eat it," or "ask for it." The brands are pretend. Never call a food "bad," or a family\'s food choice wrong. No answer key.',
      },
    },
    '2:health-goal': {
      title: 'My Health Goal and My Helper',
      objective: 'Children choose one health goal (drink water at lunch, brush for two minutes, play actively every day, go to bed on time), write the steps they will take and the grown-up who will help, and track the goal at home on a two-week chart.',
      routine: 'Share a small goal of your own ("I will drink water at lunch") and the first step you will take. Children talk with a partner about which goal they want and what they will do first, then act out the first step. Send the two-week chart home in a folder with a short note to families. A child may keep the chart at school and color it at morning meeting instead, with the teacher or the school nurse as the helper.',
      note: {
        mistake: 'Children choose a goal that is too big ("I will never eat candy again") or one that depends on someone else. They think missing a day means they failed.',
        words: 'Say: "A goal is something I want to do. A step is how I will do it. A helper is a grown-up who can remind me." Ask: "What will you do first?" Level 1: children circle one of four goals, draw the grown-up who will help, and color a sun each day they keep the goal (14 days). Level 2: children write "My goal is to ___. First I will ___. Every day I will ___." Level 3 adds "If I forget, I will ___." and "My goal matters because ___."',
        watch: 'Accept any of the four goals, or a similar small goal the child can do. "Go to bed on time" depends on the family, so offer the others. The helper can be any trusted grown-up, at home or at school. Plan ahead: the chart takes two weeks, so set a date to look back at it, and remind families halfway through. No answer key.',
      },
    },
    '2:nurse-doctor-dentist': {
      title: 'When to See the Nurse, Doctor, or Dentist',
      objective: 'Children sort situations into \'tell a grown-up and see the nurse, the doctor, or the dentist\' (a fever, a tooth that aches, an ear that hurts, a fall that still hurts the next day) and \'a grown-up can help me here\' (a small scrape to wash and cover, being sleepy after a late night), and learn that checkups with the doctor and the dentist keep them well even when they are not sick.',
      routine: 'Ask the school nurse to visit, or visit the nurse\'s office, and show what happens at a checkup: listening to the heart, checking the ears, looking at the teeth. In pairs, children practice telling a grown-up: "I don\'t feel well. My ear hurts." Then they practice washing and covering a pretend scrape on a stuffed animal with a bandage.',
      note: {
        mistake: 'Children think you see a doctor only when you are very sick, so checkups are for sick people. Some hide pain so they will not miss recess, and some are afraid of the dentist.',
        words: 'Read the page together: "If you feel sick at school, tell your teacher." Say: "Checkups keep us well even when we are not sick." Ask: "Who would you tell first?" Level 1: children draw a line from each of four pictures to "see the nurse, doctor or dentist" or "a grown-up at home can help." Level 2 has eight pictures, then children circle the two checkups. Level 3 adds "If I had ___, I would tell ___ first."',
        watch: 'Right: a fever at school, a fall that still hurts the next day, an ear that hurts, a tooth that aches, a yearly checkup, and a dental checkup go to the nurse, doctor, or dentist; a small scrape at home and sleepy after a late night go to "a grown-up at home can help." Level 3: accept any trusted grown-up. Do not ask children whether they have a doctor or a dentist. If a child tells you about a hurt that worries you, follow your school\'s reporting steps; do not ask leading questions or promise to keep it a secret. No answer key.',
      },
    },
    '2:how-did-my-goal-go': {
      title: 'How Did My Goal Go?',
      objective: 'Children count the days they kept their goal on the two-week chart, tell what helped and what got in the way, and decide whether to keep the goal, change it, or choose a new one.',
      routine: 'Children bring their two-week charts and count the colored suns with a partner. Share how your own goal went, including a hard day. In a circle, children tell one thing that helped them, or pass. A child whose chart got lost tells about the days he or she remembers, and makes a fresh start. Keep the counts private: no comparing and no ranking.',
      note: {
        mistake: 'Children think fewer than 14 days means they failed, and they feel bad about a hard week. They think changing a goal is giving up.',
        words: 'Say: "Every goal teaches us something. Changing a goal is a smart choice, not quitting." Ask: "What helped you? What got in the way?" Level 1: children write "I kept my goal on ___ of 14 days," circle great, okay, or hard, circle keep my goal, change my goal, or choose a new goal, and draw themselves keeping the goal. Level 2 adds "What helped me was ___." Level 3 adds "Something that got in the way was ___. Next I will ___." and writes the new or changed goal.',
        watch: 'The number must match the colored suns. Great, okay, and hard are all honest answers, and any of the three choices is right when the child can say why. Praise the effort and the plan, not the number. Do not blame a family for a missed day. No answer key.',
      },
    },
    '2:road-signs': {
      title: 'Kinds of Road Signs and Which One Fits',
      objective: 'Children sort road signs into rule signs and warning signs by their shape and color, read a situation and circle the sign that fits it, and tell what a walker or a bike rider should do at each sign.',
      routine: 'With extra grown-ups, walk the school block (or look at photos) and find road signs: say each shape and color. Back in class, children make paper signs: a red octagon STOP, a red and white YIELD triangle, and yellow diamonds. In the hallway, a leader holds up a sign and the walkers do what it says. Practice crossing at a corner with a grown-up: stop at the curb, look left, right, and left again, and walk.',
      note: {
        mistake: 'Children think road signs are only for drivers. They think a yellow diamond means stop, or that a red circle with a line is a warning, though it means "not allowed."',
        words: 'Say: "Rule signs tell us what we must do or must not do. Warning signs tell us to be careful, because something is ahead." Ask: "What should a walker do here? A bike rider?" On Road Safety: Kinds of Traffic Signs, children write the letter of each sign under "Rule signs" or "Warning signs." On Road Safety Quiz: Which Sign Fits?, children read six sentences and circle the one sign that fits each. Each page is one level.',
        watch: 'Right in the first copy of the sorting page: rule signs A (no bicycles), B (YIELD), D (no people walking), and G (STOP); warning signs C (people crossing), E (traffic light ahead), F (bicycles crossing), and H (school). On the quiz in the first copy, in order: the school sign, the people-crossing sign, the traffic light sign, the no-bicycles sign, YIELD, and DO NOT ENTER. The school sign is a five-sided warning sign. Children under 10 cross streets with a grown-up. No answer key.',
      },
    },
    '2:stop-think-choose': {
      title: 'Stop, Think, Choose: Helmets and Life Jackets',
      objective: 'Children use the stop, think, choose steps on bike, scooter, and water choices (wear a helmet every time you ride, wear a life jacket on a boat, swim only when a grown-up is watching), telling for each choice what could happen and choosing the safe option.',
      routine: 'Bring a bike helmet and a child\'s life jacket. Show the helmet on a stuffed animal or yourself: it sits low, two fingers above the eyebrows; the straps make a V under each ear; one finger fits under the buckled chin strap. Buckle the life jacket and lift it at the shoulders: it should not slide up past the chin. Then read choice cards aloud and practice the steps together: freeze (Stop), ask "What could happen?" (Think), and point to the safe way (Choose).',
      note: {
        mistake: 'Children think helmets are only for long rides or fast riders, that arm floats make swimming safe, and that good swimmers do not need a grown-up watching. They think a scooter does not need a helmet.',
        words: 'Say: "Stop. Think: what could happen? Choose the safe way." Ask: "What could happen?" Keep the talk calm, with no scary stories. Level 1: children circle the safe choice in two pairs (the helmet and the life jacket). Level 2 has four pairs, and children write what could happen. Level 3 adds the helmet rule with a word bank (buckled, snug, low).',
        watch: 'Right: helmet on my head, wearing a life jacket, on the sidewalk, and a grown-up watching. For "What could happen?", accept calm, true answers: "I could hurt my head," "I could fall in the water," "a car could hit me." Level 3: "A helmet sits low on my forehead and fits snug. It is always buckled." Many communities give helmets to families who need one; know where yours does, and never blame. No answer key.',
      },
    },
    '2:sun-heat-cold': {
      title: 'Sun, Heat, and Cold: Dressing for the Weather',
      objective: 'Children tell how the sun, heat, and cold affect their health and choose what protects them: sunscreen, a hat, and shade on sunny days (even cool or cloudy ones), water on hot days, and a coat, hat, and mittens on cold days.',
      routine: 'Order UV beads ahead; they are cheap online. Give each child a pipe cleaner with a few UV beads, which change color in the sun\'s rays. Go outside on the first sunny day and the first cloudy day you get: the beads change color both times. Smear sunscreen on a clear plastic bag, put a few beads under it, and compare. Then children dress a paper doll for snow, a sunny beach, and a hot playground. Ask families before any child puts on sunscreen at school.',
      note: {
        mistake: 'Children think sunscreen is only for hot days or the beach, that clouds block all the sun, and that darker skin cannot burn. They think you drink water only when you feel thirsty.',
        words: 'Say: "The sun\'s rays can burn our skin even on cool or cloudy days." Say: "On hot days, drink water before you feel thirsty, and rest in the shade." Read the page together: "Some things protect us in more than one kind of weather. Draw all the lines you can." Level 1 has a snowy day and a sunny beach with four things. Level 2 adds a cloudy spring day, a hot playground, a water bottle, and a shade tree. Level 3 adds "We need sunscreen on a cloudy day too because ___."',
        watch: 'Lines that must be drawn: a snowy day to the winter coat and mittens; a sunny beach to sunscreen and the sun hat (and the water bottle on Levels 2 and 3); a cloudy spring day to sunscreen; a hot playground to sunscreen, the sun hat, the water bottle, and the shade tree. Also accept sunscreen on a snowy day, a water bottle on any day, a sun hat on a cloudy day, and the shade tree at the beach. Level 3: "the sun\'s rays come through the clouds." No answer key.',
      },
    },
    '2:health-poster': {
      title: 'Be a Health Helper: Our Class Campaign',
      objective: 'Children choose one healthy choice they want more people at school to make (wash hands before lunch, wear a helmet, drink water), make a poster with a picture, a short slogan, and a reason, and share it with a kindergarten class.',
      routine: 'The class votes on one campaign: wash hands before lunch, wear a helmet, or drink water. Brainstorm short slogans together and write the class slogan on the board. Children make posters on big paper, then practice a one-minute talk with a partner. Arrange a visit with a kindergarten teacher to share the posters, and hang them near the sinks or the drinking fountain with the principal\'s okay.',
      note: {
        mistake: 'Children put many messages on one poster, write long slogans, or draw a picture that does not show the message. Some write slogans that scold.',
        words: 'Say: "A health helper helps other people make a healthy choice. A slogan is short and easy to remember." Ask: "What do we want the kindergartners to do?" Level 1: children circle the class campaign, draw the poster picture, and copy the class slogan from the board. Level 2: children write their own slogan; the page gives an example, "Scrub for 20!" Level 3 adds "It matters because ___." and a checklist: one clear message, a picture that shows it, a reason.',
        watch: 'A good poster has one clear message, a picture that shows it, and a reason. Slogans should invite, not scold: "Wash up for lunch!" rather than "Dirty hands are gross!" On Level 3, children check each box only when the poster has it. No answer key.',
      },
    },
  },
};
