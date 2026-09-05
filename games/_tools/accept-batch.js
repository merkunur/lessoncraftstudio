#!/usr/bin/env node
/* accept-batch.js — the designer's per-batch gate.
 *
 * Usage: node _tools/accept-batch.js 011 020
 *
 * For every spec NNN in the range that exists on disk:
 *   1. runs the linter (fails the batch if any spec fails — nothing is appended to PROGRESS then)
 *   2. checks the spec's slug/band/pattern against its catalogue row (mismatch = fail)
 *   3. lists the emoji its Art registry relies on, and flags any Unicode ≥ 13 emoji without a `fallback`
 *   4. collects SUBSTITUTION: lines
 *   5. appends the PROGRESS.md line for each spec not already recorded
 *   6. prints the running subject / band / pattern balance of everything in PROGRESS.md
 * Missing specs in the range are reported (the batch is incomplete) and the batch is not accepted.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const SPECS = path.join(ROOT, "design", "specs");
const lo = parseInt(process.argv[2], 10), hi = parseInt(process.argv[3], 10);
if (!(lo >= 1 && hi >= lo)) { console.error("usage: accept-batch.js <from> <to>"); process.exit(2); }

const cat = fs.readFileSync(path.join(ROOT, "design", "catalogue", "CATALOGUE.md"), "utf8").split(/\r?\n/);
const rowOf = (n) => { const l = cat.find((x) => x.startsWith("| " + n + " |")); if (!l) return null; const c = l.split("|").map((s) => s.trim()); return { slug: c[2].replace(/`/g, ""), subject: c[4], band: c[6].replace(/`/g, ""), pattern: (c[7].match(/P\d+/) || [c[7]])[0] }; };
const progressPath = path.join(SPECS, "PROGRESS.md");
const progress = fs.existsSync(progressPath) ? fs.readFileSync(progressPath, "utf8") : "";
const recorded = new Set([...progress.matchAll(/^(\d{3}) \|/gm)].map((m) => m[1]));

// Emoji newer than Unicode 12 (i.e. Unicode 13, 2020, and later) that need a fallback (A-6).
// Unicode 12 glyphs such as 🪀 1FA80, 🪁 1FA81, 🪑 1FA91, 🪔 1FA94, 🦥 1F9A5, 🦦 1F9A6, 🦩 1F9A9 are fine without one.
function needsFallback(ch) {
  const cp = ch.codePointAt(0);
  const u13plus = new Set([0x1F6D6, 0x1F6D7, 0x1F6DC, 0x1F6DD, 0x1F6DE, 0x1F6DF, 0x1F7F0, 0x1F90C, 0x1F977, 0x1F978, 0x1F979,
    0x1F9A3, 0x1F9A4, 0x1F9AB, 0x1F9AC, 0x1F9AD]);
  return cp >= 0x1FA96 || u13plus.has(cp);
}

let ok = true, lines = [], newProgress = "", subs = [];
for (let n = lo; n <= hi; n++) {
  const num = String(n).padStart(3, "0");
  const file = fs.readdirSync(SPECS).find((f) => f.startsWith(num + "-") && f.endsWith(".md"));
  if (!file) { console.log("MISSING " + num); ok = false; continue; }
  let lint = "";
  try { lint = execSync("node \"" + path.join(ROOT, "_tools", "lint-specs.js") + "\" " + num, { cwd: ROOT, encoding: "utf8" }); }
  catch (e) { lint = (e.stdout || "") + (e.stderr || ""); ok = false; console.log(lint.trim()); continue; }
  const src = fs.readFileSync(path.join(SPECS, file), "utf8");
  const row = rowOf(num);
  const slug = (src.match(/-\s*Slug:\s*`?([a-z0-9-]+)`?/) || [])[1];
  const band = (src.match(/-\s*Age band:\s*`?(\d-\d)/) || [])[1];
  const pat = (src.match(/-\s*Interaction pattern:\s*`?(P\d+)/) || [])[1];
  const problems = [];
  if (!row) problems.push("no catalogue row");
  else {
    if (slug !== row.slug) problems.push("slug " + slug + " != catalogue " + row.slug);
    if (band !== row.band) problems.push("band " + band + " != catalogue " + row.band);
    if (pat !== row.pattern) problems.push("pattern " + pat + " != catalogue " + row.pattern);
  }
  const art = (src.split("## Art registry")[1] || "").split("## Animation registry")[0];
  const emoji = [...new Set([...art.matchAll(/\p{Extended_Pictographic}/gu)].map((m) => m[0]))];
  for (const e of emoji) {
    if (needsFallback(e)) {
      const line = art.split("\n").find((l) => l.includes(e));
      if (line && !/fallback/.test(line)) problems.push("emoji " + e + " is newer than Unicode 12 and has no fallback");
    }
  }
  const sub = (src.match(/^SUBSTITUTION:.*$/m) || [])[0];
  if (sub) subs.push(num + " " + sub);
  const warns = (lint.match(/~ /g) || []).length;
  if (problems.length) { ok = false; console.log("FAIL  " + file + "  " + problems.join("; ")); continue; }
  console.log("PASS  " + file + "  " + band + " " + pat + "  " + (emoji.join(" ") || "(no emoji)") + (warns ? "  [" + warns + " warn]" : ""));
  if (!recorded.has(num)) newProgress += num + " | " + slug + " | " + (row ? row.subject : "?") + " | " + pat + " | " + band + " | done\n";
}
if (subs.length) { console.log("\nSUBSTITUTIONS found:"); subs.forEach((s) => console.log("  " + s)); }
if (!ok) { console.log("\nBATCH NOT ACCEPTED — fix the failures above, then re-run."); process.exit(1); }
if (newProgress) fs.appendFileSync(progressPath, newProgress);
// keep PROGRESS.md in numeric order whatever order batches are accepted in
fs.writeFileSync(progressPath, fs.readFileSync(progressPath, "utf8").split(/\r?\n/).filter((l) => /^\d{3} \|/.test(l)).sort().join("\n") + "\n");
const all = fs.readFileSync(progressPath, "utf8").split(/\r?\n/).filter((l) => /^\d{3} \|/.test(l));
const count = (i) => { const m = {}; for (const l of all) { const k = l.split("|")[i].trim(); m[k] = (m[k] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + " " + v).join(", "); };
console.log("\nACCEPTED. PROGRESS.md now has " + all.length + " lines.");
console.log("subject: " + count(2) + "\nband:    " + count(4) + "\npattern: " + count(3));
