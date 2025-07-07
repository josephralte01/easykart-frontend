'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import ExportUsers from './export';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useErrorToast } from '@/contexts/ErrorToastContext';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { showError } = useErrorToast();

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  const handleBlock = async (id: string) => {
    await fetch(`/api/admin/users/${id}/block`, { method: 'POST' });
    setUsers((prev) => prev.map(u => u._id === id ? { ...u, isBlocked: true } : u));
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers((prev) => prev.filter(u => u._id !== id));
      toast.success('User deleted successfully');
    } catch (err: any) {
      setError(err.message || 'Error deleting user');
      showError(err.message || 'Error deleting user');
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  const handleSelectAll = () => {
    if (selected.length === users.length) setSelected([]);
    else setSelected(users.map(u => u._id));
  };
  const handleBulkDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected }),
      });
      if (!res.ok) throw new Error('Failed to delete users');
      setUsers((prev) => prev.filter(u => !selected.includes(u._id)));
      setSelected([]);
      toast.success('Selected users deleted');
    } catch (err: any) {
      setError(err.message || 'Error deleting users');
      showError(err.message || 'Error deleting users');
    } finally {
      setDeleting(false);
    }
  };
  const handleBulkBlock = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users/bulk-block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected }),
      });
      if (!res.ok) throw new Error('Failed to block users');
      setUsers((prev) => prev.map(u => selected.includes(u._id) ? { ...u, isBlocked: true } : u));
      setSelected([]);
      toast.success('Selected users blocked');
    } catch (err: any) {
      setError(err.message || 'Error blocking users');
      showError(err.message || 'Error blocking users');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div role="status" aria-busy="true" className="p-8"><span>Loading users...</span></div>;
  if (error) return <div role="alert" className="text-red-600 p-4">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" tabIndex={0}>Users</h1>
      <div className="mb-4">
        <ExportUsers />
      </div>
      {selected.length > 0 && (
        <div className="mb-4 flex gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleBulkDelete} disabled={deleting}>Delete Selected</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleBulkBlock} disabled={deleting}>Block Selected</button>
          <span className="ml-2">{selected.length} selected</span>
        </div>
      )}
      <div className="grid gap-4" role="list">
        <Card className="flex items-center justify-between p-4 bg-gray-50">
          <div className="flex items-center gap-2">
            <Checkbox checked={selected.length === users.length && users.length > 0} onCheckedChange={handleSelectAll} aria-label="Select all users" />
            <span className="font-semibold">Name</span>
          </div>
          <span className="font-semibold">Email</span>
          <span className="font-semibold">Actions</span>
        </Card>
        {users.length === 0 && <div>No users found.</div>}
        {users.map((user) => (
          <Card key={user._id} className="flex items-center justify-between p-4" role="listitem" aria-label={`User ${user.name}`}> 
            <div className="flex items-center gap-2">
              <Checkbox checked={selected.includes(user._id)} onCheckedChange={() => handleSelect(user._id)} aria-label={`Select user ${user.name}`} />
              <div className="font-semibold" tabIndex={0}>{user.name}</div>
            </div>
            <div className="text-gray-500 text-sm" tabIndex={0}>{user.email}</div>
            <div className="flex gap-2 items-center">
              {user.isBlocked ? (
                <span className="text-red-500 font-bold" aria-label="Blocked user">Blocked</span>
              ) : (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline focus:ring-2"
                  aria-label={`Block user ${user.name}`}
                  onClick={() => handleBlock(user._id)}
                  disabled={deleting}
                >
                  Block
                </button>
              )}
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 focus:outline focus:ring-2"
                aria-label={`Delete user ${user.name}`}
                onClick={() => { setUserToDelete(user); setConfirmOpen(true); }}
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
        title="Delete User?"
        description={`Are you sure you want to delete user '${userToDelete?.name}'? This action cannot be undone.`}
        confirmLabel={deleting ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={() => userToDelete && handleDelete(userToDelete._id)}
        onCancel={() => { setConfirmOpen(false); setUserToDelete(null); }}
      />
    </div>
  );
}
