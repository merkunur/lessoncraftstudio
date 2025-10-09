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

interface PaymentFailedEmailProps {
  firstName: string;
  amount: number;
  currency: string;
  failureReason: string;
  updatePaymentUrl: string;
  nextRetryDate: string;
  language?: string;
}

const translations = {
  en: {
    subject: 'Payment Failed - Action Required',
    heading: 'Payment Failed',
    greeting: (name: string) => `Hi ${name},`,
    intro: 'We were unable to process your recent payment for your subscription.',
    amount: 'Amount',
    reason: 'Reason',
    action: 'To continue your subscription without interruption, please update your payment method.',
    button: 'Update Payment Method',
    retry: 'We will automatically retry the payment on',
    noAction: 'If you don\'t update your payment method, your subscription may be suspended after 15 days.',
    questions: 'Questions? Contact our support team and we\'ll be happy to help.',
    footer: 'Thank you for being a valued subscriber!',
  },
  de: {
    subject: 'Zahlung fehlgeschlagen - Handlung erforderlich',
    heading: 'Zahlung fehlgeschlagen',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'Wir konnten Ihre letzte Zahlung für Ihr Abonnement nicht verarbeiten.',
    amount: 'Betrag',
    reason: 'Grund',
    action: 'Um Ihr Abonnement ohne Unterbrechung fortzusetzen, aktualisieren Sie bitte Ihre Zahlungsmethode.',
    button: 'Zahlungsmethode aktualisieren',
    retry: 'Wir werden die Zahlung automatisch wiederholen am',
    noAction: 'Wenn Sie Ihre Zahlungsmethode nicht aktualisieren, kann Ihr Abonnement nach 15 Tagen ausgesetzt werden.',
    questions: 'Fragen? Kontaktieren Sie unser Support-Team und wir helfen Ihnen gerne weiter.',
    footer: 'Vielen Dank, dass Sie ein geschätzter Abonnent sind!',
  },
  fr: {
    subject: 'Échec du paiement - Action requise',
    heading: 'Échec du paiement',
    greeting: (name: string) => `Bonjour ${name},`,
    intro: 'Nous n\'avons pas pu traiter votre dernier paiement pour votre abonnement.',
    amount: 'Montant',
    reason: 'Raison',
    action: 'Pour continuer votre abonnement sans interruption, veuillez mettre à jour votre mode de paiement.',
    button: 'Mettre à jour le mode de paiement',
    retry: 'Nous réessaierons automatiquement le paiement le',
    noAction: 'Si vous ne mettez pas à jour votre mode de paiement, votre abonnement peut être suspendu après 15 jours.',
    questions: 'Des questions? Contactez notre équipe de support et nous serons heureux de vous aider.',
    footer: 'Merci d\'être un abonné apprécié!',
  },
  es: {
    subject: 'Pago fallido - Acción requerida',
    heading: 'Pago fallido',
    greeting: (name: string) => `Hola ${name},`,
    intro: 'No pudimos procesar su último pago para su suscripción.',
    amount: 'Monto',
    reason: 'Razón',
    action: 'Para continuar su suscripción sin interrupciones, actualice su método de pago.',
    button: 'Actualizar método de pago',
    retry: 'Reintentaremos automáticamente el pago el',
    noAction: 'Si no actualiza su método de pago, su suscripción puede suspenderse después de 15 días.',
    questions: '¿Preguntas? Contacte a nuestro equipo de soporte y estaremos encantados de ayudarle.',
    footer: '¡Gracias por ser un suscriptor valioso!',
  },
  // Add more languages as needed...
};

export function PaymentFailedEmail({
  firstName,
  amount,
  currency,
  failureReason,
  updatePaymentUrl,
  nextRetryDate,
  language = 'en',
}: PaymentFailedEmailProps) {
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

          <Text style={text}>{t.intro}</Text>

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

          <Text style={smallText}>
            {t.retry} <strong>{nextRetryDate}</strong>
          </Text>

          <Text style={warningText}>{t.noAction}</Text>

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

const infoBox = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
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
  padding: '12px 20px',
  margin: '24px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};

const smallText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '12px 0',
};

const warningText = {
  color: '#dc2626',
  fontSize: '14px',
  lineHeight: '24px',
  fontWeight: '500',
  margin: '12px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '8px 0',
};

export default PaymentFailedEmail;
