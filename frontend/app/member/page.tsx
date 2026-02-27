'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Member Portal - Login Page
 *
 * Users can log in with their license key or email address
 * to access their purchased worksheet generators.
 */

export default function MemberPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'license' | 'email'>('license');
  const [licenseKey, setLicenseKey] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const body = loginMethod === 'license'
        ? { licenseKey: licenseKey.trim() }
        : { email: email.trim().toLowerCase() };

      const res = await fetch('/api/license/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      // Store access info in sessionStorage
      sessionStorage.setItem('memberAccess', JSON.stringify(data));

      // Redirect to dashboard
      router.push('/member/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <h1 style={styles.logo}>LessonCraftStudio</h1>
          <p style={styles.subtitle}>Member Portal</p>
        </div>

        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(loginMethod === 'license' ? styles.tabActive : {}),
            }}
            onClick={() => { setLoginMethod('license'); setError(''); }}
          >
            License Key
          </button>
          <button
            style={{
              ...styles.tab,
              ...(loginMethod === 'email' ? styles.tabActive : {}),
            }}
            onClick={() => { setLoginMethod('email'); setError(''); }}
          >
            Email
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {loginMethod === 'license' ? (
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="licenseKey">
                Enter your license key
              </label>
              <input
                id="licenseKey"
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                placeholder="LCS-XXXXX-XXXXX-XXXXX-XXXXX"
                style={styles.input}
                required
                autoFocus
              />
              <p style={styles.hint}>
                Your license key was sent to your email after purchase.
              </p>
            </div>
          ) : (
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">
                Enter your purchase email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
                autoFocus
              />
              <p style={styles.hint}>
                Use the email address you used when purchasing.
              </p>
            </div>
          )}

          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {}),
            }}
          >
            {loading ? 'Checking...' : 'Access My Tools'}
          </button>
        </form>

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
    fontFamily: 'monospace',
    letterSpacing: '1px',
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
