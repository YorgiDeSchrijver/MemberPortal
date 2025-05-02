import { ChevronRight, Globe, House, LogOut, PanelTop } from 'lucide-react';
import { Link, NavLink, useSubmit } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from '~/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import type { FetchUserAttributesOutput } from 'aws-amplify/auth';
import { Collapsible } from '@radix-ui/react-collapsible';
import { CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

export default function AppSidebar(user: FetchUserAttributesOutput) {
  let submit = useSubmit();

  const handleLogout = () => {
    submit(null, { method: 'post', action: '/dashboard/logout' });
  };
  return (
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
                    <SidebarMenuButton  isActive={isActive}>
                      <House />
                      <span>Home</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible
              asChild
              defaultOpen={false}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Globe />
                    <span>Website</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <NavLink to='/dashboard/praesidium' end>
                        {({ isActive }) => (
                          <SidebarMenuSubButton isActive={isActive}>
                            <span>Praesidium</span>
                          </SidebarMenuSubButton>
                        )}
                      </NavLink>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <NavLink to='/dashboard/sponsors' end>
                        {({ isActive }) => (
                          <SidebarMenuSubButton isActive={isActive}>
                            <span>Sponsers</span>
                          </SidebarMenuSubButton>
                        )}
                      </NavLink>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center justify-between gap-6'>
            <SidebarMenuButton size='lg' className='gap-3 p-1.5'>
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback className='rounded-full'>
                  {user?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate text-md font-bold'>
                  {user?.name} {user?.family_name}
                </span>
                <span className='truncate text-sm font-medium text-gray-200'>
                  {user?.email}
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
  );
}
