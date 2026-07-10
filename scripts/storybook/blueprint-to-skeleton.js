#!/usr/bin/env node
/* =====================================================================
   blueprint-to-skeleton.js — expand a blueprint-1 into an sb-1 skeleton.

   Reads mini tools/stories/<id>/blueprint.json and writes:
     - story.json   (sb-1: cast, assets, pages with cue refs + interactions)
     - strings.json (every narration line + reward label lifted to 11-locale-shape
                     with EN filled, other locales empty for the ensembles)
   Narration text authored inline in the blueprint is moved into strings.json under
   the cue id (= mp3 filename). exerciseSpec pages get taskData.package pointing at
   exercises/ex-p<NN> (materialized separately by sep-generate.js --from-blueprint).

   NON-destructive by default: refuses to overwrite an existing story.json unless
   --force. The generated skeleton is a STARTING POINT — open it in the Studio to
   place art + tune coordinates, then validate + gate + qa.

   USAGE: node scripts/storybook/blueprint-to-skeleton.js <storyId> [--force]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');

function die(m) { console.error('[blueprint-to-skeleton] ' + m); process.exit(1); }

const storyId = process.argv[2];
if (!storyId || storyId.startsWith('--')) die('usage: blueprint-to-skeleton.js <storyId> [--force]');
const force = process.argv.includes('--force');

const dir = fs.existsSync(storyId) ? storyId : path.join(MINI, 'stories', storyId);
const bpPath = path.join(dir, 'blueprint.json');
if (!fs.existsSync(bpPath)) die('blueprint.json not found at ' + bpPath);
const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
if (bp.$schema !== 'blueprint-1') die('not a blueprint-1 (got ' + bp.$schema + ')');

const storyPath = path.join(dir, 'story.json');
const stringsPath = path.join(dir, 'strings.json');
if (fs.existsSync(storyPath) && !force) die('story.json already exists — pass --force to overwrite (you will lose Studio coordinate edits)');

const strings = {};          // key -> { en: "…" }  (other locales added by ensembles)
function str(key, text) { strings[key] = { en: text != null ? text : '' }; return '@' + key; }

// ---- reward + title ----
const id = bp.id || storyId;
str('story.title', bp.title || id);
const rewardLabelKey = 'reward.' + id;
str(rewardLabelKey, (bp.reward && bp.reward.label) || id);

// ---- cast ----
const cast = [];
const guideId = bp.guide || 'pip';
cast.push({ id: guideId, name: str('cast.' + guideId + '.name', bp.guideName || cap(guideId)), role: 'guide', atlasBase: guideId, poses: bp.guidePoses || ['neutral'] });
(bp.companions || []).forEach((c) => {
  const cid = typeof c === 'string' ? c : c.id;
  cast.push({ id: cid, name: str('cast.' + cid + '.name', (typeof c === 'object' && c.name) || cap(cid)), role: 'companion', atlasBase: (typeof c === 'object' && c.atlasBase) || cid, poses: (typeof c === 'object' && c.poses) || ['neutral'] });
});

// ---- assets ----
const assets = {};
(bp.assets || []).forEach((a) => {
  const entry = { kind: a.kind, src: a.src };
  if (a.size) entry.size = a.size;
  if (a.vocab) entry.vocab = a.vocab;
  assets[a.id] = entry;
});
// ensure guide/companion atlases exist as assets (they may be declared in bp.assets already)
cast.forEach((c) => { if (!assets[c.atlasBase]) assets[c.atlasBase] = { kind: 'atlas', src: 'cast/' + c.id + '/' + c.id + '.base.json' }; });

// ---- pages ----
let sepPending = 0;
const pages = (bp.pages || []).map((pg, i) => {
  const pn = String(i + 1).padStart(2, '0');
  const cues = (pg.narration || []).map((ln, j) => {
    const cueId = ln.id || ('p' + pn + '-l' + String(j + 1).padStart(2, '0'));
    str(cueId, ln.text);
    /* characterId only when the blueprint line names a speaker — a line WITHOUT
       one is NARRATOR VOICE (no caption prefix; story-presence gate requires it).
       (Pre-2026-07-10 behavior defaulted to the guide; retired with the
       storybook ruling — dialogue must be explicit.) */
    const cue = { id: cueId };
    if (ln.characterId) cue.characterId = ln.characterId;
    if (ln.pauseAfterMs) cue.pauseAfterMs = ln.pauseAfterMs;
    return cue;
  });
  const out = {
    id: 'p' + pn,
    scene: pg.scene || { image: (bp.assets && bp.assets[0] && bp.assets[0].id) || 'scene1' },
    characters: (pg.characters || []).map((c) => ({ characterId: c.characterId || guideId, pose: c.pose || 'neutral', anchor: c.anchor || { x: 200, y: 880 }, scale: c.scale != null ? c.scale : 0.7, flip: !!c.flip })),
    narration: { gate: (pg.narration && pg.narrationGate) || 'end', cues },
    interaction: buildInteraction(pg.interaction, pn),
    success: pg.success || { celebration: 'burst', holdMs: 800 },
  };
  return out;
});

function buildInteraction(inter, pn) {
  inter = inter || {};
  const base = { moduleType: inter.moduleType, zone: inter.zone || { x: 420, y: 150, w: 760, h: 700 }, completionMode: inter.completionMode || 'check' };
  if (inter.hintKey) base.hintKey = inter.hintKey;
  if (inter.exerciseSpec) {
    // materialized later by sep-generate --from-blueprint into exercises/ex-p<NN>
    base.taskData = { package: 'exercises/ex-p' + pn };
    sepPending++;
  } else {
    base.taskData = inter.taskData || {};
  }
  return base;
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

const story = {
  schemaVersion: 'sb-1',
  id,
  title: '@story.title',
  locales: ['en'],
  theme: bp.theme || { letterboxColor: '#FBF3E4', transition: 'crossfade' },
  cast,
  assets,
  reward: { id: (bp.reward && bp.reward.id) || ('story.' + id), label: { en: strings[rewardLabelKey].en }, emoji: (bp.reward && bp.reward.emoji) || '⭐' },
  pages,
};

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(storyPath, JSON.stringify(story, null, 2));
fs.writeFileSync(stringsPath, JSON.stringify(strings, null, 2));
console.log('[blueprint-to-skeleton] wrote:');
console.log('  ' + path.relative(REPO, storyPath));
console.log('  ' + path.relative(REPO, stringsPath));
console.log('  pages: ' + pages.length + ' · strings: ' + Object.keys(strings).length + (sepPending ? ' · exerciseSpec pages pending: ' + sepPending + ' (run: node scripts/storybook/sep-generate.js --from-blueprint ' + id + ')' : ''));
console.log('  NEXT: open in the Studio to place art + coordinates, then validate + gate + qa.');
