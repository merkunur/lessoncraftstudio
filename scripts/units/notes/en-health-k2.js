'use strict';
/**
 * Teacher notes, English, health: the four Kindergarten health lessons whose pages were built last (Daily Teaching
 * System, Stage D-3, 2026-11-23): calm-down tools and asking for help (K-708), kind words and kind hands (K-709), my
 * space bubble (K-710), and germ busters (K-711), in the units My Feelings and My Friends and Healthy and Safe Me
 * (design: scripts/units/year/design.en.health.json, grade K). Each note was written from the final pages (review
 * round 3 applied), read at every level from lcs-stage-d/batch-k/TEXT-DUMP-K2.md and the sheets. Kind and plain:
 * every feeling is okay, "Stop" is respected, no blame.
 * Every lesson also has its hands-on routine (`routine`, 2026-11-23): what the class does with real things, printed
 * under "What the class does" before the page; the note's "words" keep what the teacher says and how the levels go.
 * A note has to fit its sheet of the teacher guide (build-guide.js): about 2,000 letters in all, the routine included.
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    'K:calm-down': {
      title: 'Calm-Down Tools and Asking for Help',
      objective: 'Children practice three calm-down tools and ask for what they need with "I need a break, please." and "Can you help me?"',
      routine: 'Teach one tool at a time while the Class Timer runs one calm minute. Smell the flower and blow out the candle: breathe in slowly through the nose and out slowly through the mouth, while a child lying down watches a stuffed animal on his or her tummy rise and fall. The candle is pretend; never use a real one. Count slowly to five. Squeeze both hands tight, then let go. Then pairs act out a small upset (a block tower falls, a friend takes the swing), choose a tool, and say "I need a break, please." or "Can you help me?"',
      note: {
        mistake: 'Children think a calm-down tool is a punishment, or that feeling angry or sad is wrong. They rush the breathing: a quick sniff and a hard puff. Many do not yet know they can ask for a break or for help, so they cry, grab, or hide instead.',
        words: 'Say: "All feelings are okay. When I feel upset, I can use a tool, and I can ask for what I need." Practice the words together: "I need a break, please." "Can you help me?" The page, read aloud: Level 1 shows one tool and one sentence to color; Level 2 shows all three tools and both sentences to circle; on both, children color a star each time they use a tool. Level 3 has no stars: children circle, then draw themselves showing a friend a tool.',
        watch: 'There is no wrong choice: any tool and either sentence is right, and there is no answer key. Watch the breathing: a slow breath in and a long breath out. Notice the tool each child picks, and offer it the next time that child is upset ("Do you want to smell the flower?"). Color a star when a child really uses a tool, not as a reward for being quiet. A child who says "I need a break, please" gets the break: the routine is working. On Level 3, ask the child to show you the tool in the drawing.',
      },
    },
    'K:kind-words': {
      title: 'Kind Words and Kind Hands',
      objective: 'Children watch puppets make kind and unkind choices, practice kind words (please, thank you, "Are you OK?", "Do you want to play?") and kind hands, and show how to help a friend who feels sad.',
      routine: 'Two puppets act out short scenes: a child drops all the crayons, a child sits alone at recess, a child cries after a fall in the grass, a block tower falls. After each scene, the class shows a thumbs-up for the kind choice, then pairs act out the kind answer. All week, add a paper heart to a class kindness chain when someone notices a kind act.',
      note: {
        mistake: 'Children think kind means nice words only and forget kind hands. They think "sorry" fixes a push without any help. They walk past a child sitting alone instead of asking.',
        words: 'Practice kind words: please, thank you, "Are you OK?", "Do you want to play?" Practice kind hands: helping up, sharing, a high five the friend wants. Say: "Kind words and kind hands help a friend feel better." The page: Level 1 shows four kind words; children trace please, thank you, and "Are you OK?" and color a heart each time they use a kind word. "Do you want to play?" has no line: say, "We say this one out loud." On Level 2, each row starts with a child in a green frame, then an arrow and two cards; children circle what a kind friend does. Level 3 has three rows and three faces in each row: children also circle how the child feels after the kind help.',
        watch: 'Right: the friend who adds a block to the tower, helps the child up, offers the ball, or helps pick up the crayons. The kicks and the pushes are unkind. Children circle a card after the arrow, never the framed first card. On Level 3, the happy face shows how the child feels after the help. If a child picks another face, ask why: feelings can be mixed, and that is okay. Children act out only the kind part; the puppets show the unkind one. No answer key.',
      },
    },
    'K:space-bubble': {
      title: 'My Space Bubble: Ask First',
      objective: 'Children stand in a hula hoop to feel their own space bubble, practice asking "May I give you a hug?" and answering "Yes!" or "No, thank you.", and learn that when a friend says "Stop, please," we stop.',
      routine: 'Each child stands in a hula hoop and stretches out both arms to feel a space bubble. Model asking "May I give you a hug?" and both answers, "Yes!" and "No, thank you." Pairs practice with four hellos (a hug, a high five, a wave, and a fist bump): the asker takes whichever hello the friend points to. End with a freeze game in which everyone stops at once when a partner says "Stop, please."',
      note: {
        mistake: 'Children think a hug is always welcome, or feel hurt when a friend says "No, thank you." They think "Stop" does not count in a game, or that a friend who says it is mad at them. Some push when a friend does not stop, instead of getting a grown-up.',
        words: 'Say: "This is your space bubble. Both answers are okay. Your body belongs to you." Say: "When a friend says stop, we stop right away." Tell the class: "On the page, the dark child is you, and the green child is your friend." Level 1: children color the space bubble and circle the hello their friend picks. Level 2 adds two "Stop, please." rows: children circle what they do. Level 3 has one stop row and a row for when someone does not stop when you say it: children circle what they do then.',
        watch: 'Right: stepping back or standing still when the friend says stop; keeping on hugging or chasing is not. On Level 3, when someone does not stop, the right card is walking to a grown-up to tell; pushing is not. The first card of that row, in the green frame, shows what happened; children choose from the two cards after it. Any hello the friend picks is right, and a friend who picks a wave still likes you: say so to a child who feels hurt. Take every report of someone not stopping seriously. No answer key.',
      },
    },
    'K:germ-busters': {
      title: 'Germ Busters: Scrub for 20 Seconds, Cough into Your Elbow',
      objective: 'Children wash their hands with soap for 20 seconds (singing "Happy Birthday" twice), cough and sneeze into their elbow, throw a used tissue in the trash, and tell when to wash: before eating, after using the bathroom, after recess, and after blowing their nose.',
      routine: 'Put a little washable glitter on two children\'s hands as pretend germs, keeping it away from eyes. They shake hands and pass a ball around: the glitter spreads. Then every child washes at the sink: wet, soap, scrub the backs, between the fingers, and under the nails while the class sings "Happy Birthday" two times (about 20 seconds), rinse, and dry. Last, practice the elbow cough and throwing a used tissue in the trash.',
      note: {
        mistake: 'Children think hands that look clean are clean, because germs are too small to see. They wash for a second or skip the soap. They cough into their hands or into the air, and leave a used tissue on the table.',
        words: 'Say: "Germs are too small to see. Soap and scrubbing wash them away." The page: read every label aloud. Level 1 shows the four times to wash; children color them, color a cake for each time they sing the song, and color each germ buster they did with you. Level 2 adds two times we do not need to wash (after I see a rainbow, after a story); children circle only the wash times and color the germ busters they did by themselves. Level 3 adds a box to draw themselves teaching a friend to wash.',
        watch: 'Right: the four wash times are colored or circled; the rainbow and the story are not. A child who circles "after a story" because everyone touched the book is thinking about germs: say, "Good thinking. These four are the times we always wash." Name the pictures as you read: the tissue box means blowing your nose, and the bent arm is an elbow. Each cake is one time through the song. Color a germ buster only when you saw the child do it. No answer key.',
      },
    },
  },
};
