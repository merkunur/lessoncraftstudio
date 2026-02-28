/**
 * Generate Test Licenses for Word Search WarriorPlus Funnel
 *
 * Creates test license keys for each purchase scenario:
 *   1. FE only (wordsearch-fe) — 10 themes, English only, no watermark
 *   2. FE + OTO1 (wordsearch-oto1-library) — all themes, English only
 *   3. FE + OTO1 + OTO2 (wordsearch-oto2-languages) — all themes, all languages
 *   4. FE + OTO2 (no OTO1) — 10 themes, all languages
 *
 * Usage:
 *   Run on server: node scripts/generate-test-licenses.js
 *   Or via plink from local machine (see below)
 */

const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

const LICENSE_PREFIX = 'LCS';
const SEGMENT_LENGTH = 5;
const SEGMENT_COUNT = 4;
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateLicenseKeyString() {
  const segments = [];
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    let segment = '';
    const randomBytes = crypto.randomBytes(SEGMENT_LENGTH);
    for (let j = 0; j < SEGMENT_LENGTH; j++) {
      segment += CHARSET[randomBytes[j] % CHARSET.length];
    }
    segments.push(segment);
  }
  return `${LICENSE_PREFIX}-${segments.join('-')}`;
}

const TEST_SCENARIOS = [
  {
    label: 'FE only (10 themes, English only, no watermark)',
    email: 'test-fe-only@test.com',
    products: [
      { productId: 'wordsearch-fe', productTier: 'single-app', apps: ['wordsearch'] },
    ],
  },
  {
    label: 'FE + OTO1 (all themes, English only, no watermark)',
    email: 'test-fe-oto1@test.com',
    products: [
      { productId: 'wordsearch-fe', productTier: 'single-app', apps: ['wordsearch'] },
      { productId: 'wordsearch-oto1-library', productTier: 'single-app', apps: ['wordsearch'] },
    ],
  },
  {
    label: 'FE + OTO1 + OTO2 (all themes, all languages, no watermark)',
    email: 'test-fe-oto1-oto2@test.com',
    products: [
      { productId: 'wordsearch-fe', productTier: 'single-app', apps: ['wordsearch'] },
      { productId: 'wordsearch-oto1-library', productTier: 'single-app', apps: ['wordsearch'] },
      { productId: 'wordsearch-oto2-languages', productTier: 'single-app', apps: ['wordsearch'] },
    ],
  },
  {
    label: 'FE + OTO2 only (10 themes, all languages, no watermark)',
    email: 'test-fe-oto2@test.com',
    products: [
      { productId: 'wordsearch-fe', productTier: 'single-app', apps: ['wordsearch'] },
      { productId: 'wordsearch-oto2-languages', productTier: 'single-app', apps: ['wordsearch'] },
    ],
  },
];

async function main() {
  console.log('=== Word Search Test License Generator ===\n');

  for (const scenario of TEST_SCENARIOS) {
    console.log(`--- ${scenario.label} ---`);
    console.log(`Email: ${scenario.email}`);

    // Clean up any existing test licenses for this email
    const deleted = await prisma.licenseKey.deleteMany({
      where: { email: scenario.email },
    });
    if (deleted.count > 0) {
      console.log(`  (cleaned up ${deleted.count} existing test license(s))`);
    }

    const keys = [];
    for (const product of scenario.products) {
      const licenseKey = generateLicenseKeyString();
      await prisma.licenseKey.create({
        data: {
          licenseKey,
          email: scenario.email,
          firstName: 'Test',
          lastName: 'User',
          productTier: product.productTier,
          productId: product.productId,
          appsAccess: product.apps,
          source: 'direct',
          status: 'active',
          maxActivations: 99,
          expiresAt: null,
        },
      });
      keys.push({ productId: product.productId, licenseKey });
      console.log(`  License: ${licenseKey} (${product.productId})`);
    }

    console.log('');
  }

  console.log('=== All test licenses created ===');
  console.log('\nTest flow:');
  console.log('1. Go to /member');
  console.log('2. Enter test email (e.g., test-fe-only@test.com)');
  console.log('3. Enter the license key shown above');
  console.log('4. Dashboard should launch app with correct entitlements');
  console.log('\nDirect URL tests (bypass member portal):');
  console.log('  Free:            /worksheet-generators/wordsearch.html?tier=free');
  console.log('  FE only:         /worksheet-generators/wordsearch.html?tier=single-app&themes=animals,breakfast,vehicles,fruits,colors,body_parts,clothing,classroom,sports_bw,flowers&langs=en');
  console.log('  FE+OTO1:         /worksheet-generators/wordsearch.html?tier=single-app&themes=all&langs=en');
  console.log('  FE+OTO1+OTO2:    /worksheet-generators/wordsearch.html?tier=single-app&themes=all&langs=all');
  console.log('  FE+OTO2 (no 1):  /worksheet-generators/wordsearch.html?tier=single-app&themes=animals,breakfast,vehicles,fruits,colors,body_parts,clothing,classroom,sports_bw,flowers&langs=all');
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
