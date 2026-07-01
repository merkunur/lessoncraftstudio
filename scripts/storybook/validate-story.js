#!/usr/bin/env node
/* =====================================================================
   validate-story.js — the storybook author-time validator (fatal-by-default).

   A story missing a zone bound / locale string / asset / pose fails HERE,
   loudly, at author time — never silently at runtime. Runs the modules'
   PURE validateTask functions in a Node vm sandbox (the same files the
   browser loads), so per-mechanic invariants live with the mechanic.

   Checks: schema/version · exactly-one-guide · one-interaction-per-page ·
   spatial (bounds, minZone, 44px-real floor at the 560px min stage) ·
   strings (no raw human-facing strings, full coverage per story.locales,
   orphan warnings) · assets (files exist, atlas frames/animations complete,
   clip fallbackPoses, registration sourceSize consistency, scene dims +
   byte caps) · vocab-canonical (asset.vocab → IMAGE_VOCABULARY equality) ·
   SEP packages (descriptor version/family/visual dims/rect bounds/
   per-family invariants/locale coverage/hitbox density) · reward envelope ·
   audio coverage (warn pre-launch) · emits manifest.json (files+sha1).

   USAGE:  node scripts/storybook/validate-story.js <storyId | path>
           [--strict-audio]     (missing narration mp3s become errors)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
let sharp = null;
try { sharp = require('sharp'); } catch (e) {}

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');
const DESIGN_W = 1600, DESIGN_H = 1000;
const MIN_STAGE_S = 560 / DESIGN_W;          /* 0.35 — the wrapper's min stage width */
const SCENE_CAP = 300 * 1024;

const errors = [];
const warns = [];
function err(m) { errors.push(m); }
function warn(m) { warns.push(m); }

/* ---- URL → local file resolution ---- */
function urlToLocal(src) {
  if (src.startsWith('/mini-tools/')) return path.join(MINI, src.replace('/mini-tools/', ''));
  if (src.startsWith('/image-library-webp/')) return path.join(REPO, src.replace(/^\//, ''));
  if (src.startsWith('/')) return path.join(REPO, 'frontend', 'public', src.replace(/^\//, ''));
  return null;
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
  const files = ['storybook-interaction.js', 'sb-legacy-adapter.js',
    'sb-mod-choice-board.js', 'sb-mod-sort-bins.js', 'sb-mod-find-object.js', 'sb-mod-worksheet-exercise.js'];
  for (const f of files) {
    const p = path.join(MINI, f);
    if (!fs.existsSync(p)) { err(`module file missing: mini tools/${f}`); continue; }
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); }
    catch (e) { err(`module load failed ${f}: ${e.message}`); }
  }
  return sandbox;
}

function loadVocab() {
  try {
    const src = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
    const sandbox = {}; sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(src, sandbox, { filename: 'image-vocabulary.js' });
    return sandbox.IMAGE_VOCABULARY || (sandbox.ImageVocab && sandbox.ImageVocab.DATA) || null;
  } catch (e) { warn('could not load IMAGE_VOCABULARY: ' + e.message); return null; }
}

/* ============================ main ============================ */
const target = process.argv[2];
if (!target) { console.error('Usage: validate-story.js <storyId|path> [--strict-audio]'); process.exit(1); }
const strictAudio = process.argv.includes('--strict-audio');
const storyDir = fs.existsSync(target) ? target : path.join(MINI, 'stories', target);
const storyPath = path.join(storyDir, 'story.json');
const stringsPath = path.join(storyDir, 'strings.json');

if (!fs.existsSync(storyPath)) { console.error('story.json not found at ' + storyDir); process.exit(1); }

let story, strings;
try { story = JSON.parse(fs.readFileSync(storyPath, 'utf8')); } catch (e) { console.error('story.json parse: ' + e.message); process.exit(1); }
try { strings = JSON.parse(fs.readFileSync(stringsPath, 'utf8')); } catch (e) { console.error('strings.json parse: ' + e.message); process.exit(1); }

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
    error: m => err(`page ${pageId}: ${m}`),
    assetExists: id => { requireAsset(id, `page ${pageId} taskData`, null); },
    stringExists: key => { requireStringKey(key, `page ${pageId} taskData`); },
    vocab: (word, loc) => { /* exposed for module use; core vocab check below */ },
    sepPackage: p => validateSep(p, pageId, zone)
  };
}

function validateSep(pkg, pageId, zone) {
  const dir = pkg.startsWith('/') ? urlToLocal(pkg) : path.join(storyDir, pkg);
  const dPath = path.join(dir, 'descriptor.json');
  if (!fs.existsSync(dPath)) { err(`page ${pageId}: SEP descriptor missing: ${pkg}/descriptor.json`); return; }
  let d;
  try { d = JSON.parse(fs.readFileSync(dPath, 'utf8')); } catch (e) { err(`page ${pageId}: SEP descriptor parse: ${e.message}`); return; }
  if (d.formatVersion !== 'sep-1') err(`page ${pageId}: SEP formatVersion "${d.formatVersion}" unsupported`);
  if (['A', 'F'].indexOf(d.family) < 0) err(`page ${pageId}: SEP family "${d.family}" not supported (v1: A, F)`);
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
    slots.forEach((s, i) => {
      inCrop(s.rect, `slots[${i}]`);
      if (!s.expected || String(s.expected).length !== 1) err(`page ${pageId}: SEP slots[${i}].expected must be a single char`);
      else if (letters.map(x => String(x).toLowerCase()).indexOf(String(s.expected).toLowerCase()) < 0) {
        err(`page ${pageId}: SEP tapPalette.letters missing expected "${s.expected}"`);
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
  }

  /* narration */
  for (const cue of (page.narration && page.narration.cues) || []) {
    if (!cue.id) { err(`page ${pid}: narration cue missing id`); continue; }
    requireStringKey(cue.id, `page ${pid} narration`);
    if (cue.characterId && !(story.cast || []).some(c => c.id === cue.characterId)) {
      err(`page ${pid}: narration cue ${cue.id} unknown characterId`);
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

/* ---- finish (async image checks first) ---- */
(async () => {
  for (const chk of sceneChecks) { try { await chk(); } catch (e) { err('image check: ' + e.message); } }

  /* manifest.json */
  if (!errors.length) {
    const files = [];
    (function walk(d) {
      for (const f of fs.readdirSync(d)) {
        const p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else {
          const rel = path.relative(storyDir, p).replace(/\\/g, '/');
          if (rel === 'manifest.json') continue;
          const buf = fs.readFileSync(p);
          files.push({ path: rel, bytes: buf.length, sha1: crypto.createHash('sha1').update(buf).digest('hex') });
        }
      }
    })(storyDir);
    const manifest = {
      storyId: story.id,
      generatedAt: new Date().toISOString(),
      pageCount: story.pages.length,
      totalBytes: files.reduce((a, f) => a + f.bytes, 0),
      files
    };
    fs.writeFileSync(path.join(storyDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  }

  for (const w of warns) console.log('  WARN  ' + w);
  for (const e of errors) console.log('  ERROR ' + e);
  console.log(`\n[validate-story] ${story.id}: ${errors.length} error(s), ${warns.length} warning(s)` +
    (errors.length ? '' : ' — manifest.json written'));
  process.exit(errors.length ? 1 : 0);
})();
