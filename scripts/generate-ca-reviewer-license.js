/**
 * Generate license keys for Code Addition WarriorPlus reviewer
 *
 * Run on server: node /opt/lessoncraftstudio/scripts/generate-ca-reviewer-license.js
 *
 * Creates keys across 3 emails to test all access levels:
 *
 *   Email 1 (reviewer@lessoncraftstudio.com) — FULL ACCESS (give to WP reviewer)
 *     1. codeaddition-fe              — Regular mode, 10 themes, all 11 languages
 *     2. codeaddition-oto1-wordreveal — Unlocks Word Reveal mode
 *     3. codeaddition-oto2-library    — Unlocks all 104 themes
 *
 *   Email 2 (fetest@lessoncraftstudio.com) — FE ONLY (verify restrictions)
 *     4. codeaddition-fe              — Should see: regular mode only, 10 themes
 *
 *   Email 3 (oto1test@lessoncraftstudio.com) — FE + OTO1 (verify mode unlock)
 *     5. codeaddition-fe              — Regular mode, 10 themes
 *     6. codeaddition-oto1-wordreveal — Word Reveal unlocked, still 10 themes
 */

const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

const KEY_SETS = [
  {
    email: 'reviewer@lessoncraftstudio.com',
    firstName: 'WP',
    lastName: 'Reviewer',
    label: 'FULL ACCESS (for WP reviewer)',
    products: [
      {
        productId: 'codeaddition-fe',
        productTier: 'single-app',
        appsAccess: ['code-addition'],
        label: 'Code Addition Studio Pro (FE)',
      },
      {
        productId: 'codeaddition-oto1-wordreveal',
        productTier: 'pro-features',
        appsAccess: ['code-addition'],
        label: 'Word Reveal Mode Unlock (OTO1)',
      },
      {
        productId: 'codeaddition-oto2-library',
        productTier: 'single-app',
        appsAccess: ['code-addition'],
        label: 'Complete Image Library — 104 themes (OTO2)',
      },
    ],
  },
  {
    email: 'fetest@lessoncraftstudio.com',
    firstName: 'FE',
    lastName: 'Tester',
    label: 'FE ONLY (verify restrictions)',
    products: [
      {
        productId: 'codeaddition-fe',
        productTier: 'single-app',
        appsAccess: ['code-addition'],
        label: 'Code Addition Studio Pro (FE only)',
      },
    ],
  },
  {
    email: 'oto1test@lessoncraftstudio.com',
    firstName: 'OTO1',
    lastName: 'Tester',
    label: 'FE + OTO1 (verify mode unlock, still 10 themes)',
    products: [
      {
        productId: 'codeaddition-fe',
        productTier: 'single-app',
        appsAccess: ['code-addition'],
        label: 'Code Addition Studio Pro (FE)',
      },
      {
        productId: 'codeaddition-oto1-wordreveal',
        productTier: 'pro-features',
        appsAccess: ['code-addition'],
        label: 'Word Reveal Mode Unlock (OTO1)',
      },
    ],
  },
];

async function main() {
  console.log('=== Code Addition — WP Reviewer License Generator ===\n');

  for (const set of KEY_SETS) {
    console.log(`--- ${set.label} ---`);
    console.log(`Email: ${set.email}\n`);

    const keys = [];

    for (const prod of set.products) {
      const key = generateKey();

      await prisma.licenseKey.create({
        data: {
          licenseKey: key,
          email: set.email,
          firstName: set.firstName,
          lastName: set.lastName,
          productId: prod.productId,
          productTier: prod.productTier,
          appsAccess: prod.appsAccess,
          source: 'direct',
          status: 'active',
          maxActivations: 99,
          expiresAt: null,
        },
      });

      keys.push({ ...prod, key });
      console.log(`  [OK] ${prod.label}`);
      console.log(`       Key: ${key}`);
    }

    console.log('');
  }

  console.log('=== All keys created ===\n');

  console.log('--- Access Instructions for WP Reviewer ---\n');
  console.log('1. Visit https://www.lessoncraftstudio.com/member');
  console.log('2. Enter any license key from the FULL ACCESS set above');
  console.log('3. Click "Access Dashboard" to see all features');
  console.log('4. Launch Code Addition Studio Pro from the dashboard\n');

  console.log('--- Verification Checklist ---\n');
  console.log('FE ONLY (fetest@)     → Regular mode only, 10 themes, Word Reveal LOCKED');
  console.log('FE + OTO1 (oto1test@) → Regular + Word Reveal modes, 10 themes');
  console.log('FULL (reviewer@)      → All modes, all 104 themes\n');
}

main()
  .catch((e) => {
    console.error('ERROR:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
