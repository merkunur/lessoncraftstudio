/**
 * Geometry knowledge for the shapes theme — the ONLY hand-curated facts the
 * geometry class needs (the art itself is library imagery).
 * Verified against the platform's shapes-theme art 2026-06-13.
 */
'use strict';

// 2D shapes: sides/corners (corners == sides for these polygons; 0 for curved)
const SHAPES_2D = {
  circle: { sides: 0, corners: 0, curved: true },
  oval: { sides: 0, corners: 0, curved: true },
  triangle: { sides: 3, corners: 3 },
  square: { sides: 4, corners: 4 },
  rectangle: { sides: 4, corners: 4 },
  diamond: { sides: 4, corners: 4 },
  trapezoid: { sides: 4, corners: 4 },
  parallelogram: { sides: 4, corners: 4 },
  pentagon: { sides: 5, corners: 5 },
  hexagon: { sides: 6, corners: 6 },
  heptagon: { sides: 7, corners: 7 },
  octogon: { sides: 8, corners: 8 },   // library spelling
};

// 3D solids: faces / edges / vertices
const SHAPES_3D = {
  cube: { faces: 6, edges: 12, vertices: 8 },
  rectangular_box: { faces: 6, edges: 12, vertices: 8 },
  sphere: { faces: 0, edges: 0, vertices: 0, curved: true },
  cone: { faces: 1, edges: 1, vertices: 1, curved: true },
  cylinder: { faces: 2, edges: 2, vertices: 0, curved: true },
  pyramid: { faces: 5, edges: 8, vertices: 5 },   // square pyramid
};

// real-world lookalikes per solid (vocabKey + the cached theme holding it)
// Every picture read on a contact sheet (2026-10-08). The shapes theme's "cone" is a cut-off cone (flat top), so no
// object is matched to it; the old pairs were a strawberry for that cut-off cone and a BUCKET (which widens at the
// top — itself a cut-off cone) for the cylinder, so two matches looked right. The first object is the published one.
const SOLID_REAL_OBJECTS = {
  sphere: [{ theme: 'toys', noun: 'ball' }, { theme: 'classroom', noun: 'globe' }],
  cube: [{ theme: 'toys', noun: 'dice' }, { theme: 'toys', noun: 'blocks' }],
  cylinder: [{ theme: 'At the Supermarket', noun: 'can' }, { theme: 'around the house', noun: 'toilet_paper' }, { theme: 'music', noun: 'drum' }, { theme: 'christmas', noun: 'candle' }],
  // a TALL box like the drawing; a book (lying flat) looked too much like the squat "cube" picture
  rectangular_box: [{ theme: 'around the house', noun: 'fridge' }, { theme: 'around the house', noun: 'refrigerator' }, { theme: 'kitchen tools', noun: 'refrigerator' }],
};

module.exports = { SHAPES_2D, SHAPES_3D, SOLID_REAL_OBJECTS };
