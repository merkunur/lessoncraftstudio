/**
 * Product Page Meta Tag Length Fix Script v2
 *
 * Fixes meta title and description lengths across all 363 product pages.
 * Uses line-by-line parsing for safer replacements.
 *
 * Rules:
 * - Meta Title: 50-70 characters
 * - Meta Description: 150-160 characters
 *
 * Run with: node scripts/fix-product-meta-lengths.js
 * Dry run:  node scripts/fix-product-meta-lengths.js --dry-run
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// SEO Rules
const SEO_RULES = {
  TITLE_MIN: 50,
  TITLE_MAX: 70,
  DESCRIPTION_MIN: 150,
  DESCRIPTION_MAX: 160,
};

// Supported locales
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * Find the line index containing a specific field within seo object
 */
function findSeoFieldLine(lines, fieldName) {
  let inSeo = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Track when we enter/exit seo object
    if (line.startsWith('seo:')) {
      inSeo = true;
      if (line.includes('{')) braceCount++;
    }

    if (inSeo) {
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Check if this line has our field
      const fieldRegex = new RegExp(`^${fieldName}:\\s*['"\`]`);
      if (fieldRegex.test(line)) {
        return i;
      }

      if (braceCount <= 0) {
        inSeo = false;
      }
    }
  }

  return -1;
}

/**
 * Extract the string value from a line like: title: 'Some Title',
 * Handles escaped quotes properly
 */
function extractStringValue(line) {
  // Match title: 'value' or title: "value"
  const singleQuoteMatch = line.match(/:\s*'((?:[^'\\]|\\.)*)'/);
  const doubleQuoteMatch = line.match(/:\s*"((?:[^"\\]|\\.)*)"/);

  if (singleQuoteMatch) {
    return {
      value: singleQuoteMatch[1].replace(/\\'/g, "'"),
      quote: "'",
      raw: singleQuoteMatch[1]
    };
  }
  if (doubleQuoteMatch) {
    return {
      value: doubleQuoteMatch[1].replace(/\\"/g, '"'),
      quote: '"',
      raw: doubleQuoteMatch[1]
    };
  }

  return null;
}

/**
 * Smart title shortening - removes parts intelligently to fit within limit
 */
function shortenTitle(title, maxLength = SEO_RULES.TITLE_MAX) {
  if (title.length <= maxLength) return title;

  let shortened = title;

  // Step 1: Remove brand suffixes
  const suffixPatterns = [
    / \| LessonCraftStudio$/i,
    / \- LessonCraftStudio$/i,
    / \| Free Printables Generator$/i,
    / \| Generator$/i,
    / Generator$/i,
  ];

  for (const pattern of suffixPatterns) {
    if (shortened.length > maxLength && pattern.test(shortened)) {
      shortened = shortened.replace(pattern, '');
    }
  }

  if (shortened.length <= maxLength) return shortened.trim();

  // Step 2: If split by | or -, keep first meaningful part
  if (shortened.includes(' | ') && shortened.length > maxLength) {
    const parts = shortened.split(' | ');
    if (parts[0].length >= 40 && parts[0].length <= maxLength) {
      shortened = parts[0];
    }
  }

  if (shortened.length <= maxLength) return shortened.trim();

  if (shortened.includes(' - ') && shortened.length > maxLength) {
    const parts = shortened.split(' - ');
    if (parts[0].length >= 40 && parts[0].length <= maxLength) {
      shortened = parts[0];
    }
  }

  if (shortened.length <= maxLength) return shortened.trim();

  // Step 3: Final truncation at word boundary
  if (shortened.length > maxLength) {
    shortened = shortened.slice(0, maxLength);
    const lastSpace = shortened.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.6) {
      shortened = shortened.slice(0, lastSpace);
    }
  }

  return shortened.trim();
}

/**
 * Expand a title to meet minimum length
 */
function expandTitle(title, locale, minLength = SEO_RULES.TITLE_MIN) {
  if (title.length >= minLength) return title;

  const brandTags = {
    en: ' | Free Printable Worksheets',
    de: ' | Kostenlose Arbeitsblätter',
    fr: ' | Fiches Gratuites',
    es: ' | Fichas Gratis',
    pt: ' | Planilhas Grátis',
    it: ' | Schede Gratuite',
    nl: ' | Gratis Werkbladen',
    sv: ' | Gratis Arbetsblad',
    da: ' | Gratis Arbejdsark',
    no: ' | Gratis Arbeidsark',
    fi: ' | Ilmaiset Tehtävät',
  };

  let expanded = title.trim() + (brandTags[locale] || brandTags['en']);

  // If still too short, add more
  if (expanded.length < minLength) {
    const extraTags = {
      en: ' for Kids',
      de: ' für Kinder',
      fr: ' pour Enfants',
      es: ' para Niños',
      pt: ' para Crianças',
      it: ' per Bambini',
      nl: ' voor Kinderen',
      sv: ' för Barn',
      da: ' til Børn',
      no: ' for Barn',
      fi: ' Lapsille',
    };
    expanded = title.trim() + (extraTags[locale] || extraTags['en']) + (brandTags[locale] || brandTags['en']);
  }

  return expanded;
}

/**
 * Smart description shortening - preserves complete sentences
 */
function shortenDescription(desc, maxLength = SEO_RULES.DESCRIPTION_MAX) {
  if (desc.length <= maxLength) return desc;

  // Try to find the last sentence that fits
  const sentences = desc.split(/(?<=[.!?])\s+/);
  let result = '';

  for (const sentence of sentences) {
    const potential = result ? result + ' ' + sentence : sentence;
    if (potential.length <= maxLength) {
      result = potential;
    } else {
      break;
    }
  }

  if (result && result.length >= maxLength * 0.85) {
    return result.trim();
  }

  // Truncate at word boundary
  let shortened = desc.slice(0, maxLength);
  const lastSpace = shortened.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.8) {
    shortened = shortened.slice(0, lastSpace);
  }

  // Ensure ends with punctuation
  if (!/[.!?]$/.test(shortened)) {
    shortened = shortened.replace(/,?\s*$/, '.');
  }

  return shortened.trim();
}

/**
 * Expand a description to meet minimum length
 */
function expandDescription(desc, locale, minLength = SEO_RULES.DESCRIPTION_MIN) {
  if (desc.length >= minLength) return desc;

  const expansions = {
    en: ' Perfect for teachers and parents.',
    de: ' Perfekt für Lehrer und Eltern.',
    fr: ' Parfait pour enseignants et parents.',
    es: ' Perfecto para maestros y padres.',
    pt: ' Perfeito para professores e pais.',
    it: ' Perfetto per insegnanti e genitori.',
    nl: ' Perfect voor leraren en ouders.',
    sv: ' Perfekt för lärare och föräldrar.',
    da: ' Perfekt til lærere og forældre.',
    no: ' Perfekt for lærere og foreldre.',
    fi: ' Sopii opettajille ja vanhemmille.',
  };

  let expanded = desc.trim();
  if (!/[.!?]$/.test(expanded)) {
    expanded += '.';
  }

  expanded += (expansions[locale] || expansions['en']);

  // If still too short, add download CTA
  if (expanded.length < minLength) {
    const ctas = {
      en: ' Download PDF now.',
      de: ' Jetzt PDF herunterladen.',
      fr: ' Téléchargez le PDF maintenant.',
      es: ' Descarga el PDF ahora.',
      pt: ' Baixe o PDF agora.',
      it: ' Scarica il PDF ora.',
      nl: ' Download nu PDF.',
      sv: ' Ladda ner PDF nu.',
      da: ' Download PDF nu.',
      no: ' Last ned PDF nå.',
      fi: ' Lataa PDF nyt.',
    };
    expanded += (ctas[locale] || ctas['en']);
  }

  return expanded;
}

/**
 * Escape a string for use in replacement
 */
function escapeForQuote(str, quoteChar) {
  if (quoteChar === "'") {
    return str.replace(/'/g, "\\'");
  }
  return str.replace(/"/g, '\\"');
}

/**
 * Process a single file
 */
function processFile(filePath, locale) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const changes = [];

  // Find and process title
  const titleLineIdx = findSeoFieldLine(lines, 'title');
  if (titleLineIdx >= 0) {
    const extracted = extractStringValue(lines[titleLineIdx]);
    if (extracted) {
      const { value: currentTitle, quote, raw } = extracted;
      let newTitle = currentTitle;

      if (currentTitle.length > SEO_RULES.TITLE_MAX) {
        newTitle = shortenTitle(currentTitle);
        if (newTitle.length > SEO_RULES.TITLE_MAX) {
          newTitle = newTitle.slice(0, SEO_RULES.TITLE_MAX - 3).trim() + '...';
        }
      } else if (currentTitle.length < SEO_RULES.TITLE_MIN) {
        newTitle = expandTitle(currentTitle, locale);
      }

      if (newTitle !== currentTitle) {
        const escapedNew = escapeForQuote(newTitle, quote);
        lines[titleLineIdx] = lines[titleLineIdx].replace(
          `${quote}${raw}${quote}`,
          `${quote}${escapedNew}${quote}`
        );
        changes.push({
          type: 'title',
          action: currentTitle.length > SEO_RULES.TITLE_MAX ? 'shortened' : 'expanded',
          old: currentTitle,
          oldLength: currentTitle.length,
          new: newTitle,
          newLength: newTitle.length,
        });
      }
    }
  }

  // Find and process description
  const descLineIdx = findSeoFieldLine(lines, 'description');
  if (descLineIdx >= 0) {
    const extracted = extractStringValue(lines[descLineIdx]);
    if (extracted) {
      const { value: currentDesc, quote, raw } = extracted;
      let newDesc = currentDesc;

      if (currentDesc.length > SEO_RULES.DESCRIPTION_MAX) {
        newDesc = shortenDescription(currentDesc);
        if (newDesc.length > SEO_RULES.DESCRIPTION_MAX) {
          newDesc = newDesc.slice(0, SEO_RULES.DESCRIPTION_MAX - 3).trim() + '...';
        }
      } else if (currentDesc.length < SEO_RULES.DESCRIPTION_MIN) {
        newDesc = expandDescription(currentDesc, locale);
      }

      if (newDesc !== currentDesc) {
        const escapedNew = escapeForQuote(newDesc, quote);
        lines[descLineIdx] = lines[descLineIdx].replace(
          `${quote}${raw}${quote}`,
          `${quote}${escapedNew}${quote}`
        );
        changes.push({
          type: 'description',
          action: currentDesc.length > SEO_RULES.DESCRIPTION_MAX ? 'shortened' : 'expanded',
          old: currentDesc,
          oldLength: currentDesc.length,
          new: newDesc,
          newLength: newDesc.length,
        });
      }
    }
  }

  return {
    modified: lines.join('\n'),
    changes,
  };
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(80));
  console.log('PRODUCT PAGE META TAG LENGTH FIX v2');
  console.log('Generated:', new Date().toISOString());
  console.log('Mode:', DRY_RUN ? 'DRY RUN (no files modified)' : 'LIVE (files will be modified)');
  console.log('='.repeat(80));
  console.log('');

  const contentDir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');

  const stats = {
    totalFiles: 0,
    filesModified: 0,
    titlesFix: { shortened: 0, expanded: 0 },
    descriptionsFix: { shortened: 0, expanded: 0 },
    errors: [],
  };

  const allChanges = [];

  for (const locale of LOCALES) {
    const localeDir = path.join(contentDir, locale);

    if (!fs.existsSync(localeDir)) {
      console.log(`Skipping ${locale} - directory not found`);
      continue;
    }

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      stats.totalFiles++;

      try {
        const { modified, changes } = processFile(filePath, locale);

        if (changes.length > 0) {
          stats.filesModified++;

          for (const change of changes) {
            if (change.type === 'title') {
              stats.titlesFix[change.action]++;
            } else {
              stats.descriptionsFix[change.action]++;
            }

            allChanges.push({ locale, file, ...change });

            if (VERBOSE) {
              console.log(`[${locale}] ${file}:`);
              console.log(`  ${change.type} ${change.action}: ${change.oldLength} -> ${change.newLength} chars`);
              console.log(`  Old: ${change.old.slice(0, 70)}${change.old.length > 70 ? '...' : ''}`);
              console.log(`  New: ${change.new.slice(0, 70)}${change.new.length > 70 ? '...' : ''}`);
              console.log('');
            }
          }

          if (!DRY_RUN) {
            fs.writeFileSync(filePath, modified, 'utf-8');
          }
        }
      } catch (error) {
        stats.errors.push({ locale, file, error: error.message });
        console.error(`Error processing ${locale}/${file}:`, error.message);
      }
    }
  }

  console.log('');
  console.log('='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log('');
  console.log(`Total Files Processed: ${stats.totalFiles}`);
  console.log(`Files Modified:        ${stats.filesModified}`);
  console.log('');
  console.log('Title Fixes:');
  console.log(`  Shortened: ${stats.titlesFix.shortened}`);
  console.log(`  Expanded:  ${stats.titlesFix.expanded}`);
  console.log('');
  console.log('Description Fixes:');
  console.log(`  Shortened: ${stats.descriptionsFix.shortened}`);
  console.log(`  Expanded:  ${stats.descriptionsFix.expanded}`);
  console.log('');

  if (stats.errors.length > 0) {
    console.log('Errors:');
    stats.errors.forEach(e => console.log(`  - [${e.locale}] ${e.file}: ${e.error}`));
    console.log('');
  }

  const reportPath = './product-meta-fix-report.json';
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    dryRun: DRY_RUN,
    stats,
    changes: allChanges,
  }, null, 2));
  console.log(`Detailed report saved to: ${reportPath}`);

  console.log('');
  console.log('='.repeat(80));
  console.log(DRY_RUN ? 'DRY RUN COMPLETE (no files modified)' : 'FIX COMPLETE');
  console.log('='.repeat(80));

  if (DRY_RUN) {
    console.log('');
    console.log('To apply changes, run without --dry-run flag:');
    console.log('  node scripts/fix-product-meta-lengths.js');
  }

  return stats;
}

main().catch(error => {
  console.error('Fix script failed:', error);
  process.exit(1);
});
