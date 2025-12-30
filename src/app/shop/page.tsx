'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown, ShoppingBag, Search } from 'lucide-react';

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Jewelry', 'Clothing', 'Shoes', 'Household'];

    const products = [
        { id: '1', title: 'Gold Plated Necklace', price: 129, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
        { id: '2', title: 'Silk Summer Dress', price: 89, category: 'Clothing', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80' },
        { id: '3', title: 'Leather Sneakers', price: 110, category: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80' },
        { id: '4', title: 'Ceramic Vase Set', price: 45, category: 'Household', image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80' },
        { id: '5', title: 'Diamond Stud Earrings', price: 299, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80' },
        { id: '6', title: 'Linen Button-Up', price: 65, category: 'Clothing', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80' },
        { id: '7', title: 'Canvas Tote Bag', price: 35, category: 'Household', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80' },
        { id: '8', title: 'Running Shoes', price: 95, category: 'Shoes', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80' },
    ];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Shop Catalog</h1>
                    <p className="text-gray-500 mt-2">Browse our full collection of premium items.</p>
                </div>

                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64 focus:ring-2 focus:ring-black outline-none transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition-colors">
                        <Filter size={18} />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition-colors">
                        Sort by <ChevronDown size={18} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 space-y-8">
                    <div>
                        <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-400">Categories</h3>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${activeCategory === cat ? 'bg-black text-white' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-400">Price Range</h3>
                        <div className="space-y-4">
                            <input type="range" className="w-full accent-black" min="0" max="500" />
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>$0</span>
                                <span>$500+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group space-y-4">
                                <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                    <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white">
                                        <ShoppingBag size={20} />
                                    </button>
                                </Link>
                                <div className="space-y-1">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-bold text-lg group-hover:text-gold-600 transition-colors">{product.title}</h3>
                                    </Link>
                                    <p className="font-semibold text-gray-900">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No products found in this category.</p>
                            <button
                                onClick={() => setActiveCategory('All')}
                                className="mt-4 text-black font-bold underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
