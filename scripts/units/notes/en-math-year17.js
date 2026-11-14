'use strict';
/**
 * Teacher notes, English, mathematics: the lesson of the planned school year that "Year pages Z" made possible (Daily
 * Teaching System, Part 12.2): one new lesson in the Kindergarten unit Adding and Taking Away Within 10, the third kind
 * of story K.OA.A.2 names (put together, total unknown; the design called it "Two kinds together").
 * Written from the built worksheet of the lesson (K-643 How Many in All?, read by a native and teaching reviewer in all
 * eleven languages, 2026-11-14: "two kinds" was wrong for one thing in two colors, and the page now says "color the
 * pictures to match the story").
 * What the note says the tool does was read in the tool's code (mini tools/part-whole-frame.js): the Number Bonds Board
 * has a whole (the nest) over two parts (two trays); − and + set the whole (the quick numbers are 5 and 10); tapping a
 * tray sends one counter across, so the whole never changes; the parts setting "One for each part" gives each part its
 * own color (coral on the left, navy on the right); a cloth can be put over the whole; "Show the counts" puts the
 * numbers on; the written form "One number sentence" prints the total FIRST, from the LEFT part (8 = 3 + 5), and a
 * covered whole prints as "?". "Say the split aloud" is on by default and the board speaks numbers until something is
 * covered, so the cloth goes on first. Everything the note uses is free (numbers to 10, cloths, written form, colors).
 * A US teacher-reviewer read the note beside the pages and the tool's code (2026-11-14). Must-fix applied: the cloth
 * before the number, the colors the board really has (no red), − and + to reach 8, the dots stand under the first two
 * boxes only; the error the page invites is coloring the whole row and writing how many pictures it has. The board's
 * English labels spell "Colours" (recorded for the content-fix session), so the note names only its option.
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that runs
 * past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Kindergarten: Adding and Taking Away Within 10 ──
    '1:word-problems#two-kinds-together': {
      title: 'Put-together stories: how many in all?',
      objective: 'Children show stories about one thing in two colors (totals from 4 to 10) with counters of two colors, color pictures to match, and write the addition equation.',
      note: {
        mistake: 'Children count one color only, or count the second group from 1 and give that number. Some color the whole row, or write how many pictures the row has. Some write the two numbers and leave the total out.',
        words: 'On the Number Bonds Board, set the parts to "One for each part" and "Written form" to "One number sentence"; keep "Show the counts" on. Put the cloth over the whole first (the board says numbers aloud until it is covered), then set the number to 8 with − and +, and tap a tray until the left part shows 3 and the right part 5. The board reads ? = 3 + 5. Tell the story in the board\'s colors: "On the shelf there are 3 orange cups and 5 blue cups. How many cups are on the shelf?" Children count all the counters. Lift the cloth: 8. "Nothing came and nothing went away." The board writes 8 = 3 + 5, the page 3 + 5 = 8: both are true. Then pairs show two of your stories with two-color counters.',
        watch: 'Each story names one thing in two colors, with a colored dot after each color word. Easier page: three stories, totals 4 to 6, a row of eight pictures. Page for everyone: four stories, totals 5 to 10, a row of ten. The child colors each group, leaves the rest white, and writes _ + _ = _ (the dots under the first two boxes show which group goes where). Harder page: three stories, totals 6 to 10, no pictures: the child draws a circle in its color for each thing. Ask: "How do you know you colored the right number of each?"',
      },
    },
  },
};
