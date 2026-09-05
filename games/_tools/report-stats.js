#!/usr/bin/env node
/* report-stats.js — the numbers FINAL-REPORT.md quotes, computed from the artefacts (never typed by hand).
 * Usage: node _tools/report-stats.js   (markdown to stdout)
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const SPECS = path.join(ROOT, "design", "specs");
const rows = fs.readFileSync(path.join(SPECS, "PROGRESS.md"), "utf8").split(/\r?\n/).filter((l) => /^\d{3} \|/.test(l))
  .map((l) => { const c = l.split("|").map((s) => s.trim()); return { n: c[0], slug: c[1], subject: c[2], pattern: c[3], band: c[4] }; });
const count = (key, list) => { const m = {}; for (const r of list) m[r[key]] = (m[r[key]] || 0) + 1; return m; };
const pct = (v, t) => Math.round(100 * v / t) + "%";
let out = "";
out += "PROGRESS lines: " + rows.length + "\n\n";
const S = count("subject", rows), B = count("band", rows), P = count("pattern", rows);
out += "| subject | games | share |\n|---|---|---|\n";
for (const k of ["maths", "literacy", "science"]) out += "| " + k + " | " + (S[k] || 0) + " | " + pct(S[k] || 0, rows.length) + " |\n";
out += "\n| band | games | share |\n|---|---|---|\n";
for (const k of ["5-6", "6-8", "8-9"]) out += "| " + k + " | " + (B[k] || 0) + " | " + pct(B[k] || 0, rows.length) + " |\n";
out += "\n| band × subject | maths | literacy | science |\n|---|---|---|---|\n";
for (const b of ["5-6", "6-8", "8-9"]) out += "| " + b + " | " + ["maths", "literacy", "science"].map((s) => rows.filter((r) => r.band === b && r.subject === s).length).join(" | ") + " |\n";
out += "\n| pattern | games | share |\n|---|---|---|\n";
for (let i = 1; i <= 12; i++) { const k = "P" + i; out += "| " + k + " | " + (P[k] || 0) + " | " + pct(P[k] || 0, rows.length) + " |\n"; }
/* spec-level stats */
let chars = [], emojiPer = [], allEmoji = new Map(), fallbacks = 0, localeData = 0, enPilot = 0, subs = [];
for (const r of rows) {
  const f = fs.readdirSync(SPECS).find((x) => x.startsWith(r.n + "-"));
  if (!f) continue;
  const s = fs.readFileSync(path.join(SPECS, f), "utf8");
  chars.push(s.length);
  const art = (s.split("## Art registry")[1] || "").split("## Animation registry")[0];
  const em = [...new Set([...art.matchAll(/\p{Extended_Pictographic}/gu)].map((m) => m[0]))];
  emojiPer.push(em.length);
  for (const e of em) allEmoji.set(e, (allEmoji.get(e) || 0) + 1);
  fallbacks += (art.match(/fallback/g) || []).length;
  if (/LOCALE_DATA/.test(s)) localeData++;
  if (/en pilot/i.test(s)) enPilot++;
  const sub = s.match(/^SUBSTITUTION:.*$/m); if (sub) subs.push(r.n + " " + sub[0]);
}
chars.sort((a, b) => a - b); emojiPer.sort((a, b) => a - b);
const med = (a) => a[Math.floor(a.length / 2)];
out += "\nSpec size (characters): min " + chars[0] + ", median " + med(chars) + ", max " + chars[chars.length - 1] + "\n";
out += "Emoji per spec (distinct): min " + emojiPer[0] + ", median " + med(emojiPer) + ", max " + emojiPer[emojiPer.length - 1] + "; distinct emoji across the catalogue: " + allEmoji.size + "; fallback entries declared: " + fallbacks + "\n";
out += "Specs with a LOCALE_DATA table: " + localeData + "; specs declaring an 'en pilot' locale gap: " + enPilot + "\n";
out += "SUBSTITUTION lines found in specs: " + (subs.length ? subs.join("; ") : "none") + "\n";
const top = [...allEmoji.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([e, c]) => e + " ×" + c).join("  ");
out += "Most-used emoji: " + top + "\n";
process.stdout.write(out);
