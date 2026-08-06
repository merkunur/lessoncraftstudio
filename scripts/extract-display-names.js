const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "v2-data");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const content = fs.readFileSync(
  path.join(__dirname, "..", "frontend", "config", "theme-page-content.ts"),
  "utf8"
);

const LOCALES = ["en", "de", "fr", "es", "pt", "it", "nl", "sv", "da", "no", "fi"];
const themes = {};

// Find each top-level theme key
const themeKeys = [];
const tkRegex = /^\s{2}'([a-z][a-z-]+)':\s*\{/gm;
let m;
while ((m = tkRegex.exec(content)) !== null) {
  themeKeys.push({ id: m[1], pos: m.index });
}

for (let i = 0; i < themeKeys.length; i++) {
  const id = themeKeys[i].id;
  const start = themeKeys[i].pos;
  const end = i + 1 < themeKeys.length ? themeKeys[i + 1].pos : content.length;
  const block = content.substring(start, end);

  const names = {};
  for (const locale of LOCALES) {
    // Match locale: { name: 'DisplayName', ... }
    const nameRe = new RegExp(locale + ":\\s*\\{[\\s\\S]*?name:\\s*'([^']+)'");
    const nm = nameRe.exec(block);
    if (nm) {
      names[locale] = nm[1];
    }
  }
  if (names.en) {
    themes[id] = names;
  }
}

fs.writeFileSync(path.join(dir, "display-names.json"), JSON.stringify(themes, null, 2));
console.log("Extracted " + Object.keys(themes).length + " themes");

// Verify completeness
let incomplete = 0;
for (const [id, names] of Object.entries(themes)) {
  if (Object.keys(names).length < 11) {
    incomplete++;
    console.log("  INCOMPLETE: " + id + " (" + Object.keys(names).length + " locales)");
  }
}
if (incomplete === 0) console.log("All themes have 11 locales!");
console.log("Sample (animals):", JSON.stringify(themes["animals"]));
