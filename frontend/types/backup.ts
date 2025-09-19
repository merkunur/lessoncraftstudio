// Backup and Recovery type definitions

export interface Backup {
  id: string;
  name: string;
  description?: string;
  type: 'full' | 'incremental' | 'differential' | 'snapshot';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'corrupted';
  size: number; // bytes
  compressedSize?: number; // bytes
  compressionRatio?: number;
  createdAt: string;
  completedAt?: string;
  expiresAt?: string;
  retentionDays: number;
  location: BackupLocation;
  metadata: BackupMetadata;
  encryption?: EncryptionInfo;
  verification?: VerificationInfo;
}

export interface BackupLocation {
  type: 'local' | 'cloud' | 'remote' | 'hybrid';
  provider?: 'aws' | 'gcp' | 'azure' | 'local' | 'custom';
  bucket?: string;
  path: string;
  region?: string;
  url?: string;
}

export interface BackupMetadata {
  version: string;
  includesDatabase: boolean;
  includesFiles: boolean;
  includesConfig: boolean;
  includesLogs: boolean;
  databaseVersion?: string;
  applicationVersion: string;
  totalRecords?: number;
  totalFiles?: number;
  checksum?: string;
  tags?: string[];
}

export interface EncryptionInfo {
  enabled: boolean;
  algorithm: 'AES-256' | 'RSA-2048' | 'ChaCha20';
  keyId?: string;
  encryptedAt?: string;
}

export interface VerificationInfo {
  verified: boolean;
  verifiedAt?: string;
  integrityCheck: 'passed' | 'failed' | 'pending';
  checksumMatch?: boolean;
  restorable?: boolean;
}

export interface BackupSchedule {
  id: string;
  name: string;
  enabled: boolean;
  type: 'full' | 'incremental' | 'differential';
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';
  cronExpression?: string;
  time?: string; // HH:MM format
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  retentionPolicy: RetentionPolicy;
  destination: BackupLocation;
  notifications?: NotificationSettings;
  lastRun?: string;
  nextRun?: string;
}

export interface RetentionPolicy {
  keepDaily: number;
  keepWeekly: number;
  keepMonthly: number;
  keepYearly: number;
  deleteAfterDays?: number;
  archiveAfterDays?: number;
}

export interface NotificationSettings {
  onSuccess: boolean;
  onFailure: boolean;
  onWarning: boolean;
  emailRecipients?: string[];
  slackWebhook?: string;
  webhookUrl?: string;
}

export interface RestorePoint {
  id: string;
  backupId: string;
  name: string;
  timestamp: string;
  type: 'manual' | 'automatic' | 'scheduled';
  description?: string;
  restorable: boolean;
  dataTypes: string[];
  size: number;
}

export interface RestoreOperation {
  id: string;
  backupId: string;
  restorePointId?: string;
  status: 'pending' | 'preparing' | 'downloading' | 'extracting' | 'restoring' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  progress: number; // 0-100
  currentStep?: string;
  totalSteps?: number;
  options: RestoreOptions;
  errors?: string[];
  warnings?: string[];
}

export interface RestoreOptions {
  targetEnvironment: 'production' | 'staging' | 'development' | 'local';
  overwriteExisting: boolean;
  restoreDatabase: boolean;
  restoreFiles: boolean;
  restoreConfig: boolean;
  skipVerification?: boolean;
  testRestore?: boolean;
  customPath?: string;
}

export interface DataExport {
  id: string;
  name: string;
  format: 'json' | 'csv' | 'xml' | 'sql' | 'zip';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  includeData: DataSelection;
  filters?: ExportFilter[];
  compression: boolean;
  encryption: boolean;
  size?: number;
  recordCount?: number;
  downloadUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface DataSelection {
  users?: boolean;
  worksheets?: boolean;
  templates?: boolean;
  media?: boolean;
  settings?: boolean;
  analytics?: boolean;
  logs?: boolean;
  custom?: string[];
}

export interface ExportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between' | 'in';
  value: any;
}

export interface DataImport {
  id: string;
  name: string;
  source: 'upload' | 'url' | 'api' | 'database';
  format: 'json' | 'csv' | 'xml' | 'sql';
  status: 'pending' | 'validating' | 'processing' | 'completed' | 'failed';
  validationResult?: ValidationResult;
  mapping?: FieldMapping[];
  options: ImportOptions;
  progress: number;
  totalRecords?: number;
  processedRecords?: number;
  errors?: ImportError[];
  createdAt: string;
  completedAt?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  recordCount: number;
  fieldCount: number;
  sampleData?: any[];
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
  required: boolean;
  dataType: string;
}

export interface ImportOptions {
  mode: 'append' | 'replace' | 'update' | 'upsert';
  skipDuplicates: boolean;
  validateData: boolean;
  rollbackOnError: boolean;
  batchSize: number;
  dryRun?: boolean;
}

export interface ImportError {
  row?: number;
  field?: string;
  value?: any;
  error: string;
  severity: 'warning' | 'error' | 'critical';
}

export interface DisasterRecovery {
  id: string;
  plan: RecoveryPlan;
  rto: number; // Recovery Time Objective in minutes
  rpo: number; // Recovery Point Objective in minutes
  testResults: DRTest[];
  failoverReady: boolean;
  lastTestDate?: string;
  nextTestDate?: string;
}

export interface RecoveryPlan {
  id: string;
  name: string;
  version: string;
  procedures: RecoveryProcedure[];
  contacts: EmergencyContact[];
  resources: RecoveryResource[];
  priorities: string[];
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface RecoveryProcedure {
  id: string;
  step: number;
  name: string;
  description: string;
  estimatedTime: number; // minutes
  responsible: string;
  automated: boolean;
  script?: string;
  dependencies?: string[];
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  availability: string;
  priority: number;
}

export interface RecoveryResource {
  type: 'server' | 'database' | 'storage' | 'network' | 'application';
  name: string;
  location: string;
  capacity: string;
  available: boolean;
  backupResource?: string;
}

export interface DRTest {
  id: string;
  testDate: string;
  testType: 'full' | 'partial' | 'tabletop' | 'simulation';
  success: boolean;
  actualRTO?: number;
  actualRPO?: number;
  issues?: string[];
  recommendations?: string[];
  tester: string;
}

export interface BackupHealth {
  status: 'healthy' | 'warning' | 'critical';
  lastSuccessfulBackup?: string;
  failedBackups: number;
  pendingBackups: number;
  storageUsed: number;
  storageLimit: number;
  oldestBackup?: string;
  newestBackup?: string;
  issues?: HealthIssue[];
}

export interface HealthIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'backup' | 'storage' | 'retention' | 'verification' | 'performance';
  message: string;
  recommendation: string;
  detectedAt: string;
  resolved?: boolean;
}