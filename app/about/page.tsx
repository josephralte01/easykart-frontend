'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Package, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ℹ️ About EasyKart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making daily essentials accessible, affordable, and reliable since 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                EasyKart.site, founded in 2025, is dedicated to making daily essentials accessible, affordable, and reliable. 
                With a mission to simplify shopping, we combine quality products with convenient delivery—all wrapped in a user-friendly experience.
              </p>
              <p className="text-gray-600 mb-4">
                We understand that shopping for daily essentials should be simple, convenient, and stress-free. That's why we've created a platform that brings together quality products, competitive prices, and excellent customer service.
              </p>
              <p className="text-gray-600">
                From groceries to personal care items, household essentials to health products, we've curated a comprehensive selection to meet all your daily needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                To revolutionize the way people shop for daily essentials by providing a seamless, reliable, and customer-centric online shopping experience.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that everyone deserves access to quality products at fair prices, delivered with care and convenience. Our goal is to become your trusted partner for all daily shopping needs.
              </p>
              <p className="text-gray-600">
                We're committed to building long-term relationships with our customers by consistently delivering value, quality, and exceptional service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-600 text-sm">We ensure all products meet high quality standards before reaching you</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer First</h3>
                <p className="text-gray-600 text-sm">Your satisfaction is our priority, and we're here to help every step of the way</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Reliability</h3>
                <p className="text-gray-600 text-sm">Consistent service and dependable delivery you can count on</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Care</h3>
                <p className="text-gray-600 text-sm">We handle your orders with care and attention to detail</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Why Choose EasyKart?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Wide Product Range</h4>
                <p className="text-gray-600 mb-4">From groceries to personal care, we have everything you need for daily life.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Competitive Prices</h4>
                <p className="text-gray-600 mb-4">We offer fair and competitive pricing on all our products.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
                <p className="text-gray-600">Hassle-free returns and replacements for damaged or defective items.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure Shopping</h4>
                <p className="text-gray-600 mb-4">Your personal and payment information is always protected.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
                <p className="text-gray-600 mb-4">Dedicated support team ready to help with any questions or concerns.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Order Tracking</h4>
                <p className="text-gray-600">Track your orders in real-time with AWB numbers.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you. Get in touch with our team for any queries or feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Contact Us
              </a>
              <a href="mailto:support@easykart.site" className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors">
                Email Support
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}