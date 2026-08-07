#!/usr/bin/env node
/* =====================================================================
   apply-home-language-bridge-locales.js — write the Say It Board's
   authored words from the SoT into the tool.
   ---------------------------------------------------------------------
   Run:  node scripts/apply-home-language-bridge-locales.js [--dry-run]
                                                           [--brief]
                                                           [--self-test]

   Rewrites the `strings`, `STARTER_TEXT` and `PHRASES` blocks in
   `mini tools/home-language-bridge.js` from
   `scripts/_home-language-bridge-strings.js`. Idempotent: running it
   twice changes nothing the second time.

   --brief      print the native-panel work list instead of writing
   --self-test  run every ban in BOTH directions and write nothing
   --dry-run    report what would change and write nothing

   ⚠⚠ THIS SCRIPT IS THE THING THE v2 BUILD SAID IT HAD AND DID NOT.
   Its docblock named `apply-home-language-bridge-fanout.js` as the
   mechanism that corrected the ten non-English sets from native
   ensembles. That file never existed anywhere in the repository, so
   the ten shipped as machine drafts — in the one register in the whole
   product where the CHILD is the speaker.

   IT REFUSES TO WRITE rather than ship a defect:
     · a missing or empty key in any of the eleven
     · a key present in one locale and absent in another
     · a non-EN string identical to the English (an untranslated leak),
       except for the explicit list of keys that are legitimately
       identical in some languages ("Ja" is "Ja" in four of them)
     · a placeholder present in en and lost elsewhere, or invented
     · a straight apostrophe
     · a VERDICT, a SCORE, a LEVEL or any assessment vocabulary — this
       board measures nothing about the newcomer, ever
     · A FLAG codepoint. A flag is a country, not a language.
     · AN ADULT-VOICE IMPERATIVE where a child's request belongs. The
       whole moat is the grammatical person.

   ⭐⭐ EVERY BAN IS POISON-TESTED IN BOTH DIRECTIONS, and that is not
   ceremony. This programme has recorded five separate occasions where a
   newly written ban condemned CORRECT NATIVE PROSE — `Zufallsbeutel`
   rejected for containing the German word for chance, `par` rejected as
   French, "how many cubes TALL" rejected by a height ban, `dessinée en
   volume` rejected by a volume ban, `banan` (the Swedish definite of
   "track") nearly shipping as "the banana". A ban that rejects correct
   writing does not protect the product; it teaches the next panel to
   write around the checker instead of reporting it. So each rule below
   carries a MUST_FIRE example AND a MUST_PASS example, and --self-test
   runs them.

   ⚠ `\b` IS ASCII-ONLY, which is the mistake that makes a ban in a
   non-English language born dead: `\bvessa\b` cannot match the Finnish
   inflections a child actually says, and `\barea\b` misses Swedish
   `arean`. Every word ban below uses (?<!\p{L}) … (?!\p{L}).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'home-language-bridge.js');
const SOT = require('./_home-language-bridge-strings.js');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.indexOf('--dry-run') >= 0;
const BRIEF = process.argv.indexOf('--brief') >= 0;
const SELFTEST = process.argv.indexOf('--self-test') >= 0;

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  REFUSE ' + m); };

/* ---------------------------------------------------------------------
   THE BANS. Each is [name, regex, mustFire, mustPass].
   `mustPass` is the load-bearing half: it is a string that is CORRECT
   native prose and must survive the ban.
   ------------------------------------------------------------------- */
const W = (s) => new RegExp('(?<!\\p{L})(?:' + s + ')(?!\\p{L})', 'iu');

const BANS = [
  ['a straight apostrophe', /'/,
   "I don't understand", 'I don’t understand'],

  /* ⚠ NARROW ON PURPOSE. An earlier draft banned the word "level"
     outright, which would have condemned "Ich bin auf gleicher Höhe"
     and every legitimate use of `nivå` in Swedish prose about a water
     level. The ban is on assessment vocabulary APPLIED TO A CHILD, so
     it targets the scoring nouns rather than the ordinary words. */
  ['assessment vocabulary', W('score|scores|punkte|poäng|poeng|pisteet|proficiency|proficiencia|proficiente|attainment'),
   'Your score today', 'Ich brauche meine Medizin'],

  ['a verdict', W('wrong|incorrect|falsch|fehlerhaft|erreur|sbagliato|incorrecto|errado|fout|felaktig|forkert|feilaktig|väärin'),
   'That answer is wrong', 'Ich verstehe das nicht'],

  /* a flag is a country, not a language, and Spanish is not Spain to a
     Mexican child */
  ['a flag codepoint', /[\u{1F1E6}-\u{1F1FF}]/u,
   'Deutsch \u{1F1E9}\u{1F1EA}', 'Deutsch'],

  /* ⚠ THE REGISTER BAN, and the one most likely to be too wide. It
     targets the SECOND-PERSON IMPERATIVES an adult says TO a child —
     sit down, be quiet, line up — never a child's own request. The
     must-pass cases are real strings from this very file that a
     careless version of this ban would have killed. */
  ['an adult-voice command', W('sit down|be quiet|line up|setz dich|sei leise|assieds-toi|tais-toi|siéntate|cállate|senta-se|ga zitten|wees stil|sitt ner|var tyst|sæt dig|sett deg|istu alas'),
   'Sit down and be quiet', 'Can I sit here?'],

  ['a compliance promise in the child’s mouth', W('i will be good|i will be quiet|i will sit still|ich bin brav|je serai sage|seré bueno|serei bom|ik zal braaf zijn'),
   'I will be good', 'I want to try'],

  /* naming another child, spoken aloud by a device, is an allegation */
  /* ⚠⚠ INFLECTED FORMS AND VERBS, NOT DICTIONARY NOUNS. The Nordic
     panel found this table policing the TRANSLATION rather than the
     language: Norwegian `uhell` was absent, Swedish `olycka` and
     `missöde` were absent entirely, Danish is `mobning` not `mobbing`
     — and every bullying entry was a NOUN while the sentence a native
     actually writes uses the VERB (`Någon mobbar mig`, `Nogen mobber
     mig`, `Joku kiusaa minua`), so all three sailed through.
     The bans were written in English and translated, which is the
     ``-is-ASCII-only trap in a new dress: a citation form is
     inflection-only. */
  /* ⚠ `\\w` — DOUBLED, because this is a JS STRING passed to the RegExp
     constructor, and a single `\w` inside a single-quoted literal is
     just the letter w. The first version of this fix shipped `mobbw*`
     and the self-test caught it as BORN DEAD, which is the whole reason
     every ban carries a must-fire example. */
  ['bullying, which has a threshold and a procedure',
   W('bullying|bullied|mobb\\w*|mobn\\w*|harcèlement|harcel\\w*|acoso|acosa\\w*|bullismo|pesten|pest\\w*|kiusaa\\w*'),
   'Nogen mobber mig', 'Someone is being mean to me'],

  ['a blame word on a body card',
   W('accident|unfall|accidente|incidente|ongelukje|uheld|uhell|olyck\\w*|missöde|vahinko|vahingo\\w*'),
   'Jeg har hatt et uhell', 'I need dry clothes'],

  /* ⚠ the Finnish a teacher actually says, not a calque of "sit down" */
  ['an adult-voice command, in the forms a native writes',
   W('ole hiljaa|olkaa hiljaa|istukaa|vær stille|var tyst|vær stille|wees stil'),
   'Ole hiljaa', 'Tarvitsen apua']
];

function selfTest() {
  let bad = 0;
  console.log('[self-test — every ban, in both directions]');
  BANS.forEach(([name, re, mustFire, mustPass]) => {
    const fires = re.test(mustFire);
    const passes = !re.test(mustPass);
    if (!fires) { bad++; console.error(`  BROKEN  "${name}" does NOT fire on ${JSON.stringify(mustFire)} — it is born dead`); }
    if (!passes) { bad++; console.error(`  TOO WIDE "${name}" condemns ${JSON.stringify(mustPass)}, which is correct writing`); }
    if (fires && passes) console.log(`  ok      ${name}`);
  });
  console.log('');
  console.log(bad ? `SELF-TEST FAILED — ${bad} problem(s)` : `SELF-TEST PASSED — ${BANS.length} bans, both directions`);
  return bad === 0;
}

if (SELFTEST) { process.exit(selfTest() ? 0 : 1); }

/* ⚠ THE SELF-TEST RUNS BEFORE EVERY WRITE, NOT ONLY ON DEMAND. A ban
   that has silently stopped firing would otherwise wave through exactly
   the defect it was written for. */
if (!BRIEF && !selfTest()) {
  console.error('\nRefusing to write: the bans themselves do not pass.');
  process.exit(1);
}
if (!BRIEF) console.log('');

/* ---------------------------------------------------------------------
   Keys that are legitimately identical across some locales. Without
   this list the untranslated-leak check condemns correct writing —
   "Ja" really is "Ja" in German, Dutch, Swedish and Danish.
   ------------------------------------------------------------------- */
/* ⚠ AN AUDITABLE LIST WITH A REASON EACH, NEVER A LOOSENED CHECK. On
   its first real run this rule condemned four strings, and ALL FOUR
   WERE CORRECT NATIVE PROSE — the ban-too-wide trap for the sixth
   recorded time in this programme. The temptation is to soften the
   comparison; the discipline is to name the exceptions. */
const IDENTICAL_OK = {
  yes:        ['de', 'nl', 'sv', 'da'],   /* "Ja" in all four */
  no:         ['it', 'es', 'nl'],         /* Italian, Spanish and Dutch all write "No" */
  hello:      ['de', 'nl'],               /* "Hallo" */
  stop:       ['nl', 'da', 'fr'],         /* "Stop" — and fr joined the list
                                             on the panel's ruling: French
                                             schools say "Stop !", it is
                                             register-neutral where the
                                             tutoiement of "Arrête" is not,
                                             and it is understood by every
                                             child in the room. */
  sorry:      ['nl'],                     /* Dutch has borrowed it wholesale */
  iconRecent: ['nl'],                     /* Dutch UI convention really is "Recent" */
  printName:  ['de'],                     /* "Name" is German for name */
  maybe:      [], thanks: []
};

function checkTable(label, table, isPhrase) {
  const keys = Object.keys(table);
  if (!keys.length) { err(`${label} is EMPTY — refusing to write nothing over a live table`); return; }
  keys.forEach((k) => {
    const en = table[k].en;
    if (!en) { err(`${label}.${k} has no English`); return; }
    const enPh = (en.match(/\{[a-z]+\}/g) || []).sort().join(',');
    ALL.forEach((loc) => {
      const v = table[k][loc];
      if (!v) { err(`${label}.${k}.${loc} is missing`); return; }
      if ((v.match(/\{[a-z]+\}/g) || []).sort().join(',') !== enPh) {
        err(`${label}.${k}.${loc} placeholder parity (en has ${enPh || 'none'})`);
      }
      BANS.forEach(([name, re]) => {
        if (re.test(v)) err(`${label}.${k}.${loc} contains ${name}: ${JSON.stringify(v)}`);
      });
      if (loc !== 'en' && v === en) {
        const ok = (IDENTICAL_OK[k] || []).indexOf(loc) >= 0;
        if (!ok) err(`${label}.${k}.${loc} is identical to the English — an untranslated leak`);
      }
    });
    if (isPhrase) {
      /* ⚠ within a locale two phrases must not read the same, or the
         child cannot tell the two buttons apart */
      ALL.forEach((loc) => {
        const same = keys.filter((q) => table[q][loc] === table[k][loc]);
        if (same.length > 1) err(`${label} ${loc}: ${JSON.stringify(table[k][loc])} is used by ${same.length} phrases (${same.join(', ')})`);
      });
    }
  });
}

if (BRIEF) {
  const pending = ALL.filter((l) => !SOT.REVIEWED[l]);
  console.log('NATIVE-PANEL WORK LIST — Say It Board');
  console.log('');
  console.log(`  reviewed : ${ALL.filter((l) => SOT.REVIEWED[l]).join(', ') || '(none)'}`);
  console.log(`  pending  : ${pending.join(', ') || '(none)'}`);
  console.log('');
  console.log(`  ${Object.keys(SOT.PHRASES).length} phrases + ${Object.keys(SOT.STRINGS).length} chrome strings`);
  console.log(`  + ${Object.keys(SOT.STARTER_TEXT).length} sentence starters`);
  console.log(`  = ${(Object.keys(SOT.PHRASES).length + Object.keys(SOT.STRINGS).length + Object.keys(SOT.STARTER_TEXT).length) * pending.length} utterances awaiting a native panel`);
  console.log('');
  console.log('  Hand each panel the ENGLISH AS A SOURCE TO AUDIT, not as a target.');
  console.log('  On the last seven tools every panel found defects in the English that');
  console.log('  the other ten locales were being built from.');
  process.exit(0);
}

console.log('[checking the source of truth]');
checkTable('strings', SOT.STRINGS, false);
checkTable('starter', SOT.STARTER_TEXT, false);
checkTable('example', SOT.STARTER_EG, false);
checkTable('phrase', SOT.PHRASES, true);

if (ERRORS) {
  console.error('');
  console.error(`REFUSED — ${ERRORS} problem(s). Nothing was written.`);
  process.exit(1);
}
console.log(`  ok (${Object.keys(SOT.STRINGS).length} strings, ${Object.keys(SOT.STARTER_TEXT).length} starters + examples, ${Object.keys(SOT.PHRASES).length} phrases x ${ALL.length} locales)`);

/* ---------------------------------------------------------------------
   Emit. ONE PHYSICAL LINE PER KEY — the house convention, and what lets
   this script rewrite the block line-wise next time.
   ------------------------------------------------------------------- */
function emit(varName, table, indent) {
  const pad = ' '.repeat(indent);
  const keys = Object.keys(table);
  const width = Math.max.apply(null, keys.map((k) => (/^[a-z][a-zA-Z0-9]*$/.test(k) ? k.length : k.length + 2)));
  const lines = keys.map((k) => {
    const key = /^[a-z][a-zA-Z0-9]*$/.test(k) ? k : "'" + k + "'";
    const body = ALL.map((l) => l + ':' + JSON.stringify(table[k][l])).join(',');
    return pad + '  ' + key + ':' + ' '.repeat(Math.max(1, width - key.length + 1)) + '{' + body + '}';
  });
  /* ⚠ THE `var` IS PART OF THE BLOCK. Emitting only `NAME = {…}` and
     replacing the declaration line with it left the tool referencing an
     undeclared identifier — the file parsed and then threw at load. */
  return pad + 'var ' + varName + ' = {\n' + lines.join(',\n') + '\n' + pad + '};';
}

let src = fs.readFileSync(TOOL, 'utf8');
let wrote = 0;

/* ⚠ EACH BLOCK IS WRITTEN SEPARATELY AND EACH MUST FIND ITS ANCHOR. A
   single combined replace that silently matched nothing would report
   success having written one table out of four — the "a sync that
   silently matches nothing is worse than no sync, because it looks like
   agreement" defect. */
[['PHRASES', SOT.PHRASES], ['STRINGS', SOT.STRINGS], ['STARTER_TEXT', SOT.STARTER_TEXT], ['STARTER_EG', SOT.STARTER_EG]]
  .forEach(([name, table]) => {
    const block = emit(name, table, 2);
    const marker = new RegExp('  /\\* __HLB_' +
      (name === 'STARTER_TEXT' ? 'STARTERS' : name) + '__ \\*/');
    const existing = new RegExp('  var ' + name + ' = \\{\\};\\n  /\\* __HLB_[A-Z_]+__ \\*/|  var ' + name + ' = \\{[\\s\\S]*?\\n  \\};');
    /* ⚠ "NOTHING CHANGED" AND "ANCHOR MISSING" ARE DIFFERENT ANSWERS,
       and conflating them made this script refuse to run a second time
       on a file it had itself written correctly — an idempotent tool
       reporting drift because it had nothing left to do. Test for the
       anchor FIRST; only then compare. */
    const found = existing.test(src) || marker.test(src);
    if (!found) { err(`could not find the ${name} insertion point — the tool file has drifted`); return; }
    const had = src;
    src = existing.test(src) ? src.replace(existing, block) : src.replace(marker, block);
    if (src !== had) wrote++;
  });

const revBlock = '  var REVIEWED = {' + ALL.map((l) => l + ':' + (SOT.REVIEWED[l] ? 'true' : 'false')).join(',') + '};';
const revRe = /  var REVIEWED = \{\};\n  \/\* __HLB_REVIEWED__ \*\/|  var REVIEWED = \{[a-z:,truefals]*\};/;
if (revRe.test(src)) { src = src.replace(revRe, revBlock); wrote++; }
else err('could not find the REVIEWED insertion point');

if (ERRORS) { console.error(`\nREFUSED — ${ERRORS} problem(s). Nothing was written.`); process.exit(1); }

if (DRY) {
  console.log('');
  console.log(`  would rewrite ${wrote} block(s)`);
  console.log('  --dry-run: nothing written.');
  process.exit(0);
}

fs.writeFileSync(TOOL, src, 'utf8');
console.log('');
console.log(`  wrote ${path.relative(ROOT, TOOL)}`);
const pending = ALL.filter((l) => !SOT.REVIEWED[l]);
if (pending.length) {
  console.log('');
  console.log(`  ⚠ ${pending.length} locale(s) awaiting a native panel: ${pending.join(', ')}`);
  console.log('    Run with --brief for the work list.');
}
