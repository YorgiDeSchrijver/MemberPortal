import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/home.tsx'),
  route('/login', 'pages/auth/login.tsx'),
  route('/signup', 'pages/auth/signup.tsx'),
  route('/forgot-password', 'pages/auth/forgot-password.tsx'),
  route('/confirm-signup', 'pages/auth/confirm-signup.tsx'),
  route('/dashboard', 'pages/dashboard/dashboard.tsx'),
] satisfies RouteConfig;
