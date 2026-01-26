import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { fetchInboxMessages, parseGmailMessage, markAsRead, refreshAccessToken } from '@/lib/gmail';

// POST /api/gmail/sync - Sync Gmail messages to support tickets
export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    // Get Gmail token
    const gmailToken = await prisma.gmailToken.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!gmailToken) {
      return NextResponse.json(
        { error: 'Gmail not connected. Please connect Gmail first.' },
        { status: 400 }
      );
    }

    let accessToken = gmailToken.accessToken;
    let refreshToken = gmailToken.refreshToken;

    // Refresh token if expired
    if (new Date() > gmailToken.expiresAt) {
      console.log('Gmail token expired, refreshing...');
      try {
        const newTokens = await refreshAccessToken(refreshToken);
        accessToken = newTokens.access_token!;

        // Update token in database
        await prisma.gmailToken.update({
          where: { id: gmailToken.id },
          data: {
            accessToken: accessToken,
            expiresAt: new Date(Date.now() + (newTokens.expiry_date || 3600000)),
          },
        });
      } catch (refreshError) {
        console.error('Failed to refresh Gmail token:', refreshError);
        return NextResponse.json(
          { error: 'Gmail token expired. Please reconnect Gmail.' },
          { status: 401 }
        );
      }
    }

    // Fetch unread messages from inbox
    // Query for unread messages, excluding sent and drafts
    const query = 'is:unread -in:sent -in:drafts';
    const messages = await fetchInboxMessages(accessToken, refreshToken, 50, query);

    console.log(`Found ${messages.length} unread Gmail messages`);

    let imported = 0;
    let skipped = 0;

    for (const message of messages) {
      try {
        const parsed = parseGmailMessage(message);

        // Skip if already imported (check by Gmail message ID)
        const existing = await prisma.supportTicket.findUnique({
          where: { gmailMessageId: parsed.messageId },
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Skip emails from the support address itself (to avoid loops)
        if (parsed.from.toLowerCase() === gmailToken.email.toLowerCase()) {
          skipped++;
          continue;
        }

        // Auto-detect category from subject/content
        const category = detectCategory(parsed.subject, parsed.body);

        // Auto-detect priority from subject
        const priority = detectPriority(parsed.subject, parsed.body);

        // Create support ticket
        await prisma.supportTicket.create({
          data: {
            email: parsed.from,
            name: parsed.fromName || null,
            subject: parsed.subject,
            message: parsed.body || '(No message body)',
            category,
            priority,
            source: 'gmail',
            gmailMessageId: parsed.messageId,
            gmailThreadId: parsed.threadId,
            status: 'open',
          },
        });

        // Mark as read in Gmail
        try {
          await markAsRead(accessToken, refreshToken, parsed.messageId);
        } catch (markError) {
          console.error(`Failed to mark message ${parsed.messageId} as read:`, markError);
          // Don't fail the whole sync for this
        }

        imported++;
        console.log(`✅ Imported email from ${parsed.from}: ${parsed.subject}`);
      } catch (msgError) {
        console.error('Error processing message:', msgError);
        skipped++;
      }
    }

    // Update sync stats
    await prisma.gmailToken.update({
      where: { id: gmailToken.id },
      data: {
        lastSyncAt: new Date(),
        importedCount: { increment: imported },
      },
    });

    console.log(`📧 Gmail sync complete: ${imported} imported, ${skipped} skipped`);

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: messages.length,
    });
  } catch (error) {
    console.error('Error syncing Gmail:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: 'Failed to sync Gmail messages' }, { status: 500 });
  }
}

// Auto-detect category from email content
function detectCategory(subject: string, body: string): string {
  const text = `${subject} ${body}`.toLowerCase();

  if (text.includes('bug') || text.includes('error') || text.includes('broken') || text.includes('not working') || text.includes('doesn\'t work')) {
    return 'bug';
  }
  if (text.includes('feature') || text.includes('request') || text.includes('suggestion') || text.includes('would be nice') || text.includes('add')) {
    return 'feature_request';
  }
  if (text.includes('billing') || text.includes('payment') || text.includes('subscription') || text.includes('refund') || text.includes('charge') || text.includes('invoice')) {
    return 'billing';
  }
  if (text.includes('help') || text.includes('how to') || text.includes('cannot') || text.includes('can\'t')) {
    return 'technical';
  }
  if (text.includes('feedback') || text.includes('love') || text.includes('great') || text.includes('thanks')) {
    return 'feedback';
  }

  return 'general';
}

// Auto-detect priority from email content
function detectPriority(subject: string, body: string): string {
  const text = `${subject} ${body}`.toLowerCase();

  if (text.includes('urgent') || text.includes('asap') || text.includes('immediately') || text.includes('emergency')) {
    return 'urgent';
  }
  if (text.includes('important') || text.includes('critical') || text.includes('serious')) {
    return 'high';
  }
  if (text.includes('when you have time') || text.includes('no rush') || text.includes('minor')) {
    return 'low';
  }

  return 'medium';
}
