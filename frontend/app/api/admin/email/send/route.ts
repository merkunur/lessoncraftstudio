import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface EmailRequest {
  to: string | string[];
  templateId?: string;
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  variables?: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
  tags?: string[];
  scheduledFor?: string;
  trackOpens?: boolean;
  trackClicks?: boolean;
}

interface EmailResponse {
  id: string;
  status: 'sent' | 'scheduled' | 'failed';
  messageId?: string;
  scheduledFor?: string;
  error?: string;
}

// Mock email service - in production, integrate with SendGrid, AWS SES, etc.
class EmailService {
  async sendEmail(request: EmailRequest): Promise<EmailResponse> {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 500));

    // Random success/failure for demo
    const success = Math.random() > 0.1;

    if (success) {
      return {
        id: `email_${Date.now()}`,
        status: request.scheduledFor ? 'scheduled' : 'sent',
        messageId: `msg_${Math.random().toString(36).substr(2, 9)}`,
        scheduledFor: request.scheduledFor
      };
    } else {
      return {
        id: `email_${Date.now()}`,
        status: 'failed',
        error: 'Failed to send email: Connection timeout'
      };
    }
  }

  async sendBulkEmails(requests: EmailRequest[]): Promise<EmailResponse[]> {
    const results = await Promise.all(
      requests.map(req => this.sendEmail(req))
    );
    return results;
  }

  async getTemplate(templateId: string): Promise<any> {
    // Mock template fetching
    return {
      id: templateId,
      subject: 'Welcome to LessonCraftStudio, {{firstName}}!',
      htmlContent: '<html>...</html>',
      textContent: 'Welcome...',
      variables: ['firstName', 'activationLink']
    };
  }

  replaceVariables(content: string, variables: Record<string, any>): string {
    let result = content;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, String(value));
    });
    return result;
  }

  async trackEvent(eventType: 'open' | 'click', emailId: string, metadata?: any): Promise<void> {
    // Log tracking event
    console.log(`Email ${eventType} event:`, { emailId, metadata, timestamp: new Date() });
    // In production, save to database
  }
}

const emailService = new EmailService();

// POST /api/admin/email/send
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: EmailRequest = await request.json();

    // Validate required fields
    if (!data.to) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    // If using template
    let finalSubject = data.subject;
    let finalHtmlContent = data.htmlContent;
    let finalTextContent = data.textContent;

    if (data.templateId) {
      const template = await emailService.getTemplate(data.templateId);
      
      if (!finalSubject) finalSubject = template.subject;
      if (!finalHtmlContent) finalHtmlContent = template.htmlContent;
      if (!finalTextContent) finalTextContent = template.textContent;

      // Replace variables if provided
      if (data.variables) {
        finalSubject = emailService.replaceVariables(finalSubject || '', data.variables);
        finalHtmlContent = emailService.replaceVariables(finalHtmlContent || '', data.variables);
        finalTextContent = emailService.replaceVariables(finalTextContent || '', data.variables);
      }
    }

    if (!finalSubject || (!finalHtmlContent && !finalTextContent)) {
      return NextResponse.json(
        { error: 'Email must have subject and content' },
        { status: 400 }
      );
    }

    // Prepare email request
    const emailRequest: EmailRequest = {
      to: data.to,
      subject: finalSubject,
      htmlContent: finalHtmlContent,
      textContent: finalTextContent,
      attachments: data.attachments,
      tags: data.tags,
      scheduledFor: data.scheduledFor,
      trackOpens: data.trackOpens !== false,
      trackClicks: data.trackClicks !== false
    };

    // Send email
    const result = await emailService.sendEmail(emailRequest);

    // Log email activity
    console.log('Email sent:', {
      to: Array.isArray(data.to) ? data.to : [data.to],
      templateId: data.templateId,
      status: result.status,
      timestamp: new Date()
    });

    return NextResponse.json(result, { 
      status: result.status === 'failed' ? 500 : 200 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// POST /api/admin/email/send/bulk
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipients, templateId, variables }: {
      recipients: Array<{ email: string; variables?: Record<string, any> }>;
      templateId: string;
      variables?: Record<string, any>;
    } = await request.json();

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients provided' },
        { status: 400 }
      );
    }

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required for bulk emails' },
        { status: 400 }
      );
    }

    // Get template
    const template = await emailService.getTemplate(templateId);

    // Prepare email requests
    const emailRequests = recipients.map(recipient => ({
      to: recipient.email,
      templateId,
      variables: { ...variables, ...recipient.variables }
    }));

    // Send bulk emails
    const results = await emailService.sendBulkEmails(emailRequests);

    // Calculate statistics
    const stats = {
      total: results.length,
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
      scheduled: results.filter(r => r.status === 'scheduled').length
    };

    return NextResponse.json({
      stats,
      results: results.slice(0, 100) // Return first 100 results
    });
  } catch (error) {
    console.error('Error sending bulk emails:', error);
    return NextResponse.json(
      { error: 'Failed to send bulk emails' },
      { status: 500 }
    );
  }
}