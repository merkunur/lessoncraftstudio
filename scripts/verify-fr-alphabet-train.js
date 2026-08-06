const fs = require('fs');
const path = require('path');

const dir = 'tpt-thumbnails/French/alphabet-train';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let allOk = true;

files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    console.log('Checking: ' + f);

    // Check lang="fr"
    if (!content.includes('lang="fr"')) {
        console.log('  FAIL: Missing lang="fr"');
        allOk = false;
    }

    // Check no rotation on <img> elements
    const imgTags = content.match(/<img[^>]+>/gi) || [];
    imgTags.forEach(img => {
        if (/rotate/i.test(img)) {
            console.log('  FAIL: Image has rotation: ' + img.substring(0, 80));
            allOk = false;
        }
    });

    // Check no counts (number + content noun)
    const countPattern = /\d+\s*(fiches?|pages?|th[e\u00e8]mes?|activit)/gi;
    const matches = content.match(countPattern);
    if (matches) {
        console.log('  FAIL: Has count: ' + matches.join(', '));
        allOk = false;
    }

    // Check GRATUIT badge exists
    if (!content.includes('GRATUIT')) {
        console.log('  FAIL: Missing GRATUIT badge');
        allOk = false;
    }

    // Check Fredoka and Nunito fonts
    if (!content.includes('Fredoka')) {
        console.log('  FAIL: Missing Fredoka font');
        allOk = false;
    }
    if (!content.includes('Nunito')) {
        console.log('  FAIL: Missing Nunito font');
        allOk = false;
    }

    // Check 1000x1000 viewport
    if (!content.includes('width: 1000px; height: 1000px')) {
        console.log('  FAIL: Missing 1000x1000 dimensions');
        allOk = false;
    }

    console.log('  OK');
});

// Verify PNG dimensions
console.log('\nPNG Dimensions:');
const pngs = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
pngs.forEach(f => {
    const buf = fs.readFileSync(path.join(dir, f));
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    const status = (w === 2000 && h === 2000) ? 'OK' : 'FAIL';
    console.log('  ' + f + ': ' + w + 'x' + h + ' ' + status);
    if (status === 'FAIL') allOk = false;
});

console.log('\n' + (allOk ? 'ALL CHECKS PASSED!' : 'SOME CHECKS FAILED'));
