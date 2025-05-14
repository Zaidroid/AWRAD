
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Users,
  Settings,
  LogOut,
  ImageIcon
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard className="mr-3 h-5 w-5" /> 
    },
    { 
      name: 'Publications', 
      path: '/admin/publications', 
      icon: <FileText className="mr-3 h-5 w-5" /> 
    },
    { 
      name: 'Research', 
      path: '/admin/research', 
      icon: <BarChart2 className="mr-3 h-5 w-5" /> 
    },
    { 
      name: 'Media', 
      path: '/admin/media', 
      icon: <ImageIcon className="mr-3 h-5 w-5" /> 
    },
    { 
      name: 'Team', 
      path: '/admin/team', 
      icon: <Users className="mr-3 h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="mr-3 h-5 w-5" /> 
    }
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="w-64 bg-awrad-blue text-white flex-shrink-0 h-screen sticky top-0">
      <div className="p-4 text-xl font-bold border-b border-white/20 flex items-center">
        <img 
          src="/lovable-uploads/48e6b7fb-a2b2-4aa7-ba87-8c575bbe0b92.png" 
          alt="AWRAD Logo" 
          className="h-8 mr-2 brightness-200"
        />
        <span>Admin</span>
      </div>
      <nav className="py-6 flex flex-col h-[calc(100%-64px)] justify-between">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center px-4 py-3 text-white ${
                  isActive(item.path) 
                    ? 'bg-awrad-darkred' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Link 
            to="/logout" 
            className="flex items-center px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white border-t border-white/10"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
