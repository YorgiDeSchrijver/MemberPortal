import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full inline-flex whitespace-nowrap shrink-0 transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        outline: '',
        link: '',
      },
      size: {
        default: 'px-2.5 py-1 gap-1.5 text-sm font-semibold [&>svg]:size-4',
        sm: 'px-2 py-1 gap-1 text-xs font-semibold [&>svg]:size-3',
        lg: 'px-3 py-1.5 gap-2 text-sm font-semibold [&>svg]:size-4',
      },
      color: {
        gray: 'disabled:text-primary-300 ',
        default:
          'disabled:text-brand-300',
        destructive:
          'disabled:text-destructive-300',
        success:
          'disabled:text-success-300',
        warning:
          'disabled:text-warning-300',
      },
    },
    compoundVariants: [
      {
        color: 'gray',
        variant: 'default',
        class:
          'bg-primary-800 text-white hover:bg-primary-600 disabled:bg-primary-100',
      },
      {
        color: 'gray',
        variant: 'secondary',
        class:
          'bg-primary-50 text-primary-600 hover:bg-primary-100 disbled:bg-primary-50',
      },
      {
        color: 'gray',
        variant: 'outline',
        class:
          'border border-primary-300 bg-transparent text-primary-600 hover:bg-primary-50 hover:border-primary-600',
      },
      {
        color: 'gray',
        variant: 'link',
        class: 'text-primary-600 hover:text-primary-800 hover:bg-primary-50',
      },
      {
        color: 'default',
        variant: 'default',
        class:
          'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-100',
      },
      {
        color: 'default',
        variant: 'secondary',
        class:
          'bg-brand-50 text-brand-600 hover:bg-brand-100 disabled:bg-brand-50',
      },
      {
        color: 'default',
        variant: 'outline',
        class:
          'border border-brand-600 bg-transparent text-brand-600 hover:bg-brand-50 disbaled:border-brand-300',
      },
      {
        color: 'default',
        variant: 'link',
        class: 'text-brand-600 hover:text-brand-700 hover:bg-brand-50',
      },
      {
        color: 'destructive',
        variant: 'default',
        class:
          'bg-destructive-500 text-white hover:bg-destructive-600 disabled:bg-destructive-100',
      },
      {
        color: 'destructive',
        variant: 'secondary',
        class:
          'bg-destructive-50 text-destructive-500 hover:bg-destructive-100 disabled:bg-destructive-50',
      },
      {
        color: 'destructive',
        variant: 'outline',
        class:
          'border border-destructive-500 bg-transparent text-destructive-500 hover:bg-destructive-50 disabled:border-destructive-300',
      },
      {
        color: 'destructive',
        variant: 'link',
        class:
          'text-destructive-500 hover:text-destructive-600 hover:bg-destructive-50',
      },
      {
        color: 'success',
        variant: 'default',
        class:
          'bg-success-500 text-white hover:bg-success-600 disabled:bg-success-100',
      },
      {
        color: 'success',
        variant: 'secondary',
        class:
          'bg-success-50 text-success-500 hover:bg-success-100 disabled:bg-success-50',
      },
      {
        color: 'success',
        variant: 'outline',
        class:
          'border border-success-500 bg-transparent text-success-500 hover:bg-success-50 disabled:border-success-300',
      },
      {
        color: 'success',
        variant: 'link',
        class: 'text-success-500 hover:text-success-600 hover:bg-success-50',
      },

      {
        color: 'warning',
        variant: 'default',
        class:
          'bg-warning-500 text-white hover:bg-warning-600 disabled:bg-warning-100',
      },
      {
        color: 'warning',
        variant: 'secondary',
        class:
          'bg-warning-50 text-warning-500 hover:bg-warning-100 disabled:bg-warning-50',
      },
      {
        color: 'warning',
        variant: 'outline',
        class:
          'border border-warning-500 bg-transparent text-warning-500 hover:bg-warning-50 disabled:border-warning-300',
      },
      {
        color: 'warning',
        variant: 'link',
        class: 'text-warning-500 hover:text-warning-600 hover:bg-warning-50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  color,
  size,
  disabled = false,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean, disabled?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      data-disabled={disabled ? '' : undefined}
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
