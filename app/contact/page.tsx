'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📞 Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Feel free to connect with any queries about orders, products, or policies—we're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Corporate Office</h3>
                    <p className="text-gray-600">
                      EasyKart.site<br />
                      #Basic Mual, Ramhlun North,<br />
                      Aizawl. 796012
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                    <p className="text-gray-600">support@easykart.site</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Customer Support</h3>
                    <p className="text-gray-600">+91 99452 02877</p>
                    <p className="text-sm text-gray-500">Available for order assistance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Order Issues</h4>
                    <p className="text-sm text-gray-600">Track orders, cancellations, or delivery concerns</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Product Questions</h4>
                    <p className="text-sm text-gray-600">Product availability, specifications, or recommendations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Returns & Refunds</h4>
                    <p className="text-sm text-gray-600">Return process, refund status, or replacement requests</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Account Support</h4>
                    <p className="text-sm text-gray-600">Login issues, account settings, or password reset</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your query in detail..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={6}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How can I track my order?</h4>
                <p className="text-gray-600 mb-4">You can track your order using the AWB number provided in your order confirmation email or by visiting the Orders page in your account.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">What is your return policy?</h4>
                <p className="text-gray-600 mb-4">We accept returns for damaged or defective products. Please contact us within 24 hours of delivery to initiate a return.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How long does delivery take?</h4>
                <p className="text-gray-600 mb-4">Delivery times vary by location. You'll receive an estimated delivery date during checkout and tracking information once your order ships.</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Do you offer customer support?</h4>
                <p className="text-gray-600 mb-4">Yes! Our customer support team is available Monday-Saturday, 9 AM to 6 PM. Contact us via email or phone for assistance.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}