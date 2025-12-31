'use client';
import { useState, useEffect } from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Jewelry', 'Clothing', 'Shoes', 'Household'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/products');
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

    const filteredProducts = products.filter((p: any) => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                    <ProductGrid products={filteredProducts} loading={loading} />

                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No products found.</p>
                            <button
                                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
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
