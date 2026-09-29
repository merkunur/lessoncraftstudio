/** Level Set config — Picture Writing Prompts (G2-278 + G2-299 / G2-300), 2026-09-29. PDF only (open writing, no answer key). */
'use strict';
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'pwp',
  interactive: false,   // open writing: printable only, no screen version, no answer key
  titleMax: 100,   // noindex decks; the hub card shows the short DB title — fr/pt 'Production d'écrit … — Série N' ran past 75 and lost ~35 themes
  faceWideDistinct: false,
  allowFewer: true,
  note: 'Level Set 2026-09-29: Picture Writing Prompts (G2-278 + 2 faces), PDF only. The base scene-and-word-bank page for EVERY theme (colour and black-and-white) at 3 levels (4 pictures + starters; 6 + 2 story starters; 6, no starters); the faces 5 themes per level (What You See: a starter on every one of 3 big rows / published / 6 rows with the 3 starters spread; Your Own Words: first sentence started / published / tick the bank words used). Visible to teachers, never indexed.',
  faces: {
    'G2-278': { published: 'vehicles', levels: { 1: 'all', 2: 'all', 3: 'all' } },
    'G2-299': { published: 'animals', levels: { 1: ALL, 2: CORE, 3: ALL } },
    'G2-300': { published: 'fruits', levels: { 1: ALL, 2: CORE, 3: ALL } },
  },
  include: () => true,
};
