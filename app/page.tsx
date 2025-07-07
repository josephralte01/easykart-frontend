import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}