#!/usr/bin/env node
/* =====================================================================
   build-sprites.js — CA5 frame sequences -> packed sprite-sheet
   ---------------------------------------------------------------------
   Premium games asset pipeline (CLAUDE.md AMENDMENT 2026-06-19, rule 3:
   "CC builds the sprite-sheets from the operator's CA5 image sequences,
   proven sharp pipeline"). Reuses the sharp composite pattern from
   scripts/publish-cli/og-image.js (sharp({create}).composite([{input,
   top,left}]).webp()). Greenfield CSS-keyframe sprite animation — no game
   loop (operator-locked "simple / low animation").

   INPUT: a folder of Cartoon-Animator-5 PNG frame exports named
     <pose>_0001.png, <pose>_0002.png, ...   (pose = filename prefix)
   e.g.  idle_0001.png ... idle_0006.png  chomp_0001.png ... chomp_0004.png

   OUTPUT (into --out, default "mini tools/sprites/"):
     <sheet>.sheet.webp    the packed NxM sprite-sheet (transparent)
     <sheet>.frames.json   { sheetId, cellW, cellH, cols, rows, fps, url,
                             poses:{ pose:{start,count} } }  (GameAssets.register reads this)
     <sheet>.sprites.css   .spr-<sheet>, per-pose static + @keyframes anim

   USAGE:
     node scripts/games/build-sprites.js --in <ca5-frames-dir> --sheet mochi [--out "mini tools/sprites"] [--cols N] [--fps 12]

   The game swaps placeholder -> real art with ONE line in its wrapper:
     GameAssets.register('mochi', require('<sheet>.frames.json'))
   No game-logic change (same call site as the stub).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/* accepts both --key=value and --key value */
const arg = (k, d) => {
  const eq = process.argv.find(a => a.startsWith('--' + k + '='));
  if (eq) return eq.split('=').slice(1).join('=');
  const i = process.argv.indexOf('--' + k);
  if (i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) return process.argv[i + 1];
  return d;
};
const IN = arg('in', null);
const SHEET = arg('sheet', null);
const OUT = arg('out', path.join(__dirname, '..', '..', 'mini tools', 'sprites'));
const FPS = parseInt(arg('fps', '12'), 10);
const COLS_OVERRIDE = arg('cols', null) ? parseInt(arg('cols'), 10) : null;
const SERVED_BASE = arg('served-base', '/mini-tools/sprites');

if (!IN || !SHEET) {
  console.error('Usage: node scripts/games/build-sprites.js --in <ca5-frames-dir> --sheet <sheetId> [--out dir] [--cols N] [--fps 12]');
  process.exit(2);
}

function poseOf(filename) {
  // strip extension + trailing _NNNN -> pose prefix
  const base = filename.replace(/\.(png|webp)$/i, '');
  const m = base.match(/^(.*?)[_-]?(\d+)$/);
  return m ? m[1].replace(/[_-]+$/, '') : base;
}
function frameNum(filename) {
  const base = filename.replace(/\.(png|webp)$/i, '');
  const m = base.match(/(\d+)$/);
  return m ? parseInt(m[1], 10) : 0;
}

(async () => {
  const files = fs.readdirSync(IN).filter(f => /\.(png|webp)$/i.test(f));
  if (!files.length) { console.error('No PNG/WEBP frames in ' + IN); process.exit(1); }

  // group by pose, sort within pose by frame number
  const byPose = {};
  for (const f of files) { (byPose[poseOf(f)] = byPose[poseOf(f)] || []).push(f); }
  const poseNames = Object.keys(byPose).sort();
  poseNames.forEach(p => byPose[p].sort((a, b) => frameNum(a) - frameNum(b)));

  // ordered flat frame list (pose A frames, pose B frames, ...)
  const ordered = [];
  const poseRanges = {};
  for (const p of poseNames) {
    poseRanges[p] = { start: ordered.length, count: byPose[p].length };
    for (const f of byPose[p]) ordered.push(path.join(IN, f));
  }

  // STEP 1 — trim each frame to content, find union max cell size
  const trimmed = [];
  let cellW = 0, cellH = 0;
  for (const fp of ordered) {
    const buf = await sharp(fp).trim().toBuffer({ resolveWithObject: true }).catch(async () => {
      // some frames may be fully uniform; fall back to untrimmed
      const b = await sharp(fp).toBuffer({ resolveWithObject: true });
      return b;
    });
    trimmed.push(buf);
    cellW = Math.max(cellW, buf.info.width);
    cellH = Math.max(cellH, buf.info.height);
  }
  // even dimensions (nicer for half-pixel scaling)
  cellW += cellW % 2; cellH += cellH % 2;

  // STEP 2 — re-pad each trimmed frame, centered, onto a uniform transparent cell
  const cells = [];
  for (const t of trimmed) {
    const left = Math.floor((cellW - t.info.width) / 2);
    const top = Math.floor((cellH - t.info.height) / 2);
    const cell = await sharp({ create: { width: cellW, height: cellH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: t.data, top: top, left: left }])
      .png().toBuffer();
    cells.push(cell);
  }

  // STEP 3 — pack into an NxM grid (the og-image.js composite pattern)
  const total = cells.length;
  const cols = COLS_OVERRIDE || Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  const composites = cells.map((data, i) => ({
    input: data,
    top: Math.floor(i / cols) * cellH,
    left: (i % cols) * cellW
  }));
  const sheetBuf = await sharp({ create: { width: cols * cellW, height: rows * cellH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(composites)
    .webp({ quality: 85, alphaQuality: 100, effort: 5 })
    .toBuffer();

  fs.mkdirSync(OUT, { recursive: true });
  const sheetPath = path.join(OUT, SHEET + '.sheet.webp');
  fs.writeFileSync(sheetPath, sheetBuf);
  const meta = await sharp(sheetPath).metadata();   // defensive verify (og-image.js pattern)

  // STEP 4 — frames.json (GameAssets.register / asset tooling reads this).
  // url stays the served absolute path (informational; the live swap uses
  // the co-located .sprites.css below, which works on file:// + server + prod).
  const url = SERVED_BASE.replace(/\/$/, '') + '/' + SHEET + '.sheet.webp';
  const framesJson = { sheetId: SHEET, cellW, cellH, cols, rows, fps: FPS, url, poses: poseRanges };
  fs.writeFileSync(path.join(OUT, SHEET + '.frames.json'), JSON.stringify(framesJson, null, 2));

  // STEP 5 — generated CSS: base + per-pose static position + per-pose @keyframes.
  // The webp url is a CO-LOCATED RELATIVE filename (the .sprites.css and
  // .sheet.webp sit together in mini tools/sprites/), so it resolves
  // relative to the CSS file identically on file://, the dev server, and
  // production — no absolute-path assumption.
  const sheetW = cols * cellW, sheetH = rows * cellH;
  let css = '/* generated by build-sprites.js — do not edit by hand */\n';
  css += '.spr-' + SHEET + '{width:' + cellW + 'px;height:' + cellH + 'px;'
       + 'background:url(' + SHEET + '.sheet.webp) no-repeat;background-size:' + sheetW + 'px ' + sheetH + 'px;}\n';
  for (const p of poseNames) {
    const r = poseRanges[p];
    const c0 = r.start % cols, r0 = Math.floor(r.start / cols);
    // static: show first frame of the pose
    css += '.spr-' + SHEET + '-' + p + '{background-position:' + (-c0 * cellW) + 'px ' + (-r0 * cellH) + 'px;}\n';
    // animated: step through the pose's frames
    if (r.count > 1) {
      const dur = (r.count / FPS).toFixed(2);
      css += '@keyframes spr-' + SHEET + '-' + p + '-anim{\n';
      for (let i = 0; i < r.count; i++) {
        const idx = r.start + i;
        const cc = idx % cols, rr = Math.floor(idx / cols);
        const pct = (i / (r.count - 1) * 100).toFixed(2);
        css += '  ' + pct + '%{background-position:' + (-cc * cellW) + 'px ' + (-rr * cellH) + 'px;}\n';
      }
      css += '}\n';
      css += '.spr-' + SHEET + '-' + p + '.play{animation:spr-' + SHEET + '-' + p + '-anim ' + dur + 's steps(' + r.count + ') 1;}\n';
    }
  }
  fs.writeFileSync(path.join(OUT, SHEET + '.sprites.css'), css);

  // STEP 6 — self-registering loader. The harness / a deployed wrapper just
  // includes <script src="sprites/<sheet>.register.js"> for each declared
  // sheet; if the file exists (art was built) it registers the real frames
  // and injects the co-located CSS, swapping stub -> art with NO per-game
  // edit. The CSS href is relative to the DOCUMENT (the .html under
  // mini tools/), so it resolves on file://, the dev server, and prod.
  const regJs =
    '/* generated by build-sprites.js — self-registering sprite loader for "' + SHEET + '" */\n' +
    '(function(){\n' +
    '  if (!window.GameAssets || !window.GameAssets.register) return;\n' +
    '  window.GameAssets.register(' + JSON.stringify(SHEET) + ', ' + JSON.stringify(framesJson) + ');\n' +
    '  if (!document.getElementById("spr-css-' + SHEET + '")) {\n' +
    '    var l = document.createElement("link"); l.id = "spr-css-' + SHEET + '";\n' +
    '    l.rel = "stylesheet"; l.href = "sprites/' + SHEET + '.sprites.css";\n' +
    '    document.head.appendChild(l);\n' +
    '  }\n' +
    '})();\n';
  fs.writeFileSync(path.join(OUT, SHEET + '.register.js'), regJs);

  console.log('Built ' + SHEET + ': ' + total + ' frames, ' + cols + 'x' + rows + ' grid, cell ' + cellW + 'x' + cellH
    + ', sheet ' + meta.width + 'x' + meta.height + ' (' + (sheetBuf.length / 1024).toFixed(1) + ' KB)');
  console.log('  poses: ' + poseNames.map(p => p + '×' + poseRanges[p].count).join(', '));
  console.log('  -> ' + sheetPath);
  console.log('  -> ' + path.join(OUT, SHEET + '.frames.json'));
  console.log('  -> ' + path.join(OUT, SHEET + '.sprites.css'));
  console.log('  -> ' + path.join(OUT, SHEET + '.register.js'));
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
