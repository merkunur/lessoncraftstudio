import { Backup, BackupSchedule, RetentionPolicy, RestorePoint } from '@/types/backup';

// Calculate backup size with compression
export const calculateCompressedSize = (originalSize: number, compressionType: string = 'gzip'): number => {
  const compressionRatios: Record<string, number> = {
    'gzip': 0.3,
    'zip': 0.35,
    'tar': 0.8,
    'bzip2': 0.25,
    '7z': 0.2
  };

  const ratio = compressionRatios[compressionType] || 0.5;
  return Math.round(originalSize * ratio);
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Calculate next backup time based on schedule
export const getNextBackupTime = (schedule: BackupSchedule): Date => {
  const now = new Date();
  const next = new Date();

  switch (schedule.frequency) {
    case 'hourly':
      next.setHours(next.getHours() + 1);
      next.setMinutes(0);
      next.setSeconds(0);
      break;

    case 'daily':
      if (schedule.time) {
        const [hours, minutes] = schedule.time.split(':').map(Number);
        next.setHours(hours, minutes, 0, 0);
        if (next <= now) {
          next.setDate(next.getDate() + 1);
        }
      } else {
        next.setDate(next.getDate() + 1);
      }
      break;

    case 'weekly':
      const targetDay = schedule.dayOfWeek || 0;
      const currentDay = next.getDay();
      const daysUntilTarget = (targetDay + 7 - currentDay) % 7 || 7;
      next.setDate(next.getDate() + daysUntilTarget);
      if (schedule.time) {
        const [hours, minutes] = schedule.time.split(':').map(Number);
        next.setHours(hours, minutes, 0, 0);
      }
      break;

    case 'monthly':
      const targetDate = schedule.dayOfMonth || 1;
      next.setDate(targetDate);
      if (next <= now) {
        next.setMonth(next.getMonth() + 1);
      }
      if (schedule.time) {
        const [hours, minutes] = schedule.time.split(':').map(Number);
        next.setHours(hours, minutes, 0, 0);
      }
      break;

    case 'custom':
      // Parse cron expression if provided
      // Simplified implementation
      next.setHours(next.getHours() + 24);
      break;
  }

  return next;
};

// Check if backup should be retained based on policy
export const shouldRetainBackup = (backup: Backup, policy: RetentionPolicy): boolean => {
  const backupDate = new Date(backup.createdAt);
  const now = new Date();
  const ageInDays = Math.floor((now.getTime() - backupDate.getTime()) / (1000 * 60 * 60 * 24));

  // Check deletion policy
  if (policy.deleteAfterDays && ageInDays > policy.deleteAfterDays) {
    return false;
  }

  // Check if it's a daily backup to keep
  if (ageInDays <= policy.keepDaily) {
    return true;
  }

  // Check if it's a weekly backup to keep (Sunday)
  if (ageInDays <= policy.keepWeekly * 7 && backupDate.getDay() === 0) {
    return true;
  }

  // Check if it's a monthly backup to keep (1st of month)
  if (ageInDays <= policy.keepMonthly * 30 && backupDate.getDate() === 1) {
    return true;
  }

  // Check if it's a yearly backup to keep (Jan 1st)
  if (ageInDays <= policy.keepYearly * 365 && backupDate.getMonth() === 0 && backupDate.getDate() === 1) {
    return true;
  }

  return false;
};

// Generate backup name with timestamp
export const generateBackupName = (type: string, prefix: string = 'backup'): string => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, -5);
  return `${prefix}_${type}_${timestamp}`;
};

// Calculate storage requirements
export const calculateStorageRequirements = (
  dataSize: number,
  retentionPolicy: RetentionPolicy,
  backupType: 'full' | 'incremental' | 'differential'
): number => {
  let totalSize = 0;

  // Calculate full backup storage
  const fullBackupSize = dataSize;

  // Daily backups
  if (backupType === 'full') {
    totalSize += fullBackupSize * retentionPolicy.keepDaily;
  } else {
    // First backup is always full
    totalSize += fullBackupSize;
    // Incremental backups are typically 5-10% of full
    totalSize += fullBackupSize * 0.1 * (retentionPolicy.keepDaily - 1);
  }

  // Weekly backups (assuming full)
  totalSize += fullBackupSize * retentionPolicy.keepWeekly;

  // Monthly backups (assuming full)
  totalSize += fullBackupSize * retentionPolicy.keepMonthly;

  // Yearly backups (assuming full)
  totalSize += fullBackupSize * retentionPolicy.keepYearly;

  return Math.round(totalSize);
};

// Verify backup integrity
export const verifyBackupIntegrity = (backup: Backup): boolean => {
  // Check if backup file exists and is not corrupted
  // In production, this would check actual file integrity

  if (!backup.metadata.checksum) {
    return false;
  }

  if (backup.status === 'corrupted' || backup.status === 'failed') {
    return false;
  }

  if (backup.size === 0) {
    return false;
  }

  return true;
};

// Calculate Recovery Time Objective (RTO) and Recovery Point Objective (RPO)
export const calculateRecoveryMetrics = (backups: Backup[]): { rto: number; rpo: number } => {
  if (backups.length === 0) {
    return { rto: -1, rpo: -1 };
  }

  // Sort backups by creation date
  const sortedBackups = backups
    .filter(b => b.status === 'completed')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (sortedBackups.length === 0) {
    return { rto: -1, rpo: -1 };
  }

  // RPO: Time since last successful backup
  const lastBackup = sortedBackups[0];
  const now = new Date();
  const lastBackupTime = new Date(lastBackup.createdAt);
  const rpo = Math.floor((now.getTime() - lastBackupTime.getTime()) / (1000 * 60)); // in minutes

  // RTO: Estimated time to restore (based on backup size and type)
  // Rough estimate: 1GB takes ~5 minutes to restore
  const restoreRate = 1024 * 1024 * 1024 / (5 * 60); // bytes per second
  const rto = Math.ceil(lastBackup.size / restoreRate / 60); // in minutes

  return { rto, rpo };
};

// Get backup status color for UI
export const getBackupStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'completed': 'text-green-600 bg-green-100',
    'in_progress': 'text-blue-600 bg-blue-100',
    'pending': 'text-yellow-600 bg-yellow-100',
    'failed': 'text-red-600 bg-red-100',
    'corrupted': 'text-red-800 bg-red-200'
  };

  return statusColors[status] || 'text-gray-600 bg-gray-100';
};

// Estimate backup duration
export const estimateBackupDuration = (dataSize: number, type: string): number => {
  // Rough estimates in seconds
  const baseRate = 50 * 1024 * 1024; // 50 MB/s for local backup

  const typeMultipliers: Record<string, number> = {
    'full': 1,
    'incremental': 0.2,
    'differential': 0.5,
    'snapshot': 0.1
  };

  const multiplier = typeMultipliers[type] || 1;
  const seconds = (dataSize * multiplier) / baseRate;

  return Math.ceil(seconds / 60); // return in minutes
};

// Generate restore point from backup
export const createRestorePoint = (backup: Backup, name?: string): RestorePoint => {
  return {
    id: `restore_${Date.now()}`,
    backupId: backup.id,
    name: name || `Restore Point - ${new Date(backup.createdAt).toLocaleString()}`,
    timestamp: backup.createdAt,
    type: 'manual',
    restorable: backup.status === 'completed' && verifyBackupIntegrity(backup),
    dataTypes: [],
    size: backup.size
  };
};

// Check backup health status
export const getBackupHealth = (backups: Backup[]): 'healthy' | 'warning' | 'critical' => {
  const now = new Date();
  const recentBackups = backups.filter(b => {
    const backupTime = new Date(b.createdAt);
    const hoursSince = (now.getTime() - backupTime.getTime()) / (1000 * 60 * 60);
    return hoursSince <= 24 && b.status === 'completed';
  });

  const failedBackups = backups.filter(b => b.status === 'failed').length;

  if (recentBackups.length === 0 || failedBackups > 3) {
    return 'critical';
  }

  if (recentBackups.length < 2 || failedBackups > 0) {
    return 'warning';
  }

  return 'healthy';
};