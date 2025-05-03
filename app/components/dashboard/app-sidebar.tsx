import {
  ChevronRight,
  ChevronUp,
  Globe,
  House,
  LogOut,
  PanelTop,
  Settings,
} from 'lucide-react';
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
import { IconButton } from '../ui/icon-button';

export default function AppSidebar(user: FetchUserAttributesOutput) {
  let submit = useSubmit();

  const handleLogout = async () => {
    await submit(null, { method: 'post', action: '/dashboard/logout' });
  };
  return (
    <Sidebar variant='inset'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='px-6 py-8 flex items-center gap-2'>
              <img
                src='/images/bovis_schild_kleur.png'
                alt='Logo'
                className='h-8 w-8 object-contain'
              />
              <span className='text-heading-xs font-extrabold text-gray-800'>
                Bovis-Grafica
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className='bg-gray-200 mx-6'/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='mt-4'>
              <SidebarMenuItem>
                <NavLink to='/dashboard' end>
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
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
              defaultOpen={true}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Globe />
                    <span>Website</span>
                    <ChevronUp className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 stroke-gray-400' />
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
                            <span>
                              Sponsors
                            </span>
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
        <SidebarSeparator className='bg-gray-200 mx-6' />
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center px-6 py-5 gap-3'>
            <Avatar>
              <AvatarImage src={user?.picture} />
              <AvatarFallback className='rounded-full'>
                {user?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left'>
              <span className='truncate text-base font-bold text-gray-800'>
                {user?.name} {user?.family_name}
              </span>
              <span className='truncate text-paragraph-md font-medium text-gray-600'>
                {user?.email}
              </span>
            </div>
            <div className='flex gap-2'>
              <IconButton variant="outline" color='gray' onClick={handleLogout}><LogOut /></IconButton>
              <IconButton variant="outline" color='gray'><Settings /></IconButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
