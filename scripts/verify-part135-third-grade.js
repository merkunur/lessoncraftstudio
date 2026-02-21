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

  // Check third-grade block exists
  if (!content.includes("'third-grade'")) {
    errors.push(`${theme}: MISSING third-grade block`);
    continue;
  }

  // Extract third-grade block (between 'third-grade': and theme-level faq: at indent 2)
  const tgStart = content.indexOf("'third-grade':");
  // Theme-level faq: uses 2-space indent; grade-level uses 6-space indent
  const faqIdx = content.indexOf('\n  faq:', tgStart);
  const commentIdx = content.indexOf('// -- FAQ --', tgStart);
  const endIdx = commentIdx > tgStart ? commentIdx : (faqIdx > tgStart ? faqIdx : -1);
  if (tgStart === -1 || endIdx === -1) {
    errors.push(`${theme}: Could not delimit third-grade block`);
    continue;
  }
  const tgBlock = content.substring(tgStart, endIdx);

  // === SEO FIELD CHECKS ===

  // 1. seoTitle
  const titleMatch = tgBlock.match(/seoTitle:\s*'([^']*(?:\\.[^']*)*)'/);
  if (titleMatch) {
    const title = resolveEscapes(titleMatch[1]);
    const len = title.length;
    if (len < 40 || len > 65) {
      errors.push(`${theme}: seoTitle length ${len} (need 40-65) -> "${title}"`);
    }
    // Check contains "Third Grade" or "Grade 3" or "3rd Grade"
    if (!/third.?grade|grade\s*3|3rd\s*grade/i.test(title)) {
      errors.push(`${theme}: seoTitle missing grade signal (Third Grade/Grade 3/3rd Grade) -> "${title}"`);
    }
    // Check ends with | LCS
    if (!title.endsWith('| LCS')) {
      errors.push(`${theme}: seoTitle missing "| LCS" suffix -> "${title}"`);
    }
    allTitles.set(theme, title.toLowerCase());
  } else {
    errors.push(`${theme}: MISSING seoTitle in third-grade block`);
  }

  // 2. seoDescription
  const descMatch = tgBlock.match(/seoDescription:\s*'([^']*(?:\\.[^']*)*)'/);
  if (descMatch) {
    const desc = resolveEscapes(descMatch[1]);
    const len = desc.length;
    if (len < 120 || len > 170) {
      errors.push(`${theme}: seoDescription length ${len} (need 120-170) -> "${desc.substring(0, 80)}..."`);
    }
    // Check contains age range or "third grade"
    if (!/ages?\s*8|third.?grade|grade\s*3|3rd\s*grade/i.test(desc)) {
      warnings.push(`${theme}: seoDescription may lack age signal -> "${desc.substring(0, 80)}..."`);
    }
    allDescriptions.set(theme, desc.toLowerCase());
  } else {
    errors.push(`${theme}: MISSING seoDescription in third-grade block`);
  }

  // 3. seoKeywords non-empty (at least 3 phrases)
  const kwMatch = tgBlock.match(/seoKeywords:\s*'([^']*(?:\\.[^']*)*)'/);
  if (kwMatch) {
    const kw = kwMatch[1];
    const phrases = kw.split(',').map(k => k.trim()).filter(k => k.length > 0);
    if (phrases.length < 3) {
      errors.push(`${theme}: seoKeywords only ${phrases.length} phrases (need 3+)`);
    }
  } else {
    errors.push(`${theme}: MISSING seoKeywords in third-grade block`);
  }

  // === CONTENT FIELD CHECKS ===

  // 4. intro word count (200+)
  const introMatch = tgBlock.match(/intro:\s*'([\s\S]*?)(?<!\\)',/);
  if (introMatch) {
    const intro = introMatch[1];
    const wordCount = intro.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 200) {
      errors.push(`${theme}: third-grade intro only ${wordCount} words (need 200+)`);
    }
  } else {
    // Try backtick-delimited intro
    const introMatch2 = tgBlock.match(/intro:\s*`([\s\S]*?)`,/);
    if (introMatch2) {
      const wordCount = introMatch2[1].split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount < 200) {
        errors.push(`${theme}: third-grade intro only ${wordCount} words (need 200+)`);
      }
    } else {
      errors.push(`${theme}: Could not extract third-grade intro`);
    }
  }

  // 5. objectives count (exactly 3)
  const objMatches = tgBlock.match(/area:\s*'([\w]+)'/g);
  if (objMatches) {
    if (objMatches.length !== 3) {
      warnings.push(`${theme}: third-grade has ${objMatches.length} objectives (expected 3)`);
    }
    for (const m of objMatches) {
      const area = m.match(/area:\s*'([\w]+)'/)[1];
      if (!validAreas.includes(area)) {
        errors.push(`${theme}: invalid area '${area}' in third-grade objectives`);
      }
    }
  } else {
    errors.push(`${theme}: Could not find objectives in third-grade block`);
  }

  // 6. FAQ count (exactly 3)
  const faqMatches = tgBlock.match(/question:\s*'/g);
  if (faqMatches) {
    if (faqMatches.length !== 3) {
      warnings.push(`${theme}: third-grade has ${faqMatches.length} FAQs (expected 3)`);
    }
  } else {
    errors.push(`${theme}: Could not find FAQs in third-grade block`);
  }

  // 7. teachingTips count (at least 2)
  const tipsMatch = tgBlock.match(/teachingTips:\s*\[([\s\S]*?)\]/);
  if (tipsMatch) {
    const tipsContent = tipsMatch[1];
    const tipCount = (tipsContent.match(/'/g) || []).length / 2; // opening+closing quotes
    if (tipCount < 2) {
      warnings.push(`${theme}: third-grade may have fewer than 2 teaching tips`);
    }
  } else {
    warnings.push(`${theme}: Could not extract teachingTips array`);
  }

  // 8. developmentalNotes present
  if (!tgBlock.includes('developmentalNotes:')) {
    errors.push(`${theme}: MISSING developmentalNotes in third-grade`);
  } else {
    const dnMatch = tgBlock.match(/developmentalNotes:\s*'([^']*(?:\\.[^']*)*)'/);
    if (dnMatch && dnMatch[1].trim().length < 20) {
      warnings.push(`${theme}: developmentalNotes very short (${dnMatch[1].trim().length} chars)`);
    }
  }

  // 9. uniqueGradeAngle present
  if (!tgBlock.includes('uniqueGradeAngle:')) {
    errors.push(`${theme}: MISSING uniqueGradeAngle in third-grade`);
  }

  // 10. developmentalMilestones present
  if (!tgBlock.includes('developmentalMilestones:')) {
    errors.push(`${theme}: MISSING developmentalMilestones in third-grade`);
  }

  // 11. differentiationNotes present
  if (!tgBlock.includes('differentiationNotes:')) {
    errors.push(`${theme}: MISSING differentiationNotes in third-grade`);
  }

  // 12. parentTakeaway present
  if (!tgBlock.includes('parentTakeaway:')) {
    errors.push(`${theme}: MISSING parentTakeaway in third-grade`);
  }

  // 13. classroomIntegration present
  if (!tgBlock.includes('classroomIntegration:')) {
    errors.push(`${theme}: MISSING classroomIntegration in third-grade`);
  }

  // 14. assessmentRubric present
  if (!tgBlock.includes('assessmentRubric:')) {
    errors.push(`${theme}: MISSING assessmentRubric in third-grade`);
  }

  // Collect FAQ questions for cross-theme check
  const faqRegex = /question:\s*'([^']*(?:\\.[^']*)*)'/g;
  const questions = [];
  let m;
  while ((m = faqRegex.exec(tgBlock)) !== null) {
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
console.log('=== THIRD-GRADE MASS VALIDATION (Part 135) ===\n');
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
