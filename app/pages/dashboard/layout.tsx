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

export async function loader({}: Route.LoaderArgs) {
  try {
    return await fetchUserAttributes();
  } catch (error) {
    redirect('/login');
  }
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  let submit = useSubmit();

  const handleLogout = () => {
    submit(null, { method: 'post', action: '/dashboard/logout' });
  };

  return (
    <SidebarProvider className='min-h-screen'>
      <Sidebar variant='inset'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                className='p-1.5 hover:bg-sidebar mb-4 focus-visible:bg-sidebar'
              >
                <>
                  <img
                    src='/images/bovis_schild_kleur.png'
                    alt='Logo'
                    className='h-8 w-8 object-contain'
                  />
                  <span className='text-lg font-black'>Bovis-Grafica</span>
                </>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <NavLink to='/dashboard' end>
                    {({ isActive }) => (
                      <SidebarMenuButton size='lg' isActive={isActive}>
                        <House />
                        <span>Home</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to='/dashboard/website' end>
                    {({ isActive }) => (
                      <SidebarMenuButton size='lg' isActive={isActive}>
                        <PanelTop />
                        <span>Website</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem className='flex items-center justify-between gap-6'>
              <SidebarMenuButton size='lg' className='gap-3 p-1.5'>
                <Avatar>
                  <AvatarImage src={loaderData?.picture} />
                  <AvatarFallback className='rounded-full'>
                    {loaderData?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate text-md font-bold'>
                    {loaderData?.name} {loaderData?.family_name}
                  </span>
                  <span className='truncate text-sm font-medium text-gray-200'>
                    {loaderData?.email}
                  </span>
                </div>
              </SidebarMenuButton>

              <LogOut
                className='ml-auto size-6 cursor-pointer'
                size={24}
                strokeWidth={2.5}
                onClick={handleLogout}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
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
