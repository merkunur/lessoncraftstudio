/**
 * Add seller CTA signals to descriptions that lack them.
 * Appends a locale-appropriate seller phrase when no seller signal is found.
 *
 * Run: node frontend/scripts/fix-all-locale-seller-cta.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = ['guide-content', 'blog-content', 'idea-content', 'start-content', 'tool-content'];

// Seller signals in any language (broad matching)
const SELLER_SIGNALS = /etsy|kdp|gumroad|tpt|sell|vend|verkauf|vender|vendere|sälja|sælg|selge|myydä|verkopen|revenue|income|profit|business|commercial|license|licen[csz]|lizenz|\$49|one-time|einmalig|unique|unico|uma vez|engångs|engangsbetaling|eenmalig|kertamaksu|marché|mercado|mercato|markt|marknad|marked|markkinat|niche|demand|nachfrage|demande|demanda|domanda|vraag|efterfrågan|efterspørgsel|etterspørsel|kysyntä/i;

// Locale-specific seller CTA suffix to append
const SELLER_CTA = {
  en: ' Sell on Etsy, KDP & TPT with commercial license.',
  de: ' Verkaufen Sie auf Etsy & KDP mit gewerblicher Lizenz.',
  fr: ' Vendez sur Etsy & KDP avec licence commerciale.',
  es: ' Venda en Etsy & KDP con licencia comercial.',
  pt: ' Venda no Etsy & KDP com licenca comercial.',
  it: ' Vendi su Etsy & KDP con licenza commerciale.',
  nl: ' Verkoop op Etsy & KDP met commerciele licentie.',
  sv: ' Salj pa Etsy & KDP med kommersiell licens.',
  da: ' Saelg pa Etsy & KDP med kommerciel licens.',
  no: ' Selg pa Etsy & KDP med kommersiell lisens.',
  fi: ' Myy Etsyssa & KDP:ssa kaupallisella lisenssilla.',
};

function extractDesc(text) {
  // Single-quoted
  const r1 = /metaDescription:\s*'((?:[^'\\]|\\.)*)'/s;
  let m = text.match(r1);
  if (m) return { value: m[1].replace(/\\'/g, "'").trim(), raw: m[1], full: m[0] };

  // Multi-line single-quoted
  const r2 = /metaDescription:\s*\n\s*'((?:[^'\\]|\\.)*)'/s;
  m = text.match(r2);
  if (m) return { value: m[1].replace(/\\'/g, "'").trim(), raw: m[1], full: m[0] };

  // Double-quoted
  const r3 = /metaDescription:\s*"((?:[^"\\]|\\.)*)"/s;
  m = text.match(r3);
  if (m) return { value: m[1].replace(/\\"/g, '"').trim(), raw: m[1], full: m[0] };

  return null;
}

let fixed = 0;
let alreadyGood = 0;
let noDesc = 0;

for (const locale of LOCALES) {
  for (const type of TYPES) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort();
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');

      const desc = extractDesc(text);
      if (!desc || !desc.value) {
        noDesc++;
        continue;
      }

      if (SELLER_SIGNALS.test(desc.value)) {
        alreadyGood++;
        continue;
      }

      // Need to add seller CTA
      const suffix = SELLER_CTA[locale];
      let newDesc = desc.value;

      // If adding suffix would exceed 160, trim first
      if ((newDesc + suffix).length > 160) {
        // Cut at last sentence boundary that allows suffix
        const maxLen = 160 - suffix.length;
        const sentences = newDesc.split(/(?<=\.)\s+/);
        let trimmed = '';
        for (const s of sentences) {
          if ((trimmed + ' ' + s).trim().length > maxLen) break;
          trimmed = (trimmed + ' ' + s).trim();
        }
        if (trimmed.length >= 60) {
          newDesc = trimmed;
        } else {
          // Just truncate at word boundary
          newDesc = newDesc.substring(0, maxLen).replace(/\s+\S*$/, '');
          if (!newDesc.endsWith('.')) newDesc += '.';
        }
      }

      newDesc = (newDesc + suffix).trim();

      // Safety check
      if (newDesc.length > 165) {
        newDesc = newDesc.substring(0, 157).replace(/\s+\S*$/, '') + '...';
      }

      const escapedNew = newDesc.replace(/'/g, "\\'");

      // Replace in file
      if (desc.full.includes("'")) {
        text = text.replace(desc.full, "metaDescription: '" + escapedNew + "'");
      } else {
        text = text.replace(desc.full, "metaDescription: '" + escapedNew + "'");
      }

      fs.writeFileSync(filePath, text, 'utf-8');
      fixed++;
      if (fixed <= 20 || fixed % 50 === 0) {
        console.log(`FIXED: ${locale}/${type}/${file} (${newDesc.length} chars)`);
      }
    }
  }
}

console.log(`\nDone: ${fixed} fixed, ${alreadyGood} already good, ${noDesc} no desc.`);
