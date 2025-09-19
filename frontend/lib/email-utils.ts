import {
  EmailTemplate,
  EmailCampaign,
  EmailMessage,
  EmailEvent,
  EmailAddress,
  EmailSubscriber,
  EmailAnalytics,
  CampaignStats,
  EmailProvider,
  EmailSettings,
  TemplateVariable,
  EmailAutomation,
  AutomationStep
} from '@/types/email';

export function formatEmailAddress(address: EmailAddress): string {
  if (address.name) {
    return `${address.name} <${address.email}>`;
  }
  return address.email;
}

export function parseEmailAddress(str: string): EmailAddress {
  const match = str.match(/^(.+?)\s*<(.+?)>$/);
  if (match) {
    return { name: match[1].trim(), email: match[2].trim() };
  }
  return { email: str.trim() };
}

export function interpolateTemplate(
  template: string,
  variables: Record<string, any>
): string {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const patterns = [
      new RegExp(`{{\\s*${key}\\s*}}`, 'g'),
      new RegExp(`\\[\\[${key}\\]\\]`, 'g'),
      new RegExp(`\\$\\{${key}\\}`, 'g')
    ];
    
    patterns.forEach(pattern => {
      result = result.replace(pattern, String(value));
    });
  });
  
  return result;
}

export function validateEmailTemplate(
  template: EmailTemplate
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!template.subject) {
    errors.push('Subject is required');
  }
  
  if (!template.html && !template.text) {
    errors.push('Either HTML or text content is required');
  }
  
  if (!template.fromEmail || !isValidEmail(template.fromEmail)) {
    errors.push('Valid from email is required');
  }
  
  template.variables?.forEach(variable => {
    if (variable.required && !variable.defaultValue) {
      const htmlHasVar = template.html?.includes(`{{${variable.name}}}`);
      const textHasVar = template.text?.includes(`{{${variable.name}}}`);
      
      if (!htmlHasVar && !textHasVar) {
        errors.push(`Required variable '${variable.name}' not used in template`);
      }
    }
  });
  
  const unusedVars = findUnusedVariables(template);
  if (unusedVars.length > 0) {
    errors.push(`Unused variables: ${unusedVars.join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function findUnusedVariables(template: EmailTemplate): string[] {
  const content = (template.html || '') + (template.text || '');
  const unused: string[] = [];
  
  template.variables?.forEach(variable => {
    if (!content.includes(`{{${variable.name}}}`) &&
        !content.includes(`[[${variable.name}]]`) &&
        !content.includes(`\${${variable.name}}}`)) {
      unused.push(variable.name);
    }
  });
  
  return unused;
}

export function extractVariables(content: string): string[] {
  const variables = new Set<string>();
  
  const patterns = [
    /{{\s*([^}]+)\s*}}/g,
    /\[\[([^\]]+)\]\]/g,
    /\$\{([^}]+)\}/g
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      variables.add(match[1].trim());
    }
  });
  
  return Array.from(variables);
}

export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export function calculateEmailStats(
  events: EmailEvent[]
): CampaignStats {
  const stats: CampaignStats = {
    recipients: 0,
    sent: 0,
    delivered: 0,
    opened: 0,
    uniqueOpens: 0,
    clicked: 0,
    uniqueClicks: 0,
    bounced: 0,
    hardBounces: 0,
    softBounces: 0,
    complained: 0,
    unsubscribed: 0
  };
  
  const uniqueOpeners = new Set<string>();
  const uniqueClickers = new Set<string>();
  
  events.forEach(event => {
    switch (event.type) {
      case 'sent':
        stats.sent++;
        stats.recipients++;
        break;
      case 'delivered':
        stats.delivered++;
        break;
      case 'opened':
        stats.opened++;
        uniqueOpeners.add(event.recipient);
        break;
      case 'clicked':
        stats.clicked++;
        uniqueClickers.add(event.recipient);
        break;
      case 'bounced':
        stats.bounced++;
        if (event.metadata?.reason?.includes('hard')) {
          stats.hardBounces++;
        } else {
          stats.softBounces++;
        }
        break;
      case 'complained':
        stats.complained++;
        break;
      case 'unsubscribed':
        stats.unsubscribed++;
        break;
    }
  });
  
  stats.uniqueOpens = uniqueOpeners.size;
  stats.uniqueClicks = uniqueClickers.size;
  
  if (stats.sent > 0) {
    stats.openRate = (stats.uniqueOpens / stats.sent) * 100;
    stats.clickRate = (stats.uniqueClicks / stats.sent) * 100;
    stats.bounceRate = (stats.bounced / stats.sent) * 100;
    stats.complaintRate = (stats.complained / stats.sent) * 100;
    stats.unsubscribeRate = (stats.unsubscribed / stats.sent) * 100;
  }
  
  return stats;
}

export function generateTrackingPixel(messageId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/api/emails/track/open?id=${messageId}`;
}

export function wrapLinksForTracking(
  content: string,
  messageId: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  return content.replace(
    /<a\s+([^>]*href=["']?)([^"'\s>]+)(["']?[^>]*)>/gi,
    (match, before, url, after) => {
      if (url.startsWith('#') || url.startsWith('mailto:')) {
        return match;
      }
      
      const trackUrl = `${baseUrl}/api/emails/track/click?id=${messageId}&url=${encodeURIComponent(url)}`;
      return `<a ${before}${trackUrl}${after}>`;
    }
  );
}

export function addUnsubscribeLink(
  content: string,
  subscriberId: string,
  token: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const unsubscribeUrl = `${baseUrl}/unsubscribe?id=${subscriberId}&token=${token}`;
  
  const unsubscribeHtml = `
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
      <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe</a> |
      <a href="${baseUrl}/preferences?id=${subscriberId}&token=${token}" style="color: #666; text-decoration: underline;">Update Preferences</a>
    </div>
  `;
  
  if (content.includes('</body>')) {
    return content.replace('</body>', `${unsubscribeHtml}</body>`);
  }
  
  return content + unsubscribeHtml;
}

export function calculateSendTime(
  timezone: string,
  preferredHour: number = 10
): Date {
  const now = new Date();
  const targetTime = new Date();
  
  targetTime.setHours(preferredHour, 0, 0, 0);
  
  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  
  const offset = getTimezoneOffset(timezone);
  targetTime.setHours(targetTime.getHours() - offset);
  
  return targetTime;
}

function getTimezoneOffset(timezone: string): number {
  const offsets: Record<string, number> = {
    'UTC': 0,
    'EST': -5,
    'CST': -6,
    'MST': -7,
    'PST': -8,
    'CET': 1,
    'JST': 9,
    'AEST': 10
  };
  
  return offsets[timezone] || 0;
}

export function segmentSubscribers(
  subscribers: EmailSubscriber[],
  criteria: {
    tags?: string[];
    status?: string;
    engagementLevel?: 'high' | 'medium' | 'low';
    location?: { country?: string; region?: string };
    lastActivityDays?: number;
  }
): EmailSubscriber[] {
  return subscribers.filter(subscriber => {
    if (criteria.tags?.length) {
      const hasTag = criteria.tags.some(tag => 
        subscriber.tags?.includes(tag)
      );
      if (!hasTag) return false;
    }
    
    if (criteria.status && subscriber.status !== criteria.status) {
      return false;
    }
    
    if (criteria.engagementLevel) {
      const score = subscriber.engagement?.score || 0;
      const levels = { high: 70, medium: 40, low: 0 };
      const minScore = levels[criteria.engagementLevel];
      if (score < minScore) return false;
    }
    
    if (criteria.location) {
      if (criteria.location.country &&
          subscriber.location?.country !== criteria.location.country) {
        return false;
      }
      if (criteria.location.region &&
          subscriber.location?.region !== criteria.location.region) {
        return false;
      }
    }
    
    if (criteria.lastActivityDays) {
      const lastActivity = subscriber.engagement?.lastOpened ||
                          subscriber.engagement?.lastClicked ||
                          subscriber.subscribedAt;
      
      if (!lastActivity) return false;
      
      const daysSince = Math.floor(
        (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSince > criteria.lastActivityDays) return false;
    }
    
    return true;
  });
}

export function calculateEngagementScore(
  subscriber: EmailSubscriber
): number {
  let score = 50;
  
  const opens = subscriber.engagement?.totalOpens || 0;
  const clicks = subscriber.engagement?.totalClicks || 0;
  
  score += Math.min(opens * 2, 30);
  score += Math.min(clicks * 5, 40);
  
  if (subscriber.engagement?.lastOpened) {
    const daysSince = Math.floor(
      (Date.now() - new Date(subscriber.engagement.lastOpened).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSince <= 7) score += 10;
    else if (daysSince <= 30) score += 5;
    else if (daysSince > 90) score -= 20;
  }
  
  if (subscriber.status === 'unsubscribed') score = 0;
  if (subscriber.status === 'bounced') score = 0;
  if (subscriber.status === 'complained') score = 0;
  
  return Math.max(0, Math.min(100, score));
}

export function getOptimalSendTime(
  analytics: EmailAnalytics
): { hour: number; day: string } {
  if (!analytics.timeAnalysis?.length) {
    return { hour: 10, day: 'Tuesday' };
  }
  
  const bestHour = analytics.timeAnalysis.reduce((best, current) => {
    const currentScore = current.opens + current.clicks * 2;
    const bestScore = best.opens + best.clicks * 2;
    return currentScore > bestScore ? current : best;
  });
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const bestDay = 'Tuesday';
  
  return { hour: bestHour.hour, day: bestDay };
}

export function validateAutomationWorkflow(
  automation: EmailAutomation
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!automation.trigger) {
    errors.push('Automation must have a trigger');
  }
  
  if (!automation.steps || automation.steps.length === 0) {
    errors.push('Automation must have at least one step');
  }
  
  const stepIds = new Set(automation.steps?.map(s => s.id));
  
  automation.steps?.forEach(step => {
    if (step.type === 'condition') {
      if (!step.nextSteps?.yes || !step.nextSteps?.no) {
        errors.push(`Condition step '${step.name}' must have both yes and no paths`);
      }
      
      if (step.nextSteps?.yes && !stepIds.has(step.nextSteps.yes)) {
        errors.push(`Invalid next step reference in '${step.name}'`);
      }
      
      if (step.nextSteps?.no && !stepIds.has(step.nextSteps.no)) {
        errors.push(`Invalid next step reference in '${step.name}'`);
      }
    }
    
    if (step.type === 'email' && !step.settings?.templateId) {
      errors.push(`Email step '${step.name}' must have a template`);
    }
    
    if (step.type === 'delay' && !step.settings?.duration) {
      errors.push(`Delay step '${step.name}' must have a duration`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function generatePreheader(
  subject: string,
  content: string,
  maxLength: number = 150
): string {
  const textContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (textContent.startsWith(subject)) {
    return textContent.substring(subject.length).trim().substring(0, maxLength);
  }
  
  return textContent.substring(0, maxLength);
}

export function convertMJMLtoHTML(mjml: string): string {
  console.log('MJML conversion would happen here');
  return '<html><body>MJML converted content</body></html>';
}

export function estimateDeliveryTime(
  recipientCount: number,
  provider: EmailProvider
): number {
  const baseRate = 100;
  
  let rate = baseRate;
  
  switch (provider.type) {
    case 'sendgrid':
      rate = 500;
      break;
    case 'ses':
      rate = 200;
      break;
    case 'mailgun':
      rate = 300;
      break;
    case 'smtp':
      rate = 50;
      break;
  }
  
  if (provider.limits?.concurrent) {
    rate = Math.min(rate, provider.limits.concurrent);
  }
  
  return Math.ceil(recipientCount / rate) * 60;
}

export function generateUTMParameters(
  campaign: EmailCampaign
): string {
  const params = new URLSearchParams();
  
  const utm = campaign.settings?.utmParameters;
  if (utm) {
    if (utm.source) params.set('utm_source', utm.source);
    if (utm.medium) params.set('utm_medium', utm.medium);
    if (utm.campaign) params.set('utm_campaign', utm.campaign);
    if (utm.term) params.set('utm_term', utm.term);
    if (utm.content) params.set('utm_content', utm.content);
  } else {
    params.set('utm_source', 'email');
    params.set('utm_medium', 'campaign');
    params.set('utm_campaign', campaign.id);
  }
  
  return params.toString();
}

export function shouldRetryBounce(
  bounceType: string,
  retryCount: number
): boolean {
  if (bounceType === 'hard') return false;
  if (retryCount >= 3) return false;
  
  const softBounceReasons = [
    'mailbox_full',
    'temporary_failure',
    'dns_failure',
    'message_too_large'
  ];
  
  return softBounceReasons.some(reason => 
    bounceType.toLowerCase().includes(reason)
  );
}

export function formatEmailStats(
  stats: CampaignStats
): string {
  const lines = [
    `Sent: ${stats.sent.toLocaleString()}`,
    `Delivered: ${stats.delivered.toLocaleString()} (${stats.delivered ? Math.round(stats.delivered / stats.sent * 100) : 0}%)`,
    `Opens: ${stats.uniqueOpens.toLocaleString()} unique (${stats.openRate?.toFixed(1)}%)`,
    `Clicks: ${stats.uniqueClicks.toLocaleString()} unique (${stats.clickRate?.toFixed(1)}%)`,
    `Bounced: ${stats.bounced.toLocaleString()} (${stats.bounceRate?.toFixed(1)}%)`,
    `Unsubscribed: ${stats.unsubscribed.toLocaleString()} (${stats.unsubscribeRate?.toFixed(1)}%)`
  ];
  
  return lines.join('\n');
}

export function getEmailProviderStatus(
  provider: EmailProvider
): 'healthy' | 'degraded' | 'down' {
  if (provider.status === 'error') return 'down';
  if (provider.status === 'inactive') return 'down';
  
  if (provider.lastChecked) {
    const hoursSince = (Date.now() - new Date(provider.lastChecked).getTime()) / (1000 * 60 * 60);
    if (hoursSince > 24) return 'degraded';
  }
  
  if (provider.stats) {
    const deliveryRate = provider.stats.delivered / provider.stats.sent;
    if (deliveryRate < 0.95) return 'degraded';
    
    const bounceRate = provider.stats.bounced / provider.stats.sent;
    if (bounceRate > 0.05) return 'degraded';
  }
  
  return 'healthy';
}