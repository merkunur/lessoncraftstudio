'use strict';
/**
 * Teacher notes, English, health: the two Grade 1 health lessons whose pages already exist (Daily Teaching System,
 * Stage D-3, 2026-11-23; lcs-stage-d/1-INVENTORY.md lines marked [exact]; design scripts/units/year/design.en.health.json,
 * grade 1): road signs on the way to school (G1-384) and brushing teeth and stopping germs (G1-403, G1-404). Each note
 * was written from the pages the lesson hands out, rendered at every published level (renders in lcs-stage-d/notes-1).
 * Kind and plain: no blame of families; children cross the street with a grown-up. Every lesson has its hands-on
 * routine (`routine`), printed under "What the class does" before the page. A note has to fit its sheet of the
 * teacher guide (build-guide.js): about 2,000 letters in all.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '1:road-signs': {
      title: 'Road Signs on the Way to School',
      objective: 'Children match the road signs they pass on the way to school (STOP, YIELD, a pedestrian crossing, a school zone, DO NOT ENTER, a traffic signal ahead) to what each one tells drivers and walkers, and point them out on a walk around the school block.',
      routine: 'Take the class on a walk around the school block with at least one more grown-up. Children walk in pairs on the sidewalk, and the class crosses only at a crosswalk, with you, after everyone stops at the curb and looks left, right, and left again. At each sign, stop and say its shape, its color, and what it tells drivers and walkers. Back in the room, children make the sign shapes from colored paper.',
      note: {
        mistake: 'Children think signs are only for drivers, that YIELD means the same as STOP, and that the walking-person sign means it is safe to cross without looking. Many think first graders may cross alone once they know the signs.',
        words: 'Teach the shapes and colors: STOP is a red octagon, YIELD a triangle point down, the school sign has five sides, the walking-person and traffic-light signs are yellow diamonds, and DO NOT ENTER is a red circle with a white bar. Say: "Signs help drivers and walkers. Even at a crosswalk, we stop at the curb and look left, right, and left again, and first graders cross with a grown-up." The page: children draw a line from each sign to what it means. Read every meaning aloud; the sentences are long for first-grade readers. The page is one level.',
        watch: 'Right: STOP, every car must halt here, then look; YIELD, slow down and let the others go first; the school sign, a school is near; the walking-person sign, a marked place where people cross; the traffic-light sign, a traffic light is coming; DO NOT ENTER, no car may drive into the street from this side. Ask, "Who is this sign for?" On the walk, a sign children spot on their own counts more than the page. No answer key.',
      },
    },
    '1:healthy-habits': {
      title: 'Brushing Teeth, Stopping Germs, and My Habit Chart',
      objective: 'Children sort the steps of brushing teeth, choose the ways that stop germs, and keep a habit chart at home for a week.',
      routine: 'Brush a big egg-carton model of teeth with a large toothbrush while the class counts: outsides, insides, and chewing tops. Children copy the motions in the air; we never share toothbrushes. Then practice: cough into the elbow, throw a used tissue away and wash hands, and label a cup with your name.',
      note: {
        mistake: 'Children brush for a few seconds and only the front teeth. They think sharing a cup is kind, and coughing into a hand polite.',
        words: 'Say: "Brush two times a day for two minutes. Germs are too small to see." On Brushing Teeth, children circle before, during, or after for six pictures; on Stop the Germs, they circle the healthy picture in each row. The habit chart goes home: children check each habit they did each day for a week (send a second copy for a second week). Each page is one level.',
        watch: 'Before brushing: toothpaste on the brush, teeth with spots; during: the outsides, insides, and chewing tops; after: the clean tooth. Germs: the elbow cough, soap and water, each child with his or her own cup, the tissue in the trash. Never ask about home: a chart with few checks needs encouragement, not blame. No answer key.',
      },
    },
    '1:ask-a-grown-up': {
      title: 'Medicines Only from a Trusted Adult',
      objective: 'Children learn that medicines and vitamins help only when a trusted adult gives them and are never candy, circle the things only a grown-up may give or use, and practice saying "I need to ask a grown-up first."',
      routine: 'Show photos side by side, never real medicine or cleaners: pills next to candy, gummy vitamins next to gummy bears, a spray cleaner next to a sports drink. Children guess which is which and find how hard it is to tell. Then a puppet offers a child "candy" that is really vitamins, and children practice the answer: "I need to ask a grown-up first." Last, practice what to do when you find pills or a bottle: do not touch, and tell a grown-up.',
      note: {
        mistake: 'Children think gummy vitamins are candy, and that if medicine helps, more is better. They think medicine is fine if a friend or an older child gives it, and that a cleaner in a cup is a drink.',
        words: 'Say: "Medicine can look like candy. Only a trusted grown-up gives it to you." Say: "If you find pills or a bottle, do not touch it. Tell a grown-up." Read the sentence at the top of the page together. Children circle in red each thing only a trusted grown-up may give them or use, and put a check in the box under each food and drink. Level 1 has six cards; Level 2 has eight, with a spray cleaner; Level 3 has eight and the sentence "I ask a grown-up first." to trace and say.',
        watch: 'Right: the medicine, the gummy vitamins, the shot, and the spray cleaner are circled in red; the carrot, milk, bread, banana, and apple are checked. Ask about the vitamins: "Why do they need a grown-up?" Keep it plain: many homes keep medicine, and that is fine when a grown-up stores and gives it. For grown-ups, the Poison Help line is 1-800-222-1222. No answer key.',
      },
    },
    '1:myplate-groups': {
      title: 'MyPlate: The Five Food Groups',
      objective: 'Children sort foods into the five MyPlate food groups (fruits, vegetables, grains, protein foods, and dairy) and find where each group sits on a MyPlate picture, with milk, yogurt, and cheese in the dairy cup.',
      routine: 'Lay out five hula hoops or large paper plates labeled fruits, vegetables, grains, protein foods, and dairy, beside a MyPlate picture. Children sort clean, empty food packages and food pictures cut from grocery store flyers into the five groups and tell why. If you use real food, check your allergy list first.',
      note: {
        mistake: 'Children put eggs in dairy because they are near the milk in the store, and cheese in protein. They think one food group is the "good" one, or that a food they like must be a fruit.',
        words: 'Say: "MyPlate shows the five food groups. Fruits and vegetables fill half the plate. Milk, yogurt, and cheese go in the dairy cup." Say: "All five groups help us grow; we need foods from each one." Ask: "Where does an egg go? Why?" Level 1: children draw a line from each of five foods (one from each group) to its part of the plate. Level 2 has ten foods. Level 3: children first write the group names on the plate from the word bank, then draw the lines.',
        watch: 'Right: the pear, orange, banana, apple, and strawberry are fruits; the lettuce, carrot, celery, and broccoli vegetables; the bread, oatmeal, cereal, and toast grains; the ham, egg, and fish protein foods; the milk, yogurt, and cheese dairy. A child who says cereal has milk is right that the milk is dairy; the cereal itself is a grain. On Level 3, accept any consistent labeling: the lines must go to the labels the child wrote. No answer key.',
      },
    },
    '1:myplate-lunch': {
      title: 'Build a MyPlate Lunch',
      objective: 'Children find the times in a school day when they eat or drink (breakfast, snack, lunch, a drink after recess) and build a lunch with a food from each MyPlate group and water or milk to drink.',
      routine: 'Give each child a paper plate, a paper cup, and food pictures cut from grocery store flyers, or let small groups use play food. Each child builds a lunch with one food from each group, sets a picture of water or milk in the cup, and tells a partner what is on the plate. Talk about the times in a school day when we eat or drink. If you use real food, check your allergy list.',
      note: {
        mistake: 'Children think a good lunch must be big, or must have every food they like. They forget the drink, or think the drink does not matter. Some think a lunch from home is wrong if it looks different.',
        words: 'Say: "A MyPlate lunch has a food from each group and water or milk to drink." Ask: "Which group is missing from your plate?" Never comment on what a child eats at home or whether he or she had breakfast; every family\'s food can fit on a plate. The page asks, "Circle the times you eat or drink on a school day," then children cut out one food for each part of the plate and glue it on. Level 1 has four parts with picture hints; Level 2 adds the dairy cup and has no hints; Level 3 adds writing each food\'s name and circling water or milk.',
        watch: 'Each part of the plate should hold one food from its group; there are more cards than parts, so children choose. The circled times are each child\'s own: any circles are right. On Level 3, invented spelling is fine. If a child says he or she did not eat breakfast, listen kindly and let the school know quietly if needed. No answer key.',
      },
    },
    '1:habit-to-grow': {
      title: 'Which Habit Will I Grow?',
      objective: 'Children check which healthy habits they already do (brushing teeth twice, washing hands, drinking water, moving their body, going to bed on time) and choose one habit to do more for the next two weeks.',
      routine: 'Play habit charades: a child acts out brushing teeth, washing hands, drinking water, jumping, or yawning and climbing into bed, and the class names the habit. Then each child chooses one habit to grow and draws it on a small card to take home. For two weeks, at morning meeting, children who did their habit show a thumbs-up; there is no thumbs-down.',
      note: {
        mistake: 'Children think healthy means doing everything perfectly, and that one missed day means they failed. Some choose a habit they already do every day, so it cannot grow.',
        words: 'Say: "A habit is something we do again and again. Small steps every day help a habit grow." Ask: "Which habit would you like to do a little more?" The page: children color the sun next to each habit they did yesterday, then circle the one habit they will do more. Level 1 has three habits; Level 2 has five; Level 3 adds the sentence "Every day I will ___."',
        watch: 'There are no right or wrong answers on this page: the suns are each child\'s own honest check. The circled habit should be one the child wants to do more; accept any choice. Never compare children\'s suns or charts. A child with few suns needs encouragement, not blame: what happens at home is not up to a first grader alone. On Level 3, the sentence should name the circled habit. No answer key.',
      },
    },
    '1:health-helpers': {
      title: 'Health Helpers at School and in Town',
      objective: 'Children visit the school nurse\'s office, name the health helpers in town (doctor, dentist, pharmacist, firefighter, paramedic) and what each does, and practice asking their teacher to see the nurse when they feel sick or get hurt.',
      routine: 'Visit the school nurse\'s office. The nurse shows a few tools (a thermometer, a bandage, an ice pack) and tells when children should come. Back in the room, children practice asking: "May I please see the nurse? My stomach hurts." Then show photos of a doctor, a dentist, a pharmacist, a firefighter, and a paramedic, and the class says how each one helps people stay healthy.',
      note: {
        mistake: 'Children think only women are nurses and only men are doctors or firefighters. They think firefighters only put out fires, and that a pharmacist gives medicine to children directly.',
        words: 'Say: "Health helpers keep us safe and healthy. At school, the nurse helps when you feel sick or get hurt: ask your teacher first." Ask: "Who would help if someone was badly hurt? Who gives medicine to your grown-up?" Level 1: children draw a line from each of three helpers (a doctor, a nurse, a firefighter) to the helper\'s name. Level 2 adds the pharmacist behind a pharmacy counter and the sentence "When I feel sick or get hurt at school, I ask my teacher to see the ___." Level 3 adds "A ___ keeps people healthy by ___."',
        watch: 'Each helper goes to its own name; the pharmacist stands behind a counter with medicine shelves and an Rx sign. Say that men and women do every one of these jobs. The sentence on Levels 2 and 3 is "nurse"; if your school has a health aide, or the office helps instead, accept that answer too. On Level 3, accept any true sentence, such as "A doctor keeps people healthy by checking them when they are sick." No answer key.',
      },
    },
    '1:whole-body-listening': {
      title: 'Listen with Your Whole Body',
      objective: 'Children practice whole-body listening (eyes toward the speaker, quiet hands and feet, ears open, a calm body), repeat back what a partner said, and use the skill to follow a safety direction the first time it is given.',
      routine: 'Show a whole-body listening picture card. Read a short story with one direction hidden in it ("When you hear the word blue, touch your nose"), and see who catches it. Partners take turns telling about their weekend while the listener repeats one thing he or she heard. End with a "Teacher says" game with safety directions: line up, freeze, walk to the door, hands to yourself.',
      note: {
        mistake: 'Children think listening means only being quiet, or staring hard at the speaker. Many hear the first words of a direction and stop listening. Some repeat their own idea instead of the partner\'s.',
        words: 'Say: "We listen with our whole body: eyes toward the speaker, ears open, mouth quiet, hands and feet still." Say: "In a fire drill or on a field trip, listening the first time keeps us safe." Some children listen best while moving a little or without looking at a face; that is okay, and the page is a help, not a test. The page: children color the sun next to each body part that listened. Level 1 has eyes, ears, and mouth; Level 2 adds hands and feet; Level 3 adds "My partner said ___."',
        watch: 'There are no wrong answers on this page: the suns are each child\'s own check, and an honest uncolored sun is fine. On Level 3, the sentence should tell one thing the partner really said; accept the main idea, not the exact words. Watch the "Teacher says" game for children who follow a direction the first time, and name it: "You heard it the first time." No answer key.',
      },
    },
    '1:fire-safety-911': {
      title: 'Fire Safety and Calling 911',
      objective: 'Children practice getting out and staying out, crawling low under smoke, and stop, drop, and roll, tell what a smoke alarm sounds like, and learn to call 911 only in a real emergency, saying their name and address.',
      routine: 'Tell the class first, then press the test button on a smoke alarm so children know its sound; for children sensitive to loud sounds, play a recording. Practice crawling low on the rug to the door, getting out, and going to the class meeting place. Practice stop, drop (cover your face with your hands), and roll over and over until the fire is out. Say the rule together: "Get out and stay out. Never go back for a toy or a pet." Then each child calls you on a toy or paper phone and says, "My name is ... I live at ...". Never dial 911 to practice.',
      note: {
        mistake: 'Children think hiding under a bed or in a closet is safe in a fire, or that they should go back for a pet or a toy. They think 911 is for a lost toy or a small scrape. Some are scared of firefighters in masks and hide from them.',
        words: 'Say: "Smoke rises, so the clean air is low: crawl." Say: "Call 911 only in a real emergency: a fire, or someone badly hurt or very sick." Say: "Firefighters may look scary in their masks. They are there to help you; go to them." Level 1: children write 1, 2, 3 under stop, drop, and roll, circle 9 and 1 on the phone, and write their name. Level 2 adds "I live at ___." Level 3 adds "I call 911 only when ___."',
        watch: 'Right: stop 1, drop 2, roll 3; the 9 and the 1 are circled. Check addresses privately, send the page home for a grown-up to check, and never post addresses in the room. If a family has no fixed address, accept the name of the place where the child lives and a grown-up\'s phone number, and follow your school\'s privacy rules. On Level 3, accept "there is a fire" or "someone is badly hurt." No answer key.',
      },
    },
    '1:say-no-go-tell': {
      title: 'Say No, Go Away, Tell a Trusted Adult',
      objective: 'Children practice what to do when something feels uncomfortable or unsafe (say "No!" in a strong voice, go away, tell a trusted adult) and act it out for calm playground scenes.',
      routine: 'Teach the three steps with hand signs: a flat hand for No, walking fingers for Go, and a hand beside the mouth for Tell. Small groups act out calm scenes from picture cards: an older child pushing, a dare to climb the fence, and a grown-up they do not know asking them to leave the playground. After each scene, the class decides which trusted adult to tell: the teacher, the recess aide, or a family grown-up.',
      note: {
        mistake: 'Children think telling is tattling, or that they will get in trouble for telling. They think they must keep a secret when someone asks them to. Many think only strangers can make them feel unsafe.',
        words: 'Say: "If something feels unsafe or uncomfortable, say No! in a strong voice, go away, and tell a trusted adult. It is never your fault." Say: "We never keep a secret that makes us feel unsafe. If the first grown-up does not listen, tell another one, and keep telling until someone helps." Level 1: children write 1, 2, 3 under the steps, trace the three steps, and draw themselves saying No! Level 2: children write who they can tell at school, at recess, and at home. Level 3 adds "If the first grown-up does not listen, I ___."',
        watch: 'Right: say No! 1, go away 2, tell a grown-up 3. Accept any trusted adult in each place: the teacher, the recess aide, the nurse, a family grown-up. On Level 3, accept "tell another grown-up" or "keep telling." If a child tells you something worrying, listen calmly, thank the child for telling, do not promise to keep it a secret or ask leading questions, and follow your school\'s reporting rules. No answer key.',
      },
    },
    '1:help-a-friend': {
      title: 'Helping a Friend Stay Healthy',
      objective: 'Children list ways to help a friend make healthy choices (a reminder to wash before lunch, an invitation to play, sharing a spot in the shade, getting a grown-up when a friend is hurt) and practice one kind reminder in a friendly voice.',
      routine: 'Fill a class chart, "How can I help a friend be healthy?", and sketch a quick picture beside each idea. Pairs act out one reminder, "Let\'s wash our hands before lunch!", once in a bossy voice and once in a friendly voice, and the class says which one a friend would listen to. During the week, each child draws one way he or she helped a friend on a sticky note for the chart.',
      note: {
        mistake: 'Children think helping a friend means bossing or telling on them. They think only grown-ups can help someone stay healthy. Some think getting a grown-up when a friend is hurt is tattling.',
        words: 'Say: "Friends help each other stay healthy. A friendly voice and the word let\'s invite a friend to join you." Ask: "Which reminder would you want to hear?" Say: "When a friend is hurt, getting a grown-up is a big help." Level 1: children trace "Let\'s wash our hands!", circle one way they helped a friend this week, and draw it. Level 2: in each of three scenes, children circle the reminder a friend would listen to, then draw one way they helped. Level 3 has the three scenes and "A friendly voice works better because ___."',
        watch: 'Right on Levels 2 and 3: "Come sit with me in the shade!", "Let\'s get a drink of water!", and "Let\'s wash our hands before lunch!"; the bossy ones end in "Now!" or "Hurry!" or say "Get out of the sun!" On Level 1, any true way the child helped is right. On Level 3, accept "a friend wants to listen" or "it feels kind." No answer key.',
      },
    },
  },
};
