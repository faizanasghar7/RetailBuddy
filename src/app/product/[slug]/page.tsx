'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const runtime = 'edge';

export default function ProductDetailPage() {
    const params = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products?id=${params.slug}`);
                const data = await res.json();
                if (data.product) {
                    setProduct(data.product);
                    // Extract unique sizes and colors from variants
                    const variants = data.product.variants || [];
                    const sizes = [...new Set(variants.map((v: any) => v.size).filter(Boolean))];
                    const colors = [...new Set(variants.map((v: any) => v.color).filter(Boolean))];

                    if (sizes.length > 0) setSelectedSize(sizes[0] as string);
                    if (colors.length > 0) setSelectedColor(colors[0] as string);
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchProduct();
        }
    }, [params.slug]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
    }

    // Derive available options from variants
    const variants = product.variants || [];
    const sizes = [...new Set(variants.map((v: any) => v.size).filter(Boolean))] as string[];
    const colors = [...new Set(variants.map((v: any) => v.color).filter(Boolean))] as string[];

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            variantId: `${product.id}-${selectedSize}-${selectedColor}`,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images[0],
            variantName: `${selectedSize} / ${selectedColor}`
        });
        alert('Added to cart!');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image Gallery */}
                <div className="space-y-6">
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100 group">
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[activeImage]}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}

                        {product.images && product.images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                                    className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                                    className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>

                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-3 gap-4">
                            {product.images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gold-600">
                            <Star size={16} fill="currentColor" />
                            <span>4.8 (124 reviews)</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
                        <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="space-y-6">
                        {colors.length > 0 && (
                            <div className="space-y-3">
                                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Color</label>
                                <div className="flex gap-3">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-6 py-2 rounded-full border-2 transition-all ${selectedColor === color ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {sizes.length > 0 && (
                            <div className="space-y-3">
                                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Size</label>
                                <div className="flex gap-3">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex items-center border-2 rounded-full px-4 py-2">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 hover:text-gold-600">-</button>
                                <span className="w-12 text-center font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="p-1 hover:text-gold-600">+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-grow bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                            >
                                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                                Add to Cart
                            </button>
                            <button className="p-4 border-2 rounded-full hover:bg-gray-50 transition-colors">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
                        <div className="flex items-center gap-3 text-sm">
                            <Truck size={20} className="text-gray-400" />
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <ShieldCheck size={20} className="text-gray-400" />
                            <span>2 Year Warranty</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <RotateCcw size={20} className="text-gray-400" />
                            <span>30 Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
