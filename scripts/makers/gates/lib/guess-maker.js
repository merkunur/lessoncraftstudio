/**
 * Guessability + answer position for MAKER pages (task 4, 2026-11-01) — qa/guessability.js extended to every answer the
 * maker screens grade: the marks screens (screen.js derive: type / choice / select / pair / place) and the declared
 * screens (the type's `interactive` spec: tap-choice / tap-select / type-number), read from the rendered page.
 *
 * "Can a child score without knowing?" — every strategy below ignores the question. A strategy FAILS a group when its
 * pooled score beats chance by MARGIN with z ≥ Z_FAIL, or solves whole pages (the same rule and the same constants as
 * qa/guessability.js: never moved here).
 *
 *   choice   qa/guessability choicePicks (slot, rotation, number rank, label length, parts, shared tokens)
 *            + the option with the fewest / most pictures, the smallest / biggest box ("the big chip is right")
 *   select   first half / second half / alternate (reading order); every-other in a group
 *   blank    an OPTIONAL write box ("leave it empty if …"): leave every one empty, against 1/2
 *   type     the pool's most common answer; the box's own index (box 1 → 1, box 2 → 2…); the index from the end;
 *            the previous answer + 1; a number printed in the box's own card (the echo tell)
 *   pair     item k ↔ target k (reading order); reversed; the target in the same row; the nearest target
 *   place    always bin k; alternate bins; bins in reading order
 */
'use strict';
const path = require('path');
const G = require(path.join(__dirname, '..', '..', '..', 'worksheet-gen', 'qa', 'guessability.js'));

const MARGIN = G.MARGIN, PAGE_FRAC = G.PAGE_FRAC, WARN_MARGIN = 0.05, MIN_PAGE_Q = 4, Z_FAIL = 3.5, Z_WARN = 3.0;

/** reading order: top to bottom (rows within 2 % of the page), then left to right — by each item's CENTRE (2026-11-02: by
 * the top-left corner a big picture sorted before a small one beside it, and "the first half" looked like a tell on K-040) */
function readingOrder(items) {
  return items.map((it, j) => ({ j, x: +it.x || 0, y: +it.y || 0 })).sort((a, b) => (Math.abs(a.y - b.y) > 2 ? a.y - b.y : a.x - b.x)).map((o) => o.j);
}

/**
 * Runs INSIDE a page (serialised). Reads every answer a marks screen grades, the way screen.js derive does, plus what a
 * child SEES per option (pictures, box size) and per write box (its card's printed numbers, its card index).
 * `model` = the output of screen.derive (parts with .dom indices); returns the bundle list of this page.
 */
function enrichMarks(model) {
  const all = Array.prototype.slice.call(document.querySelectorAll('*'));
  const page = document.querySelector('[data-lcs-page]');
  const pr = page.getBoundingClientRect();
  const cards = Array.prototype.slice.call(document.querySelectorAll('[data-lcs-card], .ws-card'));
  const nums = (s) => (String(s).match(/-?\d+/g) || []).map(Number);
  const cardOf = (el) => (el.closest && el.closest('[data-lcs-card], .ws-card')) || null;
  const out = [];
  for (const p of model.parts) {
    if (p.cls === 'choice') {
      out.push({ kind: 'choice', items: p.items.map((it) => ({ options: it.options.map((o) => { const el = all[o.dom]; const r = el.getBoundingClientRect(); return { label: o.label, imgs: el.querySelectorAll('img').length + el.querySelectorAll('svg').length, area: r.width * r.height, x: o.x + (o.w || 0) / 2, y: o.y + (o.h || 0) / 2 }; }), answer: it.answer })) });
    } else if (p.cls === 'select') {
      out.push({ kind: 'select', items: p.items.map((it) => ({ x: it.x + (it.w || 0) / 2, y: it.y + (it.h || 0) / 2, answer: !!it.answer, group: it.meta['data-lcs-group'] || null, want: it.meta['data-lcs-want'] != null ? +it.meta['data-lcs-want'] : null })) });
    } else if (p.cls === 'type') {
      out.push({ kind: 'type', items: p.items.map((it, i) => { const el = all[it.dom]; const c = cardOf(el); let cardNums = []; if (c) { const clone = c.cloneNode(true); clone.querySelectorAll('[data-lcs-answer]').forEach((b) => b.remove()); cardNums = nums(clone.textContent); } return { answer: String(it.answer), idx: i, cardIdx: c ? cards.indexOf(c) : -1, cardNums, optional: el.hasAttribute('data-lcs-optional'), x: it.x + (it.w || 0) / 2, y: it.y + (it.h || 0) / 2 }; }) });
    } else if (p.cls === 'pair') {
      out.push({ kind: 'pair', items: p.items.map((it) => ({ x: it.x + (it.w || 0) / 2, y: it.y + (it.h || 0) / 2, answer: String(it.answer) })), targets: p.targets.map((t) => ({ x: t.x + (t.w || 0) / 2, y: t.y + (t.h || 0) / 2, id: String(t.id) })) });
    } else if (p.cls === 'place') {
      out.push({ kind: 'place', items: p.items.map((it) => ({ x: it.x + (it.w || 0) / 2, y: it.y + (it.h || 0) / 2, answer: String(it.answer) })), bins: p.bins.map((b) => ({ id: String(b.id), x: b.x + (b.w || 0) / 2, y: b.y + (b.h || 0) / 2 })) });
    }
  }
  return { bundles: out, page: { w: pr.width, h: pr.height } };
}

/** Runs INSIDE a page: the declared screen's answers, read as render-instance.js reads them (spec = type.interactive). */
function readDeclared(sp) {
  const page = document.querySelector('[data-lcs-page]');
  const pr = page.getBoundingClientRect();
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: ((r.left + r.width / 2 - pr.left) / pr.width) * 100, y: ((r.top + r.height / 2 - pr.top) / pr.height) * 100, area: r.width * r.height }; };
  const items = Array.prototype.slice.call(document.querySelectorAll(sp.item));
  const cards = Array.prototype.slice.call(document.querySelectorAll('[data-lcs-card], .ws-card'));
  const nums = (s) => (String(s).match(/-?\d+/g) || []).map(Number);
  if (sp.kind === 'tap-choice') {
    const its = [];
    for (const el of items) {
      const opts = Array.prototype.slice.call(el.querySelectorAll(sp.option));
      if (opts.length < 2) continue;
      its.push({ options: opts.map((o) => ({ label: o.getAttribute('data-lcs-label') || o.textContent.trim(), imgs: o.querySelectorAll('img').length + o.querySelectorAll('svg').length, ...box(o) })), answer: opts.findIndex((o) => o.hasAttribute(sp.answerAttr)) });
    }
    return its.length ? [{ kind: 'choice', items: its, pictures: !!sp.pictureOptions }] : [];
  }
  if (sp.kind === 'tap-select') return items.length ? [{ kind: 'select', items: items.map((el) => ({ ...box(el), answer: el.hasAttribute(sp.answerAttr), group: null, want: null })) }] : [];
  if (sp.kind === 'type-number' || sp.kind === 'type-word') {
    return items.length ? [{ kind: 'type', items: items.map((el, i) => { const c = (el.closest && el.closest('[data-lcs-card], .ws-card')) || null; let cardNums = []; if (c) { const clone = c.cloneNode(true); clone.querySelectorAll(sp.item.split(' ').pop()).forEach((b) => b.remove()); cardNums = nums(clone.textContent); } return { answer: String(el.getAttribute(sp.answerAttr) || ''), idx: i, cardIdx: c ? cards.indexOf(c) : -1, cardNums, optional: el.hasAttribute('data-lcs-optional'), ...box(el) }; }) }] : [];
  }
  return null;   // spell / paint / trace / clock / grid / edit: no position instrument here (reported by the gate)
}

/** the no-knowledge picks for one choice question (index → option index), the qa/guessability set + what a child sees */
function choiceStrategies(opts, i, pictures) {
  const p = G.choicePicks(opts, i, pictures);
  const rank = (key, name) => {
    const vals = opts.map((o) => o[key]);
    if (new Set(vals).size < 2) return;
    const idx = vals.map((v, j) => [v, j]).sort((a, b) => a[0] - b[0]);
    const uniq = (v) => vals.filter((x) => x === v).length === 1;
    if (uniq(idx[0][0])) p[name + '-min'] = idx[0][1];
    if (uniq(idx[idx.length - 1][0])) p[name + '-max'] = idx[idx.length - 1][1];
  };
  if (opts.some((o) => o.imgs)) rank('imgs', 'imgs');
  // box size: a 10 % difference is visible; equal boxes (rounded) give no rank
  const rounded = opts.map((o) => ({ ...o, areaR: Math.round(o.area / Math.max(1, Math.max(...opts.map((x) => x.area))) * 10) }));
  const areas = rounded.map((o) => o.areaR);
  if (new Set(areas).size > 1) { const tmp = {}; const idx = areas.map((v, j) => [v, j]).sort((a, b) => a[0] - b[0]); const uniq = (v) => areas.filter((x) => x === v).length === 1; if (uniq(idx[0][0])) tmp['area-min'] = idx[0][1]; if (uniq(idx[idx.length - 1][0])) tmp['area-max'] = idx[idx.length - 1][1]; Object.assign(p, tmp); }
  return p;
}

/**
 * Measure one group (the pages of one template × level × locale). pages = [[bundle, …], …] (one list per page).
 * @returns {Array<{kind, pages, questions, chance, strategies, verdict, worst}>}
 */
function measure(pages) {
  const byKind = {};
  // an OPTIONAL write box (right when it holds the number, or stays empty — "leave it empty if the sum is right / you do
  // not need that coin"): leaving it empty is a yes/no decision, measured on its own against 1/2 ('blank': "leave every
  // box empty"); the boxes stay in the 'type' group for every other strategy, where an empty optional box is no longer
  // "the most common answer" against 1/(distinct answers) — that scored an empty box beside a correct sum as a tell
  // however balanced the page (2026-11-01). "Fill every box" is no strategy: the number still has to be right.
  const split = (b) => (b.kind === 'type' && b.items.some((it) => it.optional) ? [b, { kind: 'blank', items: b.items.filter((it) => it.optional) }] : [b]);
  pages.forEach((bs, pg) => { for (const b0 of bs || []) for (const b of split(b0)) if (b.items.length) (byKind[b.kind] = byKind[b.kind] || []).push({ ...b, pg }); });
  const out = [];
  for (const [kind, list] of Object.entries(byKind)) {
    const S = {}; let q = 0, chanceSum = 0;
    const qOnPage = {}, pLuck = {};
    const hit = (name, ok, page) => { const s = S[name] || (S[name] = { tried: 0, right: 0, pages: new Set(), pagesTried: new Set(), perPage: {} }); s.tried++; if (ok) s.right++; s.pagesTried.add(page); s.perPage[page] = (s.perPage[page] || 0) + 1; if (!ok) s.pages.add('x' + page); };
    const ask = (page, chance) => { q++; qOnPage[page] = (qOnPage[page] || 0) + 1; chanceSum += chance; pLuck[page] = (pLuck[page] === undefined ? 1 : pLuck[page]) * chance; };
    if (kind === 'type') {
      // the pool's answer set gives the chance (a blind child picks one of the answers the group ever takes)
      const counts = {};
      list.forEach((b) => b.items.forEach((it) => { counts[it.answer] = (counts[it.answer] || 0) + 1; }));
      const distinct = Object.keys(counts).length;
      const optBlank = list.every((b) => b.items.every((it) => it.answer !== '' || it.optional));
      const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]).filter(([a]) => !(optBlank && a === ''));
      const mode = ranked.length ? ranked[0][0] : null;
      const chance = 1 / Math.max(2, distinct);
      for (const b of list) {
        const n = b.items.length;
        b.items.forEach((it, i) => {
          ask(b.pg, chance);
          if (mode !== null) hit('const-' + mode, it.answer === mode, b.pg);
          hit('index', it.answer === String(i + 1), b.pg);
          hit('index-rev', it.answer === String(n - i), b.pg);
          if (it.cardIdx >= 0) hit('card-index', it.answer === String(it.cardIdx + 1), b.pg);
          if (i > 0 && /^\d+$/.test(b.items[i - 1].answer)) hit('prev+1', it.answer === String(+b.items[i - 1].answer + 1), b.pg);
          // two empty optional boxes in a row are the yes/no decision ('blank'), not a number copied from the box before
          if (i > 0) hit('same-as-prev', it.answer === b.items[i - 1].answer && !(optBlank && it.answer === ''), b.pg);
          if (it.cardNums && it.cardNums.length) hit('echo', it.cardNums.map(String).includes(it.answer), b.pg);
        });
      }
    } else if (kind === 'blank') {
      for (const b of list) b.items.forEach((it) => {
        ask(b.pg, 0.5);
        hit('leave-empty', it.answer === '', b.pg);
      });
    } else if (kind === 'choice') {
      for (const b of list) b.items.forEach((it, i) => {
        const opts = it.options; if (opts.length < 2) return;
        ask(b.pg, 1 / opts.length);
        for (const [name, pick] of Object.entries(choiceStrategies(opts, i, b.pictures))) hit(name, pick === it.answer, b.pg);
      });
    } else if (kind === 'select') {
      for (const b of list) {
        const items = b.items; if (items.length < 2) continue;
        const ord = readingOrder(items), pos = new Map(ord.map((j, k) => [j, k])), half = items.length / 2;
        const grp = {};
        items.forEach((it, j) => {
          ask(b.pg, 0.5); const k = pos.get(j);
          hit('first-half', it.answer === (k < half), b.pg); hit('second-half', it.answer === (k >= half), b.pg);
          hit('alternate-0', it.answer === (k % 2 === 0), b.pg); hit('alternate-1', it.answer === (k % 2 === 1), b.pg);
          if (it.group != null) { grp[it.group] = (grp[it.group] || 0) + 1; hit('first-N-of-group', it.answer === (grp[it.group] <= (it.want || 0)), b.pg); }
        });
      }
    } else if (kind === 'pair') {
      for (const b of list) {
        const items = b.items, ts = b.targets; if (items.length < 2 || ts.length < 2) continue;
        const io = readingOrder(items), to = readingOrder(ts);
        const posI = new Map(io.map((j, k) => [j, k]));
        items.forEach((it, j) => {
          ask(b.pg, 1 / ts.length); const k = posI.get(j);
          hit('as-shown', ts[to[k % ts.length]].id === it.answer, b.pg);
          hit('reversed', ts[to[ts.length - 1 - (k % ts.length)]].id === it.answer, b.pg);
          const row = ts.slice().sort((a, c) => Math.abs(a.y - it.y) - Math.abs(c.y - it.y))[0];
          hit('same-row', row.id === it.answer, b.pg);
          const near = ts.slice().sort((a, c) => Math.hypot(a.x - it.x, a.y - it.y) - Math.hypot(c.x - it.x, c.y - it.y))[0];
          hit('nearest', near.id === it.answer, b.pg);
        });
      }
    } else if (kind === 'place') {
      for (const b of list) {
        const items = b.items, bins = b.bins; if (items.length < 2 || bins.length < 2) continue;
        const io = readingOrder(items), posI = new Map(io.map((j, k) => [j, k]));
        items.forEach((it, j) => {
          ask(b.pg, 1 / bins.length); const k = posI.get(j);
          for (let c = 0; c < Math.min(bins.length, 5); c++) hit('bin-' + c, bins[c].id === it.answer, b.pg);
          hit('alternate', bins[k % bins.length].id === it.answer, b.pg);
          hit('alternate-rev', bins[(bins.length - 1 - k % bins.length)].id === it.answer, b.pg);
          const near = bins.slice().sort((a, c) => Math.hypot(a.x - it.x, a.y - it.y) - Math.hypot(c.x - it.x, c.y - it.y))[0];
          hit('nearest-bin', near.id === it.answer, b.pg);
        });
      }
    }
    if (!q) continue;
    const chance = chanceSum / q;
    const strategies = Object.entries(S).map(([name, s]) => {
      const missing = q - s.tried;
      const right = s.right + missing * chance;
      const big = [...s.pagesTried].filter((pg) => (qOnPage[pg] || 0) >= MIN_PAGE_Q && s.perPage[pg] === qOnPage[pg]);
      const solved = big.filter((pg) => !s.pages.has('x' + pg)).length;
      const luck = big.length ? big.reduce((a, pg) => a + (pLuck[pg] || 0), 0) / big.length : 0;
      const score = right / q;
      const z = (score - chance) / Math.sqrt(Math.max(1e-9, chance * (1 - chance) / q));
      const pagesSolved = big.length ? solved / big.length : 0;
      const pl = Math.max(1e-6, luck), zp = big.length ? (pagesSolved - pl) / Math.sqrt(pl * (1 - pl) / big.length) : 0;
      const pageBad = big.length >= 20 && solved >= 3 && pagesSolved - luck > PAGE_FRAC && zp >= Z_FAIL;
      const pageWarn = big.length >= 20 && solved >= 3 && pagesSolved - luck > PAGE_FRAC / 2 && zp >= Z_WARN;
      const over = score - chance;
      const v = ((over > MARGIN && z >= Z_FAIL) || pageBad) ? 'FAIL' : ((over > WARN_MARGIN && z >= Z_WARN) || pageWarn) ? 'WARN' : 'PASS';
      return { name, tried: s.tried, score, z, pagesSolved, bigPages: big.length, v };
    }).filter((s) => s.tried >= 6).sort((a, b) => b.score - a.score);
    const rank = { FAIL: 2, WARN: 1, PASS: 0 };
    let worst = null;
    for (const s of strategies) if (!worst || rank[s.v] > rank[worst.v] || (rank[s.v] === rank[worst.v] && s.score > worst.score)) worst = s;
    out.push({ kind, pages: new Set(list.map((b) => b.pg)).size, questions: q, chance, strategies, verdict: worst ? worst.v : 'PASS', worst });
  }
  return out;
}

module.exports = { enrichMarks, readDeclared, measure, choiceStrategies, readingOrder, MARGIN, Z_FAIL };
