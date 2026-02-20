#!/usr/bin/env node
/**
 * Mobile Design Audit Script for LessonCraftStudio Landing Pages
 *
 * Static analysis of theme-page components and page templates for
 * mobile-first best practices: grid breakpoints, padding, badge sizes,
 * text sizes, and container patterns.
 *
 * Usage:
 *   node scripts/mobile-audit.js          # color-coded output
 *   node scripts/mobile-audit.js --json   # JSON output for CI
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

const args = process.argv.slice(2);
const JSON_OUTPUT = args.includes('--json');

// Colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const results = { pass: 0, warn: 0, fail: 0, checks: [] };

function log(level, msg, detail) {
  const tag = level === 'PASS' ? `${GREEN}PASS${RESET}`
            : level === 'WARN' ? `${YELLOW}WARN${RESET}`
            : `${RED}FAIL${RESET}`;

  results.checks.push({ level, msg, detail: detail || '' });
  if (level === 'PASS') results.pass++;
  else if (level === 'WARN') results.warn++;
  else results.fail++;

  if (!JSON_OUTPUT) {
    console.log(`  [${tag}] ${msg}${detail ? ` — ${detail}` : ''}`);
  }
}

function heading(title) {
  if (!JSON_OUTPUT) {
    console.log(`\n${BOLD}${CYAN}${title}${RESET}`);
    console.log('-'.repeat(60));
  }
}

function readFile(relPath) {
  const full = path.join(FRONTEND, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf-8');
}

function getComponentFiles() {
  const dir = path.join(FRONTEND, 'components/theme-page');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.tsx'))
    .map(f => ({
      name: f,
      content: fs.readFileSync(path.join(dir, f), 'utf-8'),
    }));
}

// --- 1. Grid Audit ---
function auditGrids() {
  heading('1. Grid Breakpoint Audit');

  const files = getComponentFiles();
  const pages = [
    { name: '[theme]/page.tsx', content: readFile('app/[locale]/worksheets/[theme]/page.tsx') },
    { name: '[grade]/page.tsx', content: readFile('app/[locale]/worksheets/[theme]/[grade]/page.tsx') },
  ];
  const all = [...files, ...pages].filter(f => f.content);

  // Match grid-cols-N where N > 2 and not preceded by a breakpoint prefix (sm:|md:|lg:|xl:)
  const badGridPattern = /(?<!\w:)grid-cols-([3-9]|1[0-2])/g;

  let found = 0;
  for (const file of all) {
    const matches = [...file.content.matchAll(badGridPattern)];
    if (matches.length > 0) {
      // Check if each match is really unprefixed (not sm:grid-cols-3, etc.)
      for (const m of matches) {
        const idx = m.index;
        const before = file.content.substring(Math.max(0, idx - 4), idx);
        if (!/(?:sm|md|lg|xl):$/.test(before)) {
          // Allow grid-cols-3 when items have small fixed widths (w-20 or smaller = 80px)
          // 3 x 80px + gaps = ~256px fits 320px screens
          const lineStart = file.content.lastIndexOf('\n', idx) + 1;
          const contextEnd = Math.min(file.content.length, idx + 300);
          const context = file.content.substring(lineStart, contextEnd);
          const hasSmallItems = /w-(1[0-9]|20)\b/.test(context);
          if (hasSmallItems) {
            log('PASS', `${file.name}: grid-cols-3 with small fixed-width items (fits 320px)`,
              `line ~${file.content.substring(0, idx).split('\n').length}`);
          } else {
            log('FAIL', `${file.name}: grid starts at ${m[0]} without smaller breakpoint`,
              `line ~${file.content.substring(0, idx).split('\n').length}`);
            found++;
          }
        }
      }
    }
  }

  if (found === 0) {
    log('PASS', 'All grids use mobile-first breakpoints (start at 1-2 cols)');
  }
}

// --- 2. Padding Audit ---
function auditPadding() {
  heading('2. Large Padding Audit');

  const files = getComponentFiles();
  // Look for pr-20+ or pl-20+ without responsive prefix
  const largePadPattern = /(?<!\w:)(p[rlxy]-(2[0-9]|[3-9][0-9]))/g;

  let found = 0;
  for (const file of files) {
    const matches = [...file.content.matchAll(largePadPattern)];
    for (const m of matches) {
      const idx = m.index;
      const before = file.content.substring(Math.max(0, idx - 4), idx);
      if (!/(?:sm|md|lg|xl):$/.test(before)) {
        // Check if there's a responsive variant nearby (same line)
        const lineStart = file.content.lastIndexOf('\n', idx) + 1;
        const lineEnd = file.content.indexOf('\n', idx);
        const line = file.content.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
        const hasResponsive = /(?:sm|md|lg|xl):p[rlxy]-/.test(line);
        if (!hasResponsive) {
          log('WARN', `${file.name}: large fixed padding ${m[0]} without responsive variant`,
            `line ~${file.content.substring(0, idx).split('\n').length}`);
          found++;
        }
      }
    }
  }

  if (found === 0) {
    log('PASS', 'No oversized fixed padding found (all use responsive variants)');
  }
}

// --- 3. Badge/Icon Size Audit ---
function auditBadgeSizes() {
  heading('3. Badge & Icon Size Audit');

  const files = getComponentFiles();
  // Look for w-6, w-7 badges (below the w-8 threshold)
  const smallBadgePattern = /(?<!\w:)w-([56])\b/g;

  let found = 0;
  for (const file of files) {
    const matches = [...file.content.matchAll(smallBadgePattern)];
    for (const m of matches) {
      const idx = m.index;
      // Check context: is this a badge (has rounded-full or flex items-center)?
      const lineStart = file.content.lastIndexOf('\n', idx) + 1;
      const lineEnd = file.content.indexOf('\n', idx);
      const line = file.content.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      if (line.includes('rounded-full') || line.includes('items-center')) {
        log('WARN', `${file.name}: badge/icon at ${m[0]} (${parseInt(m[1]) * 4}px) — below w-8 threshold`,
          `line ~${file.content.substring(0, idx).split('\n').length}`);
        found++;
      }
    }
  }

  // Also check that step badges meet minimum w-8
  const stepBadgePattern = /w-([0-9]+)\s+h-\1.*?rounded-full/g;
  for (const file of files) {
    const matches = [...file.content.matchAll(stepBadgePattern)];
    for (const m of matches) {
      const size = parseInt(m[1]);
      if (size >= 8) {
        log('PASS', `${file.name}: step badge w-${size} h-${size} (${size * 4}px) meets threshold`);
      }
    }
  }

  if (found === 0 && results.checks.filter(c => c.msg.includes('step badge')).length === 0) {
    log('PASS', 'All badge/icon sizes meet minimum threshold');
  }
}

// --- 4. Text Size Audit ---
function auditTextSizes() {
  heading('4. Text Size Audit');

  const files = getComponentFiles();
  // Flag text-xs in body paragraphs (not in badges/labels which are fine at xs)
  const tinyTextPattern = /text-xs/g;

  let bodyXsCount = 0;
  for (const file of files) {
    const lines = file.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('text-xs')) {
        // Acceptable in: badges, labels, spans with font-bold/font-semibold/uppercase
        const isBadge = line.includes('rounded-full') || line.includes('uppercase') ||
                        line.includes('font-bold') || line.includes('font-semibold') ||
                        line.includes('tracking-wide');
        if (!isBadge && line.includes('<p')) {
          log('WARN', `${file.name}: body text at text-xs (12px)`, `line ${i + 1}`);
          bodyXsCount++;
        }
      }
    }
  }

  // Check that body text uses at least text-sm
  let bodySmCount = 0;
  for (const file of files) {
    if (file.content.includes('text-sm leading-relaxed')) bodySmCount++;
  }

  if (bodyXsCount === 0) {
    log('PASS', 'No body paragraphs below text-sm (14px)');
  }
  if (bodySmCount > 0) {
    log('PASS', `${bodySmCount} component(s) use text-sm with leading-relaxed for readability`);
  }
}

// --- 5. Container Audit ---
function auditContainers() {
  heading('5. Container Pattern Audit');

  const files = getComponentFiles();
  let missingContainer = 0;

  for (const file of files) {
    // Each component should have container mx-auto px-4 (or be a sub-component)
    const hasContainer = file.content.includes('container mx-auto px-4') ||
                         file.content.includes('container mx-auto px-');
    const isSubComponent = !file.content.includes('<section');

    if (!hasContainer && !isSubComponent) {
      log('FAIL', `${file.name}: section without container mx-auto px-4 pattern`);
      missingContainer++;
    }
  }

  if (missingContainer === 0) {
    log('PASS', 'All section components use container mx-auto px-4 pattern');
  }

  // Check page templates
  for (const [name, relPath] of [
    ['Theme hub', 'app/[locale]/worksheets/[theme]/page.tsx'],
    ['Grade page', 'app/[locale]/worksheets/[theme]/[grade]/page.tsx'],
  ]) {
    const content = readFile(relPath);
    if (!content) {
      log('WARN', `${name}: file not found`);
      continue;
    }
    if (content.includes('container mx-auto px-4') || content.includes('container mx-auto px-')) {
      log('PASS', `${name}: uses container pattern`);
    } else {
      log('WARN', `${name}: container pattern not detected in template`);
    }
  }
}

// --- 6. Responsive Pattern Audit ---
function auditResponsivePatterns() {
  heading('6. Responsive Design Patterns');

  const files = getComponentFiles();

  // Check for proper mobile stacking (flex-col -> flex-row)
  let stackPatterns = 0;
  for (const file of files) {
    if (file.content.includes('flex-col') && file.content.includes('flex-row')) {
      stackPatterns++;
    }
  }
  if (stackPatterns > 0) {
    log('PASS', `${stackPatterns} component(s) use flex-col -> flex-row mobile stacking`);
  }

  // Check for responsive text sizing
  let responsiveText = 0;
  for (const file of files) {
    if (/text-\w+\s+(?:sm|md|lg|xl):text-/.test(file.content)) {
      responsiveText++;
    }
  }
  if (responsiveText > 0) {
    log('PASS', `${responsiveText} component(s) use responsive text sizing`);
  }

  // Check no fixed-width containers
  let fixedWidth = 0;
  for (const file of files) {
    if (/style=\{[^}]*width:\s*\d+px/.test(file.content)) {
      const match = file.content.match(/style=\{[^}]*width:\s*(\d+)px/);
      if (match && parseInt(match[1]) > 320) {
        log('WARN', `${file.name}: fixed width ${match[1]}px in inline style`);
        fixedWidth++;
      }
    }
  }
  if (fixedWidth === 0) {
    log('PASS', 'No fixed-width containers detected');
  }

  // Check no horizontal scroll triggers (overflow-x-hidden on body etc.)
  // This is more of a heads-up
  for (const file of files) {
    if (file.content.includes('overflow-x-scroll') || file.content.includes('overflow-x-auto')) {
      log('WARN', `${file.name}: has horizontal scroll — verify on mobile`);
    }
  }
}

// --- Main ---
function main() {
  if (!JSON_OUTPUT) {
    console.log(`\n${BOLD}LessonCraftStudio Mobile Design Audit${RESET}`);
    console.log(`Scanning theme-page components and page templates...\n`);
  }

  auditGrids();
  auditPadding();
  auditBadgeSizes();
  auditTextSizes();
  auditContainers();
  auditResponsivePatterns();

  // Summary
  if (JSON_OUTPUT) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log(`\n${BOLD}Summary${RESET}`);
    console.log('-'.repeat(60));
    console.log(`  ${GREEN}PASS: ${results.pass}${RESET}  ${YELLOW}WARN: ${results.warn}${RESET}  ${RED}FAIL: ${results.fail}${RESET}`);

    if (results.fail > 0) {
      console.log(`\n${RED}${BOLD}Action required: ${results.fail} check(s) failed${RESET}`);
      process.exit(1);
    } else if (results.warn > 0) {
      console.log(`\n${YELLOW}All checks passed with ${results.warn} warning(s)${RESET}`);
    } else {
      console.log(`\n${GREEN}${BOLD}All checks passed!${RESET}`);
    }
  }
}

main();
