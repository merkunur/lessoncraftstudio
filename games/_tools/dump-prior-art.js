// One-off: dump the live free activities (read-only) into research/PRIOR-ART.md
const fs = require("fs"), path = require("path");
const dir = "C:/Users/rkgen/lessoncraftstudio/mini tools";
const out = "C:/Users/rkgen/lessoncraftstudio/games/research/PRIOR-ART.md";
const rows = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith("-activities.json")).sort()) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch (e) { continue; }
  const arr = Array.isArray(j) ? j : (j.activities || []);
  for (const a of arr) {
    const al = a.alignment || {};
    const t = (a.page_title && (a.page_title.en || a.page_title)) || (a.title && (a.title.en || a.title)) || "";
    const s = (a.slug && (a.slug.en || a.slug)) || "";
    const locs = a.slug && typeof a.slug === "object" ? Object.keys(a.slug).length : 1;
    rows.push([a.id || "", String(t).replace(/\|/g, "/"), String(s), al.code || "", al.grade || "", al.strand || "", f.replace("-activities.json", ""), locs]);
  }
}
rows.sort((a, b) => String(a[3]).localeCompare(String(b[3])) || String(a[1]).localeCompare(String(b[1])));
let md = "# Prior art — the LIVE FREE activities on lessoncraftstudio.com\n\n";
md += "Source: `lessoncraftstudio/mini tools/*-activities.json` (read-only dump, " + new Date().toISOString().slice(0, 10) + ").\n";
md += "Rule (operator, 2026-09-05): a paid game must NOT be a free activity re-skinned. A catalogue row whose objective AND mechanic a row below already owns is replaced or re-scoped.\n\n";
md += "Count: " + rows.length + " activities, " + new Set(rows.map(r => r[3]).filter(Boolean)).size + " distinct CCSS codes.\n\n";
md += "| id | title (en) | slug (en) | CCSS | grade | strand | engine | locales |\n|---|---|---|---|---|---|---|---|\n";
for (const r of rows) md += "| " + r.join(" | ") + " |\n";
const byCode = {};
for (const r of rows) { if (!r[3]) continue; (byCode[r[3]] = byCode[r[3]] || []).push(r[1]); }
md += "\n## Owned CCSS codes (code → activities)\n\n";
for (const c of Object.keys(byCode).sort()) md += "- `" + c + "` — " + byCode[c].join("; ") + "\n";
fs.writeFileSync(out, md);
console.log("rows", rows.length, "->", out);
