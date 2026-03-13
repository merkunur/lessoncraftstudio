const fs = require('fs');
const path = require('path');
const slugs = process.argv.slice(2);
const BASE = path.join(__dirname, '..', 'frontend', 'config');
const CATS = ['app-content', 'tool-content', 'bundle-content', 'start-content', 'guide-content', 'idea-content'];

for (const slug of slugs) {
  for (const cat of CATS) {
    const fp = path.join(BASE, cat, 'fr', slug + '.ts');
    if (fs.existsSync(fp)) {
      const content = fs.readFileSync(fp, 'utf8');
      const m = content.match(/titleTag:\s*'((?:[^'\\]|\\.)*)'/);
      const title = m ? m[1].replace(/\\'/g, "'") : 'NOT FOUND';
      console.log(cat + '/' + slug + ' | ' + title.length + ' | ' + title);
    }
  }
}
