'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">💸 Refund & Cancellation Policy</CardTitle>
            <p className="text-gray-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Cancellation</h3>
            <p className="mb-4">
              If you need to cancel an order after placing it, contact customer support promptly.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Orders can be cancelled within 1 hour of placement</li>
              <li>Once the order is shipped, cancellation is not possible</li>
              <li>Cancellation requests must be made through customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Returns Policy</h3>
            <p className="mb-4">
              EasyKart does not hold title to returned items; returns due to damage or quality issues can be replaced by contacting the nearest EasyKart service center.
            </p>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Eligible Returns:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Products damaged during shipping</li>
              <li>Products with quality defects</li>
              <li>Wrong products delivered</li>
              <li>Expired products (for perishable items)</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-2">Non-Returnable Items:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Perishable goods (unless expired or damaged)</li>
              <li>Personal care items that have been opened</li>
              <li>Products damaged due to misuse</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Process</h3>
            <p className="mb-4">
              Refunds or replacements are issued once the return is verified.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Refund processing time: 5-7 business days</li>
              <li>Refunds will be credited to the original payment method</li>
              <li>Shipping charges are non-refundable unless the return is due to our error</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Initiate a Return</h3>
            <ol className="list-decimal pl-6 mb-4">
              <li>Contact customer support within 24 hours of delivery</li>
              <li>Provide order number and reason for return</li>
              <li>Our team will guide you through the return process</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Hand over the package to our pickup executive</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Replacement Policy</h3>
            <p className="mb-4">
              We offer replacements for damaged or defective products. Replacement items will be delivered within 3-5 business days after verification.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact for Returns</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Customer Support:</strong> support@easykart.site</p>
              <p><strong>Service Center:</strong> #729, Mangalam Grand City, Ajmer Road, Mahapura, Jaipur Raj. 302026</p>
              <p><strong>Support Hours:</strong> Monday to Saturday, 9:00 AM to 6:00 PM</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Exceptions</h3>
            <p className="mb-4">
              EasyKart reserves the right to refuse returns that do not meet our return policy criteria. All return decisions are final and at the discretion of EasyKart management.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}