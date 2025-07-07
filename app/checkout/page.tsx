'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useErrorToast } from '@/contexts/ErrorToastContext';

export default function CheckoutPage() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { showError } = useErrorToast();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (items.length === 0) {
      router.push('/products');
      return;
    }
  }, [user, items, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        shippingAddress: address,
        phone
      };

      const response = await api.post('/orders', orderData);
      const { order } = response.data;

      // Redirect to PayU payment gateway
      const paymentData = {
        key: process.env.NEXT_PUBLIC_PAYU_KEY,
        txnid: order._id,
        amount: total,
        productinfo: 'EasyKart Order',
        firstname: user?.name,
        email: user?.email,
        phone,
        surl: `${window.location.origin}/payment/success`,
        furl: `${window.location.origin}/payment/failure`,
      };

      // Create form and submit to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = process.env.NEXT_PUBLIC_PAYU_URL || 'https://sandboxsecure.payu.in/_payment';

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value?.toString() || '';
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      clearCart();
    } catch (error: any) {
      showError(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="address">Shipping Address</Label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Enter your complete address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}