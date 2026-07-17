#!/usr/bin/env node
/* =====================================================================
   verify-vocab-diff.js — THE GATE THAT NEVER EXISTED.

   Five prior vocabulary commits (c7de1a40 nl-66, 7aa69cde de-51,
   51a0d957 no-121, + the sv/da waves — ~378 corrections total) each
   CLAIMED, in their commit body:

       "exactly 66 lines changed, nl-array only,
        all 10 other locales byte-identical"

   ...and NOT ONE of them ran a script that asserted it. The claim was
   produced by the same process it was meant to check. This asserts it.

   WHAT IT MEASURES (all of it, or it is worthless):
     1. EXACT COUNT     — exactly N keys changed, no more, no fewer
     2. LOCALE SCOPE    — only locale L's array was touched
     3. FIELD SCOPE     — only field F (singular|plural|gender) moved
     4. COLLATERAL      — every other (key, locale) is BYTE-identical
     5. NO ADD/DROP     — the key set is unchanged (the builder deletes
                          17 keys; a hand-edit must never)
     6. SHAPE           — en/fi stay 2-element, the other 9 stay 3
     7. GENDER LEGALITY — per §A.13.58 PER-LOCALE authority. NEVER the
                          stale table in frontend/scripts/audit-image-
                          vocabulary-gender.js, which declares nl:['d','n']
                          and would falsely flag all 78 shipped NL keys.

   Baseline = git HEAD (or --ref). Compares against the working tree.

   USAGE
     node scripts/vocab-audit/verify-vocab-diff.js --locale=de --field=plural --expect=37
     node scripts/vocab-audit/verify-vocab-diff.js --locale=de --field=plural --expect=37 --show
     node scripts/vocab-audit/verify-vocab-diff.js --self-test     ← mutation proof

   READ-ONLY.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..');
const REL = 'REFERENCE TRANSLATIONS/image-vocabulary.js';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const FIELDS = { singular: 0, plural: 1, gender: 2 };

/* §A.13.58 per-locale gender authority. NEVER cross-apply a code:
   sv/da `n` = COMMON (en/et-ord) while no `n` = NEUTER; nl uses d/h.
   `no` legally admits `f` (bokmål: ei jente) though the data holds none —
   legality is about what the language allows, not what the file contains. */
const LEGAL_GENDERS = {
  de: ['m', 'f', 'n'], fr: ['m', 'f'], it: ['m', 'f'], es: ['m', 'f'], pt: ['m', 'f'],
  nl: ['d', 'h'], sv: ['n', 't'], da: ['n', 't'], no: ['m', 'f', 'n'],
};
const ARITY = { en: 2, fi: 2, de: 3, fr: 3, it: 3, es: 3, pt: 3, nl: 3, sv: 3, da: 3, no: 3 };

function evalVocab(src, label) {
  const sb = { window: {} };
  sb.global = sb;
  vm.createContext(sb);
  try { vm.runInContext(src + '\n;globalThis.__V = IMAGE_VOCABULARY;', sb); }
  catch (e) { throw new Error(label + ': eval failed — ' + e.message); }
  if (!sb.__V) throw new Error(label + ': IMAGE_VOCABULARY not found');
  return sb.__V;
}
function baselineSrc(ref) {
  return execFileSync('git', ['show', ref + ':' + REL], { cwd: REPO, maxBuffer: 64 * 1024 * 1024, encoding: 'utf8' });
}

/* ---- the comparison. Returns every per-(key,locale,field) change. ---- */
function diff(base, cur) {
  const errors = [];
  const changes = [];                       /* {key, loc, field, from, to} */
  const bKeys = Object.keys(base), cKeys = Object.keys(cur);
  const bSet = new Set(bKeys), cSet = new Set(cKeys);

  /* 5. no add/drop */
  const added = cKeys.filter((k) => !bSet.has(k));
  const dropped = bKeys.filter((k) => !cSet.has(k));
  for (const k of added) errors.push('KEY ADDED: ' + k);
  for (const k of dropped) errors.push('KEY DROPPED: ' + k + '  (the builder deletes 17 keys — a hand-edit must never)');

  for (const k of cKeys) {
    if (!bSet.has(k)) continue;
    for (const l of LOCALES) {
      const b = base[k][l], c = cur[k][l];
      if (!b || !c) { errors.push('SHAPE ' + k + '.' + l + ': locale missing'); continue; }
      /* 6. arity */
      if (c.length !== ARITY[l]) errors.push('SHAPE ' + k + '.' + l + ': arity ' + c.length + ' ≠ ' + ARITY[l]);
      const n = Math.max(b.length, c.length);
      for (let i = 0; i < n; i++) {
        if (b[i] !== c[i]) changes.push({ key: k, loc: l, field: i, from: b[i], to: c[i] });
      }
    }
  }
  return { errors, changes };
}

/* 7. gender legality — over the CURRENT file, per-locale authority */
function genderLegality(cur) {
  const errors = [];
  for (const k of Object.keys(cur)) {
    for (const l of Object.keys(LEGAL_GENDERS)) {
      const e = cur[k][l];
      if (!e || e.length < 3) continue;
      if (LEGAL_GENDERS[l].indexOf(e[2]) < 0) {
        errors.push('GENDER ' + k + '.' + l + ': "' + e[2] + '" not in [' + LEGAL_GENDERS[l].join(',') + ']' +
          (l === 'nl' ? '  (nl is d/h — NOT m/f/n)' : (l === 'sv' || l === 'da' ? '  (' + l + ' n=COMMON, t=neuter)' : '')));
      }
    }
  }
  return errors;
}

function run(opts) {
  const errors = [];
  const base = evalVocab(baselineSrc(opts.ref), 'baseline(' + opts.ref + ')');
  const cur = evalVocab(fs.readFileSync(path.join(REPO, REL), 'utf8'), 'working tree');

  const d = diff(base, cur);
  errors.push(...d.errors);
  errors.push(...genderLegality(cur));

  const wantField = FIELDS[opts.field];
  const touchedKeys = new Set(d.changes.map((c) => c.key));

  /* 2. locale scope + 3. field scope + 4. collateral */
  for (const c of d.changes) {
    if (c.loc !== opts.locale) {
      errors.push('COLLATERAL ' + c.key + '.' + c.loc + '[' + c.field + ']: "' + c.from + '" → "' + c.to +
        '"  (this wave is ' + opts.locale + '-only — every other locale must be BYTE-identical)');
    } else if (c.field !== wantField) {
      errors.push('FIELD-SCOPE ' + c.key + '.' + c.loc + '[' + c.field + ']: "' + c.from + '" → "' + c.to +
        '"  (this wave is ' + opts.field + '-only)');
    }
  }

  /* 1. exact count */
  if (opts.expect !== null && touchedKeys.size !== opts.expect) {
    errors.push('COUNT: ' + touchedKeys.size + ' keys changed, expected exactly ' + opts.expect);
  }

  const inScope = d.changes.filter((c) => c.loc === opts.locale && c.field === wantField);
  if (opts.show) {
    for (const c of inScope) console.log('   ' + c.key.padEnd(22) + '"' + c.from + '" → "' + c.to + '"');
  }

  const ok = errors.length === 0;
  console.log((ok ? 'PASS' : 'FAIL') + '  vocab-diff  [' + opts.locale + '.' + opts.field + ']  ' +
    touchedKeys.size + ' keys / ' + inScope.length + ' in-scope changes / ' + d.changes.length + ' total  ' +
    Object.keys(cur).length + ' keys intact');
  for (const e of errors.slice(0, 25)) console.log('   ERROR ' + e);
  if (errors.length > 25) console.log('   … +' + (errors.length - 25) + ' more');
  return ok;
}

/* =====================================================================
   --self-test: the mutation proof. A gate is worth exactly what it
   BITES. Each case injects one defect into an in-memory copy and
   asserts the corresponding check fires. Green is not proof.
   ===================================================================== */
function selfTest() {
  const src = fs.readFileSync(path.join(REPO, REL), 'utf8');
  const base = evalVocab(src, 'base');
  const clone = () => JSON.parse(JSON.stringify(base));
  let pass = 0, fail = 0;
  const t = (name, mutate, expectSubstr) => {
    const cur = clone();
    mutate(cur);
    const d = diff(base, cur);
    const g = genderLegality(cur);
    const all = [...d.errors, ...g,
      ...d.changes.filter((c) => c.loc !== 'de').map((c) => 'COLLATERAL ' + c.key + '.' + c.loc),
      ...d.changes.filter((c) => c.loc === 'de' && c.field !== 1).map((c) => 'FIELD-SCOPE ' + c.key)];
    const bit = all.some((e) => e.includes(expectSubstr));
    console.log('   ' + (bit ? '✓ bites' : '✗ BLIND') + '  ' + name);
    bit ? pass++ : fail++;
  };

  console.log('mutation proof (each injects ONE defect; the gate must bite):');
  t('a dropped key (the builder deletes 17)', (v) => { delete v.cat; }, 'KEY DROPPED');
  t('an added key', (v) => { v.__ghost = JSON.parse(JSON.stringify(v.cat)); }, 'KEY ADDED');
  t('collateral damage in another locale', (v) => { v.cat.fr[1] = 'Chatz'; }, 'COLLATERAL');
  t('wrong field moved (gender, not plural)', (v) => { v.cat.de[2] = 'm'; }, 'FIELD-SCOPE');
  t('illegal nl gender (m/f/n cross-applied — nl is d/h)', (v) => { v.cat.nl[2] = 'n'; }, 'GENDER');
  t('illegal sv gender (sv is n/t)', (v) => { v.cat.sv[2] = 'm'; }, 'GENDER');
  t('broken arity (a 3rd element on en)', (v) => { v.cat.en.push('m'); }, 'arity');
  t('arity stripped from de', (v) => { v.cat.de = [v.cat.de[0], v.cat.de[1]]; }, 'arity');

  /* the NEGATIVE control — an in-scope de plural fix must NOT trip
     collateral/field/gender/shape. A gate that fires on everything is
     as useless as one that fires on nothing. */
  const cur = clone();
  cur.cheese.de[1] = 'Käse';
  const d = diff(base, cur), g = genderLegality(cur);
  const spurious = [...d.errors, ...g,
    ...d.changes.filter((c) => c.loc !== 'de' || c.field !== 1).map((c) => 'OUT-OF-SCOPE ' + c.key + '.' + c.loc)];
  const clean = spurious.length === 0 && d.changes.length === 1;
  console.log('   ' + (clean ? '✓ quiet' : '✗ FALSE POSITIVE') + '  negative control: a legitimate de plural fix passes clean');
  clean ? pass++ : fail++;
  if (!clean) for (const s of spurious.slice(0, 5)) console.log('        spurious: ' + s);

  console.log('\n' + (fail ? 'FAIL' : 'PASS') + '  ' + pass + ' proven, ' + fail + ' blind');
  return fail === 0;
}

function main() {
  const argv = process.argv.slice(2);
  const get = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
  if (argv.includes('--self-test')) process.exit(selfTest() ? 0 : 1);

  const opts = {
    locale: get('locale', null),
    field: get('field', 'plural'),
    expect: get('expect', null) === null ? null : parseInt(get('expect'), 10),
    ref: get('ref', 'HEAD'),
    show: argv.includes('--show'),
  };
  if (!opts.locale || LOCALES.indexOf(opts.locale) < 0) { console.error('FAIL: --locale=<' + LOCALES.join('|') + '> required'); process.exit(1); }
  if (!(opts.field in FIELDS)) { console.error('FAIL: --field=<singular|plural|gender>'); process.exit(1); }
  process.exit(run(opts) ? 0 : 1);
}

main();
