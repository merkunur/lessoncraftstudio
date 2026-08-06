#!/usr/bin/env node
/**
 * Pass 3: Fix the last 4 meta descriptions that are 1-2 chars over 160
 */
const fs = require('fs');
const path = require('path');
const CONFIG = path.join(__dirname, '..', 'frontend', 'config');

function extractStringField(raw, fieldName) {
  const fieldPattern = new RegExp(fieldName + ':\\s*\\n?\\s*');
  const fieldMatch = fieldPattern.exec(raw);
  if (!fieldMatch) return { start: -1, end: -1 };
  const startIdx = fieldMatch.index + fieldMatch[0].length;
  const quoteChar = raw[startIdx];
  if (!"'\"`".includes(quoteChar)) return { start: -1, end: -1 };
  let i = startIdx + 1;
  while (i < raw.length) {
    if (raw[i] === '\\' && i + 1 < raw.length) { i += 2; continue; }
    if (raw[i] === quoteChar) break;
    i++;
  }
  return { start: startIdx, end: i + 1 };
}

const fixes = {
  'app-content/it/missing-pieces':
    "Crea puzzle di pezzi mancanti da vendere su Etsy, KDP e TPT. 6 forme di pezzo, difficoltà configurabile, foglio risposte automatico. Prova gratuita filigrana.",
  'app-content/it/odd-one-out':
    "Crea schede trova l\\'intruso da vendere su Etsy, KDP e TPT. Due modalità, foglio risposte con cerchi rossi, 104 temi illustrati. Prova gratuita con filigrana.",
  'guide-content/it/create-alphabet-worksheets':
    "Crea schede treno dell\\'alfabeto con vagoni colorati, due modalità, difficoltà configurabile e abbinamento lettere multilingue. Guida per venditori Etsy e KDP.",
  'idea-content/it/physical-printable-product-ideas':
    "Idee di prodotti stampabili fisici per venditori Etsy e fiere. Costruisci un business premium stampando, plastificando e spedendo prodotti didattici tangibili.",
};

for (const [key, newMeta] of Object.entries(fixes)) {
  const filePath = path.join(CONFIG, key + '.ts');
  let raw = fs.readFileSync(filePath, 'utf8');
  const field = extractStringField(raw, 'metaDescription');
  if (field.start === -1) { console.log('NOT FOUND: ' + key); continue; }
  raw = raw.substring(0, field.start) + "'" + newMeta + "'" + raw.substring(field.end);
  fs.writeFileSync(filePath, raw, 'utf8');
  const displayLen = newMeta.replace(/\\'/g, "'").length;
  console.log(key + ': ' + displayLen + ' chars');
}

console.log('Done.');
