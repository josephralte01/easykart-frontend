import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import { api } from '@/lib/api';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default function DashboardWidgets() {
  const [salesTrends, setSalesTrends] = useState<any[]>([]);
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [salesRes, userRes, topRes] = await Promise.all([
          api.get('/admin/sales-trends'),
          api.get('/admin/user-growth'),
          api.get('/admin/top-products'),
        ]);
        setSalesTrends(salesRes.data);
        setUserGrowth(userRes.data);
        setTopProducts(topRes.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="font-bold mb-2">Sales Trends</h3>
        {loading ? <LoadingSkeleton className="h-48 w-full" /> : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#8884d8" name="Revenue" />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="font-bold mb-2">User Growth</h3>
        {loading ? <LoadingSkeleton className="h-48 w-full" /> : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userGrowth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Users" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 md:col-span-2">
        <h3 className="font-bold mb-2">Top Products</h3>
        {loading ? <LoadingSkeleton className="h-48 w-full" /> : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSold" fill="#8884d8" name="Units Sold" />
              <Bar dataKey="totalRevenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
