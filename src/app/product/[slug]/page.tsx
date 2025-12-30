'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
    const params = useParams();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Gold');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    // Mock product data
    const product = {
        id: params.slug as string,
        title: 'Premium Gold Plated Necklace',
        price: 129,
        description: 'A stunning gold-plated necklace featuring a delicate chain and a hand-crafted pendant. Perfect for both everyday wear and special occasions. Made with high-quality materials to ensure long-lasting shine and durability.',
        category: 'Jewelry',
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L'],
        colors: ['Gold', 'Silver', 'Rose Gold'],
        rating: 4.8,
        reviews: 124
    };

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
                        <img
                            src={product.images[activeImage]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
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
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {product.images.map((img, idx) => (
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
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gold-600">
                            <Star size={16} fill="currentColor" />
                            <span>{product.rating} ({product.reviews} reviews)</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
                        <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Color</label>
                            <div className="flex gap-3">
                                {product.colors.map(color => (
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

                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Size</label>
                            <div className="flex gap-3">
                                {product.sizes.map(size => (
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
