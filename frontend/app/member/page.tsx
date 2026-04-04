'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

type ActiveTab = 'signin' | 'signup';

export default function MemberPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, login, signup } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveTab>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/member/dashboard');
    }
  }, [authLoading, isAuthenticated, router]);

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

  if (isAuthenticated) return null;

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

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const nameParts = newName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      await signup({ email: newEmail, password: newPassword, firstName, lastName }, '/member/dashboard');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign up failed';
      setError(msg);
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

        {/* Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={{ ...styles.tab, ...(activeTab === 'signin' ? styles.tabActive : {}) }}
            onClick={() => { setActiveTab('signin'); setError(''); }}
          >
            Sign In
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'signup' ? styles.tabActive : {}) }}
            onClick={() => { setActiveTab('signup'); setError(''); }}
          >
            Create Account
          </button>
        </div>

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

        {/* ===== SIGN UP TAB ===== */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} style={styles.form}>
            <p style={styles.hint}>
              Create an account with the same email you used to purchase. Your apps will appear automatically.
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
              <label style={styles.label} htmlFor="new-email">Email</label>
              <input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Help section */}
        <div style={styles.helpSection}>
          <p style={styles.helpText}>
            Need help?{' '}
            <a href="mailto:support@lessoncraftstudio.com" style={styles.helpLink}>
              Contact support
            </a>
          </p>
          <p style={styles.helpText}>
            Don&apos;t have an app yet?{' '}
            <a href="/en/pricing" style={styles.helpLink}>
              View pricing
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
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
    lineHeight: '1.5',
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
