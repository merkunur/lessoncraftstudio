#!/usr/bin/env node
/* =====================================================================
   verify-main-topic-core.js — the MEASURED build-gate for "Marina's Headline
   Desk" (RI.2.2, main topic). Drives the REAL main-topic-core.js over the
   REAL manifest. The child taps the MAIN TOPIC; foils are a true small detail
   (quotes the article) + an off-topic.

     • ORACLE (the `topic` card) → 100%;
     • POSITION bots (always #1/#2/#3) → <= chance;
     • LONGEST / SHORTEST option bots → <= chance;
     • ARTICLE-OVERLAP bot ("pick the card most like the text") → <= chance —
       it must grab the DETAIL foil (highest article-overlap), not the topic.
   Plus STRUCTURAL: one topic + one detail + one offtopic per round; answer
   derived-not-stored; childView never exposes `kind`; the detail has STRICTLY
   the highest article-overlap on every round; >=7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'main-topic-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'marina-headline-desk-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.MainTopicCore) throw new Error('core did not attach window.MainTopicCore'); return win.MainTopicCore; }

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
    F(f.oneTopic, `${r.id}: not exactly one topic`);
    F(f.oneDetail, `${r.id}: not exactly one detail foil`);
    F(f.oneOfftopic, `${r.id}: not exactly one offtopic foil`);
    F(f.derivedNotStored, `${r.id}: has a stored answer/correctIndex`);
    const view = Core.childView(r);
    F((view.options || []).every((o) => Object.keys(o).sort().join(',') === 'id,text'), `${r.id}: childView option carries extra keys`);
    // 2026-10-17: the old invariant "the detail is the unique highest overlap" is
    // REMOVED — together with an off-topic card that shared no word with the
    // article it made the topic ALWAYS the middling-overlap card (a bot scored
    // 8/8 in all 7 locales). Overlap rank is now gated per locale below.
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
  F(ovl / N <= CHANCE, `article-overlap bot ${pct(ovl / N)} > ${pct(CHANCE)} (the topic is too article-like)`);
  pos.forEach((h, p) => F(h / N <= CHANCE, `position bot "always #${p + 1}" ${pct(h / N)} > ${pct(CHANCE)}`));

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | article-overlap ${pct(ovl / N)} | pos #1 ${pct(pos[0] / N)} #2 ${pct(pos[1] / N)} #3 ${pct(pos[2] / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  // ---- SHORTCUT BOTS OVER EVERY LOCALE (Unicode words; ties = fractional credit) ----
  // A child must READ to answer: no surface cue may beat 3/8.
  const BOT_CEIL = CHANCE;   // the gate file's own ceiling for every bot
  const row = manifest[0];
  const sets = Object.assign({ en: rounds }, row.params.roundsL10n || {});
  const QW = /^(how|why|what|where|when|who|wie|warum|was|woher|wo|wann|comment|pourquoi|d'où|d’où|où|ce que|ce dont|qu|quand|cómo|por qué|qué|dónde|de dónde|lo que|como|por que|o que|de onde|onde|come|perché|che cosa|cosa|da dove|dove|hoe|waarom|wat|waar|wanneer)(?![\p{L}])/iu;
  const STOP = new Set(('the a an and of to in for on is it they their its we our you your from that this with at as be are was by '
    + 'der die das ein eine einer einem einen und in im zu zum zur von vom mit sie es ihr ihre den dem des auf aus wie was ist sind wir du '
    + 'le la les un une des de du et en à au aux d l il elle ils elles leur leurs on se ce qui que est pour dans sur '
    + 'el los las unos unas del y al su sus es por para lo le con '
    + 'o os as um uma do da dos das e em no na nos nas ao seu sua é ela ele '
    + 'lo i gli dei delle della di è per '
    + 'het een van op te met ze zij hij je we zijn naar om voor').split(' '));
  const wordsU = (t, content) => String(t).toLowerCase().split(/[^\p{L}]+/u).filter(Boolean).filter((w) => !content || !STOP.has(w));
  const ovU = (r, t, c) => { const sw = new Set(wordsU((r.story || []).join(' '), c)); return wordsU(t, c).filter((w) => sw.has(w)).length; };
  const rankBot = (r, score, which) => {
    const o = r.options.map((x) => ({ k: x.kind, s: score(x) })); const srt = o.map((x) => x.s).sort((a, b) => a - b);
    const tgt = which === 'max' ? srt[srt.length - 1] : which === 'min' ? srt[0] : srt[1];
    const hits = o.filter((x) => x.s === tgt); return hits.filter((x) => x.k === 'topic').length / hits.length;
  };
  Object.keys(sets).forEach((loc) => {
    const rs = sets[loc]; const n = rs.length; const acc = {};
    const add = (k, v) => { acc[k] = (acc[k] || 0) + v; };
    rs.forEach((r) => {
      ['max', 'mid', 'min'].forEach((w) => {
        add('len-' + w, rankBot(r, (x) => x.text.length, w));
        add('overlapAll-' + w, rankBot(r, (x) => ovU(r, x.text, false), w));
        add('overlapContent-' + w, rankBot(r, (x) => ovU(r, x.text, true), w));
      });
      const q = r.options.filter((x) => QW.test(x.text.trim()));
      add('questionWord', q.length ? q.filter((x) => x.kind === 'topic').length / q.length : 1 / 3);
      const stops = r.options.filter((x) => /[.!?]$/.test(x.text.trim()));
      const odd = stops.length === 1 ? stops : (stops.length === r.options.length - 1 ? r.options.filter((x) => !/[.!?]$/.test(x.text.trim())) : null);
      add('oddPunctuation', odd ? odd.filter((x) => x.kind === 'topic').length : 1 / 3);
      const off = r.options.find((x) => x.kind === 'offtopic');
      F(off && ovU(r, off.text, true) >= 1, `${loc}/${r.id}: the off-page card shares no content word with the article (a "nothing in common" tell)`);
    });
    const worst = Object.entries(acc).sort((a, b) => b[1] - a[1])[0];
    Object.entries(acc).forEach(([k, v]) => F(v / n <= BOT_CEIL, `${loc}: shortcut bot "${k}" scores ${(v).toFixed(1)}/${n} (> ceiling)`));
    console.log(`  ${loc}: worst shortcut bot ${worst[0]} ${worst[1].toFixed(1)}/${n}`);
  });

  if (fails.length) { console.error(`VERIFY-MAIN-TOPIC FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-MAIN-TOPIC PASSED — oracle 100%; in EVERY locale no shortcut (length rank, word-overlap rank, question-word start, odd punctuation) beats the chance ceiling, and the off-page card always shares a word with the article; longest/shortest/article-overlap/position bots all <= chance; one topic + one detail + one offtopic per round; derived-not-stored; childView hides kind; >=7 rounds.');
  process.exit(0);
})();
