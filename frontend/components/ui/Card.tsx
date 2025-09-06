import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'small' | 'normal' | 'large';
  className?: string;
}

export function Card({ 
  children, 
  hoverable = false,
  padding = 'normal',
  className = ''
}: CardProps) {
  const paddings = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };
  
  return (
    <div className={cn(
      'bg-white rounded-xl border border-gray-100',
      paddings[padding],
      hoverable && 'transition-all duration-200 hover:shadow-large hover:-translate-y-1 cursor-pointer',
      !hoverable && 'shadow-soft',
      className
    )}>
      {children}
    </div>
  );
}