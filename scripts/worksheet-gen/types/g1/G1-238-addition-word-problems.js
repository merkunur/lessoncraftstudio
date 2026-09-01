/** G1-238 — Addition Word Problems. nt20-VAR variation of G1-213 (same family: word-problems). */
'use strict';
const base = require('./G1-213-word-problems.js');
module.exports = {
  ...base,
  id: 'G1-238',
  slug: 'addition-word-problems',
  difficulty: { 1: {"max":20,"problems":2,"iconMax":12,"opsPattern":["add"]}, 2: {"max":20,"problems":2,"iconMax":12,"opsPattern":["add"]}, 3: {"max":20,"problems":2,"iconMax":12,"opsPattern":["add"]} },
  i18n: { en: { title: "Addition Word Problems", instruction: "Read each story. Use the pictures to help you. Write the answer in the box." } },
};
