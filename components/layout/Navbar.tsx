'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="EasyKart logo"
                width={40}
                height={40}
                className="w-10 h-10"
                role="img"
                aria-label="EasyKart logo"
              />
              <span className="text-xl font-bold text-gray-900">
                Easy<span className="text-primary">Kart</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open cart"
                title="Open cart"
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cart-badge" aria-label={`Cart items: ${itemCount}`}>{itemCount}</span>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link href="/orders">
                    <Button variant="ghost" size="sm">
                      Orders
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout} aria-label="Logout" title="Logout">
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                title={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <Link
                  href="/products"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}