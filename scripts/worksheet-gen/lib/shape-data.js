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
const SOLID_REAL_OBJECTS = {
  sphere: [{ theme: 'toys', noun: 'ball' }],
  cube: [{ theme: 'toys', noun: 'blocks' }],
  cone: [{ theme: 'fruits', noun: 'strawberry' }],
  cylinder: [{ theme: 'toys', noun: 'bucket' }],
};

module.exports = { SHAPES_2D, SHAPES_3D, SOLID_REAL_OBJECTS };
