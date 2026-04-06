/**
 * Add "$149 one-time" price to ALL bundle descriptions across all locales.
 * Bundles are $149, not $49.
 *
 * Run: node frontend/scripts/fix-bundle-prices.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const PRICE_SUFFIX = {
  en: ' $149 one-time.',
  de: ' 149 $ einmalig.',
  fr: ' 149 $ paiement unique.',
  es: ' 149 $ pago unico.',
  pt: ' 149 $ pagamento unico.',
  it: ' 149 $ pagamento unico.',
  nl: ' $149 eenmalig.',
  sv: ' $149 engångsbetalning.',
  da: ' $149 engangsbetaling.',
  no: ' $149 engangsbetaling.',
  fi: ' $149 kertamaksu.',
};

// Match any existing price mention (wrong $49 or correct $149)
const PRICE_RE = /\s*\$?49\s*\$?\s*(einmalig|one-time|paiement unique|pago unico|pagamento unico|engångsbetalning|engangsbetaling|eenmalig|kertamaksu)\.?/gi;
const HAS_149 = /\$?149/;

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
  const dirPath = path.join('frontend', 'config', 'bundle-content', locale);
  if (!fs.existsSync(dirPath)) continue;

  for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
    const filePath = path.join(dirPath, file);
    let text = fs.readFileSync(filePath, 'utf-8');

    const desc = extractDesc(text);
    if (!desc) continue;

    // Already has $149
    if (HAS_149.test(desc.value)) continue;

    let newDesc = desc.value;

    // Remove wrong $49 price if present
    newDesc = newDesc.replace(PRICE_RE, '').trim();

    // Add $149 suffix
    const suffix = PRICE_SUFFIX[locale];
    if ((newDesc + suffix).length > 160) {
      // Trim at sentence boundary
      const lastPeriod = newDesc.lastIndexOf('.');
      if (lastPeriod > 60) newDesc = newDesc.substring(0, lastPeriod + 1);
      if ((newDesc + suffix).length > 160) {
        const secondLast = newDesc.lastIndexOf('.', lastPeriod - 1);
        if (secondLast > 40) newDesc = newDesc.substring(0, secondLast + 1);
      }
    }

    newDesc = (newDesc + suffix).trim();
    if (newDesc.length > 165) newDesc = newDesc.substring(0, 157) + '...';

    const escapedNew = newDesc.replace(/'/g, "\\'");
    text = text.replace(desc.full, "metaDescription: '" + escapedNew + "'");
    fs.writeFileSync(filePath, text, 'utf-8');
    fixed++;
    console.log(`FIXED: ${locale}/bundle/${file} (${newDesc.length} chars)`);
  }
}

console.log(`\nDone: ${fixed} bundle descriptions updated with $149 price.`);
