/**
 * Part 11: Product Schema Deep Validation
 * Validates schema data sources for all 363 product pages (33 apps x 11 locales)
 * Checks: FAQ, HowTo, samples data presence in content files
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'frontend', 'content', 'product-pages');
const locales = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

function extractBlock(content, blockName) {
  const patterns = [blockName + ':', blockName + ' :'];
  let startIdx = -1;
  for (const p of patterns) {
    startIdx = content.indexOf(p);
    if (startIdx !== -1) break;
  }
  if (startIdx === -1) return null;
  const braceStart = content.indexOf('{', startIdx);
  if (braceStart === -1) return null;
  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') { depth--; if (depth === 0) return content.substring(braceStart, i + 1); }
  }
  return null;
}

function extractArray(content, fieldName) {
  const idx = content.indexOf(fieldName + ':');
  if (idx === -1) return null;
  const bracketStart = content.indexOf('[', idx);
  if (bracketStart === -1 || bracketStart > idx + fieldName.length + 20) return null;
  let depth = 0;
  for (let i = bracketStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') { depth--; if (depth === 0) return content.substring(bracketStart, i + 1); }
  }
  return null;
}

function countItems(arrayStr) {
  if (!arrayStr) return 0;
  let count = 0, depth = 0;
  for (let i = 1; i < arrayStr.length - 1; i++) {
    if (arrayStr[i] === '{') { if (depth === 0) count++; depth++; }
    else if (arrayStr[i] === '}') depth--;
  }
  return count;
}

function hasField(block, field) {
  if (!block) return false;
  return block.includes(field + ':') || block.includes(field + ' :');
}

const results = [];
const issues = [];

for (const loc of locales) {
  const dir = path.join(baseDir, loc);
  if (!fs.existsSync(dir)) { issues.push({ sev: 'CRIT', loc, slug: '*', msg: 'Missing directory' }); continue; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const slug = f.replace('.ts', '');
    const r = { loc, slug };

    // 1. SEO block
    const seo = extractBlock(content, 'seo');
    r.hasSeo = !!seo;
    if (!seo) issues.push({ sev: 'CRIT', loc, slug, msg: 'No seo block' });
    else {
      r.hasAppId = hasField(seo, 'appId');
      r.hasTitle = hasField(seo, 'title');
      r.hasDesc = hasField(seo, 'description');
      if (!r.hasAppId) issues.push({ sev: 'CRIT', loc, slug, msg: 'Missing appId in seo' });
    }

    // 2. FAQ block
    const faq = extractBlock(content, 'faq');
    r.hasFaq = !!faq;
    if (faq) {
      const faqItems = extractArray(faq, 'items');
      r.faqCount = countItems(faqItems);
      if (r.faqCount > 0 && faqItems) {
        r.faqHasQ = faqItems.includes('question:') || faqItems.includes('question :');
        r.faqHasA = faqItems.includes('answer:') || faqItems.includes('answer :');
        if (!r.faqHasQ) issues.push({ sev: 'HIGH', loc, slug, msg: 'FAQ items missing question field' });
        if (!r.faqHasA) issues.push({ sev: 'HIGH', loc, slug, msg: 'FAQ items missing answer field' });
      }
    } else {
      r.faqCount = 0;
    }

    // 3. HowTo block
    const howTo = extractBlock(content, 'howTo');
    r.hasHowTo = !!howTo;
    if (howTo) {
      r.howToHasTitle = hasField(howTo, 'sectionTitle');
      r.howToHasDesc = hasField(howTo, 'sectionDescription');
      const steps = extractArray(howTo, 'steps');
      r.howToSteps = countItems(steps);
      if (r.howToSteps === 0) issues.push({ sev: 'HIGH', loc, slug, msg: 'HowTo block with no steps' });
    }

    // 4. Samples block
    const samples = extractBlock(content, 'samples');
    r.hasSamples = !!samples;
    if (samples) {
      r.samplesHasTitle = hasField(samples, 'sectionTitle');
      const sampleItems = extractArray(samples, 'items');
      r.sampleCount = countItems(sampleItems);
    }

    // 5. Hero block
    const hero = extractBlock(content, 'hero');
    r.hasHero = !!hero;

    results.push(r);
  }
}

// ===== REPORT =====
console.log('=== PRODUCT SCHEMA DATA AUDIT: 33 apps x 11 locales = 363 pages ===\n');

console.log('LOCALE | FILES | SEO | FAQ(custom/default) | HowTo(ok/miss) | Samples(pop/empty)');
console.log('-------+-------+-----+--------------------+----------------+-------------------');
for (const loc of locales) {
  const lr = results.filter(r => r.loc === loc);
  const seoOk = lr.filter(r => r.hasSeo).length;
  const faqCustom = lr.filter(r => r.faqCount > 0).length;
  const faqDefault = lr.filter(r => r.faqCount === 0).length;
  const howToOk = lr.filter(r => r.hasHowTo && r.howToSteps > 0).length;
  const howToMiss = lr.filter(r => !r.hasHowTo).length;
  const samplesPop = lr.filter(r => r.sampleCount > 0).length;
  const samplesEmpty = lr.filter(r => r.hasSamples && r.sampleCount === 0).length;
  console.log(`  ${loc.toUpperCase()}   |  ${lr.length}   | ${seoOk}/33 |    ${String(faqCustom).padStart(2)} / ${String(faqDefault).padStart(2)}         |     ${String(howToOk).padStart(2)} / ${String(howToMiss).padStart(2)}    |     ${String(samplesPop).padStart(2)} / ${String(samplesEmpty).padStart(2)}`);
}

// Schema generator code validation
console.log('\n=== SCHEMA TEMPLATE VALIDATION (code review) ===');
const schemaFile = fs.readFileSync(path.resolve(__dirname, '..', 'frontend', 'lib', 'schema-generator.ts'), 'utf8');

const checks = [
  ['SoftwareApplication @id', schemaFile.includes('"@id": `${pageUrl}#software`')],
  ['SoftwareApplication name from appData', schemaFile.includes('"name": appData.name')],
  ['SoftwareApplication AggregateOffer', schemaFile.includes('"@type": "AggregateOffer"')],
  ['SoftwareApplication 3 offers', schemaFile.includes('"offerCount": 3')],
  ['SoftwareApplication Free $0', schemaFile.includes('"price": "0"')],
  ['SoftwareApplication Core $15', schemaFile.includes('"price": "15"')],
  ['SoftwareApplication Full $25', schemaFile.includes('"price": "25"')],
  ['SoftwareApplication screenshot', schemaFile.includes('"screenshot": screenshotUrl')],
  ['SoftwareApplication provider @id', schemaFile.includes('"@id": `${baseUrl}#organization`')],
  ['BreadcrumbList @id', schemaFile.includes('"@id": `${pageUrl}#breadcrumb`')],
  ['BreadcrumbList 3 levels', schemaFile.includes('"position": 3')],
  ['BreadcrumbList localized Home', schemaFile.includes('localizedHomeLabel[locale]')],
  ['BreadcrumbList localized Apps', schemaFile.includes('localizedAppsLabel[locale]')],
  ['BreadcrumbList last no item', schemaFile.includes('No "item" property for current page')],
  ['WebPage dateModified dynamic', schemaFile.includes('new Date().toISOString()')],
  ['WebPage breadcrumb @id ref', schemaFile.includes('"breadcrumb": { "@id": `${pageUrl}#breadcrumb` }')],
  ['FAQPage @id', schemaFile.includes('`${pageUrl}#faq`')],
  ['FAQPage inLanguage', schemaFile.includes('"inLanguage": getHreflangCode(locale)') && schemaFile.indexOf('FAQPage') !== -1],
  ['FAQPage Question+Answer types', schemaFile.includes('"@type": "Question"') && schemaFile.includes('"@type": "Answer"')],
  ['HowTo @id', schemaFile.includes('`${pageUrl}#howto`')],
  ['HowTo totalTime', schemaFile.includes('"totalTime"')],
  ['ImageObject @id pattern', schemaFile.includes('`${pageUrl}#image-${index}`')],
  ['ImageObject dimensions default', schemaFile.includes('"width": image.width || 2480')],
  ['ImageObject creator @id', schemaFile.includes('"creator": { "@id": `${baseUrl}#organization` }')],
  ['ImageObject license locale-prefixed', schemaFile.includes('"license": `${baseUrl}/${locale}/terms`')],
  ['ImageGallery @id', schemaFile.includes('`${pageUrl}#gallery`')],
  ['ImageGallery numberOfItems', schemaFile.includes('"numberOfItems": images.length')],
  ['hreflangMap has all 11 locales', locales.every(l => new RegExp(`['"]?${l}['"]?\\s*:`).test(schemaFile))],
];

let passCount = 0, failCount = 0;
for (const [name, pass] of checks) {
  if (pass) { passCount++; }
  else { failCount++; console.log(`  FAIL: ${name}`); }
}
console.log(`  ${passCount} PASS, ${failCount} FAIL out of ${checks.length} checks`);

// Issues
const critIssues = issues.filter(i => i.sev === 'CRIT');
const highIssues = issues.filter(i => i.sev === 'HIGH');
if (critIssues.length) {
  console.log(`\n=== CRITICAL ISSUES (${critIssues.length}) ===`);
  critIssues.forEach(i => console.log(`  ${i.loc}/${i.slug}: ${i.msg}`));
}
if (highIssues.length) {
  console.log(`\n=== HIGH ISSUES (${highIssues.length}) ===`);
  highIssues.forEach(i => console.log(`  ${i.loc}/${i.slug}: ${i.msg}`));
}

// Stats
console.log('\n=== SUMMARY ===');
const totalFaqCustom = results.filter(r => r.faqCount > 0).length;
const totalFaqDefault = results.filter(r => r.faqCount === 0).length;
const totalHowTo = results.filter(r => r.hasHowTo && r.howToSteps > 0).length;
const totalSamples = results.filter(r => r.sampleCount > 0).length;
const totalSamplesEmpty = results.filter(r => r.hasSamples && r.sampleCount === 0).length;

console.log(`FAQ schemas: ${totalFaqCustom} custom + ${totalFaqDefault} default fallback = 363 total (all pages get FAQPage)`);
console.log(`HowTo schemas: ${totalHowTo}/363 pages have HowTo data`);
console.log(`ImageObject schemas: ${totalSamples} with static samples, ${totalSamplesEmpty} use filesystem discovery`);
console.log(`Schema template checks: ${passCount}/${checks.length} passed`);
console.log(`Issues: ${critIssues.length} critical, ${highIssues.length} high`);
