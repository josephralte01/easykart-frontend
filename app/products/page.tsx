'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import ProductSearch from './search';
import WishlistButton from './wishlist';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { useErrorToast } from '@/contexts/ErrorToastContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [category, setCategory] = useState('all');
  const { showError } = useErrorToast();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sortBy,
        ...(category !== 'all' && { category }),
      });
      const response = await api.get(`/products?${params}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (error) {
      setError('Failed to load products. Please try again later.');
      showError('Failed to load products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, category, showError]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products.');
        showError('Failed to load products.');
        setLoading(false);
      });
  }, [showError]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full h-80"><LoadingSkeleton className="w-full h-full" /></div>
      ))}
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">All Products</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="personal-care">Personal Care</SelectItem>
                  <SelectItem value="household">Household</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="-price">Price: High to Low</SelectItem>
                  <SelectItem value="-createdAt">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductSearch onSearch={setSearch} />
          {error ? (
            <div className="text-red-600 text-center p-8">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded shadow p-4 flex flex-col items-center relative">
                    {product.stock === 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
                    )}
                    <Image src={product.image} alt={product.name} width={128} height={128} className="w-32 h-32 object-cover rounded mb-2" />
                    <div className="font-semibold text-lg mb-1">{product.name}</div>
                    <div className="text-gray-500 mb-2">₹{product.price}</div>
                    <WishlistButton productId={product._id} />
                    <a href={`/products/${product._id}`} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center">View</a>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}