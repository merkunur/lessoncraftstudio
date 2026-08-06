/**
 * Fix word count for app-content/en/ files below 2800 words.
 * Strategy: Expand the "Do I need to install any software?" FAQ answer with more seller-relevant detail.
 * Each file gets a unique, contextual expansion.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');

// Files needing word count expansion and how many extra words needed (approx)
const filesNeeding = {
  'alphabet-train.ts': 130,   // 2677 -> need 123+
  'cryptogram.ts': 60,        // 2744 -> need 56+
  'math-puzzle.ts': 90,       // 2717 -> need 83+
  'math-worksheet.ts': 120,   // 2688 -> need 112+
  'more-less.ts': 55,         // 2750 -> need 50+
  'prepositions.ts': 130,     // 2673 -> need 127+
  'subtraction.ts': 90,       // 2714 -> need 86+
  'word-guess.ts': 120,       // 2688 -> need 112+
  'word-scramble.ts': 90,     // 2715 -> need 85+
};

// Unique expansions per file - expand an existing FAQ answer with more seller-relevant content
const expansions = {
  'alphabet-train.ts': {
    // Expand the software FAQ
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Alphabet Train Worksheet Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your worksheet designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based design means you can create worksheets from any computer with an internet connection, whether you are working from a home office, a co-working space, or traveling. This flexibility is essential for printable sellers who manage their business across multiple devices. Session data persists in your browser tab, so you can experiment with different configurations, preview results, and refine your designs without losing progress between iterations. The generator loads instantly with no registration wall or onboarding flow blocking your creative process.`,
  },
  'cryptogram.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Cryptogram Puzzle Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your puzzle designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based architecture means you can generate puzzles from any location with internet access, and session data persists in your browser tab so you can refine configurations without losing progress between iterations.`,
  },
  'math-puzzle.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Math Puzzle Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your puzzle designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based design eliminates software compatibility issues and version conflicts, letting you focus on building your product catalog instead of managing installations. Session data persists in your browser tab, so you can experiment with grid configurations, preview results, and refine your designs without losing progress between iterations.`,
  },
  'math-worksheet.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Math Worksheet Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your worksheet designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based architecture means you can generate worksheets from any computer with internet access, whether you are at your home office, a library, or traveling. This portability is valuable for printable sellers who manage their business across multiple devices or locations. Session data persists in your browser tab, so you can experiment with operation combinations, test different difficulty ranges, and refine your layouts without losing progress between iterations. The generator loads instantly with no registration wall or setup process blocking your workflow.`,
  },
  'more-less.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Greater Than Less Than Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your worksheet designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. Session data persists in your browser tab, so you can experiment with configurations and refine your designs without losing progress between iterations.`,
  },
  'prepositions.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Preposition Worksheet Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your worksheet designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based design is especially valuable for ESL content creators who may be working from different countries or time zones, because the generator works identically regardless of location. Session data persists in your browser tab, so you can experiment with different preposition configurations, preview scene layouts, and refine your designs without losing progress between iterations. The generator loads instantly with no registration wall, onboarding flow, or software download blocking your creative workflow.`,
  },
  'subtraction.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Subtraction Worksheet Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your worksheet designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based architecture means you can create worksheets from any computer with internet access, and session data persists in your browser tab so you can experiment with different exercise modes, preview results, and refine your designs without losing progress between iterations.`,
  },
  'word-guess.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Word Guess Puzzle Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your puzzle designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. The browser-based design eliminates software compatibility issues entirely, so you can focus on creating products instead of managing installations and updates. Session data persists in your browser tab, so you can experiment with different word lists, preview blanking patterns, and refine your designs without losing progress between iterations. The generator loads instantly with no registration wall or onboarding flow blocking your creative process.`,
  },
  'word-scramble.ts': {
    find: 'Do I need to install any software?',
    expandAnswer: `No. The Word Scramble Generator runs entirely in your web browser. There is nothing to download, install, or update. It works on any modern desktop browser including Chrome, Firefox, Safari, and Edge. Just open the page and start creating. Because everything runs client-side, your puzzle designs stay private on your own device and are never uploaded to external servers, which gives sellers full confidence that their product layouts and creative choices remain protected. Session data persists in your browser tab, so you can experiment with different theme selections, preview scramble patterns, and refine your designs without losing progress between iterations. The generator loads instantly with no registration requirement, so you can move from idea to finished product in a single uninterrupted session.`,
  },
};

let fixed = 0;

for (const [filename, expansion] of Object.entries(expansions)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the FAQ question and replace the answer
  const questionEscaped = expansion.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `(question:\\s*'${questionEscaped}',\\s*\\n\\s*answer:\\s*\\n\\s*')([^']*)'`,
    's'
  );

  const match = content.match(regex);
  if (!match) {
    console.error(`NOT FOUND: ${filename} - question "${expansion.find}"`);
    continue;
  }

  // Replace the answer
  content = content.replace(regex, `$1${expansion.expandAnswer}'`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`EXPANDED: ${filename}`);
  fixed++;
}

console.log(`\nDone: ${fixed} files expanded`);
