import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { House, LogOut, PanelTop } from 'lucide-react';
import { Navigate, NavLink, Outlet, redirect, useSubmit } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from '~/components/ui/sidebar';
import type { Route } from './+types/layout';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import AppSidebar from '~/components/dashboard/app-sidebar';

export async function loader({}: Route.LoaderArgs) {
  try {
    return await fetchUserAttributes();
  } catch (error) {
    redirect('/login');
  }
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  

  return (
    <SidebarProvider className='min-h-screen'>
      <AppSidebar {...loaderData} />
      <SidebarInset>
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 px-4 py-8 md:gap-6 md:p-8'>
              {loaderData?.email ? <Outlet /> : <Navigate to='/login' />}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
