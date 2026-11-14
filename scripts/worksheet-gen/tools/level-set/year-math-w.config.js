/** Level Set config — Year pages W (Daily Teaching System, Part 12.2), 2026-11-14. PDF only.
 *  Three NEW mathematics page types (types/_shared/tens-wholes-grids.js): Multiply by Tens (G3-491), Whole Numbers as
 *  Fractions (G3-492) and Rows and Columns of Squares (G2-515).
 *  For the lessons of the English year design on multiplying by whole tens (3.NBT.A.3), whole numbers as fractions
 *  (3.NF.A.3.c) and cutting a rectangle into rows and columns of squares (2.G.A.2)
 *  (docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, part D).
 *  No theme: a copy is a new draw of the numbers (a seed), five copies per level.
 *  Every face is NEW (noPublished), so its copies number from 1 at every level. */
'use strict';
const FACES = ['G3-491', 'G3-492', 'G2-515'];
module.exports = {
  prefix: 'ymw',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-14: Year pages W (Part 12.2). Three new mathematics page types without pictures of things (a one-digit number times a whole ten, thought of as tens; whole numbers written as fractions from shaded shapes, on number lines and in equations; a rectangle cut into rows and columns of squares with a ruler), three levels each, for lessons of the year designs.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  // Whole Numbers as Fractions is an English page: a fraction equal to a whole number written a/b is Grade 3 only in
  // the United States (elsewhere Grade 4 to 6: de Klasse 5/6, fr CM1, it classe 4ª, es-MX 4°, pt-BR 5º ano, nl groep
  // 6-7, Nordic and Finnish years 4-5; native and teaching review, 2026-11-14). A page is not published at a grade
  // where its country does not teach it.
  include: (loc, id) => id !== 'G3-492' || loc === 'en',
};
