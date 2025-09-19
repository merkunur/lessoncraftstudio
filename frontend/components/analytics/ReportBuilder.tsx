'use client';

import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Filter,
  Calendar,
  Download,
  Save,
  Play,
  Eye,
  Settings,
  X,
  ChevronDown,
  BarChart2,
  PieChart,
  LineChart,
  Table,
  Map,
  List
} from 'lucide-react';
import { Report, ReportFilter, DashboardWidget } from '@/types/analytics';
import toast from 'react-hot-toast';

interface ReportBuilderProps {
  onSave?: (report: Report) => void;
  onRun?: (report: Report) => void;
  initialReport?: Report;
}

export default function ReportBuilder({ onSave, onRun, initialReport }: ReportBuilderProps) {
  const [report, setReport] = useState<Partial<Report>>(initialReport || {
    name: '',
    description: '',
    type: 'custom',
    metrics: [],
    filters: [],
    format: 'pdf'
  });

  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [filters, setFilters] = useState<ReportFilter[]>([]);

  const availableMetrics = [
    { id: 'revenue', name: 'Revenue', category: 'Financial' },
    { id: 'transactions', name: 'Transactions', category: 'Financial' },
    { id: 'avg_order_value', name: 'Average Order Value', category: 'Financial' },
    { id: 'total_users', name: 'Total Users', category: 'Users' },
    { id: 'active_users', name: 'Active Users', category: 'Users' },
    { id: 'new_users', name: 'New Users', category: 'Users' },
    { id: 'retention_rate', name: 'Retention Rate', category: 'Users' },
    { id: 'worksheets_created', name: 'Worksheets Created', category: 'Content' },
    { id: 'downloads', name: 'Downloads', category: 'Content' },
    { id: 'page_views', name: 'Page Views', category: 'Engagement' },
    { id: 'bounce_rate', name: 'Bounce Rate', category: 'Engagement' },
    { id: 'session_duration', name: 'Session Duration', category: 'Engagement' }
  ];

  const widgetTypes = [
    { type: 'metric', icon: BarChart2, label: 'Metric Card' },
    { type: 'chart', icon: LineChart, label: 'Line Chart' },
    { type: 'bar', icon: BarChart2, label: 'Bar Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' },
    { type: 'table', icon: Table, label: 'Data Table' },
    { type: 'list', icon: List, label: 'List View' }
  ];

  const addWidget = (type: string) => {
    const newWidget: DashboardWidget = {
      id: `widget_${Date.now()}`,
      type: type as any,
      title: `New ${type} Widget`,
      dataSource: 'analytics',
      config: {
        metrics: [],
        dimensions: [],
        filters: [],
        displayOptions: {}
      },
      position: {
        x: 0,
        y: widgets.length * 2,
        width: 4,
        height: 2
      }
    };

    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const updateWidget = (widgetId: string, updates: Partial<DashboardWidget>) => {
    setWidgets(widgets.map(w =>
      w.id === widgetId ? { ...w, ...updates } : w
    ));
  };

  const addFilter = () => {
    const newFilter: ReportFilter = {
      field: '',
      operator: 'equals',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, updates: Partial<ReportFilter>) => {
    setFilters(filters.map((f, i) =>
      i === index ? { ...f, ...updates } : f
    ));
  };

  const handleMetricToggle = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metricId));
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  const handleSave = () => {
    if (!report.name) {
      toast.error('Please enter a report name');
      return;
    }

    const fullReport: Report = {
      id: report.id || `report_${Date.now()}`,
      name: report.name,
      description: report.description || '',
      type: report.type || 'custom',
      metrics: selectedMetrics,
      filters: filters,
      format: report.format || 'pdf',
      createdAt: report.createdAt || new Date().toISOString()
    };

    if (onSave) {
      onSave(fullReport);
    }

    toast.success('Report saved successfully');
  };

  const handleRun = () => {
    if (selectedMetrics.length === 0) {
      toast.error('Please select at least one metric');
      return;
    }

    const fullReport: Report = {
      id: report.id || `report_${Date.now()}`,
      name: report.name || 'Untitled Report',
      description: report.description || '',
      type: report.type || 'custom',
      metrics: selectedMetrics,
      filters: filters,
      format: report.format || 'pdf',
      createdAt: report.createdAt || new Date().toISOString()
    };

    if (onRun) {
      onRun(fullReport);
    }

    setShowPreview(true);
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Report Builder</h2>
            <p className="text-sm text-gray-600 mt-1">Create custom analytics reports</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-x">
        {/* Left Sidebar - Configuration */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Report Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Name
                </label>
                <input
                  type="text"
                  value={report.name || ''}
                  onChange={(e) => setReport({ ...report, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Monthly Analytics Report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={report.description || ''}
                  onChange={(e) => setReport({ ...report, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Brief description of the report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Export Format
                </label>
                <select
                  value={report.format || 'pdf'}
                  onChange={(e) => setReport({ ...report, format: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metrics Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Select Metrics</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(
                availableMetrics.reduce((acc, metric) => {
                  if (!acc[metric.category]) acc[metric.category] = [];
                  acc[metric.category].push(metric);
                  return acc;
                }, {} as Record<string, typeof availableMetrics>)
              ).map(([category, metrics]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">{category}</p>
                  {metrics.map(metric => (
                    <label
                      key={metric.id}
                      className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.id)}
                        onChange={() => handleMetricToggle(metric.id)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{metric.name}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={addFilter}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Filter
              </button>
            </div>
            <div className="space-y-2">
              {filters.map((filter, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={filter.field}
                    onChange={(e) => updateFilter(index, { field: e.target.value })}
                    className="flex-1 px-2 py-1 border rounded text-sm"
                  >
                    <option value="">Select field</option>
                    <option value="date">Date</option>
                    <option value="user_type">User Type</option>
                    <option value="country">Country</option>
                    <option value="device">Device</option>
                  </select>
                  <select
                    value={filter.operator}
                    onChange={(e) => updateFilter(index, { operator: e.target.value as any })}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="greater">Greater</option>
                    <option value="less">Less</option>
                  </select>
                  <input
                    type="text"
                    value={filter.value || ''}
                    onChange={(e) => updateFilter(index, { value: e.target.value })}
                    placeholder="Value"
                    className="flex-1 px-2 py-1 border rounded text-sm"
                  />
                  <button
                    onClick={() => removeFilter(index)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle - Widget Builder */}
        <div className="p-6 lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Report Layout</h3>
            <div className="flex gap-2 mb-4">
              {widgetTypes.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => addWidget(type)}
                  className="px-3 py-2 text-gray-700 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Widget Canvas */}
          <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50">
            {widgets.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <BarChart2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Add widgets to build your report</p>
                  <p className="text-sm mt-1">Click the buttons above to add charts, tables, and metrics</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4">
                {widgets.map(widget => (
                  <div
                    key={widget.id}
                    className="bg-white rounded-lg border p-4"
                    style={{
                      gridColumn: `span ${widget.position.width * 3}`,
                      gridRow: `span ${widget.position.height}`
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={widget.title}
                        onChange={(e) => updateWidget(widget.id, { title: e.target.value })}
                        className="font-medium text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
                      />
                      <button
                        onClick={() => removeWidget(widget.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Widget Preview */}
                    <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                      {widget.type === 'chart' && <LineChart className="w-8 h-8" />}
                      {widget.type === 'bar' && <BarChart2 className="w-8 h-8" />}
                      {widget.type === 'pie' && <PieChart className="w-8 h-8" />}
                      {widget.type === 'table' && <Table className="w-8 h-8" />}
                      {widget.type === 'metric' && <span className="text-2xl font-bold">123</span>}
                      {widget.type === 'list' && <List className="w-8 h-8" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Report Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                <Eye className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Report preview would render here</p>
                <p className="text-sm mt-1">With selected metrics: {selectedMetrics.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}