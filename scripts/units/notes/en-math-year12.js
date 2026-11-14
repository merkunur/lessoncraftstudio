'use strict';
/**
 * Teacher notes, English, mathematics: the lessons of the planned school year that "Year pages U" made possible (Daily
 * Teaching System, Part 12.2): three new lessons of the Grade 3 unit Area and Perimeter.
 * Written from the built worksheets of the lessons and read by a US teacher-reviewer beside nine pictures of the pages
 * (2026-11-14: 21 findings on the texts, two must-fix: the L-shape lesson showed the standard of tiling, and "what is
 * left after the two long sides" was true of the pictured page only).
 * What a note says a tool does was read in the tool's code: the Baking Tray is set to rows of buns, turns a quarter
 * turn, and can be cracked along one seam into two trays (it makes no L-shape); All the Way Round lays the strand that
 * goes round a curved shape straight on a runway (no sides, no numbers).
 * A note stays within the length a guide sheet carries (about 1,400 characters; build-guide.js fails a sheet that
 * runs past its foot).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'en',
  points: {
    '3:area-model#area-of-a-rectangle-multiply-the-side-lengths': {
      title: 'Area of a rectangle: multiply the side lengths',
      objective: 'Children find the area of a rectangle by multiplying its two side lengths and say the area with its square unit (24 square feet).',
      note: {
        mistake: 'Children add the two side lengths, or add all four sides (they find the perimeter). Others multiply correctly and say the unit of length: "24 feet" for 24 square feet.',
        words: 'On the Baking Tray, set 4 rows of 6 buns: "How many buns? We don\'t have to count them one by one: 4 rows of 6 is 4 × 6." Give the tray a quarter turn: "6 rows of 4. Still 24." Draw a rectangle on the board and write 6 ft on top and 4 ft on the left side: "This time no squares are drawn. Picture squares 1 foot on each side. How many fit along the top? How many rows?" Write 4 × 6 = 24 and say the unit: "24 square feet. A square foot is a square that is 1 foot long and 1 foot wide."',
        watch: 'On the easier page, the squares are still drawn in each rectangle, so a child can check the product by counting. On the page for everyone, only the two side lengths are written. Either order of the two factors is right (6 × 4 or 4 × 6). On the harder page, the sides go from 4 to 10, and two cards show a question mark on one side and print the area ("Area = 54 square meters"): the child finds the side. A child who multiplies 9 × 54 has not read the equation: ask, "What number times 9 makes 54?" The unit changes from card to card, and the area unit is printed with the boxes: have children read it aloud with their answer.',
      },
    },
    '3:area-model#area-of-an-l-shape': {
      title: 'Area of an L-shape',
      objective: 'Children cut an L-shaped figure into two rectangles, find the area of each by multiplying, and add the two areas.',
      note: {
        mistake: 'Children multiply the two longest sides, as if the figure were a full rectangle. On the page without a grid, they use a side length of the whole figure for one of the parts (for example, 10 where the part is only 6 wide).',
        words: 'On the Baking Tray, set 5 rows of 6 buns and crack the tray after the third row: "Two trays: 3 rows of 6 and 2 rows of 6. 18 + 12 = 30. Nothing was lost." The tray cannot make an L-shape, so go to the board and draw one on a grid: "This is not one rectangle. It is two rectangles pushed together. Where can one straight cut make two rectangles?" Draw the cut, name the parts A and B, write a product for each, and add. Cut the same figure the other way and add again: "The same area. Either cut is right."',
        watch: 'On the easier page, the cut is drawn and the parts are named A and B. On the page for everyone, the figure is on a grid without the cut: the child draws the cut, and either of the two cuts is right. On the harder page, there is no grid and the six side lengths are written at the sides. Every length the child needs is printed, for either cut; nothing has to be subtracted. Have the child trace each part with a finger and say its two sides before writing a product. A child who takes the missing corner away from the full rectangle is right; ask for a cut as well, because the boxes add.',
      },
    },
    '3:perimeter#find-the-missing-side': {
      title: 'Perimeter: find the missing side',
      objective: 'Children find one unknown side length of a figure from its perimeter and the other side lengths, and write an equation with a letter for the unknown side.',
      note: {
        mistake: 'Children add the side lengths they see and write that sum as the answer, or they add the perimeter to it. In the rectangle with one side length given, they subtract that side once instead of twice, or they subtract it twice and write what is left as n without halving it.',
        words: 'On All the Way Round, let the strand lie down: "The distance all the way around is one length." The tool shows no sides and no numbers, so go to the board. Draw a triangle with sides 10 ft and 6 ft and one side n: "The perimeter is 24 feet. Picture its strand laid straight: 24 feet long." Draw the strand as a bar cut into three pieces: 10, 6, n. Write 10 + 6 + n = 24. "10 + 6 is 16. What do we add to 16 to make 24?" n = 8. Check by adding all three sides.',
        watch: 'On the easier page, the equation is printed under each figure and the child finds n. On the page for everyone, the child writes the equation on the line. The page has triangles, four-sided figures, and five-sided figures. On the harder page, the perimeters go up to 100, one figure is an L-shape with six sides, and two rectangles show one side length and the letter n on two sides. The printed side counts twice; what is left is n + n, so the child still has to split it in two (one side 9, perimeter 30: 9 + 9 + n + n = 30; 12 is left; n = 6). The figures are drawn in proportion (not actual size), so a child can see whether an answer looks right.',
      },
    },
  },
};
