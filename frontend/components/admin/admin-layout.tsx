'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
  Activity,
  Mail,
  Package,
  MessageSquare,
  Layers,
  Bell,
  Search,
  UserCog,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'react-hot-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['content']);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);

  // Check if user is admin
  useEffect(() => {
    if (user && !user.isAdmin) {
      toast.error('Admin access required');
      router.push('/dashboard');
    }
  }, [user, router]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin',
    },
    {
      name: 'User Control',
      href: '/admin/user-control',
      icon: UserCog,
      current: pathname.startsWith('/admin/user-control'),
    },
    {
      name: 'Users',
      icon: Users,
      current: pathname.startsWith('/admin/users'),
      children: [
        { name: 'All Users', href: '/admin/users' },
        { name: 'Subscribers', href: '/admin/users/subscribers' },
        { name: 'Permissions', href: '/admin/users/permissions' },
      ],
    },
    {
      name: 'Subscriptions',
      icon: CreditCard,
      current: pathname.startsWith('/admin/subscriptions'),
      children: [
        { name: 'Overview', href: '/admin/subscriptions' },
        { name: 'Payments', href: '/admin/subscriptions/payments' },
        { name: 'Plans', href: '/admin/subscriptions/plans' },
        { name: 'Invoices', href: '/admin/subscriptions/invoices' },
      ],
    },
    {
      name: 'Content',
      icon: FileText,
      current: pathname.startsWith('/admin/content'),
      children: [
        { name: 'Blog Posts', href: '/admin/content/blog' },
        { name: 'Categories', href: '/admin/content/categories' },
        { name: 'Tags', href: '/admin/content/tags' },
        { name: 'Comments', href: '/admin/content/comments' },
        { name: 'Media', href: '/admin/content/media' },
      ],
    },
    {
      name: 'Worksheets',
      icon: Layers,
      current: pathname.startsWith('/admin/worksheets'),
      children: [
        { name: 'Generators', href: '/admin/worksheets/generators' },
        { name: 'Templates', href: '/admin/worksheets/templates' },
        { name: 'Samples', href: '/admin/worksheets/samples' },
      ],
    },
    {
      name: 'Support',
      icon: HelpCircle,
      current: pathname.startsWith('/admin/support'),
      children: [
        { name: 'Tickets', href: '/admin/support/tickets' },
        { name: 'FAQ', href: '/admin/support/faq' },
        { name: 'Feedback', href: '/admin/support/feedback' },
      ],
    },
    {
      name: 'Email',
      icon: Mail,
      current: pathname.startsWith('/admin/email'),
      children: [
        { name: 'Templates', href: '/admin/email/templates' },
        { name: 'Campaigns', href: '/admin/email/campaigns' },
        { name: 'Logs', href: '/admin/email/logs' },
      ],
    },
    {
      name: 'Settings',
      icon: Settings,
      current: pathname.startsWith('/admin/settings'),
      children: [
        { name: 'General', href: '/admin/settings' },
        { name: 'Security', href: '/admin/settings/security' },
        { name: 'API Keys', href: '/admin/settings/api' },
        { name: 'Webhooks', href: '/admin/settings/webhooks' },
      ],
    },
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    );
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/signin');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/admin/notifications');
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications || []);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 bg-gray-800">
            <Link href="/admin" className="flex items-center">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isExpanded = expandedMenus.includes(item.name.toLowerCase());
              const Icon = item.icon;

              return (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.name.toLowerCase())}
                        className={`${
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium`}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                          {item.name}
                        </div>
                        <ChevronDown
                          className={`${
                            isExpanded ? 'rotate-180' : ''
                          } h-4 w-4 transition-transform`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="space-y-1 px-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`${
                                pathname === child.href
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                              } group flex items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`${
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="flex-shrink-0 border-t border-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs font-medium text-gray-400">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-1">
            <div className="relative flex flex-1">
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search users, content, settings..."
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Quick stats */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-4 lg:border-l lg:border-gray-200 lg:pl-4">
              <div className="text-sm">
                <p className="text-gray-500">Active Users</p>
                <p className="font-semibold text-gray-900">1,234</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500">MRR</p>
                <p className="font-semibold text-gray-900">$12,345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}