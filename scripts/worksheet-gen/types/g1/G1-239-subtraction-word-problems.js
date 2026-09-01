/** G1-239 — Subtraction Word Problems. nt20-VAR variation of G1-213 (same family: word-problems). */
'use strict';
const base = require('./G1-213-word-problems.js');
module.exports = {
  ...base,
  id: 'G1-239',
  slug: 'subtraction-word-problems',
  difficulty: { 1: {"max":20,"problems":2,"iconMax":12,"opsPattern":["sub"]}, 2: {"max":20,"problems":2,"iconMax":12,"opsPattern":["sub"]}, 3: {"max":20,"problems":2,"iconMax":12,"opsPattern":["sub"]} },
  i18n: { en: { title: "Subtraction Word Problems", instruction: "Read each story. Use the pictures to help you. Write the answer in the box." } },
};
