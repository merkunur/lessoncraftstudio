'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Workspace,
  WorkspaceMember,
  CollaborationSession,
  Comment,
  Activity,
  PresenceInfo,
  SharedDocument,
  Team,
  Task,
  MemberRole
} from '@/types/collaboration';
import {
  hasPermission,
  generateUserColor,
  formatMemberName,
  calculateCollaborationScore,
  extractMentions,
  formatMentions,
  generateActivitySummary,
  calculatePresenceStatus,
  formatTaskPriority,
  calculateTaskProgress,
  generateShareableLink,
  DocumentSync
} from '@/lib/collaboration-utils';

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState<
    'workspace' | 'documents' | 'team' | 'tasks' | 'activity'
  >('workspace');

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [session, setSession] = useState<CollaborationSession | null>(null);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [documents, setDocuments] = useState<SharedDocument[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [presence, setPresence] = useState<Map<string, PresenceInfo>>(new Map());

  const [selectedDocument, setSelectedDocument] = useState<SharedDocument | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const documentSyncRef = useRef<DocumentSync | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadWorkspace();
    setupWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (documentSyncRef.current) {
        documentSyncRef.current.destroy();
      }
    };
  }, []);

  async function loadWorkspace() {
    try {
      const response = await fetch('/api/collaboration/workspace');
      if (response.ok) {
        const data = await response.json();
        setWorkspace(data);
        setMembers(data.members);
        loadDocuments(data.id);
        loadActivities(data.id);
        loadTasks(data.id);
      }
    } catch (error) {
      console.error('Failed to load workspace:', error);
    }
  }

  async function loadDocuments(workspaceId: string) {
    try {
      const response = await fetch(`/api/collaboration/workspace/${workspaceId}/documents`);
      if (response.ok) {
        setDocuments(await response.json());
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  }

  async function loadActivities(workspaceId: string) {
    try {
      const response = await fetch(`/api/collaboration/workspace/${workspaceId}/activities`);
      if (response.ok) {
        setActivities(await response.json());
      }
    } catch (error) {
      console.error('Failed to load activities:', error);
    }
  }

  async function loadTasks(workspaceId: string) {
    try {
      const response = await fetch(`/api/collaboration/workspace/${workspaceId}/tasks`);
      if (response.ok) {
        setTasks(await response.json());
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }

  function setupWebSocket() {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_COLLAB_WS_URL || 'ws://localhost:3002');

    ws.onopen = () => {
      console.log('Collaboration WebSocket connected');
      // Join workspace
      ws.send(JSON.stringify({
        type: 'join',
        workspaceId: workspace?.id,
        userId: 'current_user'
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      // Attempt reconnection
      setTimeout(setupWebSocket, 5000);
    };

    wsRef.current = ws;
  }

  function handleWebSocketMessage(message: any) {
    switch (message.type) {
      case 'presence':
        updatePresence(message.userId, message.data);
        break;
      case 'cursor':
        updateCursor(message.userId, message.position);
        break;
      case 'selection':
        updateSelection(message.userId, message.range);
        break;
      case 'edit':
        handleRemoteEdit(message.edit);
        break;
      case 'comment':
        addComment(message.comment);
        break;
      case 'activity':
        addActivity(message.activity);
        break;
      case 'task_update':
        updateTask(message.task);
        break;
    }
  }

  function updatePresence(userId: string, data: PresenceInfo) {
    setPresence(prev => {
      const updated = new Map(prev);
      updated.set(userId, data);
      return updated;
    });
  }

  function updateCursor(userId: string, position: any) {
    // Update cursor position in UI
    const member = members.find(m => m.userId === userId);
    if (member) {
      // Show cursor at position
      console.log(`${member.name} cursor at`, position);
    }
  }

  function updateSelection(userId: string, range: any) {
    // Update selection highlight in UI
    console.log(`User ${userId} selected`, range);
  }

  function handleRemoteEdit(edit: any) {
    // Apply remote edit to document
    console.log('Remote edit:', edit);
  }

  function addComment(comment: Comment) {
    setComments(prev => [...prev, comment]);
  }

  function addActivity(activity: Activity) {
    setActivities(prev => [activity, ...prev]);
  }

  function updateTask(task: Task) {
    setTasks(prev => prev.map(t => t.id === task.id ? task : t));
  }

  async function inviteMember(email: string, role: MemberRole) {
    try {
      const response = await fetch('/api/collaboration/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspace?.id,
          email,
          role
        })
      });

      if (response.ok) {
        alert('Invitation sent!');
        setShowInviteModal(false);
      }
    } catch (error) {
      console.error('Failed to invite member:', error);
    }
  }

  async function createDocument(title: string, type: SharedDocument['type']) {
    try {
      const response = await fetch('/api/collaboration/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspace?.id,
          title,
          type
        })
      });

      if (response.ok) {
        const doc = await response.json();
        setDocuments(prev => [...prev, doc]);
        setSelectedDocument(doc);
      }
    } catch (error) {
      console.error('Failed to create document:', error);
    }
  }

  async function postComment() {
    if (!commentText.trim()) return;

    const mentions = extractMentions(commentText);

    try {
      const response = await fetch('/api/collaboration/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspace?.id,
          documentId: selectedDocument?.id,
          content: commentText,
          mentions
        })
      });

      if (response.ok) {
        const comment = await response.json();
        addComment(comment);
        setCommentText('');
        
        // Send via WebSocket for real-time update
        wsRef.current?.send(JSON.stringify({
          type: 'comment',
          comment
        }));
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  }

  const collaborationScore = workspace ? calculateCollaborationScore(activities) : 0;
  const activitySummaries = generateActivitySummary(activities);

  const renderWorkspace = () => (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{workspace?.name}</h2>
            <p className="text-gray-600 mt-1">{workspace?.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Invite Members
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{members.length}</p>
            <p className="text-sm text-gray-500">Members</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{documents.length}</p>
            <p className="text-sm text-gray-500">Documents</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{tasks.filter(t => t.status !== 'done').length}</p>
            <p className="text-sm text-gray-500">Active Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{collaborationScore}</p>
            <p className="text-sm text-gray-500">Collaboration Score</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Active Members</h3>
          <div className="flex flex-wrap gap-2">
            {members.filter(m => {
              const presenceInfo = presence.get(m.userId);
              return presenceInfo && calculatePresenceStatus(new Date(presenceInfo.lastSeen)) === 'online';
            }).map(member => (
              <div
                key={member.userId}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full"
              >
                <div
                  className="w-2 h-2 rounded-full bg-green-500"
                  style={{ backgroundColor: generateUserColor(member.userId) }}
                />
                <span className="text-sm">{formatMemberName(member)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activitySummaries.slice(0, 5).map((summary, index) => (
              <p key={index} className="text-sm text-gray-600">{summary}</p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Workspace Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Real-time Collaboration</span>
              <input
                type="checkbox"
                checked={workspace?.features.realTimeCollaboration}
                className="rounded"
                disabled
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Version Control</span>
              <input
                type="checkbox"
                checked={workspace?.features.versionControl}
                className="rounded"
                disabled
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Comments & Mentions</span>
              <input
                type="checkbox"
                checked={workspace?.features.comments}
                className="rounded"
                disabled
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Shared Documents</h2>
        <button
          onClick={() => createDocument('Untitled Document', 'document')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Document
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {documents.map(doc => (
          <div
            key={doc.id}
            onClick={() => setSelectedDocument(doc)}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.type}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                doc.status === 'published' ? 'bg-green-100 text-green-700' :
                doc.status === 'in_review' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {doc.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{doc.collaborators.length} collaborators</span>
              <span>•</span>
              <span>v{doc.version}</span>
            </div>

            <div className="flex -space-x-2 mt-3">
              {doc.collaborators.slice(0, 3).map(collab => (
                <div
                  key={collab.userId}
                  className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: generateUserColor(collab.userId) }}
                >
                  {collab.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {doc.collaborators.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                  +{doc.collaborators.length - 3}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div>
      <h2 className="text-xl font-semibold mb-6">Team Members</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map(member => {
              const presenceInfo = presence.get(member.userId);
              const status = presenceInfo ? calculatePresenceStatus(new Date(presenceInfo.lastSeen)) : 'offline';

              return (
                <tr key={member.userId}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: generateUserColor(member.userId) }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-sm ${
                      status === 'online' ? 'text-green-500' :
                      status === 'away' ? 'text-yellow-500' :
                      'text-gray-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        status === 'online' ? 'bg-green-500' :
                        status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`} />
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {member.lastActiveAt ? new Date(member.lastActiveAt).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:underline text-sm">
                      Manage
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          New Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {['todo', 'in_progress', 'done'].map(status => (
          <div key={status} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-4 capitalize">
              {status.replace('_', ' ')}
              <span className="ml-2 text-sm text-gray-500">
                ({tasks.filter(t => t.status === status).length})
              </span>
            </h3>

            <div className="space-y-3">
              {tasks
                .filter(t => t.status === status)
                .map(task => {
                  const priority = formatTaskPriority(task.priority);
                  const progress = calculateTaskProgress(task);

                  return (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg p-3 shadow-sm hover:shadow cursor-pointer"
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <span className="text-xl">{priority.icon}</span>
                      </div>

                      {task.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {task.assignees.length > 0 && (
                        <div className="flex -space-x-2 mb-2">
                          {task.assignees.slice(0, 3).map(userId => {
                            const member = members.find(m => m.userId === userId);
                            return member ? (
                              <div
                                key={userId}
                                className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs"
                                style={{ backgroundColor: generateUserColor(userId) }}
                                title={member.name}
                              >
                                {member.name.charAt(0)}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}

                      {progress > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}

                      {task.dueDate && (
                        <p className="text-xs text-gray-500 mt-2">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Collaboration Hub</h1>

        <div className="border-b mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'workspace', label: 'Workspace' },
              { id: 'documents', label: 'Documents' },
              { id: 'team', label: 'Team' },
              { id: 'tasks', label: 'Tasks' },
              { id: 'activity', label: 'Activity' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'workspace' && renderWorkspace()}
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'tasks' && renderTasks()}
      </div>
    </div>
  );
}