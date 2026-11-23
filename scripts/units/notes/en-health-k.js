'use strict';
/**
 * Teacher notes, English, health: the seven Kindergarten health lessons that hand out published pages (Daily Teaching
 * System, Stage D-3, 2026-11-23), in the units My Feelings and My Friends and Healthy and Safe Me (design:
 * scripts/units/year/design.en.health.json, grade K). The four lessons whose pages were built last (calm-down tools,
 * kind words and kind hands, my space bubble, germ busters) have their notes in en-health-k2.js. Each note was written
 * from the pages the lesson hands out, read at every level: the new pages K-705 to K-707 from their text dump and
 * sheets (lcs-stage-d/batch-k), the published pages from their generators and fresh renders (lcs-stage-d/notes-k).
 * Where a type has several faces, the note describes the face the lesson lists first and names the others as other
 * pages of the same lesson. One US Kindergarten teacher read the notes against the pages (REVIEW-3, 2026-11-23; every
 * finding applied). Kind and plain: no blame of families; everyday and sometimes foods; every feeling is okay.
 * Every lesson also has its hands-on routine (`routine`, 2026-11-23): what the class does with real things, printed
 * under "What the class does" before the page; the note's "words" keep what the teacher says and how the levels go.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 2,000 letters in all, the routine included.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:feelings': {
      title: 'How Do I Feel? Naming Feelings',
      objective: 'Children name happy, sad, angry, scared, surprised, and tired from faces, match each face to its word, and learn that every feeling is okay and what we do with it is our choice.',
      routine: 'Sit in a circle with a hand mirror and make each feeling face together. End with the Feelings Check-In: each child points to how he or she feels today, or passes.',
      note: {
        mistake: 'Children mix up scared and surprised, and tired and sad. They think some feelings are bad and that they should not feel angry or scared.',
        words: 'Ask: "Show me surprised. Now scared. What changed?" Say: "Every feeling is okay. What we do with a feeling is our choice." The page: children draw a line from each face to its word; read every word aloud. Level 1 has four faces and four words, Level 2 six of each, and Level 3 four faces and six words. On the sorting page of the same lesson, read "Feels bad" as "feels uncomfortable."',
        watch: 'The answer key numbers each face and puts the same number on its word. On Level 3, two words stay without a line, and that is correct. If a child would feel something else in a picture, accept it. Never ask a child to share a feeling he or she does not want to share.',
      },
    },
    'K:i-can': {
      title: 'I Can Do It! What I Am Good At',
      objective: 'Children draw one thing they are good at and one thing they are learning to do, and circle the people who help them grow and stay healthy.',
      routine: 'Sit in a circle. Show one thing you are good at and one thing you are still learning, such as singing a song and playing a few notes on a guitar or a recorder. Then each child acts out one thing he or she can do (hopping, zipping a coat, counting to ten, drawing a cat) while the class guesses it; a child may pass. Last, children name a person who helped them learn it, and the class claps for every helper named.',
      note: {
        mistake: 'Children say they are good at nothing, or copy what a friend draws. They think being good at something means being the best, and that learning something means being bad at it. Some do not see a doctor or a teacher as someone who helps them.',
        words: 'Ask each child: "What can you do now that you could not do when you were little?" Say: "Everyone is good at some things and still learning others. Learning takes practice, and people help us." Read the prompts on the page aloud: "I am good at," "I am learning," and "Who helps me?" Name the helper pictures: a teacher, a friend, and a doctor; the empty box is for the child\'s family. Level 1: children draw something they are good at, circle a person who helps them, and draw their family in the box. Level 2: they also draw something they are learning and circle every person who helps them. Level 3: you write the child\'s own words after the dotted "I can," and the child traces them.',
        watch: 'There is no wrong answer. A drawing is right when the child can tell you what it shows; write the child\'s words beside it if that helps you remember. Every helper on the page helps children, so any circle is right; ask, "How does she help you?" Families look different: grandparents, one parent, two moms, foster parents, an aunt, or a big sister all count. If a child says "I am not good at anything," name something you have seen the child do well this week.',
      },
    },
    'K:hygiene-habits': {
      title: 'Washing Hands and Caring for My Body',
      objective: 'Children put the steps of hand washing in order (wet, soap, scrub for 20 seconds, rinse, dry) and match each body-care job to its tool: soap, a toothbrush, a comb, a bed, a sun hat, and a tissue.',
      routine: 'At the sink, each child washes with you: wet, soap, scrub the backs, between the fingers, and under the nails while singing "Happy Birthday" twice (about 20 seconds), rinse, and dry. Then set out a bar of soap, a new toothbrush in its package, a comb, a small pillow, a sun hat, and a box of tissues. You act out a job (brushing teeth, a sneeze, messy hair, a yawn), and a child brings the thing for it.',
      note: {
        mistake: 'Children think a quick rinse with water cleans hands, and they skip the soap or the scrubbing. On the matching page they link the child with messy hair to the toothbrush because both are "in the bathroom."',
        words: 'Say: "Soap and scrubbing take the germs off. Water alone does not." Day 1, the hand-washing page shows the five steps out of order; children write 1 to 5 in the boxes. To tell wet from rinse, ask, "Are there bubbles yet?" The page is the same at every level. Day 2, the matching page: children draw a line from each child to the thing that child uses. Level 1 has four children, Level 2 five (with the sun hat), Level 3 six (with the tissue).',
        watch: 'Right order: wet 1, soap 2, scrub 3, rinse 4, dry 5. On the matching page: the child at the sink uses the soap; the child brushing, the toothbrush; the child under the moon and stars, the bed; the child with messy hair, the comb; the child in the sun, the sun hat; the sneezing child, the tissue. Keep the talk on the steps, never on what happens in a child\'s home. No answer key.',
      },
    },
    'K:healthy-food': {
      title: 'Everyday Foods and Sometimes Foods',
      objective: 'Children sort food pictures into everyday foods (fruits, vegetables, milk, water) and sometimes foods (cake, candy, cookies, soda), learn that sometimes foods are fine for special times, and choose an everyday snack for a class picnic.',
      routine: 'Children sort food pictures from grocery flyers and a few clean, empty packages (a milk carton, a raisin box, a cookie box) into two hula hoops, everyday foods and sometimes foods. Then plan a class picnic snack of everyday foods: children vote on the fruits and vegetables, and you check your allergy list.',
      note: {
        mistake: 'Children call sometimes foods "bad" or "junk," and some decide that people who eat them are bad. They think a food is healthy because they like it.',
        words: 'Say: "Everyday foods help our bodies grow strong: fruits, vegetables, milk, and water. Sometimes foods, like cake, candy, cookies, and soda, are for special times, like a birthday. All foods can fit; some we eat every day and some we eat sometimes." Never call a food or a lunch bad. The page prints its two groups as "Healthy" and "Not Healthy." Before children start, read them as "everyday foods" and "sometimes foods," or write those words over the labels. Children draw a line from each food to its group. Level 1 has four foods, Level 2 six, Level 3 eight.',
        watch: 'Right: the apple, banana, orange, tomato, carrot, broccoli, milk, and water are everyday foods; the cupcake, cookie, donut, cake, lollipop, candy, and soda are sometimes foods. A child who says "I had a cookie in my lunch" needs to hear: "That is fine. A cookie is a sometimes food." Listen for "bad" and "junk" and change them to "sometimes." No answer key.',
      },
    },
    'K:sleep-play': {
      title: 'Sleep and Play Help Me Grow',
      objective: 'Children tell why their body needs a good night\'s sleep and active play every day, put a bedtime routine in order, and show three ways to move their body at recess.',
      routine: 'Act out a bedtime routine in order as a class: take a pretend bath, put on pretend pajamas, brush teeth, listen to a short story, turn off the light, and lie quietly on the rug for a slow count of ten. Then, at recess, try three ways to move the whole body for one minute each: running, jumping, and dancing. After each one, children put a hand on the chest to feel the heart beating fast.',
      note: {
        mistake: 'Children think sleep wastes play time, or that only babies need a lot of sleep. They count any play as moving, a video game too. Some decide that quiet play, like reading or a puzzle, is bad.',
        words: 'Ask: "How do you feel after a good night\'s sleep? After a short one?" Say: "While you sleep, your body rests and grows, and your brain gets ready to learn. Children your age need about 10 to 12 hours of sleep." Ask: "How does your heart feel now?" Say: "Moving every day makes your body strong. Quiet play is good too; we need both." The page has three bedtime cut-outs (a bath, pajamas, a bed) to glue in order in the boxes 1, 2, 3; brushing teeth and the story stay in your talk. Below them is a row of ways to play, each with a heart. Level 1 has four ways to play; Level 2 has six; Level 3 has six and a box to draw yourself asleep with the moon in the window.',
        watch: 'Right order: bath 1, pajamas 2, bed 3. Some families bathe in the morning; say, "On this page the bath comes first." The ways to play that move the whole body are running, jumping rope, dancing, gymnastics, swimming, and biking. Reading, a puzzle, and a video game are still play: they are fine, just not moving play, so they are not circled. The colored heart should sit under a moving way to play that the child likes. No answer key.',
      },
    },
    'K:trusted-adults': {
      title: 'Trusted Adults and Safe Places',
      objective: 'Children name grown-ups who can help them (family grown-ups, the teacher, the school nurse, a doctor, a police officer, a firefighter), learn to always check first with their grown-up before going anywhere with anyone, and draw their own trusted grown-up.',
      routine: 'Take a short walk around the school to meet grown-ups who help children: the school nurse, the office staff, the custodian, a cafeteria worker, and the crossing guard. At each stop, the helper says how he or she helps kids, and children say hello. Then role-play getting lost in a store: you play the checkout worker who helps.',
      note: {
        mistake: 'Children think any friendly grown-up is a trusted adult, or that only people they know can help. They circle the children because they are friends; a friend is kind, but a grown-up can help in an emergency. Some are shy of people in uniform.',
        words: 'Ask: "Who could help you if you got hurt on the playground? If you got lost in a store?" Say: "A trusted adult is a grown-up your family trusts, or a grown-up whose job is to help kids. Always check first with your grown-up before you go anywhere with anyone, even someone you know. If you get lost in a store, go to a worker at the checkout." The page: children circle each grown-up who could help them. Name every picture first. Read the line at the bottom together. Level 1 has six pictures; Level 2 has eight and a box to draw your own trusted grown-up; Level 3 adds a box for where you would find that grown-up.',
        watch: 'Right: the doctor, nurse, firefighter, police officer, and teacher are circled; the children are not. The teacher picture is a young woman waving, with a clipboard: name her so children do not take her for a big sister. Accept any family grown-up or school helper as the child\'s trusted grown-up. If a child seems worried about a grown-up at home or at school, follow up quietly and follow your school\'s reporting rules. No answer key.',
      },
    },
    'K:road-safety': {
      title: 'Crossing the Street with a Grown-Up',
      objective: 'Children read the traffic light and the walk signal, and practice crossing with a grown-up: stop at the curb, look left, right, and left again, then cross at the crosswalk holding the grown-up\'s hand.',
      routine: 'Tape a crosswalk and a curb line on the gym floor, and make a walk signal from two paper plates: a white walking person and an orange hand. Each child holds a grown-up\'s hand, or yours, from the curb. Together they stop at the curb, look left, look right, look left again, and walk, never run, across, still holding hands. A helper shows the walking person or the hand, and the pairs walk or wait.',
      note: {
        mistake: 'Children think the walking person means they can run across without looking, and that the green light is for them rather than for the cars. They think they may cross alone if they look first. They forget to look left again.',
        words: 'Say: "Kids always cross with a grown-up and hold hands the whole way." The walking person means walk, after we look; the orange hand means wait. Day 1, the traffic-light page: children look at the light that is on and circle what to do. Level 1 has four walk signals with the words walk and wait; Level 2 mixes walk signals and car lights (stop and go); Level 3 has no words. Another page: color the light that shines. Day 2, the steps page: five pictures of a child holding a grown-up\'s hand; children write 1 to 5 in the boxes. The steps page is the same at every level.',
        watch: 'Right order: stop at the curb 1, look left 2, look right 3, look left again 4, walk across 5. The two left looks differ only by the curved arrow that swings back; ask, "Which look comes after looking right?" For cars, red means stop and green means go. Never teach a child to cross alone, even when the signal says walk. No answer key.',
      },
    },
  },
};
