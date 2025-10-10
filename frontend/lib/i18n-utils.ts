import {
  Locale,
  Translation,
  TranslationKey,
  LocaleData,
  PluralForm,
  DateTimeFormat,
  NumberFormat,
  QualityIssue,
  TranslationStats,
  TranslationOptions
} from '@/types/i18n';

// Detect browser locale
export const detectBrowserLocale = (): string => {
  if (typeof window === 'undefined') return 'en-US';
  
  // Check navigator.language first
  if (navigator.language) {
    return navigator.language;
  }
  
  // Fallback to navigator.languages
  if (navigator.languages && navigator.languages.length > 0) {
    return navigator.languages[0];
  }
  
  // Default fallback
  return 'en-US';
};

// Parse locale code
export const parseLocaleCode = (code: string): {
  language: string;
  country?: string;
  script?: string;
} => {
  const parts = code.split(/[-_]/);
  const result: any = { language: parts[0].toLowerCase() };
  
  if (parts.length > 1) {
    // Check if it's a script (4 letters) or country (2 letters)
    if (parts[1].length === 4) {
      result.script = parts[1];
      if (parts[2]) result.country = parts[2].toUpperCase();
    } else {
      result.country = parts[1].toUpperCase();
    }
  }
  
  return result;
};

// Find best matching locale
export const findBestLocale = (
  requestedLocale: string,
  availableLocales: string[]
): string => {
  // Exact match
  if (availableLocales.includes(requestedLocale)) {
    return requestedLocale;
  }
  
  const requested = parseLocaleCode(requestedLocale);
  
  // Try language-country match
  const languageCountryMatch = availableLocales.find(locale => {
    const parsed = parseLocaleCode(locale);
    return parsed.language === requested.language && 
           parsed.country === requested.country;
  });
  if (languageCountryMatch) return languageCountryMatch;
  
  // Try language-only match
  const languageMatch = availableLocales.find(locale => {
    const parsed = parseLocaleCode(locale);
    return parsed.language === requested.language;
  });
  if (languageMatch) return languageMatch;
  
  // Default fallback
  return availableLocales[0] || 'en-US';
};

// Interpolate translation with parameters
export const interpolate = (
  text: string,
  params?: Record<string, any>
): string => {
  if (!params) return text;
  
  let result = text;
  
  // Replace {{key}} placeholders
  Object.entries(params).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, String(value));
  });
  
  // Replace {key} placeholders
  Object.entries(params).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    result = result.replace(regex, String(value));
  });
  
  return result;
};

// Get plural form for a number
export const getPluralForm = (
  count: number,
  locale: string
): string => {
  // Simplified plural rules for common languages
  const lang = parseLocaleCode(locale).language;
  
  switch (lang) {
    case 'en':
    case 'de':
    case 'nl':
    case 'sv':
    case 'da':
    case 'no':
    case 'nb':
    case 'nn':
    case 'fo':
    case 'es':
    case 'pt':
    case 'it':
    case 'bg':
    case 'el':
    case 'fi':
    case 'et':
    case 'he':
    case 'eo':
    case 'hu':
    case 'tr':
      return count === 1 ? 'one' : 'other';
      
    case 'fr':
    case 'pt-BR':
      return count <= 1 ? 'one' : 'other';
      
    case 'ru':
    case 'uk':
    case 'be':
    case 'bs':
    case 'hr':
    case 'sr':
      if (count % 10 === 1 && count % 100 !== 11) return 'one';
      if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'few';
      return 'many';
      
    case 'cs':
    case 'sk':
      if (count === 1) return 'one';
      if ([2, 3, 4].includes(count)) return 'few';
      return 'other';
      
    case 'pl':
      if (count === 1) return 'one';
      if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'few';
      return 'many';
      
    case 'lt':
      if (count % 10 === 1 && count % 100 !== 11) return 'one';
      if (count % 10 >= 2 && count % 10 <= 9 && (count % 100 < 11 || count % 100 > 19)) return 'few';
      return 'other';
      
    case 'ja':
    case 'ko':
    case 'zh':
    case 'vi':
    case 'th':
    case 'id':
      return 'other';
      
    case 'ar':
      if (count === 0) return 'zero';
      if (count === 1) return 'one';
      if (count === 2) return 'two';
      if (count % 100 >= 3 && count % 100 <= 10) return 'few';
      if (count % 100 >= 11 && count % 100 <= 99) return 'many';
      return 'other';
      
    default:
      return count === 1 ? 'one' : 'other';
  }
};

// Format date according to locale
export const formatDate = (
  date: Date | string,
  locale: string,
  format: 'full' | 'long' | 'medium' | 'short' = 'medium'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    short: { year: '2-digit', month: 'numeric', day: 'numeric' }
  };
  const options = formatOptions[format];

  return new Intl.DateTimeFormat(locale, options).format(d);
};

// Format time according to locale
export const formatTime = (
  date: Date | string,
  locale: string,
  format: 'full' | 'long' | 'medium' | 'short' = 'medium'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    full: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long' },
    long: { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' },
    medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    short: { hour: 'numeric', minute: 'numeric' }
  };
  const options = formatOptions[format];

  return new Intl.DateTimeFormat(locale, options).format(d);
};

// Format number according to locale
export const formatNumber = (
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(locale, options).format(number);
};

// Format currency according to locale
export const formatCurrency = (
  amount: number,
  locale: string,
  currency: string = 'USD',
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options
  }).format(amount);
};

// Format relative time
export const formatRelativeTime = (
  date: Date | string,
  locale: string,
  baseDate: Date = new Date()
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = (d.getTime() - baseDate.getTime()) / 1000;
  const absDiff = Math.abs(diffInSeconds);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (absDiff < 60) {
    return rtf.format(Math.round(diffInSeconds), 'second');
  } else if (absDiff < 3600) {
    return rtf.format(Math.round(diffInSeconds / 60), 'minute');
  } else if (absDiff < 86400) {
    return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
  } else if (absDiff < 2592000) {
    return rtf.format(Math.round(diffInSeconds / 86400), 'day');
  } else if (absDiff < 31536000) {
    return rtf.format(Math.round(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(Math.round(diffInSeconds / 31536000), 'year');
  }
};

// Calculate translation completeness
export const calculateCompleteness = (
  translations: Record<string, Translation>,
  totalKeys: number
): number => {
  const translatedCount = Object.values(translations).filter(
    t => t.value && t.status === 'published'
  ).length;
  
  return totalKeys > 0 ? Math.round((translatedCount / totalKeys) * 100) : 0;
};

// Validate translation
export const validateTranslation = (
  translation: Translation,
  sourceTranslation?: Translation
): QualityIssue[] => {
  const issues: QualityIssue[] = [];
  
  // Check for missing translation
  if (!translation.value) {
    issues.push({
      id: `missing_${translation.key}`,
      type: 'missing',
      severity: 'error',
      key: translation.key,
      locale: translation.locale,
      description: 'Translation is missing',
      autoFixable: false,
      fixed: false
    });
    return issues;
  }
  
  // Check length constraints
  if (translation.metadata?.maxLength && 
      translation.value.length > translation.metadata.maxLength) {
    issues.push({
      id: `length_${translation.key}`,
      type: 'length',
      severity: 'warning',
      key: translation.key,
      locale: translation.locale,
      description: `Translation exceeds maximum length of ${translation.metadata.maxLength}`,
      autoFixable: false,
      fixed: false
    });
  }
  
  // Check placeholders
  if (sourceTranslation && translation.metadata?.placeholders) {
    const sourcePlaceholders = extractPlaceholders(sourceTranslation.value);
    const targetPlaceholders = extractPlaceholders(translation.value);
    
    sourcePlaceholders.forEach(placeholder => {
      if (!targetPlaceholders.includes(placeholder)) {
        issues.push({
          id: `placeholder_${translation.key}_${placeholder}`,
          type: 'placeholder',
          severity: 'error',
          key: translation.key,
          locale: translation.locale,
          description: `Missing placeholder: ${placeholder}`,
          autoFixable: false,
          fixed: false
        });
      }
    });
  }
  
  // Check for untranslated text (same as source)
  if (sourceTranslation && 
      translation.value === sourceTranslation.value && 
      translation.locale !== sourceTranslation.locale) {
    issues.push({
      id: `untranslated_${translation.key}`,
      type: 'inconsistent',
      severity: 'warning',
      key: translation.key,
      locale: translation.locale,
      description: 'Translation appears to be the same as source',
      autoFixable: false,
      fixed: false
    });
  }
  
  return issues;
};

// Extract placeholders from text
export const extractPlaceholders = (text: string): string[] => {
  const placeholders: string[] = [];
  
  // Match {{placeholder}} format
  const matches1 = text.match(/{{\s*(\w+)\s*}}/g);
  if (matches1) {
    placeholders.push(...matches1.map(m => m.replace(/[{}\s]/g, '')));
  }
  
  // Match {placeholder} format
  const matches2 = text.match(/{(\w+)}/g);
  if (matches2) {
    placeholders.push(...matches2.map(m => m.replace(/[{}]/g, '')));
  }
  
  return [...new Set(placeholders)];
};

// Get translation with fallback
export const getTranslation = (
  key: string,
  translations: Record<string, any>,
  options?: TranslationOptions
): string => {
  const namespace = options?.namespace || 'common';
  const fullKey = namespace ? `${namespace}.${key}` : key;
  
  // Try to get translation from nested object
  const keys = fullKey.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      value = undefined;
      break;
    }
  }
  
  // Return translation or fallback
  if (typeof value === 'string') {
    return interpolate(value, options?.interpolation);
  }
  
  // Handle plural forms
  if (typeof value === 'object' && options?.count !== undefined) {
    const pluralForm = getPluralForm(options.count, 'en-US'); // Should use actual locale
    const pluralValue = value[pluralForm] || value['other'] || value['one'];
    if (typeof pluralValue === 'string') {
      return interpolate(pluralValue, { ...options.interpolation, count: options.count });
    }
  }
  
  return options?.defaultValue || options?.fallback || key;
};

// Sort locales by name
export const sortLocales = (locales: Locale[]): Locale[] => {
  return locales.sort((a, b) => {
    // Default locale first
    if (a.default) return -1;
    if (b.default) return 1;
    
    // Then by native name
    return a.nativeName.localeCompare(b.nativeName);
  });
};

// Get text direction for locale
export const getTextDirection = (locale: string): 'ltr' | 'rtl' => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi', 'ji', 'ku', 'dv', 'ps'];
  const lang = parseLocaleCode(locale).language;
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
};

// Convert translation format
export const convertTranslationFormat = (
  translations: Record<string, any>,
  fromFormat: string,
  toFormat: string
): any => {
  // This would implement conversion between different formats
  // For now, just return the translations as-is
  return translations;
};

// Calculate translation statistics
export const calculateTranslationStats = (
  translations: Translation[]
): TranslationStats => {
  const stats: TranslationStats = {
    locale: translations[0]?.locale || '',
    totalKeys: translations.length,
    translatedKeys: 0,
    reviewedKeys: 0,
    approvedKeys: 0,
    completeness: 0,
    lastUpdated: '',
    contributors: 0,
    wordCount: 0,
    characterCount: 0
  };
  
  const contributors = new Set<string>();
  let latestUpdate = new Date(0);
  
  translations.forEach(t => {
    if (t.value) {
      stats.translatedKeys++;
      stats.wordCount += t.value.split(/\s+/).length;
      stats.characterCount += t.value.length;
    }
    
    if (t.status === 'review' || t.status === 'approved' || t.status === 'published') {
      stats.reviewedKeys++;
    }
    
    if (t.status === 'approved' || t.status === 'published') {
      stats.approvedKeys++;
    }
    
    if (t.createdBy) contributors.add(t.createdBy);
    if (t.updatedBy) contributors.add(t.updatedBy);
    
    const updateDate = new Date(t.updatedAt);
    if (updateDate > latestUpdate) {
      latestUpdate = updateDate;
    }
  });
  
  stats.completeness = calculateCompleteness(
    translations.reduce((acc, t) => ({ ...acc, [t.key]: t }), {}),
    stats.totalKeys
  );
  stats.contributors = contributors.size;
  stats.lastUpdated = latestUpdate.toISOString();
  
  return stats;
};

// Generate translation key from text
export const generateTranslationKey = (text: string, namespace?: string): string => {
  // Convert text to a valid key format
  let key = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-+/g, '_') // Replace dashes with underscores
    .replace(/_+/g, '_') // Remove duplicate underscores
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
  
  // Limit length
  if (key.length > 50) {
    key = key.substring(0, 50).replace(/_[^_]*$/, ''); // Cut at last underscore
  }
  
  // Add namespace prefix if provided
  if (namespace) {
    key = `${namespace}.${key}`;
  }
  
  return key || 'untitled_key';
};

// Check if locale is RTL
export const isRTL = (locale: string): boolean => {
  return getTextDirection(locale) === 'rtl';
};

// Format list according to locale
export const formatList = (
  items: string[],
  locale: string,
  type: 'conjunction' | 'disjunction' | 'unit' = 'conjunction'
): string => {
  if (typeof Intl.ListFormat !== 'undefined') {
    return new Intl.ListFormat(locale, { style: 'long', type }).format(items);
  }
  
  // Fallback for browsers without ListFormat support
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    return type === 'conjunction' 
      ? `${items[0]} and ${items[1]}`
      : `${items[0]} or ${items[1]}`;
  }
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1);
  const conjunction = type === 'conjunction' ? 'and' : 'or';
  
  return `${otherItems.join(', ')}, ${conjunction} ${lastItem}`;
};