'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Users,
  MousePointer,
  Edit3,
  Type,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye,
  Save,
  History,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  cursor?: {
    x: number;
    y: number;
  };
  selection?: {
    start: number;
    end: number;
  };
  isTyping?: boolean;
  lastActivity?: string;
}

interface Change {
  id: string;
  userId: string;
  userName: string;
  type: 'insert' | 'delete' | 'format' | 'move';
  position: number;
  content?: string;
  length?: number;
  timestamp: string;
}

interface LiveCollaborationProps {
  resourceId: string;
  resourceType: 'worksheet' | 'document' | 'template';
  content: string;
  onContentChange?: (content: string) => void;
  editable?: boolean;
  showCursors?: boolean;
  showPresence?: boolean;
  autoSave?: boolean;
}

export default function LiveCollaboration({
  resourceId,
  resourceType,
  content,
  onContentChange,
  editable = true,
  showCursors = true,
  showPresence = true,
  autoSave = true
}: LiveCollaborationProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [localContent, setLocalContent] = useState(content);
  const [isLocked, setIsLocked] = useState(false);
  const [lockOwner, setLockOwner] = useState<string | null>(null);
  const [changes, setChanges] = useState<Change[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#FDCB58', '#A8E6CF', '#FFD3B6', '#FF8B94', '#A8D8EA'
  ];

  useEffect(() => {
    initializeCollaboration();

    return () => {
      cleanup();
    };
  }, [resourceId]);

  useEffect(() => {
    if (autoSave && hasUnsavedChanges) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveContent();
      }, 2000);
    }
  }, [localContent, hasUnsavedChanges]);

  const initializeCollaboration = () => {
    // Mock collaborators
    const mockCollaborators: Collaborator[] = [
      {
        id: 'user_2',
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
        color: userColors[0],
        cursor: { x: 150, y: 200 }
      },
      {
        id: 'user_3',
        name: 'Bob Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        color: userColors[1],
        isTyping: true
      }
    ];

    setCollaborators(mockCollaborators);

    // In production, connect to WebSocket
    connectWebSocket();
  };

  const connectWebSocket = () => {
    // Mock WebSocket connection
    console.log('Connecting to collaboration server...');

    // Simulate receiving updates
    setTimeout(() => {
      simulateRemoteChange();
    }, 5000);
  };

  const cleanup = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  };

  const simulateRemoteChange = () => {
    const change: Change = {
      id: `change_${Date.now()}`,
      userId: 'user_2',
      userName: 'Jane Smith',
      type: 'insert',
      position: 10,
      content: ' (edited by Jane)',
      timestamp: new Date().toISOString()
    };

    handleRemoteChange(change);
  };

  const handleLocalChange = (newContent: string) => {
    if (isLocked && lockOwner !== 'user_1') {
      toast.error('Document is locked by another user');
      return;
    }

    setLocalContent(newContent);
    setHasUnsavedChanges(true);

    if (onContentChange) {
      onContentChange(newContent);
    }

    // Broadcast change to others
    broadcastChange({
      id: `change_${Date.now()}`,
      userId: 'user_1',
      userName: 'You',
      type: 'insert',
      position: 0,
      content: newContent,
      timestamp: new Date().toISOString()
    });
  };

  const handleRemoteChange = (change: Change) => {
    setChanges(prev => [...prev, change]);

    // Apply change to content (simplified)
    if (change.type === 'insert' && change.content) {
      setLocalContent(prev => {
        const before = prev.slice(0, change.position);
        const after = prev.slice(change.position);
        return before + change.content + after;
      });
    }

    // Show notification
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-white shadow-lg rounded-lg p-3 flex items-center gap-3`}>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: collaborators.find(c => c.id === change.userId)?.color }}
        />
        <div>
          <p className="text-sm font-medium">{change.userName} made changes</p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>
      </div>
    ), { duration: 3000 });
  };

  const broadcastChange = (change: Change) => {
    // Send change via WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'change',
        payload: change
      }));
    }
  };

  const handleCursorMove = (e: React.MouseEvent) => {
    if (!showCursors || !contentRef.current) return;

    const rect = contentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Broadcast cursor position
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'cursor',
        payload: { x, y }
      }));
    }
  };

  const toggleLock = () => {
    if (isLocked && lockOwner !== 'user_1') {
      toast.error('Only the lock owner can unlock');
      return;
    }

    const newLockState = !isLocked;
    setIsLocked(newLockState);
    setLockOwner(newLockState ? 'user_1' : null);

    toast.success(newLockState ? 'Document locked' : 'Document unlocked');

    // Broadcast lock state
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        type: 'lock',
        payload: { locked: newLockState, owner: newLockState ? 'user_1' : null }
      }));
    }
  };

  const saveContent = async () => {
    setIsSaving(true);

    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setHasUnsavedChanges(false);
      toast.success('Changes saved');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const renderCursors = () => {
    if (!showCursors) return null;

    return collaborators.map(collaborator => {
      if (!collaborator.cursor) return null;

      return (
        <div
          key={collaborator.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: collaborator.cursor.x,
            top: collaborator.cursor.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <MousePointer
            className="w-4 h-4"
            style={{ color: collaborator.color }}
          />
          <span
            className="absolute -top-6 left-0 px-1 py-0.5 text-xs text-white rounded whitespace-nowrap"
            style={{ backgroundColor: collaborator.color }}
          >
            {collaborator.name}
          </span>
        </div>
      );
    });
  };

  const renderSelection = () => {
    if (!showCursors) return null;

    return collaborators.map(collaborator => {
      if (!collaborator.selection) return null;

      return (
        <div
          key={`selection-${collaborator.id}`}
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: collaborator.selection.start,
            width: '100%',
            height: collaborator.selection.end - collaborator.selection.start,
            backgroundColor: collaborator.color,
            opacity: 0.2
          }}
        />
      );
    });
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-900">
              Live Collaboration
            </h3>
            {isLocked && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                <Lock className="w-3 h-3" />
                Locked by {lockOwner === 'user_1' ? 'You' : lockOwner}
              </div>
            )}
            {hasUnsavedChanges && (
              <div className="flex items-center gap-1 text-sm text-orange-600">
                <AlertCircle className="w-3 h-3" />
                Unsaved changes
              </div>
            )}
            {isSaving && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Saving...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showPresence && (
              <div className="flex -space-x-2 mr-3">
                {collaborators.slice(0, 3).map(collaborator => (
                  <div key={collaborator.id} className="relative">
                    <img
                      src={collaborator.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(collaborator.name)}`}
                      alt={collaborator.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    {collaborator.isTyping && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <Type className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {collaborators.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                    +{collaborators.length - 3}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleLock}
              className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                isLocked ? 'text-yellow-600' : 'text-gray-600'
              }`}
              title={isLocked ? 'Unlock' : 'Lock for editing'}
            >
              {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Version history"
            >
              <History className="w-5 h-5" />
            </button>

            <button
              onClick={saveContent}
              disabled={!hasUnsavedChanges || isSaving}
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex">
        <div className="flex-1 relative">
          <div
            ref={contentRef}
            className="relative min-h-[400px] p-4"
            onMouseMove={handleCursorMove}
          >
            {/* Cursors and Selections */}
            {renderCursors()}
            {renderSelection()}

            {/* Content Editor */}
            {editable ? (
              <div
                contentEditable={!isLocked || lockOwner === 'user_1'}
                suppressContentEditableWarning
                className="outline-none min-h-[350px] prose max-w-none"
                onInput={(e) => handleLocalChange(e.currentTarget.innerText)}
                dangerouslySetInnerHTML={{ __html: localContent }}
              />
            ) : (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: localContent }} />
            )}

            {/* Typing Indicators */}
            {collaborators.some(c => c.isTyping) && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-gray-500">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                {collaborators.filter(c => c.isTyping).map(c => c.name).join(', ')} typing...
              </div>
            )}
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="w-80 border-l p-4">
            <h4 className="font-medium text-gray-900 mb-3">Change History</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {changes.map(change => (
                <div key={change.id} className="p-2 bg-gray-50 rounded text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{change.userName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(change.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {change.type === 'insert' && `Added text at position ${change.position}`}
                    {change.type === 'delete' && `Deleted ${change.length} characters`}
                    {change.type === 'format' && 'Applied formatting'}
                    {change.type === 'move' && 'Moved content'}
                  </p>
                </div>
              ))}
              {changes.length === 0 && (
                <p className="text-center text-gray-500 py-4">No changes yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}