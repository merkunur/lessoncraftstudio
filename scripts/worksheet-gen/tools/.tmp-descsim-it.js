'use strict';
const path = require('path');
const D = require('../emit/deck-html.js');
const seoHead = require('../../publish-cli/build-seo-head.js');
const TAXONOMY_JSON = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
const { loadType } = require('../lib/load-types.js');
const draft = require('../i18n/.draft-b2var-it.json');
const wave = require('../waves/wave-b2var-it.json');
const msgs = require('../../../frontend/messages/it.json');
const LOC = 'it';
const w = (k, f) => (msgs.seo && msgs.seo.words && msgs.seo.words[k]) || f;
const AGE = { K: '5-7', G1: '6-8', G2: '7-9', G3: '8-10' };
const rows = [];
for (const [id, s] of Object.entries(draft.types)) {
  const spec = loadType(id);
  const band = id.split('-')[0];
  const themeKey = (wave.themeOverrides || {})[id] || null;
  const themeName = themeKey ? D.themeNameFor(themeKey, LOC) : null;
  const level = D.levelFor(AGE[band], LOC);
  const skill = D.skillSentenceFor(spec.exerciseType, LOC);
  const head = seoHead.buildSeoHead({
    language: LOC,
    exerciseTypeName: s.title,
    exerciseTypeSlug: spec.exerciseType,
    themeName,
    exerciseModeName: seoHead.deriveExerciseModeName(null, LOC, TAXONOMY_JSON),
    exerciseModeKey: null,
    worksheetWord: w('worksheet', 'Worksheet'),
    instruction: s.instruction,
    freeInteractive: w('free_printable', 'Free printable'),
    forWord: w('for', 'for'),
    printOrPlay: w('download_pdf', 'Download the free PDF'),
    educationalLevelLocalized: level,
    skillSentence: skill.full || '',
    skillSentenceShort: skill.short || '',
  });
  const m = head.match(/<meta name="description" content="([^"]*)"/);
  const desc = m ? m[1] : '(none)';
  const key = (t) => t.replace(/\s*[.!?]+\s*$/, '');
  const usedInstr = desc.indexOf(key(s.instruction)) !== -1;
  const usedShort = !usedInstr && skill.short && desc.indexOf(key(skill.short)) !== -1;
  const usedFull = !usedInstr && !usedShort && skill.full && desc.indexOf(key(skill.full)) !== -1;
  rows.push({ id, fam: spec.exerciseType, len: desc.length, won: usedInstr ? 'INSTRUCTION' : usedShort ? 'skill-short' : usedFull ? 'skill-full' : 'CORE-ONLY', desc });
}
const lost = rows.filter((r) => r.won !== 'INSTRUCTION');
console.log('faces:', rows.length, '| instruction wins:', rows.length - lost.length, '| LOST:', lost.length);
for (const r of lost) console.log('  LOST', r.id, r.fam, 'len=' + r.len, '->', r.won);
const byFam = {};
for (const r of rows) (byFam[r.fam] = byFam[r.fam] || []).push(r);
for (const [f, rs] of Object.entries(byFam)) {
  const u = new Set(rs.map((r) => r.desc));
  if (u.size !== rs.length) console.log('  DUP DESC in family', f, ':', rs.length, 'faces ->', u.size, 'distinct');
}
const over = rows.filter((r) => r.len > 170 || r.len < 120);
for (const r of over) console.log('  BAND', r.id, r.len);
console.log('sample:', rows[0].desc);
console.log('sample:', rows[45].desc);
module.exports = { rows };
