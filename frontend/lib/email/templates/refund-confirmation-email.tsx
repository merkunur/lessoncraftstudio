/**
 * Refund Confirmation Email Template
 * Sent when a refund is processed
 */

import {
  Column,
  Heading,
  Hr,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { BaseLayout } from './base-layout';

interface RefundConfirmationEmailProps {
  firstName: string;
  refundAmount: number;
  currency: string;
  originalAmount: number;
  invoiceNumber: string;
  refundReason?: string;
  processingDays?: number;
  language?: string;
}

export const RefundConfirmationEmail = ({
  firstName = 'there',
  refundAmount,
  currency = 'USD',
  originalAmount,
  invoiceNumber,
  refundReason,
  processingDays = 7,
  language = 'en',
}: RefundConfirmationEmailProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const isPartialRefund = refundAmount < originalAmount;

  const translations = {
    en: {
      preview: `Refund processed - ${formatCurrency(refundAmount, currency)}`,
      title: 'Refund Processed',
      greeting: `Hi ${firstName},`,
      body1: 'Your refund has been successfully processed.',
      refundDetails: 'Refund Details',
      invoiceNumber: 'Invoice Number',
      originalAmount: 'Original Amount',
      refundAmount: 'Refund Amount',
      refundType: 'Refund Type',
      fullRefund: 'Full Refund',
      partialRefund: 'Partial Refund',
      reason: 'Reason',
      processing: 'Processing Time',
      processingText: `Your refund will appear on your original payment method within ${processingDays} business days.`,
      questions: 'Questions?',
      questionsText: 'If you have any questions about this refund, please contact our support team.',
      thankYou: 'We appreciate your understanding.',
    },
    de: {
      preview: `Rückerstattung bearbeitet - ${formatCurrency(refundAmount, currency)}`,
      title: 'Rückerstattung bearbeitet',
      greeting: `Hallo ${firstName},`,
      body1: 'Ihre Rückerstattung wurde erfolgreich bearbeitet.',
      refundDetails: 'Rückerstattungsdetails',
      invoiceNumber: 'Rechnungsnummer',
      originalAmount: 'Ursprünglicher Betrag',
      refundAmount: 'Rückerstattungsbetrag',
      refundType: 'Rückerstattungstyp',
      fullRefund: 'Vollständige Rückerstattung',
      partialRefund: 'Teilweise Rückerstattung',
      reason: 'Grund',
      processing: 'Bearbeitungszeit',
      processingText: `Ihre Rückerstattung wird innerhalb von ${processingDays} Werktagen auf Ihrer ursprünglichen Zahlungsmethode erscheinen.`,
      questions: 'Fragen?',
      questionsText: 'Wenn Sie Fragen zu dieser Rückerstattung haben, wenden Sie sich bitte an unser Support-Team.',
      thankYou: 'Wir schätzen Ihr Verständnis.',
    },
    fr: {
      preview: `Remboursement traité - ${formatCurrency(refundAmount, currency)}`,
      title: 'Remboursement traité',
      greeting: `Bonjour ${firstName},`,
      body1: 'Votre remboursement a été traité avec succès.',
      refundDetails: 'Détails du remboursement',
      invoiceNumber: 'Numéro de facture',
      originalAmount: 'Montant original',
      refundAmount: 'Montant remboursé',
      refundType: 'Type de remboursement',
      fullRefund: 'Remboursement complet',
      partialRefund: 'Remboursement partiel',
      reason: 'Raison',
      processing: 'Délai de traitement',
      processingText: `Votre remboursement apparaîtra sur votre moyen de paiement d'origine dans les ${processingDays} jours ouvrables.`,
      questions: 'Des questions?',
      questionsText: 'Si vous avez des questions concernant ce remboursement, veuillez contacter notre équipe de support.',
      thankYou: 'Nous apprécions votre compréhension.',
    },
    es: {
      preview: `Reembolso procesado - ${formatCurrency(refundAmount, currency)}`,
      title: 'Reembolso procesado',
      greeting: `Hola ${firstName},`,
      body1: 'Tu reembolso ha sido procesado exitosamente.',
      refundDetails: 'Detalles del reembolso',
      invoiceNumber: 'Número de factura',
      originalAmount: 'Monto original',
      refundAmount: 'Monto del reembolso',
      refundType: 'Tipo de reembolso',
      fullRefund: 'Reembolso completo',
      partialRefund: 'Reembolso parcial',
      reason: 'Razón',
      processing: 'Tiempo de procesamiento',
      processingText: `Tu reembolso aparecerá en tu método de pago original dentro de ${processingDays} días hábiles.`,
      questions: '¿Preguntas?',
      questionsText: 'Si tienes preguntas sobre este reembolso, por favor contacta a nuestro equipo de soporte.',
      thankYou: 'Apreciamos tu comprensión.',
    },
    sv: {
      preview: `Återbetalning behandlad - ${formatCurrency(refundAmount, currency)}`,
      title: 'Återbetalning behandlad',
      greeting: `Hej ${firstName},`,
      body1: 'Din återbetalning har behandlats framgångsrikt.',
      refundDetails: 'Återbetalningsdetaljer',
      invoiceNumber: 'Fakturanummer',
      originalAmount: 'Ursprungligt belopp',
      refundAmount: 'Återbetalningsbelopp',
      refundType: 'Återbetalningstyp',
      fullRefund: 'Full återbetalning',
      partialRefund: 'Delvis återbetalning',
      reason: 'Anledning',
      processing: 'Handläggningstid',
      processingText: `Din återbetalning kommer att visas på din ursprungliga betalningsmetod inom ${processingDays} arbetsdagar.`,
      questions: 'Frågor?',
      questionsText: 'Om du har några frågor om denna återbetalning, kontakta vårt supportteam.',
      thankYou: 'Vi uppskattar din förståelse.',
    },
    it: {
      preview: `Rimborso elaborato - ${formatCurrency(refundAmount, currency)}`,
      title: 'Rimborso elaborato',
      greeting: `Ciao ${firstName},`,
      body1: 'Il tuo rimborso è stato elaborato con successo.',
      refundDetails: 'Dettagli del rimborso',
      invoiceNumber: 'Numero fattura',
      originalAmount: 'Importo originale',
      refundAmount: 'Importo rimborsato',
      refundType: 'Tipo di rimborso',
      fullRefund: 'Rimborso completo',
      partialRefund: 'Rimborso parziale',
      reason: 'Motivo',
      processing: 'Tempo di elaborazione',
      processingText: `Il tuo rimborso apparirà sul tuo metodo di pagamento originale entro ${processingDays} giorni lavorativi.`,
      questions: 'Domande?',
      questionsText: 'Se hai domande su questo rimborso, contatta il nostro team di supporto.',
      thankYou: 'Apprezziamo la tua comprensione.',
    },
    pt: {
      preview: `Reembolso processado - ${formatCurrency(refundAmount, currency)}`,
      title: 'Reembolso processado',
      greeting: `Olá ${firstName},`,
      body1: 'Seu reembolso foi processado com sucesso.',
      refundDetails: 'Detalhes do reembolso',
      invoiceNumber: 'Número da fatura',
      originalAmount: 'Valor original',
      refundAmount: 'Valor do reembolso',
      refundType: 'Tipo de reembolso',
      fullRefund: 'Reembolso total',
      partialRefund: 'Reembolso parcial',
      reason: 'Razão',
      processing: 'Tempo de processamento',
      processingText: `Seu reembolso aparecerá no seu método de pagamento original dentro de ${processingDays} dias úteis.`,
      questions: 'Dúvidas?',
      questionsText: 'Se você tiver dúvidas sobre este reembolso, entre em contato com nossa equipe de suporte.',
      thankYou: 'Agradecemos sua compreensão.',
    },
    nl: {
      preview: `Terugbetaling verwerkt - ${formatCurrency(refundAmount, currency)}`,
      title: 'Terugbetaling verwerkt',
      greeting: `Hallo ${firstName},`,
      body1: 'Uw terugbetaling is succesvol verwerkt.',
      refundDetails: 'Terugbetalingsgegevens',
      invoiceNumber: 'Factuurnummer',
      originalAmount: 'Oorspronkelijk bedrag',
      refundAmount: 'Terugbetalingsbedrag',
      refundType: 'Type terugbetaling',
      fullRefund: 'Volledige terugbetaling',
      partialRefund: 'Gedeeltelijke terugbetaling',
      reason: 'Reden',
      processing: 'Verwerkingstijd',
      processingText: `Uw terugbetaling verschijnt binnen ${processingDays} werkdagen op uw oorspronkelijke betalingsmethode.`,
      questions: 'Vragen?',
      questionsText: 'Als u vragen heeft over deze terugbetaling, neem dan contact op met ons supportteam.',
      thankYou: 'We waarderen uw begrip.',
    },
    da: {
      preview: `Refusion behandlet - ${formatCurrency(refundAmount, currency)}`,
      title: 'Refusion behandlet',
      greeting: `Hej ${firstName},`,
      body1: 'Din refusion er blevet behandlet succesfuldt.',
      refundDetails: 'Refusionsdetaljer',
      invoiceNumber: 'Fakturanummer',
      originalAmount: 'Oprindeligt beløb',
      refundAmount: 'Refusionsbeløb',
      refundType: 'Refusionstype',
      fullRefund: 'Fuld refusion',
      partialRefund: 'Delvis refusion',
      reason: 'Årsag',
      processing: 'Behandlingstid',
      processingText: `Din refusion vil vises på din oprindelige betalingsmetode inden for ${processingDays} arbejdsdage.`,
      questions: 'Spørgsmål?',
      questionsText: 'Hvis du har spørgsmål om denne refusion, skal du kontakte vores supportteam.',
      thankYou: 'Vi sætter pris på din forståelse.',
    },
    no: {
      preview: `Refusjon behandlet - ${formatCurrency(refundAmount, currency)}`,
      title: 'Refusjon behandlet',
      greeting: `Hei ${firstName},`,
      body1: 'Refusjonen din har blitt behandlet.',
      refundDetails: 'Refusjonsdetaljer',
      invoiceNumber: 'Fakturanummer',
      originalAmount: 'Opprinnelig beløp',
      refundAmount: 'Refusjonsbeløp',
      refundType: 'Refusjonstype',
      fullRefund: 'Full refusjon',
      partialRefund: 'Delvis refusjon',
      reason: 'Årsak',
      processing: 'Behandlingstid',
      processingText: `Refusjonen din vil vises på din opprinnelige betalingsmetode innen ${processingDays} virkedager.`,
      questions: 'Spørsmål?',
      questionsText: 'Hvis du har spørsmål om denne refusjonen, vennligst kontakt vårt supportteam.',
      thankYou: 'Vi setter pris på din forståelse.',
    },
    fi: {
      preview: `Palautus käsitelty - ${formatCurrency(refundAmount, currency)}`,
      title: 'Palautus käsitelty',
      greeting: `Hei ${firstName},`,
      body1: 'Palautuksesi on käsitelty onnistuneesti.',
      refundDetails: 'Palautuksen tiedot',
      invoiceNumber: 'Laskunumero',
      originalAmount: 'Alkuperäinen summa',
      refundAmount: 'Palautussumma',
      refundType: 'Palautustyyppi',
      fullRefund: 'Täysi palautus',
      partialRefund: 'Osittainen palautus',
      reason: 'Syy',
      processing: 'Käsittelyaika',
      processingText: `Palautuksesi näkyy alkuperäisessä maksutavassasi ${processingDays} arkipäivän sisällä.`,
      questions: 'Kysymyksiä?',
      questionsText: 'Jos sinulla on kysymyksiä tästä palautuksesta, ota yhteyttä tukitiimiimme.',
      thankYou: 'Arvostamme ymmärrystäsi.',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>
      <Text style={paragraph}>{t.body1}</Text>

      <Section style={refundBox}>
        <Heading as="h2" style={refundHeading}>
          {t.refundDetails}
        </Heading>

        <Section style={detailsTable}>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.invoiceNumber}:</Column>
            <Column style={valueColumn}>{invoiceNumber}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.originalAmount}:</Column>
            <Column style={valueColumn}>
              {formatCurrency(originalAmount, currency)}
            </Column>
          </Row>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.refundType}:</Column>
            <Column style={valueColumn}>
              {isPartialRefund ? t.partialRefund : t.fullRefund}
            </Column>
          </Row>
          {refundReason && (
            <Row style={tableRow}>
              <Column style={labelColumn}>{t.reason}:</Column>
              <Column style={valueColumn}>{refundReason}</Column>
            </Row>
          )}
        </Section>

        <Hr style={totalDivider} />

        <Row style={totalRow}>
          <Column style={totalLabel}>{t.refundAmount}:</Column>
          <Column style={totalValue}>
            {formatCurrency(refundAmount, currency)}
          </Column>
        </Row>
      </Section>

      <Section style={processingBox}>
        <Text style={processingTitle}>⏱️ {t.processing}</Text>
        <Text style={processingText}>{t.processingText}</Text>
      </Section>

      <Hr style={hr} />

      <Heading as="h3" style={subheading}>
        {t.questions}
      </Heading>
      <Text style={paragraph}>{t.questionsText}</Text>
      <Text style={thankYouText}>{t.thankYou}</Text>
    </BaseLayout>
  );
};

export default RefundConfirmationEmail;

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

const refundBox = {
  backgroundColor: '#e7f3ff',
  border: '1px solid #0277bd',
  borderRadius: '8px',
  padding: '25px',
  margin: '30px 0',
};

const refundHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#01579b',
  margin: '0 0 20px',
};

const detailsTable = {
  width: '100%',
};

const tableRow = {
  marginBottom: '10px',
};

const labelColumn = {
  fontSize: '15px',
  color: '#01579b',
  width: '40%',
  verticalAlign: 'top' as const,
};

const valueColumn = {
  fontSize: '15px',
  color: '#01579b',
  fontWeight: '500' as const,
  width: '60%',
};

const totalDivider = {
  borderColor: '#0277bd',
  margin: '20px 0',
};

const totalRow = {
  marginTop: '15px',
};

const totalLabel = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#01579b',
  width: '40%',
};

const totalValue = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#0277bd',
  width: '60%',
  textAlign: 'right' as const,
};

const processingBox = {
  backgroundColor: '#fff8e1',
  border: '1px solid #ffc107',
  borderRadius: '8px',
  padding: '15px',
  margin: '30px 0',
};

const processingTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#f57c00',
  margin: '0 0 8px',
};

const processingText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#f57c00',
  margin: '0',
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
