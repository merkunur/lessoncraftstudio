/**
 * Base Email Layout
 * Professional, branded layout for all email templates
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BaseLayoutProps {
  preview: string;
  children: React.ReactNode;
  language?: string;
}

export const BaseLayout = ({ preview, children, language = 'en' }: BaseLayoutProps) => {
  const currentYear = new Date().getFullYear();

  const footerText = {
    en: {
      copyright: `© ${currentYear} LessonCraftStudio. All rights reserved.`,
      unsubscribe: 'Unsubscribe from these emails',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    de: {
      copyright: `© ${currentYear} LessonCraftStudio. Alle Rechte vorbehalten.`,
      unsubscribe: 'Von diesen E-Mails abmelden',
      privacy: 'Datenschutzrichtlinie',
      terms: 'Nutzungsbedingungen',
    },
    fr: {
      copyright: `© ${currentYear} LessonCraftStudio. Tous droits réservés.`,
      unsubscribe: 'Se désabonner de ces emails',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
    },
    es: {
      copyright: `© ${currentYear} LessonCraftStudio. Todos los derechos reservados.`,
      unsubscribe: 'Cancelar suscripción de estos correos',
      privacy: 'Política de privacidad',
      terms: 'Términos de servicio',
    },
    sv: {
      copyright: `© ${currentYear} LessonCraftStudio. Alla rättigheter förbehållna.`,
      unsubscribe: 'Avprenumerera från dessa e-postmeddelanden',
      privacy: 'Integritetspolicy',
      terms: 'Användarvillkor',
    },
    it: {
      copyright: `© ${currentYear} LessonCraftStudio. Tutti i diritti riservati.`,
      unsubscribe: 'Annulla l\'iscrizione a queste email',
      privacy: 'Informativa sulla privacy',
      terms: 'Termini di servizio',
    },
    pt: {
      copyright: `© ${currentYear} LessonCraftStudio. Todos os direitos reservados.`,
      unsubscribe: 'Cancelar inscrição destes e-mails',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
    },
    nl: {
      copyright: `© ${currentYear} LessonCraftStudio. Alle rechten voorbehouden.`,
      unsubscribe: 'Afmelden voor deze e-mails',
      privacy: 'Privacybeleid',
      terms: 'Servicevoorwaarden',
    },
    da: {
      copyright: `© ${currentYear} LessonCraftStudio. Alle rettigheder forbeholdes.`,
      unsubscribe: 'Afmeld disse e-mails',
      privacy: 'Privatlivspolitik',
      terms: 'Servicevilkår',
    },
    no: {
      copyright: `© ${currentYear} LessonCraftStudio. Alle rettigheter reservert.`,
      unsubscribe: 'Meld av disse e-postene',
      privacy: 'Personvernregler',
      terms: 'Vilkår for bruk',
    },
    fi: {
      copyright: `© ${currentYear} LessonCraftStudio. Kaikki oikeudet pidätetään.`,
      unsubscribe: 'Peruuta näiden sähköpostien tilaus',
      privacy: 'Tietosuojakäytäntö',
      terms: 'Käyttöehdot',
    },
  };

  const text = footerText[language as keyof typeof footerText] || footerText.en;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Heading style={logo}>LessonCraftStudio</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>{children}</Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{text.copyright}</Text>
            <Text style={footerLinks}>
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/privacy`} style={footerLink}>
                {text.privacy}
              </Link>
              {' • '}
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/terms`} style={footerLink}>
                {text.terms}
              </Link>
              {' • '}
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe`} style={footerLink}>
                {text.unsubscribe}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#007bff',
  padding: '30px 20px',
  textAlign: 'center' as const,
};

const logo = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  margin: '0',
  padding: '0',
};

const content = {
  padding: '20px 40px',
};

const footer = {
  borderTop: '1px solid #e6ebf1',
  margin: '40px 40px 0',
  padding: '20px 0',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

const footerLinks = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '10px 0 0',
};

const footerLink = {
  color: '#007bff',
  textDecoration: 'none',
};
