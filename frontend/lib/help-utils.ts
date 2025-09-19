import {
  Tutorial,
  TutorialStep,
  Documentation,
  FAQItem,
  SearchResult,
  SupportTicket,
  VideoGuide,
  HelpAnalytics
} from '@/types/help';

// Calculate tutorial completion percentage
export const calculateTutorialProgress = (
  completedSteps: number[],
  totalSteps: number
): number => {
  if (totalSteps === 0) return 0;
  return Math.round((completedSteps.length / totalSteps) * 100);
};

// Estimate reading time for documentation
export const estimateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Search across help resources
export const searchHelp = (
  query: string,
  resources: {
    tutorials?: Tutorial[];
    documentation?: Documentation[];
    faqs?: FAQItem[];
    videos?: VideoGuide[];
  }
): SearchResult[] => {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  // Search tutorials
  resources.tutorials?.forEach(tutorial => {
    const score = calculateRelevance(
      queryWords,
      [tutorial.title, tutorial.description, ...tutorial.tags].join(' ').toLowerCase()
    );
    if (score > 0) {
      results.push({
        id: tutorial.id,
        type: 'tutorial',
        title: tutorial.title,
        excerpt: tutorial.description,
        url: `/help/tutorials/${tutorial.id}`,
        category: tutorial.category,
        relevanceScore: score
      });
    }
  });

  // Search documentation
  resources.documentation?.forEach(doc => {
    const score = calculateRelevance(
      queryWords,
      [doc.title, doc.searchableContent, ...doc.tags].join(' ').toLowerCase()
    );
    if (score > 0) {
      results.push({
        id: doc.id,
        type: 'documentation',
        title: doc.title,
        excerpt: doc.content.substring(0, 150) + '...',
        url: `/help/docs/${doc.slug}`,
        category: doc.category,
        relevanceScore: score,
        highlights: extractHighlights(doc.content, queryWords)
      });
    }
  });

  // Search FAQs
  resources.faqs?.forEach(faq => {
    const score = calculateRelevance(
      queryWords,
      [faq.question, faq.answer, ...faq.tags].join(' ').toLowerCase()
    );
    if (score > 0) {
      results.push({
        id: faq.id,
        type: 'faq',
        title: faq.question,
        excerpt: faq.answer.substring(0, 150) + '...',
        url: `/help/faq/${faq.id}`,
        category: faq.category,
        relevanceScore: score
      });
    }
  });

  // Search videos
  resources.videos?.forEach(video => {
    const score = calculateRelevance(
      queryWords,
      [video.title, video.description, ...video.tags].join(' ').toLowerCase()
    );
    if (score > 0) {
      results.push({
        id: video.id,
        type: 'video',
        title: video.title,
        excerpt: video.description,
        url: `/help/videos/${video.id}`,
        category: video.category,
        relevanceScore: score
      });
    }
  });

  // Sort by relevance score
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// Calculate relevance score
const calculateRelevance = (queryWords: string[], content: string): number => {
  let score = 0;
  queryWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      score += matches.length;
    }
  });
  return score;
};

// Extract text highlights
const extractHighlights = (content: string, queryWords: string[], maxHighlights: number = 3): string[] => {
  const highlights: string[] = [];
  const sentences = content.split(/[.!?]+/);
  
  for (const sentence of sentences) {
    const sentenceLower = sentence.toLowerCase();
    for (const word of queryWords) {
      if (sentenceLower.includes(word)) {
        highlights.push(sentence.trim());
        break;
      }
    }
    if (highlights.length >= maxHighlights) break;
  }
  
  return highlights;
};

// Format video duration
export const formatVideoDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Get ticket priority color
export const getTicketPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-100';
    case 'high': return 'text-orange-600 bg-orange-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// Get ticket status color
export const getTicketStatusColor = (status: string): string => {
  switch (status) {
    case 'open': return 'text-blue-600 bg-blue-100';
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    case 'in_progress': return 'text-purple-600 bg-purple-100';
    case 'resolved': return 'text-green-600 bg-green-100';
    case 'closed': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// Calculate average resolution time
export const calculateAverageResolutionTime = (tickets: SupportTicket[]): number => {
  const resolvedTickets = tickets.filter(t => t.resolvedAt);
  if (resolvedTickets.length === 0) return 0;

  const totalTime = resolvedTickets.reduce((sum, ticket) => {
    const created = new Date(ticket.createdAt).getTime();
    const resolved = new Date(ticket.resolvedAt!).getTime();
    return sum + (resolved - created);
  }, 0);

  return totalTime / resolvedTickets.length / (1000 * 60 * 60); // Convert to hours
};

// Get popular FAQs
export const getPopularFAQs = (faqs: FAQItem[], limit: number = 5): FAQItem[] => {
  return faqs
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

// Get related resources
export const getRelatedResources = (
  currentResource: any,
  allResources: any[],
  limit: number = 3
): any[] => {
  const currentTags = currentResource.tags || [];
  if (currentTags.length === 0) return [];

  const scored = allResources
    .filter(r => r.id !== currentResource.id)
    .map(resource => {
      const resourceTags = resource.tags || [];
      const commonTags = currentTags.filter(tag => resourceTags.includes(tag));
      return {
        resource,
        score: commonTags.length
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => item.resource);
};

// Validate tutorial step
export const validateTutorialStep = (
  step: TutorialStep,
  context: any
): { valid: boolean; message?: string } => {
  if (!step.validation) return { valid: true };

  switch (step.validation.type) {
    case 'element':
      const element = document.querySelector(step.validation.condition);
      if (!element) {
        return {
          valid: false,
          message: step.validation.errorMessage || 'Required element not found'
        };
      }
      break;

    case 'value':
      // Check if a specific value condition is met
      // This would need to be implemented based on specific requirements
      break;

    case 'url':
      if (!window.location.pathname.includes(step.validation.condition)) {
        return {
          valid: false,
          message: step.validation.errorMessage || 'Please navigate to the correct page'
        };
      }
      break;

    case 'custom':
      // Execute custom validation function
      // This would need to be implemented based on specific requirements
      break;
  }

  return { valid: true };
};

// Generate table of contents from markdown
export const generateTableOfContents = (markdown: string): any[] => {
  const toc: any[] = [];
  const lines = markdown.split('\n');
  const headingRegex = /^(#{1,6})\s+(.+)$/;

  lines.forEach((line, index) => {
    const match = line.match(headingRegex);
    if (match) {
      const level = match[1].length;
      const title = match[2];
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      toc.push({
        id,
        title,
        level,
        line: index
      });
    }
  });

  return toc;
};

// Calculate help effectiveness score
export const calculateHelpEffectiveness = (analytics: HelpAnalytics): number => {
  const {
    tutorialCompletions,
    tutorialStarts,
    ticketsResolved,
    ticketsCreated,
    satisfactionScore,
    searchClickThrough,
    searchQueries
  } = analytics.metrics;

  let score = 0;

  // Tutorial completion rate (0-25 points)
  if (tutorialStarts > 0) {
    score += (tutorialCompletions / tutorialStarts) * 25;
  }

  // Ticket resolution rate (0-25 points)
  if (ticketsCreated > 0) {
    score += (ticketsResolved / ticketsCreated) * 25;
  }

  // Satisfaction score (0-25 points)
  score += (satisfactionScore / 5) * 25;

  // Search effectiveness (0-25 points)
  if (searchQueries > 0) {
    score += (searchClickThrough / searchQueries) * 25;
  }

  return Math.round(score);
};

// Get announcement type icon
export const getAnnouncementIcon = (type: string): string => {
  switch (type) {
    case 'info': return 'ℹ️';
    case 'warning': return '⚠️';
    case 'success': return '✅';
    case 'new_feature': return '🚀';
    case 'maintenance': return '🔧';
    default: return 'ℹ️';
  }
};

// Format shortcut key
export const formatShortcutKey = (key: string, platform: string = 'windows'): string => {
  const isMac = platform === 'mac';
  
  return key
    .replace(/Ctrl/gi, isMac ? '⌘' : 'Ctrl')
    .replace(/Alt/gi, isMac ? '⌥' : 'Alt')
    .replace(/Shift/gi, isMac ? '⇧' : 'Shift')
    .replace(/Meta/gi, isMac ? '⌘' : 'Win')
    .replace(/\+/g, ' + ');
};

// Check if user needs onboarding
export const needsOnboarding = (
  userCreatedAt: string,
  lastLoginAt: string,
  completedOnboarding?: string[]
): boolean => {
  const daysSinceCreation = (Date.now() - new Date(userCreatedAt).getTime()) / (1000 * 60 * 60 * 24);
  const daysSinceLastLogin = (Date.now() - new Date(lastLoginAt).getTime()) / (1000 * 60 * 60 * 24);

  // New user (less than 7 days old)
  if (daysSinceCreation < 7 && (!completedOnboarding || completedOnboarding.length === 0)) {
    return true;
  }

  // Returning user after long absence (more than 30 days)
  if (daysSinceLastLogin > 30) {
    return true;
  }

  return false;
};

// Get contextual help suggestions
export const getContextualHelp = (currentPage: string, userRole: string): any[] => {
  const suggestions = [];

  // Page-specific help
  if (currentPage.includes('/worksheets')) {
    suggestions.push({
      type: 'tutorial',
      title: 'Creating Your First Worksheet',
      id: 'tutorial_worksheet_basics'
    });
  }

  if (currentPage.includes('/admin')) {
    suggestions.push({
      type: 'documentation',
      title: 'Admin Dashboard Guide',
      id: 'doc_admin_guide'
    });
  }

  // Role-specific help
  if (userRole === 'teacher') {
    suggestions.push({
      type: 'video',
      title: 'Tips for Educators',
      id: 'video_educator_tips'
    });
  }

  return suggestions;
};