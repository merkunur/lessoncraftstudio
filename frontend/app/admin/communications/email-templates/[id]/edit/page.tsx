'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Mail,
  Save,
  Send,
  Code,
  Eye,
  Smartphone,
  Monitor,
  ChevronLeft,
  Copy,
  Zap,
  FileText,
  Settings,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'transactional' | 'marketing' | 'system';
  type: string;
  status: 'active' | 'draft' | 'archived';
  htmlContent: string;
  textContent: string;
  variables: string[];
  tags: string[];
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  preheader?: string;
  settings: {
    trackOpens: boolean;
    trackClicks: boolean;
    enableUnsubscribe: boolean;
    customHeaders?: Record<string, string>;
  };
}

interface Variable {
  name: string;
  description: string;
  defaultValue?: string;
  required: boolean;
}

const availableVariables: Variable[] = [
  { name: 'firstName', description: 'User\'s first name', required: true },
  { name: 'lastName', description: 'User\'s last name', required: false },
  { name: 'email', description: 'User\'s email address', required: true },
  { name: 'userName', description: 'User\'s display name', required: false },
  { name: 'companyName', description: 'Company name', defaultValue: 'LessonCraftStudio', required: false },
  { name: 'currentDate', description: 'Current date', required: false },
  { name: 'currentYear', description: 'Current year', defaultValue: '2024', required: false },
  { name: 'unsubscribeLink', description: 'Unsubscribe URL', required: false },
  { name: 'worksheetName', description: 'Worksheet name', required: false },
  { name: 'worksheetLink', description: 'Worksheet URL', required: false },
  { name: 'invoiceNumber', description: 'Invoice number', required: false },
  { name: 'amount', description: 'Payment amount', required: false },
  { name: 'resetLink', description: 'Password reset link', required: false },
  { name: 'activationLink', description: 'Account activation link', required: false }
];

export default function EditEmailTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'html' | 'text' | 'preview' | 'settings'>('editor');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [testEmail, setTestEmail] = useState('');
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [showVariablePanel, setShowVariablePanel] = useState(true);

  useEffect(() => {
    fetchTemplate();
  }, [params.id]);

  const fetchTemplate = async () => {
    try {
      // Mock data - replace with API call
      const mockTemplate: EmailTemplate = {
        id: params.id as string,
        name: 'Welcome Email',
        subject: 'Welcome to LessonCraftStudio, {{firstName}}!',
        category: 'transactional',
        type: 'welcome-email',
        status: 'active',
        htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LessonCraftStudio</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
    <h1 style="color: #2563eb;">Welcome to LessonCraftStudio, {{firstName}}!</h1>
    <p>We're excited to have you join our community of educators.</p>
    <p>With LessonCraftStudio, you can:</p>
    <ul>
      <li>Create custom worksheets in minutes</li>
      <li>Access hundreds of templates</li>
      <li>Save and organize your work</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{activationLink}}" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Get Started</a>
    </div>
    <p style="color: #666; font-size: 14px;">If you have any questions, feel free to reply to this email.</p>
  </div>
</body>
</html>`,
        textContent: `Welcome to LessonCraftStudio, {{firstName}}!

We're excited to have you join our community of educators.

With LessonCraftStudio, you can:
- Create custom worksheets in minutes
- Access hundreds of templates
- Save and organize your work

Get started: {{activationLink}}

If you have any questions, feel free to reply to this email.

Best regards,
The LessonCraftStudio Team`,
        variables: ['firstName', 'activationLink'],
        tags: ['welcome', 'onboarding', 'new-user'],
        fromName: 'LessonCraftStudio',
        fromEmail: 'hello@lessoncraftstudio.com',
        replyTo: 'support@lessoncraftstudio.com',
        preheader: 'Start creating amazing worksheets today!',
        settings: {
          trackOpens: true,
          trackClicks: true,
          enableUnsubscribe: true
        }
      };

      setTemplate(mockTemplate);
      setSelectedVariables(mockTemplate.variables);
    } catch (error) {
      console.error('Error fetching template:', error);
      toast.error('Failed to load template');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!template) return;
    
    setSaving(true);
    try {
      // In production, save via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Template saved successfully');
    } catch (error) {
      toast.error('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    if (!testEmail) {
      toast.error('Please enter a test email address');
      return;
    }

    try {
      // In production, send test via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Test email sent to ${testEmail}`);
    } catch (error) {
      toast.error('Failed to send test email');
    }
  };

  const insertVariable = (variable: string) => {
    if (!template) return;

    const insertion = `{{${variable}}}`;
    
    if (activeTab === 'editor' || activeTab === 'html') {
      const newContent = template.htmlContent + insertion;
      setTemplate({ ...template, htmlContent: newContent });
    } else if (activeTab === 'text') {
      const newContent = template.textContent + insertion;
      setTemplate({ ...template, textContent: newContent });
    }

    if (!selectedVariables.includes(variable)) {
      setSelectedVariables([...selectedVariables, variable]);
    }

    toast.success(`Variable {{${variable}}} inserted`);
  };

  const handleVariableToggle = (variable: string) => {
    if (selectedVariables.includes(variable)) {
      setSelectedVariables(selectedVariables.filter(v => v !== variable));
    } else {
      setSelectedVariables([...selectedVariables, variable]);
      insertVariable(variable);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <p className="text-gray-600">Template not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {template.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  template.status === 'active' ? 'bg-green-100 text-green-700' :
                  template.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {template.status}
                </span>
                <span className="text-sm text-gray-500">{template.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-4">
              <input
                type="email"
                placeholder="Test email address"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendTest}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
              >
                <Send className="h-4 w-4" />
                Send Test
              </button>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-6">
        <div className="flex gap-1">
          {[
            { id: 'editor', label: 'Visual Editor', icon: Eye },
            { id: 'html', label: 'HTML', icon: Code },
            { id: 'text', label: 'Plain Text', icon: FileText },
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 bg-white overflow-auto">
          {activeTab === 'editor' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {/* Subject Line */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={template.subject}
                    onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Preheader */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preheader Text
                  </label>
                  <input
                    type="text"
                    value={template.preheader || ''}
                    onChange={(e) => setTemplate({ ...template, preheader: e.target.value })}
                    placeholder="Preview text that appears after subject..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Visual Editor (simplified) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content
                  </label>
                  <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50">
                    <div className="bg-white rounded-lg p-6">
                      <div dangerouslySetInnerHTML={{ __html: template.htmlContent }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="p-6">
              <div className="max-w-6xl mx-auto">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">HTML Source</h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(template.htmlContent)}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
                <textarea
                  value={template.htmlContent}
                  onChange={(e) => setTemplate({ ...template, htmlContent: e.target.value })}
                  className="w-full h-[600px] px-4 py-3 font-mono text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  spellCheck="false"
                />
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Plain Text Version</h3>
                  <p className="text-xs text-gray-500">
                    This version will be used for email clients that don't support HTML
                  </p>
                </div>
                <textarea
                  value={template.textContent}
                  onChange={(e) => setTemplate({ ...template, textContent: e.target.value })}
                  className="w-full h-[500px] px-4 py-3 font-mono text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  spellCheck="false"
                />
                <button className="mt-3 px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4" />
                  Generate from HTML
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="p-6 bg-gray-100">
              <div className="max-w-4xl mx-auto">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Email Preview</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${
                        previewMode === 'desktop'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Monitor className="h-4 w-4" />
                      Desktop
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${
                        previewMode === 'mobile'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile
                    </button>
                  </div>
                </div>

                <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
                }`}>
                  {/* Email Client UI */}
                  <div className="bg-gray-50 border-b px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">From: {template.fromName} &lt;{template.fromEmail}&gt;</p>
                    <p className="text-sm text-gray-600">To: john.doe@example.com</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{template.subject.replace(/{{\w+}}/g, 'John')}</p>
                  </div>
                  
                  {/* Email Content */}
                  <div className="p-6">
                    <div dangerouslySetInnerHTML={{ 
                      __html: template.htmlContent.replace(/{{firstName}}/g, 'John')
                        .replace(/{{activationLink}}/g, '#')
                        .replace(/{{\w+}}/g, '[Variable]')
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Settings</h3>

                {/* Sender Information */}
                <div className="bg-white rounded-lg border p-6 mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Sender Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={template.fromName}
                        onChange={(e) => setTemplate({ ...template, fromName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Email
                      </label>
                      <input
                        type="email"
                        value={template.fromEmail}
                        onChange={(e) => setTemplate({ ...template, fromEmail: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reply-To Email
                      </label>
                      <input
                        type="email"
                        value={template.replyTo || ''}
                        onChange={(e) => setTemplate({ ...template, replyTo: e.target.value })}
                        placeholder="Optional"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Tracking Settings */}
                <div className="bg-white rounded-lg border p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Tracking Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={template.settings.trackOpens}
                        onChange={(e) => setTemplate({
                          ...template,
                          settings: { ...template.settings, trackOpens: e.target.checked }
                        })}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">Track email opens</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={template.settings.trackClicks}
                        onChange={(e) => setTemplate({
                          ...template,
                          settings: { ...template.settings, trackClicks: e.target.checked }
                        })}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">Track link clicks</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={template.settings.enableUnsubscribe}
                        onChange={(e) => setTemplate({
                          ...template,
                          settings: { ...template.settings, enableUnsubscribe: e.target.checked }
                        })}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">Include unsubscribe link</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Variables Panel */}
        {showVariablePanel && activeTab !== 'preview' && activeTab !== 'settings' && (
          <div className="w-80 bg-white border-l overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Variables</h3>
              <button
                onClick={() => setShowVariablePanel(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Click to insert variables into your template
              </p>
              
              <div className="space-y-2">
                {availableVariables.map(variable => (
                  <button
                    key={variable.name}
                    onClick={() => insertVariable(variable.name)}
                    className={`w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors ${
                      selectedVariables.includes(variable.name) ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-sm font-semibold text-blue-600">
                        {`{{${variable.name}}}`}
                      </code>
                      {variable.required && (
                        <span className="text-xs text-red-600">Required</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{variable.description}</p>
                    {variable.defaultValue && (
                      <p className="text-xs text-gray-500 mt-1">Default: {variable.defaultValue}</p>
                    )}
                  </button>
                ))}
              </div>

              {/* Used Variables */}
              {selectedVariables.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Used in template:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVariables.map(v => (
                      <span
                        key={v}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1"
                      >
                        {`{{${v}}}`}
                        <button
                          onClick={() => setSelectedVariables(selectedVariables.filter(sv => sv !== v))}
                          className="hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Show Variables Button */}
        {!showVariablePanel && activeTab !== 'preview' && activeTab !== 'settings' && (
          <button
            onClick={() => setShowVariablePanel(true)}
            className="fixed right-4 bottom-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
          >
            <Code className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}