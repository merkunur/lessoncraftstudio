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

interface ServiceSuspendedEmailProps {
  firstName: string;
  suspensionDate: string;
  dataRetentionDays: number;
  updatePaymentUrl: string;
  language?: string;
}

const translations = {
  en: {
    subject: 'Service Suspended - Update Payment to Restore Access',
    heading: '🚫 Subscription Suspended',
    greeting: (name: string) => `Hi ${name},`,
    intro: 'Your subscription has been suspended due to multiple failed payment attempts.',
    suspended: (date: string) => `Your account was suspended on ${date}.`,
    whyTitle: 'Why was my account suspended?',
    whyText: 'We attempted to process your payment multiple times over the past 15 days but were unable to collect payment. To maintain service quality, we\'ve temporarily suspended your access.',
    dataTitle: 'Is my data safe?',
    dataText: (days: number) => `Yes! Your data is completely safe and will be retained for ${days} days. You won\'t lose any of your worksheets, settings, or content.`,
    restoreTitle: 'How do I restore access?',
    restoreText: 'Simply update your payment method, and we\'ll reactivate your subscription immediately.',
    button: 'Restore My Access',
    whatNext: 'What happens next?',
    timeline1: (days: number) => `Next ${days} days: Your data is safe and waiting for you`,
    timeline2: (days: number) => `After ${days} days: Your subscription will be permanently canceled`,
    timeline3: 'After 90 days: Your data will be permanently deleted (GDPR compliance)',
    support: 'Need help? Our support team is here to assist you with any payment issues.',
    footer: 'We hope to see you back soon!',
  },
  de: {
    subject: 'Service ausgesetzt - Zahlung aktualisieren um Zugriff wiederherzustellen',
    heading: '🚫 Abonnement ausgesetzt',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'Ihr Abonnement wurde aufgrund mehrerer fehlgeschlagener Zahlungsversuche ausgesetzt.',
    suspended: (date: string) => `Ihr Konto wurde am ${date} ausgesetzt.`,
    whyTitle: 'Warum wurde mein Konto ausgesetzt?',
    whyText: 'Wir haben in den letzten 15 Tagen mehrmals versucht, Ihre Zahlung zu verarbeiten, konnten jedoch keine Zahlung einziehen. Um die Servicequalität aufrechtzuerhalten, haben wir Ihren Zugriff vorübergehend ausgesetzt.',
    dataTitle: 'Sind meine Daten sicher?',
    dataText: (days: number) => `Ja! Ihre Daten sind vollkommen sicher und werden ${days} Tage lang aufbewahrt. Sie verlieren keine Ihrer Arbeitsblätter, Einstellungen oder Inhalte.`,
    restoreTitle: 'Wie stelle ich den Zugriff wieder her?',
    restoreText: 'Aktualisieren Sie einfach Ihre Zahlungsmethode und wir reaktivieren Ihr Abonnement sofort.',
    button: 'Meinen Zugriff wiederherstellen',
    whatNext: 'Was passiert als nächstes?',
    timeline1: (days: number) => `Nächste ${days} Tage: Ihre Daten sind sicher und warten auf Sie`,
    timeline2: (days: number) => `Nach ${days} Tagen: Ihr Abonnement wird dauerhaft gekündigt`,
    timeline3: 'Nach 90 Tagen: Ihre Daten werden dauerhaft gelöscht (DSGVO-Konformität)',
    support: 'Brauchen Sie Hilfe? Unser Support-Team ist hier, um Ihnen bei Zahlungsproblemen zu helfen.',
    footer: 'Wir hoffen, Sie bald wiederzusehen!',
  },
  // Add more languages...
};

export function ServiceSuspendedEmail({
  firstName,
  suspensionDate,
  dataRetentionDays,
  updatePaymentUrl,
  language = 'en',
}: ServiceSuspendedEmailProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.heading}</Heading>

          <Text style={text}>{t.greeting(firstName)}</Text>

          <Text style={urgentText}>{t.intro}</Text>

          <Section style={suspendedBox}>
            <Text style={suspendedText}>{t.suspended(suspensionDate)}</Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading style={h2}>{t.whyTitle}</Heading>
            <Text style={text}>{t.whyText}</Text>
          </Section>

          <Section>
            <Heading style={h2}>{t.dataTitle}</Heading>
            <Text style={text}>{t.dataText(dataRetentionDays)}</Text>
          </Section>

          <Section>
            <Heading style={h2}>{t.restoreTitle}</Heading>
            <Text style={text}>{t.restoreText}</Text>
          </Section>

          <Button style={button} href={updatePaymentUrl}>
            {t.button}
          </Button>

          <Hr style={hr} />

          <Section>
            <Heading style={h2}>{t.whatNext}</Heading>
            <Section style={timelineBox}>
              <Text style={timelineText}>✓ {t.timeline1(dataRetentionDays)}</Text>
              <Text style={timelineText}>⚠️ {t.timeline2}</Text>
              <Text style={timelineText}>🗑️ {t.timeline3}</Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>{t.support}</Text>
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

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  margin: '24px 0 12px 0',
  lineHeight: '1.4',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
};

const urgentText = {
  color: '#dc2626',
  fontSize: '17px',
  fontWeight: '600',
  lineHeight: '26px',
  margin: '16px 0',
};

const suspendedBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #dc2626',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const suspendedText = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#16a34a',
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
  margin: '32px 0',
};

const timelineBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const timelineText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '8px 0',
};

export default ServiceSuspendedEmail;
