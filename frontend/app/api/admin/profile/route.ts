import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';

interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  language?: string;
  dateFormat?: string;
  department?: string;
  jobTitle?: string;
  organization?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    marketingEmails?: boolean;
    weeklyReport?: boolean;
    activityDigest?: boolean;
    publicProfile?: boolean;
    showEmail?: boolean;
    showPhone?: boolean;
  };
}

// Mock database
const profiles = new Map([
  ['user_1', {
    id: 'user_1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    emailVerified: true,
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    avatar: 'https://i.pravatar.cc/300?img=1',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    bio: 'Passionate educator dedicated to creating engaging learning materials.',
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
      storageUsed: 2.4 * 1024 * 1024 * 1024,
      lastLogin: new Date().toISOString(),
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
      }
    ]
  }]
]);

// GET /api/admin/profile
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id || 'user_1';
    const profile = profiles.get(userId);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id || 'user_1';
    const profile = profiles.get(userId);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const updates: ProfileUpdate = await request.json();

    // Validate updates
    if (updates.firstName && updates.firstName.length > 50) {
      return NextResponse.json(
        { error: 'First name too long' },
        { status: 400 }
      );
    }

    if (updates.bio && updates.bio.length > 500) {
      return NextResponse.json(
        { error: 'Bio too long (max 500 characters)' },
        { status: 400 }
      );
    }

    if (updates.website && !isValidUrl(updates.website)) {
      return NextResponse.json(
        { error: 'Invalid website URL' },
        { status: 400 }
      );
    }

    // Apply updates
    const updatedProfile = {
      ...profile,
      ...updates,
      socialLinks: {
        ...profile.socialLinks,
        ...updates.socialLinks
      },
      preferences: {
        ...profile.preferences,
        ...updates.preferences
      },
      updatedAt: new Date().toISOString()
    };

    profiles.set(userId, updatedProfile);

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/profile/avatar
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id || 'user_1';
    const profile = profiles.get(userId);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Reset to default avatar
    profile.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName)}`;
    profiles.set(userId, profile);

    return NextResponse.json({
      success: true,
      message: 'Avatar removed successfully'
    });
  } catch (error) {
    console.error('Error removing avatar:', error);
    return NextResponse.json(
      { error: 'Failed to remove avatar' },
      { status: 500 }
    );
  }
}

// Helper function
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}