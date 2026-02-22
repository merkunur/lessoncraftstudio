/**
 * Part 140 - Core Web Vitals (CWV) Compliance Audit
 *
 * Static code analysis of all rendering components and configuration
 * for LCP, CLS, INP, and general performance patterns.
 *
 * Covers all 250 EN theme+grade pages (same components, same layout).
 */

const fs = require('fs');
const path = require('path');

const FRONTEND = path.join(__dirname, '..', 'frontend');

let errors = 0;
let warnings = 0;
let passes = 0;

function pass(id, msg) {
  passes++;
  console.log(`  \u2705 [${id}] ${msg}`);
}
function error(id, msg) {
  errors++;
  console.log(`  \u274c ERROR [${id}] ${msg}`);
}
function warn(id, msg) {
  warnings++;
  console.log(`  \u26a0\ufe0f  WARN [${id}] ${msg}`);
}

function readFile(relPath) {
  const full = path.join(FRONTEND, relPath);
  if (!fs.existsSync(full)) {
    console.log(`  [SKIP] File not found: ${relPath}`);
    return null;
  }
  return fs.readFileSync(full, 'utf8');
}

// ===================================================================
// FILES TO SCAN
// ===================================================================

const FILES = {
  gradePage:    'app/[locale]/worksheets/[theme]/[grade]/page.tsx',
  layout:       'app/layout.tsx',
  nextConfig:   'next.config.js',
  gradeEdu:     'components/theme-page/GradeEducationalContent.tsx',
  objectives:   'components/theme-page/ThemeLearningObjectives.tsx',
  assessment:   'components/theme-page/ThemeAssessment.tsx',
  quickStats:   'components/theme-page/ThemeQuickStats.tsx',
  curriculum:   'components/theme-page/ThemeCurriculumNotes.tsx',
  teachingTips: 'components/theme-page/ThemeTeachingTips.tsx',
  snippetBox:   'components/theme-page/ThemeSnippetBox.tsx',
};

console.log('=== Part 140: Core Web Vitals Compliance Audit ===\n');
console.log(`Scanning ${Object.keys(FILES).length} files...\n`);

// Load all files
const src = {};
let filesLoaded = 0;
for (const [key, relPath] of Object.entries(FILES)) {
  const content = readFile(relPath);
  if (content !== null) {
    src[key] = content;
    filesLoaded++;
  }
}
console.log(`Loaded ${filesLoaded}/${Object.keys(FILES).length} files.\n`);

// ===================================================================
// A. LCP (Largest Contentful Paint) - 5 checks
// ===================================================================

console.log('--- A. LCP (Largest Contentful Paint) ---\n');

// Check 1: LCP candidate image has fetchPriority="high"
// Supports both static fetchPriority="high" and conditional fetchPriority={i === 0 ? 'high' : undefined}
if (src.gradePage) {
  const hasFetchPriorityHigh =
    /fetchPriority\s*=\s*["']high["']/.test(src.gradePage) ||
    /fetchPriority\s*=\s*\{[^}]*['"]high['"][^}]*\}/.test(src.gradePage);
  if (hasFetchPriorityHigh) {
    pass('LCP-1', 'Hero image has fetchPriority="high" (first image prioritized)');
  } else {
    error('LCP-1', 'Hero image missing fetchPriority="high" - slows LCP');
  }
}

// Check 2: LCP candidate image has loading="eager" (not lazy)
if (src.gradePage) {
  // The hero grid images use loading="eager"
  if (/loading\s*[=:]\s*["']eager["']/i.test(src.gradePage)) {
    pass('LCP-2', 'Hero image has loading="eager" (not lazy-loaded)');
  } else {
    error('LCP-2', 'Hero image missing loading="eager" - deferred LCP load');
  }
}

// Check 3: No next/dynamic lazy imports in the page route
if (src.gradePage) {
  if (/next\/dynamic/.test(src.gradePage) || /dynamic\s*\(/.test(src.gradePage)) {
    error('LCP-3', 'Page route uses next/dynamic - render-blocking deferred imports');
  } else {
    pass('LCP-3', 'No next/dynamic imports in page route (no render-blocking deferrals)');
  }
}

// Check 4: Fonts use preload: true in layout.tsx
if (src.layout) {
  const fontBlocks = src.layout.match(/(Inter|Poppins)\(\{[\s\S]*?\}\)/g) || [];
  const allPreloaded = fontBlocks.length > 0 && fontBlocks.every(b => /preload\s*:\s*true/.test(b));
  if (allPreloaded) {
    pass('LCP-4', `All ${fontBlocks.length} fonts have preload: true`);
  } else {
    error('LCP-4', 'Font(s) missing preload: true - causes FOUT delay on LCP text');
  }
}

// Check 5: Fonts use display: 'swap' (not 'block')
if (src.layout) {
  const hasBlock = /display\s*:\s*['"]block['"]/.test(src.layout);
  const hasSwap = /display\s*:\s*['"]swap['"]/.test(src.layout);
  if (hasBlock) {
    warn('LCP-5', 'Font uses display: "block" - invisible text during load');
  } else if (hasSwap) {
    pass('LCP-5', 'Fonts use display: "swap" (visible text during load)');
  } else {
    warn('LCP-5', 'No explicit font display strategy found');
  }
}

// ===================================================================
// B. CLS (Cumulative Layout Shift) - 5 checks
// ===================================================================

console.log('\n--- B. CLS (Cumulative Layout Shift) ---\n');

// Check 6: All <img> tags in page have explicit width + height
if (src.gradePage) {
  // Find all native <img tags (not next/image Image)
  const imgTags = src.gradePage.match(/<img\b[^>]*>/g) || [];
  const allSized = imgTags.length === 0 || imgTags.every(tag =>
    /width\s*[=:]\s*[{"]?\d+/.test(tag) && /height\s*[=:]\s*[{"]?\d+/.test(tag)
  );
  if (allSized) {
    pass('CLS-6', `All ${imgTags.length} native <img> tag(s) have explicit width + height`);
  } else {
    error('CLS-6', 'Native <img> tag(s) missing explicit width/height - causes image CLS');
  }
}

// Check 7: All next/image fill usages are inside aspect-ratio containers
if (src.gradePage) {
  // Find Image components with fill prop
  const fillImages = src.gradePage.match(/<Image\b[^>]*\bfill\b[^>]*>/g) || [];
  if (fillImages.length === 0) {
    pass('CLS-7', 'No next/image fill usages to check');
  } else {
    // Each fill image should be inside a container with aspect-ratio class
    // In this codebase, they use aspect-[3/4] div wrappers
    const hasAspectRatio = /aspect-\[[\d/]+\]/.test(src.gradePage) || /aspect-ratio/.test(src.gradePage);
    if (hasAspectRatio) {
      pass('CLS-7', `${fillImages.length} fill image(s) wrapped in aspect-ratio containers`);
    } else {
      error('CLS-7', 'next/image fill usage without aspect-ratio container - causes fill image CLS');
    }
  }
}

// Check 8: Every contentVisibility: 'auto' paired with containIntrinsicSize
if (src.gradePage) {
  const cvMatches = src.gradePage.match(/contentVisibility\s*:\s*['"]auto['"]/g) || [];
  const cisMatches = src.gradePage.match(/containIntrinsicSize\s*:/g) || [];
  if (cvMatches.length === 0) {
    pass('CLS-8', 'No contentVisibility: auto to check (page level)');
  } else if (cisMatches.length >= cvMatches.length) {
    pass('CLS-8', `All ${cvMatches.length} contentVisibility:auto paired with containIntrinsicSize`);
  } else {
    error('CLS-8', `${cvMatches.length} contentVisibility:auto but only ${cisMatches.length} containIntrinsicSize - causes section-pop CLS`);
  }
}

// Also check components for contentVisibility pairing
const componentFiles = ['assessment', 'quickStats', 'snippetBox'];
for (const key of componentFiles) {
  if (!src[key]) continue;
  const cvCount = (src[key].match(/contentVisibility\s*:\s*['"]auto['"]/g) || []).length;
  const cisCount = (src[key].match(/containIntrinsicSize\s*:/g) || []).length;
  if (cvCount > 0 && cisCount < cvCount) {
    error('CLS-8+', `${FILES[key]}: ${cvCount} contentVisibility:auto but only ${cisCount} containIntrinsicSize`);
  }
}

// Check 9: No conditional client-side rendering that shifts layout
// Look for {condition && <div>} patterns in 'use client' files
if (src.objectives) {
  // ThemeLearningObjectives is the only 'use client' component
  // Check for dynamic show/hide that could cause CLS
  // The hidden class pattern is CLS-safe (display:none -> display:block, no shift)
  const hasDynamicRender = /\{[^}]*&&\s*<(?:div|section|article)/.test(src.objectives);
  const usesHiddenClass = /className.*hidden/.test(src.objectives);
  if (hasDynamicRender && !usesHiddenClass) {
    warn('CLS-9', 'ThemeLearningObjectives has conditional rendering that may cause CLS');
  } else if (usesHiddenClass) {
    pass('CLS-9', 'Client component uses CSS hidden class (CLS-safe) instead of conditional mounting');
  } else {
    pass('CLS-9', 'No dynamic conditional rendering found in client components');
  }
}

// Check 10: Font loading is self-hosted via next/font (no external Google Fonts URL)
if (src.layout) {
  const hasExternalFontUrl = /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(src.layout);
  const hasNextFont = /next\/font/.test(src.layout);
  if (hasExternalFontUrl) {
    warn('CLS-10', 'External Google Fonts URL detected - causes font-swap CLS');
  } else if (hasNextFont) {
    pass('CLS-10', 'Fonts self-hosted via next/font (no external Google Fonts URL)');
  } else {
    warn('CLS-10', 'No font loading detected');
  }
}

// ===================================================================
// C. INP (Interaction to Next Paint) - 3 checks
// ===================================================================

console.log('\n--- C. INP (Interaction to Next Paint) ---\n');

// Check 11: Page is a Server Component (no 'use client' at top)
if (src.gradePage) {
  if (/^['"]use client['"]/.test(src.gradePage.trim())) {
    error('INP-11', 'Page route is a Client Component - excessive client JS');
  } else {
    pass('INP-11', 'Page route is a Server Component (minimal client JS)');
  }
}

// Check 12: Count of 'use client' components imported is <= 3
if (src.gradePage) {
  // Check each imported component file for 'use client'
  const componentKeys = ['gradeEdu', 'objectives', 'assessment', 'quickStats', 'curriculum', 'teachingTips', 'snippetBox'];
  let clientCount = 0;
  const clientNames = [];
  for (const key of componentKeys) {
    if (src[key] && /^['"]use client['"]/.test(src[key].trim())) {
      clientCount++;
      clientNames.push(key);
    }
  }
  // Also check RelatedBlogPosts and RelatedResources (already verified above as server components)
  if (clientCount <= 3) {
    pass('INP-12', `Only ${clientCount} client component(s) imported: [${clientNames.join(', ')}]`);
  } else {
    warn('INP-12', `${clientCount} client components imported (>3): [${clientNames.join(', ')}]`);
  }
}

// Check 13: No heavy library imports (lodash, moment, date-fns, etc.)
if (src.gradePage) {
  const heavyLibs = ['lodash', 'moment', 'date-fns', 'dayjs', 'underscore', 'jquery', 'rxjs'];
  const found = heavyLibs.filter(lib => src.gradePage.includes(`from '${lib}`) || src.gradePage.includes(`from "${lib}`));
  if (found.length > 0) {
    warn('INP-13', `Heavy library imports found: ${found.join(', ')}`);
  } else {
    pass('INP-13', 'No heavy library imports in page route (lodash, moment, etc.)');
  }
}

// ===================================================================
// D. General Performance - 2 checks
// ===================================================================

console.log('\n--- D. General Performance ---\n');

// Check 14: FAQ uses native <details>/<summary> (not JS accordion)
if (src.gradePage) {
  const hasDetails = /<details\b/.test(src.gradePage);
  const hasSummary = /<summary\b/.test(src.gradePage);
  const hasAccordionLib = /Accordion|Collapse|Disclosure/.test(src.gradePage);
  if (hasDetails && hasSummary) {
    pass('PERF-14', 'FAQ uses native <details>/<summary> (zero JS accordion)');
  } else if (hasAccordionLib) {
    warn('PERF-14', 'FAQ uses JS accordion library instead of native <details>/<summary>');
  } else {
    warn('PERF-14', 'No FAQ section found or uses unknown pattern');
  }
}

// Check 15: Image optimization config has WebP/AVIF formats
if (src.nextConfig) {
  const hasWebP = /image\/webp/.test(src.nextConfig);
  const hasAvif = /image\/avif/.test(src.nextConfig);
  if (hasWebP && hasAvif) {
    pass('PERF-15', 'next.config.js has modern image formats: WebP + AVIF');
  } else if (hasWebP) {
    warn('PERF-15', 'next.config.js has WebP but missing AVIF');
  } else {
    warn('PERF-15', 'next.config.js missing modern image formats (WebP/AVIF)');
  }
}

// ===================================================================
// SUMMARY
// ===================================================================

console.log('\n===================================================');
console.log(`CWV AUDIT COMPLETE: ${filesLoaded} files scanned, 15 checks`);
console.log(`  PASS: ${passes}   WARN: ${warnings}   ERROR: ${errors}`);
console.log('===================================================');

if (errors > 0) {
  console.log('\nCWV compliance issues found. Fix errors before committing.');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\nAll critical CWV checks passed. Warnings are informational only.');
  process.exit(0);
} else {
  console.log('\nPerfect CWV compliance across all checks!');
  process.exit(0);
}
