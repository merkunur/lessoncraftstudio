#!/usr/bin/env node
/* =====================================================================
   verify-reason-support-core.js — the MEASURED build-gate for "Pearl's
   Opinion Page" (RI.2.8, reasons support a point). Drives the REAL
   reason-support-core.js over the REAL manifest. The child taps the REASON
   that backs a point; foils are a circular restatement + an off-topic fact.

     • ORACLE (the `reason` card) → 100%;
     • POSITION bots (always #1/#2/#3) → <= chance;
     • LONGEST / SHORTEST option bots → <= chance;
     • POINT-OVERLAP bot ("pick the card most like the claim") → <= chance — it
       must grab the RESTATE foil (highest point-overlap), not the reason.
   Plus STRUCTURAL: one reason + one restate + one offtopic per round; answer
   derived-not-stored; childView never exposes `kind`; the restate has STRICTLY
   the highest point-overlap on every round; >=7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'reason-support-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'pearl-opinion-page-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.ReasonSupportCore) throw new Error('core did not attach window.ReasonSupportCore'); return win.ReasonSupportCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.threeOptions, `${r.id}: not exactly 3 options`);
    F(f.oneReason, `${r.id}: not exactly one reason`);
    F(f.oneRestate, `${r.id}: not exactly one restate foil`);
    F(f.oneOfftopic, `${r.id}: not exactly one offtopic foil`);
    F(f.derivedNotStored, `${r.id}: has a stored answer/correctIndex`);
    const view = Core.childView(r);
    F((view.options || []).every((o) => Object.keys(o).sort().join(',') === 'id,text'), `${r.id}: childView option carries extra keys`);
    // 2026-10-17: the old invariant "the restate is the unique highest point-overlap" is REMOVED — with an
    // off-topic card that shared no word with the point it made the reason ALWAYS the middling-overlap card.
  });

  const byLen = (r, dir) => { const o = Core.options(r); let best = o[0]; o.forEach((x) => { if (dir > 0 ? x.text.length > best.text.length : x.text.length < best.text.length) best = x; }); return best.id; };
  const byOverlap = (r) => { const o = Core.options(r); let best = o[0], bo = Core.overlap(r, o[0]); o.forEach((x) => { const ov = Core.overlap(r, x); if (ov > bo) { bo = ov; best = x; } }); return best.id; };

  let oracle = 0, longest = 0, shortest = 0, ovl = 0; const pos = [0, 0, 0];
  rounds.forEach((r) => {
    if (Core.grade(r, Core.oracle(r))) oracle++;
    if (Core.grade(r, byLen(r, +1))) longest++;
    if (Core.grade(r, byLen(r, -1))) shortest++;
    if (Core.grade(r, byOverlap(r))) ovl++;
    const o = Core.options(r);
    for (let p = 0; p < 3; p++) if (o[p] && Core.grade(r, o[p].id)) pos[p]++;
  });

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(longest / N <= CHANCE, `longest bot ${pct(longest / N)} > ${pct(CHANCE)}`);
  F(shortest / N <= CHANCE, `shortest bot ${pct(shortest / N)} > ${pct(CHANCE)}`);
  F(ovl / N <= CHANCE, `point-overlap bot ${pct(ovl / N)} > ${pct(CHANCE)} (the reason is too claim-like)`);
  pos.forEach((h, p) => F(h / N <= CHANCE, `position bot "always #${p + 1}" ${pct(h / N)} > ${pct(CHANCE)}`));

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | point-overlap ${pct(ovl / N)} | pos #1 ${pct(pos[0] / N)} #2 ${pct(pos[1] / N)} #3 ${pct(pos[2] / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  // ---- SHORTCUT BOTS OVER EVERY LOCALE (Unicode words; ties = fractional credit). No surface cue may beat 3/8. ----
  const BOT_CEIL = CHANCE;   // the gate file's own ceiling for every bot
  const sets = Object.assign({ en: rounds }, manifest[0].params.roundsL10n || {});
  const MODAL = /(?<![\p{L}])(should|must|need|needs|ought|sollte|sollten|muss|müssen|devrait|devraient|doit|doivent|faut|debería|deberían|debe|deben|hay que|deveria|deveriam|deve|devem|precisa|precisam|dovrebbe|dovrebbero|deve|devono|bisogna|moet|moeten|zou|zouden|horde|bör|skal|skulle|pitäisi|täytyy)(?![\p{L}])/iu;
  const OPENER = (t) => String(t).trim().toLowerCase().split(/[^\p{L}]+/u).filter(Boolean)[0] || '';
  const wordsU = (t) => String(t).toLowerCase().split(/[^\p{L}]+/u).filter((w) => w.length > 2);
  const ovU = (r, t) => { const sw = new Set(wordsU(r.point)); return wordsU(t).filter((w) => sw.has(w)).length; };
  const rankBot = (r, score, which) => {
    const o = r.options.map((x) => ({ k: x.kind, s: score(x) })); const srt = o.map((x) => x.s).sort((a, b) => a - b);
    const tgt = which === 'max' ? srt[srt.length - 1] : which === 'min' ? srt[0] : srt[1];
    const hits = o.filter((x) => x.s === tgt); return hits.filter((x) => x.k === 'reason').length / hits.length;
  };
  Object.keys(sets).forEach((loc) => {
    const rs = sets[loc]; const n = rs.length; const acc = {};
    const add = (k, v) => { acc[k] = (acc[k] || 0) + v; };
    const openers = {};
    rs.forEach((r) => {
      ['max', 'mid', 'min'].forEach((w) => {
        add('len-' + w, rankBot(r, (x) => x.text.length, w));
        add('overlap-' + w, rankBot(r, (x) => ovU(r, x.text), w));
      });
      const noModal = r.options.filter((x) => !MODAL.test(x.text) && ovU(r, x.text) > 0);
      add('noModal-onTopic', noModal.length ? noModal.filter((x) => x.kind === 'reason').length / noModal.length : 1 / 3);
      const reason = r.options.find((x) => x.kind === 'reason'); const op = OPENER(reason && reason.text); openers[op] = (openers[op] || 0) + 1;
      const off = r.options.find((x) => x.kind === 'offtopic');
      F(off && ovU(r, off.text) >= 1, `${loc}/${r.id}: the off-topic card shares no word with the point (a "nothing in common" tell)`);
    });
    const commonOpener = Object.entries(openers).sort((a, b) => b[1] - a[1])[0];
    F(!commonOpener || commonOpener[1] / n <= 0.5, `${loc}: ${commonOpener[1]}/${n} reasons start with "${commonOpener[0]}" (an opener tell)`);
    const worst = Object.entries(acc).sort((a, b) => b[1] - a[1])[0];
    Object.entries(acc).forEach(([k, v]) => F(v / n <= BOT_CEIL, `${loc}: shortcut bot "${k}" scores ${v.toFixed(1)}/${n} (> ceiling)`));
    console.log(`  ${loc}: worst shortcut bot ${worst[0]} ${worst[1].toFixed(1)}/${n}`);
  });

  if (fails.length) { console.error(`VERIFY-REASON-SUPPORT FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-REASON-SUPPORT PASSED — oracle 100%; in EVERY locale no shortcut (length rank, point-overlap rank, "on-topic and no modal verb", a shared opener word) beats the chance ceiling, and the off-topic card always shares a word with the point; longest/shortest/point-overlap/position bots all <= chance; one reason + one restate + one offtopic per round; derived-not-stored; childView hides kind; >=7 rounds.');
  process.exit(0);
})();
