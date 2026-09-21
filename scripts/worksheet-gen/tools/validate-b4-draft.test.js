#!/usr/bin/env node
/**
 * validate-b4-draft.test.js — poison test for tools/validate-b4-draft.js.
 *
 * Control: a draft DERIVED FROM THE EN SOURCES (spec i18n, en skill sentences, en
 * topicMeta, en taxonomy slugs suffixed, every en bank block) labelled `de` PASSES the
 * shape rules (--no-probe). Then ONE corruption per rule must FAIL. Finally the build
 * probe is proven to FIRE: the same EN blocks under `de` refuse (de approved-words,
 * de-only bank rules), and every refusal must surface as "not declared under refusals".
 * (The probe's pass direction is the en generation itself — 117/117 decks built.)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const ROOT = path.join(WG, '..', '..');
const { validate, ALL_IDS, KEYS, bankName } = require('./validate-b4-draft.js');
const { loadAllTypes } = require('../lib/load-types.js');
const { bankModule } = require('../lib/b4-common.js');

function enDraft(loc) {
  const specs = new Map(loadAllTypes().map((s) => [s.id, s]));
  const skills = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', 'skill-sentences.en.json'), 'utf8'));
  const msgs = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'messages', 'en.json'), 'utf8'));
  const tax = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
  const d = { locale: loc, types: {}, families: {}, skills: {}, topicMeta: {}, banks: {}, refusals: {}, enAudit: ['(test draft — EN copied verbatim)'] };
  for (const id of ALL_IDS) { const s = specs.get(id); d.types[id] = { title: s.i18n.en.title, instruction: s.i18n.en.instruction || 'Do the task.' }; }
  for (const k of KEYS) {
    d.families[k] = { slug: tax.axes['exercise-type'][k].slug.en + '-' + loc + 'test', name: tax.axes['exercise-type'][k].name.en };
    d.skills[k] = skills[k];
    d.topicMeta[k] = msgs.topicMeta[k];
    d.banks[bankName(k)] = JSON.parse(JSON.stringify(bankModule(bankName(k)).en));
  }
  return d;
}

let pass = 0, fail = 0;
function expectPass(name, errs) { if (errs.length === 0) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + ' — ' + errs.slice(0, 3).join(' | ')); } }
function expectFail(name, errs, re) { const hit = errs.some((e) => re.test(e)); if (hit) { pass++; console.log('  ok   ' + name + ' → fires'); } else { fail++; console.log('  FAIL ' + name + ' — did not fire (' + errs.length + ' errs: ' + errs.slice(0, 2).join(' | ') + ')'); } }

const loc = 'de';
const base = enDraft(loc);
const opts = { noProbe: true, existingStrings: {} };
expectPass('EN-derived draft passes the shape rules', validate(loc, base, opts));

const P = (mut) => { const d = JSON.parse(JSON.stringify(base)); mut(d); return validate(loc, d, opts); };
expectFail('missing type', P((d) => { delete d.types['K-353']; }), /types.K-353 missing/);
expectFail('type present but refused', P((d) => { d.refusals['K-353'] = 'the panel refuses this face for a reason'; }), /present but K-353 is declared refused/);
expectFail('refusal without reason', P((d) => { delete d.types['K-353']; d.refusals['K-353'] = 'no'; }), /needs a reason/);
expectFail('title > 70', P((d) => { d.types['K-353'].title = 'x'.repeat(71); }), /title is 71 chars/);
expectFail('worksheet-word in title', P((d) => { d.types['K-353'].title = 'Arbeitsblatt Buchstabe M'; }), /worksheet-word/);
expectFail('free claim in title', P((d) => { d.types['K-353'].title = 'Kostenlose Buchstaben'; }), /claims free/);
expectFail('soft hyphen', P((d) => { d.types['K-353'].title = 'Buch­stabe'; }), /soft hyphen/);
expectFail('instruction > 150', P((d) => { d.types['K-353'].instruction = 'a'.repeat(151) + '.'; }), /instruction is 152 chars/);
expectFail('instruction without end mark', P((d) => { d.types['K-353'].instruction = 'Male den Buchstaben an'; }), /does not end in a mark/);
expectFail('band title collision within draft', P((d) => { d.types['K-354'].title = d.types['K-353'].title; }), /repeats .* within band K/);
expectFail('band title collision with existing', validate(loc, base, { ...opts, existingStrings: { 'K-001': { title: base.types['K-353'].title } } }), /repeats K-001/);
expectFail('bad family slug', P((d) => { d.families['tangram'].slug = 'Gefühle'; }), /not ASCII kebab/);
expectFail('slug taken in taxonomy', P((d) => { d.families['tangram'].slug = 'addition'; }), /already belongs to/);
expectFail('slug repeats in draft', P((d) => { d.families['tangram'].slug = d.families['human-body'].slug; }), /repeats within the draft/);
expectFail('free claim in family name (rail = visible)', P((d) => { d.families['tangram'].name = 'Gefühle kostenlos'; }), /families.tangram.name claims free/);
expectFail('skill full too short', P((d) => { d.skills['tangram'].full = 'zu kurz'; }), /skills.tangram.full is/);
expectFail('topicMeta too short', P((d) => { d.topicMeta['tangram'] = 'kurz'; }), /topicMeta.tangram is/);
expectFail('missing bank', P((d) => { delete d.banks['cloze']; }), /banks.cloze missing/);
expectFail('unknown bank', P((d) => { d.banks['nope'] = {}; }), /unknown bank "nope"/);
expectFail('enAudit not an array', P((d) => { d.enAudit = 'clean'; }), /enAudit must be an array/);
expectFail('unknown refusal id', P((d) => { d.refusals['K-999'] = 'this id does not exist at all'; }), /unknown id K-999/);

// the build probe FIRES: EN blocks under de refuse somewhere, and every refusal is undeclared
{
  const errs = validate(loc, base, { existingStrings: {} });
  expectFail('build probe fires on undeclared refusals', errs, /build probe: .* REFUSES in de and is not declared/);
  const n = errs.filter((e) => /build probe:/.test(e)).length;
  console.log('       (' + n + ' undeclared refusals surfaced under de with EN blocks)');
  // and declaring one of them silences exactly that one
  const first = (errs.find((e) => /build probe: (\S+) REFUSES/.test(e)) || '').match(/build probe: (\S+) REFUSES/);
  if (first) {
    const d = JSON.parse(JSON.stringify(base)); delete d.types[first[1]]; d.refusals[first[1]] = 'declared for the test: the EN block cannot serve de';
    const e2 = validate(loc, d, { existingStrings: {} });
    const still = e2.some((e) => e.includes('build probe: ' + first[1] + ' REFUSES'));
    if (!still) { pass++; console.log('  ok   declaring ' + first[1] + ' silences its probe error'); } else { fail++; console.log('  FAIL declaration of ' + first[1] + ' not honoured'); }
  }
}
console.log(`validate-b4-draft.test: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
