/**
 * SEO Part 285 — Validate all 50 SV theme hub SEO fields
 *
 * Checks:
 * 1. title ends with "| LessonCraftStudio"
 * 2. description is non-empty and Swedish (not English defaults)
 * 3. keywords has 10–11 comma-separated keywords
 * 4. heading differs from title (clean H1 vs branded SEO title)
 * 5. name field exists and is non-empty
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

// English default patterns that indicate untranslated content
const ENGLISH_PATTERNS = [
  /\bfree\b/i,
  /\bprintable\b/i,
  /\bworksheets?\b/i,
  /\bkids\b/i,
  /\bchildren\b/i,
  /\bpreschool\b/i,
  /\bkindergarten\b/i,
  /\bcoloring\b/i,
  /\bmath\b/i,
  /\bpuzzles?\b/i,
];

// Swedish indicator words
const SWEDISH_INDICATORS = [
  'barn', 'övningar', 'arbetsblad', 'gratis', 'utskrivbar', 'förskola',
  'matematik', 'målarbilder', 'pussel', 'räkning', 'korsord', 'årskurs',
  'och', 'för', 'med', 'tema', 'PDF',
];

function extractField(content, fieldName) {
  // Match field: 'value' or field: "value" (single line)
  const re = new RegExp(`${fieldName}:\\s*['"](.+?)['"]\\s*,?\\s*$`, 'm');
  const m = content.match(re);
  return m ? m[1] : null;
}

function looksSwedish(text) {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const w of SWEDISH_INDICATORS) {
    if (lower.includes(w.toLowerCase())) hits++;
  }
  return hits >= 2; // at least 2 Swedish indicator words
}

function looksEnglish(text) {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const p of ENGLISH_PATTERNS) {
    if (p.test(lower)) hits++;
  }
  return hits >= 3; // 3+ English words = likely English
}

function validate() {
  const themes = fs.readdirSync(THEMES_DIR).filter(d => {
    const svPath = path.join(THEMES_DIR, d, 'sv.ts');
    return fs.existsSync(svPath) && fs.statSync(path.join(THEMES_DIR, d)).isDirectory();
  }).sort();

  console.log(`Validating ${themes.length} SV theme hubs...\n`);

  let pass = 0;
  let fail = 0;
  const failures = [];

  for (const theme of themes) {
    const filePath = path.join(THEMES_DIR, theme, 'sv.ts');
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];

    // Extract fields
    const name = extractField(content, 'name');
    const title = extractField(content, 'title');
    const description = extractField(content, 'description');
    const keywords = extractField(content, 'keywords');
    const heading = extractField(content, 'heading');

    // 1. name exists and non-empty
    if (!name || name.trim().length === 0) {
      errors.push('name: missing or empty');
    }

    // 2. title ends with | LessonCraftStudio
    if (!title) {
      errors.push('title: missing');
    } else if (!title.endsWith('| LessonCraftStudio')) {
      errors.push(`title: does not end with "| LessonCraftStudio" → "${title.slice(-30)}"`);
    }

    // 3. description non-empty and Swedish
    if (!description) {
      errors.push('description: missing');
    } else if (description.trim().length < 20) {
      errors.push(`description: too short (${description.length} chars)`);
    } else if (looksEnglish(description)) {
      errors.push('description: appears to be English, not Swedish');
    } else if (!looksSwedish(description)) {
      errors.push('description: does not appear to be Swedish');
    }

    // 4. keywords has 10-11 comma-separated items
    if (!keywords) {
      errors.push('keywords: missing');
    } else {
      const kwList = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
      if (kwList.length < 10 || kwList.length > 11) {
        errors.push(`keywords: expected 10-11, found ${kwList.length}`);
      }
    }

    // 5. heading differs from title
    if (!heading) {
      errors.push('heading: missing');
    } else if (heading.trim().length === 0) {
      errors.push('heading: empty');
    } else if (title && heading === title) {
      errors.push('heading: identical to title (should be clean H1)');
    }

    if (errors.length === 0) {
      pass++;
    } else {
      fail++;
      failures.push({ theme, errors });
    }
  }

  // Summary
  console.log('='.repeat(60));
  console.log(`RESULTS: ${pass} passed, ${fail} failed out of ${themes.length} themes`);
  console.log('='.repeat(60));

  if (failures.length > 0) {
    console.log('\nFAILURES:\n');
    for (const { theme, errors } of failures) {
      console.log(`  ✗ ${theme}`);
      for (const e of errors) {
        console.log(`    - ${e}`);
      }
    }
  } else {
    console.log('\n✓ All 50 SV theme hubs pass validation!\n');
  }

  // Per-theme detail (compact)
  console.log('\nPer-theme summary:');
  for (const theme of themes) {
    const failed = failures.find(f => f.theme === theme);
    if (failed) {
      console.log(`  ✗ ${theme.padEnd(20)} FAIL (${failed.errors.length} issue${failed.errors.length > 1 ? 's' : ''})`);
    } else {
      console.log(`  ✓ ${theme.padEnd(20)} PASS`);
    }
  }

  process.exit(fail > 0 ? 1 : 0);
}

validate();
