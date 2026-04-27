// One-shot bulk-wiring script for Brief A step 4.
//
// Per the completion-phase brief: this script does the MECHANICAL parts of
// the SEO surface across the 26 smoke-test apps. Per-row sr-only,
// per-deck summary sr-only, per-element sr-only, and image alts from the
// vocabulary system are explicitly OUT OF SCOPE here — they belong to step 5
// (per-app refinement, grouped by exercise pattern).
//
// What this script does, per app:
//   1. Wraps the existing renderStandaloneHTML() head construction with
//      a call to LCSCatalogExport.buildSeoHead(opts) — replaces the
//      single hardcoded <title> line with the full SEO head bundle
//   2. Inserts LCSCatalogExport.HREFLANG_MARKER as the LAST element of
//      <head> (before parts.push('</head>'))
//   3. Inserts a conditional <p class="lcs-sr">instruction</p> after the
//      <h1 class="lcs-title"> line (rendered when bundle.seoMeta.instruction
//      is set; step 5 fills in seoMeta per app)
//   4. Inserts LCSCatalogExport.buildEndDeckLinks() output as a static
//      <aside class="lcs-end-deck"> after the </footer> line
//   5. Adds .lcs-end-deck CSS rules to INTERACTIVE_CSS_LINES
//   6. Adds an escapeHtml helper function adjacent to renderStandaloneHTML
//      (if not already present)
//
// This script does NOT touch:
//   - createHeaderGroup (no canvas caching — that's per-app step 5 work)
//   - extractDeckBundle (no seoMeta injection — that's per-app step 5 work)
//   - INTERACTIVE_RUNTIME_LINES (no per-row sr-only / image alt — step 5)
//   - The 3 deep-test apps (already done end-to-end)
//
// Run from repo root: node scripts/_brief-a-bulk-seo-wiring.js [--dry-run]
//
// One-shot tool — do not commit. Track failures and surface them.

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

// 26 smoke-test apps. Excludes the 3 deep-test apps (addition, wordsearch,
// treasure-hunt) plus coloring + writing (PDF-only per CLAUDE.md §1).
const SMOKE_TEST_APPS = [
  'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition',
  'crossword', 'cryptogram', 'find-and-count', 'find-objects', 'grid-match',
  'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces', 'more-less',
  'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
  'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
  'word-guess', 'word-scramble'
];

const END_DECK_CSS_RULES = [
  // End-of-deck internal links (Brief A §5.5).
  `        '.lcs-end-deck{max-width:760px;margin:24px auto 96px;padding:20px;background:#FFF;border:2px solid #DCE1E6;border-radius:14px}',`,
  `        '.lcs-end-deck .end-deck-links h2{font-size:1.25rem;margin:0 0 12px;color:#1C1C1E}',`,
  `        '.lcs-end-deck .end-deck-links ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}',`,
  `        '.lcs-end-deck .end-deck-links a{display:block;padding:12px 16px;border-radius:10px;background:#F4F6FB;color:#4E5FE8;text-decoration:none;font-weight:500;transition:background-color .15s}',`,
  `        '.lcs-end-deck .end-deck-links a:hover{background:#E8ECF7}',`,
  `        '.lcs-end-deck .end-deck-links a:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',`
];

const ESCAPE_HTML_HELPER = `
    function escapeHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }`;

function bulkWireApp(filePath, appSlug) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const failures = [];
  const eol = content.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

  // Detect the indentation style by looking at the renderStandaloneHTML body.
  // Most apps use 4-space (8 inside parts.push); treasure-hunt uses 6-space.
  // Some apps suffix the function name (e.g., renderStandaloneHTML_v12 in
  // prepositions.html) — match those too.
  const fnMatch = content.match(/(\n)([ \t]+)function renderStandaloneHTML[a-zA-Z0-9_]*\(/);
  if (!fnMatch) {
    failures.push('renderStandaloneHTML function not found');
    return { content: original, failures, changed: false };
  }
  const fnIndent = fnMatch[2];
  const bodyIndent = fnIndent + '    ';

  // ───────────────────────────────────────────────────────────────────────
  // 1+2. Inject seoHead/hreflangMarker/endDeckLinks variable declarations
  //      into renderStandaloneHTML, placed right after `var title = ...`.
  // ───────────────────────────────────────────────────────────────────────
  const titleVarRe = new RegExp(
    '(' + bodyIndent.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&') +
    'var title = .+?;[\\r\\n]+)'
  );
  const titleVarMatch = content.match(titleVarRe);
  if (!titleVarMatch) {
    failures.push('var title = ... line not found in renderStandaloneHTML');
    return { content: original, failures, changed: false };
  }

  // Skip if already wired (idempotent re-runs).
  if (content.includes('LCSCatalogExport.buildSeoHead')) {
    return { content: original, failures: ['already has buildSeoHead — skipped'], changed: false };
  }

  const seoVarBlock =
    bodyIndent + 'var seo = bundle.seoMeta || {};' + eol +
    bodyIndent + 'var displayTitle = seo.exerciseTypeName || title;' + eol +
    bodyIndent + 'var seoHead = (window.LCSCatalogExport && LCSCatalogExport.buildSeoHead)' + eol +
    bodyIndent + '    ? LCSCatalogExport.buildSeoHead({' + eol +
    bodyIndent + '        language: lang,' + eol +
    bodyIndent + '        exerciseTypeName: displayTitle,' + eol +
    bodyIndent + '        exerciseTypeSlug: seo.exerciseTypeSlug || ' + JSON.stringify(appSlug) + ',' + eol +
    bodyIndent + '        themeName: seo.themeName || null,' + eol +
    bodyIndent + '        worksheetWord: seo.worksheetWord || \'Worksheet\',' + eol +
    bodyIndent + '        instruction: seo.instruction || \'\',' + eol +
    bodyIndent + '        freeInteractive: seo.freeInteractive || \'Free interactive\',' + eol +
    bodyIndent + '        forWord: seo.forWord || \'for\',' + eol +
    bodyIndent + '        printOrPlay: seo.printOrPlay || \'Print or play online\'' + eol +
    bodyIndent + '    })' + eol +
    bodyIndent + '    : \'<title>\' + displayTitle + \'</title>\';' + eol +
    bodyIndent + 'var hreflangMarker = (window.LCSCatalogExport && LCSCatalogExport.HREFLANG_MARKER)' + eol +
    bodyIndent + '    || \'<!-- HREFLANG_INSERTION_POINT -->\';' + eol +
    bodyIndent + 'var endDeckLinks = (window.LCSCatalogExport && LCSCatalogExport.buildEndDeckLinks)' + eol +
    bodyIndent + '    ? LCSCatalogExport.buildEndDeckLinks()' + eol +
    bodyIndent + '    : \'\';' + eol;

  content = content.replace(titleVarRe, titleVarMatch[1] + seoVarBlock);

  // ───────────────────────────────────────────────────────────────────────
  // 3. Replace `parts.push('<title>' + title + '</title>');` with seoHead
  // ───────────────────────────────────────────────────────────────────────
  const titlePushRe = /(\n)([ \t]+)parts\.push\('<title>' \+ title \+ '<\/title>'\);/;
  const titlePushMatch = content.match(titlePushRe);
  if (!titlePushMatch) {
    failures.push('parts.push(\'<title>...\') line not found');
  } else {
    content = content.replace(titlePushRe, titlePushMatch[1] + titlePushMatch[2] + 'parts.push(seoHead);');
  }

  // ───────────────────────────────────────────────────────────────────────
  // 4. Insert hreflangMarker push BEFORE parts.push('</head>')
  // ───────────────────────────────────────────────────────────────────────
  const headCloseRe = /(\n)([ \t]+)parts\.push\('<\/head>'\);/;
  const headCloseMatch = content.match(headCloseRe);
  if (!headCloseMatch) {
    failures.push('parts.push(\'</head>\') not found');
  } else {
    const indent = headCloseMatch[2];
    content = content.replace(
      headCloseRe,
      headCloseMatch[1] + indent + 'parts.push(hreflangMarker);' + headCloseMatch[1] + indent + 'parts.push(\'</head>\');'
    );
  }

  // ───────────────────────────────────────────────────────────────────────
  // 5. Insert instruction sr-only push BEFORE the worksheet-wrap push line
  //    (no h1 verification — the h1 line uses JS string concatenation that
  //    is brittle to anchor on; worksheet-wrap is the cleaner anchor)
  // ───────────────────────────────────────────────────────────────────────
  const wsWrapRe = /(\n)([ \t]+)(parts\.push\('\s*<div class="lcs-worksheet-wrap")/;
  const wsWrapMatch = content.match(wsWrapRe);
  if (!wsWrapMatch) {
    failures.push('parts.push for <div class="lcs-worksheet-wrap"> not found — instruction sr-only skipped');
  } else {
    const wsIndent = wsWrapMatch[2];
    const insertion =
      wsWrapMatch[1] + wsIndent + 'if (seo.instruction) {' +
      wsWrapMatch[1] + wsIndent + '    parts.push(\'  <p class="lcs-sr">\' + escapeHtml(seo.instruction) + \'</p>\');' +
      wsWrapMatch[1] + wsIndent + '}';
    content = content.replace(wsWrapRe, insertion + wsWrapMatch[1] + wsWrapMatch[2] + wsWrapMatch[3]);
  }

  // ───────────────────────────────────────────────────────────────────────
  // 6. Insert end-deck aside after parts.push('</footer>')
  // ───────────────────────────────────────────────────────────────────────
  const footerCloseRe = /(\n)([ \t]+)parts\.push\('<\/footer>'\);/;
  const footerCloseMatch = content.match(footerCloseRe);
  if (!footerCloseMatch) {
    failures.push('parts.push(\'</footer>\') not found');
  } else {
    const indent = footerCloseMatch[2];
    const insertion =
      footerCloseMatch[1] + indent + 'parts.push(\'</footer>\');' +
      footerCloseMatch[1] + indent + 'if (endDeckLinks) {' +
      footerCloseMatch[1] + indent + '    parts.push(\'<aside class="lcs-end-deck">\');' +
      footerCloseMatch[1] + indent + '    parts.push(endDeckLinks);' +
      footerCloseMatch[1] + indent + '    parts.push(\'</aside>\');' +
      footerCloseMatch[1] + indent + '}';
    content = content.replace(footerCloseRe, insertion);
  }

  // ───────────────────────────────────────────────────────────────────────
  // 7. Add .lcs-end-deck CSS rules after the first two CSS lines
  //    (after '*{box-sizing:border-box}' + 'html,body{margin:0;padding:0}')
  // ───────────────────────────────────────────────────────────────────────
  const cssAnchorRe = /([ \t]*'html,body\{margin:0;padding:0\}',\r?\n)/;
  const cssAnchorMatch = content.match(cssAnchorRe);
  if (!cssAnchorMatch) {
    failures.push('CSS anchor (html,body{margin:0;padding:0}) not found');
  } else {
    // Detect indent from the matched line
    const cssIndentMatch = cssAnchorMatch[1].match(/^([ \t]*)'/);
    const cssIndent = cssIndentMatch ? cssIndentMatch[1] : '        ';
    const cssBlock = END_DECK_CSS_RULES
      .map(line => line.replace(/^        /, cssIndent))
      .join(eol) + eol;
    content = content.replace(cssAnchorRe, cssAnchorMatch[1] + cssBlock);
  }

  // ───────────────────────────────────────────────────────────────────────
  // 8. Add escapeHtml helper after renderStandaloneHTML closing brace
  //    (only if not already present — check by name match)
  // ───────────────────────────────────────────────────────────────────────
  if (!/function escapeHtml\(/.test(content)) {
    // Insert immediately after renderStandaloneHTML's closing brace.
    // The pattern: function returns parts.join('\n'), then `}` at fnIndent level.
    const fnEndRe = new RegExp(
      '([ \\t]+return parts\\.join\\(\'\\\\n\'\\);[\\r\\n]+' +
      fnIndent.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&') + '\\})'
    );
    const fnEndMatch = content.match(fnEndRe);
    if (!fnEndMatch) {
      failures.push('renderStandaloneHTML closing brace pattern not found — escapeHtml helper not inserted');
    } else {
      const helper = ESCAPE_HTML_HELPER.replace(/^    /gm, fnIndent);
      content = content.replace(fnEndRe, fnEndMatch[1] + eol + helper);
    }
  }

  return { content, failures, changed: content !== original };
}

const dir = 'REFERENCE APPS';
const summary = { ok: [], partial: [], failed: [], skipped: [] };

for (const app of SMOKE_TEST_APPS) {
  const filePath = path.join(dir, app + '.html');
  if (!fs.existsSync(filePath)) {
    console.error('MISSING: ' + filePath);
    summary.failed.push(app);
    continue;
  }
  const result = bulkWireApp(filePath, app);
  if (result.failures.length > 0 && result.failures[0] === 'already has buildSeoHead — skipped') {
    console.log('SKIP: ' + app + ' (already wired)');
    summary.skipped.push(app);
    continue;
  }
  if (!result.changed) {
    console.error('FAIL: ' + app + ' — ' + result.failures.join('; '));
    summary.failed.push(app);
    continue;
  }
  if (!DRY_RUN) {
    fs.writeFileSync(filePath, result.content, 'utf8');
  }
  if (result.failures.length === 0) {
    console.log('OK:   ' + app);
    summary.ok.push(app);
  } else {
    console.log('WARN: ' + app + ' — ' + result.failures.length + ' partial: ' + result.failures.join('; '));
    summary.partial.push({ app, failures: result.failures });
  }
}

console.log('');
console.log('═'.repeat(60));
console.log('Summary: ' + summary.ok.length + ' ok, ' + summary.partial.length + ' partial, ' + summary.failed.length + ' failed, ' + summary.skipped.length + ' skipped');
if (DRY_RUN) console.log('(DRY RUN — no files written)');
if (summary.partial.length > 0) {
  console.log('');
  console.log('Partial failures (need manual treatment):');
  summary.partial.forEach(({ app, failures }) => {
    console.log('  ' + app + ':');
    failures.forEach(f => console.log('    - ' + f));
  });
}
if (summary.failed.length > 0) {
  console.log('');
  console.log('Total failures (need manual treatment):');
  summary.failed.forEach(app => console.log('  ' + app));
}
