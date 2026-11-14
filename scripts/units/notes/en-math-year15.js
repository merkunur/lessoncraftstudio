'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages X" made possible (Daily
 * Teaching System, Part 12.2): one new lesson in the Grade 1 unit Shapes, Measuring, and Graphs and one each in the
 * Grade 2 units Measurement, Time, and Money and Graphs and Grids.
 * Written from the built worksheets of the lessons. The pages were read twice by a native and teaching reviewer
 * (2026-11-14): the two marks of the clip rows carry the words right / wrong, the two-units page measures with a
 * shorter unit on two rows and a longer one on two, and the pencils of the line plot have lengths pencils have.
 * What a note says a tool does was read in the tool's code: the Measurement Bench has a Length bench on which paper
 * clips or cubes are laid along a picture; "Count" counts them; a row with gaps is pushed together and the bench says
 * "Part of … isn't covered yet — add more!". The Unit Handle shows one object over two tapes of units,
 * each tape with its own number; the end of a tape's first tile is dragged to make its unit bigger or smaller, and the
 * tape's number changes while the object and the other tape stay where they are (a short end piece left over is shown
 * and not counted). The Ruler shows a fixed ruler and a bar between a start handle and an end handle: the bar IS the
 * object, there is no other; its settings switch the units and have "Show length" (on by default, it prints eighths
 * of an inch). The Measurement Bench SPEAKS its lines (sound on), it does not print them before "Count" has counted.
 * A US teacher-reviewer read the notes beside three page pictures and the code of the three tools (2026-11-14):
 * every number right; four must-fix applied (the Ruler has no separate object; the bench's line is spoken; the
 * question "too big or too small" has no answer for a row that starts late; two sentences that were not English).
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Grade 1: Shapes, Measuring, and Graphs ──
    '1:measure-length-units#no-gaps-no-overlaps': {
      title: 'No gaps, no overlaps',
      objective: 'Children measure a length by laying paper clips end to end from one end to the other with no gaps and no overlaps, and find the mistakes in rows of clips that were laid wrong.',
      note: {
        mistake: 'Children leave gaps between the clips or let them overlap, and still count every clip. Others start the row a little way in from one end of the object, or stop before the other end. Many think any row of clips gives the length, no matter how it is laid.',
        words: 'On the Measurement Bench (sound on), choose Length and lay paper clips from one end of the object to the other, but leave gaps. Tap "Count." The bench pushes the clips together and says aloud that part of the object is not covered yet. "Why does it need more clips?" Add clips and count again. Then lay a pencil under the document camera and measure it with real paper clips that overlap: "Is my pencil 6 clips long?" Agree on the rule and write it on the board: start at one end, use clips of one size, lay them end to end, no gaps, no overlaps, stop at the other end. Then pairs measure three things from their desks and say "about _ paper clips long."',
        watch: 'On the easier page, four ribbons each have a row of clips: two rows are laid right, one has gaps, and one has overlaps. On the page for everyone, there are six rows, and one wrong row starts late. On the harder page, one wrong row stops short, and the child writes how many clips long the ribbon is only where the clips are laid right. The child fills in the circle next to "right" or "wrong" and circles every mistake: a row with gaps or overlaps has two, and a row that starts late also runs past the other end. Ask: "Is the number too big or too small?" (A row that starts late may show the right number.)',
      },
    },
    // ── Grade 2: Measurement, Time, and Money ──
    '1:measure-length-units#same-length-two-units': {
      title: 'Same length, two units',
      objective: 'Children measure the same object twice, with a longer and a shorter unit (paper clips and cubes or craft sticks, then inches and centimeters), and tell why the smaller unit gives the larger number.',
      note: {
        mistake: 'Children think the larger number means the longer object, so a ribbon that is 8 cubes long seems longer than the same ribbon measured as 4 paper clips. Others expect the bigger unit to give the bigger number. Some mix the two units in one row.',
        words: 'On The Unit Handle, one object sits above two tapes of units, each with its own number (a short end piece left over is not counted). "Both tapes measure the same object." Drag the end of the first tile of the top tape to make its unit smaller. "What happened to the number? Did the object change?" The number goes up; the object and the other tape stay the same. Make the unit bigger: the number goes down. "Smaller unit, more of them." Then pairs measure a pencil, a book, and a glue stick with a classroom ruler, in inches and in centimeters, and say which number is larger and why.',
        watch: 'On every page, two ribbons are measured with paper clips and cubes, and two with paper clips and craft sticks; a stick is as long as two clips. On the easier page, two cubes are as long as one clip; on the page for everyone, three. On the harder page, the second row is not finished: the child counts the clips and figures out the other unit (4 clips, 2 cubes under the first clip: 8 cubes; 6 clips: 3 sticks). The child writes both numbers and fills in the circle next to the unit it took more of: the cube on the cube rows, the clip on the stick rows. Have every child say why: "It took more cubes because a cube is shorter than a paper clip."',
      },
    },
    // ── Grade 2: Graphs and Grids ──
    '2:line-plots#measure-and-make-a-line-plot': {
      title: 'Measure and make a line plot',
      objective: 'Children measure pencils to the nearest inch, record ten lengths in a table, and show them as Xs on a line plot.',
      note: {
        mistake: 'Children draw one X for each different length, not one for each pencil, so three 6-inch pencils get only one X. Others stack the Xs unevenly, so a column of three looks taller than a column of four. When they number the line, some skip the lengths nobody measured.',
        words: 'On the Ruler, set the units to inches and turn off "Show length." Leave the start handle at 0 and drag the end handle; the bar is the object. "Where does it end? Which inch mark is closest?" Read to the nearest inch. Then draw a number line from 2 to 9 on the board. Ten children each measure a used pencil to the nearest inch and say its length; draw each X above its number: "This pencil is 6 inches long. One X above the 6. Another 6: the new X goes on top of the first." Ask: "Which length do we see most often? How can you tell without counting again?"',
        watch: 'On the easier page, the ten lengths are printed and the line is numbered: the child draws the Xs, one for each pencil, and answers the questions. On the page for everyone, the child also writes the missing numbers under the line; every tick mark gets a number, even where there will be no X. On the harder page, the table and the line are empty: the child measures ten used pencils with a ruler and numbers the line. Nothing printed on the page is to be measured. Have children cross out each length in the table as they draw its X, and count the Xs at the end: ten. For "how much longer," they count the spaces from the shortest to the longest.',
      },
    },
  },
};
