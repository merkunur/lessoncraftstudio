'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import {
  EmailTemplate,
  EmailCampaign,
  EmailMessage,
  EmailSubscriber,
  EmailAnalytics,
  EmailProvider,
  EmailAutomation,
  EmailList,
  EmailDomain
} from '@/types/email';
import {
  formatEmailAddress,
  validateEmailTemplate,
  calculateEmailStats,
  interpolateTemplate,
  extractVariables,
  segmentSubscribers,
  calculateEngagementScore,
  getOptimalSendTime,
  formatEmailStats,
  getEmailProviderStatus
} from '@/lib/email-utils';

export default function EmailsPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'templates' | 'campaigns' | 'transactional' | 
    'subscribers' | 'automation' | 'analytics' | 'providers' | 'settings'
  >('overview');

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([]);
  const [automations, setAutomations] = useState<EmailAutomation[]>([]);
  const [providers, setProviders] = useState<EmailProvider[]>([]);
  const [domains, setDomains] = useState<EmailDomain[]>([]);
  const [lists, setLists] = useState<EmailList[]>([]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  const [analytics, setAnalytics] = useState<EmailAnalytics>({
    period: 'week',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
    metrics: {
      sent: 15234,
      delivered: 14876,
      deliveryRate: 97.6,
      opened: 8234,
      openRate: 55.3,
      clicked: 2156,
      clickRate: 14.5,
      clickToOpenRate: 26.2,
      bounced: 358,
      bounceRate: 2.4,
      complained: 12,
      complaintRate: 0.08,
      unsubscribed: 45,
      unsubscribeRate: 0.3
    },
    topPerformers: {
      campaigns: [
        { id: 'camp_1', name: 'Summer Sale', metric: 62.5 },
        { id: 'camp_2', name: 'New Features', metric: 58.3 }
      ],
      templates: [
        { id: 'temp_1', name: 'Newsletter', metric: 56.7 },
        { id: 'temp_2', name: 'Product Update', metric: 54.2 }
      ]
    },
    deviceStats: {
      desktop: 45,
      mobile: 48,
      tablet: 7,
      other: 0
    },
    clientStats: {
      gmail: 35,
      outlook: 28,
      apple: 15,
      yahoo: 12,
      other: 10
    }
  });

  useEffect(() => {
    loadEmailData();
  }, []);

  async function loadEmailData() {
    try {
      const [templatesRes, campaignsRes, messagesRes, subscribersRes] = await Promise.all([
        fetch('/api/emails/templates'),
        fetch('/api/emails/campaigns'),
        fetch('/api/emails/messages?limit=100'),
        fetch('/api/emails/subscribers?limit=100')
      ]);

      if (templatesRes.ok) setTemplates(await templatesRes.json());
      if (campaignsRes.ok) setCampaigns(await campaignsRes.json());
      if (messagesRes.ok) setMessages(await messagesRes.json());
      if (subscribersRes.ok) setSubscribers(await subscribersRes.json());
    } catch (error) {
      console.error('Failed to load email data:', error);
    }
  }

  async function sendTestEmail(template: EmailTemplate) {
    if (!testEmail) return;

    try {
      const response = await fetch('/api/emails/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          to: testEmail,
          variables: {}
        })
      });

      if (response.ok) {
        alert('Test email sent successfully');
      }
    } catch (error) {
      console.error('Failed to send test email:', error);
    }
  }

  async function saveTemplate(template: EmailTemplate) {
    try {
      const response = await fetch(
        `/api/emails/templates${template.id ? `/${template.id}` : ''}`,
        {
          method: template.id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(template)
        }
      );

      if (response.ok) {
        await loadEmailData();
        setSelectedTemplate(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  }

  async function launchCampaign(campaign: EmailCampaign) {
    if (confirm(`Launch campaign "${campaign.name}"?`)) {
      try {
        const response = await fetch(`/api/emails/campaigns/${campaign.id}/launch`, {
          method: 'POST'
        });

        if (response.ok) {
          await loadEmailData();
        }
      } catch (error) {
        console.error('Failed to launch campaign:', error);
      }
    }
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Sent</h3>
        <p className="text-2xl font-bold mt-2">{analytics.metrics.sent.toLocaleString()}</p>
        <p className="text-sm text-green-500 mt-1">↑ 12% from last period</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Open Rate</h3>
        <p className="text-2xl font-bold mt-2">{analytics.metrics.openRate}%</p>
        <p className="text-sm text-green-500 mt-1">↑ 3.2% from last period</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Click Rate</h3>
        <p className="text-2xl font-bold mt-2">{analytics.metrics.clickRate}%</p>
        <p className="text-sm text-red-500 mt-1">↓ 0.5% from last period</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Subscribers</h3>
        <p className="text-2xl font-bold mt-2">{subscribers.length.toLocaleString()}</p>
        <p className="text-sm text-green-500 mt-1">↑ 234 new this week</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 col-span-full">
        <h3 className="text-lg font-semibold mb-4">Recent Campaigns</h3>
        <div className="space-y-3">
          {campaigns.slice(0, 5).map(campaign => (
            <div key={campaign.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{campaign.name}</p>
                <p className="text-sm text-gray-500">
                  {campaign.status} • {campaign.stats.sent.toLocaleString()} sent
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {campaign.stats.openRate?.toFixed(1)}% opens
                </p>
                <p className="text-sm text-gray-500">
                  {campaign.stats.clickRate?.toFixed(1)}% clicks
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Email Templates</h2>
        <button
          onClick={() => {
            setSelectedTemplate({
              id: '',
              name: '',
              subject: '',
              category: 'transactional',
              status: 'draft',
              html: '',
              variables: [],
              fromName: '',
              fromEmail: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              createdBy: 'user_1',
              updatedBy: 'user_1',
              version: 1
            });
            setIsEditing(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Template
        </button>
      </div>

      {isEditing && selectedTemplate ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedTemplate.id ? 'Edit' : 'Create'} Template
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Template Name"
              value={selectedTemplate.name}
              onChange={(e) => setSelectedTemplate({
                ...selectedTemplate,
                name: e.target.value
              })}
              className="border rounded px-3 py-2"
            />

            <select
              value={selectedTemplate.category}
              onChange={(e) => setSelectedTemplate({
                ...selectedTemplate,
                category: e.target.value as EmailTemplate['category']
              })}
              className="border rounded px-3 py-2"
            >
              <option value="transactional">Transactional</option>
              <option value="marketing">Marketing</option>
              <option value="notification">Notification</option>
              <option value="newsletter">Newsletter</option>
              <option value="system">System</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Subject Line"
            value={selectedTemplate.subject}
            onChange={(e) => setSelectedTemplate({
              ...selectedTemplate,
              subject: e.target.value
            })}
            className="border rounded px-3 py-2 w-full mb-4"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="From Name"
              value={selectedTemplate.fromName}
              onChange={(e) => setSelectedTemplate({
                ...selectedTemplate,
                fromName: e.target.value
              })}
              className="border rounded px-3 py-2"
            />

            <input
              type="email"
              placeholder="From Email"
              value={selectedTemplate.fromEmail}
              onChange={(e) => setSelectedTemplate({
                ...selectedTemplate,
                fromEmail: e.target.value
              })}
              className="border rounded px-3 py-2"
            />
          </div>

          <textarea
            placeholder="HTML Content (use {{variable}} for placeholders)"
            value={selectedTemplate.html}
            onChange={(e) => {
              const html = e.target.value;
              const variables = extractVariables(html);
              setSelectedTemplate({
                ...selectedTemplate,
                html,
                variables: variables.map(name => ({
                  name,
                  type: 'string',
                  required: false,
                  defaultValue: ''
                }))
              });
            }}
            className="border rounded px-3 py-2 w-full mb-4"
            rows={10}
          />

          {selectedTemplate.variables.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Variables Detected:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.variables.map(variable => (
                  <span
                    key={variable.name}
                    className="bg-gray-100 px-3 py-1 rounded text-sm"
                  >
                    {`{{${variable.name}}}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => saveTemplate(selectedTemplate)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Template
            </button>

            <button
              onClick={() => {
                setSelectedTemplate(null);
                setIsEditing(false);
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            {selectedTemplate.id && (
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="email"
                  placeholder="Test email address"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="border rounded px-3 py-2"
                />
                <button
                  onClick={() => sendTestEmail(selectedTemplate)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Send Test
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {templates.map(template => (
                <tr key={template.id}>
                  <td className="px-6 py-4">
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-gray-500">
                      v{template.version} • Updated {new Date(template.updatedAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {template.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{template.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      template.status === 'active' ? 'bg-green-100 text-green-800' :
                      template.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {template.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {template.analytics && (
                      <div className="text-sm">
                        <p>{template.analytics.opened.toLocaleString()} opens</p>
                        <p className="text-gray-500">{template.analytics.clicked.toLocaleString()} clicks</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsEditing(true);
                      }}
                      className="text-blue-500 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const newTemplate = { ...template, id: '', name: `${template.name} (Copy)` };
                        setSelectedTemplate(newTemplate);
                        setIsEditing(true);
                      }}
                      className="text-gray-500 hover:underline"
                    >
                      Duplicate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderCampaigns = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Email Campaigns</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Campaign
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Audience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map(campaign => (
              <tr key={campaign.id}>
                <td className="px-6 py-4">
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-gray-500">{campaign.content.subject}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm">{campaign.audience.totalRecipients?.toLocaleString()} recipients</p>
                  <p className="text-sm text-gray-500">{campaign.audience.type}</p>
                </td>
                <td className="px-6 py-4">
                  {campaign.schedule?.sendAt ? (
                    <p className="text-sm">{new Date(campaign.schedule.sendAt).toLocaleString()}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Not scheduled</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p>{campaign.stats.openRate?.toFixed(1)}% opens</p>
                    <p className="text-gray-500">{campaign.stats.clickRate?.toFixed(1)}% clicks</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => launchCampaign(campaign)}
                      className="text-green-500 hover:underline"
                    >
                      Launch
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <h2 className="text-xl font-semibold mb-6">Email Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Delivery Rate</span>
              <span className="font-medium">{analytics.metrics.deliveryRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Open Rate</span>
              <span className="font-medium">{analytics.metrics.openRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Click Rate</span>
              <span className="font-medium">{analytics.metrics.clickRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Click-to-Open Rate</span>
              <span className="font-medium">{analytics.metrics.clickToOpenRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Bounce Rate</span>
              <span className="font-medium">{analytics.metrics.bounceRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Unsubscribe Rate</span>
              <span className="font-medium">{analytics.metrics.unsubscribeRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Device & Client Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Devices</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Mobile</span>
                  <span>{analytics.deviceStats?.mobile}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Desktop</span>
                  <span>{analytics.deviceStats?.desktop}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tablet</span>
                  <span>{analytics.deviceStats?.tablet}%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Email Clients</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Gmail</span>
                  <span>{analytics.clientStats?.gmail}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Outlook</span>
                  <span>{analytics.clientStats?.outlook}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Apple Mail</span>
                  <span>{analytics.clientStats?.apple}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Optimal Send Time</h3>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-500">Tuesday, 10:00 AM</p>
          <p className="text-sm text-gray-500 mt-2">
            Based on highest engagement from past campaigns
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email System</h1>

        <div className="border-b mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'templates', label: 'Templates' },
              { id: 'campaigns', label: 'Campaigns' },
              { id: 'transactional', label: 'Transactional' },
              { id: 'subscribers', label: 'Subscribers' },
              { id: 'automation', label: 'Automation' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'providers', label: 'Providers' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
}