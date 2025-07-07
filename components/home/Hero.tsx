'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield, Clock, Package } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Daily Essentials
            <span className="block text-primary">Delivered to You</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get all your daily needs delivered to your doorstep. Fresh products, great prices, and reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Wide Selection</h3>
              <p className="text-gray-600 text-sm">Comprehensive range of daily essentials for all your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">Fresh products with quality guarantee</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Service</h3>
              <p className="text-gray-600 text-sm">Order anytime, we're always here for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}