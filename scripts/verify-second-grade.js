const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());

const errors = [];
const warnings = [];
let totalThemes = 0;
const allFaqQuestions = new Map(); // theme -> questions

const validAreas = ['math', 'literacy', 'cognitive', 'motor', 'social', 'creative'];

for (const theme of dirs) {
  totalThemes++;
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');

  // 1. Check second-grade exists
  if (!content.includes("'second-grade'")) {
    errors.push(`${theme}: MISSING second-grade block`);
    continue;
  }

  // 2. Check all 4 grades exist
  for (const grade of ['preschool', 'kindergarten', 'first-grade', 'second-grade']) {
    if (!content.includes(`'${grade}'`)) {
      errors.push(`${theme}: MISSING ${grade} block`);
    }
  }

  // 3. Extract second-grade intro and check word count
  const introMatch = content.match(/'second-grade':\s*\{[\s\S]*?intro:\s*'([\s\S]*?)(?<!\\)',/);
  if (introMatch) {
    const intro = introMatch[1];
    const wordCount = intro.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 200) {
      errors.push(`${theme}: second-grade intro only ${wordCount} words (need 200+)`);
    }
  } else {
    errors.push(`${theme}: Could not extract second-grade intro`);
  }

  // 4. Check objectives count (look for area: patterns within second-grade block)
  const sgStart = content.indexOf("'second-grade'");
  const sgEnd = content.indexOf("'third-grade'", sgStart);
  const nextSection = sgEnd > -1 ? sgEnd : content.indexOf('// -- FAQ --', sgStart);
  const sgBlock = content.substring(sgStart, nextSection);

  const objMatches = sgBlock.match(/area:\s*'([\w]+)'/g);
  if (objMatches) {
    if (objMatches.length !== 3) {
      warnings.push(`${theme}: second-grade has ${objMatches.length} objectives (expected 3)`);
    }
    // Check valid areas
    for (const m of objMatches) {
      const area = m.match(/area:\s*'([\w]+)'/)[1];
      if (!validAreas.includes(area)) {
        errors.push(`${theme}: invalid area '${area}' in second-grade objectives`);
      }
    }
  } else {
    errors.push(`${theme}: Could not find objectives in second-grade block`);
  }

  // 5. Check FAQ count
  const faqMatches = sgBlock.match(/question:\s*'/g);
  if (faqMatches) {
    if (faqMatches.length !== 3) {
      warnings.push(`${theme}: second-grade has ${faqMatches.length} FAQs (expected 3)`);
    }
  } else {
    errors.push(`${theme}: Could not find FAQs in second-grade block`);
  }

  // 6. Check teachingTips count (look for strings in teachingTips array)
  const tipsMatch = sgBlock.match(/teachingTips:\s*\[([\s\S]*?)\]/);
  if (tipsMatch) {
    const tipsContent = tipsMatch[1];
    const tipCount = (tipsContent.match(/^\s*'/gm) || []).length;
    if (tipCount < 2) {
      warnings.push(`${theme}: second-grade may have fewer than 2 teaching tips`);
    }
  }

  // 7. Check developmentalNotes exists
  if (!sgBlock.includes('developmentalNotes:')) {
    errors.push(`${theme}: MISSING developmentalNotes in second-grade`);
  }

  // 8. Collect FAQ questions for cross-theme duplicate check
  const faqRegex = /question:\s*'([^']*(?:\\.[^']*)*)'/g;
  const questions = [];
  let m;
  while ((m = faqRegex.exec(sgBlock)) !== null) {
    questions.push(m[1].toLowerCase().replace(/\\'/g, "'"));
  }
  allFaqQuestions.set(theme, questions);
}

// 9. Check for cross-theme FAQ duplicates
const questionToThemes = new Map();
for (const [theme, questions] of allFaqQuestions) {
  for (const q of questions) {
    if (!questionToThemes.has(q)) {
      questionToThemes.set(q, []);
    }
    questionToThemes.get(q).push(theme);
  }
}
for (const [q, themes] of questionToThemes) {
  if (themes.length > 1) {
    warnings.push(`Duplicate FAQ across themes: "${q.substring(0, 60)}..." in: ${themes.join(', ')}`);
  }
}

// Report
console.log('=== SECOND-GRADE CONTENT VERIFICATION ===\n');
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
