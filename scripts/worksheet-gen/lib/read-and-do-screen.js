/**
 * read-and-do-screen.js — Level Set 2026-09-30 (Read and Do, PDF + interactive): the screen version (tap-choice) and
 * the answer key of G1-308 and four of its faces, built from the PRINTED page (the same instance: render-instance
 * rebuilds with a fresh rng and asserts meta identity), plus the robot's INDEPENDENT oracle.
 *
 * The paper task is "do it with your pencil" (circle / cross / underline / tick / join / write). The screen checks the
 * READING: one card per sentence (per step on the two-step page), and the child taps what the sentence is about:
 *   one picture   (the cat · the second dog · the first / last picture · between · right / left of)
 *                 → the row of pictures itself, in order from the start flag: tap that picture
 *   all the X     → one picture of each kind on the row: tap the kind
 *   write         → the row + number chips 1-4: tap how many
 *   join A and B  → three pairs of pictures: tap the pair
 *   true / false  → the row + the page's two words (yes | no)
 * The draw page (G1-342) is open-ended: printable only, no key.
 *
 * The key is the printed page with every answer in coral: the target pictures ringed and badged with their sentence
 * number, a count centred in its box, the right word of a true / false row ringed.
 *
 * The oracle never reads a target or an answer stamp: it finds the SENTENCE among every sentence the bank can say over
 * that row (G1-308's own frames — the text is the ground truth), and derives the answer from the row and that parse.
 */
'use strict';
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const SCR_W = 660, OPT = 104;   // the Level Set screen: 104 page-px reaches the 44 px tap floor at 360 wide
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const cssStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

/** Every element carrying `attr` in the printed body, with its attributes. */
function elements(html, attr) {
  const out = [];
  const re = new RegExp(`<(\\w+)\\s[^>]*\\b${attr}(?=[\\s=>])(?:="[^"]*")?[^>]*>`, 'g');
  let m;
  while ((m = re.exec(html))) {
    const at = {};
    m[0].replace(/([\w-]+)="([^"]*)"/g, (_, k, v) => { at[k] = unesc(v); return ''; });
    out.push({ tag: m[0], at, index: m.index });
  }
  return out;
}
/** The row of pictures: [{idx, key, src}] in strip order. */
function tiles(html) {
  const strip = ((/data-lcs-strip="([^"]*)"/.exec(html) || [])[1] || '').split(',').filter(Boolean);
  const src = {};
  for (const m of html.matchAll(/<span[^>]*data-lcs-idx="(\d+)"[^>]*>\s*<img class="ws-icon" src="([^"]+)"/g)) src[+m[1]] = m[2];
  if (!strip.length || strip.some((_, i) => !src[i])) throw new Error('read-and-do screen: the printed strip has no pictures');
  return strip.map((key, idx) => ({ idx, key, src: src[idx] }));
}

const FLAG = `<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M8 4v26" stroke="${CORAL}" stroke-width="3" stroke-linecap="round"/><path d="M9 5h17l-5 6 5 6H9z" fill="${CORAL}"/></svg>`;
const pic = (src, px) => `<img src="${src}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">${top}</div>${body}</div>`;
}
const line = (html, px = 28) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;line-height:1.35;color:#3A3530">${html}</span>`;
const MARKED = (t) => `<span style="background:#FCE3D6;border-bottom:3px solid ${CORAL};border-radius:4px;padding:0 4px">${esc(t)}</span>`;
function chip(i, label, correct, inner, w = OPT) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:${w}px;min-height:${OPT}px;height:${OPT}px;box-sizing:border-box;padding:6px;display:inline-flex;align-items:center;justify-content:center;gap:6px">${inner}</span>`;
}
/** The row as tap options, in order from the flag; 3 (6 pictures) or 4 (8 pictures) per line. */
function stripOptions(ts, correctIdx) {
  const per = ts.length <= 6 ? 3 : 4;
  const lines = [];
  for (let i = 0; i < ts.length; i += per) {
    const cells = ts.slice(i, i + per).map((t) => chip(t.idx, String(t.idx + 1), t.idx === correctIdx, pic(t.src, 84))).join('');
    lines.push(`<div style="display:flex;gap:12px;align-items:center">${i === 0 ? FLAG : '<span style="width:34px"></span>'}${cells}</div>`);
  }
  return `<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">${lines.join('')}</div>`;
}
/** The row, not tappable (count it, check a statement against it). */
const stripView = (ts) => `<div style="display:flex;gap:6px;align-items:center;padding:6px 10px;background:#FBF3E4;border-radius:12px">${FLAG}${ts.map((t) => `<span style="display:inline-flex;width:62px;height:62px;align-items:center;justify-content:center;background:#fff;border:2px solid #EFE4D2;border-radius:8px">${pic(t.src, 54)}</span>`).join('')}</div>`;
const opts = (html) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${html}</div>`;

/** The i-th option set of a page: the correct label at position i % n among the others (no fixed-position tell). */
function rotate(correct, others, i, n) {
  const pool = others.filter((x) => x !== correct).slice(0, n - 1);
  const at = slotFor(correct + '|' + i, pool.length + 1);   // never i % n (a diagonal tell, 2026-10-06)
  return [...pool.slice(0, at), correct, ...pool.slice(at)];
}

/** One step / row → a screen card. `s` = {action, cue, noun, noun2, targets, text}; `shown` = the sentence html. */
function card(s, ts, shown, i, meta) {
  const kinds = [];
  ts.forEach((t) => { if (!kinds.find((x) => x.key === t.key)) kinds.push(t); });
  const cueKind = String(s.cue).split(':')[0];
  if (s.action === 'write') {
    const want = ts.filter((t) => t.key === s.noun).length;
    const nums = rotate(String(want), ['1', '2', '3', '4'], i, 4);
    return item(meta, line(shown) + stripView(ts), opts(nums.map((nn, j) => chip(j, nn, nn === String(want), `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:44px;color:#3A3530">${nn}</span>`)).join('')));
  }
  if (s.action === 'line') {
    const [a, b] = [s.noun, s.noun2];
    const key = (x) => ts.find((t) => t.key === x);
    const others = kinds.map((k) => k.key).filter((k) => k !== a && k !== b);
    const pairs = [[a, b], [a, others[0]], [others[1] || others[0], b]].filter((p) => p[1]);
    if (pairs.length < 3 || new Set(pairs.map((p) => p.join('+'))).size < 3) throw new Error(`read-and-do screen: no three pairs for "${s.text}"`);
    const labels = rotate(a + '+' + b, pairs.map((p) => p.join('+')), i, 3);
    return item(meta, line(shown), opts(labels.map((l, j) => { const [x, y] = l.split('+'); return chip(j, l, l === a + '+' + b, pic(key(x).src, 76) + pic(key(y).src, 76), 196); }).join('')));
  }
  if (cueKind === 'all') {
    return item(meta, line(shown) + stripView(ts), opts(kinds.map((k, j) => chip(j, k.key, k.key === s.noun, pic(k.src, 84))).join('')));
  }
  if (!s.targets || s.targets.length !== 1) throw new Error(`read-and-do screen: "${s.text}" names ${s.targets ? s.targets.length : 0} pictures`);
  // the tap options wrap onto two lines (the 44 px tap floor), so the whole row is shown ONCE, unbroken, above them —
  // "right of / between / the third" are read on the row, never across a line break (native panels 2026-09-30)
  return item(meta, line(shown) + stripView(ts), stripOptions(ts, s.targets[0]));
}

function rowsOf(html) {
  const rows = elements(html, 'data-lcs-row');
  return rows.map((r, i) => {
    const end = i + 1 < rows.length ? rows[i + 1].index : html.length;
    const seg = html.slice(r.index, end);
    const steps = elements(seg, 'data-lcs-step').map((s) => ({
      action: s.at['data-lcs-action'], cue: s.at['data-lcs-cue'], noun: s.at['data-lcs-noun'], noun2: s.at['data-lcs-noun2'],
      k: s.at['data-lcs-k'] != null ? +s.at['data-lcs-k'] : null, targets: (s.at['data-lcs-targets'] || '').split(',').filter((x) => x !== '').map(Number),
    }));
    return {
      n: +r.at['data-lcs-n'], action: r.at['data-lcs-action'], cue: r.at['data-lcs-cue'], noun: r.at['data-lcs-noun'], noun2: r.at['data-lcs-noun2'],
      k: r.at['data-lcs-k'] != null ? +r.at['data-lcs-k'] : null, text: r.at['data-lcs-text'], truth: r.at['data-lcs-truth'],
      targets: (r.at['data-lcs-targets'] || '').split(',').filter((x) => x !== '').map(Number), steps,
    };
  });
}

/**
 * layout: 'base' (G1-308 / 338 / 340) · 'steps' (339) · 'truth' (341).
 * helpers: { sentenceFor(bank, verb, cue, k, a, b) } — G1-308's own clause filler (the two-step clause highlight).
 */
function screenOrKey(layout, built, ctx, loc, bank, helpers) {
  const html = built.bodyHtml;
  const out = { bodyHtml: html, meta: built.meta };
  const ts = tiles(html);
  const strip = ts.map((t) => t.key).join(',');
  const rows = rowsOf(html);
  if (ctx.interactive) {
    const items = [];
    if (layout === 'truth') {
      rows.forEach((r, i) => {
        const want = r.truth === '1' ? bank.truth.yes : bank.truth.no;
        const labels = [bank.truth.yes, bank.truth.no];
        items.push(item(`data-lcs-strip="${esc(strip)}" data-lcs-sentence="${esc(r.text)}"`, line(esc(r.text)) + stripView(ts),
          opts(labels.map((l, j) => chip(j, l, l === want, `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:30px;color:#3A3530">${esc(l)}</span>`, 220)).join(''))));
        void i;
      });
    } else if (layout === 'steps') {
      let n = 0;
      rows.forEach((r) => {
        r.steps.forEach((s, j) => {
          // the clause of this step, highlighted in the whole sentence (clause 1 = its own sentence minus the stop)
          const verb = bank.verbs.find((v) => v.id === r.steps[0].action);
          const c1 = String(helpers.sentenceFor(bank, verb, r.steps[0].cue, r.steps[0].k, r.steps[0].noun || null, r.steps[0].noun2 || null) || '').replace(/\.$/, '');
          if (!c1 || !r.text.startsWith(c1)) throw new Error(`read-and-do screen: clause 1 "${c1}" does not open "${r.text}"`);
          const joint = (verb && verb.joinComma ? ',' : '') + ' ' + bank.and + ' ';   // de / da: "…, und" after a subordinate clause
          if (r.text.slice(c1.length, c1.length + joint.length) !== joint) throw new Error(`read-and-do screen: no "${bank.and}" after clause 1 in "${r.text}"`);
          const c2 = r.text.slice(c1.length + joint.length);
          const shown = j === 0 ? MARKED(c1) + esc(joint + c2) : esc(c1 + joint) + MARKED(c2);
          items.push(card({ ...s, text: r.text }, ts, shown, n++, `data-lcs-strip="${esc(strip)}" data-lcs-sentence="${esc(r.text)}" data-lcs-part="${j + 1}"`));
        });
      });
    } else {
      rows.forEach((r, i) => items.push(card(r, ts, esc(r.text), i, `data-lcs-strip="${esc(strip)}" data-lcs-sentence="${esc(r.text)}"`)));
    }
    out.bodyHtml = `<div data-ws-content data-lcs-type="read-and-do" data-lcs-screen="${layout}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // ---- the answer key: the printed page with every answer in coral
  const css = [];
  const badge = (idx, n) => {
    css.push(`[data-lcs-idx="${idx}"]{position:relative;outline:4px solid ${CORAL};outline-offset:1px}`,
      `[data-lcs-idx="${idx}"]::after{content:"${n}";position:absolute;top:2px;right:2px;min-width:22px;height:22px;border-radius:11px;background:${CORAL};color:#fff;font:700 14px/22px 'Baloo 2',cursive;text-align:center}`);
  };
  const count = (n, c) => css.push(`[data-lcs-row][data-lcs-n="${n}"] .ws-answerbox{position:relative}`,
    `[data-lcs-row][data-lcs-n="${n}"] .ws-answerbox::after{content:"${c}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`);
  if (layout === 'truth') {
    rows.forEach((r) => css.push(`[data-lcs-row][data-lcs-n="${r.n}"] [data-lcs-truth-chip="${r.truth === '1' ? 'yes' : 'no'}"]{outline:4px solid ${CORAL};outline-offset:2px;border-radius:999px}`));
  } else {
    rows.forEach((r) => {
      const parts = r.steps.length ? r.steps : [r];
      parts.forEach((s) => {
        s.targets.forEach((idx) => badge(idx, r.n));
        if (s.action === 'write') count(r.n, ts.filter((t) => t.key === s.noun).length);
      });
    });
  }
  out.bodyHtml = html + `<style data-lcs-key>${css.join('')}</style>`;
  return out;
}

/* ------------------------------------------------------------------ the oracle (independent) ------------------------------------------------------------------ */

/** Every picture a (cue, noun, noun2, k) names on a row, derived here from the row alone (never from a stamp). */
function derive(strip, cue, k, a, b) {
  const kind = String(cue).split(':')[0];
  const at = (x) => strip.map((s, i) => (s === x ? i : -1)).filter((i) => i >= 0);
  const n = strip.length;
  if (kind === 'unique') { const o = at(a); if (o.length !== 1) throw new Error(`oracle: "${a}" is ${o.length}× on the row`); return o; }
  if (kind === 'all') return at(a);
  if (kind === 'ordinal') { const o = at(a); if (o.length < k) throw new Error(`oracle: no ${k}th ${a}`); return [o[k - 1]]; }
  if (kind === 'first') return [0];
  if (kind === 'last') return [n - 1];
  if (kind === 'between') { const i = at(a)[0], j = at(b)[0]; if (j - i !== 2) throw new Error('oracle: between not two apart'); return [i + 1]; }
  if (kind === 'rightof') return [at(a)[0] + 1];
  if (kind === 'leftof') return [at(a)[0] - 1];
  throw new Error(`oracle: cue ${cue}`);
}
/** The one parse of a sentence among every sentence G1-308's bank frames can say over this row. */
function parse(sentence, strip, bank, sentenceFor) {
  const nouns = [...new Set(strip)];
  const hits = [];
  const tryOne = (verb, cue, k, a, b) => {
    let t = null;
    try { t = sentenceFor(bank, verb, cue, k, a, b); } catch (e) { t = null; }
    if (t && t === sentence) hits.push({ action: verb.id, cue, k, noun: a, noun2: b });
  };
  for (const verb of bank.verbs) {
    // each cue with exactly the noun slots its sentence names
    if (verb.id === 'write') { for (const a of nouns) tryOne(verb, 'count', null, a, null); continue; }
    if (verb.id === 'line') { for (const a of nouns) for (const b of nouns) if (a !== b) tryOne(verb, 'unique', null, a, b); continue; }
    for (const a of nouns) {
      tryOne(verb, 'unique', null, a, null);
      tryOne(verb, 'all', null, a, null);
      for (let k = 2; k <= 5; k++) tryOne(verb, 'ordinal:' + k, k, a, null);
      tryOne(verb, 'rightof', null, a, null);
      tryOne(verb, 'leftof', null, a, null);
      for (const b of nouns) if (a !== b) tryOne(verb, 'between', null, a, b);
    }
    tryOne(verb, 'first', null, null, null);
    tryOne(verb, 'last', null, null, null);
  }
  return hits;
}

function oracle(layout, items, loc, bank, sentenceFor) {
  return items.map((it) => {
    const labels = (it.options || []).map((o) => String(o && typeof o === 'object' ? o.label : o));
    const m = it.meta;
    const strip = String(m['data-lcs-strip']).split(',');
    const pickOne = (ok, what) => {
      const idx = labels.map((l, i) => (ok(l) ? i : -1)).filter((i) => i >= 0);
      if (idx.length !== 1) throw new Error(`oracle: ${idx.length} options ${what} (${labels.join(' / ')})`);
      return idx[0];
    };
    if (layout === 'truth') {
      const tv = truthOf(String(m['data-lcs-sentence']), strip, bank);
      return pickOne((l) => l === (tv ? bank.truth.yes : bank.truth.no), `say "${tv}"`);
    }
    let sentence = String(m['data-lcs-sentence']);
    let step = null;
    if (layout === 'steps') {
      // the sentence is two clauses: find the split whose halves are both sentences of the bank
      const cuts = [];
      for (const joint of [' ' + bank.and + ' ', ', ' + bank.and + ' ']) for (let p = sentence.indexOf(joint); p >= 0; p = sentence.indexOf(joint, p + 1)) {
        const c1 = sentence.slice(0, p) + '.', rest = sentence.slice(p + joint.length);
        const c2 = rest.charAt(0).toLocaleUpperCase(loc) + rest.slice(1);
        const p1 = parse(c1, strip, bank, sentenceFor), p2 = parse(c2, strip, bank, sentenceFor);
        if (p1.length && p2.length) cuts.push([p1, p2]);
      }
      if (cuts.length !== 1) throw new Error(`oracle: "${sentence}" splits ${cuts.length} ways`);
      step = cuts[0][+m['data-lcs-part'] - 1];
      if (!step || step.length !== 1) throw new Error(`oracle: step ${m['data-lcs-part']} of "${sentence}" parses ${step ? step.length : 0} ways`);
      step = step[0];
    } else {
      const ps = parse(sentence, strip, bank, sentenceFor);
      if (ps.length !== 1) throw new Error(`oracle: "${sentence}" parses ${ps.length} ways`);
      step = ps[0];
    }
    if (step.action === 'write') return pickOne((l) => l === String(strip.filter((x) => x === step.noun).length), 'give the count');
    if (step.action === 'line') return pickOne((l) => l === step.noun + '+' + step.noun2, 'are the pair');
    if (String(step.cue).split(':')[0] === 'all') return pickOne((l) => l === step.noun, `are "${step.noun}"`);
    const t = derive(strip, step.cue, step.k, step.noun, step.noun2);
    if (t.length !== 1) throw new Error(`oracle: "${sentence}" names ${t.length} pictures`);
    return pickOne((l) => l === String(t[0] + 1), `are picture ${t[0] + 1}`);
  });
}

/** A true / false statement evaluated against the row: parsed back through the bank's truth frames. */
function truthOf(sentence, strip, bank) {
  const nouns = [...new Set(strip)];
  const num = (v) => (bank.numbers && bank.numbers[v]) || String(v);
  const U = (a) => bank.objForms[a] && bank.objForms[a].unique;
  const results = new Set();
  for (const f of bank.truth.frames) {
    const fill = (slots) => String(f.text).replace(/\{(\w+)\}/g, (_, k) => (slots[k] == null ? `{${k}}` : slots[k]));
    for (const a of nouns) {
      if (f.cue === 'count') {
        const c = strip.filter((x) => x === a).length;
        for (let v = 2; v <= 5; v++) {
          const f0 = bank.objForms[a] || {};
          if (fill({ n: num(v), pl: f0.pl, part: f0.part }) !== sentence) continue;
          results.add(f.rel === 'eq' ? c === v : f.rel === 'gt' ? c > v : c < v);
        }
      } else if (f.cue === 'first' || f.cue === 'last') {
        if (fill({ obj: U(a) }) === sentence) results.add(strip[f.cue === 'first' ? 0 : strip.length - 1] === a);
      } else if (f.cue === 'ordinal') {
        if (fill({ obj: U(a) }) === sentence) results.add(strip[f.k - 1] === a);
      } else if (f.cue === 'rightof' || f.cue === 'leftof') {
        // "right after / before X" is only said about a picture that is ONCE on the row (else "the X" names nothing)
        if (strip.filter((x) => x === a).length !== 1) continue;
        for (const b of nouns) {
          if (fill({ obj: U(a), obj2: U(b) }) !== sentence) continue;
          const i = strip.indexOf(a);
          results.add(strip[f.cue === 'rightof' ? i + 1 : i - 1] === b);
        }
      }
    }
  }
  if (results.size !== 1) throw new Error(`oracle: "${sentence}" evaluates ${results.size ? 'both ways' : 'to nothing'}`);
  return [...results][0];
}

module.exports = { screenOrKey, oracle, _derive: derive, _truthOf: truthOf };
