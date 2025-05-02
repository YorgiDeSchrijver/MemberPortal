import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from '@react-router/dev/routes';

export default [
  index('pages/home.tsx'),
  route('login', 'pages/auth/login.tsx'),
  ...prefix('dashboard', [
    layout('pages/dashboard/layout.tsx', [
      index('pages/dashboard/dashboard.tsx'),
      route('logout', 'pages/dashboard/logout.tsx'),
      route('website', 'pages/dashboard/website.tsx'),
    ]),
  ]),
  route('*', 'pages/404.tsx'),
] satisfies RouteConfig;
