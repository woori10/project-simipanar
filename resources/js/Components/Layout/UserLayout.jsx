import Footer from '@/Components/Layout/AppFooter';
import AppHeader from '@/Components/Layout/AppHeader';
import { SidebarProvider, useSidebar } from '@/Components/Sidebar/SidebarContext';
import AppSidebar from '@/Components/Sidebar/UserSidebar';
import { usePage } from '@inertiajs/react';

function LayoutContent({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const {auth}=usePage().props;


  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <AppSidebar />

        {/* Wrapper konten */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300
            ${isExpanded || isHovered || isMobileOpen ? "lg:ml-[290px]" : "lg:ml-[90px]"}
            ml-0
          `}
        >
          <AppHeader user={auth.user} />

        <main className="p-8 bg-gray-50 flex-1 flex flex-col overflow-y-auto">
            {children}

            <Footer />
        </main>
        </div>
      </div>

      {/* Footer di bawah */}

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
