'use client';

import React, { useState, useEffect } from 'react';

export default function ProductSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="border rounded px-3 py-2 w-full md:w-80 mb-4"
    />
  );
}
