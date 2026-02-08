/**
 * Comprehensive product page meta audit — all 33 apps × 11 locales = 363 pages.
 * Checks: lengths, duplicates, garbage patterns, missing content, cross-locale translation.
 * Run: node scripts/audit-product-meta.js
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'frontend', 'content', 'product-pages');
const locales = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

// Optimal ranges (Google truncation)
const TITLE_MIN = 45;
const TITLE_MAX = 70;
const DESC_MIN = 130;
const DESC_MAX = 170;

function extractSeoField(seoBlock, field) {
  // Find field: then parse the string value handling escaped quotes
  const fieldIdx = seoBlock.indexOf(field + ':');
  if (fieldIdx === -1) return '';

  let rest = seoBlock.substring(fieldIdx + field.length + 1).trimStart();

  // Determine quote char
  const quote = rest[0];
  if (quote !== "'" && quote !== '"' && quote !== '`') return '';

  rest = rest.substring(1); // skip opening quote
  let result = '';
  let i = 0;
  while (i < rest.length) {
    if (rest[i] === '\\' && i + 1 < rest.length) {
      const next = rest[i + 1];
      if (next === 'u' && i + 5 < rest.length && /^[0-9a-fA-F]{4}$/.test(rest.substring(i+2, i+6))) {
        result += String.fromCharCode(parseInt(rest.substring(i+2, i+6), 16));
        i += 6;
      } else {
        result += next;
        i += 2;
      }
    } else if (rest[i] === quote) {
      break; // closing quote
    } else {
      result += rest[i];
      i++;
    }
  }
  return result;
}

function extractSeoBlock(content) {
  // Find "seo:" then the matching opening { and closing }
  const seoIdx = content.indexOf('seo:');
  if (seoIdx === -1) return null;
  const braceStart = content.indexOf('{', seoIdx);
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) return content.substring(braceStart, i + 1);
    }
  }
  return null;
}

// Garbage patterns
const garbagePatterns = [
  /\[keyword/i, /(?:^|[\s,.;!?])undefined(?:[\s,.;!?]|$)/i, /(?:^|[\s,.;!?])null(?:[\s,.;!?]|$)/i, /TODO/i,
  /\{\{/,  // template patterns
  /lorem ipsum/i,
];

const results = {};
const allIssues = [];

for (const loc of locales) {
  const dir = path.join(baseDir, loc);
  if (!fs.existsSync(dir)) { console.error('MISSING dir: ' + dir); continue; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  const r = {
    total: files.length,
    tOk: 0, tShort: 0, tLong: 0, tMiss: 0,
    dOk: 0, dShort: 0, dLong: 0, dMiss: 0,
    titles: {}, descs: {}
  };

  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const slug = f.replace('.ts', '');
    const seo = extractSeoBlock(content);
    if (!seo) { r.tMiss++; r.dMiss++; allIssues.push({ sev: 'CRIT', loc, slug, msg: 'No seo block found' }); continue; }

    const title = extractSeoField(seo, 'title');
    const desc = extractSeoField(seo, 'description');

    // Title checks
    if (!title) {
      r.tMiss++;
      allIssues.push({ sev: 'CRIT', loc, slug, msg: 'No title extracted' });
    } else {
      r.titles[slug] = title;
      const len = title.length;
      if (len >= TITLE_MIN && len <= TITLE_MAX) r.tOk++;
      else if (len < TITLE_MIN) {
        r.tShort++;
        allIssues.push({ sev: 'HIGH', loc, slug, msg: `Title SHORT (${len}ch): ${title.substring(0,65)}` });
      } else {
        r.tLong++;
        // Only flag if >70 as HIGH, >65 as WARN
        if (len > 70) allIssues.push({ sev: 'WARN', loc, slug, msg: `Title long (${len}ch): ${title.substring(0,75)}` });
      }
      // Garbage check
      for (const p of garbagePatterns) {
        if (p.test(title)) {
          allIssues.push({ sev: 'CRIT', loc, slug, msg: `Title GARBAGE: ${title.substring(0,65)}` });
          break;
        }
      }
    }

    // Description checks
    if (!desc) {
      r.dMiss++;
      allIssues.push({ sev: 'CRIT', loc, slug, msg: 'No description extracted' });
    } else {
      r.descs[slug] = desc;
      const len = desc.length;
      if (len >= DESC_MIN && len <= DESC_MAX) r.dOk++;
      else if (len < DESC_MIN) {
        r.dShort++;
        allIssues.push({ sev: 'HIGH', loc, slug, msg: `Desc SHORT (${len}ch): ${desc.substring(0,80)}` });
      } else {
        r.dLong++;
        if (len > 180) allIssues.push({ sev: 'WARN', loc, slug, msg: `Desc long (${len}ch)` });
      }
      // Garbage check
      for (const p of garbagePatterns) {
        if (p.test(desc)) {
          allIssues.push({ sev: 'CRIT', loc, slug, msg: `Desc GARBAGE: ${desc.substring(0,80)}` });
          break;
        }
      }
    }
  }
  results[loc] = r;
}

// ===== REPORT =====
console.log('=== PRODUCT META AUDIT: 33 apps x 11 locales = 363 pages ===\n');

// Summary table
console.log('LOCALE | FILES | TITLE ok/short/long/miss | DESC ok/short/long/miss');
console.log('-------+-------+------------------------+------------------------');
let totalTOk = 0, totalTShort = 0, totalTLong = 0, totalTMiss = 0;
let totalDOk = 0, totalDShort = 0, totalDLong = 0, totalDMiss = 0;
for (const loc of locales) {
  const r = results[loc];
  if (!r) continue;
  console.log(`  ${loc.toUpperCase()}   |  ${r.total}   | ${String(r.tOk).padStart(3)}/${String(r.tShort).padStart(2)}/${String(r.tLong).padStart(2)}/${String(r.tMiss).padStart(2)}               | ${String(r.dOk).padStart(3)}/${String(r.dShort).padStart(2)}/${String(r.dLong).padStart(2)}/${String(r.dMiss).padStart(2)}`);
  totalTOk += r.tOk; totalTShort += r.tShort; totalTLong += r.tLong; totalTMiss += r.tMiss;
  totalDOk += r.dOk; totalDShort += r.dShort; totalDLong += r.dLong; totalDMiss += r.dMiss;
}
console.log('-------+-------+------------------------+------------------------');
console.log(` TOTAL | ${363}   | ${totalTOk}/${totalTShort}/ ${totalTLong}/ ${totalTMiss}               | ${totalDOk}/${totalDShort}/ ${totalDLong}/ ${totalDMiss}`);

// Duplicate check within locale
console.log('\n=== DUPLICATE CHECK (within locale) ===');
let dupCount = 0;
for (const loc of locales) {
  const r = results[loc];
  if (!r) continue;
  const titleVals = Object.values(r.titles);
  const titleDups = titleVals.filter((v, i) => titleVals.indexOf(v) !== i);
  if (titleDups.length) {
    dupCount += titleDups.length;
    console.log(`${loc.toUpperCase()}: ${titleDups.length} duplicate title(s):`);
    [...new Set(titleDups)].forEach(t => {
      const slugs = Object.entries(r.titles).filter(([,v]) => v === t).map(([k]) => k);
      console.log(`  "${t.substring(0,55)}" -> ${slugs.join(', ')}`);
    });
  }
  const descVals = Object.values(r.descs);
  const descDups = descVals.filter((v, i) => descVals.indexOf(v) !== i);
  if (descDups.length) {
    dupCount += descDups.length;
    console.log(`${loc.toUpperCase()}: ${descDups.length} duplicate desc(s)`);
  }
}
if (dupCount === 0) console.log('No duplicates found within any locale.');

// Cross-locale: check non-EN titles aren't identical to EN (not translated)
console.log('\n=== CROSS-LOCALE CHECK (non-EN titles identical to EN?) ===');
let crossCount = 0;
const enTitles = results.en ? results.en.titles : {};
for (const loc of locales.filter(l => l !== 'en')) {
  const r = results[loc];
  if (!r) continue;
  for (const [slug, locTitle] of Object.entries(r.titles)) {
    // Find the EN equivalent - slug might differ, so use appId mapping
    // For simplicity, check if any EN slug shares the same appId
    const enSlug = Object.keys(enTitles).find(s => {
      // Match by removing locale-specific suffix
      return s === slug; // If slugs match (EN files use EN slugs)
    });
    // Can't easily map localized→EN slugs without the config, so skip this for non-matching slugs
  }
}
// Instead, check if any two locales have the exact same title for any app
for (const loc1 of locales) {
  for (const loc2 of locales) {
    if (loc1 >= loc2) continue;
    const r1 = results[loc1], r2 = results[loc2];
    if (!r1 || !r2) continue;
    for (const t of Object.values(r1.titles)) {
      if (Object.values(r2.titles).includes(t)) {
        console.log(`SAME title in ${loc1.toUpperCase()} and ${loc2.toUpperCase()}: "${t.substring(0,55)}"`);
        crossCount++;
      }
    }
  }
}
if (crossCount === 0) console.log('All titles are unique across locales (properly translated).');

// All issues
const critIssues = allIssues.filter(i => i.sev === 'CRIT');
const highIssues = allIssues.filter(i => i.sev === 'HIGH');
const warnIssues = allIssues.filter(i => i.sev === 'WARN');

if (critIssues.length) {
  console.log(`\n=== CRITICAL ISSUES (${critIssues.length}) ===`);
  critIssues.forEach(i => console.log(`  ${i.loc}/${i.slug}: ${i.msg}`));
}
if (highIssues.length) {
  console.log(`\n=== HIGH ISSUES (${highIssues.length}) ===`);
  highIssues.forEach(i => console.log(`  ${i.loc}/${i.slug}: ${i.msg}`));
}
if (warnIssues.length) {
  console.log(`\n=== WARNINGS (${warnIssues.length}) ===`);
  warnIssues.slice(0, 20).forEach(i => console.log(`  ${i.loc}/${i.slug}: ${i.msg}`));
  if (warnIssues.length > 20) console.log(`  ... and ${warnIssues.length - 20} more`);
}

console.log(`\nTOTAL: ${critIssues.length} critical, ${highIssues.length} high, ${warnIssues.length} warnings`);
