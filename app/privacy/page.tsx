'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">🔐 Privacy Policy</CardTitle>
            <p className="text-gray-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="mb-6 text-lg">
              We collect, store, and use personal data to process your orders and improve our services. 
              We do not sell or rent your information to third parties without explicit consent.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
              <li><strong>Payment Information:</strong> Billing address and payment details (processed securely through PayU)</li>
              <li><strong>Order Information:</strong> Products purchased, order history, preferences</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Improve our website and services</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Sharing</h3>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With service providers who help us operate our business</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h3>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h3>
            <p className="mb-4">
              We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h3>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> support@easykart.site</p>
              <p><strong>Address:</strong> #729, Mangalam Grand City, Ajmer Road, Mahapura, Jaipur Raj. 302026</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}