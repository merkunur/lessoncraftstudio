/**
 * data/ptx/text-ls.js — the face-level Level Set strings (see data/ptx/text.js): per face mode, the title head with {NAME},
 * an optional print heading, and an instruction TRUE of every copy. Faces whose instruction must name a copy's own content
 * (trace-and-count, finish-the-picture, trace-and-draw) carry a fallback here and the real line per copy in
 * names-i18n.js INSTR. A face whose published heading is its own story (Storm over the Camp, The Mending Shelf …) prints
 * the copy's {NAME} instead. EN by the build session; the other locales by the native panels (filled into L below).
 */
'use strict';
const L = (en, rest = {}) => ({ en, ...rest });
const LS = {
  base: { title: L('Picture Tracing: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace every dashed line to finish the picture.') },
  'first-tracing': { title: L('My First Tracing: {NAME}'), instruction: L('Start at the dot. Trace the big picture slowly, all the way round.') },
  'look-then-trace': { title: L('Look, Then Trace: {NAME}'), instruction: L('Look at each picture in a frame. Then trace the same picture next to it.') },
  'round-and-round': { title: L('Round Pictures to Trace: {NAME}'), instruction: L('Start at each dot and trace round and round, like the letter o.') },
  'straight-lines': { title: L('Straight-Line Tracing: {NAME}'), instruction: L('Look at the arrow above each column. Trace one column at a time: down, then across, then slanted.') },
  zigzags: { title: L('Zigzag Picture Tracing: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the whole picture. Stop at every tip of the zigzags.') },
  curls: { title: L('Spirals and Loops to Trace: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the spirals and loops round and round.') },
  'trace-and-color': { title: L('Trace and Color: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the whole picture. Then color it in any colors you like.') },
  'where-to-start': { title: L('Where Do I Start? {NAME}'), instruction: L('Start at each dot and follow the arrow. Go down the stairs, one picture at a time.') },
  'trace-and-count': { title: L('Trace and Count: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the animals. Count them. Write how many in the box.') },
  'finish-the-picture': { title: L('Finish the Picture: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the dashed part to finish each picture.') },
  christmas: { title: L('Christmas Picture Tracing: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the whole Christmas picture. Then trace round every bauble and star.') },
  'shape-picture': { title: L('Shape Picture Tracing: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace every shape of the picture. Then color every circle.') },
  'summer-sea': { title: L('Summer Picture Tracing: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the long lines of the sea from left to right. Then trace the rest of the picture.') },
  'big-middle-small': { title: L('Big, Middle, Small: {NAME}'), instruction: L('In every row, trace the big one, then the middle one, then the small one.') },
  'dotted-street': { title: L('Dotted Picture Tracing: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the dotted lines carefully, the small details too.') },
  'picture-and-word': { title: L('Picture Words to Trace: {NAME}'), instruction: L('Trace the picture. Say its name. Trace the word under it.') },
  'trace-and-draw': { title: L('Trace, Then Draw: {NAME}'), printTitle: L('{NAME}'), instruction: L('Trace the whole picture. Then draw what is missing in the empty space.') },
  'other-half': { title: L('Symmetry Tracing: {NAME}'), instruction: L('Trace the dashed half so both sides of each picture look the same.') },
  'hidden-animals': { title: L('Find the Hidden Animals: {NAME}'), printTitle: L('{NAME}'), instruction: L('Find the 5 hidden animals. Trace them.') },
};
// the other ten locales: the native panels' tables data/ptx/i18n/<loc>.json → { ls: { <mode>: { title, printTitle?, instruction } } }
{
  const fs = require('fs'), path = require('path');
  for (const loc of ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']) {
    const f = path.join(__dirname, 'i18n', loc + '.json'); if (!fs.existsSync(f)) continue;
    const t = JSON.parse(fs.readFileSync(f, 'utf8')).ls || {};
    for (const [mode, v] of Object.entries(t)) {
      if (!LS[mode]) throw new Error('ptx i18n ' + loc + ': unknown face mode ' + mode);
      for (const k of ['title', 'printTitle', 'instruction']) if (v[k] != null) { if (!LS[mode][k]) LS[mode][k] = {}; LS[mode][k][loc] = v[k]; }
    }
  }
}
module.exports = LS;
