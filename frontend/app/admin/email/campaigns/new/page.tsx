'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Users,
  Calendar,
  Eye,
  Save,
  Mail,
  Clock,
  Target
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NewEmailCampaign() {
  const [campaignData, setCampaignData] = useState({
    subject: '',
    senderName: 'LessonCraftStudio',
    senderEmail: 'noreply@lessoncraftstudio.com',
    targetAudience: 'all',
    scheduleType: 'immediate',
    scheduleDate: '',
    scheduleTime: '',
    content: '',
    templateType: 'newsletter'
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Campaign saved as draft');
    setSaving(false);
  };

  const handleSendNow = async () => {
    setSaving(true);
    // Simulate send
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Campaign sent successfully to 1,234 recipients');
    setSaving(false);
  };

  const handleSchedule = async () => {
    setSaving(true);
    // Simulate schedule
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Campaign scheduled for ${campaignData.scheduleDate} at ${campaignData.scheduleTime}`);
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href="/admin"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Email Campaign</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and send email campaigns to your users
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6 space-y-6">
            {/* Campaign Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Details</h3>

              {/* Subject */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject Line
                </label>
                <input
                  type="text"
                  id="subject"
                  value={campaignData.subject}
                  onChange={(e) => setCampaignData({ ...campaignData, subject: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Your subject line here..."
                />
              </div>

              {/* Sender Info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    value={campaignData.senderName}
                    onChange={(e) => setCampaignData({ ...campaignData, senderName: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    value={campaignData.senderEmail}
                    onChange={(e) => setCampaignData({ ...campaignData, senderEmail: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                <Target className="inline h-5 w-5 mr-2" />
                Target Audience
              </h3>
              <select
                value={campaignData.targetAudience}
                onChange={(e) => setCampaignData({ ...campaignData, targetAudience: e.target.value })}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              >
                <option value="all">All Users (1,234 recipients)</option>
                <option value="free">Free Users (892 recipients)</option>
                <option value="core">Core Bundle Users (234 recipients)</option>
                <option value="full">Full Access Users (108 recipients)</option>
                <option value="inactive">Inactive Users (156 recipients)</option>
                <option value="new">New Users This Week (45 recipients)</option>
              </select>
            </div>

            {/* Email Content */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Content</h3>

              {/* Template Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Type
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['newsletter', 'promotion', 'announcement', 'welcome'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setCampaignData({ ...campaignData, templateType: type })}
                      className={`px-3 py-2 border rounded-md text-sm font-medium capitalize ${
                        campaignData.templateType === type
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Email Body
                </label>
                <textarea
                  id="content"
                  rows={10}
                  value={campaignData.content}
                  onChange={(e) => setCampaignData({ ...campaignData, content: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Write your email content here. You can use {{firstName}} to personalize..."
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                <Clock className="inline h-5 w-5 mr-2" />
                Schedule
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="immediate"
                    checked={campaignData.scheduleType === 'immediate'}
                    onChange={(e) => setCampaignData({ ...campaignData, scheduleType: e.target.value })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Send immediately</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    value="scheduled"
                    checked={campaignData.scheduleType === 'scheduled'}
                    onChange={(e) => setCampaignData({ ...campaignData, scheduleType: e.target.value })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Schedule for later</span>
                </label>

                {campaignData.scheduleType === 'scheduled' && (
                  <div className="ml-6 grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={campaignData.scheduleDate}
                        onChange={(e) => setCampaignData({ ...campaignData, scheduleDate: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        value={campaignData.scheduleTime}
                        onChange={(e) => setCampaignData({ ...campaignData, scheduleTime: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>

              <div className="space-x-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </span>
                </button>
                {campaignData.scheduleType === 'immediate' ? (
                  <button
                    onClick={handleSendNow}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </button>
                ) : (
                  <button
                    onClick={handleSchedule}
                    disabled={saving || !campaignData.scheduleDate || !campaignData.scheduleTime}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}