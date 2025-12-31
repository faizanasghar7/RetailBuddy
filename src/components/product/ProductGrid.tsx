'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    images: string[];
    slug?: string;
}

interface ProductGridProps {
    products: Product[];
    loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-4">
                        <div className="aspect-[4/5] bg-gray-200 rounded-2xl"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
                <div key={product.id} className="group space-y-4">
                    <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        {product.images?.[0] ? (
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                No Image
                            </div>
                        )}

                        <div className="absolute top-4 left-4">
                            <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-gray-100">
                                {product.category}
                            </span>
                        </div>

                        <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-gold-400">
                            <ShoppingBag size={20} />
                        </button>
                    </Link>

                    <div className="space-y-1">
                        <Link href={`/product/${product.id}`}>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-gold-600 transition-colors line-clamp-1">
                                {product.title}
                            </h3>
                        </Link>
                        <p className="font-semibold text-gray-900 text-lg">
                            ${product.price?.toFixed(2)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
