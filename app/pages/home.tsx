import { redirect, type LoaderFunctionArgs } from 'react-router';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return redirect('/login');
}

export default function Home() {
  return <div></div>;
}
