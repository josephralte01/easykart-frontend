'use client';

import React, { useRef, useState } from 'react';

export default function BulkProductPage() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInput.current?.files?.[0]) return;
    const formData = new FormData();
    formData.append('file', fileInput.current.files[0]);
    const res = await fetch('/api/admin/products/bulk', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) setMessage('Bulk upload successful!');
    else setMessage('Bulk upload failed.');
  };

  const handleDownload = () => {
    window.location.href = '/api/admin/products/bulk/download';
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Bulk Upload/Download</h1>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input type="file" accept=".csv" ref={fileInput} className="border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Upload CSV</button>
      </form>
      <button onClick={handleDownload} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">Download CSV</button>
      {message && <div className="mt-4 text-center text-green-600">{message}</div>}
    </div>
  );
}
