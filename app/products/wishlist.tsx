'use client';

import React, { useState, useEffect } from 'react';

export default function WishlistButton({ productId }: { productId: string }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlisted(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter((id: string) => id !== productId);
      setWishlisted(false);
    } else {
      wishlist.push(productId);
      setWishlisted(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <button
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={toggleWishlist}
      className={`ml-2 text-xl ${wishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
    >
      ♥
    </button>
  );
}
