import AppSidebar from '@/Components/Sidebar/AppSidebar';
import { SidebarProvider } from '@/Components/Sidebar/SidebarContext';
import AppHeader from '@/components/layout/AppHeader';


export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader
           />
          <main className="p-4 bg-gray-50 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
