#!/usr/bin/env node
/*
 * analyze-dev-images-vs-canonical.js
 *
 * Read-only scan that compares the dev image source
 * (frontend/public/images/) against the canonical image library
 * (image library/) and the WebP library (image-library-webp/themes/).
 *
 * Output: a categorized report so the operator can decide what to preserve
 * before the dev/canonical alignment swap.
 *
 *   - APP-ASSET themes        : exist only in dev, look like app assets
 *                               (templates, backgrounds, etc.) — preserve
 *   - CANONICAL OVERLAP themes: exist in both — would be junctioned to
 *                               canonical; lists dev-only files that
 *                               would be unreachable after the swap
 *   - JUNK themes             : zero/near-zero files, look like cruft
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const DEV = path.join(REPO, 'frontend', 'public', 'images');
const CANON = path.join(REPO, 'image library');

function listDirs(p) {
    if (!fs.existsSync(p)) return [];
    return fs.readdirSync(p, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name);
}
function listFiles(p) {
    if (!fs.existsSync(p)) return [];
    return fs.readdirSync(p, { withFileTypes: true })
        .filter(e => e.isFile())
        .map(e => e.name);
}
function caseInsensitiveSet(arr) {
    return new Set(arr.map(s => s.toLowerCase()));
}

const devThemes = listDirs(DEV);
const canonThemes = listDirs(CANON);
const canonSet = caseInsensitiveSet(canonThemes);

const buckets = { overlap: [], appAsset: [], junk: [] };

for (const theme of devThemes) {
    const devPath = path.join(DEV, theme);
    const devFiles = listFiles(devPath);
    const imgFiles = devFiles.filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f));
    const subDirs = listDirs(devPath);

    if (imgFiles.length === 0 && subDirs.length === 0) {
        buckets.junk.push({ theme, reason: 'empty' });
        continue;
    }
    if (imgFiles.length <= 2 && subDirs.length === 0 && /^(tmp|new|ali|library|object|general|alphabetsvg|template)$/i.test(theme)) {
        buckets.junk.push({ theme, reason: 'looks like cruft (' + imgFiles.length + ' files)' });
        continue;
    }
    // Try case-insensitive match against canonical
    const canonMatch = canonThemes.find(t => t.toLowerCase() === theme.toLowerCase());
    if (!canonMatch) {
        buckets.appAsset.push({ theme, files: imgFiles.length, subDirs: subDirs });
        continue;
    }
    // Overlap — compute the dev-only files
    const canonFiles = caseInsensitiveSet(listFiles(path.join(CANON, canonMatch)));
    const devOnly = imgFiles.filter(f => !canonFiles.has(f.toLowerCase()));
    buckets.overlap.push({
        theme,
        canonMatch,
        devCount: imgFiles.length,
        canonCount: canonFiles.size,
        devOnly,
        subDirs
    });
}

console.log('=== APP-ASSET themes (only in dev — preserve as-is) ===');
buckets.appAsset.forEach(t => {
    console.log('  ' + t.theme + '  (' + t.files + ' files' + (t.subDirs.length ? ', subdirs: ' + t.subDirs.join(',') : '') + ')');
});

console.log('\n=== JUNK themes (suggest discard) ===');
buckets.junk.forEach(t => console.log('  ' + t.theme + '  (' + t.reason + ')'));

console.log('\n=== CANONICAL OVERLAP themes (junction-swap candidates) ===');
console.log('Per-theme: dev-only files that would become unreachable after junction.');
let totalDevOnlyFiles = 0;
buckets.overlap.forEach(t => {
    console.log('  ' + t.theme + ' (dev:' + t.devCount + ' canon:' + t.canonCount + ', dev-only:' + t.devOnly.length + ')');
    if (t.devOnly.length > 0) {
        t.devOnly.slice(0, 5).forEach(f => console.log('    - ' + f));
        if (t.devOnly.length > 5) console.log('    ... and ' + (t.devOnly.length - 5) + ' more');
        totalDevOnlyFiles += t.devOnly.length;
    }
    if (t.subDirs.length > 0) {
        console.log('    SUBDIRS that would be lost: ' + t.subDirs.join(', '));
    }
});

console.log('\n=== Summary ===');
console.log('  app-asset themes (preserve):   ' + buckets.appAsset.length);
console.log('  canonical-overlap themes:      ' + buckets.overlap.length);
console.log('  junk themes (suggest discard): ' + buckets.junk.length);
console.log('  total dev-only files at risk:  ' + totalDevOnlyFiles);
