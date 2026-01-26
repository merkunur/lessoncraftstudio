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
  sv: {
    subject: 'Betalning misslyckades - Åtgärd krävs',
    heading: 'Betalning misslyckades',
    greeting: (name: string) => `Hej ${name},`,
    intro: 'Vi kunde inte behandla din senaste betalning för din prenumeration.',
    amount: 'Belopp',
    reason: 'Anledning',
    action: 'För att fortsätta din prenumeration utan avbrott, vänligen uppdatera din betalningsmetod.',
    button: 'Uppdatera betalningsmetod',
    retry: 'Vi kommer automatiskt att försöka igen',
    noAction: 'Om du inte uppdaterar din betalningsmetod kan din prenumeration stängas av efter 15 dagar.',
    questions: 'Frågor? Kontakta vårt supportteam så hjälper vi dig gärna.',
    footer: 'Tack för att du är en uppskattad prenumerant!',
  },
  it: {
    subject: 'Pagamento fallito - Azione richiesta',
    heading: 'Pagamento fallito',
    greeting: (name: string) => `Ciao ${name},`,
    intro: 'Non siamo riusciti a elaborare il tuo ultimo pagamento per l\'abbonamento.',
    amount: 'Importo',
    reason: 'Motivo',
    action: 'Per continuare il tuo abbonamento senza interruzioni, aggiorna il metodo di pagamento.',
    button: 'Aggiorna metodo di pagamento',
    retry: 'Riproveremo automaticamente il pagamento il',
    noAction: 'Se non aggiorni il metodo di pagamento, il tuo abbonamento potrebbe essere sospeso dopo 15 giorni.',
    questions: 'Domande? Contatta il nostro team di supporto e saremo felici di aiutarti.',
    footer: 'Grazie per essere un abbonato prezioso!',
  },
  pt: {
    subject: 'Pagamento falhou - Ação necessária',
    heading: 'Pagamento falhou',
    greeting: (name: string) => `Olá ${name},`,
    intro: 'Não conseguimos processar seu último pagamento da assinatura.',
    amount: 'Valor',
    reason: 'Motivo',
    action: 'Para continuar sua assinatura sem interrupção, atualize seu método de pagamento.',
    button: 'Atualizar método de pagamento',
    retry: 'Tentaremos novamente automaticamente em',
    noAction: 'Se você não atualizar seu método de pagamento, sua assinatura pode ser suspensa após 15 dias.',
    questions: 'Dúvidas? Entre em contato com nossa equipe de suporte e teremos prazer em ajudar.',
    footer: 'Obrigado por ser um assinante valioso!',
  },
  nl: {
    subject: 'Betaling mislukt - Actie vereist',
    heading: 'Betaling mislukt',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'We konden uw recente betaling voor uw abonnement niet verwerken.',
    amount: 'Bedrag',
    reason: 'Reden',
    action: 'Om uw abonnement zonder onderbreking voort te zetten, werk uw betaalmethode bij.',
    button: 'Betaalmethode bijwerken',
    retry: 'We proberen de betaling automatisch opnieuw op',
    noAction: 'Als u uw betaalmethode niet bijwerkt, kan uw abonnement na 15 dagen worden opgeschort.',
    questions: 'Vragen? Neem contact op met ons supportteam en we helpen u graag.',
    footer: 'Bedankt dat u een gewaardeerde abonnee bent!',
  },
  da: {
    subject: 'Betaling mislykkedes - Handling påkrævet',
    heading: 'Betaling mislykkedes',
    greeting: (name: string) => `Hej ${name},`,
    intro: 'Vi kunne ikke behandle din seneste betaling for dit abonnement.',
    amount: 'Beløb',
    reason: 'Årsag',
    action: 'For at fortsætte dit abonnement uden afbrydelse, opdater venligst din betalingsmetode.',
    button: 'Opdater betalingsmetode',
    retry: 'Vi vil automatisk prøve igen den',
    noAction: 'Hvis du ikke opdaterer din betalingsmetode, kan dit abonnement blive suspenderet efter 15 dage.',
    questions: 'Spørgsmål? Kontakt vores supportteam, og vi hjælper dig gerne.',
    footer: 'Tak fordi du er en værdsat abonnent!',
  },
  no: {
    subject: 'Betaling mislyktes - Handling påkrevd',
    heading: 'Betaling mislyktes',
    greeting: (name: string) => `Hei ${name},`,
    intro: 'Vi kunne ikke behandle din siste betaling for abonnementet ditt.',
    amount: 'Beløp',
    reason: 'Årsak',
    action: 'For å fortsette abonnementet uten avbrudd, vennligst oppdater betalingsmetoden din.',
    button: 'Oppdater betalingsmetode',
    retry: 'Vi vil automatisk prøve igjen den',
    noAction: 'Hvis du ikke oppdaterer betalingsmetoden, kan abonnementet bli suspendert etter 15 dager.',
    questions: 'Spørsmål? Kontakt supportteamet vårt, så hjelper vi deg gjerne.',
    footer: 'Takk for at du er en verdsatt abonnent!',
  },
  fi: {
    subject: 'Maksu epäonnistui - Toimenpiteitä vaaditaan',
    heading: 'Maksu epäonnistui',
    greeting: (name: string) => `Hei ${name},`,
    intro: 'Emme pystyneet käsittelemään viimeisintä tilausmaksuasi.',
    amount: 'Summa',
    reason: 'Syy',
    action: 'Jatkaaksesi tilaustasi keskeytyksettä, päivitä maksutapasi.',
    button: 'Päivitä maksutapa',
    retry: 'Yritämme maksua automaattisesti uudelleen',
    noAction: 'Jos et päivitä maksutapaasi, tilauksesi voidaan keskeyttää 15 päivän kuluttua.',
    questions: 'Kysymyksiä? Ota yhteyttä tukitiimiimme, niin autamme mielellämme.',
    footer: 'Kiitos, että olet arvostettu tilaaja!',
  },
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
