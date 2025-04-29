import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeOff, LogIn, Lock, User2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form as FormRouter,
  Link,
  redirect,
  useNavigation,
} from 'react-router';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { signUp } from 'aws-amplify/auth';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Spinner } from '~/components/ui/spinner';
import { PasswordStrength } from '~/components/ui/password-strength';
import type { Route } from './+types/signup';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'Password must contain at least one special character'
    ),
});

export default function SignUp({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className='flex h-screen w-screen'>
      <div className='w-1/2 flex items-center justify-center flex-col max-w-md mx-auto max-h-screen'>
        <img
          src='/images/bovis_schild_kleur.png'
          alt=''
          className='w-12 pb-6'
        />
        <h1 className='text-heading-sm font-extrabold text-gray-800'>
          Let's Create Your Account.
        </h1>
        <p className='text-paragraph-md text-gray-600 mb-10'>
          Sign up for an account to become a member.
        </p>
        {actionData?.error && (
          <Alert variant='destructive' className='mb-4'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{actionData.error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <FormRouter method='post' className='w-full flex flex-col gap-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Email Address'
                      startAdornment={<Mail />}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder='Password'
                        type='password'
                        startAdornment={<Lock />}
                        endAdornment={<EyeOff />}
                        {...field}
                      />
                      <PasswordStrength value={field.value} showStrength />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className='w-full mt-2 text-md'
              variant='default'
              color='default'
              size='lg'
              type='submit'
            >
              {isSubmitting ? (
                <Spinner />
              ) : (
                <>
                  <span>Sign Up</span>
                  <LogIn />
                </>
              )}
            </Button>
            <Button
              className='w-full text-md -mt-3'
              variant='outline'
              color='gray'
              size='lg'
            >
              Sign Up With Google
            </Button>
            <span className='text-sm font-bold text-gray-800 text-center'>
              Don't have an account?{' '}
              <Link to='/login' className='text-brand-600'>
                Sign In.
              </Link>
            </span>
          </FormRouter>
        </Form>
      </div>
      <img src='/images/login_1.jpg' className='w-1/2 bg-black object-cover' />
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const payload = Object.fromEntries(await request.formData());
  try {
    const schema = FormSchema.parse(payload);
    const { email, password } = schema;
    const { nextStep, userId } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
    if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      return redirect('/confirm-signup');
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0].message,
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        error: `An unexpected error occurred. Please try again. ${error}`,
      };
    }
  }
  return {
    error: null,
  } as any;
}
