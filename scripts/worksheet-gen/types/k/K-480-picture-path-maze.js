/** K-480 — Picture Path Maze: Step on the Animals (Mazes maker 2026-11-02; retires the old picture-path app — "step only on
 *  pictures of a kind"). K-405's engine: the first-sound face's machinery with a picture pool of a KIND (animals) among
 *  pictures of other kinds (fruits, vegetables, furniture), on a farm (data/hm/scenes.js 'farm-picture-path'); levels from
 *  data/hmx/levels.js 'picture-path' (a shorter way and fewer decoys / a longer way and more). */
'use strict';
const base = require('./K-405-maze-puzzles.js');
const D = { ...base.difficulty[2], mode: 'picture-path', scene: 'farm-picture-path' };
module.exports = {
  ...base,
  id: 'K-480',
  slug: 'picture-path-maze',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: 'Picture Path Maze: Step on the Animals', printTitle: 'Help the Farmer Reach the Tractor', instruction: 'Help the farmer get to the tractor. Step only on the stones with animals.' } },
};
