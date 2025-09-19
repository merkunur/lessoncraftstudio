// Internationalization (i18n) type definitions

export interface Locale {
  code: string; // e.g., 'en-US', 'fr-FR'
  name: string; // e.g., 'English (United States)'
  nativeName: string; // e.g., 'English', 'Français'
  direction: 'ltr' | 'rtl';
  enabled: boolean;
  default?: boolean;
  flag?: string; // emoji or image URL
  dateFormat: string;
  timeFormat: string;
  numberFormat: {
    decimal: string;
    thousand: string;
    currency: string;
  };
  currency: {
    code: string;
    symbol: string;
    position: 'before' | 'after';
  };
  completeness?: number; // Translation completeness percentage
}

export interface Translation {
  id: string;
  key: string;
  namespace: string;
  locale: string;
  value: string;
  context?: string;
  metadata?: {
    description?: string;
    maxLength?: number;
    placeholders?: string[];
    screenshots?: string[];
    tags?: string[];
  };
  status: 'draft' | 'review' | 'approved' | 'published';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  version: number;
  history?: TranslationHistory[];
}

export interface TranslationHistory {
  id: string;
  value: string;
  changedBy: string;
  changedAt: string;
  changeReason?: string;
  version: number;
}

export interface TranslationNamespace {
  id: string;
  name: string;
  description?: string;
  prefix?: string;
  locales: string[];
  keys: TranslationKey[];
  createdAt: string;
  updatedAt: string;
}

export interface TranslationKey {
  id: string;
  key: string;
  namespace: string;
  description?: string;
  context?: string;
  dataType: 'string' | 'plural' | 'rich-text' | 'markdown';
  maxLength?: number;
  placeholders?: Placeholder[];
  translations: Record<string, Translation>;
  screenshots?: string[];
  usageCount?: number;
  lastUsed?: string;
  deprecated?: boolean;
}

export interface Placeholder {
  name: string;
  description?: string;
  example?: string;
  type: 'string' | 'number' | 'date' | 'time' | 'currency' | 'percentage';
  format?: string;
}

export interface TranslationProject {
  id: string;
  name: string;
  description?: string;
  sourceLocale: string;
  targetLocales: string[];
  namespaces: string[];
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: Record<string, number>; // locale -> percentage
  deadline?: string;
  team: ProjectMember[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  userId: string;
  email: string;
  name: string;
  role: 'manager' | 'translator' | 'reviewer' | 'developer';
  locales: string[];
  permissions: string[];
  addedAt: string;
  addedBy: string;
}

export interface TranslationImport {
  id: string;
  format: 'json' | 'csv' | 'xliff' | 'po' | 'properties' | 'yaml';
  file: string;
  locale: string;
  namespace?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalKeys: number;
  importedKeys: number;
  skippedKeys: number;
  errors: ImportError[];
  startedAt: string;
  completedAt?: string;
  importedBy: string;
}

export interface ImportError {
  key: string;
  error: string;
  line?: number;
  column?: number;
}

export interface TranslationExport {
  id: string;
  format: 'json' | 'csv' | 'xliff' | 'po' | 'properties' | 'yaml' | 'android' | 'ios';
  locales: string[];
  namespaces: string[];
  includeEmptyKeys: boolean;
  includeMetadata: boolean;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileUrl?: string;
  expiresAt?: string;
  requestedAt: string;
  completedAt?: string;
  requestedBy: string;
}

export interface LocalizationSettings {
  defaultLocale: string;
  fallbackLocale: string;
  supportedLocales: string[];
  autoDetect: boolean;
  persistSelection: boolean;
  cookieName?: string;
  headerName?: string;
  queryParam?: string;
  pathPrefix: boolean;
  dateTimeFormat: {
    timezone?: string;
    hour12?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };
  numberFormat: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useGrouping?: boolean;
  };
  currencyFormat: {
    display: 'symbol' | 'code' | 'name';
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
}

export interface TranslationStats {
  locale: string;
  totalKeys: number;
  translatedKeys: number;
  reviewedKeys: number;
  approvedKeys: number;
  completeness: number;
  lastUpdated: string;
  contributors: number;
  wordCount: number;
  characterCount: number;
}

export interface TranslationTask {
  id: string;
  type: 'translate' | 'review' | 'approve' | 'update';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  keys: string[];
  sourceLocale: string;
  targetLocale: string;
  namespace?: string;
  assignedTo: string;
  assignedBy: string;
  assignedAt: string;
  dueDate?: string;
  completedAt?: string;
  notes?: string;
  comments: TaskComment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  edited?: boolean;
  editedAt?: string;
}

export interface MachineTranslation {
  id: string;
  provider: 'google' | 'deepl' | 'microsoft' | 'aws' | 'custom';
  sourceLocale: string;
  targetLocale: string;
  sourceText: string;
  translatedText: string;
  confidence?: number;
  alternatives?: string[];
  cost?: number;
  timestamp: string;
  used: boolean;
  usedBy?: string;
  usedAt?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  description?: string;
  translations: Record<string, string>;
  context?: string;
  caseSensitive: boolean;
  exactMatch: boolean;
  tags?: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface LocalizationQuality {
  locale: string;
  issues: QualityIssue[];
  score: number;
  lastChecked: string;
  metrics: {
    consistency: number;
    completeness: number;
    accuracy: number;
    fluency: number;
  };
}

export interface QualityIssue {
  id: string;
  type: 'missing' | 'inconsistent' | 'length' | 'placeholder' | 'grammar' | 'spelling' | 'punctuation';
  severity: 'error' | 'warning' | 'info';
  key: string;
  locale: string;
  description: string;
  suggestion?: string;
  autoFixable: boolean;
  fixed: boolean;
  fixedBy?: string;
  fixedAt?: string;
}

export interface PluralRule {
  locale: string;
  forms: PluralForm[];
  examples: Record<string, string>;
}

export interface PluralForm {
  name: string; // 'zero', 'one', 'two', 'few', 'many', 'other'
  rule: string; // e.g., 'n === 0', 'n === 1', 'n >= 2 && n <= 4'
  example: number[];
}

export interface DateTimeFormat {
  locale: string;
  patterns: {
    date: {
      full: string;
      long: string;
      medium: string;
      short: string;
    };
    time: {
      full: string;
      long: string;
      medium: string;
      short: string;
    };
    dateTime: {
      full: string;
      long: string;
      medium: string;
      short: string;
    };
  };
  calendar: {
    months: string[];
    monthsShort: string[];
    weekdays: string[];
    weekdaysShort: string[];
    weekdaysMin: string[];
    firstDayOfWeek: number;
  };
  relative: {
    past: string;
    future: string;
    units: Record<string, string>;
  };
}

export interface NumberFormat {
  locale: string;
  patterns: {
    decimal: string;
    currency: string;
    percent: string;
    scientific: string;
  };
  symbols: {
    decimal: string;
    group: string;
    percent: string;
    plusSign: string;
    minusSign: string;
    exponential: string;
    infinity: string;
    nan: string;
  };
  currencies: Record<string, CurrencyInfo>;
}

export interface CurrencyInfo {
  symbol: string;
  name: string;
  plural?: string;
  decimals: number;
  format: string;
}

export interface LocaleData {
  locale: Locale;
  translations: Record<string, Record<string, string>>; // namespace -> key -> value
  dateTimeFormat: DateTimeFormat;
  numberFormat: NumberFormat;
  pluralRules: PluralRule;
  glossary: GlossaryTerm[];
}

export interface I18nContext {
  locale: string;
  fallbackLocale: string;
  availableLocales: Locale[];
  translations: Record<string, any>;
  dateTimeFormat: DateTimeFormat;
  numberFormat: NumberFormat;
  direction: 'ltr' | 'rtl';
  loading: boolean;
  error?: string;
}

export interface TranslationFunction {
  (key: string, params?: Record<string, any>, options?: TranslationOptions): string;
  locale: string;
  changeLocale: (locale: string) => Promise<void>;
  formatDate: (date: Date | string, format?: string) => string;
  formatTime: (date: Date | string, format?: string) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string, options?: Intl.NumberFormatOptions) => string;
  formatRelativeTime: (date: Date | string) => string;
  formatPlural: (count: number, key: string, params?: Record<string, any>) => string;
}

export interface TranslationOptions {
  namespace?: string;
  fallback?: string;
  count?: number;
  context?: string;
  defaultValue?: string;
  interpolation?: Record<string, any>;
}