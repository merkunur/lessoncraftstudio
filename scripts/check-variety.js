const fs = require("fs");
const c = fs.readFileSync("frontend/config/theme-page-content.ts", "utf8");

// Check intros for different categories in German
const themes = ["animals", "numbers", "nature", "music", "easter", "food", "space", "sports"];
for (const t of themes) {
  const idx = c.indexOf("'" + t + "':");
  if (idx === -1) { console.log(t + ": NOT FOUND"); continue; }
  const block = c.substring(idx, idx + 5000);
  // Find the de intro
  const deBlock = block.match(/de:\s*\{[\s\S]*?intro:\s*'([\s\S]*?)(?:',\n)/);
  if (deBlock) {
    console.log(t + " (DE, first 120 chars):");
    console.log("  " + deBlock[1].substring(0, 120));
    console.log();
  } else {
    console.log(t + ": DE intro not found");
  }
}
