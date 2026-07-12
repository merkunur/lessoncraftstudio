/**
 * Welcome Email Template
 * Sent after successful email verification
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

interface WelcomeEmailProps {
  firstName: string;
  subscriptionTier: string;
  dashboardUrl: string;
  language?: string;
}

export const WelcomeEmail = ({
  firstName = 'there',
  dashboardUrl,
  language = 'en',
}: WelcomeEmailProps) => {
  // What a free account gets on the current platform (post-pivot: free for
  // everyone, K-3 multilingual worksheets). Tier-neutral — no seller-era
  // "Word Search Pro / watermarks / POD license" claims.
  const featuresByLang: Record<string, string[]> = {
    en: ['Thousands of interactive worksheets and printable PDFs', 'For young learners ages 3–8, in 11 languages', 'Play online or download and print', 'Free worksheet makers to build your own'],
    de: ['Tausende interaktive Arbeitsblätter und druckbare PDFs', 'Für Kinder von 3 bis 8 Jahren, in 11 Sprachen', 'Online spielen oder herunterladen und ausdrucken', 'Kostenlose Generatoren, um eigene zu erstellen'],
    fr: ['Des milliers de fiches interactives et de PDF imprimables', 'Pour les enfants de 3 à 8 ans, en 11 langues', 'À jouer en ligne ou à télécharger et imprimer', 'Des générateurs gratuits pour créer les vôtres'],
    es: ['Miles de fichas interactivas y PDF imprimibles', 'Para niños de 3 a 8 años, en 11 idiomas', 'Juega en línea o descarga e imprime', 'Generadores gratuitos para crear las tuyas'],
    sv: ['Tusentals interaktiva arbetsblad och utskrivbara PDF-filer', 'För barn 3–8 år, på 11 språk', 'Spela online eller ladda ner och skriv ut', 'Gratis verktyg för att skapa egna'],
    it: ['Migliaia di schede interattive e PDF stampabili', 'Per bambini dai 3 agli 8 anni, in 11 lingue', 'Gioca online oppure scarica e stampa', 'Generatori gratuiti per crearne di tue'],
    pt: ['Milhares de fichas interativas e PDFs para imprimir', 'Para crianças de 3 a 8 anos, em 11 idiomas', 'Jogue online ou baixe e imprima', 'Geradores gratuitos para criar as suas'],
    nl: ['Duizenden interactieve werkbladen en printbare PDF\'s', 'Voor kinderen van 3 tot 8 jaar, in 11 talen', 'Speel online of download en print', 'Gratis generatoren om je eigen te maken'],
    da: ['Tusindvis af interaktive opgaveark og PDF\'er til print', 'Til børn i alderen 3–8 år, på 11 sprog', 'Spil online eller download og print', 'Gratis værktøjer til at lave dine egne'],
    no: ['Tusenvis av interaktive arbeidsark og utskrivbare PDF-er', 'For barn i alderen 3–8 år, på 11 språk', 'Spill online eller last ned og skriv ut', 'Gratis verktøy for å lage dine egne'],
    fi: ['Tuhansia interaktiivisia tehtäviä ja tulostettavia PDF-tiedostoja', 'Lapsille 3–8-vuotiaille, 11 kielellä', 'Pelaa verkossa tai lataa ja tulosta', 'Ilmaiset työkalut omien tekemiseen'],
  };

  const translations = {
    en: {
      preview: 'Welcome to LessonCraftStudio!',
      title: 'Welcome to LessonCraftStudio!',
      greeting: `Hi ${firstName},`,
      body1: 'Your email has been verified and your account is now active!',
      planTitle: 'What you can do:',
      getStarted: 'Get started creating amazing worksheets:',
      buttonText: 'Go to Dashboard',
      needHelp: 'Need Help?',
      helpText: 'Check out our help center or contact our support team if you have any questions.',
      happyTeaching: 'Happy teaching!',
    },
    de: {
      preview: 'Willkommen bei LessonCraftStudio!',
      title: 'Willkommen bei LessonCraftStudio!',
      greeting: `Hallo ${firstName},`,
      body1: 'Ihre E-Mail wurde bestätigt und Ihr Konto ist jetzt aktiv!',
      planTitle: 'Das können Sie tun:',
      getStarted: 'Beginnen Sie mit der Erstellung großartiger Arbeitsblätter:',
      buttonText: 'Zum Dashboard',
      needHelp: 'Benötigen Sie Hilfe?',
      helpText: 'Besuchen Sie unser Hilfezentrum oder kontaktieren Sie unser Support-Team, wenn Sie Fragen haben.',
      happyTeaching: 'Viel Erfolg beim Unterrichten!',
    },
    fr: {
      preview: 'Bienvenue chez LessonCraftStudio!',
      title: 'Bienvenue chez LessonCraftStudio!',
      greeting: `Bonjour ${firstName},`,
      body1: 'Votre email a été vérifié et votre compte est maintenant actif!',
      planTitle: 'Ce que vous pouvez faire :',
      getStarted: 'Commencez à créer des feuilles de travail incroyables:',
      buttonText: 'Aller au tableau de bord',
      needHelp: 'Besoin d\'aide?',
      helpText: 'Consultez notre centre d\'aide ou contactez notre équipe de support si vous avez des questions.',
      happyTeaching: 'Bon enseignement!',
    },
    es: {
      preview: '¡Bienvenido a LessonCraftStudio!',
      title: '¡Bienvenido a LessonCraftStudio!',
      greeting: `Hola ${firstName},`,
      body1: '¡Tu correo ha sido verificado y tu cuenta ahora está activa!',
      planTitle: 'Lo que puedes hacer:',
      getStarted: 'Comienza a crear hojas de trabajo increíbles:',
      buttonText: 'Ir al panel',
      needHelp: '¿Necesitas ayuda?',
      helpText: 'Consulta nuestro centro de ayuda o contacta a nuestro equipo de soporte si tienes preguntas.',
      happyTeaching: '¡Feliz enseñanza!',
    },
    sv: {
      preview: 'Välkommen till LessonCraftStudio!',
      title: 'Välkommen till LessonCraftStudio!',
      greeting: `Hej ${firstName},`,
      body1: 'Din e-post har verifierats och ditt konto är nu aktivt!',
      planTitle: 'Vad du kan göra:',
      getStarted: 'Börja skapa fantastiska arbetsblad:',
      buttonText: 'Gå till instrumentpanelen',
      needHelp: 'Behöver du hjälp?',
      helpText: 'Kolla in vårt hjälpcenter eller kontakta vårt supportteam om du har några frågor.',
      happyTeaching: 'Lycka till med undervisningen!',
    },
    it: {
      preview: 'Benvenuto su LessonCraftStudio!',
      title: 'Benvenuto su LessonCraftStudio!',
      greeting: `Ciao ${firstName},`,
      body1: 'La tua email è stata verificata e il tuo account è ora attivo!',
      planTitle: 'Cosa puoi fare:',
      getStarted: 'Inizia a creare fogli di lavoro fantastici:',
      buttonText: 'Vai alla dashboard',
      needHelp: 'Hai bisogno di aiuto?',
      helpText: 'Consulta il nostro centro assistenza o contatta il nostro team di supporto se hai domande.',
      happyTeaching: 'Buon insegnamento!',
    },
    pt: {
      preview: 'Bem-vindo ao LessonCraftStudio!',
      title: 'Bem-vindo ao LessonCraftStudio!',
      greeting: `Olá ${firstName},`,
      body1: 'Seu e-mail foi verificado e sua conta agora está ativa!',
      planTitle: 'O que você pode fazer:',
      getStarted: 'Comece a criar planilhas incríveis:',
      buttonText: 'Ir para o painel',
      needHelp: 'Precisa de ajuda?',
      helpText: 'Confira nosso centro de ajuda ou entre em contato com nossa equipe de suporte se tiver dúvidas.',
      happyTeaching: 'Boa aula!',
    },
    nl: {
      preview: 'Welkom bij LessonCraftStudio!',
      title: 'Welkom bij LessonCraftStudio!',
      greeting: `Hallo ${firstName},`,
      body1: 'Uw e-mail is geverifieerd en uw account is nu actief!',
      planTitle: 'Wat u kunt doen:',
      getStarted: 'Begin met het maken van geweldige werkbladen:',
      buttonText: 'Ga naar dashboard',
      needHelp: 'Hulp nodig?',
      helpText: 'Bekijk ons helpcentrum of neem contact op met ons supportteam als u vragen heeft.',
      happyTeaching: 'Veel plezier met lesgeven!',
    },
    da: {
      preview: 'Velkommen til LessonCraftStudio!',
      title: 'Velkommen til LessonCraftStudio!',
      greeting: `Hej ${firstName},`,
      body1: 'Din e-mail er blevet bekræftet, og din konto er nu aktiv!',
      planTitle: 'Det kan du gøre:',
      getStarted: 'Kom i gang med at oprette fantastiske arbejdsark:',
      buttonText: 'Gå til dashboard',
      needHelp: 'Brug for hjælp?',
      helpText: 'Tjek vores hjælpecenter eller kontakt vores supportteam, hvis du har spørgsmål.',
      happyTeaching: 'God undervisning!',
    },
    no: {
      preview: 'Velkommen til LessonCraftStudio!',
      title: 'Velkommen til LessonCraftStudio!',
      greeting: `Hei ${firstName},`,
      body1: 'E-posten din har blitt bekreftet og kontoen din er nå aktiv!',
      planTitle: 'Dette kan du gjøre:',
      getStarted: 'Kom i gang med å lage fantastiske arbeidsark:',
      buttonText: 'Gå til instrumentpanelet',
      needHelp: 'Trenger du hjelp?',
      helpText: 'Sjekk ut vårt hjelpesenter eller kontakt vårt supportteam hvis du har spørsmål.',
      happyTeaching: 'Lykke til med undervisningen!',
    },
    fi: {
      preview: 'Tervetuloa LessonCraftStudioon!',
      title: 'Tervetuloa LessonCraftStudioon!',
      greeting: `Hei ${firstName},`,
      body1: 'Sähköpostisi on vahvistettu ja tilisi on nyt aktiivinen!',
      planTitle: 'Mitä voit tehdä:',
      getStarted: 'Aloita upeiden työarkkien luominen:',
      buttonText: 'Siirry kojelaudalle',
      needHelp: 'Tarvitsetko apua?',
      helpText: 'Tutustu ohjekeskukseemme tai ota yhteyttä tukitiimiimme, jos sinulla on kysymyksiä.',
      happyTeaching: 'Onnea opettamiseen!',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;
  const features = featuresByLang[language] || featuresByLang.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>
      <Text style={paragraph}>{t.body1}</Text>

      <Section style={planBox}>
        <Heading as="h2" style={planHeading}>
          {t.planTitle}
        </Heading>
        <ul style={featureList}>
          {features.map((feature, index) => (
            <li key={index} style={featureItem}>
              ✓ {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Text style={paragraph}>{t.getStarted}</Text>

      <Section style={buttonContainer}>
        <Button style={button} href={dashboardUrl}>
          {t.buttonText}
        </Button>
      </Section>

      <Hr style={hr} />

      <Heading as="h3" style={subheading}>
        {t.needHelp}
      </Heading>
      <Text style={paragraph}>{t.helpText}</Text>
      <Text style={signoff}>{t.happyTeaching}</Text>
    </BaseLayout>
  );
};

export default WelcomeEmail;

// Styles
const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1a1a1a',
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

const planBox = {
  backgroundColor: '#E8F3F1',
  border: '1px solid #146B5E',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
};

const planHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#146B5E',
  margin: '0 0 15px',
};

const featureList = {
  margin: '0',
  padding: '0 0 0 20px',
  color: '#146B5E',
};

const featureItem = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '8px 0',
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

const signoff = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#484848',
  margin: '20px 0 0',
};
