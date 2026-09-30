/**
 * reading-comprehension-screen.js — Level Set 2026-09-30 (Reading Comprehension, PDF + interactive): the screen
 * version (tap-choice) and the answer key for G2-254 and its faces G2-269..273, built from the PRINTED page's own
 * story + questions (the same instance; render-instance asserts meta identity), plus the robot's oracle.
 *
 *   screen   the story on top (numbered at levels 1 and 3), then one card per question: the question (+ its
 *            "Sentence N" chip at level 1) and its three choices. Level 3's write-in question becomes an EVIDENCE
 *            tap: "Tap the sentence that tells you" over the story's own sentences (the paper task is the
 *            writing; the screen checks the reading).
 *   key      the printed page with the right choice ringed in coral and level 3's model answer SEATED on the first
 *            writing row (key-on-row.js).
 *   oracle   re-derives each answer: a literal question → the ONE choice written in its hinted sentence; the
 *            evidence tap → the sentence the data names, which must be a sentence of the story; an inference
 *            question → the data's answer, refused if that answer is written word-for-word in the story.
 */
'use strict';

const CORAL = '#F2784B';
const { seatOnRow } = require('./key-on-row.js');
const { storyById } = require('../data/literacy/reading-passages-levels.js');
const { literalIn, norm } = require('../tools/level-set/rc-validate.js');

const SCR_W = 660, OPT_H = 104;   // 104 page-px reaches the 44 px tap floor at 360 wide
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function storyCard(story, numbered) {
  const body = numbered
    ? story.sentences.map((s, i) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:17px;color:#146B5E;margin-right:3px">${i + 1}</span>${esc(s)}`).join(' ')
    : esc(story.text);
  return `<div style="width:${SCR_W}px;box-sizing:border-box;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:16px;padding:18px 24px">` +
    `<div style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#146B5E;margin-bottom:8px">${esc(story.title)}</div>` +
    `<p style="margin:0;font-family:Nunito,sans-serif;font-weight:600;font-size:24px;line-height:1.55;color:#3A3530">${body}</p></div>`;
}
function item(attrs, top, options) {
  return `<div data-lcs-item ${attrs} style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">${top}</div>` +
    `<div style="display:flex;flex-direction:column;gap:10px;align-items:center">${options}</div></div>`;
}
function opt(i, label, correct, px, left) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${esc(label)}"${correct ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:600px;min-height:${OPT_H}px;height:auto;box-sizing:border-box;font-size:${px}px;padding:8px 16px;` +
    `text-align:${left ? 'left' : 'center'};justify-content:${left ? 'flex-start' : 'center'};line-height:1.3;white-space:normal">${esc(label)}</span>`;
}
/** One writing row holds ~45 characters of the key's model answer; a longer one wraps at a word boundary (2 rows max). */
const MODEL_LINE = 45;
function splitModel(text, max) {
  const t = String(text);
  if ([...t].length <= max) return [t];
  const words = t.split(' ');
  let first = '';
  while (words.length && [...(first ? first + ' ' + words[0] : words[0])].length <= max) first = first ? first + ' ' + words.shift() : words.shift();
  const rest = words.join(' ');
  if (!first || [...rest].length > max) throw new Error(`reading-comprehension key: the model answer does not fit two rows: "${t}"`);
  return [first, rest];
}

const qLine = (n, q) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1.3;color:#3A3530">${n}. ${esc(q)}</span>`;
const chip = (t) => `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:20px;color:#146B5E;background:#E3F1EE;border-radius:12px;padding:3px 12px">${esc(t)}</span>`;

/**
 * built.meta carries { passage, level, questions } where questions = [{ kind, q, choices, correct, hint, evidence,
 * model }] in page order; the story comes from the level data by id.
 */
function screenOrKey(built, ctx, loc, L) {
  const m = built.meta;
  const story = storyById(loc, m.passage);
  if (!story) throw new Error(`reading-comprehension screen: no story ${m.passage} (${loc})`);
  if (ctx.interactive) {
    const numbered = m.level !== 2;
    const items = m.questions.map((q, i) => {
      const attrs = `data-lcs-story="${esc(story.id)}" data-lcs-qkind="${q.kind}" data-lcs-question="${esc(q.q)}"` + (q.hint ? ` data-lcs-hint="${q.hint}"` : '');
      if (q.kind === 'write') {
        return item(attrs, qLine(i + 1, q.q) + chip(L.screen.evidence),
          story.sentences.map((s, j) => opt(j, s, j === q.evidence - 1, 22, true)).join(''));
      }
      return item(attrs, qLine(i + 1, q.q) + (q.hint ? chip(L.sentenceChip.replace('{n}', q.hint)) : ''),
        q.choices.map((c, j) => opt(j, c, j === q.correct, 26, false)).join(''));
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-type="reading-comprehension" data-lcs-screen="L${m.level}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">` +
        storyCard(story, numbered) + items.join('') + `</div>`,
      meta: m,
    };
  }
  // ---- the answer key: the right choice ringed; the model answer seated on the first writing row
  let body = built.bodyHtml;
  const write = m.questions.find((q) => q.kind === 'write');
  if (write) {
    // the model answer on the page's two writing rows: a long answer wraps at a word boundary onto the second row
    const lines = splitModel(write.model, MODEL_LINE);
    let from = 0;
    lines.forEach((part, k) => {
      const w = body.slice(from).search(/<svg[^>]*data-lcs-prim="writing-row"/);
      if (w < 0) throw new Error(`reading-comprehension key: the write-in question has no writing row ${k + 1}`);
      const at = from + w, e = body.indexOf('</svg>', at) + 6;
      const seated = seatOnRow(body.slice(at, e), part, { fill: CORAL, font: 'nunito-700' });
      body = body.slice(0, at) + seated + body.slice(e);
      from = at + seated.length;
    });
  }
  const css = `[data-lcs-choice][data-lcs-correct]{outline:4px solid ${CORAL};outline-offset:3px}`;
  return { bodyHtml: body + `<style data-lcs-key>${css}</style>`, meta: m };
}

/** The oracle: the right option of each screen item, re-derived (never read from the page's stamps). */
function oracle(items, locale) {
  const loc = (locale || 'en').slice(0, 2);
  return items.map((it) => {
    const m = it.meta;
    const story = storyById(loc, m['data-lcs-story']);
    if (!story) throw new Error(`oracle: no story ${m['data-lcs-story']}`);
    const labels = (it.options || []).map((o) => (o && typeof o === 'object' ? o.label : o));
    const qText = m['data-lcs-question'];
    const kind = m['data-lcs-qkind'];
    const one = (ok, what) => {
      const idx = labels.map((l, i) => (ok(l) ? i : -1)).filter((i) => i >= 0);
      if (idx.length !== 1) throw new Error(`oracle: ${idx.length} options ${what} for "${qText}" (${labels.join(' / ')})`);
      return idx[0];
    };
    if (kind === 'literal') {
      const n = +m['data-lcs-hint'];
      const sent = story.sentences[n - 1];
      if (!sent) throw new Error(`oracle: "${qText}" points to sentence ${n}, which the story does not have`);
      return one((l) => literalIn(l, sent, loc), `written in sentence ${n}`);
    }
    if (kind === 'write') {
      const w = story.l3.write;
      if (norm(w.q, loc) !== norm(qText, loc)) throw new Error(`oracle: "${qText}" is not the story's write-in question`);
      return one((l) => l === story.sentences[w.evidence - 1], `are sentence ${w.evidence}`);
    }
    // inference (level 3) and the core set (level 2): the data's answer, found by the question's own text
    const pool = kind === 'inference' ? story.l3.mc : story.core;
    const q = pool.find((x) => norm(x.q, loc) === norm(qText, loc));
    if (!q) throw new Error(`oracle: "${qText}" is not a ${kind} question of ${story.id}`);
    const right = q.choices[q.correct];
    if (kind === 'inference' && literalIn(right, story.text, loc)) throw new Error(`oracle: the inference answer "${right}" is written in the story`);
    return one((l) => l === right, `are "${right}"`);
  });
}

module.exports = { screenOrKey, oracle };
