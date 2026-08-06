#!/usr/bin/env node
/**
 * build-targeted-rename.js
 *
 * For each broken image reference, finds the matching un-renamed file on the
 * server and creates a targeted rename map.
 *
 * Logic: if config expects "additionsspa-4.webp" but server has "Additionsspa 4.webp",
 * we normalize "Additionsspa 4.webp" → "additionsspa-4.webp" and confirm the match.
 *
 * Usage: node scripts/build-targeted-rename.js
 */

const fs = require('fs');
const path = require('path');

const INVENTORY_FILE = path.join(__dirname, 'server-file-inventory.txt');
const BROKEN_FILE = path.join(__dirname, 'broken-image-refs.json');
const SAMPLES_PREFIX = '/var/www/lcs-media/samples/';

function normalizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/\((\d+)\)/g, '$1')
    .replace(/[()]/g, '')
    .replace(/-+/g, '-')
    .replace(/-\./g, '.')
    .replace(/\.-/g, '.')
    .trim();
}

function main() {
  // Load server inventory grouped by directory
  const lines = fs.readFileSync(INVENTORY_FILE, 'utf-8')
    .split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Build directory → filename[] map
  const dirFiles = {};
  for (const line of lines) {
    const rel = line.startsWith(SAMPLES_PREFIX) ? line.slice(SAMPLES_PREFIX.length) : line;
    const lastSlash = rel.lastIndexOf('/');
    const dir = rel.substring(0, lastSlash);
    const filename = rel.substring(lastSlash + 1);
    if (!dirFiles[dir]) dirFiles[dir] = [];
    dirFiles[dir].push(filename);
  }

  // Load broken refs
  const broken = JSON.parse(fs.readFileSync(BROKEN_FILE, 'utf-8'));
  console.log(`${broken.length} broken references to resolve\n`);

  const renameMap = {}; // old server path → new server path
  const unresolved = [];
  const alreadyMapped = new Set(); // track which server files we've mapped

  for (const ref of broken) {
    const parts = ref.serverPath.split('/');
    const expectedFilename = parts.pop();
    const dir = parts.join('/');

    const filesInDir = dirFiles[dir] || [];

    // Find a file in the same directory that normalizes to the expected filename
    let matched = false;
    for (const serverFile of filesInDir) {
      const normalized = normalizeFilename(serverFile);
      if (normalized === expectedFilename && serverFile !== expectedFilename) {
        const oldPath = `${dir}/${serverFile}`;
        const newPath = `${dir}/${expectedFilename}`;
        if (!alreadyMapped.has(oldPath)) {
          renameMap[oldPath] = newPath;
          alreadyMapped.add(oldPath);
        }
        matched = true;
        break;
      }
    }

    if (!matched) {
      unresolved.push({
        ...ref,
        availableFiles: filesInDir
      });
    }
  }

  // Deduplicate rename map (multiple config refs may point to same file)
  const uniqueRenames = Object.keys(renameMap).length;

  console.log(`=== RESULTS ===`);
  console.log(`  Matched renames:  ${uniqueRenames}`);
  console.log(`  Unresolved:       ${unresolved.length}`);

  if (unresolved.length > 0) {
    console.log(`\n=== UNRESOLVED (${unresolved.length}) ===`);
    for (const u of unresolved) {
      console.log(`\n  Config expects: ${u.serverPath}`);
      console.log(`  Source: ${u.source}`);
      console.log(`  Files in folder:`);
      for (const f of u.availableFiles) {
        const norm = normalizeFilename(f);
        console.log(`    "${f}" → normalizes to "${norm}"`);
      }
    }
  }

  // Write the rename map
  const outputFile = path.join(__dirname, 'targeted-rename-map.json');
  fs.writeFileSync(outputFile, JSON.stringify(renameMap, null, 2));
  console.log(`\nRename map saved to: ${outputFile}`);

  // Also generate the shell script for server execution
  const shellScript = generateShellScript(renameMap);
  const shellFile = path.join(__dirname, 'complete-server-rename.sh');
  fs.writeFileSync(shellFile, shellScript);
  console.log(`Shell script saved to: ${shellFile}`);
}

function generateShellScript(renameMap) {
  const lines = [
    '#!/bin/bash',
    '# complete-server-rename.sh',
    '# Completes the partial rename of sample images on the production server.',
    '# Generated from actual server inventory — NO guesses.',
    '#',
    '# Usage:',
    '#   bash /tmp/complete-server-rename.sh --dry-run   # Preview (default)',
    '#   bash /tmp/complete-server-rename.sh --apply      # Execute renames',
    '',
    'MODE="${1:---dry-run}"',
    'SAMPLES="/var/www/lcs-media/samples"',
    'LOG="/tmp/rename-$(date +%Y%m%d-%H%M%S).log"',
    'ROLLBACK="/tmp/rename-rollback-$(date +%Y%m%d-%H%M%S).sh"',
    '',
    'echo "=== Complete Server Rename ===" | tee "$LOG"',
    'echo "Mode: $MODE" | tee -a "$LOG"',
    '',
    'if [ "$MODE" = "--apply" ]; then',
    '  echo "#!/bin/bash" > "$ROLLBACK"',
    '  chmod +x "$ROLLBACK"',
    'fi',
    '',
    'OK=0',
    'FAIL=0',
    'SKIP=0',
    '',
  ];

  for (const [oldRel, newRel] of Object.entries(renameMap)) {
    const oldPath = `$SAMPLES/${oldRel}`;
    const newPath = `$SAMPLES/${newRel}`;

    // Escape special characters for bash
    const oldEsc = oldPath.replace(/'/g, "'\\''");
    const newEsc = newPath.replace(/'/g, "'\\''");
    const dirEsc = oldPath.substring(0, oldPath.lastIndexOf('/')).replace(/'/g, "'\\''");

    lines.push(`# ${oldRel} → ${newRel}`);
    lines.push(`if [ -f '${oldEsc}' ]; then`);
    lines.push(`  if [ "$MODE" = "--apply" ]; then`);
    lines.push(`    chattr -i '${oldEsc}' '${dirEsc}' 2>/dev/null || true`);
    lines.push(`    if mv '${oldEsc}' '${newEsc}'; then`);
    lines.push(`      chattr +i '${newEsc}' 2>/dev/null || true`);
    lines.push(`      chattr +i '${dirEsc}' 2>/dev/null || true`);
    lines.push(`      chown lcs-media:lcs-media '${newEsc}' 2>/dev/null || true`);
    lines.push(`      echo "  OK: ${oldRel} -> ${newRel}" | tee -a "$LOG"`);
    lines.push(`      echo "chattr -i '${newEsc}' '${dirEsc}' 2>/dev/null; mv '${newEsc}' '${oldEsc}'; chattr +i '${oldEsc}' '${dirEsc}' 2>/dev/null" >> "$ROLLBACK"`);
    lines.push(`      OK=$((OK + 1))`);
    lines.push(`    else`);
    lines.push(`      echo "  FAIL: ${oldRel}" | tee -a "$LOG"`);
    lines.push(`      chattr +i '${oldEsc}' '${dirEsc}' 2>/dev/null || true`);
    lines.push(`      FAIL=$((FAIL + 1))`);
    lines.push(`    fi`);
    lines.push(`  else`);
    lines.push(`    echo "  WOULD: ${oldRel} -> ${newRel}" | tee -a "$LOG"`);
    lines.push(`    OK=$((OK + 1))`);
    lines.push(`  fi`);
    lines.push(`elif [ -f '${newEsc}' ]; then`);
    lines.push(`  SKIP=$((SKIP + 1))`);
    lines.push(`else`);
    lines.push(`  echo "  MISSING: ${oldRel}" | tee -a "$LOG"`);
    lines.push(`  FAIL=$((FAIL + 1))`);
    lines.push(`fi`);
    lines.push('');
  }

  lines.push('echo "" | tee -a "$LOG"');
  lines.push('echo "=== Summary ===" | tee -a "$LOG"');
  lines.push('echo "  Renamed: $OK" | tee -a "$LOG"');
  lines.push('echo "  Skipped: $SKIP" | tee -a "$LOG"');
  lines.push('echo "  Failed:  $FAIL" | tee -a "$LOG"');
  lines.push('echo "  Log: $LOG" | tee -a "$LOG"');
  lines.push('if [ "$MODE" = "--apply" ]; then');
  lines.push('  echo "  Rollback: $ROLLBACK" | tee -a "$LOG"');
  lines.push('fi');

  return lines.join('\n');
}

main();
