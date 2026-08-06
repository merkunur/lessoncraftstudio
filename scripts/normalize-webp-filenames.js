#!/usr/bin/env node
/*
 * normalize-webp-filenames.js
 *
 * One-off (idempotent) pass over the converted WebP library at
 * `image-library-webp/themes/`. Renames each <stem>@<n>x.webp file so that
 * <stem> matches LCSImageRef.normalizeKey — i.e., spaces become underscores,
 * non-ASCII characters are transliterated, and runs of underscores collapse.
 *
 * Why: the converter (scripts/convert-png-to-webp.js) only lowercased
 * filenames; it did not apply the canonical normalization rules. The
 * deck-side lookup function uses normalizeKey, so on-disk filenames must
 * match its output. Without this pass, a vocabulary key like "Teddy Bear"
 * would normalize to "teddy_bear" but the file on disk would be
 * "teddy bear@1x.webp" — lookup miss.
 *
 * Behavior:
 *   - Walks image-library-webp/themes/ recursively
 *   - For each *.webp, computes the canonical name via LCSImageRef.normalizeKey
 *   - Renames if it differs (atomic fs.renameSync)
 *   - Aborts cleanly with a clear error on collision (two files normalizing
 *     to the same target name) — flags the underlying vocabulary issue
 *   - Idempotent: a second run is a no-op
 *
 * Usage: node scripts/normalize-webp-filenames.js [--dry-run]
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const WEBP_ROOT = path.join(REPO_ROOT, 'image-library-webp', 'themes');

let LCSImageRef;
try {
    LCSImageRef = require(path.join(REPO_ROOT, 'frontend', 'public', 'worksheet-generators', 'js', 'image-reference.js'));
} catch (err) {
    console.error('FATAL: cannot load image-reference.js');
    console.error(err.message);
    process.exit(2);
}

const DRY_RUN = process.argv.includes('--dry-run');

function* walkWebp(root) {
    if (!fs.existsSync(root)) return;
    const entries = fs.readdirSync(root, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(root, e.name);
        if (e.isDirectory()) {
            yield* walkWebp(full);
        } else if (e.isFile() && /\.webp$/i.test(e.name)) {
            yield full;
        }
    }
}

function targetFilename(currentBasename) {
    // currentBasename example: "teddy bear@2x.webp"
    const m = currentBasename.match(/^(.*?)@([123])x\.webp$/i);
    if (!m) return null; // not a managed variant filename, leave alone
    const stem = m[1];
    const variant = m[2].toLowerCase();
    const normalized = LCSImageRef.normalizeKey(stem);
    if (!normalized) {
        // Shouldn't happen for any real source; surface it so the operator can investigate.
        return { error: `normalizeKey returned empty for stem "${stem}"` };
    }
    return { name: normalized + '@' + variant + 'x.webp' };
}

function main() {
    if (!fs.existsSync(WEBP_ROOT)) {
        console.error(`FATAL: WebP library not found at ${WEBP_ROOT}`);
        console.error('Run scripts/convert-png-to-webp.js --full first.');
        process.exit(2);
    }

    console.log(`Scanning ${WEBP_ROOT}${DRY_RUN ? ' (DRY RUN — no renames)' : ''}\n`);

    const renames = [];
    const skipped = [];
    const collisions = [];
    const errors = [];

    for (const fullPath of walkWebp(WEBP_ROOT)) {
        const dir = path.dirname(fullPath);
        const base = path.basename(fullPath);
        const t = targetFilename(base);
        if (!t) { skipped.push(fullPath); continue; }
        if (t.error) { errors.push({ path: fullPath, error: t.error }); continue; }
        if (t.name === base) continue; // already canonical
        const target = path.join(dir, t.name);
        if (fs.existsSync(target)) {
            collisions.push({ from: fullPath, to: target });
            continue;
        }
        renames.push({ from: fullPath, to: target });
    }

    if (errors.length > 0) {
        console.error(`\nERROR: ${errors.length} file(s) produced empty normalized keys:`);
        for (const e of errors) console.error(`  ${path.relative(REPO_ROOT, e.path)}: ${e.error}`);
        process.exit(3);
    }

    if (collisions.length > 0) {
        console.error(`\nERROR: ${collisions.length} rename collision(s) — two source files normalize to the same target.`);
        console.error('No renames performed. Resolve in source PNG library before re-running:');
        for (const c of collisions) {
            console.error(`  FROM: ${path.relative(REPO_ROOT, c.from)}`);
            console.error(`  TO:   ${path.relative(REPO_ROOT, c.to)} (already exists)`);
        }
        process.exit(4);
    }

    if (renames.length === 0) {
        console.log(`No renames needed — every WebP filename already matches normalizeKey.`);
        console.log(`(Scanned ${skipped.length} non-managed file(s) and counted them as skipped.)`);
        return;
    }

    console.log(`${renames.length} file(s) need renaming:\n`);
    // Print the first 20 to give the operator a visual sample.
    for (const r of renames.slice(0, 20)) {
        console.log(`  ${path.relative(REPO_ROOT, r.from).replace(/\\/g, '/')}\n    → ${path.basename(r.to)}`);
    }
    if (renames.length > 20) console.log(`  ... and ${renames.length - 20} more.\n`);

    if (DRY_RUN) {
        console.log(`\nDRY RUN — no files renamed. Re-run without --dry-run to apply.`);
        return;
    }

    let done = 0;
    for (const r of renames) {
        fs.renameSync(r.from, r.to);
        done++;
    }
    console.log(`\nRenamed ${done} file(s). Skipped ${skipped.length} non-managed file(s).`);
}

main();
