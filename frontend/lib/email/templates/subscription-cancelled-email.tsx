/**
 * Subscription Cancelled Email Template
 * Sent when user cancels their subscription
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

interface SubscriptionCancelledEmailProps {
  firstName: string;
  plan: string;
  cancelDate: string;
  accessEndsDate: string;
  reactivateUrl: string;
  language?: string;
}

export const SubscriptionCancelledEmail = ({
  firstName = 'there',
  plan,
  cancelDate,
  accessEndsDate,
  reactivateUrl,
  language = 'en',
}: SubscriptionCancelledEmailProps) => {
  const translations = {
    en: {
      preview: 'Your subscription has been cancelled',
      title: 'Subscription Cancelled',
      greeting: `Hi ${firstName},`,
      confirmMessage: 'We\'ve received your cancellation request.',
      planLine: `Your <strong>${plan}</strong> subscription will be cancelled.`,
      accessMessage: `You\'ll continue to have full access until <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'After this date, your account will revert to the free tier.',
      changeOfMind: 'Changed your mind?',
      reactivateMessage: 'You can reactivate your subscription at any time before your access ends to keep all your premium features.',
      buttonText: 'Reactivate Subscription',
      helpMessage: 'If you have any questions or feedback about your experience, please don\'t hesitate to reach out to us.',
      thankYou: 'Thank you for being a LessonCraftStudio subscriber.',
    },
    de: {
      preview: 'Ihr Abonnement wurde gekündigt',
      title: 'Abonnement gekündigt',
      greeting: `Hallo ${firstName},`,
      confirmMessage: 'Wir haben Ihre Kündigungsanfrage erhalten.',
      planLine: `Ihr <strong>${plan}</strong>-Abonnement wird gekündigt.`,
      accessMessage: `Sie haben weiterhin vollen Zugriff bis zum <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Nach diesem Datum wird Ihr Konto auf die kostenlose Stufe zurückgesetzt.',
      changeOfMind: 'Haben Sie Ihre Meinung geändert?',
      reactivateMessage: 'Sie können Ihr Abonnement jederzeit vor Ablauf Ihres Zugangs reaktivieren, um alle Premium-Funktionen zu behalten.',
      buttonText: 'Abonnement reaktivieren',
      helpMessage: 'Wenn Sie Fragen oder Feedback zu Ihrer Erfahrung haben, zögern Sie bitte nicht, uns zu kontaktieren.',
      thankYou: 'Vielen Dank, dass Sie LessonCraftStudio-Abonnent waren.',
    },
    fr: {
      preview: 'Votre abonnement a été annulé',
      title: 'Abonnement annulé',
      greeting: `Bonjour ${firstName},`,
      confirmMessage: 'Nous avons reçu votre demande d\'annulation.',
      planLine: `Votre abonnement <strong>${plan}</strong> sera annulé.`,
      accessMessage: `Vous continuerez à avoir un accès complet jusqu\'au <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Après cette date, votre compte reviendra au niveau gratuit.',
      changeOfMind: 'Vous avez changé d\'avis?',
      reactivateMessage: 'Vous pouvez réactiver votre abonnement à tout moment avant la fin de votre accès pour conserver toutes vos fonctionnalités premium.',
      buttonText: 'Réactiver l\'abonnement',
      helpMessage: 'Si vous avez des questions ou des commentaires sur votre expérience, n\'hésitez pas à nous contacter.',
      thankYou: 'Merci d\'avoir été abonné à LessonCraftStudio.',
    },
    es: {
      preview: 'Tu suscripción ha sido cancelada',
      title: 'Suscripción cancelada',
      greeting: `Hola ${firstName},`,
      confirmMessage: 'Hemos recibido tu solicitud de cancelación.',
      planLine: `Tu suscripción <strong>${plan}</strong> será cancelada.`,
      accessMessage: `Seguirás teniendo acceso completo hasta el <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Después de esta fecha, tu cuenta volverá al nivel gratuito.',
      changeOfMind: '¿Cambiaste de opinión?',
      reactivateMessage: 'Puedes reactivar tu suscripción en cualquier momento antes de que termine tu acceso para mantener todas tus funciones premium.',
      buttonText: 'Reactivar suscripción',
      helpMessage: 'Si tienes alguna pregunta o comentario sobre tu experiencia, no dudes en contactarnos.',
      thankYou: 'Gracias por haber sido suscriptor de LessonCraftStudio.',
    },
    sv: {
      preview: 'Din prenumeration har avslutats',
      title: 'Prenumeration avslutad',
      greeting: `Hej ${firstName},`,
      confirmMessage: 'Vi har mottagit din begäran om avslut.',
      planLine: `Din <strong>${plan}</strong>-prenumeration kommer att avslutas.`,
      accessMessage: `Du kommer att ha full tillgång till och med <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Efter detta datum återgår ditt konto till gratisversionen.',
      changeOfMind: 'Ändrat dig?',
      reactivateMessage: 'Du kan återaktivera din prenumeration när som helst innan din tillgång upphör för att behålla alla premiumfunktioner.',
      buttonText: 'Återaktivera prenumeration',
      helpMessage: 'Om du har några frågor eller feedback om din upplevelse, tveka inte att kontakta oss.',
      thankYou: 'Tack för att du har varit prenumerant på LessonCraftStudio.',
    },
    it: {
      preview: 'Il tuo abbonamento è stato cancellato',
      title: 'Abbonamento cancellato',
      greeting: `Ciao ${firstName},`,
      confirmMessage: 'Abbiamo ricevuto la tua richiesta di cancellazione.',
      planLine: `Il tuo abbonamento <strong>${plan}</strong> sarà cancellato.`,
      accessMessage: `Continuerai ad avere accesso completo fino al <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Dopo questa data, il tuo account tornerà al livello gratuito.',
      changeOfMind: 'Hai cambiato idea?',
      reactivateMessage: 'Puoi riattivare il tuo abbonamento in qualsiasi momento prima della scadenza del tuo accesso per mantenere tutte le funzionalità premium.',
      buttonText: 'Riattiva abbonamento',
      helpMessage: 'Se hai domande o feedback sulla tua esperienza, non esitare a contattarci.',
      thankYou: 'Grazie per essere stato un abbonato di LessonCraftStudio.',
    },
    pt: {
      preview: 'Sua assinatura foi cancelada',
      title: 'Assinatura cancelada',
      greeting: `Olá ${firstName},`,
      confirmMessage: 'Recebemos seu pedido de cancelamento.',
      planLine: `Sua assinatura <strong>${plan}</strong> será cancelada.`,
      accessMessage: `Você continuará tendo acesso completo até <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Após esta data, sua conta voltará para o nível gratuito.',
      changeOfMind: 'Mudou de ideia?',
      reactivateMessage: 'Você pode reativar sua assinatura a qualquer momento antes do término do seu acesso para manter todos os recursos premium.',
      buttonText: 'Reativar assinatura',
      helpMessage: 'Se você tiver alguma dúvida ou feedback sobre sua experiência, não hesite em nos contatar.',
      thankYou: 'Obrigado por ter sido assinante do LessonCraftStudio.',
    },
    nl: {
      preview: 'Uw abonnement is geannuleerd',
      title: 'Abonnement geannuleerd',
      greeting: `Hallo ${firstName},`,
      confirmMessage: 'We hebben uw annuleringsverzoek ontvangen.',
      planLine: `Uw <strong>${plan}</strong>-abonnement wordt geannuleerd.`,
      accessMessage: `U behoudt volledige toegang tot <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Na deze datum keert uw account terug naar het gratis niveau.',
      changeOfMind: 'Van gedachten veranderd?',
      reactivateMessage: 'U kunt uw abonnement op elk moment vóór het einde van uw toegang opnieuw activeren om al uw premium functies te behouden.',
      buttonText: 'Abonnement heractiveren',
      helpMessage: 'Als u vragen of feedback heeft over uw ervaring, aarzel dan niet om contact met ons op te nemen.',
      thankYou: 'Bedankt dat u een LessonCraftStudio-abonnee bent geweest.',
    },
    da: {
      preview: 'Dit abonnement er blevet annulleret',
      title: 'Abonnement annulleret',
      greeting: `Hej ${firstName},`,
      confirmMessage: 'Vi har modtaget din annulleringsanmodning.',
      planLine: `Dit <strong>${plan}</strong>-abonnement vil blive annulleret.`,
      accessMessage: `Du vil fortsat have fuld adgang indtil <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Efter denne dato vender din konto tilbage til det gratis niveau.',
      changeOfMind: 'Har du skiftet mening?',
      reactivateMessage: 'Du kan genaktivere dit abonnement når som helst før din adgang udløber for at beholde alle dine premium-funktioner.',
      buttonText: 'Genaktiver abonnement',
      helpMessage: 'Hvis du har spørgsmål eller feedback om din oplevelse, tøv ikke med at kontakte os.',
      thankYou: 'Tak fordi du har været LessonCraftStudio-abonnent.',
    },
    no: {
      preview: 'Abonnementet ditt er kansellert',
      title: 'Abonnement kansellert',
      greeting: `Hei ${firstName},`,
      confirmMessage: 'Vi har mottatt kanselleringsforespørselen din.',
      planLine: `<strong>${plan}</strong>-abonnementet ditt vil bli kansellert.`,
      accessMessage: `Du vil fortsatt ha full tilgang til <strong>${accessEndsDate}</strong>.`,
      afterAccessMessage: 'Etter denne datoen vil kontoen din gå tilbake til gratisnivået.',
      changeOfMind: 'Ombestemt deg?',
      reactivateMessage: 'Du kan reaktivere abonnementet ditt når som helst før tilgangen din utløper for å beholde alle premium-funksjonene dine.',
      buttonText: 'Reaktiver abonnement',
      helpMessage: 'Hvis du har spørsmål eller tilbakemeldinger om opplevelsen din, ikke nøl med å kontakte oss.',
      thankYou: 'Takk for at du har vært LessonCraftStudio-abonnent.',
    },
    fi: {
      preview: 'Tilauksesi on peruutettu',
      title: 'Tilaus peruutettu',
      greeting: `Hei ${firstName},`,
      confirmMessage: 'Olemme vastaanottaneet peruutuspyyntösi.',
      planLine: `<strong>${plan}</strong>-tilauksesi peruutetaan.`,
      accessMessage: `Sinulla on edelleen täysi käyttöoikeus <strong>${accessEndsDate}</strong> asti.`,
      afterAccessMessage: 'Tämän päivämäärän jälkeen tilisi palautuu ilmaiselle tasolle.',
      changeOfMind: 'Muutitko mieltäsi?',
      reactivateMessage: 'Voit aktivoida tilauksesi uudelleen milloin tahansa ennen käyttöoikeutesi päättymistä säilyttääksesi kaikki premium-ominaisuudet.',
      buttonText: 'Aktivoi tilaus uudelleen',
      helpMessage: 'Jos sinulla on kysyttävää tai palautetta kokemuksestasi, ota rohkeasti yhteyttä.',
      thankYou: 'Kiitos, että olet ollut LessonCraftStudion tilaaja.',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>

      <Section style={cancelBox}>
        <Text style={confirmText}>{t.confirmMessage}</Text>
        <Text
          style={planText}
          dangerouslySetInnerHTML={{ __html: t.planLine }}
        />
        <Text
          style={accessText}
          dangerouslySetInnerHTML={{ __html: t.accessMessage }}
        />
        <Text style={afterAccessText}>{t.afterAccessMessage}</Text>
      </Section>

      <Section style={reactivateSection}>
        <Heading as="h3" style={changeOfMindTitle}>
          {t.changeOfMind}
        </Heading>
        <Text style={paragraph}>{t.reactivateMessage}</Text>
        <Section style={buttonContainer}>
          <Button style={button} href={reactivateUrl}>
            {t.buttonText}
          </Button>
        </Section>
      </Section>

      <Hr style={hr} />

      <Text style={helpText}>{t.helpMessage}</Text>
      <Text style={thankYouText}>{t.thankYou}</Text>
    </BaseLayout>
  );
};

export default SubscriptionCancelledEmail;

// Styles
const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0 0 20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  margin: '16px 0',
};

const cancelBox = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffc107',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
};

const confirmText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#856404',
  margin: '0 0 10px',
};

const planText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#856404',
  margin: '0 0 10px',
};

const accessText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#856404',
  margin: '0 0 10px',
  fontWeight: '500',
};

const afterAccessText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#856404',
  margin: '0',
};

const reactivateSection = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const changeOfMindTitle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '0 0 10px',
};

const buttonContainer = {
  padding: '20px 0 10px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#28a745',
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

const helpText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#6c757d',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const thankYouText = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#484848',
  textAlign: 'center' as const,
  margin: '20px 0',
};
