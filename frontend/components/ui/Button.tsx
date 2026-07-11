import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#F2784B] text-white hover:bg-[#D9633A] focus:ring-[#F2784B]/40 shadow-[0_2px_0_#D9633A,0_8px_18px_-8px_rgba(242,120,75,0.5)]',
        secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        minimal: 'bg-transparent text-primary hover:text-primary-dark underline-offset-4 hover:underline'
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
      },
      fullWidth: {
        true: 'w-full',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, href, children, className, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className);
    
    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    
    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';