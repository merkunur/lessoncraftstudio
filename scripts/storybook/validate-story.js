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

   All check logic lives in lib/validate-core.js (validateStoryCore) so the
   Next.js Story Studio API route can run the SAME validator on tenant
   stories. This file is the thin CLI: arg parsing, file loading, band
   resolution, manifest.json emission, and the "  WARN/ERROR" output that
   studio-server.js regex-parses.

   USAGE:  node scripts/storybook/validate-story.js <storyId | path>
           [--strict-audio]     (missing narration mp3s become errors)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { validateStoryCore } = require('./lib/validate-core.js');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');

/* ============================ main ============================ */
const target = process.argv[2];
if (!target) { console.error('Usage: validate-story.js <storyId|path> [--strict-audio]'); process.exit(1); }
const strictAudio = process.argv.includes('--strict-audio');
/* grade-band tolerance profile: story.alignment.grade (or --grade=PK override) → SB_BANDS[grade].
   Threaded into each module's validateTask via v.band so PK modules can enforce band.fatal.* minimums.
   No grade → band=null → K-3 and legacy modules unaffected (backward-compatible). */
const gradeArg = (process.argv.find(a => a.startsWith('--grade=')) || '').split('=')[1] || null;
let SB_BANDS = {}; try { SB_BANDS = require(path.join(MINI, 'sb-bands.js')); } catch (e) { /* pre-band repos: no bands */ }
const storyDir = fs.existsSync(target) ? target : path.join(MINI, 'stories', target);
const storyPath = path.join(storyDir, 'story.json');
const stringsPath = path.join(storyDir, 'strings.json');

if (!fs.existsSync(storyPath)) { console.error('story.json not found at ' + storyDir); process.exit(1); }

let story, strings;
try { story = JSON.parse(fs.readFileSync(storyPath, 'utf8')); } catch (e) { console.error('story.json parse: ' + e.message); process.exit(1); }
const _grade = gradeArg || (story.alignment && story.alignment.grade) || null;
const band = (_grade && SB_BANDS[_grade]) ? SB_BANDS[_grade] : null;
try { strings = JSON.parse(fs.readFileSync(stringsPath, 'utf8')); } catch (e) { console.error('strings.json parse: ' + e.message); process.exit(1); }

/* ---- run the core (async image checks awaited inside), then finish ---- */
(async () => {
  const { errors, warns } = await validateStoryCore({
    story, strings, storyDir,
    miniDir: MINI, repoDir: REPO,
    band, strictAudio
  });

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
