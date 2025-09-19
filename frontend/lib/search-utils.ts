import {
  SearchQuery,
  SearchFilter,
  SearchOptions,
  SearchResult,
  SearchResponse,
  FacetRequest,
  FacetResponse,
  FacetBucket,
  SearchSuggestion,
  AutocompleteSuggestion,
  QueryAnalytics,
  SearchHistory,
  SearchRecommendation,
  FilterOperator
} from '@/types/search';

// Build search query
export function buildSearchQuery(
  query: string,
  options?: Partial<SearchQuery>
): SearchQuery {
  return {
    query: query.trim(),
    type: options?.type || 'all',
    filters: options?.filters || [],
    facets: options?.facets || [],
    sort: options?.sort || [],
    pagination: options?.pagination || {
      page: 1,
      limit: 20
    },
    options: options?.options || {
      fuzzy: true,
      synonyms: true,
      highlight: true
    },
    timestamp: new Date().toISOString()
  };
}

// Parse search query for special operators
export function parseSearchQuery(query: string): {
  terms: string[];
  phrases: string[];
  excludes: string[];
  fields: Record<string, string>;
} {
  const result = {
    terms: [] as string[],
    phrases: [] as string[],
    excludes: [] as string[],
    fields: {} as Record<string, string>
  };

  // Extract phrases (quoted strings)
  const phraseRegex = /"([^"]+)"/g;
  let match;
  while ((match = phraseRegex.exec(query)) !== null) {
    result.phrases.push(match[1]);
    query = query.replace(match[0], '');
  }

  // Extract field searches (field:value)
  const fieldRegex = /(\w+):(\S+)/g;
  while ((match = fieldRegex.exec(query)) !== null) {
    result.fields[match[1]] = match[2];
    query = query.replace(match[0], '');
  }

  // Extract exclusions (-term)
  const excludeRegex = /-([\w]+)/g;
  while ((match = excludeRegex.exec(query)) !== null) {
    result.excludes.push(match[1]);
    query = query.replace(match[0], '');
  }

  // Remaining terms
  result.terms = query
    .split(/\s+/)
    .filter(term => term.length > 0)
    .map(term => term.toLowerCase());

  return result;
}

// Apply filters to search query
export function applyFilters(
  query: SearchQuery,
  filters: SearchFilter[]
): SearchQuery {
  return {
    ...query,
    filters: [...(query.filters || []), ...filters]
  };
}

// Build filter from facet selection
export function buildFilterFromFacet(
  field: string,
  value: any,
  operator: FilterOperator = 'equals'
): SearchFilter {
  return {
    field,
    operator,
    value
  };
}

// Calculate relevance score
export function calculateRelevanceScore(
  result: SearchResult,
  boosts?: Record<string, number>
): number {
  let score = result.score;

  if (boosts && result.source) {
    Object.entries(boosts).forEach(([field, boost]) => {
      if (result.source[field]) {
        score *= boost;
      }
    });
  }

  return score;
}

// Highlight search terms in text
export function highlightTerms(
  text: string,
  terms: string[],
  tag: string = 'mark'
): string {
  if (!text || terms.length === 0) return text;

  let highlighted = text;
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    highlighted = highlighted.replace(regex, `<${tag}>$1</${tag}>`);
  });

  return highlighted;
}

// Extract snippet with context
export function extractSnippet(
  text: string,
  terms: string[],
  maxLength: number = 150
): string {
  if (!text) return '';

  // Find first occurrence of any search term
  let firstIndex = text.length;
  let foundTerm = '';
  
  terms.forEach(term => {
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index !== -1 && index < firstIndex) {
      firstIndex = index;
      foundTerm = term;
    }
  });

  if (firstIndex === text.length) {
    // No term found, return beginning of text
    return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  // Extract snippet around the found term
  const halfLength = Math.floor(maxLength / 2);
  let start = Math.max(0, firstIndex - halfLength);
  let end = Math.min(text.length, firstIndex + foundTerm.length + halfLength);

  // Adjust to word boundaries
  if (start > 0) {
    const spaceIndex = text.lastIndexOf(' ', start);
    if (spaceIndex > start - 20) start = spaceIndex + 1;
  }

  if (end < text.length) {
    const spaceIndex = text.indexOf(' ', end);
    if (spaceIndex !== -1 && spaceIndex < end + 20) end = spaceIndex;
  }

  let snippet = text.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

// Generate search suggestions
export function generateSuggestions(
  query: string,
  history: SearchHistory[],
  popularSearches: string[]
): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  const queryLower = query.toLowerCase();

  // Add matching history items
  history
    .filter(h => h.query.toLowerCase().includes(queryLower))
    .slice(0, 3)
    .forEach(h => {
      suggestions.push({
        text: h.query,
        score: h.resultsCount / 100,
        type: 'term'
      });
    });

  // Add popular searches
  popularSearches
    .filter(s => s.toLowerCase().includes(queryLower) && s !== query)
    .slice(0, 3)
    .forEach((s, index) => {
      suggestions.push({
        text: s,
        score: 1 - index * 0.1,
        type: 'phrase'
      });
    });

  // Sort by score
  return suggestions.sort((a, b) => b.score - a.score);
}

// Build autocomplete suggestions
export function buildAutocompleteSuggestions(
  query: string,
  results: any[]
): AutocompleteSuggestion[] {
  return results.map((result, index) => ({
    text: result.title || result.name || result.query,
    type: result.type || 'query',
    score: 1 - index * 0.1,
    payload: {
      id: result.id,
      category: result.category,
      image: result.image,
      description: result.description,
      url: result.url
    }
  }));
}

// Calculate facet statistics
export function calculateFacetStats(
  buckets: FacetBucket[]
): {
  total: number;
  unique: number;
  maxCount: number;
  minCount: number;
} {
  if (buckets.length === 0) {
    return { total: 0, unique: 0, maxCount: 0, minCount: 0 };
  }

  const total = buckets.reduce((sum, b) => sum + b.docCount, 0);
  const unique = buckets.length;
  const counts = buckets.map(b => b.docCount);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  return { total, unique, maxCount, minCount };
}

// Group facets hierarchically
export function groupFacetsHierarchically(
  buckets: FacetBucket[],
  delimiter: string = '/'
): FacetBucket[] {
  const root: FacetBucket[] = [];
  const map = new Map<string, FacetBucket>();

  buckets.forEach(bucket => {
    const parts = String(bucket.key).split(delimiter);
    let parent = root;
    let path = '';

    parts.forEach((part, index) => {
      path = path ? `${path}${delimiter}${part}` : part;
      
      let node = map.get(path);
      if (!node) {
        node = {
          key: part,
          docCount: 0,
          label: part,
          children: []
        };
        map.set(path, node);
        parent.push(node);
      }

      if (index === parts.length - 1) {
        node.docCount = bucket.docCount;
      }

      parent = node.children!;
    });
  });

  return root;
}

// Calculate search metrics
export function calculateSearchMetrics(
  searches: SearchHistory[]
): {
  avgResultsCount: number;
  avgDuration: number;
  successRate: number;
  clickThroughRate: number;
} {
  if (searches.length === 0) {
    return {
      avgResultsCount: 0,
      avgDuration: 0,
      successRate: 0,
      clickThroughRate: 0
    };
  }

  const totalResults = searches.reduce((sum, s) => sum + s.resultsCount, 0);
  const totalDuration = searches.reduce((sum, s) => sum + s.searchDuration, 0);
  const successfulSearches = searches.filter(s => s.successful).length;
  const searchesWithClicks = searches.filter(s => s.clickedResults && s.clickedResults.length > 0).length;

  return {
    avgResultsCount: totalResults / searches.length,
    avgDuration: totalDuration / searches.length,
    successRate: (successfulSearches / searches.length) * 100,
    clickThroughRate: (searchesWithClicks / searches.length) * 100
  };
}

// Rank search results
export function rankSearchResults<T>(
  results: SearchResult<T>[],
  factors: {
    textRelevance?: number;
    popularity?: number;
    recency?: number;
    userPreference?: number;
  } = {}
): SearchResult<T>[] {
  const weights = {
    textRelevance: factors.textRelevance || 0.4,
    popularity: factors.popularity || 0.3,
    recency: factors.recency || 0.2,
    userPreference: factors.userPreference || 0.1
  };

  return results
    .map(result => {
      let finalScore = result.score * weights.textRelevance;

      // Add popularity score
      if (result.metadata?.viewCount) {
        const popularityScore = Math.log10(result.metadata.viewCount + 1) / 10;
        finalScore += popularityScore * weights.popularity;
      }

      // Add recency score
      if (result.metadata?.updatedAt) {
        const ageInDays = (Date.now() - new Date(result.metadata.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
        const recencyScore = Math.max(0, 1 - ageInDays / 365);
        finalScore += recencyScore * weights.recency;
      }

      // Add user preference score
      if (result.metadata?.userScore) {
        finalScore += result.metadata.userScore * weights.userPreference;
      }

      return {
        ...result,
        score: finalScore
      };
    })
    .sort((a, b) => b.score - a.score);
}

// Generate related searches
export function generateRelatedSearches(
  query: string,
  results: SearchResult[],
  limit: number = 5
): string[] {
  const related = new Set<string>();
  const queryTerms = query.toLowerCase().split(/\s+/);

  // Extract terms from top results
  results.slice(0, 10).forEach(result => {
    if (result.source?.tags) {
      result.source.tags.forEach((tag: string) => {
        if (!queryTerms.includes(tag.toLowerCase())) {
          related.add(tag);
        }
      });
    }

    if (result.source?.category) {
      related.add(result.source.category);
    }
  });

  // Add query variations
  if (queryTerms.length > 1) {
    // Try different combinations
    related.add(queryTerms.slice(0, -1).join(' '));
    related.add(queryTerms.slice(1).join(' '));
  }

  return Array.from(related).slice(0, limit);
}

// Check if query needs spell correction
export function needsSpellCorrection(
  query: string,
  dictionary: Set<string>
): boolean {
  const words = query.toLowerCase().split(/\s+/);
  const unknownWords = words.filter(word => 
    word.length > 2 && !dictionary.has(word)
  );

  return unknownWords.length > words.length / 2;
}

// Calculate edit distance for spell correction
export function calculateEditDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

// Generate personalized recommendations
export function generatePersonalizedRecommendations(
  userId: string,
  searchHistory: SearchHistory[],
  clickHistory: string[],
  availableItems: any[]
): SearchRecommendation[] {
  const recommendations: SearchRecommendation[] = [];

  // Analyze search patterns
  const frequentTerms = new Map<string, number>();
  searchHistory.forEach(search => {
    const terms = search.query.toLowerCase().split(/\s+/);
    terms.forEach(term => {
      frequentTerms.set(term, (frequentTerms.get(term) || 0) + 1);
    });
  });

  // Score items based on user behavior
  const scoredItems = availableItems.map(item => {
    let score = 0;

    // Check if item matches frequent search terms
    frequentTerms.forEach((count, term) => {
      if (item.title?.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term)) {
        score += count;
      }
    });

    // Boost if similar to clicked items
    if (clickHistory.includes(item.id)) {
      score += 10;
    }

    return { item, score };
  });

  // Sort and create recommendations
  scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .forEach((scored, index) => {
      if (scored.score > 0) {
        recommendations.push({
          id: `rec_${Date.now()}_${index}`,
          userId,
          type: 'content',
          items: [{
            id: scored.item.id,
            title: scored.item.title,
            description: scored.item.description,
            url: scored.item.url,
            image: scored.item.image,
            score: scored.score,
            metadata: scored.item
          }],
          score: scored.score,
          timestamp: new Date().toISOString()
        });
      }
    });

  return recommendations;
}

// Detect search intent
export function detectSearchIntent(query: string): string {
  const intentPatterns = {
    'find_specific': /^(find|get|show|where is|locate)/i,
    'explore': /^(browse|explore|discover|what|which)/i,
    'compare': /^(compare|versus|vs|difference|better)/i,
    'learn': /^(how to|tutorial|guide|learn|teach)/i,
    'troubleshoot': /^(fix|solve|problem|error|issue|why)/i
  };

  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    if (pattern.test(query)) {
      return intent;
    }
  }

  return 'browse';
}

// Calculate search diversity
export function calculateSearchDiversity(results: SearchResult[]): number {
  if (results.length === 0) return 0;

  const types = new Set(results.map(r => r.type));
  const categories = new Set(results.map(r => r.metadata?.category).filter(Boolean));
  
  const typeDiv = types.size / results.length;
  const catDiv = categories.size / Math.max(1, results.filter(r => r.metadata?.category).length);
  
  return (typeDiv + catDiv) / 2;
}

// Optimize search query
export function optimizeSearchQuery(query: string): string {
  // Remove extra spaces
  let optimized = query.trim().replace(/\s+/g, ' ');
  
  // Remove common stop words (unless in quotes)
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
  if (!optimized.includes('"')) {
    stopWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      optimized = optimized.replace(regex, '').replace(/\s+/g, ' ').trim();
    });
  }
  
  return optimized;
}