import { DateRange, TimeSeriesData } from '@/types/analytics';

// Date range utilities
export const getDateRange = (preset: string): DateRange => {
  const end = new Date();
  const start = new Date();

  switch (preset) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'yesterday':
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      break;
    case 'last7days':
      start.setDate(start.getDate() - 7);
      break;
    case 'last30days':
      start.setDate(start.getDate() - 30);
      break;
    case 'last90days':
      start.setDate(start.getDate() - 90);
      break;
    case 'thisMonth':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'lastMonth':
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0); // Last day of previous month
      break;
    case 'thisYear':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      start.setDate(start.getDate() - 30); // Default to last 30 days
  }

  return { start, end, label: preset };
};

// Format numbers for display
export const formatMetricValue = (value: number, unit?: string): string => {
  if (unit === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (unit === 'percentage') {
    return `${value.toFixed(1)}%`;
  }

  if (unit === 'duration') {
    if (value < 60) return `${Math.round(value)}s`;
    if (value < 3600) return `${Math.round(value / 60)}m`;
    return `${(value / 3600).toFixed(1)}h`;
  }

  // Format large numbers with abbreviations
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toLocaleString();
};

// Calculate percentage change
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

// Get trend direction
export const getTrend = (data: number[]): 'up' | 'down' | 'stable' => {
  if (data.length < 2) return 'stable';

  const recent = data.slice(-5); // Last 5 data points
  const average = recent.reduce((a, b) => a + b, 0) / recent.length;
  const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
  const secondHalf = recent.slice(Math.floor(recent.length / 2));

  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

  if (Math.abs(secondAvg - firstAvg) < average * 0.05) return 'stable';
  return secondAvg > firstAvg ? 'up' : 'down';
};

// Generate chart colors
export const getChartColors = (count: number): string[] => {
  const baseColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#14B8A6', // Teal
  ];

  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }

  // Generate additional colors if needed
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    const hue = (i * 360) / count;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

// Aggregate time series data
export const aggregateTimeSeries = (
  data: TimeSeriesData[],
  interval: 'hour' | 'day' | 'week' | 'month'
): TimeSeriesData[] => {
  const aggregated: Map<string, number> = new Map();

  data.forEach(point => {
    const date = new Date(point.timestamp);
    let key: string;

    switch (interval) {
      case 'hour':
        key = `${date.toISOString().slice(0, 13)}:00`;
        break;
      case 'day':
        key = date.toISOString().slice(0, 10);
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().slice(0, 10);
        break;
      case 'month':
        key = date.toISOString().slice(0, 7);
        break;
    }

    aggregated.set(key, (aggregated.get(key) || 0) + point.value);
  });

  return Array.from(aggregated.entries()).map(([timestamp, value]) => ({
    timestamp,
    value
  }));
};

// Calculate growth rate
export const calculateGrowthRate = (data: number[]): number => {
  if (data.length < 2) return 0;

  const first = data[0];
  const last = data[data.length - 1];

  if (first === 0) return last > 0 ? 100 : 0;
  return ((last - first) / first) * 100;
};

// Get status color
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'on-track': 'text-green-600 bg-green-100',
    'at-risk': 'text-yellow-600 bg-yellow-100',
    'behind': 'text-red-600 bg-red-100',
    'exceeded': 'text-blue-600 bg-blue-100',
    'increase': 'text-green-600',
    'decrease': 'text-red-600',
    'neutral': 'text-gray-600'
  };
  return statusColors[status] || 'text-gray-600 bg-gray-100';
};

// Format date for display
export const formatDate = (date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'long':
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    case 'time':
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    default:
      return d.toLocaleDateString();
  }
};

// Calculate retention rate
export const calculateRetentionRate = (
  startUsers: number,
  endUsers: number,
  newUsers: number
): number => {
  if (startUsers === 0) return 0;
  return ((endUsers - newUsers) / startUsers) * 100;
};

// Calculate conversion rate
export const calculateConversionRate = (
  conversions: number,
  visitors: number
): number => {
  if (visitors === 0) return 0;
  return (conversions / visitors) * 100;
};