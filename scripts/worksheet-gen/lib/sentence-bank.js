/**
 * sentence-bank.js — the ONE helper over data/b2/sentences.js (nt20-B).
 *
 * A frame is `{ id, kind:'color'|'simple', text, noun:'sg'|'pl'|'<table>', uses:[…] }`
 * with at most four slot types: {name} {n} {noun} {color}. The code only ever
 * SUBSTITUTES stored literals — it never inflects, capitalises or re-orders a
 * word (the sv-render "pure substitution, zero morphology" lesson). The one
 * deliberate text transform is `corrupt()`, which is DESTRUCTIVE on purpose
 * (G2-274 "fix the sentence").
 *
 * verify() functions re-implement tokenize/corrupt inline — a gate must not
 * import the thing it checks.
 */
'use strict';

const SLOT_RE = /\{(name|n|noun|color)\}/g;
const NBSP = ' ';
const NNBSP = ' ';

function fillFrame(text, slots) {
  // a slot given as an ARRAY is consumed in order (two {name} slots → two
  // different names: "Anna draws a moose for Ben", never "… for Anna")
  const cursor = {};
  return text.replace(SLOT_RE, (_, k) => {
    const v = slots[k];
    if (v == null) throw new Error(`sentence-bank: slot {${k}} not provided`);
    if (Array.isArray(v)) { const i = cursor[k] || 0; cursor[k] = i + 1; return String(v[Math.min(i, v.length - 1)]); }
    return String(v);
  });
}

/** Tokens = whitespace-split words; a token that is ONLY punctuation (fr "?",
 *  es "¿") merges into its neighbour so a tile never carries a bare mark. */
function tokenize(text) {
  const raw = String(text).trim().split(/[   ]+/).filter(Boolean);
  const out = [];
  for (const tok of raw) {
    if (/^[?!.¿¡…]+$/.test(tok) && out.length) out[out.length - 1] += NBSP + tok;
    else if (/^[¿¡]+$/.test(tok)) out.push(tok); // handled by the next token
    else if (out.length && /^[¿¡]+$/.test(out[out.length - 1])) out[out.length - 1] += tok;
    else out.push(tok);
  }
  return out;
}

/** The end mark of a canonical sentence ('.', '?', '!') or '' when absent. */
function endMark(text) {
  const m = String(text).trim().match(/([.?!])$/);
  return m ? m[1] : '';
}
/** Leading Spanish/Portuguese open mark, or ''. */
function openMark(text) {
  const m = String(text).trim().match(/^([¿¡])/);
  return m ? m[1] : '';
}

/** Indices (>0) of tokens whose first letter is uppercase in the canonical. */
function capsIndices(tokens) {
  const out = [];
  tokens.forEach((tok, i) => {
    if (i === 0) return;
    const ch = [...tok.replace(/^[¿¡"'«(]+/, '')][0] || '';
    if (ch !== ch.toLowerCase() && ch === ch.toUpperCase()) out.push(i);
  });
  return out;
}

/** The corrupted form: all lowercase, no open mark, no end mark, no fr space
 *  before punctuation. Pure and deterministic — verify() re-derives it. */
function corrupt(canonical, loc) {
  let s = String(canonical).trim();
  s = s.replace(/^[¿¡]+\s*/, '');
  s = s.replace(/[\s  ]*[.?!…]+$/, '');
  s = s.toLocaleLowerCase(loc || 'en');
  return s;
}

/** Resolve the {noun} literal for a frame: vocab sg/pl, or a named table. */
function resolveNoun(bank, frame, entry, loc) {
  let text;
  if (frame.noun === 'sg') text = entry.singular;
  else if (frame.noun === 'pl') text = entry.plural;
  else {
    const table = bank.nounForms && bank.nounForms[frame.noun];
    if (!table) throw new Error(`sentence-bank: ${loc} frame ${frame.id} needs nounForms.${frame.noun}`);
    text = table[entry.vocabKey];
    if (!text) throw new Error(`sentence-bank: ${loc} nounForms.${frame.noun} has no entry for ${entry.vocabKey}`);
  }
  if (!text) throw new Error(`sentence-bank: no ${frame.noun} form for ${entry.vocabKey} in ${loc}`);
  if (bank.nounCase === 'lower') text = text.toLocaleLowerCase(loc || 'en');
  return text;
}

/** Frames of a kind/use, shuffled by rng, distinct. */
function pickFrames(bank, { kind, use, count, rng, filter }) {
  let pool = bank.frames.filter((f) => f.kind === kind && (!use || (f.uses || []).includes(use)));
  if (filter) pool = pool.filter(filter);
  if (pool.length < count) throw new Error(`sentence-bank: only ${pool.length} ${kind}/${use || '-'} frames, need ${count}`);
  return rng.shuffle(pool.slice()).slice(0, count);
}

/** The colour literal used INSIDE a sentence (bank override) vs the legend word. */
function colorInSentence(bank, colorWords, key) {
  return (bank.colorWords && bank.colorWords[key]) || colorWords[key];
}

module.exports = { fillFrame, tokenize, endMark, openMark, capsIndices, corrupt, resolveNoun, pickFrames, colorInSentence, NBSP, NNBSP, SLOT_RE };
