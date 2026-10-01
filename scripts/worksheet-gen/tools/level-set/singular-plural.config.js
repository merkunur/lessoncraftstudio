/** Level Set config — Singular and Plural (K-287 + K-302 / K-303 / K-313 / K-314 / K-316), 2026-10-01. PDF + interactive + key. */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'spl',
  titleMax: 80,
  crossFaceShare: true,      // the faces are different tasks (one→many / many→one / with or without a model)
  allowFewer: true,
  note: 'Level Set 2026-10-01: Singular and Plural (K-287 + 5 faces). Easier = three rows of short words with two pictures each; harder = four rows of longer words. Each copy a different picture set (colour or black-and-white). Screen version: spell the word for many (or for one) with letter tiles; answer key: the missing word written on the lines. Visible to teachers, never indexed; PDF + screen version + answer key.',
  faces: {
    'K-287': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-302': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-303': { published: 'vehicles', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-313': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-314': { published: 'toys', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'K-316': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: () => true,
};
