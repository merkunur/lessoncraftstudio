import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import { WebSocketServer } from 'ws';
import { Server } from 'http';

// WebSocket connection types
interface WSClient {
  id: string;
  userId: string;
  userName: string;
  teamIds: string[];
  socket: any;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
  device: string;
  location?: string;
}

interface WSMessage {
  type: 'presence' | 'notification' | 'collaboration' | 'chat' | 'system';
  action: string;
  payload: any;
  timestamp: string;
  sender?: string;
  recipients?: string[];
}

// Mock WebSocket server (in production, use a separate WebSocket server)
class RealtimeService {
  private clients: Map<string, WSClient> = new Map();
  private rooms: Map<string, Set<string>> = new Map();
  private presence: Map<string, { userId: string; status: string; lastSeen: string }> = new Map();

  // Connection management
  addClient(client: WSClient): void {
    this.clients.set(client.id, client);
    this.updatePresence(client.userId, 'online');

    // Join team rooms
    client.teamIds.forEach(teamId => {
      this.joinRoom(client.id, `team:${teamId}`);
    });

    // Notify others of new presence
    this.broadcastPresence(client.userId, 'online');
  }

  removeClient(clientId: string): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Leave all rooms
    this.rooms.forEach((members, roomId) => {
      members.delete(clientId);
    });

    this.clients.delete(clientId);
    this.updatePresence(client.userId, 'offline');
    this.broadcastPresence(client.userId, 'offline');
  }

  // Room management
  joinRoom(clientId: string, roomId: string): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId)!.add(clientId);
  }

  leaveRoom(clientId: string, roomId: string): void {
    this.rooms.get(roomId)?.delete(clientId);
  }

  // Presence management
  updatePresence(userId: string, status: string): void {
    this.presence.set(userId, {
      userId,
      status,
      lastSeen: new Date().toISOString()
    });
  }

  getPresence(userIds: string[]): any[] {
    return userIds.map(userId => this.presence.get(userId)).filter(Boolean);
  }

  broadcastPresence(userId: string, status: string): void {
    const message: WSMessage = {
      type: 'presence',
      action: 'update',
      payload: {
        userId,
        status,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };

    this.broadcast(message);
  }

  // Message broadcasting
  broadcast(message: WSMessage, excludeClient?: string): void {
    this.clients.forEach((client, clientId) => {
      if (clientId !== excludeClient) {
        this.sendToClient(clientId, message);
      }
    });
  }

  broadcastToRoom(roomId: string, message: WSMessage, excludeClient?: string): void {
    const members = this.rooms.get(roomId);
    if (!members) return;

    members.forEach(clientId => {
      if (clientId !== excludeClient) {
        this.sendToClient(clientId, message);
      }
    });
  }

  broadcastToTeam(teamId: string, message: WSMessage, excludeClient?: string): void {
    this.broadcastToRoom(`team:${teamId}`, message, excludeClient);
  }

  sendToClient(clientId: string, message: WSMessage): void {
    const client = this.clients.get(clientId);
    if (client && client.socket) {
      // In real implementation, send via WebSocket
      console.log(`Sending to ${clientId}:`, message);
    }
  }

  sendToUser(userId: string, message: WSMessage): void {
    this.clients.forEach(client => {
      if (client.userId === userId) {
        this.sendToClient(client.id, message);
      }
    });
  }

  // Collaboration features
  notifyCollaboration(
    resourceId: string,
    action: 'edit_start' | 'edit_end' | 'cursor_move' | 'selection_change',
    userId: string,
    data: any
  ): void {
    const message: WSMessage = {
      type: 'collaboration',
      action,
      payload: {
        resourceId,
        userId,
        data,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      sender: userId
    };

    // Broadcast to all clients viewing this resource
    this.broadcastToRoom(`resource:${resourceId}`, message, userId);
  }

  // Real-time notifications
  sendNotification(
    userId: string,
    notification: {
      id: string;
      type: string;
      title: string;
      message: string;
      icon?: string;
      actionUrl?: string;
      priority?: 'low' | 'normal' | 'high' | 'urgent';
    }
  ): void {
    const message: WSMessage = {
      type: 'notification',
      action: 'new',
      payload: notification,
      timestamp: new Date().toISOString()
    };

    this.sendToUser(userId, message);
  }

  // Chat functionality
  sendChatMessage(
    fromUserId: string,
    toUserId: string | null,
    teamId: string | null,
    content: string,
    messageType: 'text' | 'image' | 'file' = 'text'
  ): void {
    const message: WSMessage = {
      type: 'chat',
      action: 'message',
      payload: {
        id: `msg_${Date.now()}`,
        fromUserId,
        toUserId,
        teamId,
        content,
        messageType,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      sender: fromUserId
    };

    if (toUserId) {
      // Direct message
      this.sendToUser(toUserId, message);
      this.sendToUser(fromUserId, message); // Echo back to sender
    } else if (teamId) {
      // Team message
      this.broadcastToTeam(teamId, message);
    }
  }

  // Typing indicators
  sendTypingIndicator(
    userId: string,
    recipientId: string | null,
    teamId: string | null,
    isTyping: boolean
  ): void {
    const message: WSMessage = {
      type: 'chat',
      action: 'typing',
      payload: {
        userId,
        isTyping,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      sender: userId
    };

    if (recipientId) {
      this.sendToUser(recipientId, message);
    } else if (teamId) {
      this.broadcastToTeam(teamId, message, userId);
    }
  }

  // Get online users
  getOnlineUsers(teamId?: string): any[] {
    const onlineUsers: any[] = [];

    this.clients.forEach(client => {
      if (!teamId || client.teamIds.includes(teamId)) {
        if (client.status === 'online' || client.status === 'away' || client.status === 'busy') {
          onlineUsers.push({
            userId: client.userId,
            userName: client.userName,
            status: client.status,
            lastSeen: client.lastSeen,
            device: client.device
          });
        }
      }
    });

    return onlineUsers;
  }

  // Activity tracking
  trackActivity(userId: string, activity: string, metadata?: any): void {
    const message: WSMessage = {
      type: 'system',
      action: 'activity',
      payload: {
        userId,
        activity,
        metadata,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };

    // Log activity and notify relevant users
    console.log('Activity tracked:', message);
  }
}

const realtimeService = new RealtimeService();

// Mock WebSocket endpoint (in production, use a proper WebSocket server)
// GET /api/websocket - Get connection info
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    if (action === 'presence') {
      const teamId = searchParams.get('teamId');
      const onlineUsers = realtimeService.getOnlineUsers(teamId || undefined);

      return NextResponse.json({
        onlineUsers,
        total: onlineUsers.length
      });
    }

    // Return WebSocket connection details
    return NextResponse.json({
      url: process.env.WEBSOCKET_URL || 'ws://localhost:3001',
      protocol: 'wss',
      reconnectInterval: 5000,
      heartbeatInterval: 30000,
      connectionId: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
  } catch (error) {
    console.error('Error getting WebSocket info:', error);
    return NextResponse.json(
      { error: 'Failed to get connection info' },
      { status: 500 }
    );
  }
}

// POST /api/websocket - Send message via WebSocket
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const userId = user.id;
    const userName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';

    switch (data.type) {
      case 'notification':
        realtimeService.sendNotification(data.targetUserId, {
          id: `notif_${Date.now()}`,
          type: data.notificationType,
          title: data.title,
          message: data.message,
          icon: data.icon,
          actionUrl: data.actionUrl,
          priority: data.priority || 'normal'
        });
        break;

      case 'chat':
        realtimeService.sendChatMessage(
          userId,
          data.toUserId,
          data.teamId,
          data.content,
          data.messageType
        );
        break;

      case 'typing':
        realtimeService.sendTypingIndicator(
          userId,
          data.recipientId,
          data.teamId,
          data.isTyping
        );
        break;

      case 'collaboration':
        realtimeService.notifyCollaboration(
          data.resourceId,
          data.action,
          userId,
          data.data
        );
        break;

      case 'presence':
        realtimeService.updatePresence(userId, data.status);
        realtimeService.broadcastPresence(userId, data.status);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid message type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending WebSocket message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}