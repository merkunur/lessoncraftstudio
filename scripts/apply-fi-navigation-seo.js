#!/usr/bin/env node
/**
 * Part 135: Finnish Secondary Pages SEO - Navigation Pages
 * Optimizes title/desc for 6 Finnish pages + localizes worksheets keywords
 */
const fs = require('fs');
const path = require('path');
const fe = path.join(__dirname, '..', 'frontend');

// Convert non-ASCII to \uXXXX (for escaped .tsx files)
function esc(s) {
  return s.replace(/[^\x00-\x7F]/g, c =>
    '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
  );
}

// Safe single-occurrence replacement
function rep(content, old, nw, label) {
  if (!content.includes(old)) {
    console.error('NOT FOUND: ' + label);
    console.error('Searching: "' + old.substring(0, 120) + '..."');
    process.exit(1);
  }
  const idx = content.indexOf(old);
  const idx2 = content.indexOf(old, idx + old.length);
  if (idx2 !== -1) {
    console.error('MULTIPLE MATCHES: ' + label);
    process.exit(1);
  }
  return content.replace(old, nw);
}

// Read file, normalize line endings
function readF(p) {
  let c = fs.readFileSync(p, 'utf8');
  const crlf = c.includes('\r\n');
  if (crlf) c = c.replace(/\r\n/g, '\n');
  return { c, crlf };
}

// Write file, restore line endings
function writeF(p, c, crlf) {
  if (crlf) c = c.replace(/\n/g, '\r\n');
  fs.writeFileSync(p, c, 'utf8');
}

// === NEW VALUES (runtime strings for validation) ===
const HP_T = 'Ilmaiset Ty\u00f6arkki-Generaattorit Lapsille | LessonCraftStudio';
const HP_D = 'Luo ty\u00f6arkkeja lapsille 33 generaattorilla ja 3 000+ kuvalla. Matematiikka, v\u00e4ritys, sanaristikot ja pulmat. Lataa PDF heti \u2014 ilmainen, ei rekister\u00f6inti\u00e4.';

const AP_T = '33 Ilmaista Teht\u00e4v\u00e4generaattoria | LessonCraftStudio';
const AP_D = 'Tutustu 33 ilmaiseen teht\u00e4v\u00e4generaattoriin. Luo sanaristikkoja, ristisanateht\u00e4vi\u00e4, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia ja lis\u00e4\u00e4. Lataa tulostettavat PDFt heti.';

const WS_T = 'Tulostettavat Teht\u00e4v\u00e4t \u2014 50 Teemaa | LessonCraftStudio';
const WS_D = 'Selaa 50 teeman tulostettavia teht\u00e4vi\u00e4 lapsille. Matematiikka, kieli, v\u00e4ritys ja pulmat esikoulusta 3. luokkaan. Yli 250 ilmaista teht\u00e4v\u00e4kokoelmaa PDF-muodossa.';

const BL_T = 'Opetusmateriaalit ja Ty\u00f6arkkivinkit | LessonCraftStudio';

const PR_T = 'Hinnat \u2014 Ilmainen, Perus ja T\u00e4ysi P\u00e4\u00e4sy | LessonCraftStudio';
const PR_D = 'Valitse suunnitelmasi: Ilmainen sanahakugeneraattori, Peruspaketti 10 generaattorilla tai T\u00e4ysi P\u00e4\u00e4sy kaikkiin 33 generaattoriin. Peru milloin tahansa.';

const AB_T = 'Tietoa LessonCraftStudiosta | Ty\u00f6arkki-Generaattorit';
const AB_D = 'Tutustu LessonCraftStudioon \u2014 33 ty\u00f6arkki-generaattoria 11 kielell\u00e4 ja 3 000+ teemakuvaa. Ilmaisia opetusresursseja opettajille, vanhemmille ja terapeuteille.';

// Worksheets keywords
const WS_FI_KW = 'tulostettavat teht\u00e4v\u00e4t lapsille, ilmaiset teht\u00e4v\u00e4kokoelmat, el\u00e4inteht\u00e4v\u00e4t, dinosaurusteht\u00e4v\u00e4t, avaruusteht\u00e4v\u00e4t, esikoulun teht\u00e4v\u00e4t, p\u00e4iv\u00e4kodin teht\u00e4v\u00e4t, opetusmateriaalit aiheittain, kausiteht\u00e4v\u00e4t, juhlapy\u00e4h\u00e4teht\u00e4v\u00e4t lapsille, PDF-teht\u00e4v\u00e4t, luokan teht\u00e4v\u00e4paketit';
const WS_EN_KW = 'themed worksheets for kids, free printable worksheet collections, animal worksheets, dinosaur worksheets, space worksheets, preschool themed activities, kindergarten worksheet themes, educational printables by topic, seasonal worksheets, holiday worksheets for kids, themed PDF activities, classroom theme packs';

// === VALIDATE LENGTHS ===
console.log('=== LENGTH VALIDATION ===');
const checks = [
  ['HP title', HP_T, 50, 60],
  ['HP desc',  HP_D, 150, 160],
  ['AP title', AP_T, 50, 60],
  ['AP desc',  AP_D, 150, 160],
  ['WS title', WS_T, 50, 60],
  ['WS desc',  WS_D, 150, 160],
  ['BL title', BL_T, 50, 60],
  ['PR title', PR_T, 50, 60],
  ['PR desc',  PR_D, 150, 160],
  ['AB title', AB_T, 50, 60],
  ['AB desc',  AB_D, 150, 160],
];

let allOk = true;
for (const [label, val, min, max] of checks) {
  const len = val.length;
  const ok = len >= min && len <= max;
  const mark = ok ? 'OK' : 'BAD';
  console.log('  ' + mark + ' ' + label + ': ' + len + ' (' + min + '-' + max + ')');
  if (!ok) {
    allOk = false;
    console.log('    "' + val + '"');
  }
}
if (!allOk) {
  console.error('\nAborting - out of range values.');
  process.exit(1);
}
console.log('All values in range.\n');

// === APPLY CHANGES ===

// 1. Homepage (actual Unicode in file for fi title/desc)
console.log('1. Homepage...');
{
  const p = path.join(fe, 'app', '[locale]', 'page.tsx');
  let { c, crlf } = readF(p);

  c = rep(c,
    "title: 'Ilmaiset Ty\u00f6arkki-Generaattorit | LessonCraftStudio'",
    "title: '" + HP_T + "'",
    'HP title');

  c = rep(c,
    "description: 'Luo ty\u00f6arkkeja 33 generaattorilla ja 3 000+ kuvalla. Matematiikka, v\u00e4ritys, sanaristikot & pulmat. Lataa PDF heti. Ilmainen, ei rekister\u00f6inti\u00e4.'",
    "description: '" + HP_D + "'",
    'HP desc');

  writeF(p, c, crlf);
  console.log('  Done.');
}

// 2. Apps (escaped in file)
console.log('2. Apps...');
{
  const p = path.join(fe, 'app', '[locale]', 'apps', 'page.tsx');
  let { c, crlf } = readF(p);

  c = rep(c,
    "title: '" + esc('33 Ilmaista Ty\u00f6arkki Generaattoria | Matematiikka, Kieli, Pulmat | LessonCraftStudio') + "'",
    "title: '" + esc(AP_T) + "'",
    'AP title');

  c = rep(c,
    "description: '" + esc('Tutustu 33 ilmaiseen ty\u00f6arkki generaattoriin. Luo sanaristikkoja, ristisanateht\u00e4vi\u00e4, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia & lis\u00e4\u00e4. Lataa tulostettavat PDFt heti.') + "'",
    "description: '" + esc(AP_D) + "'",
    'AP desc');

  writeF(p, c, crlf);
  console.log('  Done.');
}

// 3. Worksheets (escaped in file) + keywords localization
console.log('3. Worksheets...');
{
  const p = path.join(fe, 'app', '[locale]', 'worksheets', 'page.tsx');
  let { c, crlf } = readF(p);

  // 3a. Replace fi title in pageTitle
  c = rep(c,
    "fi: '" + esc('Ilmaiset Teematy\u00f6lehdet Lapsille | LessonCraftStudio') + "'",
    "fi: '" + esc(WS_T) + "'",
    'WS title');

  // 3b. Replace fi desc in pageDescription
  c = rep(c,
    "fi: '" + esc('Selaa 50 teemallista ty\u00f6lehtikokoelmaa lapsille. El\u00e4imet, dinosaurukset, avaruus, meri ja paljon muuta. Ilmaisia matematiikka-, luku-, v\u00e4ritys- ja pulmateht\u00e4vi\u00e4 esikoulusta 3. luokkaan.') + "'",
    "fi: '" + esc(WS_D) + "'",
    'WS desc');

  // 3c. Insert pageKeywords map after pageDescription closing
  const newDescEsc = esc(WS_D);
  const insertAfter = "fi: '" + newDescEsc + "',\n};\n\nexport async function generateMetadata";
  const insertWith = "fi: '" + newDescEsc + "',\n};\n\n" +
    "const pageKeywords: Record<string, string> = {\n" +
    "  en: '" + WS_EN_KW + "',\n" +
    "  fi: '" + esc(WS_FI_KW) + "',\n" +
    "};\n\n" +
    "export async function generateMetadata";
  c = rep(c, insertAfter, insertWith, 'WS pageKeywords insert');

  // 3d. Add keywords variable after description variable
  c = rep(c,
    "const description = pageDescription[locale] || pageDescription.en;",
    "const description = pageDescription[locale] || pageDescription.en;\n  const keywords = pageKeywords[locale] || pageKeywords.en;",
    'WS keywords var');

  // 3e. Replace hardcoded keywords with variable
  c = rep(c,
    "keywords: '" + WS_EN_KW + "',",
    "keywords,",
    'WS keywords usage');

  writeF(p, c, crlf);
  console.log('  Done.');
}

// 4. Blog (escaped in file) - title only
console.log('4. Blog...');
{
  const p = path.join(fe, 'app', '[locale]', 'blog', '(listing)', 'page.tsx');
  let { c, crlf } = readF(p);

  c = rep(c,
    "title: '" + esc('Opetusmateriaalit & Ty\u00f6arkkivinkit Blogi | 100+ Asiantuntija-artikkelia | LessonCraftStudio') + "'",
    "title: '" + esc(BL_T) + "'",
    'BL title');

  writeF(p, c, crlf);
  console.log('  Done.');
}

// 5. Pricing (escaped in file)
console.log('5. Pricing...');
{
  const p = path.join(fe, 'app', '[locale]', 'pricing', 'page.tsx');
  let { c, crlf } = readF(p);

  c = rep(c,
    "title: '" + esc('Hinnat: Ilmainen, $15/kk Perus & $25/kk T\u00e4ysi K\u00e4ytt\u00f6oikeus | LessonCraftStudio') + "'",
    "title: '" + esc(PR_T) + "'",
    'PR title');

  c = rep(c,
    "description: '" + esc('Valitse suunnitelmasi: Ilmainen sanaristikko-generaattori, $15/kk Peruspaketti 10 generaattorilla tai $25/kk T\u00e4ysi K\u00e4ytt\u00f6oikeus kaikkiin 33 generaattoriin. Peru milloin tahansa.') + "'",
    "description: '" + esc(PR_D) + "'",
    'PR desc');

  writeF(p, c, crlf);
  console.log('  Done.');
}

// 6. About (fi.json - actual Unicode)
console.log('6. About...');
{
  const p = path.join(fe, 'messages', 'fi.json');
  let { c, crlf } = readF(p);

  c = rep(c,
    '"metaTitle": "Tietoa LessonCraftStudiosta | Opetukselliset Ty\u00f6arkki-Generaattorit"',
    '"metaTitle": "' + AB_T + '"',
    'AB title');

  c = rep(c,
    '"metaDescription": "Tutustu LessonCraftStudioon \u2014 33 ammattimaista ty\u00f6arkki-generaattoria 11 kielell\u00e4 yli 3 000 teemakuvalla opettajille, vanhemmille ja terapeuteille."',
    '"metaDescription": "' + AB_D + '"',
    'AB desc');

  writeF(p, c, crlf);
  console.log('  Done.');
}

console.log('\n=== ALL 6 PAGES UPDATED ===');

// === POST-APPLY VERIFICATION ===
console.log('\n=== POST-APPLY VERIFICATION ===');

function extractFiMeta(filePath, pattern) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(pattern);
  return match ? match[1] : null;
}

// Verify each file was actually updated
const verifications = [
  {
    name: 'Homepage',
    file: path.join(fe, 'app', '[locale]', 'page.tsx'),
    titlePattern: /fi:\s*\{[^}]*title:\s*'([^']+)'/,
    descPattern: /fi:\s*\{[^}]*description:\s*'([^']+)'/,
  },
  {
    name: 'Apps',
    file: path.join(fe, 'app', '[locale]', 'apps', 'page.tsx'),
    titlePattern: /fi:\s*\{[^}]*title:\s*'([^']+)'/,
    descPattern: /fi:\s*\{[^}]*description:\s*'([^']+)'/,
  },
  {
    name: 'Worksheets title',
    file: path.join(fe, 'app', '[locale]', 'worksheets', 'page.tsx'),
    // pageTitle has fi: 'value' format (not nested object)
    checkFn: (content) => {
      // Find fi title in pageTitle (before pageDescription)
      const titleSection = content.split('const pageDescription')[0];
      const m = titleSection.match(/fi:\s*'([^']+)'/);
      return m ? m[1] : null;
    }
  },
  {
    name: 'Worksheets desc',
    file: path.join(fe, 'app', '[locale]', 'worksheets', 'page.tsx'),
    checkFn: (content) => {
      // Find fi desc in pageDescription (between pageDescription and pageKeywords)
      const descSection = content.split('const pageDescription')[1].split('const pageKeywords')[0];
      const m = descSection.match(/fi:\s*'([^']+)'/);
      return m ? m[1] : null;
    }
  },
  {
    name: 'Blog',
    file: path.join(fe, 'app', '[locale]', 'blog', '(listing)', 'page.tsx'),
    titlePattern: /fi:\s*\{[^}]*title:\s*'([^']+)'/,
  },
  {
    name: 'Pricing',
    file: path.join(fe, 'app', '[locale]', 'pricing', 'page.tsx'),
    titlePattern: /fi:\s*\{[^}]*title:\s*'([^']+)'/,
    descPattern: /fi:\s*\{[^}]*description:\s*'([^']+)'/,
  },
  {
    name: 'About',
    file: path.join(fe, 'messages', 'fi.json'),
    checkFn: (content) => {
      const json = JSON.parse(content);
      return json.about.metaTitle;
    },
    checkDescFn: (content) => {
      const json = JSON.parse(content);
      return json.about.metaDescription;
    }
  },
];

let verifyOk = true;
for (const v of verifications) {
  const content = fs.readFileSync(v.file, 'utf8');
  let title, desc;

  if (v.checkFn) {
    title = v.checkFn(content);
  } else if (v.titlePattern) {
    const m = content.match(v.titlePattern);
    title = m ? m[1] : null;
  }

  if (v.checkDescFn) {
    desc = v.checkDescFn(content);
  } else if (v.descPattern) {
    const m = content.match(v.descPattern);
    desc = m ? m[1] : null;
  }

  if (title) {
    // For escaped files, unescape for length check
    const runtime = title.replace(/\\u([0-9a-f]{4})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    const tLen = runtime.length;
    const tOk = tLen >= 50 && tLen <= 60;
    console.log('  ' + (tOk ? 'OK' : 'BAD') + ' ' + v.name + ' title: ' + tLen);
    if (!tOk) verifyOk = false;
  }

  if (desc) {
    const runtime = desc.replace(/\\u([0-9a-f]{4})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    const dLen = runtime.length;
    const dOk = dLen >= 150 && dLen <= 160;
    console.log('  ' + (dOk ? 'OK' : 'BAD') + ' ' + v.name + ' desc: ' + dLen);
    if (!dOk) verifyOk = false;
  }
}

// Check worksheets has pageKeywords
const wsContent = fs.readFileSync(path.join(fe, 'app', '[locale]', 'worksheets', 'page.tsx'), 'utf8');
if (wsContent.includes('const pageKeywords')) {
  console.log('  OK Worksheets pageKeywords map present');
} else {
  console.log('  BAD Worksheets pageKeywords map MISSING');
  verifyOk = false;
}
if (wsContent.includes('const keywords = pageKeywords')) {
  console.log('  OK Worksheets keywords variable present');
} else {
  console.log('  BAD Worksheets keywords variable MISSING');
  verifyOk = false;
}

if (verifyOk) {
  console.log('\nAll verifications passed!');
} else {
  console.error('\nSome verifications failed!');
  process.exit(1);
}
