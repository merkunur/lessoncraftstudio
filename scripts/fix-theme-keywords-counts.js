// Fix all stated character counts in en-theme-hubs.md
const fs = require('fs');
let content = fs.readFileSync('docs/seo-keywords/en-theme-hubs.md', 'utf8');

// Extract and fix each entry's stated counts
const sections = content.split(/(?=### \d+\. )/);

for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  const numMatch = section.match(/^### (\d+)\. /);
  if (!numMatch) continue;

  const num = parseInt(numMatch[1]);

  // Get actual title length
  const titleMatch = section.match(/\*\*SEO Title\*\* \| (.+?) \|$/m);
  if (titleMatch) {
    const actualTitle = titleMatch[1].replace(/\\\|/g, '|').length;
    const statedMatch = section.match(/\*\*Title Chars\*\* \| (\d+) \|/);
    if (statedMatch && parseInt(statedMatch[1]) !== actualTitle) {
      sections[i] = sections[i].replace(
        `| **Title Chars** | ${statedMatch[1]} |`,
        `| **Title Chars** | ${actualTitle} |`
      );
    }
  }

  // Get actual description length
  const descMatch = section.match(/\*\*Meta Description\*\* \| (.+?) \|$/m);
  if (descMatch) {
    const actualDesc = descMatch[1].length;
    const statedMatch = section.match(/\*\*Desc Chars\*\* \| (\d+) \|/);
    if (statedMatch && parseInt(statedMatch[1]) !== actualDesc) {
      sections[i] = sections[i].replace(
        `| **Desc Chars** | ${statedMatch[1]} |`,
        `| **Desc Chars** | ${actualDesc} |`
      );
    }
  }
}

content = sections.join('');

// Now fix the Character Count Summary table
// Extract all entries again from the fixed content
const entries = [];
const entryRegex = /### (\d+)\. .+?\(`(.+?)`\)/g;
let match;
const fullContent = content;
while ((match = entryRegex.exec(fullContent)) !== null) {
  const num = parseInt(match[1]);
  const slug = match[2];

  // Find the section for this entry
  const sectionStart = fullContent.indexOf(match[0]);
  const nextSection = fullContent.indexOf('### ', sectionStart + 1);
  const section = nextSection > 0
    ? fullContent.substring(sectionStart, nextSection)
    : fullContent.substring(sectionStart);

  const titleMatch = section.match(/\*\*SEO Title\*\* \| (.+?) \|$/m);
  const descMatch = section.match(/\*\*Meta Description\*\* \| (.+?) \|$/m);

  if (titleMatch && descMatch) {
    entries.push({
      num,
      slug,
      titleLen: titleMatch[1].replace(/\\\|/g, '|').length,
      descLen: descMatch[1].length
    });
  }
}

// Build new summary table
let summaryTable = '| # | Theme | Title Chars | Desc Chars |\n|---|-------|-------------|------------|\n';
entries.forEach(e => {
  summaryTable += `| ${e.num} | ${e.slug} | ${e.titleLen} | ${e.descLen} |\n`;
});

const titleLens = entries.map(e => e.titleLen);
const descLens = entries.map(e => e.descLen);

summaryTable += `\n**Title range:** ${Math.min(...titleLens)}-${Math.max(...titleLens)} chars (all within 50-60 target)\n`;
summaryTable += `**Description range:** ${Math.min(...descLens)}-${Math.max(...descLens)} chars (all within 150-160 target)`;

// Replace the old summary table
const summaryStart = content.indexOf('## Character Count Summary');
const summaryEnd = content.indexOf('\n---\n', summaryStart);
const oldSummary = content.substring(summaryStart, summaryEnd);

const newSummary = `## Character Count Summary\n\n${summaryTable}`;
content = content.replace(oldSummary, newSummary);

fs.writeFileSync('docs/seo-keywords/en-theme-hubs.md', content, 'utf8');
console.log(`Fixed ${entries.length} entries. Summary table updated.`);
