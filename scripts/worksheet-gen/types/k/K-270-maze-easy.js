/** K-270 — Easy Maze. nt20-VAR variation of K-242 (same family: mazes). */
'use strict';
const base = require('./K-242-maze.js');
module.exports = {
  ...base,
  id: 'K-270',
  slug: 'maze-easy',
  difficulty: { 1: {"cols":7,"rows":8,"cell":74}, 2: {"cols":7,"rows":8,"cell":74}, 3: {"cols":7,"rows":8,"cell":74} },
  i18n: { en: { title: "Easy Maze", instruction: "Start at the picture at the top. Draw a path through the maze to reach the goal at the bottom." } },
};
