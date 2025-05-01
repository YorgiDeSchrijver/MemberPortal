import * as React from 'react';

import { cn } from '~/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  tooltip?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      startAdornment,
      endAdornment,
      tooltip,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative w-full flex items-center'>
        {startAdornment && (
          <div className='absolute left-3 flex items-center pointer-events-none text-gray-600 size-5 disabled:text-gray-300'>
            {startAdornment}
          </div>
        )}

        <input
          type={type}
          ref={ref}
          data-slot='input'
          className={cn(
            'w-full rounded-full text-gray-600 text-md font-medium border border-gray-300 bg-white h-12 placeholder:text-md placeholder:text-gray-600 placeholder:font-medium hover:border-gray-400 [&:not(:placeholder-shown)]:border-gray-600 focus-visible:ring-4 focus-visible:ring-brand-600/25 focus-visible:border-brand-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-300 disabled:focus:ring-0 disabled:focus:border-gray-300 invalid:border-destructive-500',
            startAdornment && 'pl-10',
            endAdornment && 'pr-10',
            className
          )}
          {...props}
        />
        <div className='absolute right-3 flex items-center size-5 text-gray-300 '>
          {endAdornment}
        </div>
      </div>
    );
  }
);

export { Input };
export type { InputProps };
