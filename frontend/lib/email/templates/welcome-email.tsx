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
  subscriptionTier = 'free',
  dashboardUrl,
  language = 'en',
}: WelcomeEmailProps) => {
  const planFeatures = {
    free: {
      en: ['Word Search generator only', 'Unlimited worksheet generation', 'Watermarked downloads', 'Community support'],
      de: ['Nur Wortsuchgenerator', 'Unbegrenzte Arbeitsblatterstellung', 'Downloads mit Wasserzeichen', 'Community-Support'],
      fr: ['Générateur de mots cachés uniquement', 'Génération illimitée de feuilles', 'Téléchargements avec filigrane', 'Support communautaire'],
      es: ['Solo generador de sopa de letras', 'Generación ilimitada de hojas', 'Descargas con marca de agua', 'Soporte comunitario'],
      sv: ['Endast ordsokning', 'Obegränsad generering', 'Nedladdningar med vattenstämpel', 'Community-support'],
      it: ['Solo generatore di crucipuzzle', 'Generazione illimitata', 'Download con filigrana', 'Supporto community'],
      pt: ['Apenas gerador de caça-palavras', 'Geração ilimitada', 'Downloads com marca d\'água', 'Suporte da comunidade'],
      nl: ['Alleen woordzoeker generator', 'Onbeperkt genereren', 'Downloads met watermerk', 'Community support'],
      da: ['Kun kryds og tværs generator', 'Ubegrænset generering', 'Downloads med vandmærke', 'Community support'],
      no: ['Kun ordsøk-generator', 'Ubegrenset generering', 'Nedlastinger med vannmerke', 'Fellesskapsstøtte'],
      fi: ['Vain sanaristikko-generaattori', 'Rajoittamaton luonti', 'Lataukset vesileimalla', 'Yhteisötuki'],
    },
    core: {
      en: ['10 popular worksheet generators', 'Unlimited worksheet generation', 'No watermarks', 'High-quality PDF downloads', 'POD commercial license', 'Email support'],
      de: ['10 beliebte Arbeitsblatt-Generatoren', 'Unbegrenzte Arbeitsblatterstellung', 'Keine Wasserzeichen', 'Hochwertige PDF-Downloads', 'POD-Gewerbliche Lizenz', 'E-Mail-Support'],
      fr: ['10 générateurs populaires', 'Génération illimitée', 'Sans filigrane', 'Téléchargements PDF haute qualité', 'Licence commerciale POD', 'Support par email'],
      es: ['10 generadores populares', 'Generación ilimitada', 'Sin marca de agua', 'Descargas PDF de alta calidad', 'Licencia comercial POD', 'Soporte por email'],
      sv: ['10 populära generatorer', 'Obegränsad generering', 'Inga vattenstämplar', 'Högkvalitativa PDF-nedladdningar', 'POD kommersiell licens', 'E-postsupport'],
      it: ['10 generatori popolari', 'Generazione illimitata', 'Senza filigrana', 'Download PDF alta qualità', 'Licenza commerciale POD', 'Supporto email'],
      pt: ['10 geradores populares', 'Geração ilimitada', 'Sem marca d\'água', 'Downloads PDF de alta qualidade', 'Licença comercial POD', 'Suporte por email'],
      nl: ['10 populaire generatoren', 'Onbeperkt genereren', 'Geen watermerken', 'Hoogwaardige PDF-downloads', 'POD commerciële licentie', 'E-mailondersteuning'],
      da: ['10 populære generatorer', 'Ubegrænset generering', 'Ingen vandmærker', 'Højkvalitets PDF-downloads', 'POD kommerciel licens', 'E-mail support'],
      no: ['10 populære generatorer', 'Ubegrenset generering', 'Ingen vannmerker', 'Høykvalitets PDF-nedlastinger', 'POD kommersiell lisens', 'E-poststøtte'],
      fi: ['10 suosittua generaattoria', 'Rajoittamaton luonti', 'Ei vesileimoja', 'Korkealaatuiset PDF-lataukset', 'POD kaupallinen lisenssi', 'Sähköpostituki'],
    },
    full: {
      en: ['All 33+ worksheet generators', 'Unlimited worksheet generation', 'No watermarks', 'Priority email support', 'Commercial license included', 'Early access to new apps'],
      de: ['Alle 33+ Arbeitsblatt-Generatoren', 'Unbegrenzte Arbeitsblatterstellung', 'Keine Wasserzeichen', 'Prioritäts-E-Mail-Support', 'Gewerbliche Lizenz inklusive', 'Früher Zugang zu neuen Apps'],
      fr: ['Les 33+ générateurs', 'Génération illimitée', 'Sans filigrane', 'Support email prioritaire', 'Licence commerciale incluse', 'Accès anticipé aux nouvelles apps'],
      es: ['Los 33+ generadores', 'Generación ilimitada', 'Sin marca de agua', 'Soporte email prioritario', 'Licencia comercial incluida', 'Acceso anticipado a nuevas apps'],
      sv: ['Alla 33+ generatorer', 'Obegränsad generering', 'Inga vattenstämplar', 'Prioriterad e-postsupport', 'Kommersiell licens ingår', 'Tidig tillgång till nya appar'],
      it: ['Tutti i 33+ generatori', 'Generazione illimitata', 'Senza filigrana', 'Supporto email prioritario', 'Licenza commerciale inclusa', 'Accesso anticipato alle nuove app'],
      pt: ['Todos os 33+ geradores', 'Geração ilimitada', 'Sem marca d\'água', 'Suporte email prioritário', 'Licença comercial incluída', 'Acesso antecipado a novos apps'],
      nl: ['Alle 33+ generatoren', 'Onbeperkt genereren', 'Geen watermerken', 'Prioriteits e-mailondersteuning', 'Commerciële licentie inbegrepen', 'Vroege toegang tot nieuwe apps'],
      da: ['Alle 33+ generatorer', 'Ubegrænset generering', 'Ingen vandmærker', 'Prioriteret e-mail support', 'Kommerciel licens inkluderet', 'Tidlig adgang til nye apps'],
      no: ['Alle 33+ generatorer', 'Ubegrenset generering', 'Ingen vannmerker', 'Prioritert e-poststøtte', 'Kommersiell lisens inkludert', 'Tidlig tilgang til nye apper'],
      fi: ['Kaikki 33+ generaattoria', 'Rajoittamaton luonti', 'Ei vesileimoja', 'Ensisijainen sähköpostituki', 'Kaupallinen lisenssi sisältyy', 'Varhainen pääsy uusiin sovelluksiin'],
    },
  };

  const translations = {
    en: {
      preview: 'Welcome to LessonCraftStudio!',
      title: 'Welcome to LessonCraftStudio!',
      greeting: `Hi ${firstName},`,
      body1: 'Your email has been verified and your account is now active!',
      planTitle: `Your ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan Includes:`,
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
      planTitle: `Ihr ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}-Plan umfasst:`,
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
      planTitle: `Votre plan ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} comprend:`,
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
      planTitle: `Tu plan ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} incluye:`,
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
      planTitle: `Din ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}-plan inkluderar:`,
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
      planTitle: `Il tuo piano ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} include:`,
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
      planTitle: `Seu plano ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} inclui:`,
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
      planTitle: `Uw ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}-plan omvat:`,
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
      planTitle: `Din ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}-plan inkluderer:`,
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
      planTitle: `Din ${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}-plan inkluderer:`,
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
      planTitle: `${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}-pakettisi sisältää:`,
      getStarted: 'Aloita upeiden työarkkien luominen:',
      buttonText: 'Siirry kojelaudalle',
      needHelp: 'Tarvitsetko apua?',
      helpText: 'Tutustu ohjekeskukseemme tai ota yhteyttä tukitiimiimme, jos sinulla on kysymyksiä.',
      happyTeaching: 'Onnea opettamiseen!',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;
  const features = planFeatures[subscriptionTier as keyof typeof planFeatures]?.[language as keyof typeof planFeatures.free] || planFeatures.free.en;

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
  backgroundColor: '#d4edda',
  border: '1px solid #28a745',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
};

const planHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#155724',
  margin: '0 0 15px',
};

const featureList = {
  margin: '0',
  padding: '0 0 0 20px',
  color: '#155724',
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

const signoff = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#484848',
  margin: '20px 0 0',
};
