import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/types/email';
import { validateEmailTemplate } from '@/lib/email-utils';

// Mock data for development
const mockTemplates: EmailTemplate[] = [
  {
    id: 'temp_welcome',
    name: 'Welcome Email',
    subject: 'Welcome to {{appName}}!',
    description: 'Sent to new users after registration',
    category: 'transactional',
    status: 'active',
    html: `
      <h1>Welcome to {{appName}}, {{firstName}}!</h1>
      <p>We're excited to have you on board.</p>
      <p>Get started by exploring our features:</p>
      <ul>
        <li>Create your first worksheet</li>
        <li>Browse our template library</li>
        <li>Customize your settings</li>
      </ul>
      <a href="{{ctaUrl}}">Get Started</a>
    `,
    text: 'Welcome to {{appName}}, {{firstName}}! Get started at {{ctaUrl}}',
    variables: [
      { name: 'appName', type: 'string', required: true, defaultValue: 'LessonCraftStudio' },
      { name: 'firstName', type: 'string', required: true, defaultValue: '' },
      { name: 'ctaUrl', type: 'string', required: true, defaultValue: 'https://app.lessoncraftstudio.com' }
    ],
    fromName: 'LessonCraftStudio',
    fromEmail: 'hello@lessoncraftstudio.com',
    tags: ['onboarding', 'welcome'],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 2,
    analytics: {
      sent: 1234,
      opened: 890,
      clicked: 456,
      bounced: 12,
      complained: 2,
      unsubscribed: 5
    }
  },
  {
    id: 'temp_newsletter',
    name: 'Monthly Newsletter',
    subject: '{{monthName}} Newsletter: New Features & Updates',
    description: 'Monthly product updates and educational content',
    category: 'newsletter',
    status: 'active',
    html: `
      <h1>{{monthName}} Newsletter</h1>
      <h2>What's New</h2>
      <p>{{updates}}</p>
      <h2>Featured Worksheets</h2>
      <p>{{featured}}</p>
      <h2>Tips & Tricks</h2>
      <p>{{tips}}</p>
    `,
    variables: [
      { name: 'monthName', type: 'string', required: true, defaultValue: '' },
      { name: 'updates', type: 'string', required: true, defaultValue: '' },
      { name: 'featured', type: 'string', required: true, defaultValue: '' },
      { name: 'tips', type: 'string', required: true, defaultValue: '' }
    ],
    fromName: 'LessonCraftStudio Team',
    fromEmail: 'newsletter@lessoncraftstudio.com',
    tags: ['newsletter', 'monthly'],
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    analytics: {
      sent: 5678,
      opened: 3456,
      clicked: 1234,
      bounced: 45,
      complained: 8,
      unsubscribed: 23
    }
  },
  {
    id: 'temp_password_reset',
    name: 'Password Reset',
    subject: 'Reset Your Password',
    description: 'Password reset request',
    category: 'transactional',
    status: 'active',
    html: `
      <h1>Password Reset Request</h1>
      <p>Hi {{firstName}},</p>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <a href="{{resetUrl}}">Reset Password</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    variables: [
      { name: 'firstName', type: 'string', required: true, defaultValue: '' },
      { name: 'resetUrl', type: 'string', required: true, defaultValue: '' }
    ],
    fromName: 'LessonCraftStudio Security',
    fromEmail: 'security@lessoncraftstudio.com',
    tags: ['security', 'password'],
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    analytics: {
      sent: 234,
      opened: 180,
      clicked: 156,
      bounced: 2,
      complained: 0,
      unsubscribed: 0
    }
  }
];

// GET /api/emails/templates
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let templates = [...mockTemplates];

    // Filter by category
    if (category) {
      templates = templates.filter(t => t.category === category);
    }

    // Filter by status
    if (status) {
      templates = templates.filter(t => t.status === status);
    }

    // Search by name or subject
    if (search) {
      const searchLower = search.toLowerCase();
      templates = templates.filter(t => 
        t.name.toLowerCase().includes(searchLower) ||
        t.subject.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Failed to get email templates:', error);
    return NextResponse.json(
      { error: 'Failed to get email templates' },
      { status: 500 }
    );
  }
}

// POST /api/emails/templates
export async function POST(request: NextRequest) {
  try {
    const template: EmailTemplate = await request.json();
    
    // Validate template
    const validation = validateEmailTemplate(template);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid template', errors: validation.errors },
        { status: 400 }
      );
    }

    // Generate ID and timestamps
    template.id = `temp_${Date.now()}`;
    template.createdAt = new Date().toISOString();
    template.updatedAt = new Date().toISOString();
    template.version = 1;

    // In production, save to database
    console.log('Creating template:', template);

    return NextResponse.json({
      success: true,
      template,
      message: 'Template created successfully'
    });
  } catch (error) {
    console.error('Failed to create email template:', error);
    return NextResponse.json(
      { error: 'Failed to create email template' },
      { status: 500 }
    );
  }
}