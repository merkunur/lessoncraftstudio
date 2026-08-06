const fs = require('fs');
const content = fs.readFileSync('frontend/config/start-content/it/create-multilingual-worksheets.ts', 'utf8');

// Check for stray backslashes (not \n, \', \\)
let issues = 0;
for (let i = 0; i < content.length - 1; i++) {
  const ch = content.charCodeAt(i);
  if (ch === 92) { // backslash
    const next = content[i + 1];
    if (next !== 'n' && next !== "'" && next !== '\\') {
      const ctx = content.substring(Math.max(0, i - 10), i + 10);
      console.log('Stray backslash at', i, ':', JSON.stringify(ctx));
      issues++;
    }
  }
}
console.log('Stray backslash issues:', issues);

// Check titleTag length
const titleMatch = content.match(/titleTag: '([^']+)'/);
if (titleMatch) console.log('titleTag:', titleMatch[1].length, 'chars -', titleMatch[1]);

// Check metaDescription length
const metaMatch = content.match(/metaDescription: '([^']+)'/);
if (metaMatch) console.log('metaDescription:', metaMatch[1].length, 'chars');

// Check sections
console.log('Has refund policy:', content.includes('non offriamo rimborsi'));
console.log('Has youtubeId:', content.includes('36keBFzJbPo'));
console.log('Has prova gratuita con filigrana:', content.includes('prova gratuita con filigrana'));

// Count sections
const mainContentMatches = content.match(/heading:/g);
console.log('mainContent sections:', mainContentMatches ? mainContentMatches.length : 0);

const actionStepMatches = content.match(/step:/g);
console.log('actionSteps:', actionStepMatches ? actionStepMatches.length : 0);

const faqMatches = content.match(/question:/g);
console.log('faq items:', faqMatches ? faqMatches.length : 0);

const nextStepMatches = content.match(/slug: '/g);
console.log('nextSteps + internalLinks (slug count):', nextStepMatches ? nextStepMatches.length : 0);

const toolMatches = content.match(/appId:/g);
console.log('toolsRecommended:', toolMatches ? toolMatches.length : 0);

const sampleMatches = content.match(/caption:/g);
console.log('captions (samples+themes):', sampleMatches ? sampleMatches.length : 0);
