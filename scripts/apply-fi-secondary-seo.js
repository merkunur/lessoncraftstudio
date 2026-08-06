#!/usr/bin/env node
/**
 * Part 134: Apply optimized Finnish metadata to category & grade hubs
 * - 8 category hub titles/descriptions
 * - 5 grade hub titles/descriptions
 * Target: title 50-60 chars, description 150-160 chars (runtime .length)
 */

const fs = require('fs');
const path = require('path');

// Helper: convert runtime string to file-escaped form (\uXXXX for non-ASCII)
function toEscaped(str) {
  return str.split('').map(ch => {
    const code = ch.charCodeAt(0);
    if (code > 127) {
      return '\\u' + code.toString(16).padStart(4, '0');
    }
    return ch;
  }).join('');
}

// ============================================================
// CATEGORY HUB UPDATES (8 pages)
// ============================================================
const categoryUpdates = {
  math: {
    title: {
      old: 'Ilmaiset matikkateht\u00e4v\u00e4t \u2014 luo ja tulosta',
      new: 'Ilmaiset Matikkateht\u00e4v\u00e4t Lapsille \u2014 Luo ja Tulosta PDF',
    },
    // desc at 151 chars - in range, no change
  },
  'language-arts': {
    title: {
      old: 'Kieliteht\u00e4v\u00e4t lapsille \u2014 ilmaiset ty\u00f6sivut',
      new: 'Ilmaiset Kieliteht\u00e4v\u00e4t Lapsille \u2014 Luo ja Tulosta PDF',
    },
    desc: {
      old: 'Luo tulostettavia kieliteht\u00e4vi\u00e4: aakkoset, sanapulmat, prepositiot ja kirjoitusharjoitukset. Esikoulusta kolmannelle luokalle \u2014 valmiina sekunneissa.',
      new: 'Luo tulostettavia kieliteht\u00e4vi\u00e4 lapsille: aakkoset, sanapulmat, prepositiot ja kirjoitusharjoitukset. Esikoulusta kolmannelle luokalle \u2014 valmiina sekunneissa.',
    },
  },
  'word-games': {
    title: {
      old: 'Sanapelit lapsille \u2014 tulostettavat pulmat',
      new: 'Tulostettavat Sanapelit ja Sanapulmat Lapsille \u2014 PDF',
    },
    desc: {
      old: 'Luo tulostettavia sanapelit\u00e4: sanahaku, kuvaristikot, sana-arvaukset ja kuvakryptogrammit. Ilmaisia ja valmiina sekunneissa.',
      new: 'Luo tulostettavia sanapelej\u00e4 lapsille: sanahaku, kuvaristikot, sana-arvaukset ja kuvakryptogrammit. Esikoulusta 3. luokalle \u2014 ilmaisia ja valmiina sekunneissa.',
    },
  },
  'art-creativity': {
    title: {
      old: 'V\u00e4rityssivut & piirustusteht\u00e4v\u00e4t lapsille',
      new: 'V\u00e4rityssivut ja Piirustusteht\u00e4v\u00e4t Lapsille \u2014 Ilmaiseksi',
    },
    // desc at 151 chars - in range, no change
  },
  'logic-puzzles': {
    title: {
      old: 'Logiikkapulmat & aivop\u00e4hkin\u00e4t lapsille',
      new: 'Logiikkapulmat ja Aivop\u00e4hkin\u00e4t Lapsille \u2014 Ilmaiset PDF',
    },
    // desc at 152 chars - in range, no change
  },
  'visual-perception': {
    title: {
      old: 'Visuaalinen hahmottaminen \u2014 teht\u00e4v\u00e4t lapsille',
      new: 'Visuaalisen Hahmottamisen Teht\u00e4v\u00e4t Lapsille \u2014 Ilmainen PDF',
    },
    // desc at 151 chars - in range, no change
  },
  'matching-sorting': {
    title: {
      old: 'Yhdist\u00e4mis- ja lajitteluteht\u00e4v\u00e4t \u2014 Ilmaiset',
      new: 'Yhdist\u00e4mis- ja Lajitteluteht\u00e4v\u00e4t Lapsille \u2014 Ilmaiset PDF',
    },
    desc: {
      old: 'Ilmaisia yhdist\u00e4mis- ja lajitteluteht\u00e4vi\u00e4 lapsille. Luokittelu, vertailu ja visuaalinen erottelu esikoulusta kolmanteen luokkaan.',
      new: 'Ilmaisia tulostettavia yhdist\u00e4mis- ja lajitteluteht\u00e4vi\u00e4 lapsille. Luokittelu, vertailu ja visuaalinen erottelu esikoulusta kolmanteen luokkaan. Lataa PDF heti.',
    },
  },
  'patterns-motor': {
    title: {
      old: 'Kuvio- ja hienomotoriikkateht\u00e4v\u00e4t \u2014 Ilmaiset',
      new: 'Kuvio- ja Hienomotoriikkateht\u00e4v\u00e4t Lapsille \u2014 Ilmaiset PDF',
    },
    desc: {
      old: 'Luo ilmaisia kuvionhahmotus- ja hienomotoriikkaty\u00f6sivuja lapsille. J\u00e4ljent\u00e4minen, sarjat ja silm\u00e4-k\u00e4si-koordinaatio esikoulusta kolmannelle luokalle.',
      new: 'Luo tulostettavia kuvionhahmotus- ja hienomotoriikkaty\u00f6sivuja lapsille. J\u00e4ljent\u00e4minen, sarjat ja silm\u00e4-k\u00e4si-koordinaatio esikoulusta kolmannelle luokalle.',
    },
  },
};

// ============================================================
// GRADE HUB UPDATES (5 pages)
// ============================================================
const gradeUpdates = {
  preschool: {
    title: {
      old: 'Esikoulun ty\u00f6sivut 3\u20134-vuotiaille \u2014 Ilmaiset',
      new: 'Ilmaiset Esikouluteht\u00e4v\u00e4t 3\u20134-Vuotiaille \u2014 Tulosta PDF',
    },
    desc: {
      old: 'Ilmaiset tulostettavat esikoulun ty\u00f6sivut 3\u20134-vuotiaille. V\u00e4ritys, j\u00e4ljent\u00e4minen, yhdist\u00e4minen, kuviot ja kokovertailu varhaisoppimiseen.',
      new: 'Ilmaiset tulostettavat esikouluteht\u00e4v\u00e4t 3\u20134-vuotiaille. V\u00e4rityst\u00e4, j\u00e4ljent\u00e4mist\u00e4, yhdist\u00e4mist\u00e4 ja kuvioita. Kuusi generaattoria, 50 teemaa. Lataa PDF heti.',
    },
  },
  kindergarten: {
    title: {
      old: 'Esikoulun ty\u00f6sivut 5\u20136-vuotiaille \u2014 Ilmaiset',
      new: 'Ilmaiset Esiopetuksen Teht\u00e4v\u00e4t 5\u20136-Vuotiaille \u2014 Tulosta PDF',
    },
    desc: {
      old: 'Ilmaiset tulostettavat esikoulun ty\u00f6sivut 5\u20136-vuotiaille. Yhteenlasku, aakkoset, sanahaku, v\u00e4ritys, laskeminen, kuviot.',
      new: 'Ilmaiset tulostettavat esiopetuksen teht\u00e4v\u00e4t 5\u20136-vuotiaille. Yhteenlasku, aakkoset, sanahaku, v\u00e4ritys ja kuviot. Kahdeksan generaattoria, 50 teemaa. Lataa PDF.',
    },
  },
  'first-grade': {
    title: {
      old: '1. luokan ty\u00f6sivut 6\u20137-vuotiaille \u2014 Ilmaiset',
      new: 'Ilmaiset 1. Luokan Teht\u00e4v\u00e4t 6\u20137-Vuotiaille \u2014 Tulosta PDF',
    },
    // desc at 153 chars - in range, no change
  },
  'second-grade': {
    title: {
      old: '2. luokan ty\u00f6sivut 7\u20138-vuotiaille \u2014 Ilmaiset',
      new: 'Ilmaiset 2. Luokan Teht\u00e4v\u00e4t 7\u20138-Vuotiaille \u2014 Tulosta PDF',
    },
    // desc at 151 chars - in range, no change
  },
  'third-grade': {
    title: {
      old: '3. luokan teht\u00e4v\u00e4t \u2014 Matematiikka, Pulmat & Ajattelu',
      new: 'Ilmaiset 3. Luokan Teht\u00e4v\u00e4t 8\u20139-Vuotiaille \u2014 Tulosta PDF',
    },
    desc: {
      old: 'Ilmaiset 3. luokan teht\u00e4v\u00e4t: matematiikka, sudoku, loogisia pulmia ja kriittist\u00e4 ajattelua. Lataa PDF heti koululle tai kotiin.',
      new: 'Ilmaiset tulostettavat 3. luokan teht\u00e4v\u00e4t 8\u20139-vuotiaille: matematiikka, sudoku, loogisia pulmia ja kriittist\u00e4 ajattelua. Kahdeksan generaattoria. Lataa PDF.',
    },
  },
};

// ============================================================
// VALIDATION
// ============================================================
console.log('=== VALIDATION ===\n');
let allValid = true;

function validate(label, updates) {
  for (const [key, upd] of Object.entries(updates)) {
    if (upd.title) {
      const len = upd.title.new.length;
      const ok = len >= 50 && len <= 60;
      const status = ok ? 'OK' : 'FAIL';
      if (!ok) allValid = false;
      console.log(`  ${key} title: ${len} ${status} "${upd.title.new}"`);
    }
    if (upd.desc) {
      const len = upd.desc.new.length;
      const ok = len >= 150 && len <= 160;
      const status = ok ? 'OK' : 'FAIL';
      if (!ok) allValid = false;
      console.log(`  ${key} desc:  ${len} ${status} "${upd.desc.new}"`);
    }
  }
}

console.log('Category hubs:');
validate('category', categoryUpdates);
console.log('\nGrade hubs:');
validate('grade', gradeUpdates);

if (!allValid) {
  console.log('\n*** VALIDATION FAILED - not applying changes ***');
  process.exit(1);
}

console.log('\n=== All lengths valid! Applying changes... ===\n');

// ============================================================
// APPLY CHANGES
// ============================================================
function applyUpdates(filePath, updates) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changeCount = 0;

  for (const [key, upd] of Object.entries(updates)) {
    if (upd.title) {
      const oldEsc = toEscaped(upd.title.old);
      const newEsc = toEscaped(upd.title.new);
      if (!content.includes(oldEsc)) {
        console.log(`  WARNING: title not found for "${key}"`);
        console.log(`    Searching for: ${oldEsc.substring(0, 60)}...`);
        continue;
      }
      content = content.replace(oldEsc, newEsc);
      changeCount++;
      console.log(`  ${key} title: replaced`);
    }
    if (upd.desc) {
      const oldEsc = toEscaped(upd.desc.old);
      const newEsc = toEscaped(upd.desc.new);
      if (!content.includes(oldEsc)) {
        console.log(`  WARNING: desc not found for "${key}"`);
        console.log(`    Searching for: ${oldEsc.substring(0, 60)}...`);
        continue;
      }
      content = content.replace(oldEsc, newEsc);
      changeCount++;
      console.log(`  ${key} desc: replaced`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  Total replacements: ${changeCount}`);
  return changeCount;
}

const catFile = path.join(__dirname, '..', 'frontend', 'config', 'category-content.ts');
const gradeFile = path.join(__dirname, '..', 'frontend', 'config', 'grade-content.ts');

console.log(`Updating ${catFile}:`);
const catChanges = applyUpdates(catFile, categoryUpdates);

console.log(`\nUpdating ${gradeFile}:`);
const gradeChanges = applyUpdates(gradeFile, gradeUpdates);

console.log(`\n=== DONE: ${catChanges + gradeChanges} total replacements applied ===`);
