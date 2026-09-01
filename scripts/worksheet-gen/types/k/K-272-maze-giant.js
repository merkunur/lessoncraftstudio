/** K-272 — Giant Maze. nt20-VAR variation of K-242 (same family: mazes). */
'use strict';
const base = require('./K-242-maze.js');
module.exports = {
  ...base,
  id: 'K-272',
  slug: 'maze-giant',
  difficulty: { 1: {"cols":13,"rows":15,"cell":42}, 2: {"cols":13,"rows":15,"cell":42}, 3: {"cols":13,"rows":15,"cell":42} },
  i18n: { en: { title: "Giant Maze", instruction: "Start at the picture at the top. Draw a path through the maze to reach the goal at the bottom." } },
};
