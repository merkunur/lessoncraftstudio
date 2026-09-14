/**
 * lib/sound-boxes.js — the K-318 `sound-boxes` segmentation door (design §5).
 * Type-scoped (only K-318 and its faces/gate require it); nothing shared.
 *
 * At RENDER the only segmentation source is the locale block of
 * data/b3/sound-boxes.js: `bank[vocabKey]` = [[graphemes per syllable], …].
 * `mode:'chunks'` locales (de/nl/sv/no) have their approved `chunks` layer
 * PRE-RESOLVED into `bank` by tools/apply-b3-locale.js (with `mergeDoubles` /
 * `remergeAcrossSyllable` / per-word overrides applied there), and da's strict
 * pool is resolved there too — so build() never opens approved-words-*.json
 * (brief rule 1), and a word absent from `bank` does not exist for the type.
 *
 *   segment(vocabKey, cfg)        → { rows, flat } | null (absent / excluded)
 *   fitBox({n, wideCount, inner, box, gap, wide, floor}) → px | null (refuse)
 *   eligible({theme, loc, cfg, d, inner}) → the card pool for a resolved
 *                                 difficulty: entriesFor() joined to the bank,
 *                                 /^\p{L}+$/u, distinct by word, n in
 *                                 minG..maxG, wide ≤ maxWide, fit ≥ 44 px.
 *                                 A bank row whose flat join is not the
 *                                 display word THROWS (a data defect must
 *                                 surface, never vanish).
 */
'use strict';
const { entriesFor, displayWord, distinctByWord } = require('./b2-common.js');

function segment(vocabKey, cfg) {
  if (!cfg || !cfg.bank) return null;
  if (Array.isArray(cfg.exclude) && cfg.exclude.includes(vocabKey)) return null;
  const rows = cfg.bank[vocabKey];
  if (!Array.isArray(rows) || !rows.length) return null;
  const flat = rows.flat();
  if (!flat.length || flat.some((g) => typeof g !== 'string' || !g.length)) return null;
  return { rows: rows.map((r) => r.slice()), flat };
}

/** The design's fit rule: box = min(box, floor((inner − gap(n−1) − 2) / (n + 0.5·wide))); null below `floor`. */
function fitBox({ n, wideCount, inner = 302, box, gap, wide = 1.5, floor = 44 }) {
  const b = Math.min(box, Math.floor((inner - gap * (n - 1) - 2) / (n + (wide - 1) * wideCount)));
  return b < floor ? null : b;
}

function eligible({ theme, loc, cfg, d, inner = 302 }) {
  const out = [];
  for (const e of entriesFor(theme, loc)) {
    const word = displayWord(e.singular, loc);
    if (!/^\p{L}+$/u.test(word)) continue;
    const seg = segment(e.vocabKey, cfg);
    if (!seg) continue;
    const joined = seg.flat.join('');
    if (joined !== word.toLocaleLowerCase(loc)) {
      throw new Error(`K-318: bank row "${e.vocabKey}" joins to "${joined}" but the ${loc} word is "${word}" — fix data/b3/sound-boxes.js`);
    }
    const n = seg.flat.length;
    const wideCount = seg.flat.filter((g) => [...g].length >= 2).length;
    if (n < d.minG || n > d.maxG) continue;
    if (wideCount > d.maxWide) continue;
    const box = fitBox({ n, wideCount, inner, box: d.box, gap: d.gap });
    if (!box) continue;
    out.push({ ...e, word, chunks: seg.flat, rows: seg.rows, n, wideCount, box });
  }
  return distinctByWord(out, (x) => x.word);
}

module.exports = { segment, fitBox, eligible };
