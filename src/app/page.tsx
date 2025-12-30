import Link from 'next/link';
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function Home() {
  const collections = [
    { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', href: '/shop/jewelry' },
    { name: 'Clothing', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80', href: '/shop/clothing' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', href: '/shop/shoes' },
    { name: 'Household', image: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&w=800&q=80', href: '/shop/household' },
  ];

  const newArrivals = [
    { id: '1', title: 'Gold Plated Necklace', price: 129, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
    { id: '2', title: 'Silk Summer Dress', price: 89, category: 'Clothing', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80' },
    { id: '3', title: 'Leather Sneakers', price: 110, category: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80' },
    { id: '4', title: 'Ceramic Vase Set', price: 45, category: 'Household', image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
            Elevate Your <span className="text-gold-400">Lifestyle</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Discover curated collections of jewelry, apparel, and home essentials designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Link href="/shop" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gold-400 hover:text-white transition-all flex items-center justify-center gap-2 group">
              Shop Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admin" className="bg-transparent border border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Shop by Collection</h2>
            <p className="text-gray-500 mt-2">Explore our diverse range of premium products.</p>
          </div>
          <Link href="/shop" className="text-sm font-bold flex items-center gap-1 hover:text-gold-600 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <Link key={col.name} href={col.href} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white">{col.name}</h3>
                <p className="text-gray-300 text-sm mt-1 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore Collection <ArrowRight size={14} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm text-gold-600">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-gray-500">Free shipping on all orders over $150. Delivered within 3-5 business days.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm text-gold-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold">Secure Payment</h3>
              <p className="text-gray-500">100% secure payment processing with industry-standard encryption.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm text-gold-600">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-gray-500">Every product is handpicked and verified for the highest quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">New Arrivals</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Freshly added to our catalog. Be the first to own our latest pieces.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div key={product.id} className="group space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white">
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</p>
                <h3 className="font-bold text-lg group-hover:text-gold-600 transition-colors">{product.title}</h3>
                <p className="font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
