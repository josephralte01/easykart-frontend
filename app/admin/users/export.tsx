import React from 'react';

export default function ExportUsers() {
  const handleExport = () => {
    window.location.href = '/api/admin/users/export';
  };
  return (
    <button onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Export Users CSV</button>
  );
}
