/**
 * Email Campaign Integration
 * Connects campaign system with existing email infrastructure
 */

import prisma from './prisma';
import { sendEmail } from './email';

// Replace template variables
export function replaceVariables(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;

  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, variables[key] || '');
  });

  return result;
}

/**
 * Send email using a template
 */
export async function sendTemplateEmail(options: {
  to: string | string[];
  templateName: string;
  variables: Record<string, string>;
  userId?: string;
  campaignId?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { to, templateName, variables, userId, campaignId } = options;

    // Get template from database
    const template = await prisma.emailTemplate.findUnique({
      where: { name: templateName },
    });

    if (!template) {
      throw new Error(`Email template "${templateName}" not found`);
    }

    if (!template.active) {
      throw new Error(`Email template "${templateName}" is not active`);
    }

    // Replace variables in subject and content
    const subject = replaceVariables(template.subject, variables);
    const html = replaceVariables(template.htmlContent, variables);
    const text = template.textContent
      ? replaceVariables(template.textContent, variables)
      : undefined;

    // Get recipients list
    const recipients = Array.isArray(to) ? to : [to];

    // Send email to each recipient
    for (const recipient of recipients) {
      try {
        // Send via existing email system
        await sendEmail(
          {
            to: recipient,
            subject,
            html,
            text,
            metadata: { templateName, variables, userId, campaignId },
          },
          { priority: 'normal' }
        );

        // Log success to database
        await prisma.emailLog.create({
          data: {
            email: recipient,
            subject,
            type: campaignId ? 'campaign' : 'transactional',
            status: 'sent',
            userId: userId || null,
            campaignId: campaignId || null,
            sentAt: new Date(),
            metadata: { templateName, variables },
          },
        });
      } catch (error: any) {
        console.error(`Failed to send email to ${recipient}:`, error);

        // Log failure to database
        await prisma.emailLog.create({
          data: {
            email: recipient,
            subject,
            type: campaignId ? 'campaign' : 'transactional',
            status: 'failed',
            userId: userId || null,
            campaignId: campaignId || null,
            errorMessage: error?.message || 'Unknown error',
            metadata: { templateName, variables },
          },
        });
      }
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message };
  }
}

/**
 * Send a campaign to multiple recipients
 * Processes in batches to avoid rate limiting
 */
export async function sendCampaign(campaignId: string): Promise<{
  success: boolean;
  sentCount: number;
  failedCount: number;
  error?: string;
}> {
  try {
    // Get campaign
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
      throw new Error('Campaign has already been sent or is currently sending');
    }

    // Update campaign status to sending
    await prisma.emailCampaign.update({
      where: { id: campaignId },
      data: { status: 'sending' },
    });

    // Get target users
    const users = await getTargetUsers(campaign);

    if (users.length === 0) {
      await prisma.emailCampaign.update({
        where: { id: campaignId },
        data: {
          status: 'failed',
          errorMessage: 'No users match the targeting criteria',
        },
      });
      return { success: false, sentCount: 0, failedCount: 0, error: 'No target users' };
    }

    let sentCount = 0;
    let failedCount = 0;

    // Send emails in batches of 10
    const batchSize = 10;
    const batches = Math.ceil(users.length / batchSize);

    for (let i = 0; i < batches; i++) {
      const batchUsers = users.slice(i * batchSize, (i + 1) * batchSize);

      // Send emails in parallel within batch
      const results = await Promise.all(
        batchUsers.map(async (user) => {
          try {
            // Prepare variables
            const variables = {
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email,
              subscriptionTier: user.subscriptionTier,
            };

            const subject = replaceVariables(campaign.subject, variables);
            const html = replaceVariables(campaign.htmlContent, variables);
            const text = campaign.textContent
              ? replaceVariables(campaign.textContent, variables)
              : undefined;

            // Send via existing email system
            await sendEmail(
              {
                to: user.email,
                subject,
                html,
                text,
                metadata: { campaignName: campaign.name, campaignId: campaign.id },
              },
              { priority: 'normal' }
            );

            // Log success
            await prisma.emailLog.create({
              data: {
                email: user.email,
                subject,
                type: 'campaign',
                status: 'sent',
                userId: user.id,
                campaignId: campaign.id,
                sentAt: new Date(),
                metadata: { campaignName: campaign.name },
              },
            });

            return { success: true };
          } catch (error: any) {
            console.error(`Failed to send to ${user.email}:`, error);

            // Log failure
            await prisma.emailLog.create({
              data: {
                email: user.email,
                subject: campaign.subject,
                type: 'campaign',
                status: 'failed',
                userId: user.id,
                campaignId: campaign.id,
                errorMessage: error?.message || 'Unknown error',
                metadata: { campaignName: campaign.name },
              },
            });

            return { success: false };
          }
        })
      );

      // Count successes and failures
      results.forEach((result) => {
        if (result.success) {
          sentCount++;
        } else {
          failedCount++;
        }
      });

      // Update campaign progress
      await prisma.emailCampaign.update({
        where: { id: campaignId },
        data: {
          sentCount,
          failedCount,
        },
      });

      // Small delay between batches
      if (i < batches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Update campaign status to sent
    await prisma.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: 'sent',
        sentAt: new Date(),
        sentCount,
        failedCount,
        totalRecipients: users.length,
      },
    });

    console.log(
      `Campaign ${campaign.name} sent: ${sentCount} succeeded, ${failedCount} failed`
    );

    return {
      success: true,
      sentCount,
      failedCount,
    };
  } catch (error: any) {
    console.error('Campaign send error:', error);

    // Update campaign status to failed
    await prisma.emailCampaign.update({
      where: { id: campaignId },
      data: {
        status: 'failed',
        errorMessage: error?.message || 'Unknown error',
      },
    }).catch(() => {});

    return {
      success: false,
      sentCount: 0,
      failedCount: 0,
      error: error?.message || 'Failed to send campaign',
    };
  }
}

/**
 * Get target users for a campaign
 */
async function getTargetUsers(campaign: any) {
  const where: any = {};

  // Target by audience type
  if (campaign.targetAudience === 'custom' && campaign.customUserIds.length > 0) {
    where.id = { in: campaign.customUserIds };
  } else if (campaign.targetAudience !== 'all') {
    where.subscriptionTier = campaign.targetAudience;
  }

  // Filter by subscription tier if specified
  if (campaign.subscriptionTier) {
    where.subscriptionTier = campaign.subscriptionTier;
  }

  // Filter by subscription status if specified
  if (campaign.subscriptionStatus) {
    where.subscriptionStatus = campaign.subscriptionStatus;
  }

  // Get users
  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      subscriptionTier: true,
    },
  });

  return users;
}

/**
 * Send a test email
 */
export async function sendTestEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await sendEmail(
      {
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        metadata: { test: true },
      },
      { priority: 'normal' }
    );

    // Log to database
    await prisma.emailLog.create({
      data: {
        email: options.to,
        subject: options.subject,
        type: 'notification',
        status: 'sent',
        sentAt: new Date(),
        metadata: { test: true },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Test email error:', error);

    // Log failure
    await prisma.emailLog.create({
      data: {
        email: options.to,
        subject: options.subject,
        type: 'notification',
        status: 'failed',
        errorMessage: error?.message || 'Unknown error',
        metadata: { test: true },
      },
    });

    return { success: false, error: error?.message };
  }
}

/**
 * Update email log status (for webhooks)
 */
export async function updateEmailLogStatus(options: {
  email: string;
  subject: string;
  status: 'delivered' | 'opened' | 'clicked' | 'bounced' | 'spam';
  timestamp?: Date;
}) {
  const { email, subject, status, timestamp = new Date() } = options;

  // Find most recent matching email log
  const emailLog = await prisma.emailLog.findFirst({
    where: { email, subject },
    orderBy: { createdAt: 'desc' },
  });

  if (!emailLog) {
    console.warn(`Email log not found for: ${email} - ${subject}`);
    return null;
  }

  // Update status and timestamp
  const updateData: any = { status };

  switch (status) {
    case 'delivered':
      updateData.deliveredAt = timestamp;
      break;
    case 'opened':
      updateData.openedAt = timestamp;
      break;
    case 'clicked':
      updateData.clickedAt = timestamp;
      break;
    case 'bounced':
      updateData.bouncedAt = timestamp;
      break;
  }

  // Update email log
  const updated = await prisma.emailLog.update({
    where: { id: emailLog.id },
    data: updateData,
  });

  // If part of campaign, update campaign statistics
  if (emailLog.campaignId) {
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id: emailLog.campaignId },
    });

    if (campaign) {
      const updateCampaignData: any = {};

      if (status === 'delivered') {
        updateCampaignData.deliveredCount = campaign.deliveredCount + 1;
      } else if (status === 'opened') {
        updateCampaignData.openedCount = campaign.openedCount + 1;
      } else if (status === 'clicked') {
        updateCampaignData.clickedCount = campaign.clickedCount + 1;
      } else if (status === 'bounced') {
        updateCampaignData.bouncedCount = campaign.bouncedCount + 1;
      }

      await prisma.emailCampaign.update({
        where: { id: emailLog.campaignId },
        data: updateCampaignData,
      });
    }
  }

  return updated;
}
