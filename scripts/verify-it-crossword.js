const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'it', 'crossword.ts');
const c = fs.readFileSync(filePath, 'utf8');

const checks = [
  ['youtubeId b3WKDrzif-w', c.includes('b3WKDrzif-w')],
  ['.webp italian images', c.includes('/samples/italian/crossword/')],
  ['Refund FAQ (non offriamo rimborsi)', c.includes('non offriamo rimborsi')],
  ['Free trial (prova gratuita)', c.includes('prova gratuita')],
  ['CAT->GATTO example', c.includes('GATTO')],
  ['15\u00d715 grid', c.includes('15\u00d715')],
  ['Four input methods', c.includes('quattro metodi di input')],
  ['Filled grid answer key', c.includes('griglia compilata')],
  ['Blue header #5B9BD5', c.includes('#5B9BD5')],
  ['Fredoka 48px->28px', c.includes('48px') && c.includes('28px')],
  ['11 lingue', c.includes('11 lingue')],
  ['PAROLA: indizio format', c.includes('PAROLA: indizio')],
  ['Square NOT mentioned', !c.includes('Quadrato') && !c.includes('Square')],
  ['Grayscale (scala di grigi)', c.includes('scala di grigi')],
  ['Slug cruciverba-immagini-schede', c.includes('cruciverba-immagini-schede')],
  ['Slug generatore-cerca-parole', c.includes('generatore-cerca-parole')],
  ['Slug generatore-parole-mescolate', c.includes('generatore-parole-mescolate')],
  ['Slug generatore-indovina-parole', c.includes('generatore-indovina-parole')],
  ['Slug generatore-caccia-tesoro', c.includes('generatore-caccia-tesoro')],
  ['Slug generatore-cerca-e-conta', c.includes('generatore-cerca-e-conta')],
  ['Slug generatore-cerca-oggetti', c.includes('generatore-cerca-oggetti')],
  ['Slug generatore-crittogrammi', c.includes('generatore-crittogrammi')],
];

console.log('=== CONTENT CHECKS ===');
let allPassed = true;
checks.forEach(([name, pass]) => {
  console.log(pass ? 'PASS' : 'FAIL', '-', name);
  if (!pass) allPassed = false;
});

// Count sections
const faqCount = (c.match(/question: '/g) || []).length;
const linkCount = (c.match(/pageType: '/g) || []).length;
const stepCount = c.split("title: '").length - 1;

console.log('\n=== COUNTS ===');
console.log('FAQ items:', faqCount, faqCount === 11 ? 'OK' : 'EXPECTED 11');
console.log('Internal links:', linkCount, linkCount === 8 ? 'OK' : 'EXPECTED 8');

// titleTag length
const titleMatch = c.match(/titleTag: '([^']+)'/);
if (titleMatch) {
  const len = titleMatch[1].length;
  console.log('titleTag:', len, 'chars', len <= 60 ? 'OK' : 'TOO LONG');
}

// metaDescription length
const metaMatch = c.match(/metaDescription: '([^']+)'/);
if (metaMatch) {
  const len = metaMatch[1].length;
  console.log('metaDescription:', len, 'chars', (len >= 150 && len <= 160) ? 'OK' : 'OUT OF RANGE');
}

// Check no literal \uXXXX
const escapes = c.match(/\\u[0-9a-fA-F]{4}/g);
console.log('Literal escapes:', escapes ? escapes.length : 0, escapes ? 'FAIL' : 'OK');

console.log('\n=== RESULT ===');
console.log(allPassed && faqCount === 11 && linkCount === 8 ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED');
