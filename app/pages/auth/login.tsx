import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { EyeOff, Lock, LogIn, User2 } from 'lucide-react';
import { Form as FormRouter, redirect } from 'react-router';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

import { Button } from '~/components/ui/button';
import { Link, useNavigation } from 'react-router';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Spinner } from '~/components/ui/spinner';
import type { Route } from './+types/login';
import { getCurrentUser, signIn, signInWithRedirect } from 'aws-amplify/auth';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function loader({}: Route.LoaderArgs) {
  try {
    const { userId } = await getCurrentUser();
    return redirect('/dashboard');
  } catch (error) {
    redirect('/login');
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const form = useForm<z.infer<typeof FormSchema>>({
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
          Welcome Back.
        </h1>
        <p className='text-paragraph-md text-gray-600 mb-10'>
          Let's sign in to your account and get started.
        </p>
        {actionData?.error && (
          <Alert variant='destructive' className='mb-4'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{actionData.error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <FormRouter
            method='post'
            className='w-full flex flex-col gap-6'
            suppressHydrationWarning={true}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Email Address'
                      startAdornment={<User2 />}
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
                    <Input
                      placeholder='Password'
                      type='password'
                      startAdornment={<Lock />}
                      endAdornment={<EyeOff />}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Link
              to='/forgot-password'
              className='text-sm text-brand-600 font-bold text-right -mt-3'
            >
              Forgot Password
            </Link>

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
                  <span>Sign in</span>
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
              Sign in With Google
            </Button>
            <span className='text-sm font-bold text-gray-800 text-center'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-brand-600'>
                Sign Up
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
    const { nextStep } = await signIn({ username: email, password });
    if (nextStep.signInStep === 'DONE') {
      redirect('/dashboard');
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues[0].message,
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        error: 'An unexpected error occurred.',
      };
    }
  }
  return {
    error: null,
  } as any;
}
