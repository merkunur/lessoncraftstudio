/** K-271 — Hard Maze. nt20-VAR variation of K-242 (same family: mazes). */
'use strict';
const base = require('./K-242-maze.js');
module.exports = {
  ...base,
  id: 'K-271',
  slug: 'maze-hard',
  difficulty: { 1: {"cols":11,"rows":13,"cell":48}, 2: {"cols":11,"rows":13,"cell":48}, 3: {"cols":11,"rows":13,"cell":48} },
  i18n: { en: { title: "Hard Maze", instruction: "Start at the picture at the top. Draw a path through the maze to reach the goal at the bottom." } },
};
