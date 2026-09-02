'use strict';
const path = require('path');
const D = require('../emit/deck-html.js');
const seoHead = require('../../publish-cli/build-seo-head.js');
const TAX = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
const { loadType } = require('../lib/load-types.js');
const wave = require('../waves/wave-b2var-it.json');
const msgs = require('../../../frontend/messages/it.json');
const LOC = 'it';
const w = (k, f) => (msgs.seo && msgs.seo.words && msgs.seo.words[k]) || f;
const AGE = { K: '5-7', G1: '6-8', G2: '7-9', G3: '8-10' };

function desc(id, title, instruction) {
  const spec = loadType(id);
  const band = id.split('-')[0];
  const themeKey = (wave.themeOverrides || {})[id] || null;
  const skill = D.skillSentenceFor(spec.exerciseType, LOC);
  const head = seoHead.buildSeoHead({
    language: LOC, exerciseTypeName: title, exerciseTypeSlug: spec.exerciseType,
    themeName: themeKey ? D.themeNameFor(themeKey, LOC) : null,
    exerciseModeName: seoHead.deriveExerciseModeName(null, LOC, TAX), exerciseModeKey: null,
    worksheetWord: w('worksheet', 'Worksheet'), instruction,
    freeInteractive: w('free_printable', 'Free printable'), forWord: w('for', 'for'),
    printOrPlay: w('download_pdf', 'Download the free PDF'),
    educationalLevelLocalized: D.levelFor(AGE[band], LOC),
    skillSentence: skill.full || '', skillSentenceShort: skill.short || '',
  });
  const m = head.match(/<meta name="description" content="([^"]*)"/);
  return m ? m[1] : '';
}
// The winning window, measured: sweep marker lengths, record where the marker survives.
function windowFor(id, title) {
  const win = [];
  for (let L = 10; L <= 100; L++) {
    const mk = 'Xy'.repeat(60).slice(0, L);
    if (desc(id, title, mk + '.').indexOf(mk) !== -1) win.push(L);
  }
  return win;
}
module.exports = { desc, windowFor };
if (require.main === module) {
  const draft = require('../i18n/.draft-b2var-it.json');
  const rows = [];
  for (const [id, s] of Object.entries(draft.types)) {
    const win = windowFor(id, s.title);
    const lo = win.length ? win[0] : null, hi = win.length ? win[win.length - 1] : null;
    const cur = s.instruction.replace(/\s*[.!?]+\s*$/, '').length;
    rows.push({ id, t: s.title.length, lo, hi, cur, ok: win.length ? (cur >= lo && cur <= hi) : false });
  }
  console.log('id\ttitleLen\twindow(stripped)\tcur\tstatus');
  for (const r of rows) console.log([r.id, r.t, r.lo === null ? 'NONE' : r.lo + '-' + r.hi, r.cur, r.ok ? 'ok' : (r.lo === null ? 'NO-WINDOW' : 'FIX')].join('\t'));
  console.log('\nok:', rows.filter((r) => r.ok).length, '/', rows.length, '| no-window:', rows.filter((r) => r.lo === null).length);
}
