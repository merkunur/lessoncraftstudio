const files = [
  "themes-animal", "themes-academic", "themes-nature", "themes-creative",
  "themes-culture", "themes-daily", "themes-adventure", "themes-active",
];

let total = 0, faqOK = 0, introOK = 0;

for (const f of files) {
  const d = require("./v2-data/" + f);
  for (const t of d) {
    total++;
    const words = t.enIntro.split(/\s+/).length;
    if (words >= 80) introOK++;
    else console.log("SHORT intro: " + t.id + " (" + words + " words)");
    if (t.enFaq && t.enFaq.length >= 5) faqOK++;
    else console.log("FEW FAQs: " + t.id + " (" + ((t.enFaq || []).length) + ")");
    if (!t.displayNames || !t.displayNames.en) console.log("MISSING displayNames: " + t.id);
    if (!t.enDescription) console.log("MISSING enDescription: " + t.id);
    if (!t.enKeywords) console.log("MISSING enKeywords: " + t.id);
    if (!t.category) console.log("MISSING category: " + t.id);
    if (!t.relatedThemes || t.relatedThemes.length === 0) console.log("MISSING relatedThemes: " + t.id);
    // Check displayNames has all 11 locales
    const dnCount = Object.keys(t.displayNames || {}).length;
    if (dnCount < 11) console.log("INCOMPLETE displayNames: " + t.id + " (" + dnCount + "/11)");
  }
}

console.log("\n=== Summary ===");
console.log("Total themes: " + total);
console.log("Intros 80+ words: " + introOK + "/" + total);
console.log("5+ FAQs: " + faqOK + "/" + total);
