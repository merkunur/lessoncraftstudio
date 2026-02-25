#!/usr/bin/env node
/**
 * Verify Part 319: NL Preschool Enrichment — Themes 20-38
 *
 * Checks all 19 theme files have the 10 enrichment fields in their preschool section.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  'fruits', 'furniture', 'garden', 'halloween', 'holidays',
  'household', 'insects', 'jobs', 'music', 'nature',
  'numbers', 'ocean', 'pets', 'pirates', 'robots',
  'school', 'seasons', 'shapes', 'space',
];

let passCount = 0;
let failCount = 0;

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme, 'nl.ts');
  const errors = [];

  if (!fs.existsSync(filePath)) {
    console.log(`FAIL: ${theme}/nl.ts — file not found`);
    failCount++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract preschool block
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.log(`FAIL: ${theme}/nl.ts — missing grade blocks`);
    failCount++;
    continue;
  }

  const block = content.substring(preschoolIdx, kindergartenIdx);

  // 1. seoTitle contains "Kleuterschool" and "LessonCraftStudio"
  const seoTitleMatch = block.match(/seoTitle:\s*'([^']+)'/);
  if (!seoTitleMatch) {
    errors.push('seoTitle missing');
  } else {
    if (!seoTitleMatch[1].includes('Kleuterschool')) errors.push('seoTitle missing "Kleuterschool"');
    if (!seoTitleMatch[1].includes('LessonCraftStudio')) errors.push('seoTitle missing "LessonCraftStudio"');
  }

  // 2. seoDescription length > 80
  const seoDescMatch = block.match(/seoDescription:\s*'([^']+)'/);
  if (!seoDescMatch) {
    errors.push('seoDescription missing');
  } else if (seoDescMatch[1].length <= 80) {
    errors.push(`seoDescription too short (${seoDescMatch[1].length})`);
  }

  // 3. seoKeywords has 10 comma-separated keywords
  const seoKwMatch = block.match(/seoKeywords:\s*'([^']+)'/);
  if (!seoKwMatch) {
    errors.push('seoKeywords missing');
  } else {
    const kwCount = seoKwMatch[1].split(',').map(k => k.trim()).filter(k => k.length > 0).length;
    if (kwCount !== 10) errors.push(`seoKeywords has ${kwCount} keywords (expected 10)`);
  }

  // 4. snippetAnswer length > 50
  const snippetMatch = block.match(/snippetAnswer:\s*'([^']+)'/);
  if (!snippetMatch) {
    errors.push('snippetAnswer missing');
  } else if (snippetMatch[1].length <= 50) {
    errors.push(`snippetAnswer too short (${snippetMatch[1].length})`);
  }

  // 5. uniqueGradeAngle length > 100
  const angleMatch = block.match(/uniqueGradeAngle:\s*'([^']+)'/);
  if (!angleMatch) {
    errors.push('uniqueGradeAngle missing');
  } else if (angleMatch[1].length <= 100) {
    errors.push(`uniqueGradeAngle too short (${angleMatch[1].length})`);
  }

  // 6. developmentalMilestones array has 4 items
  const milestoneMatches = block.match(/milestone:\s*'/g);
  if (!milestoneMatches) {
    errors.push('developmentalMilestones missing');
  } else if (milestoneMatches.length !== 4) {
    errors.push(`developmentalMilestones has ${milestoneMatches.length} items (expected 4)`);
  }

  // 7. differentiationNotes length > 50
  const diffMatch = block.match(/differentiationNotes:\s*'([^']+)'/);
  if (!diffMatch) {
    errors.push('differentiationNotes missing');
  } else if (diffMatch[1].length <= 50) {
    errors.push(`differentiationNotes too short (${diffMatch[1].length})`);
  }

  // 8. parentTakeaway length > 50
  const parentMatch = block.match(/parentTakeaway:\s*'([^']+)'/);
  if (!parentMatch) {
    errors.push('parentTakeaway missing');
  } else if (parentMatch[1].length <= 50) {
    errors.push(`parentTakeaway too short (${parentMatch[1].length})`);
  }

  // 9. classroomIntegration length > 50
  const classMatch = block.match(/classroomIntegration:\s*'([^']+)'/);
  if (!classMatch) {
    errors.push('classroomIntegration missing');
  } else if (classMatch[1].length <= 50) {
    errors.push(`classroomIntegration too short (${classMatch[1].length})`);
  }

  // 10. assessmentRubric array has 3 items
  const rubricSection = block.substring(block.indexOf('assessmentRubric:'));
  if (!block.includes('assessmentRubric:')) {
    errors.push('assessmentRubric missing');
  } else {
    const rubricMatches = rubricSection.match(/skill:\s*'/g);
    if (!rubricMatches || rubricMatches.length !== 3) {
      errors.push(`assessmentRubric has ${rubricMatches ? rubricMatches.length : 0} items (expected 3)`);
    }
  }

  if (errors.length === 0) {
    console.log(`PASS: ${theme}/nl.ts`);
    passCount++;
  } else {
    console.log(`FAIL: ${theme}/nl.ts — ${errors.join('; ')}`);
    failCount++;
  }
}

console.log(`\n${passCount}/${themes.length} PASS, ${failCount} FAIL`);
process.exit(failCount > 0 ? 1 : 0);
