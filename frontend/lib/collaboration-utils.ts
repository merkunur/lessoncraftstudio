import {
  Workspace,
  WorkspaceMember,
  MemberRole,
  Permission,
  CollaborationSession,
  SessionParticipant,
  Comment,
  Mention,
  Activity,
  PresenceInfo,
  SharedDocument,
  Team,
  Task,
  CursorPosition,
  SelectionRange
} from '@/types/collaboration';

// Check if user has permission
export function hasPermission(
  member: WorkspaceMember,
  resource: string,
  action: string
): boolean {
  // Owner has all permissions
  if (member.role === 'owner') return true;

  // Check role-based permissions
  const rolePermissions = getRolePermissions(member.role);
  if (rolePermissions[resource]?.includes(action)) return true;

  // Check specific permissions
  return member.permissions.some(
    p => p.resource === resource && p.actions.includes(action as any)
  );
}

// Get default permissions for a role
export function getRolePermissions(role: MemberRole): Record<string, string[]> {
  const permissions: Record<MemberRole, Record<string, string[]>> = {
    owner: {
      '*': ['create', 'read', 'update', 'delete', 'share', 'comment', 'manage']
    },
    admin: {
      '*': ['create', 'read', 'update', 'delete', 'share', 'comment'],
      workspace: ['manage']
    },
    editor: {
      document: ['create', 'read', 'update', 'share', 'comment'],
      file: ['create', 'read', 'update'],
      comment: ['create', 'read', 'update', 'delete']
    },
    viewer: {
      '*': ['read'],
      comment: ['create', 'read']
    },
    commenter: {
      '*': ['read'],
      comment: ['create', 'read', 'update']
    },
    guest: {
      document: ['read'],
      file: ['read']
    }
  };

  return permissions[role] || {};
}

// Generate a unique color for a user
export function generateUserColor(userId: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FECA57', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
  ];

  // Generate consistent color based on user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// Format member display name
export function formatMemberName(member: WorkspaceMember): string {
  return member.name || member.email.split('@')[0];
}

// Calculate collaboration score
export function calculateCollaborationScore(
  activities: Activity[],
  timeRange: number = 7 * 24 * 60 * 60 * 1000 // 7 days
): number {
  const now = Date.now();
  const recentActivities = activities.filter(
    a => now - new Date(a.timestamp).getTime() < timeRange
  );

  // Weight different actions
  const actionWeights: Record<string, number> = {
    created: 3,
    updated: 2,
    commented: 2,
    mentioned: 1,
    shared: 3,
    completed: 4,
    joined: 1
  };

  let score = 0;
  recentActivities.forEach(activity => {
    const weight = actionWeights[activity.action] || 1;
    score += weight;
  });

  // Normalize to 0-100
  return Math.min(100, Math.round(score / recentActivities.length * 10));
}

// Extract mentions from text
export function extractMentions(text: string): string[] {
  const mentionPattern = /@([\w.-]+)/g;
  const mentions: string[] = [];
  let match;

  while ((match = mentionPattern.exec(text)) !== null) {
    mentions.push(match[1]);
  }

  return mentions;
}

// Format mention in text
export function formatMentions(
  text: string,
  users: Map<string, { name: string; id: string }>
): string {
  return text.replace(/@([\w.-]+)/g, (match, username) => {
    const user = users.get(username);
    if (user) {
      return `<span class="mention" data-user-id="${user.id}">@${user.name}</span>`;
    }
    return match;
  });
}

// Calculate relative position for cursor
export function calculateRelativeCursorPosition(
  x: number,
  y: number,
  containerRect: DOMRect
): CursorPosition {
  return {
    x: ((x - containerRect.left) / containerRect.width) * 100,
    y: ((y - containerRect.top) / containerRect.height) * 100,
    color: '#000000',
    timestamp: new Date().toISOString()
  };
}

// Merge concurrent edits (Operational Transformation)
export function mergeEdits(
  baseText: string,
  edit1: { position: number; delete: number; insert: string },
  edit2: { position: number; delete: number; insert: string }
): string {
  // Simple implementation - in production, use a library like OT.js
  let result = baseText;

  // Apply edits in order of position
  const edits = [edit1, edit2].sort((a, b) => b.position - a.position);
  
  edits.forEach(edit => {
    const before = result.substring(0, edit.position);
    const after = result.substring(edit.position + edit.delete);
    result = before + edit.insert + after;
  });

  return result;
}

// Check if selections overlap
export function doSelectionsOverlap(
  selection1: SelectionRange,
  selection2: SelectionRange
): boolean {
  const start1 = selection1.start.offset || 0;
  const end1 = selection1.end.offset || 0;
  const start2 = selection2.start.offset || 0;
  const end2 = selection2.end.offset || 0;

  return !(end1 < start2 || end2 < start1);
}

// Generate activity summary
export function generateActivitySummary(
  activities: Activity[],
  maxItems: number = 5
): string[] {
  const summaries: string[] = [];
  const grouped = new Map<string, Activity[]>();

  // Group by actor and action
  activities.forEach(activity => {
    const key = `${activity.actor.id}-${activity.action}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(activity);
  });

  // Generate summaries
  Array.from(grouped.entries())
    .slice(0, maxItems)
    .forEach(([_, group]) => {
      const first = group[0];
      if (group.length === 1) {
        summaries.push(
          `${first.actor.name} ${first.action} ${first.target.name}`
        );
      } else {
        summaries.push(
          `${first.actor.name} ${first.action} ${group.length} items`
        );
      }
    });

  return summaries;
}

// Calculate presence status
export function calculatePresenceStatus(
  lastSeen: Date,
  idleThreshold: number = 5 * 60 * 1000 // 5 minutes
): PresenceInfo['status'] {
  const now = Date.now();
  const lastSeenTime = lastSeen.getTime();
  const timeSinceLastSeen = now - lastSeenTime;

  if (timeSinceLastSeen < idleThreshold) {
    return 'online';
  } else if (timeSinceLastSeen < idleThreshold * 3) {
    return 'away';
  } else {
    return 'offline';
  }
}

// Format task priority
export function formatTaskPriority(priority: Task['priority']): {
  label: string;
  color: string;
  icon: string;
} {
  const formats = {
    urgent: { label: 'Urgent', color: 'red', icon: '🔴' },
    high: { label: 'High', color: 'orange', icon: '🟠' },
    medium: { label: 'Medium', color: 'yellow', icon: '🟡' },
    low: { label: 'Low', color: 'green', icon: '🟢' }
  };

  return formats[priority];
}

// Calculate task progress
export function calculateTaskProgress(task: Task): number {
  if (task.status === 'done') return 100;
  if (task.status === 'cancelled') return 0;
  
  if (task.subtasks && task.subtasks.length > 0) {
    const completed = task.subtasks.filter(st => st.status === 'done').length;
    return Math.round((completed / task.subtasks.length) * 100);
  }

  // Estimate based on status
  const statusProgress = {
    todo: 0,
    in_progress: 50,
    review: 75,
    done: 100,
    cancelled: 0,
    blocked: 25
  };

  return statusProgress[task.status] || 0;
}

// Validate workspace limits
export function validateWorkspaceLimits(
  workspace: Workspace
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (workspace.limits) {
    const { maxMembers, maxStorage, maxProjects, maxFiles, currentUsage } = workspace.limits;

    if (currentUsage.members >= maxMembers) {
      errors.push(`Member limit reached (${maxMembers} members)`);
    }

    if (currentUsage.storage >= maxStorage) {
      errors.push(`Storage limit reached (${formatBytes(maxStorage)})`);
    }

    if (currentUsage.projects >= maxProjects) {
      errors.push(`Project limit reached (${maxProjects} projects)`);
    }

    if (currentUsage.files >= maxFiles) {
      errors.push(`File limit reached (${maxFiles} files)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Format bytes to human readable
function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

// Generate shareable link
export function generateShareableLink(
  workspace: Workspace,
  document?: SharedDocument,
  expiresIn?: number // hours
): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const token = btoa(`${workspace.id}-${document?.id || ''}-${Date.now()}`);
  
  let url = `${baseUrl}/workspace/${workspace.id}`;
  if (document) {
    url += `/document/${document.id}`;
  }
  url += `?token=${token}`;
  
  if (expiresIn) {
    const expiresAt = new Date(Date.now() + expiresIn * 60 * 60 * 1000);
    url += `&expires=${expiresAt.getTime()}`;
  }

  return url;
}

// Check if user is typing
export function detectTyping(
  lastKeyPress: Date,
  threshold: number = 2000 // 2 seconds
): boolean {
  return Date.now() - lastKeyPress.getTime() < threshold;
}

// Format collaboration duration
export function formatDuration(startTime: Date, endTime?: Date): string {
  const end = endTime || new Date();
  const durationMs = end.getTime() - startTime.getTime();
  
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

// Calculate optimal video quality based on participants
export function calculateOptimalVideoQuality(
  participantCount: number,
  bandwidth: number // Mbps
): { resolution: string; fps: number; bitrate: number } {
  if (participantCount <= 2 && bandwidth >= 5) {
    return { resolution: '1080p', fps: 30, bitrate: 4000 };
  } else if (participantCount <= 4 && bandwidth >= 3) {
    return { resolution: '720p', fps: 30, bitrate: 2500 };
  } else if (participantCount <= 8 && bandwidth >= 2) {
    return { resolution: '480p', fps: 30, bitrate: 1500 };
  } else {
    return { resolution: '360p', fps: 24, bitrate: 800 };
  }
}

// Sync document changes
export class DocumentSync {
  private pendingChanges: any[] = [];
  private syncInterval: number = 1000; // 1 second
  private syncTimer: NodeJS.Timeout | null = null;

  addChange(change: any) {
    this.pendingChanges.push(change);
    this.scheduleSyn();
  }

  private scheduleSyn() {
    if (this.syncTimer) {
      clearTimeout(this.syncTimer);
    }

    this.syncTimer = setTimeout(() => {
      this.sync();
    }, this.syncInterval);
  }

  private async sync() {
    if (this.pendingChanges.length === 0) return;

    const changes = [...this.pendingChanges];
    this.pendingChanges = [];

    try {
      // Send changes to server
      await fetch('/api/collaboration/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes })
      });
    } catch (error) {
      // Re-add changes if sync failed
      this.pendingChanges.unshift(...changes);
      console.error('Sync failed:', error);
    }
  }

  destroy() {
    if (this.syncTimer) {
      clearTimeout(this.syncTimer);
    }
  }
}