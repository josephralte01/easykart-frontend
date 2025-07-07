'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 1,
    name: 'Groceries',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '500+ items'
  },
  {
    id: 2,
    name: 'Personal Care',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '200+ items'
  },
  {
    id: 3,
    name: 'Household',
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '150+ items'
  },
  {
    id: 4,
    name: 'Health & Wellness',
    image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '100+ items'
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of daily essentials organized by categories for easy shopping.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}