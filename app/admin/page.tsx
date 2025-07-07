'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useErrorToast } from '@/contexts/ErrorToastContext';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import DashboardWidgets from '@/components/admin/DashboardWidgets';

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { showError } = useErrorToast();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/admin/login');
      return;
    }
    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      showError('Error fetching stats.');
    } finally {
      setLoading(false);
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

  // Placeholder stats, replace with real API calls
  const analyticsStats = [
    { label: 'Total Users', value: 1200 },
    { label: 'Total Orders', value: 3400 },
    { label: 'Revenue', value: '₹2,50,000' },
    { label: 'Pending Orders', value: 23 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <LoadingSkeleton className="w-16 h-8" /> : stats.totalUsers}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <LoadingSkeleton className="w-16 h-8" /> : stats.totalProducts}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <LoadingSkeleton className="w-16 h-8" /> : stats.totalOrders}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{loading ? <LoadingSkeleton className="w-20 h-8" /> : stats.totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <DashboardWidgets />
      </div>
    </AdminLayout>
  );
}