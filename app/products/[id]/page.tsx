// Server component for product detail page
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ProductDetailClient from './ProductDetailClient';
import ProductReviews from '../reviews';
import Head from 'next/head';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const dynamic = 'force-dynamic';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
      : `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/products/${id}`;
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <>
      <Head>
        <title>{product ? `${product.name} | EasyKart` : 'Product | EasyKart'}</title>
        <meta name="description" content={product ? product.description : 'Product details'} />
        {product && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'Product',
                name: product.name,
                image: product.image,
                description: product.description,
                offers: {
                  '@type': 'Offer',
                  price: product.price,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              }),
            }}
          />
        )}
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content" tabIndex={-1}>
          <ProductDetailClient product={product} />
          {product && <ProductReviews productId={product._id} />}
        </div>
        <Footer />
      </div>
    </>
  );
}