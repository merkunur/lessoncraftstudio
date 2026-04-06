/**
 * Add "$49 one-time" price mention to all non-EN app-content descriptions
 * that are missing it. Also trims descriptions over 160 chars.
 *
 * Run: node frontend/scripts/fix-all-locale-app-prices.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Price suffix to append, per locale
const PRICE_SUFFIX = {
  de: ' 49 $ einmalig.',
  fr: ' 49 $ paiement unique.',
  es: ' 49 $ pago unico.',
  pt: ' 49 $ pagamento unico.',
  it: ' 49 $ pagamento unico.',
  nl: ' $49 eenmalig.',
  sv: ' $49 engångsbetalning.',
  da: ' $49 engangsbetaling.',
  no: ' $49 engangsbetaling.',
  fi: ' $49 kertamaksu.',
};

// Check if description already has price
const PRICE_RE = /\$49|49\s*\$|49\s*USD|einmalig|one-time|paiement unique|pago.?nico|pagamento unico|uma vez|engångs|engangsbetaling|eenmalig|kertamaksu/i;

function extractDesc(text) {
  // Single-quoted single-line
  const r1 = /metaDescription:\s*'((?:[^'\\]|\\.)*)'/s;
  let m = text.match(r1);
  if (m) return { value: m[1].replace(/\\'/g, "'").trim(), match: m[0], type: 'single' };

  // Double-quoted
  const r2 = /metaDescription:\s*"((?:[^"\\]|\\.)*)"/s;
  m = text.match(r2);
  if (m) return { value: m[1].replace(/\\"/g, '"').trim(), match: m[0], type: 'double' };

  // Multi-line single-quoted (key on separate line from value)
  const r3 = /metaDescription:\s*\n\s*'((?:[^'\\]|\\.)*)'/s;
  m = text.match(r3);
  if (m) return { value: m[1].replace(/\\'/g, "'").trim(), match: m[0], type: 'multi-single' };

  return null;
}

let fixed = 0;
let skipped = 0;
let trimmed = 0;

for (const locale of LOCALES) {
  for (const type of ['app-content', 'bundle-content']) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort();
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');

      const desc = extractDesc(text);
      if (!desc) {
        console.log(`SKIP (no desc): ${locale}/${type}/${file}`);
        skipped++;
        continue;
      }

      if (PRICE_RE.test(desc.value)) {
        // Already has price - check length
        if (desc.value.length > 160) {
          // Need to trim
          const trimmedDesc = desc.value.substring(0, 157) + '...';
          const replacement = desc.match.replace(desc.value.replace(/'/g, "\\'"), trimmedDesc.replace(/'/g, "\\'"));
          // Actually, let's trim more carefully - cut at last sentence boundary before 160
          const sentences = desc.value.split(/\.\s*/);
          let result = '';
          for (const s of sentences) {
            if ((result + s + '. ').length > 155) break;
            result += s + '. ';
          }
          result = result.trim();
          if (result.length < 80) result = desc.value.substring(0, 157).replace(/\s+\S*$/, '...');

          text = text.replace(desc.match, desc.match.replace(
            desc.type === 'single' ? `'${desc.value.replace(/'/g, "\\'")}'` : `'${desc.value.replace(/'/g, "\\'")}'`,
            `'${result.replace(/'/g, "\\'")}'`
          ));
          fs.writeFileSync(filePath, text, 'utf-8');
          trimmed++;
          console.log(`TRIMMED: ${locale}/${type}/${file} (${desc.value.length} -> ${result.length})`);
        }
        skipped++;
        continue;
      }

      // Add price suffix
      let newDesc = desc.value;
      const suffix = PRICE_SUFFIX[locale];

      // If adding suffix would make it too long, remove last phrase first
      if ((newDesc + suffix).length > 160) {
        // Try to cut at last period/sentence before adding price
        const lastPeriod = newDesc.lastIndexOf('.');
        if (lastPeriod > 80) {
          newDesc = newDesc.substring(0, lastPeriod + 1);
        }
        // If still too long, trim more aggressively
        if ((newDesc + suffix).length > 160) {
          const secondLastPeriod = newDesc.lastIndexOf('.', lastPeriod - 1);
          if (secondLastPeriod > 60) {
            newDesc = newDesc.substring(0, secondLastPeriod + 1);
          }
        }
      }

      newDesc = (newDesc + suffix).trim();

      // Final length check
      if (newDesc.length > 160) {
        // Last resort: just truncate smartly
        newDesc = newDesc.substring(0, 157).replace(/\s+\S*$/, '...');
      }

      // Replace in file
      const escapedOld = desc.value.replace(/'/g, "\\'");
      const escapedNew = newDesc.replace(/'/g, "\\'");

      if (desc.type === 'multi-single') {
        text = text.replace(desc.match, desc.match.replace(escapedOld, escapedNew));
      } else {
        text = text.replace(desc.match, `metaDescription: '${escapedNew}'`);
      }

      fs.writeFileSync(filePath, text, 'utf-8');
      fixed++;
      console.log(`FIXED: ${locale}/${type}/${file} (${newDesc.length} chars)`);
    }
  }
}

console.log(`\nDone: ${fixed} fixed, ${trimmed} trimmed, ${skipped} skipped (already had price or no desc).`);
