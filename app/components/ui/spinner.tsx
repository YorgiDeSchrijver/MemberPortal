import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';

const SpinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
      xl: 'size-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const Spinner = ({
  size,
  className,
  ...props
}: React.ComponentProps<'svg'> & VariantProps<typeof SpinnerVariants>) => {
  return (
    <Loader2
      data-slot='loader'
      className={cn(SpinnerVariants({ size }), className)}
      {...props}
    />
  );
};

export { Spinner };
