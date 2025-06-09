import { useSidebar } from './../../context/SidebarContext';
import { ChevronLeft, ChevronRight, Home, Settings, Users, FileText, BarChart2,PcCase,ArchiveRestore,Ticket } from 'lucide-react';
import { cn } from './../../lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { icon: Home, title: 'Dashboard', path: '/' },
  { icon: Ticket, title: 'Support Tickets', path: '/support' },
  { icon: ArchiveRestore, title: 'RMA', path: '/rma' },
  { icon: PcCase, title: 'Devices', path: '/devices' },
  { icon: Settings, title: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 ">
        <h1 className='text-2xl font-bold'>IT Tools</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-white hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-lg",
                  "hover:bg-slate-800 transition-colors",
                  location.pathname === item.path ? "bg-slate-800" : "bg-transparent",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}