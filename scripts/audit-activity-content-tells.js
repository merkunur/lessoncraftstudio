/**
 * audit-activity-content-tells.js — can a child answer an ACTIVITY round without knowing, from the OPTIONS alone?
 * (guessability audit 2026-10-06, companion to scripts/worksheet-gen/qa/guessability.js)
 *
 * The 133 activity wrappers shuffle their options at runtime (Math.random, per session), so POSITION tells cannot exist
 * there. What can exist is a CONTENT tell written into the data: the right number is always the middle one, the right
 * answer is always the longest, the option that shares the most with the others. This scanner walks every
 * `mini tools/*-activities.json`, finds every question object it can read (an options/choices array + an answer field),
 * per activity per locale, and runs the measurer's NON-position strategies on them.
 *
 *   node scripts/audit-activity-content-tells.js [--show=<activity id>] [--json=out.json]
 *
 * Reads only. Exit 1 when any activity FAILS (a content strategy beats chance by > 10 points, significantly).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { choicePicks } = require('./worksheet-gen/qa/guessability.js');

const DIR = path.join(__dirname, '..', 'mini tools');
const OPT_KEYS = ['options', 'choices', 'opts', 'answers'];   // not 'cards': match-pairs cards are a set to PAIR (make-the-number: the target is a sum, not a card)
const ANS_KEYS = ['answer', 'correct', 'correctIndex', 'answerIndex', 'right', 'target', 'solution'];
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const show = arg('show');

const label = (o) => (o == null ? '' : typeof o === 'object' ? String(o.label ?? o.text ?? o.word ?? o.value ?? o.name ?? o.id ?? '') : String(o));

/** every readable question under node: { options: [labels], answer: index } */
function questions(node, out = []) {
  if (Array.isArray(node)) { node.forEach((x) => questions(x, out)); return out; }
  if (!node || typeof node !== 'object') return out;
  const ok = OPT_KEYS.find((k) => Array.isArray(node[k]) && node[k].length >= 2 && node[k].length <= 8 && node[k].every((o) => typeof o !== 'object' || o === null || !Array.isArray(o)));
  if (ok) {
    const opts = node[ok].map(label);
    let at = -1;
    for (const k of ANS_KEYS) {
      const v = node[k];
      if (v == null) continue;
      if (Number.isInteger(v) && v >= 0 && v < opts.length && !opts.every((x) => /^\d+$/.test(x))) { at = v; break; }
      const hits = opts.map((x, i) => (String(x) === String(typeof v === 'object' ? label(v) : v) ? i : -1)).filter((i) => i >= 0);
      if (hits.length === 1) { at = hits[0]; break; }
    }
    // options flagged correct: { correct: true } / { ok: true }
    if (at < 0) { const f = node[ok].findIndex((o) => o && typeof o === 'object' && (o.correct === true || o.ok === true || o.isCorrect === true)); if (f >= 0 && node[ok].filter((o) => o && (o.correct === true || o.ok === true || o.isCorrect === true)).length === 1) at = f; }
    if (at >= 0 && new Set(opts).size === opts.length && opts.every((x) => x !== '')) out.push({ options: opts, answer: at });
  }
  for (const v of Object.values(node)) if (v && typeof v === 'object') questions(v, out);
  return out;
}

const CONTENT = (name) => !/^(slot-|rotate|rank-rot)/.test(name);
const MARGIN = 0.10, Z = 3.5;
let fails = 0;
const report = [];
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('-activities.json'))) {
  let J; try { J = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); } catch (e) { continue; }
  const acts = Array.isArray(J) ? J : (J.activities || []);
  for (const a of acts) {
    const id = a.id || '?';
    // per locale when the activity keys its data by locale; else one pool
    const per = {};
    const walk = (node, loc) => {
      if (!node || typeof node !== 'object') return;
      for (const [k, v] of Object.entries(node)) {
        const L = /^(en|de|es|fr|it|pt|nl|sv|da|no|fi)$/.test(k) ? k : loc;
        if (Array.isArray(v) || (v && typeof v === 'object')) { const qs = questions(v); if (qs.length && L !== loc) { (per[L] = per[L] || []).push(...qs); continue; } walk(v, L); }
      }
    };
    walk(a, 'all');
    if (!Object.keys(per).length) { const qs = questions(a); if (qs.length) per.all = qs; }
    for (const [loc, qs] of Object.entries(per)) {
      if (qs.length < 8) continue;
      const S = {}; let chance = 0;
      for (const q of qs) {
        chance += 1 / q.options.length;
        const picks = choicePicks(q.options.map((l) => ({ label: l })), 0);
        for (const [name, pick] of Object.entries(picks)) if (CONTENT(name)) { const s = S[name] || (S[name] = { right: 0, tried: 0 }); s.tried++; if (pick === q.answer) s.right++; }
      }
      chance /= qs.length;
      let worst = null;
      for (const [name, s] of Object.entries(S)) {
        const score = (s.right + (qs.length - s.tried) * chance) / qs.length;
        const z = (score - chance) / Math.sqrt(chance * (1 - chance) / qs.length);
        if (!worst || score - chance > worst.over) worst = { name, score, over: score - chance, z };
      }
      const v = worst && worst.over > MARGIN && worst.z >= Z ? 'FAIL' : worst && worst.over > 0.05 && worst.z >= 3 ? 'WARN' : 'PASS';
      if (v === 'FAIL') fails++;
      report.push({ id, loc, q: qs.length, chance, worst, v });
      if (v !== 'PASS') console.log(`${v} ${id.padEnd(40)} ${loc} q=${qs.length} chance=${(chance * 100).toFixed(0)}%  ${worst.name}=${(worst.score * 100).toFixed(0)}% z${worst.z.toFixed(1)}`);
      if (show && id === show && loc === (arg('loc') || 'en')) qs.slice(0, 12).forEach((q) => console.log('   ' + q.options.map((o, i) => (i === q.answer ? '[' + o + ']' : o)).join(' | ')));
    }
  }
}
const tally = report.reduce((t, r) => ((t[r.v] = (t[r.v] || 0) + 1), t), {});
console.log(`${report.length} activity × locale pools read · ${JSON.stringify(tally)}`);
if (arg('json')) fs.writeFileSync(arg('json'), JSON.stringify(report, null, 1));
process.exit(fails ? 1 : 0);
