'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Phone,
  Video,
  Info,
  Pin,
  Reply,
  Edit2,
  Trash2,
  Copy,
  Check,
  CheckCheck,
  Clock,
  Image as ImageIcon,
  File,
  Download,
  X,
  Users,
  Hash,
  Lock,
  Globe,
  Bell,
  BellOff,
  Star,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  timestamp: string;
  edited?: boolean;
  editedAt?: string;
  replyTo?: Message;
  reactions?: Array<{
    emoji: string;
    users: string[];
  }>;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  pinned?: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'direct';
  description?: string;
  memberCount: number;
  lastMessage?: Message;
  unreadCount: number;
  muted: boolean;
  pinned: boolean;
}

interface TeamChatProps {
  teamId?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
}

export default function TeamChat({
  teamId,
  userId,
  userName,
  userAvatar
}: TeamChatProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showChannelInfo, setShowChannelInfo] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadChannels();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [teamId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChannels = () => {
    // Mock channels
    const mockChannels: Channel[] = [
      {
        id: 'ch_1',
        name: 'general',
        type: 'public',
        description: 'General team discussions',
        memberCount: 12,
        unreadCount: 3,
        muted: false,
        pinned: true,
        lastMessage: {
          id: 'msg_1',
          senderId: 'user_2',
          senderName: 'Jane Smith',
          content: 'Has anyone reviewed the new worksheet templates?',
          type: 'text',
          timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
          status: 'delivered'
        }
      },
      {
        id: 'ch_2',
        name: 'resources',
        type: 'public',
        description: 'Share educational resources',
        memberCount: 12,
        unreadCount: 0,
        muted: false,
        pinned: false
      },
      {
        id: 'ch_3',
        name: 'Jane Smith',
        type: 'direct',
        memberCount: 2,
        unreadCount: 1,
        muted: false,
        pinned: false
      }
    ];

    setChannels(mockChannels);
    if (mockChannels.length > 0) {
      selectChannel(mockChannels[0]);
    }
  };

  const selectChannel = (channel: Channel) => {
    setActiveChannel(channel);
    loadMessages(channel.id);
    markChannelAsRead(channel.id);
  };

  const loadMessages = (channelId: string) => {
    // Mock messages
    const mockMessages: Message[] = [
      {
        id: 'msg_1',
        senderId: 'user_2',
        senderName: 'Jane Smith',
        senderAvatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Hey team! I just uploaded the new math worksheets to the shared folder.',
        type: 'text',
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        status: 'read'
      },
      {
        id: 'msg_2',
        senderId: userId,
        senderName: userName,
        senderAvatar: userAvatar,
        content: 'Great work! I\'ll review them this afternoon.',
        type: 'text',
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        status: 'read',
        reactions: [
          { emoji: '👍', users: ['user_2', 'user_3'] }
        ]
      },
      {
        id: 'msg_3',
        senderId: 'user_3',
        senderName: 'Bob Johnson',
        senderAvatar: 'https://i.pravatar.cc/150?img=3',
        content: 'worksheet_template.pdf',
        type: 'file',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        status: 'read',
        attachments: [
          {
            id: 'att_1',
            name: 'worksheet_template.pdf',
            url: '/files/worksheet_template.pdf',
            type: 'application/pdf',
            size: 245678
          }
        ]
      },
      {
        id: 'msg_4',
        senderId: 'user_2',
        senderName: 'Jane Smith',
        senderAvatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Has anyone reviewed the new worksheet templates?',
        type: 'text',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        status: 'delivered'
      }
    ];

    setMessages(mockMessages);
  };

  const connectWebSocket = () => {
    // Mock WebSocket connection
    console.log('Connecting to chat server...');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !replyingTo) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: userId,
      senderName: userName,
      senderAvatar: userAvatar,
      content: newMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      status: 'sending',
      replyTo: replyingTo || undefined
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyingTo(null);

    // Simulate sending
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => m.id === message.id ? { ...m, status: 'sent' } : m)
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => m.id === message.id ? { ...m, status: 'delivered' } : m)
      );
    }, 1000);

    // Broadcast message
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        payload: message
      }));
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      // Send typing indicator
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({
          type: 'typing',
          payload: { isTyping: true }
        }));
      }
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({
          type: 'typing',
          payload: { isTyping: false }
        }));
      }
    }, 2000);
  };

  const handleFileUpload = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: userId,
      senderName: userName,
      senderAvatar: userAvatar,
      content: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      timestamp: new Date().toISOString(),
      status: 'sending',
      attachments: [
        {
          id: `att_${Date.now()}`,
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type,
          size: file.size
        }
      ]
    };

    setMessages(prev => [...prev, message]);

    // Simulate upload
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => m.id === message.id ? { ...m, status: 'delivered' } : m)
      );
      toast.success('File uploaded');
    }, 1500);
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id !== messageId) return msg;

        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);

        if (existingReaction) {
          if (existingReaction.users.includes(userId)) {
            // Remove reaction
            existingReaction.users = existingReaction.users.filter(u => u !== userId);
            if (existingReaction.users.length === 0) {
              return {
                ...msg,
                reactions: reactions.filter(r => r.emoji !== emoji)
              };
            }
          } else {
            // Add user to reaction
            existingReaction.users.push(userId);
          }
        } else {
          // Add new reaction
          reactions.push({ emoji, users: [userId] });
        }

        return { ...msg, reactions };
      })
    );
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    toast.success('Message deleted');
  };

  const markChannelAsRead = (channelId: string) => {
    setChannels(prev =>
      prev.map(ch => ch.id === channelId ? { ...ch, unreadCount: 0 } : ch)
    );
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return date.toLocaleDateString();
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'public':
        return <Hash className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'direct':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg border">
      {/* Channels Sidebar */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              Channels
            </div>
            {channels
              .filter(ch => ch.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(channel => (
                <button
                  key={channel.id}
                  onClick={() => selectChannel(channel)}
                  className={`w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors flex items-center justify-between group ${
                    activeChannel?.id === channel.id ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getChannelIcon(channel.type)}
                    <span className="truncate font-medium">
                      {channel.name}
                    </span>
                    {channel.unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </div>
                  {channel.muted && <BellOff className="w-4 h-4 text-gray-400" />}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChannel ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getChannelIcon(activeChannel.type)}
                <div>
                  <h3 className="font-semibold">{activeChannel.name}</h3>
                  {activeChannel.description && (
                    <p className="text-sm text-gray-600">{activeChannel.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setShowChannelInfo(!showChannelInfo)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div key={message.id} className="flex gap-3 group">
                  <img
                    src={message.senderAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.senderName)}`}
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{message.senderName}</span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      {message.edited && (
                        <span className="text-xs text-gray-500">(edited)</span>
                      )}
                    </div>

                    {message.replyTo && (
                      <div className="border-l-2 border-gray-300 pl-3 mb-2 text-sm text-gray-600">
                        <span className="font-medium">{message.replyTo.senderName}:</span> {message.replyTo.content}
                      </div>
                    )}

                    {message.type === 'text' && (
                      <p className="text-gray-800">{message.content}</p>
                    )}

                    {message.attachments && message.attachments.map(attachment => (
                      <div key={attachment.id} className="mt-2">
                        {message.type === 'image' ? (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="max-w-sm rounded-lg cursor-pointer hover:opacity-90"
                          />
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                            <File className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium">{attachment.name}</span>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(attachment.size)}
                            </span>
                            <button className="ml-2 p-1 hover:bg-gray-200 rounded">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {message.reactions.map(reaction => (
                          <button
                            key={reaction.emoji}
                            onClick={() => addReaction(message.id, reaction.emoji)}
                            className={`px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center gap-1 ${
                              reaction.users.includes(userId) ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-xs text-gray-600">{reaction.users.length}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 mt-1">
                      <button
                        onClick={() => addReaction(message.id, '👍')}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setReplyingTo(message)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                      {message.senderId === userId && (
                        <>
                          <button
                            onClick={() => setEditingMessage(message)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message Status */}
                  {message.senderId === userId && (
                    <div className="flex-shrink-0 mt-1">
                      {message.status === 'sending' && <Clock className="w-4 h-4 text-gray-400" />}
                      {message.status === 'sent' && <Check className="w-4 h-4 text-gray-400" />}
                      {message.status === 'delivered' && <CheckCheck className="w-4 h-4 text-gray-400" />}
                      {message.status === 'read' && <CheckCheck className="w-4 h-4 text-blue-500" />}
                    </div>
                  )}
                </div>
              ))}

              {typingUsers.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  {typingUsers.join(', ')} typing...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              {replyingTo && (
                <div className="mb-2 px-3 py-2 bg-gray-100 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Replying to {replyingTo.senderName}</span>
                    <p className="text-sm text-gray-600 truncate">{replyingTo.content}</p>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                />

                <textarea
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={1}
                />

                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>

                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a channel to start chatting
          </div>
        )}
      </div>
    </div>
  );
}