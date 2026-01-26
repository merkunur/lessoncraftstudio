import { google } from 'googleapis';

// Gmail API Configuration
const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
];

// Create OAuth2 client
export function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GMAIL_REDIRECT_URI || 'https://www.lessoncraftstudio.com/api/auth/gmail/callback';

  if (!clientId || !clientSecret) {
    throw new Error('Gmail OAuth credentials not configured');
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

// Generate OAuth URL for Gmail authorization
export function getGmailAuthUrl(state?: string): string {
  const oauth2Client = getOAuth2Client();

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
    prompt: 'consent', // Force consent to get refresh token
    state: state || '',
  });
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string) {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

// Refresh access token using refresh token
export async function refreshAccessToken(refreshToken: string) {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials;
}

// Get Gmail client with tokens
export function getGmailClient(accessToken: string, refreshToken?: string) {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

// Fetch email messages from inbox
export async function fetchInboxMessages(accessToken: string, refreshToken: string, maxResults = 50, query = 'is:unread') {
  const gmail = getGmailClient(accessToken, refreshToken);

  try {
    // List messages matching the query
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      q: query,
    });

    const messages = response.data.messages || [];
    const fullMessages = [];

    // Fetch full message details for each message
    for (const msg of messages) {
      if (msg.id) {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full',
        });
        fullMessages.push(fullMessage.data);
      }
    }

    return fullMessages;
  } catch (error) {
    console.error('Error fetching Gmail messages:', error);
    throw error;
  }
}

// Parse email message to extract relevant data
export interface ParsedEmail {
  messageId: string;
  threadId: string;
  from: string;
  fromName: string;
  subject: string;
  body: string;
  date: Date;
  isUnread: boolean;
}

export function parseGmailMessage(message: any): ParsedEmail {
  const headers = message.payload?.headers || [];
  const getHeader = (name: string) => headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

  const fromHeader = getHeader('From');
  // Parse "Name <email>" format
  const fromMatch = fromHeader.match(/^(.+?)\s*<(.+?)>$/);
  const fromName = fromMatch ? fromMatch[1].replace(/"/g, '').trim() : '';
  const fromEmail = fromMatch ? fromMatch[2] : fromHeader;

  // Get message body
  let body = '';
  if (message.payload) {
    body = extractMessageBody(message.payload);
  }

  // Check if unread
  const labels = message.labelIds || [];
  const isUnread = labels.includes('UNREAD');

  return {
    messageId: message.id,
    threadId: message.threadId,
    from: fromEmail,
    fromName: fromName || fromEmail.split('@')[0],
    subject: getHeader('Subject') || '(No Subject)',
    body: body,
    date: new Date(parseInt(message.internalDate) || Date.now()),
    isUnread,
  };
}

// Extract body from message parts (handles multipart emails)
function extractMessageBody(payload: any): string {
  let body = '';

  // Check if there's a direct body
  if (payload.body?.data) {
    body = decodeBase64Url(payload.body.data);
  }

  // Handle multipart messages
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        body = decodeBase64Url(part.body.data);
        break;
      }
      // Recursively check nested parts
      if (part.parts) {
        const nestedBody = extractMessageBody(part);
        if (nestedBody) {
          body = nestedBody;
          break;
        }
      }
    }

    // Fallback to HTML if no plain text
    if (!body) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/html' && part.body?.data) {
          body = stripHtmlTags(decodeBase64Url(part.body.data));
          break;
        }
      }
    }
  }

  return body.trim();
}

// Decode base64url encoding used by Gmail
function decodeBase64Url(data: string): string {
  try {
    // Convert base64url to base64
    const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
    // Decode
    return Buffer.from(base64, 'base64').toString('utf-8');
  } catch (error) {
    console.error('Error decoding base64:', error);
    return '';
  }
}

// Strip HTML tags for plain text extraction
function stripHtmlTags(html: string): string {
  // Remove style and script tags with content
  let text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Replace <br> and <p> with newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<p[^>]*>/gi, '');

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // Clean up whitespace
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}

// Mark message as read in Gmail
export async function markAsRead(accessToken: string, refreshToken: string, messageId: string) {
  const gmail = getGmailClient(accessToken, refreshToken);

  try {
    await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        removeLabelIds: ['UNREAD'],
      },
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
}

// Send reply email
export async function sendReply(
  accessToken: string,
  refreshToken: string,
  to: string,
  subject: string,
  body: string,
  threadId?: string
) {
  const gmail = getGmailClient(accessToken, refreshToken);

  // Build raw email message
  const email = [
    `To: ${to}`,
    `Subject: ${subject.startsWith('Re:') ? subject : `Re: ${subject}`}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    body,
  ].join('\r\n');

  // Encode to base64url
  const encodedEmail = Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
        threadId: threadId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending Gmail reply:', error);
    throw error;
  }
}

// Get user's email address
export async function getUserEmail(accessToken: string, refreshToken: string): Promise<string> {
  const gmail = getGmailClient(accessToken, refreshToken);

  try {
    const profile = await gmail.users.getProfile({ userId: 'me' });
    return profile.data.emailAddress || '';
  } catch (error) {
    console.error('Error getting user email:', error);
    throw error;
  }
}
