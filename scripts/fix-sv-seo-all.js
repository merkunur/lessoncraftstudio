#!/usr/bin/env node

/**
 * Fix Swedish SEO Issues — All 194 Pages
 *
 * Fixes:
 * 1. titleTag: Adjust to 50-60 chars
 * 2. metaDescription: Adjust to 150-160 chars
 * 3. heroImageAlt: Add missing alt text from hero title
 *
 * Usage:
 *   node scripts/fix-sv-seo-all.js              # Dry run (show changes)
 *   node scripts/fix-sv-seo-all.js --apply      # Apply changes
 *   node scripts/fix-sv-seo-all.js --type app   # Single type
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALE = 'sv';
const args = process.argv.slice(2);
const dryRun = !args.includes('--apply');
const typeFilter = args.includes('--type') ? args[args.indexOf('--type') + 1] : null;

const CONTENT_DIRS = {
  app: path.join(ROOT, 'frontend', 'config', 'app-content', LOCALE),
  tool: path.join(ROOT, 'frontend', 'config', 'tool-content', LOCALE),
  guide: path.join(ROOT, 'frontend', 'config', 'guide-content', LOCALE),
  bundle: path.join(ROOT, 'frontend', 'config', 'bundle-content', LOCALE),
  idea: path.join(ROOT, 'frontend', 'config', 'idea-content', LOCALE),
  start: path.join(ROOT, 'frontend', 'config', 'start-content', LOCALE),
};

// ── Suffixes to pad short titles by type ──
const TITLE_SUFFIXES = {
  app: [' | Skapa och Sälj Online', ' | Skapa Arbetsblad Online', ' — Skapa och Sälj'],
  tool: [' — Gratis Provversion Online', ' — Skapa Online Gratis', ' | Online Verktyg'],
  guide: [' — Komplett Guide för Säljare', ' — Steg-för-Steg Guide', ' | Guide för Säljare'],
  bundle: [' | Komplett Paket för Säljare', ' — Paket för Säljare', ' | Allt-i-Ett Paket'],
  idea: [' | Idéer för Säljare', ' — Nischidéer för Säljare', ' | Printable Affärsidéer'],
  start: [' — Kom Igång Guide', ' | Startguide för Säljare', ' — Guide för Nybörjare'],
};

// ── Meta description padding phrases ──
const META_PADS = [
  ' Prova.',
  ' Online.',
  ' Testa nu.',
  ' Prova idag.',
  ' Prova gratis.',
  ' Skapa online.',
  ' Kom igång nu.',
  ' Köp licens idag.',
  ' Börja skapa idag.',
  ' Ingen registrering.',
  ' Licens tillgänglig.',
  ' Prova gratis online.',
  ' Prova alla funktioner.',
  ' Prova gratis med alla funktioner.',
  ' Prova gratis — ingen registrering.',
  ' Gratis provversion med vattenstämpel.',
  ' Optimerat för kommersiell användning.',
  ' Skapa professionellt material snabbt.',
  ' Alla funktioner ingår i provversionen.',
  ' Perfekt för Etsy, Amazon KDP och Gumroad.',
  ' Prova alla funktioner gratis — köp licens.',
  ' Gratis provversion — ingen registrering krävs.',
];

// ── Helpers ──

function extractField(source, fieldName) {
  // Single-quoted
  const re1 = new RegExp(`(${fieldName}:\\s*)'((?:[^'\\\\]|\\\\.)*)'`);
  const m1 = source.match(re1);
  if (m1) return { value: m1[2], quote: "'", fullMatch: m1[0], prefix: m1[1] };
  // Backtick-quoted
  const re2 = new RegExp(`(${fieldName}:\\s*)\`((?:[^\`\\\\]|\\\\.)*)\``);
  const m2 = source.match(re2);
  if (m2) return { value: m2[2], quote: '`', fullMatch: m2[0], prefix: m2[1] };
  return null;
}

function replaceField(source, fieldName, newValue) {
  const field = extractField(source, fieldName);
  if (!field) return source;
  const escaped = field.quote === "'"
    ? newValue.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    : newValue;
  const replacement = field.prefix + field.quote + escaped + field.quote;
  return source.replace(field.fullMatch, replacement);
}

function resolveEscapes(str) {
  if (!str) return str;
  return str
    .replace(/\\'/g, "'")
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

// ── Title fixes ──

function fixTitleTag(source, type) {
  const field = extractField(source, 'titleTag');
  if (!field) return { source, changed: false };

  const raw = resolveEscapes(field.value);
  const len = raw.length;

  if (len >= 50 && len <= 60) return { source, changed: false };

  let newTitle = raw;

  if (len < 50) {
    // Try suffixes until one fits 50-60
    const suffixes = TITLE_SUFFIXES[type] || TITLE_SUFFIXES.app;
    for (const suffix of suffixes) {
      const candidate = raw + suffix;
      if (candidate.length >= 50 && candidate.length <= 60) {
        newTitle = candidate;
        break;
      }
    }
    // If no suffix fits perfectly, try shorter suffixes
    if (newTitle === raw) {
      const shortSuffixes = [' | LessonCraftStudio', ' — Online Verktyg', ' — Säljguide', ' — Printables', ' | Online', ' — Guide', ' — Paket'];
      for (const suffix of shortSuffixes) {
        const candidate = raw + suffix;
        if (candidate.length >= 50 && candidate.length <= 60) {
          newTitle = candidate;
          break;
        }
      }
    }
    // Last resort: pad with " | LessonCraftStudio" even if slightly off
    if (newTitle === raw) {
      const candidate = raw + ' | LessonCraftStudio';
      if (candidate.length >= 50) {
        // Trim to 60 if needed
        newTitle = candidate.length > 60 ? candidate.substring(0, 60) : candidate;
      }
    }
  } else if (len > 60) {
    // Remove common trailing parts
    const removals = [' | LessonCraftStudio', ' — LessonCraftStudio', ' | Skapa och Sälj Online'];
    for (const rem of removals) {
      if (raw.endsWith(rem)) {
        const trimmed = raw.slice(0, -rem.length);
        if (trimmed.length >= 50 && trimmed.length <= 60) {
          newTitle = trimmed;
          break;
        }
      }
    }
    // If still too long, try trimming at a natural break that keeps 50-60
    if (newTitle.length > 60) {
      let bestTrim = null;
      // Try to end at a natural break: —, |, ,
      for (const sep of [' — ', ' | ', ', ']) {
        const sepIdx = raw.lastIndexOf(sep, 60);
        if (sepIdx >= 50) {
          bestTrim = raw.substring(0, sepIdx);
          break;
        }
      }
      if (!bestTrim || bestTrim.length < 50) {
        // Trim at word boundary, staying within 50-60
        let trimmed = raw.substring(0, 60);
        const lastSpace = trimmed.lastIndexOf(' ');
        if (lastSpace >= 50) {
          bestTrim = trimmed.substring(0, lastSpace);
        } else {
          // Hard trim at 60
          bestTrim = trimmed;
        }
      }
      // If trimmed result is below 50, try adding a short suffix
      if (bestTrim && bestTrim.length < 50) {
        const shortSuffix = [' — Guide', ' — Paket', ' — Verktyg', ' — Online', ' | Guide'];
        for (const suf of shortSuffix) {
          if (bestTrim.length + suf.length >= 50 && bestTrim.length + suf.length <= 60) {
            bestTrim = bestTrim + suf;
            break;
          }
        }
      }
      if (bestTrim && bestTrim.length >= 50 && bestTrim.length <= 60) {
        newTitle = bestTrim;
      }
    }
  }

  if (newTitle === raw) return { source, changed: false };

  return { source: replaceField(source, 'titleTag', newTitle), changed: true, old: raw, new: newTitle };
}

// ── Meta description fixes ──

function fixMetaDescription(source, type) {
  const field = extractField(source, 'metaDescription');
  if (!field) return { source, changed: false };

  const raw = resolveEscapes(field.value);
  const len = raw.length;

  if (len >= 150 && len <= 160) return { source, changed: false };

  let newMeta = raw;

  if (len < 150) {
    // Add padding phrases
    for (const pad of META_PADS) {
      const candidate = raw + pad;
      if (candidate.length >= 150 && candidate.length <= 160) {
        newMeta = candidate;
        break;
      }
    }
    // If no pad fits exactly, try trimming last sentence then adding a pad
    if (newMeta === raw) {
      // Find the last period before the end
      const lastPeriod = raw.lastIndexOf('.');
      if (lastPeriod > 100) {
        const base = raw.substring(0, lastPeriod + 1);
        for (const pad of META_PADS) {
          const candidate = base + pad;
          if (candidate.length >= 150 && candidate.length <= 160) {
            newMeta = candidate;
            break;
          }
        }
      }
    }
  } else if (len > 160) {
    // Trim to fit within 150-160 chars (NEVER below 150)
    // Strategy 1: Find sentence boundary (. ) between 150-160
    let bestCut = -1;
    for (let i = 160; i >= 150; i--) {
      if (i < raw.length && raw[i - 1] === '.' && (i === raw.length || raw[i] === ' ')) {
        bestCut = i;
        break;
      }
    }
    if (bestCut >= 150 && bestCut <= 160) {
      newMeta = raw.substring(0, bestCut);
    } else {
      // Strategy 2: Find comma between 150-160 and end with period
      for (let i = 160; i >= 150; i--) {
        if (raw[i - 1] === ',' || raw[i - 1] === ';') {
          newMeta = raw.substring(0, i - 1) + '.';
          if (newMeta.length >= 150 && newMeta.length <= 160) break;
          newMeta = raw; // Reset if out of range
        }
      }
      // Strategy 3: Cut at last word boundary between 150-160
      if (newMeta === raw || newMeta.length > 160) {
        let trimmed = raw.substring(0, 160);
        // Find last space at or before position 159
        let lastSpace = trimmed.lastIndexOf(' ');
        if (lastSpace >= 149) {
          newMeta = trimmed.substring(0, lastSpace) + '.';
          // If adding period pushes over 160, try without
          if (newMeta.length > 160) {
            newMeta = trimmed.substring(0, lastSpace);
          }
        } else {
          newMeta = trimmed;
        }
      }
    }
    // Final safety: ensure 150-160
    if (newMeta.length > 160) newMeta = newMeta.substring(0, 160);
    if (newMeta.length < 150) newMeta = raw; // Revert if we went too short
  }

  if (newMeta === raw) return { source, changed: false };

  return { source: replaceField(source, 'metaDescription', newMeta), changed: true, old: raw, new: newMeta };
}

// ── Hero image alt fix ──

function fixHeroImageAlt(source, type) {
  // Guide/start types use: visuals: { heroImage: { src: '...', alt: '...' } }
  // App/tool/bundle types use: visuals: { heroImages: { primary: '...', primaryAlt: '...' } }
  // Check both patterns

  // Pattern 1: heroImage: { src: '...' } without alt
  const heroImageBlock = source.match(/heroImage:\s*\{([^}]*)\}/s);
  if (heroImageBlock) {
    const block = heroImageBlock[1];
    if (!block.includes('alt:')) {
      const titleField = extractField(source, 'title');
      if (!titleField) return { source, changed: false };
      const altText = resolveEscapes(titleField.value);
      const srcMatch = block.match(/src:\s*'[^']*'/);
      if (srcMatch) {
        const fullMatchStart = heroImageBlock.index;
        const srcEnd = fullMatchStart + heroImageBlock[0].indexOf(srcMatch[0]) + srcMatch[0].length;
        const escapedAlt = altText.replace(/'/g, "\\'");
        const newSource = source.substring(0, srcEnd) + `, alt: '${escapedAlt}'` + source.substring(srcEnd);
        return { source: newSource, changed: true, added: `alt: '${altText.substring(0, 40)}...'` };
      }
    }
  }

  // Pattern 2: heroImages: { primary: '...' } without primaryAlt
  const heroImagesBlock = source.match(/heroImages:\s*\{([^}]*)\}/s);
  if (heroImagesBlock) {
    const block = heroImagesBlock[1];
    if (!block.includes('primaryAlt:')) {
      const titleField = extractField(source, 'title');
      if (!titleField) return { source, changed: false };
      const altText = resolveEscapes(titleField.value);
      const primaryMatch = block.match(/primary:\s*'[^']*'/);
      if (primaryMatch) {
        const fullMatchStart = heroImagesBlock.index;
        const primaryEnd = fullMatchStart + heroImagesBlock[0].indexOf(primaryMatch[0]) + primaryMatch[0].length;
        const escapedAlt = altText.replace(/'/g, "\\'");
        const newSource = source.substring(0, primaryEnd) + `, primaryAlt: '${escapedAlt}'` + source.substring(primaryEnd);
        return { source: newSource, changed: true, added: `primaryAlt added` };
      }
    }
  }

  return { source, changed: false };
}

// ── Main ──

function main() {
  let totalFixed = 0;
  let titleFixes = 0;
  let metaFixes = 0;
  let altFixes = 0;
  let unfixed = [];

  console.log(dryRun ? '\n=== DRY RUN (use --apply to write changes) ===\n' : '\n=== APPLYING FIXES ===\n');

  for (const [type, dir] of Object.entries(CONTENT_DIRS)) {
    if (typeFilter && type !== typeFilter) continue;
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

    for (const file of files) {
      const filePath = path.join(dir, file);
      let source = fs.readFileSync(filePath, 'utf-8');
      let fileChanged = false;
      const changes = [];

      // Fix titleTag
      const titleResult = fixTitleTag(source, type);
      if (titleResult.changed) {
        source = titleResult.source;
        fileChanged = true;
        titleFixes++;
        changes.push(`  titleTag: ${titleResult.old.length} → ${titleResult.new.length} chars`);
      }

      // Fix metaDescription
      const metaResult = fixMetaDescription(source, type);
      if (metaResult.changed) {
        source = metaResult.source;
        fileChanged = true;
        metaFixes++;
        changes.push(`  metaDesc: ${metaResult.old.length} → ${metaResult.new.length} chars`);
      }

      // Fix heroImageAlt
      const altResult = fixHeroImageAlt(source, type);
      if (altResult.changed) {
        source = altResult.source;
        fileChanged = true;
        altFixes++;
        changes.push(`  heroAlt: added`);
      }

      if (fileChanged) {
        totalFixed++;
        const fileName = file.replace('.ts', '');
        console.log(`${type}/${fileName}:`);
        for (const c of changes) console.log(c);

        if (!dryRun) {
          fs.writeFileSync(filePath, source, 'utf-8');
        }
      }
    }
  }

  console.log(`\n── Summary ──`);
  console.log(`Files modified: ${totalFixed}`);
  console.log(`Title fixes: ${titleFixes}`);
  console.log(`Meta description fixes: ${metaFixes}`);
  console.log(`Hero alt fixes: ${altFixes}`);
  if (dryRun) console.log('\nThis was a DRY RUN. Use --apply to write changes.');
}

main();
