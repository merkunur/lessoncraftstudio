/**
 * Blog Index Audit Script
 *
 * Fetches LIVE blog listing pages for 6 locales and checks:
 * 1. Blog post links and titles extraction
 * 2. English-language detection in non-English locales
 * 3. Cross-locale slug mismatches
 * 4. Known problem slug presence
 *
 * Usage: node scripts/blog-index-audit.js
 */

const https = require('https');

// =====================================================================
// CONFIG
// =====================================================================

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES_TO_CHECK = ['en', 'es', 'da', 'it', 'fi', 'de'];

const ENGLISH_KEYWORDS = [
  'worksheet', 'worksheets', 'generators', 'generator',
  'teachers', 'teacher', 'guide', 'complete',
  'learning', 'the', 'for', 'with', 'your',
  'students', 'classroom', 'education', 'printable',
  'how', 'best', 'top', 'tips', 'using', 'create',
];

const KNOWN_PROBLEM_SLUGS = [
  'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
  'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
];

// =====================================================================
// HTTP FETCH WITH REDIRECT FOLLOWING
// =====================================================================

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error(`Too many redirects for ${url}`));
    }

    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LCS-Blog-Audit/1.0',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    };

    const req = https.request(options, (res) => {
      // Follow redirects
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          redirectUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${redirectUrl}`;
        }
        console.log(`  Redirect ${res.statusCode}: ${url} -> ${redirectUrl}`);
        return resolve(fetchUrl(redirectUrl, maxRedirects - 1));
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });

    req.end();
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =====================================================================
// HTML PARSING
// =====================================================================

/**
 * Extract blog post entries from HTML.
 * Looks for <a> tags linking to /{locale}/blog/{slug} and extracts
 * the title text from various patterns.
 */
function extractBlogPosts(html, locale) {
  const posts = [];
  const seenSlugs = new Set();

  // Pattern 1: <a href="/{locale}/blog/{slug}"> with text content
  // Match <a> tags that link to blog posts
  const linkRegex = new RegExp(
    `<a[^>]*href=["'](?:https?://[^/]*)?/(${locale})/blog/([^"'#?]+)["'][^>]*>([^<]*)<`,
    'gi'
  );

  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const linkLocale = match[1];
    const slug = match[2].replace(/\/$/, ''); // strip trailing slash
    const text = match[3].trim();

    if (slug && !seenSlugs.has(slug) && text.length > 3) {
      seenSlugs.add(slug);
      posts.push({ locale: linkLocale, slug, title: text, source: 'a-tag-text' });
    }
  }

  // Pattern 2: Look for blog links inside heading tags
  // <h2><a href="/{locale}/blog/{slug}">Title</a></h2>
  // or <h3><a href="...">Title</a></h3>
  const headingLinkRegex = new RegExp(
    `<h[23][^>]*>\\s*<a[^>]*href=["'](?:https?://[^/]*)?/([a-z]{2})/blog/([^"'#?]+)["'][^>]*>([\\s\\S]*?)</a>\\s*</h[23]>`,
    'gi'
  );

  while ((match = headingLinkRegex.exec(html)) !== null) {
    const linkLocale = match[1];
    const slug = match[2].replace(/\/$/, '');
    const text = match[3].replace(/<[^>]+>/g, '').trim();

    if (slug && !seenSlugs.has(slug) && text.length > 3) {
      seenSlugs.add(slug);
      posts.push({ locale: linkLocale, slug, title: text, source: 'heading-link' });
    }
  }

  // Pattern 3: Any <a> linking to ANY locale's blog (for cross-locale detection)
  const anyBlogLinkRegex = /<a[^>]*href=["'](?:https?:\/\/[^/]*)?\/([a-z]{2})\/blog\/([^"'#?]+)["'][^>]*>/gi;
  const allLinkedSlugs = [];
  while ((match = anyBlogLinkRegex.exec(html)) !== null) {
    const linkLocale = match[1];
    const slug = match[2].replace(/\/$/, '');
    if (slug) {
      allLinkedSlugs.push({ locale: linkLocale, slug });
    }
  }

  // Pattern 4: Look for title-like text near blog links
  // Often the title is in a sibling or parent element
  // Search for patterns like: <h2 ...>Title Text</h2> followed by or containing blog link
  const titleNearLinkRegex = new RegExp(
    `<h[23][^>]*>([\\s\\S]*?)</h[23]>[\\s\\S]{0,500}?href=["'](?:https?://[^/]*)?/${locale}/blog/([^"'#?]+)["']`,
    'gi'
  );

  while ((match = titleNearLinkRegex.exec(html)) !== null) {
    const slug = match[2].replace(/\/$/, '');
    const text = match[1].replace(/<[^>]+>/g, '').trim();

    if (slug && !seenSlugs.has(slug) && text.length > 3) {
      seenSlugs.add(slug);
      posts.push({ locale, slug, title: text, source: 'heading-before-link' });
    }
  }

  return { posts, allLinkedSlugs };
}

/**
 * Detect if a title appears to be in English using keyword matching.
 * Returns { isEnglish, matchedKeywords, score }.
 */
function detectEnglish(title) {
  const words = title.toLowerCase().split(/[^a-zA-Z]+/).filter(w => w.length > 1);
  const matched = [];

  for (const word of words) {
    if (ENGLISH_KEYWORDS.includes(word)) {
      matched.push(word);
    }
  }

  // Score: what fraction of the title's words are English keywords
  const score = words.length > 0 ? matched.length / words.length : 0;

  // Consider it English if 2+ keywords found AND they make up > 15% of words
  // OR if 3+ keywords found regardless
  const isEnglish = (matched.length >= 2 && score >= 0.15) || matched.length >= 3;

  return { isEnglish, matchedKeywords: matched, score: Math.round(score * 100) };
}

// =====================================================================
// MAIN AUDIT
// =====================================================================

async function main() {
  console.log('='.repeat(70));
  console.log('  BLOG INDEX AUDIT - LIVE PAGE CHECK');
  console.log('  ' + new Date().toISOString());
  console.log('='.repeat(70));
  console.log('');

  const results = {};

  for (let i = 0; i < LOCALES_TO_CHECK.length; i++) {
    const locale = LOCALES_TO_CHECK[i];
    const url = `${BASE}/${locale}/blog`;

    console.log(`\n${'='.repeat(70)}`);
    console.log(`  FETCHING: ${url}`);
    console.log('='.repeat(70));

    try {
      const response = await fetchUrl(url);
      console.log(`  Status: ${response.statusCode}`);
      console.log(`  Body length: ${response.body.length} chars`);

      if (response.statusCode !== 200) {
        console.log(`  WARNING: Non-200 status code!`);
        results[locale] = { error: `HTTP ${response.statusCode}`, posts: [] };
        if (i < LOCALES_TO_CHECK.length - 1) {
          console.log('  Waiting 1s...');
          await delay(1000);
        }
        continue;
      }

      const html = response.body;
      const { posts, allLinkedSlugs } = extractBlogPosts(html, locale);

      console.log(`  Found ${posts.length} blog posts with titles`);
      console.log(`  Found ${allLinkedSlugs.length} total blog links`);

      // --- English detection (for non-EN locales) ---
      const englishTitles = [];
      if (locale !== 'en') {
        for (const post of posts) {
          const detection = detectEnglish(post.title);
          if (detection.isEnglish) {
            englishTitles.push({
              slug: post.slug,
              title: post.title,
              matchedKeywords: detection.matchedKeywords,
              score: detection.score,
            });
          }
        }
      }

      // --- Cross-locale slug detection ---
      const crossLocale = [];
      for (const link of allLinkedSlugs) {
        if (link.locale !== locale) {
          crossLocale.push(link);
        }
      }

      // --- Known problem slug search ---
      const problemSlugsFound = [];
      for (const problemSlug of KNOWN_PROBLEM_SLUGS) {
        if (html.includes(problemSlug)) {
          problemSlugsFound.push(problemSlug);
        }
      }

      results[locale] = {
        url,
        statusCode: response.statusCode,
        htmlLength: html.length,
        totalPosts: posts.length,
        totalLinks: allLinkedSlugs.length,
        posts,
        englishTitles,
        crossLocaleLinks: crossLocale,
        problemSlugsFound,
      };

      // Print immediate findings
      if (englishTitles.length > 0) {
        console.log(`\n  *** ${englishTitles.length} ENGLISH-LOOKING TITLES FOUND ***`);
        for (const et of englishTitles) {
          console.log(`    - "${et.title.substring(0, 80)}"`);
          console.log(`      slug: ${et.slug}`);
          console.log(`      keywords: [${et.matchedKeywords.join(', ')}] (${et.score}%)`);
        }
      }

      if (crossLocale.length > 0) {
        console.log(`\n  *** ${crossLocale.length} CROSS-LOCALE LINKS FOUND ***`);
        for (const cl of crossLocale) {
          console.log(`    - /${cl.locale}/blog/${cl.slug}`);
        }
      }

      if (problemSlugsFound.length > 0) {
        console.log(`\n  *** PROBLEM SLUGS FOUND ***`);
        for (const ps of problemSlugsFound) {
          console.log(`    - ${ps}`);
        }
      }

    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
      results[locale] = { error: err.message, posts: [] };
    }

    // Delay between requests
    if (i < LOCALES_TO_CHECK.length - 1) {
      console.log('\n  Waiting 1s before next request...');
      await delay(1000);
    }
  }

  // =====================================================================
  // SUMMARY REPORT
  // =====================================================================

  console.log('\n\n');
  console.log('='.repeat(70));
  console.log('  SUMMARY REPORT');
  console.log('='.repeat(70));

  // --- Posts per locale ---
  console.log('\n--- POSTS PER LOCALE ---');
  for (const locale of LOCALES_TO_CHECK) {
    const r = results[locale];
    if (r && !r.error) {
      console.log(`  ${locale.toUpperCase()}: ${r.totalPosts} posts (${r.totalLinks} total blog links)`);
    } else {
      console.log(`  ${locale.toUpperCase()}: ERROR - ${r ? r.error : 'unknown'}`);
    }
  }

  // --- All post titles per locale ---
  console.log('\n--- ALL POST TITLES PER LOCALE ---');
  for (const locale of LOCALES_TO_CHECK) {
    const r = results[locale];
    if (r && r.posts && r.posts.length > 0) {
      console.log(`\n  [${locale.toUpperCase()}] (${r.posts.length} posts):`);
      for (let j = 0; j < r.posts.length; j++) {
        const p = r.posts[j];
        console.log(`    ${j + 1}. "${p.title.substring(0, 100)}"`);
        console.log(`       slug: ${p.slug}`);
      }
    }
  }

  // --- English titles in non-EN locales ---
  console.log('\n--- ENGLISH-LOOKING TITLES IN NON-EN LOCALES ---');
  let totalEnglishIssues = 0;
  for (const locale of LOCALES_TO_CHECK) {
    if (locale === 'en') continue;
    const r = results[locale];
    if (r && r.englishTitles && r.englishTitles.length > 0) {
      totalEnglishIssues += r.englishTitles.length;
      console.log(`\n  [${locale.toUpperCase()}] ${r.englishTitles.length} English-looking title(s):`);
      for (const et of r.englishTitles) {
        console.log(`    - "${et.title.substring(0, 90)}"`);
        console.log(`      slug: ${et.slug}`);
        console.log(`      keywords: [${et.matchedKeywords.join(', ')}] score=${et.score}%`);
      }
    } else if (r && !r.error) {
      console.log(`  [${locale.toUpperCase()}] No English-looking titles found. OK.`);
    }
  }
  if (totalEnglishIssues === 0) {
    console.log('  No English-looking titles found in any non-EN locale. All clear.');
  }

  // --- Cross-locale links ---
  console.log('\n--- CROSS-LOCALE LINK ISSUES ---');
  let totalCrossLocale = 0;
  for (const locale of LOCALES_TO_CHECK) {
    const r = results[locale];
    if (r && r.crossLocaleLinks && r.crossLocaleLinks.length > 0) {
      totalCrossLocale += r.crossLocaleLinks.length;
      console.log(`\n  [${locale.toUpperCase()}] ${r.crossLocaleLinks.length} cross-locale link(s):`);
      for (const cl of r.crossLocaleLinks) {
        console.log(`    - /${cl.locale}/blog/${cl.slug} (links to ${cl.locale} instead of ${locale})`);
      }
    } else if (r && !r.error) {
      console.log(`  [${locale.toUpperCase()}] No cross-locale links. OK.`);
    }
  }
  if (totalCrossLocale === 0) {
    console.log('  No cross-locale link issues found. All clear.');
  }

  // --- Known problem slugs ---
  console.log('\n--- KNOWN PROBLEM SLUG CHECK ---');
  console.log(`  Searching for:`);
  for (const ps of KNOWN_PROBLEM_SLUGS) {
    console.log(`    - ${ps}`);
  }
  console.log('');
  let problemFound = false;
  for (const locale of LOCALES_TO_CHECK) {
    const r = results[locale];
    if (r && r.problemSlugsFound && r.problemSlugsFound.length > 0) {
      problemFound = true;
      console.log(`  [${locale.toUpperCase()}] FOUND problem slugs:`);
      for (const ps of r.problemSlugsFound) {
        console.log(`    - ${ps}`);
      }
    } else if (r && !r.error) {
      console.log(`  [${locale.toUpperCase()}] None found. OK.`);
    }
  }
  if (!problemFound) {
    console.log('  No known problem slugs found on any page. All clear.');
  }

  // --- Specific ES and DA deep check ---
  console.log('\n--- SPECIFIC ES + DA ENGLISH DETECTION (DETAILED) ---');
  for (const locale of ['es', 'da']) {
    const r = results[locale];
    if (!r || r.error) {
      console.log(`  [${locale.toUpperCase()}] Skipped (error fetching page)`);
      continue;
    }
    console.log(`\n  [${locale.toUpperCase()}] Analyzing all ${r.posts.length} titles:`);
    for (const post of r.posts) {
      const detection = detectEnglish(post.title);
      const flag = detection.isEnglish ? 'ENGLISH' : 'ok';
      const kwInfo = detection.matchedKeywords.length > 0
        ? ` [${detection.matchedKeywords.join(',')}]`
        : '';
      console.log(`    ${flag.padEnd(8)} "${post.title.substring(0, 75)}"${kwInfo}`);
    }
  }

  // --- Final verdict ---
  console.log('\n\n');
  console.log('='.repeat(70));
  console.log('  FINAL VERDICT');
  console.log('='.repeat(70));
  console.log(`  Total English-looking titles in non-EN locales: ${totalEnglishIssues}`);
  console.log(`  Total cross-locale link issues:                 ${totalCrossLocale}`);
  console.log(`  Known problem slugs found:                      ${problemFound ? 'YES' : 'NO'}`);
  console.log('='.repeat(70));
  console.log('\nAudit complete.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
