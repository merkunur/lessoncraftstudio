'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function MemberPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      await login(email, password, true, '/member/dashboard');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      if (msg !== 'Login cancelled') setError(msg);
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

        <p style={styles.info}>
          Sign in with the email you used to purchase. Your account was created automatically when you bought your app.
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSignIn} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
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
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Forgot password? / First time? Set your password here
            </a>
          </div>
        </form>

        <div style={styles.helpSection}>
          <p style={styles.helpText}>
            Need help?{' '}
            <a href="mailto:support@lessoncraftstudio.com" style={styles.helpLink}>
              Contact support
            </a>
          </p>
          <p style={styles.helpText}>
            Don&apos;t have an app yet?{' '}
            <a href="/" style={styles.helpLink}>
              Return home
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
    marginBottom: '24px',
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
  info: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '1.6',
    textAlign: 'center',
    marginBottom: '24px',
    padding: '12px 16px',
    backgroundColor: '#F0F9FF',
    borderRadius: '8px',
    border: '1px solid #BAE6FD',
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
