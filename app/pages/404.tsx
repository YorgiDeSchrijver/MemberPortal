import { ChevronLeft, House } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='text-center max-w-3xl'>
        <h1 className='text-heading-xs font-bold text-brand-600 mb-6'>
          404 Error
        </h1>
        <p className='text-heading-2xl font-extrabold text-gray-800 mb-8'>
          Oops! We Can't Find That Page.
        </p>
        <p className='text-paragraph-xl text-gray-600 mb-12'>
          Unfortunately, the page you're looking for is gone or has been moved
          :(.
        </p>
        <div className='flex gap-3 justify-center'>
          <Button
            variant='outline'
            color='gray'
            size='xl'
            onClick={() => window.history.back()}
          >
            <ChevronLeft />
            Go Back
          </Button>
          <Link to='/'>
            <Button size='xl'>
              Take Me Home
              <House />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
