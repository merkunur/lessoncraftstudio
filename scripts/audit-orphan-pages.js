#!/usr/bin/env node
// Orphan page audit. Enumerates canonical /en/* URLs (apps, tools,
// calculators, guides, bundles, start, ideas, compare) and greps the
// frontend/ tree for inbound href references. Reports any URL that has
// no inbound reference.
//
// Report-only. Does not delete or modify any files. Use the output as
// an input to a triage session — some orphans are legitimate (e.g.,
// accessed only via programmatic redirect, deep-linked from marketing),
// others are dead weight.
//
// Limitations: only audits /en/ (English). Template interpolation like
// `/${locale}/apps/${slug}` is matched as a prefix check. Dynamic
// routes referenced indirectly (e.g. built from a config map) will
// still register as non-orphan because the enumerated slug will match
// the broader prefix pattern.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const frontend = path.join(root, 'frontend');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// Pull the canonical URL set from config data. We only audit EN.
function enumerateUrls() {
  const urls = new Set();

  // Index pages
  urls.add('/en/apps');
  urls.add('/en/tools');
  urls.add('/en/guides');
  urls.add('/en/bundles');
  urls.add('/en/ideas');
  urls.add('/en/start');
  urls.add('/en/compare');

  // apps/[slug] — parse product-page-slugs.ts for EN slugs
  const productSlugsSrc = fs.readFileSync(
    path.join(frontend, 'config', 'product-page-slugs.ts'),
    'utf8'
  );
  // Find each `en: '<slug>',` line that belongs to a productPageSlugs entry.
  // Heuristic: match `en: '<slug>',` following a `slugs: {` opening.
  const productSlugMatches = [...productSlugsSrc.matchAll(/en:\s*'([^']+)'/g)].map((m) => m[1]);
  productSlugMatches.forEach((slug) => {
    if (slug && slug.length > 2) urls.add(`/en/apps/${slug}`);
  });

  // tools/[slug] — parse tool-page-slugs.ts
  const toolSlugsSrc = fs.readFileSync(
    path.join(frontend, 'config', 'tool-page-slugs.ts'),
    'utf8'
  );
  const toolSlugMatches = [...toolSlugsSrc.matchAll(/en:\s*'([^']+)'/g)].map((m) => m[1]);
  toolSlugMatches.forEach((slug) => {
    if (slug && slug.length > 2) urls.add(`/en/tools/${slug}`);
  });
  // Static tools
  const staticToolMatch = toolSlugsSrc.match(/STATIC_TOOL_SLUGS[^[]*\[([^\]]*)\]/);
  if (staticToolMatch) {
    const slugs = [...staticToolMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
    slugs.forEach((s) => urls.add(`/en/tools/${s}`));
  }

  // Content-based pages (guides, ideas, start, bundles, compare) —
  // enumerate via content file folder names.
  const contentRoots = [
    { dir: 'config/guide-content/en', prefix: '/en/guides' },
    { dir: 'config/idea-content/en', prefix: '/en/ideas' },
    { dir: 'config/start-content/en', prefix: '/en/start' },
    { dir: 'config/bundle-content/en', prefix: '/en/bundles' },
    { dir: 'config/compare-content/en', prefix: '/en/compare' },
  ];
  for (const { dir, prefix } of contentRoots) {
    const p = path.join(frontend, dir);
    if (!fs.existsSync(p)) continue;
    const files = fs.readdirSync(p).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
    files.forEach((f) => {
      urls.add(`${prefix}/${f.replace(/\.ts$/, '')}`);
    });
  }

  return urls;
}

// Walk the frontend/ tree and accumulate all href literals + Link href
// string values. Ignore href={dynamic} — those can't be statically
// resolved; treat them as matching any URL by prefix when they look
// like template literals `/${locale}/apps/${slug}`.
function collectHrefs() {
  const literals = new Set();
  const templates = new Set();

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        const src = fs.readFileSync(full, 'utf8');
        // href="/..." literal
        for (const m of src.matchAll(/href=['"](\/[^'"{}\s]+)['"]/g)) {
          literals.add(m[1]);
        }
        // href={`/.../...`} template literal — capture the raw template
        for (const m of src.matchAll(/href=\{`(\/[^`]+)`\}/g)) {
          templates.add(m[1]);
        }
        // `/${locale}/apps` and `/${locale}/tools/${slug}` patterns where
        // the path body is a template literal, no href= prefix.
        for (const m of src.matchAll(/`(\/\$\{locale\}\/[a-z0-9/${}\-]+)`/g)) {
          templates.add(m[1]);
        }
      }
    }
  }
  walk(frontend);

  // Normalize templates by replacing ${locale} with en, and stripping
  // any remaining ${...} expressions with a wildcard marker.
  const normalizedTemplates = new Set();
  for (const t of templates) {
    const en = t.replace(/\$\{locale\}/g, 'en').replace(/\$\{[^}]+\}/g, '\x00');
    normalizedTemplates.add(en);
  }
  return { literals, templates: normalizedTemplates };
}

function isReferenced(url, literals, templates) {
  if (literals.has(url)) return true;
  // For each template, treat \x00 as a slug wildcard. If the URL starts
  // with the template prefix and the remaining path has no slashes, it's
  // referenced by a dynamic link builder.
  for (const t of templates) {
    if (!t.includes('\x00')) {
      if (t === url) return true;
      continue;
    }
    const [prefix, suffix = ''] = t.split('\x00');
    if (!url.startsWith(prefix)) continue;
    const remainder = url.slice(prefix.length);
    // Suffix must also match at the end
    if (suffix && !remainder.endsWith(suffix)) continue;
    const innerPath = suffix ? remainder.slice(0, -suffix.length) : remainder;
    // A single segment (no additional slashes) means the wildcard covered one slug
    if (!innerPath.includes('/')) return true;
  }
  return false;
}

function main() {
  const urls = [...enumerateUrls()].sort();
  const { literals, templates } = collectHrefs();

  const orphans = [];
  for (const url of urls) {
    if (!isReferenced(url, literals, templates)) orphans.push(url);
  }

  console.log(`Enumerated ${urls.length} canonical EN URLs.`);
  console.log(`Collected ${literals.size} href literals and ${templates.size} href templates.`);
  console.log('');
  if (orphans.length === 0) {
    console.log('No orphans detected — every enumerated URL has at least one inbound reference.');
  } else {
    console.log(`${orphans.length} orphan URL(s):`);
    orphans.forEach((u) => console.log('  ' + u));
  }
}

main();
