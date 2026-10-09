#!/usr/bin/env node
/**
 * build-waves.js — the Level Set waves for one type, from a config (tools/level-set/<type>.config.js).
 * Generalised from tools/level-set-abc/build-waves.js (Alphabetical Order, 2026-09-27).
 *
 * For each face × level × copy it picks a THEME (a new theme = new words — a genuinely new
 * worksheet, never the same pool reshuffled), verified by building the instance with its EXACT
 * seed for the printed page AND the screen version, and by its real composed <title> (≤ 70):
 *   - never the face's published theme, never a theme twice in one face;
 *   - never a colour theme AND its black-and-white twin in one face (same word pool);
 *   - no theme family in two faces at one level (one set never repeats its words);
 *   - colour and black-and-white alternate copy by copy; only taxonomy-registered themes.
 *
 *   node tools/level-set/build-waves.js <type>      e.g. articles
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const { themeAxisKey, buildManifest } = require('../../emit/manifest.js');
const { buildDeckHtml } = require('../../emit/deck-html.js');
const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
const { resolveUnitTokens } = require('../../lib/unit-axis.js');
const m = require('../../image-cache/resolve.js').manifest();
const TAX = require('../../../../frontend/config/topics-taxonomy.json');

const cfg = require('./' + process.argv[2] + '.config.js');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const family = (t) => String((m.themes[t] && m.themes[t].bw && m.themes[t].baseTheme) || t.replace(/ bw( \d+)?$/i, '')).toLowerCase();
// themes whose pictures do not show what their word says — never on a word worksheet
// (`tree`: fruit TREES labelled with the FRUIT word — "apple" under an apple tree; 2026-09-28)
const NEVER = new Set(['tree', 'tree bw']);
// cfg.themeAllow (Counting Money, 2026-10-05): only themes the task makes sense for — a shop sells fruit and toys, not
// dinosaurs, weather or body parts
// cfg.themeDeny (Division with Remainders, 2026-10-06): themes whose pictures make no sense for the task (piles of eyes)
const all = Object.keys(m.themes).filter((t) => TAX.axes.theme[themeAxisKey(t)] && !NEVER.has(t.toLowerCase()) && (!cfg.themeAllow || cfg.themeAllow.includes(t)) && !(cfg.themeDeny || []).includes(t)).sort();
const colour = all.filter((t) => !m.themes[t].bw), bw = all.filter((t) => m.themes[t].bw);
const TINY = { dataUri: 'data:,', width: 1, height: 1 };
// themes are near-twins when their NOUNS overlap, whatever their names say ("education bw" vs
// "classroom", "farm bw" vs "farm animals") — measured on the vocab keys each theme carries
const nounsOf = new Map(all.map((t) => [t, new Set(Object.values(m.themes[t].nouns).map((n) => n.vocabKey).filter(Boolean))]));
const twin = (a, b) => {
  if (family(a) === family(b)) return true;
  const A = nounsOf.get(a), B = nounsOf.get(b);
  if (!A || !B || !A.size || !B.size) return false;
  let n = 0; for (const x of A) if (B.has(x)) n++;
  return n / Math.min(A.size, B.size) >= 0.3;
};

/**
 * writeWave(cfg, loc, wave) — waves/wave-<fileStem>-<loc>.json (fileStem defaults to the prefix). Two types once shared
 * the prefix "sbl" (Sentence Building, Sound Boxes): the second build overwrote the first one's waves, and 643 live decks
 * lost their wave (2026-10-06). The deck ids come from wave.id, so a type keeps its prefix and only moves its FILE; a
 * wave file holding ANOTHER type's wave is never overwritten.
 */
function writeWave(cfg, loc, wave) {
  const file = path.join(__dirname, '..', '..', 'waves', 'wave-' + (cfg.fileStem || cfg.prefix) + '-' + loc + '.json');
  if (fs.existsSync(file)) {
    let old = null; try { old = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { /* unreadable: overwrite */ }
    const sameType = !old || !old._note || old._note === wave._note || (old.types || []).some((t) => (wave.types || []).includes(t));
    if (!sameType) throw new Error(file + ' holds another type\'s wave (' + String(old._note).slice(0, 60) + ') — give this config its own fileStem');
  }
  fs.writeFileSync(file, JSON.stringify(wave, null, 2) + '\n');
}

function titleFits(spec, theme, level, copy, loc, unit = null) {
  const strings = resolveUnitTokens(resolveStrings(spec.id, loc, spec), spec, unit, loc);
  const manifest = buildManifest({ spec, cacheTheme: theme, difficulty: level, locale: loc, variant: copy, unit, deckId: 'x', generatedAt: 'x', strings, imagesUsed: [] });
  const html = buildDeckHtml({ manifest, spec, strings, locale: loc, preview: TINY });
  return ((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '').length <= (cfg.titleMax || 70);
}
function builds(spec, theme, level, copy, loc, unit = null) {
  if (!titleFits(spec, theme, level, copy, loc, unit)) return false;
  const seed = instanceSeed({ typeId: spec.id, theme, difficulty: level, seedEpoch: 1, variant: copy, unit });
  try {
    for (const extra of [{}, { interactive: true }, { answerKey: true }]) {
      spec.build({ theme, difficulty: level, locale: loc, unit }, { rng: makeRng(seed), variant: copy, ...extra });
    }
    return true;
  } catch (e) { return false; }
}

/**
 * cfg.reuseThemes (Read and Do, 2026-09-30): a type whose buildable themes run out before five copies per level may put a
 * SECOND copy on a theme it already used — a new seed, and only when that copy's words (spec.levelSetWords(meta): the
 * nouns on its row) share at most half with every copy already on that theme at that level. The words of a copy.
 */
function wordsOf(spec, theme, level, copy, loc) {
  const seed = instanceSeed({ typeId: spec.id, theme, difficulty: level, seedEpoch: 1, variant: copy });
  const b = spec.build({ theme, difficulty: level, locale: loc }, { rng: makeRng(seed), variant: copy });
  if (typeof spec.levelSetWords !== 'function') throw new Error(`build-waves: reuseThemes needs ${spec.id}.levelSetWords`);
  return new Set(spec.levelSetWords(b.meta));
}

/**
 * THEMELESS types (curated sets — Compound Words, 2026-09-28): a copy is a (set, seed) pair. For each
 * face × level it tries the sets × seeds and ACCEPTS a copy only when its page shares at most
 * `maxShared` words with every copy already accepted at that level (the published page included at
 * level 2): a new copy asks new words, never the same words reshuffled. A text-list level
 * (`cfg.textLevels`) walks its native list instead (seedVariant = the list position 1..N).
 * Copy numbers run ONCE per face (2, 3, …) across its levels — titles/slugs carry only "Set N",
 * so a number may never repeat inside a face, and 1 is the published page.
 */
function themelessWaves() {
  const rep = [];
  for (const loc of LOCALES) {
    const levels = {};
    const counts = [];
    for (const [id, face] of Object.entries(cfg.faces)) {
      const spec = loadType(id);
      if (!cfg.include(loc, id, null)) continue;
      // cfg.noUnits (Hundreds Chart Puzzles, 2026-10-08): every copy on the exemplar range — a level may name its own
      // chart, and a unit in the deck's title would then name the wrong one
      const units = cfg.noUnits ? [null] : [null, ...((spec.unitAxis && typeof spec.unitAxis.units === 'function' && spec.unitAxis.units(loc)) || [])];
      const wholesOf = (lv, unit, sv, copy) => {
        const seed = instanceSeed({ typeId: spec.id, theme: null, difficulty: lv, seedEpoch: 1, variant: sv, unit });
        let meta = null;
        for (const extra of [{}, { interactive: true }, { answerKey: true }]) {
          const b = spec.build({ theme: null, difficulty: lv, locale: loc, unit }, { rng: makeRng(seed), variant: copy, seedVariant: sv, ...extra });
          if (meta && JSON.stringify(b.meta) !== meta) throw new Error('screen/key drew different content');
          meta = JSON.stringify(b.meta);
        }
        const m0 = JSON.parse(meta);
        // a spec may name what makes a copy different (word-parts: its families / pictures / rows / people)
        if (typeof spec.levelSetWords === 'function') return new Set(spec.levelSetWords(m0).map((w) => String(w).toLocaleLowerCase(loc)));
        return new Set([...(m0.wholes || m0.items || m0.letters || m0.pairs || m0.bases || []), ...(m0.foils || [])].map((w) => String(w).toLocaleLowerCase(loc)));
      };
      const fits = (lv, unit, copy, sv) => {
        const s0 = withLevelInstruction(resolveStrings(spec.id, loc, spec), spec.id, lv, loc);
        const strings = resolveUnitTokens(spec.copyStrings ? spec.copyStrings(s0, { locale: loc, difficulty: lv, unit, variant: copy, seedVariant: sv }) : s0, spec, unit, loc);
        const manifest = buildManifest({ spec, cacheTheme: null, difficulty: lv, locale: loc, variant: copy, unit, deckId: 'x', generatedAt: 'x', strings, imagesUsed: [] });
        const html = buildDeckHtml({ manifest, spec, strings, locale: loc, preview: TINY });
        return ((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '').length <= (cfg.titleMax || 70);
      };
      let next = 2;
      for (const lv of face.levels) {
        if (!cfg.include(loc, id, lv)) continue;
        const accepted = [];
        const out = [];
        if (lv === 2) { try { accepted.push(wholesOf(2, null, 1, 1)); } catch (e) { continue; } }   // the published page
        // a face may list SEVERAL text levels (Reading Comprehension: every level walks the native story pool)
        const tl = (cfg.textLevels || {})[id];
        const text = tl === lv || (Array.isArray(tl) && tl.includes(lv));
        // GROUP faces (cfg.groupFaces — Cursive letters / capitals): one copy per group of the alphabet, every group,
        // in every script the locale teaches (seedVariant = the group number; the page throws past the last group)
        const group = !!(cfg.groupFaces || {})[id];
        const allUnits = (spec.unitAxis && typeof spec.unitAxis.units === 'function' && spec.unitAxis.units(loc)) || [];
        const pubUnit = spec.unitAxis && spec.unitAxis.exemplar ? spec.unitAxis.exemplar(loc, spec) : null;
        const groupUnits = allUnits.length > 1 ? allUnits : [null];
        // UNIT faces (cfg.unitsOnly — Letter of the Week, the whole alphabet): one copy per unit (letter), every unit
        // the face can build; the exemplar is skipped at level 2 (it is the published page)
        // SINGLE faces (cfg.singleFaces — Letter Tracing's range pages, whose titles name their letters): exactly one
        // copy at each non-core level (the core level IS the published page). noExemplarSkip: the published page is
        // not one of the units (K-238's is an A–F range), so every unit gets its level-2 copy too.
        const single = (cfg.singleFaces || []).includes(id);
        // a text-level face walks its own list even in a unitsOnly config (Sight Words 2026-09-30: K-239's word sets beside the one-word faces)
        const unitMode = cfg.unitsOnly && !single && !text;
        const tries = single
          ? (lv === 2 ? [] : [{ unit: null, sv: 1 }])
          : unitMode
          ? allUnits.filter((u) => cfg.noExemplarSkip || !(lv === 2 && u === pubUnit)).map((unit) => ({ unit, sv: 1 }))
          : group
          ? groupUnits.flatMap((unit) => Array.from({ length: 12 }, (_, k) => ({ unit, sv: k + 1 })))
            .filter((t) => !(lv === 2 && t.sv === 1 && (cfg.groupFaces[id] === 'skipFirstAtCore') && (t.unit === null || t.unit === pubUnit)))
          : text
            ? Array.from({ length: cfg.maxCopies }, (_, k) => ({ unit: null, sv: k + 1 }))
            : units.flatMap((unit) => Array.from({ length: face.seeds || cfg.seeds }, (_, k) => ({ unit, sv: k + 1 }))).filter((t) => !((lv === 2 || (face.liveAt || []).includes(lv)) && t.unit === null && t.sv === 1));   // face.liveAt (Measurement 2026-10-09): levels whose copy 1 is ALSO a live page (June level 1 / 3 pages)
        // face.maxCopiesAt (Days and Months, 2026-10-06): a level whose copies could only reshuffle the same content gets
        // fewer copies (operator: "only copies that differ") — { <level>: n }
        const cap = (face.maxCopiesAt && face.maxCopiesAt[lv] !== undefined) ? face.maxCopiesAt[lv] : cfg.maxCopies;
        for (const t of tries) {
          if (!group && !cfg.unitsOnly && !single && out.length >= cap) break;
          let w;
          try { w = wholesOf(lv, t.unit, t.sv, next); } catch (e) { continue; }
          if (!group && !text && !cfg.unitsOnly && !single && accepted.some((a) => [...w].filter((x) => a.has(x)).length > Math.min(face.maxShared || cfg.maxShared, Math.max(1, Math.floor(w.size * (face.shareFrac || cfg.shareFrac || 0.25)))))) continue;
          if (!fits(lv, t.unit, next, t.sv)) { console.error(`  title too long: ${id} L${lv} ${t.unit || ''} group/seed ${t.sv}`); continue; }
          accepted.push(w);
          out.push({ copy: next++, unit: t.unit, seedVariant: t.sv });
        }
        if (out.length) (levels[id] = levels[id] || {})[lv] = out;
        counts.push(`${id.slice(3)}L${lv}:${out.length}`);
      }
    }
    if (!Object.keys(levels).length) { rep.push(`${loc}: none (the locale refuses the type)`); continue; }
    const wave = {
      id: 'wave-' + cfg.prefix + '-' + loc, _note: cfg.note,
      indexable: false, interactive: cfg.interactive !== false, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
      types: Object.keys(levels), levels,
    };
    writeWave(cfg, loc, wave);
    const n = Object.values(levels).flatMap((l) => Object.values(l).flat()).length;
    rep.push(`${loc}: ${n} copies  ${counts.join(' ')}`);
  }
  console.log(rep.join('\n'));
}
if (cfg.themeless) { themelessWaves(); process.exit(0); }

const report = [];
const short = {};
for (const loc of LOCALES) {
  const levels = {};
  const usedAtLevel = {};
  const faceIds = Object.keys(cfg.faces);
  for (const [id, face] of Object.entries(cfg.faces)) {
    const spec = loadType(id);
    // the published theme may differ per locale (sv article cards: farm animals) — face.publishedByLoc
    // a face may have SEVERAL published themes (Arrays and Multiplication 2026-10-04: two themes per type at level 2)
    const pubs = [].concat((face.publishedByLoc && face.publishedByLoc[loc]) || face.published || []).filter(Boolean);
    const published = pubs[0] || null;
    const usedInFace = pubs.slice();   // a NEW face has no published page
    // face.rotateUnits: each copy pins the next unit of the type's unitAxis (the bilingual partner language),
    // so the copies of a face cover the partner languages instead of repeating the exemplar
    const units = (face.unitsByLoc && face.unitsByLoc(loc)) || (face.rotateUnits && spec.unitAxis && spec.unitAxis.applicable ? spec.unitAxis.units(loc) : null);
    let uk = LOCALES.indexOf(loc);
    let k = 0;
    // titles carry theme + set number but not the level, so a (theme, set number) pair may occur once per face
    let nextAll = 1;
    const themeAtCopy = {};
    const acceptedWords = {};   // cfg.reuseThemes: per level, the words of every accepted copy of this face
    for (const [lv, copies] of Object.entries(face.levels)) {
      if (!cfg.include(loc, id, Number(lv))) continue;
      usedAtLevel[lv] = usedAtLevel[lv] || [];
      // cfg.faceWideDistinct === false: themes must differ within a LEVEL (what a teacher prints
      // together), may recur between levels of a face (the task differs) — for locales whose
      // buildable, unrelated themes cannot cover 15 copies (fi noun-case tables)
      if (cfg.faceWideDistinct === false) usedInFace.length = pubs.length;
      (levels[id] = levels[id] || {})[lv] = [];
      // copies === 'all' (Picture Word Cards, 2026-09-29: "teachers should be able to find everything they need"):
      // one copy per buildable theme, colour AND black-and-white (a B&W set is its own picture set); at level 2 the
      // published theme is skipped (copy 1 is the published page). These themes are NOT reserved against the
      // other faces — a materials set for every theme does not compete with the faces' five.
      if (copies === 'all') {
        let copy = Math.max(nextAll, Number(lv) === 2 ? 2 : 1);   // set numbers run on across levels (unique titles)
        // cfg.allSkipBwTwins (operator 2026-10-03: "It is too many worksheets"): every COLOUR theme, and a black-and-white
        // theme only when it is no twin of a colour theme or of a black-and-white theme already taken — "animals bw 2…5"
        // repeat "animals" in line art; "objects bw" is a topic of its own
        const keptBw = [];
        for (const t of all) {
          if (Number(lv) === 2 && pubs.includes(t)) continue;
          if (cfg.allSkipBwTwins && m.themes[t].bw) {
            if (colour.some((c) => twin(c, t)) || keptBw.some((k) => twin(k, t))) continue;
          }
          if (builds(spec, t, Number(lv), copy, loc)) { levels[id][lv].push({ copy: copy++, theme: t }); if (m.themes[t].bw) keptBw.push(t); }
        }
        nextAll = copy;
        continue;
      }
      for (const copy of copies) {
        // a colour-only type (themeAxis.excludeBw without levelSetBw) never gets a black-and-white copy (enumerate refuses it)
        const colourOnly = spec.themeAxis && spec.themeAxis.excludeBw && !spec.themeAxis.levelSetBw;
        const pools = colourOnly ? [colour] : k++ % 2 === 0 ? [colour, bw] : [bw, colour];
        const unit = units ? units[uk++ % units.length] : null;
        let pick = null;
        for (const pool of pools) {
          const off = (faceIds.indexOf(id) * 37 + Number(lv) * 13 + copy * 29 + LOCALES.indexOf(loc) * 3) % pool.length;
          for (const avoidOthers of [true, false]) {
            for (let i = 0; i < pool.length && !pick; i++) {
              const t = pool[(off + i) % pool.length];
              if (usedInFace.some((u) => twin(u, t))) continue;
              if (themeAtCopy[copy] && themeAtCopy[copy].includes(t)) continue;   // same theme + same set number = same title
              // first pass: no near-twin of another face's theme at this level; the fallback still
              // never repeats a theme (family) — it only tolerates a partial noun overlap
              // cfg.crossFaceShare (Read and Do, 2026-09-30): the faces are DIFFERENT tasks (circle / two steps / true or false /
              // draw), so two faces may use one theme at one level — ~11 buildable themes cannot serve 6 faces × 5 copies otherwise
              if (!cfg.crossFaceShare && usedAtLevel[lv].some((u) => (avoidOthers ? twin(u, t) : family(u) === family(t)))) continue;
              if (builds(spec, t, Number(lv), copy, loc, unit)) pick = t;
            }
            if (pick) break;
          }
          if (pick) break;
        }
        // cfg.reuseThemes: a second copy on an already used theme, with a page of (mostly) other nouns
        if (!pick && cfg.reuseThemes) {
          const seen = (acceptedWords[lv] = acceptedWords[lv] || []);
          const cands = [...new Set([...(Number(lv) === 2 ? [] : pubs), ...levels[id][lv].map((c) => c.theme), ...usedInFace])].filter((t) => !m.themes[t].bw && !(Number(lv) === 2 && pubs.includes(t)));
          for (const t of cands) {
            if (themeAtCopy[copy] && themeAtCopy[copy].includes(t)) continue;
            if (!builds(spec, t, Number(lv), copy, loc, unit)) continue;
            const w = wordsOf(spec, t, Number(lv), copy, loc);
            const clash = seen.filter((x) => x.theme === t).some((x) => { let k = 0; for (const y of w) if (x.words.has(y)) k++; return k > w.size / 2; });
            if (!clash) { pick = t; break; }
          }
        }
        // cfg.allowFewer: the honest maximum — fewer copies at this level, recorded in the report (es two-syllable
        // syllable cards: few Spanish nouns are two syllables), never a filler theme
        if (!pick && cfg.allowFewer) { (short[loc] = short[loc] || []).push(`${id} L${lv}: ${levels[id][lv].length}`); break; }
        if (!pick) throw new Error(`build-waves: no theme for ${id} level ${lv} copy ${copy} in ${loc}`);
        usedInFace.push(pick);
        if (cfg.reuseThemes) (acceptedWords[lv] = acceptedWords[lv] || []).push({ theme: pick, words: wordsOf(spec, pick, Number(lv), copy, loc) });
        (themeAtCopy[copy] = themeAtCopy[copy] || []).push(pick);
        usedAtLevel[lv].push(pick);
        levels[id][lv].push({ copy, theme: pick, ...(unit ? { unit } : {}) });
      }
    }
  }
  const types = Object.keys(levels);
  const wave = {
    id: 'wave-' + cfg.prefix + '-' + loc, _note: cfg.note,
    indexable: false, interactive: cfg.interactive !== false, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
    types, levels,
  };
  writeWave(cfg, loc, wave);
  const copies = Object.values(levels).flatMap((l) => Object.values(l).flat());
  report.push(`${loc}: ${copies.length} copies, ${copies.filter((c) => m.themes[c.theme].bw).length} black-and-white`);
}
console.log(report.join('\n'));
if (Object.keys(short).length) console.log('fewer than asked (honest maximum): ' + JSON.stringify(short));
