const fs = require('fs');
const fp = 'frontend/config/guide-content/pt/niche-selection-printables.ts';
let content = fs.readFileSync(fp, 'utf8');
const lines = content.split('\n');

// Lines 32, 46, 62, 80, 98, 118, 138, 156 need title -> heading
// These are inside tutorial array entries (after line 30)
let inTutorial = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('tutorial: [')) inTutorial = true;
  if (inTutorial && lines[i].match(/^\s+title: '/)) {
    lines[i] = lines[i].replace('title:', 'heading:');
    console.log('Fixed line ' + (i+1));
  }
  // Stop at closing of tutorial array
  if (inTutorial && lines[i].match(/^\s+\],/) && i > 30) {
    // Check if this is the tutorial closing bracket
    if (lines[i+1] && !lines[i+1].match(/^\s+\{/)) {
      inTutorial = false;
    }
  }
}

fs.writeFileSync(fp, lines.join('\n'), 'utf8');
console.log('Done');
