/**
 * verb-forms-screen.js — Level Set 2026-10-01 (Verb Forms, PDF + interactive): the SCREEN version and the ANSWER KEY
 * of a built G2-317 page (the base or one of its five faces), built from the printed page's own meta + stamps (the
 * same instance: render-instance asserts meta identity), plus the robot's INDEPENDENT oracle, which re-derives every
 * answer from the merged bank (bank.verbs / irregularCore forms[unit][col]), never from the page's marks.
 * New pages only — the published pages never reach this file.
 *
 *   base / irregular (G2-317 / G2-336)  every gap of the table: the verb + its person (or tense) → tap its form;
 *                                       then every sentence lane: the sentence + the verb → tap the form that fits
 *   match     (G2-334)  tense: a verb → tap its yesterday form; persons: a verb + a person → tap the form
 *   sentences (G2-335)  a sentence with a gap + the verb → tap the form
 *   choice    (G2-337)  the sentence → tap the form that fits (the page's own printed candidates)
 *   hunt      (G2-338)  the whole sentence → tap the verb in it
 * Options are forms of the SAME verb (never invented), the right one at item index % n (no position tell); every
 * target >= 100 page px (44 px on a 360 px phone). The key is the printed page with the answers in coral: the form
 * in every dashed box (centered), the circled candidate outlined, matching numbers on the match lines, the hunted
 * verb underlined with its infinitive in the box.
 */
'use strict';
const { slotFor } = require('./answer-slots.js');
const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = '#146B5E';
const SCR_W = 660, OPT_H = 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fold = (s) => String(s).trim().toLocaleLowerCase();

function modeOf(d) {
  if (d.match) return 'match';
  if (d.tables === 0) return 'sentences';
  if (d.choice) return 'choice';
  if (d.hunt) return 'hunt';
  return d.pool === 'irregular' ? 'irregular' : 'base';
}

function verbOf(bank, inf) {
  const v = [...(bank.verbs || []), ...(bank.irregularCore || [])].find((x) => x.inf === inf);
  if (!v) throw new Error(`verb-forms screen: no verb "${inf}" in the bank`);
  return v;
}
const formOf = (bank, unit, inf, col) => verbOf(bank, inf).forms[unit][col];
/** the verb's distinct forms on this unit (tense mode adds the infinitive: the base form is a printed candidate there) */
function paradigm(bank, unit, inf) {
  const v = verbOf(bank, inf);
  const fs = bank.columns.map((c) => v.forms[unit][c.key]);
  if (bank.mode === 'tense') fs.unshift(v.inf);
  const out = [];
  for (const f of fs) if (!out.some((x) => fold(x) === fold(f))) out.push(f);
  return out;
}
/** the right form + up to two OTHER forms of the same verb, the right one at i % n */
function optionsFor(bank, unit, inf, right, i) {
  const others = paradigm(bank, unit, inf).filter((f) => fold(f) !== fold(right));
  const k = others.length ? i % others.length : 0;
  const pick = others.slice(k).concat(others.slice(0, k)).slice(0, 2);
  const at = slotFor(right + '|' + i, pick.length + 1);   // never i % n (a diagonal tell, 2026-10-06)
  const o = pick.slice(); o.splice(at, 0, right);
  return { opts: o, at };
}
const colLabel = (bank, col) => (bank.columns.find((c) => c.key === col) || {}).label || col;

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
function optsHtml(labels, correct) {
  const w = labels.length >= 4 ? 150 : labels.length === 3 ? 200 : 290;
  const g = Math.max(...labels.map((l) => [...String(l)].length));
  const px = Math.max(18, Math.min(30, Math.floor((w - 24) / (0.6 * g))));
  return `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${labels.map((l, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(l)}"${j === correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(l)}</span>`).join('')}</div>`;
}
const word = (w, px = 42) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:${INK}">${esc(w)}</span>`;
const chip = (w) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:26px;line-height:1;color:${TEAL};border:2.5px solid ${TEAL};border-radius:999px;padding:6px 16px">${esc(w)}</span>`;
const sentence = (t) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1.35;color:${INK}">${t}</span>`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;
const frameText = (bank, id) => { const f = (bank.frames || []).find((x) => x.id === id); if (!f) throw new Error(`verb-forms screen: no frame ${id}`); return f.text; };
const gapSentence = (bank, id) => { const [a, b] = frameText(bank, id).split('{form}'); return sentence(esc(a) + GAP + esc(b || '')); };
const kind = (k, inf, col, extra = '') => `data-lcs-kind="${k}" data-lcs-verb="${esc(inf)}" data-lcs-col="${esc(col)}" data-lcs-word="${esc(inf)}"${extra}`;

/** the sentence-lane items (base / irregular / match / sentences): the sentence with a gap + the verb → its form */
function laneItems(bank, unit, lanes, start) {
  return lanes.map(([inf, col, fid], k) => {
    const r = optionsFor(bank, unit, inf, formOf(bank, unit, inf, col), start + k);
    return item(kind('lane', inf, col, ` data-lcs-frame="${esc(fid)}"`), gapSentence(bank, fid) + chip(inf), optsHtml(r.opts, r.at));
  });
}

function screenOrKey(mode, built, ctx, loc, bank) {
  const m = built.meta, unit = m.unit;
  const out = { bodyHtml: built.bodyHtml, meta: m };
  if (ctx.interactive) {
    let items = [];
    if (mode === 'base' || mode === 'irregular') {
      for (const t of m.tables) for (const [inf, cells] of t) for (const c of cells.split(',')) {
        const [col, state] = c.split(':');
        if (state !== 'gap') continue;
        const r = optionsFor(bank, unit, inf, formOf(bank, unit, inf, col), items.length);
        items.push(item(kind('cell', inf, col), word(inf) + `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:30px;color:${TEAL}">${esc(colLabel(bank, col))}</span>` + GAP, optsHtml(r.opts, r.at)));
      }
      items = items.concat(laneItems(bank, unit, m.lanes, items.length));
    } else if (mode === 'match') {
      if (m.kind === 'tense') {
        m.verbs.forEach((inf, i) => {
          const v = verbOf(bank, inf);
          const nextPast = formOf(bank, unit, m.verbs[(i + 1) % m.verbs.length], 'past');
          const labels = [v.forms[unit].past, v.forms[unit].pres, nextPast];
          const at = slotFor(labels[0] + '|' + i, 3); const o = labels.slice(1); o.splice(at, 0, labels[0]);
          items.push(item(kind('match-tense', inf, 'past'), word(inf) + `<span style="font-size:40px;color:${TEAL};font-weight:800">&#8594;</span>` + GAP, optsHtml(o, at)));
        });
      } else {
        for (const inf of m.verbs) for (const col of bank.matchPersons) {
          const v = verbOf(bank, inf);
          const label = (v.labelOverride && v.labelOverride[col]) || colLabel(bank, col);
          const right = v.forms[unit][col];
          const pool = bank.matchPersons.map((c) => v.forms[unit][c]).filter((f) => fold(f) !== fold(right));
          const n = items.length, k = pool.length ? n % pool.length : 0;
          const pick = [...new Set(pool.slice(k).concat(pool.slice(0, k)))].slice(0, 2);
          const at = n % (pick.length + 1); const o = pick.slice(); o.splice(at, 0, right);
          items.push(item(kind('cell', inf, col), word(inf) + `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:30px;color:${TEAL}">${esc(label)}</span>` + GAP, optsHtml(o, at)));
        }
      }
      items = items.concat(laneItems(bank, unit, m.lanes || [], items.length));
    } else if (mode === 'sentences') {
      items = laneItems(bank, unit, m.lanes, 0);
    } else if (mode === 'choice') {
      items = m.rows.map(([inf, col, fid, idx]) => {
        const lane = new RegExp(`data-lcs-frame="${fid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?data-lcs-chips[^>]*>([\\s\\S]*?)</div>`).exec(built.bodyHtml);
        if (!lane) throw new Error(`verb-forms screen: no printed chips for ${fid}`);
        const chips = [...lane[1].matchAll(/data-lcs-pill="([^"]*)"/g)].map((x) => x[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
        return item(kind('choice', inf, col, ` data-lcs-frame="${esc(fid)}"`), gapSentence(bank, fid), optsHtml(chips, idx));
      });
    } else if (mode === 'hunt') {
      items = m.rows.map(([inf, col, fid], i) => {
        const f = (bank.frames || []).find((x) => x.id === fid);
        const form = formOf(bank, unit, inf, col);
        const subj = new Set(String(f.subjectLiteral || '').split(/\s+/).map(fold));
        // the distractors are OTHER words of the sentence (never the verb): the longest first; a short sentence (sv "Elsa sover nu.")
        // falls back to its short words, then to its subject name
        const all = f.text.replace('{form}', ' ').split(/[^\p{L}'’-]+/u).filter((w) => w && fold(w) !== fold(form));
        const rank = (w) => (subj.has(fold(w)) ? -1 : [...w].length);
        const others = all.filter((w, k) => all.findIndex((x) => fold(x) === fold(w)) === k).sort((a, b) => rank(b) - rank(a)).slice(0, 2);
        const at = slotFor(form + '|' + i, others.length + 1); const o = others.slice(); o.splice(at, 0, form);   // never a fixed rotation (a position tell, 2026-10-06)
        const shown = esc(f.text.replace('{form}', form));
        return item(kind('hunt', inf, col, ` data-lcs-frame="${esc(fid)}"`), sentence(shown), optsHtml(o, at));
      });
    } else throw new Error(`verb-forms screen: mode "${mode}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="verb-forms" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }

  // the answer key: the printed page with every answer in coral
  let h = out.bodyHtml;
  const css = [`[data-lcs-key]{position:relative}[data-lcs-key]::after{content:attr(data-lcs-key);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 20px 'Baloo 2',cursive;color:${CORAL};white-space:nowrap;pointer-events:none}`];
  // a gap cell of a table: data-lcs-cell="gap" data-lcs-form="X" … ><span class="ws-blankbox"
  h = h.replace(/(data-lcs-cell="gap" data-lcs-form="([^"]*)"[^>]*>)(<span class="ws-blankbox")/g, (s, a, f, b) => `${a}${b} data-lcs-key="${f}"`);
  // a sentence lane (gap): the lane's form into its dashed gap box
  h = h.replace(/(data-lcs-render="gap"[^>]*data-lcs-form="([^"]*)"[\s\S]*?)(<span class="ws-blankbox" data-lcs-gapbox)/g, (s, a, f, b) => `${a}${b} data-lcs-key="${f}"`);
  if (mode === 'choice') {
    for (const [inf, col, fid] of m.rows) css.push(`[data-lcs-frame="${fid}"] [data-lcs-pill="${formOf(bank, unit, inf, col)}"]{outline:4px solid ${CORAL};outline-offset:3px}`);
  } else if (mode === 'hunt') {
    css.push(`[data-lcs-printed-form]{text-decoration:underline;text-decoration-color:${CORAL};text-decoration-thickness:4px;text-underline-offset:4px}`);
    h = h.replace(/(data-lcs-inf="([^"]*)"[\s\S]*?)(<span class="ws-blankbox" data-lcs-infbox)/g, (s, a, f, b) => `${a}${b} data-lcs-key="${f}"`);
  } else if (mode === 'match') {
    const badge = (n) => `<span data-lcs-keynum style="position:absolute;top:-11px;left:50%;transform:translateX(-50%);min-width:24px;height:24px;border-radius:12px;background:${CORAL};color:#fff;font:700 15px/24px 'Baloo 2',cursive;text-align:center">${n}</span>`;
    css.push('.ws-match-item{position:relative}');
    let n = 0;
    if (m.kind === 'tense') {
      for (const inf of m.verbs) {
        n++;
        h = h.replace(new RegExp(`(<div class="ws-match-item" data-lcs-match-left="${inf}"[^>]*>)`), `$1${badge(n)}`);
        h = h.replace(new RegExp(`(<div class="ws-match-item ws-match-item--plain"[^>]*data-lcs-role="target" data-lcs-verb="${inf}" data-lcs-col="past"[^>]*>)`), `$1${badge(n)}`);
      }
    } else {
      // block by block: each pronoun with its form (the left / right items of one block share the block's markup)
      h = h.replace(/(<div data-lcs-matchblock[\s\S]*?)(?=<div data-lcs-matchblock|<div data-lcs-lanes|$)/g, (blk) => {
        for (const col of bank.matchPersons) {
          n++;
          blk = blk.replace(new RegExp(`(<div class="ws-match-item" data-lcs-match-left="[^"]*" data-lcs-col="${col}"[^>]*>)`), `$1${badge(n)}`);
          blk = blk.replace(new RegExp(`(<div class="ws-match-item ws-match-item--plain"[^>]*data-lcs-role="target" data-lcs-col="${col}"[^>]*>)`), `$1${badge(n)}`);
        }
        return blk;
      });
    }
  }
  out.bodyHtml = h + `<style data-lcs-key-css>${css.join('')}</style>`;
  return out;
}

/** the robot's oracle: the right option INDEX for every item, re-derived from the merged bank */
function oracle(items, loc, bank) {
  const unit = bank.exemplar;
  return items.map((it) => {
    const M = it.meta || {};
    const inf = M['data-lcs-verb'], col = M['data-lcs-col'];
    const want = formOf(bank, unit, inf, col);
    const hits = it.options.map((o, i) => (fold(o) === fold(want) ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`verb-forms oracle: ${inf}/${col}: "${want}" offered ${hits.length} times (${it.options.join(', ')})`);
    return hits[0];
  });
}

function interactiveFor(mode, bankOf) {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-kind', 'data-lcs-verb', 'data-lcs-col', 'data-lcs-frame'], instructionKey: mode, screenHeight: 9600,
    oracle: (items, l) => { const loc = (l || 'en').slice(0, 2); return oracle(items, loc, bankOf(loc)); },
  };
}

module.exports = { screenOrKey, oracle, interactiveFor, modeOf, optionsFor, paradigm };
