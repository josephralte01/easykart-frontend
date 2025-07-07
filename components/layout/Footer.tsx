import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="EasyKart logo"
                width={32}
                height={32}
                className="w-8 h-8"
                role="img"
                aria-label="EasyKart logo"
              />
              <span className="text-xl font-bold">
                Easy<span className="text-primary">Kart</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for daily essentials. Quality products and excellent service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" aria-label="Facebook" role="img" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" aria-label="Twitter" role="img" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" aria-label="Instagram" role="img" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/orders" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-gray-400">+91 99452 02877</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-gray-400">support@easykart.site</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-gray-400">
                  #Basic Mual, Ramhlun North,<br />
                  Aizawl. 796012
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 EasyKart.site. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}