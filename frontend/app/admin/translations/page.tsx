'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Globe,
  Languages,
  Edit3,
  Check,
  X,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  Eye,
  Copy,
  Trash2,
  MessageSquare,
  Flag,
  BarChart,
  TrendingUp,
  Hash,
  Type,
  Calendar,
  DollarSign,
  Percent
} from 'lucide-react';
import {
  Locale,
  Translation,
  TranslationKey,
  TranslationProject,
  TranslationTask,
  TranslationStats,
  QualityIssue,
  GlossaryTerm,
  TranslationImport,
  TranslationExport
} from '@/types/i18n';
import {
  detectBrowserLocale,
  findBestLocale,
  interpolate,
  formatDate,
  formatTime,
  formatNumber,
  formatCurrency,
  formatRelativeTime,
  calculateCompleteness,
  validateTranslation,
  extractPlaceholders,
  getTranslation,
  sortLocales,
  getTextDirection,
  calculateTranslationStats,
  generateTranslationKey
} from '@/lib/i18n-utils';

interface TabConfig {
  id: string;
  label: string;
  icon: JSX.Element;
}

const tabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: <Globe className="w-4 h-4" /> },
  { id: 'translations', label: 'Translations', icon: <Languages className="w-4 h-4" /> },
  { id: 'editor', label: 'Editor', icon: <Edit3 className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <FileText className="w-4 h-4" /> },
  { id: 'tasks', label: 'Tasks', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'glossary', label: 'Glossary', icon: <Type className="w-4 h-4" /> },
  { id: 'quality', label: 'Quality', icon: <AlertCircle className="w-4 h-4" /> },
  { id: 'import-export', label: 'Import/Export', icon: <Download className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
];

export default function TranslationsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [locales, setLocales] = useState<Locale[]>([]);
  const [selectedLocale, setSelectedLocale] = useState<string>('');
  const [sourceLocale, setSourceLocale] = useState<string>('en-US');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>([]);
  const [projects, setProjects] = useState<TranslationProject[]>([]);
  const [tasks, setTasks] = useState<TranslationTask[]>([]);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([]);
  const [stats, setStats] = useState<Record<string, TranslationStats>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNamespace, setSelectedNamespace] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Load translation data
  const loadTranslationData = useCallback(async () => {
    setIsLoading(true);
    try {
      const responses = await Promise.allSettled([
        fetch('/api/i18n/locales'),
        fetch('/api/i18n/translations'),
        fetch('/api/i18n/keys'),
        fetch('/api/i18n/projects'),
        fetch('/api/i18n/tasks'),
        fetch('/api/i18n/glossary'),
        fetch('/api/i18n/quality'),
        fetch('/api/i18n/stats')
      ]);

      responses.forEach(async (response, index) => {
        if (response.status === 'fulfilled' && response.value.ok) {
          const data = await response.value.json();
          switch (index) {
            case 0:
              setLocales(sortLocales(data));
              if (!selectedLocale && data.length > 0) {
                setSelectedLocale(data.find((l: Locale) => !l.default)?.code || data[0].code);
              }
              break;
            case 1:
              setTranslations(data);
              break;
            case 2:
              setTranslationKeys(data);
              break;
            case 3:
              setProjects(data);
              break;
            case 4:
              setTasks(data);
              break;
            case 5:
              setGlossaryTerms(data);
              break;
            case 6:
              setQualityIssues(data);
              break;
            case 7:
              setStats(data);
              break;
          }
        }
      });
    } catch (error) {
      console.error('Failed to load translation data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLocale]);

  useEffect(() => {
    loadTranslationData();
  }, [loadTranslationData]);

  // Filter translations
  const filteredTranslations = translations.filter(t => {
    const matchesSearch = searchTerm === '' ||
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.value.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNamespace = selectedNamespace === 'all' ||
      t.namespace === selectedNamespace;

    const matchesStatus = selectedStatus === 'all' ||
      t.status === selectedStatus;

    const matchesLocale = t.locale === selectedLocale;

    return matchesSearch && matchesNamespace && matchesStatus && matchesLocale;
  });

  // Get namespaces
  const namespaces = Array.from(new Set(translations.map(t => t.namespace)));

  // Get current locale data
  const currentLocale = locales.find(l => l.code === selectedLocale);

  // Save translation
  const saveTranslation = async (translation: Translation) => {
    try {
      const response = await fetch(`/api/i18n/translations/${translation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(translation)
      });

      if (response.ok) {
        const updated = await response.json();
        setTranslations(prev => prev.map(t =>
          t.id === updated.id ? updated : t
        ));
        setEditingTranslation(null);
        await loadTranslationData();
      }
    } catch (error) {
      console.error('Failed to save translation:', error);
    }
  };

  // Import translations
  const handleImport = async (file: File, format: string, locale: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    formData.append('locale', locale);

    try {
      const response = await fetch('/api/i18n/import', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        await loadTranslationData();
      }
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  // Export translations
  const handleExport = async (format: string, locales: string[], namespaces: string[]) => {
    try {
      const response = await fetch('/api/i18n/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, locales, namespaces })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `translations-${format}-${Date.now()}.${format}`;
        a.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Languages className="h-8 w-8" />
              Translation Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage translations, locales, and internationalization settings
            </p>
          </div>
          <div className="flex items-center gap-2">
            {currentLocale && (
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-2">
                <span className="text-lg">{currentLocale.flag || '🌍'}</span>
                <span className="font-medium">{currentLocale.nativeName}</span>
                <span className="text-sm">({currentLocale.code})</span>
              </div>
            )}
            <button
              onClick={loadTranslationData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Translation Overview</h2>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Locales</span>
                    <Globe className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold">{locales.length}</div>
                  <div className="text-sm text-gray-500">
                    {locales.filter(l => l.enabled).length} enabled
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Translation Keys</span>
                    <Hash className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold">{translationKeys.length}</div>
                  <div className="text-sm text-gray-500">
                    Across {namespaces.length} namespaces
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Active Projects</span>
                    <FileText className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-500">
                    {projects.length} total projects
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Pending Tasks</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold">
                    {tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length}
                  </div>
                  <div className="text-sm text-gray-500">
                    {tasks.filter(t => t.priority === 'urgent').length} urgent
                  </div>
                </div>
              </div>

              {/* Locale Progress */}
              <div>
                <h3 className="font-semibold mb-3">Translation Progress by Locale</h3>
                <div className="space-y-3">
                  {locales.map((locale) => {
                    const localeStats = stats[locale.code];
                    const completeness = localeStats?.completeness || 0;

                    return (
                      <div key={locale.code} className="bg-white border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{locale.flag || '🌍'}</span>
                            <div>
                              <div className="font-medium">{locale.nativeName}</div>
                              <div className="text-sm text-gray-500">{locale.code}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{completeness}%</div>
                            <div className="text-sm text-gray-500">
                              {localeStats?.translatedKeys || 0} / {localeStats?.totalKeys || 0} keys
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              completeness >= 90 ? 'bg-green-600' :
                              completeness >= 70 ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${completeness}%` }}
                          ></div>
                        </div>
                        {localeStats && (
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>Reviewed: {localeStats.reviewedKeys}</span>
                            <span>Approved: {localeStats.approvedKeys}</span>
                            <span>Contributors: {localeStats.contributors}</span>
                            <span>Last updated: {formatRelativeTime(localeStats.lastUpdated, 'en-US')}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quality Issues Summary */}
              {qualityIssues.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Quality Issues Detected
                  </h3>
                  <div className="text-sm text-yellow-700">
                    {qualityIssues.filter(i => i.severity === 'error').length} errors,{' '}
                    {qualityIssues.filter(i => i.severity === 'warning').length} warnings,{' '}
                    {qualityIssues.filter(i => i.severity === 'info').length} suggestions
                  </div>
                  <button
                    onClick={() => setActiveTab('quality')}
                    className="mt-2 text-sm text-yellow-800 underline hover:no-underline"
                  >
                    View all issues →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Translations Tab */}
          {activeTab === 'translations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Translations</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLocale}
                    onChange={(e) => setSelectedLocale(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    {locales.filter(l => !l.default).map(locale => (
                      <option key={locale.code} value={locale.code}>
                        {locale.flag} {locale.nativeName} ({locale.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Search translations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  />
                  <select
                    value={selectedNamespace}
                    onChange={(e) => setSelectedNamespace(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="all">All Namespaces</option>
                    {namespaces.map(ns => (
                      <option key={ns} value={ns}>{ns}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border rounded-lg text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Translations Table */}
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source ({sourceLocale})
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Translation ({selectedLocale})
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTranslations.slice(0, 20).map((translation) => {
                      const sourceTranslation = translations.find(
                        t => t.key === translation.key && t.locale === sourceLocale
                      );
                      const placeholders = extractPlaceholders(sourceTranslation?.value || '');

                      return (
                        <tr key={translation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-mono">
                            <div>{translation.key}</div>
                            <div className="text-xs text-gray-500">{translation.namespace}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="max-w-xs truncate" title={sourceTranslation?.value}>
                              {sourceTranslation?.value || <span className="text-gray-400">—</span>}
                            </div>
                            {placeholders.length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Placeholders: {placeholders.join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {editingTranslation?.id === translation.id ? (
                              <div className="flex items-center gap-2">
                                <textarea
                                  ref={editorRef}
                                  value={editingTranslation.value}
                                  onChange={(e) => setEditingTranslation({
                                    ...editingTranslation,
                                    value: e.target.value
                                  })}
                                  className="px-2 py-1 border rounded w-full min-h-[60px]"
                                  dir={getTextDirection(selectedLocale)}
                                />
                                <button
                                  onClick={() => saveTranslation(editingTranslation)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingTranslation(null)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div
                                className="max-w-xs truncate cursor-pointer hover:text-blue-600"
                                title={translation.value}
                                onClick={() => setEditingTranslation(translation)}
                                dir={getTextDirection(selectedLocale)}
                              >
                                {translation.value || <span className="text-gray-400">Click to translate</span>}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              translation.status === 'published' ? 'bg-green-100 text-green-700' :
                              translation.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                              translation.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {translation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingTranslation(translation)}
                                className="text-blue-600 hover:text-blue-700"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                className="text-gray-600 hover:text-gray-700"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-gray-600 hover:text-gray-700"
                                title="Copy"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Editor Tab */}
          {activeTab === 'editor' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Translation Editor</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Source */}
                <div>
                  <h3 className="font-medium mb-2">Source ({sourceLocale})</h3>
                  <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                    {translationKeys.slice(0, 10).map((key) => {
                      const sourceTranslation = translations.find(
                        t => t.key === key.key && t.locale === sourceLocale
                      );

                      return (
                        <div key={key.id} className="mb-4 p-3 bg-white rounded border">
                          <div className="font-mono text-sm text-gray-600 mb-1">{key.key}</div>
                          <div className="text-sm">{sourceTranslation?.value || '—'}</div>
                          {key.description && (
                            <div className="text-xs text-gray-500 mt-1">{key.description}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Target */}
                <div>
                  <h3 className="font-medium mb-2">Target ({selectedLocale})</h3>
                  <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                    {translationKeys.slice(0, 10).map((key) => {
                      const targetTranslation = translations.find(
                        t => t.key === key.key && t.locale === selectedLocale
                      );

                      return (
                        <div key={key.id} className="mb-4 p-3 bg-white rounded border">
                          <div className="font-mono text-sm text-gray-600 mb-1">{key.key}</div>
                          <textarea
                            value={targetTranslation?.value || ''}
                            onChange={(e) => {
                              const updated = {
                                ...targetTranslation,
                                value: e.target.value
                              } as Translation;
                              setTranslations(prev => prev.map(t =>
                                t.id === updated.id ? updated : t
                              ));
                            }}
                            className="w-full px-2 py-1 border rounded text-sm"
                            rows={2}
                            dir={getTextDirection(selectedLocale)}
                            placeholder="Enter translation..."
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div>
                <h3 className="font-medium mb-2">Live Preview</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="prose max-w-none" dir={getTextDirection(selectedLocale)}>
                    <p className="text-gray-600 text-center">
                      Select a translation to preview how it will appear in the application
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would follow similar patterns... */}
        </div>
      </div>
    </div>
  );
}