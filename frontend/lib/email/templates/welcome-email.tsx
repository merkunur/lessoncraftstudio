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
      en: ['5 worksheet generators', 'Multi-language support (11 languages)', 'Professional PDF and image exports', 'Dynamic image library'],
      de: ['5 Arbeitsblatt-Generatoren', 'Multi-Sprach-Unterstützung (11 Sprachen)', 'Professionelle PDF- und Bild-Exporte', 'Dynamische Bildbibliothek'],
      fr: ['5 générateurs de feuilles de travail', 'Support multilingue (11 langues)', 'Exportations PDF et image professionnelles', 'Bibliothèque d\'images dynamique'],
      es: ['5 generadores de hojas de trabajo', 'Soporte multiidioma (11 idiomas)', 'Exportaciones profesionales en PDF e imagen', 'Biblioteca de imágenes dinámica'],
      sv: ['5 arbetsblads-generatorer', 'Flerspråksstöd (11 språk)', 'Professionella PDF- och bildexporter', 'Dynamiskt bildbibliotek'],
      it: ['5 generatori di fogli di lavoro', 'Supporto multilingue (11 lingue)', 'Esportazioni professionali PDF e immagini', 'Libreria di immagini dinamica'],
      pt: ['5 geradores de planilhas', 'Suporte multilíngue (11 idiomas)', 'Exportações profissionais em PDF e imagem', 'Biblioteca de imagens dinâmica'],
      nl: ['5 werkbladgeneratoren', 'Meertalige ondersteuning (11 talen)', 'Professionele PDF- en afbeeldingsexports', 'Dynamische afbeeldingsbibliotheek'],
      da: ['5 arbejdsarksgeneratorer', 'Flersproget support (11 sprog)', 'Professionelle PDF- og billedeksporter', 'Dynamisk billedbibliotek'],
      no: ['5 arbeidsbladgeneratorer', 'Flerspråklig støtte (11 språk)', 'Profesjonelle PDF- og bildeeksporter', 'Dynamisk bildebibliotek'],
      fi: ['5 työarkkien luojaa', 'Monikielinen tuki (11 kieltä)', 'Ammattimaiset PDF- ja kuvavienti', 'Dynaaminen kuvakirjasto'],
    },
    core: {
      en: ['15 worksheet generators', 'Multi-language support (11 languages)', 'Professional PDF and image exports', 'Dynamic image library', 'Priority support'],
      de: ['15 Arbeitsblatt-Generatoren', 'Multi-Sprach-Unterstützung (11 Sprachen)', 'Professionelle PDF- und Bild-Exporte', 'Dynamische Bildbibliothek', 'Prioritäts-Support'],
      fr: ['15 générateurs de feuilles de travail', 'Support multilingue (11 langues)', 'Exportations PDF et image professionnelles', 'Bibliothèque d\'images dynamique', 'Support prioritaire'],
      es: ['15 generadores de hojas de trabajo', 'Soporte multiidioma (11 idiomas)', 'Exportaciones profesionales en PDF e imagen', 'Biblioteca de imágenes dinámica', 'Soporte prioritario'],
      sv: ['15 arbetsblads-generatorer', 'Flerspråksstöd (11 språk)', 'Professionella PDF- och bildexporter', 'Dynamiskt bildbibliotek', 'Prioriterad support'],
      it: ['15 generatori di fogli di lavoro', 'Supporto multilingue (11 lingue)', 'Esportazioni professionali PDF e immagini', 'Libreria di immagini dinamica', 'Supporto prioritario'],
      pt: ['15 geradores de planilhas', 'Suporte multilíngue (11 idiomas)', 'Exportações profissionais em PDF e imagem', 'Biblioteca de imagens dinâmica', 'Suporte prioritário'],
      nl: ['15 werkbladgeneratoren', 'Meertalige ondersteuning (11 talen)', 'Professionele PDF- en afbeeldingsexports', 'Dynamische afbeeldingsbibliotheek', 'Priority ondersteuning'],
      da: ['15 arbejdsarksgeneratorer', 'Flersproget support (11 sprog)', 'Professionelle PDF- og billedeksporter', 'Dynamisk billedbibliotek', 'Prioriteret support'],
      no: ['15 arbeidsbladgeneratorer', 'Flerspråklig støtte (11 språk)', 'Profesjonelle PDF- og bildeeksporter', 'Dynamisk bildebibliotek', 'Prioritert støtte'],
      fi: ['15 työarkkien luojaa', 'Monikielinen tuki (11 kieltä)', 'Ammattimaiset PDF- ja kuvavienti', 'Dynaaminen kuvakirjasto', 'Priority-tuki'],
    },
    full: {
      en: ['All 33 worksheet generators', 'Multi-language support (11 languages)', 'Professional PDF and image exports', 'Dynamic image library', 'Priority support', 'Advanced customization options'],
      de: ['Alle 33 Arbeitsblatt-Generatoren', 'Multi-Sprach-Unterstützung (11 Sprachen)', 'Professionelle PDF- und Bild-Exporte', 'Dynamische Bildbibliothek', 'Prioritäts-Support', 'Erweiterte Anpassungsoptionen'],
      fr: ['Les 33 générateurs de feuilles de travail', 'Support multilingue (11 langues)', 'Exportations PDF et image professionnelles', 'Bibliothèque d\'images dynamique', 'Support prioritaire', 'Options de personnalisation avancées'],
      es: ['Los 33 generadores de hojas de trabajo', 'Soporte multiidioma (11 idiomas)', 'Exportaciones profesionales en PDF e imagen', 'Biblioteca de imágenes dinámica', 'Soporte prioritario', 'Opciones de personalización avanzadas'],
      sv: ['Alla 33 arbetsblads-generatorer', 'Flerspråksstöd (11 språk)', 'Professionella PDF- och bildexporter', 'Dynamiskt bildbibliotek', 'Prioriterad support', 'Avancerade anpassningsalternativ'],
      it: ['Tutti i 33 generatori di fogli di lavoro', 'Supporto multilingue (11 lingue)', 'Esportazioni professionali PDF e immagini', 'Libreria di immagini dinamica', 'Supporto prioritario', 'Opzioni di personalizzazione avanzate'],
      pt: ['Todos os 33 geradores de planilhas', 'Suporte multilíngue (11 idiomas)', 'Exportações profissionais em PDF e imagem', 'Biblioteca de imagens dinâmica', 'Suporte prioritário', 'Opções avançadas de personalização'],
      nl: ['Alle 33 werkbladgeneratoren', 'Meertalige ondersteuning (11 talen)', 'Professionele PDF- en afbeeldingsexports', 'Dynamische afbeeldingsbibliotheek', 'Priority ondersteuning', 'Geavanceerde aanpassingsopties'],
      da: ['Alle 33 arbejdsarksgeneratorer', 'Flersproget support (11 sprog)', 'Professionelle PDF- og billedeksporter', 'Dynamisk billedbibliotek', 'Prioriteret support', 'Avancerede tilpasningsmuligheder'],
      no: ['Alle 33 arbeidsbladgeneratorer', 'Flerspråklig støtte (11 språk)', 'Profesjonelle PDF- og bildeeksporter', 'Dynamisk bildebibliotek', 'Prioritert støtte', 'Avanserte tilpasningsmuligheter'],
      fi: ['Kaikki 33 työarkkien luojaa', 'Monikielinen tuki (11 kieltä)', 'Ammattimaiset PDF- ja kuvavienti', 'Dynaaminen kuvakirjasto', 'Priority-tuki', 'Edistyneet mukautusvaihtoehdot'],
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
