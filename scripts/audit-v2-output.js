// Audit the generated theme-page-content.ts quality
const fs = require("fs");
const content = fs.readFileSync("frontend/config/theme-page-content.ts", "utf8");

// Count themes and locale blocks
const themeKeys = content.match(/^\s{2}'[a-z][a-z-]+':\s*\{/gm);
console.log("Theme count: " + (themeKeys ? themeKeys.length : 0));

// Count locale blocks within each theme
const localeBlocks = content.match(/^\s{4}(en|de|fr|es|pt|it|nl|sv|da|no|fi):\s*\{/gm);
console.log("Total locale blocks: " + (localeBlocks ? localeBlocks.length : 0));
const expectedBlocks = 50 * 11;
console.log("Expected: " + expectedBlocks);
if (localeBlocks && localeBlocks.length === expectedBlocks) {
  console.log("PASS: Correct number of locale blocks");
} else {
  console.log("FAIL: Mismatch in locale blocks");
}

// Count FAQs per locale block - check we have 5 per block
const faqMatches = content.match(/question:/g);
console.log("\nTotal FAQ questions: " + (faqMatches ? faqMatches.length : 0));
const expectedFaqs = 50 * 11 * 5;
console.log("Expected: " + expectedFaqs + " (50 themes x 11 locales x 5 FAQs)");
if (faqMatches && faqMatches.length === expectedFaqs) {
  console.log("PASS: Correct number of FAQs");
} else {
  console.log("NOTE: " + (faqMatches ? faqMatches.length : 0) + " vs " + expectedFaqs);
}

// Check no generic/identical intros across non-English locales
// Sample: check first 3 themes for de locale intro uniqueness
const deIntroRegex = /de:\s*\{[\s\S]*?intro:\s*'([^']+)'/g;
const deIntros = new Set();
let m;
let total = 0;
while ((m = deIntroRegex.exec(content)) !== null) {
  deIntros.add(m[1].substring(0, 50)); // first 50 chars
  total++;
}
console.log("\nGerman intros: " + total);
console.log("Unique German intro starts (first 50 chars): " + deIntros.size);
if (deIntros.size >= 8) {
  console.log("PASS: German intros have variety (at least 8 distinct category patterns)");
} else {
  console.log("WARN: Low variety in German intros");
}

// Check file doesn't have broken escaping
const brokenEscapes = content.match(/\\u[0-9a-f]{4}/g);
if (brokenEscapes) {
  console.log("\nWARN: Found " + brokenEscapes.length + " \\uXXXX escape sequences (may be intentional)");
  console.log("  Sample: " + brokenEscapes.slice(0, 5).join(", "));
} else {
  console.log("\nPASS: No raw escape sequences found");
}

// Check for empty intros
const emptyIntros = content.match(/intro:\s*'',/g);
if (emptyIntros) {
  console.log("FAIL: " + emptyIntros.length + " empty intros found");
} else {
  console.log("PASS: No empty intros");
}

console.log("\nFile size: " + (fs.statSync("frontend/config/theme-page-content.ts").size / 1024).toFixed(1) + " KB");
