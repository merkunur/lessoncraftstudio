#!/usr/bin/env node
/**
 * Verify SEO Part 330: NL Third-Grade Enrichment — Themes 1-19
 *
 * Checks that all 10 enrichment fields exist in the third-grade block
 * of each NL theme file (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  { dir: 'alphabet', name: 'Alfabet' },
  { dir: 'animals', name: 'Dieren' },
  { dir: 'birds', name: 'Vogels' },
  { dir: 'birthday', name: 'Verjaardag' },
  { dir: 'body', name: 'Lichaam' },
  { dir: 'camping', name: 'Kamperen' },
  { dir: 'circus', name: 'Circus' },
  { dir: 'clothing', name: 'Kleding' },
  { dir: 'colors', name: 'Kleuren' },
  { dir: 'construction', name: 'Bouw' },
  { dir: 'cooking', name: 'Koken' },
  { dir: 'dinosaurs', name: 'Dinosaurussen' },
  { dir: 'easter', name: 'Pasen' },
  { dir: 'emotions', name: 'Emoties' },
  { dir: 'fairy-tales', name: 'Sprookjes' },
  { dir: 'farm', name: 'Boerderij' },
  { dir: 'flowers', name: 'Bloemen' },
  { dir: 'food', name: 'Eten' },
  { dir: 'forest', name: 'Bos' },
];

const REQUIRED_FIELDS = [
  'seoTitle',
  'seoDescription',
  'seoKeywords',
  'snippetAnswer',
  'uniqueGradeAngle',
  'developmentalMilestones',
  'differentiationNotes',
  'parentTakeaway',
  'classroomIntegration',
  'assessmentRubric',
];

let passCount = 0;
let failCount = 0;

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme.dir, 'nl.ts');
  const errors = [];

  if (!fs.existsSync(filePath)) {
    console.log(`FAIL: ${theme.dir}/nl.ts — file not found`);
    failCount++;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract third-grade block (boundary is // -- FAQ --)
  const thirdGradeIdx = content.indexOf("'third-grade'");
  const faqCommentIdx = content.indexOf("// -- FAQ --");

  if (thirdGradeIdx === -1 || faqCommentIdx === -1) {
    console.log(`FAIL: ${theme.dir}/nl.ts — missing grade/FAQ blocks`);
    failCount++;
    continue;
  }

  const block = content.substring(thirdGradeIdx, faqCommentIdx);

  // Check all required fields exist
  for (const field of REQUIRED_FIELDS) {
    if (!block.includes(`${field}:`)) {
      errors.push(`missing ${field}`);
    }
  }

  // Check seoTitle contains "Groep 5" and "LessonCraftStudio"
  const titleMatch = block.match(/seoTitle:\s*'([^']+)'/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (!title.includes('Groep 5')) errors.push('seoTitle missing "Groep 5"');
    if (!title.includes('LessonCraftStudio')) errors.push('seoTitle missing "LessonCraftStudio"');
  } else {
    errors.push('seoTitle not parseable');
  }

  // Check seoKeywords has 10 keywords (comma-separated)
  const kwMatch = block.match(/seoKeywords:\s*'([^']+)'/);
  if (kwMatch) {
    const kwCount = kwMatch[1].split(',').length;
    if (kwCount !== 10) errors.push(`seoKeywords has ${kwCount} keywords (expected 10)`);
  }

  // Check developmentalMilestones has 4 items
  const milestoneMatches = block.match(/milestone:/g);
  if (milestoneMatches) {
    if (milestoneMatches.length !== 4) errors.push(`developmentalMilestones has ${milestoneMatches.length} items (expected 4)`);
  }

  // Check assessmentRubric has 3 items (count 'emerging:' which only appears in rubric)
  const rubricMatches = block.match(/emerging:/g);
  if (rubricMatches) {
    if (rubricMatches.length !== 3) errors.push(`assessmentRubric has ${rubricMatches.length} items (expected 3)`);
  }

  // Check existing fields still present
  if (!block.includes('intro:')) errors.push('existing intro field missing');
  if (!block.includes('objectives:')) errors.push('existing objectives field missing');
  if (!block.includes('faq:')) errors.push('existing faq field missing');

  if (errors.length === 0) {
    console.log(`PASS: ${theme.dir}/nl.ts (${theme.name})`);
    passCount++;
  } else {
    console.log(`FAIL: ${theme.dir}/nl.ts — ${errors.join(', ')}`);
    failCount++;
  }
}

console.log(`\nResults: ${passCount}/${themes.length} PASS, ${failCount} FAIL`);
process.exit(failCount > 0 ? 1 : 0);
