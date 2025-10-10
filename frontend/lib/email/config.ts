/**
 * Email Configuration and Provider Setup
 * Supports multiple email providers (SendGrid, AWS SES, Postmark, SMTP)
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export type EmailProvider = 'sendgrid' | 'ses' | 'smtp' | 'postmark' | 'console';

export interface EmailConfig {
  provider: EmailProvider;
  from: {
    email: string;
    name: string;
  };
  replyTo?: string;
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

/**
 * Get email configuration from environment variables
 */
export function getEmailConfig(): EmailConfig {
  const provider = (process.env.EMAIL_PROVIDER || 'console') as EmailProvider;

  const config: EmailConfig = {
    provider,
    from: {
      email: process.env.SMTP_FROM_EMAIL || process.env.EMAIL_FROM_ADDRESS || 'noreply@lessoncraftstudio.com',
      name: process.env.SMTP_FROM_NAME || process.env.EMAIL_FROM_NAME || 'LessonCraftStudio',
    },
    replyTo: process.env.EMAIL_REPLY_TO,
  };

  // SMTP configuration (works with all providers)
  if (provider !== 'console') {
    config.smtp = {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
      },
    };
  }

  return config;
}

/**
 * Create email transporter based on configuration
 */
let transporter: Transporter | null = null;

export function getEmailTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  const config = getEmailConfig();

  // Console mode for development
  if (config.provider === 'console') {
    console.log('[Email] Using console mode (development)');
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
    return transporter;
  }

  // Production SMTP transporter
  if (!config.smtp) {
    throw new Error('SMTP configuration is missing. Check your environment variables.');
  }

  console.log(`[Email] Configuring ${config.provider} transporter`);
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.auth.user,
      pass: config.smtp.auth.pass,
    },
    // Connection pool for better performance
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    // Retry configuration
    rateDelta: 1000,
    rateLimit: 5,
  });

  return transporter;
}

/**
 * Verify SMTP connection
 */
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    const transport = getEmailTransporter();
    await transport.verify();
    console.log('[Email] SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('[Email] SMTP connection failed:', error);
    return false;
  }
}

/**
 * Get email provider info for logging/debugging
 */
export function getEmailProviderInfo(): {
  provider: EmailProvider;
  host?: string;
  fromEmail: string;
  configured: boolean;
} {
  const config = getEmailConfig();

  return {
    provider: config.provider,
    host: config.smtp?.host,
    fromEmail: config.from.email,
    configured: config.provider !== 'console' && !!config.smtp?.host,
  };
}
