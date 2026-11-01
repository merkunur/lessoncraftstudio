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
      const items = drops.map((el, i) => { const a = el.getAttribute('data-lcs-answer'); if (!a) errors.push('place: a drop target without data-lcs-answer'); seen.add(el); return { ...box(el), answer: a, label: label(el, String(i + 1)), meta: {} }; });
      const bs = bins.map((el, i) => ({ ...box(el), id: el.getAttribute('data-lcs-bin'), label: label(el, String(i + 1)), html: el.querySelector('img,svg') ? el.innerHTML : '' }));
      parts.push({ cls: 'place', items, bins: bs, dom: Math.min(...items.map((it) => it.dom)) });
    }
  }
  // 2. type: write boxes and answer cells
  const typeEls = q('[data-lcs-answer]').filter((el) => !seen.has(el) && !el.hasAttribute('data-lcs-drop') && !el.hasAttribute('data-lcs-given') && el.getAttribute('data-lcs-answer') !== '' && !el.children.length && !txt(el));
  q('svg[data-lcs-prim="hundreds-chart"] rect[data-lcs-missing]').forEach((el) => typeEls.push(el));
  if (typeEls.length) {
    const items = typeEls.map((el, i) => {
      seen.add(el);
      const shown = el.hasAttribute('data-lcs-missing') ? el.getAttribute('data-lcs-missing') : el.getAttribute('data-lcs-answer');
      const typed = el.getAttribute('data-lcs-typed') || shown;
      const meta = {};
      ['data-lcs-alts', 'data-lcs-range', 'data-lcs-set'].forEach((a) => { if (el.hasAttribute(a)) meta[a] = el.getAttribute(a); });
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
  picks.forEach((el, i) => {
    seen.add(el);
    const want = wantOf(el);
    selectItems.push({ ...box(el), answer: el.hasAttribute('data-lcs-key-ring') || el.hasAttribute('data-lcs-correct'), label: label(el, String(i + 1)), meta: want != null ? { 'data-lcs-group': groupOf(el), 'data-lcs-want': want } : {} });
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
    if (grouped && grouped !== selectItems.length) errors.push('select: some candidates carry a want (any N) and some do not');
    parts.push({ cls: 'select', items: selectItems, countGroups: grouped > 0, dom: selectItems[0].dom });
  }
  // 4. pair: badge items + pair targets
  const badges = q('[data-lcs-key-badge]').filter((el) => !seen.has(el)), targets = q('[data-lcs-pair]');
  if (badges.length || targets.length) {
    if (!badges.length || targets.length < 2) errors.push('pair: ' + badges.length + ' items with a badge and ' + targets.length + ' targets (need both)');
    else {
      const tIds = targets.map((t) => t.getAttribute('data-lcs-pair'));
      const items = badges.map((el, i) => ({ ...box(el), id: el.hasAttribute('data-lcs-pair') ? el.getAttribute('data-lcs-pair') : 'i' + i, answer: el.getAttribute('data-lcs-key-badge'), label: label(el, String(i + 1)), meta: {} }));
      const ts = targets.map((el, i) => ({ ...box(el), id: tIds[i], label: label(el, String(i + 1)) }));
      items.forEach((it) => { seen.add(it); });
      parts.push({ cls: 'pair', items, targets: ts, mutual: badges.every((el) => el.hasAttribute('data-lcs-pair')), dom: Math.min(...items.map((it) => it.dom)) });
    }
  }
  parts.sort((a, b) => a.dom - b.dom);
  if (!parts.length && !errors.length) errors.push('no answer marks on the page');
  return { errors, parts, page: { w: pr.width, h: pr.height } };
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
      const numeric = p.items.every((it) => (isInt(it.answer) && !it.meta['data-lcs-alts']) || it.meta['data-lcs-range'] || it.meta['data-lcs-set']);
      if (numeric) {
        const digits = Math.max(...p.items.map((it) => it.meta['data-lcs-range'] ? Math.max(...String(it.meta['data-lcs-range']).split('-').map((x) => x.length)) : String(it.answer).length), 1);
        ctx.maxDigits = Math.min(4, Math.max(1, digits));
        ctx.pad = 'digits';
        // a set box ("-" = a spare space) and a range box carry their truth in the meta; the answer is a placeholder
        const sets = {};
        for (const it of p.items) if (it.meta['data-lcs-set'] && isInt(it.answer)) (sets[it.meta['data-lcs-set']] = sets[it.meta['data-lcs-set']] || []).push(parseInt(it.answer, 10));
        if (Object.keys(sets).length) ctx.sets = sets;
        for (const it of p.items) if (it.meta['data-lcs-set'] && !sets[it.meta['data-lcs-set']]) errors.push('type: the set ' + it.meta['data-lcs-set'] + ' has no numbers');
        const ans = (it) => (it.meta['data-lcs-set'] ? 0 : it.meta['data-lcs-range'] ? (parseInt(String(it.meta['data-lcs-range']).split('-')[0], 10) || 0) : parseInt(it.answer, 10));
        parts.push({ cls: 'type', num: true, items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, answer: ans(it), label: it.label, meta: it.meta })) });
      } else {
        const words = p.items.flatMap((it) => [String(it.answer), ...String(it.meta['data-lcs-alts'] || '').split('|').filter(Boolean)]);
        const chars = [...new Set(words.flatMap((w) => [...w.normalize('NFC').toLocaleLowerCase(locale)]))];
        const hasLetter = chars.some((c) => /\p{L}/u.test(c));
        let keys;
        if (hasLetter) { const lp = letterPad(locale, words); keys = lp.keys; }
        else keys = chars.filter((c) => c !== ' ');
        if (keys.length < 2) errors.push('type: the answers use fewer than 2 characters (' + keys.join('') + ')');
        ctx.keys = keys; ctx.pad = 'letters'; ctx.symbolPad = !hasLetter;
        ctx.maxChars = Math.min(40, Math.max(2, Math.max(...words.map((w) => [...w].length)) + 3));
        parts.push({ cls: 'type', num: false, items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, answer: String(it.answer), label: it.label, meta: it.meta })) });
      }
    } else if (p.cls === 'choice') parts.push({ cls: 'choice', items: p.items.map((it) => ({ options: it.options.map((o) => ({ x: o.x, y: o.y, w: o.w, h: o.h, label: o.label })), answer: it.answer, label: it.label, meta: {} })) });
    else if (p.cls === 'select') {
      // "any N of M" groups are graded by count: the per-item answer is a convention (the first N of each group), so the
      // runtime's rule "something to find, something to leave" holds for the group as the key's rings do
      const seen = {};
      parts.push({ cls: 'select', countGroups: p.countGroups, items: p.items.map((it) => { let a = it.answer; if (p.countGroups) { const g = it.meta['data-lcs-group']; seen[g] = (seen[g] || 0) + 1; a = seen[g] <= Number(it.meta['data-lcs-want']); } return { x: it.x, y: it.y, w: it.w, h: it.h, answer: a, label: it.label, meta: it.meta }; }) });
    }
    else if (p.cls === 'pair') parts.push({ cls: 'pair', mutual: p.mutual, items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, id: it.id, answer: it.answer, label: it.label, meta: {} })), targets: p.targets.map((t) => ({ x: t.x, y: t.y, w: t.w, h: t.h, id: t.id, label: t.label })) });
    else if (p.cls === 'place') parts.push({ cls: 'place', items: p.items.map((it) => ({ x: it.x, y: it.y, w: it.w, h: it.h, answer: it.answer, label: it.label, meta: {} })), bins: p.bins.map((b) => ({ x: b.x, y: b.y, w: b.w, h: b.h, id: b.id, label: b.label, ...(b.html ? { html: b.html } : {}) })) });
  }
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
  '.lcs-fit-box{position:relative;margin:0 auto;width:703px;height:945px;overflow:hidden}',
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
  out = out.replace('</head>', '<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex">\n<style>' + rt.css + '\n' + SCREEN_CSS + '</style>\n</head>');
  out = out.replace(open, '<p class="lcs-hint" id="lcs-screen-hint">' + esc(instruction) + '</p>\n<div class="lcs-fit-box"><div class="lcs-fit">' + rt.stageOpen.replace('id="lcs-stage"', 'id="lcs-stage" aria-describedby="lcs-screen-hint"') + open);
  out = out.replace('\n</body>', '\n' + rt.stageClose.replace('<div id="lcs-overlay"></div></div>', '<div id="lcs-overlay"></div></div></div></div>') + '\n' + rt.controls.replace('href="__PDF_URL__"', 'href="#" data-lcs-print hidden') + '\n' + rt.script + '\n<script>' + FIT_JS + '</script>\n</body>');
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

/** which generic instruction a plan needs: 'type' | 'tap-choice' | 'tap-select' | 'tap-pair' | 'tap-place' (the first part decides a mixed page) */
function instructionKey(pl) {
  const first = pl.parts[0].cls;
  return first === 'type' ? 'type' : first === 'choice' ? 'tap-choice' : first === 'select' ? 'tap-select' : first === 'pair' ? 'tap-pair' : 'tap-place';
}

module.exports = { derive, plan, stripMarks, screenDocument, buildScreen, instructionKey, ALLOW };
