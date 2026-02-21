const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());

const errors = [];
const warnings = [];
let totalThemes = 0;

// Cross-theme uniqueness tracking
const allTitles = new Map();
const allDescriptions = new Map();
const allFaqQuestions = new Map();

const validAreas = ['math', 'literacy', 'cognitive', 'motor', 'social', 'creative'];

// Helper: resolve \uXXXX escapes to actual chars (for accurate length measurement)
function resolveEscapes(raw) {
  return raw
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

for (const theme of dirs) {
  totalThemes++;
  const fp = path.join(base, theme, 'en.ts');
  if (!fs.existsSync(fp)) {
    errors.push(`${theme}: MISSING en.ts file`);
    continue;
  }
  const content = fs.readFileSync(fp, 'utf8');

  // Check preschool block exists
  if (!content.includes("'preschool'")) {
    errors.push(`${theme}: MISSING preschool block`);
    continue;
  }

  // Extract preschool block (between 'preschool': and 'kindergarten':)
  const psStart = content.indexOf("'preschool':");
  const kgStart = content.indexOf("'kindergarten':", psStart);
  if (psStart === -1 || kgStart === -1) {
    errors.push(`${theme}: Could not delimit preschool block`);
    continue;
  }
  const psBlock = content.substring(psStart, kgStart);

  // === SEO FIELD CHECKS ===

  // 1. seoTitle
  const titleMatch = psBlock.match(/seoTitle:\s*'([^']*(?:\\.[^']*)*)'/);
  if (titleMatch) {
    const title = resolveEscapes(titleMatch[1]);
    const len = title.length;
    if (len < 40 || len > 65) {
      errors.push(`${theme}: seoTitle length ${len} (need 40-65) -> "${title}"`);
    }
    // Check contains "Preschool" or "Pre-K"
    if (!/preschool|pre-k/i.test(title)) {
      errors.push(`${theme}: seoTitle missing "Preschool" -> "${title}"`);
    }
    // Check ends with | LCS
    if (!title.endsWith('| LCS')) {
      errors.push(`${theme}: seoTitle missing "| LCS" suffix -> "${title}"`);
    }
    allTitles.set(theme, title.toLowerCase());
  } else {
    errors.push(`${theme}: MISSING seoTitle in preschool block`);
  }

  // 2. seoDescription
  const descMatch = psBlock.match(/seoDescription:\s*'([^']*(?:\\.[^']*)*)'/);
  if (descMatch) {
    const desc = resolveEscapes(descMatch[1]);
    const len = desc.length;
    if (len < 120 || len > 170) {
      errors.push(`${theme}: seoDescription length ${len} (need 120-170) -> "${desc.substring(0, 80)}..."`);
    }
    // Check contains age range or "preschool"
    if (!/ages?\s*3|preschool|pre-k/i.test(desc)) {
      warnings.push(`${theme}: seoDescription may lack age signal -> "${desc.substring(0, 80)}..."`);
    }
    allDescriptions.set(theme, desc.toLowerCase());
  } else {
    errors.push(`${theme}: MISSING seoDescription in preschool block`);
  }

  // 3. seoKeywords non-empty (at least 3 phrases)
  const kwMatch = psBlock.match(/seoKeywords:\s*'([^']*(?:\\.[^']*)*)'/);
  if (kwMatch) {
    const kw = kwMatch[1];
    const phrases = kw.split(',').map(k => k.trim()).filter(k => k.length > 0);
    if (phrases.length < 3) {
      errors.push(`${theme}: seoKeywords only ${phrases.length} phrases (need 3+)`);
    }
  } else {
    errors.push(`${theme}: MISSING seoKeywords in preschool block`);
  }

  // === CONTENT FIELD CHECKS ===

  // 4. intro word count (200+)
  const introMatch = psBlock.match(/intro:\s*'([\s\S]*?)(?<!\\)',/);
  if (introMatch) {
    const intro = introMatch[1];
    const wordCount = intro.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 200) {
      errors.push(`${theme}: preschool intro only ${wordCount} words (need 200+)`);
    }
  } else {
    // Try backtick-delimited intro
    const introMatch2 = psBlock.match(/intro:\s*`([\s\S]*?)`,/);
    if (introMatch2) {
      const wordCount = introMatch2[1].split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount < 200) {
        errors.push(`${theme}: preschool intro only ${wordCount} words (need 200+)`);
      }
    } else {
      errors.push(`${theme}: Could not extract preschool intro`);
    }
  }

  // 5. objectives count (exactly 3)
  const objMatches = psBlock.match(/area:\s*'([\w]+)'/g);
  if (objMatches) {
    if (objMatches.length !== 3) {
      warnings.push(`${theme}: preschool has ${objMatches.length} objectives (expected 3)`);
    }
    for (const m of objMatches) {
      const area = m.match(/area:\s*'([\w]+)'/)[1];
      if (!validAreas.includes(area)) {
        errors.push(`${theme}: invalid area '${area}' in preschool objectives`);
      }
    }
  } else {
    errors.push(`${theme}: Could not find objectives in preschool block`);
  }

  // 6. FAQ count (exactly 3)
  const faqMatches = psBlock.match(/question:\s*'/g);
  if (faqMatches) {
    if (faqMatches.length !== 3) {
      warnings.push(`${theme}: preschool has ${faqMatches.length} FAQs (expected 3)`);
    }
  } else {
    errors.push(`${theme}: Could not find FAQs in preschool block`);
  }

  // 7. teachingTips count (at least 2)
  const tipsMatch = psBlock.match(/teachingTips:\s*\[([\s\S]*?)\]/);
  if (tipsMatch) {
    const tipsContent = tipsMatch[1];
    const tipCount = (tipsContent.match(/'/g) || []).length / 2; // opening+closing quotes
    if (tipCount < 2) {
      warnings.push(`${theme}: preschool may have fewer than 2 teaching tips`);
    }
  } else {
    warnings.push(`${theme}: Could not extract teachingTips array`);
  }

  // 8. developmentalNotes present
  if (!psBlock.includes('developmentalNotes:')) {
    errors.push(`${theme}: MISSING developmentalNotes in preschool`);
  } else {
    const dnMatch = psBlock.match(/developmentalNotes:\s*'([^']*(?:\\.[^']*)*)'/);
    if (dnMatch && dnMatch[1].trim().length < 20) {
      warnings.push(`${theme}: developmentalNotes very short (${dnMatch[1].trim().length} chars)`);
    }
  }

  // 9. uniqueGradeAngle present
  if (!psBlock.includes('uniqueGradeAngle:')) {
    errors.push(`${theme}: MISSING uniqueGradeAngle in preschool`);
  }

  // 10. developmentalMilestones present
  if (!psBlock.includes('developmentalMilestones:')) {
    errors.push(`${theme}: MISSING developmentalMilestones in preschool`);
  }

  // 11. differentiationNotes present
  if (!psBlock.includes('differentiationNotes:')) {
    errors.push(`${theme}: MISSING differentiationNotes in preschool`);
  }

  // 12. parentTakeaway present
  if (!psBlock.includes('parentTakeaway:')) {
    errors.push(`${theme}: MISSING parentTakeaway in preschool`);
  }

  // 13. classroomIntegration present
  if (!psBlock.includes('classroomIntegration:')) {
    errors.push(`${theme}: MISSING classroomIntegration in preschool`);
  }

  // 14. assessmentRubric present
  if (!psBlock.includes('assessmentRubric:')) {
    errors.push(`${theme}: MISSING assessmentRubric in preschool`);
  }

  // Collect FAQ questions for cross-theme check
  const faqRegex = /question:\s*'([^']*(?:\\.[^']*)*)'/g;
  const questions = [];
  let m;
  while ((m = faqRegex.exec(psBlock)) !== null) {
    questions.push(m[1].toLowerCase().replace(/\\'/g, "'"));
  }
  allFaqQuestions.set(theme, questions);
}

// === CROSS-THEME CHECKS ===

// 15. seoTitle uniqueness
const titleToThemes = new Map();
for (const [theme, title] of allTitles) {
  if (!titleToThemes.has(title)) titleToThemes.set(title, []);
  titleToThemes.get(title).push(theme);
}
for (const [title, themes] of titleToThemes) {
  if (themes.length > 1) {
    errors.push(`Duplicate seoTitle across themes: "${title.substring(0, 60)}..." in: ${themes.join(', ')}`);
  }
}

// 16. seoDescription uniqueness
const descToThemes = new Map();
for (const [theme, desc] of allDescriptions) {
  if (!descToThemes.has(desc)) descToThemes.set(desc, []);
  descToThemes.get(desc).push(theme);
}
for (const [desc, themes] of descToThemes) {
  if (themes.length > 1) {
    errors.push(`Duplicate seoDescription across themes: "${desc.substring(0, 60)}..." in: ${themes.join(', ')}`);
  }
}

// 17. Cross-theme FAQ duplicates
const questionToThemes = new Map();
for (const [theme, questions] of allFaqQuestions) {
  for (const q of questions) {
    if (!questionToThemes.has(q)) questionToThemes.set(q, []);
    questionToThemes.get(q).push(theme);
  }
}
for (const [q, themes] of questionToThemes) {
  if (themes.length > 1) {
    warnings.push(`Duplicate FAQ across themes: "${q.substring(0, 60)}..." in: ${themes.join(', ')}`);
  }
}

// === REPORT ===
console.log('=== PRESCHOOL MASS VALIDATION (Part 131) ===\n');
console.log(`Themes checked: ${totalThemes}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}\n`);

if (errors.length > 0) {
  console.log('--- ERRORS ---');
  errors.forEach(e => console.log('  ERROR: ' + e));
  console.log('');
}

if (warnings.length > 0) {
  console.log('--- WARNINGS ---');
  warnings.forEach(w => console.log('  WARN: ' + w));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('ALL CHECKS PASSED!');
}

process.exit(errors.length > 0 ? 1 : 0);
