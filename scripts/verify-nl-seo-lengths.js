#!/usr/bin/env node
/**
 * Verify ALL NL SEO lengths are within target ranges.
 * Titles: 50-60 chars (decoded), Descriptions: 150-160 chars (decoded)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let totalChecked = 0;
let totalWarnings = 0;
const allWarnings = [];

function unescape(str) {
  if (!str) return '';
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

function dLen(str) { return unescape(str).length; }

function check(label, field, value, minLen, maxLen) {
  totalChecked++;
  const len = dLen(value);
  if (len < minLen || len > maxLen) {
    const msg = `${label} ${field}: ${len} chars (need ${minLen}-${maxLen})`;
    allWarnings.push(msg);
    totalWarnings++;
    return false;
  }
  return true;
}

// ─── Section 1: Product Pages ────────────────────────────────────────────────
console.log('\n=== SECTION 1: PRODUCT PAGES ===');
{
  const dir = path.join(ROOT, 'frontend/content/product-pages/nl');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
  let ok = 0, bad = 0;
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const slug = file.replace('.ts', '');
    const tm = content.match(/seo:\s*\{[\s\S]*?title:\s*'([^']*(?:\\.[^']*)*)'/);
    const dm = content.match(/seo:\s*\{[\s\S]*?description:\s*'([^']*(?:\\.[^']*)*)'/);
    let good = true;
    if (tm) { if (!check(slug, 'title', tm[1], 50, 60)) good = false; }
    if (dm) { if (!check(slug, 'desc', dm[1], 150, 160)) good = false; }
    if (good) ok++; else bad++;
  }
  console.log(`  ${ok} OK, ${bad} warnings`);
}

// ─── Section 2: Theme Hubs ───────────────────────────────────────────────────
console.log('\n=== SECTION 2: THEME HUBS ===');
{
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const themes = fs.readdirSync(baseDir).filter(d =>
    fs.existsSync(path.join(baseDir, d, 'nl.ts')) &&
    fs.statSync(path.join(baseDir, d)).isDirectory()
  ).sort();
  let ok = 0, bad = 0;
  for (const theme of themes) {
    const content = fs.readFileSync(path.join(baseDir, theme, 'nl.ts'), 'utf8');
    const gradePos = content.indexOf('gradeContent');
    const top = gradePos > 0 ? content.substring(0, gradePos) : content;
    const tm = top.match(/^\s*title:\s*'([^']*)'/m);
    const dm = top.match(/^\s*description:\s*'([^']*)'/m);
    let good = true;
    if (tm) { if (!check(`${theme} hub`, 'title', tm[1], 50, 60)) good = false; }
    if (dm) { if (!check(`${theme} hub`, 'desc', dm[1], 150, 160)) good = false; }
    if (good) ok++; else bad++;
  }
  console.log(`  ${ok} OK, ${bad} warnings`);
}

// ─── Section 3: Theme+Grade ──────────────────────────────────────────────────
console.log('\n=== SECTION 3: THEME+GRADE ===');
{
  const baseDir = path.join(ROOT, 'frontend/content/themes');
  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  const themes = fs.readdirSync(baseDir).filter(d =>
    fs.existsSync(path.join(baseDir, d, 'nl.ts')) &&
    fs.statSync(path.join(baseDir, d)).isDirectory()
  ).sort();
  let ok = 0, bad = 0;
  for (const theme of themes) {
    const content = fs.readFileSync(path.join(baseDir, theme, 'nl.ts'), 'utf8');
    for (const grade of grades) {
      const tr = new RegExp(`['"]${grade}['"]\\s*:\\s*\\{[\\s\\S]*?seoTitle:\\s*'([^']*)'`);
      const dr = new RegExp(`['"]${grade}['"]\\s*:\\s*\\{[\\s\\S]*?seoDescription:\\s*'([^']*)'`);
      const tm = content.match(tr);
      const dm = content.match(dr);
      let good = true;
      if (tm) { if (!check(`${theme}/${grade}`, 'title', tm[1], 50, 60)) good = false; }
      if (dm) { if (!check(`${theme}/${grade}`, 'desc', dm[1], 150, 160)) good = false; }
      if (good) ok++; else bad++;
    }
  }
  console.log(`  ${ok} OK, ${bad} warnings`);
}

// ─── Section 4: Category Hubs ────────────────────────────────────────────────
console.log('\n=== SECTION 4: CATEGORY HUBS ===');
{
  const content = fs.readFileSync(path.join(ROOT, 'frontend/config/category-content.ts'), 'utf8');
  // Find all nl: blocks within category entries
  const nlBlocks = content.match(/nl:\s*\{[^}]*title:\s*'[^']*'[^}]*description:\s*'[^']*'/g) || [];
  let ok = 0, bad = 0;
  for (const block of nlBlocks) {
    const tm = block.match(/title:\s*'([^']*)'/);
    const dm = block.match(/description:\s*'([^']*)'/);
    if (tm) {
      let good = true;
      if (!check('category', 'title', tm[1], 50, 60)) good = false;
      if (dm && !check('category', 'desc', dm[1], 150, 160)) good = false;
      if (good) ok++; else bad++;
    }
  }
  console.log(`  ${ok} OK, ${bad} warnings`);
}

// ─── Section 5: Grade Hubs ───────────────────────────────────────────────────
console.log('\n=== SECTION 5: GRADE HUBS ===');
{
  const content = fs.readFileSync(path.join(ROOT, 'frontend/config/grade-content.ts'), 'utf8');
  const nlBlocks = content.match(/nl:\s*\{[^}]*title:\s*'[^']*'[^}]*description:\s*'[^']*'/g) || [];
  let ok = 0, bad = 0;
  for (const block of nlBlocks) {
    const tm = block.match(/title:\s*'([^']*)'/);
    const dm = block.match(/description:\s*'([^']*)'/);
    if (tm) {
      let good = true;
      if (!check('grade', 'title', tm[1], 50, 60)) good = false;
      if (dm && !check('grade', 'desc', dm[1], 150, 160)) good = false;
      if (good) ok++; else bad++;
    }
  }
  console.log(`  ${ok} OK, ${bad} warnings`);
}

// ─── Section 6: Navigation Pages ─────────────────────────────────────────────
console.log('\n=== SECTION 6: NAVIGATION PAGES ===');
{
  let ok = 0, bad = 0;

  // Homepage
  const hp = fs.readFileSync(path.join(ROOT, 'frontend/app/[locale]/page.tsx'), 'utf8');
  const hpNl = hp.match(/nl:\s*\{[^}]*title:\s*'([^']*)'[^}]*description:\s*'([^']*)'/);
  if (hpNl) {
    let good = true;
    if (!check('homepage', 'title', hpNl[1], 50, 60)) good = false;
    if (!check('homepage', 'desc', hpNl[2], 150, 160)) good = false;
    if (good) ok++; else bad++;
  }

  // Apps
  const ap = fs.readFileSync(path.join(ROOT, 'frontend/app/[locale]/apps/page.tsx'), 'utf8');
  const apNl = ap.match(/nl:\s*\{[^}]*title:\s*'([^']*)'[^}]*description:\s*'([^']*)'/);
  if (apNl) {
    let good = true;
    if (!check('apps', 'title', apNl[1], 50, 60)) good = false;
    if (!check('apps', 'desc', apNl[2], 150, 160)) good = false;
    if (good) ok++; else bad++;
  }

  // Worksheets (separate maps)
  const ws = fs.readFileSync(path.join(ROOT, 'frontend/app/[locale]/worksheets/page.tsx'), 'utf8');
  const wsTitle = ws.match(/nl:\s*'([^']*)'/);
  // Find the second nl: entry for description
  const wsDescs = [...ws.matchAll(/nl:\s*'([^']*)'/g)];
  if (wsTitle) {
    let good = true;
    if (!check('worksheets', 'title', wsTitle[1], 50, 60)) good = false;
    if (wsDescs.length >= 2) {
      if (!check('worksheets', 'desc', wsDescs[1][1], 150, 160)) good = false;
    }
    if (good) ok++; else bad++;
  }

  // Pricing
  const pr = fs.readFileSync(path.join(ROOT, 'frontend/app/[locale]/pricing/page.tsx'), 'utf8');
  const prNl = pr.match(/nl:\s*\{[^}]*title:\s*'([^']*)'[^}]*description:\s*'([^']*)'/);
  if (prNl) {
    let good = true;
    if (!check('pricing', 'title', prNl[1], 50, 60)) good = false;
    if (!check('pricing', 'desc', prNl[2], 150, 160)) good = false;
    if (good) ok++; else bad++;
  }

  // Blog listing
  const bl = fs.readFileSync(path.join(ROOT, 'frontend/app/[locale]/blog/(listing)/page.tsx'), 'utf8');
  const blNl = bl.match(/nl:\s*\{[^}]*title:\s*'([^']*)'[^}]*description:\s*'([^']*)'/);
  if (blNl) {
    let good = true;
    if (!check('blog', 'title', blNl[1], 50, 60)) good = false;
    if (!check('blog', 'desc', blNl[2], 150, 160)) good = false;
    if (good) ok++; else bad++;
  }

  // Contact
  const ct = fs.readFileSync(path.join(ROOT, 'frontend/app/[locale]/contact/page.tsx'), 'utf8');
  const ctNl = ct.match(/nl:\s*\{[^}]*title:\s*'([^']*)'[^}]*description:\s*'([^']*)'/);
  if (ctNl) {
    let good = true;
    if (!check('contact', 'title', ctNl[1], 50, 60)) good = false;
    if (!check('contact', 'desc', ctNl[2], 150, 160)) good = false;
    if (good) ok++; else bad++;
  } else {
    allWarnings.push('contact: nl: block not found');
    totalWarnings++;
    bad++;
  }

  console.log(`  ${ok} OK, ${bad} warnings`);
}

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(60));
console.log(`TOTAL: ${totalChecked} fields checked, ${totalWarnings} warnings`);
if (allWarnings.length > 0) {
  console.log('\nWARNINGS:');
  for (const w of allWarnings) console.log(`  \u26a0 ${w}`);
}
console.log('='.repeat(60));
