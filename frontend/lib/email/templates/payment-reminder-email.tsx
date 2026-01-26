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
  fr: {
    subject: 'Urgent: Paiement toujours échoué - Abonnement à risque',
    heading: '⚠️ Rappel de paiement',
    greeting: (name: string) => `Bonjour ${name},`,
    intro: 'Votre paiement échoue toujours et votre abonnement risque d\'être suspendu.',
    urgency: 'Nous avons tenté de traiter votre paiement plusieurs fois sans succès.',
    amount: 'Montant impayé',
    reason: 'Raison de l\'échec',
    action: 'Veuillez mettre à jour votre méthode de paiement immédiatement pour éviter de perdre l\'accès.',
    button: 'Mettre à jour maintenant',
    suspension: (days: number) => `Votre abonnement sera suspendu dans ${days} jour${days !== 1 ? 's' : ''}.`,
    impact: 'Après suspension:',
    impact1: '✗ Vous perdrez l\'accès à toutes les fonctionnalités premium',
    impact2: '✗ Vos données seront conservées pendant 60 jours',
    impact3: '✓ Vous pouvez restaurer l\'accès à tout moment',
    questions: 'Des questions? Contactez notre équipe de support.',
    footer: 'Nous souhaitons vous aider à résoudre ce problème.',
  },
  es: {
    subject: 'Urgente: Pago aún fallido - Suscripción en riesgo',
    heading: '⚠️ Recordatorio de pago',
    greeting: (name: string) => `Hola ${name},`,
    intro: 'Tu pago sigue fallando y tu suscripción está en riesgo de suspensión.',
    urgency: 'Hemos intentado procesar tu pago varias veces sin éxito.',
    amount: 'Monto pendiente',
    reason: 'Razón del fallo',
    action: 'Por favor actualiza tu método de pago inmediatamente para evitar perder acceso.',
    button: 'Actualizar ahora',
    suspension: (days: number) => `Tu suscripción será suspendida en ${days} día${days !== 1 ? 's' : ''}.`,
    impact: 'Después de la suspensión:',
    impact1: '✗ Perderás acceso a todas las funciones premium',
    impact2: '✗ Tus datos se conservarán por 60 días',
    impact3: '✓ Puedes restaurar el acceso en cualquier momento',
    questions: '¿Preguntas? Contacta a nuestro equipo de soporte.',
    footer: 'Queremos ayudarte a resolver este problema.',
  },
  sv: {
    subject: 'Brådskande: Betalning fortfarande misslyckad',
    heading: '⚠️ Betalningspåminnelse',
    greeting: (name: string) => `Hej ${name},`,
    intro: 'Din betalning misslyckas fortfarande och din prenumeration riskerar att stängas av.',
    urgency: 'Vi har försökt behandla din betalning flera gånger utan framgång.',
    amount: 'Utestående belopp',
    reason: 'Orsak till misslyckande',
    action: 'Uppdatera din betalningsmetod omedelbart för att undvika att förlora åtkomst.',
    button: 'Uppdatera nu',
    suspension: (days: number) => `Din prenumeration stängs av om ${days} dag${days !== 1 ? 'ar' : ''}.`,
    impact: 'Efter avstängning:',
    impact1: '✗ Du förlorar åtkomst till alla premiumfunktioner',
    impact2: '✗ Dina data sparas i 60 dagar',
    impact3: '✓ Du kan återställa åtkomst när som helst',
    questions: 'Frågor? Kontakta vårt supportteam.',
    footer: 'Vi vill hjälpa dig lösa detta problem.',
  },
  it: {
    subject: 'Urgente: Pagamento ancora fallito',
    heading: '⚠️ Promemoria di pagamento',
    greeting: (name: string) => `Ciao ${name},`,
    intro: 'Il tuo pagamento continua a fallire e il tuo abbonamento rischia la sospensione.',
    urgency: 'Abbiamo tentato di elaborare il pagamento più volte senza successo.',
    amount: 'Importo in sospeso',
    reason: 'Motivo del fallimento',
    action: 'Aggiorna immediatamente il metodo di pagamento per evitare di perdere l\'accesso.',
    button: 'Aggiorna ora',
    suspension: (days: number) => `Il tuo abbonamento sarà sospeso tra ${days} giorn${days !== 1 ? 'i' : 'o'}.`,
    impact: 'Dopo la sospensione:',
    impact1: '✗ Perderai l\'accesso a tutte le funzionalità premium',
    impact2: '✗ I tuoi dati saranno conservati per 60 giorni',
    impact3: '✓ Puoi ripristinare l\'accesso in qualsiasi momento',
    questions: 'Domande? Contatta il nostro team di supporto.',
    footer: 'Vogliamo aiutarti a risolvere questo problema.',
  },
  pt: {
    subject: 'Urgente: Pagamento ainda falhou',
    heading: '⚠️ Lembrete de pagamento',
    greeting: (name: string) => `Olá ${name},`,
    intro: 'Seu pagamento continua falhando e sua assinatura corre risco de suspensão.',
    urgency: 'Tentamos processar seu pagamento várias vezes sem sucesso.',
    amount: 'Valor pendente',
    reason: 'Motivo da falha',
    action: 'Atualize seu método de pagamento imediatamente para evitar perder acesso.',
    button: 'Atualizar agora',
    suspension: (days: number) => `Sua assinatura será suspensa em ${days} dia${days !== 1 ? 's' : ''}.`,
    impact: 'Após suspensão:',
    impact1: '✗ Você perderá acesso a todos os recursos premium',
    impact2: '✗ Seus dados serão mantidos por 60 dias',
    impact3: '✓ Você pode restaurar o acesso a qualquer momento',
    questions: 'Dúvidas? Entre em contato com nosso suporte.',
    footer: 'Queremos ajudá-lo a resolver este problema.',
  },
  nl: {
    subject: 'Dringend: Betaling nog steeds mislukt',
    heading: '⚠️ Betalingsherinnering',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'Uw betaling mislukt nog steeds en uw abonnement loopt risico op opschorting.',
    urgency: 'We hebben meerdere keren geprobeerd uw betaling te verwerken zonder succes.',
    amount: 'Openstaand bedrag',
    reason: 'Reden van mislukking',
    action: 'Werk uw betaalmethode onmiddellijk bij om toegang te behouden.',
    button: 'Nu bijwerken',
    suspension: (days: number) => `Uw abonnement wordt over ${days} dag${days !== 1 ? 'en' : ''} opgeschort.`,
    impact: 'Na opschorting:',
    impact1: '✗ U verliest toegang tot alle premium functies',
    impact2: '✗ Uw gegevens worden 60 dagen bewaard',
    impact3: '✓ U kunt toegang op elk moment herstellen',
    questions: 'Vragen? Neem contact op met ons supportteam.',
    footer: 'We willen u helpen dit probleem op te lossen.',
  },
  da: {
    subject: 'Akut: Betaling stadig mislykket',
    heading: '⚠️ Betalingspåmindelse',
    greeting: (name: string) => `Hej ${name},`,
    intro: 'Din betaling mislykkes stadig, og dit abonnement risikerer at blive suspenderet.',
    urgency: 'Vi har forsøgt at behandle din betaling flere gange uden held.',
    amount: 'Udestående beløb',
    reason: 'Årsag til fejl',
    action: 'Opdater din betalingsmetode med det samme for at undgå at miste adgang.',
    button: 'Opdater nu',
    suspension: (days: number) => `Dit abonnement suspenderes om ${days} dag${days !== 1 ? 'e' : ''}.`,
    impact: 'Efter suspension:',
    impact1: '✗ Du mister adgang til alle premium-funktioner',
    impact2: '✗ Dine data gemmes i 60 dage',
    impact3: '✓ Du kan gendanne adgang når som helst',
    questions: 'Spørgsmål? Kontakt vores supportteam.',
    footer: 'Vi vil gerne hjælpe dig med at løse dette problem.',
  },
  no: {
    subject: 'Haster: Betaling fortsatt mislykket',
    heading: '⚠️ Betalingspåminnelse',
    greeting: (name: string) => `Hei ${name},`,
    intro: 'Betalingen din mislykkes fortsatt, og abonnementet ditt risikerer å bli suspendert.',
    urgency: 'Vi har forsøkt å behandle betalingen din flere ganger uten hell.',
    amount: 'Utestående beløp',
    reason: 'Årsak til feil',
    action: 'Oppdater betalingsmetoden din umiddelbart for å unngå å miste tilgang.',
    button: 'Oppdater nå',
    suspension: (days: number) => `Abonnementet ditt suspenderes om ${days} dag${days !== 1 ? 'er' : ''}.`,
    impact: 'Etter suspensjon:',
    impact1: '✗ Du mister tilgang til alle premium-funksjoner',
    impact2: '✗ Dataene dine lagres i 60 dager',
    impact3: '✓ Du kan gjenopprette tilgang når som helst',
    questions: 'Spørsmål? Kontakt supportteamet vårt.',
    footer: 'Vi ønsker å hjelpe deg med å løse dette problemet.',
  },
  fi: {
    subject: 'Kiireellinen: Maksu edelleen epäonnistunut',
    heading: '⚠️ Maksumuistutus',
    greeting: (name: string) => `Hei ${name},`,
    intro: 'Maksusi epäonnistuu edelleen ja tilauksesi on vaarassa keskeytyä.',
    urgency: 'Olemme yrittäneet käsitellä maksuasi useita kertoja onnistumatta.',
    amount: 'Maksamaton summa',
    reason: 'Epäonnistumisen syy',
    action: 'Päivitä maksutapasi välittömästi välttääksesi pääsyn menettämisen.',
    button: 'Päivitä nyt',
    suspension: (days: number) => `Tilauksesi keskeytetään ${days} päivä${days !== 1 ? 'n' : ''} kuluttua.`,
    impact: 'Keskeytyksen jälkeen:',
    impact1: '✗ Menetät pääsyn kaikkiin premium-ominaisuuksiin',
    impact2: '✗ Tietosi säilytetään 60 päivää',
    impact3: '✓ Voit palauttaa pääsyn milloin tahansa',
    questions: 'Kysymyksiä? Ota yhteyttä tukitiimiimme.',
    footer: 'Haluamme auttaa sinua ratkaisemaan tämän ongelman.',
  },
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
