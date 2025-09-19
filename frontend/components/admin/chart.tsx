'use client';

import { useEffect, useRef } from 'react';

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'area' | 'multi-line';
  data: any[];
  dataKey?: string;
  dataKeys?: string[];
  xAxisKey?: string;
  nameKey?: string;
  color?: string;
  colors?: string[];
  height?: number;
  formatter?: (value: any) => string;
  horizontal?: boolean;
}

export default function Chart({
  type,
  data,
  dataKey,
  dataKeys,
  xAxisKey,
  nameKey,
  color = '#3b82f6',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  height = 250,
  formatter,
  horizontal = false,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = height;

    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    if (type === 'pie') {
      drawPieChart(ctx, data, chartWidth, chartHeight, padding);
    } else if (type === 'line' || type === 'area') {
      drawLineChart(ctx, data, chartWidth, chartHeight, padding, type === 'area');
    } else if (type === 'bar') {
      drawBarChart(ctx, data, chartWidth, chartHeight, padding);
    } else if (type === 'multi-line' && dataKeys) {
      drawMultiLineChart(ctx, data, chartWidth, chartHeight, padding);
    }
  }, [data, type, dataKey, xAxisKey, color, height]);

  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    data: any[],
    width: number,
    height: number,
    padding: number
  ) => {
    const centerX = width / 2 + padding;
    const centerY = height / 2 + padding;
    const radius = Math.min(width, height) / 2 - 20;

    const total = data.reduce((sum, item) => sum + (item[dataKey || 'value'] || 0), 0);
    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const value = item[dataKey || 'value'] || 0;
      const angle = (value / total) * 2 * Math.PI;

      // Draw pie slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      // Draw label
      const labelAngle = currentAngle + angle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = 'white';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX, labelY);

      currentAngle += angle;
    });

    // Draw legend
    ctx.font = '11px sans-serif';
    let legendY = padding;
    data.forEach((item, index) => {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(width + padding - 100, legendY, 10, 10);
      ctx.fillStyle = '#4b5563';
      ctx.textAlign = 'left';
      ctx.fillText(item[nameKey || 'name'] || '', width + padding - 85, legendY + 8);
      legendY += 20;
    });
  };

  const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    data: any[],
    width: number,
    height: number,
    padding: number,
    fill: boolean = false
  ) => {
    if (!dataKey || !xAxisKey) return;

    const values = data.map(item => item[dataKey] || 0);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const valueRange = maxValue - minValue;

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    for (let i = 0; i <= 4; i++) {
      const y = padding + (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width + padding, y);
      ctx.stroke();
    }

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const points: Array<{ x: number; y: number }> = [];

    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * width;
      const value = item[dataKey] || 0;
      const y = padding + height - ((value - minValue) / valueRange) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      points.push({ x, y });
    });

    ctx.stroke();

    // Fill area if requested
    if (fill) {
      ctx.lineTo(width + padding, height + padding);
      ctx.lineTo(padding, height + padding);
      ctx.closePath();
      ctx.fillStyle = color + '20';
      ctx.fill();
    }

    // Draw points
    ctx.fillStyle = color;
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    data.forEach((item, index) => {
      if (index % Math.ceil(data.length / 6) === 0) {
        const x = padding + (index / (data.length - 1)) * width;
        ctx.fillText(item[xAxisKey] || '', x, height + padding + 20);
      }
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const value = minValue + (valueRange / 4) * (4 - i);
      const y = padding + (height / 4) * i;
      const label = formatter ? formatter(value) : value.toFixed(0);
      ctx.fillText(label, padding - 10, y + 3);
    }
  };

  const drawBarChart = (
    ctx: CanvasRenderingContext2D,
    data: any[],
    width: number,
    height: number,
    padding: number
  ) => {
    if (!dataKey) return;

    const values = data.map(item => item[dataKey] || 0);
    const maxValue = Math.max(...values);
    const barWidth = width / data.length * 0.7;
    const gap = width / data.length * 0.3;

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.stroke();

    // Draw bars
    data.forEach((item, index) => {
      const value = item[dataKey] || 0;
      const barHeight = (value / maxValue) * height;
      const x = padding + index * (barWidth + gap) + gap / 2;
      const y = padding + height - barHeight;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top
      ctx.fillStyle = '#4b5563';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        formatter ? formatter(value) : value.toString(),
        x + barWidth / 2,
        y - 5
      );

      // Draw label
      if (xAxisKey) {
        ctx.save();
        ctx.translate(x + barWidth / 2, height + padding + 10);
        ctx.rotate(-Math.PI / 6);
        ctx.textAlign = 'right';
        ctx.fillText(item[xAxisKey] || '', 0, 0);
        ctx.restore();
      }
    });
  };

  const drawMultiLineChart = (
    ctx: CanvasRenderingContext2D,
    data: any[],
    width: number,
    height: number,
    padding: number
  ) => {
    if (!dataKeys || !xAxisKey) return;

    // Find max value across all data keys
    let maxValue = 0;
    let minValue = Infinity;
    dataKeys.forEach(key => {
      data.forEach(item => {
        const value = item[key] || 0;
        maxValue = Math.max(maxValue, value);
        minValue = Math.min(minValue, value);
      });
    });

    const valueRange = maxValue - minValue;

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.stroke();

    // Draw each line
    dataKeys.forEach((key, keyIndex) => {
      ctx.strokeStyle = colors[keyIndex % colors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((item, index) => {
        const x = padding + (index / (data.length - 1)) * width;
        const value = item[key] || 0;
        const y = padding + height - ((value - minValue) / valueRange) * height;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    });

    // Draw legend
    ctx.font = '11px sans-serif';
    let legendX = width + padding - 100;
    dataKeys.forEach((key, index) => {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(legendX, padding + index * 20, 10, 10);
      ctx.fillStyle = '#4b5563';
      ctx.textAlign = 'left';
      ctx.fillText(key, legendX + 15, padding + index * 20 + 8);
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: `${height}px` }}
    />
  );
}