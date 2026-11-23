/** K-695 — A Harder Push, a Farther Roll (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-015). dk-kinder.js mode 'harder-push'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-695', slug: 'a-harder-push-a-farther-roll', mode: 'harder-push', exerciseType: 'science-sort',
  difficulty: {"1":{"tests":2},"2":{"tests":3,"circle":true},"3":{"tests":3,"circle":true,"count":true}},
  i18n: { en: { title: "A Harder Push, a Farther Roll", instruction: "Roll the ball with each push. Color its arrow and draw the ball where it stopped. If it rolled past the end, color the end box. Circle the push that sent it farthest." } },
});
