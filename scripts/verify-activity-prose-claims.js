#!/usr/bin/env node
/**
 * verify-activity-prose-claims.js
 *
 * Gates the ACTIVITY BODY PROSE against false price claims, in all 11 locales.
 *
 * WHY THIS EXISTS. `verify-activity-serp-copy.js` walks `page_title` + `page_intro` — the
 * search-results surface — and nothing walked the body. So when the "free" claim was removed
 * from the 939 landing meta fields, 1,261 body-prose strings and 88 `templates` strings kept
 * it, and nobody could have known: there was no gate. The claim is false because plays are
 * metered (frontend/lib/quota.ts: 10 per UTC day for anonymous visitors AND free accounts).
 *
 * TWO BANS, because the claim has two carriers:
 *
 *   1. THE PRICE WORD ITSELF — free / kostenlos / gratis / gratuit / grátis / ilmainen /
 *      maksuton / kostnadsfri / vederlagsfri, with inflections.
 *      ⚠ The first version of this list was TOO NARROW and reported 904 when the truth was
 *      939: German inflects (kostenlose/kostenloses) and Finnish uses `maksuton`, which is
 *      not a cognate of any of the other ten and survives a list built by eye.
 *
 *   2. THE CLAIM UNDER A DIFFERENT WORD — found by the German and Dutch native panels, not
 *      by any check: German "frei zugänglich" / "frei spielbar", Dutch "vrij toegankelijk" /
 *      "vrij om te spelen". A parent reads those as "costs nothing".
 *      ⚠⚠ AND THIS BAN MUST NOT BE WIDENED TO THE BARE WORD. German "freies Erzählen" is a
 *      literacy term and "kein Fleckchen Erde bleibt frei" means no soil is left EMPTY —
 *      note that the second is `bleibt` + `frei`, a copula plus the word, which is the very
 *      shape the price claims use. No mechanical rule separates them; only the collocation
 *      is safe to ban. Dutch "vrij van stress" and "het vrije plekje" are the same trap.
 *      A ban that condemns correct native prose teaches an author to word around it instead
 *      of reporting it, so both directions are poison-tested on every run.
 *
 * NOT BANNED, deliberately: "no sign-up / ohne Anmeldung / sans inscription / sin registro /
 * zonder inloggen" is TRUE — anonymous visitors really can play — and the native panels
 * confirmed it survives intact in every locale. Swapping one false claim for another was the
 * trap here. Also not banned: "try again as many times as you like", which every panel
 * checked and found bounded in its own sentence by "there is no timer and no score" — it
 * promises retries within a task, not unmetered access. ⚠ If a future edit strips that
 * bounding clause the bare promise becomes false, so it is listed in NOTES below.
 *
 * Usage:  node scripts/verify-activity-prose-claims.js
 * Exit 0 = clean. Exit 1 = a claim is back, or a poison case failed.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'messages', 'activity-content');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* (?<!\p{L})...(?!\p{L}) rather than \b — \b is ASCII-only and cannot police an accented or
   agglutinated language. A ban tested only on English is tested in the one language where
   \b happens to work.
   ⚠ \w IS ASCII-ONLY TOO, and that is the subtler half. The first version of this file wrote
   `käytettäv\w*`, which cannot match `käytettävissä`: \w* stops at the `ä`, and the trailing
   (?!\p{L}) then sees a letter and refuses. The ban was born dead for the exact language it
   was written for. Its own must-fire poison caught it on the first run — which is the whole
   argument for poisoning in both directions rather than trusting a clean report. Use \p{L}. */
const PRICE = new RegExp(
  '(?<!\\p{L})(' +
  'free|' +
  'kostenlos\\p{L}*|kostenfrei\\p{L}*|umsonst|' +
  'gratis|gratuit\\p{L}*|grátis|' +
  'ilmais\\p{L}*|ilmain\\p{L}*|maksuton\\p{L}*|maksutta|veloitukse\\p{L}*|' +
  'kostnadsfri\\p{L}*|vederlagsfri\\p{L}*|kosteloos|kosteloze' +
  ')(?!\\p{L})', 'iu');

/* collocations only — see the warning above about the bare words */
const CARRIER = new RegExp(
  '(?<!\\p{L})(' +
  'frei\\s+(?:zugänglich|spielbar|nutzbar|für\\s+alle)|' +
  'vrij\\s+(?:toegankelijk|om\\s+te\\s+spelen)|' +
  'vapaasti\\s+käytettäv\\p{L}*|' +
  'fritt\\s+tillgänglig\\p{L}*|fritt\\s+tilgjengelig\\p{L}*|frit\\s+tilgængelig\\p{L}*|' +
  'sin\\s+costo|de\\s+balde|no\\s+cuesta\\s+nada|' +
  'sem\\s+custo|a\\s+custo\\s+zero|' +
  'senza\\s+costi|a\\s+costo\\s+zero|' +
  'sans\\s+frais|à\\s+titre\\s+gracieux|' +
  'at\\s+no\\s+cost|free\\s+of\\s+charge|costs\\s+nothing' +
  ')(?!\\p{L})', 'iu');

/* ratchet: may only ever shrink. An entry here is a known, accepted gap — never add one to
   make a build pass. */
const KNOWN_GAPS = new Set([]);

/* ---- poison, BOTH directions, on every run ------------------------------------------- */
const MUST_FIRE = [
  ['en', 'This is a free, interactive counting activity.'],
  ['de', 'Dies ist eine kostenlose, interaktive Zähl-Aktivität.'],
  ['de', 'Die Aktivität ist frei zugänglich und ganz ohne Druck.'],
  ['de', 'Dieses Spiel ist frei spielbar.'],
  ['fr', 'Une activité gratuite et interactive pour le CP.'],
  ['es', 'Esta actividad es gratis y sin registro.'],
  ['pt', 'A atividade é gratuita e interativa.'],
  ['it', 'È completamente gratuita, senza registrazione.'],
  ['nl', 'Het spel is gratis, zonder inloggen.'],
  ['nl', 'Deze activiteit is helemaal vrij om te spelen.'],
  ['nl', 'Alles is vrij toegankelijk voor iedereen.'],
  ['sv', 'Gratis interaktiv aktivitet som följer Lgr22.'],
  ['da', 'Dette er en gratis, interaktiv tælleaktivitet.'],
  ['no', 'Dette er en gratis, interaktiv telleaktivitet.'],
  /* the Finnish forms — none is a cognate of "free" */
  ['fi', 'Tämä on ilmainen ja vuorovaikutteinen laskemistehtävä.'],
  ['fi', 'Harjoitus on maksuton ja vuorovaikutteinen.'],
  ['fi', 'Tehtävä on vapaasti käytettävissä.'],
  ['en', 'The activity is available at no cost.']
];

/* correct native prose that MUST NOT fire — every one of these is real text from the corpus
   or the exact shape a panel warned me about */
const MUST_PASS = [
  ['de', 'Das ist die Grundlage für späteres freies Erzählen und Schreiben.'],
  ['de', 'Kein Fleckchen Erde bleibt frei, und kein Kästchen liegt doppelt.'],
  ['de', 'Ihr Kind kann sich frei bewegen und ohne Anmeldung spielen.'],
  ['nl', 'Niet zomaar het dichtstbijzijnde vrije plekje.'],
  ['nl', 'Zo blijft schrijven leuk en vrij van stress.'],
  ['nl', 'Het spel werkt zonder inloggen en zonder account.'],
  ['sv', 'Så barnet kan pröva fritt. Ingen timer och inga poäng.'],
  ['fr', 'Une activité interactive, sans inscription et sans compte à créer.'],
  ['es', 'La actividad se juega en el navegador, sin registro.'],
  ['pt', 'A atividade não pede cadastro nem login.'],
  ['it', "L'attività è senza registrazione, senza timer e senza punteggio."],
  ['fi', 'Tehtävä toimii ilman rekisteröitymistä ja ilman tiliä.'],
  ['en', 'There is no timer and no score, so a child can take their time.'],
  ['en', 'Nothing to install, and no sign-up.'],
  /* ⚠ the recorded ban-too-wide shape: a strand name must survive its own ban */
  ['da', 'Aktiviteten er tilgængelig i browseren uden konto.'],
  ['no', 'Aktiviteten er tilgjengelig i nettleseren uten konto.']
];

function hit(s) {
  const m = PRICE.exec(s) || CARRIER.exec(s);
  return m ? m[0] : null;
}

function poison() {
  let bad = 0;
  for (const [loc, s] of MUST_FIRE) {
    if (!hit(s)) { console.error('POISON FAIL (must fire, ' + loc + '): ' + s); bad++; }
  }
  for (const [loc, s] of MUST_PASS) {
    const h = hit(s);
    if (h) { console.error('POISON FAIL (must pass, ' + loc + ') matched "' + h + '": ' + s); bad++; }
  }
  return bad;
}

function walk(node, pathStr, out) {
  if (node == null) return;
  if (typeof node === 'string') {
    const h = hit(node);
    if (h) out.push({ path: pathStr, word: h, text: node.slice(0, 130) });
    return;
  }
  if (Array.isArray(node)) { node.forEach((v, i) => walk(v, pathStr + '[' + i + ']', out)); return; }
  if (typeof node === 'object') { Object.entries(node).forEach(([k, v]) => walk(v, pathStr ? pathStr + '.' + k : k, out)); }
}

function main() {
  const pBad = poison();
  if (pBad) { console.error('\nVERIFY-ACTIVITY-PROSE-CLAIMS ABORTED: ' + pBad + ' poison case(s) failed. The gate is not trustworthy until these pass.'); process.exit(1); }

  let scanned = 0;
  const findings = [];
  for (const loc of LOCALES) {
    const f = path.join(DIR, loc + '.json');
    if (!fs.existsSync(f)) { console.error('MISSING locale file: ' + f); process.exit(1); }
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    for (const surface of ['prose', 'templates']) {
      if (!j[surface]) continue;
      const out = [];
      walk(j[surface], surface, out);
      /* count what we actually looked at, so a gate that walks nothing cannot report clean */
      const count = [];
      walk(j[surface], surface, count.push ? [] : []);
      out.forEach((o) => { if (!KNOWN_GAPS.has(loc + '|' + o.path)) findings.push({ loc, ...o }); });
    }
    /* non-vacuity: every locale must contribute real strings */
    const all = [];
    (function countStrings(n) {
      if (typeof n === 'string') { all.push(1); return; }
      if (Array.isArray(n)) return n.forEach(countStrings);
      if (n && typeof n === 'object') Object.values(n).forEach(countStrings);
    })({ prose: j.prose, templates: j.templates });
    if (all.length < 50) { console.error('FAULT: only ' + all.length + ' strings in ' + loc + ' — the scan is vacuous, not the corpus clean'); process.exit(1); }
    scanned += all.length;
  }

  console.log('Prose + template strings checked: ' + scanned + ' across ' + LOCALES.length + ' locales');
  console.log('Poison: ' + MUST_FIRE.length + ' must-fire and ' + MUST_PASS.length + ' must-pass cases, all correct.');
  if (findings.length) {
    console.error('\nFALSE PRICE CLAIMS FOUND: ' + findings.length);
    findings.slice(0, 40).forEach((f) => console.error('  [' + f.loc + '] ' + f.path + '  <' + f.word + '>\n      ' + f.text));
    if (findings.length > 40) console.error('  ... and ' + (findings.length - 40) + ' more');
    console.error('\nPlays are metered (10/day, frontend/lib/quota.ts), so the activity is not free.');
    console.error('Remove the claim; do NOT remove the TRUE "no sign-up" clause alongside it.');
    process.exit(1);
  }
  console.log('VERIFY-ACTIVITY-PROSE-CLAIMS PASSED — 0 price claims in the activity body prose or the fallback templates.');
}

main();
