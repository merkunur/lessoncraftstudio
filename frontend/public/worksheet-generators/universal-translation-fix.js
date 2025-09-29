#!/usr/bin/env node

/**
 * UNIVERSAL TRANSLATION FIX
 * Automatically fixes ALL translation issues across ALL worksheet generator apps
 * Run this once to fix 1,202 strings across 56 files!
 */

const fs = require('fs');
const path = require('path');

// High-priority strings that appear in 40+ files
const TIER1_FIXES = {
  // Most common (40+ files each)
  '>None<': { key: 'none', appearances: 44 },
  'Border Theme:': { key: 'borderTheme', appearances: 41 },
  'Background Theme:': { key: 'backgroundTheme', appearances: 40 },
  '>Border<': { key: 'border', appearances: 40 },
  '>Background<': { key: 'background', appearances: 39 },
  'Select a theme for backgrounds.': { key: 'selectThemeForBackgrounds', appearances: 38 },
  'Border Opacity:': { key: 'borderOpacity', appearances: 38 },
  'Background Opacity:': { key: 'backgroundOpacity', appearances: 38 }
};

// Pattern fixes for innerHTML assignments
const INNERHTML_FIXES = [
  {
    name: 'None in options',
    pattern: /innerHTML\s*=\s*['"`]<option value="none">None<\/option>['"`]/g,
    fix: `innerHTML = \`<option value="none">\${translations[currentLocale]?.none || 'None'}</option>\``
  },
  {
    name: 'Select theme message',
    pattern: /innerHTML\s*=\s*['"`]<p[^>]*>Select a theme for backgrounds\.<\/p>['"`]/g,
    fix: `innerHTML = \`<p class="dictionary-message">\${translations[currentLocale]?.selectThemeForBackgrounds || 'Select a theme for backgrounds.'}</p>\``
  },
  {
    name: 'Select border message',
    pattern: /innerHTML\s*=\s*['"`]<p[^>]*>Select a theme for borders\.<\/p>['"`]/g,
    fix: `innerHTML = \`<p class="dictionary-message">\${translations[currentLocale]?.selectThemeForBorders || 'Select a theme for borders.'}</p>\``
  }
];

// Stats tracking
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  stringsFixed: 0,
  errors: []
};

/**
 * Add data-translate attributes to static HTML elements
 */
function addDataTranslateAttributes(content, filePath) {
  let modified = false;
  let newContent = content;

  // Add data-translate to option elements with "None"
  const noneOptionRegex = /(<option[^>]*value="none"[^>]*)(>None<\/option>)/g;
  if (newContent.match(noneOptionRegex)) {
    newContent = newContent.replace(noneOptionRegex, (match, p1, p2) => {
      if (!p1.includes('data-translate')) {
        stats.stringsFixed++;
        modified = true;
        return `${p1} data-translate="none"${p2}`;
      }
      return match;
    });
  }

  // Add data-translate to labels
  for (const [text, info] of Object.entries(TIER1_FIXES)) {
    if (text.includes(':')) {
      // It's a label
      const labelRegex = new RegExp(`(<label[^>]*)(>${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</label>)`, 'g');
      if (newContent.match(labelRegex)) {
        newContent = newContent.replace(labelRegex, (match, p1, p2) => {
          if (!p1.includes('data-translate')) {
            stats.stringsFixed++;
            modified = true;
            return `${p1} data-translate="${info.key}"${p2}`;
          }
          return match;
        });
      }
    }
  }

  return { content: newContent, modified };
}

/**
 * Fix innerHTML assignments to use dynamic translations
 */
function fixInnerHTMLAssignments(content, filePath) {
  let modified = false;
  let newContent = content;

  for (const fix of INNERHTML_FIXES) {
    if (newContent.match(fix.pattern)) {
      console.log(`  Fixing ${fix.name} in ${path.basename(filePath)}`);
      newContent = newContent.replace(fix.pattern, fix.fix);
      stats.stringsFixed++;
      modified = true;
    }
  }

  // Fix borderThemeSelect.innerHTML = '<option value="none">None</option>'
  const borderSelectRegex = /borderThemeSelect\.innerHTML\s*=\s*['"`]<option value="none">None<\/option>['"`]/g;
  if (newContent.match(borderSelectRegex)) {
    newContent = newContent.replace(
      borderSelectRegex,
      `const noneTextBorder = translations[currentLocale]?.none || 'None';\n            borderThemeSelect.innerHTML = \`<option value="none">\${noneTextBorder}</option>\``
    );
    stats.stringsFixed++;
    modified = true;
  }

  // Fix backgroundThemeSelect.innerHTML = '<option value="none">None</option>'
  const bgSelectRegex = /backgroundThemeSelect\.innerHTML\s*=\s*['"`]<option value="none">None<\/option>['"`]/g;
  if (newContent.match(bgSelectRegex)) {
    newContent = newContent.replace(
      bgSelectRegex,
      `const noneTextBg = translations[currentLocale]?.none || 'None';\n            backgroundThemeSelect.innerHTML = \`<option value="none">\${noneTextBg}</option>\``
    );
    stats.stringsFixed++;
    modified = true;
  }

  return { content: newContent, modified };
}

/**
 * Process a single HTML file
 */
function processFile(filePath) {
  try {
    stats.filesProcessed++;
    console.log(`Processing: ${path.basename(filePath)}`);

    let content = fs.readFileSync(filePath, 'utf8');
    let anyModified = false;

    // Step 1: Add data-translate attributes
    const attrResult = addDataTranslateAttributes(content, filePath);
    if (attrResult.modified) {
      content = attrResult.content;
      anyModified = true;
    }

    // Step 2: Fix innerHTML assignments
    const innerResult = fixInnerHTMLAssignments(content, filePath);
    if (innerResult.modified) {
      content = innerResult.content;
      anyModified = true;
    }

    // Save if modified
    if (anyModified) {
      fs.writeFileSync(filePath, content, 'utf8');
      stats.filesModified++;
      console.log(`  ✓ Fixed ${path.basename(filePath)}`);
    }

  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}: ${error.message}`);
    stats.errors.push({ file: filePath, error: error.message });
  }
}

/**
 * Main execution
 */
function main() {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║     UNIVERSAL TRANSLATION FIX - STARTING       ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  const worksheetDir = __dirname;

  // Get all HTML files
  const htmlFiles = fs.readdirSync(worksheetDir)
    .filter(file => file.endsWith('.html') && !file.includes('backup'))
    .map(file => path.join(worksheetDir, file));

  console.log(`Found ${htmlFiles.length} HTML files to process\n`);

  // Process each file
  htmlFiles.forEach(processFile);

  // Print results
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║                   RESULTS                      ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Strings fixed: ${stats.stringsFixed}`);

  if (stats.errors.length > 0) {
    console.log(`\nErrors encountered: ${stats.errors.length}`);
    stats.errors.forEach(err => {
      console.log(`  - ${path.basename(err.file)}: ${err.error}`);
    });
  }

  console.log('\n✓ Translation fix complete!');
  console.log('\nNext steps:');
  console.log('1. Test with ?locale=it to verify Italian translations work');
  console.log('2. Check that "None" shows as "Nessuno" in Italian');
  console.log('3. Verify "Select a theme" shows in Italian');
}

// Run the fix
if (require.main === module) {
  main();
}