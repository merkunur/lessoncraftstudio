'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Activity,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  Upload,
  Trash2,
  Link2,
  Github,
  Twitter,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  phone?: string;
  location?: string;
  timezone: string;
  language: string;
  dateFormat: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  department?: string;
  jobTitle?: string;
  organization?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    weeklyReport: boolean;
    activityDigest: boolean;
    twoFactorEnabled: boolean;
    publicProfile: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    startDate: string;
    endDate?: string;
    autoRenew: boolean;
  };
  stats: {
    worksheetsCreated: number;
    studentsManaged: number;
    totalDownloads: number;
    storageUsed: number;
    lastLogin: string;
    accountCreated: string;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }>;
}

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'activity' | 'api'>('profile');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Mock profile data
      const mockProfile: UserProfile = {
        id: 'user_1',
        username: 'johndoe',
        email: 'john.doe@example.com',
        emailVerified: true,
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        avatar: 'https://i.pravatar.cc/300?img=1',
        coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        bio: 'Passionate educator dedicated to creating engaging learning materials for students. Specializing in mathematics and science worksheets.',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        timezone: 'America/Los_Angeles',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        role: 'admin',
        department: 'Education',
        jobTitle: 'Senior Educator',
        organization: 'Bright Minds Academy',
        website: 'https://johndoe.com',
        socialLinks: {
          twitter: 'johndoe',
          linkedin: 'johndoe',
          github: 'johndoe'
        },
        preferences: {
          theme: 'light',
          emailNotifications: true,
          pushNotifications: false,
          marketingEmails: false,
          weeklyReport: true,
          activityDigest: true,
          twoFactorEnabled: true,
          publicProfile: true,
          showEmail: false,
          showPhone: false
        },
        subscription: {
          plan: 'premium',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          autoRenew: true
        },
        stats: {
          worksheetsCreated: 234,
          studentsManaged: 56,
          totalDownloads: 1892,
          storageUsed: 2.4 * 1024 * 1024 * 1024, // 2.4 GB in bytes
          lastLogin: '2024-11-28T15:30:00Z',
          accountCreated: '2023-06-15T10:00:00Z'
        },
        achievements: [
          {
            id: '1',
            name: 'Early Adopter',
            description: 'Joined during beta phase',
            icon: '🌟',
            unlockedAt: '2023-06-15'
          },
          {
            id: '2',
            name: 'Worksheet Master',
            description: 'Created 100+ worksheets',
            icon: '📚',
            unlockedAt: '2024-03-20'
          },
          {
            id: '3',
            name: 'Popular Creator',
            description: '1000+ downloads',
            icon: '🏆',
            unlockedAt: '2024-08-15'
          }
        ]
      };

      setProfile(mockProfile);
      setEditedProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    try {
      // Save profile changes
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(editedProfile as UserProfile);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      // Mock upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newAvatarUrl = URL.createObjectURL(file);
      setEditedProfile(prev => ({ ...prev, avatar: newAvatarUrl }));
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {profile?.coverImage && (
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-24 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={editing ? editedProfile.avatar : profile?.avatar}
                    alt={profile?.displayName}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  {editing && (
                    <>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        disabled={uploadingAvatar}
                      >
                        {uploadingAvatar ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        ) : (
                          <Camera className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  {editing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedProfile.displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        className="text-2xl font-bold px-2 py-1 border rounded"
                      />
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-gray-600"
                        rows={3}
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold">{profile?.displayName}</h1>
                      <p className="text-gray-600 mt-1">@{profile?.username}</p>
                      <p className="text-gray-700 mt-3">{profile?.bio}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                        {profile?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {profile.location}
                          </div>
                        )}
                        {profile?.organization && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {profile.organization}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {new Date(profile?.stats.accountCreated || '').toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Edit Actions */}
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold">{profile?.stats.worksheetsCreated}</p>
                <p className="text-sm text-gray-600">Worksheets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profile?.stats.studentsManaged}</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profile?.stats.totalDownloads}</p>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatBytes(profile?.stats.storageUsed || 0)}</p>
                <p className="text-sm text-gray-600">Storage Used</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Details
                </div>
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'preferences'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Preferences
                </div>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </div>
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'activity'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Activity
                </div>
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'api'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  API Keys
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editing ? editedProfile.firstName : profile?.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!editing}
                      className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editing ? editedProfile.lastName : profile?.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!editing}
                      className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={profile?.email}
                        disabled
                        className="flex-1 px-3 py-2 border rounded-lg disabled:bg-gray-50"
                      />
                      {profile?.emailVerified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editing ? editedProfile.phone : profile?.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!editing}
                      className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={editing ? editedProfile.jobTitle : profile?.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      disabled={!editing}
                      className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={editing ? editedProfile.department : profile?.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      disabled={!editing}
                      className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={editing ? editedProfile.socialLinks?.twitter : profile?.socialLinks.twitter}
                        onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
                        disabled={!editing}
                        placeholder="Twitter username"
                        className="flex-1 px-3 py-2 border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={editing ? editedProfile.socialLinks?.linkedin : profile?.socialLinks.linkedin}
                        onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
                        disabled={!editing}
                        placeholder="LinkedIn username"
                        className="flex-1 px-3 py-2 border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={editing ? editedProfile.socialLinks?.github : profile?.socialLinks.github}
                        onChange={(e) => handleNestedChange('socialLinks', 'github', e.target.value)}
                        disabled={!editing}
                        placeholder="GitHub username"
                        className="flex-1 px-3 py-2 border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={editing ? editedProfile.website : profile?.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!editing}
                        placeholder="Personal website"
                        className="flex-1 px-3 py-2 border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {profile?.achievements.map(achievement => (
                      <div
                        key={achievement.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">General Preferences</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Theme
                        </label>
                        <select className="w-full px-3 py-2 border rounded-lg">
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <select className="w-full px-3 py-2 border rounded-lg">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timezone
                        </label>
                        <select className="w-full px-3 py-2 border rounded-lg">
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/New_York">Eastern Time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Format
                        </label>
                        <select className="w-full px-3 py-2 border rounded-lg">
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive important updates via email</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.emailNotifications} className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Browser push notifications for real-time updates</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.pushNotifications} className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Weekly Report</p>
                        <p className="text-sm text-gray-600">Summary of your weekly activity</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.weeklyReport} className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Activity Digest</p>
                        <p className="text-sm text-gray-600">Daily digest of student activity</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.activityDigest} className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-600">Updates about new features and offers</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.marketingEmails} className="w-5 h-5" />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-sm text-gray-600">Allow others to view your profile</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.publicProfile} className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Show Email</p>
                        <p className="text-sm text-gray-600">Display email on public profile</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.showEmail} className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium">Show Phone</p>
                        <p className="text-sm text-gray-600">Display phone on public profile</p>
                      </div>
                      <input type="checkbox" defaultChecked={profile?.preferences.showPhone} className="w-5 h-5" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Shield className="w-5 h-5" />
                    <p className="font-semibold">Account is secure</p>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Two-factor authentication is enabled
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Password</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Change Password
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    Last changed: 30 days ago
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      Configure 2FA
                    </button>
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Enabled
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-gray-600">San Francisco, CA • Current session</p>
                        </div>
                        <span className="text-sm text-green-600">Active now</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-sm text-gray-600">San Francisco, CA • Last active 2 hours ago</p>
                        </div>
                        <button className="text-sm text-red-600 hover:underline">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">Sign out all devices</p>
                          <p className="text-sm text-gray-600">Sign out of all active sessions</p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left border border-red-200 rounded-lg hover:bg-red-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-medium text-red-600">Delete Account</p>
                          <p className="text-sm text-red-500">Permanently delete your account and data</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}