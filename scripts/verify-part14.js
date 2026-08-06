const fs = require('fs');
const mapping = fs.readFileSync('frontend/config/theme-app-mapping.ts', 'utf8');
const themes = ['holidays', 'easter', 'halloween', 'xmas', 'birthday'];

for (const t of themes) {
  // Keys are unquoted: holidays: [...]
  const re = new RegExp(t + ':\\s*\\[([\\s\\S]*?)\\]');
  const mapMatch = mapping.match(re);
  const mappingApps = mapMatch ? (mapMatch[1].match(/'[^']+'/g) || []).map(s => s.replace(/'/g, '')) : [];

  const src = fs.readFileSync('frontend/content/themes/' + t + '/en.ts', 'utf8');
  const appSection = src.match(/curatedAppIds:\s*\[([\s\S]*?)\],/);
  const fileApps = appSection ? (appSection[1].match(/'[^']+'/g) || []).map(s => s.replace(/'/g, '')) : [];

  const mappingSorted = [...mappingApps].sort().join(',');
  const fileSorted = [...fileApps].sort().join(',');

  if (mappingSorted === fileSorted) {
    console.log(t + ': MATCH (' + fileApps.length + ' apps)');
  } else {
    console.log(t + ': MISMATCH');
    console.log('  mapping:', mappingSorted);
    console.log('  file:   ', fileSorted);
  }
}

// Check for duplicate FAQ questions across the 5 themes
const allQuestions = [];
for (const t of themes) {
  const src = fs.readFileSync('frontend/content/themes/' + t + '/en.ts', 'utf8');
  const qMatches = [...src.matchAll(/question: '([^']+)'/g)];
  for (const m of qMatches) {
    allQuestions.push({ theme: t, question: m[1] });
  }
}

const seen = new Map();
let dupes = 0;
for (const q of allQuestions) {
  const key = q.question.toLowerCase();
  if (seen.has(key)) {
    console.log('DUPLICATE: "' + q.question + '" in ' + q.theme + ' and ' + seen.get(key));
    dupes++;
  } else {
    seen.set(key, q.theme);
  }
}
console.log('\nTotal FAQ questions: ' + allQuestions.length);
console.log('Duplicate questions: ' + dupes);
