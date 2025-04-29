import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import {
  AlertTriangle,
  CircleAlert,
  CircleHelp,
  Info,
  type LucideIcon,
} from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-2xl border px-4 py-3 text-md font-extrabold grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-0.5 items-start [&>svg]:size-5 *:data-[slot=alert-description]:text-sm *:data-[slot=alert-description]:font-semibold *:data-[slot=alert-description]:text-gray-100 dark:*:data-[slot=alert-description]:text-gray-600 dark:text-brand-800',
  {
    variants: {
      variant: {
        gray: 'bg-gray-800 text-white border border-gray-600 [&>svg]:stroke-gray-300 dark:bg-gray-50 dark:border-gray-200 dark:[&>svg]:stroke-gray-600',
        default:
          'bg-brand-600 text-white border border-brand-200 [&>svg]:stroke-white dark:bg-brand-50 dark:border-brand-200 dark:[&>svg]:stroke-brand-600',
        destructive:
          'bg-destructive-500 text-white border border-destructive-300 [&>svg]:stroke-white dark:bg-destructive-50 dark:border-destructive-200 dark:[&>svg]:stroke-destructive-500',
        success:
          'bg-success-500 text-white border border-success-200 [&>svg]:stroke-white dark:bg-success-50 dark:border-success-200 dark:[&>svg]:stroke-success-500',
        warning:
          'bg-warning-500 text-white border border-warning-300 [&>svg]:stroke-white dark:bg-warning-50 dark:border-warning-200 dark:[&>svg]:stroke-warning-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot='alert'
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <AlertTriangle data-slot='alert-icon' />
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn(
        'col-start-2 line-clamp-1 text-md font-extrabold',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn(
        'col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
