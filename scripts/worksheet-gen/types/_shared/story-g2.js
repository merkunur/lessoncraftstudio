/**
 * story-g2.js — four Grade 2 pages on ONE story (English literacy year, Daily Teaching System Part 12.3, 2026-11-16;
 * the lessons "How characters meet a challenge" and "Fables: what is the lesson?" of the Grade 2 unit Reading Stories
 * and Writing). The stories are the key `g2` of data/literacy/stories.en.json: five fables retold in about 140 words
 * and THREE paragraphs (beginning, middle, end), one library picture.
 *
 *   challenge  How a Character Meets a Challenge (RL.2.3: describe how characters respond to major events and challenges)
 *                level 1  three questions (the problem, what the character does, a feeling), three answers each
 *                level 2  the three questions; two handwriting rows for a sentence, one for the feeling word
 *                level 3  the same, and "If you were <the character>, what would you have done? Why?" (two rows)
 *   events     Cause and Effect in a Story (RL.2.3: an event and how the story goes on because of it)
 *                level 1  three causes and three effects (lettered, mixed): the letter of its effect next to each cause
 *                level 2  three causes: write what happened because of each (two rows)
 *                level 3  two causes and one effect: write the missing half; then one pair as ONE sentence with because or so
 *   lesson     What Is the Lesson? (RL.2.2: determine the central message, lesson, or moral)
 *                level 1  circle the lesson (beside the lesson of another story and a sentence that takes the story
 *                         too literally); check the two events that show it among three sentences
 *                level 2  write the lesson and what happens in the story that shows it
 *                level 3  the same, and how the ending teaches the lesson
 *   retell     Beginning, Middle, and End (RL.2.2: recount stories)
 *                level 1  the three parts of the story in one sentence each, mixed: number them; what happens in the middle
 *                level 2  write the beginning, the middle and the end (two lines each)
 *                level 3  the same, and the lesson of the story
 *
 * The story is printed WITHOUT paragraph numbers (a page asks for the numbers 1 to 3). Writing lines are the
 * handwriting rows of Grade 2 (info-text.js line()), as wide as the page and 44 px or more high (the reviewer,
 * 2026-11-16: 38 px is too low for a second grader). Read by a US Grade 2 reviewer with the rendered pages; every
 * finding applied. English only. Themeless: a copy is another
 * story. PDF only. The bank is checked when this file loads (story2FaultsOf); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/stories.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line, choices, placed } = _parts;

const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const one = (s, max) => typeof s === 'string' && /^[A-Z"].*[.!?]"?$/.test(s) && s.length <= max;

/** What must be true of a Grade 2 story before any page prints it. Returns the list of faults (empty = sound). */
function story2FaultsOf(t, all) {
  const f = [], id = t.id;
  if (!Array.isArray(t.parts) || t.parts.length !== 3) return [id + ': not three paragraphs (beginning, middle, end)'];
  const sents = t.parts.flatMap((p) => p.sentences), total = wordsIn(sents.join(' '));
  if (total < 120 || total > 185) f.push(`${id}: ${total} words (a Grade 2 story has 120 to 185)`);
  t.parts.forEach((p, i) => { if (p.sentences.length < 4) f.push(`${id} paragraph ${i + 1}: fewer than four sentences`); p.sentences.forEach((x) => { if (wordsIn(x) > 20 || !one(x, 140)) f.push(`${id} paragraph ${i + 1}: "${x.slice(0, 30)}..." is too long or no whole sentence`); }); });
  if (new Set(sents).size !== sents.length) f.push(id + ': a sentence stands twice');
  if (!t.title || !t.picture || !t.picture.theme || !t.picture.noun) f.push(id + ': no title or no picture');
  if (!/^the [a-z ]{3,20}$/.test(t.you || '')) f.push(id + ': no character whose place the child takes ("If you were the ...")');
  const ch = t.challenge || [];
  if (ch.length !== 3) f.push(id + ': not three questions about the challenge');
  ch.forEach((c, i) => { if (!/\?$/.test(c.q) || !c.answer || !Array.isArray(c.wrong) || c.wrong.length !== 2 || new Set([c.answer, ...c.wrong]).size !== 3) f.push(`${id}: "${c.q}" has not one right and two different wrong answers`);
    if (i === 2 && ![c.answer, ...(c.wrong || [])].every((w) => /^[a-z]{3,12}$/.test(w))) f.push(`${id}: the feeling question is not answered by one word`);
    if (i === 2 && !/^How do(es)? .* feel /.test(c.q)) f.push(`${id}: the third question does not ask for a feeling`); });
  const ln = t.links || [];
  if (ln.length !== 3 || ln.some((l) => !one(l.cause, 70) || !one(l.effect, 70)) || new Set(ln.flatMap((l) => [l.cause, l.effect])).size !== 6) f.push(id + ': not three cause-and-effect pairs of six different sentences of at most 70 letters');
  const m = t.lesson || {};
  if (![m.right, m.lure, m.literal].every((s) => one(s, 90)) || new Set([m.right, m.lure, m.literal]).size !== 3) f.push(id + ': not a lesson, the lesson of another story and a literal sentence');
  else if (all && !all.some((o) => o.id !== id && o.lesson && o.lesson.right === m.lure)) f.push(id + ': the wrong lesson is not the lesson of another story of the bank');
  if (!Array.isArray(t.shows) || t.shows.length !== 2 || ![...(t.shows || []), t.notInStory].every((s) => one(s, 96)) || new Set([...(t.shows || []), t.notInStory]).size !== 3) f.push(id + ': not two events that show the lesson and one that the story does not tell');
  if (!Array.isArray(t.retell) || t.retell.length !== 3 || t.retell.some((s) => !one(s, 80)) || new Set(t.retell).size !== 3) f.push(id + ': not a beginning, a middle and an end of at most 80 letters each');
  if (!one(t.how, 110)) f.push(id + ': no sample sentence that tells how the story teaches the lesson');
  return f;
}
const STORIES = BANK.g2 || [];
{ const f = STORIES.flatMap((t) => story2FaultsOf(t, STORIES)); if (f.length) throw new Error('stories.en.json (g2): ' + f.join('; ')); }

const LEVELS = {
  challenge: { 1: { font: 17.5, lh: 1.45 }, 2: { font: 17.5, lh: 1.45, rowH: 48 }, 3: { font: 16, lh: 1.38, rowH: 44 } },
  events: { 1: { font: 19, lh: 1.5 }, 2: { font: 17, lh: 1.42, rowH: 46 }, 3: { font: 16.5, lh: 1.42, rowH: 46 } },
  lesson: { 1: { font: 19, lh: 1.52 }, 2: { font: 18.5, lh: 1.48, rowH: 54 }, 3: { font: 16.5, lh: 1.42, rowH: 46 } },
  retell: { 1: { font: 19, lh: 1.5 }, 2: { font: 17, lh: 1.45, rowH: 46 }, 3: { font: 16, lh: 1.36, rowH: 44 } },
};

function storyBox(t, { font, lh }) {
  const parts = t.parts.map((p, i) => `<div data-lcs-part="${i + 1}" style="margin-top:${i ? 7 : 0}px;font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${esc(p.sentences.join(' '))}</div>`).join('');
  return `<div data-lcs-story2="${t.id}" data-lcs-words="${wordsIn(t.parts.flatMap((p) => p.sentences).join(' '))}" style="flex:0 0 auto;padding:8px 16px 10px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:3px"><div data-lcs-title style="font:700 26px/1.1 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</div>` +
    `<img class="ws-icon" data-lcs-pic="${esc(t.picture.theme + '/' + t.picture.noun)}" src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="flex:0 0 auto;width:60px;height:60px;display:block;object-fit:contain"></div>${parts}</div>`;
}
const cream = (attrs, inner, pad = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:3px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (text, px = 16, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${text}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const numBox = (want, key, size = 34) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 ${Math.round(size * 0.58)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? want : ''}</span>`;
const CHECK = `<svg width="18" height="18" viewBox="0 0 20 20"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const lowerFirst = (s) => s[0].toLowerCase() + s.slice(1);
/** a short label and, on the same line, the row that continues it (room for the rows, which keep their height) */
const inlineRow = (labelHtml, labelW, rowHtml) => `<div style="display:flex;align-items:flex-end;gap:8px"><span data-lcs-label style="flex:0 0 ${labelW}px;padding-bottom:7px;font:700 16px/1.2 'Nunito',sans-serif;color:${T.ink}">${labelHtml}</span><div style="flex:1 1 auto;min-width:0">${rowHtml}</div></div>`;

function makeStory2Type({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('story-g2: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories are English stories (no ${locale} bank)`);
      if (!STORIES.length) throw new Error(`${id}: the bank holds no Grade 2 story`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(STORIES, 1)[0];
      const inner = W - 24;
      const mixed3 = (bad) => { let o; for (let n = 0; n < 60; n++) { o = shuffle([0, 1, 2], rng); if (!bad.includes(o.join(''))) break; } return o; };
      let below = '', items = [];

      if (mode === 'challenge') {
        if (lv === 1) {
          const at = mixed3(['012', '210']);
          below = t.challenge.map((c, k) => { const opts = placed(c.answer, shuffle(c.wrong, rng), at[k]); return cream(`data-lcs-question="${k + 1}"`, label(num(k + 1) + esc(c.q)) + choices(opts, at[k], key, { column: opts.join('').length > 46, font: 16 })); }).join('');
        } else {
          const ROWS = [2, 2, 1];   // the problem and what the character does are sentences; the feeling is a word
          below = t.challenge.map((c, k) => cream(`data-lcs-question="${k + 1}"`, lv === 3 && ROWS[k] === 1
            ? inlineRow(num(k + 1) + esc(c.q), 300, line({ w: inner - 308, h: d.rowH, answer: key ? c.answer : null }))
            : label(num(k + 1) + esc(c.q)) + line({ w: inner, h: d.rowH, answer: key ? c.answer : null }) + (ROWS[k] === 2 ? line({ w: inner, h: d.rowH }) : ''), lv === 3 ? 4 : 6)).join('') +
            (lv === 3 ? cream('data-lcs-own="1"', label(num(4) + `If you were <b>${esc(t.you)}</b>, what would you have done? Why?`) + line({ w: inner, h: d.rowH, answer: key ? 'Answers will vary.' : null, sample: true }) + line({ w: inner, h: d.rowH }), 4) : '');
        }
        items = t.challenge.map((c) => t.id + ': ' + c.q);
      }

      if (mode === 'events') {
        if (lv === 1) {
          const order = mixed3(['012', '021', '102', '210']);   // no effect in the place of its cause
          const letterOf = (i) => 'ABC'[order.indexOf(i)];
          below = cream('data-lcs-causes="1"', label(`<b style="font-weight:800;color:${T.teal}">Causes.</b> What happened because of each? Write the letter of its effect in the box.`) +
            t.links.map((l, i) => `<div data-lcs-cause="${letterOf(i)}" style="display:flex;align-items:center;gap:10px;min-height:40px">${numBox(letterOf(i), key)}<span style="font:700 16.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(l.cause)}</span></div>`).join(''), 7) +
            cream('data-lcs-effects="1"', label(`<b style="font-weight:800;color:${T.teal}">Effects</b>`) +
            order.map((i, k) => `<div data-lcs-effect="${'ABC'[k]}" style="display:flex;align-items:baseline;gap:8px;min-height:30px;font:700 16.5px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="flex:0 0 auto;font-weight:800;color:${T.teal}">${'ABC'[k]}</b><span>${esc(t.links[i].effect)}</span></div>`).join(''), 7);
        } else {
          const give = lv === 2 ? ['cause', 'cause', 'cause'] : shuffle(['cause', 'cause', 'effect'], rng);
          const cards = t.links.map((l, k) => { const g = give[k], miss = g === 'cause' ? 'effect' : 'cause';
            return cream(`data-lcs-pair="${k + 1}" data-lcs-given-kind="${g}"`, `<div data-lcs-given="${g}" style="font:700 16px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(k + 1)}<b style="font-weight:800;color:${T.teal}">${g === 'cause' ? 'Cause:' : 'Effect:'}</b> ${esc(l[g])}</div>` +
              `<div style="display:flex;align-items:flex-end;gap:8px"><span data-lcs-asks="${miss}" style="flex:0 0 auto;padding-bottom:6px;font:800 16px/1 'Nunito',sans-serif;color:${T.teal}">${miss === 'cause' ? 'Cause:' : 'Effect:'}</span><div style="flex:1 1 auto;min-width:0">${line({ w: inner - 72, h: d.rowH, answer: key ? l[miss] : null, sample: true })}</div></div>` + (lv === 2 ? line({ w: inner, h: d.rowH }) : '')); });
          const pick = t.links[rng.int(0, 2)];
          below = cards.join('') + (lv === 3 ? cream('data-lcs-onesentence="1"', label(num(4) + `Write one cause and its effect as ONE sentence. Use <b style="font-weight:800;color:${T.teal}">because</b> or <b style="font-weight:800;color:${T.teal}">so</b>.`) + line({ w: inner, h: d.rowH, answer: key ? pick.cause.replace(/\.$/, '') + ', so ' + lowerFirst(pick.effect) : null, sample: true }) + line({ w: inner, h: d.rowH })) : '');
        }
        items = t.links.map((l) => t.id + ': ' + l.cause);
      }

      if (mode === 'lesson') {
        const m = t.lesson;
        if (lv === 1) {
          const at = rng.int(0, 2);
          let rows; for (let n = 0; n < 60; n++) { rows = shuffle([...t.shows.map((s) => ({ s, ok: 1 })), { s: t.notInStory, ok: 0 }], rng); if (rows[2].ok) break; }
          const tick = (on) => `<span data-lcs-tick${on ? ' data-lcs-on="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;line-height:0">${key && on ? CHECK : ''}</span>`;
          below = cream('data-lcs-lesson="1"', label('What is the lesson of the story? Circle the sentence.') + choices(placed(m.right, shuffle([m.lure, m.literal], rng), at), at, key, { column: true, font: 16 }), 7) +
            cream('data-lcs-shows="1"', label('Two of these sentences tell what happens in the story and show the lesson. Put a check mark next to them. One sentence is not in the story.') +
              rows.map((r) => `<div data-lcs-show="${r.ok}" style="display:flex;align-items:center;gap:10px;min-height:46px">${tick(!!r.ok)}<span style="font:700 16px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.s)}</span></div>`).join(''), 7);
        } else {
          below = `<div data-lcs-lesson="1" style="display:flex;flex-direction:column;gap:2px;padding:6px 12px 9px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${label('The lesson of the story', 16, T.teal)}` + line({ w: inner - 5, h: d.rowH, answer: key ? m.right : null, sample: true }) + line({ w: inner - 5, h: d.rowH }) + `</div>` +
            cream('data-lcs-shows="1"', label('What does a character do that shows this lesson?') + line({ w: inner, h: d.rowH, answer: key ? t.shows[0] : null, sample: true }) + line({ w: inner, h: d.rowH, answer: key ? t.shows[1] : null, sample: true })) +
            (lv === 3 ? cream('data-lcs-how="1"', label('How does the ending of the story teach the lesson?') + line({ w: inner, h: d.rowH, answer: key ? t.how : null, sample: true }) + line({ w: inner, h: d.rowH })) : '');
        }
        items = [t.id + ': ' + m.right];
      }

      if (mode === 'retell') {
        const NAMES = ['Beginning', 'Middle', 'End'];
        if (lv === 1) {
          const order = mixed3(['012', '210']), at = rng.int(0, 2);
          below = cream('data-lcs-strips="1"', label('These three sentences retell the story. Put them in order: write 1, 2, and 3 in the boxes.') +
            order.map((i) => `<div data-lcs-strip="${i + 1}" style="display:flex;align-items:center;gap:10px;min-height:42px">${numBox(i + 1, key)}<span style="font:700 16.5px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t.retell[i])}</span></div>`).join(''), 7) +
            cream('data-lcs-question="1"', label('What happens in the <b>middle</b> of the story? Circle the sentence.') + choices(placed(t.retell[1], shuffle([t.retell[0], t.retell[2]], rng), at), at, key, { column: true, font: 16 }), 7);
        } else {
          const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
          below = NAMES.map((nm, i) => cream(`data-lcs-partbox="${i + 1}"`, (lv === 3
            ? inlineRow(teal(nm), 92, line({ w: inner - 100, h: d.rowH, answer: key ? t.retell[i] : null, sample: true }))
            : label(nm, 16.5, T.teal) + line({ w: inner, h: d.rowH, answer: key ? t.retell[i] : null, sample: true })) + line({ w: inner, h: d.rowH }), lv === 3 ? 3 : 5)).join('') +
            (lv === 3 ? cream('data-lcs-lessonline="1"', inlineRow(teal('The lesson'), 92, line({ w: inner - 100, h: d.rowH, answer: key ? t.lesson.right : null, sample: true })) + line({ w: inner, h: d.rowH }), 3) : '');
        }
        items = t.retell.map((s) => t.id + ': ' + s);
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-story2page="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + storyBox(t, { font: d.font, lh: d.lh }) + below + `</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-story2page]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsStory2page.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root), box = document.querySelector('[data-lcs-story2]');
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 3) fails.push('the story is not three paragraphs');
        parts.forEach((p, i) => { if (parseFloat(getComputedStyle(p).fontSize) < 16) fails.push('paragraph ' + (i + 1) + ' is printed too small for Grade 2'); });
        if (/\b[123]\b/.test([...box.querySelectorAll('span')].map((s) => s.textContent).join(' '))) fails.push('the paragraphs carry numbers');
        const n = +box.dataset.lcsWords; if (n < 120 || n > 185) fails.push(`the story has ${n} words`);
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        box.querySelectorAll('*').forEach((e) => { const r = R(e), b = R(box); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves the story box'); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const CARDS = '[data-lcs-question], [data-lcs-own], [data-lcs-causes], [data-lcs-effects], [data-lcs-pair], [data-lcs-onesentence], [data-lcs-lesson], [data-lcs-shows], [data-lcs-how], [data-lcs-strips], [data-lcs-partbox], [data-lcs-lessonline]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'), c = l.closest(CARDS); if (!s || !c || R(s).right > R(c).right + 0.5 || R(s).bottom > R(c).bottom + 0.5) fails.push('a writing line leaves its card');
          if (s && R(s).height < 44) fails.push(`a writing row of ${Math.round(R(s).height)} px (a Grade 2 row has 44 or more)`);
          if (s && R(s).width < rb.width * 0.5) fails.push('a writing line shorter than half the page'); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-numbox], [data-lcs-given], span').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((b) => { if (R(b).width < 32) fails.push('a box too small for a second grader'); if (!isKey && b.textContent.trim()) fails.push('a box is filled'); });
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => { const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.textContent.trim())).size !== 3) fails.push(`answers ${i + 1}: not three different with one right`);
          all.forEach((e) => { if (R(e).right > R(c.parentElement).right + 0.5) fails.push(`answers ${i + 1}: an answer leaves its card`); }); });
        const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));

        if (mode === 'challenge') {
          const qs = document.querySelectorAll('[data-lcs-question]').length;
          if (qs !== 3) fails.push('not three questions');
          if (lv === 1) { if (sets.length !== 3 || lines.length || new Set(place).size !== 3 || /^(012|210)$/.test(place.join(''))) fails.push('level 1 is not three questions whose right answers stand in three different places, not as a staircase: ' + place.join('')); }
          else if (sets.length || lines.length !== (lv === 2 ? 5 : 7) || (lv === 3) !== !!document.querySelector('[data-lcs-own]')) fails.push(`level ${lv}: ${lines.length} writing rows (two for a sentence, one for the feeling word)`);
        }
        if (mode === 'events') {
          if (lv === 1) {
            const causes = [...document.querySelectorAll('[data-lcs-cause]')], want = causes.map((c) => c.dataset.lcsCause).join('');
            if (causes.length !== 3 || [...document.querySelectorAll('[data-lcs-effect]')].map((e) => e.dataset.lcsEffect).join('') !== 'ABC' || [...want].sort().join('') !== 'ABC') fails.push('not three causes and three effects A to C');
            if ([...want].some((l, i) => l === 'ABC'[i])) fails.push('an effect stands in the place of its cause: ' + want);
            causes.forEach((c) => { if (c.querySelector('[data-lcs-numbox]').dataset.lcsWant !== c.dataset.lcsCause) fails.push('a box is keyed to another effect'); });
            if (sets.length || lines.length || boxes.length !== 3) fails.push('level 1 is not three boxes for three letters');
          } else {
            const pairs = [...document.querySelectorAll('[data-lcs-pair]')], kinds = pairs.map((p) => p.dataset.lcsGivenKind);
            if (pairs.length !== 3 || sets.length || boxes.length) fails.push(`level ${lv}: ${pairs.length} cards`);
            if (lv === 2 ? kinds.join() !== 'cause,cause,cause' : kinds.slice().sort().join() !== 'cause,cause,effect') fails.push(`level ${lv} gives ${kinds.join()}`);
            pairs.forEach((p, i) => { const g = p.querySelector('[data-lcs-given]'), a = p.querySelector('[data-lcs-asks]'); if (!g || g.dataset.lcsGiven !== p.dataset.lcsGivenKind || !a || a.dataset.lcsAsks === p.dataset.lcsGivenKind) fails.push(`card ${i + 1} asks for the half it gives`); });
            if (lines.length !== (lv === 2 ? 6 : 5) || (lv === 3) !== !!document.querySelector('[data-lcs-onesentence]')) fails.push(`level ${lv}: ${lines.length} writing lines`);
          }
        }
        if (mode === 'lesson') {
          if (!document.querySelector('[data-lcs-lesson]') || !document.querySelector('[data-lcs-shows]')) fails.push('no lesson or no events that show it');
          if (lv === 1) {
            const rows = [...document.querySelectorAll('[data-lcs-show]')];
            if (sets.length !== 1 || lines.length || rows.length !== 3 || rows.filter((r) => r.dataset.lcsShow === '1').length !== 2) fails.push('level 1 is not one lesson to circle and two of three sentences to check');
            if (rows.length && rows[rows.length - 1].dataset.lcsShow !== '1') fails.push('the sentence that is not in the story stands last');
            rows.forEach((r, i) => { const tk = r.querySelector('[data-lcs-tick]'); if (!tk || R(tk).width < 28 || !!tk.dataset.lcsOn !== (r.dataset.lcsShow === '1')) fails.push(`the box of sentence ${i + 1} is keyed wrong`); if (tk && (isKey ? !!tk.querySelector('svg') !== !!tk.dataset.lcsOn : tk.querySelector('svg'))) fails.push('a check mark is printed where none belongs'); });
          } else if (sets.length || lines.length !== (lv === 2 ? 4 : 6) || (lv === 3) !== !!document.querySelector('[data-lcs-how]')) fails.push(`level ${lv}: ${lines.length} writing lines`);
        }
        if (mode === 'retell') {
          if (lv === 1) {
            const strips = [...document.querySelectorAll('[data-lcs-strip]')], seq = strips.map((s) => s.dataset.lcsStrip).join('');
            if (strips.length !== 3 || [...seq].sort().join('') !== '123' || seq === '123' || seq === '321') fails.push('the three sentences are not mixed: ' + seq);
            strips.forEach((s) => { if (s.querySelector('[data-lcs-numbox]').dataset.lcsWant !== s.dataset.lcsStrip) fails.push('a box is keyed to another place'); });
            const mid = (strips.find((s) => s.dataset.lcsStrip === '2') || { textContent: '' }).textContent.trim();
            if (sets.length !== 1 || lines.length || boxes.length !== 3 || (sets[0].querySelector('[data-lcs-ok]') || { textContent: '' }).textContent.trim() !== mid) fails.push('level 1 is not three sentences to number and the middle to circle');
          } else {
            const pb = [...document.querySelectorAll('[data-lcs-partbox]')];
            if (pb.length !== 3 || pb.map((p) => p.querySelector('[data-lcs-label]').textContent.trim()).join() !== 'Beginning,Middle,End' || sets.length || boxes.length) fails.push('not the three boxes Beginning, Middle, End');
            if (lines.length !== (lv === 2 ? 6 : 8) || (lv === 3) !== !!document.querySelector('[data-lcs-lessonline]')) fails.push(`level ${lv}: ${lines.length} writing rows`);
          }
        }
        return fails;
      });
    },
  };
}

module.exports = { makeStory2Type, story2FaultsOf, STORIES, LEVELS };
