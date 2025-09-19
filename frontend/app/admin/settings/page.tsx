'use client';

import Link from 'next/link';
import {
  Image,
  Bell,
  Shield,
  Globe,
  Mail,
  CreditCard,
  Database,
  Key,
  Users,
  Sliders,
  FileText,
  ChevronRight
} from 'lucide-react';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Branding',
      description: 'Manage your logo, colors, and visual identity',
      icon: Image,
      href: '/admin/settings/branding',
      color: 'bg-purple-500'
    },
    {
      title: 'Notifications',
      description: 'Configure email and system notifications',
      icon: Bell,
      href: '/admin/settings/notifications',
      color: 'bg-blue-500'
    },
    {
      title: 'Security',
      description: 'Manage security settings and access controls',
      icon: Shield,
      href: '/admin/settings/security',
      color: 'bg-red-500'
    },
    {
      title: 'Localization',
      description: 'Language and regional settings',
      icon: Globe,
      href: '/admin/settings/localization',
      color: 'bg-green-500'
    },
    {
      title: 'Email',
      description: 'SMTP configuration and email templates',
      icon: Mail,
      href: '/admin/settings/email',
      color: 'bg-orange-500'
    },
    {
      title: 'Payment',
      description: 'Payment gateway and subscription settings',
      icon: CreditCard,
      href: '/admin/settings/payment',
      color: 'bg-indigo-500'
    },
    {
      title: 'Database',
      description: 'Backup, restore, and maintenance options',
      icon: Database,
      href: '/admin/settings/database',
      color: 'bg-gray-600'
    },
    {
      title: 'API Keys',
      description: 'Manage API keys and integrations',
      icon: Key,
      href: '/admin/settings/api-keys',
      color: 'bg-yellow-600'
    },
    {
      title: 'Users & Roles',
      description: 'User management and permission settings',
      icon: Users,
      href: '/admin/settings/users',
      color: 'bg-pink-500'
    },
    {
      title: 'General',
      description: 'Basic platform configuration',
      icon: Sliders,
      href: '/admin/settings/general',
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                Admin
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Settings</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure and customize your platform settings
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className={`${section.color} rounded-lg p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Version</p>
              <p className="text-lg font-semibold text-gray-900">2.1.0</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Environment</p>
              <p className="text-lg font-semibold text-gray-900">Production</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Backup</p>
              <p className="text-lg font-semibold text-gray-900">2 hours ago</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Uptime</p>
              <p className="text-lg font-semibold text-gray-900">99.9%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}