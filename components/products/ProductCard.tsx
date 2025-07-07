'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success('Added to cart!');
  };

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <Image
              src={product.image}
              alt={product.name ? product.name : 'Product image'}
              width={400}
              height={400}
              loading="lazy"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              priority={false}
              role="img"
              aria-label={product.name ? product.name : 'Product image'}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">₹{product.price}</span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90"
                aria-label={`Add ${product.name} to cart`}
                title={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}