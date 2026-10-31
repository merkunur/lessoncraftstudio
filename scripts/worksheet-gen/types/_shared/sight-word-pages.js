/**
 * sight-word-pages.js — shared pieces of the Sight Words maker's new templates (K-433..K-441, 2026-10-31).
 *
 * Data: the Sight Words Level Set bank (lib/sight-words-levelset.js) — per locale ~100 K-1 sight words, the published
 * 24 first, 6 native-reviewed sentences per word, each carrying the word exactly once. Nothing here is authored text:
 * every word and sentence on these pages comes from that bank.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');
const tokens = require('../../primitives/_tokens.js');

const esc = SW.esc;
const INK = tokens.color.ink;
const TEAL = tokens.color.teal;
const GRID = tokens.color.grid;
const FONT_D = `${tokens.font.display},sans-serif`;
const FONT_B = `${tokens.font.body},sans-serif`;

/** The one-word unit axis without the one-letter words (a / I / y / e / à …): a page about letters needs two or more. */
const unitAxisMin2 = {
  applicable: true,
  units: (loc) => SW.unitIds(loc).filter((id) => [...SW.wordOf(id, loc)].length >= 2),
  exemplar: (loc) => SW.unitIds(loc).find((id) => [...SW.wordOf(id, loc)].length >= 2),
  tokens: SW.unitAxis.tokens,
};

/** Words of a level for the many-word pages: level 1 = the core 24, level 2 = the first 50, level 3 = the whole list. */
function levelWords(loc, level) {
  const all = SW.words(loc);
  return all.slice(0, level === 1 ? 24 : level === 2 ? 50 : all.length);
}

/** One letter in a box: solid, faint (to match), empty (to write / glue into), or cut (a tile; its edge is the cut line). */
function letterBox(ch, { size = 56, mode = 'solid', font = 38 } = {}) {
  const shown = mode === 'empty' ? '' : esc(ch);
  const color = mode === 'faint' ? GRID : INK;
  const border = mode === 'empty' ? `2.5px dashed ${tokens.color.coral}` : mode === 'cut' ? `2px dashed ${INK}` : `2px solid ${INK}`;
  const role = mode === 'empty' ? `data-lcs-answer="${esc(ch)}"` : 'data-lcs-given';
  return `<span data-lcs-letter="${esc(ch)}" data-lcs-mode="${mode}" ${role}${mode === 'cut' ? ' data-lcs-cut' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:${border};border-radius:${mode === 'cut' ? 0 : 10}px;background:#FFFFFF;font-family:${FONT_B};font-weight:800;font-size:${font}px;color:${color};line-height:1">${shown}</span>`;
}

/** A dashed cut-out frame around html (the cut line). */
function cutFrame(html, { pad = 6 } = {}) {
  return `<span data-lcs-cut style="display:inline-flex;padding:${pad}px;border:2px dashed ${INK};border-radius:4px">${html}</span>`;
}

/** Font size so `word` fits `maxW` px in Nunito 800 (≈ 0.62 em per character), between floor and ceil. */
function fitFont(word, maxW, { floor = 28, ceil = 96 } = {}) {
  const n = Math.max(1, [...word].length);
  return Math.max(floor, Math.min(ceil, Math.floor(maxW / (n * 0.62))));
}

/*
 * Drawable sentences (K-435 "read and draw"; native + pedagogy review 2026-10-31: "Heb je honger?", "Non lo so.", "Jeg er
 * ikke træt." cannot be drawn). A sentence is drawable when it names something a child can picture — a noun of the picture
 * vocabulary (REFERENCE TRANSLATIONS/image-vocabulary, singular or plural; fi also by stem, its nouns inflect) — and is
 * neither a question nor a negation.
 */
const platform = require('../../lib/platform/index.js');
const NEGATION = {
  en: ['not', "n't", 'no', 'never', 'nothing'], de: ['nicht', 'kein', 'keine', 'keinen', 'keiner', 'nie', 'nichts'],
  fr: ['pas', 'ne', "n'", 'jamais', 'rien'], es: ['no', 'nunca', 'nada'], pt: ['não', 'nunca', 'nada'], it: ['non', 'mai', 'niente'],
  nl: ['niet', 'geen', 'nooit', 'niets'], sv: ['inte', 'inga', 'ingen', 'inget', 'aldrig'], da: ['ikke', 'ingen', 'intet', 'aldrig'],
  no: ['ikke', 'ingen', 'ingenting', 'aldri'], fi: ['en', 'et', 'ei', 'emme', 'ette', 'eivät'],
};
const _nouns = new Map();
// read on first use, never at load: the maker's bundle builder records the files a template reads while it builds,
// and a read at load time would escape that recording (the browser would then miss the list)
let _refused = null;
const refused = () => _refused || (_refused = (() => { const j = platform.readJson(require('path').join(__dirname, '..', '..', 'data', 'literacy', 'sight-levelset', 'not-drawable.json')); const o = {}; for (const [l, list] of Object.entries(j)) if (Array.isArray(list)) o[l] = new Set(list); return o; })());
function nounSet(loc) {
  if (!_nouns.has(loc)) {
    const set = new Set();
    for (const e of Object.values(platform.vocab())) {
      const f = e[loc];
      if (!f) continue;
      for (const w of [f[0], f[1]]) if (w && !/\s/.test(w)) set.add(String(w).toLocaleLowerCase(loc));
    }
    _nouns.set(loc, set);
  }
  return _nouns.get(loc);
}
const wordsIn = (s, loc) => (String(s).toLocaleLowerCase(loc).match(/[\p{L}']+/gu) || []);
function drawable(sentence, loc) {
  if (/[?¿]/.test(sentence)) return false;
  const toks = wordsIn(sentence, loc);
  const neg = NEGATION[loc] || [];
  if (toks.some((t) => neg.includes(t) || neg.some((n) => n.startsWith("n'") && t.startsWith("n'")) || (loc === 'en' && t.endsWith("n't")))) return false;
  const nouns = nounSet(loc);
  // fi inflects its nouns (koulu → koulussa); sv/da/no put the definite article on the noun (hund → hunden, bog → bogen)
  const stem = (t) => (loc === 'fi' ? [...nouns].some((n) => n.length >= 4 && t.length >= 5 && t.startsWith(n))
    : ['sv', 'da', 'no'].includes(loc) ? [...nouns].some((n) => n.length >= 3 && t.startsWith(n) && t.length - n.length <= 3) : false);
  if (refused()[loc] && refused()[loc].has(sentence)) return false;   // native-checked: cannot be drawn (data/literacy/sight-levelset/not-drawable.json)
  return toks.some((t) => nouns.has(t) || stem(t));
}

/** The word's letters inside ANOTHER word of the sentence (da "Der" holds "er", fi "sen" holds "se") — a K child circles strings. */
function hiddenInside(sentence, word, loc) {
  const w = word.toLocaleLowerCase(loc);
  return wordsIn(sentence, loc).some((t) => t !== w && t.includes(w));
}

module.exports = { SW, esc, INK, TEAL, GRID, FONT_D, FONT_B, unitAxisMin2, levelWords, letterBox, cutFrame, fitFont, drawable, hiddenInside };
