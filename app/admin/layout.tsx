'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import '@/app/globals.css';

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/products', label: 'Products' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { user, loading } = useAuth();

  // If on the login page, render only the login form (no sidebar/navbar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If still loading auth state, show nothing or a loader
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not logged in or not admin, redirect to login page
  if (!user || !user.isAdmin) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <aside className={`transition-all duration-200 ${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col gap-4`}>
        {/* Logo at the top of the sidebar */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/admin" aria-label="Admin Dashboard">
            <Image
              src="/logo.png"
              alt="EasyKart Logo"
              width={sidebarOpen ? 120 : 40}
              height={sidebarOpen ? 40 : 40}
              className="transition-all duration-200 object-contain"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl font-bold transition-all duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Admin Panel</h2>
          <button
            aria-label="Toggle sidebar"
            className="text-xl focus:outline-none"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? '⏴' : '⏵'}
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-3 py-2 transition-colors ${pathname === link.href ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {sidebarOpen ? link.label : link.label[0]}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <button
            className="rounded px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => setDarkMode((v) => !v)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">A</div>
            {sidebarOpen && <span className="font-semibold">Admin</span>}
            {/* Profile dropdown can be added here */}
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
