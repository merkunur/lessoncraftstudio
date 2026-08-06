#!/usr/bin/env node
/**
 * Live Blog Page Language Audit
 *
 * Verifies that live blog pages on LessonCraftStudio serve content
 * in the correct language for each locale URL.
 *
 * Strategy:
 *   - Stratified random sample: 3 random posts x 11 locales = 33 URLs
 *   - Known problem posts: 4 posts x 11 locales = 44 URLs
 *   - Total: ~77 URLs
 *
 * Usage: node scripts/live-page-audit.js
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];
const DELAY_MS = 500;
const TIMEOUT_MS = 15000;

const KNOWN_PROBLEM_SLUGS = [
  'variance-detection-algorithm-ensuring-meaningful-puzzle-pieces',
  'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9',
  'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11',
  'early-childhood-prek-k-developmentally-appropriate-worksheet-activities',
];

// Keyword dictionaries for language detection (lowercased).
// We look for these as whole "words" delimited by whitespace/punctuation.
const LANG_KEYWORDS = {
  en: ['worksheet', 'worksheets', 'generators', 'generator', 'teachers', 'guide',
       'learning', 'the', 'for', 'with', 'and', 'how', 'your', 'best', 'activities',
       'classroom', 'students', 'children', 'grade', 'math', 'reading', 'writing',
       'why', 'strategies', 'education', 'teaching', 'practice', 'skills'],
  de: ['arbeitsblatt', 'arbeitsblaetter', 'generatoren', 'generator', 'lehrer',
       'und', 'der', 'die', 'das', 'mit', 'fuer', 'lernende', 'klasse',
       'schueler', 'mathematik', 'uebungen', 'grundschule', 'kinder',
       'warum', 'strategien', 'bildung', 'unterricht'],
  fr: ['fiches', 'fiche', 'feuilles', 'generateurs', 'generateur', 'pour',
       'les', 'des', 'avec', 'dans', 'une', 'apprentissage', 'enseignants',
       'exercices', 'classe', 'enfants', 'mathematiques', 'pourquoi',
       'strategies', 'activites', 'comment'],
  es: ['fichas', 'ficha', 'hojas', 'generadores', 'generador', 'para',
       'los', 'las', 'con', 'del', 'una', 'aprendizaje', 'profesores',
       'ejercicios', 'clase', 'alumnado', 'matematicas', 'actividades',
       'estrategias', 'como'],
  pt: ['fichas', 'ficha', 'folhas', 'geradores', 'gerador', 'para',
       'com', 'dos', 'das', 'uma', 'aprendizagem', 'professores',
       'exercicios', 'turma', 'criancas', 'matematica', 'atividades',
       'estrategias', 'como'],
  it: ['schede', 'scheda', 'fogli', 'generatori', 'generatore', 'per',
       'con', 'dei', 'delle', 'una', 'apprendimento', 'insegnanti',
       'esercizi', 'classe', 'bambini', 'matematica', 'attivita',
       'strategie', 'come'],
  nl: ['werkbladen', 'werkblad', 'generatoren', 'generator', 'voor',
       'met', 'het', 'een', 'van', 'leren', 'docenten', 'oefeningen',
       'klas', 'kinderen', 'wiskunde', 'activiteiten', 'strategieen',
       'waarom', 'hoe'],
  da: ['arbejdsark', 'opgavegeneratorer', 'opgavegenerator', 'til',
       'med', 'det', 'en', 'og', 'laering', 'undervisning', 'boern',
       'matematik', 'aktiviteter', 'hvorfor', 'klasse', 'strategier'],
  sv: ['arbetsblad', 'generatorer', 'generator', 'till', 'med', 'det',
       'en', 'och', 'laerande', 'undervisning', 'barn', 'matematik',
       'aktiviteter', 'varfoer', 'klass', 'strategier', 'foer'],
  no: ['arbeidsark', 'oppgavegeneratorer', 'oppgavegenerator', 'til',
       'med', 'det', 'en', 'og', 'laering', 'undervisning', 'barn',
       'matematikk', 'aktiviteter', 'hvorfor', 'klasse', 'strategier'],
  fi: ['tehtaevae', 'tehtaeviae', 'generaattori', 'generaattoria', 'ja',
       'tai', 'ovat', 'oppiminen', 'opetus', 'lapset', 'matematiikka',
       'miksi', 'miten', 'luokka', 'strategiat', 'kanssa'],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fisher-Yates shuffle, returns new array.
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Fetch a URL with https.get, returning { statusCode, headers, body }.
 * Does NOT follow redirects.
 */
function fetchUrl(url, locale) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      port: 443,
      method: 'GET',
      headers: {
        'Accept-Language': `${locale},en;q=0.5`,
        'User-Agent': 'LCS-LivePageAudit/1.0 (internal SEO audit)',
        'Accept': 'text/html',
      },
      timeout: TIMEOUT_MS,
    };

    const req = https.request(options, (res) => {
      // For redirects, we don't need the body
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        res.resume(); // drain
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: '',
        });
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf-8'),
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout after ${TIMEOUT_MS}ms`));
    });

    req.end();
  });
}

/**
 * Extract text content from an HTML tag. Returns first match or null.
 */
function extractTag(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m = html.match(re);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : null;
}

/**
 * Extract an attribute value from a tag.
 */
function extractAttr(html, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']*)["']`, 'i');
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

/**
 * Tokenise text into lowercased "words" split by non-alpha characters.
 */
function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Score a text against each locale's keyword list.
 * Returns { detected: 'en', scores: { en: 5, de: 2, ... } }
 */
function detectLanguage(text) {
  const tokens = tokenize(text);
  if (tokens.length === 0) return { detected: null, scores: {} };

  const scores = {};
  for (const locale of LOCALES) {
    const keywords = LANG_KEYWORDS[locale];
    let score = 0;
    for (const token of tokens) {
      // Also normalize the keywords for comparison (strip diacritics)
      for (const kw of keywords) {
        const nkw = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (token === nkw) {
          score++;
          break;
        }
      }
    }
    scores[locale] = score;
  }

  // Find the locale with the highest score
  let best = null;
  let bestScore = 0;
  for (const [locale, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      best = locale;
    }
  }

  return { detected: best, scores, bestScore };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('='.repeat(80));
  console.log('  LIVE BLOG PAGE LANGUAGE AUDIT');
  console.log('  Site: ' + BASE);
  console.log('  Date: ' + new Date().toISOString());
  console.log('='.repeat(80));
  console.log();

  // Load slug dump
  const dumpPath = path.join(__dirname, 'db-slugs-dump.json');
  if (!fs.existsSync(dumpPath)) {
    console.error('ERROR: Cannot find ' + dumpPath);
    process.exit(1);
  }
  const posts = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'));
  console.log(`Loaded ${posts.length} posts from db-slugs-dump.json`);

  // Separate problem posts from the rest
  const problemPosts = posts.filter(p => KNOWN_PROBLEM_SLUGS.includes(p.primarySlug));
  const normalPosts = posts.filter(p => !KNOWN_PROBLEM_SLUGS.includes(p.primarySlug));

  console.log(`Known problem posts: ${problemPosts.length}`);
  console.log(`Normal posts pool: ${normalPosts.length}`);
  console.log();

  // Build URL list
  const urls = [];

  // 1. Stratified random sample: 3 posts per locale
  console.log('--- Stratified Random Sample (3 per locale) ---');
  const shuffled = shuffle(normalPosts);
  for (const locale of LOCALES) {
    // Pick 3 posts that have a slug for this locale
    let count = 0;
    for (const post of shuffled) {
      if (count >= 3) break;
      const slug = post.localeSlugs[locale];
      if (slug) {
        urls.push({
          locale,
          slug,
          primarySlug: post.primarySlug,
          url: `${BASE}/${locale}/blog/${slug}`,
          category: 'random-sample',
        });
        count++;
      }
    }
    console.log(`  ${locale}: ${count} posts selected`);
  }

  // 2. Known problem posts: all locales
  console.log('\n--- Known Problem Posts (all locales) ---');
  for (const post of problemPosts) {
    for (const locale of LOCALES) {
      const slug = post.localeSlugs[locale];
      if (slug) {
        urls.push({
          locale,
          slug,
          primarySlug: post.primarySlug,
          url: `${BASE}/${locale}/blog/${slug}`,
          category: 'known-problem',
        });
      }
    }
    console.log(`  ${post.primarySlug.substring(0, 60)}... (${Object.keys(post.localeSlugs).length} locales)`);
  }

  console.log(`\nTotal URLs to check: ${urls.length}`);
  console.log();
  console.log('-'.repeat(80));
  console.log('  FETCHING PAGES');
  console.log('-'.repeat(80));
  console.log();

  // Fetch and analyse each URL
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const entry = urls[i];
    const idx = `[${String(i + 1).padStart(2)}/${urls.length}]`;

    try {
      const resp = await fetchUrl(entry.url, entry.locale);
      const result = {
        ...entry,
        statusCode: resp.statusCode,
        flags: [],
        htmlLang: null,
        title: null,
        h1: null,
        detectedLang: null,
        redirectLocation: null,
      };

      if (resp.statusCode === 301 || resp.statusCode === 302 || resp.statusCode === 307 || resp.statusCode === 308) {
        // Redirect
        result.redirectLocation = resp.headers['location'] || '(none)';

        // Check if redirect goes to expected locale
        const locMatch = result.redirectLocation.match(/\/([a-z]{2})\/blog\//);
        if (locMatch && locMatch[1] !== entry.locale) {
          result.flags.push(`Redirect to different locale: ${locMatch[1]} (expected ${entry.locale})`);
        }

        const status = result.flags.length > 0 ? 'FLAG' : 'REDIR';
        console.log(`${idx} ${status.padEnd(5)} ${resp.statusCode} ${entry.locale} -> ${result.redirectLocation.substring(0, 70)}`);

      } else if (resp.statusCode === 200) {
        // Success - analyse content
        result.htmlLang = extractAttr(resp.body, 'html', 'lang');
        result.title = extractTag(resp.body, 'title');
        result.h1 = extractTag(resp.body, 'h1');

        // Check html lang
        if (result.htmlLang) {
          const htmlLangBase = result.htmlLang.split('-')[0].toLowerCase();
          if (htmlLangBase !== entry.locale) {
            result.flags.push(`html lang="${result.htmlLang}" doesn't match URL locale "${entry.locale}"`);
          }
        } else {
          result.flags.push('No html lang attribute found');
        }

        // Language detection on title
        if (result.title) {
          const titleDetection = detectLanguage(result.title);
          result.detectedLang = titleDetection.detected;
          result.titleScores = titleDetection.scores;
          result.titleBestScore = titleDetection.bestScore;

          if (titleDetection.detected && titleDetection.bestScore >= 2) {
            // Only flag if we have reasonable confidence (2+ keyword hits)
            // and the detected language is different from the URL locale
            if (titleDetection.detected !== entry.locale) {
              // Check if the expected locale has zero or very low score
              const expectedScore = titleDetection.scores[entry.locale] || 0;
              if (expectedScore < titleDetection.bestScore) {
                result.flags.push(
                  `Title language appears to be "${titleDetection.detected}" ` +
                  `(score: ${titleDetection.bestScore}) instead of "${entry.locale}" ` +
                  `(score: ${expectedScore})`
                );
              }
            }
          }
        }

        // Language detection on h1
        if (result.h1) {
          const h1Detection = detectLanguage(result.h1);
          result.h1DetectedLang = h1Detection.detected;

          if (h1Detection.detected && h1Detection.bestScore >= 2) {
            if (h1Detection.detected !== entry.locale) {
              const expectedScore = h1Detection.scores[entry.locale] || 0;
              if (expectedScore < h1Detection.bestScore) {
                result.flags.push(
                  `H1 language appears to be "${h1Detection.detected}" ` +
                  `(score: ${h1Detection.bestScore}) instead of "${entry.locale}" ` +
                  `(score: ${expectedScore})`
                );
              }
            }
          }
        }

        const status = result.flags.length > 0 ? 'FLAG' : 'OK';
        const titleShort = (result.title || '(no title)').substring(0, 55);
        console.log(`${idx} ${status.padEnd(5)} 200 /${entry.locale}/blog/...${entry.slug.substring(entry.slug.length - 30)} | ${titleShort}`);

      } else {
        // Unexpected status
        result.flags.push(`Unexpected HTTP status: ${resp.statusCode}`);
        console.log(`${idx} FLAG  ${resp.statusCode} /${entry.locale}/blog/${entry.slug.substring(0, 50)}`);
      }

      results.push(result);

    } catch (err) {
      console.log(`${idx} ERROR /${entry.locale}/blog/${entry.slug.substring(0, 50)} - ${err.message}`);
      results.push({
        ...entry,
        statusCode: 'ERROR',
        flags: [`Fetch error: ${err.message}`],
      });
    }

    // Delay between requests
    if (i < urls.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log();
  console.log('='.repeat(80));
  console.log('  AUDIT RESULTS SUMMARY');
  console.log('='.repeat(80));
  console.log();

  const flagged = results.filter(r => r.flags.length > 0);
  const ok = results.filter(r => r.flags.length === 0);
  const redirects = results.filter(r => r.statusCode === 301 || r.statusCode === 302 || r.statusCode === 307 || r.statusCode === 308);
  const status200 = results.filter(r => r.statusCode === 200);
  const errors = results.filter(r => r.statusCode === 'ERROR');

  console.log(`Total URLs checked:    ${results.length}`);
  console.log(`  HTTP 200:            ${status200.length}`);
  console.log(`  Redirects (3xx):     ${redirects.length}`);
  console.log(`  Errors:              ${errors.length}`);
  console.log();
  console.log(`  OK (no issues):      ${ok.length}`);
  console.log(`  FLAGGED:             ${flagged.length}`);
  console.log();

  // Status code breakdown
  const statusCounts = {};
  for (const r of results) {
    const key = String(r.statusCode);
    statusCounts[key] = (statusCounts[key] || 0) + 1;
  }
  console.log('Status code breakdown:');
  for (const [code, count] of Object.entries(statusCounts).sort()) {
    console.log(`  ${code}: ${count}`);
  }
  console.log();

  // Flagged URLs detail
  if (flagged.length > 0) {
    console.log('-'.repeat(80));
    console.log('  FLAGGED URLS - DETAILS');
    console.log('-'.repeat(80));
    console.log();

    for (const r of flagged) {
      const cat = r.category === 'known-problem' ? '[KNOWN-PROBLEM]' : '[RANDOM-SAMPLE]';
      console.log(`${cat} /${r.locale}/blog/${r.slug}`);
      console.log(`  Primary slug: ${r.primarySlug}`);
      console.log(`  Status: ${r.statusCode}`);
      if (r.redirectLocation) {
        console.log(`  Redirect: ${r.redirectLocation}`);
      }
      if (r.htmlLang) {
        console.log(`  html lang: "${r.htmlLang}"`);
      }
      if (r.title) {
        console.log(`  Title: "${r.title.substring(0, 100)}"`);
      }
      if (r.h1) {
        console.log(`  H1: "${r.h1.substring(0, 100)}"`);
      }
      if (r.detectedLang) {
        console.log(`  Detected title lang: ${r.detectedLang} (scores: ${JSON.stringify(r.titleScores)})`);
      }
      for (const flag of r.flags) {
        console.log(`  >>> ${flag}`);
      }
      console.log();
    }
  }

  // Separate section for known problem posts
  console.log('-'.repeat(80));
  console.log('  KNOWN PROBLEM POSTS - RESULTS');
  console.log('-'.repeat(80));
  console.log();

  for (const slug of KNOWN_PROBLEM_SLUGS) {
    console.log(`Post: ${slug}`);
    const postResults = results.filter(r => r.primarySlug === slug);
    for (const r of postResults) {
      const status = r.flags.length > 0 ? 'FLAG' : (r.statusCode === 200 ? ' OK ' : 'REDIR');
      const detail = r.statusCode === 200
        ? `lang="${r.htmlLang || '?'}" title="${(r.title || '').substring(0, 50)}"`
        : r.redirectLocation
          ? `-> ${r.redirectLocation.substring(0, 60)}`
          : `status=${r.statusCode}`;
      console.log(`  [${status}] ${r.locale.padEnd(3)} ${r.statusCode} ${detail}`);
      for (const flag of r.flags) {
        console.log(`         >>> ${flag}`);
      }
    }
    console.log();
  }

  // Redirects detail
  if (redirects.length > 0) {
    console.log('-'.repeat(80));
    console.log('  ALL REDIRECTS');
    console.log('-'.repeat(80));
    console.log();
    for (const r of redirects) {
      const cat = r.category === 'known-problem' ? '[KP]' : '[RS]';
      console.log(`${cat} ${r.statusCode} /${r.locale}/blog/${r.slug.substring(0, 50)}`);
      console.log(`     -> ${r.redirectLocation}`);
      for (const flag of r.flags) {
        console.log(`     >>> ${flag}`);
      }
    }
    console.log();
  }

  console.log('='.repeat(80));
  console.log(`  AUDIT COMPLETE - ${flagged.length} issue(s) found out of ${results.length} URLs`);
  console.log('='.repeat(80));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
