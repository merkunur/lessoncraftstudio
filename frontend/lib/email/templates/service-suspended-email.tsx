import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface ServiceSuspendedEmailProps {
  firstName: string;
  suspensionDate: string;
  dataRetentionDays: number;
  updatePaymentUrl: string;
  language?: string;
}

const translations = {
  en: {
    subject: 'Service Suspended - Update Payment to Restore Access',
    heading: '🚫 Subscription Suspended',
    greeting: (name: string) => `Hi ${name},`,
    intro: 'Your subscription has been suspended due to multiple failed payment attempts.',
    suspended: (date: string) => `Your account was suspended on ${date}.`,
    whyTitle: 'Why was my account suspended?',
    whyText: 'We attempted to process your payment multiple times over the past 15 days but were unable to collect payment. To maintain service quality, we\'ve temporarily suspended your access.',
    dataTitle: 'Is my data safe?',
    dataText: (days: number) => `Yes! Your data is completely safe and will be retained for ${days} days. You won\'t lose any of your worksheets, settings, or content.`,
    restoreTitle: 'How do I restore access?',
    restoreText: 'Simply update your payment method, and we\'ll reactivate your subscription immediately.',
    button: 'Restore My Access',
    whatNext: 'What happens next?',
    timeline1: (days: number) => `Next ${days} days: Your data is safe and waiting for you`,
    timeline2: (days: number) => `After ${days} days: Your subscription will be permanently canceled`,
    timeline3: 'After 90 days: Your data will be permanently deleted (GDPR compliance)',
    support: 'Need help? Our support team is here to assist you with any payment issues.',
    footer: 'We hope to see you back soon!',
  },
  de: {
    subject: 'Service ausgesetzt - Zahlung aktualisieren um Zugriff wiederherzustellen',
    heading: '🚫 Abonnement ausgesetzt',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'Ihr Abonnement wurde aufgrund mehrerer fehlgeschlagener Zahlungsversuche ausgesetzt.',
    suspended: (date: string) => `Ihr Konto wurde am ${date} ausgesetzt.`,
    whyTitle: 'Warum wurde mein Konto ausgesetzt?',
    whyText: 'Wir haben in den letzten 15 Tagen mehrmals versucht, Ihre Zahlung zu verarbeiten, konnten jedoch keine Zahlung einziehen. Um die Servicequalität aufrechtzuerhalten, haben wir Ihren Zugriff vorübergehend ausgesetzt.',
    dataTitle: 'Sind meine Daten sicher?',
    dataText: (days: number) => `Ja! Ihre Daten sind vollkommen sicher und werden ${days} Tage lang aufbewahrt. Sie verlieren keine Ihrer Arbeitsblätter, Einstellungen oder Inhalte.`,
    restoreTitle: 'Wie stelle ich den Zugriff wieder her?',
    restoreText: 'Aktualisieren Sie einfach Ihre Zahlungsmethode und wir reaktivieren Ihr Abonnement sofort.',
    button: 'Meinen Zugriff wiederherstellen',
    whatNext: 'Was passiert als nächstes?',
    timeline1: (days: number) => `Nächste ${days} Tage: Ihre Daten sind sicher und warten auf Sie`,
    timeline2: (days: number) => `Nach ${days} Tagen: Ihr Abonnement wird dauerhaft gekündigt`,
    timeline3: 'Nach 90 Tagen: Ihre Daten werden dauerhaft gelöscht (DSGVO-Konformität)',
    support: 'Brauchen Sie Hilfe? Unser Support-Team ist hier, um Ihnen bei Zahlungsproblemen zu helfen.',
    footer: 'Wir hoffen, Sie bald wiederzusehen!',
  },
  fr: {
    subject: 'Service suspendu - Mettez à jour le paiement',
    heading: '🚫 Abonnement suspendu',
    greeting: (name: string) => `Bonjour ${name},`,
    intro: 'Votre abonnement a été suspendu en raison de plusieurs échecs de paiement.',
    suspended: (date: string) => `Votre compte a été suspendu le ${date}.`,
    whyTitle: 'Pourquoi mon compte a-t-il été suspendu?',
    whyText: 'Nous avons tenté de traiter votre paiement plusieurs fois au cours des 15 derniers jours sans succès.',
    dataTitle: 'Mes données sont-elles en sécurité?',
    dataText: (days: number) => `Oui! Vos données sont entièrement sécurisées et seront conservées pendant ${days} jours.`,
    restoreTitle: 'Comment restaurer l\'accès?',
    restoreText: 'Mettez simplement à jour votre méthode de paiement et nous réactiverons votre abonnement.',
    button: 'Restaurer mon accès',
    whatNext: 'Que se passe-t-il ensuite?',
    timeline1: (days: number) => `${days} prochains jours: Vos données sont en sécurité`,
    timeline2: (days: number) => `Après ${days} jours: Abonnement définitivement annulé`,
    timeline3: 'Après 90 jours: Données définitivement supprimées',
    support: 'Besoin d\'aide? Notre équipe de support est là pour vous aider.',
    footer: 'Nous espérons vous revoir bientôt!',
  },
  es: {
    subject: 'Servicio suspendido - Actualiza el pago',
    heading: '🚫 Suscripción suspendida',
    greeting: (name: string) => `Hola ${name},`,
    intro: 'Tu suscripción ha sido suspendida debido a múltiples fallos de pago.',
    suspended: (date: string) => `Tu cuenta fue suspendida el ${date}.`,
    whyTitle: '¿Por qué se suspendió mi cuenta?',
    whyText: 'Intentamos procesar tu pago varias veces durante los últimos 15 días sin éxito.',
    dataTitle: '¿Están seguros mis datos?',
    dataText: (days: number) => `¡Sí! Tus datos están completamente seguros y se conservarán por ${days} días.`,
    restoreTitle: '¿Cómo restauro el acceso?',
    restoreText: 'Simplemente actualiza tu método de pago y reactivaremos tu suscripción.',
    button: 'Restaurar mi acceso',
    whatNext: '¿Qué pasa después?',
    timeline1: (days: number) => `Próximos ${days} días: Tus datos están seguros`,
    timeline2: (days: number) => `Después de ${days} días: Suscripción cancelada permanentemente`,
    timeline3: 'Después de 90 días: Datos eliminados permanentemente',
    support: '¿Necesitas ayuda? Nuestro equipo de soporte está aquí para ayudarte.',
    footer: '¡Esperamos verte pronto!',
  },
  sv: {
    subject: 'Tjänsten avstängd - Uppdatera betalning',
    heading: '🚫 Prenumeration avstängd',
    greeting: (name: string) => `Hej ${name},`,
    intro: 'Din prenumeration har stängts av på grund av flera misslyckade betalningar.',
    suspended: (date: string) => `Ditt konto stängdes av den ${date}.`,
    whyTitle: 'Varför stängdes mitt konto av?',
    whyText: 'Vi försökte behandla din betalning flera gånger under de senaste 15 dagarna utan framgång.',
    dataTitle: 'Är mina data säkra?',
    dataText: (days: number) => `Ja! Dina data är helt säkra och kommer att sparas i ${days} dagar.`,
    restoreTitle: 'Hur återställer jag åtkomst?',
    restoreText: 'Uppdatera bara din betalningsmetod så aktiverar vi din prenumeration igen.',
    button: 'Återställ min åtkomst',
    whatNext: 'Vad händer härnäst?',
    timeline1: (days: number) => `Nästa ${days} dagar: Dina data är säkra`,
    timeline2: (days: number) => `Efter ${days} dagar: Prenumerationen avbryts permanent`,
    timeline3: 'Efter 90 dagar: Data raderas permanent',
    support: 'Behöver du hjälp? Vårt supportteam finns här för att hjälpa dig.',
    footer: 'Vi hoppas se dig snart igen!',
  },
  it: {
    subject: 'Servizio sospeso - Aggiorna il pagamento',
    heading: '🚫 Abbonamento sospeso',
    greeting: (name: string) => `Ciao ${name},`,
    intro: 'Il tuo abbonamento è stato sospeso a causa di molteplici tentativi di pagamento falliti.',
    suspended: (date: string) => `Il tuo account è stato sospeso il ${date}.`,
    whyTitle: 'Perché il mio account è stato sospeso?',
    whyText: 'Abbiamo tentato di elaborare il pagamento più volte negli ultimi 15 giorni senza successo.',
    dataTitle: 'I miei dati sono al sicuro?',
    dataText: (days: number) => `Sì! I tuoi dati sono completamente al sicuro e saranno conservati per ${days} giorni.`,
    restoreTitle: 'Come ripristino l\'accesso?',
    restoreText: 'Aggiorna semplicemente il metodo di pagamento e riattiveremo il tuo abbonamento.',
    button: 'Ripristina il mio accesso',
    whatNext: 'Cosa succede dopo?',
    timeline1: (days: number) => `Prossimi ${days} giorni: I tuoi dati sono al sicuro`,
    timeline2: (days: number) => `Dopo ${days} giorni: Abbonamento cancellato permanentemente`,
    timeline3: 'Dopo 90 giorni: Dati eliminati permanentemente',
    support: 'Hai bisogno di aiuto? Il nostro team di supporto è qui per aiutarti.',
    footer: 'Speriamo di rivederti presto!',
  },
  pt: {
    subject: 'Serviço suspenso - Atualize o pagamento',
    heading: '🚫 Assinatura suspensa',
    greeting: (name: string) => `Olá ${name},`,
    intro: 'Sua assinatura foi suspensa devido a múltiplas falhas de pagamento.',
    suspended: (date: string) => `Sua conta foi suspensa em ${date}.`,
    whyTitle: 'Por que minha conta foi suspensa?',
    whyText: 'Tentamos processar seu pagamento várias vezes nos últimos 15 dias sem sucesso.',
    dataTitle: 'Meus dados estão seguros?',
    dataText: (days: number) => `Sim! Seus dados estão completamente seguros e serão mantidos por ${days} dias.`,
    restoreTitle: 'Como restauro o acesso?',
    restoreText: 'Basta atualizar seu método de pagamento e reativaremos sua assinatura.',
    button: 'Restaurar meu acesso',
    whatNext: 'O que acontece depois?',
    timeline1: (days: number) => `Próximos ${days} dias: Seus dados estão seguros`,
    timeline2: (days: number) => `Após ${days} dias: Assinatura cancelada permanentemente`,
    timeline3: 'Após 90 dias: Dados excluídos permanentemente',
    support: 'Precisa de ajuda? Nossa equipe de suporte está aqui para ajudar.',
    footer: 'Esperamos vê-lo em breve!',
  },
  nl: {
    subject: 'Dienst opgeschort - Werk betaling bij',
    heading: '🚫 Abonnement opgeschort',
    greeting: (name: string) => `Hallo ${name},`,
    intro: 'Uw abonnement is opgeschort vanwege meerdere mislukte betalingen.',
    suspended: (date: string) => `Uw account is opgeschort op ${date}.`,
    whyTitle: 'Waarom is mijn account opgeschort?',
    whyText: 'We hebben de afgelopen 15 dagen meerdere keren geprobeerd uw betaling te verwerken zonder succes.',
    dataTitle: 'Zijn mijn gegevens veilig?',
    dataText: (days: number) => `Ja! Uw gegevens zijn volledig veilig en worden ${days} dagen bewaard.`,
    restoreTitle: 'Hoe herstel ik toegang?',
    restoreText: 'Werk gewoon uw betaalmethode bij en we activeren uw abonnement opnieuw.',
    button: 'Mijn toegang herstellen',
    whatNext: 'Wat gebeurt er nu?',
    timeline1: (days: number) => `Volgende ${days} dagen: Uw gegevens zijn veilig`,
    timeline2: (days: number) => `Na ${days} dagen: Abonnement permanent geannuleerd`,
    timeline3: 'Na 90 dagen: Gegevens permanent verwijderd',
    support: 'Hulp nodig? Ons supportteam staat klaar om u te helpen.',
    footer: 'We hopen u snel weer te zien!',
  },
  da: {
    subject: 'Tjeneste suspenderet - Opdater betaling',
    heading: '🚫 Abonnement suspenderet',
    greeting: (name: string) => `Hej ${name},`,
    intro: 'Dit abonnement er blevet suspenderet på grund af flere mislykkede betalinger.',
    suspended: (date: string) => `Din konto blev suspenderet den ${date}.`,
    whyTitle: 'Hvorfor blev min konto suspenderet?',
    whyText: 'Vi har forsøgt at behandle din betaling flere gange i løbet af de sidste 15 dage uden held.',
    dataTitle: 'Er mine data sikre?',
    dataText: (days: number) => `Ja! Dine data er helt sikre og gemmes i ${days} dage.`,
    restoreTitle: 'Hvordan gendanner jeg adgang?',
    restoreText: 'Opdater blot din betalingsmetode, og vi genaktiverer dit abonnement.',
    button: 'Gendan min adgang',
    whatNext: 'Hvad sker der nu?',
    timeline1: (days: number) => `Næste ${days} dage: Dine data er sikre`,
    timeline2: (days: number) => `Efter ${days} dage: Abonnement permanent annulleret`,
    timeline3: 'Efter 90 dage: Data permanent slettet',
    support: 'Brug for hjælp? Vores supportteam er her for at hjælpe dig.',
    footer: 'Vi håber at se dig snart igen!',
  },
  no: {
    subject: 'Tjeneste suspendert - Oppdater betaling',
    heading: '🚫 Abonnement suspendert',
    greeting: (name: string) => `Hei ${name},`,
    intro: 'Abonnementet ditt har blitt suspendert på grunn av flere mislykkede betalinger.',
    suspended: (date: string) => `Kontoen din ble suspendert ${date}.`,
    whyTitle: 'Hvorfor ble kontoen min suspendert?',
    whyText: 'Vi forsøkte å behandle betalingen din flere ganger de siste 15 dagene uten hell.',
    dataTitle: 'Er dataene mine trygge?',
    dataText: (days: number) => `Ja! Dataene dine er helt trygge og vil bli lagret i ${days} dager.`,
    restoreTitle: 'Hvordan gjenoppretter jeg tilgang?',
    restoreText: 'Oppdater bare betalingsmetoden din, så aktiverer vi abonnementet ditt på nytt.',
    button: 'Gjenopprett tilgangen min',
    whatNext: 'Hva skjer nå?',
    timeline1: (days: number) => `Neste ${days} dager: Dataene dine er trygge`,
    timeline2: (days: number) => `Etter ${days} dager: Abonnement permanent kansellert`,
    timeline3: 'Etter 90 dager: Data permanent slettet',
    support: 'Trenger du hjelp? Supportteamet vårt er her for å hjelpe deg.',
    footer: 'Vi håper å se deg snart igjen!',
  },
  fi: {
    subject: 'Palvelu keskeytetty - Päivitä maksu',
    heading: '🚫 Tilaus keskeytetty',
    greeting: (name: string) => `Hei ${name},`,
    intro: 'Tilauksesi on keskeytetty useiden epäonnistuneiden maksuyritysten vuoksi.',
    suspended: (date: string) => `Tilisi keskeytettiin ${date}.`,
    whyTitle: 'Miksi tilini keskeytettiin?',
    whyText: 'Yritimme käsitellä maksuasi useita kertoja viimeisten 15 päivän aikana onnistumatta.',
    dataTitle: 'Ovatko tietoni turvassa?',
    dataText: (days: number) => `Kyllä! Tietosi ovat täysin turvassa ja säilytetään ${days} päivää.`,
    restoreTitle: 'Kuinka palautan pääsyn?',
    restoreText: 'Päivitä vain maksutapasi, niin aktivoimme tilauksesi uudelleen.',
    button: 'Palauta pääsyni',
    whatNext: 'Mitä tapahtuu seuraavaksi?',
    timeline1: (days: number) => `Seuraavat ${days} päivää: Tietosi ovat turvassa`,
    timeline2: (days: number) => `${days} päivän jälkeen: Tilaus peruutetaan pysyvästi`,
    timeline3: '90 päivän jälkeen: Tiedot poistetaan pysyvästi',
    support: 'Tarvitsetko apua? Tukitiimimme on täällä auttamassa.',
    footer: 'Toivomme näkevämme sinut pian!',
  },
};

export function ServiceSuspendedEmail({
  firstName,
  suspensionDate,
  dataRetentionDays,
  updatePaymentUrl,
  language = 'en',
}: ServiceSuspendedEmailProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.heading}</Heading>

          <Text style={text}>{t.greeting(firstName)}</Text>

          <Text style={urgentText}>{t.intro}</Text>

          <Section style={suspendedBox}>
            <Text style={suspendedText}>{t.suspended(suspensionDate)}</Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Heading style={h2}>{t.whyTitle}</Heading>
            <Text style={text}>{t.whyText}</Text>
          </Section>

          <Section>
            <Heading style={h2}>{t.dataTitle}</Heading>
            <Text style={text}>{t.dataText(dataRetentionDays)}</Text>
          </Section>

          <Section>
            <Heading style={h2}>{t.restoreTitle}</Heading>
            <Text style={text}>{t.restoreText}</Text>
          </Section>

          <Button style={button} href={updatePaymentUrl}>
            {t.button}
          </Button>

          <Hr style={hr} />

          <Section>
            <Heading style={h2}>{t.whatNext}</Heading>
            <Section style={timelineBox}>
              <Text style={timelineText}>✓ {t.timeline1(dataRetentionDays)}</Text>
              <Text style={timelineText}>⚠️ {t.timeline2(dataRetentionDays)}</Text>
              <Text style={timelineText}>🗑️ {t.timeline3}</Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>{t.support}</Text>
          <Text style={footer}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#dc2626',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  lineHeight: '1.4',
};

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  margin: '24px 0 12px 0',
  lineHeight: '1.4',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
};

const urgentText = {
  color: '#dc2626',
  fontSize: '17px',
  fontWeight: '600',
  lineHeight: '26px',
  margin: '16px 0',
};

const suspendedBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #dc2626',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const suspendedText = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#16a34a',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 20px',
  margin: '24px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const timelineBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const timelineText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '8px 0',
};

export default ServiceSuspendedEmail;
