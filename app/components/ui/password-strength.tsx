import React from 'react';

interface PasswordStrenghtProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  minLength?: number;
  showStrength?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

const hasUppercase = (password: string) => /[A-Z]/.test(password);
const hasLowercase = (password: string) => /[a-z]/.test(password);
const hasNumber = (password: string) => /[0-9]/.test(password);
const hasSpecialChar = (password: string) =>
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

const calculatePasswordStrength = (
  password: string,
  minLength: number
): number => {
  if (!password) return 0;

  let strength = 0;

  // Base requirements
  if (password.length >= minLength) strength += 1;
  if (hasUppercase(password) && hasLowercase(password)) strength += 1;
  if (hasNumber(password)) strength += 1;
  if (hasSpecialChar(password)) strength += 1;

  return Math.min(4, strength);
};

const getStrengthLabel = (score: number): string => {
  if (score === 0) return 'Too Weak';
  if (score === 1) return 'Weak';
  if (score === 2) return 'Fair';
  if (score === 3) return 'Good';
  return 'Strong';
};

const getStrengthColor = (score: number): string => {
  if (score === 0 || score === 1) return 'bg-destructive-500';
  if (score === 2) return 'bg-orange-500';
  return 'bg-success-500';
};

const PasswordStrength = React.forwardRef<
  HTMLDivElement,
  PasswordStrenghtProps
>(
  ({
    value = '',
    minLength = 8,
    showStrength = true,
    tooltipPosition = 'top',
    ...props
  }) => {
    const strength = calculatePasswordStrength(value, minLength);
    const strengthLabel = getStrengthLabel(strength);
    return (
      <>
        <div className='w-full flex items-center gap-1'>
          {value && [...Array(4)].map((_, index) => {
            const isActive = index < strength;
            return (
              <div
                key={index}
                className={`${isActive ? getStrengthColor(strength) : 'bg-gray-200'} 
                w-full h-1 rounded-full transition-all duration-300`}
              />
            );
          })}
        </div>
        {showStrength && value && (
          <p
            className={`text-sm font-medium ${
              strength <= 1
                ? 'text-destructive-500'
                : strength === 2
                  ? 'text-orange-500'
                  : 'text-success-500'
            }`}
          >
            Password Strength: {strengthLabel}
          </p>
        )}
      </>
    );
  }
);

export { PasswordStrength };
export type { PasswordStrenghtProps };
