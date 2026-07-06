#!/usr/bin/env node
/* =====================================================================
   build-library-manifest.js — the Story Studio global-library generator
   (thin CLI over scripts/storybook/lib/library-core.js — the SAME engine
   the admin library-manager routes use, so contract enforcement can
   never drift between the CLI and the manager).

   Validates the platform CHARACTER + BACKGROUND libraries under
   "mini tools/storybook-library/" against the atlas/scene contracts,
   generates thumbnails (character card.webp from the pose_neutral frame;
   background thumbs at 320×200), and writes:

     mini tools/storybook-library/manifest.json        (characters + backgrounds)
     mini tools/storybook-library/props-manifest.json  (image-library themes)

   FAILS (exit 1) on any contract violation — a broken atlas must never
   reach the manifest. Operator flow: drop art (pack-atlas.js for
   characters) → node scripts/storybook/build-library-manifest.js →
   commit → cp to /var/www/lcs-media/mini-tools/ → deploy (§20.4 order).
   (The LIVE library manager writes to the served tree directly and
   rebuilds tolerantly; this CLI remains the strict batch path for the
   git seed + props-manifest.)

   Character folder contract (the cast contract, verbatim §14.3-era atlas):
     characters/<id>/<id>.base.json + image  (pose_* frames; pose_neutral
       REQUIRED; frames upright — rotated:false — and ONE sourceSize)
     optional <id>.clips.json + image (+ multipack .clips-1.*)
     optional meta.json { name: {en,de,...}, tags: [] }
   Background contract: backgrounds/<id>@2x.webp at exactly 1600×1000;
     optional backgrounds/_meta.json { <id>: { name, theme } }.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { buildLibraryManifest } = require('./lib/library-core.js');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');
const LIB = path.join(MINI, 'storybook-library');

/* ---------------- props (image library) ---------------- */
function buildProps() {
  /* reuse the studio-server's index logic (exported; requiring does not
     listen). CLI-only: the admin routes never regenerate props-manifest —
     props are the worksheet image library, managed by content-manager-v2. */
  const { libraryIndex } = require('./studio-server.js');
  return libraryIndex(true);
}

(async () => {
  const res = await buildLibraryManifest(LIB, { tolerant: false, write: true });
  const props = buildProps();

  for (const w of res.warns) console.log('  WARN  ' + w);
  for (const e of res.errors) console.log('  ERROR ' + e);
  if (!res.written) {
    console.log('\n[build-library-manifest] FAILED — ' + res.errors.length + ' error(s); manifests NOT written');
    process.exit(1);
  }

  fs.writeFileSync(path.join(LIB, 'props-manifest.json'), JSON.stringify(props, null, 2) + '\n');
  console.log('[build-library-manifest] OK — ' + res.manifest.characters.length + ' character(s), ' +
    res.manifest.backgrounds.length + ' background(s), ' + props.themes.length + ' prop theme(s); ' + res.warns.length + ' warning(s)');
})().catch(e => { console.error('[build-library-manifest] crashed: ' + (e.stack || e)); process.exit(1); });
