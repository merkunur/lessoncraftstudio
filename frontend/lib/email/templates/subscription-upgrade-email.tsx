/**
 * Subscription Upgrade Email Template
 * Sent when user upgrades their subscription
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

interface SubscriptionUpgradeEmailProps {
  firstName: string;
  oldPlan: string;
  newPlan: string;
  dashboardUrl: string;
  language?: string;
}

export const SubscriptionUpgradeEmail = ({
  firstName = 'there',
  oldPlan,
  newPlan,
  dashboardUrl,
  language = 'en',
}: SubscriptionUpgradeEmailProps) => {
  const translations = {
    en: {
      preview: 'Your subscription has been upgraded',
      title: 'Subscription Upgraded!',
      greeting: `Hi ${firstName},`,
      congratulations: '🎉 Congratulations!',
      upgradeMessage: `Your subscription has been upgraded from <strong>${oldPlan}</strong> to <strong>${newPlan}</strong>.`,
      body1: 'You now have access to more amazing features. Start exploring your new capabilities:',
      buttonText: 'Go to Dashboard',
      thankYou: 'Thank you for choosing LessonCraftStudio!',
    },
    de: {
      preview: 'Ihr Abonnement wurde aktualisiert',
      title: 'Abonnement aktualisiert!',
      greeting: `Hallo ${firstName},`,
      congratulations: '🎉 Herzlichen Glückwunsch!',
      upgradeMessage: `Ihr Abonnement wurde von <strong>${oldPlan}</strong> auf <strong>${newPlan}</strong> aktualisiert.`,
      body1: 'Sie haben jetzt Zugriff auf weitere großartige Funktionen. Erkunden Sie Ihre neuen Möglichkeiten:',
      buttonText: 'Zum Dashboard',
      thankYou: 'Vielen Dank, dass Sie sich für LessonCraftStudio entschieden haben!',
    },
    fr: {
      preview: 'Votre abonnement a été mis à niveau',
      title: 'Abonnement mis à niveau!',
      greeting: `Bonjour ${firstName},`,
      congratulations: '🎉 Félicitations!',
      upgradeMessage: `Votre abonnement a été mis à niveau de <strong>${oldPlan}</strong> à <strong>${newPlan}</strong>.`,
      body1: 'Vous avez maintenant accès à plus de fonctionnalités incroyables. Commencez à explorer vos nouvelles capacités:',
      buttonText: 'Aller au tableau de bord',
      thankYou: 'Merci d\'avoir choisi LessonCraftStudio!',
    },
    es: {
      preview: 'Tu suscripción ha sido actualizada',
      title: '¡Suscripción actualizada!',
      greeting: `Hola ${firstName},`,
      congratulations: '🎉 ¡Felicitaciones!',
      upgradeMessage: `Tu suscripción ha sido actualizada de <strong>${oldPlan}</strong> a <strong>${newPlan}</strong>.`,
      body1: 'Ahora tienes acceso a más funciones increíbles. Comienza a explorar tus nuevas capacidades:',
      buttonText: 'Ir al panel',
      thankYou: '¡Gracias por elegir LessonCraftStudio!',
    },
    sv: {
      preview: 'Din prenumeration har uppgraderats',
      title: 'Prenumeration uppgraderad!',
      greeting: `Hej ${firstName},`,
      congratulations: '🎉 Grattis!',
      upgradeMessage: `Din prenumeration har uppgraderats från <strong>${oldPlan}</strong> till <strong>${newPlan}</strong>.`,
      body1: 'Du har nu tillgång till fler fantastiska funktioner. Börja utforska dina nya möjligheter:',
      buttonText: 'Gå till instrumentpanelen',
      thankYou: 'Tack för att du valde LessonCraftStudio!',
    },
    it: {
      preview: 'Il tuo abbonamento è stato aggiornato',
      title: 'Abbonamento aggiornato!',
      greeting: `Ciao ${firstName},`,
      congratulations: '🎉 Congratulazioni!',
      upgradeMessage: `Il tuo abbonamento è stato aggiornato da <strong>${oldPlan}</strong> a <strong>${newPlan}</strong>.`,
      body1: 'Ora hai accesso a più funzionalità fantastiche. Inizia a esplorare le tue nuove capacità:',
      buttonText: 'Vai alla dashboard',
      thankYou: 'Grazie per aver scelto LessonCraftStudio!',
    },
    pt: {
      preview: 'Sua assinatura foi atualizada',
      title: 'Assinatura atualizada!',
      greeting: `Olá ${firstName},`,
      congratulations: '🎉 Parabéns!',
      upgradeMessage: `Sua assinatura foi atualizada de <strong>${oldPlan}</strong> para <strong>${newPlan}</strong>.`,
      body1: 'Agora você tem acesso a mais recursos incríveis. Comece a explorar suas novas capacidades:',
      buttonText: 'Ir para o painel',
      thankYou: 'Obrigado por escolher LessonCraftStudio!',
    },
    nl: {
      preview: 'Uw abonnement is bijgewerkt',
      title: 'Abonnement bijgewerkt!',
      greeting: `Hallo ${firstName},`,
      congratulations: '🎉 Gefeliciteerd!',
      upgradeMessage: `Uw abonnement is bijgewerkt van <strong>${oldPlan}</strong> naar <strong>${newPlan}</strong>.`,
      body1: 'U heeft nu toegang tot meer geweldige functies. Begin met het verkennen van uw nieuwe mogelijkheden:',
      buttonText: 'Ga naar dashboard',
      thankYou: 'Bedankt voor het kiezen van LessonCraftStudio!',
    },
    da: {
      preview: 'Dit abonnement er blevet opgraderet',
      title: 'Abonnement opgraderet!',
      greeting: `Hej ${firstName},`,
      congratulations: '🎉 Tillykke!',
      upgradeMessage: `Dit abonnement er blevet opgraderet fra <strong>${oldPlan}</strong> til <strong>${newPlan}</strong>.`,
      body1: 'Du har nu adgang til flere fantastiske funktioner. Begynd at udforske dine nye muligheder:',
      buttonText: 'Gå til dashboard',
      thankYou: 'Tak fordi du valgte LessonCraftStudio!',
    },
    no: {
      preview: 'Abonnementet ditt har blitt oppgradert',
      title: 'Abonnement oppgradert!',
      greeting: `Hei ${firstName},`,
      congratulations: '🎉 Gratulerer!',
      upgradeMessage: `Abonnementet ditt har blitt oppgradert fra <strong>${oldPlan}</strong> til <strong>${newPlan}</strong>.`,
      body1: 'Du har nå tilgang til flere fantastiske funksjoner. Begynn å utforske dine nye muligheter:',
      buttonText: 'Gå til instrumentpanelet',
      thankYou: 'Takk for at du valgte LessonCraftStudio!',
    },
    fi: {
      preview: 'Tilauksesi on päivitetty',
      title: 'Tilaus päivitetty!',
      greeting: `Hei ${firstName},`,
      congratulations: '🎉 Onnittelut!',
      upgradeMessage: `Tilauksesi on päivitetty <strong>${oldPlan}</strong>-paketista <strong>${newPlan}</strong>-pakettiin.`,
      body1: 'Sinulla on nyt pääsy useampiin upeisiin ominaisuuksiin. Aloita uusien mahdollisuuksiesi tutkiminen:',
      buttonText: 'Siirry kojelaudalle',
      thankYou: 'Kiitos, että valitsit LessonCraftStudion!',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>

      <Section style={upgradeBox}>
        <Heading as="h3" style={upgradeTitle}>
          {t.congratulations}
        </Heading>
        <Text
          style={upgradeMessage}
          dangerouslySetInnerHTML={{ __html: t.upgradeMessage }}
        />
      </Section>

      <Text style={paragraph}>{t.body1}</Text>

      <Section style={buttonContainer}>
        <Button style={button} href={dashboardUrl}>
          {t.buttonText}
        </Button>
      </Section>

      <Hr style={hr} />

      <Text style={thankYouText}>{t.thankYou}</Text>
    </BaseLayout>
  );
};

export default SubscriptionUpgradeEmail;

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

const upgradeBox = {
  backgroundColor: '#d4edda',
  border: '1px solid #28a745',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
};

const upgradeTitle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#155724',
  margin: '0 0 10px',
};

const upgradeMessage = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#155724',
  margin: '0',
};

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#146B5E',
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

const thankYouText = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#484848',
  textAlign: 'center' as const,
  margin: '20px 0',
};
