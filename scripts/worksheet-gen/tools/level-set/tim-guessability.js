#!/usr/bin/env node
/**
 * tim-guessability.js — Telling Time Level Set (2026-10-14): can a child pick the right time WITHOUT reading the clock?
 * Builds every choice face (read the clock / 12-24 hours) at its Level Set levels over N seeds and scores fixed strategies
 * that look only at the OPTIONS: the slot (1st / 2nd …), the time rank (earliest / middle / latest), "the one whose
 * minutes another option shares", "the one whose hour another option shares", "the odd one out by minutes". A strategy
 * may not beat chance (1 / options) by more than the margin. Exit 1 on a failure.
 *   node tools/level-set/tim-guessability.js [--seeds=200] [--margin=0.15]
 */
'use strict';
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? +a.split('=')[1] : d; };
const SEEDS = arg('seeds', 200), MARGIN = arg('margin', 0.15);
const FACES = { 'G1-148': [1, 3], 'G1-149': [1, 3], 'G2-250': [1, 3], 'G2-249': [1, 3], 'G3-354': [1, 3], 'G3-355': [1, 3] };
// the rank a child can see: the printed numbers compared (7:45 < 12:15; AM / PM ignored) — the same reading the builder deals
const toMin = require('../../types/_shared/clock-tasks.js').numValue;
let bad = 0;
for (const [id, levels] of Object.entries(FACES)) {
  const spec = loadType(id);
  for (const lv of levels) {
    const score = {}; let cards = 0, chance = 0;
    const hit = (k, ok) => { score[k] = (score[k] || 0) + (ok ? 1 : 0); };
    for (let v = 1; v <= SEEDS; v++) {
      const b = spec.build({ theme: null, difficulty: lv, locale: ['en','de','es','fr','fi','pt','nl','sv','da','no','it'][v % 11] }, { rng: makeRng(instanceSeed({ typeId: id, theme: null, difficulty: lv, seedEpoch: 1, variant: v + 100, unit: null })), variant: v, seedVariant: v + 100 });
      for (const card of b.bodyHtml.split('data-lcs-card=').slice(1)) {
        const opts = [...card.matchAll(/data-lcs-choice="([^"]+)"(\s+data-lcs-correct="1")?/g)].map((m) => ({ v: m[1], ok: !!m[2] }));
        if (opts.length < 2) continue;
        cards++; chance += 1 / opts.length;
        const at = opts.findIndex((o) => o.ok);
        for (let s = 0; s < opts.length; s++) hit('slot' + s, at === s);
        const mins = opts.map((o) => toMin(o.v)), sorted = mins.slice().sort((a, b) => a - b);
        const mm = opts.map((o) => o.v.split(':')[1]), hh = opts.map((o) => o.v.split(':')[0]);
        const shareM = (i) => mm.filter((x) => x === mm[i]).length > 1, shareH = (i) => hh.filter((x) => x === hh[i]).length > 1;
        // a strategy picks ONE option; when several qualify the child picks among them at random (expected value)
        const pickAmong = (pred) => { const q = opts.map((_, i) => i).filter(pred); return q.length ? (q.includes(at) ? 1 / q.length : 0) : 1 / opts.length; };
        // rank strategies: the smallest / largest / middle number (ties — 3:00 AM / 3:00 PM — split at random)
        const lo = sorted[0], hi = sorted[sorted.length - 1];
        score.earliest = (score.earliest || 0) + pickAmong((i) => mins[i] === lo);
        score.latest = (score.latest || 0) + pickAmong((i) => mins[i] === hi);
        if (opts.length === 3) score.middle = (score.middle || 0) + pickAmong((i) => mins[i] !== lo && mins[i] !== hi);
        score.shareMin = (score.shareMin || 0) + pickAmong(shareM);
        score.shareHour = (score.shareHour || 0) + pickAmong(shareH);
        score.oddMin = (score.oddMin || 0) + pickAmong((i) => !shareM(i));
        score.oddHour = (score.oddHour || 0) + pickAmong((i) => !shareH(i));
      }
    }
    const c = chance / cards;
    const worst = Object.entries(score).map(([k, n]) => [k, n / cards]).sort((a, b) => b[1] - a[1]);
    const fail = worst[0][1] > c + MARGIN;
    if (fail) bad++;
    console.log(`${fail ? 'FAIL' : 'ok  '} ${id} L${lv}: chance ${(c * 100).toFixed(0)}%  best ${worst.slice(0, 3).map(([k, x]) => k + ' ' + (x * 100).toFixed(0) + '%').join(', ')}  (${cards} cards)`);
  }
}
process.exit(bad ? 1 : 0);
