// Collaboration System type definitions

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  type: WorkspaceType;
  visibility: 'private' | 'team' | 'public';
  owner: string;
  members: WorkspaceMember[];
  settings: WorkspaceSettings;
  features: WorkspaceFeatures;
  limits?: WorkspaceLimits;
  metadata?: WorkspaceMetadata;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export type WorkspaceType = 
  | 'personal'
  | 'team'
  | 'project'
  | 'classroom'
  | 'organization';

export interface WorkspaceMember {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: MemberRole;
  permissions: Permission[];
  status: 'active' | 'invited' | 'pending' | 'suspended';
  joinedAt?: string;
  lastActiveAt?: string;
  invitedBy?: string;
  inviteToken?: string;
}

export type MemberRole = 
  | 'owner'
  | 'admin'
  | 'editor'
  | 'viewer'
  | 'commenter'
  | 'guest';

export interface Permission {
  resource: string;
  actions: PermissionAction[];
  conditions?: Record<string, any>;
}

export type PermissionAction = 
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'share'
  | 'comment'
  | 'manage';

export interface WorkspaceSettings {
  defaultRole: MemberRole;
  requireApproval: boolean;
  allowGuests: boolean;
  allowPublicJoin: boolean;
  joinCode?: string;
  maxMembers?: number;
  retentionDays?: number;
  timezone?: string;
  language?: string;
}

export interface WorkspaceFeatures {
  realTimeCollaboration: boolean;
  versionControl: boolean;
  comments: boolean;
  mentions: boolean;
  activityFeed: boolean;
  videoChat: boolean;
  screenSharing: boolean;
  whiteboard: boolean;
  tasks: boolean;
  calendar: boolean;
}

export interface WorkspaceLimits {
  maxMembers: number;
  maxStorage: number; // bytes
  maxProjects: number;
  maxFiles: number;
  maxFileSize: number; // bytes
  currentUsage: {
    members: number;
    storage: number;
    projects: number;
    files: number;
  };
}

export interface WorkspaceMetadata {
  icon?: string;
  color?: string;
  tags?: string[];
  category?: string;
  industry?: string;
  customFields?: Record<string, any>;
}

export interface CollaborationSession {
  id: string;
  workspaceId: string;
  documentId: string;
  participants: SessionParticipant[];
  status: 'active' | 'paused' | 'ended';
  type: 'editing' | 'viewing' | 'presenting';
  startedAt: string;
  endedAt?: string;
  recording?: boolean;
  recordingUrl?: string;
}

export interface SessionParticipant {
  userId: string;
  name: string;
  avatar?: string;
  cursor?: CursorPosition;
  selection?: SelectionRange;
  status: 'active' | 'idle' | 'away' | 'disconnected';
  joinedAt: string;
  lastActiveAt: string;
  permissions: Permission[];
  device?: DeviceInfo;
}

export interface CursorPosition {
  x: number;
  y: number;
  element?: string;
  color: string;
  label?: string;
  timestamp: string;
}

export interface SelectionRange {
  start: Position;
  end: Position;
  color: string;
  timestamp: string;
}

export interface Position {
  line: number;
  column: number;
  offset?: number;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os?: string;
  browser?: string;
  screen?: {
    width: number;
    height: number;
  };
}

export interface Comment {
  id: string;
  workspaceId: string;
  documentId?: string;
  parentId?: string;
  thread?: CommentThread;
  author: CommentAuthor;
  content: string;
  mentions?: Mention[];
  attachments?: Attachment[];
  reactions?: Reaction[];
  status: 'active' | 'resolved' | 'deleted';
  edited?: boolean;
  editedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentThread {
  id: string;
  title?: string;
  status: 'open' | 'closed' | 'resolved';
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string[];
  labels?: string[];
  commentCount: number;
  lastActivityAt: string;
}

export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface Mention {
  userId: string;
  name: string;
  position: number; // position in content
  length: number;
  notified: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'link';
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
  thumbnail?: string;
}

export interface Reaction {
  emoji: string;
  users: string[];
  count: number;
}

export interface Activity {
  id: string;
  workspaceId: string;
  actor: ActivityActor;
  action: ActivityAction;
  target: ActivityTarget;
  context?: ActivityContext;
  timestamp: string;
  visibility: 'public' | 'team' | 'private';
  importance: 'low' | 'medium' | 'high';
}

export interface ActivityActor {
  id: string;
  type: 'user' | 'system' | 'integration';
  name: string;
  avatar?: string;
}

export type ActivityAction = 
  | 'created'
  | 'updated'
  | 'deleted'
  | 'shared'
  | 'commented'
  | 'mentioned'
  | 'joined'
  | 'left'
  | 'invited'
  | 'assigned'
  | 'completed'
  | 'approved'
  | 'rejected'
  | 'published';

export interface ActivityTarget {
  type: string;
  id: string;
  name: string;
  url?: string;
}

export interface ActivityContext {
  diff?: any;
  oldValue?: any;
  newValue?: any;
  comment?: string;
  metadata?: Record<string, any>;
}

export interface PresenceInfo {
  userId: string;
  workspaceId: string;
  status: PresenceStatus;
  location?: PresenceLocation;
  lastSeen: string;
  devices: DevicePresence[];
}

export type PresenceStatus = 
  | 'online'
  | 'away'
  | 'busy'
  | 'offline'
  | 'invisible';

export interface PresenceLocation {
  type: 'document' | 'page' | 'workspace' | 'dashboard';
  id?: string;
  name?: string;
  path?: string;
}

export interface DevicePresence {
  id: string;
  type: 'desktop' | 'mobile' | 'tablet' | 'web';
  lastActiveAt: string;
  isActive: boolean;
}

export interface SharedDocument {
  id: string;
  workspaceId: string;
  title: string;
  content?: any;
  type: DocumentType;
  owner: string;
  collaborators: DocumentCollaborator[];
  version: number;
  versions?: DocumentVersion[];
  permissions: DocumentPermissions;
  locks?: DocumentLock[];
  status: 'draft' | 'in_review' | 'published' | 'archived';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type DocumentType = 
  | 'document'
  | 'spreadsheet'
  | 'presentation'
  | 'whiteboard'
  | 'code'
  | 'diagram';

export interface DocumentCollaborator {
  userId: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer' | 'commenter';
  lastEditedAt?: string;
  isActive: boolean;
  color?: string;
}

export interface DocumentVersion {
  id: string;
  version: number;
  createdBy: string;
  createdAt: string;
  changes?: string;
  size: number;
  snapshot?: any;
}

export interface DocumentPermissions {
  public: boolean;
  linkSharing: boolean;
  copyable: boolean;
  downloadable: boolean;
  commentable: boolean;
  versionHistory: boolean;
  passwordProtected?: boolean;
  password?: string;
  expiresAt?: string;
}

export interface DocumentLock {
  id: string;
  userId: string;
  section?: string;
  lockedAt: string;
  expiresAt: string;
  type: 'exclusive' | 'shared';
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  organizationId?: string;
  members: TeamMember[];
  workspaces: string[]; // Workspace IDs
  settings: TeamSettings;
  billing?: TeamBilling;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamRole;
  department?: string;
  title?: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActiveAt?: string;
}

export type TeamRole = 
  | 'owner'
  | 'admin'
  | 'manager'
  | 'member'
  | 'guest';

export interface TeamSettings {
  allowMemberInvites: boolean;
  requireTwoFactor: boolean;
  ssoEnabled: boolean;
  ssoProvider?: string;
  defaultWorkspaceRole: MemberRole;
  activityTracking: boolean;
  dataRetentionDays?: number;
}

export interface TeamBilling {
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  seats: number;
  usedSeats: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate?: string;
  amount?: number;
  currency?: string;
}

export interface Invitation {
  id: string;
  workspaceId?: string;
  teamId?: string;
  invitedBy: string;
  invitedEmail: string;
  invitedName?: string;
  role: MemberRole;
  message?: string;
  token: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expiresAt: string;
  acceptedAt?: string;
  declinedAt?: string;
  createdAt: string;
}

export interface VideoCall {
  id: string;
  workspaceId: string;
  roomId: string;
  participants: VideoParticipant[];
  status: 'waiting' | 'active' | 'ended';
  type: 'meeting' | 'webinar' | 'broadcast';
  recording?: boolean;
  recordingUrl?: string;
  startedAt?: string;
  endedAt?: string;
  scheduledFor?: string;
  maxParticipants?: number;
  settings: VideoCallSettings;
}

export interface VideoParticipant {
  userId: string;
  name: string;
  role: 'host' | 'co-host' | 'participant' | 'viewer';
  audio: boolean;
  video: boolean;
  screen: boolean;
  hand: boolean;
  joinedAt: string;
  leftAt?: string;
  connection?: {
    quality: 'excellent' | 'good' | 'fair' | 'poor';
    latency: number;
    bandwidth: number;
  };
}

export interface VideoCallSettings {
  allowGuests: boolean;
  waitingRoom: boolean;
  muteOnJoin: boolean;
  requirePassword: boolean;
  password?: string;
  autoRecord: boolean;
  chatEnabled: boolean;
  screenShareEnabled: boolean;
  virtualBackgrounds: boolean;
}

export interface Whiteboard {
  id: string;
  workspaceId: string;
  name: string;
  canvas: any; // Canvas data
  participants: WhiteboardParticipant[];
  tools: WhiteboardTool[];
  status: 'active' | 'saved' | 'archived';
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface WhiteboardParticipant {
  userId: string;
  name: string;
  cursor: CursorPosition;
  tool?: string;
  color?: string;
  isDrawing: boolean;
}

export interface WhiteboardTool {
  id: string;
  type: 'pen' | 'eraser' | 'text' | 'shape' | 'sticky' | 'image';
  properties: Record<string, any>;
  enabled: boolean;
}

export interface Task {
  id: string;
  workspaceId: string;
  projectId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees: string[];
  dueDate?: string;
  startDate?: string;
  completedAt?: string;
  tags?: string[];
  attachments?: Attachment[];
  comments?: string[]; // Comment IDs
  subtasks?: Task[];
  dependencies?: string[]; // Task IDs
  timeTracked?: number; // minutes
  estimatedTime?: number; // minutes
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 
  | 'todo'
  | 'in_progress'
  | 'review'
  | 'done'
  | 'cancelled'
  | 'blocked';

export type TaskPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export interface CollaborationStats {
  workspaceId: string;
  period: 'day' | 'week' | 'month' | 'year';
  startDate: string;
  endDate: string;
  metrics: {
    activeUsers: number;
    totalActivities: number;
    documentsCreated: number;
    documentsEdited: number;
    commentsAdded: number;
    mentionsMade: number;
    tasksCompleted: number;
    meetingsHeld: number;
    averageSessionDuration: number;
    collaborationScore: number;
  };
  topContributors: Array<{
    userId: string;
    name: string;
    contributions: number;
  }>;
  activityTimeline: Array<{
    timestamp: string;
    count: number;
  }>;
  documentActivity: Array<{
    documentId: string;
    name: string;
    edits: number;
    views: number;
  }>;
}