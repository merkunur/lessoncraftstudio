# Complete Admin System Implementation for LessonCraftStudio

## Overview
This document provides a complete implementation guide for the admin system with all required pages, API routes, and components.

## Architecture
- **Frontend**: Next.js 14 App Router
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT tokens in localStorage
- **UI**: Tailwind CSS with responsive design

## Authentication Pattern
All API routes use the `withAdmin` wrapper:
```typescript
import { withAdmin } from '@/lib/server-auth';

export const GET = withAdmin(async (request: NextRequest, user) => {
  // Admin-only logic here
});
```

All client-side fetches include authorization:
```typescript
fetch('/api/admin/...', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },
});
```

---

## 1. USERS MANAGEMENT SECTION

### Pages Created
- ✅ `/admin/users` - All users page (already exists)
- ✅ `/admin/users/subscribers` - Subscribers page (CREATED)
- ⚠️ `/admin/users/permissions` - Permissions management (CREATE BELOW)

### API Routes Created
- ✅ `/api/admin/users` - List/update users (already exists)
- ✅ `/api/admin/users/subscribers` - List subscribers (CREATED)
- ✅ `/api/admin/users/export` - Export users (already exists)
- ⚠️ `/api/admin/users/permissions` - Manage permissions (CREATE BELOW)

### Permissions Page Implementation
```typescript
// frontend/app/admin/users/permissions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Shield, Save, Users, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export default function PermissionsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rolesRes, permsRes] = await Promise.all([
        fetch('/api/admin/users/permissions/roles', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        }),
        fetch('/api/admin/users/permissions', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        }),
      ]);

      const [rolesData, permsData] = await Promise.all([
        rolesRes.json(),
        permsRes.json(),
      ]);

      setRoles(rolesData.roles);
      setPermissions(permsData.permissions);
    } catch (error) {
      toast.error('Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Permissions & Roles</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage user roles and permissions
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold">{role.name}</h3>
                    <p className="text-sm text-gray-500">{role.userCount} users</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Edit Permissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

## 2. CONTENT MANAGEMENT SECTION

### Pages Status
- ✅ `/admin/content/blog` - Blog posts list (already exists)
- ✅ `/admin/content/categories` - Categories management (CREATED)
- ⚠️ `/admin/content/tags` - Tags management (SIMILAR TO CATEGORIES)
- ⚠️ `/admin/content/comments` - Comments moderation (CREATE BELOW)
- ⚠️ `/admin/content/media` - Media library (CREATE BELOW)

### API Routes Status
- ✅ `/api/admin/content/categories` - Categories CRUD (CREATED)
- ⚠️ `/api/admin/content/tags` - Tags CRUD (PATTERN BELOW)
- ⚠️ `/api/admin/content/comments` - Comments moderation (PATTERN BELOW)
- ⚠️ `/api/admin/content/media` - Media management (PATTERN BELOW)

### Comments Moderation Page Pattern
```typescript
// frontend/app/admin/content/comments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

interface Comment {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  user: { email: string; firstName: string; lastName: string };
  post: { translations: any };
  createdAt: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [statusFilter, setStatusFilter] = useState('pending');

  const handleModerate = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/content/comments/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      toast.success('Comment updated');
      // Refresh list
    } catch (error) {
      toast.error('Failed to update comment');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Comment Moderation</h1>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['pending', 'approved', 'rejected', 'spam'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-md ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{comment.user.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  comment.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : comment.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {comment.status}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{comment.content}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleModerate(comment.id, 'approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleModerate(comment.id, 'rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4 inline mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => handleModerate(comment.id, 'spam')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Mark as Spam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
```

### Comments API Route Pattern
```typescript
// frontend/app/api/admin/content/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const GET = withAdmin(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'pending';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  const comments = await prisma.blogComment.findMany({
    where: { status },
    include: {
      user: { select: { email: true, firstName: true, lastName: true } },
      post: { select: { translations: true } },
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ comments });
});

// frontend/app/api/admin/content/comments/[id]/route.ts
export const PATCH = withAdmin(async (request: NextRequest, user, { params }) => {
  const { id } = params;
  const { status } = await request.json();

  const comment = await prisma.blogComment.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ comment });
});
```

---

## 3. WORKSHEETS MANAGEMENT SECTION

### Pages Needed
- ⚠️ `/admin/worksheets/generators` - List/configure generators
- ⚠️ `/admin/worksheets/templates` - Manage templates
- ⚠️ `/admin/worksheets/samples` - Manage sample worksheets

### Samples Page Pattern
```typescript
// frontend/app/admin/worksheets/samples/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FileText, Upload, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

interface Sample {
  id: string;
  appName: string;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  fileUrl: string;
  category: string | null;
  difficulty: string | null;
  featured: boolean;
  viewsCount: number;
  downloadsCount: number;
}

export default function SamplesPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [appFilter, setAppFilter] = useState('');

  const fetchSamples = async () => {
    const response = await fetch('/api/admin/worksheets/samples', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
    });
    const data = await response.json();
    setSamples(data.samples);
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sample Worksheets</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            <Upload className="h-4 w-4 inline mr-2" />
            Upload Sample
          </button>
        </div>

        {/* Samples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {samples.map((sample) => (
            <div key={sample.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={sample.thumbnailUrl}
                alt={sample.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{sample.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{sample.description}</p>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span><Eye className="h-4 w-4 inline" /> {sample.viewsCount}</span>
                  <span>{sample.downloadsCount} downloads</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
                    <Edit className="h-4 w-4 inline" />
                  </button>
                  <button className="px-3 py-2 bg-red-600 text-white rounded-md text-sm">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

## 4. SUPPORT SYSTEM SECTION

### Pages Needed
- ✅ `/admin/support/tickets` - Ticket management (already exists)
- ⚠️ `/admin/support/faq` - FAQ management
- ⚠️ `/admin/support/feedback` - User feedback

### FAQ Page Pattern
```typescript
// frontend/app/admin/support/faq/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">FAQ Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Category: {faq.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoveUp className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoveDown className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

## 5. EMAIL SYSTEM SECTION

### Pages Needed
- ⚠️ `/admin/email/templates` - Email templates
- ⚠️ `/admin/email/campaigns` - Email campaigns
- ⚠️ `/admin/email/logs` - Email logs

### Templates Page Pattern
```typescript
// frontend/app/admin/email/templates/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, Edit, Copy, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  variables: string[];
  active: boolean;
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);

  const fetchTemplates = async () => {
    const response = await fetch('/api/admin/email/templates', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
    });
    const data = await response.json();
    setTemplates(data.templates);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Email Templates</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.subject}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  template.active ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Variables:</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.variables.map((v) => (
                    <span key={v} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

## 6. SETTINGS SECTION

### Pages Needed
- ⚠️ `/admin/settings` - General settings
- ⚠️ `/admin/settings/security` - Security settings
- ⚠️ `/admin/settings/api` - API keys
- ⚠️ `/admin/settings/webhooks` - Webhook configuration

### General Settings Pattern
```typescript
// frontend/app/admin/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminLayout from '@/components/admin/admin-layout';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    supportEmail: '',
    defaultLanguage: 'en',
    allowSignups: true,
    requireEmailVerification: true,
    maintenanceMode: false,
  });

  const handleSave = async () => {
    try {
      await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold">General Settings</h1>
          <p className="text-gray-600 mt-2">Configure your application settings</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Site Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Site Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* User Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">User Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.allowSignups}
                  onChange={(e) => setSettings({ ...settings, allowSignups: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Allow new user signups</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Require email verification</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Maintenance mode (non-admins cannot access)</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="h-4 w-4 inline mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
```

---

## API ROUTES PATTERNS

### Standard CRUD Pattern
All API routes follow this pattern:

```typescript
// GET - List items
export const GET = withAdmin(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';

  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      // Add more searchable fields
    ],
  } : {};

  const [items, total] = await Promise.all([
    prisma.model.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.model.count({ where }),
  ]);

  return NextResponse.json({
    items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// POST - Create item
export const POST = withAdmin(async (request: NextRequest) => {
  const body = await request.json();

  const item = await prisma.model.create({
    data: body,
  });

  return NextResponse.json({ item }, { status: 201 });
});

// PATCH - Update item
export const PATCH = withAdmin(async (request: NextRequest, user, { params }) => {
  const { id } = params;
  const body = await request.json();

  const item = await prisma.model.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({ item });
});

// DELETE - Delete item
export const DELETE = withAdmin(async (request: NextRequest, user, { params }) => {
  const { id } = params;

  await prisma.model.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
});
```

---

## COMPLETE FILE CHECKLIST

### Users Management
- [x] `/admin/users/page.tsx` (exists)
- [x] `/admin/users/subscribers/page.tsx` (created)
- [ ] `/admin/users/permissions/page.tsx`
- [x] `/api/admin/users/route.ts` (exists)
- [x] `/api/admin/users/subscribers/route.ts` (created)
- [ ] `/api/admin/users/permissions/route.ts`

### Content Management
- [x] `/admin/content/blog/page.tsx` (exists)
- [x] `/admin/content/categories/page.tsx` (created)
- [ ] `/admin/content/tags/page.tsx`
- [ ] `/admin/content/comments/page.tsx`
- [ ] `/admin/content/media/page.tsx`
- [x] `/api/admin/content/categories/route.ts` (created)
- [ ] `/api/admin/content/tags/route.ts`
- [ ] `/api/admin/content/comments/route.ts`
- [ ] `/api/admin/content/media/route.ts`

### Worksheets Management
- [ ] `/admin/worksheets/generators/page.tsx`
- [ ] `/admin/worksheets/templates/page.tsx`
- [ ] `/admin/worksheets/samples/page.tsx`
- [ ] `/api/admin/worksheets/generators/route.ts`
- [ ] `/api/admin/worksheets/templates/route.ts`
- [ ] `/api/admin/worksheets/samples/route.ts`

### Support System
- [x] `/admin/support/tickets/page.tsx` (exists)
- [ ] `/admin/support/faq/page.tsx`
- [ ] `/admin/support/feedback/page.tsx`
- [x] `/api/admin/support/tickets/route.ts` (exists)
- [ ] `/api/admin/support/faq/route.ts`
- [ ] `/api/admin/support/feedback/route.ts`

### Email System
- [ ] `/admin/email/templates/page.tsx`
- [ ] `/admin/email/campaigns/page.tsx`
- [ ] `/admin/email/logs/page.tsx`
- [ ] `/api/admin/email/templates/route.ts`
- [ ] `/api/admin/email/campaigns/route.ts`
- [ ] `/api/admin/email/logs/route.ts`

### Settings
- [ ] `/admin/settings/page.tsx`
- [ ] `/admin/settings/security/page.tsx`
- [ ] `/admin/settings/api/page.tsx`
- [ ] `/admin/settings/webhooks/page.tsx`
- [ ] `/api/admin/settings/route.ts`
- [ ] `/api/admin/settings/security/route.ts`
- [ ] `/api/admin/settings/api/route.ts`
- [ ] `/api/admin/settings/webhooks/route.ts`

---

## NEXT STEPS

To complete the admin system, create the remaining files using the patterns provided above. Each section follows the same structure:

1. **Page Component**: Client component with state management, forms, and tables
2. **API Route**: Server route with `withAdmin` wrapper and Prisma queries
3. **Authentication**: All requests include JWT token in Authorization header
4. **Error Handling**: Toast notifications for user feedback
5. **Loading States**: Spinners and disabled states during async operations
6. **Pagination**: Standard pagination UI for all list views
7. **Filtering**: Search and filter capabilities
8. **Responsive Design**: Mobile-first Tailwind CSS classes

All patterns are provided in this document - simply copy and adapt for each specific resource type.
