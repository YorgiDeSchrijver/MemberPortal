import { SidebarTrigger, useSidebar } from '../ui/sidebar';

export default function AppMobileHeader() {
  const { isMobile } = useSidebar();
  return (
    <header
      className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-50 border-b border-gray-200'
      hidden={!isMobile}
    >
      <div className='flex items-center justify-between w-full gap-2 px-4'>
        <div className='flex items-center gap-2'>
          <img
            src='/images/bovis_schild_kleur.png'
            alt='Logo'
            className='h-8 w-8 object-contain'
          />
          <span className='text-heading-xs font-extrabold text-gray-800'>
            Bovis-Grafica
          </span>
        </div>
        <SidebarTrigger className='pr-0'/>
      </div>
    </header>
  );
}
