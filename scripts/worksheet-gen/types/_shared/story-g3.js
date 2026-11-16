/**
 * story-g3.js — the Grade 3 STORY bank and two page types of its own (English literacy year, Daily Teaching System
 * Part 12.3, 2026-11-16; unit "Stories: Evidence, Lessons, and Characters", Grade 3). The stories are the key `g3` of
 * data/literacy/stories.en.json: five fables and folktales retold in about 210 words and four numbered paragraphs.
 *
 * Four more page types print the same stories through the factories of the informational texts
 * (makeInfoText3Type and makeInfoText3cType with `texts: STORIES, story: true`): answers with evidence, questions
 * asked and answered, the story in four events, and what the characters' actions lead to.
 *
 *   message   The Central Message (RL.3.2: determine the central message, lesson, or moral and explain how it is
 *             conveyed through key details)
 *               level 1  circle the message (beside the message of another story and a sentence that takes the
 *                        story too literally); check the three events that show it among four sentences
 *               level 2  write the message and three things that happen in the story and show it
 *               level 3  the same, and two lines that tell how the ending teaches the message
 *   traits    Character Traits (RL.3.3: describe characters: their traits, motivations, or feelings)
 *               level 1  for two characters circle the word that tells what the character is like; then give each
 *                        of two lettered sentences to the trait it shows (a third sentence shows none)
 *               level 2  write the trait of each character (six words are offered) and copy the sentence that shows it
 *               level 3  a word of the child's own with the sentence that shows it; how a character feels at the end
 *   prep      Get Ready to Talk About a Story (SL.3.1.a: come to discussions prepared, having read the material; draw
 *             on that preparation). Open notes: nothing is keyed.
 *               level 1  a part that surprised me (its paragraph, and why), a question for my group, one more thing
 *               level 2  the part, the question, and the words of the story I will read aloud (two lines)
 *               level 3  the same, and what I think the story teaches with the part that makes me think so
 *   talk      Talk About the Story (SL.3.1.a/d): open questions of the story, the child's idea and the paragraph
 *             that supports it; four sentence starters for the talk are printed on every level
 *               level 1  two questions      level 2  three questions      level 3  three, and a question of the child's own
 *             (an idea has TWO full lines: the reviewer, 2026-11-16)
 *
 * Writing lines are the ruled lines of info-text-g3.js (rule()). English only. Themeless: a copy is another story.
 * PDF only. The bank is checked when this file loads (storyFaultsOf); no picture is looked up at load.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/stories.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, choices, placed } = _parts;
const { _parts3 } = require('./info-text-g3.js');
const { wordsIn, partText, textBox, cream, label, num, numBox, rule } = _parts3;
const { connectFaultsOf } = require('./info-text-g3c.js');

const WORDS = ['Who', 'What', 'Where', 'When', 'Why', 'How'];
/** What must be true of a story before any page prints it. Returns the list of faults (empty = sound). */
function storyFaultsOf(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.parts) || t.parts.length !== 4) return [id + ': not four paragraphs'];
  const all = t.parts.flatMap((p) => p.sentences), total = wordsIn(all.join(' '));
  if (total < 200 || total > 265) f.push(`${id}: ${total} words (a Grade 3 story has 200 to 265)`);
  t.parts.forEach((p, i) => { if (p.sentences.length < 4) f.push(`${id} paragraph ${i + 1}: fewer than four sentences`); p.sentences.forEach((x) => { if (wordsIn(x) > 24 || !/[.!?]"?$/.test(x)) f.push(`${id} paragraph ${i + 1}: "${x.slice(0, 30)}..." is too long or no whole sentence`); }); });
  if (new Set(all).size !== all.length) f.push(id + ': a sentence stands twice');
  if (!t.title || !t.kind || !t.picture || !t.picture.theme || !t.picture.noun) f.push(id + ': no title, no kind or no picture');
  const one = (s, max) => typeof s === 'string' && /\.$/.test(s) && s.length <= max;
  const m = t.message || {};
  if (![m.right, m.lure, m.literal].every((s) => one(s, 90)) || new Set([m.right, m.lure, m.literal]).size !== 3) f.push(id + ': not a message, the message of another story and a literal sentence (at most 90 letters each)');
  if (!Array.isArray(t.shows) || t.shows.length !== 3 || ![...(t.shows || []), t.notInStory].every((s) => one(s, 96)) || new Set([...(t.shows || []), t.notInStory]).size !== 4) f.push(id + ': not three events that show the message and one that the story does not tell');
  if (!one(t.how, 110)) f.push(id + ': no sample sentence that tells how the story shows the message');
  const qs = t.questions || [];
  if (qs.length !== 5) f.push(id + ': not five questions');
  qs.forEach((x, i) => {
    if (!/\?$/.test(x.q) || !Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.answer, ...x.wrong]).size !== 3) f.push(`${id}: "${x.q}" has not one right and two different wrong answers`);
    if (!(x.part >= 1 && x.part <= 4) || !t.parts[x.part - 1].sentences.includes(x.proof)) f.push(`${id}: the proof of "${x.q}" is no sentence of paragraph ${x.part}`);
    if (i && x.part < qs[i - 1].part) f.push(`${id}: the questions do not follow the story`);
  });
  if (new Set(qs.map((x) => x.part)).size !== 4 || new Set(qs.map((x) => x.proof)).size !== qs.length) f.push(id + ': a paragraph proves no answer, or two questions are proved by one sentence');
  const ask = t.ask || [];
  if (ask.length !== 4 || new Set(ask.map((a) => a.answer)).size !== 4 || new Set(ask.map((a) => a.q)).size !== 4 || new Set(ask.map((a) => a.word)).size < 3) f.push(id + ': not four different sentences with four different questions and three question words');
  ask.forEach((a) => {
    if (!WORDS.includes(a.word) || !a.q.startsWith(a.word + ' ') || !/\?$/.test(a.q)) f.push(`${id}: "${a.q}" does not begin with its question word`);
    if (!all.includes(a.answer) || a.answer.length > 100) f.push(`${id}: "${a.answer.slice(0, 30)}..." is no sentence of the story of at most 100 letters`);
    if (!a.lure || !/\?$/.test(a.lure) || !WORDS.some((w) => a.lure.startsWith(w + ' ')) || ask.some((b) => b.q === a.lure)) f.push(`${id}: "${a.q}" has no wrong question of its own`);
  });
  const tr = t.traits || [];
  if (tr.length !== 2) f.push(id + ': not two traits');
  tr.forEach((x) => {
    if (x.first !== undefined && x.first !== true) f.push(`${id}: "first" of ${x.who} is not true`);
    if (!x.who || !/^[a-z-]{3,14}$/.test(x.trait || '') || !Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.trait, ...x.wrong]).size !== 3) f.push(`${id}: the trait of ${x.who} is not one word with two different wrong words`);
    if (!all.includes(x.proof)) f.push(`${id}: the sentence that shows "${x.trait}" is no sentence of the story`);
  });
  if (tr.length === 2 && (tr[0].proof === tr[1].proof || tr[0].trait === tr[1].trait || new Set(tr.flatMap((x) => [x.trait, ...x.wrong])).size !== 6)) f.push(id + ': the two traits share a word or a sentence');
  if (t.pluralWho && (!Array.isArray(t.pluralWho) || t.pluralWho.some((w) => ![...tr.map((x) => x.who), (t.end || {}).who].includes(w)))) f.push(id + ': a plural character that the story pages do not name');
  if (!all.includes(t.plain) || tr.some((x) => x.proof === t.plain)) f.push(id + ': no plain sentence of the story that shows no trait');
  if (!Array.isArray(t.talk) || t.talk.length !== 4 || new Set(t.talk).size !== 4 || t.talk.some((x) => typeof x !== 'string' || !x.includes('?') || !/[?.]$/.test(x) || x.length > 80)) f.push(id + ': not four different open questions of at most 80 letters');
  const e = t.end || {};
  if (!e.who || !/^[a-z]{3,12}$/.test(e.feeling || '') || !e.why) f.push(id + ': no feeling at the end with its reason');
  return f.concat(connectFaultsOf(t));
}
const STORIES = BANK.g3 || [];
{ const f = STORIES.flatMap(storyFaultsOf); if (f.length) throw new Error('stories.en.json (g3): ' + f.join('; ')); }

const LEVELS = {
  message: { 1: { font: 15.6, lh: 1.42 }, 2: { font: 16.4, lh: 1.46, rowH: 40 }, 3: { font: 15, lh: 1.38, rowH: 31 } },
  prep: { 1: { font: 16, lh: 1.44, rowH: 36 }, 2: { font: 15.2, lh: 1.38, rowH: 32 }, 3: { font: 14.5, lh: 1.3, rowH: 28 } },
  talk: { 1: { font: 15.4, lh: 1.4, rowH: 32 }, 2: { font: 15, lh: 1.37, rowH: 29 }, 3: { font: 14.5, lh: 1.3, rowH: 28, pad: 4 } },
  traits: { 1: { font: 17, lh: 1.5 }, 2: { font: 16.4, lh: 1.46, rowH: 38 }, 3: { font: 15.2, lh: 1.4, rowH: 32 } },
};
const CHECK = `<svg width="18" height="18" viewBox="0 0 20 20"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

function makeStory3Type({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('story-g3: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories are English stories (no ${locale} bank)`);
      if (!STORIES.length) throw new Error(`${id}: the bank holds no Grade 3 story`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(STORIES, 1)[0];
      const inner = W - 24;
      const pl = (who) => (t.pluralWho || []).includes(who);   // "the villagers ARE like"
      let below = '', items = [];

      if (mode === 'message') {
        const m = t.message;
        if (lv === 1) {
          const at = rng.int(0, 2);
          const idea = cream('data-lcs-message="1"', label('What is the central message (the lesson) of the story? Circle the sentence.', 15.5) + choices(placed(m.right, shuffle([m.lure, m.literal], rng), at), at, key, { column: true, font: 15 }), 6);
          let rows; for (let n = 0; n < 100; n++) { rows = shuffle([...t.shows.map((s) => ({ s, ok: 1 })), { s: t.notInStory, ok: 0 }], rng); if (rows[3].ok) break; }
          const tick = (on) => `<span data-lcs-tick${on ? ' data-lcs-on="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;line-height:0">${key && on ? CHECK : ''}</span>`;
          const det = cream('data-lcs-shows="1"', label('Three of these sentences tell what happens in the story and show its message. Check them. One sentence is not in the story.', 15.5) +
            rows.map((r) => `<div data-lcs-show="${r.ok}" style="display:flex;align-items:center;gap:10px;min-height:34px">${tick(!!r.ok)}<span style="font:700 15px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.s)}</span></div>`).join(''), 7);
          below = idea + det;
        } else {
          const idea = `<div data-lcs-message="1" style="display:flex;flex-direction:column;gap:2px;padding:5px 12px 8px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${label('The central message of the story (the lesson it teaches)', 15.5, T.teal)}` +
            rule({ w: inner - 5, h: d.rowH, answer: key ? m.right : null, sample: true }) + rule({ w: inner - 5, h: d.rowH }) + `</div>`;
          const det = cream('data-lcs-shows="1"', label('Three things that happen in the story and show this message', 15.5) +
            t.shows.map((s, k) => `<div data-lcs-showline="${k + 1}" style="display:flex;align-items:flex-end;gap:8px"><span style="flex:0 0 auto;font:800 16px/1.5 'Nunito',sans-serif;color:${T.teal}">${k + 1}</span><div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 26, h: d.rowH, answer: key ? s : null, sample: true })}</div></div>`).join(''), 6);
          const how = lv === 3 ? cream('data-lcs-how="1"', label('How does the ending of the story teach this message?', 15.5) + rule({ w: inner, h: d.rowH, answer: key ? t.how : null, sample: true }) + rule({ w: inner, h: d.rowH }), 6) : '';
          below = idea + det + how;
        }
        items = [t.id + ': ' + m.right];
      }

      if (mode === 'traits') {
        const tr = t.traits;
        if (lv === 1) {
          const at = [rng.int(0, 2), 0]; at[1] = (at[0] + 1 + rng.int(0, 1)) % 3;
          // the three lettered sentences: the two that show a trait and one that shows none, never in the order of the cards
          let order; for (let n = 0; n < 50; n++) { order = shuffle([0, 1, 2], rng); if (order.join('') !== '012') break; }
          const sents = [tr[0].proof, tr[1].proof, t.plain], letterOf = (i) => 'ABC'[order.indexOf(i)];
          const cards = tr.map((x, k) => cream(`data-lcs-trait="${k + 1}"`, label(num(k + 1) + `Which ${k && tr[0].who === x.who ? 'other ' : ''}word tells what <b>${esc(x.who)}</b> ${pl(x.who) ? 'are' : 'is'} like${x.first ? ' at first' : ''}?`, 15) + choices(placed(x.trait, shuffle(x.wrong, rng), at[k]), at[k], key, { font: 15 }) +
            `<div style="display:flex;align-items:center;gap:10px;margin-top:2px">${numBox(letterOf(k), key)}<span style="font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}">The letter of the sentence that shows it</span></div>`, 6));
          const list = cream('data-lcs-sentences="1"', label('Sentences from the story. One of them shows nothing about a character.', 15) +
            order.map((i, k) => `<div data-lcs-sentence="${'ABC'[k]}" style="display:flex;align-items:baseline;gap:8px;font:700 14.5px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="flex:0 0 auto;font-weight:800;color:${T.teal}">${'ABC'[k]}</b><span>${esc(sents[i])}</span></div>`).join(''), 6);
          below = `<div data-lcs-qgrid style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px">${cards.join('')}</div>` + list;
        } else {
          const bank = lv === 2 ? `<div data-lcs-wordbank style="flex:0 0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;font:700 14.5px/1.2 'Nunito',sans-serif;color:${T.ink}"><span style="font-weight:800;color:${T.teal}">Words:</span>` +
            shuffle(tr.flatMap((x) => [x.trait, ...x.wrong]), rng).map((w) => `<span data-lcs-bankword style="padding:2px 10px;border:2px solid ${T.ink};border-radius:999px;background:#FFFFFF">${esc(w)}</span>`).join('') + `</div>` : '';
          const cards = tr.map((x, k) => cream(`data-lcs-trait="${k + 1}"`,
            `<div style="display:flex;align-items:flex-end;gap:8px"><span data-lcs-label style="flex:0 0 auto;white-space:nowrap;padding-bottom:3px;font:700 15px/1 'Nunito',sans-serif;color:${T.ink}">${num(k + 1)}${x.first ? 'At first, ' + esc(x.who) : esc(cap(x.who))} ${pl(x.who) ? 'are' : 'is'}${k && tr[0].who === x.who ? ' also' : ''}</span><div style="flex:1 1 auto;min-width:0">${rule({ w: inner - 230, h: d.rowH, answer: key ? x.trait : null, sample: lv === 3 })}</div></div>` +
            rule({ w: inner, h: d.rowH, starter: 'The story says:', answer: key ? 'The story says: ' + x.proof : null, sample: true }) + rule({ w: inner, h: d.rowH }), 6));
          const end = lv === 3 ? cream('data-lcs-feeling="1"', label(`How ${pl(t.end.who) ? 'do' : 'does'} <b>${esc(t.end.who)}</b> feel at the end of the story? Why?`, 15.5) + rule({ w: inner, h: d.rowH, answer: key ? cap(t.end.who) + (pl(t.end.who) ? ' feel ' : ' feels ') + t.end.feeling + ' because ' + t.end.why + '.' : null, sample: true }) + rule({ w: inner, h: d.rowH }), 6) : '';
          below = bank + cards.join('') + end;
        }
        items = tr.map((x) => t.id + ': ' + x.who + ' is ' + x.trait);
      }

      const paraBox = (text) => `<span style="flex:0 0 auto;display:inline-flex;align-items:center;gap:5px;font:700 13.5px/1 'Nunito',sans-serif;color:${T.ink}">${text} ${numBox('', false)}</span>`;
      const vary = key ? 'answers will vary' : null;
      if (mode === 'prep') {
        const cards = [
          cream('data-lcs-note="part"', `<div style="display:flex;align-items:center;gap:10px">${label(num(1) + 'A part that surprised me is in', 15)}${paraBox('paragraph')}</div>` + rule({ w: inner, h: d.rowH, starter: 'It surprised me because', answer: key ? 'It surprised me because (' + vary + ')' : null, sample: true }) + rule({ w: inner, h: d.rowH }), 6),
          cream('data-lcs-note="question"', `<div style="display:flex;align-items:center;gap:10px">${label(num(2) + 'A question I want to ask my group about', 15)}${paraBox('paragraph')}</div>` + rule({ w: inner, h: d.rowH, answer: vary, sample: true }), 6),
          lv === 1 ? cream('data-lcs-note="more"', label(num(3) + 'One more thing I want to say about the story', 15) + rule({ w: inner, h: d.rowH, answer: vary, sample: true }), 6)
            : cream('data-lcs-note="aloud"', label(num(3) + 'The words of the story that I will read aloud to my group (copy them)', 15) + rule({ w: inner, h: d.rowH, answer: vary, sample: true }) + rule({ w: inner, h: d.rowH }), 6),
        ];
        if (lv === 3) cards.push(cream('data-lcs-note="teaches"', label(num(4) + 'What I think the story teaches, and the part that makes me think so', 15) + rule({ w: inner, h: d.rowH, answer: vary, sample: true }) + rule({ w: inner, h: d.rowH }), 6));
        below = cards.join('');
        items = [t.id + ': notes for the talk'];
      }
      if (mode === 'talk') {
        const STARTERS = ['I think ... because the story says ...', 'I agree with ... because ...', 'I see it differently because ...', 'Can you show where the story says that?'];
        const strip = `<div data-lcs-starters style="flex:0 0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;font:700 13.5px/1.2 'Nunito',sans-serif;color:${T.ink}"><span style="font-weight:800;color:${T.teal}">Words for the talk:</span>` +
          STARTERS.map((x) => `<span data-lcs-starterchip style="padding:2px 9px;border:2px solid ${T.teal};border-radius:999px;background:#FFFFFF">${esc(x)}</span>`).join('') + `</div>`;
        const qs = shuffle(t.talk, rng).slice(0, lv === 1 ? 2 : 3);
        const cards = qs.map((x, k) => cream(`data-lcs-talkq="${k + 1}"`, `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px">${label(num(k + 1) + esc(x), 15)}${paraBox('paragraph')}</div>` +
          rule({ w: inner, h: d.rowH, starter: 'My idea:', answer: key ? 'My idea: (' + vary + ')' : null, sample: true }) + rule({ w: inner, h: d.rowH }), d.pad || 6));
        if (lv === 3) cards.push(cream('data-lcs-ownq="1"', label(num(4) + 'A question of my own for the group', 15) + rule({ w: inner, h: d.rowH, answer: vary, sample: true }), d.pad || 6));
        below = strip + cards.join('');
        items = qs.map((x) => t.id + ': ' + x);
      }

      return {
        bodyHtml: `<div data-ws-content data-lcs-story3="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + textBox(t, { font: d.font, lh: d.lh, headings: false }) + below + `</div>`,
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-story3]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsStory3.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root), box = document.querySelector('[data-lcs-info3text]');
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 4 || box.querySelectorAll('[data-lcs-heading]').length) fails.push('the story is not four paragraphs without headings');
        parts.forEach((p, i) => { if (parseFloat(getComputedStyle(p.querySelector('[data-lcs-partbody]')).fontSize) < 14.5) fails.push('paragraph ' + (i + 1) + ' is printed too small'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        box.querySelectorAll('*').forEach((e) => { const r = R(e), b = R(box); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves the story box'); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const CARDS = '[data-lcs-message], [data-lcs-shows], [data-lcs-how], [data-lcs-trait], [data-lcs-sentences], [data-lcs-feeling], [data-lcs-note], [data-lcs-talkq], [data-lcs-ownq]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const c = l.closest(CARDS), r = R(l); if (!c || r.right > R(c).right + 0.5 || r.bottom > R(c).bottom + 0.5) fails.push('a writing line leaves its card');
          if (r.height < 27.5) fails.push(`a writing line of ${Math.round(r.height)} px (wide-ruled paper is 28)`);
          if (r.width < rb.width * 0.5) fails.push('a writing line shorter than half the page');
          const kt = l.querySelector('[data-lcs-keytext]'); if (kt && (R(kt).right > r.right + 0.5 || parseFloat(getComputedStyle(kt).fontSize) < 9)) fails.push('a key answer does not fit its line'); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-numbox], span').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5)) fails.push('something leaves its card'); }); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((b) => { if (R(b).width < 28) fails.push('a box too small'); if (!isKey && b.textContent.trim()) fails.push('a box is filled'); });
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => { const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.textContent.trim())).size !== 3) fails.push(`answers ${i + 1}: not three different with one right`);
          all.forEach((e) => { if (R(e).right > R(c.parentElement).right + 0.5) fails.push(`answers ${i + 1}: an answer leaves its card`); }); });

        if (mode === 'message') {
          if (!document.querySelector('[data-lcs-message]') || !document.querySelector('[data-lcs-shows]')) fails.push('no message or no events that show it');
          if (lv === 1) {
            if (sets.length !== 1 || lines.length) fails.push('level 1 is not one message to circle and events to check');
            const rows = [...document.querySelectorAll('[data-lcs-show]')];
            if (rows.length !== 4 || rows.filter((r) => r.dataset.lcsShow === '1').length !== 3) fails.push('not three events that show the message and one that is not in the story');
            if (rows.length && rows[rows.length - 1].dataset.lcsShow !== '1') fails.push('the sentence that is not in the story stands last');
            rows.forEach((r, i) => { const tk = r.querySelector('[data-lcs-tick]'); if (!tk || R(tk).width < 26 || !!tk.dataset.lcsOn !== (r.dataset.lcsShow === '1')) fails.push(`the box of sentence ${i + 1} is keyed wrong`); if (tk && (isKey ? !!tk.querySelector('svg') !== !!tk.dataset.lcsOn : tk.querySelector('svg'))) fails.push('a check mark is printed where none belongs'); });
          } else {
            const want = lv === 2 ? 5 : 7;
            if (sets.length || lines.length !== want || document.querySelectorAll('[data-lcs-showline]').length !== 3) fails.push(`level ${lv}: ${lines.length} writing lines (wanted ${want})`);
            if (lv === 3 ? !document.querySelector('[data-lcs-how]') : document.querySelector('[data-lcs-how]')) fails.push('the question about the ending is on the wrong level');
          }
        }
        if (mode === 'traits') {
          const cards = [...document.querySelectorAll('[data-lcs-trait]')];
          if (cards.length !== 2) fails.push('not two characters');
          if (lv === 1) {
            const sents = [...document.querySelectorAll('[data-lcs-sentence]')];
            if (sets.length !== 2 || lines.length || boxes.length !== 2 || sents.map((s) => s.dataset.lcsSentence).join('') !== 'ABC') fails.push('level 1 is not two traits to circle, two boxes and three lettered sentences');
            const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
            if (place.length === 2 && place[0] === place[1]) fails.push('both right words stand in the same place');
            const want = boxes.map((b) => b.dataset.lcsWant).join('');
            if (new Set(want).size !== 2 || want === 'AB') fails.push('the sentences stand in the order of the cards: ' + want);
            if (new Set(sents.map((s) => s.textContent)).size !== 3) fails.push('a sentence stands twice');
          } else {
            if (sets.length || boxes.length || lines.length !== (lv === 2 ? 6 : 8)) fails.push(`level ${lv}: ${lines.length} writing lines`);
            const words = document.querySelectorAll('[data-lcs-bankword]').length;
            if (lv === 2 ? words !== 6 : words !== 0) fails.push(`level ${lv}: ${words} words are offered`);
            if (lv === 3 ? !document.querySelector('[data-lcs-feeling]') : document.querySelector('[data-lcs-feeling]')) fails.push('the question about the feeling is on the wrong level');
          }
        }
        if (mode === 'prep') {
          const notes = [...document.querySelectorAll('[data-lcs-note]')].map((n) => n.dataset.lcsNote).join();
          if (notes !== (lv === 1 ? 'part,question,more' : lv === 2 ? 'part,question,aloud' : 'part,question,aloud,teaches')) fails.push('level ' + lv + ' has the notes ' + notes);
          if (sets.length || boxes.length !== 2 || lines.length !== (lv === 1 ? 4 : lv === 2 ? 5 : 7) || document.querySelector('[data-lcs-note="part"]').querySelectorAll('[data-lcs-line]').length !== 2) fails.push(`level ${lv}: ${lines.length} writing lines and ${boxes.length} paragraph boxes`);
        }
        if (mode === 'talk') {
          const qs = [...document.querySelectorAll('[data-lcs-talkq]')], n = lv === 1 ? 2 : 3;
          if (qs.length !== n || new Set(qs.map((q) => q.querySelector('[data-lcs-label]').textContent)).size !== n) fails.push(`level ${lv}: ${qs.length} different questions (wanted ${n})`);
          if (document.querySelectorAll('[data-lcs-starterchip]').length !== 4) fails.push('the four sentence starters for the talk are not printed');
          if (sets.length || boxes.length !== n || lines.length !== 2 * n + (lv === 3 ? 1 : 0) || qs.some((q) => q.querySelectorAll('[data-lcs-line]').length !== 2) || (lv === 3) !== !!document.querySelector('[data-lcs-ownq]')) fails.push(`level ${lv}: ${lines.length} writing lines and ${boxes.length} paragraph boxes`);
          qs.forEach((q, i) => { if (!q.querySelector('[data-lcs-numbox]') || !q.querySelector('[data-lcs-line]') || (q.querySelector('[data-lcs-line]').dataset.lcsStartertext || (isKey ? 'My idea:' : '')) !== 'My idea:') fails.push(`question ${i + 1} has no line for the idea or no paragraph box`); });
        }
        return fails;
      });
    },
  };
}

module.exports = { makeStory3Type, storyFaultsOf, STORIES, LEVELS };
