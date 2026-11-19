/**
 * info-text-g3c.js — two Grade 3 pages on how the events and ideas of ONE informational text connect (English literacy
 * year, Daily Teaching System Part 12.3, 2026-11-16; unit "Reading to Learn: Informational Texts", Grade 3; RI.3.3:
 * describe the relationship between a series of events, ideas or steps in a text, using language that pertains to
 * time, sequence, and cause/effect). The texts are the key `g3` of data/literacy/info-texts.en.json with their field
 * `connect`: four cause-and-effect pairs, a chain of four events or steps in the order of the text, and a sample
 * sentence that explains one link.
 *
 *   chain   Events in Order
 *             level 1  the four events, mixed: number them 1 to 4; then what happened right after the first event
 *                      and right before the last (three answers each)
 *             level 2  write the four events on a chain of four lines that begin First, Next, Then, Finally
 *             level 3  the chain, and two lines that tell with because or so why one event happens or what it leads to
 *                      (neighbouring events of a chain in TIME are not causes of each other: the reviewer, 2026-11-16)
 *   cause   Cause and Effect
 *             level 1  four causes and four effects (lettered, mixed): the letter of its effect next to each cause
 *             level 2  four cards: the cause is given and the effect is written, or the other way round (two each)
 *             level 3  three cards: the missing half, then cause and effect as ONE sentence with because or so (two lines)
 * Every effect belongs to ONE cause (the reviewer listed every second match; the pairs were changed). Level 1 of the
 * chain page prints the text without its paragraph numbers: the task asks for the numbers 1 to 4.
 *
 * The text is printed with its headings (info-text-g3.js textBox); writing lines are its ruled lines (rule()).
 * English only. Themeless: a copy is another text. PDF only. The bank is checked when this file loads.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle, choices, placed } = _parts;
const { TEXTS, _parts3 } = require('./info-text-g3.js');
const { partText, textBox, cream, label, num, numBox, rule, stack, grid } = _parts3;
void placesFor;

const STARTS = ['First,', 'Next,', 'Then,', 'Finally,'];
const lowerFirst = (s) => (/^(I |[A-Z][a-z]+ [A-Z])/.test(s) ? s : s[0].toLowerCase() + s.slice(1));
/** cause and effect as one sentence (the key's sample) */
const joined = (l) => l.cause.replace(/\.$/, '') + ', so ' + lowerFirst(l.effect);

/** What must be true of a text's connections before any page prints them. Returns the list of faults (empty = sound). */
function connectFaultsOf(t) {
  const f = [], id = t.id, c = t.connect;
  if (!c) return [id + ': no connections'];
  const sent = (s) => typeof s === 'string' && /^[A-Z].*\.$/.test(s) && s.length <= 70;
  if (!Array.isArray(c.links) || c.links.length !== 4 || c.links.some((l) => !sent(l.cause) || !sent(l.effect))) f.push(id + ': not four cause-and-effect pairs of whole sentences of at most 70 letters');
  else if (new Set(c.links.flatMap((l) => [l.cause, l.effect])).size !== 8) f.push(id + ': a cause or an effect stands twice');
  if (!Array.isArray(c.chain) || c.chain.length !== 4 || c.chain.some((s) => !sent(s)) || new Set(c.chain).size !== 4) f.push(id + ': not a chain of four different whole sentences of at most 70 letters');
  // a pair whose other half has a second answer in the text names the half every page gives (give); a page of level 2
  // gives two causes and two effects, so at most two pairs of a text may name the same half
  if (Array.isArray(c.links)) {
    if (c.links.some((l) => l.give !== undefined && l.give !== 'cause' && l.give !== 'effect')) f.push(id + ': a pair names a half to give that is no cause or effect');
    for (const k of ['cause', 'effect']) if (c.links.filter((l) => l.give === k).length > 2) f.push(id + ': more than two pairs must give the ' + k + ' (a page gives two of each)');
    // a second answer the text allows for the half a page asks (review en.review-1119-read): printed on the key as "Also right"
    for (const l of c.links) for (const k of ['alsoCause', 'alsoEffect']) if (l[k] !== undefined && (!Array.isArray(l[k]) || !l[k].length || l[k].some((x) => !sent(x) || x === l.cause || x === l.effect))) f.push(id + ': the other right answers of "' + l.cause + '" are no list of whole sentences of their own');
  }
  if (!/^[A-Z].*[.]$/.test(c.explain || '') || !/ because | so /.test(c.explain || '') || c.explain.length > 100) f.push(id + ': no sample sentence with because or so of at most 100 letters');
  if (typeof c.topic !== 'string' || !/^[a-z]/.test(c.topic) || c.topic.length > 60) f.push(id + ': the chain does not say what it tells (at most 60 letters, no capital at the start)');
  // every event of the chain is told in the text in this order: its first two long words stand in the text, and the places rise
  const text = t.parts.map(partText).join(' ').toLowerCase();
  const at = (c.chain || []).map((s) => { const ws = s.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter((w) => w.length > 4); const hit = ws.map((w) => text.indexOf(w.slice(0, 5))).filter((i) => i >= 0); return hit.length ? Math.min(...hit) : -1; });
  if (at.some((i) => i < 0)) f.push(id + ': an event of the chain is not told in the text');
  return f;
}
{ const f = TEXTS.flatMap(connectFaultsOf); if (f.length) throw new Error('info-texts.en.json (g3 connect): ' + f.join('; ')); }

const LEVELS = {
  chain: { 1: { font: 14.6, lh: 1.32 }, 2: { font: 15.6, lh: 1.42, rowH: 42 }, 3: { font: 14.6, lh: 1.32, rowH: 30 } },
  cause: { 1: { font: 15.6, lh: 1.42 }, 2: { font: 14.6, lh: 1.32, rowH: 30 }, 3: { font: 14.5, lh: 1.3, rowH: 28 } },
};
const ARROW = `<svg data-lcs-arrow width="18" height="12" viewBox="0 0 18 12" style="display:block;margin:0 auto"><path d="M9 0 V7 M3.5 4.5 L9 11 L14.5 4.5" fill="none" stroke="${T.teal}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
/** the key's note under an answer line: the other answers the text allows for the half the card asks */
const alsoNote = (more) => (more && more.length ? `<div data-lcs-keyalso style="font:700 12.5px/1.2 'Nunito',sans-serif;color:${T.teal};padding:0 4px">Also right: ` + more.map((x) => `<span data-lcs-alsoitem>${esc(x)}</span>`).join(' · ') + `</div>` : '');
const given = (kind, text) => `<div data-lcs-given="${kind}" style="font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="font-weight:800;color:${T.teal}">${kind === 'cause' ? 'Cause:' : 'Effect:'}</b> ${esc(text)}</div>`;

/** `texts` + `story: true`: the page prints a STORY of another bank (story-g3.js): four paragraphs, no headings */
function makeInfoText3cType({ id, slug, mode, i18n, texts, story, levels }) {
  const POOL = texts || TEXTS;
  const D = LEVELS[mode] && { ...LEVELS[mode], ...(levels || {}) };   // levels: sizes of its own for a shorter text (a story)
  if (!D) throw new Error('info-text-g3c: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (causeCheckPage below; the chain of four
    // events needs the whole text and gives no check)
    ...(mode === 'cause' ? { checkPage(args, ctx) { return causeCheckPage(args, ctx, { POOL, story, D }); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the informational texts are English texts (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(POOL, 1)[0], c = t.connect;
      const inner = W - 24;
      let below = '', items = [];

      if (mode === 'chain') {
        if (lv === 1) {
          let order; for (let n = 0; n < 100; n++) { order = shuffle([0, 1, 2, 3], rng); const s = order.join(''); if (s !== '0123' && s !== '3210') break; }
          const strips = cream('data-lcs-strips="1"', label(`These four sentences tell <b data-lcs-topic>${esc(c.topic)}</b>. Put them in order: write 1, 2, 3, and 4 in the boxes.`, 15) +
            order.map((i) => `<div data-lcs-strip="${i + 1}" style="display:flex;align-items:center;gap:10px;min-height:33px">${numBox(i + 1, key)}<span style="font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(c.chain[i])}</span></div>`).join(''), 6);
          const at = [rng.int(0, 2), 0]; at[1] = (at[0] + 1 + rng.int(0, 1)) % 3;
          const q = (n, text, right, wrong, k) => cream(`data-lcs-question="${n}"`, label(num(n) + text, 14) + choices(placed(right, shuffle(wrong, rng), at[k]), at[k], key, { column: true, font: 13.5 }), 5);
          below = strips + `<div data-lcs-qgrid style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px">` +
            q(1, `Which ${story ? 'event' : 'event or step'} comes right <b>after</b> the first one?`, c.chain[1], [c.chain[2], c.chain[3]], 0) + q(2, `Which ${story ? 'event' : 'event or step'} comes right <b>before</b> the last one?`, c.chain[2], [c.chain[0], c.chain[1]], 1) + `</div>`;
        } else {
          const lines = c.chain.map((s, i) => `<div data-lcs-link="${i + 1}">${i ? ARROW : ''}${rule({ w: inner, h: d.rowH, starter: STARTS[i], answer: key ? STARTS[i] + ' ' + lowerFirst(s) : null, sample: true })}${d.lines2 ? rule({ w: inner, h: d.rowH }) : ''}</div>`).join('');
          const chain = cream('data-lcs-chain="1"', label(story ? 'Write the <b data-lcs-topic>four main events of the story</b> in order.' : `Write in order the four events or steps that tell <b data-lcs-topic>${esc(c.topic)}</b>, one on each line.`, 15) + lines, 6);
          const why = lv === 3 ? cream('data-lcs-explain="1"', label((story ? 'Choose one event in your retelling.' : 'Choose one event or step in your chain.') + ' Tell why it happens or what it leads to. Use <b>because</b> or <b>so</b>.', 14.5) +
            rule({ w: inner, h: d.rowH, answer: key ? c.explain : null, sample: true }) + rule({ w: inner, h: d.rowH }), 6) : '';
          below = chain + why;
        }
        items = c.chain.map((s) => t.id + ': ' + s);
      }

      if (mode === 'cause') {
        if (lv === 1) {
          let order; for (let n = 0; n < 100; n++) { order = shuffle([0, 1, 2, 3], rng); if (order.filter((x, i) => x === i).length === 0) break; }
          const letterOf = (i) => 'ABCD'[order.indexOf(i)];
          const causes = c.links.map((l, i) => `<div data-lcs-cause="${letterOf(i)}" style="display:flex;align-items:center;gap:10px;min-height:33px">${numBox(letterOf(i), key)}<span style="font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(l.cause)}</span></div>`).join('');
          const effects = order.map((i, k) => `<div data-lcs-effect="${'ABCD'[k]}" style="display:flex;align-items:baseline;gap:8px;font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="flex:0 0 auto;font-weight:800;color:${T.teal}">${'ABCD'[k]}</b><span>${esc(c.links[i].effect)}</span></div>`).join('');
          below = `<div data-lcs-qgrid style="flex:0 0 auto;display:flex;flex-direction:column;gap:8px">` +
            cream('data-lcs-causes="1"', label('<b style="font-weight:800;color:' + T.teal + '">Causes.</b> What did each cause lead to? Write the letter of its effect in the box.', 15) + causes, 6) +
            cream('data-lcs-effects="1"', label('<b style="font-weight:800;color:' + T.teal + '">Effects</b>', 15) + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 18px">${effects}</div>`, 6) + `</div>`;
          items = c.links.map((l) => t.id + ': ' + l.cause);
        } else {
          // which half is given: two causes and two effects on level 2; of three cards, at least one of each on level 3
          const picks = lv === 2 ? shuffle([0, 1, 2, 3], rng) : shuffle([0, 1, 2, 3], rng).slice(0, 3);
          const give = shuffle(lv === 2 ? ['cause', 'cause', 'effect', 'effect'] : ['cause', 'effect', rng.pick(['cause', 'effect'])], rng);
          // a pair whose other half has a second answer in the text gives the half its bank names (link.give)
          picks.sort((a, b) => a - b);
          let gives = give;
          for (let n = 0; n < 300 && picks.some((li, k) => c.links[li].give && c.links[li].give !== gives[k]); n++) gives = shuffle(lv === 2 ? gives : ['cause', 'effect', rng.pick(['cause', 'effect'])], rng);
          const cards = picks.map((li, k) => { const l = c.links[li], g = gives[k], miss = g === 'cause' ? 'effect' : 'cause';
            const more = key ? (miss === 'cause' ? l.alsoCause : l.alsoEffect) || [] : [];
            return cream(`data-lcs-pair="${k + 1}" data-lcs-given-kind="${g}"${l.give ? ` data-lcs-must-give="${l.give}"` : ''}${more.length ? ` data-lcs-also="${more.length}"` : ''}`, `<div style="display:flex;gap:6px"><span style="flex:0 0 auto;font:700 14.5px/1.25 'Nunito',sans-serif">${num(k + 1)}</span><div style="flex:1 1 auto;min-width:0">${given(g, l[g])}</div></div>` +
              rule({ w: inner, h: d.rowH, starter: miss === 'cause' ? 'Cause:' : 'Effect:', answer: key ? (miss === 'cause' ? 'Cause: ' : 'Effect: ') + l[miss] : null, sample: true }) + alsoNote(more) +
              (lv === 3 ? `<div data-lcs-oneline>${rule({ w: inner, h: d.rowH, starter: 'One sentence:', answer: key ? 'One sentence: ' + joined(l) : null, sample: true })}${rule({ w: inner, h: d.rowH })}</div>` : ''), 4); });
          below = stack(cards, 5);
          items = picks.map((li) => t.id + ': ' + c.links[li].cause);
        }
      }
      void grid;

      return {
        bodyHtml: (story ? _parts3.curly : String)(`<div data-ws-content data-lcs-info3c="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''}${story ? ' data-lcs-story="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + textBox(t, { font: d.font, lh: d.lh, headings: !story, numbers: !(mode === 'chain' && lv === 1) }) + below + `</div>`),
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info3c]');
        if (!root) return ['no page'];
        // a story prints typographic quotes and apostrophes, as the Grade 1 and 2 story pages do (review en.review-1119-read2)
        if (root.dataset.lcsStory === '1' && /["']/.test(root.textContent)) fails.push('a straight quote or apostrophe in the story: the story pages print typographic marks');
        const [mode, lvS] = root.dataset.lcsInfo3c.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root), box = document.querySelector('[data-lcs-info3text]');
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 4 || box.querySelectorAll('[data-lcs-heading]').length !== (root.dataset.lcsStory === '1' ? 0 : 4)) fails.push('the text is not four paragraphs with their headings (a story: without)');
        parts.forEach((p, i) => { if (parseFloat(getComputedStyle(p.querySelector('[data-lcs-partbody]')).fontSize) < 14.5) fails.push('paragraph ' + (i + 1) + ' is printed too small'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        box.querySelectorAll('*').forEach((e) => { const r = R(e), b = R(box); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves the text box'); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const CARDS = '[data-lcs-strips], [data-lcs-question], [data-lcs-chain], [data-lcs-explain], [data-lcs-causes], [data-lcs-effects], [data-lcs-pair]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const c = l.closest(CARDS), r = R(l); if (!c || r.right > R(c).right + 0.5 || r.bottom > R(c).bottom + 0.5) fails.push('a writing line leaves its card');
          if (r.height < 27.5) fails.push(`a writing line of ${Math.round(r.height)} px (wide-ruled paper is 28)`);
          if (r.width < rb.width * 0.5) fails.push('a writing line shorter than half the page');
          const kt = l.querySelector('[data-lcs-keytext]'); if (kt && (R(kt).right > r.right + 0.5 || parseFloat(getComputedStyle(kt).fontSize) < 9)) fails.push('a key answer does not fit its line'); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-numbox], [data-lcs-given], span').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((b) => { if (R(b).width < 28) fails.push('a box too small'); if (!isKey && b.textContent.trim()) fails.push('a box is filled'); });
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => { const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.textContent.trim())).size !== 3) fails.push(`answers ${i + 1}: not three different with one right`);
          all.forEach((e) => { if (R(e).right > R(c.parentElement).right + 0.5) fails.push(`answers ${i + 1}: an answer leaves its card`); }); });

        if ((mode === 'chain' && lv === 1) !== (box.querySelectorAll('[data-lcs-paratab]').length === 0)) fails.push('paragraph numbers beside a task that asks for the numbers 1 to 4 (or none where they belong)');
        if (mode === 'chain') {
          if (!document.querySelector('[data-lcs-topic]')) fails.push('the task does not say what the chain tells');
          if (lv === 1) {
            const strips = [...document.querySelectorAll('[data-lcs-strip]')], seq = strips.map((s) => s.dataset.lcsStrip).join('');
            if (strips.length !== 4 || [...seq].sort().join('') !== '1234') fails.push('not the four events');
            if (seq === '1234' || seq === '4321') fails.push('the events stand in the order of the text');
            strips.forEach((s) => { if (s.querySelector('[data-lcs-numbox]').dataset.lcsWant !== s.dataset.lcsStrip) fails.push('a box is keyed to another place'); });
            if (sets.length !== 2 || lines.length || boxes.length !== 4) fails.push('level 1 is not four events to number and two questions');
            const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
            if (place.length === 2 && place[0] === place[1]) fails.push('both right answers stand in the same place');
            // the event's own words (on the key the strip's box holds its number too: found 2026-11-19, every level-1 key failed)
            const text = (n) => ((strips.find((s) => s.dataset.lcsStrip === String(n)) || {}).lastElementChild || { textContent: '' }).textContent.trim();
            const ok = sets.map((c) => (c.querySelector('[data-lcs-ok]') || { textContent: '' }).textContent.trim());
            if (ok[0] !== text(2) || ok[1] !== text(3)) fails.push('a question is keyed to another event');
          } else {
            const links = [...document.querySelectorAll('[data-lcs-link]')];
            if (links.length !== 4 || document.querySelectorAll('[data-lcs-arrow]').length !== 3 || sets.length || boxes.length) fails.push('not a chain of four lines with three arrows');
            if (!isKey && links.map((l) => (l.querySelector('[data-lcs-line]').dataset.lcsStartertext || '')).join(' ') !== 'First, Next, Then, Finally,') fails.push('the lines do not begin First, Next, Then, Finally');
            const per = links.map((l) => l.querySelectorAll('[data-lcs-line]').length);
            if (new Set(per).size !== 1 || (per[0] !== 1 && per[0] !== 2) || lines.length !== 4 * per[0] + (lv === 3 ? 2 : 0) || (lv === 3) !== !!document.querySelector('[data-lcs-explain]')) fails.push(`level ${lv}: ${lines.length} writing lines (${per.join('+')} for the events)`);
          }
        }
        if (mode === 'cause') {
          if (lv === 1) {
            const causes = [...document.querySelectorAll('[data-lcs-cause]')], effects = [...document.querySelectorAll('[data-lcs-effect]')];
            const want = causes.map((c) => c.dataset.lcsCause).join('');
            if (causes.length !== 4 || effects.map((e) => e.dataset.lcsEffect).join('') !== 'ABCD' || [...want].sort().join('') !== 'ABCD') fails.push('not four causes and four effects A to D');
            if ([...want].some((l, i) => l === 'ABCD'[i])) fails.push('an effect stands in the place of its cause: ' + want);
            causes.forEach((c) => { if (c.querySelector('[data-lcs-numbox]').dataset.lcsWant !== c.dataset.lcsCause) fails.push('a box is keyed to another effect'); });
            if (sets.length || lines.length || boxes.length !== 4) fails.push('level 1 is not four boxes for four letters');
          } else {
            const pairs = [...document.querySelectorAll('[data-lcs-pair]')], kinds = pairs.map((p) => p.dataset.lcsGivenKind);
            if (pairs.length !== (lv === 2 ? 4 : 3) || sets.length || boxes.length) fails.push(`level ${lv}: ${pairs.length} cards`);
            if (new Set(kinds).size !== 2 || (lv === 2 && kinds.filter((k) => k === 'cause').length !== 2)) fails.push('the cards do not give causes AND effects: ' + kinds.join());
            pairs.forEach((p, i) => { const g = p.querySelector('[data-lcs-given]'), l = p.querySelector('[data-lcs-line]'); if (!g || g.dataset.lcsGiven !== p.dataset.lcsGivenKind) fails.push(`card ${i + 1} gives another half than it names`);
              if (!isKey && l.dataset.lcsStartertext !== (p.dataset.lcsGivenKind === 'cause' ? 'Effect:' : 'Cause:')) fails.push(`card ${i + 1} asks for the half it gives`);
              if (!isKey && p.querySelector('[data-lcs-alsoitem], [data-lcs-keyalso]')) fails.push(`the child's page shows the other right answers of card ${i + 1}`);
              if (isKey && p.querySelectorAll('[data-lcs-alsoitem]').length !== +(p.dataset.lcsAlso || 0)) fails.push(`the key of card ${i + 1} shows ${p.querySelectorAll('[data-lcs-alsoitem]').length} of the ${p.dataset.lcsAlso} other right answers`);
              if (p.dataset.lcsMustGive && p.dataset.lcsMustGive !== p.dataset.lcsGivenKind) fails.push(`card ${i + 1} gives the ${p.dataset.lcsGivenKind}, but the text has two answers for the cause of its effect or the effect of its cause: it must give the ${p.dataset.lcsMustGive}`); });
            if (lines.length !== (lv === 2 ? 4 : 9) || document.querySelectorAll('[data-lcs-oneline]').length !== (lv === 3 ? 3 : 0) || [...document.querySelectorAll('[data-lcs-oneline]')].some((o) => o.querySelectorAll('[data-lcs-line]').length !== 2)) fails.push(`level ${lv}: ${lines.length} writing lines (the one sentence has two)`);
          }
        }
        return fails;
      });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  cause-and-effect pair of the text under the paragraphs that tell it (a ruling of each pair below: one paragraph, or
 *  the two that hold the cause and the effect), printed as the page prints them (an information text with its headings,
 *  a story without): the cause or the effect is given (the half the bank names, where the other half has a second answer) and the other half is written on the line that begins with its
 *  name (data-lcs-answer; the key's words are a sample, with the other answers the text allows). A pair that a question
 *  of the evidence page asks too gives no card (asksToo). The text's id is data-lcs-text (form B takes another text).
 *  A text without a ruling gives no card. */
const CAUSE_PARAS = {
  // information texts (G3-501)
  lighthouses: [[1], [2], [4], [4]], 'space-station': [[1], [3], [3], [4]], 'emperor-penguins': [[1], [2], [3], [4]],
  'pony-express': [[1], [3], [2], [4]], 'blue-whales': [[2], [3], [4], [3]],
  // stories (G3-507): "the ant is storing food for the winter" (2) and "the ants were sharing the wheat they had stored" (3);
  // "so he played on" (2) and "the grasshopper had no food" (3); the pot set over the fire (1) and the woman who comes out
  // to see (2); the villagers who add what they had (3) and the soup for everyone (4); the shallow dishes (1) and the
  // stork who gets no drop (2); the invitation (2) and the visit a week later (3); the narrow jars (3) and the fox who
  // cannot get his nose in (4)
  'lion-and-mouse': [[1], [2], [3], [4]], 'ant-and-grasshopper': [[2, 3], [2, 3], [3], [4]], 'crow-and-pitcher': [[1], [2], [3], [4]],
  'stone-soup': [[1, 2], [2], [3], [3, 4]], 'fox-and-stork': [[1, 2], [2, 3], [3, 4], [4]],
};
/** a pair that a question of the evidence page of its text asks too (review en.review-1119-read: "Why did people build
 *  lighthouses?" in the first part, "Effect: People built tall towers ... Cause: ___" in the last): one of its halves
 *  shares at least 60 % of its words of four letters and more (the title's words left out) with a question's sentence, its
 *  question and its answer */
const CHECK_STOP = new Set('that this with from they them their there were have when what which where while could would about into only other then than been some more most also because after before every each made make many much very just your will said'.split(' '));
function asksToo(t, l) {
  const stems = (x) => new Set((String(x).toLowerCase().match(/[a-z]{4,}/g) || []).filter((w) => !CHECK_STOP.has(w)).map((w) => w.replace(/(ing|ed|es|s)$/, '')));
  const own = stems(t.title), st = (x) => new Set([...stems(x)].filter((w) => !own.has(w)));
  return (t.questions || []).some((q) => { const Q = st(q.proof + ' ' + q.q + ' ' + q.answer); return [l.cause, l.effect].some((h) => { const H = st(h); return H.size && [...H].filter((w) => Q.has(w)).length / H.size >= 0.6; }); });
}
function causeCheckPage({ difficulty, locale }, ctx, { POOL, story, D }) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`info-text-g3c check: the texts are English texts (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const att = (s) => esc(s).replace(/"/g, '&quot;');
  const LW = W - 52;
  const cards = [];
  for (const t of shuffle(POOL, rng)) {
    const rule3 = CAUSE_PARAS[t.id];
    if (!rule3) continue;
    shuffle(t.connect.links.map((l, k) => [l, k]), rng).forEach(([l, k]) => {     // (in a drawn order: the check keeps the first card it meets of each text)
      const ps = rule3[k].map((n) => n - 1), drawn = rng.int(0, 1) ? 'cause' : 'effect', give = l.give || drawn, want = give === 'cause' ? 'effect' : 'cause';
      if (asksToo(t, l)) return;
      const name = want === 'cause' ? 'Cause:' : 'Effect:';
      const line = key ? rule({ w: LW, h: d.rowH || 30, starter: name, answer: name + ' ' + l[want], sample: true })
        : rule({ w: LW, h: d.rowH || 30, starter: name }).replace('<div data-lcs-line', `<div data-lcs-line data-lcs-answer="${att(l[want])}"`);
      cards.push(`<div data-lcs-text="${att(t.id)}" data-lcs-given-kind="${give}" style="display:flex;flex-direction:column;gap:5px;padding:0 4px">` +
        _parts3.checkExcerpt(t, ps, { font: d.font, lh: d.lh, heads: !story }) + `<div style="padding:0 2px">${given(give, l[give])}</div>` + line + (key ? alsoNote(want === 'cause' ? l.alsoCause : l.alsoEffect) : '') + `</div>`);
    });
  }
  return { bodyHtml: (story ? _parts3.curly : String)(`<div data-lcs-info3ccheck="cause|${lv}"${key ? ' data-lcs-iskey="1"' : ''}${story ? ' data-lcs-story="1"' : ''}>` + checkGrid(cards, { cols: 1 }) + `</div>`), meta: {} };
}

module.exports = { makeInfoText3cType, connectFaultsOf, LEVELS, joined };
