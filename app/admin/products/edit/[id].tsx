'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.product.name);
        setPrice(data.product.price);
        setStock(data.product.stock);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (res.ok) {
      setMessage('Product updated!');
      setTimeout(() => router.push('/admin/products'), 1000);
    } else setMessage('Failed to update product.');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="border rounded px-3 py-2" />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="border rounded px-3 py-2" />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required className="border rounded px-3 py-2" />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
      </form>
      {message && <div className="mt-4 text-center text-green-600">{message}</div>}
    </div>
  );
}
