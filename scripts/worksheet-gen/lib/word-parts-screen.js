/**
 * word-parts-screen.js — Level Set 2026-09-29 (Prefixes, Suffixes and Root Words, PDF + interactive): the screen
 * version (tap-choice) and the answer key for G2-359 and its five faces, built from the printed page's own meta
 * (the SAME instance: fresh rng, same seed — render-instance asserts meta identity), plus the robot's INDEPENDENT
 * oracle, which re-derives every answer from the merged bank (never from the page's marks).
 *
 *   base               (G2-359)  a word from the strip → tap the root word of its wall
 *   picture-family     (G1-397)  a picture → tap the word built from the picture's word (the card's own bricks)
 *   root-word          (G2-375)  three family words → tap their root (the roots of the page's open cards)
 *   prefix-key         (G2-376)  what the new word means + its base → tap the prefix (the key)
 *   who-does-it        (G3-398)  a person + a base word → tap the person word (the page's person words)
 *   family-in-sentence (G3-399)  a sentence with a gap → tap the word that fits (its block's words)
 * The answer key is the printed page with every answer in coral: a written answer SEATED on its own writing row
 * (key-on-row.js — on the base rule, x-height to the dashed midline), a circled answer outlined.
 */
'use strict';
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const { seatOnRow } = require('./key-on-row.js');
const { fileUri } = require('./b2-common.js');
const { PRONOUNS } = require('../data/b4/pronouns.js');
const SCR_W = 660, OPT_H = 104;   // Cloze's measured screen sizes: 104 page-px reaches the 44 px tap floor at 360 wide
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);

function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center">${top}</div>${body}</div>`;
}
function opt(i, label, correct, w, px = 30) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px">${esc(label)}</span>`;
}
const optW = (n) => (n >= 4 ? 150 : n === 3 ? 200 : 260);
const opts = (labels, correct, px) => `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${labels.map((l, j) => opt(j, l, j === correct, optW(labels.length), px)).join('')}</div>`;
const word = (w, px = 40) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:#3A3530">${esc(w)}</span>`;
const text = (w, px = 28) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;line-height:1.35;color:#3A3530">${esc(w)}</span>`;
const pic = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">`;
const GAP = `<span style="display:inline-block;width:110px;height:34px;border:3px dashed ${CORAL};border-radius:10px;vertical-align:middle;margin:0 6px"></span>`;
const ARROW = `<span style="font-size:40px;color:#146B5E;font-weight:800">&#8594;</span>`;

/** Three options for item i: its own answer + the next two DIFFERENT answers of the page, the right one at i % 3. */
function rotation(list, i) {
  const own = list[i];
  const others = [];
  for (let k = 1; k < list.length && others.length < 2; k++) { const x = list[(i + k) % list.length]; if (x !== own && !others.includes(x)) others.push(x); }
  const at = slotFor(own + '|' + i, others.length + 1);   // never i % 3 (a diagonal tell, 2026-10-06)
  const o = others.slice();
  o.splice(at, 0, own);
  return { opts: o, at };
}

const famIndex = (bank) => new Map([...(bank.families || []), ...(bank.rootFamilies || []), ...(bank.picFamilies || [])].map((f) => [f.id, f]));
const peopleByKey = () => Object.fromEntries(PRONOUNS.en.people.map((p) => [p.key, p]));
const agentAnswer = (bank, key) => { const a = (bank.agents || []).find((x) => x.key === key); const p = peopleByKey()[key]; return a && p ? (a.answer[p.depicted] || a.answer.any) : null; };
const hy = (p) => `${p}-`;

/** The k-th writing row (0-based) after `needle`, with `text` seated on it. */
function seatNth(html, needle, k, t) {
  const at = html.indexOf(needle);
  if (at < 0) throw new Error(`word-parts key: no element "${needle.slice(0, 60)}"`);
  let from = at;
  for (let i = 0; ; i++) {
    const rel = html.slice(from).search(/<svg[^>]*data-lcs-prim="writing-row"/);
    if (rel < 0) throw new Error(`word-parts key: no writing row ${k} after "${needle.slice(0, 60)}"`);
    const s = from + rel;
    const e = html.indexOf('</svg>', s) + 6;
    if (i === k) return html.slice(0, s) + seatOnRow(html.slice(s, e), t, { fill: CORAL, font: 'baloo2-700', em: 0.64 }) + html.slice(e);
    from = e;
  }
}

function screenOrKey(mode, built, ctx, loc, bank) {
  const m = built.meta;
  const out = { bodyHtml: built.bodyHtml, meta: m };
  // ids may repeat across sections (it: a word family and a picture family both 'latte'): each page looks up ITS section
  const byId = (list) => new Map((list || []).map((f) => [f.id, f]));
  const wordFams = byId(bank.families), rootFams = byId([...(bank.families || []), ...(bank.rootFamilies || [])]), picFams = byId(bank.picFamilies);
  const rootOf = (id, map = rootFams) => { const f = map.get(id); if (!f) throw new Error(`word-parts screen: no family ${id}`); return f.root.word; };
  const mode0 = mode === 'base' ? 'base' : (m.mode || mode);

  if (ctx.interactive) {
    let items = [];
    if (mode0 === 'base') {
      const roots = m.families.map((id) => rootOf(id, wordFams));
      items = m.bank.map((w, i) => item(`data-lcs-word="${esc(w)}"`, `${word(w, 46)}${ARROW}${GAP}`, opts(roots, m.families.indexOf(m.bankFamilies[i]))));
    } else if (mode0 === 'picture-family') {
      items = m.families.map((id, i) => {
        const f = picFams.get(id);
        const foils = m.foils[i].slice();
        const labels = []; for (let s = 0; s < m.foils[i].length + 1; s++) labels.push(s === m.slots[i] ? m.members[i] : foils.shift());
        return item(`data-lcs-word="${esc(id)}" data-lcs-picfam="${esc(id)}"`, pic(fileUri(f.root.pic.theme, f.root.pic.noun), 150), opts(labels, m.slots[i], labels.length >= 4 ? 26 : 30));
      });
    } else if (mode0 === 'root-word') {
      const open = m.families.map((id, i) => ({ id, i })).filter((x) => x.id !== m.worked);
      const roots = open.map((x) => rootOf(x.id));
      items = open.map((x, j) => {
        const r = rotation(roots, j);
        const ws = m.members[x.i];
        return item(`data-lcs-word="${esc(ws.join(' · '))}" data-lcs-words="${esc(ws.join('|'))}"`, ws.map((w) => word(w, 34)).join(text('·', 30)), opts(r.opts, r.at));
      });
    } else if (mode0 === 'prefix-key') {
      const rowsBank = bank.prefixKey.rows;
      items = m.rows.map((base, i) => {
        const row = rowsBank.find((r) => r.base === base && r.prefix === m.answers[i]);
        if (!row) throw new Error(`word-parts screen: no prefix row ${base}`);
        return item(`data-lcs-word="${esc(row.word)}" data-lcs-base="${esc(base)}" data-lcs-gloss="${esc(row.gloss)}"`,
          `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${text(row.gloss, 26)}<div style="display:flex;align-items:center;gap:10px">${GAP}${word(base, 44)}</div></div>`,
          opts(m.key.map(hy), m.key.indexOf(m.answers[i])));
      });
    } else if (mode0 === 'who-does-it') {
      const people = peopleByKey();
      const base = (key) => (bank.agents.find((a) => a.key === key) || {}).base;
      items = m.people.map((key, i) => {
        const p = people[key];
        const r = rotation(m.answers, i);
        return item(`data-lcs-word="${esc(base(key))}" data-lcs-person="${esc(key)}"`, `${pic(fileUri(p.pic.theme, p.pic.noun), 130)}${word(base(key), 44)}${ARROW}${GAP}`, opts(r.opts, r.at));
      });
    } else if (mode0 === 'family-in-sentence') {
      m.families.forEach((id, bi) => {
        const ss = bank.sentences[id];
        m.answers[bi].forEach((w) => {
          const s = ss.find((x) => x.word === w);
          const [pre, post] = String(s.frame).split('{gap}');
          const labels = m.courses[bi];
          items.push(item(`data-lcs-word="${esc(s.frame)}" data-lcs-fam="${esc(id)}"`, `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1.35;color:#3A3530">${esc(pre)}${GAP}${esc(post || '')}</span>`,
            opts(labels, labels.indexOf(w), 26)));
        });
      });
    } else throw new Error(`word-parts screen: mode "${mode0}" has no screen`);
    out.bodyHtml = `<div data-ws-content data-lcs-type="word-parts" data-lcs-screen="${mode0}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }

  // the answer key
  const css = [];
  let h = out.bodyHtml;
  if (mode0 === 'base') {
    for (const id of m.families) {
      const ws = m.bank.filter((w, i) => m.bankFamilies[i] === id);
      ws.forEach((w, k) => { h = seatNth(h, `data-lcs-wall="${esc(id)}"`, k, w); });
    }
  } else if (mode0 === 'picture-family') {
    css.push(`[data-lcs-pf-brick][data-lcs-role="member"]{outline:4px solid ${CORAL};outline-offset:3px;border-radius:10px}`);
  } else if (mode0 === 'root-word') {
    m.families.forEach((id) => { if (id !== m.worked) h = seatNth(h, `data-lcs-family="${esc(id)}"`, 0, rootOf(id)); });
  } else if (mode0 === 'prefix-key') {
    m.answers.forEach((p, i) => { h = seatNth(h, `data-lcs-prow="${i + 1}"`, 0, p); });
  } else if (mode0 === 'who-does-it') {
    m.people.forEach((key, i) => { h = seatNth(h, `data-lcs-person="${esc(key)}"`, 0, m.answers[i]); });
  } else if (mode0 === 'family-in-sentence') {
    let n = 0;
    m.answers.forEach((ws) => ws.forEach((w) => { n++; h = seatNth(h, `data-lcs-sentence="${n}"`, 0, w); }));
  }
  out.bodyHtml = h + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
  return out;
}

/** The robot's oracle: the right option INDEX for every item, re-derived from the merged bank. */
function oracle(mode, items, loc, bank) {
  const fams = [...(bank.families || []), ...(bank.rootFamilies || []), ...(bank.picFamilies || [])];
  const one = (labels, want, what) => {
    const hits = labels.map((l, i) => (low(l, loc) === low(want, loc) ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`word-parts oracle: ${what}: "${want}" offered ${hits.length} times`);
    return hits[0];
  };
  return items.map((it) => {
    const L = it.options, M = it.meta || {};
    if (mode === 'base') {
      const f = (bank.families || []).filter((x) => (x.members || []).some((mm) => mm.word === it.label));   // the walls stand on bank.families only
      if (f.length !== 1) throw new Error(`word-parts oracle: "${it.label}" is a member of ${f.length} families`);
      return one(L, f[0].root.word, it.label);
    }
    if (mode === 'picture-family') {
      const f = (bank.picFamilies || []).find((x) => x.id === M['data-lcs-picfam']);
      const hits = L.map((l, i) => ((f.members || []).some((mm) => mm.word === l) ? i : -1)).filter((i) => i >= 0);
      if (hits.length !== 1) throw new Error(`word-parts oracle: picture ${f.id}: ${hits.length} members offered`);
      return hits[0];
    }
    if (mode === 'root-word') {
      const ws = String(M['data-lcs-words']).split('|');
      const f = [...(bank.families || []), ...(bank.rootFamilies || [])].filter((x) => ws.every((w) => (x.members || []).some((mm) => mm.word === w)));
      if (f.length !== 1) throw new Error(`word-parts oracle: ${ws} belong to ${f.length} families`);
      return one(L, f[0].root.word, ws.join());
    }
    if (mode === 'prefix-key') {
      const r = bank.prefixKey.rows.find((x) => x.base === M['data-lcs-base'] && x.word === it.label && x.gloss === M['data-lcs-gloss']);
      if (!r) throw new Error(`word-parts oracle: no prefix row ${it.label}`);
      return one(L, hy(r.prefix), it.label);
    }
    if (mode === 'who-does-it') return one(L, agentAnswer(bank, M['data-lcs-person']), M['data-lcs-person']);
    if (mode === 'family-in-sentence') {
      const s = (bank.sentences[M['data-lcs-fam']] || []).find((x) => x.frame === it.label);
      if (!s) throw new Error('word-parts oracle: no sentence frame');
      return one(L, s.word, s.frame);
    }
    throw new Error(`word-parts oracle: mode ${mode}`);
  });
}

module.exports = { screenOrKey, oracle, SCR_W, OPT_H };
