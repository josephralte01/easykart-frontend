import React from 'react';

export default function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-busy="true"
      aria-label="Loading..."
    />
  );
}
