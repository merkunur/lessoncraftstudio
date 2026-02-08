/**
 * Deep product meta verification: accents, uniqueness, content quality
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'frontend', 'content', 'product-pages');
const locales = ['en','de','fr','es','pt','it','nl','sv','da','no','fi'];

const localeChars = {
  de: /[äöüÄÖÜß]/,
  fr: /[àâéèêëîïôùûüçÀÂÉÈÊ]/,
  es: /[áéíóúñÁÉÍÓÚÑ¿¡]/,
  pt: /[àáâãçéêíóôõúÀÁÂÃÇ]/,
  it: /[àèéìòùÀÈÉÌÒÙ]/,
  sv: /[åäöÅÄÖ]/,
  da: /[æøåÆØÅ]/,
  no: /[æøåÆØÅ]/,
  fi: /[äöÄÖ]/
};

function extractSeoField(seoBlock, field) {
  const fieldIdx = seoBlock.indexOf(field + ':');
  if (fieldIdx === -1) return '';
  let rest = seoBlock.substring(fieldIdx + field.length + 1).trimStart();
  const quote = rest[0];
  if (quote !== "'" && quote !== '"' && quote !== '`') return '';
  rest = rest.substring(1);
  let result = '', i = 0;
  while (i < rest.length) {
    if (rest[i] === '\\' && i + 1 < rest.length) {
      const next = rest[i + 1];
      if (next === 'u' && i + 5 < rest.length && /^[0-9a-fA-F]{4}$/.test(rest.substring(i+2, i+6))) {
        result += String.fromCharCode(parseInt(rest.substring(i+2, i+6), 16));
        i += 6;
      } else { result += next; i += 2; }
    } else if (rest[i] === quote) { break; }
    else { result += rest[i]; i++; }
  }
  return result;
}

function extractSeoBlock(content) {
  const seoIdx = content.indexOf('seo:');
  if (seoIdx === -1) return null;
  const braceStart = content.indexOf('{', seoIdx);
  if (braceStart === -1) return null;
  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') { depth--; if (depth === 0) return content.substring(braceStart, i + 1); }
  }
  return null;
}

// ===== CHECK 1: Accents per locale =====
console.log('=== CHECK 1: Proper accents per locale ===');
let accentIssues = 0;
for (const loc of locales) {
  if (!localeChars[loc]) continue;
  const dir = path.join(baseDir, loc);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  let noAccent = 0;
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const seo = extractSeoBlock(content);
    if (!seo) continue;
    const title = extractSeoField(seo, 'title');
    const desc = extractSeoField(seo, 'description');
    const combined = title + ' ' + desc;
    if (!localeChars[loc].test(combined)) {
      noAccent++;
      console.log(`  NO ACCENTS: ${loc}/${f.replace('.ts','')}: ${title.substring(0,60)}`);
    }
  }
  accentIssues += noAccent;
}
if (accentIssues === 0) console.log('  PASS: All non-EN locales have proper accented characters.');

// ===== CHECK 2: Description uniqueness across ALL locales =====
console.log('\n=== CHECK 2: Description uniqueness (all 363 pages) ===');
const allDescs = [];
for (const loc of locales) {
  const dir = path.join(baseDir, loc);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const seo = extractSeoBlock(content);
    if (!seo) continue;
    const desc = extractSeoField(seo, 'description');
    allDescs.push({loc, slug: f.replace('.ts',''), desc});
  }
}
let crossDups = 0;
for (let i = 0; i < allDescs.length; i++) {
  for (let j = i+1; j < allDescs.length; j++) {
    if (allDescs[i].desc === allDescs[j].desc) {
      console.log(`  DUP: ${allDescs[i].loc}/${allDescs[i].slug} = ${allDescs[j].loc}/${allDescs[j].slug}`);
      crossDups++;
    }
  }
}
if (crossDups === 0) console.log('  PASS: All 363 descriptions are unique.');

// ===== CHECK 3: Title uniqueness across ALL locales =====
console.log('\n=== CHECK 3: Title uniqueness (all 363 pages) ===');
const allTitles = [];
for (const loc of locales) {
  const dir = path.join(baseDir, loc);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const seo = extractSeoBlock(content);
    if (!seo) continue;
    const title = extractSeoField(seo, 'title');
    allTitles.push({loc, slug: f.replace('.ts',''), title});
  }
}
let titleDups = 0;
for (let i = 0; i < allTitles.length; i++) {
  for (let j = i+1; j < allTitles.length; j++) {
    if (allTitles[i].title === allTitles[j].title) {
      console.log(`  DUP: ${allTitles[i].loc}/${allTitles[i].slug} = ${allTitles[j].loc}/${allTitles[j].slug}`);
      titleDups++;
    }
  }
}
if (titleDups === 0) console.log('  PASS: All 363 titles are unique.');

// ===== CHECK 4: Title contains app-specific keyword =====
console.log('\n=== CHECK 4: Title descriptive of specific app (appId keyword check) ===');
const appKeywords = {
  'addition': ['addition', 'yhteenlasku', 'addizione', 'adición', 'addi', 'optelling', 'addisjon', 'sammenl'],
  'alphabet-train': ['alphabet', 'alfabet', 'aakkosjuna', 'treno', 'tren', 'bokstav'],
  'big-small': ['big', 'small', 'groß', 'klein', 'grande', 'petit', 'grande', 'pequeño', 'stor', 'liten', 'iso', 'pieni', 'groot'],
  'coloring': ['color', 'farbe', 'couleur', 'colorear', 'colorir', 'colora', 'kleur', 'färg', 'farve', 'farge', 'värit'],
  'crossword': ['crossword', 'kreuzwort', 'mots', 'crucigrama', 'cruciverba', 'kruiswoord', 'korsord', 'kryssord', 'kryds', 'risti'],
  'cryptogram': ['cryptogram', 'kryptogramm', 'cryptogramme', 'criptograma', 'crittogramma', 'cryptogram', 'kryptogram'],
  'drawing-lines': ['line', 'linie', 'ligne', 'línea', 'linha', 'linea', 'lijn', 'linje', 'viiva'],
  'find-and-count': ['count', 'zählen', 'compter', 'contar', 'contare', 'tellen', 'räkna', 'tælle', 'telle', 'laske'],
  'find-objects': ['find', 'finden', 'trouver', 'encontrar', 'trovare', 'zoek', 'hitta', 'finn', 'etsi', 'find'],
  'grid-drawing': ['grid', 'raster', 'grille', 'cuadrícula', 'griglia', 'raster', 'rutnät', 'gitter', 'ruudukko'],
  'grid-match': ['grid', 'raster', 'grille', 'puzzle', 'rutnät', 'gitter', 'ruudukko'],
  'handwriting': ['handwriting', 'handschrift', 'écriture', 'escritura', 'caligrafia', 'scrittura', 'handschrift', 'skrivning', 'håndskrift', 'käsinkirjoitus'],
  'matching': ['match', 'zuordnung', 'association', 'emparejar', 'combinare', 'koppel', 'matcha', 'yhdist'],
  'math': ['math', 'mathe', 'math', 'matemáticas', 'matemática', 'matematica', 'reken', 'matematik', 'matematikk', 'matematiikka'],
  'math-puzzle': ['math', 'mathe', 'math', 'reken', 'matematik', 'matemat'],
  'maze': ['maze', 'labyrinth', 'labyrinthe', 'laberinto', 'labirinto', 'doolhof', 'labyrint', 'sokkelo'],
  'missing-pieces': ['missing', 'fehlend', 'manquant', 'piezas', 'mancant', 'ontbrekend', 'saknad', 'mangl', 'puuttuv'],
  'more-less': ['more', 'less', 'mehr', 'weniger', 'plus', 'moins', 'más', 'menos', 'più', 'meno', 'meer', 'minder', 'mer', 'mindre', 'enemmän'],
  'odd-one-out': ['odd', 'passt nicht', 'intrus', 'diferente', 'intruso', 'vreemde', 'udda', 'skiller', 'poikkea'],
  'pattern-train': ['pattern', 'muster', 'suite', 'patrón', 'sequenza', 'patroon', 'mönster', 'mønster', 'kuvio'],
  'pattern-worksheet': ['pattern', 'muster', 'suite', 'patrón', 'sequenza', 'patroon', 'mönster', 'mønster', 'kuvio'],
  'picture-bingo': ['bingo', 'bingo'],
  'picture-path': ['path', 'pfad', 'chemin', 'camino', 'percorso', 'pad', 'stig', 'sti', 'polku'],
  'picture-sort': ['sort', 'sortier', 'trier', 'clasificar', 'ordina', 'sorteer', 'sortera', 'sortere', 'lajittelu'],
  'prepositions': ['preposition', 'präposition', 'préposition', 'preposicion', 'preposiz', 'voorzetsel', 'preposition', 'preposi'],
  'shadow-matching': ['shadow', 'schatten', 'ombre', 'sombra', 'ombra', 'schaduw', 'skugg', 'skygge', 'varjo'],
  'subtraction': ['subtract', 'subtraktion', 'soustraction', 'sustracción', 'subtração', 'sottrazione', 'aftrekken', 'subtraktion', 'subtraksjon', 'vähennys'],
  'sudoku': ['sudoku'],
  'word-guess': ['word', 'wort', 'mot', 'palabra', 'palavra', 'parola', 'woord', 'ord', 'sana'],
  'word-search': ['word', 'wort', 'mot', 'sopa', 'caça', 'parole', 'woord', 'ord', 'sana'],
  'writing': ['writing', 'schreib', 'écriture', 'escritura', 'escrita', 'scrittura', 'schrijf', 'skriv', 'kirjoitus']
};

let keywordMisses = 0;
for (const loc of locales) {
  const dir = path.join(baseDir, loc);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const seo = extractSeoBlock(content);
    if (!seo) continue;
    const appId = extractSeoField(seo, 'appId');
    const title = extractSeoField(seo, 'title').toLowerCase();
    const keywords = appKeywords[appId];
    if (!keywords) continue;
    const hasKeyword = keywords.some(k => title.includes(k.toLowerCase()));
    if (!hasKeyword) {
      keywordMisses++;
      console.log(`  MISS: ${loc}/${f.replace('.ts','')} (appId=${appId}): ${extractSeoField(seo, 'title').substring(0,60)}`);
    }
  }
}
if (keywordMisses === 0) console.log('  PASS: All titles contain app-relevant keywords.');
else console.log(`  ${keywordMisses} titles missing app-specific keywords`);

// ===== CHECK 5: No template/filler text =====
console.log('\n=== CHECK 5: No template/filler text ===');
const templatePatterns = [
  /\[keyword/i, /\[app/i, /\[name/i, /\[locale/i,
  /\{\{/, /TODO/i, /lorem ipsum/i, /FIXME/i,
  /undefined/i, /INSERT/i, /REPLACE/i,
  /worksheet generator/i  // English template leaking into non-EN
];
let templateIssues = 0;
for (const loc of locales) {
  const dir = path.join(baseDir, loc);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const seo = extractSeoBlock(content);
    if (!seo) continue;
    const title = extractSeoField(seo, 'title');
    const desc = extractSeoField(seo, 'description');
    for (const p of templatePatterns) {
      if (loc !== 'en' && p === /worksheet generator/i) {
        // Only check non-EN for English leak
        if (/worksheet generator/i.test(title) || /worksheet generator/i.test(desc)) {
          console.log(`  TEMPLATE: ${loc}/${f.replace('.ts','')}: English text in non-EN content`);
          templateIssues++;
        }
      } else if (p.test(title) || p.test(desc)) {
        if (p.source === 'worksheet generator' && loc === 'en') continue;
        console.log(`  TEMPLATE: ${loc}/${f.replace('.ts','')}: matches ${p.source}`);
        templateIssues++;
        break;
      }
    }
  }
}
if (templateIssues === 0) console.log('  PASS: No template/filler text found.');

// ===== SUMMARY =====
console.log('\n=== SUMMARY ===');
console.log(`Accent check:     ${accentIssues === 0 ? 'PASS' : accentIssues + ' FAIL'}`);
console.log(`Desc uniqueness:  ${crossDups === 0 ? 'PASS' : crossDups + ' FAIL'}`);
console.log(`Title uniqueness: ${titleDups === 0 ? 'PASS' : titleDups + ' FAIL'}`);
console.log(`Keyword coverage: ${keywordMisses === 0 ? 'PASS' : keywordMisses + ' FAIL'}`);
console.log(`Template check:   ${templateIssues === 0 ? 'PASS' : templateIssues + ' FAIL'}`);
