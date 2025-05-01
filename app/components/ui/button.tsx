import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-all rounded-full cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none',
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        outline: '',
        link: '',
      },
      size: {
        xs: 'py-1 px-2.5 gap-1.5 text-xs font-semibold [&>svg]:size-4',
        sm: 'py-1.5 px-3 gap-2 text-sm font-bold [&>svg]:size-4',
        default: 'px-4 py-2.5 gap-2 text-sm font-bold [&>svg]:size-5',
        lg: 'px-5 py-3 gap-2.5 text-md font-bold [&>svg]:size-5',
        xl: 'px-6 py-4 gap-3 text-lg font-bold [&>svg]:size-6',
      },
      color: {
        gray: 'disabled:text-primary-300 focus-visible:ring-4 focus-visible:ring-primary-600/25',
        default:
          'disabled:text-brand-300 focus-visible:ring-4 focus-visible:ring-brand-600/25',
        destructive:
          'disabled:text-destructive-300 focus-visible:ring-4 focus-visible:ring-destructive-600/25',
      },
    },
    compoundVariants: [
      // Gray variants
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
        class: 'text-primary-600 hover:text-primary-800',
      },

      // Default (Brand) variants
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
        class: 'text-brand-600 hover:text-brand-700',
      },

      // Destructive variants
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
        class: 'text-destructive-500 hover:text-destructive-600',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, color, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
