/**
 * Failed Payment Email Template
 * Sent when a payment fails - critical for dunning process
 */

import {
  Button,
  Heading,
  Hr,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { BaseLayout } from './base-layout';

interface FailedPaymentEmailProps {
  firstName: string;
  amount: number;
  currency: string;
  plan: string;
  failureReason?: string;
  retryDate?: string;
  updatePaymentUrl: string;
  language?: string;
}

export const FailedPaymentEmail = ({
  firstName = 'there',
  amount,
  currency = 'USD',
  plan,
  failureReason,
  retryDate,
  updatePaymentUrl,
  language = 'en',
}: FailedPaymentEmailProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const translations = {
    en: {
      preview: 'Payment failed - Action required',
      title: 'Payment Failed',
      greeting: `Hi ${firstName},`,
      body1: `We attempted to charge your payment method for your ${plan} subscription, but the payment failed.`,
      amountLabel: 'Amount',
      planLabel: 'Plan',
      reasonLabel: 'Reason',
      retryLabel: 'We will retry on',
      action: 'Please update your payment method to avoid service interruption.',
      buttonText: 'Update Payment Method',
      whatHappens: 'What happens next?',
      whatHappensText: 'We will automatically retry charging your payment method. If all retries fail, your subscription may be suspended.',
      needHelp: 'Need help?',
      needHelpText: 'If you believe this is an error or need assistance, please contact our support team.',
      important: '⚠️ Important',
    },
    de: {
      preview: 'Zahlung fehlgeschlagen - Aktion erforderlich',
      title: 'Zahlung fehlgeschlagen',
      greeting: `Hallo ${firstName},`,
      body1: `Wir haben versucht, Ihre Zahlungsmethode für Ihr ${plan}-Abonnement zu belasten, aber die Zahlung ist fehlgeschlagen.`,
      amountLabel: 'Betrag',
      planLabel: 'Plan',
      reasonLabel: 'Grund',
      retryLabel: 'Wir versuchen es erneut am',
      action: 'Bitte aktualisieren Sie Ihre Zahlungsmethode, um eine Unterbrechung des Dienstes zu vermeiden.',
      buttonText: 'Zahlungsmethode aktualisieren',
      whatHappens: 'Was passiert als Nächstes?',
      whatHappensText: 'Wir werden automatisch versuchen, Ihre Zahlungsmethode erneut zu belasten. Wenn alle Versuche fehlschlagen, kann Ihr Abonnement ausgesetzt werden.',
      needHelp: 'Brauchen Sie Hilfe?',
      needHelpText: 'Wenn Sie glauben, dass dies ein Fehler ist oder Unterstützung benötigen, wenden Sie sich bitte an unser Support-Team.',
      important: '⚠️ Wichtig',
    },
    fr: {
      preview: 'Échec du paiement - Action requise',
      title: 'Échec du paiement',
      greeting: `Bonjour ${firstName},`,
      body1: `Nous avons tenté de débiter votre moyen de paiement pour votre abonnement ${plan}, mais le paiement a échoué.`,
      amountLabel: 'Montant',
      planLabel: 'Plan',
      reasonLabel: 'Raison',
      retryLabel: 'Nous réessayerons le',
      action: 'Veuillez mettre à jour votre moyen de paiement pour éviter une interruption de service.',
      buttonText: 'Mettre à jour le moyen de paiement',
      whatHappens: 'Que se passe-t-il ensuite?',
      whatHappensText: 'Nous réessayerons automatiquement de débiter votre moyen de paiement. Si toutes les tentatives échouent, votre abonnement peut être suspendu.',
      needHelp: 'Besoin d\'aide?',
      needHelpText: 'Si vous pensez qu\'il s\'agit d\'une erreur ou si vous avez besoin d\'assistance, veuillez contacter notre équipe de support.',
      important: '⚠️ Important',
    },
    es: {
      preview: 'Pago fallido - Acción requerida',
      title: 'Pago fallido',
      greeting: `Hola ${firstName},`,
      body1: `Intentamos cobrar tu método de pago para tu suscripción ${plan}, pero el pago falló.`,
      amountLabel: 'Monto',
      planLabel: 'Plan',
      reasonLabel: 'Razón',
      retryLabel: 'Reintentaremos el',
      action: 'Por favor actualiza tu método de pago para evitar la interrupción del servicio.',
      buttonText: 'Actualizar método de pago',
      whatHappens: '¿Qué sucede después?',
      whatHappensText: 'Reintentaremos automáticamente cobrar tu método de pago. Si todos los intentos fallan, tu suscripción puede ser suspendida.',
      needHelp: '¿Necesitas ayuda?',
      needHelpText: 'Si crees que esto es un error o necesitas asistencia, por favor contacta a nuestro equipo de soporte.',
      important: '⚠️ Importante',
    },
    sv: {
      preview: 'Betalning misslyckades - Åtgärd krävs',
      title: 'Betalning misslyckades',
      greeting: `Hej ${firstName},`,
      body1: `Vi försökte debitera din betalningsmetod för din ${plan}-prenumeration, men betalningen misslyckades.`,
      amountLabel: 'Belopp',
      planLabel: 'Plan',
      reasonLabel: 'Anledning',
      retryLabel: 'Vi försöker igen den',
      action: 'Vänligen uppdatera din betalningsmetod för att undvika avbrott i tjänsten.',
      buttonText: 'Uppdatera betalningsmetod',
      whatHappens: 'Vad händer härnäst?',
      whatHappensText: 'Vi kommer automatiskt att försöka debitera din betalningsmetod igen. Om alla försök misslyckas kan din prenumeration suspenderas.',
      needHelp: 'Behöver du hjälp?',
      needHelpText: 'Om du tror att detta är ett fel eller behöver hjälp, vänligen kontakta vårt supportteam.',
      important: '⚠️ Viktigt',
    },
    it: {
      preview: 'Pagamento fallito - Azione richiesta',
      title: 'Pagamento fallito',
      greeting: `Ciao ${firstName},`,
      body1: `Abbiamo tentato di addebitare il tuo metodo di pagamento per il tuo abbonamento ${plan}, ma il pagamento è fallito.`,
      amountLabel: 'Importo',
      planLabel: 'Piano',
      reasonLabel: 'Motivo',
      retryLabel: 'Riproveremo il',
      action: 'Aggiorna il tuo metodo di pagamento per evitare l\'interruzione del servizio.',
      buttonText: 'Aggiorna metodo di pagamento',
      whatHappens: 'Cosa succede dopo?',
      whatHappensText: 'Riproveremo automaticamente ad addebitare il tuo metodo di pagamento. Se tutti i tentativi falliscono, il tuo abbonamento potrebbe essere sospeso.',
      needHelp: 'Hai bisogno di aiuto?',
      needHelpText: 'Se ritieni che si tratti di un errore o hai bisogno di assistenza, contatta il nostro team di supporto.',
      important: '⚠️ Importante',
    },
    pt: {
      preview: 'Pagamento falhou - Ação necessária',
      title: 'Pagamento falhou',
      greeting: `Olá ${firstName},`,
      body1: `Tentamos cobrar seu método de pagamento para sua assinatura ${plan}, mas o pagamento falhou.`,
      amountLabel: 'Valor',
      planLabel: 'Plano',
      reasonLabel: 'Razão',
      retryLabel: 'Tentaremos novamente em',
      action: 'Por favor, atualize seu método de pagamento para evitar a interrupção do serviço.',
      buttonText: 'Atualizar método de pagamento',
      whatHappens: 'O que acontece a seguir?',
      whatHappensText: 'Tentaremos automaticamente cobrar seu método de pagamento novamente. Se todas as tentativas falharem, sua assinatura pode ser suspensa.',
      needHelp: 'Precisa de ajuda?',
      needHelpText: 'Se você acredita que isso é um erro ou precisa de assistência, entre em contato com nossa equipe de suporte.',
      important: '⚠️ Importante',
    },
    nl: {
      preview: 'Betaling mislukt - Actie vereist',
      title: 'Betaling mislukt',
      greeting: `Hallo ${firstName},`,
      body1: `We hebben geprobeerd uw betalingsmethode te debiteren voor uw ${plan}-abonnement, maar de betaling is mislukt.`,
      amountLabel: 'Bedrag',
      planLabel: 'Plan',
      reasonLabel: 'Reden',
      retryLabel: 'We proberen het opnieuw op',
      action: 'Update uw betalingsmethode om onderbreking van de dienst te voorkomen.',
      buttonText: 'Betalingsmethode bijwerken',
      whatHappens: 'Wat gebeurt er nu?',
      whatHappensText: 'We zullen automatisch proberen uw betalingsmethode opnieuw te debiteren. Als alle pogingen mislukken, kan uw abonnement worden opgeschort.',
      needHelp: 'Hulp nodig?',
      needHelpText: 'Als u denkt dat dit een fout is of hulp nodig heeft, neem dan contact op met ons supportteam.',
      important: '⚠️ Belangrijk',
    },
    da: {
      preview: 'Betaling mislykkedes - Handling påkrævet',
      title: 'Betaling mislykkedes',
      greeting: `Hej ${firstName},`,
      body1: `Vi forsøgte at opkræve din betalingsmetode for dit ${plan}-abonnement, men betalingen mislykkedes.`,
      amountLabel: 'Beløb',
      planLabel: 'Plan',
      reasonLabel: 'Årsag',
      retryLabel: 'Vi prøver igen den',
      action: 'Opdater venligst din betalingsmetode for at undgå afbrydelse af tjenesten.',
      buttonText: 'Opdater betalingsmetode',
      whatHappens: 'Hvad sker der nu?',
      whatHappensText: 'Vi vil automatisk forsøge at opkræve din betalingsmetode igen. Hvis alle forsøg mislykkes, kan dit abonnement blive suspenderet.',
      needHelp: 'Brug for hjælp?',
      needHelpText: 'Hvis du mener, at dette er en fejl, eller har brug for hjælp, skal du kontakte vores supportteam.',
      important: '⚠️ Vigtigt',
    },
    no: {
      preview: 'Betaling mislyktes - Handling påkrevd',
      title: 'Betaling mislyktes',
      greeting: `Hei ${firstName},`,
      body1: `Vi forsøkte å belaste betalingsmetoden din for ${plan}-abonnementet ditt, men betalingen mislyktes.`,
      amountLabel: 'Beløp',
      planLabel: 'Plan',
      reasonLabel: 'Årsak',
      retryLabel: 'Vi prøver igjen den',
      action: 'Vennligst oppdater betalingsmetoden din for å unngå avbrudd i tjenesten.',
      buttonText: 'Oppdater betalingsmetode',
      whatHappens: 'Hva skjer nå?',
      whatHappensText: 'Vi vil automatisk forsøke å belaste betalingsmetoden din igjen. Hvis alle forsøk mislykkes, kan abonnementet ditt bli suspendert.',
      needHelp: 'Trenger du hjelp?',
      needHelpText: 'Hvis du tror dette er en feil eller trenger hjelp, vennligst kontakt vårt supportteam.',
      important: '⚠️ Viktig',
    },
    fi: {
      preview: 'Maksu epäonnistui - Toimenpiteitä vaaditaan',
      title: 'Maksu epäonnistui',
      greeting: `Hei ${firstName},`,
      body1: `Yritimme veloittaa maksutapaasi ${plan}-tilauksestasi, mutta maksu epäonnistui.`,
      amountLabel: 'Summa',
      planLabel: 'Paketti',
      reasonLabel: 'Syy',
      retryLabel: 'Yritämme uudelleen',
      action: 'Päivitä maksutapasi välttääksesi palvelun keskeytyksen.',
      buttonText: 'Päivitä maksutapa',
      whatHappens: 'Mitä tapahtuu seuraavaksi?',
      whatHappensText: 'Yritämme automaattisesti veloittaa maksutapaasi uudelleen. Jos kaikki yritykset epäonnistuvat, tilauksesi voidaan keskeyttää.',
      needHelp: 'Tarvitsetko apua?',
      needHelpText: 'Jos uskot tämän olevan virhe tai tarvitset apua, ota yhteyttä tukitiimiimme.',
      important: '⚠️ Tärkeää',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>
      <Text style={paragraph}>{t.body1}</Text>

      <Section style={failureBox}>
        <Text style={failureTitle}>{t.important}</Text>

        <Section style={detailsSection}>
          <Text style={detailRow}>
            <span style={detailLabel}>{t.amountLabel}:</span>{' '}
            <span style={detailValue}>{formatCurrency(amount, currency)}</span>
          </Text>
          <Text style={detailRow}>
            <span style={detailLabel}>{t.planLabel}:</span>{' '}
            <span style={detailValue}>{plan}</span>
          </Text>
          {failureReason && (
            <Text style={detailRow}>
              <span style={detailLabel}>{t.reasonLabel}:</span>{' '}
              <span style={detailValue}>{failureReason}</span>
            </Text>
          )}
          {retryDate && (
            <Text style={detailRow}>
              <span style={detailLabel}>{t.retryLabel}:</span>{' '}
              <span style={detailValue}>{retryDate}</span>
            </Text>
          )}
        </Section>
      </Section>

      <Text style={actionText}>{t.action}</Text>

      <Section style={buttonContainer}>
        <Button style={button} href={updatePaymentUrl}>
          {t.buttonText}
        </Button>
      </Section>

      <Hr style={hr} />

      <Heading as="h3" style={subheading}>
        {t.whatHappens}
      </Heading>
      <Text style={paragraph}>{t.whatHappensText}</Text>

      <Heading as="h3" style={subheading}>
        {t.needHelp}
      </Heading>
      <Text style={paragraph}>{t.needHelpText}</Text>
    </BaseLayout>
  );
};

export default FailedPaymentEmail;

// Styles
const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#dc3545',
  margin: '0 0 20px',
};

const subheading = {
  fontSize: '20px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '20px 0 10px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  margin: '16px 0',
};

const failureBox = {
  backgroundColor: '#fff3cd',
  border: '2px solid #ffc107',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
};

const failureTitle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#856404',
  margin: '0 0 15px',
};

const detailsSection = {
  marginTop: '15px',
};

const detailRow = {
  fontSize: '15px',
  lineHeight: '28px',
  color: '#856404',
  margin: '8px 0',
};

const detailLabel = {
  fontWeight: '600' as const,
};

const detailValue = {
  fontWeight: '400' as const,
};

const actionText = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  fontWeight: '600',
  margin: '20px 0',
  textAlign: 'center' as const,
};

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#dc3545',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};
