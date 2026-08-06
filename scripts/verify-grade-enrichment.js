/**
 * Part 6 - Final verification of all 250 enriched theme+grade entries.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-grade-pages.md');
const content = fs.readFileSync(FILE, 'utf8');
const lines = content.split('\n');

// Count sections
const lsi = (content.match(/\*\*LSI Keywords \(5\):\*\*/g) || []).length;
const questions = (content.match(/\*\*Question Keywords \(2\):\*\*/g) || []).length;
const serp = (content.match(/\*\*SERP Features\*\*/g) || []).length;

// Check for generator/maker in LSI keywords
let genMaker = 0;
let inLsi = false;
for (const line of lines) {
  if (line.includes('**LSI Keywords')) inLsi = true;
  else if (line.startsWith('**') && inLsi) inLsi = false;
  if (inLsi && /^\d+\./.test(line.trim())) {
    if (/generator|maker/i.test(line)) {
      genMaker++;
      console.log('VIOLATION:', line.trim());
    }
  }
}

// Check question keywords contain grade-specific language
let qMissGrade = 0;
let inQ = false;
for (const line of lines) {
  if (line.includes('**Question Keywords')) inQ = true;
  else if (line.startsWith('**') && inQ) inQ = false;
  if (inQ && /^\d+\./.test(line.trim())) {
    if (!/preschool|kindergarten|first grade|second grade|third grade|ages \d/i.test(line)) {
      qMissGrade++;
      console.log('NO GRADE REF:', line.trim());
    }
  }
}

// Check no "for kids" bare pattern in LSI
let forKids = 0;
inLsi = false;
for (const line of lines) {
  if (line.includes('**LSI Keywords')) inLsi = true;
  else if (line.startsWith('**') && inLsi) inLsi = false;
  if (inLsi && /^\d+\./.test(line.trim())) {
    if (/\bfor kids\b/i.test(line)) {
      forKids++;
      console.log('FOR KIDS IN LSI:', line.trim());
    }
  }
}

console.log('\n=== FINAL VERIFICATION ===');
console.log('LSI Keywords (5) sections:', lsi, lsi === 250 ? 'PASS' : 'FAIL');
console.log('Question Keywords (2) sections:', questions, questions === 250 ? 'PASS' : 'FAIL');
console.log('SERP tables:', serp, serp === 250 ? 'PASS' : 'FAIL');
console.log('Generator/maker in LSI:', genMaker, genMaker === 0 ? 'PASS' : 'FAIL');
console.log('Questions missing grade ref:', qMissGrade, qMissGrade === 0 ? 'PASS' : 'FAIL');
console.log('"for kids" in LSI:', forKids, forKids === 0 ? 'PASS' : 'FAIL');
console.log('File size:', content.length, 'chars');
console.log('Line count:', lines.length);
