// Verify all v2 data files load correctly
const files = [
  "themes-animal", "themes-academic", "themes-nature", "themes-creative",
  "themes-culture", "themes-daily", "themes-adventure", "themes-active",
];

let total = 0;
const allThemes = [];
for (const f of files) {
  try {
    const d = require("./v2-data/" + f);
    allThemes.push(...d);
    total += d.length;
    console.log("OK: " + f + " (" + d.length + " themes)");
  } catch (e) {
    console.error("FAIL: " + f + " - " + e.message);
  }
}

// Check locale templates
try {
  const tpl = require("./v2-data/locale-templates");
  const locales = Object.keys(tpl);
  console.log("OK: locale-templates (" + locales.length + " locales: " + locales.join(", ") + ")");
  for (const l of locales) {
    const cats = Object.keys(tpl[l].categories || {});
    if (cats.length < 8) console.error("  MISSING categories for " + l + ": " + cats.length + "/8");
    else console.log("  " + l + ": " + cats.length + " categories OK");
  }
} catch (e) {
  console.error("FAIL: locale-templates - " + e.message);
}

// Verify each theme has required fields
console.log("\n=== Theme field checks ===");
let issues = 0;
for (const t of allThemes) {
  const missing = [];
  if (!t.id) missing.push("id");
  if (!t.category) missing.push("category");
  if (!t.displayNames || !t.displayNames.en) missing.push("displayNames.en");
  if (!t.enIntro) missing.push("enIntro");
  if (!t.enDescription) missing.push("enDescription");
  if (!t.enKeywords) missing.push("enKeywords");
  if (!t.enFaq || t.enFaq.length < 5) missing.push("enFaq(need 5, got " + (t.enFaq || []).length + ")");
  if (!t.relatedThemes) missing.push("relatedThemes");
  const dnCount = Object.keys(t.displayNames || {}).length;
  if (dnCount < 11) missing.push("displayNames(" + dnCount + "/11)");
  if (missing.length > 0) {
    console.error("  " + t.id + ": MISSING " + missing.join(", "));
    issues++;
  }
}
if (issues === 0) console.log("All " + total + " themes pass field checks!");
else console.log(issues + " themes have issues");

console.log("\nTotal themes: " + total);
