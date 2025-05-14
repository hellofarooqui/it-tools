import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/custom/Sidebar';
import { SidebarProvider } from '../context/SidebarContext';

export function RootLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}