'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CategoryPage() {
    const params = useParams();
    const category = typeof params.category === 'string'
        ? params.category.charAt(0).toUpperCase() + params.category.slice(1)
        : '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category) {
            fetchProducts();
        }
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/products?category=${category}`);
            const data = await res.json();
            if (data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-black">Home</Link>
                <ChevronRight size={14} />
                <Link href="/shop" className="hover:text-black">Shop</Link>
                <ChevronRight size={14} />
                <span className="text-black font-medium">{category}</span>
            </div>

            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2">{category} Collection</h1>
                <p className="text-gray-500">Explore our premium selection of {category.toLowerCase()}.</p>
            </div>

            <ProductGrid products={products} loading={loading} />
        </div>
    );
}
