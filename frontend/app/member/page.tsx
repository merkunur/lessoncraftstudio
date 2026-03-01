'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

type ActiveTab = 'signin' | 'activate';
type ActivateStep = 'enter-key' | 'create-account' | 'sign-in-existing';

interface VerifiedLicense {
  licenseKey: string;
  email: string;
  productId: string;
  productTier: string;
}

export default function MemberPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, login, signup } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveTab>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Activate License state
  const [licenseKey, setLicenseKey] = useState('');
  const [activateStep, setActivateStep] = useState<ActivateStep>('enter-key');
  const [verifiedLicense, setVerifiedLicense] = useState<VerifiedLicense | null>(null);

  // Create Account state (step 2a)
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Existing Account state (step 2b)
  const [existingPassword, setExistingPassword] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/member/dashboard');
    }
  }, [authLoading, isAuthenticated, router]);

  // Don't render form while checking auth
  if (authLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logoSection}>
            <h1 style={styles.logo}>LessonCraftStudio</h1>
            <p style={styles.subtitle}>Member Portal</p>
          </div>
          <p style={{ textAlign: 'center', color: '#6B7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) return null; // Will redirect

  // --- Sign In handler ---
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(signInEmail, signInPassword, true, '/member/dashboard');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      if (msg !== 'Login cancelled') setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // --- Activate License: Step 1 - Verify Key ---
  async function handleVerifyKey(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKey.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.valid) {
        setError(data.error || data.message || 'Invalid license key');
        return;
      }

      const verified: VerifiedLicense = {
        licenseKey: licenseKey.trim().toUpperCase(),
        email: data.email,
        productId: data.productId,
        productTier: data.productTier,
      };
      setVerifiedLicense(verified);

      // Check if account exists for this email
      const checkRes = await fetch('/api/license/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verified.email }),
      });
      const checkData = await checkRes.json();

      if (checkData.exists) {
        setActivateStep('sign-in-existing');
      } else {
        setActivateStep('create-account');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // --- Activate License: Step 2a - Create Account ---
  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!verifiedLicense) return;

    setLoading(true);
    setError('');

    try {
      // Split name into first/last
      const nameParts = newName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Signup (auto-logs in and redirects)
      await signup(
        {
          email: verifiedLicense.email,
          password: newPassword,
          firstName,
          lastName,
        },
        '/member/dashboard'
      );

      // After signup succeeds, activate the license
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetch('/api/license/activate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ licenseKey: verifiedLicense.licenseKey }),
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Account creation failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // --- Activate License: Step 2b - Sign In Existing ---
  async function handleExistingSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!verifiedLicense) return;

    setLoading(true);
    setError('');

    try {
      // Login first (don't redirect yet - we need to activate)
      await login(verifiedLicense.email, existingPassword, true, '/member/dashboard');

      // After login succeeds, activate the license
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetch('/api/license/activate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ licenseKey: verifiedLicense.licenseKey }),
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      if (msg !== 'Login cancelled') setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function resetActivation() {
    setActivateStep('enter-key');
    setVerifiedLicense(null);
    setLicenseKey('');
    setNewName('');
    setNewPassword('');
    setConfirmPassword('');
    setExistingPassword('');
    setError('');
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <h1 style={styles.logo}>LessonCraftStudio</h1>
          <p style={styles.subtitle}>Member Portal</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={{ ...styles.tab, ...(activeTab === 'signin' ? styles.tabActive : {}) }}
            onClick={() => { setActiveTab('signin'); setError(''); }}
          >
            Sign In
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'activate' ? styles.tabActive : {}) }}
            onClick={() => { setActiveTab('activate'); setError(''); resetActivation(); }}
          >
            Activate License
          </button>
        </div>

        {/* Error display */}
        {error && <div style={styles.errorBox}>{error}</div>}

        {/* ===== SIGN IN TAB ===== */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="signin-email">Email</label>
              <input
                id="signin-email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
                autoFocus
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="Your password"
                style={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitButton, ...(loading ? styles.submitButtonDisabled : {}) }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div style={{ textAlign: 'center' }}>
              <a href="/en/auth/forgot-password" style={styles.helpLink}>
                Forgot password?
              </a>
            </div>
          </form>
        )}

        {/* ===== ACTIVATE LICENSE TAB ===== */}
        {activeTab === 'activate' && activateStep === 'enter-key' && (
          <form onSubmit={handleVerifyKey} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="licenseKey">License Key</label>
              <input
                id="licenseKey"
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                placeholder="LCS-XXXXX-XXXXX-XXXXX-XXXXX"
                style={{ ...styles.input, fontFamily: 'monospace', letterSpacing: '1px' }}
                required
                autoFocus
              />
              <p style={styles.hint}>
                Your license key was sent to your email after purchase.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitButton, ...(loading ? styles.submitButtonDisabled : {}) }}
            >
              {loading ? 'Verifying...' : 'Verify License Key'}
            </button>
          </form>
        )}

        {/* Step 2a: Create Account */}
        {activeTab === 'activate' && activateStep === 'create-account' && verifiedLicense && (
          <form onSubmit={handleCreateAccount} style={styles.form}>
            <div style={styles.successBox}>
              License verified for <strong>{verifiedLicense.email}</strong>
            </div>
            <p style={styles.stepInfo}>
              Create an account to access your tools. You&apos;ll sign in with this email and password going forward.
            </p>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="new-name">Your Name</label>
              <input
                id="new-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="John Doe"
                style={styles.input}
                required
                autoFocus
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="new-password">Password</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                style={styles.input}
                required
                minLength={8}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                style={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitButton, ...(loading ? styles.submitButtonDisabled : {}) }}
            >
              {loading ? 'Creating Account...' : 'Create Account & Activate'}
            </button>
            <button type="button" onClick={resetActivation} style={styles.backButton}>
              Back
            </button>
          </form>
        )}

        {/* Step 2b: Sign In Existing */}
        {activeTab === 'activate' && activateStep === 'sign-in-existing' && verifiedLicense && (
          <form onSubmit={handleExistingSignIn} style={styles.form}>
            <div style={styles.successBox}>
              License verified for <strong>{verifiedLicense.email}</strong>
            </div>
            <p style={styles.stepInfo}>
              An account already exists for this email. Sign in to link this license.
            </p>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="existing-email">Email</label>
              <input
                id="existing-email"
                type="email"
                value={verifiedLicense.email}
                style={{ ...styles.input, backgroundColor: '#F3F4F6' }}
                disabled
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="existing-password">Password</label>
              <input
                id="existing-password"
                type="password"
                value={existingPassword}
                onChange={(e) => setExistingPassword(e.target.value)}
                placeholder="Your password"
                style={styles.input}
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitButton, ...(loading ? styles.submitButtonDisabled : {}) }}
            >
              {loading ? 'Signing in...' : 'Sign In & Activate'}
            </button>
            <button type="button" onClick={resetActivation} style={styles.backButton}>
              Back
            </button>
          </form>
        )}

        {/* Help section */}
        <div style={styles.helpSection}>
          <p style={styles.helpText}>
            Lost your license key?{' '}
            <a href="mailto:support@lessoncraftstudio.com" style={styles.helpLink}>
              Contact support
            </a>
          </p>
          <p style={styles.helpText}>
            Don&apos;t have a license yet?{' '}
            <a href="/en/apps" style={styles.helpLink}>
              Get started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '20px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '40px',
    maxWidth: '460px',
    width: '100%',
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1E40AF',
    margin: '0 0 4px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: '0',
  },
  tabContainer: {
    display: 'flex',
    gap: '0',
    marginBottom: '24px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
  },
  tab: {
    flex: '1',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    outline: 'none',
  },
  hint: {
    fontSize: '13px',
    color: '#9CA3AF',
    margin: '0',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#DC2626',
    marginBottom: '16px',
  },
  successBox: {
    backgroundColor: '#F0FDF4',
    border: '1px solid #BBF7D0',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#16A34A',
  },
  stepInfo: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
    lineHeight: '1.5',
  },
  submitButton: {
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  submitButtonDisabled: {
    backgroundColor: '#93C5FD',
    cursor: 'not-allowed',
  },
  backButton: {
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'transparent',
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  helpSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #E5E7EB',
    textAlign: 'center',
  },
  helpText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '8px 0',
  },
  helpLink: {
    color: '#3B82F6',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
