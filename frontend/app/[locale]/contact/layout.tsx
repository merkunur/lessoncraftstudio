import { Metadata } from 'next';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

// SEO-optimized contact page metadata with keyword-rich titles
const contactMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Contact LessonCraftStudio | Support & Partnership Inquiries',
    description: 'Get in touch with LessonCraftStudio. Contact our support team for help with worksheet generators, subscriptions, or partnership opportunities. We respond within 24 hours.'
  },
  de: {
    title: 'Kontakt LessonCraftStudio | Support & Partnerschaftsanfragen',
    description: 'Kontaktieren Sie LessonCraftStudio. Unser Support-Team hilft bei Fragen zu Arbeitsblatt-Generatoren, Abonnements oder Partnerschaften. Antwort innerhalb von 24 Stunden.'
  },
  fr: {
    title: 'Contact LessonCraftStudio | Support & Partenariats',
    description: 'Contactez LessonCraftStudio. Notre \u00e9quipe de support vous aide pour les g\u00e9n\u00e9rateurs de fiches, abonnements ou partenariats. R\u00e9ponse sous 24 heures.'
  },
  es: {
    title: 'Contacto LessonCraftStudio | Soporte & Colaboraciones',
    description: 'Cont\u00e1ctenos en LessonCraftStudio. Nuestro equipo de soporte le ayuda con generadores de fichas, suscripciones o colaboraciones. Respuesta en 24 horas.'
  },
  pt: {
    title: 'Contato LessonCraftStudio | Suporte & Parcerias',
    description: 'Entre em contato com LessonCraftStudio. Nossa equipe de suporte ajuda com geradores de atividades, assinaturas ou parcerias. Resposta em 24 horas.'
  },
  it: {
    title: 'Contatto LessonCraftStudio | Supporto & Collaborazioni',
    description: 'Contatta LessonCraftStudio. Il nostro team di supporto ti aiuta con generatori di schede, abbonamenti o collaborazioni. Risposta entro 24 ore.'
  },
  nl: {
    title: 'Contact LessonCraftStudio | Ondersteuning & Samenwerkingen',
    description: 'Neem contact op met LessonCraftStudio. Ons supportteam helpt met werkblad generatoren, abonnementen of samenwerkingen. Reactie binnen 24 uur.'
  },
  sv: {
    title: 'Kontakt LessonCraftStudio | Support & Samarbeten',
    description: 'Kontakta LessonCraftStudio. V\u00e5rt supportteam hj\u00e4lper med arbetsblad generatorer, prenumerationer eller samarbeten. Svar inom 24 timmar.'
  },
  da: {
    title: 'Kontakt LessonCraftStudio | Support & Samarbejde',
    description: 'Kontakt LessonCraftStudio. Vores supportteam hj\u00e6lper med arbejdsark generatorer, abonnementer eller samarbejde. Svar inden for 24 timer.'
  },
  no: {
    title: 'Kontakt LessonCraftStudio | Support & Samarbeid',
    description: 'Kontakt LessonCraftStudio. V\u00e5rt supportteam hjelper med arbeidsark generatorer, abonnementer eller samarbeid. Svar innen 24 timer.'
  },
  fi: {
    title: 'Ota Yhteytt\u00e4 LessonCraftStudio | Tuki & Yhteisty\u00f6',
    description: 'Ota yhteytt\u00e4 LessonCraftStudioon. Tukitiimimme auttaa ty\u00f6arkki-generaattoreiden, tilausten tai yhteisty\u00f6n kanssa. Vastaus 24 tunnin sis\u00e4ll\u00e4.'
  }
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const meta = contactMetadata[locale] || contactMetadata.en;

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/contact`;
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/contact`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l)
    }
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
