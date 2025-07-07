'use client';

import React, { useState } from 'react';

export default function ProductUploadPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) setMessage('Product uploaded successfully!');
    else setMessage('Failed to upload product.');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="border rounded px-3 py-2" />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="border rounded px-3 py-2" />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required className="border rounded px-3 py-2" />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Upload</button>
      </form>
      {message && <div className="mt-4 text-center text-green-600">{message}</div>}
    </div>
  );
}
