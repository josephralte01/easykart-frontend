'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setCategories(Array.from(new Set((data.products || []).map((p: Product) => p.category).filter(Boolean))));
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/products/${deleteId}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter(p => p._id !== deleteId));
    setConfirmOpen(false);
    setDeleteId(null);
  };
  const cancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Link href="/admin/products/upload" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Product</Link>
          <Link href="/admin/products/bulk" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Bulk Upload/Download</Link>
        </div>
      </div>
      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Image src={product.image} alt={product.name} width={64} height={64} className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">{product.name}</div>
                <div className="text-gray-500 text-sm">₹{product.price}</div>
                <div className="text-gray-500 text-sm">Stock: {product.stock}</div>
                {product.category && <div className="text-gray-400 text-xs">{product.category}</div>}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/products/edit/${product._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(product._id)}
                aria-label={`Delete product ${product.name}`}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
        {filteredProducts.length === 0 && <div className="text-gray-500 text-center">No products found.</div>}
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Product?"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
