// Help System type definitions

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'worksheets' | 'advanced' | 'admin' | 'troubleshooting';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  steps: TutorialStep[];
  prerequisites?: string[]; // tutorial IDs
  tags: string[];
  videoUrl?: string;
  interactive: boolean;
  progress?: UserProgress;
  createdAt: string;
  updatedAt: string;
  author: string;
  rating?: number;
  completions: number;
}

export interface TutorialStep {
  id: string;
  order: number;
  title: string;
  content: string;
  type: 'instruction' | 'action' | 'validation' | 'quiz';
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: {
    type: 'click' | 'input' | 'navigate' | 'wait';
    value?: any;
    selector?: string;
  };
  validation?: {
    type: 'element' | 'value' | 'url' | 'custom';
    condition: string;
    errorMessage?: string;
  };
  quiz?: QuizQuestion;
  hint?: string;
  skipable: boolean;
}

export interface QuizQuestion {
  question: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points?: number;
}

export interface UserProgress {
  tutorialId: string;
  userId: string;
  currentStep: number;
  completedSteps: number[];
  startedAt: string;
  completedAt?: string;
  quizScore?: number;
  attempts: number;
  bookmarked: boolean;
}

export interface ContextHelp {
  id: string;
  pageId: string;
  elementSelector?: string;
  title: string;
  content: string;
  type: 'tooltip' | 'popover' | 'modal' | 'inline';
  trigger: 'hover' | 'click' | 'focus' | 'manual';
  position: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  showOnFirstVisit?: boolean;
  dismissible: boolean;
  links?: HelpLink[];
  relatedTutorials?: string[];
  relatedArticles?: string[];
  videoUrl?: string;
}

export interface HelpLink {
  text: string;
  url: string;
  type: 'internal' | 'external' | 'tutorial' | 'video' | 'article';
  icon?: string;
}

export interface VideoGuide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  embedUrl?: string;
  duration: number; // seconds
  category: string;
  tags: string[];
  transcript?: string;
  chapters?: VideoChapter[];
  relatedVideos?: string[];
  views: number;
  likes: number;
  createdAt: string;
  author: string;
}

export interface VideoChapter {
  title: string;
  startTime: number; // seconds
  endTime: number;
  description?: string;
}

export interface Documentation {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown
  category: string;
  subcategory?: string;
  tags: string[];
  searchableContent: string; // Plain text for search
  tableOfContents?: TOCItem[];
  relatedDocs?: string[];
  lastModified: string;
  version?: string;
  contributors: string[];
  helpful?: {
    yes: number;
    no: number;
  };
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: {
    yes: number;
    no: number;
  };
  views: number;
  featured: boolean;
  relatedQuestions?: string[];
  createdAt: string;
  updatedAt: string;
  author?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  description: string;
  category: 'bug' | 'feature' | 'question' | 'feedback' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  attachments?: Attachment[];
  messages: TicketMessage[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  satisfaction?: number; // 1-5
  internalNotes?: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userRole: 'user' | 'support' | 'admin';
  message: string;
  attachments?: Attachment[];
  timestamp: string;
  isInternal: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface SearchResult {
  id: string;
  type: 'tutorial' | 'documentation' | 'faq' | 'video' | 'article';
  title: string;
  excerpt: string;
  url: string;
  category?: string;
  relevanceScore: number;
  highlights?: string[];
}

export interface HelpWidget {
  id: string;
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme: 'light' | 'dark' | 'auto';
  features: {
    search: boolean;
    tutorials: boolean;
    videos: boolean;
    faq: boolean;
    contact: boolean;
    chat: boolean;
  };
  autoOpen?: {
    enabled: boolean;
    delay: number; // seconds
    pages?: string[];
    conditions?: string[];
  };
  customization?: {
    primaryColor?: string;
    logo?: string;
    title?: string;
    subtitle?: string;
  };
}

export interface Feedback {
  id: string;
  type: 'helpful' | 'not_helpful' | 'suggestion' | 'error';
  resourceType: 'tutorial' | 'documentation' | 'faq' | 'video';
  resourceId: string;
  userId?: string;
  rating?: number;
  comment?: string;
  timestamp: string;
  resolved?: boolean;
  response?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'new_feature' | 'maintenance';
  target: 'all' | 'new_users' | 'existing_users' | 'admins';
  displayLocation: 'banner' | 'modal' | 'notification';
  startDate: string;
  endDate?: string;
  dismissible: boolean;
  link?: {
    text: string;
    url: string;
  };
  icon?: string;
  priority: number;
  active: boolean;
}

export interface OnboardingFlow {
  id: string;
  name: string;
  description: string;
  targetAudience: 'new_user' | 'new_feature' | 'role_specific';
  steps: OnboardingStep[];
  completionReward?: {
    type: 'badge' | 'credits' | 'feature_unlock';
    value: any;
  };
  skippable: boolean;
  restartable: boolean;
  estimatedTime: number; // minutes
  active: boolean;
}

export interface OnboardingStep {
  id: string;
  order: number;
  type: 'welcome' | 'tour' | 'task' | 'video' | 'quiz';
  title: string;
  content: string;
  media?: {
    type: 'image' | 'video' | 'animation';
    url: string;
  };
  action?: {
    label: string;
    target: string;
    required: boolean;
  };
  validation?: {
    type: string;
    condition: string;
  };
  skipCondition?: string;
}

export interface HelpAnalytics {
  id: string;
  period: 'day' | 'week' | 'month';
  date: string;
  metrics: {
    searchQueries: number;
    searchClickThrough: number;
    tutorialStarts: number;
    tutorialCompletions: number;
    videoViews: number;
    faqViews: number;
    ticketsCreated: number;
    ticketsResolved: number;
    averageResolutionTime: number; // hours
    satisfactionScore: number; // 1-5
    mostViewedResources: {
      resourceId: string;
      resourceType: string;
      views: number;
    }[];
    commonSearchTerms: {
      term: string;
      count: number;
    }[];
    feedbackSummary: {
      helpful: number;
      notHelpful: number;
      suggestions: number;
    };
  };
}

export interface Glossary {
  id: string;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  examples?: string[];
  seeAlso?: string[];
  lastUpdated: string;
}

export interface Shortcut {
  id: string;
  key: string;
  description: string;
  category: string;
  platform: 'all' | 'windows' | 'mac' | 'linux';
  context?: string;
  enabled: boolean;
}