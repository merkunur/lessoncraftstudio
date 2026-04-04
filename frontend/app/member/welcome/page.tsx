'use client';

import { Suspense } from 'react';

/**
 * Post-Purchase Welcome Page
 *
 * Lemon Squeezy redirects here after purchase.
 * The webhook records the purchase automatically.
 * This page confirms the purchase and directs the buyer to sign in.
 */

function WelcomeContent() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmark}>&#10003;</div>
        <h1 style={styles.title}>Thank You for Your Purchase!</h1>

        <p style={styles.paragraph}>
          Your order is confirmed. Your app is ready to use.
        </p>

        <div style={styles.stepsBox}>
          <h2 style={styles.stepsTitle}>What Happens Next?</h2>

          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepContent}>
              <strong>Check your email</strong>
              <p style={styles.stepText}>
                We sent you a link to set your password. Check your inbox (and spam folder) for an email from LessonCraftStudio.
              </p>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepContent}>
              <strong>Set your password and sign in</strong>
              <p style={styles.stepText}>
                Click the link in the email to set your password. Then sign in to access your apps.
              </p>
            </div>
          </div>

          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepContent}>
              <strong>Start creating worksheets!</strong>
              <p style={styles.stepText}>
                Generate unlimited professional worksheets. Export to PDF. Print or sell.
              </p>
            </div>
          </div>
        </div>

        <a href="/member" style={styles.button}>
          Go to Member Portal
        </a>

        <div style={styles.helpBox}>
          <p style={styles.helpText}>
            Need help?{' '}
            <a href="mailto:support@lessoncraftstudio.com" style={styles.helpLink}>
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div style={styles.container}>
        <div style={styles.card}>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
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
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '48px 40px',
    maxWidth: '560px',
    width: '100%',
    textAlign: 'center',
  },
  checkmark: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#DEF7EC',
    color: '#059669',
    fontSize: '32px',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1F2937',
    margin: '0 0 16px',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#4B5563',
    margin: '0 0 32px',
  },
  stepsBox: {
    textAlign: 'left',
    backgroundColor: '#F8FAFC',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '32px',
  },
  stepsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    margin: '0 0 20px',
  },
  step: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepContent: {
    fontSize: '15px',
    color: '#374151',
    lineHeight: '22px',
  },
  stepText: {
    margin: '4px 0 0',
    fontSize: '14px',
    color: '#6B7280',
  },
  button: {
    display: 'inline-block',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    textDecoration: 'none',
    marginBottom: '24px',
  },
  helpBox: {
    paddingTop: '16px',
    borderTop: '1px solid #E5E7EB',
  },
  helpText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
  },
  helpLink: {
    color: '#3B82F6',
    textDecoration: 'none',
  },
};
