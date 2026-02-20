#!/usr/bin/env node
/**
 * SEO Part 29 — Product Page Performance Audit
 *
 * Checks all product-page components for CWV-affecting code patterns:
 *   A. LCP Image Patterns (HeroSection)
 *   B. Framer Motion SSR Safety
 *   C. Image Optimization (<Image> sizes, loading strategy)
 *   D. Responsive Design (no fixed widths, responsive padding)
 *   E. Accessibility (aria-labels, alt text)
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'frontend', 'components', 'product-page');

let totalPass = 0;
let totalFail = 0;
let totalWarn = 0;

function pass(msg) { totalPass++; console.log(`  \x1b[32mPASS\x1b[0m ${msg}`); }
function fail(msg) { totalFail++; console.log(`  \x1b[31mFAIL\x1b[0m ${msg}`); }
function warn(msg) { totalWarn++; console.log(`  \x1b[33mWARN\x1b[0m ${msg}`); }
function header(msg) { console.log(`\n\x1b[1m${msg}\x1b[0m`); }

// Read all .tsx files in product-page directory
const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.tsx'));
const fileContents = {};
for (const file of files) {
  fileContents[file] = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf8');
}

// ═══════════════════════════════════════════════════════════════
// A. LCP IMAGE PATTERNS (HeroSection)
// ═══════════════════════════════════════════════════════════════
header('A. LCP Image Patterns (HeroSection)');

const hero = fileContents['HeroSection.tsx'] || '';

// A1: Hero image uses priority={true} (preloads LCP element)
if (/Image[\s\S]*?priority[\s\S]*?\/>/m.test(hero) && hero.includes('previewImageSrc')) {
  pass('Hero image has priority attribute (preloads LCP element)');
} else {
  fail('Hero image missing priority attribute — LCP will be delayed');
}

// A2: Hero image has explicit sizes attribute
const heroImageBlock = hero.match(/<Image\s[\s\S]*?src=\{previewImageSrc\}[\s\S]*?\/>/);
if (heroImageBlock) {
  if (/sizes=/.test(heroImageBlock[0])) {
    pass('Hero image has explicit sizes attribute');
  } else {
    fail('Hero image missing sizes attribute — browser downloads oversized image');
  }
} else {
  warn('Could not locate hero Image component block');
}

// A3: No loading="lazy" on hero image (would delay LCP)
if (heroImageBlock && /loading\s*=\s*["']lazy["']/.test(heroImageBlock[0])) {
  fail('Hero image has loading="lazy" — this delays LCP');
} else {
  pass('Hero image does NOT have loading="lazy" (correct for LCP)');
}

// A4: Hero title (h1) has no animation that hides it on initial render
if (/h1[\s\S]{0,500}hero-fade-in|h1[\s\S]{0,500}initial.*opacity.*0/m.test(hero)) {
  // Check if it's just a CSS class with animation-fill-mode: both (which briefly hides)
  // The h1 should be immediately visible for LCP text
  if (/h1[\s\S]{0,200}hero-fade-in/.test(hero)) {
    warn('H1 has hero-fade-in CSS class — verify it does not delay text LCP');
  } else {
    fail('H1 is hidden on initial render via animation — delays text LCP');
  }
} else {
  pass('H1 title renders immediately (no opacity:0 animation)');
}

// ═══════════════════════════════════════════════════════════════
// B. FRAMER MOTION SSR SAFETY
// ═══════════════════════════════════════════════════════════════
header('B. Framer Motion SSR Safety');

for (const [file, content] of Object.entries(fileContents)) {
  // Find all initial={{ opacity: 0 }} instances
  const lines = content.split('\n');
  let insideLightbox = false;
  let hasMountedGuard = content.includes('hasMounted');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track if we're inside AnimatePresence (lightbox)
    if (/<AnimatePresence>/.test(line)) insideLightbox = true;
    if (/<\/AnimatePresence>/.test(line)) insideLightbox = false;

    // Check for initial={{ opacity: 0 }}
    if (/initial=\{\{.*opacity.*0/.test(line)) {
      const lineNum = i + 1;

      if (insideLightbox) {
        pass(`${file}:${lineNum} — initial={{ opacity: 0 }} inside lightbox modal (safe)`);
      } else if (/initial=\{hasMounted/.test(line)) {
        pass(`${file}:${lineNum} — guarded by hasMounted (safe for SSR)`);
      } else {
        fail(`${file}:${lineNum} — UNGUARDED initial={{ opacity: 0 }} on SSR render path`);
      }
    }

    // Also check initial={{ scale: ..., opacity: 0 }}
    if (/initial=\{\{.*scale.*opacity.*0/.test(line) || /initial=\{\{.*opacity.*0.*scale/.test(line)) {
      const lineNum = i + 1;
      if (insideLightbox) {
        pass(`${file}:${lineNum} — initial with opacity:0+scale inside lightbox (safe)`);
      } else {
        fail(`${file}:${lineNum} — UNGUARDED initial with opacity:0 on SSR render path`);
      }
    }
  }
}

// Check that CSS animations replace Framer Motion for hero entrance
const globals = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', 'globals.css'), 'utf8');
if (globals.includes('heroFadeIn') && globals.includes('hero-fade-in')) {
  pass('CSS @keyframes heroFadeIn replaces Framer Motion for hero entrance');
} else {
  fail('Missing CSS heroFadeIn animation — hero may use Framer Motion initial opacity:0');
}

if (globals.includes('prefers-reduced-motion')) {
  pass('globals.css respects prefers-reduced-motion');
} else {
  warn('globals.css does not include prefers-reduced-motion media query');
}

// ═══════════════════════════════════════════════════════════════
// C. IMAGE OPTIMIZATION
// ═══════════════════════════════════════════════════════════════
header('C. Image Optimization');

for (const [file, content] of Object.entries(fileContents)) {
  // Find all <Image components
  const imageBlocks = content.match(/<Image\s[\s\S]*?\/>/g) || [];

  for (const block of imageBlocks) {
    // Check for sizes attribute on fill images
    if (/fill/.test(block) && !/sizes=/.test(block)) {
      // Extract a short identifier
      const srcMatch = block.match(/src=\{([^}]+)\}/);
      const src = srcMatch ? srcMatch[1] : 'unknown';
      fail(`${file} — <Image fill> with src={${src}} missing sizes attribute`);
    }
  }

  // Check for raw <img> tags outside noscript
  const lines = content.split('\n');
  let insideNoscript = false;
  for (let i = 0; i < lines.length; i++) {
    if (/<noscript>/.test(lines[i])) insideNoscript = true;
    if (/<\/noscript>/.test(lines[i])) insideNoscript = false;

    if (!insideNoscript && /<img\s/.test(lines[i]) && !/<Image/.test(lines[i])) {
      // Raw img tag outside noscript — check if it's in a comment
      if (!/\/\/.*<img/.test(lines[i]) && !/\{\/\*.*<img/.test(lines[i])) {
        warn(`${file}:${i + 1} — raw <img> tag outside <noscript> (consider next/image)`);
      }
    }
  }
}

// Check SampleGallery noscript fallback has lazy loading for below-fold images
const gallery = fileContents['SampleGallery.tsx'] || '';
if (/loading=\{index < \d+ \? ['"]eager['"] : ['"]lazy['"]\}/.test(gallery) ||
    /loading="lazy"/.test(gallery)) {
  pass('SampleGallery noscript fallback uses lazy loading for below-fold images');
} else {
  warn('SampleGallery noscript images may lack lazy loading');
}

// Check thumbnail images have appropriate sizes
if (/sizes="130px"/.test(gallery) || /sizes="120px"/.test(gallery)) {
  pass('SampleGallery thumbnails have constrained sizes attribute');
} else {
  warn('SampleGallery thumbnails may be missing sizes constraint');
}

// ═══════════════════════════════════════════════════════════════
// D. RESPONSIVE DESIGN
// ═══════════════════════════════════════════════════════════════
header('D. Responsive Design');

for (const [file, content] of Object.entries(fileContents)) {
  // Check for fixed pixel widths > 400px without responsive wrapper
  const fixedWidthMatches = content.match(/w-\[(\d+)px\]/g) || [];
  for (const match of fixedWidthMatches) {
    const px = parseInt(match.match(/\d+/)[0]);
    if (px > 400) {
      // Check if it's inside a hidden-on-mobile class
      const idx = content.indexOf(match);
      const surroundingContext = content.substring(Math.max(0, idx - 500), idx + match.length + 50);
      if (/hidden\s+(?:sm:|md:|lg:)?block|overflow-hidden|absolute/.test(surroundingContext)) {
        pass(`${file} — w-[${px}px] is inside overflow-hidden or responsive-hidden wrapper`);
      } else {
        warn(`${file} — fixed width w-[${px}px] may overflow on mobile`);
      }
    }
  }
}

// Check that main containers use responsive padding
if (/px-4\s+sm:px-6\s+lg:px-8/.test(hero) || /px-4\s+sm:px-6/.test(hero)) {
  pass('HeroSection uses responsive padding (px-4 sm:px-6 lg:px-8)');
} else {
  warn('HeroSection may lack responsive padding pattern');
}

// Check for clamp() typography
if (/clamp\(/.test(hero)) {
  pass('HeroSection uses clamp() for responsive typography');
} else {
  warn('HeroSection does not use clamp() for typography');
}

// Check for touch event handlers (mobile swipe)
if (/onTouchStart|handleTouchStart/.test(gallery)) {
  pass('SampleGallery has touch swipe handlers for mobile');
} else {
  warn('SampleGallery missing touch handlers');
}

// ═══════════════════════════════════════════════════════════════
// E. ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════
header('E. Accessibility');

// Check lightbox close button has aria-label
if (/aria-label="Close/.test(gallery) || /aria-label="close/.test(gallery)) {
  pass('Lightbox close button has aria-label');
} else {
  fail('Lightbox close button missing aria-label');
}

// Check navigation buttons have aria-labels
if (/aria-label="Previous sample"/.test(gallery) && /aria-label="Next sample"/.test(gallery)) {
  pass('Navigation buttons have aria-labels');
} else {
  fail('Navigation buttons missing aria-labels');
}

// Check all Image components have alt text
for (const [file, content] of Object.entries(fileContents)) {
  const imageBlocks = content.match(/<Image\s[\s\S]*?\/>/g) || [];
  for (const block of imageBlocks) {
    if (!/alt=/.test(block)) {
      fail(`${file} — <Image> component missing alt attribute`);
    }
  }
}

// Check hero scroll-to-samples button accessibility
if (/scrollToSamples|viewSamples/.test(hero)) {
  pass('Hero has scroll-to-samples button with visible label');
} else {
  warn('Hero may lack scroll-to-samples accessibility');
}

// Check thumbnail strip scroll buttons have aria-labels
if (/aria-label="Scroll thumbnails/.test(gallery)) {
  pass('Thumbnail strip scroll buttons have aria-labels');
} else {
  warn('Thumbnail strip scroll buttons may lack aria-labels');
}

// ═══════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════
header('SUMMARY');
console.log(`  ${totalPass} PASS | ${totalFail} FAIL | ${totalWarn} WARN`);
console.log();

if (totalFail > 0) {
  console.log('\x1b[31mAudit found issues that should be fixed.\x1b[0m');
  process.exit(1);
} else if (totalWarn > 0) {
  console.log('\x1b[33mAudit passed with warnings.\x1b[0m');
} else {
  console.log('\x1b[32mAll checks passed!\x1b[0m');
}
