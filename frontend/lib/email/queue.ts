/**
 * Email Queue System
 * Handles email sending with retry logic and error handling
 * For production, consider using Bull/BullMQ with Redis for distributed queue
 */

import { prisma } from '@/lib/prisma';

export interface EmailJob {
  id?: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
  metadata?: Record<string, any>;
}

export interface EmailQueueOptions {
  priority?: 'low' | 'normal' | 'high' | 'critical';
  maxRetries?: number;
  retryDelay?: number; // in milliseconds
  sendAt?: Date; // Schedule for later
}

/**
 * In-memory queue for email jobs
 * For production, replace with Redis-backed queue (Bull/BullMQ)
 */
class EmailQueueManager {
  private queue: Array<{
    job: EmailJob;
    options: EmailQueueOptions;
    attempts: number;
    lastAttempt?: Date;
  }> = [];

  private processing = false;

  /**
 * Add email to queue
   */
  async add(job: EmailJob, options: EmailQueueOptions = {}): Promise<void> {
    const defaults: EmailQueueOptions = {
      priority: 'normal',
      maxRetries: 3,
      retryDelay: 60000, // 1 minute
    };

    const queueOptions = { ...defaults, ...options };

    this.queue.push({
      job,
      options: queueOptions,
      attempts: 0,
    });

    // Sort by priority
    this.queue.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
      return priorityOrder[a.options.priority || 'normal'] - priorityOrder[b.options.priority || 'normal'];
    });

    // Start processing if not already running
    if (!this.processing) {
      this.processQueue();
    }
  }

  /**
   * Process queued emails
   */
  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const item = this.queue[0];

      // Check if scheduled for later
      if (item.options.sendAt && item.options.sendAt > new Date()) {
        // Skip for now, will be processed later
        this.queue.shift();
        this.queue.push(item); // Move to end
        continue;
      }

      try {
        // Send email
        await this.sendEmail(item.job);

        // Remove from queue on success
        this.queue.shift();

        console.log(`[EmailQueue] Sent email to ${item.job.to}`);
      } catch (error) {
        console.error(`[EmailQueue] Failed to send email to ${item.job.to}:`, error);

        item.attempts++;
        item.lastAttempt = new Date();

        // Check if max retries reached
        if (item.attempts >= (item.options.maxRetries || 3)) {
          console.error(`[EmailQueue] Max retries reached for email to ${item.job.to}`);

          // Log failed email to database for manual review
          await this.logFailedEmail(item.job, error);

          // Remove from queue
          this.queue.shift();
        } else {
          // Schedule retry
          if (item.options.retryDelay) {
            item.options.sendAt = new Date(Date.now() + item.options.retryDelay);
          }

          // Move to end of queue
          this.queue.shift();
          this.queue.push(item);

          console.log(`[EmailQueue] Scheduled retry ${item.attempts}/${item.options.maxRetries} for ${item.job.to}`);
        }
      }

      // Small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.processing = false;
  }

  /**
   * Send email using transporter
   */
  private async sendEmail(job: EmailJob): Promise<void> {
    const { getEmailTransporter, getEmailConfig } = await import('./config');
    const transporter = getEmailTransporter();
    const config = getEmailConfig();

    const mailOptions = {
      from: job.from || `${config.from.name} <${config.from.email}>`,
      to: Array.isArray(job.to) ? job.to.join(', ') : job.to,
      replyTo: job.replyTo || config.replyTo,
      subject: job.subject,
      html: job.html,
      text: job.text || job.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      attachments: job.attachments,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log successful send (optional - could be noisy in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('[EmailQueue] Message sent:', info.messageId);
    }
  }

  /**
   * Log failed email to database for manual review
   */
  private async logFailedEmail(job: EmailJob, error: any): Promise<void> {
    try {
      // Store in database for admin review
      // You could create a FailedEmail model in Prisma for this
      console.error('[EmailQueue] Logging failed email:', {
        to: job.to,
        subject: job.subject,
        error: error.message,
        metadata: job.metadata,
      });

      // For now, just log to console
      // In production, store in database table
    } catch (logError) {
      console.error('[EmailQueue] Failed to log failed email:', logError);
    }
  }

  /**
   * Get queue status
   */
  getStatus(): {
    queueLength: number;
    processing: boolean;
  } {
    return {
      queueLength: this.queue.length,
      processing: this.processing,
    };
  }

  /**
   * Clear queue (for testing)
   */
  clear(): void {
    this.queue = [];
    this.processing = false;
  }
}

// Singleton instance
const emailQueue = new EmailQueueManager();

export default emailQueue;

/**
 * Helper function to queue an email
 */
export async function queueEmail(job: EmailJob, options?: EmailQueueOptions): Promise<void> {
  return emailQueue.add(job, options);
}

/**
 * Helper function to send email immediately (bypasses queue)
 * Use only for critical emails that must be sent synchronously
 */
export async function sendEmailImmediate(job: EmailJob): Promise<void> {
  const { getEmailTransporter, getEmailConfig } = await import('./config');
  const transporter = getEmailTransporter();
  const config = getEmailConfig();

  const mailOptions = {
    from: job.from || `${config.from.name} <${config.from.email}>`,
    to: Array.isArray(job.to) ? job.to.join(', ') : job.to,
    replyTo: job.replyTo || config.replyTo,
    subject: job.subject,
    html: job.html,
    text: job.text || job.html.replace(/<[^>]*>/g, ''),
    attachments: job.attachments,
  };

  await transporter.sendMail(mailOptions);
}
