#!/usr/bin/env node
/**
 * Part 165 — Fix C: Add snippetAnswer to all 250 grade blocks
 *
 * Generates 40-60 word direct answers for featured snippet targeting
 * and inserts them into each grade block after the faq array.
 *
 * Target: gradeSnippetAnswer 250/250 (was 0/250)
 */

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const ALL_THEMES = [
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

const ALL_GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

const GRADE_AGES = {
  'preschool': '3-4',
  'kindergarten': '5-6',
  'first-grade': '6-7',
  'second-grade': '7-8',
  'third-grade': '8-9',
};

const GRADE_DISPLAY = {
  'preschool': 'preschool',
  'kindergarten': 'kindergarten',
  'first-grade': 'first grade',
  'second-grade': 'second grade',
  'third-grade': 'third grade',
};

// Theme display names (capitalize, handle hyphens)
function themeDisplay(id) {
  const map = {
    'fairy-tales': 'fairy tale',
    'xmas': 'Christmas',
    'first-grade': 'first grade',
  };
  if (map[id]) return map[id];
  return id.replace(/-/g, ' ');
}

// ── Parse theme file ────────────────────────────────────────────────────────
function parseThemeFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  let js = raw
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+type\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/:\s*EnrichedThemeContent\s*=/, ' =')
    .replace(/registerThemeContent\([^)]+\);?/g, '')
    .replace(/\bas\s+const\b/g, '')
    .trim();
  const fn = new Function(`${js}\nreturn content;`);
  return fn();
}

// ── Activity type by grade ──────────────────────────────────────────────────
const ACTIVITY_PHRASES = {
  'preschool': [
    'hands-on tracing, coloring, and matching activities',
    'guided coloring, sorting, and counting exercises',
    'interactive tracing, counting, and visual matching tasks',
  ],
  'kindergarten': [
    'structured counting, word recognition, and classification exercises',
    'engaging math puzzles, word searches, and sorting activities',
    'interactive literacy games, pattern work, and counting challenges',
  ],
  'first-grade': [
    'multi-step math problems, reading passages, and vocabulary puzzles',
    'word problems, crossword puzzles, and comprehension activities',
    'structured writing prompts, math challenges, and critical thinking exercises',
  ],
  'second-grade': [
    'data interpretation, research writing, and multi-step problem solving',
    'comparative analysis, graphing activities, and structured research tasks',
    'two-step word problems, informational reading, and classification challenges',
  ],
  'third-grade': [
    'multiplication-based data analysis, research reports, and analytical writing',
    'division word problems, extended reading passages, and evidence-based essays',
    'multi-paragraph writing, population modeling, and scientific investigation tasks',
  ],
};

// ── Pedagogical context by grade ────────────────────────────────────────────
const CONTEXT_PHRASES = {
  'preschool': [
    'Large illustrations with thick outlines support fine motor development and early concept formation at this critical stage.',
    'Age-appropriate visuals with simple instructions build confidence and foundational academic skills through play-based learning.',
    'Sensory-rich themed content engages emerging learners while developing pre-academic skills essential for kindergarten readiness.',
  ],
  'kindergarten': [
    'Themed contexts connect academic practice to real-world knowledge, building both subject mastery and scientific curiosity.',
    'Visual learning materials bridge concrete and abstract thinking as students transition toward independent academic work.',
    'Cross-curricular connections between math, literacy, and science deepen understanding through familiar engaging content.',
  ],
  'first-grade': [
    'Themed contexts provide meaningful practice that transfers academic skills into cross-curricular understanding and real-world application.',
    'Multi-step activities build sustained attention and independent problem-solving skills aligned with grade-level standards.',
    'Rich vocabulary and structured exercises strengthen the reading-writing connection across content areas.',
  ],
  'second-grade': [
    'Data-rich exercises integrate cross-curricular connections between math, literacy, and science through authentic themed contexts.',
    'Research-oriented activities build evidence-based thinking and organized communication skills essential for academic success.',
    'Quantitative reasoning and expository writing develop together through engaging themed investigations and analysis tasks.',
  ],
  'third-grade': [
    'Research-driven activities build the analytical thinking, multiplicative reasoning, and evidence-based writing that third graders need.',
    'Complex multi-step problems develop mathematical fluency alongside reading comprehension and scientific literacy skills.',
    'Authentic investigation tasks strengthen research methodology, data interpretation, and structured academic communication.',
  ],
};

function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// ── Generate snippet answer ─────────────────────────────────────────────────
function generateSnippetAnswer(themeId, gradeId, gradeContent) {
  const theme = themeDisplay(themeId);
  const Theme = theme.charAt(0).toUpperCase() + theme.slice(1);
  const grade = GRADE_DISPLAY[gradeId];
  const ages = GRADE_AGES[gradeId];

  // Extract skills from objectives
  const objectives = gradeContent.objectives || [];
  const skills = objectives.map(o => o.skill.toLowerCase()).slice(0, 3);

  // Pick activity and context phrases (vary by theme index to avoid repetition)
  const themeIdx = ALL_THEMES.indexOf(themeId);
  const activityPhrases = ACTIVITY_PHRASES[gradeId];
  const contextPhrases = CONTEXT_PHRASES[gradeId];
  const actPhrase = activityPhrases[themeIdx % activityPhrases.length];
  const ctxPhrase = contextPhrases[themeIdx % contextPhrases.length];

  let skillStr;
  if (skills.length >= 3) {
    skillStr = `${skills[0]}, ${skills[1]}, and ${skills[2]}`;
  } else if (skills.length === 2) {
    skillStr = `${skills[0]} and ${skills[1]}`;
  } else if (skills.length === 1) {
    skillStr = skills[0];
  } else {
    skillStr = 'core academic skills';
  }

  const answer = `${Theme} worksheets for ${grade} students (ages ${ages}) help children ${skillStr} through ${actPhrase}. ${ctxPhrase} Free printable PDF worksheets available at LessonCraftStudio.`;

  return answer;
}

// ── Find faq closing bracket position in a grade block ──────────────────────
function findFaqClosingPos(src, gradeBlockStart) {
  // Find 'faq: [' within the grade block
  const faqIdx = src.indexOf('faq: [', gradeBlockStart);
  if (faqIdx === -1) return -1;

  // Make sure this faq is within the current grade block (not in the next one)
  // by checking that there's no other grade block header between gradeBlockStart and faqIdx
  const bracketStart = src.indexOf('[', faqIdx + 4);
  if (bracketStart === -1) return -1;

  // Track bracket depth to find matching ]
  let depth = 0;
  for (let i = bracketStart; i < src.length; i++) {
    if (src[i] === '[') depth++;
    if (src[i] === ']') {
      depth--;
      if (depth === 0) {
        // Found the closing bracket. Find the end of this line (including comma)
        let endPos = i + 1;
        // Skip optional comma and whitespace
        if (src[endPos] === ',') endPos++;
        return endPos;
      }
    }
  }
  return -1;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main execution
// ═══════════════════════════════════════════════════════════════════════════════

console.log('\nPart 165 — Fix C: Adding snippetAnswer to 250 grade blocks...\n');

let totalInserted = 0;
let totalSkipped = 0;
let totalErrors = 0;
const filesModified = new Set();

for (const themeId of ALL_THEMES) {
  const filePath = path.join(THEME_DIR, themeId, 'en.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP ${themeId}/en.ts (not found)`);
    totalErrors++;
    continue;
  }

  // Parse the file to extract grade content data
  let parsed;
  try {
    parsed = parseThemeFile(filePath);
  } catch (e) {
    console.log(`  ERROR ${themeId}/en.ts: ${e.message.slice(0, 60)}`);
    totalErrors++;
    continue;
  }

  const gc = parsed.gradeContent || {};

  // Read raw file content for text manipulation
  let src = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let themeInserted = 0;

  // Check if snippetAnswer already exists anywhere
  if (src.includes('snippetAnswer:')) {
    // Count existing snippet answers
    const existingCount = (src.match(/snippetAnswer:/g) || []).length;
    console.log(`  SKIP ${themeId}/en.ts (already has ${existingCount} snippetAnswer fields)`);
    totalSkipped += existingCount;
    continue;
  }

  // Process grades in reverse order so insertions don't shift positions
  const gradesReversed = [...ALL_GRADES].reverse();

  for (const gradeId of gradesReversed) {
    if (!gc[gradeId]) continue;

    // Generate snippet answer
    const snippetAnswer = generateSnippetAnswer(themeId, gradeId, gc[gradeId]);
    const wc = wordCount(snippetAnswer);

    if (wc < 15) {
      console.log(`  WARN ${themeId}/${gradeId}: snippet only ${wc} words, skipping`);
      continue;
    }

    // Find the grade block in the source
    const gradeKey = `'${gradeId}': {`;
    const gradeStart = src.indexOf(gradeKey);
    if (gradeStart === -1) {
      console.log(`  WARN ${themeId}/${gradeId}: grade block not found in source`);
      continue;
    }

    // Find faq closing position
    const faqEnd = findFaqClosingPos(src, gradeStart);
    if (faqEnd === -1) {
      console.log(`  WARN ${themeId}/${gradeId}: faq array closing not found`);
      continue;
    }

    // Determine indentation (should be 6 spaces for grade-level fields)
    const indent = '      ';

    // Escape single quotes in snippet answer
    const escapedAnswer = snippetAnswer.replace(/'/g, "\\'");

    // Insert snippetAnswer after faq closing
    const insertStr = `\n${indent}snippetAnswer: '${escapedAnswer}',`;
    src = src.slice(0, faqEnd) + insertStr + src.slice(faqEnd);

    themeInserted++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, src, 'utf8');
    filesModified.add(themeId);
    totalInserted += themeInserted;
    console.log(`  ✓ ${themeId}/en.ts: ${themeInserted} snippetAnswers inserted`);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Fix C complete:`);
console.log(`  Inserted: ${totalInserted} snippetAnswers across ${filesModified.size} files`);
console.log(`  Skipped:  ${totalSkipped} (already existed)`);
console.log(`  Errors:   ${totalErrors}`);
console.log(`${'='.repeat(60)}\n`);

// Validate word counts
if (totalInserted > 0) {
  console.log('Validating generated snippetAnswers...\n');
  let valid = 0;
  let tooShort = 0;
  let tooLong = 0;

  for (const themeId of ALL_THEMES) {
    const filePath = path.join(THEME_DIR, themeId, 'en.ts');
    if (!fs.existsSync(filePath)) continue;

    try {
      const content = parseThemeFile(filePath);
      const gc = content.gradeContent || {};

      for (const gradeId of ALL_GRADES) {
        if (!gc[gradeId] || !gc[gradeId].snippetAnswer) continue;
        const wc = wordCount(gc[gradeId].snippetAnswer);
        if (wc < 30) {
          tooShort++;
          console.log(`  SHORT [${wc}w] ${themeId}/${gradeId}`);
        } else if (wc > 70) {
          tooLong++;
          console.log(`  LONG  [${wc}w] ${themeId}/${gradeId}`);
        } else {
          valid++;
        }
      }
    } catch (e) {
      console.log(`  ERROR validating ${themeId}: ${e.message.slice(0, 60)}`);
    }
  }

  console.log(`\nValidation: ${valid} valid (30-70w), ${tooShort} too short, ${tooLong} too long`);
}
