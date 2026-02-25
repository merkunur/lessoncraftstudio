#!/usr/bin/env node
/**
 * SEO Part 301: Fix SV content quality issues
 *
 * Fixes ALL Swedish pages to pass the validator at 50-60 title / 150-160 desc:
 *   Section 1: Product pages (33 files) — titles, descs
 *   Section 2: Theme hubs (50 files) — titles, descs
 *   Section 3: Theme+grade (250 entries in 50 files) — adjust seoTitles, seoDescriptions
 *   Section 4: Category hubs (8 entries in 1 file)
 *   Section 5: Grade hubs (5 entries in 1 file)
 *   Section 6: Navigation pages (6 pages in 5 files)
 *
 * Usage: node scripts/fix-sv-seo-lengths.js
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
  ' PDF.',
  ' Gratis.',
  ' H\u00e4mta.',
  ' Skriv ut.',
  ' Gratis PDF.',
  ' Ladda ner.',
  ' Ladda ner nu.',
  ' Skriv ut direkt.',
  ' 3 000+ bilder.',
  ' Ingen registrering.',
  ' Ladda ner gratis PDF nu.',
  ' 3 000+ tematiska bilder.',
  ' V\u00e4lj bland 3 000+ bilder.',
  ' Ingen registrering kr\u00e4vs.',
  ' Ladda ner och skriv ut direkt.',
  ' V\u00e4lj tema och ladda ner gratis PDF.',
  ' 3 000+ bilder. Ingen registrering.',
  ' V\u00e4lj bland 3 000+ tematiska bilder.',
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
  const dir = path.join(ROOT, 'frontend/content/product-pages/sv');
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

    // --- Fix description first (length) ---
    if (descMatch) {
      let oldDesc = descMatch[2];
      let newDesc = oldDesc;

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

        // Strategy 1: Insert "f\u00f6r Barn " before "| LessonCraftStudio"
        if (newTitle.includes('Generator | LessonCraftStudio')) {
          newTitle = newTitle.replace(
            'Generator | LessonCraftStudio',
            isEsc ? 'Generator f\\u00f6r Barn | LessonCraftStudio' : 'Generator f\u00f6r Barn | LessonCraftStudio'
          );
        } else if (newTitle.includes('| LessonCraftStudio') && !decoded.startsWith('Gratis ')) {
          // No "Gratis" prefix — add it
          newTitle = 'Gratis ' + newTitle;
        } else if (newTitle.includes('| LessonCraftStudio')) {
          // Has "Gratis" but still short — insert "f\u00f6r Barn" before pipe
          newTitle = newTitle.replace(
            '| LessonCraftStudio',
            isEsc ? 'f\\u00f6r Barn | LessonCraftStudio' : 'f\u00f6r Barn | LessonCraftStudio'
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
          // Still short — try adding "Utskrivbara "
          if (decoded.startsWith('Gratis ')) {
            newTitle = newTitle.replace('Gratis ', 'Gratis Utskrivbara ');
          } else {
            newTitle = 'Gratis Utskrivbara ' + newTitle;
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
    return fs.existsSync(path.join(baseDir, d, 'sv.ts')) &&
           fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let fixed = 0;

  for (const theme of themes) {
    const filePath = path.join(baseDir, theme, 'sv.ts');
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

        // Insert "Utskrivbara " after "Gratis "
        if (newTitle.startsWith('Gratis ')) {
          newTitle = 'Gratis Utskrivbara ' + newTitle.substring(7);
        } else {
          // Prepend "Gratis Utskrivbara "
          newTitle = 'Gratis Utskrivbara ' + newTitle;
        }

        const newLen = dLen(newTitle);
        if (newLen >= 50 && newLen <= 60) {
          content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
          changes.push(`title ${titleLen}\u2192${newLen}`);
        } else if (newLen > 60) {
          // Too long with "Utskrivbara", try inserting "f\u00f6r Barn" before "| LessonCraftStudio"
          if (oldTitle.includes('| LessonCraftStudio')) {
            newTitle = oldTitle.replace('| LessonCraftStudio', 'f\u00f6r Barn | LessonCraftStudio');
            const nl2 = dLen(newTitle);
            if (nl2 >= 50 && nl2 <= 60) {
              content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
              changes.push(`title ${titleLen}\u2192${nl2}`);
            } else if (!oldTitle.startsWith('Gratis ')) {
              newTitle = 'Gratis ' + oldTitle;
              const nl3 = dLen(newTitle);
              if (nl3 >= 50 && nl3 <= 60) {
                content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
                changes.push(`title ${titleLen}\u2192${nl3}`);
              } else {
                warnings.push(`${theme}: hub title fix overshoots (${titleLen}\u2192${nl3})`);
              }
            } else {
              warnings.push(`${theme}: hub title too long after Utskrivbara (${titleLen}\u2192${newLen})`);
            }
          } else {
            warnings.push(`${theme}: hub title fix overshoots (${titleLen}\u2192${newLen})`);
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
// SECTION 3: THEME+GRADE (250 entries in 50 files) — adjust seoTitle/seoDesc
// ═══════════════════════════════════════════════════════════════════════════════

function fixThemeGrade() {
  console.log('\n=== SECTION 3: THEME+GRADE ===');
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

  const gradeLabels = {
    'preschool': 'F\u00f6rskola',
    'kindergarten': 'F\u00f6rskoleklass',
    'first-grade': '\u00c5rskurs 1',
    'second-grade': '\u00c5rskurs 2',
    'third-grade': '\u00c5rskurs 3',
  };

  const gradeDescriptions = {
    'preschool': 'f\u00f6rskolebarn (3\u20134 \u00e5r)',
    'kindergarten': 'f\u00f6rskoleklass (5\u20136 \u00e5r)',
    'first-grade': '\u00e5rskurs 1 (6\u20137 \u00e5r)',
    'second-grade': '\u00e5rskurs 2 (7\u20138 \u00e5r)',
    'third-grade': '\u00e5rskurs 3 (8\u20139 \u00e5r)',
  };

  const gradeSkills = {
    'preschool': 'F\u00e4rgl\u00e4ggning, r\u00e4kning 1\u201310 och finmotorik',
    'kindergarten': 'R\u00e4kning, bokst\u00e4ver, m\u00f6nster och visuell uppfattning',
    'first-grade': 'Addition, subtraktion, l\u00e4sning och skrivning',
    'second-grade': 'Multiplikation, ordspel, logik och probleml\u00f6sning',
    'third-grade': 'Flerstegsuppgifter, korsord, kryptogram och avancerade \u00f6vningar',
  };

  const themes = fs.readdirSync(baseDir).filter(d => {
    return fs.existsSync(path.join(baseDir, d, 'sv.ts')) &&
           fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let adjusted = 0;

  for (const theme of themes) {
    const filePath = path.join(baseDir, theme, 'sv.ts');
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
          if (descLen < 150 || descLen > 160) {
            let newDesc = oldDesc;
            if (descLen < 150) {
              newDesc = extendDesc(oldDesc, isEsc);
            } else if (descLen > 160) {
              // Try generating a new desc
              newDesc = generateDesc(themeName, grade, gradeDescriptions, gradeSkills, isEsc);
            }
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
        adjusted++;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, content);
      console.log(`  FIXED ${theme}`);
    }
  }

  console.log(`  Theme+grade: ${adjusted} adjusted`);
  totalFixed += adjusted;
}

/** Generate a seoTitle for a theme+grade page targeting 50-60 chars */
function generateTitle(themeName, grade, gradeLabels) {
  const gradeLabel = gradeLabels[grade];

  // Pattern 1: 'Gratis {Name}-\u00f6vningar {Grade} | LessonCraftStudio'
  let title = `Gratis ${themeName}-\u00f6vningar ${gradeLabel} | LessonCraftStudio`;
  let len = title.length;
  if (len >= 50 && len <= 60) return title;

  // Pattern 2: drop 'Gratis ' if too long
  if (len > 60) {
    title = `${themeName}-\u00f6vningar ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 3: even shorter
    title = `${themeName} ${gradeLabel} \u00d6vningar | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;
  }

  // Pattern 4: if too short, add 'Utskrivbara '
  if (len < 50) {
    title = `Gratis Utskrivbara ${themeName}-\u00f6vningar ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 5: add '\u2014 PDF' at end
    title = `Gratis ${themeName}-\u00f6vningar ${gradeLabel} \u2014 PDF | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 6: add 'Utskrivbara' and drop '-\u00f6vningar'
    title = `Gratis Utskrivbara ${themeName} ${gradeLabel} | LessonCraftStudio`;
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
  let desc = `Utskrivbara ${lowerName}-\u00f6vningar f\u00f6r ${gradeDesc}. ${skills}. 33 generatorer. Gratis PDF.`;
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
    desc = `Utskrivbara ${lowerName}-\u00f6vningar f\u00f6r ${gradeDesc}. ${skills}. Gratis PDF.`;
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  // Try a different template with more detail
  if (dLen(desc) < 150) {
    desc = `Gratis utskrivbara ${lowerName}-\u00f6vningar f\u00f6r ${gradeDesc}. ${skills}. 33 generatorer. Ladda ner PDF direkt.`;
    len = desc.length;
    if (len >= 150 && len <= 160) return desc;
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  // Final fallback: longer template
  if (dLen(desc) < 150) {
    desc = `Utskrivbara ${lowerName}-arbetsblad f\u00f6r ${gradeDesc}. ${skills}. 33 generatorer med 3 000+ bilder. Gratis PDF. Ingen registrering.`;
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

  // Hand-crafted fixes for each category's sv: block
  const categoryFixes = {
    'math': {
      oldTitle: 'Gratis mattearbetsblad \\u2014 skapa och skriv ut',
      newTitle: 'Gratis Utskrivbara Mattearbetsblad f\\u00f6r Barn \\u2014 Skriv Ut',
      oldDesc: 'Skapa utskrivbara mattearbetsblad f\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3. Addition, subtraktion, sifferpussel och r\\u00e4kne\\u00f6vningar \\u2014 klara p\\u00e5 sekunder.',
      newDesc: 'Skapa utskrivbara mattearbetsblad f\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3. Addition, subtraktion, sifferpussel och r\\u00e4kne\\u00f6vningar \\u2014 klara p\\u00e5 sekunder. Ingen registrering.',
    },
    'language-arts': {
      oldTitle: 'Spr\\u00e5k\\u00f6vningar f\\u00f6r barn \\u2014 gratis arbetsblad',
      newTitle: 'Gratis Utskrivbara Spr\\u00e5k\\u00f6vningar f\\u00f6r Barn \\u2014 PDF Arbetsblad',
      oldDesc: 'Skapa utskrivbara spr\\u00e5karbetsblad: alfabet, ordpussel, prepositioner och skriv\\u00f6vningar. F\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3 \\u2014 klara p\\u00e5 sekunder.',
      newDesc: 'Skapa utskrivbara spr\\u00e5karbetsblad: alfabet, ordpussel, prepositioner och skriv\\u00f6vningar. F\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3 \\u2014 klara p\\u00e5 sekunder. 3 000+ bilder.',
    },
    'word-games': {
      oldTitle: 'Ordspel f\\u00f6r barn \\u2014 utskrivbara pussel',
      newTitle: 'Gratis Utskrivbara Ordspel & Pussel f\\u00f6r Barn \\u2014 PDF',
      oldDesc: 'Skapa utskrivbara ordspel: ords\\u00f6kningar, bildkorsord, ordgissning och bildkryptogram. Gratis och klara p\\u00e5 sekunder.',
      newDesc: 'Skapa utskrivbara ordspel: ords\\u00f6kningar, bildkorsord, ordgissning och bildkryptogram. Gratis och klara p\\u00e5 sekunder. V\\u00e4lj bland 3 000+ tematiska bilder.',
    },
    'art-creativity': {
      oldTitle: 'M\\u00e5larbilder & teckningsblad f\\u00f6r barn',
      newTitle: 'Gratis M\\u00e5larbilder & Teckningsblad f\\u00f6r Barn \\u2014 Skriv Ut',
      oldDesc: 'Skapa utskrivbara m\\u00e5larbilder och guidade teckningsblad f\\u00f6r barn. Temaillustrationer och kreativa aktiviteter \\u2014 gratis och klara p\\u00e5 sekunder.',
      newDesc: 'Skapa utskrivbara m\\u00e5larbilder och guidade teckningsblad f\\u00f6r barn. Temaillustrationer och kreativa aktiviteter \\u2014 gratis och klara p\\u00e5 sekunder. Ladda ner nu.',
    },
    'logic-puzzles': {
      oldTitle: 'Logikpussel & tankn\\u00f6tter f\\u00f6r barn',
      newTitle: 'Gratis Utskrivbara Logikpussel & Tankn\\u00f6tter f\\u00f6r Barn \\u2014 PDF',
      oldDesc: 'Skapa utskrivbara logikpussel: sudoku, vilken h\\u00f6r inte hemma, bildv\\u00e4gar och skattjakter. Bygg kritiskt t\\u00e4nkande \\u2014 gratis och klart p\\u00e5 sekunder.',
      newDesc: 'Skapa utskrivbara logikpussel: sudoku, vilken h\\u00f6r inte hemma, bildv\\u00e4gar och skattjakter. Bygg kritiskt t\\u00e4nkande \\u2014 gratis och klart p\\u00e5 sekunder. Ladda ner nu.',
    },
    'visual-perception': {
      oldTitle: 'Visuell perception \\u2014 arbetsblad f\\u00f6r barn',
      newTitle: 'Gratis Visuell Perception Arbetsblad f\\u00f6r Barn \\u2014 Skriv Ut',
      oldDesc: 'Skapa utskrivbara arbetsblad f\\u00f6r visuell perception: s\\u00f6k och r\\u00e4kna, g\\u00f6mda f\\u00f6rem\\u00e5l och saknade pusselbitar. Sk\\u00e4rp observationsf\\u00f6rm\\u00e5gan \\u2014 gratis.',
      newDesc: 'Skapa utskrivbara arbetsblad f\\u00f6r visuell perception: s\\u00f6k och r\\u00e4kna, g\\u00f6mda f\\u00f6rem\\u00e5l och saknade pusselbitar. Sk\\u00e4rp observationsf\\u00f6rm\\u00e5gan \\u2014 gratis. Ladda ner nu.',
    },
    'matching-sorting': {
      oldTitle: 'Para ihop & sortera \\u2014 Gratis utskrivbara arbetsblad f\\u00f6r barn',
      newTitle: 'Para Ihop & Sortera \\u2014 Utskrivbara Arbetsblad f\\u00f6r Barn',
      oldDesc: 'Gratis arbetsblad f\\u00f6r att para ihop och sortera. Tr\\u00e4na klassificering, j\\u00e4mf\\u00f6relse och visuell urskilning fr\\u00e5n f\\u00f6rskola till \\u00e5rskurs 3.',
      newDesc: 'Gratis arbetsblad f\\u00f6r att para ihop och sortera. Tr\\u00e4na klassificering, j\\u00e4mf\\u00f6relse och visuell urskilning fr\\u00e5n f\\u00f6rskola till \\u00e5rskurs 3. Ingen registrering.',
    },
    'patterns-motor': {
      oldTitle: 'M\\u00f6nster- & finmotorik-arbetsblad \\u2014 Gratis sp\\u00e5rnings\\u00f6vningar',
      newTitle: 'Gratis M\\u00f6nster & Finmotorik Arbetsblad \\u2014 Skriv Ut PDF',
      oldDesc: 'Skapa gratis arbetsblad f\\u00f6r m\\u00f6nsterig\\u00e4nk\\u00e4nning och finmotorik. Sp\\u00e5rning, f\\u00f6ljder och \\u00f6ga-hand-koordination f\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3.',
      newDesc: 'Skapa gratis arbetsblad f\\u00f6r m\\u00f6nsterig\\u00e4nk\\u00e4nning och finmotorik. Sp\\u00e5rning, f\\u00f6ljder och \\u00f6ga-hand-koordination f\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3. 3 000+ bilder.',
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
      oldTitle: 'F\\u00f6rskolearbetsblad 3\\u20134 \\u00e5r \\u2014 Gratis utskrivbara',
      newTitle: 'Gratis Utskrivbara F\\u00f6rskolearbetsblad 3\\u20134 \\u00c5r \\u2014 PDF',
      oldDesc: 'Gratis utskrivbara f\\u00f6rskolearbetsblad f\\u00f6r barn 3\\u20134 \\u00e5r. F\\u00e4rgl\\u00e4ggning, sp\\u00e5rning, koppling, m\\u00f6nster och storleksj\\u00e4mf\\u00f6relse f\\u00f6r tidig inl\\u00e4rning.',
      newDesc: 'Gratis utskrivbara f\\u00f6rskolearbetsblad f\\u00f6r barn 3\\u20134 \\u00e5r. F\\u00e4rgl\\u00e4ggning, sp\\u00e5rning, koppling, m\\u00f6nster och storleksj\\u00e4mf\\u00f6relse f\\u00f6r tidig inl\\u00e4rning. Ladda ner nu.',
    },
    'kindergarten': {
      oldTitle: 'Arbetsblad f\\u00f6rskoleklass 5\\u20136 \\u00e5r \\u2014 Gratis',
      newTitle: 'Gratis Utskrivbara Arbetsblad F\\u00f6rskoleklass 5\\u20136 \\u00c5r \\u2014 PDF',
      oldDesc: 'Gratis utskrivbara arbetsblad f\\u00f6r f\\u00f6rskoleklass, 5\\u20136 \\u00e5r. Addition, alfabet, ords\\u00f6k, f\\u00e4rgl\\u00e4ggning, r\\u00e4kning, m\\u00f6nster.',
      newDesc: 'Gratis utskrivbara arbetsblad f\\u00f6r f\\u00f6rskoleklass, 5\\u20136 \\u00e5r. Addition, alfabet, ords\\u00f6k, f\\u00e4rgl\\u00e4ggning, r\\u00e4kning, m\\u00f6nster. V\\u00e4lj bland 3 000+ tematiska bilder.',
    },
    'first-grade': {
      oldTitle: 'Arbetsblad \\u00e5rskurs 1 (6\\u20137 \\u00e5r) \\u2014 Gratis',
      newTitle: 'Gratis Utskrivbara Arbetsblad \\u00c5rskurs 1 (6\\u20137 \\u00c5r) \\u2014 PDF',
      oldDesc: 'Gratis utskrivbara arbetsblad f\\u00f6r \\u00e5rskurs 1, 6\\u20137 \\u00e5r. R\\u00e4kning, subtraktion, bokstavsf\\u00f6rvriding, korsord, sudoku, g\\u00f6mda objekt.',
      newDesc: 'Gratis utskrivbara arbetsblad f\\u00f6r \\u00e5rskurs 1, 6\\u20137 \\u00e5r. R\\u00e4kning, subtraktion, bokstavsf\\u00f6rvriding, korsord, sudoku, g\\u00f6mda objekt. Ingen registrering kr\\u00e4vs.',
    },
    'second-grade': {
      oldTitle: 'Arbetsblad \\u00e5rskurs 2 (7\\u20138 \\u00e5r) \\u2014 Gratis',
      newTitle: 'Gratis Utskrivbara Arbetsblad \\u00c5rskurs 2 (7\\u20138 \\u00c5r) \\u2014 PDF',
      oldDesc: 'Gratis utskrivbara arbetsblad f\\u00f6r \\u00e5rskurs 2, 7\\u20138 \\u00e5r. Mattepussel, kodaddition, ordgissning, kryptogram, udda-ut, bildv\\u00e4gar.',
      newDesc: 'Gratis utskrivbara arbetsblad f\\u00f6r \\u00e5rskurs 2, 7\\u20138 \\u00e5r. Mattepussel, kodaddition, ordgissning, kryptogram, udda-ut, bildv\\u00e4gar. Ladda ner och skriv ut direkt.',
    },
    'third-grade': {
      oldTitle: '\\u00c5rskurs 3 Arbetsblad \\u2014 Matte, Pyssel & Logik',
      newTitle: 'Gratis \\u00c5rskurs 3 Arbetsblad \\u2014 Matte, Pyssel & Logik \\u2014 PDF',
      oldDesc: 'Gratis arbetsblad f\\u00f6r \\u00e5rskurs 3: matte, sudoku, logiska pussel och kritiskt t\\u00e4nkande. Ladda ner som PDF direkt f\\u00f6r skola eller hemma.',
      newDesc: 'Gratis arbetsblad f\\u00f6r \\u00e5rskurs 3: matte, sudoku, logiska pussel och kritiskt t\\u00e4nkande. Ladda ner som PDF direkt f\\u00f6r skola eller hemma. Ingen registrering.',
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

  // 1. Homepage — title 49\u219257 (add "f\u00f6r Barn")
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const oldHomepageTitle = 'Gratis Arbetsblad Generatorer | LessonCraftStudio';
    const newHomepageTitle = 'Gratis Arbetsblad Generatorer f\u00f6r Barn | LessonCraftStudio';
    if (content.includes(oldHomepageTitle)) {
      content = content.replace(oldHomepageTitle, newHomepageTitle);
      console.log(`  homepage: title 49\u2192${dLen(newHomepageTitle)}`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 2. Apps page — title 76\u2192\u226460, desc 141\u2192150+
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/apps/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten from ~76 to \u226460
    const oldAppsTitle = isEsc
      ? '33 Gratis Arbetsblad Generatorer | Matte, Spr\\u00e5k, Pussel | LessonCraftStudio'
      : '33 Gratis Arbetsblad Generatorer | Matte, Spr\u00e5k, Pussel | LessonCraftStudio';
    const newAppsTitle = isEsc
      ? '33 Arbetsblad Generatorer \\u2014 Gratis PDF | LessonCraftStudio'
      : '33 Arbetsblad Generatorer \u2014 Gratis PDF | LessonCraftStudio';
    if (content.includes(oldAppsTitle)) {
      content = content.replace(oldAppsTitle, newAppsTitle);
      console.log(`  apps: title \u2192${dLen(newAppsTitle)}`);
      changed = true;
    }

    // Fix desc: extend from ~141 to 150+
    const oldAppsDescPart = isEsc
      ? 'Ladda ner utskrivbara PDFer direkt.'
      : 'Ladda ner utskrivbara PDFer direkt.';
    const newAppsDescPart = isEsc
      ? 'Ladda ner utskrivbara PDFer direkt. Ingen registrering.'
      : 'Ladda ner utskrivbara PDFer direkt. Ingen registrering.';
    if (content.includes(oldAppsDescPart) && !content.includes(newAppsDescPart)) {
      content = content.replace(oldAppsDescPart, newAppsDescPart);
      console.log(`  apps: desc extended`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 3. Worksheets page — title OK (~51), desc ~185\u2192\u2264160 (shorten)
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/worksheets/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix desc: shorten from ~185 to \u2264160
    const oldWsDesc = isEsc
      ? 'Bl\\u00e4ddra bland 50 tematiska arbetsbladssamlingar f\\u00f6r barn. Djur, dinosaurier, rymden, havet och mer. Gratis matte-, l\\u00e4s-, m\\u00e5lar- och pusselaktiviteter f\\u00f6r f\\u00f6rskola till \\u00e5rskurs 3.'
      : 'Bl\u00e4ddra bland 50 tematiska arbetsbladssamlingar f\u00f6r barn. Djur, dinosaurier, rymden, havet och mer. Gratis matte-, l\u00e4s-, m\u00e5lar- och pusselaktiviteter f\u00f6r f\u00f6rskola till \u00e5rskurs 3.';
    const newWsDesc = isEsc
      ? 'Utforska 50 tematiska arbetsbladssamlingar f\\u00f6r barn. Djur, dinosaurier, rymden och mer. Gratis matte-, l\\u00e4s- och pusselaktiviteter. F\\u00f6rskola till \\u00e5rskurs 3.'
      : 'Utforska 50 tematiska arbetsbladssamlingar f\u00f6r barn. Djur, dinosaurier, rymden och mer. Gratis matte-, l\u00e4s- och pusselaktiviteter. F\u00f6rskola till \u00e5rskurs 3.';
    if (content.includes(oldWsDesc)) {
      content = content.replace(oldWsDesc, newWsDesc);
      console.log(`  worksheets: desc \u2192${dLen(newWsDesc)}`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 4. Pricing page — title 79\u2192\u226460, desc 171\u2192\u2264160
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/pricing/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten
    const oldPriceTitle = isEsc
      ? 'Priser: Gratis, $15/m\\u00e5nad Grund & $25/m\\u00e5nad Full \\u00c5tkomst | LessonCraftStudio'
      : 'Priser: Gratis, $15/m\u00e5nad Grund & $25/m\u00e5nad Full \u00c5tkomst | LessonCraftStudio';
    const newPriceTitle = isEsc
      ? 'Priser \\u2014 Gratis & Premium Planer | LessonCraftStudio'
      : 'Priser \u2014 Gratis & Premium Planer | LessonCraftStudio';
    if (content.includes(oldPriceTitle)) {
      content = content.replace(oldPriceTitle, newPriceTitle);
      console.log(`  pricing: title \u2192${dLen(newPriceTitle)}`);
      changed = true;
    }

    // Fix desc: shorten from ~171 to \u2264160
    const oldPriceDescPart = isEsc
      ? 'Gratis ordjakts-generator,'
      : 'Gratis ordjakts-generator,';
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

  // 5. Blog listing page — title 87\u2192\u226460, desc 142\u2192150+
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/blog/(listing)/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten
    const oldBlogTitle = isEsc
      ? 'Undervisningsmaterial & Arbetsbladstips Blogg | 100+ Expertartiklar | LessonCraftStudio'
      : 'Undervisningsmaterial & Arbetsbladstips Blogg | 100+ Expertartiklar | LessonCraftStudio';
    const newBlogTitle = isEsc
      ? 'Utbildningsblogg \\u2014 Arbetsbladstips | LessonCraftStudio'
      : 'Utbildningsblogg \u2014 Arbetsbladstips | LessonCraftStudio';
    if (content.includes(oldBlogTitle)) {
      content = content.replace(oldBlogTitle, newBlogTitle);
      console.log(`  blog: title \u2192${dLen(newBlogTitle)}`);
      changed = true;
    }

    // Fix desc: extend from ~142 to 150+
    const oldBlogDescEnd = isEsc
      ? 'Guider f\\u00f6r l\\u00e4rare och f\\u00f6r\\u00e4ldrar.'
      : 'Guider f\u00f6r l\u00e4rare och f\u00f6r\u00e4ldrar.';
    const newBlogDescEnd = isEsc
      ? 'Guider f\\u00f6r l\\u00e4rare och f\\u00f6r\\u00e4ldrar. Ladda ner nu.'
      : 'Guider f\u00f6r l\u00e4rare och f\u00f6r\u00e4ldrar. Ladda ner nu.';
    if (content.includes(oldBlogDescEnd) && !content.includes(newBlogDescEnd)) {
      content = content.replace(oldBlogDescEnd, newBlogDescEnd);
      console.log(`  blog: desc extended`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 6. Contact page — add sv: metadata block
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/contact/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if sv: block already exists in contactPageMeta
    const hasSvBlock = /sv:\s*\{[^}]*title:/.test(content);

    if (!hasSvBlock) {
      // Add sv: block after the no: block
      const noBlockEnd = /no:\s*\{[^}]*\},?\s*\n/;
      const noMatch = content.match(noBlockEnd);
      if (noMatch) {
        const svBlock = `  sv: {\n    title: 'Kontakta Oss \\u2014 F\\u00e5 Hj\\u00e4lp & Support | LessonCraftStudio',\n    description: 'Kontakta LessonCraftStudio f\\u00f6r fr\\u00e5gor om arbetsblad, prenumerationer eller teknisk support. Vi svarar inom 24 timmar. Gratis hj\\u00e4lp f\\u00f6r l\\u00e4rare och f\\u00f6r\\u00e4ldrar.',\n    keywords: 'kontakta LessonCraftStudio, support, hj\\u00e4lp, fr\\u00e5gor, kundtj\\u00e4nst, l\\u00e4rarverktyg support',\n  },\n`;
        content = content.replace(noMatch[0], noMatch[0] + svBlock);
        fs.writeFileSync(filePath, content);
        console.log(`  contact: added sv: block`);
        fixed++;
      } else {
        warnings.push('contact: could not find no: block insertion point');
      }
    } else {
      console.log(`  contact: sv: block already exists`);
    }
  }

  console.log(`  Navigation pages: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

function main() {
  console.log('=== SEO Part 301: SV Content Quality Fix ===');
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
