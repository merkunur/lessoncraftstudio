#!/usr/bin/env node
/**
 * Poison test for tools/validate-b2-draft.js: a draft assembled from the EN
 * modules must PASS for locale en; four deliberate corruptions must each FAIL
 * with a message naming the defect. Exit 1 when either side fails.
 */
'use strict';
const path = require('path');
const { validate, TYPE_IDS, FAMILIES, FIGURES } = require('./validate-b2-draft.js');
const WG = path.join(__dirname, '..');
const strings = require(path.join(WG, 'i18n', 'strings.en.json'));
const skills = require(path.join(WG, 'i18n', 'skill-sentences.en.json'));
const msgs = require(path.join(WG, '..', '..', 'frontend', 'messages', 'en.json'));
const tax = require(path.join(WG, '..', '..', 'frontend', 'config', 'topics-taxonomy.json'));
const { SENTENCES } = require(path.join(WG, 'data', 'b2', 'sentences.js'));
const { WORD_CLASSES } = require(path.join(WG, 'data', 'b2', 'word-classes.js'));
const { SHOP_FRAMES } = require(path.join(WG, 'data', 'b2', 'shop-frames.js'));
const { WP_MULDIV } = require(path.join(WG, 'data', 'b2', 'wp-muldiv-frames.js'));
const { LABELS } = require(path.join(WG, 'data', 'b2', 'labels.js'));
const { FIGURE_NAMES } = require(path.join(WG, 'data', 'b2', 'figure-names.js'));
const { FRAMES } = require(path.join(WG, 'data', 'b2', 'calendar.js'));
const { COLOR_WORDS } = require(path.join(WG, 'data', 'color-words.js'));

function enDraft() {
  const d = { locale: 'en', types: {}, families: {}, skills: {}, topicMeta: {}, colorWords: {}, figureNames: {}, labels: JSON.parse(JSON.stringify(LABELS.en)) };
  for (const id of TYPE_IDS) d.types[id] = { ...strings[id] };
  for (const f of FAMILIES) { d.families[f] = { slug: tax.axes['exercise-type'][f].slug.en, name: tax.axes['exercise-type'][f].name.en }; d.skills[f] = { ...skills[f] }; d.topicMeta[f] = msgs.topicMeta[f]; }
  for (const k of ['orange', 'purple', 'brown', 'pink']) d.colorWords[k] = COLOR_WORDS.en[k];
  for (const k of FIGURES) d.figureNames[k] = FIGURE_NAMES.en[k];
  d.calendar = { weekStart: 0, frames: { ...FRAMES.en } };
  d.sentences = JSON.parse(JSON.stringify(SENTENCES.en));
  d.wordClasses = JSON.parse(JSON.stringify(WORD_CLASSES.en));
  d.shopFrames = JSON.parse(JSON.stringify(SHOP_FRAMES.en));
  d.wpMulDiv = JSON.parse(JSON.stringify(WP_MULDIV.en));
  return d;
}

let bad = 0;
const base = validate('en', enDraft());
if (base.length) { console.log('CONTROL FAILED (en draft should pass):\n' + base.join('\n')); bad++; } else console.log('control: en draft passes');

const poisons = [
  ['worksheet-word in a title', (d) => { d.types['K-284'].title = 'Word Tracing Worksheet'; }, /worksheet-word/],
  ['a simple frame carrying {n}', (d) => { d.sentences.frames.push({ id: 'p1', kind: 'simple', text: 'The {n} {noun} sleep.', noun: 'pl', uses: ['fix'] }); }, /simple frame slots/],
  ['verb that is a vocab noun', (d) => { d.wordClasses.verbs.push({ w: 'cat', tier: 1 }); }, /homographs/],
  ['calendar frame missing its slot', (d) => { d.calendar.frames.dayOfDate = 'What day is it?'; }, /calendar\.frames\.dayOfDate/],
  ['mul frame without {n2}', (d) => { d.wpMulDiv.frames.mul.push('{name} has {n1} boxes of {noun}.'); }, /lacks \{n2\}/],
  ['title colliding with an existing G1 type', (d) => { d.types['G1-243'].title = strings['G1-129'].title; }, /collides/],
];
for (const [name, mutate, re] of poisons) {
  const d = enDraft(); mutate(d);
  const errs = validate('en', d);
  const hit = errs.some((e) => re.test(e));
  console.log(`${hit ? 'fired ' : 'MISSED'}: ${name}`);
  if (!hit) bad++;
}
console.log(bad ? 'FAIL' : 'ALL POISONS FIRE, CONTROL PASSES');
process.exit(bad ? 1 : 0);
