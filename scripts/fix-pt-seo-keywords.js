#!/usr/bin/env node
/**
 * Fix primaryKeyword not in titleTag for all PT content files.
 * Strategy: derive primaryKeyword from the first segment of the titleTag.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const DIRS = [
  path.join(BASE, 'app-content', 'pt'),
  path.join(BASE, 'tool-content', 'pt'),
  path.join(BASE, 'bundle-content', 'pt'),
  path.join(BASE, 'start-content', 'pt'),
  path.join(BASE, 'guide-content', 'pt'),
  path.join(BASE, 'idea-content', 'pt'),
];

function extractStringField(content, fieldName) {
  const patterns = [
    new RegExp(`${fieldName}:\\s*'([^']*)'`),
    new RegExp(`${fieldName}:\\s*"([^"]*)"`)
  ];
  for (const re of patterns) {
    const m = content.match(re);
    if (m) return { value: m[1], quote: m[0][m[0].indexOf(m[1]) - 1], fullMatch: m[0] };
  }
  return null;
}

let fixed = 0;
let skipped = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = extractStringField(content, 'titleTag');
    const kwMatch = extractStringField(content, 'primaryKeyword');

    if (!titleMatch || !kwMatch) continue;

    const title = titleMatch.value;
    const currentKw = kwMatch.value;

    // Check if keyword is already in title
    if (title.toLowerCase().includes(currentKw.toLowerCase())) {
      skipped++;
      continue;
    }

    // Derive new keyword from title's first segment (before | or —)
    let firstPart = title.split(/\s*[|—–]\s*/)[0].trim();
    let newKw = firstPart.toLowerCase();

    // Verify the new keyword is actually in the title
    if (!title.toLowerCase().includes(newKw)) {
      console.log(`WARN: derived keyword not in title for ${file}: "${newKw}" not in "${title}"`);
      continue;
    }

    // Replace the primaryKeyword value in the file
    const oldLine = kwMatch.fullMatch;
    const newLine = `primaryKeyword: '${newKw}'`;

    content = content.replace(oldLine, newLine);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`FIXED ${path.relative(BASE, filePath)}: "${currentKw}" → "${newKw}"`);
    fixed++;
  }
}

console.log(`\nDone: ${fixed} fixed, ${skipped} already passing`);
