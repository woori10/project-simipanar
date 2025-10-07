import AppHeader from '@/Components/Layout/AppHeader';
import AppSidebar from '@/Components/Sidebar/AppSidebar';
import { SidebarProvider, useSidebar } from '@/Components/Sidebar/SidebarContext';
import { usePage } from '@inertiajs/react';

function LayoutContent({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const {auth}=usePage().props;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Wrapper konten */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isExpanded || isHovered || isMobileOpen ? "lg:ml-[290px]" : "lg:ml-[90px]"}
          ml-0  // default buat mobile
        `}
      >
        <AppHeader user={auth.user} />

        <main className="p-8 bg-gray-50 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
