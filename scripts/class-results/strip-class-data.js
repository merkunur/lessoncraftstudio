#!/usr/bin/env node
/**
 * No database copy older than 35 days holds class data (Daily Teaching System, Part 9.4).
 *
 * A teacher who deletes a class, a child or a result must be able to rely on it being gone. The server keeps its
 * daily database dumps 7 days; the PC keeps the first dump of every month for good (scripts/ops/pull-deck-backup.sh).
 * This script takes the rows of the four class tables out of every db_YYYYMMDD.sql.gz in a folder that is older
 * than 28 days. It runs once a week (the PC's backup pull), so the oldest copy that can still hold class data is
 * 28 + 7 = 35 days old: the promise the privacy texts make. The tables themselves stay in the dump (a restore still works); everything else is copied through
 * byte for byte.
 *
 *   node scripts/class-results/strip-class-data.js <folder> [--days=28] [--dry-run]
 *   node scripts/class-results/strip-class-data.js <folder> --all      every dump in the folder, whatever its age
 *
 * --all is what the SERVER runs on the copy it hands to the PC (scripts/ops/pull-deck-backup.sh): class rows never
 * leave the server (legal decision of 2026-11-14, condition E8). The server's own dumps keep them for the seven days
 * they live. ("--days=0" does not mean "all": a dump of today has age 0 and is skipped, and 0 used to fall back to 28.)
 *
 * A stripped file gets a marker beside it (<file>.noclass) so it is read once, not every week. The rewrite goes to
 * a temporary file that is read back in full (gzip check + the same number of other lines) before it replaces the
 * original; on any doubt the original is left untouched and the script exits 1.
 *
 * Called at the end of pull-deck-backup.sh. Prints counts only.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const readline = require('readline');

const TABLES = ['class_rooms', 'class_seats', 'class_assignments', 'class_attempts'];
/** weekly run + 28 days = no copy older than 35 days holds class data (legal/FACTS.md) */
const DEFAULT_DAYS = 28;
/* every data block of a plain pg_dump: COPY <table> (<columns>) FROM stdin; … rows … \. — ALL blocks are tracked, so a
   row of some other table that happens to begin with the text "COPY public.class_seats (" is never read as a header */
const COPY_RE = /^COPY (?:[A-Za-z0-9_]+\.)?"?([A-Za-z0-9_]+)"? \(.*\) FROM stdin;$/;

/** read a .sql.gz line by line; onLine(line) → false to drop the line */
function pass(src, dest, keep) {
  return new Promise((resolve, reject) => {
    const stats = { lines: 0, kept: 0, dropped: 0, tables: {} };
    const input = fs.createReadStream(src).pipe(zlib.createGunzip());
    const gz = dest ? zlib.createGzip({ level: 6 }) : null;
    const out = dest ? fs.createWriteStream(dest) : null;
    if (gz) gz.pipe(out);
    let inside = null;
    const rl = readline.createInterface({ input, crlfDelay: Infinity });
    input.on('error', reject);
    if (out) out.on('error', reject);
    rl.on('line', (line) => {
      stats.lines++;
      let drop = false;
      if (inside) {
        if (line === '\\.') inside = null;
        else if (TABLES.includes(inside)) { drop = keep ? !keep(inside) : false; stats.tables[inside]++; }
      } else {
        const m = COPY_RE.exec(line);
        if (m) { inside = m[1]; if (TABLES.includes(inside) && !(inside in stats.tables)) stats.tables[inside] = 0; }
      }
      if (drop) { stats.dropped++; return; }
      stats.kept++;
      if (gz) { if (!gz.write(line + '\n')) { rl.pause(); gz.once('drain', () => rl.resume()); } }
    });
    rl.on('close', () => { if (!gz) return resolve(stats); gz.end(); out.on('finish', () => resolve(stats)); });
  });
}

/** strip one dump; returns { rows } removed, or { skipped } */
async function stripFile(file, dry) {
  const before = await pass(file, null, null);
  const rows = Object.values(before.tables).reduce((a, b) => a + b, 0);
  if (!rows) return { rows: 0, tables: Object.keys(before.tables).length };
  if (dry) return { rows, tables: Object.keys(before.tables).length, dry: true };
  const tmp = file + '.strip-tmp';
  const done = await pass(file, tmp, () => false);
  const after = await pass(tmp, null, null); // read back in full: it is a valid gzip and holds what it should
  const left = Object.values(after.tables).reduce((a, b) => a + b, 0);
  if (left !== 0 || after.lines !== before.lines - rows || done.dropped !== rows || Object.keys(after.tables).length !== Object.keys(before.tables).length) {
    fs.rmSync(tmp, { force: true });
    throw new Error(path.basename(file) + ': the rewritten copy does not check out (rows left ' + left + ', lines ' + after.lines + ' vs ' + (before.lines - rows) + '); the original is untouched');
  }
  const stat = fs.statSync(file);
  fs.renameSync(tmp, file);
  try { fs.utimesSync(file, stat.atime, stat.mtime); } catch (e) { /* the date stays in the name */ }
  return { rows, tables: Object.keys(before.tables).length };
}

async function main(dir, days, dry, now) {
  const files = fs.readdirSync(dir).filter((f) => /^db_\d{8}\.sql\.gz$/.test(f)).sort();
  let read = 0, rows = 0;
  for (const f of files) {
    const d = f.slice(3, 11);
    const age = (now.getTime() - Date.UTC(+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8))) / (24 * 3600 * 1000);
    if (days !== -Infinity && age <= days) continue;
    const full = path.join(dir, f), marker = full + '.noclass';
    if (fs.existsSync(marker)) continue;
    const r = await stripFile(full, dry);
    read++; rows += r.rows;
    if (!dry) fs.writeFileSync(marker, 'class rows removed ' + now.toISOString().slice(0, 10) + ': ' + r.rows + '\n');
    console.log('class data: ' + f + ' — ' + r.rows + ' class row(s) ' + (dry ? 'would be removed' : 'removed') + (r.tables ? '' : ' (the dump has no class tables)'));
  }
  // a marker whose dump is gone is litter
  for (const m of fs.readdirSync(dir).filter((f) => f.endsWith('.sql.gz.noclass'))) if (!fs.existsSync(path.join(dir, m.replace(/\.noclass$/, '')))) fs.rmSync(path.join(dir, m), { force: true });
  console.log('class data: ' + read + ' dump(s) ' + (days === -Infinity ? 'of any age' : 'older than ' + days + ' days') + ' read, ' + rows + ' class row(s) ' + (dry ? 'found' : 'removed'));
  return { read, rows };
}

if (require.main === module) {
  const dir = process.argv[2];
  const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
  if (!dir || !fs.existsSync(dir)) { console.error('usage: strip-class-data.js <folder with db_YYYYMMDD.sql.gz> [--days=28] [--dry-run]'); process.exit(2); }
  const d = arg('days');
  if (d !== null && !(Number.isFinite(Number(d)) && Number(d) >= 1)) { console.error('--days takes a whole number of days from 1; use --all for every dump'); process.exit(2); }
  main(dir, process.argv.includes('--all') ? -Infinity : d !== null ? Number(d) : DEFAULT_DAYS, process.argv.includes('--dry-run'), new Date()).catch((e) => { console.error('class data FAILED: ' + e.message); process.exit(1); });
}
module.exports = { main, stripFile, pass, TABLES, DEFAULT_DAYS };
