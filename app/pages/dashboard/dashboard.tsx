import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Form, redirect } from 'react-router';
import type { Route } from '../+types/dashboard';
import { Button } from '~/components/ui/button';

export async function loader({}: Route.LoaderArgs) {
  try {
    const { userId } = await getCurrentUser();
    return { userId };
  } catch (error) {
    redirect('/login');
  }
}

export default function DashboardIndex({ loaderData }: Route.ComponentProps) {
  return (
    <div className='text-black'>
      {loaderData.userId}{' '}
      <div>
        <Form method='post'>
          <Button type='submit'>Loggout</Button>
        </Form>
      </div>
    </div>
  );
}

export async function action({}: Route.ActionArgs) {
    try {
        await signOut();
        return redirect('/login');
    } catch (error) {
        console.error('Error signing out:', error);
        return redirect('/dashboard');
    }
}