#!/usr/bin/env node
/*
 * swap-dev-images-to-canonical.js
 *
 * Aligns the dev /api/images source (frontend/public/images/) with the
 * canonical image library (image library/) so the WebP-overlay lookup
 * actually resolves in dev.
 *
 *   1. Renames frontend/public/images/ → frontend/public/images.dev-backup/
 *   2. Creates a fresh frontend/public/images/
 *   3. For each theme:
 *      - Canonical-overlap themes (animals, backgrounds, borders, furniture,
 *        Miscellaneous) → junction to canonical
 *      - App-asset themes (prepositions, worksheet_templates, alphabet, ...)
 *        → junction to the backup so apps keep working
 *      - Junk themes (4th_of_july, ali) → skip (don't recreate)
 *
 * Junctions are local-only Windows directory junctions. No data is moved
 * (other than the parent dir rename in step 1, which is a single rename op).
 *
 * Idempotent: if frontend/public/images.dev-backup/ already exists, the
 * script aborts with a clear message and no changes.
 *
 * Reversible: to undo, delete frontend/public/images/ (which is now just
 * junctions, no real data) and rename images.dev-backup/ back.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..');
const DEV   = path.join(REPO, 'frontend', 'public', 'images');
const BACKUP = path.join(REPO, 'frontend', 'public', 'images.dev-backup');
const CANON = path.join(REPO, 'image library');

const CANONICAL_OVERLAP = {
    'animals':       'animals',
    'backgrounds':   'BACKGROUNDS',
    'borders':       'BORDERS',
    'furniture':     'furniture',
    'Miscellaneous': 'miscellaneous',
};

const JUNK = new Set(['4th_of_july', 'ali']);

function junction(linkPath, target) {
    // Use cmd.exe directly — Windows directory junction, no admin required.
    execSync('cmd /c mklink /J "' + linkPath + '" "' + target + '"', { stdio: 'ignore' });
}

function main() {
    if (!fs.existsSync(DEV)) {
        console.error('FATAL: ' + DEV + ' does not exist; nothing to swap');
        process.exit(2);
    }
    if (fs.existsSync(BACKUP)) {
        console.error('FATAL: ' + BACKUP + ' already exists. Refusing to overwrite.');
        console.error('       To re-run, remove the existing backup first.');
        process.exit(3);
    }
    if (!fs.existsSync(CANON)) {
        console.error('FATAL: canonical library ' + CANON + ' not found');
        process.exit(2);
    }

    console.log('Step 1: rename ' + path.basename(DEV) + ' → ' + path.basename(BACKUP));
    fs.renameSync(DEV, BACKUP);
    console.log('  done\n');

    console.log('Step 2: create fresh ' + path.basename(DEV));
    fs.mkdirSync(DEV, { recursive: true });
    console.log('  done\n');

    const backupThemes = fs.readdirSync(BACKUP, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name);

    let canonJunctions = 0;
    let appAssetJunctions = 0;
    let skipped = 0;
    let errors = 0;

    console.log('Step 3a: junction canonical-overlap themes → image library/');
    for (const [devName, canonName] of Object.entries(CANONICAL_OVERLAP)) {
        const target = path.join(CANON, canonName);
        if (!fs.existsSync(target)) {
            console.warn('  SKIP ' + devName + ' — canonical "' + canonName + '" not found');
            errors++;
            continue;
        }
        const linkPath = path.join(DEV, devName);
        try {
            junction(linkPath, target);
            console.log('  ' + devName + '  →  image library/' + canonName);
            canonJunctions++;
        } catch (e) {
            console.error('  FAIL ' + devName + ': ' + e.message);
            errors++;
        }
    }

    console.log('\nStep 3b: junction app-asset themes → images.dev-backup/');
    for (const theme of backupThemes) {
        if (CANONICAL_OVERLAP[theme]) continue;
        if (JUNK.has(theme)) {
            console.log('  SKIP ' + theme + ' (junk — not recreating)');
            skipped++;
            continue;
        }
        const target = path.join(BACKUP, theme);
        const linkPath = path.join(DEV, theme);
        try {
            junction(linkPath, target);
            console.log('  ' + theme + '  →  images.dev-backup/' + theme);
            appAssetJunctions++;
        } catch (e) {
            console.error('  FAIL ' + theme + ': ' + e.message);
            errors++;
        }
    }

    console.log('\n=== Summary ===');
    console.log('  canonical-overlap junctions: ' + canonJunctions);
    console.log('  app-asset junctions:         ' + appAssetJunctions);
    console.log('  junk themes skipped:         ' + skipped);
    console.log('  errors:                      ' + errors);
    console.log('\nBackup retained at: ' + BACKUP);
    console.log('To roll back: rm -r "' + DEV + '" && mv "' + BACKUP + '" "' + DEV + '"');
    process.exit(errors > 0 ? 1 : 0);
}

main();
