/**
 * License Key Management System
 *
 * Handles generation, verification, and revocation of license keys
 * for WarriorPlus and other sales channel purchases.
 */

import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getAppsForProduct, isValidAppId, WPLUS_PRODUCTS } from '@/config/warriorplus-products';
import type { AppId } from '@/config/warriorplus-products';

// ==========================================
// LICENSE KEY FORMAT
// ==========================================

// Format: LCS-XXXXX-XXXXX-XXXXX-XXXXX (20 alphanumeric chars + dashes)
const LICENSE_PREFIX = 'LCS';
const SEGMENT_LENGTH = 5;
const SEGMENT_COUNT = 4;
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I/O/0/1 to avoid confusion

function generateLicenseKeyString(): string {
  const segments: string[] = [];
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

// ==========================================
// TYPES
// ==========================================

export type LicenseTier = 'single-app' | 'category-bundle' | 'full-access' | 'commercial' | 'agency' | 'pro-features';
export type LicenseStatus = 'active' | 'revoked' | 'expired' | 'suspended';
export type LicenseSource = 'warriorplus' | 'gumroad' | 'direct';

export interface GenerateLicenseOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  productId: string;
  productTier: LicenseTier;
  source?: LicenseSource;
  transactionId?: string;
  appsAccess?: AppId[];
  maxActivations?: number;
  expiresAt?: Date | null;
}

export interface VerifyLicenseResult {
  valid: boolean;
  licenseKey?: string;
  email?: string;
  productTier?: LicenseTier;
  productId?: string;
  appsAccess?: string[];
  status?: LicenseStatus;
  error?: string;
}

export interface LicenseInfo {
  licenseKey: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  productTier: string;
  productId: string;
  appsAccess: string[];
  status: string;
  source: string;
  activationsCount: number;
  maxActivations: number;
  expiresAt: Date | null;
  createdAt: Date;
  lastUsedAt: Date | null;
}

// ==========================================
// GENERATE LICENSE KEY
// ==========================================

export async function generateLicenseKey(options: GenerateLicenseOptions): Promise<LicenseInfo> {
  const {
    email,
    firstName,
    lastName,
    productId,
    productTier,
    source = 'warriorplus',
    transactionId,
    maxActivations = 3,
    expiresAt = null,
  } = options;

  // Determine which apps this license grants access to
  let appsAccess = options.appsAccess;
  if (!appsAccess || appsAccess.length === 0) {
    appsAccess = getAppsForProduct(productId);
  }

  // For commercial/agency tiers, always grant all apps
  if (productTier === 'commercial' || productTier === 'agency') {
    const megaBundleApps = WPLUS_PRODUCTS['mega-bundle']?.apps ?? [];
    appsAccess = megaBundleApps.length > 0
      ? [...megaBundleApps] as AppId[]
      : getAppsForProduct('mega-bundle');
  }

  // Generate unique license key
  let licenseKeyStr: string;
  let attempts = 0;
  do {
    licenseKeyStr = generateLicenseKeyString();
    const existing = await prisma.licenseKey.findUnique({
      where: { licenseKey: licenseKeyStr },
    });
    if (!existing) break;
    attempts++;
  } while (attempts < 10);

  if (attempts >= 10) {
    throw new Error('Failed to generate unique license key after 10 attempts');
  }

  const license = await prisma.licenseKey.create({
    data: {
      licenseKey: licenseKeyStr,
      email: email.toLowerCase().trim(),
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      productTier,
      productId,
      appsAccess: appsAccess as string[],
      source,
      transactionId: transactionId ?? null,
      status: 'active',
      maxActivations,
      expiresAt,
    },
  });

  return {
    licenseKey: license.licenseKey,
    email: license.email,
    firstName: license.firstName,
    lastName: license.lastName,
    productTier: license.productTier,
    productId: license.productId,
    appsAccess: license.appsAccess,
    status: license.status,
    source: license.source,
    activationsCount: license.activationsCount,
    maxActivations: license.maxActivations,
    expiresAt: license.expiresAt,
    createdAt: license.createdAt,
    lastUsedAt: license.lastUsedAt,
  };
}

// ==========================================
// VERIFY LICENSE KEY
// ==========================================

export async function verifyLicenseKey(
  licenseKey: string,
  appId?: string,
  clientIp?: string
): Promise<VerifyLicenseResult> {
  const normalizedKey = licenseKey.toUpperCase().trim();

  const license = await prisma.licenseKey.findUnique({
    where: { licenseKey: normalizedKey },
  });

  if (!license) {
    return { valid: false, error: 'Invalid license key' };
  }

  // Check status
  if (license.status === 'revoked') {
    return { valid: false, error: 'License has been revoked', status: 'revoked' };
  }
  if (license.status === 'suspended') {
    return { valid: false, error: 'License has been suspended', status: 'suspended' };
  }

  // Check expiry
  if (license.expiresAt && new Date() > license.expiresAt) {
    // Auto-update status
    await prisma.licenseKey.update({
      where: { id: license.id },
      data: { status: 'expired' },
    });
    return { valid: false, error: 'License has expired', status: 'expired' };
  }

  // Check app access
  if (appId) {
    const hasAccess = license.appsAccess.includes(appId) ||
                      license.productTier === 'full-access' ||
                      license.productTier === 'commercial' ||
                      license.productTier === 'agency';

    if (!hasAccess) {
      return {
        valid: false,
        error: `License does not include access to ${appId}`,
        licenseKey: license.licenseKey,
        productTier: license.productTier as LicenseTier,
      };
    }
  }

  // Update usage tracking
  await prisma.licenseKey.update({
    where: { id: license.id },
    data: {
      lastUsedAt: new Date(),
      lastUsedIp: clientIp ?? null,
      activationsCount: { increment: 1 },
    },
  });

  return {
    valid: true,
    licenseKey: license.licenseKey,
    email: license.email,
    productTier: license.productTier as LicenseTier,
    productId: license.productId,
    appsAccess: license.appsAccess,
    status: license.status as LicenseStatus,
  };
}

// ==========================================
// REVOKE LICENSE KEY
// ==========================================

export async function revokeLicenseKey(
  licenseKey: string,
  reason: string = 'refund'
): Promise<boolean> {
  const normalizedKey = licenseKey.toUpperCase().trim();

  const license = await prisma.licenseKey.findUnique({
    where: { licenseKey: normalizedKey },
  });

  if (!license) return false;

  await prisma.licenseKey.update({
    where: { id: license.id },
    data: {
      status: 'revoked',
      revokedAt: new Date(),
      revokeReason: reason,
    },
  });

  return true;
}

// ==========================================
// REVOKE BY TRANSACTION ID
// ==========================================

export async function revokeLicenseByTransaction(
  transactionId: string,
  reason: string = 'refund'
): Promise<boolean> {
  const license = await prisma.licenseKey.findUnique({
    where: { transactionId },
  });

  if (!license) return false;

  await prisma.licenseKey.update({
    where: { id: license.id },
    data: {
      status: 'revoked',
      revokedAt: new Date(),
      revokeReason: reason,
    },
  });

  return true;
}

// ==========================================
// LOOKUP LICENSES BY EMAIL
// ==========================================

export async function getLicensesByEmail(email: string): Promise<LicenseInfo[]> {
  const licenses = await prisma.licenseKey.findMany({
    where: { email: email.toLowerCase().trim() },
    orderBy: { createdAt: 'desc' },
  });

  return licenses.map(license => ({
    licenseKey: license.licenseKey,
    email: license.email,
    firstName: license.firstName,
    lastName: license.lastName,
    productTier: license.productTier,
    productId: license.productId,
    appsAccess: license.appsAccess,
    status: license.status,
    source: license.source,
    activationsCount: license.activationsCount,
    maxActivations: license.maxActivations,
    expiresAt: license.expiresAt,
    createdAt: license.createdAt,
    lastUsedAt: license.lastUsedAt,
  }));
}

// ==========================================
// GET MERGED APP ACCESS FOR EMAIL
// ==========================================

/**
 * Returns all apps a user has access to across all their active licenses.
 * A user may have multiple licenses (e.g., bought a category bundle then upgraded to mega).
 */
export async function getMergedAppAccess(email: string): Promise<{
  apps: string[];
  highestTier: LicenseTier;
  hasCommercialLicense: boolean;
  licenses: LicenseInfo[];
}> {
  const licenses = await getLicensesByEmail(email);
  const activeLicenses = licenses.filter(l => l.status === 'active');

  if (activeLicenses.length === 0) {
    return { apps: [], highestTier: 'single-app', hasCommercialLicense: false, licenses: [] };
  }

  const allApps = new Set<string>();
  let highestTier: LicenseTier = 'single-app';
  let hasCommercialLicense = false;

  const tierOrder: Record<LicenseTier, number> = {
    'single-app': 0,
    'category-bundle': 1,
    'full-access': 2,
    'commercial': 3,
    'agency': 4,
    'pro-features': 2, // Pro features is an add-on, not a tier upgrade
  };

  for (const license of activeLicenses) {
    for (const app of license.appsAccess) {
      allApps.add(app);
    }

    const tier = license.productTier as LicenseTier;
    if (tierOrder[tier] > tierOrder[highestTier]) {
      highestTier = tier;
    }

    if (tier === 'commercial' || tier === 'agency') {
      hasCommercialLicense = true;
    }
  }

  return {
    apps: Array.from(allApps),
    highestTier,
    hasCommercialLicense,
    licenses: activeLicenses,
  };
}

// ==========================================
// UPGRADE LICENSE
// ==========================================

export async function upgradeLicense(
  email: string,
  newProductId: string,
  newTier: LicenseTier,
  transactionId?: string
): Promise<LicenseInfo> {
  // Generate a new license for the upgrade
  const newApps = getAppsForProduct(newProductId);

  return generateLicenseKey({
    email,
    productId: newProductId,
    productTier: newTier,
    transactionId,
    appsAccess: newApps as AppId[],
  });
}
