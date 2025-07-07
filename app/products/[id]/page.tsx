'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import ProductReviews from '../reviews';
import WishlistButton from '../wishlist';
import Head from 'next/head';
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

export const dynamic = 'force-dynamic';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();
  const { showError } = useErrorToast();

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product. Please try again later.');
        showError('Failed to load product. Please try again later.');
        setLoading(false);
      });
  }, [params.id]);

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

  if (loading) return (
    <div className="flex flex-col items-center py-8">
      <div className="w-64 h-64 mb-4"><LoadingSkeleton className="w-full h-full" /></div>
      <div className="w-1/2 h-8 mb-2"><LoadingSkeleton className="w-full h-full" /></div>
      <div className="w-1/3 h-6 mb-2"><LoadingSkeleton className="w-full h-full" /></div>
      <div className="w-2/3 h-4 mb-2"><LoadingSkeleton className="w-full h-full" /></div>
      <div className="w-1/4 h-10"><LoadingSkeleton className="w-full h-full" /></div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!product) return <div className="text-center text-gray-500 py-8">Product not found.</div>;

  return (
    <>
      <Head>
        <title>{product ? `${product.name} | EasyKart` : 'Product | EasyKart'}</title>
        <meta name="description" content={product ? product.description : 'Product details'} />
        {product && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'Product',
                name: product.name,
                image: product.image,
                description: product.description,
                offers: {
                  '@type': 'Offer',
                  price: product.price,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              }),
            }}
          />
        )}
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content" tabIndex={-1}>
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

          <ProductReviews productId={product._id} />
        </div>

        <Footer />
      </div>
    </>
  );
}