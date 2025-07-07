'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from '../wishlist';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { useErrorToast } from '@/contexts/ErrorToastContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default function ProductDetailClient({ product }: { product: Product | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addItem } = useCart();
  const { showError } = useErrorToast();

  if (!product) {
    return <div className="text-center text-gray-500 py-8">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success('Added to cart!');
    }
  };

  return (
    <>
      <Link href="/products" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.name}
            width={256}
            height={256}
            className="w-64 h-64 object-cover rounded mb-4"
            loading="lazy"
          />
        </div>
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <WishlistButton productId={product._id} />
          </div>
        </div>
      </div>
    </>
  );
}
