'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import {
  Activity,
  FileText,
  Download,
  User,
  LogIn,
  LogOut,
  Shield,
  Mail,
  Key,
  Clock,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  action: string;
  details: string;
  createdAt: string;
  icon: any;
  color: string;
}

export default function ActivityPage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Mock activity data - in production, this would come from the API
  useEffect(() => {
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        action: 'login',
        details: 'Signed in to your account',
        createdAt: new Date().toISOString(),
        icon: LogIn,
        color: 'text-green-600 bg-green-100',
      },
      {
        id: '2',
        action: 'profile_updated',
        details: 'Updated profile information',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        icon: User,
        color: 'text-blue-600 bg-blue-100',
      },
      {
        id: '3',
        action: 'worksheet_created',
        details: 'Created "Math Practice Sheet"',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        icon: FileText,
        color: 'text-purple-600 bg-purple-100',
      },
      {
        id: '4',
        action: 'download',
        details: 'Downloaded worksheet as PDF',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        icon: Download,
        color: 'text-indigo-600 bg-indigo-100',
      },
      {
        id: '5',
        action: 'password_changed',
        details: 'Password successfully changed',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        icon: Key,
        color: 'text-yellow-600 bg-yellow-100',
      },
      {
        id: '6',
        action: 'email_verified',
        details: 'Email address verified',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        icon: Mail,
        color: 'text-green-600 bg-green-100',
      },
      {
        id: '7',
        action: 'signup',
        details: 'Account created',
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        icon: Shield,
        color: 'text-blue-600 bg-blue-100',
      },
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setFilteredActivities(mockActivities);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter activities
  useEffect(() => {
    let filtered = [...activities];
    
    switch (filter) {
      case 'auth':
        filtered = activities.filter(a => 
          ['login', 'logout', 'signup', 'password_changed', 'email_verified'].includes(a.action)
        );
        break;
      case 'worksheets':
        filtered = activities.filter(a => 
          ['worksheet_created', 'download'].includes(a.action)
        );
        break;
      case 'profile':
        filtered = activities.filter(a => 
          ['profile_updated'].includes(a.action)
        );
        break;
      default:
        filtered = activities;
    }
    
    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [filter, activities]);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      login: 'Sign In',
      logout: 'Sign Out',
      signup: 'Account Created',
      profile_updated: 'Profile Update',
      password_changed: 'Password Change',
      email_verified: 'Email Verified',
      worksheet_created: 'Worksheet Created',
      download: 'Download',
    };
    return labels[action] || action;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Activity History
          </h2>
          <p className="mt-2 text-gray-600">
            Track your account activity and worksheet creation history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Activities
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {activities.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Worksheets Created
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {activities.filter(a => a.action === 'worksheet_created').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Last Activity
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {activities.length > 0 ? formatDate(activities[0].createdAt) : 'None'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Activity List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Filter Header */}
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between flex-wrap">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Activity Log
              </h3>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                      filter === 'all'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    All
                  </button>
                  <button
                    onClick={() => setFilter('auth')}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                      filter === 'auth'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Auth
                  </button>
                  <button
                    onClick={() => setFilter('worksheets')}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                      filter === 'worksheets'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Worksheets
                  </button>
                  <button
                    onClick={() => setFilter('profile')}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                      filter === 'profile'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity List */}
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="px-4 py-12 text-center">
                <div className="inline-flex items-center px-4 py-2 font-medium text-gray-500">
                  <Clock className="animate-spin h-5 w-5 mr-3" />
                  Loading activity...
                </div>
              </div>
            ) : currentActivities.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Activity className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No activity found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all'
                    ? "You haven't performed any actions yet."
                    : `No ${filter} activities to display.`}
                </p>
              </div>
            ) : (
              currentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-lg p-2 ${activity.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {getActionLabel(activity.action)}
                          </p>
                          <div className="ml-2 flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                            {formatDate(activity.createdAt)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">{startIndex + 1}</span>
                      {' '}to{' '}
                      <span className="font-medium">
                        {Math.min(endIndex, filteredActivities.length)}
                      </span>
                      {' '}of{' '}
                      <span className="font-medium">{filteredActivities.length}</span>
                      {' '}results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === i + 1
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}