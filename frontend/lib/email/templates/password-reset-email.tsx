/**
 * Password Reset Email Template
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

interface PasswordResetEmailProps {
  firstName: string;
  resetUrl: string;
  language?: string;
}

export const PasswordResetEmail = ({
  firstName = 'there',
  resetUrl,
  language = 'en',
}: PasswordResetEmailProps) => {
  const translations = {
    en: {
      preview: 'Reset your password',
      title: 'Password Reset Request',
      greeting: `Hi ${firstName},`,
      body1: 'We received a request to reset your password. Click the button below to create a new password:',
      buttonText: 'Reset Password',
      body2: 'Or copy and paste this link into your browser:',
      expiry: 'This link will expire in 1 hour for security reasons.',
      noAction: "If you didn't request this password reset, you can safely ignore this email. Your password won't be changed.",
      warning: 'Important',
    },
    de: {
      preview: 'Setzen Sie Ihr Passwort zurück',
      title: 'Anfrage zum Zurücksetzen des Passworts',
      greeting: `Hallo ${firstName},`,
      body1: 'Wir haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten. Klicken Sie auf die Schaltfläche unten, um ein neues Passwort zu erstellen:',
      buttonText: 'Passwort zurücksetzen',
      body2: 'Oder kopieren Sie diesen Link und fügen Sie ihn in Ihren Browser ein:',
      expiry: 'Dieser Link läuft aus Sicherheitsgründen in 1 Stunde ab.',
      noAction: 'Wenn Sie diese Passwortzurücksetzung nicht angefordert haben, können Sie diese E-Mail ignorieren. Ihr Passwort wird nicht geändert.',
      warning: 'Wichtig',
    },
    fr: {
      preview: 'Réinitialisez votre mot de passe',
      title: 'Demande de réinitialisation du mot de passe',
      greeting: `Bonjour ${firstName},`,
      body1: 'Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe:',
      buttonText: 'Réinitialiser le mot de passe',
      body2: 'Ou copiez et collez ce lien dans votre navigateur:',
      expiry: 'Ce lien expirera dans 1 heure pour des raisons de sécurité.',
      noAction: "Si vous n'avez pas demandé cette réinitialisation de mot de passe, vous pouvez ignorer cet email. Votre mot de passe ne sera pas modifié.",
      warning: 'Important',
    },
    es: {
      preview: 'Restablece tu contraseña',
      title: 'Solicitud de restablecimiento de contraseña',
      greeting: `Hola ${firstName},`,
      body1: 'Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva contraseña:',
      buttonText: 'Restablecer contraseña',
      body2: 'O copia y pega este enlace en tu navegador:',
      expiry: 'Este enlace expirará en 1 hora por razones de seguridad.',
      noAction: 'Si no solicitaste este restablecimiento de contraseña, puedes ignorar este correo. Tu contraseña no será cambiada.',
      warning: 'Importante',
    },
    sv: {
      preview: 'Återställ ditt lösenord',
      title: 'Begäran om återställning av lösenord',
      greeting: `Hej ${firstName},`,
      body1: 'Vi har fått en begäran om att återställa ditt lösenord. Klicka på knappen nedan för att skapa ett nytt lösenord:',
      buttonText: 'Återställ lösenord',
      body2: 'Eller kopiera och klistra in denna länk i din webbläsare:',
      expiry: 'Denna länk kommer att upphöra om 1 timme av säkerhetsskäl.',
      noAction: 'Om du inte begärde denna lösenordsåterställning kan du ignorera detta e-postmeddelande. Ditt lösenord kommer inte att ändras.',
      warning: 'Viktigt',
    },
    it: {
      preview: 'Reimposta la tua password',
      title: 'Richiesta di reimpostazione password',
      greeting: `Ciao ${firstName},`,
      body1: 'Abbiamo ricevuto una richiesta per reimpostare la tua password. Clicca sul pulsante qui sotto per creare una nuova password:',
      buttonText: 'Reimposta password',
      body2: 'Oppure copia e incolla questo link nel tuo browser:',
      expiry: 'Questo link scadrà tra 1 ora per motivi di sicurezza.',
      noAction: 'Se non hai richiesto questa reimpostazione della password, puoi ignorare questa email. La tua password non verrà modificata.',
      warning: 'Importante',
    },
    pt: {
      preview: 'Redefina sua senha',
      title: 'Solicitação de redefinição de senha',
      greeting: `Olá ${firstName},`,
      body1: 'Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:',
      buttonText: 'Redefinir senha',
      body2: 'Ou copie e cole este link no seu navegador:',
      expiry: 'Este link expirará em 1 hora por motivos de segurança.',
      noAction: 'Se você não solicitou esta redefinição de senha, pode ignorar este e-mail. Sua senha não será alterada.',
      warning: 'Importante',
    },
    nl: {
      preview: 'Stel uw wachtwoord opnieuw in',
      title: 'Verzoek om wachtwoordherstel',
      greeting: `Hallo ${firstName},`,
      body1: 'We hebben een verzoek ontvangen om uw wachtwoord opnieuw in te stellen. Klik op de knop hieronder om een nieuw wachtwoord aan te maken:',
      buttonText: 'Wachtwoord opnieuw instellen',
      body2: 'Of kopieer en plak deze link in uw browser:',
      expiry: 'Deze link verloopt over 1 uur om veiligheidsredenen.',
      noAction: 'Als u dit wachtwoordherstel niet heeft aangevraagd, kunt u deze e-mail negeren. Uw wachtwoord wordt niet gewijzigd.',
      warning: 'Belangrijk',
    },
    da: {
      preview: 'Nulstil din adgangskode',
      title: 'Anmodning om nulstilling af adgangskode',
      greeting: `Hej ${firstName},`,
      body1: 'Vi har modtaget en anmodning om at nulstille din adgangskode. Klik på knappen nedenfor for at oprette en ny adgangskode:',
      buttonText: 'Nulstil adgangskode',
      body2: 'Eller kopier og indsæt dette link i din browser:',
      expiry: 'Dette link udløber om 1 time af sikkerhedsmæssige årsager.',
      noAction: 'Hvis du ikke anmodede om denne nulstilling af adgangskode, kan du ignorere denne e-mail. Din adgangskode vil ikke blive ændret.',
      warning: 'Vigtigt',
    },
    no: {
      preview: 'Tilbakestill passordet ditt',
      title: 'Forespørsel om tilbakestilling av passord',
      greeting: `Hei ${firstName},`,
      body1: 'Vi har mottatt en forespørsel om å tilbakestille passordet ditt. Klikk på knappen nedenfor for å opprette et nytt passord:',
      buttonText: 'Tilbakestill passord',
      body2: 'Eller kopier og lim inn denne lenken i nettleseren din:',
      expiry: 'Denne lenken utløper om 1 time av sikkerhetsgrunner.',
      noAction: 'Hvis du ikke ba om denne passordtilbakestillingen, kan du ignorere denne e-posten. Passordet ditt vil ikke bli endret.',
      warning: 'Viktig',
    },
    fi: {
      preview: 'Palauta salasanasi',
      title: 'Salasanan palautuspyyntö',
      greeting: `Hei ${firstName},`,
      body1: 'Olemme saaneet pyynnön palauttaa salasanasi. Napsauta alla olevaa painiketta luodaksesi uuden salasanan:',
      buttonText: 'Palauta salasana',
      body2: 'Tai kopioi ja liitä tämä linkki selaimeesi:',
      expiry: 'Tämä linkki vanhenee 1 tunnin kuluttua turvallisuussyistä.',
      noAction: 'Jos et pyytänyt tätä salasanan palautusta, voit jättää tämän sähköpostin huomiotta. Salasanaasi ei muuteta.',
      warning: 'Tärkeää',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>
      <Text style={paragraph}>{t.body1}</Text>

      <Section style={buttonContainer}>
        <Button style={button} href={resetUrl}>
          {t.buttonText}
        </Button>
      </Section>

      <Text style={paragraph}>{t.body2}</Text>
      <Text style={link}>{resetUrl}</Text>

      <Section style={warningBox}>
        <Text style={warningTitle}>⚠️ {t.warning}</Text>
        <Text style={warningText}>{t.expiry}</Text>
      </Section>

      <Hr style={hr} />

      <Text style={footerNote}>{t.noAction}</Text>
    </BaseLayout>
  );
};

export default PasswordResetEmail;

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

const link = {
  color: '#007bff',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
  margin: '16px 0',
};

const warningBox = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffc107',
  borderRadius: '5px',
  padding: '15px',
  margin: '20px 0',
};

const warningTitle = {
  fontSize: '16px',
  fontWeight: 'bold' as const,
  color: '#856404',
  margin: '0 0 8px',
};

const warningText = {
  fontSize: '14px',
  color: '#856404',
  margin: '0',
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
