// Search and Discovery System type definitions

export interface SearchQuery {
  id?: string;
  query: string;
  type?: SearchType;
  filters?: SearchFilter[];
  facets?: FacetRequest[];
  sort?: SortOption[];
  pagination?: {
    page: number;
    limit: number;
    offset?: number;
  };
  options?: SearchOptions;
  context?: SearchContext;
  timestamp?: string;
}

export type SearchType = 
  | 'all'
  | 'worksheets'
  | 'templates'
  | 'images'
  | 'users'
  | 'content'
  | 'help'
  | 'files'
  | 'settings';

export interface SearchFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'array';
  boost?: number;
}

export type FilterOperator = 
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'greater_than'
  | 'less_than'
  | 'greater_than_or_equal'
  | 'less_than_or_equal'
  | 'between'
  | 'in'
  | 'not_in'
  | 'exists'
  | 'not_exists';

export interface FacetRequest {
  field: string;
  type: 'terms' | 'range' | 'date_range' | 'stats';
  size?: number;
  ranges?: FacetRange[];
  interval?: string;
  minDocCount?: number;
}

export interface FacetRange {
  key: string;
  from?: any;
  to?: any;
}

export interface SortOption {
  field: string;
  order: 'asc' | 'desc';
  type?: 'string' | 'number' | 'date';
  missing?: '_first' | '_last';
}

export interface SearchOptions {
  fuzzy?: boolean;
  fuzziness?: number;
  synonyms?: boolean;
  stemming?: boolean;
  phoneticMatching?: boolean;
  typoTolerance?: boolean;
  proximity?: number;
  highlight?: boolean;
  highlightFields?: string[];
  highlightTag?: string;
  explain?: boolean;
  minScore?: number;
  boost?: Record<string, number>;
  excludeFields?: string[];
  includeFields?: string[];
  language?: string;
  searchAfter?: any[];
}

export interface SearchContext {
  userId?: string;
  sessionId?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
    coordinates?: [number, number];
  };
  device?: {
    type?: string;
    os?: string;
    browser?: string;
  };
  preferences?: Record<string, any>;
  history?: string[];
  intent?: SearchIntent;
}

export type SearchIntent = 
  | 'browse'
  | 'find_specific'
  | 'explore'
  | 'compare'
  | 'learn'
  | 'troubleshoot';

export interface SearchResult<T = any> {
  id: string;
  score: number;
  type: string;
  source: T;
  highlights?: Record<string, string[]>;
  explanation?: SearchExplanation;
  metadata?: Record<string, any>;
}

export interface SearchExplanation {
  value: number;
  description: string;
  details?: SearchExplanation[];
}

export interface SearchResponse<T = any> {
  query: string;
  results: SearchResult<T>[];
  total: number;
  facets?: FacetResponse[];
  suggestions?: SearchSuggestion[];
  relatedSearches?: string[];
  spellcheck?: SpellcheckSuggestion;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  performance: {
    took: number;
    timedOut: boolean;
  };
  debug?: SearchDebugInfo;
}

export interface FacetResponse {
  field: string;
  type: string;
  buckets: FacetBucket[];
  stats?: FacetStats;
  sumOtherDocCount?: number;
}

export interface FacetBucket {
  key: any;
  docCount: number;
  label?: string;
  selected?: boolean;
  children?: FacetBucket[];
}

export interface FacetStats {
  count: number;
  min: number;
  max: number;
  avg: number;
  sum: number;
}

export interface SearchSuggestion {
  text: string;
  score: number;
  type: 'term' | 'phrase' | 'completion' | 'correction';
  payload?: Record<string, any>;
}

export interface SpellcheckSuggestion {
  original: string;
  suggestion: string;
  confidence: number;
}

export interface SearchDebugInfo {
  parsedQuery: any;
  executionPlan: string;
  indexesUsed: string[];
  cacheHit: boolean;
  warnings?: string[];
}

export interface SearchIndex {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'building' | 'updating' | 'error' | 'disabled';
  documentCount: number;
  sizeBytes: number;
  fields: IndexField[];
  settings: IndexSettings;
  mappings?: Record<string, any>;
  stats?: IndexStats;
  lastUpdated: string;
  createdAt: string;
}

export interface IndexField {
  name: string;
  type: 'text' | 'keyword' | 'number' | 'date' | 'boolean' | 'object' | 'nested' | 'geo_point';
  indexed: boolean;
  stored: boolean;
  searchable: boolean;
  aggregatable: boolean;
  analyzer?: string;
  normalizer?: string;
  boost?: number;
  properties?: IndexField[];
}

export interface IndexSettings {
  numberOfShards?: number;
  numberOfReplicas?: number;
  refreshInterval?: string;
  maxResultWindow?: number;
  analyzers?: Record<string, AnalyzerConfig>;
  tokenizers?: Record<string, TokenizerConfig>;
  filters?: Record<string, FilterConfig>;
  synonyms?: SynonymSet[];
}

export interface AnalyzerConfig {
  type: string;
  tokenizer?: string;
  filters?: string[];
  charFilters?: string[];
  stopwords?: string[];
  stemmer?: string;
}

export interface TokenizerConfig {
  type: string;
  minGram?: number;
  maxGram?: number;
  tokenChars?: string[];
  pattern?: string;
}

export interface FilterConfig {
  type: string;
  min?: number;
  max?: number;
  keepWords?: string[];
  stopwords?: string[];
  synonyms?: string[];
}

export interface SynonymSet {
  id: string;
  name: string;
  synonyms: string[][];
  type: 'explicit' | 'equivalent';
}

export interface IndexStats {
  indexingRate: number;
  searchRate: number;
  avgSearchLatency: number;
  avgIndexLatency: number;
  cacheHitRate: number;
  totalSearches: number;
  totalIndexOperations: number;
}

export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  filters?: SearchFilter[];
  resultsCount: number;
  clickedResults?: string[];
  searchDuration: number;
  timestamp: string;
  sessionId?: string;
  successful: boolean;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  description?: string;
  query: SearchQuery;
  frequency?: 'never' | 'daily' | 'weekly' | 'monthly';
  lastRun?: string;
  notifications?: boolean;
  shared?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchAlert {
  id: string;
  userId: string;
  name: string;
  query: SearchQuery;
  condition: AlertCondition;
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  channels: AlertChannel[];
  enabled: boolean;
  lastTriggered?: string;
  triggerCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AlertCondition {
  type: 'new_results' | 'threshold' | 'change' | 'anomaly';
  threshold?: number;
  operator?: 'greater_than' | 'less_than' | 'equals';
  field?: string;
  timeWindow?: string;
}

export interface AlertChannel {
  type: 'email' | 'push' | 'webhook' | 'sms';
  config: Record<string, any>;
}

export interface SearchRecommendation {
  id: string;
  userId?: string;
  type: 'content' | 'query' | 'filter' | 'category';
  items: RecommendationItem[];
  reason?: string;
  score: number;
  context?: Record<string, any>;
  timestamp: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  image?: string;
  score: number;
  metadata?: Record<string, any>;
}

export interface SearchAnalytics {
  period: 'hour' | 'day' | 'week' | 'month' | 'year';
  startDate: string;
  endDate: string;
  metrics: {
    totalSearches: number;
    uniqueUsers: number;
    avgResultsPerSearch: number;
    avgSearchDuration: number;
    clickThroughRate: number;
    zeroResultsRate: number;
    exitRate: number;
  };
  topQueries: QueryAnalytics[];
  topFilters: FilterAnalytics[];
  topClickedResults: ResultAnalytics[];
  searchVolume: TimeSeriesData[];
  performance: PerformanceMetrics[];
}

export interface QueryAnalytics {
  query: string;
  count: number;
  avgResultsCount: number;
  clickThroughRate: number;
  avgClickPosition: number;
  exitRate: number;
}

export interface FilterAnalytics {
  filter: string;
  count: number;
  conversionRate: number;
}

export interface ResultAnalytics {
  id: string;
  title: string;
  clicks: number;
  impressions: number;
  clickThroughRate: number;
  avgPosition: number;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  breakdown?: Record<string, number>;
}

export interface PerformanceMetrics {
  timestamp: string;
  avgLatency: number;
  p50Latency: number;
  p95Latency: number;
  p99Latency: number;
  errorRate: number;
  throughput: number;
}

export interface AutocompleteRequest {
  query: string;
  type?: SearchType;
  size?: number;
  fuzzy?: boolean;
  context?: SearchContext;
}

export interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[];
  took: number;
}

export interface AutocompleteSuggestion {
  text: string;
  type: 'query' | 'result' | 'category';
  score: number;
  payload?: {
    id?: string;
    category?: string;
    image?: string;
    description?: string;
    url?: string;
  };
}

export interface SearchPersonalization {
  userId: string;
  preferences: {
    preferredCategories?: string[];
    preferredTags?: string[];
    searchHistory?: string[];
    clickHistory?: string[];
    excludedTerms?: string[];
  };
  behavior: {
    avgSessionDuration: number;
    avgSearchesPerSession: number;
    preferredSearchTime?: string;
    devicePreference?: string;
  };
  model?: {
    type: 'collaborative' | 'content' | 'hybrid';
    weights: Record<string, number>;
    lastUpdated: string;
  };
}

export interface SearchABTest {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variants: ABTestVariant[];
  metrics: string[];
  allocation: number; // percentage of traffic
  startDate: string;
  endDate?: string;
  results?: ABTestResults;
}

export interface ABTestVariant {
  id: string;
  name: string;
  config: Record<string, any>;
  allocation: number; // percentage within test
}

export interface ABTestResults {
  winner?: string;
  confidence: number;
  variantResults: Array<{
    variantId: string;
    metrics: Record<string, number>;
    sampleSize: number;
  }>;
  statisticalSignificance: boolean;
}