/* =====================================================================
   validate-core.js — the storybook validator CORE (reusable library).

   Extracted 1:1 from scripts/storybook/validate-story.js so the SAME
   checks run from (a) the CLI (author-time, disk stories under
   "mini tools/stories") and (b) the Next.js Story Studio API route
   (tenant stories whose JSON comes from Postgres and whose binaries live
   in an isolated per-story dir). Every check message is byte-identical
   to the original CLI output — studio-server.js regex-parses the
   "  ERROR " / "  WARN  " lines the CLI prints from these arrays.

   Plain CJS with only fs/path/vm requires (+ optional sharp) so webpack
   can bundle it into a Next route without any dynamic-require warnings.

   validateStoryCore(opts) -> Promise<{ errors: string[], warns: string[] }>
     opts = {
       story,        // parsed story.json object
       strings,      // parsed strings.json object
       storyDir,     // absolute dir; SEP relative packages + narration audio resolve here
       miniDir,      // absolute dir holding the sb-mod-*.js browser module files
       repoDir,      // absolute repo root (vocab: <repoDir>/REFERENCE TRANSLATIONS/image-vocabulary.js)
       resolveUrl,   // optional (src:string) => localPath|null — overrides the default
                     //   CLI mapping (/mini-tools/ -> miniDir, /image-library-webp/ -> repoDir,
                     //   other /... -> repoDir/frontend/public). Receives the %-decoded src.
       band,         // optional grade-band tolerance profile (SB_BANDS[grade] or null)
       strictAudio,  // optional; missing narration mp3s become errors
       moduleFiles,  // optional override of the sandbox module file list
     }

   Manifest writing deliberately does NOT live here (tenant mode has no
   manifest) — the CLI keeps it.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
let sharp = null;
try { sharp = require('sharp'); } catch (e) {}

const DESIGN_W = 1600, DESIGN_H = 1000;
const MIN_STAGE_S = 560 / DESIGN_W;          /* 0.35 — the wrapper's min stage width */
const SCENE_CAP = 300 * 1024;

/* The browser module files loaded into the vm sandbox for their pure
   validateTask functions (same files the browser loads). */
const DEFAULT_MODULE_FILES = ['storybook-interaction.js', 'sb-legacy-adapter.js',
  'sb-mod-choice-board.js', 'sb-mod-sort-bins.js', 'sb-mod-find-object.js', 'sb-mod-worksheet-exercise.js',
  'sb-mod-fractions.js', 'sb-mod-clock.js', 'sb-mod-match-pairs.js', 'sb-mod-number-bond.js',
  'sb-mod-cvc-builder.js', 'sb-mod-word-builder.js',
  'sb-mod-sequence.js', 'sb-mod-pattern.js', 'sb-mod-memory.js', 'sb-mod-listen.js',
  'sb-mod-connect-dots.js', 'sb-mod-spot-diff.js', 'sb-mod-count-tap.js',
  'sb-preschool-kit.js', 'sb-mod-trace.js', 'sb-mod-dot-stamp.js', 'sb-mod-color-code.js', 'sb-mod-shape-fit.js',
  'sb-mod-complete-picture.js', 'sb-mod-listen-place.js', 'sb-mod-maze.js'];

async function validateStoryCore(opts) {
  const story = opts.story;
  const strings = opts.strings;
  const storyDir = opts.storyDir;
  const miniDir = opts.miniDir;
  const repoDir = opts.repoDir;
  const band = opts.band || null;
  const strictAudio = !!opts.strictAudio;
  const moduleFiles = opts.moduleFiles || DEFAULT_MODULE_FILES;

  const errors = [];
  const warns = [];
  function err(m) { errors.push(m); }
  function warn(m) { warns.push(m); }

  /* ---- URL → local file resolution (decode %20 etc. — themes have spaces) ---- */
  function defaultResolve(src) {
    if (src.startsWith('/mini-tools/')) return path.join(miniDir, src.replace('/mini-tools/', ''));
    if (src.startsWith('/image-library-webp/')) return path.join(repoDir, src.replace(/^\//, ''));
    if (src.startsWith('/')) return path.join(repoDir, 'frontend', 'public', src.replace(/^\//, ''));
    return null;
  }
  function urlToLocal(src) {
    try { src = decodeURIComponent(src); } catch (e) {}
    return opts.resolveUrl ? opts.resolveUrl(src) : defaultResolve(src);
  }
  function fileExists(src) {
    const p = urlToLocal(src);
    return p && fs.existsSync(p);
  }

  /* ---- sandbox: load the browser module files for their validateTask fns ---- */
  function loadModulesSandbox() {
    const sandbox = { console };
    sandbox.window = sandbox;
    sandbox.document = { createElement: () => ({ style: {}, classList: { add() {}, remove() {} } }), head: { appendChild() {} } };
    vm.createContext(sandbox);
    for (const f of moduleFiles) {
      const p = path.join(miniDir, f);
      if (!fs.existsSync(p)) { err(`module file missing: mini tools/${f}`); continue; }
      try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); }
      catch (e) { err(`module load failed ${f}: ${e.message}`); }
    }
    return sandbox;
  }

  function loadVocab() {
    try {
      const src = fs.readFileSync(path.join(repoDir, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
      const sandbox = {}; sandbox.window = sandbox;
      vm.createContext(sandbox);
      vm.runInContext(src, sandbox, { filename: 'image-vocabulary.js' });
      return sandbox.IMAGE_VOCABULARY || (sandbox.ImageVocab && sandbox.ImageVocab.DATA) || null;
    } catch (e) { warn('could not load IMAGE_VOCABULARY: ' + e.message); return null; }
  }

  const referencedStrings = new Set();
  const locales = story.locales || [];

  /* ---- 1. schema ---- */
  if (story.schemaVersion !== 'sb-1') err(`schemaVersion must be "sb-1" (got ${story.schemaVersion})`);
  if (!/^[a-z0-9-]+$/.test(story.id || '')) err('story.id must match /^[a-z0-9-]+$/');
  if (!Array.isArray(locales) || !locales.length) err('story.locales must be a non-empty array');
  if (!Array.isArray(story.pages) || !story.pages.length) err('story.pages must be non-empty');
  if (!Array.isArray(story.cast) || !story.cast.length) err('story.cast must be non-empty');

  const guides = (story.cast || []).filter(c => c.role === 'guide');
  if (guides.length !== 1) err(`exactly ONE cast member must have role "guide" (found ${guides.length})`);

  /* ---- 2. strings helpers ---- */
  function requireStringRef(ref, where) {
    if (typeof ref !== 'string' || ref.charAt(0) !== '@') {
      err(`${where}: human-facing text must be an "@key" reference into strings.json (got ${JSON.stringify(ref)})`);
      return;
    }
    requireStringKey(ref.slice(1), where);
  }
  function requireStringKey(key, where) {
    referencedStrings.add(key);
    const entry = strings[key];
    if (!entry) { err(`${where}: strings.json missing key "${key}"`); return; }
    for (const loc of locales) {
      if (!entry[loc] || !String(entry[loc]).trim()) err(`${where}: strings["${key}"] missing locale "${loc}"`);
    }
  }

  /* ---- 3. assets ---- */
  const assets = story.assets || {};
  function requireAsset(id, where, kinds) {
    const def = assets[id];
    if (!def) { err(`${where}: unknown assetId "${id}"`); return null; }
    if (kinds && kinds.indexOf(def.kind) < 0) err(`${where}: asset "${id}" kind ${def.kind}, expected ${kinds}`);
    if (!def.src) { err(`${where}: asset "${id}" has no src`); return def; }
    if (!fileExists(def.src)) err(`${where}: asset "${id}" file not found: ${def.src}`);
    return def;
  }

  requireStringRef(story.title, 'story.title');
  for (const c of story.cast || []) {
    requireStringRef(c.name, `cast.${c.id}.name`);
    requireAsset(c.atlasBase, `cast.${c.id}.atlasBase`, ['atlas']);
    if (c.atlasClips) requireAsset(c.atlasClips, `cast.${c.id}.atlasClips`, ['atlas']);
  }

  /* atlas content checks */
  function atlasJson(assetId) {
    const def = assets[assetId];
    if (!def || !def.src) return null;
    const p = urlToLocal(def.src);
    if (!p || !fs.existsSync(p)) return null;
    try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { err(`atlas ${assetId} parse: ${e.message}`); return null; }
  }
  function atlasAllFrames(assetId) {
    /* merge frames+animations across multipack pages */
    const def = assets[assetId];
    if (!def) return null;
    const first = atlasJson(assetId);
    if (!first) return null;
    const frames = Object.assign({}, first.frames);
    const anims = Object.assign({}, first.animations);
    const rel = (first.meta && first.meta.related_multi_packs) || [];
    const dir = path.dirname(urlToLocal(def.src));
    for (const r of rel) {
      try {
        const j = JSON.parse(fs.readFileSync(path.join(dir, r), 'utf8'));
        Object.assign(frames, j.frames);
        for (const k of Object.keys(j.animations || {})) {
          anims[k] = (anims[k] || []).concat(j.animations[k]);
        }
      } catch (e) { err(`atlas ${assetId} multipack ${r}: ${e.message}`); }
    }
    return { frames, anims };
  }

  for (const c of story.cast || []) {
    const base = atlasAllFrames(c.atlasBase);
    if (base) {
      for (const pose of c.poses || []) {
        if (!base.frames['pose_' + pose]) err(`cast.${c.id}: atlas ${c.atlasBase} missing frame "pose_${pose}"`);
      }
      /* registration: one source canvas per character */
      const sizes = new Set(Object.values(base.frames).map(f => f.sourceSize.w + 'x' + f.sourceSize.h));
      if (sizes.size > 1) err(`cast.${c.id}: registration violation — multiple sourceSizes in base atlas: ${[...sizes].join(', ')}`);
    }
    for (const clipName of Object.keys(c.clips || {})) {
      const fb = c.clips[clipName].fallbackPose;
      if (!fb) err(`cast.${c.id}.clips.${clipName}: fallbackPose required`);
      else if ((c.poses || []).indexOf(fb) < 0) err(`cast.${c.id}.clips.${clipName}: fallbackPose "${fb}" not in declared poses`);
      if (c.atlasClips) {
        const clips = atlasAllFrames(c.atlasClips);
        if (clips && !(clips.anims['clip_' + clipName] || []).length) {
          err(`cast.${c.id}: clips atlas missing animation "clip_${clipName}"`);
        }
      }
    }
  }

  /* ---- 4. reward ---- */
  if (!story.reward) warn('story has no reward envelope (keepsake) — allowed but unusual');
  else {
    if (!story.reward.id || !story.reward.id.startsWith('story.')) err('reward.id must start with "story."');
    for (const loc of locales) {
      if (!story.reward.label || !story.reward.label[loc]) err(`reward.label missing locale "${loc}"`);
    }
  }

  /* ---- 5. pages ---- */
  const sandbox = loadModulesSandbox();
  const vocab = loadVocab();
  const seenPageIds = new Set();
  const sceneChecks = [];

  function checkRectInDesign(r, where) {
    if (!r || !(r.w > 0) || !(r.h > 0)) { err(`${where}: rect missing/invalid`); return; }
    if (r.x < 0 || r.y < 0 || r.x + r.w > DESIGN_W || r.y + r.h > DESIGN_H) {
      err(`${where}: rect {${r.x},${r.y},${r.w},${r.h}} outside the ${DESIGN_W}x${DESIGN_H} design space`);
    }
  }

  function makeV(pageId, zone) {
    return {
      zone: zone ? { w: zone.w, h: zone.h } : null,
      band: band,   /* grade-band tolerance profile (null unless a PK/graded story); PK modules enforce band.fatal.* */
      error: m => err(`page ${pageId}: ${m}`),
      assetExists: id => { requireAsset(id, `page ${pageId} taskData`, null); },
      stringExists: key => { requireStringKey(key, `page ${pageId} taskData`); },
      vocab: (word, loc) => { /* exposed for module use; core vocab check below */ },
      sepPackage: p => validateSep(p, pageId, zone)
    };
  }

  function validateSep(pkg, pageId, zone) {
    const dir = pkg.startsWith('/') ? urlToLocal(pkg) : path.join(storyDir, pkg);
    if (!dir) { err(`page ${pageId}: SEP descriptor missing: ${pkg}/descriptor.json`); return; }
    const dPath = path.join(dir, 'descriptor.json');
    if (!fs.existsSync(dPath)) { err(`page ${pageId}: SEP descriptor missing: ${pkg}/descriptor.json`); return; }
    let d;
    try { d = JSON.parse(fs.readFileSync(dPath, 'utf8')); } catch (e) { err(`page ${pageId}: SEP descriptor parse: ${e.message}`); return; }
    if (d.formatVersion !== 'sep-1') err(`page ${pageId}: SEP formatVersion "${d.formatVersion}" unsupported`);
    if (['A', 'F', 'E', 'C', 'B', 'D', 'S'].indexOf(d.family) < 0) err(`page ${pageId}: SEP family "${d.family}" not supported (A, F, E, C, B, D, S)`);
    const visPath = path.join(dir, (d.visual && d.visual.file) || 'visual@2x.webp');
    if (!fs.existsSync(visPath)) err(`page ${pageId}: SEP visual missing: ${d.visual && d.visual.file}`);
    else if (sharp && d.visual) {
      sceneChecks.push(async () => {
        const m = await sharp(visPath).metadata();
        if (m.width !== d.crop.w * d.visual.scale || m.height !== d.crop.h * d.visual.scale) {
          err(`page ${pageId}: SEP visual is ${m.width}x${m.height}, expected ${d.crop.w * d.visual.scale}x${d.crop.h * d.visual.scale} (crop × scale)`);
        }
        if (!m.hasAlpha) err(`page ${pageId}: SEP visual has no alpha channel (must be transparent)`);
      });
    }
    const inCrop = (r, w) => {
      if (!r) { err(`page ${pageId}: SEP ${w} missing rect`); return; }
      if (r.x < -2 || r.y < -2 || r.x + r.w > d.crop.w + 2 || r.y + r.h > d.crop.h + 2) {
        err(`page ${pageId}: SEP ${w} rect outside crop`);
      }
    };
    let smallest = Infinity;
    if (d.family === 'A') {
      const slots = (d.elements && d.elements.slots) || [];
      if (!slots.length) err(`page ${pageId}: SEP A has no slots`);
      const letters = ((d.input || {}).tapPalette || {}).letters || [];
      const palLc = letters.map(x => String(x).toLowerCase());
      slots.forEach((s, i) => {
        inCrop(s.rect, `slots[${i}]`);
        const exp = String(s.expected == null ? '' : s.expected);
        // multi:true = a multi-digit numeric answer built in ONE box (tap digits); every char must be in the
        // palette. Otherwise a slot holds exactly one char.
        if (s.multi) {
          if (exp.length < 2) err(`page ${pageId}: SEP slots[${i}].multi but expected "${exp}" is not multi-char`);
          exp.split('').forEach(c => { if (palLc.indexOf(c.toLowerCase()) < 0) err(`page ${pageId}: SEP tapPalette.letters missing digit "${c}" of "${exp}"`); });
        } else if (!exp || exp.length !== 1) {
          err(`page ${pageId}: SEP slots[${i}].expected must be a single char`);
        } else if (palLc.indexOf(exp.toLowerCase()) < 0) {
          err(`page ${pageId}: SEP tapPalette.letters missing expected "${exp}"`);
        }
        if (s.rect) smallest = Math.min(smallest, s.rect.w, s.rect.h);
      });
    } else if (d.family === 'F') {
      const cells = (d.elements && d.elements.gridCells) || [];
      const tiles = (d.elements && d.elements.paletteTiles) || [];
      const sol = (d.elements && d.elements.solutionLabels) || {};
      if (!cells.length || !tiles.length) err(`page ${pageId}: SEP F needs gridCells + paletteTiles`);
      cells.forEach((c, i) => { inCrop(c.rect, `gridCells[${i}]`); if (c.rect) smallest = Math.min(smallest, c.rect.w, c.rect.h); });
      tiles.forEach((t, i) => {
        inCrop(t.rect, `paletteTiles[${i}]`);
        const rf = path.join(dir, t.revealFile || '');
        if (!t.revealFile || !fs.existsSync(rf)) err(`page ${pageId}: SEP paletteTiles[${i}] revealFile missing`);
      });
      cells.filter(c => !c.isClue).forEach(c => {
        if (sol[c.index] === undefined) err(`page ${pageId}: SEP solutionLabels missing cell ${c.index}`);
      });
    } else if (d.family === 'E') {
      const lefts = (d.elements && d.elements.leftItems) || [];
      const rights = (d.elements && d.elements.rightItems) || [];
      const pairs = (d.elements && d.elements.pairs) || [];
      if (lefts.length < 2 || rights.length < 2) err(`page ${pageId}: SEP E needs >= 2 leftItems + rightItems`);
      const rIdx = {}, lIdx = {};
      lefts.forEach((it, i) => {
        inCrop(it.rect, `leftItems[${i}]`);
        if (!it.anchor || typeof it.anchor.x !== 'number') err(`page ${pageId}: SEP leftItems[${i}] missing anchor {x,y}`);
        lIdx[it.index] = 1;
        if (it.rect) smallest = Math.min(smallest, it.rect.w, it.rect.h);
      });
      rights.forEach((it, i) => {
        inCrop(it.rect, `rightItems[${i}]`);
        if (!it.anchor || typeof it.anchor.x !== 'number') err(`page ${pageId}: SEP rightItems[${i}] missing anchor {x,y}`);
        rIdx[it.index] = 1;
        if (it.rect) smallest = Math.min(smallest, it.rect.w, it.rect.h);
      });
      if (pairs.length !== lefts.length) err(`page ${pageId}: SEP E pairs must cover every leftItem`);
      pairs.forEach((p, i) => {
        if (!lIdx[p.leftIndex]) err(`page ${pageId}: SEP pairs[${i}] leftIndex unknown`);
        if (!rIdx[p.correctRightIndex]) err(`page ${pageId}: SEP pairs[${i}] correctRightIndex unknown`);
        (p.acceptableRightIndices || []).forEach(ri => {
          if (!rIdx[ri]) err(`page ${pageId}: SEP pairs[${i}] acceptable index ${ri} unknown`);
        });
        if (p.acceptableRightIndices && p.acceptableRightIndices.indexOf(p.correctRightIndex) < 0) {
          err(`page ${pageId}: SEP pairs[${i}] acceptable set must contain correctRightIndex`);
        }
      });
    } else if (d.family === 'C') {
      const targets = (d.elements && d.elements.targets) || [];
      const blanks = (d.elements && d.elements.countBlanks) || [];
      const np = (d.input && d.input.numberPalette) || { min: 0, max: 10 };
      if (targets.length < 2) err(`page ${pageId}: SEP C needs >= 2 targets`);
      if (!targets.some(t => t.isTarget)) err(`page ${pageId}: SEP C needs at least one isTarget target`);
      targets.forEach((t, i) => {
        inCrop(t.rect, `targets[${i}]`);
        if (t.rect) smallest = Math.min(smallest, t.rect.w, t.rect.h);
      });
      blanks.forEach((b, i) => {
        inCrop(b.rect, `countBlanks[${i}]`);
        if (!b.key) err(`page ${pageId}: SEP countBlanks[${i}] missing key`);
        if (typeof b.expected !== 'number') err(`page ${pageId}: SEP countBlanks[${i}] missing numeric expected`);
        else if (b.expected < np.min || b.expected > np.max) {
          err(`page ${pageId}: SEP countBlanks[${i}] expected ${b.expected} outside numberPalette ${np.min}..${np.max}`);
        }
        if (b.rect) smallest = Math.min(smallest, b.rect.w, b.rect.h);
      });
    } else if (d.family === 'B') {
      const cells = (d.elements && d.elements.cells) || [];
      const paths = (d.elements && d.elements.paths) || [];
      if (!cells.length) err(`page ${pageId}: SEP B has no cells`);
      if (!paths.length) err(`page ${pageId}: SEP B has no paths`);
      const cIdx = {};
      cells.forEach((c, i) => {
        inCrop(c.rect, `cells[${i}]`);
        cIdx[c.index] = 1;
        if (c.rect) smallest = Math.min(smallest, c.rect.w, c.rect.h);
      });
      paths.forEach((p, i) => {
        const seq = p.sequence || [];
        if (seq.length < 2) err(`page ${pageId}: SEP paths[${i}] sequence must have >= 2 cells`);
        seq.forEach(ci => { if (!cIdx[ci]) err(`page ${pageId}: SEP paths[${i}] cell ${ci} not in cells`); });
      });
    } else if (d.family === 'D') {
      const dims = (d.elements && d.elements.chartDims) || {};
      const columns = (d.elements && d.elements.columns) || [];
      if (!columns.length) err(`page ${pageId}: SEP D has no columns`);
      columns.forEach((col, i) => {
        if (typeof col.target !== 'number' || col.target < 0 || col.target > (dims.rows || 99)) {
          err(`page ${pageId}: SEP columns[${i}] target ${col.target} out of 0..${dims.rows}`);
        }
        (col.cells || []).forEach((c, j) => {
          inCrop(c.rect, `columns[${i}].cells[${j}]`);
          if (c.rect) smallest = Math.min(smallest, c.rect.w, c.rect.h);
        });
      });
    } else if (d.family === 'S') {
      const choices = (d.elements && d.elements.choices) || [];
      if (!choices.length) err(`page ${pageId}: SEP S has no choices`);
      choices.forEach((c, i) => {
        if (c.rect) inCrop(c.rect, `choices[${i}]`);
        const opts = c.options || [];
        if (opts.length < 2) err(`page ${pageId}: SEP choices[${i}] needs >=2 options`);
        if (!opts.some(o => o.isCorrect)) err(`page ${pageId}: SEP choices[${i}] has no correct option`);
      });
      /* tap targets are fixed-size palette buttons (>=48px) → no crop-space density constraint */
    }
    /* locale coverage per the STORY's shipped locales */
    for (const loc of locales) {
      const L = (d.locales || {})[loc];
      if (!L || !L.prompt || !L.success) err(`page ${pageId}: SEP locales["${loc}"] needs prompt + success`);
    }
    /* density: smallest interactive rect at the min stage width */
    if (zone && smallest < Infinity) {
      const zoneRealW = zone.w * MIN_STAGE_S;
      const boardScale = Math.min(zoneRealW / d.crop.w, (zone.h * MIN_STAGE_S) / d.crop.h);
      const realPx = smallest * boardScale;
      if (realPx < 16) err(`page ${pageId}: SEP too dense — smallest element ${realPx.toFixed(0)}px at the 560px stage (enlarge zone or regenerate with fewer items)`);
      else if (realPx < 44) warn(`page ${pageId}: SEP smallest element ${realPx.toFixed(0)}px at min stage (inflated hit areas cover it, but consider a larger zone)`);
    }
  }

  for (const page of story.pages || []) {
    const pid = page.id || '?';
    if (!/^[a-z0-9-]+$/.test(pid)) err(`page id "${pid}" must match /^[a-z0-9-]+$/`);
    if (seenPageIds.has(pid)) err(`duplicate page id "${pid}"`);
    seenPageIds.add(pid);

    /* scene */
    if (!page.scene || (!page.scene.image && !(page.scene.layers || []).length)) {
      err(`page ${pid}: scene.image or scene.layers required`);
    }
    if (page.scene && page.scene.image) {
      const def = requireAsset(page.scene.image, `page ${pid} scene`, ['image']);
      if (def && sharp) {
        const p = urlToLocal(def.src);
        sceneChecks.push(async () => {
          const m = await sharp(p).metadata();
          if (m.width !== DESIGN_W || m.height !== DESIGN_H) {
            err(`page ${pid}: scene ${def.src} is ${m.width}x${m.height}, must be ${DESIGN_W}x${DESIGN_H}`);
          }
          const bytes = fs.statSync(p).size;
          if (bytes > SCENE_CAP) warn(`page ${pid}: scene ${def.src} is ${(bytes / 1024) | 0}KB (> ${SCENE_CAP / 1024}KB cap)`);
        });
      }
    }
    for (const ly of (page.scene && page.scene.layers) || []) {
      requireAsset(ly.image, `page ${pid} scene layer`, ['image']);
      if (ly.x === undefined || ly.y === undefined) err(`page ${pid}: scene layer needs explicit x,y (positions are DATA, never inferred)`);
    }

    /* characters */
    for (const pl of page.characters || []) {
      const def = (story.cast || []).find(c => c.id === pl.characterId);
      if (!def) { err(`page ${pid}: unknown characterId "${pl.characterId}"`); continue; }
      if (!pl.anchor || pl.anchor.x === undefined || pl.anchor.y === undefined) {
        err(`page ${pid}: character ${pl.characterId} needs anchor {x,y}`);
      } else if (pl.anchor.x < 0 || pl.anchor.x > DESIGN_W || pl.anchor.y < 0 || pl.anchor.y > DESIGN_H) {
        err(`page ${pid}: character ${pl.characterId} anchor out of bounds`);
      }
      if (pl.pose && (def.poses || []).indexOf(pl.pose) < 0) {
        err(`page ${pid}: character ${pl.characterId} pose "${pl.pose}" not declared in cast.poses`);
      }
      if (pl.entranceClip && !((def.clips || {})[pl.entranceClip])) {
        err(`page ${pid}: character ${pl.characterId} entranceClip "${pl.entranceClip}" not declared on ${def.id}.clips`);
      }
    }

    /* narration */
    for (const cue of (page.narration && page.narration.cues) || []) {
      if (!cue.id) { err(`page ${pid}: narration cue missing id`); continue; }
      requireStringKey(cue.id, `page ${pid} narration`);
      if (cue.characterId && !(story.cast || []).some(c => c.id === cue.characterId)) {
        err(`page ${pid}: narration cue ${cue.id} unknown characterId`);
      }
      if (cue.clip) {
        const cd = (story.cast || []).find(c => c.id === cue.characterId);
        if (!cd) err(`page ${pid}: narration cue ${cue.id} has a clip but no valid speaker`);
        else if (!((cd.clips || {})[cue.clip])) err(`page ${pid}: narration cue ${cue.id} clip "${cue.clip}" not declared on ${cd.id}.clips`);
      }
      /* audio coverage (line-ID mp3s) — warn pre-launch, error with --strict-audio */
      for (const loc of locales) {
        const mp3 = path.join(storyDir, 'audio', loc, cue.id + '.mp3');
        if (!fs.existsSync(mp3)) {
          (strictAudio ? err : warn)(`page ${pid}: narration audio missing (TTS fallback): audio/${loc}/${cue.id}.mp3`);
        }
      }
    }

    /* page text */
    for (const tx of page.text || []) requireStringKey(tx.stringKey, `page ${pid} text`);

    /* THE interaction */
    const inter = page.interaction;
    if (Array.isArray(inter)) { err(`page ${pid}: interaction must be ONE object, not an array`); continue; }
    if (inter) {
      checkRectInDesign(inter.zone, `page ${pid} interaction.zone`);
      const def = sandbox.SBModules && sandbox.SBModules.get && sandbox.SBModules.get(inter.moduleType);
      if (!def) err(`page ${pid}: moduleType "${inter.moduleType}" not registered`);
      else {
        const mode = inter.completionMode || 'auto';
        if (def.meta.completionModes.indexOf(mode) < 0) {
          err(`page ${pid}: ${inter.moduleType} does not support completionMode "${mode}"`);
        }
        if (inter.zone && (inter.zone.w < def.meta.minZone.w || inter.zone.h < def.meta.minZone.h)) {
          err(`page ${pid}: zone ${inter.zone.w}x${inter.zone.h} < ${inter.moduleType} minZone ${def.meta.minZone.w}x${def.meta.minZone.h}`);
        }
        try { def.validateTask(inter.taskData || {}, makeV(pid, inter.zone)); }
        catch (e) { err(`page ${pid}: validateTask threw: ${e.message}`); }
      }
      if (inter.hintKey) requireStringKey(inter.hintKey, `page ${pid} hint`);
    } else {
      warn(`page ${pid}: no interaction (narrative-only page auto-advances)`);
    }

    /* success */
    const su = page.success || {};
    if (su.narrationKey) requireStringKey(su.narrationKey, `page ${pid} success`);
    if (su.sticker) requireAsset(su.sticker, `page ${pid} sticker`, ['image']);
    if (su.clip) {
      const cd = (story.cast || []).find(c => c.id === su.clip.characterId);
      if (!cd) err(`page ${pid}: success.clip unknown characterId`);
      else if (!(cd.clips || {})[su.clip.name]) err(`page ${pid}: success.clip "${su.clip.name}" not declared on ${cd.id}`);
    }
  }

  /* ---- 6. vocab-canonical ---- */
  if (vocab) {
    for (const [id, def] of Object.entries(assets)) {
      if (!def.vocab) continue;
      const entry = vocab[def.vocab];
      if (!entry) { err(`asset ${id}: vocab key "${def.vocab}" not in IMAGE_VOCABULARY`); continue; }
      /* any string key named *.word.<vocab> must equal the canonical singular */
      for (const [k, val] of Object.entries(strings)) {
        if (!k.endsWith('.word.' + def.vocab)) continue;
        for (const loc of locales) {
          const canonical = entry[loc] && entry[loc][0];
          if (canonical && val[loc] && val[loc].toLowerCase() !== canonical.toLowerCase()) {
            err(`strings["${k}"].${loc} = "${val[loc]}" != IMAGE_VOCABULARY "${canonical}" (canonical-source rule)`);
          }
        }
      }
    }
  }

  /* ---- 7. orphan strings (warn) ---- */
  for (const k of Object.keys(strings)) {
    if (!referencedStrings.has(k)) warn(`strings.json key "${k}" is never referenced`);
  }

  /* ---- async image checks last (scene dims, byte caps, SEP visual dims) ---- */
  for (const chk of sceneChecks) { try { await chk(); } catch (e) { err('image check: ' + e.message); } }

  return { errors, warns };
}

module.exports = { validateStoryCore, DEFAULT_MODULE_FILES, DESIGN_W, DESIGN_H, SCENE_CAP };
