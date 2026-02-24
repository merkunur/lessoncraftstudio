#!/usr/bin/env node
/**
 * SEO Part 268: Fix NO content quality issues
 *
 * Fixes ALL Norwegian pages to pass the validator at 50-60 title / 150-160 desc:
 *   Section 1: Product pages (33 files) — titles, descs, English leakage
 *   Section 2: Theme hubs (50 files) — titles, descs
 *   Section 3: Theme+grade (250 entries in 50 files) — INSERT seoTitles, seoDescriptions
 *   Section 4: Category hubs (8 entries in 1 file)
 *   Section 5: Grade hubs (5 entries in 1 file)
 *   Section 6: Navigation pages (6 pages in 5 files)
 *
 * Usage: node scripts/fix-no-seo-lengths.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let totalFixed = 0;
let totalSkipped = 0;
const warnings = [];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Unescape \\uXXXX sequences for accurate .length measurement */
function unescape(str) {
  if (!str) return '';
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

/** Measure decoded length */
function dLen(str) {
  return unescape(str).length;
}

/** Encode non-ASCII chars as \\uXXXX for files that use escape sequences */
function encode(str) {
  return str.replace(/[^\x20-\x7E]/g, c => {
    return '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0');
  });
}

/** Check if file content uses \\u escape sequences (vs literal Unicode) */
function usesEscapes(content) {
  return content.includes('\\u00') || content.includes('\\u20');
}

// ─── Padding phrases (decoded form) sorted by decoded length ─────────────────
const PAD_PHRASES_RAW = [
  ' Hent n\u00e5.',
  ' Skriv ut n\u00e5.',
  ' 3 000+ bilder.',
  ' Ingen registrering.',
  ' Last ned gratis PDF n\u00e5.',
  ' 3 000+ tematiske bilder.',
  ' Velg mellom 3 000+ bilder.',
  ' Ingen registrering n\u00f8dvendig.',
  ' Hent og skriv ut med en gang.',
  ' Velg tema og last ned gratis PDF.',
  ' 3 000+ bilder. Ingen registrering.',
  ' Velg mellom 3 000+ tematiske bilder.',
];

const PAD_PHRASES = PAD_PHRASES_RAW
  .map(phrase => ({ phrase, len: phrase.length }))
  .sort((a, b) => a.len - b.len);

/** Extend a description to 150-160 chars by appending the best padding phrase */
function extendDesc(rawDesc, isEscaped, target = 153) {
  const currentLen = dLen(rawDesc);
  if (currentLen >= 150 && currentLen <= 160) return rawDesc;
  if (currentLen > 160) return rawDesc; // shortening handled separately
  if (currentLen >= 160) return rawDesc;

  const needed = target - currentLen;
  if (needed <= 0) return rawDesc;

  // Find phrase that gets us closest to target within [150, 160]
  let best = null;
  let bestDist = Infinity;
  for (const p of PAD_PHRASES) {
    const newLen = currentLen + p.len;
    if (newLen >= 150 && newLen <= 160) {
      const dist = Math.abs(newLen - target);
      if (dist < bestDist) {
        bestDist = dist;
        best = p;
      }
    }
  }

  if (best) {
    const phraseRaw = isEscaped ? encode(best.phrase) : best.phrase;
    return rawDesc + phraseRaw;
  }

  // Try combining two short phrases
  for (let i = 0; i < PAD_PHRASES.length; i++) {
    for (let j = i; j < PAD_PHRASES.length; j++) {
      const combined = PAD_PHRASES[i].len + PAD_PHRASES[j].len;
      const newLen = currentLen + combined;
      if (newLen >= 150 && newLen <= 160) {
        const dist = Math.abs(newLen - target);
        if (dist < bestDist) {
          bestDist = dist;
          const p1 = isEscaped ? encode(PAD_PHRASES[i].phrase) : PAD_PHRASES[i].phrase;
          const p2 = isEscaped ? encode(PAD_PHRASES[j].phrase) : PAD_PHRASES[j].phrase;
          best = { raw: p1 + p2 };
        }
      }
    }
  }

  if (best && best.raw) {
    return rawDesc + best.raw;
  }

  warnings.push(`Could not extend desc (len=${currentLen}, need=${needed})`);
  return rawDesc;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: PRODUCT PAGES (33 files)
// ═══════════════════════════════════════════════════════════════════════════════

function fixProductPages() {
  console.log('\n=== SECTION 1: PRODUCT PAGES ===');
  const dir = path.join(ROOT, 'frontend/content/product-pages/no');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
  let fixed = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const slug = file.replace('.ts', '');
    const changes = [];
    const isEsc = usesEscapes(content);

    // Extract title from seo block
    const titleRegex = /(seo:\s*\{[\s\S]*?title:\s*')([^']*(?:\\.[^']*)*)(')/;
    const titleMatch = content.match(titleRegex);

    // Extract description from seo block
    const descRegex = /(seo:\s*\{[\s\S]*?description:\s*')([^']*(?:\\.[^']*)*)(')/;
    const descMatch = content.match(descRegex);

    // --- Fix description first (English leakage + length) ---
    if (descMatch) {
      let oldDesc = descMatch[2];
      let newDesc = oldDesc;

      // Fix English leakage: Download → Last ned
      if (newDesc.includes('Download')) {
        newDesc = newDesc.replace(/Download/g, 'Last ned');
        changes.push('Download\u2192Last ned');
      }
      if (newDesc.includes('download')) {
        newDesc = newDesc.replace(/download/g, 'last ned');
        changes.push('download\u2192last ned');
      }

      // Fix description length
      const descLen = dLen(newDesc);
      if (descLen < 150) {
        newDesc = extendDesc(newDesc, isEsc);
        if (dLen(newDesc) >= 150) {
          changes.push(`desc ${descLen}\u2192${dLen(newDesc)}`);
        }
      }

      if (newDesc !== oldDesc) {
        content = content.replace(descMatch[0], descMatch[1] + newDesc + descMatch[3]);
      }
    }

    // --- Fix title length ---
    if (titleMatch) {
      const oldTitle = titleMatch[2];
      const titleLen = dLen(oldTitle);

      if (titleLen < 50) {
        let newTitle = oldTitle;
        const decoded = unescape(oldTitle);

        // Strategy 1: Insert "til Barn " before "| LessonCraftStudio"
        if (newTitle.includes('Generator | LessonCraftStudio')) {
          newTitle = newTitle.replace(
            'Generator | LessonCraftStudio',
            'Generator til Barn | LessonCraftStudio'
          );
        } else if (newTitle.includes('| LessonCraftStudio') && !decoded.startsWith('Gratis ')) {
          // No "Gratis" prefix — add it
          newTitle = 'Gratis ' + newTitle;
        } else if (newTitle.includes('| LessonCraftStudio')) {
          // Has "Gratis" but still short — insert "til Barn" before pipe
          newTitle = newTitle.replace(
            '| LessonCraftStudio',
            'til Barn | LessonCraftStudio'
          );
        }

        const newLen = dLen(newTitle);
        if (newLen >= 50 && newLen <= 60 && newTitle !== oldTitle) {
          content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
          changes.push(`title ${titleLen}\u2192${newLen}`);
        } else if (newLen > 60) {
          // Revert to just "Gratis " prefix
          newTitle = 'Gratis ' + oldTitle;
          const nl2 = dLen(newTitle);
          if (nl2 >= 50 && nl2 <= 60) {
            content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
            changes.push(`title ${titleLen}\u2192${nl2}`);
          } else {
            warnings.push(`${slug}: title fix failed (${titleLen}\u2192${nl2})`);
          }
        } else if (newLen < 50) {
          // Still short — try adding "Printbare "
          if (decoded.startsWith('Gratis ')) {
            newTitle = newTitle.replace('Gratis ', 'Gratis Printbare ');
          } else {
            newTitle = 'Gratis Printbare ' + newTitle;
          }
          const nl3 = dLen(newTitle);
          if (nl3 >= 50 && nl3 <= 60) {
            content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
            changes.push(`title ${titleLen}\u2192${nl3}`);
          } else {
            warnings.push(`${slug}: title fix failed (${titleLen}\u2192${nl3})`);
          }
        }
      }
    }

    if (changes.length > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`  FIXED ${slug}: ${changes.join(', ')}`);
      fixed++;
    } else {
      console.log(`  OK    ${slug}`);
    }
  }

  console.log(`  Product pages: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: THEME HUBS (50 files)
// ═══════════════════════════════════════════════════════════════════════════════

function fixThemeHubs() {
  console.log('\n=== SECTION 2: THEME HUBS ===');
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const themes = fs.readdirSync(baseDir).filter(d => {
    return fs.existsSync(path.join(baseDir, d, 'no.ts')) &&
           fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let fixed = 0;

  for (const theme of themes) {
    const filePath = path.join(baseDir, theme, 'no.ts');
    let content = fs.readFileSync(filePath, 'utf8');
    const changes = [];
    // Theme files use literal Unicode (no escapes)
    const isEsc = false;

    // Split at gradeContent to only work on top-level fields
    const gradePos = content.indexOf('gradeContent');
    const topSection = gradePos > 0 ? content.substring(0, gradePos) : content;

    // Extract top-level title
    const titleMatch = topSection.match(/(^\s*title:\s*')([^']*)(')/m);
    // Extract top-level description
    const descMatch = topSection.match(/(^\s*description:\s*')([^']*)(')/m);

    // --- Fix title ---
    if (titleMatch) {
      const oldTitle = titleMatch[2];
      const titleLen = dLen(oldTitle);

      if (titleLen < 50) {
        let newTitle = oldTitle;

        // Insert "Printbare " after "Gratis "
        if (newTitle.startsWith('Gratis ')) {
          newTitle = 'Gratis Printbare ' + newTitle.substring(7);
        } else {
          // Prepend "Gratis Printbare "
          newTitle = 'Gratis Printbare ' + newTitle;
        }

        const newLen = dLen(newTitle);
        if (newLen >= 50 && newLen <= 60) {
          content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
          changes.push(`title ${titleLen}\u2192${newLen}`);
        } else if (newLen > 60) {
          // Too long with "Printbare", try just "Gratis " prefix if not present
          if (!oldTitle.startsWith('Gratis ')) {
            newTitle = 'Gratis ' + oldTitle;
            const nl2 = dLen(newTitle);
            if (nl2 >= 50 && nl2 <= 60) {
              content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
              changes.push(`title ${titleLen}\u2192${nl2}`);
            } else {
              warnings.push(`${theme}: hub title fix overshoots (${titleLen}\u2192${nl2})`);
            }
          } else {
            warnings.push(`${theme}: hub title too long after Printbare (${titleLen}\u2192${newLen})`);
          }
        } else {
          warnings.push(`${theme}: hub title still short (${titleLen}\u2192${newLen})`);
        }
      }
    }

    // --- Fix description ---
    if (descMatch) {
      const oldDesc = descMatch[2];
      const descLen = dLen(oldDesc);

      if (descLen < 150) {
        const newDesc = extendDesc(oldDesc, isEsc);
        const newLen = dLen(newDesc);
        if (newLen >= 150 && newLen <= 160 && newDesc !== oldDesc) {
          content = content.replace(descMatch[0], descMatch[1] + newDesc + descMatch[3]);
          changes.push(`desc ${descLen}\u2192${newLen}`);
        } else if (newLen < 150 || newLen > 160) {
          warnings.push(`${theme}: hub desc fix failed (${descLen}\u2192${newLen})`);
        }
      }
    }

    if (changes.length > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`  FIXED ${theme}: ${changes.join(', ')}`);
      fixed++;
    }
  }

  console.log(`  Theme hubs: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: THEME+GRADE (250 entries in 50 files) — INSERT seoTitle/seoDesc
// ═══════════════════════════════════════════════════════════════════════════════

function fixThemeGrade() {
  console.log('\n=== SECTION 3: THEME+GRADE ===');
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

  const gradeLabels = {
    'preschool': 'F\u00f8rskole',
    'kindergarten': 'Barnehage',
    'first-grade': '1. Klasse',
    'second-grade': '2. Klasse',
    'third-grade': '3. Klasse',
  };

  const gradeDescriptions = {
    'preschool': 'f\u00f8rskolebarn (3\u20134 \u00e5r)',
    'kindergarten': 'barnehagebarn (5\u20136 \u00e5r)',
    'first-grade': '1. klasse (6\u20137 \u00e5r)',
    'second-grade': '2. klasse (7\u20138 \u00e5r)',
    'third-grade': '3. klasse (8\u20139 \u00e5r)',
  };

  const gradeSkills = {
    'preschool': 'Fargelegging, telling 1\u201310 og finmotorikk',
    'kindergarten': 'Telling, bokstaver, m\u00f8nstre og visuell oppfatning',
    'first-grade': 'Addisjon, subtraksjon, lesing og skriving',
    'second-grade': 'Multiplikasjon, ordspill, logikk og probleml\u00f8sning',
    'third-grade': 'Flertrinnsproblemer, kryssord, kryptogrammer og avanserte oppgaver',
  };

  const themes = fs.readdirSync(baseDir).filter(d => {
    return fs.existsSync(path.join(baseDir, d, 'no.ts')) &&
           fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let inserted = 0;
  let adjusted = 0;

  for (const theme of themes) {
    const filePath = path.join(baseDir, theme, 'no.ts');
    let content = fs.readFileSync(filePath, 'utf8');
    let fileChanged = false;
    // Theme files use literal Unicode
    const isEsc = false;

    // Extract theme name
    const nameMatch = content.match(/name:\s*'([^']*)'/);
    const themeName = nameMatch ? nameMatch[1] : theme;

    for (const grade of grades) {
      // Check if seoTitle already exists for this grade
      const hasTitleRegex = new RegExp(`['"]${grade}['"]\\s*:\\s*\\{[\\s\\S]*?seoTitle:`, '');
      if (hasTitleRegex.test(content)) {
        // Already has seoTitle — check/adjust lengths
        const titleRegex = new RegExp(
          `(['"]${grade}['"]\\s*:\\s*\\{[\\s\\S]*?seoTitle:\\s*')([^']*)(')`,
          ''
        );
        const descRegex = new RegExp(
          `(['"]${grade}['"]\\s*:\\s*\\{[\\s\\S]*?seoDescription:\\s*')([^']*)(')`,
          ''
        );

        const titleMatch = content.match(titleRegex);
        if (titleMatch) {
          const oldTitle = titleMatch[2];
          const titleLen = dLen(oldTitle);
          if (titleLen < 50 || titleLen > 60) {
            // Generate a new title
            let newTitle = generateTitle(themeName, grade, gradeLabels);
            if (dLen(newTitle) >= 50 && dLen(newTitle) <= 60) {
              content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
              fileChanged = true;
              adjusted++;
            }
          }
        }

        const descMatch = content.match(descRegex);
        if (descMatch) {
          const oldDesc = descMatch[2];
          const descLen = dLen(oldDesc);
          if (descLen < 150) {
            const newDesc = extendDesc(oldDesc, isEsc);
            if (dLen(newDesc) >= 150 && dLen(newDesc) <= 160 && newDesc !== oldDesc) {
              content = content.replace(descMatch[0], descMatch[1] + newDesc + descMatch[3]);
              fileChanged = true;
              adjusted++;
            }
          }
        }

        continue;
      }

      // --- INSERT new seoTitle and seoDescription ---
      // Find the grade block's seoKeywords line
      const insertRegex = new RegExp(
        `(['"]${grade}['"]\\s*:\\s*\\{\\s*\\n)(\\s*)(seoKeywords:)`,
        ''
      );
      const match = content.match(insertRegex);
      if (match) {
        const indent = match[2]; // whitespace before seoKeywords

        // Generate seoTitle
        let seoTitle = generateTitle(themeName, grade, gradeLabels);

        // Generate seoDescription
        let seoDesc = generateDesc(themeName, grade, gradeDescriptions, gradeSkills, isEsc);

        // Build insertion
        const titleLine = `${indent}seoTitle: '${seoTitle}',\n`;
        const descLine = `${indent}seoDescription: '${seoDesc}',\n`;
        const insertion = match[1] + titleLine + descLine + match[2] + match[3];

        content = content.replace(match[0], insertion);
        fileChanged = true;
        inserted++;
      } else {
        warnings.push(`${theme}/${grade}: could not find seoKeywords insertion point`);
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, content);
      console.log(`  FIXED ${theme}`);
    }
  }

  console.log(`  Theme+grade: ${inserted} inserted, ${adjusted} adjusted`);
  totalFixed += inserted + adjusted;
}

/** Generate a seoTitle for a theme+grade page targeting 50-60 chars */
function generateTitle(themeName, grade, gradeLabels) {
  const gradeLabel = gradeLabels[grade];

  // Pattern 1: 'Gratis {Name}-oppgaver til {Grade} | LessonCraftStudio'
  let title = `Gratis ${themeName}-oppgaver til ${gradeLabel} | LessonCraftStudio`;
  let len = title.length;
  if (len >= 50 && len <= 60) return title;

  // Pattern 2: drop 'Gratis ' if too long
  if (len > 60) {
    title = `${themeName}-oppgaver til ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 3: even shorter
    title = `${themeName} ${gradeLabel} Oppgaver | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;
  }

  // Pattern 4: if too short, add 'Printbare '
  if (len < 50) {
    title = `Gratis Printbare ${themeName}-oppgaver til ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 5: add '\u2014 PDF' at end
    title = `Gratis ${themeName}-oppgaver til ${gradeLabel} \u2014 PDF | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 6: add 'Printbare' and drop 'til'
    title = `Gratis Printbare ${themeName} ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;
  }

  // Fallback: use the best pattern we have
  warnings.push(`${themeName}/${grade}: title length ${len} out of range`);
  return title;
}

/** Generate a seoDescription for a theme+grade page targeting 150-160 chars */
function generateDesc(themeName, grade, gradeDescriptions, gradeSkills, isEsc) {
  const gradeDesc = gradeDescriptions[grade];
  const skills = gradeSkills[grade];
  const lowerName = themeName.toLowerCase();

  // Base description template
  let desc = `Printbare ${lowerName}-oppgaver til ${gradeDesc}. ${skills}. 33 generatorer. Gratis PDF.`;
  let len = desc.length;

  if (len >= 150 && len <= 160) return desc;

  if (len < 150) {
    // Try extending with padding
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  if (len > 160) {
    // Try shorter version without '33 generatorer. '
    desc = `Printbare ${lowerName}-oppgaver til ${gradeDesc}. ${skills}. Gratis PDF.`;
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  // Try a different template with more detail
  if (dLen(desc) < 150) {
    desc = `Gratis printbare ${lowerName}-oppgaver til ${gradeDesc}. ${skills}. 33 generatorer. Last ned PDF med en gang.`;
    len = desc.length;
    if (len >= 150 && len <= 160) return desc;
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  // Final fallback: longer template
  if (dLen(desc) < 150) {
    desc = `Utskrivbare ${lowerName}-arbeidsark til ${gradeDesc}. ${skills}. 33 generatorer med 3 000+ bilder. Gratis PDF. Ingen registrering.`;
    len = desc.length;
    if (len >= 150 && len <= 160) return desc;
    desc = extendDesc(desc, isEsc);
  }

  if (dLen(desc) < 150 || dLen(desc) > 160) {
    warnings.push(`${themeName}/${grade}: desc length ${dLen(desc)} out of range`);
  }

  return desc;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: CATEGORY HUBS (8 entries in 1 file)
// ═══════════════════════════════════════════════════════════════════════════════

function fixCategoryHubs() {
  console.log('\n=== SECTION 4: CATEGORY HUBS ===');
  const filePath = path.join(ROOT, 'frontend/config/category-content.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  // Hand-crafted fixes for each category's no: block
  const categoryFixes = {
    'math': {
      oldTitle: 'Gratis matteoppgaver \\u2014 lag og skriv ut',
      newTitle: 'Gratis Printbare Matteoppgaver til Barn \\u2014 Lag & Skriv Ut',
      oldDesc: 'Lag utskrivbare matteoppgaver for barnehage til 3. trinn. Addisjon, subtraksjon, tallpuslespill og telle\\u00f8velser \\u2014 klare p\\u00e5 sekunder.',
      newDesc: 'Lag utskrivbare matteoppgaver for barnehage til 3. trinn. Addisjon, subtraksjon, tallpuslespill og telle\\u00f8velser \\u2014 klare p\\u00e5 sekunder. Ingen registrering.',
    },
    'language-arts': {
      oldTitle: 'Spr\\u00e5koppgaver for barn \\u2014 gratis arbeidsark',
      newTitle: 'Gratis Printbare Spr\\u00e5koppgaver til Barn \\u2014 PDF Arbeidsark',
      oldDesc: 'Lag utskrivbare spr\\u00e5kark: alfabet, ordpuslespill, preposisjoner og skrive\\u00f8velser. Fra barnehage til 3. trinn \\u2014 klare p\\u00e5 sekunder.',
      newDesc: 'Lag utskrivbare spr\\u00e5kark: alfabet, ordpuslespill, preposisjoner og skrive\\u00f8velser. Fra barnehage til 3. trinn \\u2014 klare p\\u00e5 sekunder. 33 generatorer. Hent n\\u00e5.',
    },
    'word-games': {
      oldTitle: 'Ordspill for barn \\u2014 utskrivbare puslespill',
      newTitle: 'Gratis Printbare Ordspill & Puslespill til Barn \\u2014 PDF',
      oldDesc: 'Lag utskrivbare ordspill: ords\\u00f8k, billedkryssord, ordgjetning og bildekryptogrammer. Gratis og klare p\\u00e5 sekunder.',
      newDesc: 'Lag utskrivbare ordspill: ords\\u00f8k, billedkryssord, ordgjetning og bildekryptogrammer. Gratis og klare p\\u00e5 sekunder. Velg mellom 3 000+ tematiske bilder. Hent n\\u00e5.',
    },
    'art-creativity': {
      oldTitle: 'Fargeleggingsbilder & tegneoppgaver for barn',
      newTitle: 'Gratis Fargeleggingsbilder & Tegneoppgaver for Barn \\u2014 Print',
      oldDesc: 'Lag utskrivbare fargeleggingsbilder og guidede tegneoppgaver for barn. Temaillustrasjoner og kreative aktiviteter \\u2014 gratis og klare p\\u00e5 sekunder.',
      newDesc: 'Lag utskrivbare fargeleggingsbilder og guidede tegneoppgaver for barn. Temaillustrasjoner og kreative aktiviteter \\u2014 gratis og klare p\\u00e5 sekunder. Hent n\\u00e5.',
    },
    'logic-puzzles': {
      oldTitle: 'Logikkoppgaver & hjernetrim for barn',
      newTitle: 'Gratis Printbare Logikkoppgaver & Hjernetrim for Barn \\u2014 PDF',
      oldDesc: 'Lag utskrivbare logikkoppgaver: sudoku, finn den som ikke passer, bildeveier og skattejakter. Bygg kritisk tenkning \\u2014 gratis og klart p\\u00e5 sekunder.',
      newDesc: 'Lag utskrivbare logikkoppgaver: sudoku, finn den som ikke passer, bildeveier og skattejakter. Bygg kritisk tenkning \\u2014 gratis og klart p\\u00e5 sekunder. Hent n\\u00e5.',
    },
    'visual-perception': {
      oldTitle: 'Visuell persepsjon \\u2014 arbeidsark for barn',
      newTitle: 'Gratis Visuell Persepsjon Arbeidsark for Barn \\u2014 Print',
      // desc ~153 chars — already in range, skip
    },
    'matching-sorting': {
      // title ~60 chars — already in range, skip title
      oldDesc: 'Gratis koble- og sorterings\\u00f8velser for barn. Klassifisering, sammenligning og visuell diskriminering fra barnehage til 3. trinn.',
      newDesc: 'Gratis koble- og sorterings\\u00f8velser for barn. Klassifisering, sammenligning og visuell diskriminering fra barnehage til 3. trinn. Velg mellom 3 000+ bilder.',
    },
    'patterns-motor': {
      // title ~59 chars — already in range, skip title
      oldDesc: 'Lag gratis arbeidsark for m\\u00f8nstergjenkjenning og finmotorikk. Sporing, rekkef\\u00f8lger og \\u00f8ye-h\\u00e5nd-koordinasjon fra barnehage til 3. trinn.',
      newDesc: 'Lag gratis arbeidsark for m\\u00f8nstergjenkjenning og finmotorikk. Sporing, rekkef\\u00f8lger og \\u00f8ye-h\\u00e5nd-koordinasjon fra barnehage til 3. trinn. Ingen registrering.',
    },
  };

  for (const [cat, fix] of Object.entries(categoryFixes)) {
    let changed = false;

    if (fix.oldTitle && fix.newTitle) {
      if (content.includes(fix.oldTitle)) {
        content = content.replace(fix.oldTitle, fix.newTitle);
        const newLen = dLen(fix.newTitle);
        console.log(`  ${cat}: title \u2192 ${newLen} chars`);
        changed = true;
      } else {
        warnings.push(`${cat}: could not find old title`);
      }
    }

    if (fix.oldDesc && fix.newDesc) {
      if (content.includes(fix.oldDesc)) {
        content = content.replace(fix.oldDesc, fix.newDesc);
        const newLen = dLen(fix.newDesc);
        console.log(`  ${cat}: desc \u2192 ${newLen} chars`);
        changed = true;
      } else {
        warnings.push(`${cat}: could not find old desc`);
      }
    }

    if (changed) fixed++;
  }

  fs.writeFileSync(filePath, content);
  console.log(`  Category hubs: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: GRADE HUBS (5 entries in 1 file)
// ═══════════════════════════════════════════════════════════════════════════════

function fixGradeHubs() {
  console.log('\n=== SECTION 5: GRADE HUBS ===');
  const filePath = path.join(ROOT, 'frontend/config/grade-content.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  const gradeFixes = {
    'preschool': {
      oldTitle: 'F\\u00f8rskolearbeidsark 3\\u20134 \\u00e5r \\u2014 Gratis utskrivbare',
      newTitle: 'Gratis F\\u00f8rskole-Arbeidsark til Barn p\\u00e5 3\\u20134 \\u00c5r \\u2014 Print',
      oldDesc: 'Gratis utskrivbare f\\u00f8rskolearbeidsark for barn p\\u00e5 3\\u20134 \\u00e5r. Fargelegging, sporing, kobling, m\\u00f8nstre og st\\u00f8rrelsessammenligning for tidlig l\\u00e6ring.',
      newDesc: 'Gratis utskrivbare f\\u00f8rskolearbeidsark for barn p\\u00e5 3\\u20134 \\u00e5r. Fargelegging, sporing, kobling, m\\u00f8nstre og st\\u00f8rrelsessammenligning for tidlig l\\u00e6ring. Hent n\\u00e5.',
    },
    'kindergarten': {
      oldTitle: 'Arbeidsark f\\u00f8rskole 5\\u20136 \\u00e5r \\u2014 Gratis',
      newTitle: 'Gratis Utskrivbare Arbeidsark F\\u00f8rskole 5\\u20136 \\u00c5r \\u2014 PDF',
      oldDesc: 'Gratis utskrivbare arbeidsark for f\\u00f8rskole, 5\\u20136 \\u00e5r. Addisjon, alfabet, ordjakten, fargelegging, telling, m\\u00f8nstre.',
      newDesc: 'Gratis utskrivbare arbeidsark for f\\u00f8rskole, 5\\u20136 \\u00e5r. Addisjon, alfabet, ordjakten, fargelegging, telling, m\\u00f8nstre. Velg mellom 3 000+ tematiske bilder.',
    },
    'first-grade': {
      // title ~58 chars — already in range
      oldDesc: 'Gratis utskrivbare arbeidsark for 1. klasse, 6\\u20137 \\u00e5r. Regning, subtraksjon, bokstavpuslespill, kryssord, sudoku, skjulte gjenstander.',
      newDesc: 'Gratis utskrivbare arbeidsark for 1. klasse, 6\\u20137 \\u00e5r. Regning, subtraksjon, bokstavpuslespill, kryssord, sudoku, skjulte gjenstander. Ingen registrering.',
    },
    'second-grade': {
      // title ~59 chars — already in range
      oldDesc: 'Gratis utskrivbare arbeidsark for 2. klasse, 7\\u20138 \\u00e5r. Mattepuslespill, kodeaddisjon, ordgjetting, kryptogrammer, finn utskilleren, bildestier.',
      newDesc: 'Gratis utskrivbare arbeidsark for 2. klasse, 7\\u20138 \\u00e5r. Mattepuslespill, kodeaddisjon, ordgjetting, kryptogrammer, finn utskilleren, bildestier. Skriv ut n\\u00e5.',
    },
    'third-grade': {
      oldTitle: '3. Trinn Oppgaver \\u2014 Matte, G\\u00e5ter & Logikk',
      newTitle: 'Gratis 3. Trinn Oppgaver \\u2014 Matte, G\\u00e5ter & Logikk \\u2014 PDF',
      oldDesc: 'Gratis oppgaver for 3. trinn: matte, sudoku, logiske g\\u00e5ter og kritisk tenkning. Last ned som PDF med en gang for skole eller hjemme.',
      newDesc: 'Gratis oppgaver for 3. trinn: matte, sudoku, logiske g\\u00e5ter og kritisk tenkning. Last ned som PDF med en gang for skole eller hjemme. Ingen registrering.',
    },
  };

  for (const [grade, fix] of Object.entries(gradeFixes)) {
    let changed = false;

    if (fix.oldTitle && fix.newTitle) {
      if (content.includes(fix.oldTitle)) {
        content = content.replace(fix.oldTitle, fix.newTitle);
        console.log(`  ${grade}: title \u2192 ${dLen(fix.newTitle)} chars`);
        changed = true;
      } else {
        warnings.push(`${grade}: could not find old title in grade-content.ts`);
      }
    }

    if (fix.oldDesc && fix.newDesc) {
      if (content.includes(fix.oldDesc)) {
        content = content.replace(fix.oldDesc, fix.newDesc);
        console.log(`  ${grade}: desc \u2192 ${dLen(fix.newDesc)} chars`);
        changed = true;
      } else {
        warnings.push(`${grade}: could not find old desc in grade-content.ts`);
      }
    }

    if (changed) fixed++;
  }

  fs.writeFileSync(filePath, content);
  console.log(`  Grade hubs: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: NAVIGATION PAGES (6 pages in 5 files)
// ═══════════════════════════════════════════════════════════════════════════════

function fixNavPages() {
  console.log('\n=== SECTION 6: NAVIGATION PAGES ===');
  let fixed = 0;

  // 1. Homepage — title 49→57 (add "til Barn")
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const oldHomepageTitle = 'Gratis Arbeidsark Generatorer | LessonCraftStudio';
    const newHomepageTitle = 'Gratis Arbeidsark Generatorer til Barn | LessonCraftStudio';
    if (content.includes(oldHomepageTitle)) {
      content = content.replace(oldHomepageTitle, newHomepageTitle);
      console.log(`  homepage: title 49\u2192${dLen(newHomepageTitle)}`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 2. Apps page — title 79→≤60, desc 134→150+
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/apps/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten from ~79 to ≤60
    const oldAppsTitle = isEsc
      ? '33 Gratis Arbeidsark Generatorer | Matte, Spr\\u00e5k, Puslespill | LessonCraftStudio'
      : '33 Gratis Arbeidsark Generatorer | Matte, Spr\u00e5k, Puslespill | LessonCraftStudio';
    const newAppsTitle = isEsc
      ? '33 Arbeidsark Generatorer \\u2014 Gratis PDF | LessonCraftStudio'
      : '33 Arbeidsark Generatorer \u2014 Gratis PDF | LessonCraftStudio';
    if (content.includes(oldAppsTitle)) {
      content = content.replace(oldAppsTitle, newAppsTitle);
      console.log(`  apps: title \u2192${dLen(newAppsTitle)}`);
      changed = true;
    }

    // Fix desc: extend from ~134 to 150+
    const oldAppsDescPart = isEsc
      ? 'Last ned utskrivbare PDFer direkte.'
      : 'Last ned utskrivbare PDFer direkte.';
    const newAppsDescPart = isEsc
      ? 'Last ned utskrivbare PDFer direkte. Ingen registrering.'
      : 'Last ned utskrivbare PDFer direkte. Ingen registrering.';
    if (content.includes(oldAppsDescPart) && !content.includes(newAppsDescPart)) {
      content = content.replace(oldAppsDescPart, newAppsDescPart);
      console.log(`  apps: desc extended`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 3. Worksheets page — title OK (~51), desc ~187→≤160 (shorten)
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/worksheets/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix desc: shorten from ~187 to ≤160
    const oldWsDesc = isEsc
      ? 'Utforsk 50 tematiske arbeidsarksamlinger for barn. Dyr, dinosaurer, verdensrommet, havet og mer. Gratis matte-, lese-, fargeleggings- og puslespillaktiviteter fra barnehage til 4. klasse.'
      : 'Utforsk 50 tematiske arbeidsarksamlinger for barn. Dyr, dinosaurer, verdensrommet, havet og mer. Gratis matte-, lese-, fargeleggings- og puslespillaktiviteter fra barnehage til 4. klasse.';
    const newWsDesc = isEsc
      ? 'Utforsk 50 tematiske arbeidsarksamlinger for barn. Dyr, dinosaurer, rommet og mer. Gratis matte-, lese- og puslespillaktiviteter fra f\\u00f8rskole til 3. klasse.'
      : 'Utforsk 50 tematiske arbeidsarksamlinger for barn. Dyr, dinosaurer, rommet og mer. Gratis matte-, lese- og puslespillaktiviteter fra f\u00f8rskole til 3. klasse.';
    if (content.includes(oldWsDesc)) {
      content = content.replace(oldWsDesc, newWsDesc);
      console.log(`  worksheets: desc \u2192${dLen(newWsDesc)}`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 4. Pricing page — title 76→≤60, desc 163→≤160
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/pricing/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten
    const oldPriceTitle = isEsc
      ? 'Priser: Gratis, $15/m\\u00e5ned Grunn & $25/m\\u00e5ned Full Tilgang | LessonCraftStudio'
      : 'Priser: Gratis, $15/m\u00e5ned Grunn & $25/m\u00e5ned Full Tilgang | LessonCraftStudio';
    const newPriceTitle = isEsc
      ? 'Priser \\u2014 Gratis & Premium Planer | LessonCraftStudio'
      : 'Priser \u2014 Gratis & Premium Planer | LessonCraftStudio';
    if (content.includes(oldPriceTitle)) {
      content = content.replace(oldPriceTitle, newPriceTitle);
      console.log(`  pricing: title \u2192${dLen(newPriceTitle)}`);
      changed = true;
    }

    // Fix desc: shorten from ~163 to ≤160
    const oldPriceDescPart = isEsc
      ? 'Gratis ords\\u00f8k-generator,'
      : 'Gratis ords\u00f8k-generator,';
    const newPriceDescPart = isEsc
      ? 'Gratis plan,'
      : 'Gratis plan,';
    if (content.includes(oldPriceDescPart)) {
      content = content.replace(oldPriceDescPart, newPriceDescPart);
      console.log(`  pricing: desc shortened`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 5. Blog listing page — title 89→≤60, desc 134→150+
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/blog/(listing)/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten
    const oldBlogTitle = isEsc
      ? 'Undervisningsressurser & Arbeidsark Tips Blogg | 100+ Ekspertartikler | LessonCraftStudio'
      : 'Undervisningsressurser & Arbeidsark Tips Blogg | 100+ Ekspertartikler | LessonCraftStudio';
    const newBlogTitle = isEsc
      ? 'Utdanningsblogg \\u2014 Arbeidsark Tips | LessonCraftStudio'
      : 'Utdanningsblogg \u2014 Arbeidsark Tips | LessonCraftStudio';
    if (content.includes(oldBlogTitle)) {
      content = content.replace(oldBlogTitle, newBlogTitle);
      console.log(`  blog: title \u2192${dLen(newBlogTitle)}`);
      changed = true;
    }

    // Fix desc: extend from ~134 to 150+
    const oldBlogDescEnd = isEsc
      ? 'Guider for l\\u00e6rere og foreldre.'
      : 'Guider for l\u00e6rere og foreldre.';
    const newBlogDescEnd = isEsc
      ? 'Guider for l\\u00e6rere og foreldre. Nye artikler hver uke.'
      : 'Guider for l\u00e6rere og foreldre. Nye artikler hver uke.';
    if (content.includes(oldBlogDescEnd) && !content.includes(newBlogDescEnd)) {
      content = content.replace(oldBlogDescEnd, newBlogDescEnd);
      console.log(`  blog: desc extended`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 6. Contact page — add no: metadata block
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/contact/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if no: block already exists in a contactPageMeta or similar object
    const hasNoBlock = /no:\s*\{[^}]*title:/.test(content);

    if (!hasNoBlock) {
      // Check if there's already a contactPageMeta object we can extend
      if (content.includes('contactPageMeta')) {
        // Add no: block to existing object
        const daBlockEnd = /da:\s*\{[^}]*\},?\s*\n/;
        const daMatch = content.match(daBlockEnd);
        if (daMatch) {
          const noBlock = `  no: {\n    title: 'Kontakt Oss \\u2014 F\\u00e5 Hjelp & Support | LessonCraftStudio',\n    description: 'Kontakt LessonCraftStudio for sp\\u00f8rsm\\u00e5l om arbeidsark, abonnementer eller teknisk support. Vi svarer innen 24 timer. Gratis hjelp til l\\u00e6rere og foreldre.',\n    keywords: 'kontakt LessonCraftStudio, support, hjelp, sp\\u00f8rsm\\u00e5l, kundeservice, l\\u00e6rerverkt\\u00f8y support',\n  },\n`;
          content = content.replace(daMatch[0], daMatch[0] + noBlock);
          fs.writeFileSync(filePath, content);
          console.log(`  contact: added no: block to existing contactPageMeta`);
          fixed++;
        }
      } else {
        // Create new meta object
        const metaBlock = `\n// Navigation SEO metadata (used by NO SEO validator)\nconst contactPageMeta: Record<string, { title: string; description: string; keywords: string }> = {\n  no: {\n    title: 'Kontakt Oss \\u2014 F\\u00e5 Hjelp & Support | LessonCraftStudio',\n    description: 'Kontakt LessonCraftStudio for sp\\u00f8rsm\\u00e5l om arbeidsark, abonnementer eller teknisk support. Vi svarer innen 24 timer. Gratis hjelp til l\\u00e6rere og foreldre.',\n    keywords: 'kontakt LessonCraftStudio, support, hjelp, sp\\u00f8rsm\\u00e5l, kundeservice, l\\u00e6rerverkt\\u00f8y support',\n  },\n};\n\n`;
        // Insert before "export default"
        const exportIdx = content.indexOf('export default');
        if (exportIdx > 0) {
          content = content.substring(0, exportIdx) + metaBlock + content.substring(exportIdx);
          fs.writeFileSync(filePath, content);
          console.log(`  contact: added no: metadata block`);
          fixed++;
        } else {
          // Try inserting before "export function" or "export async function"
          const altExport = content.search(/export\s+(async\s+)?function/);
          if (altExport > 0) {
            content = content.substring(0, altExport) + metaBlock + content.substring(altExport);
            fs.writeFileSync(filePath, content);
            console.log(`  contact: added no: metadata block (before function)`);
            fixed++;
          } else {
            warnings.push('contact: could not find insertion point');
          }
        }
      }
    } else {
      console.log(`  contact: no: block already exists`);
    }
  }

  console.log(`  Navigation pages: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

function main() {
  console.log('=== SEO Part 268: NO Content Quality Fix ===');
  console.log(`Started: ${new Date().toISOString()}\n`);

  fixProductPages();
  fixThemeHubs();
  fixThemeGrade();
  fixCategoryHubs();
  fixGradeHubs();
  fixNavPages();

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Total sections fixed: ${totalFixed}`);

  if (warnings.length > 0) {
    console.log(`\n  WARNINGS (${warnings.length}):`);
    for (const w of warnings) {
      console.log(`    \u26a0 ${w}`);
    }
  }

  console.log('\n=== DONE ===');
}

main();
