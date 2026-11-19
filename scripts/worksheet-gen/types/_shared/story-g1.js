/**
 * story-g1.js — five Grade 1 pages on ONE short story (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-17; the unit "Reading Stories: Characters and Lessons" of Grade 1). The stories are the key `g1` of
 * data/literacy/stories.en.json: five original stories of about 70 words in THREE parts (beginning, middle, end),
 * two animal characters with their library pictures, three spoken lines.
 *
 *   details   Find the Answer in the Story (RL.1.1: ask and answer questions about key details)
 *               level 1  four questions in the order of the story, three answers each
 *               level 2  the four questions; the answer starts on the line (a sentence starter)
 *               level 3  three of the questions: the child writes a whole sentence (two rows) and underlines the
 *                        sentence of the story that tells it
 *   map       Characters, Setting, and Events (RL.1.3: describe characters, settings, and major events)
 *               level 1  circle the two characters among four animals (the story is printed without its two
 *                        pictures, so the child reads who is in it); circle the setting and the big event
 *               level 2  write a word or a few words in each box
 *               level 3  write a sentence in each box
 *   retell    Retell the Story and Tell Its Lesson (RL.1.2: retell stories, with their central message or lesson)
 *               level 1  three sentences to number; the lesson to circle (beside the lesson of another story)
 *               level 2  a word bank; one sentence each for beginning, middle and end; the lesson to circle
 *               level 3  the retelling and the lesson in the child's own words
 *   feelings  Feeling Words and Sense Words (RL.1.4: words that suggest feelings or appeal to the senses)
 *               level 1  four words in a box to underline in the story; the face or the part of the body of each
 *               level 2  the two feeling words found and written; a question for each sense word, with its part of the body
 *               level 3  the same, and how another character feels and why
 *   who       Who Is Telling the Story? (RL.1.6: identify who is telling the story at various points)
 *               level 1  six sentences: the narrator or one of the two characters to circle
 *               level 2  the letter in a box (N for the narrator, the first letter of a character)
 *               level 3  the same, and one more thing a character could say
 *
 * Writing lines are handwriting rows (info-text.js line()), 50 px or more high and as high as the page allows; an
 * answer that is a whole sentence gets two rows. Read by a US Grade 1 reviewer with the rendered pages (2026-11-17,
 * every finding applied; the half-inch ruling the reviewer asked for does not fit beside a story on one page). English only. Themeless: a copy is
 * another story. PDF only. The bank is checked when this file loads (story1FaultsOf); no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/stories.en.json');
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle, line, choices, placed } = _parts;

const FACES = { happy: { theme: 'emotions', noun: 'happy' }, sad: { theme: 'emotions', noun: 'sad' }, angry: { theme: 'emotions', noun: 'angry' }, scared: { theme: 'emotions', noun: 'scared' } };
const FACE_WRONG = { happy: ['sad', 'angry'], sad: ['happy', 'angry'], angry: ['happy', 'sad'], scared: ['happy', 'angry'] };
const ORGANS = { ear: { theme: 'body parts', noun: 'ear', name: 'ears' }, eye: { theme: 'body parts', noun: 'eye', name: 'eyes' }, nose: { theme: 'body parts', noun: 'nose', name: 'nose' }, mouth: { theme: 'body parts', noun: 'mouth', name: 'mouth' }, hand: { theme: 'body parts', noun: 'hand', name: 'hands' } };
/** words that name a feeling: a story may hold its two feeling words and no other of these */
const FEELING_WORDS = ['happy', 'glad', 'sad', 'mad', 'angry', 'scared', 'afraid', 'upset', 'proud', 'tired', 'sorry', 'excited', 'worried', 'shy', 'lonely', 'cross', 'bored', 'surprised', 'unhappy', 'merry',
  'smiled', 'smile', 'smiles', 'cried', 'cries', 'laughed', 'laughs', 'frowned', 'grinned', 'sighed', 'cheered'];   // what a character does can tell a feeling too ("Ben smiled.")
const TWO_ROWS = true;   // a whole sentence of a first grader needs two rows

/** The text a child reads with typographic marks, as the Grade 2 and Grade 3 story pages print it (review
 *  en.review-1119-read: these pages printed straight quotes beside them): an apostrophe is ’; a double mark opens after a
 *  space or a bracket, or at the start of a text whose next character is a letter, and closes otherwise. Tags and their
 *  attributes stay as they are (the answers a check reads stand in attributes). */
function curly(html) {
  let out = '', i = 0, prev = ' ';
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), chars = [...html.slice(i, j < 0 ? html.length : j)];
    chars.forEach((ch, k) => {
      if (ch === "'") out += '’';
      else if (ch === '"') out += /[\s([—]/.test(prev) || (k === 0 && /[A-Za-z0-9]/.test(chars[1] || '')) ? '“' : '”';
      else out += ch;
      prev = ch;
    });
    i = j < 0 ? html.length : j;
  }
  return out;
}

const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const one = (s, max) => typeof s === 'string' && /^[A-Z"].*[.!?]"?$/.test(s) && s.length <= max;
const flatOf = (t) => t.parts.flat();
const timesIn = (text, w) => (text.match(new RegExp('\\b' + w + '\\b', 'gi')) || []).length;
/** the number (1 ..) of the sentence in which a spoken line stands */
const saidAt = (t, words) => flatOf(t).findIndex((s) => s.includes('"' + words.replace(/[.!?]$/, ''))) + 1;

/** What must be true of a Grade 1 story before any page prints it. Returns the list of faults (empty = sound). */
function story1FaultsOf(t, all) {
  const f = [], id = t.id;
  if (!Array.isArray(t.parts) || t.parts.length !== 3 || t.parts.some((p) => !Array.isArray(p) || p.length < 3)) return [id + ': not three parts (beginning, middle, end) of three sentences or more'];
  const sents = flatOf(t), text = sents.join(' '), total = wordsIn(text);
  if (total < 55 || total > 95) f.push(`${id}: ${total} words (a Grade 1 story has 55 to 95)`);
  sents.forEach((x) => { if (wordsIn(x) > 12 || !one(x, 70)) f.push(`${id}: "${x.slice(0, 30)}..." is longer than 12 words or no whole sentence`); });
  if (new Set(sents).size !== sents.length) f.push(id + ': a sentence stands twice');
  if (!t.title || !t.place) f.push(id + ': no title or no place');
  const ch = t.chars || [];
  if (ch.length !== 2 || ch.some((c) => !/^[A-Z][a-z]{2,5}$/.test(c.name || '') || !/^[a-z]{3,9}$/.test(c.kind || '') || !c.picture || !c.picture.theme || !c.picture.noun)) return [...f, id + ': not two characters with a name, a kind and a picture'];
  const ini = ch.map((c) => c.name[0]);
  if (ini[0] === ini[1] || ini.includes('N')) f.push(id + ': the two names begin with the same letter, or one begins with N (the letter of the narrator)');
  ch.forEach((c) => { if (!text.includes(`${c.name} the ${c.kind}`)) f.push(`${id}: the story does not say "${c.name} the ${c.kind}"`); });
  const names = ch.map((c) => c.name);
  // the four questions
  const d = t.details || [];
  if (d.length !== 4) f.push(id + ': not four questions');
  d.forEach((q, i) => {
    if (!/\?$/.test(q.q) || !q.answer || !Array.isArray(q.wrong) || q.wrong.length !== 2 || new Set([q.answer, ...q.wrong]).size !== 3) f.push(`${id}: "${q.q}" has not one right and two different wrong answers`);
    if (!q.starter || !one(q.full, 60) || !q.full.startsWith(q.starter + ' ')) f.push(`${id}: "${q.q}" has no whole answer that begins with its starter`);
    if (!(q.sentence >= 1 && q.sentence <= sents.length) || (i && q.sentence <= d[i - 1].sentence)) f.push(`${id}: the questions do not follow the story, or one names no sentence`);
  });
  // the map
  const m = t.map || {};
  for (const k of ['where', 'event']) { const x = m[k] || {}; if (!x.right || !Array.isArray(x.wrong) || x.wrong.length !== 2 || new Set([x.right, ...x.wrong]).size !== 3) f.push(`${id}: the map has not one right and two wrong answers for "${k}"`); }
  if (m.event && ![m.event.right, ...(m.event.wrong || [])].every((s) => one(s, 50))) f.push(id + ': a big event is no sentence of at most 50 letters');
  if (!m.write || !m.write.who || !m.write.where || !m.write.event || m.write.who !== names.join(' and ')) f.push(id + ': the map has no short answers to write (the characters as "A and B")');
  if (!Array.isArray(m.sentences) || m.sentences.length !== 3 || m.sentences.some((s) => !one(s, 58))) f.push(id + ': the map has not three sample sentences of at most 58 letters');
  // the retelling
  if (!Array.isArray(t.retell) || t.retell.length !== 3 || t.retell.some((s) => !one(s, 34)) || new Set(t.retell).size !== 3) f.push(id + ': not a beginning, a middle and an end of at most 34 letters each');
  const rt = (t.retell || []).join(' ');
  if (!Array.isArray(t.words) || t.words.length !== 6 || new Set(t.words).size !== 6 || t.words.some((w) => !timesIn(rt, w))) f.push(id + ': the word bank is not six different words of the retelling');
  const ls = t.lesson || {};
  if (!one(ls.right, 34) || !one(ls.lure, 34) || ls.right === ls.lure) f.push(id + ': no lesson and no wrong lesson');
  else if (all && !all.some((o) => o.id !== id && o.lesson && o.lesson.right === ls.lure)) f.push(id + ': the wrong lesson is not the lesson of another story of the bank');
  // feeling words and sense words
  const fe = t.feel || [], se = t.sense || [];
  if (fe.length !== 2 || fe.some((x) => !FACES[x.face] || timesIn(text, x.word) !== 1) || fe[0].face === fe[1].face) f.push(id + ': not two feeling words with two different faces, each once in the story');
  const more = FEELING_WORDS.filter((w) => timesIn(text, w) && !fe.some((x) => x.word === w));
  if (more.length) f.push(`${id}: the story holds another feeling word (${more.join(', ')})`);
  if (se.length !== 2 || se.some((x) => !ORGANS[x.organ] || timesIn(text, x.word) !== 1 || !/\?$/.test(x.q || '') || !Array.isArray(x.wrong) || x.wrong.length !== 2 || x.wrong.some((o) => !ORGANS[o] || o === x.organ) || x.wrong[0] === x.wrong[1])) f.push(id + ': not two sense words, each once in the story, with a question, a part of the body and two parts that do not fit');
  if (new Set([...fe, ...se].map((x) => x.word)).size !== 4) f.push(id + ': the four words are not four different words');
  if (!t.own || !/^How does (\w+) feel .*\?$/.test(t.own.q || '') || !one(t.own.sample, 56)) f.push(id + ': no question about the feeling of a character with a sample answer');
  // who is telling
  const sd = t.said || [], tl = t.told || [];
  if (sd.length !== 3 || sd.some((x) => !names.includes(x.who) || !saidAt(t, x.words) || !/[.!?]$/.test(x.words)) || new Set(sd.map((x) => x.who)).size !== 2) f.push(id + ': not three spoken lines of the story by both characters');
  if (tl.length !== 3 || tl.some((x) => !sents.includes(x) || x.includes('"'))) f.push(id + ': not three sentences of the narrator (sentences of the story without spoken words)');
  if (sd.length === 3 && tl.length === 3) {
    const seq = [...sd.map((x) => [saidAt(t, x.words), 'C']), ...tl.map((x) => [sents.indexOf(x) + 1, 'N'])].sort((a, b) => a[0] - b[0]);
    if (new Set(seq.map((x) => x[0])).size !== 6) f.push(id + ': two of the six sentences are one sentence of the story');
    const s = seq.map((x) => x[1]).join('');
    if (/^(NC){3}$|^(CN){3}$|^NNN|^CCC/.test(s)) f.push(id + ': the narrator and the characters take turns evenly, or three of a kind begin (' + s + ')');
  }
  if (!t.next || !names.includes(t.next.who) || !t.next.sample || t.next.sample.length > 40) f.push(id + ': no "what could ... say next" with a sample');
  return f;
}
const STORIES = BANK.g1 || [];
{ const f = STORIES.flatMap((t) => story1FaultsOf(t, STORIES)); if (f.length) throw new Error('stories.en.json (g1): ' + f.join('; ')); }
/** every animal of the bank (the map page shows two that are not in the story) */
const ANIMALS = []; for (const t of STORIES) for (const c of t.chars) if (!ANIMALS.some((a) => a.kind === c.kind)) ANIMALS.push({ kind: c.kind, picture: c.picture });

const LEVELS = {
  details: { 1: { font: 23, qFont: 21, cFont: 21, pad: 14 }, 2: { font: 21, qFont: 19, rowH: 66, pad: 5 }, 3: { font: 20, qFont: 19, rowH: 54, pad: 5 } },
  map: { 1: { font: 22, pic: 86 }, 2: { font: 22, rowH: 76 }, 3: { font: 20, rowH: 54 } },
  retell: { 1: { font: 22 }, 2: { font: 20, rowH: 62 }, 3: { font: 19, rowH: 50 } },
  feelings: { 1: { font: 23, pic: 58 }, 2: { font: 20, rowH: 60, pic: 50 }, 3: { font: 19, rowH: 50, pic: 40 } },
  who: { 1: { font: 20 }, 2: { font: 20 }, 3: { font: 19, rowH: 52 } },
};

const img = (p, size) => `<img class="ws-icon" data-lcs-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
/** the story in its box: the title, the two characters, three parts; the key may underline sentences or words */
function storyBox(t, { font, underline, words, noPics }) {
  let k = 0;
  const parts = t.parts.map((p, i) => `<div data-lcs-part="${i + 1}" style="margin-top:${i ? 6 : 0}px;font:700 ${font}px/1.42 'Nunito',sans-serif;color:${T.ink}">` + p.map((x) => {
    k++;
    let h = esc(x);
    if (words) for (const w of words) h = h.replace(new RegExp('\\b' + w + '\\b'), `<span data-lcs-underword="${w}" style="text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:4px">${w}</span>`);
    const u = underline && underline.get(k);
    return `<span data-lcs-sent="${k}"${u ? ` data-lcs-underlined="${u}" style="text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:2.5px;text-underline-offset:4px"` : ''}>${h}</span>` + (u ? `<sup style="font:800 12px/1 'Nunito',sans-serif;color:${T.teal}">${u}</sup>` : '');
  }).join(' ') + `</div>`).join('');
  return `<div data-lcs-story1="${t.id}" data-lcs-chars="${t.chars.map((c) => c.picture.noun).sort().join()}" data-lcs-words="${wordsIn(flatOf(t).join(' '))}" style="flex:0 0 auto;padding:8px 16px 11px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:2px"><div data-lcs-title style="font:700 28px/1.1 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</div>` +
    (noPics ? '' : `<div data-lcs-heads style="flex:0 0 auto;display:flex;gap:8px">${t.chars.map((c) => img(c.picture, 62)).join('')}</div>`) + `</div>${parts}</div>`;
}
const cream = (attrs, inner, pad = 8, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:4px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 19, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const numBox = (want, key, size = 42) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:9px;background:#FFFFFF;font:800 ${Math.round(size * 0.58)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? want : ''}</span>`;
/** a picture to circle (the key rings the right one) */
const pick = (p, size, ok, key, cap) => `<span data-lcs-pick="${esc(p.noun)}"${ok ? ' data-lcs-ok="1"' : ''} style="display:inline-flex;flex-direction:column;align-items:center;gap:1px;padding:3px 5px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:16px">${img(p, size)}` +
  (cap ? `<span style="font:700 15px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(cap)}</span>` : '') + `</span>`;
/** a word to circle in a row of words (the key rings the right one) */
const pill = (text, ok, key, font = 18) => `<span data-lcs-pill${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;font:700 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 11px;border:2.5px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px">${esc(text)}</span>`;
/** a short label and, on the same line, the row that continues it */
const inlineRow = (labelHtml, labelW, rowHtml) => `<div style="display:flex;align-items:flex-end;gap:8px"><span data-lcs-label style="flex:0 0 ${labelW}px;padding-bottom:9px;font:700 19px/1.2 'Nunito',sans-serif;color:${T.ink}">${labelHtml}</span><div style="flex:1 1 auto;min-width:0">${rowHtml}</div></div>`;

function makeStory1Type({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('story-g1: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (story1CheckPage below)
    checkPage(args, ctx) { return story1CheckPage(mode, args, ctx); },

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories are English stories (no ${locale} bank)`);
      if (!STORIES.length) throw new Error(`${id}: the bank holds no Grade 1 story`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(STORIES, 1)[0];
      const inner = W - 24;
      const mixed3 = (bad) => { let o; for (let n = 0; n < 60; n++) { o = shuffle([0, 1, 2], rng); if (!bad.includes(o.join(''))) break; } return o; };
      let below = '', items = [], underline = null, words = null;

      if (mode === 'details') {
        const at = placesFor(4, rng);
        const asked = lv === 3 ? shuffle([0, 1, 2, 3], rng).slice(0, 3).sort((a, b) => a - b).map((i) => t.details[i]) : t.details;   // level 3: three questions, a whole sentence each
        if (lv === 3 && key) underline = new Map(asked.map((q, n) => [q.sentence, n + 1]));
        below = asked.map((q, n) => cream(`data-lcs-question="${n + 1}" data-lcs-sentence="${q.sentence}"`, label(num(n + 1) + esc(q.q), d.qFont) + (lv === 1
          ? choices(placed(q.answer, shuffle(q.wrong, rng), at[n]), at[n], key, { font: d.cFont })
          : line({ w: inner, h: d.rowH, starter: lv === 2 ? q.starter : null, answer: key ? q.full : null }) + (lv === 3 && TWO_ROWS ? line({ w: inner, h: d.rowH }) : '')), d.pad)).join('');
        items = asked.map((q) => t.id + ': ' + q.q);
      }

      if (mode === 'map') {
        const m = t.map;
        const HEAD = [`${teal('Characters')} Who is in the story?`, `${teal('Setting')} Where does the story take place?`, `${teal('Big event')} What is the big thing that happens?`];
        if (lv === 1) {
          const others = shuffle(ANIMALS.filter((a) => !t.chars.some((c) => c.kind === a.kind)), rng).slice(0, 2);
          const four = shuffle([...t.chars.map((c) => ({ ...c, ok: 1 })), ...others.map((o) => ({ ...o, ok: 0 }))], rng);
          const a1 = rng.int(0, 2), a2 = rng.int(0, 2);
          below = cream('data-lcs-box="who"', label(`${teal('Characters')} Who is in the story? Circle the two.`) + `<div data-lcs-picks style="display:flex;justify-content:space-around;align-items:flex-end">${four.map((c) => pick(c.picture, d.pic, !!c.ok, key, c.kind)).join('')}</div>`) +
            cream('data-lcs-box="where"', label(HEAD[1] + ' Circle.') + choices(placed(m.where.right, shuffle(m.where.wrong, rng), a1), a1, key, { font: 20 })) +
            cream('data-lcs-box="event"', label(HEAD[2] + ' Circle.') + choices(placed(m.event.right, shuffle(m.event.wrong, rng), a2), a2, key, { column: true, font: 19 }));
        } else {
          const ans = lv === 2 ? [m.write.who, m.write.where, m.write.event] : m.sentences;
          below = ['who', 'where', 'event'].map((k, i) => cream(`data-lcs-box="${k}"`, label(HEAD[i] + (lv === 3 ? ' Write a sentence.' : '')) + line({ w: inner, h: d.rowH, answer: key ? ans[i] : null, sample: true }) + (lv === 3 ? line({ w: inner, h: d.rowH }) : ''), lv === 3 ? 5 : 8)).join('');
        }
        items = [t.id + ': map'];
      }

      if (mode === 'retell') {
        const NAMES = ['Beginning', 'Middle', 'End'];
        const lessonCard = () => { const at = rng.int(0, 1); return cream('data-lcs-lesson="1"', label('What is the lesson of the story? Circle it.') + `<div data-lcs-two style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding-left:18px">${placed(t.lesson.right, [t.lesson.lure], at).map((x, i) => pill(x, i === at, key, 20)).join('')}</div>`); };
        if (lv === 1) {
          const order = mixed3(['012', '210']);
          below = cream('data-lcs-strips="1"', label('These three sentences retell the story. Put them in order: write 1, 2, and 3 in the boxes.') +
            order.map((i) => `<div data-lcs-strip="${i + 1}" style="display:flex;align-items:center;gap:12px;min-height:54px">${numBox(i + 1, key)}<span style="font:700 21px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t.retell[i])}</span></div>`).join(''), 9) + lessonCard();
        } else if (lv === 2) {
          below = `<div data-lcs-wordbank style="display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;padding:6px 12px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF"><span style="font:700 18px/1 'Baloo 2',cursive;color:${T.teal}">Word bank</span>` +
            shuffle(t.words, rng).map((w) => `<span data-lcs-bankword style="font:700 19px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 10px;border-radius:999px;background:${T.cream}">${esc(w)}</span>`).join('') + `</div>` +
            NAMES.map((nm, i) => cream(`data-lcs-partbox="${i + 1}"`, inlineRow(teal(nm), 104, line({ w: inner - 112, h: d.rowH, answer: key ? t.retell[i] : null, sample: true })), 5)).join('') + lessonCard();
        } else {
          below = NAMES.map((nm, i) => cream(`data-lcs-partbox="${i + 1}"`, inlineRow(teal(nm), 104, line({ w: inner - 112, h: d.rowH, answer: key ? t.retell[i] : null, sample: true })) + line({ w: inner, h: d.rowH }), 4)).join('') +
            cream('data-lcs-lessonline="1"', inlineRow(teal('Lesson'), 104, line({ w: inner - 112, h: d.rowH, answer: key ? t.lesson.right : null, sample: true })) + line({ w: inner, h: d.rowH }), 4);
        }
        items = t.retell.map((s) => t.id + ': ' + s);
      }

      if (mode === 'feelings') {
        const organRow = (s, at) => `<div data-lcs-organs data-lcs-want="${ORGANS[s.organ].noun}" style="display:flex;align-items:flex-end;gap:4px">${placed(s.organ, shuffle(s.wrong, rng), at).map((o, i) => pick(ORGANS[o], d.pic, i === at, key, ORGANS[o].name)).join('')}</div>`;
        if (key) words = [...t.feel, ...t.sense].map((x) => x.word);
        if (lv === 1) {
          const rows = shuffle([...t.feel.map((x) => ({ ...x, kind: 'feel' })), ...t.sense.map((x) => ({ ...x, kind: 'sense' }))], rng);
          const at = placesFor(4, rng);
          below = `<div data-lcs-wordbox style="display:flex;align-items:center;flex-wrap:wrap;gap:8px 12px;padding:11px 12px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF"><span style="font:700 18px/1.2 'Nunito',sans-serif;color:${T.ink}">Find these words in the story. Underline them.</span>` +
            shuffle(rows, rng).map((r) => `<span data-lcs-boxword="${r.word}" style="font:800 21px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border-radius:999px;background:${T.cream}">${esc(r.word)}</span>`).join('') + `</div>` +
            cream('data-lcs-rows="1"', label('Circle the picture that goes with each word: a face for a feeling, or the part of the body you use.', 17) +
              `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px">` + rows.map((r, n) => `<div data-lcs-wordrow="${r.kind}" style="display:flex;align-items:center;gap:4px;min-width:0;padding:3px 5px;border-radius:12px;background:#FFFFFF"><span data-lcs-rowword style="flex:0 0 68px;font:800 21px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(r.word)}</span>` +
                (r.kind === 'feel' ? `<div data-lcs-faces data-lcs-want="${FACES[r.face].noun}" style="display:flex;align-items:flex-end;gap:2px">${placed(r.face, shuffle(FACE_WRONG[r.face], rng), at[n]).map((fc, i) => pick(FACES[fc], d.pic, i === at[n], key)).join('')}</div>` : organRow(r, at[n])) + `</div>`).join('') + `</div>`, 8);
        } else {
          const half = Math.floor((inner - 16) / 2);
          const at = [rng.int(0, 2), 0]; at[1] = (at[0] + rng.int(1, 2)) % 3;
          below = cream('data-lcs-feelwords="1"', label('Underline the two words in the story that tell how a character ' + teal('feels') + '. Write them here.', lv === 3 ? 18 : 19) +
            `<div style="display:flex;gap:16px">${t.feel.map((x) => line({ w: half, h: d.rowH, answer: key ? x.word : null })).join('')}</div>`, lv === 3 ? 5 : 8) +
            t.sense.map((s, n) => cream(`data-lcs-senseq="${n + 1}"`, label(num(n + 1) + esc(s.q) + (lv === 3 ? ' Write it. Circle the body part you use.' : ' Write it. Then circle the part of the body you use.'), lv === 3 ? 17 : 19) +
              `<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px">${line({ w: 250, h: d.rowH, answer: key ? s.word : null })}${organRow(s, at[n])}</div>`, lv === 3 ? 5 : 8)).join('') +
            (lv === 3 ? cream('data-lcs-own="1"', label(num(3) + esc(t.own.q) + ' Tell why.', 18) + line({ w: inner, h: d.rowH, answer: key ? t.own.sample : null, sample: true }) + line({ w: inner, h: d.rowH }), 4) : '');
        }
        items = [...t.feel, ...t.sense].map((x) => t.id + ': ' + x.word);
      }

      if (mode === 'who') {
        const sents = flatOf(t);
        const list = [...t.said.map((x) => ({ text: '"' + x.words + '"', who: x.who, at: saidAt(t, x.words) })), ...t.told.map((x) => ({ text: x, who: 'narrator', at: sents.indexOf(x) + 1 }))].sort((a, b) => a.at - b.at);
        const letter = (who) => (who === 'narrator' ? 'N' : who[0]);
        const legend = `<div data-lcs-legend style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 12px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
          `<span style="flex:1 1 auto;font:700 ${lv === 1 ? 17 : 16}px/1.2 'Nunito',sans-serif;color:${T.ink}">The ${teal('narrator')} tells the story. The ${teal('characters')} talk. Their words are inside quotation marks (“ ”).</span>` +
          [{ l: 'N', name: 'narrator' }, ...t.chars.map((c) => ({ l: c.name[0], name: c.name, pic: c.picture }))].map((x) => `<span data-lcs-legendkey="${x.l}" style="flex:0 0 auto;display:inline-flex;align-items:center;gap:4px;min-height:44px;padding:1px 9px;border-radius:12px;background:${T.cream};font:700 17px/1 'Nunito',sans-serif;color:${T.ink}">${x.pic ? img(x.pic, 40) : ''}${lv === 1 ? '' : `<b style="font-weight:800;color:${T.teal}">${x.l}</b> =`} ${esc(x.name)}</span>`).join('') + `</div>`;
        const tight = lv === 3 ? 39 : lv === 2 ? 45 : 52;
        const rows = list.map((x, n) => `<div data-lcs-item="${letter(x.who)}" style="display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:${tight}px">` +
          (lv === 1 ? `<span data-lcs-itemtext style="flex:1 1 auto;font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(n + 1)}${esc(x.text)}</span><span data-lcs-whopills style="flex:0 0 auto;display:flex;gap:0">${['narrator', ...t.chars.map((c) => c.name)].map((w) => pill(w, w === x.who, key, 18)).join('')}</span>`
            : `${numBox(letter(x.who), key, lv === 3 ? 38 : 42)}<span data-lcs-itemtext style="flex:1 1 auto;font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</span>`) + `</div>`).join('');
        below = legend + cream('data-lcs-items="1"', label(lv === 1 ? 'Who says or tells it? Circle.' : `Who says or tells it? Write ${['N', ...t.chars.map((c) => c.name[0])].map((l) => teal(l)).join(', ').replace(/, ([^,]*)$/, ', or $1')} in the box.`, lv === 3 ? 18 : 19) + rows, lv === 3 ? 4 : 7) +
          (lv === 3 ? cream('data-lcs-next="1"', label(`What could ${teal(esc(t.next.who))} say next? Write it.`, 18) + line({ w: inner, h: d.rowH, answer: key ? '"' + t.next.sample + '"' : null, sample: true }), 4) : '');
        items = list.map((x) => t.id + ': ' + x.text);
      }

      return {
        bodyHtml: curly(`<div data-ws-content data-lcs-story1page="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + storyBox(t, { font: d.font, underline, words, noPics: mode === 'map' && lv === 1 }) + below + `</div>`),
        meta: { text: t.id, items },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-story1page]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsStory1page.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        if (/["']/.test(root.textContent)) fails.push('a straight quote or apostrophe in the text: the story pages print typographic marks');
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root), box = document.querySelector('[data-lcs-story1]');
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 3) fails.push('the story is not three parts');
        parts.forEach((p, i) => { if (parseFloat(getComputedStyle(p).fontSize) < 19) fails.push('part ' + (i + 1) + ' is printed too small for Grade 1'); });
        const n = +box.dataset.lcsWords; if (n < 55 || n > 95) fails.push(`the story has ${n} words`);
        if (box.querySelectorAll('img').length !== (mode === 'map' && lv === 1 ? 0 : 2)) fails.push('the story does not show its two characters (or shows them on the page that asks who is in it)');
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        box.querySelectorAll('*').forEach((e) => { const r = R(e), b = R(box); if (r.width && (r.right > b.right + 0.5 || r.bottom > b.bottom + 0.5)) fails.push('something leaves the story box'); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const CARDS = '[data-lcs-question], [data-lcs-box], [data-lcs-strips], [data-lcs-lesson], [data-lcs-partbox], [data-lcs-lessonline], [data-lcs-wordbank], [data-lcs-wordbox], [data-lcs-rows], [data-lcs-feelwords], [data-lcs-senseq], [data-lcs-own], [data-lcs-legend], [data-lcs-items], [data-lcs-next]';
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'), c = l.closest(CARDS); if (!s || !c || R(s).right > R(c).right + 0.5 || R(s).bottom > R(c).bottom + 0.5) fails.push('a writing line leaves its card');
          if (s && R(s).height < 50) fails.push(`a writing row of ${Math.round(R(s).height)} px (a Grade 1 row has 50 or more)`); });
        document.querySelectorAll(CARDS).forEach((c) => { const cb = R(c); c.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-numbox], [data-lcs-pick], [data-lcs-pill], span, img').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5 || r.left < cb.left - 0.5)) fails.push('something leaves its card'); }); });
        const boxes = [...document.querySelectorAll('[data-lcs-numbox]')];
        boxes.forEach((b) => { if (R(b).width < 38) fails.push('a box too small for a first grader'); if (!isKey && b.textContent.trim()) fails.push('a box is filled'); });
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        sets.forEach((c, i) => { const all = [...c.querySelectorAll('[data-lcs-choice]')];
          if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.textContent.trim())).size !== 3) fails.push(`answers ${i + 1}: not three different with one right`); });
        const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
        const underS = [...box.querySelectorAll('[data-lcs-underlined]')], underW = [...box.querySelectorAll('[data-lcs-underword]')];
        if (!isKey && (underS.length || underW.length)) fails.push('something in the story is underlined on the child\'s page');
        const picksOk = (wrap, what) => { const all = [...wrap.querySelectorAll('[data-lcs-pick]')]; if (all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => e.dataset.lcsPick)).size !== 3) fails.push(what + ': not three different pictures with one right'); const want = wrap.querySelector('[data-lcs-want]'), okp = all.find((e) => e.dataset.lcsOk); if (!want || !okp || okp.dataset.lcsPick !== want.dataset.lcsWant) fails.push(what + ': the keyed picture is not the one the word asks for'); all.forEach((e) => { if (R(e.querySelector('img')).width < 40) fails.push(what + ': a picture smaller than 40 px'); }); return all.findIndex((e) => e.dataset.lcsOk); };

        if (mode === 'details') {
          const qs = [...document.querySelectorAll('[data-lcs-question]')], at = qs.map((q) => +q.dataset.lcsSentence);
          if (qs.length !== (lv === 3 ? 3 : 4) || at.some((x, i) => i && x <= at[i - 1])) fails.push('not four questions (three on level 3) in the order of the story');
          if (lv === 1) { if (sets.length !== 4 || lines.length || new Set(place).size !== 3 || /^(012|210)/.test(place.join(''))) fails.push('level 1: the right answers do not stand in all three places, or they begin as a staircase: ' + place.join('')); }
          else { if (sets.length || lines.length !== (lv === 3 ? 6 : 4)) fails.push(`level ${lv}: ${lines.length} writing rows (level 3: two for each sentence)`);
            const st = lines.filter((l) => l.dataset.lcsStartertext).length; if (!isKey && st !== (lv === 2 ? 4 : 0)) fails.push(`level ${lv}: ${st} sentence starters`);
            if (lv === 3 && isKey && underS.map((u) => u.closest('[data-lcs-sent]').dataset.lcsSent).join() !== at.join()) fails.push('the key does not underline the four sentences that tell the answers'); }
        }
        if (mode === 'map') {
          const bx = [...document.querySelectorAll('[data-lcs-box]')];
          if (bx.map((b) => b.dataset.lcsBox).join() !== 'who,where,event') fails.push('not the three boxes characters, setting, big event');
          if (lv === 1) { const pk = [...document.querySelectorAll('[data-lcs-picks] [data-lcs-pick]')];
            if (pk.length !== 4 || pk.filter((e) => e.dataset.lcsOk).length !== 2 || new Set(pk.map((e) => e.dataset.lcsPick)).size !== 4) fails.push('not four different animals with the two characters among them');
            const inStory = box.dataset.lcsChars;
            if (pk.filter((e) => e.dataset.lcsOk).map((e) => e.dataset.lcsPick).sort().join() !== inStory) fails.push('the two animals to circle are not the two of the story');
            if (sets.length !== 2 || lines.length) fails.push('level 1 is not two sets of answers to circle'); }
          else if (sets.length || lines.length !== (lv === 2 ? 3 : 6)) fails.push(`level ${lv}: ${lines.length} writing lines`);
        }
        if (mode === 'retell') {
          const two = document.querySelector('[data-lcs-two]');
          if (lv !== 3) { const pl = two ? [...two.querySelectorAll('[data-lcs-pill]')] : []; if (pl.length !== 2 || pl.filter((e) => e.dataset.lcsOk).length !== 1 || pl[0].textContent === pl[1].textContent) fails.push('not two different lessons with one right'); }
          if (lv === 1) {
            const strips = [...document.querySelectorAll('[data-lcs-strip]')], seq = strips.map((s) => s.dataset.lcsStrip).join('');
            if (strips.length !== 3 || [...seq].sort().join('') !== '123' || seq === '123' || seq === '321') fails.push('the three sentences are not mixed: ' + seq);
            strips.forEach((s) => { if (s.querySelector('[data-lcs-numbox]').dataset.lcsWant !== s.dataset.lcsStrip) fails.push('a box is keyed to another place'); });
            if (lines.length || boxes.length !== 3) fails.push('level 1 is not three sentences to number');
          } else {
            const pb = [...document.querySelectorAll('[data-lcs-partbox]')];
            if (pb.length !== 3 || pb.map((p) => p.querySelector('[data-lcs-label]').textContent.trim()).join() !== 'Beginning,Middle,End' || boxes.length) fails.push('not the three boxes Beginning, Middle, End');
            if (lines.length !== (lv === 2 ? 3 : 8) || (lv === 3) !== !!document.querySelector('[data-lcs-lessonline]') || (lv === 2) !== !!document.querySelector('[data-lcs-wordbank]')) fails.push(`level ${lv}: ${lines.length} writing rows, or the word bank or the lesson line is not where it belongs`);
            if (lv === 2 && document.querySelectorAll('[data-lcs-bankword]').length !== 6) fails.push('the word bank does not hold six words');
          }
        }
        if (mode === 'feelings') {
          if (isKey && underW.length !== 4) fails.push(`the key underlines ${underW.length} words of the story, not four`);
          if (lv === 1) {
            const bw = [...document.querySelectorAll('[data-lcs-boxword]')].map((e) => e.dataset.lcsBoxword), rows = [...document.querySelectorAll('[data-lcs-wordrow]')];
            if (bw.length !== 4 || rows.length !== 4 || rows.filter((r) => r.dataset.lcsWordrow === 'feel').length !== 2 || rows.map((r) => r.querySelector('[data-lcs-rowword]').textContent.trim()).sort().join() !== bw.slice().sort().join()) fails.push('level 1 is not a box of four words and a row for each (two feeling words, two sense words)');
            const pl = rows.map((r, i) => picksOk(r, 'word ' + (i + 1)));
            if (new Set(pl).size !== 3) fails.push('the right pictures do not stand in all three places: ' + pl.join(''));
            rows.forEach((r) => { if (!!r.querySelector('[data-lcs-faces]') !== (r.dataset.lcsWordrow === 'feel')) fails.push('a feeling word has no faces, or a sense word has faces'); });
            if (lines.length || sets.length) fails.push('level 1 has writing lines');
          } else {
            const sq = [...document.querySelectorAll('[data-lcs-senseq]')];
            if (!document.querySelector('[data-lcs-feelwords]') || sq.length !== 2 || sets.length) fails.push('not the feeling words and two questions about sense words');
            const pl = sq.map((q, i) => picksOk(q, 'question ' + (i + 1)));
            if (pl.length === 2 && pl[0] === pl[1]) fails.push('the two right parts of the body stand in the same place');
            if (lines.length !== (lv === 2 ? 4 : 6) || (lv === 3) !== !!document.querySelector('[data-lcs-own]')) fails.push(`level ${lv}: ${lines.length} writing lines`);
          }
        }
        if (mode === 'who') {
          const its = [...document.querySelectorAll('[data-lcs-item]')], want = its.map((e) => e.dataset.lcsItem);
          const keys = [...document.querySelectorAll('[data-lcs-legendkey]')].map((e) => e.dataset.lcsLegendkey);
          if (keys.length !== 3 || keys[0] !== 'N' || new Set(keys).size !== 3) fails.push('the legend does not name the narrator and two characters with three different letters');
          if (its.length !== 6 || want.filter((l) => l === 'N').length !== 3 || want.some((l) => !keys.includes(l)) || new Set(want).size !== 3) fails.push('not six sentences: three of the narrator and three of the two characters (' + want.join('') + ')');
          its.forEach((e, i) => { const quoted = /^\s*(\d+\.\s*)?“/.test(e.querySelector('[data-lcs-itemtext]').textContent); if (quoted !== (e.dataset.lcsItem !== 'N')) fails.push(`sentence ${i + 1}: spoken words are keyed to the narrator, or a narrator's sentence to a character`); });
          if (lv === 1) { its.forEach((e, i) => { const pl = [...e.querySelectorAll('[data-lcs-pill]')], ok = pl.filter((p) => p.dataset.lcsOk);
            if (pl.length !== 3 || ok.length !== 1 || (ok[0].textContent.trim() === 'narrator' ? 'N' : ok[0].textContent.trim()[0]) !== e.dataset.lcsItem) fails.push(`sentence ${i + 1}: not three names with the right one keyed`); });
            if (boxes.length || lines.length) fails.push('level 1 has boxes or lines'); }
          else { if (boxes.length !== 6 || boxes.some((b, i) => b.dataset.lcsWant !== want[i])) fails.push('a box is keyed to another letter');
            if (lines.length !== (lv === 3 ? 1 : 0) || (lv === 3) !== !!document.querySelector('[data-lcs-next]')) fails.push(`level ${lv}: ${lines.length} writing lines`); }
        }
        return fails;
      });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup, the part of the story it is answered from printed on the card (the title, then
 *  the beginning, the middle or the end at the page's own size), and the story's id as data-lcs-text (form B takes
 *  another story). FORMS (review en.review-1119-read, 2026-11-19): a page built for form A or B of a check reads the one
 *  story of its lesson in that form (CHECK_STORY: each part of a form another story, and every part another one in B).
 *  The text is printed with typographic quotes and apostrophes (curly(); the page does the same).
 *   details (G1-579)   one question under the part that holds its answer; level 2 starts the line with the sentence
 *                      starter (level 1: its three answers to circle; level 3: no starter).
 *   map (G1-580)       "Who is in the story?" under the parts up to the one that names the second character ("Fay the
 *                      fox"), and "Where does the story take place?" under the part that names the place; the page's
 *                      line and its short answer (level 1: the setting circled of three). The big event has no one
 *                      wording and stays out. In a form the where card stands after the who card with the same text id,
 *                      so the check (one card a text) keeps the who card and its direction names who only.
 *   retell (G1-581)    the middle and the end of the story (the trouble and how it is met: what the lesson is drawn
 *                      from; the whole story at the page's size is taller than a check takes) and "What is the lesson of
 *                      the story?": the page's two lessons to circle (its own and the lesson of another story). The
 *                      retelling in the child's words stays out. In a form a second card, the same lesson over the ending
 *                      only, stands after it with the same text id (a check page needs two cards; the check keeps the first).
 *   feelings (G1-582)  a feeling word: the part that holds it (and no other feeling word), "Underline the word that tells
 *                      how a character feels. Write it." with a line; a sense word: the part that holds it, its question
 *                      with a line and the three parts of the body to circle. In a form only the feeling words (the
 *                      direction names the feeling word; review en.review-1119-read).
 *   who (G1-583)       one of the page's six sentences (a character's words in quotation marks, or a sentence of the
 *                      narrator) under the part that holds it, with the letters N, and the first letters of the two
 *                      characters, and a box for the letter (data-lcs-answer). */
/** the story of each lesson's part in each form of the unit check: five stories, a different one in every part of a form,
 *  and in every part another one in form B than in form A */
/** the feeling word each form asks (review en.review-1119-read2: both forms answered "sad"): Rex was sad (A), Fay was glad (B) */
const CHECK_FEEL = { A: 'sad', B: 'glad' };
/** who tells the sentence each form asks (review en.review-1119-read2: the narrator was never the answer, and a narrator's
 *  sentence tests the lesson's title best): form A a sentence of the narrator, form B a character's words */
const CHECK_TELLER = { A: 'narrator', B: 'character' };
const CHECK_STORY = {
  A: { details: 'plums-for-fay', map: 'pip-is-lost', retell: 'hop-finn-hop', feelings: 'who-ate-the-cake', who: 'the-big-apple' },
  B: { details: 'hop-finn-hop', map: 'who-ate-the-cake', retell: 'the-big-apple', feelings: 'plums-for-fay', who: 'pip-is-lost' },
};
/** the form a check page is built for: build-checks seeds its pages "check|<unit>|A…" or "…|B…"; none outside a check */
const checkFormOf = (ctx) => { const m = /^check\|[^|]+\|([AB])\d*\|/.exec(String((ctx && ctx.rng && ctx.rng.seed) || '')); return m ? m[1] : null; };
function story1CheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`story-g1 check: the stories are English stories (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const att = (s) => esc(s).replace(/"/g, '&quot;');
  const LW = W - 52;
  const write = (answer, starter, h, w = LW) => (key ? line({ w, h, answer }) : line({ w, h, starter }).replace('<div data-lcs-line', `<div data-lcs-line data-lcs-answer="${att(answer)}"`));
  const ok = (html) => html.replace(' data-lcs-ok="1"', ' data-lcs-ok="1" data-lcs-correct="1"');
  const ask = (html, px = 19) => `<div data-lcs-checkq style="font:700 ${px}px/1.3 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
  const partOf = (t, n) => { let k = 0; for (let p = 0; p < t.parts.length; p++) { k += t.parts[p].length; if (n <= k) return p; } return -1; };   // n: the sentence, from 1
  const excerpt = (t, ps) => `<div data-lcs-excerpt data-lcs-parts="${ps.map((p) => p + 1).join(',')}" style="padding:5px 14px 7px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF"><div data-lcs-title style="font:700 22px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</div>` +
    ps.map((p) => `<div data-lcs-part="${p + 1}" style="font:700 ${d.font}px/1.38 'Nunito',sans-serif;color:${T.ink};margin-top:${p === ps[0] ? 0 : 4}px">${esc(t.parts[p].join(' '))}</div>`).join('') + `</div>`;
  const card = (t, inner) => `<div data-lcs-text="${att(t.id)}" style="display:flex;flex-direction:column;gap:4px;padding:0 4px">${inner}</div>`;
  const holds = (p, w) => new RegExp('\\b' + w + '\\b', 'i').test(p.join(' '));
  const cards = [];
  // (review en.review-1119-read) a form's parts each read ANOTHER story, and form B's part of a lesson another story than
  // form A's: form B had read Pip Is Lost in four parts, and part 5's letters (P = Pip, O = Ola) restated part 2's answer
  const form = checkFormOf(ctx);
  const ofForm = form ? [STORIES.find((x) => x.id === CHECK_STORY[form][mode])] : shuffle(STORIES, rng);
  for (const t of ofForm) {
    if (mode === 'details') for (const q of t.details) {
      let at = 0; const wrong = shuffle(q.wrong, rng);
      cards.push(card(t, excerpt(t, [partOf(t, q.sentence)]) + ask(esc(q.q), d.qFont) +
        (lv === 1 ? ok(choices(placed(q.answer, wrong, (at = rng.int(0, 2))), at, key, { font: d.cFont })) : write(q.full, lv === 2 ? q.starter : null, d.rowH))));
    }
    if (mode === 'map') {
      const named = Math.max(...t.chars.map((c) => t.parts.findIndex((p) => p.join(' ').includes(`${c.name} the ${c.kind}`))));
      const place = t.place.split(' ').pop(), where = t.parts.findIndex((p) => holds(p, place));
      const rowH = Math.min(d.rowH || 60, 60);
      if (lv > 1) cards.push(card(t, excerpt(t, Array.from({ length: named + 1 }, (_, i) => i)) + ask(`${teal('Characters')} Who is in the story?`) + write(t.map.write.who, null, rowH)));
      // (in a form the where card stands AFTER the who card and carries the same text id: the check keeps the who card, the
      // first of its text; the direction names who only, and a page of a check needs two cards)
      if (where >= 0) {
        const at = rng.int(0, 2);
        cards.push(card(t, excerpt(t, [where]) + ask(`${teal('Setting')} Where does the story take place?`) +
          (lv === 1 ? ok(choices(placed(t.map.where.right, shuffle(t.map.where.wrong, rng), at), at, key, { font: 20 })) : write(t.map.write.where, null, rowH))));
      }
    }
    if (mode === 'retell') {
      const at = rng.int(0, 1);
      const two = placed(t.lesson.right, [t.lesson.lure], at).map((x, i) => pill(x, at === i, key, 20)).join('');
      // the middle and the end (the whole story at the page's size is taller than a check takes; in every story of the bank
      // the middle and the end hold what its lesson is drawn from: the trouble, and how it was met)
      cards.push(card(t, excerpt(t, [1, 2]) + ask('What is the lesson of the story? Circle it.') +
        ok(`<div data-lcs-two style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 14px;padding-left:18px">${two}</div>`)));
      // (in a form a page holds one story, and a page of a check needs two cards: the same lesson over the ending only stands
      // after it with the same text id, and the check keeps the first card of a text)
      if (form) cards.push(card(t, excerpt(t, [2]) + ask('What is the lesson of the story? Circle it.') +
        ok(`<div data-lcs-two style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 14px;padding-left:18px">${two}</div>`)));
    }
    if (mode === 'feelings') {
      const half = 300;
      for (const x of (form ? [...t.feel].sort((a, b) => (b.word === CHECK_FEEL[form]) - (a.word === CHECK_FEEL[form])) : t.feel)) {
        const p = t.parts.findIndex((q) => holds(q, x.word));
        if (p < 0 || FEELING_WORDS.filter((w) => holds(t.parts[p], w)).length !== 1) continue;      // one feeling word in the part, no other
        cards.push(card(t, excerpt(t, [p]) + ask('Underline the word that tells how a character ' + teal('feels') + '. Write it.') + write(x.word, null, d.rowH || 60, half)));
      }
      for (const s of (form ? [] : t.sense)) {                              // (a form asks the feeling word only: one direction for the part)
        const p = t.parts.findIndex((q) => holds(q, s.word));
        if (p < 0) continue;
        const at = rng.int(0, 2);
        const organs = `<div data-lcs-organs data-lcs-want="${ORGANS[s.organ].noun}" style="display:flex;align-items:flex-end;gap:4px">${placed(s.organ, shuffle(s.wrong, rng), at).map((o, i) => pick(ORGANS[o], d.pic || 50, i === at, key, ORGANS[o].name)).join('')}</div>`;
        cards.push(card(t, excerpt(t, [p]) + ask(esc(s.q) + ' Write it. Then circle the part of the body you use.') +
          `<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px">${write(s.word, null, d.rowH || 60, 250)}${ok(organs)}</div>`));
      }
    }
    if (mode === 'who') {
      const sents = flatOf(t), letter = (who) => (who === 'narrator' ? 'N' : who[0]);
      const items = [...t.said.map((x) => ({ text: '"' + x.words + '"', at: saidAt(t, x.words), who: x.who })), ...t.told.map((x) => ({ text: x, who: 'narrator', at: sents.indexOf(x) + 1 }))];
      const keyLine = `<div data-lcs-legend style="font:700 18px/1.25 'Nunito',sans-serif;color:${T.ink}">${['N', ...t.chars.map((c) => c.name[0])].map((l, i) => `${teal(l)} = ${i ? esc(t.chars[i - 1].name) : 'narrator'}`).join(' &nbsp;·&nbsp; ')}</div>`;
      const first = (x) => (form && (x.who === 'narrator') === (CHECK_TELLER[form] === 'narrator') ? 0 : 1);
      for (const x of [...items].sort((a, b) => first(a) - first(b) || a.at - b.at)) {
        const box = numBox(letter(x.who), key, 42).replace('<span data-lcs-numbox', `<span data-lcs-answer="${letter(x.who)}" data-lcs-numbox`);
        cards.push(card(t, excerpt(t, [partOf(t, x.at)]) + ask(`Who says or tells it? Write ${['N', ...t.chars.map((c) => c.name[0])].map((l) => teal(l)).join(', ').replace(/, ([^,]*)$/, ', or $1')} in the box.`, 18) + keyLine +
          `<div data-lcs-item="${letter(x.who)}" style="display:flex;align-items:center;gap:12px;padding:2px 8px;border-radius:12px;background:#FFFFFF">${box}<span data-lcs-itemtext style="font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</span></div>`));
      }
    }
  }
  return { bodyHtml: curly(`<div data-lcs-story1check="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''}>` + checkGrid(cards, { cols: 1 }) + `</div>`), meta: {} };
}

module.exports = { makeStory1Type, story1FaultsOf, STORIES, LEVELS };
