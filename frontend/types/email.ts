// Email System type definitions

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description?: string;
  category: 'transactional' | 'marketing' | 'notification' | 'newsletter' | 'system';
  status: 'draft' | 'active' | 'archived';
  html: string;
  text?: string;
  mjml?: string; // MJML source for responsive emails
  variables: TemplateVariable[];
  preheader?: string;
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  locale?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
  testEmails?: string[];
  analytics?: {
    sent: number;
    opened: number;
    clicked: number;
    bounced: number;
    complained: number;
    unsubscribed: number;
  };
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  description?: string;
  required: boolean;
  defaultValue?: any;
  example?: any;
  format?: string; // For dates, numbers, etc.
}

export interface EmailCampaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  type: 'one-time' | 'recurring' | 'trigger-based' | 'drip';
  templateId: string;
  template?: EmailTemplate;
  audience: CampaignAudience;
  schedule?: {
    sendAt?: string;
    timezone?: string;
    recurring?: {
      frequency: 'daily' | 'weekly' | 'monthly';
      interval: number;
      endDate?: string;
    };
  };
  content: {
    subject: string;
    preheader?: string;
    personalizations?: Record<string, any>;
  };
  settings: {
    trackOpens: boolean;
    trackClicks: boolean;
    googleAnalytics?: string;
    utmParameters?: {
      source?: string;
      medium?: string;
      campaign?: string;
      term?: string;
      content?: string;
    };
  };
  stats: CampaignStats;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  sentAt?: string;
  completedAt?: string;
}

export interface CampaignAudience {
  type: 'all' | 'segment' | 'list' | 'custom';
  segmentId?: string;
  listId?: string;
  filters?: AudienceFilter[];
  excludeFilters?: AudienceFilter[];
  totalRecipients?: number;
  testGroup?: {
    enabled: boolean;
    percentage: number;
    winnerCriteria: 'opens' | 'clicks' | 'manual';
    testDuration: number; // hours
  };
}

export interface AudienceFilter {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
}

export interface CampaignStats {
  recipients: number;
  sent: number;
  delivered: number;
  opened: number;
  uniqueOpens: number;
  clicked: number;
  uniqueClicks: number;
  bounced: number;
  hardBounces: number;
  softBounces: number;
  complained: number;
  unsubscribed: number;
  openRate?: number;
  clickRate?: number;
  bounceRate?: number;
  complaintRate?: number;
  unsubscribeRate?: number;
}

export interface EmailMessage {
  id: string;
  messageId: string; // Provider's message ID
  campaignId?: string;
  templateId?: string;
  type: 'transactional' | 'campaign' | 'test';
  status: 'pending' | 'queued' | 'sending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'failed';
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  from: EmailAddress;
  replyTo?: EmailAddress;
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  metadata?: Record<string, any>;
  tags?: string[];
  variables?: Record<string, any>;
  tracking: {
    opens: boolean;
    clicks: boolean;
    pixel?: string;
  };
  events: EmailEvent[];
  createdAt: string;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  bouncedAt?: string;
  complainedAt?: string;
  provider: 'sendgrid' | 'mailgun' | 'ses' | 'postmark' | 'smtp';
  providerResponse?: any;
  error?: string;
}

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string; // Base64 encoded
  contentType: string;
  size: number;
  cid?: string; // For inline attachments
}

export interface EmailEvent {
  id: string;
  messageId: string;
  type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'unsubscribed' | 'failed';
  timestamp: string;
  recipient: string;
  metadata?: {
    ip?: string;
    userAgent?: string;
    location?: {
      country?: string;
      region?: string;
      city?: string;
    };
    device?: {
      type?: string;
      name?: string;
      os?: string;
      browser?: string;
    };
    url?: string; // For click events
    reason?: string; // For bounce/complaint events
  };
}

export interface EmailList {
  id: string;
  name: string;
  description?: string;
  type: 'manual' | 'dynamic' | 'imported';
  status: 'active' | 'archived';
  subscribers: number;
  activeSubscribers: number;
  unsubscribed: number;
  bounced: number;
  tags?: string[];
  fields: ListField[];
  importHistory?: ImportRecord[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ListField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  required: boolean;
  unique?: boolean;
}

export interface ImportRecord {
  id: string;
  filename: string;
  totalRecords: number;
  importedRecords: number;
  skippedRecords: number;
  errors: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  errorLog?: string[];
}

export interface EmailSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: 'active' | 'unsubscribed' | 'bounced' | 'complained' | 'pending';
  lists: string[];
  tags?: string[];
  customFields?: Record<string, any>;
  source?: string;
  ipAddress?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
    timezone?: string;
  };
  preferences?: {
    frequency?: 'immediate' | 'daily' | 'weekly' | 'monthly';
    categories?: string[];
    language?: string;
  };
  engagement?: {
    lastOpened?: string;
    lastClicked?: string;
    totalOpens?: number;
    totalClicks?: number;
    score?: number;
  };
  subscribedAt: string;
  unsubscribedAt?: string;
  bouncedAt?: string;
  complainedAt?: string;
  confirmedAt?: string;
  confirmationToken?: string;
  unsubscribeToken?: string;
}

export interface EmailAutomation {
  id: string;
  name: string;
  description?: string;
  trigger: AutomationTrigger;
  status: 'active' | 'paused' | 'draft' | 'archived';
  steps: AutomationStep[];
  stats: {
    entered: number;
    completed: number;
    active: number;
    stopped: number;
  };
  settings: {
    allowReentry: boolean;
    reentryDelay?: number; // hours
    timezone?: string;
    stopOnUnsubscribe: boolean;
  };
  createdAt: string;
  updatedAt: string;
  activatedAt?: string;
  pausedAt?: string;
}

export interface AutomationTrigger {
  type: 'signup' | 'tag_added' | 'tag_removed' | 'date_based' | 'activity' | 'webhook' | 'manual';
  conditions?: TriggerCondition[];
  settings?: Record<string, any>;
}

export interface TriggerCondition {
  field: string;
  operator: string;
  value: any;
  conjunction?: 'and' | 'or';
}

export interface AutomationStep {
  id: string;
  type: 'email' | 'delay' | 'condition' | 'action' | 'webhook';
  name: string;
  settings: Record<string, any>;
  nextSteps?: {
    default?: string;
    yes?: string; // For condition steps
    no?: string; // For condition steps
  };
}

export interface EmailProvider {
  id: string;
  name: string;
  type: 'sendgrid' | 'mailgun' | 'ses' | 'postmark' | 'smtp' | 'custom';
  status: 'active' | 'inactive' | 'error';
  isDefault: boolean;
  configuration: {
    apiKey?: string;
    apiSecret?: string;
    domain?: string;
    region?: string;
    host?: string;
    port?: number;
    secure?: boolean;
    username?: string;
    password?: string;
    fromEmail?: string;
    fromName?: string;
  };
  limits?: {
    daily?: number;
    hourly?: number;
    concurrent?: number;
  };
  stats?: {
    sent: number;
    delivered: number;
    bounced: number;
    complained: number;
  };
  webhooks?: {
    endpoint?: string;
    secret?: string;
    events?: string[];
  };
  lastChecked?: string;
  error?: string;
}

export interface EmailBounce {
  id: string;
  email: string;
  type: 'hard' | 'soft' | 'block' | 'technical';
  reason?: string;
  messageId?: string;
  campaignId?: string;
  provider?: string;
  providerCode?: string;
  permanent: boolean;
  timestamp: string;
  retryCount?: number;
  lastRetry?: string;
  resolved?: boolean;
  resolvedAt?: string;
}

export interface EmailComplaint {
  id: string;
  email: string;
  type: 'abuse' | 'fraud' | 'virus' | 'other';
  messageId?: string;
  campaignId?: string;
  provider?: string;
  feedbackLoop?: string;
  userAgent?: string;
  timestamp: string;
  resolved?: boolean;
  resolvedAt?: string;
  notes?: string;
}

export interface EmailSuppressionList {
  id: string;
  email: string;
  reason: 'bounced' | 'complained' | 'unsubscribed' | 'manual' | 'invalid';
  source?: string;
  permanent: boolean;
  addedAt: string;
  addedBy?: string;
  expiresAt?: string;
  notes?: string;
}

export interface EmailAnalytics {
  period: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  startDate: string;
  endDate: string;
  metrics: {
    sent: number;
    delivered: number;
    deliveryRate: number;
    opened: number;
    openRate: number;
    clicked: number;
    clickRate: number;
    clickToOpenRate: number;
    bounced: number;
    bounceRate: number;
    complained: number;
    complaintRate: number;
    unsubscribed: number;
    unsubscribeRate: number;
  };
  topPerformers: {
    campaigns?: Array<{ id: string; name: string; metric: number }>;
    templates?: Array<{ id: string; name: string; metric: number }>;
    subjects?: Array<{ subject: string; opens: number; clicks: number }>;
  };
  deviceStats?: {
    desktop: number;
    mobile: number;
    tablet: number;
    other: number;
  };
  clientStats?: {
    gmail: number;
    outlook: number;
    apple: number;
    yahoo: number;
    other: number;
  };
  geographic?: Array<{
    country: string;
    opens: number;
    clicks: number;
  }>;
  timeAnalysis?: Array<{
    hour: number;
    opens: number;
    clicks: number;
  }>;
}

export interface EmailDomain {
  id: string;
  domain: string;
  status: 'pending' | 'verified' | 'failed';
  type: 'sending' | 'tracking';
  dkim?: {
    status: 'pending' | 'verified' | 'failed';
    records: Array<{ name: string; value: string }>;
    verifiedAt?: string;
  };
  spf?: {
    status: 'pending' | 'verified' | 'failed';
    record: string;
    verifiedAt?: string;
  };
  dmarc?: {
    status: 'pending' | 'verified' | 'failed';
    record: string;
    policy?: 'none' | 'quarantine' | 'reject';
    verifiedAt?: string;
  };
  mx?: {
    status: 'pending' | 'verified' | 'failed';
    records: Array<{ priority: number; value: string }>;
    verifiedAt?: string;
  };
  cname?: {
    status: 'pending' | 'verified' | 'failed';
    records: Array<{ name: string; value: string }>;
    verifiedAt?: string;
  };
  createdAt: string;
  verifiedAt?: string;
  lastChecked?: string;
}

export interface EmailSettings {
  defaultProvider: string;
  defaultFromEmail: string;
  defaultFromName: string;
  defaultReplyTo?: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
  doubleOptIn: boolean;
  confirmationTemplate?: string;
  welcomeTemplate?: string;
  footerHtml?: string;
  footerText?: string;
  tracking: {
    opens: boolean;
    clicks: boolean;
    googleAnalytics?: string;
  };
  compliance: {
    gdpr: boolean;
    canSpam: boolean;
    casl: boolean;
    includeUnsubscribe: boolean;
    includeAddress: boolean;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  };
  limits: {
    dailySendLimit?: number;
    hourlySendLimit?: number;
    recipientLimit?: number;
    attachmentSizeLimit?: number;
  };
  testing: {
    testEmails: string[];
    sandboxMode: boolean;
    debugMode: boolean;
  };
}