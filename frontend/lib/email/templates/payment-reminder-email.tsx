import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface PaymentReminderEmailProps {
  firstName: string;
  amount: number;
  currency: string;
  failureReason: string;
  updatePaymentUrl: string;
  daysUntilSuspension: number;
  language?: string;
}

const translations = {
  en: {
    subject: 'Urgent: Payment Still Failed - Subscription at Risk',
    heading: '⚠️ Payment Reminder',
    greeting: (name: string) => `Hi ${name},`,
    intro: 'Your payment is still failing, and your subscription is at risk of suspension.',
    urgency: 'We\'ve attempted to process your payment multiple times without success.',
    amount: 'Outstanding Amount',
    reason: 'Failure Reason',
    action: 'Please update your payment method immediately to avoid losing access to your subscription.',
    button: 'Update Payment Method Now',
    suspension: (days: number) => `Your subscription will be suspended in ${days} day${days !== 1 ? 's' : ''} if we cannot process your payment.`,
    impact: 'After suspension:',
    impact1: '✗ You will lose access to all premium features',
    impact2: '✗ Your worksheets and data will be retained for 60 days',
    impact3: '✓ You can restore access anytime by updating your payment method',
    questions: 'Questions? Contact our support team and we\'ll be happy to help.',
    footer: 'We value your subscription and want to help resolve this issue.',
  },
  de: {
    subject: 'Dringend: Zahlung immer noch fehlgeschlagen - Abonnement gefährdet',
    heading: '⚠️ Zahlungserinnerung',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'Ihre Zahlung schlägt immer noch fehl und Ihr Abonnement ist von einer Aussetzung bedroht.',
    urgency: 'Wir haben mehrmals erfolglos versucht, Ihre Zahlung zu verarbeiten.',
    amount: 'Ausstehender Betrag',
    reason: 'Grund des Fehlschlagens',
    action: 'Bitte aktualisieren Sie sofort Ihre Zahlungsmethode, um den Zugriff auf Ihr Abonnement nicht zu verlieren.',
    button: 'Zahlungsmethode jetzt aktualisieren',
    suspension: (days: number) => `Ihr Abonnement wird in ${days} Tag${days !== 1 ? 'en' : ''} ausgesetzt, wenn wir Ihre Zahlung nicht verarbeiten können.`,
    impact: 'Nach der Aussetzung:',
    impact1: '✗ Sie verlieren den Zugriff auf alle Premium-Funktionen',
    impact2: '✗ Ihre Arbeitsblätter und Daten werden 60 Tage lang aufbewahrt',
    impact3: '✓ Sie können den Zugriff jederzeit durch Aktualisierung Ihrer Zahlungsmethode wiederherstellen',
    questions: 'Fragen? Kontaktieren Sie unser Support-Team und wir helfen Ihnen gerne weiter.',
    footer: 'Wir schätzen Ihr Abonnement und möchten Ihnen helfen, dieses Problem zu lösen.',
  },
  // Add more languages...
};

export function PaymentReminderEmail({
  firstName,
  amount,
  currency,
  failureReason,
  updatePaymentUrl,
  daysUntilSuspension,
  language = 'en',
}: PaymentReminderEmailProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  const formatCurrency = (amt: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr.toUpperCase(),
    }).format(amt / 100);
  };

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.heading}</Heading>

          <Text style={text}>{t.greeting(firstName)}</Text>

          <Text style={urgentText}>{t.intro}</Text>

          <Text style={text}>{t.urgency}</Text>

          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>{t.amount}:</strong> {formatCurrency(amount, currency)}
            </Text>
            <Text style={infoText}>
              <strong>{t.reason}:</strong> {failureReason}
            </Text>
          </Section>

          <Text style={text}>{t.action}</Text>

          <Button style={button} href={updatePaymentUrl}>
            {t.button}
          </Button>

          <Hr style={hr} />

          <Section style={warningBox}>
            <Text style={warningText}>{t.suspension(daysUntilSuspension)}</Text>

            <Text style={smallText}><strong>{t.impact}</strong></Text>
            <Text style={impactText}>{t.impact1}</Text>
            <Text style={impactText}>{t.impact2}</Text>
            <Text style={impactText}>{t.impact3}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>{t.questions}</Text>
          <Text style={footer}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#dc2626',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  lineHeight: '1.4',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const urgentText = {
  color: '#dc2626',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '16px 0',
};

const infoBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #fecaca',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const infoText = {
  color: '#333',
  fontSize: '14px',
  margin: '8px 0',
};

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 20px',
  margin: '24px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};

const warningBox = {
  backgroundColor: '#fff7ed',
  border: '2px solid #fed7aa',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const warningText = {
  color: '#ea580c',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: '600',
  margin: '12px 0',
};

const smallText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '12px 0 8px 0',
};

const impactText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '4px 0',
  paddingLeft: '8px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '8px 0',
};

export default PaymentReminderEmail;
