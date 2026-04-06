/**
 * Fix truncated/mangled descriptions ending with ... or ....
 * Cleans up artifacts and ensures proper price mention.
 *
 * Run: node frontend/scripts/fix-truncated-descs.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = ['app-content', 'tool-content', 'guide-content', 'blog-content', 'idea-content', 'start-content', 'bundle-content', 'compare-content'];

const APP_PRICE = {
  en: '$49 one-time.', de: '49 $ einmalig.', fr: '49 $ paiement unique.', es: '49 $ pago unico.',
  pt: '49 $ pagamento unico.', it: '49 $ pagamento unico.', nl: '$49 eenmalig.',
  sv: '$49 engångsbetalning.', da: '$49 engangsbetaling.', no: '$49 engangsbetaling.', fi: '$49 kertamaksu.',
};

const BUNDLE_PRICE = {
  en: '$149 one-time.', de: '149 $ einmalig.', fr: '149 $ paiement unique.', es: '149 $ pago unico.',
  pt: '149 $ pagamento unico.', it: '149 $ pagamento unico.', nl: '$149 eenmalig.',
  sv: '$149 engångsbetalning.', da: '$149 engangsbetaling.', no: '$149 engangsbetaling.', fi: '$149 kertamaksu.',
};

// Detect truncation artifacts
const TRUNCATED_RE = /\.{2,}\s*$/;
const HAS_PRICE = /\$49|\$149|49\s*\$|149\s*\$|einmalig|one-time|paiement unique|pago unico|pagamento unico|engångsbetalning|engangsbetaling|eenmalig|kertamaksu/i;

function extractDesc(text) {
  const r1 = /metaDescription:\s*'((?:[^'\\]|\\.)*)'/s;
  let m = text.match(r1);
  if (m) return { value: m[1].replace(/\\'/g, "'").trim(), full: m[0] };
  const r2 = /metaDescription:\s*\n\s*'((?:[^'\\]|\\.)*)'/s;
  m = text.match(r2);
  if (m) return { value: m[1].replace(/\\'/g, "'").trim(), full: m[0] };
  return null;
}

let fixed = 0;

for (const locale of LOCALES) {
  for (const type of TYPES) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');

      const desc = extractDesc(text);
      if (!desc || !desc.value) continue;

      // Only fix truncated descriptions
      if (!TRUNCATED_RE.test(desc.value)) continue;

      // Clean up: remove trailing dots
      let cleaned = desc.value.replace(/\.{2,}\s*$/, '.').trim();
      // Remove any partial price artifacts at the end
      cleaned = cleaned.replace(/\s+\d+\s*\$?\s*\.?\s*$/, '.').trim();
      cleaned = cleaned.replace(/\s+\$\d+\s*\.?\s*$/, '.').trim();
      // Clean double periods
      cleaned = cleaned.replace(/\.{2,}/g, '.');

      // Ensure it ends with a period
      if (!cleaned.endsWith('.')) cleaned += '.';

      // Add price if missing and it's an app or bundle
      const isApp = type === 'app-content';
      const isBundle = type === 'bundle-content';
      if ((isApp || isBundle) && !HAS_PRICE.test(cleaned)) {
        const priceSuffix = isBundle ? ' ' + BUNDLE_PRICE[locale] : ' ' + APP_PRICE[locale];
        if ((cleaned + priceSuffix).length <= 160) {
          cleaned = cleaned + priceSuffix;
        } else {
          // Trim to fit
          const maxLen = 160 - priceSuffix.length;
          const lastPeriod = cleaned.lastIndexOf('.', maxLen);
          if (lastPeriod > 60) cleaned = cleaned.substring(0, lastPeriod + 1);
          cleaned = cleaned + priceSuffix;
        }
      }

      // Final length check
      if (cleaned.length > 160) {
        const lastPeriod = cleaned.lastIndexOf('.', 157);
        if (lastPeriod > 80) cleaned = cleaned.substring(0, lastPeriod + 1);
        else cleaned = cleaned.substring(0, 157) + '...';
      }

      if (cleaned !== desc.value) {
        const escapedNew = cleaned.replace(/'/g, "\\'");
        text = text.replace(desc.full, "metaDescription: '" + escapedNew + "'");
        fs.writeFileSync(filePath, text, 'utf-8');
        fixed++;
        console.log(`FIXED: ${locale}/${type}/${file} (${cleaned.length} chars)`);
      }
    }
  }
}

console.log(`\nDone: ${fixed} truncated descriptions cleaned up.`);
