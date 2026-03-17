#!/usr/bin/env node
/**
 * Fix banned phrases across DE, FR, ES content files.
 * Replaces banned marketing language with compliant alternatives.
 *
 * Usage: node scripts/fix-banned-phrases-all.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const dryRun = process.argv.includes('--dry-run');
const BASE = path.join(__dirname, '..', 'frontend', 'config');
const CONTENT_TYPES = ['app-content', 'tool-content', 'bundle-content', 'start-content', 'guide-content', 'idea-content'];

// Case-insensitive replacements per locale
const REPLACEMENTS = {
  de: [
    // passives Einkommen → skalierbares Einkommen
    { find: /passives?\s+Einkommen/gi, replace: 'skalierbares Einkommen' },
    // zeitlich begrenzt → jetzt verfügbar / remove context-dependently
    { find: /zeitlich\s+begrenzt/gi, replace: 'aktuell verfügbar' },
    // Bestseller/best-seller → sehr gefragt
    { find: /\bbest-seller\b/gi, replace: 'sehr gefragt' },
    { find: /\bBestseller\b/g, replace: 'Verkaufsschlager' },
    { find: /\bbestseller\b/gi, replace: 'Verkaufsschlager' },
    // alle kaufen → viele Verkäufer nutzen
    { find: /alle\s+kaufen/gi, replace: 'viele Verkäufer nutzen' },
  ],
  fr: [
    { find: /best-seller/gi, replace: 'très demandé' },
    { find: /bestseller/gi, replace: 'très demandé' },
    { find: /revenu\s+passif/gi, replace: 'revenu récurrent' },
    { find: /revenus?\s+passifs?/gi, replace: 'revenus récurrents' },
    { find: /temps\s+limité/gi, replace: 'disponible maintenant' },
    { find: /temps\s+limite/gi, replace: 'disponible maintenant' },
  ],
  es: [
    { find: /tiempo\s+limitado/gi, replace: 'disponible ahora' },
    { find: /ingresos?\s+pasivos?/gi, replace: 'ingresos recurrentes' },
    { find: /tendencia\s+ahora/gi, replace: 'en demanda actualmente' },
    { find: /best-seller/gi, replace: 'muy demandado' },
    { find: /bestseller/gi, replace: 'muy demandado' },
  ],
};

let totalFixed = 0;
let totalFiles = 0;

for (const locale of ['de', 'fr', 'es']) {
  const rules = REPLACEMENTS[locale];
  let localeFixed = 0;

  for (const type of CONTENT_TYPES) {
    const dir = path.join(BASE, type, locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      for (const rule of rules) {
        if (rule.find.test(content)) {
          // Reset lastIndex for global regexes
          rule.find.lastIndex = 0;
          if (dryRun) {
            const matches = content.match(rule.find);
            if (matches) {
              console.log(`  [${locale}] ${type}/${file}: "${matches[0]}" → "${rule.replace}"`);
            }
          }
          content = content.replace(rule.find, rule.replace);
          changed = true;
        }
        // Reset again for next file
        rule.find.lastIndex = 0;
      }

      if (changed) {
        if (!dryRun) {
          fs.writeFileSync(filePath, content, 'utf-8');
        }
        localeFixed++;
        totalFixed++;
      }
      totalFiles++;
    }
  }

  console.log(`${locale.toUpperCase()}: ${localeFixed} files with banned phrases fixed`);
}

console.log(`\n${dryRun ? 'DRY RUN' : 'DONE'}: ${totalFixed} files fixed out of ${totalFiles} scanned`);
