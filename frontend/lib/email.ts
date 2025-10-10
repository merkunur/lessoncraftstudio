/**
 * Professional Email System
 * Uses queue for reliability, supports multiple providers
 */

import { render } from '@react-email/render';
import { queueEmail, sendEmailImmediate, type EmailJob } from './email/queue';
import { getEmailConfig, verifyEmailConnection } from './email/config';
import {
  VerificationEmail,
  PasswordResetEmail,
  WelcomeEmail,
  SubscriptionUpgradeEmail,
  PaymentReceiptEmail,
  FailedPaymentEmail,
  RefundConfirmationEmail,
} from './email/templates';
import PaymentFailedEmail from './email/templates/payment-failed-email';
import PaymentReminderEmail from './email/templates/payment-reminder-email';
import ServiceSuspendedEmail from './email/templates/service-suspended-email';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
  metadata?: Record<string, any>;
}

interface SendOptions {
  priority?: 'low' | 'normal' | 'high' | 'critical';
  immediate?: boolean; // Skip queue for critical emails
  retries?: number;
  sendAt?: Date;
}

/**
 * Send an email (queued by default for reliability)
 */
export async function sendEmail(
  options: EmailOptions,
  sendOptions: SendOptions = {}
): Promise<void> {
  const config = getEmailConfig();

  // If in console mode (development), just log
  if (config.provider === 'console') {
    console.log('[Email] Console mode - Email would be sent:', {
      to: options.to,
      subject: options.subject,
      preview: options.html.substring(0, 100) + '...',
    });
    return;
  }

  const emailJob: EmailJob = {
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
    attachments: options.attachments,
    metadata: options.metadata,
  };

  // Send immediately for critical emails
  if (sendOptions.immediate) {
    await sendEmailImmediate(emailJob);
    return;
  }

  // Queue for reliability
  await queueEmail(emailJob, {
    priority: sendOptions.priority,
    maxRetries: sendOptions.retries,
    sendAt: sendOptions.sendAt,
  });
}

/**
 * Verify email configuration is working
 */
export { verifyEmailConnection };

/**
 * Send verification email
 */
export async function sendVerificationEmail(params: {
  email: string;
  firstName: string;
  token: string;
  language: string;
}): Promise<void> {
  const { email, firstName, token, language } = params;

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: 'Verify Your Email - LessonCraftStudio',
    de: 'E-Mail bestätigen - LessonCraftStudio',
    fr: 'Vérifiez votre email - LessonCraftStudio',
    es: 'Verifica tu correo - LessonCraftStudio',
    sv: 'Verifiera din e-post - LessonCraftStudio',
    it: 'Verifica la tua email - LessonCraftStudio',
    pt: 'Verifique seu e-mail - LessonCraftStudio',
    nl: 'Verifieer uw e-mail - LessonCraftStudio',
    da: 'Bekræft din e-mail - LessonCraftStudio',
    no: 'Bekreft e-posten din - LessonCraftStudio',
    fi: 'Vahvista sähköpostisi - LessonCraftStudio',
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    VerificationEmail({
      firstName: firstName || 'there',
      verificationUrl,
      language,
    })
  );

  await sendEmail({
    to: email,
    subject,
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(params: {
  email: string;
  firstName: string;
  token: string;
  language: string;
}): Promise<void> {
  const { email, firstName, token, language } = params;

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: 'Password Reset Request - LessonCraftStudio',
    de: 'Passwort zurücksetzen - LessonCraftStudio',
    fr: 'Réinitialisation du mot de passe - LessonCraftStudio',
    es: 'Restablecer contraseña - LessonCraftStudio',
    sv: 'Återställ lösenord - LessonCraftStudio',
    it: 'Reimposta password - LessonCraftStudio',
    pt: 'Redefinir senha - LessonCraftStudio',
    nl: 'Wachtwoord opnieuw instellen - LessonCraftStudio',
    da: 'Nulstil adgangskode - LessonCraftStudio',
    no: 'Tilbakestill passord - LessonCraftStudio',
    fi: 'Palauta salasana - LessonCraftStudio',
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    PasswordResetEmail({
      firstName: firstName || 'there',
      resetUrl,
      language,
    })
  );

  await sendEmail({
    to: email,
    subject,
    html,
  });
}

/**
 * Send welcome email after successful verification
 */
export async function sendWelcomeEmail(params: {
  email: string;
  firstName: string;
  language: string;
  subscriptionTier: string;
}): Promise<void> {
  const { email, firstName, language, subscriptionTier } = params;

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: 'Welcome to LessonCraftStudio!',
    de: 'Willkommen bei LessonCraftStudio!',
    fr: 'Bienvenue chez LessonCraftStudio!',
    es: '¡Bienvenido a LessonCraftStudio!',
    sv: 'Välkommen till LessonCraftStudio!',
    it: 'Benvenuto su LessonCraftStudio!',
    pt: 'Bem-vindo ao LessonCraftStudio!',
    nl: 'Welkom bij LessonCraftStudio!',
    da: 'Velkommen til LessonCraftStudio!',
    no: 'Velkommen til LessonCraftStudio!',
    fi: 'Tervetuloa LessonCraftStudioon!',
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    WelcomeEmail({
      firstName,
      subscriptionTier,
      dashboardUrl,
      language,
    })
  );

  await sendEmail({
    to: email,
    subject,
    html,
  });
}

/**
 * Send subscription upgrade confirmation
 */
export async function sendSubscriptionUpgradeEmail(params: {
  email: string;
  firstName: string;
  language: string;
  oldPlan: string;
  newPlan: string;
}): Promise<void> {
  const { email, firstName, language, oldPlan, newPlan } = params;

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: 'Subscription Upgraded - LessonCraftStudio',
    de: 'Abonnement aktualisiert - LessonCraftStudio',
    fr: 'Abonnement mis à niveau - LessonCraftStudio',
    es: 'Suscripción actualizada - LessonCraftStudio',
    sv: 'Prenumeration uppgraderad - LessonCraftStudio',
    it: 'Abbonamento aggiornato - LessonCraftStudio',
    pt: 'Assinatura atualizada - LessonCraftStudio',
    nl: 'Abonnement bijgewerkt - LessonCraftStudio',
    da: 'Abonnement opgraderet - LessonCraftStudio',
    no: 'Abonnement oppgradert - LessonCraftStudio',
    fi: 'Tilaus päivitetty - LessonCraftStudio',
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    SubscriptionUpgradeEmail({
      firstName,
      oldPlan,
      newPlan,
      dashboardUrl,
      language,
    })
  );

  await sendEmail({
    to: email,
    subject,
    html,
  });
}

/**
 * Send payment receipt email
 */
export async function sendPaymentReceiptEmail(params: {
  email: string;
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
}): Promise<void> {
  const {
    email,
    firstName,
    invoiceNumber,
    amount,
    currency,
    date,
    plan,
    billingPeriod,
    paymentMethod,
    invoiceUrl,
    language = 'en',
  } = params;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: `Payment Receipt - Invoice ${invoiceNumber}`,
    de: `Zahlungsbestätigung - Rechnung ${invoiceNumber}`,
    fr: `Reçu de paiement - Facture ${invoiceNumber}`,
    es: `Recibo de pago - Factura ${invoiceNumber}`,
    sv: `Betalningskvitto - Faktura ${invoiceNumber}`,
    it: `Ricevuta di pagamento - Fattura ${invoiceNumber}`,
    pt: `Recibo de pagamento - Fatura ${invoiceNumber}`,
    nl: `Betalingsbewijs - Factuur ${invoiceNumber}`,
    da: `Betalingskvittering - Faktura ${invoiceNumber}`,
    no: `Betalingskvittering - Faktura ${invoiceNumber}`,
    fi: `Maksukuitti - Lasku ${invoiceNumber}`,
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    PaymentReceiptEmail({
      firstName,
      invoiceNumber,
      amount,
      currency,
      date,
      plan,
      billingPeriod,
      paymentMethod,
      invoiceUrl,
      language,
    })
  );

  await sendEmail(
    {
      to: email,
      subject,
      html,
    },
    { priority: 'high' }
  );
}

/**
 * Send failed payment notification
 */
export async function sendFailedPaymentEmail(params: {
  email: string;
  firstName: string;
  amount: number;
  currency: string;
  plan: string;
  failureReason?: string;
  retryDate?: string;
  updatePaymentUrl: string;
  language?: string;
}): Promise<void> {
  const {
    email,
    firstName,
    amount,
    currency,
    plan,
    failureReason,
    retryDate,
    updatePaymentUrl,
    language = 'en',
  } = params;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: 'Payment Failed - Action Required',
    de: 'Zahlung fehlgeschlagen - Aktion erforderlich',
    fr: 'Échec du paiement - Action requise',
    es: 'Pago fallido - Acción requerida',
    sv: 'Betalning misslyckades - Åtgärd krävs',
    it: 'Pagamento fallito - Azione richiesta',
    pt: 'Pagamento falhou - Ação necessária',
    nl: 'Betaling mislukt - Actie vereist',
    da: 'Betaling mislykkedes - Handling påkrævet',
    no: 'Betaling mislyktes - Handling påkrevd',
    fi: 'Maksu epäonnistui - Toimenpiteitä vaaditaan',
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    FailedPaymentEmail({
      firstName,
      amount,
      currency,
      plan,
      failureReason,
      retryDate,
      updatePaymentUrl,
      language,
    })
  );

  await sendEmail(
    {
      to: email,
      subject,
      html,
    },
    { priority: 'critical', immediate: true }
  );
}

/**
 * Send refund confirmation email
 */
export async function sendRefundConfirmationEmail(params: {
  email: string;
  firstName: string;
  refundAmount: number;
  currency: string;
  originalAmount: number;
  invoiceNumber: string;
  refundReason?: string;
  processingDays?: number;
  language?: string;
}): Promise<void> {
  const {
    email,
    firstName,
    refundAmount,
    currency,
    originalAmount,
    invoiceNumber,
    refundReason,
    processingDays = 7,
    language = 'en',
  } = params;

  // Language-specific subjects
  const subjects: Record<string, string> = {
    en: `Refund Processed - ${invoiceNumber}`,
    de: `Rückerstattung bearbeitet - ${invoiceNumber}`,
    fr: `Remboursement traité - ${invoiceNumber}`,
    es: `Reembolso procesado - ${invoiceNumber}`,
    sv: `Återbetalning behandlad - ${invoiceNumber}`,
    it: `Rimborso elaborato - ${invoiceNumber}`,
    pt: `Reembolso processado - ${invoiceNumber}`,
    nl: `Terugbetaling verwerkt - ${invoiceNumber}`,
    da: `Refusion behandlet - ${invoiceNumber}`,
    no: `Refusjon behandlet - ${invoiceNumber}`,
    fi: `Palautus käsitelty - ${invoiceNumber}`,
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    RefundConfirmationEmail({
      firstName,
      refundAmount,
      currency,
      originalAmount,
      invoiceNumber,
      refundReason,
      processingDays,
      language,
    })
  );

  await sendEmail(
    {
      to: email,
      subject,
      html,
    },
    { priority: 'high' }
  );
}
/**
 * Send payment failed email (dunning - first notification)
 */
export async function sendPaymentFailedEmail(params: {
  email: string;
  firstName: string;
  amount: number;
  currency: string;
  failureReason: string;
  updatePaymentUrl: string;
  nextRetryDate: string;
  language?: string;
}): Promise<void> {
  const {
    email,
    firstName,
    amount,
    currency,
    failureReason,
    updatePaymentUrl,
    nextRetryDate,
    language = "en",
  } = params;

  const subjects: Record<string, string> = {
    en: "Payment Failed - Action Required",
    de: "Zahlung fehlgeschlagen - Handlung erforderlich",
    fr: "Échec du paiement - Action requise",
    es: "Pago fallido - Acción requerida",
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    PaymentFailedEmail({
      firstName,
      amount,
      currency,
      failureReason,
      updatePaymentUrl,
      nextRetryDate,
      language,
    })
  );

  await sendEmail(
    {
      to: email,
      subject,
      html,
    },
    { priority: "critical", immediate: true }
  );
}

/**
 * Send payment reminder email (dunning - follow-up)
 */
export async function sendPaymentReminderEmail(params: {
  email: string;
  firstName: string;
  amount: number;
  currency: string;
  failureReason: string;
  updatePaymentUrl: string;
  daysUntilSuspension: number;
  language?: string;
}): Promise<void> {
  const {
    email,
    firstName,
    amount,
    currency,
    failureReason,
    updatePaymentUrl,
    daysUntilSuspension,
    language = "en",
  } = params;

  const subjects: Record<string, string> = {
    en: "Urgent: Payment Still Failed - Subscription at Risk",
    de: "Dringend: Zahlung immer noch fehlgeschlagen - Abonnement gefährdet",
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    PaymentReminderEmail({
      firstName,
      amount,
      currency,
      failureReason,
      updatePaymentUrl,
      daysUntilSuspension,
      language,
    })
  );

  await sendEmail(
    {
      to: email,
      subject,
      html,
    },
    { priority: "critical", immediate: true }
  );
}

/**
 * Send service suspended email
 */
export async function sendServiceSuspendedEmail(params: {
  email: string;
  firstName: string;
  suspensionDate: string;
  dataRetentionDays: number;
  updatePaymentUrl: string;
  language?: string;
}): Promise<void> {
  const {
    email,
    firstName,
    suspensionDate,
    dataRetentionDays,
    updatePaymentUrl,
    language = "en",
  } = params;

  const subjects: Record<string, string> = {
    en: "Service Suspended - Update Payment to Restore Access",
    de: "Service ausgesetzt - Zahlung aktualisieren",
  };

  const subject = subjects[language] || subjects.en;

  const html = await render(
    ServiceSuspendedEmail({
      firstName,
      suspensionDate,
      dataRetentionDays,
      updatePaymentUrl,
      language,
    })
  );

  await sendEmail(
    {
      to: email,
      subject,
      html,
    },
    { priority: "critical", immediate: true }
  );
}

