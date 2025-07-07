'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import ExportOrders from './export';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useErrorToast } from '@/contexts/ErrorToastContext';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

interface Order {
  _id: string;
  user: { name: string; email: string };
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { showError } = useErrorToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      });
  }, []);

  const handleStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete order');
      setOrders((prev) => prev.filter(o => o._id !== id));
      toast.success('Order deleted successfully');
    } catch (err: any) {
      setError(err.message || 'Error deleting order');
      showError(err.message || 'Error deleting order');
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === orders.length) setSelected([]);
    else setSelected(orders.map(o => o._id));
  };

  const handleBulkDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/orders/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected }),
      });
      if (!res.ok) throw new Error('Failed to delete orders');
      setOrders((prev) => prev.filter(o => !selected.includes(o._id)));
      setSelected([]);
      toast.success('Selected orders deleted');
    } catch (err: any) {
      setError(err.message || 'Error deleting orders');
      showError(err.message || 'Error deleting orders');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div role="status" aria-busy="true" className="p-8"><span>Loading orders...</span></div>;
  if (error) return <div role="alert" className="text-red-600 p-4">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" tabIndex={0}>Orders</h1>
      <div className="mb-4">
        <ExportOrders />
      </div>
      {selected.length > 0 && (
        <div className="mb-4 flex gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleBulkDelete} disabled={deleting}>Delete Selected</button>
          <span className="ml-2">{selected.length} selected</span>
        </div>
      )}
      <div className="grid gap-4" role="list">
        <Card className="p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <Checkbox checked={selected.length === orders.length && orders.length > 0} onCheckedChange={handleSelectAll} aria-label="Select all orders" />
            <span className="font-semibold">Order</span>
          </div>
          <span className="font-semibold">User</span>
          <span className="font-semibold">Total</span>
          <span className="font-semibold">Status</span>
          <span className="font-semibold">Actions</span>
        </Card>
        {orders.length === 0 && <div>No orders found.</div>}
        {orders.map((order) => (
          <Card key={order._id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between" role="listitem" aria-label={`Order ${order._id}`}> 
            <div className="flex items-center gap-2">
              <Checkbox checked={selected.includes(order._id)} onCheckedChange={() => handleSelect(order._id)} aria-label={`Select order ${order._id}`} />
              <div className="font-semibold" tabIndex={0}>Order #{order._id}</div>
            </div>
            <div className="text-gray-500 text-sm" tabIndex={0}>{order.user.name} ({order.user.email})</div>
            <div className="text-gray-500 text-sm" tabIndex={0}>&#8377;{order.total}</div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{order.status}</span>
              <select
                className="ml-2 border rounded px-2 py-1"
                aria-label={`Change status for order ${order._id}`}
                value={order.status}
                onChange={e => handleStatus(order._id, e.target.value)}
                disabled={deleting}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-2 items-center mt-2 md:mt-0">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 focus:outline focus:ring-2"
                aria-label={`Delete order ${order._id}`}
                onClick={() => { setOrderToDelete(order); setConfirmOpen(true); }}
                disabled={deleting}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Order?"
        description={`Are you sure you want to delete order '${orderToDelete?._id}'? This action cannot be undone.`}
        confirmLabel={deleting ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => orderToDelete && handleDelete(orderToDelete._id)}
        onCancel={() => { setConfirmOpen(false); setOrderToDelete(null); }}
      />
    </div>
  );
}
