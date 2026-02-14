#!/usr/bin/env node
/**
 * Theme Content Completion Stats
 *
 * Reports progress across all 50 themes x 11 locales.
 * A theme is "complete" when: no TODO markers, word count minimums met,
 * and basic validation passes.
 *
 * Usage:
 *   node scripts/content-stats.js
 *   node scripts/content-stats.js --verbose
 *
 * Part 4 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'frontend', 'content', 'themes');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALE_LABELS = {
  en: 'English', de: 'German', fr: 'French', es: 'Spanish', pt: 'Portuguese',
  it: 'Italian', nl: 'Dutch', sv: 'Swedish', da: 'Danish', no: 'Norwegian', fi: 'Finnish',
};

const ALL_THEME_IDS = [
  'animals', 'food', 'transportation', 'nature', 'school',
  'sports', 'emotions', 'body', 'clothing', 'household',
  'toys', 'music', 'jobs', 'space', 'seasons',
  'holidays', 'weather', 'colors', 'shapes', 'numbers',
  'alphabet', 'furniture', 'easter', 'halloween', 'xmas',
  'winter', 'farm', 'ocean', 'dinosaurs', 'insects',
  'fruits', 'vegetables', 'flowers', 'birds', 'pets',
  'zoo', 'garden', 'camping', 'pirates', 'fairy-tales',
  'robots', 'superheroes', 'construction', 'cooking', 'travel',
  'birthday', 'circus', 'forest', 'spring', 'summer',
];

const TOTAL_THEMES = ALL_THEME_IDS.length;
const TOTAL_FILES = TOTAL_THEMES * ALL_LOCALES.length;
const WORD_TARGET_PER_FILE = 1_140; // ~300 intro + 200 overview + 150 parent + ~490 FAQ/tips/activities

// ── Helpers ──────────────────────────────────────────────────────────

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const clean = text.replace(/\/\*\s*TODO[^*]*\*\//g, '').trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function progressBar(fraction, width = 20) {
  const filled = Math.round(fraction * width);
  const empty = width - filled;
  return '\u2588'.repeat(filled) + '\u2591'.repeat(empty);
}

// ── Analyze a single file ────────────────────────────────────────────

function analyzeFile(themeId, locale) {
  const filePath = path.join(CONTENT_DIR, themeId, `${locale}.ts`);
  if (!fs.existsSync(filePath)) {
    return { exists: false, complete: false, wordCount: 0, hasTodos: false, faqCount: 0, hasGradeContent: false };
  }

  const src = fs.readFileSync(filePath, 'utf8');
  const hasTodos = src.includes('/* TODO');

  // Count total words in the file's content strings
  let totalWords = 0;

  const stringFields = ['intro', 'educationalOverview', 'parentGuide'];
  for (const field of stringFields) {
    const re = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
    const m = src.match(re);
    if (m) totalWords += countWords(m[1]);
  }

  // Count FAQ answer words — use comment marker to find top-level FAQ only
  const faqSection = src.match(/\/\/ -- FAQ[\s\S]*?\n\s*faq:\s*\[([\s\S]*?)\],\n/);
  let faqCount = 0;
  if (faqSection) {
    const answerRe = /answer:\s*'((?:[^'\\]|\\.)*)'/g;
    let m;
    while ((m = answerRe.exec(faqSection[1])) !== null) {
      totalWords += countWords(m[1]);
      faqCount++;
    }
    // Also count question words
    const qRe = /question:\s*'((?:[^'\\]|\\.)*)'/g;
    while ((m = qRe.exec(faqSection[1])) !== null) {
      totalWords += countWords(m[1]);
    }
  }

  // Count teaching tips and activity words
  const tipsSection = src.match(/teachingTips:\s*\[([\s\S]*?)\],\n/);
  if (tipsSection) {
    const descRe = /description:\s*'((?:[^'\\]|\\.)*)'/g;
    let m;
    while ((m = descRe.exec(tipsSection[1])) !== null) {
      totalWords += countWords(m[1]);
    }
  }

  const actSection = src.match(/activities:\s*\[([\s\S]*?)\],\n\s*curriculumAlignment:/);
  if (actSection) {
    const descRe = /description:\s*'((?:[^'\\]|\\.)*)'/g;
    let m;
    while ((m = descRe.exec(actSection[1])) !== null) {
      totalWords += countWords(m[1]);
    }
  }

  const hasGradeContent = src.includes('gradeContent:') && !src.match(/gradeContent:\s*\{\s*\}/);

  // Check intro word count minimum
  let introWords = 0;
  const introMatch = src.match(/intro:\s*'((?:[^'\\]|\\.)*)'/s);
  if (introMatch) introWords = countWords(introMatch[1]);

  // Complete = no TODOs AND intro >= 300 words AND has at least 5 real FAQ entries
  const complete = !hasTodos && introWords >= 300 && faqCount >= 8;

  return { exists: true, complete, wordCount: totalWords, hasTodos, faqCount, introWords, hasGradeContent };
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const verbose = process.argv.includes('--verbose') || process.argv.includes('-v');

  console.log('\x1b[1mTheme Content Completion Report\x1b[0m');
  console.log('='.repeat(60));
  console.log('');

  // Per-locale stats
  const localeStats = {};
  const themeStats = {};
  let totalWords = 0;
  let totalFilesExist = 0;
  let totalComplete = 0;
  let totalIntroWords = 0;
  let totalFaqCount = 0;
  let filesWithIntro = 0;
  let filesWithFaq = 0;
  let filesWithGradeContent = 0;

  for (const locale of ALL_LOCALES) {
    localeStats[locale] = { complete: 0, exists: 0, words: 0, themes: {} };
  }

  for (const themeId of ALL_THEME_IDS) {
    themeStats[themeId] = { complete: 0, exists: 0 };

    for (const locale of ALL_LOCALES) {
      const result = analyzeFile(themeId, locale);

      if (result.exists) {
        totalFilesExist++;
        localeStats[locale].exists++;
        themeStats[themeId].exists++;
        totalWords += result.wordCount;
        localeStats[locale].words += result.wordCount;

        if (result.introWords > 0) {
          totalIntroWords += result.introWords;
          filesWithIntro++;
        }
        if (result.faqCount > 0) {
          totalFaqCount += result.faqCount;
          filesWithFaq++;
        }
        if (result.hasGradeContent) {
          filesWithGradeContent++;
        }
      }

      if (result.complete) {
        totalComplete++;
        localeStats[locale].complete++;
        themeStats[themeId].complete++;
      }

      localeStats[locale].themes[themeId] = result;
    }
  }

  // Print per-locale progress
  for (const locale of ALL_LOCALES) {
    const stats = localeStats[locale];
    const pct = Math.round((stats.complete / TOTAL_THEMES) * 100);
    const label = LOCALE_LABELS[locale].padEnd(12);
    const count = `${String(stats.complete).padStart(2)}/${TOTAL_THEMES}`;
    const bar = progressBar(stats.complete / TOTAL_THEMES);
    const wordStr = stats.words > 0 ? `  (${stats.words.toLocaleString()} words)` : '';
    console.log(`${label} ${count} complete (${String(pct).padStart(3)}%)  ${bar}${wordStr}`);
  }

  console.log('');

  // Word count summary
  console.log('\x1b[1mWord Count Summary\x1b[0m');
  if (filesWithIntro > 0) {
    const avgIntro = Math.round(totalIntroWords / filesWithIntro);
    const introStatus = avgIntro >= 300 ? '\x1b[32m\u2713\x1b[0m' : '\x1b[33m\u26A0\x1b[0m';
    console.log(`  Avg intro words:     ${avgIntro} / 300 target  ${introStatus}`);
  } else {
    console.log(`  Avg intro words:     (no files with intro content)`);
  }

  if (filesWithFaq > 0) {
    const avgFaq = (totalFaqCount / filesWithFaq).toFixed(1);
    const faqStatus = parseFloat(avgFaq) >= 8 ? '\x1b[32m\u2713\x1b[0m' : '\x1b[33m\u26A0\x1b[0m';
    console.log(`  Avg FAQ count:       ${avgFaq} / 8 target      ${faqStatus}`);
  } else {
    console.log(`  Avg FAQ count:       (no files with FAQ content)`);
  }

  const gradeStatus = filesWithGradeContent >= TOTAL_THEMES ? '\x1b[32m\u2713\x1b[0m' : '\x1b[33m\u26A0\x1b[0m';
  console.log(`  Files with grades:   ${filesWithGradeContent}/${totalFilesExist}         ${gradeStatus}`);

  console.log('');

  // Overall
  const totalTarget = TOTAL_FILES * WORD_TARGET_PER_FILE;
  const overallPct = totalFilesExist > 0 ? Math.round((totalComplete / TOTAL_FILES) * 100) : 0;
  console.log('\x1b[1mOverall\x1b[0m');
  console.log(`  Total content:       ${totalWords.toLocaleString()} words across ${totalFilesExist} files`);
  console.log(`  Target:              ~${totalTarget.toLocaleString()} words across ${TOTAL_FILES} files (${overallPct}% complete)`);
  console.log(`  Complete files:      ${totalComplete}/${TOTAL_FILES}`);

  // Verbose: show per-theme breakdown
  if (verbose) {
    console.log('');
    console.log('\x1b[1mPer-Theme Breakdown\x1b[0m');
    console.log('-'.repeat(60));
    for (const themeId of ALL_THEME_IDS) {
      const ts = themeStats[themeId];
      const localeList = ALL_LOCALES.map(l => {
        const data = localeStats[l].themes[themeId];
        if (!data || !data.exists) return '\x1b[2m-\x1b[0m';
        if (data.complete) return '\x1b[32m\u2713\x1b[0m';
        if (data.hasTodos) return '\x1b[33mT\x1b[0m';
        return '\x1b[31m\u2717\x1b[0m';
      }).join(' ');

      const pad = themeId.padEnd(16);
      console.log(`  ${pad} ${localeList}  (${ts.complete}/${ALL_LOCALES.length})`);
    }
    console.log('');
    console.log('  Legend: \x1b[32m\u2713\x1b[0m=complete  \x1b[33mT\x1b[0m=has TODOs  \x1b[31m\u2717\x1b[0m=incomplete  \x1b[2m-\x1b[0m=missing');
    console.log(`  Locales: ${ALL_LOCALES.join(' ')}`);
  }
}

main();
