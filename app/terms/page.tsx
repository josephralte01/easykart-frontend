'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">Terms & Conditions</CardTitle>
            <p className="text-gray-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terms of Use</h2>
            
            <p className="mb-4">
              By accessing EasyKart.site, you agree not to use it for resale, trade, or other commercial purposes. 
              You agree to communicate respectfully, avoiding language that is abusive, vulgar, or offensive.
            </p>
            
            <p className="mb-6">
              EasyKart may terminate or suspend accounts for breach of these Terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h3>
            <p className="mb-4">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Use of Website</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You must be at least 18 years old to use our services</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You will not use the website for any unlawful purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Information</h3>
            <p className="mb-4">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Orders and Payment</h3>
            <p className="mb-4">
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be made at the time of purchase through our secure payment gateway.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="mb-4">
              EasyKart.site shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Changes to Terms</h3>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h3>
            <p className="mb-4">
              If you have any questions about these Terms & Conditions, please contact us at support@easykart.site
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}