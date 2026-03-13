const fs = require('fs');

const app = fs.readFileSync('frontend/app/[locale]/apps/[slug]/showcase/showcase-configs.ts', 'utf8');
const tool = fs.readFileSync('frontend/config/tool-showcase-configs.ts', 'utf8');
const guide = fs.readFileSync('frontend/config/guide-showcase-configs.ts', 'utf8');

// Only English sections
const appEn = app.split('type DeTextTuple')[0];
const toolEn = tool.split('type DeTextTuple')[0];
const guideEn = guide.split('const deLabels')[0];

const allContent = appEn + toolEn + guideEn;

const pillLabels = new Set();
let m;

// label: '...'
const r1 = /label:\s*'([^']+)'/g;
while ((m = r1.exec(allContent)) !== null) { pillLabels.add(m[1]); }

// badge: '...'
const r2 = /badge:\s*'([^']+)'/g;
while ((m = r2.exec(allContent)) !== null) { pillLabels.add(m[1]); }

// name: '...' (tier names)
const r3 = /\bname:\s*'([^']+)'/g;
while ((m = r3.exec(allContent)) !== null) { pillLabels.add(m[1]); }

// trophyText: '...'
const r4 = /trophyText:\s*'([^']+)'/g;
while ((m = r4.exec(allContent)) !== null) { pillLabels.add(m[1]); }

// string pills in arrays: spotPills: ['X', 'Y'] and galleryPills: ['X', 'Y']
const r5 = /(?:spotPills|galleryPills):\s*\[([^\]]+)\]/g;
while ((m = r5.exec(allContent)) !== null) {
  const inner = m[1];
  const r6 = /'([^']+)'/g;
  let s;
  while ((s = r6.exec(inner)) !== null) { pillLabels.add(s[1]); }
}

// Read i18n file
const i18n = fs.readFileSync('frontend/config/showcase-i18n.ts', 'utf8');
const deKeys = new Set();
const r7 = /'([^']+)':\s*'/gm;
while ((m = r7.exec(i18n)) !== null) { deKeys.add(m[1]); }

// Filter: only actual text (not emoji, not symbols)
function isText(s) { return s.length > 1 && /[a-zA-Z]/.test(s); }

const missing = [...pillLabels].filter(l => !deKeys.has(l) && isText(l)).sort();

console.log('Total unique text strings:', [...pillLabels].filter(isText).length);
console.log('Already in i18n table:', [...pillLabels].filter(l => deKeys.has(l) && isText(l)).length);
console.log('MISSING from i18n:', missing.length);
console.log('');
missing.forEach(s => console.log(s));
