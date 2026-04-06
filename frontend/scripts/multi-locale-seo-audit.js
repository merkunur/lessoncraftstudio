/**
 * Multi-locale SEO audit - checks ALL locales against the metadata overhaul rules.
 *
 * Checks per file:
 * 1. Title length (max 60 chars)
 * 2. Description length (80-160 chars)
 * 3. Title starts with locale "How to" equivalent
 * 4. Description has seller CTA (Etsy/KDP/sell/commercial/license/$49 in any language)
 * 5. Description starts with freebie language
 * 6. Missing $49/price mention in app/bundle descriptions
 *
 * Run: node frontend/scripts/multi-locale-seo-audit.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CONTENT_TYPES = [
  { dir: 'app-content', type: 'app' },
  { dir: 'tool-content', type: 'tool' },
  { dir: 'guide-content', type: 'guide' },
  { dir: 'blog-content', type: 'blog' },
  { dir: 'idea-content', type: 'idea' },
  { dir: 'start-content', type: 'start' },
  { dir: 'bundle-content', type: 'bundle' },
  { dir: 'compare-content', type: 'compare' },
];

// "How to" in each language
const HOW_TO_PREFIXES = {
  en: /^How to /i,
  de: /^(Wie man |Wie Sie |So )/i,
  fr: /^Comment /i,
  es: /^Cómo /i,
  pt: /^Como /i,
  it: /^Come /i,
  nl: /^Hoe /i,
  sv: /^(Hur man |Hur du |Så här )/i,
  da: /^(Sådan |Hvordan )/i,
  no: /^(Slik |Hvordan )/i,
  fi: /^(Miten |Kuinka )/i,
};

// Seller signals in any language (broad matching)
const SELLER_SIGNALS = /etsy|kdp|gumroad|tpt|sell|vend|verkauf|vender|vendere|sälja|sælg|selge|myydä|verkopen|revenue|income|profit|business|geschäft|geschaeft|negocio|negócio|affari|zaken|företag|virksomhed|forretning|liiketoiminta|commercial|license|licen[csz]|lizenz|\$49|one-time|einmalig|unique|unico|uma vez|engångs|engangsbetaling|eenmalig|kertamaksu|marché|mercado|mercato|markt|marknad|marked|markkinat|niche|nisch|nicho|nicchia|demand|nachfrage|demande|demanda|domanda|vraag|efterfrågan|efterspørgsel|etterspørsel|kysyntä|pricing|preis|prix|precio|preço|prezzo|prijs|pris|hinta|shop|boutique|laden|tienda|loja|negozio|winkel|butik|kauppa|sales|ventes|ventas|vendas|vendite|verkoop|försäljning|salg|myynti|guide|guía|guida|gids|strategi/i;

// Freebie starters
const FREEBIE_STARTS = /^(Download free|Free printable|Télécharg.*gratuit|Kostenlos.*herunter|Descarga gratis|Scarica gratis|Gratis.*download|Ladda ner gratis|Download gratis|Ilmainen)/i;

// Price mention for product pages
const PRICE_MENTION = /\$49|\$149|49\s*\$|149\s*\$|einmalig|one-time|paiement unique|pago unico|pagamento unico|uma vez|engångs|engangsbetaling|eenmalig|kertamaksu/i;

function extractField(text, key) {
  const r1 = new RegExp(key + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'", 's');
  let m = text.match(r1);
  if (m) return m[1].replace(/\\'/g, "'").trim();
  const r2 = new RegExp(key + '\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"', 's');
  m = text.match(r2);
  if (m) return m[1].replace(/\\"/g, '"').trim();
  return '';
}

function extractSeoField(text, key) {
  const seoBlock = text.match(/seo:\s*\{[\s\S]*?\n\s*\}/);
  if (!seoBlock) return extractField(text, key);
  return extractField(seoBlock[0], key);
}

// Main audit
const results = { total: 0, pass: 0, issues: [] };
const byLocale = {};
const byType = {};
const byIssueType = {};

for (const locale of LOCALES) {
  byLocale[locale] = { total: 0, issues: 0 };

  for (const { dir, type } of CONTENT_TYPES) {
    const dirPath = path.join('frontend', 'config', dir, locale);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort();
    for (const file of files) {
      const slug = file.replace('.ts', '');
      const text = fs.readFileSync(path.join(dirPath, file), 'utf-8');

      const titleTag = extractSeoField(text, 'titleTag');
      const metaDesc = extractSeoField(text, 'metaDescription');

      results.total++;
      byLocale[locale].total++;

      const fileIssues = [];

      // 1. Title length
      if (titleTag.length > 60) fileIssues.push('title-long');
      if (titleTag.length < 10 && titleTag.length > 0) fileIssues.push('title-short');
      if (!titleTag) fileIssues.push('title-missing');

      // 2. Desc length
      if (metaDesc.length > 160) fileIssues.push('desc-long');
      if (metaDesc.length < 80 && metaDesc.length > 0) fileIssues.push('desc-short');
      if (!metaDesc) fileIssues.push('desc-missing');

      // 3. How to prefix
      if (HOW_TO_PREFIXES[locale] && HOW_TO_PREFIXES[locale].test(titleTag)) {
        fileIssues.push('title-how-to');
      }

      // 4. Freebie language
      if (FREEBIE_STARTS.test(metaDesc)) fileIssues.push('desc-freebie');

      // 5. Missing seller signals in desc (for seller/product pages)
      if (['app', 'guide', 'blog', 'idea', 'start', 'bundle', 'compare'].includes(type)) {
        if (metaDesc && !SELLER_SIGNALS.test(metaDesc)) {
          fileIssues.push('desc-no-seller-cta');
        }
      }

      // 6. Missing price in app/bundle desc
      if (['app', 'bundle'].includes(type) && metaDesc && !PRICE_MENTION.test(metaDesc)) {
        fileIssues.push('desc-no-price');
      }

      if (fileIssues.length === 0) {
        results.pass++;
      } else {
        byLocale[locale].issues++;
        const key = `${type}/${locale}`;
        byType[key] = (byType[key] || 0) + 1;
        for (const i of fileIssues) {
          byIssueType[i] = (byIssueType[i] || 0) + 1;
        }
        results.issues.push({ locale, type, slug, titleTag: titleTag.substring(0, 55), issues: fileIssues });
      }
    }
  }
}

// Summary
console.log('========================================');
console.log('MULTI-LOCALE SEO AUDIT');
console.log('========================================');
console.log(`Total pages:   ${results.total}`);
console.log(`Passing:       ${results.pass}`);
console.log(`With issues:   ${results.issues.length}`);
console.log(`Pass rate:     ${Math.round(results.pass / results.total * 100)}%`);
console.log();

console.log('--- By Locale ---');
for (const locale of LOCALES) {
  const l = byLocale[locale];
  const rate = l.total > 0 ? Math.round((l.total - l.issues) / l.total * 100) : 100;
  console.log(`  ${locale}: ${l.total} pages, ${l.issues} issues (${rate}% pass)`);
}
console.log();

console.log('--- By Issue Type ---');
for (const [k, v] of Object.entries(byIssueType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log();

// Show issues grouped by type+locale
console.log('--- Issues by Content Type × Locale ---');
for (const [k, v] of Object.entries(byType).sort((a, b) => b[1] - a[1]).slice(0, 30)) {
  console.log(`  ${k}: ${v}`);
}
console.log();

// Show sample issues (first 5 per locale for non-EN)
console.log('--- Sample Issues (non-EN) ---');
const shown = {};
for (const e of results.issues) {
  if (e.locale === 'en') continue;
  shown[e.locale] = (shown[e.locale] || 0) + 1;
  if (shown[e.locale] <= 3) {
    console.log(`${e.locale}/${e.type}/${e.slug}: ${e.issues.join(', ')}`);
    console.log(`  Title: ${e.titleTag}`);
  }
}
