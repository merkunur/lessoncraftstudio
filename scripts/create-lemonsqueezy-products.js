/**
 * Create 39 Lemon Squeezy products (33 individual apps + 6 category bundles)
 *
 * Usage:
 *   node scripts/create-lemonsqueezy-products.js
 *
 * Output: Writes product/variant IDs to scripts/lemonsqueezy-product-ids.json
 */

const https = require('https');
const fs = require('fs');

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJhNmQyYzkxN2NkOGQ0OGNmNzhiZmNmMjc0ZmVjYjVkMjExM2EwOGEwYjNjZjhiZjVhNDQ3ZjM0NWEyZWY5OGE5Y2JmZTIzYWM3ZmRiYTFjYSIsImlhdCI6MTc3NTMwMjk1Mi42NTgyODQsIm5iZiI6MTc3NTMwMjk1Mi42NTgyOTcsImV4cCI6MTc5MTA3MjAwMC4wMzU2MzEsInN1YiI6IjY3ODAzNTEiLCJzY29wZXMiOltdfQ.pCNbSOck-IvK6fEJl1caK4xRCZPtgWgYikqjS1_MQbpsZlREIuCGsMbTCq7d2u0fFuLR7msxOx2GjFEVML2cZWwwEWQNSylsI4Bb_sOT3lfz0O-myL-ZLL5xzH6nXD0M1dEQNgpjzOUFKw-hcEjjb8IAg08bCQemlBSmGn5MA5n9o9X0CBemvqtODM-42vP_WC2LWXKBNTMJvxsD6GGWaKMZtLOkbPGHr4RUIYK6sNFMtYQ4YGC8YwAZmVyz0iAcDYlLH1FKjH7XvKeCVfU6GRxJMLDGBik1fUokBwmQ827l2LCOsPGPX1irYRDOqRXeyYozbaZJZSowb9EK55ELVMtPxb8b_oD6p9NuifdXxkRDPOMjb5FfdkyvX7AF5A7-yQiRadshZKV4zErSIG6sOf_jm-K0jpYbxKft5fRQ4gqjvuKSHlft4Q4xGtBC5wlVzU6rb-5xW4gDiLAzbMf3tZ0b7UkZ0dwT8U5lD8s7PQ5wtlETBFbvMCYSjIdL2KjZm9WFU96EywoE9C4zkC8-m0BxeZVxtmgJLOYLivdGGXBSUMD7tlFb4_avg-LdH_VgKeXpngIFmz_2xL3bFbGjoLt_P2CVxwFvJ5Z42MoCVs5qhSFnIKAfqp0aVmrqn57p6WQoSS7f2by6BSG7t2TX6JpyEA8TcknJbznM-rMSYNQ';
const STORE_ID = '327460';

// 33 individual apps
const APPS = [
  { id: 'addition', name: 'Addition Worksheet Generator', category: 'math' },
  { id: 'subtraction', name: 'Subtraction Worksheet Generator', category: 'math' },
  { id: 'code-addition', name: 'Code Addition Worksheet Generator', category: 'math' },
  { id: 'more-less', name: 'More or Less Worksheet Generator', category: 'math' },
  { id: 'math-puzzle', name: 'Math Puzzle Worksheet Generator', category: 'math' },
  { id: 'math-worksheet', name: 'Math Worksheet Generator', category: 'math' },
  { id: 'alphabet-train', name: 'Alphabet Train Worksheet Generator', category: 'literacy' },
  { id: 'prepositions', name: 'Prepositions Worksheet Generator', category: 'literacy' },
  { id: 'word-guess', name: 'Word Guess Worksheet Generator', category: 'literacy' },
  { id: 'word-scramble', name: 'Word Scramble Worksheet Generator', category: 'literacy' },
  { id: 'wordsearch', name: 'Word Search Worksheet Generator', category: 'literacy' },
  { id: 'cryptogram', name: 'Cryptogram Worksheet Generator', category: 'literacy' },
  { id: 'writing', name: 'Writing Worksheet Generator', category: 'literacy' },
  { id: 'big-small', name: 'Big & Small Worksheet Generator', category: 'visual' },
  { id: 'pattern-train', name: 'Pattern Train Worksheet Generator', category: 'visual' },
  { id: 'pattern-worksheet', name: 'Pattern Worksheet Generator', category: 'visual' },
  { id: 'draw-and-color', name: 'Draw & Color Worksheet Generator', category: 'visual' },
  { id: 'drawing-lines', name: 'Drawing Lines Worksheet Generator', category: 'visual' },
  { id: 'coloring', name: 'Coloring Worksheet Generator', category: 'visual' },
  { id: 'chart-count', name: 'Chart Count Worksheet Generator', category: 'visual' },
  { id: 'matching', name: 'Matching Worksheet Generator', category: 'matching' },
  { id: 'grid-match', name: 'Grid Match Worksheet Generator', category: 'matching' },
  { id: 'shadow-match', name: 'Shadow Match Worksheet Generator', category: 'matching' },
  { id: 'bingo', name: 'Bingo Worksheet Generator', category: 'matching' },
  { id: 'picture-sort', name: 'Picture Sort Worksheet Generator', category: 'matching' },
  { id: 'missing-pieces', name: 'Missing Pieces Worksheet Generator', category: 'puzzle' },
  { id: 'odd-one-out', name: 'Odd One Out Worksheet Generator', category: 'puzzle' },
  { id: 'sudoku', name: 'Sudoku Worksheet Generator', category: 'puzzle' },
  { id: 'picture-path', name: 'Picture Path Worksheet Generator', category: 'puzzle' },
  { id: 'find-and-count', name: 'Find & Count Worksheet Generator', category: 'search' },
  { id: 'find-objects', name: 'Find Objects Worksheet Generator', category: 'search' },
  { id: 'crossword', name: 'Crossword Worksheet Generator', category: 'search' },
  { id: 'treasure-hunt', name: 'Treasure Hunt Worksheet Generator', category: 'search' },
];

// 6 category bundles
const BUNDLES = [
  { id: 'math-bundle', name: 'Math Mastery Bundle', description: 'All 6 math worksheet generators. Addition, subtraction, code addition, more or less, math puzzle, and math worksheet.', apps: 6 },
  { id: 'literacy-bundle', name: 'Literacy & Language Bundle', description: 'All 7 literacy & language generators. Word search, word scramble, word guess, cryptogram, writing, alphabet train, and prepositions.', apps: 7 },
  { id: 'visual-bundle', name: 'Visual Learning Bundle', description: 'All 7 visual learning generators. Coloring, drawing, patterns, charts, and more.', apps: 7 },
  { id: 'matching-bundle', name: 'Matching & Sorting Bundle', description: 'All 5 matching generators. Matching, grid match, shadow match, bingo, and picture sort.', apps: 5 },
  { id: 'puzzle-bundle', name: 'Puzzles & Logic Bundle', description: 'All 4 puzzle generators. Missing pieces, odd one out, sudoku, and picture path.', apps: 4 },
  { id: 'search-bundle', name: 'Search & Find Bundle', description: 'All 4 search & find generators. Find & count, find objects, crossword, and treasure hunt.', apps: 4 },
];

function lsApi(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.lemonsqueezy.com',
      path: `/v1${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    };
    if (data) options.headers['Content-Length'] = Buffer.byteLength(data);

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed.errors || parsed)}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${body.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createProduct(name, description, priceInCents) {
  const body = {
    data: {
      type: 'products',
      attributes: {
        name,
        description,
        price: priceInCents,
        is_subscription: false,
      },
      relationships: {
        store: {
          data: {
            type: 'stores',
            id: STORE_ID,
          },
        },
      },
    },
  };

  return lsApi('POST', '/products', body);
}

async function main() {
  const results = { individual: {}, bundles: {} };

  console.log('=== Creating 33 Individual Apps ($49 each) ===\n');

  for (const app of APPS) {
    const description = `Professional ${app.name.replace(' Worksheet Generator', '').toLowerCase()} worksheet generator. Create unlimited printable worksheets with 3,000+ theme images, 11 languages, answer keys, and full commercial license. Sell on Etsy, Amazon KDP, Gumroad, and more.`;

    try {
      const res = await createProduct(app.name, description, 4900);
      const productId = res.data.id;
      const variantId = res.data.relationships?.variants?.data?.[0]?.id;

      // Get the variant to find the checkout URL
      let checkoutUrl = '';
      if (variantId) {
        try {
          const variantRes = await lsApi('GET', `/variants/${variantId}`);
          checkoutUrl = variantRes.data?.attributes?.checkout_url || '';
        } catch (e) {
          // Checkout URL is optional, we can build it from the store slug
        }
      }

      results.individual[app.id] = {
        productId,
        variantId: variantId || null,
        checkoutUrl,
        name: app.name,
        category: app.category,
        price: 4900,
      };

      console.log(`  OK: ${app.name} (product: ${productId}, variant: ${variantId || 'pending'})`);
    } catch (err) {
      console.error(`  FAIL: ${app.name} - ${err.message}`);
    }

    await sleep(500); // Rate limit: ~2 requests/sec
  }

  console.log('\n=== Creating 6 Category Bundles ($149 each) ===\n');

  for (const bundle of BUNDLES) {
    try {
      const res = await createProduct(bundle.name, bundle.description + ' One-time payment, full commercial license included.', 14900);
      const productId = res.data.id;
      const variantId = res.data.relationships?.variants?.data?.[0]?.id;

      let checkoutUrl = '';
      if (variantId) {
        try {
          const variantRes = await lsApi('GET', `/variants/${variantId}`);
          checkoutUrl = variantRes.data?.attributes?.checkout_url || '';
        } catch (e) {}
      }

      results.bundles[bundle.id] = {
        productId,
        variantId: variantId || null,
        checkoutUrl,
        name: bundle.name,
        appCount: bundle.apps,
        price: 14900,
      };

      console.log(`  OK: ${bundle.name} (product: ${productId}, variant: ${variantId || 'pending'})`);
    } catch (err) {
      console.error(`  FAIL: ${bundle.name} - ${err.message}`);
    }

    await sleep(500);
  }

  // Save results
  const outputPath = 'scripts/lemonsqueezy-product-ids.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to ${outputPath}`);
  console.log(`Individual apps: ${Object.keys(results.individual).length}/33`);
  console.log(`Bundles: ${Object.keys(results.bundles).length}/6`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
