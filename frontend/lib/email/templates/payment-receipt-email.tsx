/**
 * Payment Receipt Email Template
 * Sent when a payment is successfully processed
 */

import {
  Button,
  Column,
  Heading,
  Hr,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { BaseLayout } from './base-layout';

interface PaymentReceiptEmailProps {
  firstName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  date: string;
  plan: string;
  billingPeriod: string;
  paymentMethod: string;
  invoiceUrl?: string;
  language?: string;
  taxAmount?: number;
  subtotal?: number;
}

export const PaymentReceiptEmail = ({
  firstName = 'there',
  invoiceNumber,
  amount,
  currency = 'USD',
  date,
  plan,
  billingPeriod,
  paymentMethod,
  invoiceUrl,
  language = 'en',
  taxAmount,
  subtotal,
}: PaymentReceiptEmailProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  // Calculate tax information
  const hasTax = taxAmount !== undefined && taxAmount > 0;
  const displaySubtotal = subtotal !== undefined ? subtotal : (hasTax ? amount - taxAmount : amount);

  const translations = {
    en: {
      preview: `Payment receipt - Invoice ${invoiceNumber}`,
      title: 'Payment Received',
      greeting: `Hi ${firstName},`,
      body1: 'Thank you for your payment! This email confirms that we have received your payment.',
      invoiceDetails: 'Invoice Details',
      invoiceNumber: 'Invoice Number',
      date: 'Date',
      amount: 'Amount',
      plan: 'Plan',
      billingPeriod: 'Billing Period',
      paymentMethod: 'Payment Method',
      subtotal: 'Subtotal',
      tax: 'Tax',
      viewInvoice: 'View Invoice',
      questions: 'Questions?',
      questionsText: 'If you have any questions about this invoice, please contact our support team.',
      thankYou: 'Thank you for your business!',
    },
    de: {
      preview: `Zahlungsbestätigung - Rechnung ${invoiceNumber}`,
      title: 'Zahlung erhalten',
      greeting: `Hallo ${firstName},`,
      body1: 'Vielen Dank für Ihre Zahlung! Diese E-Mail bestätigt, dass wir Ihre Zahlung erhalten haben.',
      invoiceDetails: 'Rechnungsdetails',
      invoiceNumber: 'Rechnungsnummer',
      date: 'Datum',
      amount: 'Betrag',
      plan: 'Plan',
      billingPeriod: 'Abrechnungszeitraum',
      paymentMethod: 'Zahlungsmethode',
      subtotal: 'Zwischensumme',
      tax: 'Steuer',
      viewInvoice: 'Rechnung ansehen',
      questions: 'Fragen?',
      questionsText: 'Wenn Sie Fragen zu dieser Rechnung haben, wenden Sie sich bitte an unser Support-Team.',
      thankYou: 'Vielen Dank für Ihr Vertrauen!',
    },
    fr: {
      preview: `Reçu de paiement - Facture ${invoiceNumber}`,
      title: 'Paiement reçu',
      greeting: `Bonjour ${firstName},`,
      body1: 'Merci pour votre paiement! Cet email confirme que nous avons reçu votre paiement.',
      invoiceDetails: 'Détails de la facture',
      invoiceNumber: 'Numéro de facture',
      date: 'Date',
      amount: 'Montant',
      plan: 'Plan',
      billingPeriod: 'Période de facturation',
      paymentMethod: 'Moyen de paiement',
      subtotal: 'Sous-total',
      tax: 'Taxe',
      viewInvoice: 'Voir la facture',
      questions: 'Des questions?',
      questionsText: 'Si vous avez des questions concernant cette facture, veuillez contacter notre équipe de support.',
      thankYou: 'Merci pour votre confiance!',
    },
    es: {
      preview: `Recibo de pago - Factura ${invoiceNumber}`,
      title: 'Pago recibido',
      greeting: `Hola ${firstName},`,
      body1: '¡Gracias por tu pago! Este correo confirma que hemos recibido tu pago.',
      invoiceDetails: 'Detalles de la factura',
      invoiceNumber: 'Número de factura',
      date: 'Fecha',
      amount: 'Monto',
      plan: 'Plan',
      billingPeriod: 'Período de facturación',
      paymentMethod: 'Método de pago',
      subtotal: 'Subtotal',
      tax: 'Impuesto',
      viewInvoice: 'Ver factura',
      questions: '¿Preguntas?',
      questionsText: 'Si tienes preguntas sobre esta factura, por favor contacta a nuestro equipo de soporte.',
      thankYou: '¡Gracias por tu confianza!',
    },
    sv: {
      preview: `Betalningskvitto - Faktura ${invoiceNumber}`,
      title: 'Betalning mottagen',
      greeting: `Hej ${firstName},`,
      body1: 'Tack för din betalning! Detta e-postmeddelande bekräftar att vi har tagit emot din betalning.',
      invoiceDetails: 'Fakturadetaljer',
      invoiceNumber: 'Fakturanummer',
      date: 'Datum',
      amount: 'Belopp',
      plan: 'Plan',
      billingPeriod: 'Faktureringsperiod',
      paymentMethod: 'Betalningsmetod',
      subtotal: 'Delsumma',
      tax: 'Moms',
      viewInvoice: 'Visa faktura',
      questions: 'Frågor?',
      questionsText: 'Om du har några frågor om denna faktura, kontakta vårt supportteam.',
      thankYou: 'Tack för ditt förtroende!',
    },
    it: {
      preview: `Ricevuta di pagamento - Fattura ${invoiceNumber}`,
      title: 'Pagamento ricevuto',
      greeting: `Ciao ${firstName},`,
      body1: 'Grazie per il tuo pagamento! Questa email conferma che abbiamo ricevuto il tuo pagamento.',
      invoiceDetails: 'Dettagli della fattura',
      invoiceNumber: 'Numero fattura',
      date: 'Data',
      amount: 'Importo',
      plan: 'Piano',
      billingPeriod: 'Periodo di fatturazione',
      paymentMethod: 'Metodo di pagamento',
      subtotal: 'Subtotale',
      tax: 'Tasse',
      viewInvoice: 'Visualizza fattura',
      questions: 'Domande?',
      questionsText: 'Se hai domande su questa fattura, contatta il nostro team di supporto.',
      thankYou: 'Grazie per la tua fiducia!',
    },
    pt: {
      preview: `Recibo de pagamento - Fatura ${invoiceNumber}`,
      title: 'Pagamento recebido',
      greeting: `Olá ${firstName},`,
      body1: 'Obrigado pelo seu pagamento! Este e-mail confirma que recebemos seu pagamento.',
      invoiceDetails: 'Detalhes da fatura',
      invoiceNumber: 'Número da fatura',
      date: 'Data',
      amount: 'Valor',
      plan: 'Plano',
      billingPeriod: 'Período de faturamento',
      paymentMethod: 'Método de pagamento',
      subtotal: 'Subtotal',
      tax: 'Imposto',
      viewInvoice: 'Ver fatura',
      questions: 'Dúvidas?',
      questionsText: 'Se você tiver dúvidas sobre esta fatura, entre em contato com nossa equipe de suporte.',
      thankYou: 'Obrigado pela sua confiança!',
    },
    nl: {
      preview: `Betalingsbewijs - Factuur ${invoiceNumber}`,
      title: 'Betaling ontvangen',
      greeting: `Hallo ${firstName},`,
      body1: 'Bedankt voor uw betaling! Deze e-mail bevestigt dat we uw betaling hebben ontvangen.',
      invoiceDetails: 'Factuurgegevens',
      invoiceNumber: 'Factuurnummer',
      date: 'Datum',
      amount: 'Bedrag',
      plan: 'Plan',
      billingPeriod: 'Factureringsperiode',
      paymentMethod: 'Betalingsmethode',
      subtotal: 'Subtotaal',
      tax: 'Belasting',
      viewInvoice: 'Bekijk factuur',
      questions: 'Vragen?',
      questionsText: 'Als u vragen heeft over deze factuur, neem dan contact op met ons supportteam.',
      thankYou: 'Bedankt voor uw vertrouwen!',
    },
    da: {
      preview: `Betalingskvittering - Faktura ${invoiceNumber}`,
      title: 'Betaling modtaget',
      greeting: `Hej ${firstName},`,
      body1: 'Tak for din betaling! Denne e-mail bekræfter, at vi har modtaget din betaling.',
      invoiceDetails: 'Fakturadetaljer',
      invoiceNumber: 'Fakturanummer',
      date: 'Dato',
      amount: 'Beløb',
      plan: 'Plan',
      billingPeriod: 'Faktureringsperiode',
      paymentMethod: 'Betalingsmetode',
      subtotal: 'Subtotal',
      tax: 'Skat',
      viewInvoice: 'Se faktura',
      questions: 'Spørgsmål?',
      questionsText: 'Hvis du har spørgsmål om denne faktura, skal du kontakte vores supportteam.',
      thankYou: 'Tak for din tillid!',
    },
    no: {
      preview: `Betalingskvittering - Faktura ${invoiceNumber}`,
      title: 'Betaling mottatt',
      greeting: `Hei ${firstName},`,
      body1: 'Takk for betalingen! Denne e-posten bekrefter at vi har mottatt betalingen din.',
      invoiceDetails: 'Fakturadetaljer',
      invoiceNumber: 'Fakturanummer',
      date: 'Dato',
      amount: 'Beløp',
      plan: 'Plan',
      billingPeriod: 'Faktureringsperiode',
      paymentMethod: 'Betalingsmetode',
      subtotal: 'Delsum',
      tax: 'Avgift',
      viewInvoice: 'Se faktura',
      questions: 'Spørsmål?',
      questionsText: 'Hvis du har spørsmål om denne fakturaen, vennligst kontakt vårt supportteam.',
      thankYou: 'Takk for din tillit!',
    },
    fi: {
      preview: `Maksukuitti - Lasku ${invoiceNumber}`,
      title: 'Maksu vastaanotettu',
      greeting: `Hei ${firstName},`,
      body1: 'Kiitos maksustasi! Tämä sähköposti vahvistaa, että olemme vastaanottaneet maksusi.',
      invoiceDetails: 'Laskun tiedot',
      invoiceNumber: 'Laskunumero',
      date: 'Päivämäärä',
      amount: 'Summa',
      plan: 'Paketti',
      billingPeriod: 'Laskutuskausi',
      paymentMethod: 'Maksutapa',
      subtotal: 'Välisumma',
      tax: 'Vero',
      viewInvoice: 'Näytä lasku',
      questions: 'Kysymyksiä?',
      questionsText: 'Jos sinulla on kysymyksiä tästä laskusta, ota yhteyttä tukitiimiimme.',
      thankYou: 'Kiitos luottamuksestasi!',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <BaseLayout preview={t.preview} language={language}>
      <Heading style={heading}>{t.title}</Heading>
      <Text style={paragraph}>{t.greeting}</Text>
      <Text style={paragraph}>{t.body1}</Text>

      <Section style={invoiceBox}>
        <Heading as="h2" style={invoiceHeading}>
          {t.invoiceDetails}
        </Heading>

        <Section style={detailsTable}>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.invoiceNumber}:</Column>
            <Column style={valueColumn}>{invoiceNumber}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.date}:</Column>
            <Column style={valueColumn}>{date}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.plan}:</Column>
            <Column style={valueColumn}>{plan}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.billingPeriod}:</Column>
            <Column style={valueColumn}>{billingPeriod}</Column>
          </Row>
          <Row style={tableRow}>
            <Column style={labelColumn}>{t.paymentMethod}:</Column>
            <Column style={valueColumn}>{paymentMethod}</Column>
          </Row>
        </Section>

        <Hr style={totalDivider} />

        {hasTax ? (
          <>
            <Row style={tableRow}>
              <Column style={labelColumn}>{t.subtotal}:</Column>
              <Column style={valueColumn}>{formatCurrency(displaySubtotal, currency)}</Column>
            </Row>
            <Row style={tableRow}>
              <Column style={labelColumn}>{t.tax}:</Column>
              <Column style={valueColumn}>{formatCurrency(taxAmount!, currency)}</Column>
            </Row>
            <Hr style={totalDivider} />
            <Row style={totalRow}>
              <Column style={totalLabel}>{t.amount}:</Column>
              <Column style={totalValue}>{formatCurrency(amount, currency)}</Column>
            </Row>
          </>
        ) : (
          <Row style={totalRow}>
            <Column style={totalLabel}>{t.amount}:</Column>
            <Column style={totalValue}>{formatCurrency(amount, currency)}</Column>
          </Row>
        )}
      </Section>

      {invoiceUrl && (
        <Section style={buttonContainer}>
          <Button style={button} href={invoiceUrl}>
            {t.viewInvoice}
          </Button>
        </Section>
      )}

      <Hr style={hr} />

      <Heading as="h3" style={subheading}>
        {t.questions}
      </Heading>
      <Text style={paragraph}>{t.questionsText}</Text>
      <Text style={thankYouText}>{t.thankYou}</Text>
    </BaseLayout>
  );
};

export default PaymentReceiptEmail;

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

const invoiceBox = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '25px',
  margin: '30px 0',
};

const invoiceHeading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#1a1a1a',
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
  color: '#6c757d',
  width: '40%',
  verticalAlign: 'top' as const,
};

const valueColumn = {
  fontSize: '15px',
  color: '#1a1a1a',
  fontWeight: '500' as const,
  width: '60%',
};

const totalDivider = {
  borderColor: '#dee2e6',
  margin: '20px 0',
};

const totalRow = {
  marginTop: '15px',
};

const totalLabel = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a1a1a',
  width: '40%',
};

const totalValue = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#28a745',
  width: '60%',
  textAlign: 'right' as const,
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
