#!/usr/bin/env node
/* =====================================================================
   verify-letter-comma-core.js — the MEASURED build-gate for "Pim's Comma Mail"
   (L.2.2.b). Drives the REAL letter-comma-core.js over the REAL manifest. The
   child taps the correctly-comma'd greeting/closing.

     • ORACLE (the form whose ok flag is set) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one ok; 3 distinct; kind valid; the correct
   form actually has a comma; childView never leaks `ok`. Plus a kind-MIX
   assertion (both greeting + closing present).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'letter-comma-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'pim-comma-mail-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.LetterCommaCore) throw new Error('core did not attach window.LetterCommaCore'); return win.LetterCommaCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

/* ⚠⚠ PER-LOCALE EXPECTED-MARK TABLE — the mark is NOT universal.
   The core's `facts().okHasComma` bakes in "the correct form ends with a comma", which is
   TRUE for en/de/fr and FALSE for Spanish: es greetings take DOS PUNTOS («Querida abuela:»)
   and RAE (Ortografía §3.4.3) states the comma there is «costumbre anglosajona, que debe
   evitarse». The es despedida DOES take a comma. So `okHasComma` measures the WRONG THING
   for es, and this gate used to read only `params.rounds` (EN) — es would have shipped
   UNGATED, and anyone later extending the loop would get FAILs and might "correct" the
   Spanish back to commas. Per §A.13.62 we fix WHAT is measured, never the threshold.
   🔒 DO NOT "fix" the Spanish to satisfy okHasComma. The Spanish is right.
   ⚠ `closing: null` means THIS LOCALE'S CLOSINGS CARRY NO MARK, so a closing round would
   have no correctly-punctuated form to pick → closings are UNTESTABLE and a greetings-only
   deck is CORRECT for that locale. That is why `kindMix` is not universal either: it
   presumes both kinds carry a testable mark. German's Gruß takes no comma („Viele Grüße"
   / „Dein Ben") — de's greetings-only shape was FORCED by German orthography, not chosen.
   The table drives BOTH assertions so neither is a threshold being loosened. */
const MARK = {
  en: { greeting: ',', closing: ',' },
  de: { greeting: ',', closing: null },  /* ⚠ German closings take NO mark → greetings-only is correct */
  fr: { greeting: ',', closing: ',' },
  es: { greeting: ':', closing: ',' },   /* ⚠ the saludo colon is the whole point of the es rebuild */
};

function checkDeck(Core, rounds, loc) {
  const tag = loc === 'en' ? '' : `[${loc}] `;
  const N = rounds.length || 1;
  F(rounds.length >= 8, `${tag}bank has ${rounds.length} rounds (need >=8)`);

  let oracleHits = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.kindValid, `${tag}${r.id}: kind "${r.kind}" not greeting/closing`);
    F(f.oneOk, `${tag}${r.id}: not exactly one ok form`);
    F(f.threeForms, `${tag}${r.id}: not 3 forms`);
    F(f.distinctTexts, `${tag}${r.id}: forms not distinct`);
    /* replaces the hard-coded okHasComma — the mark is per (locale, kind) */
    const want = (MARK[loc] || MARK.en)[r.kind];
    const ok = (r.forms || []).find((x) => x.ok);
    if (want === null) {
      fails.push(`${tag}${r.id}: this locale's ${r.kind}s carry NO mark → the round is untestable and must not exist`);
    } else {
      F(!!ok && String(ok.text).slice(-1) === want,
        `${tag}${r.id}: the correct ${r.kind} must end with "${want}" — got "${ok ? String(ok.text).slice(-1) : '(none)'}"`);
    }
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"ok"') < 0, `${tag}${r.id}: childView leaks the ok property`);
  });
  F(oracleHits === N, `${tag}oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  /* kindMix presumes BOTH kinds carry a testable mark — only require it where they do. */
  if ((MARK[loc] || MARK.en).closing !== null) {
    F(d.kindMix, `${tag}bank is not a mix of greeting + closing (greeting ${d.greeting} / closing ${d.closing})`);
  } else {
    F(d.closing === 0, `${tag}this locale's closings carry no mark, so the deck must be greetings-only — got ${d.closing} closing round(s)`);
  }
  F(d.positionBot <= CHANCE, `${tag}position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `${tag}longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `${tag}shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `${tag}fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);
  return d;
}

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  /* gate EVERY shipped locale, not just EN */
  const l10n = (manifest[0].params.roundsL10n) || {};
  Object.keys(l10n).forEach((loc) => {
    if (!MARK[loc]) { fails.push(`roundsL10n.${loc} has no entry in the MARK table — add its expected greeting/closing mark`); return; }
    checkDeck(Core, l10n[loc] || [], loc);
  });

  let oracleHits = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.kindValid, `${r.id}: kind "${r.kind}" not greeting/closing`);
    F(f.oneOk, `${r.id}: not exactly one ok form`);
    F(f.threeForms, `${r.id}: not 3 forms`);
    F(f.distinctTexts, `${r.id}: forms not distinct`);
    F(f.okHasComma, `${r.id}: the correct form has no comma`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"ok"') < 0, `${r.id}: childView leaks the ok property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  F(d.kindMix, `bank is not a mix of greeting + closing (greeting ${d.greeting} / closing ${d.closing})`);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds  (greeting ${d.greeting} / closing ${d.closing})`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-LETTER-COMMA FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-LETTER-COMMA PASSED — oracle 100%; one ok form + comma present + no ok-leak + kind-mix; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
