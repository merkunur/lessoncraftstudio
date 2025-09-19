import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const { to, subject, html, text } = options;

  try {
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}

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
  };

  const subject = subjects[language] || subjects.en;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to LessonCraftStudio!</h1>
          <p>Hi ${firstName || 'there'},</p>
          <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" class="button">Verify Email</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <div class="footer">
            <p>If you didn't create an account with LessonCraftStudio, you can safely ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

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
  };

  const subject = subjects[language] || subjects.en;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background-color: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Request</h1>
          <p>Hi ${firstName || 'there'},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <div class="warning">
            <strong>Important:</strong> This link will expire in 1 hour for security reasons.
          </div>
          <p>If you didn't request this password reset, you can safely ignore this email. Your password won't be changed.</p>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

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
  };

  const subject = subjects[language] || subjects.en;

  const planDetails = {
    free: '5 worksheet generators',
    core: '15 worksheet generators',
    full: 'All 33 worksheet generators',
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .feature { margin: 10px 0; padding-left: 20px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to LessonCraftStudio!</h1>
          <p>Hi ${firstName},</p>
          <p>Your email has been verified and your account is now active!</p>
          
          <h2>Your ${subscriptionTier} Plan Includes:</h2>
          <ul>
            <li class="feature">${planDetails[subscriptionTier as keyof typeof planDetails]}</li>
            <li class="feature">Multi-language support (11 languages)</li>
            <li class="feature">Professional PDF and image exports</li>
            <li class="feature">Dynamic image library</li>
            ${subscriptionTier !== 'free' ? '<li class="feature">Priority support</li>' : ''}
          </ul>
          
          <p>Get started creating amazing worksheets:</p>
          <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
          
          <h3>Need Help?</h3>
          <p>Check out our help center or contact our support team if you have any questions.</p>
          
          <div class="footer">
            <p>Happy teaching!</p>
            <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

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
  };

  const subject = subjects[language] || subjects.en;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .upgrade-box { background-color: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Subscription Upgraded!</h1>
          <p>Hi ${firstName},</p>
          
          <div class="upgrade-box">
            <h3>🎉 Congratulations!</h3>
            <p>Your subscription has been upgraded from <strong>${oldPlan}</strong> to <strong>${newPlan}</strong>.</p>
          </div>
          
          <p>You now have access to more amazing features. Start exploring your new capabilities:</p>
          <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
          
          <p>Thank you for choosing LessonCraftStudio!</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject,
    html,
  });
}