import Footer from '@/Components/Layout/AppFooter';
import AppHeader from '@/Components/Layout/AppHeader';
import AppSidebar from '@/Components/Sidebar/AdminSidebar';
import { SidebarProvider, useSidebar } from '@/Components/Sidebar/SidebarContext';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function LayoutContent({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const {auth}=usePage().props;
  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      setPageReady(false);
    };

    document.addEventListener('inertia:start', start);
    return () => document.removeEventListener('inertia:start', start);
  }, []);

  useEffect(() => {
    if (pageReady) {
      setLoading(false);
    }
  }, [pageReady]);

  return (
    <div className="flex h-screen relative">
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

        {/* Loader overlay */}
        {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="loader">
                <span> </span>
                <span> </span>
                <span> </span>
            </div> {/* nanti bisa ganti loader keren */}
        </div>
        )}
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
