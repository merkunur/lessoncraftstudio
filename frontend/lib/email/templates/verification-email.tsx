/**
 * Email Verification Template
 * Professional template with multi-language support
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

interface VerificationEmailProps {
  firstName: string;
  verificationUrl: string;
  language?: string;
}

export const VerificationEmail = ({
  firstName = 'there',
  verificationUrl,
  language = 'en',
}: VerificationEmailProps) => {
  const translations = {
    en: {
      preview: 'Verify your email address',
      title: 'Welcome to LessonCraftStudio!',
      greeting: `Hi ${firstName},`,
      body1: 'Thanks for signing up! Please verify your email address by clicking the button below:',
      buttonText: 'Verify Email',
      body2: 'Or copy and paste this link into your browser:',
      expiry: 'This link will expire in 24 hours.',
      noAction: "If you didn't create an account with LessonCraftStudio, you can safely ignore this email.",
    },
    de: {
      preview: 'Bestätigen Sie Ihre E-Mail-Adresse',
      title: 'Willkommen bei LessonCraftStudio!',
      greeting: `Hallo ${firstName},`,
      body1: 'Vielen Dank für Ihre Anmeldung! Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf die Schaltfläche unten klicken:',
      buttonText: 'E-Mail bestätigen',
      body2: 'Oder kopieren Sie diesen Link und fügen Sie ihn in Ihren Browser ein:',
      expiry: 'Dieser Link läuft in 24 Stunden ab.',
      noAction: 'Wenn Sie kein Konto bei LessonCraftStudio erstellt haben, können Sie diese E-Mail ignorieren.',
    },
    fr: {
      preview: 'Vérifiez votre adresse email',
      title: 'Bienvenue chez LessonCraftStudio!',
      greeting: `Bonjour ${firstName},`,
      body1: 'Merci de vous être inscrit! Veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous:',
      buttonText: 'Vérifier l\'email',
      body2: 'Ou copiez et collez ce lien dans votre navigateur:',
      expiry: 'Ce lien expirera dans 24 heures.',
      noAction: 'Si vous n\'avez pas créé de compte chez LessonCraftStudio, vous pouvez ignorer cet email.',
    },
    es: {
      preview: 'Verifica tu dirección de correo',
      title: '¡Bienvenido a LessonCraftStudio!',
      greeting: `Hola ${firstName},`,
      body1: '¡Gracias por registrarte! Por favor verifica tu dirección de correo haciendo clic en el botón de abajo:',
      buttonText: 'Verificar correo',
      body2: 'O copia y pega este enlace en tu navegador:',
      expiry: 'Este enlace expirará en 24 horas.',
      noAction: 'Si no creaste una cuenta en LessonCraftStudio, puedes ignorar este correo.',
    },
    sv: {
      preview: 'Verifiera din e-postadress',
      title: 'Välkommen till LessonCraftStudio!',
      greeting: `Hej ${firstName},`,
      body1: 'Tack för att du registrerade dig! Verifiera din e-postadress genom att klicka på knappen nedan:',
      buttonText: 'Verifiera e-post',
      body2: 'Eller kopiera och klistra in denna länk i din webbläsare:',
      expiry: 'Denna länk upphör att gälla om 24 timmar.',
      noAction: 'Om du inte skapade ett konto hos LessonCraftStudio kan du ignorera detta e-postmeddelande.',
    },
    it: {
      preview: 'Verifica il tuo indirizzo email',
      title: 'Benvenuto su LessonCraftStudio!',
      greeting: `Ciao ${firstName},`,
      body1: 'Grazie per esserti iscritto! Verifica il tuo indirizzo email cliccando sul pulsante qui sotto:',
      buttonText: 'Verifica email',
      body2: 'Oppure copia e incolla questo link nel tuo browser:',
      expiry: 'Questo link scadrà tra 24 ore.',
      noAction: 'Se non hai creato un account con LessonCraftStudio, puoi ignorare questa email.',
    },
    pt: {
      preview: 'Verifique seu endereço de e-mail',
      title: 'Bem-vindo ao LessonCraftStudio!',
      greeting: `Olá ${firstName},`,
      body1: 'Obrigado por se inscrever! Por favor, verifique seu endereço de e-mail clicando no botão abaixo:',
      buttonText: 'Verificar e-mail',
      body2: 'Ou copie e cole este link no seu navegador:',
      expiry: 'Este link expirará em 24 horas.',
      noAction: 'Se você não criou uma conta no LessonCraftStudio, pode ignorar este e-mail.',
    },
    nl: {
      preview: 'Verifieer uw e-mailadres',
      title: 'Welkom bij LessonCraftStudio!',
      greeting: `Hallo ${firstName},`,
      body1: 'Bedankt voor het aanmelden! Verifieer uw e-mailadres door op de knop hieronder te klikken:',
      buttonText: 'E-mail verifiëren',
      body2: 'Of kopieer en plak deze link in uw browser:',
      expiry: 'Deze link verloopt over 24 uur.',
      noAction: 'Als u geen account heeft aangemaakt bij LessonCraftStudio, kunt u deze e-mail negeren.',
    },
    da: {
      preview: 'Bekræft din e-mailadresse',
      title: 'Velkommen til LessonCraftStudio!',
      greeting: `Hej ${firstName},`,
      body1: 'Tak for din tilmelding! Bekræft venligst din e-mailadresse ved at klikke på knappen nedenfor:',
      buttonText: 'Bekræft e-mail',
      body2: 'Eller kopier og indsæt dette link i din browser:',
      expiry: 'Dette link udløber om 24 timer.',
      noAction: 'Hvis du ikke oprettede en konto hos LessonCraftStudio, kan du ignorere denne e-mail.',
    },
    no: {
      preview: 'Bekreft e-postadressen din',
      title: 'Velkommen til LessonCraftStudio!',
      greeting: `Hei ${firstName},`,
      body1: 'Takk for at du registrerte deg! Vennligst bekreft e-postadressen din ved å klikke på knappen nedenfor:',
      buttonText: 'Bekreft e-post',
      body2: 'Eller kopier og lim inn denne lenken i nettleseren din:',
      expiry: 'Denne lenken utløper om 24 timer.',
      noAction: 'Hvis du ikke opprettet en konto hos LessonCraftStudio, kan du ignorere denne e-posten.',
    },
    fi: {
      preview: 'Vahvista sähköpostiosoitteesi',
      title: 'Tervetuloa LessonCraftStudioon!',
      greeting: `Hei ${firstName},`,
      body1: 'Kiitos rekisteröitymisestä! Vahvista sähköpostiosoitteesi napsauttamalla alla olevaa painiketta:',
      buttonText: 'Vahvista sähköposti',
      body2: 'Tai kopioi ja liitä tämä linkki selaimeesi:',
      expiry: 'Tämä linkki vanhenee 24 tunnin kuluttua.',
      noAction: 'Jos et luonut tiliä LessonCraftStudioon, voit jättää tämän sähköpostin huomiotta.',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>
      <Text style={paragraph}>{t.body1}</Text>

      <Section style={buttonContainer}>
        <Button style={button} href={verificationUrl}>
          {t.buttonText}
        </Button>
      </Section>

      <Text style={paragraph}>{t.body2}</Text>
      <Text style={link}>{verificationUrl}</Text>

      <Hr style={hr} />

      <Text style={footerNote}>{t.expiry}</Text>
      <Text style={footerNote}>{t.noAction}</Text>
    </BaseLayout>
  );
};

export default VerificationEmail;

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

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#007bff',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const link = {
  color: '#007bff',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
  margin: '16px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const footerNote = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};
