'use client';

import React, { useState, useEffect } from 'react';
import {
  Circle,
  Users,
  Eye,
  Edit3,
  MousePointer,
  Wifi,
  WifiOff,
  Activity
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  activity?: string;
  cursor?: {
    x: number;
    y: number;
    color: string;
  };
  selection?: {
    start: number;
    end: number;
    color: string;
  };
}

interface PresenceIndicatorProps {
  resourceId?: string;
  teamId?: string;
  showDetails?: boolean;
  maxDisplay?: number;
  compact?: boolean;
}

export default function PresenceIndicator({
  resourceId,
  teamId,
  showDetails = true,
  maxDisplay = 5,
  compact = false
}: PresenceIndicatorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  useEffect(() => {
    // Mock users for demonstration
    const mockUsers: User[] = [
      {
        id: 'user_1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        status: 'online',
        activity: 'Editing'
      },
      {
        id: 'user_2',
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
        status: 'online',
        activity: 'Viewing'
      },
      {
        id: 'user_3',
        name: 'Bob Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        status: 'away',
        lastSeen: new Date(Date.now() - 5 * 60000).toISOString(),
        activity: 'Idle'
      }
    ];

    setUsers(mockUsers);

    // Simulate WebSocket connection
    const ws = connectToPresence();

    return () => {
      // Cleanup
    };
  }, [resourceId, teamId]);

  const connectToPresence = () => {
    // In production, connect to WebSocket for real-time updates
    console.log('Connecting to presence service...');
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Circle className="w-2 h-2 fill-current" />;
      case 'away':
        return <Circle className="w-2 h-2" />;
      case 'busy':
        return <Circle className="w-2 h-2 fill-current" />;
      default:
        return <Circle className="w-2 h-2 opacity-50" />;
    }
  };

  const getActivityIcon = (activity?: string) => {
    switch (activity) {
      case 'Editing':
        return <Edit3 className="w-3 h-3" />;
      case 'Viewing':
        return <Eye className="w-3 h-3" />;
      case 'Cursor':
        return <MousePointer className="w-3 h-3" />;
      default:
        return <Activity className="w-3 h-3" />;
    }
  };

  const formatLastSeen = (lastSeen?: string) => {
    if (!lastSeen) return 'Offline';

    const date = new Date(lastSeen);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;

    return date.toLocaleDateString();
  };

  const onlineUsers = users.filter(u => u.status === 'online');
  const displayUsers = users.slice(0, maxDisplay);
  const extraCount = Math.max(0, users.length - maxDisplay);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {displayUsers.map(user => (
            <div
              key={user.id}
              className="relative"
              onMouseEnter={() => setShowTooltip(user.id)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />

              {showTooltip === user.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
                  {user.name} • {user.status === 'online' ? 'Online' : formatLastSeen(user.lastSeen)}
                </div>
              )}
            </div>
          ))}
          {extraCount > 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
              +{extraCount}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          {onlineUsers.length} online
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Active Users ({onlineUsers.length})
        </h3>
        {isConnected ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
      </div>

      {/* User List */}
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                title={user.status}
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{user.name}</span>
                {user.activity && showDetails && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    {getActivityIcon(user.activity)}
                    {user.activity}
                  </span>
                )}
              </div>
              {user.status !== 'online' && (
                <span className="text-xs text-gray-500">
                  {formatLastSeen(user.lastSeen)}
                </span>
              )}
            </div>

            {/* Cursor Indicator */}
            {user.cursor && showDetails && (
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: user.cursor.color }}
                title={`Cursor at ${user.cursor.x}, ${user.cursor.y}`}
              />
            )}
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-4">No one else is here</p>
        )}
      </div>

      {/* Activity Summary */}
      {showDetails && onlineUsers.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {users.filter(u => u.activity === 'Editing').length}
              </div>
              <div className="text-gray-500">Editing</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {users.filter(u => u.activity === 'Viewing').length}
              </div>
              <div className="text-gray-500">Viewing</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {users.filter(u => u.status === 'away').length}
              </div>
              <div className="text-gray-500">Away</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}