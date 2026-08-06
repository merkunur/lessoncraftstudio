#!/usr/bin/env node
/**
 * SEO Part 334: Fix NL content quality issues
 *
 * Fixes ALL Dutch pages to pass the validator at 50-60 title / 150-160 desc:
 *   Section 1: Product pages (33 files) — titles, descs
 *   Section 2: Theme hubs (50 files) — titles, descs
 *   Section 3: Theme+grade (250 entries in 50 files) — adjust seoTitles, seoDescriptions
 *   Section 4: Category hubs (8 entries in 1 file)
 *   Section 5: Grade hubs (5 entries in 1 file)
 *   Section 6: Navigation pages (6 pages in 5 files)
 *
 * Usage: node scripts/fix-nl-seo-lengths.js
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
  ' Download.',
  ' Print uit.',
  ' Gratis PDF.',
  ' Download nu.',
  ' Print direct uit.',
  ' 3.000+ afbeeldingen.',
  ' Geen registratie.',
  ' Download gratis PDF nu.',
  ' 3.000+ thematische afbeeldingen.',
  ' Kies uit 3.000+ afbeeldingen.',
  ' Geen registratie nodig.',
  ' Download en print direct uit.',
  ' Kies thema en download gratis PDF.',
  ' 3.000+ afbeeldingen. Geen registratie.',
  ' Kies uit 3.000+ thematische afbeeldingen.',
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

/** Shorten a description to <=160 chars by truncating at last sentence boundary */
function shortenDesc(rawDesc, isEscaped) {
  const currentLen = dLen(rawDesc);
  if (currentLen <= 160) return rawDesc;

  const decoded = unescape(rawDesc);
  // Find last period within 160 chars
  let cutPoint = -1;
  for (let i = Math.min(159, decoded.length - 1); i >= 140; i--) {
    if (decoded[i] === '.') {
      cutPoint = i + 1;
      break;
    }
  }

  if (cutPoint > 0) {
    const shortened = decoded.substring(0, cutPoint);
    if (shortened.length >= 150 && shortened.length <= 160) {
      return isEscaped ? encode(shortened) : shortened;
    }
  }

  return rawDesc;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: PRODUCT PAGES (33 files)
// ═══════════════════════════════════════════════════════════════════════════════

function fixProductPages() {
  console.log('\n=== SECTION 1: PRODUCT PAGES ===');
  const dir = path.join(ROOT, 'frontend/content/product-pages/nl');
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

      const descLen = dLen(newDesc);
      if (descLen < 150) {
        newDesc = extendDesc(newDesc, isEsc);
        if (dLen(newDesc) >= 150) {
          changes.push(`desc ${descLen}\u2192${dLen(newDesc)}`);
        }
      } else if (descLen > 160) {
        newDesc = shortenDesc(newDesc, isEsc);
        if (dLen(newDesc) <= 160 && newDesc !== oldDesc) {
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

      if (titleLen > 60) {
        // Too long — try removing "voor Kinderen " or "Gratis "
        let newTitle = oldTitle;
        const decoded = unescape(oldTitle);
        if (decoded.includes('voor Kinderen ')) {
          newTitle = oldTitle.replace('voor Kinderen ', '');
        } else if (decoded.startsWith('Gratis ')) {
          newTitle = oldTitle.replace('Gratis ', '');
        }
        const newLen = dLen(newTitle);
        if (newLen >= 50 && newLen <= 60 && newTitle !== oldTitle) {
          content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
          changes.push(`title ${titleLen}\u2192${newLen}`);
        } else {
          warnings.push(`${slug}: title too long (${titleLen})`);
        }
      } else if (titleLen < 50) {
        let newTitle = oldTitle;
        const decoded = unescape(oldTitle);

        // Strategy 1: Insert "voor Kinderen " before "| LessonCraftStudio"
        if (newTitle.includes('Generator | LessonCraftStudio')) {
          newTitle = newTitle.replace(
            'Generator | LessonCraftStudio',
            'Generator voor Kinderen | LessonCraftStudio'
          );
        } else if (newTitle.includes('| LessonCraftStudio') && !decoded.startsWith('Gratis ')) {
          newTitle = 'Gratis ' + newTitle;
        } else if (newTitle.includes('| LessonCraftStudio')) {
          newTitle = newTitle.replace(
            '| LessonCraftStudio',
            'voor Kinderen | LessonCraftStudio'
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
          // Still short — try adding "Uitprintbare "
          if (decoded.startsWith('Gratis ')) {
            newTitle = newTitle.replace('Gratis ', 'Gratis Uitprintbare ');
          } else {
            newTitle = 'Gratis Uitprintbare ' + newTitle;
          }
          const nl3 = dLen(newTitle);
          if (nl3 >= 50 && nl3 <= 60) {
            content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
            changes.push(`title ${titleLen}\u2192${nl3}`);
          } else {
            // Try "— PDF" before pipe
            newTitle = oldTitle.replace('| LessonCraftStudio', '\u2014 PDF | LessonCraftStudio');
            const nl4 = dLen(newTitle);
            if (nl4 >= 50 && nl4 <= 60) {
              content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
              changes.push(`title ${titleLen}\u2192${nl4}`);
            } else {
              warnings.push(`${slug}: title fix failed (${titleLen}\u2192${nl3}/${nl4})`);
            }
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
    return fs.existsSync(path.join(baseDir, d, 'nl.ts')) &&
           fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let fixed = 0;

  for (const theme of themes) {
    const filePath = path.join(baseDir, theme, 'nl.ts');
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

      if (titleLen > 60) {
        let newTitle = oldTitle;
        // Try removing "voor Kinderen"
        if (newTitle.includes('voor Kinderen ')) {
          newTitle = newTitle.replace('voor Kinderen ', '');
        } else if (newTitle.includes('-oefeningen')) {
          // Shorten by removing "-oefeningen" and using "Werkbladen"
          newTitle = newTitle.replace('-oefeningen voor Kinderen', ' Werkbladen');
        }

        const newLen = dLen(newTitle);
        if (newLen >= 50 && newLen <= 60 && newTitle !== oldTitle) {
          content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
          changes.push(`title ${titleLen}\u2192${newLen}`);
        } else if (newLen < 50) {
          // Try "Gratis X Werkbladen | LessonCraftStudio"
          warnings.push(`${theme}: hub title fix undershot (${titleLen}\u2192${newLen})`);
        } else if (newLen > 60) {
          warnings.push(`${theme}: hub title still long (${titleLen}\u2192${newLen})`);
        }
      }

      if (titleLen < 50) {
        let newTitle = oldTitle;

        // Insert "Uitprintbare " after "Gratis "
        if (newTitle.startsWith('Gratis ')) {
          newTitle = 'Gratis Uitprintbare ' + newTitle.substring(7);
        } else {
          newTitle = 'Gratis Uitprintbare ' + newTitle;
        }

        const newLen = dLen(newTitle);
        if (newLen >= 50 && newLen <= 60) {
          content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
          changes.push(`title ${titleLen}\u2192${newLen}`);
        } else if (newLen > 60) {
          // Try just "Gratis " prefix
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
            // Insert "voor Kinderen" before pipe
            newTitle = oldTitle.replace('| LessonCraftStudio', 'voor Kinderen | LessonCraftStudio');
            const nl3 = dLen(newTitle);
            if (nl3 >= 50 && nl3 <= 60) {
              content = content.replace(titleMatch[0], titleMatch[1] + newTitle + titleMatch[3]);
              changes.push(`title ${titleLen}\u2192${nl3}`);
            } else {
              warnings.push(`${theme}: hub title fix failed (${titleLen}\u2192${nl3})`);
            }
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

      if (descLen > 160) {
        const newDesc = shortenDesc(oldDesc, isEsc);
        const newLen = dLen(newDesc);
        if (newLen >= 150 && newLen <= 160 && newDesc !== oldDesc) {
          content = content.replace(descMatch[0], descMatch[1] + newDesc + descMatch[3]);
          changes.push(`desc ${descLen}\u2192${newLen}`);
        } else {
          warnings.push(`${theme}: hub desc shorten failed (${descLen}\u2192${newLen})`);
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
    'preschool': 'Kleuterschool',
    'kindergarten': 'Groep 1-2',
    'first-grade': 'Groep 3',
    'second-grade': 'Groep 4',
    'third-grade': 'Groep 5',
  };

  const gradeDescriptions = {
    'preschool': 'kleuters (3\u20134 jaar)',
    'kindergarten': 'groep 1-2 (5\u20136 jaar)',
    'first-grade': 'groep 3 (6\u20137 jaar)',
    'second-grade': 'groep 4 (7\u20138 jaar)',
    'third-grade': 'groep 5 (8\u20139 jaar)',
  };

  const gradeSkills = {
    'preschool': 'Kleuren, tellen tot 10 en fijne motoriek',
    'kindergarten': 'Tellen, letters, patronen en visuele waarneming',
    'first-grade': 'Optellen, aftrekken, lezen en schrijven',
    'second-grade': 'Vermenigvuldigen, woordspellen, logica en probleemoplossing',
    'third-grade': 'Meerstapsopdrachten, kruiswoorden, cryptogrammen en gevorderde oefeningen',
  };

  const themes = fs.readdirSync(baseDir).filter(d => {
    return fs.existsSync(path.join(baseDir, d, 'nl.ts')) &&
           fs.statSync(path.join(baseDir, d)).isDirectory();
  }).sort();

  let adjusted = 0;

  for (const theme of themes) {
    const filePath = path.join(baseDir, theme, 'nl.ts');
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
  const lowerName = themeName.toLowerCase();

  // Pattern 1: 'Gratis {Name}-oefeningen {Grade} | LessonCraftStudio'
  let title = `Gratis ${themeName}-oefeningen ${gradeLabel} | LessonCraftStudio`;
  let len = title.length;
  if (len >= 50 && len <= 60) return title;

  // Pattern 2: drop 'Gratis ' if too long
  if (len > 60) {
    title = `${themeName}-oefeningen ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 3: even shorter
    title = `${themeName} ${gradeLabel} Oefeningen | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 3b: use lower name
    title = `${lowerName} ${gradeLabel} Oefeningen | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;
  }

  // Pattern 4: if too short, add 'Uitprintbare '
  if (len < 50) {
    title = `Gratis Uitprintbare ${themeName}-oefeningen ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 5: add '\u2014 PDF' at end
    title = `Gratis ${themeName}-oefeningen ${gradeLabel} \u2014 PDF | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 6: add 'Uitprintbare' and drop '-oefeningen'
    title = `Gratis Uitprintbare ${themeName} ${gradeLabel} | LessonCraftStudio`;
    len = title.length;
    if (len >= 50 && len <= 60) return title;

    // Pattern 7: 'Gratis {Name} Werkbladen {Grade} | LessonCraftStudio'
    title = `Gratis ${themeName} Werkbladen ${gradeLabel} | LessonCraftStudio`;
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
  let desc = `Uitprintbare ${lowerName}-oefeningen voor ${gradeDesc}. ${skills}. 33 generatoren. Gratis PDF.`;
  let len = desc.length;

  if (len >= 150 && len <= 160) return desc;

  if (len < 150) {
    // Try extending with padding
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  if (len > 160) {
    // Try shorter version without '33 generatoren. '
    desc = `Uitprintbare ${lowerName}-oefeningen voor ${gradeDesc}. ${skills}. Gratis PDF.`;
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  // Try a different template with more detail
  if (dLen(desc) < 150) {
    desc = `Gratis uitprintbare ${lowerName}-oefeningen voor ${gradeDesc}. ${skills}. 33 generatoren. Download PDF direct.`;
    len = desc.length;
    if (len >= 150 && len <= 160) return desc;
    desc = extendDesc(desc, isEsc);
    len = dLen(desc);
    if (len >= 150 && len <= 160) return desc;
  }

  // Final fallback: longer template
  if (dLen(desc) < 150) {
    desc = `Uitprintbare ${lowerName}-werkbladen voor ${gradeDesc}. ${skills}. 33 generatoren met 3.000+ afbeeldingen. Gratis PDF. Geen registratie.`;
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

  // Hand-crafted fixes for each category's nl: block
  const categoryFixes = {
    'math': {
      oldTitle: 'Gratis rekenwerkbladen maken',
      newTitle: 'Gratis Uitprintbare Rekenwerkbladen voor Kinderen Maken',
      oldDesc: 'Maak printbare rekenwerkbladen voor kleuters tot en met groep 5. Optellen, aftrekken, cijferpuzzels en telactiviteiten \\u2014 in seconden klaar.',
      newDesc: 'Maak printbare rekenwerkbladen voor kleuters tot en met groep 5. Optellen, aftrekken, cijferpuzzels en telactiviteiten \\u2014 in seconden klaar. Geen registratie nodig.',
    },
    'language-arts': {
      oldTitle: 'Taalwerkbladen voor kinderen maken',
      newTitle: 'Gratis Uitprintbare Taalwerkbladen voor Kinderen Maken',
      oldDesc: 'Maak printbare taalwerkbladen: alfabet, woordpuzzels, voorzetsels en schrijfoefeningen. Voor kleuters tot en met groep 5 \\u2014 gratis en direct klaar.',
      newDesc: 'Maak printbare taalwerkbladen: alfabet, woordpuzzels, voorzetsels en schrijfoefeningen. Voor kleuters tot en met groep 5 \\u2014 gratis en direct klaar. Download nu.',
    },
    'word-games': {
      oldTitle: 'Woordspelletjes voor kinderen \\u2014 printbaar',
      newTitle: 'Gratis Uitprintbare Woordspelletjes voor Kinderen \\u2014 PDF',
      oldDesc: 'Maak printbare woordpuzzels: woordzoekers, beeldkruiswoorden, woordraadsels en beeldcryptogrammen. Gratis en in seconden klaar.',
      newDesc: 'Maak printbare woordpuzzels: woordzoekers, beeldkruiswoorden, woordraadsels en beeldcryptogrammen. Gratis en in seconden klaar. Kies uit 3.000+ afbeeldingen.',
    },
    'art-creativity': {
      oldTitle: 'Kleurplaten & tekenbladen voor kinderen',
      newTitle: 'Gratis Kleurplaten & Tekenbladen voor Kinderen \\u2014 Print',
      oldDesc: 'Maak printbare kleurplaten en begeleide tekenbladen voor kinderen. Thema-illustraties en creatieve activiteiten \\u2014 gratis en direct klaar.',
      newDesc: 'Maak printbare kleurplaten en begeleide tekenbladen voor kinderen. Thema-illustraties en creatieve activiteiten \\u2014 gratis en direct klaar. Geen registratie.',
    },
    'logic-puzzles': {
      oldTitle: 'Logische puzzels & denkspellen voor kinderen',
      newTitle: 'Gratis Logische Puzzels & Denkspellen voor Kinderen \\u2014 PDF',
      oldDesc: 'Maak printbare logische puzzels: sudoku, vreemde eend, beeldpaden en speurtochten. Stimuleer kritisch denken \\u2014 gratis en direct klaar.',
      newDesc: 'Maak printbare logische puzzels: sudoku, vreemde eend, beeldpaden en speurtochten. Stimuleer kritisch denken \\u2014 gratis en direct klaar. Download nu.',
    },
    'visual-perception': {
      oldTitle: 'Visuele waarneming \\u2014 werkbladen voor kinderen',
      newTitle: 'Gratis Visuele Waarneming Werkbladen voor Kinderen \\u2014 PDF',
      oldDesc: 'Maak printbare werkbladen visuele waarneming: zoek en tel, verborgen voorwerpen en ontbrekende stukjes. Verscherp de observatie \\u2014 gratis en direct.',
      newDesc: 'Maak printbare werkbladen visuele waarneming: zoek en tel, verborgen voorwerpen en ontbrekende stukjes. Verscherp de observatie \\u2014 gratis en direct. Download nu.',
    },
    'matching-sorting': {
      oldTitle: 'Koppel- en sorteerwerkbladen \\u2014 Gratis printbare activiteiten',
      newTitle: 'Gratis Koppel- & Sorteerwerkbladen voor Kinderen \\u2014 PDF',
      oldDesc: 'Gratis koppel- en sorteerwerkbladen voor kinderen. Classificatie, vergelijking en visueel onderscheid van kleutergroep tot en met groep 5.',
      newDesc: 'Gratis koppel- en sorteerwerkbladen voor kinderen. Classificatie, vergelijking en visueel onderscheid van kleutergroep tot en met groep 5. Geen registratie nodig.',
    },
    'patterns-motor': {
      oldTitle: 'Patroon- & fijne motoriek-werkbladen \\u2014 Gratis',
      newTitle: 'Gratis Patroon- & Fijne Motoriek Werkbladen \\u2014 Print PDF',
      oldDesc: 'Maak gratis werkbladen voor patroonherkenning en fijne motoriek. Overtrekken, reeksen en oog-handco\\u00f6rdinatie voor kleuters tot groep 5.',
      newDesc: 'Maak gratis werkbladen voor patroonherkenning en fijne motoriek. Overtrekken, reeksen en oog-handco\\u00f6rdinatie voor kleuters tot groep 5. Geen registratie nodig.',
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
      oldTitle: 'Peuterwerkbladen 3\\u20134 jaar \\u2014 Gratis printbaar',
      newTitle: 'Gratis Uitprintbare Peuterwerkbladen 3\\u20134 Jaar \\u2014 PDF',
      oldDesc: 'Gratis printbare werkbladen voor peuters van 3\\u20134 jaar. Kleuren, overtrekken, koppelen, patronen en groottevergelijking om spelenderwijs te leren.',
      newDesc: 'Gratis printbare werkbladen voor peuters van 3\\u20134 jaar. Kleuren, overtrekken, koppelen, patronen en groottevergelijking om spelenderwijs te leren. Download nu.',
    },
    'kindergarten': {
      oldTitle: 'Werkbladen groep 2 (5\\u20136 jaar) \\u2014 Gratis printbaar',
      newTitle: 'Gratis Uitprintbare Werkbladen Groep 2 (5\\u20136 Jaar) \\u2014 PDF',
      oldDesc: 'Gratis printbare werkbladen voor groep 2, 5\\u20136 jaar. Optellen, alfabet, woordzoeker, kleuren, tellen, patronen.',
      newDesc: 'Gratis printbare werkbladen voor groep 2, 5\\u20136 jaar. Optellen, alfabet, woordzoeker, kleuren, tellen, patronen. Kies uit 3.000+ thematische afbeeldingen.',
    },
    'first-grade': {
      oldTitle: 'Werkbladen groep 3 (6\\u20137 jaar) \\u2014 Gratis reken- en lees',
      newTitle: 'Gratis Werkbladen Groep 3 (6\\u20137 Jaar) \\u2014 Rekenen & Lezen',
      oldDesc: 'Gratis printbare werkbladen voor groep 3, 6\\u20137 jaar. Rekenen, aftrekken, woordpuzzels, kruiswoordraadsels, sudoku, zoekplaatjes.',
      newDesc: 'Gratis printbare werkbladen voor groep 3, 6\\u20137 jaar. Rekenen, aftrekken, woordpuzzels, kruiswoordraadsels, sudoku, zoekplaatjes. Geen registratie nodig.',
    },
    'second-grade': {
      oldTitle: 'Werkbladen groep 4 (7\\u20138 jaar) \\u2014 Gratis',
      newTitle: 'Gratis Uitprintbare Werkbladen Groep 4 (7\\u20138 Jaar) \\u2014 PDF',
      oldDesc: 'Gratis printbare werkbladen voor groep 4, 7\\u20138 jaar. Rekenpuzzels, code-optellen, woordraden, cryptogrammen, de vreemde eend, beeldpaden.',
      newDesc: 'Gratis printbare werkbladen voor groep 4, 7\\u20138 jaar. Rekenpuzzels, code-optellen, woordraden, cryptogrammen, de vreemde eend, beeldpaden. Geen registratie.',
    },
    'third-grade': {
      oldTitle: 'Werkbladen Groep 5 \\u2014 Rekenen, Puzzels & Denkwerk',
      newTitle: 'Gratis Werkbladen Groep 5 \\u2014 Rekenen, Puzzels & Denkwerk',
      oldDesc: 'Gratis werkbladen voor groep 5: rekenen, sudoku, logische puzzels en kritisch denken. Direct downloaden als PDF voor school of thuis.',
      newDesc: 'Gratis werkbladen voor groep 5: rekenen, sudoku, logische puzzels en kritisch denken. Direct downloaden als PDF voor school of thuis. Geen registratie nodig.',
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

  // 1. Homepage — title 47→50+ (add "voor Kinderen")
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const oldHomepageTitle = 'Gratis Werkblad Generatoren | LessonCraftStudio';
    const newHomepageTitle = 'Gratis Werkblad Generatoren voor Kinderen | LessonCraftStudio';
    if (content.includes(oldHomepageTitle)) {
      content = content.replace(oldHomepageTitle, newHomepageTitle);
      console.log(`  homepage: title 47\u2192${dLen(newHomepageTitle)}`);
      changed = true;
    }

    // Fix desc: 149→150+
    const oldHomepageDescEnd = 'Geen registratie nodig.';
    const newHomepageDescEnd = 'Geen registratie nodig. PDF.';
    if (content.includes(oldHomepageDescEnd) && !content.includes(newHomepageDescEnd)) {
      // Only fix in the nl: block context — check it's within nl block
      const nlBlockMatch = content.match(/nl:\s*\{[^}]*Geen registratie nodig\./);
      if (nlBlockMatch) {
        content = content.replace(
          oldHomepageDescEnd,
          newHomepageDescEnd
        );
        console.log(`  homepage: desc extended`);
        changed = true;
      }
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 2. Apps page — title 75→≤60, desc 145→150+
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/apps/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix title: shorten from 75 to ≤60
    const oldAppsTitle = '33 Gratis Werkblad Generatoren | Rekenen, Taal, Puzzels | LessonCraftStudio';
    const newAppsTitle = '33 Werkblad Generatoren \u2014 Gratis PDF | LessonCraftStudio';
    if (content.includes(oldAppsTitle)) {
      content = content.replace(oldAppsTitle, newAppsTitle);
      console.log(`  apps: title \u2192${dLen(newAppsTitle)}`);
      changed = true;
    }

    // Fix desc: extend from 145 to 150+
    const oldAppsDescEnd = 'Download printbare PDFs direct.';
    const newAppsDescEnd = 'Download printbare PDFs direct. Geen registratie.';
    if (content.includes(oldAppsDescEnd) && !content.includes(newAppsDescEnd)) {
      content = content.replace(oldAppsDescEnd, newAppsDescEnd);
      console.log(`  apps: desc extended`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 3. Worksheets page — title OK (57), desc 187→≤160 (shorten)
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/worksheets/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix desc: shorten from 187 to ≤160
    const oldWsDesc = 'Ontdek 50 thematische werkbladverzamelingen voor kinderen. Dieren, dinosaurussen, ruimte, oceaan en meer. Gratis reken-, lees-, kleur- en puzzelactiviteiten van kleuterschool tot groep 5.';
    const newWsDesc = 'Ontdek 50 thematische werkbladverzamelingen voor kinderen. Dieren, dinosaurussen, ruimte en meer. Gratis reken-, lees- en puzzelactiviteiten. Kleuterschool tot groep 5.';
    if (content.includes(oldWsDesc)) {
      content = content.replace(oldWsDesc, newWsDesc);
      console.log(`  worksheets: desc \u2192${dLen(newWsDesc)}`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 4. Pricing page — title 82→≤60, desc 165→≤160
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/pricing/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix title: shorten
    const oldPriceTitle = 'Prijzen: Gratis, $15/maand Basis & $25/maand Volledige Toegang | LessonCraftStudio';
    const newPriceTitle = 'Prijzen \u2014 Gratis & Premium Plannen | LessonCraftStudio';
    if (content.includes(oldPriceTitle)) {
      content = content.replace(oldPriceTitle, newPriceTitle);
      console.log(`  pricing: title \u2192${dLen(newPriceTitle)}`);
      changed = true;
    }

    // Fix desc: shorten from 165 to ≤160
    const oldPriceDesc = 'Kies uw plan: Gratis woordzoeker generator, $15/maand Basispakket met 10 generatoren of $25/maand Volledige Toegang tot alle 33 generatoren. Op elk moment opzegbaar.';
    const newPriceDesc = 'Kies uw plan: Gratis generatoren, $15/maand Basis met 10 tools of $25/maand Volledige Toegang tot alle 33 generatoren. Op elk moment opzegbaar.';
    if (content.includes(oldPriceDesc)) {
      content = content.replace(oldPriceDesc, newPriceDesc);
      console.log(`  pricing: desc \u2192${dLen(newPriceDesc)}`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 5. Blog listing page — title 81→≤60, desc 136→150+
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/blog/(listing)/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const isEsc = usesEscapes(content);

    // Fix title: shorten
    const oldBlogTitle = isEsc
      ? 'Lesmateriaal & Werkblad Tips Blog | 100+ Deskundige Artikelen | LessonCraftStudio'
      : 'Lesmateriaal & Werkblad Tips Blog | 100+ Deskundige Artikelen | LessonCraftStudio';
    const newBlogTitle = isEsc
      ? 'Educatieve Blog \\u2014 Werkblad Tips | LessonCraftStudio'
      : 'Educatieve Blog \u2014 Werkblad Tips | LessonCraftStudio';
    if (content.includes(oldBlogTitle)) {
      content = content.replace(oldBlogTitle, newBlogTitle);
      console.log(`  blog: title \u2192${dLen(newBlogTitle)}`);
      changed = true;
    }

    // Fix desc: extend from 136 to 150+
    const oldBlogDescEnd = isEsc
      ? 'Gidsen voor leraren en ouders.'
      : 'Gidsen voor leraren en ouders.';
    const newBlogDescEnd = isEsc
      ? 'Gidsen voor leraren en ouders. Download gratis PDF nu.'
      : 'Gidsen voor leraren en ouders. Download gratis PDF nu.';
    if (content.includes(oldBlogDescEnd) && !content.includes(newBlogDescEnd)) {
      content = content.replace(oldBlogDescEnd, newBlogDescEnd);
      console.log(`  blog: desc extended`);
      changed = true;
    }

    if (changed) { fs.writeFileSync(filePath, content); fixed++; }
  }

  // 6. Contact page — add nl: metadata block
  {
    const filePath = path.join(ROOT, 'frontend/app/[locale]/contact/page.tsx');
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if nl: block already exists in contactPageMeta
    const hasNlBlock = /nl:\s*\{[^}]*title:/.test(content);

    if (!hasNlBlock) {
      // Add nl: block before the da: block (alphabetical order: da, nl, no, sv)
      const daBlockStart = /(\s*)(da:\s*\{)/;
      const daMatch = content.match(daBlockStart);
      if (daMatch) {
        const indent = daMatch[1];
        const nlBlock = `${indent}nl: {\n${indent}  title: 'Neem Contact Op \\u2014 Hulp & Ondersteuning | LessonCraftStudio',\n${indent}  description: 'Neem contact op met LessonCraftStudio voor vragen over werkbladen, abonnementen of technische ondersteuning. Wij reageren binnen 24 uur. Gratis hulp voor leraren en ouders.',\n${indent}  keywords: 'contact LessonCraftStudio, ondersteuning, hulp, vragen, klantenservice, leerkracht tools support',\n${indent}},\n`;
        content = content.replace(daMatch[0], nlBlock + daMatch[0]);
        fs.writeFileSync(filePath, content);
        console.log(`  contact: added nl: block`);
        fixed++;
      } else {
        // Try inserting after sv: block
        const svBlockEnd = /sv:\s*\{[^}]*\},?\s*\n/;
        const svMatch = content.match(svBlockEnd);
        if (svMatch) {
          const nlBlock = `  nl: {\n    title: 'Neem Contact Op \\u2014 Hulp & Ondersteuning | LessonCraftStudio',\n    description: 'Neem contact op met LessonCraftStudio voor vragen over werkbladen, abonnementen of technische ondersteuning. Wij reageren binnen 24 uur. Gratis hulp voor leraren en ouders.',\n    keywords: 'contact LessonCraftStudio, ondersteuning, hulp, vragen, klantenservice, leerkracht tools support',\n  },\n`;
          content = content.replace(svMatch[0], svMatch[0] + nlBlock);
          fs.writeFileSync(filePath, content);
          console.log(`  contact: added nl: block (after sv)`);
          fixed++;
        } else {
          warnings.push('contact: could not find insertion point for nl: block');
        }
      }
    } else {
      console.log(`  contact: nl: block already exists`);
    }
  }

  console.log(`  Navigation pages: ${fixed} fixed`);
  totalFixed += fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

function main() {
  console.log('=== SEO Part 334: NL Content Quality Fix ===');
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
