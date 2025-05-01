import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/home.tsx'),
  route('/login', 'pages/auth/login.tsx'),
  route('/dashboard', 'pages/dashboard/dashboard.tsx'),
  route('*', 'pages/404.tsx'),
] satisfies RouteConfig;
