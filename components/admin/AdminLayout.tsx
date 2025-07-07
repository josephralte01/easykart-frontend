'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Menu,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
];

// Dynamically import AdminLayout's heavy children (example: dashboard widgets)
const DashboardWidgets = dynamic(() => import('@/components/admin/DashboardWidgets'), { ssr: false, loading: () => <div>Loading widgets...</div> });

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  const Sidebar = ({ mobile = false }) => (
    <div className={cn("flex flex-col h-full", mobile ? "w-full" : "w-64")}>
      <div className="flex items-center h-16 px-4 border-b">
        <Image
          src="/logo.png"
          alt="EasyKart"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <span className="ml-2 text-lg font-bold">
          Easy<span className="text-primary">Kart</span> Admin
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="EasyKart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="ml-2 font-bold">
              Easy<span className="text-primary">Kart</span>
            </span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Dynamically loaded widgets for dashboard page only */}
          {pathname === '/admin' && <DashboardWidgets />}
          {children}
        </main>
      </div>
    </div>
  );
}