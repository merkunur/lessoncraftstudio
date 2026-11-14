'use strict';
/**
 * Teacher notes, English, mathematics: the lesson of the planned school year that "Year pages AA" made possible (Daily
 * Teaching System, Part 12.2): one new lesson in the Kindergarten unit Shapes All Around (K.G.A.2, the four solids).
 * Written from the built worksheets of the lesson: K-644 Name the Solid Shapes (read by a native and teaching reviewer
 * in all eleven languages, 2026-11-14) and, as the second page, G2-243 Solid Shapes Around Us at its first level (three
 * solids matched to things; it has no cone).
 * A US teacher-reviewer read the note beside the pages and the code (2026-11-14). Must-fix applied: the harder page has a
 * drum and no candle, and keeps the number cube; a party hat cannot stand on its tip; a second ball for "overall size".
 * Professor Pip's Museum is NOT this lesson's practice on screen: its solids hall has no cone pedestal (a cone goes to
 * its Mystery Gallery), which a lesson about naming the cone must not hand out.
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that runs
 * past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    // ── Kindergarten: Shapes All Around ──
    '2:solids-in-real-life#name-the-solid-shapes': {
      title: 'Name the solid shapes',
      objective: 'Children name the sphere, the cube, the cylinder and the cone, match each one to an everyday thing of the same shape, and name it again when it is big or small, standing or lying down.',
      note: {
        mistake: 'Children name a solid by its size or the way it lies: a can on its side is "a different shape," and a cone on its tip is "not a cone." Many use flat-shape words for solids (a ball is "a circle," a block "a square"), and some call every box a cube.',
        words: 'Bring a big and a small ball, a number cube, a can and a party hat. Name each one: "This is a sphere. It is round all over." Roll, stack and slide them: the sphere rolls any way, the cube stacks and slides, the cylinder rolls on its side and stands on a flat end, the cone rolls in a circle. Lay the can down and hold the hat point down: "Still a cylinder? Still a cone?" Turning a solid or changing its size does not change its name. Then children find a sphere, a cube, a cylinder and a cone in the classroom and say each name.',
        watch: 'At the top of every page, the child draws a line from each of four solids to the thing of the same shape. Below, a color code gives each name a color. Easier page: eight solids, upright, in two sizes. Page for everyone: twelve solids in three sizes, some turned (a cylinder lying down, a cone on its side or tip, a tilted cube). Harder page: the things are an orange, a number cube, a drum and an ice-cream cone, and a box and a pyramid among the twelve are none of the four and stay white. The second page matches three solids to things once more (it has no cone). Ask: "How do you know it is a cylinder, even lying down?"',
      },
    },
  },
};
