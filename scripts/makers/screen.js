/**
 * Screen from the answer marks (INTERACTIVE-AND-SHARING §B, 2026-11-01) — the generic screen engine of the worksheet
 * makers. A template that declares no `interactive` but whose page carries answer marks gets a screen built IN THE
 * BROWSER from the same page: the marks every print-only template already carries for its answer key become tap
 * targets and write boxes laid over the page, graded by emit/interactive-runtime-core.js's composite `marks` runtime.
 * Browser-safe (bundled into every maker); the same code runs in Node under puppeteer for the gate.
 *
 *   mark on the page                                             → part of the screen
 *   .ws-answerbox[data-lcs-answer] / [data-lcs-answer]:empty     → type (a number pad, or the locale's letter pad; a
 *     (not a drop target; data-lcs-typed = the typed form,          symbol pad when every answer is < > = + −)
 *      data-lcs-alts / data-lcs-range / data-lcs-set honoured)
 *   svg[data-lcs-prim=hundreds-chart] rect[data-lcs-missing]    → type (the chart's empty cells)
 *   [data-lcs-correct] among its like siblings, one right       → choice (the siblings are the options; a
 *     (or [data-lcs-choice] groups: the nearest ancestor            [data-lcs-card] is never the group — a card may
 *      holding ≥ 2 choices)                                        hold several groups)
 *   [data-lcs-correct] among like siblings, several right        → select (circle both equal groups)
 *   [data-lcs-pick] (explicit candidates; right = key-ring or    → select; "any N" per group when a pick or an ancestor
 *      correct) / [data-lcs-key-ring] among like siblings           carries data-lcs-want (countGroups)
 *   [data-lcs-key-badge="id"] items + [data-lcs-pair="id"]       → pair (mutual when the items are the targets)
 *   [data-lcs-bin="id"] palette + [data-lcs-drop][data-lcs-answer=id] → place
 *   [data-lcs-cover] (one picture, never an answer)              → ctx.cover: the child taps it once it is memorised and
 *                                                                  it stays hidden (Look, Fold and Find, 2026-11-02)
 *
 * The marks are read from the SCREEN BUILD of the page (runtime.js makePage({ screen: true }) → ctx.screen, the build
 * on which a template stamps the marks its key build stamps, without the key's drawn samples); the student is served
 * that page with every data-lcs-* attribute outside ALLOW stripped (the answers travel only in DECK_BUNDLE).
 * Items are listed in DOM order, never "right first".
 */
'use strict';
const core = require('../worksheet-gen/emit/interactive-runtime-core.js');
const { letterPad } = require('../worksheet-gen/lib/letter-pad.js');

/** the data-lcs-* attributes a served screen page keeps (structure, never an answer) */
const ALLOW = new Set(['page', 'title', 'instruction', 'body', 'prim', 'card', 'keep', 'ink', 'decor', 'page-number', 'art', 'region', 'scene', 'grid', 'figure', 'print']);

/**
 * Runs INSIDE the page document (serialised: self-contained, no closure). Returns the model: parts with rects in % of
 * [data-lcs-page] and the rendered px size, each item's DOM index, and every reason the page cannot be a screen.
 */
function derive() {
  const D = document, q = (s, root) => Array.prototype.slice.call((root || D).querySelectorAll(s));
  const page = D.querySelector('[data-lcs-page]');
  const errors = [];
  if (!page) return { errors: ['no [data-lcs-page]'], parts: [] };
  const pr = page.getBoundingClientRect();
  const all = q('*'); const domIndex = new Map(); all.forEach((e, i) => domIndex.set(e, i));
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: (r.left - pr.left) / pr.width * 100, y: (r.top - pr.top) / pr.height * 100, w: r.width / pr.width * 100, h: r.height / pr.height * 100, px: r.width, py: r.height, dom: domIndex.get(el) }; };
  const txt = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim();
  const sig = (el) => el.tagName.toLowerCase() + '|' + (el.getAttribute('class') || '').trim().split(/\s+/).sort().join('.');
  const likeSiblings = (el) => el.parentElement ? Array.prototype.filter.call(el.parentElement.children, (c) => sig(c) === sig(el)) : [el];
  const label = (el, fallback) => el.getAttribute('data-lcs-label') || (el.tagName.toLowerCase() === 'img' ? (el.getAttribute('alt') || '') : txt(el)) || fallback;
  const cardNo = (el) => { const cards = q('[data-lcs-card]'); const c = el.closest('[data-lcs-card]'); return c ? String(cards.indexOf(c) + 1) : ''; };
  const parts = [];
  const seen = new Set();
  // 1. place: bins + drop targets
  const bins = q('[data-lcs-bin]'), drops = q('[data-lcs-drop]');
  if (bins.length || drops.length) {
    if (bins.length < 2 || !drops.length) errors.push('place: ' + bins.length + ' bins and ' + drops.length + ' drop targets (need ≥ 2 bins and ≥ 1 target)');
    else {
      // a drop inside [data-lcs-colour-count] (K-454, 2026-11-01) belongs to a COUNTED group: the group is right when it
      // holds that many of each bin, wherever they sit (its own answer is the key's placeholder)
      const groups = q('[data-lcs-colour-count]');
      const items = drops.map((el, i) => {
        const a = el.getAttribute('data-lcs-answer'); if (!a) errors.push('place: a drop target without data-lcs-answer'); seen.add(el);
        const g = el.closest('[data-lcs-colour-count]');
        return { ...box(el), answer: a, label: label(el, String(i + 1)), meta: g ? { 'data-lcs-cgroup': String(groups.indexOf(g)), 'data-lcs-colour-count': g.getAttribute('data-lcs-colour-count') } : {} };
      });
      // a bin's picture travels in DECK_BUNDLE: its marks stripped (G1-475's piece number tag, 2026-11-03) — the served
      // page keeps no data-lcs-* outside ALLOW, the bundle neither
      const bs = bins.map((el, i) => ({ ...box(el), id: el.getAttribute('data-lcs-bin'), label: label(el, String(i + 1)), html: el.querySelector('img,svg') ? el.innerHTML.replace(/\sdata-lcs-[a-z0-9-]+(?:="[^"]*")?/g, '') : '', ...(el.hasAttribute('data-lcs-fill') ? { fill: el.getAttribute('data-lcs-fill') } : {}) }));
      parts.push({ cls: 'place', items, bins: bs, dom: Math.min(...items.map((it) => it.dom)) });
    }
  }
  // 2. type: write boxes and answer cells
  // data-lcs-optional (2026-11-01, G1-447 find the mistakes): a box the child may leave empty — its answer '' means "right
  // when left empty" (a correct sum needs no correction); every box of such a page is optional, so none tells
  const typeEls = q('[data-lcs-answer]').filter((el) => !seen.has(el) && !el.hasAttribute('data-lcs-drop') && !el.hasAttribute('data-lcs-given') && (el.getAttribute('data-lcs-answer') !== '' || el.hasAttribute('data-lcs-optional')) && !el.children.length && !txt(el));
  q('svg[data-lcs-prim="hundreds-chart"] rect[data-lcs-missing]').forEach((el) => typeEls.push(el));
  if (typeEls.length) {
    const items = typeEls.map((el, i) => {
      seen.add(el);
      const shown = el.hasAttribute('data-lcs-missing') ? el.getAttribute('data-lcs-missing') : el.getAttribute('data-lcs-answer');
      const typed = el.getAttribute('data-lcs-typed') || shown;
      const meta = {};
      ['data-lcs-alts', 'data-lcs-range', 'data-lcs-set', 'data-lcs-optional', 'data-lcs-decimal'].forEach((a) => { if (el.hasAttribute(a)) meta[a] = el.getAttribute(a); });
      // a decimal money box (data-lcs-decimal = the separator, 2026-11-01): the written amount travels for grading
      if (meta['data-lcs-decimal'] != null) meta['data-lcs-typed'] = typed;
      if (meta['data-lcs-optional'] != null && typed === '') meta['data-lcs-blank'] = '1';
      return { ...box(el), answer: typed, shown, label: el.getAttribute('data-lcs-label') || cardNo(el) || String(i + 1), meta };
    });
    items.sort((a, b) => a.dom - b.dom);
    parts.push({ cls: 'type', items, dom: items[0].dom });
  }
  // 3. choice / select from [data-lcs-correct]; select from [data-lcs-pick] / [data-lcs-key-ring]
  const picks = q('[data-lcs-pick]');
  const selectItems = [];
  const wantOf = (el) => { const w = el.closest('[data-lcs-want]'); return w ? w.getAttribute('data-lcs-want') : null; };
  const groupOf = (el) => { if (el.hasAttribute('data-lcs-group')) return el.getAttribute('data-lcs-group'); const w = el.closest('[data-lcs-want]'); return w ? 'w' + domIndex.get(w) : null; };
  // a pick inside [data-lcs-sum] (Money "make the amount", 2026-11-01) belongs to a SUM group: the group is right when the
  // values (data-lcs-value) of the picks the child takes add up to the sum — any coins that make the price
  const sums = q('[data-lcs-sum]');
  picks.forEach((el, i) => {
    seen.add(el);
    const want = wantOf(el), sg = el.closest('[data-lcs-sum]');
    const meta = sg ? { 'data-lcs-sumgroup': String(sums.indexOf(sg)), 'data-lcs-sum': sg.getAttribute('data-lcs-sum'), 'data-lcs-value': el.getAttribute('data-lcs-value') } : want != null ? { 'data-lcs-group': groupOf(el), 'data-lcs-want': want } : {};
    if (sg && !/^\d+$/.test(String(el.getAttribute('data-lcs-value')))) errors.push('select: a pick of a sum group without a whole-number data-lcs-value');
    selectItems.push({ ...box(el), answer: el.hasAttribute('data-lcs-key-ring') || el.hasAttribute('data-lcs-correct'), label: label(el, String(i + 1)), meta });
  });
  const choiceItems = [];
  q('[data-lcs-correct]').forEach((el) => {
    if (seen.has(el)) return;
    if (el.hasAttribute('data-lcs-key-ring')) return;   // a ring is a select mark (handled below)
    let group;
    if (el.hasAttribute('data-lcs-choice')) {
      let p = el.parentElement;
      while (p && p !== page && q('[data-lcs-choice]', p).length < 2) p = p.parentElement;
      group = p && p !== page ? q('[data-lcs-choice]', p) : [el];
    } else group = likeSiblings(el);
    const right = group.filter((g) => g.hasAttribute('data-lcs-correct'));
    if (group.length < 2) { errors.push('a right answer (' + sig(el) + ') with no alternatives beside it'); group.forEach((g) => seen.add(g)); return; }
    // a declared choice group has exactly one right option; only like siblings may hold several (circle both equal groups)
    if (el.hasAttribute('data-lcs-choice') && right.length !== 1) { errors.push('a choice group with ' + right.length + ' right options'); group.forEach((g) => seen.add(g)); return; }
    if (right.length === 1) {
      const it = { options: group.map((g, j) => ({ ...box(g), label: label(g, String(j + 1)) })), answer: group.indexOf(el), label: cardNo(el), meta: {} };
      it.dom = it.options[0].dom;
      choiceItems.push(it);
    } else group.forEach((g, j) => selectItems.push({ ...box(g), answer: g.hasAttribute('data-lcs-correct'), label: label(g, String(j + 1)), meta: {} }));
    group.forEach((g) => seen.add(g));
  });
  q('[data-lcs-key-ring]').forEach((el) => {
    if (seen.has(el)) return;
    const group = likeSiblings(el);
    if (group.length < 2) { errors.push('a ring mark (' + sig(el) + ') with nothing beside it to choose from'); seen.add(el); return; }
    group.forEach((g, j) => { seen.add(g); const want = wantOf(g); selectItems.push({ ...box(g), answer: g.hasAttribute('data-lcs-key-ring'), label: label(g, String(j + 1)), meta: want != null ? { 'data-lcs-group': groupOf(g), 'data-lcs-want': want } : {} }); });
  });
  if (choiceItems.length) { choiceItems.sort((a, b) => a.dom - b.dom); parts.push({ cls: 'choice', items: choiceItems, dom: choiceItems[0].dom }); }
  if (selectItems.length) {
    selectItems.sort((a, b) => a.dom - b.dom);
    const grouped = selectItems.filter((it) => it.meta['data-lcs-want'] != null).length;
    const summed = selectItems.filter((it) => it.meta['data-lcs-sumgroup'] != null).length;
    if (grouped && grouped !== selectItems.length) errors.push('select: some candidates carry a want (any N) and some do not');
    if (summed && summed !== selectItems.length) errors.push('select: some candidates belong to a sum group and some do not');
    parts.push({ cls: 'select', items: selectItems, countGroups: grouped > 0, sumGroups: summed > 0, dom: selectItems[0].dom });
  }
  // 4. pair: badge items + pair targets
  const badges = q('[data-lcs-key-badge]').filter((el) => !seen.has(el)), targets = q('[data-lcs-pair]');
  if (badges.length || targets.length) {
    if (!badges.length || targets.length < 2) errors.push('pair: ' + badges.length + ' items with a badge and ' + targets.length + ' targets (need both)');
    else {
      const tIds = targets.map((t) => t.getAttribute('data-lcs-pair'));
      const items = badges.map((el, i) => ({ ...box(el), id: el.hasAttribute('data-lcs-pair') ? el.getAttribute('data-lcs-pair') : 'i' + i, answer: el.getAttribute('data-lcs-key-badge'), label: label(el, String(i + 1)), group: el.getAttribute('data-lcs-pair-group'), meta: {} }));
      const ts = targets.map((el, i) => ({ ...box(el), id: tIds[i], label: label(el, String(i + 1)), group: el.getAttribute('data-lcs-pair-group') }));
      items.forEach((it) => { seen.add(it); });
      parts.push({ cls: 'pair', items, targets: ts, mutual: badges.every((el) => el.hasAttribute('data-lcs-pair')), dom: Math.min(...items.map((it) => it.dom)) });
    }
  }
  parts.sort((a, b) => a.dom - b.dom);
  if (!parts.length && !errors.length) errors.push('no answer marks on the page');
  // 5. a cover ([data-lcs-cover], 2026-11-02 Look, Fold and Find): a picture the child looks at, then taps to hide
  const covers = q('[data-lcs-cover]');
  if (covers.length > 1) errors.push('cover: ' + covers.length + ' pictures to hide (one at most)');
  const cover = covers.length ? (({ x, y, w, h }) => ({ x, y, w, h }))(box(covers[0])) : null;
  return { errors, parts, page: { w: pr.width, h: pr.height }, ...(cover ? { cover, coverLabel: covers[0].getAttribute('data-lcs-label') || '' } : {}) };
}

/**
 * The model (from derive) → the parts + ctx buildInteractive takes; throws with every reason when the page cannot be a
 * screen. Pure (no DOM): the gate and the shell share it.
 */
function plan(model, { locale }) {
  const errors = (model.errors || []).slice();
  const parts = [];
  const ctx = {};
  for (const p of model.parts || []) {
    if (p.cls === 'type') {
      const isInt = (s) => /^\d+$/.test(String(s));
      const dec = (it) => it.meta['data-lcs-decimal'] != null;
      const decOk = (it) => dec(it) && String(it.answer).split(it.meta['data-lcs-decimal']).length === 2 && /^\d+$/.test(String(it.answer).split(it.meta['data-lcs-decimal']).join(''));
      // a set box is numeric when its answer is (a word set — coordinate codes — takes the letter pad, 2026-11-03)
      const numeric = p.items.every((it) => (isInt(it.answer) && !it.meta['data-lcs-alts']) || it.meta['data-lcs-range'] || (it.meta['data-lcs-set'] && (isInt(it.answer) || it.answer === '-')) || it.meta['data-lcs-blank'] || decOk(it)) && p.items.some((it) => !it.meta['data-lcs-blank']);
      const seps = [...new Set(p.items.filter(dec).map((it) => it.meta['data-lcs-decimal']))];
      if (seps.length > 1) errors.push('type: decimal boxes with two separators (' + seps.join(' ') + ')');
      if (p.items.some((it) => dec(it) && !decOk(it))) errors.push('type: a decimal box whose answer is not digits + one separator');
      if (numeric) {
        const digits = Math.max(...p.items.map((it) => it.meta['data-lcs-range'] ? Math.max(...String(it.meta['data-lcs-range']).split('-').map((x) => x.length)) : dec(it) ? String(it.answer).length - 1 : String(it.answer).length), 1);
        ctx.maxDigits = Math.min(4, Math.max(1, digits));
        ctx.pad = 'digits';
        if (seps.length) ctx.sep = seps[0];   // the digit pad gains the separator key (every decimal box needs it: no tell)
        // a set box ("-" = a spare space) and a range box carry their truth in the meta; the answer is a placeholder
        const sets = {};
        for (const it of p.items) if (it.meta['data-lcs-set'] && isInt(it.answer)) (sets[it.meta['data-lcs-set']] = sets[it.meta['data-lcs-set']] || []).push(parseInt(it.answer, 10));
        if (Object.keys(sets).length) ctx.sets = sets;
        for (const it of p.items) if (it.meta['data-lcs-set'] && !sets[it.meta['data-lcs-set']]) errors.push('type: the set ' + it.meta['data-lcs-set'] + ' has no numbers');
        // a set / blank box carries its truth in the meta: its answer is a placeholder
        const ans = (it) => (it.meta['data-lcs-set'] || it.meta['data-lcs-blank'] ? 0 : it.meta['data-lcs-range'] ? (parseInt(String(it.meta['data-lcs-range']).split('-')[0], 10) || 0) : dec(it) ? parseInt(String(it.answer).split(it.meta['data-lcs-decimal']).join(''), 10) : parseInt(it.answer, 10));
        parts.push({ cls: 'type', num: true, items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, answer: ans(it), label: it.label, meta: it.meta })) });
      } else {
        const words = p.items.flatMap((it) => [String(it.answer), ...String(it.meta['data-lcs-alts'] || '').split('|').filter(Boolean)]);
        const chars = [...new Set(words.flatMap((w) => [...w.normalize('NFC').toLocaleLowerCase(locale)]))];
        const hasLetter = chars.some((c) => /\p{L}/u.test(c));
        let keys;
        if (hasLetter) { const lp = letterPad(locale, words); keys = lp.keys; }
        else keys = chars.filter((c) => c !== ' ');
        // a page that mixes number and word boxes (Write It Both Ways, a number of the day, ordinals "21st"): the pad
        // carries all ten digits once any answer holds one — only the answers' own digits would spell them out (2026-11-02)
        if (hasLetter && keys.some((c) => /\d/.test(c))) for (const dgt of '0123456789') if (!keys.includes(dgt)) keys.push(dgt);
        if (keys.length < 2) errors.push('type: the answers use fewer than 2 characters (' + keys.join('') + ')');
        ctx.keys = keys; ctx.pad = 'letters'; ctx.symbolPad = !hasLetter;
        // a WORD set (data-lcs-set on word boxes, 2026-11-03: the codes of one colour, any order): the runtime takes any
        // member once (interactive-runtime-core typeRight, C.wsets); folded as the runtime folds
        const wsets = {};
        const foldW = (w) => String(w).normalize('NFC').toLocaleLowerCase(locale).replace(/\s+/g, ' ').trim();
        for (const it of p.items) if (it.meta['data-lcs-set']) (wsets[it.meta['data-lcs-set']] = wsets[it.meta['data-lcs-set']] || []).push(foldW(it.answer));
        if (Object.keys(wsets).length) ctx.wsets = wsets;
        ctx.maxChars = Math.min(40, Math.max(2, Math.max(...words.map((w) => [...w].length)) + 3));
        parts.push({ cls: 'type', num: false, items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, answer: String(it.answer), label: it.label, meta: it.meta })) });
      }
    } else if (p.cls === 'choice') parts.push({ cls: 'choice', items: p.items.map((it) => ({ options: it.options.map((o) => ({ x: o.x, y: o.y, w: o.w, h: o.h, label: o.label })), answer: it.answer, label: it.label, meta: {} })) });
    else if (p.cls === 'select') {
      // "any N of M" groups are graded by count: the per-item answer is a convention (the first N of each group), so the
      // runtime's rule "something to find, something to leave" holds for the group as the key's rings do
      const seen = {};
      // a sum group's key coins must make its sum (the key's own combination is one right answer)
      if (p.sumGroups) {
        const by = {};
        for (const it of p.items) { const g = it.meta['data-lcs-sumgroup']; by[g] = by[g] || { sum: Number(it.meta['data-lcs-sum']), key: 0, all: 0 }; by[g].all += Number(it.meta['data-lcs-value']); if (it.answer) by[g].key += Number(it.meta['data-lcs-value']); }
        for (const [g, v] of Object.entries(by)) { if (v.key !== v.sum) errors.push('select: sum group ' + g + ' — the key coins make ' + v.key + ', not ' + v.sum); if (v.all === v.sum) errors.push('select: sum group ' + g + ' — every candidate together is the sum'); }
      }
      parts.push({ cls: 'select', countGroups: p.countGroups, ...(p.sumGroups ? { sumGroups: true } : {}), items: p.items.map((it) => { let a = it.answer; if (p.countGroups) { const g = it.meta['data-lcs-group']; seen[g] = (seen[g] || 0) + 1; a = seen[g] <= Number(it.meta['data-lcs-want']); } return { x: it.x, y: it.y, w: it.w, h: it.h, answer: a, label: it.label, meta: it.meta }; }) });
    }
    else if (p.cls === 'pair') parts.push({ cls: 'pair', mutual: p.mutual, items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, id: it.id, answer: it.answer, label: it.label, meta: {} })), targets: p.targets.map((t) => ({ x: t.x, y: t.y, w: t.w, h: t.h, id: t.id, label: t.label })) });
    else if (p.cls === 'place') {
      // a counted group's counts must name bins of the page and add up to the group's targets
      const cg = {};
      for (const it of p.items) if (it.meta['data-lcs-cgroup'] != null) { const g = it.meta['data-lcs-cgroup']; (cg[g] = cg[g] || { n: 0, spec: it.meta['data-lcs-colour-count'] }).n++; }
      const binIds = new Set(p.bins.map((b) => String(b.id)));
      for (const [g, v] of Object.entries(cg)) {
        const pairs = String(v.spec).split(',').map((x) => x.split(':'));
        if (pairs.some(([id, n]) => !binIds.has(id) || !/^\d+$/.test(n))) errors.push('place: counted group ' + g + ' names ' + v.spec);
        else if (pairs.reduce((s, [, n]) => s + Number(n), 0) !== v.n) errors.push('place: counted group ' + g + ' wants ' + v.spec + ' of ' + v.n + ' targets');
      }
      parts.push({ cls: 'place', items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, answer: it.answer, label: it.label, meta: it.meta || {} })), bins: p.bins.map((b) => ({ x: b.x, y: b.y, w: b.w, h: b.h, id: b.id, label: b.label, ...(b.html ? { html: b.html } : {}), ...(b.fill ? { fill: b.fill } : {}) })) });
    }
  }
  if (model.cover) { ctx.cover = model.cover; ctx.coverLabel = model.coverLabel || ''; }
  if (errors.length) { const e = new Error('screen: ' + errors.join('; ')); e.reasons = errors; throw e; }
  // the kind validators of the runtime (every part through its own rules), on a throwaway build
  try { core.buildInteractive({ kind: 'marks', locale, strings: { check: 'x', tryAgain: 'x', youDidIt: 'x', allCorrect: 'x', score: '{n}/{total}', print: 'x' }, ctx, parts }); }
  catch (e) { const err = new Error('screen: ' + e.message); err.reasons = [e.message]; throw err; }
  return { parts, ctx };
}

/** Every data-lcs-* attribute outside ALLOW removed from the tags of an html string (text, style and script untouched). */
function stripMarks(html) {
  // a tag may carry a ">" inside a quoted value (data-lcs-io="4>8"): split on whole tags, quotes respected
  return String(html).split(/(<(?:[^>"']|"[^"]*"|'[^']*')*>)/).map((seg) => (seg.startsWith('<') && !seg.startsWith('</') && !seg.startsWith('<!')
    ? seg.replace(/\s(data-lcs-([a-z0-9-]+))(?:="[^"]*"|='[^']*')?(?=[\s/>])/g, (m, full, name) => (ALLOW.has(name) ? m : ''))
    : seg)).join('');
}

const SCREEN_CSS = [
  'html,body{margin:0;background:#FBF3E4}body{padding:0 0 24px}',
  '.lcs-hint{font-family:Nunito,system-ui,sans-serif;font-weight:800;font-size:1.05rem;color:#3A3530;text-align:center;margin:12px 16px 8px}',
  '.lcs-fit-box{position:relative;margin:0 auto;width:703px;height:945px;overflow:hidden;overflow:clip}',
  '.lcs-fit{position:absolute;left:0;top:0;width:703px;transform-origin:0 0}',
  '.lcs-fit .ws-page{margin:0;box-shadow:0 2px 14px rgba(58,53,48,.12)}',
  '@media print{.lcs-hint{display:none}}',
].join('\n');
const FIT_JS = "(function(){var b=document.querySelector('.lcs-fit-box'),f=document.querySelector('.lcs-fit');function fit(){var k=Math.min(1,(document.documentElement.clientWidth-16)/703);f.style.transform='scale('+k+')';b.style.height=(945*k)+'px';b.style.width=(703*k)+'px'}fit();window.addEventListener('resize',fit)})();";

/**
 * The served screen document: the page (marks stripped) inside the runtime's stage, the generic instruction above it,
 * the controls and the pad below, the page scaled to the viewport width (the page stays its printed 703 px; tap targets
 * scale with it — a tablet shows it 1:1).
 */
function screenDocument({ html, locale, strings, instruction, plan: pl }) {
  const rt = core.buildInteractive({ kind: 'marks', locale, strings, ctx: pl.ctx, parts: pl.parts });
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  let out = stripMarks(html);
  const open = '<div class="ws-page" data-lcs-page>';
  if (!out.includes(open) || !out.includes('\n</body>')) throw new Error('screen: the page html has no [data-lcs-page] / body end');
  out = out.replace('</head>', () => '<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex">\n<style>' + rt.css + '\n' + SCREEN_CSS + '</style>\n</head>');
  out = out.replace(open, () => '<p class="lcs-hint" id="lcs-screen-hint">' + esc(instruction) + '</p>\n<div class="lcs-fit-box"><div class="lcs-fit">' + rt.stageOpen.replace('id="lcs-stage"', 'id="lcs-stage" aria-describedby="lcs-screen-hint"') + open);
  // a FUNCTION replacement: the minified browser runtime holds "$&&" (a variable named $), which a replacement STRING reads
  // as "the matched text" — every marks screen built in the browser got "</body>" pasted into its script and never ran
  // (2026-11-04, found by the play gate)
  out = out.replace('\n</body>', () => '\n' + rt.stageClose.replace('<div id="lcs-overlay"></div></div>', '<div id="lcs-overlay"></div></div></div></div>') + '\n' + rt.controls.replace('href="__PDF_URL__"', 'href="#" data-lcs-print hidden') + '\n' + rt.script + '\n<script>' + FIT_JS + '</script>\n</body>');
  return out;
}

/**
 * Build the screen of a page in the browser (or under puppeteer): mount the screen build, read the marks, plan, serve.
 * @param {object} o { html (the screen build of the page), locale, strings (runtimeStrings of the locale), instruction,
 *                     mount: (html) => Promise<page> (page-shim / puppeteer), letterPad? }
 * @returns {Promise<{ html, plan, model }>}  throws with .reasons when the page cannot be a screen
 */
async function buildScreen(o) {
  const page = await o.mount(o.html);
  const model = await page.evaluate(derive);
  const pl = plan(model, { locale: o.locale });
  // the instruction may be chosen from the plan (the generic sentence of the screen's first part)
  const instruction = typeof o.instruction === 'function' ? o.instruction(pl) : o.instruction;
  return { html: screenDocument({ html: o.html, locale: o.locale, strings: o.strings, instruction, plan: pl }), plan: pl, model, instruction };
}

/* ---------- DECLARED screens (2026-11-01): a template whose module declares `interactive` ---------- */

/** the declared kinds the maker builds in the browser (tap-order: the generic item + slot capture; tap-edit: the lanes,
 *  each lane's icon inlined through the platform, 2026-11-03) */
const DECLARED_KINDS = new Set(['tap-choice', 'tap-select', 'type-number', 'type-word', 'tap-spell', 'tap-place', 'mark-grid', 'set-clock', 'tap-paint', 'trace-path', 'tap-order', 'tap-edit']);

/**
 * Runs INSIDE the declared screen build of the page (serialised: self-contained). The capture of
 * worksheet-gen/render/render-instance.js, generalised to the page in the student's browser: the same selectors, the
 * same crop (just below the lowest item, + 36 px; [data-lcs-keep] rows kept) and every rect in % of that crop.
 * @param {object} sp the spec's serialisable fields { kind, item, slot, option, tile, metaAttrs, answerAttr, labelAttr, picks }
 */
function deriveDeclared(sp) {
  const D = document;
  const page = D.querySelector('[data-lcs-page]');
  if (!page) return { errors: ['no [data-lcs-page]'] };
  const full = page.getBoundingClientRect();
  const meta = (el, attrs) => { const m = {}; (attrs || []).forEach((a) => { m[a] = el.getAttribute(a); }); return m; };
  const cropTo = (els) => {
    const lowest = Math.max(...els.map((el) => el.getBoundingClientRect().bottom));
    return { left: full.left, top: full.top, width: full.width, height: Math.min(full.height, lowest - full.top + 36) };
  };
  const boxIn = (pg) => (r) => ({ x: ((r.left - pg.left) / pg.width) * 100, y: ((r.top - pg.top) / pg.height) * 100, w: (r.width / pg.width) * 100, h: (r.height / pg.height) * 100 });
  // PAINT (tap-paint, Color by Number pictures; makers 2026-11-02 — render-instance.js's capture): the page's own line
  // drawing laid over the screen, the key's crayons the palette; items = the coloured parts with their colour
  if (sp.kind === 'tap-paint') {
    const pct = (r) => ({ x: (r.left - full.left) / full.width * 100, y: (r.top - full.top) / full.height * 100, w: r.width / full.width * 100, h: r.height / full.height * 100 });
    const svg = D.querySelector('svg[data-lcs-prim="cbn-art"]');
    if (!svg) return { errors: ['tap-paint: no cbn-art picture'] };
    const items = [...svg.querySelectorAll('path[data-lcs-region]')].filter((p) => p.getAttribute('data-lcs-colour') !== 'none')
      .map((p) => ({ region: +p.getAttribute('data-lcs-region'), answer: p.getAttribute('data-lcs-colour'), meta: { 'data-lcs-region': p.getAttribute('data-lcs-region') } }));
    const crayons = [...D.querySelectorAll('[data-lcs-crayon]')].map((c) => ({ ...pct(c.getBoundingClientRect()), colour: c.getAttribute('data-lcs-crayon'), label: c.getAttribute('data-lcs-label') || '' }));
    const clone = svg.cloneNode(true);
    clone.removeAttribute('width'); clone.removeAttribute('height');
    clone.querySelectorAll('[data-lcs-colour]').forEach((p) => p.removeAttribute('data-lcs-colour'));
    const sb = svg.getBoundingClientRect(), fs = getComputedStyle(svg.parentElement);
    const inner = Math.max(0, parseFloat(fs.borderTopLeftRadius) - parseFloat(fs.borderTopWidth));
    const clip = inner > 0 ? { rx: +(inner / sb.width * 100).toFixed(3), ry: +(inner / sb.height * 100).toFixed(3) } : {};
    return { errors: [], items, paint: { art: { ...pct(sb), ...clip, svg: clone.outerHTML }, crayons }, crop: full.height, width: full.width };
  }
  // TRACE (trace-path, the handmade mazes; render-instance.js's capture): the maze graph the page declares
  // (data-lcs-hm-graph, body px) in % of the crop; each route's mouths become edges to a virtual start / goal
  if (sp.kind === 'trace-path') {
    // a scene maze, or any maze that declares its graph (the grid mazes, K-242 family, 2026-11-02)
    const svg = D.querySelector('svg[data-lcs-prim="hm-scene"]') || D.querySelector('svg[data-lcs-hm-graph]');
    if (!svg) return { errors: ['trace-path: no maze scene'] };
    const r = svg.getBoundingClientRect(), vbw = svg.viewBox.baseVal.width, k = r.width / vbw;
    const h = Math.min(full.height, r.bottom - full.top + 24);
    const G = JSON.parse(svg.getAttribute('data-lcs-hm-graph'));
    const P = (p) => [+(((r.left - full.left) + p[0] * k) / full.width * 100).toFixed(3), +(((r.top - full.top) + p[1] * k) / h * 100).toFixed(3)];
    const nodes = G.nodes.map(P);
    const edges = G.edges.map((e) => ({ a: e.a, b: e.b, pts: e.pts.map(P) }));
    const RTs = G.routes || [{ route: G.route, s: G.s, g: G.g, start: G.mouths.start, goal: G.mouths.goal }];
    const routes = RTs.map((rt) => {
      const vS = nodes.length; nodes.push(P(rt.start[rt.start.length - 1])); edges.push({ a: vS, b: rt.s, pts: rt.start.slice().reverse().map(P) });
      if (!rt.goal) return { start: vS, goal: rt.g, path: [vS].concat(rt.route) };
      const vG = nodes.length; nodes.push(P(rt.goal[rt.goal.length - 1])); edges.push({ a: rt.g, b: vG, pts: rt.goal.map(P) });
      return { start: vS, goal: vG, path: [vS].concat(rt.route, [vG]) };
    });
    const labels = G.labels ? G.labels.concat(nodes.slice(G.labels.length).map(() => null)) : null;
    const trace = { nodes, edges, routes, aspect: full.width / h, pageW: full.width / k, w: G.W, hint: G.hint || null, ...(labels ? { labels, rule: G.rule } : {}) };
    const items = routes.map((rt, i) => ({ label: 'route ' + (i + 1), meta: { 'data-lcs-hm-route': String(i) }, answer: rt.path.join('-') }));
    return { errors: [], items, trace, crop: h, width: full.width };
  }
  // LANES (tap-edit, Fix the Sentence; render-instance.js's capture): the runtime draws the lanes LIVE under the page's
  // header (title, instruction, checklist), so the crop ends just below the header; each lane travels as data
  if (sp.kind === 'tap-edit') {
    const heads = [...D.querySelectorAll('[data-lcs-title], [data-lcs-instruction], [data-lcs-fixchip]')];
    if (!heads.length) return { errors: ['tap-edit: no page header to keep'] };
    const bottom = Math.max(...heads.map((h) => h.getBoundingClientRect().bottom));
    const root = D.querySelector('[data-lcs-marks]');
    const raw = [...D.querySelectorAll(sp.item)].map((el) => ({ canonical: el.getAttribute('data-lcs-canonical'), broken: el.getAttribute('data-lcs-broken-text'), icon: el.getAttribute('data-lcs-icon'), split: el.hasAttribute('data-lcs-split') }));
    if (!raw.length) return { errors: ['no item matches ' + sp.item] };
    return { errors: [], raw, marks: root ? root.getAttribute('data-lcs-marks') : '.', crop: Math.min(full.height, bottom - full.top + 18), width: full.width };
  }
  if (sp.kind === 'mark-grid') {
    const grids = [...D.querySelectorAll('[data-lcs-grid]')];
    if (!grids.length) return { errors: ['mark-grid: no grid on the page'] };
    const pg = cropTo(grids), box = boxIn(pg);
    const cells = [], items = [], cases = [];
    for (const sec of D.querySelectorAll('section[data-lcs-puzzle]')) {
      const p = sec.getAttribute('data-lcs-puzzle'), n = +sec.getAttribute('data-lcs-size');
      const clues = JSON.parse(sec.getAttribute('data-lcs-clues'));
      const sol = sec.getAttribute('data-lcs-solution');
      const names = JSON.parse(sec.getAttribute('data-lcs-forms')).map((f) => f.nom);
      const grid = sec.querySelector('[data-lcs-grid]');
      const two = grid.hasAttribute('data-lcs-lgrid');
      const alt = (sel) => { const im = grid.querySelector(sel); return im ? im.getAttribute('alt') || '' : ''; };
      cases.push(two ? { g: 'two', mode: 'two', n, clues } : { g: p, mode: 'one', n, clues });
      const answers = {};
      if (two) sol.split(';').forEach((part) => { const [g, v] = part.split(':'); answers[g] = v.split(',').map(Number); });
      else answers[p] = sol.split(',').map(Number);
      for (const rect of grid.querySelectorAll('rect[data-lcs-cell]')) {
        const id = rect.getAttribute('data-lcs-cell').split(':');
        const g = id[0], r = +id[1], c = +id[2];
        const rowLabel = g === 'pc' ? alt('[data-lcs-rowpic="' + r + '"]') : names[r];
        const colLabel = alt('[data-lcs-col="' + (g === 'nc' ? n + c : c) + '"]');
        cells.push({ ...box(rect.getBoundingClientRect()), g, r, c, label: rowLabel + ' — ' + colLabel });
      }
      for (const g of Object.keys(answers)) answers[g].forEach((col, r) => items.push({ label: names[r], meta: { 'data-lcs-row': g + ':' + r }, answer: col }));
    }
    if (!cells.length || !items.length) return { errors: ['mark-grid: no grid cells'] };
    return { errors: [], items, grid: { cells, cases }, crop: pg.height, width: pg.width };
  }
  const els = [...D.querySelectorAll(sp.item)];
  if (!els.length) return { errors: ['no item matches ' + sp.item] };
  if (sp.kind === 'set-clock') {
    const pg = cropTo(els);
    const items = els.map((el) => {
      const svg = el.querySelector('svg[data-lcs-prim="clock"]'), r = svg.getBoundingClientRect(), rf = +el.getAttribute('data-lcs-rf');
      return { cx: ((r.left + r.width / 2 - pg.left) / pg.width) * 100, cy: ((r.top + r.height / 2 - pg.top) / pg.height) * 100, r: (rf * r.width / pg.width) * 100,
        answer: el.getAttribute('data-lcs-tq'), label: el.getAttribute('data-lcs-tq'), meta: { 'data-lcs-tq': el.getAttribute('data-lcs-tq'), 'data-lcs-step': el.getAttribute('data-lcs-step') } };
    });
    if (items.some((it) => !(it.r > 0))) return { errors: ['set-clock: a clock face without a measurable radius'] };
    return { errors: [], items, aspect: pg.width / pg.height, crop: pg.height, width: pg.width };
  }
  const pg = cropTo([...D.querySelectorAll(sp.item + ', [data-lcs-keep]')]), box = boxIn(pg);
  const items = els.map((el) => {
    const r = el.getBoundingClientRect();
    if (sp.kind === 'tap-spell') {
      return { ...box(r), answer: el.getAttribute(sp.answerAttr) || '', label: el.getAttribute(sp.labelAttr) || '', meta: meta(el, sp.metaAttrs),
        tiles: [...el.querySelectorAll(sp.tile)].map((t) => ({ ...box(t.getBoundingClientRect()), label: t.getAttribute('data-lcs-label') || t.textContent.trim() })),
        slots: [...el.querySelectorAll(sp.slot)].map((t) => box(t.getBoundingClientRect())) };
    }
    if (sp.kind === 'type-number' || sp.kind === 'type-word') {
      return { ...box(r), answer: sp.kind === 'type-word' ? (el.getAttribute(sp.answerAttr) || '') : Number(el.getAttribute(sp.answerAttr)), label: el.getAttribute(sp.labelAttr) || '', meta: meta(el, sp.metaAttrs) };
    }
    if (sp.kind === 'tap-select') return { ...box(r), answer: el.hasAttribute(sp.answerAttr), label: el.getAttribute(sp.labelAttr) || el.textContent.trim(), meta: meta(el, sp.metaAttrs) };
    if (sp.option) {
      const opts = [...el.querySelectorAll(sp.option)];
      return { ...box(r), options: opts.map((o) => ({ ...box(o.getBoundingClientRect()), label: o.getAttribute('data-lcs-label') || o.textContent.trim() })),
        answer: opts.findIndex((o) => o.hasAttribute('data-lcs-correct')), label: el.getAttribute('data-lcs-word') || '', meta: meta(el, sp.metaAttrs) };
    }
    const slotEl = el.querySelector(sp.slot);
    const s = slotEl ? slotEl.getBoundingClientRect() : null;
    const b = box(r);
    return { x: b.x, y: b.y, w: b.w, h: b.h, sx: s ? box(s).x : NaN, sy: s ? box(s).y : NaN, sw: s ? box(s).w : NaN, sh: s ? box(s).h : NaN,
      answer: Number(el.getAttribute(sp.answerAttr)), label: el.getAttribute(sp.labelAttr) || '' };
  });
  const picks = sp.picks ? [...D.querySelectorAll(sp.picks.group)].map((g) => {
    const opts = [...g.querySelectorAll(sp.picks.option)];
    return { options: opts.map((o) => ({ ...box(o.getBoundingClientRect()), label: o.getAttribute('data-lcs-label') || o.textContent.trim() })), answer: opts.findIndex((o) => o.hasAttribute('data-lcs-correct')), meta: meta(g, sp.picks.metaAttrs) };
  }) : null;
  return { errors: [], items, ...(picks ? { picks } : {}), crop: pg.height, width: pg.width };
}

/** the serialisable part of a type's interactive spec (what deriveDeclared reads) */
function declaredSpec(type) {
  const s = type.interactive;
  return { kind: s.kind, item: s.item, slot: s.slot, option: s.option, tile: s.tile, metaAttrs: s.metaAttrs, answerAttr: s.answerAttr, labelAttr: s.labelAttr, picks: s.picks || null };
}

/** the runtime ctx of a declared screen — the catalogue's (worksheet-gen/cli.js), from the type module and the capture */
function declaredCtx(type, { theme, difficulty, locale }, got) {
  const s = type.interactive, lv = type.difficulty && type.difficulty[difficulty];
  return {
    theme: theme || null, difficulty, level3: !!(lv && lv.level3),
    ...(s.ranksFromAnswers ? { ranksFromAnswers: true } : {}),
    ...(s.countGroups ? { countGroups: true } : {}),
    ...(typeof s.maxDigits === 'function' ? { maxDigits: s.maxDigits(lv) } : {}),
    ...(typeof s.wordPad === 'function' ? s.wordPad(lv, locale) : {}),
    ...(got.clock ? { clock: got.clock } : {}),
    ...(got.grid ? { grid: got.grid } : {}),
    ...(got.picks ? { picks: got.picks } : {}),
    ...(got.paint ? { paint: got.paint } : {}),
    ...(got.trace ? { trace: got.trace } : {}),
    ...(typeof s.screenCtx === 'function' ? s.screenCtx(got.items) : {}),
  };
}

/**
 * The served declared screen: the screen build (marks stripped) cropped to the measured height inside the runtime's
 * stage, the native instruction above (already the page's instruction), the controls and the pad below, scaled to the
 * viewport width. The overlay covers exactly the crop, so the capture's % rects land where they were measured.
 */
function declaredDocument({ html, rt, crop, width }) {
  const H = Math.ceil(crop), W = Math.round(width || 703);
  let out = stripMarks(html);
  const open = '<div class="ws-page" data-lcs-page>';
  if (!out.includes(open) || !out.includes('\n</body>')) throw new Error('screen: the page html has no [data-lcs-page] / body end');
  const css = SCREEN_CSS.replace(/703px/g, W + 'px').replace('height:945px', 'height:' + H + 'px') + '\n#lcs-stage.lcs-crop{height:' + H + 'px;overflow:hidden;overflow:clip}';
  out = out.replace('</head>', () => '<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex">\n<style>' + rt.css + '\n' + css + '</style>\n</head>');
  out = out.replace(open, () => '<div class="lcs-fit-box"><div class="lcs-fit">' + rt.stageOpen.replace('class="lcs-stage" id="lcs-stage"', 'class="lcs-stage lcs-crop" id="lcs-stage"') + open);
  out = out.replace('\n</body>', () => '\n' + rt.stageClose.replace('<div id="lcs-overlay"></div></div>', '<div id="lcs-overlay"></div></div></div></div>') + '\n' + rt.controls.replace('href="__PDF_URL__"', 'href="#" data-lcs-print hidden') + '\n' + rt.script + '\n<script>' + FIT_JS.replace(/703/g, String(W)).replace('945*k', H + '*k') + '</script>\n</body>');   // function replacement: see above
  return out;
}

/**
 * Build a declared screen in the browser (or under puppeteer): mount the declared build, capture, build the runtime.
 * @param {object} o { html (makePage declaredHtml), type (the template module), theme, difficulty, locale, strings
 *                     (runtimeStrings of the locale), mount: (html) => Promise<page> }
 * @returns {Promise<{ html, kind, items, ctx }>} throws with .reasons when the page cannot be a screen
 */
async function buildDeclaredScreen(o) {
  const spec = o.type.interactive;
  if (!spec || !DECLARED_KINDS.has(spec.kind)) { const e = new Error('screen: declared kind ' + (spec && spec.kind) + ' is not built in the maker'); e.reasons = [e.message]; throw e; }
  const page = await o.mount(o.html);
  const got = await page.evaluate(deriveDeclared, declaredSpec(o.type));
  if (got.errors && got.errors.length) { const e = new Error('screen: ' + got.errors.join('; ')); e.reasons = got.errors; throw e; }
  if (spec.kind === 'set-clock') got.clock = { aspect: got.aspect, names: spec.clockNames(o.locale) };
  // the crayons' colours (Color by Number's palette) and a maze's runtime words (Go back, Keep going …, in the page's
  // language; a Level Set scene names its own item: the unit the page was drawn with)
  if (got.paint) got.paint.hex = require('../worksheet-gen/lib/cbn-render.js').PALETTE;
  if (got.trace && spec.chrome) got.trace.chrome = spec.chrome(o.locale, o.unit || null);
  // a tap-edit lane (render-instance.js): its words, the type's own answer (capital + end mark per word), where the two
  // sentences split, and its picture inlined (the screen's bundle carries it)
  if (spec.kind === 'tap-edit') {
    const fail = (m) => { const e = new Error('screen: ' + m); e.reasons = [m]; return e; };
    if (typeof o.type.fixAnswers !== 'function') throw fail(o.type.id + ' declares tap-edit but has no fixAnswers');
    const platform = require('../worksheet-gen/lib/platform/index.js');
    got.items = [];
    for (const it of got.raw) {
      const words = String(it.broken || '').split(' ').filter((w) => w && w !== '/');
      const answer = o.type.fixAnswers(it.canonical);
      if (!answer || answer.length !== words.length) throw fail(`lane "${it.broken}" has ${words.length} words but its answer has ${answer ? answer.length : 0}`);
      answer.forEach((a, k) => { if (a.word.toLocaleLowerCase(o.locale) !== words[k]) throw fail(`word ${k + 1} "${words[k]}" ≠ the answer "${a.word}"`); });
      const splitAfter = it.split ? String(it.broken).split(' ').filter(Boolean).indexOf('/') - 1 : -1;
      got.items.push({ words, answer: answer.map((a) => ({ cap: a.cap, mark: a.mark })), splitAfter, icon: await platform.iconDataUrl(it.icon, 96), meta: { 'data-lcs-canonical': it.canonical } });
    }
  }
  const ctx = { ...declaredCtx(o.type, { theme: o.theme, difficulty: o.difficulty, locale: o.locale }, got), ...(o.design ? { design: o.design } : {}) };   // a paint screen's oracle reads its design (the page's meta)
  let rt;
  try { rt = core.buildInteractive({ kind: spec.kind, locale: o.locale, strings: o.strings, items: got.items, ctx, ...(spec.kind === 'tap-edit' ? { marks: got.marks } : {}) }); }
  catch (e) { const err = new Error('screen: ' + e.message); err.reasons = [e.message]; throw err; }
  return { html: declaredDocument({ html: o.html, rt, crop: got.crop, width: got.width }), kind: spec.kind, items: got.items, ctx };
}

/** which generic instruction a plan needs: 'type' | 'tap-choice' | 'tap-select' | 'tap-pair' | 'tap-place' (the first part decides a mixed page) */
function instructionKey(pl) {
  const first = pl.parts[0].cls;
  return first === 'type' ? 'type' : first === 'choice' ? 'tap-choice' : first === 'select' ? 'tap-select' : first === 'pair' ? 'tap-pair' : 'tap-place';
}

module.exports = { derive, plan, stripMarks, screenDocument, buildScreen, instructionKey, ALLOW, DECLARED_KINDS, deriveDeclared, declaredSpec, declaredCtx, declaredDocument, buildDeclaredScreen };
