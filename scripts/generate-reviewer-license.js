/**
 * Generate 3 license keys for WarriorPlus reviewer
 *
 * Run on server: node /opt/lessoncraftstudio/scripts/generate-reviewer-license.js
 *
 * Creates 3 keys on the same email so the member portal merges them into full access:
 *   1. wordsearch-fe          (single-app) — Word Search app + 10 themes + English
 *   2. wordsearch-oto1-library (single-app) — All 104 themes
 *   3. wordsearch-oto2-languages (single-app) — All 11 languages
 */

const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const REVIEWER_EMAIL = 'reviewer@lessoncraftstudio.com';
const LICENSE_PREFIX = 'LCS';
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateKey() {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    let seg = '';
    const bytes = crypto.randomBytes(5);
    for (let j = 0; j < 5; j++) {
      seg += CHARSET[bytes[j] % CHARSET.length];
    }
    segments.push(seg);
  }
  return `${LICENSE_PREFIX}-${segments.join('-')}`;
}

const PRODUCTS = [
  {
    productId: 'wordsearch-fe',
    productTier: 'single-app',
    appsAccess: ['wordsearch'],
    label: 'Word Search Studio Pro (FE)',
  },
  {
    productId: 'wordsearch-oto1-library',
    productTier: 'single-app',
    appsAccess: ['wordsearch'],
    label: 'Complete Image Library — 104 themes (OTO1)',
  },
  {
    productId: 'wordsearch-oto2-languages',
    productTier: 'single-app',
    appsAccess: ['wordsearch'],
    label: 'All 11 Languages (OTO2)',
  },
];

async function main() {
  console.log('=== WP Reviewer License Generator ===\n');
  console.log(`Email: ${REVIEWER_EMAIL}\n`);

  const results = [];

  for (const prod of PRODUCTS) {
    const key = generateKey();

    await prisma.licenseKey.create({
      data: {
        licenseKey: key,
        email: REVIEWER_EMAIL,
        firstName: 'WP',
        lastName: 'Reviewer',
        productId: prod.productId,
        productTier: prod.productTier,
        appsAccess: prod.appsAccess,
        source: 'direct',
        status: 'active',
        maxActivations: 99,
        expiresAt: null,
      },
    });

    results.push({ ...prod, key });
    console.log(`[OK] ${prod.label}`);
    console.log(`     Key: ${key}\n`);
  }

  console.log('=== All 3 keys created ===\n');
  console.log('--- Access Instructions for WP ---\n');
  console.log('Product Access:');
  console.log('1. Visit https://www.lessoncraftstudio.com/member');
  console.log(`2. Enter this license key: ${results[0].key}`);
  console.log('3. Click "Access Dashboard" to see all features');
  console.log('4. Launch the Word Search Studio Pro app from the dashboard\n');
  console.log('This key provides full access to the complete funnel:');
  console.log(`- Word Search Studio Pro (FE): ${results[0].key}`);
  console.log(`- Complete Image Library — 104 themes (OTO1): ${results[1].key}`);
  console.log(`- All 11 Languages (OTO2): ${results[2].key}`);
  console.log('\nAll 3 keys are linked to the same email, so entering ANY one');
  console.log('key at /member will show the merged full-access dashboard.\n');
}

main()
  .catch((e) => {
    console.error('ERROR:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
