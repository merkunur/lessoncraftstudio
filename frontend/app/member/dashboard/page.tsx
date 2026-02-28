'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_APPS, APP_CATEGORIES, WPLUS_PRODUCTS, WPLUS_FUNNELS } from '@/config/warriorplus-products';
import type { AppId, CategoryId } from '@/config/warriorplus-products';

/**
 * Compute theme/language entitlements for an app based on owned product IDs.
 * Returns { themes: string[] | 'all', langs: string[] | 'all' }
 * - 'all' means no restriction
 * - Array means only those values are allowed
 */
function computeEntitlements(
  appId: AppId,
  ownedProductIds: string[],
  highestTier: string
): { themes: string[] | 'all'; langs: string[] | 'all' } {
  // Full-access / commercial / agency overrides everything
  if (highestTier === 'full-access' || highestTier === 'commercial' || highestTier === 'agency') {
    return { themes: 'all', langs: 'all' };
  }

  // Find the funnel for this app (if any)
  const funnel = Object.values(WPLUS_FUNNELS).find(f => {
    const feProduct = WPLUS_PRODUCTS[f.fe];
    return feProduct?.apps.includes(appId);
  });

  if (!funnel) {
    // No funnel defined for this app — no restrictions (legacy behavior)
    return { themes: 'all', langs: 'all' };
  }

  // Check which funnel products the user owns
  const ownsFE = ownedProductIds.includes(funnel.fe);
  const ownsOTO1 = ownedProductIds.includes(funnel.oto1);
  const ownsOTO2 = ownedProductIds.includes(funnel.oto2);

  // Themes: OTO1 unlocks all themes, otherwise FE themes only
  const feProduct = WPLUS_PRODUCTS[funnel.fe];
  const feThemes = feProduct?.includedThemes ?? [];
  const themes: string[] | 'all' = ownsOTO1 ? 'all' : (feThemes.length > 0 ? feThemes : 'all');

  // Languages: OTO2 unlocks all languages, otherwise English only
  const langs: string[] | 'all' = ownsOTO2 ? 'all' : ['en'];

  return { themes, langs };
}

interface MemberAccess {
  email: string;
  apps: string[];
  highestTier: string;
  hasCommercialLicense: boolean;
  licenses: Array<{
    licenseKey: string;
    productId: string;
    productTier: string;
    status: string;
    createdAt: string;
    expiresAt: string | null;
  }>;
}

export default function MemberDashboard() {
  const router = useRouter();
  const [access, setAccess] = useState<MemberAccess | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const stored = sessionStorage.getItem('memberAccess');
    if (!stored) {
      router.push('/member');
      return;
    }
    try {
      setAccess(JSON.parse(stored));
    } catch {
      router.push('/member');
    }
  }, [router]);

  if (!access) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  const hasFullAccess = access.highestTier === 'full-access' ||
                        access.highestTier === 'commercial' ||
                        access.highestTier === 'agency';

  // Filter apps based on access
  const accessibleApps = hasFullAccess
    ? Object.keys(ALL_APPS) as AppId[]
    : (access.apps.filter(id => id in ALL_APPS) as AppId[]);

  const filteredApps = activeCategory === 'all'
    ? accessibleApps
    : accessibleApps.filter(id => ALL_APPS[id].category === activeCategory);

  function handleLogout() {
    sessionStorage.removeItem('memberAccess');
    router.push('/member');
  }

  function handleLaunchApp(appId: AppId) {
    const htmlFile = ALL_APPS[appId].htmlFile;
    const tier = access?.highestTier || 'free';

    // Compute theme/language entitlements based on owned products
    const ownedProductIds = access?.licenses.map(l => l.productId) || [];
    const { themes, langs } = computeEntitlements(appId, ownedProductIds, tier);

    // Build URL with entitlement params
    const params = new URLSearchParams();
    params.set('tier', tier);
    params.set('themes', themes === 'all' ? 'all' : themes.join(','));
    params.set('langs', langs === 'all' ? 'all' : langs.join(','));

    const url = `/worksheet-generators/${encodeURIComponent(htmlFile)}?${params.toString()}`;
    window.open(url, '_blank');
  }

  const tierLabels: Record<string, string> = {
    'single-app': 'Single App',
    'category-bundle': 'Category Bundle',
    'full-access': 'Full Access',
    'commercial': 'Commercial License',
    'agency': 'Agency License',
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.logo}>LessonCraftStudio</h1>
          <span style={styles.badge}>Member</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.email}>{access.email}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Log out
          </button>
        </div>
      </header>

      {/* License Info Bar */}
      <div style={styles.licenseBar}>
        <div style={styles.licenseInfo}>
          <span style={styles.licenseLabel}>Plan:</span>
          <span style={styles.licenseTier}>
            {tierLabels[access.highestTier] || access.highestTier}
          </span>
          {access.hasCommercialLicense && (
            <span style={styles.commercialBadge}>Commercial</span>
          )}
        </div>
        <div style={styles.licenseStats}>
          <span style={styles.statItem}>{accessibleApps.length} apps available</span>
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.filterBar}>
        <button
          style={{
            ...styles.filterButton,
            ...(activeCategory === 'all' ? styles.filterButtonActive : {}),
          }}
          onClick={() => setActiveCategory('all')}
        >
          All ({accessibleApps.length})
        </button>
        {(Object.entries(APP_CATEGORIES) as [CategoryId, typeof APP_CATEGORIES[CategoryId]][]).map(([catId, cat]) => {
          const count = accessibleApps.filter(id => ALL_APPS[id].category === catId).length;
          if (count === 0) return null;
          return (
            <button
              key={catId}
              style={{
                ...styles.filterButton,
                ...(activeCategory === catId ? styles.filterButtonActive : {}),
              }}
              onClick={() => setActiveCategory(catId)}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* App Grid */}
      <div style={styles.appGrid}>
        {filteredApps.map(appId => {
          const app = ALL_APPS[appId];
          const category = APP_CATEGORIES[app.category as CategoryId];

          return (
            <div key={appId} style={styles.appCard}>
              <div
                style={{
                  ...styles.appCardHeader,
                  backgroundColor: category?.color || '#6B7280',
                }}
              >
                <h3 style={styles.appName}>{app.name}</h3>
                <span style={styles.appCategory}>{category?.name}</span>
              </div>
              <div style={styles.appCardBody}>
                <button
                  onClick={() => handleLaunchApp(appId)}
                  style={styles.launchButton}
                >
                  Launch App
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade prompt if not full access */}
      {!hasFullAccess && (
        <div style={styles.upgradeBar}>
          <p style={styles.upgradeText}>
            Upgrade to the Full Toolkit to unlock all 33 apps and 3,000+ images!
          </p>
          <a href="/en/apps" style={styles.upgradeButton}>
            Upgrade Now
          </a>
        </div>
      )}

      {/* License Keys Section */}
      <div style={styles.licensesSection}>
        <h2 style={styles.sectionTitle}>Your Licenses</h2>
        <div style={styles.licensesList}>
          {access.licenses.map((license, i) => (
            <div key={i} style={styles.licenseCard}>
              <div style={styles.licenseCardLeft}>
                <span style={styles.licenseKeyDisplay}>{license.licenseKey}</span>
                <span style={styles.licenseProduct}>
                  {tierLabels[license.productTier] || license.productTier}
                </span>
              </div>
              <div style={styles.licenseCardRight}>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: license.status === 'active' ? '#DEF7EC' : '#FDE8E8',
                    color: license.status === 'active' ? '#03543F' : '#9B1C1C',
                  }}
                >
                  {license.status}
                </span>
                <span style={styles.licenseDate}>
                  {new Date(license.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Need help? <a href="mailto:support@lessoncraftstudio.com" style={styles.footerLink}>Contact support</a></p>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    minHeight: '100vh',
    backgroundColor: '#F1F5F9',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    flexWrap: 'wrap',
    gap: '12px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1E40AF',
    margin: '0',
  },
  badge: {
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  email: {
    fontSize: '14px',
    color: '#6B7280',
  },
  logoutButton: {
    fontSize: '14px',
    color: '#6B7280',
    border: '1px solid #D1D5DB',
    backgroundColor: 'transparent',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  licenseBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#EBF5FF',
    borderBottom: '1px solid #BFDBFE',
    flexWrap: 'wrap',
    gap: '8px',
  },
  licenseInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  licenseLabel: {
    fontSize: '14px',
    color: '#6B7280',
  },
  licenseTier: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1E40AF',
  },
  commercialBadge: {
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: '#059669',
    color: '#FFFFFF',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  licenseStats: {
    display: 'flex',
    gap: '16px',
  },
  statItem: {
    fontSize: '14px',
    color: '#374151',
  },
  filterBar: {
    display: 'flex',
    gap: '8px',
    padding: '16px 32px',
    flexWrap: 'wrap',
  },
  filterButton: {
    fontSize: '13px',
    fontWeight: '500',
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid #D1D5DB',
    backgroundColor: '#FFFFFF',
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    borderColor: '#3B82F6',
  },
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
    padding: '0 32px 32px',
  },
  appCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  appCardHeader: {
    padding: '16px 20px',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px',
  },
  appCategory: {
    fontSize: '12px',
    opacity: 0.8,
  },
  appCardBody: {
    padding: '16px 20px',
  },
  launchButton: {
    width: '100%',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  upgradeBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    margin: '0 32px 32px',
    backgroundColor: '#FEF3C7',
    border: '1px solid #FCD34D',
    borderRadius: '10px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  upgradeText: {
    fontSize: '15px',
    color: '#92400E',
    margin: '0',
    fontWeight: '500',
  },
  upgradeButton: {
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '6px',
    backgroundColor: '#F59E0B',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  licensesSection: {
    padding: '0 32px 32px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 16px',
  },
  licensesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  licenseCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    flexWrap: 'wrap',
    gap: '8px',
  },
  licenseCardLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  licenseKeyDisplay: {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#374151',
    letterSpacing: '1px',
  },
  licenseProduct: {
    fontSize: '13px',
    color: '#6B7280',
  },
  licenseCardRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '2px 10px',
    borderRadius: '12px',
  },
  licenseDate: {
    fontSize: '13px',
    color: '#9CA3AF',
  },
  footer: {
    padding: '24px 32px',
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    color: '#6B7280',
  },
  footerLink: {
    color: '#3B82F6',
    textDecoration: 'none',
  },
};
