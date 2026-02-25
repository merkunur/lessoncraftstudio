#!/usr/bin/env node
/**
 * Verification script for SEO Part 326: NL First-Grade Enrichment — Themes 39-50
 *
 * Checks that all 12 theme files have the 10 enrichment fields
 * correctly injected into the first-grade grade block.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  'sports', 'spring', 'summer', 'superheroes', 'toys',
  'transportation', 'travel', 'vegetables', 'weather',
  'winter', 'xmas', 'zoo',
];

const REQUIRED_FIELDS = [
  'seoTitle', 'seoDescription', 'seoKeywords', 'snippetAnswer',
  'uniqueGradeAngle', 'developmentalMilestones', 'differentiationNotes',
  'parentTakeaway', 'classroomIntegration', 'assessmentRubric',
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

  // Extract first-grade block
  const firstGradeIdx = content.indexOf("'first-grade'");
  const secondGradeIdx = content.indexOf("'second-grade'");

  if (firstGradeIdx === -1 || secondGradeIdx === -1) {
    console.log(`FAIL: ${theme}/nl.ts — missing grade blocks`);
    failCount++;
    continue;
  }

  const firstGradeBlock = content.substring(firstGradeIdx, secondGradeIdx);

  // Check all required fields exist in first-grade block
  for (const field of REQUIRED_FIELDS) {
    if (!firstGradeBlock.includes(`${field}:`)) {
      errors.push(`missing ${field}`);
    }
  }

  // Check seoTitle contains "Groep 3" and "LessonCraftStudio"
  const seoTitleMatch = firstGradeBlock.match(/seoTitle:\s*'([^']+)'/);
  if (seoTitleMatch) {
    const seoTitle = seoTitleMatch[1];
    if (!seoTitle.includes('Groep 3')) errors.push('seoTitle missing "Groep 3"');
    if (!seoTitle.includes('LessonCraftStudio')) errors.push('seoTitle missing "LessonCraftStudio"');
  } else {
    errors.push('seoTitle not parseable');
  }

  // Check seoKeywords has ~10 keywords (comma-separated)
  const seoKeywordsMatch = firstGradeBlock.match(/seoKeywords:\s*'([^']+)'/);
  if (seoKeywordsMatch) {
    const keywordCount = seoKeywordsMatch[1].split(',').length;
    if (keywordCount < 9 || keywordCount > 11) {
      errors.push(`seoKeywords has ${keywordCount} keywords (expected 10)`);
    }
  }

  // Check developmentalMilestones has 4 items
  const milestoneMatches = firstGradeBlock.match(/milestone:/g);
  if (milestoneMatches) {
    if (milestoneMatches.length !== 4) {
      errors.push(`developmentalMilestones has ${milestoneMatches.length} items (expected 4)`);
    }
  }

  // Check assessmentRubric has 3 items (count 'emerging:' which only appears in rubric)
  const rubricMatches = firstGradeBlock.match(/emerging:/g);
  if (rubricMatches) {
    if (rubricMatches.length !== 3) {
      errors.push(`assessmentRubric has ${rubricMatches.length} items (expected 3)`);
    }
  }

  // Check existing fields are still present (not overwritten)
  if (!firstGradeBlock.includes('intro:')) errors.push('existing intro field missing');
  if (!firstGradeBlock.includes('objectives:')) errors.push('existing objectives field missing');
  if (!firstGradeBlock.includes('developmentalNotes:')) errors.push('existing developmentalNotes field missing');
  if (!firstGradeBlock.includes('teachingTips:')) errors.push('existing teachingTips field missing');
  if (!firstGradeBlock.includes('faq:')) errors.push('existing faq field missing');

  // Check preschool block is untouched (has seoTitle from earlier enrichment)
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");
  if (preschoolIdx !== -1 && kindergartenIdx !== -1) {
    const preschoolBlock = content.substring(preschoolIdx, kindergartenIdx);
    if (!preschoolBlock.includes('seoTitle:')) {
      errors.push('preschool seoTitle missing (may have been damaged)');
    }
  }

  // Check kindergarten block is untouched
  if (kindergartenIdx !== -1 && firstGradeIdx !== -1) {
    const kindergartenBlock = content.substring(kindergartenIdx, firstGradeIdx);
    if (!kindergartenBlock.includes('seoTitle:')) {
      errors.push('kindergarten seoTitle missing (may have been damaged)');
    }
  }

  if (errors.length === 0) {
    console.log(`PASS: ${theme}/nl.ts`);
    passCount++;
  } else {
    console.log(`FAIL: ${theme}/nl.ts — ${errors.join(', ')}`);
    failCount++;
  }
}

console.log(`\nResults: ${passCount}/${themes.length} PASS, ${failCount} FAIL`);
process.exit(failCount > 0 ? 1 : 0);
