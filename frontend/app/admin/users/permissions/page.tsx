'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  Save,
  X,
  Search,
  Lock,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Role {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  permissions: string[];
  isSystem: boolean;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

const AVAILABLE_PERMISSIONS = [
  { id: 'users:read', label: 'Users - View', category: 'Users' },
  { id: 'users:write', label: 'Users - Create/Edit', category: 'Users' },
  { id: 'users:delete', label: 'Users - Delete', category: 'Users' },
  { id: 'users:impersonate', label: 'Users - Impersonate', category: 'Users' },

  { id: 'roles:read', label: 'Roles - View', category: 'Roles' },
  { id: 'roles:write', label: 'Roles - Create/Edit', category: 'Roles' },
  { id: 'roles:delete', label: 'Roles - Delete', category: 'Roles' },
  { id: 'roles:assign', label: 'Roles - Assign to Users', category: 'Roles' },

  { id: 'content:read', label: 'Content - View', category: 'Content' },
  { id: 'content:write', label: 'Content - Create/Edit', category: 'Content' },
  { id: 'content:delete', label: 'Content - Delete', category: 'Content' },
  { id: 'content:publish', label: 'Content - Publish', category: 'Content' },

  { id: 'subscriptions:read', label: 'Subscriptions - View', category: 'Subscriptions' },
  { id: 'subscriptions:write', label: 'Subscriptions - Modify', category: 'Subscriptions' },
  { id: 'subscriptions:cancel', label: 'Subscriptions - Cancel', category: 'Subscriptions' },
  { id: 'subscriptions:refund', label: 'Subscriptions - Refund', category: 'Subscriptions' },

  { id: 'support:read', label: 'Support - View Tickets', category: 'Support' },
  { id: 'support:write', label: 'Support - Respond to Tickets', category: 'Support' },
  { id: 'support:close', label: 'Support - Close Tickets', category: 'Support' },

  { id: 'settings:read', label: 'Settings - View', category: 'Settings' },
  { id: 'settings:write', label: 'Settings - Modify', category: 'Settings' },

  { id: 'analytics:read', label: 'Analytics - View Reports', category: 'Analytics' },
  { id: 'analytics:export', label: 'Analytics - Export Data', category: 'Analytics' },
];

export default function PermissionsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    permissions: [] as string[],
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/admin/users/permissions/roles', { headers });

      if (!response.ok) throw new Error('Failed to fetch roles');

      const data = await response.json();
      setRoles(data.roles);
    } catch (error) {
      toast.error('Failed to load roles');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const url = editingId
        ? `/api/admin/users/permissions/roles/${editingId}`
        : '/api/admin/users/permissions/roles';

      const response = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save role');
      }

      toast.success(`Role ${editingId ? 'updated' : 'created'} successfully`);
      resetForm();
      fetchRoles();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (role: Role) => {
    setFormData({
      name: role.name,
      slug: role.slug,
      description: role.description || '',
      permissions: role.permissions,
    });
    setEditingId(role.id);
    setShowForm(true);
  };

  const handleDelete = async (roleId: string) => {
    if (!confirm('Are you sure you want to delete this role?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/admin/users/permissions/roles/${roleId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete role');
      }

      toast.success('Role deleted successfully');
      fetchRoles();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      permissions: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  // Auto-generate slug from name
  useEffect(() => {
    if (!editingId && formData.name) {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, editingId]);

  // Group permissions by category
  const permissionsByCategory = AVAILABLE_PERMISSIONS.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_PERMISSIONS>);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Role & Permissions Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Define roles and assign granular permissions to control admin access
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Role
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingId ? 'Edit Role' : 'Create New Role'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Content Editor"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Slug *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., content-editor"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe this role's purpose..."
                    />
                  </div>

                  {/* Permissions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Permissions ({formData.permissions.length} selected)
                    </label>
                    <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                      {Object.entries(permissionsByCategory).map(([category, perms]) => (
                        <div key={category} className="mb-4 last:mb-0">
                          <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                          <div className="space-y-2">
                            {perms.map((perm) => (
                              <label key={perm.id} className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.permissions.includes(perm.id)}
                                  onChange={() => togglePermission(perm.id)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{perm.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? 'Update Role' : 'Create Role'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Roles List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredRoles.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery ? 'No roles found matching your search.' : 'No roles yet. Create your first role!'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <div key={role.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                        {role.isSystem && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            <Lock className="h-3 w-3 mr-1" />
                            System
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 font-mono">{role.slug}</p>
                      {role.description && (
                        <p className="mt-2 text-sm text-gray-700">{role.description}</p>
                      )}
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{role.userCount} user{role.userCount !== 1 ? 's' : ''}</span>
                        <span className="mx-2">•</span>
                        <span>{role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}</span>
                      </div>
                      {role.permissions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {role.permissions.slice(0, 5).map((perm) => (
                            <span
                              key={perm}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {perm}
                            </span>
                          ))}
                          {role.permissions.length > 5 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                              +{role.permissions.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(role)}
                        disabled={role.isSystem}
                        className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={role.isSystem ? 'System roles cannot be edited' : 'Edit role'}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        disabled={role.isSystem || role.userCount > 0}
                        className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={
                          role.isSystem
                            ? 'System roles cannot be deleted'
                            : role.userCount > 0
                            ? 'Cannot delete role assigned to users'
                            : 'Delete role'
                        }
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
