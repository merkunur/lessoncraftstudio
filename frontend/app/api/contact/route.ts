import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Map subject codes to readable text
    const subjectMap: Record<string, string> = {
      general: 'General Inquiry',
      support: 'Support Request',
      feedback: 'Feedback',
      partnership: 'Partnership Inquiry',
    };

    const subjectText = subjectMap[body.subject] || body.subject;

    // Create HTML email for support team
    const supportEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #2563eb;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: bold;
              color: #555;
              margin-bottom: 5px;
            }
            .field-value {
              padding: 10px;
              background-color: #f5f5f5;
              border-left: 3px solid #2563eb;
            }
            .message-box {
              padding: 15px;
              background-color: #f8f9fa;
              border: 1px solid #e0e0e0;
              border-radius: 5px;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>LessonCraftStudio</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">${body.name}</div>
              </div>

              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">
                  <a href="mailto:${body.email}">${body.email}</a>
                </div>
              </div>

              <div class="field">
                <div class="field-label">Subject:</div>
                <div class="field-value">${subjectText}</div>
              </div>

              <div class="field">
                <div class="field-label">Message:</div>
                <div class="message-box">${body.message}</div>
              </div>

              <div class="footer">
                <p>Received: ${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'long'
                })}</p>
                <p>Reply directly to this email to respond to ${body.name}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Create plain text version
    const supportEmailText = `
New Contact Form Submission - LessonCraftStudio

From: ${body.name}
Email: ${body.email}
Subject: ${subjectText}

Message:
${body.message}

---
Received: ${new Date().toLocaleString()}
Reply to: ${body.email}
    `;

    // Send email to support team
    await sendEmail(
      {
        to: process.env.EMAIL_REPLY_TO || 'support@lessoncraftstudio.com',
        subject: `Contact Form: ${subjectText} - from ${body.name}`,
        html: supportEmailHtml,
        text: supportEmailText,
        replyTo: body.email, // Allow direct reply to the user
        metadata: {
          source: 'contact_form',
          subject_type: body.subject,
          user_email: body.email,
        },
      },
      {
        priority: 'high', // Contact form submissions are high priority
      }
    );

    // Send confirmation email to user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #2563eb;
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 5px;
            }
            .content {
              background-color: #ffffff;
              padding: 30px;
              margin-top: 20px;
              border: 1px solid #e0e0e0;
              border-radius: 5px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Hi ${body.name},</p>

              <p>Thank you for reaching out to LessonCraftStudio. We've received your message regarding <strong>${subjectText}</strong> and will get back to you as soon as possible.</p>

              <p><strong>Your message:</strong></p>
              <p style="padding: 15px; background-color: #f8f9fa; border-left: 3px solid #2563eb; white-space: pre-wrap;">${body.message}</p>

              <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to email us directly at <a href="mailto:support@lessoncraftstudio.com">support@lessoncraftstudio.com</a>.</p>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://lessoncraftstudio.com'}/dashboard" class="button">Visit Your Dashboard</a>
              </div>

              <div class="footer">
                <p><strong>LessonCraftStudio Team</strong></p>
                <p>Creating better learning experiences, one worksheet at a time.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const confirmationText = `
Hi ${body.name},

Thank you for contacting LessonCraftStudio!

We've received your message regarding "${subjectText}" and will get back to you as soon as possible.

Your message:
${body.message}

We typically respond within 24-48 hours. If your inquiry is urgent, please email us directly at support@lessoncraftstudio.com.

Best regards,
LessonCraftStudio Team
    `;

    // Send confirmation to user (non-blocking)
    sendEmail(
      {
        to: body.email,
        subject: 'We received your message - LessonCraftStudio',
        html: confirmationHtml,
        text: confirmationText,
        metadata: {
          source: 'contact_confirmation',
          original_subject: body.subject,
        },
      },
      {
        priority: 'normal',
      }
    ).catch((error) => {
      // Log but don't fail if confirmation email fails
      console.error('Failed to send confirmation email:', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'Failed to send message. Please try again later or email us directly at support@lessoncraftstudio.com.'
      },
      { status: 500 }
    );
  }
}
