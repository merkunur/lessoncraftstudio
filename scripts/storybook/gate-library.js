#!/usr/bin/env node
/* =====================================================================
   gate-library.js — the 250-story LIBRARY-level quality gate.

   validate-story.js = fatal schema/spatial/assets. gate-story.js = per-story
   quality (grade envelope, scoring-leak, distractors…). THIS gate asserts the
   commitments a story makes to the LIBRARY (the 250-story program standard):

     registry        -> the story matches its docs/storybook/story-library-250.json row
     variety         -> no other library story shares (teachingPoint + premise) or
                        (teachingPoint + setting); dominant-mechanic over-repetition WARN
     roster          -> guide/companions exist in docs/storybook/cast-roster.json
                        and story.json cast agrees with library-meta
     translation     -> every strings.json key carries ALL 11 locale slots
                        (en filled; locales not in story.locales present-but-empty)
     audio-slots     -> the named-empty-audio-slot contract: every narration cue +
                        success narrationKey is a strings key AND is listed in
                        library-meta.audioSlots (mp3 files may be absent — the
                        player is silent-safe by design)
     style           -> paletteVersion matches style-lib PALETTE_VERSION; every
                        authored color (art-manifest.json colorsUsed) ∈ PALETTE;
                        WARN-level pixel sample of packed scenes vs the palette
     page-band       -> 7–10 pages (cheap redundancy with gate-story)

   Per-story input: mini tools/stories/<id>/library-meta.json  (schema lib-meta-1)
     { "$schema": "lib-meta-1", "storyId", "part", "index", "grade",
       "teachingPointId", "premise", "setting", "mechanics": [moduleType…],
       "guide", "companions": [id…], "paletteVersion", "signatureMoment",
       "audioSlots": [stringKey…] }

   USAGE:  node scripts/storybook/gate-library.js <storyId|dir> [--json]
   Exit 0 = zero HARD findings. Exit 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');
const STORIES = path.join(MINI, 'stories');
const REGISTRY_PATH = path.join(REPO, 'docs', 'storybook', 'story-library-250.json');
const ROSTER_PATH = path.join(REPO, 'docs', 'storybook', 'cast-roster.json');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const PAGE_BAND = [7, 10];
/* Verb families per module (operator mandate 2026-07-10: the premium bar needs
   varied interaction VERBS, not just tap-the-option / drag-and-drop). */
const VERB_OF = {
  'sb-choice-board': 'select', 'sb-find-object': 'select', 'sb-memory': 'select',
  'sb-spot-diff': 'select', 'sb-listen': 'audio-select',
  'sb-count-tap': 'order-tap', 'sb-sequence': 'order-tap', 'sb-connect-dots': 'order-tap',
  'sb-pattern': 'order-tap', 'sb-color-code': 'order-tap', 'sb-dot-stamp': 'order-tap',
  'sb-shape-fit': 'place', 'sb-complete-picture': 'place', 'sb-listen-place': 'place',
  'sb-sort-bins': 'place', 'sb-match-pairs': 'place', 'sb-number-bond': 'place',
  'sb-fractions': 'place', 'sb-clock': 'place', 'sb-cvc-builder': 'place',
  'sb-word-builder': 'place', 'sb-worksheet-exercise': 'place',
  'sb-trace': 'trace', 'sb-maze': 'navigate',
};
const MIN_VERB_FAMILIES = 3;
const SELECT_SHARE_MAX = 0.5;
/* WARN when the same dominant mechanic leads this many prior same-grade library stories. */
const MECHANIC_REPEAT_WARN = 3;
/* Pixel-sample budget: webp lossy noise + the sky gradient blend palette colors, so a
   tolerance distance + an off-palette share budget (WARN, never HARD). */
const PIXEL_SAMPLES = 2000;
const PIXEL_TOLERANCE = 34;        /* max RGB euclidean distance to the nearest palette color */
const PIXEL_OFF_BUDGET = 0.05;     /* share of sampled pixels allowed beyond tolerance */

function readJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; } }
function norm(s) { return String(s == null ? '' : s).trim().toLowerCase(); }

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* Dominant mechanic of a story = its most frequent page moduleType.
   A TIE means the story is balanced — no dominant (null), so the
   repeat-WARN doesn't fire on an arbitrary first-seen winner. */
function dominantMechanic(story) {
  const freq = {};
  (story.pages || []).forEach((pg) => {
    const mt = pg.interaction && pg.interaction.moduleType;
    if (mt) freq[mt] = (freq[mt] || 0) + 1;
  });
  let best = null, tied = false;
  for (const k in freq) {
    if (!best || freq[k] > freq[best]) { best = k; tied = false; }
    else if (freq[k] === freq[best]) tied = true;
  }
  return tied ? null : best;
}

/* ---- the gate engine (require-able) ---- */
async function runLibraryGates(storyId) {
  const findings = [];
  const add = (gate, severity, msg) => findings.push({ gate, severity, msg });

  const storyDir = fs.existsSync(storyId) ? storyId : path.join(STORIES, storyId);
  const id = path.basename(storyDir);
  const story = readJson(path.join(storyDir, 'story.json'));
  const strings = readJson(path.join(storyDir, 'strings.json'));
  const meta = readJson(path.join(storyDir, 'library-meta.json'));

  if (!story) { add('input', 'HARD', 'story.json missing/unparseable at ' + storyDir); return { findings }; }
  if (!strings) { add('input', 'HARD', 'strings.json missing/unparseable at ' + storyDir); return { findings }; }
  if (!meta) { add('library-meta', 'HARD', 'library-meta.json missing — every library story declares its lib-meta-1 block'); return { findings }; }
  if (meta.$schema !== 'lib-meta-1') add('library-meta', 'HARD', `library-meta $schema "${meta.$schema}" — expected "lib-meta-1"`);
  if (meta.storyId !== story.id || story.id !== id) {
    add('library-meta', 'HARD', `id mismatch: dir "${id}" / story.json "${story.id}" / library-meta "${meta.storyId}" must all agree`);
  }
  ['part', 'index', 'grade', 'teachingPointId', 'premise', 'setting', 'guide', 'paletteVersion', 'signatureMoment'].forEach((k) => {
    if (meta[k] == null || meta[k] === '') add('library-meta', 'HARD', `library-meta.${k} is required`);
  });
  if (!Array.isArray(meta.mechanics) || !meta.mechanics.length) add('library-meta', 'HARD', 'library-meta.mechanics must list the story\'s moduleTypes');
  if (!Array.isArray(meta.companions)) add('library-meta', 'HARD', 'library-meta.companions must be an array (may be empty)');
  if (!Array.isArray(meta.audioSlots)) add('library-meta', 'HARD', 'library-meta.audioSlots must list every narration cue + success line key');

  /* ---------- registry ---------- */
  const registry = readJson(REGISTRY_PATH);
  if (!registry || !Array.isArray(registry.rows)) {
    add('registry', 'HARD', 'story-library-250.json missing/unparseable at ' + REGISTRY_PATH);
  } else {
    const row = registry.rows.find((r) => r.storyId === id);
    if (!row) add('registry', 'HARD', `no registry row carries storyId "${id}" — claim a row in story-library-250.json first`);
    else {
      if (row.part !== meta.part || row.idx !== meta.index) add('registry', 'HARD', `registry row is part ${row.part} #${row.idx}; library-meta says part ${meta.part} #${meta.index}`);
      if (row.grade !== meta.grade) add('registry', 'HARD', `registry grade "${row.grade}" ≠ library-meta grade "${meta.grade}"`);
      if (row.teachingPointId !== meta.teachingPointId) add('registry', 'HARD', `registry teachingPointId "${row.teachingPointId}" ≠ library-meta "${meta.teachingPointId}"`);
      if (norm(row.premise) !== norm(meta.premise)) add('registry', 'HARD', 'registry row premise ≠ library-meta premise (keep the ledger truthful)');
      if (norm(row.setting) !== norm(meta.setting)) add('registry', 'HARD', 'registry row setting ≠ library-meta setting');
      if (row.status === 'open') add('registry', 'WARN', 'registry row status still "open" — flip to in_progress/shipped');
    }

    /* ---------- variety (vs every other claimed library story) ---------- */
    const siblings = registry.rows.filter((r) => r.storyId && r.storyId !== id);
    siblings.forEach((r) => {
      if (r.teachingPointId === meta.teachingPointId) {
        if (norm(r.premise) && norm(r.premise) === norm(meta.premise)) add('variety', 'HARD', `same teaching point + same premise as "${r.storyId}" — two stories on one point must differ in premise AND mechanic`);
        if (norm(r.setting) && norm(r.setting) === norm(meta.setting)) add('variety', 'HARD', `same teaching point + same setting as "${r.storyId}"`);
      }
    });
    /* dominant-mechanic over-repetition (same grade, prior library stories) */
    const myDominant = dominantMechanic(story);
    let repeats = 0;
    siblings.filter((r) => r.grade === meta.grade).forEach((r) => {
      const sib = readJson(path.join(STORIES, r.storyId, 'story.json'));
      const sibMeta = readJson(path.join(STORIES, r.storyId, 'library-meta.json'));
      if (sib && sibMeta && dominantMechanic(sib) === myDominant) repeats++;
    });
    if (myDominant && repeats >= MECHANIC_REPEAT_WARN) {
      add('variety', 'WARN', `dominant mechanic "${myDominant}" already leads ${repeats} other grade-${meta.grade} library stories — vary the mechanic mix`);
    }
  }

  /* ---------- page band ---------- */
  const pageCount = (story.pages || []).length;
  if (pageCount < PAGE_BAND[0] || pageCount > PAGE_BAND[1]) {
    add('page-band', 'HARD', `${pageCount} pages; the library standard is ${PAGE_BAND[0]}–${PAGE_BAND[1]}`);
  }

  /* ---------- verb census (the premium interaction-variety bar) ---------- */
  {
    const verbs = (story.pages || []).map((pg) => {
      const mt = pg.interaction && pg.interaction.moduleType;
      return VERB_OF[mt] || 'other';
    });
    const families = new Set(verbs.map((v) => (v === 'audio-select' ? 'audio' : v)));
    const selectShare = verbs.filter((v) => v === 'select').length / Math.max(1, verbs.length);
    if (families.size < MIN_VERB_FAMILIES) {
      add('verb-variety', 'WARN', `only ${families.size} interaction verb famil${families.size === 1 ? 'y' : 'ies'} (${[...families].join(', ')}) — the premium bar wants ≥${MIN_VERB_FAMILIES} (select / order-tap / place / trace / navigate / audio)`);
    }
    if (selectShare > SELECT_SHARE_MAX) {
      add('select-heavy', 'WARN', `${Math.round(selectShare * 100)}% of pages are plain tap-select — the premium bar caps select at ${SELECT_SHARE_MAX * 100}%; reach for trace/maze/listen/stamp/order verbs`);
    }
  }

  /* ---------- roster ---------- */
  const roster = readJson(ROSTER_PATH);
  if (!roster || !Array.isArray(roster.characters)) {
    add('roster', 'HARD', 'cast-roster.json missing/unparseable at ' + ROSTER_PATH);
  } else {
    const byId = {};
    roster.characters.forEach((c) => { byId[c.id] = c; });
    if (meta.guide && (!byId[meta.guide] || byId[meta.guide].role !== 'guide')) add('roster', 'HARD', `guide "${meta.guide}" is not a roster guide — add it to cast-roster.json + cast-bible.md`);
    (meta.companions || []).forEach((c) => {
      if (!byId[c]) add('roster', 'HARD', `companion "${c}" not in cast-roster.json — every cast member joins the roster`);
    });
    /* story.json cast agrees with meta */
    const cast = story.cast || [];
    const castGuides = cast.filter((c) => c.role === 'guide').map((c) => c.id);
    const castCompanions = cast.filter((c) => c.role === 'companion').map((c) => c.id);
    if (castGuides.length !== 1 || castGuides[0] !== meta.guide) add('roster', 'HARD', `story.json guide [${castGuides}] ≠ library-meta guide "${meta.guide}"`);
    const metaComp = (meta.companions || []).slice().sort().join(',');
    if (castCompanions.slice().sort().join(',') !== metaComp) add('roster', 'HARD', `story.json companions [${castCompanions}] ≠ library-meta companions [${meta.companions}]`);
  }

  /* ---------- translation slots ---------- */
  const shipped = story.locales || ['en'];
  for (const key in strings) {
    const entry = strings[key];
    if (!entry || typeof entry !== 'object') { add('translation-slots', 'HARD', `strings "${key}" is not a locale map`); continue; }
    LOCALES.forEach((loc) => {
      if (!(loc in entry)) add('translation-slots', 'HARD', `strings "${key}" missing the "${loc}" slot — every key carries all 11 locale slots`);
      else if (shipped.indexOf(loc) >= 0 && !String(entry[loc]).trim()) add('translation-slots', 'HARD', `strings "${key}" shipped locale "${loc}" is empty`);
      else if (shipped.indexOf(loc) < 0 && String(entry[loc] || '').trim()) add('translation-slots', 'WARN', `strings "${key}" carries "${loc}" text but "${loc}" is not in story.locales — either extend locales or keep the slot empty (never half-ship a locale)`);
    });
    const extra = Object.keys(entry).filter((l) => LOCALES.indexOf(l) < 0);
    if (extra.length) add('translation-slots', 'HARD', `strings "${key}" has unknown locale key(s): ${extra.join(', ')}`);
  }

  /* ---------- audio slots ---------- */
  const wanted = new Set();
  (story.pages || []).forEach((pg) => {
    ((pg.narration && pg.narration.cues) || []).forEach((c) => c.id && wanted.add(c.id));
    if (pg.success && pg.success.narrationKey) wanted.add(pg.success.narrationKey);
  });
  const declared = new Set(meta.audioSlots || []);
  wanted.forEach((k) => {
    if (!declared.has(k)) add('audio-slots', 'HARD', `narration slot "${k}" not listed in library-meta.audioSlots (the bulk-recording worklist must be complete)`);
    if (!strings[k]) add('audio-slots', 'HARD', `narration slot "${k}" has no strings.json key (cue id = strings key = mp3 filename)`);
  });
  declared.forEach((k) => {
    if (!wanted.has(k)) add('audio-slots', 'HARD', `library-meta.audioSlots lists "${k}" but no page uses it`);
  });

  /* ---------- style ---------- */
  let styleLib = null;
  try { styleLib = require(path.join(__dirname, 'art', 'style-lib.js')); } catch (e) { /* handled below */ }
  if (!styleLib || !styleLib.PALETTE || !styleLib.PALETTE_VERSION) {
    add('style', 'HARD', 'scripts/storybook/art/style-lib.js (PALETTE + PALETTE_VERSION) not found — the style SoT is required');
  } else {
    if (meta.paletteVersion !== styleLib.PALETTE_VERSION) {
      add('style', 'HARD', `library-meta.paletteVersion "${meta.paletteVersion}" ≠ style-lib PALETTE_VERSION "${styleLib.PALETTE_VERSION}"`);
    }
    const allowed = new Set(Object.values(styleLib.PALETTE).map((h) => String(h).toLowerCase()));
    const art = readJson(path.join(storyDir, 'art-manifest.json'));
    if (!art) add('style', 'HARD', 'art-manifest.json missing — the story\'s art generator must emit it (style-lib emitArtManifest)');
    else {
      if (art.paletteVersion !== styleLib.PALETTE_VERSION) add('style', 'HARD', `art-manifest paletteVersion "${art.paletteVersion}" ≠ "${styleLib.PALETTE_VERSION}"`);
      (art.colorsUsed || []).forEach((c) => {
        if (!allowed.has(String(c).toLowerCase())) add('style', 'HARD', `art-manifest color "${c}" is not in the wsv palette (visual-style-standard.md §1)`);
      });
    }
    /* WARN-level pixel sample of the packed scenes */
    try {
      const sharp = require('sharp');
      const paletteRgb = Object.values(styleLib.PALETTE).map(hexToRgb).filter(Boolean);
      const sceneDir = path.join(storyDir, 'scenes');
      const scenes = fs.existsSync(sceneDir) ? fs.readdirSync(sceneDir).filter((f) => /\.webp$/i.test(f)) : [];
      for (const f of scenes) {
        const { data, info } = await sharp(path.join(sceneDir, f)).raw().toBuffer({ resolveWithObject: true });
        const px = info.width * info.height;
        let off = 0;
        const step = Math.max(1, Math.floor(px / PIXEL_SAMPLES));
        let sampled = 0;
        for (let i = 0; i < px; i += step) {
          const o = i * info.channels;
          const r = data[o], g = data[o + 1], b = data[o + 2];
          let best = Infinity;
          for (const p of paletteRgb) {
            const d = Math.sqrt((r - p[0]) ** 2 + (g - p[1]) ** 2 + (b - p[2]) ** 2);
            if (d < best) best = d;
            if (best <= PIXEL_TOLERANCE) break;
          }
          if (best > PIXEL_TOLERANCE) off++;
          sampled++;
        }
        const share = off / Math.max(1, sampled);
        if (share > PIXEL_OFF_BUDGET) {
          add('style', 'WARN', `scene ${f}: ${(share * 100).toFixed(1)}% of sampled pixels beyond the palette tolerance (budget ${(PIXEL_OFF_BUDGET * 100)}%) — check for off-palette art`);
        }
      }
    } catch (e) {
      add('style', 'WARN', 'pixel sampling skipped (' + e.message + ')');
    }
  }

  return { findings };
}

if (require.main === module) {
  (async () => {
    const argv = process.argv.slice(2);
    const asJson = argv.includes('--json');
    const storyId = argv.find((a) => !a.startsWith('--'));
    if (!storyId) { console.error('Usage: gate-library.js <storyId|dir> [--json]'); process.exit(1); }

    const { findings } = await runLibraryGates(storyId);
    const hard = findings.filter((f) => f.severity === 'HARD');
    const warn = findings.filter((f) => f.severity === 'WARN');

    if (asJson) console.log(JSON.stringify({ hard, warn }, null, 2));
    else {
      console.log('── gate-library (250-story program gate) ── ' + storyId);
      if (!findings.length) console.log('  ✓ no library findings');
      hard.forEach((f) => console.log('  ✗ [HARD] ' + f.gate + ': ' + f.msg));
      warn.forEach((f) => console.log('  ⚠ [WARN] ' + f.gate + ': ' + f.msg));
      console.log(`\n${hard.length} HARD · ${warn.length} WARN`);
    }
    process.exit(hard.length ? 1 : 0);
  })();
}

module.exports = { runLibraryGates, LOCALES, PAGE_BAND };
