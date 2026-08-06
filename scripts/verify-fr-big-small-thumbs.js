const fs = require('fs');
const path = require('path');

const dir = 'tpt-thumbnails/French/big-small';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  console.log('--- ' + f + ' ---');
  console.log('  lang=fr:', c.includes('lang="fr"'));
  console.log('  viewport 1000:', c.includes('width=1000, height=1000'));
  console.log('  GRATUIT:', c.includes('GRATUIT'));
  console.log('  MATERNELLE:', c.includes('MATERNELLE'));

  // Check no rotation on img elements
  const imgTags = c.match(/<img[^>]+>/g) || [];
  const hasRotatedImg = imgTags.some(tag => tag.includes('rotate'));
  console.log('  No rotation on img:', !hasRotatedImg);

  // Check no page/worksheet counts
  const hasCount = /\d+\s*(pages?|fiches?|feuilles?|worksheets?)/i.test(c);
  console.log('  No page counts:', !hasCount);

  // Check uses correct image path
  console.log('  Uses french/big%20small:', c.includes('french/big%20small'));

  // List image sources
  const imgMatches = c.match(/src="[^"]+"/g) || [];
  console.log('  Image sources (' + imgMatches.length + '):');
  imgMatches.forEach(m => console.log('    ' + m));

  // Check portrait frames (height > width in frame containers)
  console.log('  Fredoka font:', c.includes('Fredoka'));
  console.log('  Nunito font:', c.includes('Nunito'));
  console.log();
});
