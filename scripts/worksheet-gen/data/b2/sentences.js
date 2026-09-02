/**
 * sentences.js — the per-locale SENTENCE BANK feeding G1-242 (read-and-color),
 * G1-249 (unscramble) and G2-274 (fix the sentence). nt20-B.
 *
 * Contract (lib/sentence-bank.js): frames use ONLY the slots {name} {n}
 * {noun} {color}; the code substitutes stored literals and never inflects.
 *   kind 'color'  — exactly one {n} (digit 2..6), one {noun} (plural or a
 *                   named table), one {color}; consumed by G1-242.
 *   kind 'simple' — exactly one {noun}; {name} at most twice; `uses` says
 *                   which pages may draw it: 'unscramble' (ONE unmarked
 *                   natural order; no movable adverbial), 'fix' (canonical
 *                   capitalised + punctuated form; the page lowercases and
 *                   strips the end mark).
 *   `exclaimStrict:true` marks a '!' frame as an interjective exclamation
 *   whose mark is unambiguous; other '!' frames are never drawn at d3.
 *
 * en is hand-authored here (and audited by every locale panel as the SOURCE);
 * the 10 other locales are merged in by tools/apply-b2-locale.js from the
 * panel drafts (this file is then REWRITTEN as GENERATED — edit drafts).
 */
'use strict';

const SENTENCES = {
  en: {
    nounCase: 'lower',
    endSpace: false,
    names: ['Mia', 'Ben', 'Emma', 'Leo', 'Anna', 'Tom', 'Lily', 'Max'],
    colorWords: null,
    nounForms: {},
    fixLabels: { capital: 'Capital letter', name: 'Names', end: 'End mark' },
    frames: [
      { id: 'c1', kind: 'color', text: 'Color {n} {noun} {color}.', noun: 'pl' },
      { id: 'c2', kind: 'color', text: 'Find {n} {noun} and color them {color}.', noun: 'pl' },
      { id: 'c3', kind: 'color', text: 'Make {n} {noun} {color}.', noun: 'pl' },
      { id: 'c4', kind: 'color', text: '{name} colors {n} {noun} {color}.', noun: 'pl' },
      { id: 's1', kind: 'simple', text: 'The {noun} sleeps on the bed.', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's2', kind: 'simple', text: '{name} feeds the {noun}.', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's3', kind: 'simple', text: 'Where is the {noun}?', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's4', kind: 'simple', text: 'I can see two {noun}.', noun: 'pl', uses: ['unscramble', 'fix'] },
      { id: 's5', kind: 'simple', text: '{name} has a big {noun}.', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's6', kind: 'simple', text: 'The {noun} is in the box.', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's7', kind: 'simple', text: 'Can you find the {noun}?', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's8', kind: 'simple', text: '{name} and I like the {noun}.', noun: 'sg', uses: ['fix'] },
      { id: 's9', kind: 'simple', text: 'Look at the little {noun}!', noun: 'sg', uses: ['unscramble', 'fix'], exclaimStrict: true },
      { id: 's10', kind: 'simple', text: 'The {noun} are red.', noun: 'pl', uses: ['unscramble', 'fix'] },
      { id: 's11', kind: 'simple', text: 'Is this your {noun}?', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's12', kind: 'simple', text: '{name} draws a {noun} for {name}.', noun: 'sg', uses: ['fix'] },
      { id: 's13', kind: 'simple', text: 'My {noun} is very small.', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's14', kind: 'simple', text: 'What a funny {noun}!', noun: 'sg', uses: ['fix'], exclaimStrict: true },
      { id: 's15', kind: 'simple', text: '{name} likes the red {noun}.', noun: 'sg', uses: ['unscramble', 'fix'] },
      { id: 's16', kind: 'simple', text: 'Did {name} see the {noun}?', noun: 'sg', uses: ['fix'] },
    ],
  },
};

module.exports = { SENTENCES };
