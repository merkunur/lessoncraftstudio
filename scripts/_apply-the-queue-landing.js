/* One-shot: apply the rebuilt the-queue landing copy.
   (1) rewrites the `the-queue` ToolEntry in all 11 tool-content JSONs
       (EN from the canonical, 10 from the native-agent files),
   (2) regenerates the manipulatives.ts hub card (title/tagline/description
       × 11) in place,
   (3) applies any inToolReview corrections to the-queue.js.
   Idempotent-ish: re-running produces the same output. */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const SCR = process.env.QUE_SCRATCH;
if (!SCR) { console.error('set QUE_SCRATCH to the scratchpad dir'); process.exit(1); }
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* gather per-locale {hub, toolEntry, inToolReview} */
const data = {};
const en = JSON.parse(fs.readFileSync(path.join(SCR, 'queue-en-canonical.json'), 'utf8'));
data.en = { hub: en.hub, toolEntry: en.toolEntry, inToolReview: {} };
LOCS.slice(1).forEach(l => { data[l] = JSON.parse(fs.readFileSync(path.join(SCR, 'queue-loc-' + l + '.json'), 'utf8')); });

/* ---- (1) tool-content JSONs ---- */
LOCS.forEach(l => {
  const fp = path.join(REPO, 'frontend', 'messages', 'tool-content', l + '.json');
  const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const te = data[l].toolEntry;
  obj['the-queue'] = {
    slug: 'the-queue',
    name: te.name,
    tagline: te.tagline,
    about: te.about,
    howToUse: te.howToUse,
    classroomIdeas: te.classroomIdeas,
    metaTitle: te.metaTitle,
    metaDescription: te.metaDescription
  };
  fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('tool-content/' + l + '.json: the-queue ToolEntry rewritten');
});

/* ---- (2) manipulatives.ts hub card ---- */
const mp = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
let src = fs.readFileSync(mp, 'utf8');
const NL = src.indexOf('\r\n') >= 0 ? '\r\n' : '\n';   // ⚠ this file is CRLF
function field(name) {
  const lines = LOCS.map(l => '      ' + l + ': ' + JSON.stringify(data[l].hub[name]) + ',');
  return '    ' + name + ': {' + NL + lines.join(NL) + NL + '    },';
}
const newCard =
  '  {' + NL +
  '    id: "the-queue",' + NL +
  '    mini_tool_url: "/mini-tools/the-queue.html",' + NL +
  field('title') + NL +
  field('tagline') + NL +
  field('description') + NL +
  '  },';

const startTok = '  {' + NL + '    id: "the-queue",';
const start = src.indexOf(startTok);
if (start < 0) { console.error('FATAL: the-queue card not found in manipulatives.ts'); process.exit(1); }
const closeTok = NL + '  },' + NL + '];';             // the card close + array end
const closeAt = src.indexOf(closeTok, start);
if (closeAt < 0) { console.error('FATAL: card close not found (the-queue must be the last card)'); process.exit(1); }
const before = src.slice(0, start);
const after = src.slice(closeAt + closeTok.length);   // everything after "];"
src = before + newCard + NL + '];' + after;
fs.writeFileSync(mp, src, 'utf8');
console.log('manipulatives.ts: the-queue hub card regenerated (11 locales)');

/* ---- (3) inToolReview corrections into the-queue.js ---- */
const anyReview = LOCS.some(l => Object.keys(data[l].inToolReview || {}).length);
if (anyReview) {
  console.log('inToolReview corrections present — apply manually:');
  LOCS.forEach(l => { const r = data[l].inToolReview || {}; Object.keys(r).forEach(k => console.log('  [' + l + '] ' + k + ' → ' + r[k])); });
} else {
  console.log('inToolReview: all empty — every native panel validated the in-tool strings');
}
console.log('DONE');
